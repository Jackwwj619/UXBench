const VEHICLES = [
  { id: 'v01', plate: 'NY-H2X05', model: 'Freightliner Cascadia', year: 2022, vin: 'LZGCN12N7MA305821', fleet: 'Northeast Fleet', driver: 'James Hill', phone: '(212) 285-3320', status: 'running', speed: 48, fuel: 62, x: 1000, y: 230, city: 'New York', area: 'Manhattan · I-95 N', task: 'I-95 → Trenton Hub', eta: '14:35', remain: 54 },
  { id: 'v02', plate: 'NY-K81M2', model: 'Volvo VNL 760', year: 2021, vin: 'LDYBA1ND8MB220944', fleet: 'Northeast Fleet', driver: 'Sarah Chen', phone: '(212) 881-9221', status: 'running', speed: 41, fuel: 41, x: 1040, y: 210, city: 'New York', area: 'Queens · LIE Exit 23', task: 'I-80 → Cleveland Terminal', eta: '15:50', remain: 88 },
  { id: 'v03', plate: 'CA-47TR9', model: 'Peterbilt 579', year: 2023, vin: 'LVAFE9MD4PA011220', fleet: 'West Coast Fleet', driver: 'Marcus Lee', phone: '(310) 223-8855', status: 'idle', speed: 0, fuel: 88, x: 200, y: 430, city: 'Los Angeles', area: 'Vernon · DC-1 Warehouse', task: 'Awaiting dispatch', eta: '—', remain: 0 },
  { id: 'v04', plate: 'CA-92NL3', model: 'Kenworth T680', year: 2022, vin: 'LFNAA1XM0NF002314', fleet: 'West Coast Fleet', driver: 'Olivia Brown', phone: '(310) 771-2090', status: 'running', speed: 57, fuel: 55, x: 240, y: 410, city: 'Los Angeles', area: 'I-5 N · Mile 245', task: 'I-5 → Sacramento Warehouse', eta: '13:20', remain: 35 },
  { id: 'v05', plate: 'TX-5SH71', model: 'Freightliner Cascadia', year: 2020, vin: 'LZGCN12N3LA290117', fleet: 'Texas Fleet', driver: 'Ethan Garcia', phone: '(713) 998-3325', status: 'alert', speed: 65, fuel: 38, x: 660, y: 540, city: 'Houston', area: 'I-45 S · Spring branch', task: 'I-10 → Phoenix Distribution Center', eta: '15:10', remain: 20 },
  { id: 'v06', plate: 'TX-H7P22', model: 'Mack Anthem', year: 2021, vin: 'LSDNA52KXMA000118', fleet: 'Texas Fleet', driver: 'Sophia Park', phone: '(713) 552-9933', status: 'maintenance', speed: 0, fuel: 0, x: 640, y: 560, city: 'Houston', area: 'Service Center · Pasadena Yard', task: 'Service in progress (50,000 mi)', eta: 'Done 16:00', remain: 0 },
  { id: 'v07', plate: 'GA-9KT06', model: 'Volvo VNL 760', year: 2022, vin: 'LDYBA1ND0NB100211', fleet: 'Southeast Fleet', driver: 'Daniel Wright', phone: '(404) 223-4422', status: 'running', speed: 55, fuel: 47, x: 870, y: 470, city: 'Atlanta', area: 'I-285 S · Cobb County', task: 'I-75 → Macon Warehouse', eta: '14:00', remain: 15 },
  { id: 'v08', plate: 'NY-B45L9', model: 'Peterbilt 579', year: 2023, vin: 'LVAFE9MD2PA022119', fleet: 'Northeast Fleet', driver: 'Henry Adams', phone: '(212) 881-2245', status: 'offline', speed: 0, fuel: 12, x: 1020, y: 250, city: 'New York', area: 'Brooklyn · Belt Parkway', task: 'Lost signal 28 min', eta: '—', remain: 0 },
  { id: 'v09', plate: 'IL-11K23', model: 'Kenworth T680', year: 2022, vin: 'LFNAA1XM0NF221455', fleet: 'Midwest Fleet', driver: 'Aaron Morales', phone: '(312) 993-2210', status: 'running', speed: 43, fuel: 75, x: 720, y: 280, city: 'Chicago', area: 'I-90 W · Schaumburg', task: 'I-80 → St. Louis Warehouse', eta: '17:30', remain: 123 },
  { id: 'v10', plate: 'IL-7H088', model: 'Mack Anthem', year: 2021, vin: 'LSDNA52KXMA222307', fleet: 'Midwest Fleet', driver: 'Emma Wilson', phone: '(312) 112-9981', status: 'idle', speed: 0, fuel: 92, x: 760, y: 300, city: 'Chicago', area: 'O\'Hare · Cargo Area B', task: 'Awaiting dispatch', eta: '—', remain: 0 },
  { id: 'v11', plate: 'GA-G3P05', model: 'Volvo VNL 760', year: 2020, vin: 'LDYBA1ND8LB559214', fleet: 'Southeast Fleet', driver: 'Carlos Diaz', phone: '(404) 880-2245', status: 'running', speed: 51, fuel: 58, x: 890, y: 450, city: 'Atlanta', area: 'I-20 W · Douglasville', task: 'I-85 → Greenville Hub', eta: '14:50', remain: 40 },
  { id: 'v12', plate: 'NY-09NX2', model: 'Freightliner Cascadia', year: 2023, vin: 'LZGCN12N0PA110488', fleet: 'Northeast Fleet', driver: 'Mia Johnson', phone: '(914) 332-1098', status: 'running', speed: 37, fuel: 36, x: 980, y: 200, city: 'Yonkers', area: 'I-87 N · Mile 12', task: 'I-95 → Boston Terminal', eta: '12:50', remain: 11 },
  { id: 'v13', plate: 'NY-M88K1', model: 'Peterbilt 579', year: 2022, vin: 'LVAFE9MD0NA117809', fleet: 'Northeast Fleet', driver: 'David Kim', phone: '(917) 224-9081', status: 'alert', speed: 60, fuel: 28, x: 1010, y: 240, city: 'New York', area: 'Bronx · Cross Bronx Expwy', task: 'I-90 → Boston Coastal Warehouse', eta: '14:00', remain: 5 },
  { id: 'v14', plate: 'CA-14JQ7', model: 'Mack Anthem', year: 2021, vin: 'LSDNA52KXMA315572', fleet: 'West Coast Fleet', driver: 'Grace Anderson', phone: '(310) 991-3340', status: 'maintenance', speed: 0, fuel: 0, x: 220, y: 440, city: 'Los Angeles', area: 'Service Center · Long Beach Yard', task: 'Front brake pad replacement', eta: 'Done 17:30', remain: 0 },
  { id: 'v15', plate: 'TX-3MP19', model: 'Kenworth T680', year: 2023, vin: 'LFNAA1XM4PF887220', fleet: 'Texas Fleet', driver: 'Lily Martinez', phone: '(713) 993-2207', status: 'running', speed: 55, fuel: 49, x: 680, y: 520, city: 'Houston', area: 'I-69 N · Bush Airport', task: 'I-45 → Dallas Hub', eta: '14:25', remain: 28 },
  { id: 'v16', plate: 'NY-22LK7', model: 'Volvo VNL 760', year: 2019, vin: 'LDYBA1ND6KB559221', fleet: 'Northeast Fleet', driver: 'Oliver Bennett', phone: '(917) 110-9933', status: 'idle', speed: 0, fuel: 80, x: 1030, y: 220, city: 'New York', area: 'Staten Island · DC-3', task: 'Awaiting dispatch', eta: '—', remain: 0 },
  { id: 'v17', plate: 'GA-F45T2', model: 'Freightliner Cascadia', year: 2022, vin: 'LZGCN12N6NA118822', fleet: 'Southeast Fleet', driver: 'Ava Thompson', phone: '(404) 998-2207', status: 'running', speed: 47, fuel: 51, x: 860, y: 480, city: 'Atlanta', area: 'I-75 N · Marietta', task: 'I-85 → Charlotte Hub', eta: '15:30', remain: 47 },
  { id: 'v18', plate: 'CA-82RP6', model: 'Peterbilt 579', year: 2022, vin: 'LVAFE9MD4NA227118', fleet: 'West Coast Fleet', driver: 'Natalie Reyes', phone: '(415) 334-9821', status: 'offline', speed: 0, fuel: 22, x: 230, y: 420, city: 'Los Angeles', area: 'I-110 S · Mile 18', task: 'Lost signal 12 min', eta: '—', remain: 0 },
  { id: 'v19', plate: 'IL-H6N09', model: 'Mack Anthem', year: 2023, vin: 'LSDNA52KXPA110055', fleet: 'Midwest Fleet', driver: 'Chloe Foster', phone: '(312) 224-9080', status: 'running', speed: 52, fuel: 68, x: 740, y: 290, city: 'Chicago', area: 'I-94 W · Skokie', task: 'I-94 → Minneapolis Warehouse', eta: '21:30', remain: 299 },
  { id: 'v20', plate: 'GA-K1NS5', model: 'Kenworth T680', year: 2021, vin: 'LFNAA1XM2MF335782', fleet: 'Southeast Fleet', driver: 'Mason Carter', phone: '(404) 771-9933', status: 'idle', speed: 0, fuel: 64, x: 880, y: 460, city: 'Atlanta', area: 'I-285 E · Dunwoody', task: 'Awaiting dispatch', eta: '—', remain: 0 },
  { id: 'v21', plate: 'NY-N9P22', model: 'Kenworth T680', year: 2020, vin: 'LFNAA1XM6LF118044', fleet: 'Northeast Fleet', driver: 'Ryan Patel', phone: '(212) 885-2208', status: 'running', speed: 43, fuel: 55, x: 990, y: 220, city: 'New York', area: 'White Plains · I-287 E', task: 'I-84 → Hartford Hub', eta: '16:30', remain: 104 },
  { id: 'v22', plate: 'TX-44ZX8', model: 'Volvo VNL 760', year: 2023, vin: 'LDYBA1ND0PB229314', fleet: 'Texas Fleet', driver: 'Isabella Nguyen', phone: '(713) 334-1290', status: 'running', speed: 50, fuel: 73, x: 670, y: 530, city: 'Houston', area: 'I-610 Loop · Bellaire', task: 'Houston intra-city distribution', eta: '13:40', remain: 7 },
  { id: 'v23', plate: 'CA-H08T9', model: 'Freightliner Cascadia', year: 2022, vin: 'LZGCN12N2NA000882', fleet: 'West Coast Fleet', driver: 'Jacob Walker', phone: '(415) 771-2098', status: 'alert', speed: 68, fuel: 31, x: 180, y: 350, city: 'San Francisco', area: 'I-5 N · Mile 280', task: 'I-5 → Portland Hub', eta: '12:55', remain: 14 },
  { id: 'v24', plate: 'IL-5GH27', model: 'Peterbilt 579', year: 2022, vin: 'LVAFE9MD2NA000771', fleet: 'Midwest Fleet', driver: 'Liam Edwards', phone: '(312) 885-9920', status: 'maintenance', speed: 0, fuel: 0, x: 730, y: 310, city: 'Chicago', area: 'Service Center · Joliet Yard', task: 'Battery replacement', eta: 'Done 15:30', remain: 0 },
  { id: 'v25', plate: 'NY-44PL2', model: 'Mack Anthem', year: 2021, vin: 'LSDNA52KXMA445782', fleet: 'Northeast Fleet', driver: 'Hannah Cooper', phone: '(914) 993-2202', status: 'running', speed: 45, fuel: 60, x: 970, y: 210, city: 'New York', area: 'I-95 N · Mile 18', task: 'Cross-country → Phoenix Warehouse', eta: 'Next day 09:00', remain: 671 }
];

