# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full stratabox system, prioritizing the primary pricing flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

The page is visually coherent and the mobile long-scroll flow largely holds together, with clear sectioning and a strong SDK demo area. The biggest UX risks are touch usability: many header and builder controls are undersized, and some builder actions do not produce perceivable feedback when tapped. Navigation links also rely heavily on hash jumps, and a few destinations feel like no-ops, which weakens trust in the primary conversion path. Coverage is substantial but not complete, so the unvisited footer branches and some content links remain unverified.

## Issues (7)

### [HIGH] the-block-type-select-in-the — forms
- **Page**: `index.html mobile builder select`
- **Problem**: The block-type select in the mobile builder has no label and does not visibly respond when tapped, making it hard to understand what it controls or whether it worked.
- **Evidence**: Recent trajectory step agentic-77-click: tapping the mobile select for 'Heading Paragraph Image Callout Quote' produced no obvious visible-text or URL change. Coverage also records 'A form field has no label, aria-label, or placeholder' for the select (ux-83 / ux-86).
- **Suggested fix**: Add a visible label and/or accessible name for the type selector, and provide an immediate state change on tap such as an open menu, highlight, or toast confirming the selected block type.

### [HIGH] several-builder-actions-on-mobile-appear — feedback
- **Page**: `index.html builder controls`
- **Problem**: Several builder actions on mobile appear to do nothing, so users do not get enough feedback to know whether their tap was registered.
- **Evidence**: Step agentic-73-click: tapping '+ Heading' changed neither block count nor autosave state. Step agentic-73-click also noted the delete '×' control produced no visible change. Earlier chunks report the same issue for builder interactions on desktop, where adding or dragging did not visibly update the list or preview.
- **Suggested fix**: Show clear insertion/removal feedback: animate the changed block, briefly surface 'saved' or 'added' status, and ensure the preview or list visibly shifts after each action.

### [HIGH] many-important-controls-are-below-mobile — mobile usability
- **Page**: `index.html header and builder controls`
- **Problem**: Many important controls are below mobile tap-target guidance, including the top nav, the Start free button, builder add controls, and delete icons.
- **Evidence**: Coverage layout warnings flag multiple small targets: Sign in 45x17, Start free 100x35, + Paragraph 95x26, + Heading 82x26, + Image 69x26, + Callout 75x26, + Quote 69x26, and delete '×' buttons at 21x22. Recent mobile observations also called out these targets as cramped.
- **Suggested fix**: Increase vertical padding and hit areas for nav links, hero CTAs, and builder controls to at least 44px tall on mobile, and consider grouping secondary controls into a more touch-friendly overflow pattern.

### [MEDIUM] several-top-nav-anchors-behave-like — navigation
- **Page**: `index.html top nav / footer links`
- **Problem**: Several top-nav anchors behave like bare hash changes instead of clearly moving to a meaningful destination, so navigation feels unreliable.
- **Evidence**: Clicking Book a demo changed the URL to 'index.html#'. The Pricing link also only changed the URL to a trailing hash and did not visibly jump to the pricing section. The Changelog footer link behaved similarly, updating to '#' without revealing a distinct section.
- **Suggested fix**: Make anchor destinations explicit and ensure each navigation item scrolls to a visible section with a matching heading; if a destination is not implemented, do not present it as a primary link.

### [MEDIUM] the-copy-interaction-initially-lacked-visible — feedback
- **Page**: `index.html SDK panel Copy button`
- **Problem**: The copy interaction initially lacked visible confirmation, making the action ambiguous until the later mobile state changed to 'Copied'.
- **Evidence**: Earlier chunk 49-54 noted the Copy button did not trigger any toast, label change, or button-state feedback. Later mobile step agentic-79-click did show a clear 'Copied' state, so the feedback exists but is not consistently surfaced across all observed states.
- **Suggested fix**: Always surface an immediate, explicit confirmation on copy, such as changing the button label to 'Copied!' for a few seconds and announcing it accessibly.

### [MEDIUM] the-mobile-builder-includes-unlabeled-select — accessibility
- **Page**: `index.html builder row`
- **Problem**: The mobile builder includes unlabeled select controls and tiny delete buttons, which create both discoverability and accessibility barriers.
- **Evidence**: Coverage marks missing labels for the builder select controls (ux-83, ux-86). Mobile observations also show delete controls at 21x22px and a compact tab/control strip that remains below typical touch guidance.
- **Suggested fix**: Add programmatic labels/ARIA text to each builder control and enlarge or reflow the control row so each action is clearly separated and tappable.

### [LOW] the-page-has-strong-overall-hierarchy — visual hierarchy
- **Page**: `index.html integrations search`
- **Problem**: The page has strong overall hierarchy, but some lower-priority states are too visually muted, such as dimmed integration tiles during filtering and compact footer/nav link clusters.
- **Evidence**: When the integrations search returned 0 of 24, all cards appeared dimmed/disabled-looking. Other chunks noted the integrations filter has understandable in-grid feedback, but there is no obvious count emphasis or empty-state guidance in the view.
- **Suggested fix**: Strengthen filter-state messaging with a prominent result count and an explicit empty-state message when nothing matches.
