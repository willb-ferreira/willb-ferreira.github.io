"""Canonical production URL and published routes; change only after DNS/Pages activation."""
SITE_URL = "https://willamsferreira.com"
LEGACY_URL = "https://willb-ferreira.github.io"
PAGE_SLUGS = (
    "index", "research", "reading", "publications", "supervision",
    "people", "teaching", "software", "about", "contact",
)


def page_url(name: str) -> str:
    """Return the absolute canonical URL of a public page."""
    if name not in PAGE_SLUGS:
        raise ValueError(f"Unknown page: {name}")
    return SITE_URL + ("/" if name == "index" else f"/{name}.html")
