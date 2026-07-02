document.addEventListener("DOMContentLoaded", () => {
  if (typeof RESUME_DATA === "undefined") { console.error("data.js not loaded!"); return; }

  let activeTag = "all", activeQuery = "", activeSort = "citations";
  const pubs = [...RESUME_DATA.publications];
  const $ = id => document.getElementById(id);

  // ===== BOOT SEQUENCE =====
  const bootEl = $("boot-loader"), termEl = $("boot-terminal"), fillEl = $("boot-fill");
  const logs = [
    { t: "INITIALIZING DR_ASHOKKUMAR_BIOSYS v4.0...", c: "info" },
    { t: "LOADING 3D MOLECULAR VISUALIZATION ENGINE... [OK]", c: "ok" },
    { t: "DEPLOYING RESEARCH KNOWLEDGE NETWORK GRAPH...", c: "info" },
    { t: "PARSING MICROBIAL GENOME ASSEMBLY... [162 ORTHOLOGS FOUND]", c: "ok" },
    { t: "INITIALIZING SKILL PROFICIENCY RADAR... [6 DIMENSIONS]", c: "ok" },
    { t: "SYNCHRONIZING PUBLICATION REPOSITORY... [12 ARTICLES]", c: "ok" },
    { t: "CALCINATING NANOPARTICLE SYNTHESIS PROTOCOLS... [Co3O4]", c: "ok" },
    { t: "ACTIVATING RESEARCH AI ASSISTANT... ONLINE", c: "ok" },
    { t: "P. DENITRIFICANS FLUX BALANCE ANALYSIS... LOADED", c: "ok" },
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
      setTimeout(runBoot, 180);
    } else {
      setTimeout(() => { if (bootEl) bootEl.classList.add("done"); }, 400);
    }
  };
  if (bootEl) setTimeout(runBoot, 250);

  // ===== 3D MOLECULAR BACKGROUND (Canvas-based 3D projection) =====
  const mCanvas = $("molecular-canvas");
  if (mCanvas) {
    const ctx = mCanvas.getContext("2d");
    let w = mCanvas.width = window.innerWidth;
    let h = mCanvas.height = window.innerHeight;
    window.addEventListener("resize", () => {
      w = mCanvas.width = window.innerWidth;
      h = mCanvas.height = window.innerHeight;
    });

    const particles = [];
    const numAtoms = 40;
    const baseRadius = 150;
    const strands = 2;
    const atomsPerStrand = 20;

    // Create 3D DNA-like double helix with depth
    for (let s = 0; s < strands; s++) {
      for (let i = 0; i < atomsPerStrand; i++) {
        const t = i / atomsPerStrand;
        const angle = t * Math.PI * 6 + s * Math.PI;
        particles.push({
          x: 0, y: 0, z: 0,
          baseX: Math.cos(angle) * baseRadius,
          baseY: (t - 0.5) * h * 0.7,
          baseZ: Math.sin(angle) * baseRadius * 0.8,
          phase: t * Math.PI * 2 + s * Math.PI,
          size: 1.5 + Math.random() * 2.5,
          color: s === 0 ? [0, 255, 136] : [0, 212, 255],
          opacity: 0.2 + Math.random() * 0.4
        });
      }
    }

    // Floating background particles
    const bgParticles = [];
    for (let i = 0; i < 60; i++) {
      bgParticles.push({
        x: Math.random() * w, y: Math.random() * h, z: Math.random() * 400 - 200,
        vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 2 + 0.5, a: Math.random() * 0.2 + 0.05
      });
    }

    let mouseX = w/2, mouseY = h/2, rotY = 0, rotX = 0;
    window.addEventListener("mousemove", e => {
      mouseX = e.clientX; mouseY = e.clientY;
      rotY = (mouseX / w - 0.5) * 0.5;
      rotX = (mouseY / h - 0.5) * 0.3;
    });

    let time = 0;
    const project3D = (x, y, z) => {
      const cosA = Math.cos(rotY), sinA = Math.sin(rotY);
      const cosB = Math.cos(rotX), sinB = Math.sin(rotX);
      let x1 = x * cosA - z * sinA;
      let z1 = x * sinA + z * cosA;
      let y1 = y * cosB - z1 * sinB;
      let z2 = y * sinB + z1 * cosB;
      const scale = 600 / (600 + z2);
      return { sx: w/2 + x1 * scale, sy: h/2 - y1 * scale, scale };
    };

    const anim = () => {
      time += 0.008;
      ctx.clearRect(0, 0, w, h);

      const cx = w/2, cy = h/2;

      // Draw DNA particles
      for (const p of particles) {
        const yPos = (p.baseY + time * 60) % (h * 0.9 + 100) - 50;
        const wave = Math.sin(time * 0.5 + p.phase) * 20;
        const x = p.baseX + wave;
        const z = p.baseZ + Math.sin(time + p.phase) * 15;

        const { sx, sy, scale } = project3D(x, yPos, z);
        const size = p.size * scale * 0.8;
        const alpha = p.opacity * Math.min(1, scale * 1.5);

        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color[0]},${p.color[1]},${p.color[2]},${alpha})`;
        ctx.fill();

        // Glow
        if (size > 1.5) {
          ctx.beginPath();
          ctx.arc(sx, sy, size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color[0]},${p.color[1]},${p.color[2]},${alpha * 0.15})`;
          ctx.fill();
        }

        // Base pair connectors
        const pairPhase = (p.baseY / (h * 0.7) + 0.5) * Math.PI * 6;
        const pairX = -x;
        const pairZ = -z;
        const { sx: sx2, sy: sy2 } = project3D(pairX, yPos, pairZ);
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(sx2, sy2);
        ctx.strokeStyle = `rgba(${p.color[0]},${p.color[1]},${p.color[2]},${alpha * 0.2})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Draw background particles with mouse connection
      for (const fp of bgParticles) {
        fp.x += fp.vx; fp.y += fp.vy;
        if (fp.x < 0 || fp.x > w) fp.vx *= -1;
        if (fp.y < 0 || fp.y > h) fp.vy *= -1;

        const { sx, sy, scale } = project3D(fp.x - cx, fp.y - cy, fp.z);
        if (scale > 0) {
          ctx.beginPath();
          ctx.arc(sx, sy, fp.r * scale, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 255, 136, ${fp.a * scale})`;
          ctx.fill();

          // Mouse connection
          const dx = fp.x - mouseX;
          const dy = fp.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(fp.x, fp.y);
            ctx.lineTo(mouseX, mouseY);
            ctx.strokeStyle = `rgba(0, 212, 255, ${0.06 * (1 - dist/100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }

          // Particle-particle connections
          for (const fp2 of bgParticles) {
            if (fp === fp2) continue;
            const d = Math.hypot(fp.x - fp2.x, fp.y - fp2.y);
            if (d < 80) {
              ctx.beginPath();
              ctx.moveTo(fp.x, fp.y);
              ctx.lineTo(fp2.x, fp2.y);
              ctx.strokeStyle = `rgba(0, 255, 136, ${0.02 * (1 - d/80)})`;
              ctx.lineWidth = 0.3;
              ctx.stroke();
            }
          }
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
      document.querySelectorAll("a, button, select, input, .pub-title, .dash-tab, .ch-tab, .copy-email, .tag, .theme-btn, .chat-toggle, #chat-send")
        .forEach(el => {
          el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
          el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
        });
    };
    bindHover();
    setInterval(bindHover, 2000);
  }

  // ===== THEME SWITCHER =====
  document.querySelectorAll(".theme-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".theme-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      document.documentElement.setAttribute("data-theme", btn.dataset.theme);
      // Re-render radar with new theme colors
      setTimeout(renderRadarChart, 100);
    });
  });

  // ===== SCROLL REVEAL ANIMATIONS =====
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

  // ===== SCROLLING NAV HIGHLIGHT =====
  const sections = document.querySelectorAll(".section, .hero");
  const navLinks = document.querySelectorAll(".nav-link");
  const scrollSpy = () => {
    let current = "";
    sections.forEach(s => {
      const top = s.offsetTop - 150;
      if (window.scrollY >= top) current = s.id || "";
    });
    navLinks.forEach(l => {
      l.classList.toggle("active", l.getAttribute("href") === "#" + current);
    });
  };
  window.addEventListener("scroll", scrollSpy);

  // ===== ANIMATED COUNTERS =====
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        if (isNaN(target)) return;
        const dur = 1500, start = performance.now();
        const anim = (now) => {
          const p = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.floor(eased * target);
          if (p < 1) requestAnimationFrame(anim);
          else el.textContent = target;
        };
        requestAnimationFrame(anim);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll(".count-up").forEach(el => counterObserver.observe(el));

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

  const fillSubItems = (containerId, items, tmpl) => {
    const el = $(containerId);
    if (!el) return;
    el.innerHTML = items.map(tmpl).join("");
  };

  fillSubItems("ch-review", RESUME_DATA.underReview, p => `
    <div class="sub-item">
      <div class="sub-title">${p.title}</div>
      <div class="sub-authors">${p.authors}</div>
      <div class="sub-journal">${p.journal} &mdash; IF: <strong>${p.impactFactor}</strong> (${p.status})</div>
    </div>
  `);

  fillSubItems("ch-chapters", RESUME_DATA.bookChapters, c => `
    <div class="sub-item">
      <div class="sub-title">${c.title}</div>
      <div class="sub-authors">${c.authors}</div>
      <div class="sub-journal">${c.publisher} &mdash; ${c.status}</div>
    </div>
  `);

  document.querySelectorAll(".ch-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".ch-tab").forEach(t => t.classList.remove("active"));
      document.querySelectorAll(".ch-panel").forEach(p => p.classList.remove("active"));
      tab.classList.add("active");
      const t = $(tab.dataset.target);
      if (t) t.classList.add("active");
    });
  });

  // ===== CONFERENCES =====
  const confEl = $("conf-container");
  if (confEl) {
    confEl.innerHTML = RESUME_DATA.conferenceProceedings.map(c => `
      <div class="conf-card reveal">
        <div class="conf-year">${c.year}</div>
        <div class="conf-title">${c.title}</div>
        <div class="conf-authors">${c.authors}</div>
        <div class="conf-meta">${c.conference} &mdash; ${c.date}${c.page ? ` (p. ${c.page})` : ""}</div>
      </div>
    `).join("");
    document.querySelectorAll("#conf-container .reveal").forEach(el => revealObserver.observe(el));
  }

  // ===== GITHUB =====
  const ghEl = $("github-container");
  if (ghEl) {
    ghEl.innerHTML = RESUME_DATA.githubProjects.map(g => `
      <div class="gh-card reveal">
        <span class="gh-status ${g.status === "Finished" ? "finished" : "dev"}">${g.status}</span>
        <h4 class="gh-title">${g.title}</h4>
        <p class="gh-desc">${g.description}</p>
      </div>
    `).join("");
    document.querySelectorAll("#github-container .reveal").forEach(el => revealObserver.observe(el));
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
      icon: "\uD83C\uDF93", title: e.degree, org: `${e.institution}, ${e.location}`,
      desc: `${e.grade}. ${e.details}${e.mentor ? ` (Mentor: ${e.mentor})` : ""}`,
      period: e.period, sort: getSortVal(e.period)
    }));
    RESUME_DATA.experience.forEach(e => events.push({
      icon: e.role.includes("Professor") ? "\uD83D\uDC68\u200D\uD83C\uDFEB" : e.role.includes("Teaching") ? "\uD83D\uDCDA" : "\uD83D\uDD2C",
      title: e.role, org: `${e.organization}, ${e.location}`,
      desc: e.details, period: e.period, sort: getSortVal(e.period)
    }));
    events.sort((a, b) => b.sort - a.sort);

    tlEl.innerHTML = events.map((e, i) => {
      const pos = i % 2 === 0 ? "left" : "right";
      return `
        <div class="tl-card ${pos} reveal">
          <div class="tl-inner">
            <span class="tl-date">${e.period}</span>
            <h3>${e.icon} ${e.title}</h3>
            <div class="tl-org">${e.org}</div>
            <p class="tl-desc">${e.desc}</p>
          </div>
        </div>
      `;
    }).join("");
    document.querySelectorAll("#tl-container .reveal").forEach(el => revealObserver.observe(el));
  }

  // ===== AWARDS =====
  const awardsEl = $("awards-container");
  if (awardsEl) {
    awardsEl.innerHTML = RESUME_DATA.awards.map(a => `
      <div class="award-card reveal">
        <div class="award-icon">\uD83C\uDFC6</div>
        <div class="award-body">
          <h4 class="award-title">${a.title}</h4>
          <div class="award-agency">${a.agency}</div>
          <div class="award-period">${a.period}</div>
          <p class="award-desc">${a.description}</p>
        </div>
      </div>
    `).join("");
    document.querySelectorAll("#awards-container .reveal").forEach(el => revealObserver.observe(el));
  }

  // ===== RESEARCH KNOWLEDGE NETWORK GRAPH =====
  const renderNetworkGraph = () => {
    const c = $("network-canvas");
    if (!c) return;
    const rect = c.parentElement.getBoundingClientRect();
    c.width = c.clientWidth || rect.width - 32 || 600;
    c.height = 320;
    const ctx = c.getContext("2d");
    const w = c.width, h = c.height;

    const nodes = {};
    RESUME_DATA.researchAreas.forEach((name, i) => {
      nodes[name] = {
        name,
        x: w/2 + Math.cos(i / RESUME_DATA.researchAreas.length * Math.PI * 2) * (w * 0.3),
        y: h/2 + Math.sin(i / RESUME_DATA.researchAreas.length * Math.PI * 2) * (h * 0.3),
        vx: 0, vy: 0,
        r: 20 + Math.random() * 10
      };
    });

    // Force-directed layout
    const edges = RESUME_DATA.researchConnections;
    const iterations = 60;
    for (let iter = 0; iter < iterations; iter++) {
      const cooling = 1 - iter / iterations;
      // Repulsion
      const keys = Object.keys(nodes);
      for (let i = 0; i < keys.length; i++) {
        for (let j = i + 1; j < keys.length; j++) {
          const a = nodes[keys[i]], b = nodes[keys[j]];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.max(1, Math.sqrt(dx*dx + dy*dy));
          const force = 3000 / (dist * dist);
          a.vx += (dx/dist) * force * cooling;
          a.vy += (dy/dist) * force * cooling;
          b.vx -= (dx/dist) * force * cooling;
          b.vy -= (dy/dist) * force * cooling;
        }
      }
      // Attraction along edges
      for (const e of edges) {
        const a = nodes[e.source], b = nodes[e.target];
        if (!a || !b) continue;
        const dx = b.x - a.x, dy = b.y - a.y;
        const dist = Math.max(1, Math.sqrt(dx*dx + dy*dy));
        const force = dist * 0.01;
        a.vx += (dx/dist) * force * cooling;
        a.vy += (dy/dist) * force * cooling;
        b.vx -= (dx/dist) * force * cooling;
        b.vy -= (dy/dist) * force * cooling;
      }
      // Apply
      for (const key of keys) {
        const n = nodes[key];
        n.x += n.vx; n.y += n.vy;
        n.vx *= 0.5; n.vy *= 0.5;
        // Keep in bounds
        n.x = Math.max(30, Math.min(w-30, n.x));
        n.y = Math.max(30, Math.min(h-30, n.y));
      }
    }

    const getThemeColor = () => {
      const th = document.documentElement.getAttribute("data-theme") || "bio";
      const colors = { bio: "#00ff88", ocean: "#00b4ff", neon: "#c800ff" };
      return colors[th] || "#00ff88";
    };

    let hoveredNode = null;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const accent = getThemeColor();

      // Edges
      for (const e of edges) {
        const a = nodes[e.source], b = nodes[e.target];
        if (!a || !b) continue;
        const isHovered = hoveredNode && (hoveredNode === e.source || hoveredNode === e.target);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = isHovered ? accent : `rgba(255,255,255,${e.strength/100 * 0.15})`;
        ctx.lineWidth = isHovered ? 2 : e.strength/100 * 1.5;
        ctx.stroke();
      }

      // Nodes
      for (const key of Object.keys(nodes)) {
        const n = nodes[key];
        const isHovered = hoveredNode === key;
        const r = isHovered ? n.r + 5 : n.r;

        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = isHovered ? accent : `rgba(255,255,255,0.05)`;
        ctx.fill();
        ctx.strokeStyle = isHovered ? accent : `rgba(255,255,255,0.15)`;
        ctx.lineWidth = isHovered ? 2 : 1;
        ctx.stroke();

        if (isHovered) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, r + 6, 0, Math.PI * 2);
          ctx.strokeStyle = accent;
          ctx.lineWidth = 1;
          ctx.setLineDash([3, 3]);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        ctx.fillStyle = isHovered ? "#000" : accent;
        ctx.font = `${isHovered ? 11 : 9}px "Share Tech Mono", monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(key.length > 12 ? key.substring(0, 11) + ".." : key, n.x, n.y);
      }
    };
    draw();

    // Mouse interaction
    c.addEventListener("mousemove", e => {
      const rect = c.getBoundingClientRect();
      const mx = e.clientX - rect.left, my = e.clientY - rect.top;
      hoveredNode = null;
      for (const key of Object.keys(nodes)) {
        const n = nodes[key];
        if (Math.hypot(mx - n.x, my - n.y) < n.r + 5) {
          hoveredNode = key;
          break;
        }
      }
      c.style.cursor = hoveredNode ? "pointer" : "default";
      draw();
    });
  };
  renderNetworkGraph();

  // ===== SKILL RADAR CHART =====
  const renderRadarChart = () => {
    const c = $("radar-canvas");
    if (!c) return;
    const rect = c.parentElement.getBoundingClientRect();
    c.width = c.clientWidth || rect.width - 32 || 600;
    c.height = 320;
    const ctx = c.getContext("2d");
    const w = c.width, h = c.height;
    const cx = w/2, cy = h/2;
    const maxR = Math.min(w, h) * 0.35;

    const data = RESUME_DATA.skillProficiency;
    const n = data.labels.length;

    const getThemeColor = (i) => {
      const th = document.documentElement.getAttribute("data-theme") || "bio";
      const palettes = {
        bio: ["#00ff88", "#00d4ff", "#7c3aed", "#f59e0b", "#ef4444", "#ec4899"],
        ocean: ["#00b4ff", "#00e5ff", "#0055ff", "#ff9800", "#ff4081", "#7c4dff"],
        neon: ["#c800ff", "#ff00aa", "#ff6600", "#00ffcc", "#ffcc00", "#00ccff"]
      };
      return (palettes[th] || palettes.bio)[i % 6];
    };

    // Draw grid
    for (let level = 1; level <= 5; level++) {
      const r = (maxR / 5) * level;
      ctx.beginPath();
      for (let i = 0; i <= n; i++) {
        const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `rgba(255,255,255,${0.05 + level * 0.02})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    // Draw axes
    for (let i = 0; i < n; i++) {
      const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * maxR, cy + Math.sin(angle) * maxR);
      ctx.strokeStyle = "rgba(255,255,255,0.06)";
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    // Draw data area
    ctx.beginPath();
    for (let i = 0; i <= n; i++) {
      const idx = i % n;
      const angle = (idx / n) * Math.PI * 2 - Math.PI / 2;
      const val = data.values[idx] / 100;
      const r = maxR * val;
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
    const accent = getThemeColor(0);
    ctx.fillStyle = accent.replace(")", ",0.15)").replace("rgb", "rgba");
    const hslMatch = accent.match(/#(.{2})(.{2})(.{2})/);
    if (hslMatch) {
      ctx.fillStyle = `rgba(${parseInt(hslMatch[1],16)},${parseInt(hslMatch[2],16)},${parseInt(hslMatch[3],16)},0.12)`;
    }
    ctx.fill();
    ctx.strokeStyle = accent;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Data points
    for (let i = 0; i < n; i++) {
      const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
      const val = data.values[i] / 100;
      const r = maxR * val;
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = getThemeColor(i);
      ctx.fill();
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Labels
    for (let i = 0; i < n; i++) {
      const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
      const lx = cx + Math.cos(angle) * (maxR + 18);
      const ly = cy + Math.sin(angle) * (maxR + 18);
      ctx.fillStyle = getThemeColor(i);
      ctx.font = '9px "Share Tech Mono", monospace';
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Label with value
      const label = data.labels[i];
      const lines = label.length > 12
        ? [label.substring(0, 12), label.substring(12)]
        : [label];
      lines.forEach((line, li) => {
        ctx.fillText(line, lx, ly + li * 12);
      });
      // Value
      ctx.fillStyle = getThemeColor(i);
      ctx.font = 'bold 10px "Share Tech Mono", monospace';
      ctx.fillText(data.values[i] + "%", lx, ly + (lines.length) * 12 + 2);
    }
  };
  renderRadarChart();
  window.addEventListener("resize", () => { renderNetworkGraph(); renderRadarChart(); });

  // ===== PUBLICATIONS (with Impact Gauges) =====
  const searchInput = $("pub-search");
  const sortSelect = $("pub-sort");
  const filterTags = $("filter-tags");
  const pubsContainer = $("publications-container");
  const resultsCount = $("results-count");
  const chartContainer = $("chart-container");

  const getImpactClass = (ifVal) => {
    const v = parseFloat(ifVal);
    if (isNaN(v)) return "impact-low";
    if (v >= 5) return "impact-high";
    if (v >= 3) return "impact-mid";
    return "impact-low";
  };

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
      const impactClass = getImpactClass(p.impactFactor);
      return `
        <div class="pub-card" data-id="${p.id}">
          <div class="pub-hdr">
            <span class="pub-journal">${p.journal || "SCI Publication"}</span>
            <span class="impact-gauge ${impactClass}">IF: ${p.impactFactor || "N/A"}</span>
          </div>
          <h3 class="pub-title" onclick="openAbstract('${p.id}')">${p.title}</h3>
          <div class="pub-meta">
            <span>Citations: <strong class="citations">${p.citations}</strong></span>
            <span>Year: <strong>${p.year}</strong></span>
            <span>Access: <strong>${p.pdf_url ? "Open" : "Subscription"}</strong></span>
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
          <div class="chart-label">${p.title.length > 40 ? p.title.substring(0, 40) + "..." : p.title}</div>
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

    const impactBadge = $("modal-impact");
    if (impactBadge) {
      const cls = getImpactClass(p.impactFactor);
      impactBadge.className = `impact-gauge ${cls} modal-impact-badge`;
      impactBadge.textContent = `IF: ${p.impactFactor || "N/A"}`;
    }

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
        if (icon) { icon.textContent = "\u2713"; setTimeout(() => { icon.textContent = "\uD83D\uDCCB"; }, 2000); }
      });
    });
  });

  // ===== TEXT SCRAMBLE =====
  const scramble = (el, final) => {
    if (!el) return;
    const chars = "!<>-_\\/[]{}-\u2014=+*^?#________";
    const clean = final;
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
      el.textContent = out;
      if (complete === queue.length) cancelAnimationFrame(id);
      else { frame++; id = requestAnimationFrame(update); }
    };
    update();
  };

  document.querySelectorAll(".section-title").forEach(h => {
    const orig = h.textContent.trim();
    h.addEventListener("mouseenter", () => scramble(h, orig));
  });

  // ===== AI CHAT ASSISTANT =====
  const chatToggle = $("chat-toggle");
  const chatWidget = $("chat-widget");
  const chatClose = $("chat-close");
  const chatBody = $("chat-body");
  const chatInput = $("chat-input");
  const chatSend = $("chat-send");

  chatToggle?.addEventListener("click", () => {
    chatWidget.classList.toggle("open");
    chatToggle.style.display = chatWidget.classList.contains("open") ? "none" : "flex";
    if (chatWidget.classList.contains("open")) chatInput?.focus();
  });

  chatClose?.addEventListener("click", () => {
    chatWidget.classList.remove("open");
    chatToggle.style.display = "flex";
  });

  const findAnswer = (query) => {
    const q = query.toLowerCase().trim();
    for (const item of RESUME_DATA.chatQA) {
      for (const keyword of item.q) {
        if (q.includes(keyword)) return item.a;
      }
    }
    return "I can answer questions about Dr. Ashokkumar's research, publications, skills, experience, awards, patents, and contact info. Try asking about his PhD, postdoc, or specific research areas!";
  };

  const addChatMessage = (text, isUser = false) => {
    const div = document.createElement("div");
    div.className = `chat-msg ${isUser ? "user" : "bot"}`;
    div.innerHTML = `
      <div class="msg-avatar">${isUser ? "\uD83D\uDC64" : "\uD83E\uDDEC"}</div>
      <div class="msg-content">${text}</div>
    `;
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
  };

  const showTyping = () => {
    const div = document.createElement("div");
    div.className = "chat-msg bot";
    div.id = "typing-indicator";
    div.innerHTML = `
      <div class="msg-avatar">\uD83E\uDDEC</div>
      <div class="msg-content"><div class="typing-dots"><span></span><span></span><span></span></div></div>
    `;
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
  };

  const hideTyping = () => {
    const el = $("typing-indicator");
    if (el) el.remove();
  };

  const handleChat = () => {
    const text = chatInput?.value.trim();
    if (!text) return;
    addChatMessage(text, true);
    chatInput.value = "";
    showTyping();

    setTimeout(() => {
      hideTyping();
      const response = findAnswer(text);
      // Typewriter effect
      const div = document.createElement("div");
      div.className = "chat-msg bot";
      div.innerHTML = `<div class="msg-avatar">\uD83E\uDDEC</div><div class="msg-content"><span id="typewriter-text"></span></div>`;
      chatBody.appendChild(div);
      const span = div.querySelector(".msg-content span");
      let idx = 0;
      const tw = setInterval(() => {
        if (idx < response.length) {
          span.textContent += response[idx];
          idx++;
          chatBody.scrollTop = chatBody.scrollHeight;
        } else {
          clearInterval(tw);
        }
      }, 15);
    }, 600 + Math.random() * 400);
  };

  chatSend?.addEventListener("click", handleChat);
  chatInput?.addEventListener("keydown", e => { if (e.key === "Enter") handleChat(); });

  // ===== PDF DOWNLOAD =====
  $("pdf-download")?.addEventListener("click", () => {
    const pdfPath = "CV ASHOKKUMAR KUMARAVEL.pdf";
    const link = document.createElement("a");
    link.href = pdfPath;
    link.download = "CV_ASHOKKUMAR_KUMARAVEL.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    if (toast) { toast.textContent = "Downloading CV..."; toast.classList.add("show"); setTimeout(() => { toast.classList.remove("show"); toast.textContent = "Email copied to clipboard!"; }, 3000); }
  });
});
