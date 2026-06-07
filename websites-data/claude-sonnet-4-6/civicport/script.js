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
  HVAC:{base:220, perSqft:0.8},
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
const SUBMITTED_STORAGE = "civicport-submitted-apps-v1";
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
      html += `<li class="${cls.join(" ")}" data-id="${s.id}" tabindex="0" role="button">${s.title}</li>`;
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

function goTo(id){ currentId = id; state.lastId = id; persist(); renderTree(); renderStep(); renderChecklist(); recalcFees(); window.scrollTo({top:0, behavior:"smooth"}); }

function renderStep(){
  const root = document.getElementById("stepRoot");
  const s = visibleSteps().find(x => x.id === currentId);
  root.innerHTML = STEP_RENDER[s.id] ? STEP_RENDER[s.id]() : `<h2>${s.title}</h2><p>This step has no specific fields. Click Continue to advance.</p>`;
  bindStep();
}

const STEP_RENDER = {
  "1.1": () => `<h2>1.1 Property address</h2><p class="lede">Where is the work happening? You can also start with the parcel number on step 2.1.</p>
    <div class="field"><label for="f-street">Street address</label><input id="f-street" data-k="1.1.street" value="${state["1.1"]?.street || ""}" placeholder="e.g., 148 Coppergate St." aria-label="Street address"></div>
    <div class="field"><label for="f-city">City</label><input id="f-city" data-k="1.1.city" value="${state["1.1"]?.city || "Avalon Bay"}" placeholder="City" aria-label="City"></div>
    <div class="field"><label for="f-zip">State / Zip</label><input id="f-zip" data-k="1.1.zip" value="${state["1.1"]?.zip || ""}" placeholder="Zip" aria-label="State or Zip"></div>`,
  "1.2": () => `<h2>1.2 Project type</h2><p class="lede">Select the closest match. The form adapts based on this.</p>
    <div class="radio-grid" role="radiogroup" aria-label="Project type">${["Kitchen","Bathroom","Addition","Roof","Structural","Electrical","Plumbing","HVAC","Other"].map((t, i) => `
      <label for="ptype-${i}"><input type="radio" id="ptype-${i}" name="ptype" value="${t}" ${state["1.2"]?.type===t?"checked":""}> ${t}</label>`).join("")}</div>`,
  "1.3": () => `<h2>1.3 Project scope</h2>
    <div class="field"><label for="f-scope">Describe the work in plain language</label><textarea id="f-scope" data-k="1.3.scope" rows="5" placeholder="e.g., Replace cabinets, countertops, and fixtures in main kitchen." aria-label="Project scope description">${state["1.3"]?.scope || ""}</textarea></div>
    <div class="field"><label class="check-row" for="f-exterior"><input type="checkbox" id="f-exterior" data-k="1.3.exteriorChanges" ${state["1.3"]?.exteriorChanges?"checked":""}> <span>Involves changes to the exterior (façade, roofline, windows, doors). <em class="hint-inline">Adds neighbor consent step (+$18/neighbor for mail requests).</em></span></label></div>
    <div class="field"><label for="f-cost">Estimated cost of work (USD)</label><input id="f-cost" type="number" data-k="1.3.cost" value="${state["1.3"]?.cost || ""}" placeholder="e.g., 25000" aria-label="Estimated cost of work in US dollars"></div>
    <div class="field"><label for="f-sqft">Affected area (sq ft)</label><input id="f-sqft" type="number" data-k="1.3.sqft" value="${state["1.3"]?.sqft || ""}" placeholder="e.g., 180" aria-label="Affected area in square feet"></div>`,
  "1.4": () => `<h2>1.4 Start / end dates</h2>
    <div class="field"><label for="f-start">Estimated start</label><input id="f-start" type="date" data-k="1.4.start" value="${state["1.4"]?.start || ""}" aria-label="Estimated start date"></div>
    <div class="field"><label for="f-end">Estimated end</label><input id="f-end" type="date" data-k="1.4.end" value="${state["1.4"]?.end || ""}" aria-label="Estimated end date"></div>`,
  "2.1": () => `<h2>2.1 Parcel lookup</h2><p class="lede">Enter your parcel number — we'll auto-fill zoning and adjacency.</p>
    <div class="parcel-row"><label for="f-parcel" class="sr-only">Parcel number</label><input id="f-parcel" data-k="2.1.parcel" value="${state["2.1"]?.parcel || ""}" placeholder="e.g., AB-2401-0117" aria-label="Parcel number"><button id="parcelLookup" type="button">Look up</button></div>
    <div id="parcelOut">${state.parcelResult ? parcelHtml(state.parcelResult) : ""}</div>`,
  "2.2": () => `<h2>2.2 Ownership proof</h2><p class="lede">Upload a recent deed or tax bill.</p>
    ${uploadHtml("ownerDoc","Deed or tax bill (PDF)")}`,
  "2.3": () => `<h2>2.3 Contractor license</h2>
    <div class="field"><label>Are you the property owner, or a licensed contractor?</label>
      <div class="radio-grid" role="radiogroup" aria-label="Applicant role"><label for="who-owner"><input type="radio" id="who-owner" name="who" value="owner" ${state["2.3"]?.who==="owner"?"checked":""}> Owner</label>
      <label for="who-contractor"><input type="radio" id="who-contractor" name="who" value="contractor" ${state["2.3"]?.who==="contractor"?"checked":""}> Contractor</label></div></div>
    <div class="field"><label for="f-license">License number (if contractor)</label><input id="f-license" data-k="2.3.license" value="${state["2.3"]?.license || ""}" placeholder="e.g., C-123456" aria-label="Contractor license number"></div>`,
  "3.1": () => `<h2>3.1 Site plan</h2><p class="lede">Drawing showing the property boundary and any structures.</p>${uploadHtml("sitePlan","Site plan (PDF)")}`,
  "3.2": () => `<h2>3.2 Floor plan</h2><p class="lede">Required for kitchen, bathroom, addition.</p>${uploadHtml("floorPlan","Floor plan (PDF)")}`,
  "3.3": () => `<h2>3.3 Elevation drawings</h2><p class="lede">Required because your project is an addition or structural.</p>${uploadHtml("elevations","Elevation drawings (PDF)")}`,
  "3.4": () => `<h2>3.4 Energy compliance form</h2><p class="lede">Required for roof, electrical, and HVAC scope.</p>${uploadHtml("energy","Title 24 / energy form (PDF)")}`,
  "4.1": () => `<h2>4.1 Adjacent parcels</h2><p class="lede">Auto-populated from your parcel lookup.</p>${
    (state.parcelResult?.adjacent || []).length === 0
      ? "<p class='hint'>Run a parcel lookup at step 2.1 first.</p>"
      : "<ul class='adjacent-list'>" + state.parcelResult.adjacent.map(p => {
          const known = !!PARCELS[p]?.addr;
          return `<li>${p} — ${known ? PARCELS[p].addr : "<span class='pending-addr'>address pending</span>"}</li>`;
        }).join("") + "</ul>" + (state.parcelResult.adjacent.some(p => !PARCELS[p]?.addr) ? "<p class='info-note'>ℹ️ Addresses marked <strong>pending</strong> will be confirmed by the city assessor within 1 business day. You'll receive an email when they resolve so you can continue the neighbor consent step.</p>" : "")
  }`,
  "4.2": () => {
    const adj = state.parcelResult?.adjacent || [];
    return `<h2>4.2 Neighbor signatures</h2><p class="lede">Collect a signature from each adjacent owner, or request via mail (+$18 each, +14 days).</p>${
      adj.map((p, i) => {
        const c = state.neighbors?.[p] || {};
        return `<div class="neighbor-card" data-p="${p}">
          <div class="parcel-info">${p} — ${PARCELS[p]?.addr || "address pending"}</div>
          <label for="nb-name-${i}">Owner name <input type="text" id="nb-name-${i}" data-nk="${p}.name" value="${c.name || ""}" aria-label="Neighbor owner name for parcel ${p}"></label>
          <label for="nb-date-${i}">Signed on <input type="date" id="nb-date-${i}" data-nk="${p}.date" value="${c.date || ""}" aria-label="Date signed for parcel ${p}"></label>
          <label class="check-row" for="nb-mail-${i}"><input type="checkbox" id="nb-mail-${i}" data-nk="${p}.mail" ${c.mail ? "checked" : ""}> <span>Request via mail instead (+$18)</span></label>
        </div>`;
      }).join("")}`;
  },
  "5.1": () => `<h2>5.1 Lead paint disclosure</h2>
    <div class="field"><label>Was the property built before 1978?</label>
      <div class="radio-grid" role="radiogroup" aria-label="Property built before 1978"><label for="lead-yes"><input type="radio" id="lead-yes" name="lead" value="Yes" ${state["5.1"]?.lead==="Yes"?"checked":""}> Yes</label>
      <label for="lead-no"><input type="radio" id="lead-no" name="lead" value="No" ${state["5.1"]?.lead==="No"?"checked":""}> No</label>
      <label for="lead-unk"><input type="radio" id="lead-unk" name="lead" value="Unknown" ${state["5.1"]?.lead==="Unknown"?"checked":""}> Unknown</label></div></div>
    <div class="field"><label class="check-row" for="lead-ack"><input type="checkbox" id="lead-ack" data-k="5.1.acknowledged" ${state["5.1"]?.acknowledged?"checked":""}> <span>I acknowledge EPA lead-safe work practices apply if Yes/Unknown.</span></label></div>`,
  "5.2": () => `<h2>5.2 Historical district review</h2><p class="lede">Your parcel is in a historical-district overlay. Additional review is required.</p>
    <div class="field"><label class="check-row" for="hist-ack"><input type="checkbox" id="hist-ack" data-k="5.2.ack" ${state["5.2"]?.ack?"checked":""}> <span>I understand a historical-review surcharge ($120) applies and adds ~7 business days.</span></label></div>`,
  "5.3": () => `<h2>5.3 Environmental questionnaire</h2>
    <div class="field"><label class="check-row" for="env-asb"><input type="checkbox" id="env-asb" data-k="5.3.asbestos" ${state["5.3"]?.asbestos?"checked":""}> <span>Work involves disturbing materials that may contain asbestos</span></label></div>
    <div class="field"><label class="check-row" for="env-runoff"><input type="checkbox" id="env-runoff" data-k="5.3.runoff" ${state["5.3"]?.runoff?"checked":""}> <span>Work will alter stormwater runoff for &gt;500 sq ft of surface</span></label></div>
    <div class="field"><label class="check-row" for="env-trees"><input type="checkbox" id="env-trees" data-k="5.3.trees" ${state["5.3"]?.trees?"checked":""}> <span>Removal of any tree &gt;6" caliper</span></label></div>`,
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
    <div class="field"><label class="check-row" for="attest-cb"><input type="checkbox" id="attest-cb" data-k="6.3.attest" ${state["6.3"]?.attest?"checked":""}> <span>I attest the information above is accurate.</span></label></div>
    <button class="btn-primary btn-lg" id="finalSubmit" type="button">Submit application</button>`,
};

function uploadHtml(key, label){
  const f = state.files?.[key];
  return `<div class="upload-box ${f?"has":""}" data-key="${key}">
    ${f ? `<span class="file-name">✓ ${f}</span><button class="rm" type="button">Remove</button>` : `<span>${label}</span><label class="upload-btn" for="upload-${key}">Upload<input id="upload-${key}" type="file" accept="application/pdf,image/*" aria-label="Upload ${label}"></label>`}
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
    if(k[0]+"."+k[1]==="1.3" && k[2]==="exteriorChanges"){ renderTree(); }
  }));
  document.querySelectorAll('input[name="ptype"]').forEach(r => r.addEventListener("change", () => {
    if(!state["1.2"]) state["1.2"]={}; state["1.2"].type = r.value; persist(); renderTree(); recalcFees(); renderChecklist();
  }));
  document.querySelectorAll('input[name="who"]').forEach(r => r.addEventListener("change", () => { if(!state["2.3"]) state["2.3"]={}; state["2.3"].who=r.value; persist(); }));
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
  if(lookup) lookup.addEventListener("click", () => {
    const p = document.querySelector('[data-k="2.1.parcel"]').value.trim().toUpperCase();
    const r = PARCELS[p];
    if(!r){ document.getElementById("parcelOut").innerHTML = `<p class="err">Parcel not found. Try one of: AB-2401-0117, AB-2305-0034, AB-2210-0410.</p>`; return; }
    state.parcelResult = r; state.historic = r.historic; state["1.1"] = state["1.1"] || {}; state["1.1"].street = r.addr;
    persist(); document.getElementById("parcelOut").innerHTML = parcelHtml(r); renderTree(); renderChecklist(); recalcFees();
  });

  const submit = document.getElementById("finalSubmit");
  if(submit) submit.addEventListener("click", handleSubmit);

  const feeDup = document.getElementById("feeBreakDup");
  if(feeDup) feeDup.innerHTML = document.getElementById("feeLines").innerHTML;
}

