# UXAgent Exploration Plan

## Goal

Exhaustively explore the Notion marketing funnel clone by validating the home-page conversion path, top-nav product sub-pages, pricing interactions, template/wiki/project cross-links, and key CTA/recovery behaviors on desktop and mobile.

## Plan Summary

Start on the home page and treat it as the primary funnel: confirm that the hero, repeated CTAs, and cross-links into product areas and pricing are coherent and usable. Then branch into adjacent product pages (Projects, Wikis, Templates) to verify page-specific content, internal recommendation links, and return paths through the shared navigation. Reserve deeper validation for Pricing because it contains the richest interaction set in prescan, including a yearly billing toggle and FAQ accordions; finish by repeating the most critical navigation and CTA checks on mobile where multiple tap-target warnings were already detected.

## Coverage Targets

- pages: `Visit all 5 known HTML pages, with full-page scroll coverage on each and deeper interaction coverage on index.html and pricing.html.`
- features: `Exercise the shared top navigation everywhere; test both primary CTAs where visible; use at least one cross-link on each adjacent product page; validate pricing toggle and multiple FAQ accordions; test any page-specific switching control if visibly present.`
- mobile: `Repeat critical checks on mobile for index.html, pricing.html, and at least one adjacent product page, focusing on nav access, CTA usability, tap-target risk, and interactive controls.`

## Planned Phases

### Map the home-page funnel

- Objective: Validate the primary landing experience, message hierarchy, major CTAs, and outbound paths from the home page.
- Target pages: index.html
- Key checks:
  - Confirm shared top nav destinations from home: Projects, Wikis, Templates, Pricing, and logo back-to-home behavior.
  - Test hero CTAs 'Get Notion free' and 'Request a demo' to determine whether they navigate, open dialogs, or do nothing.
  - Scroll the full page to inspect section sequencing from hero through product intros, customer proof, pricing teaser, and footer.
  - Use visible cross-links such as 'See pricing plans →' and 'Knowledge Base' to confirm downstream navigation works.
  - Check whether repeated CTA labels behave consistently wherever they reappear on the page.
  - If any dialog/form appears from CTA use, validate open, close, and recoverability without assuming successful submission.
- Exit criteria:
  - All major home navigation targets have been followed at least once or confirmed reachable.
  - Behavior of both primary CTAs is documented.
  - Full-page scroll confirms presence and usability of key sections and footer navigation.

### Explore adjacent product pages

- Objective: Validate the three adjacent product/content pages for clarity, internal linking, and consistency with the home-page promise.
- Target pages: projects.html, wikis.html, templates-projects.html
- Key checks:
  - Open each page from the shared nav rather than direct URL first to verify nav consistency.
  - On projects.html, inspect feature sections and test any visible control related to view switching, especially Board/Timeline/Calendar if present.
  - On wikis.html, verify the page-specific content flow around organization, search, drag-and-drop, linking, and knowledge-base positioning.
  - On templates-projects.html, inspect category blocks (Roadmaps & Calendars, Issue Tracking, Planning & Goals, Ticketing) and confirm prominent CTA behavior.
  - Use visible recommendation links such as 'Knowledge Base' or product promo links to confirm cross-navigation between adjacent product areas.
  - Check that top nav persists and highlights orientation reasonably when moving across these pages.
- Exit criteria:
  - Each adjacent page has been loaded and scrolled enough to verify its major sections and CTA block.
  - At least one internal cross-link between adjacent product areas has been exercised where visible.
  - Any page-specific interactive control encountered has been tested for basic state change.

### Deep validation of pricing interactions

- Objective: Exercise the highest-risk interaction page by verifying pricing state changes, plan CTAs, FAQ behavior, and lower-funnel pathways.
- Target pages: pricing.html
- Key checks:
  - Toggle Monthly/Yearly pricing and verify visible price changes and labeling consistency across all plan cards.
  - Inspect all four plan tiers (Free, Plus, Business, Enterprise) for clear differentiation and CTA availability.
  - Test representative plan CTAs such as 'Sign up', 'Get started', and 'Contact Sales' to see whether they navigate, open dialogs, or remain inert.
  - Expand multiple FAQ items including 'How does Notion AI use my data?', 'What are your accepted payment methods?', 'What is a block?', and 'How is pricing calculated for the paid plans?'
  - Check whether FAQ accordions can both open and close cleanly and whether content remains readable without overlap.
  - Validate bottom-of-page CTA sections ('Get started with Notion', 'Request a demo') for consistency with header CTA behavior.
- Exit criteria:
  - Yearly billing toggle behavior is confirmed with before/after evidence.
  - At least one CTA per pricing outcome type has been exercised.
  - Several FAQ items have been expanded/collapsed successfully or failures have been documented.

### Recovery paths and shared-component consistency

- Objective: Verify that users can recover orientation and continue browsing after branching into deeper pages or non-navigating CTAs.
- Target pages: index.html, projects.html, wikis.html, templates-projects.html, pricing.html
- Key checks:
  - Use the Notion logo/home link from at least one non-home page to confirm reliable return to index.html.
  - Compare shared header CTA behavior across at least two pages to detect inconsistencies.
  - Check whether footer or lower-page links duplicate top-nav destinations and whether duplicates behave consistently.
  - If CTA clicks do not navigate, confirm the user can continue browsing without dead ends or trapped states.
  - Document any broken expectation where a label suggests navigation but only changes local state, or vice versa.
- Exit criteria:
  - A clear return-to-home recovery path has been validated.
  - Shared header behavior has been compared across multiple pages.
  - Any dead-end or inconsistent CTA pattern has been captured.

### Mobile-focused critical path check

- Objective: Repeat the most important funnel and navigation checks on mobile, with special attention to tap-target size and responsive usability.
- Target pages: index.html, pricing.html, projects.html
- Key checks:
  - Open the site in mobile viewport and verify the top navigation remains accessible and usable.
  - Re-test the home hero CTAs and at least one downstream link from the home page on mobile.
  - Check whether the small tap targets flagged in prescan make nav items, CTA links, or recommendation links hard to tap.
  - On pricing.html mobile, re-test the yearly pricing toggle and one FAQ accordion for layout or clipping issues.
  - On one adjacent page such as projects.html, verify that page sections, images/cards, and shared CTAs stack/read correctly.
- Exit criteria:
  - Critical home-to-pricing/product navigation has been repeated on mobile.
  - At least one concrete mobile tap-target or responsive layout finding is confirmed or ruled out.
  - One high-risk interactive control on mobile has been exercised successfully or documented as problematic.

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

