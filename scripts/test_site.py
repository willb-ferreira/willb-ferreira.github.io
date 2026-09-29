"""Offline smoke tests for this static site using Chromium + Playwright."""
from pathlib import Path
import json
import os
import re
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
PAGES = ['index','research','reading','publications','supervision','people','teaching','software','about','contact']
css = (ROOT / 'assets/site.css').read_text()
content = (ROOT / 'assets/content.js').read_text()
library = (ROOT / 'assets/research-library.js').read_text(encoding='utf-8')
spatial = (ROOT / 'assets/spatial-guide.js').read_text(encoding='utf-8')
auto = (ROOT / 'assets/auto-content.js').read_text()
app = (ROOT / 'assets/app.js').read_text()
spatial_payload = spatial.split('  D.spatialGuide=', 1)[1].split(';\n  const i=', 1)[0]
spatial_data = json.loads(spatial_payload)
spatial_refs = spatial_data['references']
spatial_ids = {r['id'] for r in spatial_refs}
assert len(spatial_refs) == 31 and len(spatial_ids) == 31
assert {s['id'] for s in spatial_data['sections']} == {
    'foundations', 'track-a', 'track-b', 'bridges', 'learning-paths', 'reading-library'
}
assert [len(next(s for s in spatial_data['sections'] if s['id'] == key)['modules'])
        for key in ('foundations', 'track-a', 'track-b')] == [4, 5, 5]
for r in spatial_refs:
    assert all(r.get(field) for field in ('authors', 'title', 'year', 'venue',
                                          'identifier', 'url', 'verification', 'stage')), r['id']
    assert r['url'].startswith('https://'), r['id']
for section in spatial_data['sections']:
    for module in section['modules']:
        assert set(module['refs']).issubset(spatial_ids), module['title']
def check_bilingual(value):
    if isinstance(value, dict):
        if 'en' in value or 'pt' in value:
            assert set(('en', 'pt')).issubset(value), value
            assert value['en'].strip() and value['pt'].strip(), value
        for item in value.values():
            check_bilingual(item)
    elif isinstance(value, list):
        for item in value:
            check_bilingual(item)
check_bilingual(spatial_data)
print('SCIENTIFIC EDITORIAL SCHEMA Topic 1, 31 unique refs, link and EN/PT parity: PASS')
errors=[]

def load(tab, page_name):
    html = (ROOT / f'{page_name}.html').read_text()
    # Browser navigation is restricted in this environment, so use set_content.
    html = re.sub(r'<script[^>]*src="[^"]+"[^>]*></script>', '', html)
    html = re.sub(r'<link rel="stylesheet"[^>]*>', '', html)
    tab.set_content(html, wait_until='load')
    tab.add_style_tag(content=css)
    tab.add_script_tag(content=content)
    tab.add_script_tag(content=library)
    tab.add_script_tag(content=spatial)
    tab.add_script_tag(content=auto)
    tab.add_script_tag(content=app)
    tab.locator('h1').first.wait_for(timeout=5000)

