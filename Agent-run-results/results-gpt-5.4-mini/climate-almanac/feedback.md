# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full climate-almanac system, prioritizing the primary data visualization flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: True

## Summary

The climate explorer’s core data-visualization flow is mostly understandable, and several state-changing controls give immediate visual feedback on mobile. However, the interface still has a few trust and clarity gaps: some top-level actions behave like inert placeholders, the chart hover path remains unverified/fragile, and touch affordances are too small in several places. The mobile layout is improved enough to show the stacked panels, but compact controls and unlabeled selects still create friction for phone use.

## Issues (7)

### [MEDIUM] some-prominent-actions-appear-to-do — feedback
- **Page**: `index.html: Share view / Download .csv`
- **Problem**: Some prominent actions appear to do nothing, which makes the interface feel unresponsive and undermines confidence in the available controls.
- **Evidence**: In the trajectory, clicking "Share view" produced no visible-text, URL, or dialog change, and "Download .csv" also produced no visible-text or URL change; the notes say these actions may be inert or silently handled.
- **Suggested fix**: Provide immediate visible confirmation for these actions, such as a toast, share sheet, copied-link state, or a download prompt/status message.

### [HIGH] two-compact-select-controls-lack-labels — forms
- **Page**: `index.html: REGION / SMOOTHING selects`
- **Problem**: Two compact select controls lack labels/aria-labels, and the mobile warnings show they are difficult to interpret and operate with confidence.
- **Evidence**: The mobile observation flags "A form field has no label, aria-label, or placeholder" for both the region and smoothing selects, and the final mobile DOM shows those selects with blank labels.
- **Suggested fix**: Add explicit labels tied to each select, or use visible field labels that remain near the control in mobile layout.

### [MEDIUM] several-interactive-targets-are-far-below — mobile usability
- **Page**: `index.html: variable checkboxes / Y-axis radios / × buttons`
- **Problem**: Several interactive targets are far below mobile touch guidance, making mis-taps likely in the most common analysis controls.
- **Evidence**: Layout warnings repeatedly flag 13×13px checkboxes/radios for variables and Y-axis modes, and the final observation shows small targets for multiple inputs plus 20×17px close buttons.
- **Suggested fix**: Increase touch target size to at least 44×44px with generous padding, while preserving the current visual density through spacing and alignment.

### [MEDIUM] several-top-nav-items-act-like — navigation
- **Page**: `index.html: About / Methods / Stories`
- **Problem**: Several top-nav items act like placeholders instead of real destinations, which can leave users stuck without help or context.
- **Evidence**: The trajectory notes that clicking "Methods" and "Stories" only updated the URL hash to `#` with no visible content change, and "About" likewise behaved like a placeholder/inert anchor.
- **Suggested fix**: Either wire these items to real content panels/pages or visually mark them as non-navigational help anchors with explicit in-page feedback.

### [MEDIUM] the-primary-inspection-path-remains-fragile — goal completion
- **Page**: `index.html: chart / Inspector`
- **Problem**: The primary inspection path remains fragile: hover-based year lookup was not successfully exercised, and the inspector stays in a placeholder state.
- **Evidence**: Multiple hover attempts timed out for `ux-0`, and the inspector repeatedly showed "Hover the chart to see values for a year." The mobile trajectory also notes that the intended touch-based inspection gesture was not verified.
- **Suggested fix**: Add a clearer non-hover fallback for mobile, such as tap-to-pin, crosshair scrubbing, or a visible instruction that explains the inspection gesture more explicitly.

### [LOW] source-links-open-compact-popovers-that — clarity
- **Page**: `index.html: SOURCES`
- **Problem**: Source links open compact popovers that can overlap nearby content, which makes the explanation feel cramped in the mobile layout.
- **Evidence**: The mobile reflections for NOAA, CMIP6, and NSIDC note visible tooltips/popovers, and one specifically says the tooltip appears over the sources list and partially overlaps nearby source text.
- **Suggested fix**: Anchor the tooltip away from the list or convert it into a dedicated info panel/card in the mobile layout.

### [LOW] the-reset-control-is-usable-but — navigation
- **Page**: `index.html: Reset zoom`
- **Problem**: The reset control is usable, but its effect can be subtle enough that users may not immediately know what changed.
- **Evidence**: Earlier desktop steps reported that clicking "Reset zoom" produced no visible state change; later the mobile step did show visible content change, so the effect exists but is not consistently obvious.
- **Suggested fix**: Add a short status cue after reset, such as restoring the default domain with a brief toast or a more obvious axis/zoom animation.
