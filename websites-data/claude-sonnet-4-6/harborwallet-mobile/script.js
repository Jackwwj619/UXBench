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
  const toast = document.getElementById('toast');
  let toastTimer = null;
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toast.hidden = true; }, 1800);
  }

  // Overlay helpers
  function openOverlay(id) {
    const el = document.getElementById(id);
    if (el) el.hidden = false;
  }
  function closeOverlay(el) { if (el) el.hidden = true; }
  document.querySelectorAll('.overlay').forEach((ov) => {
    ov.addEventListener('click', (e) => {
      if (e.target === ov || e.target.hasAttribute('data-close') || e.target.closest('[data-close]')) {
        closeOverlay(ov);
      }
    });
  });

  // Tab + go-anywhere navigation
  function showScreen(name) {
    document.querySelectorAll('.screen').forEach((s) => s.classList.toggle('active', s.dataset.screen === name));
    document.querySelectorAll('.tab').forEach((t) => t.classList.toggle('active', t.dataset.go === name));
    const active = document.querySelector('.screen.active');
    if (active) active.scrollTop = 0;
  }
  document.querySelectorAll('[data-go]').forEach((b) => {
    b.addEventListener('click', () => showScreen(b.dataset.go));
  });

  // Notification bell
  document.getElementById('bellBtn')?.addEventListener('click', () => {
    openOverlay('notifOverlay');
    // Mark read after open
    const badge = document.querySelector('.icon-bell span');
    if (badge) badge.style.display = 'none';
  });

  // Gear / settings
  document.getElementById('gearBtn')?.addEventListener('click', () => openOverlay('settingsOverlay'));

  // SEND screen — amount entry via dialpad
  let amtRaw = '0';
  const amountNum = document.getElementById('sendAmount');
  function flashAmount() {
    if (!amountNum) return;
    amountNum.classList.add('flash');
    setTimeout(() => amountNum.classList.remove('flash'), 220);
  }
  function fmtAmt() {
    const n = parseFloat(amtRaw) || 0;
    amountNum.textContent = n.toLocaleString('en-US', { maximumFractionDigits: 2 });
    const fiat = document.querySelector('.amount-fiat');
    if (fiat) fiat.textContent = `≈ ${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`;
  }
  document.querySelectorAll('.dp').forEach((b) => {
    b.addEventListener('click', () => {
      const ch = b.textContent.trim();
      if (b.hasAttribute('data-back')) {
        amtRaw = amtRaw.length > 1 ? amtRaw.slice(0, -1) : '0';
      } else if (ch === '.') {
        if (!amtRaw.includes('.')) amtRaw += '.';
      } else {
        // Reject if already 2 decimals
        if (amtRaw.includes('.') && amtRaw.split('.')[1].length >= 2) {
          flashAmount();
          showToast('Maximum 2 decimal places');
          return;
        }
        if (amtRaw === '0') amtRaw = ch;
        else amtRaw += ch;
      }
      fmtAmt();
    });
  });
  document.querySelectorAll('.aq').forEach((b) => b.addEventListener('click', () => {
    if (b.dataset.amt === 'max') amtRaw = '5820.16';
    else amtRaw = b.dataset.amt;
    fmtAmt();
  }));

  // SEND — recipient selection + filtering
  let selectedRecipient = null;
  const recipients = document.querySelectorAll('.rec-recent');
  recipients.forEach((r) => {
    if (r.querySelector('.rec-av.muted')) return; // skip "More"
    r.addEventListener('click', () => {
      recipients.forEach((x) => x.classList.remove('selected'));
      r.classList.add('selected');
      selectedRecipient = r.querySelector('.rec-name')?.textContent || null;
      const search = document.querySelector('.rec-search input');
      if (search) {
        search.value = selectedRecipient;
        search.classList.remove('error');
      }
      document.querySelector('.rec-search')?.classList.remove('error');
      removeHelper();
    });
  });

  const searchInput = document.querySelector('.rec-search input');
  searchInput?.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase();
    selectedRecipient = null;
    recipients.forEach((r) => r.classList.remove('selected'));
    let visible = 0;
    recipients.forEach((r) => {
      if (r.querySelector('.rec-av.muted')) return;
      const name = r.querySelector('.rec-name')?.textContent.toLowerCase() || '';
      const match = !q || name.includes(q);
      r.classList.toggle('hidden', !match);
      if (match) visible++;
    });
    // confirm if exactly one match equals query
    if (q) {
      const exact = Array.from(recipients).find((r) => {
        const n = r.querySelector('.rec-name')?.textContent.toLowerCase() || '';
        return n === q;
      });
      if (exact) {
        exact.classList.add('selected');
        selectedRecipient = exact.querySelector('.rec-name').textContent;
      }
    }
    removeHelper();
    document.querySelector('.rec-search')?.classList.remove('error');
  });

  function removeHelper() {
    document.querySelector('.rec-helper')?.remove();
  }

  document.getElementById('sendCta')?.addEventListener('click', () => {
    const n = parseFloat(amtRaw) || 0;
    const recBox = document.querySelector('.rec-search');
    removeHelper();
    if (n <= 0) {
      showToast('Enter an amount to send');
      flashAmount();
      return;
    }
    if (!selectedRecipient) {
      recBox?.classList.add('error');
      const helper = document.createElement('div');
      helper.className = 'rec-helper';
      helper.textContent = 'Please select a recipient to continue.';
      recBox?.parentNode?.appendChild(helper);
      showToast('Select a recipient');
      return;
    }
    document.getElementById('confirmTo').textContent = selectedRecipient;
    const amtStr = `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    document.getElementById('confirmAmt').textContent = amtStr;
    document.getElementById('confirmTotal').textContent = amtStr;
    openOverlay('confirmOverlay');
  });

  document.getElementById('confirmSend')?.addEventListener('click', () => {
    closeOverlay(document.getElementById('confirmOverlay'));
    showToast(`Sent to ${selectedRecipient || 'recipient'} ✓`);
    // Reset send screen
    amtRaw = '0'; fmtAmt();
    selectedRecipient = null;
    recipients.forEach((r) => r.classList.remove('selected'));
    if (searchInput) searchInput.value = '';
    showScreen('home');
  });

  // Profile list ripple
  document.querySelectorAll('.prof-list li').forEach((li) => {
    li.addEventListener('click', () => showToast('Settings open (fixture only)'));
  });

  // Sign out
  document.getElementById('signoutBtn')?.addEventListener('click', () => openOverlay('signoutOverlay'));
  document.getElementById('signoutConfirm')?.addEventListener('click', () => {
    closeOverlay(document.getElementById('signoutOverlay'));
    showToast('Signed out (fixture only)');
  });

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

  // Copy buttons (handle, bank fields, crypto)
  document.querySelectorAll('.rh-copy').forEach((b) => {
    b.addEventListener('click', (e) => {
      const text = b.dataset.copy || b.previousElementSibling?.textContent || '';
      navigator.clipboard?.writeText(text).catch(() => {});
      const orig = b.textContent;
      b.textContent = '✓ Copied';
      showToast('Copied to clipboard');
      setTimeout(() => { b.textContent = orig; }, 1500);
    });
  });

  // Receive tabs — switch panels
  document.querySelectorAll('.rt-tab').forEach((t) => t.addEventListener('click', () => {
    document.querySelectorAll('.rt-tab').forEach((x) => x.classList.toggle('active', x === t));
    const target = t.dataset.tab;
    document.querySelectorAll('.rt-panel').forEach((p) => p.classList.toggle('active', p.dataset.panel === target));
  }));

  // Crypto network switching
  const ethAddr = '0x7A3B49E2F8aB1cC12dD9e8a5e0fB3c4B8A2d1f1C2';
  const btcAddr = 'bc1q9h5xvk3p2u8m4r7t2gqx0f6sn5vw3ed8jypklm';
  document.querySelectorAll('.cn-pill').forEach((p) => p.addEventListener('click', () => {
    document.querySelectorAll('.cn-pill').forEach((x) => x.classList.toggle('active', x === p));
    const addrEl = document.getElementById('cryptoAddr');
    const copyEl = document.getElementById('cryptoCopy');
    const fineEl = document.getElementById('cryptoFine');
    if (p.dataset.net === 'btc') {
      addrEl.textContent = 'bc1q9h5x…ypklm';
      copyEl.dataset.copy = btcAddr;
      fineEl.textContent = 'Bitcoin deposits credit after 2 confirmations (~20 minutes).';
    } else {
      addrEl.textContent = '0x7A3B…f1C2';
      copyEl.dataset.copy = ethAddr;
      fineEl.textContent = 'Ethereum deposits credit after 12 confirmations (~3 minutes).';
    }
  }));

  // Share button (Receive screen)
  document.getElementById('shareBtn')?.addEventListener('click', async () => {
    const shareText = 'Pay me on Harbor Wallet: @milena.harlowe';
    if (navigator.share) {
      try { await navigator.share({ title: 'Harbor Wallet', text: shareText }); return; }
      catch (_) { /* fall through */ }
    }
    try { await navigator.clipboard.writeText(shareText); showToast('Link copied to clipboard'); }
    catch (_) { showToast('Sharing unavailable'); }
  });
  document.getElementById('sendLinkBtn')?.addEventListener('click', () => {
    navigator.clipboard?.writeText('https://harbor.app/pay/@milena.harlowe').catch(() => {});
    showToast('Payment link copied');
  });
  document.getElementById('saveImgBtn')?.addEventListener('click', () => showToast('QR image saved to Photos'));
})();
