"use strict";
/* UXBench results site — data + rendering.
   All numbers are transcribed from source tables and results/ source data:
   - Table 1  : results/table_source_data/02 + acl_latex.tex (displayed Δ)
   - Table 2  : acl_latex.tex tab:category_winrate
   - human    : results/figure_source_data/human_validation/human_metric_subplots_input_rubric_model_summary.csv
   - sig/corr : results/statistical_tests/{02,03,04}.csv
   - ranks    : results/figure_source_data/human_llm_agreement/agreement_model_rank_source.csv
   Heatmaps are SVGs rendered from results/figure/*.py (see assets/figures/). */

const BASELINE = 3.27;            // shared automated baseline (1–5)
const HUMAN_BASELINE = 3.49;      // mean human score of unrepaired fixtures

const DIMS = [
  { short: "Goal",  label: "Goal-state clarity",            desc: "Can users quickly grasp the page's purpose, current state, available options, and the most sensible next action?" },
  { short: "Nav",   label: "Navigation scent",              desc: "Do labels, menus, tabs, search, and filters give reliable cues toward the right content or next step?" },
  { short: "Fdbk",  label: "Action feedback",               desc: "Are actions followed by clear feedback for selection, input, loading, validation, success, and failure?" },
  { short: "Flow",  label: "Flow efficiency",               desc: "Can users complete multi-step or cross-page tasks without detours, repetition, waiting, or backtracking?" },
  { short: "Err",   label: "Error recovery",                desc: "Does the interface prevent likely mistakes and offer clear ways to correct, undo, retry, or return?" },
  { short: "Trust", label: "Trust transparency",            desc: "Before committing, can users understand costs, permissions, privacy choices, and consequences of sensitive actions?" },
  { short: "Scan",  label: "Scanability & accessibility",   desc: "Is the page easy to scan, visually prioritized, readable across screen sizes, and operable with basic accessibility cues?" }
];

