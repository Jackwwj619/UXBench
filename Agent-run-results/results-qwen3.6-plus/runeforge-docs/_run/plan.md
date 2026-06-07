# UXAgent Exploration Plan

## Goal

Evaluate the UX of the Runeforge documentation site, focusing on information architecture, code snippet usability, and navigation consistency across desktop and mobile viewports.

## Plan Summary

The exploration will proceed from the homepage to validate the primary 'Getting Started' flow (Quickstart), then branch into core concepts (Stores/Actions) and reference materials (API/Examples). Special attention will be paid to the interactive code tabs, copy-to-clipboard functionality, and the responsiveness of the three-column layout on mobile devices.

## Coverage Targets

- pages: `Visit all 6 known HTML files.`
- features: `Interact with all code tab groups, copy buttons, version selector, search trigger, and mobile menu.`
- mobile: `Repeat Phase 1 and Phase 2 key checks on mobile viewport to ensure core learning path is not broken.`

## Planned Phases

### Homepage & Onboarding Flow

- Objective: Validate the first-impression experience, installation instructions, and primary navigation structure.
- Target pages: index.html
- Key checks:
  - Verify visibility of brand, version pill, and global nav items.
  - Test 'Install' code tab switching (npm vs pnpm vs yarn vs bun).
  - Test 'Hello, store' framework adapter tabs (React, Solid, Svelte, Vue, Vanilla).
  - Click 'Copy' button on a code block and verify visual feedback.
  - Check 'On this page' right-sidebar TOC highlighting on scroll.
  - Test version selector dropdown interaction.
- Exit criteria:
  - All code tabs switch content correctly without layout shift.
  - Copy buttons provide clear success state.
  - Navigation links lead to expected internal pages.

### Core Learning Path (Quickstart & Concepts)

- Objective: Assess the readability and logical progression of the tutorial and core concept pages.
- Target pages: guide-quickstart.html, guide-stores.html, guide-actions.html
- Key checks:
  - Follow 'Quickstart' steps: verify code examples match the text description.
  - Check for broken anchor links within the Quickstart page.
  - In 'Stores', verify the API table readability and callout box styling.
  - In 'Actions', check syntax highlighting consistency.
  - Test 'Previous/Next' pagination at the bottom of articles.
- Exit criteria:
  - Tutorial steps are visually distinct and easy to follow.
  - No dead ends in the navigation flow (prev/next works).
  - Code syntax highlighting is consistent across all three pages.

### Reference & Examples Deep Dive

- Objective: Evaluate the density and findability of information in reference-heavy pages.
- Target pages: api-reference.html, examples.html
- Key checks:
  - In 'API Reference', test the sidebar navigation for deep linking to specific functions (e.g., forge(), derive()).
  - In 'Examples', test the filter buttons (All, Beginner, Intermediate, Advanced).
  - Verify that example cards have clear CTAs or links to source code.
  - Check if the search bar (K) triggers a modal or overlay correctly.
- Exit criteria:
  - Filtering examples updates the visible list immediately.
  - API sidebar allows quick jumping between function definitions.
  - Search trigger opens a usable interface.

### Mobile Responsiveness & Accessibility

- Objective: Identify layout breaks and touch-target issues on smaller viewports.
- Target pages: index.html, guide-quickstart.html, api-reference.html
- Key checks:
  - Switch to mobile viewport (<768px).
  - Verify the left sidebar collapses into a hamburger menu.
  - Test opening/closing the mobile menu.
  - Check if code blocks overflow horizontally or wrap appropriately.
  - Verify tap targets for nav links meet minimum size requirements (noted as risks in prescan).
  - Ensure the right-side 'On this page' TOC is hidden or accessible via a separate control on mobile.
- Exit criteria:
  - No horizontal scrolling on the body element.
  - Mobile menu is fully functional and dismissible.
  - Code snippets remain readable (scrollable or wrapped).

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

