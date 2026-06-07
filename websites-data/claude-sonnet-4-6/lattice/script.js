const ROWS = ["Up to 5 seats","6 – 15 seats","16 – 40 seats","41 – 100 seats","101 – 300 seats","301+ seats"];
const COLS = ["Up to 50 GB","50 – 250 GB","250 GB – 1 TB","1 – 5 TB","5 – 20 TB","20 TB+"];

function cellPrice(r,c){
  if(r >= 5 && c >= 4) return null;
  if(r === 5 || c === 5) return null;
  const base = 89;
  const rowMult = [1, 1.8, 3.2, 6.1, 11.5, 22][r];
  const colMult = [1, 1.9, 3.6, 7.4, 15, 30][c];
  return Math.round(base * rowMult * colMult);
}

function tierFor(r,c){
  if(r >= 4 || c >= 5) return "enterprise";
  if(r >= 3 || c >= 4) return "scale";
  if(r <= 1 && c <= 1) return "developer";
  return "team";
}

function tierName(t){
  return {developer:"Developer", team:"Team", scale:"Scale", enterprise:"Enterprise"}[t];
}

const ADDON_DEFS = {
  backup:   {label:"Continuous cross-region backups", pct:0.15},
  hipaa:    {label:"HIPAA compliance pack",            flat:400},
  soc:      {label:"SOC 2 reporting",                  flat:0, requiresTier:["team","scale","enterprise"]},
  vpc:      {label:"PrivateLink / VPC peering",        flat:120},
  dse:      {label:"Dedicated support engineer",       flat:2500},
  gpu:      {label:"GPU acceleration (~100 GPU-h est.)", flat:120},
  replica:  {label:"Read replica, cross-AZ",           pct:0.35},
  pitr:     {label:"PITR up to 35 days",               pct:0.08},
  staging:  {label:"Sandbox staging cluster",          flat:250},
};

let selected = null;
let userInteracted = false;

function fmt(n){ return n === null ? "Contact us" : "$" + n.toLocaleString(); }

function renderMatrix(){
  const tb = document.querySelector("#matrix tbody");
  tb.innerHTML = "";
  ROWS.forEach((rl, r) => {
    const tr = document.createElement("tr");
    tr.dataset.row = r;
    tr.setAttribute("role", "row");
    tr.innerHTML = `<th scope="row" role="rowheader">${rl}</th>` +
      COLS.map((cl, c) => {
        const p = cellPrice(r, c);
        const isContact = p === null;
        const label = `${rl}, ${cl}, ${isContact ? "Contact sales for a custom quote" : "$" + p.toLocaleString() + " per month"}, ${tierName(tierFor(r,c))} tier`;
        return `<td role="gridcell" data-r="${r}" data-c="${c}" tabindex="0" aria-selected="false" aria-label="${label}"${isContact ? ' class="contact-us"' : ''}>${isContact ? "Contact us" : "$"+p.toLocaleString()}</td>`;
      }).join("");
    tb.appendChild(tr);
  });
  document.querySelectorAll(".matrix td").forEach(td => {
    td.addEventListener("click", () => { userInteracted = true; selectCell(+td.dataset.r, +td.dataset.c); });
    td.addEventListener("keydown", e => {
      if(e.key === "Enter" || e.key === " "){
        e.preventDefault();
        userInteracted = true;
        selectCell(+td.dataset.r, +td.dataset.c);
      }
    });
  });
}

function selectCell(r, c){
  selected = {r, c};
  document.querySelectorAll(".matrix td").forEach(td => {
    td.classList.remove("active");
    td.setAttribute("aria-selected", "false");
  });
  document.querySelectorAll(".matrix tr").forEach(tr => tr.classList.remove("row-highlight"));
  document.querySelectorAll(".matrix th").forEach(th => th.classList.remove("col-highlight"));
  const td = document.querySelector(`.matrix td[data-r="${r}"][data-c="${c}"]`);
  td.classList.add("active");
  td.setAttribute("aria-selected", "true");
  td.closest("tr").classList.add("row-highlight");
  document.querySelectorAll("#matrix thead th")[c+1].classList.add("col-highlight");

  const p = cellPrice(r, c);
  const tier = tierFor(r, c);
  document.getElementById("cellPrice").textContent = fmt(p);
  document.getElementById("tierPill").textContent = "Tier · " + tierName(tier);
  document.querySelectorAll(".tier-bucket").forEach(t => t.classList.toggle("active", t.dataset.tier === tier));

  const contactCta = document.getElementById("contactCta");
  if(contactCta){ contactCta.hidden = p !== null; }

  const mp = document.getElementById("mobilePrice");
  const mt = document.getElementById("mobileTier");
  if(mp) mp.textContent = fmt(p);
  if(mt) mt.textContent = tierName(tier);

  const hint = document.getElementById("matrixHint");
  if(hint){
    if(userInteracted){
      hint.classList.add("user-set");
      hint.firstChild.textContent = "Your selection — ";
    } else {
      hint.classList.remove("user-set");
      hint.firstChild.textContent = "Showing an example selection — tap any cell to set yours. ";
    }
  }

  document.getElementById("howBreak").innerHTML = p === null
    ? `Custom dataset and seat count. Reach out for a quote — typical Enterprise contracts start around $40k/mo.`
    : `Base × team size (×${[1,1.8,3.2,6.1,11.5,22][r]}) × data volume (×${[1,1.9,3.6,7.4,15,30][c]}) + included compute/storage/IO budget.`;

  applyTierGating(tier);
  recalc();
}

