# UXAgent Exploration Plan

## Goal

Critique the end-to-end UX of MoonlightTickets: discover an event, view details and select tiers, and complete checkout with promo, attendee form logic, and payment/recovery states, including mobile usability.

## Plan Summary

Start by navigating from the index event cards and filter controls into event details. Then validate ticket tier quantity selection, favorite/share actions, sticky order summary continuity, and the handoff to checkout. Complete checkout to confirmation while exercising promo codes, attendee accordion behavior (including VIP-only fields and second-ticket copy buyer), fee breakdown correctness, countdown, and cancellation flow. Repeat the critical checkout interactions on mobile viewport.

## Coverage Targets

- pages: `Visit all known HTML pages: index.html, event.html (via multiple e params), checkout.html, confirmation.html.`
- features: `Exercise most visible controls per key page: index filters and event cards; event favorite/share + tier stepper + Continue to checkout + audio clips; checkout countdown + cart collapse + attendee accordion (VIP and multi-ticket copy) + promo codes + payment method switching + cancel second-confirmation.`
- mobile: `Repeat phase-5 critical-path checks on mobile viewport, focusing on tap reliability, accordion usability, sticky summary accessibility, promo/fee visibility, and state preservation on cancel.`

## Planned Phases

### Discovery + Filter-to-Event navigation

- Objective: Validate users can reach event detail successfully from the index page using event cards and adjust filters to change the visible set.
- Target pages: index.html
- Key checks:
  - Click 1 of the “Tonight” large event cards (e=e1/e=e2/e=e3) and confirm navigation to event.html with the correct event details (title/time/venue/from $).
  - Use DATE, GENRE, and PRICE selects (and/or VENUE if present) to alter the displayed events; confirm the UI updates without breaking layout.
  - Check top nav links (Tonight/This Week/Calendar/Venues/Artists/Sell tickets/Sign in) for behavior (even if they are placeholders), ensuring no dead ends from within the flow.
- Exit criteria:
  - At least 2 distinct event cards successfully open event.html with matching event metadata.
  - Selecting at least 2 filters results in a changed set of event cards (or a clear “no results”/equivalent state).
  - No navigation dead-ends or broken page states observed from nav/filter usage on desktop.

### Event detail: tier selection + sticky order summary + media/favorite/share

- Objective: Validate the event page supports selecting multiple tiers/quantities, that sticky order summary updates, and that ancillary controls (favorite/share/audio) don’t disrupt checkout.
- Target pages: event.html?e=e1, event.html?e=e2, event.html?e=e3, event.html?e=e10
- Key checks:
  - For at least one event, add 1 ticket each for Early Bird and Standard using stepper (+) and verify counts/pricing update in both tier cards and the “YOUR ORDER” summary.
  - Select VIP tier (where available) and verify the VIP-specific label (“SELLING FAST” badge if present) and VIP pricing update; test decrement (-) back to 0 to confirm limits and disabled states behave.
  - Click “Continue to checkout” after choosing quantities; confirm checkout reflects the chosen tier(s) and quantities.
  - Click favorite (♡) and share (↗) and verify they provide visible feedback (toggle/state) without navigation errors.
  - Play each of the 3 audio clips (LISTEN ▶) at least once; confirm they start (and don’t autoplay unexpectedly) and can be interacted with on desktop.
- Exit criteria:
  - VIP selection and at least one stepper quantity change are validated end-to-end into checkout.
  - “Continue to checkout” preserves selected quantities/tier and lands on checkout.html.
  - Favorite/share interactions show a visible state change and do not break subsequent checkout navigation.
  - Audio clips can be played at least once without blocking the UI.

### Checkout: countdown, cart accordion, attendee form logic, promo + fee breakdown

- Objective: Validate the primary booking flow, including time pressure UI, cart review, attendee form expansion behavior, promo application, and fee calculation correctness as quantities change.
- Target pages: checkout.html
- Key checks:
  - On arrival, observe the reservation countdown and confirm its UI updates; specifically validate the <1 minute transition (red pulse) if timing allows (or wait until it approaches threshold).
  - Use the collapsible cart control: collapse and expand and confirm the subtotal/fees remain visible and submission remains accessible.
  - Expand attendee accordion(s): verify required fields (First, Last, Email, e-delivery toggle) for the first ticket.
  - If selecting VIP in phase-2, confirm the VIP-only attendee field appears (“Name for signed poster”) and is required/optional as indicated.
  - If selecting more than one ticket, confirm the non-first attendee section includes “Copy buyer info” behavior; test copying and verify fields populate correctly.
  - Enter promo codes: try DOORS5 first, then TONIGHT10 (including at least one valid and one invalid/typo code), and verify the fee breakdown discount updates correctly.
  - Validate fee breakdown math behavior qualitatively by checking components in the summary (service $3.50 × n, facility $2 × n, 3% %, $0.30 processing, promo discount) match the displayed totals after quantity/promo changes.
