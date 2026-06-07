# UXAgent Exploration Plan

## Goal

Exhaustively explore and critique the UX of the Lumen Research chatbot interface, validating the primary conversation flow, citation interactions, thread management, and mode switching across desktop and mobile viewports.

## Plan Summary

The exploration will proceed by first validating the primary chat interface and citation interactions on the default thread. Next, it will test thread management by switching between existing threads and creating a new one. The run will then validate utility features like mode switching, sorting sources, and export options. Finally, all critical paths will be re-validated on a mobile viewport to assess responsive behavior and tap target issues identified in the prescan.

## Coverage Targets

- pages: `100% of known HTML pages (index.html)`
- features: `Exercise all 14 buttons, 4 inputs/selects, and 10 links identified in the prescan`
- mobile: `Repeat Phase 1 and Phase 2 critical checks on mobile viewport, plus validate layout collapse`

## Planned Phases

### Primary Chat & Citation Flow

- Objective: Validate the core conversation experience, including reading the thread, interacting with inline citations, and submitting a follow-up.
- Target pages: index.html
- Key checks:
  - Hover over inline citation chips (e.g., [1], [2]) and verify the matching source highlights in the right rail
  - Click an inline citation chip and verify the right rail scrolls to the specific source
  - Type a follow-up question in the textarea (ux-16) and submit using the Ask button (ux-18)
  - Click the suggested follow-up buttons (e.g., ux-19, ux-20) and verify system response
- Exit criteria:
  - Citation hover and click behaviors are confirmed
  - A follow-up question and a suggested prompt have been successfully submitted
  - Chat response rendering is observed

### Thread Navigation & Creation

- Objective: Validate the left rail thread history navigation and the creation of a new thread.
- Target pages: index.html
- Key checks:
  - Click a different thread in the left rail (e.g., 'EV battery recycling policy in Norway') and verify center and right columns update
  - Click the '+ New thread' button (ux-1) and verify the interface resets for a new conversation
  - Submit an initial query in the new thread to test the blank state
  - Verify the new thread appears in the left rail history
- Exit criteria:
  - Successfully navigated between at least two existing threads
  - Successfully created a new thread and submitted a query
  - Thread history list updates correctly

### Modes, Sources & Utilities

- Objective: Validate the functionality of the mode selector, source sorting, and utility actions (Share, Export, Attach).
- Target pages: index.html
- Key checks:
  - Change the Mode selector (ux-14) to 'Quick scan', 'Deep dive', and 'Compare arguments', observing changes in the UI/response
  - Change the Sort dropdown (ux-23) to 'Date' and 'Cited in this answer', verifying source order changes in the right rail
  - Click the 'All' button (ux-24) in the right rail and verify filter behavior
  - Click 'Share thread' (ux-12) and 'Export as PDF' (ux-13) to check for expected dialogs or actions
  - Click the attachment button (ux-15) to check file picker or mock response
- Exit criteria:
  - All mode and sort options have been exercised
  - Utility buttons (Share, Export, Attach) have been clicked and their outcomes observed

### Mobile Viewport Validation

- Objective: Re-validate critical flows and assess responsive layout on a mobile viewport, paying special attention to tap targets and three-column collapse behavior.
- Target pages: index.html
- Key checks:
  - Switch to mobile viewport and verify the three-column layout adapts (e.g., left rail collapses to hamburger or hidden)
  - Attempt to navigate thread history on mobile, checking for tap target issues flagged in prescan
  - Validate citation hover/click interaction on mobile (tap instead of hover)
  - Submit a follow-up question on mobile
  - Access Mode selector and Sort dropdown on mobile
- Exit criteria:
  - Mobile layout is assessed for usability and responsive integrity
  - Critical chat and citation flows are confirmed functional on mobile
  - Tap target severity is evaluated in context

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

