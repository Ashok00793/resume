(function () {
  "use strict";

  const root = document.documentElement;
  root.classList.remove("no-js");
  root.classList.add("enhanced");

  const data = typeof RESUME_DATA !== "undefined" ? RESUME_DATA : null;
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  const state = {
    publications: [],
    query: "",
    topic: "all",
    sort: "citations",
    lastFocused: null
  };

  const text = (value, fallback = "") => value === undefined || value === null || value === "" ? fallback : String(value);

  const numberValue = value => {
    const n = parseFloat(value);
    return Number.isFinite(n) ? n : 0;
  };

  const safeUrl = value => {
    const raw = text(value).trim();
    if (!raw) return "";
    try {
      const url = new URL(raw, window.location.href);
      return ["http:", "https:", "mailto:"].includes(url.protocol) ? url.href : "";
    } catch (_error) {
      return "";
    }
  };

  const create = (tag, options = {}, children = []) => {
    const node = document.createElement(tag);
    Object.entries(options).forEach(([key, value]) => {
      if (value === false || value === undefined || value === null) return;
      if (key === "className") node.className = value;
      else if (key === "text") node.textContent = value;
      else if (key === "dataset") Object.entries(value).forEach(([dataKey, dataValue]) => { node.dataset[dataKey] = dataValue; });
      else if (key in node) node[key] = value;
      else node.setAttribute(key, value);
    });
    children.filter(Boolean).forEach(child => node.append(child));
    return node;
  };

  const clear = node => {
    if (!node) return;
    while (node.firstChild) node.removeChild(node.firstChild);
  };

  const setText = (selector, value) => {
    const node = $(selector);
    if (node) node.textContent = text(value);
  };

  const showToast = message => {
    const toast = $("#toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    window.setTimeout(() => toast.classList.remove("show"), 2400);
  };

  const researchThemes = [
    {
      title: "Microbial cell-surface display",
      body: "Engineering outer-membrane display systems to present functional peptides and enzymes on microbial surfaces.",
      evidence: ["Cobalt- and nickel-binding peptide display", "Whole-cell biocatalysts", "Extracellular GABA production"]
    },
    {
      title: "Metal recovery to nanomaterials",
      body: "Using engineered microbes to selectively adsorb metal ions and convert recovered biomass into functional oxides.",
      evidence: ["Co3O4 and NiO nanoparticle synthesis", "Battery wastewater remediation", "Photocatalytic pollutant degradation"]
    },
    {
      title: "Metabolic pathway engineering",
      body: "Improving microbial production of amino acids and biopolymers by controlling pathway flux and enzyme colocalization.",
      evidence: ["Protein scaffold strategy", "L-serine fermentation", "P(3HP) biosynthesis from renewable carbon"]
    },
    {
      title: "Sustainable biomaterials",
      body: "Transforming agricultural and biological feedstocks into high-performance cellulose and composite materials.",
      evidence: ["Bacterial cellulose membranes", "Waste valorization", "Improved tensile and barrier performance"]
    }
  ];

  const capabilities = [
    ["Molecular biology", 92],
    ["Metabolic engineering", 90],
    ["Bio-nanomaterials", 88],
    ["Analytical characterization", 85],
    ["Bioprocessing", 82],
    ["Bioinformatics", 78]
  ];

  const impactClass = value => {
    const n = numberValue(value);
    if (n >= 7) return "high";
    if (n >= 4) return "medium";
    return "standard";
  };

  const chip = label => create("span", { className: "meta-chip", text: label });
  const impactBadge = value => create("span", { className: `impact-badge ${impactClass(value)}`, text: `IF ${text(value, "N/A")}` });
  const statusBadge = value => create("span", { className: `status-badge ${String(value).toLowerCase() === "finished" ? "finished" : "dev"}`, text: text(value) });

  const initHeader = () => {
    const header = $("[data-header]");
    const nav = $("#primary-nav");
    const toggle = $("#menu-toggle");
    const links = $$("#primary-nav a");

    const onScroll = () => {
      if (header) header.classList.toggle("is-scrolled", window.scrollY > 10);
      const sections = links.map(link => $(link.getAttribute("href"))).filter(Boolean);
      let current = "";
      sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 160) current = section.id;
      });
      links.forEach(link => link.classList.toggle("is-active", link.getAttribute("href") === `#${current}`));
    };

    toggle?.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      toggle.setAttribute("aria-label", open ? "Open navigation" : "Close navigation");
      nav?.classList.toggle("is-open", !open);
      document.body.classList.toggle("nav-locked", !open);
    });

    links.forEach(link => link.addEventListener("click", () => {
      toggle?.setAttribute("aria-expanded", "false");
      toggle?.setAttribute("aria-label", "Open navigation");
      nav?.classList.remove("is-open");
      document.body.classList.remove("nav-locked");
    }));

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  };

  const initReveal = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = $$(".reveal");
    if (reduced || !("IntersectionObserver" in window)) {
      nodes.forEach(node => node.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
    nodes.forEach(node => observer.observe(node));
  };

  const renderStats = () => {
    const stats = data?.personal?.stats || {};
    $$("[data-stat]").forEach(node => {
      const key = node.dataset.stat;
      node.textContent = text(stats[key], node.textContent);
    });
  };

  const renderThemes = () => {
    const target = $("#research-themes");
    clear(target);
    researchThemes.forEach((theme, index) => {
      const evidence = create("ul", { className: "theme-evidence" }, theme.evidence.map(item => create("li", { text: item })));
      const card = create("article", { className: "theme-card reveal" }, [
        create("span", { className: "theme-number", text: String(index + 1).padStart(2, "0") }),
        create("h3", { text: theme.title }),
        create("p", { text: theme.body }),
        evidence
      ]);
      target?.append(card);
    });
  };

  const publicationSummary = pub => {
    const abstract = text(pub.abstract);
    if (!abstract) return "Research article in " + text(pub.journal, "peer-reviewed publication") + ".";
    const first = abstract.split(/(?<=[.!?])\s+/)[0] || abstract;
    return first.length > 210 ? `${first.slice(0, 207)}...` : first;
  };

  const renderSelectedPublications = () => {
    const target = $("#selected-publications");
    clear(target);
    const pubs = [...state.publications]
      .sort((a, b) => numberValue(b.impactFactor) - numberValue(a.impactFactor) || numberValue(b.citations) - numberValue(a.citations))
      .slice(0, 3);

    pubs.forEach(pub => {
      const card = create("article", { className: "selected-card reveal" }, [
        create("div", { className: "publication-card-header" }, [
          create("span", { className: "meta-chip", text: text(pub.year) }),
          impactBadge(pub.impactFactor)
        ]),
        create("h3", { text: text(pub.title) }),
        create("p", { text: publicationSummary(pub) }),
        create("div", { className: "publication-meta" }, [
          chip(text(pub.journal, "Journal article")),
          chip(`${text(pub.citations, 0)} citations`)
        ]),
        create("button", { className: "text-button", type: "button", text: "View details", dataset: { pubId: pub.id } })
      ]);
      target?.append(card);
    });
  };

  const allTags = () => {
    const set = new Set();
    state.publications.forEach(pub => (pub.tags || []).forEach(tag => set.add(tag)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  };

  const initPublicationControls = () => {
    const filter = $("#pub-filter");
    const search = $("#pub-search");
    const sort = $("#pub-sort");
    const reset = $("#reset-publications");

    if (filter) {
      allTags().forEach(tag => filter.append(create("option", { value: tag, text: tag })));
    }

    search?.addEventListener("input", event => {
      state.query = event.target.value.trim().toLowerCase();
      renderPublications();
    });
    filter?.addEventListener("change", event => {
      state.topic = event.target.value;
      renderPublications();
    });
    sort?.addEventListener("change", event => {
      state.sort = event.target.value;
      renderPublications();
    });
    reset?.addEventListener("click", () => {
      state.query = "";
      state.topic = "all";
      state.sort = "citations";
      if (search) search.value = "";
      if (filter) filter.value = "all";
      if (sort) sort.value = "citations";
      renderPublications();
    });

    document.addEventListener("click", event => {
      const button = event.target.closest("[data-pub-id]");
      if (!button) return;
      openPublication(button.dataset.pubId);
    });
  };

  const filteredPublications = () => {
    const q = state.query;
    const topic = state.topic;
    const filtered = state.publications.filter(pub => {
      const tags = pub.tags || [];
      const topicOk = topic === "all" || tags.includes(topic);
      const haystack = [pub.title, pub.journal, pub.abstract, tags.join(" "), pub.year].map(text).join(" ").toLowerCase();
      return topicOk && (!q || haystack.includes(q));
    });

    filtered.sort((a, b) => {
      if (state.sort === "year") return numberValue(b.year) - numberValue(a.year);
      if (state.sort === "impact") return numberValue(b.impactFactor) - numberValue(a.impactFactor);
      return numberValue(b.citations) - numberValue(a.citations);
    });
    return filtered;
  };

  const renderPublications = () => {
    const target = $("#publications-container");
    const count = $("#results-count");
    clear(target);
    const list = filteredPublications();
    if (count) count.textContent = `${list.length} publication${list.length === 1 ? "" : "s"} shown`;

    if (!target) return;
    if (!list.length) {
      target.append(create("div", { className: "no-results", text: "No publications match the current filters." }));
      return;
    }

    list.forEach(pub => {
      const titleButton = create("button", { className: "publication-title-button", type: "button", dataset: { pubId: pub.id } }, [
        create("h3", { text: text(pub.title) })
      ]);
      const card = create("article", { className: "publication-card" }, [
        create("div", { className: "publication-card-header" }, [
          create("span", { className: "meta-chip", text: text(pub.journal, "Journal article") }),
          create("span", { className: "meta-chip", text: text(pub.year) })
        ]),
        titleButton,
        create("p", { text: publicationSummary(pub) }),
        create("div", { className: "publication-meta" }, [
          chip(`${text(pub.citations, 0)} citations`),
          impactBadge(pub.impactFactor),
          chip(pub.pdf_url ? "Article link" : "DOI only")
        ]),
        create("div", { className: "publication-tags" }, (pub.tags || []).map(tag => create("span", { className: "tag-pill", text: tag })))
      ]);
      target.append(card);
    });
  };

  const openPublication = id => {
    const pub = state.publications.find(item => item.id === id);
    const dialog = $("#publication-dialog");
    if (!pub || !dialog) return;

    state.lastFocused = document.activeElement;
    setText("#dialog-journal", text(pub.journal, "Journal article"));
    setText("#dialog-title", text(pub.title));
    setText("#dialog-abstract", text(pub.abstract, "No abstract available."));

    const meta = $("#dialog-meta");
    clear(meta);
    meta?.append(chip(`Year ${text(pub.year)}`), chip(`${text(pub.citations, 0)} citations`), impactBadge(pub.impactFactor));

    const doi = $("#dialog-doi");
    const article = $("#dialog-article");
    const doiUrl = safeUrl(pub.doi);
    const articleUrl = safeUrl(pub.pdf_url || pub.doi);
    if (doi) {
      doi.href = doiUrl || "#";
      doi.hidden = !doiUrl;
    }
    if (article) {
      article.href = articleUrl || "#";
      article.hidden = !articleUrl;
    }

    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
    $("#dialog-close")?.focus();
  };

  const initDialog = () => {
    const dialog = $("#publication-dialog");
    const close = () => {
      if (!dialog) return;
      if (typeof dialog.close === "function") dialog.close();
      else dialog.removeAttribute("open");
      state.lastFocused?.focus?.();
    };
    $("#dialog-close")?.addEventListener("click", close);
    dialog?.addEventListener("click", event => {
      const rect = dialog.getBoundingClientRect();
      const inDialog = rect.top <= event.clientY && event.clientY <= rect.bottom && rect.left <= event.clientX && event.clientX <= rect.right;
      if (!inDialog) close();
    });
  };

  const renderPatent = () => {
    const patent = data?.patent || {};
    setText("#patent-title", patent.title);
    setText("#patent-description", patent.description);
    setText("#patent-application", patent.applicationNo);
    setText("#patent-inventors", patent.inventors);
  };

  const renderCompactList = (selector, items, mapItem) => {
    const target = $(selector);
    clear(target);
    items.forEach(item => target?.append(mapItem(item)));
  };

  const renderOutputs = () => {
    renderCompactList("#under-review-list", data?.underReview || [], item => create("article", { className: "compact-item" }, [
      create("h3", { text: text(item.title) }),
      create("p", { text: text(item.authors) }),
      create("div", { className: "mini-meta" }, [chip(text(item.journal)), impactBadge(item.impactFactor), chip(text(item.status))])
    ]));

    renderCompactList("#chapters-list", data?.bookChapters || [], item => create("article", { className: "compact-item" }, [
      create("h3", { text: text(item.title) }),
      create("p", { text: text(item.authors) }),
      create("div", { className: "mini-meta" }, [chip(text(item.publisher)), chip(text(item.status))])
    ]));

    $$('[role="tab"][data-tab-target]').forEach(tab => {
      tab.addEventListener("click", () => {
        const group = tab.closest("[data-tab-group]");
        if (!group) return;
        $$('[role="tab"]', group).forEach(node => node.setAttribute("aria-selected", String(node === tab)));
        $$(".tab-panel", group).forEach(panel => {
          const active = panel.id === tab.dataset.tabTarget;
          panel.hidden = !active;
          panel.classList.toggle("active", active);
        });
      });
    });
  };

  const periodSort = period => {
    const raw = text(period);
    if (/present/i.test(raw)) return new Date().getFullYear() + 0.99;
    const matches = raw.match(/\b(20\d{2}|19\d{2})\b/g);
    return matches ? numberValue(matches[matches.length - 1]) : 0;
  };

  const renderTimeline = () => {
    const target = $("#timeline-container");
    clear(target);
    const entries = [];
    (data?.experience || []).forEach(item => entries.push({
      period: item.period,
      title: item.role,
      org: `${text(item.organization)}${item.location ? `, ${item.location}` : ""}`,
      body: item.details,
      sort: periodSort(item.period)
    }));
    (data?.education || []).forEach(item => entries.push({
      period: item.period,
      title: item.degree,
      org: `${text(item.institution)}${item.location ? `, ${item.location}` : ""}`,
      body: [item.grade, item.details, item.mentor ? `Mentor: ${item.mentor}` : ""].filter(Boolean).join(". "),
      sort: periodSort(item.period)
    }));
    entries.sort((a, b) => b.sort - a.sort);
    entries.forEach(item => target?.append(create("article", { className: "timeline-item reveal" }, [
      create("div", { className: "timeline-date", text: text(item.period) }),
      create("div", {}, [
        create("h3", { text: text(item.title) }),
        create("div", { className: "timeline-org", text: text(item.org) }),
        create("p", { text: text(item.body) })
      ])
    ])));
  };

  const renderSkills = () => {
    const bars = $("#capability-bars");
    clear(bars);
    capabilities.forEach(([label, value]) => {
      const fill = create("span", { className: "bar-fill" });
      fill.style.setProperty("--bar-width", `${value}%`);
      bars?.append(create("div", { className: "capability-row" }, [
        create("header", {}, [create("span", { text: label }), create("span", { text: `${value}%` })]),
        create("div", { className: "bar-track" }, [fill])
      ]));
    });

    const target = $("#skills-container");
    clear(target);
    const labels = {
      molecular: "Molecular and genetic engineering",
      material: "Materials and synthesis",
      analytical: "Analytical characterization",
      software: "Computational and software"
    };
    Object.entries(data?.skills || {}).forEach(([key, values]) => {
      target?.append(create("article", { className: "skill-card" }, [
        create("h3", { text: labels[key] || key }),
        create("ul", { className: "skill-list" }, values.map(item => create("li", { text: item })))
      ]));
    });
  };

  const renderAwards = () => {
    const target = $("#awards-container");
    clear(target);
    (data?.awards || []).forEach(item => target?.append(create("article", { className: "award-card reveal" }, [
      create("div", { className: "mini-meta" }, [chip(text(item.period))]),
      create("h3", { text: text(item.title) }),
      create("p", { className: "timeline-org", text: text(item.agency) }),
      create("p", { text: text(item.description) })
    ])));
  };

  const renderConferencesAndProjects = () => {
    const confTarget = $("#conference-list");
    clear(confTarget);
    const conferences = [...(data?.conferenceProceedings || [])].sort((a, b) => numberValue(b.year) - numberValue(a.year));
    setText("#conference-count", `${conferences.length} records`);
    conferences.forEach(item => confTarget?.append(create("article", { className: "conference-item" }, [
      create("div", { className: "mini-meta" }, [chip(text(item.year)), chip(text(item.date))]),
      create("h3", { text: text(item.title) }),
      create("p", { text: text(item.authors) }),
      create("p", { text: `${text(item.conference)}${item.page ? `, p. ${item.page}` : ""}` })
    ])));

    const projectTarget = $("#project-list");
    clear(projectTarget);
    (data?.githubProjects || []).forEach(item => projectTarget?.append(create("article", { className: "project-item" }, [
      create("div", { className: "mini-meta" }, [statusBadge(item.status)]),
      create("h3", { text: text(item.title) }),
      create("p", { text: text(item.description) })
    ])));
  };

  const copyMailFallback = () => {
    $$('a[href^="mailto:"]').forEach(link => {
      link.addEventListener("contextmenu", () => {
        const email = link.href.replace("mailto:", "");
        if (!navigator.clipboard || !email) return;
        navigator.clipboard.writeText(email).then(() => showToast("Email copied"), () => {});
      });
    });
  };

  const renderFallback = () => {
    ["#research-themes", "#selected-publications", "#publications-container", "#timeline-container", "#skills-container", "#awards-container", "#conference-list", "#project-list"].forEach(selector => {
      const node = $(selector);
      if (node) node.append(create("div", { className: "no-results", text: "Resume data could not be loaded. Core profile and contact details remain available." }));
    });
    setText("#results-count", "Publication data unavailable");
  };

  const init = () => {
    initHeader();
    initDialog();
    copyMailFallback();

    if (!data) {
      renderFallback();
      initReveal();
      return;
    }

    state.publications = Array.isArray(data.publications) ? [...data.publications] : [];
    renderStats();
    renderThemes();
    renderSelectedPublications();
    initPublicationControls();
    renderPublications();
    renderPatent();
    renderOutputs();
    renderTimeline();
    renderSkills();
    renderAwards();
    renderConferencesAndProjects();
    initReveal();
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
