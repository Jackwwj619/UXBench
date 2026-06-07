# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full forge-coder system, prioritizing the primary chatbot/agent interface flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: True

## Summary

The core agent-run concept is understandable, but many prominent controls behave like dead ends or provide no visible response, which makes the interface feel unreliable. The biggest UX risks are weak feedback around destructive/recovery actions, a mobile layout that overflows horizontally and compresses controls, and navigation/actions that look interactive without changing the view. Coverage is strong across desktop and mobile, though selecting alternate files in the tree was not reliably validated because one mobile file tap failed.

## Issues (8)

### [HIGH] submitting-from-the-reply-composer-gives — feedback
- **Page**: `index.html composer / Send button (ux-13)`
- **Problem**: Submitting from the reply composer gives no visible acknowledgment, loading state, or new timeline/message entry, so users cannot tell whether their message was sent.
- **Evidence**: On desktop and mobile, clicking Send produced no visible-text or URL change. In steps 31-36 and 37-42, the composer remained visible after Send, the run state still showed paused/finished, and no new chat/timeline item appeared. Final observation still shows the same paused run context and prior activity after send attempts.
- **Suggested fix**: Show an immediate sent state in the thread/composer: append the user message, disable Send briefly, and display a loading or queued indicator tied to the current run state.

### [HIGH] the-destructive-looking-accept-all-changes — trust
- **Page**: `index.html action bar / Accept all changes button (ux-15)`
- **Problem**: The destructive-looking 'Accept all changes' action shows no confirmation, success state, or visible effect after activation.
- **Evidence**: In steps 07-12 and again in steps 43-48 on mobile, clicking 'Accept all changes' caused no URL or visible-text change, no dialog appeared (dialogs remained 0), the button label stayed the same, and the file summary still read 'Modified 3 Added 1'. Screenshot evidence includes agentic-47-click-mobile.png.
- **Suggested fix**: Add a confirmation step or at minimum an explicit applied state, toast, and visible file-summary update so users can verify what happened.

### [HIGH] the-three-pane-ide-layout-does — mobile usability
- **Page**: `index.html mobile layout overall`
- **Problem**: The three-pane IDE layout does not adapt to mobile well: the page overflows horizontally and key controls remain cramped or partially off-screen.
- **Evidence**: Multiple mobile observations report page width 733px on a 390px viewport. Recent steps note off-screen/right-shifted controls such as 'Connect a repo' and 'Open in VS Code', and final layout warnings flag horizontal overflow plus undersized controls throughout. Screenshot paths include agentic-46-scroll-mobile.png and agentic-49-click-mobile.png.
- **Suggested fix**: Use a mobile-specific stacked or tabbed layout for file tree/chat/diff, keep key run actions in a sticky header/footer, and eliminate horizontal overflow entirely.

### [MEDIUM] top-navigation-items-appear-interactive-but — navigation
- **Page**: `index.html top nav links (ux-1 to ux-4)`
- **Problem**: Top navigation items appear interactive but act like no-ops, with no content switch, selected-state change, or explanation.
- **Evidence**: Clicks on Inbox, Agent, Runs, and Settings produced either only a trailing '#' in the URL or no change at all. The observed page content stayed the same, and chunk summaries note the links use href '#'.
- **Suggested fix**: Either implement real section changes, visibly mark unavailable areas as disabled/coming soon, or remove these links until they work.

### [MEDIUM] run-state-controls-and-status-messaging — feedback
- **Page**: `index.html run header and controls (ux-9, ux-10)`
- **Problem**: Run-state controls and status messaging are inconsistent, especially after pause/restart attempts.
- **Evidence**: Interrupt does update the header to 'Run #243 · paused · 4m 12s elapsed', but earlier notes show the timeline still ended with 'Continuing.' before later mobile text changed to a paused state. After pausing, '⏸ Interrupt' remains available, and clicking '↻ Rerun' on mobile produced no visible response; the screen still showed 'paused' with the same controls in agentic-48-click-mobile.png.
- **Suggested fix**: Synchronize header, timeline, and button states; disable or relabel Interrupt when already paused; and show a clear rerun-in-progress state when restart is triggered.

### [MEDIUM] many-interactive-elements-are-below-recommended — accessibility
- **Page**: `index.html mobile interactables and layout_warnings`
- **Problem**: Many interactive elements are below recommended mobile tap sizes, including the tiny Auto-apply checkbox and several important buttons/icons.
- **Evidence**: Final layout warnings flag Agent 56x32, Inbox 53x32, Runs 50x32, Settings 70x32, search 26x27, plus 27x27, Auto-apply 13x13, Send 59x34, Unified 66x37, and Split 50x37. Earlier chunks also noted Connect a repo/Open in VS Code at compact sizes.
- **Suggested fix**: Increase hit areas to at least 44px in height/width where appropriate, especially for Send, the checkbox, nav items, and icon-only controls.

### [MEDIUM] several-prominent-or-icon-only-controls — affordance
- **Page**: `index.html header and file-tree utility controls (ux-5, ux-6, ux-7, ux-8, ux-14)`
- **Problem**: Several prominent or icon-only controls appear clickable but provide no visible response, which weakens discoverability and confidence.
- **Evidence**: Clicks on 'Connect a repo', 'Open in VS Code', search (⌕), '+', and 'Open editor' all produced no visible URL/text change, no dialog, and no panel or state change across steps 13-18, 19-24, 37-42, and 43-48.
- **Suggested fix**: Provide immediate feedback for these actions: open a modal/panel, show focus/active state, or disable them with explanatory text if they are not implemented in this demo state.

### [MEDIUM] the-page-is-vertically-long-so — visual hierarchy
- **Page**: `index.html overall three-pane page flow`
- **Problem**: The page is vertically long, so reaching the reply area pushes critical run context and controls far offscreen.
- **Evidence**: Desktop observations place the composer around y=2214+, requiring substantial scrolling from the run header. Chunk summaries note that after scrolling, top controls like Interrupt, Rerun, and Accept all changes had large negative y positions, indicating they were far offscreen while composing.
- **Suggested fix**: Shorten the vertical journey by making the composer sticky, collapsible, or accessible within the main chat pane while preserving visible run status and review context.
