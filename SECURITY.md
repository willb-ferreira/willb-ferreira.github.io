# Security and research-disclosure policy

This repository and its commit history are public. Only place information here that is approved for public release. An unlinked file, hidden element, unreferenced JavaScript object or ignored path is not a confidentiality mechanism.

## Public versus restricted content

Public: professional profile, verified papers, approved student names and academic relationships, teaching history, broad research themes, and carefully worded descriptions of publicly advertised supervision topics.

Restricted: unpublished proofs, precise hypotheses and experimental plans, candidate distribution formulas, confidential datasets, drafts under embargo, partner information, credentials, and unpublished collaboration notes. Maintain restricted material in a separate private repository or another access-controlled research workspace.

Public research descriptions should explain the motivation and mathematical area, indicate prerequisite skills and point to published foundations. Detailed ideas and planned technical novelty should be shared selectively with prospective collaborators or students rather than placed in the site's source files. Before disclosing potentially protectable technology, consult UFPE's appropriate technology-transfer office.

## Publishing precautions

The current public site is generated from client-side source files, including assets/content.js and assets/research-library.js. Any research ideas or student topics written in those files can be downloaded by visitors. The public repository also contains historical versions, including some more detailed research notes. Removing a page or a document from the latest version cannot undo prior disclosures.

Before merging content, check that the text and referenced documents are intended to be public, that student information has consent, and that no API keys or sensitive collaborators' information have been added. Prefer pull requests with tests to direct edits to main.

GitHub Pages hosts a static site and does not provide private document storage. Do not build an authentication interface by hiding private content in publicly served JavaScript or HTML.

## Browser protections and hosting boundaries

The prerendered HTML includes an early `Content-Security-Policy` meta element and a `referrer` meta element. These work in supported browsers when the site is served by GitHub Pages; they do not require custom server headers. The CSP allows the site's own JavaScript and hashes the exact theme bootstrap. It blocks unapproved inline JavaScript, event-handler attributes, dynamic evaluation, remote scripts, runtime network requests, embedded objects, frames, workers, base-URL changes and form submission. External navigation to DOI, academic profiles and email remains available. Existing inline layout styles remain permitted to preserve the interface. This policy limits browser behavior; it does not make public files confidential or protect against an authorized account serving malicious same-origin code.

`scripts/security_policy.py` is the shared policy source. Run `scripts/prerender.py` after changing inline code, then `scripts/generate_security_headers.py`. The latter reads all ten final HTML pages and writes `_headers` with a union of their script hashes. Do not edit the generated hashes manually.

`_headers` is prepared for a future static Cloudflare Pages deployment. GitHub Pages does not interpret this file, and keeping DNS on Cloudflare does not activate it. These additional controls become active only when the hosting response actually sends them:

| HTTP response header | Prepared policy |
| --- | --- |
| `Content-Security-Policy` | The shared resource policy, plus `frame-ancestors 'none'` and `upgrade-insecure-requests` |
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `DENY` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | Camera, microphone, geolocation, payment and USB disabled |
| `Strict-Transport-Security` | `max-age=31536000`, without `includeSubDomains` or `preload` |

`frame-ancestors` and the other HTTP-only controls must not be represented as ineffective HTML meta tags. `frame-src 'none'` in the current meta CSP prevents this site from loading frames; it does not prevent another site from embedding this site. That requires the HTTP framing controls above. HSTS takes effect after a browser receives the HTTPS response and is deliberately limited to the visited host.

Cloudflare Pages applies `_headers` to static asset responses. Pages Functions or a Worker require their own response-header implementation. A future migration must verify actual response headers, HTTPS, canonical URLs, redirects and browser behavior; generating this file alone does not validate a Cloudflare deployment. See [Cloudflare's header configuration](https://developers.cloudflare.com/pages/configuration/headers/), [CSP meta-element limitations](https://www.w3.org/TR/CSP3/#meta-element), and [HSTS behavior](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Strict-Transport-Security).

## Private source repository and a public website

The deployment staging command copies only the generated public pages, their required runtime assets, sitemap, robots and hosting configuration into `_site/public`. It excludes repository documentation, build scripts, source caches and unreferenced files from the hosting artifact. This reduces accidental publication through the website; those files remain visible through GitHub while this repository is public.

Making the source repository private can restrict access to its source and commit history through GitHub. It cannot withdraw earlier clones, caches or disclosures. It also cannot conceal HTML, CSS, images or JavaScript delivered by the public website: the entire contents of `assets/content.js` and each loaded library remain downloadable, including records that the interface does not currently display. Restricted research material must remain outside the website's client-side files.

If private source is desired, first deploy and test the public artifact on the intended provider with access only to this repository. Verify EN/PT, themes, links, citation export, academic synchronization, redirects and TLS there. Change DNS only after that preview succeeds, validate the production domain, and keep a working rollback path. Change repository visibility only after confirming the new host and automated updates work independently of public GitHub Pages. This repository does not automatically change provider, DNS or visibility.

## Account checklist

Enable GitHub two-factor authentication or a passkey, retain recovery codes securely, periodically review connected GitHub applications, and check GitHub's secret-scanning and push-protection settings. These are account and repository settings and cannot be verified by reading this source repository.

If a credential is published, revoke it immediately. Removing the current file is not sufficient to remove earlier copies from Git history or external caches.

See the repository workflows for the current deployment rules. Changes to workflow permissions and branch protection must be tested together with the weekly approved-DOI synchronization, which currently commits generated metadata.

Workflow actions are pinned to reviewed commit SHAs and Playwright to an exact version. Revisit those pins periodically against the upstream projects and rerun the complete build and browser checks before updating them; this repository does not promise automatic dependency updates.
