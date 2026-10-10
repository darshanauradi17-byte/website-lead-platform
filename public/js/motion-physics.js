/* WEBSTUDIO — FRAMER MOTION PHYSICS & STAGGER ENGINE */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    initMotionReveals();
    initMagneticPhysics();
    initRippleButtons();
  });

  function initMotionReveals() {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Respect the OS accessibility setting and ancient browsers:
    // never hide content in those cases.
    if (reduceMotion || !("IntersectionObserver" in window)) {
      return;
    }

    try {
      autoTagRevealElements();
    } catch (err) {
      // If tagging fails for any reason, make sure nothing stays hidden.
      document
        .querySelectorAll("[data-motion]")
        .forEach((el) => {
          el.removeAttribute("data-motion");
          el.removeAttribute("data-motion-delay");
        });
      return;
    }

    const motionElements = document.querySelectorAll("[data-motion]");
    if (!motionElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = parseFloat(entry.target.dataset.motionDelay || "0");
            setTimeout(() => {
              entry.target.classList.add("is-visible");
            }, delay * 1000);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    motionElements.forEach((el) => observer.observe(el));
  }

  /*
    Marks cards/headings for the reveal animation — but ONLY when they are
    still below the fold, so nothing ever flashes on page load.
  */
  function autoTagRevealElements() {
    const selector = [
      ".section-heading",
      ".center-heading",
      ".trust-item",
      ".service-card",
      ".feature-card",
      ".showcase-card",
      ".process-card",
      ".portfolio-card",
      ".pricing-card",
      ".testimonial-card",
      ".category-card",
      ".website-card",
      ".work-card",
      ".cta-container",
    ].join(",");

    const candidates = document.querySelectorAll(selector);
    const viewportHeight = window.innerHeight;
    let staggerIndex = 0;

    candidates.forEach((el) => {
      if (el.hasAttribute("data-motion")) return;

      const rect = el.getBoundingClientRect();

      if (rect.top <= viewportHeight * 0.92) {
        staggerIndex += 1;
        return;
      }

      el.setAttribute("data-motion", "");
      el.setAttribute(
        "data-motion-delay",
        String(Math.min((staggerIndex % 4) * 0.08, 0.32))
      );
      staggerIndex += 1;
    });
  }

  function initMagneticPhysics() {
    const magneticBtns = document.querySelectorAll(".btn-promax, [data-magnetic]");
    magneticBtns.forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px) scale(1.02)`;
      });

      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "translate(0px, 0px) scale(1)";
      });
    });
  }

  function initRippleButtons() {
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn-promax, .btn");
      if (!btn) return;

      const rect = btn.getBoundingClientRect();
      const circle = document.createElement("span");
      const diameter = Math.max(rect.width, rect.height);
      const radius = diameter / 2;

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - radius}px`;
      circle.style.top = `${e.clientY - rect.top - radius}px`;
      circle.classList.add("ripple-effect");

      const existing = btn.getElementsByClassName("ripple-effect")[0];
      if (existing) existing.remove();

      btn.appendChild(circle);
    });
  }
})();