function applyTierGating(tier){
  const socRow = document.getElementById("socRow");
  if(!socRow) return;
  const def = ADDON_DEFS.soc;
  const allowed = def.requiresTier.includes(tier);
  const cb = socRow.querySelector("input");
  const sub = socRow.querySelector(".addon-sub");
  if(allowed){
    socRow.classList.remove("disabled");
    cb.disabled = false;
    socRow.title = "";
    if(sub) sub.textContent = "included on Team and above";
  } else {
    socRow.classList.add("disabled");
    cb.checked = false;
    cb.disabled = true;
    socRow.title = "Upgrade to Team to include SOC 2 reporting at no extra cost.";
    if(sub) sub.textContent = "Upgrade to Team to enable";
  }
}

function recalc(){
  if(!selected){ return; }
  const base = cellPrice(selected.r, selected.c);
  const lines = [];
  let total = 0;
  if(base !== null){ lines.push(["Matrix base", "$" + base.toLocaleString()]); total += base; }
  document.querySelectorAll('.addons-card input[type=checkbox]').forEach(cb => {
    if(cb.checked && !cb.disabled){
      const def = ADDON_DEFS[cb.dataset.key];
      if(def.pct){ const v = Math.round((base||0) * def.pct); lines.push([def.label + " (+" + (def.pct*100).toFixed(0) + "%)", "$" + v.toLocaleString()]); total += v; }
      else { const v = def.flat; lines.push([def.label, v === 0 ? "incl." : "$" + v.toLocaleString()]); total += v; }
    }
  });
  document.getElementById("finalList").innerHTML = lines.map(([l,r]) => `<li><span>${l}</span><span>${r}</span></li>`).join("");
  document.getElementById("grand").textContent = "$" + total.toLocaleString();

  // live preview for percentage add-ons
  document.querySelectorAll('.ad[data-pct-preview]').forEach(el => {
    const key = el.dataset.pctPreview;
    const def = ADDON_DEFS[key];
    if(def && def.pct){
      const v = Math.round((base||0) * def.pct);
      const pctTxt = "+" + (def.pct*100).toFixed(0) + "%";
      el.textContent = base === null ? pctTxt : `${pctTxt} ≈ $${v.toLocaleString()}`;
    }
  });
}

document.querySelectorAll('.addons-card input[type=checkbox]').forEach(cb => cb.addEventListener("change", recalc));

// Reset button — clears user selection back to a neutral state
const resetBtn = document.getElementById("resetCell");
if(resetBtn){
  resetBtn.addEventListener("click", () => {
    userInteracted = false;
    selectCell(1, 1);
  });
}

// Modal helpers
function openModal(id){
  const m = document.getElementById(id);
  if(!m) return;
  m.hidden = false;
  document.body.style.overflow = "hidden";
  const focusable = m.querySelector(".btn-primary, .modal-close");
  if(focusable) focusable.focus();
}
function closeModal(m){
  m.hidden = true;
  document.body.style.overflow = "";
}
document.querySelectorAll(".modal").forEach(m => {
  m.querySelectorAll("[data-close-modal]").forEach(el => el.addEventListener("click", () => closeModal(m)));
});
document.addEventListener("keydown", e => {
  if(e.key === "Escape"){
    document.querySelectorAll(".modal:not([hidden])").forEach(closeModal);
  }
});

const bookBtn = document.getElementById("bookDemoBtn");
if(bookBtn){
  bookBtn.addEventListener("click", e => { e.preventDefault(); openModal("demoModal"); });
}
const openDemoFromContact = document.getElementById("openDemoFromContact");
if(openDemoFromContact){
  openDemoFromContact.addEventListener("click", () => openModal("demoModal"));
}

// Stub-link toast: show a "coming soon" modal so dead links give feedback
document.querySelectorAll("a.nav-stub").forEach(a => {
  a.addEventListener("click", e => {
    e.preventDefault();
    const name = a.dataset.stub || "This page";
    const body = document.getElementById("stubModalBody");
    if(body) body.textContent = `${name} is part of the UXBench demo and isn't wired up yet. In production this would navigate to the ${name.toLowerCase()} page.`;
    openModal("stubModal");
  });
});

if(document.getElementById("matrix")){
  renderMatrix();
  selectCell(1, 1);
}
