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

- The hamburger menu button on phones now actually opens a mobile menu on the Pricing, Projects, Wikis, and Templates pages (previously the button was wired up but the menu itself was missing on those pages).
- Tapping any link inside the mobile menu now closes it automatically, so you don't get stuck with the menu covering the page after navigation.
- On the Wikis page footer, the "Knowledge Base" link is now bolded and un-clickable to show "you are already here", instead of looking like a normal link that leads nowhere.
- The hamburger button, footer links, and the close (×) button on pop-up modals are bigger and easier to tap on phones.
- The pricing comparison table no longer makes the page scroll sideways on phones — it now sits inside its own scrollable box so the rest of the page stays put.
- The monthly/yearly toggle on the pricing page wraps onto two lines on very narrow phones instead of overflowing.
- FAQ questions on the pricing page now turn blue and show a clear keyboard focus ring when opened or tabbed to, making it obvious which one you're looking at.
- The mobile menu button now correctly announces "expanded" or "collapsed" to screen readers when you open and close it.

## How to test the changes

1. Open `pricing.html` in a browser, shrink the window to phone width, and tap the hamburger (three-line) button in the top right — a menu with Projects / Wikis / Templates / Pricing / Request a demo / Get Notion free should slide in. Tap any link and the menu should close on its own. Repeat on `projects.html`, `wikis.html`, and `templates-projects.html`.
2. Still on `pricing.html` at phone width, look at the comparison table at the bottom — it should scroll left and right inside its own box without pushing the whole page sideways. The monthly/yearly switch above it should wrap to a second line rather than overflow.
3. On `pricing.html`, click any FAQ question — the question text should turn blue. Tab to one with the keyboard — you should see a visible blue focus outline.
4. Scroll to the footer of `wikis.html`. Under the "Product" column, "Knowledge Base" should appear bolder than the other links and should not respond to clicks (because you're already on that page).
5. On a phone-width viewport, try tapping the × in the corner of any modal that opens — it should feel comfortably large, not pinpoint-sized.