function handleSubmit(){
  const attest = document.getElementById("attest-cb");
  if(attest && !attest.checked){
    alert("Please check the attestation box before submitting.");
    return;
  }
  const appId = document.getElementById("appId").textContent;
  const total = document.getElementById("feeTotal").textContent;
  const submittedAt = new Date();
  const dateStr = submittedAt.toLocaleDateString("en-US", {month:"short", day:"numeric", year:"numeric"});

  // Persist the new submission so my-applications can show it
  const submitted = JSON.parse(localStorage.getItem(SUBMITTED_STORAGE) || "[]");
  submitted.unshift({
    id: appId,
    type: (state["1.2"]?.type || "Permit") + (state["1.3"]?.scope ? " — " + state["1.3"].scope.slice(0, 40) : ""),
    address: state["1.1"]?.street || "—",
    submitted: dateStr,
    status: "Submitted — pending review",
    fee: total,
    parcel: state["2.1"]?.parcel || "",
    expedited: !!document.getElementById("expRev")?.checked,
    nextSteps: "A plan reviewer will be assigned within 1 business day. You will receive an email confirmation shortly.",
  });
  localStorage.setItem(SUBMITTED_STORAGE, JSON.stringify(submitted));
  localStorage.removeItem(STORAGE);

  // Render confirmation screen in place
  showConfirmation({appId, total, dateStr, type: state["1.2"]?.type, address: state["1.1"]?.street, expedited: !!document.getElementById("expRev")?.checked});
}

