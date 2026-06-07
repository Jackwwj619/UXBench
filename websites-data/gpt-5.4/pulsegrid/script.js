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
    const filtered = fullGens.filter((g) => {
      const z = zoneMap[g.id] || '';
      if (status !== 'all' && g.status !== status && !(status === 'maintenance' && g.status === 'maint')) return false;
      if (fuel && g.fuel !== fuel) return false;
      if (zone && z !== zone) return false;
      if (q && !(g.id.toLowerCase().includes(q) || g.name.toLowerCase().includes(q))) return false;
      return true;
    });
    genTbody.innerHTML = '';
    filtered.forEach((g, i) => {
      const pct = Math.round((g.out / g.cap) * 100);
      const statusLabel = g.status === 'maint' ? 'maintenance' : g.status;
      const tr = document.createElement('tr');
      tr.innerHTML = `<td data-label=""><input type="checkbox" aria-label="Select ${g.id}" /></td>
        <td class="gid-cell" data-label="Unit">${g.id}</td>
        <td class="name-cell" data-label="Plant">${g.name}</td>
        <td data-label="Fuel"><span class="fuel-icon ${g.fuel}">${capFuel(g.fuel)}</span></td>
        <td data-label="Zone">${zoneMap[g.id] || '—'}</td>
        <td class="num" data-label="Output">${g.out.toLocaleString()} <small>MW</small></td>
        <td class="num" data-label="Capacity">${g.cap.toLocaleString()}</td>
        <td class="num" data-label="% cap"><span class="pct-bar"><i style="width:${pct}%"></i></span>${pct}%</td>
        <td data-label="Status"><span class="status-pill ${statusLabel}">${statusLabel}</span></td>
        <td data-label="Operator">${opMap[g.fuel] || 'Operator'}</td>
        <td data-label=""><button class="row-action" type="button" aria-label="Open details for ${g.id}" data-detail="${g.id}">Details →</button></td>`;
      genTbody.appendChild(tr);
    });
    const cnt = document.getElementById('genCount');
    if (cnt) cnt.textContent = `${filtered.length} of ${fullGens.length} dispatchable units · 312 total assets`;

    const summary = document.getElementById('genSummary');
    const empty = document.getElementById('genEmpty');
    const emptyDetail = document.getElementById('genEmptyDetail');
    const activeFilters = [];
    if (status !== 'all') activeFilters.push(`status: ${status}`);
    if (fuel) activeFilters.push(`fuel: ${capFuel(fuel)}`);
    if (zone) activeFilters.push(`zone: ${zone}`);
    if (q) activeFilters.push(`search: "${q}"`);
    if (summary) {
      if (filtered.length === 0) {
        summary.textContent = activeFilters.length
          ? `No matches with active filters (${activeFilters.join(', ')})`
          : 'No generators to display';
      } else if (activeFilters.length === 0) {
        summary.textContent = `Showing all ${filtered.length} dispatchable units`;
      } else {
        summary.textContent = `Showing ${filtered.length} of ${fullGens.length} units · filters: ${activeFilters.join(', ')}`;
      }
    }
    if (empty) {
      empty.hidden = filtered.length !== 0;
      if (emptyDetail) {
        emptyDetail.textContent = activeFilters.length
          ? `Active filters — ${activeFilters.join(', ')}.`
          : 'No filters are active.';
      }
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
    document.getElementById('genReset')?.addEventListener('click', () => {
      document.querySelectorAll('.fs').forEach((x) => x.classList.toggle('active', x.dataset.status === 'all'));
      const fuelSel = document.getElementById('fsFuel'); if (fuelSel) fuelSel.value = '';
      const zoneSel = document.getElementById('fsZone'); if (zoneSel) zoneSel.value = '';
      const search = document.getElementById('genSearch'); if (search) search.value = '';
      renderGenTable();
    });
    genTbody.addEventListener('click', (ev) => {
      const btn = ev.target.closest('.row-action[data-detail]');
      if (!btn) return;
      ev.preventDefault();
      const tr = btn.closest('tr');
      const existing = tr?.nextElementSibling;
      if (existing && existing.classList.contains('row-detail')) {
        existing.remove();
        btn.setAttribute('aria-expanded', 'false');
        return;
      }
      const id = btn.dataset.detail;
      const drawer = document.createElement('tr');
      drawer.className = 'row-detail';
      drawer.innerHTML = `<td colspan="11"><div class="detail-drawer"><strong>${id}</strong> — full unit detail page is not yet available in this build. Use the Operator field for direct contact, or open the corresponding alarm in the Alarms tab.</div></td>`;
      tr.parentNode.insertBefore(drawer, tr.nextSibling);
      btn.setAttribute('aria-expanded', 'true');
    });
    document.getElementById('genSelectAll')?.addEventListener('change', (ev) => {
      genTbody.querySelectorAll('input[type="checkbox"]').forEach((c) => { c.checked = ev.target.checked; });
    });

    // Update counts
    const cAll = document.getElementById('cAll'); if (cAll) cAll.textContent = fullGens.length;
    const cOnline = document.getElementById('cOnline'); if (cOnline) cOnline.textContent = fullGens.filter((g) => g.status === 'online').length;
    const cRamp = document.getElementById('cRamp'); if (cRamp) cRamp.textContent = fullGens.filter((g) => g.status === 'ramping').length;
    const cTrip = document.getElementById('cTrip'); if (cTrip) cTrip.textContent = fullGens.filter((g) => g.status === 'tripped').length;
    const cMaint = document.getElementById('cMaint'); if (cMaint) cMaint.textContent = fullGens.filter((g) => g.status === 'maint' || g.status === 'maintenance').length;

    renderGenTable();
  }

  // ============== ALARMS PAGE TABLE ==============
  const alarmsTbody = document.getElementById('alarmsTbody');
  if (alarmsTbody) {
    // [time, sev, asset, rule, value, status, owner, minutesAgo]
    const allAlarms = [
      ['11:58 PT', 'critical', 'COL-3 · Colstrip Unit 3',    'stator_temp > 195 for 60s', '210 °C',     'open',    'SO Okafor',     6],
      ['11:55 PT', 'critical', 'WND-12 · Windover Wind #12', 'lvrt_violation',            'V drop 12%', 'open',    '—',             9],
      ['11:42 PT', 'major',    'CISO interchange tie',       'ix_dev > 50MW for 10m',     '−72 MW',     'acked',   'M Halvorsen',   22],
      ['11:36 PT', 'major',    'DLT-G · Delta Peaker',       'agc_no_response',           '0 MW Δ',     'open',    '—',             28],
      ['11:30 PT', 'major',    'Zone AZ · reserves',         'reserve_margin < 8%',       '7.4%',       'open',    'SO Okafor',     34],
      ['11:21 PT', 'minor',    'TOL-S · Toluca PV',          'inv_trip',                  'string 14',  'acked',   'system',        43],
      ['11:10 PT', 'minor',    'PCS-1 · Pinecrest',          'pt_imbalance',              '4.8%',       'acked',   'T Nakamura',    54],
      ['10:58 PT', 'minor',    'RTU-NV-218',                 'poll_timeout',              '> 30s',      'resolved','system',        66],
      ['10:36 PT', 'minor',    'BAR-P · Barnegat Peaker',    'starting_failure',          '3 attempts', 'acked',   'M Halvorsen',   88],
      ['10:22 PT', 'major',    'TEH-W · Tehachapi Wind',     'curtailment_breach',        '20% over',   'resolved','M Halvorsen',   102],
      ['09:55 PT', 'minor',    'KCH-1 · Kachina Hydro',      'spill_rate_high',           '+12%',       'acked',   'T Nakamura',    129],
      ['09:24 PT', 'minor',    'OWL-S · Owlmesa Solar',      'soiling > threshold',       '12.4%',      'resolved','system',        160],
    ];

    const sevSel = document.getElementById('alSev');
    const statusSel = document.getElementById('alStatus');
    const timeSel = document.getElementById('alTime');
    const search = document.getElementById('alSearch');
    const summary = document.getElementById('alarmsSummary');
    const empty = document.getElementById('alarmsEmpty');
    const emptyDetail = document.getElementById('alarmsEmptyDetail');
    const ack = document.getElementById('ackSelected');

    const sevRank = { critical: 3, major: 2, minor: 1 };

    function renderAlarms() {
      const sev = sevSel?.value || 'all';
      const st = statusSel?.value || 'open';
      const tw = timeSel?.value || '24h';
      const q = (search?.value || '').toLowerCase();
      const windowMins = tw === '1h' ? 60 : tw === '6h' ? 360 : tw === 'shift' ? 480 : 24 * 60;

      const filtered = allAlarms.filter((r) => {
        if (sev === 'critical' && r[1] !== 'critical') return false;
        if (sev === 'major+' && sevRank[r[1]] < 2) return false;
        if (sev === 'minor' && r[1] !== 'minor') return false;
        if (st !== 'all' && r[5] !== st) return false;
        if (r[7] > windowMins) return false;
        if (q && !(r[2].toLowerCase().includes(q) || r[3].toLowerCase().includes(q) || (r[6] || '').toLowerCase().includes(q))) return false;
        return true;
      });

      alarmsTbody.innerHTML = '';
      filtered.forEach((r) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td data-label=""><input type="checkbox" class="alarm-check" aria-label="Select alarm ${r[2]}" /></td>
          <td data-label="Sev"><span class="sev-pill ${r[1]}">${r[1]}</span></td>
          <td data-label="Triggered">${r[0]}</td>
          <td data-label="Unit / asset">${r[2]}</td>
          <td data-label="Rule"><code style="font-family:'JetBrains Mono',monospace;color:#A7B7CD;font-size:11.5px">${r[3]}</code></td>
          <td data-label="Value">${r[4]}</td>
          <td data-label="Status"><span class="status-pill ${r[5] === 'open' ? 'tripped' : r[5] === 'acked' ? 'ramping' : r[5] === 'resolved' ? 'online' : 'maintenance'}">${r[5]}</span></td>
          <td data-label="Owner">${r[6]}</td>
          <td data-label=""><button class="row-action" type="button" data-alarm="${r[2]}" aria-label="Open alarm ${r[2]}">Open →</button></td>`;
        alarmsTbody.appendChild(tr);
      });

      const sevLabel = sev === 'all' ? 'all severities' : sev === 'critical' ? 'critical' : sev === 'major+' ? 'major+' : 'minor';
      const stLabel = st === 'all' ? 'all statuses' : st;
      const twLabel = tw === '1h' ? 'last 1h' : tw === '6h' ? 'last 6h' : tw === 'shift' ? 'this shift' : 'last 24h';
      const qLabel = q ? ` matching "${q}"` : '';
      if (summary) {
        summary.textContent = `Showing ${filtered.length} ${sevLabel === 'all severities' ? '' : sevLabel + ' '}alarm${filtered.length === 1 ? '' : 's'} · ${stLabel} · ${twLabel}${qLabel}`;
      }
      if (empty) {
        empty.hidden = filtered.length !== 0;
        if (emptyDetail) {
          emptyDetail.textContent = `Active filters — severity: ${sevLabel}, status: ${stLabel}, window: ${twLabel}${q ? `, search: "${q}"` : ''}.`;
        }
      }
      updateAck();
    }

    function updateAck() {
      if (!ack) return;
      const checked = alarmsTbody.querySelectorAll('.alarm-check:checked').length;
      ack.disabled = checked === 0;
      ack.textContent = checked === 0 ? 'Acknowledge selected' : `Acknowledge ${checked} selected`;
    }

    sevSel?.addEventListener('change', renderAlarms);
    statusSel?.addEventListener('change', renderAlarms);
    timeSel?.addEventListener('change', renderAlarms);
    search?.addEventListener('input', renderAlarms);
    document.getElementById('alarmsReset')?.addEventListener('click', () => {
      if (sevSel) sevSel.value = 'all';
      if (statusSel) statusSel.value = 'open';
      if (timeSel) timeSel.value = '24h';
      if (search) search.value = '';
      renderAlarms();
    });
    alarmsTbody.addEventListener('change', (ev) => {
      if (ev.target.matches('.alarm-check')) updateAck();
    });
    document.getElementById('alSelectAll')?.addEventListener('change', (ev) => {
      alarmsTbody.querySelectorAll('.alarm-check').forEach((c) => { c.checked = ev.target.checked; });
      updateAck();
    });
    alarmsTbody.addEventListener('click', (ev) => {
      const btn = ev.target.closest('.row-action[data-alarm]');
      if (!btn) return;
      ev.preventDefault();
      const tr = btn.closest('tr');
      const existing = tr?.nextElementSibling;
      if (existing && existing.classList.contains('row-detail')) {
        existing.remove();
        return;
      }
      const drawer = document.createElement('tr');
      drawer.className = 'row-detail';
      drawer.innerHTML = `<td colspan="9"><div class="detail-drawer">Alarm investigation view for <strong>${btn.dataset.alarm}</strong> is not yet available in this build. Acknowledge from this row, or contact the listed owner.</div></td>`;
      tr.parentNode.insertBefore(drawer, tr.nextSibling);
    });

    renderAlarms();
  }

  // ============== INDEX OVERVIEW: alert bell popover ==============
  const bell = document.getElementById('alertBell');
  const popover = document.getElementById('alertsPopover');
  if (bell && popover) {
    bell.addEventListener('click', (ev) => {
      ev.stopPropagation();
      const open = !popover.hasAttribute('hidden');
      if (open) {
        popover.setAttribute('hidden', '');
        bell.setAttribute('aria-expanded', 'false');
      } else {
        popover.removeAttribute('hidden');
        bell.setAttribute('aria-expanded', 'true');
      }
    });
    document.addEventListener('click', (ev) => {
      if (!popover.contains(ev.target) && ev.target !== bell) {
        popover.setAttribute('hidden', '');
        bell.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ============== INDEX: load chart range buttons ==============
  document.querySelectorAll('[data-load-range]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-load-range]').forEach((b) => b.classList.toggle('active', b === btn));
    });
  });

  // ============== FORECAST: range chips + horizon select ==============
  const fcTitle = document.getElementById('fcRangeTitle');
  document.querySelectorAll('[data-fc-range]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-fc-range]').forEach((b) => b.classList.toggle('active', b === btn));
      const v = btn.dataset.fcRange;
      if (fcTitle) {
        fcTitle.textContent = v === '12' ? 'Next 12 hours · MW' : v === '168' ? 'Next 7 days · MW' : 'Next 24 hours · MW';
      }
    });
  });
  const fcHorizon = document.getElementById('fcHorizon');
  if (fcHorizon && fcTitle) {
    fcHorizon.addEventListener('change', () => {
      const v = fcHorizon.value;
      const prefix = v === 'hour' ? 'Hour-ahead' : v === 'rt' ? 'Real-time' : 'Day-ahead';
      const active = document.querySelector('[data-fc-range].active');
      const range = active?.dataset.fcRange === '12' ? '12 hours' : active?.dataset.fcRange === '168' ? '7 days' : '24 hours';
      fcTitle.textContent = `${prefix} · next ${range} · MW`;
    });
  }
})();
