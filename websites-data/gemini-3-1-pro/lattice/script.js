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
        return `<td data-r="${r}" data-c="${c}" tabindex="0">${p===null ? "Contact us" : "$"+p.toLocaleString()}</td>`;
      }).join("");
    tb.appendChild(tr);
  });
  document.querySelectorAll(".matrix td").forEach(td => {
    td.addEventListener("click", () => selectCell(+td.dataset.r, +td.dataset.c));
    td.addEventListener("keydown", e => { if(e.key==="Enter") selectCell(+td.dataset.r, +td.dataset.c); });
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
  const cellPriceEl = document.getElementById("cellPrice");
  cellPriceEl.textContent = fmt(p);
  cellPriceEl.classList.toggle("is-custom", p === null);
  const tier = tierFor(r, c);
  document.getElementById("tierPill").textContent = "Tier · " + tierName(tier);
  document.querySelectorAll(".tier-bucket").forEach(t => t.classList.toggle("active", t.dataset.tier === tier));

  document.getElementById("howBreak").innerHTML = p === null
    ? `Custom dataset and seat count. Reach out for a quote — typical Enterprise contracts start around $40k/mo.`
    : `Base × team size (×${[1,1.8,3.2,6.1,11.5,22][r]}) × data volume (×${[1,1.9,3.6,7.4,15,30][c]}) + included compute/storage/IO budget.`;

  recalc();
}

function recalc(){
  if(!selected){ return; }
  const base = cellPrice(selected.r, selected.c);
  const lines = [];
  let total = 0;
  const isCustom = base === null;
  if(!isCustom){ lines.push(["Matrix base", "$" + base.toLocaleString()]); total += base; }
  else { lines.push(["Matrix base", "Contact us"]); }
  document.querySelectorAll('.addons-card input[type=checkbox]').forEach(cb => {
    if(cb.checked){
      const def = ADDON_DEFS[cb.dataset.key];
      if(def.pct){
        if(isCustom){ lines.push([def.label + " (+" + (def.pct*100).toFixed(0) + "%)", "Custom"]); }
        else { const v = Math.round(base * def.pct); lines.push([def.label + " (+" + (def.pct*100).toFixed(0) + "%)", "$" + v.toLocaleString()]); total += v; }
      }
      else {
        const v = def.flat;
        if(isCustom){ lines.push([def.label, v === 0 ? "incl." : "+$" + v.toLocaleString()]); }
        else { lines.push([def.label, v === 0 ? "incl." : "$" + v.toLocaleString()]); total += v; }
      }
    }
  });
  document.getElementById("finalList").innerHTML = lines.map(([l,r]) => `<li><span>${l}</span><span>${r}</span></li>`).join("");
  document.getElementById("grand").textContent = isCustom ? "Contact us" : "$" + total.toLocaleString();
}

document.querySelectorAll('.addons-card input[type=checkbox]').forEach(cb => cb.addEventListener("change", recalc));

renderMatrix();
selectCell(1, 1);
