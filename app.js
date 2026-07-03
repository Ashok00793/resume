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
    cpu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/><path d="M1 9h3"/><path d="M1 15h3"/><path d="M20 9h3"/><path d="M20 15h3"/></svg>'
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
    var els = document.querySelectorAll('.research-card, .pub-card, .timeline-item__card, .skill-card, .scholarly-card, .project-card, .contact__link, .proficiency-card, .section__header');
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

  /* ============ Research Grid ============ */

  function renderResearch() {
    var grid = document.getElementById('research-grid');
    if (!grid) return;

    var icons = [SVG_ICONS.dna, SVG_ICONS.flask, SVG_ICONS.cell, SVG_ICONS.leaf];
    var themes = [
      { title: 'Cell-Surface Display', desc: 'Engineered E. coli surface display via outer membrane protein anchors (OmpC, YiaT) for selective heavy metal binding and whole-cell biocatalysis.', tags: ['Peptide display', 'Metal selectivity', 'Biocatalysis'] },
      { title: 'Nanomaterial Synthesis', desc: 'Green, chemical, and microbial routes to functional nanoparticles (Co3O4, NiO, Ag) for photocatalytic wastewater treatment and anticancer applications.', tags: ['Co3O4 NPs', 'NiO NPs', 'Photocatalysis'] },
      { title: 'Metabolic Engineering', desc: 'Pathway colocalization via synthetic protein scaffolds for high-yield bioproduction of L-serine, GABA, and malic acid in recombinant E. coli.', tags: ['Protein scaffolds', 'Amino acids', 'Flux optimization'] },
      { title: 'Waste Valorization & Biomaterials', desc: 'Converting agricultural waste into high-performance bacterial cellulose membranes and engineering P. denitrificans for sustainable biopolymer production.', tags: ['Bacterial cellulose', 'P3HP', '~40% improvement'] }
    ];

    themes.forEach(function (t, i) {
      var card = ce('div', { className: 'research-card' }, [
        ce('div', { className: 'research-card__icon' }, [
          ce('div', { innerHTML: icons[i] })
        ]),
        ce('h3', { className: 'research-card__title' }, [t.title]),
        ce('p', { className: 'research-card__desc' }, [t.desc]),
        ce('div', { className: 'research-card__tags' }, t.tags.map(function (tag) {
          return ce('span', { className: 'research-card__tag' }, [tag]);
        }))
      ]);
      grid.appendChild(card);
    });
  }

  /* ============ Publications ============ */

  function initPublications() {
    var search = document.getElementById('pub-search');
    var filter = document.getElementById('pub-filter');
    var sort = document.getElementById('pub-sort');
    var reset = document.getElementById('pub-reset');
    var count = document.getElementById('pub-count');
    var list = document.getElementById('pub-list');
    if (!list) return;

    var tags = new Set();
    D.publications.forEach(function (p) { (p.tags || []).forEach(function (t) { tags.add(t); }); });
    tags.forEach(function (t) {
      filter.appendChild(ce('option', { value: t.toLowerCase() }, [t]));
    });

    function render() {
      var q = (search.value || '').toLowerCase();
      var f = filter.value;
      var s = sort.value;

      var filtered = D.publications.filter(function (p) {
        if (q && !p.title.toLowerCase().includes(q) && !p.journal.toLowerCase().includes(q) && !(p.abstract || '').toLowerCase().includes(q) && !p.tags.some(function (t) { return t.toLowerCase().includes(q); })) return false;
        if (f !== 'all' && !p.tags.some(function (t) { return t.toLowerCase() === f; })) return false;
        return true;
      });

      filtered.sort(function (a, b) {
        if (s === 'citations') return b.citations - a.citations;
        if (s === 'impact') return parseFloat(b.impactFactor || 0) - parseFloat(a.impactFactor || 0);
        return b.year - a.year;
      });

      list.innerHTML = '';
      if (filtered.length === 0) {
        list.appendChild(ce('p', { style: 'text-align:center;padding:2rem;color:var(--text-muted);' }, ['No publications match your filters.']));
      } else {
        filtered.forEach(function (p) {
          var tagsEl = (p.tags || []).map(function (t) { return ce('span', { className: 'pub-card__tag' }, [t]); });
          if (p.autoDetected) tagsEl.unshift(ce('span', { className: 'pub-card__tag pub-card__tag--auto' }, ['auto']));
          list.appendChild(ce('div', { className: 'pub-card' }, [
            ce('button', { className: 'pub-card__title' + (p.autoDetected ? ' pub-card__title--auto' : ''), onClick: function () { openDialog(p); } }, [p.title]),
            ce('p', { className: 'pub-card__journal' }, [p.journal + ' (' + p.year + ')']),
            ce('div', { className: 'pub-card__meta' }, tagsEl.concat([
              ce('span', { style: 'font-size:0.8rem;color:var(--text-muted);margin-left:auto;' }, [p.citations + ' cites'])
            ]))
          ]));
        });
      }
      count.textContent = filtered.length + ' publication' + (filtered.length !== 1 ? 's' : '');
    }

    search.addEventListener('input', render);
    filter.addEventListener('change', render);
    sort.addEventListener('change', render);
    reset.addEventListener('click', function () {
      search.value = '';
      filter.value = 'all';
      sort.value = 'year';
      render();
    });

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
    meta.appendChild(ce('span', {}, ['IF: ' + pub.impactFactor]));
    (pub.tags || []).forEach(function (t) { meta.appendChild(ce('span', {}, [t])); });

    var actions = document.getElementById('pub-dialog-actions');
    actions.innerHTML = '';
    if (pub.doi) actions.appendChild(ce('a', { className: 'btn btn--primary', href: pub.doi, target: '_blank', rel: 'noopener noreferrer' }, ['Open DOI']));
    if (pub.pdf_url) actions.appendChild(ce('a', { className: 'btn btn--outline', href: pub.pdf_url, target: '_blank', rel: 'noopener noreferrer' }, ['Open Article']));

    dialog.showModal();
    document.getElementById('pub-dialog-close').addEventListener('click', function () { dialog.close(); });
    dialog.addEventListener('click', function (e) { if (e.target === dialog) dialog.close(); });
  }

  /* ============ Timeline ============ */

  function renderTimeline() {
    var container = document.getElementById('timeline');
    if (!container || !D.education || !D.experience) return;

    function makeTItem(e) {
      return { type: e.type, date: e.date, title: e.title, org: e.org, desc: e.desc, sub: e.sub };
    }

    var eduItems = [];
    D.education.forEach(function (e) {
      eduItems.push(makeTItem({ type: 'edu', date: e.period, title: e.degree, org: e.institution + (e.location ? ', ' + e.location : ''), desc: e.details || '', sub: e.grade || '' }));
    });

    var expItems = [];
    D.experience.forEach(function (e) {
      expItems.push(makeTItem({ type: 'exp', date: e.period, title: e.role, org: e.organization, desc: e.details, sub: e.location || '' }));
    });

    var eduOrder = [
      'Ph.D. in Chemical Engineering (Microbial Biotechnology)',
      'Master of Science (M.Sc.) in Biotechnology',
      'Bachelor of Science (B.Sc.) in Biotechnology'
    ];

    var expOrder = [
      'Adjunct Professor',
      'Post-Doctoral Researcher',
      'Research Fellow',
      'Ph.D. Researcher & Teaching Assistant'
    ];

    eduItems.sort(function (a, b) { return eduOrder.indexOf(a.title) - eduOrder.indexOf(b.title); });
    expItems.sort(function (a, b) { return expOrder.indexOf(a.title) - expOrder.indexOf(b.title); });

    var groupIcons = {
      'Academic Path': SVG_ICONS.grad,
      'Professional Experience': SVG_ICONS.work
    };
    function renderSection(title, items) {
      container.appendChild(ce('div', { className: 'timeline-group' }, [
        ce('span', { className: 'timeline-group__icon', innerHTML: groupIcons[title] || '' }),
        ce('h3', { className: 'timeline-group__title' }, [title])
      ]));
      items.forEach(function (item) {
        container.appendChild(ce('div', { className: 'timeline-item' + (item.type === 'edu' ? ' timeline-item--edu' : ' timeline-item--exp') }, [
          ce('div', { className: 'timeline-item__date' }, [
            item.date,
            item.sub ? ce('span', { className: 'timeline-item__date-sub' }, [item.sub]) : null
          ]),
          ce('div', { className: 'timeline-item__card' }, [
            ce('h4', { className: 'timeline-item__title' }, [item.title]),
            ce('p', { className: 'timeline-item__org' }, [item.org]),
            ce('p', { className: 'timeline-item__desc' }, [item.desc])
          ])
        ]));
      });
    }

    renderSection('Academic Path', eduItems);
    renderSection('Professional Experience', expItems);
  }

  /* ============ Skills ============ */

  function renderSkills() {
    var bars = document.getElementById('proficiency-bars');
    var grid = document.getElementById('skills-grid');
    if (!bars || !grid) return;

    if (D.skillProficiency) {
      D.skillProficiency.labels.forEach(function (label, i) {
        bars.appendChild(ce('div', { className: 'proficiency-row' }, [
          ce('div', { className: 'proficiency-row__header' }, [
            ce('span', {}, [label]),
            ce('span', {}, [D.skillProficiency.values[i] + '%'])
          ]),
          ce('div', { className: 'proficiency-row__track' }, [
            ce('div', { className: 'proficiency-row__fill', style: 'width: ' + D.skillProficiency.values[i] + '%' }, [])
          ])
        ]));
      });
    }

    var skillIcons = [SVG_ICONS.microbe, SVG_ICONS.molecule, SVG_ICONS.atom, SVG_ICONS.code];
    var groups = [
      { title: 'Molecular Biology', items: D.skills.molecular },
      { title: 'Nanomaterials', items: D.skills.material },
      { title: 'Analytical Techniques', items: D.skills.analytical },
      { title: 'Computational', items: D.skills.software }
    ];

    groups.forEach(function (g, i) {
      grid.appendChild(ce('div', { className: 'skill-card' }, [
        ce('div', { className: 'skill-card__icon' }, [ce('div', { innerHTML: skillIcons[i] })]),
        ce('h3', { className: 'skill-card__title' }, [g.title]),
        ce('ul', { className: 'skill-card__list' }, g.items.map(function (item) { return ce('li', {}, [item]); }))
      ]));
    });
  }

  /* ============ Scholar Card ============ */

  function renderScholarCard(id, title, itemsFn) {
    var container = document.getElementById(id);
    if (!container) return;
    itemsFn(container);
  }

  function renderAwards(container) {
    if (!D.awards) return;
    D.awards.forEach(function (a) {
      container.appendChild(ce('div', { className: 'scholarly-item' }, [
        ce('div', { className: 'scholarly-item__title' }, [a.title]),
        ce('div', { className: 'scholarly-item__detail' }, [a.agency + ' | ' + a.period]),
        ce('div', { className: 'scholarly-item__detail' }, [a.description.substring(0, 120) + (a.description.length > 120 ? '...' : '')])
      ]));
    });
  }

  function renderPatent(container) {
    if (!D.patent) return;
    var p = D.patent;
    container.appendChild(ce('div', { className: 'scholarly-item' }, [
      ce('div', { className: 'scholarly-item__title' }, [p.title]),
      ce('div', { className: 'scholarly-item__detail' }, ['Application: ' + p.applicationNo]),
      ce('div', { className: 'scholarly-item__detail' }, [p.description.substring(0, 150) + (p.description.length > 150 ? '...' : '')])
    ]));
  }

  function renderBookChapters(container) {
    if (!D.bookChapters) return;
    var allItems = [];
    var expanded = false;
    D.bookChapters.forEach(function (b) {
      var statusClass = 'scholarly-item__status--' + (b.status === 'Published' ? 'finished' : 'progress');
      allItems.push(ce('div', { className: 'scholarly-item' }, [
        ce('div', { className: 'scholarly-item__title' }, [b.title.substring(0, 90) + (b.title.length > 90 ? '...' : '')]),
        ce('div', { className: 'scholarly-item__detail' }, [b.authors]),
        ce('div', { className: 'scholarly-item__detail' }, [b.publisher]),
        ce('span', { className: 'scholarly-item__status ' + statusClass }, [b.status])
      ]));
    });
    var visible = allItems.slice(0, 3);
    var hidden = allItems.slice(3);
    visible.forEach(function (el) { container.appendChild(el); });
    if (hidden.length > 0) {
      var hiddenWrap = ce('div', { style: 'display:none;' });
      hidden.forEach(function (el) { hiddenWrap.appendChild(el); });
      container.appendChild(hiddenWrap);
      var toggle = ce('button', { className: 'scholarly-toggle', onClick: function () {
        expanded = !expanded;
        hiddenWrap.style.display = expanded ? '' : 'none';
        toggle.textContent = expanded ? 'Show less' : '+ ' + hidden.length + ' more';
      } }, ['+ ' + hidden.length + ' more']);
      container.appendChild(toggle);
    }
  }

  function renderConferences(container) {
    if (!D.conferenceProceedings) return;
    var allItems = [];
    var expanded = false;
    D.conferenceProceedings.forEach(function (c) {
      allItems.push(ce('div', { className: 'scholarly-item' }, [
        ce('div', { className: 'scholarly-item__title' }, [c.title.substring(0, 80) + (c.title.length > 80 ? '...' : '')]),
        ce('div', { className: 'scholarly-item__detail' }, [c.conference + ', ' + c.year])
      ]));
    });
    var visible = allItems.slice(0, 3);
    var hidden = allItems.slice(3);
    visible.forEach(function (el) { container.appendChild(el); });
    if (hidden.length > 0) {
      var hiddenWrap = ce('div', { id: 'hidden-confs', style: 'display:none;' });
      hidden.forEach(function (el) { hiddenWrap.appendChild(el); });
      container.appendChild(hiddenWrap);
      var toggle = ce('button', { className: 'scholarly-toggle', onClick: function () {
        expanded = !expanded;
        hiddenWrap.style.display = expanded ? '' : 'none';
        toggle.textContent = expanded ? 'Show less' : '+ ' + hidden.length + ' more';
      } }, ['+ ' + hidden.length + ' more']);
      container.appendChild(toggle);
    }
  }

  function renderProjects(container) {
    if (!D.githubProjects) return;
    var projIcons = [SVG_ICONS.bio, SVG_ICONS.gear, SVG_ICONS.dock, SVG_ICONS.cpu];
    D.githubProjects.forEach(function (p, i) {
      var statusClass = p.status === 'Finished' ? 'project-card__status--finished' : 'project-card__status--dev';
      container.appendChild(ce('div', { className: 'project-card' }, [
        ce('div', { className: 'project-card__icon-wrap', innerHTML: projIcons[i % projIcons.length] }),
        ce('div', { className: 'project-card__body' }, [
          ce('div', { className: 'project-card__title' }, [p.title]),
          ce('div', { className: 'project-card__desc' }, [p.description]),
          ce('span', { className: 'project-card__status ' + statusClass }, [p.status])
        ])
      ]));
    });
  }

  /* ============ OpenAlex Citation Updates ============ */

  function getCache(key) {
    try {
      var raw = localStorage.getItem('oa_' + key);
      if (!raw) return null;
      var data = JSON.parse(raw);
      if (data.expiry && Date.now() > data.expiry) { localStorage.removeItem('oa_' + key); return null; }
      return data.value;
    } catch (_) { return null; }
  }

  function setCache(key, value, ttlMs) {
    try { localStorage.setItem('oa_' + key, JSON.stringify({ value: value, expiry: Date.now() + (ttlMs || 86400000) })); } catch (_) {}
  }

  function fetchJSON(url) {
    return fetch(url, { headers: { 'Accept': 'application/json' } }).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    });
  }

  function fetchLiveMetrics() {
    var cacheKey = 'metrics_' + D.personal.orcid;
    var cached = getCache(cacheKey);
    if (cached) { applyLiveMetrics(cached); return; }

    var dois = [];
    D.publications.forEach(function (p) {
      var doi = (p.doi || '').replace('https://doi.org/', '');
      if (doi) dois.push(doi);
    });

    var allMetrics = { citations: {}, authorHIndex: null, authorTotalCitations: null, authorWorks: null };

    var doiPromises = dois.map(function (doi) {
      return fetchJSON('https://api.openalex.org/works/doi:' + doi).then(function (data) {
        allMetrics.citations[doi] = data.cited_by_count || 0;
      }).catch(function () {});
    });

    var authorPromise = fetchJSON('https://api.openalex.org/authors/orcid:' + D.personal.orcid).then(function (data) {
      var s = data.summary_stats || {};
      allMetrics.authorHIndex = s.h_index;
      allMetrics.authorTotalCitations = s.cited_by_count;
      allMetrics.authorWorks = s.works_count;
    }).catch(function () {});

    Promise.all(doiPromises.concat(authorPromise)).then(function () {
      setCache(cacheKey, allMetrics, 86400000);
      applyLiveMetrics(allMetrics);
    }).catch(function () {});
  }

  function computeI10() {
    var counts = [];
    D.publications.forEach(function (p) { counts.push(p.citations); });
    counts.sort(function (a, b) { return b - a; });
    var i10 = 0;
    counts.forEach(function (c) { if (c >= 10) i10++; });
    return i10;
  }

  function fetchNewPapers() {
    var cacheKey = 'papers_v3_' + D.personal.orcid;
    var cached = getCache(cacheKey);
    if (cached) { mergeNewPapers(cached); return; }

    fetchJSON('https://api.openalex.org/works?filter=authorships.author.orcid:' + D.personal.orcid + '&sort=publication_year:desc&per_page=200').then(function (data) {
      var results = data.results || [];
      var existing = {};
      D.publications.forEach(function (p) {
        var doi = (p.doi || '').replace('https://doi.org/', '').toLowerCase();
        if (doi) existing[doi] = true;
      });
      var seenTitles = {};
      var fresh = [];
      results.forEach(function (w) {
        var doi = ((w.doi || '')).replace('https://doi.org/', '').toLowerCase();
        if (!doi || existing[doi]) return;
        var journal = '';
        if (w.primary_location && w.primary_location.source) journal = w.primary_location.source.display_name || '';
        if (/zenodo/i.test(journal)) return;
        var title = (w.title || '').toLowerCase().trim();
        if (title && seenTitles[title]) return;
        if (title) seenTitles[title] = true;
        fresh.push({
          id: 'auto_' + w.id,
          title: w.title || 'Untitled',
          year: w.publication_year || 0,
          citations: w.cited_by_count || 0,
          doi: 'https://doi.org/' + doi,
          journal: journal,
          abstract: '',
          pdf_url: '',
          tags: [],
          impactFactor: '',
          autoDetected: true
        });
        existing[doi] = true;
      });
      if (fresh.length > 0) {
        setCache(cacheKey, fresh, 86400000);
        mergeNewPapers(fresh);
      }
    }).catch(function () {});
  }

  function mergeNewPapers(fresh) {
    if (!fresh) return;
    fresh = fresh.filter(function (p) { return p.journal && !/zenodo/i.test(p.journal); });
    if (fresh.length === 0) return;
    D.publications = D.publications.filter(function (p) { return !p.autoDetected; });
    fresh.forEach(function (p) { D.publications.unshift(p); });
    D.personal.stats.totalPublications = D.publications.length;
    var container = document.getElementById('hero-stats');
    if (container) {
      container.innerHTML = '';
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
    initPublications();
  }

  function applyLiveMetrics(metrics) {
    var changed = false;
    if (metrics.authorHIndex || metrics.authorTotalCitations || metrics.authorWorks) {
      var s = D.personal.stats;
      if (metrics.authorHIndex) { s.hIndex = metrics.authorHIndex; changed = true; }
      if (metrics.authorTotalCitations) { s.citations = metrics.authorTotalCitations; changed = true; }
      if (metrics.authorWorks) { s.totalPublications = metrics.authorWorks; changed = true; }
    }

    var anyUpdate = false;
    D.publications.forEach(function (p) {
      var doi = (p.doi || '').replace('https://doi.org/', '');
      if (doi && metrics.citations[doi] !== undefined) {
        var live = metrics.citations[doi];
        if (live !== p.citations && live > 0) { p.citations = live; anyUpdate = true; }
      }
    });

    if (anyUpdate || changed) {
      var s = D.personal.stats;
      s.i10Index = computeI10();
      var container = document.getElementById('hero-stats');
      if (container) {
        container.innerHTML = '';
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
      var search = document.getElementById('pub-search');
      if (search) {
        var evt = document.createEvent('Event');
        evt.initEvent('input', true, false);
        search.dispatchEvent(evt);
      }
    }
  }

  /* ============ Init ============ */

  function init() {
    initCanvas();
    initNav();
    renderStats();
    renderResearch();
    initPublications();
    renderTimeline();
    renderSkills();
    renderScholarCard('awards-list', null, renderAwards);
    renderScholarCard('patent-content', null, renderPatent);
    renderScholarCard('conferences-list', null, renderConferences);
    renderScholarCard('projects-list', null, renderProjects);
    renderScholarCard('bookchapters-list', null, renderBookChapters);
    initReveal();
    fetchLiveMetrics();
    fetchNewPapers();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
