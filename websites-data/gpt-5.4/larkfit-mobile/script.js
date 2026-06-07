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
    const prevActive = document.querySelector('.screen.active');
    const prevName = prevActive ? prevActive.dataset.screen : null;
    document.querySelectorAll('.screen').forEach((s) => s.classList.toggle('active', s.dataset.screen === name));
    document.querySelectorAll('.tab').forEach((t) => t.classList.toggle('active', t.dataset.go === name));
    const active = document.querySelector('.screen.active');
    if (active) active.scrollTop = 0;
    // Reset Workouts filter/search when leaving so users return to a clean list
    if (prevName === 'workouts' && name !== 'workouts') {
      const search = document.getElementById('wkSearch');
      if (search) search.value = '';
      document.querySelectorAll('.fp').forEach((x) => x.classList.toggle('active', x.dataset.filter === 'all'));
      renderWk();
    }
    // Always scroll the chip row back to start so "All" is visible
    const pillRow = document.querySelector('.filter-pills');
    if (pillRow && name === 'workouts') pillRow.scrollLeft = 0;
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
    const q = (document.getElementById('wkSearch')?.value || '').trim();
    const qLower = q.toLowerCase();
    const f = document.querySelector('.fp.active')?.dataset.filter || 'all';
    const fLabel = document.querySelector('.fp.active')?.textContent?.trim() || 'All';
    const items = workouts.filter((w) => {
      if (f !== 'all' && w.tag !== f) return false;
      if (qLower && !(w.name.toLowerCase().includes(qLower) || w.coach.toLowerCase().includes(qLower) || w.tag.includes(qLower))) return false;
      return true;
    });
    wkList.innerHTML = '';
    if (items.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'wk-empty';
      const filtersActive = f !== 'all' || q.length > 0;
      let msg = 'No workouts found.';
      if (q && f !== 'all') msg = `No workouts match "${q}" in ${fLabel}.`;
      else if (q) msg = `No workouts match "${q}".`;
      else if (f !== 'all') msg = `No workouts in ${fLabel} yet.`;
      empty.innerHTML = `
        <div class="wk-empty-icon" aria-hidden="true">🔍</div>
        <div class="wk-empty-msg">${msg}</div>
        <div class="wk-empty-hint">Try a different keyword or category.</div>
        ${filtersActive ? '<button class="wk-empty-reset" id="wkReset">Clear filters</button>' : ''}
      `;
      wkList.appendChild(empty);
      const reset = document.getElementById('wkReset');
      if (reset) reset.addEventListener('click', () => {
        const s = document.getElementById('wkSearch');
        if (s) s.value = '';
        document.querySelectorAll('.fp').forEach((x) => x.classList.toggle('active', x.dataset.filter === 'all'));
        const pillRow = document.querySelector('.filter-pills');
        if (pillRow) pillRow.scrollLeft = 0;
        renderWk();
      });
      return;
    }
    items.forEach((w) => {
      const card = document.createElement('div');
      card.className = 'wk-card';
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
    // Keep "All" visible: scroll to the start when "All" picked, else nudge chip into view
    const pillRow = document.querySelector('.filter-pills');
    if (pillRow) {
      if (b.dataset.filter === 'all') pillRow.scrollLeft = 0;
      else b.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' });
    }
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

  // ============== TOASTS & SHEETS ==============
  const toastEl = document.getElementById('toast');
  let toastTimer = null;
  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.hidden = false;
    requestAnimationFrame(() => toastEl.classList.add('show'));
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('show');
      setTimeout(() => { toastEl.hidden = true; }, 220);
    }, 2200);
  }

  function openSheet(id) {
    const sheet = document.getElementById(id);
    if (!sheet) return;
    sheet.hidden = false;
    requestAnimationFrame(() => sheet.classList.add('show'));
  }
  function closeSheet(id) {
    const sheet = document.getElementById(id);
    if (!sheet) return;
    sheet.classList.remove('show');
    setTimeout(() => { sheet.hidden = true; }, 220);
  }

  // Quick add (+) — open quick-add sheet
  const quickAddBtn = document.getElementById('quickAddBtn');
  if (quickAddBtn) quickAddBtn.addEventListener('click', () => openSheet('quickAddSheet'));
  const quickAddCancel = document.getElementById('quickAddCancel');
  if (quickAddCancel) quickAddCancel.addEventListener('click', () => closeSheet('quickAddSheet'));
  document.querySelectorAll('#quickAddSheet .sheet-item').forEach((b) => b.addEventListener('click', () => {
    closeSheet('quickAddSheet');
    showToast(`${b.textContent.trim()} — coming soon`);
  }));
  // Backdrop close
  document.querySelectorAll('.sheet-backdrop').forEach((bd) => bd.addEventListener('click', (e) => {
    if (e.target === bd) closeSheet(bd.id);
  }));

  // Start workout — visible response
  const startBtn = document.getElementById('startWorkoutBtn');
  if (startBtn) startBtn.addEventListener('click', () => {
    startBtn.classList.add('is-active');
    startBtn.textContent = 'Workout started';
    showToast('Workout started — timer running');
    setTimeout(() => {
      startBtn.classList.remove('is-active');
      startBtn.textContent = 'Start workout';
    }, 2400);
  });

  // Share button on workout detail — toast
  const shareBtn = document.querySelector('.share-btn');
  if (shareBtn) shareBtn.addEventListener('click', () => showToast('Link copied to clipboard'));

  // Sign out — confirmation sheet
  const signoutBtn = document.getElementById('signoutBtn');
  if (signoutBtn) signoutBtn.addEventListener('click', () => openSheet('signoutSheet'));
  const signoutCancel = document.getElementById('signoutCancel');
  if (signoutCancel) signoutCancel.addEventListener('click', () => closeSheet('signoutSheet'));
  const signoutConfirm = document.getElementById('signoutConfirm');
  if (signoutConfirm) signoutConfirm.addEventListener('click', () => {
    closeSheet('signoutSheet');
    showToast('Signed out');
  });

  // Generic feedback for header settings/icons that aren't yet wired up
  document.querySelectorAll('.head-icon').forEach((el) => {
    if (el.id === 'quickAddBtn') return;
    el.addEventListener('click', () => showToast('Settings — coming soon'));
  });
  document.querySelectorAll('.conn-list li').forEach((el) => {
    el.addEventListener('click', () => showToast('Manage connection — coming soon'));
  });
  document.querySelectorAll('.prof-list li').forEach((el) => {
    el.addEventListener('click', () => showToast(`${el.firstChild.textContent.trim()} — coming soon`));
  });
  const goalEdit = document.querySelector('.goal-edit');
  if (goalEdit) goalEdit.addEventListener('click', () => showToast('Adjust goals — coming soon'));
})();
