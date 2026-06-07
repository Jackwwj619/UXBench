# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full fred-unrate system, prioritizing the primary data visualization flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

The UNRATE page’s core chart and data-table flow are present, but the experience is weakened by several dead-end links and a crowded mobile chrome that is hard to tap comfortably. The biggest issues are weak or absent feedback for source/metadata links, placeholder-style navigation that only changes the URL hash, and a mobile edit-graph overlay that appears difficult to dismiss reliably. I also did not observe usable hover inspection feedback on the chart, so the primary data-visualization interaction remains unverified and potentially fragile.

## Issues (8)

### [HIGH] the-mobile-overlay-does-not-reliably — error recovery
- **Page**: `index.html / Edit Graph drawer / Close Edit Graph`
- **Problem**: The mobile overlay does not reliably dismiss, leaving the page stuck in the add-series state and blocking normal chart interaction.
- **Evidence**: In the recent trajectory, clicking the mobile 'Close Edit Graph' control produced no visible change: URL, visible text, and screenshot state all remained the same, and the reflection says the overlay may not be dismissing from this state. Earlier, the open drawer also intercepted pointer events, blocking clicks on footer links like Legal and Privacy Notice & Policy.
- **Suggested fix**: Make the close control visibly and consistently dismiss the drawer, add an obvious fallback close action, and ensure the underlying chart regains focus and pointer access immediately after closing.

### [HIGH] i-could-not-observe-any-usable — goal completion
- **Page**: `index.html / main chart`
- **Problem**: I could not observe any usable hover feedback on the main chart, so point inspection remains unconfirmed and may be inaccessible.
- **Evidence**: Across multiple steps, hover attempts on the chart did not produce a tooltip, crosshair, or value readout. The session memory notes 'Hover on the main chart failed to target the visualization element,' and no readable hover feedback was observed in the chart view.
- **Suggested fix**: Ensure the plot area has a clear hover/cursor affordance and that tooltips appear reliably on both desktop and mobile pointer interactions, with an accessible fallback for touch.

### [HIGH] several-prominent-metadata-and-footer-links — trust
- **Page**: `index.html / U.S. Bureau of Labor Statistics / Legal / Next Release Date`
- **Problem**: Several prominent metadata and footer links behave like placeholders, changing nothing meaningful or only appending a hash, which undermines trust in the page’s references.
- **Evidence**: Clicking 'U.S. Bureau of Labor Statistics' on mobile produced no URL/hash change and no visible feedback. 'Legal' changed the URL only from `index.html` to `index.html#` with no visible page change. The session also records similar hash-only or no-op behavior for 'Next Release Date: Jun 5, 2026' and the series recommendation links.
- **Suggested fix**: Replace placeholder hashes with real destinations or disable nonfunctional links with clear labeling so users can tell which items are informational versus navigational.

### [MEDIUM] related-content-links-appear-clickable-but — navigation
- **Page**: `index.html / Related Data and Content section`
- **Problem**: Related-content links appear clickable but do not take users anywhere useful, creating weak navigation scent.
- **Evidence**: Clicking 'All Employees, Total Nonfarm' and 'Real Gross Domestic Product' changed the URL only to a hash fragment (`index.html#`) or produced no meaningful page change. The observations explicitly describe these as placeholder-like or dead-end affordances.
- **Suggested fix**: Either route these links to real series pages or visually distinguish them as non-navigational suggestions with explanatory labels.

### [MEDIUM] the-date-range-inputs-are-present — forms
- **Page**: `index.html / From / To inputs / time-range controls`
- **Problem**: The date range inputs are present, but the page shows no evidence of clear apply/confirmation feedback for range changes, and related actions were not meaningfully validated.
- **Evidence**: The page exposes From/To inputs and range toggles, but the trajectory includes an 'Apply Formula' control that was not visible/clickable, and many actions around chart/state changes produced no visible response. The session also notes the chart/time-range area is functional in layout but its inspection behavior and state-change feedback remain unverified.
- **Suggested fix**: Provide explicit confirmation when a date range is applied and show an obvious loading/updated-state indication for the chart.

### [MEDIUM] many-mobile-tap-targets-are-below — mobile usability
- **Page**: `index.html / top header / breadcrumbs`
- **Problem**: Many mobile tap targets are below the recommended 44px guidance, making the header and breadcrumbs feel cramped and error-prone.
- **Evidence**: Layout warnings flag multiple small targets on mobile: Search (38x38), apps/account icons (38x38), Home/Categories/breadcrumb items around 22px high, the close notice button at 36x36, and several nav items under 44px. The session summary also explicitly notes touch-target warnings for the top nav.
- **Suggested fix**: Increase hit areas and spacing for header icons, breadcrumb links, and small utility actions so they meet mobile touch standards without requiring precision taps.

### [MEDIUM] some-compact-header-controls-do-give — feedback
- **Page**: `index.html / top navigation / NEWS / RELEASE CALENDAR / FRED API`
- **Problem**: Some compact header controls do give feedback, but the feedback style is inconsistent across actions, which makes the page feel uneven to use.
- **Evidence**: NEWS and RELEASE CALENDAR both triggered explicit in-page toasts ('News opened', 'Release calendar opened'), while FRED API produced only a vague indication and several other clicked items showed no meaningful destination change. The inconsistencies are recorded in multiple trajectory chunks.
- **Suggested fix**: Standardize action feedback patterns: show a toast or clear state change for action buttons, and use unmistakable navigation transitions for links that leave the page.

### [LOW] the-page-is-visually-crowded-on — visual hierarchy
- **Page**: `index.html / mobile layout`
- **Problem**: The page is visually crowded on mobile, with a tall header stack above the chart that competes for attention.
- **Evidence**: The mobile observation shows stacked breadcrumb navigation, series title, observation summary, metadata blocks, range controls, and buttons before the chart. The session repeatedly notes a persistent maintenance banner earlier in the flow and dense header/body transitions.
- **Suggested fix**: Tighten the vertical spacing and reduce header clutter on small screens so the chart becomes the dominant element sooner.
