"""Offline smoke tests for this static site using Chromium + Playwright."""
from pathlib import Path
import re
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
PAGES = ['index','research','publications','supervision','people','teaching','software','about','contact']
css = (ROOT / 'assets/site.css').read_text()
content = (ROOT / 'assets/content.js').read_text()
auto = (ROOT / 'assets/auto-content.js').read_text()
app = (ROOT / 'assets/app.js').read_text()
errors=[]

def load(tab, page_name):
    html = (ROOT / f'{page_name}.html').read_text()
    # Browser navigation is restricted in this environment, so use set_content.
    html = re.sub(r'<script[^>]*src="[^"]+"[^>]*></script>', '', html)
    html = re.sub(r'<link rel="stylesheet"[^>]*>', '', html)
    tab.set_content(html, wait_until='load')
    tab.add_style_tag(content=css)
    tab.add_script_tag(content=content)
    tab.add_script_tag(content=auto)
    tab.add_script_tag(content=app)
    tab.locator('h1').first.wait_for(timeout=5000)

with sync_playwright() as p:
    browser=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
    for page_name in PAGES:
        tab=browser.new_page(viewport={'width':1365,'height':860}, device_scale_factor=1)
        tab.on('pageerror', lambda err: errors.append(str(err)))
        load(tab,page_name)
        heading=tab.locator('h1').first.inner_text().replace('\n',' ')
        link_count=tab.locator('.nav a').count()
        assert link_count==8, (page_name,link_count)
        assert tab.locator('main').inner_text().strip(),page_name
        if page_name in ('index','about'):
            assert tab.locator('img.portrait-image').count()==1, page_name
        overflow=tab.evaluate('document.documentElement.scrollWidth > innerWidth')
        print(f'PAGE {page_name}: H1={heading[:67]} | nav={link_count} | overflow={overflow}')
        if page_name=='index':
            tab.screenshot(path=str(ROOT.parent/'willams-site-desktop.png'),full_page=True)
            tab.locator('#language-toggle').click()
            assert tab.locator('h1').inner_text().startswith('Willams Batista')
            tab.locator('#theme-toggle').click()
            assert tab.locator('html').get_attribute('data-theme') == 'dark'
            print('INTERACTION language switch and dark mode: PASS')
        if page_name=='research':
            assert tab.locator('article.research-card').count()==7
            assert tab.locator('#project-results article').count()==4
            tab.locator('button[data-area="sar"]').click()
            assert tab.locator('#project-results article').count()==2
            print('INTERACTION research filter: PASS')
        if page_name=='supervision':
            assert tab.locator('#topic-results article').count()==4
            tab.locator('button[data-level="undergraduate"]').click()
            assert tab.locator('#topic-results article').count()==2
            print('INTERACTION supervision filter: PASS')
        if page_name=='people':
            assert tab.locator('.person-entry').count()==2
            assert 'Pedro Estevão Costa Viana de Araújo' in tab.locator('main').inner_text()
            assert 'Muhammed Ismail' in tab.locator('main').inner_text()
            assert 'Coorientação' in tab.locator('main').inner_text()
            print('CONTENT students and supervision roles: PASS')
        if page_name=='teaching':
            assert tab.locator('.course-entry').count()==4
            assert 'Probabilidade 2 para Ciências Atuariais' in tab.locator('main').inner_text()
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
