// Stratabox — landing page interactivity

(function () {
  // ============== STATS COUNTER ==============
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);
  function animateCount(el) {
    const target = parseFloat(el.dataset.target);
    const isFloat = target % 1 !== 0;
    const duration = 1200;
    const start = performance.now();
    function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      const v = target * easeOut(t);
      el.textContent = isFloat ? v.toFixed(2) : Math.round(v).toLocaleString();
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        animateCount(e.target);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('.stat-num').forEach((el) => obs.observe(el));

  // ============== HERO BLOCK ROTATION ==============
  // Subtle: every ~3s, gently swap the order of two preview blocks to suggest "live"
  const previewBlocks = document.getElementById('previewBlocks');
  if (previewBlocks) {
    setInterval(() => {
      const blocks = Array.from(previewBlocks.children);
      if (blocks.length < 4) return;
      const i = 1 + Math.floor(Math.random() * (blocks.length - 2));
      const a = blocks[i], b = blocks[i + 1];
      a.style.transition = b.style.transition = 'transform 0.4s ease';
      a.style.transform = 'translateY(34px)';
      b.style.transform = 'translateY(-34px)';
      setTimeout(() => {
        previewBlocks.insertBefore(b, a);
        a.style.transition = b.style.transition = '';
        a.style.transform = b.style.transform = '';
      }, 420);
    }, 3500);
  }

  // ============== LIVE BUILDER ==============
  const blockTypes = {
    heading:  { tag: 'H1', label: 'Heading',   placeholder: 'New section heading',           render: (t) => `<h2 class="bp-h2">${escape(t)}</h2>` },
    paragraph:{ tag: '¶',  label: 'Paragraph', placeholder: 'Body paragraph…',               render: (t) => `<p class="bp-p">${escape(t)}</p>` },
    image:    { tag: '▣',  label: 'Image',     placeholder: 'image-name.jpg · alt text',     render: (t) => `<div class="bp-img">▣ ${escape(t)}</div>` },
    callout:  { tag: '★',  label: 'Callout',   placeholder: 'Call out something important.', render: (t) => `<div class="bp-callout">★ ${escape(t)}</div>` },
    quote:    { tag: '“',  label: 'Quote',     placeholder: 'A pull quote.',                 render: (t) => `<blockquote class="bp-quote">${escape(t)}</blockquote>` },
  };
  function escape(s) { return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

  let blocks = [
    { kind: 'heading',   text: 'A field guide to coastal birds' },
    { kind: 'paragraph', text: 'Spring migration along the headlands brings dozens of species through in a matter of weeks.' },
    { kind: 'image',     text: 'puffin-headland.jpg · puffin pair on cliff' },
    { kind: 'callout',   text: 'Visit before May — the colony scatters by June.' },
    { kind: 'paragraph', text: 'Bring binoculars; the best vantage is the lower trail past the lighthouse.' },
  ];

  const blocksEl = document.getElementById('builderBlocks');
  const previewEl = document.getElementById('builderPreview');
  const statusEl = document.getElementById('builderStatus');

  function renderBuilder() {
    if (!blocksEl || !previewEl) return;
    blocksEl.innerHTML = '';
    blocks.forEach((b, idx) => {
      const row = document.createElement('div');
      row.className = 'bblock';
      row.draggable = true;
      row.dataset.idx = String(idx);

      const handle = document.createElement('span'); handle.className = 'bblock-handle'; handle.textContent = '⋮⋮';
      const sel = document.createElement('select');
      sel.setAttribute('aria-label', `Block ${idx + 1} type`);
      sel.title = 'Change block type';
      Object.entries(blockTypes).forEach(([k, v]) => {
        const opt = document.createElement('option'); opt.value = k; opt.textContent = v.label;
        if (k === b.kind) opt.selected = true;
        sel.appendChild(opt);
      });
      sel.addEventListener('change', () => { blocks[idx].kind = sel.value; renderBuilder(); markSaved(); });

      const inp = document.createElement('input');
      inp.type = 'text'; inp.value = b.text; inp.placeholder = blockTypes[b.kind].placeholder;
      inp.setAttribute('aria-label', `Block ${idx + 1} content`);
      inp.addEventListener('input', () => { blocks[idx].text = inp.value; renderPreviewOnly(); markSaving(); });

      const del = document.createElement('button');
      del.className = 'del'; del.innerHTML = '<span aria-hidden="true">×</span>';
      del.setAttribute('aria-label', `Delete block ${idx + 1}`);
      del.title = 'Delete block';
      del.type = 'button';
      del.addEventListener('click', () => { blocks.splice(idx, 1); renderBuilder(); markSaved(); });

      row.append(handle, sel, inp, del);

      // Drag-and-drop
      row.addEventListener('dragstart', (e) => {
        row.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', String(idx));
      });
      row.addEventListener('dragend', () => row.classList.remove('dragging'));
      row.addEventListener('dragover', (e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; row.style.outline = '2px dashed #14A1A1'; });
      row.addEventListener('dragleave', () => { row.style.outline = ''; });
      row.addEventListener('drop', (e) => {
        e.preventDefault(); row.style.outline = '';
        const from = parseInt(e.dataTransfer.getData('text/plain'), 10);
        const to = idx;
        if (Number.isFinite(from) && from !== to) {
          const moved = blocks.splice(from, 1)[0];
          blocks.splice(to, 0, moved);
          renderBuilder(); markSaved();
        }
      });

      blocksEl.appendChild(row);
    });
    renderPreviewOnly();
  }
  function renderPreviewOnly() {
    previewEl.innerHTML = blocks.map((b) => blockTypes[b.kind].render(b.text || blockTypes[b.kind].placeholder)).join('');
  }
  let saveTimer = null;
  let pendingDirty = false;
  function setStatus(state, message, withRetry) {
    if (!statusEl) return;
    statusEl.classList.remove('is-saving', 'is-error', 'is-offline');
    if (state) statusEl.classList.add(state);
    statusEl.innerHTML = '';
    const dot = document.createElement('span'); dot.className = 'status-dot'; dot.setAttribute('aria-hidden', 'true');
    const text = document.createElement('span'); text.textContent = message;
    statusEl.append(dot, text);
    if (withRetry) {
      const retry = document.createElement('button');
      retry.type = 'button';
      retry.className = 'status-retry';
      retry.textContent = 'Retry';
      retry.addEventListener('click', () => { pendingDirty = true; markSaving(); });
      statusEl.appendChild(retry);
    }
  }
  function markSaving() {
    if (!statusEl) return;
    pendingDirty = true;
    if (!navigator.onLine) {
      setStatus('is-offline', `${blocks.length} blocks · offline — changes will save when reconnected`, true);
      return;
    }
    setStatus('is-saving', `${blocks.length} blocks · saving…`, false);
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      if (!navigator.onLine) {
        setStatus('is-offline', `${blocks.length} blocks · offline — changes will save when reconnected`, true);
      } else {
        markSaved();
      }
    }, 600);
  }
  function markSaved() {
    pendingDirty = false;
    setStatus('', `${blocks.length} blocks · auto-saved just now`, false);
  }
  window.addEventListener('online', () => {
    if (pendingDirty) markSaving();
    else markSaved();
  });
  window.addEventListener('offline', () => {
    setStatus('is-offline', `${blocks.length} blocks · offline — changes will save when reconnected`, true);
  });
  document.querySelectorAll('.tool[data-add]').forEach((b) => {
    b.addEventListener('click', () => {
      const kind = b.dataset.add;
      blocks.push({ kind, text: blockTypes[kind].placeholder });
      renderBuilder(); markSaved();
    });
  });
  renderBuilder(); markSaved();

  // ============== SDK TABS ==============
  const samples = {
    js: `<span class="c">// Fetch one entry, typed</span>
<span class="k">import</span> { <span class="v">stratabox</span> } <span class="k">from</span> <span class="s">"@stratabox/client"</span>;

<span class="k">const</span> <span class="v">db</span> = <span class="n">stratabox</span>({
  <span class="v">project</span>: <span class="s">"halcyon"</span>,
  <span class="v">env</span>: <span class="s">"production"</span>,
  <span class="v">token</span>: process.env.STRATABOX_TOKEN,
});

<span class="k">const</span> <span class="v">post</span> = <span class="k">await</span> <span class="v">db</span>.<span class="n">articles</span>.<span class="n">get</span>({
  <span class="v">slug</span>: <span class="s">"coastal-bloom"</span>,
  <span class="v">locale</span>: <span class="s">"en-US"</span>,
  <span class="v">include</span>: [<span class="s">"author"</span>, <span class="s">"hero"</span>],
});

<span class="n">console</span>.<span class="n">log</span>(<span class="v">post</span>.title, <span class="v">post</span>.author.name);`,

    py: `<span class="c"># Fetch one entry, typed</span>
<span class="k">from</span> <span class="v">stratabox</span> <span class="k">import</span> <span class="v">Stratabox</span>

<span class="v">db</span> = <span class="n">Stratabox</span>(
    <span class="v">project</span>=<span class="s">"halcyon"</span>,
    <span class="v">env</span>=<span class="s">"production"</span>,
    <span class="v">token</span>=os.environ[<span class="s">"STRATABOX_TOKEN"</span>],
)

<span class="v">post</span> = <span class="v">db</span>.articles.get(
    <span class="v">slug</span>=<span class="s">"coastal-bloom"</span>,
    <span class="v">locale</span>=<span class="s">"en-US"</span>,
    <span class="v">include</span>=[<span class="s">"author"</span>, <span class="s">"hero"</span>],
)

<span class="n">print</span>(<span class="v">post</span>.title, <span class="v">post</span>.author.name)`,

    rb: `<span class="c"># Fetch one entry, typed</span>
<span class="k">require</span> <span class="s">"stratabox"</span>

<span class="v">db</span> = <span class="n">Stratabox</span>.<span class="n">new</span>(
  <span class="v">project</span>: <span class="s">"halcyon"</span>,
  <span class="v">env</span>: <span class="s">"production"</span>,
  <span class="v">token</span>: <span class="n">ENV</span>.<span class="n">fetch</span>(<span class="s">"STRATABOX_TOKEN"</span>),
)

<span class="v">post</span> = <span class="v">db</span>.<span class="n">articles</span>.<span class="n">get</span>(
  <span class="v">slug</span>: <span class="s">"coastal-bloom"</span>,
  <span class="v">locale</span>: <span class="s">"en-US"</span>,
  <span class="v">include</span>: [<span class="s">"author"</span>, <span class="s">"hero"</span>],
)

<span class="n">puts</span> <span class="s">"#{post.title} by #{post.author.name}"</span>`,

    curl: `<span class="c"># GraphQL endpoint, edge-cached</span>
<span class="n">curl</span> https://api.stratabox.dev/v1/graphql \\
  -H <span class="s">"Authorization: Bearer $STRATABOX_TOKEN"</span> \\
  -H <span class="s">"X-Project: halcyon"</span> \\
  -H <span class="s">"X-Environment: production"</span> \\
  -d <span class="s">'{
    "query": "query($slug: String!) {
      article(slug: $slug, locale: \\"en-US\\") {
        title
        author { name }
      }
    }",
    "variables": { "slug": "coastal-bloom" }
  }'</span>`,
  };
  const sdkCode = document.getElementById('sdkCode');
  function setLang(lang) {
    document.querySelectorAll('.sdk-tab').forEach((t) => t.classList.toggle('active', t.dataset.lang === lang));
    if (sdkCode) sdkCode.innerHTML = samples[lang];
  }
  document.querySelectorAll('.sdk-tab').forEach((t) => t.addEventListener('click', () => setLang(t.dataset.lang)));
  setLang('js');

  const copyBtn = document.getElementById('sdkCopy');
  copyBtn?.addEventListener('click', () => {
    const text = sdkCode?.innerText || '';
    navigator.clipboard?.writeText(text).catch(() => {});
    copyBtn.textContent = 'Copied!';
    copyBtn.classList.add('copied');
    setTimeout(() => { copyBtn.textContent = 'Copy'; copyBtn.classList.remove('copied'); }, 1400);
  });

  // ============== INTEGRATIONS ==============
  const palette = ['#0E7E7E','#7C3AED','#DB2777','#F59E0B','#0EA5E9','#84CC16','#EF4444','#8B5CF6','#06B6D4','#F43F5E','#10B981','#3B82F6'];
  const integrations = [
    ['Vercel','Hosting'], ['Netlify','Hosting'], ['Cloudflare','Edge'],
    ['Next.js','Framework'], ['Astro','Framework'], ['Remix','Framework'],
    ['React','Framework'], ['Vue','Framework'], ['Svelte','Framework'],
    ['Algolia','Search'], ['Typesense','Search'], ['Meilisearch','Search'],
    ['Slack','Notifications'], ['Linear','Workflow'], ['Jira','Workflow'],
    ['GitHub','Source'], ['GitLab','Source'], ['Figma','Design'],
    ['Mailchimp','Email'], ['Postmark','Email'], ['SendGrid','Email'],
    ['Cloudinary','Assets'], ['Mux','Video'], ['Imgix','Assets'],
  ];
  const grid = document.getElementById('intGrid');
  if (grid) {
    integrations.forEach(([name, cat], i) => {
      const c = palette[i % palette.length];
      const card = document.createElement('div'); card.className = 'int-card';
      card.dataset.name = name.toLowerCase();
      card.dataset.cat = cat.toLowerCase();
      card.innerHTML = `<span class="int-mark" style="background:${c}">${name[0]}</span><div class="int-name">${name}</div><div class="int-cat">${cat}</div>`;
      grid.appendChild(card);
    });
  }
  const search = document.getElementById('intSearch');
  const count = document.getElementById('intCount');
  search?.addEventListener('input', () => {
    const q = search.value.trim().toLowerCase();
    let visible = 0;
    grid?.querySelectorAll('.int-card').forEach((c) => {
      const hit = !q || c.dataset.name.includes(q) || c.dataset.cat.includes(q);
      c.classList.toggle('dim', !hit);
      if (hit) visible++;
    });
    if (count) count.textContent = `${visible} of 24`;
  });

  // Smooth-scroll for in-page links (skip modal triggers)
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      if (a.hasAttribute('data-open-signup') || a.hasAttribute('data-open-demo') ||
          a.hasAttribute('data-open-plans') || a.hasAttribute('data-open-contact')) return;
      const id = a.getAttribute('href').slice(1);
      const el = id && document.getElementById(id);
      if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  // ============== SIGNUP / CONTACT MODAL ==============
  const modal = document.getElementById('signupModal');
  const modalTitle = document.getElementById('signupTitle');
  const modalSub = document.getElementById('signupSub');
  const modalClose = document.getElementById('modalClose');
  const modalForm = document.getElementById('signupForm');
  const modalSuccess = document.getElementById('signupSuccess');
  const modalEmail = document.getElementById('signupEmail');
  let lastFocus = null;

  const modalCopy = {
    signup:  { title: 'Start your free Stratabox project', sub: 'Hobby is free forever. Tell us where to send your invite — we\'ll spin up your workspace within a minute.' },
    demo:    { title: 'Book a Stratabox demo', sub: 'Tell us a bit about your team and we\'ll set up a 30-minute walkthrough with a solutions engineer.' },
    plans:   { title: 'See full pricing & plans', sub: 'We\'re finalizing the public pricing page. Drop your email and we\'ll send the full plan breakdown today.' },
    contact: { title: 'Get in touch with Stratabox', sub: 'Sales, partnerships, or general questions — leave your email and a teammate will reply within one business day.' },
  };

  function openModal(kind) {
    if (!modal) return;
    const copy = modalCopy[kind] || modalCopy.signup;
    modalTitle.textContent = copy.title;
    modalSub.textContent = copy.sub;
    if (modalForm) modalForm.hidden = false;
    if (modalSuccess) modalSuccess.hidden = true;
    if (modalEmail) {
      modalEmail.classList.remove('is-invalid');
      const err = modalForm.querySelector('.field-error');
      if (err) err.remove();
    }
    lastFocus = document.activeElement;
    modal.hidden = false;
    document.body.classList.add('modal-open');
    setTimeout(() => modalEmail?.focus(), 30);
  }
  function closeModal() {
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove('modal-open');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  document.querySelectorAll('[data-open-signup]').forEach((el) => el.addEventListener('click', (e) => { e.preventDefault(); openModal('signup'); }));
  document.querySelectorAll('[data-open-demo]').forEach((el) => el.addEventListener('click', (e) => { e.preventDefault(); openModal('demo'); }));
  document.querySelectorAll('[data-open-plans]').forEach((el) => el.addEventListener('click', (e) => { e.preventDefault(); openModal('plans'); }));
  document.querySelectorAll('[data-open-contact]').forEach((el) => el.addEventListener('click', (e) => { e.preventDefault(); openModal('contact'); }));

  modalClose?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal && !modal.hidden) closeModal(); });

  modalForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = modalEmail.value.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    let err = modalForm.querySelector('.field-error');
    if (!valid) {
      modalEmail.classList.add('is-invalid');
      if (!err) {
        err = document.createElement('p');
        err.className = 'field-error';
        modalEmail.insertAdjacentElement('afterend', err);
      }
      err.textContent = 'Please enter a valid work email.';
      modalEmail.focus();
      return;
    }
    modalEmail.classList.remove('is-invalid');
    if (err) err.remove();
    modalForm.hidden = true;
    if (modalSuccess) modalSuccess.hidden = false;
  });
})();
