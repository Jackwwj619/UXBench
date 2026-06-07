const OWNERS = [
  { id: 'mp', name: 'Maya Pereira', team: 'platform' },
  { id: 'do', name: 'Daniel Okafor', team: 'payments' },
  { id: 'hl', name: 'Hua Lin', team: 'users' },
  { id: 'sv', name: 'Sofia Vetrov', team: 'billing' },
  { id: 'ab', name: 'Arjun Bhatia', team: 'integrations' },
  { id: 'kw', name: 'Kira Werner', team: 'notifications' }
];

const ENDPOINTS = [
  { method: 'POST', path: '/v1/payments', service: 'checkout-api', health: 'red', rps: 412, p95: 540, err: 6.4, owner: 'do' },
  { method: 'POST', path: '/v1/webhooks/stripe', service: 'integrations-svc', health: 'red', rps: 88, p95: 1320, err: 9.1, owner: 'ab' },
  { method: 'GET', path: '/v1/invoices', service: 'billing-svc', health: 'red', rps: 245, p95: 680, err: 5.8, owner: 'sv' },
  { method: 'PATCH', path: '/v1/subscriptions/:id', service: 'billing-svc', health: 'yellow', rps: 96, p95: 380, err: 2.4, owner: 'sv' },
  { method: 'POST', path: '/v1/files/upload', service: 'asset-svc', health: 'yellow', rps: 64, p95: 920, err: 3.1, owner: 'mp' },
  { method: 'GET', path: '/v1/orgs/:id/members', service: 'users-svc', health: 'yellow', rps: 188, p95: 240, err: 1.8, owner: 'hl' },
  { method: 'POST', path: '/v1/auth/login', service: 'users-svc', health: 'yellow', rps: 522, p95: 310, err: 2.1, owner: 'hl' },
  { method: 'GET', path: '/v1/users/:id', service: 'users-svc', health: 'green', rps: 1840, p95: 88, err: 0.4, owner: 'hl' },
  { method: 'POST', path: '/v1/users', service: 'users-svc', health: 'green', rps: 142, p95: 165, err: 0.6, owner: 'hl' },
  { method: 'PATCH', path: '/v1/users/:id', service: 'users-svc', health: 'green', rps: 96, p95: 142, err: 0.3, owner: 'hl' },
  { method: 'DELETE', path: '/v1/users/:id', service: 'users-svc', health: 'green', rps: 8, p95: 122, err: 0.0, owner: 'hl' },
  { method: 'GET', path: '/v1/payments/:id', service: 'checkout-api', health: 'green', rps: 980, p95: 110, err: 0.5, owner: 'do' },
  { method: 'POST', path: '/v1/payments/:id/capture', service: 'checkout-api', health: 'green', rps: 220, p95: 184, err: 0.9, owner: 'do' },
  { method: 'POST', path: '/v1/payments/:id/cancel', service: 'checkout-api', health: 'green', rps: 32, p95: 92, err: 0.2, owner: 'do' },
  { method: 'GET', path: '/v1/customers/:id', service: 'users-svc', health: 'green', rps: 1240, p95: 78, err: 0.2, owner: 'hl' },
  { method: 'GET', path: '/v1/customers', service: 'users-svc', health: 'green', rps: 322, p95: 158, err: 0.4, owner: 'hl' },
  { method: 'POST', path: '/v1/customers', service: 'users-svc', health: 'green', rps: 86, p95: 142, err: 0.5, owner: 'hl' },
  { method: 'POST', path: '/v1/refunds', service: 'billing-svc', health: 'green', rps: 28, p95: 220, err: 0.7, owner: 'sv' },
  { method: 'GET', path: '/v1/subscriptions/:id', service: 'billing-svc', health: 'green', rps: 162, p95: 88, err: 0.3, owner: 'sv' },
  { method: 'POST', path: '/v1/notifications/send', service: 'notification-gateway', health: 'green', rps: 308, p95: 195, err: 0.8, owner: 'kw' },
  { method: 'POST', path: '/v1/audit/log', service: 'audit-log-ingest', health: 'green', rps: 2890, p95: 32, err: 0.1, owner: 'mp' },
  { method: 'GET', path: '/v1/products/:id', service: 'catalog-svc', health: 'green', rps: 740, p95: 64, err: 0.3, owner: 'mp' },
  { method: 'GET', path: '/v1/orders/:id', service: 'order-svc', health: 'green', rps: 522, p95: 102, err: 0.4, owner: 'do' },
  { method: 'POST', path: '/v1/orders', service: 'order-svc', health: 'green', rps: 168, p95: 220, err: 0.9, owner: 'do' }
];

const ACTIVE_ALERTS = [
  { id: 'al1', severity: 'critical', rule: 'Error rate > 5%', endpoint: 'POST /v1/payments', desc: 'Error rate at 6.4% over last 5 min', when: '2 min ago' },
  { id: 'al2', severity: 'critical', rule: 'p95 latency > 1000ms', endpoint: 'POST /v1/webhooks/stripe', desc: 'p95 at 1320ms for 8 min', when: '8 min ago' },
  { id: 'al3', severity: 'critical', rule: 'Error rate > 5%', endpoint: 'POST /v1/webhooks/stripe', desc: '9.1% errors, mostly 502 Bad Gateway', when: '8 min ago' },
  { id: 'al4', severity: 'warning', rule: 'Error rate > 3%', endpoint: 'GET /v1/invoices', desc: 'Sustained 5.8% errors', when: '14 min ago' },
  { id: 'al5', severity: 'warning', rule: 'SLO burn rate 6x', endpoint: 'POST /v1/files/upload', desc: '24h SLO burn rate at 6.2x', when: '32 min ago' },
  { id: 'al6', severity: 'warning', rule: 'Latency > 300ms', endpoint: 'PATCH /v1/subscriptions/:id', desc: 'p95 at 380ms, expected <300ms', when: '48 min ago' },
  { id: 'al7', severity: 'info', rule: 'Deployment detected', endpoint: 'POST /v1/auth/login', desc: 'New deployment users-svc@v2.41.0', when: '1h ago' },
  { id: 'al8', severity: 'info', rule: 'Traffic spike +120%', endpoint: 'GET /v1/users/:id', desc: 'RPS at 1840, 2.2× baseline', when: '1h ago' }
];