function showConfirmation({appId, total, dateStr, type, address, expedited}){
  const tree = document.querySelector(".tree");
  const right = document.querySelector(".pane-right");
  const actions = document.querySelector(".mid-actions");
  if(tree) tree.style.display = "none";
  if(right) right.style.display = "none";
  if(actions) actions.style.display = "none";
  document.querySelector(".three-pane").classList.add("submitted");
  const root = document.getElementById("stepRoot");
  root.innerHTML = `
    <div class="confirm-screen" role="status" aria-live="polite">
      <div class="confirm-icon" aria-hidden="true">✓</div>
      <h2>Application submitted</h2>
      <p class="lede">Thanks — we received your permit application. A confirmation email is on its way.</p>
      <div class="confirm-card">
        <dl>
          <dt>Application number</dt><dd><strong>${appId}</strong></dd>
          <dt>Project</dt><dd>${type || "—"}${address ? " · " + address : ""}</dd>
          <dt>Submitted</dt><dd>${dateStr}</dd>
          <dt>Total fees</dt><dd>${total}${expedited ? " (expedited review included)" : ""}</dd>
        </dl>
      </div>
      <div class="confirm-next">
        <h3>What happens next</h3>
        <ol>
          <li>A plan reviewer is assigned within <strong>1 business day</strong>.</li>
          <li>You'll receive an email with the reviewer's contact and any questions.</li>
          <li>Typical decision time: <strong>${expedited ? "3" : "6"} business days</strong>.</li>
        </ol>
      </div>
      <div class="confirm-actions">
        <a href="my-applications.html" class="btn-primary btn-lg">Track this application</a>
        <a href="index.html" class="btn-secondary btn-lg">Return home</a>
      </div>
    </div>`;
}

