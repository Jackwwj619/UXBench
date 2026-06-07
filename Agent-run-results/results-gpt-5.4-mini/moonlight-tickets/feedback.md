# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full moonlight-tickets system, prioritizing the primary checkout/booking flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

The booking flow is visually coherent and preserves event context well from discovery to event detail to checkout, with clear order summaries and pricing updates. The biggest UX gaps are around completion and recovery: confirmation.html appears unreachable from the app shell, and several critical controls in checkout and event detail are too small or lack visible feedback. I also found form/accessibility friction in checkout, including at least one unlabeled input and controls that were hard to verify or interact with reliably.

## Issues (7)

### [HIGH] the-booking-flow-does-not-present — goal completion
- **Page**: `confirmation.html / checkout.html`
- **Problem**: The booking flow does not present a reachable end-state: attempts to open confirmation.html repeatedly rerouted back to index.html, and the final confirmation page was never observed.
- **Evidence**: Multiple trajectory steps report that opening confirmation.html landed on the homepage instead of a completion page (e.g. steps 31-36, 49-54, 55-60, 67-72, 73-78, 79-80). The recent trajectory notes: 'The attempted open of confirmation.html redirected back to index.html, so the completion state is not directly reachable from this path.'
- **Suggested fix**: Make the confirmation page directly routable from checkout submission and show a distinct success state with order details, next steps, and a clear return path.

### [HIGH] checkout-has-form-fields-without-proper — forms
- **Page**: `checkout.html`
- **Problem**: Checkout has form fields without proper labeling, which makes the attendee/payment form harder to understand and may block assistive technology users.
- **Evidence**: The session memory explicitly records 'checkout.html: A form field has no label, aria-label, or placeholder.' The coverage data also lists 'unlabeled control' among checkout inputs.
- **Suggested fix**: Add explicit labels to every input, or use aria-label/aria-labelledby where visual labels are not practical; verify the form can be completed using a screen reader alone.

### [MEDIUM] many-of-the-primary-interactive-controls — affordance
- **Page**: `event.html / index.html`
- **Problem**: Many of the primary interactive controls are visually small, especially the ticket steppers and share/favorite buttons, making them hard to tap accurately.
- **Evidence**: Recent trajectory and layout warnings repeatedly flag 32×32 stepper buttons and 38×38 heart/share controls on event pages; the final observation shows the same pattern on Marisol & the Verses. The index nav links are also noted as below mobile guidance.
- **Suggested fix**: Increase touch target sizes to at least 44×44px, add more spacing, and make the quantity controls look more tappable with stronger button styling.

### [MEDIUM] several-secondary-controls-provide-little-or — feedback
- **Page**: `event.html / checkout.html`
- **Problem**: Several secondary controls provide little or no visible feedback when activated, making it unclear whether they are functional or decorative.
- **Evidence**: A click on the ♡ favorite control on event pages did not change URL or visible text; the recent trajectory also notes the LISTEN tiles were not successfully reached, so their interaction feedback remains unproven. The 'Copy buyer info from ticket 1' control failed because it was not visible in the collapsed section.
- **Suggested fix**: Show immediate state changes for favorites, media playback, and copy actions, such as icon fills, toasts, inline confirmations, or expanded playback states.

### [MEDIUM] the-main-checkout-submission-is-gated — goal completion
- **Page**: `checkout.html`
- **Problem**: The main checkout submission is gated behind a destructive-confirmation pattern, so the primary action does not behave like a straightforward 'place order' step.
- **Evidence**: The session memory and chunks note that clicking 'Place order' was intercepted as 'Skipped final destructive confirmation' multiple times, and the page exposes a separate cancel confirmation dialog. The checkout UI includes a prominent place-order CTA but the flow requires extra confirmation.
- **Suggested fix**: If a confirmation is necessary, make the consequence explicit before the user commits, and consider wording or hierarchy that better distinguishes submission from destructive cancellation.

### [LOW] filter-controls-update-visibly-but-the — clarity
- **Page**: `index.html`
- **Problem**: Filter controls update visibly, but the event list does not clearly reflect the filter state, so users may not know whether filtering is actually working.
- **Evidence**: After selecting PRICE Under $20, the control state changed, but the observation says no corresponding browse-result change was visible and cards still showed prices like from $22, $25, $30, $35, and $38.
- **Suggested fix**: When a filter is applied, visibly update the results set, show a selected-filter chip, and consider a result count or empty-state message.

### [LOW] top-navigation-and-some-auxiliary-links — navigation
- **Page**: `index.html`
- **Problem**: Top navigation and some auxiliary links are compact enough to feel cramped, especially in the dark-themed header and secondary link areas.
- **Evidence**: Multiple chunks and layout warnings note that header nav items such as Tonight, This Week, Calendar, Venues, Artists, Sell tickets, and Sign in are below mobile tap guidance; the final observation also calls out the small header targets on index.
- **Suggested fix**: Give header links more padding and spacing, or collapse them into a more touch-friendly menu on smaller screens.
