# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full meadowid system, prioritizing the primary settings/privacy flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

Across MeadowID’s security/privacy settings pages, core management patterns (cards with per-item destructive actions and modals) generally work and provide clear confirmation copy—especially on Connected apps. However, several high-stakes recovery/remediation CTAs appear to be non-functional or only update a URL hash with no user-visible progress (e.g., “verify now”, backup-code reveal/download, freeze/delete). On mobile, multiple navigation and action controls fall below minimum tap target guidance, and accessibility labeling is missing for filter/sort selects, increasing both usability and trust risk.

## Issues (4)

### [HIGH] key-recovery-ctas-do-not-lead — goal completion
- **Page**: `index.html: verify now; passkeys.html: Recovery email • Send verification (steps-61-66, steps-43-48, steps-49-54)`
- **Problem**: Key recovery CTAs do not lead to a visible verification flow or state update; the click appears to be a no-op/anchor rather than a working remediation step.
- **Evidence**: On the Overview page, clicking the visible “verify now” affordance on the Recovery readiness panel did not navigate to a verification flow; the URL only changed to include a hash (file:///.../index.html#). On Passkeys & 2FA, clicking “Send verification” (and other sensitive actions) only changed the URL hash and the Recovery email panel remained “Not verified.”
- **Suggested fix**: After clicking “verify now” / “Send verification,” show an explicit loading state and then a clear success/error message (or route to a dedicated verification step). Avoid hash-only changes; ensure the recovery status indicator updates immediately or clearly explains expected delay and what to do next.

### [HIGH] multiple-sensitive-actions-do-not-show — error recovery
- **Page**: `passkeys.html: Backup codes • Reveal & download; passkeys.html: SMS Remove; freeze.html: Freeze switch and Request deletion (steps-37-42, steps-43-48, steps-31-36, steps-49-54, steps-55-60)`
- **Problem**: Multiple sensitive actions do not show observable UI state transitions (reveal/download, remove factors, freeze switch, and request deletion), making it unclear whether actions succeeded, failed, or require additional steps.
- **Evidence**: On passkeys.html, clicking “Reveal & download” for Backup codes produced no detectable UI/URL change and the section stayed “Backup codes… Hidden” with the same CTA. Clicking “Remove” for SMS (backup factor) and “Re-pair” also produced no obvious visible/URL state change (changed=false; no modal/error detected). On freeze.html, clicking the freeze switch timed out (target not found) and “Request deletion” changed only to freeze.html# with no modal/wizard/confirmation.
- **Suggested fix**: Ensure every sensitive control triggers a visible state change or confirmation outcome: (1) confirmation modal, (2) loading/progress indicator, (3) success/failure banner or inline state update. For freeze/delete, provide explicit error handling when prerequisites aren’t met (e.g., missing password/passkey) instead of silent no-ops or hash changes.

### [MEDIUM] filter-sort-select-controls-lack-accessible — accessibility
- **Page**: `connected-apps.html: All categories select (ux-8) and Sort select (ux-9) (final_observation / layout_warnings; step reflections around connected-apps)`
- **Problem**: Filter/sort <select> controls lack accessible labels (no aria-label/visible label tied to the control), which can make them hard to understand or operate for screen-reader users.
- **Evidence**: Connected apps mobile shows accessibility/layout warnings: “missing_input_label” for the category filter (ux-8) and sort control (ux-9). The DOM summary also shows the selects with no label/aria label/placeholder.
- **Suggested fix**: Add explicit form labels (e.g., “Filter by category” and “Sort by”) or ensure aria-labelledby/aria-label is present for the selects, and verify they are read correctly by screen readers.

### [MEDIUM] multiple-mobile-navigation-items-and-action — mobile usability
- **Page**: `connected-apps.html mobile: layout_warnings small_tap_target (ux-17/ux-20/ux-21); devices.html and other pages: mobile nav tap-target warnings and observed click timeouts (recent_trajectory agentic-77-click, agentic-77/78/79 and related logs)`
- **Problem**: Multiple mobile navigation items and action buttons are smaller than the recommended 44px touch target size, which increases mis-taps and interaction failures.
- **Evidence**: Tool warnings flag small tap targets: Connected apps “Revoke” button is 44x41px; modal “Cancel” 77x41px; “Revoke access” 131x41px. Additional warnings during mobile exploration cite sidebar/header navigation links around 40px tall (e.g., ◐ Overview 108x40, ⇄ Connected apps 154x40, ▢ Active sessions 153x40) and earlier timeouts/click failures on mobile targets (e.g., ux-11/ux-13 timeouts on devices.html).
- **Suggested fix**: Increase minimum hit area to at least 44x44px for nav links and critical action buttons; add spacing to prevent mis-taps and ensure adequate touch padding around icon/text.
