# UXAgent Exploration Plan

## Goal

Exhaustively explore the Slack marketing site with emphasis on the pricing journey, plan comparison, and adjacent conversion paths into contact, sign-in, and account creation, while validating feature, solutions, enterprise, trust, and resource pages in both desktop and mobile viewports.

## Plan Summary

Start from the home page and treat pricing as the primary flow: verify the pricing page, billing toggle, plan cards, feature comparison, category filters, FAQ, and outbound conversion links. Then follow adjacent paths into get started, sign in, contact sales, enterprise, features, solutions, trust, and resources to confirm cross-page consistency and recovery routes. Because the prescan shows many small tap targets and mostly link-driven navigation, repeat the most important interactions on mobile and look for spacing/tap issues as part of the critique.

## Coverage Targets

- pages: `visit all known HTML pages, with deeper interaction on pricing.html, contact.html, signin.html, get-started.html, features.html, solutions.html, enterprise.html, trust.html, resources.html, and about.html`
- features: `exercise most visible controls on key pages, including pricing toggle, pricing filters, FAQ items, form inputs/selects/checkboxes, and representative deep links`
- mobile: `repeat the primary pricing path and at least one conversion form on mobile viewport, then spot-check nav/footer tap targets across key pages`

## Planned Phases

### Baseline navigation and pricing entry

- Objective: Confirm the global nav and primary entry points from the home page into pricing, features, enterprise, contact sales, and get started.
- Target pages: index.html, pricing.html, features.html, contact.html, get-started.html
- Key checks:
  - Open Pricing from the top nav and verify the page title and default monthly/annual state.
  - From the home page, click the prominent CTAs 'Get started free' and 'Talk to sales' and confirm they land on the expected account/signup and contact pages.
  - Use the home page feature links (Channels, AI, Workflow Builder, integrations, See pricing) to confirm anchor navigation into features/pricing.
  - Check that top navigation stays consistent across pages and that back navigation returns to the correct source page.
- Exit criteria:
  - Pricing page and both conversion CTAs have been reached at least once.
  - At least one anchor-based feature link from the home page has been exercised successfully.
  - No broken navigation or unexpected load errors observed in these primary entry paths.

### Pricing depth validation

- Objective: Validate the core pricing decision flow, including plan presentation, billing toggle, comparison controls, and FAQ content.
- Target pages: pricing.html
- Key checks:
  - Switch between monthly and annual billing and verify displayed prices and any savings messaging update correctly.
  - Inspect each plan column: Free, Pro, Business+, Enterprise+; confirm CTA labels and plan differentiators are coherent.
  - Exercise the compare-all-features section and category filters (All, Productivity, AI) and verify table content changes or filtering behavior.
  - Open FAQ items and confirm expand/collapse behavior if present.
  - Test plan-level conversion links, especially 'Get started free' and 'Contact sales', for expected destinations.
- Exit criteria:
  - Both billing states have been checked.
  - All visible pricing controls on the page have been exercised at least once.
  - Feature comparison and FAQ behavior have been validated with no state glitches.

### Conversion and recovery flows

- Objective: Stress the adjacent account and lead flows that a pricing visitor might use when ready to convert or when needing help.
- Target pages: get-started.html, signin.html, contact.html
- Key checks:
  - On get-started, type a work email and verify the Continue button transitions to the 'Check your email' state or equivalent confirmation.
  - Verify the alternate sign-in provider buttons on get-started and sign-in pages are visible and behave sensibly as non-password options.
  - On sign-in, test the email/password form, the Google/Microsoft buttons, 'Create an account', and 'Forgot your password?' links.
  - On contact sales, fill required fields, choose dropdown values, test the consent checkbox, and submit to confirm the thank-you state.
- Exit criteria:
  - Each of the three conversion/recovery pages has had its primary form or CTA exercised.
  - At least one success/confirmation state has been observed.
  - Any validation requirements or disabled-state behavior have been recorded.

### Feature and solution discovery

- Objective: Check whether the marketing content and deep links accurately represent the product areas that feed the pricing decision.
- Target pages: features.html, solutions.html, enterprise.html, trust.html
- Key checks:
  - On features, jump to #channels, #ai, and #integrations and verify section content matches the anchor labels from the home page.
  - Exercise the visible feature-category links on features (Collaboration, Project Management, Integrations, Intelligence) and compare their destinations or scroll behavior.
  - On solutions, click representative department links such as Engineering, IT, Customer Service, Sales, Marketing, HR, and Security to confirm they route or reveal expected content.
  - On enterprise and trust, inspect sales and security CTAs and verify messaging aligns with enterprise readiness and compliance claims.
- Exit criteria:
  - At least three anchor/section targets on features have been validated.
  - At least four solution department links have been exercised.
  - Enterprise and trust pages have each had their primary CTA and one secondary link inspected.

### Resources and brand/support breadth

- Objective: Validate the broader support and content ecosystem links that appear in the navigation/footer areas.
- Target pages: resources.html, about.html
- Key checks:
  - On resources, open Help Centre, What's New, Developers, Community, Blog, and Partners links or cards to verify their behavior.
  - On about, inspect the mission/story/careers content and test the open positions and relevant adjacent links.
  - Confirm footer/category links are consistent with the top navigation and do not lead to dead ends.
  - Return to the main pages after each deep link to ensure site-wide navigation remains stable.
- Exit criteria:
  - The main resources cards/links have been exercised.
  - About page content has been reviewed and at least one career or team-related link checked.
  - No navigation regressions or mismatched destinations observed.

### Mobile regression pass

- Objective: Repeat the critical conversion and pricing checks in mobile viewport to catch tap-target and responsive layout issues.
- Target pages: index.html, pricing.html, contact.html, signin.html, get-started.html, features.html
- Key checks:
  - Verify top nav usability on mobile, especially Features, Pricing, Sign in, Talk to sales, and Get started free.
  - Repeat the pricing toggle, plan CTA, and compare/filter interactions on mobile.
  - Repeat one form flow on mobile (preferably contact sales or get started) to confirm fields, selects, and submit controls remain usable.
  - Check that anchored links and small text links do not become impossible to tap or misaligned on narrow widths.
- Exit criteria:
  - Critical pricing and conversion interactions have been repeated on mobile.
  - Tap-target issues are logged where present, especially on nav and inline links.
  - Responsive layout appears functional enough to support the primary flow.

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

