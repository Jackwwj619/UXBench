const qs = (selector, root = document) => root.querySelector(selector);
const qsa = (selector, root = document) => Array.from(root.querySelectorAll(selector));

const categoryMeta = {
  search: { label: "Search", color: "blue", icon: "S", section: "activity" },
  browsing: { label: "Browsing", color: "green", icon: "B", section: "activity" },
  location: { label: "Location", color: "red", icon: "L", section: "devices" },
  voice: { label: "Voice", color: "yellow", icon: "V", section: "activity" },
  media: { label: "Media", color: "purple", icon: "M", section: "controls" },
  apps: { label: "Apps", color: "green", icon: "A", section: "apps" }
};

let activityItems = [
  { id: 1, type: "search", title: "Searched for privacy dashboard settings", service: "Search", detail: "Query and clicked result saved for personalization.", device: "Surface Laptop", location: "Seattle, WA", daysAgo: 0, time: "Today, 9:42 AM" },
  { id: 2, type: "browsing", title: "Visited cloud storage sharing guide", service: "Browser", detail: "Page visit synced from desktop browser history.", device: "Surface Laptop", location: "Seattle, WA", daysAgo: 0, time: "Today, 8:18 AM" },
  { id: 3, type: "location", title: "Approximate location updated", service: "Maps", detail: "Location event from signed-in desktop session.", device: "Surface Laptop", location: "Seattle, WA", daysAgo: 1, time: "Yesterday, 6:05 PM" },
  { id: 4, type: "voice", title: "Voice assistant command transcript", service: "Assistant", detail: "Transcript saved. Audio recording is not retained.", device: "Pixel Phone", location: "Chicago, IL", daysAgo: 1, time: "Yesterday, 1:32 PM" },
  { id: 5, type: "media", title: "Watched productivity tutorial", service: "Video", detail: "Media topic saved for recommendations.", device: "Xbox Console", location: "Seattle, WA", daysAgo: 2, time: "May 9, 8:41 PM" },
  { id: 6, type: "apps", title: "Granted calendar permission to TaskFlow", service: "Connected app", detail: "App can read calendar and profile information.", device: "Web session", location: "New York, NY", daysAgo: 4, time: "May 7, 10:14 AM" },
  { id: 7, type: "search", title: "Searched for password manager comparison", service: "Search", detail: "Query and safe browsing context saved.", device: "Pixel Phone", location: "Chicago, IL", daysAgo: 5, time: "May 6, 7:22 PM" },
  { id: 8, type: "browsing", title: "Read account recovery article", service: "Browser", detail: "Browsing event synced to account history.", device: "Surface Laptop", location: "Seattle, WA", daysAgo: 8, time: "May 3, 3:19 PM" },
  { id: 9, type: "location", title: "Maps route preview", service: "Maps", detail: "Approximate route endpoints saved to location activity.", device: "Pixel Phone", location: "Chicago, IL", daysAgo: 12, time: "Apr 29, 5:40 PM" },
  { id: 10, type: "media", title: "Played focus playlist", service: "Music", detail: "Listening signal saved for recommendations.", device: "Office desktop", location: "New York, NY", daysAgo: 16, time: "Apr 25, 2:08 PM" },
  { id: 11, type: "apps", title: "Connected DesignBoard", service: "Connected app", detail: "App can read profile, files, and contacts.", device: "Web session", location: "Seattle, WA", daysAgo: 21, time: "Apr 20, 11:27 AM" },
  { id: 12, type: "voice", title: "Dictation transcript saved", service: "Assistant", detail: "Text transcript saved for recognition improvements.", device: "Surface Laptop", location: "Seattle, WA", daysAgo: 27, time: "Apr 14, 4:16 PM" }
];

let connectedApps = [
  { id: "taskflow", name: "TaskFlow", vendor: "TaskFlow Labs", initial: "T", lastUsed: "Today", risk: "Broad access", permissions: ["Profile", "Calendar", "Files"], color: "linear-gradient(135deg, #2563eb, #05a6f0)" },
  { id: "designboard", name: "DesignBoard", vendor: "Northstar Design", initial: "D", lastUsed: "7 days ago", risk: "Broad access", permissions: ["Profile", "Files", "Contacts"], color: "linear-gradient(135deg, #7459d9, #9f7aea)" },
  { id: "notebook", name: "Notebook Sync", vendor: "Contoso", initial: "N", lastUsed: "Yesterday", risk: "Standard", permissions: ["Profile", "Notes"], color: "linear-gradient(135deg, #168a4a, #81bc06)" },
  { id: "weather", name: "Weather Tile", vendor: "Blue Ridge Apps", initial: "W", lastUsed: "3 days ago", risk: "Limited", permissions: ["Location"], color: "linear-gradient(135deg, #0f8b8d, #3fb8ba)" },
  { id: "fitness", name: "Fitness Link", vendor: "Metro Health", initial: "F", lastUsed: "12 days ago", risk: "Standard", permissions: ["Profile", "Activity"], color: "linear-gradient(135deg, #c83f3d, #f35325)" },
  { id: "reader", name: "Reader Companion", vendor: "Page Studio", initial: "R", lastUsed: "Last month", risk: "Limited", permissions: ["Profile"], color: "linear-gradient(135deg, #b77905, #ffba08)" },
  { id: "slides", name: "Slide Maker", vendor: "Deckhouse", initial: "S", lastUsed: "42 days ago", risk: "Standard", permissions: ["Profile", "Files"], color: "linear-gradient(135deg, #1d4ed8, #168a4a)" }
];

