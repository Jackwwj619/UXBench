# UXAgent Exploration Plan

## Goal

Exhaustively explore the Runeforge docs experience across all known pages, validating the primary documentation-learning flow from home to quickstart/reference/examples, plus shared utilities like search trigger, version selector, theme toggle, code tabs, copy controls, TOC navigation, and example filtering on desktop and mobile.

## Plan Summary

The run should start on the docs home and follow the most likely reader journey: understand the library, move into Quickstart, then branch into core concept references and API details. After covering the primary educational flow, it should validate adjacent discovery flows on Examples and shared header/navigation controls reused across pages. Mobile checks should focus on whether the dense three-column docs layout, topbar actions, and small tap targets remain usable when the viewport collapses.

## Coverage Targets

- pages: `Visit all 6 known HTML pages, with deeper repeat visits on index.html, guide-quickstart.html, api-reference.html, and examples.html.`
- features: `Exercise all visible global header controls, both home-page tabsets, representative copy buttons/code blocks, guide navigation patterns, API anchors, and examples filtering controls.`
- mobile: `Repeat critical checks on mobile viewport for topbar actions, nav discoverability, code usability, and examples filtering, prioritizing pages with dense layout or prescan tap-target warnings.`

## Planned Phases

### Primary docs entry and shared chrome

- Objective: Validate the home page as the main landing experience and confirm that shared header/navigation controls behave coherently before deeper page exploration.
- Target pages: index.html
- Key checks:
  - Confirm the home page communicates hierarchy clearly across topbar, left TOC, center content, and right on-this-page rail.
  - Open the search trigger and validate dialog visibility, dismissal, focus handling, and whether any obvious search input/result state appears.
  - Exercise the version selector and confirm whether selecting visible versions changes page state, content, or URL without breaking navigation.
  - Toggle theme and check whether the visual mode change is immediate, legible, and persistent across a navigation step if possible.
  - Use the left navigation, top tabs (Docs/API/Examples), and right on-this-page links to compare competing navigation patterns.
  - Check the home page code tabs for npm/pnpm/yarn/bun and Vanilla/React/Solid/Svelte 5/Vue 3, plus copy button feedback.
- Exit criteria:
  - Search, version, and theme controls have each been interacted with at least once.
  - At least one navigation action has been validated from each major nav region: top tabs, left TOC, and right on-this-page rail.
  - Both home-page tab groups and at least one copy control have been exercised.

### Learning path through guides

- Objective: Follow the likely reader journey from introduction into quickstart and core concept guides, validating readability, progression, and local navigation.
- Target pages: guide-quickstart.html, guide-stores.html, guide-actions.html
- Key checks:
  - Open Quickstart from the home page and verify that the step sequence is easy to scan and that section headings align with the right-side TOC if present.
  - Inspect code-heavy sections for overflow, copy affordances, and whether callouts (info/success/warning) remain visually distinct.
  - Use previous/next or adjacent doc navigation where available to move between Quickstart, Stores, and Actions & selectors.
  - Validate left-nav highlighting/current-page indication across all three guides.
  - Use in-page anchors or TOC links to jump to deeper sections and ensure the scroll position and headings line up correctly.
  - Check whether long-form content remains readable without losing context from sticky side rails.
- Exit criteria:
  - Quickstart, Stores, and Actions pages have all been visited.
  - At least one intra-page navigation action and one inter-page navigation action have been validated within the guides area.
  - At least one code block and one callout style have been checked on guide pages.

### Reference depth and dense-content usability

- Objective: Assess the API reference as the densest technical page and verify that anchor navigation and scanning patterns still work under heavy content.
- Target pages: api-reference.html
- Key checks:
  - Use the API page section links such as forge(), derive(), asyncSlice(), listSlice(), formSlice(), and devtools() to test anchor navigation.
  - Check whether the reference page preserves orientation through breadcrumb, section labels, and active nav states.
  - Verify readability of signatures, availability notes, and long technical blocks without horizontal clipping or cramped spacing.
  - Test shared header controls again from this dense page to confirm overlays or sticky elements do not conflict with long-scroll content.
- Exit criteria:
  - Multiple API anchors have been used successfully.
  - The page has been scrolled through enough to assess dense reference readability and navigation stability.

### Examples discovery and filtering

- Objective: Validate the exploratory examples experience, especially filtering, category toggles, and card discoverability.
- Target pages: examples.html
- Key checks:
  - Interact with the filter input using representative terms tied to visible cards, such as counter, todo, async, or SSR.
  - Toggle visible category chips like All, Beginner, Intermediate, Advanced, and SSR to confirm filtering state and chip feedback.
  - Check whether combined search-plus-chip states behave sensibly and whether the page communicates zero or narrowed results clearly if encountered.
  - Open at least one example card or link if available to verify card click affordance and destination clarity.
- Exit criteria:
  - Filter input and multiple category chips have both been exercised.
  - At least one filtered state and one reset/broader state have been observed.

### Responsive and mobile-critical validation

- Objective: Repeat the most important interactions on mobile, focusing on navigation density, tap target issues already flagged in prescan, and code/content usability.
- Target pages: index.html, guide-quickstart.html, examples.html, api-reference.html
- Key checks:
  - Assess how the three-column docs layout collapses on mobile: whether left nav, right TOC, and main content remain discoverable.
  - Retest the small topbar controls on mobile, especially Docs/API/Examples tabs, search trigger, version selector, theme toggle, and star link.
  - Check whether code tabs, copy buttons, and long code blocks remain operable without overlap or horizontal overflow issues.
  - Verify the examples filter input and chip buttons are still tappable and visually manageable on mobile.
  - Confirm that scrolling, sticky headers, and any opened dialog/menus do not trap content or obscure headings.
- Exit criteria:
  - Critical home, guide, reference, and examples interactions have each been sampled on mobile.
  - Known small-tap-target areas and the unlabeled selector have been re-evaluated in the mobile viewport.

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

