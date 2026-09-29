# Tópico 1 — Auditoria científica e reconstrução editorial

Data: 29 de setembro de 2026. Branch: `audit-spatial-guide-topic-1-20260929`. Pull request de rascunho: https://github.com/willb-ferreira/willb-ferreira.github.io/pull/4

## Delimitação e inspeção da versão inicial

O objeto auditado é exclusivamente `reading.html#spatial-models`, cuja fonte original fica em `assets/content.js` (três entradas) e cuja extensão de cinco entradas fica em `assets/research-library.js`. A versão-base contém sete áreas e 58 referências distribuídas pela biblioteca; os outros seis guias, perfis, publicações e dados acadêmicos não são alterados.

**Diagnóstico matemático:** o material anterior nomeava corretamente malhas, geoestatística, campos gaussianos, compatibilidade condicional e regimes assintóticos. Contudo, faltavam a distinção construtiva entre ARMA espacial unilateral, regressão com erros espaciais e modelos CAR bilaterais; referências originais específicas dos operadores ARMA bidimensionais; condições de normalização de famílias condicionais não gaussianas; diferença entre Fisher e Godambe; sequência independente de krigagem a hierarquia, MCMC, INLA e SPDE. A apresentação anterior oferecia mais títulos que problemas matemáticos progressivos e não dava peso proporcional à primeira vertente do titular.

**Reorganização executada:** quatro módulos de fundamentos comuns, cinco módulos na Vertente A, cinco módulos na Vertente B, comparação estruturada em seis dimensões, percursos compartilhados e especializados nos três níveis de formação e bibliografia com quatro obras de entrada seguidas por catálogo expansível. Os capítulos e as notas das referências são completos em inglês e português. O catálogo é separado da produção científica pessoal.

## Auditoria matemática: distinções verificadas editorialmente

1. **Existência e compatibilidade:** em malha finita, condicionais gaussianas completas compatíveis correspondem a uma precisão simétrica e positiva definida quando o campo é próprio. A simetria aplica-se à precisão, considerando as variâncias condicionais; restrições não gaussianas de normalização dependem do suporte. Condicionais formalmente plausíveis ou uma implementação de Gibbs não são prova de distribuição conjunta própria. Extensões infinitas exigem consistência adicional. Bibliografia nuclear: Besag (1974), Dreassi–Rigo (2017), Rue–Held (2005).
2. **ARMA em duas dimensões:** a escolha de cone passado, suporte dos operadores de deslocamento e condições de contorno são parte da definição unilateral. Não é válido importar automaticamente ordem temporal total ou teste unidimensional de raízes de polinômio. Para dependência bilateral, a construção conjunta/espectral ou por matriz de precisão deve ser justificada independentemente. Bibliografia: Whittle (1954), Tjøstheim (1978; 1981), Basu–Reinsel (1993).
3. **Regressão e classes probabilísticas:** covariáveis podem entrar em defasagens simultâneas da resposta, erros correlacionados, condicionais da resposta ou preditores com campos latentes. Esses mecanismos não geram verossimilhanças equivalentes por definição. Uma observação Gamma/lognormal condicional em campo gaussiano latente é construção publicada, mas não demonstra automaticamente validade de qualquer ARMA não gaussiano para respostas observadas. Bibliografia: Anselin (1988), Basu–Reinsel (1994), Diggle–Tawn–Moyeed (1998), Bardos et al. (2015).
4. **Inferência:** informação de Fisher corresponde à verossimilhança plena sob suas hipóteses; pseudoverossimilhança e verossimilhança composta exigem identificação do escore-alvo e a matriz de Godambe, com variância que incorpora dependência. Consistência, normalidade e estatísticas de diagnóstico dependem do regime assintótico e não decorrem do rótulo ARMA. Bibliografia: Guyon (1982), Mardia–Marshall (1984), Besag (1975), Varin–Reid–Firth (2011).
5. **Campos e predição:** a covariância deve ser positiva definida e o semivariograma coerente com a estacionariedade assumida. Krigagem condicionada em parâmetros ajustados pode omitir incerteza de estimação; efeitos de domínio fixo/infill diferem dos de domínio crescente. Bibliografia: Cressie (1993), Diggle–Ribeiro (2007), Stein (1999).
6. **Bayes e computação:** um GMRF próprio precisa de precisão positiva definida; priors intrínsecas exigem restrições/argumento de propriedade posterior. INLA aproxima marginais de classes suportadas de modelos gaussianos latentes, e SPDE fornece representações/aproximações para campos apropriados; nenhum é aplicável automaticamente a ARMA espacial condicional não gaussiano. Verificar erro numérico, prior e convergência MCMC. Bibliografia: Besag–Green (1993), Gelfand–Smith (1990), Rue–Martino–Chopin (2009), Lindgren–Rue–Lindström (2011).

