# UXAgent Exploration Plan

## Goal

Critique the full larkfit-mobile UX by exercising the primary Today → Workout entry path and validating adjacent bottom-tab flows (Workouts, Activity, You), including key states like starting a workout and recovering back to home.

## Plan Summary

Start on index.html and explore the primary Today plan interactions: the quick-launch play buttons and the “All workouts” entry. Then validate the adjacent bottom-tab destinations by switching tabs and checking whether content/state is preserved or reset. Throughout, pay attention to small-tap target issues flagged by the prescan and verify behavior on both desktop-sized and mobile-sized viewports (≤460px).

## Coverage Targets

- pages: `Visit all known HTML pages (index.html only).`
- features: `Exercise most visible controls per key page: + action, both workout play buttons, the All workouts CTA, and all bottom tab buttons (4).`
- mobile: `Repeat critical checks from phases 1–3 on a mobile viewport (≤460px), with extra focus on the prescan small tap target warnings.`

## Planned Phases

### Baseline capture + primary Today plan entry

- Objective: Validate the default landing experience and the core Today plan interactions from the initial state shown in the prescan.
- Target pages: index.html
- Key checks:
  - Confirm visible header/date/user context and that the UI matches the prescan layout
  - Tap the “Easy 5K — recovery” play control (▶) and confirm the workout/session screen state changes as expected
  - Return from the workout/session back to Today (validate back affordance and whether the scroll position/selection is preserved)
  - Tap “Hip-mobility flow” play control (▶) and confirm it launches the correct second workout type/metadata
- Exit criteria:
  - Both workout play actions successfully transition to their respective workout-related states and can be exited back to the Today view
  - No console/network errors are triggered during these transitions

### Adjacent entry: All workouts + quick action (+)

- Objective: Test alternative/adjacent navigation mechanisms that lead into the Workouts area and validate the top “+” quick action.
- Target pages: index.html
- Key checks:
  - Tap the “All workouts →” CTA in TODAY'S PLAN and verify it routes into the Workouts view/section (or expands a list) correctly
  - On mobile viewport, repeatedly tap the top-right “+” control (ux-1) to verify reliable activation despite the small tap target warning
  - If “+” opens an overlay/picker, validate that it can be dismissed (tap outside / close button) and that focus returns appropriately
- Exit criteria:
  - All workouts CTA leads to the intended destination and the user can return to Today cleanly
  - + quick action is reliably tappable on mobile and its resulting UI (if any) is dismissible without getting stuck

### Bottom tab navigation consistency (Today/Workouts/Activity/You)

- Objective: Validate the four-tab navigation model, including selected-state UI, content switching, and state persistence.
- Target pages: index.html
- Key checks:
  - Switch tabs in this order: Today → Workouts → Activity → You → back to Today; confirm active tab highlight/indicator is accurate
  - From Workouts, verify returning to Today shows either the same plan section or an intentional reset (record actual behavior)
  - Check whether workout launch state persists after switching tabs (e.g., if you start a workout then go to Activity/You, does it pause/exit?)
  - Verify there are no dead-ends: each tab must be reachable and must allow return
- Exit criteria:
  - All four bottom tabs switch correctly with consistent selected states
  - Navigation away from and back to Today is possible and behavior is coherent (no trapped overlay or broken transitions)

### Mobile-specific validation (≤460px) + tap target risk review

- Objective: Re-run the most interaction-heavy checks on a mobile viewport and validate the prescan-flagged tap target risks.
- Target pages: index.html
- Key checks:
  - Repeat: tap “+”, tap both workout ▶ controls, and switch through all four bottom tabs
  - Specifically evaluate whether the 36x36–38x38 controls are still comfortable and do not trigger wrong targets
  - Check for layout shifts/clipping around the bottom tab bar and the workout cards when in the narrower viewport
- Exit criteria:
  - Critical interactions work as expected on mobile-sized viewport without mis-taps or clipped controls
  - Bottom tab bar remains visible and usable across transitions

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

