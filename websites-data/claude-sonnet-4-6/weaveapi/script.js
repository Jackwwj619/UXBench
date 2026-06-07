const NAV = [
  {group:"Getting started", items:[["Quickstart","quickstart.html"],["Authentication","index.html#authentication"],["Idempotency","index.html#idempotency"],["Pagination","index.html#pagination"]]},
  {group:"Core resources", items:[["Charges","charges.html"],["Customers","customers.html"]]},
  {group:"Payment methods", items:[["Cards (in Charge object)","charges.html#charge-object",true],["Bank (in Charge object)","charges.html#charge-object",true],["Wallets (in Charge object)","charges.html#charge-object",true]]},
  {group:"Webhooks", items:[["Events","webhooks.html#events"],["Verifying","webhooks.html#signing"],["Retries","webhooks.html#retries"]]},
  {group:"Errors", items:[["Error codes","errors.html"]]},
];

const SNIPPETS = {
  "default": {
    python: `from weave import Weave\n\nclient = Weave("sk_test_4eC39HqLyjWDarjtT1zdp7dc")\n\ncharge = client.charges.create(\n    amount=2000,\n    currency="usd",\n    payment_method="pm_card_visa",\n    description="UXBench demo charge",\n)\nprint(charge.id, charge.status)`,
    node: `import { Weave } from "weaveapi";\n\nconst weave = new Weave("sk_test_4eC39HqLyjWDarjtT1zdp7dc");\n\nconst charge = await weave.charges.create({\n  amount: 2000,\n  currency: "usd",\n  paymentMethod: "pm_card_visa",\n  description: "UXBench demo charge",\n});\nconsole.log(charge.id, charge.status);`,
    go: `import "github.com/weaveapi/weave-go"\n\nclient := weave.New("sk_test_4eC39HqLyjWDarjtT1zdp7dc")\n\ncharge, err := client.Charges.Create(&weave.ChargeParams{\n    Amount: 2000,\n    Currency: "usd",\n    PaymentMethod: "pm_card_visa",\n    Description: "UXBench demo charge",\n})`,
    curl: `curl -X POST https://api.weave.dev/v1/charges \\\n  -H "Authorization: Bearer sk_test_4eC39HqLyjWDarjtT1zdp7dc" \\\n  -H "Idempotency-Key: $(uuidgen)" \\\n  -d amount=2000 -d currency=usd -d payment_method=pm_card_visa`,
  },
  "auth": {
    curl: `curl https://api.weave.dev/v1/charges/ch_3OZ9aB \\\n  -u sk_test_4eC39HqLyjWDarjtT1zdp7dc:`,
    python: `client = Weave(api_key="sk_test_4eC39HqLyjWDarjtT1zdp7dc")`,
    node: `const weave = new Weave("sk_test_4eC39HqLyjWDarjtT1zdp7dc");`,
    go: `client := weave.New("sk_test_4eC39HqLyjWDarjtT1zdp7dc")`,
  },
  "create-charge": {
    curl: `curl https://api.weave.dev/v1/charges \\\n  -H "Authorization: Bearer sk_test_4eC39HqLyjWDarjtT1zdp7dc" \\\n  -d amount=2000 -d currency=usd -d payment_method=pm_card_visa`,
    python: `client.charges.create(amount=2000, currency="usd", payment_method="pm_card_visa")`,
    node: `await weave.charges.create({ amount: 2000, currency: "usd", paymentMethod: "pm_card_visa" });`,
    go: `client.Charges.Create(&weave.ChargeParams{Amount: 2000, Currency: "usd", PaymentMethod: "pm_card_visa"})`,
  },
  "create-charge-response": {
    raw: `{\n  "id": "ch_3OZ9aB1k0p8q2X",\n  "object": "charge",\n  "amount": 2000,\n  "currency": "usd",\n  "customer": null,\n  "status": "succeeded",\n  "captured": true,\n  "payment_method": "pm_card_visa",\n  "description": "UXBench demo charge",\n  "receipt_url": "https://pay.weave.dev/receipts/ch_3OZ9aB",\n  "created": 1747000000,\n  "livemode": false\n}`
  },
  "retrieve-charge": {
    curl: `curl https://api.weave.dev/v1/charges/ch_3OZ9aB -H "Authorization: Bearer sk_test_…"`,
    python: `client.charges.retrieve("ch_3OZ9aB")`,
    node: `await weave.charges.retrieve("ch_3OZ9aB");`,
    go: `client.Charges.Retrieve("ch_3OZ9aB")`,
  },
  "capture-charge": {
    curl: `curl -X POST https://api.weave.dev/v1/charges/ch_3OZ9aB/capture -H "Authorization: Bearer sk_test_…" -d amount=1500`,
    python: `client.charges.capture("ch_3OZ9aB", amount=1500)`,
    node: `await weave.charges.capture("ch_3OZ9aB", { amount: 1500 });`,
    go: `client.Charges.Capture("ch_3OZ9aB", &weave.CaptureParams{Amount: 1500})`,
  },
  "refund-charge": {
    curl: `curl -X POST https://api.weave.dev/v1/charges/ch_3OZ9aB/refund -H "Authorization: Bearer sk_test_…" -d amount=500`,
    python: `client.charges.refund("ch_3OZ9aB", amount=500)`,
    node: `await weave.charges.refund("ch_3OZ9aB", { amount: 500 });`,
    go: `client.Charges.Refund("ch_3OZ9aB", &weave.RefundParams{Amount: 500})`,
  },
  "list-charges": {
    curl: `curl "https://api.weave.dev/v1/charges?customer=cus_abc&limit=10" -H "Authorization: Bearer sk_test_…"`,
    python: `client.charges.list(customer="cus_abc", limit=10)`,
    node: `await weave.charges.list({ customer: "cus_abc", limit: 10 });`,
    go: `client.Charges.List(&weave.ChargeListParams{Customer: "cus_abc", Limit: 10})`,
  },
  "create-customer": {
    curl: `curl https://api.weave.dev/v1/customers -H "Authorization: Bearer sk_test_…" -d email=tomas@example.com -d name="Tomás Vilar"`,
    python: `client.customers.create(email="tomas@example.com", name="Tomás Vilar")`,
    node: `await weave.customers.create({ email: "tomas@example.com", name: "Tomás Vilar" });`,
    go: `client.Customers.Create(&weave.CustomerParams{Email: "tomas@example.com", Name: "Tomás Vilar"})`,
  },
  "retrieve-customer": {
    curl: `curl https://api.weave.dev/v1/customers/cus_abc -H "Authorization: Bearer sk_test_…"`,
    python: `client.customers.retrieve("cus_abc")`,
    node: `await weave.customers.retrieve("cus_abc");`,
    go: `client.Customers.Retrieve("cus_abc")`,
  },
  "update-customer": {
    curl: `curl https://api.weave.dev/v1/customers/cus_abc -H "Authorization: Bearer sk_test_…" -d email=new@example.com`,
    python: `client.customers.update("cus_abc", email="new@example.com")`,
    node: `await weave.customers.update("cus_abc", { email: "new@example.com" });`,
    go: `client.Customers.Update("cus_abc", &weave.CustomerParams{Email: "new@example.com"})`,
  },
  "list-customers": {
    curl: `curl "https://api.weave.dev/v1/customers?limit=25" -H "Authorization: Bearer sk_test_…"`,
    python: `client.customers.list(limit=25)`,
    node: `await weave.customers.list({ limit: 25 });`,
    go: `client.Customers.List(&weave.ListParams{Limit: 25})`,
  },
  "webhook-verify": {
    python: `import hmac, hashlib, time\n\ndef verify(payload, header, secret, tolerance=300):\n    ts, sig = [p.split("=")[1] for p in header.split(",")]\n    if abs(time.time() - int(ts)) > tolerance:\n        raise ValueError("expired")\n    expected = hmac.new(secret.encode(), f"{ts}.{payload}".encode(), hashlib.sha256).hexdigest()\n    if not hmac.compare_digest(expected, sig):\n        raise ValueError("bad signature")`,
    node: `import crypto from "node:crypto";\n\nfunction verify(payload, header, secret, tolerance = 300) {\n  const [t, sig] = header.split(",").map(p => p.split("=")[1]);\n  if (Math.abs(Date.now()/1000 - +t) > tolerance) throw new Error("expired");\n  const expected = crypto.createHmac("sha256", secret).update(\`\${t}.\${payload}\`).digest("hex");\n  if (!crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(sig))) throw new Error("bad signature");\n}`,
    go: `func verify(payload, header, secret string) error {\n    parts := strings.Split(header, ",")\n    var ts, sig string\n    for _, p := range parts {\n        kv := strings.SplitN(p, "=", 2)\n        if kv[0] == "t" { ts = kv[1] }; if kv[0] == "v1" { sig = kv[1] }\n    }\n    h := hmac.New(sha256.New, []byte(secret))\n    h.Write([]byte(ts + "." + payload))\n    if hex.EncodeToString(h.Sum(nil)) != sig { return errors.New("bad signature") }\n    return nil\n}`,
    curl: `# verify via openssl + sha256\necho -n "$timestamp.$body" | openssl dgst -sha256 -hmac "$WEBHOOK_SECRET"`,
  },
  "install": {
    curl: `# cURL ships with macOS and most Linux distros — no SDK install required.\n# Skip ahead to step 2 to make your first request, or pick a language tab\n# above (PYTHON, NODE, GO) for the matching SDK install command.`,
    python: `pip install weaveapi`,
    node: `npm install weaveapi`,
    go: `go get github.com/weaveapi/weave-go`,
  },
};

