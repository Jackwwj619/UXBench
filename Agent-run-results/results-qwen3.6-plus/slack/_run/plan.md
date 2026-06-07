# UXAgent Exploration Plan

## Goal

Autonomously explore and critique the UX of the Slack marketing site, focusing on the pricing decision flow, feature discovery, and conversion paths (Sign Up/Sales), while validating mobile responsiveness against known layout warnings.

## Plan Summary

The run will begin by validating the primary navigation and hero section on the homepage. It will then dive deep into the Pricing page to test plan comparison logic and billing toggles. Subsequent phases will cover Feature discovery, Enterprise/Trust validation, and the 'Talk to Sales' lead generation form. The run concludes with a mobile viewport pass to verify tap targets flagged in the prescan.

## Coverage Targets

- pages: `Visit all 10 known HTML files.`
- features: `Exercise billing toggles, feature filters, form validations, and accordions.`
- mobile: `Full pass on Homepage, Pricing, and Contact pages.`

## Planned Phases

### Homepage & Navigation Baseline

- Objective: Validate global navigation consistency and primary hero CTAs.
- Target pages: index.html
- Key checks:
  - Verify all top-level nav links (Features, Solutions, Enterprise, Pricing) resolve correctly.
  - Test 'Get started free' CTA redirection to get-started.html.
  - Test 'Talk to sales' CTA redirection to contact.html.
  - Scroll through product modules (Channels, AI, Automation) to check for lazy-loading issues or broken animations.
- Exit criteria:
  - All nav links tested.
  - Primary CTAs verified.
  - No console errors during scroll.

### Pricing Logic & Comparison

- Objective: Deep dive into the pricing structure, toggles, and plan differentiation.
- Target pages: pricing.html
- Key checks:
  - Toggle between 'Monthly' and 'Annual' billing; verify price updates and discount messaging.
  - Scan the feature comparison table for visual alignment and clarity.
  - Click 'Get started free' under different tiers to ensure consistent redirection.
  - Check FAQ accordion interactions for expand/collapse functionality.
- Exit criteria:
  - Billing toggle state changes reflected in UI.
  - Comparison table fully scanned.
  - FAQs interactable.

### Feature Discovery & Enterprise Trust

- Objective: Explore detailed feature pages and enterprise-specific trust signals.
- Target pages: features.html, enterprise.html, trust.html
- Key checks:
  - On features.html: Click category tabs (Collaboration, Project Management, etc.) to filter content.
  - Test anchor links from index.html (e.g., 'Learn more about Channels') land on correct sections.
  - On enterprise.html: Verify security badges and compliance info visibility.
  - On trust.html: Check for clear hierarchy of security information.
- Exit criteria:
  - Feature filtering works.
  - Anchor links accurate.
  - Enterprise value props visible.

### Conversion Flows (Sales & Sign Up)

- Objective: Test the lead generation and account creation forms.
- Target pages: contact.html, get-started.html, signin.html
- Key checks:
  - On contact.html: Fill out 'Talk to sales' form with valid dummy data; test submit behavior.
  - On contact.html: Attempt submit with missing required fields to check validation UI.
  - On get-started.html: Test email input and 'Continue' button.
  - On signin.html: Verify 'Forgot password' and SSO options (Google/Microsoft) are present.
- Exit criteria:
  - Form validation triggered on error.
  - Success state or next step visible on valid submission.
  - SSO buttons present.

### Mobile Responsiveness & Accessibility

- Objective: Repeat critical checks on mobile viewport to address prescan warnings.
- Target pages: index.html, pricing.html, contact.html
- Key checks:
  - Switch to mobile viewport (e.g., iPhone SE/Pixel 5).
  - Verify hamburger menu opens and closes correctly.
  - Re-test tap targets for Nav links and Pricing toggles (previously flagged as <44px).
  - Ensure pricing tables stack or scroll horizontally without breaking layout.
  - Check form inputs on contact.html for zoom/focus issues.
- Exit criteria:
  - Mobile menu functional.
  - Critical tap targets accessible.
  - Layout stable on narrow screens.

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