// order = automated Δ rank (Table 1). autoD = displayed Δ; autoLiftP = precise lift.
const MODELS = [
  { name:"GPT-5.4",            short:"GPT-5.4",  logo:"gpt.png",        repaired:3.49, autoD:0.22, autoLiftP:0.216, autoRank:1,
    autoDims:[0.13,0.15,0.36,0.05,0.36,0.21,0.26], pairAuto:0.542,
    humanMean:3.84, humanD:0.35, humanRank:1, pairHuman:0.741, humanDims:[4.01,3.83,3.68,3.94,3.61,3.88,3.93], humanDimsD:[0.36,0.44,0.65,0.12,0.44,0.16,0.25] },
  { name:"Kimi-K2.5",          short:"Kimi",     logo:"kimi.png",       repaired:3.48, autoD:0.21, autoLiftP:0.205, autoRank:2,
    autoDims:[0.12,0.17,0.44,0.05,0.12,0.27,0.29], pairAuto:0.538,
    humanMean:3.70, humanD:0.21, humanRank:5, pairHuman:0.500, humanDims:[3.82,3.67,3.54,3.83,3.40,3.84,3.83], humanDimsD:[0.18,0.28,0.51,0.00,0.24,0.12,0.15] },
  { name:"Claude-Sonnet-4.6",  short:"Sonnet",   logo:"claude.png",     repaired:3.45, autoD:0.19, autoLiftP:0.174, autoRank:3,
    autoDims:[0.15,0.05,0.35,0.03,0.28,0.15,0.35], pairAuto:0.480,
    humanMean:3.81, humanD:0.32, humanRank:2, pairHuman:0.597, humanDims:[3.94,3.80,3.71,3.91,3.48,3.86,3.98], humanDimsD:[0.30,0.40,0.68,0.09,0.32,0.14,0.30] },
  { name:"GPT-5.4-Mini",       short:"GPT-Mini", logo:"gpt.png",        repaired:3.45, autoD:0.19, autoLiftP:0.172, autoRank:4,
    autoDims:[0.13,0.13,0.38,0.05,0.18,0.13,0.33], pairAuto:0.493,
    humanMean:3.75, humanD:0.26, humanRank:3, pairHuman:0.486, humanDims:[3.86,3.76,3.67,3.79,3.49,3.80,3.88], humanDimsD:[0.22,0.36,0.64,-0.03,0.33,0.08,0.20] },
  { name:"GLM-5.1",            short:"GLM",      logo:"glm.png",        repaired:3.45, autoD:0.17, autoLiftP:0.171, autoRank:5,
    autoDims:[-0.02,0.17,0.32,0.05,0.20,0.20,0.32], pairAuto:0.528,
    humanMean:3.75, humanD:0.25, humanRank:4, pairHuman:0.452, humanDims:[3.91,3.63,3.59,3.87,3.48,3.83,3.91], humanDimsD:[0.27,0.24,0.57,0.05,0.32,0.11,0.24] },
  { name:"GPT-5.4-Nano",       short:"GPT-Nano", logo:"gpt.png",        repaired:3.44, autoD:0.17, autoLiftP:0.162, autoRank:6,
    autoDims:[0.07,0.05,0.34,0.10,0.20,0.05,0.37], pairAuto:0.522,
    humanMean:3.69, humanD:0.20, humanRank:7, pairHuman:0.356, humanDims:[3.80,3.65,3.50,3.89,3.35,3.78,3.87], humanDimsD:[0.16,0.25,0.47,0.07,0.19,0.07,0.20] },
  { name:"Qwen-3.6-Plus",      short:"Qwen",     logo:"qwen-color.png", repaired:3.42, autoD:0.15, autoLiftP:0.148, autoRank:7,
    autoDims:[0.02,0.07,0.24,0.12,0.07,0.12,0.39], pairAuto:0.472,
    humanMean:3.67, humanD:0.17, humanRank:8, pairHuman:0.368, humanDims:[3.78,3.66,3.35,3.85,3.34,3.81,3.87], humanDimsD:[0.14,0.27,0.32,0.03,0.17,0.09,0.19] },
  { name:"Gemini-3.1-Pro",     short:"Gemini",   logo:"gemini.png",     repaired:3.41, autoD:0.14, autoLiftP:0.136, autoRank:8,
    autoDims:[0.08,0.03,0.24,0.08,0.11,0.11,0.34], pairAuto:0.425,
    humanMean:3.71, humanD:0.21, humanRank:6, pairHuman:0.500, humanDims:[3.86,3.69,3.49,3.82,3.39,3.79,3.92], humanDimsD:[0.22,0.29,0.47,-0.00,0.22,0.07,0.24] }
];

// statistical_tests/02
const CORR = [
  { stat:"Spearman ρ",   est:0.635, p:0.091, ci:"[−0.19, 1.00]" },
  { stat:"Kendall τ_b",  est:0.546, p:0.061, ci:"[−0.09, 1.00]" }
];
// statistical_tests/03 (auto) & 04 (human): [n, meanLift, ciLo, ciHi, tP, wP, dz]
const AUTO_SIG = {
  "GPT-5.4":[39,0.209,0.104,0.310,0.000347,0.000283,0.629], "Kimi-K2.5":[41,0.205,0.103,0.301,0.000248,0.000683,0.628],
  "Claude-Sonnet-4.6":[40,0.188,0.083,0.294,0.001350,0.002029,0.546], "GPT-5.4-Mini":[39,0.188,0.083,0.287,0.001016,0.001508,0.570],
  "GLM-5.1":[41,0.171,0.072,0.267,0.001549,0.001811,0.531], "GPT-5.4-Nano":[41,0.162,0.065,0.259,0.002490,0.003652,0.504],
  "Qwen-3.6-Plus":[41,0.148,0.051,0.245,0.005181,0.006664,0.462], "Gemini-3.1-Pro":[38,0.137,0.031,0.244,0.018408,0.027478,0.400],
  "_pooled":[320,0.176,0.140,0.212,0.0,null,0.538]
};
const HUMAN_SIG = {
  "GPT-5.4":[41,0.346,0.244,0.451,0.0,0.000002,1.015], "Kimi-K2.5":[41,0.211,0.131,0.294,0.000011,0.000029,0.786],
  "Claude-Sonnet-4.6":[41,0.318,0.245,0.395,0.0,0.0,1.282], "GPT-5.4-Mini":[41,0.258,0.178,0.340,0.0,0.000004,0.967],
  "GLM-5.1":[41,0.253,0.158,0.350,0.000008,0.000039,0.798], "GPT-5.4-Nano":[41,0.199,0.129,0.272,0.000003,0.000012,0.846],
  "Qwen-3.6-Plus":[41,0.173,0.098,0.250,0.000072,0.000121,0.691], "Gemini-3.1-Pro":[41,0.214,0.097,0.320,0.000572,0.000043,0.585],
  "_pooled":[328,0.246,0.215,0.278,0.0,null,0.843]
};

