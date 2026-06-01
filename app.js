document.addEventListener("DOMContentLoaded", () => {
  // 1. Initial Data check
  if (typeof RESUME_DATA === "undefined") {
    console.error("data.js not loaded!");
    return;
  }

  // State Variables
  let activeTagFilter = "all";
  let activeSearchQuery = "";
  let activeSortField = "citations";
  let publicationsList = [...RESUME_DATA.publications];

  // DOM Elements
  const themeToggle = document.getElementById("theme-toggle");
  const bodyElement = document.body;
  const searchInput = document.getElementById("pub-search");
  const sortSelect = document.getElementById("pub-sort");
  const filterTagsContainer = document.getElementById("filter-tags");
  const publicationsContainer = document.getElementById("publications-container");
  const resultsCountText = document.getElementById("results-count");
  const chartContainer = document.getElementById("chart-container");
  
  // Abstract Modal Elements
  const abstractModal = document.getElementById("abstract-modal");
  const closeModalBtn = document.getElementById("close-modal");
  const modalJournal = document.getElementById("modal-pub-journal");
  const modalTitle = document.getElementById("modal-pub-title");
  const modalYear = document.getElementById("modal-pub-year");
  const modalCitations = document.getElementById("modal-pub-citations");
  const modalIF = document.getElementById("modal-pub-if");
  const modalAbstract = document.getElementById("modal-pub-abstract");
  const modalDoi = document.getElementById("modal-pub-doi");
  const modalPdf = document.getElementById("modal-pub-pdf");
  
  // Toast Alert
  const toast = document.getElementById("toast");

  /* ==========================================================================
     THEME SWITCHER SYSTEM (Dark/Light mode)
     ========================================================================== */
  const savedTheme = localStorage.getItem("scientific-portfolio-theme");
  if (savedTheme === "light") {
    bodyElement.classList.remove("dark-mode");
    bodyElement.classList.add("light-mode");
  } else {
    bodyElement.classList.add("dark-mode");
    bodyElement.classList.remove("light-mode");
  }

  themeToggle.addEventListener("click", () => {
    if (bodyElement.classList.contains("dark-mode")) {
      bodyElement.classList.remove("dark-mode");
      bodyElement.classList.add("light-mode");
      localStorage.setItem("scientific-portfolio-theme", "light");
    } else {
      bodyElement.classList.remove("light-mode");
      bodyElement.classList.add("dark-mode");
      localStorage.setItem("scientific-portfolio-theme", "dark");
    }
  });

  /* ==========================================================================
     DASHBOARD NAVIGATION (Tab switcher)
     ========================================================================== */
  const dbTabButtons = document.querySelectorAll(".db-tab-btn");
  const dbPanels = document.querySelectorAll(".db-panel");

  dbTabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      // Deactivate all
      dbTabButtons.forEach(b => b.classList.remove("active"));
      dbPanels.forEach(p => p.classList.remove("active"));

      // Activate clicked
      btn.classList.add("active");
      const targetId = btn.getAttribute("data-target");
      document.getElementById(targetId).classList.add("active");
    });
  });

  /* ==========================================================================
     LABORATORY EXPERTISE PILLS RENDERER
     ========================================================================== */
  const populateSkills = () => {
    const categories = ["molecular", "material", "analytical", "software"];
    categories.forEach(cat => {
      const container = document.getElementById(`skills-${cat}`);
      if (container && RESUME_DATA.skills[cat]) {
        container.innerHTML = RESUME_DATA.skills[cat]
          .map(skill => `<li class="skill-pill">${skill}</li>`)
          .join("");
      }
    });
  };
  populateSkills();

  /* ==========================================================================
     SUPPLEMENTARY CARDS POPULATION (Patent, Review, Book chapters)
     ========================================================================== */
  const populateSupplementary = () => {
    // 1. Patent Card
    const pat = RESUME_DATA.patent;
    document.getElementById("patent-title").textContent = pat.title;
    document.getElementById("patent-desc").textContent = pat.description;
    document.getElementById("patent-appno").textContent = pat.applicationNo;
    document.getElementById("patent-inventors").textContent = pat.inventors;

    // 2. Review Papers Panel
    const reviewPanel = document.getElementById("sub-review");
    reviewPanel.innerHTML = RESUME_DATA.underReview
      .map(paper => `
        <div class="sub-pub-item">
          <div class="sub-pub-title">${paper.title}</div>
          <div class="sub-pub-authors">${paper.authors}</div>
          <div class="sub-pub-journal">${paper.journal} — Impact Factor: <strong>${paper.impactFactor}</strong> (${paper.status})</div>
        </div>
      `).join("");

    // 3. Book Chapters Panel
    const chaptersPanel = document.getElementById("sub-chapters");
    chaptersPanel.innerHTML = RESUME_DATA.bookChapters
      .map(chap => `
        <div class="sub-pub-item">
          <div class="sub-pub-title">${chap.title}</div>
          <div class="sub-pub-authors">${chap.authors}</div>
          <div class="sub-pub-journal">${chap.publisher} — ${chap.status}</div>
        </div>
      `).join("");

    // Chapter switcher tabs
    const chapterTabs = document.querySelectorAll(".c-tab");
    const chapterPanels = document.querySelectorAll(".chapter-content .c-panel");

    chapterTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        chapterTabs.forEach(t => t.classList.remove("active"));
        chapterPanels.forEach(p => p.classList.remove("active"));

        tab.classList.add("active");
        const targetId = tab.getAttribute("data-target");
        document.getElementById(targetId).classList.add("active");
      });
    });
  };
  populateSupplementary();

  /* ==========================================================================
     CHRONOLOGICAL TIMELINE ENGINE
     ========================================================================== */
  const renderTimeline = () => {
    const timelineContainer = document.getElementById("timeline-container");
    
    // Helper to calculate a precise decimal sort value for dates/periods
    const getSortValue = (period) => {
      if (period.includes("Present")) {
        return 2026.9; 
      }
      if (period.startsWith("Since")) {
        return 2025.95; // Ongoing starting in late 2025, sort above regular 2025 entries
      }
      
      const parts = period.split(/[–-]/).map(p => p.trim());
      const endPart = parts[1] || parts[0]; 
      
      const tokens = endPart.split(" ");
      const year = parseInt(tokens[tokens.length - 1]);
      if (isNaN(year)) return 2000;
      
      const monthStr = tokens[tokens.length - 2];
      let monthValue = 0;
      if (monthStr) {
        const months = {
          jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6,
          jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12
        };
        const m = monthStr.toLowerCase().substring(0, 3);
        if (months[m]) {
          monthValue = months[m] / 13;
        }
      }
      return year + monthValue;
    };

    // Construct timeline events (Combine education and experience)
    const events = [];

    // Map education events
    RESUME_DATA.education.forEach(edu => {
      events.push({
        type: "education",
        title: edu.degree,
        org: `${edu.institution}, ${edu.location}`,
        desc: `${edu.grade}. ${edu.details}`,
        period: edu.period,
        sortValue: getSortValue(edu.period)
      });
    });

    // Map experience events
    RESUME_DATA.experience.forEach(exp => {
      events.push({
        type: "experience",
        title: exp.role,
        org: `${exp.organization}, ${exp.location}`,
        desc: exp.details + (exp.mentor ? ` (Mentor: ${exp.mentor})` : ""),
        period: exp.period,
        sortValue: getSortValue(exp.period)
      });
    });

    // Sort events chronologically (newest first)
    events.sort((a, b) => b.sortValue - a.sortValue);

    timelineContainer.innerHTML = events.map((event, idx) => {
      const positionClass = idx % 2 === 0 ? "left" : "right";
      const icon = event.type === "education" ? "🎓" : (event.title.includes("Professor") ? "👨‍🏫" : "🔬");
      return `
        <div class="timeline-event-card ${positionClass} glass animate-fade">
          <div class="timeline-card-content glass">
            <span class="timeline-date-badge">${event.period}</span>
            <h3>${icon} ${event.title}</h3>
            <div class="timeline-org">${event.org}</div>
            <p class="timeline-desc text-muted">${event.desc}</p>
          </div>
        </div>
      `;
    }).join("");
  };
  renderTimeline();

  /* ==========================================================================
     INTERACTIVE PUBLICATIONS EXPLORER & CITATION BARS
     ========================================================================== */
  
  // Render search results
  const renderPublications = (pubs) => {
    if (pubs.length === 0) {
      publicationsContainer.innerHTML = `
        <div class="glass text-center" style="padding: 3rem; border-radius: 12px; border-style: dashed;">
          <p class="text-muted">No publications match your search query or filter tag.</p>
          <button class="btn btn-secondary" style="margin-top: 1rem;" id="reset-filters-btn">Reset All Filters</button>
        </div>
      `;
      // Bind reset button
      document.getElementById("reset-filters-btn")?.addEventListener("click", () => {
        searchInput.value = "";
        activeSearchQuery = "";
        activeTagFilter = "all";
        
        // Reset tag button styles
        document.querySelectorAll(".tag-btn").forEach(btn => {
          btn.classList.toggle("active", btn.getAttribute("data-tag") === "all");
        });
        
        filterAndRender();
      });
      return;
    }

    publicationsContainer.innerHTML = pubs.map(pub => {
      const displayJournal = pub.journal || "SCI Publication";
      const tagsMarkup = pub.tags 
        ? `<div class="pub-tags-list">${pub.tags.map(t => `<span class="pub-tag">#${t}</span>`).join("")}</div>`
        : "";

      return `
        <div class="pub-card glass animate-fade" data-id="${pub.id}">
          <div class="pub-card-header">
            <span class="pub-journal">${displayJournal}</span>
            <span class="pub-year-badge">${pub.year}</span>
          </div>
          <h3 class="pub-title" onclick="openAbstractModal('${pub.id}')">${pub.title}</h3>
          
          <div class="pub-meta-row">
            <div class="pub-meta-item">
              <span class="pub-meta-lbl">Citations:</span>
              <span class="pub-meta-val citations-count">${pub.citations}</span>
            </div>
            <div class="pub-meta-item">
              <span class="pub-meta-lbl">Impact Factor:</span>
              <span class="pub-meta-val">IF ${pub.impactFactor || "N/A"}</span>
            </div>
            <div class="pub-meta-item">
              <span class="pub-meta-lbl">Open Access:</span>
              <span class="pub-meta-val">${pub.pdf_url ? "🟢 Yes" : "🔴 Subscription"}</span>
            </div>
          </div>
          ${tagsMarkup}
        </div>
      `;
    }).join("");
  };

  // Render sidebar Citations charts (dynamic based on filtered list)
  const renderCitationsChart = (pubs) => {
    // Find maximum citation to calculate scale percentage
    const maxCitation = Math.max(...RESUME_DATA.publications.map(p => p.citations), 1);
    
    // Sort pubs by citations descending for the chart (top 5)
    const topPubs = [...pubs]
      .sort((a, b) => b.citations - a.citations)
      .slice(0, 5);

    chartContainer.innerHTML = topPubs.map(pub => {
      const percentage = (pub.citations / maxCitation) * 100;
      return `
        <div class="chart-bar-item" title="${pub.title} (${pub.citations} citations)">
          <div class="chart-bar-label">${pub.title}</div>
          <div class="chart-bar-wrapper">
            <div class="chart-bar-fill" style="width: ${percentage}%"></div>
            <span class="chart-bar-val">${pub.citations}</span>
          </div>
        </div>
      `;
    }).join("");
  };

  // Filtering Engine
  const filterAndRender = () => {
    // 1. Apply Search Query & Filter Tags
    let filtered = publicationsList.filter(pub => {
      // Tag filtering
      const matchesTag = activeTagFilter === "all" || (pub.tags && pub.tags.includes(activeTagFilter));
      
      // Text search filtering
      const query = activeSearchQuery.toLowerCase();
      const matchesSearch = !query || 
        pub.title.toLowerCase().includes(query) || 
        (pub.journal && pub.journal.toLowerCase().includes(query)) ||
        (pub.abstract && pub.abstract.toLowerCase().includes(query));

      return matchesTag && matchesSearch;
    });

    // 2. Apply Sorting
    if (activeSortField === "citations") {
      filtered.sort((a, b) => b.citations - a.citations);
    } else if (activeSortField === "year") {
      filtered.sort((a, b) => b.year - a.year);
    }

    // 3. Render Views
    resultsCountText.textContent = `Showing ${filtered.length} publications`;
    renderPublications(filtered);
    renderCitationsChart(filtered);
  };

  // Bind Search events
  searchInput.addEventListener("input", (e) => {
    activeSearchQuery = e.target.value;
    filterAndRender();
  });

  // Bind Sort events
  sortSelect.addEventListener("change", (e) => {
    activeSortField = e.target.value;
    filterAndRender();
  });

  // Bind Tag Filter events
  filterTagsContainer.querySelectorAll(".tag-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      filterTagsContainer.querySelectorAll(".tag-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      
      activeTagFilter = btn.getAttribute("data-tag");
      filterAndRender();
    });
  });

  // Execute initial Publications explorer render
  filterAndRender();

  /* ==========================================================================
     ABSTRACT VISUALIZER MODAL & SCIENTIFIC HIGHLIGHTER
     ========================================================================== */
  
  // Highlight scientific keywords to look "highly scientific"
  const highlightAbstractKeywords = (text) => {
    if (!text) return "No abstract available.";
    
    // Core biotech keywords to highlight
    const keywords = [
      /Bacterial Cellulose/gi,
      /Escherichia coli/gi,
      /Pseudomonas denitrificans/gi,
      /cobalt oxide/gi,
      /nickel oxide/gi,
      /Co3O4/g,
      /NiO/g,
      /microbial cell-surface display/gi,
      /whole-cell/gi,
      /photocatalytic/gi,
      /nanoparticles/gi,
      /biosorption/gi,
      /tensile strength/gi,
      /bioremediation/gi,
      /metabolic pathway engineering/gi,
      /protein scaffold/gi,
      /glutamate decarboxylase/gi,
      /gamma-aminobutyric acid/gi,
      /GABA/g,
      /methylene blue/gi,
      /norfloxacin/gi
    ];

    let highlighted = text;
    keywords.forEach(kw => {
      highlighted = highlighted.replace(kw, (match) => `<span class="abstract-highlight-kw">${match}</span>`);
    });

    return highlighted;
  };

  // Open Modal logic
  window.openAbstractModal = (pubId) => {
    const pub = publicationsList.find(p => p.id === pubId);
    if (!pub) return;

    modalJournal.textContent = pub.journal || "SCI Publication";
    modalTitle.textContent = pub.title;
    modalYear.textContent = `Year: ${pub.year}`;
    modalCitations.textContent = `Citations: ${pub.citations}`;
    modalIF.textContent = pub.impactFactor ? `IF: ${pub.impactFactor}` : "IF: N/A";
    
    modalAbstract.innerHTML = highlightAbstractKeywords(pub.abstract);

    // DOI button
    if (pub.doi) {
      modalDoi.href = pub.doi;
      modalDoi.style.display = "inline-flex";
    } else {
      modalDoi.style.display = "none";
    }

    // PDF button
    if (pub.pdf_url) {
      modalPdf.href = pub.pdf_url;
      modalPdf.style.display = "inline-flex";
    } else {
      modalPdf.style.display = "none";
    }

    // Show modal
    abstractModal.classList.add("active");
    bodyElement.style.overflow = "hidden"; // Prevent background scroll
  };

  // Close Modal logic
  const closeModal = () => {
    abstractModal.classList.remove("active");
    bodyElement.style.overflow = ""; // Re-enable background scroll
  };

  closeModalBtn.addEventListener("click", closeModal);
  
  // Close modal when clicking on the blurred overlay background
  abstractModal.addEventListener("click", (e) => {
    if (e.target === abstractModal) {
      closeModal();
    }
  });

  // Close modal with ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && abstractModal.classList.contains("active")) {
      closeModal();
    }
  });

  /* ==========================================================================
     CLIPBOARD SYSTEM FOR EMAILS & TOASTS
     ========================================================================== */
  const emailCopyButtons = document.querySelectorAll(".email-btn-copy");

  emailCopyButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const email = btn.getAttribute("data-email");
      
      navigator.clipboard.writeText(email)
        .then(() => {
          // Show Toast notification
          toast.classList.add("show");
          
          // Animate clipboard tick icon in button
          const indicator = btn.querySelector(".copy-indicator");
          if (indicator) {
            indicator.textContent = "✓";
            setTimeout(() => { indicator.textContent = "📋"; }, 2000);
          }

          // Hide Toast
          setTimeout(() => {
            toast.classList.remove("show");
          }, 3000);
        })
        .catch(err => {
          console.error("Could not copy email to clipboard: ", err);
        });
    });
  });
});
