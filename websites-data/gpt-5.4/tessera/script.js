const NAV_TREE = [
  { id: 'schemas', label: 'Schemas', items: [
    { id: 'create-schema', label: 'CREATE SCHEMA', href: '#', soon: true },
    { id: 'alter-schema', label: 'ALTER SCHEMA', href: '#', soon: true },
    { id: 'drop-schema', label: 'DROP SCHEMA', href: '#', soon: true }
  ]},
  { id: 'tables', label: 'Tables', items: [
    { id: 'create-table', label: 'CREATE TABLE', href: '#', soon: true },
    { id: 'alter-table', label: 'ALTER TABLE', href: '#', soon: true },
    { id: 'drop-table', label: 'DROP TABLE', href: '#', soon: true }
  ]},
  { id: 'views', label: 'Views', items: [
    { id: 'create-view', label: 'CREATE VIEW', href: '#', soon: true },
    { id: 'create-mv', label: 'CREATE MATERIALIZED VIEW', href: '#', soon: true }
  ]},
  { id: 'indexes', label: 'Indexes', items: [
    { id: 'create-index', label: 'CREATE INDEX', href: '#', soon: true },
    { id: 'drop-index', label: 'DROP INDEX', href: '#', soon: true }
  ]},
  { id: 'functions', label: 'Functions', open: true, subgroups: [
    { name: 'Aggregate', items: [
      { id: 'fn-sum', label: 'SUM', href: '#', soon: true }, { id: 'fn-avg', label: 'AVG', href: '#', soon: true }, { id: 'fn-count', label: 'COUNT', href: '#', soon: true },
      { id: 'fn-min', label: 'MIN', href: '#', soon: true }, { id: 'fn-max', label: 'MAX', href: '#', soon: true }, { id: 'fn-array-agg', label: 'ARRAY_AGG', href: '#', soon: true }
    ]},
    { name: 'String', items: [
      { id: 'fn-length', label: 'LENGTH', href: '#', soon: true }, { id: 'fn-substr', label: 'SUBSTR', href: '#', soon: true }, { id: 'fn-replace', label: 'REPLACE', href: '#', soon: true },
      { id: 'fn-regexp-match', label: 'REGEXP_MATCH', href: 'function-regexp-match.html' }, { id: 'fn-lower', label: 'LOWER', href: '#', soon: true }, { id: 'fn-upper', label: 'UPPER', href: '#', soon: true }
    ]},
    { name: 'Numeric', items: [
      { id: 'fn-round', label: 'ROUND', href: '#', soon: true }, { id: 'fn-floor', label: 'FLOOR', href: '#', soon: true }, { id: 'fn-ceil', label: 'CEIL', href: '#', soon: true },
      { id: 'fn-abs', label: 'ABS', href: '#', soon: true }, { id: 'fn-power', label: 'POWER', href: '#', soon: true }
    ]},
    { name: 'Date / Time', items: [
      { id: 'fn-now', label: 'NOW', href: '#', soon: true }, { id: 'fn-date-trunc', label: 'DATE_TRUNC', href: 'function-date-trunc.html' },
      { id: 'fn-extract', label: 'EXTRACT', href: '#', soon: true }, { id: 'fn-date-add', label: 'DATE_ADD', href: '#', soon: true }
    ]},
    { name: 'JSON', items: [
      { id: 'fn-json-extract', label: 'JSON_EXTRACT', href: 'function-json-extract.html' }, { id: 'fn-json-valid', label: 'JSON_VALID', href: '#', soon: true },
      { id: 'fn-json-agg', label: 'JSON_AGG', href: '#', soon: true }
    ]},
    { name: 'Window', items: [
      { id: 'fn-row-number', label: 'ROW_NUMBER', href: 'function-row-number.html' }, { id: 'fn-rank', label: 'RANK', href: '#', soon: true },
      { id: 'fn-lag', label: 'LAG', href: '#', soon: true }, { id: 'fn-lead', label: 'LEAD', href: '#', soon: true }
    ]}
  ]},
  { id: 'operators', label: 'Operators', open: true, subgroups: [
    { name: 'Categories', items: [
      { id: 'op-arith', label: 'Arithmetic', href: 'operators.html#arith' },
      { id: 'op-comp', label: 'Comparison', href: 'operators.html#comp' },
      { id: 'op-logic', label: 'Logical', href: 'operators.html#logic' },
      { id: 'op-string', label: 'String', href: 'operators.html#string' },
      { id: 'op-json', label: 'JSON', href: 'operators.html#json' },
      { id: 'op-array', label: 'Array', href: 'operators.html#array' }
    ]}
  ]}
];

function $(s, r) { return (r || document).querySelector(s); }
function $$(s, r) { return Array.from((r || document).querySelectorAll(s)); }

function renderItemLink(i, activeId) {
  const isActive = i.id === activeId;
  const isSoon = i.soon || (!i.href || i.href === '#');
  const cls = [
    isActive ? 'active' : '',
    isSoon ? 'soon' : ''
  ].filter(Boolean).join(' ');
  if (isSoon) {
    return `<a role="link" aria-disabled="true" tabindex="0" class="${cls}" data-id="${i.id}" data-soon="1" title="Coming soon">${i.label}<span class="soon-tag" aria-label="Coming soon">soon</span></a>`;
  }
  return `<a href="${i.href}" class="${cls}" data-id="${i.id}">${i.label}</a>`;
}

function renderNav(activeId) {
  const root = $('#refNav');
  if (!root) return;
  root.innerHTML = NAV_TREE.map(cat => {
    const isOpen = cat.open || (cat.subgroups && cat.subgroups.some(sg => sg.items.some(i => i.id === activeId))) || (cat.items && cat.items.some(i => i.id === activeId));
    if (cat.subgroups) {
      return `<div class="nav-cat ${isOpen ? 'open' : ''}" data-id="${cat.id}">
        <div class="cat-title" role="button" tabindex="0" aria-expanded="${isOpen}"><span class="arrow">›</span>${cat.label}</div>
        <div class="cat-items">
          ${cat.subgroups.map(sg => `
            <div class="sub-group">${sg.name}</div>
            ${sg.items.map(i => renderItemLink(i, activeId)).join('')}
          `).join('')}
        </div>
      </div>`;
    }
    return `<div class="nav-cat ${isOpen ? 'open' : ''}" data-id="${cat.id}">
      <div class="cat-title" role="button" tabindex="0" aria-expanded="${isOpen}"><span class="arrow">›</span>${cat.label}</div>
      <div class="cat-items">${cat.items.map(i => renderItemLink(i, activeId)).join('')}</div>
    </div>`;
  }).join('');
  $$('.nav-cat .cat-title').forEach(t => {
    const toggle = () => {
      t.parentElement.classList.toggle('open');
      t.setAttribute('aria-expanded', t.parentElement.classList.contains('open'));
    };
    t.addEventListener('click', toggle);
    t.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
  });
  // Block "soon" links from navigating, show toast
  $$('.nav-cat a[data-soon="1"]').forEach(a => {
    a.addEventListener('click', e => { e.preventDefault(); showToast('Coming soon — this page isn\'t available yet.'); });
    a.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showToast('Coming soon — this page isn\'t available yet.'); } });
  });
}

