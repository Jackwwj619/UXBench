# UXAgent Exploration Plan

## Goal

Explore and critique the UX of the larkfit-mobile fitness tracker UI, focusing on the primary 'Today' screen and adjacent navigation flows (Workouts, Activity, You) plus workout interaction states, while validating mobile tap targets and responsive behavior.

## Plan Summary

Start on the Today screen, validate the bottom navigation (Today/Workouts/Activity/You) and workout play buttons. Check small tap targets flagged in the prescan. Then, explore each navigation tab, interact with workout controls, and repeat critical checks in mobile viewport. Finally, verify all visible buttons and recovery paths.

## Coverage Targets

- pages: `Visit and validate all known pages (index.html) in both desktop and mobile viewports.`
- features: `Exercise all visible controls (navigation tabs, workout buttons, '+' button, 'All workouts' link) and verify workout/activity states.`
- mobile: `Repeat all critical checks (navigation, workout interactions, tap targets) in mobile viewport (≤460px).`

## Planned Phases

### Today Screen & Primary Navigation

- Objective: Validate Today screen content, bottom navigation tabs, and small tap targets.
- Target pages: index.html
- Key checks:
  - Verify Today screen visible text and metrics match prescan.
  - Tap bottom navigation tabs (⌂ Today, ▶ Workouts, 📊 Activity, ◉ You) to confirm state changes.
  - Check small tap targets (e.g., '+' button, workout play buttons) for usability (tap and confirm feedback).
- Exit criteria:
  - All bottom navigation tabs interacted with
  - Small tap targets tested
  - Today screen content verified

### Workout Plan Interaction

- Objective: Validate workout plan interactions (e.g., starting a workout, viewing all workouts).
- Target pages: index.html
- Key checks:
  - Tap 'All workouts →' link to verify workout list navigation (or state change).
  - Tap workout play buttons (e.g., 'Easy 5K — recovery pace', 'Hip-mobility flow') to confirm interaction feedback.
  - Verify workout plan details (e.g., duration, intensity, schedule) match prescan.
- Exit criteria:
  - Workout navigation link interacted with
  - Workout play buttons tested
  - Workout plan details verified

### Mobile Viewport Validation

- Objective: Repeat critical checks in mobile viewport (≤460px) to validate responsive design and mobile usability.
- Target pages: index.html
- Key checks:
  - Switch to mobile viewport (≤460px) and repeat phase 1 & 2 checks.
  - Verify small tap targets still function (tap feedback, state changes).
  - Confirm navigation and workout interactions work in mobile layout.
- Exit criteria:
  - Mobile viewport checks completed
  - Small tap targets validated in mobile
  - Navigation/workout interactions confirmed in mobile

### Workout & Activity States

- Objective: Explore workout and activity states (e.g., starting a workout, viewing activity metrics).
- Target pages: index.html
- Key checks:
  - Tap '📊 Activity' tab to view activity metrics (e.g., 30-day intensity, recent activity).
  - Tap '▶ Workouts' tab to confirm workout plan state (e.g., active workout, upcoming workouts).
  - Verify 'You' tab (Connected, Preferences) content and interactions (if visible).
- Exit criteria:
  - Activity and Workouts tabs interacted with
  - Activity metrics verified
  - You tab content (if visible) checked

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

