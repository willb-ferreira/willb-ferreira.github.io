/* Concise public research library. The detailed 2026-09-29 Topic 1 audit is retained
 * in docs/spatial-topic-1-audit.md and assets/spatial-guide.js, but not loaded on
 * public pages. No personal publication or student record is changed here. */
(() => {
  "use strict";
  const D = window.PORTFOLIO;
  if (!D) return;
  const b = (en, pt) => ({en, pt});
  const topic = (D.research || []).find(r => r.id === "spatial-models");
  if (!topic) return;
  topic.title = b("Time Series and Spatial Statistics", "Séries temporais e estatística espacial");
  topic.summary = b(
    "Statistical modeling and inference for dependent data, including time series, conditional spatial regression, two-dimensional ARMA models, random fields, geostatistics, and spatio-temporal processes.",
    "Modelagem e inferência estatística para dados dependentes, incluindo séries temporais, regressão espacial condicional, modelos ARMA bidimensionais, campos aleatórios, geoestatística e processos espaço-temporais."
  );
  topic.keywords = ["ARMA", b("Spatial dependence", "Dependência espacial"), b("Statistical inference", "Inferência estatística")];
  D.research = D.research.filter(r => r.id !== "time-series")
    .map((r, index) => ({...r, number: String(index + 1).padStart(2, "0")}));

  const reference = (id, authors, title, year, url, en, pt, kind = "foundation") => ({
    id, authors, title, year, url, kind, note: b(en, pt)
  });
  const merged = {
    id: "spatial-models",
    question: b(
      "How does dependence change when observations are indexed by time, space or both?",
      "O que muda na dependência quando as observações são indexadas no tempo, no espaço ou em ambos?"
    ),
    entry: b(
      "Time series and spatial statistics share probabilistic tools for dependence, but temporal ordering, spatial neighbourhoods and space–time indexing require different modelling assumptions. The three short routes below introduce these connections.",
      "Séries temporais e estatística espacial compartilham ferramentas probabilísticas para estudar a dependência, mas ordenação temporal, vizinhanças espaciais e indexação espaço-temporal exigem hipóteses de modelagem diferentes. Os três percursos breves a seguir apresentam essas conexões."
    ),
    background: b(
      "Probability, regression and introductory mathematical statistics; linear algebra for covariance and conditional models.",
      "Probabilidade, regressão e estatística matemática introdutória; álgebra linear para covariância e modelos condicionais."
    ),
    shared: b(
      "Start with random variables and fields, stationarity, covariance, conditional distributions and inference under dependence. These ideas are shared; their existence, ordering and asymptotic assumptions are not interchangeable.",
      "Comece por variáveis e campos aleatórios, estacionariedade, covariância, distribuições condicionais e inferência sob dependência. As ideias são comuns, mas as hipóteses de existência, ordenação e assintótica não são intercambiáveis."
    ),
    tracks: [
      {
        id: "temporal",
        title: b("Time series", "Séries temporais"),
        description: b(
          "ARMA, temporal dependence, innovations, forecasting and diagnostics, including non-Gaussian extensions. Time provides a natural chronological ordering.",
          "ARMA, dependência temporal, inovações, previsão e diagnóstico, incluindo extensões não gaussianas. O tempo fornece uma ordenação cronológica natural."
        ),
        refs: ["brockwell-davis"]
      },
      {
        id: "spatial",
        title: b("Spatial and spatio-temporal statistics", "Estatística espacial e espaço-temporal"),
        description: b(
          "Random fields, geostatistics, covariance and kriging, space–time models and Bayesian hierarchies. Lattice observations, point-referenced data and event locations have different sampling structures.",
          "Campos aleatórios, geoestatística, covariância e krigagem, modelos espaço-temporais e hierarquias bayesianas. Malhas, dados georreferenciados e localizações de eventos têm estruturas amostrais distintas."
        ),
        refs: ["cressie", "diggle-ribeiro", "rue-held"]
      },
      {
        id: "bridge",
        title: b("The ARMA bridge: from time to two-dimensional lattices", "A ponte ARMA: do tempo às malhas bidimensionais"),
        description: b(
          "My methodological research connects conditional regression with two-dimensional spatial ARMA dependence. Moving from temporal recursion to spatial neighbourhoods requires explicit ordering, compatible conditional laws and model-specific inference.",
          "Minha pesquisa metodológica conecta regressão condicional e dependência ARMA espacial bidimensional. Passar da recursão temporal às vizinhanças espaciais exige ordenação explícita, leis condicionais compatíveis e inferência específica do modelo."
        ),
        refs: ["besag", "tjostheim"]
      }
    ],
    references: [
      reference(
        "brockwell-davis", "Peter J. Brockwell; Richard A. Davis", "Introduction to Time Series and Forecasting, 3rd ed.", 2016,
        "https://doi.org/10.1007/978-3-319-29854-2",
        "An accessible route into temporal dependence, ARMA and forecasting.",
        "Entrada acessível para dependência temporal, ARMA e previsão.", "entry"
      ),
      reference(
        "cressie", "Noel A. C. Cressie", "Statistics for Spatial Data", 1993,
        "https://doi.org/10.1002/9781119115151",
        "A common foundation for geostatistics, lattice models and spatial prediction.",
        "Base comum para geoestatística, modelos em malhas e predição espacial."
      ),
      reference(
        "besag", "Julian Besag", "Spatial Interaction and the Statistical Analysis of Lattice Systems", 1974,
        "https://doi.org/10.1111/j.2517-6161.1974.tb00999.x",
        "An original source on lattice interactions and conditional-model compatibility.",
        "Fonte original sobre interação em malhas e compatibilidade de modelos condicionais.", "seminal"
      ),
      reference(
        "tjostheim", "Dag Tjøstheim", "Statistical Spatial Series Modelling", 1978,
        "https://doi.org/10.2307/1426722",
        "A specialized bridge to unilateral spatial series and multidimensional ARMA structure.",
        "Ponte especializada para séries espaciais unilaterais e estruturas ARMA multidimensionais.", "seminal"
      ),
      reference(
        "diggle-ribeiro", "Peter J. Diggle; Paulo J. Ribeiro Jr.", "Model-based Geostatistics", 2007,
        "https://doi.org/10.1007/978-0-387-48536-2",
        "Model-based spatial inference and prediction with geostatistical data.",
        "Inferência e predição espaciais baseadas em modelos para dados geoestatísticos.", "next"
      ),
      reference(
        "rue-held", "Håvard Rue; Leonhard Held", "Gaussian Markov Random Fields: Theory and Applications", 2005,
        "https://www.routledge.com/Gaussian-Markov-Random-Fields-Theory-and-Applications/Rue-Held/p/book/9781584884323",
        "Conditional independence, sparse precision and a route to Bayesian spatial modelling.",
        "Independência condicional, precisão esparsa e entrada para modelagem espacial bayesiana.", "next"
      )
    ]
  };
  // Connect dependency modelling to adjacent inferential and applied guides.
  // Statistical dependence is not in itself a causal identification assumption.
  merged.relatedGuides = [
    {target:"theory",label:b(
      "Statistical Inference: estimation, uncertainty and asymptotics under dependent sampling",
      "Inferência Estatística: estimação, incerteza e assintótica sob amostragem dependente")},
    {target:"sar",label:b(
      "Statistical Image Processing: spatial dependence, SAR speckle and pixel-based inference",
      "Processamento Estatístico de Imagens: dependência espacial, speckle SAR e inferência por pixels")},
    {target:"regression",label:b(
      "Regression and Estimating Equations: marginal dependence, spatial random effects and conditional models",
      "Regressão e Equações de Estimação: dependência marginal, efeitos espaciais aleatórios e modelos condicionais")},
    {target:"causal",label:b(
      "Causal Inference: environmental time series and spatial dependence require separate identification assumptions",
      "Inferência Causal: séries ambientais e dependência espacial exigem hipóteses próprias de identificação")}
  ];
  D.readingGuides = D.readingGuides
    .filter(g => g.id !== "time-series")
    .map(g => g.id === "spatial-models" ? merged : g);
  D.researchLibraryPolicy = b(
    "These short guides introduce research areas and selected publications to study; they are not exhaustive literature reviews or offers of supervision.",
    "Estes guias curtos apresentam áreas de pesquisa e leituras selecionadas; não são revisões exaustivas da literatura nem ofertas de orientação."
  );
})();
