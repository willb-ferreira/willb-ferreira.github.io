"""Focused, offline Playwright regression tests for people, teaching, topics and research notebook.
The main research library and approved publication sync are separately tested by existing workflows.
"""
from pathlib import Path
import os, re
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
CONTENT=(ROOT/'assets/content.js').read_text(encoding='utf-8')
AUTO=(ROOT/'assets/auto-content.js').read_text(encoding='utf-8')
APP=(ROOT/'assets/app.js').read_text(encoding='utf-8')
CSS=(ROOT/'assets/site.css').read_text(encoding='utf-8')
ERRORS=[]

def load(browser,kind,width=1365,extra=''):
    page=browser.new_page(viewport={'width':width,'height':880},device_scale_factor=1)
    page.on('pageerror',lambda exc:ERRORS.append((kind,str(exc))))
    html=(ROOT/f'{kind}.html').read_text(encoding='utf-8')
    html=re.sub(r'<script[^>]*src="[^"]+"[^>]*></script>','',html)
    html=re.sub(r'<link rel="stylesheet"[^>]*>','',html)
    page.set_content(html,wait_until='load')
    page.add_style_tag(content=CSS)
    page.add_script_tag(content=CONTENT)
    page.add_script_tag(content=AUTO)
    if extra:page.add_script_tag(content=extra)
    page.add_script_tag(content=APP)
    page.locator('main h1').wait_for(timeout=6000)
    assert not page.evaluate('document.documentElement.scrollWidth > window.innerWidth'),kind
    return page

