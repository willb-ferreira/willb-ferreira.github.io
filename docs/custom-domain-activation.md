# Ativação do domínio `willamsferreira.com`

**Importante:** este pull request permanece em rascunho até o novo domínio estar ativo e validado. A branch `main` e o site anterior continuam inalterados até a mesclagem.

## 1. Verificar a propriedade no GitHub

Na sua conta GitHub, clique na foto → **Settings → Pages → Add a domain** (configurações da sua conta, não do repositório). Adicione `willamsferreira.com`. O GitHub fornecerá um registro DNS **TXT de verificação individual**. Na Cloudflare, em **willamsferreira.com → DNS → Records → Add record**, insira exatamente o nome e o valor exibidos pelo GitHub. Aguarde a propagação e clique em **Verify** no GitHub. Mantenha o TXT depois da verificação; ele protege o domínio de apropriações indevidas. Não invente nem reutilize um valor TXT de outro serviço.

## 2. Associar o domínio ao repositório

Acesse https://github.com/willb-ferreira/willb-ferreira.github.io/settings/pages. Mantenha **Build and deployment → Source: GitHub Actions**. Em **Custom domain**, insira `willamsferreira.com` (sem `https://` ou `www`) e clique em **Save**. Por publicar com GitHub Actions, este projeto **não precisa de arquivo CNAME**; um arquivo CNAME no repositório seria ignorado.

## 3. Configurar DNS na Cloudflare Free

Em https://dash.cloudflare.com/, abra **willamsferreira.com → DNS → Records**. Remova ou substitua apenas entradas de estacionamento/conflitantes para os hosts web `@` e `www`; preserve registros TXT de verificação, MX e outros serviços existentes. Crie os cinco registros abaixo, com **Proxy status: DNS only** (nuvem cinza) e TTL Auto. Os endereços IP são os publicados na documentação oficial do GitHub Pages.

| Tipo | Nome | Conteúdo / destino | Proxy |
| --- | --- | --- | --- |
| A | @ | 185.199.108.153 | DNS only |
| A | @ | 185.199.109.153 | DNS only |
| A | @ | 185.199.110.153 | DNS only |
| A | @ | 185.199.111.153 | DNS only |
| CNAME | www | willb-ferreira.github.io | DNS only |

Não crie um registro curinga (`*`). Não adicione A ou AAAA para `www` se usar o CNAME. Os registros AAAA do domínio raiz são opcionais e dispensáveis para a primeira ativação.

Em Windows PowerShell, confira `Resolve-DnsName willamsferreira.com -Type A` e `Resolve-DnsName www.willamsferreira.com -Type CNAME`. A propagação DNS pode levar até 24 horas.

## 4. Confirmar TLS e redirecionamento

No mesmo painel **GitHub → Repository Settings → Pages**, aguarde a verificação DNS e a emissão do certificado. Habilite **Enforce HTTPS** quando a opção estiver disponível. Teste `https://willamsferreira.com/` e `https://www.willamsferreira.com/`; o segundo endereço deve redirecionar para o primeiro. Teste também uma página interna, por exemplo `/research.html`, e confira o certificado. Não habilite o proxy laranja da Cloudflare durante a emissão/diagnóstico do certificado.

## 5. Publicar os metadados preparados

Com DNS, HTTPS e redirecionamento comprovados, aguarde o workflow **Validate research library** deste PR finalizar com sucesso e mescle o PR. O workflow de publicação e a sincronização acadêmica semanal manterão as URLs canônicas, o sitemap e o robots a partir de `scripts/site_config.py`. Verifique a implantação em GitHub Actions e acesse `https://willamsferreira.com/sitemap.xml` e `https://willamsferreira.com/robots.txt`.

## 6. Google Search Console

Em https://search.google.com/search-console/, clique em **Adicionar propriedade → Domínio**, informe `willamsferreira.com` e adicione na Cloudflare o TXT exato fornecido pelo Google. Verifique e mantenha o registro. Em **Sitemaps**, envie `https://willamsferreira.com/sitemap.xml`. O TXT do Google **não substitui** o TXT de verificação do GitHub.

## Reversão e fontes

Se uma etapa falhar, não mescle este PR; o site anterior e seus metadados permanecem na `main`. Não remova registros de e-mail ou verificações de outros serviços. Documentação: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site e https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages.
