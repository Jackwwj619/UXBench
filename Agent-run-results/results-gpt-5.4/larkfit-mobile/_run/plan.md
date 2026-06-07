# UXAgent Exploration Plan

## Goal

Exhaustively explore the single-page Lark mobile fixture, validating the primary bottom-tab navigation flow and the visible workout/activity/profile sections, while checking state changes, detail views, and mobile-specific usability risks.

## Plan Summary

The run should treat index.html as a multi-screen mobile app contained within one HTML page, with the bottom tab bar as the primary navigation model. Start by mapping the default Today screen and confirming how the visible controls reveal adjacent sections such as Workouts, Activity, and You, then probe deeper into workout cards, the add button, and any drill-in states suggested by the headings. Because this is a mobile fixture with only one known HTML file, emphasis should be on in-page transitions, hidden states, and interaction fidelity across desktop and true mobile viewport sizes.

## Coverage Targets

- pages: `Fully cover the single known HTML page (index.html), including all reachable in-page screens, tabs, overlays, and drill-in states.`
- features: `Exercise nearly all visible high-value controls: all four bottom tabs, visible workout cards and play buttons, the plus button, any 'All workouts →' affordance, and representative controls within Activity and You.`
- mobile: `Repeat all critical navigation and workout/action flows on a true mobile viewport, with special attention to the small-tap-target controls and safe-area behavior.`

## Planned Phases

### Map default Today screen and visible information hierarchy

- Objective: Establish the baseline behavior and content structure of the default screen before changing state.
- Target pages: index.html
- Key checks:
  - Confirm Today is the default active tab and identify the visual active-state treatment in the bottom navigation
  - Inspect the dashboard summary area including rings, key metrics, today's plan cards, and streak card for readability and hierarchy
  - Check whether the visible 'All workouts →' affordance is interactive despite being presented as text in the prescan
  - Scroll the page to verify the extent of Today content and whether sections below the fold remain contextually connected
  - Record any immediately visible usability issues such as cramped tap targets, clipped text, or weak section separation
- Exit criteria:
  - A clear baseline map of the Today screen content and controls has been captured
  - The active/default navigation state is confirmed
  - Any visible scroll depth and primary Today actions are identified

### Exercise primary navigation across tabs

- Objective: Validate the main app flow by traversing each bottom-tab destination and confirming distinct content/state changes.
- Target pages: index.html
- Key checks:
  - Tap Today, Workouts, Activity, and You tabs in sequence and verify each produces a meaningful screen or section change
  - Check whether tab switches preserve scroll position unexpectedly or correctly reset to the top of the selected screen
  - Verify active-tab styling updates consistently and only one tab appears selected at a time
  - Confirm returning to Today from another tab is reliable and does not lose key content or break layout
  - Note whether any tab content appears duplicated, truncated, or mislabeled relative to headings seen in the prescan
- Exit criteria:
  - All four bottom-tab destinations have been visited
  - Distinct content/state for Workouts, Activity, and You has been confirmed or the lack of distinction documented
  - Round-trip navigation between tabs works without dead ends

### Probe workout list, detail, and action flows

- Objective: Deeply validate the most action-oriented flow around workouts from discovery to detail or start states.
- Target pages: index.html
- Key checks:
  - Use the visible workout cards on Today and any Workouts tab content to open workout-related states
  - Test the play (▶) buttons on at least the visible 'Easy 5K — recovery pace' and 'Hip-mobility flow' cards
  - Open any workout detail view suggested by headings such as 'Easy 5K · recovery', 'Plan', and 'You'll need'
  - Compare entry paths into workout content via card tap, play button, and 'All workouts →' if interactive
  - Verify whether workout details provide a clear way back to the originating list or screen
  - Check for inconsistent CTA meaning if the same icon/button opens different outcomes across workout cards
- Exit criteria:
  - At least one workout drill-in path has been exercised from list to deeper state
  - Play-button behavior and card-tap behavior are understood and documented
  - A recovery path back to list or Today has been confirmed

### Inspect secondary sections and settings-like surfaces

- Objective: Validate adjacent flows that support the main experience, especially Activity and You content.
- Target pages: index.html
- Key checks:
  - On Activity, inspect the '30-day intensity' and 'Recent' areas for chart legibility, scrolling behavior, and content density
  - On You, inspect 'Connected' and 'Preferences' areas for obvious controls, toggles, or list items and test a representative sample
  - Use the plus (+) button from at least one stable screen to discover whether it opens a modal, drawer, composer, or no-op state
  - If the plus flow opens an overlay or sheet, verify dismissal via close control, backdrop tap, or back path
  - Check whether state from secondary sections leaks across tabs or causes stale content when returning
- Exit criteria:
  - Activity and You sections have each been explored beyond first view
  - The plus-button behavior has been identified and exercised
  - Any secondary overlay or settings-like state has a confirmed exit path

### Mobile-specific validation and resilience pass

- Objective: Repeat critical interactions on mobile viewport and validate touch ergonomics, responsive behavior, and recovery from edge states.
- Target pages: index.html
- Key checks:
  - Repeat the primary tab-navigation flow on a mobile viewport at or below the documented mobile threshold
  - Retest the plus button and workout play buttons on mobile because prescan already flagged undersized tap targets
  - Verify the phone-frame/chrome presentation does not interfere with content, scrolling, or fixed bottom navigation
  - Check whether the layout changes to edge-to-edge behavior on mobile as described in the site summary
  - Confirm no text clipping, overlap, or inaccessible controls appear around the notch area, status bar, bottom tab bar, or home-indicator region
- Exit criteria:
  - Critical navigation and workout actions have been replayed on mobile viewport
  - Responsive differences between desktop fixture view and mobile view are documented
  - Tap-target and safe-area issues have been specifically checked on the known risky controls

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

