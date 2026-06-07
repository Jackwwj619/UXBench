# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full brewlog-mobile system, prioritizing the primary data visualization flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

The mobile “Log a brew” experience is presented as a clear, sectioned form (method, bean, dose/yield, time, grind, score, tasting notes), but multiple core interactions provide weak or missing feedback. Evidence shows score and brew-method selection often do not produce a visible selected state, and the primary “Save brew ↗” submit could not be executed reliably in testing (locator timeouts), preventing confirmation/validation UX from being observed. On top of that, several interactive controls are too small and at least one form field lacks accessible labeling, creating both usability and accessibility friction.

## Issues (6)

### [HIGH] selecting-brew-method-tiles-does-not — feedback
- **Page**: `/Users/timchef/UXBench/websites/brewlog-mobile/index.html (mobile screenshots agentic-79-click-mobile.png; method radio targets ux-10/ux-9/ux-11 with 13x13px warnings)`
- **Problem**: Selecting brew method tiles does not show reliable/visible selection feedback, making it unclear what value was captured.
- **Evidence**: On mobile, clicking the V60 method tile (target ux-10, radio input) resulted in no detectable UI change (tool feedback: changed=false) and the same method tile row remains without an obvious selected state. Additionally, tapping the espresso icon/radio (13x13px tiles) appears similarly prone to no observable state change in the run.
- **Suggested fix**: Make selection state unmissable (strong tile highlight + checkmark), enlarge the tap area beyond the 13x13px control, and ensure visual state updates immediately after tap (including for accessibility focus state).

### [HIGH] score-taps-appear-to-register-but — feedback
- **Page**: `/Users/timchef/UXBench/websites/brewlog-mobile/index.html (mobile screenshot agentic-78-click-mobile.png; score button targets ux-21..ux-30)`
- **Problem**: Score taps appear to register but do not produce obvious visible selection feedback.
- **Evidence**: Tapping score '5' on mobile (target ux-25) produced no obvious UI change (changed=false; no captured visible selected/filled state difference). The same pattern appears when tapping score '1' in earlier desktop testing, where the tool reported no obvious change (changed=false).
- **Suggested fix**: Ensure selected-state styling is clearly visible (e.g., filled pill/outline + persistent active styling), and add microcopy feedback (e.g., “Score: 5”) or a summary line that updates on selection.

### [HIGH] the-primary-submit-action-save-brew — goal completion
- **Page**: `/Users/timchef/UXBench/websites/brewlog-mobile/index.html (failures logged: “Locator.click: Timeout 4000ms exceeded” for ux-0; mobile form shows “Save brew ↗” in agentic-77/78/79/80 screenshots)`
- **Problem**: The primary submit action (“Save brew ↗”) could not be executed in testing, and therefore the success/validation UX could not be observed.
- **Evidence**: Multiple attempts to click the submit control failed with a locator timeout (“Click failed for ux-0: Timeout 4000ms exceeded”), with before_url and after_url unchanged. As a result, no confirmation state (e.g., “✓ Saved”), toast, navigation, or inline validation errors were captured for the mobile viewport.
- **Suggested fix**: Re-check that the submit CTA is actually clickable/visible on mobile (avoid overlay/bottom-nav interference), increase tap target size/contrast, and ensure a deterministic post-submit state with visible confirmation or validation messages.

### [MEDIUM] many-key-controls-have-tap-targets — mobile usability
- **Page**: `/Users/timchef/UXBench/websites/brewlog-mobile/index.html (layout_warning_count=38; small_tap_target warnings for ux-7..ux-14, plus + Log ~64×32)`
- **Problem**: Many key controls have tap targets far below mobile guidelines, increasing mis-taps and undermining perceived quality.
- **Evidence**: Layout warnings flag multiple controls on the mobile “Log a brew” sheet as too small: method icons/tiles are ~13×13px (ux-9..ux-14), Cancel is ~73×30px (ux-8), and the back arrow is ~36×36px (ux-7). “+ Log” on the Today screen is also flagged as small (64×32px).
- **Suggested fix**: Increase touch area to at least 44×44px by padding the tiles/buttons, while keeping the visual icon size the same.

### [MEDIUM] some-form-fields-lack-accessible-labels — accessibility
- **Page**: `/Users/timchef/UXBench/websites/brewlog-mobile/index.html (missing_input_label warnings: ux-15..ux-18)`
- **Problem**: Some form fields lack accessible labels/aria/placeholder, reducing usability and accessibility compliance.
- **Evidence**: Tool reports “missing_input_label” for multiple fields on mobile/DOM: the bean select (ux-15) and numeric inputs (ux-16..ux-18) have no label/aria-label/placeholder.
- **Suggested fix**: Add explicit labels (programmatic label elements) and/or aria-labels for each input/select; ensure label text maps clearly to Dose/Yield/Ratio and Bean selection.

### [MEDIUM] cancellation-returns-to-the-today-list — forms
- **Page**: `/Users/timchef/UXBench/websites/brewlog-mobile/index.html (Cancel observed; note: “recovery behavior on re-opening the form still needs to be tested”)`
- **Problem**: Cancellation returns to the Today list but the run does not verify whether entered values are preserved vs cleared, creating uncertainty for users who reconsider logging.
- **Evidence**: Clicking “Cancel” changes visible content back to the Today list (“Today’s brews” and bottom nav shows Today selected). However, the tool explicitly notes lack of evidence on whether form values are preserved when re-opening (recovery behavior still needs testing).
- **Suggested fix**: Clarify behavior: either preserve draft state and indicate it (e.g., “Draft restored”), or warn on cancel (“Discard draft?”) and/or persist until explicit discard.
