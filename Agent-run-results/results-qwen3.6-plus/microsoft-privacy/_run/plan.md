# UXAgent Exploration Plan

## Goal

Autonomously explore and critique the UX of the Microsoft Privacy dashboard, focusing on data visibility, control mechanisms (toggles/deletion), and feedback loops across desktop and mobile viewports.

## Plan Summary

The run will proceed from the main Privacy Dashboard to exercise the three available sub-pages: Browse History, Ad Settings, and Download Data. It will validate critical user flows including filtering activity logs, toggling privacy settings with visual feedback, and navigating the multi-step data download wizard. Special attention will be paid to modal confirmations for destructive actions and mobile tap-target accessibility given the prescan warnings.

## Coverage Targets

- pages: `Visit all 4 HTML files provided in the site directory.`
- features: `Exercise all visible toggles, filters, modals, and wizard steps.`
- mobile: `Perform full pass on Index and Browse History pages in mobile viewport.`

## Planned Phases

### Dashboard Overview & Global Controls

- Objective: Validate the landing page structure, navigation integrity, and global privacy toggles.
- Target pages: index.html
- Key checks:
  - Verify top-level navigation links (Home, Devices, etc.) are clickable.
  - Interact with at least two global privacy setting toggles to observe 'Saving...' -> 'Saved' transition.
  - Check responsiveness of the activity data card grid.
- Exit criteria:
  - Global toggles show state change feedback.
  - No broken links in the primary header/nav.

### Activity Management (Browse History)

- Objective: Test the detailed view for browsing activity, including filtering and deletion workflows.
- Target pages: browse-history.html
- Key checks:
  - Navigate from Index 'Manage browse activity' link.
  - Use 'Time range' and 'Device' filters to verify table updates.
  - Click 'Clear all browse history' to trigger the confirmation modal.
  - Cancel the modal action to ensure data remains intact.
  - Attempt to delete a single row item.
- Exit criteria:
  - Filters apply correctly to the activity table.
  - Modal appears and blocks interaction until resolved.
  - Cancellation returns user to the list view safely.

### Ad Preferences & Dependencies

- Objective: Explore the hierarchy of ad settings and test master/sub-toggle dependencies.
- Target pages: ad-settings.html
- Key checks:
  - Toggle the master 'See ads that interest you' switch.
  - Observe if sub-service toggles (Bing, LinkedIn, Xbox) become disabled or visually dimmed.
  - Re-enable master toggle and verify sub-toggles restore interactivity.
  - Check individual service toggles for independent state persistence.
- Exit criteria:
  - Master toggle clearly controls the enabled/disabled state of child inputs.
  - Visual hierarchy distinguishes between active and inactive settings.

### Data Export Wizard

- Objective: Walk through the 'Download your data' multi-step process to check form continuity.
- Target pages: download-data.html
- Key checks:
  - Select specific data categories (e.g., only 'Browse activity').
  - Proceed through steps 1-4 (Include, Time range, Delivery, Confirm).
  - Verify breadcrumb or step indicator updates correctly.
  - Test 'Back' navigation between steps if available.
- Exit criteria:
  - User can progress through all 4 steps without error.
  - Selections made in Step 1 persist or are summarized in later steps.

### Mobile Viewport Validation

- Objective: Repeat critical checks on mobile viewport to address prescan tap-target warnings.
- Target pages: index.html, browse-history.html
- Key checks:
  - Switch to mobile viewport (e.g., iPhone SE/Pixel 5).
  - Verify hamburger menu or nav collapse behavior.
  - Attempt to tap 'Manage browse activity' and global toggles (check for overlap/mis-clicks).
  - Verify table readability in Browse History (horizontal scroll vs stacking).
- Exit criteria:
  - All primary controls are tappable without zooming.
  - Content reflows legibly without horizontal overflow issues.

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

