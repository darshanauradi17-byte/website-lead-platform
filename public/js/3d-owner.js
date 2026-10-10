/* ==========================================================================
   WEBSTUDIO — PRODUCTION 3D INTERACTION ENGINE
   Realistic Layered Depth, Perspective Parallax & Micro-Interactions
   ========================================================================== */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    initFloatingBrowserTilt();
    initDashboard3DStage();
    initStatCardsMicroTilt();
  });

  /* ==========================================================================
     1. LOGIN 3D FLOATING BROWSER PREVIEW TILT
     ========================================================================== */
  function initFloatingBrowserTilt() {
    const previewCard = document.getElementById("previewBrowserCard");
    if (!previewCard) return;

    const container = previewCard.closest(".login__preview-container") || previewCard.parentElement;
    if (!container) return;

    let targetRotX = 5;
    let targetRotY = -4;
    let currentRotX = 5;
    let currentRotY = -4;
    let isHovered = false;

    container.addEventListener("mousemove", (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const normX = (x / rect.width) * 2 - 1;
      const normY = (y / rect.height) * 2 - 1;

      targetRotY = normX * 8;
      targetRotX = -normY * 7;
      isHovered = true;
    });

    container.addEventListener("mouseleave", () => {
      targetRotX = 5;
      targetRotY = -4;
      isHovered = false;
    });

    function updateCard3D() {
      const ease = isHovered ? 0.08 : 0.04;
      currentRotX += (targetRotX - currentRotX) * ease;
      currentRotY += (targetRotY - currentRotY) * ease;

      const translateZ = isHovered ? 12 : 0;
      previewCard.style.transform = `rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg) translateZ(${translateZ}px)`;

      requestAnimationFrame(updateCard3D);
    }

    updateCard3D();
  }

  /* ==========================================================================
     2. IN-DASHBOARD PROMINENT 3D STAGE & VIEWPORT SWITCHER
     ========================================================================== */
  function initDashboard3DStage() {
    const stage = document.getElementById("dash3DStage");
    const browser = document.getElementById("dash3DBrowser");
    if (!stage || !browser) return;

    let targetRotX = 3;
    let targetRotY = -2;
    let currentRotX = 3;
    let currentRotY = -2;
    let isHovered = false;

    stage.addEventListener("mousemove", (e) => {
      const rect = stage.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const normX = (x / rect.width) * 2 - 1;
      const normY = (y / rect.height) * 2 - 1;

      // Realistic subtle 3D tilt
      targetRotY = normX * 6;
      targetRotX = -normY * 5;
      isHovered = true;
    });

    stage.addEventListener("mouseleave", () => {
      targetRotX = 3;
      targetRotY = -2;
      isHovered = false;
    });

    function updateDashboard3D() {
      const ease = isHovered ? 0.07 : 0.035;
      currentRotX += (targetRotX - currentRotX) * ease;
      currentRotY += (targetRotY - currentRotY) * ease;

      const elevation = isHovered ? 14 : 0;
      browser.style.transform = `rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg) translateZ(${elevation}px)`;

      requestAnimationFrame(updateDashboard3D);
    }

    updateDashboard3D();

    // Responsive Viewport Switcher (Desktop 16:9 vs Mobile 9:16)
    const btnDesktop = document.getElementById("btnViewDesktop");
    const btnMobile = document.getElementById("btnViewMobile");
    const urlText = document.getElementById("dashPreviewUrl");
    const syncText = document.getElementById("dashSyncText");

    if (btnDesktop && btnMobile) {
      btnDesktop.addEventListener("click", () => {
        btnDesktop.classList.add("active");
        btnMobile.classList.remove("active");
        browser.classList.remove("mobile-mode");
        if (urlText) urlText.textContent = "https://apnaweb.in/client-portal";
        if (syncText) syncText.textContent = "Production Client View • 3D Parallax Active";
      });

      btnMobile.addEventListener("click", () => {
        btnMobile.classList.add("active");
        btnDesktop.classList.remove("active");
        browser.classList.add("mobile-mode");
        if (urlText) urlText.textContent = "https://apnaweb.in/mobile";
        if (syncText) syncText.textContent = "Mobile Viewport • 3D Parallax Active";
      });
    }
  }

  /* ==========================================================================
     3. STAT CARDS REALISTIC MICRO-TILT & AMBIENT SHEEN
     ========================================================================== */
  function initStatCardsMicroTilt() {
    const statCardsContainer = document.getElementById("statCards");
    if (!statCardsContainer) return;

    statCardsContainer.addEventListener("mousemove", (e) => {
      const card = e.target.closest(".stat-card");
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -3.5;
      const rotateY = ((x - centerX) / centerX) * 3.5;

      card.style.transform = `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-3px)`;
    });

    statCardsContainer.addEventListener("mouseout", (e) => {
      const card = e.target.closest(".stat-card");
      if (card && !card.contains(e.relatedTarget)) {
        card.style.transform = "";
      }
    });
  }

})();