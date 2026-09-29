"""Offline checks for the canonical domain, structured data and sitemap."""
import json
import re
from html import unescape
from pathlib import Path
from xml.etree import ElementTree as ET

from site_config import LEGACY_URL, PAGE_SLUGS, SITE_URL, page_url

root = Path(__file__).resolve().parents[1]
expected = {page_url(name) for name in PAGE_SLUGS}
page_titles = set()
page_descriptions = set()
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
    if slug == 'people':
        assert 'Pedro E. C. V. de Araújo' in html, path
        assert 'Pedro Estevão Costa Viana de Araújo' not in html, path
        assert 'Muhammad Ismail' in html, path
    assert 'href="index.html"' not in html, path
    assert html.count('class="brand" href="/"') == 2, path
    if 'class="breadcrumb"' in html:
        assert '<div class="breadcrumb"><a href="/">' in html, path
    if slug == 'index':
        assert '<a href="#main">↑ Back to top</a>' in html, path
    else:
        assert '<a href="/">↑ Back to home</a>' in html, path
    if slug in ('about', 'contact'):
        assert 'Lattes CV' in html and 'Currículo Lattes' not in html, path
    titles = re.findall(r'<title>(.*?)</title>', html, flags=re.S)
    descriptions = re.findall(r'<meta name="description" content="([^"]*)"\s*/>', html)
    og_titles = re.findall(r'<meta property="og:title" content="([^"]*)"\s*/>', html)
    og_descriptions = re.findall(r'<meta property="og:description" content="([^"]*)"\s*/>', html)
    site_names = re.findall(r'<meta property="og:site_name" content="([^"]*)"\s*/>', html)
    assert len(titles) == len(descriptions) == len(og_titles) == len(og_descriptions) == 1, path
    title, description = unescape(titles[0]), unescape(descriptions[0])
    assert 15 <= len(title) <= 90, (path, title)
    assert 85 <= len(description) <= 180, (path, description)
    assert unescape(og_titles[0]) == title and unescape(og_descriptions[0]) == description, path
    assert site_names == ['Willams Batista'], (path, site_names)
    assert title not in page_titles and description not in page_descriptions, path
    page_titles.add(title)
    page_descriptions.add(description)
    assert 'hreflang=' not in html, 'Language variants share one URL; do not fabricate alternate URLs'
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
    sites = re.findall(r'<script id="website-jsonld" type="application/ld\+json">(.*?)</script>', html, flags=re.S)
    assert len(sites) == (1 if slug == 'index' else 0), path
    if sites:
        website = json.loads(sites[0])
        assert website['@type'] == 'WebSite' and website['name'] == person['name'], path
        assert website['alternateName'] == person['alternateName'], path
        assert website['url'] == SITE_URL + '/', path

assert (root / "assets/portrait.webp").is_file()
print("DOMAIN 10 unique bilingual-ready metadata records, canonical/OG/Person, home WebSite, sitemap and robots: PASS")
