# UXAgent Exploration Plan

## Goal

Explore and critique the UX of the Stratabox marketing site, focusing on the primary flow (pricing, product features) and adjacent interactive elements (builder, SDKs, integrations) across desktop and mobile viewports.

## Plan Summary

The run will proceed in phases: first, validate the top navigation and hero section interactions; then explore the builder and feature blocks; next, test SDK and integration sections; then check customer and pricing flows; and finally, verify mobile responsiveness and recovery paths. Each phase will exercise key interactables and check for layout issues.

## Coverage Targets

- pages: `Visit all known pages (index.html) and all sections via navigation`
- features: `Exercise all visible controls (buttons, links, inputs) in builder, SDKs, integrations, and pricing sections`
- mobile: `Repeat critical checks (navigation, builder, CTAs) in mobile viewport (≤720px)`

## Planned Phases

### Top Navigation and Hero Section

- Objective: Validate navigation links and hero interactables (CTAs, preview panel)
- Target pages: index.html
- Key checks:
  - Click navigation links (Product, Builder, SDKs, Integrations, Customers, Pricing) and verify scroll behavior
  - Click 'Start free' and 'Book a demo' CTAs (hero and top nav) to check interaction feedback
  - Observe hero preview panel (editor vs live preview) for auto-swap animation and block interactions
- Exit criteria:
  - All navigation links scroll to correct sections
  - CTAs show interaction feedback (e.g., hover, click states)
  - Hero preview animation and block structure verified

### Builder and Feature Blocks

- Objective: Test builder interactables (drag-and-drop, add/delete blocks, type switcher) and feature cards
- Target pages: index.html
- Key checks:
  - Click builder buttons (+ Paragraph, + Heading, + Image, + Callout, + Quote) to add blocks
  - Attempt drag-and-drop reorder of builder blocks (verify visual feedback)
  - Test block type switcher (e.g., convert paragraph to heading)
  - Validate feature cards (Composable schema, Real-time collaboration, Edge content API) for interactivity
- Exit criteria:
  - Builder buttons add/remove blocks correctly
  - Drag-and-drop reorder works with visual feedback
  - Block type switcher functions as expected
  - Feature cards show hover/click states

### SDKs and Integrations

- Objective: Explore SDK tab switcher, copy functionality, and integrations search
- Target pages: index.html
- Key checks:
  - Switch SDK tabs (JS, Python, Ruby, curl) and verify syntax highlighting/copy button
  - Click copy button on SDK snippets and check for toast feedback
  - Type in integrations search filter (e.g., 'coastal') and verify live count/results
  - Click 'Read the API reference' link to check navigation
- Exit criteria:
  - SDK tabs switch correctly with syntax highlighting
  - Copy button shows toast feedback on click
  - Integrations search filters results and updates count
  - API reference link navigates to correct section

### Customers and Pricing

- Objective: Validate customer quotes, pricing teaser, and footer links
- Target pages: index.html
- Key checks:
  - Scroll to customer quotes and verify interaction (hover, click if applicable)
  - Click 'See full plans' CTA in pricing teaser
  - Check footer links (Studio, Schema, Localization, Assets, Webhooks, Docs) for scroll/navigation
  - Verify 'Start free' CTA in pricing section
- Exit criteria:
  - Customer quotes show interaction feedback
  - Pricing CTA navigates to correct section
  - Footer links scroll/navigate correctly
  - Pricing teaser content verified

### Mobile Responsiveness

- Objective: Validate layout and interactables in mobile viewport
- Target pages: index.html
- Key checks:
  - Switch to mobile viewport (≤720px) and recheck navigation (hamburger menu, tap targets)
  - Test builder and CTA interactables in mobile (small tap targets, touch feedback)
  - Verify hero preview, SDK tabs, and integrations search in mobile layout
  - Check for layout issues (small tap targets) and interaction consistency with desktop
- Exit criteria:
  - Mobile navigation (hamburger menu) functions
  - Key interactables (CTAs, builder buttons) are usable in mobile (tap targets ≥44px)
  - Layout adapts correctly (hero, SDKs, integrations)
  - Interaction feedback (hover, click) consistent with desktop

### Recovery and Edge Cases

- Objective: Test error recovery (e.g., invalid search, block deletion) and edge interactions
- Target pages: index.html
- Key checks:
  - Enter invalid text in integrations search (e.g., 'xyz123') and verify feedback (no results, count update)
  - Delete all builder blocks and re-add to check recovery
  - Test SDK copy button with empty snippet (if applicable)
  - Verify footer links (e.g., 'Docs', 'Webhooks') for 404 or correct navigation
- Exit criteria:
  - Invalid search shows appropriate feedback
  - Builder recovers from empty state
  - SDK copy handles edge cases
  - Footer links navigate correctly

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

