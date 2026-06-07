// Atlas Tutor — chat fixture interactions

(function () {
  // ============== TOAST ==============
  const toastStack = document.getElementById('toastStack');
  function toast(msg, kind) {
    if (!toastStack) return;
    const el = document.createElement('div');
    el.className = 'toast' + (kind ? ' toast-' + kind : '');
    el.textContent = msg;
    toastStack.appendChild(el);
    setTimeout(() => {
      el.classList.add('is-out');
      setTimeout(() => el.remove(), 220);
    }, 1800);
  }

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
    const messages = document.getElementById('messages');
    if (!messages) return;
    const art = document.createElement('article');
    art.className = 'msg msg-user';
    art.innerHTML = `<div class="msg-row"><span class="msg-av">SA</span><div class="msg-body"><p>${escapeHtml(text)}</p></div></div>`;
    messages.appendChild(art);

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

  // ============== STEP MODE TOGGLE ==============
  const stepBtn = document.getElementById('stepBtn');
  stepBtn?.addEventListener('click', () => {
    stepBtn.classList.toggle('on');
    const on = stepBtn.classList.contains('on');
    stepBtn.setAttribute('aria-pressed', String(on));
    toast(on ? 'Step-by-step mode on' : 'Step-by-step mode off');
  });

  // ============== PRACTICE TOGGLE ==============
  const practiceBtn = document.getElementById('practiceBtn');
  practiceBtn?.addEventListener('click', () => {
    practiceBtn.classList.toggle('on');
    const on = practiceBtn.classList.contains('on');
    practiceBtn.setAttribute('aria-pressed', String(on));
    const rr = document.querySelector('.right-rail');
    toast(on ? 'Practice mode on — see right pane' : 'Practice mode off');
    if (on && rr) rr.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // ============== MORE MENU ==============
  const moreBtn = document.getElementById('moreBtn');
  const moreMenu = document.getElementById('moreMenu');
  function openMoreMenu(open) {
    if (!moreMenu || !moreBtn) return;
    if (open) {
      moreMenu.hidden = false;
      moreBtn.setAttribute('aria-expanded', 'true');
      const first = moreMenu.querySelector('.mm-item');
      first && first.focus();
    } else {
      moreMenu.hidden = true;
      moreBtn.setAttribute('aria-expanded', 'false');
    }
  }
  moreBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    openMoreMenu(moreMenu.hidden);
  });
  document.addEventListener('click', (e) => {
    if (!moreMenu || moreMenu.hidden) return;
    if (!moreMenu.contains(e.target) && e.target !== moreBtn) openMoreMenu(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (moreMenu && !moreMenu.hidden) { openMoreMenu(false); moreBtn?.focus(); }
      if (settingsBackdrop && !settingsBackdrop.hidden) closeSettings();
    }
  });
  moreMenu?.querySelectorAll('.mm-item').forEach((item) => {
    item.addEventListener('click', () => {
      const action = item.dataset.action;
      const labels = {
        rename: 'Rename — coming soon',
        export: 'Conversation exported (.md copied)',
        archive: 'Thread archived',
        report: 'Thanks — feedback recorded',
        clear: 'Clear thread — confirm in settings'
      };
      toast(labels[action] || item.textContent);
      openMoreMenu(false);
      moreBtn?.focus();
    });
  });

  // ============== SETTINGS MODAL ==============
  const pmSetBtn = document.getElementById('pmSetBtn');
  const settingsBackdrop = document.getElementById('settingsBackdrop');
  const settingsClose = document.getElementById('settingsClose');
  const settingsCancel = document.getElementById('settingsCancel');
  const settingsSave = document.getElementById('settingsSave');
  let lastFocus = null;
  function openSettings() {
    if (!settingsBackdrop) return;
    lastFocus = document.activeElement;
    settingsBackdrop.hidden = false;
    pmSetBtn?.setAttribute('aria-expanded', 'true');
    const first = settingsBackdrop.querySelector('input, button');
    first && first.focus();
  }
  function closeSettings() {
    if (!settingsBackdrop) return;
    settingsBackdrop.hidden = true;
    pmSetBtn?.setAttribute('aria-expanded', 'false');
    lastFocus && lastFocus.focus && lastFocus.focus();
  }
  pmSetBtn?.addEventListener('click', openSettings);
  settingsClose?.addEventListener('click', closeSettings);
  settingsCancel?.addEventListener('click', closeSettings);
  settingsSave?.addEventListener('click', () => {
    closeSettings();
    toast('Settings saved');
  });
  settingsBackdrop?.addEventListener('click', (e) => {
    if (e.target === settingsBackdrop) closeSettings();
  });

  // ============== PRACTICE INTERACTIONS ==============
  function ensureStatusEl(li) {
    let el = li.querySelector('.prac-status');
    if (!el) {
      el = document.createElement('div');
      el.className = 'prac-status';
      el.setAttribute('aria-live', 'polite');
      li.appendChild(el);
    }
    return el;
  }
  document.querySelectorAll('.pr-input').forEach((b) => {
    b.addEventListener('click', () => {
      const li = b.closest('.prac');
      if (!li) return;
      const cur = li.dataset.state;
      const status = ensureStatusEl(li);
      if (cur === 'ready') {
        li.dataset.state = 'working';
        b.textContent = 'Submit';
        status.textContent = 'Working — show your steps, then Submit.';
        toast('Started problem — Submit when ready');
      } else if (cur === 'working') {
        li.dataset.state = 'checking';
        b.innerHTML = '<span class="pr-spinner" aria-hidden="true"></span>Checking…';
        status.textContent = 'Checking your answer…';
        setTimeout(() => {
          li.dataset.state = 'done';
          b.textContent = 'Correct';
          status.textContent = '✓ Correct — nice work!';
          updateProgress();
          toast('Correct ✓');
        }, 700);
      } else {
        li.dataset.state = 'ready';
        b.textContent = 'Solve';
        status.textContent = '';
        updateProgress();
      }
    });
  });
  document.querySelectorAll('.pr-hint').forEach((b) => {
    b.addEventListener('click', () => {
      const li = b.closest('.prac');
      if (!li) return;
      const existing = li.querySelector('.pr-hint-text');
      if (existing) {
        existing.remove();
        b.classList.remove('is-on');
        b.setAttribute('aria-expanded', 'false');
        return;
      }
      const eq = li.querySelector('.pr-eq')?.textContent || '';
      const hint = document.createElement('div');
      hint.className = 'pr-hint-text';
      hint.textContent = `Hint · identify the outer and inner functions in ${eq.replace(/^d\/dx\s*/, '')}. Differentiate each separately, then multiply.`;
      li.appendChild(hint);
      b.classList.add('is-on');
      b.setAttribute('aria-expanded', 'true');
    });
  });

  function updateProgress() {
    const done = document.querySelectorAll('.prac[data-state="done"]').length;
    const fill = document.querySelector('.prog-bar i');
    const text = document.querySelector('.prog-row strong');
    if (fill) fill.style.width = `${((4 + done) / 10) * 100}%`;
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
        b.classList.add('is-confirmed');
        toast('Copied to clipboard');
        setTimeout(() => { b.textContent = t; b.classList.remove('is-confirmed'); }, 1500);
      } else if (b.textContent.includes('Run')) {
        const out = b.closest('.code-card')?.querySelector('.cc-out');
        const t = b.textContent;
        b.textContent = '⏳ Running…';
        b.classList.add('is-running');
        toast('Running script…');
        setTimeout(() => {
          if (out) {
            out.classList.add('is-visible');
            out.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
          b.textContent = '✓ Executed';
          b.classList.remove('is-running');
          b.classList.add('is-confirmed');
          toast('Output ready');
          setTimeout(() => { b.textContent = t; b.classList.remove('is-confirmed'); }, 1500);
        }, 600);
      }
    });
  });

  // ============== MSG ACTIONS ==============
  document.querySelectorAll('.msg-actions').forEach((row) => {
    row.querySelectorAll('.ma').forEach((b) => {
      b.addEventListener('click', () => {
        const label = b.textContent.trim();
        if (label === '👍') {
          row.querySelectorAll('.ma').forEach((x) => { if (x.textContent.trim() === '👎') x.classList.remove('is-down'); });
          b.classList.toggle('is-active');
          toast(b.classList.contains('is-active') ? 'Thanks for the upvote' : 'Upvote removed');
        } else if (label === '👎') {
          row.querySelectorAll('.ma').forEach((x) => { if (x.textContent.trim() === '👍') x.classList.remove('is-active'); });
          b.classList.toggle('is-down');
          toast(b.classList.contains('is-down') ? 'Thanks — we\'ll improve' : 'Feedback removed');
        } else if (label.includes('Copy')) {
          const text = b.closest('.msg-body')?.innerText || '';
          navigator.clipboard?.writeText(text).catch(() => {});
          flashLabel(b, '✓ Copied');
          toast('Message copied');
        } else if (label.includes('Share')) {
          flashLabel(b, '✓ Link copied');
          toast('Share link copied');
        } else if (label.includes('Try again')) {
          flashLabel(b, '↻ Regenerating…');
          toast('Regenerating response…');
        }
      });
    });
  });
  function flashLabel(btn, newText) {
    const original = btn.textContent;
    btn.textContent = newText;
    btn.classList.add('is-confirmed');
    setTimeout(() => {
      btn.textContent = original;
      btn.classList.remove('is-confirmed');
    }, 1400);
  }

  // ============== ATTACH / MIC / NEW THREAD ==============
  document.querySelector('.comp-attach')?.addEventListener('click', () => toast('Attach — drop an image or PDF'));
  document.querySelector('.comp-mic')?.addEventListener('click', () => toast('Voice input — coming soon'));
  document.querySelector('.new-thread')?.addEventListener('click', (e) => {
    e.preventDefault();
    toast('New chat ready');
    composer?.focus();
  });

  autoGrow();
})();

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
