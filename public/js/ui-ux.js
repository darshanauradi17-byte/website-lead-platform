/* WEBSTUDIO — FRAMER MOTION PHYSICS & STAGGER ENGINE */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    initMotionReveals();
    initMagneticPhysics();
    initRippleButtons();
  });

  function initMotionReveals() {
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