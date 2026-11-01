"""Offline browser regressions for localized links and the audited interactive flows."""
from pathlib import Path
from urllib.parse import parse_qs, urlparse
import mimetypes
import os

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
ORIGIN = "https://site.test"
ERRORS = []
GUIDE_SCRIPTS = ["research-library", "intro-library", "inference-library", "image-library", "geometry-library", "regression-library", "causal-library"]


def fixture(kind, locale):
    sources = ["content", "auto-content"] + (GUIDE_SCRIPTS if kind == "reading" else []) + ["app"]
    scripts = "".join(f'<script src="/assets/{name}.js"></script>' for name in sources)
    return f'''<!doctype html><html lang="{'pt-BR' if locale == 'pt' else 'en'}" data-site-lang="{locale}"><head>
      <meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
      <title>Fixture</title><meta name="description" content=""><meta property="og:title" content=""><meta property="og:description" content="">
      <link rel="canonical" href="{ORIGIN}/"><link rel="stylesheet" href="/assets/site.css"></head>
      <body data-page="{kind}"><a class="skip-link" href="#main">Skip to content</a><div id="site-header"></div>
      <main id="main"></main><div id="site-footer"></div><div id="toast" role="status" aria-live="polite"></div>{scripts}</body></html>'''


def route_request(route):
    parsed = urlparse(route.request.url)
    if parsed.netloc != "site.test":
        route.abort()
        return
    path = parsed.path
    if path.startswith("/assets/"):
        candidate = (ROOT / path.lstrip("/")).resolve()
        if candidate.is_relative_to((ROOT / "assets").resolve()) and candidate.is_file():
            route.fulfill(path=str(candidate), content_type=mimetypes.guess_type(str(candidate))[0] or "application/octet-stream")
        else:
            route.abort()
        return
    locale = "pt" if path.startswith("/pt/") else "en"
    slug = path.removeprefix("/pt/") if locale == "pt" else path.lstrip("/")
    kind = slug.removesuffix(".html") or "index"
    if kind == "404":
        kind = "not-found"
    route.fulfill(body=fixture(kind, locale), content_type="text/html")


