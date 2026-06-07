# UXAgent Exploration Plan

## Goal

Critique and validate the end-to-end UX of the ChatGPT clone: the primary in-chat messaging flow on index.html plus adjacent authentication and monetization flows (login, signup, pricing), including key error/recovery states and mobile usability.

## Plan Summary

Start on index.html and validate the core chat workflow: starting a new chat, selecting prompt examples, sending messages, and using message-level actions (copy, thumbs, regenerate, share) plus input affordances (attach/voice, search). Then traverse adjacent flows by visiting pricing.html and the login/signup pages and verifying navigation links and form interactions. Finally, repeat the most critical in-chat checks (message send + action buttons + navigation) on a mobile viewport.

## Coverage Targets

- pages: `visit all known HTML pages (index.html, login.html, pricing.html, signup.html) at least once each`
- features: `exercise most visible controls per key page: sidebar prompts + search + new chat; message actions (copy/thumbs/regenerate/share) and composer controls (attach/voice); pricing plan CTAs and auth buttons/social login stubs; terms/privacy links`
- mobile: `repeat critical index.html checks on mobile viewport (new chat, send message, copy/regenerate, sidebar access, attach/voice)`

## Planned Phases

### Core chat workflow on desktop

- Objective: Validate the main index.html experience: browsing chat history, composing/sending a message, and performing response actions.
- Target pages: index.html
- Key checks:
  - Use 'New chat' to start a fresh conversation and verify the UI resets appropriately (chat thread clears/changes, prompt area ready).
  - Use 'Search chats...' to filter/locate an existing thread (e.g., TODAY items); confirm the list updates or provides appropriate empty-state behavior.
  - Click at least two example prompt links from the sidebar (e.g., 'Travel planning request' and 'Python debugging help') and verify the assistant response renders in the chat area.
  - In the main message composer ('Message ChatGPT' textarea), send a short message via 'Send message' and verify the assistant reply begins/appears (including any typewriter/streaming effect).
  - On the latest assistant message, verify message actions: 'Copy', 'Thumbs up', 'Thumbs down', and 'Regenerate' update state/feedback appropriately.
  - Verify 'Share' on the current message produces expected front-end behavior (e.g., UI feedback, clipboard/share dialog if implemented) and doesn’t fail silently.
  - Verify 'Attach file' control responds gracefully (even if no real upload exists): check whether it opens a file picker or shows an understandable limitation.
  - Verify 'Voice input' responds gracefully (e.g., toggles UI, shows unsupported message, or starts/stops recording if stubbed).
  - Toggle sidebar visibility using 'Close sidebar' and ensure navigation/controls remain accessible after re-opening.
- Exit criteria:
  - A complete chat loop is executed at least once (send message -> assistant response -> copy/thumb/regenerate actions) with visible UI changes for each action.
  - Sidebar search and prompt selection are exercised with observable changes in the conversation view.
  - Attach and voice controls show non-broken behavior (either functional UI or clear graceful handling).

### Adjacent flows: pricing and authentication navigation

- Objective: Validate monetization and account flows including navigation correctness between pricing, login, and signup.
- Target pages: pricing.html, login.html, signup.html
- Key checks:
  - On pricing.html, verify top navigation affordances: 'Log in', 'Sign up' (links work and do not 404 in this front-end context).
  - On pricing.html, interact with at least one plan CTA (e.g., 'Get started' under Free or 'Upgrade to Plus' / 'Upgrade to Team') and verify the destination makes sense (likely login/signup or a confirmation state).
  - On login.html, test the email input and 'Continue' button (confirm inline validation or clear disabled/enabled behavior).
  - On login.html, click 'Continue with Google/Apple/Microsoft' and verify no dead-end occurs (e.g., shows stub message or transitions state).
  - On login.html, click 'Sign up' link and confirm it leads to signup.html without losing expected context.
  - On signup.html, test email input + 'Continue' button.
  - On signup.html, click 'Log in' to return to login.html and verify it works.
  - On signup.html, open 'Terms of Use' and 'Privacy Policy' links and confirm they display or navigate appropriately without breaking the page.
- Exit criteria:
  - Pricing CTAs and navigation links correctly route among pricing/login/signup pages.
  - Login and signup forms accept interaction without broken states (clear validation or stubbed but functional UI).
  - Terms/Privacy links do not cause errors and remain accessible.

### Critical mobile checks for index.html controls

- Objective: Re-validate the most risk-prone and interaction-heavy index.html controls on a mobile viewport.
- Target pages: index.html
- Key checks:
  - Confirm 'New chat', 'Close sidebar', and at least one sidebar prompt link are tappable without mis-taps.
  - Send a message from the mobile-sized composer and ensure the assistant response appears.
  - Tap 'Copy' and 'Regenerate' on the latest response; verify these actions still work and produce visible feedback.
  - If present, tap 'Attach file' and 'Voice input' and confirm the controls are not unusably small and behave gracefully.
- Exit criteria:
  - All critical controls (send + copy/regenerate + new chat/sidebar access) work on mobile-sized viewport with no major usability blockers.

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