const devices = [
  { id: "surface", name: "Surface Laptop 6", type: "Windows", location: "Seattle, WA", activity: "Active 12 minutes ago", browser: "Edge", status: "Trusted" },
  { id: "pixel", name: "Pixel Phone", type: "Android", location: "Chicago, IL", activity: "Active yesterday", browser: "Chrome", status: "Location paused" },
  { id: "xbox", name: "Xbox Console", type: "Console", location: "Seattle, WA", activity: "Active 2 days ago", browser: "Media apps", status: "Trusted" },
  { id: "office", name: "Office desktop", type: "Windows", location: "New York, NY", activity: "Last sync 42 days ago", browser: "Chrome", status: "Review" }
];

let interests = ["Project management", "Cloud storage", "Travel", "Design tools", "Security", "Productivity"];
let selectedActivities = new Set();
let currentSection = "overview";
let checkupIndex = 0;
let pendingConfirmAction = null;
let exportTimer = null;
let toastTimer = null;

const checkupSteps = [
  {
    title: "Review activity saving",
    body: `
      <div class="checkup-card">
        <p>Choose which activity controls can keep saving future sample data.</p>
        <div class="checkup-option"><div><strong id="chk-web-label">Web & app activity</strong><p>Searches, app interactions, and browsing context.</p></div><button class="toggle active" aria-pressed="true" aria-labelledby="chk-web-label"><span></span><span class="toggle-state">On</span></button></div>
        <div class="checkup-option"><div><strong id="chk-location-label">Location history</strong><p>Approximate places from signed-in devices.</p></div><button class="toggle" aria-pressed="false" aria-labelledby="chk-location-label"><span></span><span class="toggle-state">Off</span></button></div>
        <div class="checkup-option"><div><strong id="chk-voice-label">Voice transcripts</strong><p>Assistant commands and dictation text.</p></div><button class="toggle active" aria-pressed="true" aria-labelledby="chk-voice-label"><span></span><span class="toggle-state">On</span></button></div>
      </div>`
  },
  {
    title: "Limit ad personalization",
    body: `
      <div class="checkup-card">
        <p>Adjust the sample ad profile and sensitive topic limits.</p>
        <div class="checkup-option"><div><strong id="chk-ads-label">Personalized ads</strong><p>Use activity and interests to tune ad examples.</p></div><button class="toggle active" aria-pressed="true" aria-labelledby="chk-ads-label"><span></span><span class="toggle-state">On</span></button></div>
        <div class="checkup-option"><div><strong id="chk-sensitive-label">Limit sensitive topics</strong><p>Keep alcohol, dating, and gambling categories limited.</p></div><button class="toggle active" aria-pressed="true" aria-labelledby="chk-sensitive-label"><span></span><span class="toggle-state">On</span></button></div>
      </div>`
  },
  {
    title: "Review app permissions",
    body: `
      <div class="checkup-card">
        <p>Two connected apps can access broad sample account data.</p>
        <div class="checkup-option"><div><strong>TaskFlow</strong><p>Profile, calendar, and files.</p></div><button class="outline-button" data-checkup-jump="apps">Review</button></div>
        <div class="checkup-option"><div><strong>DesignBoard</strong><p>Profile, files, and contacts.</p></div><button class="outline-button" data-checkup-jump="apps">Review</button></div>
      </div>`
  },
  {
    title: "Prepare export",
    body: `
      <div class="checkup-card">
        <p>Create a portable sample archive before clearing older activity.</p>
        <div class="checkup-option"><div><strong>Recommended categories</strong><p>Search, browsing, location, app permissions, and ad settings.</p></div><button class="outline-button" data-checkup-jump="export">Configure</button></div>
      </div>`
  },
  {
    title: "Ready to finish",
    body: `
      <div class="checkup-card">
        <p>Your settings are ready. Finishing the checkup will mark recommendations complete and update the privacy score.</p>
        <div class="checkup-option"><div><strong>Estimated score after checkup</strong><p>92 with all recommendations acknowledged.</p></div><strong>92</strong></div>
      </div>`
  }
];

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));
}

let lastUndo = null;

function showToast(message, opts = {}) {
  const toast = qs("#toast");
  const { undo, duration = 2200 } = opts;
  toast.innerHTML = "";
  const text = document.createElement("span");
  text.className = "toast-text";
  text.textContent = message;
  toast.appendChild(text);
  if (typeof undo === "function") {
    const undoBtn = document.createElement("button");
    undoBtn.className = "toast-undo";
    undoBtn.type = "button";
    undoBtn.textContent = "Undo";
    undoBtn.addEventListener("click", () => {
      try { undo(); } catch (e) {}
      toast.classList.remove("show");
      lastUndo = null;
    });
    toast.appendChild(undoBtn);
    lastUndo = undo;
  } else {
    lastUndo = null;
  }
  toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.classList.remove("show");
    lastUndo = null;
  }, typeof undo === "function" ? Math.max(duration, 5000) : duration);
}

