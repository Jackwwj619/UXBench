const PARCELS = {
  "AB-2401-0117":{addr:"148 Coppergate St., Avalon Bay",zone:"R-1",historic:false,adjacent:["AB-2401-0115","AB-2401-0119"]},
  "AB-2305-0034":{addr:"22 Foundry Lane, Avalon Bay",zone:"R-2",historic:true,adjacent:["AB-2305-0032","AB-2305-0036","AB-2305-0030"]},
  "AB-1812-0021":{addr:"7 Northbank Crescent, Avalon Bay",zone:"R-1",historic:false,adjacent:["AB-1812-0019","AB-1812-0023"]},
  "AB-2210-0410":{addr:"3401 Harborview Dr., Avalon Bay",zone:"R-3",historic:false,adjacent:["AB-2210-0408"]},
  "AB-1907-0102":{addr:"15 Old Brewery Row, Avalon Bay",zone:"MU-1",historic:true,adjacent:["AB-1907-0100","AB-1907-0104"]},
  "AB-2515-0066":{addr:"88 Sea Glass Way, Avalon Bay",zone:"R-1",historic:false,adjacent:["AB-2515-0064"]},
};

const PROJECT_FEES = {
  Kitchen:{base:320, perSqft:1.8},
  Bathroom:{base:240, perSqft:1.6},
  Addition:{base:680, perSqft:2.4},
  Roof:{base:210, perSqft:0.9},
  Structural:{base:540, perSqft:2.1},
  Electrical:{base:160, perSqft:0},
  Plumbing:{base:160, perSqft:0},
  Other:{base:200, perSqft:1.2},
};

const STEP_DEF = [
  {group:"1. Project info", steps:[
    {id:"1.1", title:"Property address"},
    {id:"1.2", title:"Project type"},
    {id:"1.3", title:"Project scope"},
    {id:"1.4", title:"Start / end dates"},
  ]},
  {group:"2. Property & ownership", steps:[
    {id:"2.1", title:"Parcel lookup"},
    {id:"2.2", title:"Ownership proof"},
    {id:"2.3", title:"Contractor license"},
  ]},
  {group:"3. Plans & documents", steps:[
    {id:"3.1", title:"Site plan"},
    {id:"3.2", title:"Floor plan"},
    {id:"3.3", title:"Elevation drawings", cond:state => /Addition|Structural/.test(state["1.2"]?.type || "")},
    {id:"3.4", title:"Energy compliance", cond:state => /Roof|Electrical|HVAC/.test(state["1.2"]?.type || "") },
  ]},
  {group:"4. Neighbor consent", steps:[
    {id:"4.1", title:"Adjacent parcels"},
    {id:"4.2", title:"Signatures"},
  ], cond:state => !!state["1.3"]?.exteriorChanges},
  {group:"5. Affidavits", steps:[
    {id:"5.1", title:"Lead paint (pre-1978)"},
    {id:"5.2", title:"Historical district", cond:state => !!state.historic},
    {id:"5.3", title:"Environmental"},
  ]},
  {group:"6. Review & submit", steps:[
    {id:"6.1", title:"Summary"},
    {id:"6.2", title:"Fees"},
    {id:"6.3", title:"Submit"},
  ]},
];

const STORAGE = "civicport-application-v1";
let state = JSON.parse(localStorage.getItem(STORAGE) || "{}");
state.completed = state.completed || {};
let currentId = state.lastId || "1.1";

function persist(){
  localStorage.setItem(STORAGE, JSON.stringify(state));
  document.getElementById("saveStatus").textContent = "Auto-saved · just now";
}

function visibleSteps(){
  const out = [];
  STEP_DEF.forEach(g => {
    if(g.cond && !g.cond(state)) return;
    g.steps.forEach(s => {
      if(s.cond && !s.cond(state)) return;
      out.push({group: g.group, ...s});
    });
  });
  return out;
}

function stepIndexById(id){ return visibleSteps().findIndex(s => s.id === id); }

