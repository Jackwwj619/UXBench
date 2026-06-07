# UXAgent Exploration Plan

## Goal

Autonomously explore and critique the UX of the runeforge-docs documentation site, validating global navigation, content interactions, and responsive layouts.

## Plan Summary

The exploration will systematically test the documentation site's interactive elements. It will start with global header controls like the search modal, version selector, and theme toggle. Then, it will verify layout components such as the sidebar TOCs and content interactions like code block tabs and copy buttons. Finally, it will test the dynamic filtering on the Examples page and evaluate mobile responsiveness.

## Coverage Targets

- pages: `Visit all 6 identified HTML pages.`
- features: `Exercise search modal, theme toggle, code tabs, copy buttons, and example filters.`
- mobile: `Ensure mobile menu navigation and code block reading are checked.`

## Planned Phases

### Global Header & Search

- Objective: Validate top navigation, utility controls, and the search modal functionality.
- Target pages: index.html
- Key checks:
  - Click the theme toggle (☾) and observe visual changes
  - Interact with the version selector dropdown
  - Click 'Search docs ⌘K' to verify the modal opens, accepts input, and can be dismissed
  - Test main navigation links (Docs, API, Examples)
- Exit criteria:
  - Header controls and search modal have been successfully interacted with and their states documented.

### Sidebar Navigation & Reading Experience

- Objective: Ensure the left Table of Contents navigates correctly between guide pages and the right TOC updates appropriately.
- Target pages: index.html, guide-quickstart.html, guide-actions.html
- Key checks:
  - Click links in the left sidebar to navigate between getting started and core concept pages
  - Scroll down a page to see if the right-side 'On this page' TOC highlights the active section
  - Use prev/next pagination links at the bottom of the content area if present
- Exit criteria:
  - Cross-page navigation via the left sidebar and intra-page navigation via the right TOC are verified.

### Content Interactions & Code Blocks

- Objective: Test interactive elements embedded within the documentation content.
- Target pages: index.html, guide-quickstart.html
- Key checks:
  - Click different package manager tabs (npm, pnpm, yarn, bun) on installation blocks
  - Click different framework adapter tabs (Vanilla JS, React, Solid, etc.)
  - Click the 'Copy' button on code blocks and check for feedback (e.g., changing to 'Copied')
- Exit criteria:
  - Code tab switching and copy-to-clipboard interactions have been tested on at least two different pages.

### Examples Gallery Filtering

- Objective: Verify the interactive filtering on the Examples page.
- Target pages: examples.html
- Key checks:
  - Type into the 'Filter 12 examples…' input and observe list updates
  - Click category filter buttons (Beginner, Intermediate, Advanced) and ensure the displayed examples match
- Exit criteria:
  - Both text-based filtering and category-based filtering have been applied and validated on the examples page.

### Mobile Viewport Validation

- Objective: Assess the documentation site's usability on smaller screens.
- Target pages: index.html, api-reference.html
- Key checks:
  - Check how the three-column layout collapses (is there a hamburger menu for the left TOC?)
  - Verify header tap targets (theme toggle, search) are accessible
  - Test horizontal scrolling on code blocks if they overflow
- Exit criteria:
  - Critical navigation and content reading tasks have been executed in a mobile viewport.

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

