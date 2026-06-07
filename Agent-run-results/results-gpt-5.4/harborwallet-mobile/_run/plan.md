# UXAgent Exploration Plan

## Goal

Exhaustively explore the Harbor Wallet mobile single-page app, prioritizing the Account/settings/privacy path while also validating the main wallet tabs, key action buttons, and visible recovery/back-navigation behavior across desktop fixture and true mobile viewport.

## Plan Summary

The run should start from the Home screen and map the SPA's reachable screens through the bottom tab bar and the prominent wallet actions (Send, Receive, Swap, Top up, notifications, and recent activity entry points). Once the screen model is understood, focus deeper on the Account area to locate and validate settings/privacy-related content, including any toggles, lists, or nested detail screens, then verify that users can return safely to prior states. Because this is a single-page mobile fixture, emphasis should be on state transitions, active-tab feedback, scroll behavior, tap-target usability, and viewport-specific presentation rather than multi-page navigation.

## Coverage Targets

- pages: `Visit the sole known HTML page (index.html) and cover all major in-page screens/states reachable from Home, the 5-tab bar, and visible Home actions.`
- features: `Exercise all visible top-level controls from the Home state, all 5 tabs, the Account/settings/privacy path once discovered, and at least one recovery path for each major flow.`
- mobile: `Repeat the critical path set on mobile viewport: tab navigation, Account/privacy discovery, Send or Receive, Activity/See all, notifications, and the known small tap targets.`

## Planned Phases

### Map reachable screens and navigation model

- Objective: Identify all major in-app screens/states reachable from the initial Home view and confirm how navigation works in this single-page mobile fixture.
- Target pages: index.html
- Key checks:
  - Use the bottom tab bar to visit Home, Send, Receive, Activity, and Account, confirming each changes the visible screen content.
  - Record visible headings, unique content blocks, and whether URL/hash/history changes or the app remains on a pure in-page state model.
  - Check whether tab selection is visually persistent and whether returning to Home restores the initial balance/assets/activity layout.
  - Probe the visible Home entry points: notification button, Send, Receive, Swap, Top up, and See all.
- Exit criteria:
  - All 5 bottom tabs have been activated at least once and their resulting states documented.
  - All prominent Home actions have been tested enough to know whether they open distinct screens, overlays, or no-op states.
  - A reliable mental model exists for how the SPA transitions between screens and how users get back.

### Validate primary wallet task flows

- Objective: Exercise the most important transactional/action-oriented screens adjacent to the settings flow and check clarity, completion paths, and recovery paths.
- Target pages: index.html
- Key checks:
  - Open Send and Receive flows and inspect the first screen state, available controls, and whether users can back out cleanly.
  - Open Swap and Top up from Home and evaluate whether they present dedicated task screens, sheets, or placeholder behavior.
  - If any input field is present in these flows, test focus, placeholder/label clarity, and whether the keyboard-safe layout remains usable in mobile viewport.
  - Check whether task flows preserve context when canceled or when switching tabs mid-flow.
- Exit criteria:
  - Each visible primary action from Home has been opened and its initial UX quality assessed.
  - At least one recovery path has been tested for each reachable action flow (back, close, tab switch, or Home return).
  - Any broken, ambiguous, or dead-end action states have been captured.

### Deep dive Account and settings/privacy discovery

- Objective: Locate the settings/privacy area from Account and validate the structure, comprehensibility, and statefulness of any privacy-related controls.
- Target pages: index.html
- Key checks:
  - Enter the Account tab and enumerate visible sections, rows, toggles, buttons, and any settings-related navigation items.
  - Prioritize any items labeled settings, privacy, security, notifications, visibility, personal info, or similar wording actually found in the UI.
  - For each privacy-related control discovered, test whether its state changes, whether the change is visually confirmed, and whether the label clearly communicates impact.
  - Check nested navigation depth: can users tell where they are, return to Account, and recover from exploratory changes without confusion?
  - If multiple account/settings subsections exist, validate which path feels primary for privacy and which paths are adjacent but lower priority.
- Exit criteria:
  - A complete path from Home to Account to the privacy-relevant area has been identified and traversed.
  - All visible privacy/settings controls found in the Account area have been interacted with at least once where safe.
  - Back-navigation and state persistence for the privacy path have been verified.

### Review activity, notifications, and secondary discovery paths

- Objective: Assess adjacent informational flows that may affect trust, findability, and account oversight around the primary settings/privacy experience.
- Target pages: index.html
- Key checks:
  - Open Activity via the tab bar and compare it with the Home-screen recent activity preview and 'See all' entry point.
  - Check whether tapping recent activity items or the See all link reveals more detail, a full ledger, or a dead-end.
  - Open the notification badge/button and inspect whether alerts are readable, actionable, and dismissible.
  - Verify whether secondary informational views maintain consistent navigation patterns with the Account/settings area.
- Exit criteria:
  - Activity and notification-related states have been reached and documented.
  - The relationship between Home preview content and full-detail views is understood.
  - Any discoverability or trust issues in informational flows have been identified.

### Mobile-specific regression and usability verification

- Objective: Repeat the most important checks in a true mobile viewport and inspect touch ergonomics, framing, scrolling, and visual stability.
- Target pages: index.html
- Key checks:
  - Re-run critical navigation: Home, Account/privacy path, one transactional flow, Activity/See all, and notifications on mobile viewport.
  - Verify edge-to-edge rendering at mobile width and compare against desktop fixture presentation for clipping, extra chrome, or spacing shifts.
  - Specifically retest the small tap targets already flagged: notification badge button and See all link.
  - Check whether long content in Account/settings or Activity scrolls cleanly without the tab bar obscuring actionable controls.
  - Observe status bar time updates and whether any live UI updates cause layout jitter or distracting movement.
- Exit criteria:
  - Critical flows have been confirmed in mobile viewport, not just desktop.
  - Known tap-target risks have been directly evaluated on mobile.
  - Any viewport-specific regressions or improvements have been captured.

## Prescan Summary

### Harbor Wallet — mobile fixture

- Page: `index.html`
- Headings: YOUR ASSETS, RECENT ACTIVITY, Send money, Receive money, Account
- Interactables: `39` buttons, `1` links, `1` inputs
- Notable controls:
  - clickable:button:3 🔔
  - clickable:button:↑ Send
  - clickable:button:↓ Receive
  - clickable:button:⇄ Swap
  - clickable:button:+ Top up
  - clickable:a:See all
  - clickable:button:⌂ Home
  - clickable:button:📊 Activity