const SERVICES = [
  { id: 'edge', label: 'edge-gateway', health: 'green', x: 100, y: 200 },
  { id: 'users', label: 'users-svc', health: 'yellow', x: 320, y: 110 },
  { id: 'checkout', label: 'checkout-api', health: 'red', x: 320, y: 220 },
  { id: 'billing', label: 'billing-svc', health: 'red', x: 320, y: 340 },
  { id: 'audit', label: 'audit-log-ingest', health: 'green', x: 540, y: 80 },
  { id: 'order', label: 'order-svc', health: 'green', x: 540, y: 180 },
  { id: 'integrations', label: 'integrations-svc', health: 'red', x: 540, y: 290 },
  { id: 'notification', label: 'notification-gateway', health: 'green', x: 540, y: 380 },
  { id: 'asset', label: 'asset-svc', health: 'yellow', x: 760, y: 240 },
  { id: 'catalog', label: 'catalog-svc', health: 'green', x: 760, y: 130 }
];

const SERVICE_EDGES = [
  ['edge', 'users', 8], ['edge', 'checkout', 6], ['edge', 'billing', 4],
  ['users', 'audit', 3], ['users', 'order', 2],
  ['checkout', 'order', 5], ['checkout', 'integrations', 4], ['checkout', 'billing', 3],
  ['billing', 'notification', 2], ['order', 'catalog', 4], ['order', 'asset', 1]
];

function $(s, r) { return (r || document).querySelector(s); }
function $$(s, r) { return Array.from((r || document).querySelectorAll(s)); }

function ownerById(id) { return OWNERS.find(o => o.id === id) || { name: 'Unassigned' }; }
function ownerInitials(o) { return o.name.split(' ').map(p => p[0]).join('').slice(0, 2); }

function sparkPath(values, w, h, color) {
  const max = Math.max(...values), min = Math.min(...values);
  const range = max - min || 1;
  const step = w / (values.length - 1);
  let d = '';
  values.forEach((v, i) => {
    const x = i * step, y = h - ((v - min) / range) * (h - 4) - 2;
    d += (i === 0 ? 'M' : 'L') + x + ' ' + y + ' ';
  });
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><path d="${d}" stroke="${color}" stroke-width="1.5" fill="none"/></svg>`;
}

const RANGE_LABELS = {
  '5m': ['5m ago', '4m', '3m', '2m', 'now'],
  '1h': ['1h ago', '45m', '30m', '15m', 'now'],
  '24h': ['24h ago', '18h', '12h', '6h', 'now'],
  '7d': ['7d ago', '5d', '3d', '1d', 'now']
};
let CURRENT_RANGE = '1h';
let CURRENT_ENV = 'prod';

function rangeScale(range) {
  // multiplier for synthetic series so longer windows look noisier / different
  return ({ '5m': 0.6, '1h': 1, '24h': 1.4, '7d': 2.1 })[range] || 1;
}

function lineChart(series, w, h, opts) {
  opts = opts || {};
  const padL = 40, padR = 12, padT = 12, padB = 28;
  const innerW = w - padL - padR, innerH = h - padT - padB;
  const allValues = series.flatMap(s => s.values);
  const max = Math.max(...allValues) * 1.1;
  const min = 0;
  const range = max - min || 1;
  const len = series[0].values.length;
  const step = innerW / (len - 1);
  const paths = series.map(s => {
    let d = '';
    s.values.forEach((v, i) => {
      const x = padL + i * step, y = padT + innerH - ((v - min) / range) * innerH;
      d += (i === 0 ? 'M' : 'L') + x + ' ' + y + ' ';
    });
    return `<path d="${d}" stroke="${s.color}" stroke-width="1.8" fill="none"/>`;
  }).join('');
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map(t => {
    const y = padT + innerH - t * innerH;
    const v = (min + t * range).toFixed(0);
    return `<line x1="${padL}" y1="${y}" x2="${w - padR}" y2="${y}" stroke="#232D3F" stroke-width="0.5"/><text x="${padL - 6}" y="${y + 3}" text-anchor="end" fill="#8893A8" font-size="10">${v}${opts.suffix || ''}</text>`;
  }).join('');
  const labels = RANGE_LABELS[opts.range || CURRENT_RANGE] || RANGE_LABELS['1h'];
  const xTicks = labels.map((l, i) => {
    const x = padL + (i / 4) * innerW;
    return `<text x="${x}" y="${h - 10}" text-anchor="middle" fill="#8893A8" font-size="10">${l}</text>`;
  }).join('');
  return `<svg width="100%" height="${h}" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid meet">${yTicks}${paths}${xTicks}</svg>`;
}