function setSection(sectionId) {
  const section = qs(`#${sectionId}`);
  if (!section) return;
  currentSection = sectionId;
  qsa(".page-section").forEach((item) => item.classList.toggle("active", item.id === sectionId));
  qsa("[data-section]").forEach((item) => item.classList.toggle("active", item.dataset.section === sectionId));
  qs("#pageTitle").textContent = section.dataset.title || "Privacy dashboard";
  qs("#pageSubtitle").textContent = section.dataset.subtitle || "";
  document.body.classList.remove("nav-open");
  if (sectionId === "apps") renderApps();
  if (sectionId === "activity") renderActivityList();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function categoryCount(type) {
  return activityItems.filter((item) => item.type === type).length;
}

function updateOverviewMetrics() {
  const weightedTotal = activityItems.length * 17 + selectedActivities.size;
  qs("#savedItemsValue").textContent = weightedTotal;

  const activeToggles = qsa("#controlsGrid .toggle.active").length;
  const allToggles = qsa("#controlsGrid .toggle").length;
  qs("#controlsActiveValue").textContent = `${activeToggles} of ${allToggles}`;

  const activeRetention = qs(".retention-options button.active");
  qs("#autoDeleteValue").textContent = activeRetention ? activeRetention.dataset.retention : "Off";
  qs("#appsValue").textContent = connectedApps.length;

  const broadCount = connectedApps.filter((app) => app.risk === "Broad access").length;
  const score = Math.max(52, Math.min(96, 82 - broadCount * 5 + (allToggles - activeToggles) * 2 - Math.max(0, activityItems.length - 10)));
  qs("#scoreRing").style.setProperty("--score", score);
  qs("#scoreValue").textContent = score;
  qs("#scoreStatus").textContent = score >= 90 ? "All recommendations reviewed" : `${Math.max(1, broadCount + 1)} recommendations open`;
}

function renderBars(range = "30d") {
  const multipliers = { "30d": 1, "90d": 1.55, "1y": 2.4 };
  const values = [
    categoryCount("search") * 10 + 34,
    categoryCount("browsing") * 11 + 28,
    categoryCount("location") * 12 + 22,
    categoryCount("voice") * 13 + 18,
    categoryCount("media") * 12 + 31,
    categoryCount("apps") * 15 + 24
  ].map((value) => Math.round(value * multipliers[range]));
  const max = Math.max(...values, 120);
  const colors = ["#2563eb", "#168a4a", "#c83f3d", "#b77905", "#7459d9", "#0f8b8d"];
  qs("#activityBars").innerHTML = values.map((value, index) => {
    const height = Math.max(18, (value / max) * 160);
    const x = 78 + index * 101;
    const y = 210 - height;
    return `
      <rect x="${x}" y="${y}" width="48" height="${height}" fill="${colors[index]}"></rect>
      <text x="${x + 24}" y="${y - 10}" text-anchor="middle" fill="#626a76" font-size="12">${value}</text>
    `;
  }).join("");
}

function renderRecentTimeline() {
  const timeline = qs("#recentTimeline");
  timeline.innerHTML = activityItems.slice(0, 5).map((item) => {
    const meta = categoryMeta[item.type];
    return `
      <div class="timeline-item">
        <span class="timeline-icon ${meta.color}">${meta.icon}</span>
        <div>
          <strong>${escapeHtml(item.title)}</strong>
          <small>${escapeHtml(item.service)} - ${escapeHtml(item.time)} - ${escapeHtml(item.device)}</small>
        </div>
        <button class="text-button" data-activity-details="${item.id}">Details</button>
      </div>
    `;
  }).join("");
}

function filterActivities() {
  const query = qs("#activitySearch").value.trim().toLowerCase();
  const category = qs("#categoryFilter").value;
  const date = qs("#dateFilter").value;
  const maxDays = { today: 0, week: 7, month: 30 }[date];
  return activityItems.filter((item) => {
    const matchesQuery = !query || `${item.title} ${item.service} ${item.detail} ${item.device} ${item.location}`.toLowerCase().includes(query);
    const matchesCategory = category === "all" || item.type === category;
    const matchesDate = date === "all" || item.daysAgo <= maxDays;
    return matchesQuery && matchesCategory && matchesDate;
  });
}

function renderActivityList() {
  const visible = filterActivities();
  const list = qs("#activityList");
  qs("#activityCount").textContent = `${visible.length} activity item${visible.length === 1 ? "" : "s"}`;
  qs("#activitySummary").textContent = visible.length === activityItems.length ? "Showing all sample activity." : "Showing filtered sample activity.";
  qs("#deleteSelected").disabled = selectedActivities.size === 0;
  qs("#selectAllVisible").textContent = visible.length && visible.every((item) => selectedActivities.has(item.id)) ? "Clear selection" : "Select all";

  if (!visible.length) {
    list.innerHTML = `<div class="empty-state"><strong>No activity found</strong><p>Try changing filters or clearing the search query.</p></div>`;
    return;
  }

  list.innerHTML = visible.map((item) => {
    const meta = categoryMeta[item.type];
    const checked = selectedActivities.has(item.id) ? "checked" : "";
    return `
      <article class="activity-row" data-activity-row="${item.id}">
        <input type="checkbox" ${checked} aria-label="Select ${escapeHtml(item.title)}" data-select-activity="${item.id}">
        <div>
          <span class="pill ${meta.color}">${meta.label}</span>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.service)} - ${escapeHtml(item.time)} - ${escapeHtml(item.device)}</p>
        </div>
        <div class="activity-actions">
          <button class="text-button" data-activity-details="${item.id}">Details</button>
          <button class="icon-button" data-delete-activity="${item.id}" aria-label="Delete ${escapeHtml(item.title)}">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 7h14"></path><path d="M9 7V5h6v2"></path><path d="M7 7l1 14h8l1-14"></path></svg>
          </button>
        </div>
      </article>
    `;
  }).join("");
}

function renderInterests() {
  qs("#interestChips").innerHTML = interests.map((interest) => `
    <span class="chip">${escapeHtml(interest)}<button type="button" aria-label="Remove ${escapeHtml(interest)}" data-remove-interest="${escapeHtml(interest)}">x</button></span>
  `).join("");
}

function renderApps() {
  const query = qs("#appSearch") ? qs("#appSearch").value.trim().toLowerCase() : "";
  qs("#appGrid").innerHTML = connectedApps.map((app) => {
    const hidden = query && !`${app.name} ${app.vendor} ${app.permissions.join(" ")} ${app.risk}`.toLowerCase().includes(query);
    return `
      <article class="app-card ${hidden ? "hidden" : ""}" data-app="${app.id}" data-risk="${app.risk}">
        <div class="app-card-header">
          <span class="app-icon" style="background:${app.color}">${app.initial}</span>
          <div>
            <h2>${escapeHtml(app.name)}</h2>
            <p>${escapeHtml(app.vendor)} - ${escapeHtml(app.lastUsed)}</p>
          </div>
        </div>
        <span class="pill ${app.risk === "Broad access" ? "red" : app.risk === "Limited" ? "green" : "blue"}">${escapeHtml(app.risk)}</span>
        <div class="permission-list">
          ${app.permissions.map((permission) => `<span>${escapeHtml(permission)}</span>`).join("")}
        </div>
        <div class="app-card-actions">
          <button class="outline-button" data-app-details="${app.id}">Details</button>
          <button class="solid-button danger" data-revoke-app="${app.id}">Revoke</button>
        </div>
      </article>
    `;
  }).join("");
}

function renderDevices() {
  qs("#deviceList").innerHTML = devices.map((device) => {
    const reviewBadge = device.status === "Review";
    const statusBadgeClass = reviewBadge ? "status-badge review" : "status-badge";
    const statusHelp = reviewBadge
      ? `<small class="status-help">No activity for 42 days &mdash; consider signing out this device.</small>`
      : "";
    return `
    <article class="device-card" data-device="${device.id}">
      <div class="device-card-head">
        <div>
          <h2>${escapeHtml(device.name)}</h2>
          <p>${escapeHtml(device.type)} &middot; ${escapeHtml(device.activity)}</p>
        </div>
        <span class="${statusBadgeClass}" title="${reviewBadge ? "Inactive device — review and consider signing out" : escapeHtml(device.status)}">
          ${reviewBadge ? '<svg viewBox="0 0 24 24" aria-hidden="true" style="width:14px;height:14px"><path d="M12 3 2 21h20z"></path><path d="M12 10v5"></path><path d="M12 18v.1"></path></svg>' : ""}
          ${escapeHtml(device.status)}
        </span>
      </div>
      ${statusHelp}
      <div class="device-meta">
        <span><strong>Location</strong>${escapeHtml(device.location)}</span>
        <span><strong>Activity</strong>${escapeHtml(device.activity)}</span>
        <span><strong>Browser</strong>${escapeHtml(device.browser)}</span>
        <span><strong>Status</strong>${escapeHtml(device.status)}</span>
      </div>
      <div class="app-card-actions">
        <button class="outline-button" data-find-device="${device.id}">Find</button>
        <button class="solid-button danger" data-signout-device="${device.id}">Sign out</button>
      </div>
    </article>
  `;
  }).join("");
}

function refreshAll() {
  renderBars();
  renderRecentTimeline();
  renderActivityList();
  renderInterests();
  renderApps();
  renderDevices();
  updateOverviewMetrics();
  updateAdPreview();
}

function openDrawer({ eyebrow, title, body, primaryText = "Delete sample data", secondaryText = "Open section", onPrimary, onSecondary }) {
  qs("#drawerEyebrow").textContent = eyebrow;
  qs("#drawerTitle").textContent = title;
  qs("#drawerBody").innerHTML = body;
  qs("#drawerPrimary").textContent = primaryText;
  qs("#drawerSecondary").textContent = secondaryText;
  qs("#drawerPrimary").onclick = onPrimary || (() => showToast("No destructive action configured."));
  qs("#drawerSecondary").onclick = onSecondary || closeDrawer;
  document.body.classList.add("drawer-open");
  qs("#detailDrawer").setAttribute("aria-hidden", "false");
}

function closeDrawer() {
  document.body.classList.remove("drawer-open");
  qs("#detailDrawer").setAttribute("aria-hidden", "true");
}

function openActivityDetails(id) {
  const item = activityItems.find((entry) => entry.id === Number(id));
  if (!item) return;
  const meta = categoryMeta[item.type];
  openDrawer({
    eyebrow: meta.label,
    title: item.title,
    body: `
      <dl>
        <dt>Service</dt><dd>${escapeHtml(item.service)}</dd>
        <dt>Saved</dt><dd>${escapeHtml(item.time)}</dd>
        <dt>Device</dt><dd>${escapeHtml(item.device)}</dd>
        <dt>Location</dt><dd>${escapeHtml(item.location)}</dd>
        <dt>Details</dt><dd>${escapeHtml(item.detail)}</dd>
      </dl>
    `,
    primaryText: "Delete item",
    secondaryText: "View activity",
    onPrimary: () => confirmAction("Delete sample activity?", `Remove "${item.title}" from the dashboard.`, () => {
      deleteActivities([item.id]);
      closeDrawer();
    }),
    onSecondary: () => {
      closeDrawer();
      setSection("activity");
    }
  });
}

function openCategoryDetails(type) {
  const meta = categoryMeta[type];
  const items = activityItems.filter((item) => item.type === type);
  openDrawer({
    eyebrow: "Data category",
    title: `${meta.label} history`,
    body: `
      <dl>
        <dt>Saved items</dt><dd>${items.length * 17}</dd>
        <dt>Last item</dt><dd>${items[0] ? escapeHtml(items[0].time) : "No recent sample data"}</dd>
        <dt>Controls</dt><dd>${type === "location" ? "Location saving paused on mobile" : "Activity saving enabled"}</dd>
        <dt>Included data</dt><dd>${items.map((item) => escapeHtml(item.title)).slice(0, 4).join("<br>") || "No items saved"}</dd>
      </dl>
    `,
    primaryText: `Clear ${meta.label.toLowerCase()}`,
    secondaryText: "Open activity",
    onPrimary: () => confirmAction(`Clear ${meta.label.toLowerCase()} history?`, "This removes matching sample activity items from this dashboard.", () => {
      deleteActivities(items.map((item) => item.id));
      closeDrawer();
    }),
    onSecondary: () => {
      closeDrawer();
      qs("#categoryFilter").value = type;
      setSection("activity");
      renderActivityList();
    }
  });
}

function openAppDetails(id) {
  const app = connectedApps.find((entry) => entry.id === id);
  if (!app) return;
  openDrawer({
    eyebrow: "Connected app",
    title: app.name,
    body: `
      <dl>
        <dt>Publisher</dt><dd>${escapeHtml(app.vendor)}</dd>
        <dt>Last used</dt><dd>${escapeHtml(app.lastUsed)}</dd>
        <dt>Access level</dt><dd>${escapeHtml(app.risk)}</dd>
        <dt>Permissions</dt><dd>${app.permissions.map((p) => `<span class="drawer-perm">${escapeHtml(p)}</span>`).join("")}</dd>
      </dl>
    `,
    primaryText: "Revoke access",
    secondaryText: "Open apps",
    onPrimary: () => revokeApp(id),
    onSecondary: () => {
      closeDrawer();
      setSection("apps");
    }
  });
}

function deleteActivities(ids) {
  const idSet = new Set(ids.map(Number));
  const removedItems = activityItems.filter((item) => idSet.has(item.id));
  activityItems = activityItems.filter((item) => !idSet.has(item.id));
  selectedActivities = new Set(Array.from(selectedActivities).filter((id) => !idSet.has(id)));
  refreshAll();
  if (!removedItems.length) {
    showToast("No matching sample activity to delete.");
    return;
  }
  showToast(`${removedItems.length} sample item${removedItems.length === 1 ? "" : "s"} deleted.`, {
    undo: () => {
      activityItems = activityItems.concat(removedItems).sort((a, b) => a.daysAgo - b.daysAgo);
      refreshAll();
      showToast("Deletion undone.");
    }
  });
}

function confirmAction(title, body, onAccept) {
  pendingConfirmAction = onAccept;
  qs("#confirmTitle").textContent = title;
  qs("#confirmBody").textContent = body;
  const acceptBtn = qs("#acceptConfirm");
  if (acceptBtn) {
    acceptBtn.disabled = false;
    acceptBtn.textContent = "Delete";
  }
  openModal("#confirmModal");
}

function openModal(selector) {
  qsa(".modal").forEach((modal) => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  });
  const modal = qs(selector);
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  if (document.body.classList.contains("drawer-open")) {
    document.body.classList.add("drawer-suppressed");
  }
}

