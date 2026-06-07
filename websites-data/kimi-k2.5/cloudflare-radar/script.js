const routeCopy = {
  overview: {
    title: "Internet insights for every network",
    subtitle: "Near real-time traffic, security, routing, DNS, connectivity, and adoption signals observed across Cloudflare's global network.",
    target: "overview",
    chartTitle: "Internet traffic",
    chartDescription: "Normalized request volume across the selected region."
  },
  traffic: {
    title: "Internet traffic",
    subtitle: "Track request volume, bandwidth, traffic anomalies, bot activity, and device mix by location and time range.",
    target: "traffic",
    chartTitle: "HTTP request traffic",
    chartDescription: "Traffic index measured against the selected comparison window."
  },
  security: {
    title: "Security and attacks",
    subtitle: "Monitor HTTP DDoS mitigations, Layer 3/4 vectors, bot signals, and attack patterns across the Internet.",
    target: "security",
    chartTitle: "Attack activity",
    chartDescription: "Normalized mitigation events by hour for the selected scope."
  },
  connectivity: {
    title: "Connectivity and quality",
    subtitle: "Review Internet disruptions, latency, speed, availability, and resolver quality by country and network.",
    target: "connectivity",
    chartTitle: "Connectivity signal",
    chartDescription: "Observed traffic changes compared with baseline."
  },
  routing: {
    title: "Routing",
    subtitle: "Inspect BGP announcements, withdrawals, AS ranking, route leaks, and RPKI status.",
    target: "routing",
    chartTitle: "BGP update activity",
    chartDescription: "Announcement and withdrawal volume across selected networks."
  },
  dns: {
    title: "DNS",
    subtitle: "Explore 1.1.1.1 resolver traffic, query types, DNSSEC, transport protocols, and top TLDs.",
    target: "dns",
    chartTitle: "DNS traffic",
    chartDescription: "Resolver query activity by type and transport."
  },
  domains: {
    title: "Domain rankings",
    subtitle: "Explore popular domains and category rankings based on anonymized traffic patterns.",
    target: "domain-rankings",
    chartTitle: "Domain ranking movement",
    chartDescription: "Relative visibility of top destinations over the selected period."
  },
  bots: {
    title: "Bot traffic",
    subtitle: "Analyze automated traffic, AI crawler behavior, verified bots, and bot score distribution.",
    target: "traffic-type",
    chartTitle: "Bot traffic mix",
    chartDescription: "Automated and human request share across the selected scope."
  },
  adoption: {
    title: "Adoption and usage",
    subtitle: "Measure IPv6, HTTP/3, QUIC, TLS 1.3, and other modern Internet protocol adoption.",
    target: "protocols",
    chartTitle: "Protocol adoption trend",
    chartDescription: "Share of traffic using the selected protocol family."
  },
  reports: {
    title: "Reports and analysis",
    subtitle: "Read Radar research briefs, quarterly reports, outage writeups, and threat analysis.",
    target: "reports",
    chartTitle: "Report topic interest",
    chartDescription: "Traffic and security themes appearing across recent Radar reports."
  },
  outages: {
    title: "Internet outages",
    subtitle: "Investigate traffic drops, availability changes, and regional Internet disruptions.",
    target: "connectivity",
    chartTitle: "Availability signal",
    chartDescription: "Observed traffic change compared with the same period baseline."
  },
  "data-explorer": {
    title: "Data Explorer",
    subtitle: "Build Radar queries, inspect dimensions, and export chart, table, CSV, or API URL outputs.",
    target: "data-explorer",
    chartTitle: "Explorer preview",
    chartDescription: "Query result preview for the selected dataset."
  }
};

