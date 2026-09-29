/* Topic 1 only: bilingual, research-grade spatial library. References are published works; no private manuscript content. */
(()=>{
  'use strict';
  const D=window.PORTFOLIO;
  if(!D)return;
  D.spatialGuide={
  "id": "spatial-models",
  "version": "2026-09-29",
  "question": {
    "en": "How do coherent probabilistic assumptions connect conditional lattice regression, two-dimensional ARMA fields, geostatistics and Bayesian space–time models?",
    "pt": "Como hipóteses probabilísticas coerentes conectam regressão condicional em malhas, campos ARMA bidimensionais, geoestatística e modelos espaço-temporais bayesianos?"
  },
  "entry": {
    "en": "Spatial and spatio-temporal statistics studies random fields and stochastic processes indexed by location and, where relevant, time. Two complementary entry routes are offered: conditional regression on lattices and process-based geostatistical or hierarchical modelling. Neither route is a subclass of the other; both require a valid probability law, identifiable parameters and justified inference.",
    "pt": "A estatística espacial e espaço-temporal estuda campos aleatórios e processos estocásticos indexados pela localização e, quando pertinente, pelo tempo. O guia oferece duas entradas complementares: regressão condicional em malhas e modelagem geoestatística ou hierárquica baseada em processos. Nenhuma vertente é subclasse da outra; ambas exigem lei de probabilidade válida, parâmetros identificáveis e inferência justificada."
  },
  "background": {
    "en": "Start with probability, mathematical statistics, linear algebra and regression. To specialize in Track A, add conditional distributions, shift operators and asymptotic theory for dependent arrays. For Track B, add covariance theory, Gaussian processes and Bayesian computation.",
    "pt": "Comece por probabilidade, estatística matemática, álgebra linear e regressão. Para a Vertente A, acrescente distribuições condicionais, operadores de deslocamento e teoria assintótica para arranjos dependentes. Para a Vertente B, acrescente teoria de covariância, processos gaussianos e computação bayesiana."
  },
  "sections": [
    {
      "id": "foundations",
      "title": {
        "en": "Shared foundations",
        "pt": "Fundamentos compartilhados"
      },
      "lead": {
        "en": "A spatial model begins with an index set and consistent finite-dimensional distributions. For a finite lattice, specify an actual joint probability measure or justify the compatibility of full conditionals; for a family of growing domains, establish the conditions needed for a random field and its inferential limits.",
        "pt": "Um modelo espacial começa com um conjunto de índices e distribuições finito-dimensionais consistentes. Para uma malha finita, especifique uma medida de probabilidade conjunta real ou justifique a compatibilidade das condicionais completas; para famílias de domínios crescentes, estabeleça as condições necessárias ao campo aleatório e a seus limites inferenciais."
      },
      "modules": [
        {
          "title": {
            "en": "Index sets, sampling and dependence",
            "pt": "Conjuntos de índices, amostragem e dependência"
          },
          "body": {
            "en": "Distinguish fixed sampling sites in a continuous domain, regular or irregular lattices, random event locations and evolving space–time locations. Finite-dimensional consistency concerns the joint laws over overlapping index subsets. A family of local conditional kernels is a different object and needs its own compatibility argument. Define spatial support, edge treatment, missing locations and the meaning of prediction before choosing a method.",
            "pt": "Diferencie locais fixos em domínio contínuo, malhas regulares ou irregulares, localizações aleatórias de eventos e posições que evoluem no espaço-tempo. Consistência finito-dimensional diz respeito às leis conjuntas sobre subconjuntos de índices sobrepostos. Uma família de núcleos condicionais locais é objeto diferente e exige argumento próprio de compatibilidade. Defina suporte espacial, tratamento de bordas, locais ausentes e o significado de predição antes de escolher o método."
          },
          "check": {
            "en": "A simulation that produces plausible images is not an existence proof for a prescribed infinite-field law.",
            "pt": "Simulação que produz imagens plausíveis não é demonstração de existência da lei de campo infinito prescrita."
          },
          "refs": [
            "cressie93",
            "besag74"
          ]
        },
        {
          "title": {
            "en": "Covariance, variograms and structural assumptions",
            "pt": "Covariância, variogramas e hipóteses estruturais"
          },
          "body": {
            "en": "For a second-order stationary field, C(h) must be positive definite; under intrinsic stationarity, the semivariogram is γ(h) = ½ Var{Z(s+h)−Z(s)} and has the required conditional negative-definiteness structure. Isotropy, anisotropy and stationarity are different assumptions. Gaussianity determines finite-dimensional laws from means and covariances, whereas non-Gaussian fields need further structure.",
            "pt": "Para campo estacionário de segunda ordem, C(h) deve ser positiva definida; sob estacionariedade intrínseca, o semivariograma é γ(h) = ½ Var{Z(s+h)−Z(s)} e possui a estrutura condicional de definitude negativa exigida. Isotropia, anisotropia e estacionariedade são hipóteses diferentes. Gaussianidade determina leis finito-dimensionais por médias e covariâncias, enquanto campos não gaussianos exigem estrutura adicional."
          },
          "check": {
            "en": "A fitted empirical variogram does not by itself certify a globally valid covariance family.",
            "pt": "O ajuste de variograma empírico não certifica, por si só, uma família de covariâncias globalmente válida."
          },
          "refs": [
            "cressie93",
            "whittle54"
          ]
        },
        {
          "title": {
            "en": "Inference under dependence and spatial asymptotics",
            "pt": "Inferência sob dependência e assintótica espacial"
          },
          "body": {
            "en": "Separate model assumptions (the law, stationarity, neighbourhoods, covariance) from inference assumptions (identifiability, regularity, suitable mixing/ergodicity or another dependence theorem, boundary control and a specified sampling regime). Increasing-domain and fixed-domain/infill asymptotics can identify different covariance combinations. Under expanding two-dimensional lattices, edge effects can be non-negligible relative to temporal arrays.",
            "pt": "Separe hipóteses de modelagem (lei, estacionariedade, vizinhança, covariância) das de inferência (identificabilidade, regularidade, mistura/ergodicidade adequada ou outro teorema de dependência, controle de bordas e regime de amostragem especificado). Assintótica de domínio crescente e de domínio fixo/infill pode identificar diferentes combinações de covariância. Em malhas bidimensionais crescentes, efeitos de borda podem ser relevantes em comparação com arranjos temporais."
          },
          "check": {
            "en": "A central limit theorem for temporal ARMA is not automatically a theorem for spatial estimates or residual diagnostics.",
            "pt": "Um teorema central do limite para ARMA temporal não é automaticamente teorema para estimativas espaciais ou diagnósticos residuais."
          },
          "refs": [
            "guyon82",
            "stein99"
          ]
        },
        {
          "title": {
            "en": "Joint, marginal, conditional and hierarchical laws",
            "pt": "Leis conjuntas, marginais, condicionais e hierárquicas"
          },
          "body": {
            "en": "Distinguish a joint field law p(y), a full conditional p(yᵢ|y₋ᵢ), a recursive conditional p(yᵢ|pastᵢ), and a hierarchy p(y|z,θ)p(z|θ)p(θ). They encode different assumptions and likelihood factorizations. A Bayesian analysis can be built on any coherent likelihood, but an intrinsic or improper prior requires posterior-propriety checks.",
            "pt": "Diferencie lei conjunta do campo p(y), condicional completa p(yᵢ|y₋ᵢ), condicional recursiva p(yᵢ|passadoᵢ) e hierarquia p(y|z,θ)p(z|θ)p(θ). Elas codificam hipóteses e fatorizações de verossimilhança distintas. Uma análise bayesiana pode partir de qualquer verossimilhança coerente, mas prior intrínseca ou imprópria exige conferir a propriedade da posterior."
          },
          "check": {
            "en": "Conditional independence given a latent field is not conditional independence among observed neighbouring responses.",
            "pt": "Independência condicional dado um campo latente não é independência condicional entre respostas observadas vizinhas."
          },
          "refs": [
            "besag74",
            "rue05",
            "diggle98"
          ]
        }
      ]
    },
    {
      "id": "track-a",
      "title": {
        "en": "Track A — Conditional spatial regression and two-dimensional ARMA",
        "pt": "Vertente A — Regressão espacial condicional e ARMA bidimensional"
      },
      "lead": {
        "en": "A dedicated route from covariate-dependent response models to joint validity, unilateral/bilateral spatial dependence, non-Gaussian construction, estimation and diagnostics. The published literature is distinguished from any unpublished model or theorem.",
        "pt": "Percurso próprio de modelos de resposta com covariáveis até validade conjunta, dependência espacial unilateral/bilateral, construção não gaussiana, estimação e diagnóstico. A literatura publicada é separada de qualquer modelo ou teorema inédito."
      },
      "modules": [
        {
          "title": {
            "en": "A1. Where spatial dependence enters a regression",
            "pt": "A1. Onde a dependência entra na regressão"
          },
          "body": {
            "en": "Compare response-lag models, regression with correlated errors, conditional response models and regression with latent spatial effects. Write down the target parameter, link function, covariate field, neighbour matrix and observation law. Simultaneous spatial-lag regression can involve a determinant in its joint likelihood; recursively conditioned lattice regression depends on an explicitly chosen site ordering or directed graph. A latent process model instead specifies observation distributions conditional on an unobserved field.",
            "pt": "Compare modelos com defasagem espacial da resposta, regressão com erros correlacionados, modelos condicionais da resposta e regressão com efeitos espaciais latentes. Especifique parâmetro-alvo, função de ligação, campo de covariáveis, matriz de vizinhança e lei observacional. Regressão com defasagem espacial simultânea pode envolver determinante na verossimilhança conjunta; regressão em malha condicionada recursivamente depende de ordem explícita dos locais ou grafo dirigido. Já modelo de processo latente especifica distribuições observacionais condicionadas em campo não observado."
          },
          "check": {
            "en": "Do not call spatial lag, correlated error, neighbour conditional and latent random effect the same regression mechanism.",
            "pt": "Não trate defasagem espacial, erro correlacionado, condicional de vizinhança e efeito aleatório latente como o mesmo mecanismo de regressão."
          },
          "refs": [
            "anselin88",
            "basu94",
            "mardia84",
            "diggle98"
          ]
        },
        {
          "title": {
            "en": "A2. Two-dimensional AR and MA operators",
            "pt": "A2. Operadores AR e MA bidimensionais"
          },
          "body": {
            "en": "On an integer lattice define shifts B₁ and B₂ and, for a specified unilateral past cone, consider Φ(B₁,B₂)Xₛ = Θ(B₁,B₂)εₛ. The index set of the polynomials, boundary conditions and ordering are part of the model. The nonvanishing region of multivariate polynomials, including conditions on the unit polydisc for a chosen unilateral representation, is not reducible to a one-dimensional root check. Bilateral simultaneous specifications require a separate joint/spectral or precision construction.",
            "pt": "Em malha inteira, defina deslocamentos B₁ e B₂ e, para cone passado unilateral especificado, considere Φ(B₁,B₂)Xₛ = Θ(B₁,B₂)εₛ. O suporte dos polinômios, as condições de contorno e a ordenação integram o modelo. A região sem zeros de polinômios multivariados, incluindo condições no polidisco unitário para representação unilateral escolhida, não se reduz a verificar raízes unidimensionais. Especificações bilaterais simultâneas exigem construção conjunta/espectral ou por precisão separada."
          },
          "check": {
            "en": "A recursion implemented by raster scan is not evidence that another scan order represents the same random field.",
            "pt": "Recursão implementada por varredura raster não demonstra que outra ordem de varredura represente o mesmo campo aleatório."
          },
          "refs": [
            "whittle54",
            "tjostheim78",
            "tjostheim81",
            "basu93"
          ]
        },
        {
          "title": {
            "en": "A3. Conditional compatibility and field existence",
            "pt": "A3. Compatibilidade condicional e existência do campo"
          },
          "body": {
            "en": "For proper Gaussian full conditionals, compatible symmetric interactions and a positive-definite precision matrix yield a valid finite joint field. For general exponential-family auto-models, normalizing constants, symmetry and parameter restrictions depend on the response support. A directed factorization over a finite ordered set can define a proper joint law if each kernel is normalized and its parent set is genuinely earlier; it is not interchangeable with full conditionals of a symmetric lattice field. Existence of a consistent infinite extension is an additional question.",
            "pt": "Para condicionais completas gaussianas próprias, interações simétricas compatíveis e matriz de precisão positiva definida produzem campo conjunto finito válido. Para automodelos de família exponencial geral, constantes de normalização, simetria e restrições paramétricas dependem do suporte da resposta. Fatorização dirigida sobre conjunto ordenado finito pode definir lei conjunta própria se cada núcleo for normalizado e seus pais forem realmente anteriores; isso não é intercambiável com condicionais completas de campo simétrico em malha. A existência de extensão infinita consistente é questão adicional."
          },
          "check": {
            "en": "Improper CAR priors and valid proper field laws must be labelled separately; a computational Gibbs sampler does not prove propriety.",
            "pt": "Priors CAR impróprias e leis de campo próprias válidas devem ser identificadas separadamente; amostrador de Gibbs computacional não demonstra propriedade."
          },
          "refs": [
            "besag74",
            "dreassi17",
            "rue05"
          ]
        },
        {
          "title": {
            "en": "A4. Non-Gaussian responses and positive-valued data",
            "pt": "A4. Respostas não gaussianas e dados positivos"
          },
          "body": {
            "en": "Binary and count-valued spatial auto-models show that compatibility restrictions depend on the distribution (for example, the auto-Poisson restriction on cooperative interactions). For positive measurements, Gamma, lognormal and other response families can be used in published geostatistical or hierarchical observation layers where the joint construction is explicit. Such a latent-Gaussian generalized spatial model is not automatically a validated conditional Gamma/ARMA lattice law. Before asserting a new positive-valued conditional field, verify support, finite-dimensional compatibility, existence, identifiability and the conditional score.",
            "pt": "Automodelos espaciais binários e de contagem mostram que restrições de compatibilidade dependem da distribuição (por exemplo, a restrição de cooperação no auto-Poisson). Para medições positivas, famílias Gamma, lognormal e outras podem integrar camadas observacionais de modelos geoestatísticos ou hierárquicos publicados com construção conjunta explícita. Esse modelo espacial generalizado gaussiano latente não se transforma automaticamente em lei condicional Gamma/ARMA validada na malha. Antes de afirmar novo campo condicional positivo, verifique suporte, compatibilidade finito-dimensional, existência, identificabilidade e escore condicional."
          },
          "check": {
            "en": "The guide teaches published construction principles; it intentionally discloses no unpublished formula, proof or experimental design.",
            "pt": "O guia ensina princípios de construção publicados; não divulga fórmula, demonstração ou delineamento experimental inédito."
          },
          "refs": [
            "besag74",
            "bardos15",
            "diggle98"
          ]
        },
        {
          "title": {
            "en": "A5. Estimation, uncertainty and diagnostics",
            "pt": "A5. Estimação, incerteza e diagnóstico"
          },
          "body": {
            "en": "Choose full likelihood only where a normalized joint or valid recursive factorization exists. Pseudolikelihood and composite likelihood sum conditional or marginal contributions but do not generally equal full likelihood. State what expectation makes the composite score unbiased, identify its target, and use H = −E∂U/∂θ and J = Var(U) for Godambe/sandwich uncertainty under the appropriate dependence regime. Fisher information of a full likelihood cannot be substituted blindly. Assess residual dependence, border effects, out-of-sample spatial prediction, simulation calibration and model-specific residual transforms. A temporal portmanteau reference distribution is not automatically valid for fitted conditional spatial models.",
            "pt": "Use verossimilhança plena somente quando houver distribuição conjunta normalizada ou fatorização recursiva válida. Pseudoverossimilhança e verossimilhança composta somam contribuições condicionais ou marginais, mas geralmente não equivalem à verossimilhança plena. Declare qual esperança torna o escore composto não tendencioso, identifique seu alvo e utilize H = −E∂U/∂θ e J = Var(U) para incerteza de Godambe/sanduíche no regime de dependência adequado. Informação de Fisher da verossimilhança plena não pode ser substituída cegamente. Avalie dependência residual, efeitos de borda, predição espacial fora da amostra, calibração por simulação e transformações residuais específicas do modelo. A distribuição de referência portmanteau temporal não é automaticamente válida para modelos espaciais condicionais ajustados."
          },
          "check": {
            "en": "Consistency, asymptotic normality and calibration are model-specific theorems to be proved or cited, not properties inherited from the acronym ARMA.",
            "pt": "Consistência, normalidade assintótica e calibração são teoremas específicos do modelo a demonstrar ou citar, não propriedades herdadas da sigla ARMA."
          },
          "refs": [
            "guyon82",
            "ord75",
            "besag-moran75",
            "mardia84",
            "varin11",
            "basu93",
            "besag75"
          ]
        }
      ]
    },
    {
      "id": "track-b",
      "title": {
        "en": "Track B — Geostatistics, space–time processes and Bayesian hierarchy",
        "pt": "Vertente B — Geoestatística, processos espaço-temporais e hierarquia bayesiana"
      },
      "lead": {
        "en": "A complete alternative specialization centred on process covariance, spatial prediction and coherent observation–process–parameter hierarchies. Bayesian inference is a methodology available to either track, not a definition of geostatistics.",
        "pt": "Especialização alternativa completa centrada em covariância de processos, predição espacial e hierarquias coerentes de observação–processo–parâmetros. Inferência bayesiana é metodologia disponível em ambas as vertentes, não definição de geoestatística."
      },
      "modules": [
        {
          "title": {
            "en": "B1. Geostatistics and spatial prediction",
            "pt": "B1. Geoestatística e predição espacial"
          },
          "body": {
            "en": "Begin with point-referenced observations, a mean/trend model and a valid covariance or variogram. Distinguish properties of the latent field from assumptions about measurement error. Kriging is a model-based prediction rule: conditional or best-linear prediction, and its prediction variance, depend on the covariance and on whether parameters are known or estimated. Compare fixed- and increasing-domain inference before claiming covariance parameter precision.",
            "pt": "Comece por observações georreferenciadas, modelo de média/tendência e covariância ou variograma válido. Diferencie propriedades do campo latente de hipóteses sobre erro de medição. Krigagem é regra de predição baseada em modelo: predição condicional ou melhor predição linear e sua variância dependem da covariância e de parâmetros serem conhecidos ou estimados. Compare inferência de domínio fixo e crescente antes de afirmar precisão de parâmetros de covariância."
          },
          "check": {
            "en": "A kriging prediction variance conditioned on estimated parameters may omit parameter uncertainty.",
            "pt": "A variância de predição por krigagem condicionada em parâmetros estimados pode omitir incerteza paramétrica."
          },
          "refs": [
            "cressie93",
            "diggle07",
            "stein99"
          ]
        },
        {
          "title": {
            "en": "B2. Space–time fields and point processes",
            "pt": "B2. Campos espaço-temporais e processos pontuais"
          },
          "body": {
            "en": "Space–time covariance may be separable or nonseparable, but must be positive definite on its joint index set. Dynamic hierarchical models instead specify temporal evolution of latent spatial states and an observation equation. Either can include covariates and nonstationarity. Point processes are a complementary branch for random event locations; their likelihood and summary functions differ from fixed-location data.",
            "pt": "Covariância espaço-temporal pode ser separável ou não separável, mas deve ser positiva definida no conjunto conjunto de índices. Modelos hierárquicos dinâmicos especificam evolução temporal de estados espaciais latentes e equação observacional. Ambos podem incorporar covariáveis e não estacionariedade. Processos pontuais são ramo complementar para localizações aleatórias de eventos; sua verossimilhança e funções-resumo diferem de dados em locais fixos."
          },
          "check": {
            "en": "Temporal dynamics, a time-indexed covariance and a spatial point-process intensity are not interchangeable modelling objects.",
            "pt": "Dinâmica temporal, covariância indexada no tempo e intensidade de processo pontual espacial não são objetos intercambiáveis."
          },
          "refs": [
            "cressie-wikle11",
            "gneiting02",
            "diggle14",
            "moller03"
          ]
        },
        {
          "title": {
            "en": "B3. Hierarchical observation, process and parameter models",
            "pt": "B3. Modelos hierárquicos de observação, processo e parâmetros"
          },
          "body": {
            "en": "Write the generative hierarchy Y|Z,θ, Z|θ, θ and define what latent variation is intended to represent. A Gaussian process may enter the linear predictor of a non-Gaussian response, and a GMRF can encode conditional independence through a sparse precision. Spatial confounding arises when latent effects and regressors explain overlapping spatial patterns; examine identifiability, sensitivity and predictive calibration rather than interpreting coefficients automatically.",
            "pt": "Escreva a hierarquia geradora Y|Z,θ, Z|θ, θ e defina o que a variação latente representa. Processo gaussiano pode entrar no preditor linear de resposta não gaussiana, e GMRF pode codificar independência condicional por precisão esparsa. Confundimento espacial surge quando efeitos latentes e regressores explicam padrões espaciais sobrepostos; examine identificabilidade, sensibilidade e calibração preditiva em vez de interpretar coeficientes automaticamente."
          },
          "check": {
            "en": "A well-fitted spatial random effect does not by itself establish a causal effect of a covariate.",
            "pt": "Um efeito aleatório espacial bem ajustado não estabelece, por si, efeito causal de covariável."
          },
          "refs": [
            "banerjee14",
            "rue05",
            "diggle98",
            "reich06"
          ]
        },
        {
          "title": {
            "en": "B4. Bayesian inference, MCMC, INLA and SPDE",
            "pt": "B4. Inferência bayesiana, MCMC, INLA e SPDE"
          },
          "body": {
            "en": "Specify likelihood, proper or justified improper priors, posterior p(Z,θ|Y) and posterior prediction. Check posterior propriety, hyperparameter identification, prior sensitivity, chain convergence, effective sample size and held-out predictive performance. MCMC provides simulation-based approximation subject to mixing and convergence diagnostics. INLA approximates posterior marginals for supported latent Gaussian models; SPDE constructions map selected Gaussian-field models to efficient sparse precision approximations. Their accuracy and model support must be verified; neither automatically solves a conditional non-Gaussian spatial ARMA problem.",
            "pt": "Especifique verossimilhança, priors próprias ou impróprias justificadas, posterior p(Z,θ|Y) e predição posterior. Confira propriedade da posterior, identificação de hiperparâmetros, sensibilidade à prior, convergência das cadeias, tamanho efetivo amostral e desempenho preditivo fora da amostra. MCMC fornece aproximação por simulação sujeita a diagnósticos de mistura e convergência. INLA aproxima marginais posteriores para modelos gaussianos latentes suportados; construções SPDE mapeiam modelos selecionados de campos gaussianos em aproximações eficientes de precisão esparsa. A acurácia e o suporte de cada método precisam ser verificados; nenhum resolve automaticamente problema ARMA espacial condicional não gaussiano."
          },
          "check": {
            "en": "The label CAR does not guarantee a proper prior; the label INLA does not establish accuracy for an unsupported likelihood.",
            "pt": "A sigla CAR não garante prior própria; a sigla INLA não estabelece precisão para verossimilhança não suportada."
          },
          "refs": [
            "besag-york91",
            "rue05",
            "banerjee14",
            "rue09",
            "lindgren11",
            "gelfand-smith90",
            "besag-green93"
          ]
        },
        {
          "title": {
            "en": "B5. Computation, uncertainty and practical validation",
            "pt": "B5. Computação, incerteza e validação prática"
          },
          "body": {
            "en": "Study sparse matrix factorization, mesh resolution, large-data approximations, simulation-based calibration where applicable and proper spatial cross-validation. Dynamic-state models add filtering or smoothing and uncertainty propagation over time. Report computational cost separately from inferential approximation error and verify whether spatial train/test leakage invalidates a claimed forecast.",
            "pt": "Estude fatoração esparsa de matrizes, resolução de malha, aproximações para grandes bases, calibração por simulação quando pertinente e validação cruzada espacial apropriada. Modelos de estados dinâmicos acrescentam filtragem ou suavização e propagação de incerteza no tempo. Informe custo computacional separadamente do erro de aproximação inferencial e verifique se vazamento espacial entre treino e teste invalida a previsão alegada."
          },
          "check": {
            "en": "Fast computation is not a mathematical validation of the probability law or the posterior approximation.",
            "pt": "Computação rápida não é validação matemática da lei de probabilidade ou da aproximação posterior."
          },
          "refs": [
            "cressie-wikle11",
            "rue05",
            "rue09",
            "lindgren11"
          ]
        }
      ]
    },
    {
      "id": "bridges",
      "title": {
        "en": "Connections and methodological distinctions",
        "pt": "Conexões e distinções metodológicas"
      },
      "lead": {
        "en": "The tracks classify study routes, not mutually exclusive probability models. A regression can include a latent random field, and a geostatistical process model can have conditional dependence, a non-Gaussian observation layer and either frequentist or Bayesian inference.",
        "pt": "As vertentes classificam percursos de estudo, não modelos probabilísticos mutuamente exclusivos. Uma regressão pode incluir campo aleatório latente, e modelo de processo geoestatístico pode ter dependência condicional, camada observacional não gaussiana e inferência frequentista ou bayesiana."
      },
      "modules": []
    },
    {
      "id": "learning-paths",
      "title": {
        "en": "Three learning paths with shared prerequisites",
        "pt": "Três percursos formativos com pré-requisitos comuns"
      },
      "lead": {
        "en": "Choose one specialization as the main route after the shared foundation and study the other sufficiently to compare their hypotheses. Full mastery of every subfield is not a prerequisite for starting a well-defined project.",
        "pt": "Escolha uma especialização como percurso principal após a base compartilhada e estude a outra o suficiente para comparar hipóteses. Dominar integralmente todas as subáreas não é pré-requisito para iniciar projeto bem delimitado."
      },
      "modules": []
    },
    {
      "id": "reading-library",
      "title": {
        "en": "Curated literature: essential first, full catalogue on demand",
        "pt": "Literatura curada: primeiro o essencial, catálogo completo sob demanda"
      },
      "lead": {
        "en": "Each reference has a verified bibliographic record or publisher abstract, a concrete pedagogical contribution, relevant assumptions and a suggested stage. Metadata checks are not claims that paywalled full texts or proofs were independently rederived.",
        "pt": "Cada referência possui registro bibliográfico ou resumo de editora conferido, contribuição pedagógica concreta, hipóteses pertinentes e etapa recomendada. Conferência de metadados não significa que textos integrais pagos ou demonstrações tenham sido independentemente refeitos."
      },
      "modules": []
    }
  ],
  "comparison": [
    {
      "axis": {
        "en": "Index and data",
        "pt": "Índice e dados"
      },
      "A": {
        "en": "Typically a finite two-dimensional lattice or graph; a chosen directed or symmetric neighbourhood must be stated.",
        "pt": "Em geral, malha bidimensional finita ou grafo; é preciso declarar vizinhança dirigida ou simétrica."
      },
      "B": {
        "en": "Point-referenced fields, areas, events or space–time domains; can also include lattices.",
        "pt": "Campos georreferenciados, áreas, eventos ou domínios espaço-temporais; pode também incluir malhas."
      }
    },
    {
      "axis": {
        "en": "Dependence",
        "pt": "Dependência"
      },
      "A": {
        "en": "Observed-response conditional kernels, regression-error operators or unilateral innovations, depending on the model.",
        "pt": "Núcleos condicionais da resposta, operadores de erro de regressão ou inovações unilaterais, conforme o modelo."
      },
      "B": {
        "en": "Covariance or variogram, latent-process dynamics, areal CAR/GMRF precision or point-process interaction.",
        "pt": "Covariância ou variograma, dinâmica de processo latente, precisão CAR/GMRF de áreas ou interação pontual."
      }
    },
    {
      "axis": {
        "en": "Covariates and response",
        "pt": "Covariáveis e resposta"
      },
      "A": {
        "en": "Regression coefficients and link are explicit; binary, count and positive responses need family-specific joint validity.",
        "pt": "Coeficientes e ligação explícitos; respostas binárias, de contagem e positivas exigem validade conjunta específica da família."
      },
      "B": {
        "en": "Mean/trend or observation-layer predictor can include covariates; observed response can be Gaussian or non-Gaussian.",
        "pt": "Média/tendência ou preditor da camada observacional pode incluir covariáveis; resposta pode ser gaussiana ou não."
      }
    },
    {
      "axis": {
        "en": "Probabilistic construction",
        "pt": "Construção probabilística"
      },
      "A": {
        "en": "Full joint, valid recursive factorization or compatible full conditionals; none can be assumed from a convenient product of terms.",
        "pt": "Lei conjunta, fatorização recursiva válida ou condicionais completas compatíveis; nenhuma decorre de produto conveniente de termos."
      },
      "B": {
        "en": "Joint random field or observation–process–parameter hierarchy; latent GMRF priors may be proper or intrinsic.",
        "pt": "Campo aleatório conjunto ou hierarquia observação–processo–parâmetros; priors GMRF latentes podem ser próprias ou intrínsecas."
      }
    },
    {
      "axis": {
        "en": "Estimation and uncertainty",
        "pt": "Estimação e incerteza"
      },
      "A": {
        "en": "Full ML where available; composite/pseudolikelihood needs Godambe and spatial dependence conditions.",
        "pt": "MV plena quando disponível; verossimilhança composta/pseudoverossimilhança precisa de Godambe e condições de dependência."
      },
      "B": {
        "en": "Likelihood, kriging or Bayesian posterior and prediction; covariance parameter uncertainty and prior sensitivity matter.",
        "pt": "Verossimilhança, krigagem ou posterior e predição bayesianas; incerteza paramétrica e sensibilidade à prior importam."
      }
    },
    {
      "axis": {
        "en": "Validation and cost",
        "pt": "Validação e custo"
      },
      "A": {
        "en": "Boundary treatment, compatibility, residual dependence, asymptotic calibration and lattice likelihood cost.",
        "pt": "Tratamento de bordas, compatibilidade, dependência residual, calibração assintótica e custo de verossimilhança na malha."
      },
      "B": {
        "en": "Covariance validity, posterior computation, mesh approximation, prediction uncertainty and spatial cross-validation.",
        "pt": "Validade da covariância, computação posterior, aproximação de malha, incerteza preditiva e validação cruzada espacial."
      }
    }
  ],
  "learning": {
    "undergraduate": {
      "shared": [
        {
          "en": "Read Cressie on spatial-data types, compute empirical covariance and variograms, and simulate a small Gaussian lattice in R.",
          "pt": "Leia Cressie sobre tipos de dados espaciais, calcule covariância e variogramas empíricos e simule pequena malha gaussiana em R."
        },
        {
          "en": "Fit regression with covariates and map spatial residuals; distinguish evidence of residual dependence from proof of a generative law.",
          "pt": "Ajuste regressão com covariáveis e mapeie resíduos espaciais; diferencie evidência de dependência residual de demonstração de lei geradora."
        }
      ],
      "A": [
        {
          "en": "Simulate a finite proper Gaussian conditional neighbourhood model; verify symmetry and positive-definite precision numerically.",
          "pt": "Simule modelo gaussiano condicional próprio em vizinhança finita; verifique simetria e precisão positiva definida numericamente."
        }
      ],
      "B": [
        {
          "en": "Fit a valid covariance model and kriging exercise in R; inspect uncertainty and edge effects.",
          "pt": "Ajuste modelo de covariância válido e exercício de krigagem em R; examine incerteza e efeitos de borda."
        }
      ]
    },
    "masters": {
      "shared": [
        {
          "en": "Review conditional distributions, stationarity and identification; compare finite joint, full conditional and latent hierarchy on a simple example.",
          "pt": "Revise distribuições condicionais, estacionariedade e identificação; compare lei conjunta finita, condicional completa e hierarquia latente em exemplo simples."
        }
      ],
      "A": [
        {
          "en": "Study Anselin, Tjøstheim and Basu–Reinsel; derive a two-shift unilateral model and distinguish it from bilateral CAR.",
          "pt": "Estude Anselin, Tjøstheim e Basu–Reinsel; deduza modelo unilateral com dois deslocamentos e diferencie-o de CAR bilateral."
        },
        {
          "en": "Implement a published Gaussian or auto-logistic conditional model, then compare valid full likelihood and pseudolikelihood where each is defined.",
          "pt": "Implemente modelo condicional gaussiano ou autologístico publicado; depois compare verossimilhança plena válida e pseudoverossimilhança quando definidas."
        }
      ],
      "B": [
        {
          "en": "Work through Diggle–Ribeiro and Rue–Held; fit and validate kriging and a small Gaussian latent field.",
          "pt": "Estude Diggle–Ribeiro e Rue–Held; ajuste e valide krigagem e pequeno campo gaussiano latente."
        },
        {
          "en": "Specify priors and a posterior for a published hierarchical areal or point-referenced example; inspect MCMC diagnostics.",
          "pt": "Especifique priors e posterior para exemplo hierárquico publicado em áreas ou pontos; examine diagnósticos MCMC."
        }
      ]
    },
    "phd": {
      "shared": [
        {
          "en": "Choose a sampling regime, prove or locate the field's existence/compatibility result, identify the parameter and audit each limit theorem's exact assumptions.",
          "pt": "Escolha regime amostral, demonstre ou localize resultado de existência/compatibilidade do campo, identifique parâmetro e audite hipóteses exatas de cada teorema-limite."
        }
      ],
      "A": [
        {
          "en": "Study multivariate polynomial stability and spatial border terms in Tjøstheim and Basu–Reinsel; assess conditional kernel compatibility with Besag and Dreassi–Rigo.",
          "pt": "Estude estabilidade polinomial multivariada e termos de borda espaciais em Tjøstheim e Basu–Reinsel; avalie compatibilidade de núcleos condicionais com Besag e Dreassi–Rigo."
        },
        {
          "en": "Derive model-specific score covariance and Godambe information; validate residual and prediction diagnostics without borrowing temporal reference laws.",
          "pt": "Deduza covariância do escore e informação de Godambe específicas do modelo; valide diagnósticos residuais e preditivos sem importar leis de referência temporais."
        }
      ],
      "B": [
        {
          "en": "Study Stein's fixed-domain limits, Gneiting's nonseparable covariance and Cressie–Wikle space–time hierarchy.",
          "pt": "Estude limites de domínio fixo de Stein, covariância não separável de Gneiting e hierarquia espaço-temporal de Cressie–Wikle."
        },
        {
          "en": "Analyze the valid latent-Gaussian scope of INLA and the Gaussian-field approximations of SPDE; compare with a properly diagnosed MCMC baseline.",
          "pt": "Analise o escopo gaussiano latente válido de INLA e as aproximações de campo gaussiano por SPDE; compare com referência MCMC diagnosticada."
        }
      ]
    }
  },
  "bridges": [
    {
      "en": "Published latent Gaussian generalized spatial models combine regression and a spatial process in the observation layer; Besag–York–Mollié, Diggle–Tawn–Moyeed, Banerjee–Carlin–Gelfand and Rue–Held provide established examples. These constructions do not prove validity of a different non-Gaussian observed-response full-conditional ARMA field.",
      "pt": "Modelos espaciais generalizados gaussianos latentes publicados combinam regressão e processo espacial na camada observacional; Besag–York–Mollié, Diggle–Tawn–Moyeed, Banerjee–Carlin–Gelfand e Rue–Held oferecem exemplos estabelecidos. Essas construções não demonstram validade de outro campo ARMA de condicionais completas da resposta observada não gaussiana."
    },
    {
      "en": "Bayesian estimation of a spatial ARMA model is conceptually possible once a proper likelihood and prior are defined; computational access and posterior propriety remain independent questions. INLA and SPDE need their specific latent-field and approximation assumptions.",
      "pt": "Estimação bayesiana de modelo ARMA espacial é conceitualmente possível após definir verossimilhança e prior próprias; acesso computacional e propriedade posterior continuam questões independentes. INLA e SPDE exigem suas hipóteses específicas de campo latente e aproximação."
    }
  ],
  "research": {
    "en": "My established methodological research concerns spatial regression and conditional two-dimensional ARMA dependence. Broader geostatistical, space–time process and Bayesian modelling are directions of study and future investigation. This guide cites published general literature only; it does not disclose or claim results from private or unpublished manuscripts.",
    "pt": "Minha pesquisa metodológica consolidada envolve regressão espacial e dependência ARMA bidimensional condicional. Geoestatística mais ampla, processos espaço-temporais e modelagem bayesiana são frentes de estudo e investigação futura. Este guia cita apenas literatura geral publicada; não divulga nem reivindica resultados de manuscritos privados ou inéditos."
  },
  "exercises": [
    {
      "en": "Formulate two different proper Gaussian neighbourhood models on the same 4 × 4 lattice, inspect their precision eigenvalues and show which conditional statements differ.",
      "pt": "Formule dois modelos gaussianos próprios de vizinhança na mesma malha 4 × 4, examine autovalores de precisão e mostre quais condicionais diferem."
    },
    {
      "en": "Construct a positive-definite space–time covariance by a published separable or nonseparable family and test empirical prediction with spatially blocked validation.",
      "pt": "Construa covariância espaço-temporal positiva definida por família separável ou não separável publicada e teste predição com validação em blocos espaciais."
    }
  ],
  "references": [
    {
      "id": "cressie93",
      "section": "common",
      "authors": "Noel A. C. Cressie",
      "title": "Statistics for Spatial Data",
      "year": 1993,
      "venue": "Wiley, revised edition; print ISBN 9780471002550; online ISBN 9781119115151",
      "identifier": "10.1002/9781119115151",
      "url": "https://onlinelibrary.wiley.com/doi/book/10.1002/9781119115151",
      "contribution": {
        "en": "Organizes geostatistical, lattice and point-pattern data, including covariance, kriging, spatial design and inference.",
        "pt": "Organiza dados geoestatísticos, em malhas e padrões pontuais, incluindo covariância, krigagem, delineamento espacial e inferência."
      },
      "assumptions": {
        "en": "Different chapters use different observation schemes; no single covariance or estimation theorem applies to every spatial-data type.",
        "pt": "Capítulos diferentes utilizam esquemas observacionais distintos; nenhum teorema de covariância ou estimação abrange todos os tipos de dados espaciais."
      },
      "stage": "undergraduate",
      "verification": "publisher-catalogue",
      "essential": true
    },
    {
      "id": "besag74",
      "section": "common",
      "authors": "Julian Besag",
      "title": "Spatial Interaction and the Statistical Analysis of Lattice Systems",
      "year": 1974,
      "venue": "Journal of the Royal Statistical Society, Series B, 36(2), 192–225",
      "identifier": "10.1111/j.2517-6161.1974.tb00999.x",
      "url": "https://rss.onlinelibrary.wiley.com/doi/abs/10.1111/j.2517-6161.1974.tb00999.x",
      "contribution": {
        "en": "Studies conditional specifications, spatial auto-models and Markov–Gibbs links on lattices.",
        "pt": "Estuda especificações condicionais, automodelos espaciais e relações Markov–Gibbs em malhas."
      },
      "assumptions": {
        "en": "Finite-lattice compatibility and positivity/normalization restrictions must be checked for the proposed conditional family.",
        "pt": "É preciso conferir compatibilidade em malha finita e restrições de positividade e normalização da família condicional proposta."
      },
      "stage": "masters",
      "verification": "publisher-abstract",
      "essential": true
    },
    {
      "id": "whittle54",
      "section": "common",
      "authors": "Peter Whittle",
      "title": "On Stationary Processes in the Plane",
      "year": 1954,
      "venue": "Biometrika, 41(3–4), 434–449",
      "identifier": "10.1093/biomet/41.3-4.434",
      "url": "https://doi.org/10.1093/biomet/41.3-4.434",
      "contribution": {
        "en": "Early treatment of stationary spatial processes in the plane and spectral ideas.",
        "pt": "Tratamento inicial de processos espaciais estacionários no plano e de ideias espectrais."
      },
      "assumptions": {
        "en": "Second-order stationarity and a valid planar covariance or spectral structure must be specified.",
        "pt": "Devem ser especificadas estacionariedade de segunda ordem e uma estrutura válida de covariância ou espectro no plano."
      },
      "stage": "phd",
      "verification": "publisher-index",
      "essential": false
    },
    {
      "id": "guyon82",
      "section": "common",
      "authors": "Xavier Guyon",
      "title": "Parameter Estimation for a Stationary Process on a d-Dimensional Lattice",
      "year": 1982,
      "venue": "Biometrika, 69(1), 95–105",
      "identifier": "10.1093/biomet/69.1.95",
      "url": "https://doi.org/10.1093/biomet/69.1.95",
      "contribution": {
        "en": "Explains spatial edge effects and studies asymptotic estimation on expanding d-dimensional lattices.",
        "pt": "Explica efeitos de borda espaciais e estuda estimação assintótica em malhas d-dimensionais crescentes."
      },
      "assumptions": {
        "en": "The asymptotic region expands in all directions under stationarity and the paper's regularity conditions.",
        "pt": "A região assintótica cresce em todas as direções sob estacionariedade e as condições de regularidade do artigo."
      },
      "stage": "phd",
      "verification": "publisher-abstract",
      "essential": true
    },
    {
      "id": "tjostheim78",
      "section": "A",
      "authors": "Dag Tjøstheim",
      "title": "Statistical Spatial Series Modelling",
      "year": 1978,
      "venue": "Advances in Applied Probability, 10(1), 130–154",
      "identifier": "10.2307/1426722",
      "url": "https://www.cambridge.org/core/journals/advances-in-applied-probability/article/statistical-spatial-series-modelling/7607D530ABF4E35D9BF8D63641B359B5",
      "contribution": {
        "en": "Builds a rigorous unilateral spatial-series framework with innovations, ARMA shift operators, and stability and invertibility conditions.",
        "pt": "Constrói estrutura rigorosa de séries espaciais unilaterais com inovações, operadores de deslocamento ARMA e condições de estabilidade e invertibilidade."
      },
      "assumptions": {
        "en": "Requires a specified partial order/past cone; temporal log-spectral criteria do not transfer unchanged to higher dimensions.",
        "pt": "Exige ordem parcial ou cone passado especificado; critérios espectrais logarítmicos temporais não se transferem sem alterações para dimensões superiores."
      },
      "stage": "phd",
      "verification": "publisher-abstract",
      "essential": true
    },
    {
      "id": "tjostheim81",
      "section": "A",
      "authors": "Dag Tjøstheim",
      "title": "Autoregressive Modeling and Spectral Analysis of Array Data in the Plane",
      "year": 1981,
      "venue": "IEEE Transactions on Geoscience and Remote Sensing, GE-19(1), 15–24",
      "identifier": "10.1109/TGRS.1981.350323",
      "url": "https://doi.org/10.1109/TGRS.1981.350323",
      "contribution": {
        "en": "Studies one-quadrant autoregressive approximations, model-order selection and spatial spectral estimation.",
        "pt": "Estuda aproximações autorregressivas em um quadrante, seleção de ordem e estimação espectral espacial."
      },
      "assumptions": {
        "en": "The chosen quadrant induces a unilateral dependence convention; it is not the unique notion of spatial neighbourhood.",
        "pt": "O quadrante escolhido induz convenção unilateral de dependência; não é a única noção de vizinhança espacial."
      },
      "stage": "masters",
      "verification": "bibliographic-metadata",
      "essential": false
    },
    {
      "id": "basu93",
      "section": "A",
      "authors": "Sabyasachi Basu; Gregory C. Reinsel",
      "title": "Properties of the Spatial Unilateral First-Order ARMA Model",
      "year": 1993,
      "venue": "Advances in Applied Probability, 25(3), 631–648",
      "identifier": "10.2307/1427527",
      "url": "https://www.cambridge.org/core/journals/advances-in-applied-probability/article/properties-of-the-spatial-unilateral-firstorder-arma-model/CC5943514BB8DBA22BA286A015CE82D6",
      "contribution": {
        "en": "Derives covariance, stationarity, interpolation and exact-likelihood properties for a specified unilateral first-order spatial ARMA model.",
        "pt": "Deduza covariância, estacionariedade, interpolação e verossimilhança exata para modelo ARMA espacial unilateral de primeira ordem especificado."
      },
      "assumptions": {
        "en": "Results concern the article's unilateral model, including boundary observations; they do not establish validity for arbitrary bilateral non-Gaussian constructions.",
        "pt": "Os resultados dizem respeito ao modelo unilateral do artigo, inclusive observações de borda; não demonstram validade para construções bilaterais não gaussianas arbitrárias."
      },
      "stage": "phd",
      "verification": "publisher-abstract",
      "essential": true
    },
    {
      "id": "basu94",
      "section": "A",
      "authors": "Sabyasachi Basu; Gregory C. Reinsel",
      "title": "Regression Models with Spatially Correlated Errors",
      "year": 1994,
      "venue": "Journal of the American Statistical Association, 89(425), 88–99",
      "identifier": "10.2307/2291204",
      "url": "https://www.jstor.org/stable/2291204",
      "contribution": {
        "en": "Connects regression estimation to spatially correlated errors with explicit lattice dependence.",
        "pt": "Relaciona estimação por regressão a erros espacialmente correlacionados com dependência explícita em malhas."
      },
      "assumptions": {
        "en": "Gaussian/error-model assumptions and dependence parametrization must be kept distinct from response-conditional models.",
        "pt": "As hipóteses do modelo de erros e a parametrização da dependência devem ser distinguidas de modelos condicionais da resposta."
      },
      "stage": "masters",
      "verification": "publisher-toc-and-catalogue",
      "essential": true
    },
    {
      "id": "anselin88",
      "section": "A",
      "authors": "Luc Anselin",
      "title": "Spatial Econometrics: Methods and Models",
      "year": 1988,
      "venue": "Springer Dordrecht, 1st ed.; hardcover ISBN 9789024737352",
      "identifier": "10.1007/978-94-015-7799-1",
      "url": "https://link.springer.com/book/10.1007/978-94-015-7799-1",
      "contribution": {
        "en": "Develops spatial-lag and spatial-error regression specifications and model diagnostics.",
        "pt": "Desenvolve especificações de regressão com defasagem espacial e erro espacial e diagnósticos de modelos."
      },
      "assumptions": {
        "en": "Spatial weights encode an explicit modelling assumption; simultaneous response-lag regression differs from a recursive conditional likelihood.",
        "pt": "Pesos espaciais codificam hipótese explícita de modelagem; regressão com defasagem simultânea da resposta difere de verossimilhança condicional recursiva."
      },
      "stage": "masters",
      "verification": "publisher-catalogue",
      "essential": false
    },
    {
      "id": "ord75",
      "section": "A",
      "authors": "J. Keith Ord",
      "title": "Estimation Methods for Models of Spatial Interaction",
      "year": 1975,
      "venue": "Journal of the American Statistical Association, 70(349), 120–126",
      "identifier": "10.1080/01621459.1975.10480272",
      "url": "https://www.tandfonline.com/doi/abs/10.1080/01621459.1975.10480272",
      "contribution": {
        "en": "Investigates maximum likelihood and alternatives for spatial interaction and regressive-autoregressive models.",
        "pt": "Investiga máxima verossimilhança e alternativas para modelos de interação espacial e regressivo-autorregressivos."
      },
      "assumptions": {
        "en": "The estimator comparison is specific to the paper's spatial-interaction model and sampling design.",
        "pt": "A comparação de estimadores é específica ao modelo de interação espacial e ao delineamento do artigo."
      },
      "stage": "masters",
      "verification": "publisher-abstract",
      "essential": false
    },
    {
      "id": "besag-moran75",
      "section": "A",
      "authors": "Julian Besag; P. A. P. Moran",
      "title": "On the Estimation and Testing of Spatial Interaction in Gaussian Lattice Processes",
      "year": 1975,
      "venue": "Biometrika, 62(3), 555–562",
      "identifier": "10.1093/biomet/62.3.555",
      "url": "https://academic.oup.com/biomet/article/62/3/555/256890",
      "contribution": {
        "en": "Analyzes Gaussian lattice interaction estimation, testing and coding methods.",
        "pt": "Analisa estimação, testes e métodos de codificação para interação em malhas gaussianas."
      },
      "assumptions": {
        "en": "Autonormal and rectangular-lattice assumptions are not generic results for non-Gaussian conditional spatial regression.",
        "pt": "Hipóteses autônormais e de malha retangular não são resultados gerais para regressão espacial condicional não gaussiana."
      },
      "stage": "masters",
      "verification": "publisher-abstract",
      "essential": false
    },
    {
      "id": "mardia84",
      "section": "A",
      "authors": "Kanti V. Mardia; R. J. Marshall",
      "title": "Maximum Likelihood Estimation of Models for Residual Covariance in Spatial Regression",
      "year": 1984,
      "venue": "Biometrika, 71(1), 135–146",
      "identifier": "10.1093/biomet/71.1.135",
      "url": "https://academic.oup.com/biomet/article/71/1/135/349384",
      "contribution": {
        "en": "Develops Gaussian spatial regression covariance estimation and model-specific large-sample conditions.",
        "pt": "Desenvolve estimação de covariância em regressão espacial gaussiana e condições de grandes amostras específicas do modelo."
      },
      "assumptions": {
        "en": "Gaussian residuals and the paper's covariance regularity conditions are essential to the stated inferential properties.",
        "pt": "Resíduos gaussianos e condições de regularidade da covariância do artigo são essenciais às propriedades inferenciais enunciadas."
      },
      "stage": "phd",
      "verification": "publisher-abstract",
      "essential": false
    },
    {
      "id": "dreassi17",
      "section": "A",
      "authors": "Emanuela Dreassi; Pietro Rigo",
      "title": "A Note on Compatibility of Conditional Autoregressive Models",
      "year": 2017,
      "venue": "Statistics & Probability Letters, 125, 9–16",
      "identifier": "10.1016/j.spl.2017.01.008",
      "url": "https://www.sciencedirect.com/science/article/abs/pii/S0167715217300317",
      "contribution": {
        "en": "Distinguishes proper and improper compatibility of full conditional kernels, including CAR cases.",
        "pt": "Distingue compatibilidade própria e imprópria de núcleos condicionais completos, incluindo casos CAR."
      },
      "assumptions": {
        "en": "The characterizations require the paper's functional-form assumptions; a formal conditional expression alone is not a normalized joint probability model.",
        "pt": "As caracterizações exigem hipóteses sobre a forma funcional; uma expressão condicional formal não é, por si só, modelo conjunto normalizado."
      },
      "stage": "phd",
      "verification": "publisher-abstract",
      "essential": true
    },
    {
      "id": "bardos15",
      "section": "A",
      "authors": "David C. Bardos; Gurutzeta Guillera-Arroita; Brendan A. Wintle",
      "title": "Valid Auto-models for Spatially Autocorrelated Occupancy and Abundance Data",
      "year": 2015,
      "venue": "Methods in Ecology and Evolution, 6(10), 1137–1149",
      "identifier": "10.1111/2041-210X.12402",
      "url": "https://besjournals.onlinelibrary.wiley.com/doi/10.1111/2041-210X.12402",
      "contribution": {
        "en": "Shows practical consequences of invalid conditional neighbourhood weights and interaction restrictions in non-Gaussian auto-models.",
        "pt": "Mostra consequências práticas de pesos de vizinhança condicionais e restrições de interação inválidos em automodelos não gaussianos."
      },
      "assumptions": {
        "en": "Neighbourhood symmetry and distribution-specific normalizability matter; auto-Poisson does not permit unrestricted cooperative interaction.",
        "pt": "Simetria de vizinhança e normalizabilidade específica da distribuição importam; auto-Poisson não permite cooperação irrestrita."
      },
      "stage": "masters",
      "verification": "publisher-fulltext-page",
      "essential": true
    },
    {
      "id": "varin11",
      "section": "A",
      "authors": "Cristiano Varin; Nancy Reid; David Firth",
      "title": "An Overview of Composite Likelihood Methods",
      "year": 2011,
      "venue": "Statistica Sinica, 21(1), 5–42",
      "identifier": "ISSN 1017-0405",
      "url": "https://wrap.warwick.ac.uk/41190/",
      "contribution": {
        "en": "Surveys marginal and conditional composite likelihood and Godambe-information-based inference.",
        "pt": "Revisa verossimilhança composta marginal e condicional e inferência baseada na informação de Godambe."
      },
      "assumptions": {
        "en": "A product of dependent factors is generally not the full likelihood; the sandwich/Godambe matrix replaces naive Fisher-based uncertainty in the specified regime.",
        "pt": "Produto de fatores dependentes geralmente não é verossimilhança plena; matriz sanduíche/Godambe substitui incerteza ingênua baseada em Fisher no regime especificado."
      },
      "stage": "phd",
      "verification": "institutional-metadata",
      "essential": true
    },
    {
      "id": "diggle98",
      "section": "A",
      "authors": "Peter J. Diggle; Jonathan A. Tawn; R. A. Moyeed",
      "title": "Model-based Geostatistics",
      "year": 1998,
      "venue": "Journal of the Royal Statistical Society, Series C, 47(3), 299–350",
      "identifier": "10.1111/1467-9876.00113",
      "url": "https://rss.onlinelibrary.wiley.com/doi/10.1111/1467-9876.00113",
      "contribution": {
        "en": "Constructs non-Gaussian spatial observation models driven by a latent Gaussian geostatistical process.",
        "pt": "Constrói modelos observacionais espaciais não gaussianos conduzidos por processo geoestatístico gaussiano latente."
      },
      "assumptions": {
        "en": "Conditional independence given a latent process is not the same as neighbours' full conditionals of observed responses.",
        "pt": "Independência condicional dado processo latente não é o mesmo que condicionais completas das respostas observadas pelos vizinhos."
      },
      "stage": "masters",
      "verification": "publisher-abstract",
      "essential": true
    },
    {
      "id": "diggle07",
      "section": "B",
      "authors": "Peter J. Diggle; Paulo J. Ribeiro Jr.",
      "title": "Model-based Geostatistics",
      "year": 2007,
      "venue": "Springer Series in Statistics, 1st ed.; hardcover ISBN 9780387329079",
      "identifier": "10.1007/978-0-387-48536-2",
      "url": "https://link.springer.com/book/10.1007/978-0-387-48536-2",
      "contribution": {
        "en": "Provides a model-based treatment of covariance, prediction and inference for geostatistical observations.",
        "pt": "Oferece tratamento baseado em modelos de covariância, predição e inferência para observações geoestatísticas."
      },
      "assumptions": {
        "en": "Distinguishes latent process, observation error and assumptions made for kriging or likelihood.",
        "pt": "Distingue processo latente, erro observacional e hipóteses para krigagem ou verossimilhança."
      },
      "stage": "undergraduate",
      "verification": "publisher-catalogue",
      "essential": true
    },
    {
      "id": "stein99",
      "section": "B",
      "authors": "Michael L. Stein",
      "title": "Interpolation of Spatial Data: Some Theory for Kriging",
      "year": 1999,
      "venue": "Springer Series in Statistics; hardcover ISBN 9780387986296",
      "identifier": "10.1007/978-1-4612-1494-6",
      "url": "https://link.springer.com/book/10.1007/978-1-4612-1494-6",
      "contribution": {
        "en": "Explains kriging, covariance regularity and what can be learned in spatial infill asymptotics.",
        "pt": "Explica krigagem, regularidade da covariância e o que pode ser aprendido em assintótica de domínio fixo."
      },
      "assumptions": {
        "en": "Identifiability of covariance parameters under infill need not match increasing-domain identifiability.",
        "pt": "Identificabilidade de parâmetros de covariância sob domínio fixo não precisa coincidir com a de domínio crescente."
      },
      "stage": "phd",
      "verification": "publisher-catalogue",
      "essential": true
    },
    {
      "id": "rue05",
      "section": "B",
      "authors": "Håvard Rue; Leonhard Held",
      "title": "Gaussian Markov Random Fields: Theory and Applications",
      "year": 2005,
      "venue": "Chapman & Hall/CRC; print ISBN 9781584884323",
      "identifier": "ISBN 9781584884323",
      "url": "https://www.routledge.com/Gaussian-Markov-Random-Fields-Theory-and-Applications/Rue-Held/p/book/9781584884323",
      "contribution": {
        "en": "Connects conditional independence, sparse precision matrices, simulation and hierarchical inference.",
        "pt": "Relaciona independência condicional, matrizes de precisão esparsas, simulação e inferência hierárquica."
      },
      "assumptions": {
        "en": "A proper finite Gaussian field requires positive-definite precision; intrinsic GMRFs need identifiability constraints or a proper posterior construction.",
        "pt": "Um campo gaussiano próprio finito requer precisão positiva definida; GMRFs intrínsecos precisam de restrições de identificabilidade ou construção posterior própria."
      },
      "stage": "masters",
      "verification": "publisher-catalogue",
      "essential": true
    },
    {
      "id": "banerjee14",
      "section": "B",
      "authors": "Sudipto Banerjee; Bradley P. Carlin; Alan E. Gelfand",
      "title": "Hierarchical Modeling and Analysis for Spatial Data, 2nd ed.",
      "year": 2014,
      "venue": "Chapman & Hall/CRC; print ISBN 9781439819173",
      "identifier": "ISBN 9781439819173",
      "url": "https://books.google.com/books/about/Hierarchical_Modeling_and_Analysis_for_S.html?id=zNLhAwAAQBAJ",
      "contribution": {
        "en": "Integrates observation, process and parameter layers for geostatistical, areal and space–time models.",
        "pt": "Integra camadas observacional, de processo e de parâmetros para modelos geoestatísticos, de área e espaço-temporais."
      },
      "assumptions": {
        "en": "Latent spatial effects and regression coefficients can be confounded; prior assumptions and spatial scale matter.",
        "pt": "Efeitos espaciais latentes e coeficientes de regressão podem sofrer confundimento; hipóteses a priori e escala espacial importam."
      },
      "stage": "masters",
      "verification": "bibliographic-catalogue",
      "essential": true
    },
    {
      "id": "cressie-wikle11",
      "section": "B",
      "authors": "Noel Cressie; Christopher K. Wikle",
      "title": "Statistics for Spatio-Temporal Data",
      "year": 2011,
      "venue": "Wiley; print ISBN 9780471692744",
      "identifier": "ISBN 9780471692744",
      "url": "https://books.google.com/books/about/Statistics_for_Spatio_Temporal_Data.html?id=-kOC6D0DiNYC",
      "contribution": {
        "en": "Develops dynamic hierarchical space–time processes and inference with evolving spatial fields.",
        "pt": "Desenvolve processos espaço-temporais hierárquicos dinâmicos e inferência com campos espaciais em evolução."
      },
      "assumptions": {
        "en": "Temporal evolution and spatial covariance require compatible process and observation layers.",
        "pt": "Evolução temporal e covariância espacial exigem camadas de processo e observação compatíveis."
      },
      "stage": "masters",
      "verification": "bibliographic-catalogue",
      "essential": true
    },
    {
      "id": "gneiting02",
      "section": "B",
      "authors": "Tilmann Gneiting",
      "title": "Nonseparable, Stationary Covariance Functions for Space–Time Data",
      "year": 2002,
      "venue": "Journal of the American Statistical Association, 97(458), 590–600",
      "identifier": "10.1198/016214502760047113",
      "url": "https://www.tandfonline.com/doi/abs/10.1198/016214502760047113",
      "contribution": {
        "en": "Develops positive-definite nonseparable space–time covariance classes.",
        "pt": "Desenvolve classes de covariâncias espaço-temporais não separáveis positivas definidas."
      },
      "assumptions": {
        "en": "Positive definiteness and the class's parameter/domain restrictions must be checked before fitting.",
        "pt": "A positividade definida e restrições de parâmetros e domínio da classe devem ser verificadas antes do ajuste."
      },
      "stage": "phd",
      "verification": "publisher-abstract",
      "essential": true
    },
    {
      "id": "rue09",
      "section": "B",
      "authors": "Håvard Rue; Sara Martino; Nicolas Chopin",
      "title": "Approximate Bayesian Inference for Latent Gaussian Models by Using Integrated Nested Laplace Approximations",
      "year": 2009,
      "venue": "Journal of the Royal Statistical Society, Series B, 71(2), 319–392",
      "identifier": "10.1111/j.1467-9868.2008.00700.x",
      "url": "https://rss.onlinelibrary.wiley.com/doi/10.1111/j.1467-9868.2008.00700.x",
      "contribution": {
        "en": "Introduces INLA approximations for suitable latent-Gaussian model classes.",
        "pt": "Introduz aproximações INLA para classes apropriadas de modelos gaussianos latentes."
      },
      "assumptions": {
        "en": "Requires a supported latent Gaussian structure and computational regularity; not a generic solver for arbitrary conditional spatial ARMA models.",
        "pt": "Exige estrutura gaussiana latente suportada e regularidade computacional; não é solução genérica para modelos ARMA espaciais condicionais arbitrários."
      },
      "stage": "phd",
      "verification": "publisher-abstract",
      "essential": true
    },
    {
      "id": "lindgren11",
      "section": "B",
      "authors": "Finn Lindgren; Håvard Rue; Johan Lindström",
      "title": "An Explicit Link Between Gaussian Fields and Gaussian Markov Random Fields: The Stochastic Partial Differential Equation Approach",
      "year": 2011,
      "venue": "Journal of the Royal Statistical Society, Series B, 73(4), 423–498",
      "identifier": "10.1111/j.1467-9868.2011.00777.x",
      "url": "https://rss.onlinelibrary.wiley.com/doi/abs/10.1111/j.1467-9868.2011.00777.x",
      "contribution": {
        "en": "Links selected continuously indexed Gaussian fields to sparse GMRF representations through SPDE constructions.",
        "pt": "Relaciona campos gaussianos contínuos selecionados a representações GMRF esparsas via construções SPDE."
      },
      "assumptions": {
        "en": "The SPDE operator, boundary conditions and finite-element approximation govern the represented covariance and discretization error.",
        "pt": "Operador SPDE, condições de contorno e aproximação por elementos finitos determinam a covariância representada e o erro de discretização."
      },
      "stage": "phd",
      "verification": "publisher-abstract",
      "essential": true
    },
    {
      "id": "reich06",
      "section": "B",
      "authors": "Brian J. Reich; James S. Hodges; Vesna Zadnik",
      "title": "Effects of Residual Smoothing on the Posterior of the Fixed Effects in Disease-Mapping Models",
      "year": 2006,
      "venue": "Biometrics, 62(4), 1197–1206",
      "identifier": "10.1111/j.1541-0420.2006.00617.x",
      "url": "https://academic.oup.com/biometrics/article-abstract/62/4/1197/7324934",
      "contribution": {
        "en": "Shows spatial confounding between regressors and CAR latent effects in disease mapping.",
        "pt": "Mostra confundimento espacial entre regressores e efeitos latentes CAR em mapeamento de doenças."
      },
      "assumptions": {
        "en": "The effect and remedy depend on the specified regression, prior and spatial design.",
        "pt": "O efeito e o tratamento dependem de regressão, prior e delineamento espacial especificados."
      },
      "stage": "phd",
      "verification": "publisher-abstract",
      "essential": false
    },
    {
      "id": "besag-york91",
      "section": "B",
      "authors": "Julian Besag; Jeremy York; Annie Mollié",
      "title": "Bayesian Image Restoration, with Two Applications in Spatial Statistics",
      "year": 1991,
      "venue": "Annals of the Institute of Statistical Mathematics, 43(1), 1–20",
      "identifier": "10.1007/BF00116466",
      "url": "https://link.springer.com/article/10.1007/BF00116466",
      "contribution": {
        "en": "Links Markov-field priors, Bayesian image restoration and spatial applications.",
        "pt": "Relaciona priors de campos de Markov, restauração bayesiana de imagens e aplicações espaciais."
      },
      "assumptions": {
        "en": "The latent-field prior and observation likelihood are distinct; posterior propriety and MCMC convergence deserve checking.",
        "pt": "Prior do campo latente e verossimilhança observacional são distintas; propriedade da posterior e convergência MCMC exigem conferência."
      },
      "stage": "masters",
      "verification": "publisher-and-institutional-metadata",
      "essential": false
    },
    {
      "id": "diggle14",
      "section": "B",
      "authors": "Peter J. Diggle",
      "title": "Statistical Analysis of Spatial and Spatio-Temporal Point Patterns, 3rd ed.",
      "year": 2014,
      "venue": "Chapman & Hall/CRC; print ISBN 9781466560239",
      "identifier": "ISBN 9781466560239",
      "url": "https://www.routledge.com/Statistical-Analysis-of-Spatial-and-Spatio-Temporal-Point-Patterns/author/p/book/9781466560239",
      "contribution": {
        "en": "Introduces point-process inference as an independent spatial-data type and extends it to space–time patterns.",
        "pt": "Introduz inferência por processos pontuais como tipo independente de dado espacial e a estende a padrões espaço-temporais."
      },
      "assumptions": {
        "en": "Random event locations and counting measures are not interchangeable with fixed-site lattice measurements.",
        "pt": "Localizações aleatórias de eventos e medidas de contagem não são intercambiáveis com medições em locais fixos de malha."
      },
      "stage": "masters",
      "verification": "publisher-catalogue",
      "essential": false
    },
    {
      "id": "moller03",
      "section": "B",
      "authors": "Jesper Møller; Rasmus Plenge Waagepetersen",
      "title": "Statistical Inference and Simulation for Spatial Point Processes",
      "year": 2003,
      "venue": "Chapman & Hall/CRC, Monographs on Statistics and Applied Probability 100; ISBN 1584882654",
      "identifier": "ISBN 1584882654",
      "url": "https://vbn.aau.dk/en/publications/statistical-inference-and-simulation-for-spatial-point-processes/",
      "contribution": {
        "en": "Provides a more advanced reference on spatial point-process model construction and simulation.",
        "pt": "Oferece referência avançada para construção e simulação de modelos de processos pontuais espaciais."
      },
      "assumptions": {
        "en": "Point-process likelihood and Monte Carlo inference require a defined observation window and point-process law.",
        "pt": "Verossimilhança de processos pontuais e inferência Monte Carlo requerem janela observacional e lei do processo pontual definidas."
      },
      "stage": "phd",
      "verification": "institutional-catalogue",
      "essential": false
    },
    {
      "id": "besag75",
      "section": "A",
      "authors": "Julian Besag",
      "title": "Statistical Analysis of Non-Lattice Data",
      "year": 1975,
      "venue": "Journal of the Royal Statistical Society, Series D (The Statistician), 24(3), 179–195",
      "identifier": "10.2307/2987782",
      "url": "https://doi.org/10.2307/2987782",
      "contribution": {
        "en": "Develops a Markovian spatial-interaction treatment for irregular sampling sites and methods related to conditional estimation.",
        "pt": "Desenvolve tratamento de interação espacial markoviana para locais de amostragem irregulares e métodos ligados à estimação condicional."
      },
      "assumptions": {
        "en": "The methods apply to specified Markovian spatial models; do not interpret conditional-product inference as full likelihood without an appropriate joint construction.",
        "pt": "Os métodos aplicam-se a modelos espaciais markovianos especificados; não interprete inferência por produto condicional como verossimilhança plena sem construção conjunta apropriada."
      },
      "stage": "masters",
      "verification": "publisher-abstract",
      "essential": true
    },
    {
      "id": "gelfand-smith90",
      "section": "B",
      "authors": "Alan E. Gelfand; Adrian F. M. Smith",
      "title": "Sampling-Based Approaches to Calculating Marginal Densities",
      "year": 1990,
      "venue": "Journal of the American Statistical Association, 85(410), 398–409",
      "identifier": "10.1080/01621459.1990.10476213",
      "url": "https://doi.org/10.1080/01621459.1990.10476213",
      "contribution": {
        "en": "Systematically compares Gibbs sampling, stochastic substitution and sampling-importance-resampling for numerical marginal posterior calculation.",
        "pt": "Compara sistematicamente amostragem de Gibbs, substituição estocástica e amostragem-ponderação-reamostragem para cálculo numérico de marginais posteriores."
      },
      "assumptions": {
        "en": "Monte Carlo targets require a proper specified joint distribution and computational convergence or adequate sampling diagnostics; sampling output alone does not establish posterior propriety.",
        "pt": "Alvos Monte Carlo exigem distribuição conjunta própria e especificada e convergência computacional ou diagnósticos amostrais adequados; a saída do amostrador não estabelece, por si só, propriedade posterior."
      },
      "stage": "masters",
      "verification": "publisher-abstract",
      "essential": true
    },
    {
      "id": "besag-green93",
      "section": "B",
      "authors": "Julian Besag; Peter J. Green",
      "title": "Spatial Statistics and Bayesian Computation",
      "year": 1993,
      "venue": "Journal of the Royal Statistical Society, Series B, 55(1), 25–37",
      "identifier": "10.1111/j.2517-6161.1993.tb01467.x",
      "url": "https://doi.org/10.1111/j.2517-6161.1993.tb01467.x",
      "contribution": {
        "en": "Reviews Bayesian MCMC developments for spatial Markov fields and illustrates spatial applications, including agricultural field experiments.",
        "pt": "Revisa desenvolvimentos de MCMC bayesiano para campos espaciais markovianos e ilustra aplicações espaciais, inclusive experimentos agrícolas."
      },
      "assumptions": {
        "en": "Gibbs or auxiliary-variable sampling requires a specified posterior target and does not by itself guarantee a proper posterior or well-mixed chains.",
        "pt": "Amostragem de Gibbs ou por variáveis auxiliares requer posterior-alvo especificada e não garante, por si, posterior própria nem cadeias bem misturadas."
      },
      "stage": "phd",
      "verification": "publisher-abstract",
      "essential": false
    }
  ]
};
  const i=(D.readingGuides||[]).findIndex(x=>x.id==='spatial-models');
  if(i>=0)D.readingGuides[i]={...D.readingGuides[i],...D.spatialGuide,references:D.spatialGuide.references};
})();
