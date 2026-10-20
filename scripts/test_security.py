"""Check generated security metadata and browser enforcement over real HTTP.

Unlike isolated UI fixtures, this suite never removes or bypasses the page CSP.
Run after prerender.py. --root can check an assembled public deployment folder.
"""
from __future__ import annotations

import argparse
import base64
import functools
import hashlib
from html.parser import HTMLParser
import http.server
import os
from pathlib import Path
import threading

from playwright.sync_api import sync_playwright
from security_policy import (
    REFERRER_POLICY, apply_security_metadata, build_content_security_policy,
    inline_script_hashes, strip_security_metadata,
)
from site_config import PAGE_SLUGS

ROOT = Path(__file__).resolve().parents[1]


class MetadataParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.metas = []

    def handle_starttag(self, tag, attrs):
        if tag == 'meta':
            self.metas.append(dict(attrs))


def check_generator():
    source = 'window.securityBootstrap = true;\n'
    fixture = ('<!doctype html><html><head><meta charset="utf-8">\n'
               f'<script>{source}</script>'
               '<script type="application/ld+json">{"name":"Research"}</script>'
               '<noscript><style>.reading-index{display:grid}</style></noscript>'
               '</head><body></body></html>')
    digest = base64.b64encode(hashlib.sha256(source.encode()).digest()).decode()
    assert inline_script_hashes(fixture) == (f"'sha256-{digest}'",)
    assert inline_script_hashes(fixture.replace('\n', '\r\n')) == inline_script_hashes(fixture)
    hardened = apply_security_metadata(fixture)
    assert apply_security_metadata(hardened) == hardened, 'Metadata regeneration must be idempotent'
    assert strip_security_metadata(hardened) == fixture, 'Fixture removal must preserve noscript and CSS order'
    changed = apply_security_metadata(hardened.replace(source, 'window.changed = true;'))
    assert digest not in changed, 'Changed inline code must replace the old CSP hash'
    assert 'frame-ancestors' not in build_content_security_policy(fixture)
    header = build_content_security_policy(fixture, include_frame_ancestors=True, upgrade_insecure_requests=True)
    assert "frame-ancestors 'none'" in header and 'upgrade-insecure-requests' in header
    print('SECURITY generator: exact hashes, newline normalization, inert JSON-LD, safe regeneration: PASS', flush=True)


def check_generated_files(root):
    for name in PAGE_SLUGS:
        html = (root / f'{name}.html').read_text(encoding='utf-8')
        parser = MetadataParser()
        parser.feed(html)
        policies = [meta.get('content') for meta in parser.metas
                    if meta.get('http-equiv', '').lower() == 'content-security-policy']
        assert policies == [build_content_security_policy(html)], (name, 'Missing or stale CSP; run prerender.py')
        referrers = [meta.get('content') for meta in parser.metas if meta.get('name', '').lower() == 'referrer']
        assert referrers == [REFERRER_POLICY], (name, 'Wrong referrer policy')
        assert html.lower().index('http-equiv="content-security-policy"') < html.lower().index('<script'), name
        directives = dict((part.strip().split(' ', 1) + [''])[:2] for part in policies[0].split(';'))
        assert "'unsafe-inline'" not in directives['script-src'], name
        assert "'unsafe-eval'" not in directives['script-src'], name
        assert directives['script-src-attr'] == "'none'", name
        for directive in ['default-src', 'connect-src', 'object-src', 'base-uri', 'form-action', 'frame-src', 'worker-src']:
            assert directives[directive] == "'none'", (name, directive)
        assert 'frame-ancestors' not in directives and 'upgrade-insecure-requests' not in directives, name
    print(f'SECURITY all {len(PAGE_SLUGS)} generated pages have current CSP and referrer metadata: PASS', flush=True)


PROBE_SOURCE = r'''
window.securityProbe = {evalBlocked:false, fetchBlocked:false};
try { new Function('window.securityUnexpectedEval = true')(); }
catch (error) { securityProbe.evalBlocked = error instanceof EvalError; }
const inline = document.createElement('script');
inline.textContent = 'window.securityUnexpectedInline = true';
document.head.append(inline);
const button = document.createElement('button');
button.setAttribute('onclick', 'window.securityUnexpectedHandler = true');
document.body.append(button); button.click();
const external = document.createElement('script');
external.src = 'https://security-probe.invalid/blocked.js'; document.head.append(external);
fetch('/robots.txt?__security_probe').catch(() => { securityProbe.fetchBlocked = true; });
const base = document.createElement('base');
base.href = 'https://security-probe.invalid/'; document.head.append(base);
const object = document.createElement('object');
object.data = 'https://security-probe.invalid/object'; document.body.append(object);
const image = document.createElement('img');
image.src = 'https://security-probe.invalid/image.png'; document.body.append(image);
const frame = document.createElement('iframe');
frame.src = 'https://security-probe.invalid/frame'; document.body.append(frame);
const form = document.createElement('form');
form.action = '/__security_form_probe'; form.method = 'POST'; document.body.append(form);
form.submit();
securityProbe.finished = true;
'''