function renderFunctionPage(opts) {
  const root = $('#fnPage');
  if (!root) return;
  renderNav(opts.activeId);
  $('#fnContent').innerHTML = `
    <a href="#" class="edit-github" data-soon="1">📝 Edit this page on GitHub</a>
    <h1>${opts.name}</h1>
    <p class="desc">${opts.shortDesc}</p>
    ${opts.intro ? `<p>${opts.intro}</p>` : ''}
    <h2 id="signature">Signature</h2>
    <div class="signature-box">${opts.signature}</div>
    <h2 id="parameters">Parameters</h2>
    <div class="table-scroll">
    <table class="param-table">
      <thead><tr><th>Name</th><th>Type</th><th>Required</th><th>Description</th></tr></thead>
      <tbody>${opts.params.map(p => `<tr><td class="name">${p.name}</td><td class="type">${p.type}</td><td>${p.req ? '<span class="req">required</span>' : '<span class="opt">optional</span>'}</td><td>${p.desc}</td></tr>`).join('')}</tbody>
    </table>
    </div>
    <h2 id="returns">Return value</h2>
    <p>${opts.returns}</p>
    <h2 id="examples">Examples</h2>
    ${opts.examples.map((e, i) => `
      <h3>${i + 1}. ${e.title}</h3>
      ${e.note ? `<p>${e.note}</p>` : ''}
      <pre class="example-block"><button class="copy-btn" type="button" aria-label="Copy code to clipboard">Copy</button>${e.sql}</pre>
      ${e.result ? `<div class="table-scroll"><table class="result-table"><caption>Result</caption><thead><tr>${e.result.cols.map(c => `<th>${c}</th>`).join('')}</tr></thead><tbody>${e.result.rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>` : ''}
    `).join('')}
    ${opts.errors ? `<h2 id="errors">Errors</h2><div class="callout err"><b>Common errors:</b><ul>${opts.errors.map(e => `<li>${e}</li>`).join('')}</ul></div>` : ''}
    <h2 id="version-history">Version history</h2>
    <div class="version-history open" id="vh">
      <div class="vh-head" role="button" tabindex="0" aria-expanded="true"><h3>${opts.versionHistory.length} entries</h3><span style="margin-left:auto;color:var(--ink-sub)">▼</span></div>
      <div class="vh-body">${opts.versionHistory.map(v => `<div class="vh-row"><span class="ver">${v.ver}</span>${v.note}</div>`).join('')}</div>
    </div>
    <h2 id="related">Related functions</h2>
    <div class="related-links">${opts.related.map(r => {
      const soon = !r.href || r.href === '#';
      return soon
        ? `<a role="link" aria-disabled="true" tabindex="0" class="soon" data-soon="1" title="Coming soon">${r.name}<span class="soon-tag">soon</span></a>`
        : `<a href="${r.href}">${r.name}</a>`;
    }).join('')}</div>
  `;
  const vhHead = $('.vh-head');
  if (vhHead) {
    const toggleVh = () => {
      const open = $('#vh').classList.toggle('open');
      vhHead.setAttribute('aria-expanded', open);
    };
    vhHead.addEventListener('click', toggleVh);
    vhHead.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleVh(); } });
  }

  // Bind copy buttons
  bindCopyButtons();
  // Block placeholder edit + related links
  $$('a[data-soon="1"]').forEach(a => {
    a.addEventListener('click', e => { e.preventDefault(); showToast('Coming soon — this page isn\'t available yet.'); });
  });

  // toc
  $('#refToc').innerHTML = `<h5>On this page</h5>
    <a href="#signature">Signature</a>
    <a href="#parameters">Parameters</a>
    <a href="#returns">Return value</a>
    <a href="#examples">Examples</a>
    ${opts.errors ? '<a href="#errors">Errors</a>' : ''}
    <a href="#version-history">Version history</a>
    <a href="#related">Related</a>
  `;
  bindToc();
}

function bindToc() {
  const links = $$('#refToc a');
  const headings = links.map(l => {
    const href = l.getAttribute('href');
    if (!href || !href.startsWith('#') || href === '#') return null;
    try { return document.querySelector(href); } catch (_) { return null; }
  }).filter(Boolean);
  if (!headings.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = '#' + e.target.id;
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === id));
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });
  headings.forEach(h => io.observe(h));
}

function bindCopyButtons() {
  $$('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const pre = btn.closest('pre');
      if (!pre) return;
      // Get code text without the button text
      const clone = pre.cloneNode(true);
      const cb = clone.querySelector('.copy-btn');
      if (cb) cb.remove();
      const text = clone.textContent || '';
      let success = false;
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(text);
          success = true;
        } else {
          const ta = document.createElement('textarea');
          ta.value = text;
          ta.style.position = 'fixed'; ta.style.opacity = '0';
          document.body.appendChild(ta);
          ta.select();
          success = document.execCommand('copy');
          document.body.removeChild(ta);
        }
      } catch (_) { success = false; }
      const original = btn.dataset.original || btn.textContent;
      btn.dataset.original = original;
      btn.classList.add(success ? 'copied' : 'copy-failed');
      btn.textContent = success ? '✓ Copied' : 'Try again';
      btn.setAttribute('aria-live', 'polite');
      showToast(success ? 'Copied to clipboard' : 'Copy failed — select and copy manually');
      setTimeout(() => {
        btn.classList.remove('copied', 'copy-failed');
        btn.textContent = original;
      }, 1800);
    });
  });
}

