# UXAgent Exploration Plan

## Goal

Autonomously explore and critique the UX of the privacy-dashboard system, prioritizing data control toggles, deletion confirmation flows, and responsive layout.

## Plan Summary

The exploration will focus on the single-page dashboard application. It will systematically verify navigation elements, interact with activity filters and privacy checkup tools, toggle various data tracking settings to ensure state updates, and rigorously test the deletion and export modals.

## Coverage Targets

- pages: `Fully explore index.html as a single-page app.`
- features: `Exercise navigation, time filters, state toggles, and all available modal dialogs.`
- mobile: `Focus on responsive navigation adaptation and modal usability.`

## Planned Phases

### Navigation and Layout Verification

- Objective: Ensure all primary navigation elements (sidebar and top nav) function correctly and layout is stable.
- Target pages: index.html
- Key checks:
  - Click sidebar links (Overview, Activity history, Data controls, etc.) and observe content updates or scroll behavior.
  - Check top navigation items (Privacy, Apps, Devices, Search, Account menu).
  - Verify visibility of the privacy score and summary cards.
- Exit criteria:
  - All main navigation areas have been clicked and their resulting state changes observed.

### Dashboard Widgets and Filters

- Objective: Test the interactive widgets on the overview section.
- Target pages: index.html
- Key checks:
  - Interact with the 'Privacy checkup' section (e.g., click 'Start' or specific recommendations).
  - Test the 'Activity by category' time filters (30d, 90d, 1y buttons) to see if chart data changes.
  - Expand or interact with 'Recent activity' items.
- Exit criteria:
  - Time filters toggled and 'Privacy checkup' interactions completed.

### Data Control Toggles

- Objective: Validate the functionality and UX of privacy toggles for different data categories.
- Target pages: index.html
- Key checks:
  - Locate sections for Search history, Browsing history, Location history, and Voice activity.
  - Toggle switches on and off for at least two categories.
  - Verify that turning a toggle off updates the UI (e.g., status text changes to 'Paused' or similar).
- Exit criteria:
  - At least two data control toggles have been successfully flipped and their state changes verified.

### Modals and Danger Zones

- Objective: Thoroughly test destructive actions and data export flows to ensure safe user experience.
- Target pages: index.html
- Key checks:
  - Click 'Manage' or 'Delete' buttons on specific data history cards to trigger modals.
  - Interact with the 'Export data' and 'Delete account' buttons.
  - Attempt to close/cancel out of the triggered dialogs, then attempt a mock submission.
- Exit criteria:
  - All identified dialogs (up to 3) have been triggered, interacted with, and successfully dismissed.

### Mobile Usability Check

- Objective: Re-evaluate critical interactions on a mobile viewport to check for tap target and layout issues.
- Target pages: index.html
- Key checks:
  - Switch to mobile viewport.
  - Verify how the sidebar navigation adapts (e.g., hamburger menu).
  - Open a deletion modal and ensure buttons are accessible and fit on screen.
  - Test toggle switches for tap target sizing.
- Exit criteria:
  - Navigation, one toggle, and one modal have been successfully operated in mobile view.

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