const SEARCH_INDEX = [
  {t:"Authentication", p:"index.html#authentication"},
  {t:"Idempotency", p:"index.html#idempotency"},
  {t:"Pagination", p:"index.html#pagination"},
  {t:"Quickstart", p:"quickstart.html"},
  {t:"Charges — Create", p:"charges.html#create"},
  {t:"Charges — Retrieve", p:"charges.html#retrieve"},
  {t:"Charges — Capture", p:"charges.html#capture"},
  {t:"Charges — Refund", p:"charges.html#refund"},
  {t:"Charges — List", p:"charges.html#list"},
  {t:"Customers — Create", p:"customers.html#create-c"},
  {t:"Customers — List", p:"customers.html#list-c"},
  {t:"Webhooks — Events", p:"webhooks.html#events"},
  {t:"Webhooks — Verifying signatures", p:"webhooks.html#signing"},
  {t:"Error codes", p:"errors.html"},
];

const TRY_ENDPOINTS = {
  "create-charge": {method:"POST", path:"/v1/charges", title:"Create charge", params:[
    {k:"amount",v:"2000",hint:"Amount in cents (e.g. 2000 = $20.00)"},
    {k:"currency",v:"usd",hint:"usd · eur · gbp · jpy"},
    {k:"payment_method",v:"pm_card_visa"}
  ]},
  "retrieve-charge": {method:"GET", path:"/v1/charges/{id}", title:"Retrieve charge", params:[{k:"id",v:"ch_3OZ9aB"}]},
  "capture-charge": {method:"POST", path:"/v1/charges/{id}/capture", title:"Capture charge", params:[{k:"id",v:"ch_3OZ9aB"},{k:"amount",v:"1500"}]},
  "refund-charge": {method:"POST", path:"/v1/charges/{id}/refund", title:"Refund charge", params:[{k:"id",v:"ch_3OZ9aB"},{k:"amount",v:"500"}]},
  "list-charges": {method:"GET", path:"/v1/charges", title:"List charges", params:[{k:"limit",v:"10"},{k:"customer",v:""}]},
  "create-customer": {method:"POST", path:"/v1/customers", title:"Create customer", params:[{k:"email",v:"tomas@example.com"},{k:"name",v:"Tomás Vilar"}]},
  "retrieve-customer": {method:"GET", path:"/v1/customers/{id}", title:"Retrieve customer", params:[{k:"id",v:"cus_abc"}]},
  "update-customer": {method:"POST", path:"/v1/customers/{id}", title:"Update customer", params:[{k:"id",v:"cus_abc"},{k:"email",v:"new@example.com"}]},
  "delete-customer": {method:"DELETE", path:"/v1/customers/{id}", title:"Delete customer", params:[{k:"id",v:"cus_abc"}]},
  "list-customers": {method:"GET", path:"/v1/customers", title:"List customers", params:[{k:"limit",v:"25"}]},
};

