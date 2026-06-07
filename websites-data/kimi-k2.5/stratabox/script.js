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

  let dragFromIdx = null;
  function moveBlock(from, to) {
    if (!Number.isFinite(from) || !Number.isFinite(to) || from === to || from < 0 || from >= blocks.length) return;
    const moved = blocks.splice(from, 1)[0];
    const insertAt = Math.max(0, Math.min(blocks.length, to));
    blocks.splice(insertAt, 0, moved);
    renderBuilder(); markSaved();
  }
  function renderBuilder() {
    if (!blocksEl || !previewEl) return;
    blocksEl.innerHTML = '';
    blocks.forEach((b, idx) => {
      const row = document.createElement('div');
      row.className = 'bblock';
      row.draggable = true;
      row.dataset.idx = String(idx);

      const handle = document.createElement('span');
      handle.className = 'bblock-handle';
      handle.textContent = '⋮⋮';
      handle.title = 'Drag to reorder';
      handle.setAttribute('aria-label', 'Drag handle');

      const sel = document.createElement('select');
      sel.setAttribute('aria-label', 'Block type');
      Object.entries(blockTypes).forEach(([k, v]) => {
        const opt = document.createElement('option'); opt.value = k; opt.textContent = v.label;
        if (k === b.kind) opt.selected = true;
        sel.appendChild(opt);
      });
      sel.addEventListener('change', () => { blocks[idx].kind = sel.value; renderBuilder(); markSaved(); });

      const inp = document.createElement('input');
      inp.type = 'text'; inp.value = b.text; inp.placeholder = blockTypes[b.kind].placeholder;
      inp.setAttribute('aria-label', `${blockTypes[b.kind].label} text`);
      inp.addEventListener('input', () => { blocks[idx].text = inp.value; renderPreviewOnly(); markSaving(); });

      // Up/down buttons (mobile- and keyboard-friendly reorder fallback)
      const up = document.createElement('button');
      up.className = 'reorder'; up.type = 'button'; up.textContent = '↑';
      up.title = 'Move up'; up.setAttribute('aria-label', 'Move block up');
      up.disabled = idx === 0;
      up.addEventListener('click', (e) => { e.stopPropagation(); moveBlock(idx, idx - 1); });

      const down = document.createElement('button');
      down.className = 'reorder'; down.type = 'button'; down.textContent = '↓';
      down.title = 'Move down'; down.setAttribute('aria-label', 'Move block down');
      down.disabled = idx === blocks.length - 1;
      down.addEventListener('click', (e) => { e.stopPropagation(); moveBlock(idx, idx + 1); });

      const del = document.createElement('button');
      del.className = 'del'; del.type = 'button'; del.textContent = '×';
      del.title = 'Delete block'; del.setAttribute('aria-label', 'Delete block');
      del.addEventListener('click', (e) => { e.stopPropagation(); blocks.splice(idx, 1); renderBuilder(); markSaved(); });

      row.append(handle, sel, inp, up, down, del);

      // Drag-and-drop — use a module-level dragFromIdx for reliability,
      // and compute the drop target from pointer Y so reordering is intuitive.
      row.addEventListener('dragstart', (e) => {
        dragFromIdx = idx;
        row.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        try { e.dataTransfer.setData('text/plain', String(idx)); } catch (_) {}
      });
      row.addEventListener('dragend', () => {
        row.classList.remove('dragging');
        dragFromIdx = null;
        blocksEl.querySelectorAll('.bblock').forEach((r) => r.classList.remove('drag-over-top', 'drag-over-bottom'));
      });
      row.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        const rect = row.getBoundingClientRect();
        const before = (e.clientY - rect.top) < rect.height / 2;
        row.classList.toggle('drag-over-top', before);
        row.classList.toggle('drag-over-bottom', !before);
      });
      row.addEventListener('dragleave', () => {
        row.classList.remove('drag-over-top', 'drag-over-bottom');
      });
      row.addEventListener('drop', (e) => {
        e.preventDefault();
        const rect = row.getBoundingClientRect();
        const before = (e.clientY - rect.top) < rect.height / 2;
        row.classList.remove('drag-over-top', 'drag-over-bottom');
        let from = dragFromIdx;
        if (from === null) {
          const txt = e.dataTransfer.getData('text/plain');
          from = parseInt(txt, 10);
        }
        let to = idx + (before ? 0 : 1);
        if (Number.isFinite(from) && from !== idx) {
          // adjust index when removing earlier item
          if (from < to) to -= 1;
          moveBlock(from, to);
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
  function markSaving() {
    if (!statusEl) return;
    statusEl.textContent = `${blocks.length} blocks · saving…`;
    clearTimeout(saveTimer);
    saveTimer = setTimeout(markSaved, 600);
  }
  function markSaved() { if (statusEl) statusEl.textContent = `${blocks.length} blocks · auto-saved just now`; }
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

  // Smooth-scroll for in-page links
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href').slice(1);
      const el = id && document.getElementById(id);
      if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  // ============== TOAST / MODAL FEEDBACK FOR CTAs & PLACEHOLDER LINKS ==============
  // Toast helper — gives visible feedback for any action that doesn't navigate yet.
  function showToast(msg) {
    let host = document.getElementById('sbToastHost');
    if (!host) {
      host = document.createElement('div');
      host.id = 'sbToastHost';
      host.className = 'sb-toast-host';
      host.setAttribute('role', 'status');
      host.setAttribute('aria-live', 'polite');
      document.body.appendChild(host);
    }
    const t = document.createElement('div');
    t.className = 'sb-toast';
    t.textContent = msg;
    host.appendChild(t);
    requestAnimationFrame(() => t.classList.add('in'));
    setTimeout(() => {
      t.classList.remove('in');
      setTimeout(() => t.remove(), 220);
    }, 2400);
  }

  // Pricing modal — full plan tiers shown inline rather than navigating away.
  function openPricingModal() {
    if (document.getElementById('sbPricingModal')) return;
    const wrap = document.createElement('div');
    wrap.id = 'sbPricingModal';
    wrap.className = 'sb-modal-wrap';
    wrap.innerHTML = `
      <div class="sb-modal-backdrop" data-close="1"></div>
      <div class="sb-modal" role="dialog" aria-modal="true" aria-labelledby="sbPricingTitle">
        <button class="sb-modal-close" type="button" aria-label="Close">×</button>
        <div class="sb-modal-head">
          <span class="eyebrow">Pricing</span>
          <h2 id="sbPricingTitle">Plans for every team.</h2>
          <p>Start on Hobby, scale to Enterprise. Switch any time — no migration required.</p>
        </div>
        <div class="sb-modal-tiers">
          <div class="sb-tier">
            <div class="sb-tier-name">Hobby</div>
            <div class="sb-tier-price">Free<span> forever</span></div>
            <ul>
              <li>1 project · 2 environments</li>
              <li>5 GB asset CDN</li>
              <li>Community support</li>
            </ul>
            <button class="btn btn-ghost sb-tier-cta" data-cta="hobby">Get started</button>
          </div>
          <div class="sb-tier sb-tier-featured">
            <div class="sb-tier-name">Team</div>
            <div class="sb-tier-price">$59<span>/mo</span></div>
            <ul>
              <li>Unlimited environments</li>
              <li>50 GB asset CDN · 280 POPs</li>
              <li>Role-based access &amp; SSO</li>
              <li>Priority support</li>
            </ul>
            <button class="btn btn-primary sb-tier-cta" data-cta="team">Start Team trial</button>
          </div>
          <div class="sb-tier">
            <div class="sb-tier-name">Enterprise</div>
            <div class="sb-tier-price">Custom</div>
            <ul>
              <li>Dedicated regions · BYO cloud</li>
              <li>SOC 2 / ISO / DPA</li>
              <li>Architect-led onboarding</li>
            </ul>
            <button class="btn btn-ghost sb-tier-cta" data-cta="enterprise">Contact sales</button>
          </div>
        </div>
      </div>`;
    document.body.appendChild(wrap);
    document.body.style.overflow = 'hidden';
    const close = () => {
      wrap.remove();
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    wrap.querySelector('.sb-modal-close').addEventListener('click', close);
    wrap.querySelector('.sb-modal-backdrop').addEventListener('click', close);
    wrap.querySelectorAll('.sb-tier-cta').forEach((b) => {
      b.addEventListener('click', () => {
        const which = b.dataset.cta;
        showToast(which === 'enterprise' ? 'Sales will be in touch shortly.' : `Spinning up your ${which[0].toUpperCase() + which.slice(1)} workspace…`);
        close();
      });
    });
    requestAnimationFrame(() => wrap.classList.add('in'));
  }

  // Wire CTAs and placeholder links so they always give visible feedback.
  function ctaText(a) {
    return (a.textContent || '').replace(/[→×]/g, '').trim();
  }
  document.querySelectorAll('a[href="#"], a[href=""]').forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const label = ctaText(a);
      // Briefly show an active state for visible affordance
      a.classList.add('cta-pulse');
      setTimeout(() => a.classList.remove('cta-pulse'), 320);

      if (/see full plans/i.test(label)) { openPricingModal(); return; }
      if (/start free|book a demo|start team/i.test(label)) { showToast(`Opening sign-up — ${label}`); return; }
      if (/sign in/i.test(label)) { showToast('Sign-in is on the roadmap for this demo.'); return; }
      if (label) { showToast(`${label} — coming soon in this demo`); return; }
      showToast('Coming soon in this demo');
    });
  });

  // Buttons that have no href but still need feedback (e.g. teaser CTAs that are <a> already handled).
})();
