# UXAgent Exploration Plan

## Goal

Critique the end-to-end UX of the stratabox marketing + interactive builder experience, with emphasis on the pricing section and adjacent flows (navigation, SDK tabs, integrations search, and key builder controls).

## Plan Summary

Run a full long-scroll exploration on index.html, validating sticky navigation anchors, the hero editor/live preview builder interactions, the SDK language tabs with copy behavior, and the integrations search/filter results. Then deep-dive on the pricing section to confirm plan navigation and CTAs, plus validate key mobile interactions and tap targets.

## Coverage Targets

- pages: `Visit all known HTML pages (index.html only).`
- features: `Exercise: hero builder add/edit/delete/reorder/type switch + saved status; preview mode toggling (web/mobile/email if interactive); SDK tab switching + copy; integrations search filtering + live count; pricing CTAs (“See full plans →”, “Start free”, “Book a demo”).`
- mobile: `Repeat critical checks (builder edits + save feedback, SDK copy, integrations search, and pricing CTAs + header anchor tapping) on mobile viewport.`

## Planned Phases

### Global navigation + anchor sanity

- Objective: Verify sticky header behavior and anchor navigation to all major sections without losing context.
- Target pages: index.html
- Key checks:
  - Use top nav links (Product, Builder, SDKs, Integrations, Customers, Pricing) and confirm the page scrolls to the correct section headings.
  - Activate “Start free” and “Sign in” and verify whether they trigger a modal, navigate, or scroll (no dead-end).
  - On mobile viewport, attempt repeated tapping of small header links and confirm they are reliably clickable.
- Exit criteria:
  - All anchor links land at the intended sections (visually confirmed in-page).
  - CTAs for “Start free” and “Sign in” produce a clear outcome (modal/navigation/notice).
  - No broken navigation or unexpected scroll-jumps on mobile.

### Hero editor vs live preview builder interaction

- Objective: Validate the core builder UX: adding, editing, deleting blocks, preview synchronization, and save feedback.
- Target pages: index.html
- Key checks:
  - Interact with editor block inputs: “New section heading”, “Body paragraph…”, and image alt/name fields (ux-18/ux-21/ux-24) and confirm changes appear in the live preview.
  - Use add controls for each block type (e.g., “+ Paragraph”, “+ Heading”, “+ Image”, “+ Callout”) and confirm the new block appears in EDITOR and updates the preview.
  - Reorder blocks via drag-and-drop and verify both editor order and live preview order reflect the change.
  - Switch a block type using the type switcher (where available) and confirm content/controls update and preview stays consistent.
  - Delete a block and verify the editor and preview remove it cleanly.
  - Observe debounced auto-save status near “saved” while editing; confirm feedback appears at least once and ends in a stable saved state.
- Exit criteria:
  - Editor edits propagate to live preview without noticeable lag or mismatch (including after reorder and type switch).
  - Add/delete actions are visually and functionally consistent.
  - Auto-save feedback is understandable and reaches a stable ‘saved’ state after interaction.

### SDK language tabs + copy feedback

- Objective: Ensure SDK tab switching correctly updates code samples and copy actions provide reliable feedback.
- Target pages: index.html
- Key checks:
  - Switch SDK tabs across JS → Python → Ruby → curl and confirm code content changes accordingly.
  - Click the copy button for a tab and confirm clipboard copy succeeds or at least shows a visible success/failure toast.
  - After switching tabs, click copy again and verify the toast corresponds to the currently visible language.
- Exit criteria:
  - All tab switches update the displayed snippet accurately.
  - Copy-to-clipboard provides clear user feedback and operates on the active snippet.

### Integrations grid search + live count

- Objective: Validate search/filter logic, result count accuracy, and input usability.
- Target pages: index.html
- Key checks:
  - Use the search input “Search 24 visible integrations…” (ux-38). Type a query matching by name and confirm the grid filters.
  - Type a query matching by category (if categories are indicated on cards) and confirm results update.
  - Clear the search and confirm the full set returns and the live count matches the number of visible cards.
  - On mobile viewport, focus the search input and verify soft keyboard usability and no layout overlap.
- Exit criteria:
  - Search results and the displayed count remain consistent for multiple queries.
  - Clearing search restores the full grid without UI glitches.
  - Mobile search focus and typing work smoothly.

### Pricing section deep-check + CTAs

- Objective: Critically assess the pricing information architecture and confirm CTA pathways work.
- Target pages: index.html
- Key checks:
  - Jump to Pricing via nav and verify pricing teaser/plan content is readable and scannable.
  - Activate “See full plans →” and confirm what happens (scroll, modal, new content section).
  - Use pricing-adjacent CTAs (“Start free” and “Book a demo” if present near pricing) and verify outcomes are coherent and not duplicated or confusing.
  - On mobile viewport, verify pricing CTA tap targets and layout alignment (no overlaps, no truncated buttons).
- Exit criteria:
  - Pricing section contains actionable pathways with no dead-end interactions.
  - CTA outcomes are clear and consistent across desktop and mobile.
  - Mobile pricing layout remains usable (no broken wrapping/truncation of buttons).

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

