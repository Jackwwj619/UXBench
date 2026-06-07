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

const SCOPE_HINTS = {
  Kitchen:"Mention cabinet replacement, appliance moves, gas/water line changes, ventilation hood specs, and any wall removal.",
  Bathroom:"Note fixture relocations (toilet, tub, shower), waterproofing, ventilation fan, and tile/finish work.",
  Addition:"Describe new square footage, floors affected, foundation type, and how the addition ties into the existing structure.",
  Roof:"State roof material (asphalt, tile, metal), tear-off vs overlay, total squares, and any structural reinforcement.",
  Structural:"Identify load-bearing walls, beams, posts, foundation work, and any engineer-stamped calculations.",
  Electrical:"List panel size, new circuits, service upgrade, EV charger, or solar interconnection.",
  Plumbing:"List re-pipes, water heater changes, sewer/lateral work, and any backflow prevention.",
  Other:"Briefly describe scope of work and the systems or areas affected.",
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
let stepError = null;

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

// Returns array of error messages for a step. Empty array = step is valid.
function validateStep(id){
  const errs = [];
  switch(id){
    case "1.1":
      if(!state["1.1"]?.street) errs.push("Street address is required.");
      if(!state["1.1"]?.zip) errs.push("Zip code is required.");
      break;
    case "1.2":
      if(!state["1.2"]?.type) errs.push("Choose a project type.");
      break;
    case "1.3":
      if(!state["1.3"]?.scope || state["1.3"].scope.trim().length < 10)
        errs.push("Describe the work in at least a sentence (10+ characters).");
      if(!state["1.3"]?.cost) errs.push("Estimated cost is required.");
      if(!state["1.3"]?.sqft) errs.push("Affected area (sq ft) is required.");
      break;
    case "1.4":
      if(!state["1.4"]?.start) errs.push("Estimated start date is required.");
      if(!state["1.4"]?.end) errs.push("Estimated end date is required.");
      if(state["1.4"]?.start && state["1.4"]?.end && state["1.4"].end < state["1.4"].start)
        errs.push("End date must be on or after start date.");
      break;
    case "2.1":
      if(!state.parcelResult) errs.push("Look up your parcel before continuing.");
      break;
    case "2.2":
      if(!state.files?.ownerDoc) errs.push("Upload a deed or tax bill (PDF).");
      break;
    case "2.3":
      if(!state["2.3"]?.who) errs.push("Select owner or contractor.");
      if(state["2.3"]?.who === "contractor" && !state["2.3"]?.license)
        errs.push("Contractor license number is required.");
      break;
    case "3.1":
      if(!state.files?.sitePlan) errs.push("Upload a site plan (PDF).");
      break;
    case "3.2":
      if(!state.files?.floorPlan) errs.push("Upload a floor plan (PDF).");
      break;
    case "3.3":
      if(!state.files?.elevations) errs.push("Upload elevation drawings (PDF).");
      break;
    case "3.4":
      if(!state.files?.energy) errs.push("Upload the energy compliance form (PDF).");
      break;
    case "4.1":
      if(!(state.parcelResult?.adjacent || []).length)
        errs.push("Run a parcel lookup at step 2.1 first.");
      break;
    case "4.2": {
      const adj = state.parcelResult?.adjacent || [];
      adj.forEach(p => {
        const c = state.neighbors?.[p] || {};
        if(c.mail) return;
        if(!c.name) errs.push(`Neighbor ${p}: owner name or mail-request needed.`);
        else if(!c.date) errs.push(`Neighbor ${p}: signature date needed.`);
      });
      break;
    }
    case "5.1":
      if(!state["5.1"]?.lead) errs.push("Answer the lead-paint question.");
      if((state["5.1"]?.lead === "Yes" || state["5.1"]?.lead === "Unknown") && !state["5.1"]?.acknowledged)
        errs.push("Acknowledge EPA lead-safe practices.");
      break;
    case "5.2":
      if(!state["5.2"]?.ack) errs.push("Acknowledge the historical-review surcharge.");
      break;
    case "5.3":
      // questionnaire — all optional, but must be visited
      break;
    case "6.3":
      if(!state["6.3"]?.attest) errs.push("You must attest the information is accurate.");
      // also require global readiness
      readinessIssues().forEach(m => errs.push(m));
      break;
  }
  return errs;
}

// Cross-step readiness for final submission.
function readinessIssues(){
  const issues = [];
  visibleSteps().forEach(s => {
    if(s.id === "6.3") return;
    const e = validateStep(s.id);
    if(e.length) issues.push(`Step ${s.id} ${s.title}: ${e[0]}`);
  });
  return issues;
}

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
      const valid = validateStep(s.id).length === 0;
      if(state.completed[s.id] && valid) cls.push("done");
      else if(state.completed[s.id] && !valid) cls.push("incomplete");
      html += `<li class="${cls.join(" ")}" data-id="${s.id}" tabindex="0" role="button" aria-current="${s.id===currentId?'step':'false'}">${s.title}</li>`;
    });
  });
  wrap.innerHTML = html;
  wrap.querySelectorAll(".substep").forEach(li => {
    const go = () => {
      const id = li.dataset.id;
      const idx = stepIndexById(id);
      const curIdx = stepIndexById(currentId);
      if(idx <= curIdx || state.completed[id]) goTo(id);
    };
    li.addEventListener("click", go);
    li.addEventListener("keydown", e => { if(e.key === "Enter" || e.key === " "){ e.preventDefault(); go(); }});
  });
}

