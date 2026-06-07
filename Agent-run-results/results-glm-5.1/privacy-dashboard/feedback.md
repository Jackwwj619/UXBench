# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full privacy-dashboard system, prioritizing the primary settings/privacy flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

The privacy dashboard provides strong structural clarity and safe destructive action patterns, but suffers from severe mobile usability issues and a trapping details drawer. Critical interactive elements like checkboxes (16x16px), interest remove buttons (20x20px), and navigation links fall far below the 44px mobile tap target guidance. Additionally, the details drawer lacks responsive layout and keyboard support, causing users to become stuck, while the Privacy Checkup 'Start' button fails to initiate its flow.

## Issues (7)

### [HIGH] activity-item-checkboxes-have-a-tap — mobile usability
- **Page**: `index.html input[type='checkbox'][data-select-activity]`
- **Problem**: Activity item checkboxes have a tap target size of only 16x16px, making them incredibly difficult to accurately select on touch screens.
- **Evidence**: Multiple layout warnings and interaction logs show checkboxes (e.g., ux-161, ux-164) are 16x16px, far below the 44px mobile guidance.
- **Suggested fix**: Increase the checkbox tap target area to at least 44x44px using CSS padding or a larger custom checkbox component.

### [HIGH] the-details-drawer-s-close-button — navigation
- **Page**: `index.html #closeDrawer`
- **Problem**: The details drawer's close button is positioned outside the standard desktop viewport (x: 1636 on a 1440px screen) and cannot be scrolled to, trapping the user in the drawer view.
- **Evidence**: Click failed for Close details: element is outside of the viewport. Clicking the button (ux-40) repeatedly timed out because it overflows the viewport width.
- **Suggested fix**: Ensure the drawer close button is positioned responsively within the viewport bounds (e.g., using `right: 16px` instead of a large fixed offset).

### [HIGH] the-details-drawer-does-not-close — accessibility
- **Page**: `script.js drawer close logic`
- **Problem**: The details drawer does not close when the Escape key is pressed, violating standard modal/drawer accessibility patterns.
- **Evidence**: Pressing Escape did not close the details drawer; the 'Close details' button (ux-40) remained visible, indicating the drawer was still open.
- **Suggested fix**: Add a keydown event listener for the Escape key to the details drawer that triggers the close action.

### [MEDIUM] the-remove-buttons-for-ad-interests — mobile usability
- **Page**: `index.html .interest-remove-button`
- **Problem**: The 'Remove' buttons for ad interests (e.g., Cloud storage, Travel) are only 20x20px, making them very difficult to tap on mobile devices.
- **Evidence**: Interaction logs note that remove buttons (e.g., ux-92) are 20x20px, significantly below the 44px mobile tap target guidance.
- **Suggested fix**: Increase the tap target of the remove buttons to at least 44x44px, or make the entire interest chip clickable to trigger removal.

### [MEDIUM] clicking-the-start-button-for-the — feedback
- **Page**: `index.html #checkupModal .start-button`
- **Problem**: Clicking the 'Start' button for the Privacy checkup results in no visible change or navigation, failing to initiate the step progression.
- **Evidence**: Clicking the 'Start' button (ux-19) resulted in no visible change or navigation, failing to initiate the step progression.
- **Suggested fix**: Ensure the 'Start' button triggers a visible state change, such as advancing to the first checkup step or expanding the checkup recommendations.

### [MEDIUM] clicking-save-retention-provides-no-explicit — feedback
- **Page**: `index.html #saveRetention`
- **Problem**: Clicking 'Save retention' provides no explicit confirmation message (e.g., toast or inline text) to reassure the user that the preference was saved.
- **Evidence**: No explicit confirmation message (e.g., toast, inline success text) is visible in the current observation to clearly reassure the user that the preference was saved.
- **Suggested fix**: Display a brief, non-intrusive success toast or inline message like 'Retention preference saved' after the action completes.

### [LOW] the-confirmation-dialog-uses-delete-as — clarity
- **Page**: `index.html #confirmModal .confirm-button`
- **Problem**: The confirmation dialog uses 'Delete' as the confirm action label instead of 'Revoke', which mismatches the initiating 'Revoke access' action.
- **Evidence**: The confirmation dialog uses 'Delete' as the confirm action label instead of 'Revoke', which might cause slight cognitive friction since the initiating action was 'Revoke access'.
- **Suggested fix**: Align the confirmation button label with the initiating action by changing 'Delete' to 'Revoke' in the app access confirmation dialog.