function closeModals() {
  qsa(".modal").forEach((modal) => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  });
  document.body.classList.remove("modal-open");
  document.body.classList.remove("drawer-suppressed");
  pendingConfirmAction = null;
}

function renderCheckup() {
  const step = checkupSteps[checkupIndex];
  qs("#checkupTitle").textContent = step.title;
  qs("#checkupBody").innerHTML = step.body;
  qs("#checkupProgress").innerHTML = checkupSteps.map((_, index) => `<span class="${index <= checkupIndex ? "active" : ""}"></span>`).join("");
  qs("#checkupBack").disabled = checkupIndex === 0;
  qs("#checkupNext").textContent = checkupIndex === checkupSteps.length - 1 ? "Finish checkup" : "Next";
}

function openCheckup() {
  checkupIndex = 0;
  renderCheckup();
  openModal("#checkupModal");
}

function finishCheckup() {
  qsa(".check-row").forEach((row) => row.classList.add("complete"));
  qs("#scoreRing").style.setProperty("--score", 92);
  qs("#scoreValue").textContent = "92";
  qs("#scoreStatus").textContent = "All recommendations reviewed";
  closeModals();
  showToast("Privacy checkup completed.");
}

function searchItems() {
  const sectionResults = [
    ["Overview", "Privacy summary and recommendations", "overview"],
    ["Activity history", "Filter, inspect, and delete sample activity", "activity"],
    ["Data controls", "Manage activity saving and retention", "controls"],
    ["Ad personalization", "Manage interests and ad topic limits", "ads"],
    ["App access", "Review connected apps and permissions", "apps"],
    ["Devices & locations", "Manage signed-in devices and location events", "devices"],
    ["Export data", "Create a portable archive simulation", "export"],
    ["Privacy settings", "Manage notices and sharing defaults", "settings"]
  ];
  const categoryResults = Object.entries(categoryMeta).map(([key, meta]) => [`${meta.label} history`, "Open category details", meta.section, key]);
  const appResults = connectedApps.map((app) => [app.name, `${app.vendor} - ${app.permissions.join(", ")}`, "apps", null, app.id]);
  return [...sectionResults, ...categoryResults, ...appResults];
}

