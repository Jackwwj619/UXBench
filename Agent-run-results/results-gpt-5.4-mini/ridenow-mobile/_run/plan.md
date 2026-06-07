# UXAgent Exploration Plan

## Goal

Exhaustively explore the RideNow mobile booking flow from destination entry through ride setup and the adjacent Activity, Payment, and Account tabs, with attention to mobile-specific interaction issues and recovery behavior.

## Plan Summary

Start from the Ride tab and validate the primary booking path using the visible destination search, quick shortcuts, and recent/saved place selectors. Then branch into the bottom navigation tabs to inspect adjacent account, payment, and activity/receipt states, checking how the app handles navigation, state changes, and return paths. Repeat the most important interactions in mobile viewport to confirm the phone-frame experience and verify the small-tap-target warnings observed in the prescan.

## Coverage Targets

- pages: `visit all known HTML pages; in this fixture that means fully exercising index.html and all in-app states reachable from it`
- features: `exercise most visible controls on Ride, plus the bottom tabs, destination input, quick destinations, recent places, saved places, and add-place control`
- mobile: `repeat the primary booking path and at least one tab-switch path in mobile viewport, with explicit attention to the known small tap targets`

## Planned Phases

### Baseline ride screen and entry points

- Objective: Confirm the default Ride screen structure and validate all visible entry points that can start or alter a booking.
- Target pages: index.html
- Key checks:
  - Inspect the default Ride screen layout in both desktop and mobile viewport.
  - Click the quick destination buttons: Home, Work, and PDX Airport.
  - Type into the 'Where to?' input and observe whether autocomplete, transition, or validation appears.
  - Open recent places using both the row body and the small right-arrow affordance if both are interactive.
  - Select saved places and the '+ Add place' control to see whether they open a detail, editor, or blocked state.
- Exit criteria:
  - All visible Ride-screen entry points have been exercised at least once.
  - Any navigation or state transition triggered by the destination controls has been observed.
  - The behavior of the destination input and recent/saved selectors is understood well enough to continue branching.

### Primary booking flow validation

- Objective: Follow the most likely booking path from destination selection into any ride configuration or checkout steps exposed by the fixture.
- Target pages: index.html
- Key checks:
  - Use at least one quick destination and one typed destination to compare behavior.
  - Verify whether a ride options, fare, or confirmation state appears after destination selection.
  - Check whether any proceed/continue/confirm control becomes available after entering a destination.
  - Look for missing state resets or inconsistent back behavior when changing destinations mid-flow.
- Exit criteria:
  - The primary booking path has been exercised through its deepest reachable state.
  - Any confirmation, trip setup, or rate/receipt-related handoff is documented.
  - No additional booking controls remain untested on the Ride screen.

### Activity and receipt/completion flow

- Objective: Validate the adjacent Activity route and the completed-trip/receipt experience called out in the prescan.
- Target pages: index.html
- Key checks:
  - Open the Activity tab from the bottom navigation.
  - Confirm whether it routes to a Trip complete, Rate your driver, or Receipt state.
  - Inspect any receipt details, rating controls, and return navigation from that state.
  - Verify whether Activity preserves or clears ride context when coming from the booking screen.
- Exit criteria:
  - The Activity route and its terminal states have been reached.
  - Any rating or receipt-related controls have been checked.
  - Return/back behavior from the Activity/receipt state has been observed.

### Payment and account area checks

- Objective: Inspect the non-booking tabs for consistency, navigation reliability, and any configuration or profile state.
- Target pages: index.html
- Key checks:
  - Open the Payment tab and inspect available payment methods or settings.
  - Open the Account tab and inspect profile, preferences, or account-related content.
  - Check whether Payment and Account share persistent UI state or reset the current ride context.
  - Test whether switching between tabs causes unexpected blank states or layout shifts.
- Exit criteria:
  - Both Payment and Account tabs have been opened and reviewed.
  - Any settings or account controls visible in those tabs have been exercised.
  - Tab switching behavior is confirmed stable enough for the run to proceed.

### Mobile viewport and interaction risk review

- Objective: Repeat the highest-value interactions in mobile viewport and verify the fixture’s known mobile usability risks.
- Target pages: index.html
- Key checks:
  - Repeat destination selection and at least one tab switch in mobile viewport.
  - Tap the small top-left menu, bell, and right-arrow controls to confirm hit-area usability and whether any mis-taps occur.
  - Check that the bottom tab bar remains usable and visually stable within the phone frame.
  - Confirm the screen does not introduce clipping, overlap, or unexpected scrolling in mobile mode.
- Exit criteria:
  - Critical booking and navigation interactions have been validated in mobile viewport.
  - The small tap-target risks have been directly exercised.
  - No additional mobile-specific layout or interaction defects are left unreviewed.

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

