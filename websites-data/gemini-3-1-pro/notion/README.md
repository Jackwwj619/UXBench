# Notion Clone

A practice clone of Notion's marketing funnel — home, product sub-pages, templates, and pricing. It's what you'd see before signing up: how Notion pitches docs, wikis, projects, and AI, plus its pricing tiers.

> Front-end demo only — none of the CTAs lead to a real account.

## What you can do

- **Read the pitch.** The home page has the top nav (Product / Download / Solutions / Resources / Pricing / Request demo / Log in / Get Notion free), a hero with the product positioning and main screenshot, and modular intros to Docs, Wikis, Projects, and AI. Below: a customer logo wall, customer stories, and a multi-column footer.
- **Dig into projects and wikis.** Sub-pages walk through how project management views look (Board / Timeline / Calendar with view-switching screenshots), and how wiki-style knowledge bases work, with permissions, search, templates, and case studies.
- **Browse templates.** A template gallery for projects with category sidebar and a card grid showing cover, author, and install count for each template.
- **Compare pricing.** Four columns — Free / Plus / Business / Enterprise — with a monthly/yearly toggle, an AI add-on, a feature comparison table, and an FAQ.

## How to use it

Open `index.html` in any modern browser. Click any of the product entries in the top nav to visit a sub-page, or jump straight to `templates-projects.html` or `pricing.html`. Use the monthly/yearly toggle on the pricing page to see how the numbers change.

## What was changed in this version

- The pricing page's Monthly / Yearly toggle is now reachable by keyboard — Tab to it and press Enter or Space to flip between monthly and yearly, with the prices updating to match.
- The pricing toggle now also initializes its labels and switch state on page load, so the "Monthly" pill is properly highlighted even before you click anything.
- The mobile hamburger menu on `pricing.html` now actually opens a real menu panel with links to Projects, Wikis, Templates, Pricing, Request a demo, and Get Notion free. Before, the button was on the page but didn't have a menu to open.
- Tapping a link in the mobile menu now auto-closes the menu instead of leaving it covering the page.
- The hamburger button now reports its open/closed state to screen readers (`aria-expanded`) and has a comfortable 44px tap area.
- The scroll-in fade animation now gracefully falls back to "just show the content" if the browser doesn't support IntersectionObserver, and it respects the OS "reduce motion" setting so animations don't run for people who turn them off.
- Card titles in the home-page Docs / Wikis / Projects / AI modules now use the dark text color explicitly, so they stay readable instead of inheriting a too-light gray from elsewhere on the page.
- Nav links, footer links, social icons, and the modal close button all have proper 44px touch targets on phones.

## How to test the changes

1. Open `pricing.html`. Click the Monthly / Yearly toggle — it slides and the prices change. Then Tab to it from the keyboard and press Enter or Space — it flips again.
2. Shrink the browser to phone width on `pricing.html` and tap the hamburger menu button — a panel slides down with Projects, Wikis, Templates, Pricing, Request a demo, and Get Notion free. Tap any link and the menu closes itself.
3. Open `index.html` on a phone width, tap the hamburger, then tap a link — the menu also closes (this already worked, but the button now also announces "expanded" to screen readers).
4. Scroll down the home page — the section headings and card titles for Docs / Wikis / Projects / AI are clearly dark and readable.
5. Turn on "Reduce motion" in your OS accessibility settings and reload `index.html` — fade-in animations are replaced with the content simply appearing.
6. Shrink the browser to phone width on any page — footer links, top nav, and social icons are at least 44px tall so they're comfortable to tap.