const ALERTS = [
  { id: 'a1', time: '12:45', when: '2 min ago', vehicle: 'NY-M88K1', type: 'Speeding', severity: 'critical', status: 'open', note: 'Current 60 mph, limit 50' },
  { id: 'a2', time: '12:43', when: '4 min ago', vehicle: 'TX-5SH71', type: 'Speeding', severity: 'critical', status: 'open', note: 'Current 65 mph, limit 60' },
  { id: 'a3', time: '12:38', when: '9 min ago', vehicle: 'CA-H08T9', type: 'Speeding', severity: 'critical', status: 'open', note: 'Current 68 mph, limit 60' },
  { id: 'a4', time: '12:30', when: '17 min ago', vehicle: 'CA-82RP6', type: 'Offline', severity: 'critical', status: 'open', note: 'Lost signal 12 min' },
  { id: 'a5', time: '12:22', when: '25 min ago', vehicle: 'NY-B45L9', type: 'Offline', severity: 'critical', status: 'open', note: 'Lost signal 28 min, last fuel 12%' },
  { id: 'a6', time: '11:55', when: '52 min ago', vehicle: 'NY-M88K1', type: 'Low fuel', severity: 'warning', status: 'assigned', note: 'Fuel 28%, refuel at nearest stop' },
  { id: 'a7', time: '11:40', when: '1 hr ago', vehicle: 'CA-H08T9', type: 'Low fuel', severity: 'warning', status: 'assigned', note: 'Fuel 31%' },
  { id: 'a8', time: '11:30', when: '1 hr ago', vehicle: 'TX-H7P22', type: 'Service overdue', severity: 'warning', status: 'open', note: '1,200 mi past service interval' },
  { id: 'a9', time: '11:10', when: '1.5 hr ago', vehicle: 'NY-H2X05', type: 'Hard brake', severity: 'info', status: 'resolved', note: 'Decel -0.65 g' },
  { id: 'a10', time: '10:55', when: '2 hr ago', vehicle: 'IL-11K23', type: 'Off route', severity: 'info', status: 'resolved', note: 'Off-route 2.8 mi, auto re-routed' },
  { id: 'a11', time: '10:40', when: '2 hr ago', vehicle: 'NY-09NX2', type: 'Low fuel', severity: 'warning', status: 'resolved', note: 'Fuel 36%, driver refueled' },
  { id: 'a12', time: '10:20', when: '2.5 hr ago', vehicle: 'GA-9KT06', type: 'Hard brake', severity: 'info', status: 'resolved', note: 'Decel -0.71 g' }
];

