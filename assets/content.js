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
        "id": "ic-sentinel1-pipeline",
        "area": "sar",
        "levels": [
            "undergraduate"
        ],
        "title": {
            "pt": "Pipeline reprodutível de dados Sentinel-1",
            "en": "A reproducible Sentinel-1 data pipeline"
        },
        "description": {
            "pt": "Automatizar consulta, aquisição, pré-processamento documentado e controle de qualidade de cenas SAR públicas; produzir um conjunto de dados pequeno e reprodutível.",
            "en": "Build a documented workflow for querying, downloading, preprocessing and quality-checking public SAR scenes; deliver a small reproducible dataset."
        },
        "requirements": {
            "pt": "R ou Python, noções de SIG e disposição para estudar metadados e geometria das cenas.",
            "en": "R or Python, basic GIS and willingness to learn scene metadata and geometry."
        },
        "status": "proposal"
    },
    {
        "id": "ic-crop-time-series",
        "area": "sar",
        "levels": [
            "undergraduate"
        ],
        "title": {
            "pt": "Assinaturas temporais de uva e manga com Sentinel-1",
            "en": "Grape and mango temporal signatures from Sentinel-1"
        },
        "description": {
            "pt": "Explorar séries temporais de retroespalhamento para parcelas rotuladas de uva e manga; avaliar sazonalidade, fenologia e sensibilidade a chuva e manejo, sem presumir separabilidade.",
            "en": "Explore backscatter time series for labeled grape and mango parcels; assess phenology, rainfall and management effects without assuming the crops can be separated reliably."
        },
        "requirements": {
            "pt": "Estatística descritiva, R, séries temporais básicas e acesso a parcelas validadas.",
            "en": "Descriptive statistics, R, basic time series and access to validated field parcels."
        },
        "status": "proposal"
    },
    {
        "id": "ic-field-boundaries",
        "area": "sar",
        "levels": [
            "undergraduate"
        ],
        "title": {
            "pt": "Detecção de limites agrícolas por entropia",
            "en": "Entropy-based agricultural field boundary detection"
        },
        "description": {
            "pt": "Comparar medidas de entropia local e detectores de borda para delimitar parcelas; avaliar com referência geográfica e dados multitemporais, quando disponíveis.",
            "en": "Compare local entropy features and edge detectors for field boundaries; evaluate against georeferenced labels and multitemporal data where available."
        },
        "requirements": {
            "pt": "Processamento de imagens, álgebra linear básica e avaliação de classificação.",
            "en": "Image processing, basic linear algebra and classification evaluation."
        },
        "status": "proposal"
    },
    {
        "id": "ic-noncircularity",
        "area": "sar",
        "levels": [
            "undergraduate"
        ],
        "title": {
            "pt": "Efeitos da não circularidade em observações SAR complexas",
            "en": "Effects of noncircularity in complex SAR observations"
        },
        "description": {
            "pt": "Construir um estudo de simulação de modelos complexos próprios e impróprios e comparar estimadores e testes sob hipóteses controladas. Imagens de intensidade, isoladamente, não permitem esse estudo.",
            "en": "Simulate proper and improper complex-valued models and compare estimators and tests under controlled assumptions. Intensity-only images are insufficient for this question."
        },
        "requirements": {
            "pt": "Probabilidade, simulação Monte Carlo e noções de variáveis aleatórias complexas.",
            "en": "Probability, Monte Carlo simulation and basic complex random variables."
        },
        "status": "proposal"
    },
    {
        "id": "ic-ggarma-likelihood",
        "area": "spatial-models",
        "levels": [
            "undergraduate"
        ],
        "title": {
            "pt": "Visualização da verossimilhança em modelos gama generalizada ARMA",
            "en": "Likelihood geometry in generalized-gamma ARMA models"
        },
        "description": {
            "pt": "Mapear perfis e seções bidimensionais da log-verossimilhança em exemplos identificáveis, examinando curvatura, máximos locais e sensibilidade à inicialização.",
            "en": "Visualize profiles and two-dimensional sections of the log-likelihood in identifiable examples, examining curvature, local optima and initialization sensitivity."
        },
        "requirements": {
            "pt": "Inferência paramétrica, otimização numérica básica e R.",
            "en": "Parametric inference, basic numerical optimization and R."
        },
        "status": "proposal"
    },
    {
        "id": "ic-entropy-outliers",
        "area": "theory",
        "levels": [
            "undergraduate"
        ],
        "title": {
            "pt": "Comparação de diagnósticos de outliers baseados em entropia",
            "en": "Benchmarking entropy-based outlier diagnostics"
        },
        "description": {
            "pt": "Definir uma família de cenários de contaminação e comparar medidas baseadas em entropia/divergência a métodos clássicos por taxa de falso positivo e poder.",
            "en": "Define controlled contamination scenarios and compare entropy/divergence-based measures with classical diagnostics using false-positive rate and detection power."
        },
        "requirements": {
            "pt": "Simulação, inferência introdutória e métricas de avaliação.",
            "en": "Simulation, introductory inference and evaluation metrics."
        },
        "status": "proposal"
    },
    {
        "id": "msc-sar-circularity",
        "area": "sar",
        "levels": [
            "masters"
        ],
        "title": {
            "pt": "Circularidade em SAR: propriedades e sensibilidade inferencial",
            "en": "Circularity in SAR: properties and inferential sensitivity"
        },
        "description": {
            "pt": "Investigar consequências de circularidade e impropriedade em observações SAR complexas e avaliar correções possíveis para estimadores sob hipóteses explícitas.",
            "en": "Study consequences of circularity and impropriety in complex SAR observations and assess candidate estimator corrections under explicit assumptions."
        },
        "requirements": {
            "pt": "Probabilidade multivariada, variáveis complexas, verossimilhança e simulação.",
            "en": "Multivariate probability, complex variables, likelihood and simulation."
        },
        "status": "proposal"
    },
    {
        "id": "msc-local-influence",
        "area": "geometry",
        "levels": [
            "masters"
        ],
        "title": {
            "pt": "Influência local em modelos SAR com perturbações de verossimilhança",
            "en": "Local influence in SAR models under likelihood perturbations"
        },
        "description": {
            "pt": "Definir esquemas de perturbação e derivar Hessianas e curvaturas normais para diagnósticos de influência; verificar regularidade e estabilidade numérica.",
            "en": "Specify perturbation schemes and derive perturbed Hessians and normal curvature for influence diagnostics; verify regularity and numerical stability."
        },
        "requirements": {
            "pt": "Cálculo matricial, inferência por verossimilhança e otimização.",
            "en": "Matrix calculus, likelihood inference and optimization."
        },
        "status": "proposal"
    },
    {
        "id": "msc-distribution-families",
        "area": "sar",
        "levels": [
            "masters"
        ],
        "title": {
            "pt": "Novas famílias de distribuições para observáveis SAR",
            "en": "New distribution families for SAR observables"
        },
        "description": {
            "pt": "Investigar transformações probabilísticas motivadas por observáveis SAR/PolSAR, seu suporte, normalização, identificabilidade e propriedades de momentos. A construção exata depende da formulação ainda não divulgada.",
            "en": "Investigate distributions motivated by SAR/PolSAR observables, including support, normalization, identifiability and moments. The precise construction depends on a formulation not yet publicly specified."
        },
        "requirements": {
            "pt": "Cálculo de probabilidades, transformações, álgebra matricial e inferência.",
            "en": "Probability transformations, matrix algebra and inference."
        },
        "status": "proposal"
    },
    {
        "id": "msc-penalized-ggarma",
        "area": "spatial-models",
        "levels": [
            "masters"
        ],
        "title": {
            "pt": "Estimação penalizada para modelos gama generalizada ARMA",
            "en": "Penalized generalized-gamma ARMA estimation"
        },
        "description": {
            "pt": "Comparar penalizações e estudar condições de identificação, matrizes de informação e possíveis resultados assintóticos em um submodelo delimitado.",
            "en": "Compare penalties and study identification, information matrices and possible asymptotic results for a clearly defined submodel."
        },
        "requirements": {
            "pt": "Modelos ARMA, otimização restrita e teoria assintótica básica.",
            "en": "ARMA models, constrained optimization and introductory asymptotics."
        },
        "status": "proposal"
    },
    {
        "id": "msc-entropy-influence",
        "area": "theory",
        "levels": [
            "masters"
        ],
        "title": {
            "pt": "Diagnósticos de influência baseados em entropia e divergências",
            "en": "Influence diagnostics based on entropy and divergence"
        },
        "description": {
            "pt": "Definir medidas de perturbação e estudar sua interpretação, robustez e sensibilidade em modelos bem especificados.",
            "en": "Define perturbation measures and study their interpretation, robustness and sensitivity in specified statistical models."
        },
        "requirements": {
            "pt": "Entropia, divergências, estimação e simulações.",
            "en": "Entropy, divergences, estimation and simulation."
        },
        "status": "proposal"
    },
    {
        "id": "msc-enl-mixtures",
        "area": "sar",
        "levels": [
            "masters"
        ],
        "title": {
            "pt": "Estimação de ENL em misturas com dependência espacial",
            "en": "ENL estimation in mixtures with spatial dependence"
        },
        "description": {
            "pt": "Avaliar se misturas de processos condicionais gama generalizada permitem um estimador identificável de ENL; delimitar componentes homogêneos e testar viés e variância por simulação.",
            "en": "Assess whether mixtures of conditional generalized-gamma processes yield an identifiable ENL estimator; define homogeneous components and test bias and variance by simulation."
        },
        "requirements": {
            "pt": "Distribuições de mistura, dependência espacial, inferência e R.",
            "en": "Mixture distributions, spatial dependence, inference and R."
        },
        "status": "proposal"
    },
    {
        "id": "phd-geodesic-circularity",
        "area": "geometry",
        "levels": [
            "phd"
        ],
        "title": {
            "pt": "Testes de circularidade com ferramentas da geometria da informação",
            "en": "Geometry-informed circularity tests for complex data"
        },
        "description": {
            "pt": "Definir a hipótese de circularidade/propriedade em um modelo complexo e investigar se distância geodésica ou outra estrutura geométrica conduz a testes calibráveis.",
            "en": "Specify a circularity/propriety null for a complex statistical model and investigate whether geodesic distance or another geometric quantity yields calibratable tests."
        },
        "requirements": {
            "pt": "Geometria diferencial, inferência assintótica e distribuições complexas.",
            "en": "Differential geometry, asymptotic inference and complex distributions."
        },
        "status": "proposal"
    },
    {
        "id": "phd-manifold-influence",
        "area": "geometry",
        "levels": [
            "phd"
        ],
        "title": {
            "pt": "Curvatura e influência em variedades estatísticas",
            "en": "Curvature and influence on statistical manifolds"
        },
        "description": {
            "pt": "Investigar relações rigorosamente definidas entre diagnósticos globais/locais e curvatura seccional; identificar primeiro o funcional de influência e a conexão geométrica apropriada.",
            "en": "Investigate precisely defined links between global/local influence diagnostics and sectional curvature, first specifying an influence functional and suitable geometric connection."
        },
        "requirements": {
            "pt": "Geometria riemanniana, derivadas de ordem superior e teoria da influência.",
            "en": "Riemannian geometry, higher-order derivatives and influence theory."
        },
        "status": "proposal"
    },
    {
        "id": "phd-pol-sar-matrix-family",
        "area": "sar",
        "levels": [
            "phd"
        ],
        "title": {
            "pt": "Famílias matriciais para observáveis PolSAR",
            "en": "Matrix-variate families for PolSAR observables"
        },
        "description": {
            "pt": "Propor e validar uma generalização matricial para dados polarimétricos, com suporte, normalização, invariância, limites e modelo de amostragem explicitamente definidos.",
            "en": "Propose and validate a matrix-variate family for polarimetric data, explicitly specifying support, normalization, invariance, limits and sampling model."
        },
        "requirements": {
            "pt": "Distribuições matriciais, probabilidade complexa, álgebra de matrizes e inferência.",
            "en": "Matrix distributions, complex probability, matrix algebra and inference."
        },
        "status": "proposal"
    },
    {
        "id": "phd-geodesic-regularization",
        "area": "geometry",
        "levels": [
            "phd"
        ],
        "title": {
            "pt": "Seleção de modelos com regularização geométrica",
            "en": "Model selection with geometric regularization"
        },
        "description": {
            "pt": "Estudar penalizações construídas a partir de uma métrica na variedade de parâmetros e comparar consistência, invariância e comportamento computacional com penalizações convencionais.",
            "en": "Study penalties built from a parameter-manifold metric and compare selection consistency, invariance and computation with conventional penalties."
        },
        "requirements": {
            "pt": "Otimização, geometria da informação, estatística assintótica e regularização.",
            "en": "Optimization, information geometry, asymptotic statistics and regularization."
        },
        "status": "proposal"
    },
    {
        "id": "phd-robust-divergence",
        "area": "theory",
        "levels": [
            "phd"
        ],
        "title": {
            "pt": "Estimação robusta por divergência de potência de densidade",
            "en": "Robust estimation via density power divergence"
        },
        "description": {
            "pt": "Desenvolver e estudar estimadores MDPDE para submodelos multiplicativos específicos, verificando identificabilidade, robustez, influência e propriedades assintóticas sob dependência.",
            "en": "Develop MDPDE estimators for specified multiplicative submodels, examining identifiability, robustness, influence and asymptotic properties under dependence."
        },
        "requirements": {
            "pt": "Inferência robusta, divergências, teoria assintótica e modelos SAR.",
            "en": "Robust inference, divergences, asymptotic theory and SAR models."
        },
        "status": "proposal"
    }
],
  /* Exploratory author-led/collaborative research ideas, not advertised student positions. */
  researchIdeas: [
    {
        "id": "sar-epidemiology",
        "type": "applied",
        "area": "sar",
        "title": {
            "pt": "Covariáveis derivadas de SAR para modelos epidemiológicos",
            "en": "SAR-derived covariates for epidemiological models"
        },
        "description": {
            "pt": "Investigar se atributos SAR processados podem complementar modelos epidemiológicos em períodos de nebulosidade ou chuva, com validação temporal e espacial das variáveis de exposição.",
            "en": "Investigate whether processed SAR features can complement epidemiological models during cloudy or rainy periods, with careful temporal and spatial validation of exposure proxies."
        },
        "caveat": {
            "pt": "SAR mede retroespalhamento, não desfechos epidemiológicos; a utilidade das covariáveis deve ser demonstrada.",
            "en": "SAR measures backscatter, not epidemiological outcomes; the usefulness of derived covariates must be demonstrated."
        }
    },
    {
        "id": "bayes-sar-applications",
        "type": "applied",
        "area": "sar",
        "title": {
            "pt": "Modelos hierárquicos bayesianos para fenômenos observados por SAR",
            "en": "Bayesian hierarchical models for SAR-observed phenomena"
        },
        "description": {
            "pt": "Avaliar verossimilhanças para dados positivos de amplitude/intensidade e campos espaciais latentes em estudos de inundação, queimada ou mudança de cobertura, conforme a variável resposta e os dados disponíveis.",
            "en": "Assess likelihoods for positive amplitude/intensity data and latent spatial fields in flooding, burned-area or land-cover studies, conditional on the response variable and available data."
        },
        "caveat": {
            "pt": "A adequação de uma família gama generalizada depende do observável, da calibração e do mecanismo de aquisição.",
            "en": "The suitability of a generalized-gamma family depends on the observable, calibration and acquisition mechanism."
        }
    },
    {
        "id": "poisson-spatial-epidemio",
        "type": "theory",
        "area": "spatial-models",
        "title": {
            "pt": "Modelos de contagem com dependência espacial e efeitos latentes",
            "en": "Count models with spatial dependence and latent effects"
        },
        "description": {
            "pt": "Explorar modelos com regressão de Poisson, dependência condicional espacial e efeitos latentes para mapeamento epidemiológico; estudar construção conjunta, identificação e inferência.",
            "en": "Explore Poisson regression with conditional spatial dependence and latent effects for disease mapping; study joint-model construction, identifiability and inference."
        },
        "caveat": {
            "pt": "Dependência condicional e campo latente podem competir pela mesma variação; a identificabilidade precisa ser estudada.",
            "en": "Conditional dependence and a latent field may compete to explain the same variation; identifiability needs careful study."
        }
    },
    {
        "id": "spacetime-exp-family",
        "type": "theory",
        "area": "spatial-models",
        "title": {
            "pt": "Regressão espaço-temporal com dependência condicional e campos latentes",
            "en": "Spatio-temporal regression with conditional dependence and latent fields"
        },
        "description": {
            "pt": "Investigar uma classe restrita de modelos da família exponencial com covariáveis, dependência condicional espacial e termos latentes espaço-temporais, incluindo interação quando identificável.",
            "en": "Investigate a restricted exponential-family model with covariates, conditional spatial dependence and spatio-temporal latent terms, including interactions when identifiable."
        },
        "caveat": {
            "pt": "Programa teórico amplo: começar por um submodelo e verificar normalização, existência, estabilidade e identificabilidade.",
            "en": "Broad theoretical program: begin with a tractable submodel and verify normalization, existence, stability and identifiability."
        }
    },
    {
        "id": "rinla-mcmc-package",
        "type": "computational",
        "area": "spatial-models",
        "title": {
            "pt": "Software R para inferência aproximada em modelos espaciais condicionais",
            "en": "R software for approximate inference in conditional spatial models"
        },
        "description": {
            "pt": "Planejar interfaces e testes para submodelos identificáveis; avaliar INLA dentro de MCMC somente quando a estrutura condicional satisfizer os requisitos de modelos gaussianos latentes.",
            "en": "Design interfaces and tests for identifiable submodels; consider INLA-within-MCMC only where the conditional structure meets latent-Gaussian requirements."
        },
        "caveat": {
            "pt": "O uso de R-INLA não é automaticamente válido para qualquer verossimilhança ou efeito ARMA. Comparar métodos alternativos e validar a inferência.",
            "en": "R-INLA is not automatically suitable for every likelihood or ARMA effect. Compare alternative methods and validate inference."
        },
        "reference": "https://doi.org/10.1007/s11222-017-9778-y"
    }
],
  /* Public names and academic roles only. Confirm consent for public listing with each student. */
  students: [
    { id: "pedro-estevao", name: "Pedro Estevão Costa Viana de Araújo", levelId: "undergraduate", relation: "supervisor", status: "active", start: "", end: "", level: { pt: "Iniciação científica", en: "Undergraduate research" }, role: { pt: "Orientação", en: "Supervision" }, project: "", url: "" },
    { id: "muhammed-ismail", name: "Muhammed Ismail", levelId: "phd", relation: "co-supervisor", status: "active", start: "", end: "", level: { pt: "Doutorado", en: "Ph.D." }, role: { pt: "Coorientação", en: "Co-supervision" }, project: "", url: "" }
  ],
  /* Add courses as { id, title:{pt,en}, institution, term, level, description:{pt,en}, materials:"" }. */
  courses: [
    { id: "probabilidade-2", title: { pt: "Probabilidade 2", en: "Probability II" }, institution: "UFPE", term: "2026", offerings: ["2026"], level: "Undergraduate", description: { pt: "Probabilidade para a graduação em Estatística.", en: "Probability for undergraduate Statistics students." }, materials: "" },
    { id: "inferencia-atuariais", title: { pt: "Inferência Estatística para Ciências Atuariais", en: "Statistical Inference for Actuarial Sciences" }, institution: "UFPE", term: "2026", offerings: ["2026"], level: "Undergraduate", description: { pt: "Inferência estatística para a graduação em Ciências Atuariais.", en: "Statistical inference for undergraduate Actuarial Science students." }, materials: "" },
    { id: "probabilidade-2-atuariais", title: { pt: "Probabilidade 2 para Ciências Atuariais", en: "Probability II for Actuarial Science" }, institution: "UFPE", term: "2026", offerings: ["2026"], level: "Undergraduate", description: { pt: "Probabilidade para a graduação em Ciências Atuariais.", en: "Probability for undergraduate Actuarial Science students." }, materials: "" },
    { id: "analise-multivariada", title: { pt: "Análise Multivariada", en: "Multivariate Analysis" }, institution: "UFPE", term: "2026", offerings: ["2026"], level: "Undergraduate", description: { pt: "Análise multivariada para estudantes de graduação.", en: "Multivariate analysis for undergraduate students." }, materials: "" }
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
