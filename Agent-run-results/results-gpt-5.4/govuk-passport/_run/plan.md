# UXAgent Exploration Plan

## Goal

Explore the full single-page GOV.UK passport application prototype from landing content into the multi-step form, validating the main completion path plus validation, navigation, persistence, and mobile responsiveness.

## Plan Summary

This run should start by checking the public-facing landing experience on index.html, including cookie controls, start entry points, and anchor-style navigation that appears to jump within the same file. It should then move through the multi-step passport form end to end using the visible primary CTA, while deliberately testing inline errors, error summary focus behavior, back/forward movement, cancel/recovery paths, and localStorage persistence noted in the prescan. Because the site is a one-file prototype, coverage should focus on distinct in-page states/steps rather than hunting for separate HTML pages. Mobile checks should repeat the most critical entry, form progression, and error interactions, especially where small tap targets were already flagged.

## Coverage Targets

- pages: `Visit the only known HTML file (index.html) and cover all major in-page sections and form steps exposed through anchors or dynamic section switching.`
- features: `Exercise most visible controls on the landing page plus the core form features: start entry, application type choice, required field validation, error summary focus, back/continue, cancel, photo upload, review, and localStorage-based persistence.`
- mobile: `Repeat critical landing, navigation, and form checks on mobile viewport, with special attention to the previously flagged small tap targets and the step indicator/error presentation.`

## Planned Phases

### Landing and entry-point validation

- Objective: Validate the initial public GOV.UK-style page, confirm the main entry route into the service, and map the in-page navigation destinations available before the form starts.
- Target pages: index.html
- Key checks:
  - Load index.html from a clean state and record the initial landing content and visible calls to action
  - Test cookie banner actions: Accept analytics cookies, Reject analytics cookies, and View cookies; observe whether banner state changes and whether the page remains usable
  - Use 'Start now' as the primary entry path and confirm it moves into the service start/form area within the same page
  - Check top navigation links 'Home', 'Service', and 'Demo result' to verify anchor destinations and whether they expose meaningful sections or create confusing jumps
  - Sample related-content links such as 'Renew an adult passport' and 'Report a lost or stolen passport' to confirm whether they intentionally route to the same service start state
- Exit criteria:
  - Primary service entry path from landing page is confirmed
  - Cookie controls have been exercised at least once with resulting state noted
  - Anchor-style navigation behavior is understood well enough to avoid redundant exploration later

### Happy-path step progression

- Objective: Traverse the full passport application flow from start through review, documenting the sequence of steps and validating the baseline end-to-end experience.
- Target pages: index.html
- Key checks:
  - Progress through the described steps in order: start/eligibility, application type, personal info, address, previous passport info, photo upload, review, and stop before payment
  - Choose one realistic primary path first, likely an adult new/renew/replace route based on available options shown during the flow
  - Use 'Save and continue' on each step and verify step transitions, progress indicator updates, and retention of entered values
  - Observe hint text, field grouping, mandatory fields, and whether the amount of information per step feels manageable
  - At the review stage, confirm the flow clearly stops before payment and that the prototype communicates the next step appropriately
- Exit criteria:
  - A complete end-to-end pass reaches the review/confirmation stop-point without blockers
  - Actual step sequence and major branch choices are documented
  - Any broken transitions, hidden sections, or mismatches between landing claims and form behavior are captured

### Validation and recovery states

- Objective: Stress the form's error handling and user recovery mechanisms, especially the explicitly mentioned inline errors and error-summary focus behavior.
- Target pages: index.html
- Key checks:
  - On several key steps, attempt 'Save and continue' with required fields blank to trigger inline errors and the error summary
  - Verify focus moves to the error summary when validation fails and that summary links, if present, move focus to the right fields
  - Enter malformed or edge-case values where supported by visible fields, especially in personal info, address, and previous passport sections
  - Exercise back navigation between steps and confirm previously entered data persists correctly and does not duplicate errors
  - Test the 'Cancel' control from at least one mid-flow step to understand whether it exits, resets, or navigates elsewhere, and whether recovery back into the flow is possible
- Exit criteria:
  - Validation has been triggered on multiple step types, not just one
  - Error summary behavior and inline messaging quality are confirmed
  - At least one recovery path using back and one using cancel/re-entry has been tested

### Branching, file upload, and persistence

- Objective: Check higher-risk branches and stateful behaviors that are likely to break or create UX confusion in a single-page form.
- Target pages: index.html
- Key checks:
  - Revisit the application-type step and switch to at least one alternate branch option if available, such as new vs renew vs replace, to see whether downstream questions adapt
  - Exercise the photo upload step with an appropriate test file and observe validation, preview/filename display, and progression behavior
  - Refresh the page during mid-flow and reopen the file if needed to verify localStorage state persistence and restoration into the correct step
  - Check whether stored state can be cleared naturally through cancel/reset behavior or whether stale data keeps resurfacing
  - Use the top 'Demo result' anchor if relevant near the end state to see whether it aligns with the review/confirmation portion of the flow
- Exit criteria:
  - At least one alternate branch beyond the primary happy path has been sampled
  - Photo upload has been exercised successfully or a blocker has been documented
  - Persistence after refresh/reload has been verified with both preserved and potentially reset scenarios

### Mobile-focused regression sweep

- Objective: Repeat the most important interactions on a mobile viewport, concentrating on responsiveness, step indicator changes, and tap-target usability.
- Target pages: index.html
- Key checks:
  - On mobile viewport, confirm landing content remains readable and the cookie banner does not crowd out the start action
  - Retest top navigation and key links/buttons previously flagged as small tap targets, including Home, Service, Demo result, cookie controls, Start now, and related-content links
  - Enter the service on mobile and progress through several representative steps including one validation failure and one successful continuation
  - Check whether the step indicator moves from side to top as expected and remains understandable on smaller screens
  - Verify that long labels, hint text, error summaries, and form controls do not overflow or create horizontal scrolling
- Exit criteria:
  - Critical entry and progression flow has been repeated on mobile
  - At least one mobile validation/error scenario has been captured
  - Any mobile-specific layout or tapability issues are documented with priority relative to desktop findings

## Prescan Summary

### Apply for or renew a passport - GOV.UK local demo

- Page: `index.html`
- Headings: Cookies on GOV.UK, Apply for or renew a passport, Before you start, Related content, Services and information, Government activity, Support links
- Interactables: `2` buttons, `24` links, `0` inputs
- Notable controls:
  - clickable:a:GOV.UK local demo home
  - clickable:a:Home
  - clickable:a:Service
  - clickable:a:Demo result
  - clickable:button:Accept analytics cookies
  - clickable:button:Reject analytics cookies
  - clickable:a:View cookies
  - clickable:a:Citizenship and living in the UK