**Limite do procedimento:** esta auditoria identifica distinções matemáticas estabelecidas e verifica descrições com páginas de editoras e registros bibliográficos. Não afirma que foram reproduzidas todas as provas dos artigos originais, nem que foi demonstrado um teorema específico de algum manuscrito privado. Nada do histórico removido do GitHub foi consultado.

## Alterações bibliográficas

- Mantidas, reorganizadas e recontextualizadas: **8** referências da versão inicial (Cressie; Besag; Diggle–Ribeiro; Anselin; Rue–Held; Banerjee–Carlin–Gelfand; Diggle sobre processos pontuais; Cressie–Wikle).
- Acrescentadas: **23** referências, incluindo fontes originais de modelagem espacial unilateral, regressão e construção condicional, diagnóstico/inferência espacial e MCMC espacial.
- Excluídas: **nenhuma obra verificada**. Os oito registros anteriores permanecem, agora sem listagem duplicada entre os eixos.
- Corrigidas: URLs diretas de Whittle (1954) e Guyon (1982) substituídas por resolutores DOI verificados; explicações excessivamente genéricas de “por que ler” substituídas por contribuição e pressupostos específicos de cada obra. Identificadores não confirmados foram evitados.

## Registro bibliográfico por eixo

`MANTIDA` significa obra presente na versão atual, agora relocalizada; `ACRESCENTADA` é uma obra nova neste tópico. `Catálogo`, `resumo/índice` ou `página HTML` não significam leitura do texto integral. Os links DOI apontam para a obra citada, não para direito de acesso ao PDF.

### Fundamentos compartilhados

