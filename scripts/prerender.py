"""Build complete EN/PT HTML, a small research summary and localized 404 pages.

Requires Playwright and Chromium. CHROMIUM_BIN may select an installed browser.
The full curated guides are needed only by reading.html. Their final research
card metadata is extracted so other pages retain identical titles and summaries
without downloading the bibliographies.
"""
from __future__ import annotations

import json
import os
import re
from html import escape, unescape
from pathlib import Path
from urllib.parse import urlsplit

from playwright.sync_api import sync_playwright
from security_policy import apply_security_metadata, strip_security_metadata
from site_config import LANGUAGES, PAGE_SLUGS, page_file, page_path, page_url

ROOT = Path(__file__).resolve().parents[1]
GUIDE_SCRIPTS = (
    'research-library.js', 'intro-library.js', 'inference-library.js',
    'image-library.js', 'geometry-library.js', 'regression-library.js', 'causal-library.js',
)
THEME_BOOTSTRAP = '''<script id="theme-bootstrap">(()=>{try{const saved=localStorage.getItem("wb-theme");const mode=saved==="light"||saved==="dark"?saved:"system";document.documentElement.dataset.theme=mode;const resolved=mode==="system"?(window.matchMedia?.("(prefers-color-scheme: dark)").matches?"dark":"light"):mode;const meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.content=resolved==="dark"?"#161d1c":"#f7f9f7"}catch{document.documentElement.dataset.theme="system"}})();</script>'''
FIRST_VISIT_LANGUAGE = '''(()=>{try{if(/^https?:$/.test(location.protocol)&&["/","/index.html"].includes(location.pathname)&&!localStorage.getItem("wb-lang")&&/^pt(?:-|$)/i.test(navigator.language||""))location.replace("/pt/"+location.search+location.hash)}catch{}})();'''
READING_NOJS = '''<noscript id="reading-nojs"><style>.reading-mobile-picker,.reading-pagination{display:none}.reading-index{display:grid;position:static;max-height:none;overflow:visible}</style></noscript>'''
NOT_FOUND_META = {
    'en': ('Page not found | Willams Batista',
           'The requested page could not be found. Return to the academic website of Willams Batista or explore publications and contact information.'),
    'pt': ('Página não encontrada | Willams Batista',
           'A página solicitada não foi encontrada. Volte ao site acadêmico de Willams Batista ou consulte as publicações e informações de contato.'),
}


def replace_once(html: str, pattern: str, replacement: str, label: str) -> str:
    html, count = re.subn(pattern, lambda _: replacement, html, count=1, flags=re.S)
    if count != 1:
        raise RuntimeError(f'{label}: expected one matching element: {pattern}')
    return html


def set_locale(html: str, language: str) -> str:
    def attributes(match):
        attrs = re.sub(r'\s+(?:lang|data-site-lang|data-theme)="[^"]*"', '', match.group(1))
        html_lang = 'pt-BR' if language == 'pt' else 'en'
        return f'<html{attrs} lang="{html_lang}" data-theme="system" data-site-lang="{language}">'
    return re.sub(r'<html\b([^>]*)>', attributes, html, count=1)


def external_scripts(html: str, name: str) -> str:
    html = re.sub(r'^[ \t]*<script\b[^>]*\bsrc="[^"]+"[^>]*></script>[ \t]*\n?', '', html, flags=re.M)
    sources = ['content.js', *(GUIDE_SCRIPTS if name == 'reading' else ('research-summary.js',)),
               'auto-content.js', 'app.js']
    tags = ''.join(f'  <script src="assets/{source}" defer></script>\n' for source in sources)
    return html.replace('</head>', tags + '</head>', 1)


