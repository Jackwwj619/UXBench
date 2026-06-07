# UXAgent Exploration Plan

## Goal

Autonomously explore and critique the UX of the full stripe-docs system, prioritizing the primary docs/tutorial flow plus adjacent pages, states, and recovery paths.

## Plan Summary

The exploration will systematically validate the three-page documentation site, starting with the primary hosted checkout tutorial on index.html, moving to the embedded variant, and finishing with customization. Each phase will test interactive documentation controls like language switchers, copy buttons, and the search dialog, while verifying navigation consistency and layout responsiveness. High-risk areas such as small tap targets and interactive code blocks will receive focused validation on both desktop and mobile viewports.

## Coverage Targets

- pages: `visit all 3 known HTML pages on both desktop and mobile`
- features: `exercise language switchers, copy buttons, search dialog, and scroll-spy on each page`
- mobile: `validate all identified small tap targets and code block interactions on mobile viewport`

## Planned Phases

### Primary Hosted Flow Validation

- Objective: Validate the core tutorial experience, interactive code blocks, and scroll-spy navigation on the main index.html page.
- Target pages: index.html
- Key checks:
  - Verify scroll-spy highlighting in the right-side outline matches scroll position
  - Click language switcher buttons (e.g., Node) and confirm code snippet updates
  - Click copy buttons on code blocks and verify feedback
  - Open the search dialog, type a query, and close it
- Exit criteria:
  - All code block interactions tested
  - Search dialog opened and closed successfully
  - Scroll-spy behavior observed

### Embedded Checkout Flow

- Objective: Validate the embedded checkout tutorial page, ensuring consistent navigation and functional interactive elements.
- Target pages: embedded.html
- Key checks:
  - Navigate to embedded.html via top nav and left sidebar
  - Verify language switcher and copy button functionality on embedded code blocks
  - Check that the right-side outline updates correctly for this page's content
- Exit criteria:
  - Page fully scrolled and outline verified
  - Code interactions function as expected
  - Navigation consistency confirmed

### Customization Flow

- Objective: Validate the customization page, focusing on its specific content structure and interactive elements.
- Target pages: customization.html
- Key checks:
  - Navigate to customization.html via top nav and left sidebar
  - Interact with any specific code blocks or UI examples on this page
  - Verify left sidebar active state highlights 'Customize Checkout'
- Exit criteria:
  - Customization page interactions completed
  - Sidebar active states validated

### Mobile Responsiveness & Tap Targets

- Objective: Validate the mobile layout, focusing on identified risk hotspots like small tap targets and code block usability.
- Target pages: index.html, embedded.html, customization.html
- Key checks:
  - Switch to mobile viewport and verify hamburger menu or collapsed navigation
  - Test tap targets for footer links and copy buttons on mobile
  - Verify code block scrolling and language switching on small screens
  - Test search dialog open/close on mobile
- Exit criteria:
  - All pages viewed on mobile viewport
  - Small tap target interactions attempted
  - Mobile navigation fully exercised

## Prescan Summary

### Stripe-hosted Checkout quickstart | Stripe docs clone

- Page: `index.html`
- Headings: Build a Stripe-hosted checkout page that behaves like the real docs., No more dead links or fake guidance, Why start with the Stripe-hosted page, Lowest integration effort, Same Sessions API, more in-page control, Install the Stripe server SDK, Create a Checkout Session on your server, Post to your Session endpoint from the storefront, Your site, Show a success page, but fulfill from webhooks
- Interactables: `23` buttons, `41` links, `1` inputs
- Notable controls:
  - clickable:a:Stripe docs clone home
  - clickable:a:Hosted
  - clickable:a:Embedded
  - clickable:a:Customization
  - clickable:a:Official docs
  - clickable:button:Open search (press /)
  - clickable:a:Branding
  - clickable:a:Open source

### Customize Checkout | Stripe docs clone

- Page: `customization.html`
- Headings: Customize Checkout without inventing controls Stripe doesn’t actually offer., Checkout stays opinionated on purpose, What Stripe Checkout actually lets you change, Most complete branding surface, Same policy tools, narrower visual surface, Appearance and branding settings, Text, policies, support details, and terms, Filter card brands with brands_blocked, Custom domains are for the Stripe-hosted page, Valid use case
- Interactables: `17` buttons, `42` links, `1` inputs
- Notable controls:
  - clickable:a:Stripe docs clone home
  - clickable:a:Hosted
  - clickable:a:Embedded
  - clickable:a:Customization
  - clickable:a:Official docs
  - clickable:button:Open search (press /)
  - clickable:a:Branding
  - clickable:a:Open source

### Embedded Checkout page quickstart | Stripe docs clone

- Page: `embedded.html`
- Headings: Embed Stripe Checkout on your site without freezing the docs in an old API version., Keep checkout on your domain while Stripe still owns the secure payment UI, When to use the embedded page instead of hosted or Elements, Best when you want in-page checkout with low code, Use only when you need deeper UI control, Install the server SDK and load Stripe.js on the page, Create an embedded Checkout Session on the server, Mount the embedded page with Stripe.js, What your app owns, Build a return page that can resume or finish the flow
- Interactables: `26` buttons, `42` links, `1` inputs
- Notable controls:
  - clickable:a:Stripe docs clone home
  - clickable:a:Hosted
  - clickable:a:Embedded
  - clickable:a:Customization
  - clickable:a:Official docs
  - clickable:button:Open search (press /)
  - clickable:a:Branding
  - clickable:a:Open source

