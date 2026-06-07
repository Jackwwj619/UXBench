# UXAgent Exploration Plan

## Goal

Explore and evaluate the atlas-tutor chat interface, focusing specifically on the settings/privacy flow, followed by main chat interactions, practice problem tools, and mobile layout responsiveness.

## Plan Summary

The exploration will start by finding and thoroughly testing the settings and privacy controls via the gear icon in the profile section. It will then evaluate the core chat composer, message actions, and the right-rail practice problem interactions. Finally, it will run through a mobile viewport to check layout collapse and evaluate the small tap targets flagged in the prescan.

## Coverage Targets

- pages: `Visit index.html (SPA).`
- features: `Exercise settings/privacy, chat composer, message actions, and right-rail practice problems.`
- mobile: `Ensure core chat flow and settings are accessible on mobile viewport, noting tap target issues.`

## Planned Phases

### Settings & Privacy Flow

- Objective: Locate and exhaustively interact with the settings and privacy controls.
- Target pages: index.html
- Key checks:
  - Click the ⚙ (gear) icon in the bottom left.
  - Navigate to the Privacy section within the settings.
  - Interact with available toggles, buttons, or form fields in the privacy settings.
  - Test save, cancel, and close behaviors of the settings view.
- Exit criteria:
  - Privacy settings have been opened, modified (if possible), and successfully closed.

### Core Chat & History

- Objective: Validate the primary conversation interactions and left-rail history.
- Target pages: index.html
- Key checks:
  - Type a query in the main composer and send it.
  - Click one of the suggestion chips (e.g., 'tan(√x) — derive it').
  - Interact with message-level actions (👍, 👎, ⤴ Share, 📋 Copy, ↻ Try again).
  - Use the 'Search chats…' input in the left sidebar.
  - Click the '+ New chat' button.
- Exit criteria:
  - A message has been composed/sent and existing message actions have been triggered.

### Practice Panel Tools

- Objective: Evaluate the right-rail practice problems and concept links.
- Target pages: index.html
- Key checks:
  - Toggle the '⌥ Steps' and '▶ Practice' buttons in the top header.
  - Interact with the 'Solve' and 'Hint' buttons on a practice problem card.
  - Check if progress updates when a problem state changes.
  - Click internal links under the 'Concepts' section.
- Exit criteria:
  - At least one practice problem has been interacted with and concept links tested.

### Mobile Responsiveness

- Objective: Verify the UI degrades gracefully on smaller screens and touch targets are usable.
- Target pages: index.html
- Key checks:
  - Switch to mobile viewport.
  - Verify how the left and right rails collapse (e.g., hamburger menus or hidden panels).
  - Ensure the settings ⚙ icon and chat composer are still accessible.
  - Evaluate usability of the flagged small tap targets (e.g., message actions).
- Exit criteria:
  - Settings and chat composer accessed on mobile viewport without layout breakage.

## Prescan Summary

### Atlas Tutor — math & CS tutor

- Page: `index.html`
- Headings: Chain rule — when both functions move, Chain rule
- Interactables: `40` buttons, `5` links, `2` inputs
- Notable controls:
  - clickable:a:Atlas Tutor
  - clickable:button:+ New chat
  - typeable:input:Search chats…
  - clickable:button:⚙
  - clickable:button:⌥ Steps
  - clickable:button:▶ Practice
  - clickable:button:⋯
  - clickable:button:👍

