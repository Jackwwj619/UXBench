# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full booking system, prioritizing the primary checkout/booking flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

The core booking funnel is understandable and mostly works end to end: search, results, detail, room selection, and the reservation form all communicate a coherent path, with clear policy context and visible confirmation-style feedback in several places. The biggest UX issues are on mobile, where compact controls, small touch targets, and horizontal overflow make key pages harder to scan and operate. There are also a few trust and clarity gaps around booking completion and form labeling, plus at least one support/search path that appears to accept input without giving clear result feedback. Important adjacent areas like airport taxis and flights were covered, but some business-line link coverage remains limited relative to the full surface area.

## Issues (9)

### [HIGH] several-key-pages-overflow-horizontally-on — mobile usability
- **Page**: `tokyo.html / flights.html`
- **Problem**: Several key pages overflow horizontally on mobile and compress important controls into cramped areas, making the interface harder to scan and operate. The Tokyo results page showed content wider than the 390px viewport, and the flights page showed similar overflow with multiple undersized controls.
- **Evidence**: Mobile observations reported horizontal overflow on tokyo.html (631px and later 813px content vs 390px viewport) and on flights.html (631px vs 390px). Layout warnings also flagged many small tap targets below 44px, including header links, radio buttons, and the JPY button.
- **Suggested fix**: Rework the mobile layout to stack filters and header actions vertically, prevent horizontal overflow, and enlarge interactive targets to at least 44px with more spacing between controls.

### [HIGH] several-form-controls-lack-labels-or — forms
- **Page**: `tokyo.html, reservation.html, flights.html`
- **Problem**: Several form controls lack labels or accessible names, which makes their purpose ambiguous and reduces accessibility. This affects search inputs and select controls across the funnel, including the Tokyo destination field, the reservation country/region select, and the flights cabin-class select.
- **Evidence**: DOM/observation warnings noted missing labels or placeholders on tokyo.html destination input, reservation.html country/region select, and flights.html cabin-class select. The flights select was operable, but only its own displayed value changed; the purpose was still unclear from labeling.
- **Suggested fix**: Add persistent visible labels plus accessible names for every form control, and avoid relying on placeholder text alone for meaning.

### [HIGH] the-final-booking-submission-appears-blocked — feedback
- **Page**: `reservation.html [data-uxagent-id="ux-21"]`
- **Problem**: The final booking submission appears blocked without clear in-page resolution: the 'Complete booking' button was disabled and clicking it timed out, with no visible explanation of what remained missing or how to proceed.
- **Evidence**: A click on reservation.html 'Complete booking' failed because the button was disabled. The timeout log showed the control remained non-enabled, and no success state or error message was surfaced in the tested interaction.
- **Suggested fix**: Show an inline checklist or error summary explaining exactly what is missing to enable booking, and make the CTA state tied to visible completion cues.

### [MEDIUM] the-help-search-accepts-text-but — feedback
- **Page**: `help.html`
- **Problem**: The help search accepts text, but submitting the search produced no visible result state, navigation, or no-results feedback, so users cannot tell whether their query was processed.
- **Evidence**: On help.html, typing 'booking change fees' left the query visible in the field, and clicking Search produced no visible change in content or URL. The page remained on the same help center view.
- **Suggested fix**: After search, show results, a loading state, or a clear empty/no-results message so users get immediate confirmation that the query was handled.

### [MEDIUM] cross-product-navigation-is-present-but — navigation
- **Page**: `tokyo.html, flights.html, airport-taxis.html`
- **Problem**: Cross-product navigation is present, but many header and footer links are undersized on mobile, which makes the shared navigation feel fragile and easy to mis-tap.
- **Evidence**: Mobile observations repeatedly flagged small tap targets in the header across tokyo.html and flights.html, and in the footer/support region on flights.html and airport-taxis.html. Examples include Stays, Flights, JPY, Sign in, and footer links like Deals.
- **Suggested fix**: Increase tap target size and spacing for global nav and footer links, and consider collapsing less critical links into a menu on small screens.

### [MEDIUM] several-controls-present-as-icon-only — clarity
- **Page**: `flights.html`
- **Problem**: Several controls present as icon-only or minimally explained actions, which adds ambiguity in dense booking headers and search strips.
- **Evidence**: The flights mobile observation shows a row of icons for origin/destination/date/passenger search fields, and the page also includes a cabin-class select with no label. On mobile, the meaning of the icons is not self-evident without surrounding context.
- **Suggested fix**: Pair icons with concise text labels or helper text, particularly for the search strip and any non-obvious selectors.

### [MEDIUM] the-reservation-step-communicates-required-fields — goal completion
- **Page**: `reservation.html`
- **Problem**: The reservation step communicates required fields well, but the transition from filled inputs to an enabled booking CTA was not visible, leaving the completion state uncertain.
- **Evidence**: The reservation page clearly states 'Almost done! Just fill in the * required info,' and required fields are visible. Typed first and last names were accepted, but the booking CTA remained in its gated state during the test, with no visible progression indicator.
- **Suggested fix**: Add a completion checklist or dynamic progress indicator that updates as fields are filled and explains when the final booking button becomes available.

### [LOW] some-actionable-items-are-visually-too — affordance
- **Page**: `tokyo.html, flights.html`
- **Problem**: Some actionable items are visually too small to feel comfortably tappable, even when they work correctly.
- **Evidence**: Mobile layout warnings and observations flagged 13x13 radio buttons, 16x16 checkboxes, and 71x32 Select buttons on flights.html and tokyo.html, while interactions still succeeded.
- **Suggested fix**: Enlarge checkboxes, radios, and select-trigger affordances, and provide more vertical spacing between adjacent controls.

### [LOW] some-interactions-provide-only-subtle-state — trust
- **Page**: `flights.html`
- **Problem**: Some interactions provide only subtle state changes, which may be easy to miss even when the control works.
- **Evidence**: Changing the flights cabin-class select on mobile updated from Economy to Premium Economy, but there was no obvious confirmation beyond the select’s displayed value. By contrast, other actions used clearer toasts or chip updates.
- **Suggested fix**: Use a brief inline confirmation or visibly highlight the changed filter so the state shift is unmistakable.
