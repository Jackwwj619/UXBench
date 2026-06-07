# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full orbitride system, prioritizing the primary checkout/booking flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

The OrbitRide booking flow suffers from critical mobile usability issues, primarily horizontal overflow on the routes page that forces users to scroll sideways to access 'Select' buttons. Additionally, the seat selection interface lacks clear affordances for touch interaction, and the system relies on passive disabled states rather than active feedback when users attempt to proceed with incomplete selections. Several utility features, such as copying passenger details, appear non-functional, adding friction to multi-passenger bookings.

## Issues (5)

### [HIGH] horizontal-overflow-hides-primary-action-buttons — mobile usability
- **Page**: `routes.html: Trip cards / Select button`
- **Problem**: Horizontal overflow hides primary action buttons, forcing unnecessary scrolling.
- **Evidence**: On mobile viewport (390px), the routes page content width is 760px. The 'Select' buttons are positioned at the far right edge of the trip cards, requiring the user to horizontally scroll to see and tap them. Layout warnings confirm this overflow.
- **Suggested fix**: Refactor the trip card layout for mobile to stack information vertically or ensure the 'Select' button is always visible within the initial viewport width without horizontal scrolling. Consider a sticky 'Book' button or a full-width card design.

### [HIGH] svg-seat-map-elements-lack-clear — affordance
- **Page**: `seats.html: SVG seat map`
- **Problem**: SVG seat map elements lack clear touch targets and visual feedback on mobile.
- **Evidence**: Automated clicks on seats (e.g., seat-1a, ux-seat-4a) frequently timed out or failed, suggesting small hit areas or DOM mapping issues. Visually, the seats are small distinct shapes without generous padding, making them difficult to tap accurately on touch screens.
- **Suggested fix**: Increase the clickable area of each seat by adding transparent padding around the SVG shapes or using larger graphical representations. Ensure immediate visual feedback (color change) upon successful tap to confirm selection.

### [MEDIUM] passive-error-prevention-via-disabled-buttons — feedback
- **Page**: `seats.html: Continue button`
- **Problem**: Passive error prevention via disabled buttons provides no active guidance.
- **Evidence**: When attempting to click 'Continue' without selecting seats, the button is simply disabled (grayed out). No toast message, shake animation, or tooltip appears to explain why the action failed or what is missing.
- **Suggested fix**: If the user taps the disabled 'Continue' button, trigger a brief haptic feedback or display a tooltip/toast saying 'Please select 2 seats to continue.'

### [MEDIUM] the-copy-contact-from-passenger-1 — forms
- **Page**: `passengers.html: Copy contact from passenger 1`
- **Problem**: The 'Copy contact from passenger 1' feature appears non-functional.
- **Evidence**: Session logs indicate that clicking 'Copy contact from passenger 1' did not populate Passenger 2's fields, forcing manual re-entry of identical data.
- **Suggested fix**: Debug the JavaScript logic behind the copy function to ensure it correctly maps and populates the target fields. Add a visual confirmation (e.g., a checkmark or 'Copied!' text) when the action succeeds.

### [LOW] multiple-interactive-elements-have-tap-targets — accessibility
- **Page**: `Global: Header links, Checkboxes, Logos`
- **Problem**: Multiple interactive elements have tap targets below the recommended 44px minimum.
- **Evidence**: Layout warnings consistently flag elements like amenity checkboxes (13x13px), header links (21-28px height), and the 'OrbitRide' logo (27px height) as being too small for reliable touch interaction.
- **Suggested fix**: Increase the CSS padding or size of these interactive elements to meet the 44x44px minimum touch target guideline. Use pseudo-elements if necessary to expand the clickable area without changing the visual design.
