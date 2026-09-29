/* Topic 5: three concise information-geometry pathways. Loaded after the established
 * inference and imaging curations. Retains all prior scholarly source records.
 * The inferential and computational routes are developing interests, not claims
 * of published personal contributions or unpublished results. */
(() => {
  "use strict";
  const D=window.PORTFOLIO;
  if(!D)return;
  const b=(en,pt)=>({en,pt});
  const card=D.research.find(r=>r.id==="geometry");
  const guide=D.readingGuides.find(g=>g.id==="geometry");
  if(!card||!guide)return;
  const ref=(id,authors,title,year,url,en,pt,kind,venue)=>({
    id,authors,title,year,url,kind,venue,note:b(en,pt)
  });
  card.summary=b(
    "Statistical manifolds, geodesic estimation and hypothesis testing, and geometric computation for structured probabilistic models.",
    "Variedades estatísticas, estimação e testes de hipóteses geodésicos e computação geométrica para modelos probabilísticos estruturados."
  );
  card.keywords=[b("Fisher–Rao geometry","Geometria de Fisher–Rao"),
    b("Geodesic tests","Testes geodésicos"),
    b("Geometric computation","Computação geométrica")];
  guide.question=b(
    "How can the geometry of probability models support statistical inference and computation?",
    "Como a geometria dos modelos probabilísticos pode fundamentar inferência estatística e computação?"
  );
  guide.entry=b(
    "Information geometry studies statistical models through metrics, divergences and affine connections. Three linked routes lead from the geometry of probability distributions to geodesic estimation and testing, then to geometric computation for structured models. These are study and research directions, not claims of completed original contributions.",
    "A geometria da informação estuda modelos estatísticos por métricas, divergências e conexões afins. Três percursos articulados vão da geometria das distribuições à estimação e aos testes por distâncias geodésicas e, depois, à computação geométrica para modelos estruturados. São percursos de estudo e pesquisa, não alegações de contribuições originais já concluídas."
  );
  guide.background=b(
    "Probability, likelihood, multivariable calculus and linear algebra; differential geometry for advanced reading.",
    "Probabilidade, verossimilhança, cálculo multivariado e álgebra linear; geometria diferencial para leituras avançadas."
  );
  guide.shared=b(
    "Begin with Fisher information as a local metric and distinguish divergences, affine connections and global geodesic distance. All three routes require a specified model and justified regularity; a useful geometric distance does not automatically provide an estimator or a calibrated hypothesis test.",
    "Comece pela informação de Fisher como métrica local e diferencie divergências, conexões afins e distância geodésica global. Os três percursos exigem modelo especificado e regularidade justificada; uma distância geométrica útil não fornece automaticamente estimador ou teste de hipóteses calibrado."
  );
  guide.tracks=[
    {
      id:"foundations",
      title:b("Statistical manifolds and dual geometry",
        "Variedades estatísticas e geometria dual"),
      description:b(
        "Study Fisher–Rao metrics, exponential families, divergences, dual affine connections and geodesics. Local information geometry and global distance answer different mathematical questions.",
        "Estude métricas de Fisher–Rao, famílias exponenciais, divergências, conexões afins duais e geodésicas. Geometria da informação local e distância global respondem a questões matemáticas diferentes."
      ),
      refs:["amari-2016","amari-nagaoka"]
    },
    {
      id:"inference",
      title:b("Geometric estimation and hypothesis testing",
        "Estimação geométrica e testes de hipóteses"),
      description:b(
        "Investigate estimators and tests constructed from divergences or geodesic distances. The papers of Menéndez, Morales, Pardo and Salicrú give published geodesic-test constructions; calibration, identifiability and limiting laws remain model-specific.",
        "Investigue estimadores e testes construídos com divergências ou distâncias geodésicas. Os trabalhos de Menéndez, Morales, Pardo e Salicrú apresentam construções publicadas de testes geodésicos; calibração, identificabilidade e leis-limite dependem do modelo."
      ),
      refs:["menendez-morales-pardo-salicru-1995",
        "menendez-morales-pardo-salicru-1997"]
    },
    {
      id:"computation",
      title:b("Geometric computation and structured statistical models",
        "Computação geométrica e modelos estatísticos estruturados"),
      description:b(
        "Learn natural-gradient optimization and numerical Fisher–Rao distances for multivariate Gaussian families. Matrix-valued models connect this route to imaging; published PolSAR classification by stochastic distances is related but is not automatically a Fisher–Rao geodesic method.",
        "Estude otimização por gradiente natural e distâncias de Fisher–Rao numéricas em famílias gaussianas multivariadas. Modelos matriciais conectam esta vertente a imagens; a classificação PolSAR publicada por distâncias estocásticas é relacionada, mas não constitui automaticamente um método geodésico de Fisher–Rao."
      ),
      refs:["amari-natural-gradient-1998","nielsen-fisher-rao-2023","gomez-wishart-2015"]
    }
  ];
  const originalRefs=new Map(guide.references.map(r=>[r.id,r]));
  for(const id of ["amari-2016","amari-nagaoka","burbea-del-castillo-1992",
    "menendez-morales-pardo-salicru-1995",
    "menendez-morales-pardo-salicru-1997"]){
    if(!originalRefs.has(id))throw Error("Existing Information Geometry reference missing: "+id);
  }
  guide.references.push(
    ref("amari-natural-gradient-1998","Shun-ichi Amari",
      "Natural Gradient Works Efficiently in Learning",1998,
      "https://doi.org/10.1162/089976698300017746",
      "Introduces the natural gradient in parameter spaces with information-geometric structure, including learning and matrix models.",
      "Introduz o gradiente natural em espaços de parâmetros com estrutura geométrica de informação, incluindo aprendizado e modelos matriciais.",
      "seminal","Neural Computation 10(2), 251–276"),
    ref("nielsen-fisher-rao-2023","Frank Nielsen",
      "A Simple Approximation Method for the Fisher–Rao Distance between Multivariate Normal Distributions",2023,
      "https://doi.org/10.3390/e25040654",
      "Approximates Fisher–Rao distance between multivariate normal distributions by discretizing curves and using local Jeffreys divergence; the approximation is not a generic closed form.",
      "Aproxima a distância de Fisher–Rao entre distribuições normais multivariadas discretizando curvas e usando divergência de Jeffreys local; a aproximação não é uma fórmula fechada geral.",
      "next","Entropy 25(4), article 654"),
    ref("gomez-wishart-2015","Luis Gomez; Luis Alvarez; Luis Mazorra; Alejandro C. Frery",
      "Classification of complex Wishart matrices with a diffusion-reaction system guided by stochastic distances",2015,
      "https://doi.org/10.1098/rsta.2015.0118",
      "An imaging bridge: PolSAR classification of complex Wishart matrices using stochastic distances and a diffusion–reaction system; no Fisher–Rao geodesic equivalence is claimed.",
      "Uma ponte com imagens: classificação PolSAR de matrizes Wishart complexas por distâncias estocásticas e sistema de difusão–reação; não se afirma equivalência com geodésicas de Fisher–Rao.",
      "next","Philosophical Transactions A 373(2056), article 20150118")
  );
  // Preserve Pardo (2006), Efron, Chentsov and all existing deeper references
  // without repeating the Pardo book visible in Topic 2.
  guide.visibleReferences=[
    "amari-2016","amari-nagaoka","burbea-del-castillo-1992",
    "menendez-morales-pardo-salicru-1995",
    "menendez-morales-pardo-salicru-1997",
    "amari-natural-gradient-1998","nielsen-fisher-rao-2023",
    "gomez-wishart-2015"
  ];
  guide.crosslink={
    target:"theory",
    label:b(
      "Statistical Inference: divergence-based estimation, hypothesis tests and asymptotic calibration",
      "Inferência Estatística: estimação por divergências, testes e calibração assintótica"
    )
  };
  guide.relatedGuides=[
    {target:"sar",label:b(
      "Statistical Image Processing: SAR/PolSAR covariance models, classification and stochastic distances",
      "Processamento Estatístico de Imagens: modelos de covariância SAR/PolSAR, classificação e distâncias estocásticas"
    )},
    {target:"spatial-models",label:b(
      "Time Series and Spatial Statistics: information and uncertainty for dependent observations",
      "Séries Temporais e Estatística Espacial: informação e incerteza para observações dependentes"
    )}
  ];
})();