# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full civicport system, prioritizing the primary form/onboarding flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

CivicPort’s application wizard is generally understandable: progress persists, the left step tree and right-side checklist reinforce orientation, and autosave/fee updates provide useful state feedback. The main UX issues are mobile touch friction, several unlabeled form controls, and a few weak or missing affordances around navigation and help. Coverage is substantial but not complete; some project-type branches and the cancel confirmation path remain only partially explored.

## Issues (8)

### [HIGH] several-primary-controls-are-below-mobile — mobile usability
- **Page**: `apply.html mobile screenshot / layout_warnings`
- **Problem**: Several primary controls are below mobile tap-size guidance, making the wizard harder to use on touch devices.
- **Evidence**: Mobile observations repeatedly flagged small targets: Cancel is 56x17px, Back is 71x42px, Save and continue is 150x42px, and the Expedited review checkbox is 13x13px. The final mobile screenshot shows these same compact controls in the active step.
- **Suggested fix**: Increase hit areas to at least 44px tall, especially for Cancel, Back, Save and continue, and the expedited checkbox; add spacing so adjacent controls are easier to target.

### [HIGH] multiple-form-inputs-appear-to-be — accessibility
- **Page**: `apply.html`
- **Problem**: Multiple form inputs appear to be unlabeled or insufficiently labeled, reducing clarity and accessibility.
- **Evidence**: Session memory notes “one unlabeled input” and “a form field has no label, aria-label, or placeholder.” Later chunks also report two unlabeled date inputs and a large unlabeled textarea/number inputs in the wizard.
- **Suggested fix**: Add explicit labels and accessible names to every input, textarea, and date/number field; ensure labels remain visible or programmatically associated throughout the wizard.

### [MEDIUM] the-upload-controls-are-visible-and — feedback
- **Page**: `apply.html 3.3 Elevation drawings`
- **Problem**: The upload controls are visible and labeled, but the interaction provides no confirmed response in the observed attempts.
- **Evidence**: The final mobile view shows a clear “Elevation drawings (PDF) Upload” affordance, but the attempted click failed to target the control and no picker/open/focus state was observed. Earlier notes describe the upload row as discoverable but still unverified.
- **Suggested fix**: Provide immediate visual feedback on tap, such as focus, pressed state, or a native file-picker trigger that is obvious and confirmable; consider helper text like “Choose a PDF” or accepted file types.

### [MEDIUM] the-help-link-behaves-like-a — navigation
- **Page**: `index.html header Help`
- **Problem**: The Help link behaves like a placeholder and does not produce any visible content change.
- **Evidence**: Clicking Help only changed the URL to `index.html#` with no visible content change, and the header Help target was noted as very small (28x22px).
- **Suggested fix**: Replace the placeholder with a real help page, modal, or contextual support panel; enlarge the tap target so it’s usable on touch devices.

### [MEDIUM] the-fee-panel-is-initially-too — trust
- **Page**: `apply.html fee panel`
- **Problem**: The fee panel is initially too generic to be useful and only becomes informative after the user chooses a project type.
- **Evidence**: On entry the fee card reads “Pick a project type first” and shows $0, while the right rail checklist is also mostly empty. Only after project type selection does it update to a base fee and total estimate.
- **Suggested fix**: Show a more informative starting estimate or explain why the fee is unavailable until project type is chosen; consider previewing the fee ranges before branching.

### [MEDIUM] the-wizard-is-clear-once-in — clarity
- **Page**: `apply.html step headers / right rail`
- **Problem**: The wizard is clear once in motion, but some step names and conditional requirements rely on prior context rather than self-explanatory labels.
- **Evidence**: The mobile screen shows step titles like “3.3 Elevation drawings” and a condition note “Required because your project is an addition or structural,” while the checklist uses abstract items like “Scope described” and “Parcel verified.”
- **Suggested fix**: Make conditional explanations more explicit in the step header and checklist, and add short helper text that explains why the requirement is appearing now.

### [MEDIUM] the-history-page-shows-status-clearly — navigation
- **Page**: `my-applications.html`
- **Problem**: The history page shows status clearly, but there is no obvious row-level action or details link to continue tracking.
- **Evidence**: The my-applications page loads a clear table with App ID, Type, Address, Submitted, and Status columns, but the trajectory notes that no row-level action, link, or details affordance is visible.
- **Suggested fix**: Add a details link, row click affordance, or action menu for each application so users can drill into status, notes, and next steps.

### [LOW] cancel-is-protected-by-a-confirmation — feedback
- **Page**: `apply.html top-right Cancel`
- **Problem**: Cancel is protected by a confirmation dialog, but the trigger itself is tiny and easy to miss on mobile.
- **Evidence**: Clicking Cancel opened a modal with destructive confirmation and a recovery option (“Keep going”), but the Cancel control itself was measured at 56x17px in mobile view.
- **Suggested fix**: Keep the confirmation dialog, but enlarge the Cancel trigger and make its destructive nature clearer before the user opens it.
