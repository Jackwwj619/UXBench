const PAGE_CONFIG = {
  hosted: {
    title: "Hosted quickstart",
    shortTitle: "Hosted",
    path: "index.html",
    badge: "Stripe-hosted page",
    officialUrl:
      "https://docs.stripe.com/payments/accept-a-payment?payment-ui=checkout&ui=stripe-hosted",
  },
  embedded: {
    title: "Embedded payment form",
    shortTitle: "Embedded",
    path: "embedded.html",
    badge: "Embedded form",
    officialUrl:
      "https://docs.stripe.com/payments/accept-a-payment?payment-ui=checkout&ui=embedded-page",
  },
  customization: {
    title: "Customize Checkout",
    shortTitle: "Customization",
    path: "customization.html",
    badge: "Customization",
    officialUrl: "https://docs.stripe.com/payments/checkout/customization",
  },
};

const OFFICIAL_LINKS = [
  {
    title: "Checkout overview",
    href: "https://docs.stripe.com/payments/checkout",
    description: "Compare hosted and embedded Checkout flows.",
  },
  {
    title: "Webhook quickstart",
    href: "https://docs.stripe.com/webhooks/quickstart",
    description: "Handle post-payment events reliably.",
  },
  {
    title: "Testing cards",
    href: "https://docs.stripe.com/testing",
    description: "Use Stripe's current test numbers and flows.",
  },
  {
    title: "Branding settings",
    href: "https://dashboard.stripe.com/settings/branding/checkout",
    description: "Manage Checkout branding in the Dashboard.",
  },
];

const GLOBAL_SEARCH_ITEMS = [
  {
    title: "Hosted quickstart",
    href: "index.html",
    tag: "Local",
    keywords: "hosted quickstart redirect success_url webhook stripe checkout session",
  },
  {
    title: "Embedded payment form",
    href: "embedded.html",
    tag: "Local",
    keywords:
      "embedded form ui_mode embedded_page client_secret return_url createEmbeddedCheckoutPage",
  },
  {
    title: "Customize Checkout",
    href: "customization.html",
    tag: "Local",
    keywords:
      "branding_settings card brands policies custom domain product images terms checkout",
  },
  {
    title: "Stripe Checkout overview",
    href: "https://docs.stripe.com/payments/checkout",
    tag: "Official",
    external: true,
    keywords: "overview payment ui hosted embedded checkout",
  },
  {
    title: "Hosted quickstart source",
    href: PAGE_CONFIG.hosted.officialUrl,
    tag: "Official",
    external: true,
    keywords: "official hosted quickstart redirect session url",
  },
  {
    title: "Embedded quickstart source",
    href: PAGE_CONFIG.embedded.officialUrl,
    tag: "Official",
    external: true,
    keywords:
      "official embedded quickstart ui_mode embedded_page client_secret return_url",
  },
  {
    title: "Checkout customization source",
    href: PAGE_CONFIG.customization.officialUrl,
    tag: "Official",
    external: true,
    keywords: "official customization appearance policies card brands custom domains",
  },
  {
    title: "Webhook quickstart",
    href: "https://docs.stripe.com/webhooks/quickstart",
    tag: "Official",
    external: true,
    keywords: "webhook fulfillment checkout.session.completed async payment events",
  },
  {
    title: "Checkout testing guide",
    href: "https://docs.stripe.com/testing",
    tag: "Official",
    external: true,
    keywords: "testing cards 3ds declines wallets redirects",
  },
];

const PREVIEW_THEMES = {
  default: {
    label: "Default",
    background: "#ffffff",
    surface: "#ffffff",
    border: "#dfe3f1",
    accent: "#635bff",
    accentSoft: "#ecebff",
    text: "#1a1f36",
    muted: "#697386",
    font: "Inter",
    radius: "14px",
  },
  slate: {
    label: "Slate",
    background: "#edf2ff",
    surface: "#13213d",
    border: "#273a63",
    accent: "#89a7ff",
    accentSoft: "#1d315f",
    text: "#f5f8ff",
    muted: "#b8c4e4",
    font: "Source Code Pro",
    radius: "10px",
  },
  earth: {
    label: "Earth",
    background: "#fff7ef",
    surface: "#fffdf9",
    border: "#eadbca",
    accent: "#c46b32",
    accentSoft: "#f7e5d7",
    text: "#3f2c1d",
    muted: "#7a6553",
    font: "Georgia",
    radius: "18px",
  },
  bright: {
    label: "Bright",
    background: "#f0fbff",
    surface: "#ffffff",
    border: "#b7e4ee",
    accent: "#0e7490",
    accentSoft: "#d9f4fb",
    text: "#083344",
    muted: "#4b6b76",
    font: "Trebuchet MS",
    radius: "999px",
  },
};

