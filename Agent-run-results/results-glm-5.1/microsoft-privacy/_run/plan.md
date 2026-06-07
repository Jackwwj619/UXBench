# UXAgent Exploration Plan

## Goal

Exhaustively explore and critique the UX of the Microsoft privacy dashboard and its sub-pages, validating all interactive controls, state changes, destructive actions, and responsive layouts.

## Plan Summary

The exploration will proceed through four phases, starting with the main dashboard's toggles and cards, moving to the data detail pages (browse history and ad settings), then validating the multi-step data download flow, and finally re-checking critical interactions on a mobile viewport. Special attention will be given to toggle feedback, modal confirmations for destructive actions, and the master/sub-toggle relationship on the ad settings page.

## Coverage Targets

- pages: `visit and interact with all 4 known HTML pages`
- features: `exercise all toggles, filter controls, modal triggers, and form inputs across the site`
- mobile: `validate layout, tap targets, and critical interactions (toggles, modals) on mobile viewport`

## Planned Phases

### Dashboard Overview & Privacy Toggles

- Objective: Validate the main dashboard layout, activity cards, and the privacy settings toggle interactions with their live feedback.
- Target pages: index.html
- Key checks:
  - Verify the 8 activity data cards render correctly with their stats.
  - Toggle each of the 6 privacy settings off and on, verifying the 'Saving…' and 'Saved' feedback appears and resolves.
  - Click the 'Clear' button in the 'Manage your data' section and verify the second-confirmation modal appears and can be cancelled.
  - Check the hero section links (Privacy Checkup, Download your data, Privacy Statement, Help with privacy) for correct navigation or hover states.
- Exit criteria:
  - All 6 toggles have been flipped and their feedback validated.
  - Clear data modal has been triggered and dismissed.
  - All activity cards visually inspected.

### Browse History Detail & Deletion

- Objective: Validate the browse history filtering, individual row deletion, and bulk clear functionality.
- Target pages: browse-history.html
- Key checks:
  - Use the filter bar (Time range, Device) and verify the activity table updates or appears to filter.
  - Delete an individual history row using the delete icon and verify the removal animation.
  - Click 'Clear all browse history' and verify the modal confirmation appears.
  - Dismiss the modal, then confirm the clear action to check for the empty state UI.
  - Navigate back to the dashboard using the breadcrumb link.
- Exit criteria:
  - Filters interacted with and table state observed.
  - Single row delete animation confirmed.
  - Clear all modal triggered, dismissed, and accepted; empty state verified.

### Ad Settings & Data Download Flow

- Objective: Validate the master/dependent toggle relationship in ad settings and the multi-step form inputs in the data download flow.
- Target pages: ad-settings.html, download-data.html
- Key checks:
  - Toggle the master 'See ads that interest you' off and verify that the per-service cards (Microsoft, Bing, LinkedIn, Xbox) become disabled or unchecked.
  - Re-enable the master toggle and interact with an individual service toggle.
  - On download-data.html, step through the 4 sections: select data categories, select time range, select delivery method, and attempt to submit/confirm.
  - Verify that the form inputs (checkboxes for categories, radio buttons for time/delivery) respond correctly to clicks.
- Exit criteria:
  - Master toggle dependency on ad-settings.html verified.
  - All steps of the download form interacted with and visual state changes confirmed.

### Mobile Viewport Validation

- Objective: Re-validate critical flows and check for layout regressions and tap target usability on a mobile viewport.
- Target pages: index.html, browse-history.html
- Key checks:
  - Switch to mobile viewport and check the top navigation ribbon for layout wrapping or overflow issues.
  - Verify the small tap targets identified in the prescan (e.g., 'Microsoft', 'Support', 'Sign out') and assess if they are too close together.
  - Interact with a privacy toggle on the main dashboard to ensure it works on mobile without layout shift.
  - Navigate to browse-history.html and verify the activity table is responsive (e.g., horizontal scroll or stacked cards) and the 'Clear all' button is accessible.
- Exit criteria:
  - Mobile viewport layout inspected on main pages.
  - Tap target severity assessed in mobile context.
  - Core toggle and modal interactions confirmed functional on mobile.

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

