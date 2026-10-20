"""Check that deployment includes runtime files and excludes repository material."""
from pathlib import Path
import tempfile
import unittest

from site_config import PAGE_SLUGS
from stage_public import PUBLIC_FILES, public_manifest, stage_public


class PublicStagingTests(unittest.TestCase):
    def setUp(self):
        temporary = tempfile.TemporaryDirectory()
        self.addCleanup(temporary.cleanup)
        self.root = Path(temporary.name)
        for name in (*PUBLIC_FILES, *(slug + '.html' for slug in PAGE_SLUGS)):
            (self.root / name).write_text('', encoding='utf-8')
        (self.root / 'assets').mkdir()
        (self.root / 'assets/app.js').write_text('/* runtime */', encoding='utf-8')
        (self.root / 'assets/site.css').write_text('body{background:url("portrait.webp")}', encoding='utf-8')
        (self.root / 'assets/portrait.webp').write_bytes(b'image fixture')
        (self.root / 'assets/favicon.svg').write_text('<svg/>', encoding='utf-8')
        (self.root / 'index.html').write_text(
            '<link rel="stylesheet" href="assets/site.css">'
            '<link rel="icon" href="assets/favicon.svg">'
            '<script src="assets/app.js"></script>', encoding='utf-8')

    def test_copies_only_public_files_and_clears_old_output(self):
        for name in ('docs/internal.md', 'scripts/helper.py', 'data/sync-cache.json',
                     'assets/spatial-guide.js', 'README.md', 'SECURITY.md'):
            source = self.root / name
            source.parent.mkdir(parents=True, exist_ok=True)
            source.write_text('not part of the deployed website', encoding='utf-8')
        output = self.root / '_site/public'
        output.mkdir(parents=True)
        (output / 'old-private-file.txt').write_text('stale', encoding='utf-8')
        manifest = stage_public(self.root, output)
        copied = {path.relative_to(output) for path in output.rglob('*') if path.is_file()}
        expected = {Path(name) for name in PUBLIC_FILES}
        expected.update(Path(slug + '.html') for slug in PAGE_SLUGS)
        expected.update(Path('assets') / name for name in ('app.js', 'site.css', 'portrait.webp', 'favicon.svg'))
        self.assertEqual(copied, expected)
        self.assertEqual(manifest, expected)

    def test_copies_optional_hosting_headers(self):
        (self.root / '_headers').write_text('/*\n  X-Content-Type-Options: nosniff\n', encoding='utf-8')
        self.assertIn(Path('_headers'), stage_public(self.root))

    def test_rejects_runtime_references_outside_assets(self):
        (self.root / 'index.html').write_text('<script src="assets/../scripts/helper.js"></script>', encoding='utf-8')
        with self.assertRaisesRegex(ValueError, 'inside assets'):
            public_manifest(self.root)

    def test_rejects_missing_runtime_files(self):
        (self.root / 'assets/app.js').unlink()
        with self.assertRaisesRegex(ValueError, 'Missing'):
            public_manifest(self.root)

    def test_rejects_output_outside_build_directory(self):
        protected = self.root / 'docs'
        protected.mkdir()
        sentinel = protected / 'keep.txt'
        sentinel.write_text('keep', encoding='utf-8')
        with self.assertRaisesRegex(ValueError, 'strictly inside'):
            stage_public(self.root, protected)
        self.assertEqual(sentinel.read_text(encoding='utf-8'), 'keep')


if __name__ == '__main__':
    unittest.main()