function renderTree(){
  const wrap = document.getElementById("stepTree");
  let html = "";
  const visible = visibleSteps();
  const groups = [...new Set(visible.map(s => s.group))];
  groups.forEach(g => {
    html += `<li class="group">${g}</li>`;
    visible.filter(s => s.group === g).forEach(s => {
      const cls = ["substep"];
      if(s.id === currentId) cls.push("current");
      if(state.completed[s.id]) cls.push("done");
      html += `<li class="${cls.join(" ")}" data-id="${s.id}">${s.title}</li>`;
    });
  });
  wrap.innerHTML = html;
  wrap.querySelectorAll(".substep").forEach(li => li.addEventListener("click", () => {
    const id = li.dataset.id;
    const idx = stepIndexById(id);
    const curIdx = stepIndexById(currentId);
    if(idx <= curIdx || state.completed[id]) goTo(id);
  }));
}

function goTo(id){ currentId = id; state.lastId = id; persist(); renderTree(); renderStep(); renderChecklist(); recalcFees(); }

function renderStep(){
  const root = document.getElementById("stepRoot");
  const s = visibleSteps().find(x => x.id === currentId);
  root.innerHTML = STEP_RENDER[s.id] ? STEP_RENDER[s.id]() : `<h2>${s.title}</h2><p>This step has no specific fields. Click Continue to advance.</p>`;
  bindStep();
}

