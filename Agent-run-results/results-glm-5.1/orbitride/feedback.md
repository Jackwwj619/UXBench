# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full orbitride system, prioritizing the primary checkout/booking flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

The OrbitRide booking flow suffers from significant mobile usability issues, including severe horizontal overflow and critically small tap targets for interactive controls. Critical user experience gaps include a lack of inline validation on the payment form and a broken 'Copy contact' feature that provides no feedback, both of which can cause user frustration and block goal completion. Additionally, placeholder navigation links and non-functional autocomplete further degrade the experience.

## Issues (8)

### [HIGH] the-routes-page-has-severe-horizontal — mobile usability
- **Page**: `routes.html`
- **Problem**: The routes page has severe horizontal overflow on mobile, with a page width of 760px exceeding the 390px viewport, causing poor scrolling and layout issues.
- **Evidence**: Horizontal overflow detected on mobile: page width is 760px while viewport is only 390px (steps-67-72).
- **Suggested fix**: Implement a responsive layout for the routes page that stacks the filter sidebar above the results list on mobile viewports.

### [HIGH] interactive-controls-like-amenity-checkboxes-payment — mobile usability
- **Page**: `routes.html, payment.html`
- **Problem**: Interactive controls like amenity checkboxes, payment radio buttons, and the 'Save to my account' checkbox have critically small tap targets (13x13px), far below the 44px mobile guidance.
- **Evidence**: Amenity checkboxes are 13x13px (steps-67-72); Payment radio buttons are 13x13px and 'Save to my OrbitRide account' checkbox is 221x13px (steps-73-78).
- **Suggested fix**: Increase the tap target size of all checkboxes and radio buttons to at least 44x44px using CSS padding or custom styled controls.

### [HIGH] clicking-the-pay-button-with-empty — error recovery
- **Page**: `payment.html`
- **Problem**: Clicking the 'Pay' button with empty required fields fails silently without displaying inline validation errors, leaving the user unaware of what needs to be fixed.
- **Evidence**: Clicking 'Pay $81.50' with empty required fields did not navigate away, but no inline validation errors are visible (steps-79-79).
- **Suggested fix**: Implement inline validation messages next to empty required fields (Card number, Expiry, CVC, Billing zip) upon form submission attempt.

### [HIGH] the-copy-contact-from-passenger-1 — feedback
- **Page**: `passengers.html`
- **Problem**: The 'Copy contact from passenger 1' button fails to copy data and provides no success/error feedback, resulting in a confusing dead-click experience.
- **Evidence**: Clicking 'Copy contact from passenger 1' resulted in no visible change or feedback, and Passenger 2's email field remained empty (steps-55-60).
- **Suggested fix**: Ensure the JavaScript copy function works correctly, and add visual feedback such as a brief 'Copied!' toast or highlighting the populated fields.

### [MEDIUM] typing-into-the-from-and-to — affordance
- **Page**: `index.html`
- **Problem**: Typing into the FROM and TO city fields does not trigger the expected autocomplete/datalist dropdown, removing a key affordance for form completion.
- **Evidence**: Typing 'Cedar Plains' and 'Falconer' into the FROM/TO fields did not trigger a visible autocomplete/datalist dropdown (steps-01-06).
- **Suggested fix**: Ensure the datalist elements are properly linked to the input fields and trigger reliably on text input to provide suggestions.

### [MEDIUM] header-navigation-links-help-sign-in — navigation
- **Page**: `index.html`
- **Problem**: Header navigation links ('Help', 'Sign in', 'Routes') are dead-end placeholders that append '#' to the URL without navigating or providing feedback.
- **Evidence**: Clicking 'Help' and 'Sign in' links appended '#' to the URL without navigating, confirming they are dead-end placeholders (steps-37-42).
- **Suggested fix**: Either implement the destination pages or disable the links and add a tooltip indicating the feature is 'Coming Soon'.

### [MEDIUM] luggage-quantity-input-fields-lack-associated — accessibility
- **Page**: `extras.html`
- **Problem**: Luggage quantity input fields lack associated labels, ARIA attributes, or placeholders, making them inaccessible to screen reader users.
- **Evidence**: Luggage quantity input fields lack proper labels, aria-labels, or placeholders (target_ids: ux-3, ux-6, ux-9) (steps-61-66).
- **Suggested fix**: Add explicit <label> elements or aria-label attributes to all luggage quantity input fields.

### [LOW] the-expiry-date-input-accepts-invalid — forms
- **Page**: `payment.html`
- **Problem**: The Expiry date input accepts invalid formats (e.g., '12/28') without auto-formatting or immediate validation, risking errors upon submission.
- **Evidence**: Typed '12/28' into the Expiry field; the input accepted the text but the DOM summary shows the field's text value is still empty, suggesting a lack of auto-formatting (steps-25-30).
- **Suggested fix**: Implement an input mask or auto-formatting to enforce the MM/YY format as the user types, and provide inline validation.
