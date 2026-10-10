/* =========================================================
   WEBSTUDIO — PREMIUM LAYER ENGINE
   Subtle scroll parallax for decorative SVG elements only.
   Content never moves. Reduced-motion aware. Focused module.
   ========================================================= */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  var MAX_SHIFT = 24; // px — hard cap, keeps decor inside its section

  document.addEventListener("DOMContentLoaded", function () {
    if (reduceMotion.matches) return;

    var elements = document.querySelectorAll("[data-plx]");
    if (!elements.length) return;

    var targets = Array.prototype.map.call(elements, function (el) {
      return { el: el, speed: parseFloat(el.dataset.plx) || 0.05 };
    });

    var ticking = false;

    function apply() {
      ticking = false;

      var viewportCenter = window.innerHeight / 2;

      targets.forEach(function (item) {
        var rect = item.el.getBoundingClientRect();
        if (rect.bottom < -80 || rect.top > window.innerHeight + 80) {
          return; // off-screen — skip work
        }

        var offset =
          (rect.top + rect.height / 2 - viewportCenter) * item.speed;

        if (offset > MAX_SHIFT) offset = MAX_SHIFT;
        if (offset < -MAX_SHIFT) offset = -MAX_SHIFT;

        item.el.style.transform = "translate3d(0, " +
          offset.toFixed(2) + "px, 0)";
      });
    }

    function requestApply() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(apply);
    }

    window.addEventListener("scroll", requestApply, { passive: true });
    window.addEventListener("resize", requestApply);

    apply();
  });
})();
