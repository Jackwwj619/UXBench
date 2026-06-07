# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full orbitride system, prioritizing the primary checkout/booking flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

The OrbitRide booking flow has several critical UX issues. The payment and passenger form buttons initially failed to navigate, though the payment flow worked after filling card details. Mobile viewports have small tap targets (e.g., OrbitRide link) and horizontal overflow. Date selection and seat selection interactions failed due to missing target IDs, and the 'Add to calendar' button lacked feedback. Add-on checkboxes worked, but many interactive elements (e.g., promo code, student ID) remain untested, with only 42% of features exercised.

## Issues (8)

### [HIGH] clicking-the-continue-to-payment-button — goal completion
- **Page**: `passengers.html: Continue to payment`
- **Problem**: Clicking the 'Continue to payment' button on passengers.html initially failed to navigate to payment.html, blocking the booking flow until the form was filled (or a workaround was used).
- **Evidence**: Clicking the 'Continue to payment' button did not navigate to payment.html as expected; the URL and visible content remained unchanged on passengers.html until card details were filled later.
- **Suggested fix**: Fix the button's navigation logic to ensure it redirects to payment.html when the form is valid (or provide error feedback if fields are incomplete).

### [HIGH] clicking-the-pay-70-34-button — goal completion
- **Page**: `payment.html: Pay $70.34`
- **Problem**: Clicking the 'Pay $70.34' button initially failed to navigate to the confirmation page, requiring card details to be filled to work, which is a critical failure in the payment process.
- **Evidence**: Clicking the 'Pay $70.34' button did not navigate to the confirmation page as expected; the page remained on payment.html until card details were entered and the button was clicked again.
- **Suggested fix**: Ensure the payment button triggers navigation to confirmation.html even without pre-filled card details (or validate form fields and provide clear error messages).

### [MEDIUM] the-orbitride-link-on-mobile-has — mobile usability
- **Page**: `seats.html: OrbitRide link`
- **Problem**: The 'OrbitRide' link on mobile has a small tap target (83x27px), below the 44px mobile guidance, making it hard to tap accurately.
- **Evidence**: Layout warning: 'Tap target is 83x27px, below the 44px mobile guidance.' for the 'OrbitRide' link (target_id 'ux-1').
- **Suggested fix**: Increase the size of the 'OrbitRide' link's tap target to at least 44x44px for mobile accessibility.

### [MEDIUM] clicking-the-add-to-calendar-button — feedback
- **Page**: `confirmation.html: Add to calendar button`
- **Problem**: Clicking the 'Add to calendar' button on confirmation.html provided no visual feedback (e.g., button state change, confirmation message), leaving users unsure if the action succeeded.
- **Evidence**: Clicking the 'Add to calendar' button resulted in no visible change to the button's appearance or any confirmation message, and the URL remained unchanged.
- **Suggested fix**: Add visual feedback (e.g., a success message, button color change) to confirm the 'Add to calendar' action is completed.

### [MEDIUM] attempts-to-select-sat-may-23 — navigation
- **Page**: `routes.html: Sat, May 23 date button`
- **Problem**: Attempts to select 'Sat, May 23' in the date carousel failed due to missing target IDs, preventing users from updating trip lists to view available trips for their desired date.
- **Evidence**: Multiple click actions to select 'Sat, May 23' failed because no target_id was specified, resulting in no visual state change or trip list update. The date carousel remained with 'Mon, May 25' as active, and the trip list showed 'No trips match these filters' (or incorrect trips).
- **Suggested fix**: Ensure the date carousel buttons have unique target IDs and are properly linked to trip list updates, so users can select dates and view relevant trips.

### [MEDIUM] the-routes-html-page-has-horizontal — mobile usability
- **Page**: `routes.html (mobile viewport)`
- **Problem**: The routes.html page has horizontal overflow on mobile (page width 760px > viewport 390px), causing layout issues and potentially hiding interactive elements or content.
- **Evidence**: Layout warnings indicate the routes.html page width (760px) exceeds the mobile viewport (390px), leading to horizontal overflow and potential usability issues.
- **Suggested fix**: Optimize the routes.html layout for mobile viewports to eliminate horizontal overflow, ensuring all content and interactive elements are accessible without scrolling horizontally.

### [MEDIUM] attempts-to-select-a-seat-e — goal completion
- **Page**: `seats.html: 1A seat button (mobile)`
- **Problem**: Attempts to select a seat (e.g., '1A') on mobile failed due to missing target IDs, preventing users from proceeding with the booking flow.
- **Evidence**: Multiple click actions to select seat '1A' on mobile failed because no target_id was specified, resulting in no visual feedback or selected seats list update.
- **Suggested fix**: Ensure seat buttons (e.g., '1A') have unique target IDs and are properly linked to visual feedback (e.g., seat state change, selected seats list update) for mobile interactions.

### [LOW] many-interactive-elements-e-g-promo — accessibility
- **Page**: `passengers.html: Copy contact button; payment.html: promo code input`
- **Problem**: Many interactive elements (e.g., promo code input, student ID input, 'Copy contact from passenger 1' button) lack explicit labels or ARIA attributes, making them hard to identify for screen reader users.
- **Evidence**: The coverage report shows many interactive elements (e.g., promo code input, student ID input) remain untested, and their labels/ARIA attributes are unclear from observations. For example, the 'Copy contact from passenger 1' button has no visible label for screen readers.
- **Suggested fix**: Add explicit labels (e.g., <label> tags) or ARIA attributes to all interactive elements (e.g., inputs, buttons) to improve screen reader accessibility.
