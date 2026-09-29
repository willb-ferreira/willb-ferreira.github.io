"""Offline smoke tests for this static site using Chromium + Playwright."""
from pathlib import Path
import os
import re
from xml.etree import ElementTree as ET
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
PAGES = ['index','research','reading','publications','supervision','people','teaching','software','about','contact']
css = (ROOT / 'assets/site.css').read_text()
content = (ROOT / 'assets/content.js').read_text()
library = (ROOT / 'assets/research-library.js').read_text(encoding='utf-8')
intro = (ROOT / 'assets/intro-library.js').read_text(encoding='utf-8')
inference = (ROOT / 'assets/inference-library.js').read_text(encoding='utf-8')
image_library = (ROOT / 'assets/image-library.js').read_text(encoding='utf-8')
geometry_library = (ROOT / 'assets/geometry-library.js').read_text(encoding='utf-8')
regression_library = (ROOT / 'assets/regression-library.js').read_text(encoding='utf-8')
causal_library = (ROOT / 'assets/causal-library.js').read_text(encoding='utf-8')
auto = (ROOT / 'assets/auto-content.js').read_text()
app = (ROOT / 'assets/app.js').read_text()
errors=[]
SITEMAP_URLS = [loc.text for loc in ET.parse(ROOT / 'sitemap.xml').findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]
EXPECTED_URLS = ['https://willb-ferreira.github.io/' if name == 'index' else 'https://willb-ferreira.github.io/' + name + '.html' for name in PAGES]
assert len(SITEMAP_URLS) == len(EXPECTED_URLS) and set(SITEMAP_URLS) == set(EXPECTED_URLS), ('Sitemap must list each canonical URL exactly once', SITEMAP_URLS)
print('SITEMAP all ten canonical URLs: PASS')

