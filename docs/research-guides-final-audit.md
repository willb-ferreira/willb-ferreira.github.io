# Final review: Research reading guides and cross-area navigation

Editorial checkpoint: 2026-09-29. Scope: the six public EN/PT introductory guides on `reading.html`, the desktop navigation rail, and links **between** guides. Existing personal publication metadata, project/teaching records, research areas, three introductory routes per guide, DOI source records, the established guide order and URL anchors are retained. The per-topic audits in `docs/` remain the scientific provenance for the selected literature. This is an internal scientific/editorial consistency and functional-link audit, **not** independent rederivation of all cited theorems or a real-time HTTP availability audit of third-party websites.

## Desktop legibility

The desktop guide rail now uses **16px title text**, 1.48 line-height, 12.5px tabular guide numbers, a larger minimum navigation column (245px), and a slightly stronger active-state weight. Links have adequate padding and wrap naturally; the rail stays sticky and may scroll independently on short desktop viewports. At the existing ≤840px breakpoint the labelled native selector remains the navigation control. Content does not acquire a nested scrollbar or become limited to one viewport height. The original `NN / 06 · Research library` indicator is unchanged.

## Editorial link matrix: 23 valid contextual connections

Each arrow is a real `href="#guide-id"` pointing to one of the six preserved article IDs, not a pointer to missing or hidden text. Descriptions are topical rather than implying that the destination proves or implements a distinct research methodology.

| Source guide | Destinations | Scientific interpretation and limits |
| --- | --- | --- |
| 01 Time Series and Spatial Statistics (`spatial-models`) | Statistical Inference; Image Processing; Regression; Causal Inference | NEW four outward links address asymptotics under dependence, SAR pixel dependence, marginal/conditional spatial regression, and environmental interventions. The causal link explicitly says that dependence does **not** establish identification. This closes the previous navigation dead-end in Topic 1. |
| 02 Statistical Inference and Asymptotic Theory (`theory`) | Information Geometry; Time Series/Spatial; Regression; Causal Inference | Retains the geodesic-test bridge to Information Geometry and adds estimation/inference under dependent sampling, GEE/robust uncertainty and the distinction between uncertainty and causal identification. No claim that all divergences are global Fisher–Rao distances. |
| 03 Statistical Image Processing (`sar`) | Time Series/Spatial; Statistical Inference; Regression; Information Geometry | Retains pixel/spatial-dependence and image-derived inference links. Corrects the obsolete “Regression and GEE” label to **Regression and Estimating Equations** and clarifies that statistical distances on SAR matrix models are **not necessarily geodesics**. Does not assert a medical-imaging publication. |
| 04 Regression Models and Estimating Equations (`regression`) | Time Series/Spatial; Statistical Inference; Image Processing; Causal Inference | Existing links correctly distinguish GEE marginal estimation, hierarchical/latent spatial modelling, non-Gaussian imaging applications and causal identification requirements. They do not equate a GEE association with a causal effect. |
| 05 Information Geometry (`geometry`) | Statistical Inference; Image Processing; Time Series/Spatial | Existing connections distinguish divergence tests from geodesic tests, qualified SAR stochastic-distance applications, and inference/calibration under dependence. A PolSAR stochastic distance is not automatically a Fisher–Rao geodesic. |
| 06 Causal Inference (`causal`) | Time Series/Spatial; Statistical Inference; Regression; Image Processing | Retains links to spatio-temporal modelling, semiparametric inference, marginal regression and image-derived environmental outcomes. Revises the spatial link to distinguish **statistical spatial dependence** from **causal interference**, which needs additional intervention/exposure assumptions. |

The structure is deliberately selective: not every pair of guides needs an arrow. For example, Information Geometry ↔ Causal Inference is not presented as a direct pedagogical link merely to make the graph complete. The links that exist reflect the actual three routes in the destination guide.

## Functional and integrity checks

The Playwright regression suite exercises **all 23** links in the English desktop guide, verifying the resulting URL hash, the uniquely active guide and the sidebar's `aria-current` marker. It verifies the six destinations and checks that no source links to itself, that link text is nonempty and that the content selector remains functional. Portuguese labels are validated for semantic scope and for the corrected links. The current title and user-facing scope of Regression, SAR and causal/spatial work are checked explicitly.

Desktop typography and overflow are checked at the usual desktop width and at 900px, with the existing EN/PT tests at 390px and 320px. The baseline suite continues to verify **six guides, 18 introductory routes, 45 curated references**, direct source anchors, legacy `#time-series`, browser history, bibliography, source data and academic-directory/publication regression. A browser check can establish working links and responsive presentation; it cannot prove unverified scientific results or continuous availability of every external DOI.

## Files changed

- `assets/site.css`: reading rail typography/column sizing, plus scoped link styling for Topics 1 and 2.
- `assets/intro-library.js`: four focused outward links from Topic 1.
- `assets/inference-library.js`: three additional links from Topic 2 while retaining its Pardo/geodesic crosslink.
- `assets/image-library.js`: current regression title and accurate statistical-distance/geodesic qualification.
- `assets/causal-library.js`: separate spatial dependence from causal interference in the link label.
- `assets/app.js`: display bilingual related-guide navigation in Topics 1 and 2 with the same semantic `nav` structure used by the other guides.
- `scripts/test_site.py`: full 23-edge user interaction and layout regression.
- `README.md`: current guide ownership and this checkpoint.

No new JavaScript dependencies or CSS frameworks, no altered public bibliography selection, no research title changes, no changes to the other site pages and no private research materials were needed. Publish only after GitHub Actions validates this branch and verify the `main` deploy afterward.
