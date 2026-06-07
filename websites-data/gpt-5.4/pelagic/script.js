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

const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function renderHero(lang){
  document.getElementById("heroCode").textContent = SNIPPETS[lang];
  document.querySelectorAll(".code-tabs .tab").forEach(t => {
    const active = t.dataset.lang === lang;
    t.classList.toggle("active", active);
    t.setAttribute("aria-selected", active ? "true" : "false");
  });
}

function animateStars(){
  const el = document.getElementById("starCount");
  const target = 18243;
  if(reduceMotion){ el.textContent = "18.2k"; return; }
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
  const el = document.getElementById("benchValue");
  if(reduceMotion) return;
  let i = 0;
  let started = false;
  const heroSection = document.querySelector(".hero");
  const startRotation = () => {
    if(started) return;
    started = true;
    setInterval(() => {
      i = (i + 1) % BENCH_LINES.length;
      el.style.opacity = "0";
      setTimeout(() => { el.textContent = BENCH_LINES[i]; el.style.opacity = "1"; }, 220);
    }, 5000);
  };
  if("IntersectionObserver" in window && heroSection){
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if(e.isIntersecting){
          setTimeout(startRotation, 4000);
          io.disconnect();
        }
      });
    }, {threshold: 0.4});
    io.observe(heroSection);
  } else {
    setTimeout(startRotation, 4000);
  }
}

function renderLogos(){
  const row = document.getElementById("logoRow");
  row.innerHTML = LOGOS.map(([name,mono]) => `
    <div class="cust-logo">
      <svg viewBox="0 0 32 32"><rect x="1" y="1" width="30" height="30" rx="6" fill="none" stroke="#64748B" stroke-width="1.6"/><text x="16" y="21" text-anchor="middle" font-size="13" fill="#64748B" font-family="Inter, sans-serif" font-weight="700">${mono}</text></svg>
      <span>${name}</span>
    </div>`).join("");
}

function toast(msg){
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 1600);
}

document.querySelectorAll(".code-tabs .tab").forEach(t => {
  t.addEventListener("click", () => renderHero(t.dataset.lang));
});

const copyBtn = document.getElementById("copyInstall");
copyBtn.addEventListener("click", () => {
  const cmd = document.getElementById("installCmd").textContent;
  if(navigator.clipboard) navigator.clipboard.writeText(cmd).catch(()=>{});
  copyBtn.classList.add("copied");
  copyBtn.textContent = "✓ Copied";
  copyBtn.setAttribute("aria-label", "Copied to clipboard");
  toast("Copied " + cmd);
  setTimeout(() => {
    copyBtn.classList.remove("copied");
    copyBtn.textContent = "Copy";
    copyBtn.setAttribute("aria-label", "Copy install command");
  }, 1800);
});

const logoLink = document.getElementById("logoLink");
if(logoLink){
  logoLink.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({top: 0, behavior: reduceMotion ? "auto" : "smooth"});
    toast("Top of page");
  });
}

renderHero("python");
renderLogos();
animateStars();
rotateBench();
const benchEl = document.getElementById("benchValue");
benchEl.style.transition = "opacity .15s";
