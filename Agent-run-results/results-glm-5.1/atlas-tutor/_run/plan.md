# UXAgent Exploration Plan

## Goal

Exhaustively explore and critique the UX of the atlas-tutor system, focusing on the primary settings/privacy flow, chat interactions, practice panel, and responsive mobile layout.

## Plan Summary

The exploration will proceed by first validating the primary settings/privacy flow via the profile footer. Next, it will exercise the core chat interface including composer controls, message actions, and thread navigation. The right-rail practice and concepts panel will be tested for state changes and interactions. Finally, all critical paths will be re-validated on a mobile viewport to assess responsive behavior and layout warnings.

## Coverage Targets

- pages: `100% of known HTML pages (index.html)`
- features: `Interact with all 40 buttons, 5 links, 2 inputs, and validate right-rail state changes`
- mobile: `Repeat settings, chat, and practice flows on mobile viewport; verify handling of small tap targets`

## Planned Phases

### Settings & Privacy Flow

- Objective: Locate, open, and interact with the settings/privacy controls, validating the primary user goal.
- Target pages: index.html
- Key checks:
  - Click the ⚙ button in the profile footer to open settings/privacy
  - Verify presence of privacy controls and account settings
  - Toggle privacy settings and confirm state retention
  - Close settings and verify return to main chat view
- Exit criteria:
  - Settings/privacy view has been fully interacted with
  - All visible toggles/inputs in the settings have been exercised

### Core Chat Interactions

- Objective: Validate the central chat experience including composing, sending, and interacting with messages.
- Target pages: index.html
- Key checks:
  - Type in the textarea and send a message using the → button
  - Click suggestion chips (e.g., 'tan(√x) — derive it') to populate/send
  - Interact with message actions: 👍, 👎, 📋 Copy, ⤴ Share, ↻ Try again
  - Use the search input in the left rail to filter threads
  - Click a historical thread from 'LAST 7 DAYS' or 'EARLIER' to load it
- Exit criteria:
  - At least one message sent
  - All message action buttons clicked
  - Search and thread switching validated

### Practice Panel & Right Rail

- Objective: Exercise the practice problems, hints, and concepts links in the right rail.
- Target pages: index.html
- Key checks:
  - Click '▶ Practice' in the header to ensure right rail focus
  - Click the hint button on a practice problem
  - Cycle a practice problem through its states: Solve → Submit → Correct
  - Verify the 'Your progress' bar updates after solving a problem
  - Click a concept link (e.g., 'Chain rule') and observe the outcome
- Exit criteria:
  - At least one practice problem fully solved
  - Progress bar state change confirmed
  - Concept links clicked

### Left Rail Navigation & New Chat

- Objective: Test sidebar navigation, subject filters, and new chat creation.
- Target pages: index.html
- Key checks:
  - Click '+ New chat' button and verify the view resets
  - Click a subject filter (e.g., 'Programming 7') and verify thread list updates
  - Click the 'Atlas Tutor' logo link at the top
- Exit criteria:
  - New chat created successfully
  - Subject filtering validated

### Mobile Viewport Validation

- Objective: Re-test critical flows and check layout warnings on a mobile viewport.
- Target pages: index.html
- Key checks:
  - Switch to mobile viewport and verify layout adaptation (e.g., collapsible rails)
  - Re-open settings/privacy via the ⚙ button on mobile
  - Attempt to send a chat message on mobile
  - Validate tap targets for 👍/👎 and action buttons on small screen
  - Check if right rail (Practice/Concepts) is accessible on mobile
- Exit criteria:
  - Mobile layout rendered without major overflow
  - Primary settings and chat flows functional on mobile
  - Small tap target warnings reviewed in context

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

