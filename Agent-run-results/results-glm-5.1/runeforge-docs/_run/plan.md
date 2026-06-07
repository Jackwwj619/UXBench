# UXAgent Exploration Plan

## Goal

Exhaustively explore and critique the UX of the Runeforge documentation site, validating navigation, interactive controls, code components, and responsive behavior across all known pages.

## Plan Summary

The exploration will proceed through four phases: validating global controls and the landing page, testing the core documentation flows, interacting with the examples and API reference, and finally verifying responsive mobile behavior and accessibility. The run will focus on interactive elements like the search dialog, version selector, theme toggle, and code tab/copy components, while paying special attention to the small tap targets and missing input labels flagged in the prescan.

## Coverage Targets

- pages: `visit 100% of known HTML pages (6/6)`
- features: `exercise all interactive controls: search, theme toggle, version select, code tabs, copy buttons, example filters, category buttons, TOC links, pagers`
- mobile: `validate navigation, search, code scrolling, and tap targets on mobile viewport for index and examples pages`

## Planned Phases

### Global Controls & Landing Page

- Objective: Validate the functionality of universal site controls and the main landing page interactions.
- Target pages: index.html
- Key checks:
  - Open and close the ⌘K search dialog, verify input focus and overlay behavior
  - Interact with the version selector dropdown, check for accessibility (missing label) and visual feedback
  - Toggle the theme switcher (☾) and verify if the theme persists or applies correctly to code blocks
  - Click the code-tab variants (npm/pnpm/yarn/bun and Vanilla/React/Solid/Svelte/Vue) and verify content swaps
  - Test the copy button on code blocks and verify success feedback
  - Click placeholder links (Blog, Community) and verify they do not cause errors
- Exit criteria:
  - Search dialog has been opened and closed
  - Theme toggle has been clicked at least once
  - Version selector has been interacted with
  - All code tabs on index.html have been clicked and copy buttons tested

### Core Documentation Flow

- Objective: Navigate through the primary getting-started and core-concepts guides, validating TOC navigation, pagers, and callouts.
- Target pages: guide-quickstart.html, guide-stores.html, guide-actions.html
- Key checks:
  - Navigate to Quickstart via left TOC, verify step-by-step layout and code blocks
  - Check info/success callout rendering and visibility on guide-quickstart.html
  - Navigate to Stores and Actions pages, verify right-side on-this-page TOC anchor links work
  - Test prev/next pager at the bottom of the pages
  - Verify immutability warning callout on guide-stores.html
- Exit criteria:
  - All three guide pages have been visited
  - Right-side TOC links have been clicked
  - Prev/next pagers have been used to navigate between at least two pages

### Examples & API Reference

- Objective: Validate the interactive filtering on the Examples page and the complex layout/scrolling of the API reference.
- Target pages: examples.html, api-reference.html
- Key checks:
  - Type into the 'Filter 12 examples…' input on examples.html and verify list filters correctly
  - Click category buttons (All, Beginner, Intermediate, Advanced) and verify active state and filtering
  - Navigate to api-reference.html and verify the left-side API TOC links scroll to correct headings
  - Check rendering of API signatures and code blocks on api-reference.html
- Exit criteria:
  - Examples filter input and category buttons have been exercised
  - API reference page has been scrolled and TOC links clicked

### Mobile Viewport & Accessibility Validation

- Objective: Re-test critical flows on a mobile viewport to validate responsive layout and assess tap target severity.
- Target pages: index.html, examples.html
- Key checks:
  - Switch to mobile viewport and verify left TOC collapses into a hamburger menu or similar pattern
  - Attempt to tap topbar links (Docs, API, Examples) to evaluate small tap target risk
  - Test ⌘K search and version selector on mobile for usability
  - Verify examples page filter and buttons are usable on mobile
  - Check if code blocks horizontal scroll works correctly on mobile
- Exit criteria:
  - Mobile viewport has been activated
  - Primary navigation and search have been tested on mobile
  - Small tap target issue has been visually confirmed on mobile

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

