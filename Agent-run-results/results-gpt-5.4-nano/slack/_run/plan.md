# UXAgent Exploration Plan

## Goal

Autonomously explore and critique the UX of the full Slack marketing/pricing site, with emphasis on the primary pricing plan selection flow and adjacent entry points (get started, talk to sales, sign in), validating key states and recovery paths on both desktop and mobile viewports.

## Plan Summary

Start on index.html and validate global navigation and primary CTAs (Get started free, Talk to sales, Sign in) to establish reachable flows. Then focus on pricing.html to exercise the monthly/annual toggle and feature comparison/FAQ interactions, before moving through features.html, solutions.html, enterprise.html, trust.html, and resources.html via on-page anchors/links. Finish by validating get-started.html, signin.html, and contact.html form flows including required fields, consent/checkbox behavior, and submission/confirmation states, repeating the critical checks on mobile.

## Coverage Targets

- pages: `Visit all known HTML pages listed in prescan: about.html, contact.html, enterprise.html, features.html, get-started.html, index.html, pricing.html, resources.html, signin.html, solutions.html, trust.html.`
- features: `Exercise all visible primary controls per key page: header CTAs, pricing billing toggle + compare/FAQ, features/solutions section links, enterprise 'Watch demo/Contact sales/Compare plans', get-started Continue + SSO buttons, sign-in methods + forgot password, contact form validation + consent + submit.`
- mobile: `Repeat critical checks on mobile viewport for: header navigation/CTAs, pricing billing toggle, get-started email validation, sign-in empty-state validation, and contact form submit/confirmation.`

## Planned Phases

### Entry & IA sanity (index + header CTAs)

- Objective: Verify global navigation works consistently and that primary CTAs lead to the intended adjacent flows (pricing, get-started, contact/sales, sign-in).
- Target pages: index.html
- Key checks:
  - Click header nav: Features, Solutions, Enterprise, Pricing; confirm correct landing sections/pages.
  - Use top-right CTAs: Talk to sales (contact.html) and Get started free (get-started.html) and Sign in (signin.html); verify destinations.
  - From index page content, click 'Learn more about Channels' (features.html#channels), 'Explore AI in Slack' (features.html#ai), and 'See Workflow Builder' (features.html#integrations) to validate anchor navigation.
- Exit criteria:
  - Each clicked navigation item/CTA loads the expected page or anchor with no blank/error state.
  - Pricing link routes to pricing.html and sections are reachable without manual scroll confusion.

### Pricing plan selection UX (toggle + comparison + FAQ)

- Objective: Exercise the pricing experience end-to-end: billing toggle, plan comprehension, feature comparison readability, and FAQ interaction.
- Target pages: pricing.html
- Key checks:
  - Toggle billing period using 'Toggle billing period' and verify displayed prices and any related comparison labels update appropriately (Monthly vs Annual).
  - Check CTAs near pricing (e.g., 'Get started free' and 'Contact sales') for correct destinations and consistent styling/affordance.
  - Interact with comparison area: ensure rows/columns align (e.g., message history, Slack Connect, Workflow Builder, AI, Support/SAML/SCIM/DLP items) and any 'Compare all features' button scrolls or expands as intended.
  - Navigate to 'Frequently asked questions' section and validate expand/collapse or link behavior (if present).
- Exit criteria:
  - Billing toggle results in visible, consistent changes across price display and any plan-specific information that depends on the billing period.
  - FAQ section is accessible and interactive elements respond without breaking layout.

### Feature/solutions exploration (anchors + module coverage)

- Objective: Validate how users explore product value through feature modules and solutions by department/industry, ensuring on-page links/scrolling and hierarchy are clear.
- Target pages: features.html, solutions.html
- Key checks:
  - On features.html, click major module nav items: Collaboration, Project Management, Integrations, Intelligence; confirm they take users to corresponding sections.
  - Within features.html, click anchor-style links like 'Channels' (features.html#channels) and 'Browse integrations' (features.html#integrations) to validate deep linking.
  - On solutions.html, use 'Learn more' links for Engineering, IT, Customer Service, Sales, Project Management, Marketing, Human Resources, Security; confirm each leads to the right expanded section or scroll target.
- Exit criteria:
  - All major feature/solutions links correctly land in the intended section or reveal content without requiring excessive manual scrolling.
  - No obvious broken anchor targets or missing sections.

### Enterprise + Trust positioning (security/compliance comprehension)

- Objective: Check enterprise value communication, and validate key navigation paths to related pages (pricing/contact/compare plans).
- Target pages: enterprise.html, trust.html
- Key checks:
  - On enterprise.html, click 'Watch demo' and 'Contact sales' and ensure they route consistently (demo may be placeholder—still validate no error).
  - Click 'Compare plans' to confirm it routes to pricing.html and that the user can find comparison area.
  - From enterprise/trust sections, validate trust highlights are present and legible: encryption, compliance certifications, EKM, DLP, identity/access/SAML/SCIM; ensure scrolling order makes sense.
  - Use header CTAs (Talk to sales, Get started free) from enterprise/trust pages to ensure continuity.
- Exit criteria:
  - Enterprise page links lead to valid pages/sections with no dead ends.
  - Trust & Security content is readable and not visually truncated in key headings/subsections.

### Conversion flows: Get started, Sign in, Talk to sales

- Objective: Validate form UX, required-field handling, consent controls, and confirmation/recovery paths for primary conversion actions.
- Target pages: get-started.html, signin.html, contact.html
- Key checks:
  - get-started.html: attempt Continue with empty Work email; then try invalid and valid email formats; verify inline validation messages (or disabled/enabled state).
  - get-started.html: click 'Continue with Google/Microsoft/Apple' and ensure the UI responds (navigation placeholder vs error handling).
  - signin.html: try Sign in with empty fields; verify validation, then test 'Forgot your password?' link behavior (navigation vs inline).
  - signin.html: click 'Sign in with Google' and 'Sign in with Microsoft' to validate they trigger the expected route/state.
  - contact.html: validate required inputs (First name, Last name, Work email, Company name, Job title, Company size select, Country select, textarea); verify consent control presence and any checkbox/interaction labeled 'I agree...'.
  - contact.html: submit with missing required fields to confirm error prompts; then submit with all fields filled to confirm 'Thank you!' confirmation state appears.
- Exit criteria:
  - All critical conversion forms provide clear validation and do not allow silent failures.
  - Successful submission results in a visible confirmation state (contact.html 'Thank you!') and does not break navigation.

### Resources + about (footer-like information architecture) + mobile repeat

- Objective: Ensure supporting pages are reachable and their key links/sections work; repeat critical checks on mobile viewport to confirm tap/scroll usability.
- Target pages: resources.html, about.html
- Key checks:
  - resources.html: click Resources subsections/tiles (Help Centre, What's New, Developers, Community, Blog, Partners) to confirm routing/anchor behavior.
  - about.html: click major CTA-like links such as 'View open positions' and verify navigation works.
  - Repeat phases 1, 2, and 5 critical checks on mobile viewport: header/tap targets, pricing billing toggle, and at least one successful form submission path.
- Exit criteria:
  - All supporting links route correctly on desktop and mobile.
  - Mobile critical controls are usable (no mis-taps due to small tap targets) and billing/form interactions still work.

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

