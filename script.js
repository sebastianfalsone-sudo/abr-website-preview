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
   INSPECTION FORM → americanbat@gmail.com (via FormSubmit)
========================================================== */

const FORM_ENDPOINT =
  "https://formsubmit.co/ajax/americanbat@gmail.com";

const form =
  document.getElementById("inspectionForm");

const formMessage =
  document.getElementById("formMessage");

const submitButton =
  form.querySelector('button[type="submit"]');


form.addEventListener("submit", async event => {

  event.preventDefault();

  // Spam bots fill the hidden honeypot field; people never see it.
  if (form.elements._honey.value) return;

  submitButton.disabled = true;
  formMessage.className = "form-message";
  formMessage.textContent = "Sending your request…";

  try {

    const response = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(Object.fromEntries(new FormData(form)))
    });

    const result = await response.json();

    if (!response.ok || String(result.success) !== "true") {
      throw new Error(result.message || "Submission failed");
    }

    form.reset();
    formMessage.classList.add("is-success");
    formMessage.textContent =
      "Thank you! Your request has been sent — we'll be in touch soon.";

  } catch (error) {

    formMessage.classList.add("is-error");
    formMessage.textContent =
      "Sorry, something went wrong. Please call 772-260-1417 or email americanbat@gmail.com.";

  } finally {

    submitButton.disabled = false;

  }

});


/* ==========================================================
   COPYRIGHT YEAR
========================================================== */

document.getElementById("year").textContent =
  new Date().getFullYear();
