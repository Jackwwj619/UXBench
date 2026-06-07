# UXAgent Exploration Plan

## Goal

Explore the full Slack marketing/pricing site with emphasis on the pricing decision flow, then validate adjacent acquisition, sales-contact, sign-in, and supporting content paths across desktop and mobile.

## Plan Summary

Start from the homepage and pricing entry points to understand how a visitor is pushed toward plan selection, sales contact, or free signup. Then exercise the highest-value stateful pages: pricing toggles/filters, get-started, sign-in, and contact form flows including likely success and validation states. After the primary conversion paths are covered, sweep supporting product, enterprise, solutions, resources, about, and trust pages to confirm navigation consistency, anchor behavior, and CTA routing, with a final mobile-focused pass on the most critical interactions.

## Coverage Targets

- pages: `Visit all 11 known HTML pages, with repeated passes on index.html, pricing.html, get-started.html, contact.html, signin.html, and features.html.`
- features: `Exercise most visible controls on pricing, all visible form flows on get-started/signin/contact, top-level nav and CTA routes, and key in-page/anchor navigation on features and homepage.`
- mobile: `Repeat the critical conversion and navigation checks on mobile viewport for the homepage, pricing interactions, and all form pages, with explicit attention to the prescan's small tap target warnings.`

## Planned Phases

### Map the primary acquisition and pricing funnel

- Objective: Validate how homepage and top navigation direct users into pricing, free signup, and sales-contact paths.
- Target pages: index.html, pricing.html, get-started.html, contact.html
- Key checks:
  - From index.html, verify header CTAs and hero CTAs route distinctly to get-started.html and contact.html
  - Use the homepage 'See pricing' CTA and top-nav 'Pricing' link to confirm both reach pricing.html cleanly
  - Check whether homepage feature teaser links land on the intended sections of features.html via anchors
  - Confirm pricing page presents clear differentiation among Free, Pro, Business+, and Enterprise+ before any interaction
  - Follow at least one self-serve CTA from pricing to get-started.html and one sales CTA to contact.html
- Exit criteria:
  - Evidence captured for the main paths: Home -> Pricing, Home/Pricing -> Get Started, and Home/Pricing/Enterprise -> Contact Sales
  - CTA routing from homepage and pricing is confirmed or issues are documented
  - Anchor-based handoff from homepage to features sections is sampled and verified

### Stress the pricing page states

- Objective: Deeply validate the main pricing decision surface, including interactive controls and comparison content.
- Target pages: pricing.html
- Key checks:
  - Toggle billing period and verify visible pricing, savings copy, and plan-card consistency update together
  - Exercise feature-category buttons such as All, Productivity, and AI to see whether the comparison table content changes meaningfully and predictably
  - Inspect plan CTAs on each pricing column for correct destination and labeling consistency
  - Review FAQ expand/collapse behavior if interactive, or at minimum verify FAQ discoverability and readability
  - Scroll through the comparison table to ensure feature rows remain understandable and not visually broken
- Exit criteria:
  - Both billing states are observed and compared
  - Most visible pricing controls have been exercised at least once
  - At least one issue or confirmation note exists for pricing interactivity, CTA consistency, and table usability

### Validate form and recovery flows

- Objective: Exercise the site's stateful forms and recovery paths to ensure users can progress, recover, or receive clear feedback.
- Target pages: get-started.html, signin.html, contact.html
- Key checks:
  - On get-started.html, try submitting with empty/invalid email and then with a plausible valid email to observe validation and the 'Check your email' state
  - Inspect behavior of 'Continue with Google', 'Continue with Microsoft', and 'Continue with Apple' buttons for clarity and consistency
  - On signin.html, test empty/partial credentials, standard sign-in submission, and 'Forgot your password?' to reach the reset flow
  - Verify 'Create an account' from signin routes into get-started.html or equivalent account-creation path
  - On contact.html, test required field handling, company size and country selects, optional job title/message inputs, consent checkbox, and successful submit to the visible thank-you state
- Exit criteria:
  - At least one successful end state is reached on each of get-started, sign-in recovery, and contact form pages where supported
  - Required-field validation behavior is documented for contact and get-started/sign-in forms
  - Provider buttons and alternate recovery/account-creation links are checked for clear navigation

### Sweep supporting product and trust content

- Objective: Cover adjacent pages that influence pricing decisions and ensure navigation, CTA hierarchy, and cross-linking are coherent.
- Target pages: features.html, enterprise.html, solutions.html, resources.html, trust.html, about.html
- Key checks:
  - On features.html, use category navigation (Collaboration, Project Management, Integrations, Intelligence) and verify section jumps/content grouping
  - Confirm homepage deep links into features sections (channels, AI, integrations) land where expected
  - On enterprise.html, verify 'Watch demo', 'Talk to sales'/'Contact sales', and 'Compare plans' routes support enterprise decision-making
  - On solutions.html, sample multiple 'Learn more' links to see whether they provide meaningful navigation or all collapse to the same page
  - On resources.html, test the resource cards and end-of-page CTAs for sensible routing
  - On trust.html and about.html, confirm trust-building content is readable and supporting CTAs connect back into enterprise/contact/get-started flows
- Exit criteria:
  - All remaining known HTML pages are visited at least once
  - Key internal link patterns and major CTAs on support pages are sampled and documented
  - Navigation consistency and any dead-end or repetitive-link issues are identified

### Repeat critical checks on mobile

- Objective: Re-run the highest-risk journeys on a mobile viewport, focusing on tap-target usability, layout stability, and conversion flow continuity.
- Target pages: index.html, pricing.html, get-started.html, contact.html, signin.html, features.html
- Key checks:
  - Verify header navigation/branding/CTAs remain reachable and not overlapped or clipped on mobile
  - Retest homepage hero CTAs, pricing entry, and one anchored feature link on mobile
  - Retest pricing billing toggle and at least one feature-category button on mobile for touch usability
  - Retest get-started, sign-in, and contact form completion on mobile, paying attention to field spacing, select usability, and submit controls
  - Check previously flagged small tap targets in nav and inline text links for practical usability problems
- Exit criteria:
  - Critical conversion flows are exercised end-to-end on mobile: home -> pricing, pricing -> get started, and contact form submission
  - At least one concrete mobile usability finding is recorded if issues appear, especially around tap target size
  - No major mobile-only blocker remains untested on the core pages

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

