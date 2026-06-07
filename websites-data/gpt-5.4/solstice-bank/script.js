const TOTAL_STEPS = 8;
const STORAGE_KEY = "solstice-application-v1";
const STATES = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY","DC"];
const INDUSTRIES = ["Accounting & finance","Agriculture","Architecture","Arts & entertainment","Construction","Consulting","Design (UX/graphic)","Education","Engineering (software)","Engineering (other)","Film & media","Food & beverage","Government","Healthcare","Hospitality","Legal","Manufacturing","Marketing & PR","Nonprofit","Real estate","Retail","Science & research","Transportation","Wholesale","Writing & journalism","Other"];

const HELP = {
  1: "We're checking the basics required by US banking regulations. None of these will affect your credit score.",
  2: "We use your full legal name and SSN to verify identity with the credit bureaus. SSN is stored encrypted.",
  3: "We send statements to your address. We text login confirmations to your phone.",
  4: "Freelancers and self-employed folks are our core users. Income estimate doesn't have to be exact.",
  5: "We compare your photo ID with a quick selfie. Both are deleted after verification finishes.",
  6: "Required by US banking law. These answers shape fraud monitoring — they don't affect approval.",
  7: "You can fund later if you'd prefer. The account is opened either way once you submit.",
  8: "Last chance to fix anything. We'll make a decision in 1–3 business days.",
};

const ELIG_MESSAGES = {
  eligUS: "Confirm you are a US resident",
  eligAge: "Confirm you are 18 years or older",
  eligPatriot: "Consent to USA PATRIOT Act identity verification",
  eligToS: "Agree to the Deposit Account Agreement and Terms of Service",
};

let currentStep = 1;
let state = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
state.idFront = state.idFront || null;
state.idBack = state.idBack || null;
state.livenessOk = state.livenessOk || false;

function populateState(){
  const sel = document.getElementById("stateSel");
  STATES.forEach(s => { const o = document.createElement("option"); o.value = s; o.textContent = s; sel.appendChild(o); });
  const ind = document.getElementById("industrySel");
  INDUSTRIES.forEach(s => { const o = document.createElement("option"); o.value = s; o.textContent = s; ind.appendChild(o); });
}

function restore(){
  document.querySelectorAll("[name]").forEach(el => {
    const k = el.name; if(state[k] === undefined) return;
    if(el.type === "checkbox") el.checked = !!state[k];
    else if(el.type === "radio") el.checked = el.value === state[k];
    else el.value = state[k];
  });
  if(state.idFront) showFile(document.querySelector('[data-key="idFront"]'), state.idFront);
  if(state.idBack) showFile(document.querySelector('[data-key="idBack"]'), state.idBack);
  if(state.livenessOk){ markLivenessVerified(); }
  if(state.fundMethod === "link"){ document.getElementById("linkBlock").hidden = false; }
}

function persist(){
  document.querySelectorAll("[name]").forEach(el => {
    if(el.type === "checkbox") state[el.name] = el.checked;
    else if(el.type === "radio"){ if(el.checked) state[el.name] = el.value; }
    else state[el.name] = el.value;
  });
  state.lastStep = currentStep;
  state.inProgress = true;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  document.getElementById("saveStatus").textContent = "Auto-saved · just now";
}

function showStep(n){
  currentStep = n;
  document.querySelectorAll(".step").forEach(s => s.hidden = +s.dataset.step !== n);
  document.querySelectorAll("#progressSteps li").forEach(li => {
    const s = +li.dataset.step;
    li.classList.toggle("current", s === n);
    li.classList.toggle("done", s < n);
  });
  document.querySelector(".progress-fill").style.setProperty("--p", ((n-1)/(TOTAL_STEPS-1)*100) + "%");
  document.querySelector(".progress-bar").setAttribute("aria-valuenow", n);
  document.getElementById("prevBtn").hidden = n === 1;
  document.getElementById("nextBtn").style.display = n === 8 ? "none" : "";
  document.getElementById("helpContent").textContent = HELP[n];
  document.getElementById("errorSummary").hidden = true;
  if(n === 8) renderReview();
  state.lastStep = n;
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch(e){}
  window.scrollTo({top:0,behavior:"smooth"});
}

