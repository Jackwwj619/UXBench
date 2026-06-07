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
