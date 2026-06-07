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
  function gotoResult(href) {
    // Close the dialog FIRST so its overlay/backdrop never intercepts subsequent
    // pointer/scroll events, then navigate. Same-page hash links would otherwise
    // leave the modal open with `pointer-events` still active.
    try { dialog.close(); } catch {}
    // Defer navigation to next frame so dialog teardown completes.
    requestAnimationFrame(() => {
      const [path, hash] = href.split('#');
      const samePage = !path || path === location.pathname.split('/').pop() || path === '';
      if (samePage && hash) {
        const el = document.getElementById(hash);
        if (el) {
          history.replaceState(null, '', '#' + hash);
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
      }
      location.href = href;
    });
  }
  function renderSearch(q) {
    const ql = q.toLowerCase();
    const hits = searchIndex.filter((it) => !ql || it.title.toLowerCase().includes(ql) || it.cat.toLowerCase().includes(ql)).slice(0, 8);
    if (!hits.length) {
      searchResults.innerHTML = `<li class="sr-empty">No results for “${q}”.</li>`;
      return;
    }
    searchResults.innerHTML = hits.map((it, i) => `<li data-i="${i}" data-href="${it.href}" class="${i === 0 ? 'active' : ''}">${it.title}<span class="sr-cat">${it.cat}</span></li>`).join('');
    searchResults.querySelectorAll('li[data-href]').forEach((li) => {
      li.addEventListener('click', () => gotoResult(li.dataset.href));
    });
  }
  searchTrigger?.addEventListener('click', openSearch);
  searchInput?.addEventListener('input', () => renderSearch(searchInput.value));
  // Backdrop click closes dialog (clicking the dialog element itself outside its content)
  dialog?.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });
  searchInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') dialog.close();
    if (e.key === 'Enter') {
      e.preventDefault();
      const sel = searchResults.querySelector('li.active');
      if (sel && sel.dataset.href) gotoResult(sel.dataset.href);
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

  // ============== SCROLL-SPY (right TOC) ==============
  const ptocLinks = document.querySelectorAll('.ptoc-link');
  if (ptocLinks.length) {
    const headings = [...document.querySelectorAll('h1[id], h2[id], h3[id]')];
    function activate(id) {
      ptocLinks.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === '#' + id));
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
    const filterInput = document.getElementById('exFilter');
    // Pre-compute counts per tag for the chip labels and the "All (N)" counter.
    const tagCounts = { all: examples.length };
    examples.forEach((e) => {
      e.tag.split(' ').forEach((t) => { tagCounts[t] = (tagCounts[t] || 0) + 1; });
    });
    document.querySelectorAll('.ex-tag').forEach((chip) => {
      const t = chip.dataset.tag;
      if (t && t !== 'all' && tagCounts[t] != null) {
        chip.textContent = `${chip.textContent.trim()} (${tagCounts[t]})`;
      }
    });

    function render() {
      const q = (filterInput?.value || '').toLowerCase().trim();
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
      if (visible === 0) {
        const empty = document.createElement('div');
        empty.className = 'ex-empty';
        empty.innerHTML = `<p><strong>No examples match.</strong></p><p>Try a different keyword or <button type="button" class="ex-clear">clear the filter</button>.</p>`;
        grid.appendChild(empty);
        empty.querySelector('.ex-clear')?.addEventListener('click', () => {
          if (filterInput) filterInput.value = '';
          document.querySelectorAll('.ex-tag').forEach((x) => x.classList.toggle('active', x.dataset.tag === 'all'));
          render();
          filterInput?.focus();
        });
      }
      // Update the "All (N)" chip and the input placeholder so the user gets
      // immediate, perceivable feedback that filtering ran.
      const allChip = document.querySelector('.ex-tag[data-tag="all"]');
      if (allChip) allChip.textContent = `All (${tagCounts.all})`;
      if (filterInput) {
        filterInput.placeholder = `Filter ${tagCounts.all} examples…`;
        filterInput.setAttribute('aria-describedby', 'exCount');
      }
      let counter = document.getElementById('exCount');
      if (!counter) {
        counter = document.createElement('div');
        counter.id = 'exCount';
        counter.className = 'ex-count';
        counter.setAttribute('role', 'status');
        counter.setAttribute('aria-live', 'polite');
        const filterWrap = document.querySelector('.examples-filter');
        filterWrap?.parentNode?.insertBefore(counter, filterWrap.nextSibling);
      }
      const tagLabel = tag === 'all' ? '' : ` · ${tag}`;
      const qLabel = q ? ` matching “${q}”` : '';
      counter.textContent = `Showing ${visible} of ${tagCounts.all} examples${tagLabel}${qLabel}`;
    }
    filterInput?.addEventListener('input', render);
    filterInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); render(); }
      if (e.key === 'Escape' && filterInput.value) { filterInput.value = ''; render(); }
    });
    document.querySelectorAll('.ex-tag').forEach((t) => t.addEventListener('click', () => {
      document.querySelectorAll('.ex-tag').forEach((x) => x.classList.toggle('active', x === t));
      render();
    }));
    render();
  }

  // Smooth scroll for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    const href = a.getAttribute('href');
    if (href.length < 2) return;
    a.addEventListener('click', (e) => {
      const el = document.getElementById(href.slice(1));
      if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth', block: 'start' }); history.replaceState(null, '', href); }
    });
  });
})();