function renderSearchResults(query = "") {
  const lower = query.trim().toLowerCase();
  const results = searchItems().filter(([title, subtitle]) => !lower || `${title} ${subtitle}`.toLowerCase().includes(lower));
  qs("#searchResults").innerHTML = results.length ? results.map(([title, subtitle, section, category, app]) => `
    <button class="search-result" data-search-section="${section}" ${category ? `data-search-category="${category}"` : ""} ${app ? `data-search-app="${app}"` : ""}>
      <span class="timeline-icon ${category ? categoryMeta[category].color : "blue"}">${escapeHtml(title.slice(0, 1))}</span>
      <span><strong>${escapeHtml(title)}</strong><small>${escapeHtml(subtitle)}</small></span>
    </button>
  `).join("") : `<div class="search-result"><span><strong>No matches</strong><small>Try a different search term.</small></span></div>`;
}

function openSearch() {
  renderSearchResults("");
  openModal("#searchModal");
  window.setTimeout(() => qs("#globalSearch").focus(), 20);
}

function revokeApp(id) {
  const app = connectedApps.find((entry) => entry.id === id);
  if (!app) return;
  confirmAction("Revoke app access?", `${app.name} will lose access to this sample account profile.`, () => {
    const acceptBtn = qs("#acceptConfirm");
    if (acceptBtn) {
      acceptBtn.disabled = true;
      acceptBtn.textContent = "Revoking…";
    }
    connectedApps = connectedApps.filter((entry) => entry.id !== id);
    closeModals();
    closeDrawer();
    refreshAll();
    showToast(`${app.name} access revoked.`);
  });
}