const FN_DATE_TRUNC = {
  activeId: 'fn-date-trunc',
  name: 'DATE_TRUNC',
  shortDesc: 'Truncate a timestamp to the precision specified by unit, returning a TIMESTAMP at the start of that period.',
  intro: 'DATE_TRUNC is commonly used in analytical queries to bucket timestamps by week, day, or hour for aggregation.',
  signature: '<span class="fn">DATE_TRUNC</span>(<span class="kw">unit</span> TEXT, <span class="kw">timestamp</span> TIMESTAMP) <span class="arrow">→</span> <span class="ret">TIMESTAMP</span>',
  params: [
    { name: 'unit', type: 'TEXT', req: true, desc: 'Truncation unit. One of: <span class="mono">microsecond, millisecond, second, minute, hour, day, week, month, quarter, year, decade, century</span>.' },
    { name: 'timestamp', type: 'TIMESTAMP', req: true, desc: 'The input timestamp. Timezone is preserved.' }
  ],
  returns: 'A TIMESTAMP value at the start of the period containing the input. The return preserves the timezone of the input.',
  examples: [
    { title: 'Truncate to day', sql: `<span class="kw">SELECT</span> <span class="fn">DATE_TRUNC</span>(<span class="str">'day'</span>, <span class="str">'2026-05-12 14:35:22'</span>::TIMESTAMP) <span class="kw">AS</span> day_start;`, result: { cols: ['day_start'], rows: [['2026-05-12 00:00:00']] } },
    { title: 'Bucket events by hour for aggregation', note: 'Combine DATE_TRUNC with GROUP BY to compute rolled-up metrics.', sql: `<span class="kw">SELECT</span>
  <span class="fn">DATE_TRUNC</span>(<span class="str">'hour'</span>, created_at) <span class="kw">AS</span> hour_bucket,
  <span class="fn">COUNT</span>(*) <span class="kw">AS</span> events,
  <span class="fn">SUM</span>(amount_cents) <span class="kw">AS</span> revenue
<span class="kw">FROM</span> orders
<span class="kw">WHERE</span> created_at &gt;= <span class="str">'2026-05-12'</span>
<span class="kw">GROUP BY</span> hour_bucket
<span class="kw">ORDER BY</span> hour_bucket;`, result: { cols: ['hour_bucket', 'events', 'revenue'], rows: [['2026-05-12 00:00:00', '142', '38,420'], ['2026-05-12 01:00:00', '89', '22,180'], ['2026-05-12 02:00:00', '61', '14,902']] } },
    { title: 'Nested with EXTRACT for weekday rollups', sql: `<span class="kw">SELECT</span>
  <span class="fn">EXTRACT</span>(<span class="str">DOW</span> <span class="kw">FROM</span> <span class="fn">DATE_TRUNC</span>(<span class="str">'day'</span>, created_at)) <span class="kw">AS</span> dow,
  <span class="fn">COUNT</span>(*) <span class="kw">AS</span> n
<span class="kw">FROM</span> telemetry_samples
<span class="kw">GROUP BY</span> dow
<span class="kw">ORDER BY</span> dow;`, result: { cols: ['dow', 'n'], rows: [['0', '8420'], ['1', '12940'], ['2', '13580']] } }
  ],
  errors: ['<b>invalid_unit</b>: passing a unit string Tessera does not recognise (e.g. <span class="mono">\'fortnight\'</span>) raises this error.', '<b>null_input</b>: returns NULL if either argument is NULL.'],
  versionHistory: [
    { ver: 'v2.4', note: 'Improved performance for hour and minute truncation by ~28% via SIMD vectorization.' },
    { ver: 'v2.3', note: 'Fixed a timezone bug where DST transitions could shift the result by 1 hour for week truncation.' },
    { ver: 'v2.1', note: 'Added the <span class="mono">\'microsecond\'</span> unit.' },
    { ver: 'v1.0', note: 'Added in initial release.' }
  ],
  related: [
    { name: 'EXTRACT', href: '#' }, { name: 'DATE_ADD', href: '#' }, { name: 'NOW', href: '#' },
    { name: 'CAST', href: '#' }, { name: 'CURRENT_DATE', href: '#' }, { name: 'AGE', href: '#' }
  ]
};

const FN_REGEXP_MATCH = {
  activeId: 'fn-regexp-match',
  name: 'REGEXP_MATCH',
  shortDesc: 'Test whether a string matches a regular expression using the RE2 syntax.',
  intro: 'REGEXP_MATCH evaluates to TRUE when pattern matches anywhere in the input string. Anchor with ^ and $ for full-string matches.',
  signature: '<span class="fn">REGEXP_MATCH</span>(<span class="kw">string</span> TEXT, <span class="kw">pattern</span> TEXT [, <span class="kw">flags</span> TEXT]) <span class="arrow">→</span> <span class="ret">BOOLEAN</span>',
  params: [
    { name: 'string', type: 'TEXT', req: true, desc: 'The string to test.' },
    { name: 'pattern', type: 'TEXT', req: true, desc: 'A RE2-compatible regular expression.' },
    { name: 'flags', type: 'TEXT', req: false, desc: 'Optional flags: <span class="mono">\'i\'</span> case-insensitive, <span class="mono">\'s\'</span> dotall, <span class="mono">\'m\'</span> multiline.' }
  ],
  returns: 'TRUE if the pattern matches anywhere in the string, FALSE otherwise. Returns NULL if any argument is NULL.',
  examples: [
    { title: 'Simple match', sql: `<span class="kw">SELECT</span> <span class="fn">REGEXP_MATCH</span>(<span class="str">'service-12'</span>, <span class="str">'^service-\\d+$'</span>);`, result: { cols: ['regexp_match'], rows: [['true']] } },
    { title: 'Case insensitive match with flag', sql: `<span class="kw">SELECT</span> <span class="fn">REGEXP_MATCH</span>(<span class="str">'ABC123'</span>, <span class="str">'^abc'</span>, <span class="str">'i'</span>);`, result: { cols: ['regexp_match'], rows: [['true']] } },
    { title: 'Filter rows matching pattern', sql: `<span class="kw">SELECT</span> email
<span class="kw">FROM</span> customers
<span class="kw">WHERE</span> <span class="fn">REGEXP_MATCH</span>(email, <span class="str">'^.+@example\\.(com|org)$'</span>);`, result: { cols: ['email'], rows: [['ana@example.com'], ['julien@example.org'], ['nora@example.com']] } }
  ],
  errors: ['<b>invalid_regex</b>: malformed pattern (unbalanced parens, invalid escape).', '<b>regex_timeout</b>: pattern took longer than 100ms to evaluate.'],
  versionHistory: [
    { ver: 'v2.4', note: 'Pattern cache size raised from 256 to 1024 entries.' },
    { ver: 'v2.0', note: 'Switched regex engine from PCRE to RE2 for predictable execution time. Some lookbehinds no longer supported.' },
    { ver: 'v1.5', note: 'Added <span class="mono">flags</span> parameter.' },
    { ver: 'v1.0', note: 'Added in initial release.' }
  ],
  related: [
    { name: 'REGEXP_REPLACE', href: '#' }, { name: 'REGEXP_EXTRACT', href: '#' }, { name: 'LIKE', href: '#' },
    { name: 'SUBSTR', href: '#' }, { name: 'POSITION', href: '#' }, { name: 'REPLACE', href: '#' }
  ]
};

