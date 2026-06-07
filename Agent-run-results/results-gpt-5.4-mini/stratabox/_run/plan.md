# UXAgent Exploration Plan

## Goal

Exhaustively explore the Stratabox single-page marketing/pricing experience, with emphasis on the primary pricing/CTA path and the interactive product sections that support conversion and trust.

## Plan Summary

The run should start at the hero and top navigation, then move through the long-scroll sections in order to validate the primary conversion path, product explanation, and supporting proof points. Special attention should go to the live block builder, SDK tabs/copy interaction, and integrations search because these are the richest interactive surfaces and most likely to reveal state bugs. Since the prescan shows only one HTML page, coverage should focus on deep state exploration across visible controls, plus repeat checks in a mobile viewport to confirm tap-target and layout issues already hinted by the prescan.

## Coverage Targets

- pages: `Visit the single known HTML page, index.html, and cover all major anchor sections within it.`
- features: `Exercise the primary hero CTAs, every top-nav anchor, the live builder controls, all SDK tabs, the copy button, integrations search/filter, and the pricing teaser CTA.`
- mobile: `Repeat header/CTA, builder, SDK copy, and integrations search checks in a mobile viewport, with explicit attention to the small tap-target warnings already identified.`

## Planned Phases

### Baseline conversion and navigation sweep

- Objective: Validate the top-of-page conversion path and anchor navigation from the sticky header.
- Target pages: index.html
- Key checks:
  - Click Start free, Book a demo, and Sign in to confirm they behave consistently and do not break page state.
  - Use the sticky nav links Product, Builder, SDKs, Integrations, Customers, and Pricing to confirm in-page navigation lands on the intended sections.
  - Verify the hero split-panel and trust badges render legibly at the initial viewport.
- Exit criteria:
  - All primary header and hero links have been activated at least once.
  - Anchor navigation reaches each major section without visible layout corruption.
  - No console or network errors are introduced by navigation.

### Trust and product storytelling sections

- Objective: Check the informational sections that reinforce the product narrative and conversion credibility.
- Target pages: index.html
- Key checks:
  - Observe the stat row count-up behavior when it enters view and confirm counts animate cleanly.
  - Review the feature cards and adjacent content for alignment, truncation, and hierarchy.
  - Inspect customer quote area and brand/logo strip for readability and spacing.
- Exit criteria:
  - The stat animation has been triggered and settled.
  - Feature and proof sections are scrolled through in both directions with no obvious overlap or clipping.
  - Customer proof content remains readable at the tested viewport.

### Live builder interaction validation

- Objective: Deeply exercise the builder as the highest-risk interactive surface on the page.
- Target pages: index.html
- Key checks:
  - Add each available block type shown in the builder controls, especially the types already visible in the prescan (+ Paragraph, + Heading, + Image, + Callout, + Quote).
  - Edit the builder's text inputs to confirm live preview updates and auto-save status transitions after debouncing.
  - Reorder blocks via drag-and-drop and verify the editor list and render preview stay in sync.
  - Switch block types and delete a block to confirm state updates are reflected in both panes.
  - Check for any loss of focus, stale preview content, or broken saved-state messaging after repeated edits.
- Exit criteria:
  - At least one add, edit, reorder, type-switch, and delete action has been completed successfully.
  - The preview pane matches the edited builder state after debounce delay.
  - No interaction leaves the builder in a stuck or inconsistent state.

### SDK tab and copy workflow

- Objective: Validate the developer-facing SDK snippet interaction and clipboard feedback.
- Target pages: index.html
- Key checks:
  - Switch among JS, Python, Ruby, and curl tabs and confirm code content changes appropriately.
  - Use the copy button and verify the toast or feedback state appears and clears as expected.
  - Check that syntax highlighting and monospace formatting remain legible across tab changes.
- Exit criteria:
  - Each SDK tab has been selected at least once.
  - Copy feedback has been observed at least once.
  - Tab state remains consistent after switching back and forth.

### Integrations discovery and pricing CTA

- Objective: Exercise search/filtering in the integrations grid and then validate the pricing conversion teaser.
- Target pages: index.html
- Key checks:
  - Search integrations by a name term and by a category term to confirm both matching modes work.
  - Clear the search to ensure the full set returns and live count resets correctly.
  - Scroll to the pricing teaser and activate See full plans to confirm the pricing CTA path is coherent.
  - Confirm footer links and section navigation are visually intact at the bottom of the page.
- Exit criteria:
  - Search returns both filtered and unfiltered states correctly.
  - Pricing teaser CTA is reachable and behaves consistently.
  - Footer navigation is present and accessible at the end of the scroll.

### Mobile viewport regression pass

- Objective: Repeat critical conversion and interaction checks on mobile to catch tap-target and layout problems.
- Target pages: index.html
- Key checks:
  - Recheck header nav, Start free, and primary hero CTA tapability in the narrow viewport.
  - Confirm the builder controls remain usable and do not collapse into unusable touch targets.
  - Repeat at least one SDK tab change, one copy action, and one integrations search on mobile.
  - Inspect the long-scroll sections for wrapping, overflow, or clipped text at small width.
- Exit criteria:
  - Critical CTAs and at least one representative interaction per major feature have been tested in mobile viewport.
  - Any mobile-only spacing or tap-target issues are documented with section-specific evidence.
  - No new functional failures appear beyond expected responsive compression.

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