document.addEventListener("DOMContentLoaded", () => {
  renderShell();
  renderSearchDialog();
  initializeLanguageTabs();
  initializeCopyButtons();
  initializeFeedback();
  initializeToc();
  initializeSearch();
  initializeSidebar();
  initializePreviewButtons();
  initializeDemoTabs();
});

function currentPageId() {
  return document.body.dataset.page || "hosted";
}

function currentPageConfig() {
  return PAGE_CONFIG[currentPageId()] || PAGE_CONFIG.hosted;
}

function renderShell() {
  renderHeader();
  renderSidebar();
}

function renderHeader() {
  const target = document.querySelector("[data-site-header]");
  if (!target) {
    return;
  }

  const pageId = currentPageId();
  const navItems = Object.entries(PAGE_CONFIG)
    .map(([id, config]) => {
      const active = id === pageId ? " active" : "";
      return `<a class="nav-link${active}" href="${config.path}">${config.shortTitle}</a>`;
    })
    .join("");

  target.innerHTML = `
    <header class="top-nav">
      <div class="nav-left">
        <a class="logo" href="index.html" aria-label="Stripe docs clone home">
          <span class="logo-mark">stripe</span>
          <span class="logo-divider"></span>
          <span class="logo-copy">Docs clone</span>
        </a>
        <nav class="main-nav" aria-label="Primary">
          ${navItems}
          <a class="nav-link nav-link-external" href="https://docs.stripe.com/payments/checkout" target="_blank" rel="noopener noreferrer">Official docs</a>
        </nav>
      </div>
      <div class="nav-right">
        <button type="button" class="search-box" data-open-search aria-haspopup="dialog" aria-controls="search-dialog" aria-label="Open search (press /)">
          <span class="search-label">Search…</span>
          <kbd class="search-shortcut">/</kbd>
        </button>
        <a class="btn-nav" href="https://dashboard.stripe.com/settings/branding/checkout" target="_blank" rel="noopener noreferrer">Branding</a>
        <a class="btn-primary-nav" href="${currentPageConfig().officialUrl}" target="_blank" rel="noopener noreferrer">Open source</a>
        <button type="button" class="menu-toggle" data-toggle-sidebar aria-label="Open navigation">Menu</button>
      </div>
    </header>
  `;
}

function renderSidebar() {
  const target = document.querySelector("[data-site-sidebar]");
  if (!target) {
    return;
  }

  const pageId = currentPageId();
  const localItems = Object.entries(PAGE_CONFIG)
    .map(([id, config]) => {
      const active = id === pageId ? " active" : "";
      return `<a class="sidebar-link${active}" href="${config.path}">${config.title}</a>`;
    })
    .join("");

  const externalItems = OFFICIAL_LINKS.map(
    (item) =>
      `<a class="sidebar-link sidebar-link-external external-link-icon" href="${item.href}" target="_blank" rel="noopener noreferrer">
        <span>${item.title}</span>
        <small>${item.description}</small>
      </a>`
  ).join("");

  target.innerHTML = `
    <div class="sidebar-inner">
      <div class="sidebar-mobile-header">
        <strong>Navigate</strong>
        <button type="button" class="sidebar-close" data-close-sidebar aria-label="Close navigation">Close</button>
      </div>
      <div class="sidebar-section">
        <div class="sidebar-heading">Local rebuild</div>
        ${localItems}
      </div>
      <div class="sidebar-section">
        <div class="sidebar-heading">Official references</div>
        ${externalItems}
      </div>
      <div class="sidebar-section sidebar-callout">
        <div class="sidebar-heading">Why this clone exists</div>
        <p>Every visible control is wired up, and every source link points to the live Stripe docs or Dashboard.</p>
      </div>
    </div>
  `;
}

function renderSearchDialog() {
  const root = document.querySelector("[data-search-root]");
  if (!root) {
    return;
  }

  root.innerHTML = `
    <div class="search-dialog" id="search-dialog" hidden>
      <button type="button" class="search-backdrop" data-close-search aria-label="Close search"></button>
      <div class="search-panel" role="dialog" aria-modal="true" aria-labelledby="search-title">
        <div class="search-panel-header">
          <div>
            <div class="search-panel-title" id="search-title">Search this Stripe docs rebuild</div>
            <div class="search-panel-subtitle">Type a page, API concept, or section name.</div>
          </div>
          <button type="button" class="search-close" data-close-search>Close</button>
        </div>
        <label class="search-input-wrap" for="search-input">
          <span>Search</span>
          <input id="search-input" type="text" autocomplete="off" spellcheck="false" placeholder="Try: embedded_page, webhooks, branding_settings">
        </label>
        <div class="search-results" data-search-results></div>
      </div>
    </div>
  `;
}

