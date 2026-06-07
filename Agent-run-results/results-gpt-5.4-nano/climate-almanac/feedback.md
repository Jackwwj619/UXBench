# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full climate-almanac system, prioritizing the primary data visualization flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

Climate Almanac presents a clear 3-panel explorer layout (variable layers → center chart → right Inspector/Annotations), but the core “hover/tap the chart to inspect a year” loop appears unreliable, especially in the hover path. On mobile, many critical controls (layer checkboxes/radios and small close icons) have very small hit targets and some select inputs appear to lack accessible labels. Share and Download .csv provide little/no user feedback when tapped, making it hard to trust that actions succeeded.

## Issues (5)

### [HIGH] the-promised-hover-to-inspect-interaction — feedback
- **Page**: `index.html / center chart panel; right rail “Inspector — Hover the chart to see values for a year.” plus repeated hover timeouts for ux-chart`
- **Problem**: The promised hover-to-inspect interaction does not reliably trigger; hover attempts time out and the Inspector remains on the generic prompt rather than showing hovered-year values.
- **Evidence**: Multiple desktop hover attempts against the chart fail (e.g., “Hover failed for ux-chart: Locator.hover: Timeout 4000ms exceeded” waiting for locator("[data-uxagent-id=\"ux-chart\"]")). After hover/click attempts, Inspector text still shows the placeholder “Hover the chart to see values for a year.” rather than a specific year/values (noted repeatedly in steps-07-12, 13-18, 19-24, 25-30).
- **Suggested fix**: Ensure the chart interaction surface is consistently focusable/hoverable (or provide a dedicated, clearly targetable year-selection mechanism such as an on-chart crosshair/slider). Also add strong on-screen confirmation when a year is selected (e.g., prominent year label in Inspector that updates immediately).

### [HIGH] mobile-tap-targets-for-variable-toggles — mobile usability
- **Page**: `index.html mobile viewport; VARIABLES list; targets ux-3, ux-4, ux-5, ux-6, ux-7, ux-8`
- **Problem**: Mobile tap targets for variable toggles are extremely small (around 13x13px), increasing mis-tap risk and making layer selection hard.
- **Evidence**: Recorded multiple layout warnings: “Tap target is 13x13px, below the 44px mobile guidance” for variable checkboxes such as “Surface temperature anomaly” (ux-3), “Precipitation” (ux-4), “Atmospheric CO₂” (ux-5), “Global mean sea level” (ux-6), “Arctic sea-ice extent” (ux-7), and “ENSO index (ONI)” (ux-8).
- **Suggested fix**: Increase checkbox/radio control hit area to meet or exceed 44px (e.g., larger clickable container around each option), add spacing between controls, and ensure selected states are visually obvious (not just checkbox fill).

### [MEDIUM] select-inputs-appear-to-be-missing — accessibility
- **Page**: `index.html mobile viewport; REGION (ux-9) and SMOOTHING (ux-10) select fields`
- **Problem**: Select inputs appear to be missing accessible labels/aria-label/placeholder, which harms screen-reader usability and also reduces clarity.
- **Evidence**: Layout warnings show “missing_input_label” for the Region select (ux-9) and Smoothing select (ux-10): “A form field has no label, aria-label, or placeholder.”
- **Suggested fix**: Add explicit visible labels and accessible names (aria-label/label elements) for REGION and SMOOTHING selects, and ensure the currently selected value is announced clearly.

### [MEDIUM] share-and-download-csv-appear-to — affordance
- **Page**: `index.html top bar buttons: ux-1 (Share view) and ux-2 (Download .csv); plus recent reload check in agentic-77-reload-mobile.png`
- **Problem**: Share and Download .csv appear to fail silently or provide no obvious success feedback, creating a trust gap.
- **Evidence**: On mobile, tapping “Share view” produced no detectable URL/state change and no modal/overlay or success message (“Share view and Download .csv controls remain visible…”, and “no obvious URL or visible-text change detected”). Clicking “Download .csv” also produced no visible change and no browser-level download indicators were observed after reload (recent trajectory: reload after download attempt showed no evidence of download behavior).
- **Suggested fix**: Provide immediate confirmation: loading spinner + “download started” toast, or a visible dialog summarizing/share URL. For Share view, show a modal with the generated link and a copy button.

### [LOW] annotation-dismissal-works-visually-but-the — error recovery
- **Page**: `index.html Annotations panel; dismissal control “×” (ux-13/ux-30) and Inspector placeholder text`
- **Problem**: Annotation dismissal works visually, but the overall system relies heavily on hover for year-value inspection; when year inspection fails, notes may be present without providing actionable value context.
- **Evidence**: The agent successfully clicked the note dismissal ‘×’ and the layout remained stable (“Clicked annotation dismissal control… The action changed visible content… suggesting the pin/annotation list can be updated”). However, even with pinned notes visible, the Inspector frequently remains on the generic “Hover the chart to see values for a year.” placeholder in hover-failure scenarios.
- **Suggested fix**: When annotations are pinned/selected, also populate the Inspector with the relevant year/value for that note (or provide a “jump to year” button in each annotation).