with sync_playwright() as p:
    browser=p.chromium.launch(executable_path=os.environ.get('CHROMIUM_BIN') or None,headless=True,args=['--no-sandbox'])
    for page_name in PAGES:
        tab=browser.new_page(viewport={'width':1365,'height':860}, device_scale_factor=1)
        tab.on('pageerror', lambda err: errors.append(str(err)))
        load(tab,page_name)
        heading=tab.locator('h1').first.inner_text().replace('\n',' ')
        link_count=tab.locator('.nav a').count()
        assert link_count==8, (page_name,link_count)
        assert tab.locator('main').inner_text().strip(),page_name
        assert tab.locator('html').get_attribute('lang')=='en', page_name
        if page_name in ('index','about'):
            assert tab.locator('img.portrait-image').count()==1, page_name
        overflow=tab.evaluate('document.documentElement.scrollWidth > innerWidth')
        print(f'PAGE {page_name}: H1={heading[:67]} | nav={link_count} | overflow={overflow}')
        if page_name=='index':
            tab.screenshot(path=str(ROOT.parent/'willams-site-desktop.png'),full_page=True)
            assert tab.locator('html').get_attribute('lang')=='en'
            tab.locator('#language-toggle').click()
            assert tab.locator('html').get_attribute('lang')=='pt-BR'
            assert tab.locator('h1').inner_text().startswith('Willams Batista')
            tab.locator('#theme-toggle').click()
            assert tab.locator('html').get_attribute('data-theme') == 'dark'
            print('INTERACTION language switch and dark mode: PASS')
        if page_name=='reading':
            assert tab.locator('#learning').count()==0
            assert tab.locator('#causal').count()==1
            assert 'stochastic processes' in tab.locator('#spatial-models').inner_text().lower()
            assert tab.locator('#time-series h2').inner_text() == 'Time series'
            assert tab.locator('.reading-extra').count()>=23
            assert tab.locator('article.reading-area').count()==7
            assert tab.locator('li.reading-reference').count()==81
            assert tab.locator('a[href*="doi.org"]').count()>=30
            assert tab.locator('#spatial-track-a .spatial-module').count()==5
            assert tab.locator('#spatial-track-b .spatial-module').count()==5
            assert tab.locator('#spatial-foundations .spatial-module').count()==4
            assert tab.locator('li.spatial-reference').count()==31
            assert tab.locator('details.spatial-catalogue').count()==3
            assert tab.locator('#spatial-learning-paths .spatial-level').count()==3
            tab.locator('details.spatial-catalogue').first.locator('summary').click()
            assert tab.locator('details.spatial-catalogue').first.get_attribute('open') is not None
            tab.locator('#language-toggle').click()
            assert tab.locator('html').get_attribute('lang')=='pt-BR'
            assert 'Por onde começar em cada área' in tab.locator('h1').inner_text()
            assert tab.locator('li.reading-reference').count()==81
            assert 'Vertente A' in tab.locator('#spatial-track-a h3').inner_text()
            tab.locator('details.spatial-catalogue').first.locator('summary').click()
            assert 'Catálogo da editora' in tab.locator('details.spatial-catalogue').first.inner_text()
            print('CONTENT seven bilingual research reading guides and 81 curated references: PASS')
        if page_name=='research':
            assert tab.locator('article.research-card').count()==7
            assert tab.locator('#project-results article').count()==4
            tab.locator('button[data-area="sar"]').click()
            assert tab.locator('#project-results article').count()==2
            print('INTERACTION research filter: PASS')
        if page_name=='supervision':
            assert tab.locator('#topic-results article').count()==6
            tab.locator('button[data-level="undergraduate"]').click()
            assert tab.locator('#topic-results article').count()==6
            print('INTERACTION supervision filter: PASS')
        if page_name=='people':
            assert tab.locator('.person-entry').count()==2
            assert 'Pedro Estevão Costa Viana de Araújo' in tab.locator('main').inner_text()
            assert 'Muhammed Ismail' in tab.locator('main').inner_text()
            assert 'Co-supervision' in tab.locator('main').inner_text()
            print('CONTENT students and supervision roles: PASS')
        if page_name=='teaching':
            assert tab.locator('.course-entry').count()==4
            assert 'Probability II for Actuarial Science' in tab.locator('main').inner_text()
            print('CONTENT actuarial probability course: PASS')
        if page_name=='publications':
            assert tab.locator('#export-bibtex').is_enabled()
            assert tab.locator('#pub-results article').count()==4
            tab.locator('button[data-type="article"]').click()
            assert tab.locator('#pub-results article').count()==3
            print('INTERACTION three journal papers, one conference record, BibTeX: PASS')
        tab.close()
    phone=browser.new_page(viewport={'width':390,'height':844},device_scale_factor=1,is_mobile=True,has_touch=True)
    load(phone,'index')
    assert phone.locator('#menu-toggle').is_visible()
    phone.locator('#menu-toggle').click()
    assert phone.locator('#main-nav').is_visible()
    assert not phone.evaluate('document.documentElement.scrollWidth > innerWidth')
    phone.locator('#menu-toggle').click()
    phone.screenshot(path=str(ROOT.parent/'willams-site-mobile.png'),full_page=True)
    print('INTERACTION responsive mobile navigation and overflow: PASS')
    phone.close()
    mobile_reading=browser.new_page(viewport={'width':390,'height':844},device_scale_factor=1,is_mobile=True,has_touch=True)
    load(mobile_reading,'reading')
    assert mobile_reading.locator('#spatial-track-a').count()==1
    assert mobile_reading.locator('#spatial-track-b').count()==1
    assert not mobile_reading.evaluate('document.documentElement.scrollWidth > innerWidth')
    mobile_reading.locator('#language-toggle').click()
    assert mobile_reading.locator('html').get_attribute('lang')=='pt-BR'
    assert 'Vertente A' in mobile_reading.locator('#spatial-track-a h3').inner_text()
    assert not mobile_reading.evaluate('document.documentElement.scrollWidth > innerWidth')
    mobile_reading.close()
    print('INTERACTION Topic 1 mobile EN/PT navigation and overflow: PASS')
    mock=browser.new_page(viewport={'width':1365,'height':860})
    mock.on('pageerror',lambda err: errors.append(str(err)))
    html=(ROOT/'publications.html').read_text()
    html=re.sub(r'<script[^>]*src="[^"]+"[^>]*></script>','',html)
    html=re.sub(r'<link rel="stylesheet"[^>]*>','',html)
    mock.set_content(html)
    mock.add_style_tag(content=css)
    mock.add_script_tag(content=content)
    mock.add_script_tag(content=auto)
    mock.add_script_tag(content="""window.PORTFOLIO.publications = [
      {id:'demo1',title:'Spatial models in R',authors:'A. Example',year:2026,venue:'Test Journal',type:'article',doi:'10.0000/example',tags:['Spatial']},
      {id:'demo2',title:'Remote sensing index',authors:'B. Example',year:2025,venue:'Preprint',type:'preprint',tags:['SAR']}
    ];""")
    mock.add_script_tag(content=app)
    assert mock.locator('#pub-results article').count()==2
    mock.locator('button[data-type="article"]').click()
    assert mock.locator('#pub-results article').count()==1
    mock.locator('button[data-type="all"]').click()
    mock.locator('#publication-search').fill('remote')
    assert mock.locator('#pub-results article').count()==1
    mock.locator('#publication-search').fill('')
    mock.locator('#publication-year').select_option('2026')
    assert mock.locator('#pub-results article').count()==1
    assert mock.locator('#export-bibtex').is_enabled()
    print('INTERACTION populated publication search, type/year filters and BibTeX availability: PASS')
    mock.close()
    print('BROWSER_ERRORS:',errors)
    assert not errors,errors
    browser.close()
print('ALL CHECKS PASSED')
