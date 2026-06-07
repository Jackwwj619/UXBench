# UXAgent Exploration Plan

## Goal

Exhaustively explore and critique the UX of the full RideNow mobile rideshare flow, including booking, ride states, adjacent tabs, and mobile responsiveness.

## Plan Summary

The exploration will start by traversing the primary ride booking flow from destination input to receipt, validating all intermediate states (ride selection, trip, rating). It will then shift to adjacent flows via the bottom tab bar (Activity, Payment, Account) and auxiliary controls (menu, notifications, saved places). Finally, it will repeat critical path checks under a mobile viewport to assess responsive behavior and tap target issues flagged in the prescan.

## Coverage Targets

- pages: `Cover all data-screen states within index.html`
- features: `Interact with all 42 buttons, the search input, and all bottom tab views`
- mobile: `Execute primary ride flow and tab navigation on mobile viewport to validate responsive layout and tap targets`

## Planned Phases

### Primary Ride Booking Flow

- Objective: Validate the core checkout/booking flow from destination entry to ride completion and receipt.
- Target pages: index.html
- Key checks:
  - Type into 'Where to?' input and verify navigation to 'Choose your ride' screen
  - Select a ride option and confirm transition to 'Trip complete' state
  - Complete the 'Rate your driver' step and verify arrival at 'Receipt' screen
  - Click quick-link buttons (⌂ Home, 💼 Work, ✈ PDX Airport) to ensure they also trigger the ride flow correctly
- Exit criteria:
  - Full end-to-end ride flow completed via search input
  - Full end-to-end ride flow completed via quick-link button
  - Receipt screen successfully reached and validated

### Adjacent Tab Navigation

- Objective: Explore secondary screens accessed via the bottom tab bar and validate their content and interactions.
- Target pages: index.html
- Key checks:
  - Navigate to '📋 Activity' tab and verify it shows the receipt/trip history
  - Navigate to '💳 Payment' tab and validate payment method displays and controls
  - Navigate to '◉ Account' tab and check profile/settings information
  - Return to '🏁 Ride' tab and confirm the home screen state is properly restored
- Exit criteria:
  - All 4 bottom tab views have been visited
  - Content and interactables within Activity, Payment, and Account screens exercised

### Auxiliary Controls & Edge Cases

- Objective: Test secondary interactions on the home screen and interrupt flows to check for state recovery.
- Target pages: index.html
- Key checks:
  - Click '☰' menu button and validate any side-menu or overlay
  - Click '🔔' notifications button and validate dropdown/modal
  - Click '→' arrows on recent places to check detailed views or ride triggers
  - Click '+ Add place' and test saved places limit/failure state
  - Interrupt a ride flow by clicking a different tab, then return to see if state persists or resets safely
- Exit criteria:
  - Menu and notification controls exercised
  - Saved places interaction tested
  - Flow interruption recovery observed

### Mobile Viewport Validation

- Objective: Re-run critical checks on a mobile viewport to verify responsive layout and tap target usability.
- Target pages: index.html
- Key checks:
  - Switch to mobile viewport and verify edge-to-edge layout and frame behavior
  - Re-validate the primary booking flow on mobile to ensure no layout overlap or hidden controls
  - Verify tap target sizes for ☰, 🔔, and → buttons on mobile and confirm if they remain difficult to hit
  - Check bottom tab bar spacing and hit areas on mobile
- Exit criteria:
  - Primary flow completed on mobile viewport
  - Tab navigation verified on mobile viewport
  - Tap target and layout warnings assessed on mobile

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

