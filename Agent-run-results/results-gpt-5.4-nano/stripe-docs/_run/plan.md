# UXAgent Exploration Plan

## Goal

Critique and validate the UX quality of the stripe-docs clone, focusing on the primary Hosted quickstart tutorial flow and verifying the adjacent Embedded and Customization pages (including search, navigation, code-copy interactions, and scroll/outline behavior) on both desktop and mobile viewports.

## Plan Summary

Run through the end-to-end tutorial reading experience on index.html (left nav + central steps + right on-this-page outline), exercising key interactions like the top search and code-block copy buttons. Then repeat the same critical checks on embedded.html and customization.html, with extra validation for any page-specific controls (e.g., embedded integration step sequence; branding/custom domain framing). Finally, sanity-check that cross-page navigation (Hosted/Embedded/Customization) preserves state and that external links/markers behave as expected without errors.

## Coverage Targets

- pages: `Visit all known HTML pages: index.html, embedded.html, customization.html (100% page-load coverage).`
- features: `Exercise the top navigation, global search, left nav section jumping, right on-this-page outline/scroll-spy, multi-language code blocks (where present), and copy buttons (multiple instances).`
- mobile: `Repeat the most interaction-heavy checks (search + copy + scroll-spy/outline + left nav jumping) on mobile for each of the three pages.`

## Planned Phases

### Global navigation + Search foundations (desktop first)

- Objective: Verify the top navigation system and search entry/exit behavior, including keyboard affordances and focus handling.
- Target pages: index.html
- Key checks:
  - Click 'Open search (press /)' and confirm the search UI opens with expected placeholder (e.g., Search…) and can be dismissed.
  - Test keyboard path if available: press '/' to open search, then Escape/close to dismiss (observe no focus trap).
  - Click 'Hosted', 'Embedded', 'Customization' in the top bar and ensure navigation leads to the correct local HTML pages (no 404/error state).
  - Verify top CTA-like links ('Branding', 'Open source') open in the intended way (new tab vs same tab) without breaking the local layout on return.
- Exit criteria:
  - Search opens and closes cleanly at least once with no console/network errors observed.
  - Page switching between Hosted/Embedded/Customization succeeds without UI corruption.

### Primary tutorial flow: Hosted quickstart UX audit (index.html)

- Objective: Validate the end-to-end reading and interaction experience for the Hosted quickstart tutorial including navigation, scroll-spy, and code interactions.
- Target pages: index.html
- Key checks:
  - Use the left navigation tree to jump between 'Install the server SDK', 'Create a Checkout Session', 'Post to your Session endpoint', 'Show a success page…', and webhook-related steps; confirm scroll position and section alignment.
  - Scroll through the main tutorial and confirm the right-side on-this-page outline highlights the correct current section (no off-by-one or stuck highlight).
  - For at least two tutorial code blocks: switch the language selector (e.g., 'Node') and verify content changes.
  - Click each 'Copy' button for the selected language and confirm feedback is shown (e.g., copied indicator) and copied content matches the currently displayed code.
  - Interact with the page’s dialog (reported by prescan) once—confirm proper open/close behavior, correct labeling, and return focus to the trigger.
- Exit criteria:
  - At least 3 step jumps via left nav land on the correct content sections.
  - Scroll-spy highlights update consistently while scrolling.
  - Copy works for at least 2 different language states without mismatch.
  - The reported dialog works and can be dismissed without breaking layout.

### Adjacent flow: Embedded checkout quickstart (embedded.html)

- Objective: Repeat the core tutorial UX validations on the Embedded page, emphasizing the step clarity and any embedded-specific interactions.
- Target pages: embedded.html
- Key checks:
  - Jump through the main embedded quickstart steps (mount embedded page with Stripe.js; return_page that can resume/finish flow) using the left nav if present.
  - Validate right-side on-this-page outline behavior during scroll (correct section highlighting).
  - Exercise at least 2 embedded tutorial code blocks: language switch (if present) and Copy for the active language.
  - Trigger and dismiss the page’s dialog once (reported by prescan) to ensure consistent modal behavior across pages.
- Exit criteria:
  - Embedded page left-nav jumping and scroll-spy highlighting both function without incorrect mapping.
  - Copy button(s) succeed and correspond to the active code language.
  - Dialog opens and closes cleanly.

### Adjacent flow: Customization/branding surface UX (customization.html)

- Objective: Validate the customization page’s UX clarity—especially the 'reality-checked' constraints—and ensure interactions and dialogs are consistent.
- Target pages: customization.html
- Key checks:
  - Scroll through sections: 'What Stripe Checkout actually lets you change', 'Most complete branding surface', and 'Custom domains are for the Stripe-hosted page'; confirm the 'on-this-page' outline stays accurate.
  - Exercise at least 2 code blocks (if present) for language switching and Copy behavior.
  - Interact with any customization-specific control(s) implied by text/sections (e.g., branding settings framing) and ensure no dead-end CTA patterns.
  - Trigger and dismiss the reported dialog once; verify it doesn’t obscure critical content permanently.
- Exit criteria:
  - On-this-page outline remains correct through major section boundaries.
  - Copy works for at least 2 code blocks/language states on this page.
  - Dialog behavior matches earlier phases.

### Mobile verification pass (critical checks only)

- Objective: Re-run the highest-risk mobile interactions and layout behaviors on all three pages.
- Target pages: index.html, embedded.html, customization.html
- Key checks:
  - On mobile viewport, verify top navigation and search still function (open search, close it).
  - Test at least one Copy button per page (tap-target risk) and confirm feedback is visible and not clipped.
  - Check scroll-spy/on-this-page outline behavior on mobile (if it collapses or changes placement, validate it still indicates current section or provides an alternate mechanism).
  - Use left navigation tree on mobile (if available) to jump sections and confirm correct landing.
- Exit criteria:
  - No critical tap-target failures for Copy on any page (at least 1 successful copy per page).
  - Search opens/closes correctly on mobile for each page (or persists across navigation without breaking).
  - Mobile outline/navigation does not become unusable.

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

