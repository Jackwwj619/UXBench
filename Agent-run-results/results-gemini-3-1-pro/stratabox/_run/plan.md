# UXAgent Exploration Plan

## Goal

Exhaustively explore and critique the UX of the Stratabox marketing site, focusing heavily on its highly interactive single-page components like the live block builder, SDK tabs, and integration search.

## Plan Summary

This run will navigate the single-page structure of Stratabox. It will test the sticky navigation and anchor links, deeply interact with the live block builder to validate input syncing and auto-save states, test the integration search filtering, and finally evaluate the mobile layout given numerous small tap target warnings on desktop.

## Coverage Targets

- pages: `Thoroughly exercise all major sections of the single index.html page.`
- features: `Validate live block builder (sync, add, autosave), integration search, SDK tabs, and scroll animations.`
- mobile: `Assess navigation tap targets and complex component stacking behavior.`

## Planned Phases

### Global Navigation & Animation

- Objective: Validate sticky navigation, anchor links, and scroll-triggered animations.
- Target pages: index.html
- Key checks:
  - Click top nav links (Product, Builder, SDKs, Pricing) and verify smooth scrolling or correct hash navigation
  - Observe the stats section to ensure the count-up IntersectionObserver triggers correctly upon scroll into view
- Exit criteria:
  - Nav links successfully navigate to corresponding sections
  - Stats visually animate when scrolled into the viewport

### Live Block Builder Interaction

- Objective: Deeply test the interactive two-pane block editor.
- Target pages: index.html
- Key checks:
  - Type text into existing block inputs (e.g., 'New section heading', 'Body paragraph…')
  - Observe the 'saved' indicator change to 'saving' and back to 'saved' (debounced auto-save)
  - Verify typed text appears in the Live Preview pane
  - Click '+ Paragraph', '+ Heading', or '+ Image' buttons and verify new blocks are added to both panes
  - Test block deletion or type switching if controls are visible
- Exit criteria:
  - Text inputs successfully sync to the live preview pane
  - Auto-save indicator reacts to input
  - New blocks can be added and rendered

### SDK Tabs & Integrations Search

- Objective: Validate the functionality of the developer-focused interactive elements.
- Target pages: index.html
- Key checks:
  - Click through the different SDK language tabs and verify code snippet changes
  - Type a known query into the 'Search 24 visible integrations…' input
  - Verify the integration grid filters down to match the search query and the count updates
- Exit criteria:
  - SDK tabs toggle content without page reload
  - Integration search actively filters the visible grid cards

### Mobile Viewport & Layout Validation

- Objective: Test the site's responsiveness, particularly the complex components and identified layout warnings.
- Target pages: index.html
- Key checks:
  - Switch to mobile viewport
  - Check if the top navigation collapses into a hamburger menu or remains usable despite 'small_tap_target' warnings
  - Examine how the two-pane Live Block Builder adapts (e.g., stacked layout or tabbed)
  - Interact with the integrations search to ensure keyboard usability on mobile
- Exit criteria:
  - Mobile layout is captured and evaluated for usability
  - Complex components degrade gracefully on smaller screens

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

