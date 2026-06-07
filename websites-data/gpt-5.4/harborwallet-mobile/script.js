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
  let toastTimer;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.hidden = false;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('show');
      setTimeout(() => { toastEl.hidden = true; }, 220);
    }, 1800);
  }

  // Tab + go-anywhere navigation. Tab highlight always derives from the
  // currently visible screen, never from the source of the tap.
  function showScreen(name) {
    const target = document.querySelector(`.screen[data-screen="${name}"]`);
    if (!target) return;
    document.querySelectorAll('.screen').forEach((s) => s.classList.toggle('active', s === target));
    document.querySelectorAll('.tab').forEach((t) => t.classList.toggle('active', t.dataset.go === name));
    target.scrollTop = 0;
  }
  document.querySelectorAll('[data-go]').forEach((b) => {
    b.addEventListener('click', () => showScreen(b.dataset.go));
  });

  // SEND screen — amount entry via dialpad
  let amtRaw = '0';
  let recipient = null;

  function fmtAmt() {
    const n = parseFloat(amtRaw) || 0;
    document.getElementById('sendAmount').textContent = n.toLocaleString('en-US', { maximumFractionDigits: 2 });
    const fiat = document.querySelector('.amount-fiat');
    if (fiat) fiat.textContent = `≈ ${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`;
    updateSendState();
  }

  function updateSendState() {
    const cta = document.getElementById('sendCta');
    const help = document.getElementById('ctaHelp');
    if (!cta) return;
    const n = parseFloat(amtRaw) || 0;
    const valid = n > 0 && recipient;
    cta.disabled = !valid;
    cta.setAttribute('aria-disabled', String(!valid));
    cta.classList.toggle('is-disabled', !valid);
    if (help) {
      if (n <= 0 && !recipient) help.textContent = 'Enter an amount and pick a recipient to continue.';
      else if (n <= 0) help.textContent = 'Enter an amount to continue.';
      else if (!recipient) help.textContent = `Pick a recipient to send $${n.toFixed(2)}.`;
      else help.textContent = `Ready to send $${n.toFixed(2)} to ${recipient}.`;
    }
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
    document.querySelectorAll('.aq').forEach((x) => x.classList.toggle('active', x === b));
    fmtAmt();
  }));

  // Recipient pick
  document.querySelectorAll('.rec-recent').forEach((r) => {
    r.addEventListener('click', () => {
      document.querySelectorAll('.rec-recent').forEach((x) => x.classList.toggle('selected', x === r));
      recipient = r.dataset.recipient || null;
      updateSendState();
    });
  });

  document.getElementById('sendCta')?.addEventListener('click', () => {
    const n = parseFloat(amtRaw) || 0;
    if (n <= 0 || !recipient) { updateSendState(); return; }
    toast(`Reviewing $${n.toFixed(2)} to ${recipient}…`);
  });

  updateSendState();

  // Profile list ripple
  document.querySelectorAll('.prof-list li').forEach((li) => {
    li.addEventListener('click', () => {
      const label = li.childNodes[1] && li.childNodes[1].textContent ? li.childNodes[1].textContent.trim() : 'Settings';
      toast(`${label} — coming soon`);
    });
  });

  // Header notification bell
  document.getElementById('bellBtn')?.addEventListener('click', () => toast('No new alerts since this morning'));
  // Top-up + Swap quick actions
  document.getElementById('topupBtn')?.addEventListener('click', () => toast('Top up — link a card or bank to add funds'));
  document.getElementById('swapBtn')?.addEventListener('click', () => toast('Swap — choose two assets to convert'));
  // Account header gear → opens Account list (already on screen) and pings settings entry
  document.getElementById('profileGear')?.addEventListener('click', () => toast('Settings live in the list below'));
  // Activity filter
  document.getElementById('activityFilter')?.addEventListener('click', () => toast('Filter by date, category, or account'));
  // Receive: send link / save image / share head action
  document.getElementById('sendLinkBtn')?.addEventListener('click', (e) => flashConfirm(e.currentTarget, '✓ Link copied'));
  document.getElementById('saveImageBtn')?.addEventListener('click', (e) => flashConfirm(e.currentTarget, '✓ Saved to Photos'));
  document.querySelector('.screen[data-screen="receive"] .head-action')?.addEventListener('click', () => toast('Share via system sheet'));
  document.querySelector('.screen[data-screen="send"] .head-action')?.addEventListener('click', () => toast('Open camera to scan a QR'));

  function flashConfirm(btn, text) {
    if (!btn) return;
    if (btn.dataset.busy === '1') return;
    btn.dataset.busy = '1';
    const t = btn.textContent;
    btn.textContent = text;
    btn.classList.add('confirmed');
    setTimeout(() => {
      btn.textContent = t;
      btn.classList.remove('confirmed');
      delete btn.dataset.busy;
    }, 1500);
  }

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
    navigator.clipboard?.writeText('@milena.harlowe').catch(() => {});
    flashConfirm(e.currentTarget, '✓ Copied');
  });

  // Receive tabs — switch content blurb to clarify state
  const receiveContext = {
    'In-app': { handle: '@milena.harlowe', label: 'Your handle', note: 'Funds you receive land in your USD wallet instantly.' },
    'Bank':   { handle: '****-7421', label: 'Routing · last 4', note: 'ACH transfers post in 1–3 business days. Wires same day.' },
    'Crypto': { handle: 'bc1q…hr0t', label: 'BTC address', note: 'Crypto deposits take 12 confirmations (~120 minutes).' }
  };
  document.querySelectorAll('.rt-tab').forEach((t) => t.addEventListener('click', () => {
    document.querySelectorAll('.rt-tab').forEach((x) => x.classList.toggle('active', x === t));
    const ctx = receiveContext[t.textContent.trim()];
    if (ctx) {
      const card = document.querySelector('.rec-handle');
      if (card) {
        card.querySelector('.rh-label').textContent = ctx.label;
        card.querySelector('strong').textContent = ctx.handle;
      }
      const fine = document.querySelector('.rec-fine');
      if (fine) fine.textContent = ctx.note;
    }
  }));

  // Activity filter tabs
  function applyActivityFilter(kind) {
    const list = document.querySelector('.activity-list');
    if (!list) return;
    let visible = 0;
    list.querySelectorAll('.tx').forEach((row) => {
      const match = kind === 'all' || row.dataset.kind === kind;
      row.style.display = match ? '' : 'none';
      if (match) visible++;
    });
    // hide day headers whose group is empty
    const children = Array.from(list.children);
    children.forEach((el, i) => {
      if (!el.classList.contains('act-day')) return;
      let any = false;
      for (let j = i + 1; j < children.length; j++) {
        const n = children[j];
        if (n.classList.contains('act-day')) break;
        if (n.style.display !== 'none') { any = true; break; }
      }
      el.style.display = any ? '' : 'none';
    });
    const empty = document.getElementById('actEmpty');
    if (empty) empty.hidden = visible !== 0;
  }
  document.querySelectorAll('.at-tab').forEach((t) => t.addEventListener('click', () => {
    document.querySelectorAll('.at-tab').forEach((x) => x.classList.toggle('active', x === t));
    applyActivityFilter(t.dataset.filter);
  }));
  document.querySelector('.ae-cta')?.addEventListener('click', () => {
    const all = document.querySelector('.at-tab[data-filter="all"]');
    if (all) all.click();
  });
  // Activity rows give feedback on tap
  document.querySelectorAll('.activity-list .tx').forEach((row) => {
    row.addEventListener('click', () => {
      const name = row.querySelector('.tx-name')?.textContent || 'Transaction';
      toast(`${name.split(' · ')[0]} — details (fixture)`);
    });
  });

  // Sign out sheet
  const sheet = document.getElementById('signoutSheet');
  function openSheet() { if (sheet) { sheet.hidden = false; requestAnimationFrame(() => sheet.classList.add('open')); } }
  function closeSheet() {
    if (!sheet) return;
    sheet.classList.remove('open');
    setTimeout(() => { sheet.hidden = true; }, 220);
  }
  document.getElementById('signoutBtn')?.addEventListener('click', openSheet);
  document.querySelectorAll('[data-sheet-close]').forEach((el) => el.addEventListener('click', closeSheet));
  document.getElementById('signoutConfirm')?.addEventListener('click', () => {
    closeSheet();
    toast('Signed out (fixture)');
  });
})();
