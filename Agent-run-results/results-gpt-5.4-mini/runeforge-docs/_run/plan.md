# UXAgent Exploration Plan

## Goal

Exhaustively explore the Runeforge docs site as a documentation/product UX, with emphasis on the primary getting-started path and the adjacent reference/example paths that a new user would use to evaluate and adopt the library.

## Plan Summary

Start on the docs home page and validate the main onboarding path: introduction, install instructions, hello-store examples, and navigation to the quickstart. Then cover the core concept pages and the API reference to confirm the docs hierarchy, in-page navigation, and content depth are coherent. Finish by checking examples and key mobile behaviors, with special attention to controls that are already flagged as small or unlabeled in the prescan.

## Coverage Targets

- pages: `Visit all known HTML pages: index.html, guide-quickstart.html, guide-stores.html, guide-actions.html, api-reference.html, and examples.html.`
- features: `Exercise the primary nav, left TOC, on-page anchors, code tabs, copy buttons, filter controls, and representative reference symbol links on each major page.`
- mobile: `Repeat the homepage, quickstart, reference, and examples interactions on mobile viewport, with extra scrutiny on small tap targets and the unlabeled select.`

## Planned Phases

### Home page orientation

- Objective: Validate the docs landing page as the entry point, including primary navigation, versioning, theme toggle, search trigger, and the three-column docs layout.
- Target pages: index.html
- Key checks:
  - Open the docs home and confirm the left TOC, center content, and right on-this-page TOC all feel clearly related.
  - Check the top-bar controls: Docs/API/Examples navigation, Search docs ⌘K, version selector, theme toggle, and GitHub/star affordance.
  - Exercise the install code tabs and the hello-store framework tabs to ensure tab state changes visibly and the copy button is available.
  - Verify the page provides clear next-step paths into Quickstart, Stores, Actions & selectors, and API reference.
- Exit criteria:
  - All visible primary navigation groups have been visited or tested.
  - At least one code-tab set and one copy interaction have been validated.
  - No obvious broken or confusing entry-point behavior remains unobserved.

### Quickstart onboarding flow

- Objective: Validate the 5-minute tutorial as the canonical new-user path from install to first app patterns.
- Target pages: guide-quickstart.html
- Key checks:
  - Confirm the step structure from install through counter, todo list, async fetcher, and devtools is legible and sequential.
  - Test any in-page anchors/TOC links for jumping between sections.
  - Inspect code block readability and any copy controls or code-tab behavior present on the page.
  - Check that the success/info callouts support the tutorial narrative rather than interrupt it.
- Exit criteria:
  - Each major quickstart step has been reviewed at least once.
  - The page supports easy progression from one tutorial section to the next.
  - Key code examples are readable without layout collapse.

### Core concepts depth check

- Objective: Validate the conceptual docs that explain how stores, actions, and selectors work together, including composition and subscriptions.
- Target pages: guide-stores.html, guide-actions.html
- Key checks:
  - Review the stores reference for creation, subscribing, composing, slicing, SSR/serialization, and testing sections.
  - Review the actions/selectors page for selector rules, composition, reusable action creators, and middleware guidance.
  - Check whether tables, callouts, and example blocks are easy to parse and whether anchor navigation matches the headings.
  - Verify cross-links back to the main docs and adjacent pages are understandable.
- Exit criteria:
  - Both core-concept pages have been traversed through their main sections.
  - The docs hierarchy from stores to actions/selectors is understandable.
  - No missing-content or broken-anchor issues are left untested for these pages.

### Reference and symbol lookup

- Objective: Validate the API reference as a deep lookup page for public symbols, adapter utilities, and errors.
- Target pages: api-reference.html
- Key checks:
  - Confirm the API reference overview and major function sections are reachable via the page TOC.
  - Inspect key symbols such as forge(), derive(), use(), asyncSlice(), listSlice(), formSlice(), and devtools().
  - Check the React adapter section and any re-export or error documentation at the bottom.
  - Assess whether the reference page is scannable enough for experienced users looking for exact API details.
- Exit criteria:
  - The top-level symbol categories and at least several major entries have been visited.
  - Anchor/TOC navigation works as expected across the reference page.
  - The page supports efficient lookup without obvious structural confusion.

### Examples discovery and filtering

- Objective: Validate the examples gallery as a discovery surface for practical patterns and learning by imitation.
- Target pages: examples.html
- Key checks:
  - Test the example filter input and category chips (All, Beginner, Intermediate, Advanced, SSR).
  - Review representative examples across levels, including counter, todo persistence, async fetcher, and a more advanced pattern.
  - Check whether example summaries communicate framework, LOC, and complexity clearly.
  - Verify filtering and browsing remain usable when moving through different categories.
- Exit criteria:
  - Filtering controls have been exercised and at least a few example cards have been reviewed.
  - The page clearly supports both beginner and advanced discovery paths.
  - The examples grid remains readable and navigable.

### Responsive and control validation

- Objective: Repeat the most important interactions in a mobile viewport and specifically probe the small or unlabeled controls called out by the prescan.
- Target pages: index.html, guide-quickstart.html, guide-stores.html, guide-actions.html, api-reference.html, examples.html
- Key checks:
  - Re-check the top bar on mobile for tap-target usability, including Search docs ⌘K, version selector, theme toggle, and star/GitHub affordances.
  - Verify the left navigation, code tabs, copy buttons, and example filters remain usable without accidental taps.
  - Confirm the unlabeled select on the home/reference pages is still operable and its purpose is inferable.
  - Look for truncated content, overlapping columns, or anchor/TOC issues when the layout stacks.
- Exit criteria:
  - Critical controls from the main flow have been re-tested on mobile.
  - The pages remain navigable in a narrow viewport without major layout breakage.
  - Any mobile-only friction points are recorded against the specific control or page.

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

