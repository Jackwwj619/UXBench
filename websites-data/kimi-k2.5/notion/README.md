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

- The hamburger menu (☰) on small screens now actually works on every sub-page — Projects, Wikis, Templates, and Pricing. Previously it only worked on the home page.
- Buttons, links in the footer, and the close (×) button in dialog pop-ups are now larger and easier to tap on phones — at least 44 pixels tall.
- The close (×) button on dialog pop-ups is now clearly visible (darker color, larger), gets a subtle hover background, and shows a clear focus outline when reached by keyboard.
- The hamburger menu button now tells assistive technologies whether the menu is open or closed (handy for screen-reader users).
- People who have asked their device to reduce motion (for example because smooth scrolling makes them dizzy) now get instant jumps instead of animated scrolling.

## How to test the changes

1. Open `projects.html`, `wikis.html`, `templates-projects.html`, or `pricing.html` and shrink the browser to phone width. Click the ☰ button at the top-right — the mobile menu should slide open with links to all the main pages. Previously these sub-pages just did nothing when ☰ was tapped.
2. On the pricing page, click any FAQ question — when the modal/info dialog appears, the × in the top-right should be large, clearly visible, and easy to tap. Use Tab to focus it and confirm a focus ring appears.
3. With the browser at phone width, footer links and the hamburger button should all feel large enough to tap comfortably (no missed taps).
4. Turn on "reduce motion" in your operating-system accessibility settings, then click an anchor link in the page — the page should jump immediately instead of smooth-scrolling.
5. Use a screen reader on any page and focus the ☰ button — it should announce "expanded" or "collapsed" depending on whether the menu is open.
