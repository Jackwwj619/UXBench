# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full solstice-bank system, prioritizing the primary form/onboarding flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: True

## Summary

The Solstice Bank onboarding flow has strong visual feedback for most interactions (e.g., checkboxes, dropdowns, progress), but faces issues with mobile tap targets, dropdown selection errors, and file upload validation clarity. Untested areas include some help and navigation links, but core flows (eligibility, personal info, contact, employment, ID verification, save later) were validated.

## Issues (6)

### [MEDIUM] mobile-tap-targets-for-key-elements — mobile usability
- **Page**: `apply.html (mobile viewport)`
- **Problem**: Mobile tap targets for key elements (e.g., 'Solstice' link, 'Save & continue later' button, error links) are smaller than 44x44px, violating mobile accessibility guidelines.
- **Evidence**: Layout warnings show 'Solstice' link (103x27px), 'Save & continue later' (154x18px), and 'Front of ID is required' link (143x17px) have tap targets below 44px height/width. Mobile viewport testing confirmed these small targets.
- **Suggested fix**: Increase the size of tap targets (e.g., buttons, links) to at least 44x44px. For example, expand the 'Save & continue later' button and 'Solstice' link to meet mobile interaction standards.

### [MEDIUM] dropdowns-e-g-state-industry-sometimes — affordance
- **Page**: `apply.html (Contact & address, Employment & income steps)`
- **Problem**: Dropdowns (e.g., 'State', 'Industry') sometimes select the wrong option (e.g., 'AL' instead of 'CA', 'Accounting & finance' instead of 'Design') during interaction, causing confusion and rework.
- **Evidence**: During testing, selecting 'CA' in 'State' dropdown resulted in 'AL' being selected, and 'Design (UX/graphic)' in 'Industry' resulted in 'Accounting & finance'. This occurred in both desktop and mobile viewports.
- **Suggested fix**: Fix the dropdown option selection logic to ensure the intended option is selected. Add visual confirmation (e.g., highlighting the selected option) to reduce ambiguity.

### [MEDIUM] file-upload-validation-feedback-is-unclear — feedback
- **Page**: `apply.html (Identity verification step)`
- **Problem**: File upload validation feedback is unclear: clicking 'Front of ID' file input triggers the file dialog, but the 'Front of ID is required' error persists until a file is selected, with no visual confirmation of the file selection attempt (e.g., file name display).
- **Evidence**: After clicking 'Front of ID' file input, the 'No file chosen' text remains, and the error message stays visible. Testing showed users may not realize the file dialog opened or their selection was registered.
- **Suggested fix**: Update the file upload UI to display the selected file name (e.g., 'document.jpg') and clear the error message once a file is chosen. This provides immediate feedback on the upload progress.

### [LOW] some-interactive-elements-e-g-solstice — accessibility
- **Page**: `apply.html`
- **Problem**: Some interactive elements (e.g., 'Solstice' link, 'Save & continue later' button) lack clear ARIA labels or roles, reducing accessibility for screen reader users.
- **Evidence**: The 'Solstice' link has no ARIA label, and the 'Save & continue later' button lacks a role description. This makes it harder for screen reader users to understand the purpose of these elements.
- **Suggested fix**: Add ARIA labels (e.g., aria-label='Return to Solstice Bank homepage' for the 'Solstice' link) and roles (e.g., role='button' for interactive buttons) to improve screen reader compatibility.

### [LOW] the-save-continue-later-button-initially — trust
- **Page**: `apply.html (mobile viewport)`
- **Problem**: The 'Save & continue later' button initially failed to trigger (timeout error) in mobile viewport, creating uncertainty about the save functionality.
- **Evidence**: Testing the 'Save & continue later' button in mobile viewport resulted in a timeout error (Locator.click: Timeout 4000ms exceeded) before the modal appeared, though subsequent attempts succeeded.
- **Suggested fix**: Investigate and fix the timeout issue with the 'Save & continue later' button to ensure consistent interaction. Add a loading indicator during the save process to provide feedback.

### [MEDIUM] the-front-of-id-is-required — goal completion
- **Page**: `apply.html (Identity verification step)`
- **Problem**: The 'Front of ID is required' error message is displayed, but the file upload UI does not clearly indicate how to resolve it (e.g., no visual cue that a file must be selected).
- **Evidence**: The error message is shown, but the 'Choose File' button and 'No file chosen' text do not explicitly guide the user to select a file. Testing showed users may overlook the file upload requirement.
- **Suggested fix**: Enhance the file upload section with clear instructions (e.g., 'Click to upload front of ID') and highlight the 'Choose File' button to draw attention to the required action. Update the error message to be more actionable (e.g., 'Please upload the front of your ID').
