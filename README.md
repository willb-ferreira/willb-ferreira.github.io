# Site acadêmico · Willams Batista

Portfólio acadêmico bilíngue em HTML/CSS/JavaScript publicado em https://willb-ferreira.github.io/ via GitHub Pages. A versão do site reflete o perfil, as publicações, o ensino e os vínculos acadêmicos informados pelo titular. Os arquivos HTML são regenerados pelo workflow de publicação; a fonte editorial principal fica em `assets/content.js`.

## Onde atualizar cada informação

| Conteúdo | Arquivo / procedimento |
| --- | --- |
| Biografia, interesses, projetos, orientandos, disciplinas e notícias | `assets/content.js` |
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

The site now defaults to English; the Portuguese toggle preserves a visitor's choice. `reading.html` contains seven annotated reading paths. The human-maintained reference records (titles, publishers/DOI URLs and bilingual notes) are stored under `readingGuides` in `assets/content.js`. Direct publisher/journal links are provided; the site does not copy copyrighted articles or claim that each list is exhaustive.

The guide structure separates entry points, foundational and seminal readings, and subsequent research bridges. The bibliography was checked against publisher, journal or bibliographic catalog records on 2026-09-28/29; editorial selection and the suggested reading paths remain recommendations, not a systematic literature review. The student's eventual research topic and supervision availability still require discussion with the professor. The Lattes is NOT automatically scraped, and the research guide references are not automatically rewritten by Crossref (only approved personal publication DOI records are synced).

To edit a guide: update the matching `readingGuides` object in `assets/content.js`; keep the bilingual `en` and `pt` fields, and link each cited work to its DOI, publisher or other authoritative bibliographic page. To add a new research area also add its `readingGuides` entry and `research` item with the same `id`.
