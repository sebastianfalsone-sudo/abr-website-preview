/* ==========================================================
   MOBILE MENU
========================================================== */

const menuButton =
  document.getElementById("menuButton");

const navLinks =
  document.getElementById("navLinks");


menuButton.addEventListener("click", () => {

  const open =
    navLinks.classList.toggle("open");

  menuButton.setAttribute("aria-expanded", String(open));

});


navLinks.querySelectorAll("a").forEach(link => {

  link.addEventListener("click", () => {

    navLinks.classList.remove("open");

    menuButton.setAttribute("aria-expanded", "false");

  });

});


/* ==========================================================
   INSPECTION FORM → EMAIL TO americanbat@gmail.com
   Opens the visitor's email app with the request pre-filled.
========================================================== */

const BUSINESS_EMAIL = "americanbat@gmail.com";

const form =
  document.getElementById("inspectionForm");

const formMessage =
  document.getElementById("formMessage");


form.addEventListener("submit", event => {

  event.preventDefault();

  const data = new FormData(form);

  const name = data.get("name").trim();

  const body = [
    `Name: ${name}`,
    `Email: ${data.get("email")}`,
    `Phone: ${data.get("phone").trim() || "Not provided"}`,
    `Property City: ${data.get("location")}`,
    `Service: ${data.get("service")}`,
    `Estimate Zone: ${data.get("zone") || "Not selected"}`,
    "",
    "What I've noticed:",
    data.get("message")
  ].join("\n");

  window.location.href =
    `mailto:${BUSINESS_EMAIL}` +
    `?subject=${encodeURIComponent("Bat Inspection Request - " + name)}` +
    `&body=${encodeURIComponent(body)}`;

  formMessage.textContent =
    "Your email app should open with your request ready — just hit Send. " +
    "If it doesn't, email us at americanbat@gmail.com or call 772-260-1417.";

});


/* ==========================================================
   COPYRIGHT YEAR
========================================================== */

document.getElementById("year").textContent =
  new Date().getFullYear();


/* ==========================================================
   SERVICE AREA MAP — open from "View the service area map" links
========================================================== */

const serviceMap =
  document.getElementById("service-map");

document.querySelectorAll("[data-open-map]").forEach(link => {

  link.addEventListener("click", () => {

    if (serviceMap) serviceMap.open = true;

  });

});


/* ==========================================================
   ESTIMATE ZONE CTAs — carry the chosen zone into the form
========================================================== */

const zoneField = document.getElementById("zoneField");
const zoneChip = document.getElementById("zoneChip");
const zoneChipText = document.getElementById("zoneChipText");

function setZone(zone) {

  zoneField.value = zone;
  zoneChipText.textContent = zone;
  zoneChip.classList.toggle("is-visible", Boolean(zone));

}

document.querySelectorAll("[data-zone]").forEach(link => {

  link.addEventListener("click", () => setZone(link.dataset.zone));

});

document.getElementById("zoneClear").addEventListener("click", () => setZone(""));
