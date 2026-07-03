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
    flask: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2h12"/><path d="M12 2v8"/><path d="M7 10h10"/><path d="M5 22h14l-4.5-12h-5L5 22z"/></svg>',
    cell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1.5"/><path d="M12 3v4"/><path d="M12 17v4"/><path d="M3 12h4"/><path d="M17 12h4"/></svg>',
    leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v8"/><path d="M12 10c-3 0-5.5 2-5.5 5s2.5 5 5.5 5 5.5-2 5.5-5-2.5-5-5.5-5z"/><path d="M12 10v12"/></svg>'
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
    var els = document.querySelectorAll('.research-card, .pub-card, .timeline-item__card, .skill-card, .scholarly-card, .contact__link, .proficiency-card, .section__header');
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
          list.appendChild(ce('div', { className: 'pub-card' }, [
            ce('button', { className: 'pub-card__title', onClick: function () { openDialog(p); } }, [p.title]),
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

    var items = [];
    D.education.forEach(function (e) {
      items.push({ type: 'edu', date: e.period, title: e.degree, org: e.institution + (e.location ? ', ' + e.location : ''), desc: e.details || '', sub: e.grade || '' });
    });
    D.experience.forEach(function (e) {
      items.push({ type: 'exp', date: e.period, title: e.role, org: e.organization, desc: e.details, sub: e.location || '' });
    });

    var order = [
      'Adjunct Professor',
      'Post-Doctoral Researcher',
      'Research Fellow',
      'Ph.D. in Chemical Engineering (Microbial Biotechnology)',
      'Ph.D. Researcher & Teaching Assistant',
      'Master of Science (M.Sc.) in Biotechnology',
      'Bachelor of Science (B.Sc.) in Biotechnology'
    ];

    items.sort(function (a, b) {
      return order.indexOf(a.title) - order.indexOf(b.title);
    });

    items.forEach(function (item) {
      container.appendChild(ce('div', { className: 'timeline-item' }, [
        ce('div', { className: 'timeline-item__date' }, [
          item.date,
          item.sub ? ce('span', { className: 'timeline-item__date-sub' }, [item.sub]) : null
        ]),
        ce('div', { className: 'timeline-item__card' }, [
          ce('h3', { className: 'timeline-item__title' }, [item.title]),
          ce('p', { className: 'timeline-item__org' }, [item.org]),
          ce('p', { className: 'timeline-item__desc' }, [item.desc])
        ])
      ]));
    });
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

    var groups = [
      { title: 'Molecular Biology', items: D.skills.molecular },
      { title: 'Nanomaterials', items: D.skills.material },
      { title: 'Analytical Techniques', items: D.skills.analytical },
      { title: 'Computational', items: D.skills.software }
    ];

    groups.forEach(function (g) {
      grid.appendChild(ce('div', { className: 'skill-card' }, [
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

  function renderConferences(container) {
    if (!D.conferenceProceedings) return;
    D.conferenceProceedings.slice(0, 6).forEach(function (c) {
      container.appendChild(ce('div', { className: 'scholarly-item' }, [
        ce('div', { className: 'scholarly-item__title' }, [c.title.substring(0, 80) + (c.title.length > 80 ? '...' : '')]),
        ce('div', { className: 'scholarly-item__detail' }, [c.conference + ', ' + c.year])
      ]));
    });
    if (D.conferenceProceedings.length > 6) {
      container.appendChild(ce('div', { style: 'padding-top:0.5rem;font-size:0.82rem;color:var(--accent);font-weight:600;' }, ['+' + (D.conferenceProceedings.length - 6) + ' more']));
    }
  }

  function renderProjects(container) {
    if (!D.githubProjects) return;
    D.githubProjects.forEach(function (p) {
      var statusClass = p.status === 'Finished' ? 'scholarly-item__status--finished' : 'scholarly-item__status--progress';
      container.appendChild(ce('div', { className: 'scholarly-item' }, [
        ce('div', { className: 'scholarly-item__title' }, [p.title]),
        ce('div', { className: 'scholarly-item__detail' }, [p.description]),
        ce('span', { className: 'scholarly-item__status ' + statusClass }, [p.status])
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

  function applyLiveMetrics(metrics) {
    var changed = false;
    if (metrics.authorHIndex || metrics.authorTotalCitations || metrics.authorWorks) {
      var s = D.personal.stats;
      if (metrics.authorHIndex) { s.hIndex = metrics.authorHIndex; changed = true; }
      if (metrics.authorTotalCitations) { s.citations = metrics.authorTotalCitations; changed = true; }
      if (metrics.authorWorks) { s.totalPublications = metrics.authorWorks; changed = true; }
      if (changed) {
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
      }
    }

    var anyUpdate = false;
    D.publications.forEach(function (p) {
      var doi = (p.doi || '').replace('https://doi.org/', '');
      if (doi && metrics.citations[doi] !== undefined) {
        var live = metrics.citations[doi];
        if (live !== p.citations && live > 0) { p.citations = live; anyUpdate = true; }
      }
    });
    if (anyUpdate) {
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
    initReveal();
    fetchLiveMetrics();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