def normalize_links(html: str, name: str, language: str) -> str:
    """Localize page links and make nested pages/404 independent of URL depth."""
    opposite = 'en' if language == 'pt' else 'pt'
    target = page_path('index' if name == 'not-found' else name, opposite)

    def language_link(match):
        opening, contents = match.group(1), match.group(2)
        attrs = re.sub(r'\s+(?:type|href|hreflang|lang)="[^"]*"', '', opening)
        attrs = re.sub(r'^<(?:button|a)\b', '<a', attrs)
        code = 'pt-BR' if opposite == 'pt' else 'en'
        return attrs[:-1] + f' href="{target}" hreflang="{code}" lang="{code}">' + contents + '</a>'
    html = re.sub(r'(<(?:a|button)\b(?=[^>]*\bid="language-toggle")[^>]*>)(.*?)</(?:a|button)>',
                  language_link, html, flags=re.S)

    def anchor(match):
        tag = match.group(0)
        if 'id="language-toggle"' in tag:
            return tag
        href_match = re.search(r'\bhref="([^"]*)"', tag)
        if not href_match:
            return tag
        parsed = urlsplit(unescape(href_match.group(1)))
        if parsed.scheme or parsed.netloc or not parsed.path:
            return tag
        path = parsed.path
        if path.startswith('/pt/'):
            path = path[3:]
        path = path.lstrip('/')
        slug = 'index' if path in ('', 'index.html') else path[:-5] if path.endswith('.html') else None
        if slug not in PAGE_SLUGS:
            return tag
        localized = page_path(slug, language)
        if language == 'en' and name != 'not-found' and slug != 'index':
            localized = slug + '.html'
        if parsed.query:
            localized += '?' + parsed.query
        if parsed.fragment:
            localized += '#' + parsed.fragment
        return tag[:href_match.start(1)] + escape(localized, quote=True) + tag[href_match.end(1):]
    html = re.sub(r'<a\b[^>]*>', anchor, html)
    if language == 'pt' or name == 'not-found':
        html = re.sub(r'\b(href|src)="(?:\.?\.?/)*assets/', r'\1="/assets/', html)
    return html


def finalize_html(html: str, snapshot: dict, name: str, language: str) -> str:
    html = replace_once(html, r'<main\b[^>]*>.*?</main>',
                        '<main id="main" tabindex="-1">' + snapshot['main'] + '</main>', name)
    html = replace_once(html, r'<div id="site-header">.*?</div>(?=\s*<main)',
                        '<div id="site-header">' + snapshot['header'] + '</div>', name)
    html = replace_once(html, r'<div id="site-footer">.*?</div>(?=\s*<div id="toast")',
                        '<div id="site-footer">' + snapshot['footer'] + '</div>', name)
    html = replace_once(html, r'<a\b[^>]*class="skip-link"[^>]*>.*?</a>', snapshot['skip'], name)
    for element_id in ('person-jsonld', 'website-jsonld'):
        html = re.sub(r'<script id="' + element_id + r'" type="application/ld\+json">.*?</script>\s*', '', html, flags=re.S)
        if snapshot.get(element_id):
            html = html.replace('</head>', snapshot[element_id] + '\n</head>', 1)
    title, description = (NOT_FOUND_META[language] if name == 'not-found'
                          else (snapshot['title'], snapshot['description']))
    replacements = (
        (r'<title>.*?</title>', f'<title>{escape(title)}</title>'),
        (r'<meta name="description" content="[^"]*"\s*/?>', f'<meta name="description" content="{escape(description, quote=True)}" />'),
        (r'<meta property="og:title" content="[^"]*"\s*/?>', f'<meta property="og:title" content="{escape(title, quote=True)}" />'),
        (r'<meta property="og:description" content="[^"]*"\s*/?>', f'<meta property="og:description" content="{escape(description, quote=True)}" />'),
    )
    for pattern, replacement in replacements:
        html = replace_once(html, pattern, replacement, name)
    html = re.sub(r'^[ \t]*<link\b[^>]*\brel="alternate"[^>]*>\s*', '', html, flags=re.M)
    if name == 'not-found':
        html = re.sub(r'<link\b[^>]*\brel="canonical"[^>]*>\s*', '', html)
        html = re.sub(r'<meta property="og:url"[^>]*>\s*', '', html)
        html = re.sub(r'<meta name="robots"[^>]*>\s*', '', html)
        html = html.replace('</head>', '  <meta name="robots" content="noindex, follow" />\n</head>', 1)
    else:
        url = page_url(name, language)
        html = replace_once(html, r'<link rel="canonical" href="[^"]+"\s*/?>', f'<link rel="canonical" href="{url}" />', name)
        html = replace_once(html, r'<meta property="og:url" content="[^"]+"\s*/?>', f'<meta property="og:url" content="{url}" />', name)
        alternate_tags = ''.join(f'  <link rel="alternate" hreflang="{code}" href="{page_url(name, variant)}" />\n'
                                 for code, variant in (('en', 'en'), ('pt-BR', 'pt'), ('x-default', 'en')))
        html = html.replace('</head>', alternate_tags + '</head>', 1)
    bootstrap = THEME_BOOTSTRAP
    if name == 'index' and language == 'en':
        bootstrap = bootstrap.replace('</script>', FIRST_VISIT_LANGUAGE + '</script>')
    if 'id="theme-bootstrap"' in html:
        html = re.sub(r'<script id="theme-bootstrap">.*?</script>', lambda _: bootstrap, html, count=1, flags=re.S)
    else:
        html = re.sub(r'(<link rel="stylesheet"[^>]*>)', lambda match: bootstrap + '\n  ' + match.group(1), html, count=1)
    if name == 'reading':
        html = re.sub(r'<noscript id="reading-nojs">.*?</noscript>\s*', '', html, flags=re.S)
        html = html.replace('</head>', READING_NOJS + '\n</head>', 1)
    html = external_scripts(html, name)
    html = normalize_links(set_locale(html, language), name, language)
    html = re.sub(r'\n{3,}', '\n\n', html)
    return apply_security_metadata(html)


