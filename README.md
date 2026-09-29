# Site acadêmico · Willams Batista

Portfólio acadêmico bilíngue em HTML/CSS/JavaScript publicado em https://willb-ferreira.github.io/ via GitHub Pages. A versão do site reflete o perfil, as publicações, o ensino e os vínculos acadêmicos informados pelo titular. Os arquivos HTML são regenerados pelo workflow de publicação; a fonte editorial principal fica em `assets/content.js`.

## Onde atualizar cada informação

| Conteúdo | Arquivo / procedimento |
| --- | --- |
| Biografia, projetos, orientandos, disciplinas e notícias | `assets/content.js` |
| Área unificada de processos estocásticos e guias introdutórios | `assets/intro-library.js` (aplica a curadoria final após `assets/research-library.js`) |
| Adicionar um DOI aprovado ou selecionar artigos em destaque | `data/sources.json` |
| Layout, estilos e componentes de interface | `assets/site.css`, `assets/app.js` |
| Arquivo fotográfico autorizado | `assets/portrait.webp` |
| Publicações importadas por DOI | `assets/auto-content.js` e `data/sync-cache.json` — **não editar manualmente** |

Para atualizar o texto, abra `assets/content.js` no GitHub, clique em **Edit** (lápis), faça a mudança e salve em **Commit changes** na branch `main`. Mantenha os campos `pt` e `en` em ambas as línguas. O workflow `Deploy academic website` recria os HTML e publica a versão nova automaticamente. Se alterar conteúdo, evite editar diretamente as nove páginas HTML: elas serão regeneradas.

A lista `students` usa `name`, `level:{pt,en}`, `role:{pt,en}`, `project` e `url`. Os registros atuais informam apenas nome e vínculo de orientação. **Confirme a autorização dos estudantes antes de manter seus nomes em publicação pública.** Não envie informações pessoais, emails nem fotos sem autorização.

Para cadastrar uma disciplina, adicione uma entrada a `courses` com `id` único, `title:{pt,en}`, `institution`, `term` (deixe vazio quando desconhecido), `level`, `description:{pt,en}` e `materials` (vazio quando não houver material disponível).

## Bibliografia e sincronização

A lista de DOI explicitamente autorizados está em `data/sources.json`. Para acrescentar uma publicação, inclua uma nova entrada com DOI correto; configure `featured:false` caso não queira destacá-la na página inicial. O workflow `Sync public academic metadata` consulta semanalmente os metadados desses DOI via Crossref (segundas-feiras às 06h17 de Recife). Novos artigos não aparecem sem cadastro prévio do DOI. Na aba **Actions** do GitHub é possível executar a sincronização manualmente.

**Lattes não é importado automaticamente.** O link para o currículo existe no perfil, mas atualizações de orientação, estudantes, cursos, formação ou publicações feitas no Lattes devem ser incorporadas separadamente ao site. O ORCID não realiza descoberta/publicação automática na configuração atual. Repositórios privados não são publicados: a lista `github_repos` em `data/sources.json` permanece vazia até haver autorização explícita.

## Implantação e verificação

`main` aciona o workflow `.github/workflows/deploy.yml`: instala o navegador de renderização, gera HTML estático atualizado e publica no GitHub Pages. A sincronização semanal também gera HTML e publica a nova versão. Acompanhe os resultados em `https://github.com/willb-ferreira/willb-ferreira.github.io/actions`.

Para validar localmente, instale Playwright e Chromium e execute:

```bash
python scripts/prerender.py
python scripts/test_site.py
python scripts/test_sync_academic.py
```

Nunca publique senhas, tokens, dados pessoais de alunos ou conteúdo de repositórios privados no GitHub Pages. O site é público.


## Reading guides / Guias de leitura

The website defaults to English, with a full Brazilian Portuguese toggle. The public library contains **six concise guides**. *Time Series and Spatial Statistics / Séries temporais e estatística espacial* unifies the former separate time-series and spatial/spatio-temporal research cards. Stochastic-process theory remains a shared mathematical foundation, not a claim that the research area covers the entire theory of stochastic processes. Its introduction has three routes: time series, spatial and spatio-temporal statistics (including geostatistics and Bayesian hierarchy), and the connection through conditional two-dimensional spatial ARMA regression. The historical anchor `reading.html#time-series` still points into the unified introduction.

