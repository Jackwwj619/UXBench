// Atlas Tutor — chat fixture interactions

(function () {
  // ============== TOAST ==============
  const toast = document.getElementById('toast');
  let toastTimer = null;
  function showToast(msg, ms = 2000) {
    if (!toast) return;
    toast.textContent = msg;
    toast.hidden = false;
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toast.hidden = true; }, ms);
  }

  // ============== AUTOGROW COMPOSER & SEND ENABLEMENT ==============
  const composer = document.getElementById('composer');
  const sendBtn = document.getElementById('sendBtn');

  function autoGrow() {
    if (!composer) return;
    composer.style.height = 'auto';
    composer.style.height = Math.min(200, composer.scrollHeight) + 'px';
  }
  function refreshSendState() {
    if (!sendBtn) return;
    const has = !!(composer && composer.value.trim());
    sendBtn.disabled = !has;
    sendBtn.setAttribute('aria-disabled', String(!has));
  }
  composer?.addEventListener('input', () => { autoGrow(); refreshSendState(); });
  composer?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      submit();
    }
  });

  function submit() {
    const text = (composer?.value || '').trim();
    if (!text) {
      // Provide visible feedback for empty submissions.
      if (sendBtn) {
        sendBtn.classList.remove('shake');
        // Force reflow to restart animation
        void sendBtn.offsetWidth;
        sendBtn.classList.add('shake');
      }
      showToast('Type a message to send');
      composer?.focus();
      return;
    }
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
    refreshSendState();
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
    autoGrow(); refreshSendState(); composer.focus();
  }));

  // ============== STEP MODE TOGGLE ==============
  const stepBtn = document.getElementById('stepBtn');
  stepBtn?.addEventListener('click', () => stepBtn.classList.toggle('on'));

  // ============== PRACTICE INTERACTIONS ==============
  document.querySelectorAll('.pr-input').forEach((b) => {
    b.addEventListener('click', () => {
      const li = b.closest('.prac');
      if (!li) return;
      const cur = li.dataset.state;
      if (cur === 'ready') {
        li.dataset.state = 'working';
        b.textContent = 'Submit';
      } else if (cur === 'working') {
        li.dataset.state = 'done';
        b.textContent = 'Correct';
        updateProgress();
      } else {
        li.dataset.state = 'ready';
        b.textContent = 'Solve';
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
        b.classList.remove('is-open');
        b.textContent = '💡 Hint';
        b.setAttribute('aria-expanded', 'false');
        return;
      }
      const eq = li.querySelector('.pr-eq')?.textContent || '';
      const hint = document.createElement('div');
      hint.className = 'pr-hint-text';
      hint.style.cssText = 'background:#FEF3C7;border-left:3px solid #F59E0B;padding:6px 10px;border-radius:0 6px 6px 0;font-size:12.5px;color:#1F2A2A;margin-top:6px;line-height:1.45';
      hint.textContent = `Hint · identify the outer and inner functions in ${eq.replace(/^d\/dx\s*/, '')}. Differentiate each separately, then multiply.`;
      li.appendChild(hint);
      b.classList.add('is-open');
      b.textContent = '💡 Hide hint';
      b.setAttribute('aria-expanded', 'true');
    });
  });

  function updateProgress() {
    const done = document.querySelectorAll('.prac[data-state="done"]').length;
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
      b.classList.add('is-active');
      b.textContent = '✓';
      setTimeout(() => { b.textContent = t; b.classList.remove('is-active'); }, 900);
    });
  });

  // ============== SETTINGS MODAL ==============
  const settingsBtn = document.getElementById('settingsBtn');
  const settingsOverlay = document.getElementById('settingsOverlay');
  const settingsClose = document.getElementById('settingsClose');
  const settingsCancel = document.getElementById('settingsCancel');
  const settingsSave = document.getElementById('settingsSave');

  function openSettings() {
    if (!settingsOverlay) return;
    settingsOverlay.hidden = false;
    settingsClose?.focus();
    document.addEventListener('keydown', escCloseSettings);
  }
  function closeSettings() {
    if (!settingsOverlay) return;
    settingsOverlay.hidden = true;
    document.removeEventListener('keydown', escCloseSettings);
    settingsBtn?.focus();
  }
  function escCloseSettings(e) { if (e.key === 'Escape') closeSettings(); }
  settingsBtn?.addEventListener('click', openSettings);
  settingsClose?.addEventListener('click', closeSettings);
  settingsCancel?.addEventListener('click', closeSettings);
  settingsSave?.addEventListener('click', () => { closeSettings(); showToast('Settings saved'); });
  settingsOverlay?.addEventListener('click', (e) => { if (e.target === settingsOverlay) closeSettings(); });

  // ============== OVERFLOW MENU ==============
  const overflowBtn = document.getElementById('overflowBtn');
  const overflowMenu = document.getElementById('overflowMenu');
  function setOverflow(open) {
    if (!overflowMenu || !overflowBtn) return;
    overflowMenu.hidden = !open;
    overflowBtn.setAttribute('aria-expanded', String(open));
  }
  overflowBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    setOverflow(overflowMenu.hidden);
  });
  document.addEventListener('click', (e) => {
    if (!overflowMenu || overflowMenu.hidden) return;
    if (!overflowMenu.contains(e.target) && e.target !== overflowBtn) setOverflow(false);
  });
  overflowMenu?.querySelectorAll('button[role="menuitem"]').forEach((b) => {
    b.addEventListener('click', () => {
      const action = b.dataset.go;
      setOverflow(false);
      if (action === 'settings') return openSettings();
      if (action === 'practice-mobile') return openPracticeSheet();
      if (action === 'export') return showToast('Thread exported (demo)');
      if (action === 'rename') return showToast('Rename — coming soon');
      if (action === 'delete') return showToast('Delete — coming soon');
    });
  });

  // ============== MOBILE PRACTICE SHEET ==============
  const practiceBtn = document.getElementById('practiceBtn');
  const practiceSheet = document.getElementById('practiceSheet');
  const practiceClose = document.getElementById('practiceClose');
  const practiceSheetBody = document.getElementById('practiceSheetBody');
  const rightRail = document.querySelector('.right-rail');

  function isMobileViewport() { return window.matchMedia('(max-width: 1024px)').matches; }

  function openPracticeSheet() {
    if (!practiceSheet || !practiceSheetBody || !rightRail) return;
    // Move the right-rail content into the sheet so listeners and state are preserved.
    if (!practiceSheetBody.contains(rightRail.firstChild)) {
      while (rightRail.firstChild) practiceSheetBody.appendChild(rightRail.firstChild);
    }
    practiceSheet.hidden = false;
    practiceBtn?.setAttribute('aria-expanded', 'true');
    practiceClose?.focus();
    document.addEventListener('keydown', escClosePractice);
  }
  function closePracticeSheet() {
    if (!practiceSheet || !practiceSheetBody || !rightRail) return;
    // Move content back so desktop view continues working if user resizes.
    while (practiceSheetBody.firstChild) rightRail.appendChild(practiceSheetBody.firstChild);
    practiceSheet.hidden = true;
    practiceBtn?.setAttribute('aria-expanded', 'false');
    document.removeEventListener('keydown', escClosePractice);
    practiceBtn?.focus();
  }
  function escClosePractice(e) { if (e.key === 'Escape') closePracticeSheet(); }

  practiceBtn?.addEventListener('click', () => {
    if (isMobileViewport()) {
      if (practiceSheet?.hidden) openPracticeSheet(); else closePracticeSheet();
    } else {
      // On desktop the panel is already visible — scroll it into view as feedback.
      rightRail?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      showToast('Practice panel is on the right');
    }
  });
  practiceClose?.addEventListener('click', closePracticeSheet);
  practiceSheet?.addEventListener('click', (e) => { if (e.target === practiceSheet) closePracticeSheet(); });

  // ============== ATTACH BUTTON (graceful unsupported) ==============
  document.getElementById('attachBtn')?.addEventListener('click', () => {
    showToast('Attachments coming soon');
  });

  // ============== NEW CHAT ==============
  document.querySelectorAll('[data-go="new"]').forEach((b) => {
    b.addEventListener('click', () => {
      const messages = document.getElementById('messages');
      if (!messages) return;
      messages.innerHTML = `
        <article class="msg msg-bot">
          <div class="msg-row">
            <span class="msg-av msg-av-bot">A</span>
            <div class="msg-body">
              <p>New chat started. What would you like to work on? Try one of the suggestions below or ask a question.</p>
            </div>
          </div>
        </article>`;
      // Update header
      const h2 = document.querySelector('.conv-head h2');
      if (h2) h2.textContent = 'New chat';
      const meta = document.querySelector('.conv-head .meta-row');
      if (meta) meta.textContent = 'Atlas-3 model · started just now';
      // Mark sidebar selection
      document.querySelectorAll('.thread.active').forEach((t) => t.classList.remove('active'));
      // Focus composer
      composer?.focus();
      refreshSendState();
      showToast('Started a new chat');
    });
  });

  // ============== CONCEPT LINKS ==============
  document.querySelectorAll('.concept-link').forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const topic = a.dataset.topic || a.textContent.trim();
      if (composer) {
        composer.value = `Explain ${topic} in plain language with one quick example.`;
        autoGrow();
        refreshSendState();
        composer.focus();
      }
      showToast(`Loaded prompt for: ${topic}`);
    });
  });

  // ============== INIT ==============
  autoGrow();
  refreshSendState();
})();

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
