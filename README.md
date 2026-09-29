# Site acadêmico · Willams Batista

Portfólio acadêmico bilíngue em HTML/CSS/JavaScript publicado em https://willamsferreira.com/ via GitHub Pages. A versão do site reflete o perfil, as publicações, o ensino e os vínculos acadêmicos informados pelo titular. Os arquivos HTML são regenerados pelo workflow de publicação; a fonte editorial principal fica em `assets/content.js`.

## Onde atualizar cada informação

| Conteúdo | Arquivo / procedimento |
| --- | --- |
| Biografia, projetos, orientandos, disciplinas e notícias | `assets/content.js` |
| Guia de Séries Temporais e Estatística Espacial | `assets/intro-library.js` (curadoria do Tópico 1 após `assets/research-library.js`) |
| Adicionar um DOI aprovado ou selecionar artigos em destaque | `data/sources.json` |
| Layout, estilos e componentes de interface | `assets/site.css`, `assets/app.js` |
| Arquivo fotográfico autorizado | `assets/portrait.webp` |
| Publicações importadas por DOI | `assets/auto-content.js` e `data/sync-cache.json` — **não editar manualmente** |

Para atualizar o texto, abra `assets/content.js` no GitHub, clique em **Edit** (lápis), faça a mudança e salve em **Commit changes** na branch `main`. Mantenha os campos `pt` e `en` em ambas as línguas. O workflow `Deploy academic website` recria os HTML e publica a versão nova automaticamente. Se alterar conteúdo, evite editar diretamente as dez páginas HTML: elas serão regeneradas.

A lista `students` usa `name` (nome completo editorial), `level:{pt,en}`, `role:{pt,en}`, `project` e `url`. A regra de apresentação abrevia automaticamente nomes de alunos e colaboradores com três ou mais palavras para primeiro nome + iniciais + último sobrenome, preservando partículas do sobrenome e sufixos familiares: **Pedro E. C. V. de Araújo**. Nomes de duas palavras, como **Muhammad Ismail**, não são abreviados. Para futuros colaboradores públicos, adicione entradas à lista `collaborators` com `name`, `role:{pt,en}`, `affiliation:{pt,en}` e `url`; a seção só aparece se houver registros. A abreviação é apenas visual: o nome completo fica no cadastro para identificação acadêmica; não se modificam autores e nomes em bibliografias. Os registros atuais informam apenas nome e vínculo de orientação. **Confirme a autorização dos estudantes antes de manter seus nomes em publicação pública.** Não envie informações pessoais, emails nem fotos sem autorização.

Para cadastrar uma disciplina, adicione uma entrada a `courses` com `id` único, `title:{pt,en}`, `institution`, `term` (deixe vazio quando desconhecido), `level`, `description:{pt,en}` e `materials` (vazio quando não houver material disponível).

## Bibliografia e sincronização

A lista de DOI explicitamente autorizados está em `data/sources.json`. Para acrescentar uma publicação, inclua uma nova entrada com DOI correto; configure `featured:false` caso não queira destacá-la na página inicial. O workflow `Sync public academic metadata` consulta semanalmente os metadados desses DOI via Crossref (segundas-feiras às 06h17 de Recife). Novos artigos não aparecem sem cadastro prévio do DOI. Na aba **Actions** do GitHub é possível executar a sincronização manualmente.

**Lattes não é importado automaticamente.** O link para o currículo existe no perfil, mas atualizações de orientação, estudantes, cursos, formação ou publicações feitas no Lattes devem ser incorporadas separadamente ao site. O ORCID não realiza descoberta/publicação automática na configuração atual. Repositórios privados não são publicados: a lista `github_repos` em `data/sources.json` permanece vazia até haver autorização explícita.

## Domínio próprio e infraestrutura

O endereço principal é `https://willamsferreira.com/` (sem www). O DNS fica no Cloudflare Free; a hospedagem e o HTTPS ficam no GitHub Pages. `scripts/site_config.py` centraliza a URL de produção e as dez rotas; o prerender gera metadados canônicos e Open Graph, e `scripts/generate_sitemap.py` mantém sitemap e robots sincronizados nos dois workflows de publicação. A configuração de Cloudflare DNS, GitHub Pages, HTTPS e Google Search Console está detalhada em `docs/custom-domain-activation.md`. O GitHub Pages redireciona a variante `www` e o antigo endereço `willb-ferreira.github.io` para o domínio principal. Para verificar publicamente os redirecionamentos e o certificado, execute `python scripts/check_live_domain.py` com acesso à Internet ou o workflow manual **Verify public domain redirects**.

## Metadados SEO bilíngues

`assets/content.js` → `seo` centraliza os títulos e descrições EN/PT das dez páginas. `assets/app.js` atualiza `<title>`, description e Open Graph ao alternar idioma sem criar URLs artificiais; `scripts/prerender.py` grava os metadados ingleses no HTML estático, preservando acesso sem JavaScript. A página inicial também publica `WebSite` JSON-LD com o nome curto e o nome acadêmico alternativo; todas as páginas mantêm `Person` JSON-LD e URLs canônicas no domínio sem www. O sitemap existente é suficiente para descoberta, sem requisições manuais de indexação para cada URL. Execute `python scripts/test_domain.py` após a prerenderização para verificar metadados únicos e consistentes.

