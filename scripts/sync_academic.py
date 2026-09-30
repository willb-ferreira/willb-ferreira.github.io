#!/usr/bin/env python3
"""Update allowlisted academic records from official public APIs.

ORCID discovery (if manually enabled) writes a locally ignored review queue;
none is published until explicitly added to data/sources.json. Manual site
content takes precedence over the generated data in the browser.
"""
from __future__ import annotations

import html
import json
import os
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TIMEOUT = 18
USER_AGENT = "WillamsAcademicPortfolio/1.0 (metadata-only; contact: see repository)"


def read_json(path: Path, default):
    if not path.exists():
        return default
    return json.loads(path.read_text(encoding="utf-8"))


def write_if_changed(path: Path, text: str) -> bool:
    path.parent.mkdir(parents=True, exist_ok=True)
    if path.exists() and path.read_text(encoding="utf-8") == text:
        return False
    path.write_text(text, encoding="utf-8")
    return True


def http_json(url: str, *, token: str = "", data: bytes | None = None, email: str = ""):
    headers = {"Accept": "application/json", "User-Agent": USER_AGENT}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    if email:
        headers["User-Agent"] = f"WillamsAcademicPortfolio/1.0 (mailto:{email})"
    if data is not None:
        headers["Content-Type"] = "application/x-www-form-urlencoded"
    request = urllib.request.Request(url, data=data, headers=headers)
    with urllib.request.urlopen(request, timeout=TIMEOUT) as response:
        return json.load(response)


def plain(value) -> str:
    return re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]*>", "", str(value or "")))).strip()


def valid_doi(doi) -> str:
    value = str(doi or "").strip()
    value = re.sub(r"^https?://(?:dx\.)?doi\.org/", "", value, flags=re.I)
    return value.lower() if re.fullmatch(r"10\.\d{4,9}/\S+", value, flags=re.I) else ""


def year_of(work):
    for key in ("published-online", "published", "issued", "published-print", "created"):
        parts = work.get(key, {}).get("date-parts") or []
        if parts and parts[0] and isinstance(parts[0][0], int):
            return parts[0][0]
    return None


def crossref_record(doi: str, entry: dict, email: str) -> dict:
    uri = f"https://api.crossref.org/works/{urllib.parse.quote(doi, safe='/')}"
    if email:
        uri += "?" + urllib.parse.urlencode({"mailto": email})
    work = http_json(uri, email=email)["message"]
    returned_doi = valid_doi(work.get("DOI"))
    if returned_doi != doi:
        raise ValueError(f"DOI inesperado no Crossref: {returned_doi} (esperado: {doi})")
    title = plain((work.get("title") or [""])[0])
    if not title:
        raise ValueError(f"Registro sem título para {doi}")
    authors = "; ".join(plain(" ".join(filter(None, [a.get("given"), a.get("family")])) or a.get("name"))
                        for a in work.get("author", []))
    journal = plain((work.get("container-title") or [""])[0])
    volume = plain(work.get("volume"))
    issue = plain(work.get("issue"))
    page = plain(work.get("page") or work.get("article-number"))
    venue = ", ".join(x for x in [journal, (volume + (f"({issue})" if issue else "")), page] if x)
    kind = "preprint" if work.get("type") == "posted-content" else ("conference" if work.get("type") == "proceedings-article" else "article")
    def safe_link(value):
        u = str(value or "").strip()
        return u if u.startswith("https://") or u.startswith("http://") else ""

    crossref_pdf = ""
    for link in work.get("link", []) or []:
        if not isinstance(link, dict):
            continue
        content_type = str(link.get("content-type") or "").lower()
        candidate = safe_link(link.get("URL"))
        if candidate and content_type == "application/pdf":
            crossref_pdf = candidate
            break

    return {
        "id": "doi-" + re.sub(r"[^a-z0-9]+", "-", doi).strip("-"),
        "title": title,
        "authors": authors,
        "year": year_of(work),
        "venue": venue,
        "type": entry.get("type") or kind,
        "doi": doi,
        "url": "https://doi.org/" + urllib.parse.quote(doi, safe="/"),
        "pdf": safe_link(entry.get("pdf")), "code": safe_link(entry.get("code")),
        "data": safe_link(entry.get("data")),
        "bibtex": "", "featured": bool(entry.get("featured", False)),
        "tags": [plain(v) for v in entry.get("tags", []) if plain(v)],
        # Crossref offers a conservative citation fallback. OpenAlex enrichment,
        # when available, replaces this count below.
        "citations": max(0, int(work.get("is-referenced-by-count") or 0)),
        "citation_source": "Crossref",
        "citation_updated": datetime.now(timezone.utc).date().isoformat(),
        "venue_metrics": entry.get("venue_metrics") if isinstance(entry.get("venue_metrics"), dict) else {},
        "open_access": bool(entry.get("open_access", False)),
        "oa_status": plain(entry.get("oa_status")),
        "oa_url": safe_link(entry.get("oa_url")),
        "oa_pdf": safe_link(entry.get("oa_pdf")),
        "crossref_pdf": crossref_pdf,
    }


