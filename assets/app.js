(() => {
  "use strict";
  const D = window.PORTFOLIO;
  if (!D) { document.getElementById("main").textContent = "Content could not be loaded."; return; }
  const page = document.body.dataset.page || "index";
  const routes = ["research", "publications", "supervision", "people", "teaching", "software", "about", "contact"];
  const href = name => name === "index" ? "index.html" : `${name}.html`;
  const getPref = (key, fallback) => { try { return localStorage.getItem(key) || fallback; } catch { return fallback; } };
  const setPref = (key, value) => { try { localStorage.setItem(key, value); } catch { /* file:// privacy settings */ } };
  let lang = getPref("wb-lang", "pt") === "en" ? "en" : "pt";
  let theme = getPref("wb-theme", "light") === "dark" ? "dark" : "light";
  let selectedPublicationType = "all";
  let publicationSearch = "";
  let publicationYear = "all";
  let selectedTopicLevel = "all";
  let selectedProjectArea = "all";
  let toastTimer;

  const M = {
    pt: {
      index:"Início",research:"Pesquisa",publications:"Publicações",supervision:"Orientação",people:"Pessoas",
      teaching:"Ensino",software:"Código e dados",about:"Sobre",contact:"Contato",
      skip:"Pular para o conteúdo",openMenu:"Abrir menu",closeMenu:"Fechar menu",toggleTheme:"Alternar tema",toggleLanguage:"Change language to English",
      eyebrowHome:"Pesquisa · Estatística · Ciência aberta",heroFocus:"Métodos estatísticos para",heroEm:"dados complexos",heroEnd:"e problemas do mundo real.",
      seeResearch:"Explorar pesquisa",seePublications:"Ver publicações",locationNote:"Departamento de Estatística · UFPE",
      visualHead:"MAPA DE PESQUISA",visualStatus:"EM DESENVOLVIMENTO",visualTitle:"Da teoria à aplicação.",visualCaption:"Inferência · Modelagem · Computação",
      visualNote:"EIXO CENTRAL",visualNoteDetail:"Dependência espacial",visualIndex:"EST. / 01",
      focusAreas:"Áreas de interesse",researchTagline:"Questões metodológicas com aplicações concretas.",
      researchIntro:"Meu trabalho conecta teoria estatística, desenvolvimento computacional e análise de dados espaciais.",
      allResearch:"Todas as linhas",activeProjects:"Projetos e investigações",projectDesc:"Perguntas de pesquisa que orientam o trabalho em andamento.",
      seeAllProjects:"Ver todos os projetos",featuredProjects:"Em desenvolvimento",projectsPageLead:"Linhas de investigação e projetos metodológicos na interface entre estatística, matemática e dados observacionais.",
      papersHome:"Produção científica",papersHomeDesc:"Artigos, preprints, implementações e materiais associados em um único lugar.",
      papersPageLead:"Uma bibliografia pesquisável, com acesso a DOI, texto completo, código e dados quando disponíveis.",
      noPapersHome:"Bibliografia em preparação: todos os artigos serão incluídos após conferência no currículo Lattes e nas páginas dos periódicos.",
      noPapers:"A bibliografia completa será publicada após conferência dos títulos, autores, periódicos e DOI no currículo Lattes.",
      noMatches:"Nenhum resultado corresponde aos filtros selecionados.",searchPlaceholder:"Pesquisar por título, autor, palavra-chave...",
      all:"Todos",articles:"Artigos",preprints:"Preprints",conferences:"Congressos",others:"Outros",year:"Ano",records:"registros",record:"registro",exportBib:"Exportar BibTeX",
      readMore:"Saiba mais",cite:"Copiar referência",code:"Código",data:"Dados",pdf:"PDF",doi:"DOI",website:"Página",copyDone:"Referência copiada",exportDone:"Arquivo BibTeX gerado",
      supervisionTitle:"Ideias de pesquisa para quem quer ir além.",supervisionLead:"Temas potenciais de iniciação científica, mestrado e doutorado, com escopos ajustáveis à formação e aos interesses do estudante.",
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
      peopleTitle:"Pesquisa é um trabalho coletivo.",peopleLead:"Espaço dedicado a estudantes, egressos, coautores e pessoas que contribuem para os projetos.",
      peopleEmpty:"Os perfis ainda não foram cadastrados. A inclusão de estudantes e colaboradores depende de consentimento para divulgação.",
      peoplePolicyTitle:"Crédito e visibilidade",peoplePolicy:"O site prevê páginas e vínculos para que cada trabalho reconheça seus participantes, produções e contribuições. Dados pessoais só devem ser publicados com autorização.",
      teachingTitle:"Ensinar estatística é ensinar a investigar.",teachingLead:"Disciplinas, materiais didáticos e práticas que conectam fundamentos matemáticos a problemas reais e reprodutibilidade.",
      courses:"Disciplinas",coursesEmpty:"As disciplinas e os materiais ainda não foram cadastrados. Adicione ementas, períodos e links de apoio quando estiverem disponíveis.",
      principles:"Princípios para materiais de ensino",principle1:"Fundamento primeiro",principle1Desc:"Explicitar hipóteses, significado dos parâmetros e limites dos métodos.",
      principle2:"Código verificável",principle2Desc:"Ligar teoria, simulação e análise com exemplos reproduzíveis.",
      principle3:"Aplicação crítica",principle3Desc:"Interpretar resultados, reconhecer incerteza e discutir escolhas de modelagem.",
      softwareTitle:"Pesquisa que pode ser reproduzida.",softwareLead:"Implementações, scripts, dados e documentação associados a métodos e artigos científicos.",
      repositories:"Repositórios e pacotes",softwareEmpty:"Os repositórios ainda não foram cadastrados. Adicione projetos públicos, pacotes R e links para documentação no arquivo de conteúdo.",
      reproducibility:"Compromissos de reprodutibilidade",repro1:"Implementações versionadas",repro1Desc:"Código-fonte, ambiente e histórico de alterações ligados a cada resultado.",
      repro2:"Experimentos auditáveis",repro2Desc:"Sementes aleatórias, especificações e métricas documentadas para simulações.",
      repro3:"Materiais citáveis",repro3Desc:"DOI de artigos, referências de dados e licença de software quando aplicáveis.",
      aboutTitle:"Estatística, teoria e boas perguntas.",aboutLead:"Minha pesquisa parte de problemas metodológicos e procura conectar demonstrações matemáticas, validação numérica e aplicações em dados reais.",
      approach:"Como penso a pesquisa",aboutP1:"Sou Professor Assistente no Departamento de Estatística da UFPE. Atuo na interface entre inferência estatística, modelagem de dependência e sensoriamento remoto. Tenho interesse especial em modelos espaciais, imagens SAR, propriedades teóricas de métodos estatísticos e implementação em R.",
      aboutP2:"A prioridade é formular perguntas precisas, explicitar hipóteses, verificar resultados de forma independente e produzir trabalho que outras pessoas possam compreender e reproduzir.",
      academicPath:"Trajetória acadêmica",aboutDisclaimer:"A bibliografia e os demais registros de trajetória acadêmica serão completados a partir do currículo Lattes.",
      contactTitle:"Boas pesquisas começam com uma conversa.",contactLead:"Para colaboração científica, orientação, palestras ou outras propostas acadêmicas, utilize os canais institucionais e perfis abaixo.",
      collab:"Colaboração científica",collabDesc:"Projetos conjuntos, discussões metodológicas, intercâmbio e propostas de pesquisa.",
      studentContact:"Interesse em orientação",studentContactDesc:"Envie sua formação, tema de interesse e uma descrição objetiva da proposta.",
      emailLabel:"E-mail acadêmico",emailMissing:"O endereço de e-mail ainda não foi configurado no protótipo.",
      profiles:"Perfis acadêmicos",profilesMissing:"Adicione seus links públicos de ORCID, Lattes, Google Scholar e GitHub no arquivo de conteúdo.",
      contactGuide:"Para uma mensagem produtiva",contactGuideDesc:"Inclua o assunto, uma breve apresentação, o objetivo do contato e, se necessário, links para currículo ou trabalho anterior.",
      openContact:"Abrir contato",footerText:"Pesquisa em estatística, inferência e dados espaciais.",navigate:"Navegação",follow:"Perfis",updated:"Última atualização do site",made:"Departamento de Estatística · UFPE",
      opportunityTitle:"Um espaço para novas perguntas.",opportunityDesc:"Confira temas para orientação e projetos que podem se transformar em colaboração científica.",opportunityBtn:"Explorar temas de pesquisa",
      news:"Atualizações",newsDesc:"Marcos recentes da pesquisa e da vida acadêmica.",nothingNews:"Novidades serão publicadas aqui.",backHome:"Voltar ao início"
    },
    en: {
      index:"Home",research:"Research",publications:"Publications",supervision:"Supervision",people:"People",teaching:"Teaching",software:"Code & data",about:"About",contact:"Contact",
      skip:"Skip to content",openMenu:"Open menu",closeMenu:"Close menu",toggleTheme:"Toggle color theme",toggleLanguage:"Mudar idioma para português",
      eyebrowHome:"Research · Statistics · Open science",heroFocus:"Statistical methods for",heroEm:"complex data",heroEnd:"and real-world problems.",
      seeResearch:"Explore research",seePublications:"View publications",locationNote:"Department of Statistics · UFPE",
      visualHead:"RESEARCH MAP",visualStatus:"IN PROGRESS",visualTitle:"From theory to application.",visualCaption:"Inference · Modeling · Computing",visualNote:"CORE TOPIC",visualNoteDetail:"Spatial dependence",visualIndex:"STAT. / 01",
      focusAreas:"Areas of interest",researchTagline:"Methodological questions with concrete applications.",
      researchIntro:"My work connects statistical theory, computational development, and spatial data analysis.",
      allResearch:"All research areas",activeProjects:"Projects and investigations",projectDesc:"Research questions that guide work in progress.",
      seeAllProjects:"See all projects",featuredProjects:"Work in progress",projectsPageLead:"Research directions and methodological projects at the intersection of statistics, mathematics, and observational data.",
      papersHome:"Scientific output",papersHomeDesc:"Papers, preprints, implementations, and related materials in one place.",
      papersPageLead:"A searchable bibliography, with access to DOI, full text, code, and data when available.",
      noPapersHome:"Bibliography in preparation: all papers will be added after verification against the Lattes CV and journal records.",
      noPapers:"The complete bibliography will be published after checking titles, authors, journals, and DOIs against the Lattes CV.",
      noMatches:"No results match the selected filters.",searchPlaceholder:"Search by title, author, keyword...",
      all:"All",articles:"Articles",preprints:"Preprints",conferences:"Conferences",others:"Other",year:"Year",records:"records",record:"record",exportBib:"Export BibTeX",
      readMore:"Learn more",cite:"Copy citation",code:"Code",data:"Data",pdf:"PDF",doi:"DOI",website:"Website",copyDone:"Citation copied",exportDone:"BibTeX file created",
      supervisionTitle:"Research ideas for curious minds.",supervisionLead:"Potential undergraduate, master's, and PhD topics, with scope tailored to students' backgrounds and interests.",
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
      peopleTitle:"Research is a collective endeavor.",peopleLead:"A space for students, alumni, coauthors, and people contributing to the projects.",
      peopleEmpty:"Profiles have not yet been added. Students and collaborators should only be listed with consent to public disclosure.",
      peoplePolicyTitle:"Credit and visibility",peoplePolicy:"The website can link each project to its participants, outputs, and contributions. Personal data should only be published with permission.",
      teachingTitle:"Teaching statistics is teaching inquiry.",teachingLead:"Courses, learning materials, and practices connecting mathematical foundations, real-world problems, and reproducibility.",
      courses:"Courses",coursesEmpty:"Courses and materials have not yet been added. Add syllabi, semesters, and resource links when available.",
      principles:"Principles for teaching materials",principle1:"Foundations first",principle1Desc:"Make assumptions, parameter meanings, and the limitations of methods explicit.",
      principle2:"Verifiable code",principle2Desc:"Connect theory, simulation, and analysis with reproducible examples.",
      principle3:"Critical application",principle3Desc:"Interpret results, recognize uncertainty, and discuss modeling choices.",
      softwareTitle:"Research that can be reproduced.",softwareLead:"Implementations, scripts, datasets, and documentation associated with scientific methods and papers.",
      repositories:"Repositories and packages",softwareEmpty:"Repositories have not yet been added. Add public projects, R packages, and documentation links to the content file.",
      reproducibility:"Reproducibility commitments",repro1:"Versioned implementations",repro1Desc:"Source code, environments, and a change history linked to each result.",
      repro2:"Auditable experiments",repro2Desc:"Random seeds, specifications, and metrics documented for simulations.",
      repro3:"Citable materials",repro3Desc:"Paper DOIs, data references, and software licenses when applicable.",
      aboutTitle:"Statistics, theory, and good questions.",aboutLead:"My research starts with methodological problems and seeks to connect mathematical proofs, numerical validation, and real-data applications.",
      approach:"How I approach research",aboutP1:"I am an Assistant Professor in the Department of Statistics at UFPE. I work at the intersection of statistical inference, dependence modeling, and remote sensing. I am especially interested in spatial models, SAR imagery, theoretical properties of statistical methods, and R implementations.",
      aboutP2:"The priority is to ask precise questions, make assumptions explicit, independently verify results, and produce work that others can understand and reproduce.",
      academicPath:"Academic path",aboutDisclaimer:"The bibliography and other academic records will be completed from the Lattes CV.",
      contactTitle:"Good research starts with a conversation.",contactLead:"For scientific collaboration, supervision, talks, and other academic proposals, use the institutional channels and profiles below.",
      collab:"Research collaboration",collabDesc:"Joint projects, methodological discussions, exchanges, and research proposals.",
      studentContact:"Supervision inquiry",studentContactDesc:"Include your academic background, research interests, and a concise description of your proposal.",
      emailLabel:"Academic email",emailMissing:"An email address has not been configured in this prototype.",
      profiles:"Academic profiles",profilesMissing:"Add your public ORCID, Lattes, Google Scholar, and GitHub links in the content file.",
      contactGuide:"For a productive message",contactGuideDesc:"Include a subject line, a brief introduction, the purpose of your message, and links to your CV or prior work when relevant.",
      openContact:"Open contact",footerText:"Research in statistics, inference, and spatial data.",navigate:"Navigation",follow:"Profiles",updated:"Website last updated",made:"Department of Statistics · UFPE",
      opportunityTitle:"A space for new questions.",opportunityDesc:"Explore supervision topics and projects that could grow into scientific collaborations.",opportunityBtn:"Explore research topics",
      news:"Updates",newsDesc:"Recent milestones in research and academic life.",nothingNews:"Updates will appear here.",backHome:"Back to home"
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
  const pageHero = (eyebrow, title, lead) => `<section class="page-hero"><div class="shell"><div class="page-head reveal"><div class="breadcrumb"><a href="index.html">${tx("index")}</a><span class="sep">/</span><span>${e(eyebrow)}</span></div><span class="eyebrow">${e(eyebrow)}</span><h1>${e(title)}</h1><p class="lead">${e(lead)}</p></div></div></section>`;
  const empty = (symbol, title, message, action="") => `<div class="empty-state"><span class="empty-icon" aria-hidden="true">${symbol}</span><h3>${e(title)}</h3><p>${e(message)}</p>${action}</div>`;
  const profileLinks = () => {
    const names = {orcid:"ORCID",scholar:"Google Scholar",github:"GitHub",lattes:"Currículo Lattes",linkedin:"LinkedIn"};
    const publicProfiles = Object.entries(D.profile.social).filter(([,u])=>safe(u)).map(([k,u])=>link(u,names[k],"",true));
    if (safe(D.profile.cv)) publicProfiles.unshift(link(D.profile.cv,lang === "pt" ? "Currículo em PDF" : "CV (PDF)","",true));
    return publicProfiles.join("");
  };
  const projectCard = (p) => {
    const url = safe(p.url), el = url ? "a" : "article";
    const linkProps = url ? ` href="${url}" target="_blank" rel="noopener noreferrer"` : "";
    return `<${el} class="project-card"${linkProps}><div class="project-head"><span class="status">${tx("featuredProjects")}</span><span class="small muted">${e(p.year||"")}</span></div><div class="card-content"><h3>${e(t(p.title))}</h3><p>${e(t(p.description))}</p></div><div class="project-meta"><div class="card-footer">${(p.tags||[]).map(s=>tag(s)).join("")}</div>${url?`<span class="project-arrow">${icon("up")}</span>`:""}</div></${el}>`;
  };
  const researchCard = (r) => `<article class="research-card"><div class="card-topline"><span class="card-number">${e(r.number)}</span><span class="card-symbol" aria-hidden="true">${e(r.symbol)}</span></div><div class="card-content"><h3>${e(t(r.title))}</h3><p>${e(t(r.summary))}</p></div><div class="card-footer">${(r.keywords||[]).map(s=>tag(s)).join("")}</div></article>`;
  const banner = () => `<section class="section tight"><div class="shell"><div class="feature-banner"><div><span class="eyebrow" style="color:#b2f1d5">${tx("topics")}</span><h2 style="margin-top:19px">${tx("opportunityTitle")}</h2><p>${tx("opportunityDesc")}</p><a class="btn" href="supervision.html">${tx("opportunityBtn")} ${icon("arrow")}</a></div><div class="visual" aria-hidden="true"><div class="feature-orbit"><strong>∑</strong><span class="orbit-node one">R</span><span class="orbit-node two">∿</span><span class="orbit-node three">π</span></div></div></div></div></section>`;
  const researchVisual = () => `<div class="signal-panel" role="img" aria-label="${e(tx("visualTitle"))}"><div class="signal-grid"></div><div class="panel-top"><span>${tx("visualHead")}</span><span class="panel-tag">● ${tx("visualStatus")}</span></div><svg class="signal-svg" viewBox="0 0 530 390" fill="none" aria-hidden="true" preserveAspectRatio="xMidYMid meet"><g stroke="#9ed9c9" stroke-width="1.25" opacity=".42"><path d="M68 205C132 95 242 119 293 200S431 282 475 147"/><path d="M68 205c64-65 100-10 165 0 73 11 160-98 242-58" stroke-dasharray="4 8"/><path d="M68 205C160 334 250 315 293 200c39-105 122-105 182-53" stroke-dasharray="2 8"/><path d="M147 100 293 200l96-77M147 100 165 280l128-80 110 82"/></g><g stroke="#c8f8df" stroke-width="1.4" opacity=".65"><circle cx="293" cy="200" r="93"/><circle cx="293" cy="200" r="138" stroke-dasharray="3 10"/><circle cx="293" cy="200" r="49"/></g><g fill="#b7f6d5"><circle cx="293" cy="200" r="11"/><circle cx="147" cy="100" r="6"/><circle cx="389" cy="123" r="5"/><circle cx="165" cy="280" r="6"/><circle cx="403" cy="282" r="6"/><circle cx="68" cy="205" r="4"/><circle cx="475" cy="147" r="4"/></g><g fill="#ecfff5" font-size="11" font-family="Inter,Arial,sans-serif" font-weight="650"><text x="263" y="161">INFERENCE</text><text x="87" y="85">SAR</text><text x="399" y="113">R</text><text x="95" y="306">MODELS</text><text x="409" y="309">DATA</text></g></svg><div class="floating-note"><span>${tx("visualNote")}</span>${tx("visualNoteDetail")}</div><div class="panel-bottom"><div><strong>${tx("visualTitle")}</strong><span>${tx("visualCaption")}</span></div><span class="panel-index">${tx("visualIndex")}</span></div></div>`;

  const portraitPanel = (context="home") => {
    const photo=safe(D.profile.portrait);
    if (!photo) return researchVisual();
    return `<div class="portrait-panel ${context === "about" ? "portrait-about-panel" : ""}"><img class="portrait-image" src="${photo}" alt="${e(lang === "pt" ? "Retrato de Willams Batista" : "Portrait of Willams Batista")}" loading="${context === "home" ? "eager" : "lazy"}" decoding="async" /><div class="portrait-grain" aria-hidden="true"></div><div class="portrait-top"><span>${e(t(D.profile.affiliation))}</span><span class="portrait-monogram" aria-hidden="true">WB.</span></div><div class="portrait-bottom"><span class="portrait-label">${e(t(D.profile.role))}</span><strong>${e(D.profile.name)}</strong><span>${e(t(D.profile.location))}</span></div></div>`;
  };
  const renderHeader = () => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    document.documentElement.dataset.theme = theme;
    document.title = `${tx(page)} | ${D.profile.name}`;
    document.querySelector(".skip-link").textContent = tx("skip");
    const navHtml = routes.map(r=>`<a href="${href(r)}" ${r===page?'class="active" aria-current="page"':''}>${tx(r)}</a>`).join("");
    document.getElementById("site-header").innerHTML = `<header class="site-header"><div class="shell header-inner"><a class="brand" href="index.html" aria-label="${e(D.profile.name)} — ${tx("index")}"><span class="brand-mark" aria-hidden="true">W.</span><span>${e(D.profile.name)}</span></a><nav class="nav" id="main-nav" aria-label="${tx("navigate")}">${navHtml}</nav><div class="header-actions"><button class="icon-btn lang-btn" id="language-toggle" type="button" title="${tx("toggleLanguage")}" aria-label="${tx("toggleLanguage")}">${lang === "pt" ? "EN" : "PT"}</button><button class="icon-btn" id="theme-toggle" type="button" title="${tx("toggleTheme")}" aria-label="${tx("toggleTheme")}">${icon(theme === "dark"?"sun":"moon")}</button><button class="icon-btn menu-btn" id="menu-toggle" type="button" aria-expanded="false" aria-controls="main-nav" aria-label="${tx("openMenu")}">${icon("menu")}</button></div></div></header>`;
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
    document.getElementById("site-footer").innerHTML=`<footer class="footer"><div class="shell"><div class="footer-main"><div class="footer-intro"><a class="brand" href="index.html"><span class="brand-mark" aria-hidden="true">W.</span><span>${e(D.profile.name)}</span></a><p>${tx("footerText")}</p><span class="tag dot-tag">${e(t(D.profile.location))}</span></div><div class="footer-col"><h3>${tx("navigate")}</h3>${footerLinks.map(r=>`<a href="${href(r)}">${tx(r)}</a>`).join("")}</div><div class="footer-col"><h3>${tx("follow")}</h3><a href="about.html">${tx("about")}</a><a href="contact.html">${tx("contact")}</a>${Object.entries(D.profile.social).filter(([,u])=>safe(u)).map(([k,u])=>`<a href="${safe(u)}" target="_blank" rel="noopener noreferrer">${e(({orcid:"ORCID",scholar:"Google Scholar",github:"GitHub",lattes:"Lattes",linkedin:"LinkedIn"})[k]||k)}</a>`).join("")}</div></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} ${e(D.profile.name)}. ${tx("made")}.</span><a href="#main">↑ ${tx("backHome").replace(tx("index"),tx("index"))}</a></div></div></footer>`;
  };
  const renderHome = () => {
    const featured=(D.projects||[]).slice(0,3), sortedPapers=[...(D.publications||[])].sort((a,b)=>Number(b.year||0)-Number(a.year||0)), recent=sortedPapers.filter(p=>p.featured).slice(0,3);
    const papers=(recent.length?recent:sortedPapers.slice(0,3));
    return `<section class="hero"><div class="shell hero-layout"><div class="hero-copy reveal"><span class="eyebrow">${tx("eyebrowHome")}</span><h1 class="hero-title">${tx("heroFocus")} <em>${tx("heroEm")}</em> ${tx("heroEnd")}</h1><p class="lead">${e(t(D.profile.introduction))}</p><div class="hero-cta"><a href="research.html" class="btn primary">${tx("seeResearch")} ${icon("arrow")}</a><a href="publications.html" class="btn outline">${tx("seePublications")} ${icon("up")}</a></div><div class="hero-detail"><span>${e(t(D.profile.role))}</span><span class="dot"></span><span>${e(t(D.profile.location))}</span></div></div>${portraitPanel()}</div></section>
    <div class="ticker"><div class="shell ticker-row"><span class="ticker-title">${tx("focusAreas")}</span><div class="ticker-tags">${[{pt:"Estatística espacial",en:"Spatial statistics"},{pt:"Inferência",en:"Inference"},{pt:"Sensoriamento remoto",en:"Remote sensing"},"R / Monte Carlo"].map(s=>tag(s,"dot-tag")).join("")}</div></div></div>
    <section class="section"><div class="shell">${sectionTitle(tx("research"),tx("researchTagline"),tx("researchIntro"),`<a class="inline-link" href="research.html">${tx("allResearch")} ${icon("arrow")}</a>`)}<div class="cards-4">${D.research.map(researchCard).join("")}</div></div></section>
    <section class="section tight"><div class="shell">${sectionTitle(tx("activeProjects"),tx("featuredProjects"),tx("projectDesc"),`<a class="inline-link" href="research.html">${tx("seeAllProjects")} ${icon("arrow")}</a>`)}<div class="cards-3">${featured.map(projectCard).join("")}</div></div></section>
    <section class="section"><div class="shell">${sectionTitle(tx("publications"),tx("papersHome"),tx("papersHomeDesc"),`<a class="inline-link" href="publications.html">${tx("seePublications")} ${icon("arrow")}</a>`)}${papers.length?`<div class="publication-list">${papers.map(pubCard).join("")}</div>`:empty("↗",tx("papersHome"),tx("noPapersHome"),`<a class="btn outline" href="publications.html">${tx("seePublications")} ${icon("arrow")}</a>`)}</div></section>
    ${D.news.length?`<section class="section tight"><div class="shell">${sectionTitle(tx("news"),tx("news"),tx("newsDesc"))}<div class="cards-3">${D.news.slice(0,3).map(n=>`<article class="project-card"><span class="small muted">${e(n.date)}</span><h3>${e(t(n.title))}</h3><p>${e(t(n.description))}</p>${link(n.url,tx("readMore"))}</article>`).join("")}</div></div></section>`:""}${banner()}`;
  };
  const renderResearch = () => `${pageHero(tx("research"),tx("researchTagline"),tx("projectsPageLead"))}<section class="section"><div class="shell">${sectionTitle(tx("focusAreas"),tx("allResearch"),tx("researchIntro"))}<div class="cards-2">${D.research.map(researchCard).join("")}</div></div></section><section class="section tight"><div class="shell">${sectionTitle(tx("activeProjects"),tx("featuredProjects"),tx("projectDesc"))}<div class="toolbar"><div class="filters" id="project-filters">${[{id:"all",label:tx("all")},...D.research.map(x=>({id:x.id,label:t(x.title)}))].map(x=>`<button class="filter-pill ${selectedProjectArea===x.id?"active":""}" type="button" data-area="${e(x.id)}" aria-pressed="${selectedProjectArea===x.id}">${e(x.label)}</button>`).join("")}</div></div><div id="project-results" class="cards-2">${D.projects.filter(x=>selectedProjectArea==="all"||x.area===selectedProjectArea).map(projectCard).join("")}</div></div></section>${banner()}`;
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
  const topicCard = x => `<article class="topic-card"><div class="level-tags">${x.levels.map(y=>tag(tx(y),"tinted")).join("")}</div><div class="card-content"><h3>${e(t(x.title))}</h3><p>${e(t(x.description))}</p></div><div class="requirements"><b>${tx("requirements")}</b><p>${e(t(x.requirements))}</p></div></article>`;
  const renderSupervision = () => `${pageHero(tx("supervision"),tx("supervisionTitle"),tx("supervisionLead"))}<section class="section"><div class="shell"><div class="note-box"><strong>${tx("supervision")}:</strong> ${tx("advisory")}</div><div style="height:45px"></div>${sectionTitle(tx("topics"),tx("topics"),tx("topicsDesc"))}<div class="toolbar"><div class="filters" id="level-filters">${["all","undergraduate","masters","phd"].map(level=>`<button class="filter-pill ${selectedTopicLevel===level?"active":""}" type="button" data-level="${level}" aria-pressed="${selectedTopicLevel===level}">${tx(level)}</button>`).join("")}</div></div><div id="topic-results" class="cards-2">${D.topics.filter(x=>selectedTopicLevel==="all"||x.levels.includes(selectedTopicLevel)).map(topicCard).join("")}</div></div></section><section class="section tight"><div class="shell">${sectionTitle(tx("howItWorks"),tx("howTitle"))}<div class="step-grid">${[1,2,3].map(n=>`<article class="step"><span class="step-number">0${n} / 03</span><h3>${tx("step"+n)}</h3><p>${tx("step"+n+"Desc")}</p></article>`).join("")}</div><div style="height:29px"></div><a class="btn primary" href="contact.html">${tx("contact")} ${icon("arrow")}</a></div></section><section class="section tight"><div class="shell">${sectionTitle("FAQ",tx("faqTitle"))}<div class="faq-list">${[1,2,3].map(n=>`<details class="faq"><summary>${tx("faq"+n)}</summary><p>${tx("faq"+n+"a")}</p></details>`).join("")}</div></div></section>`;
  const renderPeople = () => `${pageHero(tx("people"),tx("peopleTitle"),tx("peopleLead"))}<section class="section"><div class="shell">${D.students.length?`<div class="cards-3">${D.students.map(x=>`<article class="project-card"><span class="tag tinted">${e(x.level||"")}</span><h3>${e(x.name)}</h3><p>${e(t(x.project||""))}</p>${link(x.url,tx("website"))}</article>`).join("")}</div>`:empty("◎",tx("people"),tx("peopleEmpty"))}</div></section><section class="section tight"><div class="shell"><div class="split-section"><div>${sectionTitle(tx("peoplePolicyTitle"),tx("peoplePolicyTitle"))}<p class="lead">${tx("peoplePolicy")}</p></div><div class="principle-list"><div class="principle"><span class="num">01</span><div><h3>${tx("research")}</h3><p>${tx("projectDesc")}</p></div></div><div class="principle"><span class="num">02</span><div><h3>${tx("publications")}</h3><p>${tx("papersHomeDesc")}</p></div></div><div class="principle"><span class="num">03</span><div><h3>${tx("supervision")}</h3><p>${tx("topicsDesc")}</p></div></div></div></div></div></section>${banner()}`;
  const renderTeaching = () => `${pageHero(tx("teaching"),tx("teachingTitle"),tx("teachingLead"))}<section class="section"><div class="shell">${sectionTitle(tx("teaching"),tx("courses"))}${D.courses.length?`<div class="cards-2">${D.courses.map(c=>`<article class="project-card"><span class="tag tinted">${e(c.term||"")}</span><h3>${e(t(c.title))}</h3><p>${e(t(c.description||""))}</p><p class="small">${e(c.institution||"")}</p>${link(c.materials,tx("website"))}</article>`).join("")}</div>`:empty("⌘",tx("courses"),tx("coursesEmpty"))}</div></section><section class="section tight"><div class="shell">${sectionTitle(tx("teaching"),tx("principles"))}<div class="cards-3">${[1,2,3].map(n=>`<article class="topic-card"><span class="card-number">0${n}</span><h3>${tx("principle"+n)}</h3><p>${tx("principle"+n+"Desc")}</p></article>`).join("")}</div></div></section>`;
  const renderSoftware = () => `${pageHero(tx("software"),tx("softwareTitle"),tx("softwareLead"))}<section class="section"><div class="shell">${sectionTitle(tx("code"),tx("repositories"))}${D.software.length?`<div class="cards-2">${D.software.map(s=>`<article class="project-card"><span class="tag tinted">${e(s.language||"R")}</span><h3>${e(s.name)}</h3><p>${e(t(s.description))}</p><div class="card-footer">${(s.tags||[]).map(tagText=>tag(tagText)).join("")}</div>${link(s.url,tx("code"))}</article>`).join("")}</div>`:empty("{R}",tx("repositories"),tx("softwareEmpty"))}${safe(D.profile.social.github)?`<div style="height:22px"></div>${link(D.profile.social.github,"GitHub")}`:""}</div></section><section class="section tight"><div class="shell">${sectionTitle(tx("reproducibility"),tx("reproducibility"))}<div class="cards-3">${[1,2,3].map(n=>`<article class="topic-card"><span class="card-number">0${n}</span><h3>${tx("repro"+n)}</h3><p>${tx("repro"+n+"Desc")}</p></article>`).join("")}</div></div></section>`;
  const renderAbout = () => `${pageHero(tx("about"),tx("aboutTitle"),tx("aboutLead"))}<section class="section"><div class="shell split-section"><div class="prose"><span class="eyebrow">${tx("approach")}</span><h2>${e(t(D.profile.role))}</h2><p>${tx("aboutP1")}</p><p>${tx("aboutP2")}</p><div class="profile-links">${profileLinks()||`<a href="contact.html">${tx("contact")} ${icon("arrow")}</a>`}</div></div><div>${safe(D.profile.portrait)?portraitPanel("about"):`<div class="signal-panel" style="min-height:350px"><div class="signal-grid"></div><div class="panel-top"><span>${tx("visualHead")}</span><span class="panel-tag">WB</span></div><div style="position:absolute;inset:64px 20px 72px;display:grid;place-items:center;font-size:clamp(90px,14vw,150px);font-weight:800;letter-spacing:-.14em;color:#c4f6dc" aria-hidden="true">WB.</div><div class="panel-bottom"><div><strong>${e(D.profile.name)}</strong><span>${e(t(D.profile.location))}</span></div></div></div>`}</div></div></section><section class="section tight"><div class="shell">${sectionTitle(tx("about"),tx("academicPath"))}<div class="timeline">${D.experience.map(x=>`<div class="timeline-item"><span class="timeline-year">${e(t(x.year))}</span><h3>${e(t(x.title))}</h3><p>${e(x.institution)}</p></div>`).join("")}</div><div style="height:30px"></div><p class="small muted">${tx("aboutDisclaimer")}</p></div></section>${banner()}`;
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
    document.getElementById("project-filters")?.addEventListener("click",ev=>{
      const btn=ev.target.closest("[data-area]");if(!btn)return;selectedProjectArea=btn.dataset.area;
      document.querySelectorAll("[data-area]").forEach(b=>{b.classList.toggle("active",b.dataset.area===selectedProjectArea);b.setAttribute("aria-pressed",String(b.dataset.area===selectedProjectArea));});
      document.getElementById("project-results").innerHTML=D.projects.filter(p=>selectedProjectArea==="all"||p.area===selectedProjectArea).map(projectCard).join("");
    });
    document.getElementById("level-filters")?.addEventListener("click",ev=>{
      const btn=ev.target.closest("[data-level]");if(!btn)return;selectedTopicLevel=btn.dataset.level;
      document.querySelectorAll("[data-level]").forEach(b=>{b.classList.toggle("active",b.dataset.level===selectedTopicLevel);b.setAttribute("aria-pressed",String(b.dataset.level===selectedTopicLevel));});
      document.getElementById("topic-results").innerHTML=D.topics.filter(x=>selectedTopicLevel==="all"||x.levels.includes(selectedTopicLevel)).map(topicCard).join("");
    });
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
    const publicLinks=Object.values(D.profile.social).filter(safe);
    const person={"@context":"https://schema.org","@type":"Person",name:D.profile.name,jobTitle:t(D.profile.role),worksFor:{"@type":"CollegeOrUniversity",name:"Universidade Federal de Pernambuco",alternateName:"UFPE"},description:t(D.profile.introduction),knowsAbout:D.research.map(x=>t(x.title)),sameAs:publicLinks};
    if(D.profile.email)person.email=D.profile.email;
    const script=document.createElement("script");script.id="person-jsonld";script.type="application/ld+json";script.textContent=JSON.stringify(person).replace(/</g,"\\u003c");document.head.append(script);
  };
  const render = () => {
    renderHeader();renderFooter();
    const pages={index:renderHome,research:renderResearch,publications:renderPublications,supervision:renderSupervision,people:renderPeople,teaching:renderTeaching,software:renderSoftware,about:renderAbout,contact:renderContact};
    document.getElementById("main").innerHTML=(pages[page]||renderHome)();
    attach();addStructuredData();
  };
  render();
})();