const STEP_RENDER = {
  "1.1": () => `<h2>1.1 Property address</h2><p class="lede">Where is the work happening? You can also start with the parcel number on step 2.1.</p>
    <div class="field"><label for="f-street">Street address</label><input id="f-street" data-k="1.1.street" value="${state["1.1"]?.street || ""}"></div>
    <div class="field"><label for="f-city">City</label><input id="f-city" data-k="1.1.city" value="${state["1.1"]?.city || "Avalon Bay"}"></div>
    <div class="field"><label for="f-zip">State / Zip</label><input id="f-zip" data-k="1.1.zip" value="${state["1.1"]?.zip || ""}" placeholder="Zip"></div>`,
  "1.2": () => `<h2>1.2 Project type</h2><p class="lede">Select the closest match. The form adapts based on this.</p>
    <div class="radio-grid">${["Kitchen","Bathroom","Addition","Roof","Structural","Electrical","Plumbing","Other"].map(t => `
      <label><input type="radio" name="ptype" value="${t}" ${state["1.2"]?.type===t?"checked":""}> ${t}</label>`).join("")}</div>`,
  "1.3": () => `<h2>1.3 Project scope</h2>
    <div class="field"><label for="f-scope">Describe the work in plain language</label><textarea id="f-scope" data-k="1.3.scope" rows="5">${state["1.3"]?.scope || ""}</textarea></div>
    <div class="field"><label class="check-label"><input type="checkbox" data-k="1.3.exteriorChanges" ${state["1.3"]?.exteriorChanges?"checked":""}> Involves changes to the exterior (façade, roofline, windows, doors)</label></div>
    <div class="field"><label for="f-cost">Estimated cost of work (USD)</label><input id="f-cost" type="number" data-k="1.3.cost" value="${state["1.3"]?.cost || ""}"></div>
    <div class="field"><label for="f-sqft">Affected area (sq ft)</label><input id="f-sqft" type="number" data-k="1.3.sqft" value="${state["1.3"]?.sqft || ""}"></div>`,
  "1.4": () => `<h2>1.4 Start / end dates</h2>
    <div class="field"><label for="f-start">Estimated start</label><input id="f-start" type="date" data-k="1.4.start" value="${state["1.4"]?.start || ""}"></div>
    <div class="field"><label for="f-end">Estimated end</label><input id="f-end" type="date" data-k="1.4.end" value="${state["1.4"]?.end || ""}"></div>`,
  "2.1": () => `<h2>2.1 Parcel lookup</h2><p class="lede">Enter your parcel number — we'll auto-fill zoning and adjacency.</p>
    <label for="f-parcel" class="visually-hidden">Parcel number</label>
    <div class="parcel-row"><input id="f-parcel" data-k="2.1.parcel" value="${state["2.1"]?.parcel || ""}" placeholder="e.g., AB-2401-0117" aria-describedby="parcelHint"><button id="parcelLookup" class="btn-lookup">Look up</button></div>
    <div id="parcelHint" class="parcel-hint" aria-live="polite"></div>
    <div id="parcelOut">${state.parcelResult ? parcelHtml(state.parcelResult) : ""}</div>`,
  "2.2": () => `<h2>2.2 Ownership proof</h2><p class="lede">Upload a recent deed or tax bill.</p>
    ${uploadHtml("ownerDoc","Deed or tax bill (PDF)")}`,
  "2.3": () => `<h2>2.3 Contractor license</h2>
    <div class="field"><label>Are you the property owner, or a licensed contractor?</label>
      <div class="radio-grid"><label><input type="radio" name="who" value="owner" ${state["2.3"]?.who==="owner"?"checked":""}> Owner</label>
      <label><input type="radio" name="who" value="contractor" ${state["2.3"]?.who==="contractor"?"checked":""}> Contractor</label></div></div>
    <div class="field contractor-fields" id="contractorFields" ${state["2.3"]?.who!=="contractor"?'hidden':''}><label for="f-license">License number</label><input id="f-license" data-k="2.3.license" value="${state["2.3"]?.license || ""}" ${state["2.3"]?.who!=="contractor"?'disabled':''}></div>`,
  "3.1": () => `<h2>3.1 Site plan</h2><p class="lede">Drawing showing the property boundary and any structures.</p>${uploadHtml("sitePlan","Site plan (PDF)")}`,
  "3.2": () => `<h2>3.2 Floor plan</h2><p class="lede">Required for kitchen, bathroom, addition.</p>${uploadHtml("floorPlan","Floor plan (PDF)")}`,
  "3.3": () => `<h2>3.3 Elevation drawings</h2><p class="lede">Required because your project is an addition or structural.</p>${uploadHtml("elevations","Elevation drawings (PDF)")}`,
  "3.4": () => `<h2>3.4 Energy compliance form</h2><p class="lede">Required for roof, electrical, and HVAC scope.</p>${uploadHtml("energy","Title 24 / energy form (PDF)")}`,
  "4.1": () => `<h2>4.1 Adjacent parcels</h2><p class="lede">Auto-populated from your parcel lookup.</p>${
    (state.parcelResult?.adjacent || []).length === 0
      ? "<p class='hint'>Run a parcel lookup at step 2.1 first.</p>"
      : "<ul style='padding-left:18px;font-size:14px'>" + state.parcelResult.adjacent.map(p => `<li>${p} — ${PARCELS[p]?.addr || "address pending"}</li>`).join("") + "</ul>"
  }`,
  "4.2": () => {
    const adj = state.parcelResult?.adjacent || [];
    return `<h2>4.2 Neighbor signatures</h2><p class="lede">Collect a signature from each adjacent owner, or request via mail (+$18 each, +14 days).</p>${
      adj.map(p => {
        const c = state.neighbors?.[p] || {};
        return `<div class="neighbor-card" data-p="${p}">
          <div class="parcel-info">${p} — ${PARCELS[p]?.addr || ""}</div>
          <label>Owner name <input type="text" aria-label="Owner name for parcel ${p}" data-nk="${p}.name" value="${c.name || ""}"></label>
          <label>Signed on <input type="date" aria-label="Signed on date for parcel ${p}" data-nk="${p}.date" value="${c.date || ""}"></label>
          <label><input type="checkbox" data-nk="${p}.mail" ${c.mail ? "checked" : ""}> Request via mail instead</label>
        </div>`;
      }).join("")}`;
  },
  "5.1": () => `<h2>5.1 Lead paint disclosure</h2>
    <div class="field"><label>Was the property built before 1978?</label>
      <div class="radio-grid"><label><input type="radio" name="lead" value="Yes" ${state["5.1"]?.lead==="Yes"?"checked":""}> Yes</label>
      <label><input type="radio" name="lead" value="No" ${state["5.1"]?.lead==="No"?"checked":""}> No</label>
      <label><input type="radio" name="lead" value="Unknown" ${state["5.1"]?.lead==="Unknown"?"checked":""}> Unknown</label></div></div>
    <div class="field"><label><input type="checkbox" data-k="5.1.acknowledged" ${state["5.1"]?.acknowledged?"checked":""}> I acknowledge EPA lead-safe work practices apply if Yes/Unknown.</label></div>`,
  "5.2": () => `<h2>5.2 Historical district review</h2><p class="lede">Your parcel is in a historical-district overlay. Additional review is required.</p>
    <div class="field"><label><input type="checkbox" data-k="5.2.ack" ${state["5.2"]?.ack?"checked":""}> I understand a historical-review surcharge ($120) applies and adds ~7 business days.</label></div>`,
  "5.3": () => `<h2>5.3 Environmental questionnaire</h2>
    <div class="field"><label><input type="checkbox" data-k="5.3.asbestos" ${state["5.3"]?.asbestos?"checked":""}> Work involves disturbing materials that may contain asbestos</label></div>
    <div class="field"><label><input type="checkbox" data-k="5.3.runoff" ${state["5.3"]?.runoff?"checked":""}> Work will alter stormwater runoff for &gt;500 sq ft of surface</label></div>
    <div class="field"><label><input type="checkbox" data-k="5.3.trees" ${state["5.3"]?.trees?"checked":""}> Removal of any tree &gt;6" caliper</label></div>`,
  "6.1": () => `<h2>6.1 Summary</h2><div class="parcel-result"><dl>
    <dt>Address</dt><dd>${state["1.1"]?.street || "—"}</dd>
    <dt>Project type</dt><dd>${state["1.2"]?.type || "—"}</dd>
    <dt>Scope</dt><dd>${state["1.3"]?.scope || "—"}</dd>
    <dt>Sq ft</dt><dd>${state["1.3"]?.sqft || "—"}</dd>
    <dt>Parcel</dt><dd>${state.parcelResult ? state["2.1"]?.parcel + " · " + state.parcelResult.zone + (state.parcelResult.historic ? " · historic" : "") : "—"}</dd>
    <dt>Documents</dt><dd>${["ownerDoc","sitePlan","floorPlan","elevations","energy"].filter(k => state.files?.[k]).length} uploaded</dd>
  </dl></div>`,
  "6.2": () => `<h2>6.2 Fees</h2><p class="lede">Same numbers as the right-hand card. Pay when you submit.</p>
    <div class="parcel-result" id="feeBreakDup"></div>`,
  "6.3": () => `<h2>6.3 Submit</h2><p class="lede">Confirm and submit. We email a receipt and assign a plan reviewer within 1 business day.</p>
    <div class="field"><label><input type="checkbox" data-k="6.3.attest"> I attest the information above is accurate.</label></div>
    <button class="btn-primary" id="finalSubmit">Submit application</button>`,
};