let activeLang = localStorage.getItem("weave-lang") || "curl";
let history_ = [];

function $(s,r){ return (r||document).querySelector(s); }
function $$(s,r){ return [...(r||document).querySelectorAll(s)]; }

function buildNav(currentPage){
  let html = `<div class="brand-row">
    <svg width="24" height="24" viewBox="0 0 32 32"><path d="M4 8 Q16 0 28 8 Q16 16 4 8 Z" fill="#6366F1"/><path d="M4 18 Q16 10 28 18 Q16 26 4 18 Z" fill="#06B6D4"/></svg>
    <strong>WeaveAPI</strong>
  </div>`;
  NAV.forEach(g => {
    html += `<h4>${g.group}</h4><ul>${g.items.map(item => {
      const [t,u,coming] = item;
      const cur = u.includes(currentPage + ".html") || (currentPage === "home" && u === "index.html") ? "current" : "";
      const ariaCurrent = cur ? ' aria-current="page"' : '';
      const badge = coming ? ' <span class="nav-coming" title="Documented as part of the Charge object">ref</span>' : '';
      return `<li><a href="${u}" class="${cur}"${ariaCurrent}>${t}${badge}</a></li>`;
    }).join("")}</ul>`;
  });
  $("#leftNav").innerHTML = html;
}

