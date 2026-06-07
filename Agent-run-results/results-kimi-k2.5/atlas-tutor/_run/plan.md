# UXAgent Exploration Plan

## Goal

Explore and critique the UX of the atlas-tutor system, focusing on the primary chat-conversation flow, practice problems, and adjacent navigation/state changes, while validating mobile responsiveness and interaction affordances.

## Plan Summary

The run will proceed in phases: first, explore the main chat interface (messages, composer, suggestions); second, test the practice problems panel (solve, submit, hint); third, navigate the left rail (subjects, chat history, new chat); fourth, check mobile viewport for tap targets and layout; fifth, validate head tools (steps, practice, menu) and progress tracking. Each phase will validate specific interactions and states.

## Coverage Targets

- pages: `Visit and interact with all dynamic sections of index.html`
- features: `Exercise at least 80% of visible controls (composer, practice, navigation, head tools)`
- mobile: `Repeat critical checks (composer, practice, navigation) on mobile viewport`

## Planned Phases

### Chat Composer & Suggestions

- Objective: Validate text input, suggestion chips, and send functionality
- Target pages: index.html
- Key checks:
  - Type text in the composer
  - Select a suggestion chip (e.g., 'tan(√x) — derive it')
  - Click the send button (→) or use Cmd+Enter
  - Verify message appears in conversation
- Exit criteria:
  - Message sent successfully
  - Suggestion chip interaction works
  - Composer resets after send

### Practice Problems Panel

- Objective: Test problem solving, hint, and state transitions
- Target pages: index.html
- Key checks:
  - Click 'Solve' on a practice problem (e.g., d/dx sin(3x + 2))
  - Click 'Hint' and verify feedback
  - Submit solution (simulate correct/incorrect)
  - Check state change (Solve→Submit→Correct toggle)
- Exit criteria:
  - Problem state updates correctly
  - Hint functionality works
  - Progress bar updates (if visible)

### Left Rail Navigation

- Objective: Validate chat history, subjects, and new chat
- Target pages: index.html
- Key checks:
  - Click a different chat in history (e.g., 'Big-O of recursive Fibonacci')
  - Switch subject (e.g., 'Programming' from 'Mathematics')
  - Click '+ New chat' and verify new conversation starts
  - Search chats using the search bar
- Exit criteria:
  - Chat history navigation works
  - Subject switch updates content
  - New chat opens with empty composer

### Mobile Viewport Validation

- Objective: Check mobile layout and tap targets
- Target pages: index.html
- Key checks:
  - Switch to mobile viewport (e.g., 360x640)
  - Test tap targets (e.g., 'Atlas Tutor', '⌥ Steps', '👍') for size and responsiveness
  - Verify left rail collapses/expands (if applicable)
  - Check composer and practice panel layout on mobile
- Exit criteria:
  - Critical tap targets meet 44x44px guidance
  - Layout is usable on mobile
  - Key interactions work on mobile

### Head Tools & Progress

- Objective: Validate head tools (steps, practice, menu) and progress tracking
- Target pages: index.html
- Key checks:
  - Click '⌥ Steps' (or 'Steps') to verify step-by-step view
  - Click '▶ Practice' to toggle practice panel
  - Open the menu (⋯) and check options
  - Verify 'Your progress' card updates after practice
- Exit criteria:
  - Head tools open/close correctly
  - Progress card updates with practice
  - Menu options are accessible

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

