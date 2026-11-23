// Photo viewer for galleries. Each photo is a link to its full-size file, so the page works
// without JavaScript; this upgrades the links to a modal <dialog> with previous/next.
// A <dialog> gives us focus trapping and Escape-to-close for free.
(function () {
  var galleries = document.querySelectorAll("[data-gallery]");
  if (!galleries.length) return;

  var ICONS = {
    prev: '<path d="m15 18-6-6 6-6" />',
    next: '<path d="m9 18 6-6-6-6" />',
    close: '<path d="M6 6l12 12M18 6 6 18" />'
  };
  var dialog, image, caption, count, links, index, trigger;

  function button(name, label) {
    var el = document.createElement("button");
    el.type = "button";
    el.className = "lightbox__button lightbox__button--" + name;
    el.setAttribute("aria-label", label);
    el.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICONS[name] + "</svg>";
    return el;
  }

  function build() {
    dialog = document.createElement("dialog");
    dialog.className = "lightbox on-dark";
    dialog.setAttribute("aria-label", "Photo viewer");

    var inner = document.createElement("div");
    inner.className = "lightbox__inner";
    var stage = document.createElement("div");
    stage.className = "lightbox__stage";

    count = document.createElement("span");
    count.className = "lightbox__count";
    count.setAttribute("aria-live", "polite");
    image = document.createElement("img");
    image.alt = "";
    caption = document.createElement("p");
    caption.className = "lightbox__caption";

    var close = button("close", "Close photo viewer");
    var prev = button("prev", "Previous photo");
    var next = button("next", "Next photo");
    close.addEventListener("click", function () { dialog.close(); });
    prev.addEventListener("click", function () { step(-1); });
    next.addEventListener("click", function () { step(1); });

    stage.append(count, close, prev, image, next);
    inner.append(stage, caption);
    dialog.append(inner);
    document.body.appendChild(dialog);

    dialog.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") { event.preventDefault(); step(-1); }
      if (event.key === "ArrowRight") { event.preventDefault(); step(1); }
    });
    dialog.addEventListener("click", function (event) { if (event.target === dialog) dialog.close(); });
    dialog.addEventListener("close", function () { if (trigger) trigger.focus(); });
  }

  function show() {
    var link = links[index];
    image.src = link.href;
    image.alt = link.dataset.alt || "";
    caption.innerHTML = link.dataset.caption || "";
    count.textContent = index + 1 + " / " + links.length;
  }

  function step(direction) {
    index = (index + direction + links.length) % links.length;
    show();
  }

  document.addEventListener("click", function (event) {
    var link = event.target.closest(".gallery__link");
    if (!link) return;
    event.preventDefault();
    if (!dialog) build();
    trigger = link;
    links = Array.prototype.slice.call(link.closest("[data-gallery]").querySelectorAll(".gallery__link"));
    index = links.indexOf(link);
    show();
    dialog.showModal();
  });
})();
