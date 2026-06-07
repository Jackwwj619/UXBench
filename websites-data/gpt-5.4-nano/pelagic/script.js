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
  "Recall@10: 0.987",
  "p95 latency: 18ms",
  "Throughput: 42k QPS",
  "Index build: 2.3× faster",
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
  });
}

function animateStars(){
  const el = document.getElementById("starCount");
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
  const el = document.getElementById("benchValue");
  setInterval(() => {
    i = (i + 1) % BENCH_LINES.length;
    el.style.opacity = "0";
    setTimeout(() => { el.textContent = BENCH_LINES[i]; el.style.opacity = "1"; }, 180);
  }, 2500);
}

function renderLogos(){
  const row = document.getElementById("logoRow");
  row.innerHTML = LOGOS.map(([name,mono]) => `
    <div class="cust-logo">
      <svg viewBox="0 0 32 32"><rect x="1" y="1" width="30" height="30" rx="6" fill="none" stroke="#64748B" stroke-width="1.6"/><text x="16" y="21" text-anchor="middle" font-size="13" fill="#64748B" font-family="Inter, sans-serif" font-weight="700">${mono}</text></svg>
      <span>${name}</span>
    </div>`).join("");
}

function toast(msg, duration){
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(t._hideTimer);
  t._hideTimer = setTimeout(() => t.classList.remove("show"), duration || 2400);
}

document.querySelectorAll(".code-tabs .tab").forEach(t => {
  t.addEventListener("click", () => renderHero(t.dataset.lang));
});
const copyBtn = document.getElementById("copyInstall");
copyBtn.addEventListener("click", () => {
  const cmd = document.getElementById("installCmd").textContent;
  const done = () => {
    const original = copyBtn.dataset.originalLabel || "Copy";
    if(!copyBtn.dataset.originalLabel) copyBtn.dataset.originalLabel = copyBtn.textContent;
    copyBtn.textContent = "Copied!";
    copyBtn.classList.add("copied");
    copyBtn.setAttribute("aria-label", "Copied install command");
    toast("Copied: " + cmd, 2400);
    clearTimeout(copyBtn._resetTimer);
    copyBtn._resetTimer = setTimeout(() => {
      copyBtn.textContent = original;
      copyBtn.classList.remove("copied");
      copyBtn.setAttribute("aria-label", "Copy install command");
    }, 2400);
  };
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(cmd).then(done).catch(done);
  } else {
    try {
      const ta = document.createElement("textarea");
      ta.value = cmd; ta.style.position="fixed"; ta.style.opacity="0";
      document.body.appendChild(ta); ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    } catch(e){}
    done();
  }
});

const navToggle = document.getElementById("navToggle");
const primaryNav = document.getElementById("primaryNav");
if(navToggle && primaryNav){
  navToggle.addEventListener("click", () => {
    const open = primaryNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  primaryNav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      if(primaryNav.classList.contains("open")){
        primaryNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  });
}

renderHero("python");
renderLogos();
animateStars();
rotateBench();
const benchEl = document.getElementById("benchValue");
benchEl.style.transition = "opacity .15s";
