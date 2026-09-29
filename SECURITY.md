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

## Account checklist

Enable GitHub two-factor authentication or a passkey, retain recovery codes securely, periodically review connected GitHub applications, and check GitHub's secret-scanning and push-protection settings. These are account and repository settings and cannot be verified by reading this source repository.

If a credential is published, revoke it immediately. Removing the current file is not sufficient to remove earlier copies from Git history or external caches.

See the repository workflows for the current deployment rules. Changes to workflow permissions and branch protection must be tested together with the weekly approved-DOI synchronization, which currently commits generated metadata.
