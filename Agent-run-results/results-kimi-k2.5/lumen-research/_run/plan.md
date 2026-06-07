# UXAgent Exploration Plan

## Goal

Explore and critique the UX of the Lumen Research chatbot interface, focusing on the primary research-assistant flow, thread navigation, citation interactions, and mobile responsiveness.

## Plan Summary

The exploration will proceed in phases: first, validate the main chat interaction and citation functionality on desktop. Then, test thread navigation and export features. Next, check mobile responsiveness and re-verify key interactions. Finally, explore secondary threads and edge cases like new thread creation and mode switching.

## Coverage Targets

- pages: `Visit and interact with all known pages (only index.html, so fully explore it).`
- features: `Exercise all visible controls: text input, citation chips, thread links, export/share, mode dropdowns, source sorting, and new thread creation.`
- mobile: `Repeat critical checks (citation links, thread navigation, text input) on mobile viewport.`

## Planned Phases

### Main Chat Interaction & Citations

- Objective: Validate the core chat experience and citation linking.
- Target pages: index.html
- Key checks:
  - Click a citation chip (e.g., [1], [2]) to verify it jumps to the correct source in the right rail.
  - Hover a citation chip to check if it highlights the matching source (scroll behavior).
  - Interact with the text input field (ask a follow-up) and submit a query (using the 'Ask' button).
- Exit criteria:
  - Citation linking (click/hover) works, and text input/submit is functional.

### Thread Navigation & Export

- Objective: Test thread switching and export/share features.
- Target pages: index.html
- Key checks:
  - Click a different thread in the left rail (e.g., 'EV battery recycling policy in Norway') to switch conversations.
  - Click 'Export as PDF' to verify the export functionality (check for download or confirmation).
  - Click 'Share thread' to test the sharing feature (check for modal or link generation).
- Exit criteria:
  - Thread switching works, and export/share features are responsive.

### Mobile Responsiveness (Desktop → Mobile)

- Objective: Validate the interface on mobile viewport, focusing on tap targets and layout.
- Target pages: index.html
- Key checks:
  - Switch to mobile viewport and recheck citation chip interactions (click/hover).
  - Test thread navigation on mobile (tap left rail links) — check for small tap target issues (per layout warnings).
  - Verify text input and button sizes on mobile (ensure they're touch-friendly).
- Exit criteria:
  - Key interactions work on mobile, and tap targets are usable (or issues are documented).

### Mode Switching & Secondary Threads

- Objective: Explore mode dropdowns and secondary thread workflows.
- Target pages: index.html
- Key checks:
  - Interact with the mode dropdown (e.g., 'Balanced' → 'Quick scan') to switch modes and check UI updates.
  - Click '+ New thread' to create a new conversation and verify thread creation flow.
  - Switch back to the original thread ('Deep work scheduling literature') to confirm thread management.
- Exit criteria:
  - Mode switching updates the UI, and new thread creation/management works.

### Edge Cases & Accessibility Checks

- Objective: Test edge cases and accessibility-related elements (unlabeled selects, small targets).
- Target pages: index.html
- Key checks:
  - Interact with unlabeled select elements (e.g., mode dropdowns) to check for usability (aria-labels or tooltips).
  - Check the 'Sort: Relevance' dropdown in the sources rail to verify sorting options.
  - Test the 'New thread' button on mobile to check tap target size (per layout warnings).
- Exit criteria:
  - Unlabeled selects are usable (or issues are documented), and sorting works.

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