const locations = {
  "worldwide": {
    name: "Worldwide",
    meta: "All locations and networks",
    code: "worldwide",
    requests: "42.8M",
    attacks: "8.7M",
    latency: "37 ms",
    adoption: "36.2%",
    changes: ["+3.4%", "+12.1%", "-1.8%", "+0.9%"],
    series: [52, 55, 61, 58, 62, 66, 71, 69, 73, 78, 76, 82, 88, 84, 79, 74, 77, 83, 86, 81, 72, 66, 61, 58],
    bandwidth: [45, 47, 49, 51, 53, 60, 64, 67, 65, 71, 75, 79, 77, 74, 70, 72, 76, 80, 82, 78, 70, 63, 57, 52],
    latencySeries: [67, 66, 64, 63, 61, 59, 57, 56, 54, 55, 53, 51, 50, 52, 53, 55, 56, 57, 59, 60, 61, 62, 64, 65],
    attackSeries: [34, 39, 42, 44, 51, 56, 60, 58, 66, 71, 74, 76, 82, 88, 85, 79, 73, 68, 63, 57, 52, 48, 43, 40]
  },
  "united-states": {
    name: "United States",
    meta: "North America",
    code: "US",
    requests: "12.4M",
    attacks: "2.1M",
    latency: "29 ms",
    adoption: "43.7%",
    changes: ["+2.1%", "+7.8%", "-3.2%", "+1.4%"],
    series: [48, 52, 55, 59, 63, 72, 78, 82, 86, 84, 80, 78, 76, 77, 81, 85, 88, 86, 79, 70, 64, 58, 54, 50],
    bandwidth: [44, 48, 52, 56, 60, 68, 74, 79, 82, 80, 77, 75, 73, 75, 79, 83, 85, 82, 76, 68, 60, 55, 50, 47],
    latencySeries: [58, 57, 56, 55, 53, 51, 50, 48, 47, 48, 49, 50, 51, 50, 49, 47, 46, 45, 47, 49, 51, 53, 55, 56],
    attackSeries: [30, 34, 38, 42, 45, 49, 54, 58, 61, 65, 69, 76, 81, 84, 82, 78, 70, 64, 59, 52, 48, 45, 40, 36]
  },
  germany: {
    name: "Germany",
    meta: "Europe",
    code: "DE",
    requests: "5.9M",
    attacks: "790K",
    latency: "24 ms",
    adoption: "39.4%",
    changes: ["+4.6%", "+4.2%", "-2.5%", "+0.6%"],
    series: [42, 44, 47, 53, 60, 68, 76, 79, 74, 70, 66, 62, 65, 71, 78, 83, 86, 80, 74, 68, 58, 51, 47, 44],
    bandwidth: [39, 41, 45, 50, 58, 66, 71, 76, 73, 68, 64, 61, 63, 69, 75, 81, 84, 78, 72, 65, 55, 49, 44, 41],
    latencySeries: [55, 54, 53, 51, 50, 49, 48, 48, 49, 51, 52, 53, 52, 50, 49, 48, 47, 48, 50, 51, 52, 53, 54, 55],
    attackSeries: [26, 30, 33, 38, 42, 47, 53, 59, 66, 70, 72, 69, 65, 62, 66, 71, 76, 73, 68, 58, 50, 45, 38, 32]
  },
  japan: {
    name: "Japan",
    meta: "Asia Pacific",
    code: "JP",
    requests: "4.6M",
    attacks: "640K",
    latency: "31 ms",
    adoption: "34.8%",
    changes: ["+5.3%", "+9.0%", "-1.1%", "+1.1%"],
    series: [55, 51, 48, 45, 43, 46, 52, 59, 64, 69, 73, 76, 82, 86, 89, 84, 80, 75, 70, 68, 65, 62, 59, 57],
    bandwidth: [51, 48, 45, 42, 40, 43, 49, 56, 62, 66, 70, 74, 79, 83, 86, 82, 77, 72, 68, 65, 62, 59, 56, 53],
    latencySeries: [61, 62, 63, 64, 65, 64, 62, 60, 58, 56, 55, 54, 53, 52, 51, 52, 54, 56, 58, 59, 60, 61, 61, 62],
    attackSeries: [33, 36, 39, 45, 52, 58, 63, 68, 72, 77, 82, 86, 84, 80, 75, 70, 68, 64, 60, 55, 50, 47, 43, 39]
  },
  brazil: {
    name: "Brazil",
    meta: "Latin America",
    code: "BR",
    requests: "3.8M",
    attacks: "510K",
    latency: "46 ms",
    adoption: "28.5%",
    changes: ["+1.7%", "+15.4%", "+2.8%", "+0.3%"],
    series: [36, 38, 41, 44, 48, 53, 57, 60, 63, 66, 70, 75, 80, 86, 83, 78, 72, 68, 64, 59, 52, 47, 42, 39],
    bandwidth: [34, 36, 39, 43, 46, 50, 54, 58, 60, 63, 67, 72, 77, 82, 80, 75, 69, 65, 61, 56, 49, 44, 40, 37],
    latencySeries: [66, 68, 69, 70, 71, 70, 69, 68, 67, 66, 65, 64, 63, 62, 63, 64, 65, 67, 69, 70, 71, 70, 69, 68],
    attackSeries: [38, 44, 48, 52, 59, 66, 72, 78, 84, 88, 82, 76, 70, 65, 61, 58, 55, 51, 46, 42, 39, 36, 34, 32]
  },
  india: {
    name: "India",
    meta: "Asia",
    code: "IN",
    requests: "7.7M",
    attacks: "1.3M",
    latency: "43 ms",
    adoption: "46.1%",
    changes: ["+6.8%", "+18.6%", "-0.9%", "+2.2%"],
    series: [44, 43, 42, 44, 49, 58, 67, 74, 78, 82, 87, 91, 88, 84, 81, 78, 76, 74, 70, 66, 61, 55, 50, 47],
    bandwidth: [42, 41, 40, 42, 47, 55, 63, 70, 75, 79, 84, 88, 86, 82, 79, 75, 73, 71, 67, 63, 58, 52, 48, 45],
    latencySeries: [70, 69, 68, 67, 65, 63, 61, 60, 59, 58, 57, 58, 59, 60, 62, 63, 64, 65, 66, 67, 68, 69, 69, 70],
    attackSeries: [42, 48, 54, 60, 68, 75, 82, 88, 91, 86, 82, 78, 74, 70, 67, 64, 61, 58, 55, 52, 49, 46, 44, 42]
  },
  "united-kingdom": {
    name: "United Kingdom",
    meta: "Europe",
    code: "GB",
    requests: "4.2M",
    attacks: "710K",
    latency: "26 ms",
    adoption: "38.2%",
    changes: ["+2.9%", "+6.1%", "-1.6%", "+0.8%"],
    series: [39, 43, 47, 52, 61, 69, 75, 78, 74, 68, 64, 61, 65, 72, 79, 84, 82, 76, 70, 62, 54, 48, 44, 41],
    bandwidth: [37, 40, 44, 49, 58, 66, 72, 76, 72, 66, 62, 59, 63, 70, 76, 81, 79, 73, 67, 59, 51, 45, 41, 39],
    latencySeries: [56, 55, 54, 52, 51, 50, 49, 48, 49, 50, 51, 52, 51, 50, 48, 47, 48, 49, 51, 52, 53, 54, 55, 55],
    attackSeries: [29, 33, 38, 45, 51, 57, 63, 68, 72, 69, 65, 61, 64, 70, 76, 80, 77, 69, 62, 55, 48, 42, 37, 33]
  },
  australia: {
    name: "Australia",
    meta: "Oceania",
    code: "AU",
    requests: "2.9M",
    attacks: "430K",
    latency: "35 ms",
    adoption: "32.7%",
    changes: ["+4.1%", "+5.5%", "-0.7%", "+1.0%"],
    series: [51, 48, 45, 43, 46, 51, 58, 65, 72, 79, 84, 87, 83, 78, 74, 71, 68, 66, 63, 60, 58, 56, 54, 52],
    bandwidth: [48, 45, 42, 40, 43, 49, 55, 62, 69, 75, 80, 83, 79, 74, 70, 67, 64, 62, 60, 57, 55, 53, 51, 49],
    latencySeries: [62, 63, 64, 63, 62, 61, 59, 57, 56, 55, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 63, 62, 62, 61],
    attackSeries: [31, 35, 40, 45, 49, 55, 61, 67, 73, 78, 82, 79, 74, 70, 66, 62, 58, 54, 50, 46, 42, 39, 36, 33]
  }
};

