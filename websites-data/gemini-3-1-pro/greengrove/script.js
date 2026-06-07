const PETS = [
  {key:"dog", label:"Dog", svg:'<svg viewBox="0 0 40 40"><path d="M20 32 Q10 32 10 22 Q10 14 20 14 Q30 14 30 22 Q30 32 20 32 Z" fill="#2A7F5F"/><circle cx="14" cy="18" r="2" fill="#fff"/><circle cx="26" cy="18" r="2" fill="#fff"/><path d="M6 12 L11 8 L13 16 Z" fill="#E07A5F"/><path d="M34 12 L29 8 L27 16 Z" fill="#E07A5F"/></svg>'},
  {key:"cat", label:"Cat", svg:'<svg viewBox="0 0 40 40"><path d="M20 30 Q10 30 10 22 Q10 14 20 14 Q30 14 30 22 Q30 30 20 30 Z" fill="#E07A5F"/><circle cx="15" cy="20" r="1.5" fill="#fff"/><circle cx="25" cy="20" r="1.5" fill="#fff"/><path d="M10 14 L7 7 L14 12 Z" fill="#E07A5F"/><path d="M30 14 L33 7 L26 12 Z" fill="#E07A5F"/></svg>'},
  {key:"rabbit", label:"Rabbit", svg:'<svg viewBox="0 0 40 40"><ellipse cx="20" cy="26" rx="9" ry="7" fill="#D9C9A8"/><ellipse cx="16" cy="14" rx="3" ry="8" fill="#D9C9A8"/><ellipse cx="24" cy="14" rx="3" ry="8" fill="#D9C9A8"/></svg>'},
  {key:"bird", label:"Bird", svg:'<svg viewBox="0 0 40 40"><path d="M14 24 Q14 14 24 14 Q30 14 30 22 L34 26 L22 30 Q14 30 14 24 Z" fill="#5AA9D6"/><circle cx="27" cy="19" r="1.5" fill="#fff"/><path d="M30 22 L36 21 L32 24 Z" fill="#F4A261"/></svg>'},
  {key:"reptile", label:"Reptile", svg:'<svg viewBox="0 0 40 40"><path d="M6 24 Q10 18 18 22 Q26 26 34 18" stroke="#2A7F5F" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="34" cy="18" r="2" fill="#2A7F5F"/></svg>'},
  {key:"small", label:"Small mammal", svg:'<svg viewBox="0 0 40 40"><ellipse cx="20" cy="24" rx="10" ry="8" fill="#B07A4C"/><circle cx="16" cy="22" r="1.2" fill="#fff"/><circle cx="24" cy="22" r="1.2" fill="#fff"/></svg>'},
];