function goTo(id){ stepError = null; currentId = id; state.lastId = id; persist(); renderTree(); renderStep(); renderChecklist(); recalcFees(); }

function renderStep(){
  const root = document.getElementById("stepRoot");
  const s = visibleSteps().find(x => x.id === currentId);
  const errBlock = stepError && stepError.length
    ? `<div class="error-sum" role="alert" aria-live="polite"><h3>Please fix the following before continuing:</h3><ul>${stepError.map(e=>`<li>${e}</li>`).join("")}</ul></div>`
    : "";
  root.innerHTML = errBlock + (STEP_RENDER[s.id] ? STEP_RENDER[s.id]() : `<h2>${s.title}</h2><p>This step has no specific fields. Click Continue to advance.</p>`);
  bindStep();
}

const STEP_RENDER = {
  "1.1": () => `<h2>1.1 Property address</h2><p class="lede">Where is the work happening? You can also start with the parcel number on step 2.1.</p>
    <div class="field"><label for="f-street">Street address <span class="req">*</span></label><input id="f-street" data-k="1.1.street" value="${state["1.1"]?.street || ""}" required aria-required="true"></div>
    <div class="field"><label for="f-city">City</label><input id="f-city" data-k="1.1.city" value="${state["1.1"]?.city || "Avalon Bay"}"></div>
    <div class="field"><label for="f-zip">Zip code <span class="req">*</span></label><input id="f-zip" data-k="1.1.zip" value="${state["1.1"]?.zip || ""}" placeholder="Zip" required aria-required="true" inputmode="numeric"></div>`,
  "1.2": () => `<h2>1.2 Project type</h2><p class="lede">Select the closest match. The form adapts based on this.</p>
    <fieldset class="radio-grid" aria-label="Project type"><legend class="sr-only">Project type</legend>${["Kitchen","Bathroom","Addition","Roof","Structural","Electrical","Plumbing","Other"].map((t,i) => `
      <label><input type="radio" name="ptype" value="${t}" ${state["1.2"]?.type===t?"checked":""}> ${t}</label>`).join("")}</fieldset>`,
  "1.3": () => {
    const type = state["1.2"]?.type;
    const hint = type ? SCOPE_HINTS[type] : null;
    return `<h2>1.3 Project scope</h2>
    ${hint ? `<p class="branch-hint"><strong>${type} tip:</strong> ${hint}</p>` : ""}
    <div class="field"><label for="f-scope">Describe the work in plain language <span class="req">*</span></label><textarea id="f-scope" data-k="1.3.scope" rows="5" required aria-required="true" aria-describedby="scope-hint">${state["1.3"]?.scope || ""}</textarea><p id="scope-hint" class="hint">At least one sentence. Reviewers use this to assign the right inspector.</p></div>
    <div class="field"><label class="check-row"><input type="checkbox" data-k="1.3.exteriorChanges" ${state["1.3"]?.exteriorChanges?"checked":""}> Involves changes to the exterior (façade, roofline, windows, doors)</label>${state["1.3"]?.exteriorChanges ? '<p class="inline-confirm">Selected — neighbor consent step (4) will be added to your application.</p>' : ''}</div>
    <div class="field"><label for="f-cost">Estimated cost of work (USD) <span class="req">*</span></label><input id="f-cost" type="number" min="0" data-k="1.3.cost" value="${state["1.3"]?.cost || ""}" required aria-required="true"></div>
    <div class="field"><label for="f-sqft">Affected area (sq ft) <span class="req">*</span></label><input id="f-sqft" type="number" min="0" data-k="1.3.sqft" value="${state["1.3"]?.sqft || ""}" required aria-required="true"></div>`;
  },
  "1.4": () => `<h2>1.4 Start / end dates</h2>
    <div class="field"><label for="f-start">Estimated start <span class="req">*</span></label><input id="f-start" type="date" data-k="1.4.start" value="${state["1.4"]?.start || ""}" required aria-required="true"></div>
    <div class="field"><label for="f-end">Estimated end <span class="req">*</span></label><input id="f-end" type="date" data-k="1.4.end" value="${state["1.4"]?.end || ""}" required aria-required="true"></div>`,
  "2.1": () => `<h2>2.1 Parcel lookup</h2><p class="lede">Enter your parcel number — we'll auto-fill zoning and adjacency from city records.</p>
    <div class="parcel-row"><label for="f-parcel" class="sr-only">Parcel number</label><input id="f-parcel" data-k="2.1.parcel" value="${state["2.1"]?.parcel || ""}" placeholder="e.g., AB-2401-0117"><button id="parcelLookup" type="button">Look up</button></div>
    <p class="hint">Try a sample: AB-2401-0117, AB-2305-0034, or AB-2210-0410.</p>
    <div id="parcelOut" aria-live="polite">${state.parcelResult ? parcelSuccessHtml(state.parcelResult) : ""}</div>`,
  "2.2": () => `<h2>2.2 Ownership proof <span class="req">*</span></h2><p class="lede">Upload a recent deed or tax bill.</p>
    ${uploadHtml("ownerDoc","Deed or tax bill (PDF)")}`,
  "2.3": () => `<h2>2.3 Contractor license</h2>
    <fieldset class="field"><legend>Are you the property owner, or a licensed contractor? <span class="req">*</span></legend>
      <div class="radio-grid"><label><input type="radio" name="who" value="owner" ${state["2.3"]?.who==="owner"?"checked":""}> Owner</label>
      <label><input type="radio" name="who" value="contractor" ${state["2.3"]?.who==="contractor"?"checked":""}> Contractor</label></div></fieldset>
    <div class="field"><label for="f-license">License number ${state["2.3"]?.who === "contractor" ? '<span class="req">*</span>' : '(if contractor)'}</label><input id="f-license" data-k="2.3.license" value="${state["2.3"]?.license || ""}" ${state["2.3"]?.who === "contractor" ? 'required aria-required="true"' : ''}></div>`,
  "3.1": () => `<h2>3.1 Site plan <span class="req">*</span></h2><p class="lede">Drawing showing the property boundary and any structures.</p>${uploadHtml("sitePlan","Site plan (PDF)")}`,
  "3.2": () => `<h2>3.2 Floor plan <span class="req">*</span></h2><p class="lede">Required for kitchen, bathroom, addition.</p>${uploadHtml("floorPlan","Floor plan (PDF)")}`,
  "3.3": () => `<h2>3.3 Elevation drawings <span class="req">*</span></h2><p class="lede">Required because your project is an addition or structural.</p>${uploadHtml("elevations","Elevation drawings (PDF)")}`,
  "3.4": () => `<h2>3.4 Energy compliance form <span class="req">*</span></h2><p class="lede">Required for roof, electrical, and HVAC scope.</p>${uploadHtml("energy","Title 24 / energy form (PDF)")}`,
  "4.1": () => `<h2>4.1 Adjacent parcels</h2><p class="lede">Auto-populated from your parcel lookup.</p>${
    (state.parcelResult?.adjacent || []).length === 0
      ? "<p class='hint'>Run a parcel lookup at step 2.1 first.</p>"
      : "<ul class='adj-list'>" + state.parcelResult.adjacent.map(p => `<li>${p} — ${PARCELS[p]?.addr || "address pending"}</li>`).join("") + "</ul>"
  }`,
  "4.2": () => {
    const adj = state.parcelResult?.adjacent || [];
    return `<h2>4.2 Neighbor signatures <span class="req">*</span></h2><p class="lede">Collect a signature from each adjacent owner, or request via mail (+$18 each, +14 days).</p>${
      adj.map(p => {
        const c = state.neighbors?.[p] || {};
        const safe = p.replace(/[^A-Za-z0-9]/g,'-');
        return `<div class="neighbor-card" data-p="${p}">
          <div class="parcel-info">${p} — ${PARCELS[p]?.addr || ""}</div>
          <label for="nb-name-${safe}">Owner name</label><input id="nb-name-${safe}" type="text" data-nk="${p}.name" value="${c.name || ""}">
          <label for="nb-date-${safe}">Signed on</label><input id="nb-date-${safe}" type="date" data-nk="${p}.date" value="${c.date || ""}">
          <label class="check-row"><input type="checkbox" data-nk="${p}.mail" ${c.mail ? "checked" : ""}> Request via mail instead</label>
        </div>`;
      }).join("")}`;
  },
  "5.1": () => `<h2>5.1 Lead paint disclosure</h2>
    <fieldset class="field"><legend>Was the property built before 1978? <span class="req">*</span></legend>
      <div class="radio-grid"><label><input type="radio" name="lead" value="Yes" ${state["5.1"]?.lead==="Yes"?"checked":""}> Yes</label>
      <label><input type="radio" name="lead" value="No" ${state["5.1"]?.lead==="No"?"checked":""}> No</label>
      <label><input type="radio" name="lead" value="Unknown" ${state["5.1"]?.lead==="Unknown"?"checked":""}> Unknown</label></div></fieldset>
    <div class="field"><label class="check-row"><input type="checkbox" data-k="5.1.acknowledged" ${state["5.1"]?.acknowledged?"checked":""}> I acknowledge EPA lead-safe work practices apply if Yes/Unknown.</label></div>`,
  "5.2": () => `<h2>5.2 Historical district review</h2><p class="lede">Your parcel is in a historical-district overlay. Additional review is required.</p>
    <div class="field"><label class="check-row"><input type="checkbox" data-k="5.2.ack" ${state["5.2"]?.ack?"checked":""}> I understand a historical-review surcharge ($120) applies and adds ~7 business days.</label></div>`,
  "5.3": () => `<h2>5.3 Environmental questionnaire</h2>
    <div class="field"><label class="check-row"><input type="checkbox" data-k="5.3.asbestos" ${state["5.3"]?.asbestos?"checked":""}> Work involves disturbing materials that may contain asbestos</label></div>
    <div class="field"><label class="check-row"><input type="checkbox" data-k="5.3.runoff" ${state["5.3"]?.runoff?"checked":""}> Work will alter stormwater runoff for &gt;500 sq ft of surface</label></div>
    <div class="field"><label class="check-row"><input type="checkbox" data-k="5.3.trees" ${state["5.3"]?.trees?"checked":""}> Removal of any tree &gt;6" caliper</label></div>`,
  "6.1": () => {
    const issues = readinessIssues();
    const readyBlock = issues.length
      ? `<div class="error-sum" role="alert"><h3>${issues.length} item${issues.length>1?'s':''} still need${issues.length>1?'':'s'} attention before submission</h3><ul>${issues.map(i=>`<li>${i}</li>`).join("")}</ul></div>`
      : `<div class="ready-block" role="status"><strong>✓ Ready to submit.</strong> All required fields and uploads are complete.</div>`;
    return `<h2>6.1 Summary</h2>
    ${readyBlock}
    <div class="parcel-result"><dl>
      <dt>Address</dt><dd>${state["1.1"]?.street || "—"}</dd>
      <dt>Project type</dt><dd>${state["1.2"]?.type || "—"}</dd>
      <dt>Scope</dt><dd>${state["1.3"]?.scope || "—"}</dd>
      <dt>Sq ft</dt><dd>${state["1.3"]?.sqft || "—"}</dd>
      <dt>Parcel</dt><dd>${state.parcelResult ? state["2.1"]?.parcel + " · " + state.parcelResult.zone + (state.parcelResult.historic ? " · historic" : "") : "—"}</dd>
      <dt>Documents</dt><dd>${["ownerDoc","sitePlan","floorPlan","elevations","energy"].filter(k => state.files?.[k]).length} uploaded</dd>
    </dl></div>`;
  },
  "6.2": () => `<h2>6.2 Fees</h2><p class="lede">Same numbers as the right-hand card. Pay when you submit.</p>
    <div class="parcel-result" id="feeBreakDup"></div>`,
  "6.3": () => {
    const issues = readinessIssues();
    const ready = issues.length === 0;
    return `<h2>6.3 Submit</h2><p class="lede">Confirm and submit. We email a receipt and assign a plan reviewer within 1 business day.</p>
    ${issues.length ? `<div class="error-sum" role="alert"><h3>Cannot submit yet — ${issues.length} item${issues.length>1?'s':''} incomplete</h3><ul>${issues.map(i=>`<li>${i}</li>`).join("")}</ul></div>` : ''}
    <div class="field"><label class="check-row"><input type="checkbox" data-k="6.3.attest" ${state["6.3"]?.attest?'checked':''}> I attest the information above is accurate. <span class="req">*</span></label></div>
    <button class="btn-primary" id="finalSubmit" ${ready ? '' : 'disabled aria-disabled="true"'}>Submit application</button>
    ${!ready ? '<p class="hint">Resolve the items above to enable submission.</p>' : ''}`;
  },
};

