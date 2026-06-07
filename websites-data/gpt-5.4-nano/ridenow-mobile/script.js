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

  // Toast
  const toastEl = document.getElementById('toast');
  let toastTimer;
  function showToast(msg) {
    if (!toastEl || !msg) return;
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 1800);
  }
  document.querySelectorAll('[data-toast]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      showToast(el.dataset.toast);
    });
  });

  // Navigation
  function showScreen(name) {
    document.querySelectorAll('.screen').forEach((s) => s.classList.toggle('active', s.dataset.screen === name));
    document.querySelectorAll('.tab').forEach((t) => t.classList.toggle('active', t.dataset.go === name));
    const active = document.querySelector('.screen.active');
    if (active) active.scrollTop = 0;
  }
  document.querySelectorAll('[data-go]').forEach((b) => b.addEventListener('click', (e) => {
    e.stopPropagation();
    if (b.dataset.saved) {
      // Update destination pill in route card
      const dest = document.querySelector('.route-points .rp:nth-child(2) .rp-place');
      if (dest) dest.innerHTML = `<strong>${b.dataset.saved}</strong> · saved place`;
      showToast(`Selected ${b.dataset.saved}`);
    }
    showScreen(b.dataset.go);
  }));

  // Tabs without dedicated screens (Payment, Account) — give explicit feedback
  document.querySelectorAll('.tab[data-tab]').forEach((t) => {
    t.addEventListener('click', (e) => {
      e.stopPropagation();
      // Visual selected state
      document.querySelectorAll('.tab').forEach((x) => x.classList.remove('active'));
      t.classList.add('active');
      const label = t.dataset.tab === 'payment' ? 'Payment' : 'Account';
      // If a bottom-sheet overlay is open in the home screen, hint to close it
      const homeSheet = document.querySelector('.screen.active[data-screen="home"] .bottom-sheet');
      if (homeSheet) {
        showToast(`${label} — close places to continue`);
      } else {
        showToast(`${label} · coming soon`);
      }
    });
  });

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
      showToast(`Rated ${idx + 1} star${idx === 0 ? '' : 's'}`);
    });
  });
  // Pre-fill 5 stars
  document.querySelectorAll('.rs').forEach((s) => s.classList.add('active'));

  // Tag pill toggles on receipt
  document.querySelectorAll('.rt-pill').forEach((p) => p.addEventListener('click', () => {
    const wasActive = p.classList.contains('active');
    p.classList.toggle('active');
    showToast(wasActive ? 'Removed' : `Added: ${p.textContent.replace(/^✓\s*/, '').trim()}`);
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
