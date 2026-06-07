# UXAgent Exploration Plan

## Goal

Autonomously explore and critique the UX of the full stripe-docs system, prioritizing the primary docs/tutorial flow plus adjacent pages, states, and recovery paths.

## Plan Summary

The exploration will start by verifying global navigation, including the side nav, top nav, and the search dialog. It will then deep-dive into the primary 'Hosted quickstart' tutorial, interacting with code blocks (language switchers, copy buttons). Following that, it will validate the adjacent 'Embedded' and 'Customization' pages to ensure state consistency and content accuracy. Finally, it will rigorously test the mobile viewport, focusing on how the complex 3-column layout collapses and whether the identified small tap targets cause usability issues.

## Coverage Targets

- pages: `Visit all 3 known HTML pages (index.html, embedded.html, customization.html).`
- features: `Exercise search dialog, code block tabs/copy buttons, and navigation menus.`
- mobile: `Test responsive layout collapse and interact with flagged small tap targets on mobile.`

## Planned Phases

### Global Navigation & Search

- Objective: Validate top and side navigation mechanisms and the search dialog functionality.
- Target pages: index.html
- Key checks:
  - Click top nav links (Hosted, Embedded, Customization) to verify routing.
  - Click left nav links to verify routing.
  - Open search dialog via click on the search input/button.
  - Open search dialog via the '/' keyboard shortcut (if possible).
  - Close the search dialog via click outside or 'Esc'.
- Exit criteria:
  - Navigated successfully between local HTML pages using both top and side menus.
  - Search dialog opened and closed successfully.

### Core Tutorial Interactions

- Objective: Exercise the rich interactive elements within the main tutorial content.
- Target pages: index.html
- Key checks:
  - Click code block language switchers (e.g., 'Node') and verify code content updates.
  - Click 'Copy' buttons on code blocks and look for success feedback.
  - Scroll through the page and observe if the right-side outline updates (scroll-spy).
  - Interact with feedback buttons ('Yes' / 'No') at the bottom of the page.
- Exit criteria:
  - Language switchers toggled.
  - Copy buttons clicked and feedback observed.

### Adjacent Pages Validation

- Objective: Ensure secondary pages load correctly and maintain navigation state.
- Target pages: embedded.html, customization.html
- Key checks:
  - Navigate to embedded.html and verify the active state in the left nav.
  - Interact with code blocks specific to embedded.html.
  - Navigate to customization.html and verify content loads correctly.
  - Check external links to 'Branding settings' for proper attributes (e.g., target='_blank').
- Exit criteria:
  - Both embedded.html and customization.html visited and core elements interacted with.

### Mobile Responsiveness & Usability

- Objective: Evaluate layout collapse and tap target sizes on mobile.
- Target pages: index.html, customization.html
- Key checks:
  - Switch to mobile viewport.
  - Verify how the left sidebar and right outline collapse (e.g., hidden behind a menu toggle).
  - Attempt to tap small targets flagged in the prescan (e.g., 'Copy' buttons, 'Yes'/'No' buttons, specific nav links).
  - Open search dialog on mobile and verify it is usable.
- Exit criteria:
  - Mobile layout verified, menu toggles exercised, and small tap targets tested for usability.

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

