window.addEventListener("scroll", () => {
  const doc = document.documentElement;
  const top = doc.scrollTop || document.body.scrollTop;
  const h = doc.scrollHeight - doc.clientHeight;
  const pct = h > 0 ? (top / h) * 100 : 0;
  document.getElementById("scrollbar").style.width = pct + "%";
});

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    const href = a.getAttribute("href");
    if(href === "#" || a.dataset.placeholder === "true") return;
    const id = href.slice(1);
    const t = document.getElementById(id);
    if(t){ e.preventDefault(); t.scrollIntoView({behavior:"smooth",block:"start"}); history.replaceState(null,"","#"+id); }
  });
});

document.querySelectorAll('a[data-placeholder="true"]').forEach(a => {
  a.addEventListener("click", e => {
    e.preventDefault();
    const label = a.getAttribute("aria-label") || a.textContent.trim();
    showToast("Demo link — " + a.textContent.trim().replace(/\s*demo\s*$/i,"").trim() + " is not wired up in this prototype.");
  });
});

let toastTimer;
function showToast(msg){
  let toast = document.getElementById("toast");
  if(!toast){
    toast = document.createElement("div");
    toast.id = "toast";
    toast.setAttribute("role","status");
    toast.setAttribute("aria-live","polite");
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
}

const modal = document.getElementById("dlModal");
const modalCard = modal.querySelector(".modal-card");
const modalStatus = document.getElementById("modalStatus");
const modalTitle = document.getElementById("dlModalTitle");
const bar = document.getElementById("progressBar");
const txt = document.getElementById("progressText");
const progressEl = modal.querySelector(".progress");
const closeBtn = document.getElementById("closeModal");
let lastFocused = null;

const spinnerSvg = '<svg class="status-icon spin" viewBox="0 0 24 24" width="22" height="22"><circle cx="12" cy="12" r="9" fill="none" stroke="#2F5233" stroke-width="2.5" stroke-dasharray="40 18" stroke-linecap="round"/></svg>';
const checkSvg = '<svg class="status-icon" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="#2F5233"/><path d="M7 12.5 L10.5 16 L17 9" stroke="#FBF6E4" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';

function openModal(){
  lastFocused = document.activeElement;
  modal.hidden = false;
  modalCard.classList.remove("done");
  modalStatus.classList.remove("done");
  modalStatus.innerHTML = spinnerSvg;
  modalTitle.textContent = "Downloading meadowos-0.7.iso…";
  closeBtn.textContent = "Cancel";
  bar.style.width = "0%";
  txt.textContent = "0%";
  progressEl.setAttribute("aria-valuenow","0");
  closeBtn.focus();
}
function closeModal(){
  modal.hidden = true;
  if(lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
}

document.getElementById("dlBtn").addEventListener("click", () => {
  openModal();
  let p = 0;
  const t = setInterval(() => {
    p += Math.random() * 8 + 2;
    if(p >= 100){
      p = 100;
      clearInterval(t);
      txt.textContent = "Done. SHA256 matches.";
      modalTitle.textContent = "Download complete";
      modalCard.classList.add("done");
      modalStatus.classList.add("done");
      modalStatus.innerHTML = checkSvg;
      closeBtn.textContent = "Done";
      closeBtn.focus();
    } else {
      txt.textContent = Math.floor(p) + "%";
    }
    bar.style.width = p + "%";
    progressEl.setAttribute("aria-valuenow", String(Math.floor(p)));
  }, 90);
});
closeBtn.addEventListener("click", closeModal);
modal.addEventListener("click", e => { if(e.target === modal) closeModal(); });
document.addEventListener("keydown", e => { if(e.key === "Escape" && !modal.hidden) closeModal(); });