const domainRankings = [
  { domain: "google.com", delta: "+1", category: "all" },
  { domain: "facebook.com", delta: "0", category: "social" },
  { domain: "youtube.com", delta: "-1", category: "video" },
  { domain: "tiktok.com", delta: "+3", category: "social" },
  { domain: "chatgpt.com", delta: "+5", category: "ai" },
  { domain: "cloudflare.com", delta: "+2", category: "all" },
  { domain: "openai.com", delta: "+4", category: "ai" },
  { domain: "netflix.com", delta: "-2", category: "video" }
];

const searchItems = [
  ["Dataset", "HTTP requests", "Traffic, bytes, request volume", "traffic"],
  ["Dataset", "Traffic by type", "Bot, human, mobile, desktop, IPv6", "traffic"],
  ["Security", "DDoS attacks", "Layer 7 and Layer 3/4 mitigation trends", "security"],
  ["Connectivity", "Internet outages", "Traffic anomalies and disruptions", "outages"],
  ["Routing", "BGP announcements", "AS Rank, route leaks, RPKI", "routing"],
  ["DNS", "1.1.1.1 resolver", "Query types and DNS transport protocols", "dns"],
  ["Ranking", "Top domains", "Domain and category rankings", "domains"],
  ["Tool", "Data Explorer", "Build Radar API queries", "data-explorer"],
  ["Report", "Internet trends report", "Research and quarterly analysis", "reports"]
];

