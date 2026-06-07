const app = document.getElementById("app");
const STORAGE_KEY = "govuk-passport-demo-state";

const optionLabels = {
  applying_from: {
    uk: "In the UK",
    outside_uk: "Outside the UK"
  },
  applicant_type: {
    adult: "An adult",
    child: "A child under 16"
  },
  previous_passport: {
    yes: "Yes",
    no: "No"
  },
  passport_status: {
    have: "I have the passport",
    damaged: "It is damaged",
    lost: "It is lost",
    stolen: "It has been stolen"
  },
  lost_reported: {
    yes: "Yes",
    no: "No"
  },
  born_or_adopted_in_uk: {
    yes: "Yes",
    no: "No"
  },
  british_citizen: {
    yes: "Yes",
    no: "No"
  },
  photo_option: {
    upload: "Upload a digital photo",
    code: "Use a photo code"
  },
  changed_name: {
    no: "No",
    yes: "Yes"
  },
  sex: {
    female: "Female",
    male: "Male",
    another: "Another way"
  },
  british_nationality: {
    british_citizen: "British citizen",
    british_subject: "British subject",
    british_overseas: "British overseas national or citizen"
  },
  other_passports: {
    no: "No",
    yes: "Yes"
  },
  delivery_address_same: {
    yes: "Yes",
    no: "No"
  },
  delivery_option: {
    standard: "Standard secure delivery",
    collect: "Collect from a passport office"
  },
  identity_referee: {
    yes: "Yes, I can provide their details now",
    later: "I will provide them later"
  },
  payment_method: {
    card: "Pay by debit or credit card",
    delayed: "Decide later in this demo"
  },
  title: {
    "": "Select a title",
    mr: "Mr",
    mrs: "Mrs",
    miss: "Miss",
    ms: "Ms",
    mx: "Mx",
    dr: "Dr"
  }
};

const countries = [
  "Australia",
  "Canada",
  "France",
  "Germany",
  "India",
  "Ireland",
  "New Zealand",
  "Spain",
  "United Kingdom",
  "United States",
  "Other country"
];

let data = loadState();

function loadState() {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveState() {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function clearState() {
  data = {};
  sessionStorage.removeItem(STORAGE_KEY);
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  }[char]));
}

function value(name) {
  return escapeHtml(data[name] || "");
}

function checked(name, expected) {
  return data[name] === expected ? " checked" : "";
}

function selected(name, expected) {
  return data[name] === expected ? " selected" : "";
}

function labelFor(name, rawValue) {
  return optionLabels[name]?.[rawValue] || rawValue || "";
}

function crownSvg() {
  return `
    <svg class="govuk-header__crown" viewBox="0 0 60 48" aria-hidden="true" focusable="false">
      <path d="M8 39h44v6H8v-6Zm4-5h36l5-23-12 10-11-16-11 16L7 11l5 23Zm8-4-2-9 7 6 5-8 5 8 7-6-2 9H20Z"></path>
    </svg>`;
}

function header(isService) {
  return `
    <header class="govuk-header" role="banner">
      <div class="govuk-width-container govuk-header__container">
        <a class="govuk-header__logo" href="#start" aria-label="GOV.UK local demo home">
          ${crownSvg()}
          <span>GOV.UK</span>
        </a>
        ${isService ? `<a class="govuk-header__service-name" href="#service-start">Apply for a passport</a>` : ""}
        <nav class="govuk-header__nav" aria-label="Top level">
          <a href="#start">Home</a>
          <a href="#service-start">Service</a>
          <a href="#confirmation" data-demo-link>Demo result</a>
        </nav>
      </div>
    </header>`;
}

function demoBanner() {
  return `
    <div class="demo-banner">
      <div class="govuk-width-container">
        <strong>Local demo only.</strong> This is not an official GOV.UK or HM Passport Office service. Do not enter real passport, payment or personal information.
      </div>
    </div>`;
}

function cookieBanner() {
  const hidden = sessionStorage.getItem("govuk-passport-demo-cookies") ? " hidden" : "";
  return `
    <section class="cookie-banner" aria-label="Cookies on GOV.UK"${hidden}>
      <div class="govuk-width-container">
        <h2>Cookies on GOV.UK</h2>
        <p class="govuk-body">We use some essential cookies to make this website work.</p>
        <p class="govuk-body">We'd also like to use analytics cookies so we can understand how you use the service and make improvements.</p>
        <div class="cookie-actions">
          <button class="govuk-button" type="button" data-cookie-choice="accept">Accept analytics cookies</button>
          <button class="govuk-button" type="button" data-cookie-choice="reject">Reject analytics cookies</button>
          <a href="#start">View cookies</a>
        </div>
      </div>
    </section>`;
}

function phaseBanner() {
  return `
    <div class="govuk-phase-banner">
      <div class="govuk-width-container">
        <span class="govuk-tag">Beta</span>
        <a href="#service-start">feedback</a> This is a new service. Your feedback will help us improve it.
      </div>
    </div>`;
}

function footer() {
  return `
    <footer class="govuk-footer" role="contentinfo">
      <div class="govuk-width-container">
        <div class="govuk-footer__navigation">
          <section>
            <h2>Services and information</h2>
            <ul>
              <li><a href="#start">Benefits</a></li>
              <li><a href="#start">Births, deaths, marriages and care</a></li>
              <li><a href="#start">Citizenship and living in the UK</a></li>
            </ul>
          </section>
          <section>
            <h2>Government activity</h2>
            <ul>
              <li><a href="#start">Departments</a></li>
              <li><a href="#start">News</a></li>
              <li><a href="#start">Guidance and regulation</a></li>
            </ul>
          </section>
          <section>
            <h2>Support links</h2>
            <ul>
              <li><a href="#start">Help</a></li>
              <li><a href="#start">Privacy</a></li>
              <li><a href="#start">Accessibility statement</a></li>
            </ul>
          </section>
        </div>
        <div class="govuk-footer__meta">
          <p class="licence">Contains public sector information adapted under the Open Government Licence v3.0. This local prototype does not collect or transmit information.</p>
          <p>&copy; Crown copyright</p>
        </div>
      </div>
    </footer>`;
}

function renderStart() {
  document.title = "Apply for or renew a passport - GOV.UK local demo";
  app.innerHTML = `
    ${header(false)}
    ${demoBanner()}
    ${cookieBanner()}
    <div class="govuk-width-container">
      <nav class="govuk-breadcrumbs" aria-label="Breadcrumb">
        <ol>
          <li><a href="#start">Home</a></li>
          <li><a href="#start">Citizenship and living in the UK</a></li>
          <li><a href="#start">Passports, travel and living abroad</a></li>
        </ol>
      </nav>
      <main class="govuk-main-wrapper" id="main-content">
        <div class="govuk-grid-row">
          <div>
            <span class="govuk-caption-xl">Passports</span>
            <h1 class="govuk-heading-xl">Apply for or renew a passport</h1>
            <p class="govuk-body">Apply online for a UK passport. You can also renew, replace, change details on, or apply for a child passport.</p>
            <p class="govuk-body">This local version recreates the public GOV.UK page and a complete interactive form flow for demonstration and design review.</p>

            <div class="govuk-inset-text">
              You must use the official GOV.UK service for a real passport application. This page is an offline prototype.
            </div>

            <a class="govuk-button govuk-button--start" href="#service-start" role="button">
              Start now <span class="start-arrow" aria-hidden="true">&#8250;</span>
            </a>

            <h2 class="govuk-heading-m">Before you start</h2>
            <p class="govuk-body">You'll need a digital photo, your old passport if you have one, and a debit or credit card if you want to continue to payment.</p>
            <ul class="govuk-list govuk-list--bullet">
              <li>Use this service to apply for, renew or replace a passport.</li>
              <li>You can apply for an adult or child passport.</li>
              <li>You'll be told which documents to send at the end.</li>
            </ul>

            <details>
              <summary>Other ways to apply</summary>
              <p class="govuk-body">You can apply using a paper form from a Post Office that offers the Check and Send service. This local demo only recreates the online route.</p>
            </details>

            <div class="metadata-list">
              <p><strong>Last reviewed:</strong> 11 May 2026</p>
              <p><strong>From:</strong> HM Passport Office</p>
            </div>
          </div>

          <aside class="related-navigation" aria-label="Related content">
            <h2>Related content</h2>
            <p class="govuk-body-s">All links go to the same demo form &mdash; the related routes are not separately implemented in this prototype.</p>
            <ul>
              <li><a href="#service-start">Renew an adult passport</a></li>
              <li><a href="#service-start">Apply for a child passport</a></li>
              <li><a href="#service-start">Report a lost or stolen passport</a></li>
              <li><a href="#service-start">Passport fees</a></li>
            </ul>
          </aside>
        </div>
      </main>
    </div>
    <div class="feedback-strip">
      <div class="govuk-width-container">Is this page useful? <a href="#start">Yes</a> <a href="#start">No</a></div>
    </div>
    ${footer()}`;
  bindCommonEvents();
}

