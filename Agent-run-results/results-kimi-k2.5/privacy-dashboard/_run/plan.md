# UXAgent Exploration Plan

## Goal

Explore and critique the UX of the privacy-dashboard, focusing on the primary privacy settings flow, adjacent states (modals, toggles), and recovery paths, across desktop and mobile viewports.

## Plan Summary

Start with the index.html dashboard, validate core controls (toggles, modals, buttons) in desktop view. Then repeat critical checks (delete modals, export) in mobile view. Prioritize high-risk actions (delete account, export) and small tap targets identified in prescan.

## Coverage Targets

- pages: `100% (only index.html)`
- features: `≥80% of visible controls (toggles, modals, buttons) exercised`
- mobile: `100% of critical actions (delete, export, small taps) rechecked`

## Planned Phases

### Desktop: Core Dashboard Controls

- Objective: Validate primary dashboard interactions (toggles, modals, navigation) in desktop view.
- Target pages: index.html
- Key checks:
  - Click 'Privacy checkup' → verify modal/flow
  - Toggle 'Activity saving' → check state change
  - Click 'Export data' → verify modal (cancel/confirm)
  - Test 'Delete my X data' (e.g., activity) → check double-confirmation
  - Validate small tap targets (e.g., top nav links) → check usability
- Exit criteria:
  - All core dashboard controls tested (toggles, modals, buttons)
  - Small tap target usability noted

### Mobile: Critical Interactions

- Objective: Replicate high-risk/critical checks in mobile viewport (360x640) to validate responsive UX and tap targets.
- Target pages: index.html
- Key checks:
  - Recheck 'Delete account' modal (double-confirmation) in mobile
  - Recheck 'Export data' modal (cancel/confirm) in mobile
  - Test small tap targets (top nav links, sidebar buttons) in mobile → check tapability
  - Verify responsive layout (cards, modals) adapt to mobile
- Exit criteria:
  - Critical actions (delete/export) validated in mobile
  - Small tap target usability in mobile confirmed/flagged

### High-Risk Actions (Delete/Export)

- Objective: Deep-validate high-risk actions (delete account, export) with double-confirmation flows and error recovery.
- Target pages: index.html
- Key checks:
  - Initiate 'Delete account' → verify 2-step confirmation modal
  - Cancel 'Delete account' → check recovery (no data loss)
  - Initiate 'Export data' → verify progress/modal, then cancel
  - Check 'Auto-delete' toggle → verify state persistence
- Exit criteria:
  - High-risk actions (delete/export) fully tested (confirm/cancel paths)
  - Recovery from cancel confirmed

### Usability Critique (All Views)

- Objective: Critique overall UX (information hierarchy, error states, accessibility) for the single-page dashboard.
- Target pages: index.html
- Key checks:
  - Check error states (e.g., failed export, invalid toggle) → are they clear?
  - Verify accessibility (contrast, screen-reader labels) → prescan hints at buttons/links
  - Evaluate information hierarchy (cards, sections) → is critical info (privacy score, controls) prominent?
- Exit criteria:
  - UX critique (accessibility, hierarchy, error states) documented

## Prescan Summary

### Account Privacy Dashboard

- Page: `index.html`
- Headings: Privacy dashboard, Privacy checkup, Activity by category, Search history, Browsing history, Location history, Voice activity, Recent activity, Recommendations, 12 activity items
- Interactables: `125` buttons, `5` links, `34` inputs
- Notable controls:
  - clickable:a:Account privacy home
  - clickable:a:Privacy
  - clickable:a:Data controls
  - clickable:a:Apps
  - clickable:a:Devices
  - clickable:button:Search privacy dashboard
  - clickable:button:Open help
  - clickable:button:Account menu

