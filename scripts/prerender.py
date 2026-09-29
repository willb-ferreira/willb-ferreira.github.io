"""Prerender default Portuguese content into the static HTML for SEO and no-JS access.

Requires: pip install playwright && python -m playwright install chromium
Optional: set CHROMIUM_BIN=/path/to/chromium when Chromium is already installed.
Run this script again after updating assets/content.js, before publishing.
"""
from __future__ import annotations
import os
import re
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
PAGES = ['index','research','reading','publications','supervision','people','teaching','software','about','contact']
content = (ROOT / 'assets/content.js').read_text(encoding='utf-8')
library = (ROOT / 'assets/research-library.js').read_text(encoding='utf-8')
intro = (ROOT / 'assets/intro-library.js').read_text(encoding='utf-8')
inference = (ROOT / 'assets/inference-library.js').read_text(encoding='utf-8')
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
        tab.add_script_tag(content=auto)
        tab.add_script_tag(content=app)
        tab.locator('main h1').wait_for(timeout=5000)
        main = tab.locator('main').inner_html()
        header = tab.locator('#site-header').inner_html()
        footer = tab.locator('#site-footer').inner_html()
        structured = tab.locator('#person-jsonld').evaluate('(el) => el.outerHTML')
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
        path.write_text(html, encoding='utf-8')
        print(f'PRERENDER {path.name}: {len(main)} main HTML chars')
    browser.close()
