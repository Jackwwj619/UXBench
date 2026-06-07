# UXAgent Exploration Plan

## Goal

Critique the UX of the Runeforge documentation system with emphasis on the primary “getting started → quickstart” learning flow and adjacent reference/example flows, including recovery paths (search, versioning, navigation) and mobile usability.

## Plan Summary

Run through the documented user journeys starting at index.html, then validate the quickstart and core-concepts pages (Stores, Actions & selectors) for navigability, code-block usability (tabs/copy), and clarity of callouts. Then test the adjacent flows: Examples filtering, API reference navigation, and any recovery paths via global search (⌘K) and version switching. Repeat the highest-risk checks on mobile (responsive layout, small tap targets, search + code interactions).

## Coverage Targets

- pages: `visit all known HTML pages`
- features: `exercise most visible controls per key page: topbar nav, ⌘K search, version selector, theme toggle, code-tabs (npm/adapters) and Copy, Quickstart step navigation, right on-this-page TOC, API reference anchor navigation, Examples filter input + category buttons`
- mobile: `repeat the critical checks on mobile for: search, version/theme toggle, code-tabs+copy, Quickstart step navigation, and Examples filter/category interactions`

## Planned Phases

### On-ramp validation: index.html (navigation + code usability)

- Objective: Confirm the primary entry page supports an efficient path into Quickstart, and that core topbar/search/version/code interactions are usable and accessible.
- Target pages: index.html
- Key checks:
  - Use left TOC to jump from “Introduction” to “Quickstart (5 min)” and verify scroll/active state (URL hash or equivalent) without losing context.
  - Switch code-tabs in the “Install” area (npm/pnpm/yarn/bun) and “Hello, store” adapter tabs (Vanilla / React / Solid / Svelte 5 / Vue 3); verify active tab styling and that the correct snippet is shown.
  - Click the code-block Copy button and verify visible feedback (toast/label change) and that it copies the correct current snippet (as evidenced by UI feedback and/or system clipboard confirmation if available).
  - Open global search via ⌘K button and/or keyboard; validate search input appears, focus is trapped/released correctly, and search results can be clicked to navigate to a relevant section.
  - Change version via topbar select (v3.4 (latest) → v3.3/v2) and validate content updates consistently (or confirm intended behavior if some pages are static).
  - Toggle theme (☾) and verify typography/code contrast remains readable, and controls remain usable afterward.
- Exit criteria:
  - Quickstart is reachable from index via nav/TOC within 1–2 interactions and lands at the correct section.
  - At least one code-tab switch and one Copy interaction work with clear UI feedback.
  - Search modal/panel opens/closes reliably and navigation from a result works.
  - Version switching produces a visible content/state change or an explicit limitation is confirmed without breaking layout.
  - Theme toggle maintains readable contrast without broken controls.

### Primary learning flow: guide-quickstart.html (step execution + recovery)

- Objective: Evaluate the Quickstart’s step-by-step guidance, especially code-block interaction patterns, callout comprehension, and intra-page navigation.
- Target pages: guide-quickstart.html
- Key checks:
  - Scan the five steps (Install → Counter → Todo derived store → Async via asyncSlice() → Devtools) using the right “on this page” list; verify each item scrolls to the correct step.
  - Validate info/success callouts: ensure styling hierarchy makes the intended emphasis clear and doesn’t hide content on scroll.
  - Switch any framework adapters inside the quickstart (if present) or validate that code blocks match the selected version/framework context shown in the rest of the site.
  - Trigger copy on multiple code blocks (at least one from each of: install and a later step such as async fetcher) and confirm feedback is consistent.
  - Use topbar search to find a keyword from Quickstart (e.g., “asyncSlice”, “devtools”, “derived”) and confirm results point back into Quickstart or the relevant guide section.
- Exit criteria:
  - All major Quickstart steps can be reached via the “on this page” navigation and are correctly aligned.
  - Copy feedback is consistent across multiple blocks.
  - Search can successfully locate at least one Quickstart-specific concept.
  - No layout break occurs during scroll/copy/tab switching.

### Core concepts depth: guide-stores.html + guide-actions.html (tables/callouts + rules clarity)

- Objective: Validate that the Stores and Actions & selectors pages are navigable and that complex explanations (immutability warning, rules of thumb, selectors composition) are structured for understanding.
- Target pages: guide-stores.html, guide-actions.html
- Key checks:
  - On Stores: verify you can reach “Creating a store”, “Reading and subscribing”, “Composing stores”, and “Slicing a store” via right/left TOCs and that the active section updates.
  - Identify and interact with any callout warning (immutability warning mentioned in prescan summary for these docs) and verify it stands out and remains readable.
  - On Stores: validate any SSR serialization/recovery snippets are reachable and their code tabs/copy controls (if present) function.
  - On Actions & selectors: validate “Rules of thumb”, “Composing selectors”, and “Action middleware” sections are scannable.
  - Use topbar search to find a term from these pages (e.g., “derive”, “store.select”, “middleware”) and confirm the results navigation works.
- Exit criteria:
  - Key sections on both pages are reachable quickly via TOCs without mis-scrolling.
  - Any visible warning/callout remains legible and not obscured by fixed UI.
  - Search finds at least one concept from each page and navigates correctly.

### Adjacent reference & examples: api-reference.html + examples.html (filtering + deep links)

