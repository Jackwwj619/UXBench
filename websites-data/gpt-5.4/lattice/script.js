const ROWS = ["Up to 5 seats","6 – 15 seats","16 – 40 seats","41 – 100 seats","101 – 300 seats","301+ seats"];
const COLS = ["Up to 50 GB","50 – 250 GB","250 GB – 1 TB","1 – 5 TB","5 – 20 TB","20 TB+"];
const ROW_MULT = [1, 1.8, 3.2, 6.1, 11.5, 22];
const COL_MULT = [1, 1.9, 3.6, 7.4, 15, 30];
const BASE = 89;

function cellPrice(r,c){
  if(r >= 5 && c >= 4) return null;
  if(r === 5 || c === 5) return null;
  return Math.round(BASE * ROW_MULT[r] * COL_MULT[c]);
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
  soc:      {label:"SOC 2 reporting",                  flat:0},
  vpc:      {label:"PrivateLink / VPC peering",        flat:120},
  dse:      {label:"Dedicated support engineer",       flat:2500},
  gpu:      {label:"GPU acceleration (100 GPU-h est.)", flat:120},
  replica:  {label:"Read replica, cross-AZ",           pct:0.35},
  pitr:     {label:"PITR up to 35 days",               pct:0.08},
  staging:  {label:"Sandbox staging cluster",          flat:250},
};

let selected = null;

function fmt(n){ return n === null ? "Contact us" : "$" + n.toLocaleString(); }

function renderMatrix(){
  const tb = document.querySelector("#matrix tbody");
  tb.innerHTML = "";
  ROWS.forEach((rl, r) => {
    const tr = document.createElement("tr");
    tr.dataset.row = r;
    tr.innerHTML = `<th scope="row">${rl}</th>` +
      COLS.map((cl, c) => {
        const p = cellPrice(r, c);
        return `<td data-r="${r}" data-c="${c}" tabindex="0" role="button" aria-label="${rl}, ${cl}: ${p===null?'Contact us':'$'+p.toLocaleString()+' per month'}">${p===null ? "Contact us" : "$"+p.toLocaleString()}</td>`;
      }).join("");
    tb.appendChild(tr);
  });
  document.querySelectorAll(".matrix td").forEach(td => {
    td.addEventListener("click", () => selectCell(+td.dataset.r, +td.dataset.c));
    td.addEventListener("keydown", e => { if(e.key==="Enter" || e.key===" ") { e.preventDefault(); selectCell(+td.dataset.r, +td.dataset.c); } });
  });
}

function selectCell(r, c){
  selected = {r, c};
  document.querySelectorAll(".matrix td").forEach(td => td.classList.remove("active"));
  document.querySelectorAll(".matrix tr").forEach(tr => tr.classList.remove("row-highlight"));
  document.querySelectorAll(".matrix th").forEach(th => th.classList.remove("col-highlight"));
  const td = document.querySelector(`.matrix td[data-r="${r}"][data-c="${c}"]`);
  td.classList.add("active");
  td.closest("tr").classList.add("row-highlight");
  document.querySelectorAll("#matrix thead th")[c+1].classList.add("col-highlight");

  const p = cellPrice(r, c);
  document.getElementById("cellPrice").textContent = fmt(p);
  const tier = tierFor(r, c);
  document.getElementById("tierPill").textContent = "Tier · " + tierName(tier);
  document.querySelectorAll(".tier-bucket").forEach(t => t.classList.toggle("active", t.dataset.tier === tier));

  const isEnterprise = (p === null);
  const entPanel = document.getElementById("enterprisePanel");
  if(entPanel) entPanel.hidden = !isEnterprise;

  const fSummary = document.getElementById("formulaSummary");
  if(p === null){
    fSummary.innerHTML = `<span class="formula-pill">Custom contract</span> Pricing for this cell is scoped with sales — see panel below.`;
  } else {
    fSummary.innerHTML = `<span class="formula-pill mono">$${BASE} × ${ROW_MULT[r]} (seats) × ${COL_MULT[c]} (data) = $${p.toLocaleString()}/mo</span>`;
  }

  document.getElementById("howBreak").innerHTML = p === null
    ? `Custom dataset and seat count. Reach out for a quote — typical Enterprise contracts start around $40k/mo. Add-ons in the list below are <strong>indicative only</strong>; finalized through sales.`
    : `<div class="how-line"><span>Base price</span><span class="mono">$${BASE}</span></div>
       <div class="how-line"><span>× Team size (${ROWS[r]})</span><span class="mono">×${ROW_MULT[r]}</span></div>
       <div class="how-line"><span>× Data volume (${COLS[c]})</span><span class="mono">×${COL_MULT[c]}</span></div>
       <div class="how-line how-total"><span>= Matrix base</span><span class="mono">$${p.toLocaleString()}/mo</span></div>
       <p class="how-foot">Includes baseline compute/storage/IO budget for this cell. Add-ons below stack on top of this base.</p>`;

  // Auto-expand the breakdown when a cell is selected so users can verify the math.
  const howDetails = document.getElementById("howDetails");
  if(howDetails) howDetails.open = true;

  recalc();
}

function recalc(){
  if(!selected){ return; }
  const base = cellPrice(selected.r, selected.c);
  const lines = [];
  let total = 0;
  if(base !== null){ lines.push([`Matrix base (${ROWS[selected.r]} × ${COLS[selected.c]})`, "$" + base.toLocaleString()]); total += base; }
  document.querySelectorAll('.addons-card input[type=checkbox]').forEach(cb => {
    if(cb.checked){
      const def = ADDON_DEFS[cb.dataset.key];
      if(def.pct){
        const v = Math.round((base||0) * def.pct);
        const formula = base === null
          ? `${(def.pct*100).toFixed(0)}% of base (TBD)`
          : `${(def.pct*100).toFixed(0)}% × $${base.toLocaleString()} ≈ $${v.toLocaleString()}`;
        lines.push([`${def.label} <span class="line-formula">(${formula})</span>`, "$" + v.toLocaleString()]);
        total += v;
      } else {
        const v = def.flat;
        lines.push([def.label, v === 0 ? "incl." : "$" + v.toLocaleString()]);
        total += v;
      }
    }
  });
  document.getElementById("finalList").innerHTML = lines.map(([l,r]) => `<li><span>${l}</span><span>${r}</span></li>`).join("");
  document.getElementById("grand").textContent = "$" + total.toLocaleString();
}

document.querySelectorAll('.addons-card input[type=checkbox]').forEach(cb => cb.addEventListener("change", recalc));

// Block placeholder/disabled nav links from navigating.
document.querySelectorAll('a.nav-disabled, a.foot-disabled').forEach(a => {
  a.addEventListener('click', e => { e.preventDefault(); });
});

renderMatrix();
selectCell(1, 1);
