# UXAgent Exploration Plan

## Goal

Exhaustively explore and critique the RideNow mobile fixture’s full ride/checkout flow and adjacent screens, focusing on booking success paths, activity/receipt visibility, payment/account navigation, and key recovery/edge states.

## Plan Summary

Start on index.html and validate the initial “Choose your ride” screen: input behavior, recent/saved place selection, and navigation using the bottom tab bar. Then progress through the ride flow until the “Trip complete” → “Rate your driver” → “Receipt” sequence is reachable (including Activity tab entry to receipt). Finally, verify Payment and Account tabs (even if they are mostly placeholders) and repeat critical interactions on mobile viewport to confirm layout/tap-target issues.

## Coverage Targets

- pages: `Visit all known HTML pages (only index.html in prescan).`
- features: `Exercise most visible controls per key page/state: ☰, 🔍 (if present as part of header), 🔔, Where to? input, recent/saved place selection, + Add place, forward arrow(s), bottom tab bar (Ride/Activity/Payment/Account), and post-trip rating/receipt actions.`
- mobile: `Repeat critical checks on mobile viewport: destination selection, forward progression, and Activity → Receipt routing; validate bottom tab bar and key tap-target reliability.`

## Planned Phases

### Landing & destination selection

- Objective: Validate the initial booking-entry screen usability: input focus, recent/saved place selection behavior, and the forward progression affordance.
- Target pages: index.html
- Key checks:
  - Tap ☰ and confirm a menu opens/closes appropriately (or clearly does nothing); verify it doesn’t break underlying page state.
  - Tap 🔔 and verify notification UI behavior (open/close/clear indication).
  - Focus the “Where to?” input (ux-2): verify caret behavior, placeholder visibility, and that typing is accepted (even if autocomplete is fictional).
  - Tap at least one RECENT PLACE row (e.g., Bella Suora / Powell's Books / Mt. Tabor Park) and confirm it populates the route/destination summary.
  - Tap SAVED places (Home / Halcyon Studio) and confirm selection is reflected in the destination area.
  - Tap + Add place Up to 8 saved and verify the expected interaction (either opens add UI or shows a clear limitation message).
  - Use the forward arrow(s) (→) to proceed; confirm the correct stage transition happens and there isn’t a dead-end.
- Exit criteria:
  - A destination selection is reflected in the UI and a forward transition occurs beyond the initial “Choose your ride” screen.

### Ride setup → Trip complete

- Objective: Exercise the ride setup stages until the UI reaches “Trip complete,” validating that booking context is preserved and progressed correctly.
- Target pages: index.html
- Key checks:
  - On each intermediate state, identify the main primary action (likely a continue/confirm button) and verify it advances to the next stage.
  - Verify that tapping bottom tab icons while mid-flow either is blocked with a clear message or transitions safely without corrupting the trip.
  - Trigger “Trip complete” state and confirm it displays the expected title/section (“Trip complete”).
  - If the UI offers “cancel/back,” attempt it once to confirm recovery behavior (no broken flow).
- Exit criteria:
  - The exploration reaches the “Trip complete” screen state.

### Rate driver → Receipt

- Objective: Validate post-trip sequence: rate driver interaction and final receipt presentation, including Activity-tab access.
- Target pages: index.html
- Key checks:
  - From “Trip complete,” proceed to “Rate your driver” and confirm the screen label/heading is present.
  - Interact with rating controls (e.g., star/like/dislike if available) and confirm the UI accepts input and updates state (confirmation/thank-you text if present).
  - Proceed to “Receipt” and verify receipt content is visible and not blank.
  - Switch to 📋 Activity via the bottom tab bar and confirm it routes to the same or an equivalent receipt screen (as prescan summary claims).
- Exit criteria:
  - Receipt is displayed via the primary post-trip flow and also via the Activity tab path.

### Payment & Account navigation sanity checks

- Objective: Ensure the non-primary tabs (Payment, Account) behave consistently from both landing and post-trip contexts.
- Target pages: index.html
- Key checks:
  - From landing, tap 💳 Payment and verify any available UI/inputs render without error and provide an understandable state.
  - From landing, tap ◉ Account and verify navigation renders expected content.
  - From Receipt state, tap 💳 Payment then ◉ Account and confirm transitions do not strand the user (no broken/empty screen).
  - Return to 🏁 Ride and verify whether it returns to the correct ride-related state or restarts the flow; document behavior.
- Exit criteria:
  - Payment and Account screens render and switching between tabs does not cause blank states or irreversible failure.

### Mobile viewport re-validation

- Objective: Repeat critical interactions on a mobile-sized viewport to confirm tap-target, layout, and state transitions match expectations.
- Target pages: index.html
- Key checks:
  - Repeat Phase 1 destination selection and forward progression once on the mobile viewport.
  - Check tap target usability for ☰, 🔔, and → (ensure taps register reliably; note any mis-taps).
  - Repeat Phase 3 receipt navigation using Activity tab on mobile viewport.
  - Verify bottom tab bar remains visible and usable at smaller widths without overlap with content.
- Exit criteria:
  - Critical booking and receipt flows work on mobile viewport with no major interaction failures.

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