function uploadHtml(key, label){
  const f = state.files?.[key];
  const inputId = "up-" + key;
  return `<div class="upload-box ${f?"has":""}" data-key="${key}">
    ${f ? `<span class="file-name">✓ ${f}</span><button class="rm" type="button">Remove</button>` : `<span>${label}</span><label for="${inputId}" class="upload-btn">Upload<input id="${inputId}" type="file" accept="application/pdf,image/*"></label>`}
  </div>`;
}

function parcelSuccessHtml(r){
  return `<div class="parcel-success" role="status"><strong>✓ Parcel verified</strong> — matched against City of Avalon Bay records.</div>` + parcelHtml(r);
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
    if(currentId === "6.3" || currentId === "1.3") renderStep();
  }));
  document.querySelectorAll('input[name="ptype"]').forEach(r => r.addEventListener("change", () => {
    if(!state["1.2"]) state["1.2"]={}; state["1.2"].type = r.value; persist(); renderTree(); recalcFees(); renderChecklist();
  }));
  document.querySelectorAll('input[name="who"]').forEach(r => r.addEventListener("change", () => { if(!state["2.3"]) state["2.3"]={}; state["2.3"].who=r.value; persist(); renderStep(); }));
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
  if(lookup){
    lookup.addEventListener("click", () => {
      const p = document.querySelector('[data-k="2.1.parcel"]').value.trim().toUpperCase();
      const r = PARCELS[p];
      if(!r){ document.getElementById("parcelOut").innerHTML = `<p class="err" role="alert">Parcel not found. Try one of: AB-2401-0117, AB-2305-0034, AB-2210-0410.</p>`; return; }
      state.parcelResult = r; state.historic = r.historic; state["1.1"] = state["1.1"] || {}; state["1.1"].street = r.addr;
      persist(); document.getElementById("parcelOut").innerHTML = parcelSuccessHtml(r); renderTree(); renderChecklist(); recalcFees();
    });
    // Clear stale error when user edits parcel input.
    const parcelInput = document.querySelector('[data-k="2.1.parcel"]');
    if(parcelInput) parcelInput.addEventListener("input", () => {
      const out = document.getElementById("parcelOut");
      if(out && out.querySelector(".err")) out.innerHTML = state.parcelResult ? parcelSuccessHtml(state.parcelResult) : "";
    });
  }

  const submit = document.getElementById("finalSubmit");
  if(submit) submit.addEventListener("click", () => {
    const errs = validateStep("6.3");
    if(errs.length){
      stepError = errs;
      renderStep();
      return;
    }
    finalizeSubmission();
  });

  const expRev = document.getElementById("expRev");
  if(expRev) {
    // refresh inline expedited-review confirmation when toggled
  }

  const feeDup = document.getElementById("feeBreakDup");
  if(feeDup) feeDup.innerHTML = document.getElementById("feeLines").innerHTML;
}

