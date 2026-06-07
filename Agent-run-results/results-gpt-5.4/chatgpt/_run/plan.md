# UXAgent Exploration Plan

## Goal

Exhaustively explore the front-end ChatGPT clone, focusing on the primary chat workflow in index.html and the adjacent pricing, login, and signup journeys, including visible interaction states and mobile usability.

## Plan Summary

Start with the main chat interface because it is the primary product flow and exposes the richest interaction surface: sidebar navigation, chat composer, message actions, and outbound navigation to pricing. Then cover the adjacent account-entry pages (pricing, login, signup) and verify that their visible CTAs, toggles, and cross-links behave consistently. Because this is a pure front-end clone with static keyword-based replies and no backend, prioritize state changes, affordances, and error/recovery UX over real authentication or AI correctness. Repeat the most important flows on mobile with extra attention to small tap targets already flagged in the prescan.

## Coverage Targets

- pages: `Visit all 4 known HTML pages, with deepest coverage on index.html and functional pass-through on pricing, login, and signup.`
- features: `Exercise nearly all visible controls on index.html and the primary CTAs/toggles/forms on pricing, login, and signup; aim to validate at least 80-90% of prescanned interactables that appear user-meaningful.`
- mobile: `Repeat the primary chat flow and the highest-risk controls on all known pages in mobile viewport, with special attention to the pre-flagged small tap targets.`

## Planned Phases

### Primary chat surface and existing conversation state

- Objective: Understand the default state of the main chat UI and validate that the visible conversation, sidebar, and top-level controls are coherent and usable.
- Target pages: index.html
- Key checks:
  - Inspect default landing state: existing selected conversation, visible assistant response, composer, and footer disclaimer
  - Use sidebar conversation links such as Travel planning request, Python debugging help, Recipe suggestions for dinner, Email draft for client, and JavaScript async patterns to confirm whether they switch visible content or selection state
  - Exercise Search chats... with a matching term and a non-matching term to see whether filtering occurs and whether recovery back to full list is easy
  - Click New chat and verify whether the conversation resets, clears composer state, or creates a distinct blank-chat state
  - Toggle Close sidebar and verify collapse/expand behavior, preservation of context, and discoverability of restoration
  - Check Share button behavior for visible feedback, modal/state changes, or no-op behavior
  - Assess whether Explore GPTs does anything meaningful or behaves like a dead-end placeholder
- Exit criteria:
  - Observed the default index state plus at least 3 sidebar conversation entries
  - Confirmed behavior of New chat, Close sidebar, Search chats..., and Share
  - Documented whether Explore GPTs and sidebar history items are functional, partial, or inert

### Composer, reply generation, and message-level actions

- Objective: Validate the core send-message loop and the controls attached to assistant output, including recovery and feedback states.
- Target pages: index.html
- Key checks:
  - Type at least 3 distinct prompts into Message ChatGPT, including one likely matching known keywords, one generic prompt, and one follow-up style prompt
  - Verify send behavior via Send message button and, if possible, keyboard submission from the textarea
  - Observe typewriter/streaming effect quality: progressive reveal, interruption risk, completion, and scroll behavior while response appears
  - Try sending with an empty composer or whitespace-only input to identify guardrails or lack thereof
  - Click Regenerate after a response and confirm whether content reruns, duplicates, or changes state
  - Test Copy on a visible assistant message and look for clipboard confirmation or status messaging
  - Test Thumbs up and Thumbs down for selectable/latched state, acknowledgment, or absent feedback
  - Try Attach file and Voice input to determine whether they expose affordances, disabled states, or misleading dead controls
- Exit criteria:
  - Completed multiple message sends and observed at least one full response render
  - Verified behavior for empty-state submission handling and regenerate
  - Documented feedback quality for Copy, rating controls, file attachment, and voice input

### Pricing journey and commercial navigation

- Objective: Assess the upgrade path from the main app into pricing, including billing toggle behavior and onward navigation into auth pages.
- Target pages: index.html, pricing.html
- Key checks:
  - Navigate from index via Upgrade plan to pricing.html and confirm transition clarity and information scent
  - On pricing.html, test Monthly and Annual Save 17% toggle behavior and confirm whether plan prices/content visibly update
  - Review CTA behavior for Get started, Upgrade to Plus, Upgrade to Team, and Contact sales
  - Use top navigation links ChatGPT, Log in, and Sign up to verify discoverable routes back to product and into auth flows
  - Check whether plan hierarchy, most-popular emphasis, and FAQ access are readable and consistent
