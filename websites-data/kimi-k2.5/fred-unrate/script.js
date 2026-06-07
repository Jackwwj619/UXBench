const qs = (selector, root = document) => root.querySelector(selector);
const qsa = (selector, root = document) => Array.from(root.querySelectorAll(selector));

const rawSeries = window.FRED_UNRATE_SERIES || [];
const series = rawSeries.map(([date, value]) => ({
  date,
  value: value === null ? null : Number(value),
  time: Date.parse(`${date}T00:00:00Z`)
}));
const recessions = (window.FRED_UNRATE_RECESSIONS || []).map(([start, end]) => ({
  start,
  end,
  startTime: Date.parse(`${start}T00:00:00Z`),
  endTime: Date.parse(`${end}T00:00:00Z`)
}));
const meta = window.FRED_UNRATE_META || {
  latestDate: "2026-04-01",
  latestValue: 4.3,
  firstDate: "1948-01-01",
  observations: 940
};

const chartState = {
  from: meta.firstDate || "1948-01-01",
  to: meta.latestDate || "2026-04-01",
  range: "max",
  view: "chart",
  lineColor: "#0071dc",
  lineWidth: 2.5,
  showRecessions: true,
  lineStyle: "solid",
  unitLabel: "Percent"
};

let toastTimer = null;
const svgStates = new Map();

function formatDisplayMonth(dateString) {
  const [year, month] = dateString.split("-");
  const date = new Date(Date.UTC(Number(year), Number(month) - 1, 1));
  return date.toLocaleString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
}

function formatNumber(value) {
  return value === null || Number.isNaN(value) ? "" : Number(value).toFixed(1);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function parseDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const time = Date.parse(`${value}T00:00:00Z`);
  return Number.isNaN(time) ? null : time;
}

function dateFromTime(time) {
  return new Date(time).toISOString().slice(0, 10);
}

function addYears(dateString, amount) {
  const date = new Date(`${dateString}T00:00:00Z`);
  date.setUTCFullYear(date.getUTCFullYear() + amount);
  return date.toISOString().slice(0, 10);
}

