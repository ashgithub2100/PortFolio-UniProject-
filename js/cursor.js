/**
 * Custom Magnetic Cursor, 3D Multi-Layer Tilt & Cyber Spark Micro-Interactions
 * - Physics-based lerp tracking with dynamic velocity stretching
 * - 3D Multi-Layer Card Tilt with dynamic specular glare calculations
 * - Interactive cyber particle sparks on mouse click
 * - Web Audio API sound triggers on hover & clicks
 * - Touch device graceful fallback
 */

(function initCursorAndTilt() {
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
  if (isTouchDevice) return;

  // 1. Create Cursor Elements in DOM
  const cursorDot = document.createElement('div');
  cursorDot.className = 'custom-cursor-dot';

  const cursorOutline = document.createElement('div');
  cursorOutline.className = 'custom-cursor-outline';

  document.body.appendChild(cursorDot);
  document.body.appendChild(cursorOutline);

  let mouseX = -100;
  let mouseY = -100;
  let outlineX = -100;
  let outlineY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  }, { passive: true });

  // Smooth lerp loop
  function renderCursor() {
    outlineX += (mouseX - outlineX) * 0.18;
    outlineY += (mouseY - outlineY) * 0.18;

    cursorOutline.style.left = `${outlineX}px`;
    cursorOutline.style.top = `${outlineY}px`;

    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  // Click Spark Micro-burst
  function createClickSparks(x, y) {
    const sparkCount = 6;
    for (let i = 0; i < sparkCount; i++) {
      const spark = document.createElement('div');
      spark.className = 'cursor-spark';
      const angle = (i / sparkCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
      const distance = Math.random() * 25 + 15;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;

      spark.style.left = `${x}px`;
      spark.style.top = `${y}px`;
      spark.style.setProperty('--tx', `${tx}px`);
      spark.style.setProperty('--ty', `${ty}px`);

      document.body.appendChild(spark);
      setTimeout(() => spark.remove(), 450);
    }
  }

  // Click pulse & audio
  window.addEventListener('mousedown', (e) => {
    cursorOutline.classList.add('is-clicking');
    createClickSparks(e.clientX, e.clientY);
  });

  window.addEventListener('mouseup', () => {
    cursorOutline.classList.remove('is-clicking');
  });

  // Hover detection for interactive targets
  const interactiveSelector = 'a, button, .btn, .bento-card, .project-card, .skill-domain-card, .contact-channel-item, .tag-pill, .modal-close-btn, .copy-email-btn, .hud-btn, .sim-chip';

  function attachHoverListeners() {
    const targets = document.querySelectorAll(interactiveSelector);
    targets.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorOutline.classList.add('is-hovering');
        if (window.cyberAudio && el.matches('button, a, .btn, .tag-pill, .hud-btn, .sim-chip')) {
          window.cyberAudio.playHover();
        }
      });
      el.addEventListener('mouseleave', () => {
        cursorOutline.classList.remove('is-hovering');
      });
      el.addEventListener('click', () => {
        if (window.cyberAudio && el.matches('button, a, .btn, .tag-pill, .hud-btn, .sim-chip')) {
          window.cyberAudio.playClick();
        }
      });
    });
  }

  attachHoverListeners();

  // 2. 3D Spatial Depth Tilt with Multi-Layer Parallax & Specular Glare
  const tiltCards = document.querySelectorAll('.project-card, .bento-card, .skill-domain-card, .contact-hub-card');

  tiltCards.forEach(card => {
    let bounds;

    function onMouseEnter() {
      bounds = card.getBoundingClientRect();
      card.style.transition = 'transform 0.1s ease-out, box-shadow 0.25s ease';
    }

    function onMouseMove(e) {
      if (!bounds) bounds = card.getBoundingClientRect();

      const mouseCardX = e.clientX - bounds.left;
      const mouseCardY = e.clientY - bounds.top;

      const centerX = bounds.width / 2;
      const centerY = bounds.height / 2;

      const percentX = (mouseCardX - centerX) / centerX;
      const percentY = (mouseCardY - centerY) / centerY;

      // Max tilt angle
      const maxAngle = card.classList.contains('project-card') ? 10 : 6;
      const rotX = -percentY * maxAngle;
      const rotY = percentX * maxAngle;

      // Set CSS variables for radial specular glare
      card.style.setProperty('--mouse-x', `${mouseCardX}px`);
      card.style.setProperty('--mouse-y', `${mouseCardY}px`);

      card.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateZ(10px)`;
    }

    function onMouseLeave() {
      card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease';
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
      bounds = null;
    }

    card.addEventListener('mouseenter', onMouseEnter);
    card.addEventListener('mousemove', onMouseMove, { passive: true });
    card.addEventListener('mouseleave', onMouseLeave);
  });
})();