function finalizeSubmission(){
  const appId = document.getElementById("appId").textContent;
  const submitted = {
    id: appId,
    type: (state["1.2"]?.type || "Permit") + " application",
    address: state["1.1"]?.street || "—",
    submitted: new Date().toLocaleDateString(undefined, {year:'numeric',month:'short',day:'numeric'}),
    status: "Submitted — awaiting plan reviewer",
    nextStep: "A plan reviewer will be assigned within 1 business day.",
    inspectorNotes: "No notes yet — submission received."
  };
  // Persist the submitted record into a separate list for my-applications.html
  try{
    const submittedList = JSON.parse(localStorage.getItem("civicport-submitted-v1") || "[]");
    submittedList.unshift(submitted);
    localStorage.setItem("civicport-submitted-v1", JSON.stringify(submittedList));
  }catch(e){}
  localStorage.removeItem(STORAGE);
  showConfirmation(submitted);
}

function showConfirmation(rec){
  document.querySelector(".three-pane").style.display = "none";
  const main = document.createElement("main");
  main.className = "confirm-page";
  main.setAttribute("role","status");
  main.setAttribute("aria-live","polite");
  main.innerHTML = `
    <div class="confirm-card">
      <div class="confirm-icon" aria-hidden="true">✓</div>
      <h1>Application submitted</h1>
      <p class="lede">Thank you. Your permit application has been received by the City of Avalon Bay.</p>
      <dl class="confirm-dl">
        <dt>Application ID</dt><dd><strong>${rec.id}</strong></dd>
        <dt>Type</dt><dd>${rec.type}</dd>
        <dt>Address</dt><dd>${rec.address}</dd>
        <dt>Submitted</dt><dd>${rec.submitted}</dd>
        <dt>Status</dt><dd><span class="badge warn">Awaiting plan reviewer</span></dd>
      </dl>
      <h3>What happens next</h3>
      <ol class="next-steps">
        <li>A plan reviewer is assigned within <strong>1 business day</strong>.</li>
        <li>You'll receive an email receipt with your application ID and any payment instructions.</li>
        <li>Track progress, inspector notes, and required actions on the <a href="my-applications.html">My applications</a> page.</li>
      </ol>
      <div class="confirm-actions">
        <a class="btn-primary" href="my-applications.html">Go to My applications</a>
        <a class="btn-secondary" href="index.html">Return to home</a>
      </div>
    </div>`;
  document.body.appendChild(main);
}

