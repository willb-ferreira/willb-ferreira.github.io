# Melhorias após a auditoria independente

Data de referência: 1 de novembro de 2026.

A auditoria externa e a seção “Além da auditoria” foram confrontadas com o repositório e os fluxos existentes. A atualização preserva o conteúdo científico, a identidade visual, os DOI aprovados, os vínculos de orientação e os endereços existentes.

## Decisões

- **Idiomas:** inglês nos endereços existentes; português em `/pt/`. Ambos têm conteúdo estático completo, canônico próprio, alternates e sitemap. O endereço identifica o idioma; a escolha de idioma conserva filtros e âncoras.
- **Pré-renderização e desempenho:** o site já tinha pré-renderização. A afirmação de dependência total de JavaScript não se confirmou no código e no build. A biblioteca extensa passou a ser separada dos resumos de pesquisa, preservando as seis áreas e os metadados.
- **Navegação:** página 404 com caminhos úteis; guias no rodapé; acesso a Pessoas preservado. Código e dados continua disponível, e sua entrada no cabeçalho depende de haver repositórios publicados.
- **Controles:** busca/filtros de publicações e nível de orientação compartilháveis; anúncio de resultados em Ensino; filtro de ano apenas quando necessário; materiais e descrições cadastrados exibidos.
- **Referências:** remover seta de link externo da ação de copiar, confirmar junto ao botão, oferecer BibTeX e evitar DOI duplicado no indicador de acesso aberto.
- **Orientação:** conhecimentos recomendados específicos para os 14 temas, sem transformar propostas em anúncio de vagas.
- **Apresentação:** alvos de toque maiores, leitura móvel mais confortável, retrato inicial mais compacto, seletor móvel acessível durante a leitura e impressão dos guias completos.
- **Preferências:** opção de voltar ao tema do sistema; data bibliográfica rotulada conforme seu significado.

## Ressalvas à auditoria

Um alvo menor que 24 px não demonstra isoladamente descumprimento da WCAG 2.5.8: há exceções por espaçamento, equivalência e links em texto. O aumento de alvos foi adotado para melhorar o uso, sem declarar falhas de conformidade a partir apenas da altura.

A inicial já mostrava três artigos em destaque. Projetos sem URL já eram cartões estáticos, sem falsa ação de clique. A ausência da opção automática do tema não impedia a troca manual entre claro e escuro.

Os números de transferência de JavaScript e a economia percentual do relatório não foram reproduzidos como promessa de desempenho. Os arquivos e os estados efetivamente gerados são a base da validação.

## Informações e mudanças não presumidas

Não foram inventados vagas, bolsas, horários, prazo de resposta, currículo PDF, materiais de disciplinas, projetos de estudantes ou repositórios de pesquisa. Esses elementos dependem de dados públicos confirmados.

A hospedagem, o DNS e o acesso continuam na configuração existente. O repositório já fornece política de segurança e geração de `_headers`; GitHub Pages não aplica esse arquivo. Uma migração de hospedagem exige uma necessidade própria, não foi introduzida por esta atualização.

O retrato original em WebP é pequeno e também atende telas com maior densidade. Os formatos APA/ABNT exigem validação editorial apropriada; as saídas oferecidas nesta atualização são a referência e o BibTeX dos registros existentes.

## Verificação

As oito suítes passaram: domínio/idiomas, conteúdo e interações, novos fluxos de experiência, sincronização de metadados, diretórios, responsividade, empacotamento e segurança. Foram verificados os 22 HTML sem JavaScript, a navegação entre idiomas, filtros compartilháveis e histórico, exportação/cópia de BibTeX, impressão dos seis guias e preservação das bibliografias. A responsividade cobre 17 larguras de 320 a 2560 px, português, fonte ampliada, orientação paisagem e alinhamento do cabeçalho com o seletor móvel. Não foram registrados erros JavaScript nas suítes. A prévia local também foi conferida visualmente no navegador.

Testes automatizados de acessibilidade e emulação de tela não substituem uma avaliação com leitores de tela e aparelhos físicos. Não se infere desempenho de campo a partir de tamanho de arquivos.

## Acabamento móvel após revisão visual

A revisão do site publicado identificou três refinamentos para preservar a aparência sóbria em telas pequenas: Publicações com controles mais compactos e categorias apenas quando houver registros (mantendo filtros vazios solicitados explicitamente por URL), rodapé com Navegação e Perfis lado a lado e seletor dos guias sem posição fixa em telas baixas. Os endereços compartilháveis, os alvos de toque, a navegação por teclado, a impressão e as opções de idioma/tema são preservados. Cores, famílias tipográficas e conteúdo acadêmico permanecem na direção existente.

## Organização dos temas de orientação

Os temas públicos foram consolidados em 12 propostas: seis de graduação (IC/TCC), três de mestrado e três de doutorado. No mestrado, modelagem de radar e quantificação da incerteza compartilham um cartão; diagnóstico e análise de sensibilidade compartilham outro, vinculado ao guia de Inferência. Regularização conserva foco próprio em viés, precisão e estabilidade. Os temas de graduação e doutorado mantêm seus eixos; a redação esclarece a progressão de exigência acadêmica. Os identificadores dos níveis e seus endereços compartilháveis permanecem estáveis.

A apresentação enfatiza rigor, reprodutibilidade e potencial de publicação, sem promessa de aceite. Descrições públicas permanecem no nível de motivação, área e formação recomendada, conforme SECURITY.md. Não foram incluídas novas linhas, fórmulas inéditas, hipóteses específicas ou planos experimentais.
