// RideNow — mobile fixture interactions

(function () {
  // Status-bar clock
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

  // Toast helper
  const toastEl = document.getElementById('toast');
  let toastTimer;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 1800);
  }

  // Sheet helpers
  const overlay = document.getElementById('overlay');
  function openSheet(id) {
    const sh = document.getElementById(id);
    if (!sh || !overlay) return;
    document.querySelectorAll('.sheet.show').forEach((s) => s.classList.remove('show'));
    sh.classList.add('show');
    sh.setAttribute('aria-hidden', 'false');
    overlay.classList.add('show');
  }
  function closeSheets() {
    document.querySelectorAll('.sheet.show').forEach((s) => { s.classList.remove('show'); s.setAttribute('aria-hidden', 'true'); });
    overlay?.classList.remove('show');
  }
  overlay?.addEventListener('click', closeSheets);
  document.querySelectorAll('[data-close-sheet]').forEach((b) => b.addEventListener('click', closeSheets));

  // Navigation
  function showScreen(name) {
    document.querySelectorAll('.screen').forEach((s) => s.classList.toggle('active', s.dataset.screen === name));
    document.querySelectorAll('.tab').forEach((t) => t.classList.toggle('active', t.dataset.go === name));
    const active = document.querySelector('.screen.active');
    if (active) active.scrollTop = 0;
    closeSheets();
  }
  document.querySelectorAll('[data-go]').forEach((b) => b.addEventListener('click', (e) => {
    e.stopPropagation();
    if (b.classList.contains('cta-rb')) {
      toast('Trip saved · Thanks for riding!');
      setTimeout(() => showScreen(b.dataset.go), 350);
      return;
    }
    showScreen(b.dataset.go);
  }));

  // Tabs without a destination → show a toast & set active state
  document.querySelectorAll('.tab[data-tab-toast]').forEach((t) => {
    t.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach((x) => x.classList.remove('active'));
      t.classList.add('active');
      toast(t.dataset.tabToast);
    });
  });

  // Top-bar icons
  document.getElementById('menuBtn')?.addEventListener('click', () => openSheet('menuSheet'));
  document.getElementById('bellBtn')?.addEventListener('click', () => openSheet('bellSheet'));
  document.getElementById('editBtn')?.addEventListener('click', () => openSheet('editSheet'));
  document.getElementById('addPlaceBtn')?.addEventListener('click', () => openSheet('addPlaceSheet'));
  document.getElementById('receiptShareBtn')?.addEventListener('click', () => openSheet('shareSheet'));

  // Destination input → go to vehicles
  const destInput = document.getElementById('destInput');
  destInput?.addEventListener('focus', () => {
    setTimeout(() => showScreen('vehicles'), 80);
  });

  // Vehicle picker selection
  const prices = { now: '$12.40', comfort: '$17.20', xl: '$22.80', eco: '$13.90' };
  const names = { now: 'RideNow', comfort: 'Comfort', xl: 'XL', eco: 'Eco' };
  document.querySelectorAll('.veh').forEach((v) => {
    v.addEventListener('click', (e) => {
      e.stopPropagation();
      document.querySelectorAll('.veh').forEach((x) => x.classList.toggle('active', x === v));
      const key = v.dataset.v;
      const cb = document.querySelector('.confirm-btn');
      if (cb && prices[key]) {
        cb.innerHTML = `Confirm ${names[key]} · <strong>${prices[key]}</strong>`;
      }
    });
  });

  // Receipt → star rating
  const rateStatus = document.getElementById('rateStatus');
  function showRateStatus(msg) {
    if (!rateStatus) return;
    rateStatus.textContent = msg;
    rateStatus.classList.add('show');
  }
  document.querySelectorAll('.rs').forEach((star, idx, all) => {
    star.addEventListener('click', () => {
      all.forEach((s, i) => s.classList.toggle('active', i <= idx));
      showRateStatus(`Rated ${idx + 1} star${idx ? 's' : ''} · saved`);
    });
  });
  // Pre-fill 5 stars
  document.querySelectorAll('.rs').forEach((s) => s.classList.add('active'));

  // Tag pill toggles on receipt
  document.querySelectorAll('.rt-pill').forEach((p) => p.addEventListener('click', () => {
    p.classList.toggle('active');
    const active = Array.from(document.querySelectorAll('.rt-pill.active')).map((x) => x.textContent.trim());
    showRateStatus(active.length ? `Selected: ${active.join(', ')}` : 'Tap a tag to add feedback');
  }));

  // Quick destination buttons → vehicles
  document.querySelectorAll('.qd').forEach((b) => b.addEventListener('click', () => showScreen('vehicles')));

  // Animate "driver moving" — periodically jitter the car icon on the tracking screen
  setInterval(() => {
    const trackingSvg = document.querySelector('.screen[data-screen="tracking"] svg');
    if (!trackingSvg) return;
    const car = trackingSvg.querySelector('g[transform^="translate(200 190)"]');
    if (!car) return;
    const dx = (Math.random() - 0.5) * 4;
    const dy = (Math.random() - 0.5) * 4;
    car.setAttribute('transform', `translate(${200 + dx} ${190 + dy}) rotate(${-30 + (Math.random() - 0.5) * 10})`);
  }, 1500);
})();