def openalex_metadata(doi: str) -> dict:
    """Best-effort bibliometric/OA enrichment for one approved DOI."""
    params = {
        "filter": f"doi:https://doi.org/{doi}",
        "per_page": "1",
        "select": "id,doi,cited_by_count,open_access,best_oa_location",
    }
    api_key = os.environ.get("OPENALEX_API_KEY", "").strip()
    if api_key:
        params["api_key"] = api_key
    payload = http_json("https://api.openalex.org/works?" + urllib.parse.urlencode(params))
    results = payload.get("results") or []
    if len(results) != 1:
        raise ValueError(f"OpenAlex retornou {len(results)} registros para {doi}")
    work = results[0]
    returned_doi = valid_doi(work.get("doi"))
    if returned_doi != doi:
        raise ValueError(f"DOI inesperado no OpenAlex: {returned_doi} (esperado: {doi})")
    access = work.get("open_access") or {}
    location = work.get("best_oa_location") or {}

    def safe_link(value):
        u = str(value or "").strip()
        return u if u.startswith("https://") or u.startswith("http://") else ""

    return {
        "citations": max(0, int(work.get("cited_by_count") or 0)),
        "citation_source": "OpenAlex",
        "citation_updated": datetime.now(timezone.utc).date().isoformat(),
        "openalex_id": safe_link(work.get("id")),
        "open_access": bool(access.get("is_oa", False)),
        "oa_status": plain(access.get("oa_status")),
        "oa_url": safe_link(location.get("landing_page_url") or access.get("oa_url")),
        "oa_pdf": safe_link(location.get("pdf_url")),
        "oa_pdf_source": "OpenAlex" if safe_link(location.get("pdf_url")) else "",
    }


def unpaywall_pdf(doi: str, email: str) -> dict:
    """Return a legally open PDF location when Unpaywall exposes one."""
    if not email or not re.fullmatch(r"[^\s@]+@[^\s@]+\.[^\s@]+", email):
        return {}
    uri = (
        "https://api.unpaywall.org/v2/"
        + urllib.parse.quote(doi, safe="/")
        + "?"
        + urllib.parse.urlencode({"email": email})
    )
    work = http_json(uri, email=email)
    returned_doi = valid_doi(work.get("doi"))
    if returned_doi and returned_doi != doi:
        raise ValueError(f"DOI inesperado no Unpaywall: {returned_doi} (esperado: {doi})")
    if not work.get("is_oa"):
        return {}

    def safe_link(value):
        u = str(value or "").strip()
        return u if u.startswith("https://") or u.startswith("http://") else ""

    locations = []
    best = work.get("best_oa_location") or {}
    if best:
        locations.append(best)
    locations.extend(x for x in (work.get("oa_locations") or []) if isinstance(x, dict))

    def score(loc):
        version = str(loc.get("version") or "")
        host = str(loc.get("host_type") or "")
        return (
            2 if version == "publishedVersion" else 1 if version == "acceptedVersion" else 0,
            1 if host == "publisher" else 0,
        )

    pdf_locations = [loc for loc in locations if safe_link(loc.get("url_for_pdf"))]
    pdf_location = max(pdf_locations, key=score) if pdf_locations else {}
    landing = safe_link(
        (best or {}).get("url_for_landing_page")
        or (best or {}).get("url")
        or work.get("doi_url")
    )
    pdf = safe_link(pdf_location.get("url_for_pdf"))
    return {
        "open_access": True,
        "oa_status": plain(work.get("oa_status")),
        "oa_url": landing,
        "oa_pdf": pdf,
        "oa_pdf_source": "Unpaywall" if pdf else "",
        "oa_pdf_version": plain(pdf_location.get("version")),
        "oa_pdf_host": plain(pdf_location.get("host_type")),
    }


