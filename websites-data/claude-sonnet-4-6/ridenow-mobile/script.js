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
  const origPrices = { now: '$17.40', comfort: '$22.20', xl: '$27.80', eco: '$18.90' };
  const names = { now: 'RideNow', comfort: 'Comfort', xl: 'XL', eco: 'Eco' };
  document.querySelectorAll('.veh').forEach((v) => {
    v.addEventListener('click', (e) => {
      e.stopPropagation();
      document.querySelectorAll('.veh').forEach((x) => x.classList.toggle('active', x === v));
      const key = v.dataset.v;
      const cb = document.querySelector('.confirm-btn');
      if (cb && prices[key]) {
        cb.innerHTML = `Confirm ${names[key]} · <span class="orig-price">${origPrices[key]}</span> <strong>${prices[key]}</strong> <span class="promo-tag">incl. promo</span>`;
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
  let toastTimer = null;
  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toastEl.hidden = true; }, 1800);
  }

  // Cancel ride confirmation modal
  const cancelBtn = document.getElementById('cancel-btn');
  const cancelModal = document.getElementById('cancelModal');
  const keepRide = document.getElementById('keepRide');
  const confirmCancel = document.getElementById('confirmCancel');
  cancelBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (cancelModal) cancelModal.hidden = false;
  });
  keepRide?.addEventListener('click', () => { if (cancelModal) cancelModal.hidden = true; });
  cancelModal?.addEventListener('click', (e) => {
    if (e.target === cancelModal) cancelModal.hidden = true;
  });
  confirmCancel?.addEventListener('click', () => {
    if (cancelModal) cancelModal.hidden = true;
    showScreen('receipt');
  });

  // Safety modal
  const safetyBtn = document.getElementById('safety-btn');
  const safetyModal = document.getElementById('safetyModal');
  const closeSafety = document.getElementById('closeSafety');
  safetyBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (safetyModal) safetyModal.hidden = false;
  });
  closeSafety?.addEventListener('click', () => { if (safetyModal) safetyModal.hidden = true; });
  safetyModal?.addEventListener('click', (e) => {
    if (e.target === safetyModal) safetyModal.hidden = true;
  });
  document.querySelectorAll('.safety-action').forEach((b) => {
    b.addEventListener('click', () => {
      if (safetyModal) safetyModal.hidden = true;
      showToast('Safety contact requested');
    });
  });

  // Share trip
  document.getElementById('share-trip-btn')?.addEventListener('click', () => {
    showToast('Trip link copied — share with friends');
  });

  // Chat stub
  document.getElementById('chat-btn')?.addEventListener('click', () => {
    showToast('Driver messaging — open chat');
  });

  // Hamburger drawer
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const closeDrawer = document.getElementById('closeDrawer');
  hamburgerBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (drawerOverlay) drawerOverlay.hidden = false;
  });
  closeDrawer?.addEventListener('click', () => { if (drawerOverlay) drawerOverlay.hidden = true; });
  drawerOverlay?.addEventListener('click', (e) => {
    if (e.target === drawerOverlay) drawerOverlay.hidden = true;
  });

  // Disabled tabs feedback
  document.querySelectorAll('.tab.tab-disabled').forEach((t) => {
    t.addEventListener('click', (e) => {
      e.stopPropagation();
      const label = t.querySelector('.tab-label')?.textContent || 'This';
      showToast(`${label} · coming soon`);
    });
  });

  // Saved-place cards (those with data-go are wired by the global handler;
  // ensure the +Add place button has feedback)
  document.querySelectorAll('.sv').forEach((b) => {
    if (!b.hasAttribute('data-go')) {
      b.addEventListener('click', () => showToast('Add a saved place'));
    }
  });

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