function renderChecklist(){
  const items = [
    {label:"Property address", done: !!state["1.1"]?.street, stepId:"1.1"},
    {label:"Project type selected", done: !!state["1.2"]?.type, stepId:"1.2"},
    {label:"Scope described", done: !!(state["1.3"]?.scope || state.completed["1.3"]), stepId:"1.3"},
    {label:"Parcel verified", done: !!state.parcelResult, stepId:"2.1"},
    {label:"Ownership proof", done: !!state.files?.ownerDoc, stepId:"2.2"},
    {label:"Site plan", done: !!(state.files?.sitePlan || state.completed["3.1"]), stepId:"3.1"},
    {label:"Floor plan", done: !!(state.files?.floorPlan || state.completed["3.2"]), stepId:"3.2"},
  ];
  if(/Addition|Structural/.test(state["1.2"]?.type || "")) items.push({label:"Elevation drawings", done: !!(state.files?.elevations || state.completed["3.3"])});
  if(/Roof|Electrical|HVAC/.test(state["1.2"]?.type || "")) items.push({label:"Energy form", done: !!(state.files?.energy || state.completed["3.4"])});
  if(state["1.3"]?.exteriorChanges) items.push({label:"Neighbor consent gathered", done: Object.keys(state.neighbors||{}).length > 0});
  if(state.historic) items.push({label:"Historical review acknowledged", done: !!state["5.2"]?.ack});
  document.getElementById("checklist").innerHTML = items.map(i => `<li class="${i.done?"checked":""}">${i.label}</li>`).join("");
}

