// PulseGrid — SCADA dashboard

(function () {
  // ============== SEEDED RANDOM ==============
  function mulberry32(a) { return function () { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  const seed = 20260513;

  // ============== CLOCK ==============
  const clock = document.getElementById('clock');
  function tickClock() {
    if (!clock) return;
    const d = new Date();
    const fmt = (n) => String(n).padStart(2, '0');
    clock.textContent = `${fmt(d.getHours())}:${fmt(d.getMinutes())}:${fmt(d.getSeconds())}`;
  }
  setInterval(tickClock, 1000);
  tickClock();

  // ============== THEME TOGGLE ==============
  document.getElementById('themeToggle')?.addEventListener('click', () => {
    const cur = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
    document.body.dataset.theme = cur;
    document.getElementById('themeToggle').textContent = cur === 'dark' ? '☾' : '☀';
  });

  // ============== TOAST UTILITY ==============
  function toast(msg, opts = {}) {
    const region = document.getElementById('toastRegion');
    if (!region) { console.log('[toast]', msg); return; }
    const el = document.createElement('div');
    el.className = 'toast' + (opts.kind ? ' ' + opts.kind : '');
    el.setAttribute('role', 'status');
    const span = document.createElement('span');
    span.textContent = msg;
    el.appendChild(span);
    if (opts.actionLabel && typeof opts.onAction === 'function') {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = opts.actionLabel;
      btn.addEventListener('click', () => { opts.onAction(); el.remove(); });
      el.appendChild(btn);
    }
    region.appendChild(el);
    setTimeout(() => { el.style.opacity = '0'; el.style.transition = 'opacity .3s'; }, opts.duration || 4500);
    setTimeout(() => el.remove(), (opts.duration || 4500) + 400);
  }

  // ============== MODAL UTILITY ==============
  function showModal(id) {
    const m = document.getElementById(id);
    if (!m) return;
    m.hidden = false;
    const focusable = m.querySelector('input, button, [href]');
    focusable?.focus();
  }
  function hideModal(id) {
    const m = document.getElementById(id);
    if (m) m.hidden = true;
  }
  // Close modals on backdrop click / escape
  document.addEventListener('click', (e) => {
    if (e.target.classList && e.target.classList.contains('modal-backdrop')) {
      e.target.hidden = true;
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-backdrop').forEach((m) => m.hidden = true);
      const np = document.getElementById('notifPanel');
      if (np && !np.hidden) {
        np.hidden = true;
        document.getElementById('bellBtn')?.setAttribute('aria-expanded', 'false');
      }
    }
  });

  // ============== SPARKLINES ==============
  function sparkLine(id, vals) {
    const el = document.getElementById(id);
    if (!el) return;
    const min = Math.min(...vals); const max = Math.max(...vals);
    const r = max - min || 1;
    const pts = vals.map((v, i) => `${(i / (vals.length - 1)) * 118 + 1},${30 - ((v - min) / r) * 28}`).join(' ');
    el.setAttribute('points', pts);
  }
  const rng = mulberry32(seed);
  const demandHistory = Array.from({ length: 30 }, (_, i) => 36000 + Math.sin(i / 4) * 1800 + rng() * 600);
  const genHistory = demandHistory.map((v, i) => v + 150 + rng() * 80);
  const freqHistory = Array.from({ length: 30 }, () => 59.97 + rng() * 0.06);
  const renHistory = Array.from({ length: 30 }, (_, i) => 38 + Math.sin(i / 5) * 4 + rng() * 1);
  sparkLine('sparkDemand', demandHistory);
  sparkLine('sparkGen', genHistory);
  sparkLine('sparkFreq', freqHistory);
  sparkLine('sparkRen', renHistory);

  // ============== LOAD CHART (overview) ==============
  function loadChart() {
    const svg = document.getElementById('loadChart');
    if (!svg) return;
    const W = 720, H = 260;
    const padL = 44, padR = 8, padT = 12, padB = 28;
    const innerW = W - padL - padR;
    const innerH = H - padT - padB;

    const r = mulberry32(seed + 1);
    const points = 48;
    const actual = []; const fore = []; const renew = [];
    for (let i = 0; i < points; i++) {
      const hour = i / 2;
      const base = 32000 + Math.sin((hour - 6) / 24 * Math.PI * 2) * 7000;
      const peakBump = (hour >= 12 && hour <= 19) ? (1200 + (hour - 12) * 200) : 0;
      const v = base + peakBump + r() * 350;
      actual.push(v);
      fore.push(v + (r() - 0.5) * 800);
      renew.push(Math.max(2000, Math.sin(hour / 24 * Math.PI) * 12000 + r() * 600));
    }
    // After "now" (index 24), actual stops; forecast continues.
    const nowIdx = 24;

    const allVals = [...actual.slice(0, nowIdx + 1), ...fore, ...renew];
    const min = 0, max = Math.max(...allVals) * 1.08;
    const xS = (i) => padL + (i / (points - 1)) * innerW;
    const yS = (v) => padT + innerH - ((v - min) / (max - min)) * innerH;

    let g = '';
    // gridlines
    for (let i = 0; i <= 5; i++) {
      const y = padT + (i / 5) * innerH;
      const v = max - (i / 5) * max;
      g += `<line x1="${padL}" y1="${y}" x2="${W - padR}" y2="${y}" stroke="#1E3458" stroke-dasharray="3 4" stroke-width="1"/>`;
      g += `<text x="${padL - 6}" y="${y + 3}" fill="#6E84A1" font-size="10" text-anchor="end" font-family="JetBrains Mono">${Math.round(v / 1000)}k</text>`;
    }
    for (let h = 0; h < 48; h += 6) {
      const x = xS(h);
      g += `<line x1="${x}" y1="${padT}" x2="${x}" y2="${H - padB}" stroke="#1E3458" stroke-width="1" opacity="0.4"/>`;
      g += `<text x="${x}" y="${H - padB + 16}" fill="#6E84A1" font-size="10" text-anchor="middle" font-family="JetBrains Mono">${h < 24 ? `${h}:00` : `+${h - 24}h`}</text>`;
    }
    // "Now" marker
    const nowX = xS(nowIdx);
    g += `<line x1="${nowX}" y1="${padT}" x2="${nowX}" y2="${H - padB}" stroke="#F59E0B" stroke-width="1" stroke-dasharray="2 3"/>`;
    g += `<text x="${nowX + 4}" y="${padT + 12}" fill="#F59E0B" font-size="10" font-family="JetBrains Mono">NOW</text>`;

    // renewables area
    const renewArea = renew.map((v, i) => `${xS(i)},${yS(v)}`).join(' ');
    g += `<polygon points="${padL},${H - padB} ${renewArea} ${W - padR},${H - padB}" fill="rgba(52,211,153,0.18)"/>`;
    g += `<polyline points="${renewArea}" fill="none" stroke="#34D399" stroke-width="1.5" stroke-opacity="0.85"/>`;

    // Forecast line (full)
    const forePath = fore.map((v, i) => `${xS(i)},${yS(v)}`).join(' ');
    g += `<polyline points="${forePath}" fill="none" stroke="#60A5FA" stroke-width="1.4" stroke-dasharray="4 4"/>`;

    // Actual line (only up to now)
    const actualPath = actual.slice(0, nowIdx + 1).map((v, i) => `${xS(i)},${yS(v)}`).join(' ');
    g += `<polyline points="${actualPath}" fill="none" stroke="#F59E0B" stroke-width="2.2"/>`;

    svg.innerHTML = g;
  }
  loadChart();

  // ============== FORECAST CHART ==============
  function forecastChart() {
    const svg = document.getElementById('forecastChart');
    if (!svg) return;
    const W = 720, H = 300;
    const padL = 44, padR = 8, padT = 12, padB = 28;
    const innerW = W - padL - padR, innerH = H - padT - padB;

    const r = mulberry32(seed + 9);
    const hours = 24;
    const fore = [], p10 = [], p90 = [];
    for (let i = 0; i < hours; i++) {
      const base = 33000 + Math.sin((i - 6) / 24 * Math.PI * 2) * 7500;
      const peakBump = (i >= 14 && i <= 20) ? (1400 + (i - 14) * 280) : 0;
      const v = base + peakBump;
      fore.push(v);
      p10.push(v - 600 - r() * 200);
      p90.push(v + 600 + r() * 200);
    }
    const cap = 46000;
    const allVals = [...fore, ...p10, ...p90, cap];
    const min = Math.min(...allVals) * 0.92, max = Math.max(...allVals) * 1.05;
    const xS = (i) => padL + (i / (hours - 1)) * innerW;
    const yS = (v) => padT + innerH - ((v - min) / (max - min)) * innerH;

    let g = '';
    for (let i = 0; i <= 5; i++) {
      const y = padT + (i / 5) * innerH;
      const v = max - (i / 5) * (max - min);
      g += `<line x1="${padL}" y1="${y}" x2="${W - padR}" y2="${y}" stroke="#1E3458" stroke-dasharray="3 4"/>`;
      g += `<text x="${padL - 6}" y="${y + 3}" fill="#6E84A1" font-size="10" text-anchor="end" font-family="JetBrains Mono">${Math.round(v / 1000)}k</text>`;
    }
    for (let h = 0; h < hours; h += 4) {
      const x = xS(h);
      g += `<line x1="${x}" y1="${padT}" x2="${x}" y2="${H - padB}" stroke="#1E3458" opacity="0.4"/>`;
      g += `<text x="${x}" y="${H - padB + 16}" fill="#6E84A1" font-size="10" text-anchor="middle" font-family="JetBrains Mono">${h}:00</text>`;
    }
    // Capacity ceiling
    g += `<line x1="${padL}" y1="${yS(cap)}" x2="${W - padR}" y2="${yS(cap)}" stroke="#34D399" stroke-width="1.5" stroke-dasharray="6 6"/>`;
    g += `<text x="${W - padR - 6}" y="${yS(cap) - 4}" fill="#34D399" font-size="10" text-anchor="end" font-family="JetBrains Mono">capacity 46,000</text>`;

    // P10-P90 band
    const band = p10.map((v, i) => `${xS(i)},${yS(v)}`).join(' ') + ' ' + p90.map((v, i) => `${xS(hours - 1 - i)},${yS(p90[hours - 1 - i])}`).join(' ');
    g += `<polygon points="${band}" fill="rgba(96,165,250,0.18)"/>`;
    // Forecast line
    const forePath = fore.map((v, i) => `${xS(i)},${yS(v)}`).join(' ');
    g += `<polyline points="${forePath}" fill="none" stroke="#F59E0B" stroke-width="2.4"/>`;
    // Peak marker
    const peakIdx = fore.indexOf(Math.max(...fore));
    g += `<circle cx="${xS(peakIdx)}" cy="${yS(fore[peakIdx])}" r="5" fill="#F59E0B"/>`;
    g += `<text x="${xS(peakIdx) + 8}" y="${yS(fore[peakIdx]) + 4}" fill="#F59E0B" font-size="11" font-family="JetBrains Mono">peak ${Math.round(fore[peakIdx]).toLocaleString()}</text>`;

    svg.innerHTML = g;

    // Hourly table
    const tbody = document.getElementById('hoursBody');
    if (tbody) {
      tbody.innerHTML = '';
      for (let h = 0; h < hours; h++) {
        const note = h === peakIdx ? 'Peak hour' : (fore[h] > cap * 0.85 ? 'Approaching capacity' : '');
        const tr = document.createElement('tr');
        if (h === peakIdx) tr.className = 'peak';
        tr.innerHTML = `<td>${String(h).padStart(2, '0')}:00</td>
          <td class="num">${Math.round(fore[h]).toLocaleString()}</td>
          <td class="num">${Math.round(p10[h]).toLocaleString()} – ${Math.round(p90[h]).toLocaleString()}</td>
          <td class="num">${(((cap - fore[h]) / fore[h]) * 100).toFixed(1)}%</td>
          <td>${note}</td>`;
        tbody.appendChild(tr);
      }
    }
  }
  forecastChart();

  // ============== GENERATOR GRID (overview) ==============
  const overviewGens = [
    { id: 'PVN-1',  name: 'Palo Verde 1',     out: 1380, cap: 1400, fuel: 'nuclear', status: 'online' },
    { id: 'PVN-2',  name: 'Palo Verde 2',     out: 1390, cap: 1400, fuel: 'nuclear', status: 'online' },
    { id: 'GRC-2',  name: 'Grand Coulee G2',  out:  720, cap:  805, fuel: 'hydro',   status: 'online' },
    { id: 'COL-3',  name: 'Colstrip Unit 3',  out:  240, cap:  778, fuel: 'coal',    status: 'tripped' },
    { id: 'GBP-1',  name: 'Greenbridge CCGT', out:  610, cap:  660, fuel: 'natgas',  status: 'online' },
    { id: 'TEH-W',  name: 'Tehachapi Wind',   out: 1980, cap: 2240, fuel: 'wind',    status: 'online' },
    { id: 'BRG-S',  name: 'Boulder Ridge PV', out:  840, cap:  900, fuel: 'solar',   status: 'online' },
    { id: 'PRB-S',  name: 'Painted Rock PV',  out:  605, cap:  610, fuel: 'solar',   status: 'online' },
    { id: 'WND-12', name: 'Windover #12',     out:    0, cap:  240, fuel: 'wind',    status: 'tripped' },
    { id: 'CHL-1',  name: 'Chalk Cliffs 1',   out:  220, cap:  220, fuel: 'hydro',   status: 'online' },
    { id: 'CHL-2',  name: 'Chalk Cliffs 2',   out:  205, cap:  220, fuel: 'hydro',   status: 'online' },
    { id: 'DLT-G',  name: 'Delta Gas Peaker', out:  340, cap:  420, fuel: 'natgas',  status: 'ramping' },
    { id: 'MRD-B',  name: 'Mojave BESS',      out:  180, cap:  300, fuel: 'storage', status: 'online' },
    { id: 'ANT-1',  name: 'Antelope CCGT 1',  out:  560, cap:  640, fuel: 'natgas',  status: 'online' },
    { id: 'ANT-2',  name: 'Antelope CCGT 2',  out:    0, cap:  640, fuel: 'natgas',  status: 'maint' },
    { id: 'PCS-1',  name: 'Pinecrest Steam',  out:  410, cap:  440, fuel: 'natgas',  status: 'online' },
    { id: 'KCH-1',  name: 'Kachina Hydro',    out:  138, cap:  160, fuel: 'hydro',   status: 'online' },
    { id: 'JCT-G',  name: 'Junction Peaker',  out:  120, cap:  220, fuel: 'natgas',  status: 'ramping' },
    { id: 'OWL-W',  name: 'Owlmesa Wind',     out:  340, cap:  500, fuel: 'wind',    status: 'online' },
    { id: 'TOL-S',  name: 'Toluca PV',        out:  420, cap:  430, fuel: 'solar',   status: 'online' },
    { id: 'BAK-B',  name: 'Bakersfield BESS', out:  220, cap:  240, fuel: 'storage', status: 'online' },
    { id: 'HPK-S',  name: 'High Park PV',     out:  260, cap:  300, fuel: 'solar',   status: 'online' },
    { id: 'GRD-1',  name: 'Granite Dam G1',   out:    0, cap:  180, fuel: 'hydro',   status: 'maint' },
    { id: 'GRD-2',  name: 'Granite Dam G2',   out:  165, cap:  180, fuel: 'hydro',   status: 'online' },
  ];
  const fuelColors = { natgas: '#FB923C', hydro: '#60A5FA', wind: '#2DD4BF', solar: '#FCD34D', coal: '#6B7280', nuclear: '#A78BFA', storage: '#34D399' };

  const genGrid = document.getElementById('genGrid');
  if (genGrid) {
    overviewGens.forEach((g) => {
      const cell = document.createElement('div');
      cell.className = `gen-cell ${g.status}`;
      const pct = ((g.out / g.cap) * 100).toFixed(0);
      cell.innerHTML = `
        <div class="gid"><span>${g.id}</span>${statusDot(g.status)}</div>
        <div class="gname">${g.name}</div>
        <div class="gout">${g.out.toLocaleString()}<small>MW · ${pct}%</small></div>`;
      genGrid.appendChild(cell);
    });
  }
  function statusDot(s) {
    if (s === 'online') return '<span class="dot dot-good"></span>';
    if (s === 'tripped') return '<span class="dot dot-crit"></span>';
    if (s === 'maint') return '<span class="dot dot-maint"></span>';
    if (s === 'ramping') return '<span class="dot dot-warn"></span>';
    return '';
  }

  // ============== ALARM LIST (overview) ==============
  const alarmList = [
    { sev: 'critical', t: '11:58 PT', title: 'Stator over-temp — COL-3 (210°C)', rule: 'rule:stator_temp > 195 for 60s', meta: 'Colstrip Unit 3 · acked by SO' },
    { sev: 'critical', t: '11:55 PT', title: 'Loss of low-voltage ride-thru — WND-12', rule: 'rule:lvrt_violation', meta: 'Windover #12 · unattended' },
    { sev: 'major',    t: '11:42 PT', title: 'Tie-line schedule deviation', rule: 'rule:ix_dev > 50MW for 10m', meta: 'CISO interconnect · ack pending' },
    { sev: 'major',    t: '11:36 PT', title: 'AGC output failure', rule: 'rule:agc_no_response', meta: 'DLT-G Delta Gas Peaker' },
    { sev: 'major',    t: '11:30 PT', title: 'Reserve margin < 8%', rule: 'rule:reserve_margin < 8', meta: 'Zone AZ · advisory' },
    { sev: 'minor',    t: '11:21 PT', title: 'Inverter trip — TOL-S string 14', rule: 'rule:inv_trip', meta: 'Toluca PV · auto-restarting' },
    { sev: 'minor',    t: '11:10 PT', title: 'PT excitation imbalance', rule: 'rule:pt_imbalance', meta: 'PCS-1 Pinecrest · diagnosing' },
    { sev: 'minor',    t: '10:58 PT', title: 'SCADA poll timeout', rule: 'rule:poll_timeout', meta: 'RTU-NV-218 · auto-recovered' },
  ];
  const alarmListEl = document.getElementById('alarmList');
  if (alarmListEl) {
    alarmList.forEach((a) => {
      const li = document.createElement('li');
      li.innerHTML = `<span class="dot ${a.sev === 'critical' ? 'dot-crit' : a.sev === 'major' ? 'dot-warn' : 'dot-maint'}"></span>
        <div>
          <div class="a-title">${a.title}</div>
          <div class="a-meta"><span class="a-rule">${a.rule}</span> · ${a.meta}</div>
        </div>
        <span class="a-time">${a.t}</span>`;
      alarmListEl.appendChild(li);
    });
  }

  // ============== FUEL MIX ==============
  const fuelMixData = [
    { name: 'Natural gas', key: 'natgas',  mw: 14820, pct: 38.4 },
    { name: 'Nuclear',     key: 'nuclear', mw:  4180, pct: 10.8 },
    { name: 'Hydro',       key: 'hydro',   mw:  7140, pct: 18.5 },
    { name: 'Wind',        key: 'wind',    mw:  4720, pct: 12.2 },
    { name: 'Solar',       key: 'solar',   mw:  4540, pct: 11.8 },
    { name: 'Coal',        key: 'coal',    mw:  2440, pct:  6.3 },
    { name: 'Battery',     key: 'storage', mw:   770, pct:  2.0 },
  ];
  const fuelMixEl = document.getElementById('fuelMix');
  if (fuelMixEl) {
    fuelMixData.forEach((f) => {
      const row = document.createElement('div');
      row.className = 'fuel-row';
      row.innerHTML = `
        <span class="fuel-name"><span class="fuel-color" style="background:${fuelColors[f.key]}"></span>${f.name}</span>
        <div class="fuel-bar"><div class="fuel-bar-fill" style="background:${fuelColors[f.key]};width:${f.pct * 2.6}%"></div></div>
        <span class="fuel-amt">${f.mw.toLocaleString()} <small>MW · ${f.pct}%</small></span>`;
      fuelMixEl.appendChild(row);
    });
  }

  // ============== GENERATORS PAGE TABLE ==============
  const fullGens = [
    ...overviewGens,
    { id: 'COL-1',  name: 'Colstrip Unit 1',  out:  720, cap:  778, fuel: 'coal',    status: 'online' },
    { id: 'COL-2',  name: 'Colstrip Unit 2',  out:  734, cap:  778, fuel: 'coal',    status: 'online' },
    { id: 'GRC-1',  name: 'Grand Coulee G1',  out:  800, cap:  805, fuel: 'hydro',   status: 'online' },
    { id: 'GRC-3',  name: 'Grand Coulee G3',  out:  704, cap:  805, fuel: 'hydro',   status: 'online' },
    { id: 'CCS-1',  name: 'Cascade Spring 1', out:  140, cap:  150, fuel: 'hydro',   status: 'online' },
    { id: 'CCS-2',  name: 'Cascade Spring 2', out:  148, cap:  150, fuel: 'hydro',   status: 'online' },
    { id: 'WND-1',  name: 'Windover #1',      out:  220, cap:  240, fuel: 'wind',    status: 'online' },
    { id: 'WND-2',  name: 'Windover #2',      out:  198, cap:  240, fuel: 'wind',    status: 'online' },
    { id: 'WND-3',  name: 'Windover #3',      out:  206, cap:  240, fuel: 'wind',    status: 'online' },
    { id: 'OWL-S',  name: 'Owlmesa Solar',    out:  720, cap:  760, fuel: 'solar',   status: 'online' },
    { id: 'OWL-B',  name: 'Owlmesa BESS',     out:  120, cap:  160, fuel: 'storage', status: 'online' },
    { id: 'BAR-G',  name: 'Barnegat Gas',     out:  340, cap:  380, fuel: 'natgas',  status: 'online' },
    { id: 'BAR-P',  name: 'Barnegat Peaker',  out:    0, cap:  220, fuel: 'natgas',  status: 'maint' },
    { id: 'PAL-C',  name: 'Palisades Coal',   out:  410, cap:  500, fuel: 'coal',    status: 'ramping' },
  ];
  const genTbody = document.getElementById('genTbody');
  const zoneMap = { 'PVN-1':'AZ','PVN-2':'AZ','GRC-2':'NW','COL-3':'NW','GBP-1':'CA-S','TEH-W':'CA-S','BRG-S':'CA-S','PRB-S':'AZ','WND-12':'RM','CHL-1':'RM','CHL-2':'RM','DLT-G':'CA-N','MRD-B':'CA-S','ANT-1':'CA-N','ANT-2':'CA-N','PCS-1':'CA-N','KCH-1':'AZ','JCT-G':'NW','OWL-W':'NV','TOL-S':'CA-N','BAK-B':'CA-S','HPK-S':'CA-N','GRD-1':'RM','GRD-2':'RM','COL-1':'NW','COL-2':'NW','GRC-1':'NW','GRC-3':'NW','CCS-1':'NW','CCS-2':'NW','WND-1':'NV','WND-2':'NV','WND-3':'NV','OWL-S':'NV','OWL-B':'NV','BAR-G':'CA-S','BAR-P':'CA-S','PAL-C':'NW' };
  const opMap = { natgas: 'Halcyon Power', hydro: 'BPA / WAPA', wind: 'Tehachapi Renewables', solar: 'SunBelt Generation', coal: 'Mountain States', nuclear: 'APS', storage: 'GridStor Co.' };

  function renderGenTable() {
    if (!genTbody) return;
    const q = document.getElementById('genSearch')?.value.toLowerCase() || '';
    const status = document.querySelector('.fs.active')?.dataset.status || 'all';
    const fuel = document.getElementById('fsFuel')?.value || '';
    const zone = document.getElementById('fsZone')?.value || '';
    // Apply non-status filters first so pill counts respect zone/fuel/search
    const baseFiltered = fullGens.filter((g) => {
      const z = zoneMap[g.id] || '';
      if (fuel && g.fuel !== fuel) return false;
      if (zone && z !== zone) return false;
      if (q && !(g.id.toLowerCase().includes(q) || g.name.toLowerCase().includes(q))) return false;
      return true;
    });
    const normalize = (s) => (s === 'maint' ? 'maintenance' : s);
    const filtered = baseFiltered.filter((g) => status === 'all' || normalize(g.status) === status);
    genTbody.innerHTML = '';
    filtered.forEach((g, i) => {
      const pct = Math.round((g.out / g.cap) * 100);
      const tr = document.createElement('tr');
      tr.innerHTML = `<td><input type="checkbox" aria-label="Select ${g.id}" /></td>
        <td class="gid-cell">${g.id}</td>
        <td class="name-cell">${g.name}</td>
        <td><span class="fuel-icon ${g.fuel}">${capFuel(g.fuel)}</span></td>
        <td>${zoneMap[g.id] || '—'}</td>
        <td class="num">${g.out.toLocaleString()} <small>MW</small></td>
        <td class="num">${g.cap.toLocaleString()}</td>
        <td class="num"><span class="pct-bar"><i style="width:${pct}%"></i></span>${pct}%</td>
        <td><span class="status-pill ${g.status === 'maint' ? 'maintenance' : g.status}">${g.status === 'maint' ? 'maintenance' : g.status}</span></td>
        <td>${opMap[g.fuel] || 'Operator'}</td>
        <td><button class="row-action">Details →</button></td>`;
      genTbody.appendChild(tr);
    });
    const cnt = document.getElementById('genCount');
    if (cnt) cnt.textContent = `${filtered.length} of ${fullGens.length} units`;

    // Dynamic pill counts based on baseFiltered (zone/fuel/search applied)
    const cAll = document.getElementById('cAll'); if (cAll) cAll.textContent = baseFiltered.length;
    const cOnline = document.getElementById('cOnline'); if (cOnline) cOnline.textContent = baseFiltered.filter((g) => g.status === 'online').length;
    const cRamp = document.getElementById('cRamp'); if (cRamp) cRamp.textContent = baseFiltered.filter((g) => g.status === 'ramping').length;
    const cTrip = document.getElementById('cTrip'); if (cTrip) cTrip.textContent = baseFiltered.filter((g) => g.status === 'tripped').length;
    const cMaint = document.getElementById('cMaint'); if (cMaint) cMaint.textContent = baseFiltered.filter((g) => g.status === 'maint' || g.status === 'maintenance').length;

    // Empty state
    const emptyEl = document.getElementById('genEmpty');
    if (emptyEl) emptyEl.hidden = filtered.length !== 0;

    // Active filter chips
    const chips = document.getElementById('activeFilters');
    if (chips) {
      chips.innerHTML = '';
      const make = (label, onRemove) => {
        const c = document.createElement('span');
        c.className = 'filter-chip';
        c.innerHTML = `<span>${label}</span>`;
        const x = document.createElement('button');
        x.type = 'button'; x.textContent = '×'; x.setAttribute('aria-label', `Remove ${label}`);
        x.addEventListener('click', onRemove);
        c.appendChild(x);
        chips.appendChild(c);
      };
      if (status !== 'all') make(`Status: ${status}`, () => {
        document.querySelectorAll('.fs').forEach((b) => b.classList.toggle('active', b.dataset.status === 'all'));
        renderGenTable();
      });
      if (fuel) make(`Fuel: ${capFuel(fuel)}`, () => {
        document.getElementById('fsFuel').value = ''; renderGenTable();
      });
      if (zone) make(`Zone: ${zone}`, () => {
        document.getElementById('fsZone').value = ''; renderGenTable();
      });
      if (q) make(`Search: ${q}`, () => {
        document.getElementById('genSearch').value = ''; renderGenTable();
      });
    }
  }
  function capFuel(f) { return ({ natgas:'Natural gas', hydro:'Hydro', wind:'Wind', solar:'Solar', coal:'Coal', nuclear:'Nuclear', storage:'Battery' })[f] || f; }

  if (genTbody) {
    document.querySelectorAll('.fs').forEach((b) => b.addEventListener('click', () => {
      document.querySelectorAll('.fs').forEach((x) => x.classList.toggle('active', x === b));
      renderGenTable();
    }));
    document.getElementById('fsFuel')?.addEventListener('change', renderGenTable);
    document.getElementById('fsZone')?.addEventListener('change', renderGenTable);
    document.getElementById('genSearch')?.addEventListener('input', renderGenTable);
    document.getElementById('clearGenFilters')?.addEventListener('click', () => {
      document.querySelectorAll('.fs').forEach((b) => b.classList.toggle('active', b.dataset.status === 'all'));
      const fuelEl = document.getElementById('fsFuel'); if (fuelEl) fuelEl.value = '';
      const zoneEl = document.getElementById('fsZone'); if (zoneEl) zoneEl.value = '';
      const sEl = document.getElementById('genSearch'); if (sEl) sEl.value = '';
      renderGenTable();
    });

    renderGenTable();
  }

  // ============== ALARMS PAGE TABLE ==============
  const alarmsTbody = document.getElementById('alarmsTbody');
  if (alarmsTbody) {
    // Time deltas in minutes (relative to "now" = 12:04 PT for the simulation)
    const allAlarms = [
      { time: '11:58 PT', minsAgo: 6,   sev: 'critical', unit: 'COL-3 · Colstrip Unit 3',    rule: 'stator_temp > 195 for 60s', value: '210 °C',     status: 'open',         owner: 'SO Okafor' },
      { time: '11:55 PT', minsAgo: 9,   sev: 'critical', unit: 'WND-12 · Windover Wind #12', rule: 'lvrt_violation',            value: 'V drop 12%', status: 'unattended',   owner: '—' },
      { time: '11:42 PT', minsAgo: 22,  sev: 'major',    unit: 'CISO interchange tie',       rule: 'ix_dev > 50MW for 10m',     value: '−72 MW',     status: 'acked',        owner: 'M Halvorsen' },
      { time: '11:36 PT', minsAgo: 28,  sev: 'major',    unit: 'DLT-G · Delta Peaker',       rule: 'agc_no_response',           value: '0 MW Δ',     status: 'open',         owner: '—' },
      { time: '11:30 PT', minsAgo: 34,  sev: 'major',    unit: 'Zone AZ · reserves',         rule: 'reserve_margin < 8%',       value: '7.4%',       status: 'open',         owner: 'SO Okafor' },
      { time: '11:21 PT', minsAgo: 43,  sev: 'minor',    unit: 'TOL-S · Toluca PV',          rule: 'inv_trip',                  value: 'string 14',  status: 'auto-restarting', owner: 'system' },
      { time: '11:10 PT', minsAgo: 54,  sev: 'minor',    unit: 'PCS-1 · Pinecrest',          rule: 'pt_imbalance',              value: '4.8%',       status: 'acked',        owner: 'T Nakamura' },
      { time: '10:58 PT', minsAgo: 66,  sev: 'minor',    unit: 'RTU-NV-218',                 rule: 'poll_timeout',              value: '> 30s',      status: 'resolved',     owner: 'system' },
      { time: '10:36 PT', minsAgo: 88,  sev: 'minor',    unit: 'BAR-P · Barnegat Peaker',    rule: 'starting_failure',          value: '3 attempts', status: 'acked',        owner: 'M Halvorsen' },
      { time: '10:22 PT', minsAgo: 102, sev: 'major',    unit: 'TEH-W · Tehachapi Wind',     rule: 'curtailment_breach',        value: '20% over',   status: 'resolved',     owner: 'M Halvorsen' },
      { time: '09:55 PT', minsAgo: 129, sev: 'minor',    unit: 'KCH-1 · Kachina Hydro',      rule: 'spill_rate_high',           value: '+12%',       status: 'acked',        owner: 'T Nakamura' },
      { time: '09:24 PT', minsAgo: 160, sev: 'minor',    unit: 'OWL-S · Owlmesa Solar',      rule: 'soiling > threshold',       value: '12.4%',      status: 'resolved',     owner: 'system' },
    ];

    const filtSev = document.getElementById('filtSev');
    const filtStatus = document.getElementById('filtStatus');
    const filtTime = document.getElementById('filtTime');
    const filtSearch = document.getElementById('filtSearch');
    const emptyEl = document.getElementById('alarmsEmpty');
    const ackBtn = document.getElementById('ackBtn');
    const ackHint = document.getElementById('ackHint');
    const selectAll = document.getElementById('alarmSelectAll');

    function statusPill(status) {
      const cls = status === 'open' || status === 'unattended' ? 'tripped'
        : status === 'acked' || status === 'auto-restarting' ? 'ramping'
        : status === 'resolved' ? 'online' : 'maintenance';
      return `<span class="status-pill ${cls}">${status}</span>`;
    }

    function passesFilters(a) {
      const sev = filtSev?.value || 'all';
      if (sev === 'critical' && a.sev !== 'critical') return false;
      if (sev === 'major' && !(a.sev === 'critical' || a.sev === 'major')) return false;
      if (sev === 'minor' && a.sev !== 'minor') return false;

      const st = filtStatus?.value || 'open';
      if (st === 'open' && !(a.status === 'open' || a.status === 'unattended' || a.status === 'auto-restarting')) return false;
      if (st === 'acked' && a.status !== 'acked') return false;
      if (st === 'resolved' && a.status !== 'resolved') return false;
      // 'all' passes through

      const tw = filtTime?.value || '24h';
      const limits = { '1h': 60, '6h': 360, '24h': 1440, 'shift': 480 };
      if (tw in limits && a.minsAgo > limits[tw]) return false;

      const q = (filtSearch?.value || '').trim().toLowerCase();
      if (q) {
        const hay = (a.unit + ' ' + a.rule + ' ' + a.owner).toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    }

    function renderAlarms() {
      alarmsTbody.innerHTML = '';
      const filtered = allAlarms.filter(passesFilters);
      filtered.forEach((a, idx) => {
        const tr = document.createElement('tr');
        tr.dataset.idx = String(allAlarms.indexOf(a));
        tr.innerHTML = `<td><input type="checkbox" class="alarm-row-check" aria-label="Select alarm ${a.unit}" /></td>
          <td><span class="sev-pill ${a.sev}">${a.sev}</span></td>
          <td>${a.time}</td>
          <td>${a.unit}</td>
          <td><code style="font-family:'JetBrains Mono',monospace;color:#A7B7CD;font-size:11.5px">${a.rule}</code></td>
          <td>${a.value}</td>
          <td>${statusPill(a.status)}</td>
          <td>${a.owner}</td>
          <td><button type="button" class="row-action open-btn" data-idx="${allAlarms.indexOf(a)}">Open →</button></td>`;
        alarmsTbody.appendChild(tr);
      });
      if (emptyEl) emptyEl.hidden = filtered.length !== 0;
      updateAckButton();
    }

    function updateAckButton() {
      if (!ackBtn) return;
      const checked = alarmsTbody.querySelectorAll('.alarm-row-check:checked').length;
      const disabled = checked === 0;
      ackBtn.disabled = disabled;
      ackBtn.setAttribute('aria-disabled', String(disabled));
      if (ackHint) {
        if (disabled) {
          ackHint.textContent = 'Select alarms to acknowledge';
          ackHint.classList.remove('hidden');
        } else {
          ackHint.textContent = `${checked} selected`;
          ackHint.classList.remove('hidden');
        }
      }
    }

    [filtSev, filtStatus, filtTime, filtSearch].forEach((el) => {
      el?.addEventListener('change', renderAlarms);
      el?.addEventListener('input', renderAlarms);
    });
    document.getElementById('clearAlarmFilters')?.addEventListener('click', () => {
      if (filtSev) filtSev.value = 'all';
      if (filtStatus) filtStatus.value = 'all';
      if (filtTime) filtTime.value = '24h';
      if (filtSearch) filtSearch.value = '';
      renderAlarms();
    });

    alarmsTbody.addEventListener('change', (e) => {
      if (e.target.classList.contains('alarm-row-check')) updateAckButton();
    });
    selectAll?.addEventListener('change', () => {
      alarmsTbody.querySelectorAll('.alarm-row-check').forEach((cb) => { cb.checked = selectAll.checked; });
      updateAckButton();
    });

    // Open → button: show alarm detail modal
    alarmsTbody.addEventListener('click', (e) => {
      const btn = e.target.closest('.open-btn');
      if (!btn) return;
      const idx = parseInt(btn.dataset.idx, 10);
      const a = allAlarms[idx];
      if (!a) return;
      const body = document.getElementById('alarmModalBody');
      document.getElementById('alarmModalTitle').textContent = `Alarm · ${a.unit}`;
      body.innerHTML = `
        <dl>
          <dt>Severity</dt><dd><span class="sev-pill ${a.sev}">${a.sev}</span></dd>
          <dt>Triggered</dt><dd>${a.time} (${a.minsAgo} min ago)</dd>
          <dt>Rule</dt><dd><code>${a.rule}</code></dd>
          <dt>Current value</dt><dd>${a.value}</dd>
          <dt>Status</dt><dd>${statusPill(a.status)}</dd>
          <dt>Owner</dt><dd>${a.owner}</dd>
        </dl>
        <p class="muted-sm">Asset telemetry · last 30 min</p>
        <svg class="telemetry-spark" viewBox="0 0 320 60" preserveAspectRatio="none">
          <polyline fill="none" stroke="#F59E0B" stroke-width="1.6" points="0,42 20,38 40,40 60,30 80,28 100,24 120,18 140,14 160,12 180,10 200,9 220,8 240,7 260,6 280,5 300,5 320,4"/>
        </svg>
        <p class="muted-sm">Escalation history</p>
        <ul class="escalation">
          <li>${a.time} — Rule fired (${a.rule})</li>
          <li>${a.minsAgo > 5 ? '+2m — Notification dispatched to on-shift' : 'pending dispatch'}</li>
          <li>${a.status === 'acked' || a.status === 'resolved' ? 'Acknowledged by ' + a.owner : 'Awaiting acknowledgement'}</li>
        </ul>
        <a href="#" class="runbook">📘 View runbook →</a>`;
      const modalAck = document.getElementById('alarmModalAck');
      modalAck.disabled = a.status === 'resolved' || a.status === 'acked';
      modalAck.onclick = () => {
        a.status = 'acked';
        a.owner = a.owner === '—' ? 'SO Okafor' : a.owner;
        hideModal('alarmModal');
        renderAlarms();
        toast(`Acknowledged: ${a.unit}`, { kind: 'warn' });
      };
      showModal('alarmModal');
    });
    document.getElementById('alarmModalClose')?.addEventListener('click', () => hideModal('alarmModal'));
    document.getElementById('alarmModalCancel')?.addEventListener('click', () => hideModal('alarmModal'));

    // Acknowledge selected: confirmation flow
    ackBtn?.addEventListener('click', () => {
      if (ackBtn.disabled) return;
      const checks = Array.from(alarmsTbody.querySelectorAll('.alarm-row-check:checked'));
      if (checks.length === 0) return;
      const list = document.getElementById('ackConfirmList');
      list.innerHTML = '';
      const indices = [];
      checks.forEach((cb) => {
        const tr = cb.closest('tr');
        const idx = parseInt(tr.dataset.idx, 10);
        const a = allAlarms[idx];
        if (a) {
          indices.push(idx);
          const li = document.createElement('li');
          li.textContent = `${a.time} · ${a.unit} (${a.sev})`;
          list.appendChild(li);
        }
      });
      const confirmBtn = document.getElementById('ackConfirmYes');
      confirmBtn.onclick = () => {
        const restored = indices.map((i) => ({ i, prev: { status: allAlarms[i].status, owner: allAlarms[i].owner } }));
        indices.forEach((i) => { allAlarms[i].status = 'acked'; if (allAlarms[i].owner === '—') allAlarms[i].owner = 'SO Okafor'; });
        hideModal('ackConfirm');
        renderAlarms();
        toast(`Acknowledged ${indices.length} alarm${indices.length === 1 ? '' : 's'}`, {
          kind: 'warn',
          actionLabel: 'Undo',
          duration: 6000,
          onAction: () => {
            restored.forEach(({ i, prev }) => { allAlarms[i].status = prev.status; allAlarms[i].owner = prev.owner; });
            renderAlarms();
            toast('Acknowledgement reverted');
          },
        });
      };
      showModal('ackConfirm');
    });
    document.getElementById('ackCancel')?.addEventListener('click', () => hideModal('ackConfirm'));
    document.getElementById('ackConfirmClose')?.addEventListener('click', () => hideModal('ackConfirm'));

    renderAlarms();
  }

  // ============== BELL / NOTIFICATIONS PANEL ==============
  const bellBtn = document.getElementById('bellBtn');
  const notifPanel = document.getElementById('notifPanel');
  const notifList = document.getElementById('notifList');
  if (bellBtn && notifPanel && notifList) {
    const notifs = [
      { sev: 'critical', title: 'Stator over-temp · COL-3', t: '11:58' },
      { sev: 'critical', title: 'LVRT violation · WND-12', t: '11:55' },
      { sev: 'major',    title: 'CISO tie-line deviation', t: '11:42' },
      { sev: 'major',    title: 'AGC failure · DLT-G',     t: '11:36' },
      { sev: 'minor',    title: 'Inverter trip · TOL-S',   t: '11:21' },
    ];
    notifs.forEach((n) => {
      const li = document.createElement('li');
      const dotCls = n.sev === 'critical' ? 'dot-crit' : n.sev === 'major' ? 'dot-warn' : 'dot-maint';
      li.innerHTML = `<span class="dot ${dotCls}"></span>
        <div><div class="n-title">${n.title}</div><div class="n-meta">${n.sev}</div></div>
        <span class="n-time">${n.t}</span>`;
      notifList.appendChild(li);
    });
    bellBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = !notifPanel.hidden;
      notifPanel.hidden = open;
      bellBtn.setAttribute('aria-expanded', String(!open));
    });
    document.addEventListener('click', (e) => {
      if (notifPanel.hidden) return;
      if (e.target === bellBtn || bellBtn.contains(e.target)) return;
      if (!notifPanel.contains(e.target)) {
        notifPanel.hidden = true;
        bellBtn.setAttribute('aria-expanded', 'false');
      }
    });
    document.getElementById('markAllRead')?.addEventListener('click', () => {
      const dot = bellBtn.querySelector('.notif-dot');
      if (dot) dot.style.display = 'none';
      toast('Notifications marked as read');
    });
  }

  // ============== COMMAND PALETTE (⌘K) ==============
  const cmdkBtn = document.getElementById('cmdkBtn');
  const cmdPalette = document.getElementById('cmdPalette');
  const cmdkInput = document.getElementById('cmdkInput');
  const cmdkList = document.getElementById('cmdkList');
  if (cmdPalette && cmdkInput && cmdkList) {
    const items = [
      { kind: 'page', label: 'Overview', href: 'index.html' },
      { kind: 'page', label: 'Generators', href: 'generators.html' },
      { kind: 'page', label: 'Forecast', href: 'forecast.html' },
      { kind: 'page', label: 'Alarms', href: 'alarms.html' },
      { kind: 'unit', label: 'COL-3 · Colstrip Unit 3', href: 'alarms.html' },
      { kind: 'unit', label: 'WND-12 · Windover #12',   href: 'alarms.html' },
      { kind: 'unit', label: 'PVN-1 · Palo Verde 1',    href: 'generators.html' },
      { kind: 'unit', label: 'TEH-W · Tehachapi Wind',  href: 'generators.html' },
      { kind: 'action', label: 'Toggle theme', action: () => document.getElementById('themeToggle')?.click() },
      { kind: 'action', label: 'View all alarms', href: 'alarms.html' },
    ];

    function renderCmdk(filter) {
      cmdkList.innerHTML = '';
      const q = (filter || '').toLowerCase();
      const matches = items.filter((it) => it.label.toLowerCase().includes(q)).slice(0, 8);
      matches.forEach((it, i) => {
        const li = document.createElement('li');
        if (i === 0) li.classList.add('selected');
        li.innerHTML = `<span>${it.label}</span><span class="cmdk-kind">${it.kind}</span>`;
        li.addEventListener('click', () => activate(it));
        cmdkList.appendChild(li);
      });
    }
    function activate(it) {
      cmdPalette.hidden = true;
      if (it.action) { it.action(); return; }
      if (it.href) window.location.href = it.href;
    }
    function openPalette() {
      cmdPalette.hidden = false;
      cmdkInput.value = '';
      renderCmdk('');
      cmdkInput.focus();
    }

    cmdkBtn?.addEventListener('click', (e) => { e.stopPropagation(); openPalette(); });
    cmdkInput.addEventListener('input', () => renderCmdk(cmdkInput.value));
    cmdkInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const sel = cmdkList.querySelector('li.selected') || cmdkList.querySelector('li');
        if (sel) sel.click();
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const lis = Array.from(cmdkList.querySelectorAll('li'));
        if (lis.length === 0) return;
        let idx = lis.findIndex((l) => l.classList.contains('selected'));
        if (idx < 0) idx = 0;
        lis[idx].classList.remove('selected');
        idx = (idx + (e.key === 'ArrowDown' ? 1 : -1) + lis.length) % lis.length;
        lis[idx].classList.add('selected');
        lis[idx].scrollIntoView({ block: 'nearest' });
      }
    });
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openPalette();
      }
    });
  }

  // ============== FORECAST MODEL SELECTOR ==============
  const modelSelect = document.getElementById('modelSelect');
  const modelMeta = document.getElementById('modelMeta');
  if (modelSelect && modelMeta) {
    const modelInfo = {
      day:  { name: 'pulse-net-v8',  trained: '06:00 PT', mape: '1.41%', horizon: 'Day-ahead' },
      hour: { name: 'pulse-rt-v3',   trained: '11:00 PT', mape: '0.62%', horizon: 'Hour-ahead' },
      rt:   { name: 'pulse-flash-v2',trained: '12:03 PT', mape: '0.31%', horizon: 'Real-time (5-min)' },
    };
    modelSelect.addEventListener('change', () => {
      const m = modelInfo[modelSelect.value] || modelInfo.day;
      modelMeta.textContent = `model: ${m.name} · trained ${m.trained} · MAPE ${m.mape} · ${m.horizon}`;
      // Trigger a chart refresh by re-running with a different seed effectively
      const svg = document.getElementById('forecastChart');
      if (svg) {
        // Visually flicker to acknowledge the change
        svg.style.opacity = '0.4';
        setTimeout(() => { svg.style.opacity = '1'; }, 220);
      }
      toast(`Switched to ${m.horizon} model`);
    });
  }
})();
