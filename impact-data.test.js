const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');
const vm = require('node:vm');

const dataSource = fs.readFileSync('data.js', 'utf8');
const appSource = fs.readFileSync('app.js', 'utf8');
const css = fs.readFileSync('styles.css', 'utf8');
const context = {};
vm.createContext(context);
vm.runInContext(dataSource + '\nthis.__resumeData = RESUME_DATA;', context);
const data = context.__resumeData;
const html = fs.readFileSync('index.html', 'utf8');

test('uses the verified Google Scholar snapshot for headline metrics', () => {
  assert.equal(data.personal.stats.citations, 185);
  assert.equal(data.personal.stats.hIndex, 7);
  assert.equal(data.personal.stats.i10Index, 5);
  assert.equal(data.personal.stats.totalPublications, 12);
  assert.equal(data.scholarSnapshot.source, 'Google Scholar');
  assert.equal(data.scholarSnapshot.verifiedOn, '2026-09-24');
  assert.equal(data.scholarSnapshot.citations, data.personal.stats.citations);
});

test('provides an evidence-labelled interactive impact section', () => {
  assert.match(html, /id="scholar-impact"/);
  assert.match(html, /id="impact-list"/);
  assert.match(html, /data-scholar-source/);
  assert.match(html, /role="list"/);
  assert.match(appSource, /function renderScholarImpact/);
  assert.match(appSource, /function copyProfileSummary/);
  assert.doesNotMatch(appSource, /api\.openalex\.org/);
});

test('provides a redesigned filterable Journey board', () => {
  assert.match(html, /id="journey-overview"/);
  assert.match(html, /id="journey-board"/);
  assert.match(html, /data-journey-filter/);
  assert.match(html, /id="journey-count"/);
  assert.match(appSource, /function renderJourney/);
  assert.match(appSource, /function classifyExperience/);
  assert.match(appSource, /data-journey-kinds/);
  assert.doesNotMatch(appSource, /function renderTimeline/);
  assert.doesNotMatch(css, /\.timeline\b/);
  assert.match(css, /\.journey-board/);
  assert.match(css, /--on-primary/);
  assert.match(css, /\.journey-filter\.is-active[\s\S]*color: var\(--on-primary\)/);
  assert.equal(data.experience.length, 5);
  assert.equal(data.education.length, 3);
  assert.deepEqual(Array.from(data.experience, (item) => item.role), [
    'Assistant Professor',
    'Adjunct Professor',
    'Post-Doctoral Researcher',
    'Research Fellow',
    'Ph.D. Researcher & Teaching Assistant'
  ]);
  assert.deepEqual(Array.from(data.education, (item) => item.degree), [
    'Ph.D. in Chemical Engineering (Microbial Biotechnology)',
    'Master of Science (M.Sc.) in Biotechnology',
    'Bachelor of Science (B.Sc.) in Biotechnology'
  ]);
});

test('provides redesigned Skills and Scholarly studio structures', () => {
  assert.match(html, /favicon\.svg/);
  assert.match(html, /id="skills-atlas"/);
  assert.match(html, /id="skills-atlas-stats"/);
  assert.match(html, /id="scholarly-studio"/);
  assert.match(html, /id="scholarly-stats"/);
  assert.match(html, /id="scholarly-index"/);
  assert.match(appSource, /function renderScholarlySummary/);
  assert.match(appSource, /className: 'scholarly-entry '/);
  assert.match(appSource, /className: 'project-card'/);
  assert.doesNotMatch(html, /class="scholarly-grid"/);
});

test('includes the verified Springer book chapter', () => {
  const chapter = data.bookChapters.find((item) => item.doi === '10.1007/978-1-0716-5504-7_7');
  assert.ok(chapter);
  assert.equal(chapter.title, 'Microbial and Algal Sources: Protocols for Natural Colorant Production');
  assert.equal(chapter.status, 'Published');
  assert.equal(chapter.publisher, 'Springer US');
  assert.equal(chapter.pages, '133–167');
  assert.equal(chapter.year, 2026);
});

test('provides redesigned Research Focus and Publication library structures', () => {
  assert.match(html, /id="research-atlas"/);
  assert.match(html, /id="research-stats"/);
  assert.match(html, /id="publication-studio"/);
  assert.match(html, /id="publication-stats"/);
  assert.match(appSource, /function renderPublicationSummary/);
  assert.match(appSource, /className: 'research-card/);
  assert.match(appSource, /className: 'pub-card'/);
  assert.match(appSource, /getElementById\('pub-dialog-close'\)\.onclick/);
});
