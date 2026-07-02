(function () {
  'use strict';

  var D = RESUME_DATA;

  /* ============ Three.js DNA Scene ============ */

  function initThree() {
    var container = document.getElementById('three-canvas');
    if (!container || typeof THREE === 'undefined') return;

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 50);
    camera.position.set(0, 0, 8);

    var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    var R = 2.0, H = 8.0, turns = 5, ptsPerTurn = 180;
    var total = turns * ptsPerTurn;
    var rungStep = 2;

    var positions = new Float32Array(total * 3 * 2 + (total / rungStep) * 3 * 2);
    var colors = new Float32Array(total * 3 * 2 + (total / rungStep) * 3 * 2);
    var idx = 0;

    function addPoint(x, y, z) {
      positions[idx * 3] = x;
      positions[idx * 3 + 1] = y;
      positions[idx * 3 + 2] = z;
      var t = (y + H / 2) / H;
      colors[idx * 3] = 0.078 + (0.0 - 0.078) * t;
      colors[idx * 3 + 1] = 0.851 + (0.902 - 0.851) * t;
      colors[idx * 3 + 2] = 0.702 + (0.463 - 0.702) * t;
      idx++;
    }

    for (var i = 0; i < total; i++) {
      var t = i / total;
      var angle = 2 * Math.PI * turns * t;
      var y = -H / 2 + H * t;
      var x1 = R * Math.cos(angle);
      var z1 = R * Math.sin(angle);
      var x2 = R * Math.cos(angle + Math.PI);
      var z2 = R * Math.sin(angle + Math.PI);
      addPoint(x1, y, z1);
      addPoint(x2, y, z2);
      if (i % rungStep === 0) {
        addPoint((x1 + x2) / 2, y, (z1 + z2) / 2);
        addPoint((x1 + x2) / 2 + (x2 - x1) * 0.25, y + 0.05, (z1 + z2) / 2 + (z2 - z1) * 0.25);
      }
    }

    var dnaGeom = new THREE.BufferGeometry();
    dnaGeom.setAttribute('position', new THREE.BufferAttribute(positions.subarray(0, idx * 3), 3));
    dnaGeom.setAttribute('color', new THREE.BufferAttribute(colors.subarray(0, idx * 3), 3));

    var dnaMat = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true
    });

    var dnaPoints = new THREE.Points(dnaGeom, dnaMat);

    var linePositions = new Float32Array((total / rungStep) * 6);
    var li = 0;
    for (var j = 0; j < total; j += rungStep) {
      var t2 = j / total;
      var a2 = 2 * Math.PI * turns * t2;
      var y2 = -H / 2 + H * t2;
      var lx1 = R * Math.cos(a2), lz1 = R * Math.sin(a2);
      var lx2 = R * Math.cos(a2 + Math.PI), lz2 = R * Math.sin(a2 + Math.PI);
      linePositions[li * 6] = lx1; linePositions[li * 6 + 1] = y2; linePositions[li * 6 + 2] = lz1;
      linePositions[li * 6 + 3] = lx2; linePositions[li * 6 + 4] = y2; linePositions[li * 6 + 5] = lz2;
      li++;
    }

    var lineGeom = new THREE.BufferGeometry();
    lineGeom.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    var lineMat = new THREE.LineBasicMaterial({
      color: 0x14d9b3,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    var rungLines = new THREE.LineSegments(lineGeom, lineMat);

    var dnaGroup = new THREE.Group();
    dnaGroup.add(dnaPoints);
    dnaGroup.add(rungLines);
    scene.add(dnaGroup);

    var ambientCount = 400;
    var ambPos = new Float32Array(ambientCount * 3);
    var ambCol = new Float32Array(ambientCount * 3);
    var ambPhase = new Float32Array(ambientCount);
    var ambOrig = new Float32Array(ambientCount * 3);

    for (var k = 0; k < ambientCount; k++) {
      var theta = Math.random() * Math.PI * 2;
      var phi = Math.acos(2 * Math.random() - 1);
      var radius = 3 + Math.random() * 4;
      ambPos[k * 3] = radius * Math.sin(phi) * Math.cos(theta);
      ambPos[k * 3 + 1] = (Math.random() - 0.5) * 8;
      ambPos[k * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
      ambOrig[k * 3] = ambPos[k * 3];
      ambOrig[k * 3 + 1] = ambPos[k * 3 + 1];
      ambOrig[k * 3 + 2] = ambPos[k * 3 + 2];
      ambCol[k * 3] = 0.078 + Math.random() * 0.1;
      ambCol[k * 3 + 1] = 0.851 + Math.random() * 0.1;
      ambCol[k * 3 + 2] = 0.702;
      ambPhase[k] = Math.random() * Math.PI * 2;
    }

    var ambGeom = new THREE.BufferGeometry();
    ambGeom.setAttribute('position', new THREE.BufferAttribute(ambPos, 3));
    ambGeom.setAttribute('color', new THREE.BufferAttribute(ambCol, 3));

    var ambMat = new THREE.PointsMaterial({
      size: 0.03,
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true
    });

    var ambientPoints = new THREE.Points(ambGeom, ambMat);
    scene.add(ambientPoints);

    var mouse = { x: 0, y: 0 };
    var target = { x: 0, y: 0 };

    function onMouseMove(e) {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    }
    function onTouchMove(e) {
      if (e.touches.length > 0) {
        mouse.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
      }
    }

    if (window.matchMedia('(hover: hover)').matches) {
      window.addEventListener('mousemove', onMouseMove, { passive: true });
    }
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    function onResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', onResize, { passive: true });

    var clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      var elapsed = clock.getElapsedTime();

      target.x += (mouse.x * 0.3 - target.x) * 0.05;
      target.y += (mouse.y * 0.3 - target.y) * 0.05;

      dnaGroup.rotation.y = elapsed * 0.08;
      dnaGroup.rotation.x += (target.y * 0.15 - dnaGroup.rotation.x) * 0.05;
      dnaGroup.rotation.z += (target.x * 0.15 - dnaGroup.rotation.z) * 0.05;

      var ambPosAttr = ambientPoints.geometry.attributes.position;
      var ambArr = ambPosAttr.array;
      for (var m = 0; m < ambientCount; m++) {
        var px = ambOrig[m * 3];
        var py = ambOrig[m * 3 + 1];
        var pz = ambOrig[m * 3 + 2];
        ambArr[m * 3] = px + 0.4 * Math.sin(elapsed * 0.06 + ambPhase[m]);
        ambArr[m * 3 + 1] = py + 0.3 * Math.sin(elapsed * 0.04 + ambPhase[m] * 1.7);
        ambArr[m * 3 + 2] = pz + 0.4 * Math.cos(elapsed * 0.06 + ambPhase[m]);
      }
      ambPosAttr.needsUpdate = true;

      renderer.render(scene, camera);
    }

    animate();
  }

  /* ============ DOM Helpers ============ */

  function ce(tag, attrs, children) {
    var el = document.createElement(tag);
    if (attrs) {
      for (var key in attrs) {
        if (key === 'className') el.className = attrs[key];
        else if (key === 'htmlFor') el.htmlFor = attrs[key];
        else if (key.startsWith('data')) el.setAttribute(key.replace(/([A-Z])/g, '-$1').toLowerCase(), attrs[key]);
        else if (key === 'onClick') el.addEventListener('click', attrs[key]);
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
    var nav = document.getElementById('navbar');
    var toggle = document.getElementById('nav-toggle');
    var links = document.getElementById('nav-links');
    var lastScroll = 0;

    if (toggle && links) {
      toggle.addEventListener('click', function () {
        var open = links.classList.toggle('nav-links--open');
        toggle.setAttribute('aria-expanded', open);
      });
      links.querySelectorAll('.nav-link').forEach(function (a) {
        a.addEventListener('click', function () {
          links.classList.remove('nav-links--open');
          toggle.setAttribute('aria-expanded', 'false');
        });
      });
    }

    window.addEventListener('scroll', function () {
      var sy = window.scrollY;
      if (sy > 100) {
        if (sy > lastScroll) nav.classList.add('glass-nav--hidden');
        else nav.classList.remove('glass-nav--hidden');
        nav.classList.add('glass-nav--scrolled');
      } else {
        nav.classList.remove('glass-nav--hidden', 'glass-nav--scrolled');
      }
      lastScroll = sy;

      var current = '';
      document.querySelectorAll('.section').forEach(function (sec) {
        var top = sec.offsetTop - 120;
        if (sy >= top) current = sec.id;
      });
      document.querySelectorAll('.nav-link').forEach(function (a) {
        a.classList.toggle('nav-link--active', a.getAttribute('href') === '#' + current);
      });
    }, { passive: true });
  }

  /* ============ Intersection Observer ============ */

  function initReveal() {
    var els = document.querySelectorAll('.glass-card, .timeline-item, .pub-card, .skill-card, .compact-card, .research-card, .contact-card, .section__header, .hero__content');
    if (!els.length) return;
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 700ms cubic-bezier(0.4,0,0.2,1), transform 700ms cubic-bezier(0.4,0,0.2,1)';
      obs.observe(el);
    });
  }

  /* ============ Hero Stats ============ */

  function renderStats() {
    var container = document.getElementById('hero-stats');
    if (!container || !D.personal.stats) return;
    var s = D.personal.stats;
    var items = [
      { val: s.citations, label: 'Citations' },
      { val: s.hIndex, label: 'h-index' },
      { val: s.i10Index, label: 'i10-index' },
      { val: s.totalPublications, label: 'Publications' }
    ];
    items.forEach(function (item) {
      var d = ce('div', { className: 'hero__stat' }, [
        ce('span', { className: 'hero__stat-value' }, ['' + item.val]),
        ce('span', { className: 'hero__stat-label' }, [item.label])
      ]);
      container.appendChild(d);
    });
  }

  /* ============ Research Grid ============ */

  function renderResearch() {
    var grid = document.getElementById('research-grid');
    if (!grid) return;
    var themes = [
      { title: 'Cell-Surface Display', desc: 'Engineered E. coli surface display via OmpC and YiaT anchors for selective metal binding and biocatalysis.', items: ['Peptide display libraries', 'Metal ion selectivity', 'Whole-cell biocatalysts'] },
      { title: 'Nanomaterial Synthesis', desc: 'Green, chemical, and microbial nanoparticle synthesis for environmental and biomedical applications.', items: ['Co3O4, NiO, Ag NPs', 'Photocatalysis', 'Anticancer activity'] },
      { title: 'Metabolic Engineering', desc: 'Pathway colocalization via synthetic protein scaffolds for enhanced bioproduction.', items: ['L-serine, GABA, malic acid', 'Protein scaffold design', 'Flux optimization'] },
      { title: 'Biomaterials & Waste Valorization', desc: 'Converting agricultural waste into high-performance bacterial cellulose and biopolymers.', items: ['BC from peanut shells', 'P3HP from glycerol', '~40% tensile improvement'] }
    ];
    themes.forEach(function (t, i) {
      var card = ce('div', { className: 'glass-card research-card' }, [
        ce('div', { className: 'research-card__number' }, ['' + (i + 1)]),
        ce('h3', { className: 'research-card__title' }, [t.title]),
        ce('p', { className: 'research-card__desc' }, [t.desc]),
        ce('ul', { className: 'research-card__items' }, t.items.map(function (item) { return ce('li', {}, [item]); }))
      ]);
      grid.appendChild(card);
    });
  }

  /* ============ Publications ============ */

  var currentPublications = [];

  function getImpactClass(ifVal) {
    var v = parseFloat(ifVal);
    if (v >= 7) return 'high';
    if (v >= 3) return 'mid';
    return 'low';
  }

  function renderPubCard(pub) {
    var tags = (pub.tags || []).map(function (t) { return ce('span', { className: 'pub-card__tag' }, [t]); });
    var impactEl = ce('span', { className: 'pub-card__impact pub-card__impact--' + getImpactClass(pub.impactFactor) }, ['IF: ' + pub.impactFactor]);
    var meta = ce('div', { className: 'pub-card__meta' }, [impactEl]);
    tags.forEach(function (t) { meta.appendChild(t); });
    meta.appendChild(ce('span', { className: 'pub-card__citations' }, [pub.citations + ' citations']));

    var titleBtn = ce('button', { className: 'pub-card__title', onClick: function () { openDialog(pub); } }, [pub.title]);

    var card = ce('div', { className: 'pub-card' }, [
      titleBtn,
      ce('p', { className: 'pub-card__journal' }, [pub.journal + ' (' + pub.year + ')']),
      meta
    ]);
    return card;
  }

  function filterAndSort() {
    var q = (document.getElementById('pub-search').value || '').toLowerCase();
    var filter = document.getElementById('pub-filter').value;
    var sort = document.getElementById('pub-sort').value;

    var list = D.publications.filter(function (p) {
      if (q && !p.title.toLowerCase().includes(q) && !p.journal.toLowerCase().includes(q) && !(p.abstract || '').toLowerCase().includes(q) && !p.tags.some(function (t) { return t.toLowerCase().includes(q); })) return false;
      if (filter !== 'all' && !p.tags.some(function (t) { return t.toLowerCase() === filter.toLowerCase(); })) return false;
      return true;
    });

    list.sort(function (a, b) {
      if (sort === 'citations') return b.citations - a.citations;
      if (sort === 'impact') return parseFloat(b.impactFactor || 0) - parseFloat(a.impactFactor || 0);
      return b.year - a.year;
    });

    var container = document.getElementById('pub-list');
    container.innerHTML = '';
    if (list.length === 0) {
      container.appendChild(ce('p', { style: 'color: var(--text-muted); text-align: center; padding: 2rem;' }, ['No publications match your filters.']));
    } else {
      list.forEach(function (p) { container.appendChild(renderPubCard(p)); });
    }
    document.getElementById('pub-count').textContent = list.length + ' publication' + (list.length !== 1 ? 's' : '');
  }

  function initPubControls() {
    var filter = document.getElementById('pub-filter');
    var tags = new Set();
    D.publications.forEach(function (p) { (p.tags || []).forEach(function (t) { tags.add(t); }); });
    tags.forEach(function (t) {
      var opt = ce('option', { value: t.toLowerCase() }, [t]);
      filter.appendChild(opt);
    });

    document.getElementById('pub-search').addEventListener('input', filterAndSort);
    document.getElementById('pub-filter').addEventListener('change', filterAndSort);
    document.getElementById('pub-sort').addEventListener('change', filterAndSort);
    document.getElementById('pub-reset').addEventListener('click', function () {
      document.getElementById('pub-search').value = '';
      document.getElementById('pub-filter').value = 'all';
      document.getElementById('pub-sort').value = 'year';
      filterAndSort();
    });

    filterAndSort();
  }

  /* ============ Publication Dialog ============ */

  function openDialog(pub) {
    var dialog = document.getElementById('pub-dialog');
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
    if (pub.pdf_url) actions.appendChild(ce('a', { className: 'btn btn--ghost', href: pub.pdf_url, target: '_blank', rel: 'noopener noreferrer' }, ['Open Article']));

    dialog.showModal();
    document.getElementById('pub-dialog-close').addEventListener('click', function () { dialog.close(); });
    dialog.addEventListener('click', function (e) {
      if (e.target === dialog) dialog.close();
    });
  }

  /* ============ Timeline ============ */

  function renderTimeline() {
    var container = document.getElementById('timeline');
    if (!container || !D.experience) return;
    D.experience.forEach(function (exp) {
      var item = ce('div', { className: 'timeline-item' }, [
        ce('div', { className: 'timeline-item__date' }, [exp.period]),
        ce('div', {}, [
          ce('h3', { className: 'timeline-item__title' }, [exp.role]),
          ce('p', { className: 'timeline-item__org' }, [exp.organization + (exp.location ? ', ' + exp.location : '')]),
          ce('p', { className: 'timeline-item__desc' }, [exp.details])
        ])
      ]);
      container.appendChild(item);
    });
  }

  /* ============ Skills ============ */

  function renderSkills() {
    var bars = document.getElementById('capability-bars');
    var grid = document.getElementById('skills-grid');
    if (!bars || !grid || !D.skills) return;

    if (D.skillProficiency) {
      D.skillProficiency.labels.forEach(function (label, i) {
        var row = ce('div', { className: 'capability-row' }, [
          ce('div', { className: 'capability-row__header' }, [
            ce('span', {}, [label]),
            ce('span', {}, [D.skillProficiency.values[i] + '%'])
          ]),
          ce('div', { className: 'capability-row__track' }, [
            ce('div', { className: 'capability-row__fill', style: 'width: ' + D.skillProficiency.values[i] + '%' }, [])
          ])
        ]);
        bars.appendChild(row);
      });
    }

    var groups = [
      { title: 'Molecular Biology', items: D.skills.molecular },
      { title: 'Nanomaterials', items: D.skills.material },
      { title: 'Analytical Techniques', items: D.skills.analytical },
      { title: 'Computational', items: D.skills.software }
    ];

    groups.forEach(function (g) {
      var card = ce('div', { className: 'skill-card' }, [
        ce('h3', { className: 'skill-card__title' }, [g.title]),
        ce('ul', { className: 'skill-card__list' }, g.items.map(function (item) { return ce('li', {}, [item]); }))
      ]);
      grid.appendChild(card);
    });
  }

  /* ============ Awards ============ */

  function renderAwards() {
    var container = document.getElementById('awards-list');
    if (!container || !D.awards) return;
    D.awards.forEach(function (a) {
      container.appendChild(ce('div', { className: 'compact-item' }, [
        ce('div', { className: 'compact-item__title' }, [a.title]),
        ce('div', { className: 'compact-item__detail' }, [a.agency + ' | ' + a.period]),
        ce('div', { className: 'compact-item__detail' }, [a.description])
      ]));
    });
  }

  /* ============ Patent ============ */

  function renderPatent() {
    var container = document.getElementById('patent-content');
    if (!container || !D.patent) return;
    var p = D.patent;
    container.appendChild(ce('div', { className: 'compact-item' }, [
      ce('div', { className: 'compact-item__title' }, [p.title]),
      ce('div', { className: 'compact-item__detail' }, ['Inventors: ' + p.inventors]),
      ce('div', { className: 'compact-item__detail' }, ['Application: ' + p.applicationNo]),
      ce('div', { className: 'compact-item__detail' }, [p.description])
    ]));
  }

  /* ============ Conferences ============ */

  function renderConferences() {
    var container = document.getElementById('conferences-list');
    if (!container || !D.conferenceProceedings) return;
    D.conferenceProceedings.forEach(function (c) {
      container.appendChild(ce('div', { className: 'compact-item' }, [
        ce('div', { className: 'compact-item__title' }, [c.title]),
        ce('div', { className: 'compact-item__detail' }, [c.conference + ', ' + c.date + ' (' + c.year + ')']),
        ce('div', { className: 'compact-item__detail' }, [c.authors])
      ]));
    });
  }

  /* ============ Projects ============ */

  function renderProjects() {
    var container = document.getElementById('projects-list');
    if (!container || !D.githubProjects) return;
    D.githubProjects.forEach(function (p) {
      var statusClass = p.status === 'Finished' ? 'compact-item__status--finished' : 'compact-item__status--progress';
      container.appendChild(ce('div', { className: 'compact-item' }, [
        ce('div', { className: 'compact-item__title' }, [p.title]),
        ce('div', { className: 'compact-item__detail' }, [p.description]),
        ce('span', { className: 'compact-item__status ' + statusClass }, [p.status])
      ]));
    });
  }

  /* ============ Auto-Update Citations (OpenAlex) ============ */

  function getCache(key) {
    try {
      var raw = localStorage.getItem('oa_' + key);
      if (!raw) return null;
      var data = JSON.parse(raw);
      if (data.expiry && Date.now() > data.expiry) {
        localStorage.removeItem('oa_' + key);
        return null;
      }
      return data.value;
    } catch (_) { return null; }
  }

  function setCache(key, value, ttlMs) {
    try {
      localStorage.setItem('oa_' + key, JSON.stringify({ value: value, expiry: Date.now() + (ttlMs || 86400000) }));
    } catch (_) {}
  }

  function fetchJSON(url) {
    return fetch(url, { headers: { 'Accept': 'application/json' } }).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    });
  }

  function fetchLiveMetrics() {
    var dois = [];
    D.publications.forEach(function (p) {
      var doi = (p.doi || '').replace('https://doi.org/', '');
      if (doi) dois.push(doi);
    });

    var cacheKey = 'metrics_' + D.personal.orcid;
    var cached = getCache(cacheKey);
    if (cached) {
      applyLiveMetrics(cached);
      return;
    }

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
      var countByYear = data.counts_by_year || [];
      var pubCount = 0;
      countByYear.forEach(function (y) { pubCount += y.works_count; });
      if (pubCount > 0) allMetrics.authorWorks = pubCount;
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
          renderStatsLive(container, s);
        }
      }
    }

    var pubCiteKeys = Object.keys(metrics.citations);
    if (pubCiteKeys.length > 0) {
      var anyUpdate = false;
      D.publications.forEach(function (p) {
        var doi = (p.doi || '').replace('https://doi.org/', '');
        if (doi && metrics.citations[doi] !== undefined) {
          var live = metrics.citations[doi];
          if (live !== p.citations && live > 0) { p.citations = live; anyUpdate = true; }
        }
      });
      if (anyUpdate) filterAndSort();
    }
  }

  function renderStatsLive(container, s) {
    var items = [
      { val: s.citations, label: 'Citations' },
      { val: s.hIndex, label: 'h-index' },
      { val: s.i10Index, label: 'i10-index' },
      { val: s.totalPublications, label: 'Publications' }
    ];
    items.forEach(function (item) {
      var d = ce('div', { className: 'hero__stat' }, [
        ce('span', { className: 'hero__stat-value' }, ['' + item.val]),
        ce('span', { className: 'hero__stat-label' }, [item.label])
      ]);
      container.appendChild(d);
    });
  }

  /* ============ Init ============ */

  function init() {
    initThree();
    initNav();
    renderStats();
    renderResearch();
    initPubControls();
    renderTimeline();
    renderSkills();
    renderAwards();
    renderPatent();
    renderConferences();
    renderProjects();
    initReveal();
    fetchLiveMetrics();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
