# UXAgent Exploration Plan

## Goal

Exhaustively explore the RideNow mobile fixture, simulating a complete ride booking lifecycle from destination selection to post-ride receipt, while evaluating navigation and small tap target usability.

## Plan Summary

The exploration will start on the home screen to verify layout and bottom navigation functionality. It will then follow the primary flow: selecting a destination, choosing a ride tier, and completing the simulated trip to reach the rating and receipt screens. Finally, it will ensure secondary tabs like Activity and Account are visited.

## Coverage Targets

- pages: `Explore all dynamic states within index.html (Home, Ride Selection, Active Ride, Trip Complete, Receipt, Activity, Account).`
- features: `Exercise the destination input, quick select buttons, ride tier selection, and bottom navigation bar.`
- mobile: `Ensure interactions with small tap targets (arrows, icons) are specifically tested in the mobile viewport to confirm usability.`

## Planned Phases

### Home Screen & Primary Navigation

- Objective: Validate the initial home screen layout and test the bottom navigation tabs.
- Target pages: index.html
- Key checks:
  - Click 'Activity', 'Payment', and 'Account' tabs in the bottom bar to verify view switching.
  - Test the hamburger menu (☰) and notification bell (🔔) to see if menus or modals appear.
  - Return to the 'Ride' tab.
- Exit criteria:
  - All bottom navigation tabs have been clicked and any resulting state changes observed.

### Destination Selection

- Objective: Initiate the booking flow by selecting a destination.
- Target pages: index.html
- Key checks:
  - Interact with the 'Where to?' input field.
  - Click one of the quick destination buttons (e.g., '💼 Work' or '✈ PDX Airport').
  - Verify the UI transitions to the 'Choose your ride' state.
- Exit criteria:
  - The 'Choose your ride' heading is visible on screen.

### Ride Booking & Lifecycle

- Objective: Complete the ride booking process and progress through the simulated trip.
- Target pages: index.html
- Key checks:
  - Select a specific ride tier/option if presented.
  - Click the primary call-to-action to confirm the ride.
  - Observe the simulated ride progress until the 'Trip complete' heading appears.
  - Interact with the 'Rate your driver' interface if presented.
- Exit criteria:
  - The application reaches the 'Rate your driver' or 'Receipt' screen.

### Post-Ride & Activity History

- Objective: Verify the receipt details and test the Activity tab functionality post-ride.
- Target pages: index.html
- Key checks:
  - Review the 'Receipt' screen for expected ride details.
  - Navigate to the 'Activity' tab via the bottom navigation.
  - Verify that the recently completed ride appears in the activity history.
- Exit criteria:
  - The 'Receipt' view is documented and the 'Activity' tab is verified.

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

