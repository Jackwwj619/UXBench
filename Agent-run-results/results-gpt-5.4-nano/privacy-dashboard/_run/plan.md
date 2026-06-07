# UXAgent Exploration Plan

## Goal

Critique and validate the end-to-end UX of the privacy-dashboard settings/privacy management experience, including the primary control/toggle flows, export/delete recovery paths, and key interactive elements on both desktop and mobile.

## Plan Summary

Start on index.html and exercise the primary privacy-dashboard interactions: navigate via left rail, use the global search/help affordances, and run through the Privacy checkup recommendations panel. Then validate each card’s toggles, “Details” links, and destructive actions (delete specific data, export data, delete account) with confirmation modals and status feedback. Finally, repeat the most critical interactions on a mobile viewport to assess responsiveness and tap-target usability.

## Coverage Targets

- pages: `Visit all known HTML pages (index.html).`
- features: `Exercise all visible control types on index.html: top navigation tabs, left-rail section navigation, Ctrl K search, Help overlay, account menu, Privacy checkup start/step cards, per-category toggles, Details links, delete-my-data confirmations, Export data flow, and Delete account two-step confirmation.`
- mobile: `Repeat critical-path interactions (search/help/open Privacy checkup, one toggle+details+delete flow, and one destructive danger-zone flow) on mobile viewport.`

## Planned Phases

### Baseline navigation & discoverability

- Objective: Confirm the page loads cleanly and core navigation affordances work (rail, top tabs, search, help, account menu) without breaking subsequent interactions.
- Target pages: index.html
- Key checks:
  - Use top navigation: click “Privacy” (already selected) and then “Data controls”, “Apps”, “Devices” to verify visual state changes (or no-op if single-page).
  - Use left rail buttons: click “Overview”, “Activity history”, “Data controls”, “Ad personalization”, “App access”, “Devices & locations”, “Export data”, “Settings” and confirm the page scrolls/section focuses appropriately (or content switches).
  - Activate global search via the “Search Ctrl K” control; type a query (e.g., “location”) and verify results/filtering or placeholder behavior; close search.
  - Open “Help” and confirm it dismisses/returns focus.
  - Open “Account menu” and verify it can be closed and doesn’t interfere with modals later.
- Exit criteria:
  - No console/network errors occur.
  - All opened overlays/modals can be closed reliably and focus returns to a logical control.
  - Navigation to each left-rail item results in correct on-page context (section visibility or scroll position).

### Privacy checkup flow validation

- Objective: Validate the recommended-action experience, including the “Start” entry point and the step cards for review/export/recommendations.
- Target pages: index.html
- Key checks:
  - Click the “Privacy checkup” button in the header; confirm it brings the user to the Privacy checkup panel.
  - Click “Start” and verify the panel/steps become active (or highlighted) without losing current state.
  - Click each visible recommendation card/button: “Review activity saving”, “Adjust ad personalization”, “Inspect connected apps”, “Create a data export” and verify the correct detail section expands (or a modal opens) for each step.
- Exit criteria:
  - Each recommendation entry leads to the correct corresponding area and can be returned to a stable state.
  - Progress indicators (e.g., Controls active / recommendations open) remain consistent with step completion behavior.

### Per-category controls: toggles, Details, and delete-my-data

- Objective: Exercise each privacy category card’s primary controls end-to-end and confirm state coherence and safe recovery.
- Target pages: index.html
- Key checks:
  - For each major category card visible in the dashboard (e.g., Search history, Browsing history, Location history, Voice activity, Recent activity, Connected apps, and ad personalization items), toggle the control ON/OFF and verify immediate UI updates.
  - Click each category’s “Details” link (or equivalent) and confirm details open with the right category context and dismiss correctly.
  - Trigger “Delete my X data” for at least two different categories (include one non-danger zone category first) and validate the confirmation modal: confirm deletion, then verify status feedback (success/cancel text) and that counts/states update appropriately.
- Exit criteria:
  - Toggles update relevant summary figures (e.g., ‘Controls active’ / saved items / recommendation status) without inconsistencies.
  - Details overlays show correct context and do not reset toggle selections.
  - Delete confirmations complete safely with clear outcomes (success or cancellation) and no UI dead-ends.

### Export and account deletion safety nets

- Objective: Validate the highest-risk destructive flows (export and delete account) including confirmations, cancellation, and any secondary confirmation modal.
- Target pages: index.html
- Key checks:
  - Click “Export data” (header button) and the left-rail “Export data” item; verify it leads to the same export flow/section.
  - If export triggers a confirmation, validate confirm/cancel and check for status text or progress indicators after confirm.
  - Trigger the “Delete account” danger zone action (do not complete on first attempt): verify the primary confirmation modal appears.
  - If there is a second confirmation modal (prescan notes delete second-confirmation modal), validate the two-step requirement: cancel on step 1, then confirm on step 2 and verify final outcome and UI recovery.
- Exit criteria:
  - Dangerous actions require the intended number of confirmations and provide clear success/cancel messages.
  - After each modal, the UI remains usable (no stuck loading/spinners) and state is coherent.

### Mobile critical-path replay

- Objective: Repeat the critical interactions on a mobile viewport to ensure usability, especially around small tap targets and modal behavior.
- Target pages: index.html
- Key checks:
  - Repeat Phase-1 navigation: open “Privacy checkup”, use Ctrl K search (or its mobile equivalent), and open Help; verify overlays are reachable and dismissible.
  - Perform at least one toggle + Details + delete-my-data flow on mobile (choose a category that was successfully tested on desktop).
  - Attempt opening a top/left navigation item that had small tap targets flagged in prescan and confirm they remain tappable without misclicks.
- Exit criteria:
  - No blocked controls due to tap-target issues.
  - Modals/overlays function properly on mobile and do not exceed viewport or trap focus.
  - Critical state changes (toggle/delete) behave consistently with desktop.

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

