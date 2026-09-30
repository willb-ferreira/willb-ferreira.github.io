"""Offline tests for approved-data sync; no account credentials or internet required."""
import importlib.util
import json
import os
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

MODULE = Path(__file__).with_name('sync_academic.py')
spec = importlib.util.spec_from_file_location('academic_sync', MODULE)
sync = importlib.util.module_from_spec(spec)
spec.loader.exec_module(sync)


def fake_http(url, *, token='', data=None, email=''):
    if url.startswith('https://api.crossref.org/works/'):
        return {'message': {
            'DOI': '10.1234/test-article',
            'title': ['<i>A verified title</i>'],
            'author': [{'given': 'A.', 'family': 'Researcher'}],
            'container-title': ['Statistics Journal'],
            'published': {'date-parts': [[2026, 9, 1]]},
            'type': 'journal-article'
        }}
    if url.startswith('https://api.openalex.org/works?'):
        return {'results': [{
            'id': 'https://openalex.org/WTEST',
            'doi': 'https://doi.org/10.1234/test-article',
            'cited_by_count': 7,
            'open_access': {'is_oa': True, 'oa_status': 'gold', 'oa_url': 'https://example.org/open'},
            'best_oa_location': {'landing_page_url': 'https://example.org/article', 'pdf_url': None}
        }]}
    if url.startswith('https://api.unpaywall.org/v2/10.1234/test-article?'):
        return {
            'doi': '10.1234/test-article', 'is_oa': True, 'oa_status': 'gold',
            'doi_url': 'https://doi.org/10.1234/test-article',
            'best_oa_location': {
                'url_for_landing_page': 'https://publisher.example/article',
                'url_for_pdf': None, 'version': 'publishedVersion', 'host_type': 'publisher'
            },
            'oa_locations': [
            ]
        }
    if url.startswith('https://api.semanticscholar.org/graph/v1/paper/DOI:10.1234/test-article?'):
        return {
            'externalIds': {'DOI':'10.1234/test-article'},
            'isOpenAccess': True,
            'openAccessPdf': {'url':'https://public.example/article.pdf'}
        }
    if url == 'https://api.github.com/repos/verified-user/mypackage':
        return {'private': False, 'archived': False, 'disabled': False,
                'full_name': 'verified-user/mypackage', 'name': 'mypackage',
                'description': 'Reproducible spatial inference', 'language': 'R',
                'html_url': 'https://github.com/verified-user/mypackage'}
    if url == 'https://orcid.org/oauth/token':
        return {'access_token': 'TEST-TOKEN'}
    if url.startswith('https://pub.orcid.org/v3.0/') and url.endswith('/works'):
        return {'group': [
            {'external-ids': {'external-id': [{'external-id-type': 'doi', 'external-id-value': '10.1234/test-article'}]}},
            {'external-ids': {'external-id': [{'external-id-type': 'doi', 'external-id-value': '10.5678/new-paper'}]}}
        ]}
    raise AssertionError('Unexpected network request: ' + url)


class SyncTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.root = Path(self.tmp.name)
        (self.root / 'data').mkdir()
        (self.root / 'assets').mkdir()
        (self.root / 'data/sources.json').write_text(json.dumps({
            'contact_email': 'academic@example.org', 'orcid': '0000-0002-1234-567X',
            'github_username': 'verified-user',
            'publications': [{'doi': '10.1234/test-article', 'featured': True, 'tags': ['Spatial'],
                              'venue_metrics': {'source':'SCImago','year':2025,'sjr':1.234,'quartile':'Q1',
                                                'category': {'en':'Statistics','pt':'Estatística'}}}],
            'github_repos': [{'repo': 'mypackage', 'tags': ['R']}]
        }))

    def test_allowlisted_data_and_orcid_queue(self):
        with patch.object(sync, 'ROOT', self.root), patch.object(sync, 'http_json', side_effect=fake_http), \
             patch.dict(os.environ, {'ORCID_CLIENT_ID':'test', 'ORCID_CLIENT_SECRET':'test'}, clear=False):
            self.assertEqual(sync.main(), 0)
            raw = (self.root / 'assets/auto-content.js').read_text()
            self.assertIn('A verified title', raw)
            self.assertNotIn('<i>', raw)
            self.assertIn('mypackage', raw)
            self.assertIn('"citations":7', raw)
            self.assertIn('"citation_source":"OpenAlex"', raw)
            self.assertIn('"open_access":true', raw)
            self.assertIn('"oa_pdf":"https://public.example/article.pdf"', raw)
            self.assertIn('"oa_pdf_source":"Semantic Scholar"', raw)
            self.assertIn('"oa_pdf_version":"publicVersion"', raw)
            self.assertIn('"venue_metrics":{"source":"SCImago"', raw)
            self.assertNotIn('10.5678/new-paper', raw)
            pending = json.loads((self.root / 'data/pending-dois.json').read_text())
            self.assertEqual([p['doi'] for p in pending], ['10.5678/new-paper'])
            self.assertTrue(pending[0]['requires_approval'])
            self.assertEqual(sync.main(), 0)
            self.assertEqual(len(json.loads((self.root/'data/sync-cache.json').read_text())['publications']), 1)

    def test_outage_does_not_delete_last_good_data(self):
        with patch.object(sync, 'ROOT', self.root), patch.object(sync, 'http_json', side_effect=fake_http), \
             patch.dict(os.environ, {'ORCID_CLIENT_ID':'', 'ORCID_CLIENT_SECRET':''}):
            self.assertEqual(sync.main(), 0)
            old = (self.root/'assets/auto-content.js').read_text()
        with patch.object(sync, 'ROOT', self.root), patch.object(sync, 'http_json', side_effect=OSError('offline')), \
             patch.dict(os.environ, {'ORCID_CLIENT_ID':'', 'ORCID_CLIENT_SECRET':''}):
            self.assertEqual(sync.main(), 1)
            self.assertEqual((self.root/'assets/auto-content.js').read_text(), old)

    def test_invalid_doi_is_rejected(self):
        with patch.object(sync, 'ROOT', self.root):
            config = json.loads((self.root/'data/sources.json').read_text())
            config['publications'][0]['doi'] = 'doi-without-prefix'
            (self.root/'data/sources.json').write_text(json.dumps(config))
            with self.assertRaisesRegex(ValueError, 'DOI inválido'):
                sync.main()

if __name__ == '__main__':
    unittest.main()
