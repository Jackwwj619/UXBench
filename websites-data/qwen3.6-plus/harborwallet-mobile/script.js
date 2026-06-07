// Harbor Wallet — mobile fixture interactions

(function () {
  // Live status-bar clock
  const sbTime = document.querySelector('.sb-time');
  function tick() {
    if (!sbTime) return;
    const d = new Date();
    let h = d.getHours();
    const m = d.getMinutes();
    const ap = h >= 12 ? '' : '';
    if (h > 12) h -= 12;
    if (h === 0) h = 12;
    sbTime.textContent = `${h}:${String(m).padStart(2, '0')}`;
  }
  tick(); setInterval(tick, 30000);

  // Tab + go-anywhere navigation
  function showScreen(name) {
    document.querySelectorAll('.screen').forEach((s) => s.classList.toggle('active', s.dataset.screen === name));
    document.querySelectorAll('.tab').forEach((t) => t.classList.toggle('active', t.dataset.go === name));
    // scroll active to top
    const active = document.querySelector('.screen.active');
    if (active) active.scrollTop = 0;
  }
  document.querySelectorAll('[data-go]').forEach((b) => {
    b.addEventListener('click', () => showScreen(b.dataset.go));
  });

  // SEND screen — amount entry via dialpad
  const AVAILABLE_BALANCE = 5820.16;
  let amtRaw = '0';
  let selectedRecipient = null;
  function fmtAmt() {
    const n = parseFloat(amtRaw) || 0;
    const numEl = document.getElementById('sendAmount');
    numEl.textContent = n.toLocaleString('en-US', { maximumFractionDigits: 2 });
    const fiat = document.querySelector('.amount-fiat');
    if (fiat) fiat.textContent = `≈ ${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`;
    updateSendValidity(n);
  }
  function updateSendValidity(n) {
    const cta = document.getElementById('sendCta');
    const err = document.getElementById('amountError');
    const numEl = document.getElementById('sendAmount');
    if (!cta) return;
    let msg = '';
    let invalid = false;
    if (n > AVAILABLE_BALANCE) {
      msg = `Insufficient funds — available $${AVAILABLE_BALANCE.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
      invalid = true;
    } else if (!selectedRecipient && n > 0) {
      msg = 'Choose a recipient to continue';
      invalid = true;
    } else if (n <= 0) {
      invalid = true;
    }
    if (err) err.textContent = msg;
    if (numEl) numEl.classList.toggle('over', n > AVAILABLE_BALANCE);
    cta.disabled = invalid;
    cta.setAttribute('aria-disabled', invalid ? 'true' : 'false');
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
      // limit to 2 decimals
      if (amtRaw.includes('.') && amtRaw.split('.')[1].length > 2) {
        amtRaw = amtRaw.slice(0, amtRaw.indexOf('.') + 3);
      }
      fmtAmt();
    });
  });
  document.querySelectorAll('.aq').forEach((b) => b.addEventListener('click', () => {
    if (b.dataset.amt === 'max') amtRaw = String(AVAILABLE_BALANCE);
    else amtRaw = b.dataset.amt;
    fmtAmt();
  }));
  document.querySelectorAll('.rec-recent').forEach((r) => r.addEventListener('click', () => {
    const name = r.dataset.recipient;
    if (name === 'more') return;
    const isAlready = r.getAttribute('aria-pressed') === 'true';
    document.querySelectorAll('.rec-recent').forEach((x) => x.setAttribute('aria-pressed', 'false'));
    if (!isAlready) {
      r.setAttribute('aria-pressed', 'true');
      selectedRecipient = name;
    } else {
      selectedRecipient = null;
    }
    updateSendValidity(parseFloat(amtRaw) || 0);
  }));
  document.getElementById('sendCta')?.addEventListener('click', (e) => {
    const cta = e.currentTarget;
    if (cta.disabled || cta.getAttribute('aria-disabled') === 'true') return;
    const n = parseFloat(amtRaw) || 0;
    alert(`Sending $${n.toFixed(2)} to ${selectedRecipient} (mock — fixture only).`);
  });
  // Initialize CTA disabled state
  updateSendValidity(0);

  // Profile list ripple
  document.querySelectorAll('.prof-list li').forEach((li) => {
    li.addEventListener('click', () => alert('Settings open (fixture only).'));
  });

  // QR data dots — generate seeded pseudo-random pattern
  const qrDots = document.getElementById('qrDots');
  if (qrDots) {
    let s = 17;
    function rng() { s = (s * 16807) % 2147483647; return s / 2147483647; }
    let g = '';
    for (let y = 2; y < 98; y += 4) {
      for (let x = 2; x < 98; x += 4) {
        // skip corner anchors
        if ((x < 26 && y < 26) || (x > 74 && y < 26) || (x < 26 && y > 74)) continue;
        // skip center logo box
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