// Step-to-section mapping. Every step hash must appear in exactly one stage's
// `routes` list so the progress sidebar highlights the correct section.
// `email` belongs to "Contact and delivery", not "Your photo".
const progressStages = [
  { label: "Check eligibility", routes: ["service-start", "applying-from", "overseas-country", "applicant-type", "previous-passport", "passport-status", "lost-stolen-reference", "passport-details", "first-passport"] },
  { label: "Your photo", routes: ["photo-option", "photo-upload", "photo-code"] },
  { label: "Personal details", routes: ["parents-details", "full-name", "name-change", "sex", "date-of-birth", "birth-place", "nationality", "other-passports"] },
  { label: "Contact and delivery", routes: ["email", "contact-details", "address", "delivery", "identity-referee"] },
  { label: "Documents", routes: ["documents"] },
  { label: "Check and pay", routes: ["check-answers", "declaration", "payment-choice", "payment", "confirmation"] }
];

function stageIndexFor(route) {
  const index = progressStages.findIndex((stage) => stage.routes.includes(route));
  return index === -1 ? 0 : index;
}

function progressPanel(route) {
  const current = stageIndexFor(route);
  return `
    <aside class="progress-panel" aria-label="Application progress">
      <h2 class="govuk-heading-s">Application progress</h2>
      <ol>
        ${progressStages.map((stage, index) => {
          const cls = index === current ? "is-current" : index < current ? "is-done" : "";
          const status = index < current ? "Completed" : index === current ? "Current" : "Not started";
          return `<li class="${cls}"><span>${escapeHtml(stage.label)}</span><br><span class="govuk-body-s">${status}</span></li>`;
        }).join("")}
      </ol>
    </aside>`;
}