function renderChecklist(){
  const items = [
    {label:"Property address", done: !!state["1.1"]?.street && !!state["1.1"]?.zip},
    {label:"Project type selected", done: !!state["1.2"]?.type},
    {label:"Scope described", done: !!state["1.3"]?.scope && state["1.3"].scope.length >= 10 && !!state["1.3"]?.cost && !!state["1.3"]?.sqft},
    {label:"Start / end dates", done: !!state["1.4"]?.start && !!state["1.4"]?.end},
    {label:"Parcel verified", done: !!state.parcelResult},
    {label:"Ownership proof", done: !!state.files?.ownerDoc},
    {label:"Owner / contractor selected", done: !!state["2.3"]?.who && (state["2.3"].who !== "contractor" || !!state["2.3"]?.license)},
    {label:"Site plan", done: !!state.files?.sitePlan},
    {label:"Floor plan", done: !!state.files?.floorPlan},
  ];
  if(/Addition|Structural/.test(state["1.2"]?.type || "")) items.push({label:"Elevation drawings", done: !!state.files?.elevations});
  if(/Roof|Electrical|HVAC/.test(state["1.2"]?.type || "")) items.push({label:"Energy form", done: !!state.files?.energy});
  if(state["1.3"]?.exteriorChanges) items.push({label:"Neighbor consent gathered", done: Object.keys(state.neighbors||{}).length > 0});
  items.push({label:"Lead-paint disclosure", done: !!state["5.1"]?.lead && (state["5.1"].lead === "No" || !!state["5.1"]?.acknowledged)});
  if(state.historic) items.push({label:"Historical review acknowledged", done: !!state["5.2"]?.ack});
  items.push({label:"Final attestation", done: !!state["6.3"]?.attest});
  document.getElementById("checklist").innerHTML = items.map(i => `<li class="${i.done?"checked":""}">${i.label}</li>`).join("");
}

