# UXAgent Exploration Plan

## Goal

Explore and critique the UX of the runeforge-docs system, focusing on core documentation flows, interactable elements, and responsive design across desktop and mobile.

## Plan Summary

The exploration will proceed in phases: first, validate the home page (index.html) interactables and layout. Then, explore key guide pages (Quickstart, Stores, Actions) to assess content flow and navigation. Next, check API and Examples pages for completeness. Finally, verify responsive behavior and address layout warnings. Each phase targets specific pages and interactions.

## Coverage Targets

- pages: `Visit all 6 known HTML pages (index, guide-quickstart, guide-stores, guide-actions, api-reference, examples).`
- features: `Exercise all visible controls (links, buttons, selectors, code copy buttons) on each key page.`
- mobile: `Repeat critical checks (navigation, tap targets, code blocks) on mobile viewport.`

## Planned Phases

### Home Page (index.html) Exploration

- Objective: Validate the home page's interactables, layout, and initial content flow.
- Target pages: index.html
- Key checks:
  - Click top navigation links (Docs, API, Examples, Blog, Community) to ensure navigation works.
  - Interact with the version selector, theme toggle, and GitHub stars button.
  - Verify the 'Quickstart (5 min)' link navigates to guide-quickstart.html.
  - Check the 'Install' code block's copy button functionality.
  - Assess the left TOC and right 'On this page' navigation for usability.
- Exit criteria:
  - All top interactables function correctly.
  - Quickstart and TOC navigation works.
  - Copy button in code block is responsive.

### Guide Pages (Quickstart, Stores, Actions)

- Objective: Explore the core guide pages to evaluate content structure, code examples, and interactables.
- Target pages: guide-quickstart.html, guide-stores.html, guide-actions.html
- Key checks:
  - In guide-quickstart.html, follow the step-by-step tutorial to ensure code examples are clear and actionable.
  - Check callout boxes (info/success) for readability and relevance.
  - In guide-stores.html, verify the 'forge()' API explanation and code snippets.
  - In guide-actions.html, assess the 'Actions' and 'Selectors' documentation for clarity.
  - Navigate between guide pages using left TOC and prev/next pagers (if present).
- Exit criteria:
  - All guide pages' content is accessible and actionable.
  - Navigation between guide pages works.
  - Code examples and callouts are legible.

### API Reference and Examples

- Objective: Explore the API reference and examples pages to evaluate documentation completeness and usability.
- Target pages: api-reference.html, examples.html
- Key checks:
  - In api-reference.html, verify the 'forge()', 'derive()', and 'use()' API descriptions and signatures.
  - Check the React adapter documentation for clarity.
  - In examples.html, filter examples by difficulty (Beginner, Intermediate, Advanced) and verify the filtering functionality.
  - Interact with the 'Clone the repo' and 'npm dev' call-to-action links (if present).
  - Assess the examples' code blocks and their copy functionality.
- Exit criteria:
  - API reference is complete and understandable.
  - Examples page filtering works.
  - Code blocks in examples are accessible.

### Responsive Design and Layout Checks

- Objective: Verify the site's responsive behavior across desktop and mobile viewports, addressing layout warnings.
- Target pages: index.html, guide-quickstart.html, examples.html
- Key checks:
  - Switch to mobile viewport and check navigation (hamburger menu? — if present) or responsive TOC.
  - Assess small tap targets (identified in layout warnings) for usability on mobile.
  - Verify the 'Search docs' input and results (if applicable) in mobile view.
  - Check code blocks and callout boxes for readability on mobile.
  - Address the 'missing input label' warning for accessibility.
- Exit criteria:
  - Responsive design is consistent across viewports.
  - Small tap targets are usable (or mitigated) on mobile.
  - Accessibility warnings (missing label) are addressed.

### Final Validation and Edge Cases

- Objective: Conduct final checks on all pages, verify error handling, and ensure overall consistency.
- Target pages: index.html, guide-stores.html, api-reference.html
- Key checks:
  - Verify all console and network errors (should be none).
  - Check for broken links or 404 errors in navigation.
  - Ensure the theme toggle (light/dark mode) works across all pages.
  - Re-verify critical interactables (version selector, GitHub stars, search) for consistency.
  - Assess the overall UX flow and identify any remaining pain points.
- Exit criteria:
  - No console/network errors.
  - All critical interactables work.
  - UX flow is consistent and intuitive.

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