const drawerContent = {
  traffic: ["HTTP requests", "Current request traffic is above baseline with a steady afternoon peak.", [["Peak index", "88"], ["Average index", "71"], ["Compared with previous period", "+3.4%"]]],
  security: ["Mitigated attacks", "Layer 7 mitigation activity is elevated, with managed rules and rate limiting contributing the largest share.", [["Mitigated requests", "8.7M"], ["Largest vector", "HTTP DDoS"], ["Change", "+12.1%"]]],
  connectivity: ["Connectivity quality", "Median latency and availability signals for the selected scope.", [["Median latency", "37 ms"], ["Availability", "99.93%"], ["Packet loss sample", "0.07%"]]],
  dns: ["DNS resolver details", "DNS query type, transport mix, and resolver usage summary.", [["A queries", "58%"], ["AAAA queries", "24%"], ["DoH share", "52%"]]],
  "traffic-type": ["Traffic by type", "Breakdown across clients, devices, IP versions, and automation classes.", [["Human traffic", "69%"], ["Bot traffic", "31%"], ["Mobile share", "42%"]]],
  "attack-apac": ["APAC attack cluster", "High HTTP DDoS activity detected around Asia Pacific edge locations.", [["Intensity", "High"], ["Primary mitigation", "Managed rules"], ["Observed duration", "46 min"]]],
  "attack-eu": ["Europe attack cluster", "Moderate increase in Layer 7 mitigations across European locations.", [["Intensity", "Medium"], ["Top vector", "Credential stuffing"], ["Observed duration", "22 min"]]],
  "attack-na": ["North America attack cluster", "Bursty request patterns are being mitigated automatically.", [["Intensity", "Medium"], ["Top vector", "HTTP flood"], ["Observed duration", "31 min"]]],
  domain: ["Domain details", "Selected domain ranking and visibility summary.", [["Category", "Search / portal"], ["Rank movement", "+1"], ["Visible in", "178 locations"]]],
  "outage-feed": ["Outage feed", "Recent traffic anomalies and availability drops from Radar signals.", [["Open events", "4"], ["Resolved events", "19"], ["Largest impact", "South Asia"]]],
  speed: ["Internet speed test", "Simulated speed test workflow for agent interaction tests.", [["Download", "186 Mbps"], ["Upload", "49 Mbps"], ["Latency", "24 ms"]]],
  "outage-1": ["Traffic anomaly", "Elevated request volume in South Asia, mostly mobile networks.", [["Started", "14:18 UTC"], ["Status", "Monitoring"], ["Impact", "Regional"]]],
  "outage-2": ["Elevated DDoS activity", "Layer 7 mitigations rose above baseline for retail and media zones.", [["Started", "11:02 UTC"], ["Status", "Mitigated"], ["Impact", "Low"]]],
  "outage-3": ["Routing change observed", "New announcements detected across several transit providers.", [["Started", "08:31 UTC"], ["Status", "Observed"], ["Impact", "Informational"]]],
  "outage-4": ["Availability drop", "Regional ISP cluster traffic is below expected baseline.", [["Started", "03:45 UTC"], ["Status", "Investigating"], ["Impact", "Moderate"]]],
  routing: ["BGP and AS Rank", "Autonomous system ranking, announcements, withdrawals, and RPKI status.", [["Announcements", "18.4K"], ["Withdrawals", "7.2K"], ["ROA valid", "91%"]]],
  "report-trends": ["Internet trends for the current quarter", "Quarterly digest of traffic, security, and adoption signals across the Cloudflare network.", [["Top growth region", "South Asia"], ["Traffic vs prior quarter", "+6.8%"], ["Adoption highlight", "HTTP/3 +4 pts"]]],
  "report-ai": ["AI bot traffic and crawler behavior", "Brief on automated AI agents, crawlers, and the share of traffic they represent.", [["AI bot share", "12.4%"], ["Top crawler", "GPTBot"], ["Robots.txt blocks", "31%"]]],
  "report-outages": ["Global outages and network resilience", "Analysis of recent routing changes, availability drops, and resilience signals.", [["Tracked events", "47"], ["Resolved events", "39"], ["Largest impact", "Regional ISP cluster"]]],
  "report-yir": ["Year in review: services and ranking movement", "Annual review of domain rankings, category shifts, and traffic distribution.", [["New entrants", "118"], ["Largest climber", "+22 spots"], ["Top category", "AI / Productivity"]]],
  learn: ["About this chart", "Cloudflare Radar visualizes anonymized signals from Cloudflare's global network. This clone uses deterministic sample data for local interaction testing.", [["Available actions", "copy, share, cite, export"], ["Chart controls", "metric, date, location"], ["Output", "chart, table, CSV, API URL"]]]
};

let currentLocation = "worldwide";
let currentChart = "requests";
let currentRoute = "overview";
let currentPeriod = "24h";
let toastTimer;

const qs = (selector, root = document) => root.querySelector(selector);
const qsa = (selector, root = document) => Array.from(root.querySelectorAll(selector));

function pointsFor(values, width, height, padX, padY) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = Math.max(1, max - min);
  return values.map((value, index) => {
    const x = padX + (index / (values.length - 1)) * (width - padX * 2);
    const y = padY + (1 - (value - min) / range) * (height - padY * 2);
    return [Number(x.toFixed(1)), Number(y.toFixed(1)), value];
  });
}