function createExport() {
  const selected = qsa(".export-categories input:checked").map((input) => input.value);
  if (!selected.length) {
    showToast("Choose at least one category to export.");
    return;
  }
  window.clearInterval(exportTimer);
  let progress = 0;
  const format = qs("#exportType").value;
  const size = qs("#exportSize").value;
  const frequency = qs("#exportFrequency").value;
  qs("#exportStatusText").textContent = "Preparing sample export...";
  qs("#exportProgressBar").style.width = "0%";
  qs("#downloadExport").disabled = true;
  qs("#exportSummary").innerHTML = `
    <span>Format</span><strong>${escapeHtml(format)}</strong>
    <span>Categories</span><strong>${selected.length} selected</strong>
    <span>Estimated size</span><strong>${escapeHtml(size)} - ${escapeHtml(frequency)}</strong>
  `;
  exportTimer = window.setInterval(() => {
    progress += Math.floor(Math.random() * 18) + 9;
    if (progress >= 100) {
      progress = 100;
      window.clearInterval(exportTimer);
      qs("#exportStatusText").textContent = "Sample export ready.";
      qs("#downloadExport").disabled = false;
      qsa(".check-row").forEach((row) => {
        if (row.dataset.check === "export") row.classList.add("complete");
      });
      showToast("Export archive is ready.");
    }
    qs("#exportProgressBar").style.width = `${progress}%`;
  }, 420);
}

function toggleAccountMenu() {
  const menu = qs("#accountMenu");
  const button = qs("#profileButton");
  if (!menu) return;
  const open = menu.classList.toggle("open");
  menu.setAttribute("aria-hidden", open ? "false" : "true");
  if (button) button.setAttribute("aria-expanded", open ? "true" : "false");
}

function closeAccountMenu() {
  const menu = qs("#accountMenu");
  const button = qs("#profileButton");
  if (menu) {
    menu.classList.remove("open");
    menu.setAttribute("aria-hidden", "true");
  }
  if (button) button.setAttribute("aria-expanded", "false");
}

function updateAdPreview() {
  const adPanel = qs("#adPreview");
  if (!adPanel) return;
  const top = interests.slice(0, 2).join(" and ").toLowerCase();
  const text = top
    ? `Recommendations based on ${top} interests.`
    : "Recommendations will appear once interests are added.";
  const desc = adPanel.querySelector(".mock-ad:not(.muted) p");
  if (desc) desc.textContent = text;
}

const checkupRouteMap = {
  activity: { section: "controls" },
  ads: { section: "ads" },
  apps: { section: "apps", filterBroad: true },
  export: { section: "export" },
  devices: { section: "devices" }
};