function initializeLanguageTabs() {
  const selectors = document.querySelectorAll(".lang-selector");
  if (!selectors.length) {
    return;
  }

  const savedLang = localStorage.getItem("stripe-docs:selected-language");

  selectors.forEach((selector) => {
    const group = selector.dataset.langGroup;
    const tabs = Array.from(selector.querySelectorAll(".lang-tab"));
    const blocks = Array.from(
      document.querySelectorAll(`.code-block[data-lang-group="${group}"]`)
    );

    if (!tabs.length || !blocks.length) {
      return;
    }

    const availableLanguages = new Set(blocks.map((block) => block.dataset.lang));
    const initialTab =
      (savedLang && availableLanguages.has(savedLang) && savedLang) ||
      tabs.find((tab) => availableLanguages.has(tab.dataset.lang))?.dataset.lang ||
      tabs[0].dataset.lang;

    const applyLanguage = (language, options = {}) => {
      tabs.forEach((tab) => {
        const isActive = tab.dataset.lang === language;
        tab.classList.toggle("active", isActive);
        tab.setAttribute("aria-pressed", isActive ? "true" : "false");
      });

      blocks.forEach((block) => {
        block.classList.toggle("is-hidden", block.dataset.lang !== language);

        let indicator = block.querySelector(".active-lang-indicator");
        if (block.dataset.lang === language) {
          if (!indicator) {
            indicator = document.createElement("div");
            indicator.className = "active-lang-indicator";
            const header = block.querySelector(".code-header");
            if (header) {
              header.insertAdjacentElement("afterend", indicator);
            }
          }
          indicator.textContent = `Showing ${language.charAt(0).toUpperCase() + language.slice(1)}`;
        } else if (indicator) {
          indicator.remove();
        }
      });

      localStorage.setItem("stripe-docs:selected-language", language);

      if (options.scrollToActive) {
        const visibleBlock = blocks.find(
          (block) => block.dataset.lang === language && !block.classList.contains("is-hidden")
        );
        if (visibleBlock) {
          window.requestAnimationFrame(() => {
            visibleBlock.scrollIntoView({ behavior: "smooth", block: "center" });
          });
        }
      }
    };

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => applyLanguage(tab.dataset.lang, { scrollToActive: true }));
    });

    applyLanguage(initialTab);
  });
}

function initializeCopyButtons() {
  const buttons = document.querySelectorAll(".copy-btn");
  buttons.forEach((button) => {
    button.addEventListener("click", async () => {
      const sourceId = button.dataset.copyFrom;
      const sourceNode = sourceId
        ? document.getElementById(sourceId)
        : button.closest(".code-block")?.querySelector("code");

      const text = sourceNode ? sourceNode.textContent.trim() : "";
      if (!text) {
        showToast("Nothing to copy from this block yet.");
        return;
      }

      const copied = await copyText(text);
      if (!copied) {
        const sourceElement = sourceNode || button.closest(".code-block")?.querySelector("code");
        if (sourceElement) {
          const selection = window.getSelection();
          const range = document.createRange();
          range.selectNodeContents(sourceElement);
          selection.removeAllRanges();
          selection.addRange(range);
        }
        showToast("Copy failed. Press Ctrl+C to copy the selected code.");
        return;
      }

      const original = button.textContent;
      button.textContent = "Copied";
      button.classList.add("copied");
      showToast("Code copied to clipboard.");

      window.setTimeout(() => {
        button.textContent = original;
        button.classList.remove("copied");
      }, 1800);
    });
  });
}

async function copyText(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (error) {
    // Fall through to the textarea fallback.
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();

  try {
    return document.execCommand("copy");
  } catch (error) {
    return false;
  } finally {
    textarea.remove();
  }
}

function initializeFeedback() {
  const feedbackGroups = document.querySelectorAll(".footer-feedback");
  feedbackGroups.forEach((group) => {
    const buttons = Array.from(group.querySelectorAll(".feedback-btn"));
    const storageKey = `stripe-docs:feedback:${currentPageId()}`;
    const storedValue = localStorage.getItem(storageKey);

    const applyValue = (value) => {
      buttons.forEach((button) => {
        button.classList.toggle("selected", button.dataset.value === value);
      });
    };

    if (storedValue) {
      applyValue(storedValue);
    }

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        localStorage.setItem(storageKey, button.dataset.value);
        applyValue(button.dataset.value);
        showToast("Feedback saved locally for this page.");
      });
    });
  });
}

