"""Generate sitemap.xml and robots.txt from the canonical site URL.

No arguments are needed in CI. One optional HTTPS URL keeps the prior CLI override.
"""
import sys
from pathlib import Path
from urllib.parse import urlparse
from xml.sax.saxutils import escape

from site_config import PAGE_SLUGS, SITE_URL

if len(sys.argv) > 2:
    raise SystemExit("Usage: python scripts/generate_sitemap.py [https://your-real-domain/]")
base = (sys.argv[1] if len(sys.argv) == 2 else SITE_URL).strip().rstrip("/")
parsed = urlparse(base)
if (parsed.scheme != "https" or not parsed.netloc or parsed.username or parsed.password
        or parsed.query or parsed.fragment):
    raise SystemExit("Provide a public HTTPS site URL")
root = Path(__file__).resolve().parents[1]
urls = "\n".join(
    f'  <url><loc>{escape(base + "/" if name == "index" else base + "/" + name + ".html")}</loc></url>'
    for name in PAGE_SLUGS
)
(root / "sitemap.xml").write_text(
    '<?xml version="1.0" encoding="UTF-8"?>\n'
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    + urls + '\n</urlset>\n', encoding="utf-8"
)
(root / "robots.txt").write_text(
    "User-agent: *\nAllow: /\nSitemap: " + base + "/sitemap.xml\n",
    encoding="utf-8",
)
print("Created sitemap.xml and updated robots.txt for", base)
