# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full harborwallet-mobile system, prioritizing the primary settings/privacy flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: True

## Summary

Harbor Wallet's mobile prototype exhibits significant interaction gaps and widespread mobile accessibility issues. Critical actions like Sign out, QR scanning, and Swap produce no feedback, and the Receive screen's segmented control is entirely non-functional. Furthermore, a systemic pattern of undersized tap targets across headers, segmented controls, and action buttons severely hampers touch usability, creating friction for core financial tasks.

## Issues (7)

### [HIGH] clicking-the-sign-out-button-performs — error recovery
- **Page**: `index.html: Sign out`
- **Problem**: Clicking the 'Sign out' button performs no visible action and provides no confirmation dialog, leaving the user logged in and unsure if the action registered.
- **Evidence**: Clicking the 'Sign out' button (ux-41) resulted in no visible state change, dialog, or navigation, failing to provide a confirmation step for a destructive action. (steps-13-18)
- **Suggested fix**: Implement a confirmation modal or sheet when 'Sign out' is tapped, asking the user to verify their intent before ending the session.

### [HIGH] the-segmented-control-for-receive-methods — feedback
- **Page**: `index.html: Bank, Crypto`
- **Problem**: The segmented control for receive methods (In-app, Bank, Crypto) is non-functional; tapping 'Bank' or 'Crypto' does not update the displayed content, trapping the user on the 'In-app' view.
- **Evidence**: Clicking the 'Bank' and 'Crypto' tabs (ux-35, ux-36) resulted in no visible text or URL change, confirming the entire segmented control is non-functional. (steps-07-12)
- **Suggested fix**: Ensure the segmented control updates the view with the appropriate receiving instructions and details for each tab, or disable unimplemented tabs with a visual indicator.

### [HIGH] tapping-the-qr-and-swap-buttons — feedback
- **Page**: `index.html: QR, ⇄ Swap`
- **Problem**: Tapping the 'QR' and '⇄ Swap' buttons results in dead taps with no visual feedback, modals, or navigation, leaving users uncertain if the app is unresponsive.
- **Evidence**: Clicking the 'QR' button (ux-13) and '⇄ Swap' button produced no visible change, URL change, or modal, indicating they are non-functional stubs lacking interaction feedback. (steps-31-36)
- **Suggested fix**: Either implement the QR scanner and Swap flows, or provide clear disabled states/toasts indicating these features are coming soon.

### [MEDIUM] the-send-link-and-save-image — feedback
- **Page**: `index.html: 📨 Send link, 📷 Save image`
- **Problem**: The '📨 Send link' and '📷 Save image' buttons on the Receive screen provide no feedback upon tapping, failing to confirm whether the link was sent or the image was saved.
- **Evidence**: Clicking '📨 Send link' (ux-40) and '📷 Save image' (ux-41) produced no visible text change, toast, or modal, failing to provide interaction feedback. (steps-49-53)
- **Suggested fix**: Display a brief toast notification (e.g., 'Link copied to clipboard' or 'Image saved to photos') to confirm the action was successful.

### [MEDIUM] tapping-the-notification-bell-icon-with — feedback
- **Page**: `index.html: 3 🔔`
- **Problem**: Tapping the notification bell icon with an active badge (3) produces no visible change, panel, or feedback, creating a dead-end interaction.
- **Evidence**: Clicking the notification bell (ux-1) produced no visible change or feedback, indicating a missing interaction state or dead-end for an active notification badge. (steps-01-06)
- **Suggested fix**: Open a notification panel or dropdown list when the bell is tapped, or remove the badge if the feature is not yet implemented.

### [MEDIUM] there-is-a-systemic-pattern-of — mobile usability
- **Page**: `index.html: ←, ⤴, In-app, Bank, Crypto, $20, $50, $100, Max, 📨 Send link, 📷 Save image`
- **Problem**: There is a systemic pattern of undersized tap targets across the app, with headers (36x36px), segmented controls (32px height), quick-fill buttons (25px height), and action buttons (41px height) all falling below the 44px mobile guidance.
- **Evidence**: Layout warnings consistently flagged small tap targets: back/share buttons (36x36px, 37x30px), segmented tabs (101x32px), quick-amount chips (25px height), and Receive action buttons (41px height). (steps-01-06, steps-43-48, steps-49-53)
- **Suggested fix**: Increase the padding and height of all interactive elements to meet the minimum 44x44px touch target guideline, particularly for frequently used controls like headers and segmented tabs.

### [LOW] tapping-the-settings-gear-icon-on — navigation
- **Page**: `index.html: ⚙`
- **Problem**: Tapping the settings gear icon (⚙) on the Account screen does not navigate to a settings view, blocking access to the Legal & privacy section.
- **Evidence**: Clicking the ⚙️ settings icon (ux-12) did not navigate to a settings screen; the app remained on the Account screen with no visible change. (steps-37-42)
- **Suggested fix**: Wire the gear icon to navigate to the Legal & privacy screen, or make the 'Legal & privacy' list item directly tappable.