const FN_JSON_EXTRACT = {
  activeId: 'fn-json-extract',
  name: 'JSON_EXTRACT',
  shortDesc: 'Extract a value from a JSON document using a JSONPath expression.',
  intro: 'JSON_EXTRACT navigates a JSON document with JSONPath. The result is a JSON value (object, array, string, number, boolean, or null).',
  signature: '<span class="fn">JSON_EXTRACT</span>(<span class="kw">document</span> JSON, <span class="kw">path</span> TEXT) <span class="arrow">→</span> <span class="ret">JSON</span>',
  params: [
    { name: 'document', type: 'JSON', req: true, desc: 'A JSON document. Strings will be auto-parsed if they contain valid JSON.' },
    { name: 'path', type: 'TEXT', req: true, desc: 'A JSONPath expression beginning with <span class="mono">$</span>.' }
  ],
  returns: 'A JSON scalar or composite value. Use <span class="mono">::TEXT</span> or <span class="mono">::INTEGER</span> to cast to a SQL type.',
  examples: [
    { title: 'Extract a string field', sql: `<span class="kw">SELECT</span> <span class="fn">JSON_EXTRACT</span>(<span class="str">'{"user":{"name":"Ana","plan":"pro"}}'</span>::JSON, <span class="str">'$.user.name'</span>);`, result: { cols: ['json_extract'], rows: [['"Ana"']] } },
    { title: 'Extract from JSON column in table', sql: `<span class="kw">SELECT</span>
  id,
  <span class="fn">JSON_EXTRACT</span>(payload, <span class="str">'$.event.type'</span>)::TEXT <span class="kw">AS</span> event_type,
  <span class="fn">JSON_EXTRACT</span>(payload, <span class="str">'$.event.amount'</span>)::INTEGER <span class="kw">AS</span> amount
<span class="kw">FROM</span> events
<span class="kw">WHERE</span> <span class="fn">JSON_EXTRACT</span>(payload, <span class="str">'$.event.type'</span>) = <span class="str">'"charge.succeeded"'</span>;`, result: { cols: ['id', 'event_type', 'amount'], rows: [['ev_8Hk2nF', 'charge.succeeded', '2500'], ['ev_M5kQ2nF', 'charge.succeeded', '1899']] } },
    { title: 'Array indexing', sql: `<span class="kw">SELECT</span> <span class="fn">JSON_EXTRACT</span>(<span class="str">'{"items":[10,20,30]}'</span>::JSON, <span class="str">'$.items[1]'</span>);`, result: { cols: ['json_extract'], rows: [['20']] } }
  ],
  errors: ['<b>invalid_path</b>: malformed JSONPath expression.', '<b>type_mismatch</b>: attempting to cast a non-scalar JSON value to a primitive SQL type.'],
  versionHistory: [
    { ver: 'v2.4', note: 'JSONPath now supports filter expressions like <span class="mono">$.items[?(@.price > 100)]</span>.' },
    { ver: 'v2.2', note: 'Improved index access performance for large arrays by ~3×.' },
    { ver: 'v1.5', note: 'Added in v1.5.' }
  ],
  related: [
    { name: 'JSON_VALID', href: '#' }, { name: 'JSON_AGG', href: '#' }, { name: 'JSON_OBJECT', href: '#' },
    { name: 'JSON_ARRAY', href: '#' }, { name: 'JSON_TYPE', href: '#' }, { name: 'CAST', href: '#' }
  ]
};

const FN_ROW_NUMBER = {
  activeId: 'fn-row-number',
  name: 'ROW_NUMBER',
  shortDesc: 'Assign a unique sequential integer to each row within a window partition.',
  intro: 'ROW_NUMBER is the simplest of the ranking window functions. Unlike RANK, ties do not share a number.',
  signature: '<span class="fn">ROW_NUMBER</span>() <span class="kw">OVER</span> ([<span class="kw">PARTITION BY</span> ...] <span class="kw">ORDER BY</span> ...) <span class="arrow">→</span> <span class="ret">BIGINT</span>',
  params: [
    { name: 'OVER clause', type: 'WINDOW', req: true, desc: 'Defines the window. PARTITION BY is optional; ORDER BY is required.' }
  ],
  returns: 'BIGINT starting at 1 for each new partition.',
  examples: [
    { title: 'Number all rows by created_at', sql: `<span class="kw">SELECT</span>
  id,
  <span class="fn">ROW_NUMBER</span>() <span class="kw">OVER</span> (<span class="kw">ORDER BY</span> created_at) <span class="kw">AS</span> rn
<span class="kw">FROM</span> orders;`, result: { cols: ['id', 'rn'], rows: [['ord_001', '1'], ['ord_002', '2'], ['ord_003', '3']] } },
    { title: 'Top-N per partition', note: 'A common pattern: find the latest event per user.', sql: `<span class="kw">WITH</span> ranked <span class="kw">AS</span> (
  <span class="kw">SELECT</span> *,
    <span class="fn">ROW_NUMBER</span>() <span class="kw">OVER</span> (<span class="kw">PARTITION BY</span> user_id <span class="kw">ORDER BY</span> created_at <span class="kw">DESC</span>) <span class="kw">AS</span> rn
  <span class="kw">FROM</span> events
)
<span class="kw">SELECT</span> user_id, type, created_at
<span class="kw">FROM</span> ranked
<span class="kw">WHERE</span> rn = 1;`, result: { cols: ['user_id', 'type', 'created_at'], rows: [['u_001', 'login', '2026-05-11 14:22:08'], ['u_002', 'purchase', '2026-05-11 12:45:01']] } },
    { title: 'Distinguishes ties (vs RANK)', sql: `<span class="kw">SELECT</span> score,
  <span class="fn">ROW_NUMBER</span>() <span class="kw">OVER</span> (<span class="kw">ORDER BY</span> score <span class="kw">DESC</span>) <span class="kw">AS</span> rn,
  <span class="fn">RANK</span>() <span class="kw">OVER</span> (<span class="kw">ORDER BY</span> score <span class="kw">DESC</span>) <span class="kw">AS</span> rk
<span class="kw">FROM</span> leaderboard;`, result: { cols: ['score', 'rn', 'rk'], rows: [['95', '1', '1'], ['95', '2', '1'], ['90', '3', '3']] } }
  ],
  versionHistory: [
    { ver: 'v2.3', note: 'Parallel evaluation of partitioned ROW_NUMBER across cores.' },
    { ver: 'v1.0', note: 'Added in v1.0.' }
  ],
  related: [
    { name: 'RANK', href: '#' }, { name: 'DENSE_RANK', href: '#' }, { name: 'LAG', href: '#' },
    { name: 'LEAD', href: '#' }, { name: 'NTILE', href: '#' }, { name: 'PERCENT_RANK', href: '#' }
  ]
};

