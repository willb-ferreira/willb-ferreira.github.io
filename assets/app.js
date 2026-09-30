(() => {
  "use strict";
  const D = window.PORTFOLIO;
  if (!D) { document.getElementById("main").textContent = "Content could not be loaded."; return; }
  const page = document.body.dataset.page || "index";
  const routes = ["research", "publications", "supervision", "people", "teaching", "software", "about", "contact"];
  // Root-relative home links keep the public URL canonical; file:// previews stay navigable.
  const homeHref = window.location.protocol === "file:" ? "index.html" : "/";
  const href = name => name === "index" ? homeHref : `${name}.html`;
  const getPref = (key, fallback) => { try { return localStorage.getItem(key) || fallback; } catch { return fallback; } };
  const setPref = (key, value) => { try { localStorage.setItem(key, value); } catch { /* file:// privacy settings */ } };
  let lang = getPref("wb-lang", "en") === "pt" ? "pt" : "en";
  let theme = getPref("wb-theme", "light") === "dark" ? "dark" : "light";
  let selectedPublicationType = "all";
  let publicationSearch = "";
  let publicationYear = "all";
  let selectedTopicLevel = "undergraduate";
  let selectedCourseYear = "all";
  let courseSearch = "";
  let selectedProjectArea = "all";
  let selectedReadingGuide = null;
  let readingNavigationInitialized = false;
  let toastTimer;

  const M = {
    pt: {
      reading:"Guias de leitura",
      readingLink:"Ler o guia",
      readingSmall:"Biblioteca de pesquisa",
      readingTitle:"Por onde começar em cada área",
      readingIntro:"Uma seleção comentada de referências para construir fundamentos antes de escolher um problema de pesquisa.",
      readingButton:"Explorar os guias de leitura",
      readingPageLead:"Seis apresentações breves, com perguntas introdutórias e poucas leituras essenciais para cada área.",
      readingBackground:"Conhecimentos prévios:",
      readingPath:"Um percurso possível",
      readingReferences:"Leituras selecionadas",
      readingBack:"Voltar ao início do guia",
      readingIndex:"Guias de pesquisa",
      readingConnections:"Conexões com outras áreas",
      readingChoose:"Escolher área de pesquisa",
      readingPrevious:"Guia anterior",
      readingNext:"Próximo guia",
      readingNoteTitle:"Como usar estes guias.",
      readingNote:"Escolha um percurso e siga as leituras indicadas. O objetivo é orientar os primeiros estudos, não substituir uma revisão bibliográfica.",
      index:"Início",research:"Pesquisa",publications:"Publicações",supervision:"Orientação",people:"Pessoas",
      teaching:"Ensino",software:"Código e dados",about:"Sobre",contact:"Contato",
      skip:"Pular para o conteúdo",openMenu:"Abrir menu",closeMenu:"Fechar menu",toggleTheme:"Alternar tema",toggleLanguage:"Change language to English",
      eyebrowHome:"Universidade Federal de Pernambuco · Departamento de Estatística",heroFocus:"Willams Batista",heroEm:"",heroEnd:"",
      seeResearch:"Explorar pesquisa",seePublications:"Ver publicações",locationNote:"Departamento de Estatística · UFPE",
      visualHead:"MAPA DE PESQUISA",visualStatus:"EM DESENVOLVIMENTO",visualTitle:"Da teoria à aplicação.",visualCaption:"Inferência · Modelagem · Computação",
      visualNote:"EIXO CENTRAL",visualNoteDetail:"Dependência espacial",visualIndex:"EST. / 01",
      focusAreas:"Áreas de interesse",researchTagline:"Pesquisa e interesses",
      researchIntro:"Métodos em que atuo e outras áreas que pretendo desenvolver.",
      allResearch:"Todas as áreas",activeProjects:"Projetos e investigações",projectDesc:"Perguntas de pesquisa que orientam o trabalho em andamento.",
      seeAllProjects:"Ver todos os projetos",featuredProjects:"Em desenvolvimento",projectsPageLead:"Áreas de interesse e projetos de pesquisa atuais no Departamento de Estatística da UFPE.",
      papersHome:"Produção científica",papersHomeDesc:"Artigos publicados e trabalhos apresentados em congressos.",
      papersPageLead:"Uma bibliografia pesquisável, com acesso a DOI, texto completo, código e dados quando disponíveis.",
      noPapersHome:"Bibliografia em preparação: todos os artigos serão incluídos após conferência no currículo Lattes e nas páginas dos periódicos.",
      noPapers:"A bibliografia completa será publicada após conferência dos títulos, autores, periódicos e DOI no currículo Lattes.",
      noMatches:"Nenhum resultado corresponde aos filtros selecionados.",searchPlaceholder:"Pesquisar por título, autor, palavra-chave...",
      all:"Todos",articles:"Artigos",preprints:"Preprints",conferences:"Congressos",others:"Outros",year:"Ano",records:"registros",record:"registro",exportBib:"Exportar BibTeX",
      readMore:"Saiba mais",cite:"Copiar referência",code:"Código",data:"Dados",pdf:"PDF",doi:"DOI",website:"Página",copyDone:"Referência copiada",exportDone:"Arquivo BibTeX gerado",
      supervisionTitle:"Temas de orientação",supervisionLead:"Temas potenciais de iniciação científica, mestrado e doutorado, com escopos ajustáveis à formação e aos interesses do estudante.",
      advisory:"Os temas abaixo são propostas de pesquisa, não anúncios de vagas ou garantia de disponibilidade de orientação.",
      topics:"Temas para orientação",topicsDesc:"Cada tema pode ser refinado em uma pergunta específica e um plano de trabalho realista.",
      undergraduate:"Iniciação científica",masters:"Mestrado",phd:"Doutorado",requirements:"Conhecimentos recomendados",
      howItWorks:"Como iniciar uma conversa",howTitle:"Uma proposta começa com uma boa pergunta.",
      step1:"Explore um tema",step1Desc:"Leia a descrição, identifique uma pergunta e verifique os conhecimentos necessários.",
      step2:"Prepare um resumo",step2Desc:"Escreva até uma página com motivação, objetivo, formação e disponibilidade semanal.",
      step3:"Entre em contato",step3Desc:"Envie sua proposta e um currículo acadêmico pelo canal informado na página de contato.",
      faqTitle:"Perguntas frequentes",faq1:"Preciso chegar com um projeto completo?",faq1a:"Não. Um interesse fundamentado, uma pergunta inicial e disposição para estudar são suficientes para uma primeira conversa.",
      faq2:"Posso propor um tema diferente?",faq2a:"Sim. Propostas próximas às linhas de pesquisa podem ser consideradas conforme aderência científica e disponibilidade.",
      faq3:"Existe bolsa ou vaga aberta?",faq3a:"Não há oferta de bolsa ou vaga anunciada neste site. A disponibilidade deve ser confirmada individualmente.",
      peopleTitle:"Orientandos",peopleLead:"Estudantes que acompanho em projetos de iniciação científica e de pós-graduação.",
      peopleEmpty:"Os perfis ainda não foram cadastrados. A inclusão de estudantes e colaboradores depende de consentimento para divulgação.",
      peoplePolicyTitle:"Crédito e visibilidade",peoplePolicy:"O site prevê páginas e vínculos para que cada trabalho reconheça seus participantes, produções e contribuições. Dados pessoais só devem ser publicados com autorização.",
      teachingTitle:"Disciplinas",teachingLead:"Disciplinas de graduação ministradas na Universidade Federal de Pernambuco.",
      courses:"Disciplinas",coursesEmpty:"As disciplinas e os materiais ainda não foram cadastrados. Adicione ementas, períodos e links de apoio quando estiverem disponíveis.",
      principles:"Princípios para materiais de ensino",principle1:"Fundamento primeiro",principle1Desc:"Explicitar hipóteses, significado dos parâmetros e limites dos métodos.",
      principle2:"Código verificável",principle2Desc:"Ligar teoria, simulação e análise com exemplos reproduzíveis.",
      principle3:"Aplicação crítica",principle3Desc:"Interpretar resultados, reconhecer incerteza e discutir escolhas de modelagem.",
      softwareTitle:"Código e dados",softwareLead:"Repositórios e materiais de pesquisa disponibilizados publicamente, quando autorizados.",
      repositories:"Repositórios e pacotes",softwareEmpty:"Os repositórios ainda não foram cadastrados. Adicione projetos públicos, pacotes R e links para documentação no arquivo de conteúdo.",
      reproducibility:"Compromissos de reprodutibilidade",repro1:"Implementações versionadas",repro1Desc:"Código-fonte, ambiente e histórico de alterações ligados a cada resultado.",
      repro2:"Experimentos auditáveis",repro2Desc:"Sementes aleatórias, especificações e métricas documentadas para simulações.",
      repro3:"Materiais citáveis",repro3Desc:"DOI de artigos, referências de dados e licença de software quando aplicáveis.",
      aboutTitle:"Sobre",aboutLead:"Sou professor do Departamento de Estatística da UFPE, com formação em Estatística e atuação em inferência, modelagem espacial e sensoriamento remoto.",
      approach:"Atuação e interesses",aboutP1:"Minha pesquisa envolve modelos para dados espaciais e séries temporais, inferência paramétrica e métodos estatísticos para imagens SAR e PolSAR. Também tenho interesse em equações de estimação generalizadas, teoria assintótica e geometria da informação.",
      aboutP2:"Tenho bacharelado, mestrado e doutorado em Estatística pela UFPE e realizei estágio de doutorado sanduíche no Indian Institute of Technology Bombay. Nos meus projetos, combino desenvolvimento metodológico com simulação e análise de dados.",
      academicPath:"Trajetória acadêmica",aboutDisclaimer:"Consulte meu Currículo Lattes para o registro institucional completo da trajetória acadêmica.",
      contactTitle:"Contato",contactLead:"Para assuntos acadêmicos, propostas de colaboração e orientação, entre em contato pelo e-mail institucional.",
      collab:"Colaboração científica",collabDesc:"Projetos conjuntos, discussões metodológicas, intercâmbio e propostas de pesquisa.",
      studentContact:"Interesse em orientação",studentContactDesc:"Envie sua formação, tema de interesse e uma descrição objetiva da proposta.",
      emailLabel:"E-mail acadêmico",emailMissing:"O endereço de e-mail ainda não foi configurado no protótipo.",
      profiles:"Perfis acadêmicos",profilesMissing:"Adicione seus links públicos de ORCID, Lattes, Google Scholar e GitHub no arquivo de conteúdo.",
      contactGuide:"Para uma mensagem produtiva",contactGuideDesc:"Inclua o assunto, uma breve apresentação, o objetivo do contato e, se necessário, links para currículo ou trabalho anterior.",
      openContact:"Abrir contato",footerText:"Pesquisa em estatística, inferência e dados espaciais.",navigate:"Navegação",follow:"Perfis",updated:"Última atualização do site",made:"Departamento de Estatística · UFPE",
      opportunityTitle:"Temas para orientação",opportunityDesc:"Temas de iniciação científica, mestrado e doutorado relacionados às minhas linhas de pesquisa.",opportunityBtn:"Explorar temas de pesquisa",
      news:"Atualizações",newsDesc:"Marcos recentes da pesquisa e da vida acadêmica.",nothingNews:"Novidades serão publicadas aqui.",backHome:"Voltar ao início",backTop:"Voltar ao topo"
    },
    en: {
      reading:"Reading guides",
      readingLink:"Reading guide",
      readingSmall:"Research library",
      readingTitle:"A starting point for each research area",
      readingIntro:"Annotated references to help students build foundations before choosing a research question.",
      readingButton:"Explore the reading guides",
      readingPageLead:"Six concise introductions with starting questions and a few essential readings for each area.",
      readingBackground:"Recommended background:",
      readingPath:"A possible route",
      readingReferences:"Selected reading",
      readingBack:"Back to guide start",
      readingIndex:"Research guides",
      readingConnections:"Connections with other areas",
      readingChoose:"Choose a research area",
      readingPrevious:"Previous guide",
      readingNext:"Next guide",
      readingNoteTitle:"How to use these guides.",
      readingNote:"Choose a path and follow the suggested readings. These are entry points, not comprehensive literature reviews.",
      index:"Home",research:"Research",publications:"Publications",supervision:"Supervision",people:"People",teaching:"Teaching",software:"Code & Data",about:"About",contact:"Contact",
      skip:"Skip to content",openMenu:"Open menu",closeMenu:"Close menu",toggleTheme:"Toggle color theme",toggleLanguage:"Mudar idioma para português",
      eyebrowHome:"Federal University of Pernambuco · Department of Statistics",heroFocus:"Willams Batista",heroEm:"",heroEnd:"",
      seeResearch:"Explore research",seePublications:"View publications",locationNote:"Department of Statistics · UFPE",
      visualHead:"RESEARCH MAP",visualStatus:"IN PROGRESS",visualTitle:"From theory to application.",visualCaption:"Inference · Modeling · Computing",visualNote:"CORE TOPIC",visualNoteDetail:"Spatial dependence",visualIndex:"STAT. / 01",
      focusAreas:"Areas of interest",researchTagline:"Research and interests",
      researchIntro:"Current research and other methodological areas I plan to explore.",
      allResearch:"All areas",activeProjects:"Projects and investigations",projectDesc:"Research questions that guide work in progress.",
      seeAllProjects:"See all projects",featuredProjects:"Work in progress",projectsPageLead:"Research interests and current projects in the Department of Statistics at UFPE.",
      papersHome:"Scientific output",papersHomeDesc:"Journal articles and conference papers.",
      papersPageLead:"A searchable bibliography, with access to DOI, full text, code, and data when available.",
      noPapersHome:"Bibliography in preparation: all papers will be added after verification against the Lattes CV and journal records.",
      noPapers:"The complete bibliography will be published after checking titles, authors, journals, and DOIs against the Lattes CV.",
      noMatches:"No results match the selected filters.",searchPlaceholder:"Search by title, author, keyword...",
      all:"All",articles:"Articles",preprints:"Preprints",conferences:"Conferences",others:"Other",year:"Year",records:"records",record:"record",exportBib:"Export BibTeX",
      readMore:"Learn more",cite:"Copy citation",code:"Code",data:"Data",pdf:"PDF",doi:"DOI",website:"Website",copyDone:"Citation copied",exportDone:"BibTeX file created",
      supervisionTitle:"Supervision topics",supervisionLead:"Potential undergraduate, master's, and PhD topics, with scope tailored to students' backgrounds and interests.",
      advisory:"These are potential topics, not advertised vacancies or a guarantee of supervision availability.",
      topics:"Supervision topics",topicsDesc:"Each topic can be refined into a specific question and a realistic work plan.",
      undergraduate:"Undergraduate research",masters:"Master's",phd:"PhD",requirements:"Recommended background",
      howItWorks:"How to start a conversation",howTitle:"A proposal starts with a good question.",
      step1:"Explore a topic",step1Desc:"Read the description, identify a question, and review the recommended background.",
      step2:"Prepare a brief",step2Desc:"Write up to one page with motivation, goals, academic background, and weekly availability.",
      step3:"Get in touch",step3Desc:"Send your proposal and academic CV via the contact details on the contact page.",
      faqTitle:"Frequently asked questions",faq1:"Do I need a complete proposal?",faq1a:"No. A well-founded interest, an initial question, and willingness to learn are enough for a first conversation.",
      faq2:"Can I suggest a different topic?",faq2a:"Yes. Proposals related to the research areas may be considered depending on scientific fit and availability.",
      faq3:"Is funding or a position available?",faq3a:"No scholarship or position is advertised on this website. Availability must be confirmed individually.",
      peopleTitle:"Research students",peopleLead:"Students I work with on undergraduate and postgraduate research.",
      peopleEmpty:"Profiles have not yet been added. Students and collaborators should only be listed with consent to public disclosure.",
      peoplePolicyTitle:"Credit and visibility",peoplePolicy:"The website can link each project to its participants, outputs, and contributions. Personal data should only be published with permission.",
      teachingTitle:"Courses",teachingLead:"Undergraduate courses taught at the Federal University of Pernambuco.",
      courses:"Courses",coursesEmpty:"Courses and materials have not yet been added. Add syllabi, semesters, and resource links when available.",
      principles:"Principles for teaching materials",principle1:"Foundations first",principle1Desc:"Make assumptions, parameter meanings, and the limitations of methods explicit.",
      principle2:"Verifiable code",principle2Desc:"Connect theory, simulation, and analysis with reproducible examples.",
      principle3:"Critical application",principle3Desc:"Interpret results, recognize uncertainty, and discuss modeling choices.",
      softwareTitle:"Code & Data",softwareLead:"Publicly released research repositories and materials, when available.",
      repositories:"Repositories and packages",softwareEmpty:"Repositories have not yet been added. Add public projects, R packages, and documentation links to the content file.",
      reproducibility:"Reproducibility commitments",repro1:"Versioned implementations",repro1Desc:"Source code, environments, and a change history linked to each result.",
      repro2:"Auditable experiments",repro2Desc:"Random seeds, specifications, and metrics documented for simulations.",
      repro3:"Citable materials",repro3Desc:"Paper DOIs, data references, and software licenses when applicable.",
      aboutTitle:"About",aboutLead:"I am a professor in the Department of Statistics at UFPE, working on inference, spatial models, and remote sensing.",
      approach:"Research and interests",aboutP1:"My research covers models for spatial data and time series, parametric inference, and statistical methods for SAR and PolSAR imagery. I am also interested in generalized estimating equations, asymptotic theory, and information geometry.",
      aboutP2:"I earned my B.Sc., M.Sc., and Ph.D. in Statistics at UFPE and was a visiting Ph.D. researcher at the Indian Institute of Technology Bombay. My projects combine methodological development, simulation, and data analysis.",
      academicPath:"Academic path",aboutDisclaimer:"For the full academic record, please consult my Lattes CV.",
      contactTitle:"Contact",contactLead:"For academic inquiries, collaboration, and supervision, please use my institutional email.",
      collab:"Research collaboration",collabDesc:"Joint projects, methodological discussions, exchanges, and research proposals.",
      studentContact:"Supervision inquiry",studentContactDesc:"Include your academic background, research interests, and a concise description of your proposal.",
      emailLabel:"Academic email",emailMissing:"An email address has not been configured in this prototype.",
      profiles:"Academic profiles",profilesMissing:"Add your public ORCID, Lattes, Google Scholar, and GitHub links in the content file.",
      contactGuide:"For a productive message",contactGuideDesc:"Include a subject line, a brief introduction, the purpose of your message, and links to your CV or prior work when relevant.",
      openContact:"Open contact",footerText:"Research in statistics, inference, and spatial data.",navigate:"Navigation",follow:"Profiles",updated:"Website last updated",made:"Department of Statistics · UFPE",
      opportunityTitle:"Supervision topics",opportunityDesc:"Undergraduate, master’s, and Ph.D. topics related to my research areas.",opportunityBtn:"Explore research topics",
      news:"Updates",newsDesc:"Recent milestones in research and academic life.",nothingNews:"Updates will appear here.",backHome:"Back to home",backTop:"Back to top"
    }
  };
  const tx = key => M[lang][key] || key;
  const t = obj => typeof obj === "object" && obj !== null ? (obj[lang] || obj.pt || obj.en || "") : (obj ?? "");
  const e = value => String(value ?? "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");
  const safe = value => {
    const s = String(value || "").trim();
    if (/^https?:\/\//i.test(s) || /^assets\/[\w./-]+$/i.test(s)) return e(s);
    return "";
  };
  const icon = (name, size = 18) => {
    const paths = {
      arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>',
      up:'<path d="M7 17 17 7M8 7h9v9"/>',
      menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',
      close:'<path d="M6 6l12 12M18 6 6 18"/>',
      moon:'<path d="M20.9 13a9 9 0 0 1-9.9-9.9A9 9 0 1 0 20.9 13Z"/>',
      sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2m10-10h-2M4 12H2m17.1-7.1-1.4 1.4M6.3 17.7l-1.4 1.4m14.2 0-1.4-1.4M6.3 6.3 4.9 4.9"/>',
      search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
      download:'<path d="M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4"/>',
      mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
      book:'<path d="M4 5.5C7 4 10 4 12 6c2-2 5-2 8-.5V19c-3-1.5-6-1.5-8 .5-2-2-5-2-8-.5zM12 6v13.5"/>',
      code:'<path d="m8 5-6 7 6 7m8-14 6 7-6 7M14 3l-4 18"/>',
      globe:'<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2c6 5.5 6 14.5 0 20M12 2c-6 5.5-6 14.5 0 20"/>',
      filter:'<path d="M3 5h18l-7 8v6l-4 2v-8z"/>',
      check:'<path d="m4 12 5 5L20 6"/>'
    };
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.arrow}</svg>`;
  };
  const tag = (value, extra="") => `<span class="tag ${extra}">${e(t(value))}</span>`;
  const link = (url, label, klass="inline-link", external=true) => {
    const target = safe(url); if (!target) return "";
    return `<a class="${klass}" href="${target}"${external ? ' target="_blank" rel="noopener noreferrer"' : ""}>${e(label)} ${icon("up",14)}</a>`;
  };
  const sectionTitle = (eyebrow, heading, desc="", tail="") => `<div class="section-heading"><div><span class="eyebrow">${e(eyebrow)}</span><h2>${e(heading)}</h2>${desc?`<p>${e(desc)}</p>`:""}</div>${tail}</div>`;
  const pageHero = (eyebrow, title, lead) => `<section class="page-hero"><div class="shell"><div class="page-head reveal"><div class="breadcrumb"><a href="${href("index")}">${tx("index")}</a><span class="sep">/</span><span>${e(eyebrow)}</span></div><span class="eyebrow">${e(eyebrow)}</span><h1>${e(title)}</h1><p class="lead">${e(lead)}</p></div></div></section>`;
  const empty = (symbol, title, message, action="") => `<div class="empty-state"><span class="empty-icon" aria-hidden="true">${symbol}</span><h3>${e(title)}</h3><p>${e(message)}</p>${action}</div>`;
  const profileLinks = () => {
    const names = {orcid:"ORCID",scholar:"Google Scholar",github:"GitHub",lattes:lang === "pt" ? "Currículo Lattes" : "Lattes CV",linkedin:"LinkedIn"};
    const publicProfiles = Object.entries(D.profile.social).filter(([,u])=>safe(u)).map(([k,u])=>link(u,names[k],"",true));
    if (safe(D.profile.cv)) publicProfiles.unshift(link(D.profile.cv,lang === "pt" ? "Currículo em PDF" : "CV (PDF)","",true));
    return publicProfiles.join("");
  };
  const projectCard = (p) => {
    const url = safe(p.url), el = url ? "a" : "article";
    const linkProps = url ? ` href="${url}" target="_blank" rel="noopener noreferrer"` : "";
    return `<${el} class="project-card"${linkProps}><div class="project-head"><span class="status">${tx("featuredProjects")}</span><span class="small muted">${e(p.year||"")}</span></div><div class="card-content"><h3>${e(t(p.title))}</h3><p>${e(t(p.description))}</p></div><div class="project-meta"><div class="card-footer">${(p.tags||[]).map(s=>tag(s)).join("")}</div>${url?`<span class="project-arrow">${icon("up")}</span>`:""}</div></${el}>`;
  };
  const researchCard = (r) => `<article class="research-card"><div class="card-topline"><span class="card-number">${e(r.number)}</span><span class="card-symbol" aria-hidden="true">${e(r.symbol)}</span></div><div class="card-content"><h3>${e(t(r.title))}</h3><p>${e(t(r.summary))}</p></div><div class="card-footer">${(r.keywords||[]).map(s=>tag(s)).join("")}</div><a class="reading-link" href="reading.html#${e(r.id)}">${tx("readingLink")} ${icon("arrow",15)}</a></article>`;
  const banner = () => `<section class="section tight"><div class="shell"><aside class="feature-banner"><div><span class="eyebrow">${tx("supervision")}</span><h2>${tx("opportunityTitle")}</h2><p>${tx("opportunityDesc")}</p></div><a class="inline-link" href="supervision.html">${tx("opportunityBtn")} ${icon("arrow")}</a></aside></div></section>`;
  const researchVisual = () => `<div class="signal-panel" role="img" aria-label="${e(tx("visualTitle"))}"><div class="signal-grid"></div><div class="panel-top"><span>${tx("visualHead")}</span><span class="panel-tag">● ${tx("visualStatus")}</span></div><svg class="signal-svg" viewBox="0 0 530 390" fill="none" aria-hidden="true" preserveAspectRatio="xMidYMid meet"><g stroke="#9ed9c9" stroke-width="1.25" opacity=".42"><path d="M68 205C132 95 242 119 293 200S431 282 475 147"/><path d="M68 205c64-65 100-10 165 0 73 11 160-98 242-58" stroke-dasharray="4 8"/><path d="M68 205C160 334 250 315 293 200c39-105 122-105 182-53" stroke-dasharray="2 8"/><path d="M147 100 293 200l96-77M147 100 165 280l128-80 110 82"/></g><g stroke="#c8f8df" stroke-width="1.4" opacity=".65"><circle cx="293" cy="200" r="93"/><circle cx="293" cy="200" r="138" stroke-dasharray="3 10"/><circle cx="293" cy="200" r="49"/></g><g fill="#b7f6d5"><circle cx="293" cy="200" r="11"/><circle cx="147" cy="100" r="6"/><circle cx="389" cy="123" r="5"/><circle cx="165" cy="280" r="6"/><circle cx="403" cy="282" r="6"/><circle cx="68" cy="205" r="4"/><circle cx="475" cy="147" r="4"/></g><g fill="#ecfff5" font-size="11" font-family="Inter,Arial,sans-serif" font-weight="650"><text x="263" y="161">INFERENCE</text><text x="87" y="85">SAR</text><text x="399" y="113">R</text><text x="95" y="306">MODELS</text><text x="409" y="309">DATA</text></g></svg><div class="floating-note"><span>${tx("visualNote")}</span>${tx("visualNoteDetail")}</div><div class="panel-bottom"><div><strong>${tx("visualTitle")}</strong><span>${tx("visualCaption")}</span></div><span class="panel-index">${tx("visualIndex")}</span></div></div>`;

  const portraitPanel = (context="home") => {
    const photo=safe(D.profile.portrait);
    if (!photo) return researchVisual();
    return `<figure class="portrait-panel ${context === "about" ? "portrait-about-panel" : ""}"><img class="portrait-image" src="${photo}" alt="${e(lang === "pt" ? "Retrato de Willams Batista" : "Portrait of Willams Batista")}" loading="${context === "home" ? "eager" : "lazy"}" decoding="async" /><figcaption class="portrait-caption">${e(D.profile.name)} · ${e(t(D.profile.affiliation))}</figcaption></figure>`;
  };
  // Both languages share one canonical URL; update metadata on language changes.
  const updatePageMetadata = () => {
    const info=D.seo?.[page];
    if(!info){document.title=`${tx(page)} | ${D.profile.name}`;return;}
    const title=t(info.title),description=t(info.description);
    document.title=title;
    const setMeta=(selector,value)=>document.querySelector(selector)?.setAttribute("content",value);
    setMeta('meta[name="description"]',description);
    setMeta('meta[property="og:title"]',title);
    setMeta('meta[property="og:description"]',description);
  };
  const renderHeader = () => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    document.documentElement.dataset.theme = theme;
    updatePageMetadata();
    document.querySelector(".skip-link").textContent = tx("skip");
    const navHtml = routes.map(r=>`<a href="${href(r)}" ${r===page?'class="active" aria-current="page"':''}>${tx(r)}</a>`).join("");
    document.getElementById("site-header").innerHTML = `<header class="site-header"><div class="shell header-inner"><a class="brand" href="${href("index")}" aria-label="${e(D.profile.name)} — ${tx("index")}"><span class="brand-mark" aria-hidden="true">W.</span><span>${e(D.profile.name)}</span></a><nav class="nav" id="main-nav" aria-label="${tx("navigate")}">${navHtml}</nav><div class="header-actions"><button class="icon-btn lang-btn" id="language-toggle" type="button" title="${tx("toggleLanguage")}" aria-label="${tx("toggleLanguage")}">${lang === "pt" ? "EN" : "PT"}</button><button class="icon-btn" id="theme-toggle" type="button" title="${tx("toggleTheme")}" aria-label="${tx("toggleTheme")}">${icon(theme === "dark"?"sun":"moon")}</button><button class="icon-btn menu-btn" id="menu-toggle" type="button" aria-expanded="false" aria-controls="main-nav" aria-label="${tx("openMenu")}">${icon("menu")}</button></div></div></header>`;
    document.getElementById("language-toggle").addEventListener("click",()=>{lang=lang==="pt"?"en":"pt";setPref("wb-lang",lang);render();});
    document.getElementById("theme-toggle").addEventListener("click",()=>{theme=theme==="light"?"dark":"light";setPref("wb-theme",theme);renderHeader();renderFooter();});
    const btn=document.getElementById("menu-toggle"), menu=document.getElementById("main-nav");
    btn.addEventListener("click",()=>{const open=menu.classList.toggle("open");btn.setAttribute("aria-expanded",String(open));btn.setAttribute("aria-label",tx(open?"closeMenu":"openMenu"));btn.innerHTML=icon(open?"close":"menu");});
    document.querySelector(".site-header")?.classList.toggle("scrolled",window.scrollY>5);
  };
  window.addEventListener("scroll",()=>document.querySelector(".site-header")?.classList.toggle("scrolled",window.scrollY>5),{passive:true});
  const renderFooter = () => {
    const footerLinks=["research","publications","supervision","people","teaching","software"];
    const social=profileLinks();
    document.getElementById("site-footer").innerHTML=`<footer class="footer"><div class="shell"><div class="footer-main"><div class="footer-intro"><a class="brand" href="${href("index")}"><span class="brand-mark" aria-hidden="true">W.</span><span>${e(D.profile.name)}</span></a><p>${tx("footerText")}</p><span class="tag dot-tag">${e(t(D.profile.location))}</span></div><div class="footer-col"><h3>${tx("navigate")}</h3>${footerLinks.map(r=>`<a href="${href(r)}">${tx(r)}</a>`).join("")}</div><div class="footer-col"><h3>${tx("follow")}</h3><a href="about.html">${tx("about")}</a><a href="contact.html">${tx("contact")}</a>${Object.entries(D.profile.social).filter(([,u])=>safe(u)).map(([k,u])=>`<a href="${safe(u)}" target="_blank" rel="noopener noreferrer">${e(({orcid:"ORCID",scholar:"Google Scholar",github:"GitHub",lattes:"Lattes",linkedin:"LinkedIn"})[k]||k)}</a>`).join("")}</div></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} ${e(D.profile.name)}. ${tx("made")}.</span><a href="${page === "index" ? "#main" : href("index")}">↑ ${tx(page === "index" ? "backTop" : "backHome")}</a></div></div></footer>`;
  };
  const renderHome = () => {
    const featured=(D.projects||[]).slice(0,3), sortedPapers=[...(D.publications||[])].sort((a,b)=>Number(b.year||0)-Number(a.year||0)), recent=sortedPapers.filter(p=>p.featured).slice(0,3);
    const papers=(recent.length?recent:sortedPapers.slice(0,3));
    return `<section class="hero"><div class="shell hero-layout"><div class="hero-copy reveal"><span class="eyebrow">${tx("eyebrowHome")}</span><h1 class="hero-title">${e(D.profile.name)}</h1><p class="hero-position">${e(t(D.profile.role))} · UFPE</p><p class="lead">${e(t(D.profile.introduction))}</p><div class="hero-cta"><a href="research.html" class="inline-link">${tx("seeResearch")} ${icon("arrow")}</a><a href="publications.html" class="inline-link">${tx("seePublications")} ${icon("arrow")}</a><a href="reading.html" class="inline-link">${tx("reading")} ${icon("arrow")}</a></div></div>${portraitPanel()}</div></section>
    <div class="ticker"><div class="shell ticker-row"><span class="ticker-title">${tx("focusAreas")}</span><p>${e(lang === "pt" ? "Inferência · Estatística espacial · Séries temporais · Imagens SAR" : "Inference · Spatial statistics · Time series · SAR imagery")}</p></div></div>
    <section class="section"><div class="shell">${sectionTitle(tx("research"),tx("researchTagline"),tx("researchIntro"),`<a class="inline-link" href="research.html">${tx("allResearch")} ${icon("arrow")}</a>`)}<div class="cards-4">${D.research.slice(0,4).map(researchCard).join("")}</div></div></section>
    <section class="section tight"><div class="shell">${sectionTitle(tx("activeProjects"),tx("activeProjects"),tx("projectDesc"),`<a class="inline-link" href="research.html">${tx("seeAllProjects")} ${icon("arrow")}</a>`)}<div class="cards-3">${featured.map(projectCard).join("")}</div></div></section>
    <section class="section"><div class="shell">${sectionTitle(tx("publications"),tx("papersHome"),tx("papersHomeDesc"),`<a class="inline-link" href="publications.html">${tx("seePublications")} ${icon("arrow")}</a>`)}${papers.length?`<div class="publication-list">${papers.map(pubCard).join("")}</div>`:empty("↗",tx("papersHome"),tx("noPapersHome"),`<a class="inline-link" href="publications.html">${tx("seePublications")} ${icon("arrow")}</a>`)}</div></section>
    ${D.news.length?`<section class="section tight"><div class="shell">${sectionTitle(tx("news"),tx("news"),tx("newsDesc"))}<div class="cards-3">${D.news.slice(0,3).map(n=>`<article class="project-card"><span class="small muted">${e(n.date)}</span><h3>${e(t(n.title))}</h3><p>${e(t(n.description))}</p>${link(n.url,tx("readMore"))}</article>`).join("")}</div></div></section>`:""}${banner()}`;
  };

  const pickIntroReferences = function(g){
  if(g.visibleReferences){const byId=new Map(g.references.map(r=>[r.id,r]));return g.visibleReferences.map(id=>byId.get(id)).filter(Boolean);}
  const chosen=[];
  ["entry","foundation","seminal","next"].forEach(kind=>{
    const r=(g.references||[]).find(item=>item.kind===kind&&!chosen.includes(item));
    if(r)chosen.push(r);
  });
  (g.references||[]).forEach(r=>{if(!chosen.includes(r))chosen.push(r)});
  return chosen.slice(0,3);
};
  const compactReference = function(r,anchor){
  return `<li class="reading-reference reading-reference-compact"${anchor?` id="intro-ref-${e(r.id)}"`:""}><h4><a href="${safe(r.url)}" target="_blank" rel="noopener noreferrer">${e(r.title)} ↗</a></h4><p class="reading-authors">${e(r.authors)} · ${e(String(r.year))}</p><p>${e(t(r.note))}</p></li>`;
};
  const renderDependentGuide = function(g,area,i){
  const pt=lang==="pt";
  const anchor={temporal:"time-series",spatial:"spatial-track-b",bridge:"spatial-track-a"};
  const labels=pt?{shared:"Fundamentos compartilhados",tracks:"Três caminhos para explorar",start:"Leitura inicial",refs:"Seis referências para começar"}:
  {shared:"Shared foundations",tracks:"Three ways to explore",start:"Start with",refs:"Six starting references"};
  const refs=new Map(g.references.map(r=>[r.id,r]));
  return `<article class="reading-area reading-area-intro dependent-guide" id="${e(g.id)}" aria-labelledby="read-${e(g.id)}">
    <span id="time-series" class="reading-anchor-alias" aria-hidden="true"></span>
    <div class="reading-intro">
      <span class="eyebrow">${e(String(i+1).padStart(2,"0"))} / ${String(D.readingGuides.length).padStart(2,"0")} · ${tx("readingSmall")}</span>
      <h2 id="read-${e(g.id)}">${e(t(area.title))}</h2>
      <p class="reading-question">${e(t(g.question))}</p>
      <p>${e(t(g.entry))}</p>
      <p class="reading-prereq"><strong>${tx("readingBackground")}</strong> ${e(t(g.background))}</p>
    </div>
    <section class="reading-shared" id="spatial-foundations" aria-labelledby="reading-shared-title">
      <h3 id="reading-shared-title">${e(labels.shared)}</h3><p>${e(t(g.shared))}</p>
    </section>
    <section class="reading-tracks" aria-labelledby="reading-tracks-title">
      <h3 id="reading-tracks-title">${e(labels.tracks)}</h3>
      <div class="reading-track-grid">${g.tracks.map(track=>`<article class="reading-track" id="${e(track.id==="temporal"?"intro-track-temporal":track.id==="spatial"?"spatial-track-b":"spatial-track-a")}">
        <h4>${e(t(track.title))}</h4><p>${e(t(track.description))}</p>
        <div class="reading-track-links"><strong>${e(labels.start)}:</strong> ${(track.refs||[]).map(id=>{const r=refs.get(id);return r?`<a href="#intro-ref-${e(id)}">${e(r.authors.split(";")[0])} (${e(String(r.year))})</a>`:"";}).filter(Boolean).join(" · ")}</div>
      </article>`).join("")}</div>
    </section>
    <nav class="reading-related" aria-label="${tx("readingConnections")}">
      <strong>${tx("readingConnections")}:</strong>
      ${(g.relatedGuides||[]).map(link=>`<a href="#${e(link.target)}">${e(t(link.label))} ↗</a>`).join("")}
    </nav>
    <section class="reading-bibliography reading-bibliography-short" aria-labelledby="reading-ref-title">
      <h3 id="reading-ref-title">${e(labels.refs)}</h3><ol>${g.references.map(r=>compactReference(r,true)).join("")}</ol>
    </section>
    <a class="reading-back" href="#top">↑ ${tx("readingBack")}</a>
  </article>`;
};
  const renderInferenceGuide = (g,area,i) => {
    const pt=lang==="pt";
    const words=pt?{
      common:"Fundamentos compartilhados",tracks:"Três percursos introdutórios",
      refs:"Sete leituras selecionadas",reading:"Por onde começar",link:"Conexão entre as áreas"
    }:{
      common:"Shared foundations",tracks:"Three introductory routes",
      refs:"Seven selected readings",reading:"Start with",link:"Connection between areas"
    };
    const byId=new Map(g.references.map(r=>[r.id,r]));
    const visible=pickIntroReferences(g);
    return `<article class="reading-area reading-area-intro inference-guide" id="${e(g.id)}" aria-labelledby="read-${e(g.id)}">
      <div class="reading-intro">
        <span class="eyebrow">${e(String(i+1).padStart(2,"0"))} / ${String(D.readingGuides.length).padStart(2,"0")} · ${tx("readingSmall")}</span>
        <h2 id="read-${e(g.id)}">${e(t(area.title))}</h2>
        <p class="reading-question">${e(t(g.question))}</p>
        <p>${e(t(g.entry))}</p>
        <p class="reading-prereq"><strong>${tx("readingBackground")}</strong> ${e(t(g.background))}</p>
      </div>
      <section class="reading-shared" aria-labelledby="inference-foundations-title">
        <h3 id="inference-foundations-title">${e(words.common)}</h3><p>${e(t(g.shared))}</p>
      </section>
      <section class="reading-tracks" aria-labelledby="inference-tracks-title">
        <h3 id="inference-tracks-title">${e(words.tracks)}</h3>
        <div class="reading-track-grid">${g.tracks.map(track=>`<article class="reading-track" id="inference-track-${e(track.id)}">
          <h4>${e(t(track.title))}</h4><p>${e(t(track.description))}</p>
          <div class="reading-track-links"><strong>${e(words.reading)}:</strong> ${track.refs.map(id=>{const r=byId.get(id);return r?`<a href="#inference-ref-${e(id)}">${e(r.authors.split(";")[0])} (${e(String(r.year))})</a>`:"";}).filter(Boolean).join(" · ")}</div>
        </article>`).join("")}</div>
      </section>
      <nav class="reading-related" aria-label="${tx("readingConnections")}">
        <strong>${tx("readingConnections")}:</strong>
        ${[g.crosslink,...(g.relatedGuides||[])].filter(Boolean).map(link=>`<a href="#${e(link.target)}">${e(t(link.label))} ↗</a>`).join("")}
      </nav>
      <section class="reading-bibliography reading-bibliography-short" aria-labelledby="inference-reference-title">
        <h3 id="inference-reference-title">${e(words.refs)}</h3>
        <ol>${visible.map(r=>`<li class="reading-reference reading-reference-compact" id="inference-ref-${e(r.id)}">
          <h4><a href="${safe(r.url)}" target="_blank" rel="noopener noreferrer">${e(r.title)} ↗</a></h4>
          <p class="reading-authors">${e(r.authors)} · ${e(String(r.year))}</p><p>${e(t(r.note))}</p>
        </li>`).join("")}</ol>
      </section>
      <a class="reading-back" href="#top">↑ ${tx("readingBack")}</a>
    </article>`;
  };
  const renderImageGuide = (g,area,i) => {
    const pt=lang==="pt";
    const w=pt?{
      shared:"Fundamentos compartilhados",tracks:"Três vertentes de aplicação",start:"Leituras de entrada",
      refs:"Sete leituras selecionadas",related:"Conexões metodológicas"
    }:{
      shared:"Shared foundations",tracks:"Three application routes",start:"Start with",
      refs:"Seven selected readings",related:"Methodological connections"
    };
    const byId=new Map(g.references.map(r=>[r.id,r]));
    const selected=pickIntroReferences(g);
    const displayAuthors=r=>{
      const names=r.authors.split(";").map(n=>n.trim());
      return names.length>4?names[0]+" et al.":r.authors;
    };
    return `<article class="reading-area reading-area-intro image-guide" id="${e(g.id)}" aria-labelledby="read-${e(g.id)}">
      <div class="reading-intro">
        <span class="eyebrow">${e(String(i+1).padStart(2,"0"))} / ${String(D.readingGuides.length).padStart(2,"0")} · ${tx("readingSmall")}</span>
        <h2 id="read-${e(g.id)}">${e(t(area.title))}</h2>
        <p class="reading-question">${e(t(g.question))}</p><p>${e(t(g.entry))}</p>
        <p class="reading-prereq"><strong>${tx("readingBackground")}</strong> ${e(t(g.background))}</p>
      </div>
      <section class="reading-shared" aria-labelledby="imaging-shared-title">
        <h3 id="imaging-shared-title">${e(w.shared)}</h3><p>${e(t(g.shared))}</p>
      </section>
      <section class="reading-tracks" aria-labelledby="imaging-tracks-title">
        <h3 id="imaging-tracks-title">${e(w.tracks)}</h3>
        <div class="reading-track-grid">${g.tracks.map(track=>`<article class="reading-track" id="imaging-track-${e(track.id)}">
          <span class="reading-track-status">${e(t(track.status))}</span>
          <h4>${e(t(track.title))}</h4><p>${e(t(track.description))}</p>
          <div class="reading-track-links"><strong>${e(w.start)}:</strong> ${track.refs.map(id=>{const r=byId.get(id);return r?`<a href="#imaging-ref-${e(id)}">${e(r.authors.split(";")[0])} (${e(String(r.year))})</a>`:"";}).filter(Boolean).join(" · ")}</div>
        </article>`).join("")}</div>
      </section>
      <nav class="reading-related" aria-label="${e(w.related)}">
        <strong>${e(w.related)}:</strong>
        ${g.relatedGuides.map(c=>`<a href="#${e(c.target)}">${e(t(c.label))} ↗</a>`).join("")}
      </nav>
      <section class="reading-bibliography reading-bibliography-short" aria-labelledby="imaging-references-title">
        <h3 id="imaging-references-title">${e(w.refs)}</h3>
        <ol>${selected.map(r=>`<li class="reading-reference reading-reference-compact" id="imaging-ref-${e(r.id)}">
          <h4><a href="${safe(r.url)}" target="_blank" rel="noopener noreferrer">${e(r.title)} ↗</a></h4>
          <p class="reading-authors">${e(displayAuthors(r))} · ${e(String(r.year))}</p>
          <p>${e(t(r.note))}</p>
        </li>`).join("")}</ol>
      </section>
      <a class="reading-back" href="#top">↑ ${tx("readingBack")}</a>
    </article>`;
  };
  const renderGeometryGuide = (g,area,i) => {
    const pt=lang==="pt";
    const w=pt?{
      shared:"Fundamentos compartilhados",tracks:"Três vertentes de pesquisa",
      start:"Leitura inicial",refs:"Oito leituras selecionadas",
      related:"Conexões com outras áreas"
    }:{
      shared:"Shared foundations",tracks:"Three research pathways",
      start:"Start with",refs:"Eight selected readings",
      related:"Connections with other areas"
    };
    const byId=new Map(g.references.map(r=>[r.id,r]));
    const chosen=pickIntroReferences(g);
    const authorLabel=r=>r.authors.split(";").map(n=>n.trim()).length>4?
      r.authors.split(";")[0].trim()+" et al.":r.authors;
    return `<article class="reading-area reading-area-intro geometry-guide" id="${e(g.id)}" aria-labelledby="read-${e(g.id)}">
      <div class="reading-intro">
        <span class="eyebrow">${e(String(i+1).padStart(2,"0"))} / ${String(D.readingGuides.length).padStart(2,"0")} · ${tx("readingSmall")}</span>
        <h2 id="read-${e(g.id)}">${e(t(area.title))}</h2>
        <p class="reading-question">${e(t(g.question))}</p><p>${e(t(g.entry))}</p>
        <p class="reading-prereq"><strong>${tx("readingBackground")}</strong> ${e(t(g.background))}</p>
      </div>
      <section class="reading-shared" aria-labelledby="geometry-shared-title">
        <h3 id="geometry-shared-title">${e(w.shared)}</h3><p>${e(t(g.shared))}</p>
      </section>
      <section class="reading-tracks" aria-labelledby="geometry-tracks-title">
        <h3 id="geometry-tracks-title">${e(w.tracks)}</h3>
        <div class="reading-track-grid">${g.tracks.map(track=>`<article class="reading-track" id="geometry-track-${e(track.id)}">
          <h4>${e(t(track.title))}</h4><p>${e(t(track.description))}</p>
          <div class="reading-track-links"><strong>${e(w.start)}:</strong> ${track.refs.map(id=>{const r=byId.get(id);return r?`<a href="#geometry-ref-${e(id)}">${e(r.authors.split(";")[0].trim())} (${e(String(r.year))})</a>`:"";}).filter(Boolean).join(" · ")}</div>
        </article>`).join("")}</div>
      </section>
      <nav class="reading-related" aria-label="${e(w.related)}">
        <strong>${e(w.related)}:</strong>
        ${[g.crosslink,...(g.relatedGuides||[])].filter(Boolean).map(link=>`<a href="#${e(link.target)}">${e(t(link.label))} ↗</a>`).join("")}
      </nav>
      <section class="reading-bibliography reading-bibliography-short" aria-labelledby="geometry-references-title">
        <h3 id="geometry-references-title">${e(w.refs)}</h3>
        <ol>${chosen.map(r=>`<li class="reading-reference reading-reference-compact" id="geometry-ref-${e(r.id)}">
          <h4><a href="${safe(r.url)}" target="_blank" rel="noopener noreferrer">${e(r.title)} ↗</a></h4>
          <p class="reading-authors">${e(authorLabel(r))} · ${e(String(r.year))}</p>
          <p>${e(t(r.note))}</p>
        </li>`).join("")}</ol>
      </section>
      <a class="reading-back" href="#top">↑ ${tx("readingBack")}</a>
    </article>`;
  };
  const renderRegressionGuide=(g,area,i)=>{
    const pt=lang==="pt";
    const w=pt?{
      shared:"Fundamentos compartilhados",tracks:"Três vertentes de pesquisa",
      start:"Leituras iniciais",refs:"Oito leituras selecionadas",
      related:"Conexões com outras áreas"
    }:{
      shared:"Shared foundations",tracks:"Three research pathways",
      start:"Start with",refs:"Eight selected readings",
      related:"Connections with other areas"
    };
    const byId=new Map(g.references.map(r=>[r.id,r]));
    const selected=pickIntroReferences(g);
    const authorLabel=r=>r.authors.split(";").length>4?r.authors.split(";")[0].trim()+" et al.":r.authors;
    return `<article class="reading-area reading-area-intro regression-guide" id="${e(g.id)}" aria-labelledby="read-${e(g.id)}">
      <div class="reading-intro">
        <span class="eyebrow">${e(String(i+1).padStart(2,"0"))} / ${String(D.readingGuides.length).padStart(2,"0")} · ${tx("readingSmall")}</span>
        <h2 id="read-${e(g.id)}">${e(t(area.title))}</h2>
        <p class="reading-question">${e(t(g.question))}</p><p>${e(t(g.entry))}</p>
        <p class="reading-prereq"><strong>${tx("readingBackground")}</strong> ${e(t(g.background))}</p>
      </div>
      <section class="reading-shared" aria-labelledby="regression-shared-title">
        <h3 id="regression-shared-title">${e(w.shared)}</h3><p>${e(t(g.shared))}</p>
      </section>
      <section class="reading-tracks" aria-labelledby="regression-tracks-title">
        <h3 id="regression-tracks-title">${e(w.tracks)}</h3>
        <div class="reading-track-grid">${g.tracks.map(track=>`<article class="reading-track" id="regression-track-${e(track.id)}">
          <h4>${e(t(track.title))}</h4><p>${e(t(track.description))}</p>
          <div class="reading-track-links"><strong>${e(w.start)}:</strong> ${track.refs.map(id=>{const r=byId.get(id);return r?`<a href="#regression-ref-${e(id)}">${e(r.authors.split(";")[0].trim())} (${e(String(r.year))})</a>`:"";}).filter(Boolean).join(" · ")}</div>
        </article>`).join("")}</div>
      </section>
      <nav class="reading-related" aria-label="${e(w.related)}">
        <strong>${e(w.related)}:</strong>
        ${(g.relatedGuides||[]).map(link=>`<a href="#${e(link.target)}">${e(t(link.label))} ↗</a>`).join("")}
      </nav>
      <section class="reading-bibliography reading-bibliography-short" aria-labelledby="regression-references-title">
        <h3 id="regression-references-title">${e(w.refs)}</h3>
        <ol>${selected.map(r=>`<li class="reading-reference reading-reference-compact" id="regression-ref-${e(r.id)}">
          <h4><a href="${safe(r.url)}" target="_blank" rel="noopener noreferrer">${e(r.title)} ↗</a></h4>
          <p class="reading-authors">${e(authorLabel(r))} · ${e(String(r.year))}</p>
          <p>${e(t(r.note))}</p>
        </li>`).join("")}</ol>
      </section>
      <a class="reading-back" href="#top">↑ ${tx("readingBack")}</a>
    </article>`;
  };
  const renderCausalGuide=(g,area,i)=>{
    const pt=lang==="pt";
    const w=pt?{
      shared:"Fundamentos compartilhados",tracks:"Três percursos de pesquisa",
      start:"Leituras iniciais",refs:"Nove leituras selecionadas",
      related:"Conexões com outras áreas"
    }:{
      shared:"Shared foundations",tracks:"Three research pathways",
      start:"Start with",refs:"Nine selected readings",
      related:"Connections with other areas"
    };
    const byId=new Map(g.references.map(r=>[r.id,r]));
    const selected=pickIntroReferences(g);
    const authorLabel=r=>r.authors.split(";").length>4?r.authors.split(";")[0].trim()+" et al.":r.authors;
    return `<article class="reading-area reading-area-intro causal-guide" id="${e(g.id)}" aria-labelledby="read-${e(g.id)}">
      <div class="reading-intro">
        <span class="eyebrow">${e(String(i+1).padStart(2,"0"))} / ${String(D.readingGuides.length).padStart(2,"0")} · ${tx("readingSmall")}</span>
        <h2 id="read-${e(g.id)}">${e(t(area.title))}</h2>
        <p class="reading-question">${e(t(g.question))}</p><p>${e(t(g.entry))}</p>
        <p class="reading-prereq"><strong>${tx("readingBackground")}</strong> ${e(t(g.background))}</p>
      </div>
      <section class="reading-shared" aria-labelledby="causal-shared-title">
        <h3 id="causal-shared-title">${e(w.shared)}</h3><p>${e(t(g.shared))}</p>
      </section>
      <section class="reading-tracks" aria-labelledby="causal-tracks-title">
        <h3 id="causal-tracks-title">${e(w.tracks)}</h3>
        <div class="reading-track-grid">${g.tracks.map(track=>`<article class="reading-track" id="causal-track-${e(track.id)}">
          <h4>${e(t(track.title))}</h4><p>${e(t(track.description))}</p>
          <div class="reading-track-links"><strong>${e(w.start)}:</strong> ${track.refs.map(id=>{const r=byId.get(id);return r?`<a href="#causal-ref-${e(id)}">${e(r.authors.split(";")[0].trim())} (${e(String(r.year))})</a>`:"";}).filter(Boolean).join(" · ")}</div>
        </article>`).join("")}</div>
      </section>
      <nav class="reading-related" aria-label="${e(w.related)}">
        <strong>${e(w.related)}:</strong>
        ${(g.relatedGuides||[]).map(link=>`<a href="#${e(link.target)}">${e(t(link.label))} ↗</a>`).join("")}
      </nav>
      <section class="reading-bibliography reading-bibliography-short" aria-labelledby="causal-references-title">
        <h3 id="causal-references-title">${e(w.refs)}</h3>
        <ol>${selected.map(r=>`<li class="reading-reference reading-reference-compact" id="causal-ref-${e(r.id)}">
          <h4><a href="${safe(r.url)}" target="_blank" rel="noopener noreferrer">${e(r.title)} ↗</a></h4>
          <p class="reading-authors">${e(authorLabel(r))} · ${e(String(r.year))}</p>
          <p>${e(t(r.note))}</p>
        </li>`).join("")}</ol>
      </section>
      <a class="reading-back" href="#top">↑ ${tx("readingBack")}</a>
    </article>`;
  };
  const renderReading = function(){
  const nav=D.readingGuides.map((g,i)=>{const area=D.research.find(r=>r.id===g.id);return `<a href="#${e(g.id)}" data-reading-guide="${e(g.id)}" aria-controls="${e(g.id)}"><span class="reading-nav-number" aria-hidden="true">${e(String(i+1).padStart(2,"0"))}</span><span class="reading-nav-title">${e(t(area.title))}</span><span class="reading-nav-arrow" aria-hidden="true">↗</span></a>`;}).join("");
  const choices=D.readingGuides.map((g,i)=>{const area=D.research.find(r=>r.id===g.id);return `<option value="${e(g.id)}">${e(String(i+1).padStart(2,"0"))} · ${e(t(area.title))}</option>`;}).join("");
  const articles=D.readingGuides.map((g,i)=>{
    const area=D.research.find(r=>r.id===g.id);
    if(g.id==="spatial-models" && g.tracks) return renderDependentGuide(g,area,i);
    if(g.id==="theory" && g.tracks) return renderInferenceGuide(g,area,i);
    if(g.id==="sar" && g.tracks) return renderImageGuide(g,area,i);
    if(g.id==="geometry" && g.tracks) return renderGeometryGuide(g,area,i);
    if(g.id==="regression" && g.tracks) return renderRegressionGuide(g,area,i);
    if(g.id==="causal" && g.tracks) return renderCausalGuide(g,area,i);
    const refs=pickIntroReferences(g);
    return `<article class="reading-area reading-area-compact" id="${e(g.id)}" aria-labelledby="read-${e(g.id)}">
      <div class="reading-intro">
        <span class="eyebrow">${e(String(i+1).padStart(2,"0"))} / ${String(D.readingGuides.length).padStart(2,"0")} · ${tx("readingSmall")}</span>
        <h2 id="read-${e(g.id)}">${e(t(area.title))}</h2>
        <p class="reading-question">${e(t(g.question))}</p><p>${e(t(g.entry))}</p>
        <p class="reading-prereq"><strong>${tx("readingBackground")}</strong> ${e(t(g.background))}</p>
      </div>
      <div class="reading-path"><h3>${tx("readingPath")}</h3><ol>${(g.path||[]).slice(0,2).map(step=>`<li>${e(t(step))}</li>`).join("")}</ol></div>
      ${g.crosslink?`<p class="reading-crosslink"><a href="#${e(g.crosslink.target)}">${e(t(g.crosslink.label))} ↗</a></p>`:""}
      ${(g.relatedGuides||[]).map(item=>`<p class="reading-crosslink"><a href="#${e(item.target)}">${e(t(item.label))} ↗</a></p>`).join("")}
      <div class="reading-bibliography reading-bibliography-short"><h3>${tx("readingReferences")}</h3><ol>${refs.map(r=>compactReference(r,false)).join("")}</ol></div>
      <a class="reading-back" href="#top">↑ ${tx("readingBack")}</a>
    </article>`;
  }).join("");
  return `${pageHero(tx("research"),tx("readingTitle"),tx("readingPageLead"))}<section class="section reading-section" id="top">
    <div class="shell"><div class="reading-note"><strong>${tx("readingNoteTitle")}</strong> ${tx("readingNote")}</div>
    <div class="reading-layout"><nav class="reading-index" aria-label="${tx("readingIndex")}"><span class="eyebrow">${tx("readingIndex")}</span>${nav}</nav>
      <div class="reading-main"><div class="reading-mobile-picker"><label for="reading-guide-select">${tx("readingChoose")}</label><select id="reading-guide-select" aria-controls="reading-guides">${choices}</select></div>
        <p class="reading-status" id="reading-guide-status" role="status" aria-live="polite" aria-atomic="true"></p>
        <div class="reading-guides" id="reading-guides">${articles}</div><nav class="reading-pagination" aria-label="${tx("readingIndex")}"></nav>
      </div></div></div></section>`;
};
  const readingHashId=()=>{
    try{return decodeURIComponent(window.location.hash.slice(1));}
    catch{return window.location.hash.slice(1);}
  };
  const readingPager=(index)=>{
    const prev=D.readingGuides[index-1],next=D.readingGuides[index+1];
    const guideTitle=id=>t(D.research.find(r=>r.id===id).title);
    const link=(g,label,kind,arrow)=>g?`<a class="reading-page-link ${kind}" href="#${e(g.id)}" aria-label="${e(label+": "+guideTitle(g.id))}"><span class="reading-page-direction">${arrow} ${e(label)}</span><span class="reading-page-title">${e(guideTitle(g.id))}</span></a>`:
      `<span class="reading-page-placeholder" aria-hidden="true"></span>`;
    return `${link(prev,tx("readingPrevious"),"previous","←")}${link(next,tx("readingNext"),"next","→")}`;
  };
  const syncReadingSelection=(scrollToTarget=false)=>{
    if(page!=="reading")return;
    const guides=document.getElementById("reading-guides");
    if(!guides)return;
    const hash=readingHashId();
    const target=hash?document.getElementById(hash):null;
    const targetPanel=target?.closest(".reading-area");
    const requestedId=targetPanel?.id||(hash==="time-series"?"spatial-models":null);
    const ids=D.readingGuides.map(g=>g.id);
    const nextId=ids.includes(requestedId)?requestedId:
      ids.includes(selectedReadingGuide)?selectedReadingGuide:ids[0];
    const previousFocusPanel=document.activeElement?.closest?.(".reading-area");
    const changingFocus=previousFocusPanel&&previousFocusPanel.id!==nextId;
    const changed=selectedReadingGuide!==nextId;
    selectedReadingGuide=nextId;
    const article=document.getElementById(nextId);
    guides.querySelectorAll(".reading-area").forEach(panel=>{
      panel.hidden=panel.id!==nextId;
    });
    document.querySelectorAll(".reading-index [data-reading-guide]").forEach(link=>{
      if(link.dataset.readingGuide===nextId)link.setAttribute("aria-current","location");
      else link.removeAttribute("aria-current");
    });
    const select=document.getElementById("reading-guide-select");
    if(select)select.value=nextId;
    const pager=document.querySelector(".reading-pagination");
    if(pager)pager.innerHTML=readingPager(ids.indexOf(nextId));
    const status=document.getElementById("reading-guide-status");
    if(status&&changed)status.textContent=t(D.research.find(r=>r.id===nextId).title);
    if(changingFocus){
      const heading=article.querySelector("h2");
      heading.tabIndex=-1;heading.focus({preventScroll:true});
    }
    if(scrollToTarget&&(targetPanel||hash==="time-series")){
      const destination=targetPanel?.id===nextId?target:article;
      window.requestAnimationFrame(()=>{
        if(destination?.isConnected&&!destination.closest(".reading-area")?.hidden)
          destination.scrollIntoView({block:"start",behavior:"auto"});
      });
    }
  };
  const renderResearch = () => `${pageHero(tx("research"),tx("researchTagline"),tx("projectsPageLead"))}<section class="section"><div class="shell">${sectionTitle(tx("focusAreas"),tx("allResearch"),tx("researchIntro"))}<div class="cards-2">${D.research.map(researchCard).join("")}</div><div class="reading-cta"><div><span class="eyebrow">${tx("readingSmall")}</span><h3>${tx("readingTitle")}</h3><p>${tx("readingIntro")}</p></div><a class="inline-link" href="reading.html">${tx("readingButton")} ${icon("arrow",15)}</a></div></div></section><section class="section tight"><div class="shell">${sectionTitle(tx("activeProjects"),tx("featuredProjects"),tx("projectDesc"))}<div class="toolbar"><div class="filters" id="project-filters">${[{id:"all",label:tx("all")},...D.research.map(x=>({id:x.id,label:t(x.title)}))].map(x=>`<button class="filter-pill ${selectedProjectArea===x.id?"active":""}" type="button" data-area="${e(x.id)}" aria-pressed="${selectedProjectArea===x.id}">${e(x.label)}</button>`).join("")}</div></div><div id="project-results" class="cards-2">${D.projects.filter(x=>selectedProjectArea==="all"||x.area===selectedProjectArea).map(projectCard).join("")}</div></div></section>${renderResearchIdeas()}${banner()}`;
  const renderResearchIdeas = () => {
    const ideas=D.researchIdeas||[];
    if(!ideas.length)return "";
    const dict=lang==="pt"?{title:"Áreas para colaboração",subtitle:"Possíveis frentes de colaboração científica",note:"Temas gerais para conversas científicas. Propostas específicas, dados e metodologias inéditas são discutidos individualmente; não há vagas ou parcerias anunciadas.",applied:"Estudos aplicados",theory:"Desenvolvimento metodológico",computational:"Software científico",caution:"Questão de viabilidade",source:"Referência metodológica"}:{title:"Collaboration interests",subtitle:"Possible directions for scientific collaboration",note:"Broad interests for initial conversations. Specific proposals, data and unpublished methods are discussed individually; no vacancies or formal partnerships are announced.",applied:"Applied studies",theory:"Methodological research",computational:"Scientific software",caution:"Feasibility question",source:"Methodological reference"};
    const groups=["applied","theory","computational"].map(type=>{
      const subset=ideas.filter(x=>x.type===type);
      return subset.length?`<details class="idea-group"><summary><span>${dict[type]}</span><span class="directory-count">${subset.length}</span></summary><div class="research-idea-list">${subset.map(x=>`<article class="research-idea"><h4>${e(t(x.title))}</h4><p>${e(t(x.description))}</p><p class="research-idea-caution"><strong>${dict.caution}:</strong> ${e(t(x.caveat))}</p>${safe(x.reference)?`<a class="inline-link" href="${safe(x.reference)}" target="_blank" rel="noopener noreferrer">${dict.source} ↗</a>`:""}</article>`).join("")}</div></details>`:"";
    }).join("");
    return `<section class="section tight" id="research-notebook"><div class="shell"><div class="section-heading"><div><span class="eyebrow">${dict.title}</span><h2>${dict.subtitle}</h2><p>${dict.note}</p></div></div><div class="research-notebook">${groups}</div></div></section>`;
  };
  const labelType = type => ({article:tx("articles"),preprint:tx("preprints"),conference:tx("conferences"),other:tx("others")})[type]||tx("others");
  const citeText = p => `${p.authors||""} (${p.year||""}). ${p.title||""}. ${p.venue||""}.${p.doi?` https://doi.org/${p.doi.replace(/^https?:\/\/doi\.org\//,"")}`:""}`;
  const pubCard = p => {
    const resources=[[p.doi?`https://doi.org/${String(p.doi).replace(/^https?:\/\/doi\.org\//,"")}`:"",tx("doi")],[p.pdf,tx("pdf")],[p.code,tx("code")],[p.data,tx("data")],[p.url,tx("website")]];
    return `<article class="publication"><div class="publication-year">${e(p.year||"")}</div><div class="publication-content"><div class="card-footer">${tag(labelType(p.type),"tinted")}${(p.tags||[]).slice(0,3).map(s=>tag(s)).join("")}</div><h3>${e(p.title)}</h3><p class="authors">${e(p.authors||"")}</p><p class="venue">${e(p.venue||"")}</p><div class="links">${resources.map(([u,l])=>safe(u)?`<a href="${safe(u)}" target="_blank" rel="noopener noreferrer">${e(l)} ↗</a>`:"").join("")}<button type="button" data-cite="${e(p.id)}">${tx("cite")} ↗</button></div></div></article>`;
  };
  const filteredPublications = () => {
    const query=publicationSearch.toLocaleLowerCase(lang === "pt"?"pt-BR":"en-US");
    return (D.publications||[]).filter(p=>{
      if(selectedPublicationType!=="all" && (p.type||"other")!==selectedPublicationType) return false;
      if(publicationYear!=="all" && String(p.year)!==publicationYear) return false;
      return !query || [p.title,p.authors,p.venue,...(p.tags||[])].join(" ").toLocaleLowerCase(lang === "pt"?"pt-BR":"en-US").includes(query);
    }).sort((a,b)=>Number(b.year||0)-Number(a.year||0));
  };
  const pubsResults = () => {
    const list=filteredPublications(), count=document.getElementById("pub-count"), dest=document.getElementById("pub-results");
    if(count) count.textContent=`${list.length} ${list.length===1?tx("record"):tx("records")}`;
    if(dest) dest.innerHTML=list.length?list.map(pubCard).join(""):empty("⌕",tx("publications"),D.publications.length?tx("noMatches"):tx("noPapers"));
  };
  const renderPublications = () => {
    const years=[...new Set((D.publications||[]).map(p=>String(p.year)).filter(Boolean))].sort((a,b)=>Number(b)-Number(a));
    return `${pageHero(tx("publications"),tx("papersHome"),tx("papersPageLead"))}<section class="section"><div class="shell"><div class="toolbar"><label class="search-input">${icon("search")}<input id="publication-search" type="search" autocomplete="off" value="${e(publicationSearch)}" placeholder="${tx("searchPlaceholder")}" aria-label="${tx("searchPlaceholder")}" /></label><div class="filters"><label class="small muted" for="publication-year">${tx("year")}</label><select id="publication-year" class="sort-select"><option value="all">${tx("all")}</option>${years.map(y=>`<option value="${e(y)}" ${publicationYear===y?"selected":""}>${e(y)}</option>`).join("")}</select><button class="btn outline" id="export-bibtex" type="button" ${!D.publications.length?"disabled":""}>${icon("download")} ${tx("exportBib")}</button></div></div><div class="toolbar"><div class="filters" id="publication-types">${["all","article","preprint","conference","other"].map(type=>`<button class="filter-pill ${type===selectedPublicationType?"active":""}" data-type="${type}" type="button" aria-pressed="${type===selectedPublicationType}">${type==="all"?tx("all"):labelType(type)}</button>`).join("")}</div><span id="pub-count" class="count"></span></div><div class="publication-list" id="pub-results"></div></div></section>${banner()}`;
  };
  const topicCard = x => `<article class="topic-card"><div class="level-tags">${x.levels.map(y=>tag(tx(y),"tinted")).join("")}${x.area&&D.research.find(a=>a.id===x.area)?`<a class="topic-area" href="reading.html#${e(x.area)}">${e(t(D.research.find(a=>a.id===x.area).title))} ↗</a>`:""}</div><div class="card-content"><h3>${e(t(x.title))}</h3><p>${e(t(x.description))}</p></div><div class="requirements"><b>${tx("requirements")}</b><p>${e(t(x.requirements))}</p></div></article>`;
  const topicResults = () => D.topics.filter(x=>selectedTopicLevel==="all"||x.levels.includes(selectedTopicLevel)).map(topicCard).join("");
  const renderSupervision = () => `${pageHero(tx("supervision"),tx("supervisionTitle"),tx("supervisionLead"))}<section class="section"><div class="shell"><div class="note-box"><strong>${tx("supervision")}:</strong> ${tx("advisory")} ${lang==="pt"?"Os projetos abaixo são propostas de estudo, sujeitas à avaliação de viabilidade e disponibilidade; não constituem vagas abertas.":"The directions below are proposals subject to feasibility and availability review; they are not open positions."}</div><div class="spaced-intro">${sectionTitle(tx("topics"),lang==="pt"?"Possíveis temas por nível":"Potential topics by level",lang==="pt"?"Selecione um nível para explorar projetos e conhecimentos recomendados.":"Choose a level to explore proposed projects and recommended background.")}</div><div class="toolbar"><div class="filters" id="level-filters">${["undergraduate","masters","phd","all"].map(level=>`<button class="filter-pill ${selectedTopicLevel===level?"active":""}" type="button" data-level="${level}" aria-pressed="${selectedTopicLevel===level}">${level==="all"?tx("all"):tx(level)} <span class="filter-count">${level==="all"?D.topics.length:D.topics.filter(x=>x.levels.includes(level)).length}</span></button>`).join("")}</div><span class="count" id="topic-count">${D.topics.filter(x=>selectedTopicLevel==="all"||x.levels.includes(selectedTopicLevel)).length} ${lang==="pt"?"propostas":"proposals"}</span></div><div id="topic-results" class="cards-2">${topicResults()}</div></div></section><section class="section tight"><div class="shell">${sectionTitle(tx("howItWorks"),tx("howTitle"))}<div class="step-grid">${[1,2,3].map(n=>`<article class="step"><span class="step-number">0${n} / 03</span><h3>${tx("step"+n)}</h3><p>${tx("step"+n+"Desc")}</p></article>`).join("")}</div><div style="height:29px"></div><a class="btn primary" href="contact.html">${tx("contact")} ${icon("arrow")}</a></div></section><section class="section tight"><div class="shell">${sectionTitle("FAQ",tx("faqTitle"))}<div class="faq-list">${[1,2,3].map(n=>`<details class="faq"><summary>${tx("faq"+n)}</summary><p>${tx("faq"+n+"a")}</p></details>`).join("")}</div></div></section>`;
  const entryDateKey = value => {
    const hit = String(value || "").match(/^(\d{4})(?:(?:[./]([12]))|(?:-(\d{2})))?/);
    return hit ? Number(hit[1]) * 100 + (hit[3] ? Number(hit[3]) : hit[2] ? (Number(hit[2])===1 ? 6 : 12) : 0) : 0;
  };
  // Keep full names in editorial data; abbreviate only student/collaborator display.
  // Preserve surname particles and family suffixes (e.g. "de Araújo", "Silva Neto").
  const formatPublicPersonName = value => {
    const words=String(value ?? "").trim().split(/\s+/u).filter(Boolean);
    if(words.length < 3)return words.join(" ");
    const particles=new Set(["de","da","do","das","dos","del","della","di","du","van","von","der","den","la","le"]);
    const suffixes=new Set(["filho","filha","neto","neta","sobrinho","sobrinha","junior","júnior","jr","jr.","ii","iii"]);
    let surnameEnd=words.length-1;
    if(surnameEnd > 1 && suffixes.has(words[surnameEnd].toLocaleLowerCase()))surnameEnd--;
    let surnameStart=surnameEnd;
    while(surnameStart > 1 && particles.has(words[surnameStart-1].toLocaleLowerCase()))surnameStart--;
    const initials=words.slice(1,surnameStart)
      .filter(word=>!particles.has(word.toLocaleLowerCase()))
      .map(word=>word.endsWith(".") ? word : `${Array.from(word)[0].toLocaleUpperCase()}.`);
    return [words[0],...initials,...words.slice(surnameStart)].join(" ");
  };
  const studentLevel = s => s.levelId || (/phd|doutor/i.test(t(s.level||"")) ? "phd" : /master|mestrad/i.test(t(s.level||"")) ? "masters" : "undergraduate");
  const studentRelation = s => s.relation || (/co.?super|coorient/i.test(t(s.role||"")) ? "co-supervisor" : "supervisor");
  const renderPerson = s => {
    const period = s.start || s.end ? `<span class="directory-period">${e(s.start || (lang==="pt"?"Data não informada":"Date not provided"))}${s.end?` – ${e(s.end)}`:""}</span>` : "";
    return `<article class="person-entry"><div class="person-entry-main"><h3>${e(formatPublicPersonName(s.name))}</h3>${period}${s.project?`<p>${e(t(s.project))}</p>`:""}</div>${safe(s.url)?link(s.url,tx("website")):""}</article>`;
  };
  const renderPersonList = people => {
    const ordered = [...people].sort((a,b) => (a.status==="alumnus")-(b.status==="alumnus") || entryDateKey(b.start||b.end)-entryDateKey(a.start||a.end) || a.name.localeCompare(b.name));
    const recent = ordered.filter(x=>x.status!=="alumnus");
    const older = ordered.filter(x=>x.status==="alumnus");
    const show=recent.slice(0,6), hidden=recent.slice(6).concat(older);
    return `<div class="people-directory">${show.map(renderPerson).join("")}</div>${hidden.length?`<details class="directory-archive"><summary>${lang==="pt"?"Ver mais orientandos e egressos":"More students and alumni"} (${hidden.length})</summary><div class="people-directory">${hidden.map(renderPerson).join("")}</div></details>`:""}`;
  };
  // Named collaborators share the same display rule, without changing citation author lists.
  const renderCollaborator = c => {
    const role=t(c.role || ""),affiliation=t(c.affiliation || "");
    return `<article class="person-entry"><div class="person-entry-main"><h3>${e(formatPublicPersonName(c.name))}</h3>${role?`<p>${e(role)}</p>`:""}${affiliation?`<p>${e(affiliation)}</p>`:""}</div>${safe(c.url)?link(c.url,tx("website")):""}</article>`;
  };
  const renderPeople = () => {
    const names = lang === "pt" ? {undergraduate:"Graduação e iniciação científica",masters:"Mestrado",phd:"Doutorado",supervisor:"Orientação",co:"Coorientação"} : {undergraduate:"Undergraduate research",masters:"Master's",phd:"Ph.D.",supervisor:"Supervision",co:"Co-supervision"};
    const levels=["undergraduate","masters","phd"];
    const sections = levels.map(level=>{
      const members=D.students.filter(s=>studentLevel(s)===level);
      if(!members.length)return "";
      const roles=["supervisor","co-supervisor"].map(role=>{
        const group=members.filter(s=>studentRelation(s)===role);
        return group.length?`<div class="people-subgroup"><h3>${role==="supervisor"?names.supervisor:names.co} <span class="directory-count">${group.length}</span></h3>${renderPersonList(group)}</div>`:"";
      }).join("");
      return `<section class="academic-level"><div class="directory-heading"><h2>${names[level]}</h2><span class="directory-count">${members.length}</span></div>${roles}</section>`;
    }).join("");
    const collaborators=(D.collaborators || []).filter(c=>String(c?.name || "").trim());
    const collaborationSection=collaborators.length ? `<section class="academic-level"><div class="directory-heading"><h2>${lang==="pt"?"Colaboradores":"Collaborators"}</h2><span class="directory-count">${collaborators.length}</span></div><div class="people-directory">${collaborators.map(renderCollaborator).join("")}</div></section>` : "";
    const directory=sections+collaborationSection || empty("",tx("people"),tx("peopleEmpty"));
    return `${pageHero(tx("people"),tx("peopleTitle"),tx("peopleLead"))}<section class="section"><div class="shell">${directory}<p class="directory-note">${lang==="pt"?"Organização por nível e modalidade de orientação. Períodos são mostrados apenas quando confirmados; alunos e egressos anteriores ficam no histórico.":"Grouped by academic level and supervision role. Dates appear only when confirmed; earlier students and alumni remain in the expandable archive."}</p></div></section>`;
  };
  const courseOfferings = c => {
    const list = (Array.isArray(c.offerings) ? c.offerings : []).map(x => typeof x === "string" ? x : x?.term).filter(Boolean);
    if(c.term) list.push(String(c.term));
    const unique=[...new Set(list.map(x=>String(x).trim()).filter(Boolean))];
    return unique.filter(term=>!/^\d{4}$/.test(term) || !unique.some(other=>other!==term && other.startsWith(term) && /^[.\/-][12]$/.test(other.slice(term.length)))).sort((a,b)=>entryDateKey(b)-entryDateKey(a));
  };
  // Canonical course levels are "undergraduate" and "postgraduate". Existing "Undergraduate" entries remain valid.
  const courseLevel = course => {
    const value=String(course.level||"undergraduate").normalize("NFD").replace(/[\u0300-\u036f]/g,"").trim().toLowerCase();
    const graduateLevels=["postgraduate","graduate","graduate studies","postgrad","master","masters","master's","msc","phd","doctoral","doctorate","mestrado","doutorado","pos-graduacao","posgraduacao"];
    return graduateLevels.includes(value)?"postgraduate":"undergraduate";
  };
  const uniqueCourses = () => {
    const map=new Map();
    D.courses.forEach(course=>{
      const institution=String(course.institution||"").normalize("NFKC").trim().toLocaleLowerCase("en-US");
      const identity=String(course.code||t(course.title)).normalize("NFKC").trim().toLocaleLowerCase("en-US");
      const key=[institution,courseLevel(course),identity].join("|");
      if(!map.has(key)) map.set(key,{...course,offerings:[]});
      const record=map.get(key);
      record.offerings.push(...courseOfferings(course));
      if(!record.materials && course.materials)record.materials=course.materials;
    });
    return [...map.values()].map(c=>({...c,offerings:courseOfferings({...c,term:""}),latest:courseOfferings({...c,term:""})[0]||""})).sort((a,b)=>entryDateKey(b.latest)-entryDateKey(a.latest)||t(a.title).localeCompare(t(b.title),lang==="pt"?"pt-BR":"en"));
  };
  const courseRow = c => `<article class="course-entry"><div><h3>${e(t(c.title))}</h3>${c.offerings.length>1?`<details class="course-history"><summary>${lang==="pt"?"Histórico de ofertas":"Teaching history"} · ${c.offerings.length}</summary><ul>${c.offerings.map(term=>`<li>${e(term)}</li>`).join("")}</ul></details>`:""}</div><div class="course-meta"><span>${e(c.institution||"")}${c.latest?" · "+e(c.latest):""}</span></div></article>`;
  const renderCourseGroup = (level,items,expanded) => {
    if(!items.length)return "";
    const heading=level==="postgraduate"?(lang==="pt"?"Pós-graduação":"Graduate"):(lang==="pt"?"Graduação":"Undergraduate");
    const shown=expanded?items:items.slice(0,6),older=expanded?[]:items.slice(6);
    return `<section class="academic-level course-level" data-level="${level}" aria-labelledby="courses-${level}"><div class="directory-heading"><h2 id="courses-${level}">${heading}</h2><span class="directory-count">${items.length}</span></div><div class="course-list">${shown.map(courseRow).join("")}</div>${older.length?`<details class="directory-archive"><summary>${lang==="pt"?"Disciplinas anteriores":"Earlier courses"} (${older.length})</summary><div class="course-list">${older.map(courseRow).join("")}</div></details>`:""}</section>`;
  };
  const renderCourseResults = () => {
    const query=courseSearch.trim().toLocaleLowerCase(lang==="pt"?"pt-BR":"en-US");
    const items=uniqueCourses().filter(c=>(selectedCourseYear==="all" || c.offerings.some(term=>term.startsWith(selectedCourseYear))) && (!query || [t(c.title),t(c.description||""),...c.offerings].join(" ").toLocaleLowerCase(lang==="pt"?"pt-BR":"en-US").includes(query)));
    const expanded=Boolean(query || selectedCourseYear!=="all");
    return items.length?["undergraduate","postgraduate"].map(level=>renderCourseGroup(level,items.filter(c=>courseLevel(c)===level),expanded)).join(""):empty("",tx("courses"),lang==="pt"?"Nenhuma disciplina corresponde à busca.":"No matching courses.");
  };
  const renderTeaching = () => {
    const unique=uniqueCourses();
    const years=[...new Set(unique.flatMap(c=>c.offerings.map(term=>term.slice(0,4))).filter(s=>/^\d{4}$/.test(s)))].sort((a,b)=>Number(b)-Number(a));
    return `${pageHero(tx("teaching"),tx("teachingTitle"),tx("teachingLead"))}<section class="section"><div class="shell">${sectionTitle(tx("teaching"),tx("courses"))}${unique.length?`<div class="toolbar course-toolbar"><label class="search-input">${icon("search")}<input id="course-search" type="search" autocomplete="off" value="${e(courseSearch)}" placeholder="${lang==="pt"?"Buscar disciplinas":"Search courses"}" aria-label="${lang==="pt"?"Buscar disciplinas":"Search courses"}"/></label><label class="course-year-filter">${lang==="pt"?"Ano":"Year"} <select id="course-year" class="sort-select"><option value="all">${tx("all")}</option>${years.map(y=>`<option value="${y}" ${selectedCourseYear===y?"selected":""}>${y}</option>`).join("")}</select></label></div><div id="course-results">${renderCourseResults()}</div>`:empty("",tx("courses"),tx("coursesEmpty"))}</div></section>`;
  };
  const renderSoftware = () => `${pageHero(tx("software"),tx("softwareTitle"),tx("softwareLead"))}<section class="section"><div class="shell">${D.software.length?`<div class="cards-2">${D.software.map(s=>`<article class="project-card"><h3>${e(s.name)}</h3><p>${e(t(s.description))}</p>${link(s.url,tx("code"))}</article>`).join("")}</div>`:`<div class="note-box">${e(lang === "pt" ? "Ainda não disponibilizei repositórios de pesquisa nesta página. Os links serão incluídos quando os materiais estiverem prontos para divulgação." : "No research repositories are listed here yet. Links will be added when materials are ready for public release.")}</div>`}${safe(D.profile.social.github)?`<div style="height:22px"></div>${link(D.profile.social.github,"GitHub")}`:""}</div></section>`;
  const renderAbout = () => `${pageHero(tx("about"),tx("aboutTitle"),tx("aboutLead"))}<section class="section"><div class="shell split-section"><div class="prose"><span class="eyebrow">${tx("approach")}</span><h2>${e(t(D.profile.role))}</h2><p>${tx("aboutP1")}</p><p>${tx("aboutP2")}</p><div class="profile-links">${profileLinks()||`<a href="contact.html">${tx("contact")} ${icon("arrow")}</a>`}</div></div><div>${safe(D.profile.portrait)?portraitPanel("about"):`<div class="signal-panel" style="min-height:350px"><div class="signal-grid"></div><div class="panel-top"><span>${tx("visualHead")}</span><span class="panel-tag">WB</span></div><div style="position:absolute;inset:64px 20px 72px;display:grid;place-items:center;font-size:clamp(90px,14vw,150px);font-weight:800;letter-spacing:-.14em;color:#c4f6dc" aria-hidden="true">WB.</div><div class="panel-bottom"><div><strong>${e(D.profile.name)}</strong><span>${e(t(D.profile.location))}</span></div></div></div>`}</div></div></section><section class="section tight"><div class="shell">${sectionTitle(tx("about"),tx("academicPath"))}<div class="timeline">${D.experience.map(x=>`<div class="timeline-item"><span class="timeline-year">${e(t(x.year))}</span><h3>${e(t(x.title))}</h3><p>${e(t(x.institution))}</p></div>`).join("")}</div><div style="height:30px"></div><p class="small muted">${tx("aboutDisclaimer")}</p></div></section>${banner()}`;
  const emailHref = (subject="") => D.profile.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(D.profile.email) ? `mailto:${D.profile.email}${subject?`?subject=${encodeURIComponent(subject)}`:""}` : "";
  const renderContact = () => {
    const email=emailHref(), links=profileLinks();
    return `${pageHero(tx("contact"),tx("contactTitle"),tx("contactLead"))}<section class="section"><div class="shell"><div class="contact-grid"><article class="contact-card"><span class="contact-symbol">↗</span><h3>${tx("collab")}</h3><p>${tx("collabDesc")}</p>${email?`<a class="inline-link" href="${e(emailHref(lang==="pt"?"Proposta de colaboração científica":"Research collaboration proposal"))}">${tx("emailLabel")} ${icon("arrow")}</a>`:`<p class="small">${tx("emailMissing")}</p>`}</article><article class="contact-card"><span class="contact-symbol">∑</span><h3>${tx("studentContact")}</h3><p>${tx("studentContactDesc")}</p>${email?`<a class="inline-link" href="${e(emailHref(lang==="pt"?"Interesse em orientação":"Supervision inquiry"))}">${tx("emailLabel")} ${icon("arrow")}</a>`:`<p class="small">${tx("emailMissing")}</p>`}</article></div></div></section><section class="section tight"><div class="shell split-section"><div><div class="prose"><span class="eyebrow">${tx("emailLabel")}</span><h2>${email?e(D.profile.email):tx("profiles")}</h2><p>${email?tx("contactGuideDesc"):tx("emailMissing")}</p>${email?`<a class="btn primary" href="${e(email)}">${icon("mail")} ${tx("openContact")}</a>`:""}</div></div><div class="prose"><span class="eyebrow">${tx("profiles")}</span><div class="profile-links">${links||`<p class="small muted">${tx("profilesMissing")}</p>`}</div><div class="note-box"><strong>${tx("contactGuide")}</strong><br>${tx("contactGuideDesc")}</div></div></div></section>`;
  };
  const copyText = async value => {
    try { await navigator.clipboard.writeText(value); return true; }
    catch { const input=document.createElement("textarea");input.value=value;input.style.position="fixed";input.style.opacity="0";document.body.append(input);input.select();const ok=document.execCommand("copy");input.remove();return ok; }
  };
  const showToast = message => { const el=document.getElementById("toast");el.textContent=message;el.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove("show"),2500); };
  const toBibtex = p => p.bibtex || `@${p.type==="article"?"article":"misc"}{${(p.id||"paper").replace(/[^a-zA-Z0-9_-]/g,"")},\n  title = {${p.title||""}},\n  author = {${p.authors||""}},\n  year = {${p.year||""}},\n  journal = {${p.venue||""}}${p.doi?`,\n  doi = {${p.doi}}`:""}\n}`;
  const attach = () => {
    if(page==="reading"){
      // Reveal a different guide before the browser attempts to scroll to a hidden anchor.
      document.querySelector(".reading-layout")?.addEventListener("click",ev=>{
        const link=ev.target.closest('a[href^="#"]');
        if(!link)return;
        const id=link.getAttribute("href").slice(1);
        const panel=document.getElementById(id)?.closest(".reading-area");
        if(!panel||panel.id===selectedReadingGuide)return;
        ev.preventDefault();
        window.location.hash=id;
        syncReadingSelection(true);
      });
      document.getElementById("reading-guide-select")?.addEventListener("change",ev=>{
        const id=ev.target.value;
        if(window.location.hash!=="#"+id)window.location.hash=id;
        syncReadingSelection(true);
      });
      syncReadingSelection(!readingNavigationInitialized&&Boolean(window.location.hash));
      readingNavigationInitialized=true;
    }
    document.getElementById("project-filters")?.addEventListener("click",ev=>{
      const btn=ev.target.closest("[data-area]");if(!btn)return;selectedProjectArea=btn.dataset.area;
      document.querySelectorAll("[data-area]").forEach(b=>{b.classList.toggle("active",b.dataset.area===selectedProjectArea);b.setAttribute("aria-pressed",String(b.dataset.area===selectedProjectArea));});
      document.getElementById("project-results").innerHTML=D.projects.filter(p=>selectedProjectArea==="all"||p.area===selectedProjectArea).map(projectCard).join("");
    });
    document.getElementById("level-filters")?.addEventListener("click",ev=>{
      const btn=ev.target.closest("[data-level]");if(!btn)return;selectedTopicLevel=btn.dataset.level;
      document.querySelectorAll("[data-level]").forEach(b=>{b.classList.toggle("active",b.dataset.level===selectedTopicLevel);b.setAttribute("aria-pressed",String(b.dataset.level===selectedTopicLevel));});
      document.getElementById("topic-results").innerHTML=topicResults();
      const counter=document.getElementById("topic-count");if(counter)counter.textContent=`${D.topics.filter(x=>selectedTopicLevel==="all"||x.levels.includes(selectedTopicLevel)).length} ${lang==="pt"?"propostas":"proposals"}`;
    });
    document.getElementById("course-search")?.addEventListener("input",ev=>{courseSearch=ev.target.value;const out=document.getElementById("course-results");if(out)out.innerHTML=renderCourseResults();});
    document.getElementById("course-year")?.addEventListener("change",ev=>{selectedCourseYear=ev.target.value;const out=document.getElementById("course-results");if(out)out.innerHTML=renderCourseResults();});
    document.getElementById("publication-types")?.addEventListener("click",ev=>{
      const btn=ev.target.closest("[data-type]");if(!btn)return;selectedPublicationType=btn.dataset.type;
      document.querySelectorAll("[data-type]").forEach(b=>{b.classList.toggle("active",b.dataset.type===selectedPublicationType);b.setAttribute("aria-pressed",String(b.dataset.type===selectedPublicationType));});pubsResults();
    });
    document.getElementById("publication-search")?.addEventListener("input",ev=>{publicationSearch=ev.target.value;pubsResults();});
    document.getElementById("publication-year")?.addEventListener("change",ev=>{publicationYear=ev.target.value;pubsResults();});
    document.getElementById("pub-results")?.addEventListener("click",async ev=>{
      const btn=ev.target.closest("[data-cite]");if(!btn)return;const pub=D.publications.find(x=>x.id===btn.dataset.cite);
      if(pub && await copyText(citeText(pub)))showToast(tx("copyDone"));
    });
    document.getElementById("export-bibtex")?.addEventListener("click",()=>{
      const text=D.publications.map(toBibtex).join("\n\n")+"\n";
      const url=URL.createObjectURL(new Blob([text],{type:"text/plain;charset=utf-8"}));
      const a=document.createElement("a");a.href=url;a.download="willams-batista-publications.bib";document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),200);showToast(tx("exportDone"));
    });
    if(page==="publications")pubsResults();
  };
  const addStructuredData = () => {
    document.getElementById("person-jsonld")?.remove();
    document.getElementById("website-jsonld")?.remove();
    const publicLinks=Object.values(D.profile.social).filter(safe);
    const person={"@context":"https://schema.org","@type":"Person",name:D.profile.name,jobTitle:t(D.profile.role),worksFor:{"@type":"CollegeOrUniversity",name:"Universidade Federal de Pernambuco",alternateName:"UFPE"},description:t(D.profile.introduction),knowsAbout:D.research.map(x=>t(x.title)),sameAs:publicLinks};
    if(D.profile.citationName)person.alternateName=D.profile.citationName;
    const canonical=document.querySelector('link[rel="canonical"]')?.getAttribute("href");
    if(canonical)person.url=new URL("/",canonical).href;
    if(D.profile.email)person.email=D.profile.email;
    const script=document.createElement("script");script.id="person-jsonld";script.type="application/ld+json";script.textContent=JSON.stringify(person).replace(/</g,"\\u003c");document.head.append(script);
    if(page==="index" && canonical){
      const site={"@context":"https://schema.org","@type":"WebSite",url:new URL("/",canonical).href,name:D.profile.name};
      if(D.profile.citationName)site.alternateName=D.profile.citationName;
      const siteScript=document.createElement("script");siteScript.id="website-jsonld";siteScript.type="application/ld+json";
      siteScript.textContent=JSON.stringify(site).replace(/</g,"\\u003c");document.head.append(siteScript);
    }
  };
  const render = () => {
    renderHeader();renderFooter();
    const pages={index:renderHome,research:renderResearch,reading:renderReading,publications:renderPublications,supervision:renderSupervision,people:renderPeople,teaching:renderTeaching,software:renderSoftware,about:renderAbout,contact:renderContact};
    document.getElementById("main").innerHTML=(pages[page]||renderHome)();
    attach();addStructuredData();
  };
  // If an older link explicitly requested /index.html, clean the browser URL without
  // another request. The canonical tag already identifies / as the index URL.
  if(page === "index" && window.location.hostname === "willamsferreira.com" && window.location.pathname === "/index.html"){
    window.history.replaceState(window.history.state,"","/"+window.location.search+window.location.hash);
  }
  if(page==="reading")window.addEventListener("hashchange",()=>syncReadingSelection(true));
  render();
})();