function recalcFees(){
  const type = state["1.2"]?.type;
  if(!type){ document.getElementById("feeLines").innerHTML = "<li>Pick a project type first</li>"; document.getElementById("feeTotal").textContent = "$0"; updateExpDelta(0); return; }
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
  // Surface that an exterior-changes scope brings a per-neighbor mail surcharge upfront
  if(state["1.3"]?.exteriorChanges && mailReqs === 0 && (state.parcelResult?.adjacent?.length)){
    lines.push([`Possible neighbor mail (× $18 ea)`, 0]);
  }
  let preExpTotal = lines.reduce((s,l) => s + l[1], 0);
  const exp = document.getElementById("expRev");
  let total = preExpTotal;
  if(exp && exp.checked){ const fee = Math.round(preExpTotal * 0.5); lines.push(["Expedited review (+50%)", fee]); total += fee; }
  document.getElementById("feeLines").innerHTML = lines.map(([l,v]) => `<li><span>${l}</span><span>$${v}</span></li>`).join("");
  document.getElementById("feeTotal").textContent = "$" + total;
  updateExpDelta(preExpTotal);
}

function updateExpDelta(baseTotal){
  const el = document.getElementById("expDelta");
  if(!el) return;
  const delta = Math.round((baseTotal || 0) * 0.5);
  el.textContent = baseTotal > 0 ? `+$${delta}` : "+50%";
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
