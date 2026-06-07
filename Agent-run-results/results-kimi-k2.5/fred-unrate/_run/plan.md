# UXAgent Exploration Plan

## Goal

Critique the UX of the fred-unrate system, focusing on the primary data visualization flow (chart interaction, time range/frequency toggles, metadata) and adjacent features (download, embed, related series, mobile responsiveness).

## Plan Summary

Explore the index.html page (only known page) in phases: validate the maintenance notice dismissal, chart interaction (time range, hover, table view), metadata/action buttons, and mobile responsiveness. Check for small tap targets and functional consistency across viewports.

## Coverage Targets

- pages: `Visit index.html (only known page) in desktop and mobile viewports.`
- features: `Exercise chart (hover, time range), metadata (source, release), action buttons (Edit, Download), search, account menu, related series, and error handling.`
- mobile: `Repeat critical checks (chart, time range, action buttons) in mobile viewport, validate small tap targets.`

## Planned Phases

### Maintenance Notice & Top Navigation

- Objective: Validate dismissal of maintenance notice and top nav interactivity (search, apps, account).
- Target pages: index.html
- Key checks:
  - Click 'Close' maintenance notice (check dismissal), interact with search input (type 'unrate'), click 'Explore FRED apps' (check visibility), click account menu (check dropdown).
- Exit criteria:
  - Maintenance notice dismissed, search input accepts text, apps/account menus are interactive.

### Chart & Time-Range Controls

- Objective: Validate chart interactivity (hover, tooltip) and time-range toggles (1Y, 5Y, Max, custom dates).
- Target pages: index.html
- Key checks:
  - Hover over chart (check tooltip), click '5Y' (verify time range), click 'Max' (verify full range), edit 'From'/'To' inputs (check date validation), switch to 'View as data table' (verify table rendering).
- Exit criteria:
  - Chart tooltip appears on hover, time-range toggles update chart, date inputs accept valid dates, data table loads.

### Metadata & Action Buttons

- Objective: Validate metadata (source, release) and action buttons (Edit Graph, Download, Embed).
- Target pages: index.html
- Key checks:
  - Verify metadata (Source: U.S. Bureau of Labor Statistics, Next Release: Jun 5, 2026), click 'Edit Graph' (check modal/options), click 'Download' (check dropdown), click 'Embed' (check code snippet).
- Exit criteria:
  - Metadata is accurate, Edit Graph opens options, Download dropdown shows options, Embed provides code.

### Mobile Viewport Validation

- Objective: Validate responsiveness and interactivity in mobile viewport (switch to mobile, repeat critical checks).
- Target pages: index.html
- Key checks:
  - Switch to mobile viewport, repeat phase 1-3 checks (maintenance notice, chart hover, time-range toggles, metadata). Check small tap targets (e.g., 'Close' button, nav links) for mobile usability.
- Exit criteria:
  - All critical interactions (chart, toggles, buttons) work in mobile viewport, small tap targets are functional (or identified as risks).

### Related Content & Recovery

- Objective: Validate related series (if visible) and error recovery (e.g., invalid date input).
- Target pages: index.html
- Key checks:
  - Scroll to related series (check links), enter invalid date (e.g., '2026-05-00') in 'To' input (check error handling), refresh page (verify state recovery).
- Exit criteria:
  - Related series links are clickable, invalid date shows error, page refreshes to original state.

## Prescan Summary

### Unemployment Rate (UNRATE) | FRED | St. Louis Fed

- Page: `index.html`
- Headings: Unemployment Rate (UNRATE), Chart, Notes, Release Tables, Related Data and Content, Data Suggestions Based On Your Search, Content Suggestions, Other Formats, Related Categories, Releases
- Interactables: `65` buttons, `73` links, `14` inputs
- Notable controls:
  - clickable:button:Close maintenance notice
  - clickable:a:Skip to main content
  - clickable:a:FRED home
  - typeable:input:Search FRED Data
  - clickable:button:Search
  - clickable:button:Explore FRED apps
  - clickable:button:Open account menu
  - clickable:a:RELEASE CALENDAR

