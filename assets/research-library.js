/* Academic reading-library extension. Human-curated references; not personal publications. */
(() => {
  "use strict";
  const D = window.PORTFOLIO;
  if (!D) return;
  const extra = {
  "spatial-models": {
    "overview": {
      "en": "Spatial statistics studies stochastic processes indexed by location and space–time. Lattice models, geostatistical random fields, point processes and dynamic space–time processes require distinct assumptions; a conditional specification is not automatically a compatible joint law.",
      "pt": "A estatística espacial estuda processos estocásticos indexados no espaço e no espaço-tempo. Modelos em malhas, campos geoestatísticos, processos pontuais e processos espaço-temporais dinâmicos exigem hipóteses distintas; uma especificação condicional não implica automaticamente uma distribuição conjunta compatível."
    },
    "foundations": [
      {
        "en": "Stochastic processes and random fields indexed by space or space–time; finite-dimensional distributions, stationarity and joint compatibility.",
        "pt": "Processos estocásticos e campos aleatórios indexados no espaço ou espaço-tempo; distribuições finito-dimensionais, estacionariedade e compatibilidade conjunta."
      },
      {
        "en": "Positive-definite covariance functions, stationarity and variograms; distinguish intrinsic and second-order stationarity.",
        "pt": "Funções de covariância positivas definidas, estacionariedade e variogramas; diferencie estacionariedade intrínseca e de segunda ordem."
      },
      {
        "en": "Markov random fields, neighbourhood graphs, conditional distributions and compatibility of joint distributions.",
        "pt": "Campos aleatórios de Markov, grafos de vizinhança, distribuições condicionais e compatibilidade de distribuições conjuntas."
      },
      {
        "en": "Likelihood or composite likelihood under spatial dependence; sampling design and infill versus increasing-domain asymptotics.",
        "pt": "Verossimilhança ou verossimilhança composta sob dependência espacial; plano amostral e assintótica de domínio fixo ou crescente."
      }
    ],
    "fundamental": [
      {
        "en": "When can local conditional models define a coherent spatial joint distribution? How does correlation alter effective sample size and uncertainty?",
        "pt": "Quando modelos condicionais locais definem uma distribuição conjunta coerente? Como a correlação altera o tamanho amostral efetivo e a incerteza?"
      },
      {
        "en": "How should anisotropy, nonstationarity, observation support and temporal evolution enter the model?",
        "pt": "Como anisotropia, não estacionariedade, suporte observacional e evolução temporal entram no modelo?"
      }
    ],
    "contemporary": [
      {
        "en": "Hierarchical space–time models combine latent processes, observation models and computational approximations; check identifiability and uncertainty under each approximation.",
        "pt": "Modelos hierárquicos espaço-temporais combinam processos latentes, modelos observacionais e aproximações computacionais; examine identificabilidade e incerteza em cada aproximação."
      },
      {
        "en": "Conditional spatial ARMA extensions require explicit neighbourhood structure, coherent conditioning and suitable asymptotic regimes.",
        "pt": "Extensões ARMA espaciais condicionais exigem vizinhança explícita, condicionamento coerente e regimes assintóticos adequados."
      }
    ],
    "learning": {
      "undergraduate": [
        {
          "en": "Work through covariance, variograms and the three spatial-data classes in Cressie.",
          "pt": "Estude covariância, variogramas e as três classes de dados espaciais em Cressie."
        },
        {
          "en": "Reproduce a simple kriging example and simulate a spatial Gaussian field in R.",
          "pt": "Reproduza um exemplo simples de krigagem e simule um campo gaussiano espacial em R."
        }
      ],
      "masters": [
        {
          "en": "Read Besag alongside Rue and Held; derive a precision matrix from a neighbourhood graph.",
          "pt": "Leia Besag em paralelo com Rue e Held; deduza uma matriz de precisão a partir de um grafo de vizinhança."
        },
        {
          "en": "Compare likelihood and conditional or composite approaches under simulated dependence.",
          "pt": "Compare verossimilhança e abordagens condicionais ou compostas sob dependência simulada."
        }
      ],
      "phd": [
        {
          "en": "Study spatial asymptotics and the mathematical validity of a proposed conditional spatial ARMA model.",
          "pt": "Estude assintótica espacial e a validade matemática de um modelo ARMA espacial condicional proposto."
        },
        {
          "en": "Characterize which parameters remain identifiable under infill or increasing-domain sampling.",
          "pt": "Caracterize quais parâmetros permanecem identificáveis sob amostragem em domínio fixo ou crescente."
        }
      ]
    },
    "directions": [
      {
        "type": "extension",
        "text": {
          "en": "A plausible extension is to characterize parameter restrictions ensuring compatible conditional non-Gaussian spatial models; this is not claimed to be an unresolved literature-wide problem.",
          "pt": "Uma extensão plausível é caracterizar restrições paramétricas que assegurem modelos espaciais condicionais não gaussianos compatíveis; não se afirma que seja problema aberto em toda a literatura."
        }
      },
      {
        "type": "exercise",
        "text": {
          "en": "Derive the conditional mean and precision of a small Gaussian Markov random field.",
          "pt": "Deduza a média condicional e a matriz de precisão de um pequeno campo gaussiano de Markov."
        }
      }
    ],
    "connections": [
      {
        "id": "time-series",
        "note": {
          "en": "Spatial ARMA transfers dependence ideas from temporal processes, but ordering and joint compatibility require separate treatment.",
          "pt": "ARMA espacial transfere ideias de dependência temporal, mas ordenação e compatibilidade conjunta exigem tratamento próprio."
        }
      },
      {
        "id": "sar",
        "note": {
          "en": "Spatial correlation changes uncertainty estimates for SAR-derived local statistics and effective looks.",
          "pt": "A correlação espacial altera a incerteza de estatísticas locais de SAR e o número equivalente de looks."
        }
      }
    ],
    "addReferences": [
      {
        "authors": "Luc Anselin",
        "title": "Spatial Econometrics: Methods and Models",
        "year": 1988,
        "venue": "Kluwer Academic Publishers / Springer, Dordrecht, ISBN 9789024737352",
        "url": "https://doi.org/10.1007/978-94-015-7799-1",
        "note": {
          "en": "Develops explicit modelling and diagnostics for spatial dependence in regression.",
          "pt": "Desenvolve modelagem e diagnósticos explícitos de dependência espacial em regressão."
        },
        "preparation": {
          "en": "Mathematical statistics, proof writing, likelihood and asymptotic arguments.",
          "pt": "Estatística matemática, demonstrações, verossimilhança e argumentos assintóticos."
        },
        "why": {
          "en": "Read this work for its specific contribution to develops explicit modelling and diagnostics for spatial dependence in regression.",
          "pt": "Leia esta obra por sua contribuição específica: desenvolve modelagem e diagnósticos explícitos de dependência espacial em regressão."
        },
        "stage": "masters",
        "kind": "next"
      },
      {
        "authors": "Håvard Rue; Leonhard Held",
        "title": "Gaussian Markov Random Fields: Theory and Applications",
        "year": 2005,
        "venue": "Chapman & Hall/CRC, ISBN 9781584884323",
        "url": "https://www.routledge.com/Gaussian-Markov-Random-Fields-Theory-and-Applications/Rue-Held/p/book/9781584884323",
        "note": {
          "en": "Connects sparse precision matrices, conditional independence and practical spatial computation.",
          "pt": "Conecta matrizes de precisão esparsas, independência condicional e computação espacial."
        },
        "preparation": {
          "en": "Mathematical statistics, proof writing, likelihood and asymptotic arguments.",
          "pt": "Estatística matemática, demonstrações, verossimilhança e argumentos assintóticos."
        },
        "why": {
          "en": "Read this work for its specific contribution to connects sparse precision matrices, conditional independence and practical spatial computation.",
          "pt": "Leia esta obra por sua contribuição específica: conecta matrizes de precisão esparsas, independência condicional e computação espacial."
        },
        "stage": "masters",
        "kind": "foundation"
      },
      {
        "authors": "Sudipto Banerjee; Bradley P. Carlin; Alan E. Gelfand",
        "title": "Hierarchical Modeling and Analysis for Spatial Data, 2nd ed.",
        "year": 2014,
        "venue": "Chapman & Hall/CRC, ISBN 9781439819173",
        "url": "https://www.routledge.com/Hierarchical-Modeling-and-Analysis-for-Spatial-Data-Second-Edition/Banerjee-Carlin-Gelfand/p/book/9781439819173",
        "note": {
          "en": "Organizes hierarchical Bayesian spatial modelling and inferential uncertainty.",
          "pt": "Organiza modelagem espacial bayesiana hierárquica e incerteza inferencial."
        },
        "preparation": {
          "en": "Mathematical statistics, proof writing, likelihood and asymptotic arguments.",
          "pt": "Estatística matemática, demonstrações, verossimilhança e argumentos assintóticos."
        },
        "why": {
          "en": "Read this work for its specific contribution to organizes hierarchical Bayesian spatial modelling and inferential uncertainty.",
          "pt": "Leia esta obra por sua contribuição específica: organiza modelagem espacial bayesiana hierárquica e incerteza inferencial."
        },
        "stage": "masters",
        "kind": "next"
      },
      {
        "authors": "Peter J. Diggle",
        "title": "Statistical Analysis of Spatial and Spatio-Temporal Point Patterns, 3rd ed.",
        "year": 2014,
        "venue": "Chapman & Hall/CRC, ISBN 9781466560239",
        "url": "https://www.routledge.com/Statistical-Analysis-of-Spatial-and-Spatio-Temporal-Point-Patterns-Third/Diggle/p/book/9781466560239",
        "note": {
          "en": "Treats point-process data separately from observations on regular lattices.",
          "pt": "Trata processos pontuais separadamente de observações em malhas regulares."
        },
        "preparation": {
          "en": "Mathematical statistics, proof writing, likelihood and asymptotic arguments.",
          "pt": "Estatística matemática, demonstrações, verossimilhança e argumentos assintóticos."
        },
        "why": {
          "en": "Read this work for its specific contribution to treats point-process data separately from observations on regular lattices.",
          "pt": "Leia esta obra por sua contribuição específica: trata processos pontuais separadamente de observações em malhas regulares."
        },
        "stage": "masters",
        "kind": "next"
      },
      {
        "authors": "Noel Cressie; Christopher K. Wikle",
        "title": "Statistics for Spatio-Temporal Data",
        "year": 2011,
        "venue": "Wiley, ISBN 9780471692744",
        "url": "https://books.google.com/books?vid=ISBN9780471692744",
        "note": {
          "en": "Provides a transition from spatial structure to dynamic hierarchical space–time models.",
          "pt": "Oferece transição da estrutura espacial a modelos espaço-temporais hierárquicos dinâmicos."
        },
        "preparation": {
          "en": "Measure-theoretic probability, advanced inference and the article's technical assumptions.",
          "pt": "Probabilidade com teoria da medida, inferência avançada e hipóteses técnicas do artigo."
        },
        "why": {
          "en": "Read this work for its specific contribution to provides a transition from spatial structure to dynamic hierarchical space–time models.",
          "pt": "Leia esta obra por sua contribuição específica: oferece transição da estrutura espacial a modelos espaço-temporais hierárquicos dinâmicos."
        },
        "stage": "phd",
        "kind": "next"
      }
    ]
  },
  "theory": {
    "overview": {
      "en": "Mathematical inference asks which properties can be proved for estimators and tests under explicit probabilistic assumptions, including misspecification and dependent observations.",
      "pt": "A inferência matemática investiga quais propriedades podem ser demonstradas para estimadores e testes sob hipóteses probabilísticas explícitas, inclusive especificação incorreta e dados dependentes."
    },
    "foundations": [
      {
        "en": "Probability convergence, expectation, information inequalities and differentiability under the integral sign.",
        "pt": "Convergências em probabilidade, esperança, desigualdades de informação e diferenciação sob o sinal de integral."
      },
      {
        "en": "Identifiability, likelihood, M-estimation, estimating equations, local asymptotic normality and empirical processes.",
        "pt": "Identificabilidade, verossimilhança, estimação M, equações de estimação, normalidade assintótica local e processos empíricos."
      }
    ],
    "fundamental": [
      {
        "en": "Under what conditions are estimators consistent, asymptotically normal or efficient? Which claims survive dependence or misspecification?",
        "pt": "Sob quais condições os estimadores são consistentes, assintoticamente normais ou eficientes? Quais conclusões sobrevivem à dependência ou à especificação incorreta?"
      }
    ],
    "contemporary": [
      {
        "en": "High-dimensional and semiparametric methods require explicit rates, nuisance-estimation conditions and sometimes orthogonal scores.",
        "pt": "Métodos semiparamétricos e de alta dimensão exigem taxas explícitas, condições para estimação de parâmetros de perturbação e, por vezes, escores ortogonais."
      }
    ],
    "learning": {
      "undergraduate": [
        {
          "en": "Study sufficient statistics, unbiasedness, likelihood and a proof of the central limit theorem at an appropriate level.",
          "pt": "Estude estatísticas suficientes, não tendenciosidade, verossimilhança e uma prova adequada do teorema central do limite."
        }
      ],
      "masters": [
        {
          "en": "Prove consistency and asymptotic normality for a regular M-estimator; compare sandwich and model-based covariance.",
          "pt": "Demonstre consistência e normalidade assintótica de um estimador M regular; compare covariâncias sanduíche e baseada no modelo."
        }
      ],
      "phd": [
        {
          "en": "Read van der Vaart and van der Vaart–Wellner, then audit differentiability, tightness and stochastic equicontinuity in a target manuscript.",
          "pt": "Leia van der Vaart e van der Vaart–Wellner; depois audite diferenciabilidade, compacidade assintótica e equicontinuidade estocástica em um manuscrito."
        }
      ]
    },
    "directions": [
      {
        "type": "extension",
        "text": {
          "en": "A plausible extension is to derive finite-sample or asymptotic validity of an estimating function under a specified dependent-data model.",
          "pt": "Uma extensão plausível é deduzir a validade finito-amostral ou assintótica de uma função de estimação sob um modelo de dependência especificado."
        }
      },
      {
        "type": "exercise",
        "text": {
          "en": "Compute Fisher information and a sandwich covariance for a deliberately misspecified one-parameter model.",
          "pt": "Calcule informação de Fisher e covariância sanduíche para um modelo uniparamétrico deliberadamente mal especificado."
        }
      }
    ],
    "connections": [
      {
        "id": "spatial-models",
        "note": {
          "en": "The central bridge is inference when observations are spatially dependent.",
          "pt": "A ponte central é a inferência para observações espacialmente dependentes."
        }
      },
      {
        "id": "causal",
        "note": {
          "en": "Semiparametric causal-effect estimation relies on valid identification, regularity conditions and asymptotic inference.",
          "pt": "A estimação semiparamétrica de efeitos causais depende de identificação válida, condições de regularidade e inferência assintótica."
        }
      }
    ],
    "addReferences": [
      {
        "authors": "Larry Wasserman",
        "title": "All of Statistics: A Concise Course in Statistical Inference",
        "year": 2004,
        "venue": "Springer, ISBN 9780387402727",
        "url": "https://doi.org/10.1007/978-0-387-21736-9",
        "note": {
          "en": "Builds a compact bridge from probability to estimation and testing.",
          "pt": "Constrói uma ponte concisa da probabilidade à estimação e aos testes."
        },
        "preparation": {
          "en": "Probability, calculus, basic statistical inference and linear algebra.",
          "pt": "Probabilidade, cálculo, inferência estatística básica e álgebra linear."
        },
        "why": {
          "en": "Read this work for its specific contribution to builds a compact bridge from probability to estimation and testing.",
          "pt": "Leia esta obra por sua contribuição específica: constrói uma ponte concisa da probabilidade à estimação e aos testes."
        },
        "stage": "undergraduate",
        "kind": "entry"
      },
      {
        "authors": "D. R. Cox; D. V. Hinkley",
        "title": "Theoretical Statistics",
        "year": 1974,
        "venue": "Chapman & Hall, ISBN 9780412124204",
        "url": "https://books.google.com/books?vid=ISBN9780412124204",
        "note": {
          "en": "Presents likelihood, testing and inferential principles with mathematical discipline.",
          "pt": "Apresenta verossimilhança, testes e princípios inferenciais com disciplina matemática."
        },
        "preparation": {
          "en": "Mathematical statistics, proof writing, likelihood and asymptotic arguments.",
          "pt": "Estatística matemática, demonstrações, verossimilhança e argumentos assintóticos."
        },
        "why": {
          "en": "Read this work for its specific contribution to presents likelihood, testing and inferential principles with mathematical discipline.",
          "pt": "Leia esta obra por sua contribuição específica: apresenta verossimilhança, testes e princípios inferenciais com disciplina matemática."
        },
        "stage": "masters",
        "kind": "foundation"
      },
      {
        "authors": "Whitney K. Newey; Daniel McFadden",
        "title": "Large sample estimation and hypothesis testing",
        "year": 1994,
        "venue": "Handbook of Econometrics, vol. 4, pp. 2111–2245, Elsevier",
        "url": "https://doi.org/10.1016/S1573-4412(05)80005-4",
        "note": {
          "en": "Collects generic regularity conditions and asymptotics for extremum estimators.",
          "pt": "Reúne condições de regularidade e assintótica gerais para estimadores de extremos."
        },
        "preparation": {
          "en": "Measure-theoretic probability, advanced inference and the article's technical assumptions.",
          "pt": "Probabilidade com teoria da medida, inferência avançada e hipóteses técnicas do artigo."
        },
        "why": {
          "en": "Read this work for its specific contribution to collects generic regularity conditions and asymptotics for extremum estimators.",
          "pt": "Leia esta obra por sua contribuição específica: reúne condições de regularidade e assintótica gerais para estimadores de extremos."
        },
        "stage": "phd",
        "kind": "next"
      },
      {
        "authors": "A. W. van der Vaart; Jon A. Wellner",
        "title": "Weak Convergence and Empirical Processes",
        "year": 1996,
        "venue": "Springer, ISBN 9780387946405",
        "url": "https://doi.org/10.1007/978-1-4757-2545-2",
        "note": {
          "en": "Supplies weak-convergence machinery for uniform stochastic arguments.",
          "pt": "Fornece a maquinaria de convergência fraca para argumentos estocásticos uniformes."
        },
        "preparation": {
          "en": "Measure-theoretic probability, advanced inference and the article's technical assumptions.",
          "pt": "Probabilidade com teoria da medida, inferência avançada e hipóteses técnicas do artigo."
        },
        "why": {
          "en": "Read this work for its specific contribution to supplies weak-convergence machinery for uniform stochastic arguments.",
          "pt": "Leia esta obra por sua contribuição específica: fornece a maquinaria de convergência fraca para argumentos estocásticos uniformes."
        },
        "stage": "phd",
        "kind": "advanced"
      },
      {
        "authors": "E. L. Lehmann; Joseph P. Romano",
        "title": "Testing Statistical Hypotheses, 3rd ed.",
        "year": 2005,
        "venue": "Springer, ISBN 9780387988641",
        "url": "https://doi.org/10.1007/0-387-27605-X",
        "note": {
          "en": "Develops test construction, optimality and large-sample testing.",
          "pt": "Desenvolve construção de testes, otimalidade e testes de grandes amostras."
        },
        "preparation": {
          "en": "Mathematical statistics, proof writing, likelihood and asymptotic arguments.",
          "pt": "Estatística matemática, demonstrações, verossimilhança e argumentos assintóticos."
        },
        "why": {
          "en": "Read this work for its specific contribution to develops test construction, optimality and large-sample testing.",
          "pt": "Leia esta obra por sua contribuição específica: desenvolve construção de testes, otimalidade e testes de grandes amostras."
        },
        "stage": "masters",
        "kind": "foundation"
      }
    ]
  },
  "sar": {
    "overview": {
      "en": "SAR and PolSAR measurements are generated by coherent sensing. Speckle, look aggregation, complex scattering vectors, covariance matrices and spatial correlation constrain defensible image statistics.",
      "pt": "Medições SAR e PolSAR provêm de sensoriamento coerente. Speckle, agregação de looks, vetores complexos de espalhamento, matrizes de covariância e correlação espacial restringem as estatísticas de imagem defensáveis."
    },
    "foundations": [
      {
        "en": "Complex circular random vectors, Hermitian positive-definite matrices and Wishart-type models.",
        "pt": "Vetores aleatórios complexos circulares, matrizes hermitianas positivas definidas e modelos do tipo Wishart."
      },
      {
        "en": "Multiplicative speckle, equivalent number of looks and bias–variance trade-offs in spatial filtering.",
        "pt": "Speckle multiplicativo, número equivalente de looks e compromisso viés–variância na filtragem espacial."
      }
    ],
    "fundamental": [
      {
        "en": "Which distributional properties arise from the acquisition chain, and which are modelling approximations? How do spatial correlation and texture affect inference?",
        "pt": "Quais propriedades distribucionais vêm da aquisição e quais são aproximações de modelagem? Como correlação espacial e textura afetam a inferência?"
      }
    ],
    "contemporary": [
      {
        "en": "Parametric and semiparametric modelling of polarimetric indices should respect their support and dependence, and predictive discrimination should be evaluated out of sample.",
        "pt": "Modelagem paramétrica e semiparamétrica de índices polarimétricos deve respeitar suporte e dependência, e discriminação preditiva deve ser avaliada fora da amostra."
      }
    ],
    "learning": {
      "undergraduate": [
        {
          "en": "Understand complex backscatter, image intensity and the physical origin of speckle before fitting a distribution.",
          "pt": "Compreenda retroespalhamento complexo, intensidade e a origem física do speckle antes de ajustar distribuições."
        }
      ],
      "masters": [
        {
          "en": "Derive single-look and multilook distributional assumptions; reproduce a controlled filter comparison.",
          "pt": "Deduza hipóteses distribucionais single-look e multilook; reproduza uma comparação controlada de filtros."
        }
      ],
      "phd": [
        {
          "en": "Read polarimetric covariance models and investigate inference for constrained indices with correlated pixels.",
          "pt": "Leia modelos de covariância polarimétrica e investigue inferência para índices restritos com pixels correlacionados."
        }
      ]
    },
    "directions": [
      {
        "type": "extension",
        "text": {
          "en": "A plausible extension is a dependence-aware uncertainty procedure for ENL or a bounded PolSAR index; literature novelty needs a targeted search.",
          "pt": "Uma extensão plausível é um procedimento de incerteza sensível à dependência para ENL ou índice PolSAR limitado; a novidade exige busca bibliográfica específica."
        }
      },
      {
        "type": "exercise",
        "text": {
          "en": "Simulate coherent complex Gaussian returns and compare empirical speckle contrast across look counts.",
          "pt": "Simule retornos gaussianos complexos coerentes e compare contraste empírico do speckle para diferentes looks."
        }
      }
    ],
    "connections": [
      {
        "id": "spatial-models",
        "note": {
          "en": "Local SAR windows contain correlated observations, so equivalent looks and confidence intervals need a spatial model.",
          "pt": "Janelas locais de SAR contêm observações correlacionadas; looks equivalentes e intervalos de confiança requerem modelo espacial."
        }
      },
      {
        "id": "regression",
        "note": {
          "en": "The published GAMLSS crop-discrimination study supplies a concrete application of distributional regression to PolSAR parameters.",
          "pt": "O estudo publicado de discriminação de culturas por GAMLSS oferece aplicação concreta da regressão distribucional a parâmetros PolSAR."
        }
      }
    ],
    "addReferences": [
      {
        "authors": "Joseph W. Goodman",
        "title": "Statistical Optics",
        "year": 1985,
        "venue": "Wiley, ISBN 9780471015024",
        "url": "https://books.google.com/books?vid=ISBN9780471015024",
        "note": {
          "en": "Explains statistical modelling of coherent optical fields and speckle.",
          "pt": "Explica a modelagem estatística de campos ópticos coerentes e speckle."
        },
        "preparation": {
          "en": "Mathematical statistics, proof writing, likelihood and asymptotic arguments.",
          "pt": "Estatística matemática, demonstrações, verossimilhança e argumentos assintóticos."
        },
        "why": {
          "en": "Read this work for its specific contribution to explains statistical modelling of coherent optical fields and speckle.",
          "pt": "Leia esta obra por sua contribuição específica: explica a modelagem estatística de campos ópticos coerentes e speckle."
        },
        "stage": "masters",
        "kind": "foundation"
      },
      {
        "authors": "Jong-Sen Lee",
        "title": "Speckle analysis and smoothing of synthetic aperture radar images",
        "year": 1981,
        "venue": "Computer Graphics and Image Processing, 17(1), 24–32",
        "url": "https://doi.org/10.1016/S0146-664X(81)80005-6",
        "note": {
          "en": "Connects the statistics of speckle to adaptive smoothing.",
          "pt": "Conecta estatísticas do speckle à suavização adaptativa."
        },
        "preparation": {
          "en": "Mathematical statistics, proof writing, likelihood and asymptotic arguments.",
          "pt": "Estatística matemática, demonstrações, verossimilhança e argumentos assintóticos."
        },
        "why": {
          "en": "Read this work for its specific contribution to connects the statistics of speckle to adaptive smoothing.",
          "pt": "Leia esta obra por sua contribuição específica: conecta estatísticas do speckle à suavização adaptativa."
        },
        "stage": "masters",
        "kind": "seminal"
      },
      {
        "authors": "Shane R. Cloude; Eric Pottier",
        "title": "An entropy based classification scheme for land applications of polarimetric SAR",
        "year": 1997,
        "venue": "IEEE Transactions on Geoscience and Remote Sensing, 35(1), 68–78",
        "url": "https://doi.org/10.1109/36.551935",
        "note": {
          "en": "Establishes entropy-based descriptors and a polarimetric classification framework.",
          "pt": "Estabelece descritores baseados em entropia e uma estrutura de classificação polarimétrica."
        },
        "preparation": {
          "en": "Mathematical statistics, proof writing, likelihood and asymptotic arguments.",
          "pt": "Estatística matemática, demonstrações, verossimilhança e argumentos assintóticos."
        },
        "why": {
          "en": "Read this work for its specific contribution to establishes entropy-based descriptors and a polarimetric classification framework.",
          "pt": "Leia esta obra por sua contribuição específica: estabelece descritores baseados em entropia e uma estrutura de classificação polarimétrica."
        },
        "stage": "masters",
        "kind": "seminal"
      },
      {
        "authors": "Jong-Sen Lee; Mitchell R. Grunes; Gianfranco de Grandi",
        "title": "Polarimetric SAR speckle filtering and its implication for classification",
        "year": 1999,
        "venue": "IEEE Transactions on Geoscience and Remote Sensing, 37(5), 2363–2373",
        "url": "https://doi.org/10.1109/36.789635",
        "note": {
          "en": "Shows why filtering a covariance representation affects downstream polarimetric classification.",
          "pt": "Mostra por que filtrar a representação de covariância afeta a classificação polarimétrica subsequente."
        },
        "preparation": {
          "en": "Measure-theoretic probability, advanced inference and the article's technical assumptions.",
          "pt": "Probabilidade com teoria da medida, inferência avançada e hipóteses técnicas do artigo."
        },
        "why": {
          "en": "Read this work for its specific contribution to shows why filtering a covariance representation affects downstream polarimetric classification.",
          "pt": "Leia esta obra por sua contribuição específica: mostra por que filtrar a representação de covariância afeta a classificação polarimétrica subsequente."
        },
        "stage": "phd",
        "kind": "next"
      }
    ]
  },
  "regression": {
    "overview": {
      "en": "Regression connects explanatory variables to conditional means, distributions or estimating equations. For repeated and correlated responses, GEE separates mean modelling from a working correlation while requiring suitable variance estimation.",
      "pt": "A regressão relaciona covariáveis a médias condicionais, distribuições ou equações de estimação. Para respostas repetidas e correlacionadas, GEE separa a modelagem da média de uma correlação de trabalho, exigindo estimação de variância apropriada."
    },
    "foundations": [
      {
        "en": "Exponential families, link functions, score equations and robust sandwich covariance.",
        "pt": "Famílias exponenciais, funções de ligação, equações de escore e covariância sanduíche robusta."
      },
      {
        "en": "Working correlation, cluster independence assumptions, missing-data mechanisms and distributional regression.",
        "pt": "Correlação de trabalho, hipóteses de independência entre grupos, mecanismos de ausência e regressão distribucional."
      }
    ],
    "fundamental": [
      {
        "en": "Which parameters remain interpretable under an incorrect working correlation? When are robust standard errors valid?",
        "pt": "Quais parâmetros permanecem interpretáveis sob correlação de trabalho incorreta? Quando erros-padrão robustos são válidos?"
      }
    ],
    "contemporary": [
      {
        "en": "Flexible distributional regression and doubly robust scores connect classical GEE to modern high-dimensional and causal methods, but prediction alone is not causal identification.",
        "pt": "Regressão distribucional flexível e escores duplamente robustos conectam GEE clássica a métodos modernos de alta dimensão e causais, mas predição isolada não identifica efeitos causais."
      }
    ],
    "learning": {
      "undergraduate": [
        {
          "en": "Fit and diagnose a GLM, explaining response distribution, link and estimand.",
          "pt": "Ajuste e diagnostique um GLM, explicando distribuição da resposta, ligação e estimando."
        }
      ],
      "masters": [
        {
          "en": "Derive GEE and compare independence, exchangeable and AR(1) working correlation via simulation.",
          "pt": "Deduza GEE e compare estruturas de correlação de trabalho independente, permutável e AR(1) por simulação."
        }
      ],
      "phd": [
        {
          "en": "Read misspecified likelihood and estimating-function theory; establish the exact cluster asymptotics of a proposed extension.",
          "pt": "Leia teoria de verossimilhança mal especificada e de funções de estimação; estabeleça a assintótica por grupos exata de uma extensão proposta."
        }
      ]
    },
    "directions": [
      {
        "type": "extension",
        "text": {
          "en": "A plausible extension is a robust estimating equation for non-Gaussian dependent image responses, with explicit regularity conditions.",
          "pt": "Uma extensão plausível é uma equação de estimação robusta para respostas de imagens não gaussianas dependentes, sob condições de regularidade explícitas."
        }
      },
      {
        "type": "exercise",
        "text": {
          "en": "Derive the GEE sandwich covariance for a balanced two-observation cluster.",
          "pt": "Deduza a covariância sanduíche de GEE para grupos balanceados de duas observações."
        }
      }
    ],
    "connections": [
      {
        "id": "causal",
        "note": {
          "en": "Outcome regression is one component of causal estimators only after assumptions identify the estimand.",
          "pt": "Regressão do desfecho é componente de estimadores causais somente após hipóteses identificarem o estimando."
        }
      },
      {
        "id": "sar",
        "note": {
          "en": "GAMLSS provides a distributional regression bridge to observed PolSAR parameters.",
          "pt": "GAMLSS fornece uma ponte de regressão distribucional para parâmetros PolSAR observados."
        }
      }
    ],
    "addReferences": [
      {
        "authors": "John A. Nelder; Robert W. M. Wedderburn",
        "title": "Generalized Linear Models",
        "year": 1972,
        "venue": "Journal of the Royal Statistical Society, Series A, 135(3), 370–384",
        "url": "https://doi.org/10.2307/2344614",
        "note": {
          "en": "Introduces the general GLM framework.",
          "pt": "Introduz a estrutura geral de modelos lineares generalizados."
        },
        "preparation": {
          "en": "Probability, calculus, basic statistical inference and linear algebra.",
          "pt": "Probabilidade, cálculo, inferência estatística básica e álgebra linear."
        },
        "why": {
          "en": "Read this work for its specific contribution to introduces the general GLM framework.",
          "pt": "Leia esta obra por sua contribuição específica: introduz a estrutura geral de modelos lineares generalizados."
        },
        "stage": "undergraduate",
        "kind": "seminal"
      },
      {
        "authors": "Scott L. Zeger; Kung-Yee Liang; Paul S. Albert",
        "title": "Models for longitudinal data: a generalized estimating equation approach",
        "year": 1988,
        "venue": "Biometrics, 44(4), 1049–1060",
        "url": "https://doi.org/10.2307/2531734",
        "note": {
          "en": "Extends marginal estimating equations for repeated measurements.",
          "pt": "Estende equações de estimação marginais para medidas repetidas."
        },
        "preparation": {
          "en": "Mathematical statistics, proof writing, likelihood and asymptotic arguments.",
          "pt": "Estatística matemática, demonstrações, verossimilhança e argumentos assintóticos."
        },
        "why": {
          "en": "Read this work for its specific contribution to extends marginal estimating equations for repeated measurements.",
          "pt": "Leia esta obra por sua contribuição específica: estende equações de estimação marginais para medidas repetidas."
        },
        "stage": "masters",
        "kind": "seminal"
      },
      {
        "authors": "V. P. Godambe (editor)",
        "title": "Estimating Functions",
        "year": 1991,
        "venue": "Oxford University Press, ISBN 9780198522287",
        "url": "https://doi.org/10.1093/oso/9780198522287.001.0001",
        "note": {
          "en": "Collects the theory of estimating functions beyond full likelihood.",
          "pt": "Reúne a teoria de funções de estimação para além da verossimilhança completa."
        },
        "preparation": {
          "en": "Measure-theoretic probability, advanced inference and the article's technical assumptions.",
          "pt": "Probabilidade com teoria da medida, inferência avançada e hipóteses técnicas do artigo."
        },
        "why": {
          "en": "Read this work for its specific contribution to collects the theory of estimating functions beyond full likelihood.",
          "pt": "Leia esta obra por sua contribuição específica: reúne a teoria de funções de estimação para além da verossimilhança completa."
        },
        "stage": "phd",
        "kind": "foundation"
      },
      {
        "authors": "James W. Hardin; Joseph M. Hilbe",
        "title": "Generalized Estimating Equations, 2nd ed.",
        "year": 2013,
        "venue": "Chapman & Hall/CRC, ISBN 9781439881132",
        "url": "https://www.routledge.com/Generalized-Estimating-Equations-Second-Edition/Hardin-Hilbe/p/book/9781439881132",
        "note": {
          "en": "Guides modelling, correlation choices and robust inference for GEE.",
          "pt": "Orienta modelagem, escolha de correlação e inferência robusta para GEE."
        },
        "preparation": {
          "en": "Mathematical statistics, proof writing, likelihood and asymptotic arguments.",
          "pt": "Estatística matemática, demonstrações, verossimilhança e argumentos assintóticos."
        },
        "why": {
          "en": "Read this work for its specific contribution to guides modelling, correlation choices and robust inference for GEE.",
          "pt": "Leia esta obra por sua contribuição específica: orienta modelagem, escolha de correlação e inferência robusta para GEE."
        },
        "stage": "masters",
        "kind": "next"
      },
      {
        "authors": "Halbert White",
        "title": "Maximum Likelihood Estimation of Misspecified Models",
        "year": 1982,
        "venue": "Econometrica, 50(1), 1–25",
        "url": "https://doi.org/10.2307/1912526",
        "note": {
          "en": "Clarifies quasi-maximum likelihood limits and covariance under misspecification.",
          "pt": "Esclarece limites da quase-máxima verossimilhança e covariância sob especificação incorreta."
        },
        "preparation": {
          "en": "Measure-theoretic probability, advanced inference and the article's technical assumptions.",
          "pt": "Probabilidade com teoria da medida, inferência avançada e hipóteses técnicas do artigo."
        },
        "why": {
          "en": "Read this work for its specific contribution to clarifies quasi-maximum likelihood limits and covariance under misspecification.",
          "pt": "Leia esta obra por sua contribuição específica: esclarece limites da quase-máxima verossimilhança e covariância sob especificação incorreta."
        },
        "stage": "phd",
        "kind": "seminal"
      }
    ]
  },
  "time-series": {
    "overview": {
      "en": "Time-series models describe dependence over time. Conditions such as stationarity, ergodicity and mixing support inference; forecasting quality and inferential validity are distinct targets.",
      "pt": "Modelos de séries temporais descrevem dependência no tempo. Condições como estacionariedade, ergodicidade e mistura fundamentam a inferência; qualidade preditiva e validade inferencial são objetivos distintos."
    },
    "foundations": [
      {
        "en": "Autocovariance, spectral density, innovations, causal/invertible ARMA representations and martingales.",
        "pt": "Autocovariância, densidade espectral, inovações, representações ARMA causais/invertíveis e martingais."
      },
      {
        "en": "Stationarity, ergodic theorems, mixing conditions and asymptotics for dependent observations.",
        "pt": "Estacionariedade, teoremas ergódicos, condições de mistura e assintótica de observações dependentes."
      }
    ],
    "fundamental": [
      {
        "en": "When does a time-recursive specification produce a stationary process? What do residual diagnostics actually test?",
        "pt": "Quando uma especificação recursiva produz processo estacionário? O que diagnósticos de resíduos efetivamente testam?"
      }
    ],
    "contemporary": [
      {
        "en": "Non-Gaussian observation-driven models and state-space approaches extend classical ARMA, but model-dependent existence and inference need separate proofs.",
        "pt": "Modelos não gaussianos dirigidos por observações e abordagens de espaço de estados estendem ARMA clássico, mas existência e inferência dependentes do modelo exigem provas próprias."
      }
    ],
    "learning": {
      "undergraduate": [
        {
          "en": "Compute autocovariance and simulate an AR(1), checking empirical stationarity.",
          "pt": "Calcule autocovariância e simule AR(1), verificando estacionariedade empírica."
        }
      ],
      "masters": [
        {
          "en": "Derive invertibility and stationarity restrictions; study likelihood and residual portmanteau diagnostics.",
          "pt": "Deduza restrições de invertibilidade e estacionariedade; estude verossimilhança e diagnósticos portmanteau dos resíduos."
        }
      ],
      "phd": [
        {
          "en": "Investigate dependence assumptions for an observation-driven non-Gaussian process and justify a residual asymptotic law.",
          "pt": "Investigue hipóteses de dependência de processo não gaussiano dirigido por observações e justifique uma lei assintótica residual."
        }
      ]
    },
    "directions": [
      {
        "type": "extension",
        "text": {
          "en": "A plausible extension is a residual diagnostic for a specified conditional non-Gaussian spatial-temporal ARMA model, with an explicit asymptotic regime.",
          "pt": "Uma extensão plausível é um diagnóstico residual para modelo ARMA espaço-temporal condicional não gaussiano especificado, com regime assintótico explícito."
        }
      },
      {
        "type": "exercise",
        "text": {
          "en": "Show by simulation that Ljung–Box calibration can fail after ignoring dependence or parameter estimation.",
          "pt": "Mostre por simulação que a calibração de Ljung–Box pode falhar quando se ignora dependência ou estimação de parâmetros."
        }
      }
    ],
    "connections": [
      {
        "id": "spatial-models",
        "note": {
          "en": "The user's published generalized-gamma ARMA work for SAR data motivates careful distinctions between temporal and spatial conditioning.",
          "pt": "O trabalho publicado de ARMA gama generalizada para dados SAR motiva distinguir cuidadosamente condicionamento temporal e espacial."
        }
      },
      {
        "id": "theory",
        "note": {
          "en": "Dependence assumptions determine whether the estimated parameter and residual statistics have claimed limit laws.",
          "pt": "Hipóteses de dependência determinam se parâmetros estimados e estatísticas residuais têm as leis-limite alegadas."
        }
      }
    ],
    "addReferences": [
      {
        "authors": "Peter J. Brockwell; Richard A. Davis",
        "title": "Time Series: Theory and Methods, 2nd ed.",
        "year": 1991,
        "venue": "Springer, ISBN 9780387974293",
        "url": "https://doi.org/10.1007/978-1-4419-0320-4",
        "note": {
          "en": "Provides foundational stochastic and inferential results for ARMA processes.",
          "pt": "Fornece resultados estocásticos e inferenciais fundamentais para processos ARMA."
        },
        "preparation": {
          "en": "Mathematical statistics, proof writing, likelihood and asymptotic arguments.",
          "pt": "Estatística matemática, demonstrações, verossimilhança e argumentos assintóticos."
        },
        "why": {
          "en": "Read this work for its specific contribution to provides foundational stochastic and inferential results for ARMA processes.",
          "pt": "Leia esta obra por sua contribuição específica: fornece resultados estocásticos e inferenciais fundamentais para processos ARMA."
        },
        "stage": "masters",
        "kind": "foundation"
      },
      {
        "authors": "James Durbin; Siem Jan Koopman",
        "title": "Time Series Analysis by State Space Methods, 2nd ed.",
        "year": 2012,
        "venue": "Oxford University Press, ISBN 9780199641178",
        "url": "https://doi.org/10.1093/acprof:oso/9780199641178.001.0001",
        "note": {
          "en": "Builds state-space filtering and likelihood-based analysis.",
          "pt": "Desenvolve filtragem em espaço de estados e análise por verossimilhança."
        },
        "preparation": {
          "en": "Mathematical statistics, proof writing, likelihood and asymptotic arguments.",
          "pt": "Estatística matemática, demonstrações, verossimilhança e argumentos assintóticos."
        },
        "why": {
          "en": "Read this work for its specific contribution to builds state-space filtering and likelihood-based analysis.",
          "pt": "Leia esta obra por sua contribuição específica: desenvolve filtragem em espaço de estados e análise por verossimilhança."
        },
        "stage": "masters",
        "kind": "next"
      },
      {
        "authors": "Paul Doukhan",
        "title": "Mixing: Properties and Examples",
        "year": 1994,
        "venue": "Springer, ISBN 9780387942148",
        "url": "https://doi.org/10.1007/978-1-4612-2642-0",
        "note": {
          "en": "Provides dependence conditions used in probability limit theorems.",
          "pt": "Fornece condições de dependência usadas em teoremas-limite de probabilidade."
        },
        "preparation": {
          "en": "Measure-theoretic probability, advanced inference and the article's technical assumptions.",
          "pt": "Probabilidade com teoria da medida, inferência avançada e hipóteses técnicas do artigo."
        },
        "why": {
          "en": "Read this work for its specific contribution to provides dependence conditions used in probability limit theorems.",
          "pt": "Leia esta obra por sua contribuição específica: fornece condições de dependência usadas em teoremas-limite de probabilidade."
        },
        "stage": "phd",
        "kind": "advanced"
      },
      {
        "authors": "Greta M. Ljung; George E. P. Box",
        "title": "On a measure of lack of fit in time series models",
        "year": 1978,
        "venue": "Biometrika, 65(2), 297–303",
        "url": "https://doi.org/10.1093/biomet/65.2.297",
        "note": {
          "en": "Introduces a residual portmanteau statistic whose calibration depends on the fitted model.",
          "pt": "Introduz estatística portmanteau residual cuja calibração depende do modelo ajustado."
        },
        "preparation": {
          "en": "Mathematical statistics, proof writing, likelihood and asymptotic arguments.",
          "pt": "Estatística matemática, demonstrações, verossimilhança e argumentos assintóticos."
        },
        "why": {
          "en": "Read this work for its specific contribution to introduces a residual portmanteau statistic whose calibration depends on the fitted model.",
          "pt": "Leia esta obra por sua contribuição específica: introduz estatística portmanteau residual cuja calibração depende do modelo ajustado."
        },
        "stage": "masters",
        "kind": "seminal"
      },
      {
        "authors": "James D. Hamilton",
        "title": "Time Series Analysis",
        "year": 1994,
        "venue": "Princeton University Press, ISBN 9780691042893",
        "url": "https://books.google.com/books?vid=ISBN9780691042893",
        "note": {
          "en": "Develops advanced time-series theory and econometric applications.",
          "pt": "Desenvolve teoria avançada de séries temporais e aplicações econométricas."
        },
        "preparation": {
          "en": "Measure-theoretic probability, advanced inference and the article's technical assumptions.",
          "pt": "Probabilidade com teoria da medida, inferência avançada e hipóteses técnicas do artigo."
        },
        "why": {
          "en": "Read this work for its specific contribution to develops advanced time-series theory and econometric applications.",
          "pt": "Leia esta obra por sua contribuição específica: desenvolve teoria avançada de séries temporais e aplicações econométricas."
        },
        "stage": "phd",
        "kind": "foundation"
      }
    ]
  },
  "geometry": {
    "overview": {
      "en": "Information geometry studies statistical families as geometric objects. Fisher's metric, affine connections and divergences provide distinct but related structures; none should be substituted for another without assumptions.",
      "pt": "A geometria da informação estuda famílias estatísticas como objetos geométricos. Métrica de Fisher, conexões afins e divergências fornecem estruturas distintas, porém relacionadas; não devem ser confundidas sem hipóteses."
    },
    "foundations": [
      {
        "en": "Differential geometry: manifolds, tangent vectors, tensors, affine connections and geodesics.",
        "pt": "Geometria diferencial: variedades, vetores tangentes, tensores, conexões afins e geodésicas."
      },
      {
        "en": "Parametric statistical models, score vectors, Fisher information and regular exponential families.",
        "pt": "Modelos estatísticos paramétricos, escores, informação de Fisher e famílias exponenciais regulares."
      }
    ],
    "fundamental": [
      {
        "en": "Which divergence induces which local metric or connection? How are invariance and efficiency expressed geometrically?",
        "pt": "Qual divergência induz qual métrica local ou conexão? Como invariância e eficiência são expressas geometricamente?"
      }
    ],
    "contemporary": [
      {
        "en": "Optimal transport and geometric optimization offer additional lenses, but their metrics and hypotheses differ from Fisher–Rao geometry.",
        "pt": "Transporte ótimo e otimização geométrica oferecem outras perspectivas, mas suas métricas e hipóteses diferem da geometria de Fisher–Rao."
      }
    ],
    "learning": {
      "undergraduate": [
        {
          "en": "Review multivariable calculus and Fisher information for a one-parameter exponential family.",
          "pt": "Revise cálculo multivariado e informação de Fisher em família exponencial uniparamétrica."
        }
      ],
      "masters": [
        {
          "en": "Derive Fisher–Rao metric and inspect KL-divergence's local second-order expansion.",
          "pt": "Deduza a métrica de Fisher–Rao e examine a expansão local de segunda ordem da divergência KL."
        }
      ],
      "phd": [
        {
          "en": "Read Amari–Nagaoka and Chentsov; distinguish invariant metrics, dual connections and application-specific divergences.",
          "pt": "Leia Amari–Nagaoka e Chentsov; diferencie métricas invariantes, conexões duais e divergências específicas de aplicação."
        }
      ]
    },
    "directions": [
      {
        "type": "extension",
        "text": {
          "en": "A plausible extension is to characterize the induced information metric of a constrained SAR index distribution after checking regularity.",
          "pt": "Uma extensão plausível é caracterizar a métrica de informação induzida por distribuição restrita de índice SAR após conferir regularidade."
        }
      },
      {
        "type": "exercise",
        "text": {
          "en": "Compute the Fisher–Rao length along a Bernoulli family and compare parameterizations.",
          "pt": "Calcule comprimento de Fisher–Rao ao longo da família Bernoulli e compare parametrizações."
        }
      }
    ],
    "connections": [
      {
        "id": "theory",
        "note": {
          "en": "Fisher information is a shared object, but a geometric interpretation does not replace an inferential proof.",
          "pt": "A informação de Fisher é objeto comum, mas interpretação geométrica não substitui prova inferencial."
        }
      },
      {
        "id": "sar",
        "note": {
          "en": "Geometric distances between polarimetric distributions require valid distributional support and estimation assumptions.",
          "pt": "Distâncias geométricas entre distribuições polarimétricas requerem suporte distribucional válido e hipóteses de estimação."
        }
      }
    ],
    "addReferences": [
      {
        "authors": "Shun-ichi Amari",
        "title": "Differential-Geometrical Methods in Statistics",
        "year": 1985,
        "venue": "Springer, Lecture Notes in Statistics 28",
        "url": "https://doi.org/10.1007/978-1-4612-5056-2",
        "note": {
          "en": "Introduces differential-geometric tools for statistical inference.",
          "pt": "Introduz ferramentas de geometria diferencial para inferência estatística."
        },
        "preparation": {
          "en": "Measure-theoretic probability, advanced inference and the article's technical assumptions.",
          "pt": "Probabilidade com teoria da medida, inferência avançada e hipóteses técnicas do artigo."
        },
        "why": {
          "en": "Read this work for its specific contribution to introduces differential-geometric tools for statistical inference.",
          "pt": "Leia esta obra por sua contribuição específica: introduz ferramentas de geometria diferencial para inferência estatística."
        },
        "stage": "phd",
        "kind": "seminal"
      },
      {
        "authors": "Frank Nielsen",
        "title": "An Elementary Introduction to Information Geometry",
        "year": 2020,
        "venue": "Entropy, 22(10), 1100",
        "url": "https://doi.org/10.3390/e22101100",
        "note": {
          "en": "Surveys divergences, dual structures and statistical manifolds with accessible examples.",
          "pt": "Apresenta divergências, estruturas duais e variedades estatísticas com exemplos acessíveis."
        },
        "preparation": {
          "en": "Probability, calculus, basic statistical inference and linear algebra.",
          "pt": "Probabilidade, cálculo, inferência estatística básica e álgebra linear."
        },
        "why": {
          "en": "Read this work for its specific contribution to surveys divergences, dual structures and statistical manifolds with accessible examples.",
          "pt": "Leia esta obra por sua contribuição específica: apresenta divergências, estruturas duais e variedades estatísticas com exemplos acessíveis."
        },
        "stage": "undergraduate",
        "kind": "entry"
      },
      {
        "authors": "Nihat Ay; Jürgen Jost; Hông Vân Lê; Lorenz Schwachhöfer",
        "title": "Information Geometry",
        "year": 2017,
        "venue": "Springer, Ergebnisse der Mathematik, vol. 64",
        "url": "https://doi.org/10.1007/978-3-319-56478-4",
        "note": {
          "en": "Develops modern manifold-theoretic foundations.",
          "pt": "Desenvolve fundamentos modernos baseados na teoria de variedades."
        },
        "preparation": {
          "en": "Measure-theoretic probability, advanced inference and the article's technical assumptions.",
          "pt": "Probabilidade com teoria da medida, inferência avançada e hipóteses técnicas do artigo."
        },
        "why": {
          "en": "Read this work for its specific contribution to develops modern manifold-theoretic foundations.",
          "pt": "Leia esta obra por sua contribuição específica: desenvolve fundamentos modernos baseados na teoria de variedades."
        },
        "stage": "phd",
        "kind": "advanced"
      },
      {
        "authors": "N. N. Chentsov",
        "title": "Statistical Decision Rules and Optimal Inference",
        "year": 1982,
        "venue": "American Mathematical Society, Translations of Mathematical Monographs 53, ISBN 9780821845028",
        "url": "https://books.google.com/books?vid=ISBN9780821845028",
        "note": {
          "en": "Grounds invariance arguments for statistical structure; original formulation requires advanced preparation.",
          "pt": "Fundamenta argumentos de invariância da estrutura estatística; a formulação original exige formação avançada."
        },
        "preparation": {
          "en": "Measure-theoretic probability, advanced inference and the article's technical assumptions.",
          "pt": "Probabilidade com teoria da medida, inferência avançada e hipóteses técnicas do artigo."
        },
        "why": {
          "en": "Read this work for its specific contribution to grounds invariance arguments for statistical structure; original formulation requires advanced preparation.",
          "pt": "Leia esta obra por sua contribuição específica: fundamenta argumentos de invariância da estrutura estatística; a formulação original exige formação avançada."
        },
        "stage": "phd",
        "kind": "seminal"
      },
      {
        "authors": "Bradley Efron",
        "title": "Defining the curvature of a statistical problem (with applications to second order efficiency)",
        "year": 1975,
        "venue": "Annals of Statistics, 3(6), 1189–1242",
        "url": "https://doi.org/10.1214/aos/1176343282",
        "note": {
          "en": "Connects statistical curvature and higher-order efficiency.",
          "pt": "Relaciona curvatura estatística e eficiência de segunda ordem."
        },
        "preparation": {
          "en": "Measure-theoretic probability, advanced inference and the article's technical assumptions.",
          "pt": "Probabilidade com teoria da medida, inferência avançada e hipóteses técnicas do artigo."
        },
        "why": {
          "en": "Read this work for its specific contribution to connects statistical curvature and higher-order efficiency.",
          "pt": "Leia esta obra por sua contribuição específica: relaciona curvatura estatística e eficiência de segunda ordem."
        },
        "stage": "phd",
        "kind": "advanced"
      }
    ]
  }
};
  const causal = {
  "id": "causal",
  "question": {
    "en": "What assumptions identify the effect of an intervention, and how can that estimand be estimated from data?",
    "pt": "Quais hipóteses identificam o efeito de uma intervenção e como estimar esse estimando a partir de dados?"
  },
  "entry": {
    "en": "Causal identification and statistical estimation are separate steps. Potential outcomes, structural causal models and research designs clarify the target and assumptions; regression or machine learning alone cannot remove unmeasured confounding.",
    "pt": "Identificação causal e estimação estatística são etapas distintas. Resultados potenciais, modelos causais estruturais e delineamentos esclarecem o alvo e as hipóteses; regressão ou aprendizado de máquina isolados não eliminam confundimento não medido."
  },
  "background": {
    "en": "Probability, mathematical statistics, regression and experimental design; advanced reading: semiparametric theory and empirical processes.",
    "pt": "Probabilidade, estatística matemática, regressão e delineamento experimental; para leitura avançada: teoria semiparamétrica e processos empíricos."
  },
  "overview": {
    "en": "A causal estimand, such as an average treatment effect, must be identified from observable quantities under a research design or explicit structural assumptions before an estimation procedure is selected. Predictive accuracy is not an identification criterion.",
    "pt": "Um estimando causal, como o efeito médio de tratamento, precisa ser identificado por quantidades observáveis sob delineamento ou hipóteses estruturais explícitas antes de escolher o estimador. Acurácia preditiva não é critério de identificação."
  },
  "foundations": [
    {
      "en": "Potential outcomes, SUTVA/consistency, exchangeability, positivity and treatment assignment.",
      "pt": "Resultados potenciais, SUTVA/consistência, intercambialidade, positividade e atribuição de tratamento."
    },
    {
      "en": "Causal directed acyclic graphs, structural models, backdoor criteria, instrumental-variable assumptions and selection mechanisms.",
      "pt": "Grafos direcionados acíclicos causais, modelos estruturais, critério backdoor, hipóteses de variáveis instrumentais e mecanismos de seleção."
    },
    {
      "en": "Randomized experiments, propensity scores, longitudinal g-methods, regression discontinuity, difference-in-differences and semiparametric orthogonal scores.",
      "pt": "Experimentos aleatorizados, escores de propensão, métodos g longitudinais, regressão descontínua, diferenças-em-diferenças e escores ortogonais semiparamétricos."
    }
  ],
  "fundamental": [
    {
      "en": "What estimand is identified by a design? Which assumptions are empirically testable and which are not? What population does the result concern?",
      "pt": "Qual estimando é identificado pelo delineamento? Quais hipóteses podem ser testadas empiricamente e quais não? A que população se refere o resultado?"
    },
    {
      "en": "How are interference, time-varying confounding, noncompliance and heterogeneous effects handled?",
      "pt": "Como tratar interferência, confundimento que varia no tempo, não adesão e efeitos heterogêneos?"
    }
  ],
  "contemporary": [
    {
      "en": "Modern difference-in-differences estimators address heterogeneous treatment timing; assumptions about untreated trends remain substantive.",
      "pt": "Estimadores modernos de diferenças-em-diferenças abordam adoção de tratamento em tempos distintos; hipóteses sobre tendências sem tratamento continuam substantivas."
    },
    {
      "en": "Double/debiased machine learning uses nuisance learners and orthogonal scores; its validity still depends on identification, rate and sample-splitting conditions.",
      "pt": "Double/debiased machine learning usa aprendizes de funções auxiliares e escores ortogonais; sua validade ainda depende de identificação, taxas e condições de divisão da amostra."
    }
  ],
  "path": [
    {
      "en": "Begin with randomized experiments and potential outcomes in Hernán–Robins or Imbens–Rubin.",
      "pt": "Comece com experimentos aleatorizados e resultados potenciais em Hernán–Robins ou Imbens–Rubin."
    },
    {
      "en": "Compare Rosenbaum–Rubin propensity scores with Pearl's graph-based identification vocabulary.",
      "pt": "Compare escores de propensão de Rosenbaum–Rubin com o vocabulário de identificação por grafos de Pearl."
    },
    {
      "en": "Read instrumental variables, g-methods, modern difference-in-differences, heterogeneous effects and orthogonal estimation, tracking each assumption.",
      "pt": "Leia variáveis instrumentais, métodos g, diferenças-em-diferenças modernas, efeitos heterogêneos e estimação ortogonal, acompanhando cada hipótese."
    }
  ],
  "learning": {
    "undergraduate": [
      {
        "en": "Define potential outcomes and estimate a randomized-trial average effect with uncertainty; state the target population.",
        "pt": "Defina resultados potenciais e estime efeito médio em experimento aleatorizado com incerteza; informe a população-alvo."
      },
      {
        "en": "Draw DAGs with confounders, mediators and colliders; explain why conditioning on each differs.",
        "pt": "Desenhe DAGs com confundidores, mediadores e colisores; explique por que condicioná-los produz efeitos distintos."
      }
    ],
    "masters": [
      {
        "en": "Derive identification under conditional exchangeability and overlap; compare regression and inverse-probability weighting.",
        "pt": "Deduza identificação sob intercambialidade condicional e sobreposição; compare regressão e ponderação pelo inverso da probabilidade."
      },
      {
        "en": "Work through an instrument or regression-discontinuity estimand, stating exclusion or continuity assumptions.",
        "pt": "Estude estimando por instrumento ou regressão descontínua, explicitando hipóteses de exclusão ou continuidade."
      }
    ],
    "phd": [
      {
        "en": "Study g-methods with time-varying confounding and influence-function-based estimators.",
        "pt": "Estude métodos g com confundimento variável no tempo e estimadores baseados em funções de influência."
      },
      {
        "en": "Derive an orthogonal moment for a target parameter and check nuisance-estimation rates and sample splitting.",
        "pt": "Deduza um momento ortogonal para parâmetro-alvo e verifique taxas de estimação de funções auxiliares e divisão da amostra."
      }
    ]
  },
  "directions": [
    {
      "type": "extension",
      "text": {
        "en": "A plausible extension is causal effect estimation under a precisely specified spatial-interference or dependent-sampling structure; review its identification literature first.",
        "pt": "Uma extensão plausível é estimar efeitos causais sob estrutura precisamente especificada de interferência espacial ou amostragem dependente; revise primeiro a literatura de identificação correspondente."
      }
    },
    {
      "type": "exercise",
      "text": {
        "en": "Construct two causal DAGs with the same observed association but different intervention effects.",
        "pt": "Construa dois DAGs causais com a mesma associação observada, porém diferentes efeitos de intervenção."
      }
    }
  ],
  "connections": [
    {
      "id": "regression",
      "note": {
        "en": "Outcome models and GEE may contribute to effect estimation, but must be tied to a valid causal estimand and design.",
        "pt": "Modelos de desfecho e GEE podem contribuir à estimação de efeito, mas devem se vincular a estimando causal e delineamento válidos."
      }
    },
    {
      "id": "theory",
      "note": {
        "en": "Inference for causal estimators requires regularity, nuisance-function estimation and asymptotic uncertainty; none repairs failed identification.",
        "pt": "A inferência para estimadores causais exige regularidade, estimação de funções auxiliares e análise da incerteza assintótica; nada disso corrige falhas de identificação."
      }
    },
    {
      "id": "spatial-models",
      "note": {
        "en": "Spatial spillovers challenge no-interference assumptions and require a changed estimand or exposure mapping.",
        "pt": "Transbordamentos espaciais desafiam a ausência de interferência e requerem estimando modificado ou mapeamento de exposição."
      }
    }
  ],
  "references": [
    {
      "authors": "Donald B. Rubin",
      "title": "Estimating causal effects of treatments in randomized and nonrandomized studies",
      "year": 1974,
      "venue": "Journal of Educational Psychology, 66(5), 688–701",
      "url": "https://doi.org/10.1037/h0037350",
      "note": {
        "en": "Develops the potential-outcomes formulation of causal effects.",
        "pt": "Desenvolve formulação de efeitos causais por resultados potenciais."
      },
      "preparation": {
        "en": "Probability, calculus, basic statistical inference and linear algebra.",
        "pt": "Probabilidade, cálculo, inferência estatística básica e álgebra linear."
      },
      "why": {
        "en": "Read this work for its specific contribution to develops the potential-outcomes formulation of causal effects.",
        "pt": "Leia esta obra por sua contribuição específica: desenvolve formulação de efeitos causais por resultados potenciais."
      },
      "stage": "undergraduate",
      "kind": "seminal"
    },
    {
      "authors": "Paul R. Rosenbaum; Donald B. Rubin",
      "title": "The central role of the propensity score in observational studies for causal effects",
      "year": 1983,
      "venue": "Biometrika, 70(1), 41–55",
      "url": "https://doi.org/10.1093/biomet/70.1.41",
      "note": {
        "en": "Establishes balancing-score arguments under strong ignorability.",
        "pt": "Estabelece argumentos de escore balanceador sob ignorabilidade forte."
      },
      "preparation": {
        "en": "Mathematical statistics, proof writing, likelihood and asymptotic arguments.",
        "pt": "Estatística matemática, demonstrações, verossimilhança e argumentos assintóticos."
      },
      "why": {
        "en": "Read this work for its specific contribution to establishes balancing-score arguments under strong ignorability.",
        "pt": "Leia esta obra por sua contribuição específica: estabelece argumentos de escore balanceador sob ignorabilidade forte."
      },
      "stage": "masters",
      "kind": "seminal"
    },
    {
      "authors": "Guido W. Imbens; Donald B. Rubin",
      "title": "Causal Inference for Statistics, Social, and Biomedical Sciences",
      "year": 2015,
      "venue": "Cambridge University Press, ISBN 9780521885881",
      "url": "https://doi.org/10.1017/CBO9781139025751",
      "note": {
        "en": "Develops design- and potential-outcomes-based inference.",
        "pt": "Desenvolve inferência baseada em delineamentos e resultados potenciais."
      },
      "preparation": {
        "en": "Probability, calculus, basic statistical inference and linear algebra.",
        "pt": "Probabilidade, cálculo, inferência estatística básica e álgebra linear."
      },
      "why": {
        "en": "Read this work for its specific contribution to develops design- and potential-outcomes-based inference.",
        "pt": "Leia esta obra por sua contribuição específica: desenvolve inferência baseada em delineamentos e resultados potenciais."
      },
      "stage": "undergraduate",
      "kind": "foundation"
    },
    {
      "authors": "Judea Pearl",
      "title": "Causality: Models, Reasoning, and Inference, 2nd ed.",
      "year": 2009,
      "venue": "Cambridge University Press, ISBN 9780521895606",
      "url": "https://doi.org/10.1017/CBO9780511803161",
      "note": {
        "en": "Develops structural causal models, intervention calculus and identification using graphs.",
        "pt": "Desenvolve modelos causais estruturais, cálculo de intervenções e identificação com grafos."
      },
      "preparation": {
        "en": "Mathematical statistics, proof writing, likelihood and asymptotic arguments.",
        "pt": "Estatística matemática, demonstrações, verossimilhança e argumentos assintóticos."
      },
      "why": {
        "en": "Read this work for its specific contribution to develops structural causal models, intervention calculus and identification using graphs.",
        "pt": "Leia esta obra por sua contribuição específica: desenvolve modelos causais estruturais, cálculo de intervenções e identificação com grafos."
      },
      "stage": "masters",
      "kind": "foundation"
    },
    {
      "authors": "Miguel A. Hernán; James M. Robins",
      "title": "Causal Inference: What If",
      "year": 2020,
      "venue": "Chapman & Hall/CRC, freely available author-hosted text",
      "url": "https://www.hsph.harvard.edu/miguel-hernan/causal-inference-book/",
      "note": {
        "en": "Connects target trials, observational identification and longitudinal methods.",
        "pt": "Conecta ensaios-alvo, identificação observacional e métodos longitudinais."
      },
      "preparation": {
        "en": "Probability, calculus, basic statistical inference and linear algebra.",
        "pt": "Probabilidade, cálculo, inferência estatística básica e álgebra linear."
      },
      "why": {
        "en": "Read this work for its specific contribution to connects target trials, observational identification and longitudinal methods.",
        "pt": "Leia esta obra por sua contribuição específica: conecta ensaios-alvo, identificação observacional e métodos longitudinais."
      },
      "stage": "undergraduate",
      "kind": "entry"
    },
    {
      "authors": "Joshua D. Angrist; Guido W. Imbens; Donald B. Rubin",
      "title": "Identification of Causal Effects Using Instrumental Variables",
      "year": 1996,
      "venue": "Journal of the American Statistical Association, 91(434), 444–455",
      "url": "https://doi.org/10.1080/01621459.1996.10476902",
      "note": {
        "en": "Clarifies instrumental-variable assumptions and local treatment effects.",
        "pt": "Esclarece hipóteses de variáveis instrumentais e efeitos locais de tratamento."
      },
      "preparation": {
        "en": "Mathematical statistics, proof writing, likelihood and asymptotic arguments.",
        "pt": "Estatística matemática, demonstrações, verossimilhança e argumentos assintóticos."
      },
      "why": {
        "en": "Read this work for its specific contribution to clarifies instrumental-variable assumptions and local treatment effects.",
        "pt": "Leia esta obra por sua contribuição específica: esclarece hipóteses de variáveis instrumentais e efeitos locais de tratamento."
      },
      "stage": "masters",
      "kind": "seminal"
    },
    {
      "authors": "James M. Robins; Miguel A. Hernán; Babette Brumback",
      "title": "Marginal structural models and causal inference in epidemiology",
      "year": 2000,
      "venue": "Epidemiology, 11(5), 550–560",
      "url": "https://doi.org/10.1097/00001648-200009000-00011",
      "note": {
        "en": "Addresses time-varying confounding through marginal structural models.",
        "pt": "Aborda confundimento variável no tempo por modelos estruturais marginais."
      },
      "preparation": {
        "en": "Measure-theoretic probability, advanced inference and the article's technical assumptions.",
        "pt": "Probabilidade com teoria da medida, inferência avançada e hipóteses técnicas do artigo."
      },
      "why": {
        "en": "Read this work for its specific contribution to addresses time-varying confounding through marginal structural models.",
        "pt": "Leia esta obra por sua contribuição específica: aborda confundimento variável no tempo por modelos estruturais marginais."
      },
      "stage": "phd",
      "kind": "seminal"
    },
    {
      "authors": "Victor Chernozhukov; Denis Chetverikov; Mert Demirer; Esther Duflo; Christian Hansen; Whitney Newey; James Robins",
      "title": "Double/debiased machine learning for treatment and structural parameters",
      "year": 2018,
      "venue": "The Econometrics Journal, 21(1), C1–C68",
      "url": "https://doi.org/10.1111/ectj.12097",
      "note": {
        "en": "Develops orthogonal-score estimation with flexible nuisance learners.",
        "pt": "Desenvolve estimação por escores ortogonais com aprendizes flexíveis de funções auxiliares."
      },
      "preparation": {
        "en": "Measure-theoretic probability, advanced inference and the article's technical assumptions.",
        "pt": "Probabilidade com teoria da medida, inferência avançada e hipóteses técnicas do artigo."
      },
      "why": {
        "en": "Read this work for its specific contribution to develops orthogonal-score estimation with flexible nuisance learners.",
        "pt": "Leia esta obra por sua contribuição específica: desenvolve estimação por escores ortogonais com aprendizes flexíveis de funções auxiliares."
      },
      "stage": "phd",
      "kind": "advanced"
    },
    {
      "authors": "Brantly Callaway; Pedro H. C. Sant’Anna",
      "title": "Difference-in-Differences with Multiple Time Periods",
      "year": 2021,
      "venue": "Journal of Econometrics, 225(2), 200–230",
      "url": "https://doi.org/10.1016/j.jeconom.2020.12.001",
      "note": {
        "en": "Provides identification and estimation with staggered timing and heterogeneous effects.",
        "pt": "Fornece identificação e estimação com adoção escalonada e efeitos heterogêneos."
      },
      "preparation": {
        "en": "Measure-theoretic probability, advanced inference and the article's technical assumptions.",
        "pt": "Probabilidade com teoria da medida, inferência avançada e hipóteses técnicas do artigo."
      },
      "why": {
        "en": "Read this work for its specific contribution to provides identification and estimation with staggered timing and heterogeneous effects.",
        "pt": "Leia esta obra por sua contribuição específica: fornece identificação e estimação com adoção escalonada e efeitos heterogêneos."
      },
      "stage": "phd",
      "kind": "advanced"
    },
    {
      "authors": "Susan Athey; Guido Imbens",
      "title": "Recursive partitioning for heterogeneous causal effects",
      "year": 2016,
      "venue": "Proceedings of the National Academy of Sciences, 113(27), 7353–7360",
      "url": "https://doi.org/10.1073/pnas.1510489113",
      "note": {
        "en": "Introduces honest tree-based partitioning for heterogeneous effects.",
        "pt": "Introduz particionamento por árvores com estimação honesta de efeitos heterogêneos."
      },
      "preparation": {
        "en": "Measure-theoretic probability, advanced inference and the article's technical assumptions.",
        "pt": "Probabilidade com teoria da medida, inferência avançada e hipóteses técnicas do artigo."
      },
      "why": {
        "en": "Read this work for its specific contribution to introduces honest tree-based partitioning for heterogeneous effects.",
        "pt": "Leia esta obra por sua contribuição específica: introduz particionamento por árvores com estimação honesta de efeitos heterogêneos."
      },
      "stage": "phd",
      "kind": "advanced"
    }
  ]
};
  D.transversalComputing = D.readingGuides.find(g => g.id === "computing");
  D.research = D.research.filter(r => r.id !== "computing");
  const sar = D.research.find(r => r.id === "sar");
  sar.title = {en:"Statistical image processing and remote sensing",pt:"Processamento estatístico de imagens e sensoriamento remoto"};
  const existing = { "spatial-models":"Research activity",theory:"Research activity",sar:"Research activity",regression:"Research activity","time-series":"Research activity",geometry:"Developing research interest" };
  for (const r of D.research) r.status = {en:existing[r.id],pt:existing[r.id]==="Research activity"?"Atuação em pesquisa":"Interesse de pesquisa em desenvolvimento"};
  D.research.push({
  "id": "causal",
  "number": "07",
  "symbol": "↗",
  "title": {
    "en": "Causal inference",
    "pt": "Inferência causal"
  },
  "summary": {
    "en": "Identification and estimation of intervention effects under explicit causal assumptions.",
    "pt": "Identificação e estimação dos efeitos de intervenções sob hipóteses causais explícitas."
  },
  "keywords": [
    "Potential outcomes",
    "Causal identification"
  ],
  "status": {
    "en": "Developing research interest",
    "pt": "Interesse de pesquisa em desenvolvimento"
  }
});
  D.readingGuides = D.readingGuides.filter(g => g.id !== "computing").map(g => {
    const add = extra[g.id];
    return Object.assign({},g,add,{references:g.references.concat(add.addReferences)});
  });
  D.readingGuides.push(causal);
  D.researchLibraryPolicy = {en:"Research-library references are a curated study selection, not the author's publication record. Computing, Monte Carlo simulation, R programming and reproducibility are transversal research skills. Emerging interests are not represented as existing publications.",pt:"As referências da biblioteca são uma seleção de estudo, não a produção científica do autor. Computação, simulação Monte Carlo, programação em R e reprodutibilidade são competências transversais. Interesses emergentes não são apresentados como publicações existentes."};
})();