function fakeSeries(n, mean, jitter) {
  return Array.from({length: n}).map((_, i) => Math.max(0, mean + Math.sin(i * 0.5) * jitter + (Math.random() - 0.5) * jitter));
}

function renderKpiSparks() {
  $$('.spark-line').forEach((el, i) => {
    const colors = ['#3B82F6', '#EF4444', '#A855F7', '#22C55E'];
    el.innerHTML = sparkPath(fakeSeries(20, 50, 18), 100, 30, colors[i] || '#3B82F6');
  });
}

function renderEndpointGrid() {
  const grid = $('#endpointGrid');
  if (!grid) return;
  const sorted = [...ENDPOINTS].sort((a, b) => {
    const order = { red: 0, yellow: 1, green: 2 };
    return order[a.health] - order[b.health];
  });
  grid.innerHTML = sorted.map(e => `
    <div class="endpoint-card" data-ep="${e.method} ${e.path}">
      <div class="top">
        <span class="method ${e.method}">${e.method}</span>
        <span style="color:var(--ink-sub);font-size:11px;font-family:'JetBrains Mono',monospace">${e.service}</span>
        <span class="health-dot ${e.health}"></span>
      </div>
      <div class="path">${e.path}</div>
      <div class="stats">
        <div class="stat"><div class="skey">RPS</div><div class="sval">${e.rps}</div></div>
        <div class="stat"><div class="skey">p95</div><div class="sval ${e.p95 > 500 ? 'red' : e.p95 > 300 ? 'yellow' : ''}">${e.p95}ms</div></div>
        <div class="stat"><div class="skey">errors</div><div class="sval ${e.err > 5 ? 'red' : e.err > 1 ? 'yellow' : ''}">${e.err.toFixed(1)}%</div></div>
      </div>
    </div>`).join('');
  $$('.endpoint-card').forEach(c => c.addEventListener('click', () => {
    const ep = encodeURIComponent(c.getAttribute('data-ep'));
    location.href = 'endpoint-detail.html?ep=' + ep;
  }));
}

function renderAlertRail() {
  const rail = $('#alertRail');
  if (!rail) return;
  rail.innerHTML = ACTIVE_ALERTS.map(a => `
    <div class="alert-item">
      <div class="ai-top"><span class="severity-pill ${a.severity}">${a.severity}</span><span class="ep">${a.endpoint}</span></div>
      <div class="desc"><b>${a.rule}</b></div>
      <div class="desc" style="color:var(--ink-sub);font-size:12px">${a.desc}</div>
      <div class="when">${a.when}</div>
      <div class="actions">
        <button onclick="confirmAction('Assign alert', 'Open assign modal for: ${a.endpoint}')">Assign</button>
        <button onclick="confirmAction('Silence alert', 'Silence alert &quot;${a.rule}&quot; for 1 hour?')">Silence</button>
      </div>
    </div>`).join('');
}

function renderGlobalLatency() {
  const el = $('#globalLatency');
  if (!el) return;
  const head = $('#globalLatencyTitle');
  if (head) head.textContent = `Global latency (p50 / p95 / p99) · ${CURRENT_RANGE}`;
  const m = rangeScale(CURRENT_RANGE);
  el.innerHTML = lineChart([
    { color: '#3B82F6', values: fakeSeries(60, 90 * m, 18 * m) },
    { color: '#A855F7', values: fakeSeries(60, 220 * m, 60 * m) },
    { color: '#EF4444', values: fakeSeries(60, 480 * m, 140 * m) }
  ], 800, 220, { suffix: 'ms', range: CURRENT_RANGE });
}

function confirmAction(title, body, onConfirm) {
  $('#modalTitle').textContent = title;
  $('#modalBody').textContent = body;
  $('#confirmModal').classList.remove('hidden');
  $('#modalCancel').onclick = () => $('#confirmModal').classList.add('hidden');
  $('#modalConfirm').onclick = () => { $('#confirmModal').classList.add('hidden'); onConfirm && onConfirm(); };
}

function initDashboard() {
  if (!$('#endpointGrid')) return;
  renderKpiSparks();
  renderEndpointGrid();
  renderAlertRail();
  renderGlobalLatency();

  $$('.env-tabs button').forEach(b => b.addEventListener('click', () => {
    $$('.env-tabs button').forEach(x => { x.classList.remove('active'); x.setAttribute('aria-selected', 'false'); });
    b.classList.add('active');
    b.setAttribute('aria-selected', 'true');
    CURRENT_ENV = b.getAttribute('data-env') || CURRENT_ENV;
    renderEndpointGrid();
  }));
  $$('.time-range .tr-btn').forEach(b => b.addEventListener('click', () => {
    $$('.time-range .tr-btn').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    CURRENT_RANGE = b.getAttribute('data-range') || CURRENT_RANGE;
    renderGlobalLatency();
    renderKpiSparks();
  }));
  const tt = $('#themeToggle');
  if (tt) tt.addEventListener('click', () => document.body.classList.toggle('theme-light'));
}

