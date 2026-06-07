# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full solstice-bank system, prioritizing the primary form/onboarding flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

The Solstice Bank onboarding flow provides strong data-loss prevention through auto-save and clear inline validation, but suffers from severe mobile usability issues and a critical z-index bug. Interactive elements like checkboxes, radio buttons, and navigation links consistently fall below the 44px mobile tap target guidance, creating friction for touch users. Additionally, the help drawer's close button is completely blocked by the header, and dropdown selections fail to update the UI visually, undermining user confidence in the form's responsiveness.

## Issues (6)

### [HIGH] the-help-drawer-s-close-button — affordance
- **Page**: `apply.html #helpClose, .apply-bar`
- **Problem**: The help drawer's close button ('×') is completely blocked by the sticky application header, making it impossible to click or tap.
- **Evidence**: Click attempts on the 'Close help' button (ux-9) failed repeatedly with the error: '<header class="apply-bar">…</header> intercepts pointer events'. The user had to reload the page to escape the drawer.
- **Suggested fix**: Increase the z-index of the help drawer and its close button so that it layers above the sticky application header, or adjust the drawer's positioning so it doesn't overlap with the header.

### [HIGH] critical-interactive-elements-including-checkboxes-radio — mobile usability
- **Page**: `apply.html input[type='checkbox'], input[type='radio'], .btn-continue, .btn-back`
- **Problem**: Critical interactive elements—including checkboxes, radio buttons, and primary navigation buttons—are significantly smaller than the 44px minimum mobile tap target guidance.
- **Evidence**: Layout warnings consistently flagged Step 1 checkboxes (18x18px), Step 3 radio buttons (13x13px), 'Save & continue later' (154x18px), 'Continue' (97x37px), and 'Back' (71x39px) as undersized across multiple steps.
- **Suggested fix**: Increase the padding and overall hit areas for all interactive elements to meet the 44x44px minimum. For checkboxes and radio buttons, wrap the input inside a larger visible label container to expand the clickable area.

### [MEDIUM] when-selecting-an-option-from-a — feedback
- **Page**: `apply.html #stateSel, select[name='citizenship']`
- **Problem**: When selecting an option from a native dropdown (e.g., Citizenship, State), the visible text of the select element does not update to reflect the chosen value, even though the internal form state registers it.
- **Evidence**: Selecting 'US citizen' from the Citizenship dropdown (ux-14) resulted in feedback: 'No obvious URL or visible-text change was detected', yet clicking Continue successfully advanced the form. Similarly, the State dropdown (ux-25) visually reverted to 'Select…' after selection.
- **Suggested fix**: Ensure the JavaScript handling the form's step transitions or validation properly updates the display value of <select> elements upon the 'change' event, or use custom dropdown components that reliably reflect their selected state.

### [MEDIUM] the-validation-error-summary-links-at — mobile usability
- **Page**: `apply.html .error-summary a, a[href^='#err-anchor']`
- **Problem**: The validation error summary links at the top of the form have severely undersized tap targets, making them difficult to activate on mobile devices.
- **Evidence**: The 'Citizenship is required' error link (ux-16) was measured at 147x17px, and other error links like 'State is required' were 108x17px, far below the 44px mobile height guidance.
- **Suggested fix**: Increase the padding and line-height of error summary links so their tap targets meet the 44px height guidance, ensuring they are easily tappable on touch screens.

### [LOW] the-estimated-annual-income-field-lacks — visual hierarchy
- **Page**: `apply.html input[name='income']`
- **Problem**: The 'Estimated annual income' field lacks automatic currency formatting, displaying raw numbers instead of a formatted currency string.
- **Evidence**: When '85000' was typed into the income field (ux-33), it remained as '85000' instead of automatically formatting to '$85,000'.
- **Suggested fix**: Implement an input mask or auto-formatting that adds the '$' symbol and comma separators as the user types, matching the field's financial context.

### [LOW] step-1-requires-users-to-check — forms
- **Page**: `apply.html Step 1 Eligibility`
- **Problem**: Step 1 requires users to check four separate consent checkboxes before proceeding, which creates high initial interaction friction.
- **Evidence**: The form blocks progression until four distinct checkboxes ('US resident', '18+ years', 'PATRIOT Act', 'Terms of Service') are individually checked, each triggering a separate interaction.
- **Suggested fix**: Consider combining the non-legal checkboxes into a single 'I meet the eligibility requirements' statement, or use a single master consent checkbox that explicitly encompasses the required agreements, with links to the full legal texts.
