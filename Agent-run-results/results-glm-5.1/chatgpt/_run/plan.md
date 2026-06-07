# UXAgent Exploration Plan

## Goal

Exhaustively explore and critique the UX of the ChatGPT clone, covering the primary chatbot interface, adjacent authentication and pricing flows, and validating responsive behavior and interactive states.

## Plan Summary

The exploration will proceed from the core chat interface to adjacent pages, validating interactions and state changes. Phase 1 focuses on the primary chat flow, including sending messages, triggering the hardcoded typewriter effect, and testing chat controls. Phase 2 targets sidebar navigation, history switching, and search. Phase 3 covers adjacent flows like login, signup, and pricing pages. Phase 4 validates responsive mobile layouts and addresses the numerous small tap target warnings.

## Coverage Targets

- pages: `visit all 4 known HTML pages (index, login, signup, pricing)`
- features: `exercise all visible controls: chat input, send, action buttons, sidebar toggle, history, search, auth forms, pricing toggle`
- mobile: `repeat critical checks on mobile viewport, specifically evaluating the 13 small tap target warnings`

## Planned Phases

### Primary Chat Flow

- Objective: Validate the core chat interaction, message submission, and hardcoded AI response generation.
- Target pages: index.html
- Key checks:
  - Submit a message via textarea and send button
  - Verify the hardcoded typewriter effect initiates and completes
  - Test keyword matching by sending messages like 'Python debugging help' or 'Recipe suggestions'
  - Interact with message action buttons: Copy, Thumbs up, Thumbs down, Regenerate
  - Test 'Attach file' and 'Voice input' buttons for expected UI feedback (even if non-functional)
  - Click 'Share' button and observe response
- Exit criteria:
  - At least 3 different chat messages submitted and responses received
  - All chat action buttons clicked and states observed
  - Typewriter effect confirmed working without layout shifts

### Sidebar & Navigation

- Objective: Validate sidebar controls, chat history switching, and navigation to adjacent pages.
- Target pages: index.html
- Key checks:
  - Click 'New chat' button and verify chat area resets
  - Click existing chat history items (Travel planning, Python debugging, etc.) and verify context switches
  - Test 'Search chats...' input field
  - Toggle 'Close sidebar' button and verify layout adjusts
  - Click 'Explore GPTs' link and verify UI response
  - Click 'Upgrade plan' link and verify navigation to pricing.html
- Exit criteria:
  - Sidebar toggled open and closed successfully
  - Chat history successfully switched at least twice
  - Search input interacted with
  - Navigation to pricing.html confirmed

### Adjacent Auth & Pricing Flows

- Objective: Explore the login, signup, and pricing pages for layout, form interactions, and navigation links.
- Target pages: login.html, signup.html, pricing.html
- Key checks:
  - Navigate to login.html, test email input and 'Continue' button, check SSO buttons (Google, Apple, Microsoft)
  - Navigate between login.html and signup.html via 'Sign up' / 'Log in' links
  - Navigate to signup.html, test email input, check 'Terms of Use' and 'Privacy Policy' links
  - On pricing.html, toggle between 'Monthly' and 'Annual Save 17%' plans
  - Verify pricing card CTAs ('Get started', 'Upgrade to Plus', 'Upgrade to Team', 'Contact sales')
- Exit criteria:
  - Login and signup forms tested with valid/invalid input patterns
  - Pricing toggle between Monthly and Annual confirmed
  - All cross-links between auth pages and pricing clicked

### Mobile Viewport & Accessibility

- Objective: Validate responsive layouts on mobile and re-check critical flows, specifically targeting the small tap target warnings.
- Target pages: index.html, login.html, pricing.html
- Key checks:
  - Switch to mobile viewport and verify sidebar behavior (hamburger menu/collapsible)
  - Attempt to tap small chat action buttons (Copy, Thumbs up/down) on mobile
  - Verify chat input area and send button layout on mobile
  - Check login and signup form usability on mobile viewport
  - Verify pricing card layout and tap targets on mobile
- Exit criteria:
  - Mobile layout rendered without horizontal overflow on all pages
  - Small tap targets evaluated for usability on touch devices
  - Core chat submission tested successfully on mobile viewport

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