function applyTheme(isDark){
  document.body.classList.toggle("dark", isDark);
  const btn = $("#themeToggle");
  if(btn){
    btn.textContent = isDark ? "☀️" : "🌙";
    btn.setAttribute("aria-pressed", isDark ? "true" : "false");
    btn.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    btn.setAttribute("title", isDark ? "Switch to light mode" : "Switch to dark mode");
  }
}

function setupDocs(page){
  buildNav(page);
  const themeBtn = $("#themeToggle");
  if(themeBtn){
    applyTheme(localStorage.getItem("weave-theme") === "dark");
    themeBtn.addEventListener("click", () => {
      const next = !document.body.classList.contains("dark");
      applyTheme(next);
      localStorage.setItem("weave-theme", next ? "dark" : "light");
    });
  }

  setupMobileMenu();
  renderAllCodeBlocks();

  $$('.code-block .copy').forEach(b => b.addEventListener("click", () => {
    const text = b.parentElement.querySelector("code").textContent;
    if(navigator.clipboard) navigator.clipboard.writeText(text).catch(() => {});
    b.textContent = "Copied!"; setTimeout(() => { b.textContent = "Copy"; }, 1200);
  }));

  setupTryPanel(page);
  setupSearch();
  setupScrollSpy();
}

function setupMobileMenu(){
  const btn = $("#menuToggle");
  const nav = $("#leftNav");
  if(!btn || !nav) return;
  btn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    btn.textContent = open ? "✕" : "☰";
  });
  nav.addEventListener("click", e => {
    if(e.target.tagName === "A"){ nav.classList.remove("open"); btn.setAttribute("aria-expanded","false"); btn.textContent="☰"; }
  });
}

function renderAllCodeBlocks(){
  $$('.code-block[data-lang-block]').forEach(block => {
    const snip = block.dataset.snippet || "default";
    const snippets = SNIPPETS[snip] || SNIPPETS.default;
    block.querySelector("code").textContent = snippets[activeLang] || snippets.curl;
    block.classList.add("has-lang");
    if(!block.querySelector(".lang-bar")){
      const bar = document.createElement("div"); bar.className = "lang-bar"; bar.setAttribute("role","tablist");
      ["curl","python","node","go"].forEach(l => {
        const btn = document.createElement("button"); btn.textContent = l; btn.dataset.lang = l;
        btn.setAttribute("role","tab");
        btn.setAttribute("aria-label", `Show ${l} example`);
        if(l === activeLang){ btn.classList.add("active"); btn.setAttribute("aria-selected","true"); }
        else { btn.setAttribute("aria-selected","false"); }
        btn.addEventListener("click", () => {
          activeLang = l; localStorage.setItem("weave-lang", l); renderAllCodeBlocks();
        });
        bar.appendChild(btn);
      });
      block.insertBefore(bar, block.firstChild);
    } else {
      // update active state on existing bar
      $$(".lang-bar button", block).forEach(b => {
        const isActive = b.dataset.lang === activeLang;
        b.classList.toggle("active", isActive);
        b.setAttribute("aria-selected", isActive ? "true" : "false");
      });
    }
  });
  $$('.code-block.json').forEach(block => {
    const snip = block.dataset.snippet;
    if(SNIPPETS[snip]) block.textContent = SNIPPETS[snip].raw;
  });
}