const SURFACES = [
  { family:"Landing Page", count:4, fixtures:["notion","pelagic","meadowos","stratabox"] },
  { family:"Pricing Page", count:4, fixtures:["slack","codekite","lattice","vaultkey"] },
  { family:"Onboarding", count:5, fixtures:["shopify","govuk-passport","solstice-bank","greengrove","civicport"] },
  { family:"Booking", count:4, fixtures:["booking","orbitride","moonlight-tickets","tablerose"] },
  { family:"Dashboard", count:4, fixtures:["cloudflare-radar","fleetatlas","aeroiq","pulsegrid"] },
  { family:"Documentation", count:4, fixtures:["stripe-docs","tessera","weaveapi","runeforge-docs"] },
  { family:"Privacy / Settings", count:4, fixtures:["microsoft-privacy","privacy-dashboard","aurora-network","meadowid"] },
  { family:"Data Visualization", count:4, fixtures:["owid-population","fred-unrate","climate-almanac","migration-atlas"] },
  { family:"Chatbot / Agent", count:4, fixtures:["chatgpt","lumen-research","forge-coder","atlas-tutor"] },
  { family:"Mobile UI", count:4, fixtures:["ridenow","brewlog","harborwallet","larkfit"] }
];
const REAL = new Set(["notion","slack","shopify","govuk-passport","booking","cloudflare-radar","stripe-docs","microsoft-privacy","owid-population","climate-almanac","chatgpt","ridenow"]);

const FINDINGS = [
  { h:"Judges differ in actionable report quality", p:"With the same fixtures, the same fixed repair agent, and the same scorer, GPT-5.4 lifts the benchmark +0.22 and Gemini-3.1-Pro +0.14 — an 0.08 spread on the 1–5 rubric. UX report generation is not saturated among frontier models." },
  { h:"Each judge has a distinct rubric signature", p:"Models differ in where the lift lands: GPT-5.4 is strongest on error recovery, Kimi-K2.5 on feedback and trust, Claude-Sonnet-4.6 on goal-state clarity, Qwen-3.6-Plus on flow and scanability. Similar aggregates can support different repairs." },
  { h:"Fixture-level reliability varies", p:"GPT-5.4 has the highest mean repaired score but a wide site-level range; some lower-mean judges are tighter. A judge can be highly actionable on some interfaces and weak on others." },
  { h:"Competence is surface-conditioned", p:"The leading model changes across surface families and no judge dominates all ten. Documentation and pricing admit high repaired scores; dashboards and chatbots stay lower. Read UXBench as multi-granularity, not a single ranking." },
  { h:"Pairwise win rates expose stability", p:"Mean scores hide whether a lead is broad or driven by a few fixtures. The pairwise matrix shows a top cluster rather than one runaway model, while Gemini-3.1-Pro is broadly weak yet still leads dashboards." },
  { h:"Humans confirm the signal, then sharpen the top", p:"Blind expert review broadly supports the automated ranking but turns it into a top-tier cluster: GPT-5.4 and Claude-Sonnet-4.6 form the clearest upper group, and close comparisons should be read through human-perceived quality." }
];

