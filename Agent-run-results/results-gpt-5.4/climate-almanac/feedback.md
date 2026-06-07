# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full climate-almanac system, prioritizing the primary data visualization flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: True

## Summary

The explorer exposes rich climate-comparison controls, but the experience is undermined by inconsistent state feedback and several actions that feel inert or misleading. The biggest UX risks are that the app contradicts its own overlay limit, keeps stale titles/subtitles/sources after changes, and relies on hover-centric chart inspection that does not translate to mobile. Mobile usability is additionally weakened by very small tap targets for core tasks like selecting variables and removing layers.

## Issues (8)

### [HIGH] the-app-states-add-up-to — goal completion
- **Page**: `index.html / VARIABLES panel / variable checkboxes`
- **Problem**: The app states 'Add up to four variables to overlay' but still allows a fifth variable to be selected, with no blocking or explanatory feedback.
- **Evidence**: Session memory and chunks note that after selecting Arctic sea-ice extent and later ENSO index (ONI), the LAYERS list showed five entries even though the left rail still said 'Add up to four variables to overlay.'
- **Suggested fix**: Enforce the four-series limit at selection time, or clearly update the instruction if more than four are intentionally supported. If blocked, explain why and show how to remove an existing layer first.

### [HIGH] key-summary-elements-become-desynchronized-from — feedback
- **Page**: `index.html / chart heading, subtitle, SOURCES list`
- **Problem**: Key summary elements become desynchronized from the actual chart state, leaving titles, subtitles, and source lists stale after user changes.
- **Evidence**: Across chunks 01-06, 07-12, 19-24, 31-36, and 37-42, the chart title kept reading 'Surface temperature anomaly & Atmospheric CO₂' after other series were added or removed; the subtitle still showed 'Global · 3-year running mean · 1900–2024' even when REGION changed to Northern Hemisphere; sources sometimes included 'NSIDC Sea Ice Index' when selected layers did not match.
- **Suggested fix**: Regenerate the chart title, subtitle, and source list from the active state on every change. If only a subset can be summarized in the title, add an explicit '+2 more' pattern instead of showing outdated labels.

### [HIGH] the-core-inspection-workflow-appears-hover — mobile usability
- **Page**: `index.html / chart area and Inspector panel on mobile`
- **Problem**: The core inspection workflow appears hover-dependent, with no clear touch alternative on mobile.
- **Evidence**: Final mobile observation still says 'hover the chart to inspect a year' and the Inspector says 'Hover the chart to see values for a year.' Recent mobile steps found no visible alternative interaction or state change for chart inspection, and step 46 was explicitly probing this gap.
- **Suggested fix**: Support tap, drag, or a visible scrubber for year inspection on touch devices, and update the instructional copy so it reflects the actual mobile interaction.

### [MEDIUM] top-navigation-items-look-like-real — navigation
- **Page**: `index.html / top navigation`
- **Problem**: Top navigation items look like real destinations but behave like placeholders with no visible result.
- **Evidence**: Chunks 01-06 and 13-18 show that clicking 'Datasets', 'Stories', 'Methods', and 'About' only changed the URL to a hash or produced no visible content change; the page remained on the Explorer view.
- **Suggested fix**: Either make these items navigate to real destinations/panels or restyle them as disabled/coming soon. If they open inline content, provide immediate visible feedback and clear state change.

### [MEDIUM] several-critical-controls-have-very-small — forms
- **Page**: `index.html / VARIABLES checkboxes, Y-AXIS radios, LAYERS remove buttons`
- **Problem**: Several critical controls have very small tap targets, including 13x13px variable checkboxes and radio buttons, plus 20x17px remove buttons.
- **Evidence**: Layout warnings in the final observation flag the variable checkboxes and Y-axis radios as 13x13px and the remove × controls as 20x17px. Multiple chunks explicitly note these controls were hard to use on mobile.
- **Suggested fix**: Make the full row tappable for variable and mode selection, and enlarge remove targets to meet mobile guidance. Preserve clear pressed/selected states so larger hit areas still feel precise.

### [MEDIUM] several-prominent-actions-provide-little-or — feedback
- **Page**: `index.html / header action buttons and chart toolbar`
- **Problem**: Several prominent actions provide little or no visible response, so they can feel broken or unavailable.
- **Evidence**: Chunk 07-12 reports no visible confirmation for 'Share view' or 'Download .csv'. Recent steps 47 and 48 show 'Reset zoom' and '+ Note' on mobile produced no obvious text or URL change; the note flow showed no dialog, toast, or editor.
- **Suggested fix**: Show clear success/error feedback for each action: toast confirmations, disabled states when unavailable, inline status text, or a visible note editor/modal when annotation is invoked.

### [MEDIUM] the-dual-axis-multi-series-presentation — clarity
- **Page**: `index.html / chart axes, legend, and title`
- **Problem**: The dual-axis/multi-series presentation is hard to parse because several absolute-unit series are overlaid while the axes are minimally explained and the title does not reflect all active layers.
- **Evidence**: Chunk 13-18 notes that after switching back to Dual axes, the y-axis showed two numeric ranges at once while legend units spanned four variables, and the title still referenced only two series. Final mobile observation shows four active layers with mixed units and a stale heading.
- **Suggested fix**: Strengthen axis labeling and series-to-axis mapping, or simplify the comparison mode when many variables are active. Consider limiting dual-axis overlays to two compatible series and nudging users toward normalized mode for larger comparisons.

### [LOW] some-form-fields-appear-to-lack — accessibility
- **Page**: `index.html / REGION and SMOOTHING selects`
- **Problem**: Some form fields appear to lack proper labels, despite visible section headings nearby.
- **Evidence**: Final observation includes layout warnings for missing input labels on the REGION and SMOOTHING selects ('A form field has no label, aria-label, or placeholder').
- **Suggested fix**: Associate explicit programmatic labels with each select, matching the visible headings like 'REGION' and 'SMOOTHING'.
