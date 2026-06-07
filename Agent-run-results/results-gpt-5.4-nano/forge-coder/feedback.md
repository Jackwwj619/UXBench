# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full forge-coder system, prioritizing the primary chatbot/agent interface flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: True

## Summary

Forge Coder presents a useful IDE-style three-pane layout (file tree, agent chat, diff) and the interrupt/rerun controls keep the run context visible. However, many interactive controls—including critical ones like Accept all changes, Send, Unified/Split, Auto-apply edits, and mobile top-nav items (Agent/Settings)—do not provide any clear, observable state change when tapped/clicked. On mobile, horizontal overflow and several below-guidance tap targets (including the Auto-apply checkbox and small icons) further undermine confidence and recovery.

## Issues (7)

### [HIGH] pressing-accept-all-changes-does-not — feedback
- **Page**: `index.html: buttons labeled “Accept all changes” (ux-15); steps-07-12, steps-13-18, steps-37-42, steps-43-48`
- **Problem**: Pressing “Accept all changes” does not produce any observable UI update (diff text, file badges, or confirmation).
- **Evidence**: Multiple probes report no visible change after clicking the prominent “Accept all changes” button: tool_result changed=false and feedback “No obvious URL or visible-text change was detected after the action.” Screenshots during paused run still show the same modified/added badges and the same diff content.
- **Suggested fix**: Add immediate, explicit feedback: optimistic UI (remove M/+ badges, update diff to clean state), a toast/snackbar (“Changes applied”), and/or update the run header/summary with “Accepted N changes”. Provide a disabled/pressed state while applying.

### [HIGH] clicking-send-shows-no-clear-run — feedback
- **Page**: `index.html: textarea (ux-11) + “Send” (ux-13); steps-13-18, steps-25-30, steps-37-42, steps-43-48`
- **Problem**: Clicking “Send” shows no clear run-state transition, chat-stream update, or diff/changes update in the captured observations (hard to tell submission worked).
- **Evidence**: After tapping the enabled “Send” button (ux-13), tool_result reports changed=false and “No obvious URL or visible-text change was detected.” The run header remains “Run #243 · paused” and guidance still suggests using Send to redirect.
- **Suggested fix**: On send, show unmistakable state: disable Send with “Sending…”, append a visible user message bubble, transition run header from “paused” to “running”, and stream a response and/or at least indicate “agent queued”.

### [HIGH] toggling-unified-split-does-not-produce — clarity
- **Page**: `index.html: Unified/Split toggle (ux-16/ux-17); steps-19-24, steps-37-42, recent mobile window agentic-51-click`
- **Problem**: Toggling Unified/Split does not produce observable mode styling and does not clearly change diff presentation; users can’t tell which mode is active.
- **Evidence**: Clicking the mobile “Split” control (ux-17) and “Unified” (ux-16) both return changed=false with “No obvious URL or visible-text change…”. The screenshot text shows both toggle labels as interactive without clear active-state indication.
- **Suggested fix**: Make mode state unmistakable: highlight active mode, animate/refresh gutters (unified headers vs split hunks), and show a small “Mode: Split/Unified” label near the diff.

### [HIGH] tapping-auto-apply-edits-provides-no — forms
- **Page**: `index.html: Auto-apply edits checkbox (ux-12); steps-13-18, steps-19-24, steps-25-30, steps-43-48; mobile interactable bbox shows 13x13`
- **Problem**: Tapping “Auto-apply edits” provides no clear immediate visual confirmation of checked/unchecked state, making it impossible to verify the setting on the moment that matters.
- **Evidence**: Multiple attempts to toggle “Auto-apply edits” yield changed=false and “No obvious URL or visible-text change.” The checkbox has an extremely small bounding box (13x13 reported), increasing likelihood of missed taps; screenshots show the checkbox but not a reliably verifiable checked state.
- **Suggested fix**: Increase tap target and add explicit checked styling (e.g., enlarged checkbox + checkmark, text label bolding, and/or “Auto-apply: ON/OFF” status). Add haptic/visual feedback on toggle and ensure the state persists after sending.

### [MEDIUM] mobile-top-navigation-items-agent-settings — mobile usability
- **Page**: `index.html top nav: Agent (ux-1) and Settings (ux-4); recent screenshots agentic-49-click-mobile.png and agentic-50-click-mobile.png`
- **Problem**: Mobile top navigation items (Agent/Settings) appear clickable but do not produce any visible content change or active-state feedback in the tested flow.
- **Evidence**: Recent trajectory window: tapping mobile “Settings” (ux-4) and “Agent” (ux-1) resulted in before_url and after_url identical and changed=false, while the same paused run content remained visible in the screenshot.
- **Suggested fix**: Implement distinct view/panel routing (or clearly indicate active tab). At minimum, add visible active styling and a confirmation that the selected section is shown (e.g., overlay/panel within the same three-pane context).

### [MEDIUM] mobile-rerun-open-editor-do-not — navigation
- **Page**: `index.html: Rerun (ux-10) and Open editor (ux-14); steps-37-42 and agentic-52-click-mobile.png`
- **Problem**: Mobile rerun/open editor do not provide clear, observable recovery transitions (no clear shift from paused state).
- **Evidence**: On mobile, tapping “↻ Rerun” reports no obvious change and the screenshot still shows “Run #243 · paused” with Interrupt/Rerun visible. “Open editor” also shows changed=false and no visible editing state/pane transition.
- **Suggested fix**: On rerun/open editor: (1) change run header state (“running/starting”), (2) show loading/queued indicators, and (3) open a distinct editor view/modal or at least highlight the edited pane with a clear state change.

### [MEDIUM] mobile-layout-has-horizontal-overflow-and — mobile usability
- **Page**: `index.html mobile viewport; dom_summary layout_warnings + bbox evidence; visible screenshots from recent mobile steps`
- **Problem**: Mobile layout has horizontal overflow and several small tap targets below mobile guidance, increasing mis-tap risk and making precise actions unreliable.
- **Evidence**: Layout warning: horizontal overflow with page width 733px > viewport 390px. Also flagged small tap targets include: Agent (56x32), Inbox (53x32), Runs (50x32), Settings (70x32), search icon ⌕ (26x27), file tree “+” (27x27), and Auto-apply checkbox (13x13).
- **Suggested fix**: Fix overflow by responsive stacking/truncation, increase tap target sizes to meet minimum guidance, and ensure scroll containers don’t trap the user. Provide larger hit areas for icon buttons (+, ⌕) and the checkbox.