function initReferenceOverview() {
  const root = $('#refOverview');
  if (!root) return;
  renderNav();
  $('#refContent').innerHTML = `
    <h1 style="font-family:'Inter',sans-serif;color:var(--ink)">Reference</h1>
    <p class="desc">Complete reference for SQL syntax, data types, functions, and operators in Tessera v2.4.</p>
    <h2 id="browse">Browse by category</h2>
    <p>Use the left navigation to explore the full reference, or jump straight to one of these popular pages:</p>
    <div class="related-links" style="margin-top:16px">
      <a href="function-date-trunc.html">DATE_TRUNC</a>
      <a href="function-regexp-match.html">REGEXP_MATCH</a>
      <a href="function-json-extract.html">JSON_EXTRACT</a>
      <a href="function-row-number.html">ROW_NUMBER</a>
      <a href="operators.html">Operators</a>
      <a href="data-types.html">Data types</a>
      <a href="sql-select.html">SELECT statement</a>
      <a role="link" aria-disabled="true" tabindex="0" class="soon" data-soon="1" title="Coming soon">CREATE TABLE<span class="soon-tag">soon</span></a>
      <a role="link" aria-disabled="true" tabindex="0" class="soon" data-soon="1" title="Coming soon">ALTER TABLE<span class="soon-tag">soon</span></a>
    </div>
    <h2 id="whats-new">What's new in v2.4</h2>
    <div class="callout"><b>Released 2026-04-15.</b> SIMD vectorization for DATE_TRUNC, JSONPath filter expressions, and parallel partitioned window functions. <a role="link" aria-disabled="true" tabindex="0" class="soon" data-soon="1" style="color:var(--green-d)">View full release notes →</a></div>
  `;
  $('#refToc').innerHTML = `<h5>On this page</h5><a href="#browse">Browse by category</a><a href="#whats-new">What's new</a>`;
  // Wire soon links on this page
  $$('#refContent a[data-soon="1"], #refContent .callout a[data-soon="1"]').forEach(a => {
    a.addEventListener('click', e => { e.preventDefault(); showToast('Coming soon — this page isn\'t available yet.'); });
  });
}

function initOperators() {
  if (!$('#operatorsPage')) return;
  renderNav('op-arith');
  $('#operatorsContent').innerHTML = `
    <h1 style="font-family:'Inter',sans-serif;color:var(--ink)">Operators</h1>
    <p class="desc">All operators in Tessera, grouped by category. Operator precedence runs highest (unary, multiplicative) to lowest (logical OR).</p>

    <h2 id="arith">Arithmetic</h2>
    <div class="table-scroll"><table class="ds-table"><thead><tr><th>Operator</th><th>Description</th><th>Example</th><th>Result</th><th>Precedence</th></tr></thead><tbody>
      <tr><td class="mono">+</td><td>Addition</td><td class="mono">2 + 3</td><td class="mono">5</td><td>6</td></tr>
      <tr><td class="mono">-</td><td>Subtraction</td><td class="mono">10 - 4</td><td class="mono">6</td><td>6</td></tr>
      <tr><td class="mono">*</td><td>Multiplication</td><td class="mono">3 * 4</td><td class="mono">12</td><td>7</td></tr>
      <tr><td class="mono">/</td><td>Division (returns DOUBLE if any operand is non-integer)</td><td class="mono">10 / 4</td><td class="mono">2</td><td>7</td></tr>
      <tr><td class="mono">%</td><td>Modulo</td><td class="mono">10 % 3</td><td class="mono">1</td><td>7</td></tr>
      <tr><td class="mono">^</td><td>Exponent</td><td class="mono">2 ^ 8</td><td class="mono">256</td><td>8</td></tr>
    </tbody></table></div>

    <h2 id="comp">Comparison</h2>
    <div class="table-scroll"><table class="ds-table"><thead><tr><th>Operator</th><th>Description</th><th>Example</th><th>Result</th></tr></thead><tbody>
      <tr><td class="mono">=</td><td>Equal</td><td class="mono">'a' = 'a'</td><td class="mono">true</td></tr>
      <tr><td class="mono">&lt;&gt; / !=</td><td>Not equal</td><td class="mono">5 &lt;&gt; 6</td><td class="mono">true</td></tr>
      <tr><td class="mono">&lt;, &lt;=, &gt;, &gt;=</td><td>Ordered comparison</td><td class="mono">3 &lt; 5</td><td class="mono">true</td></tr>
      <tr><td class="mono">IS [NOT] NULL</td><td>NULL test</td><td class="mono">x IS NULL</td><td class="mono">true/false</td></tr>
      <tr><td class="mono">IS [NOT] DISTINCT FROM</td><td>NULL-safe equality</td><td class="mono">NULL IS NOT DISTINCT FROM NULL</td><td class="mono">true</td></tr>
      <tr><td class="mono">BETWEEN</td><td>Range test, inclusive</td><td class="mono">x BETWEEN 1 AND 10</td><td class="mono">bool</td></tr>
    </tbody></table></div>

    <h2 id="logic">Logical</h2>
    <div class="table-scroll"><table class="ds-table"><thead><tr><th>Operator</th><th>Description</th><th>Example</th></tr></thead><tbody>
      <tr><td class="mono">AND</td><td>Logical AND</td><td class="mono">a AND b</td></tr>
      <tr><td class="mono">OR</td><td>Logical OR</td><td class="mono">a OR b</td></tr>
      <tr><td class="mono">NOT</td><td>Logical NOT</td><td class="mono">NOT a</td></tr>
    </tbody></table></div>

    <h2 id="string">String</h2>
    <div class="table-scroll"><table class="ds-table"><thead><tr><th>Operator</th><th>Description</th><th>Example</th><th>Result</th></tr></thead><tbody>
      <tr><td class="mono">||</td><td>String concatenation</td><td class="mono">'hello' || ' world'</td><td class="mono">'hello world'</td></tr>
      <tr><td class="mono">LIKE</td><td>Simple pattern (% _)</td><td class="mono">'cat' LIKE 'c%'</td><td class="mono">true</td></tr>
      <tr><td class="mono">SIMILAR TO</td><td>SQL regex</td><td class="mono">'abc' SIMILAR TO '[a-z]+'</td><td class="mono">true</td></tr>
      <tr><td class="mono">~ / !~</td><td>POSIX regex match / not match</td><td class="mono">'abc' ~ '^a'</td><td class="mono">true</td></tr>
    </tbody></table></div>

    <h2 id="json">JSON</h2>
    <div class="table-scroll"><table class="ds-table"><thead><tr><th>Operator</th><th>Description</th><th>Example</th></tr></thead><tbody>
      <tr><td class="mono">-&gt;</td><td>Get JSON value by key (returns JSON)</td><td class="mono">'{"a":1}'::JSON -&gt; 'a'</td></tr>
      <tr><td class="mono">-&gt;&gt;</td><td>Get value by key as TEXT</td><td class="mono">'{"a":1}'::JSON -&gt;&gt; 'a'</td></tr>
      <tr><td class="mono">#&gt;</td><td>Path access (returns JSON)</td><td class="mono">doc #&gt; '{user,name}'</td></tr>
    </tbody></table></div>

    <h2 id="array">Array</h2>
    <div class="table-scroll"><table class="ds-table"><thead><tr><th>Operator</th><th>Description</th><th>Example</th><th>Result</th></tr></thead><tbody>
      <tr><td class="mono">[i]</td><td>Index (1-based)</td><td class="mono">ARRAY[10,20,30][2]</td><td class="mono">20</td></tr>
      <tr><td class="mono">||</td><td>Array concatenation</td><td class="mono">ARRAY[1,2] || ARRAY[3]</td><td class="mono">[1,2,3]</td></tr>
      <tr><td class="mono">@&gt;</td><td>Contains</td><td class="mono">ARRAY[1,2,3] @&gt; ARRAY[2]</td><td class="mono">true</td></tr>
      <tr><td class="mono">&amp;&amp;</td><td>Overlaps</td><td class="mono">ARRAY[1,2] &amp;&amp; ARRAY[2,3]</td><td class="mono">true</td></tr>
    </tbody></table></div>
  `;
  $('#refToc').innerHTML = `<h5>On this page</h5>
    <a href="#arith">Arithmetic</a><a href="#comp">Comparison</a><a href="#logic">Logical</a>
    <a href="#string">String</a><a href="#json">JSON</a><a href="#array">Array</a>`;
  bindToc();
}

