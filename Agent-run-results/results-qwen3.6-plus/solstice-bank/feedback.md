# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full solstice-bank system, prioritizing the primary form/onboarding flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

The Solstice Bank onboarding flow suffers from critical mobile usability issues, specifically regarding touch target sizes that fall below accessibility standards. Users face significant friction during identity verification due to aggressive validation errors that persist despite successful alternative verification steps (liveness check) and confusing error recovery mechanisms where clicking error links fails to focus the correct input fields.

## Issues (5)

### [HIGH] critical-interactive-elements-including-the-continue — mobile usability
- **Page**: `apply.html: #ux-7 (Continue), #ux-15 (Back), #ux-2 (Save & continue later)`
- **Problem**: Critical interactive elements, including the 'Continue' button (37px height), 'Back' button (39px height), and 'Save & continue later' link (18px height), are significantly smaller than the recommended 44px minimum touch target size.
- **Evidence**: Layout warnings in steps-67-72 and agentic-79-click identify tap targets for 'Continue' (97x37px), 'Back' (71x39px), and 'Save & continue later' (154x18px) as failing mobile guidelines. The final observation confirms these dimensions.
- **Suggested fix**: Increase the vertical padding of all primary buttons and interactive links to ensure a minimum height of 44px. Ensure adequate spacing between adjacent touch targets to prevent accidental activation.

### [HIGH] clicking-the-inline-error-link-front — error recovery
- **Page**: `apply.html: #err-anchor-0 (Front of ID error link)`
- **Problem**: Clicking the inline error link 'Front of ID is required' triggers an anchor jump that scrolls the viewport to the wrong location (the 'Back of ID' field) instead of focusing the 'Front of ID' input.
- **Evidence**: In steps-73-78, the agent noted: 'Visual evidence... shows the page scrolled to the Back of ID input field rather than the Front of ID field associated with the error.' The screenshot agentic-73-click-mobile.png confirms the misalignment.
- **Suggested fix**: Verify and correct the ID references for anchor links so that clicking an error message scrolls directly to and focuses the specific input field causing the error.

### [MEDIUM] the-front-of-id-is-required — feedback
- **Page**: `apply.html: Step 5 Identity Verification section`
- **Problem**: The 'Front of ID is required' validation error persists even after the user successfully completes the 'Liveness check' (which shows a 'Verified' state). The system does not clarify if the liveness check substitutes for the file upload or if both are strictly required.
- **Evidence**: In the final observation (agentic-80-wait), the UI shows a green 'Verified' checkmark for the liveness check, but the red 'Front of ID is required' error remains visible under the file input. The 'Continue' button state is ambiguous in this mixed-success state.
- **Suggested fix**: If the liveness check satisfies the identity requirement, dynamically clear the file upload error. If both are required, update the error copy to be more specific (e.g., 'Photo of ID still needed') and ensure the 'Continue' button state clearly reflects the blocking issue.

### [MEDIUM] the-file-input-fields-choose-file — forms
- **Page**: `apply.html: #ux-30, #ux-31`
- **Problem**: The file input fields ('Choose File') have a very small vertical height (21px) and lack clear visual affordance for touch interaction, making them difficult to tap accurately on mobile.
- **Evidence**: Final observation DOM summary shows #ux-30 (Front of ID) and #ux-31 (Back of ID) have a height of only 21px. Steps-73-78 notes: 'The Back of ID file input... has a very small vertical height (21px), making the touch target difficult to hit.'
- **Suggested fix**: Replace the default browser file input with a custom-styled button or drop-zone area that meets the 44px touch target guideline and provides clear visual feedback when tapped.

### [LOW] the-continue-button-remains-visually-disabled — clarity
- **Page**: `apply.html: Step 1 Eligibility`
- **Problem**: The 'Continue' button remains visually disabled/dimmed until all four eligibility checkboxes are checked, but there is no immediate inline feedback indicating which specific legal consents are missing if the user misses one.
- **Evidence**: Steps-01-06 notes: 'Despite checking two eligibility boxes... the Continue button remains visually disabled... indicating strict dependency on all four checkboxes.' Users must hunt for the unchecked box.
- **Suggested fix**: Consider adding a subtle hint near the 'Continue' button if it's disabled, such as 'Please accept all terms to continue,' or highlight the unchecked required fields more prominently.