const VIEWS = {
  agent: {
    note: "Showing automated repair-lift results (fixed downstream scorer).",
    t1tag: "Automated evaluation",
    t1title: "Overall and dimension scores",
    t1copy: "Repaired score and Δ over the shared baseline of 3.27, with the seven-dimension lift signature. Rows are sorted by Δ; bold marks each column's maximum.",
    t1cap: "<b>GPT-5.4 leads aggregate lift (+0.22)</b> and Gemini-3.1-Pro trails (+0.14) — an 0.08-point spread on the 1–5 rubric, so the benchmark is not saturated.",
    hmtitle: "Pairwise win rates",
    hmcopy: "The aggregate ordering is real but tightly packed: a top cluster forms and many neighbouring cells sit near 0.50 (a near coin-flip)."
  },
  human: {
    note: "Showing blind expert-review results (model identities hidden).",
    t1tag: "Human evaluation",
    t1title: "Human repaired score and per-dimension lift",
    t1copy: "Blind expert ratings of the repaired interfaces on the 1–5 rubric: repaired mean, Δ over the human baseline of 3.49, and the seven-dimension lift signature. Bold marks each column's maximum.",
    t1cap: "<b>GPT-5.4 and Claude-Sonnet-4.6 form the top cluster.</b> Human review compresses the ladder into a top group rather than a strict order; action feedback and navigation see the largest gains, while flow barely moves.",
    hmtitle: "Blind-human pairwise win rate",
    hmcopy: "The human matrix is sharper than the automated one: GPT-5.4 wins nearly every comparison and Claude-Sonnet-4.6 is the main pushback."
  }
};

const CASE_STUDY_VARIANTS = [
  { variantName: "base", src: "assets/case-study/aeroiq-comparison/base/index.html" },
  { variantName: "claude-sonnet-4-6", src: "assets/case-study/aeroiq-comparison/claude-sonnet-4-6/index.html" },
  { variantName: "gemini-3-1-pro", src: "assets/case-study/aeroiq-comparison/gemini-3-1-pro/index.html" },
  { variantName: "glm-5.1", src: "assets/case-study/aeroiq-comparison/glm-5.1/index.html" },
  { variantName: "gpt-5.4", src: "assets/case-study/aeroiq-comparison/gpt-5.4/index.html" },
  { variantName: "gpt-5.4-mini", src: "assets/case-study/aeroiq-comparison/gpt-5.4-mini/index.html" },
  { variantName: "gpt-5.4-nano", src: "assets/case-study/aeroiq-comparison/gpt-5.4-nano/index.html" },
  { variantName: "kimi-k2.5", src: "assets/case-study/aeroiq-comparison/kimi-k2.5/index.html" },
  { variantName: "qwen3.6-plus", src: "assets/case-study/aeroiq-comparison/qwen3.6-plus/index.html" }
];
function chooseCaseStudyPair(){
  const variants = CASE_STUDY_VARIANTS.map(v=>({...v}));
  for(let i=variants.length-1;i>0;i--){
    const j = Math.floor(Math.random() * (i + 1));
    [variants[i], variants[j]] = [variants[j], variants[i]];
  }
  return variants.slice(0, 2).map((variant, index)=>({
    ...variant,
    side: index === 0 ? "left" : "right",
    label: index === 0 ? "Version A" : "Version B"
  }));
}
const CASE_STUDY_PAIR = chooseCaseStudyPair();
const CASE_STUDY_VIEWPORT = { width: 1280, height: 760 };