## Navegação canônica e idioma

Os links para a página inicial usam `/` (domínio sem `/index.html`) em cabeçalho, trilhas de navegação e rodapé. A exceção é a visualização local `file://`, que usa `index.html` para continuar navegável. Visitas antigas a `/index.html` são normalizadas no navegador pela aplicação, preservando parâmetros e âncoras; a URL canônica do HTML já aponta para `/` (isso não constitui um redirecionamento HTTP 301). O rodapé usa **Back to top / Voltar ao topo** na página inicial e **Back to home / Voltar ao início** nas páginas internas. O link do currículo usa **Lattes CV** em inglês e **Currículo Lattes** em português. O prerender e os testes de navegação preservam essas escolhas.

## Implantação e verificação

`main` aciona o workflow `.github/workflows/deploy.yml`: instala o navegador de renderização, gera HTML estático atualizado e publica no GitHub Pages. A sincronização semanal também gera HTML e publica a nova versão. Acompanhe os resultados em `https://github.com/willb-ferreira/willb-ferreira.github.io/actions`.

Para validar localmente, instale Playwright e Chromium e execute:

```bash
python scripts/generate_sitemap.py
python scripts/prerender.py
python scripts/test_domain.py
python scripts/test_site.py
python scripts/test_sync_academic.py
```

Nunca publique senhas, tokens, dados pessoais de alunos ou conteúdo de repositórios privados no GitHub Pages. O site é público.


## Reading guides / Guias de leitura

The website defaults to English, with a full Brazilian Portuguese toggle. The public library contains **six concise guides**. *Time Series and Spatial Statistics / Séries temporais e estatística espacial* unifies the former separate time-series and spatial/spatio-temporal research cards. Stochastic-process theory remains a shared mathematical foundation, not a claim that the research area covers the entire theory of stochastic processes. Its introduction has three routes: time series, spatial and spatio-temporal statistics (including geostatistics and Bayesian hierarchy), and the connection through conditional two-dimensional spatial ARMA regression. The historical anchor `reading.html#time-series` still points into the unified introduction.

**Edit the public introduction** in `assets/intro-library.js`. This is the final bilingual editorial layer: it modifies only the former spatial/time-series topics, their reference selection and the research-card count. The five other guides keep their original data in `assets/content.js` and `assets/research-library.js`, but their public renderer shows just the introduction, two learning steps and three curated references per area. To change their visible order, update those data records or the compact selection in `assets/app.js`.

**Final cross-guide review:** The six concise EN/PT guides now contain 23 contextual cross-links. Topic 1 and Topic 2 provide outgoing connections as well as receiving them; the image-to-regression label uses the current research area title, and imaging geometry and causal spatial-dependence links explicitly distinguish statistical distances from geodesics and spatial dependence from causal interference. The desktop reading rail uses 16px titles. Link targets, every cross-guide click and active-panel selection are covered by browser regression tests. See `docs/research-guides-final-audit.md`; existing detailed per-topic source reports remain the evidence base.\n\n**Reading-page navigation:** `reading.html` now shows a single research guide at a time, with a sticky desktop rail, a labelled native mobile selector, and previous/next controls. Each full guide and its selected references remain intact. Direct anchors (including `#time-series` and links to individual sources), in-guide crosslinks, browser history and EN/PT selection remain supported. The current `NN / 06 · Research library` label is retained inside each article. See `docs/reading-single-guide-navigation-audit.md` for accessibility, SEO/prerender and regression boundaries. This interface change does not rewrite research content or academic data.

**Topic 2 and its geometry bridge:** `assets/inference-library.js` introduces the three concise statistical-inference routes (classical, Bayesian and information/divergence-based). The published Pardo divergence-inference book is visible in Topic 2; it remains in Information Geometry's underlying bibliography but is not duplicated in its short list. The guides link reciprocally.

