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

let ACTIVE_ALERTS = [
  { id: 'al1', severity: 'critical', rule: 'Error rate > 5%', endpoint: 'POST /v1/payments', desc: 'Error rate at 6.4% over last 5 min', when: '2 min ago', status: 'open', owner: null },
  { id: 'al2', severity: 'critical', rule: 'p95 latency > 1000ms', endpoint: 'POST /v1/webhooks/stripe', desc: 'p95 at 1320ms for 8 min', when: '8 min ago', status: 'open', owner: null },
  { id: 'al3', severity: 'critical', rule: 'Error rate > 5%', endpoint: 'POST /v1/webhooks/stripe', desc: '9.1% errors, mostly 502 Bad Gateway', when: '8 min ago', status: 'open', owner: null },
  { id: 'al4', severity: 'warning', rule: 'Error rate > 3%', endpoint: 'GET /v1/invoices', desc: 'Sustained 5.8% errors', when: '14 min ago', status: 'open', owner: null },
  { id: 'al5', severity: 'warning', rule: 'SLO burn rate 6x', endpoint: 'POST /v1/files/upload', desc: '24h SLO burn rate at 6.2x', when: '32 min ago', status: 'assigned', owner: 'mp' },
  { id: 'al6', severity: 'warning', rule: 'Latency > 300ms', endpoint: 'PATCH /v1/subscriptions/:id', desc: 'p95 at 380ms, expected <300ms', when: '48 min ago', status: 'assigned', owner: 'sv' },
  { id: 'al7', severity: 'info', rule: 'Deployment detected', endpoint: 'POST /v1/auth/login', desc: 'New deployment users-svc@v2.41.0', when: '1h ago', status: 'open', owner: null },
  { id: 'al8', severity: 'info', rule: 'Traffic spike +120%', endpoint: 'GET /v1/users/:id', desc: 'RPS at 1840, 2.2× baseline', when: '1h ago', status: 'open', owner: null }
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

// Global scope state — drives multipliers across labels, KPIs, and charts
const SCOPE = {
  range: '1h',
  env: 'prod'
};
const RANGE_LABEL = { '5m': '5m', '1h': '1h', '24h': '24h', '7d': '7d' };
const RANGE_MULT = { '5m': 0.08, '1h': 1, '24h': 22, '7d': 152 };
const ENV_LABEL = { prod: 'Production', staging: 'Staging', dev: 'Dev' };
const ENV_MULT = { prod: 1, staging: 0.32, dev: 0.08 };

function $(s, r) { return (r || document).querySelector(s); }
function $$(s, r) { return Array.from((r || document).querySelectorAll(s)); }

function ownerById(id) { return OWNERS.find(o => o.id === id) || { name: 'Unassigned' }; }
function ownerInitials(o) { return o.name.split(' ').map(p => p[0]).join('').slice(0, 2); }

function fmtCount(n) {
  if (n >= 1e6) return (n / 1e6).toFixed(2) + 'M';
  if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K';
  return Math.round(n).toString();
}

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

function rangeXTicks(range) {
  const map = {
    '5m': ['5m ago', '4m', '3m', '2m', 'now'],
    '1h': ['1h ago', '45m', '30m', '15m', 'now'],
    '24h': ['24h ago', '18h', '12h', '6h', 'now'],
    '7d': ['7d ago', '5d', '3d', '1d', 'now']
  };
  return map[range] || map['1h'];
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
  const labels = opts.xLabels || ['1h ago', '45m', '30m', '15m', 'now'];
  const xTicks = labels.map((l, i) => {
    const x = padL + (i / 4) * innerW;
    return `<text x="${x}" y="${h - 10}" text-anchor="middle" fill="#8893A8" font-size="10">${l}</text>`;
  }).join('');
  return `<svg width="100%" height="${h}" viewBox="0 0 ${w} ${h}">${yTicks}${paths}${xTicks}</svg>`;
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

function renderKpiTiles() {
  // Updates the dashboard KPI numbers/labels based on SCOPE
  const r = SCOPE.range, e = SCOPE.env;
  const mult = RANGE_MULT[r] * ENV_MULT[e];
  const totalReq = 2.84e6 * mult;
  const errPct = e === 'dev' ? 0.42 : e === 'staging' ? 0.96 : 1.84;
  const p95 = e === 'dev' ? 142 : e === 'staging' ? 178 : 214;
  const avail = e === 'dev' ? 99.99 : e === 'staging' ? 99.98 : 99.96;

  const labels = ['Total Requests', 'Error Rate', 'p95 Latency', 'Availability'];
  const tiles = $$('.kpi-row .kpi-tile');
  if (!tiles.length) return;
  // Total Requests
  if (tiles[0]) {
    const lbl = $('.lbl', tiles[0]); if (lbl) lbl.textContent = `Total Requests · ${RANGE_LABEL[r]}`;
    const val = $('.val', tiles[0]); if (val) val.textContent = fmtCount(totalReq);
  }
  if (tiles[1]) {
    const lbl = $('.lbl', tiles[1]); if (lbl) lbl.textContent = `Error Rate · ${RANGE_LABEL[r]}`;
    const val = $('.val', tiles[1]); if (val) val.textContent = errPct.toFixed(2) + '%';
  }
  if (tiles[2]) {
    const lbl = $('.lbl', tiles[2]); if (lbl) lbl.textContent = `p95 Latency · ${RANGE_LABEL[r]}`;
    const val = $('.val', tiles[2]); if (val) val.textContent = p95 + ' ms';
  }
  if (tiles[3]) {
    const lbl = $('.lbl', tiles[3]); if (lbl) lbl.textContent = `Availability · ${RANGE_LABEL[r]}`;
    const val = $('.val', tiles[3]); if (val) val.textContent = avail.toFixed(2) + '%';
  }
  // Update scope strip
  const strip = $('#scopeStrip');
  if (strip) strip.textContent = `Showing ${ENV_LABEL[e]} · last ${RANGE_LABEL[r]}`;
  // Update endpoint section sub-label
  const epHeadSub = $('#epHeadSub');
  if (epHeadSub) epHeadSub.textContent = `Sorted by health · 24 endpoints · ${ENV_LABEL[e]} · ${RANGE_LABEL[r]}`;
  // Update global latency chart heading
  const glHead = $('#globalLatencyHead');
  if (glHead) glHead.textContent = `Global latency (p50 / p95 / p99) · ${RANGE_LABEL[r]} · ${ENV_LABEL[e]}`;
}

function renderEndpointGrid() {
  const grid = $('#endpointGrid');
  if (!grid) return;
  const envMult = ENV_MULT[SCOPE.env];
  const sorted = [...ENDPOINTS].sort((a, b) => {
    const order = { red: 0, yellow: 1, green: 2 };
    return order[a.health] - order[b.health];
  });
  grid.innerHTML = sorted.map(e => {
    const ep = e.method + ' ' + e.path;
    return `
    <a href="endpoint-detail.html?ep=${encodeURIComponent(ep)}" class="endpoint-card" data-ep="${ep}" tabindex="0" aria-label="${ep} — view details">
      <div class="top">
        <span class="method ${e.method}">${e.method}</span>
        <span style="color:var(--ink-sub);font-size:11px;font-family:'JetBrains Mono',monospace">${e.service}</span>
        <span class="health-dot ${e.health}"></span>
      </div>
      <div class="path">${e.path}</div>
      <div class="stats">
        <div class="stat"><div class="skey">RPS</div><div class="sval">${Math.round(e.rps * envMult)}</div></div>
        <div class="stat"><div class="skey">p95</div><div class="sval ${e.p95 > 500 ? 'red' : e.p95 > 300 ? 'yellow' : ''}">${e.p95}ms</div></div>
        <div class="stat"><div class="skey">errors</div><div class="sval ${e.err > 5 ? 'red' : e.err > 1 ? 'yellow' : ''}">${e.err.toFixed(1)}%</div></div>
      </div>
      <div class="card-cta">View details →</div>
    </a>`;
  }).join('');
}

function renderAlertRail() {
  const rail = $('#alertRail');
  if (!rail) return;
  rail.innerHTML = ACTIVE_ALERTS.map(a => {
    const ownerLbl = a.status === 'silenced' ? 'Silenced' : (a.owner ? ownerById(a.owner).name : 'Unassigned');
    const statusCls = a.status || 'open';
    return `
    <div class="alert-item" data-alert-id="${a.id}" data-status="${statusCls}">
      <div class="ai-top"><span class="severity-pill ${a.severity}">${a.severity}</span><span class="status-pill ${statusCls}">${statusCls}</span><span class="ep">${a.endpoint}</span></div>
      <div class="desc"><b>${a.rule}</b></div>
      <div class="desc" style="color:var(--ink-sub);font-size:12px">${a.desc}</div>
      <div class="ai-meta"><span class="when">${a.when}</span><span class="owner-lbl">· ${ownerLbl}</span></div>
      <div class="actions">
        <button data-action="assign" data-id="${a.id}" ${a.status === 'silenced' ? 'disabled' : ''}>Assign</button>
        <button data-action="silence" data-id="${a.id}" ${a.status === 'silenced' ? 'disabled' : ''}>${a.status === 'silenced' ? 'Silenced' : 'Silence'}</button>
      </div>
    </div>`;
  }).join('');
  $$('#alertRail .actions button[data-action]').forEach(btn => {
    btn.addEventListener('click', (ev) => handleAlertAction(btn.getAttribute('data-action'), btn.getAttribute('data-id'), btn));
  });
}

function handleAlertAction(action, id, originBtn) {
  const alert = ACTIVE_ALERTS.find(a => a.id === id);
  if (!alert) return;
  if (action === 'assign') {
    openModal({
      title: 'Assign alert',
      body: `Choose an owner for "${alert.rule}" on ${alert.endpoint}.`,
      extra: `<label class="modal-label" for="assignOwner">Assign to</label>
              <select id="assignOwner" class="modal-select">${OWNERS.map(o => `<option value="${o.id}">${o.name} · ${o.team}</option>`).join('')}</select>`,
      confirmLabel: 'Assign',
      onConfirm: () => {
        const sel = $('#assignOwner');
        const ownerId = sel ? sel.value : OWNERS[0].id;
        alert.owner = ownerId;
        alert.status = 'assigned';
        renderAlertRail();
        showToast(`Assigned to ${ownerById(ownerId).name}`);
        const newBtn = document.querySelector(`#alertRail .alert-item[data-alert-id="${id}"] button[data-action="assign"]`);
        if (newBtn) newBtn.focus();
      },
      origin: originBtn
    });
  } else if (action === 'silence') {
    openModal({
      title: 'Silence alert',
      body: `Silence "${alert.rule}" on ${alert.endpoint}?`,
      extra: `<label class="modal-label" for="silenceDur">Duration</label>
              <select id="silenceDur" class="modal-select"><option value="1h">1 hour</option><option value="4h">4 hours</option><option value="24h">24 hours</option></select>`,
      confirmLabel: 'Silence',
      onConfirm: () => {
        const dur = $('#silenceDur') ? $('#silenceDur').value : '1h';
        alert.status = 'silenced';
        renderAlertRail();
        showToast(`Silenced for ${dur}`);
      },
      origin: originBtn
    });
  }
}

function renderGlobalLatency() {
  const el = $('#globalLatency');
  if (!el) return;
  const envMult = ENV_MULT[SCOPE.env];
  el.innerHTML = lineChart([
    { color: '#3B82F6', values: fakeSeries(60, 90 * envMult, 18) },
    { color: '#A855F7', values: fakeSeries(60, 220 * envMult, 60) },
    { color: '#EF4444', values: fakeSeries(60, 480 * envMult, 140) }
  ], 800, 220, { suffix: 'ms', xLabels: rangeXTicks(SCOPE.range) });
}

// ----- Modal infrastructure -----
let MODAL_ORIGIN = null;
let MODAL_KEY_HANDLER = null;
let MODAL_PREVIOUS_FOCUS = null;

function openModal({ title, body, extra, confirmLabel, onConfirm, origin }) {
  const modal = $('#confirmModal');
  if (!modal) return;
  // If a modal is already open, close it first to avoid stacking states
  if (!modal.classList.contains('hidden')) closeModal({ silent: true });
  $('#modalTitle').textContent = title || '';
  $('#modalBody').textContent = body || '';
  const extraSlot = $('#modalExtra');
  if (extraSlot) extraSlot.innerHTML = extra || '';
  const confirmBtn = $('#modalConfirm');
  if (confirmBtn) confirmBtn.textContent = confirmLabel || 'Confirm';

  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');
  MODAL_ORIGIN = origin || null;
  MODAL_PREVIOUS_FOCUS = document.activeElement;

  const cancel = $('#modalCancel');
  const close = $('#modalClose');
  cancel.onclick = () => closeModal({ canceled: true });
  if (close) close.onclick = () => closeModal({ canceled: true });
  // Backdrop click
  modal.onclick = (ev) => { if (ev.target === modal) closeModal({ canceled: true }); };

  $('#modalConfirm').onclick = () => {
    closeModal({ silent: true });
    if (typeof onConfirm === 'function') onConfirm();
  };

  // Escape handler
  MODAL_KEY_HANDLER = (ev) => {
    if (ev.key === 'Escape') {
      ev.preventDefault();
      closeModal({ canceled: true });
    }
  };
  document.addEventListener('keydown', MODAL_KEY_HANDLER);

  // Move focus into modal
  setTimeout(() => {
    const firstField = modal.querySelector('select, input, button.btn-primary');
    if (firstField) firstField.focus();
  }, 30);
}

function closeModal({ canceled, silent } = {}) {
  const modal = $('#confirmModal');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden', 'true');
  if (MODAL_KEY_HANDLER) {
    document.removeEventListener('keydown', MODAL_KEY_HANDLER);
    MODAL_KEY_HANDLER = null;
  }
  // Return focus
  const target = MODAL_ORIGIN || MODAL_PREVIOUS_FOCUS;
  if (target && typeof target.focus === 'function') {
    try { target.focus(); } catch (e) { /* ignore */ }
  }
  MODAL_ORIGIN = null;
  MODAL_PREVIOUS_FOCUS = null;
  if (canceled && !silent) {
    // Subtle cancel feedback
    showToast('Canceled', { variant: 'muted' });
  }
}

// Backwards compatible helper
function confirmAction(title, body, onConfirm) {
  openModal({ title, body, onConfirm });
}

// ----- Toast -----
function showToast(msg, opts = {}) {
  let host = $('#toastHost');
  if (!host) {
    host = document.createElement('div');
    host.id = 'toastHost';
    host.className = 'toast-host';
    document.body.appendChild(host);
  }
  const t = document.createElement('div');
  t.className = 'toast' + (opts.variant === 'muted' ? ' muted' : '');
  t.setAttribute('role', 'status');
  t.textContent = msg;
  host.appendChild(t);
  setTimeout(() => t.classList.add('show'), 10);
  setTimeout(() => {
    t.classList.remove('show');
    setTimeout(() => t.remove(), 250);
  }, opts.variant === 'muted' ? 1200 : 2400);
}

// ----- Mobile sidebar drawer -----
function initMobileNav() {
  const burger = $('#mobileNavBtn');
  const sidebar = $('.sidebar');
  if (!burger || !sidebar) return;
  let backdrop = $('#sidebarBackdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.id = 'sidebarBackdrop';
    backdrop.className = 'sidebar-backdrop';
    document.body.appendChild(backdrop);
  }
  burger.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    backdrop.classList.toggle('show', sidebar.classList.contains('open'));
  });
  backdrop.addEventListener('click', () => {
    sidebar.classList.remove('open');
    backdrop.classList.remove('show');
  });
  // Close drawer when a real nav link is clicked
  $$('.sidenav a').forEach(a => a.addEventListener('click', () => {
    sidebar.classList.remove('open');
    backdrop.classList.remove('show');
  }));
}