function $(s, r) { return (r || document).querySelector(s); }
function $$(s, r) { return Array.from((r || document).querySelectorAll(s)); }

function statusLabel(s) { return { running: 'Running', idle: 'Idle', maintenance: 'Maintenance', offline: 'Offline', alert: 'Alert' }[s]; }

function renderMap() {
  const svg = $('#cityMap');
  if (!svg) return;
  let extra = '';
  // grid
  for (let x = 0; x <= 1200; x += 60) extra += `<line x1="${x}" y1="0" x2="${x}" y2="700" stroke="#1A222B" stroke-width="0.5"/>`;
  for (let y = 0; y <= 700; y += 60) extra += `<line x1="0" y1="${y}" x2="1200" y2="${y}" stroke="#1A222B" stroke-width="0.5"/>`;
  // major roads
  const roads = [[60,180,1180,180],[60,360,1180,360],[60,540,1180,540],[180,40,180,680],[600,40,600,680],[960,40,960,680]];
  roads.forEach(([x1,y1,x2,y2]) => extra += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#2A3540" stroke-width="3"/>`);
  // districts blocks
  const blocks = [[940,180,200,140,'Manhattan Hub'],[660,260,200,140,'Chicago Cargo'],[120,380,200,140,'LA Port'],[820,420,200,140,'Atlanta South DC'],[600,500,200,140,'Houston Logistics Park'],[80,300,140,100,'SF Bay Yard']];
  blocks.forEach(([x,y,w,h,n]) => {
    extra += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#141B22" stroke="#293440"/>`;
    extra += `<text x="${x + 8}" y="${y + 18}" font-size="11" fill="#4A5563">${n}</text>`;
  });
  // vehicles
  VEHICLES.forEach(v => {
    const color = { running: '#22C55E', idle: '#64748B', maintenance: '#F97316', offline: '#EF4444', alert: '#A855F7' }[v.status];
    extra += `
      <g class="veh-icon" data-veh="${v.id}" transform="translate(${v.x},${v.y})">
        <rect x="-12" y="-8" width="24" height="16" rx="3" fill="${color}" stroke="#0B1014" stroke-width="1.5"/>
        <rect x="-9" y="-5" width="6" height="10" fill="#0B1014" opacity="0.4"/>
        <circle cx="0" cy="0" r="14" fill="${color}" opacity="0.15"/>
      </g>`;
  });
  svg.innerHTML = extra;
  $$('.veh-icon').forEach(el => el.addEventListener('click', () => openDetail(el.getAttribute('data-veh'))));
}

function renderCounts(filtered) {
  const all = VEHICLES.length;
  $('#cnt-all').textContent = all;
  ['running', 'idle', 'maintenance', 'offline', 'alert'].forEach(k => {
    $('#cnt-' + k).textContent = VEHICLES.filter(v => v.status === k).length;
  });
  $('#vehCount').textContent = filtered.length;
}

function renderTable(filtered) {
  $('#vehicleTbody').innerHTML = filtered.map(v => {
    const fuelCls = v.fuel < 25 ? 'critical' : v.fuel < 50 ? 'low' : '';
    return `<tr data-veh="${v.id}">
      <td class="plate">${v.plate}</td>
      <td>${v.driver}</td>
      <td><span class="status-chip ${v.status}"><span class="d"></span>${statusLabel(v.status)}</span></td>
      <td class="mono">${v.speed} <span style="color:var(--ink-sub);font-size:11px">mph</span></td>
      <td><span class="fuel-bar ${fuelCls}"><span style="width:${v.fuel}%"></span></span>${v.fuel}%</td>
      <td class="mono" style="color:var(--ink-sub);font-size:12px">just now</td>
      <td style="color:var(--ink-sub)">${v.task}</td>
    </tr>`;
  }).join('');
  $$('#vehicleTbody tr').forEach(tr => tr.addEventListener('click', () => openDetail(tr.getAttribute('data-veh'))));
}

let currentFilter = 'all';
function applyFilter() {
  const list = currentFilter === 'all' ? VEHICLES : VEHICLES.filter(v => v.status === currentFilter);
  renderCounts(list);
  renderTable(list);
}

function sparkline(values, w, h, color) {
  const max = Math.max(...values), min = Math.min(...values);
  const range = max - min || 1;
  const stepX = w / (values.length - 1);
  let d = '';
  values.forEach((v, i) => {
    const x = i * stepX, y = h - ((v - min) / range) * (h - 6) - 3;
    d += (i === 0 ? 'M' : 'L') + x + ' ' + y + ' ';
  });
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><path d="${d}" stroke="${color}" stroke-width="1.8" fill="none"/></svg>`;
}

function trackPath(points, w, h) {
  let d = `M${points[0][0]} ${points[0][1]} `;
  for (let i = 1; i < points.length; i++) d += `L${points[i][0]} ${points[i][1]} `;
  return `<svg width="100%" height="${h}" viewBox="0 0 ${w} ${h}"><defs><pattern id="trgrid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" stroke="#1A222B" stroke-width="0.5" fill="none"/></pattern></defs><rect width="${w}" height="${h}" fill="#0E1418"/><rect width="${w}" height="${h}" fill="url(#trgrid)"/><path d="${d}" stroke="#14B8A6" stroke-width="2" fill="none"/>${points.map((p, i) => `<circle cx="${p[0]}" cy="${p[1]}" r="${i === points.length - 1 ? 5 : 2.5}" fill="${i === points.length - 1 ? '#14B8A6' : '#0F766E'}"/>`).join('')}</svg>`;
}

function openDetail(vehId) {
  const v = VEHICLES.find(x => x.id === vehId);
  if (!v) return;
  $('#detailPanel').classList.remove('hidden');
  $('#dpTitle').textContent = `${v.plate} · ${v.driver}`;
  $$('.veh-icon').forEach(el => el.style.opacity = el.getAttribute('data-veh') === vehId ? '1' : '0.5');
  $$('#vehicleTbody tr').forEach(tr => tr.classList.toggle('selected', tr.getAttribute('data-veh') === vehId));
  const fuelTrend = Array.from({length: 24}).map((_, i) => 100 - i * 1.4 - Math.random() * 4);
  const speedTrend = Array.from({length: 24}).map(() => 25 + Math.random() * 40);
  const trackPts = Array.from({length: 18}).map((_, i) => [40 + i * 18, 60 + Math.sin(i * 0.6) * 20 + Math.random() * 10]);

  $('#dpBody').innerHTML = `
    <div class="dp-section">
      <h4>Basic info</h4>
      <div class="dp-row"><span class="lbl">Plate</span><span class="val mono">${v.plate}</span></div>
      <div class="dp-row"><span class="lbl">Model</span><span class="val">${v.model}</span></div>
      <div class="dp-row"><span class="lbl">Year</span><span class="val">${v.year}</span></div>
      <div class="dp-row"><span class="lbl">VIN</span><span class="val mono" style="font-size:11px">${v.vin}</span></div>
      <div class="dp-row"><span class="lbl">Fleet</span><span class="val">${v.fleet}</span></div>
      <div class="dp-row"><span class="lbl">Status</span><span class="val"><span class="status-chip ${v.status}"><span class="d"></span>${statusLabel(v.status)}</span></span></div>
    </div>
    <div class="dp-section">
      <h4>Driver info</h4>
      <div class="dp-row"><span class="lbl">Name</span><span class="val">${v.driver}</span></div>
      <div class="dp-row"><span class="lbl">Phone</span><span class="val mono">${v.phone}</span></div>
      <div class="dp-row"><span class="lbl">Current shift</span><span class="val">Day shift 06:00–18:00</span></div>
      <div class="dp-row"><span class="lbl">Hours driven</span><span class="val mono">5h 47m</span></div>
    </div>
    <div class="dp-section">
      <h4>Current task</h4>
      <div class="dp-row"><span class="lbl">Route</span><span class="val">${v.task}</span></div>
      <div class="dp-row"><span class="lbl">Location</span><span class="val">${v.city} · ${v.area}</span></div>
      <div class="dp-row"><span class="lbl">ETA</span><span class="val mono">${v.eta}</span></div>
      <div class="dp-row"><span class="lbl">Remaining</span><span class="val mono">${v.remain} mi</span></div>
    </div>
    <div class="dp-section">
      <h4>Track history</h4>
      <div class="track-range">
        <button class="active" data-range="24h">24h</button>
        <button data-range="7d">7d</button>
        <button data-range="30d">30d</button>
      </div>
      <div style="background:var(--panel-2);padding:8px;border-radius:8px">${trackPath(trackPts, 400, 140)}</div>
    </div>
    <div class="dp-section">
      <h4>Key metrics</h4>
      <div class="spark"><div class="stitle">Fuel (24h)</div>${sparkline(fuelTrend, 360, 50, '#14B8A6')}</div>
      <div class="spark"><div class="stitle">Speed (24h)</div>${sparkline(speedTrend, 360, 50, '#F97316')}</div>
    </div>
    <div class="dp-actions">
      <button class="btn-primary" onclick="confirmAction('Send command', 'Send a real-time command to driver ${v.driver}?')">Send command</button>
      <button class="btn-secondary">Contact driver</button>
      <button class="btn-secondary">Service history</button>
      <button class="btn-danger" onclick="confirmAction('Reassign task', 'Current task ${v.task} will be reassigned to another vehicle. Continue?')">Reassign task</button>
    </div>
  `;

  $$('.track-range button').forEach(b => b.addEventListener('click', () => {
    $$('.track-range button').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
  }));
}

function confirmAction(title, body) {
  $('#modalTitle').textContent = title;
  $('#modalBody').textContent = body;
  $('#confirmModal').classList.remove('hidden');
  $('#modalCancel').onclick = () => $('#confirmModal').classList.add('hidden');
  $('#modalConfirm').onclick = () => { $('#confirmModal').classList.add('hidden'); alert('Sent (mock)'); };
}

function initDashboard() {
  if (!$('#cityMap')) return;
  renderMap();
  applyFilter();
  $$('.filter-pill').forEach(p => p.addEventListener('click', () => {
    $$('.filter-pill').forEach(x => x.classList.remove('active'));
    p.classList.add('active');
    currentFilter = p.getAttribute('data-status');
    applyFilter();
  }));
  $('#dpClose').addEventListener('click', () => { $('#detailPanel').classList.add('hidden'); $$('.veh-icon').forEach(el => el.style.opacity = '1'); });
  $('#drawerHandle').addEventListener('click', () => $('#drawer').classList.toggle('expanded'));
  $('#alertBtn').addEventListener('click', e => { e.stopPropagation(); renderAlertPopover(); $('#alertPopover').classList.toggle('hidden'); });
  document.addEventListener('click', e => {
    if (!$('#alertPopover').contains(e.target) && e.target !== $('#alertBtn')) $('#alertPopover').classList.add('hidden');
  });

  // simulate live updates
  setInterval(() => {
    $$('.veh-icon').forEach(el => {
      const id = el.getAttribute('data-veh');
      const v = VEHICLES.find(x => x.id === id);
      if (v && v.status === 'running') {
        v.x += (Math.random() - 0.5) * 8;
        v.y += (Math.random() - 0.5) * 8;
        el.setAttribute('transform', `translate(${v.x},${v.y})`);
      }
    });
  }, 5000);
}

function renderAlertPopover() {
  $('#alertPopoverList').innerHTML = ALERTS.slice(0, 5).map(a => `
    <div class="item">
      <div><span class="sev ${a.severity}"></span><b>${a.type}</b> · ${a.vehicle}</div>
      <div style="color:var(--ink-sub);font-size:12px;margin-top:3px">${a.note}</div>
      <div class="when">${a.when}</div>
    </div>
  `).join('');
}

function initAlerts() {
  const root = $('#alertsPage');
  if (!root) return;
  const counts = {
    open: ALERTS.filter(a => a.status === 'open').length,
    today: 12,
    avgMTTR: '42 min'
  };
  root.innerHTML = `
    <h1>Alert Center</h1>
    <p class="page-sub">Alerts and resolution status from the last 24 hours</p>
    <div class="kpi-grid">
      <div class="kpi-card"><div class="lbl">Open alerts</div><div class="val" style="color:var(--red)">${counts.open}</div><div class="trend down">+3 vs yesterday</div></div>
      <div class="kpi-card"><div class="lbl">New today</div><div class="val">${counts.today}</div><div class="trend">−18% vs last week</div></div>
      <div class="kpi-card"><div class="lbl">Critical</div><div class="val" style="color:var(--red)">5</div><div class="trend down">+2</div></div>
      <div class="kpi-card"><div class="lbl">Avg resolution time</div><div class="val">${counts.avgMTTR}</div><div class="trend">−6 min</div></div>
    </div>
    <div class="toolbar">
      <select><option>Last 24 hours</option><option>Last 7 days</option><option>Last 30 days</option></select>
      <select id="filterSev"><option value="">All severities</option><option value="critical">Critical</option><option value="warning">Warning</option><option value="info">Info</option></select>
      <select id="filterType"><option value="">All types</option><option>Speeding</option><option>Off route</option><option>Hard brake</option><option>Low fuel</option><option>Service overdue</option><option>Offline</option></select>
      <select id="filterStatus"><option value="">All statuses</option><option value="open">Open</option><option value="assigned">Assigned</option><option value="resolved">Resolved</option></select>
      <input placeholder="Search by plate / driver…" />
    </div>
    <table class="data-table">
      <thead><tr><th>Time</th><th>Vehicle</th><th>Type</th><th>Severity</th><th>Status</th><th>Note</th><th>Actions</th></tr></thead>
      <tbody id="alertsBody"></tbody>
    </table>
  `;
  function renderRows() {
    const fs = $('#filterSev').value, ft = $('#filterType').value, fst = $('#filterStatus').value;
    const rows = ALERTS.filter(a => (!fs || a.severity === fs) && (!ft || a.type === ft) && (!fst || a.status === fst));
    $('#alertsBody').innerHTML = rows.map(a => `<tr>
      <td class="mono">${a.time}</td>
      <td class="plate">${a.vehicle}</td>
      <td>${a.type}</td>
      <td><span class="severity ${a.severity}">${a.severity === 'critical' ? 'Critical' : a.severity === 'warning' ? 'Warning' : 'Info'}</span></td>
      <td><span class="status-chip ${a.status === 'open' ? 'alert' : a.status === 'assigned' ? 'maintenance' : 'idle'}"><span class="d"></span>${a.status === 'open' ? 'Open' : a.status === 'assigned' ? 'Assigned' : 'Resolved'}</span></td>
      <td style="color:var(--ink-sub)">${a.note}</td>
      <td>
        ${a.status === 'open' ? '<button class="btn-primary" style="padding:5px 10px;font-size:11px;border-radius:6px">Assign</button>' : ''}
        <button class="btn-secondary" style="padding:5px 10px;font-size:11px;border-radius:6px">Details</button>
      </td>
    </tr>`).join('');
  }
  $('#filterSev').addEventListener('change', renderRows);
  $('#filterType').addEventListener('change', renderRows);
  $('#filterStatus').addEventListener('change', renderRows);
  renderRows();
}

function initVehiclesPage() {
  const root = $('#vehiclesPage');
  if (!root) return;
  root.innerHTML = `
    <h1>Vehicles</h1>
    <p class="page-sub">${VEHICLES.length} vehicles, filter by status, model, or fleet</p>
    <div class="toolbar">
      <select id="fStatus"><option value="">All statuses</option><option value="running">Running</option><option value="idle">Idle</option><option value="maintenance">Maintenance</option><option value="offline">Offline</option><option value="alert">Alert</option></select>
      <select id="fFleet"><option value="">All fleets</option><option>Northeast Fleet</option><option>West Coast Fleet</option><option>Texas Fleet</option><option>Southeast Fleet</option><option>Midwest Fleet</option><option>Pacific Fleet</option></select>
      <input id="fSearch" placeholder="Search by plate / driver / VIN…" />
    </div>
    <table class="data-table">
      <thead><tr><th><input type="checkbox" id="selAll"></th><th>Plate</th><th>Model</th><th>Driver</th><th>Status</th><th>Location</th><th>Mileage</th><th>Last service</th><th>Next service</th><th></th></tr></thead>
      <tbody id="vehTbodyFull"></tbody>
    </table>
  `;
  function rows() {
    const s = $('#fStatus').value, f = $('#fFleet').value, q = $('#fSearch').value.toLowerCase();
    const filtered = VEHICLES.filter(v => (!s || v.status === s) && (!f || v.fleet === f) && (!q || (v.plate + v.driver + v.vin).toLowerCase().includes(q)));
    $('#vehTbodyFull').innerHTML = filtered.map(v => `<tr>
      <td><input type="checkbox"></td>
      <td class="plate">${v.plate}</td>
      <td>${v.model} (${v.year})</td>
      <td>${v.driver}</td>
      <td><span class="status-chip ${v.status}"><span class="d"></span>${statusLabel(v.status)}</span></td>
      <td style="color:var(--ink-sub)">${v.city} · ${v.area}</td>
      <td class="mono">${Math.round(Math.random() * 200000 + 60000).toLocaleString()} mi</td>
      <td class="mono" style="color:var(--ink-sub)">2026-04-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}</td>
      <td class="mono" style="color:var(--ink-sub)">2026-07-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}</td>
      <td><button class="btn-secondary" style="padding:5px 10px;font-size:11px;border-radius:6px">Details</button></td>
    </tr>`).join('');
  }
  $('#fStatus').addEventListener('change', rows);
  $('#fFleet').addEventListener('change', rows);
  $('#fSearch').addEventListener('input', rows);
  rows();
}

function initAnalytics() {
  const root = $('#analyticsPage');
  if (!root) return;
  const bars = Array.from({length: 30}).map(() => 14 + Math.random() * 11);
  const barsSvg = `<svg width="100%" height="220" viewBox="0 0 600 220" preserveAspectRatio="none">${bars.map((b, i) => `<rect x="${i * 19 + 4}" y="${220 - b * 8 - 20}" width="15" height="${b * 8}" fill="#14B8A6" opacity="${0.5 + b / 50}"/>`).join('')}<line x1="0" y1="200" x2="600" y2="200" stroke="#293440"/></svg>`;
  const heatmap = Array.from({length: 7}).map((_, r) => Array.from({length: 24}).map((_, c) => {
    const v = (r >= 1 && r <= 5 && c >= 7 && c <= 21) ? 0.45 + Math.random() * 0.5 : Math.random() * 0.35;
    return `<rect x="${c * 22 + 60}" y="${r * 22 + 10}" width="20" height="20" fill="#14B8A6" opacity="${v}"/>`;
  }).join('')).join('');
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  root.innerHTML = `
    <h1>Analytics dashboard</h1>
    <p class="page-sub">Fleet performance this month</p>
    <div class="kpi-grid">
      <div class="kpi-card"><div class="lbl">Total mileage</div><div class="val">1.5M mi</div><div class="trend">+8.4% vs last month</div></div>
      <div class="kpi-card"><div class="lbl">Avg fuel economy</div><div class="val">8.3 mpg</div><div class="trend down">−0.4 mpg</div></div>
      <div class="kpi-card"><div class="lbl">Utilization</div><div class="val">76.8%</div><div class="trend">+3.1%</div></div>
      <div class="kpi-card"><div class="lbl">On-time rate</div><div class="val">93.2%</div><div class="trend">+1.4%</div></div>
    </div>
    <div class="chart-card"><h3>Daily active vehicles this month</h3>${barsSvg}</div>
    <div class="chart-card"><h3>Fleet utilization heatmap (day × hour)</h3>
      <svg width="100%" height="180" viewBox="0 0 600 180">${heatmap}${days.map((d, i) => `<text x="50" y="${i * 22 + 25}" text-anchor="end" font-size="11" fill="#8E97A1">${d}</text>`).join('')}${Array.from({length: 24}).map((_, c) => `<text x="${c * 22 + 70}" y="174" text-anchor="middle" font-size="10" fill="#8E97A1">${c}</text>`).join('')}</svg>
    </div>
    <div class="chart-card"><h3>Driver Performance — Top 10</h3>
      <table class="data-table" style="border:none">
        <thead><tr><th>Rank</th><th>Driver</th><th>Fleet</th><th>Mileage</th><th>On-time</th><th>Efficiency</th></tr></thead>
        <tbody>
          ${VEHICLES.slice(0, 10).map((v, i) => `<tr><td>${i + 1}</td><td>${v.driver}</td><td>${v.fleet}</td><td class="mono">${(5000 + Math.random() * 4500).toFixed(0)} mi</td><td class="mono">${(90 + Math.random() * 9).toFixed(1)}%</td><td class="mono" style="color:var(--green)">${(7.5 + Math.random() * 2).toFixed(1)} / 10</td></tr>`).join('')}
        </tbody>
      </table>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  initDashboard();
  initAlerts();
  initVehiclesPage();
  initAnalytics();
});
