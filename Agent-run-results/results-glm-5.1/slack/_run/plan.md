# UXAgent Exploration Plan

## Goal

Autonomously explore and critique the UX of the full Slack system, prioritizing the primary pricing flow plus adjacent pages, states, and recovery paths.

## Plan Summary

The exploration will start by deeply analyzing the primary pricing page, including toggling billing periods and validating feature comparisons. It will then traverse the adjacent acquisition flows (Get Started, Sign In, Contact Sales) to test form validations and state changes. Next, it will validate the core marketing pages (Features, Solutions, Enterprise, Trust) and their deep links. Finally, the run will repeat critical checks on a mobile viewport to assess responsiveness and tap target issues identified in the prescan.

## Coverage Targets

- pages: `visit all 11 known HTML pages`
- features: `exercise all visible toggles, form submissions, deep link navigations, and tab filters`
- mobile: `repeat critical checks on mobile viewport, specifically targeting known small tap targets and form layouts`

## Planned Phases

### Pricing Flow Deep Dive

- Objective: Validate the primary pricing page interactions, billing toggle, and feature comparison table.
- Target pages: pricing.html
- Key checks:
  - Toggle between Monthly and Annual billing and verify price updates
  - Expand/collapse the 'Compare all features' table
  - Click category filters (All, Productivity, AI) if they affect the comparison table
  - Verify 'Get started free' and 'Contact sales' buttons for each plan
  - Check FAQ section expand/collapse behavior
- Exit criteria:
  - Billing toggle successfully switches prices
  - Feature comparison table is fully expanded and filtered
  - All plan CTA buttons are clicked and verified

### Acquisition & Auth Flows

- Objective: Test the signup, signin, and sales contact forms for validation, state changes, and recovery paths.
- Target pages: get-started.html, signin.html, contact.html
- Key checks:
  - Submit get-started.html with empty email to trigger validation
  - Submit signin.html with invalid credentials to observe error state
  - Click 'Forgot your password?' and verify the reset UI appears
  - Fill out and submit the contact.html form, checking required field validation and the success state ('Thank you!' heading)
- Exit criteria:
  - Form validation errors are triggered on all three forms
  - Password reset flow is observed
  - Contact form success state is observed

### Core Marketing & Deep Links

- Objective: Validate navigation, deep links, and content rendering on feature and solution pages.
- Target pages: index.html, features.html, solutions.html, enterprise.html
- Key checks:
  - Click deep links from index.html (e.g., 'Learn more about Channels', 'Explore AI in Slack') and verify scroll/navigation on features.html
  - Verify features.html internal tab navigation (Collaboration, Project Management, Integrations, Intelligence)
  - Click 'Learn more' links on solutions.html for various departments
  - Verify enterprise.html CTA navigation and content layout
- Exit criteria:
  - All index.html deep links successfully navigate to the correct section
  - Features page tabs switch content correctly
  - Solutions page links are clicked and verified

### Supporting Pages & Trust

- Objective: Cover the remaining supporting pages to ensure complete flow coverage and link integrity.
- Target pages: trust.html, about.html, resources.html
- Key checks:
  - Verify trust.html security and compliance sections render correctly
  - Click 'Contact sales' from trust.html
  - Verify resources.html cards (Help Centre, Developers, etc.) are clickable
  - Check about.html layout and stats section
- Exit criteria:
  - All three pages are fully scrolled and visually verified
  - Primary CTAs on these pages are clicked

### Mobile Responsiveness Check

- Objective: Re-evaluate critical flows and layout on a mobile viewport, addressing prescan tap target warnings.
- Target pages: index.html, pricing.html, get-started.html
- Key checks:
  - Verify mobile navigation menu (hamburger) opens and closes on index.html
  - Check pricing.html table layout and billing toggle on mobile
  - Validate get-started.html form inputs and social login buttons on mobile
  - Assess tap target sizes for footer links and inline text links
- Exit criteria:
  - Mobile navigation is functional
  - Pricing comparison is readable and toggleable on mobile
  - Signup form is usable on mobile

## Prescan Summary

### Slack – Where Work Happens

- Page: `index.html`
- Headings: Made for people.
Built for productivity., Organise your work around topics, teams and projects, Work smarter with AI built into every conversation, Automate routine work with Workflow Builder, Connect 2,600+ apps to your workspace, See what Slack can do for your team
- Interactables: `1` buttons, `42` links, `0` inputs
- Notable controls:
  - clickable:a:slack
  - clickable:a:Features
  - clickable:a:Solutions
  - clickable:a:Enterprise
  - clickable:a:Pricing
  - clickable:a:Sign in
  - clickable:a:Talk to sales
  - clickable:a:Get started free

### About – Slack

- Page: `about.html`
- Headings: About Slack, Our Mission, Our Story, By the Numbers, Careers
- Interactables: `1` buttons, `23` links, `0` inputs
- Notable controls:
  - clickable:a:slack
  - clickable:a:Features
  - clickable:a:Solutions
  - clickable:a:Enterprise
  - clickable:a:Pricing
  - clickable:a:Sign in
  - clickable:a:Talk to sales
  - clickable:a:Get started free

