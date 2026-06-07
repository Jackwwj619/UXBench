# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full tessera system, prioritizing the primary docs/tutorial flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

Tessera’s docs pages use a strong PostgreSQL-like reference pattern with clear three-column layout (TOC, main content, and “ON THIS PAGE” outline), and many navigation actions work reliably. However, critical interaction reliability breaks around the ⌘K command palette overlay: it often blocks pointer events and remains visible, preventing users from clicking links and toggles. On mobile, there are also accessibility and touch-target issues (notably an unlabeled version select) and some controls appear below recommended tap sizes.

## Issues (5)

### [HIGH] the-k-overlay-can-become-a — error recovery
- **Page**: `operators.html / file: operators.html#*; failures show cmdkOverlay pointer-events interception (timeouts) and Escape produced no visible dismissal.`
- **Problem**: The ⌘K overlay can become a persistent blocker that intercepts pointer events, preventing navigation and other actions (theme toggle, Reference link, TOC clicks). Recovery (Escape/outside click) is not reliable.
- **Evidence**: Multiple timeouts show `<div id="cmdkOverlay" class="cmdk-overlay">…</div> intercepts pointer events` when clicking other controls, e.g., failed clicks on DATE_TRUNC, Reference, Arithmetic, ⌘ K Search, and 🌓, each timing out after 4000ms with the same interception log. On operators.html, attempting to dismiss via Escape produced no detectable state change (`changed=false`) while the overlay/search card remained visible in screenshots with “DATE_TRUNC” content.
- **Suggested fix**: Ensure the command palette overlay is truly modal only while active, and always provide deterministic dismissal: Escape and outside click should reliably close and remove pointer-event interception. Add a visible “Close” affordance and ensure focus trapping does not prevent underlying interactions from reactivating after dismissal.

### [HIGH] the-version-switcher-control-lacks-accessible — forms
- **Page**: `index.html version switcher select (ux-7 flagged missing_input_label) and function-json-extract.html version select (ux-2 flagged missing_input_label); also v2.3 selection showed no obvious pill update.`
- **Problem**: The version switcher control lacks accessible labeling and shows unclear feedback for selection changes (content/pill may not update immediately).
- **Evidence**: The harness flags `missing_input_label` for the version select on index.html and function-json-extract.html (select has no label/aria-label/placeholder). Additionally, selecting v2.3 on the docs home produced no obvious content update (hero badge still shows v2.4 while dropdown shows v2.3).
- **Suggested fix**: Add an explicit accessible label (aria-label) for the version select, and make state change perceivable immediately (update hero badge/title timestamp and/or show a brief “Version updated to v2.3” confirmation).

### [MEDIUM] several-interactive-elements-are-below-recommended — mobile usability
- **Page**: `function-json-extract.html mobile viewport: small_tap_target warnings for ux-1 (Tessera), ux-4 (🌓), ux-5 (GitHub edit), ux-6 (Copy). Screenshot shows header cluster around ⌘K, theme, and GitHub.`
- **Problem**: Several interactive elements are below recommended mobile tap target sizes, increasing mis-taps and user frustration—especially problematic when overlays already create interaction risk.
- **Evidence**: On mobile viewports, layout warnings report small tap targets: theme toggle 🌓 is 42x37px; “📝 Edit this page on GitHub” is 156x18px; “Copy” buttons are ~46x22px; Tessera logo is 100x26px; and the version select control is also flagged missing label/has small sizing.
- **Suggested fix**: Increase padding/min-height to meet or exceed ~44px touch target guidance; ensure copy and secondary actions have sufficiently large tap areas and adequate spacing from adjacent controls.

### [MEDIUM] the-ui-likely-changes-state-but — feedback
- **Page**: `function-json-extract.html mobile: repeated steps where clicking ux-2 (version select) and targeted controls produced `changed=false`; visible text includes “Version history 3 entries ▼” on the screenshot.`
- **Problem**: The UI likely changes state, but feedback is not clearly detectable by the test harness during interactions—raising concern that the control’s affordance/state change may be insufficient or ambiguous.
- **Evidence**: On function-json-extract.html (mobile), clicking the version selector did not produce detectable changes (`changed=false`). Additionally, the attempt to interact with the “Version history” area/toggle resulted in no obvious visible-text/URL change (`changed=false`) even though the screenshot shows “Version history”/“3 entries” content already present with a chevron.
- **Suggested fix**: Provide stronger visual state feedback on toggle (chevron rotation animation, plus/minus change, and ensure the expanded content area’s height transition is clearly visible). Also add an aria-expanded state for accessibility.

### [LOW] some-controls-notably-selects-in-the — accessibility
- **Page**: `index.html select (missing_input_label) and function-json-extract.html select (missing_input_label); ⌘K overlay shown in screenshot with centered input.`
- **Problem**: Some controls (notably selects in the header) appear to lack proper ARIA labeling, and the overlay/search likely needs robust accessibility semantics.
- **Evidence**: Form field accessibility warning: `missing_input_label` for the select (version switcher) on both index.html and function-json-extract.html. The search palette overlay behavior is present in screenshots, but earlier interaction failures show focus/dismiss behavior may be brittle.
- **Suggested fix**: Add aria-label/aria-labelledby for header selects and ensure the ⌘K overlay uses accessible dialog semantics (role=dialog, aria-modal, focus return to trigger on close).
