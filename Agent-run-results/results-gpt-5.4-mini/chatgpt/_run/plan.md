# UXAgent Exploration Plan

## Goal

Exhaustively explore the ChatGPT clone’s core chat experience and adjacent account/pricing pages, validating primary chat interactions, sidebar conversation switching, response actions, and cross-page navigation on both desktop and mobile viewports.

## Plan Summary

Start from the main chat interface and exercise the visible conversation list, chat input, message actions, and sidebar controls to confirm the primary flow works as a static front-end clone. Then move to the account and pricing pages to validate login/signup entry points, plan toggles, and upgrade navigation. Because the prescan shows several small tap targets and no backend/LLM integration, the run should emphasize interaction fidelity, responsiveness, and recovery/empty-state behavior rather than network or auth success.

## Coverage Targets

- pages: `visit all known HTML pages`
- features: `exercise most visible controls per key page, including chat switching, composer send, response actions, pricing toggles, and auth inputs/buttons`
- mobile: `repeat critical checks on mobile viewport, prioritizing flagged small tap targets and the main chat composer flow`

## Planned Phases

### Baseline chat flow

- Objective: Validate the primary chat interface, current conversation rendering, and the basic send/reply loop on desktop.
- Target pages: index.html
- Key checks:
  - Open the default conversation and confirm the displayed assistant response matches the selected sidebar item context
  - Type a new prompt into the Message ChatGPT textarea and send it
  - Verify the hardcoded/static response behavior is stable and the typed response effect does not break layout
  - Check whether the input clears, the message appears in-thread, and the scroll position follows the conversation
- Exit criteria:
  - At least one full send-and-response cycle has been observed
  - No console or render errors during input, send, or response display
  - The conversation area remains usable after the reply is rendered

### Sidebar navigation and chat states

- Objective: Exercise the conversation list and sidebar controls to verify chat switching, sidebar collapsing, and new-chat behavior.
- Target pages: index.html
- Key checks:
  - Click multiple sidebar conversation links (Travel planning request, Python debugging help, Recipe suggestions for dinner, Email draft for client, JavaScript async patterns) and confirm the main thread content changes appropriately
  - Use New chat and confirm it creates or resets to an empty/new conversation state
  - Use Close sidebar and verify the layout adapts without losing access to the main composer
  - Confirm Explore GPTs and Upgrade plan links are reachable from the sidebar
- Exit criteria:
  - At least three distinct sidebar items were visited
  - New chat and sidebar collapse were both exercised
  - No broken navigation or stuck state after switching conversations

### Message actions and utility controls

- Objective: Validate the action buttons attached to an assistant message and the composer utilities around attachment and voice.
- Target pages: index.html
- Key checks:
  - Click Copy, Thumbs up, Thumbs down, and Regenerate to confirm each control is wired and produces the expected UI feedback
  - Click Share to inspect any modal, menu, or browser-native sharing affordance if present
  - Click Attach file and Voice input to see whether they open placeholder behavior, permission prompts, or no-op states
  - Test the send button with and without text to check empty-submit handling
- Exit criteria:
  - Each visible message action has been attempted at least once
  - No crashes or unusable overlays were introduced
  - Any no-op or placeholder behavior is understood and recorded

### Pricing and upgrade path

- Objective: Validate the adjacent pricing page and the upgrade/navigation path from the chat app.
- Target pages: pricing.html, index.html
- Key checks:
  - Open Upgrade plan from the chat sidebar and confirm it lands on pricing.html
  - Toggle Monthly and Annual and verify the displayed plan content or pricing emphasis updates
  - Inspect the Free, Plus, Team, and Enterprise sections for consistency and CTA behavior
  - Attempt the visible CTA links (Get started, Upgrade to Plus, Upgrade to Team, Contact sales) and note whether they are informational or navigational only
- Exit criteria:
  - Pricing page loads successfully from the app entry point
  - Both billing toggle states have been checked
  - All visible pricing CTAs have been exercised or confirmed as non-functional placeholders

### Auth entry points and cross-links

- Objective: Validate login/signup page structure, input affordances, and cross-navigation between account pages.
- Target pages: login.html, signup.html
- Key checks:
  - Open login.html and signup.html directly to confirm both pages load and present their email input plus provider buttons
  - Type into the Email address field on both pages and inspect form behavior when continuing
  - Test the Google, Apple, and Microsoft buttons for consistent placeholder handling
  - Follow Sign up from login and Log in from signup to confirm the cross-links work
  - Inspect Terms of Use and Privacy Policy links on signup.html
- Exit criteria:
  - Both auth pages are visited and their visible controls are exercised
  - Cross-links between login and signup are verified
  - No unexpected validation errors or broken links appear

### Mobile accessibility and tap-target pass

- Objective: Repeat the most important flows in a mobile viewport and focus on the small tap targets already flagged by prescan.
- Target pages: index.html, pricing.html, login.html, signup.html
- Key checks:
  - Re-run the core chat send flow on mobile and check whether the composer, send button, and message actions remain usable
  - Re-test the sidebar controls and example chat links for accidental mis-taps or clipping
  - Check the pricing toggle and key CTAs on mobile for spacing and reachability
  - Check auth page inputs and provider buttons for mobile usability and label clarity
- Exit criteria:
  - Critical desktop flows were repeated on mobile
  - Known small-tap-target issues were confirmed or ruled out as blocking
  - No viewport-specific layout break prevents completing the main flow

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

