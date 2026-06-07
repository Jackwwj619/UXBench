// Runeforge docs — interactivity (theme, search, code tabs, scroll-spy)

(function () {
  // ============== THEME TOGGLE ==============
  const themeBtn = document.getElementById('themeToggle');
  themeBtn?.addEventListener('click', () => {
    const cur = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
    document.body.dataset.theme = cur;
    themeBtn.textContent = cur === 'dark' ? '☀' : '☾';
    try { localStorage.setItem('runeforge:theme', cur); } catch {}
  });
  try {
    const stored = localStorage.getItem('runeforge:theme');
    if (stored) {
      document.body.dataset.theme = stored;
      themeBtn && (themeBtn.textContent = stored === 'dark' ? '☀' : '☾');
    }
  } catch {}

  // ============== SEARCH DIALOG ==============
  const dialog = document.getElementById('searchDialog');
  const searchTrigger = document.getElementById('searchTrigger');
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');

  const searchIndex = [
    { title: 'forge() — create a store', cat: 'API', href: 'api-reference.html#forge' },
    { title: 'derive() — derived stores', cat: 'API', href: 'api-reference.html#derive' },
    { title: 'use() — middleware', cat: 'API', href: 'api-reference.html#use' },
    { title: 'asyncSlice() — typed async helper', cat: 'API', href: 'api-reference.html#asyncSlice' },
    { title: 'listSlice() — keyed CRUD helper', cat: 'API', href: 'api-reference.html#listSlice' },
    { title: 'devtools() — middleware', cat: 'API', href: 'api-reference.html#devtools' },
    { title: 'useStore() — React hook', cat: 'React', href: 'api-reference.html#useStore' },
    { title: 'useSnapshot() — React hook', cat: 'React', href: 'api-reference.html#useSnapshot' },
    { title: 'Quickstart (5 min)', cat: 'Guide', href: 'guide-quickstart.html' },
    { title: 'Stores — core concept', cat: 'Guide', href: 'guide-stores.html' },
    { title: 'Actions & selectors', cat: 'Guide', href: 'guide-actions.html' },
    { title: 'Composing stores', cat: 'Guide', href: 'guide-stores.html#composing' },
    { title: 'SSR & serialization', cat: 'Guide', href: 'guide-stores.html#ssr' },
    { title: 'Testing stores', cat: 'Guide', href: 'guide-stores.html#testing' },
    { title: 'Action middleware', cat: 'Guide', href: 'guide-actions.html#middleware' },
    { title: 'Error code RF001 — Action returned non-object', cat: 'Errors', href: 'api-reference.html#errors' },
    { title: 'Error code RF002 — Mutation detected', cat: 'Errors', href: 'api-reference.html#errors' },
    { title: 'Counter example', cat: 'Example', href: 'examples.html' },
    { title: 'Todo list (with derived store)', cat: 'Example', href: 'examples.html' },
    { title: 'Async fetcher', cat: 'Example', href: 'examples.html' },
  ];
  function openSearch() {
    if (!dialog?.showModal) return;
    dialog.showModal();
    searchInput.value = '';
    renderSearch('');
    setTimeout(() => searchInput.focus(), 30);
  }
  function renderSearch(q) {
    const ql = q.toLowerCase();
    const hits = searchIndex.filter((it) => !ql || it.title.toLowerCase().includes(ql) || it.cat.toLowerCase().includes(ql)).slice(0, 8);
    searchResults.innerHTML = hits.map((it, i) => `<li data-i="${i}" data-href="${it.href}" class="${i === 0 ? 'active' : ''}">${it.title}<span class="sr-cat">${it.cat}</span></li>`).join('');
    searchResults.querySelectorAll('li').forEach((li) => li.addEventListener('click', () => { location.href = li.dataset.href; dialog.close(); }));
  }
  searchTrigger?.addEventListener('click', openSearch);
  searchInput?.addEventListener('input', () => renderSearch(searchInput.value));
  searchInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') dialog.close();
    if (e.key === 'Enter') {
      const sel = searchResults.querySelector('li.active');
      if (sel) { location.href = sel.dataset.href; dialog.close(); }
    }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const items = [...searchResults.querySelectorAll('li')];
      const idx = items.findIndex((li) => li.classList.contains('active'));
      const next = e.key === 'ArrowDown' ? Math.min(items.length - 1, idx + 1) : Math.max(0, idx - 1);
      items.forEach((li, i) => li.classList.toggle('active', i === next));
    }
  });
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openSearch();
    }
    if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
      e.preventDefault();
      openSearch();
    }
  });

  // ============== CODE TAB SWITCHING (hello example) ==============
  const heloSamples = {
    vanilla: `<span class="k">import</span> { forge } <span class="k">from</span> <span class="s">"runeforge"</span>;

<span class="k">const</span> counter = <span class="n">forge</span>({
  state: { count: <span class="num">0</span> },
  actions: {
    <span class="n">inc</span>: (s) =&gt; ({ count: s.count + <span class="num">1</span> }),
  },
});

counter.<span class="n">subscribe</span>((s) =&gt; document.title = <span class="s">\`Count: \${s.count}\`</span>);
counter.<span class="n">inc</span>(); <span class="c">// Count: 1</span>`,
    react: `<span class="k">import</span> { forge } <span class="k">from</span> <span class="s">"runeforge"</span>;
<span class="k">import</span> { useStore } <span class="k">from</span> <span class="s">"@runeforge/react"</span>;

<span class="k">const</span> counter = <span class="n">forge</span>({
  state: { count: <span class="num">0</span> },
  actions: { <span class="n">inc</span>: (s) =&gt; ({ count: s.count + <span class="num">1</span> }) },
});

<span class="k">function</span> <span class="n">Counter</span>() {
  <span class="k">const</span> count = <span class="n">useStore</span>(counter, (s) =&gt; s.count);
  <span class="k">return</span> &lt;button onClick={counter.<span class="n">inc</span>}&gt;{count}&lt;/button&gt;;
}`,
    solid: `<span class="k">import</span> { forge } <span class="k">from</span> <span class="s">"runeforge"</span>;
<span class="k">import</span> { useStore } <span class="k">from</span> <span class="s">"@runeforge/solid"</span>;

<span class="k">const</span> counter = <span class="n">forge</span>({
  state: { count: <span class="num">0</span> },
  actions: { <span class="n">inc</span>: (s) =&gt; ({ count: s.count + <span class="num">1</span> }) },
});

<span class="k">export function</span> <span class="n">Counter</span>() {
  <span class="k">const</span> count = <span class="n">useStore</span>(counter, (s) =&gt; s.count);
  <span class="k">return</span> &lt;button onClick={counter.<span class="n">inc</span>}&gt;{count()}&lt;/button&gt;;
}`,
    svelte: `<span class="c">&lt;!-- Counter.svelte --&gt;</span>
<span class="c">&lt;script&gt;</span>
  <span class="k">import</span> { forge } <span class="k">from</span> <span class="s">"runeforge"</span>;
  <span class="k">import</span> { useStore } <span class="k">from</span> <span class="s">"@runeforge/svelte"</span>;

  <span class="k">const</span> counter = <span class="n">forge</span>({
    state: { count: <span class="num">0</span> },
    actions: { <span class="n">inc</span>: (s) =&gt; ({ count: s.count + <span class="num">1</span> }) },
  });

  <span class="k">const</span> count = <span class="n">useStore</span>(counter, (s) =&gt; s.count);
<span class="c">&lt;/script&gt;</span>

<span class="c">&lt;button on:click={counter.inc}&gt;{$count}&lt;/button&gt;</span>`,
    vue: `<span class="c">&lt;!-- Counter.vue --&gt;</span>
<span class="c">&lt;script setup&gt;</span>
<span class="k">import</span> { forge } <span class="k">from</span> <span class="s">"runeforge"</span>;
<span class="k">import</span> { useStore } <span class="k">from</span> <span class="s">"@runeforge/vue"</span>;

<span class="k">const</span> counter = <span class="n">forge</span>({
  state: { count: <span class="num">0</span> },
  actions: { <span class="n">inc</span>: (s) =&gt; ({ count: s.count + <span class="num">1</span> }) },
});

<span class="k">const</span> count = <span class="n">useStore</span>(counter, (s) =&gt; s.count);
<span class="c">&lt;/script&gt;</span>

<span class="c">&lt;template&gt;</span>
  <span class="c">&lt;button @click="counter.inc"&gt;{{ count }}&lt;/button&gt;</span>
<span class="c">&lt;/template&gt;</span>`,
  };
  const codeHello = document.getElementById('codeHello');
  function setHello(fw) {
    if (!codeHello) return;
    codeHello.innerHTML = heloSamples[fw];
    document.querySelectorAll('.code-tab[data-fw]').forEach((b) => b.classList.toggle('active', b.dataset.fw === fw));
  }
  document.querySelectorAll('.code-tab[data-fw]').forEach((b) => b.addEventListener('click', () => setHello(b.dataset.fw)));
  setHello('vanilla');

  // Install code per package manager
  const installCmds = { npm: 'npm install', pnpm: 'pnpm add', yarn: 'yarn add', bun: 'bun add' };
  document.querySelectorAll('.code-tab[data-pkg]').forEach((b) => b.addEventListener('click', () => {
    document.querySelectorAll('.code-tab[data-pkg]').forEach((x) => x.classList.toggle('active', x === b));
    const cmd = document.querySelector('#codeInstall .cmd');
    if (cmd) cmd.textContent = installCmds[b.dataset.pkg];
  }));

  // Copy buttons
  document.querySelectorAll('.code-copy').forEach((btn) => {
    btn.addEventListener('click', () => {
      const block = btn.closest('.code-tabs')?.querySelector('.code-block, pre');
      const text = block ? block.innerText : '';
      navigator.clipboard?.writeText(text).catch(() => {});
      btn.textContent = 'Copied!';
      btn.classList.add('copied');
      setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 1300);
    });
  });

  // ============== SCROLL-SPY (right TOC + sub-anchor TOC items in left sidebar) ==============
  const ptocLinks = document.querySelectorAll('.ptoc-link');
  // Left-sidebar items that point to in-page anchors (e.g. api-reference Overview sub-items).
  const leftAnchorItems = [...document.querySelectorAll('.docs-toc .toc-item')]
    .filter((a) => (a.getAttribute('href') || '').startsWith('#'));
  // Track the parent .toc-item.active that was set statically by the page (e.g. "Overview"
  // on api-reference). When a sub-anchor becomes active we want to suppress that parent's
  // active state so we don't show two highlights at once.
  const staticParentActive = document.querySelector('.docs-toc .toc-item.active:not(.ptoc-sub)');
  const staticParentHref = staticParentActive?.getAttribute('href') || '';

  if (ptocLinks.length || leftAnchorItems.length) {
    const headings = [...document.querySelectorAll('h1[id], h2[id], h3[id]')];
    function activate(id) {
      const hash = '#' + id;
      ptocLinks.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === hash));
      if (leftAnchorItems.length) {
        let matchedSub = false;
        leftAnchorItems.forEach((l) => {
          const isMatch = l.getAttribute('href') === hash;
          l.classList.toggle('active', isMatch);
          if (isMatch) matchedSub = true;
        });
        // If a sub-anchor matched, suppress the static "Overview"-style parent highlight.
        // If no sub-anchor matched (we're at the top), restore it.
        if (staticParentActive) {
          if (matchedSub) staticParentActive.classList.remove('active');
          else if (!staticParentHref.startsWith('#')) staticParentActive.classList.add('active');
        }
      }
    }
    const obs = new IntersectionObserver((entries) => {
      const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) activate(visible[0].target.id);
    }, { rootMargin: '-80px 0px -60% 0px' });
    headings.forEach((h) => obs.observe(h));
  }

  // ============== EXAMPLES PAGE ==============
  const examples = [
    { title: 'Counter (the canonical hello-world)', tag: 'beginner', desc: 'The smallest possible Runeforge app. Single store, three actions, one component.', loc: '34 LOC', adapter: 'React' },
    { title: 'Todo list with persistence', tag: 'beginner', desc: 'Add / toggle / delete todos. State persists to localStorage with one option.', loc: '88 LOC', adapter: 'React' },
    { title: 'Async fetcher with retry', tag: 'beginner', desc: 'asyncSlice() pattern. Loads users with exponential-backoff retry on failure.', loc: '110 LOC', adapter: 'Vue 3' },
    { title: 'Multi-step form (typed)', tag: 'intermediate', desc: 'Uses formSlice() to manage values, errors, touched state, and submission.', loc: '210 LOC', adapter: 'React' },
    { title: 'Optimistic comments', tag: 'intermediate', desc: 'Show comments instantly, roll back on server error. Uses derive() + middleware.', loc: '180 LOC', adapter: 'Solid' },
    { title: 'Realtime presence', tag: 'intermediate', desc: 'WebSocket push updates per-user presence and merges into store.', loc: '240 LOC', adapter: 'Svelte 5' },
    { title: 'Routing-aware state', tag: 'intermediate', desc: 'Read URL params into a store; navigation is just an action.', loc: '160 LOC', adapter: 'React' },
    { title: 'Undo / redo with snapshots', tag: 'advanced', desc: 'Time-travel using built-in snapshot support. Cmd-Z / Cmd-Shift-Z.', loc: '320 LOC', adapter: 'React' },
    { title: 'Server-side rendered shop', tag: 'advanced ssr', desc: 'Full SSR + hydration of multiple stores. Includes server-only state.', loc: '460 LOC', adapter: 'React (Next 15)' },
    { title: 'Markdown editor with autosave', tag: 'advanced', desc: 'Debounced autosave middleware, file-system adapter, and conflict detection.', loc: '420 LOC', adapter: 'Vanilla JS' },
    { title: 'Spreadsheet with cross-cell formulas', tag: 'advanced', desc: 'Each cell is a derived store; recompute graph triggered by edits.', loc: '480 LOC', adapter: 'Solid' },
    { title: 'Drag-and-drop kanban (SSR)', tag: 'advanced ssr', desc: 'Move cards between columns; renders identically on server and client.', loc: '440 LOC', adapter: 'React (Next 15)' },
  ];
  const grid = document.getElementById('exampleGrid');
  if (grid) {
    function render() {
      const q = document.getElementById('exFilter').value.toLowerCase();
      const tag = document.querySelector('.ex-tag.active')?.dataset.tag || 'all';
      grid.innerHTML = '';
      let visible = 0;
      examples.forEach((e) => {
        const tagOk = tag === 'all' || e.tag.includes(tag);
        const qOk = !q || e.title.toLowerCase().includes(q) || e.desc.toLowerCase().includes(q) || e.adapter.toLowerCase().includes(q);
        if (!tagOk || !qOk) return;
        visible++;
        const card = document.createElement('div');
        card.className = 'ex-card';
        card.innerHTML = `
          <span class="ex-pill">${e.tag.split(' ')[0]}</span>
          <h3>${e.title}</h3>
          <p>${e.desc}</p>
          <div class="ex-foot"><span>${e.adapter}</span><span>${e.loc}</span></div>`;
        grid.appendChild(card);
      });
      let empty = grid.querySelector('.ex-empty');
      if (visible === 0) {
        if (!empty) {
          empty = document.createElement('div');
          empty.className = 'ex-empty';
          empty.textContent = 'No examples match your filter.';
          grid.appendChild(empty);
        }
      } else if (empty) {
        empty.remove();
      }
    }
    document.getElementById('exFilter')?.addEventListener('input', render);
    document.querySelectorAll('.ex-tag').forEach((t) => t.addEventListener('click', () => {
      document.querySelectorAll('.ex-tag').forEach((x) => x.classList.toggle('active', x === t));
      render();
    }));
    render();
  }

  // Disable click on placeholder links so they don't append "#" to the URL.
  document.querySelectorAll('a.is-disabled, a[aria-disabled="true"]').forEach((a) => {
    a.addEventListener('click', (e) => { e.preventDefault(); });
  });

  // Smooth scroll for in-page anchors, accounting for the sticky header.
  function scrollToHeading(el, hash) {
    const headerH = (document.querySelector('.topnav')?.getBoundingClientRect().height || 64) + 12;
    const top = el.getBoundingClientRect().top + window.scrollY - headerH;
    window.scrollTo({ top, behavior: 'smooth' });
    if (hash) history.replaceState(null, '', hash);
  }
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    const href = a.getAttribute('href');
    if (href.length < 2) return;
    a.addEventListener('click', (e) => {
      const el = document.getElementById(href.slice(1));
      if (el) { e.preventDefault(); scrollToHeading(el, href); closeMobileNav(); }
    });
  });

  // ============== MOBILE NAV TOGGLE ==============
  const navToggle = document.getElementById('navToggle');
  // Hide the hamburger entirely on pages without a sidebar (e.g. Examples).
  if (navToggle && !document.querySelector('.docs-toc')) navToggle.style.display = 'none';
  function openMobileNav() {
    document.body.classList.add('nav-open');
    navToggle?.setAttribute('aria-expanded', 'true');
  }
  function closeMobileNav() {
    document.body.classList.remove('nav-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  }
  navToggle?.addEventListener('click', () => {
    if (document.body.classList.contains('nav-open')) closeMobileNav();
    else openMobileNav();
  });
  // Close drawer when tapping the overlay or pressing Escape, and when a nav link is followed.
  document.addEventListener('click', (e) => {
    if (!document.body.classList.contains('nav-open')) return;
    const drawer = document.querySelector('.docs-toc');
    if (drawer && !drawer.contains(e.target) && !navToggle?.contains(e.target)) closeMobileNav();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMobileNav(); });
  document.querySelectorAll('.docs-toc a').forEach((a) => a.addEventListener('click', () => {
    if (window.matchMedia('(max-width: 820px)').matches) closeMobileNav();
  }));
})();
