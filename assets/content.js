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
  /* Curated reading guides: source URLs verified against publisher or official bibliographic records. */
  readingGuides: [
  {
    "id": "spatial-models",
    "question": {
      "en": "How can spatial dependence be represented without imposing an incoherent joint model?",
      "pt": "Como representar dependência espacial sem impor um modelo conjunto incoerente?"
    },
    "entry": {
      "en": "Begin with the distinction between geostatistical data, lattice data, and point processes. For conditional spatial ARMA models, study how local specifications relate to valid joint distributions and what dependence implies for estimation.",
      "pt": "Comece distinguindo dados geoestatísticos, dados em malhas e processos pontuais. Para modelos ARMA espaciais condicionais, estude como especificações locais se relacionam a distribuições conjuntas válidas e o que a dependência implica para a estimação."
    },
    "background": {
      "en": "Probability, linear algebra, random vectors; useful: likelihood and basic time-series models.",
      "pt": "Probabilidade, álgebra linear e vetores aleatórios; úteis: verossimilhança e modelos básicos de séries temporais."
    },
    "path": [
      {
        "en": "Start with Cressie to identify the type of spatial data and the covariance questions.",
        "pt": "Comece por Cressie para identificar o tipo de dado espacial e as questões de covariância."
      },
      {
        "en": "Read Besag carefully when moving to conditional models on lattices.",
        "pt": "Leia Besag com atenção ao passar para modelos condicionais em malhas."
      },
      {
        "en": "Use Diggle and Ribeiro to connect assumptions, inference and spatial prediction.",
        "pt": "Use Diggle e Ribeiro para conectar hipóteses, inferência e predição espacial."
      }
    ],
    "references": [
      {
        "authors": "Noel A. C. Cressie",
        "title": "Statistics for Spatial Data",
        "year": 1993,
        "kind": "foundation",
        "url": "https://doi.org/10.1002/9781119115151",
        "note": {
          "en": "A broad foundation: covariance, kriging, lattice models and point patterns.",
          "pt": "Base abrangente: covariância, krigagem, modelos em malha e padrões pontuais."
        }
      },
      {
        "authors": "Julian Besag",
        "title": "Spatial Interaction and the Statistical Analysis of Lattice Systems",
        "year": 1974,
        "kind": "seminal",
        "url": "https://doi.org/10.1111/j.2517-6161.1974.tb00999.x",
        "note": {
          "en": "A foundational treatment of conditional specifications and spatial interactions on lattices.",
          "pt": "Tratamento fundamental de especificações condicionais e interações espaciais em malhas."
        }
      },
      {
        "authors": "Peter J. Diggle; Paulo J. Ribeiro Jr.",
        "title": "Model-based Geostatistics",
        "year": 2007,
        "kind": "next",
        "url": "https://doi.org/10.1007/978-0-387-48536-2",
        "note": {
          "en": "A model-based route from spatial data to inference and prediction.",
          "pt": "Percurso baseado em modelos, dos dados espaciais à inferência e à predição."
        }
      }
    ]
  },
  {
    "id": "theory",
    "question": {
      "en": "What assumptions make an estimator or a test reliable, especially under dependence?",
      "pt": "Quais hipóteses tornam um estimador ou teste confiável, especialmente sob dependência?"
    },
    "entry": {
      "en": "This area asks how procedures behave beyond a particular dataset: identifiability, bias, consistency, limiting distributions, efficiency, and information. The core habit is to state assumptions before interpreting an asymptotic result.",
      "pt": "A área investiga como procedimentos se comportam além de um banco de dados: identificabilidade, viés, consistência, distribuições-limite, eficiência e informação. O hábito central é explicitar hipóteses antes de interpretar resultados assintóticos."
    },
    "background": {
      "en": "Mathematical statistics, probability, multivariable calculus and some real analysis.",
      "pt": "Estatística matemática, probabilidade, cálculo multivariado e noções de análise real."
    },
    "path": [
      {
        "en": "Review classical estimation and risk with Lehmann and Casella.",
        "pt": "Revise estimação clássica e risco com Lehmann e Casella."
      },
      {
        "en": "Work through consistency, M/Z-estimation and local asymptotic normality in van der Vaart.",
        "pt": "Estude consistência, estimação M/Z e normalidade assintótica local em van der Vaart."
      },
      {
        "en": "Use Godambe to connect estimating functions and optimality questions.",
        "pt": "Use Godambe para conectar funções de estimação e questões de otimalidade."
      }
    ],
    "references": [
      {
        "authors": "E. L. Lehmann; George Casella",
        "title": "Theory of Point Estimation, 2nd ed.",
        "year": 1998,
        "kind": "foundation",
        "url": "https://doi.org/10.1007/b98854",
        "note": {
          "en": "A rigorous basis for estimation, optimality and decision-theoretic criteria.",
          "pt": "Base rigorosa para estimação, otimalidade e critérios de decisão."
        }
      },
      {
        "authors": "A. W. van der Vaart",
        "title": "Asymptotic Statistics",
        "year": 1998,
        "kind": "next",
        "url": "https://doi.org/10.1017/CBO9780511802256",
        "note": {
          "en": "The mathematical bridge to M-estimation, efficiency and empirical processes.",
          "pt": "A ponte matemática para estimação M, eficiência e processos empíricos."
        }
      },
      {
        "authors": "V. P. Godambe",
        "title": "An Optimum Property of Regular Maximum Likelihood Estimation",
        "year": 1960,
        "kind": "seminal",
        "url": "https://doi.org/10.1214/aoms/1177705693",
        "note": {
          "en": "A short early reference for the optimality perspective behind estimating functions.",
          "pt": "Referência breve e inicial da perspectiva de otimalidade ligada a funções de estimação."
        }
      }
    ]
  },
  {
    "id": "sar",
    "question": {
      "en": "What statistical structure is created by coherent imaging, speckle and polarimetric measurements?",
      "pt": "Que estrutura estatística surge da formação coerente de imagens, do speckle e de medições polarimétricas?"
    },
    "entry": {
      "en": "The point is not merely image classification: it is to understand how acquisition, speckle, spatial dependence and the choice of observable determine an appropriate statistical model. Read physical foundations before choosing a probability law.",
      "pt": "O objetivo não é apenas classificar imagens: é entender como aquisição, speckle, dependência espacial e a escolha do observável determinam um modelo estatístico adequado. Estude os fundamentos físicos antes de escolher uma lei de probabilidade."
    },
    "background": {
      "en": "Probability distributions and statistical inference; helpful: complex-valued random vectors and linear algebra.",
      "pt": "Distribuições de probabilidade e inferência estatística; úteis: vetores aleatórios complexos e álgebra linear."
    },
    "path": [
      {
        "en": "Start with Oliver and Quegan for the imaging chain and statistical observables.",
        "pt": "Comece por Oliver e Quegan para a cadeia de formação da imagem e os observáveis estatísticos."
      },
      {
        "en": "Read Goodman to understand the physical and statistical origins of speckle.",
        "pt": "Leia Goodman para entender as origens físicas e estatísticas do speckle."
      },
      {
        "en": "Move to Lee and Pottier for polarimetric measurements, then examine applied modeling.",
        "pt": "Avance para Lee e Pottier para medidas polarimétricas e depois examine a modelagem aplicada."
      }
    ],
    "references": [
      {
        "authors": "Chris Oliver; Shaun Quegan",
        "title": "Understanding Synthetic Aperture Radar Images",
        "year": 2004,
        "kind": "entry",
        "url": "https://books.google.com/books?id=IeGKe40S77AC",
        "note": {
          "en": "A practical and statistical introduction to SAR formation, noise and image analysis.",
          "pt": "Introdução prática e estatística à formação SAR, ruído e análise de imagens."
        }
      },
      {
        "authors": "J. W. Goodman",
        "title": "Some fundamental properties of speckle",
        "year": 1976,
        "kind": "seminal",
        "url": "https://doi.org/10.1364/JOSA.66.001145",
        "note": {
          "en": "The physical/statistical foundation for speckle contrast and multilook averaging.",
          "pt": "Fundamentos físicos e estatísticos do contraste do speckle e da média multilook."
        }
      },
      {
        "authors": "Jong-Sen Lee; Eric Pottier",
        "title": "Polarimetric Radar Imaging: From Basics to Applications",
        "year": 2009,
        "kind": "next",
        "url": "https://www.routledge.com/Polarimetric-Radar-Imaging-From-Basics-toApplications/Lee-Pottier/p/book/9781420054972",
        "note": {
          "en": "Develops the polarimetric representation and relevant processing techniques.",
          "pt": "Desenvolve a representação polarimétrica e técnicas de processamento pertinentes."
        }
      },
      {
        "authors": "Willams B. F. da Silva; Avik Bhattacharya; Abraão D. C. Nascimento; Alejandro C. Frery",
        "title": "A GAMLSS Framework for Crop Discrimination Using Geodesic Polarimetric SAR Parameters",
        "year": 2026,
        "kind": "application",
        "url": "https://doi.org/10.1109/JSTARS.2026.3680479",
        "note": {
          "en": "An application-oriented connection to the research conducted in this group.",
          "pt": "Conexão aplicada com a pesquisa desenvolvida neste grupo."
        }
      }
    ]
  },
  {
    "id": "regression",
    "question": {
      "en": "How should regression account for non-Gaussian outcomes and correlated observations?",
      "pt": "Como a regressão deve lidar com respostas não gaussianas e observações correlacionadas?"
    },
    "entry": {
      "en": "Work from the mean–variance relationship in generalized linear models toward estimating equations for correlated data. Distinguish modeling the marginal mean from specifying an entire joint distribution.",
      "pt": "Parta da relação entre média e variância nos modelos lineares generalizados e avance para equações de estimação em dados correlacionados. Distinga a modelagem da média marginal da especificação de toda a distribuição conjunta."
    },
    "background": {
      "en": "Linear models, likelihood, matrix calculus; useful: repeated measures and asymptotic inference.",
      "pt": "Modelos lineares, verossimilhança e cálculo matricial; úteis: medidas repetidas e inferência assintótica."
    },
    "path": [
      {
        "en": "Study link functions, variance functions and likelihood in McCullagh and Nelder.",
        "pt": "Estude funções de ligação, funções de variância e verossimilhança em McCullagh e Nelder."
      },
      {
        "en": "Read Liang and Zeger to understand working correlation and robust variance.",
        "pt": "Leia Liang e Zeger para compreender correlação de trabalho e variância robusta."
      },
      {
        "en": "Return to estimating-function optimality when choosing or comparing procedures.",
        "pt": "Retome a otimalidade de funções de estimação ao escolher ou comparar procedimentos."
      }
    ],
    "references": [
      {
        "authors": "P. McCullagh; J. A. Nelder",
        "title": "Generalized Linear Models, 2nd ed.",
        "year": 1989,
        "kind": "foundation",
        "url": "https://www.stata.com/bookstore/generalized-linear-models/",
        "note": {
          "en": "The core reference for the generalized linear model framework.",
          "pt": "Referência central do arcabouço de modelos lineares generalizados."
        }
      },
      {
        "authors": "Kung-Yee Liang; Scott L. Zeger",
        "title": "Longitudinal data analysis using generalized linear models",
        "year": 1986,
        "kind": "seminal",
        "url": "https://doi.org/10.1093/biomet/73.1.13",
        "note": {
          "en": "Introduces generalized estimating equations for correlated responses.",
          "pt": "Introduz equações de estimação generalizadas para respostas correlacionadas."
        }
      },
      {
        "authors": "Andrew Gelman; Jennifer Hill; Aki Vehtari",
        "title": "Regression and Other Stories",
        "year": 2020,
        "kind": "entry",
        "url": "https://doi.org/10.1017/9781139161879",
        "note": {
          "en": "A readable complement on model interpretation, uncertainty and real-data decisions.",
          "pt": "Complemento acessível sobre interpretação, incerteza e decisões com dados reais."
        }
      }
    ]
  },
  {
    "id": "time-series",
    "question": {
      "en": "How do temporal dependence, stationarity and model diagnostics interact?",
      "pt": "Como dependência temporal, estacionariedade e diagnóstico de modelos se relacionam?"
    },
    "entry": {
      "en": "Begin with covariance and the ARMA construction; then study identification, residual checks and forecast uncertainty. Non-Gaussian extensions connect this area directly to amplitude and intensity modeling for radar data.",
      "pt": "Comece pela covariância e pela construção ARMA; depois estude identificação, diagnóstico residual e incerteza de previsão. Extensões não gaussianas conectam a área à modelagem de amplitude e intensidade de radar."
    },
    "background": {
      "en": "Probability, linear algebra, regression and elementary stochastic processes.",
      "pt": "Probabilidade, álgebra linear, regressão e processos estocásticos elementares."
    },
    "path": [
      {
        "en": "Learn the core autocovariance and ARMA ideas in Brockwell and Davis.",
        "pt": "Aprenda autocovariância e os fundamentos ARMA em Brockwell e Davis."
      },
      {
        "en": "Use Box and colleagues for model-building, identification and diagnostics.",
        "pt": "Use Box e colaboradores para construção, identificação e diagnóstico de modelos."
      },
      {
        "en": "Study a non-Gaussian SAR process as one methodological extension, not as a general time-series template.",
        "pt": "Estude um processo SAR não gaussiano como extensão metodológica, não como modelo universal de séries temporais."
      }
    ],
    "references": [
      {
        "authors": "Peter J. Brockwell; Richard A. Davis",
        "title": "Introduction to Time Series and Forecasting, 3rd ed.",
        "year": 2016,
        "kind": "entry",
        "url": "https://doi.org/10.1007/978-3-319-29854-2",
        "note": {
          "en": "An accessible introduction to stochastic time-series modeling and forecasting.",
          "pt": "Introdução acessível à modelagem e previsão de séries temporais estocásticas."
        }
      },
      {
        "authors": "George E. P. Box; Gwilym M. Jenkins; Gregory C. Reinsel; Greta M. Ljung",
        "title": "Time Series Analysis: Forecasting and Control, 5th ed.",
        "year": 2015,
        "kind": "foundation",
        "url": "https://www.wiley-vch.de/en?isbn=9781118675021&option=com_eshop&title=Time+Series+Analysis&view=product",
        "note": {
          "en": "Classical ARIMA identification, fitting and diagnostic workflow.",
          "pt": "Fluxo clássico de identificação, ajuste e diagnóstico de modelos ARIMA."
        }
      },
      {
        "authors": "Willams B. F. da Silva; Pedro M. Almeida-Junior; Abraão D. C. Nascimento",
        "title": "Generalized gamma ARMA process for synthetic aperture radar amplitude and intensity data",
        "year": 2023,
        "kind": "application",
        "url": "https://doi.org/10.1002/env.2816",
        "note": {
          "en": "An example of non-Gaussian ARMA modeling tied to SAR observables.",
          "pt": "Exemplo de modelagem ARMA não gaussiana ligada a observáveis SAR."
        }
      }
    ]
  },
  {
    "id": "geometry",
    "question": {
      "en": "What can the geometry of probability models reveal about inference and optimization?",
      "pt": "O que a geometria de modelos probabilísticos revela sobre inferência e otimização?"
    },
    "entry": {
      "en": "Information geometry studies families of distributions as geometric objects. Begin with Fisher information as a metric, then examine dual connections and divergence functions, separating geometric insight from application-specific claims.",
      "pt": "A geometria da informação estuda famílias de distribuições como objetos geométricos. Comece pela informação de Fisher como métrica e avance para conexões duais e divergências, distinguindo intuição geométrica de afirmações específicas de aplicações."
    },
    "background": {
      "en": "Multivariable calculus, probability, mathematical statistics; helpful: differential geometry.",
      "pt": "Cálculo multivariado, probabilidade e estatística matemática; útil: geometria diferencial."
    },
    "path": [
      {
        "en": "Begin with the opening chapters of Amari (2016) for the main objects and intuition.",
        "pt": "Comece pelos capítulos iniciais de Amari (2016) para os principais objetos e a intuição."
      },
      {
        "en": "Continue with Amari and Nagaoka for the mathematical structure of dual connections.",
        "pt": "Continue com Amari e Nagaoka para a estrutura matemática das conexões duais."
      },
      {
        "en": "Use proper scoring rules as one bridge to divergences and statistical decisions.",
        "pt": "Use regras de pontuação próprias como uma das pontes para divergências e decisões estatísticas."
      }
    ],
    "references": [
      {
        "authors": "Shun-ichi Amari",
        "title": "Information Geometry and Its Applications",
        "year": 2016,
        "kind": "entry",
        "url": "https://doi.org/10.1007/978-4-431-55978-8",
        "note": {
          "en": "A structured introduction with statistical and computational applications.",
          "pt": "Introdução estruturada com aplicações estatísticas e computacionais."
        }
      },
      {
        "authors": "Shun-ichi Amari; Hiroshi Nagaoka",
        "title": "Methods of Information Geometry",
        "year": 2000,
        "kind": "foundation",
        "url": "https://doi.org/10.1090/MMONO/191",
        "note": {
          "en": "Advanced treatment of the geometry of statistical models and dual connections.",
          "pt": "Tratamento avançado da geometria de modelos estatísticos e conexões duais."
        }
      },
      {
        "authors": "Tilmann Gneiting; Adrian E. Raftery",
        "title": "Strictly Proper Scoring Rules, Prediction, and Estimation",
        "year": 2007,
        "kind": "next",
        "url": "https://doi.org/10.1198/016214506000001437",
        "note": {
          "en": "A complementary bridge between convexity, divergence and predictive evaluation.",
          "pt": "Ponte complementar entre convexidade, divergência e avaliação preditiva."
        }
      }
    ]
  },
  {
    "id": "computing",
    "question": {
      "en": "How can a computational result be made reliable, reproducible and reusable?",
      "pt": "Como tornar um resultado computacional confiável, reproduzível e reutilizável?"
    },
    "entry": {
      "en": "Statistical computing is more than running software: simulation design, numerical error, reproducibility and interpretable implementation all affect the strength of a scientific claim. Start with an auditable workflow and deepen the Monte Carlo theory.",
      "pt": "Computação estatística vai além de executar software: planejamento de simulações, erro numérico, reprodutibilidade e implementação interpretável afetam a força de uma afirmação científica. Comece por um fluxo auditável e aprofunde a teoria Monte Carlo."
    },
    "background": {
      "en": "Basic programming, probability and introductory statistical inference.",
      "pt": "Programação básica, probabilidade e inferência estatística introdutória."
    },
    "path": [
      {
        "en": "Start with an R project that can be run from a clean environment.",
        "pt": "Comece por um projeto em R que possa ser executado em um ambiente limpo."
      },
      {
        "en": "Use Peng and Wickham to structure data and document the workflow.",
        "pt": "Use Peng e Wickham para organizar os dados e documentar o fluxo de trabalho."
      },
      {
        "en": "Move to Robert and Casella for principled simulation and Monte Carlo diagnostics.",
        "pt": "Avance para Robert e Casella para simulação fundamentada e diagnóstico Monte Carlo."
      }
    ],
    "references": [
      {
        "authors": "Hadley Wickham; Mine Çetinkaya-Rundel; Garrett Grolemund",
        "title": "R for Data Science, 2nd ed.",
        "year": 2023,
        "kind": "entry",
        "url": "https://r4ds.hadley.nz/",
        "note": {
          "en": "Free online introduction to practical, reproducible R workflows.",
          "pt": "Introdução gratuita on-line a fluxos práticos e reproduzíveis em R."
        }
      },
      {
        "authors": "Roger D. Peng",
        "title": "Reproducible Research in Computational Science",
        "year": 2011,
        "kind": "foundation",
        "url": "https://doi.org/10.1126/science.1213847",
        "note": {
          "en": "A concise argument for sharing the components needed to evaluate computation.",
          "pt": "Argumento conciso a favor de compartilhar os componentes necessários para avaliar cálculos."
        }
      },
      {
        "authors": "Hadley Wickham",
        "title": "Tidy Data",
        "year": 2014,
        "kind": "next",
        "url": "https://doi.org/10.18637/jss.v059.i10",
        "note": {
          "en": "A useful organizing principle for data pipelines and reusable analysis.",
          "pt": "Princípio de organização útil para fluxos de dados e análises reutilizáveis."
        }
      },
      {
        "authors": "Christian P. Robert; George Casella",
        "title": "Monte Carlo Statistical Methods, 2nd ed.",
        "year": 2004,
        "kind": "advanced",
        "url": "https://doi.org/10.1007/978-1-4757-4145-2",
        "note": {
          "en": "A rigorous reference for Monte Carlo simulation and its statistical properties.",
          "pt": "Referência rigorosa para simulação Monte Carlo e suas propriedades estatísticas."
        }
      }
    ]
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
