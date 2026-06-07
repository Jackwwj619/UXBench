# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full solstice-bank system, prioritizing the primary form/onboarding flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

The flow is generally understandable and well-scaffolded: the landing page has a clear entry point, the onboarding stepper communicates progress, and validation feedback is prominent when users miss required fields. However, several key interactions create friction on mobile, where compact controls, undersized buttons, and error-summary links reduce recoverability. A few important areas were not fully exercised, especially later-step behaviors like ID upload/liveness, risk questionnaire, funding, and review/edit recovery, so the critique is strongest for the early and middle onboarding steps.

## Issues (7)

### [HIGH] several-primary-controls-in-the-application — mobile usability
- **Page**: `apply.html mobile step 3 / mobile layout warnings`
- **Problem**: Several primary controls in the application are below recommended touch-target sizes, including checkbox/radio inputs, the Back button, and the Continue button. That makes the flow harder to complete accurately on mobile, especially in a long, multi-step form.
- **Evidence**: Mobile observations and layout warnings flagged tap targets as tiny: residence-type radios were 13x13px, Back was 71x39px, and Continue was 97x37px. Earlier mobile signals also noted small checkbox-sized controls and compact step buttons.
- **Suggested fix**: Increase all interactive targets to at least 44x44px on mobile, with more padding around radios/checkboxes and a taller Continue button. Keep the visual styling compact if needed, but expand the hit area.

### [HIGH] validation-state-does-not-clear-cleanly — feedback
- **Page**: `apply.html#err-anchor-1`
- **Problem**: Validation state does not clear cleanly after users enter or change values, so the page can continue showing required-field errors even when fields have been edited.
- **Evidence**: In mobile step 3, City was typed as "Austin" and State was changed to "AL," yet the visible inline messages still said "City is required" and "State is required." Earlier, typing an SSN also left the message "Social Security Number is required" visible.
- **Suggested fix**: Revalidate on input/change and update error states immediately when a field becomes valid. If validation is async or deferred, show a loading/processing state so the user knows the field has been accepted.

### [MEDIUM] error-summary-links-do-move-the — navigation
- **Page**: `apply.html error summary / #err-anchor-1`
- **Problem**: Error-summary links do move the URL to anchors, but the resulting view is not always clearly oriented to the target field, especially on mobile. One jump landed with the field partially offscreen, making recovery feel cramped rather than guided.
- **Evidence**: Clicking the mobile error-summary link for City updated the URL to `#err-anchor-1` and the City field became visible with its inline error. But a prior summary jump to Street address left the field partially offscreen, reducing clarity of the recovery state.
- **Suggested fix**: After following an error-summary link, scroll the target field fully into view with its label and error message centered or padded from the viewport edge. Consider adding focus management so the field is obviously active.

### [MEDIUM] the-residence-type-radio-buttons-are — forms
- **Page**: `apply.html: Residence type`
- **Problem**: The residence-type radio buttons are extremely small, and the selected state was not clearly changed by tapping. This makes a required choice hard to complete and easy to misread.
- **Evidence**: The residence-type control was reported at 13x13px on mobile, and a tap on the Rent radio left the visible state unchanged. The page still showed the form blocked by other validation errors, making it harder to tell whether this control responded at all.
- **Suggested fix**: Replace the bare radios with larger, card-like selectable rows or add substantial hit-area padding. Ensure the selected option gets a stronger visual treatment than a small filled dot.

### [MEDIUM] the-save-action-uses-modal-confirmation — clarity
- **Page**: `apply.html: Save & continue later`
- **Problem**: The save action uses modal confirmation and email language, but the control itself does not clearly indicate whether progress is stored locally, sent by email only, or both. That leaves the saving model somewhat ambiguous.
- **Evidence**: Clicking "Save & continue later" opened a confirmation saying "We’ve emailed you a resume link" and "The link expires in 14 days," while the underlying form remained visible. Earlier notes called the action trustworthy but ambiguous because the trigger does not say what was saved.
- **Suggested fix**: Label the control more explicitly, such as "Email me a resume link" or "Save progress and email a resume link." If local autosave exists, state that separately so users understand both behaviors.

### [LOW] the-why-solstice-link-behaves-like — clarity
- **Page**: `index.html header nav`
- **Problem**: The "Why Solstice" link behaves like a placeholder rather than a meaningful navigation destination. Clicking it only changes the URL to `#` and does not reveal any visible content.
- **Evidence**: Session memory noted that clicking "Why Solstice" only changed the URL to a bare hash (`#`) with no visible content. The link was therefore experienced as inert rather than informative.
- **Suggested fix**: Either route the link to a real page/section or remove it until content exists. If it is meant to expand inline, make that disclosure explicit with a caret or panel behavior.

### [LOW] the-landing-page-header-links-and — mobile usability
- **Page**: `index.html header / hero CTA`
- **Problem**: The landing page header links and top CTA are compact enough to fall below common mobile tap-size guidance, which can make entry and exploration harder on touch devices.
- **Evidence**: Mobile guidance flagged several targets as under 44px high: Help 31x21, Pricing 46x21, Sign in 45x21, Why Solstice 86x21, and Open an account 151x41. A page width warning also noted the landing page exceeded the 390px viewport.
- **Suggested fix**: Increase vertical padding on header links and the hero CTA, and verify the landing page fits mobile without horizontal overflow. Keep the primary CTA prominent, but give surrounding navigation enough space to tap comfortably.
