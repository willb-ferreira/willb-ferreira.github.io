"""Offline checks for localized static content, canonical URLs and public metadata."""
import json
import re
from html import unescape
from pathlib import Path
from xml.etree import ElementTree as ET

from security_policy import build_content_security_policy
from site_config import LANGUAGES, LEGACY_URL, PAGE_SLUGS, SITE_URL, page_file, page_path, page_url

root = Path(__file__).resolve().parents[1]
expected = {page_url(name, language) for language in LANGUAGES for name in PAGE_SLUGS}
namespace = {'s': 'http://www.sitemaps.org/schemas/sitemap/0.9', 'h': 'http://www.w3.org/1999/xhtml'}
entries = ET.parse(root / 'sitemap.xml').findall('s:url', namespace)
urls = [entry.find('s:loc', namespace).text for entry in entries]
assert len(urls) == len(expected) == 20 and set(urls) == expected, urls
for entry in entries:
    url = entry.find('s:loc', namespace).text
    slug = 'index' if url.endswith('/') else url.rsplit('/', 1)[-1][:-5]
    links = {item.attrib['hreflang']: item.attrib['href'] for item in entry.findall('h:link', namespace)}
    assert links == {'en': page_url(slug, 'en'), 'pt-BR': page_url(slug, 'pt'), 'x-default': page_url(slug, 'en')}, url
assert not any('404' in url for url in urls)
robots = (root / 'robots.txt').read_text(encoding='utf-8')
assert 'Sitemap: ' + SITE_URL + '/sitemap.xml' in robots and LEGACY_URL not in robots

summary = (root / 'assets/research-summary.js').read_text(encoding='utf-8')
research = json.loads(summary.split('window.PORTFOLIO.research=', 1)[1].rstrip().removesuffix(';'))
assert len(research) == 6 and {area['id'] for area in research} == {'spatial-models', 'theory', 'sar', 'regression', 'geometry', 'causal'}
page_titles, page_descriptions = set(), set()
guide_files = {'research-library.js', 'intro-library.js', 'inference-library.js', 'image-library.js',
               'geometry-library.js', 'regression-library.js', 'causal-library.js'}

for language in LANGUAGES:
    for slug in PAGE_SLUGS:
        path = root / page_file(slug, language)
        html = path.read_text(encoding='utf-8')
        html_language = 'pt-BR' if language == 'pt' else 'en'
        assert re.search(r'<html\b[^>]*\blang="' + html_language + '"', html), path
        assert 'data-site-lang="' + language + '"' in html, path
        canonical = re.findall(r'<link rel="canonical" href="([^"]+)"\s*/?>', html)
        og_urls = re.findall(r'<meta property="og:url" content="([^"]+)"\s*/?>', html)
        assert canonical == [page_url(slug, language)] and og_urls == canonical, path
        assert LEGACY_URL not in html, path
        alternates = dict(re.findall(r'<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"\s*/?>', html))
        assert alternates == {'en': page_url(slug, 'en'), 'pt-BR': page_url(slug, 'pt'), 'x-default': page_url(slug, 'en')}, path
        assert html.count('class="brand" href="' + page_path('index', language) + '"') == 2, path
        assert 'href="index.html"' not in html, path
        if slug == 'people':
            assert 'Pedro E. C. V. de Araújo' in html and 'Muhammad Ismail' in html, path
            assert 'Pedro Estevão Costa Viana de Araújo' not in html, path
        if slug == 'teaching':
            assert '2026.1' in html and '2026.2' in html, path
        if slug == 'contact':
            assert 'mailto:willams.bfsilva@ufpe.br' in html, path
        titles = re.findall(r'<title>(.*?)</title>', html, flags=re.S)
        descriptions = re.findall(r'<meta name="description" content="([^"]*)"\s*/?>', html)
        og_titles = re.findall(r'<meta property="og:title" content="([^"]*)"\s*/?>', html)
        og_descriptions = re.findall(r'<meta property="og:description" content="([^"]*)"\s*/?>', html)
        assert len(titles) == len(descriptions) == len(og_titles) == len(og_descriptions) == 1, path
        title, description = unescape(titles[0]), unescape(descriptions[0])
        assert 15 <= len(title) <= 90 and 85 <= len(description) <= 180, (path, title, description)
        assert unescape(og_titles[0]) == title and unescape(og_descriptions[0]) == description, path
        assert title not in page_titles and description not in page_descriptions, path
        page_titles.add(title)
        page_descriptions.add(description)
        jsonld = re.findall(r'<script id="person-jsonld" type="application/ld\+json">(.*?)</script>', html, flags=re.S)
        assert len(jsonld) == 1, path
        person = json.loads(jsonld[0])
        assert person['@type'] == 'Person' and person['name'] == 'Willams Batista', path
        assert person['alternateName'] == 'Willams B. F. da Silva', path
        assert person['url'] == SITE_URL + '/' and person['email'] == 'willams.bfsilva@ufpe.br', path
        assert person['knowsAbout'] == [area['title'][language] for area in research], path
        sites = re.findall(r'<script id="website-jsonld" type="application/ld\+json">(.*?)</script>', html, flags=re.S)
        assert len(sites) == (1 if slug == 'index' else 0), path
        if sites:
            website = json.loads(sites[0])
            assert website['@type'] == 'WebSite' and website['name'] == person['name'], path
            assert website['alternateName'] == person['alternateName'], path
            assert website['url'] == SITE_URL + '/', path
        scripts = {src.rsplit('/', 1)[-1] for src in re.findall(r'<script\b[^>]*\bsrc="([^"]+)"', html)}
        if slug == 'reading':
            assert guide_files <= scripts and 'research-summary.js' not in scripts, path
            assert 'id="reading-nojs"' in html and not re.search(r'<article\b[^>]*class="reading-area[^>]*\bhidden', html), path
        else:
            assert scripts == {'content.js', 'research-summary.js', 'auto-content.js', 'app.js'}, path
        policy = unescape(re.search(r'<meta http-equiv="Content-Security-Policy" content="([^"]*)"', html).group(1))
        assert policy == build_content_security_policy(html), path

for language in LANGUAGES:
    path = root / (('pt/' if language == 'pt' else '') + '404.html')
    html = path.read_text(encoding='utf-8')
    assert 'noindex, follow' in html and 'rel="canonical"' not in html and 'hreflang="x-default"' not in html, path
    assert 'Página não encontrada' in html if language == 'pt' else 'Page not found' in html, path
    assert 'data-page="not-found"' in html, path
    assert not re.search(r'\b(?:href|src)="assets/', html), path
    assert page_path('index', language) + '"' in html and 'mailto:willams.bfsilva@ufpe.br' not in html.split('<main', 1)[1].split('</main>', 1)[0], path

assert (root / 'assets/portrait.webp').is_file()
print('DOMAIN 20 localized static pages, canonical/hreflang/OG/JSON-LD, summary parity, 2 error pages and sitemap: PASS')
