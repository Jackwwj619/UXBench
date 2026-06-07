# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full civicport system, prioritizing the primary form/onboarding flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

The CivicPort application demonstrates strong transparency with real-time fee calculations and a dynamic 'What You'll Need' checklist that effectively guides users through complex conditional requirements. However, the experience is severely compromised by critical mobile accessibility failures, specifically undersized tap targets (often <44px) for primary actions like 'Cancel', 'Look up', and checkboxes, making the form difficult to use on touch devices. Additionally, several key form inputs lack programmatic labels, creating barriers for screen reader users and reducing overall form clarity.

## Issues (5)

### [HIGH] critical-interactive-elements-have-tap-targets — mobile usability
- **Page**: `apply.html: #confirmCancel, .btn-lookup, input[type='checkbox']`
- **Problem**: Critical interactive elements have tap targets significantly smaller than the recommended 44x44px minimum, leading to high friction and potential mis-taps on mobile viewports.
- **Evidence**: Layout warnings and DOM analysis confirm the 'Cancel' button is 56x17px, the 'Look up' button is 80x35px, and the 'Expedited review' checkbox is only 13x13px. The agent noted these as 'significant usability risks' in steps 73-78 and 79-79.
- **Suggested fix**: Increase the padding and height of all buttons and checkboxes to ensure a minimum hit area of 44x44px. For the checkbox, consider enlarging the clickable label area or using a larger custom toggle switch.

### [HIGH] multiple-form-inputs-including-street-address — accessibility
- **Page**: `apply.html: input#street-address, input#city, input#license-number`
- **Problem**: Multiple form inputs, including 'Street address', 'City', and 'License number', lack visible labels or proper ARIA associations, relying solely on spatial proximity to headings.
- **Evidence**: DOM summaries in steps 07-12 and 61-66 flag 'missing_input_label' for ux-2 (Street address), ux-3 (City), and ux-26 (License number). The agent observed that these fields rely on surrounding text rather than explicit `<label>` tags.
- **Suggested fix**: Add explicit `<label>` elements associated with each input via `for`/`id` attributes. If visual labels are not desired for design reasons, use `aria-label` or `aria-labelledby` to provide accessible names.

### [MEDIUM] the-parcel-lookup-input-field-does — forms
- **Page**: `apply.html: input[name='parcel-id']`
- **Problem**: The parcel lookup input field does not provide real-time validation feedback; errors only appear after clicking 'Look up', and valid inputs do not show success states until the button is clicked.
- **Evidence**: In steps 73-78, the agent typed an invalid ID and noted 'no immediate... visual feedback'. In step 79, typing a valid ID from the error message still showed the previous error until 'Look up' was clicked again.
- **Suggested fix**: Implement client-side format validation (e.g., regex for parcel ID pattern) that triggers on blur. If the format is correct, show a subtle 'ready to lookup' state. If incorrect, show an immediate format error.

### [MEDIUM] conditional-logic-fails-to-hide-irrelevant — clarity
- **Page**: `apply.html: div.contractor-fields, input[name='role']`
- **Problem**: Conditional logic fails to hide irrelevant fields, specifically the 'License number' input remains visible and enabled even when 'Owner' is selected instead of 'Contractor'.
- **Evidence**: Step 25-30 notes: 'Conditional logic failure: The License number input field remains visible and enabled after selecting Owner, failing to hide or disable irrelevant fields.'
- **Suggested fix**: Ensure that selecting 'Owner' dynamically hides or disables the 'License number' field and its label. Add a clear visual transition (fade/slide) to indicate the change in context.

### [LOW] checking-the-removal-of-any-tree — feedback
- **Page**: `apply.html: input[name='tree-removal']`
- **Problem**: Checking the 'Removal of any tree >6" caliper' checkbox did not trigger any update in the estimated fees or the checklist, leaving the user unsure if the action was registered or if it has financial implications.
- **Evidence**: Step 55-60 notes: 'No dynamic updates were observed in the Estimated Fees card... or the What you'll need checklist following this action.'
- **Suggested fix**: If this condition incurs a fee, add it to the estimator. If not, consider adding a note in the 'What You'll Need' section or a toast notification confirming the preference has been saved.
