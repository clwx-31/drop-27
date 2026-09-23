const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const jumperInput = document.querySelector("#jumpers");
const jumperOutput = document.querySelector("#jumpers-output");
const travelToggle = document.querySelector("#travel-toggle");
const mediaInputs = [...document.querySelectorAll('input[name="media"]')];

function updateBudget() {
  const jumpers = Number(jumperInput.value);
  const mediaPerPerson = Number(mediaInputs.find((input) => input.checked).value);
  const jumpCost = jumpers * 430;
  const mediaCost = jumpers * mediaPerPerson;
  const travelCost = travelToggle.checked ? jumpers * 50 : 0;
  const total = jumpCost + mediaCost + travelCost;

  jumperOutput.value = jumpers;
  document.querySelector("#jump-cost").textContent = money.format(jumpCost);
  document.querySelector("#media-cost").textContent = money.format(mediaCost);
  document.querySelector("#travel-cost").textContent = money.format(travelCost);
  document.querySelector("#total-cost").textContent = money.format(total);
  document.querySelector("#per-person").textContent = `${money.format(total / jumpers)} per person`;
}

[jumperInput, travelToggle, ...mediaInputs].forEach((input) => {
  input.addEventListener("input", updateBudget);
});

const checks = [...document.querySelectorAll(".checklist input[type='checkbox']")];

function updateProgress() {
  const complete = checks.filter((check) => check.checked).length;
  const percent = Math.round((complete / checks.length) * 100);
  document.querySelector("#progress-label").textContent = `${percent}%`;
  document.querySelector("#progress-bar").style.width = `${percent}%`;
  localStorage.setItem("drop27-checklist", JSON.stringify(checks.map((check) => check.checked)));
}

try {
  const storedChecks = JSON.parse(localStorage.getItem("drop27-checklist"));
  if (Array.isArray(storedChecks)) {
    checks.forEach((check, index) => { check.checked = Boolean(storedChecks[index]); });
  }
} catch (_) {
  localStorage.removeItem("drop27-checklist");
}

checks.forEach((check) => check.addEventListener("change", updateProgress));

const toast = document.querySelector("#toast");
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}

document.querySelector("#share-plan").addEventListener("click", async () => {
  const shareData = { title: document.title, text: "Our summer 2027 18,000-foot skydiving plan", url: location.href };
  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(location.href);
      showToast("Plan link copied");
    }
  } catch (error) {
    if (error.name !== "AbortError") showToast("Copy the URL to share the plan");
  }
});

document.querySelector("#print-plan").addEventListener("click", () => window.print());

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .12 });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

updateBudget();
updateProgress();