function recalcFees(){
  const type = state["1.2"]?.type;
  const exp = document.getElementById("expRev");
  const expChecked = exp && exp.checked;
  if(!type){
    let msg = "<li>Pick a project type first</li>";
    if(expChecked) msg += `<li class="defer-note">Expedited review will apply (+50%) once a project type is chosen.</li>`;
    document.getElementById("feeLines").innerHTML = msg;
    document.getElementById("feeTotal").textContent = "$0";
    return;
  }
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
  if(expChecked){ const fee = Math.round(total * 0.5); lines.push(["Expedited review (+50%)", fee]); total += fee; }
  document.getElementById("feeLines").innerHTML = lines.map(([l,v]) => `<li><span>${l}</span><span>$${v}</span></li>`).join("");
  document.getElementById("feeTotal").textContent = "$" + total;
}

document.getElementById("nextBtn").addEventListener("click", () => {
  const errs = validateStep(currentId);
  if(errs.length){
    stepError = errs;
    state.completed[currentId] = false;
    persist();
    renderStep();
    renderTree();
    return;
  }
  state.completed[currentId] = true;
  stepError = null;
  const visible = visibleSteps();
  const idx = visible.findIndex(s => s.id === currentId);
  if(idx < visible.length - 1) goTo(visible[idx + 1].id);
  else { renderTree(); renderStep(); }
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
