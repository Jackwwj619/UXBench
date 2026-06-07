# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full shopify system, prioritizing the primary form/onboarding flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

The core marketing-to-trial funnel is mostly understandable, with clear hero CTAs and reassuring success states on login and sales submission. However, the mobile experience shows notable friction: the pricing page overflows horizontally, several navigation/tap targets are too small, and the monthly/yearly pricing switch could not be verified as functioning despite being highly visible. Coverage is strong across the main pages, but some controls and recovery paths are still untested, so the findings below focus on issues with direct evidence rather than assuming completeness.

## Issues (8)

### [HIGH] the-pricing-page-is-wider-than — mobile usability
- **Page**: `pricing.html / mobile screenshot / layout warning`
- **Problem**: The pricing page is wider than the mobile viewport, creating horizontal overflow that can make content harder to scan and interact with on small screens.
- **Evidence**: Final mobile observation on pricing.html reports layout warning: 'Page width 422px exceeds viewport 390px.' The mobile screenshot also shows the full pricing hero and plan cards squeezed into the narrower screen.
- **Suggested fix**: Make the pricing layout fully responsive at 390px width by removing fixed-width elements, allowing plan cards and footer sections to reflow vertically, and testing common mobile widths end to end.

### [HIGH] the-billing-switch-is-visually-prominent — affordance
- **Page**: `pricing.html / monthly-yearly toggle`
- **Problem**: The billing switch is visually prominent, but interactions did not produce any observable billing-state change, leaving users without confirmation that the control works.
- **Evidence**: On mobile pricing.html, the visible text remains 'Pay monthly' and 'Pay yearly (save 25%)' with prices still shown as £25/mo, £65/mo, and £259/mo after attempted clicks. Recent trajectory steps 77-80 note no visible-text change and repeated click failures against the intended toggle locator.
- **Suggested fix**: Ensure the toggle has a clear pressed/selected state, updates the price labels immediately, and exposes an unmistakable visual change when switched; if the control is not wired yet, hide or disable it until it functions.

### [MEDIUM] several-top-level-navigation-controls-are — mobile usability
- **Page**: `index.html / pricing.html header`
- **Problem**: Several top-level navigation controls are below mobile tap-target guidance, which makes the header harder to use on touch devices.
- **Evidence**: Layout warnings flag small tap targets including Shopify (123x35), Log in (83x44), and Menu (20x14) on the mobile homepage/pricing context; trajectory notes also mention header items like Pricing and Resources being under 44px guidance.
- **Suggested fix**: Increase the height/spacing of header items to at least 44px, simplify the mobile header into a larger menu button, and verify all primary nav links are comfortably tappable.

### [MEDIUM] many-footer-and-support-links-are — mobile usability
- **Page**: `pricing.html footer / resources.html support links`
- **Problem**: Many footer and support links are rendered as very short rows, making them difficult to tap accurately on mobile.
- **Evidence**: Final observation lists multiple footer links on pricing.html at 342x21px and earlier notes flag About, Careers, Investors, Press and Media, Merchant Support, Help Center, and Shopify Community as below 44px guidance.
- **Suggested fix**: Increase link row height and vertical spacing in the footer and support sections, and group related links into clearer touch-friendly blocks.

### [MEDIUM] the-homepage-and-pricing-entry-points — clarity
- **Page**: `index.html / pricing.html / free-trial-form.html`
- **Problem**: The homepage and pricing entry points show strong CTA visibility, but the journey between pages is not always self-explanatory because some clicks resolve to different onboarding states than expected.
- **Evidence**: Session memory notes that clicking Pricing from one context landed on free-trial onboarding instead of the pricing page, and clicking Start free trial from pricing sent the user into the onboarding form rather than a simple plan-selection transition.
- **Suggested fix**: Differentiate the labels and/or add helper text for the main conversion paths, such as 'Compare plans,' 'Start trial,' and 'Continue setup,' so the next step is clearer before users click.

### [MEDIUM] some-primary-actions-provide-visible-feedback — feedback
- **Page**: `index.html / free-trial-form.html / pricing.html`
- **Problem**: Some primary actions provide visible feedback, but others appear to stall or keep the user in place without confirming the next step, which can feel ambiguous during onboarding.
- **Evidence**: Homepage trial start changed the button to 'Starting…' while keeping the email field visible, and free-trial-form 'Next' changed state without a URL change. Several attempted clicks also timed out without obvious UI response, especially around the pricing toggle area.
- **Suggested fix**: Standardize loading/progress feedback across all primary actions, and ensure each step either clearly advances in-page with a visible step indicator or navigates to a new URL with an obvious confirmation.

### [LOW] some-resource-and-footer-destinations-use — navigation
- **Page**: `resources.html / free-trial.html footer`
- **Problem**: Some resource and footer destinations use dead-end hrefs ('#'), which weakens navigation utility when users look for supporting content.
- **Evidence**: Coverage notes cite several resource cards and footer links as generic or dead-end hrefs (#), and the resources hub includes a mix of functional and placeholder links.
- **Suggested fix**: Replace placeholder links with working destinations or hide unfinished items until they lead somewhere meaningful.

### [LOW] the-shopify-logo-and-some-compact — accessibility
- **Page**: `index.html / pricing.html header`
- **Problem**: The Shopify logo and some compact controls are below recommended touch size, which may be harder to activate accurately on mobile.
- **Evidence**: Layout warnings note the Shopify logo at 123x35px and, in related mobile observations, a 20x14px Menu button, both below the 44px mobile guidance.
- **Suggested fix**: Enlarge logo and menu hit areas, not just the visible icon, and validate touch targets against common mobile accessibility guidance.
