# UXAgent Exploration Plan

## Goal

Exhaustively explore and critique the UX of the Stratabox single-page marketing site, focusing on the primary pricing flow, interactive builder, SDK tabs, and integrations search, across both desktop and mobile viewports.

## Plan Summary

The run will proceed by systematically validating the primary conversion flows and interactive components of the Stratabox site. It will start with navigation and the hero section, move to the interactive block builder and SDK code tabs, then test the integrations search and pricing section. Finally, it will repeat critical checks on a mobile viewport to assess responsiveness and tap target usability.

## Coverage Targets

- pages: `visit all known HTML pages (100% - index.html)`
- features: `exercise all visible controls per key section: nav links, hero CTAs, builder add/delete/reorder/type, SDK tabs/copy, integrations search, pricing CTA`
- mobile: `repeat critical checks on mobile viewport, focusing on builder drag-and-drop, tap targets, and responsive layout`

## Planned Phases

### Navigation & Hero Validation

- Objective: Validate the sticky navigation, anchor link scrolling, and hero section micro-animations and CTAs.
- Target pages: index.html
- Key checks:
  - Click each nav link (Product, Builder, SDKs, Integrations, Customers, Pricing) and verify smooth scroll to correct section.
  - Observe hero split panel for at least 7 seconds to confirm the block-swap micro-animation occurs every 3.5s.
  - Click 'Start free' and 'Book a demo' CTAs in the hero and nav to check for expected behavior (e.g., modal, toast, or no-op).
- Exit criteria:
  - All nav links successfully scroll to their respective sections.
  - Hero block-swap animation is confirmed to be functioning.
  - CTA behaviors are identified and documented.

### Interactive Block Builder

- Objective: Deeply validate the live block builder interactions, including adding, deleting, reordering, and editing blocks.
- Target pages: index.html
- Key checks:
  - Add a new block using '+ Paragraph', '+ Heading', '+ Image', and '+ Callout' buttons.
  - Type into the newly added block inputs and verify the live preview updates accordingly.
  - Attempt to reorder blocks via drag-and-drop and verify the preview updates to match the new order.
  - Delete an added block and confirm it is removed from both the editor and the live preview.
  - Trigger the debounced auto-save by typing, pausing, and observing the status indicator change from 'saved' to 'saving' and back.
- Exit criteria:
  - All block addition, deletion, and reordering actions function correctly.
  - Live preview accurately reflects editor state.
  - Debounced auto-save status is visually confirmed.

### SDK Tabs & Integrations Search

- Objective: Validate the SDK code tab switcher, copy functionality, and the integrations search filter.
- Target pages: index.html
- Key checks:
  - Click each SDK tab (JS, Python, Ruby, curl) and verify the code snippet updates with syntax highlighting.
  - Click the copy button and verify a toast notification appears and clipboard is updated.
  - Type a valid query into the integrations search and verify the grid filters correctly and the visible count updates.
  - Type an invalid query into the integrations search and verify a 'no results' state is handled gracefully.
  - Clear the search input and verify all 24 integrations reappear.
- Exit criteria:
  - SDK tabs switch and display correct code snippets.
  - Copy-to-clipboard functions with visual feedback.
  - Integrations search filters accurately and updates the count.

### Stats, Customers & Pricing Teaser

- Objective: Validate the intersection-observer count-up animation, customer quotes, and the pricing teaser section.
- Target pages: index.html
- Key checks:
  - Scroll to the 4-stat row and verify the count-up animation triggers upon entering the viewport.
  - Scroll away and back to verify if the animation re-triggers or stays completed (expected: stays completed).
  - Review the 3 customer quotes for layout and readability.
  - Click 'See full plans →' in the pricing teaser and verify the expected behavior.
  - Interact with the footer links to ensure they are styled correctly and provide feedback.
- Exit criteria:
  - Stat count-up animation is confirmed to trigger on scroll.
  - Pricing teaser CTA is tested.
  - Footer links are verified.

### Mobile Viewport Checks

- Objective: Re-evaluate critical flows and layout shifts on a mobile viewport, specifically addressing small tap target warnings.
- Target pages: index.html
- Key checks:
  - Switch to mobile viewport and verify the responsive layout (stacked columns, hamburger menu if applicable).
  - Re-test the block builder drag-and-drop on mobile to check for touch-specific UX issues.
  - Attempt to tap the small nav links and builder buttons to assess the severity of the small tap target warnings.
  - Verify the hero split panel and live preview adapt correctly to the smaller screen.
  - Test the integrations search and SDK tabs on mobile for usability.
- Exit criteria:
  - Mobile layout is confirmed to be responsive and not broken.
  - Touch interactions on the builder are validated.
  - Small tap target impact is assessed based on actual interaction attempts.

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