function initEndpointDetail() {
  const root = $('#endpointDetail');
  if (!root) return;
  const ep = decodeURIComponent(new URLSearchParams(location.search).get('ep') || 'POST /v1/payments');
  const [method, path] = ep.split(' ');
  const e = ENDPOINTS.find(x => x.method === method && x.path === path) || ENDPOINTS[0];
  const owner = ownerById(e.owner);
  const sloBreached = e.err >= 0.1;

  root.innerHTML = `
    <div class="detail-head">
      <div class="row1">
        <span class="method ${e.method}" style="font-size:13px;padding:4px 10px">${e.method}</span>
        <h1>${e.path}</h1>
        <span class="health-badge ${e.health}">${e.health === 'green' ? 'Healthy' : e.health === 'yellow' ? 'Degraded' : 'Unhealthy'}</span>
      </div>
      <div class="row2">
        <span>Service · <b style="color:var(--ink)">${e.service}</b></span>
        <span>Owner</span>
        <span class="owner-chip"><span class="av">${ownerInitials(owner)}</span>${owner.name}</span>
      </div>
    </div>
    <div class="detail-body">
      <div class="kpi-row6">
        <div class="kpi-tile"><div class="lbl">RPS</div><div class="val mono" id="kpiRps">${e.rps}</div></div>
        <div class="kpi-tile ${e.err > 5 ? 'breach' : ''}"><div class="lbl">Error Rate</div><div class="val mono" style="color:${e.err > 5 ? 'var(--red)' : e.err > 1 ? 'var(--yellow)' : 'inherit'}">${e.err.toFixed(2)}%</div></div>
        <div class="kpi-tile"><div class="lbl">p50</div><div class="val mono">${Math.round(e.p95 * 0.35)}ms</div></div>
        <div class="kpi-tile"><div class="lbl">p95</div><div class="val mono">${e.p95}ms</div></div>
        <div class="kpi-tile"><div class="lbl">p99</div><div class="val mono">${Math.round(e.p95 * 1.6)}ms</div></div>
        <div class="kpi-tile ${sloBreached ? 'breach' : ''}" aria-label="SLO ${sloBreached ? 'Breached' : 'Meeting'}"><div class="lbl">SLO 99.9%</div><div class="val mono" style="font-size:18px">${sloBreached ? '⚠ Breached' : '✓ Meeting'}</div></div>
      </div>

      <div class="trend-charts" id="trendCharts"></div>

      <div class="chart-card">
        <h3>Error breakdown</h3>
        <div class="tab-bar">
          <button class="active" data-eb="status">By status code</button>
          <button data-eb="client">By client version</button>
          <button data-eb="region">By region</button>
        </div>
        <div id="errBreakdown" class="stacked-bar"></div>
      </div>

      <div class="chart-card">
        <h3>Recent error samples</h3>
        <table class="data-table" style="border:none">
          <thead><tr><th>Time</th><th>Status</th><th>Client</th><th>Request ID</th><th>Message</th></tr></thead>
          <tbody id="errSamples"></tbody>
        </table>
      </div>

      <div class="chart-card">
        <h3>Related traces</h3>
        <table class="data-table" style="border:none">
          <thead><tr><th>Trace ID</th><th>Duration</th><th>Spans</th><th>Status</th><th>Service entry</th></tr></thead>
          <tbody id="traces"></tbody>
        </table>
      </div>
    </div>
  `;

  const errGroups = {
    status: [
      { key: '500', pct: 0.42 }, { key: '502', pct: 0.28 }, { key: '503', pct: 0.16 }, { key: '429', pct: 0.10 }, { key: '400', pct: 0.04 }
    ],
    client: [
      { key: 'sdk-py 2.4', pct: 0.38 }, { key: 'sdk-node 1.9', pct: 0.27 }, { key: 'sdk-go 0.4', pct: 0.18 }, { key: 'curl/manual', pct: 0.12 }, { key: 'others', pct: 0.05 }
    ],
    region: [
      { key: 'us-east-1', pct: 0.46 }, { key: 'eu-west-1', pct: 0.29 }, { key: 'ap-northeast-1', pct: 0.15 }, { key: 'us-west-2', pct: 0.07 }, { key: 'others', pct: 0.03 }
    ]
  };
  function renderErrGroup(k) {
    $('#errBreakdown').innerHTML = errGroups[k].map(g => `
      <div class="stacked-row">
        <span class="key">${g.key}</span>
        <div class="bar"><span style="width:${g.pct * 100}%"></span></div>
        <span class="val">${(g.pct * 100).toFixed(1)}%</span>
      </div>`).join('');
  }
  renderErrGroup('status');
  $$('.tab-bar button[data-eb]').forEach(b => b.addEventListener('click', () => {
    $$('.tab-bar button[data-eb]').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    renderErrGroup(b.getAttribute('data-eb'));
  }));

  $('#errSamples').innerHTML = [
    { time: '13:42:18.231', status: 502, client: 'sdk-py 2.4', rid: 'req_8Hk2nF9MqXzL', msg: 'upstream connect timeout (Stripe webhook)' },
    { time: '13:41:55.812', status: 500, client: 'sdk-node 1.9', rid: 'req_3Yp9wT2nKqM5', msg: 'Internal: payment processor returned malformed response' },
    { time: '13:41:12.401', status: 429, client: 'sdk-go 0.4', rid: 'req_7Aa1bF8MqRxX', msg: 'Rate limit exceeded: 1000 req/min on key sk_live_***'},
    { time: '13:40:38.097', status: 503, client: 'sdk-py 2.4', rid: 'req_K2nF8jQa9TpL', msg: 'Service unavailable: downstream pool exhausted' },
    { time: '13:39:56.221', status: 500, client: 'sdk-node 1.9', rid: 'req_M5kQ2nF7DpL3', msg: 'Internal: failed to acquire db connection (timeout 5s)' }
  ].map(s => `<tr><td class="mono">${s.time}</td><td class="mono" style="color:var(--red)">${s.status}</td><td>${s.client}</td><td class="mono" style="font-size:11px">${s.rid}</td><td style="color:var(--ink-sub)">${s.msg}</td></tr>`).join('');

  $('#traces').innerHTML = Array.from({length: 5}).map(() => {
    const tid = 'trace_' + Math.random().toString(36).slice(2, 14);
    const dur = (Math.random() * 800 + 200).toFixed(0);
    return `<tr><td class="mono" style="font-size:11px">${tid}</td><td class="mono">${dur}ms</td><td class="mono">${Math.floor(Math.random() * 14 + 4)}</td><td><span class="severity-pill ${Math.random() > 0.5 ? 'warning' : 'info'}">${Math.random() > 0.5 ? 'partial' : 'ok'}</span></td><td class="mono" style="color:var(--ink-sub)">${e.service}</td></tr>`;
  }).join('');

  function renderDetailTrends() {
    const wrap = $('#trendCharts');
    if (!wrap) return;
    const m = rangeScale(CURRENT_RANGE);
    wrap.innerHTML = `
      <div class="chart-card"><h3>Request volume · ${CURRENT_RANGE}</h3>${lineChart([{ color: '#3B82F6', values: fakeSeries(60, e.rps * m, e.rps * 0.2 * m) }], 400, 180, { range: CURRENT_RANGE })}</div>
      <div class="chart-card"><h3>Latency p50 / p95 / p99 · ${CURRENT_RANGE}</h3>${lineChart([
        { color: '#3B82F6', values: fakeSeries(60, e.p95 * 0.35 * m, 10 * m) },
        { color: '#A855F7', values: fakeSeries(60, e.p95 * m, 40 * m) },
        { color: '#EF4444', values: fakeSeries(60, e.p95 * 1.6 * m, 80 * m) }
      ], 400, 180, { suffix: 'ms', range: CURRENT_RANGE })}<div class="legend-row"><span class="dot" style="background:#3B82F6"></span>p50<span class="dot" style="background:#A855F7"></span>p95<span class="dot" style="background:#EF4444"></span>p99</div></div>
      <div class="chart-card"><h3>Error rate · ${CURRENT_RANGE}</h3>${lineChart([{ color: '#EF4444', values: fakeSeries(60, e.err * m, e.err * 0.4 * m) }], 400, 180, { suffix: '%', range: CURRENT_RANGE })}</div>
    `;
  }
  renderDetailTrends();

  $$('.time-range .tr-btn').forEach(b => b.addEventListener('click', () => {
    $$('.time-range .tr-btn').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    CURRENT_RANGE = b.getAttribute('data-range') || CURRENT_RANGE;
    renderDetailTrends();
  }));
  $$('.env-tabs button').forEach(b => b.addEventListener('click', () => {
    $$('.env-tabs button').forEach(x => { x.classList.remove('active'); x.setAttribute('aria-selected', 'false'); });
    b.classList.add('active');
    b.setAttribute('aria-selected', 'true');
    CURRENT_ENV = b.getAttribute('data-env') || CURRENT_ENV;
    renderDetailTrends();
  }));
}

