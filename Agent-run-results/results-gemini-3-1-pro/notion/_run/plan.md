# UXAgent Exploration Plan

## Goal

Autonomously explore and critique the UX of the Notion clone, validating the marketing funnel from landing to product sub-pages, templates, and pricing.

## Plan Summary

The exploration will start on the homepage to assess the core value proposition and navigation. It will then traverse the product sub-pages (Projects, Wikis) and the Templates directory, ensuring interactive elements like category filters or accordions work. Finally, it will rigorously test the Pricing page's interactive toggles and FAQs, followed by a dedicated mobile pass to verify layout and the flagged small tap targets.

## Coverage Targets

- pages: `Visit all 5 HTML files (index, projects, wikis, templates-projects, pricing)`
- features: `Exercise Pricing toggle, Templates FAQs, and Pricing FAQs`
- mobile: `Test global nav, pricing tiers, and FAQ accordions on mobile viewport`

## Planned Phases

### Homepage & Global Navigation

- Objective: Validate the primary landing page messaging, CTAs, and verify global navigation connectivity.
- Target pages: index.html
- Key checks:
  - Check hero section CTAs ('Request a demo', 'Get Notion free')
  - Scroll through feature highlights and customer stories
  - Click top navigation links to verify routing to sub-pages
- Exit criteria:
  - All main navigation links successfully route to their respective pages
  - Homepage scrolled and major sections observed

### Product Discovery (Projects & Wikis)

- Objective: Explore the specific marketing copy and layout for the core product offerings.
- Target pages: projects.html, wikis.html
- Key checks:
  - Observe feature grids and descriptive blocks
  - Verify internal cross-linking (e.g., links from Projects to Wikis)
  - Check CTAs on sub-pages
- Exit criteria:
  - Both projects.html and wikis.html have been visited and scrolled completely

### Templates & FAQs

- Objective: Verify the templates layout and interact with the FAQ section.
- Target pages: templates-projects.html
- Key checks:
  - Observe the categorization of templates (Roadmaps, Issue Tracking, etc.)
  - Click on FAQ buttons (e.g., 'Is Notion good for project management?') to verify accordion expansion
- Exit criteria:
  - Templates page visited, and at least two FAQ accordions have been toggled

### Pricing & Conversion

- Objective: Thoroughly test the pricing page interactive elements and plan descriptions.
- Target pages: pricing.html
- Key checks:
  - Toggle the Monthly/Yearly pricing switch and observe if prices change
  - Review the plan tiers (Free, Plus, Business, Enterprise)
  - Click on Pricing FAQ buttons (e.g., 'What is a block?')
- Exit criteria:
  - Pricing toggle interacted with and state change verified
  - Pricing FAQs expanded

### Mobile Responsiveness & Tap Targets

- Objective: Switch to mobile viewport to check layout degradation and flagged tap targets.
- Target pages: index.html, pricing.html
- Key checks:
  - Check global navigation accessibility on mobile (hamburger menu presence/function)
  - Verify pricing table readability on narrow screens
  - Assess ease of clicking previously flagged small tap targets (e.g., top nav links)
- Exit criteria:
  - Mobile view navigated successfully and UI stacking observed on key pages

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

