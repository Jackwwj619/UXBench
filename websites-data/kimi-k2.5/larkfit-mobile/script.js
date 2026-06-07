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
  let toastTimer = null;
  function toast(msg, ms) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.hidden = false;
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toastEl.hidden = true; }, ms || 1800);
  }

  // ============== MODAL ==============
  const overlay = document.getElementById('modalOverlay');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalClose');
  function openModal(title, html) {
    if (!overlay) return;
    modalTitle.textContent = title;
    modalBody.innerHTML = html;
    overlay.hidden = false;
  }
  function closeModal() { if (overlay) overlay.hidden = true; }
  modalClose?.addEventListener('click', closeModal);
  overlay?.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && overlay && !overlay.hidden) closeModal(); });

  // ============== ADJUST GOALS ==============
  const goals = { move: 600, workouts: 5, sleep: 7.5 };
  document.getElementById('adjustGoalsBtn')?.addEventListener('click', () => {
    openModal('Adjust goals', `
      <div class="modal-note">Set weekly targets. Changes apply to today's rings immediately.</div>
      <label class="opt-row" style="display:flex;flex-direction:column;align-items:stretch;gap:6px;">
        <div class="opt-name">Move calories · <span id="gMoveVal">${goals.move}</span> cal/day</div>
        <input class="modal-input" type="range" min="200" max="1200" step="20" value="${goals.move}" id="gMove" />
      </label>
      <label class="opt-row" style="display:flex;flex-direction:column;align-items:stretch;gap:6px;">
        <div class="opt-name">Workouts · <span id="gWkVal">${goals.workouts}</span> /week</div>
        <input class="modal-input" type="range" min="1" max="14" step="1" value="${goals.workouts}" id="gWk" />
      </label>
      <label class="opt-row" style="display:flex;flex-direction:column;align-items:stretch;gap:6px;">
        <div class="opt-name">Sleep · <span id="gSlVal">${goals.sleep}</span> hr/night</div>
        <input class="modal-input" type="range" min="5" max="10" step="0.25" value="${goals.sleep}" id="gSl" />
      </label>
      <button class="modal-cta" id="goalsSave">Save goals</button>
      <button class="modal-cta secondary" id="goalsCancel">Cancel</button>
    `);
    const moveI = document.getElementById('gMove');
    const wkI = document.getElementById('gWk');
    const slI = document.getElementById('gSl');
    moveI.addEventListener('input', () => { document.getElementById('gMoveVal').textContent = moveI.value; });
    wkI.addEventListener('input', () => { document.getElementById('gWkVal').textContent = wkI.value; });
    slI.addEventListener('input', () => { document.getElementById('gSlVal').textContent = slI.value; });
    document.getElementById('goalsCancel').addEventListener('click', closeModal);
    document.getElementById('goalsSave').addEventListener('click', () => {
      goals.move = +moveI.value; goals.workouts = +wkI.value; goals.sleep = +slI.value;
      closeModal();
      toast('Goals updated');
    });
  });

  // ============== UNITS / NOTIFICATIONS / PRIVACY / EXPORT / SETTINGS ==============
  const prefs = { units: 'imperial' };
  function unitOpts() {
    return ['imperial', 'metric'].map((u) => `
      <div class="opt-row ${prefs.units === u ? 'selected' : ''}" data-unit="${u}">
        <span class="opt-radio"></span>
        <div class="opt-text">
          <div class="opt-name">${u.charAt(0).toUpperCase() + u.slice(1)}</div>
          <div class="opt-sub">${u === 'imperial' ? 'miles, lbs, °F' : 'kilometers, kg, °C'}</div>
        </div>
      </div>`).join('');
  }
  function openUnits() {
    openModal('Units', `<div class="modal-note">Pick how distances, weights, and temperature are shown across the app.</div>${unitOpts()}`);
    modalBody.querySelectorAll('[data-unit]').forEach((row) => {
      row.addEventListener('click', () => {
        prefs.units = row.dataset.unit;
        modalBody.querySelectorAll('[data-unit]').forEach((r) => r.classList.toggle('selected', r === row));
        const label = document.getElementById('unitsValue');
        if (label) label.textContent = prefs.units;
        toast(`Units set to ${prefs.units}`);
        setTimeout(closeModal, 350);
      });
    });
  }

  const notifs = [
    { id: 'reminder', name: 'Daily move reminder', sub: '11:00 am if rings are below 50%', on: true },
    { id: 'workouts', name: 'Workout summaries', sub: 'After each completed workout', on: true },
    { id: 'streak', name: 'Streak alerts', sub: 'Heads-up before a streak breaks', on: true },
    { id: 'social', name: 'Coach replies & shoutouts', sub: 'Replies, kudos from coaches', on: false },
  ];
  function renderNotifCount() {
    const n = notifs.filter((x) => x.on).length;
    const el = document.getElementById('notifValue');
    if (el) el.textContent = `${n} enabled`;
  }
  function openNotifications() {
    openModal('Notifications', `
      <div class="modal-note">Toggle which alerts Lark sends you.</div>
      ${notifs.map((n) => `
        <div class="opt-row ${n.on ? 'on' : ''}" data-notif="${n.id}">
          <div class="opt-text">
            <div class="opt-name">${n.name}</div>
            <div class="opt-sub">${n.sub}</div>
          </div>
          <span class="opt-toggle"></span>
        </div>`).join('')}
      <button class="modal-cta" id="notifDone">Done</button>
    `);
    modalBody.querySelectorAll('[data-notif]').forEach((row) => {
      row.addEventListener('click', () => {
        const item = notifs.find((x) => x.id === row.dataset.notif);
        item.on = !item.on;
        row.classList.toggle('on', item.on);
        renderNotifCount();
      });
    });
    document.getElementById('notifDone').addEventListener('click', () => { closeModal(); toast('Notifications saved'); });
  }

  const privacy = { profile: 'friends', activitySharing: true, leaderboard: false };
  function openPrivacy() {
    openModal('Privacy & sharing', `
      <div class="modal-note">Control who sees your profile and where activity is shared.</div>
      <div class="opt-row" data-priv="profile">
        <div class="opt-text">
          <div class="opt-name">Profile visibility</div>
          <div class="opt-sub" id="privProfSub">${privacy.profile}</div>
        </div>
        <span class="pl-chev">›</span>
      </div>
      <div class="opt-row ${privacy.activitySharing ? 'on' : ''}" data-priv="sharing">
        <div class="opt-text">
          <div class="opt-name">Auto-share workouts</div>
          <div class="opt-sub">Push to Strava and connected apps</div>
        </div>
        <span class="opt-toggle"></span>
      </div>
      <div class="opt-row ${privacy.leaderboard ? 'on' : ''}" data-priv="leaderboard">
        <div class="opt-text">
          <div class="opt-name">Show on public leaderboard</div>
          <div class="opt-sub">Coach challenges and segments</div>
        </div>
        <span class="opt-toggle"></span>
      </div>
      <button class="modal-cta" id="privDone">Save</button>
    `);
    modalBody.querySelector('[data-priv="profile"]').addEventListener('click', () => {
      const cycle = ['private', 'friends', 'public'];
      privacy.profile = cycle[(cycle.indexOf(privacy.profile) + 1) % cycle.length];
      const s = document.getElementById('privProfSub'); if (s) s.textContent = privacy.profile;
    });
    modalBody.querySelector('[data-priv="sharing"]').addEventListener('click', (e) => {
      privacy.activitySharing = !privacy.activitySharing;
      e.currentTarget.classList.toggle('on', privacy.activitySharing);
    });
    modalBody.querySelector('[data-priv="leaderboard"]').addEventListener('click', (e) => {
      privacy.leaderboard = !privacy.leaderboard;
      e.currentTarget.classList.toggle('on', privacy.leaderboard);
    });
    document.getElementById('privDone').addEventListener('click', () => { closeModal(); toast('Privacy preferences saved'); });
  }

  function openExport() {
    openModal('Data export', `
      <div class="modal-note">Download a copy of your Lark data. Large exports are emailed to you.</div>
      <div class="opt-row" data-export="csv">
        <div class="opt-text">
          <div class="opt-name">Workouts · CSV</div>
          <div class="opt-sub">Last 12 months · ~ 0.4 MB</div>
        </div>
        <span class="pl-chev">↓</span>
      </div>
      <div class="opt-row" data-export="gpx">
        <div class="opt-text">
          <div class="opt-name">GPS tracks · GPX bundle</div>
          <div class="opt-sub">23 outdoor sessions</div>
        </div>
        <span class="pl-chev">↓</span>
      </div>
      <div class="opt-row" data-export="full">
        <div class="opt-text">
          <div class="opt-name">Full archive · ZIP (emailed)</div>
          <div class="opt-sub">All data, ready in ~10 min</div>
        </div>
        <span class="pl-chev">✉</span>
      </div>
    `);
    modalBody.querySelectorAll('[data-export]').forEach((row) => {
      row.addEventListener('click', () => {
        const t = row.dataset.export;
        const msg = t === 'full' ? 'Archive request queued · check email' : `Preparing ${t.toUpperCase()} export…`;
        toast(msg);
        setTimeout(closeModal, 500);
      });
    });
  }

  function openSettings(scope) {
    openModal('Settings', `
      <div class="modal-note">${scope === 'workouts' ? 'Adjust how workouts are shown and recorded.' : 'Quick access to account preferences.'}</div>
      <div class="opt-row" data-settings-go="units"><div class="opt-text"><div class="opt-name">Units</div><div class="opt-sub">${prefs.units}</div></div><span class="pl-chev">›</span></div>
      <div class="opt-row" data-settings-go="notifications"><div class="opt-text"><div class="opt-name">Notifications</div><div class="opt-sub">${notifs.filter((n)=>n.on).length} enabled</div></div><span class="pl-chev">›</span></div>
      <div class="opt-row" data-settings-go="privacy"><div class="opt-text"><div class="opt-name">Privacy & sharing</div><div class="opt-sub">Profile · ${privacy.profile}</div></div><span class="pl-chev">›</span></div>
    `);
    modalBody.querySelectorAll('[data-settings-go]').forEach((row) => {
      row.addEventListener('click', () => {
        const dest = row.dataset.settingsGo;
        closeModal();
        setTimeout(() => {
          if (dest === 'units') openUnits();
          else if (dest === 'notifications') openNotifications();
          else if (dest === 'privacy') openPrivacy();
        }, 60);
      });
    });
  }

  document.querySelectorAll('[data-pref]').forEach((el) => {
    const handler = () => {
      const k = el.dataset.pref;
      if (k === 'units') openUnits();
      else if (k === 'notifications') openNotifications();
      else if (k === 'privacy') openPrivacy();
      else if (k === 'export') openExport();
    };
    el.addEventListener('click', handler);
    el.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handler(); } });
  });
  document.querySelectorAll('[data-settings]').forEach((b) => {
    b.addEventListener('click', () => openSettings(b.dataset.settings));
  });

  // ============== START WORKOUT ==============
  const startBtn = document.getElementById('startWorkoutBtn');
  let workoutState = 'idle'; // idle | starting | running
  let workoutTimer = null;
  let workoutSecs = 0;
  function fmtTime(s) {
    const m = Math.floor(s / 60); const r = s % 60;
    return `${String(m).padStart(2, '0')}:${String(r).padStart(2, '0')}`;
  }
  startBtn?.addEventListener('click', () => {
    if (workoutState === 'idle') {
      workoutState = 'starting';
      startBtn.classList.add('is-loading');
      startBtn.innerHTML = '<span class="cta-spinner"></span> Starting…';
      setTimeout(() => {
        workoutState = 'running';
        workoutSecs = 0;
        startBtn.classList.remove('is-loading');
        startBtn.classList.add('is-running');
        startBtn.innerHTML = `<span class="run-dot"></span> Workout · <span id="wkClock">00:00</span> · tap to stop`;
        toast('Workout started · zone 2');
        workoutTimer = setInterval(() => {
          workoutSecs += 1;
          const c = document.getElementById('wkClock');
          if (c) c.textContent = fmtTime(workoutSecs);
        }, 1000);
      }, 600);
    } else if (workoutState === 'running') {
      clearInterval(workoutTimer);
      const elapsed = fmtTime(workoutSecs);
      workoutState = 'idle';
      startBtn.classList.remove('is-running');
      startBtn.textContent = 'Start workout';
      toast(`Workout saved · ${elapsed}`);
    }
  });
})();