function initAlertsPage() {
  const root = $('#alertsPage');
  if (!root) return;
  const baseAlerts = [...ACTIVE_ALERTS,
    { id: 'al9', severity: 'info', rule: 'Healthy ratio < 95%', endpoint: 'GET /v1/orgs/:id/members', desc: 'Healthy fraction 92.4% last hour', when: '2h ago' },
    { id: 'al10', severity: 'info', rule: 'Cold-start spike', endpoint: 'POST /v1/files/upload', desc: 'Cold start latency 1.2s on lambda', when: '3h ago' },
    { id: 'al11', severity: 'warning', rule: 'Error rate > 3%', endpoint: 'POST /v1/orders', desc: '3.4% errors over 10 min', when: '4h ago' },
    { id: 'al12', severity: 'critical', rule: 'Service unreachable', endpoint: 'integrations-svc', desc: 'No healthy targets in pool', when: '4h ago' }
  ];
  // Stable random owner + status assignments per alert (so filters can match deterministically)
  const ownerIds = ['mp', 'do', 'hl', 'sv', 'ab', 'kw'];
  const statuses = ['open', 'assigned', 'resolved'];
  const alertRows = baseAlerts.map((a, i) => ({
    ...a,
    ownerId: ownerIds[i % ownerIds.length],
    status: statuses[i % statuses.length]
  }));
  const uniqueRules = [...new Set(alertRows.map(a => a.rule))];

  root.innerHTML = `
    <h1>Alerts</h1>
    <p class="page-sub">Active and recent alerts across your fleet of endpoints</p>
    <div class="kpi-row">
      <div class="kpi-tile"><div class="lbl">Active</div><div class="val mono" style="color:var(--red)">8</div><div class="trend down">+3 vs prev 24h</div></div>
      <div class="kpi-tile"><div class="lbl">New today</div><div class="val mono">22</div><div class="trend up">−14% week avg</div></div>
      <div class="kpi-tile"><div class="lbl">Avg response time</div><div class="val mono">3m 22s</div><div class="trend up">−42s</div></div>
      <div class="kpi-tile"><div class="lbl">MTTR (24h)</div><div class="val mono">14m 08s</div><div class="trend up">−2m</div></div>
    </div>
    <div class="toolbar" role="search">
      <select id="fSev" aria-label="Filter by severity"><option value="">All severities</option><option value="critical">Critical</option><option value="warning">Warning</option><option value="info">Info</option></select>
      <select id="fRule" aria-label="Filter by rule"><option value="">All rules</option>${uniqueRules.map(r => `<option value="${r}">${r}</option>`).join('')}</select>
      <select id="fAssignee" aria-label="Filter by assignee"><option value="">All assignees</option>${ownerIds.map(id => `<option value="${id}">${ownerById(id).name}</option>`).join('')}</select>
      <select id="fStatus" aria-label="Filter by status"><option value="">All status</option><option value="open">Open</option><option value="assigned">Assigned</option><option value="resolved">Resolved</option></select>
      <input id="fSearch" placeholder="Search rule, endpoint, description…" aria-label="Search alerts"/>
    </div>
    <p id="alertCount" class="page-sub" style="margin:6px 0 10px;font-size:12px"></p>
    <table class="data-table">
      <thead><tr><th>Time</th><th>Rule</th><th>Endpoint</th><th>Severity</th><th>Status</th><th>Owner</th></tr></thead>
      <tbody id="alertTbody"></tbody>
    </table>
  `;
  function rows() {
    const sev = $('#fSev').value;
    const rule = $('#fRule').value;
    const assignee = $('#fAssignee').value;
    const status = $('#fStatus').value;
    const q = ($('#fSearch').value || '').toLowerCase();
    const filtered = alertRows.filter(a =>
      (!sev || a.severity === sev) &&
      (!rule || a.rule === rule) &&
      (!assignee || a.ownerId === assignee) &&
      (!status || a.status === status) &&
      (!q || (a.rule + ' ' + a.endpoint + ' ' + a.desc).toLowerCase().includes(q))
    );
    const tb = $('#alertTbody');
    if (filtered.length === 0) {
      tb.innerHTML = `<tr><td colspan="6" style="text-align:center;color:var(--ink-sub);padding:32px">No alerts match the current filters.</td></tr>`;
    } else {
      tb.innerHTML = filtered.map(a => {
        const statusClass = a.status === 'resolved' ? 'info' : a.status === 'assigned' ? 'warning' : 'critical';
        return `<tr>
          <td class="mono" style="color:var(--ink-sub)">${a.when}</td>
          <td>${a.rule}<div style="color:var(--ink-sub);font-size:11px;margin-top:2px">${a.desc}</div></td>
          <td class="mono">${a.endpoint}</td>
          <td><span class="severity-pill ${a.severity}">${a.severity}</span></td>
          <td><span class="severity-pill ${statusClass}">${a.status}</span></td>
          <td>${ownerById(a.ownerId).name}</td>
        </tr>`;
      }).join('');
    }
    const cnt = $('#alertCount');
    if (cnt) {
      const anyFilter = sev || rule || assignee || status || q;
      cnt.textContent = anyFilter
        ? `Showing ${filtered.length} of ${alertRows.length} alerts`
        : `${alertRows.length} alerts`;
    }
  }
  ['#fSev', '#fRule', '#fAssignee', '#fStatus'].forEach(s => $(s).addEventListener('change', rows));
  $('#fSearch').addEventListener('input', rows);
  rows();
}

