# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full lattice system, prioritizing the primary pricing flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

The Lattice DB pricing page offers a highly interactive and transparent two-dimensional pricing matrix that provides excellent immediate feedback on desktop. However, the mobile experience is severely compromised by a non-responsive 6-column matrix causing horizontal overflow and critically small tap targets for add-on checkboxes (13x13px). Additionally, multiple navigation and footer links are unimplemented dead-ends with no user feedback, and the 'How we got this number' expansion is difficult to discover and interact with.

## Issues (6)

### [HIGH] the-pricing-page-has-a-horizontal — mobile usability
- **Page**: `pricing.html`
- **Problem**: The pricing page has a horizontal overflow on mobile viewports, with the page width being 475px while the viewport is only 390px.
- **Evidence**: Layout warnings consistently flag: 'Page width 475px exceeds viewport 390px' on mobile. The 6-column pricing matrix (e.g., 'Up to 50 GB', '50 – 250 GB', etc.) does not scale down for smaller screens.
- **Suggested fix**: Implement a responsive layout for the pricing matrix on mobile, such as a horizontally scrollable container with sticky row/column headers, or an alternative input method (e.g., dropdowns for seats and data volume).

### [HIGH] all-9-add-on-checkboxes-have — mobile usability
- **Page**: `pricing.html`
- **Problem**: All 9 add-on checkboxes have extremely small tap targets (13x13px), far below the 44px minimum mobile touch guideline.
- **Evidence**: Layout warnings flag all add-on checkboxes (ux-40 to ux-48) as 13x13px. E.g., 'Tap target is 13x13px, below the 44px mobile guidance.' for 'Continuous cross-region backups +15%'.
- **Suggested fix**: Increase the clickable area of the checkboxes to at least 44x44px using CSS padding or by making the entire label text a clickable area for the checkbox.

### [MEDIUM] multiple-navigation-and-footer-links-point — feedback
- **Page**: `index.html, pricing.html`
- **Problem**: Multiple navigation and footer links point to placeholder '#' hrefs, resulting in no navigation and no user feedback when clicked.
- **Evidence**: Clicking 'Docs', 'Customers', 'Book demo', 'Blog', 'Careers', and 'Security' links appends '#' to the URL with no visible change or feedback. E.g., 'Clicking the Docs nav link (href='#') only appends '#' to the URL with no visible page change or user feedback'.
- **Suggested fix**: Either implement the destination pages, provide a visual indicator that the feature is coming soon, or disable the links and change the cursor to indicate they are not currently actionable.

### [MEDIUM] the-how-we-got-this-number — affordance
- **Page**: `pricing.html`
- **Problem**: The 'How we got this number' expansion in the sticky quote card is difficult to discover and interact with, lacking a dedicated interactable target ID.
- **Evidence**: The agent repeatedly failed to trigger the expansion, noting: 'The visible text... lacks a dedicated interactable target ID in the DOM summary, suggesting the expansion trigger might be poorly marked up or not easily accessible'.
- **Suggested fix**: Wrap the 'How we got this number' text in a semantic `<button>` or `<a>` element with clear focus/hover states and an expand/collapse icon (e.g., chevron) to signal interactivity.

### [MEDIUM] core-navigation-links-have-tap-targets — mobile usability
- **Page**: `index.html, pricing.html`
- **Problem**: Core navigation links have tap targets smaller than the 44px mobile height guidance, making them difficult to activate accurately on touch screens.
- **Evidence**: Layout warnings flag 'Lattice DB' (123x28px), 'Pricing' (45x21px), 'Docs' (31x21px), and 'Book demo' (105x41px) as below the 44px minimum height.
- **Suggested fix**: Increase the vertical padding of navigation links to ensure a minimum touch target height of 44px. Consider using a hamburger menu on mobile to space out links more generously.

### [LOW] clicking-the-pricing-navigation-link-while — feedback
- **Page**: `pricing.html`
- **Problem**: Clicking the 'Pricing' navigation link while already on the pricing page reloads the page with no visual feedback or indication that the user is already on that page.
- **Evidence**: Clicking 'Pricing' (ux-2) on pricing.html 'reloads the current page with no visible change, confirming expected self-link behavior but offering no user feedback'.
- **Suggested fix**: Apply an 'active' visual state (e.g., different color, underline, or bold) to the 'Pricing' link when the user is on the pricing page, and consider removing the link behavior (e.g., using `aria-current="page"`).
