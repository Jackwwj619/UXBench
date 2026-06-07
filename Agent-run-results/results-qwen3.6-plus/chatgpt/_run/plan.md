# UXAgent Exploration Plan

## Goal

Evaluate the UX of a static ChatGPT clone, focusing on the chat interface interaction flow, sidebar navigation, and responsive layout constraints.

## Plan Summary

The run will validate the primary chat loop (input -> simulated streaming response) and secondary flows like history navigation and pricing. It will specifically test the 'fake' AI behavior to ensure the typewriter effect feels natural despite being hardcoded. Finally, it will audit mobile responsiveness given the prescan warnings about small tap targets.

## Coverage Targets

- pages: `Visit all 4 HTML files (index, pricing, login, signup).`
- features: `Exercise all visible buttons in the chat footer (attach, voice, send) and message actions (copy, vote, regenerate).`
- mobile: `Full pass on index.html and pricing.html to document touch target usability.`

## Planned Phases

### Primary Chat Interaction & Simulation

- Objective: Validate the core loop: sending messages, receiving simulated streaming responses, and using post-response controls.
- Target pages: index.html
- Key checks:
  - Send a generic message to trigger a default/hardcoded response.
  - Observe the 'typewriter' streaming effect for smoothness.
  - Test 'Regenerate' to see if it cycles through different hardcoded responses.
  - Test 'Copy', 'Thumbs Up', and 'Thumbs Down' for visual feedback states.
  - Test 'Attach file' and 'Voice input' buttons for expected UI reactions (even if non-functional).
- Exit criteria:
  - At least two distinct conversation turns completed.
  - All post-message action buttons clicked and visually verified.

### Navigation & History Management

- Objective: Ensure sidebar interactions, history switching, and view toggles work without breaking layout.
- Target pages: index.html
- Key checks:
  - Click existing history items (e.g., 'Travel planning request') to load that context.
  - Click 'New chat' to reset the main view.
  - Toggle 'Close sidebar' and verify main content expands/reflows correctly.
  - Use 'Search chats...' input to filter the history list.
  - Click 'Explore GPTs' and 'Upgrade plan' links to ensure routing works.
- Exit criteria:
  - Sidebar open/close state toggled successfully.
  - Navigated to at least one historical chat and back to new chat.

### Monetization & Auth Flows

- Objective: Verify the structure and navigation of the pricing and authentication pages.
- Target pages: pricing.html, login.html, signup.html
- Key checks:
  - On Pricing: Toggle between 'Monthly' and 'Annual' to check for price updates.
  - On Pricing: Click 'Get started' or 'Upgrade' to check navigation logic.
  - On Login/Signup: Verify form layouts and social login button presence.
  - Check links between Login and Signup pages ('Don't have an account?', 'Already have an account?').
- Exit criteria:
  - Pricing toggle interaction verified.
  - Auth page navigation loop (Login <-> Signup) verified.

### Mobile Responsiveness & Accessibility Audit

- Objective: Re-evaluate critical paths on mobile viewport, focusing on the prescan's tap target warnings.
- Target pages: index.html, pricing.html
- Key checks:
  - Repeat Phase 1 (Chat) on mobile viewport.
  - Specifically attempt to tap 'Thumbs up/down' and 'Copy' buttons (identified as small targets).
  - Verify sidebar opens/closes cleanly on mobile (hamburger menu behavior).
  - Check if text in the chat window remains readable and doesn't overflow horizontally.
- Exit criteria:
  - Critical chat functions usable on mobile despite small tap targets.
  - No horizontal scrolling issues in chat bubbles.

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