function serviceLayout(route, content, errors = []) {
  const isFirst = route === "service-start";
  const title = routes[route]?.title || "Apply for a passport";
  document.title = `${errors.length ? "Error: " : ""}${title} - Apply for a passport - Local demo`;
  app.innerHTML = `
    ${header(true)}
    ${demoBanner()}
    ${cookieBanner()}
    ${phaseBanner()}
    <div class="govuk-width-container">
      ${isFirst ? "" : `<button class="govuk-back-link app-back-button" type="button" data-back>Back</button>`}
      <main class="govuk-main-wrapper" id="main-content">
        <div class="service-shell">
          <div>${content}</div>
          ${progressPanel(route)}
        </div>
      </main>
    </div>
    ${footer()}`;
  bindCommonEvents();
  bindServiceEvents(route);
  if (errors.length) {
    const summary = document.querySelector(".govuk-error-summary");
    if (summary) {
      summary.focus();
      summary.querySelectorAll("a[href^='#']").forEach((link) => {
        link.addEventListener("click", (e) => {
          const targetId = link.getAttribute("href").slice(1);
          const target = document.getElementById(targetId);
          if (target) {
            e.preventDefault();
            target.focus();
            target.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        });
      });
    }
  }
}

function serviceStartContent() {
  const hasSavedAnswers = Object.keys(data).some((key) => key !== "demo_reference" && data[key]);
  const restoredBanner = hasSavedAnswers ? `
    <div class="restored-banner" role="status">
      <p class="govuk-body">We've saved your answers from your last session. <button class="restored-banner__action" type="button" data-clear>Start again</button></p>
    </div>` : "";
  return `
    <form data-route="service-start" novalidate>
      ${restoredBanner}
      <span class="govuk-caption-xl">HM Passport Office</span>
      <h1 class="govuk-heading-xl">Apply for a passport</h1>
      <p class="govuk-body">Use this service to apply for a first adult passport, renew or replace a passport, or apply for a child passport.</p>
      <div class="govuk-warning-text">
        <span class="govuk-warning-text__icon" aria-hidden="true">!</span>
        <span>This local demo is for interface testing only. Do not enter real personal, passport or payment information.</span>
      </div>
      <h2 class="govuk-heading-m">You will need</h2>
      <ul class="govuk-list govuk-list--bullet">
        <li>a digital passport photo or photo code</li>
        <li>your old passport if you have one</li>
        <li>details about your parents for some applications</li>
        <li>a way to pay if you continue to the payment screen</li>
      </ul>
      <ol class="task-list" aria-label="Overview of this demo">
        <li><span>Answer eligibility questions</span><span class="task-status">To do</span></li>
        <li><span>Add photo and personal details</span><span class="task-status">To do</span></li>
        <li><span>Check answers and complete the declaration</span><span class="task-status">To do</span></li>
      </ol>
      <button class="govuk-button govuk-button--start" type="submit">Continue <span class="start-arrow" aria-hidden="true">&#8250;</span></button>
    </form>`;
}

const routes = {
  "service-start": {
    title: "Apply for a passport",
    render: serviceStartContent,
    next: () => "applying-from"
  },
  "applying-from": {
    title: "Where are you applying from?",
    render: (errors) => radioPage({
      name: "applying_from",
      legend: "Where are you applying from?",
      hint: "Select where the applicant is when making this application.",
      errors,
      options: [
        ["uk", "In the UK"],
        ["outside_uk", "Outside the UK"]
      ]
    }),
    validate: (form) => validateRequiredChoice(form, "applying_from", "Select where you are applying from"),
    next: () => data.applying_from === "outside_uk" ? "overseas-country" : "applicant-type"
  },
  "overseas-country": {
    title: "Which country are you applying from?",
    render: (errors) => `
      <form data-route="overseas-country" novalidate>
        ${errorSummary(errors)}
        ${selectInput({
          name: "overseas_country",
          label: "Which country are you applying from?",
          labelClass: "govuk-label--l",
          hint: "This affects delivery times and documents you may need to send.",
          errors,
          options: countries
        })}
        ${continueButton()}
      </form>`,
    validate: (form) => validateRequiredValue(form, "overseas_country", "Select the country you are applying from"),
    next: () => "applicant-type"
  },
  "applicant-type": {
    title: "Who is the passport for?",
    render: (errors) => radioPage({
      name: "applicant_type",
      legend: "Who is the passport for?",
      hint: "Child passports are for applicants under 16.",
      errors,
      options: [
        ["adult", "An adult"],
        ["child", "A child under 16"]
      ]
    }),
    validate: (form) => validateRequiredChoice(form, "applicant_type", "Select who the passport is for"),
    next: () => "previous-passport"
  },
  "previous-passport": {
    title: "Has the applicant had a UK passport before?",
    render: (errors) => radioPage({
      name: "previous_passport",
      legend: "Has the applicant had a UK passport before?",
      hint: "Include expired passports and passports issued when the applicant was a child.",
      errors,
      options: [
        ["yes", "Yes"],
        ["no", "No"]
      ]
    }),
    validate: (form) => validateRequiredChoice(form, "previous_passport", "Select whether the applicant has had a UK passport before"),
    next: () => data.previous_passport === "yes" ? "passport-status" : "first-passport"
  },
  "passport-status": {
    title: "What is the status of the most recent passport?",
    render: (errors) => radioPage({
      name: "passport_status",
      legend: "What is the status of the most recent passport?",
      hint: "If you have more than one UK passport, answer for the most recent one.",
      errors,
      options: [
        ["have", "I have the passport"],
        ["damaged", "It is damaged"],
        ["lost", "It is lost"],
        ["stolen", "It has been stolen"]
      ]
    }),
    validate: (form) => validateRequiredChoice(form, "passport_status", "Select the status of the most recent passport"),
    next: () => ["lost", "stolen"].includes(data.passport_status) ? "lost-stolen-reference" : "passport-details"
  },
  "lost-stolen-reference": {
    title: "Have you reported the passport lost or stolen?",
    render: (errors) => `
      <form data-route="lost-stolen-reference" novalidate>
        ${errorSummary(errors)}
        ${radioGroup({
          name: "lost_reported",
          legend: "Have you reported the passport lost or stolen?",
          hint: "You should report it before applying for a replacement passport.",
          errors,
          options: [
            ["yes", "Yes"],
            ["no", "No"]
          ]
        })}
        ${revealBlock("lost_reported", "yes", textInput({
          name: "lost_stolen_reference",
          label: "Lost or stolen reference number",
          hint: "For this demo you can use LS123456.",
          width: "govuk-input--width-20",
          errors
        }))}
        ${continueButton()}
      </form>`,
    validate: (form) => {
      const errors = validateRequiredChoice(form, "lost_reported", "Select whether you reported the passport lost or stolen");
      if (formValue(form, "lost_reported") === "yes") {
        errors.push(...validateRequiredValue(form, "lost_stolen_reference", "Enter the lost or stolen reference number"));
      }
      return errors;
    },
    next: () => "passport-details"
  },
  "passport-details": {
    title: "Enter the old passport details",
    render: (errors) => `
      <form data-route="passport-details" novalidate>
        ${errorSummary(errors)}
        <h1 class="govuk-heading-l">Enter the old passport details</h1>
        ${textInput({
          name: "old_passport_number",
          label: "Passport number",
          hint: "For this demo use a made-up number such as DEMO123456.",
          width: "govuk-input--width-20",
          errors
        })}
        ${dateInput({
          name: "old_passport_expiry",
          legend: "Expiry date",
          hint: "For example, 27 3 2028",
          errors
        })}
        ${selectInput({
          name: "issuing_authority",
          label: "Issuing authority",
          errors,
          options: ["HM Passport Office", "UK Passport Agency", "British Embassy or High Commission", "Other"]
        })}
        ${continueButton()}
      </form>`,
    validate: (form) => [
      ...validateRequiredValue(form, "old_passport_number", "Enter the old passport number"),
      ...validateRequiredDate(form, "old_passport_expiry", "Enter the old passport expiry date"),
      ...validateRequiredValue(form, "issuing_authority", "Select the issuing authority")
    ],
    next: () => "email"
  },
  "first-passport": {
    title: "Check if the applicant can use this service",
    render: (errors) => `
      <form data-route="first-passport" novalidate>
        ${errorSummary(errors)}
        <h1 class="govuk-heading-l">Check if the applicant can use this service</h1>
        <p class="govuk-body">Because this is the applicant's first UK passport, we need to confirm a few eligibility details before continuing.</p>
        ${radioGroup({
          name: "born_or_adopted_in_uk",
          legend: "Was the applicant born or adopted in the UK?",
          errors,
          options: [["yes", "Yes"], ["no", "No"]]
        })}
        ${radioGroup({
          name: "british_citizen",
          legend: "Is the applicant a British citizen?",
          hint: "Most people applying for a UK passport must be British citizens.",
          errors,
          options: [["yes", "Yes"], ["no", "No or not sure"]]
        })}
        ${continueButton()}
      </form>`,
    validate: (form) => [
      ...validateRequiredChoice(form, "born_or_adopted_in_uk", "Select whether the applicant was born or adopted in the UK"),
      ...validateRequiredChoice(form, "british_citizen", "Select whether the applicant is a British citizen")
    ],
    next: () => "parents-details"
  },
  "parents-details": {
    title: "Enter parents' details",
    render: (errors) => `
      <form data-route="parents-details" novalidate>
        ${errorSummary(errors)}
        <h1 class="govuk-heading-l">Enter parents' details</h1>
        <p class="govuk-body">First passport and child passport applications usually need details about parents or guardians.</p>
        ${textInput({ name: "parent1_name", label: "Parent or guardian 1 full name", hint: "For example, Jane Elizabeth Smith", errors })}
        ${textInput({ name: "parent1_birth_country", label: "Parent or guardian 1 country of birth", hint: "For example, United Kingdom", errors, datalist: countries })}
        ${textInput({ name: "parent2_name", label: "Parent or guardian 2 full name (optional)", hint: "Leave blank if this does not apply.", errors })}
        ${textInput({ name: "parent2_birth_country", label: "Parent or guardian 2 country of birth (optional)", hint: "Leave blank if this does not apply.", errors, datalist: countries })}
        ${continueButton()}
      </form>`,
    validate: (form) => {
      const errors = [
        ...validateRequiredValue(form, "parent1_name", "Enter parent or guardian 1 full name"),
        ...validateRequiredValue(form, "parent1_birth_country", "Enter parent or guardian 1 country of birth")
      ];
      const nameVal = formValue(form, "parent1_name");
      const countryWords = countries.map((c) => c.toLowerCase());
      if (nameVal && countryWords.some((c) => nameVal.toLowerCase().includes(c) && c.length > 3)) {
        errors.push({ field: "parent1_name", message: "It looks like you may have entered a country name in the name field. Please check this is correct." });
      }
      return errors;
    },
    next: () => "email"
  },
  "email": {
    title: "What is your email address?",
    render: (errors) => `
      <form data-route="email" novalidate>
        ${errorSummary(errors)}
        <h1 class="govuk-heading-l">What is your email address?</h1>
        <p class="govuk-body">We will use this to send updates about this demo application.</p>
        ${textInput({ name: "email", label: "Email address", type: "email", autocomplete: "email", width: "govuk-input--width-20", errors })}
        ${textInput({ name: "email_confirm", label: "Confirm email address", type: "email", width: "govuk-input--width-20", errors })}
        ${continueButton()}
      </form>`,
    validate: (form) => {
      const errors = [
        ...validateRequiredValue(form, "email", "Enter an email address"),
        ...validateRequiredValue(form, "email_confirm", "Confirm your email address")
      ];
      const email = formValue(form, "email");
      const confirm = formValue(form, "email_confirm");
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push({ field: "email", message: "Enter an email address in the correct format" });
      if (email && confirm && email !== confirm) errors.push({ field: "email_confirm", message: "Email addresses must match" });
      return errors;
    },
    next: () => "photo-option"
  },
  "photo-option": {
    title: "How do you want to provide a photo?",
    render: (errors) => radioPage({
      name: "photo_option",
      legend: "How do you want to provide a photo?",
      hint: "You can upload a digital photo or use a code from a photo booth or shop.",
      errors,
      options: [
        ["upload", "Upload a digital photo"],
        ["code", "Use a photo code"]
      ]
    }),
    validate: (form) => validateRequiredChoice(form, "photo_option", "Select how you want to provide a photo"),
    next: () => data.photo_option === "code" ? "photo-code" : "photo-upload"
  },
  "photo-upload": {
    title: "Upload a digital photo",
    render: (errors) => `
      <form data-route="photo-upload" novalidate>
        ${errorSummary(errors)}
        <h1 class="govuk-heading-l">Upload a digital photo</h1>
        <div class="photo-panel">
          <div class="photo-frame" aria-hidden="true"><span class="photo-frame__person"></span></div>
          <p class="govuk-body">Your photo must be clear, in colour, and taken against a plain light background.</p>
        </div>
        ${fileInput({ name: "photo_file", label: "Upload a photo", hint: "Use a demo image file. Nothing is uploaded.", errors })}
        ${checkboxInput({ name: "photo_rules", label: "I confirm this is a demo photo and I will not enter real personal information.", errors })}
        ${continueButton()}
      </form>`,
    validate: (form) => [
      ...validateRequiredValue(form, "photo_file", "Choose a demo photo file"),
      ...validateRequiredCheckbox(form, "photo_rules", "Confirm this is a demo photo")
    ],
    next: () => "full-name"
  },
  "photo-code": {
    title: "Enter your photo code",
    render: (errors) => `
      <form data-route="photo-code" novalidate>
        ${errorSummary(errors)}
        <h1 class="govuk-heading-l">Enter your photo code</h1>
        <p class="govuk-body">A photo code is usually printed on your receipt.</p>
        ${textInput({ name: "photo_code", label: "Photo code", hint: "For this demo use ABC-123-XYZ.", width: "govuk-input--width-20", errors })}
        ${continueButton()}
      </form>`,
    validate: (form) => validateRequiredValue(form, "photo_code", "Enter the photo code"),
    next: () => "full-name"
  },
  "full-name": {
    title: "What is the applicant's full name?",
    render: (errors) => `
      <form data-route="full-name" novalidate>
        ${errorSummary(errors)}
        <h1 class="govuk-heading-l">What is the applicant's full name?</h1>
        ${selectInput({ name: "title", label: "Title", options: ["Mr", "Mrs", "Miss", "Ms", "Mx", "Dr"], errors })}
        ${textInput({ name: "first_names", label: "First and middle names", autocomplete: "given-name", errors })}
        ${textInput({ name: "last_name", label: "Last name", autocomplete: "family-name", errors })}
        ${continueButton()}
      </form>`,
    validate: (form) => [
      ...validateRequiredValue(form, "title", "Select a title"),
      ...validateRequiredValue(form, "first_names", "Enter first and middle names"),
      ...validateRequiredValue(form, "last_name", "Enter last name")
    ],
    next: () => "name-change"
  },
  "name-change": {
    title: "Has the applicant changed their name?",
    render: (errors) => `
      <form data-route="name-change" novalidate>
        ${errorSummary(errors)}
        ${radioGroup({
          name: "changed_name",
          legend: "Has the applicant changed their name?",
          hint: "This includes changes by marriage, deed poll or another legal process.",
          errors,
          options: [["no", "No"], ["yes", "Yes"]]
        })}
        ${revealBlock("changed_name", "yes", `
          ${textInput({ name: "previous_names", label: "Previous full name", errors })}
          ${textInput({ name: "name_change_reason", label: "Reason for name change", hint: "For example, marriage or deed poll.", errors })}
        `)}
        ${continueButton()}
      </form>`,
    validate: (form) => {
      const errors = validateRequiredChoice(form, "changed_name", "Select whether the applicant has changed their name");
      if (formValue(form, "changed_name") === "yes") {
        errors.push(...validateRequiredValue(form, "previous_names", "Enter the previous full name"));
        errors.push(...validateRequiredValue(form, "name_change_reason", "Enter the reason for the name change"));
      }
      return errors;
    },
    next: () => "sex"
  },
  "sex": {
    title: "What is the sex shown on the passport?",
    render: (errors) => radioPage({
      name: "sex",
      legend: "What is the sex shown on the passport?",
      hint: "This is the sex marker that will appear on the passport.",
      errors,
      options: [
        ["female", "Female"],
        ["male", "Male"],
        ["another", "Another way"]
      ]
    }),
    validate: (form) => validateRequiredChoice(form, "sex", "Select the sex shown on the passport"),
    next: () => "date-of-birth"
  },
  "date-of-birth": {
    title: "What is the applicant's date of birth?",
    render: (errors) => `
      <form data-route="date-of-birth" novalidate>
        ${errorSummary(errors)}
        ${dateInput({
          name: "birth_date",
          legend: "What is the applicant's date of birth?",
          hint: "For example, 31 3 1980",
          errors
        })}
        ${continueButton()}
      </form>`,
    validate: (form) => validateRequiredDate(form, "birth_date", "Enter the applicant's date of birth"),
    next: () => "birth-place"
  },
  "birth-place": {
    title: "Where was the applicant born?",
    render: (errors) => `
      <form data-route="birth-place" novalidate>
        ${errorSummary(errors)}
        <h1 class="govuk-heading-l">Where was the applicant born?</h1>
        ${textInput({ name: "birth_town", label: "Town or city of birth", errors })}
        ${textInput({ name: "birth_country", label: "Country of birth", errors })}
        ${continueButton()}
      </form>`,
    validate: (form) => [
      ...validateRequiredValue(form, "birth_town", "Enter town or city of birth"),
      ...validateRequiredValue(form, "birth_country", "Enter country of birth")
    ],
    next: () => "nationality"
  },
  "nationality": {
    title: "What is the applicant's British nationality?",
    render: (errors) => radioPage({
      name: "british_nationality",
      legend: "What is the applicant's British nationality?",
      hint: "If you are not sure, select the closest option for this demo.",
      errors,
      options: [
        ["british_citizen", "British citizen"],
        ["british_subject", "British subject"],
        ["british_overseas", "British overseas national or citizen"]
      ]
    }),
    validate: (form) => validateRequiredChoice(form, "british_nationality", "Select the applicant's British nationality"),
    next: () => "other-passports"
  },
  "other-passports": {
    title: "Does the applicant have passports from other countries?",
    render: (errors) => `
      <form data-route="other-passports" novalidate>
        ${errorSummary(errors)}
        ${radioGroup({
          name: "other_passports",
          legend: "Does the applicant have passports from other countries?",
          errors,
          options: [["no", "No"], ["yes", "Yes"]]
        })}
        ${revealBlock("other_passports", "yes", textareaInput({
          name: "other_passports_details",
          label: "Tell us about the other passports",
          hint: "Include country and passport number. Use made-up details in this demo.",
          errors
        }))}
        ${continueButton()}
      </form>`,
    validate: (form) => {
      const errors = validateRequiredChoice(form, "other_passports", "Select whether the applicant has passports from other countries");
      if (formValue(form, "other_passports") === "yes") {
        errors.push(...validateRequiredValue(form, "other_passports_details", "Enter details of the other passports"));
      }
      return errors;
    },
    next: () => "contact-details"
  },
  "contact-details": {
    title: "Enter contact details",
    render: (errors) => `
      <form data-route="contact-details" novalidate>
        ${errorSummary(errors)}
        <h1 class="govuk-heading-l">Enter contact details</h1>
        ${textInput({ name: "phone", label: "Phone number", type: "tel", autocomplete: "tel", width: "govuk-input--width-20", errors })}
        ${checkboxInput({ name: "contact_by_text", label: "Send demo updates by text message", errors, optional: true })}
        ${continueButton()}
      </form>`,
    validate: (form) => validateRequiredValue(form, "phone", "Enter a phone number"),
    next: () => "address"
  },
  "address": {
    title: "What is the applicant's home address?",
    render: (errors) => `
      <form data-route="address" novalidate>
        ${errorSummary(errors)}
        <h1 class="govuk-heading-l">What is the applicant's home address?</h1>
        ${textInput({ name: "address_line_1", label: "Address line 1", autocomplete: "address-line1", errors })}
        ${textInput({ name: "address_line_2", label: "Address line 2", autocomplete: "address-line2", errors, optional: true })}
        ${textInput({ name: "town_city", label: "Town or city", autocomplete: "address-level2", errors })}
        ${textInput({ name: "postcode", label: "Postcode", autocomplete: "postal-code", width: "govuk-input--width-10", errors })}
        ${dateInput({ name: "address_from", legend: "When did the applicant start living at this address?", hint: "For example, 6 2021", monthYear: true, errors })}
        ${continueButton()}
      </form>`,
    validate: (form) => [
      ...validateRequiredValue(form, "address_line_1", "Enter address line 1"),
      ...validateRequiredValue(form, "town_city", "Enter town or city"),
      ...validateRequiredValue(form, "postcode", "Enter postcode"),
      ...validateRequiredDate(form, "address_from", "Enter when the applicant started living at this address", true)
    ],
    next: () => "delivery"
  },
  "delivery": {
    title: "Where should the passport be delivered?",
    render: (errors) => `
      <form data-route="delivery" novalidate>
        ${errorSummary(errors)}
        ${radioGroup({
          name: "delivery_address_same",
          legend: "Should the passport be delivered to the home address?",
          errors,
          options: [["yes", "Yes"], ["no", "No"]]
        })}
        ${revealBlock("delivery_address_same", "no", textareaInput({
          name: "delivery_address",
          label: "Delivery address",
          hint: "Enter a demo delivery address.",
          errors
        }))}
        ${radioGroup({
          name: "delivery_option",
          legend: "Choose a delivery option",
          errors,
          options: [["standard", "Standard secure delivery"], ["collect", "Collect from a passport office"]]
        })}
        ${continueButton()}
      </form>`,
    validate: (form) => {
      const errors = [
        ...validateRequiredChoice(form, "delivery_address_same", "Select whether the passport should be delivered to the home address"),
        ...validateRequiredChoice(form, "delivery_option", "Select a delivery option")
      ];
      if (formValue(form, "delivery_address_same") === "no") {
        errors.push(...validateRequiredValue(form, "delivery_address", "Enter the delivery address"));
      }
      return errors;
    },
    next: () => needsIdentityReferee() ? "identity-referee" : "documents"
  },
  "identity-referee": {
    title: "Confirming the applicant's identity",
    render: (errors) => `
      <form data-route="identity-referee" novalidate>
        ${errorSummary(errors)}
        <h1 class="govuk-heading-l">Confirming the applicant's identity</h1>
        <p class="govuk-body">Some applications need someone else to confirm the applicant's identity.</p>
        ${radioGroup({
          name: "identity_referee",
          legend: "Can you provide details of someone who can confirm the applicant's identity?",
          errors,
          options: [["yes", "Yes, I can provide their details now"], ["later", "I will provide them later"]]
        })}
        ${revealBlock("identity_referee", "yes", `
          ${textInput({ name: "referee_name", label: "Full name of the person confirming identity", errors })}
          ${textInput({ name: "referee_email", label: "Email address", type: "email", errors })}
          ${textInput({ name: "referee_relationship", label: "How they know the applicant", errors })}
        `)}
        ${continueButton()}
      </form>`,
    validate: (form) => {
      const errors = validateRequiredChoice(form, "identity_referee", "Select whether you can provide identity confirmation details");
      if (formValue(form, "identity_referee") === "yes") {
        errors.push(...validateRequiredValue(form, "referee_name", "Enter the full name of the person confirming identity"));
        errors.push(...validateRequiredValue(form, "referee_email", "Enter the email address of the person confirming identity"));
        errors.push(...validateRequiredValue(form, "referee_relationship", "Enter how they know the applicant"));
      }
      return errors;
    },
    next: () => "documents"
  },
  "documents": {
    title: "Documents you need to send",
    render: (errors) => `
      <form data-route="documents" novalidate>
        ${errorSummary(errors)}
        <h1 class="govuk-heading-l">Documents you need to send</h1>
        <p class="govuk-body">At the end of a real application, HM Passport Office tells you exactly which documents to send.</p>
        <ul class="govuk-list govuk-list--bullet">
          ${data.previous_passport === "yes" ? "<li>Your old UK passport, even if it is damaged.</li>" : "<li>A full birth or adoption certificate.</li><li>Evidence of British nationality.</li>"}
          ${data.changed_name === "yes" ? "<li>Evidence of the name change.</li>" : ""}
          ${data.other_passports === "yes" ? "<li>Colour copies of other passports listed in the application.</li>" : ""}
        </ul>
        ${checkboxInput({ name: "documents_understand", label: "I understand this is a demo document list.", errors })}
        ${continueButton("Continue to check answers")}
      </form>`,
    validate: (form) => validateRequiredCheckbox(form, "documents_understand", "Confirm that you understand this is a demo document list"),
    next: () => "check-answers"
  },
  "check-answers": {
    title: "Check your answers",
    render: () => `
      <form data-route="check-answers" novalidate>
        <h1 class="govuk-heading-l">Check your answers</h1>
        ${summaryHtml()}
        ${continueButton("Accept and continue")}
      </form>`,
    next: () => "declaration"
  },
  "declaration": {
    title: "Declaration",
    render: (errors) => `
      <form data-route="declaration" novalidate>
        ${errorSummary(errors)}
        <h1 class="govuk-heading-l">Declaration</h1>
        <p class="govuk-body">In a real service, you must confirm the information is correct and that you understand the legal declaration.</p>
        <div class="govuk-inset-text">This local prototype cannot submit an application and is not connected to HM Passport Office.</div>
        ${checkboxInput({ name: "agree_declaration", label: "I confirm this is a local demo and I have not entered real passport or payment information.", errors })}
        ${continueButton("Continue to payment")}
      </form>`,
    validate: (form) => validateRequiredCheckbox(form, "agree_declaration", "Confirm the declaration"),
    next: () => "payment-choice"
  },
  "payment-choice": {
    title: "How do you want to pay?",
    render: (errors) => radioPage({
      name: "payment_method",
      legend: "How do you want to pay?",
      hint: "This demo does not collect card details.",
      errors,
      options: [
        ["card", "Pay by debit or credit card"],
        ["delayed", "Decide later in this demo"]
      ],
      buttonText: "Continue"
    }),
    validate: (form) => validateRequiredChoice(form, "payment_method", "Select how you want to pay"),
    next: () => "payment"
  },
  "payment": {
    title: "Enter payment details",
    render: (errors) => `
      <form data-route="payment" novalidate>
        ${errorSummary(errors)}
        <h1 class="govuk-heading-l">Enter payment details</h1>
        <div class="payment-card">
          <div class="payment-card__logos" aria-hidden="true">
            <span class="card-logo">Visa</span>
            <span class="card-logo">Mastercard</span>
            <span class="card-logo">Amex</span>
          </div>
          <p class="govuk-body">Payment amount: <strong>${feeAmount()}</strong></p>
          <p class="govuk-body">The real service would send you to a secure payment provider. This demo has no card number fields.</p>
        </div>
        ${checkboxInput({ name: "payment_demo_confirm", label: "Complete the demo payment without entering card details.", errors })}
        ${continueButton("Complete demo application")}
      </form>`,
    validate: (form) => validateRequiredCheckbox(form, "payment_demo_confirm", "Confirm you want to complete the demo payment"),
    next: () => "confirmation"
  },
  "confirmation": {
    title: "Application complete",
    render: confirmationContent
  }
};

function renderService(route, errors = []) {
  const step = routes[route] || routes["service-start"];
  serviceLayout(route in routes ? route : "service-start", step.render(errors), errors);
  if (!errors.length) window.scrollTo({ top: 0, left: 0, behavior: "auto" });
}

function radioPage({ name, legend, hint, errors, options, buttonText = "Continue" }) {
  return `
    <form data-route="${nameToRoute(name)}" novalidate>
      ${errorSummary(errors)}
      ${radioGroup({ name, legend, hint, errors, options })}
      ${continueButton(buttonText)}
    </form>`;
}

function nameToRoute(name) {
  const map = {
    applying_from: "applying-from",
    applicant_type: "applicant-type",
    previous_passport: "previous-passport",
    passport_status: "passport-status",
    photo_option: "photo-option",
    sex: "sex",
    british_nationality: "nationality",
    payment_method: "payment-choice"
  };
  return map[name] || name.replace(/_/g, "-");
}

function errorSummary(errors = []) {
  if (!errors.length) return "";
  return `
    <div class="govuk-error-summary" tabindex="-1" aria-labelledby="error-summary-title" role="alert">
      <h2 class="govuk-heading-m" id="error-summary-title">There is a problem</h2>
      <ul>
        ${errors.map((error) => `<li><a href="#${escapeHtml(error.field)}-input">${escapeHtml(error.message)}</a></li>`).join("")}
      </ul>
    </div>`;
}

function fieldError(name, errors = []) {
  const found = errors.find((error) => error.field === name);
  if (!found) return "";
  return `<span class="govuk-error-message" id="${escapeHtml(name)}-error" role="alert">Error: ${escapeHtml(found.message)}</span>`;
}

function hasError(name, errors = []) {
  return errors.some((error) => error.field === name);
}

function radioGroup({ name, legend, hint = "", errors = [], options }) {
  const hintId = `${name}-hint`;
  const errorId = `${name}-error`;
  const describedBy = [hint ? hintId : "", hasError(name, errors) ? errorId : ""].filter(Boolean).join(" ");
  const ariaInvalid = hasError(name, errors) ? ' aria-invalid="true"' : "";
  return `
    <div class="govuk-form-group ${hasError(name, errors) ? "govuk-form-group--error" : ""}" id="${escapeHtml(name)}">
      <fieldset class="govuk-fieldset"${describedBy ? ` aria-describedby="${escapeHtml(describedBy)}"` : ""}${ariaInvalid}>
        <legend class="govuk-fieldset__legend govuk-fieldset__legend--l">${escapeHtml(legend)}</legend>
        ${hint ? `<div id="${hintId}" class="govuk-hint">${escapeHtml(hint)}</div>` : ""}
        ${fieldError(name, errors)}
        <div class="govuk-radios">
          ${options.map(([rawValue, label]) => {
            const id = `${name}-${rawValue}`;
            return `
              <div class="govuk-radios__item">
                <input class="govuk-radios__input" id="${escapeHtml(id)}" name="${escapeHtml(name)}" type="radio" value="${escapeHtml(rawValue)}"${checked(name, rawValue)}>
                <label class="govuk-radios__label" for="${escapeHtml(id)}">${escapeHtml(label)}</label>
              </div>`;
          }).join("")}
        </div>
      </fieldset>
    </div>`;
}

function textInput({ name, label, hint = "", type = "text", autocomplete = "", width = "", errors = [], optional = false, datalist = null }) {
  const errorId = `${name}-error`;
  const hintId = `${name}-hint`;
  const describedBy = [hint ? hintId : "", hasError(name, errors) ? errorId : ""].filter(Boolean).join(" ");
  const ariaInvalid = hasError(name, errors) ? ' aria-invalid="true"' : "";
  const datalistAttr = datalist ? ` list="${escapeHtml(name)}-list"` : "";
  const datalistHtml = datalist ? `<datalist id="${escapeHtml(name)}-list">${datalist.map((opt) => `<option value="${escapeHtml(opt)}">`).join("")}</datalist>` : "";
  return `
    <div class="govuk-form-group ${hasError(name, errors) ? "govuk-form-group--error" : ""}" id="${escapeHtml(name)}">
      <label class="govuk-label" for="${escapeHtml(name)}-input">${escapeHtml(label)}</label>
      ${hint ? `<div id="${hintId}" class="govuk-hint">${escapeHtml(hint)}</div>` : ""}
      ${fieldError(name, errors)}
      <input class="govuk-input ${escapeHtml(width)}" id="${escapeHtml(name)}-input" name="${escapeHtml(name)}" type="${escapeHtml(type)}" value="${value(name)}"${autocomplete ? ` autocomplete="${escapeHtml(autocomplete)}"` : ""}${optional ? " data-optional=\"true\"" : ""}${describedBy ? ` aria-describedby="${escapeHtml(describedBy)}"` : ""}${ariaInvalid}${datalistAttr}>
      ${datalistHtml}
    </div>`;
}

function textareaInput({ name, label, hint = "", errors = [] }) {
  const errorId = `${name}-error`;
  const hintId = `${name}-hint`;
  const describedBy = [hint ? hintId : "", hasError(name, errors) ? errorId : ""].filter(Boolean).join(" ");
  const ariaInvalid = hasError(name, errors) ? ' aria-invalid="true"' : "";
  return `
    <div class="govuk-form-group ${hasError(name, errors) ? "govuk-form-group--error" : ""}" id="${escapeHtml(name)}">
      <label class="govuk-label" for="${escapeHtml(name)}-input">${escapeHtml(label)}</label>
      ${hint ? `<div id="${hintId}" class="govuk-hint">${escapeHtml(hint)}</div>` : ""}
      ${fieldError(name, errors)}
      <textarea class="govuk-textarea" id="${escapeHtml(name)}-input" name="${escapeHtml(name)}" rows="5"${describedBy ? ` aria-describedby="${escapeHtml(describedBy)}"` : ""}${ariaInvalid}>${value(name)}</textarea>
    </div>`;
}

function selectInput({ name, label, hint = "", labelClass = "", errors = [], options }) {
  const errorId = `${name}-error`;
  const hintId = `${name}-hint`;
  const describedBy = [hint ? hintId : "", hasError(name, errors) ? errorId : ""].filter(Boolean).join(" ");
  const ariaInvalid = hasError(name, errors) ? ' aria-invalid="true"' : "";
  return `
    <div class="govuk-form-group ${hasError(name, errors) ? "govuk-form-group--error" : ""}" id="${escapeHtml(name)}">
      <label class="govuk-label ${escapeHtml(labelClass)}" for="${escapeHtml(name)}-input">${escapeHtml(label)}</label>
      ${hint ? `<div id="${hintId}" class="govuk-hint">${escapeHtml(hint)}</div>` : ""}
      ${fieldError(name, errors)}
      <select class="govuk-select" id="${escapeHtml(name)}-input" name="${escapeHtml(name)}"${describedBy ? ` aria-describedby="${escapeHtml(describedBy)}"` : ""}${ariaInvalid}>
        <option value="">Select one</option>
        ${options.map((option) => `<option value="${escapeHtml(option)}"${selected(name, option)}>${escapeHtml(option)}</option>`).join("")}
      </select>
    </div>`;
}

function fileInput({ name, label, hint = "", errors = [] }) {
  const current = data[name] ? `<p class="govuk-body-s">Current demo file: ${escapeHtml(data[name])}</p>` : "";
  const errorId = `${name}-error`;
  const hintId = `${name}-hint`;
  const describedBy = [hint ? hintId : "", hasError(name, errors) ? errorId : ""].filter(Boolean).join(" ");
  const ariaInvalid = hasError(name, errors) ? ' aria-invalid="true"' : "";
  return `
    <div class="govuk-form-group ${hasError(name, errors) ? "govuk-form-group--error" : ""}" id="${escapeHtml(name)}">
      <label class="govuk-label" for="${escapeHtml(name)}-input">${escapeHtml(label)}</label>
      ${hint ? `<div id="${hintId}" class="govuk-hint">${escapeHtml(hint)}</div>` : ""}
      ${fieldError(name, errors)}
      <input class="govuk-input" id="${escapeHtml(name)}-input" name="${escapeHtml(name)}" type="file" accept="image/*"${describedBy ? ` aria-describedby="${escapeHtml(describedBy)}"` : ""}${ariaInvalid}>
      ${current}
    </div>`;
}

function checkboxInput({ name, label, errors = [], optional = false }) {
  const inputId = `${name}-input`;
  const errorId = `${name}-error`;
  const ariaInvalid = hasError(name, errors) ? ' aria-invalid="true"' : "";
  return `
    <div class="govuk-form-group ${hasError(name, errors) ? "govuk-form-group--error" : ""}" id="${escapeHtml(name)}">
      ${fieldError(name, errors)}
      <div class="govuk-checkboxes">
        <div class="govuk-checkboxes__item">
          <input class="govuk-checkboxes__input" id="${escapeHtml(inputId)}" name="${escapeHtml(name)}" type="checkbox" value="yes"${data[name] === "yes" ? " checked" : ""}${optional ? " data-optional=\"true\"" : ""}${hasError(name, errors) ? ` aria-describedby="${escapeHtml(errorId)}"${ariaInvalid}` : ""}>
          <label class="govuk-checkboxes__label" for="${escapeHtml(inputId)}">${escapeHtml(label)}</label>
        </div>
      </div>
    </div>`;
}

function dateInput({ name, legend, hint = "", errors = [], monthYear = false }) {
  const fields = monthYear ? [["month", "Month", "govuk-input--width-2"], ["year", "Year", "govuk-input--width-4"]] : [["day", "Day", "govuk-input--width-2"], ["month", "Month", "govuk-input--width-2"], ["year", "Year", "govuk-input--width-4"]];
  const hintId = `${name}-hint`;
  const errorId = `${name}-error`;
  const describedBy = [hint ? hintId : "", hasError(name, errors) ? errorId : ""].filter(Boolean).join(" ");
  const ariaInvalid = hasError(name, errors) ? ' aria-invalid="true"' : "";
  return `
    <div class="govuk-form-group ${hasError(name, errors) ? "govuk-form-group--error" : ""}" id="${escapeHtml(name)}">
      <fieldset class="govuk-fieldset"${describedBy ? ` aria-describedby="${escapeHtml(describedBy)}"` : ""}${ariaInvalid}>
        <legend class="govuk-fieldset__legend govuk-fieldset__legend--l">${escapeHtml(legend)}</legend>
        ${hint ? `<div id="${hintId}" class="govuk-hint">${escapeHtml(hint)}</div>` : ""}
        ${fieldError(name, errors)}
        <div class="date-input-group">
          ${fields.map(([part, label, width]) => {
            const fieldName = `${name}_${part}`;
            return `
              <div class="govuk-form-group">
                <label class="govuk-label" for="${escapeHtml(fieldName)}">${escapeHtml(label)}</label>
                <input class="govuk-input ${width}" id="${escapeHtml(fieldName)}" name="${escapeHtml(fieldName)}" inputmode="numeric" value="${value(fieldName)}">
              </div>`;
          }).join("")}
        </div>
      </fieldset>
    </div>`;
}

function revealBlock(controlName, expectedValue, html) {
  return `<div class="conditional-panel" data-reveal-for="${escapeHtml(controlName)}" data-reveal-value="${escapeHtml(expectedValue)}">${html}</div>`;
}

function continueButton(text = "Continue") {
  return `<button class="govuk-button" type="submit">${escapeHtml(text)}</button>`;
}

function formValue(form, name) {
  const field = form.elements[name];
  if (!field) return "";
  if (typeof RadioNodeList !== "undefined" && field instanceof RadioNodeList) return field.value || "";
  if (!field.type && typeof field.value !== "undefined") return field.value || "";
  if (field.type === "checkbox") return field.checked ? field.value : "";
  if (field.type === "file") return field.files?.[0]?.name || data[name] || "";
  return field.value?.trim() || "";
}

function validateRequiredValue(form, name, message) {
  return formValue(form, name) ? [] : [{ field: name, message }];
}

function validateRequiredChoice(form, name, message) {
  return formValue(form, name) ? [] : [{ field: name, message }];
}

function validateRequiredCheckbox(form, name, message) {
  return formValue(form, name) === "yes" ? [] : [{ field: name, message }];
}

function validateRequiredDate(form, name, message, monthYear = false) {
  const parts = monthYear ? ["month", "year"] : ["day", "month", "year"];
  const values = parts.map((part) => formValue(form, `${name}_${part}`));
  if (values.some((part) => !part)) return [{ field: name, message }];
  if (values.some((part) => !/^\d{1,4}$/.test(part))) return [{ field: name, message: "Date must only include numbers" }];
  return [];
}

function collectFormData(form) {
  const fields = form.querySelectorAll("input, select, textarea");
  fields.forEach((field) => {
    if (!field.name) return;
    if (field.type === "radio") {
      if (field.checked) data[field.name] = field.value;
      return;
    }
    if (field.type === "checkbox") {
      data[field.name] = field.checked ? field.value : "";
      return;
    }
    if (field.type === "file") {
      if (field.files && field.files[0]) data[field.name] = field.files[0].name;
      return;
    }
    data[field.name] = field.value.trim();
  });
  saveState();
}

function getNextRoute(route) {
  return routes[route]?.next ? routes[route].next() : "service-start";
}

function buildFlow() {
  const flow = [];
  let route = "service-start";
  for (let i = 0; i < 60 && route; i += 1) {
    flow.push(route);
    if (route === "confirmation") break;
    route = getNextRoute(route);
  }
  return flow;
}

function previousRoute(route) {
  const flow = buildFlow();
  const index = flow.indexOf(route);
  if (index > 0) return flow[index - 1];
  return "service-start";
}

function needsIdentityReferee() {
  return data.previous_passport === "no" || data.applicant_type === "child" || data.passport_status === "lost" || data.passport_status === "stolen";
}

function feeAmount() {
  if (data.applicant_type === "child") return "£61.50";
  if (data.applying_from === "outside_uk") return "Overseas fee calculated by country";
  return "£94.50";
}

function formatDate(name, monthYear = false) {
  const day = data[`${name}_day`];
  const month = data[`${name}_month`];
  const year = data[`${name}_year`];
  if (monthYear) return [month, year].filter(Boolean).join(" / ") || "Not provided";
  return [day, month, year].filter(Boolean).join(" / ") || "Not provided";
}

function multiline(...parts) {
  return parts.filter(Boolean).map(escapeHtml).join("<br>");
}

function summaryRow(key, valueHtml, route) {
  return `
    <div class="summary-list__row">
      <dt class="summary-list__key">${escapeHtml(key)}</dt>
      <dd class="summary-list__value">${valueHtml || "Not provided"}</dd>
      <dd class="summary-list__actions"><a href="#${escapeHtml(route)}">Change<span class="hidden"> ${escapeHtml(key)}</span></a></dd>
    </div>`;
}

function summaryHtml() {
  const rows = [
    summaryRow("Applying from", escapeHtml(labelFor("applying_from", data.applying_from)), "applying-from"),
    data.applying_from === "outside_uk" ? summaryRow("Country", escapeHtml(data.overseas_country || ""), "overseas-country") : "",
    summaryRow("Applicant", escapeHtml(labelFor("applicant_type", data.applicant_type)), "applicant-type"),
    summaryRow("Previous passport", escapeHtml(labelFor("previous_passport", data.previous_passport)), "previous-passport"),
    data.previous_passport === "yes" ? summaryRow("Passport status", escapeHtml(labelFor("passport_status", data.passport_status)), "passport-status") : "",
    data.previous_passport === "yes" ? summaryRow("Old passport number", escapeHtml(data.old_passport_number || ""), "passport-details") : "",
    summaryRow("Email", escapeHtml(data.email || ""), "email"),
    summaryRow("Photo", escapeHtml(data.photo_option === "code" ? `Code ${data.photo_code || ""}` : data.photo_file ? `Uploaded ${data.photo_file}` : labelFor("photo_option", data.photo_option)), "photo-option"),
    summaryRow("Full name", multiline(labelFor("title", data.title), data.first_names, data.last_name), "full-name"),
    summaryRow("Changed name", escapeHtml(labelFor("changed_name", data.changed_name)), "name-change"),
    summaryRow("Sex", escapeHtml(labelFor("sex", data.sex)), "sex"),
    summaryRow("Date of birth", escapeHtml(formatDate("birth_date")), "date-of-birth"),
    summaryRow("Place of birth", multiline(data.birth_town, data.birth_country), "birth-place"),
    summaryRow("British nationality", escapeHtml(labelFor("british_nationality", data.british_nationality)), "nationality"),
    summaryRow("Other passports", data.other_passports === "yes" ? escapeHtml(data.other_passports_details || "Yes") : escapeHtml(labelFor("other_passports", data.other_passports)), "other-passports"),
    summaryRow("Phone number", escapeHtml(data.phone || ""), "contact-details"),
    summaryRow("Home address", multiline(data.address_line_1, data.address_line_2, data.town_city, data.postcode), "address"),
    summaryRow("Delivery", escapeHtml(labelFor("delivery_option", data.delivery_option)), "delivery"),
    needsIdentityReferee() ? summaryRow("Identity confirmation", escapeHtml(labelFor("identity_referee", data.identity_referee)), "identity-referee") : "",
    summaryRow("Fee", escapeHtml(feeAmount()), "payment-choice")
  ].filter(Boolean);

  return `<dl class="summary-list">${rows.join("")}</dl>`;
}

function confirmationContent() {
  if (!data.demo_reference) {
    data.demo_reference = `PEX-${Math.floor(100000 + Math.random() * 900000)}`;
    saveState();
  }
  return `
    <div class="panel-confirmation">
      <h1 class="govuk-heading-l">Demo application complete</h1>
      <p>Your reference number</p>
      <strong>${escapeHtml(data.demo_reference)}</strong>
    </div>
    <p class="govuk-body">This is the end of the local prototype. No application has been submitted and no payment has been taken.</p>
    <h2 class="govuk-heading-m">What happens next in the real service</h2>
    <ul class="govuk-list govuk-list--bullet">
      <li>You would receive an email with instructions.</li>
      <li>You would send any required documents to HM Passport Office.</li>
      <li>You would track the application using the official service.</li>
    </ul>
    <div class="button-group">
      <a class="govuk-button" href="#start">Return to start</a>
      <button class="govuk-button govuk-button--secondary" type="button" data-clear>Clear demo data</button>
    </div>`;
}

function bindCommonEvents() {
  document.querySelectorAll("[data-cookie-choice]").forEach((button) => {
    button.addEventListener("click", () => {
      const choice = button.dataset.cookieChoice;
      sessionStorage.setItem("govuk-passport-demo-cookies", choice);
      const banner = document.querySelector(".cookie-banner");
      if (banner) {
        banner.innerHTML = `
          <div class="govuk-width-container">
            <p class="govuk-body">
              You've ${choice === "accept" ? "accepted" : "rejected"} analytics cookies. <a href="#start">Change your cookie settings</a>.
            </p>
          </div>`;
      }
    });
  });

  document.querySelectorAll("[data-clear]").forEach((button) => {
    button.addEventListener("click", () => {
      clearState();
      window.location.hash = "service-start";
    });
  });
}

function bindServiceEvents(route) {
  const form = document.querySelector(`form[data-route="${route}"]`);
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      collectFormData(form);
      const errors = routes[route]?.validate ? routes[route].validate(form) : [];
      if (errors.length) {
        renderService(route, errors);
        return;
      }
      window.location.hash = getNextRoute(route);
    });

    bindLiveErrorClearing(form);
  }

  document.querySelectorAll("[data-back]").forEach((button) => {
    button.addEventListener("click", () => {
      window.location.hash = previousRoute(route);
    });
  });

  bindRevealPanels();
}

