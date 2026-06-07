# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full orbitride system, prioritizing the primary checkout/booking flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

OrbitRide’s core booking flow is understandable and preserves trip context reasonably well across search, results, extras, and payment, but several key moments leave users without enough feedback to recover confidently. The biggest UX problems are silent blocking on passenger and seat steps, weak filter feedback, and recurring mobile usability issues from horizontal overflow and undersized touch targets. Coverage was substantial but not complete, so some lower-level payment and optional-field behaviors remain unverified.

## Issues (8)

### [HIGH] the-passenger-step-can-block-progression — error recovery
- **Page**: `passengers.html / Continue to payment button`
- **Problem**: The passenger step can block progression without telling users what is missing or wrong. Clicking "Continue to payment" repeatedly kept users on the same page with no visible validation, error banner, or field-level guidance.
- **Evidence**: In steps 07-18 and 19-24, clicking "Continue to payment" on passengers.html produced no navigation and no visible text change even after filling Passenger 1 first name, last name, email, phone, date of birth, and some Passenger 2 fields. Chunk summaries explicitly note "no inline errors, banners, or validation text" while 13 inputs remained on screen.
- **Suggested fix**: When submission is blocked, immediately show inline errors on the missing fields and a summary near the CTA explaining what still needs attention. Also mark required fields consistently before submit so users know expectations upfront.

### [HIGH] the-mobile-layouts-overflow-horizontally-on — mobile usability
- **Page**: `index.html and routes.html mobile layouts`
- **Problem**: The mobile layouts overflow horizontally on key pages, making the search form and results feel cramped and partially cut off.
- **Evidence**: Layout warnings report index.html width 433px on a 390px viewport and routes.html width 760px on a 390px viewport. Recent mobile observations note the TO/PASSENGERS side of the landing form pushed toward the right edge, and the routes screenshot showed date chips/content cut off to the right.
- **Suggested fix**: Refit the mobile layout to the viewport: stack fields and filters cleanly, prevent cards/carousels from extending beyond screen width, and ensure all core actions remain fully visible without sideways scrolling.

### [MEDIUM] filter-behavior-is-not-communicated-clearly — feedback
- **Page**: `routes.html / amenities and time filters`
- **Problem**: Filter behavior is not communicated clearly enough, especially when a filter appears to do nothing or when results change without an explicit summary.
- **Evidence**: Clicking the Wi‑Fi filter left all 8 trips visible, all of which already showed a wifi badge, so the effect was unclear. Other filters such as Express, Restroom, and Power outlet did reduce visible trips, but chunk summaries repeatedly note there is no results count, active-filter chip, or "showing X trips" feedback.
- **Suggested fix**: Add active filter chips and a visible results count that updates instantly. For redundant filters like Wi‑Fi when all current results match, explain that all displayed trips already include that amenity.

### [MEDIUM] many-interactive-controls-are-too-small — accessibility
- **Page**: `routes.html, extras.html, confirmation.html, index.html mobile`
- **Problem**: Many interactive controls are too small for touch and likely difficult for users with motor or accessibility needs.
- **Evidence**: Across pages, layout warnings flagged 13x13px filter checkboxes on routes, 78x37px Select buttons, 28x28px luggage +/- steppers on extras, confirmation CTAs around 37px tall, and a 119x28px OrbitRide logo link. The final mobile observation also flagged the Find rides button at 192x37px.
- **Suggested fix**: Increase touch target height/width to meet mobile guidance, enlarge checkbox hit areas via labels/containers, and give primary CTAs a minimum 44px height throughout the flow.

### [MEDIUM] the-extras-baggage-controls-are-hard — forms
- **Page**: `extras.html / luggage rows and quantity inputs`
- **Problem**: The extras baggage controls are hard to understand and less accessible because quantity inputs are unlabeled and direct editing is unavailable.
- **Evidence**: Chunk summaries for extras.html report multiple quantity inputs with missing labels, small 28x28px +/- controls, and a failed attempt to type into a readonly quantity input (`<input readonly value="0">`). Visible text also showed checked-bag pricing appearing truncated ('$9 / $14 / $14…').
- **Suggested fix**: Attach explicit labels to each quantity field, make the whole row easier to parse, and consider allowing direct number entry alongside larger stepper controls. Ensure baggage price text is fully readable.

### [MEDIUM] important-trust-building-and-post-booking — trust
- **Page**: `payment.html and confirmation.html`
- **Problem**: Important trust-building and post-booking actions feel weak because payment reassurance is minimal and several confirmation actions appear inert.
- **Evidence**: On payment.html, the summary notes no visible security badges, PCI/encryption messaging, or explanation of payment methods, while a processing fee appears late in the flow. On confirmation.html, clicking "Manage trip," "Add to calendar," and on mobile "Email me a copy" caused no URL change, text change, dialog, or success feedback.
- **Suggested fix**: Add concise payment reassurance near card entry and explain fees earlier. For confirmation actions, provide immediate visible feedback such as a download, modal, toast, or destination page so users know the action worked.

### [MEDIUM] trip-context-becomes-too-generic-on — clarity
- **Page**: `seats.html / top summary area`
- **Problem**: Trip context becomes too generic on the seat-selection step, making it harder to confirm the chosen ride before continuing.
- **Evidence**: After selecting a trip on mobile, seats.html showed only generic context such as "10:00 · price locked," "Trip base $34.00," and "Pick your 1 seats." The recent trajectory explicitly notes that origin/destination and carrier details from the selected result were not visibly preserved on this step.
- **Suggested fix**: Carry forward a compact but complete trip summary on the seat page, including route, date, departure/arrival times, and carrier, not just a price chip and seat count prompt.

### [LOW] the-orbitride-logo-is-a-weak — affordance
- **Page**: `header logo across index.html, extras.html, seats.html`
- **Problem**: The OrbitRide logo is a weak navigation affordance: on internal pages it abruptly drops users back to the homepage with no warning, while on the homepage it is just a redundant self-link with no feedback.
- **Evidence**: Clicking the logo from extras and seats returned users to index.html and removed checkout context without any visible message. In the final mobile step, tapping the logo on index.html produced no URL or visible-text change. The logo target is also small on mobile (119x28 or 83x27 in observations).
- **Suggested fix**: Either preserve and explain draft progress when leaving checkout, or warn users they are exiting the booking flow. On the homepage, consider making the logo non-clickable or providing a clearer purpose.