const DOG_BREEDS = ["Labrador Retriever","Golden Retriever","French Bulldog","Bulldog","Poodle (Standard)","Poodle (Miniature)","Poodle (Toy)","Beagle","Rottweiler","German Shepherd","Yorkshire Terrier","Dachshund (Standard)","Dachshund (Miniature)","Boxer","Siberian Husky","Great Dane","Doberman Pinscher","Australian Shepherd","Shih Tzu","Cavalier King Charles Spaniel","Bernese Mountain Dog","Pomeranian","Boston Terrier","Havanese","Shetland Sheepdog","Cocker Spaniel","Border Collie","Vizsla","Maltese","Weimaraner","Cane Corso","Pembroke Welsh Corgi","Cardigan Welsh Corgi","Mastiff","Akita","Belgian Malinois","Brittany","Chihuahua","Pug","Saint Bernard","Bichon Frise","Whippet","Greyhound","Italian Greyhound","Newfoundland","Bullmastiff","Rhodesian Ridgeback","Shiba Inu","Samoyed","Old English Sheepdog","Basset Hound","English Springer Spaniel","Portuguese Water Dog","Alaskan Malamute","Bloodhound","West Highland White Terrier","Scottish Terrier","Welsh Terrier","Lhasa Apso","Papillon","Border Terrier","Staffordshire Bull Terrier","American Staffordshire Terrier","Bull Terrier","Miniature Schnauzer","Standard Schnauzer","Giant Schnauzer","Wirehaired Pointing Griffon","German Wirehaired Pointer","German Shorthaired Pointer","Chesapeake Bay Retriever","Curly-Coated Retriever","Flat-Coated Retriever","Nova Scotia Duck Tolling Retriever","Irish Setter","English Setter","Gordon Setter","Pointer","Field Spaniel","Sussex Spaniel","American Water Spaniel","Boykin Spaniel","Clumber Spaniel","Welsh Springer Spaniel","Afghan Hound","Saluki","Borzoi","Irish Wolfhound","Scottish Deerhound","Norwegian Elkhound","Plott","Treeing Walker Coonhound","Black and Tan Coonhound","Bluetick Coonhound","Redbone Coonhound","American Foxhound","English Foxhound","Otterhound","Pharaoh Hound","Ibizan Hound","Basenji","Petit Basset Griffon Vendéen","Grand Basset Griffon Vendéen","Norwegian Lundehund","Finnish Spitz","Keeshond","Schipperke","Tibetan Spaniel","Tibetan Terrier","Tibetan Mastiff","Chow Chow","Shar-Pei","Lowchen","Coton de Tulear","Dalmatian","Xoloitzcuintli","Peruvian Inca Orchid","American Hairless Terrier","Affenpinscher","Brussels Griffon","Toy Fox Terrier","Smooth Fox Terrier","Wire Fox Terrier","Jack Russell Terrier","Parson Russell Terrier","Rat Terrier","Manchester Terrier","Skye Terrier","Sealyham Terrier","Dandie Dinmont Terrier","Bedlington Terrier","Kerry Blue Terrier","Soft Coated Wheaten Terrier","Australian Terrier","Silky Terrier","Norwich Terrier","Norfolk Terrier","Cairn Terrier","Glen of Imaal Terrier","Irish Terrier","Lakeland Terrier","Miniature Bull Terrier","Cesky Terrier","Spinone Italiano","Lagotto Romagnolo","Bracco Italiano","Pumi","Mudi","Beauceron","Briard","Bouvier des Flandres","Belgian Tervuren","Belgian Sheepdog","Australian Cattle Dog","Australian Kelpie","Anatolian Shepherd","Caucasian Shepherd","Central Asian Shepherd","Komondor","Kuvasz","Polish Lowland Sheepdog","Berger Picard","Schapendoes","Norwegian Buhund","Swedish Vallhund","Lancashire Heeler","Estrela Mountain Dog","Tornjak","Sloughi","Azawakh","Cirneco dell'Etna","Spanish Mastiff","Pyrenean Mastiff","Great Pyrenees","Leonberger","Tosa","Korean Jindo","Thai Ridgeback","Mixed breed / unknown — small","Mixed breed / unknown — medium","Mixed breed / unknown — large","Mixed breed / unknown — giant","American Bulldog","Olde English Bulldogge","Boerboel","Dogo Argentino","Presa Canario","Fila Brasileiro","Karelian Bear Dog","Black Russian Terrier","Eurasier","Drentsche Patrijshond","Stabyhoun","Wetterhoun","Kromfohrlander","Hovawart","Volpino Italiano","Bolognese","Russian Toy","Japanese Chin","Pekingese","Toy Manchester Terrier","Toy Poodle","English Toy Spaniel","Chinese Crested","Carolina Dog","New Guinea Singing Dog"];
const CAT_BREEDS = ["Domestic Shorthair","Domestic Longhair","Maine Coon","Persian","Ragdoll","British Shorthair","American Shorthair","Siamese","Bengal","Abyssinian","Burmese","Russian Blue","Sphynx","Scottish Fold","Norwegian Forest Cat","Siberian","Oriental Shorthair","Devon Rex","Cornish Rex","Selkirk Rex","LaPerm","Munchkin","Manx","Cymric","Exotic Shorthair","Tonkinese","Birman","Turkish Angora","Turkish Van","Egyptian Mau","Savannah","Singapura","Ocicat","Burmilla","Chartreux","Havana Brown","Korat","Nebelung","Pixiebob","Snowshoe","Somali","American Curl","American Bobtail","Japanese Bobtail","European Shorthair","Mixed / unknown — short hair","Mixed / unknown — long hair","Bombay","Bengal Polydactyl","Toyger","Sokoke","Karelian Bobtail","Mekong Bobtail","Khao Manee","Peterbald","Don Sphynx","Kurilian Bobtail","Australian Mist","Ragamuffin","Asian Semi-longhair","Chausie","Highlander","Lykoi","Minskin","Serengeti"];
const OTHER_BREEDS = {
  rabbit:["Holland Lop","Mini Lop","Netherland Dwarf","Flemish Giant","Lionhead","Rex","Dutch","English Spot","Mini Rex","Other — unknown"],
  bird:["Budgerigar","Cockatiel","Lovebird","Conure (Green Cheek)","Conure (Sun)","African Grey","Macaw","Cockatoo","Canary","Finch","Quaker Parrot","Eclectus","Amazon","Pionus","Caique","Lory","Other — unknown"],
  reptile:["Bearded Dragon","Leopard Gecko","Ball Python","Corn Snake","Crested Gecko","Blue-Tongue Skink","Iguana","Russian Tortoise","Greek Tortoise","Hermann's Tortoise","Box Turtle","Red-Eared Slider","Other — unknown"],
  small:["Guinea Pig","Hamster (Syrian)","Hamster (Dwarf)","Gerbil","Rat","Mouse","Ferret","Chinchilla","Hedgehog","Sugar Glider","Other — unknown"],
};

