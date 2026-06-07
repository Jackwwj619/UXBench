# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full lattice system, prioritizing the primary pricing flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

The pricing calculator generally works: selecting a matrix cell updates the sticky quote card and tier badge, and add-on checkboxes recalculate totals with the selected base preserved. However, several key controls on the page appear to be dead/low-feedback (#/no-op links) and the “How we got this number” disclosure behavior is not reliably verifiable from user-visible state, especially on mobile. On mobile, multiple controls have sub-44px tap targets and the layout warns about horizontal overflow, increasing mis-taps and cutting off content.

## Issues (4)

### [HIGH] the-how-we-got-this-number — feedback
- **Page**: `pricing.html mobile: screenshot /results.../agentic-77-click-mobile.png and /agentic-78-click-mobile.png; target aria/name appears as “Overview” while the UI text shows “How we got this number”.`
- **Problem**: The “How we got this number” disclosure does not provide reliable visible expansion feedback; the agent often cannot confirm that explanatory content becomes visible after clicking/tapping the control.
- **Evidence**: In the mobile run, clicking the control labeled “Overview” (href="#") updated the URL hash (pricing.html#) but the subsequent visible text still only shows the collapsed label “How we got this number” without the expected expanded explanatory body content (steps agentic-77-click, agentic-78-click). Desktop attempts to click “How we got this number” also did not show an observable UI/URL change (multiple steps with changed=false / no panel revealed).
- **Suggested fix**: Ensure the disclosure clearly changes state visually (e.g., animated height/chevron rotation plus new text appearing immediately). Also update accessible attributes (expanded/collapsed) and provide a distinct focus/scroll-to behavior on mobile so the newly revealed content is clearly in view.

### [HIGH] several-header-footer-links-appear-to — navigation
- **Page**: `pricing.html mobile targets: “Benchmarks” (ux-53), “Book demo” (href="#"; ux-3), “Docs” (href="#"; ux-51); evidence from agentic-79-click, agentic-80-click, and steps mentioning changed=false.`
- **Problem**: Several header/footer links appear to be dead or silently no-op (href="#"), providing no navigation or dialog feedback while users expect a page transition.
- **Evidence**: On mobile, tapping “Benchmarks” produced no detectable UX response (after_url unchanged; changed=false) (agentic-79-click). On mobile, “Book demo” (href="#") produced no visible navigation/dialog change (after_url unchanged; changed=false) (agentic-80-click). On desktop/mobile, “Docs” similarly showed no observable URL/text change (steps 55-60, 61-66 indicate click doesn’t change visible state; href is likely '#').
- **Suggested fix**: Replace href="#" with real navigation (or remove link styling if it triggers an in-page interaction). If it opens a modal, show a modal immediately with focus trap + clear close affordance; otherwise provide a toast/inline message indicating what will happen.

### [MEDIUM] mobile-tap-targets-are-frequently-below — mobile usability
- **Page**: `pricing.html mobile: layout warnings in dom_summary (horizontal_overflow; small_tap_target for ux-1/ux-2/ux-3 and checkboxes ux-40..ux-47).`
- **Problem**: Mobile tap targets are frequently below recommended size, and the page shows a horizontal overflow warning, both of which increase mis-taps and content cut-off/side-scrolling.
- **Evidence**: Mobile viewport reports small tap targets: header links like “Lattice DB” 123x28px, “Pricing” 45x21px, and “Book demo” 105x41px below the 44px guidance; all add-on checkboxes are ~13x13px (layout_warning_count includes multiple small_tap_target entries). The same run also flags horizontal overflow: page width 475px vs viewport 390px.
- **Suggested fix**: Increase tap target sizes: enlarge checkbox hit areas (even if visual size stays small), add padding around labels, and ensure the 2D matrix and sticky card fit without overflow (or provide intentional horizontal scroll with clear affordance).

### [MEDIUM] control-naming-targeting-is-ambiguous-the — clarity
- **Page**: `pricing.html: mobile steps agentic-77-click/agentic-78-click (target “Overview” vs visible “How we got this number”); FAQ timeouts: ux-62 locator.click timeout in steps-37-42.`
- **Problem**: Control naming/targeting is ambiguous: the clickable target captured as “Overview” seems to map to the explanation disclosure area (“How we got this number”), while separate FAQ accordions are not reliably testable due to locator timeouts.
- **Evidence**: In the captured mobile step, the target is identified as “Overview” (target_id ux-49, href="#"), yet the visible sticky card shows “How we got this number” next to that control. Multiple attempts to click FAQ controls timed out waiting for locator targets (e.g., ux-62 timeout 4000ms) so the page’s FAQ expand/collapse behavior could not be verified reliably.
- **Suggested fix**: Make the disclosure trigger text match the visible label exactly (e.g., use “How we got this number” as the clickable element text and accessible name). For FAQ accordions, ensure stable identifiers and adequate hit areas so expansion reliably works and is easy to discover.