// ----- Coming-soon placeholder links -----
function initPlaceholderLinks() {
  $$('.sidenav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === '#' || href === '') {
      a.classList.add('coming-soon');
      a.setAttribute('aria-disabled', 'true');
      a.setAttribute('title', 'Coming soon — not available in this preview');
      // Add a soft pill
      if (!a.querySelector('.soon-pill')) {
        const pill = document.createElement('span');
        pill.className = 'soon-pill';
        pill.textContent = 'soon';
        a.appendChild(pill);
      }
      a.addEventListener('click', (ev) => {
        ev.preventDefault();
        showToast('That section isn’t available in this preview yet.', { variant: 'muted' });
      });
    }
  });
}

// ----- Global search palette -----
function initSearchPalette() {
  const input = document.querySelector('.tb-search');
  if (!input) return;
  // Ensure each search has an accessible label
  if (!input.id) input.id = 'globalSearch';
  input.setAttribute('aria-label', 'Search endpoints, services, and alerts');
  input.setAttribute('role', 'combobox');
  input.setAttribute('aria-autocomplete', 'list');
  input.setAttribute('aria-controls', 'searchPalettePanel');
  input.setAttribute('aria-expanded', 'false');

  let panel = document.getElementById('searchPalettePanel');
  if (!panel) {
    panel = document.createElement('div');
    panel.id = 'searchPalettePanel';
    panel.className = 'search-palette';
    panel.setAttribute('role', 'listbox');
    panel.hidden = true;
    document.body.appendChild(panel);
  }

  function index() {
    const eps = ENDPOINTS.map(e => ({
      kind: 'endpoint',
      label: e.method + ' ' + e.path,
      sub: e.service + ' · ' + (e.health === 'green' ? 'healthy' : e.health === 'yellow' ? 'degraded' : 'unhealthy'),
      url: 'endpoint-detail.html?ep=' + encodeURIComponent(e.method + ' ' + e.path)
    }));
    const svcs = SERVICES.map(s => ({
      kind: 'service',
      label: s.label,
      sub: 'service · ' + (s.health === 'green' ? 'healthy' : s.health === 'yellow' ? 'degraded' : 'unhealthy'),
      url: 'services.html'
    }));
    const alerts = ACTIVE_ALERTS.map(a => ({
      kind: 'alert',
      label: a.rule,
      sub: a.endpoint + ' · ' + a.severity,
      url: 'alerts.html'
    }));
    return [...eps, ...svcs, ...alerts];
  }

  function position() {
    const r = input.getBoundingClientRect();
    panel.style.top = (r.bottom + 6) + 'px';
    panel.style.left = r.left + 'px';
    panel.style.width = Math.max(r.width, 320) + 'px';
  }

  function render(q) {
    const all = index();
    const filtered = q
      ? all.filter(it => (it.label + ' ' + it.sub).toLowerCase().includes(q.toLowerCase())).slice(0, 12)
      : all.slice(0, 8);
    const recent = !q;
    let html = `<div class="sp-head">${recent ? 'Suggestions' : `${filtered.length} result${filtered.length === 1 ? '' : 's'} for “${q}”`}</div>`;
    if (!filtered.length) {
      html += `<div class="sp-empty">No matches. Try an endpoint path, service name, or alert rule.</div>`;
    } else {
      html += filtered.map((it, i) => `
        <a class="sp-item" href="${it.url}" role="option" data-idx="${i}">
          <span class="sp-kind ${it.kind}">${it.kind}</span>
          <span class="sp-label">${it.label}</span>
          <span class="sp-sub">${it.sub}</span>
        </a>`).join('');
    }
    html += `<div class="sp-foot">Try “payments”, “stripe”, “users-svc”, or alert rules</div>`;
    panel.innerHTML = html;
  }

  function open() {
    position();
    panel.hidden = false;
    input.setAttribute('aria-expanded', 'true');
    render(input.value.trim());
  }
  function close() {
    panel.hidden = true;
    input.setAttribute('aria-expanded', 'false');
  }

  input.addEventListener('focus', open);
  input.addEventListener('input', () => { if (!panel.hidden) render(input.value.trim()); else open(); });
  input.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape') { close(); input.blur(); }
    if (ev.key === 'Enter') {
      const first = panel.querySelector('.sp-item');
      if (first) { ev.preventDefault(); window.location.href = first.getAttribute('href'); }
    }
  });
  document.addEventListener('click', (ev) => {
    if (panel.hidden) return;
    if (ev.target === input) return;
    if (!panel.contains(ev.target)) close();
  });
  window.addEventListener('resize', () => { if (!panel.hidden) position(); });
}