const CONDITIONS = ["Hip dysplasia","Diabetes","Heart murmur","Heart disease","Skin allergies","Arthritis","Dental disease","Epilepsy","Cancer history","Thyroid issues","Kidney disease","Liver disease","Eye conditions","Ear infections (chronic)","Behavioral issues","Obesity","Asthma / breathing","IBD / digestive","Patellar luxation"];

let state = {
  pet:null, breed:null, ageVal:3, ageUnit:"years",
  conditions:[], tier:"sapling", deductible:250,
};
let currentStep = 1;

function $(s){ return document.querySelector(s); }
function $$(s){ return [...document.querySelectorAll(s)]; }

function renderPets(){
  $("#petGrid").setAttribute("role", "radiogroup");
  $("#petGrid").setAttribute("aria-label", "Pet type");
  $("#petGrid").innerHTML = PETS.map((p, i) => `<div class="pet-card" data-pet="${p.key}" role="radio" tabindex="${i === 0 ? '0' : '-1'}" aria-checked="false" aria-label="${p.label}">${p.svg}<div>${p.label}</div></div>`).join("");
  const selectPet = (el) => {
    state.pet = el.dataset.pet; state.breed = null;
    $$(".pet-card").forEach(c => {
      const isSel = c.dataset.pet === state.pet;
      c.classList.toggle("selected", isSel);
      c.setAttribute("aria-checked", isSel ? "true" : "false");
      c.setAttribute("tabindex", isSel ? "0" : "-1");
    });
    const err = document.getElementById("petError");
    if(err) err.textContent = "";
  };
  $$(".pet-card").forEach((el, idx) => {
    el.addEventListener("click", () => selectPet(el));
    el.addEventListener("keydown", e => {
      if(e.key === " " || e.key === "Enter"){ e.preventDefault(); selectPet(el); }
      else if(e.key === "ArrowRight" || e.key === "ArrowDown"){
        e.preventDefault();
        const cards = $$(".pet-card");
        const next = cards[(idx + 1) % cards.length];
        next.focus(); selectPet(next);
      }
      else if(e.key === "ArrowLeft" || e.key === "ArrowUp"){
        e.preventDefault();
        const cards = $$(".pet-card");
        const prev = cards[(idx - 1 + cards.length) % cards.length];
        prev.focus(); selectPet(prev);
      }
    });
  });
}
function renderConditions(){
  $("#condGrid").innerHTML = CONDITIONS.map(c => `<span class="cond-chip" data-c="${c}">${c}</span>`).join("");
  $$(".cond-chip").forEach(el => el.addEventListener("click", () => {
    const c = el.dataset.c;
    if(state.conditions.includes(c)) state.conditions = state.conditions.filter(x => x !== c);
    else state.conditions.push(c);
    el.classList.toggle("selected");
    $("#condNone").checked = state.conditions.length === 0 && $("#condNone").checked;
  }));
  $("#condNone").addEventListener("change", () => {
    if($("#condNone").checked){ state.conditions = []; $$(".cond-chip").forEach(c => c.classList.remove("selected")); }
  });
}

