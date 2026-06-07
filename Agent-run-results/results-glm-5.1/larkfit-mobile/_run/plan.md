# UXAgent Exploration Plan

## Goal

Exhaustively explore and critique the UX of the larkfit-mobile fitness tracker, validating all tab screens, interactive states, and mobile responsiveness.

## Plan Summary

The exploration will systematically navigate through the four primary bottom-tab screens (Today, Workouts, Activity, You) to validate layout, state changes, and interactive controls. It will then deep-dive into specific interactions like workout details, adding new data, and toggling preferences. Finally, the entire flow will be validated on a mobile viewport to assess edge-to-edge behavior and tap target issues flagged in the prescan.

## Coverage Targets

- pages: `100% of known HTML pages (index.html)`
- features: `Interact with all 4 tab screens, both detected inputs, and all small tap target buttons ('+', '▶')`
- mobile: `Validate all 4 tab screens and 1 overlay/detail state on mobile viewport`

## Planned Phases

### Explore Today Screen

- Objective: Validate the default 'Today' screen layout, data visualization, and initial interactions.
- Target pages: index.html
- Key checks:
  - Verify the 'Today' tab is active and its metrics (MOVE, EXERCISE, STAND, steps, etc.) are visible.
  - Click the 'All workouts →' link/button to check navigation to the Workouts screen or list expansion.
  - Click the '+' button and verify the outcome (e.g., modal, new screen, or input focus).
  - Dismiss any opened overlay to return to the default state.
- Exit criteria:
  - All visible elements on the 'Today' screen have been inspected.
  - The '+' button interaction has been triggered and its state validated.

### Explore Workouts Screen

- Objective: Validate the 'Workouts' tab, workout list, and workout detail interactions.
- Target pages: index.html
- Key checks:
  - Click the '▶ Workouts' tab and verify the screen transition and active tab state.
  - Inspect the workout list and click the '▶' button on 'Easy 5K — recovery pace'.
  - Validate the workout detail view (Plan, You'll need, etc.) and check for layout issues.
  - Dismiss the detail view and repeat for 'Hip-mobility flow'.
- Exit criteria:
  - Workouts tab is fully rendered.
  - Both workout '▶' buttons have been clicked and their detail states validated and dismissed.

### Explore Activity Screen

- Objective: Validate the 'Activity' tab, data visualizations, and 30-day intensity metrics.
- Target pages: index.html
- Key checks:
  - Click the '📊 Activity' tab and verify screen transition.
  - Inspect the '30-day intensity' chart/graph and 'Recent' activity list.
  - Interact with any visible controls or inputs specific to the Activity screen.
- Exit criteria:
  - Activity tab is fully rendered.
  - Visual data elements and recent items have been inspected.

### Explore You Screen

- Objective: Validate the 'You' profile tab, connected apps, and preference inputs.
- Target pages: index.html
- Key checks:
  - Click the '◉ You' tab and verify screen transition.
  - Locate and interact with the 2 detected inputs (likely under 'Preferences' or 'Connected').
  - Toggle any switches or modify input values to test state persistence and validation.
- Exit criteria:
  - You tab is fully rendered.
  - Both inputs have been interacted with and their behaviors validated.

### Mobile Viewport Validation

- Objective: Re-test critical flows and layout shifts on a mobile viewport (≤460px).
- Target pages: index.html
- Key checks:
  - Switch viewport to mobile (e.g., 390x844) and verify edge-to-edge layout and bezel/notch disappearance.
  - Navigate back through all 4 tabs to check for broken layouts or overlapping elements.
  - Re-evaluate the small tap targets ('+' and '▶' buttons) for usability on the mobile viewport.
  - Trigger a workout detail view on mobile to ensure overlays adapt correctly.
- Exit criteria:
  - All 4 tabs have been visited on the mobile viewport.
  - Layout transition from framed to edge-to-edge is validated.
  - Tap target usability has been critiqued.

## Prescan Summary

### Lark — mobile fixture

- Page: `index.html`
- Headings: TODAY'S PLAN, Workouts, Easy 5K · recovery, Easy 5K — recovery pace, Plan, You'll need, Activity, 30-day intensity, Recent, You
- Interactables: `21` buttons, `0` links, `2` inputs
- Notable controls:
  - clickable:button:+
  - clickable:button:▶
  - clickable:button:⌂ Today
  - clickable:button:▶ Workouts
  - clickable:button:📊 Activity
  - clickable:button:◉ You

