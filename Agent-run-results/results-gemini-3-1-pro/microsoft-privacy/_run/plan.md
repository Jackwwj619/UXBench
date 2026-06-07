# UXAgent Exploration Plan

## Goal

Exhaustively explore the Microsoft Privacy dashboard clone, focusing on settings toggles, data deletion flows, and the data download form across desktop and mobile viewports.

## Plan Summary

The exploration will start on the main privacy dashboard to verify global navigation and activity cards. It will then deep-dive into the Browse History page to test filtering and destructive actions (single/bulk delete). Next, the run will cover Ad Settings to validate complex toggle interactions and interest selection. Finally, it will walk through the multi-step Download Data form and re-test critical interactive flows on a mobile viewport.

## Coverage Targets

- pages: `Visit all 4 linked HTML pages.`
- features: `Exercise settings toggles, modal dialogs, select dropdowns, and form submission.`
- mobile: `Re-run index navigation and browse history deletion flow on mobile viewport.`

## Planned Phases

### Dashboard & Navigation

- Objective: Verify the main dashboard layout, global navigation links, and activity card entry points.
- Target pages: index.html
- Key checks:
  - Check functionality of global header links and user menu.
  - Interact with top-level 'Privacy settings' toggles and observe feedback.
  - Verify that 'Manage browse activity' and 'Download your data' buttons route to correct sub-pages.
- Exit criteria:
  - Successfully navigated to browse-history.html, ad-settings.html, and download-data.html from the index.

### Browse History Management

- Objective: Validate activity filtering and deletion interactions.
- Target pages: browse-history.html
- Key checks:
  - Change 'Time range' and 'Device' select dropdowns.
  - Delete a single row using the per-row trash icon and observe animation/removal.
  - Click 'Clear all' and interact with the resulting modal confirmation.
- Exit criteria:
  - Filters manipulated, single row deleted, and 'Clear all' modal successfully confirmed or dismissed.

### Ad Personalization Settings

- Objective: Test hierarchical toggle states and multi-select interactions.
- Target pages: ad-settings.html
- Key checks:
  - Toggle the master 'See ads that interest you' switch.
  - Toggle individual service switches (e.g., Microsoft consumer apps, Bing & Edge) and check dependency on master switch.
  - Select and deselect various 'Ad topics' checkboxes.
- Exit criteria:
  - Master toggle, sub-toggles, and interest checkboxes have been exercised and state changes verified.

### Data Download Flow

- Objective: Complete the multi-step form to request a data archive.
- Target pages: download-data.html
- Key checks:
  - Select specific data categories (e.g., Account profile, Browse activity) instead of 'Include everything'.
  - Select a specific time range.
  - Choose a delivery method.
  - Submit the form and observe success or validation states.
- Exit criteria:
  - Download form completed and submitted.

### Mobile Usability

- Objective: Verify that complex layouts and dense navigation are usable on small screens.
- Target pages: index.html, browse-history.html, ad-settings.html
- Key checks:
  - Check how the global navigation bar and 'small tap targets' adapt on mobile.
  - Verify that the activity card grid collapses properly on index.html.
  - Ensure data tables and filter bars in browse-history.html are usable without horizontal scrolling.
- Exit criteria:
  - Mobile layout assessed for overlap, horizontal scroll, and touch target size.

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

