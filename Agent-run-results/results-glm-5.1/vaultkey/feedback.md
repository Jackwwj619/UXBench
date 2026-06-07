# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full vaultkey system, prioritizing the primary settings/privacy flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

The Vaultkey site suffers from significant UX issues that undermine user trust and task completion, particularly on mobile. Critical problems include broken interactive components like the FAQ accordion, misleading pricing states, and non-functional navigation links that act as dead ends. Mobile usability is severely compromised by undersized tap targets and horizontal overflow, making core interactions like the Business seat slider highly frustrating.

## Issues (7)

### [HIGH] the-faq-accordion-items-fail-to — feedback
- **Page**: `pricing.html FAQ section`
- **Problem**: The FAQ accordion items fail to expand or provide visual feedback when clicked, leaving users unable to access the information.
- **Evidence**: Clicking FAQ items like 'Is the Personal plan really free forever?', 'Do passkeys work everywhere?', and 'How does Business billing work?' resulted in no visible text change, no content expansion, and the '▼' indicator failing to update to '▲'.
- **Suggested fix**: Ensure the JavaScript for the FAQ accordion correctly toggles an 'active' class to expand the content and rotate the arrow indicator. Provide a fallback or ensure event listeners are properly attached.

### [HIGH] the-family-plan-displays-billed-yearly — clarity
- **Page**: `pricing.html plan cards`
- **Problem**: The Family plan displays 'Billed yearly' text even when the Monthly billing toggle is active, and the Business plan yearly total does not reflect the advertised 20% annual discount.
- **Evidence**: When the Monthly toggle is active, the Family plan still shows 'Billed yearly'. Additionally, the Business plan yearly total calculates to $1006.56 (12 * $6.99 * 12), which is exactly 12 times the monthly rate with no annual discount applied.
- **Suggested fix**: Update the DOM to dynamically change 'Billed yearly' to 'Billed monthly' when the toggle is switched. Ensure the yearly total calculation applies the 20% discount consistently across all plans.

### [HIGH] interactive-elements-including-navigation-links-ctas — mobile usability
- **Page**: `pricing.html, index.html header and interactive controls`
- **Problem**: Interactive elements, including navigation links, CTAs, billing toggles, and the Business seat slider, have tap targets well below the 44px minimum mobile guideline.
- **Evidence**: Layout warnings flagged 'Sign in' (44x16px), 'Help' (30x30px), 'Get Vaultkey' CTA (125x34px), billing toggles (153x32px, 90x32px), and the Business seat slider (16px height).
- **Suggested fix**: Increase padding on nav links, CTAs, and toggles to meet the 44x44px minimum touch target size. For the slider, increase the track height or use a larger custom thumb hitbox.

### [MEDIUM] primary-ctas-and-navigation-links-are — goal completion
- **Page**: `index.html, pricing.html navigation and CTAs`
- **Problem**: Primary CTAs and navigation links are non-functional placeholder links that lead to dead ends.
- **Evidence**: Clicking 'Get Personal', 'Get Vaultkey', 'Talk to sales →', 'Help', and 'Security' only appends '#' to the URL with no visible navigation, modal, or feedback.
- **Suggested fix**: Replace '#' hrefs with proper destination pages, or implement modals/inline forms for actions like 'Talk to sales'. At a minimum, add visual feedback or a 'Coming soon' state.

### [MEDIUM] the-business-plan-seat-number-input — accessibility
- **Page**: `pricing.html Business plan number input`
- **Problem**: The Business plan seat number input lacks a proper label, aria-label, or placeholder, and its accessible name fails to update dynamically.
- **Evidence**: The number input was flagged as having no label, aria-label, or placeholder. Additionally, after changing the value to 192, the input's 'name' attribute in the DOM summary remained '12'.
- **Suggested fix**: Add a visible <label> element associated with the input, or an aria-label like 'Number of seats'. Ensure ARIA live regions or attribute updates announce value changes to assistive technologies.

### [MEDIUM] the-page-content-overflows-the-mobile — mobile usability
- **Page**: `pricing.html feature comparison table`
- **Problem**: The page content overflows the mobile viewport, causing horizontal scrolling and layout issues.
- **Evidence**: On a 390px mobile viewport, the page width was detected as 395px. Feature comparison table text was truncated ('VAULT & SYNC Unlimited p'), indicating poor mobile readability.
- **Suggested fix**: Ensure all container elements use responsive CSS (e.g., max-width: 100%, overflow-x: auto for tables). Convert the feature comparison table to a stacked or accordion layout on mobile.

### [LOW] the-faq-accordion-arrow-indicator-does — feedback
- **Page**: `pricing.html FAQ section`
- **Problem**: The FAQ accordion arrow indicator does not visually update to reflect the expanded state.
- **Evidence**: Even when an FAQ item successfully expanded (e.g., 'Can I move my vault from another password manager?'), the arrow indicator remained a '▼' instead of changing to '▲'.
- **Suggested fix**: Use CSS transforms (e.g., rotate(180deg)) on the arrow icon when the accordion item receives an 'active' or 'open' class.
