# UXAgent Exploration Plan

## Goal

Validate the UX consistency, navigation flow, and mobile responsiveness of the Notion marketing clone, specifically focusing on the transition between product pillars (Projects, Wikis) and the pricing structure.

## Plan Summary

The exploration will begin by validating the global navigation and primary CTAs on the landing page. It will then traverse the specific product sub-pages (Projects, Wikis, Templates) to ensure content relevance and consistent header/footer behavior. Finally, it will audit the Pricing page for toggle interactions and FAQ accordions, while simultaneously checking for mobile layout regressions given the prescan warnings about small tap targets.

## Coverage Targets

- pages: `100% of known HTML files (index, pricing, projects, wikis, templates-projects)`
- features: `Nav links, Pricing Toggle, FAQ Accordions, Primary CTAs`
- mobile: `Critical path (Home -> Pricing) tested on mobile viewport`

## Planned Phases

### Landing Page & Global Nav Validation

- Objective: Verify the integrity of the home page hero section and the persistence of the global navigation bar.
- Target pages: index.html
- Key checks:
  - Click 'Projects', 'Wikis', 'Templates', and 'Pricing' links to verify correct routing.
  - Inspect the 'Get Notion free' and 'Request a demo' buttons for interaction feedback (hover/active states).
  - Scroll to the bottom to verify footer links match top-level navigation options.
- Exit criteria:
  - All top-level nav links successfully route to their respective HTML files.
  - Hero section CTA is visible and clickable.

### Product Pillar Deep Dive

- Objective: Explore the specific feature pages to validate content hierarchy and internal linking strategies.
- Target pages: projects.html, wikis.html, templates-projects.html
- Key checks:
  - On Projects/Wikis pages, verify that the 'Get Notion free' CTA persists in the hero area.
  - Check for cross-linking: Does the Projects page link to Wikis and vice versa?
  - On Templates page, identify if category filters (e.g., 'Roadmaps', 'Issue Tracking') are interactive or static text.
  - Verify that the 'Back to Home' or Logo click returns to index.html.
- Exit criteria:
  - Visited all three product sub-pages.
  - Confirmed presence of primary CTAs on each sub-page.
  - Validated that internal links do not lead to 404s.

### Pricing Logic & Interactive Elements

- Objective: Test dynamic UI components on the Pricing page, specifically toggles and accordions.
- Target pages: pricing.html
- Key checks:
  - Interact with the 'Monthly / Yearly' toggle to observe price updates in the plan cards.
  - Expand at least two FAQ accordion items (e.g., 'How does Notion AI use my data?') to check for layout shifts.
  - Verify visual distinction between the 'Free', 'Plus', and 'Business' tiers.
- Exit criteria:
  - Pricing toggle successfully updates displayed values.
  - FAQ accordions expand and collapse without breaking layout.

### Mobile Responsiveness & Accessibility Audit

- Objective: Re-visit critical pages on a mobile viewport to address prescan warnings regarding tap targets.
- Target pages: index.html, pricing.html, projects.html
- Key checks:
  - Switch to mobile viewport (approx. 375px width).
  - Attempt to tap nav links; verify if they overlap or are too small (<44px).
  - Check for horizontal scrolling issues on the Pricing table/cards.
  - Verify readability of hero text on smaller screens.
- Exit criteria:
  - No critical layout breakage (overlapping text, unscrollable areas) on mobile.
  - Documented severity of tap-target issues observed in prescan.

## Prescan Summary

### Notion – The AI workspace that works for you

- Page: `index.html`
- Headings: Meet the night shift., Keep work moving 24/7., Automate repetitive work for your team., Ask your on-demand assistants., You assign the tasks. Notion Agent does the work., One search for everything., Perfect notes, every time., Bring all your work together., Simple and powerful., One source of truth for teams and agents.
- Interactables: `5` buttons, `20` links, `5` inputs
- Notable controls:
  - clickable:a:Notion
  - clickable:a:Projects
  - clickable:a:Wikis
  - clickable:a:Templates
  - clickable:a:Pricing
  - clickable:a:Request a demo
  - clickable:a:Get Notion free
  - clickable:a:See pricing plans →

### Notion Pricing – Free, Plus, Business, & Enterprise

- Page: `pricing.html`
- Headings: One tool to run your company., Free, Plus, Business, Enterprise, Plans and features, Questions & answers, Get started with Notion, Request a demo
- Interactables: `12` buttons, `15` links, `5` inputs
- Notable controls:
  - clickable:a:Notion
  - clickable:a:Projects
  - clickable:a:Wikis
  - clickable:a:Templates
  - clickable:a:Pricing
  - clickable:a:Request a demo
  - clickable:a:Get Notion free
  - clickable:div:Toggle yearly pricing

### Notion Projects – Manage projects from beginning to end

- Page: `projects.html`
- Headings: Manage projects from beginning to end, Infinitely configurable, so you can work the way you want, Capture every detail in a database, View projects as a timeline for a bird's eye view, Visualize progress with charts, Choose the exact info you want to track, Automate your team workflows, Filter and sort info to see what you need, Capture requests with forms, Control who can see and edit
- Interactables: `5` buttons, `14` links, `5` inputs
- Notable controls:
  - clickable:a:Notion
  - clickable:a:Projects
  - clickable:a:Wikis
  - clickable:a:Templates
  - clickable:a:Pricing
  - clickable:a:Request a demo
  - clickable:a:Get Notion free
  - clickable:a:Wikis Centralize all your knowledge in Notion instead of a clunky, disorganized workspace.

### Notion Templates for Project Management

- Page: `templates-projects.html`
- Headings: Project Management templates for every team, Roadmaps & Calendars, Issue Tracking, Planning & Goals, Ticketing, FAQs, Get started with Notion, Request a demo
- Interactables: `10` buttons, `14` links, `5` inputs
- Notable controls:
  - clickable:a:Notion
  - clickable:a:Projects
  - clickable:a:Wikis
  - clickable:a:Templates
  - clickable:a:Pricing
  - clickable:a:Request a demo
  - clickable:a:Get Notion free
  - clickable:button:Is Notion good for project management?

### Notion Wikis – The wiki that redefines 'wiki'

- Page: `wikis.html`
- Headings: The wiki that redefines 'wiki'., Find, edit, browse. We craft an experience you'll love., Every team's files, at a glance, Search that actually works, Beautiful out of the box, Drag and drop organization, Link to other pages easily, Waste less time answering questions & updating docs., Synced Blocks — Keep content updated, automatically., Verification
- Interactables: `5` buttons, `14` links, `5` inputs
- Notable controls:
  - clickable:a:Notion
  - clickable:a:Projects
  - clickable:a:Wikis
  - clickable:a:Templates
  - clickable:a:Pricing
  - clickable:a:Request a demo
  - clickable:a:Get Notion free
  - clickable:a:Projects Manage any type of project, no matter the team or size.

