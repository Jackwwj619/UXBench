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

  // Toast helper
  const toastEl = document.getElementById('toast');
  let toastTimer = null;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.hidden = false;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('show');
      setTimeout(() => { toastEl.hidden = true; }, 250);
    }, 1800);
  }

  // Tab + go-anywhere navigation
  function showScreen(name) {
    document.querySelectorAll('.screen').forEach((s) => s.classList.toggle('active', s.dataset.screen === name));
    document.querySelectorAll('.tab').forEach((t) => t.classList.toggle('active', t.dataset.go === name));
    const active = document.querySelector('.screen.active');
    if (active) active.scrollTop = 0;
    // hide send error when leaving send screen
    if (name !== 'send') {
      const err = document.getElementById('sendError');
      if (err) err.hidden = true;
    }
  }
  document.querySelectorAll('[data-go]').forEach((b) => {
    b.addEventListener('click', () => showScreen(b.dataset.go));
  });

  // SEND screen — amount entry via dialpad
  let amtRaw = '0';
  function fmtAmt() {
    const display = document.getElementById('sendAmount');
    const fiat = document.querySelector('.amount-fiat');
    // Preserve trailing decimal point and partial cents during entry
    let shown = amtRaw;
    if (amtRaw.includes('.')) {
      const [intPart, fracPart = ''] = amtRaw.split('.');
      const intNum = parseInt(intPart || '0', 10).toLocaleString('en-US');
      shown = intNum + '.' + fracPart;
    } else {
      shown = (parseInt(amtRaw, 10) || 0).toLocaleString('en-US');
    }
    if (display) display.textContent = shown;
    const n = parseFloat(amtRaw) || 0;
    if (fiat) fiat.textContent = `≈ ${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`;
  }
  document.querySelectorAll('.dp').forEach((b) => {
    b.addEventListener('click', () => {
      const ch = b.textContent.trim();
      if (b.hasAttribute('data-back')) {
        amtRaw = amtRaw.length > 1 ? amtRaw.slice(0, -1) : '0';
      } else if (ch === '.') {
        if (!amtRaw.includes('.')) amtRaw = amtRaw + '.';
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
    if (b.dataset.amt === 'max') amtRaw = '5820.16';
    else amtRaw = b.dataset.amt;
    fmtAmt();
  }));

  // Recipient selection
  let selectedRecipient = null;
  document.querySelectorAll('.rec-recent').forEach((r) => {
    r.addEventListener('click', () => {
      if (!r.dataset.handle) { toast('More contacts (fixture only).'); return; }
      document.querySelectorAll('.rec-recent').forEach((x) => x.classList.toggle('selected', x === r));
      selectedRecipient = { name: r.dataset.name, handle: r.dataset.handle };
      const err = document.getElementById('sendError');
      if (err) err.hidden = true;
    });
  });

  // Recipient search filter
  const recSearch = document.getElementById('recSearch');
  const recEmpty = document.getElementById('recEmpty');
  if (recSearch) {
    recSearch.addEventListener('input', () => {
      const q = recSearch.value.trim().toLowerCase();
      let anyVisible = false;
      document.querySelectorAll('.rec-recent').forEach((r) => {
        const name = (r.dataset.name || '').toLowerCase();
        const handle = (r.dataset.handle || '').toLowerCase();
        const isMore = !r.dataset.handle;
        const match = !q || name.includes(q) || handle.includes(q);
        const show = q ? (match && !isMore) : true;
        r.style.display = show ? '' : 'none';
        if (show && !isMore) anyVisible = true;
      });
      if (recEmpty) recEmpty.hidden = !(q && !anyVisible);
    });
  }

  document.getElementById('sendCta')?.addEventListener('click', () => {
    const n = parseFloat(amtRaw) || 0;
    const err = document.getElementById('sendError');
    if (n <= 0) {
      if (err) {
        err.textContent = 'Enter an amount greater than $0.';
        err.hidden = false;
      }
      return;
    }
    if (!selectedRecipient) {
      if (err) {
        err.textContent = 'Please select a recipient.';
        err.hidden = false;
      }
      return;
    }
    if (err) err.hidden = true;
    toast(`Sent $${n.toFixed(2)} to ${selectedRecipient.handle}`);
  });

  // Profile list ripple
  document.querySelectorAll('.prof-list li').forEach((li) => {
    li.addEventListener('click', () => toast('Settings open (fixture only).'));
  });

  // QR data dots — generate seeded pseudo-random pattern
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
    const handle = document.getElementById('recHandleValue')?.textContent || '@milena.harlowe';
    navigator.clipboard?.writeText(handle).catch(() => {});
    const b = e.currentTarget;
    const t = b.textContent;
    b.textContent = '✓ Copied';
    toast(`Copied ${handle} to clipboard`);
    setTimeout(() => { b.textContent = t; }, 1500);
  });

  // Receive tabs — switch content
  const handleValue = document.getElementById('recHandleValue');
  const handleLabel = document.querySelector('#recHandle .rh-label');
  const recBank = document.getElementById('recBankDetails');
  const recHandle = document.getElementById('recHandle');
  const recFine = document.getElementById('recFine');
  const tabContent = {
    inapp: {
      label: 'Your handle',
      handle: '@milena.harlowe',
      fine: 'Funds you receive land in your USD wallet instantly. Crypto deposits take 12 confirmations (~120 minutes).',
      showBank: false,
    },
    bank: {
      label: 'Account name',
      handle: 'Milena Harlowe',
      fine: 'ACH transfers usually arrive in 1–3 business days. Wire transfers settle the same day.',
      showBank: true,
    },
    crypto: {
      label: 'BTC deposit address',
      handle: 'bc1qhrbr8m4xph2zd3vey7tt9w0c3y4uy0p9nf2s5q',
      fine: 'Send only Bitcoin (BTC) to this address. Deposits take 12 confirmations (~120 minutes).',
      showBank: false,
    },
  };
  document.querySelectorAll('.rt-tab').forEach((t) => t.addEventListener('click', () => {
    document.querySelectorAll('.rt-tab').forEach((x) => x.classList.toggle('active', x === t));
    const key = t.dataset.rt || 'inapp';
    const c = tabContent[key];
    if (!c) return;
    if (handleLabel) handleLabel.textContent = c.label;
    if (handleValue) {
      handleValue.textContent = c.handle;
      handleValue.classList.toggle('mono', key === 'crypto');
    }
    if (recFine) recFine.textContent = c.fine;
    if (recBank) recBank.hidden = !c.showBank;
    if (recHandle) recHandle.hidden = c.showBank;
  }));

  // Receive share buttons
  document.querySelectorAll('.rs-btn').forEach((b) => b.addEventListener('click', () => {
    const kind = b.dataset.share;
    if (kind === 'link') toast('Payment link copied — ready to share.');
    else if (kind === 'image') toast('QR image saved to Photos.');
  }));

  // Receive header share button (⤴) and Send screen QR scan
  document.querySelectorAll('.head-action').forEach((b) => {
    b.addEventListener('click', () => {
      const txt = b.textContent.trim();
      if (txt === 'QR') toast('QR scanner opening (fixture only).');
      else if (txt === '⤴') toast('Share sheet opened (fixture only).');
      else if (txt === '⚙') toast('Settings (fixture only).');
      else if (txt === 'Filter') toast('Filters (fixture only).');
    });
  });

  // Notification bell
  document.querySelector('.icon-bell')?.addEventListener('click', () => toast('3 new notifications.'));

  // Sign out
  document.querySelector('.signout-btn')?.addEventListener('click', () => toast('Signed out (fixture only).'));
})();
