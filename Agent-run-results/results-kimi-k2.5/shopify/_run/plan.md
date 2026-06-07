# UXAgent Exploration Plan

## Goal

Explore and critique the UX of the Shopify system, focusing on the primary onboarding flow (home → trial form → admin) and adjacent pages (pricing, help, resources, sales) across desktop and mobile viewports.

## Plan Summary

The exploration will proceed in phases: 1) Validate the home page's onboarding entry points and mobile tap targets. 2) Test the free trial form flow and recovery paths. 3) Explore the admin login and error states. 4) Review pricing, resources, and help pages. 5) Assess the sales form and mobile responsiveness. Each phase will check interactables, layout warnings, and cross-viewport consistency.

## Coverage Targets

- pages: `Visit all 7 target pages (index, free-trial-form, admin, pricing, help-trial, resources, sales).`
- features: `Exercise all primary onboarding controls (2x 'Start free trial', email input), form controls (free-trial-form, sales), login controls (admin), and 80% of navigation/content links (e.g., Solutions, Pricing, Resources, help links, resource links).`
- mobile: `Repeat critical checks (e.g., tap targets, form usability, layout consistency) on mobile viewport for all target pages.`

## Planned Phases

### Home Page & Onboarding Entry

- Objective: Validate the home page's onboarding controls, mobile tap targets, and navigation links.
- Target pages: index.html
- Key checks:
  - Test 'Start free trial' button (desktop/mobile) and email input. Verify navigation links (Solutions, Pricing, Resources, Log in) are clickable and have sufficient tap targets on mobile. Check layout warnings for small tap targets. Confirm cross-viewport consistency (hero section, form, customer logos).
- Exit criteria:
  - All primary onboarding controls (email input, Start free trial button) are functional. Navigation links are clickable. Mobile tap targets for navigation links are ≥44x44px (or layout warnings are documented). Cross-viewport layout is consistent.

### Free Trial Form Flow

- Objective: Test the free-trial-form.html flow, form fields, and recovery paths (e.g., skipping questions).
- Target pages: free-trial-form.html
- Key checks:
  - Interact with form fields (e.g., business type, location). Test 'Next' and 'Skip all' buttons. Verify mobile tap targets for form controls. Check for form validation (e.g., required fields). Confirm transition to admin.html (or error handling if incomplete).
- Exit criteria:
  - Form controls (buttons, inputs) are functional. 'Skip all' works. Mobile tap targets meet guidance. Form validation (if any) is clear. Transition to admin.html (or error state) is consistent across viewports.

### Admin Login & Error States

- Objective: Validate the admin login form, alternative login methods (Apple, Google, Facebook), and error states (e.g., incorrect credentials).
- Target pages: admin.html
- Key checks:
  - Test email, password, and store URL inputs. Test 'Log in' button, 'Forgot password?', and social login buttons. Verify mobile tap targets for login controls. Check for error states (e.g., invalid credentials) and recovery paths (e.g., password reset).
- Exit criteria:
  - Login form controls are functional. Social login buttons work (or are placeholders). Error states (if triggered) are clear. Mobile tap targets meet guidance. Password reset link is functional.

### Adjacent Pages: Pricing, Help, Resources

- Objective: Explore pricing tiers, help content, and resources, checking interactables and mobile tap targets.
- Target pages: pricing.html, help-trial.html, resources.html
- Key checks:
  - Test 'Start free trial' buttons on pricing. Verify plan comparison tables (pricing.html). Check help article links (help-trial.html). Test resource links (e.g., Blog, Tools, Events) on resources.html. Validate mobile tap targets for all interactables. Check layout warnings (small tap targets) on navigation and content links.
- Exit criteria:
  - All primary interactables (e.g., plan buttons, help links, resource links) are functional. Mobile tap targets meet guidance. Layout warnings are documented. Cross-viewport layout is consistent for tables (pricing.html) and content sections.

### Sales Form & Final Checks

- Objective: Test the sales form (sales.html) for input labels, validation, and mobile responsiveness. Confirm cross-viewport consistency for all pages.
- Target pages: sales.html
- Key checks:
  - Test form fields (name, email, company, size, phone, topic). Verify 'Submit' button. Check for missing input labels (per prescan layout warnings). Validate mobile tap targets for form controls. Confirm cross-viewport layout for all target pages (desktop/mobile).
- Exit criteria:
  - Sales form controls are functional. Input labels are present (or warnings are documented). Mobile tap targets meet guidance. All target pages have consistent layout across viewports.

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