function uploadHtml(key, label){
  const f = state.files?.[key];
  return `<div class="upload-box ${f?"has":""}" data-key="${key}">
    ${f ? `<span class="file-name">✓ ${f}</span><button class="rm" type="button">Remove</button>` : `<span>${label}</span><label class="upload-btn">Upload<input type="file" accept="application/pdf,image/*"></label>`}
  </div>`;
}

function parcelHtml(r){
  return `<div class="parcel-result"><dl>
    <dt>Address</dt><dd>${r.addr}</dd>
    <dt>Zone</dt><dd>${r.zone}</dd>
    <dt>Historic</dt><dd>${r.historic ? "Yes — overlay applies" : "No"}</dd>
    <dt>Adjacent parcels</dt><dd>${r.adjacent.join(", ")}</dd>
  </dl></div>`;
}

function bindStep(){
  document.querySelectorAll("[data-k]").forEach(el => el.addEventListener("input", () => {
    const k = el.dataset.k.split(".");
    if(!state[k[0]+"."+k[1]]) state[k[0]+"."+k[1]] = {};
    const val = el.type === "checkbox" ? el.checked : el.value;
    state[k[0]+"."+k[1]][k[2]] = val;
    persist(); recalcFees(); renderChecklist();
  }));
  document.querySelectorAll('input[name="ptype"]').forEach(r => r.addEventListener("change", () => {
    if(!state["1.2"]) state["1.2"]={}; state["1.2"].type = r.value; persist(); renderTree(); recalcFees(); renderChecklist();
  }));
  document.querySelectorAll('input[name="who"]').forEach(r => r.addEventListener("change", () => {
    if(!state["2.3"]) state["2.3"]={}; state["2.3"].who=r.value; persist();
    const cf = document.getElementById("contractorFields");
    if(cf){
      const lic = cf.querySelector("input");
      if(r.value === "contractor"){ cf.hidden = false; if(lic) lic.disabled = false; }
      else { cf.hidden = true; if(lic){ lic.disabled = true; } }
    }
  }));
  document.querySelectorAll('input[name="lead"]').forEach(r => r.addEventListener("change", () => { if(!state["5.1"]) state["5.1"]={}; state["5.1"].lead=r.value; persist(); }));

  document.querySelectorAll("[data-nk]").forEach(el => el.addEventListener("input", () => {
    const [p, key] = el.dataset.nk.split(".");
    state.neighbors = state.neighbors || {}; state.neighbors[p] = state.neighbors[p] || {};
    state.neighbors[p][key] = el.type === "checkbox" ? el.checked : el.value; persist(); recalcFees();
  }));

  document.querySelectorAll('.upload-box input[type=file]').forEach(inp => inp.addEventListener("change", () => {
    const f = inp.files[0]; if(!f) return;
    const key = inp.closest(".upload-box").dataset.key;
    state.files = state.files || {}; state.files[key] = f.name; persist(); renderStep(); renderChecklist();
  }));
  document.querySelectorAll('.upload-box .rm').forEach(b => b.addEventListener("click", () => {
    const key = b.closest(".upload-box").dataset.key;
    if(state.files){ delete state.files[key]; }
    persist(); renderStep(); renderChecklist();
  }));

  const lookup = document.getElementById("parcelLookup");
  const parcelInput = document.querySelector('[data-k="2.1.parcel"]');
  const parcelHint = document.getElementById("parcelHint");
  const PARCEL_RE = /^AB-\d{4}-\d{4}$/;
  function validateParcel(){
    if(!parcelInput || !parcelHint) return;
    const v = parcelInput.value.trim().toUpperCase();
    if(!v){ parcelHint.textContent = ""; parcelHint.className = "parcel-hint"; document.getElementById("parcelOut").innerHTML = ""; return; }
    if(!PARCEL_RE.test(v)){ parcelHint.textContent = "Format: AB-YYYY-NNNN (e.g., AB-2401-0117)"; parcelHint.className = "parcel-hint err"; return; }
    if(PARCELS[v]){ parcelHint.textContent = "Format looks good — click Look up to verify."; parcelHint.className = "parcel-hint ok"; }
    else { parcelHint.textContent = "Format valid, but parcel not in our database."; parcelHint.className = "parcel-hint warn"; }
  }
  if(parcelInput){
    parcelInput.addEventListener("input", validateParcel);
    parcelInput.addEventListener("blur", validateParcel);
    if(parcelInput.value) validateParcel();
  }
  if(lookup) lookup.addEventListener("click", () => {
    const p = parcelInput.value.trim().toUpperCase();
    const r = PARCELS[p];
    if(!r){ document.getElementById("parcelOut").innerHTML = `<p class="err">Parcel not found. Try one of: AB-2401-0117, AB-2305-0034, AB-2210-0410.</p>`; return; }
    state.parcelResult = r; state.historic = r.historic; state["1.1"] = state["1.1"] || {}; state["1.1"].street = r.addr;
    persist(); document.getElementById("parcelOut").innerHTML = parcelHtml(r); if(parcelHint){ parcelHint.textContent = "Verified."; parcelHint.className = "parcel-hint ok"; } renderTree(); renderChecklist(); recalcFees();
  });

  const submit = document.getElementById("finalSubmit");
  if(submit) submit.addEventListener("click", () => {
    alert("Application " + document.getElementById("appId").textContent + " submitted. A plan reviewer will contact you within 1 business day. (demo)");
    localStorage.removeItem(STORAGE);
    window.location.href = "my-applications.html";
  });

  const feeDup = document.getElementById("feeBreakDup");
  if(feeDup) feeDup.innerHTML = document.getElementById("feeLines").innerHTML;
}

