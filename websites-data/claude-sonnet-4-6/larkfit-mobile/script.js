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
      if (v < 0.12) {
        cell.classList.add('rest');
        cell.title = `Day ${i + 1}: rest day`;
      } else {
        const intensity = v < 0.32 ? 0.30 : v < 0.55 ? 0.55 : v < 0.80 ? 0.80 : 1;
        cell.style.background = intensity === 1 ? '#84CC16' : `rgba(132,204,22,${intensity})`;
        cell.title = `Day ${i + 1}: ${Math.round(v * 60) + 5} active min`;
      }
      hm.appendChild(cell);
    }
  }

  // History row click
  document.querySelectorAll('.hist-row').forEach((r) => r.addEventListener('click', () => showScreen('workout-detail')));

  // ============== TOAST ==============
  const toastEl = document.getElementById('toast');
  let toastTimer = null;
  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2200);
  }

  // ============== SHEET ==============
  const sheetEl = document.getElementById('sheet');
  const sheetTitle = document.getElementById('sheetTitle');
  const sheetBody = document.getElementById('sheetBody');
  const sheetConfirm = document.getElementById('sheetConfirm');
  let sheetOnConfirm = null;
  function openSheet({ title, bodyHTML, confirmLabel = 'OK', onConfirm = null, cancelLabel = 'Cancel' }) {
    if (!sheetEl) return;
    sheetTitle.textContent = title;
    sheetBody.innerHTML = bodyHTML || '';
    sheetConfirm.textContent = confirmLabel;
    sheetEl.querySelector('.sheet-cancel').textContent = cancelLabel;
    sheetOnConfirm = onConfirm;
    sheetEl.hidden = false;
  }
  function closeSheet() { if (sheetEl) sheetEl.hidden = true; sheetOnConfirm = null; }
  sheetEl?.querySelectorAll('[data-sheet-close]').forEach((el) => el.addEventListener('click', closeSheet));
  sheetConfirm?.addEventListener('click', () => {
    const cb = sheetOnConfirm;
    closeSheet();
    if (typeof cb === 'function') cb();
  });

  // ============== ADD BUTTON (Today screen) ==============
  document.getElementById('addBtn')?.addEventListener('click', () => {
    openSheet({
      title: 'Log activity',
      bodyHTML: `
        <p>Add a custom workout or activity to today.</p>
        <label for="logType">Activity type</label>
        <select id="logType">
          <option>Run</option><option>Bike</option><option>Strength</option>
          <option>Yoga</option><option>HIIT</option><option>Walk</option>
        </select>
        <label for="logDur">Duration (minutes)</label>
        <input id="logDur" type="number" min="1" value="30" />`,
      confirmLabel: 'Log',
      onConfirm: () => {
        const t = document.getElementById('logType')?.value || 'Activity';
        const d = document.getElementById('logDur')?.value || '30';
        showToast(`${t} · ${d} min logged`);
      },
    });
  });

  // ============== START WORKOUT ==============
  const startBtn = document.getElementById('startWorkoutBtn');
  let activeOverlay = null;
  function startActiveWorkout(name) {
    if (activeOverlay) activeOverlay.remove();
    const ov = document.createElement('div');
    ov.className = 'workout-active';
    ov.innerHTML = `
      <div class="wa-label">Now active</div>
      <div class="wa-name">${name}</div>
      <div class="wa-timer" id="waTimer">00:00</div>
      <div class="wa-meta">Target HR · zone 2 (60–70% max)</div>
      <button class="wa-end" id="waEnd">End workout</button>`;
    document.querySelector('.phone').appendChild(ov);
    activeOverlay = ov;
    let secs = 0;
    const t = document.getElementById('waTimer');
    const tick = setInterval(() => {
      secs += 1;
      const m = String(Math.floor(secs / 60)).padStart(2, '0');
      const s = String(secs % 60).padStart(2, '0');
      if (t) t.textContent = `${m}:${s}`;
    }, 1000);
    document.getElementById('waEnd')?.addEventListener('click', () => {
      clearInterval(tick);
      ov.remove();
      activeOverlay = null;
      showToast(`Workout ended · ${Math.floor(secs / 60)} min logged`);
    });
  }
  startBtn?.addEventListener('click', () => startActiveWorkout('Easy 5K — recovery pace'));

  // ============== SHARE ==============
  document.getElementById('shareBtn')?.addEventListener('click', async () => {
    const data = { title: 'Easy 5K — recovery pace', text: 'Check out this workout on Lark', url: location.href };
    if (navigator.share) {
      try { await navigator.share(data); return; } catch (_) { /* fallthrough */ }
    }
    openSheet({
      title: 'Share workout',
      bodyHTML: `<p>Send this workout to a friend or copy the link.</p>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:8px;">
          <button class="sheet-cancel" data-share="message">Message</button>
          <button class="sheet-cancel" data-share="email">Email</button>
          <button class="sheet-cancel" data-share="copy">Copy link</button>
        </div>`,
      confirmLabel: 'Done',
      cancelLabel: 'Close',
      onConfirm: () => showToast('Shared'),
    });
    sheetBody?.querySelectorAll('[data-share]').forEach((b) => {
      b.addEventListener('click', () => {
        const k = b.getAttribute('data-share');
        closeSheet();
        showToast(k === 'copy' ? 'Link copied' : `Opening ${k}…`);
      });
    });
  });

  // ============== ADJUST GOALS / SETTINGS ==============
  document.getElementById('adjustGoalsBtn')?.addEventListener('click', () => {
    openSheet({
      title: 'Adjust goals',
      bodyHTML: `
        <label for="gMove">Move calories / day</label>
        <input id="gMove" type="number" min="100" value="600" />
        <label for="gWk">Workouts / week</label>
        <input id="gWk" type="number" min="1" value="5" />
        <label for="gSleep">Sleep target (hours)</label>
        <input id="gSleep" type="number" step="0.5" min="4" value="7.5" />`,
      confirmLabel: 'Save',
      onConfirm: () => showToast('Goals updated'),
    });
  });

  function settingsSheet() {
    openSheet({
      title: 'Settings',
      bodyHTML: `<p>Preferences, accessibility, and account options.</p>
        <ul style="list-style:none;padding:0;margin:8px 0 0;">
          <li style="padding:10px 0;border-bottom:1px dashed var(--line);">Appearance · System</li>
          <li style="padding:10px 0;border-bottom:1px dashed var(--line);">Workout reminders · On</li>
          <li style="padding:10px 0;">Help &amp; feedback</li>
        </ul>`,
      confirmLabel: 'Done',
      cancelLabel: 'Close',
      onConfirm: () => showToast('Settings saved'),
    });
  }
  document.getElementById('wkSettings')?.addEventListener('click', settingsSheet);
  document.getElementById('profSettings')?.addEventListener('click', settingsSheet);

  // ============== PREFERENCES LIST ==============
  document.querySelectorAll('#prefList li').forEach((li) => {
    const open = () => {
      const name = li.getAttribute('data-pref') || 'Setting';
      openSheet({
        title: name,
        bodyHTML: `<p>${name} options would appear here in the full app. This is a fixture preview.</p>`,
        confirmLabel: 'Done',
        cancelLabel: 'Close',
        onConfirm: () => showToast(`${name} updated`),
      });
    };
    li.addEventListener('click', open);
    li.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
  });

  // ============== SIGN OUT ==============
  document.getElementById('signoutBtn')?.addEventListener('click', () => {
    openSheet({
      title: 'Sign out?',
      bodyHTML: '<p>You will need to sign in again to access your workouts and stats.</p>',
      confirmLabel: 'Sign out',
      onConfirm: () => showToast('Signed out (demo)'),
    });
  });

  // ============== ACTIVITY PERIOD SELECTOR ==============
  const periodSel = document.getElementById('periodSelect');
  const periodData = {
    '30':   { workouts: '23',  time: '14h',  distance: '128 mi', cal: '12,840' },
    'week': { workouts: '4',   time: '3h 12m', distance: '22 mi', cal: '2,140' },
    'year': { workouts: '186', time: '142h', distance: '1,420 mi', cal: '124,300' },
  };
  periodSel?.addEventListener('change', () => {
    const data = periodData[periodSel.value] || periodData['30'];
    document.querySelectorAll('.act-summary [data-stat]').forEach((el) => {
      const key = el.getAttribute('data-stat');
      el.textContent = data[key];
    });
    showToast(`Showing ${periodSel.options[periodSel.selectedIndex].text.toLowerCase()}`);
  });
})();