function rangeIds(range) {
  const max = { today: 0, week: 7, month: 30, all: Infinity }[range];
  return activityItems.filter((item) => range === "all" || item.daysAgo <= max).map((item) => item.id);
}

document.addEventListener("click", (event) => {
  const target = event.target.closest("button, a");
  if (!target) return;

  if (target.dataset.section) {
    event.preventDefault();
    setSection(target.dataset.section);
    return;
  }

  if (target.dataset.sectionJump) {
    setSection(target.dataset.sectionJump);
    return;
  }

  if (target.dataset.openCheckup !== undefined || target.id === "openCheckup") {
    openCheckup();
    return;
  }

  if (target.id === "heroExport") {
    setSection("export");
    return;
  }

  if (target.id === "mobileMenuButton") {
    document.body.classList.add("nav-open");
    return;
  }

  if (target.id === "drawerBackdrop") {
    closeDrawer();
    document.body.classList.remove("nav-open");
    return;
  }

  if (target.id === "openSearch") {
    openSearch();
    return;
  }

  if (target.id === "closeSearch") {
    closeModals();
    return;
  }

  if (target.id === "helpButton") {
    showToast("Help opened for this demo dashboard.");
    return;
  }

  if (target.id === "profileButton") {
    toggleAccountMenu();
    return;
  }

  if (target.dataset.accountAction) {
    const action = target.dataset.accountAction;
    closeAccountMenu();
    if (action === "manage") showToast("Opened account management (sample).");
    else if (action === "switch") showToast("Account switcher opened (sample).");
    else if (action === "signout") showToast("Signed out of this sample account.");
    return;
  }

  if (target.id === "closeDrawer") {
    closeDrawer();
    return;
  }

  if (target.id === "closeCheckup" || target.id === "checkupExit") {
    closeModals();
    return;
  }

  if (target.id === "checkupBack") {
    checkupIndex = Math.max(0, checkupIndex - 1);
    renderCheckup();
    return;
  }

  if (target.id === "checkupNext") {
    if (checkupIndex === checkupSteps.length - 1) {
      finishCheckup();
    } else {
      checkupIndex += 1;
      renderCheckup();
    }
    return;
  }

  if (target.dataset.checkupJump) {
    closeModals();
    setSection(target.dataset.checkupJump);
    return;
  }

  if (target.dataset.check) {
    const route = checkupRouteMap[target.dataset.check];
    if (route) {
      target.classList.add("complete");
      setSection(route.section);
      if (route.filterBroad) {
        qsa(".app-card").forEach((card) => card.classList.toggle("hidden", card.dataset.risk !== "Broad access"));
        showToast("Showing apps with broad access.");
      } else {
        showToast(`Opened ${route.section}.`);
      }
      updateOverviewMetrics();
    }
    return;
  }

  if (target.classList.contains("toggle")) {
    target.classList.toggle("active");
    const isOn = target.classList.contains("active");
    target.setAttribute("aria-pressed", isOn ? "true" : "false");
    const stateEl = target.querySelector(".toggle-state");
    if (stateEl) stateEl.textContent = isOn ? "On" : "Off";
    if (target.id === "adsToggle") {
      qs("#adStatusText").textContent = isOn ? "Personalization is on for this sample account." : "Personalization is off for this sample account.";
    }
    updateOverviewMetrics();
    showToast(isOn ? "Setting turned on." : "Setting turned off.");
    return;
  }

  if (target.dataset.chartRange) {
    qsa("[data-chart-range]").forEach((button) => button.classList.toggle("active", button === target));
    renderBars(target.dataset.chartRange);
    showToast(`Chart updated to ${target.dataset.chartRange} view.`);
    return;
  }

  if (target.dataset.cardDetails) {
    openCategoryDetails(target.dataset.cardDetails);
    return;
  }

  if (target.closest(".data-card") && target.closest(".data-card").dataset.category && !target.closest("button")) {
    openCategoryDetails(target.closest(".data-card").dataset.category);
    return;
  }

  if (target.dataset.activityDetails) {
    openActivityDetails(target.dataset.activityDetails);
    return;
  }

  if (target.dataset.deleteActivity) {
    const item = activityItems.find((entry) => entry.id === Number(target.dataset.deleteActivity));
    if (item) {
      confirmAction("Delete sample activity?", `Remove "${item.title}" from activity history.`, () => {
        deleteActivities([item.id]);
        closeModals();
      });
    }
    return;
  }

  if (target.id === "deleteSelected") {
    confirmAction("Delete selected activity?", `Remove ${selectedActivities.size} selected sample item${selectedActivities.size === 1 ? "" : "s"}.`, () => {
      deleteActivities(Array.from(selectedActivities));
      closeModals();
    });
    return;
  }

  if (target.id === "clearVisible") {
    const ids = filterActivities().map((item) => item.id);
    confirmAction("Clear visible activity?", `Remove ${ids.length} visible sample item${ids.length === 1 ? "" : "s"}.`, () => {
      deleteActivities(ids);
      closeModals();
    });
    return;
  }

  if (target.id === "selectAllVisible") {
    const visible = filterActivities();
    const allSelected = visible.length && visible.every((item) => selectedActivities.has(item.id));
    visible.forEach((item) => {
      if (allSelected) selectedActivities.delete(item.id);
      else selectedActivities.add(item.id);
    });
    renderActivityList();
    return;
  }

  if (target.dataset.rangeDelete) {
    const ids = rangeIds(target.dataset.rangeDelete);
    confirmAction("Delete activity by range?", `Remove ${ids.length} sample item${ids.length === 1 ? "" : "s"} from the selected period.`, () => {
      deleteActivities(ids);
      closeModals();
    });
    return;
  }

  if (target.dataset.retention) {
    qsa("[data-retention]").forEach((button) => button.classList.toggle("active", button === target));
    updateOverviewMetrics();
    const saveBtn = qs("#saveRetention");
    if (saveBtn) {
      saveBtn.classList.add("pending");
      saveBtn.textContent = "Save retention";
    }
    return;
  }

  if (target.id === "saveRetention") {
    const active = qs(".retention-options button.active");
    target.classList.remove("pending");
    showToast(`Auto-delete set to ${active.dataset.retention}.`);
    return;
  }

  if (target.dataset.removeInterest) {
    const removed = target.dataset.removeInterest;
    const idx = interests.indexOf(removed);
    interests = interests.filter((interest) => interest !== removed);
    renderInterests();
    updateAdPreview();
    showToast(`Removed "${removed}" from interests.`, {
      undo: () => {
        if (!interests.includes(removed)) {
          const insertAt = Math.max(0, Math.min(idx, interests.length));
          interests.splice(insertAt, 0, removed);
        }
        renderInterests();
        updateAdPreview();
        showToast("Interest restored.");
      }
    });
    return;
  }

  if (target.dataset.appDetails) {
    openAppDetails(target.dataset.appDetails);
    return;
  }

  if (target.dataset.revokeApp) {
    revokeApp(target.dataset.revokeApp);
    return;
  }

  if (target.id === "reviewBroadApps") {
    setSection("apps");
    qsa(".app-card").forEach((card) => card.classList.toggle("hidden", card.dataset.risk !== "Broad access"));
    showToast("Showing apps with broad access.");
    return;
  }

  if (target.dataset.findDevice) {
    const device = devices.find((entry) => entry.id === target.dataset.findDevice);
    showToast(`${device.name} location ping sent.`);
    return;
  }

  if (target.dataset.signoutDevice) {
    const device = devices.find((entry) => entry.id === target.dataset.signoutDevice);
    confirmAction("Sign out device?", `${device.name} will be signed out in this sample dashboard.`, () => {
      closeModals();
      showToast(`${device.name} signed out.`);
    });
    return;
  }

  if (target.id === "refreshLocations") {
    showToast("Location timeline refreshed.");
    qsa(".map-dot").forEach((dot, index) => dot.classList.toggle("active", index === Math.floor(Math.random() * 3)));
    return;
  }

  if (target.id === "createExport") {
    createExport();
    return;
  }

  if (target.id === "downloadExport") {
    showToast("Sample archive downloaded.");
    return;
  }

  if (target.id === "cancelConfirm" || target.id === "cancelConfirmIcon") {
    pendingConfirmAction = null;
    closeModals();
    return;
  }

  if (target.id === "acceptConfirm") {
    const action = pendingConfirmAction;
    pendingConfirmAction = null;
    if (action) action();
    else closeModals();
    const acceptBtn = qs("#acceptConfirm");
    if (acceptBtn) {
      acceptBtn.disabled = false;
      acceptBtn.textContent = "Delete";
    }
    return;
  }

  if (target.classList.contains("search-result")) {
    const section = target.dataset.searchSection;
    const category = target.dataset.searchCategory;
    const app = target.dataset.searchApp;
    closeModals();
    if (category) openCategoryDetails(category);
    else if (app) {
      setSection(section);
      openAppDetails(app);
    } else setSection(section);
  }
});

