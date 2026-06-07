# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full orbitride system, prioritizing the primary checkout/booking flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

OrbitRide’s booking flow is functionally coherent end to end, but the mobile experience has clear usability debt. The biggest issues are horizontal overflow, undersized touch targets, and several controls that feel visually present yet hard to use or ambiguous on small screens. Coverage is substantial but not complete, so some untested areas like extras and confirmation should still be considered before concluding the flow is fully polished.

## Issues (7)

### [HIGH] the-routes-page-does-not-fit — mobile usability
- **Page**: `routes.html / mobile screenshot agentic-80-drag-mobile.png`
- **Problem**: The routes page does not fit the mobile viewport cleanly and forces horizontal scrolling/edge clipping, which makes the booking results harder to scan and interact with.
- **Evidence**: On mobile, the page reported horizontal overflow (760px content vs 390px viewport). The recent observation also shows content cut off at the right edge, and the interactable list includes off-screen positions like the OrbitRide logo at x:-21. The mobile screenshot shows the filter area and date chips extending beyond the visible width.
- **Suggested fix**: Rework the routes layout into a true mobile stack: collapse the filter panel, allow trip cards to wrap, and ensure the date carousel and action buttons stay within the viewport width.

### [HIGH] several-core-mobile-controls-are-too — affordance
- **Page**: `routes.html, index.html, payment.html, confirmation.html`
- **Problem**: Several core mobile controls are too small to be reliably tapped, including amenity checkboxes, header links, and Select buttons.
- **Evidence**: The observations flag 13x13px checkboxes for Wi-Fi/Power outlet/Restroom/Express, 78x37px Select buttons, and a 113x27px OrbitRide logo link, all below the 44px mobile guidance. Similar small-target warnings were noted across routes, index, payment, and confirmation pages.
- **Suggested fix**: Increase hit areas to at least 44x44px, add padding around checkbox labels and buttons, and reduce reliance on tiny inline header links for important navigation.

### [MEDIUM] the-popular-routes-section-looks-like — clarity
- **Page**: `index.html / Popular routes`
- **Problem**: The Popular routes section looks like a set of booking shortcuts, but it gives little or no affordance that the cards are interactive.
- **Evidence**: Repeated attempts to click the popular route card timed out or failed to resolve a real locator, and the observations describe the cards as plain bordered blocks with no visible hover, link, or navigation feedback. On mobile, the cards were described as reading more like decorative recommendations than booking shortcuts.
- **Suggested fix**: Make the cards obviously clickable with a visible link style, chevron, or button treatment, and ensure the full card is an accessible tap target that clearly navigates.

### [MEDIUM] the-seat-selection-page-blocks-continue — feedback
- **Page**: `seats.html`
- **Problem**: The seat-selection page blocks Continue until seats are chosen, but the empty state relies mostly on a subtle summary line instead of explicit guidance.
- **Evidence**: The mobile seat page clearly shows 'Pick your 2 seats' and the sidebar reads 'No seats selected,' while Continue is disabled. The observation notes that progression is blocked, but there is no explicit error message or instruction explaining what to do next.
- **Suggested fix**: Add a short helper message near the CTA such as 'Select 2 available seats to continue' and surface clearer selection feedback as seats are picked.

### [MEDIUM] the-mobile-seat-map-interaction-appears — affordance
- **Page**: `seats.html / mobile`
- **Problem**: The mobile seat map interaction appears hard to surface and may not expose the grid as clearly tappable elements.
- **Evidence**: A seat click failed because the expected locator was not found, and the mobile DOM summary surfaced only the OrbitRide link and disabled Continue button as interactables. The reflection explicitly notes that the seat grid was not being surfaced as individually interactable in that mobile snapshot.
- **Suggested fix**: Increase seat hit areas, ensure each available seat has a distinct accessible control, and provide stronger pressed/selected states so tapping feels reliable.

### [LOW] the-email-me-a-copy-confirmation — feedback
- **Page**: `confirmation.html`
- **Problem**: The 'Email me a copy' confirmation action appears to be a dead-end with no visible response.
- **Evidence**: Clicking 'Email me a copy' on confirmation produced no visible change, URL change, or error state. The page does show a clear booked state and other actions, but this one lacks observable feedback.
- **Suggested fix**: Add immediate feedback such as a toast, inline success message, loading state, or email-sent confirmation after the action is triggered.

### [LOW] some-inputs-on-extras-and-payment — forms
- **Page**: `extras.html, payment.html`
- **Problem**: Some inputs on extras and payment lack strong labeling or are visually too compact, increasing form friction.
- **Evidence**: The extras page has quantity inputs with no visible label/placeholder in the DOM summary and 28x28 stepper buttons. The payment page also has low-severity touch issues, including 13x13 radio controls, a small save-account checkbox area, and compact Apply/policy links.
- **Suggested fix**: Add persistent labels, enlarge steppers and radio hit areas, and group payment options with clearer spacing and explanatory text.
