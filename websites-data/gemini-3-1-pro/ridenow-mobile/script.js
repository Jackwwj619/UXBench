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
  let toastTimer = null;
  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2200);
  }

  // Navigation
  function showScreen(name) {
    document.querySelectorAll('.screen').forEach((s) => s.classList.toggle('active', s.dataset.screen === name));
    document.querySelectorAll('.tab').forEach((t) => t.classList.toggle('active', t.dataset.go === name));
    const active = document.querySelector('.screen.active');
    if (active) active.scrollTop = 0;
  }
  document.querySelectorAll('[data-go]').forEach((b) => b.addEventListener('click', (e) => {
    e.stopPropagation();
    // Special handling: cancel during tracking returns home with toast
    if (b.classList.contains('cancel')) {
      showScreen('home');
      showToast('Ride canceled');
      return;
    }
    showScreen(b.dataset.go);
  }));

  // Update route card destination (vehicle picker)
  const routeDest = document.getElementById('routeDest');
  const destInput = document.getElementById('destInput');
  function setDestination(name, addr) {
    if (routeDest) {
      const safeName = String(name || '').replace(/</g, '&lt;');
      const safeAddr = String(addr || '').replace(/</g, '&lt;');
      routeDest.innerHTML = `<strong>${safeName}</strong>${safeAddr ? ' · ' + safeAddr : ''}`;
    }
    if (destInput) destInput.value = name ? `${name}${addr ? ' · ' + addr : ''}` : '';
  }

  // Destination input → go to vehicles
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

  // Tag pill toggles on receipt (excluding the tip toggle which has its own behavior)
  document.querySelectorAll('.rt-pill').forEach((p) => {
    if (p.id === 'tipToggle') return;
    p.addEventListener('click', () => p.classList.toggle('active'));
  });

  // Quick destination buttons → set destination then go to vehicles
  document.querySelectorAll('.qd').forEach((b) => b.addEventListener('click', (e) => {
    e.stopPropagation();
    const name = b.dataset.name;
    const addr = b.dataset.dest;
    if (name) setDestination(name, addr);
    showScreen('vehicles');
  }));

  // Recent place rows → set destination then go to vehicles
  document.querySelectorAll('.recent-place').forEach((b) => {
    b.addEventListener('click', (e) => {
      e.stopPropagation();
      const name = b.dataset.name;
      const addr = b.dataset.dest;
      if (name) setDestination(name, addr);
      showScreen(b.dataset.go || 'vehicles');
    });
  });

  // Saved-grid buttons → set destination then go to vehicles
  document.querySelectorAll('.sv').forEach((b) => b.addEventListener('click', (e) => {
    e.stopPropagation();
    const name = b.dataset.name;
    const addr = b.dataset.dest;
    if (!name) return; // "+ Add place" has no data
    setDestination(name, addr);
    showScreen('vehicles');
  }));

  // Edit button → return to home (destination input view)
  document.querySelectorAll('.rt-edit').forEach((b) => b.addEventListener('click', (e) => {
    e.stopPropagation();
    showScreen('home');
    setTimeout(() => destInput?.focus({ preventScroll: true }), 60);
  }));

  // Tip panel toggle and selection
  const tipToggle = document.getElementById('tipToggle');
  const tipPanel = document.getElementById('tipPanel');
  const tipCustom = document.getElementById('tipCustom');
  const tipStatus = document.getElementById('tipStatus');
  if (tipToggle && tipPanel) {
    tipToggle.addEventListener('click', () => {
      const open = !tipPanel.hasAttribute('hidden');
      if (open) {
        tipPanel.setAttribute('hidden', '');
        tipToggle.setAttribute('aria-expanded', 'false');
        tipToggle.classList.remove('active');
      } else {
        tipPanel.removeAttribute('hidden');
        tipToggle.setAttribute('aria-expanded', 'true');
        tipToggle.classList.add('active');
      }
    });
  }
  document.querySelectorAll('.tip-amt').forEach((b) => {
    b.addEventListener('click', (e) => {
      e.stopPropagation();
      document.querySelectorAll('.tip-amt').forEach((x) => x.classList.toggle('active', x === b));
      const v = b.dataset.tip;
      if (v === 'custom') {
        if (tipCustom) {
          tipCustom.removeAttribute('hidden');
          tipCustom.focus();
        }
        if (tipStatus) tipStatus.textContent = '';
      } else {
        if (tipCustom) {
          tipCustom.setAttribute('hidden', '');
          tipCustom.value = '';
        }
        if (tipStatus) tipStatus.textContent = `$${Number(v).toFixed(2)} tip added — thanks!`;
      }
    });
  });
  tipCustom?.addEventListener('change', () => {
    const n = Number(tipCustom.value);
    if (n > 0 && tipStatus) tipStatus.textContent = `$${n.toFixed(2)} tip added — thanks!`;
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
