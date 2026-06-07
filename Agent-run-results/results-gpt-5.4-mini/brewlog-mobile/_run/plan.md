# UXAgent Exploration Plan

## Goal

Explore the Brewlog mobile fixture end-to-end with emphasis on the primary brew log and data visualization experience, then validate adjacent navigation, entry/add flows, and mobile usability issues on the compact phone layout.

## Plan Summary

Start on the Today dashboard and inspect how brew summaries, individual brew cards, and the + Log entry point behave. Then move through the bottom tabs to validate the adjacent Stats and Beans views, checking whether charts/summary modules update coherently and whether navigation stays usable on mobile. Finish by repeating the critical interactions in a mobile viewport and stress-testing the known small tap target on + Log for touch accessibility.

## Coverage Targets

- pages: `visit the single known HTML page (index.html) and explore all in-page states reachable from it`
- features: `exercise the Today dashboard, + Log/Add flow, Stats visualization modules, Beans section, and the bottom tab navigation`
- mobile: `repeat the main navigation and entry checks on the mobile viewport, with explicit attention to the small + Log target and compact layout behavior`

## Planned Phases

### Baseline dashboard review

- Objective: Validate the default Today screen, hierarchy, and readability of the brew summary cards and day grouping.
- Target pages: index.html
- Key checks:
  - Confirm the default landing state shows Today's brews, the day summary card, and grouped TODAY/YESTERDAY entries.
  - Inspect whether brew cards present time, method, origin, dose/yield, brew time, score, and tasting notes without truncation on desktop and mobile widths.
  - Check whether any brew card or summary element is interactive or purely informational.
- Exit criteria:
  - Default screen behavior is understood in both viewports.
  - At least one TODAY and one YESTERDAY brew card have been visually inspected for density, wrapping, and clarity.

### Primary add/log entry path

- Objective: Exercise the main brew-logging entry point and verify whether it opens a usable input flow or panel.
- Target pages: index.html
- Key checks:
  - Click/tap + Log from the header and observe the resulting state.
  - Confirm whether the Add tab and + Log button lead to the same destination or different entry points.
  - If an input form appears, scan for field completeness, defaults, validation behavior, and ability to dismiss/cancel.
- Exit criteria:
  - The + Log/Add flow has been opened and its interaction model identified.
  - Any visible form or panel has been checked for basic affordance and exit behavior.

### Stats visualization validation

- Objective: Validate the data-visualization section for completeness, legibility, and coherence of metrics.
- Target pages: index.html
- Key checks:
  - Use the Stats tab to reach the analytics view and confirm the presence of 'Score over time', 'Method mix', 'Top tasting notes', and 'Most-used beans'.
  - Check chart labels, legends, summary values, and whether the visualizations remain legible at narrow widths.
  - Look for any filtering, drill-down, or hover/tap affordances on charts or metric chips if present.
- Exit criteria:
  - All visible Stats headings/modules have been visited.
  - No obvious clipping, overlap, or unreadable chart text remains unexamined.

### Beans library and adjacent navigation

- Objective: Inspect the Beans area and verify bottom-tab navigation consistency across sections.
- Target pages: index.html
- Key checks:
  - Open Beans via the bottom tab and inspect the beans list/detail presentation, if present.
  - Validate that switching between Today, Stats, and Beans preserves a stable layout and obvious active-state feedback.
  - Check whether beans-related content aligns with the 'Most-used beans' analytics context.
- Exit criteria:
  - Beans tab content has been visited or confirmed absent.
  - Navigation transitions among tabs are predictable and visually clear.

### Mobile usability and touch-risk review

- Objective: Repeat the key interactions in a mobile viewport and assess touch-target and cramped-layout risks.
- Target pages: index.html
- Key checks:
  - Re-run the primary path on the mobile viewport: open Today, tap + Log, switch to Stats, and switch to Beans.
  - Pay special attention to the small + Log target and the bottom tab bar for comfortable touch size and spacing.
  - Check whether text, cards, and charts remain edge-to-edge and readable without accidental overlap under the mobile fixture constraints.
- Exit criteria:
  - Critical interactions have been confirmed in mobile viewport.
  - The known small tap target issue has been verified and any additional mobile-specific usability issues are noted.

## Prescan Summary

### Brewlog — mobile fixture

- Page: `index.html`
- Headings: TODAY, YESTERDAY, Log a brew, Stats, Score over time, Method mix, Top tasting notes, Most-used beans, Beans
- Interactables: `24` buttons, `0` links, `29` inputs
- Notable controls:
  - clickable:button:+ Log
  - clickable:button:☕ Today
  - clickable:button:+ Add
  - clickable:button:📊 Stats
  - clickable:button:🫘 Beans

