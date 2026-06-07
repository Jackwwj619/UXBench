# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full atlas-tutor system, prioritizing the primary settings/privacy flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: True

## Summary

The Atlas Tutor interface suffers from widespread non-functional controls and a complete lack of responsive design, creating a frustrating and confusing user experience. Critical interactive elements—such as settings, new chat, suggestion chips, concept links, and practice features—are unresponsive, leaving users without feedback or the ability to complete key tasks. Furthermore, the layout fails to adapt to mobile viewports, and numerous tap targets fall below accessibility guidelines, making the application practically unusable on touch devices.

## Issues (8)

### [HIGH] clicking-the-settings-button-produces-no — goal completion
- **Page**: `index.html: ⚙ (ux-4)`
- **Problem**: Clicking the settings button (⚙) produces no visible change, dialog, or navigation, completely blocking the user from accessing settings or privacy controls.
- **Evidence**: Session memory and chunk steps-01-06 note that clicking the settings button (ux-4) produced no visible change or dialog, failing to reveal the settings/privacy view.
- **Suggested fix**: Implement a functional settings panel or modal that opens when the ⚙ button is clicked, ensuring users can access and modify their privacy preferences.

### [HIGH] clicking-the-new-chat-button-yields — feedback
- **Page**: `index.html: + New chat (ux-2)`
- **Problem**: Clicking the '+ New chat' button yields no visual feedback, URL change, or clearing of the current conversation, leaving users uncertain if the action was registered.
- **Evidence**: Chunk steps-01-06 indicates clicking '+ New chat' (ux-2) produced no visible change or URL update, and the interface remained on the existing conversation.
- **Suggested fix**: Clear the chat area, reset the context, and shift focus to the textarea when '+ New chat' is clicked to provide clear, immediate feedback.

### [HIGH] suggestion-chips-e-g-tan-x — affordance
- **Page**: `index.html: Suggestion chips (ux-28, ux-30, ux-31)`
- **Problem**: Suggestion chips (e.g., 'tan(√x) — derive it', 'Big-O of merge sort') are completely non-functional; clicking them does not populate the textarea, send a message, or provide any visual feedback.
- **Evidence**: Chunks steps-01-06 and steps-13-18 confirm that clicking various suggestion chips resulted in no visible change, text population, or message submission, establishing a consistent broken pattern.
- **Suggested fix**: Wire suggestion chip click handlers to either populate the chat input field or directly submit the query as a new chat message.

### [HIGH] the-three-column-desktop-layout-does — mobile usability
- **Page**: `index.html (Layout / CSS)`
- **Problem**: The three-column desktop layout does not adapt to mobile viewports; the left and right rails remain fully visible and uncompressed, causing severe horizontal scrolling and content squishing.
- **Evidence**: Chunks steps-25-30 and steps-37-42 note that reloading with a mobile viewport parameter kept the layout three-column (left rail at x=12, center at x=307, right rail at x=989), failing to adapt to a 375px width.
- **Suggested fix**: Implement responsive CSS (e.g., media queries) to stack the columns vertically on narrow viewports, hiding sidebars behind hamburger menus or bottom navigation.

### [MEDIUM] all-concept-links-in-the-right — navigation
- **Page**: `index.html: Right rail concept links (ux-44, ux-45)`
- **Problem**: All concept links in the right rail (e.g., 'Chain rule', 'Derivatives of trig functions') are dead links (href='#') that provide no navigation, content expansion, or visual feedback when clicked.
- **Evidence**: Chunks steps-07-12 and steps-13-18 confirm that clicking concept links only appends '#' to the URL without scrolling, expanding, or providing feedback, reinforcing a dead-link pattern.
- **Suggested fix**: Link concepts to relevant sections within the chat, expand inline definitions, or navigate to dedicated subject pages. Remove or disable links if the content is not yet available.

### [MEDIUM] practice-panel-interactions-such-as-the — feedback
- **Page**: `index.html: 💡 Hint (ux-33), ✓ Executed (ux-15)`
- **Problem**: Practice panel interactions—such as the '💡 Hint' button and the '✓ Executed' state—provide no feedback, hints, or state progression, making the practice feature feel stuck or broken.
- **Evidence**: Chunk steps-07-12 notes the Hint button produced no text or tooltip; chunk steps-43-48 notes clicking '✓ Executed' produced no visible change, suggesting the state machine is stuck.
- **Suggested fix**: Ensure the Hint button reveals a contextual tooltip or inline text, and clearly transition the problem state (e.g., to 'Correct' or 'Incorrect') upon submission.

### [MEDIUM] multiple-interactive-elements-e-g-share — accessibility
- **Page**: `index.html: Message actions (ux-4 to ux-8), ⚙, ⋯`
- **Problem**: Multiple interactive elements (e.g., 👍, 👎, ⤴ Share, 📋 Copy, ⚙, ⋯) have tap targets well below the 44px mobile guidance (e.g., 22x21px, 32x29px), making them difficult to activate accurately on touch screens.
- **Evidence**: Layout warnings throughout the session flag systemic small tap targets for message action buttons (heights of 29px) and the settings button (22x21px).
- **Suggested fix**: Increase the padding around icon buttons to ensure a minimum tap target size of 44x44px, especially for message actions and header controls.

### [LOW] clicking-the-share-button-changes-its — clarity
- **Page**: `index.html: ⤴ Share (ux-6)`
- **Problem**: Clicking the ⤴ Share button changes its label to '✓' without opening a share dialog or providing a tooltip, leaving the user confused about whether the content was copied or shared.
- **Evidence**: Chunk steps-31-36 notes the Share button's text mutated to '✓' without opening a share dialog or tooltip, causing confusion about the action performed.
- **Suggested fix**: Display a brief toast notification (e.g., 'Link copied to clipboard') or open a proper share dialog to clearly communicate the result of the action.
