# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full tablerose system, prioritizing the primary checkout/booking flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

Tablerose’s core booking journey largely works: selecting times from results/detail carries context into guest details, and the flow reaches payment and confirmation with clear trust/policy messaging. However, guest-to-payment progression on guest.html appears unreliable—primary CTA clicks often don’t produce visible state changes or navigation, and Help is effectively a no-op (hash only). On mobile, multiple important controls have small tap targets and at least one unlabeled select, creating avoidable friction around party selection and reservation completion.

## Issues (4)

### [HIGH] the-primary-cta-continue-to-hold — error recovery
- **Page**: `guest.html / “Continue to hold →” (multiple: steps-07-12, 19-24, 31-36, 43-48, recent mobile agentic-77/78/79 sequences)`
- **Problem**: The primary CTA (“Continue to hold →”) frequently fails to navigate or provide immediate, actionable feedback when clicked, even after interacting with dietary/consent fields.
- **Evidence**: Multiple steps report no progression: clicking “Continue to hold →” on guest.html produced after_url unchanged / remained on guest.html (e.g., steps-07-12, 13-18, 19-24, 31-36, 43-48, 67-72 mobile). Inline messaging near Dietary needs (“Please fill out this field.”) is visible, but CTA clicks still did not trigger navigation or clear updated validation state.
- **Suggested fix**: Make the blocking rule unambiguous: disable the CTA with a clear label (e.g., “Select dietary needs to continue” or “Agree to email for confirmation”), and on click show an inline summary of missing/invalid fields. Ensure state updates are visually confirmed (e.g., validation hint clears when satisfied) and verify submission results consistently navigate to payment.html.

### [MEDIUM] the-help-link-on-guest-html — feedback
- **Page**: `guest.html / Help link (step-19-24; also steps-07-12, 37-42)`
- **Problem**: The Help link on guest.html doesn’t appear to open guidance or provide a modal/overlay; instead it only changes the URL hash.
- **Evidence**: Step-19-24: clicking Help changed only the URL to add a hash (guest.html#), and “no modal/dialog appears” in the captured state (dialogs: 0). Similar lack of visible help feedback is reported earlier on guest.html (steps-07-12, steps-13-18/37-42).
- **Suggested fix**: Implement Help as a visible overlay/modal or inline expanded guidance with the exact missing requirement(s) and how to fix them. At minimum, scroll to the relevant field and announce it visually/a11y-wise.

### [MEDIUM] the-party-size-control-lacks-a — accessibility
- **Page**: `restaurant.html / party size select (ux-13; also noted in steps-13-18 and steps-67-72 / mobile screenshots)`
- **Problem**: The party size control lacks a visible/accessible label, which can harm screen reader comprehension and reduce clarity for all users.
- **Evidence**: Medium accessibility issue flagged: “party selector is a <select> with no visible label/aria-label/placeholder” (ux-13 DOM warning: missing_input_label). On mobile restaurant.html the party select shows as unlabeled (“Party 1 guest 2 guests ... 8 guests” appears but no explicit label).
- **Suggested fix**: Add an explicit label such as “Party size” for the select and ensure aria-label/aria-labelledby is present. Also visually associate the label with the select on both desktop and mobile.

### [MEDIUM] many-interactive-elements-on-mobile-appear — mobile usability
- **Page**: `mobile viewport warnings on guest.html and restaurant.html (agentic-79/80 and mobile sections; layout_warning_count 16–17; small_tap_target items)`
- **Problem**: Many interactive elements on mobile appear to have small tap targets and the layout may overflow horizontally, increasing mis-taps and frustration during booking.
- **Evidence**: Mobile layout warnings (count 16 on guest.html; 17 on restaurant.html): horizontal overflow (scroll_width 396px > viewport 390px) and small tap targets below 44px for key controls—examples include “My reservations” (102x16), “Sign in” (86x36), and booking time buttons (~96x29–31). Also “Tablerose” link is below guidance in recent logs.
- **Suggested fix**: Increase mobile hit areas to meet ≥44px minimums (padding around links/buttons), reduce header density, and fix horizontal overflow by reflowing rather than forcing wider content.