document.addEventListener("change", (event) => {
  const target = event.target;
  if (target.matches("[data-select-activity]")) {
    const id = Number(target.dataset.selectActivity);
    if (target.checked) selectedActivities.add(id);
    else selectedActivities.delete(id);
    renderActivityList();
  }
});

qs("#activitySearch").addEventListener("input", renderActivityList);
qs("#categoryFilter").addEventListener("change", renderActivityList);
qs("#dateFilter").addEventListener("change", renderActivityList);
qs("#appSearch").addEventListener("input", renderApps);

qs("#interestForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const input = qs("#interestInput");
  const value = input.value.trim();
  if (!value) return;
  if (!interests.some((interest) => interest.toLowerCase() === value.toLowerCase())) {
    interests.push(value);
    renderInterests();
    updateAdPreview();
    showToast("Interest added.");
  }
  input.value = "";
});

qs("#globalSearch").addEventListener("input", (event) => renderSearchResults(event.target.value));

qs("#modalBackdrop").addEventListener("click", closeModals);
qs("#drawerBackdrop").addEventListener("click", () => {
  closeDrawer();
  document.body.classList.remove("nav-open");
});

document.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    openSearch();
  }
  if (event.key === "Escape") {
    closeDrawer();
    closeModals();
    closeAccountMenu();
    document.body.classList.remove("nav-open");
  }
});

document.addEventListener("click", (event) => {
  const menu = qs("#accountMenu");
  if (!menu || !menu.classList.contains("open")) return;
  if (event.target.closest("#accountMenu") || event.target.closest("#profileButton")) return;
  closeAccountMenu();
}, true);

refreshAll();
