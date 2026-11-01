"""Generate sitemap.xml and robots.txt from the canonical site URL.

No arguments are needed in CI. One optional HTTPS URL keeps the prior CLI override.
"""
import sys
from pathlib import Path
from urllib.parse import urlparse
from xml.sax.saxutils import escape

from site_config import LANGUAGES, PAGE_SLUGS, SITE_URL, page_path

if len(sys.argv) > 2:
    raise SystemExit("Usage: python scripts/generate_sitemap.py [https://your-real-domain/]")
base = (sys.argv[1] if len(sys.argv) == 2 else SITE_URL).strip().rstrip("/")
parsed = urlparse(base)
if (parsed.scheme != "https" or not parsed.netloc or parsed.username or parsed.password
        or parsed.query or parsed.fragment):
    raise SystemExit("Provide a public HTTPS site URL")
root = Path(__file__).resolve().parents[1]
entries = []
for language in LANGUAGES:
    for name in PAGE_SLUGS:
        alternatives = "".join(
            f'<xhtml:link rel="alternate" hreflang="{code}" href="{escape(base + page_path(name, variant))}" />'
            for code, variant in (("en", "en"), ("pt-BR", "pt"), ("x-default", "en"))
        )
        entries.append(f'  <url><loc>{escape(base + page_path(name, language))}</loc>{alternatives}</url>')
urls = "\n".join(entries)
(root / "sitemap.xml").write_text(
    '<?xml version="1.0" encoding="UTF-8"?>\n'
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n'
    + urls + '\n</urlset>\n', encoding="utf-8"
)
(root / "robots.txt").write_text(
    "User-agent: *\nAllow: /\nSitemap: " + base + "/sitemap.xml\n",
    encoding="utf-8",
)
print("Created sitemap.xml and updated robots.txt for", base)
