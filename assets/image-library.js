/* Topic 3: concise bilingual statistical image processing, three applied pathways.
 * Original SAR bibliographic records remain in the underlying source.
 * Optical/environmental and medical imaging are developing interests,
 * not claims of published work or clinical services. */
(() => {
  "use strict";
  const D=window.PORTFOLIO;
  if(!D) return;
  const b=(en,pt)=>({en,pt});
  const card=D.research.find(r=>r.id==="sar");
  const guide=D.readingGuides.find(g=>g.id==="sar");
  if(!card||!guide) return;
  const ref=(id,authors,title,year,url,en,pt,kind="next",venue="")=>({
    id,authors,title,year,url,note:b(en,pt),kind,venue
  });
  card.title=b("Statistical Image Processing","Processamento Estatístico de Imagens");
  card.summary=b(
    "Statistical modeling and inference for images, from SAR/PolSAR and environmental remote sensing to emerging biomedical-imaging applications.",
    "Modelagem e inferência estatística para imagens, de SAR/PolSAR e sensoriamento remoto ambiental a aplicações em desenvolvimento em imagens biomédicas."
  );
  card.keywords=["SAR / PolSAR",b("Optical remote sensing","Sensoriamento óptico"),b("Image inference","Inferência em imagens")];
  guide.question=b(
    "How do acquisition physics, spatial dependence and uncertainty shape statistical methods across radar, optical and medical images?",
    "Como a física de aquisição, a dependência espacial e a incerteza orientam métodos estatísticos para imagens de radar, ópticas e médicas?"
  );
  guide.entry=b(
    "Statistical image processing connects observation models with estimation, restoration, segmentation and image-derived inference. This guide offers three application routes with a shared mathematical foundation; expertise in SAR/PolSAR does not imply established work in optical or medical imaging.",
    "O processamento estatístico de imagens conecta modelos observacionais à estimação, restauração, segmentação e inferência a partir de imagens. O guia oferece três percursos de aplicação com fundamentos matemáticos comuns; experiência em SAR/PolSAR não implica atuação já consolidada em imagens ópticas ou médicas."
  );
  guide.background=b(
    "Probability, statistical inference, regression, linear algebra and basic image formation; learn the acquisition and noise model of each modality.",
    "Probabilidade, inferência estatística, regressão, álgebra linear e formação básica de imagens; estude o processo de aquisição e o modelo de ruído de cada modalidade."
  );
  guide.shared=b(
    "Start with image formation, noise and spatial dependence; then study inverse problems, statistical filtering, segmentation, classification, uncertainty and reproducible validation. Speckle in coherent radar, radiometric effects in optical imagery and modality-specific medical noise are not interchangeable. Evaluate images and predictions at the appropriate spatial, field, patient or acquisition level.",
    "Comece pela formação da imagem, ruído e dependência espacial; depois estude problemas inversos, filtragem estatística, segmentação, classificação, incerteza e validação reprodutível. Speckle em radar coerente, efeitos radiométricos em imagens ópticas e ruídos específicos de imagens médicas não são intercambiáveis. Avalie imagens e previsões na escala espacial, de campo, paciente ou aquisição apropriada."
  );
  guide.tracks=[
    {
      id:"radar",
      status:b("Established research activity","Atuação de pesquisa consolidada"),
      title:b("Radar imaging and SAR/PolSAR","Imagens de radar e SAR/PolSAR"),
      description:b(
        "Model coherent backscatter, speckle, polarimetric covariance and spatial dependence. Connect statistical estimation and classification to crops, vegetation and environmental monitoring.",
        "Modele retroespalhamento coerente, speckle, covariância polarimétrica e dependência espacial. Conecte estimação estatística e classificação a culturas agrícolas, vegetação e monitoramento ambiental."
      ),
      refs:["oliver-quegan","lee-pottier"]
    },
    {
      id:"optical",
      status:b("Developing research direction","Frente de pesquisa em desenvolvimento"),
      title:b("Optical remote sensing and environmental imaging","Sensoriamento remoto óptico e imagens ambientais"),
      description:b(
        "Study multispectral and hyperspectral observations, radiometric correction, land cover, vegetation and environmental change. Passive optical satellite sensors differ from radar, while LiDAR uses active laser ranging; SAR–optical fusion requires explicit registration and uncertainty checks.",
        "Estude observações multiespectrais e hiperespectrais, correção radiométrica, cobertura da terra, vegetação e mudanças ambientais. Sensores ópticos passivos diferem de radar, enquanto LiDAR utiliza medição ativa por laser; a fusão SAR–óptico exige registro e avaliação explícita da incerteza."
      ),
      refs:["richards-2022","zhu-2017"]
    },
    {
      id:"medical",
      status:b("Emerging research interest","Interesse de pesquisa emergente"),
      title:b("Medical and biomedical image analysis","Análise de imagens médicas e biomédicas"),
      description:b(
        "Explore statistical segmentation and uncertainty for MRI, CT, pathology and lesion or tumour images. Account for modality-specific artefacts, expert labels, patient-level validation and clinical domain shift; this is a methodological research interest, not a claim of clinical expertise.",
        "Explore segmentação estatística e incerteza em RM, TC, patologia digital e imagens de lesões ou tumores. Considere artefatos de cada modalidade, rótulos especializados, validação por paciente e mudanças de domínio clínico; trata-se de interesse metodológico, não de alegação de experiência clínica."
      ),
      refs:["pham-2000","litjens-2017"]
    }
  ];
  const existingId=new Map([
    ["Understanding Synthetic Aperture Radar Images","oliver-quegan"],
    ["Polarimetric Radar Imaging: From Basics to Applications","lee-pottier"]
  ]);
  guide.references=guide.references.map(r=>existingId.has(r.title)?{...r,id:existingId.get(r.title)}:r);
  guide.references.push(
    ref("szeliski-2022","Richard Szeliski",
      "Computer Vision: Algorithms and Applications, 2nd ed.",2022,
      "https://szeliski.org/Book/",
      "A cross-domain foundation for image formation, estimation, restoration, registration and recognition.",
      "Fundamentação transversal para formação de imagens, estimação, restauração, registro e reconhecimento.",
      "entry","Springer, 2nd ed."),
    ref("richards-2022","John A. Richards",
      "Remote Sensing Digital Image Analysis, 6th ed.",2022,
      "https://doi.org/10.1007/978-3-030-82327-6",
      "Introduces optical remote-sensing image acquisition, spectral features and statistical classification.",
      "Introduz aquisição de imagens ópticas de sensoriamento remoto, características espectrais e classificação estatística.",
      "foundation","Springer, 6th ed."),
    ref("zhu-2017","Zhe Zhu",
      "Change detection using landsat time series: A review of frequencies, preprocessing, algorithms, and applications",2017,
      "https://doi.org/10.1016/j.isprsjprs.2017.06.013",
      "Reviews radiometric preprocessing and approaches to environmental change detection with optical Landsat series.",
      "Revisa pré-processamento radiométrico e abordagens de detecção de mudanças ambientais em séries ópticas Landsat.",
      "next","ISPRS Journal of Photogrammetry and Remote Sensing 130, 370–384"),
    ref("pham-2000","Dzung L. Pham; Chenyang Xu; Jerry L. Prince",
      "Current methods in medical image segmentation",2000,
      "https://doi.org/10.1146/annurev.bioeng.2.1.315",
      "A foundational survey of segmentation methods and their assumptions for medical images.",
      "Revisão fundamental de métodos de segmentação e suas hipóteses em imagens médicas.",
      "foundation","Annual Review of Biomedical Engineering 2, 315–337"),
    ref("litjens-2017","Geert Litjens; Thijs Kooi; Babak Ehteshami Bejnordi; Arnaud Arindra Adiyoso Setio; Francesco Ciompi; Mohsen Ghafoorian; Jeroen A. W. M. van der Laak; Bram van Ginneken; Clara I. Sánchez",
      "A survey on deep learning in medical image analysis",2017,
      "https://doi.org/10.1016/j.media.2017.07.005",
      "Surveys learning-based classification, detection, segmentation and validation across medical imaging applications.",
      "Revisa classificação, detecção, segmentação e validação baseadas em aprendizado em aplicações de imagens médicas.",
      "next","Medical Image Analysis 42, 60–88")
  );
  guide.visibleReferences=[
    "szeliski-2022","oliver-quegan","lee-pottier",
    "richards-2022","zhu-2017","pham-2000","litjens-2017"
  ];
  guide.relatedGuides=[
    {target:"spatial-models",label:b(
      "Time Series and Spatial Statistics: pixel dependence, environmental time series and spatial validation",
      "Séries Temporais e Estatística Espacial: dependência entre pixels, séries ambientais e validação espacial")},
    {target:"theory",label:b(
      "Statistical Inference: estimation, uncertainty and hypothesis testing for image-derived measures",
      "Inferência Estatística: estimação, incerteza e testes para medidas extraídas de imagens")},
    {target:"regression",label:b(
      "Regression and GEE: covariates and correlated outcomes in image studies",
      "Regressão e GEE: covariáveis e respostas correlacionadas em estudos com imagens")},
    {target:"geometry",label:b(
      "Information Geometry: comparing image-derived probability models using information and distances",
      "Geometria da Informação: comparação de modelos probabilísticos de imagens por informação e distâncias")}
  ];
})();