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
  const toastEl = document.getElementById('appToast');
  let toastTimer = null;
  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2200);
  }

  // Modal helpers
  function openModal(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.add('open');
    el.setAttribute('aria-hidden', 'false');
  }
  function closeModal(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove('open');
    el.setAttribute('aria-hidden', 'true');
  }
  // Click outside modal closes it
  document.querySelectorAll('.modal-overlay').forEach((ov) => {
    ov.addEventListener('click', (e) => {
      if (e.target === ov) {
        ov.classList.remove('open');
        ov.setAttribute('aria-hidden', 'true');
      }
    });
  });

  // Cancel ride confirmation flow
  const cancelBtn = document.getElementById('cancelTripBtn');
  cancelBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    openModal('cancelModal');
  });
  document.getElementById('keepRideBtn')?.addEventListener('click', () => closeModal('cancelModal'));
  document.getElementById('confirmCancelBtn')?.addEventListener('click', () => {
    closeModal('cancelModal');
    showToast('Ride canceled');
    showScreen('receipt');
  });

  // Share trip
  document.getElementById('shareTripBtn')?.addEventListener('click', (e) => { e.stopPropagation(); openModal('shareModal'); });
  document.getElementById('closeShareBtn')?.addEventListener('click', () => closeModal('shareModal'));
  document.querySelectorAll('.share-target').forEach((b) => b.addEventListener('click', () => {
    closeModal('shareModal');
    showToast('Trip link shared');
  }));

  // Safety button feedback
  document.getElementById('safetyBtn')?.addEventListener('click', () => showToast('Safety tools opened'));

  // Add place modal
  document.getElementById('addPlaceBtn')?.addEventListener('click', (e) => { e.stopPropagation(); openModal('addPlaceModal'); });
  document.getElementById('closeAddPlaceBtn')?.addEventListener('click', () => closeModal('addPlaceModal'));
  document.getElementById('saveAddPlaceBtn')?.addEventListener('click', () => {
    const label = document.getElementById('apLabel')?.value?.trim();
    const addr = document.getElementById('apAddress')?.value?.trim();
    if (!label || !addr) { showToast('Add a label and address'); return; }
    closeModal('addPlaceModal');
    showToast(`Saved “${label}”`);
    document.getElementById('apLabel').value = '';
    document.getElementById('apAddress').value = '';
  });

  // Feedback chip toast on toggle (overrides simple toggle to provide feedback)
  document.querySelectorAll('.rt-pill').forEach((p) => p.addEventListener('click', () => {
    if (p.classList.contains('active')) {
      showToast(`“${p.textContent.trim()}” added`);
    }
  }));

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