function initDashboard() {
  if (!$('#endpointGrid')) return;
  renderKpiSparks();
  renderEndpointGrid();
  renderAlertRail();
  renderGlobalLatency();
  renderKpiTiles();

  $$('.env-tabs button').forEach(b => b.addEventListener('click', () => {
    $$('.env-tabs button').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    SCOPE.env = b.getAttribute('data-env') || 'prod';
    renderKpiTiles();
    renderEndpointGrid();
    renderGlobalLatency();
    showToast(`Switched scope: ${ENV_LABEL[SCOPE.env]}`, { variant: 'muted' });
  }));
  $$('.time-range .tr-btn').forEach(b => b.addEventListener('click', () => {
    $$('.time-range .tr-btn').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    SCOPE.range = b.getAttribute('data-range') || '1h';
    renderGlobalLatency();
    renderKpiSparks();
    renderKpiTiles();
    showToast(`Time range: ${RANGE_LABEL[SCOPE.range]}`, { variant: 'muted' });
  }));
  const themeToggle = $('#themeToggle');
  if (themeToggle) themeToggle.addEventListener('click', () => document.body.classList.toggle('theme-light'));
}

function initEndpointDetail() {
  const root = $('#endpointDetail');
  if (!root) return;
  const ep = decodeURIComponent(new URLSearchParams(location.search).get('ep') || 'POST /v1/payments');
  const [method, path] = ep.split(' ');
  const e = ENDPOINTS.find(x => x.method === method && x.path === path) || ENDPOINTS[0];
  const owner = ownerById(e.owner);
  const referrer = document.referrer || '';
  let backHref = 'endpoints.html';
  let backLabel = 'Back to endpoints';
  if (/index\.html/.test(referrer) || referrer.endsWith('/')) {
    backHref = 'index.html';
    backLabel = 'Back to dashboard';
  }

  root.innerHTML = `
    <div class="detail-head">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="${backHref}" class="back-link">← ${backLabel}</a>
        <span class="crumb-sep">/</span>
        <a href="endpoints.html">Endpoints</a>
        <span class="crumb-sep">/</span>
        <span class="crumb-current">${e.method} ${e.path}</span>
      </nav>
      <div class="row1">
        <span class="method ${e.method}" style="font-size:13px;padding:4px 10px">${e.method}</span>
        <h1>${e.path}</h1>
        <span class="health-badge ${e.health}">${e.health === 'green' ? 'Healthy' : e.health === 'yellow' ? 'Degraded' : 'Unhealthy'}</span>
      </div>
      <div class="row2">
        <span>Service · <b style="color:var(--ink)">${e.service}</b></span>
        <span>Owner</span>
        <span class="owner-chip"><span class="av">${ownerInitials(owner)}</span>${owner.name}</span>
        <span class="scope-chip" id="detailScope">Scope: ${ENV_LABEL[SCOPE.env]} · ${RANGE_LABEL[SCOPE.range]}</span>
      </div>
    </div>
    <div class="detail-body">
      <div class="kpi-row6">
        <div class="kpi-tile"><div class="lbl">RPS · ${RANGE_LABEL[SCOPE.range]}</div><div class="val mono" id="dRps">${e.rps}</div></div>
        <div class="kpi-tile"><div class="lbl">Error Rate · ${RANGE_LABEL[SCOPE.range]}</div><div class="val mono" id="dErr" style="color:${e.err > 5 ? 'var(--red)' : e.err > 1 ? 'var(--yellow)' : 'inherit'}">${e.err.toFixed(2)}%</div></div>
        <div class="kpi-tile"><div class="lbl">p50 · ${RANGE_LABEL[SCOPE.range]}</div><div class="val mono" id="dP50">${Math.round(e.p95 * 0.35)}ms</div></div>
        <div class="kpi-tile"><div class="lbl">p95 · ${RANGE_LABEL[SCOPE.range]}</div><div class="val mono" id="dP95">${e.p95}ms</div></div>
        <div class="kpi-tile"><div class="lbl">p99 · ${RANGE_LABEL[SCOPE.range]}</div><div class="val mono" id="dP99">${Math.round(e.p95 * 1.6)}ms</div></div>
        <div class="kpi-tile"><div class="lbl">SLO 99.9%</div><div class="val mono" style="font-size:18px">${e.err < 0.1 ? '✓ Meeting' : 'Breached'}</div></div>
      </div>

      <div class="trend-charts">
        <div class="chart-card"><h3 id="reqVolHead">Request volume · ${RANGE_LABEL[SCOPE.range]}</h3><div id="reqVolChart">${lineChart([{ color: '#3B82F6', values: fakeSeries(60, e.rps, e.rps * 0.2) }], 400, 180, { xLabels: rangeXTicks(SCOPE.range) })}</div></div>
        <div class="chart-card"><h3 id="latHead">Latency p50 / p95 / p99 · ${RANGE_LABEL[SCOPE.range]}</h3><div id="latChart">${lineChart([
          { color: '#3B82F6', values: fakeSeries(60, e.p95 * 0.35, 10) },
          { color: '#A855F7', values: fakeSeries(60, e.p95, 40) },
          { color: '#EF4444', values: fakeSeries(60, e.p95 * 1.6, 80) }
        ], 400, 180, { suffix: 'ms', xLabels: rangeXTicks(SCOPE.range) })}</div><div class="legend-row"><span class="dot" style="background:#3B82F6"></span>p50<span class="dot" style="background:#A855F7"></span>p95<span class="dot" style="background:#EF4444"></span>p99</div></div>
        <div class="chart-card"><h3 id="errHead">Error rate · ${RANGE_LABEL[SCOPE.range]}</h3><div id="errChart">${lineChart([{ color: '#EF4444', values: fakeSeries(60, e.err, e.err * 0.4) }], 400, 180, { suffix: '%', xLabels: rangeXTicks(SCOPE.range) })}</div></div>
      </div>

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

  function rerenderDetailScope() {
    const r = SCOPE.range;
    const envMult = ENV_MULT[SCOPE.env];
    $('#detailScope').textContent = `Scope: ${ENV_LABEL[SCOPE.env]} · ${RANGE_LABEL[r]}`;
    $$('#endpointDetail .kpi-row6 .lbl').forEach((el, i) => {
      const labels = ['RPS', 'Error Rate', 'p50', 'p95', 'p99', 'SLO 99.9%'];
      if (i < 5) el.textContent = `${labels[i]} · ${RANGE_LABEL[r]}`;
    });
    if ($('#dRps')) $('#dRps').textContent = Math.round(e.rps * envMult);
    $('#reqVolHead').textContent = `Request volume · ${RANGE_LABEL[r]}`;
    $('#latHead').textContent = `Latency p50 / p95 / p99 · ${RANGE_LABEL[r]}`;
    $('#errHead').textContent = `Error rate · ${RANGE_LABEL[r]}`;
    $('#reqVolChart').innerHTML = lineChart([{ color: '#3B82F6', values: fakeSeries(60, e.rps * envMult, e.rps * 0.2) }], 400, 180, { xLabels: rangeXTicks(r) });
    $('#latChart').innerHTML = lineChart([
      { color: '#3B82F6', values: fakeSeries(60, e.p95 * 0.35, 10) },
      { color: '#A855F7', values: fakeSeries(60, e.p95, 40) },
      { color: '#EF4444', values: fakeSeries(60, e.p95 * 1.6, 80) }
    ], 400, 180, { suffix: 'ms', xLabels: rangeXTicks(r) });
    $('#errChart').innerHTML = lineChart([{ color: '#EF4444', values: fakeSeries(60, e.err, e.err * 0.4) }], 400, 180, { suffix: '%', xLabels: rangeXTicks(r) });
  }

  // Wire scope controls in the topbar so they actually drive this page
  $$('.env-tabs button').forEach(b => b.addEventListener('click', () => {
    $$('.env-tabs button').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    SCOPE.env = (b.getAttribute('data-env') || b.textContent.trim().toLowerCase().replace(/[^a-z]/g, '')) || 'prod';
    rerenderDetailScope();
    showToast(`Scope: ${ENV_LABEL[SCOPE.env] || SCOPE.env}`, { variant: 'muted' });
  }));
  $$('.time-range .tr-btn').forEach(b => b.addEventListener('click', () => {
    $$('.time-range .tr-btn').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    SCOPE.range = b.getAttribute('data-range') || b.textContent.trim();
    rerenderDetailScope();
    showToast(`Time range: ${RANGE_LABEL[SCOPE.range] || SCOPE.range}`, { variant: 'muted' });
  }));

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
}

function initAlertsPage() {
  const root = $('#alertsPage');
  if (!root) return;
  let alertRows = [...ACTIVE_ALERTS,
    { id: 'al9', severity: 'info', rule: 'Healthy ratio < 95%', endpoint: 'GET /v1/orgs/:id/members', desc: 'Healthy fraction 92.4% last hour', when: '2h ago', status: 'open', owner: 'hl' },
    { id: 'al10', severity: 'info', rule: 'Cold-start spike', endpoint: 'POST /v1/files/upload', desc: 'Cold start latency 1.2s on lambda', when: '3h ago', status: 'assigned', owner: 'mp' },
    { id: 'al11', severity: 'warning', rule: 'Error rate > 3%', endpoint: 'POST /v1/orders', desc: '3.4% errors over 10 min', when: '4h ago', status: 'open', owner: 'do' },
    { id: 'al12', severity: 'critical', rule: 'Service unreachable', endpoint: 'integrations-svc', desc: 'No healthy targets in pool', when: '4h ago', status: 'assigned', owner: 'ab' }
  ];
  // Stabilize statuses for any missing
  alertRows.forEach((a, i) => {
    if (!a.status) a.status = i % 3 === 0 ? 'open' : 'assigned';
    if (!a.owner) a.owner = ['mp', 'do', 'hl', 'sv', 'ab', 'kw'][i % 6];
  });
  const ruleOptions = Array.from(new Set(alertRows.map(a => a.rule)));
  const assigneeOptions = Array.from(new Set(alertRows.map(a => a.owner).filter(Boolean)));

  root.innerHTML = `
    <h1>Alerts</h1>
    <p class="page-sub">Active and recent alerts across your fleet of endpoints</p>
    <div class="kpi-row">
      <div class="kpi-tile"><div class="lbl">Active</div><div class="val mono" style="color:var(--red)">8</div><div class="trend down">+3 vs prev 24h</div></div>
      <div class="kpi-tile"><div class="lbl">New today</div><div class="val mono">22</div><div class="trend up">−14% week avg</div></div>
      <div class="kpi-tile"><div class="lbl">Avg response time</div><div class="val mono">3m 22s</div><div class="trend up">−42s</div></div>
      <div class="kpi-tile"><div class="lbl">MTTR (24h)</div><div class="val mono">14m 08s</div><div class="trend up">−2m</div></div>
    </div>
    <div class="toolbar" role="region" aria-label="Filters">
      <div class="field"><label for="fSev">Severity</label>
        <select id="fSev"><option value="">All severities</option><option value="critical">Critical</option><option value="warning">Warning</option><option value="info">Info</option></select>
      </div>
      <div class="field"><label for="fRule">Rule</label>
        <select id="fRule"><option value="">All rules</option>${ruleOptions.map(r => `<option value="${r}">${r}</option>`).join('')}</select>
      </div>
      <div class="field"><label for="fAssn">Assignee</label>
        <select id="fAssn"><option value="">All assignees</option>${assigneeOptions.map(o => `<option value="${o}">${ownerById(o).name}</option>`).join('')}</select>
      </div>
      <div class="field"><label for="fStatus">Status</label>
        <select id="fStatus"><option value="">All statuses</option><option value="open">Open</option><option value="assigned">Assigned</option><option value="resolved">Resolved</option></select>
      </div>
      <div class="field grow"><label for="fSearch">Search</label>
        <input id="fSearch" placeholder="Search rule, endpoint, description…" />
      </div>
      <button class="btn-secondary" id="fReset" type="button">Reset</button>
    </div>
    <div class="filter-summary" id="filterSummary" aria-live="polite"></div>
    <table class="data-table desktop-only">
      <thead><tr><th>Time</th><th>Rule</th><th>Endpoint</th><th>Severity</th><th>Status</th><th>Owner</th></tr></thead>
      <tbody id="alertTbody"></tbody>
    </table>
    <div class="card-list mobile-only" id="alertCardList"></div>
  `;

  function applyFilters() {
    const f = $('#fSev').value;
    const r = $('#fRule').value;
    const an = $('#fAssn').value;
    const st = $('#fStatus').value;
    const q = ($('#fSearch').value || '').toLowerCase();
    const filtered = alertRows.filter(a =>
      (!f || a.severity === f) &&
      (!r || a.rule === r) &&
      (!an || a.owner === an) &&
      (!st || a.status === st) &&
      (!q || (a.rule + ' ' + a.endpoint + ' ' + a.desc).toLowerCase().includes(q))
    );
    $('#alertTbody').innerHTML = filtered.map(a => `<tr>
      <td class="mono" style="color:var(--ink-sub)">${a.when}</td>
      <td>${a.rule}<div style="color:var(--ink-sub);font-size:11px;margin-top:2px">${a.desc}</div></td>
      <td class="mono">${a.endpoint}</td>
      <td><span class="severity-pill ${a.severity}">${a.severity}</span></td>
      <td><span class="status-pill ${a.status}">${a.status}</span></td>
      <td>${a.owner ? ownerById(a.owner).name : 'Unassigned'}</td>
    </tr>`).join('');
    // Mobile cards
    $('#alertCardList').innerHTML = filtered.map(a => `
      <div class="alert-card">
        <div class="ac-row1">
          <span class="severity-pill ${a.severity}">${a.severity}</span>
          <span class="status-pill ${a.status}">${a.status}</span>
          <span class="ac-when">${a.when}</span>
        </div>
        <div class="ac-rule">${a.rule}</div>
        <div class="ac-ep mono">${a.endpoint}</div>
        <div class="ac-desc">${a.desc}</div>
        <div class="ac-owner">${a.owner ? ownerById(a.owner).name : 'Unassigned'}</div>
      </div>
    `).join('');

    // Filter summary chips + result count
    const chips = [];
    if (f) chips.push({ k: 'Severity', v: f, ctl: 'fSev' });
    if (r) chips.push({ k: 'Rule', v: r, ctl: 'fRule' });
    if (an) chips.push({ k: 'Assignee', v: ownerById(an).name, ctl: 'fAssn' });
    if (st) chips.push({ k: 'Status', v: st, ctl: 'fStatus' });
    if (q) chips.push({ k: 'Search', v: q, ctl: 'fSearch' });

    const summary = $('#filterSummary');
    summary.innerHTML = `
      <span class="result-count"><b>${filtered.length}</b> of ${alertRows.length} alerts</span>
      ${chips.length ? '<span class="chip-list">' + chips.map(c => `<button class="chip" data-clear="${c.ctl}" type="button">${c.k}: ${c.v} <span aria-hidden="true">×</span></button>`).join('') + '</span>' : ''}
    `;
    $$('#filterSummary .chip').forEach(c => c.addEventListener('click', () => {
      const id = c.getAttribute('data-clear');
      const el = document.getElementById(id);
      if (el) {
        if (el.tagName === 'SELECT') el.value = '';
        else el.value = '';
        applyFilters();
      }
    }));
  }
  ['fSev','fRule','fAssn','fStatus'].forEach(id => $(`#${id}`).addEventListener('change', applyFilters));
  $('#fSearch').addEventListener('input', applyFilters);
  $('#fReset').addEventListener('click', () => {
    ['fSev','fRule','fAssn','fStatus'].forEach(id => { $(`#${id}`).value = ''; });
    $('#fSearch').value = '';
    applyFilters();
    showToast('Filters reset', { variant: 'muted' });
  });
  applyFilters();
}

