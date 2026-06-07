// Brewlog — coffee log mobile fixture

(function () {
  // Clock
  const sbTime = document.querySelector('.sb-time');
  function tick() {
    if (!sbTime) return;
    const d = new Date();
    let h = d.getHours();
    if (h > 12) h -= 12;
    if (h === 0) h = 12;
    sbTime.textContent = `${h}:${String(d.getMinutes()).padStart(2, '0')}`;
  }
  tick(); setInterval(tick, 30000);

  // Navigation
  function showScreen(name) {
    document.querySelectorAll('.screen').forEach((s) => s.classList.toggle('active', s.dataset.screen === name));
    document.querySelectorAll('.tab').forEach((t) => t.classList.toggle('active', t.dataset.go === name));
    const active = document.querySelector('.screen.active');
    if (active) active.scrollTop = 0;
  }
  document.querySelectorAll('[data-go]').forEach((b) => b.addEventListener('click', () => showScreen(b.dataset.go)));

  // Ratio calculation
  const inputs = document.querySelectorAll('.dual-input input');
  function recalcRatio() {
    const dose = parseFloat(inputs[0]?.value || 0);
    const yld = parseFloat(inputs[1]?.value || 0);
    const out = document.getElementById('ratioOut');
    if (!out) return;
    if (dose > 0) out.textContent = `1 : ${(yld / dose).toFixed(1)}`;
    else out.textContent = '—';
  }
  inputs.forEach((i) => i.addEventListener('input', recalcRatio));
  recalcRatio();

  // Grind slider value
  const grindSlider = document.getElementById('grindSlider');
  const grindVal = document.getElementById('grindVal');
  grindSlider?.addEventListener('input', () => grindVal.textContent = grindSlider.value);

  // Score pills
  document.querySelectorAll('.score-pill').forEach((p) => p.addEventListener('click', () => {
    document.querySelectorAll('.score-pill').forEach((x) => x.classList.toggle('active', x === p));
  }));

  // Save brew → flash + return to today
  const form = document.getElementById('brewForm');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.cta-btn-coffee');
    const t = btn.textContent;
    btn.textContent = '✓ Saved';
    btn.style.background = '#65A30D';
    setTimeout(() => { btn.textContent = t; btn.style.background = ''; showScreen('today'); }, 900);
  });

  // Method card visual sync (radios are visually hidden, this just makes the click target friendlier)
  document.querySelectorAll('.m-card').forEach((c) => c.addEventListener('click', () => {
    document.querySelectorAll('.m-card').forEach((x) => {
      const input = x.querySelector('input');
      if (input) input.checked = x === c;
    });
  }));

  // Toast helper
  const phone = document.querySelector('.phone');
  let toastEl = null, toastTimer = null;
  function toast(msg) {
    if (!phone) return;
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'toast';
      phone.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    requestAnimationFrame(() => toastEl.classList.add('show'));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 1800);
  }

  // Stats range filter — visibly update tiles + note
  const rangeSelect = document.getElementById('statsRange');
  const rangeNote = document.getElementById('rangeNote');
  const tileVals = {
    '7':    { brews: '17',  avg: '8.1', coffee: '258 g',   cost: '$28.40', label: 'Showing last 7 days' },
    '30':   { brews: '64',  avg: '8.0', coffee: '1,024 g', cost: '$112.80', label: 'Showing last 30 days' },
    'year': { brews: '412', avg: '7.9', coffee: '6.9 kg',  cost: '$724.10', label: 'Showing this year' }
  };
  function applyRange(v) {
    const data = tileVals[v] || tileVals['7'];
    document.querySelectorAll('#statTiles .st-val').forEach((el) => {
      const k = el.dataset.stat;
      if (data[k] != null) el.textContent = data[k];
    });
    if (rangeNote) {
      rangeNote.textContent = data.label;
      rangeNote.classList.add('flash');
      setTimeout(() => rangeNote.classList.remove('flash'), 900);
    }
  }
  rangeSelect?.addEventListener('change', () => applyRange(rangeSelect.value));

  // Beans search — live filter + status + empty state
  const beanSearch = document.getElementById('beanSearchInput');
  const beanList = document.getElementById('beanList');
  const beanStatus = document.getElementById('beanSearchStatus');
  const beanEmpty = document.getElementById('beanEmpty');
  function filterBeans() {
    if (!beanList) return;
    const q = (beanSearch?.value || '').trim().toLowerCase();
    const rows = beanList.querySelectorAll('.bean-row');
    let shown = 0;
    rows.forEach((r) => {
      const hay = (r.dataset.bean || r.textContent || '').toLowerCase();
      const match = !q || hay.includes(q);
      r.style.display = match ? '' : 'none';
      if (match) shown++;
    });
    if (beanStatus) {
      if (!q) beanStatus.textContent = `${rows.length} beans`;
      else if (shown === 0) beanStatus.textContent = `No matches for "${beanSearch.value}"`;
      else beanStatus.textContent = `${shown} of ${rows.length} beans match "${beanSearch.value}"`;
    }
    if (beanEmpty) beanEmpty.hidden = shown !== 0;
  }
  beanSearch?.addEventListener('input', filterBeans);

  // + New bean — feedback toast (no destination available in static fixture)
  document.getElementById('newBeanBtn')?.addEventListener('click', () => toast('New bean form — coming soon'));

  // Reorder buttons — feedback toast
  document.querySelectorAll('.b-act.muted').forEach((b) => b.addEventListener('click', (e) => {
    e.preventDefault();
    toast('Added to reorder list');
  }));

  // Trend chart (last 14 brews score)
  const trendSvg = document.getElementById('trendChart');
  if (trendSvg) {
    const scores = [7.4, 7.8, 8.0, 7.2, 8.2, 8.4, 8.0, 7.6, 8.5, 8.8, 8.1, 7.9, 8.5, 8.0];
    const W = 320, H = 110, padL = 8, padR = 8, padT = 12, padB = 14;
    const innerW = W - padL - padR, innerH = H - padT - padB;
    const min = 5, max = 10;
    const xS = (i) => padL + (i / (scores.length - 1)) * innerW;
    const yS = (v) => padT + innerH - ((v - min) / (max - min)) * innerH;
    let g = '';
    // gridlines
    [6, 7, 8, 9].forEach((v) => {
      const y = yS(v);
      g += `<line x1="${padL}" y1="${y}" x2="${W - padR}" y2="${y}" stroke="#E8DDC9" stroke-dasharray="2 3"/>`;
      g += `<text x="${padL + 2}" y="${y - 2}" fill="#A29680" font-size="9" font-family="JetBrains Mono">${v}</text>`;
    });
    // line + area
    const pts = scores.map((v, i) => `${xS(i)},${yS(v)}`).join(' ');
    const area = `${padL},${H - padB} ${pts} ${W - padR},${H - padB}`;
    g += `<polygon points="${area}" fill="rgba(156,107,67,0.18)"/>`;
    g += `<polyline points="${pts}" fill="none" stroke="#5C3A22" stroke-width="2"/>`;
    // dots
    scores.forEach((v, i) => {
      g += `<circle cx="${xS(i)}" cy="${yS(v)}" r="3" fill="#5C3A22" stroke="white" stroke-width="1.5"/>`;
    });
    trendSvg.innerHTML = g;
  }
})();
