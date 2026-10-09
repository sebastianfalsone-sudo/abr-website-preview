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
   INSPECTION FORM → EMAIL DRAFT
   Set BUSINESS_EMAIL (or connect a form service) before launch.
========================================================== */

const BUSINESS_EMAIL = "REPLACE_WITH_BUSINESS_EMAIL";

const form =
  document.getElementById("inspectionForm");

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
    `Email: ${data.get("email")}`,
    `Phone: ${data.get("phone")}`,
    `Property City: ${data.get("location")}`,
    `Service: ${data.get("service")}`,
    "",
    "What I've noticed:",
    data.get("message")
  ].join("\n");

  window.location.href =
    `mailto:${BUSINESS_EMAIL}` +
    `?subject=${encodeURIComponent("Bat Inspection Request - " + data.get("name"))}` +
    `&body=${encodeURIComponent(body)}`;

  formMessage.textContent =
    "Your email app should open with the request ready to send.";

});


/* ==========================================================
   COPYRIGHT YEAR
========================================================== */

document.getElementById("year").textContent =
  new Date().getFullYear();
