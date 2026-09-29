/* Causal Inference: concise bilingual guide with three foundational routes.
 * Loaded after the existing curated libraries, changes only causal's public
 * guide/card. Previous detailed sources remain untouched. No unpublished
 * research or completed causal applications are claimed. */
(()=>{
  "use strict";
  const D=window.PORTFOLIO;
  if(!D)return;
  const b=(en,pt)=>({en,pt});
  const card=D.research.find(r=>r.id==="causal");
  const guide=D.readingGuides.find(g=>g.id==="causal");
  if(!card||!guide)return;
  const ref=(id,authors,title,year,url,en,pt,kind,venue)=>({
    id,authors,title,year,url,note:b(en,pt),kind,venue
  });
  card.summary=b(
    "Causal identification, semiparametric effect estimation, and spatial or longitudinal causal inference under explicit research-design assumptions.",
    "Identificação causal, estimação semiparamétrica de efeitos e inferência causal espacial ou longitudinal sob hipóteses explícitas de delineamento."
  );
  card.keywords=[b("Identification","Identificação"),b("Doubly robust estimation","Estimação duplamente robusta"),
    b("Spatial and longitudinal effects","Efeitos espaciais e longitudinais")];
  // Preserve the existing Developing research interest label and stable #causal.
  guide.question=b(
    "Which intervention effect is identifiable, how should it be estimated, and what changes when observations interact across space or time?",
    "Qual efeito de intervenção é identificável, como estimá-lo e o que muda quando observações interagem no espaço ou no tempo?"
  );
  guide.entry=b(
    "Causal inference separates the target intervention effect and its identification assumptions from the statistical procedure used to estimate it. Three routes introduce causal design, robust and machine-learning-assisted estimation, and spatial or longitudinal interventions. Prediction or an observational association alone does not identify a causal effect.",
    "A inferência causal separa o efeito de intervenção de interesse e suas hipóteses de identificação do procedimento estatístico empregado para estimá-lo. Três percursos introduzem delineamento causal, estimação robusta com apoio de aprendizado de máquina e intervenções espaciais ou longitudinais. Predição ou associação observacional isolada não identifica efeito causal."
  );
  guide.background=b(
    "Probability, regression, experimental design and statistical inference; directed graphs and semiparametric theory for advanced work.",
    "Probabilidade, regressão, delineamento experimental e inferência estatística; grafos direcionados e teoria semiparamétrica para aprofundamento."
  );
  guide.shared=b(
    "State the intervention, unit, target population and estimand first; then assess consistency, exchangeability, positivity, treatment assignment and possible interference. Identification comes before estimation. A correct covariance model, Bayesian prior, GEE fit or accurate image-derived prediction cannot replace untestable causal assumptions.",
    "Defina primeiro intervenção, unidade, população-alvo e estimando; depois avalie consistência, intercambialidade, positividade, atribuição de tratamento e possível interferência. Identificação precede estimação. Covariância corretamente modelada, prior bayesiana, ajuste GEE ou predição acurada extraída de imagens não substituem hipóteses causais não testáveis."
  );
  guide.tracks=[
    {
      id:"identification",
      title:b("Causal identification and research design",
        "Identificação causal e delineamento de estudos"),
      description:b(
        "Use potential outcomes and causal DAGs to define interventions and select adjustment sets. Compare experiments, observational assumptions, propensity-score designs and instrumental variables; check whether the desired estimand is identified before fitting a model.",
        "Use resultados potenciais e DAGs causais para definir intervenções e conjuntos de ajuste. Compare experimentos, hipóteses observacionais, delineamentos por escore de propensão e variáveis instrumentais; verifique a identificação antes de ajustar um modelo."
      ),
      refs:["hernan-robins-2020","imbens-rubin-2015","pearl-2009"]
    },
    {
      id:"estimation",
      title:b("Semiparametric estimation and causal machine learning",
        "Estimação semiparamétrica e aprendizado de máquina causal"),
      description:b(
        "After identification, study propensity scores, weighting, doubly robust estimators, influence functions and orthogonal-score machine learning. Robustness has specified model and rate conditions; cross-fitting does not automatically justify inference under spatial or clustered dependence.",
        "Após a identificação, estude escores de propensão, ponderação, estimadores duplamente robustos, funções de influência e aprendizado por escores ortogonais. Robustez exige condições de modelo e taxas; cross-fitting não justifica automaticamente inferência sob dependência espacial ou entre grupos."
      ),
      refs:["rosenbaum-rubin-1983","bang-robins-2005","chernozhukov-2018"]
    },
    {
      id:"dependent",
      title:b("Spatial and longitudinal causal inference",
        "Inferência causal espacial e longitudinal"),
      description:b(
        "Study treatments changing over time, modern difference-in-differences, spatial confounding and spillovers between locations. Environmental and SAR/optical imagery can measure outcomes and exposures, but valid causal identification must address interference, design and spatially dependent uncertainty.",
        "Estude tratamentos variáveis no tempo, diferenças-em-diferenças modernas, confundimento espacial e efeitos entre localidades. Imagens ambientais, SAR e ópticas podem medir respostas e exposições, mas a identificação exige tratar interferência, delineamento e incerteza sob dependência espacial."
      ),
      refs:["robins-hernan-brumback-2000","callaway-santanna-2021","reich-2021"]
    }
  ];
  const ids=new Map([
    ["Estimating causal effects of treatments in randomized and nonrandomized studies","rubin-1974"],
    ["The central role of the propensity score in observational studies for causal effects","rosenbaum-rubin-1983"],
    ["Causal Inference for Statistics, Social, and Biomedical Sciences","imbens-rubin-2015"],
    ["Causality: Models, Reasoning, and Inference, 2nd ed.","pearl-2009"],
    ["Causal Inference: What If","hernan-robins-2020"],
    ["Identification of Causal Effects Using Instrumental Variables","angrist-imbens-rubin-1996"],
    ["Marginal structural models and causal inference in epidemiology","robins-hernan-brumback-2000"],
    ["Double/debiased machine learning for treatment and structural parameters","chernozhukov-2018"],
    ["Difference-in-Differences with Multiple Time Periods","callaway-santanna-2021"],
    ["Recursive partitioning for heterogeneous causal effects","athey-imbens-2016"]
  ]);
  guide.references=guide.references.map(r=>{
    const id=ids.get(r.title);
    if(!id)return r;
    return id==="hernan-robins-2020"?
      {...r,id,url:"https://miguelhernan.org/whatifbook"}:{...r,id};
  });
  for(const id of ["hernan-robins-2020","imbens-rubin-2015","pearl-2009",
    "rosenbaum-rubin-1983","chernozhukov-2018",
    "robins-hernan-brumback-2000","callaway-santanna-2021"]){
    if(!guide.references.some(r=>r.id===id))throw Error("Preserved causal reference missing: "+id);
  }
  guide.references.push(
    ref("bang-robins-2005","Heejung Bang; James M. Robins",
      "Doubly Robust Estimation in Missing Data and Causal Inference Models",2005,
      "https://doi.org/10.1111/j.1541-0420.2005.00377.x",
      "Establishes doubly robust estimation under stated treatment and outcome-model assumptions, a methodological bridge to estimating equations.",
      "Estabelece estimação duplamente robusta sob hipóteses especificadas para tratamento e modelo da resposta, conectando-se a equações de estimação.",
      "seminal","Biometrics 61(4), 962–973"),
    ref("reich-2021",
      "Brian J. Reich; Shu Yang; Yawen Guan; Andrew B. Giffin; Matthew J. Miller; Ana Rappold",
      "A Review of Spatial Causal Inference Methods for Environmental and Epidemiological Applications",2021,
      "https://doi.org/10.1111/insr.12452",
      "Reviews spatial confounding, interference and space–time extensions in environmental and epidemiological causal studies.",
      "Revisa confundimento espacial, interferência e extensões espaço-temporais em estudos causais ambientais e epidemiológicos.",
      "entry","International Statistical Review 89(3), 605–634")
  );
  guide.visibleReferences=[
    "hernan-robins-2020","imbens-rubin-2015","pearl-2009",
    "rosenbaum-rubin-1983","bang-robins-2005","chernozhukov-2018",
    "robins-hernan-brumback-2000","callaway-santanna-2021","reich-2021"
  ];
  guide.relatedGuides=[
    {target:"spatial-models",label:b(
      "Time Series and Spatial Statistics: spatial dependence, time-varying exposures and interference",
      "Séries Temporais e Estatística Espacial: dependência espacial, exposições variáveis e interferência")},
    {target:"theory",label:b(
      "Statistical Inference: influence functions, orthogonal scores and valid uncertainty",
      "Inferência Estatística: funções de influência, escores ortogonais e incerteza válida")},
    {target:"regression",label:b(
      "Regression and Estimating Equations: marginal models, causal estimands and robust variance",
      "Regressão e Equações de Estimação: modelos marginais, estimandos causais e variância robusta")},
    {target:"sar",label:b(
      "Statistical Image Processing: environmental outcomes measured by SAR and optical imagery",
      "Processamento Estatístico de Imagens: respostas ambientais medidas por imagens SAR e ópticas")}
  ];
})();