def load(tab, page_name):
    html = (ROOT / f'{page_name}.html').read_text()
    # Browser navigation is restricted in this environment, so use set_content.
    html = re.sub(r'<script[^>]*src="[^"]+"[^>]*></script>', '', html)
    html = re.sub(r'<link rel="stylesheet"[^>]*>', '', html)
    tab.set_content(html, wait_until='load')
    tab.add_style_tag(content=css)
    tab.add_script_tag(content=content)
    tab.add_script_tag(content=library)
    tab.add_script_tag(content=intro)
    tab.add_script_tag(content=inference)
    tab.add_script_tag(content=image_library)
    tab.add_script_tag(content=geometry_library)
    tab.add_script_tag(content=regression_library)
    tab.add_script_tag(content=causal_library)
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
        assert tab.locator('.nav a[href="software.html"]').inner_text() == 'Code & Data', page_name
        assert tab.locator('.footer-col a[href="software.html"]').inner_text() == 'Code & Data', page_name
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
            assert tab.locator('article.reading-area').count()==6
            assert tab.locator('.reading-index a').count()==6
            assert tab.locator('#spatial-models h2').inner_text() == 'Time Series and Spatial Statistics'
            assert tab.locator('#spatial-models .reading-track').count()==3
            assert tab.locator('#intro-track-temporal').count()==1
            assert tab.locator('#spatial-track-a').count()==1
            assert tab.locator('#spatial-track-b').count()==1
            assert tab.locator('#time-series').count()==1  # Legacy link still works.
            assert tab.locator('#spatial-models .reading-reference-compact').count()==6
            assert tab.locator('#theory .reading-track').count()==3
            assert tab.locator('#inference-track-classical').count()==1
            assert tab.locator('#inference-track-bayesian').count()==1
            assert tab.locator('#inference-track-information').count()==1
            assert tab.locator('#theory .reading-reference').count()==7
            assert tab.locator('#regression h2').inner_text() == 'Regression Models and Estimating Equations'
            assert tab.locator('#regression .reading-track').count()==3
            assert tab.locator('#regression-track-gee').count()==1
            assert tab.locator('#regression-track-hierarchical').count()==1
            assert tab.locator('#regression-track-distributional').count()==1
            assert tab.locator('#regression .reading-reference').count()==8
            assert tab.locator('#causal h2').inner_text() == 'Causal inference'
            assert tab.locator('#causal .reading-track').count()==3
            assert tab.locator('#causal-track-identification').count()==1
            assert tab.locator('#causal-track-estimation').count()==1
            assert tab.locator('#causal-track-dependent').count()==1
            assert tab.locator('#causal .reading-reference').count()==9
            assert tab.locator('#causal .reading-related a').count()==4
            assert tab.locator('#causal .reading-related a[href="#spatial-models"]').count()==1
            assert tab.locator('#causal .reading-related a[href="#theory"]').count()==1
            assert tab.locator('#causal .reading-related a[href="#regression"]').count()==1
            assert tab.locator('#causal .reading-related a[href="#sar"]').count()==1
            assert tab.locator('#causal-ref-bang-robins-2005').count()==1
            assert tab.locator('#causal-ref-reich-2021').count()==1
            assert tab.locator('#causal-ref-callaway-santanna-2021').count()==1
            assert tab.locator('#causal-ref-hernan-robins-2020 a[href="https://miguelhernan.org/whatifbook"]').count()==1
            assert tab.evaluate("window.PORTFOLIO.readingGuides.find(g=>g.id==='causal').tracks.every(t=>t.refs.every(id=>window.PORTFOLIO.readingGuides.find(g=>g.id==='causal').visibleReferences.includes(id)))")
            assert tab.evaluate("window.PORTFOLIO.readingGuides.find(g=>g.id==='causal').references.length") == 12
            assert tab.evaluate("window.PORTFOLIO.readingGuides.find(g=>g.id==='causal').references.some(r=>r.id==='athey-imbens-2016')")
            tab.locator('#causal-track-dependent a[href="#causal-ref-reich-2021"]').click()
            assert tab.evaluate('location.hash') == '#causal-ref-reich-2021'
            assert tab.locator('#regression .reading-related a').count()==4
            assert tab.locator('#regression .reading-related a[href="#spatial-models"]').count()==1
            assert tab.locator('#regression .reading-related a[href="#theory"]').count()==1
            assert tab.locator('#regression .reading-related a[href="#sar"]').count()==1
            assert tab.locator('#regression .reading-related a[href="#causal"]').count()==1
            assert tab.locator('#regression-ref-hardin-hilbe-2013').count()==1
            assert tab.locator('#regression-ref-moraga-2019').count()==1
            assert tab.locator('#regression-ref-rigby-stasinopoulos-2005').count()==1
            assert tab.evaluate("window.PORTFOLIO.readingGuides.find(g=>g.id==='regression').tracks.every(t=>t.refs.every(id=>window.PORTFOLIO.readingGuides.find(g=>g.id==='regression').visibleReferences.includes(id)))")
            assert tab.evaluate("window.PORTFOLIO.readingGuides.find(g=>g.id==='regression').references.some(r=>r.id==='gelman-hill-vehtari-2020')")
            assert tab.locator('#regression-track-gee a[href="#regression-ref-liang-zeger-1986"]').count()==1
            assert tab.locator('#regression-track-hierarchical a[href="#regression-ref-moraga-2019"]').count()==1
            assert tab.locator('#sar h2').inner_text() == 'Statistical Image Processing'
            assert tab.locator('#sar .reading-track').count()==3
            assert tab.locator('#imaging-track-radar').count()==1
            assert tab.locator('#imaging-track-optical').count()==1
            assert tab.locator('#imaging-track-medical').count()==1
            assert tab.locator('#sar .reading-reference').count()==7
            assert tab.locator('#sar .reading-track-status').count()==3
            assert tab.locator('#sar .reading-related a').count()==4
            assert tab.locator('#sar .reading-related a[href="#spatial-models"]').count()==1
            assert tab.locator('#sar .reading-related a[href="#theory"]').count()==1
            assert tab.locator('#sar .reading-related a[href="#regression"]').count()==1
            assert tab.locator('#sar .reading-related a[href="#geometry"]').count()==1
            assert tab.locator('#imaging-ref-richards-2022').count()==1
            assert tab.locator('#imaging-ref-pham-2000').count()==1
            assert tab.evaluate("window.PORTFOLIO.readingGuides.find(g=>g.id==='sar').visibleReferences.every(id=>window.PORTFOLIO.readingGuides.find(g=>g.id==='sar').references.some(r=>r.id===id))")
            assert tab.evaluate("window.PORTFOLIO.readingGuides.find(g=>g.id==='sar').tracks.every(k=>k.refs.every(id=>window.PORTFOLIO.readingGuides.find(g=>g.id==='sar').references.some(r=>r.id===id)))")
            assert tab.locator('#geometry .reading-reference').count()==8
            assert tab.locator('#geometry .reading-track').count()==3
            assert tab.locator('#geometry-track-foundations').count()==1
            assert tab.locator('#geometry-track-inference').count()==1
            assert tab.locator('#geometry-track-computation').count()==1
            assert tab.locator('#geometry .reading-related a').count()==3
            assert tab.locator('#geometry .reading-related a[href="#theory"]').count()==1
            assert tab.locator('#geometry .reading-related a[href="#sar"]').count()==1
            assert tab.locator('#theory a[href="#geometry"]').count()==1
            assert tab.locator('#geometry a[href="#theory"]').count()==1
            assert tab.locator('#inference-ref-pardo-2006').count()==1
            assert tab.locator('#geometry a[href*="0167-9473"]').count()==1
            assert tab.locator('#geometry a[href*="0893-9659"]').count()==1
            assert tab.locator('#geometry a[href*="1022214326758"]').count()==1
            assert tab.locator('#geometry a[href="#spatial-models"]').count()==1
            assert tab.locator('#geometry .reading-reference').nth(3).locator('h4').inner_text().strip().startswith('Statistical tests based on geodesic distances')
            assert tab.evaluate("window.PORTFOLIO.readingGuides.find(g=>g.id==='geometry').visibleReferences.length") == 8
            assert tab.evaluate("window.PORTFOLIO.readingGuides.find(g=>g.id==='geometry').tracks.every(t=>t.refs.every(id=>window.PORTFOLIO.readingGuides.find(g=>g.id==='geometry').visibleReferences.includes(id)))")
            assert tab.locator('#geometry-ref-amari-natural-gradient-1998').count()==1
            assert tab.locator('#geometry-ref-nielsen-fisher-rao-2023').count()==1
            assert tab.locator('#geometry-ref-gomez-wishart-2015').count()==1
            assert tab.locator('#geometry a[href*="089976698300017746"]').count()==1
            assert tab.locator('#geometry a[href*="e25040654"]').count()==1
            assert tab.locator('#geometry a[href*="rsta.2015.0118"]').count()==1
            assert tab.evaluate("window.PORTFOLIO.readingGuides.find(g=>g.id==='geometry').references.filter(r=>r.id==='menendez-morales-pardo-salicru-1995').length") == 1
            assert tab.evaluate("window.PORTFOLIO.readingGuides.find(g=>g.id==='theory').tracks.every(k=>k.refs.every(id=>window.PORTFOLIO.readingGuides.find(g=>g.id==='theory').references.some(r=>r.id===id)))")
            assert tab.evaluate("window.PORTFOLIO.readingGuides.find(g=>g.id==='geometry').visibleReferences.every(id=>window.PORTFOLIO.readingGuides.find(g=>g.id==='geometry').references.some(r=>r.id===id))")

            assert tab.locator('li.reading-reference').count()==45
            assert tab.locator('#learning').count()==0
            assert tab.locator('#causal').count()==1
            assert tab.locator('.reading-extra').count()==0
            assert tab.locator('.spatial-chapter').count()==0
            assert tab.locator('a[href*="doi.org"]').count()>=15
            ids=tab.evaluate('window.PORTFOLIO.readingGuides.map(g => g.id)')
            assert len(ids)==6 and len(set(ids))==6 and 'time-series' not in ids,ids
            assert len(tab.locator('#spatial-models').inner_text()) < 4700
            assert len(tab.locator('main').inner_text()) < 34500
            tab.locator('#inference-track-information a[href="#inference-ref-pardo-2006"]').click()
            assert tab.evaluate('location.hash') == '#inference-ref-pardo-2006'
            tab.locator('a[href="#intro-ref-tjostheim"]').first.click()
            assert tab.evaluate('location.hash') == '#intro-ref-tjostheim'
            tab.locator('#language-toggle').click()
            assert tab.locator('html').get_attribute('lang')=='pt-BR'
            assert 'Por onde começar em cada área' in tab.locator('h1').inner_text()
            assert tab.locator('#spatial-models h2').inner_text() == 'Séries temporais e estatística espacial'
            assert 'Séries temporais' in tab.locator('#intro-track-temporal').inner_text()
            assert 'A ponte ARMA' in tab.locator('#spatial-track-a').inner_text()
            assert tab.locator('li.reading-reference').count()==45
            assert tab.locator('#sar h2').inner_text() == 'Processamento Estatístico de Imagens'
            assert 'Imagens de radar' in tab.locator('#imaging-track-radar').inner_text()
            assert 'Sensoriamento remoto óptico' in tab.locator('#imaging-track-optical').inner_text()
            assert 'imagens médicas' in tab.locator('#imaging-track-medical').inner_text().lower()
            assert 'Interesse de pesquisa emergente' in tab.locator('#imaging-track-medical').inner_text()
            assert 'Geometria da Informação' in tab.locator('#sar .reading-related').inner_text()
            assert 'Inferência estatística clássica' in tab.locator('#inference-track-classical').inner_text()
            assert 'Inferência estatística bayesiana' in tab.locator('#inference-track-bayesian').inner_text()
            assert 'Inferência por divergências' in tab.locator('#inference-track-information').inner_text() or 'inferência por divergências' in tab.locator('#inference-track-information').inner_text()
            assert 'testes de hipóteses' in tab.locator('#geometry').inner_text().lower()
            assert 'testes por distâncias geodésicas' in tab.locator('#geometry').inner_text().lower()
            assert 'Séries Temporais e Estatística Espacial' in tab.locator('#geometry .reading-related').inner_text()
            assert 'Processamento Estatístico de Imagens' in tab.locator('#geometry .reading-related').inner_text()
            assert tab.locator('#causal h2').inner_text() == 'Inferência causal'
            assert 'Identificação causal e delineamento de estudos' in tab.locator('#causal-track-identification').inner_text()
            assert 'Estimação semiparamétrica e aprendizado de máquina causal' in tab.locator('#causal-track-estimation').inner_text()
            assert 'Inferência causal espacial e longitudinal' in tab.locator('#causal-track-dependent').inner_text()
            assert 'Processamento Estatístico de Imagens' in tab.locator('#causal .reading-related').inner_text()
            assert 'Inferência Estatística' in tab.locator('#causal .reading-related').inner_text()
            assert len(tab.locator('#causal').inner_text()) < 8500
            assert tab.locator('#regression h2').inner_text() == 'Modelos de Regressão e Equações de Estimação'
            assert 'Modelos lineares generalizados e GEE' in tab.locator('#regression-track-gee').inner_text()
            assert 'Regressão com efeitos mistos e modelos hierárquicos' in tab.locator('#regression-track-hierarchical').inner_text()
            assert 'Regressão flexível e distribucional' in tab.locator('#regression-track-distributional').inner_text()
            assert 'Inferência Causal' in tab.locator('#regression .reading-related').inner_text()
            assert 'Moraga' in tab.locator('#regression-track-hierarchical').inner_text()
            assert len(tab.locator('#regression').inner_text()) < 8500
            assert 'Variedades estatísticas e geometria dual' in tab.locator('#geometry-track-foundations').inner_text()
            assert 'Estimação geométrica e testes de hipóteses' in tab.locator('#geometry-track-inference').inner_text()
            assert 'Computação geométrica e modelos estatísticos estruturados' in tab.locator('#geometry-track-computation').inner_text()
            assert 'distâncias estocásticas' in tab.locator('#geometry-track-computation').inner_text()
            assert len(tab.locator('#geometry').inner_text()) < 6800
            print('CONTENT six concise bilingual guides, eighteen research tracks and 45 selected references: PASS')
        if page_name=='research':
            assert tab.locator('article.research-card').count()==6
            assert tab.locator('article.research-card').nth(5).locator('h3').inner_text() == 'Causal inference'
            assert 'spatial or longitudinal causal inference' in tab.locator('article.research-card').nth(5).inner_text()
            assert 'Developing research interest' in tab.locator('article.research-card').nth(5).inner_text()
            assert tab.locator('article.research-card').nth(2).locator('h3').inner_text() == 'Statistical Image Processing'
            assert 'medical' in tab.locator('article.research-card').nth(2).inner_text().lower()
            assert tab.locator('article.research-card').nth(3).locator('h3').inner_text() == 'Regression Models and Estimating Equations'
            assert 'GEE' in tab.locator('article.research-card').nth(3).inner_text()
            assert 'divergence-based estimation and hypothesis testing' in tab.locator('article.research-card').nth(1).inner_text()
            assert 'geodesic estimation and hypothesis testing' in tab.locator('article.research-card').nth(4).inner_text()
            assert tab.locator('article.research-card').first.locator('h3').inner_text() == 'Time Series and Spatial Statistics'
            assert 'Statistical modeling and inference for dependent data' in tab.locator('article.research-card').first.inner_text()
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
        if page_name=='software':
            assert tab.locator('h1').inner_text() == 'Code & Data'
            assert tab.title() == 'Code & Data | Willams Batista'
            print('CONTENT Code & Data title, navigation and document metadata: PASS')
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
    assert mobile_reading.locator('.reading-track').count()==18
    assert mobile_reading.locator('#causal-track-identification').count()==1
    assert mobile_reading.locator('#causal-track-estimation').count()==1
    assert mobile_reading.locator('#causal-track-dependent').count()==1
    assert mobile_reading.locator('#regression-track-gee').count()==1
    assert mobile_reading.locator('#regression-track-hierarchical').count()==1
    assert mobile_reading.locator('#regression-track-distributional').count()==1
    assert mobile_reading.locator('#geometry-track-inference').count()==1
    assert mobile_reading.locator('#geometry-track-computation').count()==1
    assert mobile_reading.locator('#imaging-track-radar').count()==1
    assert mobile_reading.locator('#imaging-track-optical').count()==1
    assert mobile_reading.locator('#imaging-track-medical').count()==1
    assert mobile_reading.locator('#inference-track-information').count()==1
    assert not mobile_reading.evaluate('document.documentElement.scrollWidth > innerWidth')
    mobile_reading.locator('#language-toggle').click()
    assert mobile_reading.locator('html').get_attribute('lang')=='pt-BR'
    assert 'A ponte ARMA' in mobile_reading.locator('#spatial-track-a').inner_text()
    assert 'Inferência estatística bayesiana' in mobile_reading.locator('#inference-track-bayesian').inner_text()
    assert 'Processamento Estatístico de Imagens' in mobile_reading.locator('#sar h2').inner_text()
    assert 'Modelos de Regressão e Equações de Estimação' in mobile_reading.locator('#regression h2').inner_text()
    assert mobile_reading.locator('#regression .reading-related a').count()==4
    assert mobile_reading.locator('#causal .reading-related a').count()==4
    assert 'Inferência causal espacial e longitudinal' in mobile_reading.locator('#causal-track-dependent').inner_text()
    assert mobile_reading.locator('#sar .reading-related a').count()==4
    assert mobile_reading.locator('#geometry a[href*="0893-9659"]').count()==1
    assert mobile_reading.locator('#geometry a[href="#spatial-models"]').count()==1
    assert mobile_reading.locator('#geometry .reading-related a').count()==3
    assert 'Testes' in mobile_reading.locator('#geometry-track-inference').inner_text() or 'testes' in mobile_reading.locator('#geometry-track-inference').inner_text()
    assert not mobile_reading.evaluate('document.documentElement.scrollWidth > innerWidth')
    mobile_reading.screenshot(path=str(ROOT.parent/'willams-reading-mobile.png'),full_page=True)
    mobile_reading.close()
    narrow=browser.new_page(viewport={'width':320,'height':700},device_scale_factor=1,is_mobile=True,has_touch=True)
    load(narrow,'reading')
    assert not narrow.evaluate('document.documentElement.scrollWidth > innerWidth')
    narrow.close()
    print('INTERACTION concise library mobile 390/320px, EN/PT and overflow: PASS')
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
