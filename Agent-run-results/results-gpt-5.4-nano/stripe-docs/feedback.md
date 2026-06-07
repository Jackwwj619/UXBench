# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full stripe-docs system, prioritizing the primary docs/tutorial flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

The docs/tutorial flow is visually clear (three-column docs layout, language tabs with “Showing Python/Ruby” pills, and consistent step structure), but key interaction states are unreliable—especially modals/drawers and global search—on both desktop and mobile. Multiple attempts to dismiss overlays (Search, “Was this rebuild useful?”, Navigate drawer) show little/no observable state change and frequent pointer-event interception or timeouts. On mobile, many important controls (Copy, Close, language toggles, small cards) are near/below recommended tap-target sizes, compounding the issues.

## Issues (6)

### [HIGH] closing-the-search-modal-often-fails — feedback
- **Page**: `index.html mobile search; embedded.html search close/backdrop interception logs (data-close-search ux-32/ux-36/ux-37) and failures in session_memory notable_failures and recent_trajectory steps agentic-77/78/79/80.`
- **Problem**: Closing the search modal often fails to visibly dismiss/unblock the UI, leaving users stuck with an overlay that may still intercept clicks.
- **Evidence**: Multiple failed click attempts for search controls: “Open search (press /)” timed out with pointer-event interception by a close-search/backdrop element (data-close-search on ux-32). Clicking “Close search” (ux-37) repeatedly reported no visible/URL change and often timed out or the overlay state wasn’t verifiably removed (e.g., embedded.html close click changed=false; mobile search close also timed out).
- **Suggested fix**: Ensure modal close reliably removes the backdrop and restores pointer events; add a strong visual transition (fade + overlay removed) and a deterministic post-close focus return to the trigger. Provide a persistent status message or toast (“Search closed”) for confirmation.

### [HIGH] the-feedback-dialog-does-not-reliably — error recovery
- **Page**: `embedded.html feedback dialog interactions in recent trajectory steps 31-36 and customization.html dialog in steps 19-24.`
- **Problem**: The feedback dialog does not reliably dismiss or confirm the user’s selection; clicks on “Yes/No” produced no observable change.
- **Evidence**: On embedded.html and customization.html, selecting “Yes”/“No” shows “changed: false” and the prompt remains (tool feedback indicates no obvious URL/visible-text change; screenshots still show “Was this rebuild useful?” with “Yes/No”).
- **Suggested fix**: After selecting an option, immediately dismiss the dialog and show explicit acknowledgement (e.g., “Thanks for the feedback”). If asynchronous, show a loading state and then close.

### [HIGH] mobile-navigation-drawer-dismissal-navigation-is — navigation
- **Page**: `/index.html mobile screenshot agentic-77-click-mobile.png and failures agentic-77-click, agentic-78-click, agentic-79-click.`
- **Problem**: Mobile navigation drawer dismissal/navigation is unreliable: tapping drawer links doesn’t navigate and tapping Close doesn’t visibly dismiss/unblock the drawer.
- **Evidence**: In mobile viewport on index.html, tapping the drawer link “LOCAL GUIDE Move to embedded Checkout” (ux-23) timed out and URL stayed on index.html. Tapping “Close navigation” (ux-4) resulted in no obvious URL/visible-text change (changed=false), and subsequent navigation attempts like “Embedded payment form” (ux-6) also timed out or appeared obstructed.
- **Suggested fix**: Make drawer close deterministic and verify pointer-event restoration. Add an overlay/backdrop removal animation and ensure the drawer’s clickable region doesn’t overlap with page content once closed.

### [MEDIUM] copy-actions-intermittently-fail-or-provide — affordance
- **Page**: `embedded.html Copy failures in session_memory notable_failures and steps-43-48/25-30; interactables bbox ux-17/ux-18 etc ~65x44.`
- **Problem**: Copy actions intermittently fail or provide ambiguous confirmation due to overlay/backdrop interference; mobile tap-target sizing likely contributes to missed interactions.
- **Evidence**: On embedded.html, clicking “Copy” timed out (ux-21; search-backdrop element intercepted pointer events in the log). While one later run indicates a “Code copied to clipboard” toast appears, earlier copy attempts were blocked (changed=false / timeout). Tool also flags multiple Copy buttons as small tap targets (~65x44px and below mobile guidance).
- **Suggested fix**: Increase tap target size and padding for Copy buttons on mobile; ensure Copy isn’t affected by lingering modals/backdrops. Provide consistent, prominent confirmation (toast + accessible aria-live region) tied to the currently visible language.

### [MEDIUM] several-interactive-targets-are-near-below — mobile usability
- **Page**: `coverage.gaps layout_warning_count and layout_warnings list (small_tap_target entries) plus mobile screenshots with Navigate/Close/Search controls.`
- **Problem**: Several interactive targets are near/below recommended mobile tap sizes, increasing mis-taps and perceived brokenness.
- **Evidence**: Mobile layout warnings show multiple small targets: “Stripe docs clone home” 62x28px, “Stripe Checkout” 106x23px, Copy button ~65x44px, and “Yes/No” buttons in the feedback dialog (55x44 and 50x44).
- **Suggested fix**: Raise tap-target minimums (both width and height) for header/nav items, Copy, and dialog buttons; add spacing between tap areas and increase hit slop.

### [MEDIUM] language-toggles-visually-appear-to-switch — clarity
- **Page**: `embedded.html language toggle attempts in steps-37-42 and screenshot/objectives stating “Showing Python/Ruby” pill presence.`
- **Problem**: Language toggles visually appear to switch (e.g., “Showing Ruby/Python”), but automated tool feedback often reports no detectable change, suggesting subtle or non-atomic updates that may be hard to perceive for users.
- **Evidence**: Tool logs: clicking “Ruby”/“Python” resulted in changed=false or no obvious URL/text change, even though screenshots indicate the chip/pill (“Showing Python” / “Showing Ruby”) and terminal content. This indicates state changes may be subtle (code content swaps) without clear transition/confirmation beyond the small pill.
- **Suggested fix**: Add stronger visual transition (fade/slide), highlight the code block header more prominently, and ensure Copy button label/confirmation is tied to the active language.
