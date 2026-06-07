// Lark — fitness fixture interactions

(function () {
  // ============== STATUS-BAR CLOCK ==============
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

  // ============== TOAST ==============
  const toastEl = document.getElementById('toast');
  let toastTimer = null;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 1800);
  }

  // ============== NAVIGATION ==============
  function showScreen(name) {
    document.querySelectorAll('.screen').forEach((s) => s.classList.toggle('active', s.dataset.screen === name));
    document.querySelectorAll('.tab').forEach((t) => t.classList.toggle('active', t.dataset.go === name));
    const active = document.querySelector('.screen.active');
    if (active) active.scrollTop = 0;
  }
  document.querySelectorAll('[data-go]').forEach((b) => b.addEventListener('click', () => showScreen(b.dataset.go)));

  // Re-tap active tab → scroll to top with subtle pulse for confirmation
  document.querySelectorAll('.tab').forEach((t) => t.addEventListener('click', () => {
    if (t.classList.contains('active')) {
      const active = document.querySelector('.screen.active');
      if (active) active.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }));

  // ============== ACTIVITY RINGS ==============
  function setRing(id, pct) {
    const el = document.getElementById(id);
    if (!el) return;
    const r = parseFloat(el.getAttribute('r'));
    const c = 2 * Math.PI * r;
    el.style.strokeDasharray = c;
    el.style.strokeDashoffset = c * (1 - Math.min(pct, 1.5));
    el.style.transition = 'stroke-dashoffset 0.9s cubic-bezier(0.2, 0.9, 0.3, 1)';
  }
  setTimeout(() => {
    setRing('ringMove', 820 / 600);
    setRing('ringEx',   34 / 30);
    setRing('ringSt',    9 / 12);
  }, 100);

  // ============== WORKOUTS ==============
  const workouts = [
    { name: '5K Easy Run',                tag: 'run',      coach: 'Aria Eberle',  meta: '28 min · 4 mi · zone 2',   grad: 'linear-gradient(135deg, #84CC16, #38BDF8)' },
    { name: 'Tempo intervals · 4 × 1 km', tag: 'run',      coach: 'Aria Eberle',  meta: '42 min · 5 mi · zone 4',   grad: 'linear-gradient(135deg, #F59E0B, #DC2626)' },
    { name: 'Hill repeats · 6 × 90 s',    tag: 'run',      coach: 'Marcos Dube',  meta: '38 min · 4 mi · zone 5',   grad: 'linear-gradient(135deg, #DC2626, #1F2A12)' },
    { name: 'Easy spin · zone 2',         tag: 'bike',     coach: 'Marcos Dube',  meta: '60 min · indoor · 95 W',   grad: 'linear-gradient(135deg, #38BDF8, #0EA5E9)' },
    { name: 'Sweet-spot intervals',       tag: 'bike',     coach: 'Tessa Aiyer',  meta: '50 min · 88% FTP × 4',     grad: 'linear-gradient(135deg, #6366F1, #38BDF8)' },
    { name: 'Pull day · A',               tag: 'strength', coach: 'Niko Vance',   meta: '60 min · barbell · 5×5',   grad: 'linear-gradient(135deg, #1F2A12, #4D7C0F)' },
    { name: 'Push day · B',               tag: 'strength', coach: 'Niko Vance',   meta: '55 min · barbell · 5×5',   grad: 'linear-gradient(135deg, #4D7C0F, #84CC16)' },
    { name: 'Posterior chain · single-leg', tag: 'strength', coach: 'Niko Vance', meta: '45 min · DBs + bands',     grad: 'linear-gradient(135deg, #65A30D, #BEF264)' },
    { name: 'Hip-mobility flow',          tag: 'yoga',     coach: 'Saskia Linde', meta: '12 min · low-intensity',   grad: 'linear-gradient(135deg, #BEF264, #84CC16)' },
    { name: 'Vinyasa · 40 min',           tag: 'yoga',     coach: 'Saskia Linde', meta: '40 min · all levels',      grad: 'linear-gradient(135deg, #ECFCCB, #BEF264)' },
    { name: 'Tabata · full-body',         tag: 'hiit',     coach: 'Marcos Dube',  meta: '20 min · 8 × (20/10) × 2', grad: 'linear-gradient(135deg, #F43F5E, #F59E0B)' },
    { name: 'Recovery · 4-7-8 breathing', tag: 'recovery', coach: 'Saskia Linde', meta: '10 min · seated',          grad: 'linear-gradient(135deg, #ECFCCB, #38BDF8)' },
  ];
  const wkList = document.getElementById('workoutsList');
  const wkCount = document.getElementById('wkResultCount');
  function renderWk() {
    if (!wkList) return;
    const q = (document.getElementById('wkSearch')?.value || '').toLowerCase();
    const f = document.querySelector('.fp.active')?.dataset.filter || 'all';
    const items = workouts.filter((w) => {
      if (f !== 'all' && w.tag !== f) return false;
      if (q && !(w.name.toLowerCase().includes(q) || w.coach.toLowerCase().includes(q) || w.tag.includes(q))) return false;
      return true;
    });
    if (wkCount) {
      const label = f === 'all' ? 'all categories' : f;
      wkCount.textContent = items.length === 0
        ? `No workouts match ${label}${q ? ` for "${q}"` : ''}`
        : `${items.length} workout${items.length === 1 ? '' : 's'} · ${label}`;
    }
    wkList.innerHTML = '';
    if (items.length === 0) {
      const empty = document.createElement('div');
      empty.style.cssText = 'background:var(--paper);border-radius:14px;padding:28px 16px;text-align:center;color:var(--slate);font-size:13px;';
      empty.textContent = 'Try a different category or clear the search.';
      wkList.appendChild(empty);
      return;
    }
    items.forEach((w) => {
      const card = document.createElement('div');
      card.className = 'wk-card';
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.innerHTML = `
        <div class="wk-cover" style="background:${w.grad}">
          <span class="wk-pill">${w.tag.toUpperCase()}</span>
        </div>
        <div class="wk-body">
          <div class="wk-name">${w.name}</div>
          <div class="wk-by">Coach ${w.coach}</div>
          <div class="wk-meta"><span>${w.meta}</span></div>
        </div>`;
      card.addEventListener('click', () => showScreen('workout-detail'));
      wkList.appendChild(card);
    });
  }
  document.querySelectorAll('.fp').forEach((b) => b.addEventListener('click', () => {
    document.querySelectorAll('.fp').forEach((x) => x.classList.toggle('active', x === b));
    if (wkList) {
      wkList.classList.add('refreshing');
      setTimeout(() => { renderWk(); wkList.classList.remove('refreshing'); }, 160);
    } else {
      renderWk();
    }
  }));
  document.getElementById('wkSearch')?.addEventListener('input', renderWk);
  renderWk();

  // Plan card play buttons & cards (Today screen) → workout detail
  document.querySelectorAll('.plan-card').forEach((card) => {
    card.addEventListener('click', () => showScreen('workout-detail'));
  });

  // ============== ACTIVITY: TIME RANGE ==============
  const actRange = document.getElementById('actRange');
  const actSummary = document.getElementById('actSummary');
  const intensityTitle = document.getElementById('intensityTitle');
  const heatmapEl = document.getElementById('heatmap');

  // Per-range mock summaries so the screen visibly updates on filter change.
  const rangeData = {
    '7':   { workouts: 5,  time: '3h 20m', distance: '28 mi',  cal: '2,940',  intensityLabel: '7-day intensity', cells: 7 },
    '30':  { workouts: 23, time: '14h',    distance: '128 mi', cal: '12,840', intensityLabel: '30-day intensity', cells: 30 },
    '365': { workouts: 286,time: '172h',   distance: '1,540mi',cal: '154,200',intensityLabel: '12-month intensity', cells: 30 },
  };

  function buildHeatmap(seed, count) {
    if (!heatmapEl) return;
    let s = seed || 11;
    function rng() { s = (s * 16807) % 2147483647; return s / 2147483647; }
    heatmapEl.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const cell = document.createElement('div');
      cell.className = 'hm-cell';
      const v = rng();
      const intensity = v < 0.18 ? 0.10 : v < 0.4 ? 0.30 : v < 0.62 ? 0.55 : v < 0.84 ? 0.80 : 1;
      cell.style.background = intensity === 1 ? '#84CC16' : `rgba(132,204,22,${intensity})`;
      cell.title = `Day ${i + 1}: ${Math.round(v * 60) + 5} active min`;
      heatmapEl.appendChild(cell);
    }
  }

  function applyRange(value) {
    const data = rangeData[value] || rangeData['30'];
    if (actSummary) {
      actSummary.classList.add('refreshing');
      setTimeout(() => {
        actSummary.innerHTML = `
          <div class="as"><span class="as-val">${data.workouts}</span><span class="as-label">workouts</span></div>
          <div class="as"><span class="as-val">${data.time}</span><span class="as-label">time</span></div>
          <div class="as"><span class="as-val">${data.distance}</span><span class="as-label">distance</span></div>
          <div class="as"><span class="as-val">${data.cal}</span><span class="as-label">cal</span></div>`;
        actSummary.classList.remove('refreshing');
      }, 180);
    }
    if (intensityTitle) intensityTitle.textContent = data.intensityLabel;
    if (heatmapEl) {
      heatmapEl.classList.add('refreshing');
      setTimeout(() => {
        const seed = value === '7' ? 23 : value === '365' ? 89 : 11;
        buildHeatmap(seed, data.cells);
        heatmapEl.classList.remove('refreshing');
      }, 180);
    }
    const labelMap = { '7': 'this week', '30': 'last 30 days', '365': 'this year' };
    toast(`Showing ${labelMap[value] || 'last 30 days'}`);
  }

  // initial heatmap + summary build
  applyRange('30');
  if (actRange) {
    actRange.value = '30';
    actRange.addEventListener('change', (e) => applyRange(e.target.value));
  }

  // History row click
  document.querySelectorAll('.hist-row').forEach((r) => r.addEventListener('click', () => showScreen('workout-detail')));

  // ============== PROFILE ACTIONS ==============
  const sheetBackdrop = document.getElementById('sheetBackdrop');
  const sheetBody = document.getElementById('sheetBody');
  const sheetClose = document.getElementById('sheetClose');
  const sheetTitle = document.getElementById('sheetTitle');

  function openGoalsSheet() {
    if (!sheetBackdrop || !sheetBody) return;
    sheetTitle.textContent = 'Adjust goals';
    sheetBody.innerHTML = `
      <div class="sb-goal"><span class="sb-name">Move calories</span><span class="sb-val">600 / day</span></div>
      <div class="sb-goal"><span class="sb-name">Workouts</span><span class="sb-val">5 / week</span></div>
      <div class="sb-goal"><span class="sb-name">Sleep</span><span class="sb-val">7.5 hr / night</span></div>
      <div class="sb-goal"><span class="sb-name">Stand hours</span><span class="sb-val">12 / day</span></div>`;
    sheetBackdrop.hidden = false;
  }
  function closeSheet() { if (sheetBackdrop) sheetBackdrop.hidden = true; }
  sheetClose?.addEventListener('click', () => { closeSheet(); toast('Goals saved'); });
  sheetBackdrop?.addEventListener('click', (e) => { if (e.target === sheetBackdrop) closeSheet(); });

  document.querySelector('.goal-edit')?.addEventListener('click', openGoalsSheet);

  // Settings gear → toast (placeholder)
  document.getElementById('profileSettings')?.addEventListener('click', () => toast('Settings coming soon'));
  // Workouts head gear
  document.querySelector('[data-screen="workouts"] .head-icon')?.addEventListener('click', () => toast('Workout preferences coming soon'));
  // Today head + button
  document.querySelector('[data-screen="today"] .head-icon')?.addEventListener('click', () => toast('Quick log coming soon'));
  // Workout-detail share
  document.querySelector('[data-screen="workout-detail"] .head-action')?.addEventListener('click', () => toast('Share link copied'));
  // Start workout CTA
  document.querySelector('.cta-btn-lg')?.addEventListener('click', () => toast('Starting workout…'));
  // Profile preference rows
  document.querySelectorAll('.prof-list li').forEach((li) => {
    li.addEventListener('click', () => toast(`${li.firstChild.textContent.trim().split('·')[0].trim()} coming soon`));
  });

  // ============== SIGN OUT MODAL ==============
  const modal = document.getElementById('modalBackdrop');
  const modalCancel = document.getElementById('modalCancel');
  const modalConfirm = document.getElementById('modalConfirm');
  document.querySelector('.signout-btn')?.addEventListener('click', () => { if (modal) modal.hidden = false; });
  modalCancel?.addEventListener('click', () => { if (modal) modal.hidden = true; });
  modal?.addEventListener('click', (e) => { if (e.target === modal) modal.hidden = true; });
  modalConfirm?.addEventListener('click', () => {
    if (modal) modal.hidden = true;
    toast('Signed out');
  });
})();
