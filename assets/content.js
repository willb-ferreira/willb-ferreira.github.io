/*
 * EDIT THIS FILE TO MAINTAIN YOUR WEBSITE.
 * Keep PT/EN text in { pt: "...", en: "..." } objects.
 * Blank links and unpublished sections are automatically hidden.
 * Never publish students' information without their consent.
 */
window.PORTFOLIO = {
  profile: {
    name: "Willams Batista",
    monogram: "WB",
    role: { pt: "Professor Assistente de Estatística", en: "Assistant Professor of Statistics" },
    headline: {
      pt: "Inferência estatística, modelos espaciais e processamento de imagens.",
      en: "Statistical inference, spatial models, and image processing."
    },
    introduction: {
      pt: "Sou professor no Departamento de Estatística da UFPE. Pesquiso inferência estatística, modelos para dados dependentes e métodos estatísticos para imagens SAR e PolSAR. Trabalho com teoria, simulação e aplicações em sensoriamento remoto.",
      en: "I am a professor in the Department of Statistics at UFPE. My research covers statistical inference, models for dependent data, and statistical methods for SAR and PolSAR imagery, combining theory, simulation, and remote-sensing applications."
    },
    location: { pt: "Recife, Brasil", en: "Recife, Brazil" },
    affiliation: { pt: "Departamento de Estatística · Universidade Federal de Pernambuco (UFPE)", en: "Department of Statistics · Federal University of Pernambuco (UFPE)" },
    email: "willams.bfsilva@ufpe.br", /* Public institutional email confirmed by owner. */
    portrait: "assets/portrait.webp", /* Retrato fornecido e autorizado pelo titular. */
    cv: "", /* Reserved for an actual PDF CV. Lattes is linked below. */
    social: {
      orcid: "https://orcid.org/0000-0002-3680-6212", /* Public ORCID profile. */
      scholar: "https://scholar.google.com.br/citations?user=k5t98ZIAAAAJ&hl=pt-BR&oi=ao", /* Owner-provided public scholar link. */
      github: "https://github.com/willb-ferreira", /* Public code profile. */
      lattes: "http://lattes.cnpq.br/4598185947247904", /* CNPq Lattes profile. */
      linkedin: ""
    }
  },
  research: [
    {
      id: "spatial-models", number: "01", symbol: "∿",
      title: { pt: "Estatística espacial e espaço-temporal", en: "Spatial and spatio-temporal statistics" },
      summary: { pt: "Modelos para processos espaciais, dependência em malhas bidimensionais e inferência para dados espacialmente correlacionados.", en: "Models for spatial processes, dependence on two-dimensional lattices, and inference with spatially correlated data." },
      keywords: ["Spatial ARMA", {pt:"Dependência espacial",en:"Spatial dependence"}]
    },
    {
      id: "theory", number: "02", symbol: "∑",
      title: { pt: "Inferência estatística e teoria assintótica", en: "Statistical inference and asymptotic theory" },
      summary: { pt: "Estatística matemática, estimação paramétrica, informação de Fisher e propriedades de estimadores e testes.", en: "Mathematical statistics, parametric estimation, Fisher information, and the properties of estimators and tests." },
      keywords: [{pt:"Estatística matemática",en:"Mathematical statistics"}, {pt:"Assintótica",en:"Asymptotics"}]
    },
    {
      id: "sar", number: "03", symbol: "◈",
      title: { pt: "Processamento estatístico de imagens", en: "Statistical image processing" },
      summary: { pt: "Métodos estatísticos para imagens SAR e PolSAR: regressão, modelagem do speckle e distribuições para índices polarimétricos.", en: "Statistical methods for SAR and PolSAR imagery: regression, speckle modeling, and distributions for polarimetric indices." },
      keywords: ["SAR / PolSAR", {pt:"Sensoriamento remoto",en:"Remote sensing"}]
    },
    {
      id: "regression", number: "04", symbol: "β",
      title: { pt: "Regressão e equações de estimação generalizadas", en: "Regression and generalized estimating equations" },
      summary: { pt: "Modelos de regressão, inferência para respostas correlacionadas e equações de estimação generalizadas (GEE).", en: "Regression models, inference for correlated responses, and generalized estimating equations (GEE)." },
      keywords: ["GEE", {pt:"Regressão",en:"Regression"}]
    },
    {
      id: "time-series", number: "05", symbol: "t",
      title: { pt: "Séries temporais e processos estocásticos", en: "Time series and stochastic processes" },
      summary: { pt: "Modelos ARMA e suas extensões para processos não gaussianos, com aplicações em dados de amplitude e intensidade SAR.", en: "ARMA models and non-Gaussian extensions, including applications to SAR amplitude and intensity data." },
      keywords: ["ARMA", {pt:"Processos estocásticos",en:"Stochastic processes"}]
    },
    {
      id: "geometry", number: "06", symbol: "∇",
      title: { pt: "Geometria da informação", en: "Information geometry" },
      summary: { pt: "Geometria de famílias de distribuições, divergências e estruturas geométricas aplicadas a problemas de inferência.", en: "Geometry of distribution families, divergences, and geometric structures applied to inference problems." },
      keywords: [{pt:"Geometria estatística",en:"Statistical geometry"}, {pt:"Divergências",en:"Divergences"}]
    },
    {
      id: "computing", number: "07", symbol: "R",
      title: { pt: "Computação estatística", en: "Statistical computing" },
      summary: { pt: "Simulações Monte Carlo, implementação de métodos em R e validação numérica de resultados teóricos.", en: "Monte Carlo simulation, R implementations, and numerical validation of theoretical results." },
      keywords: ["R", "Monte Carlo"]
    }
  ],
  projects: [
    {
      id: "spatial-arma", area: "spatial-models", status: "ongoing", year: "2026",
      title: { pt: "Modelos ARMA espaciais condicionais", en: "Conditional spatial ARMA models" },
      description: {
        pt: "Modelagem de dependência bidimensional, construção condicional e propriedades inferenciais de processos espaciais.",
        en: "Two-dimensional dependence modeling, conditional construction, and inferential properties of spatial processes."
      },
      tags: ["2D ARMA", { pt: "Inferência", en: "Inference" }], url: ""
    },
    {
      id: "dprvi", area: "sar", status: "ongoing", year: "2026",
      title: { pt: "Distribuição estatística do DpRVI", en: "Statistical distribution of DpRVI" },
      description: {
        pt: "Estudo de distribuições e propriedades teóricas de um índice polarimétrico para aplicações em sensoriamento remoto.",
        en: "Distributional and theoretical study of a polarimetric index for remote-sensing applications."
      },
      tags: [{ pt: "Polarimetria", en: "Polarimetry" }, { pt: "Distribuições", en: "Distributions" }], url: ""
    },
    {
      id: "portmanteau", area: "theory", status: "ongoing", year: "2026",
      title: { pt: "Diagnóstico residual para modelos espaciais", en: "Residual diagnostics for spatial models" },
      description: {
        pt: "Desenvolvimento de ferramentas de diagnóstico e testes portmanteau para modelos ARMA espaciais condicionais.",
        en: "Development of diagnostic tools and portmanteau tests for conditional spatial ARMA models."
      },
      tags: ["Portmanteau", { pt: "Dependência", en: "Dependence" }], url: ""
    },
    {
      id: "enl", area: "sar", status: "ongoing", year: "2026",
      title: { pt: "Estimação de ENL sob correlação espacial", en: "ENL estimation under spatial correlation" },
      description: {
        pt: "Propriedades e desempenho de estimadores do número equivalente de looks em imagens SAR com dependência espacial.",
        en: "Properties and performance of equivalent-number-of-looks estimators in spatially dependent SAR images."
      },
      tags: ["ENL", { pt: "Imagens SAR", en: "SAR images" }], url: ""
    }
  ],
  /* Add VERIFIED bibliographic records here. See README.md for a complete example.
   * Example keys: id, title, authors, year, venue, type, doi, url, pdf, code, data,
   * bibtex, featured, tags.
   */
  publications: [
    {
      id: "igarss-2024-log-symmetric-anova",
      title: "Analysis of Variance under Log-Symmetric Family for SAR Images",
      authors: "Willams B. F. da Silva; Abraão D. C. Nascimento; Francisco J. A. Cysneiros",
      year: 2024,
      venue: "IGARSS 2024 — IEEE International Geoscience and Remote Sensing Symposium, Athens",
      type: "conference", doi: "", url: "", pdf: "", code: "", data: "",
      featured: false, tags: ["SAR", "ANOVA", "Log-symmetric"]
    }
  ],
  topics: [
    {
      id: "topic-spatial", area: "spatial-models", levels: ["masters", "phd"],
      title: { pt: "Modelos estatísticos para processos espaciais", en: "Statistical models for spatial processes" },
      description: {
        pt: "Identificação, estimação e diagnóstico de modelos condicionais para dados em malhas bidimensionais.",
        en: "Identification, estimation, and diagnostics of conditional models for data on two-dimensional grids."
      },
      requirements: { pt: "Probabilidade, inferência estatística e programação em R.", en: "Probability, statistical inference, and R programming." }
    },
    {
      id: "topic-polarimetry", area: "sar", levels: ["masters", "phd"],
      title: { pt: "Inferência para índices polarimétricos", en: "Inference for polarimetric indices" },
      description: {
        pt: "Distribuições, estimação e propriedades estatísticas de índices derivados de imagens SAR.",
        en: "Distributions, estimation, and statistical properties of indices derived from SAR imagery."
      },
      requirements: { pt: "Inferência, álgebra linear e interesse em sensoriamento remoto.", en: "Inference, linear algebra, and an interest in remote sensing." }
    },
    {
      id: "topic-enl", area: "sar", levels: ["undergraduate", "masters"],
      title: { pt: "Estimadores para imagens SAR", en: "Estimators for SAR imagery" },
      description: {
        pt: "Comparação de estimadores, simulação Monte Carlo e avaliação em imagens com diferentes níveis de dependência.",
        en: "Estimator comparisons, Monte Carlo simulation, and evaluation on images with different dependence levels." 
      },
      requirements: { pt: "Estatística básica e disposição para aprender R.", en: "Basic statistics and willingness to learn R." }
    },
    {
      id: "topic-r", area: "computing", levels: ["undergraduate", "masters"],
      title: { pt: "Software estatístico e experimentos reproduzíveis", en: "Statistical software and reproducible experiments" },
      description: {
        pt: "Implementação, validação numérica, testes e documentação de métodos estatísticos em R.",
        en: "Implementation, numerical validation, tests, and documentation of statistical methods in R." 
      },
      requirements: { pt: "Interesse em programação; conhecimento prévio de R é desejável.", en: "Interest in programming; previous R experience is desirable." }
    }
  ],
  /* Public names and academic roles only. Confirm consent for public listing with each student. */
  students: [
    { id: "pedro-estevao", name: "Pedro Estevão Costa Viana de Araújo", level: { pt: "Iniciação científica", en: "Undergraduate research" }, role: { pt: "Orientação", en: "Supervision" }, project: "", url: "" },
    { id: "muhammed-ismail", name: "Muhammed Ismail", level: { pt: "Doutorado", en: "Ph.D." }, role: { pt: "Coorientação", en: "Co-supervision" }, project: "", url: "" }
  ],
  /* Add courses as { id, title:{pt,en}, institution, term, level, description:{pt,en}, materials:"" }. */
  courses: [
    { id: "probabilidade-2-2026", title: { pt: "Probabilidade 2", en: "Probability II" }, institution: "UFPE", term: "2026", level: "Undergraduate", description: { pt: "Disciplina de graduação ministrada em 2026.", en: "Undergraduate course taught in 2026." }, materials: "" },
    { id: "inferencia-atuariais-2026", title: { pt: "Inferência Estatística para Ciências Atuariais", en: "Statistical Inference for Actuarial Sciences" }, institution: "UFPE", term: "2026", level: "Undergraduate", description: { pt: "Disciplina de graduação ministrada em 2026.", en: "Undergraduate course taught in 2026." }, materials: "" },
    { id: "probabilidade-2-atuariais", title: { pt: "Probabilidade 2 para Ciências Atuariais", en: "Probability II for Actuarial Science" }, institution: "UFPE", term: "", level: "Undergraduate", description: { pt: "Disciplina de probabilidade para a graduação em Ciências Atuariais.", en: "Probability course for the undergraduate degree in Actuarial Science." }, materials: "" },
    { id: "analise-multivariada-2026", title: { pt: "Análise Multivariada", en: "Multivariate Analysis" }, institution: "UFPE", term: "2026", level: "Undergraduate", description: { pt: "Disciplina de graduação informada no currículo acadêmico.", en: "Undergraduate course listed in the academic CV." }, materials: "" }
  ],
  /* Add repositories as { id, name, description:{pt,en}, language, url, documentation, tags:[] }. */
  software: [],
  /* Add dated news as { id, date:"2026-09-28", title:{pt,en}, description:{pt,en}, url:"" }. */
  news: [],
  experience: [
    { year: { pt: "2026–atual", en: "2026–present" }, title: { pt: "Professor Assistente de Estatística", en: "Assistant Professor of Statistics" }, institution: "Departamento de Estatística · UFPE" },
    { year: "2026", title: { pt: "Doutorado em Estatística", en: "Ph.D. in Statistics" }, institution: "Universidade Federal de Pernambuco" },
    { year: "2022–2023", title: { pt: "Doutorado sanduíche", en: "Visiting Ph.D. researcher" }, institution: "Indian Institute of Technology Bombay · CNPq" },
    { year: "2022", title: { pt: "Mestrado em Estatística", en: "M.Sc. in Statistics" }, institution: "Universidade Federal de Pernambuco" },
    { year: "2019", title: { pt: "Bacharelado em Estatística", en: "B.Sc. in Statistics" }, institution: "Universidade Federal de Pernambuco" }
  ]
};