/* ---------- helpers ---------- */
const $ = (s, r=document) => r.querySelector(s);
const fmt = (v,d=2) => Number(v).toFixed(d);
const signed = (v,d=2) => (v>=0?"+":"−")+Math.abs(Number(v)).toFixed(d);
const EPS = 1e-9;
const colMax = (rows, j) => Math.max(...rows.map(r => r[j]));
function pval(p){ if(p===null) return "—"; if(p<0.001) return "&lt;0.001"; return fmt(p,3); }
function modelCell(m){
  return `<span class="model"><img src="assets/logos/${m.logo}" alt="" width="16" height="16" onerror="this.style.display='none'">${m.name}</span>`;
}

/* ---------- hero ---------- */
function renderStatline(){
  const items = [["8","judge models"],["41","fixtures"],["10","surface families"],["7","rubric dimensions"]];
  $("#statline").innerHTML = items.map(([v,l],i)=>`${i?'<span class="sep">·</span>':''}<span><b>${v}</b>&nbsp;${l}</span>`).join("");
}
function renderModels(){
  $("#models").innerHTML = MODELS.map(m=>`<span><img src="assets/logos/${m.logo}" alt="" onerror="this.style.display='none'">${m.name}</span>`).join("");
}
function renderFindings(){
  $("#findings-list").innerHTML = FINDINGS.map(f=>`<div class="finding"><h3>${f.h}</h3><p>${f.p}</p></div>`).join("");
}

/* ---------- main results table (toggles agent/human) ---------- */
function renderMainTable(view){
  const t = $("#mainTable");
  const dimHead = DIMS.map(d=>`<th><abbr title="${d.label}">${d.short}</abbr></th>`).join("");
  const isAgent = view==="agent";
  const base    = isAgent ? BASELINE : HUMAN_BASELINE;
  const repaired= m => isAgent ? m.repaired : m.humanMean;
  const overD   = m => isAgent ? m.autoD    : m.humanD;
  const dims    = m => isAgent ? m.autoDims : m.humanDimsD;
  const dimsMax = DIMS.map((_,j)=>colMax(MODELS.map(dims),j));
  const dMax    = colMax(MODELS.map(m=>[overD(m)]),0);
  t.innerHTML = `
    <thead>
      <tr class="grp"><th></th><th colspan="3" class="cmid">Overall</th><th colspan="7" class="cmid">Per-dimension Δ</th></tr>
      <tr class="cols"><th>Model</th><th>Base.</th><th>Repaired</th><th>Δ</th>${dimHead}</tr>
    </thead>
    <tbody>${MODELS.map(m=>`
      <tr>
        <td>${modelCell(m)}</td>
        <td>${fmt(base)}</td>
        <td>${fmt(repaired(m))}</td>
        <td class="${overD(m)<0?'neg':'pos'} ${overD(m)>=dMax-EPS?'hi':''}">${signed(overD(m))}</td>
        ${dims(m).map((v,j)=>`<td class="${v<0?'neg':''} ${v>=dimsMax[j]-EPS?'hi':''}">${signed(v)}</td>`).join("")}
      </tr>`).join("")}
    </tbody>`;
}

/* ---------- calibration: rank shift + correlation ---------- */
function renderRankTable(){
  $("#corr-copy").innerHTML = `Model-level rank correlation between the two protocols: ${CORR.map(c=>`<b>${c.stat} = ${fmt(c.est,2)}</b> (p = ${fmt(c.p,2)}, 95% CI ${c.ci})`).join("; ")}. Positive but wide, since the analysis has only eight model-level points.`;
  const rows = [...MODELS].sort((a,b)=>a.autoRank-b.autoRank).map(m=>{
    const shift = m.autoRank - m.humanRank;
    const arrow = shift>0 ? `<span class="pos">▲ ${shift}</span>` : shift<0 ? `<span class="neg">▼ ${Math.abs(shift)}</span>` : `—`;
    return `<tr>
      <td>${modelCell(m)}</td>
      <td>${m.autoRank}</td>
      <td class="pos">${signed(m.autoLiftP)}</td>
      <td>${m.humanRank}</td>
      <td class="pos">${signed(m.humanD)}</td>
      <td>${arrow}</td></tr>`;
  }).join("");
  $("#rankTable").innerHTML = `
    <thead><tr class="cols"><th>Model</th><th>Auto rank</th><th>Auto lift</th><th>Human rank</th><th>Human lift</th><th>Shift</th></tr></thead>
    <tbody>${rows}</tbody>`;
}

