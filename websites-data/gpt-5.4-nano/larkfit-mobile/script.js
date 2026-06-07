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

  // ============== NAVIGATION ==============
  function showScreen(name) {
    document.querySelectorAll('.screen').forEach((s) => s.classList.toggle('active', s.dataset.screen === name));
    document.querySelectorAll('.tab').forEach((t) => t.classList.toggle('active', t.dataset.go === name));
    const active = document.querySelector('.screen.active');
    if (active) active.scrollTop = 0;
  }
  document.querySelectorAll('[data-go]').forEach((b) => b.addEventListener('click', () => showScreen(b.dataset.go)));

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
    setRing('ringMove', 820 / 600);  // > 100%
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
  function renderWk() {
    if (!wkList) return;
    const q = (document.getElementById('wkSearch')?.value || '').toLowerCase();
    const f = document.querySelector('.fp.active')?.dataset.filter || 'all';
    const items = workouts.filter((w) => {
      if (f !== 'all' && w.tag !== f) return false;
      if (q && !(w.name.toLowerCase().includes(q) || w.coach.toLowerCase().includes(q) || w.tag.includes(q))) return false;
      return true;
    });
    wkList.innerHTML = '';
    items.forEach((w) => {
      const card = document.createElement('div');
      card.className = 'wk-card';
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `${w.name} by Coach ${w.coach}`);
      card.innerHTML = `
        <div class="wk-cover" style="background:${w.grad}">
          <span class="wk-pill">${w.tag.toUpperCase()}</span>
        </div>
        <div class="wk-body">
          <div class="wk-text">
            <div class="wk-name">${w.name}</div>
            <div class="wk-by">Coach ${w.coach}</div>
            <div class="wk-meta"><span>${w.meta}</span></div>
          </div>
          <button class="wk-start" type="button" aria-label="Start ${w.name}">
            <span class="wk-start-ico">▶</span>
            <span class="wk-start-lbl">Start</span>
          </button>
        </div>`;
      const go = (e) => {
        e.stopPropagation();
        showScreen('workout-detail');
        showToast(`Loading ${w.name}…`);
      };
      card.addEventListener('click', go);
      card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(e); } });
      card.querySelector('.wk-start').addEventListener('click', go);
      wkList.appendChild(card);
    });
  }
  document.querySelectorAll('.fp').forEach((b) => b.addEventListener('click', () => {
    document.querySelectorAll('.fp').forEach((x) => x.classList.toggle('active', x === b));
    renderWk();
  }));
  document.getElementById('wkSearch')?.addEventListener('input', renderWk);
  renderWk();

  // ============== HEATMAP ==============
  const hm = document.getElementById('heatmap');
  if (hm) {
    let s = 11;
    function rng() { s = (s * 16807) % 2147483647; return s / 2147483647; }
    for (let i = 0; i < 30; i++) {
      const cell = document.createElement('div');
      cell.className = 'hm-cell';
      const v = rng();
      const intensity = v < 0.18 ? 0.10 : v < 0.4 ? 0.30 : v < 0.62 ? 0.55 : v < 0.84 ? 0.80 : 1;
      cell.style.background = intensity === 1 ? '#84CC16' : `rgba(132,204,22,${intensity})`;
      cell.title = `Day ${i + 1}: ${Math.round(v * 60) + 5} active min`;
      hm.appendChild(cell);
    }
  }

  // History row click
  document.querySelectorAll('.hist-row').forEach((r) => r.addEventListener('click', () => showScreen('workout-detail')));

  // ============== TOAST ==============
  const toastEl = document.getElementById('toast');
  let toastTimer;
  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.hidden = false;
    requestAnimationFrame(() => toastEl.classList.add('show'));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('show');
      setTimeout(() => { toastEl.hidden = true; }, 220);
    }, 1600);
  }

  // ============== SETTINGS DRAWER ==============
  const drawer = document.getElementById('settingsDrawer');
  const backdrop = document.getElementById('drawerBackdrop');
  const drawerClose = document.getElementById('drawerClose');
  let lastFocus = null;
  function openDrawer(title) {
    if (!drawer) return;
    lastFocus = document.activeElement;
    if (title) {
      const t = document.getElementById('settingsTitle');
      if (t) t.textContent = title;
    }
    drawer.hidden = false;
    backdrop.hidden = false;
    requestAnimationFrame(() => {
      drawer.classList.add('open');
      backdrop.classList.add('open');
    });
    setTimeout(() => drawerClose?.focus(), 50);
  }
  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    setTimeout(() => {
      drawer.hidden = true;
      backdrop.hidden = true;
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }, 220);
  }
  document.getElementById('wkSettingsBtn')?.addEventListener('click', () => openDrawer('Workout settings'));
  document.getElementById('profSettingsBtn')?.addEventListener('click', () => openDrawer('Settings'));
  drawerClose?.addEventListener('click', closeDrawer);
  backdrop?.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !drawer.hidden) closeDrawer(); });

  // ============== NAV FEEDBACK ==============
  // Toast on tab/sec-link navigation for clearer feedback
  document.querySelectorAll('.sec-link[data-go]').forEach((el) => {
    el.addEventListener('click', () => showToast('Workouts'));
  });

  // Start-workout CTA on detail page
  document.querySelectorAll('.cta-btn-lg').forEach((b) => {
    b.addEventListener('click', () => showToast('Workout starting…'));
  });

  // Plus / share / add affordances — visible feedback instead of silent no-op
  document.querySelectorAll('.app-head .head-icon, .app-head .head-action').forEach((el) => {
    if (el.id === 'wkSettingsBtn' || el.id === 'profSettingsBtn') return;
    if (el.tagName === 'SELECT') return;
    el.addEventListener('click', () => {
      const txt = (el.textContent || '').trim();
      if (txt === '+') showToast('Quick log — coming soon');
      else if (txt === '⤴') showToast('Share link copied');
    });
  });
})();
