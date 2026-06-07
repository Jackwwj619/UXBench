# UXAgent Exploration Plan

## Goal

Explore and critique the Shopify marketing-to-trial-to-admin funnel end to end, with primary focus on the free-trial onboarding flow and secondary coverage of pricing, resources, help, login, and sales-contact paths across desktop and mobile.

## Plan Summary

Begin on the marketing homepage and validate the main conversion entry points, especially the hero email/signup CTA and repeated trial calls to action. Then drive deeply through the multi-step free-trial form, including forward progress, skip behavior, and completion to the "Your store is ready!" state. After the core funnel, cover adjacent decision-support and recovery paths on pricing, help, resources, admin login, and sales pages, and finish by repeating the highest-value journey plus navigation/tap-target checks on mobile.

## Coverage Targets

- pages: `Visit all 8 known HTML pages, with deepest interaction on free-trial-form.html, pricing.html, admin.html, help-trial.html, and sales.html.`
- features: `Exercise the main visible controls on each key page: homepage/email CTA and FAQs, onboarding progression and Skip all, pricing monthly/yearly toggle and plan CTAs, help anchors/search, login fields/social buttons, and sales form fields/selects/submit.`
- mobile: `Repeat the critical funnel on mobile for index.html -> free-trial-form.html first step, plus pricing toggle/CTA and a quick nav/footer tap-target audit on pages already flagged with small targets.`

## Planned Phases

### Homepage conversion entry and content discovery

- Objective: Validate the main marketing landing page as a starting point into the trial funnel and inspect the most visible conversion/support interactions.
- Target pages: index.html, free-trial.html
- Key checks:
  - Use the hero email input and Start free trial submit button to see whether submission routes into onboarding and whether blank vs populated input changes behavior
  - Compare the top-nav Start free trial link with the hero CTA destination and consistency
  - Open at least the visible FAQ accordion items on the homepage and confirm expand/collapse usability
  - Check whether footer support links route correctly to help-trial.html and free-trial.html
  - Note whether free-trial.html is materially distinct from index.html or effectively duplicate content
- Exit criteria:
  - Primary homepage CTA path into free-trial-form.html is confirmed via at least one working entry point
  - At least two FAQ items are expanded and observed
  - Duplicate-or-distinct relationship between index.html and free-trial.html is established

### Deep free-trial onboarding walkthrough

- Objective: Exercise the core onboarding funnel thoroughly, covering guided setup, skip behavior, validation, and completion.
- Target pages: free-trial-form.html
- Key checks:
  - Progress through the 'What are you planning to sell?' step and observe selection requirements before Next
  - Advance through 'Where would you like to sell?' and 'Where is your business located?' states, confirming transitions and back/continuation behavior if available
  - Use 'Skip all' to test the alternate fast-path and verify where it rejoins the flow
  - At the 'Create your Shopify account' step, test empty submission, partially completed submission, and a valid completion path if possible
  - Confirm the final 'Your store is ready!' state appears and document any success CTA or destination offered afterward
- Exit criteria:
  - Both a normal progression path and Skip-all path have been attempted or their availability limits clearly established
  - At least one validation behavior is observed on account creation or earlier required steps
  - The final success state is reached or a blocker is documented with specific failing step/control

### Decision support and enterprise branching

- Objective: Validate plan comparison and the branch from self-serve pricing into enterprise sales contact.
- Target pages: pricing.html, sales.html
- Key checks:
  - Toggle Pay monthly vs Pay yearly and verify displayed pricing changes for Basic/Grow/Advanced plans
  - Inspect plan card CTAs, especially Start free trial for self-serve plans and Contact sales for Plus
  - Open at least one pricing FAQ item and compare messaging against homepage trial/pricing claims
  - Follow the Contact sales path into sales.html and complete the form with the available text/select fields
  - Test sales form required-field behavior, select menus, and success acknowledgement state
- Exit criteria:
  - Pricing toggle behavior is confirmed as functional or nonfunctional
  - Enterprise branch to sales.html is exercised
  - Sales form is submitted successfully or validation failure points are captured

### Help, resources, and recovery journeys

- Objective: Assess whether support and educational pages help users recover from uncertainty and re-enter the trial funnel.
- Target pages: help-trial.html, resources.html
- Key checks:
  - On help-trial.html, use the on-page table-of-contents links to jump among sections and confirm anchors work
  - Try the help search input to determine whether it accepts interaction and whether results/navigation occur
  - Follow the 'sign up for a free trial' help link back into the onboarding path
  - On resources.html, inspect key resource cards, especially Shopify Help Center, and confirm whether they navigate internally or externally within the local clone
  - Use the resources page trial CTA and compare its destination/behavior with homepage and pricing CTAs
- Exit criteria:
  - At least one support-driven re-entry into the free-trial funnel is confirmed
  - Help page anchor navigation is verified
  - Resources page CTA behavior is compared with other trial entry points

### Admin login and mobile critical-path verification

