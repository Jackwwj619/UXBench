# UXAgent Exploration Plan

## Goal

Execute a comprehensive UX audit of the 'RideNow' mobile fixture, validating the end-to-end booking flow, tab navigation integrity, and responsive behavior across desktop and mobile viewports.

## Plan Summary

The exploration will begin by verifying the Home screen layout and saved location interactions. It will then proceed through the primary 'Ride' booking flow (select destination -> choose ride -> confirm), followed by validation of secondary tabs (Activity, Payment, Account). Finally, it will repeat critical path checks on a mobile viewport to ensure touch targets and layout adapt correctly.

## Coverage Targets

- pages: `Visit all logical screens (Home, Ride Selection, Activity, Payment, Account) within index.html.`
- features: `Exercise destination selection, ride tier choice, tab navigation, and rating submission.`
- mobile: `Full regression of the booking flow on mobile viewport.`

## Planned Phases

### Home Screen & Location Selection

- Objective: Validate the initial state, header controls, and location selection mechanisms.
- Target pages: index.html
- Key checks:
  - Verify visibility of 'Recent Places' and 'Saved' lists.
  - Test interaction with 'Saved' location cards (e.g., click 'Home' or 'Halcyon Studio').
  - Test interaction with 'Recent Places' arrows.
  - Check header icons (Menu ☰, Notification 🔔) for clickability despite small size warnings.
- Exit criteria:
  - Successfully triggered a destination selection or opened a location detail view.

### Primary Booking Flow (Ride Tab)

- Objective: Execute the core user journey: Select Destination -> Choose Ride Type -> Confirm Booking.
- Target pages: index.html
- Key checks:
  - Enter a destination in the 'Where to?' input field.
  - Identify and interact with the 'Choose your ride' section (likely appears after destination entry).
  - Select a specific ride tier (e.g., Economy, Premium).
  - Locate and click the final confirmation button (e.g., 'Request Ride').
- Exit criteria:
  - Reached a 'Trip complete', 'Driver Assigned', or 'Rate your driver' state.

### Post-Trip & Activity Validation

- Objective: Validate the post-booking states and the Activity tab functionality.
- Target pages: index.html
- Key checks:
  - If in 'Rate your driver' state, submit a rating.
  - Navigate to the 'Activity' tab via the bottom bar.
  - Verify the presence of a receipt or trip history list.
  - Check for any empty states if no history exists.
- Exit criteria:
  - Viewed the Activity/Receipt screen content.

### Secondary Tabs (Payment & Account)

- Objective: Explore adjacent features to ensure no dead ends or broken layouts exist in secondary flows.
- Target pages: index.html
- Key checks:
  - Navigate to the 'Payment' tab; verify payment method display or add-new-flow triggers.
  - Navigate to the 'Account' tab; check for profile settings or logout options.
  - Ensure the bottom tab bar remains accessible and visually consistent.
- Exit criteria:
  - Visited both Payment and Account screens without layout errors.

### Mobile Viewport Regression

- Objective: Repeat critical checks on a mobile-sized viewport (≤460px width) to catch responsive issues.
- Target pages: index.html
- Key checks:
  - Resize viewport to mobile dimensions (e.g., iPhone SE/12 size).
  - Re-test the 'Where to?' input for keyboard overlap issues.
  - Verify bottom tab bar hit areas are sufficient on smaller screens.
  - Confirm header icons are still clickable despite prescan warnings.
- Exit criteria:
  - Completed one full booking flow simulation on mobile viewport.

## Prescan Summary

### RideNow — mobile fixture

- Page: `index.html`
- Headings: RECENT PLACES, SAVED, Choose your ride, Trip complete, Rate your driver, Receipt
- Interactables: `42` buttons, `0` links, `1` inputs
- Notable controls:
  - clickable:button:☰
  - typeable:input:Where to?
  - clickable:button:🔔
  - clickable:button:⌂ Home
  - clickable:button:💼 Work
  - clickable:button:✈ PDX Airport
  - clickable:button:→
  - clickable:button:⌂ Home 3617 NE Going St

