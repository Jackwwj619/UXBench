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
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2200);
  }

  // ============== MODAL ==============
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const modalCancel = document.getElementById('modalCancel');
  const modalConfirm = document.getElementById('modalConfirm');
  let modalResolver = null;
  function openModal({ title, bodyHTML, confirmText = 'OK', cancelText = 'Cancel', danger = false, hideCancel = false }) {
    return new Promise((resolve) => {
      modalTitle.textContent = title;
      modalBody.innerHTML = bodyHTML || '';
      modalConfirm.textContent = confirmText;
      modalCancel.textContent = cancelText;
      modalConfirm.classList.toggle('danger', !!danger);
      modalCancel.style.display = hideCancel ? 'none' : '';
      modalBackdrop.hidden = false;
      modalResolver = resolve;
      setTimeout(() => modalConfirm.focus(), 50);
    });
  }
  function closeModal(result) {
    modalBackdrop.hidden = true;
    if (modalResolver) { modalResolver(result); modalResolver = null; }
  }
  modalCancel?.addEventListener('click', () => closeModal(false));
  modalConfirm?.addEventListener('click', () => {
    const inputs = modalBody.querySelectorAll('input');
    const data = {};
    inputs.forEach((i) => { data[i.name || i.id] = i.value; });
    closeModal({ ok: true, data });
  });
  modalBackdrop?.addEventListener('click', (e) => { if (e.target === modalBackdrop) closeModal(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !modalBackdrop.hidden) closeModal(false); });

  // ============== + (QUICK ADD) ==============
  document.getElementById('addQuickBtn')?.addEventListener('click', async () => {
    const res = await openModal({
      title: 'Quick add',
      bodyHTML: `
        <p style="margin:0 0 8px;">What would you like to log?</p>
        <label for="qaType">Type</label>
        <select id="qaType" name="type" style="width:100%;padding:10px 12px;min-height:44px;border:1px solid var(--line);border-radius:10px;font-family:inherit;font-size:14px;">
          <option>Workout</option><option>Steps</option><option>Water</option><option>Mood note</option>
        </select>
        <label for="qaNote">Note (optional)</label>
        <input type="text" id="qaNote" name="note" placeholder="e.g. felt strong today" />
      `,
      confirmText: 'Add',
    });
    if (res && res.ok) showToast(`Added ${res.data.type.toLowerCase()}`);
  });

  // ============== ⚙ SETTINGS ==============
  document.querySelectorAll('.settings-btn').forEach((b) => b.addEventListener('click', async () => {
    await openModal({
      title: 'Settings',
      bodyHTML: `
        <p style="margin:0 0 6px;">Quick toggles. Full settings in a later release.</p>
        <ul style="list-style:none;padding:0;margin:8px 0 0;">
          <li style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px dashed var(--line);">Notifications<span style="color:var(--lime-700);font-weight:700;">On</span></li>
          <li style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px dashed var(--line);">Units<span style="color:var(--ink-2);font-weight:700;">Imperial</span></li>
          <li style="display:flex;justify-content:space-between;padding:10px 0;">Auto-pause workouts<span style="color:var(--lime-700);font-weight:700;">On</span></li>
        </ul>
      `,
      confirmText: 'Done',
      hideCancel: true,
    });
  }));

  // ============== ADJUST GOALS ==============
  document.getElementById('adjustGoalsBtn')?.addEventListener('click', async () => {
    const res = await openModal({
      title: 'Adjust goals',
      bodyHTML: `
        <label for="gMove">Move calories / day</label>
        <input type="number" id="gMove" name="move" min="100" max="2000" value="600" />
        <label for="gWk">Workouts / week</label>
        <input type="number" id="gWk" name="workouts" min="1" max="14" value="5" />
        <label for="gSleep">Sleep hours / night</label>
        <input type="number" id="gSleep" name="sleep" min="4" max="12" step="0.5" value="7.5" />
      `,
      confirmText: 'Save goals',
    });
    if (res && res.ok) showToast('Goals updated');
  });

  // ============== SHARE ==============
  document.querySelector('.share-btn')?.addEventListener('click', async () => {
    if (navigator.share) {
      try { await navigator.share({ title: 'Easy 5K — recovery pace', text: 'Check out this workout on Lark', url: window.location.href }); return; } catch (_) { /* fall through */ }
    }
    await openModal({
      title: 'Share workout',
      bodyHTML: `
        <p style="margin:0 0 8px;">Send this workout to a friend.</p>
        <ul style="list-style:none;padding:0;margin:0;">
          <li style="padding:12px;border:1px solid var(--line);border-radius:12px;margin-bottom:8px;cursor:pointer;">📋 Copy link</li>
          <li style="padding:12px;border:1px solid var(--line);border-radius:12px;margin-bottom:8px;cursor:pointer;">💬 Message</li>
          <li style="padding:12px;border:1px solid var(--line);border-radius:12px;cursor:pointer;">📧 Email</li>
        </ul>
      `,
      confirmText: 'Done',
      hideCancel: true,
    });
    showToast('Link copied');
  });

  // ============== SIGN OUT ==============
  document.getElementById('signoutBtn')?.addEventListener('click', async () => {
    const res = await openModal({
      title: 'Sign out?',
      bodyHTML: '<p style="margin:0;">You\'ll need to sign back in to view your activity. Synced data stays safe.</p>',
      confirmText: 'Sign out',
      cancelText: 'Stay signed in',
      danger: true,
    });
    if (res && res.ok) {
      showToast('Signed out');
      setTimeout(() => showScreen('today'), 800);
    }
  });

  // ============== START WORKOUT (active timer) ==============
  const startBtn = document.getElementById('startWorkoutBtn');
  const waOverlay = document.getElementById('workoutActive');
  const waTimer = document.getElementById('waTimer');
  const waPause = document.getElementById('waPause');
  const waStop = document.getElementById('waStop');
  let waInterval = null, waSeconds = 0, waPaused = false;
  function fmt(s) {
    const m = Math.floor(s / 60), ss = s % 60;
    return `${String(m).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
  }
  function startTimer() {
    waSeconds = 0; waPaused = false;
    waTimer.textContent = fmt(0);
    waPause.textContent = 'Pause';
    clearInterval(waInterval);
    waInterval = setInterval(() => {
      if (!waPaused) { waSeconds++; waTimer.textContent = fmt(waSeconds); }
    }, 1000);
  }
  function stopTimer() { clearInterval(waInterval); waInterval = null; }
  startBtn?.addEventListener('click', () => {
    if (startBtn.classList.contains('is-loading')) return;
    startBtn.classList.add('is-loading');
    const orig = startBtn.textContent;
    startBtn.textContent = 'Starting';
    setTimeout(() => {
      startBtn.classList.remove('is-loading');
      startBtn.textContent = orig;
      waOverlay.hidden = false;
      startTimer();
      showToast('Workout started');
    }, 600);
  });
  waPause?.addEventListener('click', () => {
    waPaused = !waPaused;
    waPause.textContent = waPaused ? 'Resume' : 'Pause';
  });
  waStop?.addEventListener('click', async () => {
    const res = await openModal({
      title: 'End workout?',
      bodyHTML: `<p style="margin:0;">You'll save <strong>${fmt(waSeconds)}</strong> of activity to your log.</p>`,
      confirmText: 'End & save',
      cancelText: 'Keep going',
    });
    if (res && res.ok) {
      stopTimer();
      waOverlay.hidden = true;
      showToast(`Workout saved · ${fmt(waSeconds)}`);
      showScreen('today');
    }
  });
})();