function breedList(){
  if(!state.pet) return [];
  if(state.pet === "dog") return DOG_BREEDS;
  if(state.pet === "cat") return CAT_BREEDS;
  return OTHER_BREEDS[state.pet] || [];
}

function showBreedList(filter=""){
  const list = breedList().filter(b => b.toLowerCase().includes(filter.toLowerCase())).slice(0, 80);
  const ul = $("#breedList");
  ul.innerHTML = list.map((b,i) => `<li role="option" data-i="${i}">${b}</li>`).join("");
  ul.hidden = list.length === 0;
  $("#breedInput").setAttribute("aria-expanded", list.length > 0);
  ul.querySelectorAll("li").forEach((li, i) => {
    li.addEventListener("click", () => {
      state.breed = li.textContent; $("#breedInput").value = state.breed; ul.hidden = true; $("#breedHint").textContent = "";
    });
  });
}

function bindCombo(){
  const inp = $("#breedInput");
  inp.addEventListener("input", () => { state.breed = null; showBreedList(inp.value); });
  inp.addEventListener("focus", () => showBreedList(inp.value));
  inp.addEventListener("blur", () => setTimeout(() => { $("#breedList").hidden = true; }, 150));
  inp.addEventListener("keydown", e => {
    const ul = $("#breedList"); const items = ul.querySelectorAll("li"); if(items.length === 0) return;
    const cur = ul.querySelector(".active"); let idx = cur ? +cur.dataset.i : -1;
    if(e.key === "ArrowDown"){ e.preventDefault(); idx = Math.min(items.length-1, idx+1); }
    else if(e.key === "ArrowUp"){ e.preventDefault(); idx = Math.max(0, idx-1); }
    else if(e.key === "Enter"){ if(cur){ e.preventDefault(); cur.click(); return; } }
    else if(e.key === "Escape"){ ul.hidden = true; return; }
    else return;
    items.forEach(li => li.classList.remove("active"));
    if(items[idx]){ items[idx].classList.add("active"); inp.setAttribute("aria-activedescendant", "breed-opt-" + idx); items[idx].id = "breed-opt-" + idx; items[idx].scrollIntoView({block:"nearest"}); }
  });
}

function showStep(s){
  currentStep = s;
  $$(".step").forEach(el => el.hidden = +el.dataset.s !== s);
  $$("#stepDots li").forEach(li => {
    const v = +li.dataset.s; li.classList.toggle("current", v === s); li.classList.toggle("done", v < s);
  });
  $("#backBtn").hidden = s === 1;
  $("#nextBtn").style.display = s === 6 ? "none" : "";
  if(s === 6) renderQuote();
  window.scrollTo({top:0,behavior:"smooth"});
}

function validate(s){
  if(s === 1 && !state.pet){
    const err = document.getElementById("petError");
    if(err){ err.textContent = "Please select a pet type to continue."; err.focus && err.focus(); }
    const firstCard = document.querySelector(".pet-card");
    if(firstCard) firstCard.focus();
    return false;
  }
  if(s === 2 && !state.breed){ $("#breedHint").textContent = "Pick a breed from the suggestions"; return false; }
  if(s === 3){ const v = +$("#ageNum").value; if(isNaN(v) || v < 0){ alert("Enter an age"); return false; } state.ageVal = v; }
  if(s === 4 && state.conditions.length === 0 && !$("#condNone").checked){ alert("Pick at least one (or check 'None of these')"); return false; }
  return true;
}

