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

  // Navigation
  function showScreen(name) {
    document.querySelectorAll('.screen').forEach((s) => s.classList.toggle('active', s.dataset.screen === name));
    document.querySelectorAll('.tab').forEach((t) => t.classList.toggle('active', t.dataset.go === name));
    const active = document.querySelector('.screen.active');
    if (active) active.scrollTop = 0;
  }
  document.querySelectorAll('[data-go]').forEach((b) => b.addEventListener('click', (e) => { e.stopPropagation(); showScreen(b.dataset.go); }));

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
  document.querySelectorAll('.rs').forEach((star, idx, all) => {
    star.addEventListener('click', () => {
      all.forEach((s, i) => s.classList.toggle('active', i <= idx));
    });
  });
  // Pre-fill 5 stars
  document.querySelectorAll('.rs').forEach((s) => s.classList.add('active'));

  // Tag pill toggles on receipt
  document.querySelectorAll('.rt-pill').forEach((p) => p.addEventListener('click', () => p.classList.toggle('active')));

  // Quick destination buttons → vehicles
  document.querySelectorAll('.qd').forEach((b) => b.addEventListener('click', () => showScreen('vehicles')));

  // Toast helper
  const toastEl = document.getElementById('toast');
  let toastTimer;
  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2200);
  }

  // Disabled tabs (Payment / Account) — give clear feedback instead of silent dead end
  document.querySelectorAll('.tab.disabled').forEach((t) => {
    t.addEventListener('click', (e) => {
      e.stopPropagation();
      const label = t.dataset.soon || 'This';
      showToast(`${label} is coming soon`);
    });
  });

  // Add place — toast feedback
  document.querySelectorAll('[data-add-place]').forEach((b) => {
    b.addEventListener('click', () => showToast('Add place — coming soon'));
  });

  // Cancel-ride confirmation modal
  const cancelBtn = document.getElementById('cancelBtn');
  const cancelModal = document.getElementById('cancelModal');
  const keepRideBtn = document.getElementById('keepRideBtn');
  const confirmCancelBtn = document.getElementById('confirmCancelBtn');
  const reasonBtns = document.querySelectorAll('#cancelReasons button');
  function openCancelModal() { cancelModal?.classList.add('show'); }
  function closeCancelModal() { cancelModal?.classList.remove('show'); reasonBtns.forEach((r) => r.classList.remove('active')); }
  cancelBtn?.addEventListener('click', (e) => { e.stopPropagation(); openCancelModal(); });
  keepRideBtn?.addEventListener('click', (e) => { e.stopPropagation(); closeCancelModal(); showToast('Glad you\u2019re staying'); });
  reasonBtns.forEach((r) => r.addEventListener('click', () => {
    reasonBtns.forEach((x) => x.classList.toggle('active', x === r));
  }));
  confirmCancelBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    closeCancelModal();
    showToast('Ride cancelled');
    showScreen('receipt');
  });
  cancelModal?.addEventListener('click', (e) => { if (e.target === cancelModal) closeCancelModal(); });

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
