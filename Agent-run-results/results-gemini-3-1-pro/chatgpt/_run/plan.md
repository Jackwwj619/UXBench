# UXAgent Exploration Plan

## Goal

Autonomously explore and critique the UX of the full ChatGPT clone system, prioritizing the primary chatbot interface flow, adjacent pages, states, and recovery paths.

## Plan Summary

The exploration will first focus on the core chat experience, sending messages and validating the simulated streaming responses and message action buttons. It will then thoroughly test the sidebar navigation, including chat history selection and mobile responsiveness. Finally, the run will cover the adjacent authentication (login/signup) and pricing pages to ensure form controls and layout integrity are solid across all viewports.

## Coverage Targets

- pages: `Visit index.html, login.html, signup.html, and pricing.html.`
- features: `Exercise messaging, simulated streaming, sidebar toggles, history links, auth forms, and pricing toggles.`
- mobile: `Strictly verify sidebar toggling on index.html and card stacking on pricing.html using the mobile viewport.`

## Planned Phases

### Core Chat Interface & Messaging

- Objective: Validate the primary chat flow, message input, simulated response streaming, and message actions.
- Target pages: index.html
- Key checks:
  - Type and send a message in the chat input.
  - Wait for the simulated streaming response to complete.
  - Interact with message action buttons (Copy, Thumbs up, Thumbs down, Regenerate).
  - Test 'Attach file' and 'Voice input' buttons for visual feedback or errors.
- Exit criteria:
  - At least one message has been sent, received, and its action buttons interacted with without breaking the UI.

### Sidebar Navigation & History

- Objective: Ensure the sidebar controls, chat history, and new chat functionality work correctly across viewports.
- Target pages: index.html
- Key checks:
  - Click 'Close sidebar' / 'Open sidebar' toggle.
  - Click on existing chat history links (e.g., 'Python debugging help').
  - Type in the 'Search chats...' input.
  - Click the 'New chat' button to reset the chat view.
  - Verify sidebar behavior specifically on a mobile viewport.
- Exit criteria:
  - Sidebar has been toggled, a history item selected, and a new chat initiated.

### Authentication Flows

- Objective: Verify the layout, form inputs, and navigation of the login and signup pages.
- Target pages: login.html, signup.html
- Key checks:
  - Navigate to login.html, enter an email, and click 'Continue'.
  - Click the 'Sign up' link to navigate to signup.html.
  - Test standard form validation on the signup email input.
  - Verify styling of third-party OAuth buttons (Google, Apple, Microsoft).
- Exit criteria:
  - Both login and signup pages have been visited, forms interacted with, and transition between them confirmed.

### Pricing & Upgrades

- Objective: Check the pricing page layout, billing toggles, and CTA functionality.
- Target pages: pricing.html
- Key checks:
  - Navigate to pricing.html from the chat sidebar ('Upgrade plan').
  - Toggle between 'Monthly' and 'Annual' billing options and observe price changes.
  - Verify layout of the pricing tier cards (Free, Plus, Team, Enterprise) on both desktop and mobile.
  - Click a 'Get started' or 'Upgrade' CTA.
- Exit criteria:
  - Pricing page explored, billing toggle clicked, and responsive layout verified.

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

