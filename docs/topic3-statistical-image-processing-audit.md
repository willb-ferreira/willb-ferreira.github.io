# Topic 3 — Statistical Image Processing: concise scientific and editorial audit

Date: 2026-09-29. Scope: the **public research card and guide with ID `sar` only**, plus its links to the existing spatial statistics, inference, regression and information-geometry guides. The existing six-area structure, personal publications, students, courses, research project filters and the other five guides are unchanged. Source of this change: `assets/image-library.js`; the original content and deeper SAR bibliography remain in `assets/content.js` and `assets/research-library.js`.

## Initial diagnosis and editorial choices

The previous visible Topic 3 was titled “Statistical image processing and remote sensing” but its question, paths and all starting readings primarily concerned coherent SAR/PolSAR data. That accurately reflected the existing radar/SAR focus, yet omitted the distinct measurement assumptions of optical Earth observation and clinical/biomedical imagery. It was difficult for students to distinguish shared statistical tools from sensor-specific physics.

**Reconstruction:** title **Statistical Image Processing / Processamento Estatístico de Imagens**, a short shared foundation and three equal-visibility introductory cards:

1. **Radar imaging and SAR/PolSAR — established research activity:** coherent backscatter, speckle, multilook and polarimetric measurements; crops and environmental monitoring.
2. **Optical remote sensing and environmental imaging — developing research direction:** passive multispectral/hyperspectral imagery, radiometry, vegetation and land-cover change, and carefully aligned optical–SAR fusion. Passive optical satellite imagery is **not an optical radar**; LiDAR is active laser ranging and can be studied separately where relevant.
3. **Medical and biomedical image analysis — emerging research interest:** segmentation and estimation on MRI, CT and pathology/lesion imagery, with patient-level validation and acquisition-specific noise. No medical/clinical expertise, patient access, original medical-imaging result or diagnostic service is claimed.

The shared foundation covers acquisition models, noise, spatial dependence, statistical filtering, segmentation, classification, uncertainty and validation. A SAR speckle model is not automatically appropriate for optical radiometric error or medical acquisition noise. The guide discusses methodology rather than unverified results or confidential manuscripts. Existing public SAR work remains in the original records; it is not repurposed as evidence of completed medical or optical research.

## Short reading sequence and bibliographic verification

The public page uses seven selected readings. The original approved SAR materials, including Goodman and the author's existing verified publication entries, stay in the underlying bibliography; they are not deleted to produce a short page.

| Route | Reference | Metadata / why it is included | Source checked |
|---|---|---|---|
| Shared | Richard Szeliski, *Computer Vision: Algorithms and Applications*, **2nd ed.**, Springer, 2022 | Cross-modality foundations in image formation, restoration, registration and estimation. | [Author's 2nd-edition book page](https://szeliski.org/Book/) confirms the edition and year. |
| Radar | Chris Oliver and Shaun Quegan, *Understanding Synthetic Aperture Radar Images*, corrected SciTech reprint **2004**, ISBN **9781891121319** | Image-formation chain, SAR observables and statistical data models; **retained** source record. | [Book catalogue / edition metadata](https://books.google.com/books/about/Understanding_Synthetic_Aperture_Radar_I.html?id=IeGKe40S77AC). |
| Radar | Jong-Sen Lee and Eric Pottier, *Polarimetric Radar Imaging: From Basics to Applications*, CRC Press, **2009**, ISBN **9781420054972** | PolSAR scattering, covariance-based observables, filtering and applications; **retained** record. | [Publisher book page](https://www.routledge.com/Polarimetric-Radar-Imaging-From-Basics-toApplications/Lee-Pottier/p/book/9781420054972). |
| Optical | John A. Richards, *Remote Sensing Digital Image Analysis*, **6th ed.**, Springer, **2022**, DOI **10.1007/978-3-030-82327-6** | Multispectral/hyperspectral information, radiometric and spectral processing and statistical remote-sensing analysis. | [Publisher 6th-edition catalogue](https://link.springer.com/book/10.1007/978-3-030-82327-6). |
| Optical | Zhe Zhu, “Change detection using landsat time series: A review of frequencies, preprocessing, algorithms, and applications,” *ISPRS Journal of Photogrammetry and Remote Sensing* **130** (2017), 370–384, DOI **10.1016/j.isprsjprs.2017.06.013** | Optical Landsat change detection and radiometric/preprocessing assumptions for environmental applications. | [Publisher abstract and bibliographic record](https://www.sciencedirect.com/science/article/pii/S092427161730103X). |
| Medical | Dzung L. Pham, Chenyang Xu and Jerry L. Prince, “Current methods in medical image segmentation,” *Annual Review of Biomedical Engineering* **2** (2000), 315–337, DOI **10.1146/annurev.bioeng.2.1.315** | Established segmentation concepts and modality-appropriate evaluation. | [Original journal abstract](https://www.annualreviews.org/content/journals/10.1146/annurev.bioeng.2.1.315) and [PubMed record](https://pubmed.ncbi.nlm.nih.gov/11701515/). |
| Medical | Geert Litjens, Thijs Kooi, Babak Ehteshami Bejnordi, Arnaud Arindra Adiyoso Setio, Francesco Ciompi, Mohsen Ghafoorian, Jeroen A. W. M. van der Laak, Bram van Ginneken and Clara I. Sánchez, “A survey on deep learning in medical image analysis,” *Medical Image Analysis* **42** (2017), 60–88, DOI **10.1016/j.media.2017.07.005** | Comparative context for medical classification, lesion detection and segmentation; **not** evidence that deep learning by itself validates a clinical claim. | [Publisher article and abstract](https://doi.org/10.1016/j.media.2017.07.005) and [PubMed bibliographic record](https://pubmed.ncbi.nlm.nih.gov/28778026/). |

**Verification boundary:** bibliographic metadata, table of contents or abstracts were checked through the linked author, publisher, catalogue and biomedical bibliographic sources. Their complete technical proofs were not independently reproduced; neither the summary nor the website claims they were. Clinical validation and patient privacy requirements must be addressed before a future medical application.

## Site implementation and tests

- `assets/image-library.js` loads after the existing research, concise spatial and inference editorial layers, preserving existing IDs, SAR source metadata and the underlying deeper guide. Only Topic 3's public title, introductory text, three routes, seven selected readings and cross-guide links change.
- `assets/app.js` adds a Topic-3-only compact renderer that reuses the established reading-card layout. CSS is scoped to `.image-guide`. `assets/site.css` includes small status labels and mobile-friendly cross-guide links.
- The prerender and offline Playwright tests load the final editorial layer after `assets/inference-library.js`. All ten HTML entry points load it in the same order.
- The regression tests check six research cards, three Topic-3 routes, two original radar works, optical and medical references, four cross-guide links, EN/PT, mobile widths (390px and 320px) and no horizontal overflow. Existing Topic 1, Topic 2, Information Geometry, students, publications and research filters retain their checks.

**Checkpoint:** do not merge this branch until the current pull-request workflow and the refreshed GitHub Pages deployment finish successfully. A green browser test validates rendering and metadata relationships, not independent correctness of every scientific result in the cited literature.
