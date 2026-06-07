// Atlas Tutor — chat fixture interactions

(function () {
  // ============== TOAST ==============
  const toast = document.getElementById('toast');
  let toastTimer = null;
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.hidden = false;
    requestAnimationFrame(() => toast.classList.add('show'));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => { toast.hidden = true; }, 220);
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
    if (e.key === 'Enter' && !e.shiftKey && (e.metaKey || e.ctrlKey || window.innerWidth < 720)) {
      e.preventDefault();
      submit();
    }
  });

  function submit() {
    const text = (composer?.value || '').trim();
    if (!text) {
      showToast('Type a question first');
      composer?.focus();
      return;
    }
    const messages = document.getElementById('messages');
    if (!messages) return;

    // Disable send + show sending state
    if (sendBtn) {
      sendBtn.disabled = true;
      sendBtn.classList.add('sending');
      sendBtn.textContent = '…';
    }

    const art = document.createElement('article');
    art.className = 'msg msg-user';
    art.innerHTML = `<div class="msg-row"><span class="msg-av">SA</span><div class="msg-body"><p>${escapeHtml(text)}</p></div></div>`;
    messages.appendChild(art);

    const bot = document.createElement('article');
    bot.className = 'msg msg-bot';
    bot.innerHTML = `<div class="msg-row"><span class="msg-av msg-av-bot">A</span><div class="msg-body"><p><em>Atlas is thinking…</em></p></div></div>`;
    messages.appendChild(bot);

    composer.value = '';
    autoGrow();
    setTimeout(() => messages.scrollTo({ top: messages.scrollHeight, behavior: 'smooth' }), 30);
    showToast('Message sent');

    setTimeout(() => {
      bot.querySelector('.msg-body').innerHTML = `<p>Got it — I'd start by identifying the layers. For something like <code>${escapeHtml(text)}</code>, write out the outer and inner functions, derive each, and stack with the chain rule. Open practice problem #${1 + Math.floor(Math.random() * 6)} on the right and try this same recipe.</p>`;
      messages.scrollTo({ top: messages.scrollHeight, behavior: 'smooth' });
      if (sendBtn) {
        sendBtn.disabled = false;
        sendBtn.classList.remove('sending');
        sendBtn.textContent = '→';
      }
    }, 800);
  }
  sendBtn?.addEventListener('click', submit);

  // ============== SUGGEST CHIPS ==============
  document.querySelectorAll('.cs').forEach((b) => b.addEventListener('click', () => {
    if (!composer) return;
    const sep = composer.value.trim().length ? ' ' : '';
    composer.value = (composer.value.trim() + sep + b.textContent.trim()).trim();
    autoGrow(); composer.focus();
    b.classList.add('added');
    setTimeout(() => b.classList.remove('added'), 1200);
    showToast('Added to prompt — press send to ask');
  }));

  // ============== STEP MODE TOGGLE ==============
  const stepBtn = document.getElementById('stepBtn');
  stepBtn?.addEventListener('click', () => {
    stepBtn.classList.toggle('on');
    showToast(stepBtn.classList.contains('on') ? 'Step-by-step mode on' : 'Step-by-step mode off');
  });

  // ============== PRACTICE BUTTON / RIGHT RAIL DRAWER ==============
  const practiceBtn = document.getElementById('practiceBtn');
  const rightRail = document.getElementById('rightRail');
  const rrClose = document.getElementById('rrClose');
  function isNarrow() { return window.innerWidth <= 1024; }
  function openRail() {
    if (!rightRail) return;
    if (isNarrow()) {
      rightRail.classList.add('open');
      practiceBtn?.setAttribute('aria-expanded', 'true');
    }
    rightRail.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const first = rightRail.querySelector('.prac');
    first?.classList.add('flash');
    setTimeout(() => first?.classList.remove('flash'), 900);
  }
  function closeRail() {
    rightRail?.classList.remove('open');
    practiceBtn?.setAttribute('aria-expanded', 'false');
  }
  practiceBtn?.addEventListener('click', () => {
    if (rightRail?.classList.contains('open')) { closeRail(); }
    else { openRail(); showToast('Practice problems opened'); }
  });
  rrClose?.addEventListener('click', closeRail);

  // ============== MORE MENU ==============
  const moreBtn = document.getElementById('moreBtn');
  const moreMenu = document.getElementById('moreMenu');
  function closeMore() {
    if (!moreMenu) return;
    moreMenu.hidden = true;
    moreBtn?.setAttribute('aria-expanded', 'false');
  }
  moreBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!moreMenu) return;
    const open = !moreMenu.hidden;
    if (open) closeMore();
    else { moreMenu.hidden = false; moreBtn.setAttribute('aria-expanded', 'true'); }
  });
  document.addEventListener('click', (e) => {
    if (!moreMenu || moreMenu.hidden) return;
    if (!moreMenu.contains(e.target) && e.target !== moreBtn) closeMore();
  });
  moreMenu?.querySelectorAll('button').forEach((b) => {
    b.addEventListener('click', () => {
      const map = { rename: 'Renamed thread', export: 'Exported as Markdown', archive: 'Thread archived', report: 'Issue reported — thanks!' };
      showToast(map[b.dataset.act] || 'Done');
      closeMore();
    });
  });

  // ============== SETTINGS PANEL ==============
  const settingsBtn = document.getElementById('settingsBtn');
  const settingsPanel = document.getElementById('settingsPanel');
  const settingsOverlay = document.getElementById('settingsOverlay');
  const settingsClose = document.getElementById('settingsClose');
  function openSettings() {
    if (!settingsPanel) return;
    settingsPanel.hidden = false;
    if (settingsOverlay) settingsOverlay.hidden = false;
    settingsPanel.querySelector('h3')?.focus?.();
  }
  function closeSettings() {
    if (!settingsPanel) return;
    settingsPanel.hidden = true;
    if (settingsOverlay) settingsOverlay.hidden = true;
  }
  settingsBtn?.addEventListener('click', openSettings);
  settingsClose?.addEventListener('click', closeSettings);
  settingsOverlay?.addEventListener('click', closeSettings);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (settingsPanel && !settingsPanel.hidden) closeSettings();
      if (rightRail?.classList.contains('open')) closeRail();
      if (moreMenu && !moreMenu.hidden) closeMore();
    }
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
      } else if (cur === 'working') {
        li.dataset.state = 'done';
        b.textContent = 'Correct';
        updateProgress();
        showToast('Nice — marked correct');
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
    const fill = document.querySelector('.prog-bar i');
    const text = document.querySelector('.prog-row strong');
    if (fill) fill.style.width = `${(done / 10) * 100}%`;
    if (text) text.textContent = `${4 + done} / 10 problems`;
  }

  // ============== CODE-CARD COPY / RUN ==============
  document.querySelectorAll('.cc-btn').forEach((b) => {
    const original = b.textContent;
    b.addEventListener('click', () => {
      if (b.textContent.includes('Copy')) {
        const code = b.closest('.code-card')?.querySelector('.cc-body')?.innerText || '';
        navigator.clipboard?.writeText(code).catch(() => {});
        b.textContent = '✓ Copied';
        showToast('Code copied to clipboard');
        setTimeout(() => { b.textContent = original; }, 1500);
      } else if (b.textContent.includes('Run')) {
        const out = document.getElementById('ccOut');
        if (out) {
          out.style.display = 'block';
          out.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        b.textContent = '✓ Executed';
        showToast('Script executed — see Output');
        setTimeout(() => { b.textContent = original; }, 1800);
      }
    });
  });

  // ============== MSG ACTIONS ==============
  const maMessages = {
    up: 'Thanks for the feedback',
    down: 'Thanks — we’ll improve this answer',
    share: 'Share link copied',
    copy: 'Reply copied to clipboard',
    retry: 'Regenerating answer…'
  };
  document.querySelectorAll('.ma').forEach((b) => {
    const original = b.innerHTML;
    b.addEventListener('click', () => {
      const act = b.dataset.act || '';
      const msg = maMessages[act] || 'Done';
      // Copy: actually copy the message body text
      if (act === 'copy') {
        const body = b.closest('.msg-body');
        const text = body ? body.innerText.replace(/\n?(👍|👎|⤴ Share|📋 Copy|↻ Try again|Helpful|Not helpful).*/g, '').trim() : '';
        if (text) navigator.clipboard?.writeText(text).catch(() => {});
      }
      b.classList.add('confirmed');
      b.innerHTML = '✓ ' + (act === 'copy' ? 'Copied' : act === 'up' ? 'Thanks' : act === 'down' ? 'Noted' : act === 'share' ? 'Shared' : act === 'retry' ? 'Regenerating' : 'Done');
      showToast(msg);
      setTimeout(() => {
        b.classList.remove('confirmed');
        b.innerHTML = original;
      }, 1600);
    });
  });

  // ============== COMPOSER ICON BUTTONS ==============
  document.querySelector('.comp-attach')?.addEventListener('click', () => {
    showToast('Attachments are not available in this preview');
  });
  const micBtn = document.querySelector('.comp-mic');
  micBtn?.addEventListener('click', () => {
    const on = micBtn.classList.toggle('recording');
    micBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
    showToast(on ? 'Voice input listening…' : 'Voice input stopped');
  });

  // ============== CONCEPTS LINKS ==============
  document.querySelectorAll('.concept-list a').forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.concept-list li').forEach((li) => li.classList.remove('active'));
      a.closest('li')?.classList.add('active');
      showToast(`Concept · ${a.textContent}`);
    });
  });

  // ============== NEW CHAT ==============
  document.querySelector('.new-thread')?.addEventListener('click', () => {
    showToast('Started a new chat');
  });

  autoGrow();
})();

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
