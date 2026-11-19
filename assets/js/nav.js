// Primary navigation: the mobile Menu button and the "Our work" dropdown.
// Both are disclosure buttons; they only toggle aria-expanded and a class.
(function () {
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("primary-nav");
  var dropdowns = document.querySelectorAll(".nav__dropdown");
  if (!toggle || !nav) return;

  function closeDropdowns(except) {
    dropdowns.forEach(function (dropdown) {
      var button = dropdown.querySelector(".nav__link");
      if (button !== except) button.setAttribute("aria-expanded", "false");
    });
  }

  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  dropdowns.forEach(function (dropdown) {
    var button = dropdown.querySelector(".nav__link");
    button.addEventListener("click", function (event) {
      event.stopPropagation();
      var open = button.getAttribute("aria-expanded") === "true";
      closeDropdowns(button);
      button.setAttribute("aria-expanded", String(!open));
    });
  });

  document.addEventListener("click", function (event) {
    if (!event.target.closest(".nav__dropdown")) closeDropdowns();
  });

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") return;
    var open = document.querySelector('.nav__link[aria-expanded="true"]');
    closeDropdowns();
    if (open) open.focus();
    if (nav.classList.contains("is-open")) {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.focus();
    }
  });
})();
