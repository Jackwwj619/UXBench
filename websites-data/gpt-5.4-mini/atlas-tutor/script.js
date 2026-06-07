// Atlas Tutor — chat fixture interactions

(function () {
  // ============== TOAST ==============
  const toastEl = document.getElementById('toast');
  let toastTimer = null;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 1800);
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
    if (e.key === 'Enter' && !e.shiftKey) {
      // Allow Enter to send (Shift+Enter for newline). Also Cmd/Ctrl+Enter still works.
      e.preventDefault();
      submit();
    }
  });

  function submit() {
    const text = (composer?.value || '').trim();
    if (!text) {
      toast('Type a message first');
      composer?.focus();
      return;
    }
    const messages = document.getElementById('messages');
    if (!messages) return;

    // Visible send acknowledgment
    if (sendBtn) {
      sendBtn.classList.add('is-sending');
      sendBtn.disabled = true;
      sendBtn.textContent = '…';
      sendBtn.setAttribute('aria-label', 'Sending message');
    }

    // Optimistic echo: append user message immediately
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
    toast('Message sent');

    setTimeout(() => {
      bot.querySelector('.msg-body').innerHTML = `<p>Got it — I'd start by identifying the layers. For something like <code>${escapeHtml(text)}</code>, write out the outer and inner functions, derive each, and stack with the chain rule. Open practice problem #${1 + Math.floor(Math.random() * 6)} on the right and try this same recipe.</p>`;
      messages.scrollTo({ top: messages.scrollHeight, behavior: 'smooth' });
      if (sendBtn) {
        sendBtn.classList.remove('is-sending');
        sendBtn.disabled = false;
        sendBtn.textContent = '→';
        sendBtn.setAttribute('aria-label', 'Send');
      }
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
    toast(stepBtn.classList.contains('on') ? 'Step-by-step mode on' : 'Step-by-step mode off');
  });

  // ============== HEADER MORE MENU ==============
  const moreBtn = document.getElementById('moreBtn');
  const moreMenu = document.getElementById('moreMenu');
  function closeMoreMenu() {
    if (!moreMenu || !moreBtn) return;
    moreMenu.hidden = true;
    moreBtn.setAttribute('aria-expanded', 'false');
  }
  function openMoreMenu() {
    if (!moreMenu || !moreBtn) return;
    moreMenu.hidden = false;
    moreBtn.setAttribute('aria-expanded', 'true');
  }
  moreBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (moreMenu.hidden) openMoreMenu(); else closeMoreMenu();
  });
  document.addEventListener('click', (e) => {
    if (!moreMenu || moreMenu.hidden) return;
    if (!moreMenu.contains(e.target) && e.target !== moreBtn) closeMoreMenu();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMoreMenu();
  });
  moreMenu?.querySelectorAll('.hd-menu-item').forEach((item) => {
    item.addEventListener('click', () => {
      const labels = {
        rename: 'Rename thread',
        export: 'Conversation exported',
        archive: 'Thread archived',
        settings: 'Opening Settings',
        privacy: 'Opening Privacy & data',
        help: 'Opening Help & shortcuts',
      };
      toast(labels[item.dataset.action] || 'Action');
      closeMoreMenu();
    });
  });

  // ============== LEFT RAIL: BRAND + SUBJECTS + THREADS ==============
  const headTitle = document.querySelector('.conv-head h2');
  const headMeta = document.querySelector('.conv-head .meta-row');

  document.querySelector('.brand')?.addEventListener('click', (e) => {
    e.preventDefault();
    toast('Atlas Tutor · home');
  });

  document.querySelectorAll('.rail-link').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.rail-link').forEach((x) => x.classList.remove('active'));
      el.classList.add('active');
      const subject = (el.textContent || '').replace(/\s*\d+\s*$/, '').trim();
      toast(`Subject · ${subject}`);
    });
  });

  document.querySelectorAll('.thread').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.thread').forEach((x) => x.classList.remove('active'));
      el.classList.add('active');
      const title = (el.textContent || '').trim();
      if (headTitle) headTitle.textContent = title;
      if (headMeta) headMeta.textContent = 'Loading thread…';
      toast(`Opened · ${title}`);
      setTimeout(() => {
        if (headMeta) headMeta.textContent = `${title.split('—')[0].trim() || 'Conversation'} · last reply just now · Atlas-3 model`;
      }, 500);
    });
  });

  // ============== CONCEPT LINKS (right rail) ==============
  document.querySelectorAll('.concept-list a').forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      toast(`Opening · ${a.textContent.trim()}`);
    });
  });

  // ============== PRACTICE INTERACTIONS ==============
  function ensureStatus(li) {
    let s = li.querySelector('.pr-status');
    if (!s) {
      s = document.createElement('span');
      s.className = 'pr-status';
      li.querySelector('.pr-head')?.appendChild(s);
    }
    return s;
  }
  function setStatus(li, label, withSpinner) {
    const s = ensureStatus(li);
    s.innerHTML = withSpinner ? `<span class="pr-spinner"></span>${label}` : label;
  }

  // Initialize Ready label on every card
  document.querySelectorAll('.prac').forEach((li) => setStatus(li, 'Ready'));

  document.querySelectorAll('.pr-input').forEach((b) => {
    b.addEventListener('click', () => {
      const li = b.closest('.prac');
      if (!li) return;
      const cur = li.dataset.state;
      if (cur === 'ready') {
        li.dataset.state = 'working';
        b.textContent = 'Submit';
        setStatus(li, 'In progress');
        toast('Working — tap Submit when ready');
      } else if (cur === 'working') {
        // Brief checking state, then mark done
        li.dataset.state = 'checking';
        b.textContent = 'Checking…';
        b.disabled = true;
        setStatus(li, 'Checking', true);
        setTimeout(() => {
          li.dataset.state = 'done';
          b.textContent = 'Correct';
          b.disabled = false;
          setStatus(li, 'Correct ✓');
          updateProgress();
          toast('Answer correct ✓');
        }, 700);
      } else {
        li.dataset.state = 'ready';
        b.textContent = 'Solve';
        setStatus(li, 'Ready');
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
    b.addEventListener('click', () => {
      if (b.textContent.includes('Copy')) {
        const code = b.closest('.code-card')?.querySelector('.cc-body')?.innerText || '';
        navigator.clipboard?.writeText(code).catch(() => {});
        const t = b.textContent;
        b.textContent = '✓ Copied';
        toast('Code copied to clipboard');
        setTimeout(() => b.textContent = t, 1300);
      } else if (b.textContent.includes('Run')) {
        const out = document.getElementById('ccOut');
        if (out) {
          out.style.display = 'block';
          out.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        const t = b.textContent;
        b.textContent = '✓ Executed';
        toast('Script executed');
        setTimeout(() => b.textContent = t, 1500);
      }
    });
  });

  // ============== MSG ACTIONS ==============
  document.querySelectorAll('.ma').forEach((b) => {
    b.addEventListener('click', () => {
      const t = b.textContent.trim();
      const orig = b.textContent;
      b.classList.add('is-acked');
      if (t.includes('👍')) { toast('Thanks — feedback recorded'); b.textContent = '✓ 👍'; }
      else if (t.includes('👎')) { toast('Thanks — we’ll improve this'); b.textContent = '✓ 👎'; }
      else if (t.includes('Share')) {
        navigator.clipboard?.writeText(window.location.href).catch(() => {});
        toast('Share link copied to clipboard');
        b.textContent = '✓ Link copied';
      }
      else if (t.includes('Copy')) {
        const body = b.closest('.msg-body');
        const txt = body ? body.innerText.replace(/\n?(?:👍|👎|⤴ Share|📋 Copy|↻ Try again)\s*/g, '').trim() : '';
        navigator.clipboard?.writeText(txt).catch(() => {});
        toast('Reply copied to clipboard');
        b.textContent = '✓ Copied';
      }
      else if (t.includes('Try again')) { toast('Regenerating reply…'); b.textContent = '↻ Regenerating…'; }
      else { b.textContent = '✓'; }
      setTimeout(() => { b.textContent = orig; b.classList.remove('is-acked'); }, 1500);
    });
  });

  // ============== ATTACH / MIC ==============
  document.querySelector('.comp-attach')?.addEventListener('click', () => toast('Attach a file (image or PDF)'));
  document.querySelector('.comp-mic')?.addEventListener('click', () => toast('Voice input is not available in this preview'));
  document.querySelector('.pm-set')?.addEventListener('click', (e) => {
    e.stopPropagation();
    toast('Opening Settings');
  });

  autoGrow();
})();

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