function initializeToc() {
  const links = Array.from(document.querySelectorAll(".toc-link"));
  const sections = Array.from(document.querySelectorAll(".step[id]"));

  if (!links.length || !sections.length) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

      if (!visible) {
        return;
      }

      const activeId = visible.target.id;
      links.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${activeId}`);
      });
    },
    {
      rootMargin: "-35% 0px -50% 0px",
      threshold: [0.15, 0.35, 0.7],
    }
  );

  sections.forEach((section) => observer.observe(section));
}

function initializeSearch() {
  const dialog = document.getElementById("search-dialog");
  if (!dialog) {
    return;
  }

  const input = dialog.querySelector("#search-input");
  const results = dialog.querySelector("[data-search-results]");
  const openButtons = document.querySelectorAll("[data-open-search]");
  const closeButtons = dialog.querySelectorAll("[data-close-search]");

  const renderResults = (query) => {
    const normalized = query.trim().toLowerCase();
    const items = buildSearchItems()
      .filter((item) => {
        if (!normalized) {
          return true;
        }

        const haystack = `${item.title} ${item.keywords || ""} ${item.tag || ""}`.toLowerCase();
        return haystack.includes(normalized);
      })
      .slice(0, 12);

    if (!items.length) {
      results.innerHTML = `
        <div class="search-empty">
          <strong>No matches</strong>
          <p>Try a Stripe concept like <code>webhooks</code>, <code>embedded_page</code>, or <code>brands_blocked</code>.</p>
        </div>
      `;
      return;
    }

    results.innerHTML = items
      .map((item) => {
        const target = item.external ? ' target="_blank" rel="noreferrer"' : "";
        const meta = item.external ? "Official" : item.tag || "Local";
        return `
          <a class="search-result" href="${item.href}"${target}>
            <span class="search-result-meta">${meta}</span>
            <strong>${item.title}</strong>
            <span>${item.description || item.href}</span>
          </a>
        `;
      })
      .join("");
    results.scrollTop = 0;
  };

  const openDialog = () => {
    dialog.hidden = false;
    document.body.classList.add("search-open");
    renderResults(input.value);
    window.setTimeout(() => input.focus(), 0);
  };

  const closeDialog = () => {
    dialog.hidden = true;
    document.body.classList.remove("search-open");
  };

  openButtons.forEach((button) => {
    button.addEventListener("click", openDialog);
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", closeDialog);
  });

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      closeDialog();
    }
  });

  input.addEventListener("input", () => renderResults(input.value));

  input.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeDialog();
    }
  });

  dialog.addEventListener("click", (event) => {
    const result = event.target.closest(".search-result");
    if (result) {
      closeDialog();
    }
  });

  document.addEventListener("keydown", (event) => {
    const target = event.target;
    const tagName = target && target.tagName ? target.tagName.toLowerCase() : "";
    const isTypingField =
      tagName === "input" ||
      tagName === "textarea" ||
      target?.isContentEditable;

    if (event.key === "/" && !isTypingField) {
      event.preventDefault();
      openDialog();
    }

    if (event.key === "Escape" && !dialog.hidden) {
      closeDialog();
    }
  });

  renderResults("");
}

function buildSearchItems() {
  const localSections = Array.from(document.querySelectorAll(".step[id]")).map((section) => {
    const heading = section.querySelector("h2");
    return {
      title: heading ? heading.textContent.trim() : section.id,
      href: `${currentPageConfig().path}#${section.id}`,
      tag: "Section",
      description: `Jump to ${heading ? heading.textContent.trim() : section.id}`,
      keywords: section.dataset.searchKeywords || "",
    };
  });

  return [...GLOBAL_SEARCH_ITEMS, ...localSections];
}

