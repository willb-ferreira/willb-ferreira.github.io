# Curadoria dos temas recebidos — 2026-09

**Fonte primária:** quatro capturas enviadas pelo titular com sugestões pessoais de PIBIC, mestrado, doutorado e ideias exploratórias relacionadas ao contexto de trabalho com Moraga. Este documento distingue explicitamente o conteúdo originário das capturas das decisões editoriais e de viabilidade tomadas para divulgação pública. As capturas não incluem demonstrações nem a expressão referida como “Eq. 3.2”. Nenhuma proposta está apresentada como problema ainda aberto na literatura ou vaga com bolsa.

## Escopo público e organização

- **6 temas de iniciação científica:** pipeline Sentinel-1; séries temporais de uva e manga; bordas agrícolas por entropia; simulações de não circularidade em observações complexas; superfície de verossimilhança para modelos GGARMA; benchmarks de outliers por entropia. Mantiveram-se as ideias de origem, com observáveis, variáveis de avaliação e pré-requisitos mais específicos.
- **6 temas de mestrado:** consequências inferenciais de circularidade SAR; influência local sob perturbações; famílias distribucionais SAR ainda a especificar; estimação penalizada GGARMA; diagnósticos por entropia; ENL sob misturas e dependência espacial. Todas são questões propostas; as correções/teoremas dependem de demonstração.
- **5 temas de doutorado:** testes de circularidade com ferramentas geométricas; influência e curvatura em variedades estatísticas; distribuições matriciais PolSAR; regularização geométrica; MDPDE em modelos multiplicativos.
- **5 ideias autorais/colaborativas (fora da página de vagas):** covariáveis SAR para epidemiologia; modelos hierárquicos para fenômenos observáveis por SAR; Poisson com dependência e efeitos latentes; regressão espaço-temporal com componentes condicionais/latentes; pacote R com exame condicionado de INLA-within-MCMC. Não foi assumido acordo de colaboração formal nem atribuído projeto à outra pesquisadora.

## Ajustes de mérito e pontos a verificar

1. **Complex-valued circularity:** circularidade/propriedade de variáveis complexas requer a hipótese nula e o observável explícitos. Estudos de fase/propriedade não podem ser conduzidos apenas sobre imagens de intensidade sem acesso às observações complexas adequadas. A expressão “circularidade via geodésicas” foi substituída por testar uma hipótese de circularidade com quantidade geométrica a ser especificada.
2. **Geometria/influência:** curvatura normal de Cook, curvatura seccional de uma variedade e medidas globais de influência são objetos distintos. O título público evita tratá-los como equivalentes sem um teorema.
3. **Distribuições baseadas na Eq. 3.2:** a captura não traz a equação ou transformação. A versão pública evita numeração interna e não promete generalização válida sem suporte, constante de normalização e identificabilidade.
4. **GGARMA penalizado e MDPDE:** as propriedades assintóticas dependem de modelo, hipótese, esquema de dependência, penalidade/divergência e regularidade. O nome correto é *minimum density power divergence estimation* (MDPDE); a proposta não afirma já haver consistência ou robustez demonstradas para o modelo pretendido.
5. **ENL e misturas:** ENL pode perder interpretação usual quando componente homogêneo e mecanismo de mistura não estão especificados. A viabilidade do estimador deve ser demonstrada antes de prometer fórmula ou propriedades.
6. **Sensoriamento e epidemiologia:** informações SAR podem ser observáveis úteis em condições com nuvens, mas não medem diretamente a incidência de doenças. Uma aplicação exige validação de covariáveis e alinhamento espacial/temporal; inferências causais requerem pressupostos próprios.
7. **Poisson + ARMA espacial + efeito latente:** possível sobreposição de estruturas de dependência e falha de identificabilidade; começar em um submodelo, verificar se a família condicional induz distribuição conjunta coerente e explicitar a camada de observação.
8. **INLA dentro de MCMC:** há literatura para modelos que se tornam gaussianos latentes ao condicionar um pequeno conjunto de parâmetros. Isso NÃO valida automaticamente usar R-INLA para o modelo SAR/GGARMA proposto. Necessário verificar estrutura condicional e comparar métodos. Referência verificada: Gómez-Rubio, V. & Rue, H. (2018), *Markov chain Monte Carlo with the integrated nested Laplace approximation*, Statistics and Computing. DOI: https://doi.org/10.1007/s11222-017-9778-y. Veja também https://arxiv.org/abs/1701.07844 para a formulação.

## Informações a solicitar antes de promover propostas a projetos formais

- Termos exatos dos dois semestres de 2026 para cada uma das quatro disciplinas; ano conhecido, distribuição por semestre não informada.
- Datas de início/conclusão dos vínculos de orientação e consentimento de divulgação dos orientandos.
- Formulação matemática referente à “Eq. 3.2”, modelos de observação e parâmetros que deseja tornar públicos.
- Dados Sentinel-1 (SLC versus GRD), unidades e calibração, rótulos de parcelas para uva/manga e conjunto de dados epidemiológicos elegível.
- Qual(is) das ideias exploratórias já têm colaboradores e dados confirmados; até lá estão corretamente no **Research notebook**, sem nome de colaborador nem indicação de vaga.

**Manutenção:** toda proposta nova pode ser acrescentada a `topics` (com nível) ou `researchIdeas` (sem oferta de orientação), mantendo títulos e descrições PT/EN e evitando afirmar teoremas ou resultados não demonstrados.
