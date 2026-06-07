# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full larkfit-mobile system, prioritizing the primary docs/tutorial flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: True

## Summary

The Larkfit mobile app provides a visually clear layout and successful screen transitions, but suffers from critical dead taps on primary actions and pervasive mobile accessibility issues. Core user goals—starting a workout, adjusting goals, signing out, and accessing settings—are completely blocked by unresponsive buttons. Additionally, nearly all interactive elements fall below the 44px minimum mobile tap target guidance, severely impacting touch usability.

## Issues (8)

### [HIGH] clicking-the-primary-start-workout-cta — feedback
- **Page**: `index.html: Start workout`
- **Problem**: Clicking the primary 'Start workout' CTA produces no visible feedback, state change, or transition, leaving the user stranded without confirmation that the action was registered.
- **Evidence**: Clicking the 'Start workout' button (ux-19) produced no visible text change, state transition, or feedback, failing the objective's success criteria. (steps-13-18)
- **Suggested fix**: Implement immediate visual feedback (e.g., button loading state, haptic feedback) and transition to an active workout timer screen upon tapping 'Start workout'.

### [HIGH] the-button-on-the-today-screen — feedback
- **Page**: `index.html: +`
- **Problem**: The '+' button on the Today screen is a dead tap, providing no feedback or overlay when clicked.
- **Evidence**: Clicking the '+' button (ux-1) produced no visible change, text update, or modal overlay, failing the success criteria for actionable feedback. (steps-01-06)
- **Suggested fix**: Attach an event handler to the '+' button that opens a creation menu or modal, and provide touch feedback on tap.

### [HIGH] clicking-sign-out-produces-no-visible — error recovery
- **Page**: `index.html: Sign out`
- **Problem**: Clicking 'Sign out' produces no visible state change, dialog, or feedback, acting as a dead tap for a destructive action.
- **Evidence**: Clicking 'Sign out' (ux-23) produces no visible state change, dialog, or feedback, confirming it as a dead tap and a significant UX issue for a destructive action. (steps-19-24)
- **Suggested fix**: Implement a confirmation dialog ('Are you sure you want to sign out?') and clear state transition upon confirmation.

### [HIGH] the-settings-button-is-a-dead — feedback
- **Page**: `index.html: ⚙`
- **Problem**: The ⚙ settings button is a dead tap, providing no interaction feedback or navigation to a settings screen.
- **Evidence**: Clicking the ⚙ button (ux-21) produced no visible change, URL change, or feedback, failing the objective to open a settings screen. (steps-19-24, steps-43-48)
- **Suggested fix**: Ensure the ⚙ button navigates to a settings screen or opens a settings modal, and provides visual feedback on tap.

### [HIGH] a-systemic-pattern-of-undersized-tap — mobile usability
- **Page**: `index.html: Category filters, +, ▶, Adjust goals, Sign out`
- **Problem**: A systemic pattern of undersized tap targets plagues the app, with category filters (30px height), header buttons (36-38px), and CTAs (34px height) all falling below the 44px mobile guidance.
- **Evidence**: Multiple layout warnings detected: category filter buttons (30px), '+' button (38x38px), '▶' play buttons (36x36px), 'Adjust goals' (34px height), and 'Sign out' (43px height). (steps-01-06, steps-31-36, steps-43-48)
- **Suggested fix**: Increase the padding and hit areas of all interactive elements to meet the minimum 44x44px touch target size recommended by mobile accessibility guidelines.

### [MEDIUM] clicking-the-adjust-goals-button-results — feedback
- **Page**: `index.html: Adjust goals`
- **Problem**: Clicking the 'Adjust goals' button results in no visible change or modal, failing to provide a way to edit goals.
- **Evidence**: Clicking the 'Adjust goals' button (ux-22) resulted in no visible change or modal, failing the success criteria of opening a goal editing interface. (steps-19-24)
- **Suggested fix**: Implement a goal editing interface or modal that opens upon tapping 'Adjust goals', and provide visual feedback on interaction.

### [MEDIUM] the-share-button-in-the-workout — feedback
- **Page**: `index.html: ⤴`
- **Problem**: The ⤴ share button in the workout detail view is a dead tap, providing no feedback or sharing interface.
- **Evidence**: Clicking the ⤴ share button (ux-9) produced no visible feedback, dialog, or URL change, resulting in a dead tap. (steps-25-30)
- **Suggested fix**: Implement a share sheet or dialog that opens when the ⤴ button is tapped, and provide tactile or visual feedback on tap.

### [MEDIUM] the-time-period-selector-dropdown-on — accessibility
- **Page**: `index.html: ux-17`
- **Problem**: The time period selector dropdown on the Activity screen lacks an accessible label, aria-label, or placeholder.
- **Evidence**: Layout warning: A form field has no label, aria-label, or placeholder. Target: ux-17 (select dropdown for 'Last 30 days This week This year'). (final_observation)
- **Suggested fix**: Add a descriptive aria-label to the select element, such as aria-label='Select time period for activity data'.
