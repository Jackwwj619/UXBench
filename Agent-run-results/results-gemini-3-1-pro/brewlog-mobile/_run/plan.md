# UXAgent Exploration Plan

## Goal

Exhaustively explore and critique the UX of the brewlog-mobile SPA, focusing on tab navigation, the brew logging form, and data visualization screens.

## Plan Summary

The run will proceed by systematically verifying each of the four main bottom navigation tabs: Today, Add, Stats, and Beans. It will thoroughly test the form inputs in the 'Log a brew' view and validate the display of data visualizations in the 'Stats' view, while keeping an eye on mobile layout constraints and tap target sizes.

## Coverage Targets

- pages: `Explore all SPA 'screens' (Today, Add, Stats, Beans) within index.html.`
- features: `Fill out and submit the brew logging form; view all data charts.`
- mobile: `Strictly evaluate layout clipping, tap target sizes, and scrolling physics in the mobile viewport.`

## Planned Phases

### Today View & Navigation Initialization

- Objective: Verify the default 'Today' screen, scroll through existing brew entries, and ensure bottom tabs are visible and functional.
- Target pages: index.html
- Key checks:
  - Check visibility of 'TODAY' and 'YESTERDAY' brew entries.
  - Verify that the bottom navigation bar (Today, Add, Stats, Beans) is fixed at the bottom.
  - Click the '+ Log' button in the header to ensure it routes to the Add screen, then return to 'Today'.
- Exit criteria:
  - Scroll behavior on the 'Today' screen is confirmed, and basic routing via the header button works.

### Log a Brew Form

- Objective: Thoroughly exercise the 'Add' screen form fields and attempt a submission.
- Target pages: index.html
- Key checks:
  - Navigate to 'Add' via the bottom navigation.
  - Interact with various input types (text, numbers, sliders/toggles if present) for beans, grind, dose, yield, time, and score.
  - Test form validation by submitting empty or invalid data.
  - Submit a valid entry and check if the UI provides feedback or redirects back to 'Today' with the new entry.
- Exit criteria:
  - Form validation logic is triggered and recorded, and a successful (or mocked) submission flow is completed.

### Stats & Data Visualization

- Objective: Explore the 'Stats' tab to evaluate the rendering and readability of charts and metrics.
- Target pages: index.html
- Key checks:
  - Navigate to 'Stats' via the bottom navigation.
  - Check the presence and layout of 'Score over time', 'Method mix', and 'Top tasting notes' headings.
  - Verify that charts or graphs are completely visible without horizontal scrolling overflow on mobile.
- Exit criteria:
  - All visualization sections in the Stats view have been inspected for layout issues.

### Beans Database & State Persistence

- Objective: Verify the 'Beans' tab and ensure application state is stable across tab switching.
- Target pages: index.html
- Key checks:
  - Navigate to 'Beans' via the bottom navigation and inspect the list/grid of beans.
  - Switch rapidly back and forth between 'Today', 'Stats', and 'Beans' to ensure the UI does not glitch or lose state.
- Exit criteria:
  - The Beans view is fully loaded and tab switching behaves predictably.

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

