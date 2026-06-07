# UXAgent Exploration Plan

## Goal

Autonomously explore and critique the UX of the full lumen-research system, prioritizing the primary chatbot/agent interface flow plus adjacent pages, states, and recovery paths.

## Plan Summary

The exploration will start by testing the core chat interface, including typing in the textarea, using the 'Ask' button, and clicking suggested follow-up prompts. Next, it will validate header controls like 'Share thread', 'Export as PDF', and the 'Mode' selector. The run will then examine the left rail history links and the right rail sources panel, paying special attention to mobile responsiveness given the small tap target warnings flagged during prescan.

## Coverage Targets

- pages: `Fully exercise index.html.`
- features: `Test chat input, suggestions, header utilities, history navigation, and source panel sorting.`
- mobile: `Repeat phase 3 checks (Left Rail) on mobile to assess the severity of small tap target warnings.`

## Planned Phases

### Chat Input and Suggestions

- Objective: Validate the core interaction of sending a message and using suggested follow-ups.
- Target pages: index.html
- Key checks:
  - Type text into the main textarea and click 'Ask'
  - Click the attachment ('📎') button
  - Click one of the suggested follow-up buttons at the bottom of the chat
- Exit criteria:
  - Chat input controls and suggested action buttons have been interacted with and their visual/functional responses observed.

### Header and Mode Controls

- Objective: Test the utility actions available at the top of the conversation view.
- Target pages: index.html
- Key checks:
  - Click 'Share thread'
  - Click 'Export as PDF'
  - Change the selection in the 'Mode' dropdown
  - Change the selection in the response length/type dropdown next to 'Ask'
- Exit criteria:
  - All header action buttons and dropdowns have been toggled or clicked.

### Thread History (Left Rail)

- Objective: Check navigation between past threads and creation of new ones, assessing accessibility.
- Target pages: index.html
- Key checks:
  - Click '+ New thread'
  - Click multiple history links (e.g., 'EV battery recycling policy...', 'Trace prevalence...')
  - Verify tap target sizes visually on mobile viewport
- Exit criteria:
  - New thread initiation and history navigation have been tested.

### Sources and Citations (Right Rail)

- Objective: Evaluate the research sources panel and its sorting/filtering capabilities.
- Target pages: index.html
- Key checks:
  - Change the 'Sort' dropdown in the Sources panel
  - Click the 'All' filter or similar tabs if present
  - Attempt to click an inline citation in the chat text to see if it interacts with the right rail
- Exit criteria:
  - Source panel controls have been manipulated.

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

