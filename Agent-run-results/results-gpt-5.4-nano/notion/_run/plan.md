# UXAgent Exploration Plan

## Goal

Autonomously explore and critique the UX of the Notion marketing funnel across its primary landing flow and adjacent product pages, emphasizing interactive controls, conversions (free/demo), and mobile usability.

## Plan Summary

Start on index.html and validate the global navigation and primary conversion actions (Get Notion free, Request a demo) plus in-page CTAs (e.g., See pricing plans). Then traverse each adjacent top-nav page (Projects, Wikis, Templates, Pricing) and exercise their key interactive elements (view switches, FAQ toggles, buttons/links). Finish by repeating the critical flows on mobile viewport and sanity-checking any modal/dialog behavior from demo/signup CTAs.

## Coverage Targets

- pages: `visit all known HTML pages (index.html, projects.html, wikis.html, templates-projects.html, pricing.html)`
- features: `exercise most visible controls per key page: index CTAs (Request a demo, Get Notion free, See pricing plans), Projects view switching (Board/Timeline/Calendar), Wikis interactive feature demos (search/drag/drop/blocks/verification as available), Templates FAQ buttons, Pricing billing toggle + FAQ accordions + plan CTAs`
- mobile: `repeat critical checks (navigation, demo/free, pricing toggle, at least one FAQ and one plan CTA) on mobile viewport`

## Planned Phases

### Index landing: navigation + primary conversion paths

- Objective: Validate the core landing-page UX: top navigation routing, primary CTAs, and key in-page links to adjacent product pages and pricing.
- Target pages: index.html
- Key checks:
  - Click top-nav items: Projects, Wikis, Templates, Pricing; confirm correct page loads and active state/scroll position.
  - Trigger 'Request a demo' (href javascript:void(0)); verify a dialog/form appears (or clear feedback if not available) and can be dismissed/closed.
  - Trigger 'Get Notion free' (href javascript:void(0)); verify dialog/form or navigation response; confirm any entered/returned state is consistent.
  - Use in-page CTA 'See pricing plans →' to navigate to pricing.html and confirm scroll/anchor behavior.
  - Click 'Knowledge Base' in the lower page section to verify routing to wikis.html.
- Exit criteria:
  - All five top-nav routes successfully load their target pages without errors.
  - At least one 'Request a demo' interaction and one 'Get Notion free' interaction are validated end-to-end (dialog appears, is dismissible, no broken state).
  - In-page CTAs/links correctly navigate to their intended adjacent pages (pricing and wikis).

### Product subpages: Projects + Wikis feature comprehension and CTAs

- Objective: Exercise the primary content sections and interactive elements on each subpage, focusing on conversion CTAs and any feature toggles/search/permissions UI mentioned in headings.
- Target pages: projects.html, wikis.html
- Key checks:
  - Projects page: locate and interact with the view-switching controls for project views (Board / Timeline / Calendar) if present; confirm screenshot/content swaps.
  - Projects page: find 'Get Notion free' or other CTA links/buttons on the page and validate their behavior (dialog/form or routing consistent with index).
  - Wikis page: scan for any interactive elements tied to 'Search that actually works', 'Drag and drop organization', 'Synced Blocks' and 'Verification'—attempt the most obvious UI controls and confirm they respond.
  - Wikis page: click Knowledge Base/Projects CTAs in-page (e.g., links leading to other sections) and ensure routing works.
- Exit criteria:
  - Projects page view-switching (Board/Timeline/Calendar) is confirmed working or clearly absent (no dead controls).
  - Both Projects and Wikis pages have at least one CTA/button tested for functional response.
  - Any visible interactive feature demos on Projects/Wikis respond with correct UI state changes (no stuck overlays).

### Templates + Pricing: FAQ/toggles and conversion clarity

- Objective: Validate the heaviest interaction areas: pricing billing toggle, FAQ accordions, and templates-page FAQ buttons; confirm CTAs align with selected plan context.
- Target pages: templates-projects.html, pricing.html
- Key checks:
  - Templates page: click each visible FAQ/button (e.g., 'Is Notion good for project management?', 'Can I manage Agile projects in Notion?', etc.); verify the corresponding answer panel/section expands and collapses correctly.
  - Templates page: click 'Request a demo' and 'Get Notion free' CTAs on-page; ensure behavior matches index (dialog/form lifecycle).
  - Pricing page: toggle yearly/monthly pricing ('Toggle yearly pricing') and verify plan card prices update correctly and persist when scrolling.
  - Pricing page: click each FAQ accordion button ('How does Notion AI use my data?', 'What are your accepted payment methods?', 'What is a block?', 'How is pricing calculated...'); verify accordion state updates and no multiple sections conflict unexpectedly.
  - Pricing page: click 'Sign up' and 'Get started' for at least two plan tiers; verify correct CTA response (including whether a plan-specific context is passed to the signup/demo flow).
  - Pricing page: test 'Contact Sales' path to confirm form/dialog appears and can be dismissed.
- Exit criteria:
  - All visible FAQ buttons on templates-projects.html show correct expanded/collapsed content associations.
  - Pricing yearly/monthly toggle updates pricing UI reliably without stale values.
  - At least two plan CTAs and Contact Sales are validated as functional with appropriate dialog/page response.

### Mobile regression: hit-targets + critical flow re-check

- Objective: Repeat the most important actions on mobile viewport to catch tap-target and responsive layout issues flagged by prescan (many controls below 44px).
- Target pages: index.html, pricing.html, projects.html
- Key checks:
  - On mobile viewport, tap the top-nav items (Projects/Wikis/Templates/Pricing) and confirm the tap targets register and navigation works.
  - On mobile, tap 'Request a demo' and 'Get Notion free' on index; verify dialogs/forms open, remain usable, and close reliably.
  - On mobile, toggle yearly pricing and open at least one pricing FAQ accordion; confirm accordion and toggle remain usable and readable.
  - On mobile, test at least one plan CTA ('Sign up' or 'Get started') to ensure it’s reachable and functional.
- Exit criteria:
  - No critical CTA (demo/free/signup) fails on mobile; dialogs are operable and dismissible.
  - Key toggles (pricing billing + FAQ) work reliably on mobile.
  - Tap targets are confirmed workable for navigation and CTAs despite 'small_tap_target' warnings.

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