### Contact Sales – Slack

- Page: `contact.html`
- Headings: Talk to sales, Thank you!
- Interactables: `2` buttons, `23` links, `9` inputs
- Notable controls:
  - clickable:a:slack
  - clickable:a:Features
  - clickable:a:Solutions
  - clickable:a:Enterprise
  - clickable:a:Pricing
  - clickable:a:Sign in
  - clickable:a:Get started free
  - typeable:input:First name *

### Slack Enterprise – Security, Scale & AI

- Page: `enterprise.html`
- Headings: Secure. Scaleable. Silo-free., Enterprise-grade Security, Scale Without Limits, AI-Powered Productivity, Connect your entire tech stack, Compliance you can count on, Ready to transform how your enterprise works?
- Interactables: `1` buttons, `26` links, `0` inputs
- Notable controls:
  - clickable:a:slack
  - clickable:a:Features
  - clickable:a:Solutions
  - clickable:a:Enterprise
  - clickable:a:Pricing
  - clickable:a:Sign in
  - clickable:a:Talk to sales
  - clickable:a:Get started free

### Slack Features – Team Collaboration Tools

- Page: `features.html`
- Headings: One platform for your entire workday, Collaboration, Channels, Slack Connect, Huddles, Clips, Messaging, Enterprise, Project Management, Templates
- Interactables: `1` buttons, `40` links, `0` inputs
- Notable controls:
  - clickable:a:slack
  - clickable:a:Features
  - clickable:a:Solutions
  - clickable:a:Enterprise
  - clickable:a:Pricing
  - clickable:a:Sign in
  - clickable:a:Talk to sales
  - clickable:a:Get started free

### Get Started – Slack

- Page: `get-started.html`
- Headings: Create your Slack workspace, Check your email
- Interactables: `5` buttons, `5` links, `1` inputs
- Notable controls:
  - clickable:a:slack
  - typeable:input:Work email
  - clickable:button:Continue
  - clickable:button:Continue with Google
  - clickable:button:Continue with Microsoft
  - clickable:button:Continue with Apple
  - clickable:a:Sign in

### Slack Pricing – Free, Pro, Business+, Enterprise+

- Page: `pricing.html`
- Headings: Choose a plan that's built for your business., Free, Pro, Business+, Enterprise+, Compare all features, Frequently asked questions, Whatever work you do, you can do it in Slack
- Interactables: `13` buttons, `28` links, `0` inputs
- Notable controls:
  - clickable:a:slack
  - clickable:a:Features
  - clickable:a:Solutions
  - clickable:a:Enterprise
  - clickable:a:Pricing
  - clickable:a:Sign in
  - clickable:a:Talk to sales
  - clickable:a:Get started free

### Resources – Slack

- Page: `resources.html`
- Headings: Resources, Help Centre, What's New, Developers, Community, Blog, Partners, Ready to get started?
- Interactables: `1` buttons, `30` links, `0` inputs
- Notable controls:
  - clickable:a:slack
  - clickable:a:Features
  - clickable:a:Solutions
  - clickable:a:Enterprise
  - clickable:a:Pricing
  - clickable:a:Sign in
  - clickable:a:Talk to sales
  - clickable:a:Get started free

### Sign In – Slack

- Page: `signin.html`
- Headings: Sign in to Slack, Welcome back!, Reset your password
- Interactables: `4` buttons, `5` links, `3` inputs
- Notable controls:
  - clickable:a:slack
  - typeable:input:Email address
  - typeable:input:Password
  - clickable:button:Sign in
  - clickable:button:Sign in with Google
  - clickable:button:Sign in with Microsoft
  - clickable:a:Create an account
  - clickable:a:Forgot your password?

### Slack Solutions – For Every Team and Industry

- Page: `solutions.html`
- Headings: Solutions for every team, By Department, Engineering, IT, Customer Service, Sales, Project Management, Marketing, Human Resources, Security
- Interactables: `1` buttons, `40` links, `0` inputs
- Notable controls:
  - clickable:a:slack
  - clickable:a:Features
  - clickable:a:Solutions
  - clickable:a:Enterprise
  - clickable:a:Pricing
  - clickable:a:Sign in
  - clickable:a:Talk to sales
  - clickable:a:Get started free

### Trust & Security – Slack

- Page: `trust.html`
- Headings: Trust & Security, Data Encryption, Compliance Certifications, Enterprise Key Management, Data Loss Prevention, Identity & Access, Privacy Principles, Privacy & Terms, Security questions?
- Interactables: `1` buttons, `24` links, `0` inputs
- Notable controls:
  - clickable:a:slack
  - clickable:a:Features
  - clickable:a:Solutions
  - clickable:a:Enterprise
  - clickable:a:Pricing
  - clickable:a:Sign in
  - clickable:a:Talk to sales
  - clickable:a:Get started free

