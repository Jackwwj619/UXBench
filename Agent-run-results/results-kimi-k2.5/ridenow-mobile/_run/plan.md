# UXAgent Exploration Plan

## Goal

Explore and critique the UX of the ridenow-mobile system, focusing on the primary ride-booking flow (from home screen to trip completion) and adjacent pages (Activity, Payment, Account) across desktop and mobile viewports.

## Plan Summary

The exploration will start on the home screen (index.html), validate the ride-booking flow (selecting a destination, choosing a ride, trip completion, rating, receipt), then explore adjacent pages (Activity, Payment, Account) and check mobile responsiveness. Phases will cover each step of the flow, validate interactables, and check for layout issues like small tap targets.

## Coverage Targets

- pages: `Visit and test all screens within index.html (ride, activity, payment, account).`
- features: `Exercise all primary features: destination search/selection, ride selection, trip flow (complete → rate → receipt), activity (receipts), payment (methods), account (settings).`
- mobile: `Repeat critical checks (destination selection, ride flow, tab navigation, small tap targets) on mobile viewport to ensure usability.`

## Planned Phases

### Home Screen & Destination Selection

- Objective: Validate the home screen interactables, destination selection (recent/saved places, search), and initial layout on desktop and mobile.
- Target pages: index.html
- Key checks:
  - Tap/click the '☰' button (check if it opens a menu, note tap target size).
  - Type in the 'Where to?' input (check if it shows suggestions, autocomplete).
  - Tap a recent place (e.g., Bella Suora) and a saved place (e.g., Home) to confirm destination selection.
  - Switch to mobile viewport and repeat the above checks (focus on tap target usability for small buttons).
- Exit criteria:
  - All destination selection interactables are tested (search, recent, saved).
  - Small tap target warnings are noted for critical buttons (☰, 🔔, →).
  - Desktop and mobile viewport checks for the home screen are complete.

### Ride Selection & Trip Flow

- Objective: Validate the ride selection screen, trip progress, driver rating, and receipt generation.
- Target pages: index.html
- Key checks:
  - After selecting a destination, check the 'Choose your ride' screen (interact with ride options: e.g., economy, premium).
  - Proceed to 'Trip complete' screen (check if it shows trip details, fare).
  - Tap the 'Rate your driver' screen (interact with rating stars, add feedback).
  - Proceed to 'Receipt' screen (check if receipt details are correct, interact with 'Activity' tab to view receipt later).
  - Switch to mobile viewport and repeat ride selection and trip flow checks (ensure touch targets for ride options, rating stars are usable).
- Exit criteria:
  - All ride selection options are tested (economy, premium, etc.).
  - Trip flow (ride → trip complete → rate driver → receipt) is completed and each screen is validated.
  - Interactables on each trip screen (ride options, rating stars, receipt actions) are tested.

### Adjacent Screens (Activity, Payment, Account)

- Objective: Explore adjacent screens (Activity, Payment, Account) to validate their content, interactables, and state management.
- Target pages: index.html
- Key checks:
  - Tap the '📋 Activity' tab (check if it shows receipts, trip history; interact with a receipt to view details).
  - Tap the '💳 Payment' tab (check payment methods, add payment method if possible, view payment history).
  - Tap the '◉ Account' tab (check account settings, profile, logout option if present).
  - Switch to mobile viewport and repeat the above checks (ensure navigation between tabs is smooth, tap targets for tab buttons are usable).
- Exit criteria:
  - All adjacent screens (Activity, Payment, Account) are explored and their interactables tested.
  - Navigation between tabs (Ride, Activity, Payment, Account) is validated (state management, screen transitions).
  - Desktop and mobile viewport checks for adjacent screens are complete.

### Layout & Usability Across Viewports

- Objective: Finalize exploration by checking all remaining interactables, layout warnings, and cross-viewport consistency.
- Target pages: index.html
- Key checks:
  - Test all remaining interactables (e.g., '🔔' notification button, 'Add place' button, '→' buttons for recent places).
  - Check the 'Activity' screen's 'Receipt' section (validate trip details, fare calculation).
  - Recheck all small tap targets (☰, 🔔, →, tab buttons) on mobile viewport for usability (e.g., can they be tapped without error).
  - Ensure all screens (ride, activity, payment, account) are accessible via navigation (tab bar, menu).
- Exit criteria:
  - All visible interactables are tested (buttons, inputs, tabs).
  - Layout warnings (small tap targets) are documented with their impact on usability.
  - Cross-viewport (desktop, mobile) consistency is confirmed for all screens and interactables.

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