**Information Geometry (three pathways):** `assets/geometry-library.js` loads after `assets/image-library.js` and presents three concise bilingual routes for (1) statistical manifolds and dual geometry, (2) geodesic estimation and hypothesis testing (including Menéndez–Morales–Pardo–Salicrú, 1995 and 1997), and (3) geometric computation and structured probability models (Amari's natural gradient, numerical Fisher–Rao distances, and a qualified bridge to Wishart-based SAR imaging). Eight selected readings are shown; all prior deep reference records are preserved. The geometry guide links to inferential theory, Statistical Image Processing and Time Series and Spatial Statistics. The source and mathematical-boundary audit is in `docs/information-geometry-three-pathways-audit.md`; the earlier five-reading audit remains as an editorial checkpoint. Do not equate arbitrary stochastic distances in PolSAR to Fisher–Rao geodesics without proof.

**Topic 3 — Statistical Image Processing:** `assets/image-library.js` loads after `assets/inference-library.js` and replaces only the public `sar` guide/card presentation with three concise bilingual routes: established SAR/PolSAR radar work, a developing optical/environmental remote-sensing direction and an emerging medical/biomedical image-analysis interest. It foregrounds seven verified starting references; the existing SAR literature and personal-publication data remain stored in their original source records. The topic links to spatial statistics, inference, regression/GEE and information geometry. The independent bibliography/verification ledger is in `docs/topic3-statistical-image-processing-audit.md`. Keep the current ID `sar` for backward-compatible anchors and research filters; do not alter approved personal-publication metadata from these guide files.\n\n**Topic 4 — Regression Models and Estimating Equations:** `assets/regression-library.js` loads after `assets/geometry-library.js` and changes only the public `regression` card/guide. Its three introductory routes are GLMs and marginal GEE, mixed-effects and hierarchical (including Bayesian spatial) regression, and flexible/distributional regression with GAM/GAMLSS. Eight selected sources are visible; the original `Regression and Other Stories` source and all extended research references remain preserved. The Moraga book is a spatial Bayesian specialization and must not be represented as GEE. The guide links to spatial statistics, inferential theory, imaging and causal identification. See `docs/regression-gee-hierarchical-distributional-audit.md` for checked metadata and assumptions. This editorial branch does not alter approved publications or the other five guides.

**Causal Inference (three pathways):** `assets/causal-library.js` is loaded after the previous curated guides. It preserves the existing `causal` research/reading ID and the “Developing research interest” status, while presenting three short bilingual routes: (1) causal identification and study design; (2) semiparametric/doubly robust estimation and causal machine learning; (3) spatial and longitudinal causal inference, including spatial interference, environmental outcomes and modern difference-in-differences. The public guide foregrounds nine checked readings from twelve underlying source records; prior causal bibliography is preserved. It links to dependent-data statistics, statistical inference, regression/GEE and statistical imaging. See `docs/causal-three-pathways-audit.md` for bibliography, assumptions and explicit limits: observational associations, predictive accuracy and spatial covariance alone do not identify intervention effects. No personal causal publication is implied.

The deeper, previously merged Topic 1 curriculum has **not been discarded**: `assets/spatial-guide.js` and `docs/spatial-topic-1-audit.md` preserve it as an editorial research archive, not as the public introduction. `reading.html` no longer loads the detailed 31-reference guide. None of the curated reading references is an automatic claim of a personal publication; only approved personal publication records are synced through the academic metadata workflow.

When changing a title or a guide, maintain `en` and `pt` and run `python scripts/prerender.py`, `python scripts/test_site.py`, and the other existing checks before merging.

## Academic directories / Diretórios acadêmicos (2026)

* **Students:** `assets/content.js` → `students`. Specify `levelId: "undergraduate"|"masters"|"phd"`, `relation: "supervisor"|"co-supervisor"`, `status: "active"|"alumnus"`, and `start`/`end` only if verified (`YYYY`, `YYYY-MM` or clear semester label). The site groups by level and relationship; current/most recent records appear before a collapsed history. The two existing student relationships began in 2026.2 (Pedro, undergraduate research supervision) and 2026.1 (Muhammad, Ph.D. co-supervision), as confirmed by the professor. Obtain consent before publishing names.
* **Courses:** `assets/content.js` → `courses`. Keep one object per distinct course. `offerings` holds teaching terms, e.g. `["2026.1", "2027.2"]`; repeated offerings appear under **Teaching history**, not as duplicate course cards. A bare year (`"2026"`) records a confirmed year **without attributing either semester**; replace it with exact semesters when available. If duplicate records of the same translated title are supplied, the renderer groups them. Six most recently taught course titles are shown initially, with an expandable archive and year/search filters.
* **Topics and disclosure:** `topics` now offers 6 broad undergraduate, 5 master's and 3 Ph.D. directions. Specific unpublished methodologies are not part of the current client-side files. `researchIdeas` contains three broad collaboration interests. These are **not** vacancies, confirmed collaborations or validated results. Store detailed research plans in a separate access-controlled workspace.
* **Private project materials:** unpublished formulas, theorem statements, simulation plans and detailed feasibility assessments must not be added to this repository. Removing prior public notes from the current branch does not erase earlier commits or third-party copies. The teaching terms and supervision start semesters are confirmed.

**Confirmed teaching history (2026):** 2026.1 — Probability II (Statistics) and Statistical Inference for Actuarial Sciences; 2026.2 — Probability II for Actuarial Science and Multivariate Analysis I. If a course is taught again, append the new term to its existing `offerings` list rather than adding a duplicate course.

## Research disclosure / Divulgação dos projetos

The public site now presents broad study and collaboration directions. Detailed unpublished formulations and internal feasibility notes are intentionally absent from current client-side files. Historical revisions may retain earlier disclosures; this editorial change does not make those versions private. Read `SECURITY.md` and use separate access-controlled workspaces for detailed team projects.
