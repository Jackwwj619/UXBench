# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full govuk-passport system, prioritizing the primary form/onboarding flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

The GOV.UK passport application form provides excellent wayfinding and contextual guidance, but suffers from systemic mobile usability issues due to undersized tap targets across navigation, form controls, and footer links. Error recovery paths are fragile, particularly for the photo upload step where programmatic file selection fails to clear visible error states. Additionally, branching logic for child applicants is incomplete, and critical footer links like the Accessibility Statement are broken.

## Issues (5)

### [HIGH] interactive-elements-such-as-radio-buttons — mobile usability
- **Page**: `index.html (mobile viewport)`
- **Problem**: Interactive elements such as radio buttons (40x40px), the 'Back' button (49x20px), the 'Continue' button (88x40px), and various navigation/footer links (17-26px height) fall below the 44px minimum mobile tap target guideline.
- **Evidence**: Layout warnings consistently flagged small tap targets across multiple steps and viewports. For example, on the passport details step (agentic-77-click-mobile.png), 17 layout warnings were triggered for elements like 'Home' (43x20px), 'Back' (49x20px), and 'Continue' (88x40px).
- **Suggested fix**: Increase the padding and height of all interactive elements to meet or exceed the 44x44px minimum touch target size. Use CSS padding on labels for radio buttons to expand the clickable area without changing the visual size of the input itself.

### [HIGH] when-a-user-attempts-to-recover — error recovery
- **Page**: `index.html#photo-upload`
- **Problem**: When a user attempts to recover from a photo upload validation error by clicking the 'Choose a demo photo file' link, the inline error message and error summary persist, failing to signal that the action was successful.
- **Evidence**: In steps-25-30, clicking 'Choose a demo photo file' did not visibly clear the inline error or error summary; the page title still read 'Error: Upload a digital photo' and visible text showed 'Error: Choose a demo photo file'.
- **Suggested fix**: Ensure that programmatic file selection via the demo link updates the UI state, clears the associated inline error and error summary, and provides visual confirmation that a file has been attached.

### [MEDIUM] clicking-the-accessibility-statement-link-in — navigation
- **Page**: `index.html (footer link 'Accessibility statement')`
- **Problem**: Clicking the 'Accessibility statement' link in the footer navigates the user back to the start page (#start) instead of revealing dedicated accessibility content.
- **Evidence**: In steps-37-42, clicking the 'Accessibility statement' link navigated back to the start page (#start) instead of revealing dedicated accessibility content, indicating a missing or broken target section.
- **Suggested fix**: Implement a dedicated accessibility statement section or page and update the footer link's href to point to the correct target.

### [MEDIUM] selecting-a-child-under-16-does — goal completion
- **Page**: `index.html#applicant-type`
- **Problem**: Selecting 'A child under 16' does not branch into child-specific fields; the subsequent step remains generic ('Has the applicant had a UK passport before?') as if it were an adult application.
- **Evidence**: In steps-37-42, after selecting 'A child under 16', the form advanced to the 'previous-passport' step, but the content was generic rather than branching into child-specific fields, indicating a lack of conditional routing.
- **Suggested fix**: Implement conditional routing to present child-specific questions and guidance when the 'A child under 16' option is selected.

### [LOW] selecting-a-radio-button-e-g — feedback
- **Page**: `index.html (radio button groups)`
- **Problem**: Selecting a radio button (e.g., 'In the UK', 'An adult') provides no immediately detected visible text change or enhanced visual feedback beyond the native browser control.
- **Evidence**: Multiple chunks (e.g., steps-07-12, steps-43-48) noted that radio buttons were successfully selected, 'though no visible text change occurred as expected for a radio selection state', suggesting a lack of a prominent custom selected state.
- **Suggested fix**: Enhance the selected state of radio buttons with a clear visual indicator, such as bolding the label text or adding a subtle background color change to the selected option.
