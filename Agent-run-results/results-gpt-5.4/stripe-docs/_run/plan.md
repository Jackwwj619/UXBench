# UXAgent Exploration Plan

## Goal

Autonomously explore and critique the full Stripe docs clone experience, centering on the hosted Checkout quickstart as the main journey, then validating adjacent embedded and customization docs flows, key interactive docs controls, and responsive behavior.

## Plan Summary

Start on the hosted quickstart and treat it as the primary documentation flow: verify navigation structure, tutorial progression, code example interactions, search/dialog behavior, and cross-links to adjacent local pages and external references. Then cover the embedded and customization pages to confirm the docs system stays consistent while content and guidance change appropriately. Finish with focused mobile checks on the most interaction-dense areas, especially navigation, code controls, dialog/search access, and small tap targets already flagged in prescan.

## Coverage Targets

- pages: `Visit all 3 known local HTML pages and scroll each enough to validate page-specific headings, tutorial structure, and shared shell behavior.`
- features: `Exercise the major visible controls on the hosted page and representative shared controls on the other two pages: top nav, left rail navigation, search/dialog, code-language switching, copy buttons, in-page outline/scroll behavior, related cards, and a sample of external reference links.`
- mobile: `Repeat the critical hosted flow and at least one adjacent-page check on a mobile viewport, with special attention to prescan-flagged small tap targets and dense code/tutorial sections.`

## Planned Phases

### Primary hosted quickstart baseline

- Objective: Validate the main docs journey on the hosted Checkout page, including page structure, shared navigation, and the core tutorial reading flow.
- Target pages: index.html
- Key checks:
  - Confirm the hosted page loads as the default entry and that top nav, left rail, main content, and right-side outline are all present and understandable.
  - Traverse the hosted tutorial from hero/intro through the major steps such as SDK install, Session creation, storefront post, and webhook fulfillment guidance.
  - Check that top navigation highlights or otherwise indicates the current section/page appropriately for Hosted.
  - Use the left navigation items for local page movement and verify the current-page treatment for 'Hosted quickstart'.
  - Check end-of-page related cards/links that point to embedded.html and customization.html for sensible adjacent-flow handoff.
- Exit criteria:
  - The hosted page's information architecture and primary reading path are understood from top to bottom.
  - At least one path each is confirmed for top-nav, left-nav, and in-content/local related-navigation movement from the hosted page.

### Hosted interactive docs controls

- Objective: Exercise the interaction-heavy controls on the hosted page that are most likely to fail or create UX friction in a docs/tutorial interface.
- Target pages: index.html
- Key checks:
  - Open the search control ('Search… /') and validate whether a dialog appears, whether focus lands correctly, and whether it can be dismissed reliably.
  - If keyboard shortcut support is available from the visible hint ('/'), verify whether slash opens search without disrupting page content.
  - Interact with language/code tabs beginning with the visible 'Node' button and check whether code content, active states, and any test/live markers update coherently.
  - Use multiple copy buttons across different code snippets and verify feedback state, repeatability, and whether copied content appears to match the visible snippet.
  - Observe any sticky or scroll-spy behavior in the right-side outline while scrolling through the long hosted tutorial.
  - Check any visible binary controls such as Yes/No near the bottom area for clear state change and adequate feedback.
- Exit criteria:
  - Search/dialog behavior has been opened and closed successfully at least once.
  - At least two code-related interactions are validated, including tab switching and copy behavior.
  - The on-this-page outline or equivalent in-page navigation has been observed during scroll.

### Adjacent local docs flows

- Objective: Cover the two adjacent local pages and verify that each preserves the shared docs shell while presenting meaningfully distinct guidance.
- Target pages: embedded.html, customization.html
- Key checks:
  - Open embedded.html through local navigation and confirm the page clearly shifts from hosted redirect flow to embedded page guidance.
  - On embedded.html, verify major steps such as server SDK/Stripe.js setup, embedded Session creation, mounting embedded Checkout, and return-page guidance are discoverable and coherent.
  - Open customization.html and verify it clearly frames what Checkout can and cannot be customized, rather than implying unsupported controls.
  - On customization.html, inspect sections around branding settings, text/policies/support details, blocked card brands, and custom domains for clear boundaries and internal consistency.
  - Across both pages, confirm top nav/left nav/current-page indicators stay consistent and allow easy movement back to hosted.
- Exit criteria:
  - Both adjacent local pages have been visited and scrolled enough to validate their main step structure.
  - The differences between hosted, embedded, and customization guidance are explicitly confirmed through content and navigation behavior.

### Cross-link integrity and recovery paths

- Objective: Check how users recover, compare, and branch between local pages and external references without losing orientation.
- Target pages: index.html, embedded.html, customization.html
- Key checks:
  - Test representative external links from the top nav and left reference rail such as Official docs, Branding, Open source, Checkout overview, Webhook quickstart, and Testing cards.
  - Confirm whether external destinations open in a sensible way relative to the local docs experience and whether returning to the local page is straightforward.
  - Use breadcrumb/home/local page links to recover context after visiting adjacent pages or external references.
  - Check whether repeated shared controls across pages behave consistently, especially search, top nav links, and the local section rail.
- Exit criteria:
  - A representative sample of external-reference links has been exercised from at least one page.
  - Recovery back to the local docs flow has been demonstrated after branching away from the primary content.

### Mobile responsiveness and touch usability

- Objective: Repeat the highest-value flows on mobile to validate navigation, dense tutorial content, and the prescan-indicated tap target risks.
- Target pages: index.html, embedded.html, customization.html
- Key checks:
  - On mobile, verify access to top navigation, local page switching, and search/dialog invocation from the hosted page.
  - Check whether long tutorial content remains readable without horizontal overflow and whether code blocks, tabs, and copy controls remain usable.
  - Specifically retest elements flagged with small tap targets where reachable: site home link, breadcrumb/title-style links, copy buttons, Yes/No controls, and bottom/reference links.
  - Confirm the mobile experience still supports movement between hosted, embedded, and customization pages without getting lost in the docs hierarchy.
  - Spot-check at least one adjacent page (embedded or customization) on mobile for the same shell consistency and interaction behavior.
- Exit criteria:
  - Critical hosted interactions have been repeated on mobile: navigation, search, one code tab interaction, and one copy action.
  - At least one additional local page besides index.html has been checked on mobile.
  - Any severe touch/usability regressions or layout breakages have been ruled in or out.

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

