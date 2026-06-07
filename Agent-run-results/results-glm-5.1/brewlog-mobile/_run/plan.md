# UXAgent Exploration Plan

## Goal

Exhaustively explore and critique the UX of the brewlog-mobile system, validating all tab views, the brew logging flow, data visualization states, and mobile responsiveness.

## Plan Summary

The exploration will proceed by first validating the primary Today screen and its interactions. It will then move to the Add screen to test the form inputs and logging flow. Next, it will assess the Stats and Beans screens for data visualization and management. Finally, it will repeat critical checks on a mobile viewport to evaluate responsive behavior and layout warnings.

## Coverage Targets

- pages: `Deeply explore the single-page application across all 4 tab views`
- features: `Interact with all bottom tabs, the + Log button, and a representative sample of the 29 form inputs`
- mobile: `Validate all 4 tab views and the primary add brew flow on mobile viewport`

## Planned Phases

### Explore Today Screen

- Objective: Validate the default Today screen layout, brew list interactions, and the '+ Log' button.
- Target pages: index.html
- Key checks:
  - Verify brew entries are displayed correctly under TODAY and YESTERDAY
  - Click the '+ Log' button and verify it navigates to or opens the Add brew screen
  - Check for layout issues and the small tap target warning on the '+ Log' button
- Exit criteria:
  - Today screen fully reviewed
  - '+ Log' button interaction confirmed
  - Brew entry details inspected

### Test Add Brew Flow

- Objective: Exercise the brew logging form, validate inputs, and test submission/cancellation.
- Target pages: index.html
- Key checks:
  - Navigate to Add screen via tab bar
  - Interact with various form inputs (text, numbers, selectors)
  - Attempt to submit an empty form to check validation
  - Fill out and submit a valid brew log
  - Cancel or close the form and verify state preservation/reset
- Exit criteria:
  - All input types on the Add screen interacted with
  - Form validation behavior observed
  - Successful brew submission confirmed

### Validate Stats & Beans Screens

- Objective: Assess the data visualization on the Stats screen and bean management on the Beans screen.
- Target pages: index.html
- Key checks:
  - Navigate to Stats screen and verify 'Score over time', 'Method mix', and 'Top tasting notes' sections render
  - Navigate to Beans screen and verify 'Most-used beans' and bean list display
  - Check for any interactive elements or drill-downs in the visualizations
- Exit criteria:
  - Stats screen visualizations verified
  - Beans screen content verified
  - All bottom tab navigation states exercised

### Mobile Viewport Checks

- Objective: Repeat critical flows on a mobile viewport to validate responsive design and touch targets.
- Target pages: index.html
- Key checks:
  - Switch to mobile viewport and verify edge-to-edge layout and notch/home indicator handling
  - Re-verify the '+ Log' button tap target size and bottom tab bar usability
  - Check Stats screen chart readability on a smaller screen
  - Validate Add brew form usability and input scrolling on mobile
- Exit criteria:
  - Mobile layout renders correctly without overflow
  - Touch targets meet 44px guidance or issues are documented
  - Critical user flow (view today, add brew, check stats) completed on mobile

## Prescan Summary

### Brewlog — mobile fixture

- Page: `index.html`
- Headings: TODAY, YESTERDAY, Log a brew, Stats, Score over time, Method mix, Top tasting notes, Most-used beans, Beans
- Interactables: `24` buttons, `0` links, `29` inputs
- Notable controls:
  - clickable:button:+ Log
  - clickable:button:☕ Today
  - clickable:button:+ Add
  - clickable:button:📊 Stats
  - clickable:button:🫘 Beans

