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

  // ---------- Trip context (preserves destination, tier, fare across screens) ----------
  const tiers = {
    now:     { name: 'RideNow', price: '$12.40' },
    comfort: { name: 'Comfort', price: '$17.20' },
    xl:      { name: 'XL',      price: '$22.80' },
    eco:     { name: 'Eco',     price: '$13.90' },
  };
  const trip = {
    destName: 'Bella Suora',
    destAddr: '1142 NW Marshall',
    tierKey: 'now',
    canceled: false,
  };

  function fmtRouteTo() {
    return `<strong>${trip.destName}</strong> · ${trip.destAddr}`;
  }
  function applyTripToPicker() {
    const to = document.getElementById('routeTo');
    if (to) to.innerHTML = fmtRouteTo();
    const cb = document.querySelector('.confirm-btn');
    const t = tiers[trip.tierKey];
    if (cb && t) cb.innerHTML = `Confirm ${t.name} · <strong>${t.price}</strong>`;
    document.querySelectorAll('.veh').forEach((v) => v.classList.toggle('active', v.dataset.v === trip.tierKey));
  }
  function applyTripToTracking() {
    const meta = document.getElementById('trackingTripMeta');
    const t = tiers[trip.tierKey];
    if (meta && t) meta.textContent = `${t.name} · ${t.price} · to ${trip.destName}`;
  }
  function applyTripToReceipt() {
    const t = tiers[trip.tierKey];
    const to = document.getElementById('receiptTo');
    if (to) to.innerHTML = fmtRouteTo();
    const total = document.getElementById('receiptTotal');
    if (total && t) total.textContent = t.price;
    const billTotal = document.getElementById('billTotal');
    if (billTotal && t) billTotal.textContent = t.price;

    // Reset to completed state by default
    const hero = document.getElementById('receiptHero');
    const heroTitle = document.getElementById('heroTitle');
    const heroSub = document.getElementById('heroSub');
    const receiptTitle = document.getElementById('receiptTitle');
    const rateTitle = document.getElementById('rateTitle');
    const rateCard = document.getElementById('rateCard');
    const billList = document.getElementById('billList');
    const paymentLine = document.getElementById('paymentLine');
    const existingBanner = document.querySelector('.canceled-banner');
    if (existingBanner) existingBanner.remove();

    if (trip.canceled) {
      hero?.classList.add('canceled');
      if (heroTitle) heroTitle.textContent = 'Trip canceled';
      if (heroSub) heroSub.textContent = 'No charge — driver was notified.';
      if (receiptTitle) receiptTitle.textContent = 'Trip canceled';
      if (rateTitle) rateTitle.style.display = 'none';
      if (rateCard) rateCard.style.display = 'none';
      if (billList) billList.style.display = 'none';
      if (paymentLine) paymentLine.textContent = '💳 Visa · 4242 — not charged';
      // Insert canceled banner above trip-summary
      const banner = document.createElement('div');
      banner.className = 'canceled-banner';
      banner.innerHTML = '<span class="ic">⚠</span><span>You canceled this trip before pickup. No cancellation fee was applied.</span>';
      const summary = document.querySelector('.trip-summary');
      summary?.parentNode?.insertBefore(banner, summary);
    } else {
      hero?.classList.remove('canceled');
      if (heroTitle) heroTitle.textContent = "You're here!";
      if (heroSub) heroSub.textContent = 'Trip ID · RN-2026-05-13-08412';
      if (receiptTitle) receiptTitle.textContent = 'Trip complete';
      if (rateTitle) rateTitle.style.display = '';
      if (rateCard) rateCard.style.display = '';
      if (billList) billList.style.display = '';
      if (paymentLine) paymentLine.textContent = '💳 Visa · 4242 — charged on completion';
    }
  }

  // ---------- Navigation ----------
  function showScreen(name) {
    if (name === 'tracking') applyTripToTracking();
    if (name === 'receipt') applyTripToReceipt();
    if (name === 'vehicles') applyTripToPicker();
    if (name !== 'receipt') trip.canceled = false; // reset when leaving
    document.querySelectorAll('.screen').forEach((s) => s.classList.toggle('active', s.dataset.screen === name));
    document.querySelectorAll('.tab').forEach((t) => t.classList.toggle('active', t.dataset.go === name));
    const active = document.querySelector('.screen.active');
    if (active) active.scrollTop = 0;
  }
  document.querySelectorAll('[data-go]').forEach((b) => b.addEventListener('click', (e) => { e.stopPropagation(); showScreen(b.dataset.go); }));

  // Destination input → go to vehicles
  const destInput = document.getElementById('destInput');
  destInput?.addEventListener('focus', () => {
    const v = (destInput.value || '').trim();
    if (v) {
      trip.destName = v;
      trip.destAddr = 'Selected destination';
    }
    setTimeout(() => showScreen('vehicles'), 80);
  });

  // Vehicle picker selection
  document.querySelectorAll('.veh').forEach((v) => {
    v.addEventListener('click', (e) => {
      e.stopPropagation();
      document.querySelectorAll('.veh').forEach((x) => x.classList.toggle('active', x === v));
      const key = v.dataset.v;
      trip.tierKey = key;
      const cb = document.querySelector('.confirm-btn');
      const t = tiers[key];
      if (cb && t) cb.innerHTML = `Confirm ${t.name} · <strong>${t.price}</strong>`;
    });
  });

  // Quick destinations & saved → set destination, go to vehicles
  document.querySelectorAll('.qd, .sv, .recent-place').forEach((b) => {
    b.addEventListener('click', () => {
      const dest = b.dataset.dest;
      const addr = b.dataset.addr;
      if (dest) trip.destName = dest;
      if (addr) trip.destAddr = addr;
      if (dest) {
        showScreen('vehicles');
      } else if (b.classList.contains('sv') && (b.textContent || '').indexOf('Add place') !== -1) {
        toast('Add place — coming soon', '＋');
      }
    });
  });

  // Receipt → star rating
  document.querySelectorAll('.rs').forEach((star, idx, all) => {
    star.addEventListener('click', () => {
      all.forEach((s, i) => s.classList.toggle('active', i <= idx));
      toast(`Thanks — ${idx + 1} star${idx === 0 ? '' : 's'} submitted`);
    });
  });
  document.querySelectorAll('.rs').forEach((s) => s.classList.add('active'));

  // Tag pill toggles on receipt
  document.querySelectorAll('.rt-pill').forEach((p) => {
    if (p.id === 'tipBtn') return;
    p.addEventListener('click', () => {
      p.classList.toggle('active');
      toast(p.classList.contains('active') ? `Added: ${p.textContent}` : `Removed: ${p.textContent}`);
    });
  });

  // ---------- Modal & toast helpers ----------
  const modalRoot = document.getElementById('modalRoot');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const modalActions = document.getElementById('modalActions');
  const toastEl = document.getElementById('toast');
  let toastTimer;

  function openModal({ title, body, actions }) {
    modalTitle.textContent = title || '';
    modalBody.innerHTML = body || '';
    modalActions.innerHTML = '';
    (actions || []).forEach((a) => {
      const btn = document.createElement('button');
      btn.className = 'modal-btn ' + (a.kind || '');
      btn.textContent = a.label;
      btn.addEventListener('click', () => {
        if (a.handler) a.handler();
        if (!a.keepOpen) closeModal();
      });
      modalActions.appendChild(btn);
    });
    modalRoot.hidden = false;
  }
  function closeModal() { modalRoot.hidden = true; }
  modalRoot?.addEventListener('click', (e) => {
    if (e.target?.dataset?.close !== undefined) closeModal();
  });

  function toast(msg, icon) {
    if (!toastEl) return;
    toastEl.innerHTML = (icon ? `<span class="toast-ic">${icon}</span>` : '') + msg;
    toastEl.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toastEl.hidden = true; }, 2400);
  }

  // ---------- Cancel flow with confirmation ----------
  document.getElementById('cancelBtn')?.addEventListener('click', () => {
    openModal({
      title: 'Cancel this ride?',
      body: `
        <p>Rosa is on her way to pick you up. If you cancel now:</p>
        <ul class="info-list">
          <li><span class="ic">💳</span><div><strong>No fee</strong> — driver hasn't arrived yet (within 5 min grace)</div></li>
          <li><span class="ic">📨</span><div>Rosa will be notified and reassigned</div></li>
          <li><span class="ic">↩</span><div>You can request a new ride right after</div></li>
        </ul>`,
      actions: [
        { label: 'Keep ride', kind: '' },
        { label: 'Cancel ride', kind: 'danger', handler: () => {
            trip.canceled = true;
            toast('Ride canceled — no charge', '✅');
            showScreen('receipt');
          } },
      ],
    });
  });

  // ---------- Safety ----------
  document.getElementById('safetyBtn')?.addEventListener('click', () => {
    openModal({
      title: '🛡 Safety toolkit',
      body: `
        <ul class="info-list">
          <li><span class="ic">🚨</span><div><strong>Call 911</strong><div class="opt-sub">Connect to emergency services and share your live location</div></div></li>
          <li><span class="ic">🛟</span><div><strong>RideNow Safety Line</strong><div class="opt-sub">24/7 support specialist</div></div></li>
          <li><span class="ic">🧭</span><div><strong>Verify ride details</strong><div class="opt-sub">Plate 7XF·912 · Toyota Camry · Rosa C.</div></div></li>
          <li><span class="ic">📍</span><div><strong>Share live location</strong><div class="opt-sub">Send your trip to a trusted contact</div></div></li>
        </ul>`,
      actions: [
        { label: 'Close' },
        { label: 'Share live location', kind: 'primary', handler: () => toast('Live trip shared with Alex (saved contact)', '📍') },
      ],
    });
  });

  // ---------- Share trip ----------
  function shareTripModal() {
    openModal({
      title: '📍 Share trip',
      body: `
        <p>Send live trip status, route, and ETA to a contact. They'll get a link until drop-off.</p>
        <ul class="info-list">
          <li><span class="ic">👤</span><div><strong>Alex Park</strong><div class="opt-sub">+1 (503) 555-0142 · default contact</div></div></li>
          <li><span class="ic">👤</span><div><strong>Sam Lee</strong><div class="opt-sub">+1 (503) 555-0188</div></div></li>
          <li><span class="ic">📋</span><div><strong>Copy link</strong><div class="opt-sub">ridenow.app/t/RN-2026-05-13-08412</div></div></li>
        </ul>`,
      actions: [
        { label: 'Close' },
        { label: 'Share with Alex', kind: 'primary', handler: () => toast('Trip shared with Alex', '✅') },
      ],
    });
  }
  document.getElementById('shareTripBtn')?.addEventListener('click', shareTripModal);
  document.getElementById('headerShareBtn')?.addEventListener('click', shareTripModal);
  document.getElementById('receiptShareBtn')?.addEventListener('click', () => {
    openModal({
      title: 'Share receipt',
      body: `<p>Send a copy of this receipt to your email or a trusted contact.</p>
        <ul class="info-list">
          <li><span class="ic">✉</span><div><strong>Email</strong><div class="opt-sub">you@ridenow.app</div></div></li>
          <li><span class="ic">📋</span><div><strong>Copy link</strong></div></li>
        </ul>`,
      actions: [
        { label: 'Close' },
        { label: 'Email receipt', kind: 'primary', handler: () => toast('Receipt sent to your email', '✉') },
      ],
    });
  });

  // ---------- Message / Call driver ----------
  document.getElementById('msgBtn')?.addEventListener('click', () => {
    openModal({
      title: '💬 Message Rosa',
      body: `
        <p>Quick replies — tap to send.</p>
        <ul class="info-list" id="quickReplies">
          <li class="opt-row" data-msg="I'm coming out now."><span class="ic">🚶</span><div class="opt-meta"><div class="opt-name">I'm coming out now</div></div></li>
          <li class="opt-row" data-msg="Please wait — 2 min."><span class="ic">⏱</span><div class="opt-meta"><div class="opt-name">Please wait — 2 min</div></div></li>
          <li class="opt-row" data-msg="Pickup spot: by the side door."><span class="ic">📍</span><div class="opt-meta"><div class="opt-name">Pickup is by the side door</div></div></li>
        </ul>`,
      actions: [
        { label: 'Close' },
      ],
    });
    document.querySelectorAll('#quickReplies .opt-row').forEach((r) => {
      r.addEventListener('click', () => {
        toast('Message sent to Rosa', '💬');
        closeModal();
      });
    });
  });
  document.getElementById('callBtn')?.addEventListener('click', () => {
    openModal({
      title: '📞 Call Rosa Cabrera',
      body: `<p>Calls are placed through RideNow and your number stays private.</p>
        <ul class="info-list">
          <li><span class="ic">🔒</span><div>Number masked both ways</div></li>
          <li><span class="ic">🚗</span><div>Driver is 0.8 mi away</div></li>
        </ul>`,
      actions: [
        { label: 'Cancel' },
        { label: 'Call now', kind: 'primary', handler: () => toast('Calling Rosa…', '📞') },
      ],
    });
  });

  // ---------- Edit destination ----------
  document.getElementById('editBtn')?.addEventListener('click', () => {
    openModal({
      title: 'Edit destination',
      body: `
        <p>Choose a different drop-off:</p>
        <div id="destOptions">
          <div class="opt-row" data-name="Bella Suora" data-addr="1142 NW Marshall · Pearl District"><span class="ic">🍝</span><div class="opt-meta"><div class="opt-name">Bella Suora</div><div class="opt-sub">1142 NW Marshall · Pearl District</div></div><span class="opt-check">${trip.destName==='Bella Suora'?'✓':''}</span></div>
          <div class="opt-row" data-name="Powell's Books" data-addr="1005 W Burnside · Downtown"><span class="ic">📚</span><div class="opt-meta"><div class="opt-name">Powell's Books</div><div class="opt-sub">1005 W Burnside · Downtown</div></div><span class="opt-check">${trip.destName.indexOf("Powell")===0?'✓':''}</span></div>
          <div class="opt-row" data-name="Mt. Tabor Park" data-addr="SE 60th & Salmon"><span class="ic">🌲</span><div class="opt-meta"><div class="opt-name">Mt. Tabor Park</div><div class="opt-sub">SE 60th &amp; Salmon</div></div><span class="opt-check">${trip.destName==='Mt. Tabor Park'?'✓':''}</span></div>
          <div class="opt-row" data-name="PDX Airport" data-addr="7000 NE Airport Way · Terminal departures"><span class="ic">✈</span><div class="opt-meta"><div class="opt-name">PDX Airport</div><div class="opt-sub">7000 NE Airport Way · Terminal departures</div></div><span class="opt-check">${trip.destName==='PDX Airport'?'✓':''}</span></div>
        </div>`,
      actions: [
        { label: 'Close' },
      ],
    });
    document.querySelectorAll('#destOptions .opt-row').forEach((row) => {
      row.addEventListener('click', () => {
        trip.destName = row.dataset.name;
        trip.destAddr = row.dataset.addr;
        applyTripToPicker();
        toast(`Destination set to ${trip.destName}`, '📍');
        closeModal();
      });
    });
  });

  // ---------- Payment card / promo card sheets ----------
  document.getElementById('payCardBtn')?.addEventListener('click', () => {
    openModal({
      title: 'Payment method',
      body: `
        <div class="opt-row"><span class="ic">💳</span><div class="opt-meta"><div class="opt-name">Visa · 4242</div><div class="opt-sub">Default</div></div><span class="opt-check">✓</span></div>
        <div class="opt-row"><span class="ic">💳</span><div class="opt-meta"><div class="opt-name">Mastercard · 5588</div><div class="opt-sub">Personal</div></div></div>
        <div class="opt-row"><span class="ic">＋</span><div class="opt-meta"><div class="opt-name">Add payment method</div></div></div>`,
      actions: [{ label: 'Close', kind: 'primary' }],
    });
  });
  document.getElementById('promoCardBtn')?.addEventListener('click', () => {
    openModal({
      title: 'Promo code',
      body: `
        <p>Active promo: <strong>WEEKEND5</strong> — −$5.00 applied to this ride.</p>
        <div class="opt-row"><span class="ic">🎟</span><div class="opt-meta"><div class="opt-name">WEEKEND5</div><div class="opt-sub">−$5.00 · valid through Sun</div></div><span class="opt-check">✓</span></div>`,
      actions: [{ label: 'Close', kind: 'primary' }],
    });
  });

  // ---------- Tab bar: Payment, Account ----------
  document.getElementById('paymentTab')?.addEventListener('click', () => {
    // Visual selected state
    document.querySelectorAll('.tab').forEach((t) => t.classList.toggle('active', t.id === 'paymentTab'));
    openModal({
      title: 'Payment',
      body: `
        <p>Manage your payment methods, promos, and ride history charges.</p>
        <div class="opt-row"><span class="ic">💳</span><div class="opt-meta"><div class="opt-name">Visa · 4242</div><div class="opt-sub">Default</div></div><span class="opt-check">✓</span></div>
        <div class="opt-row"><span class="ic">🎟</span><div class="opt-meta"><div class="opt-name">Promos & credits</div><div class="opt-sub">1 active · WEEKEND5</div></div></div>
        <div class="opt-row"><span class="ic">📑</span><div class="opt-meta"><div class="opt-name">Recent charges</div><div class="opt-sub">Last: $12.40 · today</div></div></div>`,
      actions: [{ label: 'Close', kind: 'primary' }],
    });
  });
  document.getElementById('accountTab')?.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach((t) => t.classList.toggle('active', t.id === 'accountTab'));
    openModal({
      title: 'Account',
      body: `
        <div class="opt-row"><span class="ic">👤</span><div class="opt-meta"><div class="opt-name">Alex (you)</div><div class="opt-sub">+1 (503) 555-0001</div></div></div>
        <div class="opt-row"><span class="ic">⭐</span><div class="opt-meta"><div class="opt-name">Rider rating</div><div class="opt-sub">4.92</div></div></div>
        <div class="opt-row"><span class="ic">⚙</span><div class="opt-meta"><div class="opt-name">Settings</div></div></div>`,
      actions: [{ label: 'Close', kind: 'primary' }],
    });
  });

  // ---------- Menu / bell ----------
  document.getElementById('menuBtn')?.addEventListener('click', () => {
    openModal({
      title: '☰ Menu',
      body: `
        <div class="opt-row"><span class="ic">🚗</span><div class="opt-meta"><div class="opt-name">Ride</div></div></div>
        <div class="opt-row"><span class="ic">📋</span><div class="opt-meta"><div class="opt-name">Activity</div></div></div>
        <div class="opt-row"><span class="ic">💳</span><div class="opt-meta"><div class="opt-name">Payment</div></div></div>
        <div class="opt-row"><span class="ic">🛟</span><div class="opt-meta"><div class="opt-name">Help & safety</div></div></div>
        <div class="opt-row"><span class="ic">⚙</span><div class="opt-meta"><div class="opt-name">Settings</div></div></div>`,
      actions: [{ label: 'Close', kind: 'primary' }],
    });
  });
  document.getElementById('bellBtn')?.addEventListener('click', () => {
    openModal({
      title: '🔔 Notifications',
      body: `
        <div class="opt-row"><span class="ic">🎟</span><div class="opt-meta"><div class="opt-name">Promo WEEKEND5 active</div><div class="opt-sub">Ends Sunday · save $5</div></div></div>
        <div class="opt-row"><span class="ic">🚗</span><div class="opt-meta"><div class="opt-name">Last ride completed</div><div class="opt-sub">Yesterday · $12.40</div></div></div>
        <div class="opt-row"><span class="ic">✅</span><div class="opt-meta"><div class="opt-name">You're all caught up</div></div></div>`,
      actions: [{ label: 'Close', kind: 'primary' }],
    });
  });

  // ---------- Tip ----------
  document.getElementById('tipBtn')?.addEventListener('click', () => {
    openModal({
      title: 'Add a tip for Rosa',
      body: `
        <p>100% goes to your driver.</p>
        <div id="tipOpts">
          <div class="opt-row" data-tip="$2"><span class="ic">💵</span><div class="opt-meta"><div class="opt-name">$2</div></div></div>
          <div class="opt-row" data-tip="$3"><span class="ic">💵</span><div class="opt-meta"><div class="opt-name">$3</div><div class="opt-sub">Most riders</div></div></div>
          <div class="opt-row" data-tip="$5"><span class="ic">💵</span><div class="opt-meta"><div class="opt-name">$5</div></div></div>
          <div class="opt-row" data-tip="custom"><span class="ic">＋</span><div class="opt-meta"><div class="opt-name">Other amount</div></div></div>
        </div>`,
      actions: [{ label: 'Close' }],
    });
    document.querySelectorAll('#tipOpts .opt-row').forEach((row) => {
      row.addEventListener('click', () => {
        const tip = row.dataset.tip;
        const tipBtn = document.getElementById('tipBtn');
        if (tipBtn) {
          tipBtn.classList.add('active');
          tipBtn.textContent = tip === 'custom' ? '+ Tip added' : `Tip: ${tip}`;
        }
        toast(tip === 'custom' ? 'Tip added' : `Tip ${tip} added — thanks!`, '💵');
        closeModal();
      });
    });
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