**Edit the public introduction** in `assets/intro-library.js`. This is the final bilingual editorial layer: it modifies only the former spatial/time-series topics, their reference selection and the research-card count. The five other guides keep their original data in `assets/content.js` and `assets/research-library.js`, but their public renderer shows just the introduction, two learning steps and three curated references per area. To change their visible order, update those data records or the compact selection in `assets/app.js`.

**Topic 2 and its geometry bridge:** `assets/inference-library.js` is loaded after the concise library and introduces three short routes for classical inference, Bayesian inference, and statistical information/divergence-based estimation and testing. The independent Information Geometry guide now also introduces geodesic-distance estimation and hypothesis testing, with a reciprocal in-page link. Leandro Pardo's divergence-inference reference appears in both contexts as a shared bridge; it is not presented as proof that arbitrary divergences equal global Fisher–Rao geodesic distance. The public bibliography stays short; existing deeper reference records are retained. All visible text must have complete `en`/`pt` equivalents.

The deeper, previously merged Topic 1 curriculum has **not been discarded**: `assets/spatial-guide.js` and `docs/spatial-topic-1-audit.md` preserve it as an editorial research archive, not as the public introduction. `reading.html` no longer loads the detailed 31-reference guide. None of the curated reading references is an automatic claim of a personal publication; only approved personal publication records are synced through the academic metadata workflow.

When changing a title or a guide, maintain `en` and `pt` and run `python scripts/prerender.py`, `python scripts/test_site.py`, and the other existing checks before merging.

## Academic directories / Diretórios acadêmicos (2026)

* **Students:** `assets/content.js` → `students`. Specify `levelId: "undergraduate"|"masters"|"phd"`, `relation: "supervisor"|"co-supervisor"`, `status: "active"|"alumnus"`, and `start`/`end` only if verified (`YYYY`, `YYYY-MM` or clear semester label). The site groups by level and relationship; current/most recent records appear before a collapsed history. The two existing student relationships began in 2026.2 (Pedro, undergraduate research supervision) and 2026.1 (Muhammed, Ph.D. co-supervision), as confirmed by the professor. Obtain consent before publishing names.
* **Courses:** `assets/content.js` → `courses`. Keep one object per distinct course. `offerings` holds teaching terms, e.g. `["2026.1", "2027.2"]`; repeated offerings appear under **Teaching history**, not as duplicate course cards. A bare year (`"2026"`) records a confirmed year **without attributing either semester**; replace it with exact semesters when available. If duplicate records of the same translated title are supplied, the renderer groups them. Six most recently taught course titles are shown initially, with an expandable archive and year/search filters.
* **Topics and disclosure:** `topics` now offers 6 broad undergraduate, 5 master's and 3 Ph.D. directions. Specific unpublished methodologies are not part of the current client-side files. `researchIdeas` contains three broad collaboration interests. These are **not** vacancies, confirmed collaborations or validated results. Store detailed research plans in a separate access-controlled workspace.
* **Private project materials:** unpublished formulas, theorem statements, simulation plans and detailed feasibility assessments must not be added to this repository. Removing prior public notes from the current branch does not erase earlier commits or third-party copies. The teaching terms and supervision start semesters are confirmed.

**Confirmed teaching history (2026):** 2026.1 — Probability II (Statistics) and Statistical Inference for Actuarial Sciences; 2026.2 — Probability II for Actuarial Science and Multivariate Analysis I. If a course is taught again, append the new term to its existing `offerings` list rather than adding a duplicate course.

## Research disclosure / Divulgação dos projetos

The public site now presents broad study and collaboration directions. Detailed unpublished formulations and internal feasibility notes are intentionally absent from current client-side files. Historical revisions may retain earlier disclosures; this editorial change does not make those versions private. Read `SECURITY.md` and use separate access-controlled workspaces for detailed team projects.
