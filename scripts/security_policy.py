"""Generate the static site's CSP without allowing arbitrary inline JavaScript.

Meta CSP cannot enforce frame-ancestors, sandbox or reporting directives:
https://www.w3.org/TR/CSP3/#meta-element
Inline hashes cover exact script text (with HTML newline normalization):
https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/script-src
"""
from __future__ import annotations

import base64
import hashlib
from html import escape
from html.parser import HTMLParser
import re

REFERRER_POLICY = 'strict-origin-when-cross-origin'
_META_TAG = re.compile(r'[ \t]*<meta\b[^>]*>[ \t]*(?:\r?\n)?', re.I)
_JAVASCRIPT_TYPES = {
    '', 'module', 'text/javascript', 'application/javascript',
    'text/ecmascript', 'application/ecmascript', 'text/jscript',
    'application/x-javascript', 'text/x-javascript',
}


class _SecurityParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=False)
        self.metas: list[dict[str, str | None]] = []
        self.scripts: list[str] = []
        self._inline_script: list[str] | None = None

    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        if tag == 'meta':
            self.metas.append(values)
        elif tag == 'script':
            script_type = (values.get('type') or '').strip().lower()
            # JSON-LD is an inert data block, including when the language changes.
            if 'src' not in values and script_type in _JAVASCRIPT_TYPES:
                self._inline_script = []

    def handle_data(self, data):
        if self._inline_script is not None:
            self._inline_script.append(data)

    def handle_endtag(self, tag):
        if tag == 'script' and self._inline_script is not None:
            self.scripts.append(''.join(self._inline_script))
            self._inline_script = None


def inline_script_hashes(html: str) -> tuple[str, ...]:
    """Return unique quoted CSP SHA-256 sources for executable inline scripts."""
    parser = _SecurityParser()
    parser.feed(html)
    hashes = set()
    for source in parser.scripts:
        source = source.replace('\r\n', '\n').replace('\r', '\n')
        digest = base64.b64encode(hashlib.sha256(source.encode('utf-8')).digest()).decode('ascii')
        hashes.add(f"'sha256-{digest}'")
    return tuple(sorted(hashes))


def build_content_security_policy(
    html: str, *, include_frame_ancestors: bool = False,
    upgrade_insecure_requests: bool = False,
) -> str:
    """Build meta CSP, or a production HTTP policy with optional header directives.

    Only HTTP delivery supports frame-ancestors. HTTPS upgrades are optional so
    the same generated HTML also supports local HTTP and file previews.
    """
    script_sources = ' '.join(("'self'", *inline_script_hashes(html)))
    directives = [
        "default-src 'none'",
        f'script-src {script_sources}',
        "script-src-attr 'none'",
        # Existing layout attributes and the no-JS reading guide need inline CSS.
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'none'",
        "object-src 'none'",
        "base-uri 'none'",
        "form-action 'none'",
        "frame-src 'none'",
        "worker-src 'none'",
    ]
    if include_frame_ancestors:
        directives.append("frame-ancestors 'none'")
    if upgrade_insecure_requests:
        directives.append('upgrade-insecure-requests')
    return '; '.join(directives)


def strip_security_metadata(html: str) -> str:
    """Remove generated security metas from an isolated build/UI test fixture.

    UI fixtures inject scripts using add_script_tag, which production CSP must
    reject. The real HTTP checks in test_security.py retain and test the policy.
    Existing noscript/style elements are deliberately preserved.
    """
    def replace(match):
        parser = _SecurityParser()
        parser.feed(match.group(0))
        for meta in parser.metas:
            if (meta.get('http-equiv') or '').lower() == 'content-security-policy':
                return ''
            if (meta.get('name') or '').lower() == 'referrer':
                return ''
        return match.group(0)
    return _META_TAG.sub(replace, html)


def apply_security_metadata(html: str) -> str:
    """Regenerate security metas after all inline scripts have their final text."""
    html = strip_security_metadata(html)
    head = re.search(r'<head\b[^>]*>', html, flags=re.I)
    if not head:
        raise ValueError('Security metadata requires an HTML head element')
    charset = re.search(r'<meta\b[^>]*\bcharset\s*=[^>]*>', html[head.end():], flags=re.I)
    insertion = head.end() + charset.end() if charset else head.end()
    # Single quotes remain readable within this double-quoted HTML attribute.
    policy = escape(build_content_security_policy(html), quote=False).replace('"', '&quot;')
    metadata = (
        f'\n  <meta http-equiv="Content-Security-Policy" content="{policy}" />'
        f'\n  <meta name="referrer" content="{REFERRER_POLICY}" />'
    )
    return html[:insertion] + metadata + html[insertion:]
