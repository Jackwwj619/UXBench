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
  sendBtn?.addEventListener('click', (e) => { e.preventDefault(); submit(); });
  // Use pointerdown to fire reliably on first tap (touch devices sometimes
  // swallow the click when the textarea blurs).
  sendBtn?.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'touch') {
      e.preventDefault();
      submit();
    }
  });

  // ============== SUGGEST CHIPS ==============
  document.querySelectorAll('.cs').forEach((b) => b.addEventListener('click', () => {
    composer.value = b.textContent;
    autoGrow(); composer.focus();
  }));

  // ============== STEP MODE TOGGLE ==============
  const stepBtn = document.getElementById('stepBtn');
  stepBtn?.addEventListener('click', () => {
    const on = stepBtn.classList.toggle('on');
    stepBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
    document.body.classList.toggle('steps-on', on);
    if (on) {
      const firstStep = document.querySelector('.step-list');
      firstStep?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });

  // ============== PRACTICE PANEL TOGGLE (mobile/tablet) ==============
  const practiceBtn = document.getElementById('practiceBtn');
  practiceBtn?.addEventListener('click', () => {
    const open = document.body.classList.toggle('right-rail-open');
    practiceBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    practiceBtn.classList.toggle('on', open);
    if (open) {
      document.getElementById('rightRail')?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
  // Close drawer when tapping the dim overlay
  document.addEventListener('click', (e) => {
    if (!document.body.classList.contains('right-rail-open')) return;
    const rail = document.getElementById('rightRail');
    if (!rail) return;
    if (e.target === document.body) {
      document.body.classList.remove('right-rail-open');
      practiceBtn?.setAttribute('aria-expanded', 'false');
      practiceBtn?.classList.remove('on');
    }
  });

  // ============== MORE (⋯) MENU ==============
  const moreBtn = document.getElementById('moreBtn');
  const moreMenu = document.getElementById('moreMenu');
  moreBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    const isHidden = moreMenu.hasAttribute('hidden');
    if (isHidden) {
      moreMenu.removeAttribute('hidden');
      moreBtn.setAttribute('aria-expanded', 'true');
      moreBtn.classList.add('on');
    } else {
      moreMenu.setAttribute('hidden', '');
      moreBtn.setAttribute('aria-expanded', 'false');
      moreBtn.classList.remove('on');
    }
  });
  document.addEventListener('click', (e) => {
    if (!moreMenu || moreMenu.hasAttribute('hidden')) return;
    if (e.target === moreBtn || moreMenu.contains(e.target)) return;
    moreMenu.setAttribute('hidden', '');
    moreBtn?.setAttribute('aria-expanded', 'false');
    moreBtn?.classList.remove('on');
  });
  document.querySelectorAll('.hd-menu-item').forEach((item) => {
    item.addEventListener('click', () => {
      const t = item.textContent;
      item.textContent = '✓ ' + t.replace(/^[^\s]+\s/, '');
      setTimeout(() => { item.textContent = t; }, 1100);
      moreMenu.setAttribute('hidden', '');
      moreBtn?.setAttribute('aria-expanded', 'false');
      moreBtn?.classList.remove('on');
    });
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
        flashPrac(li);
      } else if (cur === 'working') {
        li.dataset.state = 'done';
        b.textContent = 'Correct';
        flashPrac(li);
        updateProgress();
      } else {
        li.dataset.state = 'ready';
        b.textContent = 'Solve';
        flashPrac(li);
        updateProgress();
      }
    });
  });

  function flashPrac(li) {
    li.classList.remove('flash');
    void li.offsetWidth;
    li.classList.add('flash');
    setTimeout(() => li.classList.remove('flash'), 500);
  }
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

  // ============== CONCEPT & THREAD LINK FEEDBACK ==============
  // Static fixture has no real navigation; show inline feedback so clicks aren't dead.
  document.querySelectorAll('.concept-list a').forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const title = a.textContent.trim();
      const li = a.closest('li');
      if (!li) return;
      let preview = li.querySelector('.concept-preview');
      if (preview) { preview.remove(); return; }
      preview = document.createElement('div');
      preview.className = 'concept-preview';
      preview.textContent = `Quick view · ${title} — open the full lesson from your library, or ask Atlas a question to dive in.`;
      li.appendChild(preview);
    });
  });

  document.querySelectorAll('.thread').forEach((t) => {
    t.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.thread.active').forEach((el) => el.classList.remove('active'));
      t.classList.add('active');
    });
  });

  document.querySelectorAll('.rail-link').forEach((l) => {
    l.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.rail-link.active').forEach((el) => el.classList.remove('active'));
      l.classList.add('active');
    });
  });

  autoGrow();
})();

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
