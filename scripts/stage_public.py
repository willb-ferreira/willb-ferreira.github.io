"""Build a public-only deployment directory from the generated website."""
from __future__ import annotations

import argparse
from html.parser import HTMLParser
from pathlib import Path, PurePosixPath
import posixpath
import re
import shutil
from urllib.parse import unquote, urlsplit

from site_config import PAGE_SLUGS, SITE_URL

ROOT = Path(__file__).resolve().parents[1]
PUBLIC_FILES = ('.nojekyll', 'sitemap.xml', 'robots.txt')
ASSET_EXTENSIONS = {'.js', '.css', '.webp', '.svg', '.png', '.jpg', '.jpeg',
                    '.gif', '.ico', '.woff', '.woff2'}


class RuntimeReferences(HTMLParser):
    def __init__(self):
        super().__init__()
        self.references: set[str] = set()

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag in ('script', 'img', 'source') and attrs.get('src'):
            self.references.add(attrs['src'])
        if tag in ('img', 'source') and attrs.get('srcset'):
            self.references.update(item.strip().split()[0]
                                   for item in attrs['srcset'].split(',') if item.strip())
        if tag == 'link' and set(attrs.get('rel', '').split()) & {'stylesheet', 'icon'}:
            if attrs.get('href'):
                self.references.add(attrs['href'])


def local_asset(reference: str, base: PurePosixPath = PurePosixPath('.')) -> Path | None:
    url = urlsplit(reference.strip())
    if url.scheme or url.netloc:
        if url.scheme not in ('http', 'https') or url.netloc != urlsplit(SITE_URL).netloc:
            return None
    path = unquote(url.path)
    if not path:
        return None
    if '\\' in path:
        raise ValueError(f'Backslashes are not permitted in a public asset URL: {reference}')
    normalized = posixpath.normpath(path.lstrip('/') if path.startswith('/') else str(base / path))
    relative = PurePosixPath(normalized)
    if not relative.parts or relative.parts[0] != 'assets' or '..' in relative.parts:
        raise ValueError(f'Runtime resources must stay inside assets/: {reference}')
    if relative.suffix.lower() not in ASSET_EXTENSIONS:
        raise ValueError(f'Unsupported public runtime asset: {reference}')
    return Path(*relative.parts)


def require_public_file(root: Path, relative: Path) -> Path:
    source = root / relative
    if not source.is_file() or not source.resolve().is_relative_to(root.resolve()):
        raise ValueError(f'Missing or out-of-tree public file: {relative}')
    current = root
    for part in relative.parts:
        current /= part
        if current.is_symlink():
            raise ValueError(f'Symbolic links are not permitted in public staging: {relative}')
    return source


def public_manifest(root: Path) -> set[Path]:
    files = {Path(name + '.html') for name in PAGE_SLUGS}
    files.update(Path(name) for name in PUBLIC_FILES)
    if (root / '_headers').exists():
        files.add(Path('_headers'))
    pending: set[Path] = set()
    for slug in PAGE_SLUGS:
        parser = RuntimeReferences()
        parser.feed(require_public_file(root, Path(slug + '.html')).read_text(encoding='utf-8'))
        pending.update(asset for reference in parser.references
                       if (asset := local_asset(reference)) is not None)
    while pending:
        asset = pending.pop()
        if asset in files:
            continue
        source = require_public_file(root, asset)
        files.add(asset)
        if asset.suffix.lower() == '.css':
            css = source.read_text(encoding='utf-8')
            references = re.findall(r'''url\(\s*["']?([^\)"']+)''', css)
            references += re.findall(r'''@import\s+["']([^"']+)["']''', css)
            pending.update(dependency for reference in references
                           if (dependency := local_asset(reference, PurePosixPath(asset.parent.as_posix()))) is not None)
    for relative in files:
        require_public_file(root, relative)
    return files


def stage_public(root: Path = ROOT, output: Path | None = None) -> set[Path]:
    root = root.resolve()
    output = output or root / '_site/public'
    staging_root = root / '_site'
    # Resolve and validate before removing an existing build, including on Windows.
    if (not staging_root.resolve().is_relative_to(root)
            or not output.resolve().is_relative_to(staging_root.resolve())
            or output.resolve() == staging_root.resolve()
            or output.is_symlink()):
        raise ValueError('Deployment output must be a directory strictly inside the workspace _site/.')
    manifest = public_manifest(root)
    if output.exists():
        if not output.is_dir():
            raise ValueError('Deployment output exists and is not a directory.')
        shutil.rmtree(output)
    output.mkdir(parents=True)
    for relative in sorted(manifest):
        destination = output / relative
        destination.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(root / relative, destination)
    print(f'Staged {len(manifest)} public files in {output}')
    return manifest


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', type=Path, help='Output directory inside this workspace _site/.')
    arguments = parser.parse_args()
    stage_public(output=arguments.output)
