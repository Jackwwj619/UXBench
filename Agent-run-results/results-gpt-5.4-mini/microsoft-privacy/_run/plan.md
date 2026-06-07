# UXAgent Exploration Plan

## Goal

Exhaustively explore the Microsoft privacy dashboard clone across the main privacy hub and its subpages, validating core settings flows, destructive actions, multi-step confirmations, and mobile usability of the visible controls.

## Plan Summary

Start on the privacy dashboard as the primary hub, then branch into the three explicit navigation flows that are present in the prescan: download your data, browse history management, and ad settings. For each page, exercise the visible controls that change state, open confirmations, or filter data, with extra attention to the browse-history deletion path and the downloadable-data workflow because they contain multi-step and potentially destructive interactions. Finish by repeating the critical checks in a mobile viewport, focusing on tap target sizing, overflow, and whether the same controls remain usable without layout breakage.

## Coverage Targets

- pages: `visit all known HTML pages`
- features: `exercise most visible controls per key page, with special focus on toggles, filters, deletion actions, and multi-step forms`
- mobile: `repeat critical checks on mobile viewport, prioritizing tap targets, scrolling, and destructive confirmation dialogs`

## Planned Phases

### Privacy hub baseline and navigation

- Objective: Validate the main dashboard structure, entry points, and the breadth of visible controls on the landing page before moving into subflows.
- Target pages: index.html
- Key checks:
  - Confirm the hero actions are present and distinguish which are real in-clone navigations versus placeholder links
  - Scroll through the activity-data cards and verify the eight activity categories are all visible and their manage links are accessible
  - Inspect the privacy settings section to identify the six toggles and observe whether changing one produces the live saving/saved feedback
  - Reach the manage-data area and note the download/clear distinction, including whether clear launches a confirmation dialog
  - Check product-level privacy entries for the visible Microsoft products and any interaction affordances
- Exit criteria:
  - All major sections of the dashboard have been visited at least once
  - The count and variety of visible controls on the landing page have been exercised broadly
  - The exploration loop has identified which dashboard links lead to the known subpages

### Download data request flow

- Objective: Exercise the multi-step data-export form and validate the archive request path, including category selection and confirmation behavior.
- Target pages: download-data.html
- Key checks:
  - Open the page from the dashboard and confirm the four-step structure is visible
  - Toggle several category checkboxes to validate inclusive/exclusive selection behavior
  - Test the time-range control and delivery choice controls for state changes
  - Move through the confirm step and observe any validation gating or submission result
  - Verify whether the page clearly communicates that this requests an archive and does not delete data
- Exit criteria:
  - At least one complete archive-request path has been attempted
  - Category selection, time range, and delivery controls have each been exercised
  - Any confirmation or final-submit state has been observed

### Browse history filtering and deletion

- Objective: Deeply validate the most risk-prone page by testing filters, row-level deletion, and the clear-all recovery path.
- Target pages: browse-history.html
- Key checks:
  - Verify the browse-history status text, time-range selector, device selector, and search field all render correctly
  - Change the time range and device filter to see whether the activity table updates coherently
  - Use the search box to narrow results if available and confirm empty/no-match behavior if triggered
  - Delete an individual row via its trash icon and watch for the expected animation and list update
  - Open the 'Clear all browse history' modal, inspect its confirmation language, and validate the cancel/confirm behavior
  - If the table can be emptied, verify the empty state messaging
- Exit criteria:
  - At least one filter combination has been applied successfully
  - At least one single-row deletion has been performed
  - The clear-all confirmation modal has been opened and resolved

### Ad personalization controls

- Objective: Validate how the master ad-personalization toggle and per-service controls interact, including the ad-topics multi-select section.
- Target pages: ad-settings.html
- Key checks:
  - Toggle the master 'See ads that interest you' control and verify the subordinate service cards respond as expected
  - Independently toggle at least one service-specific control in Microsoft consumer apps, Bing & Edge, LinkedIn, and Xbox
  - Exercise the ad-topics multi-select area by selecting and deselecting several topic chips/options
  - Confirm whether the page preserves meaningful state when master and child controls conflict
  - Check for any explanatory text indicating that turning off personalization does not reduce ad quantity
- Exit criteria:
  - Master toggle behavior has been validated against at least one subordinate control
  - Each service group has been touched at least once
  - The ad-topics selection area has been exercised

### Mobile viewport regression pass

- Objective: Repeat the highest-value checks on mobile to assess tap target adequacy, scrolling, and whether key flows remain operable in a narrow viewport.
- Target pages: index.html, browse-history.html, download-data.html, ad-settings.html
- Key checks:
  - Re-open the dashboard and confirm the top nav, hero actions, and a representative subset of activity cards are still reachable
  - On the dashboard, test one privacy toggle and the clear/download data path again if reachable without excessive scrolling issues
  - On browse-history, verify the filters, a row delete, and the clear-all modal remain usable on touch
  - On download-data and ad-settings, confirm the primary form controls remain accessible and do not clip or overlap
  - Record any tap-target or layout issues, especially on the compact top-nav links already flagged by the prescan
- Exit criteria:
  - Critical actions on each page have been verified in mobile viewport
  - Any mobile-specific usability breakage has been noted
  - The known small tap-target problem on top navigation has been checked against actual interaction

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

