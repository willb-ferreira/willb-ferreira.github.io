"""Create a sitemap.xml and robots.txt after the website has a production URL.

Example: python scripts/generate_sitemap.py https://research.example.edu/
"""
import sys
from pathlib import Path
from urllib.parse import urlparse
from xml.sax.saxutils import escape

if len(sys.argv) != 2:
    raise SystemExit('Usage: python scripts/generate_sitemap.py https://your-real-domain/')
base = sys.argv[1].strip().rstrip('/')
parsed = urlparse(base)
if parsed.scheme != 'https' or not parsed.netloc or parsed.username or parsed.password:
    raise SystemExit('Provide your public HTTPS website URL, for example https://example.edu/~name')
root = Path(__file__).resolve().parents[1]
files = ['index','research','publications','supervision','people','teaching','software','about','contact']
urls = '\n'.join(f'  <url><loc>{escape(base+"/"+name+".html")}</loc></url>' for name in files)
(root/'sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+urls+'\n</urlset>\n',encoding='utf-8')
(root/'robots.txt').write_text('User-agent: *\nAllow: /\nSitemap: '+base+'/sitemap.xml\n',encoding='utf-8')
print('Created sitemap.xml and updated robots.txt for',base)