function fieldErrorMessage(el){
  if(el.type === "checkbox"){
    return ELIG_MESSAGES[el.name] || "This must be checked";
  }
  if(el.type === "radio") return "Select one option";
  if(!el.value || !el.value.trim()) return `${labelFor(el)} is required`;
  if(el.name === "email" && !/^[^@]+@[^@]+\.[^@]+$/.test(el.value)) return "Enter a valid email";
  if(el.name === "dob" && !/^\d{2}\/\d{2}\/\d{4}$/.test(el.value)) return "Enter date as MM/DD/YYYY";
  if(el.name === "ssn" && !/^\d{3}-\d{2}-\d{4}$/.test(el.value)) return "SSN must be 9 digits";
  if(el.name === "phone" && !/^\(\d{3}\) \d{3}-\d{4}$/.test(el.value)) return "Phone must be (XXX) XXX-XXXX";
  if(el.name === "zip" && !/^\d{5}$/.test(el.value)) return "Zip must be 5 digits";
  return "";
}

function isFieldValid(el){
  if(el.type === "checkbox") return el.checked;
  if(el.type === "radio"){
    const group = document.querySelectorAll(`[name="${el.name}"]`);
    return [...group].some(r => r.checked);
  }
  return !fieldErrorMessage(el);
}

function clearFieldError(el){
  el.classList.remove("invalid");
  el.classList.add("resolved");
  // Remove inline err sibling
  const parent = el.parentElement;
  if(parent){
    parent.querySelectorAll(":scope > .err").forEach(e => e.remove());
  }
  // Remove from summary list
  const sum = document.getElementById("errorSummary");
  if(sum && !sum.hidden && el.id){
    const link = sum.querySelector(`a[href="#${CSS.escape(el.id)}"]`);
    if(link){
      const li = link.closest("li");
      if(li) li.remove();
      const remaining = sum.querySelectorAll("li").length;
      if(remaining === 0) sum.hidden = true;
    }
  }
  // Brief resolved highlight then fade
  setTimeout(() => el.classList.remove("resolved"), 1400);
}

function attachLiveValidation(){
  document.querySelectorAll("[data-required]").forEach(el => {
    const handler = () => {
      if(el.classList.contains("invalid") && isFieldValid(el)){
        clearFieldError(el);
      }
      // For radio groups, also clear other radios with the same name
      if(el.type === "radio"){
        document.querySelectorAll(`[name="${el.name}"]`).forEach(r => {
          if(r.classList.contains("invalid") && isFieldValid(r)) clearFieldError(r);
        });
      }
    };
    el.addEventListener("input", handler);
    el.addEventListener("change", handler);
    el.addEventListener("blur", handler);
  });
  // Also clear liveness "error" once verified is true
}