function initEndpointsPage() {
  const root = $('#endpointsPage');
  if (!root) return;
  // duplicate to reach 30+
  const all = [...ENDPOINTS, ...ENDPOINTS.slice(0, 8).map(e => ({ ...e, path: e.path + '/items' }))];
  root.innerHTML = `
    <h1>Endpoints</h1>
    <p class="page-sub" id="epCount">${all.length} monitored endpoints across all environments</p>
    <div class="toolbar" role="search">
      <select id="fSvc" aria-label="Filter by service"><option value="">All services</option>${[...new Set(all.map(e => e.service))].map(s => `<option>${s}</option>`).join('')}</select>
      <select id="fHealth" aria-label="Filter by health"><option value="">All health</option><option value="green">Healthy</option><option value="yellow">Degraded</option><option value="red">Unhealthy</option></select>
      <select id="fTag" aria-label="Filter by tag"><option value="">tag: any</option></select>
      <input id="fSearch" placeholder="Search method or path…" aria-label="Search endpoints"/>
    </div>
    <table class="data-table">
      <thead><tr><th>Method</th><th>Path</th><th>Service</th><th>Health</th><th>RPS</th><th>p95</th><th>Err %</th><th>SLO</th><th>Last deploy</th><th>Owner</th></tr></thead>
      <tbody id="epTbody"></tbody>
    </table>
  `;
  function rows() {
    const s = $('#fSvc').value, h = $('#fHealth').value, q = $('#fSearch').value.toLowerCase();
    const filtered = all.filter(e => (!s || e.service === s) && (!h || e.health === h) && (!q || (e.method + ' ' + e.path).toLowerCase().includes(q)));
    const cntEl = $('#epCount');
    if (cntEl) {
      const anyFilter = s || h || q;
      cntEl.textContent = anyFilter
        ? `Showing ${filtered.length} of ${all.length} monitored endpoints`
        : `${all.length} monitored endpoints across all environments`;
    }
    if (filtered.length === 0) {
      $('#epTbody').innerHTML = `<tr><td colspan="10" style="text-align:center;color:var(--ink-sub);padding:32px">No endpoints match the current filters.</td></tr>`;
      return;
    }
    $('#epTbody').innerHTML = filtered.map(e => {
      const o = ownerById(e.owner);
      return `<tr onclick="location.href='endpoint-detail.html?ep=${encodeURIComponent(e.method + ' ' + e.path)}'">
        <td><span class="method ${e.method}">${e.method}</span></td>
        <td class="mono">${e.path}</td>
        <td>${e.service}</td>
        <td><span class="health-dot ${e.health}" style="display:inline-block"></span></td>
        <td class="mono">${e.rps}</td>
        <td class="mono">${e.p95}ms</td>
        <td class="mono">${e.err.toFixed(1)}%</td>
        <td class="mono">${e.err < 0.5 ? '99.9%' : e.err < 2 ? '99.5%' : '⚠ breach'}</td>
        <td class="mono" style="color:var(--ink-sub);font-size:11px">${Math.floor(Math.random() * 9) + 1}h ago</td>
        <td><span class="owner-chip"><span class="av">${ownerInitials(o)}</span>${o.name.split(' ')[0]}</span></td>
      </tr>`;
    }).join('');
  }
  $('#fSvc').addEventListener('change', rows);
  $('#fHealth').addEventListener('change', rows);
  $('#fSearch').addEventListener('input', rows);
  rows();
}