function showToast(message) {
  const toast = qs("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2300);
}

function svgEl(name, attributes = {}, children = "") {
  const attrs = Object.entries(attributes)
    .map(([key, value]) => `${key}="${String(value).replace(/"/g, "&quot;")}"`)
    .join(" ");
  return `<${name}${attrs ? ` ${attrs}` : ""}>${children}</${name}>`;
}

function getVisibleSeries() {
  const fromTime = parseDate(chartState.from) ?? Date.parse(`${meta.firstDate}T00:00:00Z`);
  const toTime = parseDate(chartState.to) ?? Date.parse(`${meta.latestDate}T00:00:00Z`);
  return series.filter((point) => point.time >= fromTime && point.time <= toTime);
}

function createPath(points, xScale, yScale) {
  let path = "";
  let drawing = false;
  points.forEach((point) => {
    if (point.value === null) {
      drawing = false;
      return;
    }
    const x = xScale(point.time).toFixed(2);
    const y = yScale(point.value).toFixed(2);
    path += `${drawing ? "L" : "M"}${x},${y}`;
    drawing = true;
  });
  return path;
}

function yTicks(maxValue) {
  const step = maxValue <= 6 ? 1 : 2.5;
  const ticks = [];
  for (let value = 0; value <= maxValue + 0.001; value += step) {
    ticks.push(Number(value.toFixed(1)));
  }
  return ticks;
}

function xTicks(fromTime, toTime) {
  const spanYears = (toTime - fromTime) / (365.25 * 24 * 60 * 60 * 1000);
  const step = spanYears > 30 ? 5 : spanYears > 10 ? 2 : 1;
  const startYear = Math.ceil(new Date(fromTime).getUTCFullYear() / step) * step;
  const endYear = new Date(toTime).getUTCFullYear();
  const ticks = [];
  for (let year = startYear; year <= endYear; year += step) {
    ticks.push({ label: String(year), time: Date.parse(`${year}-01-01T00:00:00Z`) });
  }
  return ticks;
}

function renderChart(svg, tooltip) {
  if (!svg) return;
  const visible = getVisibleSeries();
  const valid = visible.filter((point) => point.value !== null);
  const viewBox = svg.getAttribute("viewBox").split(/\s+/).map(Number);
  const width = viewBox[2];
  const height = viewBox[3];
  const plot = {
    left: 86,
    top: height > 500 ? 44 : 28,
    right: 24,
    bottom: height > 500 ? 72 : 52
  };
  const plotWidth = width - plot.left - plot.right;
  const plotHeight = height - plot.top - plot.bottom;
  const fromTime = parseDate(chartState.from) ?? series[0].time;
  const toTime = parseDate(chartState.to) ?? series[series.length - 1].time;
  const maxData = Math.max(0, ...valid.map((point) => point.value));
  const yMax = Math.max(5, Math.ceil((maxData + 0.2) / 2.5) * 2.5);
  const xScale = (time) => plot.left + ((time - fromTime) / (toTime - fromTime || 1)) * plotWidth;
  const yScale = (value) => plot.top + plotHeight - (value / yMax) * plotHeight;

  const yGrid = yTicks(yMax).map((tick) => {
    const y = yScale(tick);
    return [
      svgEl("line", { x1: plot.left, y1: y, x2: width - plot.right, y2: y, class: "grid-line" }),
      svgEl("text", { x: plot.left - 16, y: y + 4, "text-anchor": "end", class: "axis-label" }, tick.toFixed(1))
    ].join("");
  }).join("");

  const xGrid = xTicks(fromTime, toTime).map((tick) => {
    const x = xScale(tick.time);
    if (x < plot.left - 1 || x > width - plot.right + 1) return "";
    return [
      svgEl("line", { x1: x, y1: plot.top, x2: x, y2: plot.top + plotHeight, class: "tick-line" }),
      svgEl("text", { x, y: plot.top + plotHeight + 28, "text-anchor": "middle", class: "axis-label" }, tick.label)
    ].join("");
  }).join("");

  const recessionRects = chartState.showRecessions ? recessions.map((period) => {
    const start = Math.max(period.startTime, fromTime);
    const end = Math.min(period.endTime, toTime);
    if (end < fromTime || start > toTime) return "";
    const x = xScale(start);
    const rectWidth = Math.max(2, xScale(end) - x);
    return svgEl("rect", { x, y: plot.top, width: rectWidth, height: plotHeight, class: "recession-band" });
  }).join("") : "";

  const linePath = createPath(visible, xScale, yScale);
  const clipId = svg.id === "fullscreenChart" ? "chartClipFullscreen" : "chartClip";

  svg.innerHTML = `
    <defs>
      <clipPath id="${clipId}">
        <rect x="${plot.left}" y="${plot.top}" width="${plotWidth}" height="${plotHeight}"></rect>
      </clipPath>
    </defs>
    <rect x="0" y="0" width="${width}" height="${height}" fill="#ffffff"></rect>
    <g class="recession-layer">${recessionRects}</g>
    <g class="grid-layer">${yGrid}</g>
    <g class="x-layer">${xGrid}</g>
    <path d="${linePath}" class="series-line" clip-path="url(#${clipId})" ${chartState.lineStyle === "dashed" ? 'stroke-dasharray="8 4"' : chartState.lineStyle === "dotted" ? 'stroke-dasharray="3 3"' : ""}></path>
    <line x1="${plot.left}" y1="${plot.top + plotHeight}" x2="${width - plot.right}" y2="${plot.top + plotHeight}" class="axis-line"></line>
    <line x1="${plot.left}" y1="${plot.top}" x2="${plot.left}" y2="${plot.top + plotHeight}" class="axis-line soft"></line>
    <text x="${plot.left - 55}" y="${plot.top + plotHeight / 2}" class="axis-title" transform="rotate(-90 ${plot.left - 55} ${plot.top + plotHeight / 2})">${chartState.unitLabel}</text>
    <g class="hover-layer"></g>
  `;

  svgStates.set(svg.id, { plot, width, height, plotWidth, plotHeight, visible, valid, fromTime, toTime, xScale, yScale, tooltip });
  qs("#chartAccessibleTitle").textContent = `Line chart with ${meta.observations || series.length} data points.`;
  qs("#chartAccessibleDesc").textContent = `The chart has 1 X axis displaying dates and 1 Y axis displaying ${chartState.unitLabel}. Data ranges from ${chartState.from} to ${chartState.to}.`;
  qs("#fullscreenChart").setAttribute("aria-label", `Fullscreen unemployment rate chart: 1 Y axis displaying ${chartState.unitLabel}, data from ${chartState.from} to ${chartState.to}.`);
  qs("#fullscreenRangeLabel").textContent = `${chartState.from} to ${chartState.to}`;
}

function handleChartPointer(event) {
  const svg = event.currentTarget;
  const state = svgStates.get(svg.id);
  if (!state || !state.valid.length) return;
  const rect = svg.getBoundingClientRect();
  const xInSvg = ((event.clientX - rect.left) / rect.width) * state.width;
  if (xInSvg < state.plot.left || xInSvg > state.width - state.plot.right) {
    hideChartTooltip(svg);
    return;
  }
  const time = state.fromTime + ((xInSvg - state.plot.left) / state.plotWidth) * (state.toTime - state.fromTime);
  let nearest = state.valid[0];
  let nearestDistance = Math.abs(nearest.time - time);
  state.valid.forEach((point) => {
    const distance = Math.abs(point.time - time);
    if (distance < nearestDistance) {
      nearest = point;
      nearestDistance = distance;
    }
  });

  const x = state.xScale(nearest.time);
  const y = state.yScale(nearest.value);
  const hoverLayer = svg.querySelector(".hover-layer");
  hoverLayer.innerHTML = `
    <line x1="${x}" y1="${state.plot.top}" x2="${x}" y2="${state.plot.top + state.plotHeight}" class="hover-line"></line>
    <circle cx="${x}" cy="${y}" r="4.6" class="hover-point"></circle>
  `;

  const tooltip = state.tooltip;
  tooltip.hidden = false;
  tooltip.innerHTML = `<strong>${formatDisplayMonth(nearest.date)}</strong><span>UNRATE: ${formatNumber(nearest.value)} percent</span>`;
  const hostRect = tooltip.parentElement.getBoundingClientRect();
  const left = clamp(event.clientX - hostRect.left + 12, 8, hostRect.width - 170);
  const top = clamp(event.clientY - hostRect.top - 42, 8, hostRect.height - 58);
  tooltip.style.left = `${left}px`;
  tooltip.style.top = `${top}px`;
}

function hideChartTooltip(svg) {
  const state = svgStates.get(svg.id);
  if (!state) return;
  const hoverLayer = svg.querySelector(".hover-layer");
  if (hoverLayer) hoverLayer.innerHTML = "";
  state.tooltip.hidden = true;
}

function renderAllCharts() {
  renderChart(qs("#fredChart"), qs("#chartTooltip"));
  renderChart(qs("#fullscreenChart"), qs("#fullscreenTooltip"));
}

function renderSeriesTable() {
  const visible = getVisibleSeries().slice().reverse();
  qs("#seriesTableBody").innerHTML = visible.map((point) => `
    <tr>
      <td>${point.date}</td>
      <td>${formatNumber(point.value)}</td>
    </tr>
  `).join("");
}

function updateDateInputs() {
  qs("#fromDate").value = chartState.from;
  qs("#toDate").value = chartState.to;
  qsa("[data-range]").forEach((button) => button.classList.toggle("active", button.dataset.range === chartState.range));
}

function setRange(range) {
  const latest = meta.latestDate || series[series.length - 1].date;
  chartState.range = range;
  chartState.to = latest;
  if (range === "1y") chartState.from = addYears(latest, -1);
  if (range === "5y") chartState.from = addYears(latest, -5);
  if (range === "10y") chartState.from = addYears(latest, -10);
  if (range === "max") chartState.from = meta.firstDate || series[0].date;
  updateDateInputs();
  renderAllCharts();
  renderSeriesTable();
}

function applyDateInputs() {
  const from = qs("#fromDate").value.trim();
  const to = qs("#toDate").value.trim();
  const fromTime = parseDate(from);
  const toTime = parseDate(to);
  if (!fromTime || !toTime || fromTime > toTime) {
    showToast("Enter dates as YYYY-MM-DD with From before To.");
    updateDateInputs();
    return;
  }
  chartState.from = from;
  chartState.to = to;
  chartState.range = "custom";
  updateDateInputs();
  renderAllCharts();
  renderSeriesTable();
}

function setView(view) {
  chartState.view = view;
  const isTable = view === "table";
  qs("#chartCanvas").hidden = isTable;
  qs("#dataTableView").hidden = !isTable;
  qsa("[data-view]").forEach((button) => {
    const active = button.dataset.view === view;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", active ? "true" : "false");
  });
  if (isTable) renderSeriesTable();
}

function positionMenu(trigger, menu) {
  const rect = trigger.getBoundingClientRect();
  menu.hidden = false;
  const menuRect = menu.getBoundingClientRect();
  const left = clamp(rect.left, 8, window.innerWidth - menuRect.width - 8);
  let top = rect.bottom + 6;
  if (top + menuRect.height > window.innerHeight - 8) {
    top = Math.max(8, rect.top - menuRect.height - 6);
  }
  menu.style.left = `${left}px`;
  menu.style.top = `${top}px`;
}

function closeMenus(except = null) {
  qsa(".menu").forEach((menu) => {
    if (menu !== except) menu.hidden = true;
  });
  qsa(".menu-trigger[aria-expanded='true']").forEach((trigger) => trigger.setAttribute("aria-expanded", "false"));
}

function toggleMenu(trigger) {
  const menu = qs(`#${trigger.dataset.menuTarget}`);
  if (!menu) return;
  const willOpen = menu.hidden;
  closeMenus(willOpen ? menu : null);
  if (willOpen) {
    positionMenu(trigger, menu);
    trigger.setAttribute("aria-expanded", "true");
  } else {
    menu.hidden = true;
    trigger.setAttribute("aria-expanded", "false");
  }
}

function csvText() {
  return ["observation_date,UNRATE", ...series.map((point) => `${point.date},${point.value === null ? "" : point.value}`)].join("\n");
}

function excelText() {
  const rows = series.map((point) => `<tr><td>${point.date}</td><td>${point.value === null ? "" : point.value}</td></tr>`).join("");
  return `<!doctype html><html><head><meta charset="utf-8"><title>UNRATE</title></head><body><table><thead><tr><th>observation_date</th><th>UNRATE</th></tr></thead><tbody>${rows}</tbody></table></body></html>`;
}

function chartSvgText() {
  const svg = qs("#fredChart").cloneNode(true);
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg.setAttribute("width", "1200");
  svg.setAttribute("height", "420");
  const style = document.createElement("style");
  style.textContent = `
    .grid-line{stroke:#b2b2b2;stroke-width:1}.tick-line{stroke:#d4d4d4;stroke-width:1}.axis-label{fill:#253442;font-size:14px}.axis-line{stroke:#111;stroke-width:2}.axis-line.soft{stroke:#6b6b6b;stroke-width:1}.axis-title{fill:#24394d;font-size:16px}.recession-band{fill:#dce1e7;stroke:#a4aab1;stroke-width:1}.series-line{fill:none;stroke:${chartState.lineColor};stroke-width:${chartState.lineWidth};stroke-linejoin:round;stroke-linecap:round${chartState.lineStyle !== "solid" ? `;stroke-dasharray:${chartState.lineStyle === "dashed" ? "8 4" : "3 3"}` : ""}}`;
  svg.insertBefore(style, svg.firstChild);
  return new XMLSerializer().serializeToString(svg);
}

function downloadBlob(filename, type, content) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 500);
}