function initEndpointsPage() {
  const root = $('#endpointsPage');
  if (!root) return;
  const all = [...ENDPOINTS, ...ENDPOINTS.slice(0, 8).map(e => ({ ...e, path: e.path + '/items' }))];
  const services = [...new Set(all.map(e => e.service))];
  root.innerHTML = `
    <h1>Endpoints</h1>
    <p class="page-sub" id="epPageSub">${all.length} monitored endpoints across all environments</p>
    <div class="toolbar" role="region" aria-label="Filters">
      <div class="field"><label for="fSvc">Service</label>
        <select id="fSvc"><option value="">All services</option>${services.map(s => `<option>${s}</option>`).join('')}</select>
      </div>
      <div class="field"><label for="fHealth">Health</label>
        <select id="fHealth"><option value="">All health</option><option value="green">Healthy</option><option value="yellow">Degraded</option><option value="red">Unhealthy</option></select>
      </div>
      <div class="field"><label for="fTag">Tag</label>
        <select id="fTag"><option value="">Any tag</option><option>public-api</option><option>internal</option><option>billing</option></select>
      </div>
      <div class="field grow"><label for="fSearch">Search</label>
        <input id="fSearch" placeholder="Search method or path…" />
      </div>
      <button class="btn-secondary" id="fReset" type="button">Reset</button>
    </div>
    <div class="filter-summary" id="epFilterSummary" aria-live="polite"></div>
    <table class="data-table desktop-only">
      <thead><tr><th>Method</th><th>Path</th><th>Service</th><th>Health</th><th>RPS</th><th>p95</th><th>Err %</th><th>SLO</th><th>Last deploy</th><th>Owner</th></tr></thead>
      <tbody id="epTbody"></tbody>
    </table>
    <div class="card-list mobile-only" id="epCardList"></div>
  `;
  function rows() {
    const s = $('#fSvc').value, h = $('#fHealth').value, q = $('#fSearch').value.toLowerCase();
    const filtered = all.filter(e => (!s || e.service === s) && (!h || e.health === h) && (!q || (e.method + ' ' + e.path).toLowerCase().includes(q)));
    $('#epTbody').innerHTML = filtered.map(e => {
      const o = ownerById(e.owner);
      const epEnc = encodeURIComponent(e.method + ' ' + e.path);
      return `<tr onclick="location.href='endpoint-detail.html?ep=${epEnc}'">
        <td><span class="method ${e.method}">${e.method}</span></td>
        <td class="mono">${e.path}</td>
        <td>${e.service}</td>
        <td><span class="health-dot ${e.health}" style="display:inline-block"></span></td>
        <td class="mono">${e.rps}</td>
        <td class="mono">${e.p95}ms</td>
        <td class="mono">${e.err.toFixed(1)}%</td>
        <td class="mono">${e.err < 0.5 ? '99.9%' : e.err < 2 ? '99.5%' : '⚠ breach'}</td>
        <td class="mono" style="color:var(--ink-sub);font-size:11px">${(e._deploy || (e._deploy = Math.floor(Math.random() * 9) + 1))}h ago</td>
        <td><span class="owner-chip"><span class="av">${ownerInitials(o)}</span>${o.name.split(' ')[0]}</span></td>
      </tr>`;
    }).join('');
    // Mobile cards
    $('#epCardList').innerHTML = filtered.map(e => {
      const o = ownerById(e.owner);
      const epEnc = encodeURIComponent(e.method + ' ' + e.path);
      const sloLabel = e.err < 0.5 ? '99.9%' : e.err < 2 ? '99.5%' : '⚠ breach';
      return `<a class="ep-card" href="endpoint-detail.html?ep=${epEnc}">
        <div class="ec-row1"><span class="method ${e.method}">${e.method}</span><span class="health-dot ${e.health}"></span><span class="ec-svc">${e.service}</span></div>
        <div class="ec-path mono">${e.path}</div>
        <div class="ec-stats">
          <div><div class="k">RPS</div><div class="v mono">${e.rps}</div></div>
          <div><div class="k">p95</div><div class="v mono ${e.p95 > 500 ? 'red' : e.p95 > 300 ? 'yellow' : ''}">${e.p95}ms</div></div>
          <div><div class="k">err</div><div class="v mono ${e.err > 5 ? 'red' : e.err > 1 ? 'yellow' : ''}">${e.err.toFixed(1)}%</div></div>
          <div><div class="k">SLO</div><div class="v mono">${sloLabel}</div></div>
        </div>
        <div class="ec-foot"><span class="owner-chip"><span class="av">${ownerInitials(o)}</span>${o.name.split(' ')[0]}</span><span class="ec-cta">View →</span></div>
      </a>`;
    }).join('');

    // Page sub + chips
    $('#epPageSub').innerHTML = `<b>${filtered.length}</b> of ${all.length} endpoints${s || h || q ? ' shown · ' : ' across all environments'}`;
    const chips = [];
    if (s) chips.push({ k: 'Service', v: s, ctl: 'fSvc' });
    if (h) chips.push({ k: 'Health', v: h === 'green' ? 'Healthy' : h === 'yellow' ? 'Degraded' : 'Unhealthy', ctl: 'fHealth' });
    if (q) chips.push({ k: 'Search', v: q, ctl: 'fSearch' });
    $('#epFilterSummary').innerHTML = chips.length ? `<span class="chip-list">${chips.map(c => `<button class="chip" data-clear="${c.ctl}" type="button">${c.k}: ${c.v} <span aria-hidden="true">×</span></button>`).join('')}</span>` : '';
    $$('#epFilterSummary .chip').forEach(c => c.addEventListener('click', () => {
      const id = c.getAttribute('data-clear');
      const el = document.getElementById(id);
      if (el) { el.value = ''; rows(); }
    }));
  }
  $('#fSvc').addEventListener('change', rows);
  $('#fHealth').addEventListener('change', rows);
  $('#fSearch').addEventListener('input', rows);
  $('#fReset').addEventListener('click', () => {
    ['fSvc','fHealth','fTag'].forEach(id => { const el = $(`#${id}`); if (el) el.value = ''; });
    $('#fSearch').value = '';
    rows();
    showToast('Filters reset', { variant: 'muted' });
  });
  rows();
}

