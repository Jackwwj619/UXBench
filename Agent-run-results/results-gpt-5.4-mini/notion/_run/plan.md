# UXAgent Exploration Plan

## Goal

Exhaustively explore the Notion marketing funnel: validate the landing page hero and navigation, then cover the adjacent product pages (Projects, Wikis, Templates, Pricing) including key CTA, accordion, and tab-like interactions, with desktop and mobile checks for responsiveness and tap-target issues.

## Plan Summary

Start on the landing page and verify the primary conversion paths from the hero and top navigation into Pricing, Projects, Wikis, Templates, and the CTA buttons. Then inspect each adjacent page for its core content patterns and visible controls, especially any accordions, yearly/monthly pricing toggles, and template/category browsing states. Finish by repeating the most important navigation and CTA checks in a mobile viewport, with attention to the small tap targets already flagged in the prescan.

## Coverage Targets

- pages: `Visit all known HTML pages: index.html, pricing.html, projects.html, templates-projects.html, and wikis.html.`
- features: `Exercise the primary nav links, hero CTAs, pricing toggle, FAQ accordions, and any visible cross-links or template/category controls on each content page.`
- mobile: `Repeat the landing-page conversion path and one key interactive control per page in a mobile viewport, with explicit attention to small tap targets and spacing.`

## Planned Phases

### Landing page and nav validation

- Objective: Validate the primary marketing entry point, top navigation, and hero conversion actions from the homepage.
- Target pages: index.html
- Key checks:
  - Open the home page and verify the hero message, primary CTA pair, and top nav destinations.
  - Click Projects, Wikis, Templates, and Pricing from the header to confirm routing to the correct pages.
  - Test the visible hero CTAs ('Get Notion free' and 'Request a demo') and note whether they navigate, open dialogs, or do nothing.
  - Scroll to the lower landing sections and confirm the 'See pricing plans' and 'Knowledge Base' links are reachable and accurate.
- Exit criteria:
  - All header links have been exercised at least once.
  - Both hero CTAs and at least one lower-page CTA have been tested.
  - No unexpected navigation failures or broken states remain on the landing page.

### Pricing flow and FAQs

- Objective: Deeply validate the pricing page as the main decision/CTA page, including pricing mode toggle and FAQ interaction.
- Target pages: pricing.html
- Key checks:
  - Verify the monthly/yearly pricing toggle changes displayed pricing and savings copy.
  - Open the visible FAQ buttons and confirm each expands/collapses correctly without layout breakage.
  - Test the plan CTAs ('Sign up', 'Get started', 'Contact Sales') and the top-level 'Request a demo' / 'Get Notion free' actions.
  - Inspect whether plan cards and comparison content remain readable and aligned at different scroll positions.
- Exit criteria:
  - Toggle behavior has been confirmed in at least both states.
  - At least two FAQ items have been expanded and collapsed.
  - Each visible plan CTA has been activated or explicitly checked for behavior.

### Projects product page review

- Objective: Validate the Projects product narrative and any interactive feature presentation on the projects page.
- Target pages: projects.html
- Key checks:
  - Confirm the page structure from hero through feature sections and CTA placement.
  - Look for any view-switching, carousel, or screenshot-state interactions implied by the prescan and exercise visible controls if present.
  - Follow the adjacent links near the bottom, especially the Knowledge Base cross-link, to confirm product cross-navigation.
  - Check that project-management feature claims remain legible and that no content overlaps or truncates at common scroll positions.
- Exit criteria:
  - The main Projects story and CTA flow have been read end-to-end.
  - Any visible interactive showcase controls have been tested at least once.
  - Cross-page links from Projects have been verified.

### Wikis product page and knowledge features

- Objective: Validate the Wikis page as the knowledge-base counterpart, including search/organization/permissions messaging and related navigation.
- Target pages: wikis.html
- Key checks:
  - Review the main wiki use cases and verify the page conveys the knowledge-management workflow clearly.
  - Test any visible knowledge-base or related cross-link destinations, especially links back to Projects or Knowledge Base sections.
  - Confirm that feature blocks for search, organization, and page linking remain stable while scrolling.
  - Note whether the page includes any obvious controls for page browsing or editable/demo-like behaviors.
- Exit criteria:
  - All key wiki feature blocks have been scanned for layout or copy issues.
  - At least one cross-link has been activated and verified.
  - No unexpected interaction failures on the page’s visible links.

### Templates browsing and FAQ validation

- Objective: Exercise the templates page as a content-heavy adjacent flow, with emphasis on category sections, sample templates, and FAQ interactions.
- Target pages: templates-projects.html
- Key checks:
  - Verify the main template categories and sample project-management templates render properly.
  - Open the visible FAQ buttons and confirm they expand/collapse without shifting the template gallery unexpectedly.
  - Check that any template tiles or sections are readable and that categories like Roadmaps, Issue Tracking, Planning & Goals, and Ticketing are distinct.
  - Validate the page’s cross-links back to the rest of the site, especially Knowledge Base if present.
- Exit criteria:
  - The visible template categories and examples have been covered.
  - Multiple FAQs have been toggled successfully.
  - No major readability or scroll issues in the template gallery sections.

### Mobile regression on critical paths

- Objective: Repeat the highest-value conversion and navigation checks in a mobile viewport to surface tap-target and spacing problems.
- Target pages: index.html, pricing.html, projects.html, wikis.html, templates-projects.html
- Key checks:
  - Re-run the header navigation and hero CTA checks on the landing page in mobile viewport.
  - Check the pricing toggle, at least one FAQ, and one plan CTA on mobile for touch usability.
  - Verify the most important cross-links on Projects/Wikis/Templates remain tappable and not cramped.
  - Inspect whether the small tap targets flagged in the prescan are problematic in the mobile layout.
- Exit criteria:
  - Critical nav and CTA flows have been checked on mobile.
  - At least one interactive control per key page has been tested on mobile.
  - Observed tap-target issues have been recorded with concrete evidence.

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

