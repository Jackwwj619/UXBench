# UXAgent Exploration Plan

## Goal

Autonomously explore and critique the UX of the full larkfit-mobile system, prioritizing the primary docs/tutorial flow plus adjacent pages, states, and recovery paths.

## Plan Summary

The exploration will systematically test the single-page application by navigating through the four main bottom tabs (Today, Workouts, Activity, You). It will interact with actionable elements on each screen, such as workout play buttons and profile inputs. Finally, it will verify layout constraints and touch target sizes, especially considering the mobile-first design.

## Coverage Targets

- pages: `Visit index.html and trigger all 4 main virtual screens via the tab bar.`
- features: `Exercise workout playback buttons, quick add (+), tab navigation, and settings inputs.`
- mobile: `Ensure the UI functions correctly in a mobile viewport, paying attention to the bottom bar and tap targets.`

## Planned Phases

### Bottom Tab Navigation Validation

- Objective: Verify that all four bottom tabs correctly switch the visible screen content.
- Target pages: index.html
- Key checks:
  - Click '▶ Workouts', '📊 Activity', and '◉ You' tabs sequentially
  - Verify headings change (e.g., 'Workouts', 'Activity', 'You') to confirm screen transitions
  - Return to '⌂ Today' tab
- Exit criteria:
  - All four tabs have been clicked and their corresponding main headings are confirmed visible.

### Today Screen Interactions

- Objective: Explore actionable elements on the default 'Today' dashboard.
- Target pages: index.html
- Key checks:
  - Click the '+' button at the top
  - Click the '▶' play button next to 'Easy 5K' or 'Hip-mobility flow'
  - Check if a modal, workout active state, or new view appears
- Exit criteria:
  - Primary action buttons on the Today screen have been triggered and state changes recorded.

### Workouts and Activity Exploration

- Objective: Investigate content and interactions within the Workouts and Activity screens.
- Target pages: index.html
- Key checks:
  - Navigate to 'Workouts', click on a workout card (e.g., 'Easy 5K · recovery') to check for detail views
  - Navigate to 'Activity', look for interactive charts, 'Recent' logs, or '30-day intensity' filters
- Exit criteria:
  - Both screens have been scrolled and any visible interactive lists or charts tested.

### Profile and Settings (You Tab)

- Objective: Test form inputs and preference toggles on the user profile screen.
- Target pages: index.html
- Key checks:
  - Navigate to '◉ You'
  - Identify and interact with the 2 inputs found in the prescan
  - Toggle any switches under 'Preferences' or 'Connected'
- Exit criteria:
  - Inputs have been focused/modified and settings toggles clicked.

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

