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
  if(state.livenessOk){ document.getElementById("livenessResult").textContent = "✓ Verified"; document.getElementById("livenessResult").classList.add("ok"); }
  if(state.fundMethod === "link"){ document.getElementById("linkBlock").hidden = false; }
}

function persist(){
  document.querySelectorAll("[name]").forEach(el => {
    if(el.type === "checkbox") state[el.name] = el.checked;
    else if(el.type === "radio"){ if(el.checked) state[el.name] = el.value; }
    else state[el.name] = el.value;
  });
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
  document.querySelector(".progress-fill::before");
  document.querySelector(".progress-fill").style.setProperty("--p", ((n-1)/(TOTAL_STEPS-1)*100) + "%");
  document.querySelector(".progress-bar").setAttribute("aria-valuenow", n);
  document.getElementById("prevBtn").hidden = n === 1;
  document.getElementById("nextBtn").style.display = n === 8 ? "none" : "";
  document.getElementById("helpContent").textContent = HELP[n];
  document.getElementById("errorSummary").hidden = true;
  if(n === 8) renderReview();
  window.scrollTo({top:0,behavior:"smooth"});
}

function validateStep(n){
  const step = document.querySelector(`.step[data-step="${n}"]`);
  const errors = [];
  step.querySelectorAll("[data-required]").forEach(el => {
    if(el.type === "checkbox"){
      if(!el.checked) errors.push({el, msg: "This must be checked"});
    } else if(el.type === "radio"){
      const group = step.querySelectorAll(`[name="${el.name}"]`);
      if(![...group].some(r => r.checked)){
        if(!errors.find(e => e.name === el.name)) errors.push({el, msg:"Select one", name: el.name});
      }
    } else if(el.type === "file"){
      if(!el.files || !el.files.length){
        const lbl = labelFor(el);
        errors.push({el, msg: `Please upload the ${lbl.toLowerCase()}`});
      }
    } else if(!el.value.trim()){
      errors.push({el, msg: `${labelFor(el)} is required`});
    } else if(el.name === "email" && !/^[^@]+@[^@]+\.[^@]+$/.test(el.value)){
      errors.push({el, msg: "Enter a valid email"});
    } else if(el.name === "dob" && !/^\d{2}\/\d{2}\/\d{4}$/.test(el.value)){
      errors.push({el, msg: "Enter date as MM/DD/YYYY"});
    } else if(el.name === "ssn" && !/^\d{3}-\d{2}-\d{4}$/.test(el.value)){
      errors.push({el, msg: "SSN must be 9 digits"});
    } else if(el.name === "phone" && !/^\(\d{3}\) \d{3}-\d{4}$/.test(el.value)){
      errors.push({el, msg: "Phone must be (XXX) XXX-XXXX"});
    } else if(el.name === "zip" && !/^\d{5}$/.test(el.value)){
      errors.push({el, msg: "Zip must be 5 digits"});
    }
  });
  if(n === 5 && !state.livenessOk){ errors.push({el: document.getElementById("livenessBtn"), msg: "Complete the liveness check"}); }
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
      return `<li><a href="#${e.el.id}">${e.msg}</a></li>`;
    }).join("");
    sum.hidden = false;
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
  });
}

document.querySelectorAll('.uploader input[type=file]').forEach(inp => {
  inp.addEventListener("change", () => {
    const file = inp.files[0]; if(!file) return;
    const uploader = inp.closest(".uploader");
    state[uploader.dataset.key] = file.name; persist();
    showFile(uploader, file.name);
    inp.classList.remove("invalid");
    const inlineErr = uploader.querySelector(".err");
    if(inlineErr) inlineErr.remove();
    const summary = document.getElementById("errorSummary");
    if(summary && !summary.hidden){
      const link = summary.querySelector(`a[href="#${inp.id}"]`);
      if(link){
        const li = link.closest("li");
        if(li) li.remove();
        if(!summary.querySelector("li")) summary.hidden = true;
      }
    }
  });
});

document.querySelectorAll(".step select, .step input[type=text], .step input:not([type])").forEach(el => {
  el.addEventListener("change", () => {
    el.classList.add("just-changed");
    setTimeout(() => el.classList.remove("just-changed"), 600);
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
      clearInterval(t); d.close();
      document.getElementById("livenessResult").textContent = "✓ Verified";
      document.getElementById("livenessResult").classList.add("ok");
      state.livenessOk = true; persist();
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

document.getElementById("applyForm").addEventListener("input", () => {
  clearTimeout(window._t); window._t = setTimeout(persist, 400);
});

populateState();
restore();
showStep(state.lastStep || 1);
