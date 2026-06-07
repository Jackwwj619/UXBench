# UXAgent Exploration Plan

## Goal

Explore and critique the UX of the Microsoft privacy system, covering primary settings, activity management, and ad settings, with checks for responsiveness, state changes, and error handling.

## Plan Summary

Start with the main dashboard (index.html), validate activity cards and privacy toggles. Then explore browse-history.html for filtering and deletion. Next, check ad-settings.html for toggle interactions. Finally, verify download-data.html and repeat key checks in mobile view. Ensure all pages and critical controls are exercised.

## Coverage Targets

- pages: `Visit all 4 known HTML pages (index, browse-history, ad-settings, download-data)`
- features: `Exercise all visible toggles, buttons, filters, and modal dialogs`
- mobile: `Repeat at least 3 critical checks (e.g., toggle, navigation, modal) in mobile viewport`

## Planned Phases

### Main Dashboard (index.html) Exploration

- Objective: Validate activity cards, privacy toggles, and top navigation
- Target pages: index.html
- Key checks:
  - Click 'Manage browse activity' to ensure navigation to browse-history.html works
  - Interact with a privacy toggle (e.g., 'Voice activity') to check 'Saving…/Saved' feedback
  - Verify top navigation links (e.g., 'Privacy', 'Security') load correct pages
  - Check 'Download your data' link navigates to download-data.html
- Exit criteria:
  - All activity cards and privacy toggles interacted with, navigation links verified

### Browse History (browse-history.html) Management

- Objective: Test filtering, deletion, and empty state
- Target pages: browse-history.html
- Key checks:
  - Use 'Time range' and 'Device' filters to verify activity table updates
  - Delete a single activity row and check animation/state change
  - Click 'Clear all' to trigger modal, dismiss modal and confirm cancellation
  - Trigger empty state (e.g., delete all entries) and verify message
- Exit criteria:
  - Filtering, single delete, bulk delete (with modal), and empty state verified

### Ad Settings (ad-settings.html) Toggles

- Objective: Validate master and per-service toggle interactions
- Target pages: ad-settings.html
- Key checks:
  - Toggle 'See ads that interest you' master switch and check sub-toggles update
  - Toggle a per-service switch (e.g., 'Microsoft consumer apps') and verify state
  - Check 'Manage LinkedIn ad preferences' link navigates correctly
  - Verify ad topic toggles (e.g., 'Technology News') work
- Exit criteria:
  - Master and per-service toggles interacted with, ad topic toggles verified

### Download Data (download-data.html) Configuration

- Objective: Test data selection and confirmation flow
- Target pages: download-data.html
- Key checks:
  - Select/deselect data categories (e.g., 'Account profile', 'Browse activity')
  - Proceed through 'Time range' and 'How to deliver it' steps
  - Trigger download confirmation modal and dismiss it
  - Verify 'privacy dashboard' link navigates back to index.html
- Exit criteria:
  - Data categories selected, download flow (up to modal) verified

### Mobile Viewport Validation

- Objective: Repeat critical checks in mobile view
- Target pages: index.html, browse-history.html, ad-settings.html
- Key checks:
  - Check top navigation links for improved tap targets in mobile view
  - Re-interact with a privacy toggle and ad toggle in mobile view
  - Test 'Manage browse activity' navigation in mobile view
  - Verify modal dialogs (e.g., 'Clear all') are accessible in mobile
- Exit criteria:
  - Critical checks repeated in mobile view, responsive issues (e.g., tap targets) noted

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

