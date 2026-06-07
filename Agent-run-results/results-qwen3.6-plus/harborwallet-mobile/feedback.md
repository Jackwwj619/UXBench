# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full harborwallet-mobile system, prioritizing the primary settings/privacy flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

The Harbor Wallet mobile app demonstrates functional numeric input and clear visual hierarchy in the 'Send' flow, but suffers from critical validation gaps and accessibility issues. Users can enter amounts vastly exceeding their balance without immediate error feedback, and key interactive elements (quick-select chips, header icons) fall below standard mobile tap-target guidelines, increasing the risk of mis-taps.

## Issues (4)

### [HIGH] the-application-allows-users-to-enter — error recovery
- **Page**: `index.html: Send money screen, Amount display vs Available balance`
- **Problem**: The application allows users to enter transaction amounts significantly higher than their available balance ($203M vs $5,820) without providing any immediate visual error, warning, or disabled state on the 'Continue' button.
- **Evidence**: In the final observation, the display shows '$ 203,456,789' while 'Available $5,820.16' is visible above. The 'Continue →' button remains visually active (dark blue), implying the action is possible, which leads to user confusion upon submission failure.
- **Suggested fix**: Implement real-time validation that disables the 'Continue' button and displays an inline error message (e.g., 'Insufficient funds') when the entered amount exceeds the available balance.

### [MEDIUM] the-quick-select-amount-chips-20 — mobile usability
- **Page**: `index.html: .quick-amount-chips (ux-14 to ux-17)`
- **Problem**: The quick-select amount chips ($20, $50, $100, Max) have a height of only 25px, which is significantly below the recommended 44px minimum for mobile touch targets.
- **Evidence**: Layout warnings in the DOM summary identify targets ux-14 through ux-17 with heights of 25px. This small vertical hit area increases the likelihood of missed taps or accidental adjacent selections on touch devices.
- **Suggested fix**: Increase the height of the quick-select chips to at least 44px, or add invisible padding around the buttons to expand the clickable area without altering the visual design.

### [MEDIUM] header-navigation-controls-back-arrow-and — affordance
- **Page**: `index.html: Header controls (ux-12, ux-13)`
- **Problem**: Header navigation controls (Back arrow and QR button) have tap targets smaller than the 44px guideline (36x36px and 45x30px respectively).
- **Evidence**: Layout warnings flag ux-12 (Back) and ux-13 (QR) as small tap targets. The QR button is particularly narrow vertically (30px).
- **Suggested fix**: Expand the touch bounds of the header icons to 44x44px while keeping the icon visual size consistent.

### [LOW] the-continue-button-appears-enabled-even — clarity
- **Page**: `index.html: Recipient list and Continue button state`
- **Problem**: The 'Continue' button appears enabled even when no specific recipient avatar is highlighted, relying on implicit text search or default states.
- **Evidence**: Session memory notes that clicking 'Continue' without explicit avatar selection resulted in no state change or error, yet the button remained visually active. The UI does not clearly distinguish between 'search typed' and 'recipient selected'.
- **Suggested fix**: Visually highlight the selected recipient avatar or clearly indicate in the search bar that a valid recipient has been chosen before enabling the primary action.