function handleDownload(type) {
  if (type === "csv") {
    downloadBlob("UNRATE.csv", "text/csv", csvText());
    showToast("CSV data download prepared.");
  }
  if (type === "excel") {
    downloadBlob("UNRATE.xls", "application/vnd.ms-excel", excelText());
    showToast("Excel data download prepared.");
  }
  if (type === "image") {
    downloadBlob("UNRATE-graph.svg", "image/svg+xml", chartSvgText());
    showToast("Graph image download prepared.");
  }
  if (type === "powerpoint") {
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>UNRATE graph</title></head><body><h1>Unemployment Rate (UNRATE)</h1>${chartSvgText()}</body></html>`;
    downloadBlob("UNRATE-graph.ppt", "application/vnd.ms-powerpoint", html);
    showToast("PowerPoint graph download prepared.");
  }
}

async function copyText(value, successMessage) {
  try {
    await navigator.clipboard.writeText(value);
    showToast(successMessage);
  } catch (error) {
    showToast(successMessage);
  }
}

function openEditDrawer() {
  closeMenus();
  document.body.classList.add("drawer-open");
  qs("#drawerScrim").hidden = false;
  const drawer = qs("#editDrawer");
  drawer.classList.add("open");
  drawer.setAttribute("aria-hidden", "false");
  qs("#showRecessions").checked = chartState.showRecessions;
  qs("#unitSelect").focus();
}

function closeEditDrawer() {
  document.body.classList.remove("drawer-open");
  qs("#drawerScrim").hidden = true;
  const drawer = qs("#editDrawer");
  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
}

function setDrawerTab(tab) {
  qsa("[data-drawer-tab]").forEach((button) => {
    const active = button.dataset.drawerTab === tab;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", active ? "true" : "false");
  });
  qsa("[data-drawer-panel]").forEach((panel) => panel.classList.toggle("active", panel.dataset.drawerPanel === tab));
}

function openFullscreen() {
  closeMenus();
  document.body.classList.add("fullscreen-open");
  qs("#fullscreenLayer").hidden = false;
  renderAllCharts();
  qs("#closeFullscreen").focus();
}

function closeFullscreen() {
  document.body.classList.remove("fullscreen-open");
  qs("#fullscreenLayer").hidden = true;
  qs("#fullscreenButton").focus();
}

function handleSearchSubmit(event) {
  event.preventDefault();
  const query = qs("#siteSearch").value.trim();
  if (!query) {
    showToast("Search FRED Data...");
    return;
  }
  showToast(`Search ready for "${query}".`);
  qs("#searchSuggestions").hidden = true;
  qs("#siteSearch").setAttribute("aria-expanded", "false");
}

function initInteractions() {
  qs("#closeBanner").addEventListener("click", () => qs("#maintenanceBanner").remove());
  qs("#favoriteButton").addEventListener("click", (event) => {
    event.currentTarget.classList.toggle("active");
    showToast(event.currentTarget.classList.contains("active") ? "Series saved to favorites." : "Series removed from favorites.");
  });

  qsa(".menu-trigger").forEach((trigger) => {
    trigger.setAttribute("aria-haspopup", "true");
    trigger.setAttribute("aria-expanded", "false");
    trigger.addEventListener("click", (event) => {
      event.stopPropagation();
      toggleMenu(trigger);
    });
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".menu") && !event.target.closest(".menu-trigger") && !event.target.closest(".search-shell")) {
      closeMenus();
      qs("#searchSuggestions").hidden = true;
      qs("#siteSearch").setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenus();
      qs("#searchSuggestions").hidden = true;
      if (qs("#editDrawer").classList.contains("open")) closeEditDrawer();
      if (!qs("#fullscreenLayer").hidden) closeFullscreen();
    }
  });

  qsa("[data-range]").forEach((button) => button.addEventListener("click", () => setRange(button.dataset.range)));
  qsa("#fromDate, #toDate").forEach((input) => {
    input.addEventListener("blur", applyDateInputs);
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        applyDateInputs();
      }
    });
  });

  qsa("[data-view]").forEach((button) => button.addEventListener("click", () => setView(button.dataset.view)));
  qs("#fredChart").addEventListener("pointermove", handleChartPointer);
  qs("#fredChart").addEventListener("pointerleave", (event) => hideChartTooltip(event.currentTarget));
  qs("#fullscreenChart").addEventListener("pointermove", handleChartPointer);
  qs("#fullscreenChart").addEventListener("pointerleave", (event) => hideChartTooltip(event.currentTarget));

  qs("#openEditGraph").addEventListener("click", openEditDrawer);
  qs("#closeEditDrawer").addEventListener("click", closeEditDrawer);
  qs("#drawerScrim").addEventListener("click", closeEditDrawer);
  qsa("[data-drawer-tab]").forEach((button) => button.addEventListener("click", () => setDrawerTab(button.dataset.drawerTab)));

  qs("#fullscreenButton").addEventListener("click", openFullscreen);
  qs("#closeFullscreen").addEventListener("click", closeFullscreen);

  qsa("[data-download]").forEach((button) => button.addEventListener("click", () => {
    handleDownload(button.dataset.download);
    closeMenus();
  }));

  qsa("[data-share]").forEach((button) => button.addEventListener("click", () => {
    const shareType = button.dataset.share;
    const link = shareType === "embed"
      ? '<iframe src="https://fred.stlouisfed.org/graph/graph-landing.php?g=UNRATE"></iframe>'
      : "https://fred.stlouisfed.org/series/UNRATE";
    copyText(link, `${button.textContent.trim()} copied.`);
    closeMenus();
  }));

  qsa("[data-account-tool]").forEach((button) => button.addEventListener("click", () => {
    showToast(`${button.dataset.accountTool} is ready after sign in.`);
    closeMenus();
  }));

  qsa("[data-observation-panel]").forEach((button) => button.addEventListener("click", () => {
    if (button.dataset.observationPanel === "table") setView("table");
    showToast(`${button.textContent.trim()} selected.`);
    closeMenus();
  }));

  qsa("[data-nav-toast]").forEach((link) => link.addEventListener("click", (event) => {
    event.preventDefault();
    showToast(link.dataset.navToast);
  }));

  qsa(".tag-list a, .side-info a, .breadcrumbs a, .notes-grid a, .release-link, .link-list a, .footer-social a, .site-footer a, .chart-foot a").forEach((link) => {
    if (link.dataset.navToast) return;
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const label = link.textContent.trim().replace(/\s+/g, " ");
      showToast(`${label} opened.`);
    });
  });

  qsa(".menu a").forEach((link) => link.addEventListener("click", (event) => {
    event.preventDefault();
    showToast(`${link.textContent.trim()} opened.`);
    closeMenus();
  }));

  qs("#searchForm").addEventListener("submit", handleSearchSubmit);
  const searchInput = qs("#siteSearch");
  const suggestions = qs("#searchSuggestions");
  searchInput.addEventListener("focus", () => {
    suggestions.hidden = false;
    searchInput.setAttribute("aria-expanded", "true");
  });
  searchInput.addEventListener("input", () => {
    const value = searchInput.value.trim().toLowerCase();
    qsa("[data-search-result]").forEach((button) => {
      const text = button.textContent.toLowerCase();
      button.hidden = value && !text.includes(value);
    });
    suggestions.hidden = false;
    searchInput.setAttribute("aria-expanded", "true");
  });
  qsa("[data-search-result]").forEach((button) => button.addEventListener("click", () => {
    searchInput.value = button.dataset.searchResult;
    suggestions.hidden = true;
    showToast(`${button.dataset.searchResult} selected.`);
  }));

  qs("#unitSelect").addEventListener("change", (event) => {
    chartState.unitLabel = event.target.value.includes("Percent") ? "Percent" : event.target.value;
    const unitText = event.target.value.includes(",") ? event.target.value.split(",")[0] : event.target.value;
    qs("#summaryUnits").textContent = unitText;
    qs("#notesUnits").textContent = event.target.value;
    renderAllCharts();
    showToast(`Units changed to ${event.target.value}.`);
  });
  qs("#frequencySelect").addEventListener("change", (event) => {
    qs("#summaryFrequency").textContent = event.target.value;
    qs("#notesFrequency").textContent = event.target.value;
    showToast(`Frequency changed to ${event.target.value}.`);
  });
  qs("#applyFormulaButton").addEventListener("click", () => showToast(`Formula "${qs("#formulaInput").value.trim() || "a"}" applied.`));
  qs("#addSeriesButton").addEventListener("click", () => showToast("Series search added to formula workspace."));
  qsa("[data-add-line]").forEach((button) => button.addEventListener("click", () => showToast(`${button.dataset.addLine} added as a comparison line.`)));
  qs("#createLineButton").addEventListener("click", () => showToast("New line created."));
  qs("#needHelpButton").addEventListener("click", () => showToast("Formula help opened."));

  qsa("#colorSwatches button").forEach((button) => button.addEventListener("click", () => {
    qsa("#colorSwatches button").forEach((swatch) => swatch.classList.remove("active"));
    button.classList.add("active");
    chartState.lineColor = button.style.getPropertyValue("--swatch").trim();
    document.documentElement.style.setProperty("--line-color", chartState.lineColor);
    renderAllCharts();
    showToast(`Line color changed to ${button.getAttribute("aria-label")}.`);
  }));
  qs("#lineWidthRange").addEventListener("input", (event) => {
    chartState.lineWidth = Number(event.target.value);
    document.documentElement.style.setProperty("--line-width", chartState.lineWidth);
    renderAllCharts();
    showToast(`Line width set to ${event.target.value}.`);
  });
  qs("#showRecessions").addEventListener("change", (event) => {
    chartState.showRecessions = event.target.checked;
    renderAllCharts();
    const status = event.target.checked ? "Recession shading on" : "Recession shading off";
    qs("#recessionStatus").textContent = status;
    showToast(status + ".");
  });
  qs("#lineStyleSelect").addEventListener("change", (event) => {
    chartState.lineStyle = event.target.value;
    renderAllCharts();
    showToast(`Line style changed to ${event.target.value}.`);
  });
  qs("#resetFormatButton").addEventListener("click", () => {
    chartState.lineColor = "#0071dc";
    chartState.lineWidth = 2.5;
    chartState.showRecessions = true;
    chartState.lineStyle = "solid";
    document.documentElement.style.setProperty("--line-color", chartState.lineColor);
    document.documentElement.style.setProperty("--line-width", chartState.lineWidth);
    qs("#lineWidthRange").value = "2.5";
    qs("#showRecessions").checked = true;
    qs("#lineStyleSelect").value = "solid";
    qsa("#colorSwatches button").forEach((swatch, index) => swatch.classList.toggle("active", index === 0));
    renderAllCharts();
    showToast("Graph formatting reset.");
  });

  qs("#newsletterForm").addEventListener("submit", (event) => {
    event.preventDefault();
    showToast("Newsletter subscription captured for this demo.");
  });
}

function init() {
  if (series.length) {
    chartState.from = meta.firstDate || series[0].date;
    chartState.to = meta.latestDate || series[series.length - 1].date;
    const latest = [...series].reverse().find((point) => point.value !== null);
    if (latest) {
      qs("#latestObservation").textContent = `${formatDisplayMonth(latest.date)}: ${formatNumber(latest.value)}`;
    }
  }
  updateDateInputs();
  renderAllCharts();
  renderSeriesTable();
  initInteractions();
}

init();