function priceCalc(tier){
  const speciesMult = {dog:1, cat:0.78, rabbit:0.45, bird:0.4, reptile:0.35, small:0.4}[state.pet] || 0.5;
  const breedRisk = state.breed && /Bulldog|Mastiff|Great Dane|Bernese|Persian|Sphynx|Maine Coon|Boxer|Saint Bernard|Pug|French Bulldog/.test(state.breed) ? 1.35 : 1.0;
  const ageMonths = state.ageUnit === "months" ? state.ageVal : state.ageVal * 12;
  const ageMult = ageMonths < 12 ? 0.85 : ageMonths < 36 ? 1.0 : ageMonths < 84 ? 1.18 : ageMonths < 132 ? 1.55 : 2.0;
  const condMult = 1 + state.conditions.length * 0.06;
  const tierMult = {sprout:0.6, sapling:1.0, oak:1.55}[tier];
  const deductMult = {100:1.12, 250:1.0, 500:0.88}[state.deductible];
  const base = 28;
  return Math.max(8, Math.round(base * speciesMult * breedRisk * ageMult * condMult * tierMult * deductMult));
}

function updateTierPrices(){
  ["sprout","sapling","oak"].forEach(t => { const el = document.getElementById("price"+t[0].toUpperCase()+t.slice(1)); if(el) el.textContent = "$" + priceCalc(t); });
}

function renderQuote(){
  const price = priceCalc(state.tier);
  $("#finalPrice").innerHTML = "$" + price + "<small>/mo</small>";
  $("#forLine").textContent = `For your ${state.ageVal} ${state.ageUnit === "months" ? "mo" : "yr"} ${state.breed || state.pet} · ${({sprout:"Sprout",sapling:"Sapling",oak:"Oak"})[state.tier]} tier · $${state.deductible} deductible`;
  $("#annualTotal").textContent = "$" + (price*12);
  const tierFeatures = {
    sprout:["Accidents only","$5,000 annual limit","70% reimbursement","No waiting period on accidents"],
    sapling:["Accidents + illness","$15,000 annual limit","80% reimbursement","Diagnostics, imaging, surgery"],
    oak:["Accidents + illness","Unlimited annual limit","90% reimbursement","Dental, behavioral, prescriptions","$400 annual wellness credit"],
  };
  $("#includesList").innerHTML = tierFeatures[state.tier].map(f => `<li>${f}</li>`).join("");
}

function bindAge(){
  $("#ageDown").addEventListener("click", () => { $("#ageNum").value = Math.max(0, +$("#ageNum").value - 1); state.ageVal = +$("#ageNum").value; });
  $("#ageUp").addEventListener("click", () => { $("#ageNum").value = Math.min(25, +$("#ageNum").value + 1); state.ageVal = +$("#ageNum").value; });
  $("#ageNum").addEventListener("input", () => { state.ageVal = +$("#ageNum").value || 0; });
  $$('input[name="ageUnit"]').forEach(r => r.addEventListener("change", () => { state.ageUnit = document.querySelector('input[name="ageUnit"]:checked').value; }));
}
function bindTier(){
  $("#deductSel").addEventListener("change", e => { state.deductible = +e.target.value; updateTierPrices(); });
  $$('input[name="tier"]').forEach(r => r.addEventListener("change", () => { state.tier = document.querySelector('input[name="tier"]:checked').value; }));
}

$("#nextBtn").addEventListener("click", () => {
  if(!validate(currentStep)) return;
  if(currentStep === 4){ updateTierPrices(); }
  if(currentStep < 6) showStep(currentStep + 1);
});
$("#backBtn").addEventListener("click", () => { if(currentStep > 1) showStep(currentStep - 1); });
$$("#stepDots li").forEach(li => li.addEventListener("click", () => { const s = +li.dataset.s; if(s < currentStep) showStep(s); }));
$("#lockBtn").addEventListener("click", () => $("#lockDialog").showModal());

renderPets();
renderConditions();
bindCombo();
bindAge();
bindTier();
showStep(1);
