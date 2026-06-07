# UXAgent Exploration Plan

## Goal

Autonomously explore and critique the UX of the full Notion marketing clone, validating the primary landing flow, product sub-pages, pricing interactions, and mobile responsiveness.

## Plan Summary

The exploration will start by validating the primary conversion flow on the home page, including CTAs and modals. It will then systematically traverse the product sub-pages (Projects, Wikis) and Templates to verify content rendering and cross-linking. Next, it will deep-dive into the Pricing page's interactive elements like toggles and accordions. Finally, the entire critical flow will be re-evaluated on a mobile viewport to assess layout warnings and tap target usability.

## Coverage Targets

- pages: `visit all 5 known HTML pages`
- features: `exercise all visible modals, pricing toggles, and at least one FAQ accordion per relevant page`
- mobile: `repeat critical checks (Home CTAs, Pricing toggle) on mobile viewport`

## Planned Phases

### Home Page & Primary Flow

- Objective: Validate the main landing page structure, primary conversion CTAs, and modal interactions.
- Target pages: index.html
- Key checks:
  - Verify hero section layout and content visibility.
  - Click 'Request a demo' and validate the resulting dialog/modal content and close behavior.
  - Click 'Get Notion free' and validate the resulting dialog/modal content and close behavior.
  - Scroll through modular product intros and verify section transitions.
- Exit criteria:
  - Both primary CTAs have been clicked and their modals successfully closed.
  - Full page scroll from top to footer completed without layout shifts.

### Product Sub-pages Exploration

- Objective: Navigate through Projects and Wikis pages to validate content rendering, feature sections, and cross-navigation.
- Target pages: projects.html, wikis.html
- Key checks:
  - Navigate to Projects page via top nav and verify feature highlights load correctly.
  - Check cross-linking CTAs on Projects page (e.g., 'Wikis Centralize all your knowledge...').
  - Navigate to Wikis page via top nav and verify knowledge-base examples render.
  - Check cross-linking CTAs on Wikis page (e.g., 'Projects Manage any type of project...').
- Exit criteria:
  - Both Projects and Wikis pages have been visited from the top nav.
  - At least one cross-link CTA on each page has been clicked and verified.

### Templates & Pricing Interactions

- Objective: Deep-dive into interactive elements on the Templates and Pricing pages, specifically toggles and accordions.
- Target pages: templates-projects.html, pricing.html
- Key checks:
  - Navigate to Templates page and click at least two FAQ accordion buttons to verify expand/collapse behavior.
  - Navigate to Pricing page and interact with the 'Toggle yearly pricing' control, verifying that prices update.
  - Click FAQ buttons on Pricing page (e.g., 'How does Notion AI use my data?') to check content expansion.
  - Verify 'Sign up', 'Get started', and 'Contact Sales' buttons presence and click behavior.
- Exit criteria:
  - Pricing toggle has been switched back and forth at least once.
  - At least one FAQ accordion on Templates and one on Pricing have been expanded.
  - CTA buttons on Pricing have been interacted with.

### Mobile Viewport Validation

- Objective: Re-evaluate the critical flows and layout warnings on a mobile viewport to ensure responsive design integrity.
- Target pages: index.html, pricing.html
- Key checks:
  - Switch to mobile viewport and verify Home page hero section stacks correctly.
  - Validate tap target spacing for top navigation links on mobile.
  - Check Pricing page toggle and accordions usability on mobile.
  - Verify modals ('Request a demo') are usable and do not overflow screen boundaries on mobile.
- Exit criteria:
  - Home and Pricing pages viewed on mobile without horizontal overflow.
  - Mobile tap target warnings visually validated for top nav.
  - Modal interactions successfully completed on mobile viewport.

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

