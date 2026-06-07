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

- **The mobile menu now has a close (×) button** in the top corner, so you don't have to tap the small hamburger again to dismiss it.
- **Tapping a link in the mobile menu closes the menu** before navigating, which feels smoother than leaving it hanging open.
- **Press Escape to close the mobile menu** from a keyboard or external keyboard on a tablet.
- **The page behind the open menu no longer scrolls** while the menu is up — it stays put so you don't lose your place.
- **Bigger tap targets across the site on phones.** The hamburger button, mobile menu links, modal close (×), footer links, and footer social icons are all sized so they're easy to hit with a thumb.
- **Better screen-reader behaviour.** The hamburger button now announces whether the menu is open or closed.

## How to test the changes

1. Open `index.html` and shrink the browser to phone width (or open it on a phone). Tap the hamburger icon in the top right — the menu should slide in with a × button at the top.
2. Tap the × — the menu should close. Open it again and try the Escape key — it should also close.
3. With the menu open, try to scroll the page in the background — it should stay still until you close the menu.
4. Open the menu again and tap any of the links — the menu should close, then navigate.
5. Scroll to the footer on a phone-width window and try tapping a footer link or social icon — each should be comfortably tap-sized.