function renderChecklist(){
  const items = [
    {label:"Property address", done: !!state["1.1"]?.street},
    {label:"Project type selected", done: !!state["1.2"]?.type},
    {label:"Scope described", done: !!state["1.3"]?.scope},
    {label:"Parcel verified", done: !!state.parcelResult},
    {label:"Ownership proof", done: !!state.files?.ownerDoc},
    {label:"Site plan", done: !!state.files?.sitePlan},
    {label:"Floor plan", done: !!state.files?.floorPlan},
  ];
  if(/Addition|Structural/.test(state["1.2"]?.type || "")) items.push({label:"Elevation drawings", done: !!state.files?.elevations});
  if(/Roof|Electrical|HVAC/.test(state["1.2"]?.type || "")) items.push({label:"Energy form", done: !!state.files?.energy});
  if(state["1.3"]?.exteriorChanges) items.push({label:"Neighbor consent gathered", done: Object.keys(state.neighbors||{}).length > 0});
  if(state.historic) items.push({label:"Historical review acknowledged", done: !!state["5.2"]?.ack});
  if(state["5.3"]?.asbestos) items.push({label:"Asbestos disturbance noted — abatement plan required", done: false});
  if(state["5.3"]?.runoff) items.push({label:"Stormwater runoff notice acknowledged", done: true});
  if(state["5.3"]?.trees) items.push({label:"Tree removal noted — arborist sign-off may be needed", done: true});
  document.getElementById("checklist").innerHTML = items.map(i => `<li class="${i.done?"checked":""}">${i.label}</li>`).join("");
}