function initializeSidebar() {
  const toggle = document.querySelector("[data-toggle-sidebar]");
  const sidebarLinks = document.querySelectorAll(".sidebar a");

  if (!toggle) {
    return;
  }

  const closeSidebar = () => document.body.classList.remove("sidebar-open");
  const openSidebar = () => document.body.classList.add("sidebar-open");

  let backdrop = document.querySelector(".sidebar-backdrop");
  if (!backdrop) {
    backdrop = document.createElement("div");
    backdrop.className = "sidebar-backdrop";
    backdrop.setAttribute("aria-hidden", "true");
    document.body.appendChild(backdrop);
  }
  backdrop.addEventListener("click", closeSidebar);

  toggle.addEventListener("click", () => {
    if (document.body.classList.contains("sidebar-open")) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });

  document.addEventListener("click", (event) => {
    const closeTarget = event.target.closest("[data-close-sidebar]");
    if (closeTarget) {
      event.preventDefault();
      closeSidebar();
    }
  });

  sidebarLinks.forEach((link) => {
    link.addEventListener("click", closeSidebar);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && document.body.classList.contains("sidebar-open")) {
      closeSidebar();
    }
  });
}

function initializePreviewButtons() {
  document.querySelectorAll(".preview-pay-btn, .preview-action").forEach((button) => {
    button.addEventListener("click", () => {
      const container = button.closest(".checkout-preview, .preview-panel");
      if (!container) {
        showToast("Preview only. Use the linked official docs for a live Stripe flow.");
        return;
      }

      let panel = container.querySelector(".preview-panel-reveal");
      if (panel) {
        panel.remove();
        return;
      }

      panel = document.createElement("div");
      panel.className = "preview-panel-reveal";
      panel.setAttribute("role", "status");
      panel.setAttribute("aria-live", "polite");

      const isHandoff = button.classList.contains("preview-pay-btn");
      if (isHandoff) {
        panel.innerHTML = `
          <strong>Demo only — not a live payment</strong>
          <p>In production, clicking this button would POST to your server, which creates a Checkout Session and redirects the customer to Stripe's hosted payment page. This preview shows what the handoff looks like, but no payment is processed here.</p>
          <p><a href="https://docs.stripe.com/payments/accept-a-payment?payment-ui=checkout&ui=stripe-hosted" target="_blank" rel="noreferrer">Open the official hosted quickstart to try the real flow.</a></p>
        `;
      } else {
        panel.innerHTML = `
          <strong>Demo only — no request is sent</strong>
          <p>In production, this button would submit a POST request to your <code>/create-checkout-session</code> endpoint. Your server creates the Session and returns a 303 redirect to <code>session.url</code>, sending the customer to Stripe's hosted Checkout page.</p>
          <p><a href="https://docs.stripe.com/payments/accept-a-payment?payment-ui=checkout&ui=stripe-hosted" target="_blank" rel="noreferrer">See the official hosted quickstart for the full integration.</a></p>
        `;
      }

      container.appendChild(panel);
      showToast("Preview only. Use the linked official docs for a live Stripe flow.");
    });
  });
}

function initializeDemoTabs() {
  document.querySelectorAll(".appearance-demo").forEach((demo) => {
    const tabs = demo.querySelectorAll(".demo-tab");
    const surface = demo.querySelector(".demo-surface");

    if (!tabs.length || !surface) {
      return;
    }

    const applyTheme = (themeName) => {
      const theme = PREVIEW_THEMES[themeName];
      if (!theme) {
        return;
      }

      tabs.forEach((tab) => {
        const isActive = tab.dataset.theme === themeName;
        tab.classList.toggle("active", isActive);
        tab.setAttribute("aria-pressed", isActive ? "true" : "false");
      });

      surface.style.setProperty("--demo-background", theme.background);
      surface.style.setProperty("--demo-surface", theme.surface);
      surface.style.setProperty("--demo-border", theme.border);
      surface.style.setProperty("--demo-accent", theme.accent);
      surface.style.setProperty("--demo-accent-soft", theme.accentSoft);
      surface.style.setProperty("--demo-text", theme.text);
      surface.style.setProperty("--demo-muted", theme.muted);
      surface.style.setProperty("--demo-radius", theme.radius);
      surface.style.setProperty("--demo-font", theme.font);

      demo.querySelectorAll("[data-demo-value]").forEach((valueNode) => {
        const key = valueNode.dataset.demoValue;
        if (key === "font") {
          valueNode.textContent = theme.font;
        } else if (key === "radius") {
          valueNode.textContent = theme.radius;
        } else if (theme[key]) {
          valueNode.textContent = theme[key];
        }
      });

      demo.querySelectorAll("[data-demo-swatch]").forEach((swatch) => {
        const key = swatch.dataset.demoSwatch;
        if (theme[key]) {
          swatch.style.background = theme[key];
        }
      });
    };

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => applyTheme(tab.dataset.theme));
    });

    applyTheme(tabs[0].dataset.theme);
  });
}

function showToast(message) {
  let toast = document.querySelector(".toast");

  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("visible");

  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.remove("visible");
  }, 2200);
}
