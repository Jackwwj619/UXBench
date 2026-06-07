# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full forge-coder system, prioritizing the primary chatbot/agent interface flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: True

## Summary

The Forge Coder agent interface suffers from severe mobile usability issues, primarily a non-responsive three-pane layout that causes horizontal overflow and renders the interface nearly unusable on small screens. Critical agent controls lack proper state management and feedback; the 'Interrupt' button does not transform into a 'Resume' action when paused, and the 'Rerun' button provides zero visual feedback when clicked. Additionally, navigation tabs are non-functional dead links without active state indicators, leaving users disoriented and unable to trust the UI.

## Issues (7)

### [HIGH] the-three-pane-ide-layout-does — mobile usability
- **Page**: `index.html`
- **Problem**: The three-pane IDE layout does not adapt to mobile viewports, causing a horizontal overflow where the page width (733px) nearly doubles the mobile viewport (390px).
- **Evidence**: Layout warnings consistently flag 'Page width 733px exceeds viewport 390px' during mobile testing (steps-37-42, steps-43-48, final observation). Crucial elements like 'Connect a repo' and 'Open in VS Code' have bounding boxes extending to x=636+, pushing them off-screen.
- **Suggested fix**: Implement a responsive layout that stacks the file tree, chat, and diff panes vertically on small screens, or hides the file tree/diff pane behind collapsible drawers.

### [HIGH] clicking-the-rerun-button-produces-no — feedback
- **Page**: `index.html: ↻ Rerun (ux-10)`
- **Problem**: Clicking the '↻ Rerun' button produces no visible state change, loading indicator, or status update, leaving the user wondering if the action was registered.
- **Evidence**: In steps-01-06 and step agentic-47-click, clicking '↻ Rerun' resulted in 'No obvious URL or visible-text change' and the status remained 'Run #243 · paused'.
- **Suggested fix**: Provide immediate visual feedback when 'Rerun' is clicked, such as a spinner on the button, a status change to 'Run #244 · running', or a toast notification confirming the rerun initiation.

### [HIGH] after-pausing-the-agent-the-interrupt — clarity
- **Page**: `index.html: ⏸ Interrupt (ux-9)`
- **Problem**: After pausing the agent, the '⏸ Interrupt' button remains labeled 'Interrupt' instead of changing to a 'Resume' or 'Continue' action.
- **Evidence**: Session memory and step agentic-46-click show that clicking '⏸ Interrupt' transitions the status to 'paused', but the button text remains '⏸ Interrupt'.
- **Suggested fix**: Change the button label and icon to '▶ Resume' when the agent enters a paused state, clearly indicating the available next step.

### [MEDIUM] navigation-tabs-inbox-runs-settings-are — navigation
- **Page**: `index.html: Inbox (ux-2), Runs (ux-3), Settings (ux-4)`
- **Problem**: Navigation tabs (Inbox, Runs, Settings) are dead links that append '#' to the URL without changing the view or providing any active state styling.
- **Evidence**: In steps-07-12, clicking 'Inbox', 'Runs', and 'Settings' produced no visible UI change. The tabs also lack active state styling, making it impossible to know which view is selected.
- **Suggested fix**: Either implement the underlying views for these tabs or remove/disable them with a clear visual indication (e.g., greyed out, 'Coming soon' tooltip) if they are not yet available.

### [MEDIUM] clicking-the-split-or-unified-diff — feedback
- **Page**: `index.html: Split (ux-17), Unified (ux-16)`
- **Problem**: Clicking the 'Split' or 'Unified' diff view toggles produces no visible change in the diff preview pane and lacks an active/selected state indicator.
- **Evidence**: In steps-13-18, clicking 'Split' and 'Unified' produced no visible text or URL change, and there is no highlight or underline to distinguish the active toggle.
- **Suggested fix**: Add an active/selected visual state (e.g., background highlight or bold text) to the currently selected toggle, and ensure the diff pane visually updates when the mode is switched.

### [MEDIUM] multiple-interactive-elements-have-tap-targets — accessibility
- **Page**: `index.html: Auto-apply edits (ux-12), ⌕ (ux-7), + (ux-8)`
- **Problem**: Multiple interactive elements have tap targets well below the 44px mobile accessibility guideline, making them difficult to activate on touch devices.
- **Evidence**: Final observation flags 'Auto-apply edits' checkbox (13x13px), file tree icons '⌕' (26x27px) and '+' (27x27px), nav links (32px height), and 'Send' button (59x34px) as failing mobile tap target guidance.
- **Suggested fix**: Increase the padding around interactive elements to meet the 44x44px minimum touch target size. For checkboxes like 'Auto-apply edits', wrap the label to expand the clickable area.

### [LOW] the-chat-textarea-has-a-fixed — forms
- **Page**: `index.html: Reply textarea (ux-11)`
- **Problem**: The chat textarea has a fixed, small height (38px), which constrains visibility for longer messages without auto-resizing behavior.
- **Evidence**: Session memory notes the textarea (ux-11) has a relatively small height (38px) which might constrain visibility for longer user messages without auto-resizing behavior.
- **Suggested fix**: Implement an auto-resizing textarea that grows vertically as the user types, up to a reasonable maximum height, before becoming scrollable.