with sync_playwright() as p:
    browser=p.chromium.launch(executable_path=os.environ.get('CHROMIUM_BIN') or None,headless=True,args=['--no-sandbox'])
    people=load(browser,'people')
    assert people.locator('.academic-level').count()==2
    assert people.locator('.people-subgroup').count()==2
    assert people.locator('.person-entry').count()==2
    assert 'Pedro E. C. V. de Araújo' in people.locator('main').inner_text()
    assert 'Muhammad Ismail' in people.locator('main').inner_text()
    assert 'Pedro Estevão Costa Viana de Araújo' not in people.locator('main').inner_text()
    assert people.locator('.person-entry').filter(has_text='Pedro E. C. V. de Araújo').locator('.directory-period').inner_text() == '2026.2'
    assert people.locator('.person-entry').filter(has_text='Muhammad Ismail').locator('.directory-period').inner_text() == '2026.1'
    people.locator('#language-toggle').click()
    assert 'Coorientação' in people.locator('main').inner_text()
    print('PEOPLE grouped by level/relationship, bilingual: PASS')
    people.close()

    # Future collaborators use the same rule; two-name records remain intact.
    collaborators_mock='''window.PORTFOLIO.collaborators.push(
      {id:"collab-test-1",name:"Ana Maria da Silva",role:{pt:"Colaboração em pesquisa",en:"Research collaborator"},affiliation:{pt:"UFPE",en:"UFPE"}},
      {id:"collab-test-2",name:"João da Silva"},
      {id:"collab-test-3",name:"Maria Clara Silva Neto"});'''
    collaborators=load(browser,'people',extra=collaborators_mock)
    assert collaborators.locator('.academic-level').count()==3
    assert collaborators.locator('.people-directory .person-entry').count()==5
    assert 'Collaborators' in collaborators.locator('main').inner_text()
    assert 'Ana M. da Silva' in collaborators.locator('main').inner_text()
    assert 'João da Silva' in collaborators.locator('main').inner_text()
    assert 'Maria C. Silva Neto' in collaborators.locator('main').inner_text()
    assert 'Ana Maria da Silva' not in collaborators.locator('main').inner_text()
    collaborators.locator('#language-toggle').click()
    assert 'Colaboradores' in collaborators.locator('main').inner_text()
    assert 'Ana M. da Silva' in collaborators.locator('main').inner_text()
    print('PEOPLE future collaborators abbreviated; two-name and compound surnames preserved: PASS')
    collaborators.close()
    topics=load(browser,'supervision')
    assert topics.locator('#topic-results article').count()==6
    topics.locator('[data-level="masters"]').click()
    assert topics.locator('#topic-results article').count()==5
    topics.locator('[data-level="phd"]').click()
    assert topics.locator('#topic-results article').count()==3
    topics.locator('[data-level="all"]').click()
    assert topics.locator('#topic-results article').count()==14
    assert '14 proposals' in topics.locator('#topic-count').inner_text()
    topics.locator('#language-toggle').click()
    assert 'propostas' in topics.locator('#topic-count').inner_text()
    print('SUPERVISION 6 undergraduate + 5 masters + 3 PhD, filters & bilingual: PASS')
    topics.close()

    research=load(browser,'research')
    assert research.locator('#research-notebook').count()==1
    assert research.locator('details.idea-group').count()==3
    assert research.locator('.research-idea').count()==3
    assert not research.locator('details.idea-group').first.evaluate('(el)=>el.open')
    research.locator('details.idea-group').first.locator('summary').click()
    assert research.locator('details.idea-group').first.evaluate('(el)=>el.open')
    research.locator('#language-toggle').click()
    assert 'CONVERSAS DE PESQUISA' in research.locator('main').inner_text().upper()
    assert 'TRABALHOS EM CONJUNTO' in research.locator('main').inner_text().upper()
    print('RESEARCH three broad conversation/collaboration themes, collapsed and bilingual: PASS')
    research.close()

    courses=load(browser,'teaching')
    assert courses.locator('.course-entry').count()==4
    assert courses.locator('.course-entry h3').all_inner_texts().count('Probability II for Actuarial Science')==1
    assert courses.locator('#course-year option').count()==2
    actual_offerings = {row.locator('h3').inner_text(): row.locator('.course-meta').inner_text().strip() for row in courses.locator('.course-entry').all()}
    assert actual_offerings['Probability II'].endswith('2026.1'), actual_offerings
    assert actual_offerings['Statistical Inference for Actuarial Sciences'].endswith('2026.1'), actual_offerings
    assert actual_offerings['Probability II for Actuarial Science'].endswith('2026.2'), actual_offerings
    assert actual_offerings['Multivariate Analysis I'].endswith('2026.2'), actual_offerings
    assert courses.locator('.course-entry').first.locator('h3').inner_text() in ['Multivariate Analysis I','Probability II for Actuarial Science']
    courses.locator('#course-search').fill('Actuarial')
    assert courses.locator('.course-entry').count()==2
    courses.locator('#course-search').fill('')
    courses.locator('#course-year').select_option('2026')
    assert courses.locator('.course-entry').count()==4
    assert courses.locator('.course-level[data-level="undergraduate"]').count()==1
    assert courses.locator('.course-level[data-level="postgraduate"]').count()==0
    assert courses.locator('.course-entry p').count()==0
    assert courses.locator('.course-entry .course-meta').first.inner_text().startswith('UFPE · 2026.')
    print('TEACHING four concise undergraduate records, year filter and search: PASS')
    courses.close()

    mock='''window.PORTFOLIO.courses.push({id:"new-offering",title:{en:"Probability II",pt:"Probabilidade 2"},institution:"UFPE",offerings:["2027.2","2026.1"],description:{en:"Later teaching",pt:"Oferta posterior"}});
      for(let i=0;i<8;i++)window.PORTFOLIO.courses.push({id:"demo-"+i,title:{en:"Demo " + i,pt:"Exemplo " + i},institution:"UFPE",offerings:["2020.1"]});'''
    course_history=load(browser,'teaching',extra=mock)
    assert course_history.locator('.course-entry').count()==12  # six recent + six in collapsed archive
    assert course_history.locator('.directory-archive').count()==1
    assert course_history.locator('.course-entry h3').all_inner_texts().count('Probability II')==1
    assert course_history.locator('.course-entry').first.locator('h3').inner_text()=='Probability II'
    course_history.locator('.course-entry').first.locator('.course-history summary').click()
    timeline=course_history.locator('.course-entry').first.locator('.course-history li').all_inner_texts()
    assert timeline==['2027.2','2026.1'], timeline
    course_history.locator('#course-year').select_option('2020')
    assert course_history.locator('.course-entry').count()==8
    course_history.locator('#course-search').fill('Demo 3')
    assert course_history.locator('.course-entry').count()==1
    print('TEACHING repeated offerings deduplicated, ordered, archived, filtered: PASS')
    course_history.close()

    graduate_mock='''window.PORTFOLIO.courses.push({id:"graduate-probability",title:{en:"Probability II",pt:"Probabilidade 2"},institution:"UFPE",level:"postgraduate",offerings:["2027.2"],description:{en:"Graduate description must not show",pt:"Legenda que não deve aparecer"}});
      window.PORTFOLIO.courses.push({id:"graduate-methods",title:{en:"Statistical Methods I",pt:"Métodos Estatísticos 1"},institution:"UFPE",level:"Postgraduate",offerings:["2027.1"]});'''
    graduate=load(browser,'teaching',extra=graduate_mock)
    assert graduate.locator('.course-level').count()==2
    assert graduate.locator('.course-level[data-level="undergraduate"] .course-entry').count()==4
    assert graduate.locator('.course-level[data-level="postgraduate"] .course-entry').count()==2
    assert graduate.locator('.course-level[data-level="undergraduate"] .course-entry h3').all_inner_texts().count('Probability II')==1
    assert graduate.locator('.course-level[data-level="postgraduate"] .course-entry h3').all_inner_texts().count('Probability II')==1
    assert graduate.locator('.course-entry p').count()==0
    assert 'Graduate description must not show' not in graduate.locator('main').inner_text()
    graduate.locator('#course-year').select_option('2027')
    assert graduate.locator('.course-level[data-level="undergraduate"]').count()==0
    assert graduate.locator('.course-level[data-level="postgraduate"] .course-entry').count()==2
    graduate.locator('#language-toggle').click()
    assert graduate.locator('.course-level[data-level="postgraduate"] h2').inner_text()=='Pós-graduação'
    assert graduate.locator('.course-level[data-level="undergraduate"]').count()==0
    print('TEACHING graduate and undergraduate sections, bilingual, distinct levels, concise rows and filtering: PASS')
    graduate.close()

    wide=load(browser,'teaching',width=1920)
    width=wide.locator('.shell').first.evaluate('(el)=>el.getBoundingClientRect().width')
    assert 1370<=width<=1381, width
    assert wide.evaluate('getComputedStyle(document.body).fontSize')=='17px'
    assert wide.locator('.course-entry').count()==4
    wide.close()
    phone_course=load(browser,'teaching',width=390,extra=graduate_mock)
    assert phone_course.locator('.course-level').count()==2
    assert phone_course.locator('.course-entry').count()==6
    assert phone_course.evaluate('getComputedStyle(document.body).fontSize')=='16px'
    assert not phone_course.evaluate('document.documentElement.scrollWidth > window.innerWidth')
    phone_course.close()
    print('LAYOUT 1920px wider container, desktop reading size and 390px course layout: PASS')

    mock_people='''for(let i=0;i<9;i++)window.PORTFOLIO.students.push({id:"student-test-"+i,name:"Test Student "+i,levelId:"undergraduate",relation:"supervisor",status:i<2?"alumnus":"active",start:i<2?"2020.1":"2025.2"});'''
    alumni=load(browser,'people',extra=mock_people)
    assert alumni.locator('.directory-archive').count()>=1
    assert alumni.locator('.people-directory .person-entry').count()==11  # two real + nine synthetic, archive included
    assert not alumni.locator('.directory-archive').first.evaluate('(el)=>el.open')
    alumni.locator('.directory-archive').first.locator('summary').click()
    assert alumni.locator('.directory-archive').first.evaluate('(el)=>el.open')
    print('PEOPLE archived older entries expandable: PASS')
    alumni.close()

    mobile=load(browser,'supervision',width=390)
    assert mobile.locator('#topic-results article').count()==6
    assert mobile.locator('#menu-toggle').is_visible()
    mobile.locator('#menu-toggle').click()
    assert mobile.locator('#main-nav').is_visible()
    print('MOBILE responsive directory and navigation: PASS')
    mobile.close()

    assert not ERRORS,ERRORS
    print('JAVASCRIPT_ERRORS:',ERRORS)
    browser.close()
print('ALL DIRECTORIES CHECKS PASSED')
