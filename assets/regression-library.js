/* Regression Topic 4: three short bilingual pathways. This final editorial layer
 * preserves the existing GLM/GEE bibliography and approved academic records.
 * Hierarchical/Bayesian and flexible/distributional models are presented as
 * distinct, connected statistical constructions, not as subclasses of GEE. */
(()=>{
  "use strict";
  const D=window.PORTFOLIO;
  if(!D)return;
  const b=(en,pt)=>({en,pt});
  const card=D.research.find(r=>r.id==="regression");
  const guide=D.readingGuides.find(g=>g.id==="regression");
  if(!card||!guide)return;
  const ref=(id,authors,title,year,url,en,pt,kind,venue)=>({
    id,authors,title,year,url,note:b(en,pt),kind,venue
  });
  card.title=b("Regression Models and Estimating Equations",
    "Modelos de Regressão e Equações de Estimação");
  card.summary=b(
    "Statistical regression for non-Gaussian and correlated outcomes: marginal GEE, mixed and Bayesian hierarchical models, and flexible distributional regression.",
    "Regressão estatística para respostas não gaussianas e correlacionadas: GEE marginal, modelos mistos e hierárquicos bayesianos e regressão distribucional flexível."
  );
  card.keywords=["GEE",b("Hierarchical models","Modelos hierárquicos"),
    b("Distributional regression","Regressão distribucional")];
  guide.question=b(
    "When should regression target a marginal mean, conditional random effects, or several parameters of a response distribution?",
    "Quando a regressão deve modelar a média marginal, efeitos aleatórios condicionais ou vários parâmetros da distribuição da resposta?"
  );
  guide.entry=b(
    "Regression is broader than generalized estimating equations. GEE focuses on marginal mean models for clustered or repeated outcomes; mixed and hierarchical models explicitly represent latent effects; GAM and GAMLSS let regression functions or distributional parameters vary with covariates. These approaches can be connected, but their estimands and assumptions differ.",
    "Regressão é mais ampla que equações de estimação generalizadas. GEE focaliza modelos de média marginal para respostas agrupadas ou repetidas; modelos mistos e hierárquicos representam efeitos latentes explicitamente; GAM e GAMLSS permitem funções de regressão flexíveis ou parâmetros distribucionais dependentes de covariáveis. As abordagens podem se conectar, mas seus estimandos e suas hipóteses diferem."
  );
  guide.background=b(
    "Linear models, GLMs, probability, likelihood and introductory inference; matrix calculus and conditional distributions for advanced work.",
    "Modelos lineares, GLMs, probabilidade, verossimilhança e inferência introdutória; cálculo matricial e distribuições condicionais para aprofundamento."
  );
  guide.shared=b(
    "Define the observational unit, response support, covariates, link and estimand before choosing an estimator. Distinguish within-cluster dependence from independent clusters, marginal from conditional coefficients, and model-based from robust uncertainty. A working correlation does not repair an incorrect mean model; ordinary GEE sandwich inference may be unreliable with few independent clusters.",
    "Defina unidade observacional, suporte da resposta, covariáveis, ligação e estimando antes de escolher o estimador. Diferencie dependência dentro dos grupos de independência entre grupos, coeficientes marginais de condicionais e incerteza baseada no modelo da robusta. Correlação de trabalho não corrige modelo de média incorreto; a inferência sanduíche usual de GEE pode ser pouco confiável com poucos grupos independentes."
  );
  guide.tracks=[
    {
      id:"gee",
      title:b("Generalized Linear Models and GEE",
        "Modelos lineares generalizados e GEE"),
      description:b(
        "Start with GLM link and variance functions, then study marginal regression for repeated or clustered data, working correlation, estimating equations and sandwich uncertainty. GEE does not normally specify a full joint law; the target and number of independent clusters matter.",
        "Comece por funções de ligação e variância dos GLMs; depois estude regressão marginal para dados repetidos ou agrupados, correlação de trabalho, equações de estimação e incerteza sanduíche. GEE usualmente não especifica toda a lei conjunta; importam o estimando e o número de grupos independentes."
      ),
      refs:["liang-zeger-1986","hardin-hilbe-2013","zeger-liang-albert-1988"]
    },
    {
      id:"hierarchical",
      title:b("Mixed-Effects and Hierarchical Regression",
        "Regressão com efeitos mistos e modelos hierárquicos"),
      description:b(
        "GLMMs and hierarchical models specify variation through random or latent effects; estimation may be likelihood-based or Bayesian. Paula Moraga's geospatial-health work provides a Bayesian spatial example using supported INLA/SPDE constructions, not a GEE method.",
        "GLMMs e modelos hierárquicos especificam variação por efeitos aleatórios ou latentes; a estimação pode ser por verossimilhança ou bayesiana. A obra de Paula Moraga oferece exemplo espacial bayesiano com construções INLA/SPDE apropriadas, não um método GEE."
      ),
      refs:["breslow-clayton-1993","moraga-2019"]
    },
    {
      id:"distributional",
      title:b("Flexible and Distributional Regression",
        "Regressão flexível e distribucional"),
      description:b(
        "GAMs introduce smooth covariate effects, while GAMLSS can model location, scale and shape for non-Gaussian responses. This route connects to positive SAR measurements and environmental or biomedical outcomes; spatial dependence requires an explicit, validated extension.",
        "GAMs introduzem efeitos suaves de covariáveis, enquanto GAMLSS pode modelar localização, escala e forma de respostas não gaussianas. A vertente conecta-se a medições positivas SAR e respostas ambientais ou biomédicas; dependência espacial exige extensão explícita e validada."
      ),
      refs:["wood-2017","rigby-stasinopoulos-2005"]
    }
  ];
  const originalIDs=new Map([
    ["Generalized Linear Models, 2nd ed.","mccullagh-nelder-1989"],
    ["Longitudinal data analysis using generalized linear models","liang-zeger-1986"],
    ["Regression and Other Stories","gelman-hill-vehtari-2020"]
  ]);
  guide.references=guide.references.map(r=>originalIDs.has(r.title)?
    {...r,id:originalIDs.get(r.title)}:r);
  for(const id of ["mccullagh-nelder-1989","liang-zeger-1986",
    "gelman-hill-vehtari-2020"]){
    if(!guide.references.some(r=>r.id===id))throw Error("Preserved regression source missing: "+id);
  }
  guide.references.push(
    ref("hardin-hilbe-2013","James W. Hardin; Joseph M. Hilbe",
      "Generalized Estimating Equations, 2nd ed.",2013,
      "https://www.routledge.com/Generalized-Estimating-Equations/Hardin-Hilbe/p/book/9781439881132",
      "A dedicated GEE textbook with working correlations, practical model comparisons, diagnostics and R examples.",
      "Livro dedicado à GEE com correlações de trabalho, comparações práticas, diagnóstico e exemplos em R.",
      "entry","Chapman & Hall/CRC; publisher copyright 2013"),
    ref("zeger-liang-albert-1988","Scott L. Zeger; Kung-Yee Liang; Paul S. Albert",
      "Models for longitudinal data: a generalized estimating equation approach",1988,
      "https://doi.org/10.2307/2531734",
      "Compares population-averaged and subject-specific modelling for longitudinal responses; their coefficients need not coincide.",
      "Compara modelagem populacional marginal e específica do indivíduo para respostas longitudinais; seus coeficientes não precisam coincidir.",
      "seminal","Biometrics 44(4), 1049–1060"),
    ref("breslow-clayton-1993","Norman E. Breslow; David G. Clayton",
      "Approximate Inference in Generalized Linear Mixed Models",1993,
      "https://doi.org/10.1080/01621459.1993.10594284",
      "A foundational likelihood-based treatment of GLMMs with latent random effects and approximate inference.",
      "Tratamento fundamental de GLMMs com efeitos aleatórios latentes e inferência aproximada baseada em verossimilhança.",
      "seminal","Journal of the American Statistical Association 88(421), 9–25"),
    ref("moraga-2019","Paula Moraga",
      "Geospatial Health Data: Modeling and Visualization with R-INLA and Shiny",2019,
      "https://www.paulamoraga.com/book-geospatial/",
      "A reproducible applied route into Bayesian hierarchical spatial and spatio-temporal regression using INLA/SPDE for supported latent Gaussian models.",
      "Percurso aplicado e reprodutível em regressão espacial e espaço-temporal hierárquica bayesiana com INLA/SPDE em modelos gaussianos latentes suportados.",
      "next","Chapman & Hall/CRC Biostatistics; author citation 2019, publisher copyright 2020"),
    ref("rigby-stasinopoulos-2005","Robert A. Rigby; D. Mikis Stasinopoulos",
      "Generalized additive models for location, scale and shape",2005,
      "https://doi.org/10.1111/j.1467-9876.2005.00510.x",
      "Introduces GAMLSS for several response-distribution parameters, including skewed and heavy-tailed families; independence is conditional on modelled effects.",
      "Introduz GAMLSS para vários parâmetros da distribuição da resposta, inclusive famílias assimétricas e de caudas pesadas; independência é condicional aos efeitos modelados.",
      "seminal","Journal of the Royal Statistical Society C 54(3), 507–554"),
    ref("wood-2017","Simon N. Wood",
      "Generalized Additive Models: An Introduction with R, 2nd ed.",2017,
      "https://www.routledge.com/Generalized-Additive-Models-An-Introduction-with-R-Second-Edition/Wood/p/book/9781498728331",
      "Builds a practical and mathematical foundation for smooth regression effects and penalized-spline GAMs in R.",
      "Constrói base prática e matemática para efeitos suaves de regressão e GAMs por splines penalizados em R.",
      "entry","CRC Press, 2nd ed.; ISBN 9781498728331")
  );
  // The previously curated Gelman–Hill–Vehtari introduction remains available
  // in the source library but the public selection is deliberately short.
  guide.visibleReferences=[
    "mccullagh-nelder-1989","liang-zeger-1986",
    "hardin-hilbe-2013","zeger-liang-albert-1988",
    "breslow-clayton-1993","moraga-2019",
    "rigby-stasinopoulos-2005","wood-2017"
  ];
  guide.relatedGuides=[
    {target:"spatial-models",label:b(
      "Time Series and Spatial Statistics: dependent data, spatial regression and latent fields",
      "Séries Temporais e Estatística Espacial: dados dependentes, regressão espacial e campos latentes"
    )},
    {target:"theory",label:b(
      "Statistical Inference: estimating functions, robust variance and asymptotic theory",
      "Inferência Estatística: funções de estimação, variância robusta e teoria assintótica"
    )},
    {target:"sar",label:b(
      "Statistical Image Processing: non-Gaussian SAR responses and structured image covariates",
      "Processamento Estatístico de Imagens: respostas SAR não gaussianas e covariáveis estruturadas de imagens"
    )},
    {target:"causal",label:b(
      "Causal Inference: GEE associations do not establish causal effects without identification assumptions",
      "Inferência Causal: associações estimadas por GEE não demonstram efeitos causais sem hipóteses de identificação"
    )}
  ];
})();