- Objective: Test non-primary flows: API reference browsing and examples exploration with filtering; validate that navigation and UI state remain stable with version/theme/search.
- Target pages: api-reference.html, examples.html
- Key checks:
  - API reference: use the left/center reference nav to jump between functions (forge(), derive(), use(middleware), asyncSlice(), listSlice(), formSlice(), devtools()); verify anchors and active state.
  - API reference: validate any error/code blocks are readable and code-copy controls (if present) work (at least one interaction).
  - Examples: use the “Filter 12 examples…” input to filter (e.g., type “todo”, “async”, “ssr”) and verify the list updates (and handles no results if applicable).
  - Examples: click category chips/buttons (All / Beginner / Intermediate / Advanced) and verify filtering state is consistent with the filter text (and can be reset).
  - Examples: open at least one example’s fork/clone link or section navigation control (as visible in prescan) and verify it behaves as expected (or gracefully indicates non-availability).
- Exit criteria:
  - API reference anchors and active navigation highlight update correctly across multiple sections.
  - Examples filtering works for both text input and category selection with consistent state behavior.
  - At least one examples navigation/control works without breaking layout.

### Mobile usability pass (responsive + tap-target + search + code interactions)

- Objective: Repeat the highest-risk interactions on a mobile viewport to catch responsive layout and accessibility regressions.
- Target pages: index.html, guide-quickstart.html, examples.html
- Key checks:
  - Validate the three-column layout collapses appropriately (TOC handling, content readability) without overlapping essential controls.
  - Attempt topbar search (⌘K/controls if available) and confirm the search UI is usable with touch and keyboard equivalents.
  - Change version and toggle theme on mobile; confirm the controls remain reachable and readable.
  - Interact with code-tabs and Copy on mobile (tab switching + copy feedback) and verify target sizes and tap accuracy.
  - Examples page: use the filter input and category buttons on mobile; validate that the input is usable (no missing label issues impacting usability) and that button taps are not overly small.
- Exit criteria:
  - No critical UI elements become inaccessible on mobile (search/version/theme/filter/code copy).
  - All repeated interactions (search, code-tabs+copy, examples filtering) work on mobile.
  - TOCs do not obstruct content during scroll and navigation.

## Prescan Summary

### Runeforge — predictable state for JavaScript

- Page: `index.html`
- Headings: Predictable state, one rune at a time., Install, Hello, store., Three things to remember, Stores hold state, Actions describe changes, Selectors keep components tiny, Why another state library?, Next steps
- Interactables: `13` buttons, `53` links, `2` inputs
- Notable controls:
  - clickable:a:Runeforge v3.4
  - clickable:a:Docs
  - clickable:a:API
  - clickable:a:Examples
  - clickable:a:Blog
  - clickable:a:Community
  - clickable:button:Search docs ⌘K
  - selectable:select:v3.4 (latest) v3.3 v3.2 v2 (legacy)

### API reference — Runeforge

- Page: `api-reference.html`
- Headings: API reference., forge(definition, options?), derive(inputs, fn), use(middleware), asyncSlice<T>(options?), listSlice<T>(), formSlice<T>(), devtools(options?), React adapter (@runeforge/react), useStore(store, selector?, equality?)
- Interactables: `2` buttons, `38` links, `2` inputs
- Notable controls:
  - clickable:a:Runeforge v3.4
  - clickable:a:Docs
  - clickable:a:API
  - clickable:a:Examples
  - clickable:a:Blog
  - clickable:a:Community
  - clickable:button:Search docs ⌘K
  - selectable:select:v3.4 (latest) v3.3 v3.2 v2 (legacy)

### Examples — Runeforge

- Page: `examples.html`
- Headings: Apps you can fork., Counter (the canonical hello-world), Todo list with persistence, Async fetcher with retry, Multi-step form (typed), Optimistic comments, Realtime presence, Routing-aware state, Undo / redo with snapshots, Server-side rendered shop
- Interactables: `7` buttons, `8` links, `3` inputs
- Notable controls:
  - clickable:a:Runeforge v3.4
  - clickable:a:Docs
  - clickable:a:API
  - clickable:a:Examples
  - clickable:a:Blog
  - clickable:a:Community
  - clickable:button:Search docs ⌘K
  - selectable:select:v3.4 (latest)

### Actions & selectors — Runeforge

- Page: `guide-actions.html`
- Headings: Actions & selectors., Actions, Rules of thumb, Selectors, Composing selectors, Reusable action creators, Action middleware
- Interactables: `2` buttons, `32` links, `2` inputs
- Notable controls:
  - clickable:a:Runeforge v3.4
  - clickable:a:Docs
  - clickable:a:API
  - clickable:a:Examples
  - clickable:a:Blog
  - clickable:a:Community
  - clickable:button:Search docs ⌘K
  - selectable:select:v3.4 (latest) v3.3 v3.2 v2 (legacy)

### Quickstart — Runeforge

- Page: `guide-quickstart.html`
- Headings: From zero to a working app., Step 1 · Install, Step 2 · A counter store, Step 3 · A todo list (and a derived store), Step 4 · Async (the easy way), Step 5 · Devtools (optional, but you want this), You're done.
- Interactables: `2` buttons, `42` links, `2` inputs
- Notable controls:
  - clickable:a:Runeforge v3.4
  - clickable:a:Docs
  - clickable:a:API
  - clickable:a:Examples
  - clickable:a:Blog
  - clickable:a:Community
  - clickable:button:Search docs ⌘K
  - selectable:select:v3.4 (latest) v3.3 v3.2 v2 (legacy)

### Stores — Runeforge

- Page: `guide-stores.html`
- Headings: Stores., Creating a store, Reading and subscribing, Composing stores, Slicing a store, Server-side rendering & serialization, Testing stores
- Interactables: `2` buttons, `34` links, `2` inputs
- Notable controls:
  - clickable:a:Runeforge v3.4
  - clickable:a:Docs
  - clickable:a:API
  - clickable:a:Examples
  - clickable:a:Blog
  - clickable:a:Community
  - clickable:button:Search docs ⌘K
  - selectable:select:v3.4 (latest) v3.3 v3.2 v2 (legacy)

