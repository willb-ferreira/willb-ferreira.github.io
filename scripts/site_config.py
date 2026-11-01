"""Canonical production URL and published routes; change only after DNS/Pages activation."""
SITE_URL = "https://willamsferreira.com"
LEGACY_URL = "https://willb-ferreira.github.io"
PAGE_SLUGS = (
    "index", "research", "reading", "publications", "supervision",
    "people", "teaching", "software", "about", "contact",
)
LANGUAGES = ("en", "pt")


def page_path(name: str, language: str = "en") -> str:
    """Keep established English URLs and give Portuguese its own directory."""
    if name not in PAGE_SLUGS:
        raise ValueError(f"Unknown page: {name}")
    if language not in LANGUAGES:
        raise ValueError(f"Unknown language: {language}")
    prefix = "/pt/" if language == "pt" else "/"
    return prefix if name == "index" else prefix + name + ".html"


def page_url(name: str, language: str = "en") -> str:
    """Return the absolute canonical URL of one language version."""
    return SITE_URL + page_path(name, language)


def page_file(name: str, language: str = "en") -> str:
    """Return a workspace-relative HTML filename, including index.html."""
    page_path(name, language)  # Validate both values before using them in a path.
    return ("pt/" if language == "pt" else "") + name + ".html"


def public_html_files(*, include_not_found: bool = True) -> tuple[str, ...]:
    files = tuple(page_file(name, language) for language in LANGUAGES for name in PAGE_SLUGS)
    return files + (("404.html", "pt/404.html") if include_not_found else ())
