# Topic 2 and Information Geometry — concise editorial audit

**Subsequent geometry-reading update (2026-09-29):** Menéndez, Morales, Pardo & Salicrú (1995) is now the central geodesic-test reading, followed by their 1997 (h,Φ)-metric paper. The public geometry selection has five readings, not the original four described below. See [`information-geometry-geodesic-reading-audit.md`](information-geometry-geodesic-reading-audit.md) for the corrected current source ledger; this earlier report is retained as its historical editorial checkpoint.

Date: 2026-09-29. Scope: `assets/inference-library.js`, the Topic 2 presentation and its reciprocal connection to the already-existing Information Geometry guide. Topic 1, other research areas, personal publication data, students and courses are not changed.

## Scientific organization

- **Topic 2: Statistical Inference and Asymptotic Theory.** Three short, mutually connected learning routes: classical/frequentist inference; Bayesian inference; statistical information and divergence-based estimation/testing. Identifiability, assumptions, uncertainty and asymptotic validity are the shared foundation. A divergence is a mathematical construction, not a third inferential school.
- **Information Geometry.** Maintains its separate focus on Fisher–Rao metrics, manifolds, affine/dual connections, divergences and geodesics. It explicitly includes *possible estimator/test constructions* from geodesic distance as well as divergence-based inference. No unpublished estimator, geodesic derivation or test statistic is asserted.
- The two guides cross-link. An information divergence need not equal a global geodesic distance; the Fisher information metric can describe local second-order behaviour under appropriate regularity, but global distances and the null distribution of a test require separate analysis. Neither the generic chi-square limit nor robustness can be claimed for all such tests.
- Pardo's book is a bridge through published *divergence*-based estimation and testing; it is **not** described as the source for a generic geodesic test or as a proof of equivalence between all divergences and Fisher–Rao geodesic distance. For an explicit published geodesic-test connection, cite Burbea and del Castillo (1992).

## Selected public references and verification

Existing bibliographic records retained in the original `assets/content.js` and `assets/research-library.js` are not deleted by this change. Six new or newly foregrounded source records underpin the short guides:

| Work | Scope and evidence consulted |
|---|---|
| Leandro Pardo, *Statistical Inference Based on Divergence Measures* (Chapman & Hall/CRC, copyright 2006, 1st ed., ISBN 9781584886006) | Primary [publisher catalogue and table of contents](https://www.routledge.com/Statistical-Inference-Based-on-Divergence-Measures/Pardo/p/book/9780429148521) explicitly document minimum phi-divergence estimators and tests. Later eBook dates or reprints are not misrepresented as a new edition. |
| A. Basu, I. R. Harris, N. L. Hjort and M. C. Jones, “Robust and efficient estimation by minimising a density power divergence” (*Biometrika* 85(3), 549–559, 1998; DOI 10.1093/biomet/85.3.549) | [Publisher abstract and bibliographic record](https://academic.oup.com/biomet/article-abstract/85/3/549/228993); the robustness–efficiency statement pertains to the paper's specified density-power family. |
| E. L. Lehmann and J. P. Romano, *Testing Statistical Hypotheses*, 3rd ed. (2005; DOI 10.1007/0-387-27605-X) | [Springer 3rd-edition catalogue](https://link.springer.com/book/10.1007/0-387-27605-X); previously stored in the full scientific bibliography, foregrounded for classical testing. |
| A. Gelman, J. B. Carlin, H. S. Stern, D. B. Dunson, A. Vehtari and D. B. Rubin, *Bayesian Data Analysis*, 3rd ed. (2013; ISBN 9781439840955) | [Publisher 3rd-edition catalogue](https://www.routledge.com/link/link/p/book/9781439840955); introduced for Bayesian inference, computation and predictive checks. |
| J. M. Bernardo and A. F. M. Smith, *Bayesian Theory* (Wiley, 1994; ISBN 9780471924166) | [Wiley catalogue](https://www.wiley-vch.de/en/areas-interest/mathematics-statistics/bayesian-theory-978-0-471-92416-6); introduced for mathematical Bayesian foundations, prior specification and decision theory. |
| J. Burbea and J. del Castillo, “Geodesic submanifolds of statistical models with location parameters” (*Computational Statistics & Data Analysis* 14(3), 301–313, 1992; DOI 10.1016/0167-9473(92)90041-D) | [Publisher abstract](https://www.sciencedirect.com/science/article/pii/016794739290041D) and [institutional bibliographic record](https://portalrecerca.uab.cat/en/publications/geodesic-submanifolds-of-statistical-models-with-location-paramet/): explicitly connects Fisher-information geodesic submanifolds to constructing tests based on information-geodesic distance. |

Also foregrounded from previously stored records: Lehmann–Casella, *Theory of Point Estimation* (2nd ed., 1998); van der Vaart, *Asymptotic Statistics* (1998); Amari, *Information Geometry and Its Applications* (2016); and Amari–Nagaoka, *Methods of Information Geometry* (2000). Their existing URLs and metadata are preserved.

**Verification boundary:** publisher catalogues, journal abstracts and bibliographic records were checked; the complete proofs of these books and papers were not reconstructed. Source descriptions are restricted to verifiable contents. Existing personal publications are not used to imply completed original contributions in geodesic-based testing.

## Rendering and regression scope

`assets/inference-library.js` runs after `assets/research-library.js` and `assets/intro-library.js`. It overrides only the public presentation of `theory` and `geometry`. Both existing deep reading libraries remain stored. The renderer displays seven references for Topic 2, four for Information Geometry, and preserves the short presentation of the four other guides. The two topics link reciprocally; existing IDs and direct links remain stable.

Review the pull-request validation for English/Portuguese, classical/Bayesian/information routes, Pardo and geodesic-source links, the six-card research index, the original Topic 1 three-track guide, the existing publications and academic directories, and desktop/mobile overflow. Do not treat a passing browser test as a proof-level scientific audit.
