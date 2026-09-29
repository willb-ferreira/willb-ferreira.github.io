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
      pt: "Métodos estatísticos para dados complexos e problemas do mundo real.",
      en: "Statistical methods for complex data and real-world problems."
    },
    introduction: {
      pt: "Sou professor de Estatística na UFPE. Minha pesquisa abrange inferência estatística, modelagem espacial, séries temporais e processamento estatístico de imagens de radar, com ênfase em métodos matemáticos e computacionais.",
      en: "I am a Statistics professor at UFPE. My research spans statistical inference, spatial modeling, time series, and statistical processing of radar imagery, with an emphasis on mathematical and computational methods."
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
      title: { pt: "Modelagem estatística espacial", en: "Spatial statistical modeling" },
      summary: {
        pt: "Modelos condicionais para processos espaciais, estruturas de dependência e identificação de modelos ARMA em duas dimensões.",
        en: "Conditional models for spatial processes, dependence structures, and identification of two-dimensional ARMA models."
      },
      keywords: ["2D ARMA", { pt: "Dependência espacial", en: "Spatial dependence" }, { pt: "Estimação", en: "Estimation" }]
    },
    {
      id: "sar", number: "02", symbol: "◈",
      title: { pt: "Sensoriamento remoto e imagens SAR", en: "Remote sensing and SAR imagery" },
      summary: {
        pt: "Inferência para imagens de radar, caracterização do speckle, estimadores de ENL e distribuições para índices polarimétricos.",
        en: "Inference for radar imagery, speckle characterization, ENL estimation, and distributions for polarimetric indices."
      },
      keywords: ["SAR", "ENL", { pt: "Polarimetria", en: "Polarimetry" }]
    },
    {
      id: "theory", number: "03", symbol: "∑",
      title: { pt: "Inferência e teoria estatística", en: "Inference and statistical theory" },
      summary: {
        pt: "Propriedades de estimadores, informação de Fisher, diagnóstico de modelos e resultados assintóticos sob dependência.",
        en: "Estimator properties, Fisher information, model diagnostics, and asymptotic results under dependence."
      },
      keywords: [{ pt: "Inferência", en: "Inference" }, { pt: "Assintótica", en: "Asymptotics" }, { pt: "Diagnóstico", en: "Diagnostics" }]
    },
    {
      id: "computing", number: "04", symbol: "{R}",
      title: { pt: "Computação e pesquisa reproduzível", en: "Computing and reproducible research" },
      summary: {
        pt: "Simulações Monte Carlo, implementação de métodos em R e fluxos de trabalho verificáveis da teoria à aplicação.",
        en: "Monte Carlo simulation, R implementations, and verifiable workflows from theory to application."
      },
      keywords: ["R", "Monte Carlo", "Open science"]
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
  /* Only add students after obtaining consent for their public listing. */
  students: [],
  /* Add courses as { id, title:{pt,en}, institution, term, level, description:{pt,en}, materials:"" }. */
  courses: [
    { id: "probabilidade-2-2026", title: { pt: "Probabilidade 2", en: "Probability II" }, institution: "UFPE", term: "2026", level: "Undergraduate", description: { pt: "Disciplina de graduação ministrada em 2026.", en: "Undergraduate course taught in 2026." }, materials: "" },
    { id: "inferencia-atuariais-2026", title: { pt: "Inferência Estatística para Ciências Atuariais", en: "Statistical Inference for Actuarial Sciences" }, institution: "UFPE", term: "2026", level: "Undergraduate", description: { pt: "Disciplina de graduação ministrada em 2026.", en: "Undergraduate course taught in 2026." }, materials: "" },
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
