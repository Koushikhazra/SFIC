const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const serviceDialog = document.querySelector(".service-dialog");
const dialogPanels = document.querySelectorAll("[data-dialog-panel]");
const dialogClose = document.querySelector(".dialog-close");
const officerDate = document.querySelector("#officer-date");
const officerSchedule = document.querySelector("#officer-schedule");
const scheduleDate = document.querySelector("#schedule-date");

function closeMenu() {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
  navLinks.classList.remove("is-open");
  document.body.classList.remove("menu-open");
}

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
  navLinks.classList.toggle("is-open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

navLinks.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    closeMenu();
  }
});

document.addEventListener("click", (event) => {
  const panelLink = event.target.closest("[data-panel]");
  if (!panelLink) {
    return;
  }

  const panel = document.querySelector(`[data-dialog-panel="${panelLink.dataset.panel}"]`);
  if (!panel) {
    console.error(`GramSeva preview panel not found: ${panelLink.dataset.panel}`);
    return;
  }

  event.preventDefault();
  dialogPanels.forEach((item) => {
    item.hidden = item !== panel;
  });
  closeMenu();
  serviceDialog.showModal();
  dialogClose.focus();
});

dialogClose.addEventListener("click", () => {
  serviceDialog.close();
});

officerDate.addEventListener("change", () => {
  if (!officerDate.value) {
    officerSchedule.hidden = true;
    return;
  }

  const [year, month, day] = officerDate.value.split("-").map(Number);
  const selectedDate = new Date(year, month - 1, day);
  scheduleDate.textContent = selectedDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  officerSchedule.hidden = false;
});

serviceDialog.addEventListener("click", (event) => {
  if (event.target === serviceDialog) {
    serviceDialog.close();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    closeMenu();
    menuToggle.focus();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 900 && menuToggle.getAttribute("aria-expanded") === "true") {
    closeMenu();
  }
});
