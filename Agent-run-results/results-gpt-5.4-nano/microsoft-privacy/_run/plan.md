# UXAgent Exploration Plan

## Goal

Critique the UX of the Microsoft account privacy dashboard system end-to-end, focusing on the main privacy management flow and the adjacent detail pages (browse history, download data, and ad settings), including destructive/recovery states and mobile usability.

## Plan Summary

Start on index.html (privacy dashboard) and validate the primary navigation/entry points into privacy checkup, download, privacy statement, and the activity-data card tiles. Then drill into browse-history.html and download-data.html to test filter, table actions, and modal confirmations. Finally validate ad-settings.html, including master toggle behavior and per-service controls, and repeat the most critical checks on mobile viewports.

## Coverage Targets

- pages: `Visit all known HTML pages: index.html, ad-settings.html, browse-history.html, download-data.html.`
- features: `Exercise most visible controls per key page: index CTAs and at least one privacy-settings toggle; browse-history filters/search plus per-row delete and clear-all confirmation; download-data step progression and selections; ad-settings master + per-service toggles and ad topics inputs.`
- mobile: `Repeat the critical-path interactions on mobile viewport for each page, especially modals (clear-all) and master/per-service toggles.`

## Planned Phases

### Landing page comprehension & primary navigation

- Objective: Confirm users can understand the privacy dashboard structure and reliably reach primary actions and sub-flows from the main page.
- Target pages: index.html
- Key checks:
  - Verify 'Take the Privacy Checkup' (ux-15) is reachable and leads to the expected in-system destination or is safely non-functional (if it's a stub, confirm messaging).
  - Click 'Download your data' (ux-16) and confirm navigation to download-data.html.
  - Click 'Privacy Statement' (ux-17) and confirm it either opens in-place or navigates to a relevant destination (validate no broken/empty navigation).
  - Click 'Manage browse activity' (ux-19) and confirm navigation to browse-history.html.
  - Scan 'Your activity data' card grid: ensure all eight expected cards are clickable/understandable and at least one (Browse history) navigates correctly.
  - Locate and interact with the 'privacy settings toggle list' on index.html (per readme). Toggle at least one item and validate visible 'Saving…/Saved' state transitions.
- Exit criteria:
  - All primary CTAs relevant to the prescan are verified: at least Download and Browse navigate to their pages, and the privacy toggle list shows correct saving feedback.
  - No unexpected dead ends (blank page, missing content) occur when using the major entry points.

### Browse history detail: filter, delete, clear-all & empty state

- Objective: Validate the browse-history management experience, especially safety and correctness for destructive actions and filter controls.
- Target pages: browse-history.html
- Key checks:
  - Use 'Time range' select (Last 24 hours / 7 days / 30 days / 90 days) and confirm the activity list updates accordingly.
  - Use 'Device' select (All devices / Surface Pro 9 / MacBook Pro / iPhone) and confirm results filter updates.
  - Use the search box (prescan indicates 3 inputs overall) to filter the activity table by page title/URL text; confirm results narrow and highlight is reasonable.
  - Perform a per-row delete using the trash/delete icon on at least one table row; confirm the correct row disappears and that there is no mis-targeting.
  - Use 'Clear all browse history' and validate the modal confirmation: check cancel path keeps data, confirm path clears data.
  - After clearing, verify empty state messaging and that filters/search controls remain usable without errors.
- Exit criteria:
  - At least one scenario validates each: time filtering, device filtering, search filtering, per-row delete, clear-all confirmation/cancel, and post-clear empty state.
  - Modal dialogs behave consistently (correct buttons and no stuck/duplicated states).

### Download your data: step progression & confirm behavior

- Objective: Exercise the download-data flow to ensure information architecture, step logic, and form inputs behave coherently.
- Target pages: download-data.html
- Key checks:
  - Review Step 1 ('What to include'): toggle at least a couple of categories (e.g., Account profile, Browse activity, Search activity) and ensure selections are reflected in the UI state.
  - Proceed to Step 2 ('Time range') and change the time-range selection; confirm Step 3 updates as applicable (or that the UI clearly indicates the next state).
  - Proceed to Step 3 ('How to deliver it') and modify at least one delivery option/input (per prescan: multiple inputs overall).
  - Proceed to Step 4 ('Confirm') and verify the summary matches prior selections.
  - Trigger the final confirm action (if implemented) and validate resulting success/error messaging. If the flow is non-submittable in the clone, validate the presence of appropriate guidance.
- Exit criteria:
  - A full step-through from Step 1 to Step 4 is completed with selection changes preserved and consistent in the confirmation summary.
  - Confirm action produces coherent feedback (success or clearly explained limitations) without navigation glitches.

### Ad settings: master control and per-service synchronization

- Objective: Validate that ad personalization controls work as expected and that master/per-service interactions don’t create confusing or conflicting states.
- Target pages: ad-settings.html
- Key checks:
  - Find and toggle the master control ('See ads that interest you') and verify that dependent behavior for personalization is updated in the UI.
  - For each per-service card (Microsoft consumer apps, Bing & Microsoft Edge, LinkedIn, Xbox — prescan indicates these): toggle each independently and confirm the UI reflects individual state.
  - Toggle per-service controls, then toggle the master control off and back on; verify whether per-service selections are retained or reset (whatever the intended behavior is).
  - Verify there are no contradictory labels like 'On/Off' while the effective personalization text contradicts the toggle states.
  - Attempt interaction with 'Ad topics' chips/inputs (prescan indicates inputs exist; also prescan shows a few sample inputs like Technology News, Travel Asia, Productivity Office apps). Validate multi-select behavior.
- Exit criteria:
  - Master toggle and per-service toggles demonstrate consistent state synchronization across multiple on/off sequences.
  - Ad topics inputs behave consistently (if multi-select, selections are retained and visible).

### Mobile viewport critical-path validation

- Objective: Repeat the highest-risk and highest-frequency interactions on mobile to ensure usability (especially tap targets, modals, and table controls).
- Target pages: index.html, browse-history.html, download-data.html, ad-settings.html
- Key checks:
  - On index.html: verify navigation to Download and Browse still works; attempt at least one privacy toggle and confirm 'Saving…/Saved' remains readable and not overlapped.
  - On browse-history.html: verify time/device dropdowns are usable and modals for clear-all are easy to confirm/cancel on mobile.
  - On browse-history.html: ensure per-row delete targets are tappable without misclicking adjacent cells.
  - On download-data.html: verify step navigation and primary confirm CTA are reachable; validate no horizontal scrolling traps for long option text.
  - On ad-settings.html: verify master toggle and per-service toggles are not too small; validate multi-select ad topics remain selectable.
- Exit criteria:
  - Critical actions (navigate, toggle, filter, delete/clear-all, confirm) complete successfully on mobile without inaccessible controls or unusable modal actions.
  - No major layout break occurs (e.g., hidden buttons, overlapping text, unreadable status messages).

## Prescan Summary

### Privacy dashboard | Microsoft account

- Page: `index.html`
- Headings: Privacy dashboard, Your activity data, Browse history, Search history, Location activity, Voice activity, Media activity, App and service activity, Xbox & gaming activity, Ad settings
- Interactables: `3` buttons, `42` links, `6` inputs
- Notable controls:
  - clickable:a:Microsoft
  - clickable:a:Support
  - clickable:a:Software
  - clickable:a:Devices
  - clickable:a:Gaming
  - clickable:a:Sign out
  - clickable:a:Home
  - clickable:a:Subscriptions

### Ad settings | Privacy dashboard | Microsoft account

- Page: `ad-settings.html`
- Headings: Ad settings, Personalization by service, Microsoft consumer apps, Bing & Microsoft Edge, LinkedIn, Xbox, Ad topics
- Interactables: `2` buttons, `18` links, `13` inputs
- Notable controls:
  - clickable:a:Microsoft
  - clickable:a:Support
  - clickable:a:Software
  - clickable:a:Devices
  - clickable:a:Gaming
  - clickable:a:Sign out
  - clickable:a:Home
  - clickable:a:Subscriptions

### Browse history | Privacy dashboard | Microsoft account

- Page: `browse-history.html`
- Headings: Browse history, Clear all browse history?
- Interactables: `15` buttons, `19` links, `3` inputs
- Notable controls:
  - clickable:a:Microsoft
  - clickable:a:Support
  - clickable:a:Software
  - clickable:a:Devices
  - clickable:a:Gaming
  - clickable:a:Sign out
  - clickable:a:Home
  - clickable:a:Subscriptions

### Download your data | Privacy dashboard | Microsoft account

- Page: `download-data.html`
- Headings: Download your data, 1 · What to include, 2 · Time range, 3 · How to deliver it, 4 · Confirm
- Interactables: `1` buttons, `22` links, `16` inputs
- Notable controls:
  - clickable:a:Microsoft
  - clickable:a:Support
  - clickable:a:Software
  - clickable:a:Devices
  - clickable:a:Gaming
  - clickable:a:Sign out
  - clickable:a:Home
  - clickable:a:Subscriptions

