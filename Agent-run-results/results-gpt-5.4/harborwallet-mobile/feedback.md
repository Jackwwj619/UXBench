# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full harborwallet-mobile system, prioritizing the primary settings/privacy flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: True

## Summary

Harbor Wallet’s mobile shell looks polished and the main dashboard, Send, Receive, and Account areas are easy to reach, but several important controls behave like dead ends or give unclear state feedback. The privacy/settings area is visible, yet core adjacent actions such as the Account gear, notifications, Top up, Send continuation, and Sign out often produce no response, which weakens trust. The biggest usability issue is navigation clarity: the Activity screen appears blank/sparse, and the tab bar can show Activity as active while Home content is on screen.

## Issues (7)

### [HIGH] the-bottom-tab-bar-can-indicate — navigation
- **Page**: `index.html bottom tab bar; screenshot /Users/timchef/UXBench/results-gpt-5.4/harborwallet-mobile/_run/screenshots/agentic-56-click-mobile.png`
- **Problem**: The bottom tab bar can indicate the wrong active section after navigation, so the visible content and selected tab do not match.
- **Evidence**: After tapping Home from the sparse Activity state, the dashboard content returned (greeting, total balance, assets, recent activity), but the tab bar still showed Activity highlighted. This was observed in the final mobile state and called out in steps 55-56.
- **Suggested fix**: Ensure tab highlighting is always derived from the currently visible screen state, and verify recovery flows like Activity → Home update both content and selected-tab styling together.

### [HIGH] the-activity-destination-appears-mostly-blank — goal completion
- **Page**: `index.html Activity screen; screenshot /Users/timchef/UXBench/results-gpt-5.4/harborwallet-mobile/_run/screenshots/agentic-55-click-mobile.png`
- **Problem**: The Activity destination appears mostly blank/sparse, leaving users without clear history content, explanation, or next steps.
- **Evidence**: Clicking the Activity tab changed the view and highlighted Activity, but the resulting screen appeared blank in prior screenshots/chunks. On mobile, tapping 'See all' changed the view to Activity, yet visible text was reduced to essentially the status bar and tab bar ('8:29 ⌂ Home ↑ Send ↓ Receive 📊 Activity ◉ Account').
- **Suggested fix**: Provide a real activity list or, if intentionally empty, add a clear empty-state message with context such as 'No recent activity yet' plus a recovery/action prompt.

### [HIGH] several-prominent-controls-appear-tappable-but — feedback
- **Page**: `index.html Home, Account, and Send screens; controls: notification badge, + Top up, ⚙, Sign out, Continue →`
- **Problem**: Several prominent controls appear tappable but produce no visible response, making important actions feel broken or unreliable.
- **Evidence**: No visible state change was observed after tapping the notification badge ('3 🔔'), '+ Top up', the Account gear, 'Sign out', or the Send screen's 'Continue →' button after entering a valid amount. Repeated checks showed same URL, same visible content, and no dialog/sheet in DOM summaries.
- **Suggested fix**: For each primary action, either complete the next step or provide immediate system feedback such as navigation, a sheet, a confirmation dialog, loading state, disabled-state rationale, or inline error/help text.

### [MEDIUM] the-send-flow-gives-good-amount — goal completion
- **Page**: `index.html Send money screen; control: Continue →`
- **Problem**: The send flow gives good amount-entry feedback, but after entering a valid amount the primary CTA does not advance or explain what is missing.
- **Evidence**: Selecting $100 updated the amount and visibly selected the chip, but tapping 'Continue →' caused no URL or visible-text change; the screen remained on the same keypad/contact-picker state with no review step, recipient prompt, or error.
- **Suggested fix**: If recipient selection is required before continuing, make that dependency explicit near the CTA or disable the button with a clear reason. Otherwise, advance to the next send step or show inline validation.

### [MEDIUM] multiple-important-controls-are-below-recommended — accessibility
- **Page**: `index.html across Home, Send, Receive, and Account screens`
- **Problem**: Multiple important controls are below recommended mobile tap-target size, especially in high-frequency or high-risk areas.
- **Evidence**: Observed small targets include the notification badge at 38x38px, 'See all' at 42x16px, Account gear at 34x30px, Send back at 36x36px, QR at 45x30px, receive-method tabs at 32px height, and amount chips around 50-57x25px.
- **Suggested fix**: Increase tap areas to at least 44x44px for icon buttons, links, segmented controls, and amount chips, even if the visible icon/text remains small.

### [MEDIUM] the-privacy-entry-is-clearly-visible — clarity
- **Page**: `index.html Account screen; rows including 'Legal & privacy' and header gear`
- **Problem**: The privacy entry is clearly visible, but the settings list appears inconsistently exposed to interaction tooling, and a nearby settings affordance (gear) does nothing, which muddies the path to privacy controls.
- **Evidence**: The Account screen visibly includes 'Legal & privacy', 'Personal info', and 'Security & passkeys', but the chunk notes that visible settings rows were absent from the interactables list. A mis-targeted attempt hit 'Sign out' instead, and tapping the gear later showed no visible response.
- **Suggested fix**: Strengthen row affordance with consistent chevrons, larger hit areas, and reliable tap behavior, and make sure the header gear either opens a meaningful settings destination or is removed to avoid competing dead-end paths.

### [LOW] feedback-quality-is-inconsistent-across-receive — feedback
- **Page**: `index.html Receive money screen; controls: Copy, 📨 Send link`
- **Problem**: Feedback quality is inconsistent across receive actions: Copy gives clear confirmation, but related share actions do not.
- **Evidence**: Tapping 'Copy' changed the button to a green '✓ Copied' state, while '📨 Send link' produced no visible feedback, no dialog, and no text change. Method switching to Crypto did show a meaningful content update, but other receive controls remained small.
- **Suggested fix**: Match the successful 'Copied' pattern across other receive/share actions with immediate inline confirmation, toast feedback, or a visible share sheet.
