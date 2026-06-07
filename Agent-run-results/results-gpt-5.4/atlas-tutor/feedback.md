# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full atlas-tutor system, prioritizing the primary settings/privacy flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: True

## Summary

Atlas Tutor presents a polished tutoring layout and some inline tools work, but the experience is undermined by many controls that appear tappable yet produce no visible response. The most serious UX issues affect core confidence and task completion: the only visible settings/privacy entry point appears inert, sending prompts shows no confirmation, and multiple navigation/action controls fail silently on both desktop and mobile. Mobile compounds the problem with dense layout and many undersized tap targets, making hidden or subtle state changes easy to miss.

## Issues (7)

### [HIGH] the-only-visible-settings-affordance-appears — goal completion
- **Page**: `index.html profile footer gear button`
- **Problem**: The only visible settings affordance appears nonfunctional or gives no feedback when activated.
- **Evidence**: Session memory notes that clicking the footer gear (22×21px) produced no URL, text, dialog, or visible state change, and context remained on the same chat thread with unchanged rails.
- **Suggested fix**: Make the settings entry open a clear destination such as a panel, modal, or page, and provide immediate feedback on tap/click. Add a text label or tooltip and increase the target size so users can recognize it as the privacy/settings entry point.

### [HIGH] submitting-a-drafted-prompt-appears-to — goal completion
- **Page**: `index.html composer send button and textarea`
- **Problem**: Submitting a drafted prompt appears to fail silently, especially on mobile, with no new message, loading state, or cleared draft.
- **Evidence**: Clicking the send arrow after chip selection produced no detectable change in desktop testing. In mobile testing, typing into the composer enabled the send arrow visually, but clicking it produced no new user message or assistant reply; pressing Enter also produced no visible send state.
- **Suggested fix**: Show immediate submission feedback such as appending the user message, a spinner/typing state, disabled send button, or error message if submission is unavailable. Ensure keyboard submit and button submit behave consistently.

### [HIGH] important-side-rail-features-are-not — mobile usability
- **Page**: `index.html mobile header Practice button / right-rail content`
- **Problem**: Important side-rail features are not discoverable on mobile, and the visible Practice shortcut does not reveal them.
- **Evidence**: On mobile, the interface remained focused on the chat thread; practice cards, concepts, and progress were not visible. Tapping '▶ Practice' produced no observable response, and scrolling to reveal more content stayed at y=0 with no newly exposed sections.
- **Suggested fix**: Make Practice open a drawer, jump target, tab, or bottom sheet on mobile, and ensure related study tools are reachable through an explicit responsive navigation pattern rather than relying on hidden side rails.

### [MEDIUM] multiple-controls-look-interactive-but-respond — feedback
- **Page**: `index.html header overflow, message actions, composer icons, concepts card`
- **Problem**: Multiple controls look interactive but respond with no visible feedback, making the interface feel unreliable.
- **Evidence**: Testing found no visible response from the top-bar overflow button on desktop and mobile, the Share action opened no dialog or confirmation, the microphone button showed no permission or recording state, the attachment button showed no picker or feedback, and concept links such as 'Chain rule' and 'Derivatives of trig functions' stayed unchanged with href='#'.
- **Suggested fix**: Either implement these actions fully or add explicit disabled states, helper text, or lightweight confirmations. For links that are not real navigation, restyle them as informational text or show active-state/highlight/scroll behavior so users understand what changed.

### [MEDIUM] suggestion-chips-behave-as-draft-fill — clarity
- **Page**: `index.html suggestion chip row and composer`
- **Problem**: Suggestion chips behave as draft-fill actions, but the interface does not clearly communicate that they do not start a new exchange automatically.
- **Evidence**: Clicking chips like 'tan(√x) — derive it', 'Big-O of merge sort', and 'Why is i² = −1?' populated the composer and enabled send, while the visible lesson header and conversation remained on 'Chain rule — when both functions move'.
- **Suggested fix**: Clarify chip behavior with copy like 'Add to prompt' or auto-submit them as full prompts. If they only draft text, consider previewing that this will continue the current thread unless the user starts a new chat.

### [MEDIUM] several-successful-actions-confirm-only-through — feedback
- **Page**: `index.html message action row and code block run control`
- **Problem**: Several successful actions confirm only through tiny icon swaps or localized changes that are easy to miss.
- **Evidence**: Copy changed to a compact '✓' state on mobile with no visible 'Copied' message; thumbs-up became a '✓' button with ambiguous meaning; Try again also led to a tiny '✓' state without clear regeneration feedback; Run changed to '✓ Executed' and showed output, but the automation still detected no obvious page-level change.
- **Suggested fix**: Use explicit microcopy or toast feedback such as 'Copied', 'Thanks for the feedback', 'Regenerating…', or 'Executed'. Pair status text with stronger visual emphasis and keep the resulting state readable rather than reducing it to a bare checkmark.

### [MEDIUM] many-controls-are-icon-only-and — accessibility
- **Page**: `index.html mobile and desktop header/composer/action controls`
- **Problem**: Many controls are icon-only and below recommended mobile tap size, which hurts discoverability and touch accuracy.
- **Evidence**: Layout warnings flag small targets including the settings gear at 22×21px, overflow at 39×44 or 39×31, reaction buttons at 32×29, Share/Copy around 65×29, Try again at 78×29, Run at 54×22, and attachment/send/mic controls around 36–37px wide.
- **Suggested fix**: Increase interactive hit areas to at least recommended touch dimensions, add visible labels or tooltips for ambiguous icons, and prioritize larger, clearer controls for primary actions like settings, overflow, feedback, and send.
