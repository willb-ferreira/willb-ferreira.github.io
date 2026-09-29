/* Topic 2 and its methodological bridge to Information Geometry.
 * Public-facing text stays introductory; detailed bibliography remains in the
 * existing editorial source. No claim of unpublished results is made. */
(() => {
  "use strict";
  const D = window.PORTFOLIO;
  if (!D) return;
  const b = (en, pt) => ({ en, pt });
  const reference = (id, authors, title, year, url, en, pt, kind="next") =>
    ({id, authors, title, year, url, note:b(en,pt), kind});
  const theoryCard = D.research.find(r=>r.id==="theory");
  const geometryCard = D.research.find(r=>r.id==="geometry");
  const theory = D.readingGuides.find(g=>g.id==="theory");
  const geometry = D.readingGuides.find(g=>g.id==="geometry");
  if (!theoryCard || !geometryCard || !theory || !geometry) return;

  theoryCard.summary = b(
    "Classical and Bayesian inference, statistical information, divergence-based estimation and hypothesis testing, and asymptotic theory.",
    "Inferência clássica e bayesiana, informação estatística, estimação e testes de hipóteses baseados em divergências e teoria assintótica."
  );
  theoryCard.keywords = [b("Classical and Bayesian", "Clássica e bayesiana"), b("Information and divergences", "Informação e divergências")];

  theory.question = b(
    "How do model assumptions, information measures and asymptotic theory justify estimation and hypothesis testing?",
    "Como hipóteses de modelagem, medidas de informação e teoria assintótica fundamentam a estimação e os testes de hipóteses?"
  );
  theory.entry = b(
    "Classical and Bayesian inference answer related but distinct questions about evidence and uncertainty. Divergences can construct estimators and tests in several inferential frameworks; they are mathematical tools, not a separate school of inference.",
    "Inferência clássica e bayesiana respondem a questões relacionadas, mas distintas, sobre evidência e incerteza. Divergências podem construir estimadores e testes em diferentes paradigmas inferenciais; são ferramentas matemáticas, não uma terceira escola de inferência."
  );
  theory.background = b(
    "Probability, likelihood, mathematical statistics and calculus; real analysis for advanced asymptotics.",
    "Probabilidade, verossimilhança, estatística matemática e cálculo; análise real para assintótica avançada."
  );
  theory.shared = b(
    "Identifiability, regularity, information and uncertainty are common concerns. Consistency, limiting laws, robustness and test calibration must be established for the specified model and sampling regime; dependent observations may require different asymptotics.",
    "Identificabilidade, regularidade, informação e incerteza são preocupações comuns. Consistência, leis-limite, robustez e calibração de testes devem ser estabelecidas para o modelo e regime amostral especificados; observações dependentes podem exigir outra assintótica."
  );
  theory.tracks = [
    {
      id:"classical",
      title:b("Classical statistical inference","Inferência estatística clássica"),
      description:b(
        "Point estimation, likelihood and estimating equations; confidence intervals and likelihood-ratio, Wald and score tests. Study their assumptions, efficiency and finite- or large-sample validity.",
        "Estimação pontual, verossimilhança e equações de estimação; intervalos de confiança e testes da razão de verossimilhanças, Wald e escore. Estude suas hipóteses, eficiência e validade finito-amostral ou assintótica."
      ),
      refs:["lehmann-casella","lehmann-romano"]
    },
    {
      id:"bayesian",
      title:b("Bayesian statistical inference","Inferência estatística bayesiana"),
      description:b(
        "Prior, likelihood and posterior; estimation, credible regions, posterior predictive assessment and model comparison. Bayes factors require suitable prior specifications, including care with improper priors.",
        "Prior, verossimilhança e posterior; estimação, regiões de credibilidade, avaliação preditiva posterior e comparação de modelos. Fatores de Bayes exigem especificações a priori adequadas, com cuidado especial para priors impróprias."
      ),
      refs:["gelman-bda","bernardo-smith"]
    },
    {
      id:"information",
      title:b("Statistical information and divergence-based inference","Informação estatística e inferência por divergências"),
      description:b(
        "Fisher information, Kullback–Leibler, φ-divergences and density-power divergence can support estimation and hypothesis tests. Their robustness and null distributions are method- and model-specific; geodesic-distance tests form a related geometric bridge.",
        "Informação de Fisher, Kullback–Leibler, φ-divergências e divergência de potência de densidade podem fundamentar estimação e testes. Robustez e distribuições sob a hipótese nula dependem do método e do modelo; testes por distância geodésica constituem uma ponte geométrica relacionada."
      ),
      refs:["pardo-2006","basu-1998","van-der-vaart"]
    }
  ];
  theory.crosslink = {
    target:"geometry",
    label:b(
      "Continue in Information Geometry: Fisher–Rao distance, geodesics and geometric tests",
      "Continue em Geometria da Informação: distância de Fisher–Rao, geodésicas e testes geométricos"
    )
  };
  const theoryIds = new Map([
    ["Theory of Point Estimation, 2nd ed.","lehmann-casella"],
    ["Testing Statistical Hypotheses, 3rd ed.","lehmann-romano"],
    ["Asymptotic Statistics","van-der-vaart"]
  ]);
  theory.references = theory.references.map(r =>
    theoryIds.has(r.title) ? {...r, id:theoryIds.get(r.title)} : r
  );
  theory.references.push(
    reference("gelman-bda",
      "Andrew Gelman; John B. Carlin; Hal S. Stern; David B. Dunson; Aki Vehtari; Donald B. Rubin",
      "Bayesian Data Analysis, 3rd ed.",2013,
      "https://www.routledge.com/link/link/p/book/9781439840955",
      "A model-based introduction to posterior inference, computation and predictive checks.",
      "Introdução baseada em modelos à inferência posterior, computação e avaliação preditiva.", "entry"),
    reference("bernardo-smith","José M. Bernardo; Adrian F. M. Smith",
      "Bayesian Theory",1994,
      "https://www.wiley-vch.de/en/areas-interest/mathematics-statistics/bayesian-theory-978-0-471-92416-6",
      "A mathematical route through Bayesian decision theory, prior specification and information.",
      "Percurso matemático por teoria da decisão bayesiana, especificação de priors e informação.", "foundation"),
    reference("pardo-2006","Leandro Pardo",
      "Statistical Inference Based on Divergence Measures",2006,
      "https://www.routledge.com/Statistical-Inference-Based-on-Divergence-Measures/Pardo/p/book/9780429148521",
      "Develops divergence-based estimation and hypothesis tests, especially through φ-divergences.",
      "Desenvolve estimação e testes de hipóteses por divergências, especialmente φ-divergências.", "seminal"),
    reference("basu-1998","Ayanendranath Basu; Ian R. Harris; Nils L. Hjort; M. C. Jones",
      "Robust and efficient estimation by minimising a density power divergence",1998,
      "https://doi.org/10.1093/biomet/85.3.549",
      "An original route to robust estimation with a tunable efficiency–robustness trade-off.",
      "Fonte original de estimação robusta com compromisso ajustável entre eficiência e robustez.", "seminal")
  );
  theory.visibleReferences = [
    "lehmann-casella","lehmann-romano","gelman-bda","bernardo-smith",
    "pardo-2006","basu-1998","van-der-vaart"
  ];

  geometryCard.summary = b(
    "Statistical manifolds, Fisher–Rao geometry, divergences and geodesic distances, including their use in estimation and hypothesis testing.",
    "Variedades estatísticas, geometria de Fisher–Rao, divergências e distâncias geodésicas, incluindo seu uso em estimação e testes de hipóteses."
  );
  geometry.question = b(
    "How can the geometry of statistical models lead to intrinsic distances, estimators and hypothesis tests?",
    "Como a geometria dos modelos estatísticos pode produzir distâncias intrínsecas, estimadores e testes de hipóteses?"
  );
  geometry.entry = b(
    "Information geometry equips statistical models with Fisher–Rao metrics, connections, divergences and geodesic distances. Besides geometric descriptions, these objects can motivate estimation and testing; a proposed geodesic statistic still requires a valid null distribution and a justified model.",
    "A geometria da informação equipa modelos estatísticos com métricas de Fisher–Rao, conexões, divergências e distâncias geodésicas. Além da descrição geométrica, esses objetos podem fundamentar estimação e testes; uma estatística geodésica proposta ainda exige distribuição nula válida e modelo justificado."
  );
  geometry.path = [
    b(
      "Start with Fisher information as a metric and learn to distinguish local divergences from global geodesic distance.",
      "Comece pela informação de Fisher como métrica e diferencie divergências locais de distância geodésica global."
    ),
    b(
      "Study Amari–Nagaoka, then read a published geodesic-test construction alongside Pardo's divergence-based inference.",
      "Estude Amari–Nagaoka e depois leia uma construção publicada de teste geodésico em paralelo à inferência por divergências de Pardo."
    )
  ];
  geometry.crosslink = {
    target:"theory",
    label:b(
      "Connect to Statistical Inference: estimation, testing and asymptotic calibration",
      "Conecte com Inferência Estatística: estimação, testes e calibração assintótica"
    )
  };
  geometry.references = geometry.references.map(r =>
    r.title==="Information Geometry and Its Applications" ? {...r,id:"amari-2016"} :
    r.title==="Methods of Information Geometry" ? {...r,id:"amari-nagaoka"} : r
  );
  geometry.references.push(
    reference("burbea-del-castillo-1992","Jacob Burbea; Joan del Castillo",
      "Geodesic submanifolds of statistical models with location parameters",1992,
      "https://doi.org/10.1016/0167-9473(92)90041-D",
      "Published criteria for geodesic submanifolds and their application to tests based on information-geodesic distance.",
      "Critérios publicados para subvariedades geodésicas e sua aplicação a testes baseados na distância geodésica de informação.", "seminal"),
    reference("pardo-geometry","Leandro Pardo",
      "Statistical Inference Based on Divergence Measures",2006,
      "https://www.routledge.com/Statistical-Inference-Based-on-Divergence-Measures/Pardo/p/book/9780429148521",
      "A complementary inferential approach: divergence-based estimators and tests, not a claim that every divergence equals geodesic distance.",
      "Abordagem inferencial complementar: estimadores e testes por divergências, sem identificar toda divergência à distância geodésica.", "next")
  );
  geometry.visibleReferences = [
    "amari-2016","amari-nagaoka","burbea-del-castillo-1992","pardo-geometry"
  ];
})();
