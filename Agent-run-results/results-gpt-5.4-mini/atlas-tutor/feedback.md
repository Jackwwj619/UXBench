# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full atlas-tutor system, prioritizing the primary settings/privacy flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

Atlas Tutor’s core learning flow is generally understandable, and several mobile interactions do provide visible state changes. However, the UI still has clear friction around discoverability and feedback: some header/control actions appear inert or ambiguous, the practice rail’s state transitions are inconsistent, and many controls are undersized for touch. Mobile layout is reachable, but small tap targets and cramped action rows create a noticeable usability risk for a chat-and-practice product.

## Issues (7)

### [HIGH] the-primary-send-action-does-not — feedback
- **Page**: `index.html composer / ux-23`
- **Problem**: The primary send action does not give reliable visible acknowledgment, making it hard to tell whether a message was actually submitted.
- **Evidence**: On mobile, clicking the send arrow produced no visible state change or text update, and pressing Enter also caused no obvious conversation change. Earlier desktop attempts similarly reported no visible conversation update or loading state after send.
- **Suggested fix**: Show immediate send feedback such as a disabled/loading state, optimistic message echo, or a clear confirmation that the draft was submitted.

### [HIGH] the-overflow-settings-affordance-appears-to — navigation
- **Page**: `index.html header overflow / ux-3`
- **Problem**: The overflow/settings affordance appears to do nothing, so the expected settings/privacy path is undiscoverable.
- **Evidence**: Clicking the ⋯ control produced no visible menu, panel, or state change in multiple desktop probes. The same control is also flagged as a very small tap target on mobile (39×44 px).
- **Suggested fix**: Make the menu open with an obvious panel, label the destination clearly, and ensure the control has sufficient touch size and a hover/focus cue.

### [MEDIUM] left-rail-items-behave-more-like — navigation
- **Page**: `index.html left rail / Atlas Tutor, Derivatives of trig functions`
- **Problem**: Left-rail items behave more like static anchors than real navigation, so thread switching is not obvious.
- **Evidence**: Clicking the brand link and subject-like items only changed the URL fragment to `#` (or `...?viewport=mobile#`) with no visible thread, subject, or conversation change.
- **Suggested fix**: Make thread/subject clicks visibly change the active conversation and highlight the selected item, with a clear loaded state.

### [MEDIUM] practice-controls-are-inconsistent-some-cards — feedback
- **Page**: `index.html right rail practice cards`
- **Problem**: Practice controls are inconsistent: some cards are already in Submit state, but clicking Solve on others often gives no visible progression or feedback.
- **Evidence**: Multiple probes report that Solve clicks produced no visible state change, while one card already showed Submit. The panel exposes a Solve→Submit→Correct workflow, but the clicked card did not visibly advance.
- **Suggested fix**: Add explicit per-card feedback when Solve/Submit is activated, such as a spinner, inline status, or a clear state label change.

### [MEDIUM] several-icon-text-controls-look-interactive — affordance
- **Page**: `index.html composer and message action row`
- **Problem**: Several icon/text controls look interactive but don’t clearly acknowledge taps, so their purpose is hard to infer.
- **Evidence**: Attach and mic produced no visible change on desktop. On mobile, Share changed the conversation area but showed no explicit confirmation, menu, or state label; Copy was also in the set of small, low-feedback response actions. Earlier Try again did show a clearer response, which makes the other controls feel inconsistent.
- **Suggested fix**: Give each helper action a distinct response pattern: tooltip, toast, menu, or state label, and keep those patterns consistent across controls.

### [MEDIUM] many-key-controls-are-below-comfortable — mobile usability
- **Page**: `index.html header, action row, composer`
- **Problem**: Many key controls are below comfortable mobile tap sizes, increasing the chance of missed taps.
- **Evidence**: Layout warnings flagged the overflow button at 39×44 px, thumbs buttons at 32×29 px, Share/Copy/Try again around 65–78×29 px, and the settings icon at 22×21 px. The desktop-style three-column arrangement also remained dense when mobile behavior was being exercised.
- **Suggested fix**: Increase tap targets to at least 44×44 px, add spacing between adjacent actions, and simplify the mobile action bar.

### [LOW] the-composer-is-usable-but-the — mobile usability
- **Page**: `index.html mobile composer / ux-23`
- **Problem**: The composer is usable, but the send cluster is visually crowded and the arrow button is small relative to surrounding controls.
- **Evidence**: Mobile observations show the textarea and suggestion chips remain visible, but the send control is only 36×36 px and adjacent to other small actions. The layout warnings also note other cramped controls nearby.
- **Suggested fix**: Make the send button larger and more visually prominent on mobile, with more spacing from attach/mic controls.