function initServicesPage() {
  const root = $('#servicesPage');
  if (!root) return;
  const colors = { green: '#22C55E', yellow: '#EAB308', red: '#EF4444' };
  const healthLabel = h => h === 'green' ? 'Healthy' : h === 'yellow' ? 'Degraded' : 'Unhealthy';
  root.innerHTML = `
    <h1>Service map</h1>
    <p class="page-sub">Dependencies between services. Edge width is proportional to traffic volume.</p>
    <div class="env-tabs" role="tablist" aria-label="Environment" style="margin-bottom:14px">
      <button class="active" data-env="prod" role="tab" aria-selected="true">Production</button>
      <button data-env="staging" role="tab" aria-selected="false">Staging</button>
      <button data-env="dev" role="tab" aria-selected="false">Dev</button>
    </div>
    <p id="svcEnvNote" class="page-sub" style="font-size:12px;margin:0 0 12px"></p>
    <div class="services-grid" style="display:grid;grid-template-columns:1fr 320px;gap:14px">
      <div class="service-map">
        <svg width="100%" viewBox="0 0 880 460" id="svcSvg" preserveAspectRatio="xMidYMid meet" style="max-width:100%;height:auto">
          ${SERVICE_EDGES.map(([a, b, w]) => {
            const A = SERVICES.find(s => s.id === a), B = SERVICES.find(s => s.id === b);
            return `<line x1="${A.x}" y1="${A.y}" x2="${B.x}" y2="${B.y}" stroke="#2563EB" stroke-width="${w * 0.6 + 1}" stroke-opacity="0.4"/>`;
          }).join('')}
          ${SERVICES.map(s => `
            <g class="svc-node" data-id="${s.id}" style="cursor:pointer" tabindex="0" role="button" aria-label="${s.label} — ${healthLabel(s.health)}">
              <circle cx="${s.x}" cy="${s.y}" r="28" fill="${colors[s.health]}" opacity="0.18"/>
              <circle cx="${s.x}" cy="${s.y}" r="18" fill="${colors[s.health]}"/>
              <text x="${s.x}" y="${s.y + 48}" text-anchor="middle" fill="#E5E9F0" font-size="12" font-family="JetBrains Mono">${s.label}</text>
            </g>
          `).join('')}
        </svg>
        <div class="svc-list-mobile" style="margin-top:14px;display:none">
          <h4 style="font-size:11px;color:var(--ink-sub);text-transform:uppercase;letter-spacing:0.5px;margin:0 0 8px">Services (tap to inspect)</h4>
          ${SERVICES.map(s => `
            <button class="svc-list-item" data-id="${s.id}" style="width:100%;text-align:left;background:var(--panel-2);border:1px solid var(--line);color:var(--ink);padding:12px;border-radius:8px;margin-bottom:6px;display:flex;align-items:center;gap:10px;min-height:44px">
              <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${colors[s.health]}"></span>
              <span class="mono" style="font-size:13px">${s.label}</span>
              <span class="health-badge ${s.health}" style="margin-left:auto;font-size:11px">${healthLabel(s.health)}</span>
            </button>
          `).join('')}
        </div>
      </div>
      <aside class="chart-card" id="svcDetail">
        <p style="color:var(--ink-sub)">Click a service node to view details.</p>
      </aside>
    </div>
    <style>@media (max-width: 768px){ .svc-list-mobile{ display:block !important; } #svcSvg{ max-height: 280px; } }</style>
  `;
  function showEnvNote(env) {
    const note = $('#svcEnvNote');
    if (!note) return;
    if (env === 'prod') note.textContent = '';
    else note.textContent = `Showing ${env === 'staging' ? 'Staging' : 'Dev'} topology — health states reflect the ${env} environment.`;
  }
  function showService(id) {
    const s = SERVICES.find(x => x.id === id);
    if (!s) return;
    const eps = ENDPOINTS.filter(e => e.service === s.label);
    $('#svcDetail').innerHTML = `
      <h3>${s.label}</h3>
      <p style="color:var(--ink-sub);font-size:13px">Health: <span class="health-badge ${s.health}">${healthLabel(s.health)}</span></p>
      <div style="border-top:1px solid var(--line);padding-top:12px;margin-top:12px">
        <h4 style="font-size:12px;color:var(--ink-sub);text-transform:uppercase;margin:0 0 8px">Endpoints (${eps.length})</h4>
        ${eps.map(e => `<div class="mono" style="font-size:12px;padding:4px 0"><span class="method ${e.method}" style="font-size:10px">${e.method}</span> ${e.path}</div>`).join('') || '<p style="color:var(--ink-sub);font-size:12px">No endpoints attached.</p>'}
      </div>
    `;
  }
  $$('.svc-node').forEach(n => {
    n.addEventListener('click', () => showService(n.getAttribute('data-id')));
    n.addEventListener('keydown', ev => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); showService(n.getAttribute('data-id')); } });
  });
  $$('.svc-list-item').forEach(b => b.addEventListener('click', () => showService(b.getAttribute('data-id'))));
  $$('#servicesPage .env-tabs button').forEach(b => b.addEventListener('click', () => {
    $$('#servicesPage .env-tabs button').forEach(x => { x.classList.remove('active'); x.setAttribute('aria-selected', 'false'); });
    b.classList.add('active');
    b.setAttribute('aria-selected', 'true');
    showEnvNote(b.getAttribute('data-env') || 'prod');
  }));
}

