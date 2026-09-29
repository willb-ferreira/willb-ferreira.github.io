# Configuração e manutenção do domínio `willamsferreira.com`

**Status em 29/09/2026:** DNS validado no GitHub Pages e Enforce HTTPS habilitado, conforme confirmação do proprietário; migração dos metadados mesclada no PR #18 e workflow de publicação concluído. As etapas abaixo documentam a configuração para manutenção. A verificação independente de redirecionamentos públicos pode ser executada com `scripts/check_live_domain.py` ou pelo workflow **Verify public domain redirects**.

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

## 5. Publicação automatizada e redirecionamentos

A migração de URLs e metadados foi mesclada no PR #18. O workflow de publicação e a sincronização acadêmica semanal mantêm URLs canônicas, sitemap e robots a partir de `scripts/site_config.py`. Após cada implantação, consulte GitHub Actions e confira `https://willamsferreira.com/sitemap.xml` e `https://willamsferreira.com/robots.txt`.

O GitHub Pages aplica o redirecionamento de `www.willamsferreira.com` para `willamsferreira.com` ao encontrar os registros DNS de ambos os endereços. O antigo endereço `willb-ferreira.github.io` é redirecionado pelo próprio Pages quando o domínio personalizado está ativo; não é possível configurar esse hostname em regras DNS da Cloudflare. Evite regras redundantes de redirecionamento no Cloudflare Free e preserve os caminhos de URLs internas. Execute `python scripts/check_live_domain.py` numa máquina com acesso público à Internet ou o workflow **Verify public domain redirects** no GitHub para verificar HTTP → HTTPS, www → sem www e o domínio legado, incluindo páginas internas. O script exige certificado TLS válido e confere as URLs canônicas retornadas.

## 6. Google Search Console

Em https://search.google.com/search-console/, clique em **Adicionar propriedade → Domínio**, informe `willamsferreira.com` e adicione na Cloudflare o TXT exato fornecido pelo Google. Verifique e mantenha o registro. Em **Sitemaps**, envie `https://willamsferreira.com/sitemap.xml`. O TXT do Google **não substitui** o TXT de verificação do GitHub.

## Reversão e fontes

Se uma etapa falhar, consulte primeiro o estado DNS/HTTPS no GitHub Pages, os logs do workflow de publicação e o script de verificação pública. Não remova registros de e-mail ou verificações de outros serviços e não altere o domínio canônico apenas para contornar uma falha temporária de propagação. Documentação: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site e https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages.