function showToast(message) {
  const toast = qs("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 1800);
}

function updateSpark(id, values) {
  const element = qs(id);
  if (!element) return;
  element.setAttribute("points", pointsFor(values, 180, 44, 2, 6).map(([x, y]) => `${x},${y}`).join(" "));
}

function chartValues() {
  const location = locations[currentLocation];
  if (currentChart === "bandwidth") return location.bandwidth;
  if (currentChart === "latency") return location.latencySeries;
  if (currentChart === "attacks") return location.attackSeries;
  return location.series;
}

function updateChart() {
  const values = chartValues();
  const pts = pointsFor(values, 820, 330, 64, 45);
  const line = pts.map(([x, y]) => `${x},${y}`).join(" ");
  const area = [`64,275`, ...pts.map(([x, y]) => `${x},${y}`), `780,275`].join(" ");
  const dots = pts.filter((_, index) => index % 4 === 0 || index === pts.length - 1);
  qs("#mainChartLine").setAttribute("points", line);
  qs("#chartArea").setAttribute("points", area);
  qs("#chartDots").innerHTML = dots.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4"></circle>`).join("");
  qs("#hoverLine").setAttribute("x1", pts[pts.length - 5][0]);
  qs("#hoverLine").setAttribute("x2", pts[pts.length - 5][0]);

  const peak = Math.max(...values);
  const low = Math.min(...values);
  const average = Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
  qs("#chartPeak").textContent = peak;
  qs("#chartLow").textContent = low;
  qs("#chartAverage").textContent = average;

  const route = routeCopy[currentRoute] || routeCopy.overview;
  const chartNames = {
    requests: [route.chartTitle, route.chartDescription],
    bandwidth: ["Bandwidth and bytes", "Estimated bytes transferred across the selected scope."],
    latency: ["Median latency", "Request latency index. Lower values indicate faster connectivity."],
    attacks: ["Traffic anomalies", "Detected traffic spikes, mitigations, and anomaly signals."]
  };
  qs("#chartTitle").textContent = chartNames[currentChart][0];
  qs("#chartDescription").textContent = chartNames[currentChart][1];
}

function updateMetrics() {
  const location = locations[currentLocation];
  qs("#selectedLocation").textContent = location.name;
  qs("#selectedLocationMeta").textContent = location.meta;
  qs("#toolbarLocationText").textContent = location.name;
  qs("#scopeSummary").textContent = `${location.name}, all networks`;
  qs("#requestsValue").textContent = location.requests;
  qs("#attacksValue").textContent = location.attacks;
  qs("#latencyValue").textContent = location.latency;
  qs("#adoptionValue").textContent = location.adoption;
  qs("#requestsChange").textContent = location.changes[0];
  qs("#attacksChange").textContent = location.changes[1];
  qs("#latencyChange").textContent = location.changes[2];
  qs("#adoptionChange").textContent = location.changes[3];
  const ipv6 = parseFloat(location.adoption);
  qs("#ipv6Share").textContent = `${ipv6.toFixed(0)}%`;
  qs("#protocolIpv6").textContent = `${ipv6.toFixed(0)}%`;
  qs("#ipv6Bar").style.width = `${ipv6}%`;

  updateSpark("#requestsSpark", location.series.slice(-12));
  updateSpark("#attacksSpark", location.attackSeries.slice(-12));
  updateSpark("#latencySpark", location.latencySeries.slice(-12));
  updateSpark("#adoptionSpark", location.bandwidth.slice(0, 12).map((v, i) => v - 4 + i));
}

function updateProtocolLine(values = locations[currentLocation].bandwidth.slice(0, 12)) {
  const line = pointsFor(values, 310, 110, 10, 12).map(([x, y]) => `${x},${y}`).join(" ");
  qs("#protocolLine").setAttribute("points", line);
}

function closeLocationMenus() {
  qs("#locationMenu").classList.remove("open");
  qs("#toolbarLocationMenu").classList.remove("open");
  qs("#locationButton").setAttribute("aria-expanded", "false");
  qs("#toolbarLocation").setAttribute("aria-expanded", "false");
}

function selectLocation(key) {
  if (!locations[key]) return;
  currentLocation = key;
  qsa("[data-location]").forEach((button) => button.classList.toggle("active", button.dataset.location === key));
  qsa(".map-dot").forEach((dot) => dot.classList.toggle("active", dot.dataset.location === key));
  closeLocationMenus();
  updateMetrics();
  updateChart();
  updateProtocolLine();
  updateApiPreview();
}

function setRoute(routeName, shouldScroll = true) {
  const route = routeCopy[routeName] || routeCopy.overview;
  currentRoute = routeName;
  qs("#pageTitle").textContent = route.title;
  qs("#pageSubtitle").textContent = route.subtitle;
  qsa("[data-route]").forEach((item) => item.classList.toggle("active", item.dataset.route === routeName));
  qsa(".nav-link").forEach((item) => item.classList.toggle("active", item.dataset.route === routeName));
  updateChart();
  closeSearch();
  qs("#sidebar").classList.remove("open");
  if (shouldScroll) {
    const target = qs(`#${route.target}`);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function setPeriod(period, label) {
  currentPeriod = period;
  qsa("[data-period]").forEach((button) => button.classList.toggle("active", button.dataset.period === period));
  qs("#dateLabel").textContent = label || period;
  qs("#dateMenu").classList.remove("open");
  qs("#updatedAt").textContent = period === "24h" ? "2 minutes ago" : period === "7d" ? "15 minutes ago" : "1 hour ago";
  updateApiPreview();
  const lookup = qs("#lookupInput");
  const domainContext = lookup && lookup.value.trim();
  if (domainContext) {
    const detail = qs("#domainDetail p");
    if (detail) detail.textContent = `${domainContext} data refreshed for ${label || period} in ${locations[currentLocation].name}.`;
    showToast(`Filter applied: ${label || period} · ${domainContext}`);
  } else {
    showToast(`Filter applied: ${label || period}`);
  }
}

function renderRankings(filter = "all") {
  const list = filter === "all" ? domainRankings.slice(0, 5) : domainRankings.filter((item) => item.category === filter).slice(0, 5);
  const html = list.map((item, index) => {
    const signClass = item.delta.startsWith("+") ? "up" : item.delta.startsWith("-") ? "down" : "flat";
    return `<button class="domain-row${index === 0 ? " active" : ""}" data-domain="${item.domain}">
      <span class="rank">${index + 1}</span>
      <span class="domain-name">${item.domain}</span>
      <span class="rank-delta ${signClass}">${item.delta}</span>
    </button>`;
  }).join("");
  qs("#domainList").innerHTML = html;
  qs("#rankingTable").innerHTML = domainRankings.map((item, index) => {
    const signClass = item.delta.startsWith("+") ? "up" : item.delta.startsWith("-") ? "down" : "flat";
    return `<button class="domain-row" data-domain="${item.domain}">
      <span class="rank">${index + 1}</span>
      <span class="domain-name">${item.domain}</span>
      <span class="rank-delta ${signClass}">${item.delta}</span>
    </button>`;
  }).join("");
  wireDomainRows();
}

function wireDomainRows() {
  qsa(".domain-row").forEach((row) => {
    row.addEventListener("click", () => {
      qsa(".domain-row").forEach((item) => item.classList.remove("active"));
      row.classList.add("active");
      const domain = row.dataset.domain;
      const item = domainRankings.find((ranking) => ranking.domain === domain);
      qs("#domainDetail strong").textContent = domain;
      qs("#domainDetail p").textContent = `${domain} moved ${item ? item.delta : "0"} positions in ${locations[currentLocation].name}.`;
      openDrawer("domain", domain);
    });
  });
}

function openSearch() {
  const modal = qs("#searchModal");
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  qs("#searchInput").value = "";
  filterSearch("");
  window.setTimeout(() => qs("#searchInput").focus(), 10);
}

function closeSearch() {
  const modal = qs("#searchModal");
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

function renderSearchResults() {
  qs("#searchResults").innerHTML = searchItems.map(([type, title, description, route]) => {
    return `<button data-search-route="${route}"><span>${type}</span><strong>${title}</strong><small>${description}</small></button>`;
  }).join("");
  qsa("[data-search-route]").forEach((button) => {
    button.addEventListener("click", () => setRoute(button.dataset.searchRoute));
  });
}

function filterSearch(value) {
  const query = value.trim().toLowerCase();
  qsa("#searchResults button").forEach((button) => {
    button.classList.toggle("hidden", query && !button.textContent.toLowerCase().includes(query));
  });
}

function closeAllDrawers() {
  qs("#detailDrawer").classList.remove("open");
  qs("#detailDrawer").setAttribute("aria-hidden", "true");
  qs("#filterDrawer").classList.remove("open");
  qs("#filterDrawer").setAttribute("aria-hidden", "true");
}

function openDrawer(key, overrideTitle) {
  closeAllDrawers();
  const content = drawerContent[key] || drawerContent.learn;
  qs("#drawerKicker").textContent = "Radar details";
  qs("#drawerTitle").textContent = overrideTitle || content[0];
  qs("#drawerBody").innerHTML = `
    <p>${content[1]}</p>
    ${content[2].map(([label, value]) => `<div class="drawer-stat"><span>${label}</span><strong>${value}</strong></div>`).join("")}
    <button class="solid-button" data-open-modal="dataExplorerModal">View in Data Explorer</button>
    <button class="outline-button" data-action="download">Download CSV</button>
  `;
  qs("#detailDrawer").classList.add("open");
  qs("#detailDrawer").setAttribute("aria-hidden", "false");
  wireDynamicButtons(qs("#drawerBody"));
}

function closeDrawer() {
  qs("#detailDrawer").classList.remove("open");
  qs("#detailDrawer").setAttribute("aria-hidden", "true");
}

function openModal(id) {
  const layer = qs("#modalLayer");
  qsa(".modal", layer).forEach((modal) => modal.classList.remove("active"));
  const modal = qs(`#${id}`);
  if (!modal) return;
  layer.classList.add("open");
  layer.setAttribute("aria-hidden", "false");
  modal.classList.add("active");
}

function closeModal() {
  const layer = qs("#modalLayer");
  layer.classList.remove("open");
  layer.setAttribute("aria-hidden", "true");
  qsa(".modal", layer).forEach((modal) => modal.classList.remove("active"));
}

async function copyText(text, toast) {
  try {
    await navigator.clipboard.writeText(text);
    showToast(toast);
  } catch {
    showToast(toast);
  }
}

function handleAction(action, moduleName = currentRoute) {
  const location = locations[currentLocation].name;
  const text = `Cloudflare Radar: ${moduleName} / ${location} / ${currentPeriod}`;
  if (action === "copy") copyText(`#${moduleName}`, "Copied chart link");
  if (action === "share") copyText(text, "Share text copied");
  if (action === "download") showToast("CSV download prepared");
  if (action === "embed") copyText(`<iframe src="radar-${moduleName}.html"></iframe>`, "Embed code copied");
  if (action === "data") openModal("dataExplorerModal");
  if (action === "cite") {
    qs("#citationText").textContent = `Cloudflare Radar, ${moduleName}, ${location}, ${currentPeriod}.`;
    openModal("citationModal");
  }
  if (action === "learn") openDrawer("learn");
}

function updateApiPreview() {
  const dataset = qs("#datasetSelect") ? qs("#datasetSelect").value : "HTTP requests";
  const normalized = dataset.toLowerCase().replace(/ /g, "_");
  qs("#apiPreview").textContent = `GET /api/v1/radar/${normalized}/summary?dateRange=${currentPeriod}&location=${locations[currentLocation].code}`;
}

function updateModalApiPreview() {
  const dataset = qs("#modalDataset").value;
  const dateRange = qs("#modalDateRange").value;
  const location = qs("#modalLocation").value;
  const normalized = dataset.toLowerCase().replace(/ /g, "_");
  const rangeMap = { "Last 24 hours": "24h", "Last 7 days": "7d", "Last 30 days": "30d" };
  const locMap = { "Worldwide": "worldwide", "United States": "US", "Japan": "JP", "Germany": "DE" };
  qs("#modalApiPreview").textContent = `GET /api/v1/radar/${normalized}/timeseries?name=${normalized.toUpperCase()}&dateRange=${rangeMap[dateRange] || "24h"}&location=${locMap[location] || "worldwide"}`;
}

function showQueryResults() {
  const dataset = qs("#modalDataset").value;
  const output = qs("#modalOutput").value;
  const location = qs("#modalLocation").value;
  const dateRange = qs("#modalDateRange").value;
  const container = qs("#queryResults");

  if (output === "API URL") {
    container.innerHTML = `<div class="result-caption">API endpoint</div><pre class="api-preview">${qs("#modalApiPreview").textContent}</pre>`;
  } else if (output === "Table") {
    container.innerHTML = `
      <div class="result-caption">${dataset} &mdash; ${location}, ${dateRange}</div>
      <table class="result-table">
        <thead><tr><th>Time</th><th>Value</th><th>Change</th></tr></thead>
        <tbody>
          <tr><td>00:00</td><td>1,204</td><td>+2.1%</td></tr>
          <tr><td>04:00</td><td>1,387</td><td>+4.3%</td></tr>
          <tr><td>08:00</td><td>2,156</td><td>+12.7%</td></tr>
          <tr><td>12:00</td><td>2,841</td><td>+8.9%</td></tr>
          <tr><td>16:00</td><td>2,534</td><td>+6.2%</td></tr>
          <tr><td>20:00</td><td>1,892</td><td>+3.5%</td></tr>
        </tbody>
      </table>`;
  } else if (output === "CSV") {
    container.innerHTML = `<div class="result-caption">${dataset} &mdash; ${location}, ${dateRange}</div><pre class="api-preview">time,value,change
00:00,1204,+2.1%
04:00,1387,+4.3%
08:00,2156,+12.7%
12:00,2841,+8.9%
16:00,2534,+6.2%
20:00,1892,+3.5%</pre>`;
  } else {
    container.innerHTML = `<div class="result-caption">${dataset} &mdash; ${location}, ${dateRange}</div><div class="result-chart-placeholder">Chart preview for ${dataset.toLowerCase()} data (${dateRange.toLowerCase()})</div>`;
  }
}

function wireDynamicButtons(root = document) {
  qsa("[data-open-modal]", root).forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      openModal(button.dataset.openModal);
    });
  });
  qsa("[data-open-drawer]", root).forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      openDrawer(button.dataset.openDrawer);
    });
  });
  qsa("[data-action]", root).forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const module = button.closest("[data-module]");
      handleAction(button.dataset.action, module ? module.dataset.module : currentRoute);
    });
  });
}

