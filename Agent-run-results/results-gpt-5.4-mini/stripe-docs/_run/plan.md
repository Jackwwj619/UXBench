# UXAgent Exploration Plan

## Goal

Explore the Stripe docs clone end-to-end across the hosted quickstart, embedded checkout, and customization pages, validating navigation, interactive doc controls, external references, and responsive behavior without assuming functionality beyond what the prescan shows.

## Plan Summary

Start on the hosted quickstart as the primary flow, then branch into embedded checkout and customization to confirm the adjacent tutorial paths and cross-links. Validate the visible controls that are actually present: top nav tabs, left-side section links, search, branding/open-source links, code block language switches, copy buttons, and any dialog-backed interactions. Repeat the critical checks in mobile viewport, with extra attention to tap targets and layout stability because several controls were flagged as small on mobile.

## Coverage Targets

- pages: `visit all known HTML pages`
- features: `exercise most visible controls per key page, including top nav, local side nav, search/dialog trigger, code language toggle, copy buttons, and selected external links`
- mobile: `repeat critical checks on mobile viewport, prioritizing flagged small tap targets and cross-page navigation`

## Planned Phases

### Host quickstart baseline

- Objective: Validate the main hosted Checkout tutorial flow and its primary in-page interactions on index.html.
- Target pages: index.html
- Key checks:
  - Confirm the hosted page loads with the expected three-column docs layout and top nav
  - Open and close the search control if it reveals a dialog or overlay
  - Exercise the left sidebar navigation and the main hosted content anchors
  - Click at least one code-language toggle and one Copy button in the hosted tutorial
  - Scroll through the page to verify outline/scroll-spy highlighting in the right rail
- Exit criteria:
  - Primary hosted flow visually and interactively confirmed
  - At least one code block interaction and one navigation interaction validated
  - No broken local-state behavior observed in the main content or sidebar

### Hosted adjacent flows and external references

- Objective: Validate the hosted page’s adjacent flows and outbound references for correctness and consistency.
- Target pages: index.html
- Key checks:
  - Open the local links to Embedded payment form and Customize Checkout from the left nav and return to index.html
  - Check the top tabs for Hosted, Embedded, and Customization consistency
  - Open official external references such as Checkout overview, Webhook quickstart, Testing cards, Branding settings, and Official docs/Open source
  - Verify the local breadcrumb/section labeling remains accurate after navigation or return
- Exit criteria:
  - All local cross-links between the three pages have been traversed at least once from the hosted page
  - Several external links have been sampled and their destinations confirmed
  - No obvious mismatch between the page label and the visible hosted tutorial content

### Embedded checkout variant

- Objective: Validate the embedded quickstart as a distinct flow with its own content, controls, and return-path framing.
- Target pages: embedded.html
- Key checks:
  - Confirm the embedded page content differs appropriately from hosted checkout and references ui_mode/embedded behavior
  - Exercise the embedded page’s visible code block interactions, copy controls, and any step markers
  - Check the local nav and top tabs for correct active-state behavior
  - Verify any return_url or resume-flow guidance is presented consistently with the embedded tutorial
- Exit criteria:
  - Embedded variant content is readable and functionally distinct from the hosted flow
  - At least one interactive control on the embedded page has been used successfully
  - Navigation back to the other local pages works from the embedded page

### Customization and policy surface

- Objective: Validate what Checkout branding/customization actually allows and ensure the page does not overpromise unsupported controls.
- Target pages: customization.html
- Key checks:
  - Confirm the page framing is reality-checked and focused on branding, text, policies, blocked card brands, and custom domains
  - Exercise any local controls present on the page, including code or option toggles and copy actions
  - Open relevant external references to Stripe docs or Dashboard branding settings
  - Check that claims about customization remain consistent with the visible controls
- Exit criteria:
  - Customization page content and scope align with its visible controls
  - At least one control and one outbound reference validated
  - No false impression of broad Checkout customization is introduced by the UI

### Responsive and mobile validation

- Objective: Repeat critical interactions on mobile viewport and assess the flagged tap-target and layout risks.
- Target pages: index.html, embedded.html, customization.html
- Key checks:
  - Re-open the three local pages in mobile viewport and confirm the main navigation still works
  - Test the smallest flagged tap targets, especially logo/home, Stripe Checkout link, Copy buttons, Yes/No buttons, and reference links
  - Verify the multi-column layout adapts acceptably without hiding essential content or controls
  - Check that search/dialog behavior remains usable on mobile
- Exit criteria:
  - Critical navigation and content remain usable on mobile
  - At least one representative small-tap-target issue has been confirmed or ruled out in context
  - No major mobile-only breakage prevents the docs flows from being explored

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