function renderSig(id, data){
  const order = MODELS.map(m=>m.name);
  const body = order.map(name=>{
    const s = data[name]; const m = MODELS.find(x=>x.name===name);
    return `<tr><td>${modelCell(m)}</td><td>${s[0]}</td><td class="pos">${signed(s[1],3)}</td>
      <td>[${fmt(s[2],3)}, ${fmt(s[3],3)}]</td><td>${pval(s[4])}</td><td>${pval(s[5])}</td><td>${fmt(s[6],3)}</td></tr>`;
  }).join("");
  const p = data["_pooled"];
  $("#"+id).innerHTML = `
    <thead><tr class="cols"><th>Model</th><th>n</th><th>Mean lift</th><th>95% boot. CI</th><th>t&nbsp;p</th><th>Wilcoxon&nbsp;p</th><th>d<sub>z</sub></th></tr></thead>
    <tbody>${body}</tbody>
    <tfoot><tr><td>Pooled model–site rows</td><td>${p[0]}</td><td class="pos">${signed(p[1],3)}</td><td>[${fmt(p[2],3)}, ${fmt(p[3],3)}]</td><td>${pval(p[4])}</td><td>—</td><td>${fmt(p[6],3)}</td></tr></tfoot>`;
}

/* ---------- benchmark anatomy ---------- */
function renderRubric(){
  // line icons in DIMS order: Goal, Nav, Feedback, Flow, Error, Trust, Scan/A11y
  const I = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">';
  const ICONS = [
    I+'<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="3.5"/><path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3"/></svg>',           // Goal — target
    I+'<circle cx="12" cy="12" r="9"/><polygon points="15.5 8.5 10.5 10.5 8.5 15.5 13.5 13.5"/></svg>',                                       // Nav — compass
    I+'<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M10.3 21a2 2 0 0 0 3.4 0"/></svg>',                                     // Feedback — bell
    I+'<path d="M4 7h11M4 7l3-3M4 7l3 3"/><path d="M20 17H9M20 17l-3-3M20 17l-3 3"/></svg>',                                                    // Flow — back-and-forth
    I+'<path d="M3 11a9 9 0 1 1 2.6 6.4"/><path d="M3 21v-5h5"/></svg>',                                                                        // Error — undo
    I+'<path d="M12 2.5l7.5 3.2v5.3c0 4.6-3.2 7.6-7.5 8.5-4.3-.9-7.5-3.9-7.5-8.5V5.7z"/><path d="M9 12l2 2 4-4.5"/></svg>',                     // Trust — shield+check
    I+'<path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>'                            // Scan — eye
  ];
  if($("#rubricChips")) $("#rubricChips").innerHTML = DIMS.map(d=>`<li>${d.label}</li>`).join("");
  $("#rubric").innerHTML = DIMS.map((d,i)=>`
    <div class="row"><dt><span class="dim-ic">${ICONS[i]}</span><span class="dim-name">${d.label}</span></dt><dd>${d.desc}</dd></div>`).join("");
}
function renderCatalog(){
  if($("#familyChips")) $("#familyChips").innerHTML = SURFACES.map(s=>`
    <span class="family-chip">${s.family}<span class="family-chip-count">${s.count}</span></span>`).join("");
  $("#catalog").innerHTML = SURFACES.map(s=>`
    <div class="grp">
      <div class="gname">${s.family}<span class="gcount">${s.count}</span></div>
      <div class="fx">${s.fixtures.map(f=>`<span class="chip ${REAL.has(f)?'real':''}"${REAL.has(f)?' title="Real-product anchor"':''}>${f}</span>`).join("")}</div>
    </div>`).join("");
}

