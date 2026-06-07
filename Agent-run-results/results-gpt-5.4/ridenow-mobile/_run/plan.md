# UXAgent Exploration Plan

## Goal

Explore the full RideNow mobile booking fixture end-to-end from destination selection through ride completion artifacts, while also validating adjacent tab flows and mobile-specific usability risks visible in the single-page app.

## Plan Summary

The run should start from the Ride tab home state and drive the primary ride-booking journey using the visible destination entry points: search, quick destinations, recent places, and saved places. Because the prescan shows multiple in-page screens on one HTML file (including Choose your ride, Trip complete, Rate your driver, and Receipt), the run should intentionally traverse those states and verify whether bottom-tab navigation exposes adjacent flows like Activity/receipt, Payment, and Account. Mobile checks should be emphasized since this is an iOS-style fixture and the prescan already surfaced undersized tap targets.

## Coverage Targets

- pages: `Visit the only known HTML page (index.html) and intentionally traverse all discoverable in-page screens referenced in the prescan: Ride home, Choose your ride, Trip complete, Rate your driver, Receipt, plus tab-exposed states.`
- features: `Exercise most visible controls on key states: 'Where to?' input, quick destinations, at least one recent-place row and arrow, at least one saved place, '+ Add place', bottom tabs, and visible top-bar icons; drive the main booking flow through completion artifacts if supported.`
- mobile: `Repeat the primary ride-start path and tab switching on a mobile viewport at or below 460px, with explicit checks for edge-to-edge layout, notch/home-indicator safety, and the small tap targets flagged in prescan.`

## Planned Phases

### Baseline map home and navigation shell

- Objective: Establish the starting Ride-tab state, inventory visible controls, and verify the global shell before committing to the transactional flow.
- Target pages: index.html
- Key checks:
  - Confirm the initial state on Ride home includes the search field, quick destinations, recent places, saved places, and bottom tab bar.
  - Tap each global top control that is visible in prescan ('☰', '🔔') to see whether it opens a panel, modal, or no-op state, and verify easy return.
  - Check that the bottom tabs are individually reachable and that their active state is visually clear.
  - Capture whether desktop shows a phone frame while mobile removes the frame or goes edge-to-edge as described.
- Exit criteria:
  - The starting shell and all globally persistent controls have been touched at least once.
  - The explorer knows how to return to Ride home from adjacent states.
  - Any obvious dead controls or unclear navigation responses have been noted.

### Destination entry and booking initiation

- Objective: Exercise the core entry points for starting a ride and validate how the app moves from destination choice toward ride selection.
- Target pages: index.html
- Key checks:
  - Use the 'Where to?' input to test focus behavior, keyboard readiness if applicable, placeholder clarity, and whether typing triggers a destination-selection state.
  - Try at least one quick destination button ('Home', 'Work', 'PDX Airport') and compare its behavior to typed search.
  - Open at least one recent place using the row/arrow interaction and verify whether the entire row or only the arrow advances.
  - Open at least one saved place and compare its transition to recent-place and quick-destination behavior.
  - If multiple entry methods all lead to 'Choose your ride', confirm they produce consistent destination confirmation and progression.
- Exit criteria:
  - At least three distinct destination-entry methods have been exercised.
  - The flow has advanced into or up to the 'Choose your ride' state.
  - The run has evidence about whether small arrow targets create usability issues versus tapping the full row.

### Ride selection and transaction progression

- Objective: Validate the central checkout/booking state and push the ride flow forward into completion-related screens.
- Target pages: index.html
- Key checks:
  - On the 'Choose your ride' state, exercise the visible ride options or confirmation controls and note selection clarity, pricing clarity if shown, and whether the primary CTA is obvious.
  - Check whether the user can change or back out of the chosen destination without losing context.
  - Advance through the booking flow until 'Trip complete' appears, noting any intermediate waiting/loading or status transitions.
  - Confirm that the progression from booking to completed trip feels linear and that state changes are not abrupt or confusing.
- Exit criteria:
  - A ride option has been selected or attempted.
  - The flow has advanced to the 'Trip complete' state or as far as the fixture permits.
  - Any issues with ambiguous CTAs, missing feedback, or inability to edit/recover have been recorded.

### Post-trip feedback and receipt states

- Objective: Assess the quality and continuity of the end-of-trip experience including rating and receipt access.
- Target pages: index.html
- Key checks:
  - From 'Trip complete', continue into 'Rate your driver' and verify that rating controls are understandable and easy to complete or skip if a skip path exists.
  - Open or reach the 'Receipt' screen and confirm it contains recognizable trip-summary information and a clear return path.
  - Use the Activity tab to verify whether it routes directly to the receipt/history state as described in the summary.
  - Check whether moving among Trip complete, Rate your driver, Receipt, and Activity creates duplicates, loops, or lost progress.
- Exit criteria:
  - The run has reached both 'Rate your driver' and 'Receipt' states if they are actionable.
  - Activity-tab behavior relative to receipts has been confirmed.
  - The post-trip sequence and return path are understood.

### Adjacent tabs, recovery paths, and mobile validation

- Objective: Probe non-primary tabs and repeat critical interactions under mobile constraints, with extra attention to tap target and layout quality.
- Target pages: index.html
- Key checks:
  - Visit Payment and Account tabs to determine whether they expose meaningful content/state changes or act as placeholders, and verify return to Ride.
  - Try '+ Add place' to see whether it opens an add/manage flow and whether cancellation or back navigation returns cleanly.
  - Repeat the most important path fragments on a mobile viewport: opening Ride home, selecting a recent place via arrow, selecting a saved or quick destination, and using bottom tab navigation.
  - Specifically assess the undersized targets ('☰', '🔔', and recent-place arrows) for tap reliability, overlap, and accidental-tap risk on mobile.
  - Verify edge-to-edge rendering and whether any content is clipped by the notch, status bar, or home indicator at mobile size.
- Exit criteria:
  - Payment and Account have each been visited once.
  - At least one recovery/cancel/back path has been exercised from a side flow or selection state.
  - Critical controls have been rechecked on mobile viewport with notes on hit area and layout behavior.

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

