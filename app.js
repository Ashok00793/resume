(function () {
  'use strict';

  var D = RESUME_DATA;

  /* ============ Canvas Biotech Background ============ */

  function initCanvas() {
    var canvas = document.createElement('canvas');
    canvas.id = 'bio-canvas';
    var hero = document.querySelector('.hero');
    if (!hero) return;
    hero.insertBefore(canvas, hero.firstChild);

    var ctx = canvas.getContext('2d');
    var w, h;
    var particles = [];
    var COUNT = 60;

    function resize() {
      w = canvas.width = hero.offsetWidth;
      h = canvas.height = hero.offsetHeight;
    }

    function createParticles() {
      particles = [];
      for (var i = 0; i < COUNT; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 1.5 + Math.random() * 3,
          dx: (Math.random() - 0.5) * 0.2,
          dy: (Math.random() - 0.5) * 0.2,
          phase: Math.random() * Math.PI * 2,
          speed: 0.1 + Math.random() * 0.2
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      var t = Date.now() / 1000;

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;

        var pulse = 0.4 + 0.3 * Math.sin(t * p.speed + p.phase);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(45, 143, 108, ' + (0.08 * pulse) + ')';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(45, 143, 108, ' + (0.15 * pulse) + ')';
        ctx.fill();
      }

      ctx.lineWidth = 0.5;
      for (var i = 0; i < particles.length; i++) {
        for (var j = i + 1; j < particles.length; j++) {
          var dx = particles[i].x - particles[j].x;
          var dy = particles[i].y - particles[j].y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = 'rgba(45, 143, 108, ' + (0.03 * (1 - dist / 120)) + ')';
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(draw);
    }

    resize();
    createParticles();
    draw();

    window.addEventListener('resize', function () {
      resize();
      createParticles();
    }, { passive: true });
  }

  /* ============ SVG Icons for Research ============ */

  var SVG_ICONS = {
    dna: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4c6 4 10 10 10 16"/><path d="M20 4c-6 4-10 10-10 16"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="8" y1="8" x2="16" y2="8"/><line x1="8" y1="16" x2="16" y2="16"/><line x1="4" y1="4" x2="4" y2="4"/><circle cx="4" cy="4" r="0.5"/><circle cx="20" cy="4" r="0.5"/></svg>',
    flask: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2h12"/><path d="M12 2v8"/><path d="M7 10h10"/><path d="M5 22h14l-4.5-12h-5L5 22z"/><path d="M9 16c1.5 1 4.5 1 6 0" opacity="0.5"/><path d="M10 19c1.5 0.5 3.5 0.5 5 0" opacity="0.3"/></svg>',
    cell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1.5"/><path d="M12 3v4"/><path d="M12 17v4"/><path d="M3 12h4"/><path d="M17 12h4"/><path d="M7 7l2 2" opacity="0.4"/><path d="M17 7l-2 2" opacity="0.4"/></svg>',
    leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c-4 0-7 3-7 7v5"/><path d="M12 2v14"/><path d="M5 14c0 4 3 7 7 7s7-3 7-7V9c0-4-3-7-7-7z"/><path d="M8 10c1.5-1 4.5-1 6 0" opacity="0.4"/><path d="M9 13c1.5-0.5 4.5-0.5 6 0" opacity="0.3"/></svg>',
    microbe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="10" rx="7" ry="4"/><path d="M5 10v2c0 2.2 3.1 4 7 4s7-1.8 7-4v-2"/><path d="M5 14v2c0 2.2 3.1 4 7 4s7-1.8 7-4v-2"/><circle cx="10" cy="9" r="0.8" opacity="0.5"/><circle cx="14" cy="9" r="0.8" opacity="0.5"/></svg>',
    atom: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5" fill="currentColor"/><ellipse cx="12" cy="12" rx="9" ry="3" transform="rotate(0 12 12)" opacity="0.5"/><ellipse cx="12" cy="12" rx="9" ry="3" transform="rotate(60 12 12)" opacity="0.5"/><ellipse cx="12" cy="12" rx="9" ry="3" transform="rotate(120 12 12)" opacity="0.5"/></svg>',
    gene: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16"/><path d="M8 8h12"/><path d="M6 12h14"/><path d="M4 16h16"/><path d="M8 20h12"/><circle cx="4" cy="4" r="0.8" fill="currentColor"/><circle cx="4" cy="12" r="0.8" fill="currentColor"/><circle cx="4" cy="20" r="0.8" fill="currentColor"/></svg>',
    code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="8 7 3 12 8 17"/><polyline points="16 7 21 12 16 17"/><line x1="14" y1="5" x2="10" y2="19"/></svg>',
    grad: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10l-10-5L2 10l10 5 10-5z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/><path d="M2 10v6"/></svg>',
    work: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><path d="M12 12v4"/><path d="M8 14h8"/></svg>',
    email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4l-10 8L2 4"/></svg>',
    link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    molecule: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="12" cy="18" r="2"/><line x1="7.5" y1="7.5" x2="10.5" y2="16.5"/><line x1="16.5" y1="7.5" x2="13.5" y2="16.5"/><line x1="8" y1="6" x2="16" y2="6"/></svg>',
    bio: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a8 8 0 0 0-8 8c0 6 8 12 8 12s8-6 8-12a8 8 0 0 0-8-8z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    gear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
    dock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h16"/><path d="M4 4h3l5 8-5 8H4l5-8-5-8z"/><path d="M13 4h3l5 8-5 8h-3l5-8-5-8z"/><path d="M13 12h4" opacity="0.5"/></svg>',
    cpu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/><path d="M1 9h3"/><path d="M1 15h3"/><path d="M20 9h3"/><path d="M20 15h3"/></svg>',
    award: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="5"/><path d="M8.5 12.5 7 22l5-3 5 3-1.5-9.5"/><path d="m10 8 1.3 1.3L14 6.7"/></svg>',
    patent: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h9l3 3v15H6z"/><path d="M15 3v4h4"/><path d="M9 12h6M9 16h6"/><path d="M9 8h2"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21z"/><path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5A2.5 2.5 0 0 1 20 21z"/></svg>',
    presentation: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M12 16v4M8 20h8M7 8h10M7 11h6"/></svg>'
  };

  /* ============ DOM Helper ============ */

  function ce(tag, attrs, children) {
    var el = document.createElement(tag);
    if (attrs) {
      for (var key in attrs) {
        if (key === 'className') el.className = attrs[key];
        else if (key === 'htmlFor') el.htmlFor = attrs[key];
        else if (key === 'innerHTML') el.innerHTML = attrs[key];
        else if (key.startsWith('on')) el.addEventListener(key.slice(2).toLowerCase(), attrs[key]);
        else el.setAttribute(key, attrs[key]);
      }
    }
    if (children) {
      for (var i = 0; i < children.length; i++) {
        var c = children[i];
        if (typeof c === 'string') el.appendChild(document.createTextNode(c));
        else if (c) el.appendChild(c);
      }
    }
    return el;
  }

  /* ============ Navigation ============ */

  function initNav() {
    var header = document.getElementById('header');
    var toggle = document.getElementById('header-toggle');
    var nav = document.getElementById('header-nav');

    if (toggle && nav) {
      toggle.addEventListener('click', function () {
        var open = nav.classList.toggle('header__nav--open');
        toggle.setAttribute('aria-expanded', open);
      });
      nav.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          nav.classList.remove('header__nav--open');
          toggle.setAttribute('aria-expanded', 'false');
        });
      });
    }

    window.addEventListener('scroll', function () {
      header.classList.toggle('header--scrolled', window.scrollY > 40);
      var current = '';
      document.querySelectorAll('.section').forEach(function (sec) {
        if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
      });
      document.querySelectorAll('.header__link').forEach(function (a) {
        a.classList.toggle('header__link--active', a.getAttribute('href') === '#' + current);
      });
    }, { passive: true });
  }

  /* ============ Scroll Reveal ============ */

  function initReveal() {
    var els = document.querySelectorAll('.research-atlas, .research-atlas__thread, .research-card, .publication-studio__intro, .pub-card, .journey-overview, .journey-controls, .skills-atlas, .skill-card, .proficiency-card, .scholarly-studio__intro, .scholarly-panel, .scholarly-entry, .project-card, .contact__link, .impact-summary, .impact-card, .section__header');
    document.querySelectorAll('.research-grid, .pub-list, .skills-grid, .project-grid, .scholarly-layout, .impact-layout').forEach(function(g) { g.classList.add('reveal-stagger'); });
    if (!els.length) return;
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('reveal--visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -30px 0px' });
    els.forEach(function (el) {
      el.classList.add('reveal');
      obs.observe(el);
    });
  }

  /* ============ Hero Stats ============ */

  function renderStats() {
    var container = document.getElementById('hero-stats');
    if (!container || !D.personal.stats) return;
    var s = D.personal.stats;
    [
      { val: s.citations, label: 'Citations' },
      { val: s.hIndex, label: 'h-index' },
      { val: s.i10Index, label: 'i10-index' },
      { val: s.totalPublications, label: 'Publications' }
    ].forEach(function (item) {
      container.appendChild(ce('div', { className: 'hero__stat' }, [
        ce('span', { className: 'hero__stat-value' }, ['' + item.val]),
        ce('span', { className: 'hero__stat-label' }, [item.label])
      ]));
    });
  }

  function formatSnapshotDate(value) {
    if (!value) return 'Verification date unavailable';
    var parts = value.split('-');
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    if (parts.length !== 3 || !months[Number(parts[1]) - 1]) return 'Verified ' + value;
    return 'Verified ' + Number(parts[2]) + ' ' + months[Number(parts[1]) - 1] + ' ' + parts[0];
  }

  function copyProfileSummary(snapshot, status) {
    var text = 'Dr. Ashokkumar Kumaravel | ' + snapshot.citations + ' citations | h-index ' + snapshot.hIndex + ' | i10-index ' + snapshot.i10Index;
    function copied() {
      if (!status) return;
      status.textContent = 'Summary copied';
      window.setTimeout(function () { status.textContent = ''; }, 2400);
    }
    function fallback() {
      var textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      var success = false;
      try { success = document.execCommand('copy'); } catch (_) {}
      document.body.removeChild(textarea);
      if (success) copied();
      else if (status) status.textContent = 'Copy unavailable';
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(copied).catch(fallback);
    } else {
      fallback();
    }
  }

  function renderScholarImpact() {
    var metricsContainer = document.getElementById('impact-metrics');
    var list = document.getElementById('impact-list');
    var sourceLink = document.getElementById('impact-source-link');
    var verified = document.querySelector('[data-scholar-verified]');
    var copyButton = document.getElementById('impact-copy');
    var copyStatus = document.getElementById('impact-copy-status');
    if (!metricsContainer || !list) return;

    var stats = D.personal && D.personal.stats ? D.personal.stats : {};
    var snapshot = D.scholarSnapshot || {
      citations: stats.citations || 0,
      hIndex: stats.hIndex || 0,
      i10Index: stats.i10Index || 0,
      profileUrl: D.personal && D.personal.googleScholar
    };
    var metrics = [
      { value: snapshot.citations || 0, label: 'Citations' },
      { value: snapshot.hIndex || 0, label: 'h-index' },
      { value: snapshot.i10Index || 0, label: 'i10-index' }
    ];
    metricsContainer.innerHTML = '';
    metrics.forEach(function (metric) {
      metricsContainer.appendChild(ce('div', { className: 'impact-metric' }, [
        ce('span', { className: 'impact-metric__value' }, ['' + metric.value]),
        ce('span', { className: 'impact-metric__label' }, [metric.label])
      ]));
    });
    if (sourceLink && snapshot.profileUrl) sourceLink.setAttribute('href', snapshot.profileUrl);
    if (verified) verified.textContent = formatSnapshotDate(snapshot.verifiedOn);

    var publications = Array.isArray(D.publications) ? D.publications.slice().sort(function (a, b) {
      return (b.citations || 0) - (a.citations || 0);
    }).slice(0, 5) : [];
    var maxCitations = publications.reduce(function (max, publication) {
      return Math.max(max, publication.citations || 0);
    }, 0);
    list.innerHTML = '';
    if (publications.length === 0) {
      list.appendChild(ce('p', { className: 'impact-list__empty' }, ['Publication citation data is not available yet.']));
    } else {
      publications.forEach(function (publication) {
        var citations = publication.citations || 0;
        var width = citations && maxCitations ? Math.max(8, Math.round(citations / maxCitations * 100)) : 0;
        var track = ce('div', {
          className: 'impact-row__track',
          role: 'progressbar',
          'aria-label': publication.title + ' citations',
          'aria-valuemin': '0',
          'aria-valuemax': '' + maxCitations,
          'aria-valuenow': '' + citations
        }, [ce('span', { className: 'impact-row__fill', style: 'width: ' + width + '%' }, [])]);
        list.appendChild(ce('article', { className: 'impact-row', role: 'listitem' }, [
          ce('div', { className: 'impact-row__top' }, [
            ce('button', { className: 'impact-row__title', type: 'button', onClick: function () { openDialog(publication); } }, [publication.title]),
            ce('span', { className: 'impact-row__count' }, [citations + ' cites'])
          ]),
          track,
          ce('div', { className: 'impact-row__meta' }, [(publication.journal || 'Publication') + ' · ' + (publication.year || '—')])
        ]));
      });
    }
    if (copyButton && copyButton.getAttribute('data-bound') !== 'true') {
      copyButton.setAttribute('data-bound', 'true');
      copyButton.addEventListener('click', function () { copyProfileSummary(snapshot, copyStatus); });
    }
  }

  /* ============ Research Grid ============ */

  function renderResearch() {
    var grid = document.getElementById('research-grid');
    var statsContainer = document.getElementById('research-stats');
    if (!grid) return;

    var icons = [SVG_ICONS.dna, SVG_ICONS.flask, SVG_ICONS.cell, SVG_ICONS.leaf];
    var themes = [
      { title: 'Cell-Surface Display', eyebrow: '01 / Engineer the interface', signal: 'Living filtration', desc: 'Engineered E. coli surface display via outer membrane protein anchors (OmpC, YiaT) for selective heavy metal binding and whole-cell biocatalysis.', tags: ['Peptide display', 'Metal selectivity', 'Biocatalysis'] },
      { title: 'Nanomaterial Synthesis', eyebrow: '02 / Make materials useful', signal: 'Functional matter', desc: 'Green, chemical, and microbial routes to functional nanoparticles (Co3O4, NiO, Ag) for photocatalytic wastewater treatment and anticancer applications.', tags: ['Co₃O₄ NPs', 'NiO NPs', 'Photocatalysis'] },
      { title: 'Metabolic Engineering', eyebrow: '03 / Redirect the cell', signal: 'Pathway flux', desc: 'Pathway colocalization via synthetic protein scaffolds for high-yield bioproduction of L-serine, GABA, and malic acid in recombinant E. coli.', tags: ['Protein scaffolds', 'Amino acids', 'Flux optimization'] },
      { title: 'Waste Valorization & Biomaterials', eyebrow: '04 / Close the loop', signal: 'Circular systems', desc: 'Converting agricultural waste into high-performance bacterial cellulose membranes and engineering P. denitrificans for sustainable biopolymer production.', tags: ['Bacterial cellulose', 'P3HP', '~40% improvement'] }
    ];
    var contentMap = [
      {
        detail: 'I engineer E. coli to display metal-binding peptides on its outer membrane by fusing them with anchor proteins (OmpC, YiaT). This creates whole-cell biocatalysts that selectively adsorb heavy metals (Ni²+, Co²+) from industrial wastewater — a living filtration platform. The metal-laden biomass can then be calcined into functional metal oxide nanoparticles.',
        related: ['Bioremediation', 'Cell-Surface Display', 'Wastewater']
      },
      {
        detail: 'I synthesize functional nanoparticles (Co₃O₄, NiO, Ag, TiO₂) through green, chemical, and microbial routes. These nanomaterials are applied in photocatalytic dye degradation, antibacterial textiles, and anticancer treatments. My work on green synthesis uses plant extracts (Alternanthera sessilis) to produce colloidal silver nanoparticles for biomedical and textile applications.',
        related: ['Nanomaterials', 'Photocatalysis', 'Wound Healing']
      },
      {
        detail: 'I use synthetic protein scaffolds to colocalize pathway enzymes, optimizing metabolic flux for high-yield bioproduction. Successfully engineered E. coli for L-serine (via SerB/EamA scaffold), GABA (via GadB surface display), and isopropanol production. My scaffold strategies overcome thermodynamic limitations and prevent toxic intermediate accumulation.',
        related: ['Metabolic Eng', 'Protein Scaffold', 'Synthetic Biology']
      },
      {
        detail: 'I convert agricultural waste into bacterial cellulose membranes for biomedical applications and engineer Paracoccus denitrificans for sustainable biopolymer (P3HP) production. This line integrates circular economy principles with industrial biotechnology — turning waste streams into high-value biomaterials.',
        related: ['Biomaterials', 'Microbiology', 'Bioprocess Engineering']
      }
    ];

    if (statsContainer) {
      var snapshot = D.scholarSnapshot || D.personal.stats;
      var stats = [
        { value: themes.length, label: 'Research lines' },
        { value: D.personal.stats.totalPublications, label: 'Portfolio publications' },
        { value: snapshot.citations, label: 'Scholar citations' }
      ];
      statsContainer.innerHTML = '';
      stats.forEach(function (stat) {
        statsContainer.appendChild(ce('div', { className: 'research-atlas__stat' }, [
          ce('strong', {}, [String(stat.value)]),
          ce('span', {}, [stat.label])
        ]));
      });
    }

    grid.innerHTML = '';
    themes.forEach(function (theme, index) {
      var card = ce('article', {
        className: 'research-card research-card--' + (index + 1),
        role: 'button',
        tabindex: '0',
        'aria-label': 'Explore research focus: ' + theme.title,
        onClick: function () { openResearchDialog(theme, contentMap[index]); }
      }, [
        ce('div', { className: 'research-card__top' }, [
          ce('span', { className: 'research-card__number' }, [('0' + (index + 1)).slice(-2)]),
          ce('span', { className: 'research-card__signal' }, [theme.signal])
        ]),
        ce('div', { className: 'research-card__icon' }, [ce('div', { innerHTML: icons[index] })]),
        ce('span', { className: 'research-card__eyebrow' }, [theme.eyebrow]),
        ce('h3', { className: 'research-card__title' }, [theme.title]),
        ce('p', { className: 'research-card__desc' }, [theme.desc]),
        ce('div', { className: 'research-card__tags' }, theme.tags.map(function (tag) { return ce('span', { className: 'research-card__tag' }, [tag]); })),
        ce('span', { className: 'research-card__explore' }, ['Open research lens', ce('span', { 'aria-hidden': 'true' }, ['→'])])
      ]);
      card.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openResearchDialog(theme, contentMap[index]);
        }
      });
      grid.appendChild(card);
    });
  }

  /* ============ Research Dialog ============ */

  function openResearchDialog(topic, content) {
    var dialog = document.getElementById('pub-dialog');
    if (!dialog) return;
    document.getElementById('pub-dialog-journal').textContent = 'Research Focus';
    document.getElementById('pub-dialog-title').textContent = topic.title;
    document.getElementById('pub-dialog-abstract').textContent = content.detail;

    var meta = document.getElementById('pub-dialog-meta');
    meta.innerHTML = '';
    (content.related || []).forEach(function (tag) { meta.appendChild(ce('span', {}, [tag])); });

    var actions = document.getElementById('pub-dialog-actions');
    actions.innerHTML = '';
    var btn = ce('button', { className: 'btn btn--primary', onClick: function () {
      dialog.close();
      document.getElementById('publications').scrollIntoView({ behavior: 'smooth' });
      var search = document.getElementById('pub-search');
      if (search) { search.value = topic.title; search.dispatchEvent(new Event('input')); }
    } }, ['View Related Publications']);
    actions.appendChild(btn);
    actions.appendChild(ce('button', { className: 'btn btn--outline', onClick: function () { dialog.close(); } }, ['Close']));

    document.getElementById('pub-dialog-close').onclick = function () { dialog.close(); };
    dialog.showModal();
    dialog.addEventListener('click', function (e) { if (e.target === dialog) dialog.close(); }, { once: true });
  }

  /* ============ Publications ============ */

  function renderPublicationSummary() {
    var container = document.getElementById('publication-stats');
    if (!container) return;
    var publications = Array.isArray(D.publications) ? D.publications : [];
    var snapshot = D.scholarSnapshot || D.personal.stats;
    var latestYear = publications.reduce(function (latest, publication) {
      return Math.max(latest, publication.year || 0);
    }, 0);
    var q1Count = publications.filter(function (publication) { return publication.quartile === 'Q1'; }).length;
    var stats = [
      { value: D.personal.stats.totalPublications, label: 'Portfolio works' },
      { value: snapshot.citations, label: 'Scholar citations' },
      { value: q1Count, label: 'Q1 articles' },
      { value: latestYear, label: 'Latest year' }
    ];
    container.innerHTML = '';
    stats.forEach(function (stat) {
      container.appendChild(ce('div', { className: 'publication-studio__stat' }, [
        ce('strong', {}, [String(stat.value)]),
        ce('span', {}, [stat.label])
      ]));
    });
  }

  function initPublications() {
    var search = document.getElementById('pub-search');
    var filter = document.getElementById('pub-filter');
    var sort = document.getElementById('pub-sort');
    var reset = document.getElementById('pub-reset');
    var count = document.getElementById('pub-count');
    var list = document.getElementById('pub-list');
    if (!list) return;

    var tags = new Set();
    D.publications.forEach(function (publication) { (publication.tags || []).forEach(function (tag) { tags.add(tag); }); });
    filter.innerHTML = '';
    filter.appendChild(ce('option', { value: 'all' }, ['All Topics']));
    tags.forEach(function (tag) {
      filter.appendChild(ce('option', { value: tag.toLowerCase() }, [tag]));
    });

    var maxCitations = D.publications.reduce(function (max, publication) {
      return Math.max(max, publication.citations || 0);
    }, 0);

    function render() {
      var query = (search.value || '').toLowerCase();
      var selectedTopic = filter.value;
      var sortMode = sort.value;
      var filtered = D.publications.filter(function (publication) {
        var searchable = [publication.title, publication.journal, publication.abstract || ''].concat(publication.tags || []).join(' ').toLowerCase();
        if (query && !searchable.includes(query)) return false;
        if (selectedTopic !== 'all' && !(publication.tags || []).some(function (tag) { return tag.toLowerCase() === selectedTopic; })) return false;
        return true;
      });
      filtered.sort(function (a, b) {
        if (sortMode === 'citations') return (b.citations || 0) - (a.citations || 0);
        if (sortMode === 'impact') return parseFloat(b.impactFactor || 0) - parseFloat(a.impactFactor || 0);
        return (b.year || 0) - (a.year || 0);
      });

      list.innerHTML = '';
      if (filtered.length === 0) {
        list.appendChild(ce('p', { className: 'pub-empty' }, ['No publications match your filters.']));
      } else {
        filtered.forEach(function (publication, index) {
          var citations = publication.citations || 0;
          var width = maxCitations && citations ? Math.max(6, Math.round(citations / maxCitations * 100)) : 0;
          var publicationTags = (publication.tags || []).slice(0, 3).map(function (tag) {
            return ce('span', { className: 'pub-card__tag' }, [tag]);
          });
          if (publication.autoDetected) publicationTags.unshift(ce('span', { className: 'pub-card__tag pub-card__tag--auto' }, ['auto']));
          var impactBadge = publication.impactFactor ? ce('span', { className: 'pub-card__if' }, ['IF: ' + publication.impactFactor + (publication.quartile ? ' · ' + publication.quartile : '')]) : null;
          var card = ce('article', {
            className: 'pub-card' + (index === 0 ? ' pub-card--featured' : ''),
            role: 'listitem',
            'data-pub-id': publication.id || publication.title
          }, [
            ce('div', { className: 'pub-card__rail' }, [
              ce('span', { className: 'pub-card__index' }, [padCount(index + 1)]),
              ce('span', { className: 'pub-card__year' }, [String(publication.year || '—')]),
              ce('span', { className: 'pub-card__rail-line' }, [])
            ]),
            ce('div', { className: 'pub-card__body' }, [
              ce('div', { className: 'pub-card__top' }, [
                ce('span', { className: 'pub-card__journal' }, [publication.journal]),
                impactBadge
              ]),
              ce('button', { className: 'pub-card__title', type: 'button', onClick: function () { openDialog(publication); } }, [publication.title]),
              ce('div', { className: 'pub-card__tags' }, publicationTags),
              ce('div', { className: 'pub-card__metrics' }, [
                ce('span', { className: 'pub-card__citations' }, [citations + ' citations']),
                ce('span', {
                  className: 'pub-card__bar',
                  role: 'progressbar',
                  'aria-label': publication.title + ' citation signal',
                  'aria-valuemin': '0',
                  'aria-valuemax': String(maxCitations),
                  'aria-valuenow': String(citations)
                }, [ce('span', { className: 'pub-card__bar-fill', style: 'width: ' + width + '%' }, [])])
              ])
            ])
          ]);
          list.appendChild(card);
        });
      }
      count.textContent = filtered.length + ' publication' + (filtered.length !== 1 ? 's' : '');
    }

    if (search.getAttribute('data-bound') !== 'true') {
      search.setAttribute('data-bound', 'true');
      filter.setAttribute('data-bound', 'true');
      sort.setAttribute('data-bound', 'true');
      reset.setAttribute('data-bound', 'true');
      search.addEventListener('input', render);
      filter.addEventListener('change', render);
      sort.addEventListener('change', render);
      reset.addEventListener('click', function () {
        search.value = '';
        filter.value = 'all';
        sort.value = 'year';
        render();
      });
    }
    render();
  }

  /* ============ Publication Dialog ============ */

  function openDialog(pub) {
    var dialog = document.getElementById('pub-dialog');
    if (!dialog) return;
    document.getElementById('pub-dialog-journal').textContent = pub.journal + ' (' + pub.year + ')';
    document.getElementById('pub-dialog-title').textContent = pub.title;
    document.getElementById('pub-dialog-abstract').textContent = pub.abstract || 'Abstract not available.';

    var meta = document.getElementById('pub-dialog-meta');
    meta.innerHTML = '';
    meta.appendChild(ce('span', {}, ['Citations: ' + pub.citations]));
    meta.appendChild(ce('span', {}, ['IF: ' + pub.impactFactor + (pub.quartile ? ' (' + pub.quartile + ')' : '')]));
    (pub.tags || []).forEach(function (t) { meta.appendChild(ce('span', {}, [t])); });

    var actions = document.getElementById('pub-dialog-actions');
    actions.innerHTML = '';
    if (pub.doi) actions.appendChild(ce('a', { className: 'btn btn--primary', href: pub.doi, target: '_blank', rel: 'noopener noreferrer' }, ['Open DOI']));
    if (pub.pdf_url) actions.appendChild(ce('a', { className: 'btn btn--outline', href: pub.pdf_url, target: '_blank', rel: 'noopener noreferrer' }, ['Open Article']));

    document.getElementById('pub-dialog-close').onclick = function () { dialog.close(); };
    dialog.showModal();
    dialog.addEventListener('click', function (e) { if (e.target === dialog) dialog.close(); }, { once: true });
  }

  /* ============ Journey Board ============ */

  function renderJourney() {
    var container = document.getElementById('journey-board');
    var count = document.getElementById('journey-count');
    if (!container || !D.education || !D.experience) return;

    function classifyExperience(item) {
      var role = item.role.toLowerCase();
      var kinds = [];
      if (/research|post-doctoral|fellow|professor/.test(role)) kinds.push('research');
      if (/professor|teaching|lecturer/.test(role)) kinds.push('teaching');
      return kinds.length ? kinds : ['research'];
    }
    var experience = D.experience.map(function (item, index) {
      return {
        type: 'experience',
        index: index + 1,
        title: item.role,
        organization: item.organization,
        location: item.location,
        period: item.period,
        details: item.details,
        kinds: classifyExperience(item),
        current: /present/i.test(item.period)
      };
    });
    var education = D.education.map(function (item, index) {
      return {
        type: 'education',
        index: index + 1,
        title: item.degree,
        organization: item.institution,
        location: item.location,
        period: item.period,
        details: item.details,
        grade: item.grade,
        mentor: item.mentor,
        kinds: ['academic'],
        current: false
      };
    });
    var entries = experience.concat(education);
    var filters = document.querySelectorAll('[data-journey-filter]');

    function makeCard(item) {
      var meta = [
        ce('span', {}, [item.period]),
        item.location ? ce('span', {}, [item.location]) : null
      ].filter(Boolean);
      var badges = [];
      if (item.current) badges.push(ce('span', { className: 'journey-card__badge journey-card__badge--current' }, ['Current chapter']));
      if (item.grade) badges.push(ce('span', { className: 'journey-card__badge' }, [item.grade]));
      if (item.mentor) badges.push(ce('span', { className: 'journey-card__badge' }, [item.mentor]));
      return ce('article', {
        className: 'journey-card journey-card--' + item.type + (item.current ? ' journey-card--current' : ''),
        'data-journey-entry': item.type,
        'data-journey-kinds': item.kinds.join(' '),
        role: 'listitem'
      }, [
        ce('div', { className: 'journey-card__top' }, [
          ce('span', { className: 'journey-card__index' }, [('0' + item.index).slice(-2)]),
          ce('span', { className: 'journey-card__type' }, [item.type === 'experience' ? 'Professional' : 'Academic'])
        ]),
        ce('h4', { className: 'journey-card__title' }, [item.title]),
        ce('p', { className: 'journey-card__org' }, [item.organization]),
        ce('div', { className: 'journey-card__meta' }, meta),
        ce('p', { className: 'journey-card__desc' }, [item.details]),
        badges.length ? ce('div', { className: 'journey-card__badges' }, badges) : null
      ]);
    }

    function makeLane(title, eyebrow, number, items, type) {
      var lane = ce('section', { className: 'journey-lane journey-lane--' + type, 'aria-label': title }, [
        ce('div', { className: 'journey-lane__header' }, [
          ce('span', { className: 'journey-lane__number' }, [number]),
          ce('div', {}, [
            ce('span', { className: 'journey-lane__eyebrow' }, [eyebrow]),
            ce('h3', { className: 'journey-lane__title' }, [title])
          ])
        ]),
        ce('div', { className: 'journey-lane__cards', role: 'list' }, items.length ? items.map(makeCard) : [ce('p', { className: 'journey-lane__empty' }, ['No entries in this view.'])])
      ]);
      if (!items.length) lane.setAttribute('hidden', '');
      return lane;
    }

    function render(filter) {
      var visible = entries.filter(function (item) {
        return filter === 'all' || item.kinds.indexOf(filter) !== -1;
      });
      var visibleExperience = visible.filter(function (item) { return item.type === 'experience'; });
      var visibleEducation = visible.filter(function (item) { return item.type === 'education'; });
      container.classList.toggle('journey-board--single', visibleExperience.length === 0 || visibleEducation.length === 0);
      container.innerHTML = '';
      container.appendChild(makeLane('Professional experience', 'Practice', '01', visibleExperience, 'experience'));
      container.appendChild(makeLane('Academic foundation', 'Education', '02', visibleEducation, 'education'));
      count.textContent = visible.length + (visible.length === 1 ? ' entry' : ' entries') + ' shown';
    }

    if (filters.length && filters[0].getAttribute('data-bound') !== 'true') {
      filters[0].setAttribute('data-bound', 'true');
      filters.forEach(function (button) {
        button.addEventListener('click', function () {
          filters.forEach(function (item) {
            item.classList.remove('is-active');
            item.setAttribute('aria-pressed', 'false');
          });
          button.classList.add('is-active');
          button.setAttribute('aria-pressed', 'true');
          render(button.getAttribute('data-journey-filter'));
        });
      });
    }
    render('all');
  }

  /* ============ Skills ============ */

  function renderSkills() {
    var bars = document.getElementById('proficiency-bars');
    var grid = document.getElementById('skills-grid');
    var atlasStats = document.getElementById('skills-atlas-stats');
    if (!bars || !grid) return;

    var groups = [
      { key: 'molecular', title: 'Molecular Biology', kicker: 'Build & manipulate', items: D.skills.molecular, icon: SVG_ICONS.microbe },
      { key: 'material', title: 'Nanomaterials', kicker: 'Make & recover', items: D.skills.material, icon: SVG_ICONS.molecule },
      { key: 'analytical', title: 'Analytical Techniques', kicker: 'Measure & verify', items: D.skills.analytical, icon: SVG_ICONS.atom },
      { key: 'computational', title: 'Computational Practice', kicker: 'Model & interpret', items: D.skills.software, icon: SVG_ICONS.code }
    ];
    var totalSkills = groups.reduce(function (total, group) { return total + group.items.length; }, 0);
    var averageProficiency = D.skillProficiency ? Math.round(D.skillProficiency.values.reduce(function (total, value) { return total + value; }, 0) / D.skillProficiency.values.length) : 0;
    var atlasValues = [
      { value: totalSkills, label: 'Techniques' },
      { value: groups.length, label: 'Practice areas' },
      { value: averageProficiency + '%', label: 'Avg. proficiency' }
    ];
    if (atlasStats) {
      atlasStats.innerHTML = '';
      atlasValues.forEach(function (stat) {
        atlasStats.appendChild(ce('div', { className: 'skills-atlas__stat' }, [
          ce('strong', {}, [String(stat.value)]),
          ce('span', {}, [stat.label])
        ]));
      });
    }

    bars.innerHTML = '';
    if (D.skillProficiency) {
      D.skillProficiency.labels.forEach(function (label, i) {
        var value = D.skillProficiency.values[i];
        bars.appendChild(ce('div', { className: 'proficiency-row', 'data-skill-signal': label }, [
          ce('div', { className: 'proficiency-row__header' }, [
            ce('span', {}, [label]),
            ce('strong', {}, [value + '%'])
          ]),
          ce('div', {
            className: 'proficiency-row__track',
            role: 'progressbar',
            'aria-label': label + ' proficiency',
            'aria-valuemin': '0',
            'aria-valuemax': '100',
            'aria-valuenow': String(value)
          }, [ce('span', { className: 'proficiency-row__fill', style: 'width: ' + value + '%' }, [])])
        ]));
      });
    }

    grid.innerHTML = '';
    groups.forEach(function (group, index) {
      grid.appendChild(ce('article', { className: 'skill-card', 'data-skill-domain': group.key }, [
        ce('div', { className: 'skill-card__top' }, [
          ce('span', { className: 'skill-card__index' }, [('0' + (index + 1)).slice(-2)]),
          ce('span', { className: 'skill-card__count' }, [group.items.length + ' tools'])
        ]),
        ce('div', { className: 'skill-card__icon', innerHTML: group.icon }),
        ce('h3', { className: 'skill-card__title' }, [group.title]),
        ce('ul', { className: 'skill-card__list' }, group.items.map(function (item) { return ce('li', {}, [item]); })),
        ce('div', { className: 'skill-card__footer' }, [ce('span', {}, [group.kicker])])
      ]));
    });
  }

  /* ============ Scholar Card ============ */

  function padCount(value) {
    return ('0' + value).slice(-2);
  }

  function renderScholarlySummary() {
    var container = document.getElementById('scholarly-stats');
    var values = [
      { value: D.awards ? D.awards.length : 0, label: 'Awards' },
      { value: D.patent ? 1 : 0, label: 'Patent' },
      { value: D.conferenceProceedings ? D.conferenceProceedings.length : 0, label: 'Proceedings' },
      { value: D.bookChapters ? D.bookChapters.length : 0, label: 'Chapters' },
      { value: D.githubProjects ? D.githubProjects.length : 0, label: 'Projects' }
    ];
    if (container) {
      container.innerHTML = '';
      values.forEach(function (item) {
        container.appendChild(ce('div', { className: 'scholarly-studio__stat' }, [
          ce('strong', {}, [padCount(item.value)]),
          ce('span', {}, [item.label])
        ]));
      });
    }
    var counts = {
      'awards-count': D.awards ? D.awards.length : 0,
      'conference-count': D.conferenceProceedings ? D.conferenceProceedings.length : 0,
      'chapter-count': D.bookChapters ? D.bookChapters.length : 0,
      'project-count': D.githubProjects ? D.githubProjects.length : 0
    };
    Object.keys(counts).forEach(function (id) {
      var element = document.getElementById(id);
      if (element) element.textContent = padCount(counts[id]) + ' entries';
    });
  }

  function renderScholarCard(id, title, itemsFn) {
    var container = document.getElementById(id);
    if (!container) return;
    container.innerHTML = '';
    itemsFn(container);
  }

  function makeScholarlySummary(index, title, meta, description, status, className) {
    return ce('article', { className: 'scholarly-entry ' + className }, [
      ce('div', { className: 'scholarly-entry__rail' }, [
        ce('span', { className: 'scholarly-entry__index' }, [padCount(index)]),
        ce('span', { className: 'scholarly-entry__line' }, [])
      ]),
      ce('div', { className: 'scholarly-entry__body' }, [
        ce('div', { className: 'scholarly-entry__top' }, [
          ce('h4', { className: 'scholarly-entry__title' }, [title]),
          status ? ce('span', { className: 'scholarly-entry__status scholarly-entry__status--' + (status === 'Published' || status === 'Recognized' ? 'finished' : 'progress') }, [status]) : null
        ]),
        ce('p', { className: 'scholarly-entry__meta' }, [meta]),
        ce('p', { className: 'scholarly-entry__desc' }, [description])
      ])
    ]);
  }

  function renderAwards(container) {
    if (!D.awards) return;
    var list = ce('div', { className: 'scholarly-list' }, []);
    D.awards.forEach(function (award, index) {
      list.appendChild(makeScholarlySummary(index + 1, award.title, award.agency + ' · ' + award.period, award.description, 'Recognized', 'scholarly-entry--award'));
    });
    container.appendChild(list);
  }

  function renderPatent(container) {
    if (!D.patent) return;
    var patent = D.patent;
    var meta = ce('div', { className: 'patent-card__meta' }, [
      ce('div', {}, [ce('span', {}, ['Application']), ce('strong', {}, [patent.applicationNo])]),
      ce('div', {}, [ce('span', {}, ['Filed']), ce('strong', {}, [patent.date])]),
      ce('div', {}, [ce('span', {}, ['Agency']), ce('strong', {}, [patent.agency])]),
      ce('div', {}, [ce('span', {}, ['Inventors']), ce('strong', {}, [patent.inventors])])
    ]);
    container.appendChild(ce('article', { className: 'patent-card' }, [
      ce('div', { className: 'patent-card__top' }, [
        ce('span', { className: 'patent-card__label' }, ['Published patent']),
        ce('span', { className: 'patent-card__icon', innerHTML: SVG_ICONS.patent })
      ]),
      ce('h4', { className: 'patent-card__title' }, [patent.title]),
      ce('p', { className: 'patent-card__desc' }, [patent.description]),
      meta
    ]));
  }

  function renderBookChapters(container) {
    if (!D.bookChapters) return;
    var accordion = ce('div', { className: 'scholarly-accordion__list' }, []);
    D.bookChapters.forEach(function (chapter, index) {
      var attributes = { className: 'scholarly-entry scholarly-entry--chapter' };
      if (index < 2) attributes.open = 'open';
      var details = ce('details', attributes, [
        ce('summary', { className: 'scholarly-entry__summary' }, [
          ce('span', { className: 'scholarly-entry__summary-main' }, [
            ce('span', { className: 'scholarly-entry__index' }, [padCount(index + 1)]),
            ce('span', { className: 'scholarly-entry__summary-title' }, [chapter.title])
          ]),
          ce('span', { className: 'scholarly-entry__status scholarly-entry__status--' + (chapter.status === 'Published' ? 'finished' : 'progress') }, [chapter.status])
        ]),
        ce('div', { className: 'scholarly-entry__details' }, [
          ce('p', {}, [chapter.authors]),
          ce('p', {}, [chapter.publisher + (chapter.series ? ' · ' + chapter.series : '')]),
          chapter.url ? ce('a', { className: 'scholarly-entry__link', href: chapter.url, target: '_blank', rel: 'noopener noreferrer' }, ['View published chapter ↗']) : null
        ])
      ]);
      accordion.appendChild(details);
    });
    container.appendChild(accordion);
  }

  function renderConferences(container) {
    if (!D.conferenceProceedings) return;
    var accordion = ce('div', { className: 'scholarly-accordion__list' }, []);
    D.conferenceProceedings.forEach(function (conference, index) {
      var attributes = { className: 'scholarly-entry scholarly-entry--conference' };
      if (index < 2) attributes.open = 'open';
      var details = ce('details', attributes, [
        ce('summary', { className: 'scholarly-entry__summary' }, [
          ce('span', { className: 'scholarly-entry__summary-main' }, [
            ce('span', { className: 'scholarly-entry__year' }, [String(conference.year)]),
            ce('span', { className: 'scholarly-entry__summary-title' }, [conference.title])
          ])
        ]),
        ce('div', { className: 'scholarly-entry__details' }, [
          ce('p', {}, [conference.conference]),
          ce('p', {}, [conference.authors]),
          ce('p', {}, [conference.date + (conference.page ? ' · Page ' + conference.page : '')])
        ])
      ]);
      accordion.appendChild(details);
    });
    container.appendChild(accordion);
  }

  function renderProjects(container) {
    if (!D.githubProjects) return;
    var projectIcons = [SVG_ICONS.bio, SVG_ICONS.gear, SVG_ICONS.dock, SVG_ICONS.cpu];
    D.githubProjects.forEach(function (project, index) {
      var finished = project.status === 'Finished';
      container.appendChild(ce('article', { className: 'project-card', 'data-project-status': finished ? 'finished' : 'development' }, [
        ce('div', { className: 'project-card__top' }, [
          ce('span', { className: 'project-card__index' }, [padCount(index + 1)]),
          ce('span', { className: 'project-card__status ' + (finished ? 'project-card__status--finished' : 'project-card__status--dev') }, [project.status])
        ]),
        ce('div', { className: 'project-card__icon-wrap', innerHTML: projectIcons[index % projectIcons.length] }),
        ce('h4', { className: 'project-card__title' }, [project.title]),
        ce('p', { className: 'project-card__desc' }, [project.description])
      ]));
    });
  }

  /* ============ Floating Chat Assistant ============ */

  function initChat() {
    var bubble = document.getElementById('chat-bubble');
    var panel = document.getElementById('chat-panel');
    var close = document.getElementById('chat-close');
    var input = document.getElementById('chat-input');
    var send = document.getElementById('chat-send');
    var messages = document.getElementById('chat-messages');
    if (!bubble || !panel) return;

    var open = false;
    bubble.addEventListener('click', function () {
      open = !open;
      panel.classList.toggle('chat-panel--open', open);
      bubble.classList.toggle('chat-bubble--active', open);
      if (open) input.focus();
    });
    if (close) close.addEventListener('click', function () {
      open = false;
      panel.classList.remove('chat-panel--open');
      bubble.classList.remove('chat-bubble--active');
    });

    function findAnswer(q) {
      var ql = q.toLowerCase().trim();
      var best = null, bestScore = 0;
      D.chatQA.forEach(function (item) {
        item.q.forEach(function (keyword) {
          var kw = keyword.toLowerCase();
          var score = 0;
          var words = kw.split(' ');
          words.forEach(function (w) {
            if (ql.indexOf(w) !== -1) score++;
          });
          if (score > bestScore) { bestScore = score; best = item.a; }
        });
      });
      return best || "I don't have that information. Please check my CV or contact me at bioashok00793@gmail.com.";
    }

    function addMsg(text, isUser) {
      var div = document.createElement('div');
      div.className = 'chat-msg ' + (isUser ? 'chat-msg--user' : 'chat-msg--bot');
      div.textContent = text;
      messages.appendChild(div);
      messages.scrollTop = messages.scrollHeight;
    }

    function handleSend() {
      var text = input.value.trim();
      if (!text) return;
      addMsg(text, true);
      input.value = '';
      setTimeout(function () {
        var answer = findAnswer(text);
        addMsg(answer, false);
      }, 300 + Math.random() * 400);
    }

    send.addEventListener('click', handleSend);
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') handleSend(); });
  }

  /* ============ Scroll Progress ============ */

  function initProgressBar() {
    var bar = document.getElementById('progress-bar');
    if (!bar) return;
    window.addEventListener('scroll', function () {
      var scrollTop = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + '%';
    }, { passive: true });
  }

  /* ============ Dark Mode ============ */

  function initTheme() {
    var toggle = document.getElementById('theme-toggle');
    if (!toggle) return;
    var stored = localStorage.getItem('theme');
    if (stored === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
    toggle.addEventListener('click', function () {
      var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      var next = isDark ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }

  /* ============ Init ============ */

  function init() {
    initProgressBar();
    initTheme();
    initCanvas();
    initNav();
    renderStats();
    renderScholarImpact();
    renderResearch();
    renderPublicationSummary();
    initPublications();
    renderJourney();
    renderSkills();
    renderScholarlySummary();
    renderScholarCard('awards-list', null, renderAwards);
    renderScholarCard('patent-content', null, renderPatent);
    renderScholarCard('conferences-list', null, renderConferences);
    renderScholarCard('projects-list', null, renderProjects);
    renderScholarCard('bookchapters-list', null, renderBookChapters);
    initChat();
    initReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