def semantic_scholar_pdf(doi: str) -> dict:
    """Return a public PDF exposed by Semantic Scholar for the exact DOI."""
    paper_id = urllib.parse.quote("DOI:" + doi, safe=":")
    fields = urllib.parse.urlencode({"fields": "externalIds,isOpenAccess,openAccessPdf"})
    work = http_json(f"https://api.semanticscholar.org/graph/v1/paper/{paper_id}?{fields}")
    external = work.get("externalIds") or {}
    returned_doi = valid_doi(external.get("DOI"))
    if returned_doi != doi:
        raise ValueError(f"DOI inesperado no Semantic Scholar: {returned_doi} (esperado: {doi})")
    if not work.get("isOpenAccess"):
        return {}
    pdf = work.get("openAccessPdf") or {}
    url = str(pdf.get("url") or "").strip()
    if not (url.startswith("https://") or url.startswith("http://")):
        return {}
    return {
        "open_access": True,
        "oa_pdf": url,
        "oa_pdf_source": "Semantic Scholar",
        "oa_pdf_version": "publicVersion",
        "oa_pdf_host": plain(urllib.parse.urlparse(url).netloc),
    }


def github_record(user: str, repo: str, entry: dict, token: str) -> dict:
    path = "/".join(urllib.parse.quote(part, safe="") for part in [user, repo])
    info = http_json(f"https://api.github.com/repos/{path}", token=token)
    if info.get("private") or info.get("archived") or info.get("disabled"):
        raise ValueError(f"Repositório privado, arquivado ou desabilitado: {user}/{repo}")
    if info.get("full_name", "").lower() != f"{user}/{repo}".lower():
        raise ValueError(f"Repositório inesperado: {info.get('full_name')}")
    description = plain(entry.get("description") or info.get("description") or "Repositório público de pesquisa.")
    return {
        "id": "github-" + re.sub(r"[^a-z0-9]+", "-", f"{user}-{repo}".lower()).strip("-"),
        "name": plain(entry.get("name") or info.get("name") or repo),
        "description": {"pt": description, "en": description},
        "language": plain(info.get("language") or ""),
        "url": info["html_url"], "documentation": str(entry.get("documentation") or ""),
        "tags": [plain(t) for t in entry.get("tags", []) if plain(t)]
    }


def orcid_candidates(orcid: str, known: set[str]) -> list[dict]:
    client_id = os.environ.get("ORCID_CLIENT_ID", "")
    client_secret = os.environ.get("ORCID_CLIENT_SECRET", "")
    if not (client_id and client_secret):
        print("ORCID: credenciais ausentes; descoberta de DOI desativada.")
        return []
    data = urllib.parse.urlencode({"client_id": client_id, "client_secret": client_secret,
                                   "grant_type": "client_credentials", "scope": "/read-public"}).encode()
    auth = http_json("https://orcid.org/oauth/token", data=data)
    token = auth["access_token"]
    works = http_json(f"https://pub.orcid.org/v3.0/{urllib.parse.quote(orcid, safe='')}/works", token=token)
    candidates = {}
    for group in works.get("group", []):
        for external in (group.get("external-ids") or {}).get("external-id", []):
            if str(external.get("external-id-type", "")).lower() != "doi":
                continue
            doi = valid_doi(external.get("external-id-value"))
            if doi and doi not in known:
                candidates[doi] = {"doi": doi, "source": "ORCID", "requires_approval": True}
    return [candidates[doi] for doi in sorted(candidates)]


