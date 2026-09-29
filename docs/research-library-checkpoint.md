# Research-library checkpoints — historical archive (not current)

> **Archive notice (2026-09-29):** This document preserves earlier editorial and test snapshots; it is **not** the current public research-library inventory. The website currently displays **six** concise bilingual research guides and **31** selected visible reading references, with the consolidated **Time Series and Spatial Statistics / Séries temporais e estatística espacial** introduction. The previous detailed Topic 1 curriculum is retained for editorial reference in `assets/spatial-guide.js` and `docs/spatial-topic-1-audit.md`; it is not loaded in the current public guide. For current behavior and maintenance, consult `README.md`, `assets/intro-library.js`, `assets/inference-library.js`, `assets/image-library.js`, and `scripts/test_site.py`. Earlier figures (seven guides/58 references, then eight guides/69 references) and their CI results describe only their respective historical revisions.

---

# Superseded seven-guide snapshot — 2026-09-29

At this historical stage, the website displayed **seven** research areas and **seven** bilingual reading guides, with **58** annotated bibliography entries. Statistical Learning Theory has been removed from the public research index and reading guide at the owner's request. The former **Time Series and Stochastic Processes** area is now **Time Series / Séries temporais**; stochastic processes and random fields are explicitly addressed under **Spatial and spatio-temporal statistics / Estatística espacial e espaço-temporal**. Stochastic-process concepts remain relevant prerequisites for time-series methods. The historical eight-area checkpoint below records a previous implementation; its reference counts and earlier test results are not the current public inventory.

---

# Eight-area research library — editorial checkpoint (2026-09-29)

## Implementation
- Draft pull request: https://github.com/willb-ferreira/willb-ferreira.github.io/pull/1. This branch is **not published** on GitHub Pages.
- Human-curated extension: `assets/research-library.js`, loaded after `assets/content.js` and before `assets/app.js`. The source data of approved personal publications, academic synchronization, students, courses and private repositories is unchanged.
- Eight research cards and eight bilingual reading guides. The former computing guide remains available as a transversal skills section in the information-geometry guide; no independent ninth area is claimed.
- The original human-curated guide references remain as provided except that computing was moved. The extension adds 50 candidate scholarly records (29 across existing six areas; 11 learning theory; 10 causal inference). The expected aggregate is 69 research-guide references, plus four transversal-computing entries.

## Scientific editorial decisions
- Statistical Learning Theory is a **developing research interest**, not an assertion of a published contribution. Distinguish Vapnik/Chervonenkis uniform-convergence and VC results from Valiant's PAC framework, margin-based SVMs, later Rademacher bounds and algorithmic stability.
- Causal Inference is a **developing research interest**, not an assertion of a published contribution. Identification is not estimation; predictive accuracy alone is not causal identification.
- Directions labelled `extension` are plausible methodological extensions **not verified as open problems**. Exercises are explicitly labelled. No literature-wide open-problem claim was added.
- The user's existing published work, where already linked in the original guide, remains separate from the recommended reading library.

## Bibliographic audit: exact status
- Existing 23 entries were already present in `docs/literature-audit.md`; this change does not constitute independent re-verification of them.
- 50 newly proposed references have author/title/year/venue and publisher, DOI, journal, or bibliographic-catalog URLs; this is a **candidate annotated bibliography, not a completed reference-by-reference audit**.
- Spot-check of primary publisher pages confirmed *The Nature of Statistical Learning Theory*, 2nd edition (Springer, © 2000, DOI 10.1007/978-1-4757-3264-1) and Pearl's *Causality*, 2nd edition (Cambridge University Press, 2009 print edition, DOI 10.1017/CBO9780511803161).
- **Pending before publication:** independently cross-check each of the 50 new records against its primary page (authors, edition/year, journal volume/pages, DOI/ISBN); repair or omit any uncertain identifier; inspect duplicate usage across guides. Neither DOI strings nor catalog URLs are proof that a specific edition/record is correct.
- The bilingual notes have matching editorial coverage; a native-language scientific copy edit remains recommended. The current original guide was retained, and only the six existing areas received added sections; the original entries are not rewritten as a formal systematic review.

## Technical audit
- Pull-request workflow `.github/workflows/validate-library.yml` runs static prerendering, Playwright site/browser tests (including language and mobile navigation), and academic synchronization tests. Validation run [36516069547](https://github.com/willb-ferreira/willb-ferreira.github.io/actions/runs/36516069547) completed successfully for commit `9cc74786f9f71afb23726a8b7027f4393e3099a6`: page prerender, Playwright site tests (eight guides, 69 references, language switching and mobile navigation), and publication-sync tests. This does **not** verify bibliographic identifiers or live Pages deployment.
- Existing `.github/workflows/deploy.yml` and `.github/workflows/sync-academic.yml` were not changed.
- GitHub Pages still deploys only from `main`. A green PR validation is not a live publication.
- Inspect the pull-request CI run and `reading.html` at narrow mobile width before merging. After merging, verify the separate Pages deployment job and the published URL.