function setupTryPanel(page){
  const panel = $("#rightPanel"); if(!panel || !panel.classList.contains("try-it")) return;
  const endpoints = $$(".endpoint");
  let active = endpoints[0]?.dataset.endpoint || Object.keys(TRY_ENDPOINTS)[0];

  function loadEndpoint(key){
    const def = TRY_ENDPOINTS[key]; if(!def) return;
    active = key;
    const titleEl = $("#tryTitle");
    if(titleEl) titleEl.textContent = "Try " + (def.title || key.replace(/-/g," "));
    $("#tryMeta").innerHTML = `<span class="method ${def.method}">${def.method}</span> ${def.path}`;
    $("#tryParams").innerHTML = def.params.map(p => {
      const placeholder = p.hint ? ` placeholder="${p.hint}"` : '';
      const hint = p.hint ? `<div class="try-hint">${p.hint}</div>` : '';
      return `<label>${p.k}<input data-k="${p.k}" value="${p.v}"${placeholder}>${hint}</label>`;
    }).join("");
    $$(".endpoint").forEach(e => e.classList.toggle("active-section", e.dataset.endpoint === key));
  }
  loadEndpoint(active);

  $("#trySend").addEventListener("click", () => {
    const def = TRY_ENDPOINTS[active]; if(!def) return;
    const params = {}; $$('#tryParams input').forEach(i => params[i.dataset.k] = i.value);
    const resp = mockResponse(active, params);
    $("#tryResp").textContent = JSON.stringify(resp, null, 2);
    history_.unshift({active, params, ts: new Date().toLocaleTimeString()}); history_ = history_.slice(0,3);
    $("#tryHistory").innerHTML = history_.map(h => `<li>${h.ts} · ${h.active}</li>`).join("");
  });

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting && e.target.dataset.endpoint){ loadEndpoint(e.target.dataset.endpoint); } });
  }, {rootMargin:"-30% 0px -50% 0px", threshold:0});
  endpoints.forEach(e => obs.observe(e));
}

function mockResponse(action, params){
  if(action === "create-charge"){
    const cur = (params.currency || "usd").toLowerCase();
    if(!["usd","eur","gbp","jpy"].includes(cur)){
      return {error: {type:"invalid_request_error", code:"currency_not_supported", message:`Currency "${cur}" is not supported. Accepted values: usd, eur, gbp, jpy.`, param:"currency"}};
    }
    if(!params.amount || isNaN(+params.amount) || +params.amount <= 0){
      return {error: {type:"invalid_request_error", code:"amount_invalid", message:"amount must be a positive integer (smallest currency unit, e.g. cents).", param:"amount"}};
    }
    return {id:"ch_" + Math.random().toString(36).slice(2,12), object:"charge", amount:+params.amount, currency:cur, status:"succeeded", captured:true, payment_method:params.payment_method, created:Math.floor(Date.now()/1000), livemode:false};
  }
  if(action.startsWith("retrieve")){ return {id:params.id, object:action.includes("charge") ? "charge" : "customer", livemode:false}; }
  if(action === "list-charges"){ return {object:"list", has_more:false, data:[{id:"ch_3OZ9aB", amount:2000, currency:"usd", status:"succeeded"},{id:"ch_3OZ9aC", amount:1499, currency:"usd", status:"succeeded"}]}; }
  if(action === "list-customers"){ return {object:"list", has_more:false, data:[{id:"cus_abc", email:"tomas@example.com"},{id:"cus_def", email:"marisol@example.com"}]}; }
  return {ok:true, action, params};
}

function setupSearch(){
  const inp = $("#docSearch"); if(!inp) return;
  const res = $("#searchResults"); if(!res) return;
  inp.addEventListener("input", () => {
    const q = inp.value.trim().toLowerCase();
    if(!q){ res.hidden = true; res.innerHTML = ""; return; }
    const hits = SEARCH_INDEX.filter(i => i.t.toLowerCase().includes(q)).slice(0,8);
    res.hidden = false;
    if(hits.length === 0){
      res.innerHTML = `<div class="res-empty">No matches for "${q.replace(/[<>&]/g,"")}". Try: charges, customers, webhooks, errors.</div>`;
    } else {
      res.innerHTML = hits.map(h => `<a class="res" href="${h.p}">${h.t}<br><small>${h.p}</small></a>`).join("");
    }
  });
  inp.addEventListener("blur", () => setTimeout(() => res.hidden = true, 200));
  inp.addEventListener("focus", () => { if(inp.value.trim()) inp.dispatchEvent(new Event("input")); });
  document.addEventListener("keydown", e => {
    if((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k"){ e.preventDefault(); inp.focus(); }
    if(e.key === "Escape"){ res.hidden = true; }
  });
}

function setupScrollSpy(){
  const anchors = $$(".anchors a"); if(anchors.length === 0) return;
  window.addEventListener("scroll", () => {
    const top = window.scrollY + 100;
    let cur = null;
    $$("h2[id], h3[id]").forEach(h => { if(h.offsetTop <= top) cur = h.id; });
    if(cur) anchors.forEach(a => a.classList.toggle("current", a.getAttribute("href") === "#" + cur));
  });
}
