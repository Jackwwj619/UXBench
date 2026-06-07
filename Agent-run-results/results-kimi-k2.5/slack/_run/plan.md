# UXAgent Exploration Plan

## Goal

Explore and critique the UX of the Slack marketing + pricing site, focusing on primary flows (pricing, sign-up, features) and adjacent pages, validating interactions, layout, and mobile responsiveness.

## Plan Summary

Start with the home page (index.html), explore primary flows (pricing, sign-up, features) in phases, validate interactables (links, buttons, forms), check layout warnings (small tap targets), and repeat critical checks in mobile viewport. Cover all known HTML pages, exercise visible controls, and validate mobile responsiveness.

## Coverage Targets

- pages: `Visit all 11 known HTML pages`
- features: `Exercise most visible controls (links, buttons, forms) on key pages (index, pricing, features, get-started, signin)`
- mobile: `Repeat critical checks (navigation, pricing, sign-up) in mobile viewport, validate layout and interactables`

## Planned Phases

### Home Page & Navigation

- Objective: Validate home page (index.html) interactables, navigation links, and mobile layout warnings.
- Target pages: index.html
- Key checks:
  - Click navigation links (Features, Solutions, Enterprise, Pricing, Sign in, Talk to sales, Get started free)
  - Verify mobile layout warnings (small tap targets) for top interactables
  - Check hero section interactables (Get started free, Talk to sales)
- Exit criteria:
  - All home page interactables clicked, navigation links verified, mobile layout warnings documented

### Pricing Flow

- Objective: Explore pricing page (pricing.html), validate plan selection, billing toggle, and feature comparison.
- Target pages: pricing.html
- Key checks:
  - Click 'Toggle billing period' (monthly/annual)
  - Explore plan cards (Free, Pro, Business+, Enterprise+)
  - Interact with feature comparison table (All, Productivity, AI toggles)
  - Check 'Get started free' and 'Contact sales' buttons
- Exit criteria:
  - Pricing page interactables exercised, billing toggle validated, feature comparison explored

### Sign-Up & Sign-In

- Objective: Validate sign-up (get-started.html) and sign-in (signin.html) flows, including forms and social login options.
- Target pages: get-started.html, signin.html
- Key checks:
  - Interact with get-started.html form (Work email, Continue, social login buttons)
  - Validate signin.html form (Email, Password, social login, 'Create an account', 'Forgot your password?')
  - Check mobile layout for form inputs (tap target size)
- Exit criteria:
  - Sign-up and sign-in forms interacted with, social login options verified, mobile form layout documented

### Features & Solutions

- Objective: Explore features (features.html) and solutions (solutions.html) pages, validate feature modules and solution categories.
- Target pages: features.html, solutions.html
- Key checks:
  - Click feature modules (Channels, Slack Connect, Huddles, etc.) in features.html
  - Explore solution categories (Engineering, IT, Customer Service, etc.) in solutions.html
  - Verify navigation back to home/pricing
  - Check mobile layout warnings for feature/solution links
- Exit criteria:
  - All major feature modules and solution categories explored, navigation verified, mobile layout documented

### Adjacent Pages (About, Contact, Enterprise, Resources, Trust)

- Objective: Explore adjacent pages (about.html, contact.html, enterprise.html, resources.html, trust.html), validate content and interactables.
- Target pages: about.html, contact.html, enterprise.html, resources.html, trust.html
- Key checks:
  - Interact with about.html (company info, careers)
  - Validate contact.html form (input fields, submission button)
  - Explore enterprise.html (security, scale, AI features)
  - Check resources.html (Help Centre, What's New, Developers)
  - Verify trust.html (security, compliance, encryption)
- Exit criteria:
  - All adjacent pages explored, interactables exercised, content validated

### Mobile Responsiveness

- Objective: Repeat critical checks (navigation, pricing, sign-up) in mobile viewport, validate layout and interactables.
- Target pages: index.html, pricing.html, get-started.html
- Key checks:
  - Recheck navigation links in mobile viewport
  - Validate pricing page plan selection and billing toggle in mobile
  - Verify sign-up form (get-started.html) input fields and buttons in mobile
  - Document mobile-specific layout warnings (small tap targets)
- Exit criteria:
  - Critical checks repeated in mobile viewport, mobile layout validated, warnings documented

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

