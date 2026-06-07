# UXAgent Exploration Plan

## Goal

Explore the Lark mobile fixture’s primary Today docs/tutorial flow, validate the adjacent tab views reachable from the bottom nav, and check key interaction states and mobile usability issues without assuming any pages beyond index.html.

## Plan Summary

The run should start on the Today screen and validate the main dashboard content, the two workout rows, and the top plus button as the primary interactive elements. Then it should traverse the bottom tab bar to confirm the adjacent Activity, Workouts, and You states, looking for content differences, state persistence, and any dead-end or unexpected behavior. Because the prescan shows only one HTML file, the plan should focus on in-page state changes rather than page-to-page navigation, and repeat the most important checks in a mobile viewport.

## Coverage Targets

- pages: `Visit all known HTML pages; in this fixture, that means fully exploring index.html and all in-page states reachable from it.`
- features: `Exercise the Today dashboard, workout play controls, the add/plus control, the All workouts affordance, and each bottom tab state.`
- mobile: `Repeat the main dashboard, workout, and tab-bar checks in mobile viewport, with emphasis on tap target usability and layout fit.`

## Planned Phases

### Baseline Today screen audit

- Objective: Validate the default Today screen structure, hierarchy, and obvious controls before interacting.
- Target pages: index.html
- Key checks:
  - Confirm the dashboard loads with the expected date/time, greeting, activity rings, metrics tiles, and Today's Plan cards.
  - Inspect whether the plus button opens any add/action affordance and whether it is visually/behaviorally usable.
  - Check the workout cards for clarity of title, metadata, and the presence of distinct play controls.
  - Note any truncation, overlap, or alignment issues in the compact phone frame.
- Exit criteria:
  - Default screen content and all visible primary controls have been observed at least once.
  - Any top-level control behavior from the initial state has been recorded.

### Workout card interaction and detail validation

- Objective: Probe the Today workout items and nearby workout-related affordances for drill-in behavior, state changes, or dead ends.
- Target pages: index.html
- Key checks:
  - Activate the Easy 5K play button and observe whether it opens detail content, starts an action, or simply changes state.
  - Activate the Hip-mobility flow play button and compare its response with the first workout.
  - Use the 'All workouts →' affordance if it behaves as navigation or expansion, and verify whether it reveals additional workout content or a separate section.
  - Check whether workout interactions preserve the rest of the Today summary state.
- Exit criteria:
  - Both workout controls have been tested and their behavior compared.
  - Any workout-related expansion/detail state has been captured or ruled out.

### Bottom tab bar coverage

- Objective: Verify the adjacent tab states reachable from Today and determine whether each tab meaningfully changes the view.
- Target pages: index.html
- Key checks:
  - Switch from Today to Workouts and confirm whether the content is distinct from the dashboard.
  - Switch to Activity and inspect for charts, history, or summaries related to the visible '30-day intensity' heading from the prescan.
  - Switch to You and validate whether profile/preferences/connectivity content appears, since those headings were present in the prescan.
  - Return to Today and confirm tab state resets or persists as expected.
- Exit criteria:
  - All four tabs have been visited.
  - The run has recorded whether each tab produces a distinct state and whether the active tab indicator is reliable.

### Preferences and profile-state checks

- Objective: Deepen validation on the You/profile area and any visible settings/preferences affordances.
- Target pages: index.html
- Key checks:
  - Inspect the You tab for any profile, connection, or preference controls that can be interacted with.
  - If inputs become visible, test whether they accept text/selection and whether validation or formatting is present.
  - Look for stateful UI elements such as toggles, cards, or editable fields that might change the fixture’s state.
- Exit criteria:
  - Any interactive controls on the You tab have been discovered and exercised, or the tab is confirmed to be mostly informational.
  - No unexpected modal, form, or navigation behavior remains unexplored in this area.

### Mobile viewport regression pass

- Objective: Repeat the most important interactions in a mobile-sized viewport to confirm touch usability and layout stability.
- Target pages: index.html
- Key checks:
  - Re-check the top plus button and workout play targets for tap accessibility in mobile size.
  - Re-visit the bottom tab bar to confirm active states remain legible and tappable on mobile.
  - Verify the Today card stack does not clip, overlap, or hide content in the smaller viewport.
  - Confirm the small tap target warnings remain the main issue and no new layout breakage appears.
- Exit criteria:
  - Critical interactions have been exercised in mobile viewport.
  - Any viewport-specific layout or touch issues have been documented.

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