function initialize() {
  renderSearchResults();
  renderRankings();
  updateMetrics();
  updateChart();
  updateProtocolLine();
  updateApiPreview();
  wireDynamicButtons();

  qsa("[data-route]").forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      setRoute(item.dataset.route);
    });
  });

  qsa("[data-toggle-group]").forEach((button) => {
    button.addEventListener("click", () => button.closest(".nav-group").classList.toggle("open"));
  });

  qs("#sideSearch").addEventListener("input", (event) => {
    const query = event.target.value.trim().toLowerCase();
    qsa(".side-link").forEach((link) => link.style.display = link.textContent.toLowerCase().includes(query) ? "" : "none");
  });

  qsa("[data-location]").forEach((button) => {
    button.addEventListener("click", () => selectLocation(button.dataset.location));
  });

  qs("#locationButton").addEventListener("click", () => {
    const menu = qs("#locationMenu");
    const open = !menu.classList.contains("open");
    closeLocationMenus();
    menu.classList.toggle("open", open);
    qs("#locationButton").setAttribute("aria-expanded", String(open));
  });
  qs("#toolbarLocation").addEventListener("click", () => {
    const menu = qs("#toolbarLocationMenu");
    const open = !menu.classList.contains("open");
    closeLocationMenus();
    menu.classList.toggle("open", open);
    qs("#toolbarLocation").setAttribute("aria-expanded", String(open));
  });

  qs("#dateButton").addEventListener("click", () => qs("#dateMenu").classList.toggle("open"));
  qsa("[data-period]").forEach((button) => {
    button.addEventListener("click", () => setPeriod(button.dataset.period, button.textContent.trim()));
  });
  qs("#applyCustomDate").addEventListener("click", () => {
    const label = `${qs("#startDate").value} to ${qs("#endDate").value}`;
    setPeriod("custom", label);
  });

  qsa("[data-chart]").forEach((button) => {
    button.addEventListener("click", () => {
      currentChart = button.dataset.chart;
      qsa("[data-chart]").forEach((tab) => tab.classList.toggle("active", tab === button));
      updateChart();
    });
  });

  qsa("[data-menu-button]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const menu = button.parentElement.querySelector(".action-menu");
      qsa(".action-menu").forEach((other) => {
        if (other !== menu) {
          other.classList.remove("open");
          const otherBtn = other.parentElement.querySelector("[data-menu-button]");
          if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
        }
      });
      const isOpen = menu.classList.toggle("open");
      button.setAttribute("aria-expanded", String(isOpen));
    });
  });

  qsa("[data-ranking-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      qsa("[data-ranking-filter]").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderRankings(button.dataset.rankingFilter);
    });
  });

  qsa(".protocol-card").forEach((card, index) => {
    card.addEventListener("click", () => {
      qsa(".protocol-card").forEach((item) => item.classList.remove("active"));
      card.classList.add("active");
      const base = locations[currentLocation].series.slice(index, index + 12);
      updateProtocolLine(base.length === 12 ? base : locations[currentLocation].bandwidth.slice(0, 12));
      showToast(`${card.dataset.protocol} selected`);
    });
  });

  qsa("[data-dns]").forEach((button) => {
    button.addEventListener("click", () => {
      qs(".donut span").textContent = button.dataset.dns;
      showToast(`${button.dataset.dns} query type selected`);
    });
  });

  qs("#openSearch").addEventListener("click", openSearch);
  qs("#closeSearch").addEventListener("click", closeSearch);
  qs("#searchInput").addEventListener("input", (event) => filterSearch(event.target.value));
  qs("#searchModal").addEventListener("click", (event) => {
    if (event.target.id === "searchModal") closeSearch();
  });

  qs("#shareButton").addEventListener("click", () => handleAction("share", currentRoute));
  qs("#exportButton").addEventListener("click", () => handleAction("download", currentRoute));
  qs("#copyCitation").addEventListener("click", () => copyText(qs("#citationText").textContent, "Citation copied"));

  qs("#openFilters").addEventListener("click", () => {
    closeAllDrawers();
    qs("#filterDrawer").classList.add("open");
    qs("#filterDrawer").setAttribute("aria-hidden", "false");
  });
  qs("#closeFilters").addEventListener("click", () => {
    qs("#filterDrawer").classList.remove("open");
    qs("#filterDrawer").setAttribute("aria-hidden", "true");
  });
  qs("#applyFilters").addEventListener("click", () => {
    qs("#filterDrawer").classList.remove("open");
    qs("#filterDrawer").setAttribute("aria-hidden", "true");
    showToast("Filters applied");
  });
  qs("#resetFilters").addEventListener("click", () => {
    selectLocation("worldwide");
    setPeriod("24h", "Last 24 hours");
    showToast("Filters reset");
  });

  qs("#closeDrawer").addEventListener("click", closeDrawer);
  qs("#modalLayer").addEventListener("click", (event) => {
    if (event.target.id === "modalLayer") closeModal();
  });
  qsa("[data-close-modal]").forEach((button) => button.addEventListener("click", closeModal));

  qs("#queryBuilder").addEventListener("submit", (event) => {
    event.preventDefault();
    updateApiPreview();
    showToast("Query executed");
  });
  ["#datasetSelect", "#dimensionSelect", "#formatSelect"].forEach((selector) => {
    qs(selector).addEventListener("change", updateApiPreview);
  });

  ["#modalDataset", "#modalLocation", "#modalDateRange", "#modalOutput"].forEach((selector) => {
    qs(selector).addEventListener("change", updateModalApiPreview);
  });

  qs("#queryResults").parentElement.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-action='download']");
    if (btn && btn.closest("#dataExplorerModal")) {
      showQueryResults();
    }
  });

  qs("#lookupInput").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const value = event.target.value.trim() || "example.com";
      openDrawer("domain", value);
    }
  });

  qs("#runScanner").addEventListener("click", () => {
    const input = qs("#scannerInput").value.trim() || "https://example.com";
    qs("#scanResult").textContent = `${input} scanned. No threats detected. TLS and DNS records are reachable.`;
  });

  qs("#themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark");
    showToast(document.body.classList.contains("dark") ? "Dark theme enabled" : "Light theme enabled");
  });
  qs("#languageButton").addEventListener("click", () => showToast("Language menu opened"));
  qs("#mobileMenuButton").addEventListener("click", () => qs("#sidebar").classList.toggle("open"));

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".scope-card") && !event.target.closest(".location-field")) {
      closeLocationMenus();
    }
    if (!event.target.closest(".module-actions")) qsa(".action-menu").forEach((menu) => menu.classList.remove("open"));
    if (!event.target.closest("#dateButton") && !event.target.closest("#dateMenu")) qs("#dateMenu").classList.remove("open");
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "/" && !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) {
      event.preventDefault();
      openSearch();
    }
    if (event.key === "Escape") {
      closeSearch();
      closeModal();
      closeDrawer();
      qs("#filterDrawer").classList.remove("open");
      qs("#filterDrawer").setAttribute("aria-hidden", "true");
      closeLocationMenus();
      qs("#dateMenu").classList.remove("open");
      qs("#sidebar").classList.remove("open");
    }
  });
}

document.addEventListener("DOMContentLoaded", initialize);