function initMobileDrawer() {
  const btn = $('#menuBtn'), sb = $('#sidebar'), bd = $('#sidebarBackdrop');
  if (!btn || !sb || !bd) return;
  function open() { sb.classList.add('open'); bd.classList.add('show'); }
  function close() { sb.classList.remove('open'); bd.classList.remove('show'); }
  btn.addEventListener('click', () => sb.classList.contains('open') ? close() : open());
  bd.addEventListener('click', close);
  // close drawer when clicking any working nav link inside it
  $$('#sidebar .sidenav a:not(.disabled)').forEach(a => a.addEventListener('click', close));
  document.addEventListener('keydown', ev => { if (ev.key === 'Escape') close(); });
}

function buildCommandIndex() {
  const items = [];
  ENDPOINTS.forEach(e => items.push({
    kind: 'endpoint',
    label: `${e.method} ${e.path}`,
    sub: e.service,
    href: 'endpoint-detail.html?ep=' + encodeURIComponent(e.method + ' ' + e.path)
  }));
  // de-dup services (already unique by label)
  [...new Set(SERVICES.map(s => s.label))].forEach(svc => items.push({
    kind: 'service', label: svc, sub: 'Service', href: 'services.html'
  }));
  ACTIVE_ALERTS.forEach(a => items.push({
    kind: 'alert', label: a.rule, sub: a.endpoint, href: 'alerts.html'
  }));
  items.push({ kind: 'page', label: 'Dashboard', sub: 'Page', href: 'index.html' });
  items.push({ kind: 'page', label: 'Endpoints', sub: 'Page', href: 'endpoints.html' });
  items.push({ kind: 'page', label: 'Alerts', sub: 'Page', href: 'alerts.html' });
  items.push({ kind: 'page', label: 'Service Map', sub: 'Page', href: 'services.html' });
  return items;
}

function initCommandPalette() {
  const palette = $('#cmdPalette'), input = $('#cmdInput'), results = $('#cmdResults');
  if (!palette || !input || !results) return;
  const index = buildCommandIndex();
  let focused = 0;

  function render(query) {
    const q = (query || '').trim().toLowerCase();
    const filtered = q
      ? index.filter(i => (i.label + ' ' + i.sub).toLowerCase().includes(q)).slice(0, 30)
      : index.slice(0, 12);
    if (filtered.length === 0) {
      results.innerHTML = `<div class="cmd-empty">No matches for "${q}"</div>`;
      return;
    }
    focused = Math.min(focused, filtered.length - 1);
    results.innerHTML = filtered.map((r, i) => `
      <div class="cmd-result ${i === focused ? 'focused' : ''}" data-idx="${i}" data-href="${r.href}">
        <span class="kind">${r.kind}</span>
        <span style="flex:1"><b>${r.label}</b><span style="color:var(--ink-sub);margin-left:8px;font-size:11px">${r.sub}</span></span>
      </div>
    `).join('');
    $$('.cmd-result', results).forEach(el => {
      el.addEventListener('click', () => { location.href = el.getAttribute('data-href'); });
    });
  }

  function open() {
    palette.classList.remove('hidden');
    input.value = '';
    focused = 0;
    render('');
    setTimeout(() => input.focus(), 10);
  }
  function close() { palette.classList.add('hidden'); }

  // wire all .tb-search inputs to open palette when focused / typed
  $$('.tb-search').forEach(s => {
    s.addEventListener('focus', open);
    s.addEventListener('click', open);
  });

  input.addEventListener('input', () => render(input.value));
  input.addEventListener('keydown', ev => {
    const items = $$('.cmd-result', results);
    if (ev.key === 'ArrowDown') { ev.preventDefault(); focused = Math.min(focused + 1, items.length - 1); render(input.value); }
    else if (ev.key === 'ArrowUp') { ev.preventDefault(); focused = Math.max(focused - 1, 0); render(input.value); }
    else if (ev.key === 'Enter') {
      ev.preventDefault();
      const sel = items[focused];
      if (sel) location.href = sel.getAttribute('data-href');
    } else if (ev.key === 'Escape') { close(); }
  });
  palette.addEventListener('click', ev => { if (ev.target === palette) close(); });

  document.addEventListener('keydown', ev => {
    if ((ev.metaKey || ev.ctrlKey) && ev.key.toLowerCase() === 'k') { ev.preventDefault(); open(); }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initDashboard();
  initEndpointDetail();
  initAlertsPage();
  initEndpointsPage();
  initServicesPage();
  initMobileDrawer();
  initCommandPalette();
});
