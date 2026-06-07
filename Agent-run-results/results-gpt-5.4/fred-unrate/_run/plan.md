# UXAgent Exploration Plan

## Goal

Exhaustively explore the single-page fred-unrate experience, prioritizing the core chart-analysis workflow and then validating adjacent discovery, metadata, utility, and responsive behaviors that are visibly present on index.html.

## Plan Summary

The run should focus on index.html as a dense single-page data-visualization experience rather than expecting separate routed pages. Start by stabilizing the page state and validating the primary series-reading flow: chart visibility, time-range controls, date inputs, chart/table switch, and any chart interactions such as hover feedback. Then probe adjacent controls and content sections already visible in the prescan—Edit Graph, Download, search, suggestions, notes, release tables, related content, and newsletter—before repeating critical checks on mobile where the prescan already flagged several undersized tap targets.

## Coverage Targets

- pages: `Fully cover the only known HTML page, index.html, including above-the-fold chart controls and the lower supporting sections named in the prescan.`
- features: `Exercise nearly all visible primary controls on index.html: maintenance notice dismissal, chart hover if supported, 1Y/5Y/10Y/Max, From/To inputs, Chart/data table tabs, Edit Graph, Download, search, sampled related-content links, and newsletter input if actionable.`
- mobile: `Repeat the baseline and primary chart workflow on mobile, plus inspect all prescan-flagged small tap targets and any responsive reflow affecting chart readability or control reachability.`

## Planned Phases

### Baseline state and page framing

- Objective: Establish a clean starting state and confirm the main series page structure before deeper interaction.
- Target pages: index.html
- Key checks:
  - Record whether the maintenance notice obscures core content and whether closing it works cleanly without layout jump or focus loss
  - Confirm the main identity and information hierarchy: series title, latest observation, updated timestamp, next release date, units, and frequency
  - Verify the initial chart is visible and legible on desktop, including line, axis labels, and recession shading note
  - Confirm the presence and apparent state of the primary controls: time-range links, date inputs, Edit Graph, Download, Chart tab, View as data table tab
- Exit criteria:
  - A stable desktop baseline is established with and without the maintenance notice if dismissible
  - The explorer can clearly identify the default chart state and all primary controls to be exercised next

### Primary chart exploration workflow

- Objective: Validate the main user flow of reading and manipulating the unemployment chart.
- Target pages: index.html
- Key checks:
  - Exercise each visible time-range control (1Y, 5Y, 10Y, Max) and verify that the chart extent and/or displayed date range visibly changes
  - Interact with the chart directly to detect hover states or tooltips and confirm the data feedback is understandable
  - Toggle from Chart to View as data table and back, checking whether the representation changes cleanly and preserves context
  - Edit the From and To fields with realistic ranges and check for update behavior, formatting constraints, and recovery from invalid or reversed ranges
  - Observe whether units/frequency text remains consistent with the visualization after state changes
- Exit criteria:
  - All primary chart controls have been exercised at least once
  - There is clear evidence of how the chart and table states respond to range/date changes, including any failure or recovery behavior

### Advanced graph controls and utilities

- Objective: Probe the secondary workflows surrounding chart customization and export/share affordances.
- Target pages: index.html
- Key checks:
  - Open or activate Edit Graph and inspect any in-page editor state that appears
  - If accessible, probe the visible EDIT LINE, ADD LINE, and FORMAT controls for panel switching, affordance clarity, and reversibility
  - Check visible supporting inputs such as search-for-data and formula fields only if they are exposed by the editor state, noting clarity and feedback
  - Test Download and inspect whether it opens a menu, panel, or performs another visible action
  - Check visible graph-adjacent actions such as Fullscreen or Share Graph if they are interactable in the current build
- Exit criteria:
  - The run has determined whether advanced graph controls are functional, partially functional, or merely presentational in this clone
  - At least one utility/export/customization path has been exercised and its feedback quality documented

### Supporting content and adjacent discovery flows

- Objective: Assess the usability of the non-chart content that helps users interpret or continue from the series page.
- Target pages: index.html
- Key checks:
  - Review Notes, source attribution, release information, and metadata blocks for readability, scannability, and proximity to the chart
  - Inspect Release Tables, Related Data and Content, Data Suggestions Based On Your Search, Content Suggestions, Other Formats, Related Categories, Releases, and Tags sections for hierarchy and usefulness
  - Try a small sample of visible links or cards from related/discovery sections to determine whether they navigate, anchor, or behave as placeholders
  - Exercise the global search field and button with a relevant term such as unemployment, then observe whether the clone provides any feedback or navigation
  - Inspect the newsletter email field/form for input clarity and submission affordance if present
- Exit criteria:
  - The run has sampled each major supporting section and characterized whether it is informative, interactive, or placeholder-only
  - At least one discovery/search path and one footer/form-style interaction have been attempted

### Responsive and touch-priority validation

- Objective: Repeat the most important workflows on mobile and verify responsiveness, touch usability, and content ordering.
- Target pages: index.html
- Key checks:
  - Check the mobile presentation of the maintenance notice, header, search, app/account controls, and top navigation
  - Repeat critical flow checks on mobile: chart visibility, range controls, date inputs, Chart vs data table toggle, Edit Graph, and Download
  - Assess whether the chart remains usable on small screens, including axis legibility, horizontal overflow, clipping, and touch interaction feasibility
  - Verify the order and spacing of metadata, notes, and related sections after responsive reflow
  - Pay special attention to prescan-flagged small tap targets such as maintenance close, skip link, search/app/account buttons, and top-nav items
- Exit criteria:
  - A mobile pass has covered the core chart workflow and the major header/navigation controls
  - The run has concrete evidence about whether mobile issues are limited to touch-target sizing or extend to layout and interaction breakdowns

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

