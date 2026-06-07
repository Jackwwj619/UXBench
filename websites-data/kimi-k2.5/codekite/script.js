const FREE_MIN = 4000;
const FREE_CONC = 1;
const FREE_STORE = 5;
const RATE_LINUX = 0.008;
const RATE_ARM = 0.012;
const RATE_MAC = 0.04;
const RATE_GPU = 0.18;
const RATE_CONC = 12;
const RATE_STORE = 0.10;
const TEAM_PER_USER = 39;

function fmt(n){ return "$" + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","); }

function calc(){
  const min = +document.getElementById("minNumber").value;
  const conc = +document.getElementById("concNumber").value;
  const store = +document.getElementById("storeNumber").value;
  const arm = document.getElementById("addArm").checked;
  const mac = document.getElementById("addMac").checked;
  const gpu = document.getElementById("addGpu").checked;

  const billableMin = Math.max(0, min - FREE_MIN);
  const billableConc = Math.max(0, conc - FREE_CONC);
  const billableStore = Math.max(0, store - FREE_STORE);

  let plan = "Free", planNote = "";
  if(arm || mac || gpu || conc > 16 || store > 100 || billableMin > 0){ plan = "Team"; }
  if(gpu || conc > 16 || store > 100){ plan = "Enterprise"; planNote = " (workload over Team caps)"; }

  const linuxCost = billableMin * RATE_LINUX;
  const armCost = arm ? min * RATE_ARM * 0.25 : 0;
  const macCost = mac ? min * RATE_MAC * 0.15 : 0;
  const gpuCost = gpu ? min * RATE_GPU * 0.05 : 0;
  const concCost = (plan === "Team") ? billableConc * RATE_CONC : 0;
  const storeCost = billableStore * RATE_STORE;
  const seatCost = (plan === "Team") ? TEAM_PER_USER * 5 : 0;

  const total = linuxCost + armCost + macCost + gpuCost + concCost + storeCost + seatCost;

  document.getElementById("totalCost").textContent = fmt(total);
  document.getElementById("reco").textContent = "Recommended plan: " + plan + planNote;

  document.querySelectorAll(".tier").forEach(t => t.classList.remove("highlight"));
  const id = plan === "Free" ? "tier-free" : plan === "Team" ? "tier-team" : "tier-ent";
  document.getElementById(id).classList.add("highlight");

  const lines = [];
  if(plan === "Team") lines.push(["Team plan, 5 users", fmt(seatCost)]);
  lines.push(["Linux build min (" + (billableMin>0 ? (billableMin.toLocaleString() + " billable") : "in free tier") + ")", fmt(linuxCost)]);
  if(arm) lines.push(["ARM runners (25% of total build minutes)", fmt(armCost)]);
  if(mac) lines.push(["macOS runners (15% of total build minutes)", fmt(macCost)]);
  if(gpu) lines.push(["GPU runners (5% of total build minutes)", fmt(gpuCost)]);
  if(plan === "Team" && billableConc > 0) lines.push(["Concurrency: " + billableConc + " slots over base", fmt(concCost)]);
  if(billableStore > 0) lines.push(["Artifact storage (" + billableStore + " GB-month)", fmt(storeCost)]);
  lines.push(["Estimated monthly", fmt(total)]);

  document.getElementById("breakdownList").innerHTML = lines.map(([l,r]) => `<li><span>${l}</span><span>${r}</span></li>`).join("");
}

function bind(slider, number){
  const s = document.getElementById(slider);
  const n = document.getElementById(number);
  if(!s||!n) return;
  s.addEventListener("input", () => { n.value = s.value; calc(); });
  n.addEventListener("input", () => { s.value = n.value; calc(); });
}
bind("minMinutes","minNumber");
bind("concSlider","concNumber");
bind("storeSlider","storeNumber");
["addArm","addMac","addGpu"].forEach(id => document.getElementById(id).addEventListener("change", calc));
calc();

// --- Toast helper ---
function showToast(msg){
  const t = document.getElementById("toast");
  if(!t) return;
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => t.classList.remove("show"), 2800);
}

// --- Modal helper ---
function openModal(title, body){
  const m = document.getElementById("ctaModal");
  if(!m) return;
  document.getElementById("ctaModalTitle").textContent = title;
  document.getElementById("ctaModalBody").textContent = body;
  m.classList.add("open");
  m.setAttribute("aria-hidden", "false");
  const focusEl = m.querySelector(".modal-close");
  if(focusEl) focusEl.focus();
}
function closeModal(){
  const m = document.getElementById("ctaModal");
  if(!m) return;
  m.classList.remove("open");
  m.setAttribute("aria-hidden", "true");
}
document.querySelectorAll("[data-modal-close]").forEach(el => {
  el.addEventListener("click", closeModal);
});
document.addEventListener("keydown", e => {
  if(e.key === "Escape") closeModal();
});

// --- CTA feedback ---
document.querySelectorAll("[data-cta]").forEach(btn => {
  btn.addEventListener("click", e => {
    e.preventDefault();
    const kind = btn.getAttribute("data-cta");
    const plan = btn.getAttribute("data-plan") || "";
    if(kind === "trial"){
      openModal(
        plan ? `Starting your ${plan} trial` : "Starting your free trial",
        "We'd normally redirect you to sign-up. This is a demo — your selection was registered."
      );
    } else if(kind === "sales"){
      openModal(
        "Talk to sales",
        "Our team will reach out within one business day to discuss " + (plan || "your plan") + " options."
      );
    } else if(kind === "getstarted"){
      openModal(
        "Welcome to CodeKite Free",
        "We'd normally take you to sign-up. This is a demo — your selection was registered."
      );
    } else if(kind === "signin"){
      showToast("Sign-in is disabled in this demo.");
    } else {
      showToast("Action received.");
    }
  });
});

// --- FAQ accordion fallback (in case <details> click is intercepted) ---
document.querySelectorAll(".faq details").forEach(d => {
  const summary = d.querySelector("summary");
  if(!summary) return;
  // Make summaries focusable & keyboard friendly
  summary.setAttribute("tabindex", "0");
  summary.setAttribute("role", "button");
  summary.setAttribute("aria-expanded", d.open ? "true" : "false");
  d.addEventListener("toggle", () => {
    summary.setAttribute("aria-expanded", d.open ? "true" : "false");
  });
  summary.addEventListener("keydown", e => {
    if(e.key === "Enter" || e.key === " "){
      e.preventDefault();
      d.open = !d.open;
    }
  });
});
