document.addEventListener("DOMContentLoaded", () => {
  if (typeof RESUME_DATA === "undefined") { console.error("data.js not loaded!"); return; }

  // ===== STATE =====
  let activeTag = "all", activeQuery = "", activeSort = "citations";
  const pubs = [...RESUME_DATA.publications];
  const $ = id => document.getElementById(id);

  // ===== BOOT SEQUENCE =====
  const bootEl = $("boot-loader"), termEl = $("boot-terminal"), fillEl = $("boot-fill");
  const logs = [
    { t: "INITIALIZING DR_ASHOKKUMAR_BIOSYS v3.5...", c: "info" },
    { t: "LOADING GENETIC CIRCUITRY DATABASE... [OK]", c: "ok" },
    { t: "PARSING MICROBIAL GENOME ASSEMBLY... [162 ORTHOLOGS FOUND]", c: "ok" },
    { t: "ESTABLISHING METABOLIC PATHWAY SIMULATIONS...", c: "info" },
    { t: "SYNCHRONIZING PUBLICATION REPOSITORY... [12 ARTICLES]", c: "ok" },
    { t: "CALCINATING NANOPARTICLE SYNTHESIS PROTOCOLS... [Co3O4]", c: "ok" },
    { t: "P. DENITRIFICANS FLUX BALANCE ANALYSIS... LOADED", c: "ok" },
    { t: "PEPTIDE-METAL BINDING DFT PREDICTORS... ONLINE", c: "ok" },
    { t: "BOOT SEQUENCE COMPLETE. DECRYPTING DASHBOARD...", c: "info" }
  ];

  let logIdx = 0;
  const runBoot = () => {
    if (logIdx < logs.length && bootEl) {
      const l = logs[logIdx];
      const line = document.createElement("div");
      line.className = `boot-line ${l.c}`;
      line.textContent = `> ${l.t}`;
      termEl.appendChild(line);
      termEl.scrollTop = termEl.scrollHeight;
      if (fillEl) fillEl.style.width = `${((logIdx + 1) / logs.length) * 100}%`;
      logIdx++;
      setTimeout(runBoot, 200);
    } else {
      setTimeout(() => {
        if (bootEl) bootEl.classList.add("done");
      }, 500);
    }
  };
  if (bootEl) setTimeout(runBoot, 250);

  // ===== DNA CANVAS =====
  const canvas = $("dna-canvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    window.addEventListener("resize", () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; });

    const strands = [];
    const count = 2;
    const basePairs = 20;

    for (let s = 0; s < count; s++) {
      const offset = s * 120;
      const pairs = [];
      for (let i = 0; i < basePairs; i++) {
        pairs.push({
          y: (i / basePairs) * h,
          phase: (i / basePairs) * Math.PI * 4 + offset * 0.01,
          speed: 0.3 + Math.random() * 0.2,
          amplitude: 80 + Math.random() * 40,
          color: s === 0 ? "rgba(0,255,136," : "rgba(0,212,255,"
        });
      }
      strands.push(pairs);
    }

    const floating = [];
    for (let i = 0; i < 30; i++) {
      floating.push({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.2, vy: (Math.random() - 0.5) * 0.2,
        r: Math.random() * 2 + 1, a: Math.random() * 0.3 + 0.1
      });
    }

    let mouseX = w / 2, mouseY = h / 2;
    window.addEventListener("mousemove", e => { mouseX = e.clientX; mouseY = e.clientY; });

    const time = { t: 0 };
    const anim = () => {
      time.t += 0.008;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      for (const strand of strands) {
        for (let i = 0; i < strand.length; i++) {
          const p = strand[i];
          const x1 = cx + Math.sin(p.phase + time.t * p.speed) * p.amplitude;
          const x2 = cx + Math.sin(p.phase + time.t * p.speed + Math.PI) * p.amplitude;
          const yPos = (p.y + time.t * 20) % (h + 40) - 20;

          ctx.beginPath();
          ctx.arc(x1, yPos, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = p.color + "0.5)";
          ctx.fill();

          ctx.beginPath();
          ctx.arc(x2, yPos, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = p.color + "0.5)";
          ctx.fill();

          ctx.beginPath();
          ctx.moveTo(x1, yPos);
          ctx.lineTo(x2, yPos);
          ctx.strokeStyle = p.color + "0.15)";
          ctx.lineWidth = 0.5;
          ctx.stroke();

          if (i < strand.length - 1) {
            const next = strand[i + 1];
            const nextY = (next.y + time.t * 20) % (h + 40) - 20;
            const nx1 = cx + Math.sin(next.phase + time.t * next.speed) * next.amplitude;
            const nx2 = cx + Math.sin(next.phase + time.t * next.speed + Math.PI) * next.amplitude;
            ctx.beginPath(); ctx.moveTo(x1, yPos); ctx.lineTo(nx1, nextY);
            ctx.strokeStyle = p.color + "0.08)"; ctx.lineWidth = 0.5; ctx.stroke();
            ctx.beginPath(); ctx.moveTo(x2, yPos); ctx.lineTo(nx2, nextY);
            ctx.strokeStyle = p.color + "0.08)"; ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      }

      for (const f of floating) {
        f.x += f.vx; f.y += f.vy;
        if (f.x < 0 || f.x > w) f.vx *= -1;
        if (f.y < 0 || f.y > h) f.vy *= -1;
        ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,255,136,${f.a})`; ctx.fill();

        const dx = f.x - mouseX, dy = f.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath(); ctx.moveTo(f.x, f.y); ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = `rgba(0,212,255,${0.1 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5; ctx.stroke();
        }
      }

      requestAnimationFrame(anim);
    };
    anim();
  }

  // ===== CURSOR =====
  const cursor = $("cursor");
  if (cursor) {
    let mx = window.innerWidth / 2, my = window.innerHeight / 2, cx = mx, cy = my;
    window.addEventListener("mousemove", e => { mx = e.clientX; my = e.clientY; });

    const updateCursor = () => {
      cx += (mx - cx) * 0.15;
      cy += (my - cy) * 0.15;
      cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      requestAnimationFrame(updateCursor);
    };
    updateCursor();

    const bindHover = () => {
      document.querySelectorAll("a, button, select, input, .pub-title, .dash-tab, .ch-tab, .copy-email, .tag")
        .forEach(el => {
          el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
          el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
        });
    };
    bindHover();
    setInterval(bindHover, 2000);
  }

  // ===== DASHBOARD TABS =====
  document.querySelectorAll(".dash-tab").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".dash-tab").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".dash-panel").forEach(p => p.classList.remove("active"));
      btn.classList.add("active");
      const targetId = btn.getAttribute("data-target");
      const panel = document.getElementById(targetId);
      if (panel) panel.classList.add("active");
    });
  });

  // ===== SKILLS =====
  ["molecular", "material", "analytical", "software"].forEach(cat => {
    const el = $(`skills-${cat}`);
    if (el && RESUME_DATA.skills[cat]) {
      el.innerHTML = RESUME_DATA.skills[cat].map(s => `<li class="skill-pill">${s}</li>`).join("");
    }
  });

  // ===== SUPPLEMENTARY =====
  const pat = RESUME_DATA.patent;
  if ($("patent-title")) $("patent-title").textContent = pat.title;
  if ($("patent-desc")) $("patent-desc").textContent = pat.description;
  if ($("patent-appno")) $("patent-appno").textContent = pat.applicationNo;
  if ($("patent-inventors")) $("patent-inventors").textContent = pat.inventors;

  const reviewEl = $("ch-review");
  if (reviewEl) {
    reviewEl.innerHTML = RESUME_DATA.underReview.map(p => `
      <div class="sub-item">
        <div class="sub-title">${p.title}</div>
        <div class="sub-authors">${p.authors}</div>
        <div class="sub-journal">${p.journal} — IF: <strong>${p.impactFactor}</strong> (${p.status})</div>
      </div>
    `).join("");
  }

  const chaptersEl = $("ch-chapters");
  if (chaptersEl) {
    chaptersEl.innerHTML = RESUME_DATA.bookChapters.map(c => `
      <div class="sub-item">
        <div class="sub-title">${c.title}</div>
        <div class="sub-authors">${c.authors}</div>
        <div class="sub-journal">${c.publisher} — ${c.status}</div>
      </div>
    `).join("");
  }

  document.querySelectorAll(".ch-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".ch-tab").forEach(t => t.classList.remove("active"));
      document.querySelectorAll(".ch-panel").forEach(p => p.classList.remove("active"));
      tab.classList.add("active");
      const t = $(tab.dataset.target);
      if (t) t.classList.add("active");
    });
  });

  // ===== CONFERENCE PROCEEDINGS (NEW) =====
  const confEl = $("conf-container");
  if (confEl) {
    confEl.innerHTML = RESUME_DATA.conferenceProceedings.map(c => `
      <div class="conf-card">
        <div class="conf-year">${c.year}</div>
        <div class="conf-title">${c.title}</div>
        <div class="conf-authors">${c.authors}</div>
        <div class="conf-meta">${c.conference} — ${c.date}${c.page ? ` (p. ${c.page})` : ""}</div>
      </div>
    `).join("");
  }

  // ===== GITHUB PROJECTS (NEW) =====
  const ghEl = $("github-container");
  if (ghEl) {
    ghEl.innerHTML = RESUME_DATA.githubProjects.map(g => `
      <div class="gh-card">
        <span class="gh-status ${g.status === "Finished" ? "finished" : "dev"}">${g.status}</span>
        <h4 class="gh-title">${g.title}</h4>
        <p class="gh-desc">${g.description}</p>
      </div>
    `).join("");
  }

  // ===== TIMELINE =====
  const tlEl = $("tl-container");
  if (tlEl) {
    const getSortVal = period => {
      if (period.includes("Present")) return 2026.9;
      if (period.startsWith("Since")) return 2025.95;
      const parts = period.split(/[–-]/).map(p => p.trim());
      const end = parts[1] || parts[0];
      const tokens = end.split(" ");
      const year = parseInt(tokens[tokens.length - 1]);
      if (isNaN(year)) return 2000;
      const mStr = tokens[tokens.length - 2];
      let mVal = 0;
      if (mStr) {
        const ms = { jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12 };
        const m = mStr.toLowerCase().substring(0, 3);
        if (ms[m]) mVal = ms[m] / 13;
      }
      return year + mVal;
    };

    const events = [];
    RESUME_DATA.education.forEach(e => events.push({
      icon: "🎓", title: e.degree, org: `${e.institution}, ${e.location}`,
      desc: `${e.grade}. ${e.details}${e.mentor ? ` (Mentor: ${e.mentor})` : ""}`,
      period: e.period, sort: getSortVal(e.period)
    }));
    RESUME_DATA.experience.forEach(e => events.push({
      icon: e.role.includes("Professor") ? "👨‍🏫" : e.role.includes("Teaching") ? "📚" : "🔬",
      title: e.role, org: `${e.organization}, ${e.location}`,
      desc: e.details, period: e.period, sort: getSortVal(e.period)
    }));
    events.sort((a, b) => b.sort - a.sort);

    tlEl.innerHTML = events.map((e, i) => {
      const pos = i % 2 === 0 ? "left" : "right";
      return `
        <div class="tl-card ${pos}">
          <div class="tl-inner">
            <span class="tl-date">${e.period}</span>
            <h3>${e.icon} ${e.title}</h3>
            <div class="tl-org">${e.org}</div>
            <p class="tl-desc">${e.desc}</p>
          </div>
        </div>
      `;
    }).join("");
  }

  // ===== AWARDS & GRANTS (separate) =====
  const awardsEl = $("awards-container");
  if (awardsEl) {
    awardsEl.innerHTML = RESUME_DATA.awards.map(a => `
      <div class="award-card">
        <div class="award-icon">🏆</div>
        <div class="award-body">
          <h4 class="award-title">${a.title}</h4>
          <div class="award-agency">${a.agency}</div>
          <div class="award-period">${a.period}</div>
          <p class="award-desc">${a.description}</p>
        </div>
      </div>
    `).join("");
  }

  // ===== PUBLICATIONS =====
  const searchInput = $("pub-search");
  const sortSelect = $("pub-sort");
  const filterTags = $("filter-tags");
  const pubsContainer = $("publications-container");
  const resultsCount = $("results-count");
  const chartContainer = $("chart-container");

  const renderPubs = list => {
    if (list.length === 0) {
      pubsContainer.innerHTML = `
        <div class="pub-card" style="text-align:center;padding:3rem;border-style:dashed;">
          <p class="text-muted">No publications match your search/filter.</p>
          <button class="btn btn-outline" style="margin-top:1rem;" id="reset-btn">Reset Filters</button>
        </div>
      `;
      $("reset-btn")?.addEventListener("click", () => {
        searchInput.value = ""; activeQuery = ""; activeTag = "all";
        document.querySelectorAll(".tag").forEach(t => t.classList.toggle("active", t.dataset.tag === "all"));
        filterAndRender();
      });
      return;
    }

    pubsContainer.innerHTML = list.map(p => {
      const tags = p.tags ? p.tags.map(t => `<span class="pub-tag">#${t}</span>`).join("") : "";
      return `
        <div class="pub-card" data-id="${p.id}">
          <div class="pub-hdr">
            <span class="pub-journal">${p.journal || "SCI Publication"}</span>
            <span class="pub-year">${p.year}</span>
          </div>
          <h3 class="pub-title" onclick="openAbstract('${p.id}')">${p.title}</h3>
          <div class="pub-meta">
            <span>Citations: <strong class="citations">${p.citations}</strong></span>
            <span>IF: <strong>${p.impactFactor || "N/A"}</strong></span>
            <span>Open Access: <strong>${p.pdf_url ? "✅ Yes" : "🔒 Subscription"}</strong></span>
          </div>
          ${tags ? `<div class="pub-tags">${tags}</div>` : ""}
        </div>
      `;
    }).join("");
  };

  const renderChart = list => {
    const max = Math.max(...RESUME_DATA.publications.map(p => p.citations), 1);
    const top = [...list].sort((a, b) => b.citations - a.citations).slice(0, 5);
    chartContainer.innerHTML = top.map(p => {
      const pct = (p.citations / max) * 100;
      return `
        <div class="chart-row" title="${p.title} (${p.citations})">
          <div class="chart-label">${p.title}</div>
          <div class="chart-bar">
            <div class="chart-fill" style="width:${pct}%"></div>
            <span class="chart-val">${p.citations}</span>
          </div>
        </div>
      `;
    }).join("");
  };

  const filterAndRender = () => {
    let filtered = pubs.filter(p => {
      const tagOk = activeTag === "all" || (p.tags && p.tags.includes(activeTag));
      const q = activeQuery.toLowerCase();
      const searchOk = !q || p.title.toLowerCase().includes(q) ||
        (p.journal && p.journal.toLowerCase().includes(q)) ||
        (p.abstract && p.abstract.toLowerCase().includes(q));
      return tagOk && searchOk;
    });

    if (activeSort === "citations") filtered.sort((a, b) => b.citations - a.citations);
    else filtered.sort((a, b) => b.year - a.year);

    if (resultsCount) resultsCount.textContent = `Showing ${filtered.length} publications`;
    renderPubs(filtered);
    renderChart(filtered);
  };

  searchInput?.addEventListener("input", e => { activeQuery = e.target.value; filterAndRender(); });
  sortSelect?.addEventListener("change", e => { activeSort = e.target.value; filterAndRender(); });
  filterTags?.querySelectorAll(".tag").forEach(t => {
    t.addEventListener("click", () => {
      filterTags.querySelectorAll(".tag").forEach(x => x.classList.remove("active"));
      t.classList.add("active");
      activeTag = t.dataset.tag;
      filterAndRender();
    });
  });
  filterAndRender();

  // ===== ABSTRACT MODAL =====
  window.openAbstract = id => {
    const p = pubs.find(x => x.id === id);
    if (!p) return;
    const m = $("abstract-modal");
    if ($("modal-journal")) $("modal-journal").textContent = p.journal || "SCI Publication";
    if ($("modal-title")) $("modal-title").textContent = p.title;
    if ($("modal-year")) $("modal-year").textContent = `Year: ${p.year}`;
    if ($("modal-citations")) $("modal-citations").textContent = `Citations: ${p.citations}`;
    if ($("modal-if")) $("modal-if").textContent = p.impactFactor ? `IF: ${p.impactFactor}` : "IF: N/A";

    const absEl = $("modal-abstract");
    if (absEl) {
      let txt = p.abstract || "No abstract available.";
      const keywords = [/Escherichia coli/gi, /Pseudomonas denitrificans/gi, /cobalt oxide/gi, /nickel oxide/gi, /Co3O4/g, /NiO/g, /microbial cell-surface display/gi, /photocatalytic/gi, /nanoparticles/gi, /biosorption/gi, /bioremediation/gi, /metabolic pathway/gi, /protein scaffold/gi, /glutamate decarboxylase/gi, /gamma-aminobutyric acid/gi, /GABA/g, /methylene blue/gi, /norfloxacin/gi];
      keywords.forEach(kw => { txt = txt.replace(kw, m => `<span style="background:rgba(0,255,136,0.12);color:var(--accent);padding:0.05rem 0.2rem;border-radius:3px;font-weight:500;">${m}</span>`); });
      absEl.innerHTML = txt;
    }

    const doiBtn = $("modal-doi");
    if (doiBtn) { doiBtn.href = p.doi || "#"; doiBtn.style.display = p.doi ? "inline-flex" : "none"; }
    const pdfBtn = $("modal-pdf");
    if (pdfBtn) { pdfBtn.href = p.pdf_url || "#"; pdfBtn.style.display = p.pdf_url ? "inline-flex" : "none"; }

    if (m) { m.classList.add("open"); document.body.style.overflow = "hidden"; }
  };

  const closeModal = () => {
    const m = $("abstract-modal");
    if (m) { m.classList.remove("open"); document.body.style.overflow = ""; }
  };
  $("modal-close")?.addEventListener("click", closeModal);
  $("abstract-modal")?.addEventListener("click", e => { if (e.target === e.currentTarget) closeModal(); });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && $("abstract-modal")?.classList.contains("open")) closeModal();
  });

  // ===== EMAIL COPY =====
  const toast = $("toast");
  document.querySelectorAll(".copy-email").forEach(btn => {
    btn.addEventListener("click", () => {
      const email = btn.dataset.email;
      navigator.clipboard.writeText(email).then(() => {
        if (toast) { toast.classList.add("show"); setTimeout(() => toast.classList.remove("show"), 3000); }
        const icon = btn.querySelector(".copy-icon");
        if (icon) { icon.textContent = "✓"; setTimeout(() => { icon.textContent = "📋"; }, 2000); }
      });
    });
  });

  // ===== STATS =====
  const s = RESUME_DATA.personal.stats;
  if ($("stat-citations")) $("stat-citations").textContent = s.citations;
  if ($("stat-hindex")) $("stat-hindex").textContent = s.hIndex;
  if ($("stat-i10")) $("stat-i10").textContent = s.i10Index;
  if ($("stat-pubs")) $("stat-pubs").textContent = s.totalPublications;

  // ===== TEXT SCRAMBLE =====
  const scramble = (el, final, isHtml = false) => {
    if (!el) return;
    const chars = "!<>-_\\/[]{}—=+*^?#________";
    const clean = isHtml ? final.replace(/<[^>]*>/g, "") : final;
    const queue = [];
    for (let i = 0; i < clean.length; i++) {
      const start = Math.floor(Math.random() * 6);
      queue.push({ char: clean[i], start, end: start + Math.floor(Math.random() * 10), current: "" });
    }
    let frame = 0, id;
    const update = () => {
      let out = "", complete = 0;
      for (const q of queue) {
        if (frame >= q.end) { complete++; out += q.char; }
        else if (frame >= q.start) {
          if (!q.current || Math.random() < 0.28) q.current = chars[Math.floor(Math.random() * chars.length)];
          out += q.current;
        }
      }
      if (isHtml) el.innerHTML = final;
      else el.textContent = out;
      if (complete === queue.length) cancelAnimationFrame(id);
      else { frame++; id = requestAnimationFrame(update); }
    };
    update();
  };

  document.querySelectorAll(".section-title").forEach(h => {
    const orig = h.textContent.trim();
    h.addEventListener("mouseenter", () => scramble(h, orig));
  });

  // ===== PARALLAX TILT ON PHOTO =====
  const photoCard = document.querySelector(".hero-photo-card");
  if (photoCard) {
    const hero = document.querySelector(".hero");
    let isHovering = false;
    photoCard.addEventListener("mouseenter", () => isHovering = true);
    photoCard.addEventListener("mouseleave", () => {
      isHovering = false;
      photoCard.style.transform = "perspective(600px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    });
    hero?.addEventListener("mousemove", e => {
      if (!isHovering) return;
      const rect = photoCard.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      const rotX = dy * -8;
      const rotY = dx * 8;
      photoCard.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px)`;
    });
  }

  // ===== SCROLL REVEAL =====
  const revealEls = document.querySelectorAll(".section, .pub-card, .conf-card, .gh-card, .award-card, .tl-card, .sup-card, .dash");
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = "1";
        e.target.style.transform = "translateY(0)";
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.05, rootMargin: "0px 0px -40px 0px" });
  revealEls.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    el.style.transition = "opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1)";
    revealObs.observe(el);
  });

  // ===== SCROLL SPY =====
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");
  const onScroll = () => {
    let current = "";
    sections.forEach(s => {
      const top = s.offsetTop - 120;
      if (window.scrollY >= top) current = s.id;
    });
    navLinks.forEach(l => {
      l.classList.toggle("active", l.getAttribute("href") === `#${current}`);
    });
  };
  window.addEventListener("scroll", onScroll);
});