| Situação | Obra, edição ou artigo | Identificador | Verificação executada |
|---|---|---|---|
| MANTIDA | Noel A. C. Cressie (1993). *Statistics for Spatial Data*. Wiley, revised edition; print ISBN 9780471002550; online ISBN 9781119115151 | [10.1002/9781119115151](https://onlinelibrary.wiley.com/doi/book/10.1002/9781119115151) | publisher catalogue |
| MANTIDA | Julian Besag (1974). *Spatial Interaction and the Statistical Analysis of Lattice Systems*. Journal of the Royal Statistical Society, Series B, 36(2), 192–225 | [10.1111/j.2517-6161.1974.tb00999.x](https://rss.onlinelibrary.wiley.com/doi/abs/10.1111/j.2517-6161.1974.tb00999.x) | publisher abstract |
| ACRESCENTADA | Peter Whittle (1954). *On Stationary Processes in the Plane*. Biometrika, 41(3–4), 434–449 | [10.1093/biomet/41.3-4.434](https://doi.org/10.1093/biomet/41.3-4.434) | publisher index |
| ACRESCENTADA | Xavier Guyon (1982). *Parameter Estimation for a Stationary Process on a d-Dimensional Lattice*. Biometrika, 69(1), 95–105 | [10.1093/biomet/69.1.95](https://doi.org/10.1093/biomet/69.1.95) | publisher abstract |

### Vertente A — regressão espacial e modelos condicionais

| Situação | Obra, edição ou artigo | Identificador | Verificação executada |
|---|---|---|---|
| ACRESCENTADA | Dag Tjøstheim (1978). *Statistical Spatial Series Modelling*. Advances in Applied Probability, 10(1), 130–154 | [10.2307/1426722](https://www.cambridge.org/core/journals/advances-in-applied-probability/article/statistical-spatial-series-modelling/7607D530ABF4E35D9BF8D63641B359B5) | publisher abstract |
| ACRESCENTADA | Dag Tjøstheim (1981). *Autoregressive Modeling and Spectral Analysis of Array Data in the Plane*. IEEE Transactions on Geoscience and Remote Sensing, GE-19(1), 15–24 | [10.1109/TGRS.1981.350323](https://doi.org/10.1109/TGRS.1981.350323) | bibliographic metadata |
| ACRESCENTADA | Sabyasachi Basu; Gregory C. Reinsel (1993). *Properties of the Spatial Unilateral First-Order ARMA Model*. Advances in Applied Probability, 25(3), 631–648 | [10.2307/1427527](https://www.cambridge.org/core/journals/advances-in-applied-probability/article/properties-of-the-spatial-unilateral-firstorder-arma-model/CC5943514BB8DBA22BA286A015CE82D6) | publisher abstract |
| ACRESCENTADA | Sabyasachi Basu; Gregory C. Reinsel (1994). *Regression Models with Spatially Correlated Errors*. Journal of the American Statistical Association, 89(425), 88–99 | [10.2307/2291204](https://www.jstor.org/stable/2291204) | publisher toc and catalogue |
| MANTIDA | Luc Anselin (1988). *Spatial Econometrics: Methods and Models*. Springer Dordrecht, 1st ed.; hardcover ISBN 9789024737352 | [10.1007/978-94-015-7799-1](https://link.springer.com/book/10.1007/978-94-015-7799-1) | publisher catalogue |
| ACRESCENTADA | J. Keith Ord (1975). *Estimation Methods for Models of Spatial Interaction*. Journal of the American Statistical Association, 70(349), 120–126 | [10.1080/01621459.1975.10480272](https://www.tandfonline.com/doi/abs/10.1080/01621459.1975.10480272) | publisher abstract |
| ACRESCENTADA | Julian Besag; P. A. P. Moran (1975). *On the Estimation and Testing of Spatial Interaction in Gaussian Lattice Processes*. Biometrika, 62(3), 555–562 | [10.1093/biomet/62.3.555](https://academic.oup.com/biomet/article/62/3/555/256890) | publisher abstract |
| ACRESCENTADA | Kanti V. Mardia; R. J. Marshall (1984). *Maximum Likelihood Estimation of Models for Residual Covariance in Spatial Regression*. Biometrika, 71(1), 135–146 | [10.1093/biomet/71.1.135](https://academic.oup.com/biomet/article/71/1/135/349384) | publisher abstract |
| ACRESCENTADA | Emanuela Dreassi; Pietro Rigo (2017). *A Note on Compatibility of Conditional Autoregressive Models*. Statistics & Probability Letters, 125, 9–16 | [10.1016/j.spl.2017.01.008](https://www.sciencedirect.com/science/article/abs/pii/S0167715217300317) | publisher abstract |
| ACRESCENTADA | David C. Bardos; Gurutzeta Guillera-Arroita; Brendan A. Wintle (2015). *Valid Auto-models for Spatially Autocorrelated Occupancy and Abundance Data*. Methods in Ecology and Evolution, 6(10), 1137–1149 | [10.1111/2041-210X.12402](https://besjournals.onlinelibrary.wiley.com/doi/10.1111/2041-210X.12402) | publisher fulltext page |
| ACRESCENTADA | Cristiano Varin; Nancy Reid; David Firth (2011). *An Overview of Composite Likelihood Methods*. Statistica Sinica, 21(1), 5–42 | [ISSN 1017-0405](https://wrap.warwick.ac.uk/41190/) | institutional metadata |
| ACRESCENTADA | Peter J. Diggle; Jonathan A. Tawn; R. A. Moyeed (1998). *Model-based Geostatistics*. Journal of the Royal Statistical Society, Series C, 47(3), 299–350 | [10.1111/1467-9876.00113](https://rss.onlinelibrary.wiley.com/doi/10.1111/1467-9876.00113) | publisher abstract |
| ACRESCENTADA | Julian Besag (1975). *Statistical Analysis of Non-Lattice Data*. Journal of the Royal Statistical Society, Series D (The Statistician), 24(3), 179–195 | [10.2307/2987782](https://doi.org/10.2307/2987782) | publisher abstract |

### Vertente B — geoestatística e modelos hierárquicos

| Situação | Obra, edição ou artigo | Identificador | Verificação executada |
|---|---|---|---|
| MANTIDA | Peter J. Diggle; Paulo J. Ribeiro Jr. (2007). *Model-based Geostatistics*. Springer Series in Statistics, 1st ed.; hardcover ISBN 9780387329079 | [10.1007/978-0-387-48536-2](https://link.springer.com/book/10.1007/978-0-387-48536-2) | publisher catalogue |
| ACRESCENTADA | Michael L. Stein (1999). *Interpolation of Spatial Data: Some Theory for Kriging*. Springer Series in Statistics; hardcover ISBN 9780387986296 | [10.1007/978-1-4612-1494-6](https://link.springer.com/book/10.1007/978-1-4612-1494-6) | publisher catalogue |
| MANTIDA | Håvard Rue; Leonhard Held (2005). *Gaussian Markov Random Fields: Theory and Applications*. Chapman & Hall/CRC; print ISBN 9781584884323 | [ISBN 9781584884323](https://www.routledge.com/Gaussian-Markov-Random-Fields-Theory-and-Applications/Rue-Held/p/book/9781584884323) | publisher catalogue |
| MANTIDA | Sudipto Banerjee; Bradley P. Carlin; Alan E. Gelfand (2014). *Hierarchical Modeling and Analysis for Spatial Data, 2nd ed.*. Chapman & Hall/CRC; print ISBN 9781439819173 | [ISBN 9781439819173](https://books.google.com/books/about/Hierarchical_Modeling_and_Analysis_for_S.html?id=zNLhAwAAQBAJ) | bibliographic catalogue |
| MANTIDA | Noel Cressie; Christopher K. Wikle (2011). *Statistics for Spatio-Temporal Data*. Wiley; print ISBN 9780471692744 | [ISBN 9780471692744](https://books.google.com/books/about/Statistics_for_Spatio_Temporal_Data.html?id=-kOC6D0DiNYC) | bibliographic catalogue |
| ACRESCENTADA | Tilmann Gneiting (2002). *Nonseparable, Stationary Covariance Functions for Space–Time Data*. Journal of the American Statistical Association, 97(458), 590–600 | [10.1198/016214502760047113](https://www.tandfonline.com/doi/abs/10.1198/016214502760047113) | publisher abstract |
| ACRESCENTADA | Håvard Rue; Sara Martino; Nicolas Chopin (2009). *Approximate Bayesian Inference for Latent Gaussian Models by Using Integrated Nested Laplace Approximations*. Journal of the Royal Statistical Society, Series B, 71(2), 319–392 | [10.1111/j.1467-9868.2008.00700.x](https://rss.onlinelibrary.wiley.com/doi/10.1111/j.1467-9868.2008.00700.x) | publisher abstract |
| ACRESCENTADA | Finn Lindgren; Håvard Rue; Johan Lindström (2011). *An Explicit Link Between Gaussian Fields and Gaussian Markov Random Fields: The Stochastic Partial Differential Equation Approach*. Journal of the Royal Statistical Society, Series B, 73(4), 423–498 | [10.1111/j.1467-9868.2011.00777.x](https://rss.onlinelibrary.wiley.com/doi/abs/10.1111/j.1467-9868.2011.00777.x) | publisher abstract |
| ACRESCENTADA | Brian J. Reich; James S. Hodges; Vesna Zadnik (2006). *Effects of Residual Smoothing on the Posterior of the Fixed Effects in Disease-Mapping Models*. Biometrics, 62(4), 1197–1206 | [10.1111/j.1541-0420.2006.00617.x](https://academic.oup.com/biometrics/article-abstract/62/4/1197/7324934) | publisher abstract |
| ACRESCENTADA | Julian Besag; Jeremy York; Annie Mollié (1991). *Bayesian Image Restoration, with Two Applications in Spatial Statistics*. Annals of the Institute of Statistical Mathematics, 43(1), 1–20 | [10.1007/BF00116466](https://link.springer.com/article/10.1007/BF00116466) | publisher and institutional metadata |
| MANTIDA | Peter J. Diggle (2014). *Statistical Analysis of Spatial and Spatio-Temporal Point Patterns, 3rd ed.*. Chapman & Hall/CRC; print ISBN 9781466560239 | [ISBN 9781466560239](https://www.routledge.com/Statistical-Analysis-of-Spatial-and-Spatio-Temporal-Point-Patterns/author/p/book/9781466560239) | publisher catalogue |
| ACRESCENTADA | Jesper Møller; Rasmus Plenge Waagepetersen (2003). *Statistical Inference and Simulation for Spatial Point Processes*. Chapman & Hall/CRC, Monographs on Statistics and Applied Probability 100; ISBN 1584882654 | [ISBN 1584882654](https://vbn.aau.dk/en/publications/statistical-inference-and-simulation-for-spatial-point-processes/) | institutional catalogue |
| ACRESCENTADA | Alan E. Gelfand; Adrian F. M. Smith (1990). *Sampling-Based Approaches to Calculating Marginal Densities*. Journal of the American Statistical Association, 85(410), 398–409 | [10.1080/01621459.1990.10476213](https://doi.org/10.1080/01621459.1990.10476213) | publisher abstract |
| ACRESCENTADA | Julian Besag; Peter J. Green (1993). *Spatial Statistics and Bayesian Computation*. Journal of the Royal Statistical Society, Series B, 55(1), 25–37 | [10.1111/j.2517-6161.1993.tb01467.x](https://doi.org/10.1111/j.2517-6161.1993.tb01467.x) | publisher abstract |


## Níveis de confirmação e pendências científicas

- `publisher-abstract` / `publisher-index`: título, autoria, ano, periódico, páginas e interpretação restrita ao resumo ou índice primário verificados.
- `publisher-catalogue`: metadados de livro e edição conferidos em editora; DOI/ISBN quando disponíveis.
- `bibliographic-metadata` / `bibliographic-catalogue` / `institutional-metadata`: conferência em catálogo ou repositório; texto integral não inspecionado.
- `publisher-fulltext-page`: página HTML do editor disponibiliza texto; **não** significa que toda a prova matemática foi independentemente reproduzida.

**Pendente antes de classificar a auditoria como revisão integral dos originais:** leitura exaustiva das demonstrações completas de Tjøstheim (1978), Basu–Reinsel (1993), Dreassi–Rigo (2017), Stein (1999) e dos detalhes de inferência de INLA/SPDE, quando o acesso ao texto integral permitir. O guia não reivindica teoremas além dos tópicos e pressupostos que as fontes publicadas identificam. É importante não apresentar a etapa bibliográfica como uma replicação integral de provas.

## Escopo técnico e segurança

`assets/spatial-guide.js` altera somente o objeto `D.readingGuides['spatial-models']`. `assets/app.js` adota renderização específica apenas se `g.id === 'spatial-models'`; o CSS adicionado é prefixado por `.spatial-` ou `.spatial-guide`. `reading.html`, `scripts/prerender.py` e `scripts/test_site.py` carregam a extensão após a biblioteca atual. Outras áreas e publicação automática não receberam nova redação. Esta branch não está publicada em GitHub Pages.

**Checkpoint de testes:** executar/reconferir o workflow `Validate research library` no PR para regeneração de páginas, verificação dos 31 registros no Tópico 1, teste de idioma inglês/português, ausência de overflow em desktop e mobile e ausência de regressão nos outros seis tópicos. O histórico anterior de testes da biblioteca de oito áreas não comprova esta alteração. Não efetuar merge caso a verificação atual falhe.