with sync_playwright() as playwright:
    browser = playwright.chromium.launch(executable_path=os.environ.get("CHROMIUM_BIN") or None, headless=True, args=["--no-sandbox"])
    context = browser.new_context(viewport={"width": 1365, "height": 900}, color_scheme="light")
    context.route("**/*", route_request)
    context.add_init_script('''window.auditCopies=[];Object.defineProperty(navigator,"clipboard",{configurable:true,value:{writeText:async value=>window.auditCopies.push(value)}});''')
    page = context.new_page()
    page.on("pageerror", lambda error: ERRORS.append(str(error)))

    page.goto(ORIGIN + "/publications.html?type=conference&year=2024&q=variance#main")
    page.locator("#pub-count").wait_for()
    assert page.locator(".publication").count() == 1
    assert "Analysis of Variance" in page.locator(".publication").inner_text()
    assert page.locator("#publication-year").input_value() == "2024"
    assert page.locator("#publication-search").input_value() == "variance"
    language = page.locator("#language-toggle")
    assert language.evaluate("el=>el.tagName") == "A"
    assert language.get_attribute("href") == "/pt/publications.html?type=conference&year=2024&q=variance#main"
    language.click()
    page.wait_for_url("**/pt/publications.html?type=conference&year=2024&q=variance#main")
    assert page.locator("html").get_attribute("lang") == "pt-BR"
    assert page.locator(".publication").count() == 1
    assert page.locator("#site-header .brand").get_attribute("href") == "/pt/"
    assert all(href.startswith("/pt/") for href in page.locator("#main a[href]").evaluate_all("nodes=>nodes.map(el=>el.getAttribute('href')).filter(href=>/\\.html/.test(href)&&!/^https?:/.test(href))"))
    page.goto(ORIGIN + "/publications.html")
    assert page.locator("html").get_attribute("lang") == "en", "The URL must override saved Portuguese preference"
    assert page.locator("#site-header .nav a[href='/software.html']").count() == 0
    assert page.locator("#site-footer a[href='/software.html']").count() == 1
    assert page.locator("#site-footer a[href='/reading.html']").count() == 1
    assert "Bibliographic data updated" in page.locator(".footer-updated").inner_text()
    print("LOCALE explicit routes, query/fragment-preserving language links, footer navigation: PASS")

    page.locator("[data-type='conference']").click()
    assert parse_qs(urlparse(page.url).query)["type"] == ["conference"]
    assert page.locator(".publication").count() == 1
    page.locator("[data-type='article']").click()
    assert page.locator(".publication").count() == 3
    page.go_back()
    assert page.locator("[data-type='conference']").get_attribute("aria-pressed") == "true"
    assert page.locator(".publication").count() == 1
    page.locator("[data-type='all']").click()
    page.locator("#publication-search").fill("gamma")
    assert parse_qs(urlparse(page.url).query)["q"] == ["gamma"]
    assert page.locator(".publication").count() == 1
    page.reload()
    assert page.locator("#publication-search").input_value() == "gamma"
    assert page.locator(".publication").count() == 1
    page.goto(ORIGIN + "/publications.html?type=invalid&year=never&q=%3Cscript%3E")
    assert page.locator("[data-type='all']").get_attribute("aria-pressed") == "true"
    assert page.locator("#publication-year").input_value() == "all"
    assert page.locator("#publication-search").input_value() == "<script>"
    assert page.locator("main script").count() == 0
    print("PUBLICATIONS validated shared filters, search persistence and Back navigation: PASS")

    page.goto(ORIGIN + "/publications.html")
    jstars = page.locator(".publication").filter(has_text="A GAMLSS Framework")
    assert jstars.locator("a[href='https://doi.org/10.1109/jstars.2026.3680479']").count() == 1
    assert "Open access" in jstars.locator(".links").inner_text()
    button = page.locator("[data-cite]").first
    assert "↗" not in button.inner_text()
    button.click()
    assert button.inner_text().strip() == "Copied"
    assert page.evaluate("window.auditCopies.length") == 1
    assert "A GAMLSS Framework" in page.evaluate("window.auditCopies[0]")
    button.click()
    page.wait_for_function("document.querySelector('[data-cite]').textContent.includes('Copy citation')")
    page.locator("#citation-format").select_option("bibtex")
    button.click()
    assert page.evaluate("window.auditCopies.at(-1).startsWith('@article{')")
    assert " and " in page.evaluate("window.auditCopies.at(-1)")
    print("CITATIONS one DOI/OA link, copy-specific feedback and BibTeX copy: PASS")

    assert page.locator("#theme-toggle").get_attribute("data-theme-mode") == "system"
    page.locator("#theme-toggle").click()
    assert page.locator("#theme-toggle").get_attribute("data-theme-mode") == "light"
    assert page.locator("html").get_attribute("data-theme") == "light"
    page.locator("#theme-toggle").click()
    assert page.locator("#theme-toggle").get_attribute("data-theme-mode") == "dark"
    assert page.locator("html").get_attribute("data-theme") == "dark"
    page.locator("#theme-toggle").click()
    assert page.locator("#theme-toggle").get_attribute("data-theme-mode") == "system"
    page.emulate_media(color_scheme="dark")
    page.wait_for_function("document.documentElement.dataset.theme==='dark'")
    page.emulate_media(color_scheme="light")
    page.wait_for_function("document.documentElement.dataset.theme==='light'")
    assert "Current theme: system. Switch to light." == page.locator("#theme-toggle").get_attribute("aria-label")
    print("THEME system/light/dark cycle returns to live system preferences: PASS")

    page.goto(ORIGIN + "/supervision.html")
    page.locator("[data-level='masters']").click()
    assert urlparse(page.url).fragment == "level-masters"
    assert page.locator("#topic-results article").count() == 5
    page.locator("[data-level='phd']").click()
    assert page.locator("#topic-results article").count() == 3
    page.go_back()
    assert page.locator("[data-level='masters']").get_attribute("aria-pressed") == "true"
    assert page.locator("#topic-results article").count() == 5
    assert page.locator("#language-toggle").get_attribute("href").endswith("#level-masters")
    print("SUPERVISION shared level and Back navigation: PASS")

    page.goto(ORIGIN + "/contact.html")
    labels = page.locator(".contact-card a").all_inner_texts()
    assert len(set(labels)) == 2
    assert page.locator(".contact-card .contact-symbol svg").count() == 2
    assert page.locator(".contact-availability").count() == 0
    page.goto(ORIGIN + "/reading.html")
    assert page.locator(".reading-time").count() == 6
    assert all("min read" in label for label in page.locator(".reading-time").all_text_contents())
    page.goto(ORIGIN + "/pt/404.html")
    assert page.locator("h1").inner_text() == "Página não encontrada"
    assert page.locator("main a[href='/pt/']").count() >= 1
    assert page.locator("main a[href='/pt/publications.html']").count() == 1
    assert page.locator("main a[href='/pt/contact.html']").count() == 1
    print("CONTACT distinct accessible actions, honest optional availability; guide reading times; localized404: PASS")

    assert not ERRORS, ERRORS
    context.close()
    browser.close()
print("AUDIT EXPERIENCE: PASS")
