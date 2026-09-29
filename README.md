# Willams Batista — academic website / site acadêmico

Site pessoal e acadêmico bilíngue (PT/EN), pronto para o repositório público `willb-ferreira/willb-ferreira.github.io`.

## Conteúdo desta versão

- Fotografia autorizada do titular: `assets/portrait.webp` (otimizada para web; original não é enviado).
- Perfil e vínculo conforme informação atual do titular: Professor Assistente de Estatística, Departamento de Estatística, UFPE. O Lattes antigo usa outra denominação funcional; confirme a denominação oficial para uma futura atualização.
- E-mail público institucional e links Lattes, ORCID, Google Scholar e GitHub.
- **Os três artigos de periódico registrados no Lattes e no CV**, com DOI conferidos e cache inicial de metadados.
- Publicação do IGARSS 2024 classificada separadamente como trabalho de congresso.
- Cursos 2026 informados nos dois currículos; a Análise Multivariada consta especificamente no CV em inglês.
- Repositórios de pesquisa não estão publicados (lista de software e allowlist de repositórios vazias).
- Temas de orientação são sugestões, não vagas abertas; informações de alunos ainda não aparecem.
- Não foram incluídos PDFs dos currículos, nomes de alunos, emails de referências acadêmicas ou código de repositórios privados.

## Colocar online hoje pelo GitHub Pages

**Repositório:** https://github.com/willb-ferreira/willb-ferreira.github.io  
**Endereço do site, após a publicação:** https://willb-ferreira.github.io/

1. Descompacte `site_academico_willams_pronto_publicar.zip` no seu computador. Na raiz do repositório, envie **o conteúdo da pasta** (não a pasta externa nem o ZIP). Preserve `assets/`, `data/`, `scripts/` e `.github/workflows/`. Se a interface web omitir arquivos ocultos, confira especificamente `.github/workflows/deploy.yml`, `.github/workflows/sync-academic.yml` e `.nojekyll`.
2. No GitHub, abra `Settings → Pages → Build and deployment → Source` e escolha **GitHub Actions**. O workflow `.github/workflows/deploy.yml` deve fazer o deploy de `main`.
3. Abra `Actions → Deploy academic website` e verifique que o workflow terminou com sucesso. Em `Settings → Pages`, clique em `Visit site`. A propagação pode levar alguns minutos. Se o primeiro deploy falhar por Pages não habilitado, selecione a fonte e execute o workflow novamente.
4. Para verificar a coleta, execute `Actions → Sync public academic metadata → Run workflow`. Nas próximas semanas a atualização roda às segundas-feiras, 09:17 UTC, correspondente a 06:17 em Recife (UTC-3). O GitHub pode atrasar execuções agendadas.
5. Caso o workflow de sincronização não consiga fazer `git push` para o `main`, revise `Settings → Actions → General → Workflow permissions` (read/write); só habilite o necessário e nunca adicione um token pessoal ao código.

**IMPORTANTE:** esta pasta e o ZIP **não comprovam que o site foi publicado**. Só considere online após sucesso do deploy e abertura da URL pública.

## Como a atualização funciona

`data/sources.json` contém a allowlist dos três DOI autorizados e nenhum repositório. A primeira versão já traz metadados conferidos em `data/sync-cache.json` e `assets/auto-content.js`; por isso funciona mesmo antes da primeira execução online. `scripts/sync_academic.py` consulta semanalmente os três DOI via Crossref e preserva o cache se a fonte falhar. Todos os novos artigos precisam ser **aprovados na allowlist** antes de aparecer no site. A descoberta ORCID está desativada no workflow atual; nenhuma credencial ORCID é necessária. A cada execução bem-sucedida, o workflow atualiza as páginas HTML para indexação e publica a nova versão.

Para adicionar um artigo: edite `data/sources.json`, acrescentando `{"doi":"10.xxxx/...","featured":true,"tags":["..."]}`; após salvar, use `Run workflow` no GitHub. Para manter o artigo fora da página inicial, configure `featured:false`.

Para atualizar bio, orientação, disciplinas e alunos autorizados: edite `assets/content.js`; o deploy automático ocorre após o commit na `main`. Nunca publique dados pessoais de alunos sem consentimento.

## Rodar e testar localmente

`python -m http.server 8000` a partir da raiz; abra http://localhost:8000. Para reconstruir as páginas estáticas, instale Playwright e Chromium e execute `python scripts/prerender.py`. Os testes de navegação e sincronização ficam em `scripts/test_site.py` e `scripts/test_sync_academic.py`.

## Segurança e limites

GitHub Pages hospeda conteúdo estático: nada do repositório público deve conter senha, token, dado de aluno sem consentimento ou manuscrito/repositório privado. A sincronização com Crossref é semanal, não em tempo real. O Google Scholar e o Lattes são vinculados, mas não extraídos automaticamente por scraping.