- Exit criteria:
  - Reached pricing from the main chat UI
  - Exercised both billing toggle states and at least 3 pricing CTAs/navigation links
  - Documented whether pricing interactions are functional, partial, or static

### Authentication entry and recovery paths

- Objective: Validate login and signup page usability, form affordances, and cross-link recovery between account-entry states.
- Target pages: login.html, signup.html
- Key checks:
  - On login.html, enter a plausible email address and test Continue behavior
  - Check alternate auth buttons: Continue with Google, Continue with Apple, Continue with Microsoft for honest affordance versus fake-progress risk
  - Use the Sign up link from login to verify recovery into signup
  - On signup.html, enter a plausible email address and test Continue behavior
  - Use the Log in link from signup to return to login and confirm loop consistency
  - Inspect Terms of Use and Privacy Policy links for destination validity if they are wired
  - Assess form clarity: required-field cues, error prevention, and any message shown for invalid/blank submission
- Exit criteria:
  - Exercised both auth pages with typed input and Continue actions
  - Verified bidirectional navigation between login and signup
  - Documented behavior of social auth and legal links

### Mobile regression of critical flows

- Objective: Repeat the highest-value interactions on a mobile viewport, emphasizing navigation, composer usability, and tap-target issues already suggested by the prescan.
- Target pages: index.html, pricing.html, login.html, signup.html
- Key checks:
  - On mobile index, verify access to New chat, sidebar open/close behavior, conversation switching, and composer/send usability
  - Retest at least one send-message flow on mobile and observe keyboard overlap, scroll anchoring, and action-button reachability
  - Check message-level controls (Copy, Thumbs up/down, Regenerate) for tapability on mobile
  - On mobile pricing, retest Monthly/Annual toggle and at least one plan CTA
  - On mobile login/signup, verify email field usability, Continue button prominence, and ease of switching between Log in and Sign up
  - Specifically note any control that is hard to hit, clipped, crowded, or visually ambiguous because many targets were flagged under 44px
- Exit criteria:
  - Repeated the critical primary flow on mobile: open app, navigate, compose, send
  - Retested at least one key interaction on pricing and one on auth pages in mobile viewport
  - Captured concrete mobile-specific UX issues, especially around tap targets and layout density

## Prescan Summary

### ChatGPT

- Page: `index.html`
- Headings: none
- Interactables: `14` buttons, `13` links, `2` inputs
- Notable controls:
  - clickable:button:New chat
  - clickable:button:Close sidebar
  - typeable:input:Search chats...
  - clickable:a:Travel planning request
  - clickable:a:Python debugging help
  - clickable:a:Recipe suggestions for dinner
  - clickable:a:Email draft for client
  - clickable:a:JavaScript async patterns

### Log in - ChatGPT

- Page: `login.html`
- Headings: Welcome back
- Interactables: `4` buttons, `1` links, `1` inputs
- Notable controls:
  - typeable:input:Email address
  - clickable:button:Continue
  - clickable:button:Continue with Google
  - clickable:button:Continue with Apple
  - clickable:button:Continue with Microsoft
  - clickable:a:Sign up

### ChatGPT Pricing

- Page: `pricing.html`
- Headings: Choose your ChatGPT plan, Free, Plus, Team, Enterprise, Frequently asked questions
- Interactables: `2` buttons, `7` links, `0` inputs
- Notable controls:
  - clickable:a:ChatGPT
  - clickable:a:Log in
  - clickable:a:Sign up
  - clickable:button:Monthly
  - clickable:button:Annual Save 17%
  - clickable:a:Get started
  - clickable:a:Upgrade to Plus
  - clickable:a:Upgrade to Team

### Sign up - ChatGPT

- Page: `signup.html`
- Headings: Create your account
- Interactables: `4` buttons, `3` links, `1` inputs
- Notable controls:
  - typeable:input:Email address
  - clickable:button:Continue
  - clickable:button:Continue with Google
  - clickable:button:Continue with Apple
  - clickable:button:Continue with Microsoft
  - clickable:a:Log in
  - clickable:a:Terms of Use
  - clickable:a:Privacy Policy

