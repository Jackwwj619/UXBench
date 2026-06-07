# UXAgent Exploration Plan

## Goal

Autonomously explore and critique the UX of the 'Lark' mobile fitness tracker fixture, focusing on navigation flow, data visualization clarity, and interaction feedback within the single-page application structure.

## Plan Summary

The exploration will treat the site as a Single Page Application (SPA), navigating between the four primary tabs (Today, Workouts, Activity, You) to uncover hidden content sections. It will validate the functionality of key interactive elements like the 'Play' buttons for workouts and the '+' action button, while specifically checking for layout stability and touch-target accessibility in both desktop and mobile viewports.

## Coverage Targets

- pages: `100% of visible views (Today, Workouts, Activity, You)`
- features: `Exercise all bottom tabs, 2 workout play buttons, 1 add (+) button, 1 navigation link`
- mobile: `Full regression of navigation and primary interactions on mobile viewport`

## Planned Phases

### Baseline & Today Tab Validation

- Objective: Establish baseline metrics and validate the default 'Today' dashboard layout and scrollability.
- Target pages: index.html
- Key checks:
  - Verify visibility of all rings (Move, Exercise, Stand) and stats.
  - Scroll down to ensure 'Today's Plan' and 'Streak' sections are fully accessible.
  - Check for horizontal overflow issues in the streak calendar widget.
- Exit criteria:
  - Full vertical scroll of 'Today' tab completed.
  - No visual clipping of critical stats observed.

### Navigation & Content Discovery

- Objective: Systematically visit all bottom-bar tabs to map the full content inventory of the app.
- Target pages: index.html
- Key checks:
  - Click 'Workouts': Identify list items, filters, or categories.
  - Click 'Activity': Locate historical graphs/charts and summary data.
  - Click 'You': Find profile settings, goals, or connected devices.
  - Verify active state styling updates correctly on the tab bar.
- Exit criteria:
  - All 4 tabs visited at least once.
  - Primary content headings for each section identified.

### Primary Interaction: Workout Flow

- Objective: Test the core user journey of starting a workout from the dashboard.
- Target pages: index.html
- Key checks:
  - Click 'Play' (▶) on 'Easy 5K'.
  - Observe transition: Does it open a modal, new view, or timer?
  - Identify controls within the workout view (Pause, Stop, Complete).
  - Attempt to exit/cancel the workout flow to return to Dashboard.
- Exit criteria:
  - Workout initiation flow mapped.
  - Return to home state verified.

### Secondary Actions & Inputs

- Objective: Validate auxiliary controls and input mechanisms.
- Target pages: index.html
- Key checks:
  - Click '+' button: Identify the resulting UI (Modal/Form).
  - If form appears: Check input fields (text, number, date).
  - If modal appears: Check close/dismiss mechanism (X button, backdrop click).
  - Click 'All workouts →' link: Verify navigation to Workouts tab.
- Exit criteria:
  - Behavior of '+' button documented.
  - Input validation or placeholder text noted.

### Mobile Viewport & Accessibility Stress Test

- Objective: Repeat critical checks in mobile viewport to verify responsive behavior and touch targets.
- Target pages: index.html
- Key checks:
  - Switch to Mobile Viewport (iPhone SE/Pixel dimensions).
  - Re-verify tap targets for 'Play' buttons and Tabs (check for overlap).
  - Test scrolling momentum and bounce effects.
  - Check if status bar notch overlaps any UI elements.
- Exit criteria:
  - Mobile layout validated.
  - Touch target warnings re-evaluated in context.

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

