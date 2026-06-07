# UXAgent Exploration Plan

## Goal

Evaluate the UX of the Lumen Research chatbot interface, focusing on the core conversation flow, citation/source interaction mechanics, and responsive layout stability.

## Plan Summary

The exploration will proceed by first validating the primary 'Ask' loop and response rendering. It will then stress-test the unique 'citation-to-source' linking mechanism (hover/click) and the right-rail filtering controls. Finally, it will assess mobile responsiveness, specifically targeting the identified small tap targets in the left navigation rail.

## Coverage Targets

- pages: `100% of `index.html` interactive states (since it is a SPA).`
- features: `Exercise all 14 buttons, 4 inputs, and both select dropdowns visible in the prescan.`
- mobile: `Repeat Phase 1 and Phase 2 checks on a narrow viewport (<600px width).`

## Planned Phases

### Core Conversation & Input Loop

- Objective: Validate the primary user journey: composing queries, submitting them, and receiving formatted responses.
- Target pages: index.html
- Key checks:
  - Submit a new query via the textarea and 'Ask' button to verify response generation.
  - Test the 'Quick scan' vs 'Deep dive' modes in the bottom-right selector to observe response differences.
  - Verify the 'Attach' (paperclip) button state and any resulting file picker or UI change.
  - Check if suggested follow-up buttons (e.g., 'Power analysis...') correctly inject text into the input field.
- Exit criteria:
  - Successful submission of at least one new message.
  - Visible change in UI or response style when toggling input modes.

### Citation & Source Mechanics

- Objective: Stress-test the unique value proposition: the link between inline citations and the source panel.
- Target pages: index.html
- Key checks:
  - Hover over inline citation chips (e.g., `[1]`, `[4]`) to verify the corresponding source highlights in the right rail.
  - Click a citation chip to test scroll-to-source behavior.
  - Interact with Right Rail filters ('All', 'Papers', 'Books') to ensure the list updates correctly.
  - Change the 'Sort: Relevance' dropdown to check for re-ordering of sources.
- Exit criteria:
  - Confirmed visual feedback (highlight/scroll) on citation interaction.
  - Source list correctly filters/sorts based on right-rail controls.

### Thread Management & Global Controls

- Objective: Explore adjacent flows involving history management and export features.
- Target pages: index.html
- Key checks:
  - Click '+ New thread' to verify canvas clearing and state reset.
  - Navigate to a previous thread from the Left Rail (e.g., 'EV battery recycling...') to check state restoration.
  - Test 'Share thread' and 'Export as PDF' buttons for modal triggers or download behaviors.
  - Toggle the top-right 'Mode: Balanced' selector to see if it affects the whole session context.
- Exit criteria:
  - New thread starts with a clean slate.
  - Old threads load their respective history and sources accurately.

### Mobile Responsiveness & Accessibility

- Objective: Validate layout integrity on mobile viewports, focusing on known layout warnings.
- Target pages: index.html
- Key checks:
  - Switch to mobile viewport (e.g., iPhone SE/Pixel 5).
  - Attempt to tap Left Rail items (identified as <44px height) to assess touch target difficulty.
  - Check for overlap between the fixed header/footer and the main conversation content.
  - Verify if the three-column layout collapses gracefully (e.g., into tabs or drawers) or breaks.
- Exit criteria:
  - Documentation of specific tap-target failures in the left rail.
  - Confirmation that core chat functionality remains accessible despite layout shifts.

## Prescan Summary

### Lumen Research — research assistant

- Page: `index.html`
- Headings: Deep work scheduling literature, Sources 8
- Interactables: `14` buttons, `10` links, `4` inputs
- Notable controls:
  - clickable:button:+ New thread
  - clickable:a:Deep work scheduling literature
  - clickable:a:EV battery recycling policy in Norway
  - clickable:a:Trace prevalence of seal influenza H10N7
  - clickable:a:Comparative grad-school stipends in CS
  - clickable:a:Microclimate effects of urban rooftop gardens
  - clickable:a:Late-Holocene shoreline shifts, NW Europe
  - clickable:a:Why does ringing happen in step responses

