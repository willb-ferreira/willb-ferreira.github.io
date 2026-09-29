"""Offline checks for the canonical domain, structured data and sitemap."""
import json
import re
from pathlib import Path
from xml.etree import ElementTree as ET

from site_config import LEGACY_URL, PAGE_SLUGS, SITE_URL, page_url

root = Path(__file__).resolve().parents[1]
expected = {page_url(name) for name in PAGE_SLUGS}
urls = [loc.text for loc in ET.parse(root / "sitemap.xml").findall(
    ".//{http://www.sitemaps.org/schemas/sitemap/0.9}loc"
)]
assert len(urls) == len(PAGE_SLUGS) and set(urls) == expected, urls
robots = (root / "robots.txt").read_text(encoding="utf-8")
assert "Sitemap: " + SITE_URL + "/sitemap.xml" in robots
assert LEGACY_URL not in robots

for slug in PAGE_SLUGS:
    path = root / (slug + ".html")
    html = path.read_text(encoding="utf-8")
    canonical = re.findall(r'<link rel="canonical" href="([^"]+)"\s*/>', html)
    og_urls = re.findall(r'<meta property="og:url" content="([^"]+)"\s*/>', html)
    og_images = re.findall(r'<meta property="og:image" content="([^"]+)"\s*/>', html)
    assert canonical == [page_url(slug)], (path, canonical)
    assert og_urls == canonical, (path, og_urls)
    assert og_images == [SITE_URL + "/assets/portrait.webp"], (path, og_images)
    assert LEGACY_URL not in html, path
    jsonld = re.findall(
        r'<script id="person-jsonld" type="application/ld\+json">(.*?)</script>',
        html, flags=re.S,
    )
    assert len(jsonld) == 1, path
    person = json.loads(jsonld[0])
    assert person["@type"] == "Person", path
    assert person["name"] == "Willams Batista", path
    assert person["alternateName"] == "Willams B. F. da Silva", path
    assert person["url"] == SITE_URL + "/", path
    assert person["email"] == "willams.bfsilva@ufpe.br", path

assert (root / "assets/portrait.webp").is_file()
print("DOMAIN 10 canonical/OG/Person records, sitemap and robots: PASS")