function recalcFees(){
  const type = state["1.2"]?.type;
  if(!type){ document.getElementById("feeLines").innerHTML = "<li>Pick a project type first</li>"; document.getElementById("feeTotal").textContent = "$0"; return; }
  const cfg = PROJECT_FEES[type] || PROJECT_FEES.Other;
  const sqft = +state["1.3"]?.sqft || 0;
  const overage = Math.max(0, sqft - 200);
  const sqftFee = Math.round(overage * cfg.perSqft);
  const lines = [];
  lines.push([`${type} base fee`, cfg.base]);
  if(sqftFee > 0) lines.push([`${overage} sq ft over 200 (@$${cfg.perSqft})`, sqftFee]);
  let mailReqs = 0;
  if(state.neighbors){ Object.values(state.neighbors).forEach(n => { if(n.mail) mailReqs++; }); }
  if(mailReqs > 0) lines.push([`${mailReqs} neighbor mail request${mailReqs>1?"s":""} (×$18)`, mailReqs * 18]);
  if(state.historic && state["5.2"]?.ack) lines.push(["Historical-district review", 120]);
  let total = lines.reduce((s,l) => s + l[1], 0);
  const exp = document.getElementById("expRev");
  if(exp && exp.checked){ const fee = Math.round(total * 0.5); lines.push(["Expedited review (+50%)", fee]); total += fee; }
  document.getElementById("feeLines").innerHTML = lines.map(([l,v]) => `<li><span>${l}</span><span>$${v}</span></li>`).join("");
  document.getElementById("feeTotal").textContent = "$" + total;
}

document.getElementById("nextBtn").addEventListener("click", () => {
  state.completed[currentId] = true;
  const visible = visibleSteps();
  const idx = visible.findIndex(s => s.id === currentId);
  if(idx < visible.length - 1) goTo(visible[idx + 1].id);
});
document.getElementById("prevBtn").addEventListener("click", () => {
  const visible = visibleSteps();
  const idx = visible.findIndex(s => s.id === currentId);
  if(idx > 0) goTo(visible[idx - 1].id);
});
document.getElementById("expRev").addEventListener("change", recalcFees);
document.getElementById("cancelBtn").addEventListener("click", () => document.getElementById("cancelDialog").showModal());
document.getElementById("confirmCancel").addEventListener("click", () => { localStorage.removeItem(STORAGE); window.location.href = "index.html"; });

renderTree(); renderStep(); renderChecklist(); recalcFees();
