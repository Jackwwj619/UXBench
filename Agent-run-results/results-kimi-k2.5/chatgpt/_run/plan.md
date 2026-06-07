# UXAgent Exploration Plan

## Goal

Critique the UX of the ChatGPT clone, focusing on the chat interface, navigation, and adjacent pages (login, signup, pricing) across desktop and mobile views.

## Plan Summary

Explore the chat interface (index.html) first, validating chat interactions, sidebar navigation, and mobile tap targets. Then check login/signup flows and pricing page, ensuring consistency and usability across viewports. Prioritize core chat functionality and account-related paths.

## Coverage Targets

- pages: `Visit all 4 HTML pages (index, login, signup, pricing)`
- features: `Exercise 80% of visible controls (chat, navigation, forms, buttons) per page`
- mobile: `Replicate 100% of critical checks (chat, navigation, forms) in mobile view`

## Planned Phases

### Chat Interface Exploration (Desktop)

- Objective: Validate chat interactions, sidebar navigation, and core UI elements on desktop.
- Target pages: index.html
- Key checks:
  - Click 'New chat' to open a new chat (check UI update)
  - Interact with sidebar links (e.g., 'Travel planning request', 'Upgrade plan')
  - Test chat input: type a message, send, and check response (hardcoded)
  - Validate 'Regenerate', 'Copy', 'Thumbs up/down' buttons (check UI feedback)
- Exit criteria:
  - All core chat controls tested; sidebar navigation verified.

### Mobile Viewport Validation

- Objective: Replicate phase-1 checks in mobile view, focusing on tap target usability and responsive layout.
- Target pages: index.html
- Key checks:
  - Test 'New chat' button (tap target size >44px? If not, note usability risk)
  - Navigate sidebar links (check touch targets and responsiveness)
  - Send a chat message via mobile input (check keyboard interaction and send button)
  - Verify 'Upgrade plan' link navigates to pricing.html (mobile)
- Exit criteria:
  - Critical mobile interactions (chat, navigation) validated; tap target warnings addressed.

### Account & Pricing Flows

- Objective: Explore login, signup, and pricing pages, checking form usability and navigation.
- Target pages: login.html, signup.html, pricing.html
- Key checks:
  - Login page: test email input, 'Continue' button, and social login options (UI feedback)
  - Signup page: replicate login checks, verify 'Log in' link navigates back to login.html
  - Pricing page: check 'Monthly/Annual' toggle, 'Upgrade to Plus' button, and FAQ navigation
  - Validate cross-page navigation (e.g., 'Upgrade plan' from index → pricing.html)
- Exit criteria:
  - All account/pricing pages visited; forms and navigation verified.

### Final Usability Critique

- Objective: Synthesize findings, check remaining controls (e.g., 'Explore GPTs', 'Share'), and validate error states (if any).
- Target pages: index.html, pricing.html
- Key checks:
  - Test 'Explore GPTs' (check UI update, if any)
  - Verify 'Share' button (UI feedback, even if static)
  - Check pricing page FAQs (if present) and 'Contact sales' link
  - Confirm all target pages visited and critical flows validated
- Exit criteria:
  - All pages/controls explored; usability risks (tap targets, form flows) documented.

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