- Objective: Probe the login experience and repeat the most important funnel checks under mobile constraints.
- Target pages: admin.html, index.html, free-trial-form.html, pricing.html
- Key checks:
  - On admin.html, test blank and populated login attempts using store URL, email, and password fields
  - Inspect 'Forgot password?' and the Apple/Google/Facebook buttons for visible affordance and behavior
  - Repeat on mobile: top-nav access, homepage hero CTA, and at least the first onboarding step on free-trial-form.html
  - Repeat on mobile: pricing toggle and one plan CTA
  - Pay special attention to previously flagged small tap targets in nav/footer and any overlap, clipping, or hard-to-tap controls
- Exit criteria:
  - Admin login form behavior is characterized, including whether any success/error state appears
  - Critical trial entry and first onboarding interaction are completed on mobile
  - At least one concrete mobile tap-target or layout issue is confirmed or ruled out on the key pages

## Prescan Summary

### Shopify – Start Your Business

- Page: `index.html`
- Headings: Your business starts
with Shopify, Create a stunning store in seconds, Your plan can pay for itself, Level up with our AI assistant, Getting stuff done? Done., No risk, all rewards. Try Shopify for £1/month., Questions?
- Interactables: `7` buttons, `34` links, `2` inputs
- Notable controls:
  - clickable:a:Shopify
  - clickable:a:Solutions
  - clickable:a:Pricing
  - clickable:a:Resources
  - clickable:a:Log in
  - clickable:a:Start free trial
  - typeable:input:Enter your email address
  - clickable:button:Start free trial

### Log in – Shopify

- Page: `admin.html`
- Headings: Log in to Shopify, Login successful
- Interactables: `4` buttons, `4` links, `3` inputs
- Notable controls:
  - clickable:a:Shopify
  - typeable:input:your-store
  - typeable:input:you@example.com
  - typeable:input:Enter your password
  - clickable:button:Log in
  - clickable:a:Forgot password?
  - clickable:button:Apple
  - clickable:button:Google

### Start Your Free Trial – Shopify

- Page: `free-trial-form.html`
- Headings: What are you planning to sell?, Where would you like to sell?, Where is your business located?, Create your Shopify account, Your store is ready!
- Interactables: `4` buttons, `3` links, `3` inputs
- Notable controls:
  - clickable:a:Shopify
  - clickable:button:Next

### Start Your Free Trial – Shopify

- Page: `free-trial.html`
- Headings: Your business starts
with Shopify, Create a stunning store in seconds, Your plan can pay for itself, Level up with our AI assistant, Getting stuff done? Done., No risk, all rewards. Try Shopify for £1/month., Questions?
- Interactables: `7` buttons, `34` links, `2` inputs
- Notable controls:
  - clickable:a:Shopify
  - clickable:a:Solutions
  - clickable:a:Pricing
  - clickable:a:Resources
  - clickable:a:Log in
  - clickable:a:Start free trial
  - typeable:input:Enter your email address
  - clickable:button:Start free trial

### Trying Shopify with a free trial – Shopify Help Center

- Page: `help-trial.html`
- Headings: Trying Shopify with a free trial, Available plans for trial, Initiate the free trial, Setting up your store during the free trial, Making the most of your free trial, Choosing a paid plan, Charges incurred during your free trial, Switching between plans during your free trial, Free trial period length and details, Monthly plan promotional pricing
- Interactables: `0` buttons, `18` links, `1` inputs
- Notable controls:
  - clickable:a:Shopify Help Center
  - typeable:input:Search help articles...
  - clickable:a:Available plans for trial
  - clickable:a:Initiate the free trial
  - clickable:a:Setting up your store
  - clickable:a:Making the most of your trial
  - clickable:a:Choosing a paid plan
  - clickable:a:Trial period length

### Shopify Pricing – Plans for Every Business

- Page: `pricing.html`
- Headings: Plans & pricing, What every plan gets you, World's best checkout, In-person selling, Multiple sales channels, In-depth analytics, Commerce apps, 24/7 support, More options for your business, Frequently asked questions
- Interactables: `9` buttons, `36` links, `2` inputs
- Notable controls:
  - clickable:a:Shopify
  - clickable:a:Solutions
  - clickable:a:Pricing
  - clickable:a:Resources
  - clickable:a:Log in
  - clickable:a:Start free trial
  - typeable:input:Enter your email address
  - clickable:button:Start free trial

### Resources – Shopify

- Page: `resources.html`
- Headings: Resources, Explore resources, Blog, Tools, Events, Learn and grow, Ready to start selling?
- Interactables: `2` buttons, `34` links, `1` inputs
- Notable controls:
  - clickable:a:Shopify
  - clickable:a:Solutions
  - clickable:a:Pricing
  - clickable:a:Resources
  - clickable:a:Log in
  - clickable:a:Start free trial
  - clickable:a:Shopify Help Center Browse step-by-step guides and tutorials on setting up and managing your store.
  - clickable:a:Shopify Academy Free online courses on entrepreneurship, marketing, and ecommerce best practices.

### Contact Shopify Plus Sales

- Page: `sales.html`
- Headings: Contact Shopify Plus Sales, Thank you!
- Interactables: `1` buttons, `7` links, `6` inputs
- Notable controls:
  - clickable:a:Shopify
  - clickable:a:Pricing
  - clickable:a:Resources
  - clickable:a:Log in
  - clickable:a:Start free trial
  - typeable:input:Your full name
  - typeable:input:you@company.com
  - typeable:input:Your company name

