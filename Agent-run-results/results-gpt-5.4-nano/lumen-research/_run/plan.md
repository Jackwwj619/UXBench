# UXAgent Exploration Plan

## Goal

Critique and validate the end-to-end UX of the Lumen Research research-assistant chat interface, including citation-source navigation, thread management, export/share, mode controls, and mobile usability.

## Plan Summary

Start by exercising the primary chat thread flow on index.html: interact with existing thread topics, use the follow-up input, and validate citation-chip behavior with the Sources rail (hover highlight + click jump). Then test adjacent controls in the header/footer—mode selector, sort, filter tabs, share thread, export as PDF, and the attachment icon—followed by stress tests using the three 'button prompts' shown in the message (find papers/power analysis/negative results). Finish by repeating critical actions on a mobile viewport and verifying tap target and label/aria issues.

## Coverage Targets

- pages: `Visit all known HTML pages (index.html only).`
- features: `Exercise most visible controls per key page: + New thread, left topic links, follow-up textarea + Ask, Mode selector, Share thread, Export as PDF, 📎 attachment, Sources sort and tabs, and at least 2 of the three assistant prompt buttons shown.`
- mobile: `Repeat critical checks on mobile viewport: topic selection, follow-up submission, citation navigation, mode switch, and one Sources interaction (sort or tab).`

## Planned Phases

### Baseline walkthrough of the primary chat experience

- Objective: Validate that the existing conversation renders correctly and that core interactions (topic selection + follow-up) produce coherent updates.
- Target pages: index.html
- Key checks:
  - Click one topic link in the left thread history (e.g., 'Deep work scheduling literature') and confirm the center conversation updates or scrolls to the associated thread content.
  - Use the follow-up textarea: type a short question referencing the current answer (e.g., ask for study design notes or effect-size interpretation) and press Ask.
  - Observe whether the assistant response includes inline citation chips and whether any new Sources items appear/expand in the right rail.
- Exit criteria:
  - At least one left-rail topic click demonstrably changes the displayed conversation state (scroll or content update).
  - A follow-up submission produces a new assistant turn with citation chips present in the conversation.
  - Sources rail updates to include/reflect the citations used in the new assistant turn.

### Citation-to-source navigation (hover + click) validation

- Objective: Ensure citations in the chat map accurately to entries in Sources and that the interaction model is consistent and discoverable.
- Target pages: index.html
- Key checks:
  - Hover over multiple citation chips in the assistant message and verify the corresponding source item highlights and scrolls into view in the Sources rail.
  - Click a citation chip and confirm it jumps to the matching source entry (and that the page focus/scroll position updates appropriately).
  - Change Sources sort and repeat one citation interaction to confirm mapping remains correct regardless of ordering.
  - If possible, test a citation chip when the source is not currently visible without scrolling (confirm the UI still navigates correctly).
- Exit criteria:
  - Hover and click both reliably identify the correct source item for at least 3 different citations.
  - Citation navigation continues to work after changing Sources sort (Relevance/Date/Cited in this answer).

### Mode control + compare/assist actions

- Objective: Validate that the Mode selector meaningfully changes agent behavior and that downstream UI elements (sources, sorting, citations) remain functional.
- Target pages: index.html
- Key checks:
  - Use the Mode select (Balanced, Quick scan, Deep dive, Compare arguments) to trigger a mode change and then ask a short follow-up question.
  - Specifically choose 'Quick scan' and re-ask the same or similar question to check output verbosity/format changes (e.g., shorter bullets vs detailed response).
  - Choose 'Compare arguments' and ask a comparison-focused question; verify response includes appropriate structure and citations.
  - Use the existing message buttons (if they are actionable prompts): 'Find papers since 2020 directly comparing the two schedules', 'Power analysis for 24 engineers × 2 weeks', and 'Surface negative results: where mornings didn't help'—execute at least 2 and confirm assistant responses reflect the intent.
- Exit criteria:
  - At least 3 mode selections produce meaningfully different assistant output characteristics.
  - At least 2 of the visible prompt buttons generate agent responses that align with their described tasks.

### Share/export/attachment + accessibility risk checks

- Objective: Validate non-chat utility controls (share/export/attachment) and verify critical accessibility concerns (labels, focus, keyboard behavior).
- Target pages: index.html
- Key checks:
  - Click 'Share thread' and confirm expected share behavior (e.g., dialog/link generation) or graceful failure messaging.
  - Click 'Export as PDF' and verify a PDF download/render occurs without blank/partial content.
  - Click the 📎 attachment button to confirm whether a file picker/open action appears; attempt cancelling if no file is selected.
  - Verify keyboard navigation: Tab to the follow-up textarea and Ask button; submit with Enter (if supported).
  - Check select control accessibility: ensure Mode select has an accessible name/label (prescan flagged missing input label for select).
- Exit criteria:
  - Share thread either produces a usable share link/dialog or shows clear error/disabled state (no silent no-op).
  - Export as PDF completes with a plausible, content-inclusive PDF (or provides clear error).
  - Attachment control responds with a visible UI for file selection or a clear explanation.

### Mobile viewport repeat of critical flows

- Objective: Re-validate primary interactions under mobile constraints and address tap-target and layout risks flagged by prescan.
- Target pages: index.html
- Key checks:
  - Repeat: topic link click (1), follow-up Ask (1), citation hover/click navigation (2 citations).
  - Repeat mode change + one assistant question.
  - Attempt Source rail interactions: change Sort selector once and click a Sources tab (All/Papers/Books/Web/Preprints) if available on mobile layout.
  - Observe tap target effectiveness for + New thread and left topic links (many flagged as <44px height/width).
- Exit criteria:
  - All critical actions succeed on mobile: selecting a topic, submitting a follow-up, and navigating citations to sources.
  - No critical controls become unreachable/overlaid; any interaction failures are clearly explained to the user.

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

