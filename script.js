/* ==========================================================
   MOBILE NAVIGATION
========================================================== */

const menuToggle =
  document.getElementById("menuToggle");

const navLinks =
  document.getElementById("navLinks");


menuToggle.addEventListener("click", () => {

  const open =
    navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(open));

});


navLinks.querySelectorAll("a").forEach(link => {

  link.addEventListener("click", () => {

    navLinks.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");

  });

});


/* ==========================================================
   OPEN LINKED <details> (e.g. #warranty)
========================================================== */

function openLinkedDetails() {

  if (!location.hash) return;

  const target =
    document.querySelector(`details${location.hash}`);

  if (target) target.open = true;

}

window.addEventListener("hashchange", openLinkedDetails);

openLinkedDetails();


/* ==========================================================
   ESTIMATE FORM → EMAIL DRAFT
   Set BUSINESS_EMAIL (or connect a form service) before launch.
========================================================== */

const BUSINESS_EMAIL = "REPLACE_WITH_BUSINESS_EMAIL";

const form =
  document.getElementById("estimateForm");

const formMessage =
  document.getElementById("formMessage");


form.addEventListener("submit", event => {

  event.preventDefault();

  if (BUSINESS_EMAIL.startsWith("REPLACE_")) {
    formMessage.textContent =
      "Online requests aren't set up yet — please call 772-260-1417.";
    return;
  }

  const data = new FormData(form);

  const body = [
    `Name: ${data.get("name")}`,
    `Phone: ${data.get("phone")}`,
    `Email: ${data.get("email")}`,
    `Property Address: ${data.get("address")}`,
    `Property Type: ${data.get("property")}`,
    `Concern: ${data.get("issue")}`,
    "",
    "Details:",
    data.get("message") || ""
  ].join("\n");

  window.location.href =
    `mailto:${BUSINESS_EMAIL}` +
    `?subject=${encodeURIComponent("Bat Inspection Estimate Request - " + data.get("name"))}` +
    `&body=${encodeURIComponent(body)}`;

  formMessage.textContent =
    "Your email app should open with the request ready to send.";

});


/* ==========================================================
   COPYRIGHT
========================================================== */

document.getElementById("year").textContent =
  new Date().getFullYear();