/* ---------- per-block view toggles (each result switches independently) ---------- */
function setBlockView(block, view){
  block.dataset.blockView = view;
  block.querySelectorAll("[data-seg-btn]").forEach(b=>b.setAttribute("aria-selected", String(b.dataset.segBtn===view)));
  const note = block.querySelector("[data-note]");
  if(note) note.textContent = VIEWS[view].note;
  const v = VIEWS[view];
  if(block.dataset.block==="t1"){
    $("#t1-tag").textContent   = v.t1tag;
    $("#t1-title").textContent = v.t1title;
    $("#t1-copy").textContent  = v.t1copy;
    $("#t1-cap").innerHTML     = v.t1cap;
    renderMainTable(view);
  } else if(block.dataset.block==="hm"){
    $("#hm-title").textContent = v.hmtitle;
    $("#hm-copy").textContent  = v.hmcopy;
  }
  // cat / rob blocks swap their figures purely via CSS scoped to [data-block-view]
}
function setupBlockToggles(){
  document.querySelectorAll(".block[data-block]").forEach(block=>{
    block.querySelectorAll("[data-seg-btn]").forEach(b=>
      b.addEventListener("click", ()=>setBlockView(block, b.dataset.segBtn)));
    setBlockView(block, block.dataset.blockView || "agent");
  });
}