function validateStep(n){
  const step = document.querySelector(`.step[data-step="${n}"]`);
  const errors = [];
  step.querySelectorAll("[data-required]").forEach(el => {
    if(el.type === "checkbox"){
      if(!el.checked) errors.push({el, msg: ELIG_MESSAGES[el.name] || "This must be checked"});
    } else if(el.type === "radio"){
      const group = step.querySelectorAll(`[name="${el.name}"]`);
      if(![...group].some(r => r.checked)){
        if(!errors.find(e => e.name === el.name)) errors.push({el, msg:"Select one option", name: el.name});
      }
    } else {
      const m = fieldErrorMessage(el);
      if(m) errors.push({el, msg: m});
    }
  });
  if(n === 5){
    const idFrontInput = document.querySelector('[data-key="idFront"] input[type=file]');
    if(!state.idFront && idFrontInput){
      errors.push({el: idFrontInput, msg: "Front of ID is required"});
    }
    if(!state.livenessOk){ errors.push({el: document.getElementById("livenessBtn"), msg: "Complete the liveness check"}); }
  }
  step.querySelectorAll(".invalid").forEach(el => el.classList.remove("invalid"));
  step.querySelectorAll(".err").forEach(el => el.remove());

  if(errors.length){
    const sum = document.getElementById("errorSummary");
    sum.querySelector("ul").innerHTML = errors.map((e,i) => {
      const id = "err-anchor-" + i;
      e.el.id = e.el.id || id;
      e.el.classList.add("invalid");
      const inline = document.createElement("span"); inline.className = "err"; inline.textContent = e.msg;
      if(e.el.parentElement) e.el.parentElement.appendChild(inline);
      return `<li><a href="#${e.el.id}" data-target="${e.el.id}">${e.msg}</a></li>`;
    }).join("");
    sum.hidden = false;
    // Wire summary links to focus + highlight target
    sum.querySelectorAll("a[data-target]").forEach(a => {
      a.addEventListener("click", evt => {
        evt.preventDefault();
        const target = document.getElementById(a.dataset.target);
        if(!target) return;
        target.scrollIntoView({behavior:"smooth", block:"center"});
        if(typeof target.focus === "function"){
          try { target.focus({preventScroll:true}); } catch(_) { target.focus(); }
        }
        target.classList.add("flash");
        setTimeout(() => target.classList.remove("flash"), 1600);
      });
    });
    sum.focus();
    return false;
  }
  return true;
}

function labelFor(el){
  const lbl = el.closest("label");
  if(lbl){ const txt = lbl.childNodes[0]; if(txt && txt.textContent) return txt.textContent.trim(); }
  return el.name;
}

function renderReview(){
  const grouping = [
    {title:"Eligibility", step:1, keys:[["eligUS","US resident"],["eligAge","18+"],["eligPatriot","PATRIOT consent"],["eligToS","Agreed to ToS"]]},
    {title:"About you", step:2, keys:[["firstName","First"],["middleName","Middle"],["lastName","Last"],["dob","DOB"],["ssn","SSN"],["citizenship","Citizenship"]]},
    {title:"Contact", step:3, keys:[["phone","Phone"],["email","Email"],["street","Street"],["apt","Apt"],["city","City"],["state","State"],["zip","Zip"],["residence","Residence"]]},
    {title:"Employment", step:4, keys:[["employment","Status"],["industry","Industry"],["income","Income"],["source","Source"]]},
    {title:"Identity verified", step:5, keys:[]},
    {title:"Risk", step:6, keys:[["riskDeposits","Monthly deposits"],["riskIntl","Intl wires"],["riskCrypto","Crypto"],["riskTxn","Txn count"],["riskOccupation","Occupation"]]},
    {title:"Funding", step:7, keys:[["fundMethod","Method"],["initialDeposit","Initial deposit"]]},
  ];
  document.getElementById("reviewBlocks").innerHTML = grouping.map(g => {
    let body;
    if(g.step === 5){
      body = `<dl><dt>Photo ID</dt><dd>${state.idFront ? "Uploaded" : "—"} / ${state.idBack ? "Uploaded" : "—"}</dd><dt>Liveness</dt><dd>${state.livenessOk ? "✓ Verified" : "—"}</dd></dl>`;
    } else {
      body = `<dl>${g.keys.map(([k,l]) => `<dt>${l}</dt><dd>${formatVal(state[k])}</dd>`).join("")}</dl>`;
    }
    return `<div class="review-block"><h4>${g.title}<button type="button" data-go="${g.step}">Edit</button></h4>${body}</div>`;
  }).join("");
  document.querySelectorAll('#reviewBlocks button[data-go]').forEach(b => b.addEventListener("click", () => showStep(+b.dataset.go)));
}

function formatVal(v){
  if(v === undefined || v === null || v === "") return "—";
  if(v === true) return "✓";
  if(v === false) return "—";
  return v;
}

