# UXAgent Exploration Plan

## Goal

Autonomously explore and critique the UX of the Stripe Docs clone, focusing on navigation consistency, code snippet usability (copy/switch), and mobile responsiveness across the Hosted, Embedded, and Customization flows.

## Plan Summary

The run will proceed by validating the primary 'Hosted' quickstart flow, then branching to 'Embedded' and 'Customization' pages to ensure consistent layout and navigation. It will specifically test interactive elements like language switchers and copy buttons, while verifying that external links behave correctly. Finally, it will repeat critical checks on a mobile viewport to address known tap-target risks.

## Coverage Targets

- pages: `Visit all 3 local HTML files (index, embedded, customization).`
- features: `Exercise at least one code block switch, one copy action, and the search trigger per page.`
- mobile: `Repeat Phase 1 key checks on mobile viewport for index.html and embedded.html.`

## Planned Phases

### Primary Flow: Hosted Checkout

- Objective: Validate the core tutorial experience on index.html, including navigation, code interaction, and scroll behavior.
- Target pages: index.html
- Key checks:
  - Verify left-nav highlights 'Hosted quickstart' and right-nav scroll-spy updates on scroll.
  - Interact with code block language tabs (e.g., switch Node/Python) to verify content change.
  - Click 'Copy' button on a code block and verify visual feedback (tooltip/state change).
  - Test global search button functionality.
  - Click internal sidebar links ('Embedded payment form', 'Customize Checkout') to ensure routing works.
- Exit criteria:
  - All primary interactables on index.html exercised.
  - Navigation to sibling pages confirmed working.

### Adjacent Flows: Embedded & Customization

- Objective: Ensure structural consistency and correct content rendering on secondary tutorial pages.
- Target pages: embedded.html, customization.html
- Key checks:
  - On embedded.html: Verify active state in left nav updates to 'Embedded payment form'.
  - On embedded.html: Check for iframe-specific warnings or configuration steps.
  - On customization.html: Verify active state updates to 'Customize Checkout'.
  - Compare header/breadcrumb consistency across both pages.
  - Verify external reference links (e.g., 'Official docs') are present and distinct from internal nav.
- Exit criteria:
  - Both secondary pages loaded without error.
  - Navigation state correctly reflects current page context.

### Mobile Responsiveness & Accessibility

- Objective: Identify usability issues on small viewports, specifically targeting the known 'small tap target' risks.
- Target pages: index.html, embedded.html
- Key checks:
  - Switch to mobile viewport (e.g., iPhone SE/12).
  - Verify hamburger menu or mobile nav drawer appears and functions.
  - Attempt to tap 'Copy' buttons and language switches; note any overlap or difficulty.
  - Check if code blocks remain readable or require horizontal scrolling.
  - Verify top-level nav items are accessible and not truncated.
- Exit criteria:
  - Critical mobile paths (nav, read content) are functional.
  - List of specific UI overlaps or unclickable elements documented.

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