function initServicesPage() {
  const root = $('#servicesPage');
  if (!root) return;
  const colors = { green: '#22C55E', yellow: '#EAB308', red: '#EF4444' };
  root.innerHTML = `
    <h1>Service map</h1>
    <p class="page-sub">Dependencies between services. Edge width is proportional to traffic volume. Hover a node for a quick read; click for details.</p>
    <div class="env-tabs" style="margin-bottom:14px"><button class="active" data-env="prod">Production</button><button data-env="staging">Staging</button></div>
    <div class="services-grid">
      <div class="service-map">
        <svg width="100%" viewBox="0 0 880 460" id="svcSvg" role="img" aria-label="Service dependency map">
          ${SERVICE_EDGES.map(([a, b, w]) => {
            const A = SERVICES.find(s => s.id === a), B = SERVICES.find(s => s.id === b);
            return `<line class="svc-edge" x1="${A.x}" y1="${A.y}" x2="${B.x}" y2="${B.y}" stroke="#2563EB" stroke-width="${w * 0.6 + 1}" stroke-opacity="0.4"/>`;
          }).join('')}
          ${SERVICES.map(s => `
            <g class="svc-node" data-id="${s.id}" tabindex="0" role="button" aria-label="${s.label} — ${s.health === 'green' ? 'healthy' : s.health === 'yellow' ? 'degraded' : 'unhealthy'}">
              <circle class="svc-halo" cx="${s.x}" cy="${s.y}" r="32" fill="${colors[s.health]}" opacity="0.18"/>
              <circle class="svc-core" cx="${s.x}" cy="${s.y}" r="18" fill="${colors[s.health]}"/>
              <text x="${s.x}" y="${s.y + 48}" text-anchor="middle" fill="#E5E9F0" font-size="12" font-family="JetBrains Mono">${s.label}</text>
            </g>
          `).join('')}
        </svg>
        <div id="svcTooltip" class="svc-tooltip" hidden></div>
      </div>
      <aside class="chart-card" id="svcDetail">
        <p style="color:var(--ink-sub)">Click or focus a service node to view its details, endpoints, and health.</p>
      </aside>
    </div>
  `;
  function showDetail(id) {
    const s = SERVICES.find(x => x.id === id);
    const eps = ENDPOINTS.filter(e => e.service === s.label);
    $('#svcDetail').innerHTML = `
      <h3>${s.label}</h3>
      <p style="color:var(--ink-sub);font-size:13px">Health: <span class="health-badge ${s.health}">${s.health === 'green' ? 'Healthy' : s.health === 'yellow' ? 'Degraded' : 'Unhealthy'}</span></p>
      <div class="svc-stats">
        <div><div class="k">Endpoints</div><div class="v mono">${eps.length}</div></div>
        <div><div class="k">Total RPS</div><div class="v mono">${eps.reduce((s2,e)=>s2+e.rps,0)}</div></div>
        <div><div class="k">Worst err</div><div class="v mono">${eps.length ? Math.max(...eps.map(e=>e.err)).toFixed(1)+'%' : '—'}</div></div>
      </div>
      <div style="border-top:1px solid var(--line);padding-top:12px;margin-top:12px">
        <h4 style="font-size:12px;color:var(--ink-sub);text-transform:uppercase;margin:0 0 8px">Endpoints (${eps.length})</h4>
        ${eps.map(e => `<a class="svc-ep-link mono" href="endpoint-detail.html?ep=${encodeURIComponent(e.method+' '+e.path)}"><span class="method ${e.method}" style="font-size:10px">${e.method}</span> ${e.path}</a>`).join('') || '<p style="color:var(--ink-sub);font-size:12px">No endpoints attached.</p>'}
      </div>
    `;
    $$('.svc-node').forEach(n => n.classList.toggle('selected', n.getAttribute('data-id') === id));
  }
  const tooltip = $('#svcTooltip');
  $$('.svc-node').forEach(n => {
    n.addEventListener('click', () => showDetail(n.getAttribute('data-id')));
    n.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); showDetail(n.getAttribute('data-id')); }
    });
    n.addEventListener('mouseenter', (ev) => {
      const id = n.getAttribute('data-id');
      const s = SERVICES.find(x => x.id === id);
      const eps = ENDPOINTS.filter(e => e.service === s.label);
      tooltip.innerHTML = `<b>${s.label}</b><div style="color:var(--ink-sub);font-size:11px">${eps.length} endpoints · ${s.health}</div>`;
      tooltip.hidden = false;
      const rect = n.getBoundingClientRect();
      const wrap = $('.service-map').getBoundingClientRect();
      tooltip.style.left = (rect.left - wrap.left + rect.width / 2) + 'px';
      tooltip.style.top = (rect.top - wrap.top - 14) + 'px';
    });
    n.addEventListener('mouseleave', () => { tooltip.hidden = true; });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initPlaceholderLinks();
  initMobileNav();
  initSearchPalette();
  initDashboard();
  initEndpointDetail();
  initAlertsPage();
  initEndpointsPage();
  initServicesPage();
});
