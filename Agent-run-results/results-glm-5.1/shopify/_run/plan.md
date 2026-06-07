# UXAgent Exploration Plan

## Goal

Autonomously explore and critique the UX of the full Shopify system, prioritizing the primary form/onboarding flow plus adjacent pages, states, and recovery paths.

## Plan Summary

The exploration will start by traversing the primary onboarding funnel from the homepage email input through the multi-step trial form to completion. It will then validate adjacent flows including the login, enterprise sales contact form, and pricing toggle interactions. Finally, it will assess content pages, error handling, and mobile responsiveness, paying close attention to the numerous small tap targets and missing input labels identified in the prescan.

## Coverage Targets

- pages: `visit all 8 known HTML pages`
- features: `exercise all form inputs, validation states, toggles, and key navigation links per page`
- mobile: `repeat critical checks on mobile viewport, specifically targeting known small tap targets and form usability`

## Planned Phases

### Primary Onboarding Funnel

- Objective: Validate the core conversion path from the homepage email input through the multi-step trial signup form.
- Target pages: index.html, free-trial-form.html
- Key checks:
  - Submit the homepage email form with an invalid format and verify inline error handling.
  - Submit the homepage email form with a valid email and confirm navigation to free-trial-form.html.
  - Progress through the 'What are you planning to sell?' step, selecting various options.
  - Test the 'Skip all' functionality and verify it bypasses remaining steps appropriately.
  - Complete the multi-step form to the 'Your store is ready!' state, ensuring smooth transitions.
- Exit criteria:
  - Successful completion of the trial form to the final success state.
  - Validation error triggered and displayed for invalid email input.
  - Skip all functionality confirmed working.

### Authentication & Recovery

- Objective: Test the login flow, including error states, social login options, and navigation to signup.
- Target pages: admin.html
- Key checks:
  - Attempt to log in with empty fields and verify error messaging.
  - Attempt to log in with invalid credentials and verify error messaging.
  - Check the 'Forgot password?' link behavior.
  - Verify navigation from 'New to Shopify? Start free trial' back to the onboarding flow.
- Exit criteria:
  - Login validation errors observed for empty and invalid inputs.
  - Forgot password and signup navigation paths verified.

### Pricing & Enterprise Contact

- Objective: Validate the pricing page interactions and the enterprise sales contact form, including accessibility issues.
- Target pages: pricing.html, sales.html
- Key checks:
  - Toggle between 'Pay monthly' and 'Pay yearly' and verify price/feature updates.
  - Expand FAQ accordions and verify content visibility.
  - On sales.html, submit the form with empty required fields to trigger validation.
  - Verify the accessibility and labeling of the company size and topic select dropdowns on sales.html.
  - Navigate via the 'View pricing' link back to pricing.html.
- Exit criteria:
  - Pricing toggle successfully updates plan details.
  - Sales form validation triggered for empty inputs.
  - Missing label accessibility issue confirmed on sales.html.

### Content & Help Pages

- Objective: Explore the resources and help center pages to ensure navigation and search functionality operate correctly.
- Target pages: resources.html, help-trial.html
- Key checks:
  - Verify navigation links to Help Center, Academy, Theme Store, and App Store from resources.html.
  - Test the search input on help-trial.html.
  - Click the table of contents links (e.g., 'Initiate the free trial') and verify scroll/navigation behavior.
  - Verify inline links (e.g., 'sign up for a free trial') navigate correctly.
- Exit criteria:
  - Resource links verified.
  - Help center search and navigation functioning.

### Mobile Viewport Validation

- Objective: Re-test critical flows and high-risk areas on a mobile viewport to assess responsiveness and tap target issues.
- Target pages: index.html, free-trial-form.html, pricing.html
- Key checks:
  - Verify homepage hero and email input adapt properly to mobile viewport.
  - Assess the multi-step trial form usability on mobile, checking for layout shifts or obscured inputs.
  - Evaluate the pricing toggle and comparison table readability on mobile.
  - Confirm the severity of small tap targets identified in the prescan (header nav, footer links).
- Exit criteria:
  - Critical flows validated on mobile viewport.
  - Tap target and layout warnings documented with visual evidence.

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

