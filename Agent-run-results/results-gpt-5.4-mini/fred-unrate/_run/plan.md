# UXAgent Exploration Plan

## Goal

Validate the primary UNRATE series-detail experience end to end: chart exploration, time-range controls, metadata accuracy, download-related actions, and responsive/mobile usability on the single-page FRED clone.

## Plan Summary

Start with the main series page and verify the core data-visualization flow: chart rendering, hover/inspection behavior, and the time-range/date controls. Then exercise adjacent controls around the chart and metadata block, including tab switches, edit/download actions, and related informational links, while watching for any broken state changes or regressions. Finish with a mobile viewport pass focused on tap target quality, layout stability, and whether the key chart/control interactions remain usable at smaller widths.

## Coverage Targets

- pages: `visit all known HTML pages (single-page site: index.html) and confirm both desktop and mobile states`
- features: `exercise most visible controls on the series page, prioritizing chart hover, range toggles, date inputs, chart/table switch, edit/download actions, and key metadata links`
- mobile: `repeat the primary chart-and-controls workflow on a mobile viewport and explicitly assess the low-confidence tap targets flagged in prescan`

## Planned Phases

### Baseline page and chart rendering

- Objective: Confirm the UNRATE page loads correctly and the core series presentation is visually and semantically intact before interacting.
- Target pages: index.html
- Key checks:
  - Verify the title, breadcrumb trail, series name, observations summary, and metadata blocks are visible and coherent.
  - Confirm the chart renders with recession shading and the expected date span from 1948-01-01 to 2026-04-01.
  - Check that the chart legend/title, axis labels, and latest observation summary align with the page text.
  - Dismiss or account for the maintenance notice so it does not block primary controls.
- Exit criteria:
  - Primary series page is fully loaded with no console or network errors.
  - Chart and summary metadata are visible and consistent with the prescan.
  - Any blocking overlay has been dismissed or proven non-blocking.

### Chart interaction and range controls

- Objective: Validate the main analytical workflow: hovering the chart, switching ranges, and adjusting the displayed date window.
- Target pages: index.html
- Key checks:
  - Hover multiple chart positions, including near recent data and historical peaks, to verify tooltip behavior and readable values.
  - Click each visible time-range toggle (1Y, 5Y, 10Y, Max) and confirm the chart updates appropriately.
  - Change the From and To inputs to a narrower range and verify the chart and/or summary respond without error.
  - Check that the units and frequency labels remain stable when the date window changes.
- Exit criteria:
  - All visible range toggles have been exercised at least once.
  - Date inputs have been changed with a successful update or clear validation response.
  - Tooltip/hover behavior has been observed at least in two distinct chart regions.

### View modes and export/edit actions

- Objective: Probe the adjacent controls around the chart for state changes and potential broken behaviors.
- Target pages: index.html
- Key checks:
  - Switch from Chart to View as data table and confirm content changes or table state appears.
  - Return to Chart and verify the chart state is restored correctly.
  - Open Edit Graph and inspect whether any editing controls/panels appear as expected.
  - Activate Download and look for export options, menu behavior, or blocked interactions.
  - If visible in the chart area, check whether fullscreen/share-style actions are present and behave consistently.
- Exit criteria:
  - Chart/table toggle has been exercised in both directions.
  - Edit/Download actions have been opened or attempted at least once.
  - No broken rendering or persistent UI corruption appears after toggling views.

### Metadata, references, and related content

- Objective: Validate the informational side of the series page and ensure links or reference content do not break navigation.
- Target pages: index.html
- Key checks:
  - Inspect the Notes section for completeness and readability.
  - Interact with the source/release-related links or labels, including the source attribution and next release date link.
  - Check any related-series or suggestion areas visible on the page for presence and basic link behavior.
  - Verify that breadcrumb/navigation links are readable and do not produce obvious dead ends within the clone.
- Exit criteria:
  - Notes and metadata sections have been reviewed.
  - At least one source or release-related link has been attempted.
  - Any related-content areas visible in the page have been checked for basic functionality.

### Mobile responsiveness and tap-target validation

- Objective: Repeat the most important flow on a mobile viewport, with emphasis on layout, chart usability, and flagged touch targets.
- Target pages: index.html
- Key checks:
  - Re-open the page in mobile viewport and verify the main title, chart, and key controls remain accessible.
  - Check that the chart does not become unusable or clipped at small widths.
  - Test the most important controls again on mobile: range toggles, Chart/data table switch, and the maintenance notice close button.
  - Review tap target sizing and spacing for the top nav, maintenance banner, and primary chart controls.
- Exit criteria:
  - Primary chart flow has been repeated on mobile successfully.
  - Flagged small tap targets have been evaluated in context.
  - No severe mobile layout breakage prevents completing the primary interaction path.

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