// Clear inline errors and the matching error-summary entry as soon as the user
// edits a previously-invalid field, so the page does not show a stale red
// state after the user has corrected their mistake.
function bindLiveErrorClearing(form) {
  const handler = (event) => {
    const target = event.target;
    if (!target || !target.name) return;
    const baseName = target.name.replace(/_(?:day|month|year)$/, "");
    const group = form.querySelector(`#${CSS.escape(baseName)}`);
    if (!group || !group.classList.contains("govuk-form-group--error")) return;

    group.classList.remove("govuk-form-group--error");
    const fieldset = group.querySelector(".govuk-fieldset");
    if (fieldset) fieldset.removeAttribute("aria-invalid");
    group.querySelectorAll("[aria-invalid='true']").forEach((el) => el.removeAttribute("aria-invalid"));
    const inlineError = group.querySelector(".govuk-error-message");
    if (inlineError) inlineError.remove();

    const summary = form.querySelector(".govuk-error-summary");
    if (summary) {
      const link = summary.querySelector(`a[href="#${CSS.escape(baseName)}-input"]`);
      if (link) {
        const item = link.closest("li");
        if (item) item.remove();
      }
      if (!summary.querySelector("li")) summary.remove();
    }
  };
  form.addEventListener("input", handler);
  form.addEventListener("change", handler);
}

function bindRevealPanels() {
  const panels = Array.from(document.querySelectorAll("[data-reveal-for]"));
  if (!panels.length) return;

  function updatePanels() {
    panels.forEach((panel) => {
      const controlName = panel.dataset.revealFor;
      const expected = panel.dataset.revealValue;
      const checkedControl = document.querySelector(`[name="${CSS.escape(controlName)}"]:checked`);
      const current = checkedControl ? checkedControl.value : data[controlName];
      panel.classList.toggle("hidden", current !== expected);
    });
  }

  document.addEventListener("change", (event) => {
    if (event.target.matches("input[type='radio']")) updatePanels();
  }, { once: true });

  panels.forEach((panel) => {
    const controlName = panel.dataset.revealFor;
    document.querySelectorAll(`[name="${CSS.escape(controlName)}"]`).forEach((input) => {
      input.addEventListener("change", updatePanels);
    });
  });

  updatePanels();
}

function currentRoute() {
  return (window.location.hash || "#start").replace(/^#\/?/, "") || "start";
}

function render() {
  const route = currentRoute();
  if (route === "start") {
    renderStart();
    return;
  }
  if (route in routes) {
    renderService(route);
    return;
  }
  renderStart();
}

window.addEventListener("hashchange", render);
render();