def check_browser(root):
    received_probe_requests = []

    class Handler(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *unused):
            pass

        def do_GET(self):
            if self.path == '/__security_probe.js':
                payload = PROBE_SOURCE.encode('utf-8')
                self.send_response(200)
                self.send_header('Content-Type', 'text/javascript; charset=utf-8')
                self.send_header('Content-Length', str(len(payload)))
                self.end_headers()
                self.wfile.write(payload)
                return
            if '__security_probe' in self.path:
                received_probe_requests.append(self.path)
            super().do_GET()

        def do_POST(self):
            received_probe_requests.append(self.path)
            self.send_error(405)

    server = http.server.ThreadingHTTPServer(('127.0.0.1', 0), functools.partial(Handler, directory=str(root)))
    threading.Thread(target=server.serve_forever, daemon=True).start()
    base_url = f'http://127.0.0.1:{server.server_port}/'
    errors = []
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(executable_path=os.environ.get('CHROMIUM_BIN') or None, headless=True, args=['--no-sandbox'])
            context = browser.new_context(color_scheme='dark', accept_downloads=True)
            context.add_init_script('''window.securityViolations=[];
              document.addEventListener('securitypolicyviolation',event=>{
                securityViolations.push({directive:event.effectiveDirective,blocked:event.blockedURI});
              });''')
            # The reserved .invalid host is never contacted, even if a regression occurs.
            context.route('https://security-probe.invalid/**', lambda route: route.abort())
            page = context.new_page()
            page.on('pageerror', lambda error: errors.append(str(error)))
            for name in PAGE_SLUGS:
                response = page.goto(base_url + ('' if name == 'index' else name + '.html'), wait_until='networkidle')
                assert response.status == 200, name
                assert page.evaluate('Boolean(window.PORTFOLIO)'), (name, 'Own scripts must execute')
                assert page.locator('main h1').count() == 1, name
                assert page.locator('html').get_attribute('data-theme') == 'dark', name
                page.locator('#language-toggle').click()
                assert page.locator('html').get_attribute('lang') == 'pt-BR', name
                page.locator('#language-toggle').click()
                assert page.locator('html').get_attribute('lang') == 'en', name
                page.locator('#theme-toggle').click()
                assert page.locator('html').get_attribute('data-theme') == 'light', name
                page.locator('#theme-toggle').click()
                if name == 'publications':
                    with page.expect_download() as download_info:
                        page.locator('#export-bibtex').click()
                    assert download_info.value.suggested_filename.endswith('.bib')
                assert page.evaluate('securityViolations') == [], (name, page.evaluate('securityViolations'))
            print('SECURITY real HTTP: all ten pages, EN/PT, themes, JSON-LD and BibTeX work under CSP: PASS', flush=True)

            page.goto(base_url, wait_until='networkidle')
            original_base = page.evaluate('document.baseURI')
            # Playwright's add_script_tag loader injects an inline wrapper. Create
            # an ordinary same-origin external script without weakening the CSP.
            page.evaluate('''url=>new Promise((resolve,reject)=>{
                const script=document.createElement('script');
                script.src=url;
                script.onload=()=>resolve(true);
                script.onerror=()=>reject(new Error('Same-origin security probe did not load'));
                document.head.append(script);
            })''', base_url + '__security_probe.js')
            page.wait_for_function('window.securityProbe?.finished && securityProbe.fetchBlocked')
            expected = {'script-src', 'script-src-elem', 'script-src-attr', 'connect-src',
                        'base-uri', 'object-src', 'img-src', 'frame-src', 'form-action'}
            page.wait_for_function('(expected)=>expected.every(d=>securityViolations.some(v=>v.directive===d))', arg=sorted(expected))
            assert page.evaluate('securityProbe.evalBlocked'), 'eval must be blocked from an ordinary same-origin script'
            assert page.evaluate('!window.securityUnexpectedInline && !window.securityUnexpectedHandler && !window.securityUnexpectedEval')
            assert page.evaluate('document.baseURI') == original_base
            assert not received_probe_requests, received_probe_requests
            assert not errors, errors
            print('SECURITY enforcement: inline/remote scripts, handlers, eval, fetch, base, objects, frames, remote images and forms blocked: PASS', flush=True)
            context.close()

            nojs = browser.new_context(java_script_enabled=False)
            reading = nojs.new_page()
            reading.goto(base_url + 'reading.html', wait_until='load')
            assert reading.locator('.reading-area:visible').count() == 6
            assert reading.locator('.reading-mobile-picker').is_hidden()
            assert reading.locator('.reading-pagination').is_hidden()
            nojs.close()
            browser.close()
            print('SECURITY no-JS reading guides retain all six guides and fallback styles: PASS', flush=True)
    finally:
        server.shutdown()
        server.server_close()


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root', type=Path, default=ROOT, help='Generated public site folder to test')
    args = parser.parse_args()
    check_generator()
    check_generated_files(args.root.resolve())
    check_browser(args.root.resolve())
    print('ALL SECURITY CHECKS PASSED', flush=True)
