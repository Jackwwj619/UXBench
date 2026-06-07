const SNIPPETS = {
  python: `from pelagic import Client

db = Client("https://api.pelagic.dev", api_key="pk_live_…")

index = db.create_index(
    name="docs",
    dim=1536,
    metric="cosine",
    hybrid=True,
)

index.upsert([
    {"id": "doc-001", "vector": embed(text), "filter": {"lang": "en"}}
])

hits = index.query(
    vector=embed("what is hnsw"),
    top_k=10,
    filter={"lang": "en"},
    rerank="bge-large",
)`,
  node: `import { Pelagic } from "pelagic";

const db = new Pelagic({ apiKey: "pk_live_…" });

const index = await db.createIndex({
  name: "docs",
  dim: 1536,
  metric: "cosine",
  hybrid: true,
});

await index.upsert([
  { id: "doc-001", vector: await embed(text), filter: { lang: "en" } },
]);

const hits = await index.query({
  vector: await embed("what is hnsw"),
  topK: 10,
  filter: { lang: "en" },
  rerank: "bge-large",
});`,
  go: `package main

import "github.com/pelagic-io/pelagic-go"

func main() {
    db := pelagic.New("pk_live_…")
    idx, _ := db.CreateIndex("docs", 1536, pelagic.Cosine, pelagic.Hybrid)
    idx.Upsert([]pelagic.Row{
        {ID: "doc-001", Vector: embed(text), Filter: pelagic.M{"lang": "en"}},
    })
    hits, _ := idx.Query(pelagic.Q{
        Vector: embed("what is hnsw"), TopK: 10, Filter: pelagic.M{"lang": "en"},
        Rerank: "bge-large",
    })
    _ = hits
}`,
  curl: `curl -X POST https://api.pelagic.dev/v1/indexes/docs/query \\
  -H "Authorization: Bearer pk_live_…" \\
  -H "Content-Type: application/json" \\
  -d '{
    "vector": [0.0123, -0.0876, ...],
    "top_k": 10,
    "filter": {"lang": "en"},
    "rerank": "bge-large"
  }'`
};

const BENCH_LINES = [
  { dataset: "YFCC-100M", metric: "Recall@10: 0.987" },
  { dataset: "SIFT-1B",   metric: "p95 latency: 18ms" },
  { dataset: "GIST-1M",   metric: "Throughput: 42k QPS" },
  { dataset: "Deep1B",    metric: "Index build: 2.3× faster" },
];

const LOGOS = [
  ["Bracken Robotics","BR"],
  ["Halcyon Health","HH"],
  ["Northwind Labs","NL"],
  ["Cendrillon Films","CF"],
  ["Quanta Maps","QM"],
  ["Foxglove Bio","FB"],
  ["Tide Engine","TE"],
];

function renderHero(lang){
  document.getElementById("heroCode").textContent = SNIPPETS[lang];
  document.querySelectorAll(".code-tabs .tab").forEach(t => {
    const isActive = t.dataset.lang === lang;
    t.classList.toggle("active", isActive);
    t.setAttribute("aria-selected", isActive ? "true" : "false");
    t.setAttribute("tabindex", isActive ? "0" : "-1");
  });
  const activeTab = document.querySelector(`.code-tabs .tab[data-lang="${lang}"]`);
  const pane = document.getElementById("codePane");
  if (activeTab && pane) pane.setAttribute("aria-labelledby", activeTab.id);
}

function animateStars(){
  const el = document.getElementById("starCount");
  if (!el) return;
  const target = 18243;
  const start = performance.now();
  const dur = 1200;
  function step(t){
    const p = Math.min(1, (t - start) / dur);
    const eased = 1 - Math.pow(1 - p, 3);
    const v = Math.round(target * eased);
    el.textContent = v >= 1000 ? (v/1000).toFixed(1) + "k" : v;
    if(p < 1) requestAnimationFrame(step);
    else el.textContent = "18.2k";
  }
  requestAnimationFrame(step);
}

function rotateBench(){
  let i = 0;
  const valEl = document.getElementById("benchValue");
  const labelEl = document.getElementById("benchLabel");
  if (!valEl || !labelEl) return;
  setInterval(() => {
    i = (i + 1) % BENCH_LINES.length;
    valEl.style.opacity = "0";
    labelEl.style.opacity = "0";
    setTimeout(() => {
      const { dataset, metric } = BENCH_LINES[i];
      labelEl.textContent = `Running benchmark on ${dataset}…`;
      valEl.textContent = metric;
      valEl.style.opacity = "1";
      labelEl.style.opacity = "1";
    }, 180);
  }, 2800);
}

function renderLogos(){
  const row = document.getElementById("logoRow");
  if (!row) return;
  row.innerHTML = LOGOS.map(([name,mono]) => `
    <div class="cust-logo">
      <svg viewBox="0 0 32 32" aria-hidden="true"><rect x="1" y="1" width="30" height="30" rx="6" fill="none" stroke="#64748B" stroke-width="1.6"/><text x="16" y="21" text-anchor="middle" font-size="13" fill="#64748B" font-family="Inter, sans-serif" font-weight="700">${mono}</text></svg>
      <span>${name}</span>
    </div>`).join("");
}

function toast(msg){
  const t = document.getElementById("toast");
  if (!t) return;
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 1600);
}

document.querySelectorAll(".code-tabs .tab").forEach(t => {
  t.addEventListener("click", () => renderHero(t.dataset.lang));
  t.addEventListener("keydown", (e) => {
    const tabs = Array.from(document.querySelectorAll(".code-tabs .tab"));
    const idx = tabs.indexOf(t);
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const next = (idx + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
      tabs[next].focus();
      renderHero(tabs[next].dataset.lang);
    }
  });
});

const copyBtn = document.getElementById("copyInstall");
if (copyBtn) {
  copyBtn.addEventListener("click", () => {
    const cmd = document.getElementById("installCmd").textContent;
    if(navigator.clipboard) navigator.clipboard.writeText(cmd).catch(()=>{});
    toast("Copied " + cmd);
  });
}

// Mobile nav drawer
(function initMobileNav(){
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("primaryNav");
  const overlay = document.getElementById("navOverlay");
  if (!toggle || !nav || !overlay) return;

  function setOpen(open){
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    nav.dataset.open = open ? "true" : "false";
    overlay.hidden = !open;
    document.body.classList.toggle("nav-open", open);
  }
  setOpen(false);

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    setOpen(!isOpen);
  });
  overlay.addEventListener("click", () => setOpen(false));
  nav.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (link) setOpen(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });
  // Auto-close drawer when crossing back to desktop width
  const mq = window.matchMedia("(min-width: 881px)");
  mq.addEventListener("change", (e) => { if (e.matches) setOpen(false); });
})();

// Prevent placeholder/disabled links from doing anything jarring
document.querySelectorAll('a.link-pending').forEach(a => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    toast("Coming soon");
  });
});

renderHero("python");
renderLogos();
animateStars();
const benchValEl = document.getElementById("benchValue");
const benchLabelEl = document.getElementById("benchLabel");
if (benchValEl) benchValEl.style.transition = "opacity .15s";
if (benchLabelEl) benchLabelEl.style.transition = "opacity .15s";
rotateBench();
