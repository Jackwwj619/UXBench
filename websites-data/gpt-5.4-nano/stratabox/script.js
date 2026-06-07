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
  // Subtle: every ~5s, gently swap the order of two preview blocks to suggest "live".
  // Pauses when the user interacts anywhere on the preview to avoid confusing edit feedback.
  const previewBlocks = document.getElementById('previewBlocks');
  const heroPreview = document.getElementById('heroPreview');
  let heroPaused = false;
  if (heroPreview) {
    const pause = () => { heroPaused = true; clearTimeout(resumeTimer); resumeTimer = setTimeout(() => { heroPaused = false; }, 8000); };
    let resumeTimer = null;
    ['pointerdown', 'focusin', 'mouseenter'].forEach((ev) => heroPreview.addEventListener(ev, pause));
  }
  if (previewBlocks) {
    setInterval(() => {
      if (heroPaused) return;
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
    }, 5000);
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
      handle.setAttribute('aria-hidden', 'true');
      const sel = document.createElement('select');
      sel.setAttribute('aria-label', `Block ${idx + 1} type`);
      Object.entries(blockTypes).forEach(([k, v]) => {
        const opt = document.createElement('option'); opt.value = k; opt.textContent = v.label;
        if (k === b.kind) opt.selected = true;
        sel.appendChild(opt);
      });
      sel.addEventListener('change', () => { blocks[idx].kind = sel.value; renderBuilder(); flashBlock(idx); markSaved(); });

      const inp = document.createElement('input');
      inp.type = 'text'; inp.value = b.text; inp.placeholder = blockTypes[b.kind].placeholder;
      inp.setAttribute('aria-label', `Block ${idx + 1} text`);
      inp.addEventListener('input', () => { blocks[idx].text = inp.value; renderPreviewOnly(idx); markSaving(); });

      const del = document.createElement('button');
      del.className = 'del'; del.textContent = '×'; del.title = 'Delete block';
      del.setAttribute('aria-label', `Delete block ${idx + 1}`);
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
  function renderPreviewOnly(highlightIdx) {
    previewEl.innerHTML = blocks.map((b) => blockTypes[b.kind].render(b.text || blockTypes[b.kind].placeholder)).join('');
    if (typeof highlightIdx === 'number') {
      const node = previewEl.children[highlightIdx];
      if (node) {
        node.classList.add('bp-flash');
        setTimeout(() => node.classList.remove('bp-flash'), 900);
      }
    }
  }
  function flashBlock(idx) {
    const row = blocksEl?.children[idx];
    if (!row) return;
    row.classList.add('bblock-flash');
    setTimeout(() => row.classList.remove('bblock-flash'), 900);
  }
  let saveTimer = null;
  function markSaving() {
    if (!statusEl) return;
    statusEl.textContent = `${blocks.length} blocks · Saving…`;
    statusEl.classList.remove('saved'); statusEl.classList.add('saving');
    clearTimeout(saveTimer);
    saveTimer = setTimeout(markSaved, 600);
  }
  function markSaved() {
    if (!statusEl) return;
    statusEl.textContent = `${blocks.length} blocks · ✓ Saved`;
    statusEl.classList.remove('saving'); statusEl.classList.add('saved');
  }
  document.querySelectorAll('.tool[data-add]').forEach((b) => {
    b.addEventListener('click', () => {
      const kind = b.dataset.add;
      blocks.push({ kind, text: blockTypes[kind].placeholder });
      const newIdx = blocks.length - 1;
      renderBuilder();
      flashBlock(newIdx);
      const newRow = blocksEl?.children[newIdx];
      if (newRow && newRow.scrollIntoView) newRow.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      markSaved();
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
    document.querySelectorAll('.sdk-tab').forEach((t) => {
      const on = t.dataset.lang === lang;
      t.classList.toggle('active', on);
      t.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    if (sdkCode) sdkCode.innerHTML = samples[lang];
  }
  document.querySelectorAll('.sdk-tab').forEach((t) => t.addEventListener('click', () => setLang(t.dataset.lang)));
  setLang('js');

  const copyBtn = document.getElementById('sdkCopy');
  function showToast(msg, ok) {
    let toast = document.getElementById('sdkToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'sdkToast';
      toast.className = 'sdk-toast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      copyBtn?.parentElement?.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.toggle('error', !ok);
    toast.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.remove('show'), 1800);
  }
  copyBtn?.addEventListener('click', async () => {
    const text = sdkCode?.innerText || '';
    let ok = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        ok = true;
      } else {
        const ta = document.createElement('textarea');
        ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select();
        ok = document.execCommand('copy');
        document.body.removeChild(ta);
      }
    } catch (_) { ok = false; }
    copyBtn.textContent = ok ? '✓ Copied' : '⚠ Copy failed';
    copyBtn.classList.toggle('copied', ok);
    showToast(ok ? 'Copied to clipboard' : 'Copy failed — select and copy manually', ok);
    setTimeout(() => { copyBtn.textContent = 'Copy'; copyBtn.classList.remove('copied'); }, 1800);
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

  // Smooth-scroll + visible target highlight for in-page links
  function highlightSection(el) {
    if (!el) return;
    el.classList.add('section-target');
    setTimeout(() => el.classList.remove('section-target'), 1600);
  }
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const id = href.slice(1);
      const el = id && document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        highlightSection(el);
        try { history.replaceState(null, '', `#${id}`); } catch (_) {}
        if (a.dataset.action === 'book-demo') {
          setTimeout(() => document.querySelector('#demoForm input[name="email"]')?.focus(), 600);
        }
      }
    });
  });

  // Demo / contact form handler
  const demoForm = document.getElementById('demoForm');
  const demoConfirm = document.getElementById('demoConfirm');
  demoForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = demoForm.querySelector('input[name="email"]');
    if (!email || !email.value || !email.checkValidity()) {
      email?.focus();
      email?.reportValidity();
      return;
    }
    if (demoConfirm) {
      demoConfirm.hidden = false;
      demoConfirm.classList.add('show');
    }
    demoForm.querySelector('button[type="submit"]').textContent = '✓ Request sent';
  });
})();
