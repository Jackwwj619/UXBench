// Atlas Tutor — chat fixture interactions

(function () {
  // ============== TOAST ==============
  function toast(msg) {
    let t = document.getElementById('atlasToast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'atlasToast';
      t.className = 'atlas-toast';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.remove('show'), 1800);
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

  function submit(textOverride) {
    const text = (typeof textOverride === 'string' ? textOverride : (composer?.value || '')).trim();
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

    if (composer) composer.value = '';
    autoGrow();
    setTimeout(() => messages.scrollTo({ top: messages.scrollHeight, behavior: 'smooth' }), 30);

    setTimeout(() => {
      bot.querySelector('.msg-body').innerHTML = `<p>Got it — I'd start by identifying the layers. For something like <code>${escapeHtml(text)}</code>, write out the outer and inner functions, derive each, and stack with the chain rule. Open practice problem #${1 + Math.floor(Math.random() * 6)} on the right and try this same recipe.</p>`;
      messages.scrollTo({ top: messages.scrollHeight, behavior: 'smooth' });
    }, 800);
  }
  sendBtn?.addEventListener('click', () => submit());

  // ============== SUGGEST CHIPS — auto-send ==============
  document.querySelectorAll('.cs').forEach((b) => b.addEventListener('click', () => {
    const text = b.textContent;
    if (composer) { composer.value = text; autoGrow(); composer.focus(); }
    submit(text);
  }));

  // ============== NEW CHAT ==============
  const newChatBtn = document.querySelector('.new-thread');
  newChatBtn?.addEventListener('click', () => {
    const messages = document.getElementById('messages');
    if (messages) messages.innerHTML = '';
    const headTitle = document.querySelector('.conv-head h2');
    if (headTitle) headTitle.textContent = 'New conversation';
    const headMeta = document.querySelector('.conv-head .meta-row');
    if (headMeta) headMeta.textContent = 'Ask anything — math, physics, stats, or code';
    document.querySelectorAll('.thread.active, .rail-link.active').forEach((el) => el.classList.remove('active'));
    if (composer) { composer.value = ''; autoGrow(); composer.focus(); }
    if (history && history.replaceState) {
      try { history.replaceState(null, '', '#new'); } catch (e) {}
    }
    toast('Started a new chat');
  });

  // ============== STEP MODE TOGGLE ==============
  const stepBtn = document.getElementById('stepBtn');
  stepBtn?.addEventListener('click', () => {
    stepBtn.classList.toggle('on');
    toast(stepBtn.classList.contains('on') ? 'Step-by-step mode on' : 'Step-by-step mode off');
  });

  // ============== SETTINGS MODAL ==============
  const settingsBtn = document.querySelector('.pm-set');
  function openSettings() {
    let modal = document.getElementById('settingsModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'settingsModal';
      modal.className = 'modal-backdrop';
      modal.innerHTML = `
        <div class="modal" role="dialog" aria-labelledby="settingsTitle" aria-modal="true">
          <header class="modal-head">
            <h3 id="settingsTitle">Settings</h3>
            <button class="modal-close" aria-label="Close">×</button>
          </header>
          <div class="modal-body">
            <section class="set-sec">
              <h4>Account</h4>
              <div class="set-row"><span>Selene Aiyer</span><span class="set-meta">Atlas Plus</span></div>
              <div class="set-row"><span>Email</span><span class="set-meta">selene@example.edu</span></div>
            </section>
            <section class="set-sec">
              <h4>Privacy</h4>
              <label class="set-toggle"><input type="checkbox" checked> Allow chat history to improve Atlas</label>
              <label class="set-toggle"><input type="checkbox"> Share anonymized usage data</label>
              <label class="set-toggle"><input type="checkbox" checked> Save practice progress to my account</label>
            </section>
            <section class="set-sec">
              <h4>Appearance</h4>
              <label class="set-toggle"><input type="radio" name="theme" checked> Light</label>
              <label class="set-toggle"><input type="radio" name="theme"> Dark</label>
              <label class="set-toggle"><input type="radio" name="theme"> System</label>
            </section>
            <section class="set-sec">
              <h4>Model</h4>
              <select class="set-select">
                <option>Atlas-3 (default)</option>
                <option>Atlas-2 (faster)</option>
                <option>Atlas-3 Pro</option>
              </select>
            </section>
          </div>
          <footer class="modal-foot">
            <button class="btn-ghost modal-cancel">Cancel</button>
            <button class="btn-primary modal-save">Save changes</button>
          </footer>
        </div>`;
      document.body.appendChild(modal);
      const close = () => modal.classList.remove('open');
      modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
      modal.querySelector('.modal-close').addEventListener('click', close);
      modal.querySelector('.modal-cancel').addEventListener('click', close);
      modal.querySelector('.modal-save').addEventListener('click', () => { close(); toast('Settings saved'); });
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
    }
    modal.classList.add('open');
  }
  settingsBtn?.addEventListener('click', openSettings);

  // ============== HEADER MORE MENU ==============
  document.querySelectorAll('.hd-btn').forEach((b) => {
    if (b.id === 'stepBtn') return;
    b.addEventListener('click', () => {
      const label = b.textContent.trim();
      if (label.includes('Practice')) {
        toast('Practice mode — pick a problem on the right');
        document.querySelector('.right-rail')?.scrollIntoView({ behavior: 'smooth' });
      } else if (label === '⋯') {
        toast('More options · export, archive, delete');
      }
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
      if (existing) { existing.remove(); return; }
      const eq = li.querySelector('.pr-eq')?.textContent || '';
      const hint = document.createElement('div');
      hint.className = 'pr-hint-text';
      hint.textContent = `Hint · identify the outer and inner functions in ${eq.replace(/^d\/dx\s*/, '')}. Differentiate each separately, then multiply.`;
      li.appendChild(hint);
    });
  });

  function updateProgress() {
    const done = document.querySelectorAll('.prac[data-state="done"]').length;
    const fill = document.querySelector('.prog-bar i');
    const text = document.querySelector('.prog-row strong');
    if (fill) fill.style.width = `${Math.min(100, ((4 + done) / 10) * 100)}%`;
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
      } else if (b.textContent.includes('Run') || b.textContent.includes('Executed')) {
        const out = document.getElementById('ccOut');
        if (out) {
          out.style.display = 'block';
          out.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        const t = '▶ Run';
        b.textContent = '✓ Executed';
        toast('Script executed — output shown below');
        setTimeout(() => b.textContent = t, 1500);
      }
    });
  });

  // ============== MSG ACTIONS ==============
  document.querySelectorAll('.ma').forEach((b) => {
    b.addEventListener('click', () => {
      const label = b.textContent.trim();
      if (label.includes('Share')) {
        const url = window.location.href.split('#')[0] + '#msg';
        navigator.clipboard?.writeText(url).catch(() => {});
        toast('Link copied to clipboard');
      } else if (label.includes('Copy')) {
        const body = b.closest('.msg-body');
        const text = body ? body.innerText : '';
        navigator.clipboard?.writeText(text).catch(() => {});
        toast('Message copied');
      } else if (label.includes('👍')) {
        toast('Thanks — feedback recorded');
      } else if (label.includes('👎')) {
        toast('Thanks — we\'ll improve this answer');
      } else if (label.includes('Try again')) {
        toast('Regenerating answer…');
      }
      const original = b.textContent;
      b.classList.add('ma-acted');
      b.textContent = '✓';
      setTimeout(() => { b.textContent = original; b.classList.remove('ma-acted'); }, 900);
    });
  });

  // ============== CONCEPT LINKS ==============
  document.querySelectorAll('.concept-list a').forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const li = a.closest('li');
      if (!li) return;
      const existing = li.querySelector('.concept-def');
      if (existing) { existing.remove(); return; }
      const name = a.textContent;
      const defs = {
        'Chain rule': 'Differentiate the outer function, leave the inner alone, then multiply by the inner\'s derivative.',
        'Derivatives of trig functions': 'd/dx sin = cos, d/dx cos = −sin, d/dx tan = sec². Memorize the six and the rest follow by chain or quotient rule.',
        'Composing functions': 'f∘g means f(g(x)) — apply g first, then f. Order matters; f∘g ≠ g∘f in general.',
        "Notation: f', dy/dx, ḟ": 'Three notations for the same idea. Lagrange (f′), Leibniz (dy/dx), and Newton (ḟ) — each handy in different contexts.'
      };
      const def = document.createElement('div');
      def.className = 'concept-def';
      def.textContent = defs[name] || 'A short definition would appear here once the lesson library is loaded.';
      li.appendChild(def);
    });
  });

  // ============== THREAD / RAIL LINK SELECTION ==============
  document.querySelectorAll('.thread').forEach((t) => {
    t.addEventListener('click', () => {
      document.querySelectorAll('.thread').forEach((x) => x.classList.remove('active'));
      t.classList.add('active');
    });
  });
  document.querySelectorAll('.rail-link').forEach((t) => {
    t.addEventListener('click', () => {
      document.querySelectorAll('.rail-link').forEach((x) => x.classList.remove('active'));
      t.classList.add('active');
    });
  });

  // ============== MOBILE NAV TOGGLES ==============
  const navToggle = document.getElementById('navToggle');
  const practiceToggle = document.getElementById('practiceToggle');
  navToggle?.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
    document.body.classList.remove('practice-open');
  });
  practiceToggle?.addEventListener('click', () => {
    document.body.classList.toggle('practice-open');
    document.body.classList.remove('nav-open');
  });
  document.getElementById('mobileScrim')?.addEventListener('click', () => {
    document.body.classList.remove('nav-open', 'practice-open');
  });

  autoGrow();
})();

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
