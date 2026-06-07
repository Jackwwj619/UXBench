# UXAgent Exploration Plan

## Goal

Explore and critique the UX of the Notion marketing site, focusing on the primary landing flow (home + key product pages) and adjacent states, ensuring coverage of all known pages, visible controls, and mobile responsiveness.

## Plan Summary

The run will start with the home page (index.html), validate top navigation and primary CTAs, then explore each product sub-page (Projects, Wikis, Templates, Pricing) to check interactables, headings, and layout warnings. Mobile checks will repeat critical interactions. Phases will cover home, product pages, templates, pricing, and mobile validation.

## Coverage Targets

- pages: `visit all 5 known HTML pages (index, projects, wikis, templates-projects, pricing)`
- features: `exercise at least 80% of visible controls (links, buttons, FAQ toggles) across all pages`
- mobile: `repeat critical interactions (navigation, CTAs) on at least 3 key pages (home, projects, pricing) in mobile viewport`

## Planned Phases

### Home Page Exploration

- Objective: Validate home page navigation, CTAs, and content structure
- Target pages: index.html
- Key checks:
  - Click top navigation links (Projects, Wikis, Templates, Pricing) to ensure they navigate to correct pages
  - Interact with primary CTAs ('Get Notion free', 'Request a demo') to check functionality (even if they are JavaScript links)
  - Verify headings and content sections match prescan summary
  - Check layout warnings for small tap targets on home page interactables
- Exit criteria:
  - All top navigation links tested, primary CTAs interacted with, home page content validated

### Product Sub-Pages (Projects, Wikis)

- Objective: Explore Projects and Wikis pages, validate content and interactables
- Target pages: projects.html, wikis.html
- Key checks:
  - For each page, verify headings and content sections match prescan (e.g., Projects' 'Infinitely configurable...' section, Wikis' 'Find, edit, browse...' section)
  - Interact with top interactables (navigation links, CTAs) on each page
  - Check layout warnings for small tap targets on these pages
  - Validate cross-links (e.g., 'Knowledge Base' on Projects linking to Wikis)
- Exit criteria:
  - Projects and Wikis pages fully explored, interactables tested, content validated

### Templates and Pricing Pages

- Objective: Explore Templates (Projects) and Pricing pages, validate content and interactables
- Target pages: templates-projects.html, pricing.html
- Key checks:
  - For Templates page, verify template categories (Roadmaps, Issue Tracking, etc.) and interactive elements (FAQ buttons, CTAs)
  - For Pricing page, verify plan sections (Free, Plus, Business) and interactive elements (plan buttons, FAQ buttons)
  - Interact with top interactables on each page (navigation, CTAs, FAQ buttons)
  - Check layout warnings for small tap targets on these pages
- Exit criteria:
  - Templates and Pricing pages fully explored, interactables tested, content validated

### Mobile Viewport Validation

- Objective: Repeat critical checks in mobile viewport to validate responsiveness
- Target pages: index.html, projects.html, pricing.html
- Key checks:
  - Switch to mobile viewport and test top navigation (tap targets) for usability
  - Interact with primary CTAs ('Get Notion free', 'Request a demo') in mobile view
  - Verify key content sections (e.g., home page hero, pricing plans) are legible and interactable in mobile
  - Check layout warnings (small tap targets) in mobile view
- Exit criteria:
  - Critical pages tested in mobile view, key interactables validated, responsiveness checked

### Final Coverage and Edge Cases

- Objective: Ensure all pages are visited, all visible controls exercised, and edge cases checked
- Target pages: index.html, projects.html, wikis.html, templates-projects.html, pricing.html
- Key checks:
  - Visit any missed pages (e.g., templates-projects.html if not fully explored)
  - Exercise remaining visible controls (e.g., FAQ buttons, secondary links)
  - Verify console and network errors remain empty across all pages
  - Confirm all layout warnings (small tap targets) are documented
- Exit criteria:
  - All known pages visited, most visible controls exercised, errors checked, warnings documented

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