/* ---------- misc ---------- */
function setupNav(){
  const links=[...document.querySelectorAll(".nav-links a")];
  const byId=new Map();
  links.forEach(a=>{ const sec=document.getElementById(a.getAttribute("href").slice(1)); if(sec) byId.set(sec,a); });
  const obs=new IntersectionObserver(es=>es.forEach(e=>{ if(!e.isIntersecting) return; links.forEach(a=>a.classList.remove("active")); const a=byId.get(e.target); if(a) a.classList.add("active"); }),{rootMargin:"-35% 0px -55% 0px"});
  byId.forEach((_,sec)=>obs.observe(sec));
}
function setCaseStudyFrameSizes(root){
  root.querySelectorAll(".case-viewport").forEach(viewport=>{
    const availableWidth = viewport.getBoundingClientRect().width || CASE_STUDY_VIEWPORT.width;
    const scale = Math.min(1, availableWidth / CASE_STUDY_VIEWPORT.width);
    viewport.style.height = `${CASE_STUDY_VIEWPORT.height * scale}px`;
    const frame = viewport.querySelector(".case-frame");
    if(frame){
      frame.style.width = `${CASE_STUDY_VIEWPORT.width}px`;
      frame.style.height = `${CASE_STUDY_VIEWPORT.height}px`;
      frame.style.transform = `scale(${scale})`;
    }
  });
}
function setupCaseStudyFullscreen(root){
  const fullscreenButtons = [...root.querySelectorAll("[data-case-fullscreen]")];

  function clearFallbackFullscreen(){
    root.querySelectorAll(".case-pane.is-fullscreen").forEach(pane=>pane.classList.remove("is-fullscreen"));
    document.body.classList.remove("case-fallback-fullscreen-active");
  }

  function enterFallbackFullscreen(target){
    clearFallbackFullscreen();
    target.classList.add("is-fullscreen");
    document.body.classList.add("case-fallback-fullscreen-active");
    setCaseStudyFrameSizes(root);
  }

  async function exitCaseFullscreen(target){
    if(document.fullscreenElement === target && document.exitFullscreen){
      await document.exitFullscreen();
    }
    clearFallbackFullscreen();
    setCaseStudyFrameSizes(root);
  }

  function updateFullscreenButtons(){
    fullscreenButtons.forEach(button=>{
      const target = button.closest(".case-pane");
      const active = Boolean(target && (document.fullscreenElement === target || target.classList.contains("is-fullscreen")));
      const variant = CASE_STUDY_PAIR.find(v=>v.side===button.dataset.caseFullscreen);
      button.setAttribute("aria-pressed", String(active));
      button.setAttribute("aria-label", variant ? `${active ? "Exit" : "View"} ${variant.label} fullscreen` : `${active ? "Exit" : "View"} fullscreen`);
      button.title = active ? "Exit fullscreen" : "View fullscreen";
    });
  }

  fullscreenButtons.forEach(button=>{
    button.addEventListener("click", async ()=>{
      const frame = root.querySelector(`[data-case-frame="${button.dataset.caseFullscreen}"]`);
      const target = frame ? frame.closest(".case-pane") : null;
      if(!target) return;

      if(document.fullscreenElement === target || target.classList.contains("is-fullscreen")){
        await exitCaseFullscreen(target);
      } else if(target.requestFullscreen && document.fullscreenEnabled !== false){
        try{
          clearFallbackFullscreen();
          await target.requestFullscreen();
        } catch(e){
          enterFallbackFullscreen(target);
        }
      } else {
        enterFallbackFullscreen(target);
      }
      updateFullscreenButtons();
    });
  });
  document.addEventListener("fullscreenchange", ()=>{
    if(document.fullscreenElement) clearFallbackFullscreen();
    setCaseStudyFrameSizes(root);
    updateFullscreenButtons();
  });
  document.addEventListener("keydown", event=>{
    if(event.key==="Escape" && root.querySelector(".case-pane.is-fullscreen")){
      clearFallbackFullscreen();
      setCaseStudyFrameSizes(root);
      updateFullscreenButtons();
    }
  });
  updateFullscreenButtons();
}
function setupCaseStudy(){
  const root = $("[data-case-study]");
  if(!root) return;

  setCaseStudyFrameSizes(root);
  if("ResizeObserver" in window){
    const resizeObserver = new ResizeObserver(()=>setCaseStudyFrameSizes(root));
    root.querySelectorAll(".case-viewport").forEach(viewport=>resizeObserver.observe(viewport));
  } else {
    window.addEventListener("resize", ()=>setCaseStudyFrameSizes(root));
  }

  CASE_STUDY_PAIR.forEach(v=>{
    const frame = root.querySelector(`[data-case-frame="${v.side}"]`);
    if(frame) frame.src = v.src;
  });

  const buttons = [...root.querySelectorAll("[data-case-choice]")];
  const status = $("#caseChoiceStatus");

  function setChoice(side){
    const variant = CASE_STUDY_PAIR.find(v=>v.side===side);
    buttons.forEach(b=>b.setAttribute("aria-pressed", String(b.dataset.caseChoice===side)));
    if(status){
      const state = status.querySelector("[data-case-choice-result-state]");
      const title = status.querySelector("[data-case-choice-result-title]");
      const value = status.querySelector("[data-case-choice-result-value]");
      if(variant){
        status.dataset.revealed = "true";
        status.setAttribute("aria-label", `${variant.label} selected: ${variant.variantName}.`);
        if(state) state.textContent = "Revealed";
        if(title) title.textContent = `${variant.label} selected`;
        if(value) value.textContent = variant.variantName;
      } else {
        status.dataset.revealed = "false";
        status.removeAttribute("aria-label");
        if(state) state.textContent = "Hidden";
        if(title) title.textContent = "Selection pending";
        if(value) value.textContent = "Variant hidden";
      }
    }
  }

  setupCaseStudyFullscreen(root);
  buttons.forEach(b=>b.addEventListener("click", ()=>setChoice(b.dataset.caseChoice)));
}

/* ---------- init ---------- */
renderStatline();
renderModels();
renderFindings();
renderRankTable();
renderSig("autoSig", AUTO_SIG);
renderSig("humanSig", HUMAN_SIG);
renderRubric();
renderCatalog();
setupNav();
setupBlockToggles();
setupCaseStudy();