function showFile(uploader, name){
  uploader.classList.add("has-file");
  uploader.querySelector(".preview").innerHTML = `<div class="file-thumb">✓ ${name}<button type="button" class="rm">Remove</button></div>`;
  uploader.querySelector(".rm").addEventListener("click", () => {
    uploader.classList.remove("has-file");
    uploader.querySelector(".preview").innerHTML = "";
    uploader.querySelector('input[type=file]').value = "";
    state[uploader.dataset.key] = null; persist();
    updateVerifyChecklist();
  });
  updateVerifyChecklist();
  // Clear any error on the file input
  const inp = uploader.querySelector('input[type=file]');
  if(inp && inp.classList.contains("invalid")) clearFieldError(inp);
}

function markLivenessVerified(){
  const result = document.getElementById("livenessResult");
  result.textContent = "✓ Verified";
  result.classList.add("ok");
  const btn = document.getElementById("livenessBtn");
  if(btn){
    btn.textContent = "Retake selfie";
    btn.classList.add("done");
  }
  updateVerifyChecklist();
}

function updateVerifyChecklist(){
  const cl = document.getElementById("verifyChecklist");
  if(!cl) return;
  const items = [
    {key:"front", label:"Front of ID uploaded", done: !!state.idFront},
    {key:"back",  label:"Back of ID uploaded (optional)", done: !!state.idBack, optional:true},
    {key:"live",  label:"Liveness selfie complete", done: !!state.livenessOk},
  ];
  cl.innerHTML = items.map(it =>
    `<li class="${it.done ? 'done' : 'pending'}${it.optional ? ' optional' : ''}"><span class="dot" aria-hidden="true">${it.done ? '✓' : '•'}</span>${it.label}${it.optional && !it.done ? ' <em>(optional)</em>' : ''}</li>`
  ).join("");
}

document.querySelectorAll('.uploader input[type=file]').forEach(inp => {
  inp.addEventListener("change", () => {
    const file = inp.files[0]; if(!file) return;
    const uploader = inp.closest(".uploader");
    state[uploader.dataset.key] = file.name; persist();
    showFile(uploader, file.name);
  });
});

document.querySelectorAll(".bank-btn").forEach(b => b.addEventListener("click", () => {
  document.getElementById("bankAuth").hidden = false;
  document.getElementById("bankName").textContent = "Sign in to " + b.dataset.bank;
  state.bankChoice = b.dataset.bank; persist();
}));
document.getElementById("bankConnect").addEventListener("click", () => {
  const u = document.querySelector('[name="bankUser"]').value;
  if(!u){ document.getElementById("bankStatus").textContent = "Enter your username"; return; }
  document.getElementById("bankStatus").textContent = "✓ Connected to " + state.bankChoice;
  state.bankConnected = true; persist();
});

document.getElementById("livenessBtn").addEventListener("click", () => {
  const d = document.getElementById("livenessDialog"); d.showModal();
  let n = 3;
  document.getElementById("livenessCount").textContent = n;
  const t = setInterval(() => {
    n--;
    if(n <= 0){
      clearInterval(t);
      // Show in-dialog confirmation briefly so the success is not abrupt
      document.getElementById("livenessCount").textContent = "✓";
      const msg = document.getElementById("livenessDoneMsg");
      if(msg){ msg.hidden = false; }
      setTimeout(() => {
        d.close();
        if(msg) msg.hidden = true;
        markLivenessVerified();
        state.livenessOk = true; persist();
      }, 700);
    } else document.getElementById("livenessCount").textContent = n;
  }, 800);
});

document.querySelectorAll('[name="fundMethod"]').forEach(r => r.addEventListener("change", () => {
  document.getElementById("linkBlock").hidden = r.value !== "link" || !r.checked;
}));

function checkDepositWarning(){
  const dep = state.riskDeposits, inc = parseInt((state.income || "").replace(/[^\d]/g,""));
  if(!dep || !inc) return;
  const ranges = {"Under $2,000":1000,"$2,000 – $10,000":6000,"$10,000 – $50,000":30000,"$50,000+":80000};
  const r = ranges[dep] || 0;
  document.getElementById("depositWarning").hidden = r * 12 < inc * 1.5;
}

