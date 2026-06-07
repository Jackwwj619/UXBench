# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full forge-coder system, prioritizing the primary chatbot/agent interface flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: True

## Summary

The interface successfully supports the core agent run review flow on desktop, with a stable tri-pane layout and clear paused-run feedback. The biggest UX problems are mobile-related: the content overflows the viewport, many controls are too small for touch, and several important actions appear to do nothing when tapped. There are also discoverability and trust issues around key workflow controls like Open editor, Send, and Accept all changes because they provide little or no immediate acknowledgment.

## Issues (8)

### [HIGH] the-page-does-not-fit-the — mobile usability
- **Page**: `index.html`
- **Problem**: The page does not fit the mobile viewport and creates a cramped, horizontally overflowing workspace, making key controls harder to reach and reason about.
- **Evidence**: layout_warnings report "Page width 733px exceeds viewport 390px"; recent mobile observations repeatedly note horizontal overflow (733px vs 390px) while the interface shows the same dense tri-pane content.
- **Suggested fix**: Introduce a responsive mobile layout that collapses or stacks panes, reduces fixed-width regions, and keeps the active chat/review area fully within the viewport.

### [HIGH] several-prominent-controls-appear-inert-on — affordance
- **Page**: `index.html`
- **Problem**: Several prominent controls appear inert on tap, including Open editor, Send, Split, and the file-tree search button, so users get no confirmation that their action was received.
- **Evidence**: Recent trajectory steps 46-49 show Split, Open editor, Send, and ⌕ all produced "No obvious URL or visible-text change"; earlier chunks also note Open editor and Accept all changes had no visible acknowledgment.
- **Suggested fix**: Provide immediate feedback for every primary action: button pressed state, loading indication, inline confirmation, or a clear explanation when an action is unavailable in the current run state.

### [HIGH] multiple-important-controls-are-below-recommended — mobile usability
- **Page**: `index.html`
- **Problem**: Multiple important controls are below recommended mobile touch size, including top navigation links, the search and plus buttons, the Auto-apply checkbox, and the Send button.
- **Evidence**: layout_warnings list small tap targets such as Agent 56x32, Inbox 53x32, Runs 50x32, Settings 70x32, ⌕ 26x27, + 27x27, Auto-apply edits 13x13, and Send 59x34.
- **Suggested fix**: Increase hit areas to at least 44x44px on mobile, add spacing between adjacent controls, and simplify the header/action density in the narrow breakpoint.

### [MEDIUM] the-send-control-gives-no-visible — feedback
- **Page**: `index.html`
- **Problem**: The Send control gives no visible acknowledgment in multiple mobile and desktop tests, making the composer feel unreliable even when the later feed update suggests the action may have worked.
- **Evidence**: Recent trajectory step 48 reports Send caused no visible acknowledgment, message insertion, focus change, or state change; earlier chunk 31-36 also says Send produced no visible text or state change, while step 37-42 shows one send did update the feed, creating inconsistent feedback.
- **Suggested fix**: On submit, show a disabled/loading state, append the user message immediately, and surface a short confirmation such as "Sent" or "Working...".

### [MEDIUM] top-level-navigation-items-like-agent — navigation
- **Page**: `index.html`
- **Problem**: Top-level navigation items like Agent, Inbox, Runs, and Settings behave like placeholders rather than meaningful destinations in the observed fixture.
- **Evidence**: Chunk 7-12 notes Agent only changed the URL hash and did not reveal a new panel; chunk 19-24 says Runs did not produce visible change; chunk 31-36 says Settings changed the URL to `#` without visible state change.
- **Suggested fix**: Either wire these items to clear destination states or visually mark them as non-navigational controls when they are intentionally placeholders.

### [MEDIUM] accept-all-changes-is-exposed-as — trust
- **Page**: `index.html`
- **Problem**: Accept all changes is exposed as a powerful action but does not show any confirmation, safeguard, or result after activation.
- **Evidence**: Chunk 13-18 says clicking Accept all changes produced no visible acknowledgment, confirmation, or dialog, and the diff remained visible with no change.
- **Suggested fix**: Add a confirmation step, success toast, or explicit state transition after bulk acceptance, and show what changed so the result is auditable.

### [MEDIUM] the-file-tree-utility-buttons-are — clarity
- **Page**: `index.html`
- **Problem**: The file-tree utility buttons are visually tiny and do not explain their effect, and the search control in particular appears visually inert when tapped.
- **Evidence**: The mobile layout flags ⌕ at 26x27 and + at 27x27; recent step 49 reports tapping ⌕ caused no visible change in URL or text and no focus or state indication.
- **Suggested fix**: Enlarge these controls, add tooltips or labels, and give explicit search-state feedback such as an expanded field or focus ring when activated.

### [LOW] the-dense-ide-layout-competes-for — visual hierarchy
- **Page**: `index.html`
- **Problem**: The dense IDE layout competes for attention across header, file tree, run controls, chat, and diff review, which makes the main action path feel visually crowded on smaller screens.
- **Evidence**: Visible text and observations show a packed three-pane arrangement with many controls in the header and composer; the summary repeatedly notes a "dense IDE-style layout" and layout warnings mention multiple compact controls.
- **Suggested fix**: Strengthen the primary path with clearer section emphasis, fewer simultaneous controls in the narrow viewport, and stronger spacing between run status, conversation, and review actions.
