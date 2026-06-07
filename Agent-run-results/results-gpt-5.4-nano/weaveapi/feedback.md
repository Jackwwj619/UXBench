# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full weaveapi system, prioritizing the primary docs/tutorial flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

The WeaveAPI docs generally present a structured, Stripe-like learning flow with clear section headings, a left navigation, and reusable code-copy controls. However, the “Search docs…” behavior appears unreliable or non-obvious: multiple searches on Errors and Webhooks do not produce visible filtering or navigation/scroll-to feedback, and mobile table tapping for an error row failed. The interactive Try-it panels also sometimes provide no detectable feedback on “Send →,” which can undermine user confidence and recovery.

## Issues (6)

### [HIGH] the-docs-search-input-updates-text — clarity
- **Page**: `errors.html / Search docs… input; actions: typing 'insufficient_funds' and Enter (steps ~13-18, 55-60, and mobile steps 67-78).`
- **Problem**: The docs search input updates text but does not provide visible results, filtering, highlighting, or navigation to the matching row/section.
- **Evidence**: On errors.html, after typing queries like 'insufficient_funds' there was 'no obvious actionable feedback' and pressing Enter produced no URL/hash or visible highlight change (tool_result: changed=false; tool feedback: no obvious URL or visible-text change). On mobile errors.html, typing and pressing Enter similarly showed no observable search results or scrolling to 'expired_card'.
- **Suggested fix**: Provide explicit search feedback: show a dropdown of matching codes/sections, highlight matches in the table, and/or auto-scroll to the best match with a visible 'Jumped to expired_card' confirmation. Ensure Enter and any mobile submit affordance produce the same observable outcome (scroll/highlight + focus).

### [HIGH] tap-click-affordances-for-error-table — navigation
- **Page**: `errors.html (mobile) error row selection attempt: locator '[data-uxagent-id="expired_card"]' timed out (steps 67-78).`
- **Problem**: Tap/click affordances for error-table rows appear unreliable on mobile; the intended row selection/jump likely isn’t discoverable or interactive.
- **Evidence**: On mobile errors.html, clicking the error row target '[data-uxagent-id="expired_card"]' timed out: 'Click failed for expired_card: Locator.click: Timeout 4000ms exceeded' (step 67-78). Also, clicking the search/tables control near the input produced 'no obvious URL or visible-text change' and did not trigger an interactive effect.
- **Suggested fix**: Make error rows explicitly interactive (clear affordance like chevron, row hover/pressed state, selected styling) and ensure taps reliably focus/scroll to that row or open a detail panel. Add accessibility roles (button/link) so both touch and assistive tech can detect interactivity.

### [HIGH] clicking-send-does-not-provide-detectable — feedback
- **Page**: `charges.html / Try-it panel 'Send →' (steps ~25-36 and ~37-42).`
- **Problem**: Clicking “Send →” does not provide detectable visible feedback on charges.html for some endpoints, making it unclear whether the request ran.
- **Evidence**: On charges.html, clicking “Send →” resulted in no detectable visible change: tool_result changed=false with feedback 'No obvious URL or visible-text change was detected'. This happened while the Try-it panel was active (Create and later Retrieve).
- **Suggested fix**: Ensure the Response panel updates synchronously or clearly signals async progress (spinner/disabled button) and then shows success/error states. Add explicit status text (e.g., 'Response updated') and ensure the mock response area always changes on Send, even for unsupported inputs.

### [MEDIUM] search-submission-shows-no-visible-navigation — feedback
- **Page**: `webhooks.html / Search docs… (steps ~13-18 and ~55-60).`
- **Problem**: Search submission shows no visible navigation/highlighting/URL change even when the query exists on the page.
- **Evidence**: On webhooks.html, typing 'charge.succeeded' into Search docs… produced no clear feedback such as results dropdown, highlighting, or URL/hash change. Enter-based submission also resulted in 'after_url unchanged' and no visible change.
- **Suggested fix**: Implement visible search results UI and selection behavior (dropdown + keyboard navigation), and highlight the matched event type within the event list. At minimum, scroll-to-match with a distinct visual highlight.

### [MEDIUM] left-navigation-tap-targets-are-smaller — mobile usability
- **Page**: `Multiple pages: mobile tap target warnings for left-nav links (~223x31px), including steps ~61-66 and earlier mobile regression notes.`
- **Problem**: Left navigation tap targets are smaller than the recommended mobile size, increasing mis-taps and navigation failures.
- **Evidence**: Layout warnings repeatedly report left-nav links around 223x31px (below the 44px mobile guidance). This occurs across pages (Quickstart/Authentication/etc.), and mobile recovery relies heavily on navigation.
- **Suggested fix**: Increase left-nav link height/padding to meet mobile guidance (≥44px). Add sufficient spacing between items and ensure active state is obvious.

### [MEDIUM] horizontal-overflow-suggests-content-layout-may — mobile usability
- **Page**: `errors.html mobile: horizontal_overflow warning (page width 651px > viewport 390px), and cross-page overflow notes (e.g., charges/customers/webhooks).`
- **Problem**: Horizontal overflow suggests content/layout may not fit mobile widths cleanly, risking clipped columns and off-screen controls.
- **Evidence**: Multiple pages show medium horizontal overflow: e.g., errors.html on mobile reports page width 651px vs viewport 390px; other pages show similar overflow (scroll_width > viewport).
- **Suggested fix**: Fix responsive layout to eliminate horizontal overflow at common mobile widths; prefer wrapping/stacking for tables or enabling proper responsive table layouts with visible overflow handling.
