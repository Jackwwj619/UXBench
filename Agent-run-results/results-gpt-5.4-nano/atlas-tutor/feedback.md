# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full atlas-tutor system, prioritizing the primary settings/privacy flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: True

## Summary

Atlas Tutor’s core chat loop responds reliably on mobile (sending with → updates the conversation with new assistant content). However, multiple high-salience controls—especially ⚙/⋯ overflow and practice lifecycle actions (Solve/Submit/Hint/Correct/▶ Run)—often produce no observable UI state change, which undermines trust and makes it hard to tell what worked. Mobile reachability is also threatened by many controls being below recommended tap sizes.

## Issues (4)

### [HIGH] settings-privacy-and-overflow-controls-appear — clarity
- **Page**: `index.html: ⚙ / ⋯ / (head tool) screenshots in results: agentic-77-click-mobile.png, agentic-78-click-mobile.png; interactables ux-3 (⋯), ux-1 (⌥ Steps), ux-4 (👍) context in mobile dom_summary`
- **Problem**: Settings/privacy and overflow controls appear non-functional or provide no visible confirmation when tapped/clicked.
- **Evidence**: Repeated no-op results: clicking ⚙ on desktop/mobile showed no visible UI/panel/URL change (tool_result changed=false). Clicking ⋯ on mobile also produced no menu/panel/feedback (agentic-77-click-mobile.png; changed=false; feedback 'No obvious URL or visible-text change'). Clicking ⌥ Steps (targeted as a settings/privacy-related control attempt) on mobile did not open any UI either (agentic-78-click-mobile.png; changed=false).
- **Suggested fix**: Add explicit open/close UI feedback for ⚙ and ⋯ (modal or drawer that visibly appears), plus an error/toast/no-op message if the action is unavailable. Ensure focus is moved into the opened surface and restored on close; include an ESC/close affordance and ARIA state updates.

### [HIGH] practice-lifecycle-actions-are-frequently-unresponsive — feedback
- **Page**: `index.html: right-rail Practice Problems panel controls; evidence across trajectory chunks steps-07-12, steps-13-18, steps-19-24, steps-49-54, steps-55-60`
- **Problem**: Practice lifecycle actions are frequently unresponsive or lack observable state transitions (hard to know if clicks register).
- **Evidence**: Multiple attempts across chunks: clicking practice 💡 Hint, Solve, Submit, Correct, and ▶ Run often resulted in no detectable visible change (e.g., steps-07-12: Hint changed=false; steps-13-18: ▶ Run and Submit changed=false; steps-49-54: Submit/Solve no visible transition; steps-55-60: Correct and copy/run show no obvious UI feedback). Yet screenshots show multi-state controls exist (e.g., right rail shows Solve/Submit/Correct-style buttons), creating a strong expectation that these controls should change the state.
- **Suggested fix**: Make lifecycle transitions visually explicit: change button labels/states (Solve→Submit→Correct), expand/collapse hint panels with updated hint text, and update progress bar in the same viewport. Also add a temporary loading/spinner or optimistic UI state so taps are clearly acknowledged even if computation takes time.

### [MEDIUM] many-key-tap-targets-are-below — mobile usability
- **Page**: `dom_summary layout_warnings for mobile: ux-3 (⋯ 39x44), ux-4 (👍 32x29), and the ⚙ control mentioned as 22x21px in multiple chunks`
- **Problem**: Many key tap targets are below mobile tap-size guidance, increasing mis-taps and perceived unresponsiveness—especially for small icon/action buttons.
- **Evidence**: Layout warnings indicate multiple controls below 44px guidance on mobile: ⚙ is ~22x21px (ux-4 in dom_summary), ⋯ is 39x44px (below guidance per warning), 👍/👎 are 32x29px, ⤴ Share and 📋 Copy are 65x29px (short height), ↻ Try again is 78x29px (short height). The agent reports repeated no-op results for ⋯ and ⚙, which could be exacerbated by precision issues.
- **Suggested fix**: Increase minimum tap target height/width (44x44px), add padding around icons, and/or increase spacing between adjacent controls. Provide a larger hit area even if the visible icon stays small.

### [MEDIUM] message-utility-controls-copy-share-appear — affordance
- **Page**: `index.html: message action row under assistant messages; chunks steps-55-60, steps-73-78; screenshot shows 👍/👎/⤴ Share/📋 Copy/↻ Try again`
- **Problem**: Message utility controls (📋 Copy, ⤴ Share, 👍/👎) appear to offer little or no visible confirmation after interaction.
- **Evidence**: Agentic steps report clicking 📋 Copy and related execution controls produced no obvious UI/text change (e.g., steps-73-78: action targeted 📋 Copy shows no visible 'copied' confirmation; steps-55-60: thumbs and ↗/send/share/copy feedback not visibly tied to actions; tool_result changed=false). Despite controls being visible and prominent, the user receives no clear confirmation of success.
- **Suggested fix**: Add explicit feedback: “Copied” toast, button state change, or temporary checkmark/icon swap for Copy/Share/Like/Dislike actions; ensure thumbs visually indicate selected state.
