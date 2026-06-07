# UXAgent Exploration Plan

## Goal

Evaluate the UX of the Stratabox single-page marketing site, focusing on the interactive 'Live Block Builder' demo, SDK documentation usability, and mobile responsiveness of complex UI elements.

## Plan Summary

The run will treat index.html as a multi-section application. It begins with global navigation and hero validation, moves to deep interaction testing of the drag-and-drop content builder, verifies the developer-facing SDK tabs and search filters, and concludes with a rigorous mobile viewport check to address known tap-target risks.

## Coverage Targets

- pages: `100% of index.html sections (Hero, Builder, SDKs, Integrations, Footer)`
- features: `Exercise all builder controls (add, delete, reorder, edit) and all SDK tabs`
- mobile: `Full pass on mobile viewport for layout integrity and touch targets`

## Planned Phases

### Global Nav & Hero Validation

- Objective: Verify sticky header behavior, smooth scrolling to anchors, and initial hero state.
- Target pages: index.html
- Key checks:
  - Click each nav link (Product, Builder, SDKs, Pricing) to verify scroll-to-anchor behavior.
  - Validate 'Start free' and 'Book a demo' CTA visibility and hover states.
  - Observe the hero 'editor-vs-live-preview' split panel for the periodic block-swap animation.
- Exit criteria:
  - All nav links scroll to correct sections.
  - Hero animation cycles at least once.

### Interactive Builder Stress Test

- Objective: Deeply exercise the 'Live Block Builder' demo to validate drag-and-drop, editing, and state feedback.
- Target pages: index.html
- Key checks:
  - Drag a block (e.g., 'Callout') to reorder it; verify visual drop indicator and final position.
  - Type into the 'New section heading' input; verify real-time update in the Live Preview pane.
  - Click '+ Paragraph' or '+ Image' to add a new block; verify it appears in both panes.
  - Wait for the 'debounced auto-save' status indicator to update (e.g., 'saved' vs 'saving').
- Exit criteria:
  - Successful reordering of at least 2 blocks.
  - Real-time text reflection confirmed.
  - Auto-save status change observed.

### Developer Experience (SDKs & Integrations)

- Objective: Validate the usability of code snippets and the integrations discovery flow.
- Target pages: index.html
- Key checks:
  - Switch between SDK tabs (JS, Python, Ruby, curl); verify syntax highlighting updates.
  - Click the 'Copy' button on a snippet; check for toast notification or visual feedback.
  - Type a query in the 'Search 24 visible integrations' input; verify grid filtering and count update.
  - Clear the search input; verify all integrations return.
- Exit criteria:
  - All 4 SDK tabs viewed.
  - Copy button interaction triggered feedback.
  - Search filter successfully hid non-matching items.

### Mobile Responsiveness & Accessibility

- Objective: Repeat critical checks on mobile viewport to address prescan warnings about small tap targets.
- Target pages: index.html
- Key checks:
  - Switch to mobile viewport (<720px).
  - Attempt to use the Builder drag-and-drop on touch/mobile emulation (high risk of failure).
  - Check if the sticky nav collapses into a hamburger menu or remains usable.
  - Verify text readability in the split-pane editor on narrow screens.
- Exit criteria:
  - Layout does not break horizontally.
  - Critical CTAs remain clickable.
  - Builder usability assessment completed (even if unusable, that is a finding).

## Prescan Summary

### Stratabox — the structured content platform

- Page: `index.html`
- Headings: Structured content
for every surface., Coastal Bloom Returns, Built around composable blocks., Composable schema, Real-time collaboration, Edge content API, Drag, drop, ship., A field guide to coastal birds, One schema. Every SDK., Plays well with your stack.
- Interactables: `15` buttons, `29` links, `11` inputs
- Notable controls:
  - clickable:a:Stratabox
  - clickable:a:Product
  - clickable:a:Builder
  - clickable:a:SDKs
  - clickable:a:Integrations
  - clickable:a:Customers
  - clickable:a:Pricing
  - clickable:a:Sign in