- Exit criteria:
  - Countdown UI and any near-threshold behavior are observed without UI glitches.
  - Attendee accordion logic is validated for: first ticket fields, VIP field presence, and multi-ticket copy buyer info.
  - At least two promo-code scenarios are tested with visible fee breakdown changes and no calculation inconsistencies obvious from UI.
  - No critical form-blocking validation errors appear before attempting payment submission.

### Checkout payment + confirmation + recovery/cancel path

- Objective: Validate payment method UI, card formatting/validation, final confirmation progression, and recovery paths including the “Cancel second-confirmation”.
- Target pages: checkout.html, confirmation.html
- Key checks:
  - Select each of the 3 payment methods (or at least switch between them) and validate the correct input fields appear/disappear.
  - For card entry: type a card number with spaces/delimiters and confirm card-number formatting behavior (grouping) and any basic validation messages.
  - Proceed to the final order confirmation step and submit to reach confirmation.html (success state) at least once.
  - Revisit checkout and trigger the “second-confirmation” UI; use “Cancel second-confirmation” and verify the user returns to the prior state without losing attendee/cart inputs.
- Exit criteria:
  - A complete checkout submission reaches confirmation.html successfully once.
  - At least one “Cancel second-confirmation” interaction returns the user safely with cart/attendee/promo state intact.
  - Payment method switching works without orphaned/hidden required fields.

### Mobile critical-path verification

- Objective: Repeat the most failure-prone checkout and selection interactions on mobile viewport to catch layout/tap target and sticky UI issues.
- Target pages: index.html, event.html?e=e1, checkout.html
- Key checks:
  - On mobile index: tap filter controls and event cards; confirm taps are reliable despite small tap target warnings.
  - On mobile event.html: use tier stepper (+/-) and ensure the stepper works accurately with thumb interaction; verify sticky order summary remains accessible.
  - On mobile checkout: expand/collapse attendee accordion(s) and use copy buyer info; verify form fields remain usable and scroll behavior is sane.
  - Validate promo entry and fee breakdown visibility on mobile (no critical numbers hidden behind collapses).
  - If possible, observe countdown pulse behavior on mobile (or confirm the same UI state changes as desktop).
- Exit criteria:
  - Critical checkout interactions (tier stepper → Continue to checkout → attendee accordion → promo → submission or cancel confirmation) work on mobile without blocking or losing state.
  - No major overlap issues with sticky elements/summary prevent form interaction.

## Prescan Summary

### MoonlightTickets — Tickets for tonight, not next week

- Page: `index.html`
- Headings: Tonight in your city, Sea Glass Sextet, Northern Brushfires, Halcyon Dial, Telegraph Bay, This week
- Interactables: `0` buttons, `22` links, `4` inputs
- Notable controls:
  - clickable:a:MoonlightTickets
  - clickable:a:Tonight
  - clickable:a:This Week
  - clickable:a:Calendar
  - clickable:a:Venues
  - clickable:a:Artists
  - clickable:a:Sell tickets
  - clickable:a:Sign in

### MoonlightTickets — Tickets for tonight, not next week

- Page: `index.html`
- Headings: Tonight in your city, Sea Glass Sextet, Northern Brushfires, Halcyon Dial, Telegraph Bay, This week
- Interactables: `0` buttons, `22` links, `4` inputs
- Notable controls:
  - clickable:a:MoonlightTickets
  - clickable:a:Tonight
  - clickable:a:This Week
  - clickable:a:Calendar
  - clickable:a:Venues
  - clickable:a:Artists
  - clickable:a:Sell tickets
  - clickable:a:Sign in

### MoonlightTickets — Tickets for tonight, not next week

- Page: `index.html`
- Headings: Tonight in your city, Sea Glass Sextet, Northern Brushfires, Halcyon Dial, Telegraph Bay, This week
- Interactables: `0` buttons, `22` links, `4` inputs
- Notable controls:
  - clickable:a:MoonlightTickets
  - clickable:a:Tonight
  - clickable:a:This Week
  - clickable:a:Calendar
  - clickable:a:Venues
  - clickable:a:Artists
  - clickable:a:Sell tickets
  - clickable:a:Sign in

### Event — MoonlightTickets

- Page: `event.html`
- Headings: Sea Glass Sextet, ABOUT, LISTEN, VENUE, YOU MIGHT ALSO LIKE, YOUR ORDER
- Interactables: `9` buttons, `5` links, `0` inputs
- Notable controls:
  - clickable:a:MoonlightTickets
  - clickable:button:♡
  - clickable:button:↗
  - clickable:button:decrease
  - clickable:button:increase
  - clickable:a:→
  - clickable:a:Northern Brushfires Halo Room · Tonight · 10:00 PM
  - clickable:a:Halcyon Dial Velvet Pier · Tonight · 11:00 PM