function initDataTypes() {
  if (!$('#dataTypesPage')) return;
  renderNav();
  $('#dataTypesContent').innerHTML = `
    <h1 style="font-family:'Inter',sans-serif;color:var(--ink)">Data types</h1>
    <p class="desc">Native types supported by the Tessera storage engine, with storage sizes and value ranges.</p>
    <h2 id="numeric">Numeric types</h2>
    <div class="table-scroll"><table class="ds-table"><thead><tr><th>Type</th><th>Aliases</th><th>Storage</th><th>Range</th><th>Default</th><th>Notes</th></tr></thead><tbody>
      <tr><td class="mono">TINYINT</td><td class="mono">INT8</td><td>1 byte</td><td>−128 to 127</td><td>0</td><td>Signed 8-bit.</td></tr>
      <tr><td class="mono">SMALLINT</td><td class="mono">INT16</td><td>2 bytes</td><td>−32,768 to 32,767</td><td>0</td><td>Signed 16-bit.</td></tr>
      <tr><td class="mono">INTEGER</td><td class="mono">INT, INT32</td><td>4 bytes</td><td>−2,147,483,648 to 2,147,483,647</td><td>0</td><td>Default integer type.</td></tr>
      <tr><td class="mono">BIGINT</td><td class="mono">INT64, LONG</td><td>8 bytes</td><td>−9.22e18 to 9.22e18</td><td>0</td><td>Signed 64-bit.</td></tr>
      <tr><td class="mono">REAL</td><td class="mono">FLOAT, FLOAT4</td><td>4 bytes</td><td>IEEE 754 single</td><td>0.0</td><td>~7 decimal digits.</td></tr>
      <tr><td class="mono">DOUBLE</td><td class="mono">FLOAT8</td><td>8 bytes</td><td>IEEE 754 double</td><td>0.0</td><td>~15 decimal digits.</td></tr>
      <tr><td class="mono">DECIMAL(p,s)</td><td class="mono">NUMERIC</td><td>16 bytes</td><td>p up to 38</td><td>0</td><td>Fixed-point, no rounding.</td></tr>
    </tbody></table></div>

    <h2 id="string">String types</h2>
    <div class="table-scroll"><table class="ds-table"><thead><tr><th>Type</th><th>Aliases</th><th>Storage</th><th>Notes</th></tr></thead><tbody>
      <tr><td class="mono">TEXT</td><td class="mono">STRING, VARCHAR</td><td>variable</td><td>UTF-8 encoded, no length limit.</td></tr>
      <tr><td class="mono">VARCHAR(n)</td><td>—</td><td>variable</td><td>UTF-8 with max codepoint count.</td></tr>
      <tr><td class="mono">CHAR(n)</td><td>—</td><td>variable</td><td>Fixed-length, padded with spaces.</td></tr>
      <tr><td class="mono">BLOB</td><td class="mono">BYTES, BINARY</td><td>variable</td><td>Raw byte sequence.</td></tr>
    </tbody></table></div>

    <h2 id="bool">Boolean</h2>
    <div class="table-scroll"><table class="ds-table"><thead><tr><th>Type</th><th>Storage</th><th>Values</th></tr></thead><tbody>
      <tr><td class="mono">BOOLEAN</td><td>1 byte</td><td>TRUE, FALSE, NULL</td></tr>
    </tbody></table></div>

    <h2 id="time">Date / Time types</h2>
    <div class="table-scroll"><table class="ds-table"><thead><tr><th>Type</th><th>Storage</th><th>Resolution</th><th>Range</th></tr></thead><tbody>
      <tr><td class="mono">DATE</td><td>4 bytes</td><td>day</td><td>4713 BC to 9999 AD</td></tr>
      <tr><td class="mono">TIME</td><td>8 bytes</td><td>microsecond</td><td>00:00:00 – 23:59:59.999999</td></tr>
      <tr><td class="mono">TIMESTAMP</td><td>8 bytes</td><td>microsecond</td><td>4713 BC – 294246 AD</td></tr>
      <tr><td class="mono">TIMESTAMPTZ</td><td>8 bytes</td><td>microsecond</td><td>Timezone-aware</td></tr>
      <tr><td class="mono">INTERVAL</td><td>16 bytes</td><td>microsecond</td><td>±178M years</td></tr>
    </tbody></table></div>

    <h2 id="composite">Composite</h2>
    <div class="table-scroll"><table class="ds-table"><thead><tr><th>Type</th><th>Description</th></tr></thead><tbody>
      <tr><td class="mono">JSON</td><td>Parsed and indexed JSON document. Supports JSONPath and arrow operators.</td></tr>
      <tr><td class="mono">ARRAY&lt;T&gt;</td><td>Variable-length array of any base type, including nested ARRAY and JSON.</td></tr>
      <tr><td class="mono">STRUCT&lt;a:T,b:T&gt;</td><td>Anonymous tuple with named fields.</td></tr>
      <tr><td class="mono">MAP&lt;K,V&gt;</td><td>Key-value map with homogeneous keys and values.</td></tr>
    </tbody></table></div>
  `;
  $('#refToc').innerHTML = `<h5>On this page</h5>
    <a href="#numeric">Numeric</a><a href="#string">String</a><a href="#bool">Boolean</a>
    <a href="#time">Date / Time</a><a href="#composite">Composite</a>`;
  bindToc();
}

