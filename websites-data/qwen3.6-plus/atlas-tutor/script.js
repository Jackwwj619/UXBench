// Atlas Tutor — chat fixture interactions

(function () {
  // ============== AUTOGROW COMPOSER ==============
  const composer = document.getElementById('composer');
  const sendBtn = document.getElementById('sendBtn');
  function autoGrow() {
    if (!composer) return;
    composer.style.height = 'auto';
    composer.style.height = Math.min(200, composer.scrollHeight) + 'px';
  }
  composer?.addEventListener('input', autoGrow);
  composer?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      submit();
    }
  });

  function submit() {
    const text = (composer?.value || '').trim();
    if (!text) return;
    // Append a new user message
    const messages = document.getElementById('messages');
    if (!messages) return;
    const art = document.createElement('article');
    art.className = 'msg msg-user';
    art.innerHTML = `<div class="msg-row"><span class="msg-av">SA</span><div class="msg-body"><p>${escapeHtml(text)}</p></div></div>`;
    messages.appendChild(art);

    // Append a "thinking" bot message
    const bot = document.createElement('article');
    bot.className = 'msg msg-bot';
    bot.innerHTML = `<div class="msg-row"><span class="msg-av msg-av-bot">A</span><div class="msg-body"><p><em>Thinking…</em></p></div></div>`;
    messages.appendChild(bot);

    composer.value = '';
    autoGrow();
    setTimeout(() => messages.scrollTo({ top: messages.scrollHeight, behavior: 'smooth' }), 30);

    setTimeout(() => {
      bot.querySelector('.msg-body').innerHTML = `<p>Got it — I'd start by identifying the layers. For something like <code>${escapeHtml(text)}</code>, write out the outer and inner functions, derive each, and stack with the chain rule. Open practice problem #${1 + Math.floor(Math.random() * 6)} on the right and try this same recipe.</p>`;
      messages.scrollTo({ top: messages.scrollHeight, behavior: 'smooth' });
    }, 800);
  }
  sendBtn?.addEventListener('click', submit);

  // ============== SUGGEST CHIPS ==============
  document.querySelectorAll('.cs').forEach((b) => b.addEventListener('click', () => {
    composer.value = b.textContent;
    autoGrow(); composer.focus();
  }));

  // ============== TOAST ==============
  const toastEl = document.getElementById('toast');
  let toastTimer;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.hidden = false;
    requestAnimationFrame(() => toastEl.classList.add('show'));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('show');
      setTimeout(() => { toastEl.hidden = true; }, 220);
    }, 1800);
  }

  // ============== STEP MODE TOGGLE ==============
  const stepBtn = document.getElementById('stepBtn');
  stepBtn?.addEventListener('click', () => {
    const on = stepBtn.classList.toggle('on');
    stepBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
    stepBtn.textContent = on ? '⌥ Steps · On' : '⌥ Steps';
    toast(on ? 'Step-by-step mode on' : 'Step-by-step mode off');
  });

  // ============== SETTINGS MODAL ==============
  const settingsModal = document.getElementById('settingsModal');
  const settingsBtn = document.getElementById('settingsBtn');
  const settingsClose = document.getElementById('settingsClose');
  const moreBtn = document.getElementById('moreBtn');
  function openSettings() {
    if (!settingsModal) return;
    settingsModal.hidden = false;
    settingsModal.setAttribute('aria-hidden', 'false');
    settingsClose?.focus();
  }
  function closeSettings() {
    if (!settingsModal) return;
    settingsModal.hidden = true;
    settingsModal.setAttribute('aria-hidden', 'true');
  }
  settingsBtn?.addEventListener('click', openSettings);
  moreBtn?.addEventListener('click', openSettings);
  settingsClose?.addEventListener('click', closeSettings);
  settingsModal?.addEventListener('click', (e) => {
    if (e.target === settingsModal) closeSettings();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (!settingsModal?.hidden) closeSettings();
      if (!practiceSheet?.hidden) closeSheet();
    }
  });

  // ============== MOBILE PRACTICE SHEET ==============
  const practiceBtn = document.getElementById('practiceBtn');
  const practiceSheet = document.getElementById('practiceSheet');
  const sheetBody = document.getElementById('sheetBody');
  const sheetClose = document.getElementById('sheetClose');
  const practiceList = document.getElementById('practiceList');
  function openSheet() {
    if (!practiceSheet || !sheetBody || !practiceList) return;
    // On wide screens, just scroll to right rail; on mobile, open sheet
    if (window.matchMedia('(max-width: 1024px)').matches) {
      sheetBody.appendChild(practiceList);
      practiceSheet.hidden = false;
      practiceSheet.setAttribute('aria-hidden', 'false');
    } else {
      practiceList.scrollIntoView({ behavior: 'smooth', block: 'start' });
      toast('Practice problems →');
    }
  }
  function closeSheet() {
    if (!practiceSheet || !practiceList) return;
    // Move list back to right rail
    const rightRail = document.querySelector('.right-rail');
    const firstCard = rightRail?.querySelector('.rr-card');
    if (rightRail && firstCard) rightRail.insertBefore(practiceList, firstCard);
    else if (rightRail) rightRail.appendChild(practiceList);
    practiceSheet.hidden = true;
    practiceSheet.setAttribute('aria-hidden', 'true');
  }
  practiceBtn?.addEventListener('click', openSheet);
  sheetClose?.addEventListener('click', closeSheet);
  practiceSheet?.addEventListener('click', (e) => {
    if (e.target === practiceSheet) closeSheet();
  });

  // ============== PRACTICE INTERACTIONS ==============
  document.querySelectorAll('.pr-input').forEach((b) => {
    b.addEventListener('click', () => {
      const li = b.closest('.prac');
      if (!li) return;
      const cur = li.dataset.state;
      if (cur === 'ready') {
        li.dataset.state = 'working';
        b.textContent = 'Submit';
        // Inject answer input if not yet present
        if (!li.querySelector('.pr-answer')) {
          const input = document.createElement('input');
          input.type = 'text';
          input.className = 'pr-answer';
          input.placeholder = 'Your answer…';
          input.setAttribute('aria-label', 'Your answer');
          const foot = li.querySelector('.pr-foot');
          li.insertBefore(input, foot);
          input.focus();
        }
      } else if (cur === 'working') {
        const input = li.querySelector('.pr-answer');
        const val = (input?.value || '').trim();
        if (!val) {
          // Empty submission — show validation error
          if (input) {
            input.classList.add('error', 'shake');
            setTimeout(() => input.classList.remove('shake'), 450);
            input.focus();
          }
          let err = li.querySelector('.pr-error-msg');
          if (!err) {
            err = document.createElement('div');
            err.className = 'pr-error-msg';
            err.setAttribute('role', 'alert');
            err.textContent = 'Please enter an answer.';
            li.appendChild(err);
          }
          toast('Please enter an answer');
          return;
        }
        // Clear any prior error
        input?.classList.remove('error');
        li.querySelector('.pr-error-msg')?.remove();
        li.dataset.state = 'done';
        b.textContent = 'Correct';
        updateProgress();
      } else {
        li.dataset.state = 'ready';
        b.textContent = 'Solve';
        li.querySelector('.pr-answer')?.remove();
        li.querySelector('.pr-error-msg')?.remove();
        updateProgress();
      }
    });
  });
  // Clear error styling when user starts typing
  document.addEventListener('input', (e) => {
    if (e.target.classList?.contains('pr-answer')) {
      e.target.classList.remove('error');
      e.target.closest('.prac')?.querySelector('.pr-error-msg')?.remove();
    }
  });
  document.querySelectorAll('.pr-hint').forEach((b) => {
    b.addEventListener('click', () => {
      const li = b.closest('.prac');
      if (!li || li.querySelector('.pr-hint-text')) return;
      const eq = li.querySelector('.pr-eq')?.textContent || '';
      const hint = document.createElement('div');
      hint.className = 'pr-hint-text';
      hint.style.cssText = 'background:#FEF3C7;border-left:3px solid #F59E0B;padding:6px 10px;border-radius:0 6px 6px 0;font-size:12.5px;color:#1F2A2A;margin-top:6px;line-height:1.45';
      hint.textContent = `Hint · identify the outer and inner functions in ${eq.replace(/^d\/dx\s*/, '')}. Differentiate each separately, then multiply.`;
      li.appendChild(hint);
    });
  });

  function updateProgress() {
    const done = document.querySelectorAll('.prac[data-state="done"]').length;
    const total = document.querySelectorAll('.prac').length;
    const fill = document.querySelector('.prog-bar i');
    const text = document.querySelector('.prog-row strong');
    if (fill) fill.style.width = `${(done / 10) * 100}%`;
    if (text) text.textContent = `${4 + done} / 10 problems`;
  }

  // ============== CODE-CARD COPY / RUN ==============
  document.querySelectorAll('.cc-btn').forEach((b) => {
    b.addEventListener('click', () => {
      if (b.textContent.includes('Copy')) {
        const code = b.closest('.code-card')?.querySelector('.cc-body')?.innerText || '';
        navigator.clipboard?.writeText(code).catch(() => {});
        const t = b.textContent;
        b.textContent = '✓ Copied';
        setTimeout(() => b.textContent = t, 1300);
      } else if (b.textContent.includes('Run')) {
        const out = document.getElementById('ccOut');
        if (out) {
          out.style.display = 'block';
          out.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        const t = b.textContent;
        b.textContent = '✓ Executed';
        setTimeout(() => b.textContent = t, 1500);
      }
    });
  });

  // ============== MSG ACTIONS ==============
  document.querySelectorAll('.ma').forEach((b) => {
    b.addEventListener('click', () => {
      const t = b.textContent;
      b.textContent = '✓';
      setTimeout(() => b.textContent = t, 900);
    });
  });

  autoGrow();
})();

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
