// Harbor Wallet — mobile fixture interactions

(function () {
  // Live status-bar clock
  const sbTime = document.querySelector('.sb-time');
  function tick() {
    if (!sbTime) return;
    const d = new Date();
    let h = d.getHours();
    const m = d.getMinutes();
    if (h > 12) h -= 12;
    if (h === 0) h = 12;
    sbTime.textContent = `${h}:${String(m).padStart(2, '0')}`;
  }
  tick(); setInterval(tick, 30000);

  // Toast helper — preferred over alert() for non-blocking feedback
  const toastEl = document.getElementById('toast');
  let toastTimer = null;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 1800);
  }

  // Tab + go-anywhere navigation
  function showScreen(name) {
    document.querySelectorAll('.screen').forEach((s) => s.classList.toggle('active', s.dataset.screen === name));
    document.querySelectorAll('.tab').forEach((t) => t.classList.toggle('active', t.dataset.go === name));
    const active = document.querySelector('.screen.active');
    if (active) active.scrollTop = 0;
  }
  document.querySelectorAll('[data-go]').forEach((b) => {
    b.addEventListener('click', (e) => {
      e.preventDefault();
      showScreen(b.dataset.go);
    });
  });

  // SEND screen — amount entry via dialpad
  let amtRaw = '0';
  let selectedRecipient = null;
  const sendCta = document.getElementById('sendCta');
  function updateCtaState() {
    if (!sendCta) return;
    const n = parseFloat(amtRaw) || 0;
    const ready = n > 0 && selectedRecipient;
    sendCta.disabled = !ready;
    sendCta.textContent = selectedRecipient
      ? `Continue → ${selectedRecipient}`
      : 'Continue →';
  }
  function fmtAmt() {
    const n = parseFloat(amtRaw) || 0;
    document.getElementById('sendAmount').textContent = n.toLocaleString('en-US', { maximumFractionDigits: 2 });
    const fiat = document.querySelector('.amount-fiat');
    if (fiat) fiat.textContent = `≈ ${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`;
    updateCtaState();
  }
  document.querySelectorAll('.dp').forEach((b) => {
    b.addEventListener('click', () => {
      const ch = b.textContent.trim();
      if (b.hasAttribute('data-back')) {
        amtRaw = amtRaw.length > 1 ? amtRaw.slice(0, -1) : '0';
      } else if (ch === '.') {
        if (!amtRaw.includes('.')) amtRaw += '.';
      } else {
        if (amtRaw === '0') amtRaw = ch;
        else amtRaw += ch;
      }
      if (amtRaw.includes('.') && amtRaw.split('.')[1].length > 2) {
        amtRaw = amtRaw.slice(0, amtRaw.indexOf('.') + 3);
      }
      fmtAmt();
    });
  });
  document.querySelectorAll('.aq').forEach((b) => b.addEventListener('click', () => {
    if (b.dataset.amt === 'max') amtRaw = '5820.16';
    else amtRaw = b.dataset.amt;
    fmtAmt();
  }));

  // Recipient selection
  document.querySelectorAll('.rec-recent').forEach((r) => {
    r.addEventListener('click', () => {
      const name = r.dataset.recipient;
      if (name === 'More') {
        toast('More contacts (fixture only).');
        return;
      }
      document.querySelectorAll('.rec-recent').forEach((x) => x.classList.toggle('selected', x === r));
      selectedRecipient = name;
      updateCtaState();
      toast(`Recipient: ${name}`);
    });
  });

  sendCta?.addEventListener('click', () => {
    const n = parseFloat(amtRaw) || 0;
    if (n <= 0) { toast('Enter an amount.'); return; }
    if (!selectedRecipient) { toast('Pick a recipient.'); return; }
    toast(`Sending $${n.toFixed(2)} to ${selectedRecipient} (fixture).`);
  });
  updateCtaState();

  // Profile list — open settings panel (fixture)
  const settingsLabels = {
    personal: 'Personal info',
    security: 'Security & passkeys',
    linked: 'Linked cards & banks',
    currencies: 'Currencies & regions',
    statements: 'Statements & tax',
    support: 'Support',
    legal: 'Legal & privacy',
  };
  document.querySelectorAll('.pl-item').forEach((b) => {
    b.addEventListener('click', () => {
      const key = b.dataset.setting;
      const label = settingsLabels[key] || 'Setting';
      toast(`${label} (fixture only).`);
    });
  });

  // Sign out / settings gear / top up / swap / filter
  document.querySelector('.signout-btn')?.addEventListener('click', () => {
    toast('Signed out (fixture).');
  });
  document.querySelector('.settings-btn')?.addEventListener('click', () => {
    toast('Settings (fixture only).');
  });
  document.querySelectorAll('[data-action]').forEach((b) => {
    b.addEventListener('click', () => {
      const a = b.dataset.action;
      if (a === 'topup') toast('Top up (fixture only).');
      else if (a === 'swap') toast('Swap assets (fixture only).');
      else if (a === 'filter') toast('Filter activity (fixture only).');
    });
  });

  // Bell + head-action share + receive ⤴ — generic feedback so taps register
  document.querySelector('.icon-bell')?.addEventListener('click', () => toast('Notifications (fixture).'));

  // QR data dots
  const qrDots = document.getElementById('qrDots');
  if (qrDots) {
    let s = 17;
    function rng() { s = (s * 16807) % 2147483647; return s / 2147483647; }
    let g = '';
    for (let y = 2; y < 98; y += 4) {
      for (let x = 2; x < 98; x += 4) {
        if ((x < 26 && y < 26) || (x > 74 && y < 26) || (x < 26 && y > 74)) continue;
        if (x >= 38 && x <= 62 && y >= 38 && y <= 62) continue;
        if (rng() > 0.55) g += `<rect x="${x}" y="${y}" width="3" height="3"/>`;
      }
    }
    qrDots.innerHTML = g;
  }

  // Copy handle
  document.querySelector('.rh-copy')?.addEventListener('click', (e) => {
    navigator.clipboard?.writeText('@milena.harlowe').catch(() => {});
    const b = e.currentTarget;
    const t = b.textContent;
    b.textContent = '✓ Copied';
    setTimeout(() => { b.textContent = t; }, 1500);
  });

  // Receive tabs
  document.querySelectorAll('.rt-tab').forEach((t) => t.addEventListener('click', () => {
    document.querySelectorAll('.rt-tab').forEach((x) => x.classList.toggle('active', x === t));
  }));
})();