def build() -> None:
    sources = {filename: (ROOT / 'assets' / filename).read_text(encoding='utf-8')
               for filename in ('content.js', *GUIDE_SCRIPTS, 'auto-content.js', 'app.js')}
    templates = {name: (ROOT / f'{name}.html').read_text(encoding='utf-8') for name in PAGE_SLUGS}
    templates['not-found'] = (ROOT / 'templates/404.html').read_text(encoding='utf-8')
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(executable_path=os.environ.get('CHROMIUM_BIN') or None,
                                             headless=True, args=['--no-sandbox'])
        summary_page = browser.new_page()
        summary_page.set_content('<!doctype html><html><head></head><body></body></html>')
        for filename in ('content.js', *GUIDE_SCRIPTS):
            summary_page.add_script_tag(content=sources[filename])
        research = summary_page.evaluate('window.PORTFOLIO.research')
        summary_page.close()
        summary = ('/* Generated by scripts/prerender.py; edit the curated guide sources. */\n'
                   'if(window.PORTFOLIO)window.PORTFOLIO.research='
                   + json.dumps(research, ensure_ascii=False, separators=(',', ':')).replace('<', '\\u003c') + ';\n')
        (ROOT / 'assets/research-summary.js').write_text(summary, encoding='utf-8', newline='\n')
        sources['research-summary.js'] = summary
        print(f'RESEARCH SUMMARY: {len(summary.encode("utf-8"))} bytes; exact final metadata for {len(research)} areas')
        for language in LANGUAGES:
            for name, template in templates.items():
                html = set_locale(template, language)
                html = strip_security_metadata(html)
                stripped = re.sub(r'<script\b[^>]*\bsrc="[^"]+"[^>]*></script>', '', html)
                tab = browser.new_page()
                tab.set_content(stripped, wait_until='load')
                tab.evaluate('(language) => { window.__PRERENDER_LANG__=language; document.documentElement.dataset.siteLang=language; }', language)
                scripts = ('content.js', *(GUIDE_SCRIPTS if name == 'reading' else ('research-summary.js',)), 'auto-content.js', 'app.js')
                for filename in scripts:
                    tab.add_script_tag(content=sources[filename])
                tab.locator('main h1').first.wait_for(timeout=5000)
                if name == 'reading':
                    tab.locator('.reading-area').evaluate_all('(articles) => articles.forEach(article => article.hidden = false)')
                    tab.locator('.reading-index [aria-current="location"]').evaluate_all('(links) => links.forEach(link => link.removeAttribute("aria-current"))')
                snapshot = {
                    'main': tab.locator('main').inner_html(),
                    'header': tab.locator('#site-header').inner_html(),
                    'footer': tab.locator('#site-footer').inner_html(),
                    'skip': tab.locator('.skip-link').evaluate('(el) => el.outerHTML'),
                    'title': tab.title(),
                    'description': tab.locator('meta[name="description"]').get_attribute('content'),
                }
                for element_id in ('person-jsonld', 'website-jsonld'):
                    element = tab.locator('#' + element_id)
                    snapshot[element_id] = element.evaluate('(el) => el.outerHTML') if element.count() else None
                tab.close()
                filename = (('pt/' if language == 'pt' else '') + '404.html' if name == 'not-found' else page_file(name, language))
                output = ROOT / filename
                output.parent.mkdir(parents=True, exist_ok=True)
                output.write_text(finalize_html(html, snapshot, name, language), encoding='utf-8', newline='\n')
                print(f'PRERENDER {filename}: {len(snapshot["main"])} main HTML chars')
        browser.close()


if __name__ == '__main__':
    build()
