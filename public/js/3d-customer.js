/* =========================================================
   WEBSTUDIO CUSTOMER PAGE - CALM EDITORIAL PARCHMENT (#F6F4EE)
   High-Visibility 3D PBR Studio Environment & Lighting (Three.js)
   ========================================================= */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    init3DCustomerScene();
    init3DCardMicroTilt();
  });

  function init3DCustomerScene() {
    const canvas = document.getElementById("canvas-3d-customer");
    if (!canvas) return;

    if (typeof THREE === "undefined") {
      initFallbackStudioCanvas(canvas);
      return;
    }

    const scene = new THREE.Scene();
    // Light page background: distance fades to the page color, not dark fog.
    scene.fog = new THREE.FogExp2(0xf2f6fc, 0.011);

    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 26);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    // Size the render buffer to the canvas' real layout box so the scene
    // never stretches on phones/tablets where CSS fixes the canvas height.
    function syncRendererSize() {
      const width = canvas.clientWidth || window.innerWidth;
      const height = canvas.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    }

    syncRendererSize();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;

    // High-Visibility 3D Studio Lighting for Dark Background
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    // Key Light (Cyan / Electric Blue Specular highlight)
    const keyLight = new THREE.DirectionalLight(0x38bdf8, 4.0);
    keyLight.position.set(15, 25, 20);
    scene.add(keyLight);

    // Fill Light (Warm Amber Rim light)
    const fillLight = new THREE.DirectionalLight(0xf59e0b, 3.2);
    fillLight.position.set(-20, -15, -10);
    scene.add(fillLight);

    // Dynamic Mouse Spotlight (Glowing Cobalt)
    const mouseSpot = new THREE.PointLight(0x60a5fa, 6.0, 60);
    mouseSpot.position.set(0, 0, 15);
    scene.add(mouseSpot);

    // Realistic Refractive Crystal Glass Orb
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      emissive: 0x0369a1,
      emissiveIntensity: 0.25,
      metalness: 0.1,
      roughness: 0.05,
      transmission: 0.92,
      thickness: 2.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      ior: 1.52,
      transparent: true,
      opacity: 0.95,
    });

    const sphereGeo = new THREE.SphereGeometry(4.5, 64, 64);
    const glassOrb = new THREE.Mesh(sphereGeo, glassMaterial);
    glassOrb.position.set(14, 3, -8);
    scene.add(glassOrb);

    // Metallic Titanium Accent Ring
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.95,
      roughness: 0.15,
      emissive: 0x1e293b,
      emissiveIntensity: 0.2,
    });
    const ringGeo = new THREE.TorusGeometry(3.8, 0.4, 32, 64);
    const metallicRing = new THREE.Mesh(ringGeo, ringMat);
    metallicRing.position.set(-16, -5, -10);
    metallicRing.rotation.x = Math.PI * 0.3;
    scene.add(metallicRing);

    // Floating Studio Diamond Octahedron
    const diamondMat = new THREE.MeshPhysicalMaterial({
      color: 0x60a5fa,
      metalness: 0.2,
      roughness: 0.1,
      transmission: 0.8,
      clearcoat: 1.0,
      ior: 1.45,
      transparent: true,
      opacity: 0.9,
    });
    const diamondGeo = new THREE.OctahedronGeometry(2.2, 0);
    const diamondMesh = new THREE.Mesh(diamondGeo, diamondMat);
    diamondMesh.position.set(10, -8, -6);
    scene.add(diamondMesh);

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    window.addEventListener("mousemove", (e) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    });

    window.addEventListener("resize", syncRendererSize);

    // OS "reduce motion" setting: draw one static frame, no animation loop.
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Pause rendering while the hero is scrolled out of view (mobile GPU saver).
    let heroInView = true;

    if ("IntersectionObserver" in window) {
      const hero = document.querySelector(".hero");
      if (hero) {
        new IntersectionObserver((entries) => {
          heroInView = entries[0].isIntersecting;
        }).observe(hero);
      }
    }

    if (reduceMotion) {
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
      return;
    }

    const clock = new THREE.Clock();

    function animateStudio() {
      requestAnimationFrame(animateStudio);

      if (!heroInView) return;

      const time = clock.getElapsedTime();

      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      mouseSpot.position.x = mouseX * 24;
      mouseSpot.position.y = mouseY * 20;

      camera.position.x = mouseX * 1.8;
      camera.position.y = mouseY * 1.4;
      camera.lookAt(0, 0, 0);

      glassOrb.position.y = 3 + Math.sin(time * 0.8) * 0.9;
      glassOrb.rotation.y = time * 0.25;

      metallicRing.position.y = -5 + Math.cos(time * 0.7) * 0.9;
      metallicRing.rotation.y = time * 0.3;

      diamondMesh.position.y = -8 + Math.sin(time * 1.1) * 0.6;
      diamondMesh.rotation.x = time * 0.4;
      diamondMesh.rotation.y = time * 0.5;

      renderer.render(scene, camera);
    }

    animateStudio();
  }

  function initFallbackStudioCanvas(canvas) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width =
      canvas.clientWidth || window.innerWidth);
    let height = (canvas.height =
      canvas.clientHeight || window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    window.addEventListener("resize", () => {
      width = canvas.width =
        canvas.clientWidth || window.innerWidth;
      height = canvas.height =
        canvas.clientHeight || window.innerHeight;
    });

    function drawFallback() {
      ctx.clearRect(0, 0, width, height);

      const grad = ctx.createRadialGradient(
        mouseX,
        mouseY,
        30,
        mouseX,
        mouseY,
        550
      );
      grad.addColorStop(0, "rgba(59, 130, 246, 0.2)");
      grad.addColorStop(0.5, "rgba(246, 244, 238, 0.4)");
      grad.addColorStop(1, "rgba(246, 244, 238, 1)");

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      requestAnimationFrame(drawFallback);
    }

    drawFallback();
  }

  function init3DCardMicroTilt() {
    const tiltSelectors = [
      ".hero-card",
      ".feature-card",
      ".showcase-card",
      ".pricing-card",
      ".request-card",
      ".testimonial-card",
    ];

    const cards = document.querySelectorAll(tiltSelectors.join(","));

    cards.forEach((card) => {
      card.style.transition = "transform 0.2s ease-out, box-shadow 0.25s ease-out";
      card.style.transformStyle = "preserve-3d";

      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -2.5;
        const rotateY = ((x - centerX) / centerX) * 2.5;

        card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(4px)`;
        card.style.boxShadow = `
          ${-rotateY * 0.8}px ${rotateX * 0.8}px 30px rgba(15, 23, 42, 0.09),
          0 15px 35px rgba(0, 0, 0, 0.06)
        `;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
        card.style.boxShadow = "";
      });
    });
  }
})();

/* =========================================================
   WEBSITE PREVIEW 3D TILT
   ========================================================= */

(function () {

  const previews =
    document.querySelectorAll(
      ".website-preview-3d"
    );

  if (!previews.length) {
    return;
  }

  const reduceMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

  if (reduceMotion) {
    return;
  }

  previews.forEach(function (preview) {

    const frame =
      preview.querySelector(
        ".website-preview-3d__frame"
      );

    if (!frame) {
      return;
    }


    preview.addEventListener(
      "pointermove",
      function (event) {

        const rect =
          preview.getBoundingClientRect();

        const x =
          (event.clientX - rect.left) /
          rect.width -
          0.5;

        const y =
          (event.clientY - rect.top) /
          rect.height -
          0.5;

        const rotateY = x * 5;
        const rotateX = y * -3;

        frame.style.animationPlayState =
          "paused";

        frame.style.transform =
          "rotateX(" +
          rotateX +
          "deg) " +
          "rotateY(" +
          rotateY +
          "deg) " +
          "translateY(-3px)";
      }
    );


    preview.addEventListener(
      "pointerleave",
      function () {

        frame.style.animationPlayState =
          "running";

        frame.style.transform = "";
      }
    );

  });

})();