document.querySelectorAll("[data-mask]").forEach(el => {
  el.addEventListener("input", () => {
    const t = el.dataset.mask;
    let v = el.value.replace(/[^\d]/g,"");
    if(t === "phone"){ v = v.slice(0,10); el.value = v.length>6 ? `(${v.slice(0,3)}) ${v.slice(3,6)}-${v.slice(6)}` : v.length>3 ? `(${v.slice(0,3)}) ${v.slice(3)}` : v.length>0 ? `(${v}` : ""; }
    else if(t === "ssn"){ v = v.slice(0,9); el.value = v.length>5 ? `${v.slice(0,3)}-${v.slice(3,5)}-${v.slice(5)}` : v.length>3 ? `${v.slice(0,3)}-${v.slice(3)}` : v; }
    else if(t === "dob"){ v = v.slice(0,8); el.value = v.length>4 ? `${v.slice(0,2)}/${v.slice(2,4)}/${v.slice(4)}` : v.length>2 ? `${v.slice(0,2)}/${v.slice(2)}` : v; }
    else if(t === "currency"){ el.value = v ? "$" + parseInt(v).toLocaleString() : ""; }
  });
});

document.getElementById("nextBtn").addEventListener("click", () => {
  if(!validateStep(currentStep)) return;
  persist();
  checkDepositWarning();
  if(currentStep < TOTAL_STEPS) showStep(currentStep + 1);
});
document.getElementById("prevBtn").addEventListener("click", () => { if(currentStep > 1) showStep(currentStep - 1); });
document.querySelectorAll("#progressSteps li").forEach(li => li.addEventListener("click", () => {
  const s = +li.dataset.step;
  if(s < currentStep) showStep(s);
}));

document.getElementById("applyForm").addEventListener("submit", e => {
  e.preventDefault();
  if(!validateStep(8)) return;
  state.inProgress = false;
  localStorage.removeItem(STORAGE_KEY);
  window.location.href = "confirmation.html";
});

document.getElementById("saveLater").addEventListener("click", () => { persist(); document.getElementById("saveDialog").showModal(); });
document.getElementById("saveOk").addEventListener("click", () => document.getElementById("saveDialog").close());

document.getElementById("cancelApp").addEventListener("click", () => document.getElementById("cancelDialog").showModal());
document.getElementById("cancelNo").addEventListener("click", () => document.getElementById("cancelDialog").close());
document.getElementById("cancelYes").addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEY);
  window.location.href = "index.html";
});

document.getElementById("helpOpen").addEventListener("click", () => { document.getElementById("helpDrawer").hidden = false; });
document.getElementById("helpClose").addEventListener("click", () => { document.getElementById("helpDrawer").hidden = true; });

// Brand link warning when leaving mid-application
const brandLink = document.querySelector(".apply-bar .brand");
if(brandLink){
  brandLink.addEventListener("click", e => {
    const hasProgress = state.inProgress || (state.lastStep && state.lastStep > 1) ||
      Object.keys(state).some(k => state[k] && !["idFront","idBack","livenessOk","lastStep","inProgress"].includes(k));
    if(hasProgress){
      e.preventDefault();
      const dlg = document.getElementById("leaveDialog");
      if(dlg){ dlg.showModal(); }
      else if(confirm("Leave the application? Your progress is auto-saved and you can resume later.")){
        window.location.href = "index.html";
      }
    }
  });
}
const leaveStay = document.getElementById("leaveStay");
const leaveGo = document.getElementById("leaveGo");
if(leaveStay) leaveStay.addEventListener("click", () => document.getElementById("leaveDialog").close());
if(leaveGo) leaveGo.addEventListener("click", () => { persist(); window.location.href = "index.html"; });

document.getElementById("applyForm").addEventListener("input", () => {
  clearTimeout(window._t); window._t = setTimeout(persist, 400);
});

populateState();
restore();
attachLiveValidation();
updateVerifyChecklist();
showStep(state.lastStep || 1);
