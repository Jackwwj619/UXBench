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
const TEAM_DEFAULT_SEATS = 5;

function fmt(n){ return "$" + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","); }

function clampField(el){
  if(!el) return {value: 0, clamped: false};
  const min = el.min === "" ? -Infinity : +el.min;
  const max = el.max === "" ? Infinity : +el.max;
  let raw = el.value;
  if(raw === "" || isNaN(+raw)){
    return {value: min === -Infinity ? 0 : min, clamped: false, empty: true};
  }
  let v = +raw;
  let clamped = false;
  if(v < min){ v = min; clamped = true; }
  if(v > max){ v = max; clamped = true; }
  return {value: v, clamped};
}

function setMessage(text, kind){
  const el = document.getElementById("calcMsg");
  if(!el) return;
  if(!text){ el.hidden = true; el.textContent = ""; el.className = "calc-msg"; return; }
  el.hidden = false;
  el.textContent = text;
  el.className = "calc-msg " + (kind || "info");
}

function calc(){
  const minEl = document.getElementById("minNumber");
  const concEl = document.getElementById("concNumber");
  const storeEl = document.getElementById("storeNumber");
  const armShareEl = document.getElementById("armShare");
  const macShareEl = document.getElementById("macShare");
  const gpuShareEl = document.getElementById("gpuShare");

  const minR = clampField(minEl);
  const concR = clampField(concEl);
  const storeR = clampField(storeEl);
  const armShareR = clampField(armShareEl);
  const macShareR = clampField(macShareEl);
  const gpuShareR = clampField(gpuShareEl);

  // Visibly reflect clamped values back into inputs and their slider counterparts
  if(minR.clamped) minEl.value = minR.value;
  if(concR.clamped) concEl.value = concR.value;
  if(storeR.clamped) storeEl.value = storeR.value;
  if(armShareR.clamped) armShareEl.value = armShareR.value;
  if(macShareR.clamped) macShareEl.value = macShareR.value;
  if(gpuShareR.clamped) gpuShareEl.value = gpuShareR.value;

  const minSlider = document.getElementById("minMinutes");
  const concSlider = document.getElementById("concSlider");
  const storeSlider = document.getElementById("storeSlider");
  if(minSlider && +minSlider.value !== minR.value) minSlider.value = minR.value;
  if(concSlider && +concSlider.value !== concR.value) concSlider.value = concR.value;
  if(storeSlider && +storeSlider.value !== storeR.value) storeSlider.value = storeR.value;

  const min = minR.value;
  const conc = concR.value;
  const store = storeR.value;
  const arm = document.getElementById("addArm").checked;
  const mac = document.getElementById("addMac").checked;
  const gpu = document.getElementById("addGpu").checked;
  const armShare = (armShareR.value || 0) / 100;
  const macShare = (macShareR.value || 0) / 100;
  const gpuShare = (gpuShareR.value || 0) / 100;

  // Validation messaging — surface clamps and combined-share warnings
  const messages = [];
  if(minR.clamped) messages.push("Build minutes adjusted to allowed range (" + minEl.min + "–" + (+minEl.max).toLocaleString() + ").");
  if(concR.clamped) messages.push("Concurrent builds adjusted to " + concR.value + " (allowed " + concEl.min + "–" + concEl.max + ").");
  if(storeR.clamped) messages.push("Artifact storage adjusted to " + storeR.value + " GB (allowed " + storeEl.min + "–" + storeEl.max + ").");
  const combinedShare = (arm ? armShare : 0) + (mac ? macShare : 0) + (gpu ? gpuShare : 0);
  if(combinedShare > 1.001){
    messages.push("Heads up: ARM + macOS + GPU shares total " + Math.round(combinedShare*100) + "%. We'll still estimate, but the runner mix should usually sum to 100% or less.");
  }
  setMessage(messages.join(" "), messages.length ? "warn" : "");

  const billableMin = Math.max(0, min - FREE_MIN);
  const billableConc = Math.max(0, conc - FREE_CONC);
  const billableStore = Math.max(0, store - FREE_STORE);

  let plan = "Free", planNote = "";
  if(arm || mac || gpu || conc > 16 || store > 100 || billableMin > 0){ plan = "Team"; }
  if(gpu || conc > 16 || store > 100){ plan = "Enterprise"; planNote = " (workload over Team caps)"; }

  const linuxCost = billableMin * RATE_LINUX;
  const armCost = arm ? min * RATE_ARM * armShare : 0;
  const macCost = mac ? min * RATE_MAC * macShare : 0;
  const gpuCost = gpu ? min * RATE_GPU * gpuShare : 0;
  const concCost = (plan === "Team") ? billableConc * RATE_CONC : 0;
  const storeCost = billableStore * RATE_STORE;
  const seatCost = (plan === "Team") ? TEAM_PER_USER * TEAM_DEFAULT_SEATS : 0;

  const total = linuxCost + armCost + macCost + gpuCost + concCost + storeCost + seatCost;

  document.getElementById("totalCost").textContent = fmt(total);
  document.getElementById("reco").textContent = "Recommended plan: " + plan + planNote;

  document.querySelectorAll(".tier").forEach(t => t.classList.remove("highlight"));
  const id = plan === "Free" ? "tier-free" : plan === "Team" ? "tier-team" : "tier-ent";
  const tierEl = document.getElementById(id);
  if(tierEl) tierEl.classList.add("highlight");

  const lines = [];
  if(plan === "Team") lines.push(["Team plan, " + TEAM_DEFAULT_SEATS + " users (assumed)", fmt(seatCost)]);
  lines.push([
    "Linux build min " + (billableMin>0 ? "(" + billableMin.toLocaleString() + " billable above 4,000 free)" : "(within 4,000 free min)"),
    fmt(linuxCost)
  ]);
  if(arm) lines.push(["ARM runners (" + Math.round(armShare*100) + "% of " + min.toLocaleString() + " min)", fmt(armCost)]);
  if(mac) lines.push(["macOS runners (" + Math.round(macShare*100) + "% of " + min.toLocaleString() + " min)", fmt(macCost)]);
  if(gpu) lines.push(["GPU runners (" + Math.round(gpuShare*100) + "% of " + min.toLocaleString() + " min)", fmt(gpuCost)]);
  if(plan === "Team" && billableConc > 0) lines.push([billableConc + " extra concurrent slots @ $" + RATE_CONC + "/slot/mo", fmt(concCost)]);
  if(billableStore > 0) lines.push(["Artifact storage (" + billableStore.toLocaleString() + " GB above 5 GB free)", fmt(storeCost)]);
  lines.push(["Estimated monthly", fmt(total)]);

  document.getElementById("breakdownList").innerHTML = lines.map(([l,r]) => `<li><span>${l}</span><span>${r}</span></li>`).join("");

  // Toggle share-input availability based on checkbox state
  [["addArm","armShare"],["addMac","macShare"],["addGpu","gpuShare"]].forEach(([cb, share]) => {
    const c = document.getElementById(cb);
    const s = document.getElementById(share);
    if(c && s){
      s.disabled = !c.checked;
      const wrap = s.closest(".addon-row");
      if(wrap) wrap.classList.toggle("addon-row-active", c.checked);
    }
  });
}

function bind(slider, number){
  const s = document.getElementById(slider);
  const n = document.getElementById(number);
  if(!s||!n) return;
  s.addEventListener("input", () => { n.value = s.value; calc(); });
  n.addEventListener("input", () => { s.value = n.value; calc(); });
  n.addEventListener("blur", () => { calc(); });
}
bind("minMinutes","minNumber");
bind("concSlider","concNumber");
bind("storeSlider","storeNumber");
["addArm","addMac","addGpu"].forEach(id => {
  const el = document.getElementById(id);
  if(el) el.addEventListener("change", calc);
});
["armShare","macShare","gpuShare"].forEach(id => {
  const el = document.getElementById(id);
  if(el){
    el.addEventListener("input", calc);
    el.addEventListener("blur", calc);
  }
});
calc();
