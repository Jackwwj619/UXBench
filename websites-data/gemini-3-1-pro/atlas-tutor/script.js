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

  // ============== TOPIC-AWARE MOCK REPLIES ==============
  function mockReply(text) {
    const q = text.toLowerCase();
    if (/markov/.test(q)) {
      return `<p>A <strong>Markov chain</strong> is a sequence of states where the next state depends <em>only</em> on the current one — not on the path that got you there. That's the "memoryless" property.</p>
        <ul class="msg-list">
          <li>Define a finite set of states <code>S</code></li>
          <li>Define a transition matrix <code>P</code> where <code>P[i][j]</code> is the probability of going from <code>i</code> to <code>j</code></li>
          <li>The <em>steady-state</em> distribution <code>π</code> satisfies <code>π · P = π</code></li>
        </ul>
        <p>If you want, I can walk through a 2-state weather example next.</p>`;
    }
    if (/i\^?2|i\s*²|imaginary|complex number/.test(q)) {
      return `<p>The identity <code>i² = −1</code> is the <em>definition</em> of the imaginary unit <code>i</code>. We invent it precisely because no real number squared gives a negative.</p>
        <p>Once we accept that one rule, complex arithmetic follows naturally — for example, <code>(a + bi)(c + di) = (ac − bd) + (ad + bc)i</code> uses <code>i² = −1</code> in the middle term.</p>
        <p>Geometrically, multiplying by <code>i</code> rotates a point 90° counter-clockwise in the complex plane, and rotating twice (i × i) flips the sign — exactly <code>−1</code>.</p>`;
    }
    if (/big.?o|complexity|merge sort|binary search|fibonacci|recursion/.test(q)) {
      return `<p>Good algorithms question. The trick with <strong>Big-O</strong> is to count how the work scales with input size <code>n</code>, ignoring constants.</p>
        <ul class="msg-list">
          <li>Identify the recurrence or loop structure</li>
          <li>Count work per level × number of levels</li>
          <li>Drop constants and lower-order terms</li>
        </ul>
        <p>For example, merge sort splits the input in half each call (log n levels) and does O(n) work merging at each level → <code>O(n log n)</code>.</p>`;
    }
    if (/eigen/.test(q)) {
      return `<p>To find <strong>eigenvalues</strong> of a matrix <code>A</code>, solve <code>det(A − λI) = 0</code>. The roots are your eigenvalues.</p>
        <p>For each eigenvalue λ, find the eigenvector by solving <code>(A − λI)v = 0</code>. The non-trivial solutions span the eigenspace.</p>`;
    }
    if (/bayes|probability|disease|birthday/.test(q)) {
      return `<p><strong>Bayes' theorem</strong> updates a prior belief with new evidence: <code>P(A|B) = P(B|A) · P(A) / P(B)</code>.</p>
        <p>The classic disease-testing example shows why a high false-positive rate matters more than test accuracy when the disease is rare.</p>`;
    }
    if (/derivative|differentiat|chain rule|d\/dx/.test(q) || /tan|sin|cos|ln|sqrt|√/.test(q)) {
      return `<p>I'd start by identifying the layers. For something like <code>${escapeHtml(text)}</code>, write out the outer and inner functions, derive each, and stack with the chain rule. Open practice problem #${1 + Math.floor(Math.random() * 6)} on the right and try this same recipe.</p>`;
    }
    return `<p>Good question. Let's break <code>${escapeHtml(text)}</code> down step by step. Tell me which part you'd like to start with — the definition, an example, or a practice problem — and I'll tailor the explanation.</p>`;
  }

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
      bot.querySelector('.msg-body').innerHTML = mockReply(text);
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
        // Reveal an answer input field inline
        if (!li.querySelector('.pr-answer-row')) {
          const eq = li.querySelector('.pr-eq')?.textContent || '';
          const row = document.createElement('div');
          row.className = 'pr-answer-row';
          row.innerHTML = `
            <label class="pr-answer-label">Your answer for <code>${escapeHtml(eq)}</code></label>
            <input type="text" class="pr-answer" placeholder="e.g. 3·cos(3x + 2)" autocomplete="off" />
            <div class="pr-error" hidden>Enter an answer before submitting.</div>
          `;
          li.querySelector('.pr-foot').insertAdjacentElement('beforebegin', row);
          setTimeout(() => row.querySelector('.pr-answer')?.focus(), 0);
        }
      } else if (cur === 'working') {
        // Validate before accepting
        const input = li.querySelector('.pr-answer');
        const err = li.querySelector('.pr-error');
        const val = (input?.value || '').trim();
        if (!val) {
          if (err) err.hidden = false;
          input?.classList.add('invalid');
          input?.focus();
          return;
        }
        if (err) err.hidden = true;
        input?.classList.remove('invalid');
        input?.setAttribute('disabled', 'disabled');
        li.dataset.state = 'done';
        b.textContent = 'Correct';
        updateProgress();
      } else {
        li.dataset.state = 'ready';
        b.textContent = 'Solve';
        const row = li.querySelector('.pr-answer-row');
        if (row) row.remove();
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

  // ============== NEW CHAT ==============
  const newChatBtn = document.querySelector('.new-thread');
  newChatBtn?.addEventListener('click', () => {
    const messages = document.getElementById('messages');
    if (!messages) return;
    messages.innerHTML = `
      <article class="msg msg-bot">
        <div class="msg-row">
          <span class="msg-av msg-av-bot">A</span>
          <div class="msg-body">
            <p>New chat ready. Ask Atlas anything — math, physics, statistics, or code. I'll tailor the explanation to whichever subject you start with.</p>
          </div>
        </div>
      </article>`;
    const head = document.querySelector('.conv-head h2');
    if (head) head.textContent = 'New chat';
    const meta = document.querySelector('.conv-head .meta-row');
    if (meta) meta.textContent = 'Untitled · just started · Atlas-3 model';
    document.querySelectorAll('.thread.active').forEach(t => t.classList.remove('active'));
    composer?.focus();
    closeMobileLeft();
  });

  // ============== SETTINGS MODAL ==============
  const settingsBtn = document.querySelector('.pm-set');
  settingsBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    openSettingsModal();
  });

  function openSettingsModal() {
    if (document.getElementById('settingsModal')) return;
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.id = 'settingsModal';
    overlay.innerHTML = `
      <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="settingsTitle">
        <header class="modal-head">
          <h3 id="settingsTitle">Settings</h3>
          <button class="modal-close" aria-label="Close settings">×</button>
        </header>
        <div class="modal-body">
          <div class="set-row">
            <label for="set-model">Model</label>
            <select id="set-model"><option>Atlas-3</option><option>Atlas-2</option><option>Atlas-mini</option></select>
          </div>
          <div class="set-row">
            <label for="set-theme">Theme</label>
            <select id="set-theme"><option>Light</option><option>Dark</option><option>System</option></select>
          </div>
          <div class="set-row">
            <label for="set-steps">Step-by-step mode by default</label>
            <input type="checkbox" id="set-steps" checked />
          </div>
          <div class="set-row">
            <label for="set-sound">Sound effects</label>
            <input type="checkbox" id="set-sound" />
          </div>
        </div>
        <footer class="modal-foot">
          <button class="modal-btn-secondary" data-close>Cancel</button>
          <button class="modal-btn-primary" data-close>Save</button>
        </footer>
      </div>`;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', (ev) => {
      if (ev.target === overlay || ev.target.matches('[data-close]') || ev.target.classList.contains('modal-close')) {
        overlay.remove();
      }
    });
    document.addEventListener('keydown', escClose);
    function escClose(e) { if (e.key === 'Escape') { overlay.remove(); document.removeEventListener('keydown', escClose); } }
  }

  // ============== HEADER 'MORE' (⋯) — desktop popover / mobile drawer ==============
  const moreBtn = document.querySelector('.hd-btn[title="More"]');
  moreBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (window.matchMedia('(max-width: 720px)').matches) {
      toggleMobileLeft();
    } else {
      togglePopover(moreBtn, [
        { label: 'Rename chat', action: () => {} },
        { label: 'Pin to top', action: () => {} },
        { label: 'Export transcript', action: () => {} },
        { label: 'Delete chat', action: () => {}, danger: true },
      ]);
    }
  });

  // ============== PRACTICE BUTTON (▶ Practice) — opens right rail on mobile ==============
  const practiceBtn = document.querySelector('.hd-btn[title="Practice mode"]');
  practiceBtn?.addEventListener('click', () => {
    if (window.matchMedia('(max-width: 1024px)').matches) {
      toggleMobileRight();
    } else {
      // On desktop, scroll the right rail's first practice problem into view.
      const first = document.querySelector('.practice-list .prac');
      first?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      first?.classList.add('flash');
      setTimeout(() => first?.classList.remove('flash'), 1200);
    }
  });

  // ============== MOBILE DRAWER PLUMBING ==============
  function ensureScrim() {
    let s = document.getElementById('mobileScrim');
    if (!s) {
      s = document.createElement('div');
      s.id = 'mobileScrim';
      s.className = 'mobile-scrim';
      document.body.appendChild(s);
      s.addEventListener('click', () => { closeMobileLeft(); closeMobileRight(); });
    }
    return s;
  }
  function toggleMobileLeft() {
    const rail = document.querySelector('.left-rail');
    if (!rail) return;
    const open = rail.classList.toggle('mobile-open');
    ensureScrim().classList.toggle('show', open);
    document.body.classList.toggle('drawer-open', open || document.querySelector('.right-rail.mobile-open'));
    if (open) closeMobileRight();
  }
  function closeMobileLeft() {
    const rail = document.querySelector('.left-rail');
    rail?.classList.remove('mobile-open');
    if (!document.querySelector('.right-rail.mobile-open')) {
      document.getElementById('mobileScrim')?.classList.remove('show');
      document.body.classList.remove('drawer-open');
    }
  }
  function toggleMobileRight() {
    const rail = document.querySelector('.right-rail');
    if (!rail) return;
    const open = rail.classList.toggle('mobile-open');
    ensureScrim().classList.toggle('show', open);
    document.body.classList.toggle('drawer-open', open || document.querySelector('.left-rail.mobile-open'));
    if (open) closeMobileLeft();
  }
  function closeMobileRight() {
    const rail = document.querySelector('.right-rail');
    rail?.classList.remove('mobile-open');
    if (!document.querySelector('.left-rail.mobile-open')) {
      document.getElementById('mobileScrim')?.classList.remove('show');
      document.body.classList.remove('drawer-open');
    }
  }

  // ============== SIMPLE POPOVER (desktop ⋯) ==============
  function togglePopover(anchor, items) {
    const existing = document.getElementById('atlasPopover');
    if (existing) { existing.remove(); return; }
    const pop = document.createElement('div');
    pop.id = 'atlasPopover';
    pop.className = 'popover';
    pop.innerHTML = items.map(i => `<button class="popover-item${i.danger ? ' danger' : ''}">${i.label}</button>`).join('');
    document.body.appendChild(pop);
    const r = anchor.getBoundingClientRect();
    pop.style.top = `${r.bottom + 6}px`;
    pop.style.right = `${window.innerWidth - r.right}px`;
    pop.querySelectorAll('.popover-item').forEach((btn, i) => {
      btn.addEventListener('click', () => { items[i].action?.(); pop.remove(); });
    });
    setTimeout(() => {
      const off = (e) => {
        if (!pop.contains(e.target) && e.target !== anchor) {
          pop.remove();
          document.removeEventListener('click', off);
        }
      };
      document.addEventListener('click', off);
    }, 0);
  }

  // ============== SEARCH FILTER (chats) ==============
  const searchInput = document.querySelector('.rail-search input');
  searchInput?.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase();
    const threads = document.querySelectorAll('.rail-threads .thread');
    const sections = document.querySelectorAll('.rail-threads .rail-section');
    threads.forEach(t => {
      const match = !q || t.textContent.toLowerCase().includes(q);
      t.style.display = match ? '' : 'none';
    });
    sections.forEach(sec => {
      // Hide section header if no following threads visible until next section
      let any = false;
      let n = sec.nextElementSibling;
      while (n && !n.classList.contains('rail-section')) {
        if (n.classList.contains('thread') && n.style.display !== 'none') { any = true; break; }
        n = n.nextElementSibling;
      }
      sec.style.display = any || !q ? '' : 'none';
    });
  });

  // ============== THREAD SWITCHING (visual) ==============
  document.querySelectorAll('.rail-threads .thread').forEach(t => {
    t.addEventListener('click', () => {
      document.querySelectorAll('.rail-threads .thread').forEach(x => x.classList.remove('active'));
      t.classList.add('active');
      const head = document.querySelector('.conv-head h2');
      if (head) head.textContent = t.textContent.trim();
      closeMobileLeft();
    });
  });

  // ============== SUBJECT LINKS ==============
  document.querySelectorAll('.rail-link').forEach(a => {
    a.addEventListener('click', () => {
      document.querySelectorAll('.rail-link').forEach(x => x.classList.remove('active'));
      a.classList.add('active');
    });
  });

  autoGrow();
})();

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
