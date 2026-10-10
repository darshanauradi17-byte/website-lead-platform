/* =========================================================
   WEBSTUDIO — MOTION DESIGN ENGINE
   Scroll progress · navbar elevation · scrollspy
   back-to-top — additive, defensive, reduced-motion aware
   ========================================================= */

(function () {
  "use strict";

  var reduceMotionQuery = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  document.addEventListener("DOMContentLoaded", function () {
    var navbar = document.querySelector(".navbar");
    var progress = createProgressBar();
    var backToTop = createBackToTopButton();
    var spyEntries = collectSpyEntries();
    var activeEntry = null;
    var ticking = false;

    function createProgressBar() {
      var root = document.createElement("div");
      root.className = "md-progress";
      root.setAttribute("aria-hidden", "true");

      var fill = document.createElement("span");
      root.appendChild(fill);
      document.body.appendChild(root);

      return { root: root, fill: fill };
    }

    function createBackToTopButton() {
      var button = document.createElement("button");
      button.type = "button";
      button.className = "md-top";
      button.setAttribute("aria-label", "Back to top");
      button.innerHTML =
        '<span aria-hidden="true">&#8593;</span>';

      button.addEventListener("click", function () {
        window.scrollTo({
          top: 0,
          behavior: reduceMotionQuery.matches ? "auto" : "smooth"
        });
      });

      document.body.appendChild(button);
      return button;
    }

    /* Group nav links by target section so desktop and mobile
       links for the same section highlight together. */
    function collectSpyEntries() {
      var links = document.querySelectorAll(
        '.nav-links a[href^="#"], .mobile-menu-links a[href^="#"]'
      );
      var byHref = {};
      var entries = [];

      Array.prototype.forEach.call(links, function (link) {
        var href = link.getAttribute("href");
        if (!href || href.length < 2) return;

        var target = null;
        try {
          target = document.querySelector(href);
        } catch (err) {
          return;
        }
        if (!target) return;

        if (!byHref[href]) {
          byHref[href] = { target: target, links: [] };
          entries.push(byHref[href]);
        }
        byHref[href].links.push(link);
      });

      return entries;
    }

    function setActiveEntry(next) {
      if (next === activeEntry) return;

      if (activeEntry) {
        activeEntry.links.forEach(function (link) {
          link.classList.remove("md-active");
          link.removeAttribute("aria-current");
        });
      }

      activeEntry = next;

      if (activeEntry) {
        activeEntry.links.forEach(function (link) {
          link.classList.add("md-active");
          link.setAttribute("aria-current", "location");
        });
      }
    }

    /* The active section is the last one scrolled past a
       mid-viewport line, chosen by position so the highlight
       never depends on navigation link order. */
    function updateSpy() {
      if (!spyEntries.length) return;

      var threshold = window.innerHeight * 0.4;
      var atBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 4;

      var passed = null;
      var passedTop = -Infinity;
      var lowest = null;
      var lowestTop = -Infinity;

      spyEntries.forEach(function (entry) {
        var top = entry.target.getBoundingClientRect().top;

        if (top > lowestTop) {
          lowestTop = top;
          lowest = entry;
        }

        if (top <= threshold && top > passedTop) {
          passedTop = top;
          passed = entry;
        }
      });

      setActiveEntry(passed || (atBottom ? lowest : null));
    }

    function update() {
      var doc = document.documentElement;
      var y = window.scrollY || doc.scrollTop || 0;
      var max = Math.max(doc.scrollHeight - window.innerHeight, 0);
      var ratio = max > 0 ? Math.min(Math.max(y / max, 0), 1) : 0;

      if (progress) {
        progress.fill.style.transform = "scaleX(" + ratio + ")";
        progress.root.classList.toggle("md-show", ratio > 0.002);
      }

      if (navbar) {
        navbar.classList.toggle("md-scrolled", y > 16);
      }

      if (backToTop) {
        backToTop.classList.toggle("md-top--show", y > 520);
      }

      updateSpy();
    }

    function requestUpdate() {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(function () {
        ticking = false;
        update();
      });
    }

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    window.addEventListener("hashchange", requestUpdate);

    update();
  });
})();