function initSqlSelect() {
  if (!$('#sqlSelectPage')) return;
  renderNav();
  $('#sqlSelectContent').innerHTML = `
    <h1 style="font-family:'Inter',sans-serif;color:var(--ink)">SELECT statement</h1>
    <p class="desc">SELECT is the workhorse of Tessera. Its clauses are evaluated in a fixed order even though they may be written in any order in the source text.</p>
    <h2 id="syntax">Syntax</h2>
    <div class="railroad">
      <span class="rr-tok rr-kw">SELECT</span>
      <span class="rr-line"></span>
      <span class="rr-opt">[DISTINCT]</span>
      <span class="rr-tok rr-id">expression</span>
      <span class="rr-line"></span>
      <span class="rr-tok rr-kw">FROM</span>
      <span class="rr-line"></span>
      <span class="rr-tok rr-id">source</span>
      <span class="rr-line"></span>
      <span class="rr-tok rr-kw">[WHERE]</span>
      <span class="rr-line"></span>
      <span class="rr-tok rr-id">predicate</span>
      <span class="rr-line"></span>
      <span class="rr-tok rr-kw">[GROUP BY]</span>
      <span class="rr-tok rr-id">expression</span>
      <span class="rr-line"></span>
      <span class="rr-tok rr-kw">[HAVING]</span>
      <span class="rr-tok rr-id">predicate</span>
      <br><br>
      <span class="rr-tok rr-kw">[ORDER BY]</span>
      <span class="rr-tok rr-id">expression</span>
      <span class="rr-line"></span>
      <span class="rr-tok rr-kw">[LIMIT]</span>
      <span class="rr-tok rr-id">n</span>
      <span class="rr-line"></span>
      <span class="rr-tok rr-kw">[OFFSET]</span>
      <span class="rr-tok rr-id">n</span>
    </div>

    <h2 id="with">WITH</h2>
    <p>Common table expressions for readability and recursion.</p>
    <pre class="example-block"><button class="copy-btn" type="button" aria-label="Copy code to clipboard">Copy</button><span class="kw">WITH</span> recent <span class="kw">AS</span> (
  <span class="kw">SELECT</span> id, amount_cents <span class="kw">FROM</span> orders <span class="kw">WHERE</span> created_at &gt;= <span class="str">'2026-05-01'</span>
)
<span class="kw">SELECT</span> <span class="fn">SUM</span>(amount_cents) <span class="kw">FROM</span> recent;</pre>

    <h2 id="from">FROM</h2>
    <p>Sources can be tables, subqueries, table-valued functions, or external file readers.</p>
    <pre class="example-block"><button class="copy-btn" type="button" aria-label="Copy code to clipboard">Copy</button><span class="kw">SELECT</span> * <span class="kw">FROM</span> read_parquet(<span class="str">'s3://bucket/orders/*.parquet'</span>);</pre>

    <h2 id="where">WHERE</h2>
    <p>Row-level filter applied before grouping. Supports any expression returning BOOLEAN.</p>

    <h2 id="groupby">GROUP BY</h2>
    <p>Groups rows by the listed expressions. SELECT items must be aggregates or referenced in GROUP BY.</p>

    <h2 id="having">HAVING</h2>
    <p>Post-grouping filter, evaluated after aggregates compute.</p>

    <h2 id="orderby">ORDER BY</h2>
    <p>Sorts the final result. Supports ASC / DESC and NULLS FIRST / LAST.</p>

    <h2 id="limit">LIMIT and OFFSET</h2>
    <p>Restricts the row count. OFFSET can be expensive on large result sets — prefer cursor pagination.</p>

    <div class="callout"><b>Performance tip.</b> Push column projection and filters into your storage layer when reading from Parquet — Tessera's <span class="mono">read_parquet</span> applies predicate pushdown automatically when supported.</div>

    <h2 id="examples">Examples</h2>
    <pre class="example-block"><button class="copy-btn" type="button" aria-label="Copy code to clipboard">Copy</button><span class="cmt">-- Top spenders this quarter</span>
<span class="kw">SELECT</span> customer_id, <span class="fn">SUM</span>(amount_cents) <span class="kw">AS</span> total
<span class="kw">FROM</span> orders
<span class="kw">WHERE</span> created_at &gt;= <span class="str">'2026-04-01'</span>
<span class="kw">GROUP BY</span> customer_id
<span class="kw">HAVING</span> <span class="fn">SUM</span>(amount_cents) &gt; <span class="num">100000</span>
<span class="kw">ORDER BY</span> total <span class="kw">DESC</span>
<span class="kw">LIMIT</span> <span class="num">20</span>;</pre>
  `;
  $('#refToc').innerHTML = `<h5>On this page</h5>
    <a href="#syntax">Syntax</a><a href="#with">WITH</a><a href="#from">FROM</a>
    <a href="#where">WHERE</a><a href="#groupby">GROUP BY</a><a href="#having">HAVING</a>
    <a href="#orderby">ORDER BY</a><a href="#limit">LIMIT</a><a href="#examples">Examples</a>`;
  bindToc();
  bindCopyButtons();
}

