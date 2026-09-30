"""Prerender default English content into static HTML for SEO and no-JS access.

Requires: pip install playwright && python -m playwright install chromium
Optional: set CHROMIUM_BIN=/path/to/chromium when Chromium is already installed.
Run this script again after updating assets/content.js, before publishing.
"""
from __future__ import annotations
import os
import re
import json
from html import escape as html_escape
from pathlib import Path
from site_config import PAGE_SLUGS, SITE_URL, page_url
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
PAGES = list(PAGE_SLUGS)
content = (ROOT / 'assets/content.js').read_text(encoding='utf-8')
library = (ROOT / 'assets/research-library.js').read_text(encoding='utf-8')
intro = (ROOT / 'assets/intro-library.js').read_text(encoding='utf-8')
inference = (ROOT / 'assets/inference-library.js').read_text(encoding='utf-8')
image_library = (ROOT / 'assets/image-library.js').read_text(encoding='utf-8')
geometry_library = (ROOT / 'assets/geometry-library.js').read_text(encoding='utf-8')
regression_library = (ROOT / 'assets/regression-library.js').read_text(encoding='utf-8')
causal_library = (ROOT / 'assets/causal-library.js').read_text(encoding='utf-8')
auto = (ROOT / 'assets/auto-content.js').read_text(encoding='utf-8')
app = (ROOT / 'assets/app.js').read_text(encoding='utf-8')

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=os.environ.get('CHROMIUM_BIN') or None, headless=True, args=['--no-sandbox'])
    for name in PAGES:
        path = ROOT / f'{name}.html'
        html = path.read_text(encoding='utf-8')
        stripped = re.sub(r'<script[^>]*src="[^"]+"[^>]*></script>', '', html)
        tab = browser.new_page()
        tab.set_content(stripped, wait_until='load')
        tab.add_script_tag(content=content)
        tab.add_script_tag(content=library)
        tab.add_script_tag(content=intro)
        tab.add_script_tag(content=inference)
        tab.add_script_tag(content=image_library)
        tab.add_script_tag(content=geometry_library)
        tab.add_script_tag(content=regression_library)
        tab.add_script_tag(content=causal_library)
        tab.add_script_tag(content=auto)
        tab.add_script_tag(content=app)
        tab.locator('main h1').wait_for(timeout=5000)
        main = tab.locator('main').inner_html()
        header = tab.locator('#site-header').inner_html()
        footer = tab.locator('#site-footer').inner_html()
        structured = tab.locator('#person-jsonld').evaluate('(el) => el.outerHTML')
        website_structured = tab.locator('#website-jsonld').evaluate('(el) => el.outerHTML') if name == 'index' else None
        metadata = {
            'title': tab.title(),
            'description': tab.locator('meta[name="description"]').get_attribute('content'),
            'og_title': tab.locator('meta[property="og:title"]').get_attribute('content'),
            'og_description': tab.locator('meta[property="og:description"]').get_attribute('content'),
            'site_name': tab.evaluate('window.PORTFOLIO.profile.name'),
        }
        tab.close()
        html = re.sub(r'<main id="main" tabindex="-1">.*?</main>',
                      lambda _: f'<main id="main" tabindex="-1">{main}</main>', html, count=1, flags=re.S)
        html = re.sub(r'<div id="site-header">.*?</div>(?=\s*<main)',
                      lambda _: f'<div id="site-header">{header}</div>', html, count=1, flags=re.S)
        html = re.sub(r'<div id="site-footer">.*?</div>(?=\s*<div id="toast")',
                      lambda _: f'<div id="site-footer">{footer}</div>', html, count=1, flags=re.S)
        if 'id="person-jsonld"' in html:
            html = re.sub(r'<script id="person-jsonld" type="application/ld\+json">.*?</script>',
                          lambda _: structured, html, count=1, flags=re.S)
        else:
            html = html.replace('  </head>', structured + '\n  </head>') if '  </head>' in html else html.replace('</head>', structured + '\n</head>')
        if website_structured:
            if 'id="website-jsonld"' in html:
                html = re.sub(r'<script id="website-jsonld" type="application/ld\+json">.*?</script>',
                              lambda _: website_structured, html, count=1, flags=re.S)
            else:
                html = html.replace('</head>', website_structured + '\n</head>', 1)
        # Canonical/OG and Person metadata are regenerated from one production URL.
        # Never rely on editing only a generated HTML document.
        canonical_url = page_url(name)
        replacements = (
            (r'<title>.*?</title>', f'<title>{html_escape(metadata["title"])}</title>'),
            (r'<meta name="description" content="[^"]*"\s*/>', f'<meta name="description" content="{html_escape(metadata["description"], quote=True)}" />'),
            (r'<meta property="og:title" content="[^"]*"\s*/>', f'<meta property="og:title" content="{html_escape(metadata["og_title"], quote=True)}" />'),
            (r'<meta property="og:description" content="[^"]*"\s*/>', f'<meta property="og:description" content="{html_escape(metadata["og_description"], quote=True)}" />'),
            (r'<link rel="canonical" href="[^"]+"\s*/>', f'<link rel="canonical" href="{canonical_url}" />'),
            (r'<meta property="og:url" content="[^"]+"\s*/>', f'<meta property="og:url" content="{canonical_url}" />'),
            (r'<meta property="og:image" content="[^"]+"\s*/>', f'<meta property="og:image" content="{SITE_URL}/assets/portrait.webp" />'),
        )
        for pattern, replacement in replacements:
            if len(re.findall(pattern, html)) != 1:
                raise RuntimeError(f'{name}: expected exactly one matching metadata tag: {pattern}')
            html = re.sub(pattern, lambda _: replacement, html, count=1)
        site_name_tag = f'<meta property="og:site_name" content="{html_escape(metadata["site_name"], quote=True)}" />'
        if re.search(r'<meta property="og:site_name"', html):
            html = re.sub(r'<meta property="og:site_name" content="[^"]*"\s*/>',
                          lambda _: site_name_tag, html, count=1)
        else:
            html = html.replace('  <meta property="og:title"', '  ' + site_name_tag + '\n  <meta property="og:title"', 1)
        person_match = re.search(
            r'(<script id="person-jsonld" type="application/ld\+json">)(.*?)(</script>)',
            html, flags=re.S,
        )
        if not person_match:
            raise RuntimeError(f'{name}: missing Person structured data')
        person = json.loads(person_match.group(2))
        person['url'] = SITE_URL + '/'
        structured_json = json.dumps(person, ensure_ascii=False, separators=(',', ':')).replace('<', '\\u003c')
        html = html[:person_match.start(2)] + structured_json + html[person_match.end(2):]
        # Static HTML follows the visitor's browser/OS preference before deferred JS runs.
        # JavaScript then resolves the effective theme and preserves any manual override.
        html, theme_count = re.subn(
            r'(<html\b[^>]*\bdata-theme=")(?:light|dark|system)(")',
            r'\1system\2',
            html,
            count=1,
        )
        if theme_count != 1:
            raise RuntimeError(f'{name}: expected exactly one html data-theme attribute')
        path.write_text(html, encoding='utf-8')
        print(f'PRERENDER {path.name}: {len(main)} main HTML chars')
    browser.close()
