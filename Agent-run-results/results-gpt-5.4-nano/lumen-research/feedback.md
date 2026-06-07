# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full lumen-research system, prioritizing the primary chatbot/agent interface flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

The core three-column chat experience is present (thread list, conversation with inline citation chips, and a populated Sources rail), but many secondary actions behave like silent no-ops. Evidence from the recent trajectory shows Share thread and Export as PDF provide no visible confirmation or overlay dismissal on mobile, and citation hover/click synchronization was not reliably testable due to targeting instability/timeouts. Mobile UX is further weakened by horizontal overflow and multiple controls below recommended tap target sizes, making key navigation and controls harder to use with confidence.

## Issues (5)

### [HIGH] share-thread-and-export-as-pdf — feedback
- **Page**: `file/index.html; selectors: 'Share thread' button (ux-12/ux-1), 'Export as PDF' button (ux-13/ux-2); screenshots: _run/screenshots/agentic-77-click-mobile.png, agentic-79-click-mobile.png, agentic-80-click-mobile.png`
- **Problem**: Share thread and Export as PDF actions fail silently with no visible dialog, toast, success/error state, or overlay dismissal.
- **Evidence**: Mobile recent trajectory: clicking 'Share thread' (ux-1) shows after_url unchanged and changed=false; tool feedback: 'No obvious URL or visible-text change was detected'. Similarly 'Export as PDF' (ux-2) on mobile yields changed=false with no download prompt/progress and the popover remains visible (screenshots at agentic-77-click-mobile.png, agentic-79-click-mobile.png, agentic-80-click-mobile.png). Desktop also showed the same pattern (steps-13-18 and steps-49-54): 'Export as PDF' produced no observable feedback or URL/tab change.
- **Suggested fix**: Add explicit user feedback: show a blocking modal or toast on success, a clear error state on failure, and ensure the share/export popover reliably closes/dismisses (or clearly indicates it is waiting/loading). For PDF export, surface the browser download UI or an in-app progress indicator and confirmation message.

### [HIGH] citation-to-source-navigation-hover-and — navigation
- **Page**: `file/index.html; evidence mentions citation chips and right rail mapping; failing target: ux-29; failures from recent_chunks steps-07-12 and steps-01-06`
- **Problem**: Citation-to-source navigation (hover and click) is not reliably available/testable; hover and click interactions timed out or were missing targets, preventing deterministic source synchronization.
- **Evidence**: Trajectory failures: hover and click on the citation target failed due to missing/unstable targets: 'Agent selected action hover without a target_id' and 'Agent selected action click without a target_id'. Further, ux-29 hover/click timed out: 'Locator.click Timeout 4000ms exceeded... waiting for locator("[data-uxagent-id=\"ux-29\"]")' and similarly for hover. As a result, hover highlight/scroll and click synchronization behavior could not be observed.
- **Suggested fix**: Ensure citation chips render as stable, uniquely identifiable buttons/links with consistent hoverability/clickability. Provide visual loading/active-state feedback when a source is being highlighted/scroll-into-view, and add a fallback interaction (e.g., a persistent 'View source' link) if hover is not supported.

### [MEDIUM] sources-category-filtering-appears-to-be — clarity
- **Page**: `file/index.html; Sources tabs: All/Papers/Books/Web/Preprints (ux-13..ux-17); screenshots: agentic-78-click-mobile.png; chunks: steps-19-24, steps-25-30, steps-43-48`
- **Problem**: Sources category filtering appears to be a silent no-op or lacks obvious active-state/content refresh feedback.
- **Evidence**: Multiple actions report changed=false with no obvious visible difference: clicking 'Papers' in Sources rail produced no obvious change (steps-19-24 and steps-43-48). Clicking 'Web' and 'Books' also showed no visible refresh/deterministic update (steps-25-30 and steps-49-54). Mobile: tapping footer 'All' (ux-13) produced no apparent active-state change or sources-panel update (agentic-78-click-mobile.png).
- **Suggested fix**: Make active tab state unmistakable (distinct color/underline) and ensure the right rail content actually rerenders. Add a subtle loading indicator or 'Updated' message when the sources set changes, and keep scroll position behavior consistent.

### [MEDIUM] mobile-tap-targets-and-layout-sizing — mobile usability
- **Page**: `file/index.html; layout warnings in observation: horizontal_overflow (515px vs 390px) and multiple small_tap_target entries; screenshot: mobile view shown in agentic-80-click-mobile.png`
- **Problem**: Mobile tap targets and layout sizing look suboptimal, increasing mis-taps and reducing confidence in interaction outcomes.
- **Evidence**: Observed layout warnings: multiple controls below 44px guidance and one instance of horizontal overflow. Example: attachment '📎' is 32x35px (small tap target), 'Ask' is 60x39px (below 44px guidance), 'All' tab is 35x35px, and 'Papers/Web/Books' tabs are also below target sizes. Additionally, console/layout warnings indicate horizontal overflow (scroll width 515px vs viewport 390px).
- **Suggested fix**: Increase tap target sizes to at least 44px (especially tabs and the attachment icon), add spacing to prevent accidental presses, and fix horizontal overflow so the tab row and headers align consistently at narrow widths.

### [MEDIUM] some-controls-lack-accessible-labels-missing — accessibility
- **Page**: `file/index.html; warning entries 'missing_input_label' for ux-3 and ux-6 and ux-12/ux-12; includes Mode selector and Sort selector`
- **Problem**: Some controls lack accessible labels (missing aria-label/placeholder/label), which reduces usability for screen reader and non-visual users.
- **Evidence**: Layout warnings explicitly report 'missing_input_label' for select controls: Mode select (ux-3) and other selects (ux-6), and sort/select controls (ux-12). The warning details indicate the form field has no label, aria-label, or placeholder.
- **Suggested fix**: Ensure every input/select has an associated accessible label (aria-label or visible label linked via aria-labelledby). Validate that screen readers announce current selection and changes after interaction.