function initCmdk() {
  const overlay = $('#cmdkOverlay');
  if (!overlay) return;
  const items = [];
  NAV_TREE.forEach(cat => {
    if (cat.subgroups) cat.subgroups.forEach(sg => sg.items.forEach(i => items.push({ label: i.label, href: i.href, soon: i.soon, group: cat.label + ' · ' + sg.name })));
    else if (cat.items) cat.items.forEach(i => items.push({ label: i.label, href: i.href, soon: i.soon, group: cat.label }));
  });
  items.push({ label: 'Data types', href: 'data-types.html', group: 'Reference' });
  items.push({ label: 'SELECT statement', href: 'sql-select.html', group: 'Reference' });

  let activeIdx = 0;
  let lastFocus = null;

  function open() {
    overlay.classList.remove('hidden');
    document.body.classList.add('cmdk-open');
    lastFocus = document.activeElement;
    setTimeout(() => $('#cmdkInput').focus(), 0);
  }
  function close() {
    overlay.classList.add('hidden');
    document.body.classList.remove('cmdk-open');
    if (lastFocus && lastFocus.focus) try { lastFocus.focus(); } catch (_) {}
  }

  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); open(); return; }
    if (overlay.classList.contains('hidden')) return;
    if (e.key === 'Escape') { e.preventDefault(); close(); return; }
    const results = $$('#cmdkResults .result');
    if (!results.length) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); activeIdx = (activeIdx + 1) % results.length; updateActive(results); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); activeIdx = (activeIdx - 1 + results.length) % results.length; updateActive(results); }
    else if (e.key === 'Enter') {
      e.preventDefault();
      const el = results[activeIdx];
      if (el) selectResult(el);
    }
  });

  function updateActive(results) {
    results.forEach((r, i) => r.classList.toggle('kbd-active', i === activeIdx));
    const el = results[activeIdx];
    if (el && el.scrollIntoView) el.scrollIntoView({ block: 'nearest' });
  }

  function selectResult(el) {
    if (el.dataset.soon === '1') {
      close();
      showToast('Coming soon — this page isn\'t available yet.');
      return;
    }
    const href = el.getAttribute('data-href');
    if (href) {
      close();
      window.location.href = href;
    }
  }

  const btn = $('#cmdkBtn');
  if (btn) btn.addEventListener('click', open);

  function render(query) {
    const filtered = items.filter(i => i.label.toLowerCase().includes(query.toLowerCase())).slice(0, 12);
    const grouped = filtered.reduce((acc, it) => { (acc[it.group] = acc[it.group] || []).push(it); return acc; }, {});
    const html = Object.entries(grouped).map(([g, gitems]) => `<div class="group-h">${g}</div>${gitems.map(i => {
      const soon = i.soon || !i.href || i.href === '#';
      return `<button type="button" class="result" data-href="${soon ? '' : i.href}" data-soon="${soon ? '1' : '0'}">${i.label}${soon ? ' <span class="soon-tag">soon</span>' : ''}</button>`;
    }).join('')}`).join('');
    $('#cmdkResults').innerHTML = html || '<div class="group-h">No results</div>';
    activeIdx = 0;
    const results = $$('#cmdkResults .result');
    updateActive(results);
    results.forEach((r, i) => {
      r.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); selectResult(r); });
      r.addEventListener('mouseenter', () => { activeIdx = i; updateActive(results); });
    });
  }
  render('');
  $('#cmdkInput').addEventListener('input', e => render(e.target.value));
  // Backdrop click closes — only when target is the overlay (not the box)
  overlay.addEventListener('mousedown', e => { if (e.target === overlay) close(); });
  // Explicit close button if present
  const closeBtn = $('#cmdkClose');
  if (closeBtn) closeBtn.addEventListener('click', close);
}

function applyTheme(theme) {
  if (theme === 'dark') document.body.classList.add('theme-dark');
  else document.body.classList.remove('theme-dark');
  const btn = $('#themeToggle');
  if (btn) {
    btn.setAttribute('aria-pressed', theme === 'dark');
    btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    btn.title = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';
    btn.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

function initTheme() {
  let saved = null;
  try { saved = localStorage.getItem('tessera-theme'); } catch (_) {}
  applyTheme(saved === 'dark' ? 'dark' : 'light');
  const btn = $('#themeToggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const isDark = !document.body.classList.contains('theme-dark');
    applyTheme(isDark ? 'dark' : 'light');
    try { localStorage.setItem('tessera-theme', isDark ? 'dark' : 'light'); } catch (_) {}
    showToast(isDark ? 'Dark theme enabled' : 'Light theme enabled');
  });
}

function initVersionBadge() {
  const sw = $('#verSwitch');
  if (!sw) return;
  // Restore previous selection
  let saved = null;
  try { saved = localStorage.getItem('tessera-version'); } catch (_) {}
  if (saved) {
    Array.from(sw.options).forEach(o => { if (o.value === saved || o.textContent.startsWith(saved)) o.selected = true; });
  }
  // Reflect selection in a visible page badge if present
  const updateBadge = () => {
    const v = sw.value || sw.options[sw.selectedIndex].textContent;
    const badges = $$('.ver-page-badge');
    badges.forEach(b => b.textContent = 'Viewing docs for ' + v);
  };
  updateBadge();
  sw.addEventListener('change', () => {
    const v = sw.value || sw.options[sw.selectedIndex].textContent;
    try { localStorage.setItem('tessera-version', v); } catch (_) {}
    updateBadge();
    showToast('Now viewing ' + v + ' docs (demo)');
  });
}

let _toastTimer = null;
function showToast(msg) {
  let t = $('#tessera-toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'tessera-toast';
    t.setAttribute('role', 'status');
    t.setAttribute('aria-live', 'polite');
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  if (_toastTimer) clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
}

// Block any anchor on the page whose href is "#" (placeholders) and show a toast,
// EXCEPT links inside collapsible/section/toc nav (TOC anchors point to real ids).
function wireGlobalPlaceholderLinks() {
  $$('a[href="#"]').forEach(a => {
    if (a.closest('#refToc')) return; // toc anchors are real fragments
    if (a.dataset.soonBound) return;
    if (a.dataset.soon === '1') return; // already wired by renderer
    a.dataset.soonBound = '1';
    a.classList.add('soon');
    a.setAttribute('aria-disabled', 'true');
    a.setAttribute('title', 'Coming soon');
    a.addEventListener('click', e => {
      e.preventDefault();
      showToast('Coming soon — this link isn\'t available yet.');
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initCmdk();
  initVersionBadge();
  initReferenceOverview();
  initOperators();
  initDataTypes();
  initSqlSelect();

  // function pages
  const fp = window.__fnPage;
  if (fp === 'date-trunc') renderFunctionPage(FN_DATE_TRUNC);
  else if (fp === 'regexp-match') renderFunctionPage(FN_REGEXP_MATCH);
  else if (fp === 'json-extract') renderFunctionPage(FN_JSON_EXTRACT);
  else if (fp === 'row-number') renderFunctionPage(FN_ROW_NUMBER);

  // Bind copies for any pages that have static example blocks
  bindCopyButtons();
  // Mark and intercept all "#" placeholder anchors site-wide
  wireGlobalPlaceholderLinks();
});
