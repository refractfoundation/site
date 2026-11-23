// Home page carousel.
//
// - Plays once through the slides, ending back on the first, then stops.
// - Stops for good as soon as someone uses a control, a key, or tabs into it.
// - Pauses while the pointer is over it, and never plays under prefers-reduced-motion.
// - Inactive slides are `inert`, so keyboard focus and screen readers only meet the visible one.
(function () {
  var carousel = document.querySelector("[data-carousel]");
  if (!carousel) return;

  var slides = Array.prototype.slice.call(carousel.querySelectorAll(".carousel__slide"));
  var dashes = carousel.querySelector("[data-carousel-dashes]");
  var DELAY = 7000;
  var current = 0;
  var advances = 0;
  var timer = null;
  var finished = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  slides.forEach(function (slide, index) {
    var dash = document.createElement("button");
    dash.type = "button";
    dash.className = "carousel__dash" + (index === 0 ? " is-active" : "");
    dash.setAttribute("aria-label", "Go to slide " + (index + 1));
    dash.addEventListener("click", function () { choose(index); });
    dashes.appendChild(dash);
  });

  function show(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach(function (slide, i) {
      var active = i === current;
      slide.classList.toggle("is-active", active);
      if (active) slide.removeAttribute("inert");
      else slide.setAttribute("inert", "");
    });
    Array.prototype.forEach.call(dashes.children, function (dash, i) {
      dash.classList.toggle("is-active", i === current);
      if (i === current) dash.setAttribute("aria-current", "true");
      else dash.removeAttribute("aria-current");
    });
  }

  function stop() {
    window.clearInterval(timer);
    timer = null;
  }

  function play() {
    stop();
    if (finished) return;
    timer = window.setInterval(function () {
      advances += 1;
      show(current + 1);
      if (advances >= slides.length) {
        finished = true;
        stop();
      }
    }, DELAY);
  }

  // A deliberate choice by the visitor ends autoplay for good.
  function choose(index) {
    finished = true;
    stop();
    show(index);
  }

  carousel.querySelector("[data-carousel-prev]").addEventListener("click", function () { choose(current - 1); });
  carousel.querySelector("[data-carousel-next]").addEventListener("click", function () { choose(current + 1); });
  carousel.addEventListener("mouseenter", stop);
  carousel.addEventListener("mouseleave", play);
  carousel.addEventListener("focusin", stop);
  carousel.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") { event.preventDefault(); choose(current - 1); }
    if (event.key === "ArrowRight") { event.preventDefault(); choose(current + 1); }
  });

  play();
})();