def main() -> int:
    config = read_json(ROOT / "data/sources.json", {})
    cached = read_json(ROOT / "data/sync-cache.json", {"publications": {}, "software": {}})
    email = str(config.get("contact_email") or "").strip()
    pubs, software = {}, {}
    failed = []
    configured_dois = set()
    for entry in config.get("publications", []):
        doi = valid_doi(entry.get("doi"))
        if not doi:
            raise ValueError("DOI inválido na allowlist: " + str(entry))
        if doi in configured_dois:
            raise ValueError("DOI duplicado na allowlist: " + doi)
        configured_dois.add(doi)
        try:
            record = crossref_record(doi, entry, email)
            print("Crossref OK:", doi)
            try:
                record.update(openalex_metadata(doi))
                print("OpenAlex OK:", doi)
            except (urllib.error.URLError, TimeoutError, ValueError, KeyError, OSError) as exc:
                # Bibliometrics are supplementary: preserve the last good OpenAlex
                # values when possible, otherwise keep Crossref's citation fallback.
                previous = cached.get("publications", {}).get(doi, {})
                if previous.get("citation_source") == "OpenAlex":
                    for key in ("citations", "citation_source", "citation_updated", "openalex_id",
                                "open_access", "oa_status", "oa_url", "oa_pdf", "oa_pdf_source",
                                "oa_pdf_version", "oa_pdf_host"):
                        if key in previous:
                            record[key] = previous[key]
                print(f"WARNING: OpenAlex {doi}: {exc}", file=sys.stderr)

            # OpenAlex is the primary OA signal. When it confirms OA but does not
            # expose a direct PDF, Unpaywall is used as a specialized legal full-text
            # resolver. This remains supplementary and never removes a known PDF.
            if record.get("open_access") and not record.get("oa_pdf"):
                try:
                    resolved = unpaywall_pdf(doi, email)
                    if resolved.get("oa_pdf"):
                        record.update({k: v for k, v in resolved.items() if v not in ("", None)})
                        print("Unpaywall PDF OK:", doi)
                    else:
                        print("Unpaywall: no direct OA PDF:", doi)
                except (urllib.error.URLError, TimeoutError, ValueError, KeyError, OSError) as exc:
                    previous = cached.get("publications", {}).get(doi, {})
                    if previous.get("oa_pdf"):
                        for key in ("oa_pdf", "oa_pdf_source", "oa_pdf_version", "oa_pdf_host"):
                            if key in previous:
                                record[key] = previous[key]
                    print(f"WARNING: Unpaywall {doi}: {exc}", file=sys.stderr)

            # Crossref sometimes exposes an official publisher PDF through its
            # link metadata. Use it only after OA has been independently confirmed.
            if record.get("open_access") and not record.get("oa_pdf") and record.get("crossref_pdf"):
                record["oa_pdf"] = record["crossref_pdf"]
                record["oa_pdf_source"] = "Crossref"
                record["oa_pdf_version"] = "publishedVersion"
                record["oa_pdf_host"] = "publisher"
                print("Crossref OA PDF OK:", doi)

            if record.get("open_access") and not record.get("oa_pdf"):
                try:
                    resolved = semantic_scholar_pdf(doi)
                    if resolved.get("oa_pdf"):
                        record.update(resolved)
                        print("Semantic Scholar PDF OK:", doi)
                    else:
                        print("Semantic Scholar: no public PDF:", doi)
                except (urllib.error.URLError, TimeoutError, ValueError, KeyError, OSError) as exc:
                    previous = cached.get("publications", {}).get(doi, {})
                    if previous.get("oa_pdf"):
                        for key in ("oa_pdf", "oa_pdf_source", "oa_pdf_version", "oa_pdf_host"):
                            if key in previous:
                                record[key] = previous[key]
                    print(f"WARNING: Semantic Scholar {doi}: {exc}", file=sys.stderr)

            record.pop("crossref_pdf", None)
            pubs[doi] = record
        except (urllib.error.URLError, TimeoutError, ValueError, KeyError, OSError) as exc:
            failed.append(f"Crossref {doi}: {exc}")
            if doi in cached.get("publications", {}):
                pubs[doi] = cached["publications"][doi]
    user = str(config.get("github_username") or "").strip()
    repos = config.get("github_repos", [])
    if repos and not re.fullmatch(r"[A-Za-z0-9-]{1,39}", user):
        raise ValueError("Configure github_username válido para sincronizar repositórios.")
    for entry in repos:
        name = str(entry.get("repo") or "").strip()
        if not re.fullmatch(r"[A-Za-z0-9_.-]{1,100}", name):
            raise ValueError("Nome de repositório inválido: " + name)
        try:
            software[name] = github_record(user, name, entry, os.environ.get("GITHUB_TOKEN", ""))
            print("GitHub OK:", f"{user}/{name}")
        except (urllib.error.URLError, TimeoutError, ValueError, KeyError, OSError) as exc:
            failed.append(f"GitHub {user}/{name}: {exc}")
            if name in cached.get("software", {}):
                software[name] = cached["software"][name]
    orcid = str(config.get("orcid") or "").strip()
    pending_path = ROOT / "data/pending-dois.json"
    if orcid:
        if not re.fullmatch(r"\d{4}-\d{4}-\d{4}-[\dX]{4}", orcid):
            raise ValueError("ORCID ID inválido.")
        try:
            pending = orcid_candidates(orcid, configured_dois)
            if os.environ.get("ORCID_CLIENT_ID") and os.environ.get("ORCID_CLIENT_SECRET"):
                write_if_changed(pending_path, json.dumps(pending, ensure_ascii=False, indent=2) + "\n")
                print(f"ORCID: {len(pending)} novo(s) DOI aguardando aprovação.")
        except (urllib.error.URLError, TimeoutError, ValueError, KeyError, OSError) as exc:
            failed.append(f"ORCID: {exc}")
    # Fail closed when a requested source is unavailable and there is no previous good data.
    # Never delete known publications in response to an API outage.
    for error in failed:
        print("WARNING:", error, file=sys.stderr)
    output = {"publications": [pubs[k] for k in sorted(pubs)],
              "software": [software[k] for k in sorted(software)]}
    cache = {"publications": pubs, "software": software}
    write_if_changed(ROOT / "data/sync-cache.json", json.dumps(cache, ensure_ascii=False, indent=2) + "\n")
    payload = json.dumps(output, ensure_ascii=False, separators=(",", ":"))
    generated = '''/* AUTO-GENERATED by scripts/sync_academic.py. Never edit by hand. */
(function () {
  "use strict";
  if (!window.PORTFOLIO) return;
  const incoming = ''' + payload + ''';
  const doiKey = (v) => String(v || "").toLowerCase().replace(/^https?:\\/\\/(?:dx\\.)?doi\\.org\\//, "").trim();
  const seenDoi = new Set(window.PORTFOLIO.publications.map(p => doiKey(p.doi)).filter(Boolean));
  for (const pub of incoming.publications) {
    if (!seenDoi.has(doiKey(pub.doi))) {
      window.PORTFOLIO.publications.push(pub);
      seenDoi.add(doiKey(pub.doi));
    }
  }
  const repoKey = (s) => String(s.url || "").toLowerCase().replace(/\\/$/, "");
  const seenRepo = new Set(window.PORTFOLIO.software.map(repoKey));
  for (const repo of incoming.software) {
    if (!seenRepo.has(repoKey(repo))) {
      window.PORTFOLIO.software.push(repo);
      seenRepo.add(repoKey(repo));
    }
  }
})();
'''
    modified = write_if_changed(ROOT / "assets/auto-content.js", generated)
    print("Generated assets/auto-content.js:", "changed" if modified else "unchanged")
    print(f"Published automatically: {len(pubs)} allowlisted DOI(s), {len(software)} allowlisted repo(s)")
    if failed:
        print("Há fontes indisponíveis; os dados anteriores foram preservados quando possível.")
        return 1  # Notify on workflow failures, do not publish partial updates.
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
