# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full pulsegrid system, prioritizing the primary dashboard flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

PulseGrid’s core cross-page monitoring flow is coherent on desktop: Overview, Generators, Forecast, and Alarms keep a consistent shell and generally preserve orientation. The biggest UX problems are trust and actionability: several prominent controls look interactive but do nothing or show mismatched state, especially in Forecast and Alarms. Mobile coverage also exposed meaningful usability debt—horizontal overflow, cramped tap targets, and unlabeled controls—while some features remain untested, so this critique focuses on the most evidenced operator-facing issues.

## Issues (8)

### [HIGH] multiple-controls-show-an-active-selection — trust
- **Page**: `alarms.html filters; forecast.html horizon selector`
- **Problem**: Multiple controls show an active selection without the underlying content changing, creating a strong mismatch between UI state and displayed data.
- **Evidence**: On alarms.html, selecting 'Critical only' still left major and minor rows visible, and selecting status/time filters also showed mixed results with no obvious narrowing ('Last 1h' still showed rows from 09:55 PT and 10:22 PT; selecting status showed mixed OPEN/ACKED/etc.). On forecast.html, changing the horizon to 'Hour-ahead' left the page framed as 'Next 24 hours · MW' with unchanged visible chart/table content.
- **Suggested fix**: Only show a control as selected when the dataset has actually updated. Add immediate confirmation of scope changes near the results area, such as updated counts, headings, or a 'showing X critical alarms in last 1h' summary.

### [HIGH] several-prominent-controls-present-as-real — affordance
- **Page**: `index.html/generators.html/forecast.html/alarms.html shared nav and row actions`
- **Problem**: Several prominent controls present as real destinations or next steps but do not respond meaningfully, making the product feel unfinished and misleading.
- **Evidence**: The left-nav '🌐 Topology' and '📜 Events' items used href '#' and clicking them caused no meaningful content change on both desktop and mobile. The alert bell did not open a panel. 'Details →' on generators and 'Open →' on alarms also produced no URL change, dialog, or visible feedback.
- **Suggested fix**: Remove placeholder actions from production-facing UI, mark them clearly as unavailable, or provide lightweight interim feedback. For row actions, open an actual detail drawer/page or disable the control until the detail experience exists.

### [HIGH] dense-data-pages-overflow-horizontally-on — mobile usability
- **Page**: `generators.html mobile; forecast.html mobile; screenshot /Users/timchef/UXBench/results-gpt-5.4/pulsegrid/_run/screenshots/agentic-80-type_text-mobile.png`
- **Problem**: Dense data pages overflow horizontally on mobile, so key columns and actions extend off-screen and require extra panning to understand a single row.
- **Evidence**: Mobile layout warnings show generators.html width 505px on a 390px viewport and forecast.html width 447px on a 390px viewport. In the final mobile generators state, the table still extends off-screen even after narrowing to one result; the 'Details →' action is positioned far to the right (bbox x=764), outside the visible card width.
- **Suggested fix**: Reformat dense tables into stacked mobile cards or priority columns with expandable details. Keep critical status, unit name, and primary action visible without horizontal scrolling.

### [MEDIUM] some-controls-provide-clear-feedback-while — feedback
- **Page**: `index.html top mode tabs and chart range; forecast.html range chips`
- **Problem**: Some controls provide clear feedback while similar adjacent controls appear inert, making the dashboard feel inconsistent and unpredictable.
- **Evidence**: On index.html, '24h' visibly updated the chart and active state, but 'Replay' and 'Plan' produced no detectable change. On forecast.html, '12h' and '7d' produced no detectable change while '24h' appeared to remain the active/default framing.
- **Suggested fix**: Standardize control behavior across tabs and chips: every stateful control should visibly update the content, show an active style, and, if no state change is available, be disabled rather than clickable.

### [MEDIUM] counts-are-inconsistent-across-linked-views — clarity
- **Page**: `index.html generator summary CTA to generators.html`
- **Problem**: Counts are inconsistent across linked views, so the destination can feel like the wrong dataset.
- **Evidence**: The dashboard link reads 'View all 312 →' from the generator summary, but generators.html then headlines 'Generators 38 of 38 units.' This continuity mismatch was explicitly noted during the monitored flow.
- **Suggested fix**: Explain the scope transition at the destination, such as '38 dispatchable units shown from 312 total assets,' or align the source CTA wording with what the destination actually contains.

### [MEDIUM] zero-result-states-are-shown-without — error recovery
- **Page**: `generators.html filters and search state`
- **Problem**: Zero-result states are shown without enough explanation of which active filters caused the empty table.
- **Evidence**: On generators.html, combining search/status/fuel/zone filters repeatedly produced '0 of 38 units' with only blank table headers. The search term 'COL-3' persisted while switching to 'Maintenance 3', and later status/fuel/zone combinations also emptied the list without explanatory messaging. Recovery was possible via 'All 38', but the cause of the dead end was not clearly surfaced.
- **Suggested fix**: Add an explicit no-results message listing the active filters/search terms and offer one-click recovery actions like 'Clear search' or 'Reset filters'.

### [MEDIUM] several-form-controls-lack-proper-labels — accessibility
- **Page**: `index.html, forecast.html, alarms.html, generators.html form controls`
- **Problem**: Several form controls lack proper labels, so their purpose is not always programmatically clear and can also be ambiguous in compact layouts.
- **Evidence**: Missing-input-label warnings were recorded for the balancing-area selector on index.html, the forecast horizon selector on forecast.html, and filter controls on alarms.html and generators.html. The final mobile generators observation also shows unlabeled selects for fuel and zone, plus an unlabeled checkbox.
- **Suggested fix**: Provide explicit labels or aria-labels for every select and checkbox, and ensure the visible UI keeps those labels adjacent to the control in compact layouts.

### [MEDIUM] many-mobile-targets-are-below-recommended — mobile usability
- **Page**: `mobile observations across generators.html, alarms.html, forecast.html`
- **Problem**: Many mobile targets are below recommended touch size, especially status pills, nav items, the theme button, checkboxes, and row actions.
- **Evidence**: Recorded mobile warnings include 27px-tall status pills on generators, 36x36 theme buttons, 31px-tall selects, 43px nav items, a 13x13 checkbox, and a 57x36 'Details →' control. The alarms mobile header was also described as dense, with the bulk action compressed beside the timestamp and theme toggle.
- **Suggested fix**: Increase hit areas to at least 44px, add spacing between adjacent controls, and simplify crowded mobile headers by moving secondary actions into an overflow menu.
