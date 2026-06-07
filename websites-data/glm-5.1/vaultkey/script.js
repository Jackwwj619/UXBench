// Vaultkey — pricing page interactivity

(function () {
  // ============== HASH-LINK FALLBACK (placeholder destinations) ==============
  // Surface visual feedback for placeholder '#' anchors so users aren't left wondering.
  function ensureToast() {
    let t = document.getElementById('vk-toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'vk-toast';
      t.className = 'vk-toast';
      t.setAttribute('role', 'status');
      t.setAttribute('aria-live', 'polite');
      document.body.appendChild(t);
    }
    return t;
  }
  function showToast(msg) {
    const t = ensureToast();
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._hide);
    t._hide = setTimeout(() => t.classList.remove('show'), 2400);
  }
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    const href = a.getAttribute('href');
    if (href === '#') {
      e.preventDefault();
      const label = (a.textContent || '').trim().replace(/\s+→$/, '');
      showToast(`${label || 'This page'} is coming soon — thanks for your patience.`);
    }
  });

  // ============== BILLING TOGGLE ==============
  const cycleBtns = document.querySelectorAll('.bt');
  let cycle = 'annual';
  function setCycle(c) {
    cycle = c;
    cycleBtns.forEach((b) => b.classList.toggle('active', b.dataset.cycle === c));

    // Personal stays $0 always
    const fam = document.querySelector('[data-family-annual]');
    if (fam) {
      const a = parseFloat(fam.dataset.familyAnnual);
      const m = parseFloat(fam.dataset.familyMonthly);
      fam.textContent = (c === 'annual' ? a : m).toFixed(2);
    }

    // Update billing-cycle note on Family card
    const famNote = document.querySelector('.plan.featured .price-note');
    if (famNote) {
      famNote.textContent = c === 'annual'
        ? 'Billed yearly · for the whole household'
        : 'Billed monthly · for the whole household';
    }

    // Per-seat business price differs slightly by cycle: monthly $6.99 base, annual $5.59 base
    recalcBusiness();
  }
  cycleBtns.forEach((b) => b.addEventListener('click', () => setCycle(b.dataset.cycle)));

  // ============== BUSINESS SEAT SLIDER ==============
  const slider = document.getElementById('seats');
  const num = document.getElementById('seatsNum');
  const seatLabel = document.getElementById('seatLabel');
  const tier = document.getElementById('seatTier');
  const perSeat = document.getElementById('bizPerSeat');
  const monthly = document.getElementById('bizMonthly');
  const yearly  = document.getElementById('bizYearly');

  // Tier pricing — monthly base prices, then annual cycle discount
  function tierFor(seats) {
    if (seats < 25)  return { name: '3–24 seats · standard rate',     basePerSeatMonthly: 6.99 };
    if (seats < 50)  return { name: '25–49 seats · 8% volume',         basePerSeatMonthly: 6.43 };
    if (seats < 100) return { name: '50–99 seats · 14% volume',        basePerSeatMonthly: 6.01 };
    if (seats < 200) return { name: '100–199 seats · 22% volume',      basePerSeatMonthly: 5.45 };
    return                   { name: '200 seats · talk to us for more', basePerSeatMonthly: 4.99 };
  }
  function fmt(n) { return '$' + n.toFixed(2); }

  function recalcBusiness() {
    if (!slider) return;
    const seats = parseInt(slider.value, 10);
    const t = tierFor(seats);
    const ps = cycle === 'annual' ? t.basePerSeatMonthly * 0.8 : t.basePerSeatMonthly;
    const m = ps * seats;
    const y = m * 12;
    if (perSeat) perSeat.textContent = ps.toFixed(2);
    if (monthly) monthly.textContent = fmt(m);
    if (yearly)  yearly.textContent  = fmt(y);
    if (seatLabel) seatLabel.textContent = `${seats} seat${seats === 1 ? '' : 's'}`;
    if (tier) tier.textContent = t.name;

    // Update billing-cycle row labels to match current toggle
    const bizYearLbl = document.getElementById('bizYearLbl');
    if (bizYearLbl) {
      bizYearLbl.textContent = cycle === 'annual'
        ? 'Per year (20% off applied)'
        : 'Per year (no discount)';
    }
  }
  function bindSlider() {
    slider?.addEventListener('input', () => {
      if (num) {
        num.value = slider.value;
        num.setAttribute('value', slider.value);
      }
      recalcBusiness();
    });
    const onNumChange = () => {
      const raw = parseInt(num.value || '3', 10);
      const v = Math.max(3, Math.min(200, isNaN(raw) ? 3 : raw));
      slider.value = String(v);
      slider.setAttribute('value', String(v));
      recalcBusiness();
    };
    num?.addEventListener('input', onNumChange);
    num?.addEventListener('change', () => {
      // Snap input to the clamped value when the user finishes editing.
      const raw = parseInt(num.value || '3', 10);
      const v = Math.max(3, Math.min(200, isNaN(raw) ? 3 : raw));
      num.value = String(v);
      num.setAttribute('value', String(v));
      recalcBusiness();
    });
  }
  bindSlider();
  recalcBusiness();
  setCycle('annual');

  // ============== COMPARISON TABLE ==============
  const Y = '<span class="yes">●</span>';
  const N = '<span class="no">—</span>';
  const cmp = [
    { group: 'Vault & sync' },
    ['Unlimited passwords & passkeys', Y, Y, Y],
    ['Devices', '1', 'Unlimited', 'Unlimited'],
    ['Browser extensions', Y, Y, Y],
    ['Native apps (macOS, Windows, Linux, iOS, Android)', Y, Y, Y],
    ['CLI for shells & CI', N, Y, Y],
    ['Offline access', Y, Y, Y],

    { group: 'Sharing' },
    ['Shared family vault (up to 6)', N, Y, N],
    ['Per-team shared vaults', N, N, Y],
    ['Per-item shares with expiry', N, Y, Y],
    ['Per-recipient access logs', N, N, Y],

    { group: 'Security' },
    ['End-to-end encryption (AES-256-GCM)', Y, Y, Y],
    ['Hardware key support (YubiKey, Solo, etc.)', Y, Y, Y],
    ['Dark-web monitoring', N, 'All members', 'All seats' ],
    ['Password health report', 'Basic', 'Per-member', 'Per-team rollup'],
    ['Encrypted file storage', N, '5 GB / member', '50 GB / seat'],

    { group: 'Admin & compliance' },
    ['SSO (SAML, OIDC, Okta, Entra)', N, N, Y],
    ['Directory sync (SCIM)', N, N, Y],
    ['Per-policy controls (vault scope, geofence, session)', N, N, Y],
    ['Audit log retention', N, '90 days', '12 months'],
    ['SIEM webhook (Splunk, Datadog, Sumo)', N, N, Y],
    ['SOC 2 / ISO 27001 reports', N, N, Y],

    { group: 'Support' },
    ['Help center & community', Y, Y, Y],
    ['Email support', N, '48 h reply', '12 h reply'],
    ['Priority + onboarding session', N, N, Y],
  ];
  const cmpBody = document.getElementById('cmpBody');
  if (cmpBody) {
    cmp.forEach((row) => {
      const tr = document.createElement('tr');
      if (row.group) {
        tr.className = 'group-row';
        const td = document.createElement('td'); td.colSpan = 4; td.textContent = row.group;
        tr.appendChild(td);
      } else {
        row.forEach((cell) => {
          const td = document.createElement('td'); td.innerHTML = cell;
          tr.appendChild(td);
        });
      }
      cmpBody.appendChild(tr);
    });
  }

  // ============== FAQ ==============
  const faqs = [
    ['What happens if I forget my master key?',
     "Your master key never leaves your device — Vaultkey can't recover it. That's the point. We do offer optional recovery contacts (Family) and a printable, signed recovery kit (Business) so you can re-derive access without us holding any of the secret."],
    ['Can I move my vault from another password manager?',
     'Yes. Vaultkey reads exports from 1Password, Bitwarden, LastPass, Dashlane, KeePass, Apple Keychain, and Chrome. The CLI also imports a CSV of any shape with a one-line schema map.'],
    ['Is the Personal plan really free forever?',
     "Yes — for one device. We don't ask for a card. If you want unlimited devices, file storage, or family sharing, that's Family at $3.99/month."],
    ['Do passkeys work everywhere?',
     'Anywhere a relying party (the website) supports WebAuthn. Vaultkey syncs the passkey across your devices, so you can use the same passkey on your laptop and phone.'],
    ['How does Business billing work?',
     "Per active seat per month. You can add seats anytime; we prorate. Removing seats takes effect at the end of the billing period. Volume discounts kick in automatically at 25, 50, 100, and 200 seats."],
    ['Where is my data stored?',
     'Your encrypted blob lives in either US (Oregon) or EU (Frankfurt) region — you choose at signup. Vaultkey only ever sees ciphertext.'],
    ['Can I self-host?',
     'Self-hosted Vaultkey is part of Enterprise. The clients are identical; you bring your own object store and the server runs as a single binary or container.'],
    ['What about audits?',
     'SOC 2 Type II audited annually (last completed 2025-10), and a public bug bounty since 2023. Reports are available under NDA from the security page.'],
  ];
  const faqList = document.getElementById('faqList');
  if (faqList) {
    faqs.forEach(([q, a], i) => {
      const item = document.createElement('div'); item.className = 'faq-item';
      const aId = `faq-a-${i}`;
      item.innerHTML = `<button class="faq-q" type="button" aria-expanded="false" aria-controls="${aId}"><span>${q}</span><span class="chev" aria-hidden="true">▼</span></button><div class="faq-a" id="${aId}" role="region">${a}</div>`;
      const btn = item.querySelector('.faq-q');
      const chev = item.querySelector('.chev');
      btn.addEventListener('click', () => {
        const open = item.classList.toggle('open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        if (chev) chev.textContent = open ? '▲' : '▼';
      });
      faqList.appendChild(item);
    });
    // Open first
    const first = faqList.firstElementChild;
    if (first) {
      first.classList.add('open');
      const fbtn = first.querySelector('.faq-q');
      const fchev = first.querySelector('.chev');
      if (fbtn) fbtn.setAttribute('aria-expanded', 'true');
      if (fchev) fchev.textContent = '▲';
    }
  }
})();
