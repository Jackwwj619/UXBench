# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full larkfit-mobile system, prioritizing the primary docs/tutorial flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: True

## Summary

The “Today → workout detail → back to Today” flow works when the user taps the small play control on the Today plan (a workout detail page with PLAN/YOU’LL NEED and a “Start workout” CTA appears). However, key primary actions in the Workouts view feel unreliable or non-discoverable: the gear and the per-item “start” affordance are not evidenced, and multiple taps produce no visible change. Mobile usability is further weakened by consistently small touch targets and missing accessibility labeling on at least one dropdown.

## Issues (5)

### [HIGH] the-ui-suggests-workout-cards-are — goal completion
- **Page**: `index.html (mobile screenshots in /_run/screenshots/agentic-79-click-mobile.png, agentic-80-click-mobile.png); Workouts list cards under header “Workouts”`
- **Problem**: The UI suggests workout cards are selectable, but the expected transition/start feedback is not reliably triggered or not visually discoverable.
- **Evidence**: On mobile, clicking workout-related targets (e.g., “All” and “Run”) changed the feed/filter state but did not produce a session/detail transition; the screenshot after taps still shows the Workouts list with cards and no workout-session view (“Workouts” list remains visible; no “Easy 5K · recovery” header or in-progress controls). Separately, the test attempting to click the workout control mapped to ux-20 timed out because the element resolved to a <select> and was not visible/enabled-stable (Click failed for ux-20: Locator.click: Timeout 4000ms exceeded).
- **Suggested fix**: Make the per-card action explicit with a prominent “Start workout”/“▶” CTA on each card (not just category chips), ensure it is visible/enabled in all states, and provide immediate UI feedback (loading state + session screen). If cards aren’t startable, clearly label them as “Browse”/“Details” and use consistent patterns to avoid ambiguity.

### [HIGH] the-gear-icon-is-clickable-but — feedback
- **Page**: `index.html → Workouts screen (mobile) screenshot /_run/screenshots/agentic-78-click-mobile.png`
- **Problem**: The gear icon is clickable but appears to be a silent no-op with no visible settings UI or dismissal/error feedback.
- **Evidence**: On mobile, clicking ⚙ (target ux-11) resulted in no visible UI/state change: screenshot shows the same Workouts list and tool feedback reports changed=false. On desktop, clicking ⚙ (38×38px) also produced no observable change (tool_result: changed=false) and no dialog/overlay was evidenced.
- **Suggested fix**: Ensure gear opens an accessible modal/drawer with clear title, close/dismiss affordance, and an explicit focus shift. If the fixture doesn’t implement settings, replace the gear with disabled state + tooltip (e.g., “Coming soon”) to avoid false affordances.

### [MEDIUM] the-all-workouts-control-is-inconsistent — navigation
- **Page**: `index.html (Today plan row containing “All workouts →” and its small ▶ control; earlier session signal about after_url unchanged)`
- **Problem**: The “All workouts →” control is inconsistent: in some cases it does nothing (no observable view change), while in other cases the user can reach Workouts via bottom tabs.
- **Evidence**: Session notes indicate “Clicking the ‘▶’ control next to ‘All workouts →’ produced no observable change (URL/title unchanged), so the intended routing into a Workouts view was not confirmed.” In contrast, later evidence shows bottom tab switching works (clicking “▶ Workouts” changed the main header/content to “Workouts”).
- **Suggested fix**: Make the “All workouts →” affordance behave identically to the Workouts tab: update header, selected tab state, and provide immediate visual feedback (e.g., highlight/transition). Add an in-place animation or loading indicator to confirm tap registration.

### [MEDIUM] the-time-range-select-control-lacks — accessibility
- **Page**: `index.html → Activity screen top dropdown (target ux-20)`
- **Problem**: The time-range <select> control lacks an accessible label (no label/aria-label/placeholder).
- **Evidence**: Accessibility/layout warning: “Last 30 days This week This year” is a <select class="head-action" data-uxagent-id="ux-20">…</select> with no label, aria-label, or placeholder (console/layout warning: missing_input_label for target ux-20).
- **Suggested fix**: Add a visible label and/or an aria-label describing the filter (e.g., “Activity time range”). Ensure the selected value is announced and focus behavior is correct after selection.

### [LOW] multiple-key-tap-targets-are-below — mobile usability
- **Page**: `index.html → Workouts and workout-detail views (layout_warning_count=8; specific targets ux-11, ux-13/ux-14, ux-8, ux-3/ux-9)`
- **Problem**: Multiple key tap targets are below mobile tap-size guidance, increasing mis-taps and the perception of broken UI.
- **Evidence**: Layout warnings flag small tap targets: ⚙ is 38×38px (<44px guidance), “All” 46×30px, “Run” 55×30px, and the bottom back arrow “←” is 36×36px. The app also uses small play/arrow icons (e.g., ▶ 36×36px) that are repeatedly involved in no-op/timed-out interactions.
- **Suggested fix**: Increase tap target size to at least 44×44px (or apply generous padding around icons), add spacing between adjacent controls, and ensure visual hit areas align with visible UI.
