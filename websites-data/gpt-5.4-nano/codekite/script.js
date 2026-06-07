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
  if(arm) lines.push(["ARM runners (~25% of minutes)", fmt(armCost)]);
  if(mac) lines.push(["macOS runners (~15% of minutes)", fmt(macCost)]);
  if(gpu) lines.push(["GPU runners (~5% of minutes)", fmt(gpuCost)]);
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
["addArm","addMac","addGpu"].forEach(id => {
  const el = document.getElementById(id);
  if(el) el.addEventListener("change", calc);
});
if(document.getElementById("totalCost")) calc();

// Sync ARIA value on slider changes for screen readers
["minMinutes","concSlider","storeSlider"].forEach(id => {
  const el = document.getElementById(id);
  if(!el) return;
  el.addEventListener("input", () => el.setAttribute("aria-valuenow", el.value));
});

// CTA modal: replace dead-link primary CTAs with a confirmation dialog
const ctaModal = document.getElementById("cta-modal");
const ctaTitle = document.getElementById("cta-modal-title");
const ctaBody = document.getElementById("cta-modal-body");
let ctaLastFocus = null;
function openCta(action, sourceEl){
  if(!ctaModal) return;
  ctaLastFocus = sourceEl;
  if(action === "sales"){
    ctaTitle.textContent = "Talk to sales";
    ctaBody.textContent = "Thanks for your interest. In a real flow, this would open a contact form. For now, email sales@codekite.dev.";
  } else if(action === "signin"){
    ctaTitle.textContent = "Sign in";
    ctaBody.textContent = "Sign-in is part of the live product. In this demo, no account is required.";
  } else {
    ctaTitle.textContent = "You're on the list";
    ctaBody.textContent = "Thanks — this is a demo, so there's no live signup. In a real flow, you'd be on the trial setup page now.";
  }
  ctaModal.classList.add("open");
  ctaModal.setAttribute("aria-hidden","false");
  const closer = ctaModal.querySelector(".cta-modal-close");
  if(closer) closer.focus();
}
function closeCta(){
  if(!ctaModal) return;
  ctaModal.classList.remove("open");
  ctaModal.setAttribute("aria-hidden","true");
  if(ctaLastFocus && typeof ctaLastFocus.focus === "function") ctaLastFocus.focus();
}
document.querySelectorAll("[data-action]").forEach(el => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    openCta(el.getAttribute("data-action"), el);
  });
});
if(ctaModal){
  ctaModal.addEventListener("click", (e) => {
    if(e.target.matches("[data-close]")) closeCta();
  });
  document.addEventListener("keydown", (e) => {
    if(e.key === "Escape" && ctaModal.classList.contains("open")) closeCta();
  });
}

// FAQ accordion fallback: ensure summary clicks toggle [open] reliably
document.querySelectorAll(".faq details").forEach(d => {
  const s = d.querySelector("summary");
  if(!s) return;
  s.setAttribute("role","button");
  s.setAttribute("tabindex","0");
  s.setAttribute("aria-expanded", d.hasAttribute("open") ? "true" : "false");
  d.addEventListener("toggle", () => {
    s.setAttribute("aria-expanded", d.hasAttribute("open") ? "true" : "false");
  });
  s.addEventListener("keydown", (e) => {
    if(e.key === "Enter" || e.key === " "){
      e.preventDefault();
      if(d.hasAttribute("open")) d.removeAttribute("open"); else d.setAttribute("open","");
    }
  });
});
