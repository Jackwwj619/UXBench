# UXAgent Exploration Plan

## Goal

Exhaustively explore the single-page Stratabox marketing/pricing experience, prioritizing the primary conversion flow from hero to pricing while validating the major interactive product demo sections, anchor navigation, and responsive/mobile usability.

## Plan Summary

The run should treat index.html as a long-scroll funnel with one primary conversion path: hero CTAs and sticky navigation leading users through product proof, builder demo, SDKs, integrations, customers, and pricing teaser. Because the prescan shows only one HTML page, depth should come from exercising dynamic components and state changes rather than hunting for separate pages. Special attention should go to the live builder interactions, SDK tab/copy behavior, integrations search filtering, scroll-triggered stats, and mobile tap-target/navigation usability.

## Coverage Targets

- pages: `Visit the single known HTML page (index.html) and traverse all major sections via both scrolling and anchor navigation.`
- features: `Exercise nearly all visible high-value controls on index.html, especially hero CTAs, sticky nav anchors, builder editing controls, SDK tabs/copy, integrations search, and pricing CTA.`
- mobile: `Repeat the critical path on a mobile viewport: header/nav, hero CTAs, one anchor jump, core builder interaction, SDK tab switch, integrations search, and pricing access.`

## Planned Phases

### Top-of-page funnel and navigation baseline

- Objective: Validate the first-impression conversion path, sticky header behavior, hero content clarity, and whether the main in-page navigation reaches the intended sections.
- Target pages: index.html
- Key checks:
  - Verify sticky header remains usable while scrolling and does not obscure destination headings
  - Click each visible anchor nav item (Product, Builder, SDKs, Integrations, Customers, Pricing) and confirm it scrolls to the correct section
  - Check whether logo/Stratabox link and Sign in/Start free hero and header CTAs provide any meaningful action or just jump to top/placeholders
  - Observe the hero editor-vs-live-preview split panel for the periodic block-swap micro-animation and whether it is understandable rather than distracting
  - Assess whether the hero establishes pricing/value proof before the user scrolls
- Exit criteria:
  - All top navigation links have been exercised at least once with confirmed landing positions
  - All above-the-fold CTAs have been clicked and their resulting behavior documented
  - Hero animation has been observed long enough to confirm whether it changes state

### Scroll-driven proof and section continuity

- Objective: Validate the long-scroll storytelling between hero, trusted-by logos, stats, feature cards, and section transitions that support the pricing/conversion narrative.
- Target pages: index.html
- Key checks:
  - Scroll through the trusted-by/logo strip and confirm it reads as proof rather than visual clutter
  - Trigger the stats row in viewport and verify the count-up animation starts, completes, and displays plausible final values
  - Inspect transitions into the Platform/features area to ensure headings, cards, and supporting copy remain scannable
  - Check that deep-link navigation into lower sections still leaves enough context for the user to understand where they are
  - Note whether any sections feel excessively long, repetitive, or disconnected from the pricing intent
- Exit criteria:
  - Stats animation has been triggered and final rendered values observed
  - All major non-interactive proof/content sections between hero and builder have been scrolled through and assessed for continuity
  - Any section-order or narrative issues affecting conversion have been captured

### Builder demo interaction stress test

- Objective: Deeply exercise the interactive block builder as the richest on-page demo and highest-risk functional area.
- Target pages: index.html
- Key checks:
  - Use the builder add controls to insert multiple block types such as paragraph, heading, image, callout, and quote if available
  - Type into the visible builder inputs (heading, paragraph, image/alt text, callout) and confirm the live preview updates appropriately
  - Reorder blocks via drag-and-drop and verify both editor list order and rendered preview order change consistently
  - Test type switching if exposed in the UI and confirm content/state preservation is sensible
  - Delete at least one added or existing block and confirm the removal is reflected in the preview without breaking layout
  - Observe the debounced auto-save status before, during, and after edits to ensure users get clear feedback about saving
  - Check for empty, partial, or unusual input content to see whether preview formatting degrades gracefully
- Exit criteria:
  - At least three distinct builder modification types have been completed successfully (e.g. add, edit, reorder, delete, type switch)
  - Live preview synchronization has been confirmed after multiple edits
  - Auto-save status has shown at least one transition tied to editing activity

### SDKs, integrations, and lower-funnel validation

- Objective: Verify the supporting technical proof points and lower-page conversion content that help developers and buyers evaluate the product.
- Target pages: index.html
- Key checks:
  - Open each SDK tab (JS, Python, Ruby, curl) and verify code snippet switching, active-state clarity, and syntax presentation
  - Use the copy control in the SDK section and confirm feedback/toast appears and is understandable
  - Test integrations search with exact-match, partial-match, category-like, and no-match queries; verify visible cards and live count update together
  - Clear or modify search to ensure the grid returns to the full 24-card state cleanly
  - Review customer quotes/testimonials for readability and credibility in context
  - Navigate to the pricing teaser and click See full plans to determine whether it is actionable or a placeholder
- Exit criteria:
  - All visible SDK tabs have been exercised and copy feedback observed
  - Integrations search has been tested with at least one successful filter and one zero/near-zero result case
  - Lower-funnel sections including customers and pricing teaser have been reached and assessed

### Mobile and responsive critical-path pass

- Objective: Repeat the most important interactions on a mobile viewport to validate usability at the smallest breakpoint, with special attention to tap targets and layout adaptation.
- Target pages: index.html
- Key checks:
  - Review header/navigation behavior on mobile: visibility, collapse/wrapping behavior if any, and practicality of tapping small nav links
  - Repeat the primary CTA checks on mobile for top-right/header and hero buttons
  - Repeat at least one anchor navigation action to confirm section jumps remain usable and headings are not hidden by sticky UI
  - Exercise the builder with at least one text edit and one add/reorder-related action if feasible on mobile layout
  - Repeat SDK tab switching and one integrations search interaction on mobile
  - Inspect whether the builder split-pane, SDK code area, integrations grid, quotes, pricing teaser, and footer stack without overflow or clipped content
- Exit criteria:
  - Critical conversion and demo interactions have been spot-checked on mobile
  - Known small tap-target risks from prescan have been confirmed or refuted with direct interaction evidence
  - Any responsive breakage, overflow, or severe usability regression has been documented

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

