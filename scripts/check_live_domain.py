"""Check public HTTPS and canonical redirects from an external network.

Usage: python scripts/check_live_domain.py
This check is deliberately separate from offline build tests because DNS, TLS and
GitHub Pages routing can take time to propagate following a migration.
"""
from __future__ import annotations

import time
from urllib.request import Request, urlopen

from site_config import LEGACY_URL, SITE_URL

TEST_CASES = (
    ("HTTPS apex", f"{SITE_URL}/", f"{SITE_URL}/"),
    ("HTTP to HTTPS", "http://willamsferreira.com/", f"{SITE_URL}/"),
    ("HTTPS www to apex", "https://www.willamsferreira.com/", f"{SITE_URL}/"),
    ("HTTP www, internal page", "http://www.willamsferreira.com/research.html", f"{SITE_URL}/research.html"),
    ("Legacy GitHub Pages", f"{LEGACY_URL}/", f"{SITE_URL}/"),
    ("Legacy internal page", f"{LEGACY_URL}/reading.html", f"{SITE_URL}/reading.html"),
)


def verify_case(label: str, source: str, expected: str) -> None:
    last_error: Exception | None = None
    for attempt in range(1, 4):
        try:
            request = Request(source, headers={"User-Agent": "WillamsAcademicDomainCheck/1.0"})
            # urlopen follows ordinary HTTP redirects and verifies TLS certificates.
            with urlopen(request, timeout=12) as response:
                actual = response.geturl()
                status = response.status
                head = response.read(32768).decode("utf-8", errors="replace")
            if status != 200 or actual != expected:
                raise AssertionError(f"HTTP {status}; final URL {actual!r}; expected {expected!r}")
            if f'<link rel="canonical" href="{expected}"' not in head:
                raise AssertionError("Final HTML does not advertise the expected canonical URL")
            print(f"PASS {label}: {source} -> {actual}", flush=True)
            return
        except Exception as exc:
            last_error = exc
            print(f"RETRY {attempt}/3 {label}: {exc}", flush=True)
            if attempt < 3:
                time.sleep(7)
    raise AssertionError(f"FAIL {label}: {source}: {last_error}")


def main() -> None:
    for label, source, expected in TEST_CASES:
        verify_case(label, source, expected)
    print(f"PASS all {len(TEST_CASES)} public URL, redirect, TLS and canonical checks")


if __name__ == "__main__":
    main()
