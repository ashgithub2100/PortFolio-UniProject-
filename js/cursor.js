/**
 * Custom Magnetic Cursor & 3D Tilt Micro-Interactions
 * - Physics-based lerp tracking
 * - Hover state triggers & magnetic snap
 * - 3D Card Tilt with dynamic spotlight gradient coordinates
 * - Touch device graceful fallback
 */

(function initCursorAndTilt() {
  // Check for touch / coarse pointer
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

    // Instant position for inner dot
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  }, { passive: true });

  // Smooth lerp loop for outer outline
  function renderCursor() {
    outlineX += (mouseX - outlineX) * 0.18;
    outlineY += (mouseY - outlineY) * 0.18;

    cursorOutline.style.left = `${outlineX}px`;
    cursorOutline.style.top = `${outlineY}px`;

    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  // Click pulse
  window.addEventListener('mousedown', () => cursorOutline.classList.add('is-clicking'));
  window.addEventListener('mouseup', () => cursorOutline.classList.remove('is-clicking'));

  // Hover detection for interactive targets
  const interactiveSelector = 'a, button, .btn, .bento-card, .project-card, .skill-domain-card, .contact-channel-item, .tag-pill, .modal-close-btn, .copy-email-btn';
  
  function attachHoverListeners() {
    const targets = document.querySelectorAll(interactiveSelector);
    targets.forEach(el => {
      el.addEventListener('mouseenter', () => cursorOutline.classList.add('is-hovering'));
      el.addEventListener('mouseleave', () => cursorOutline.classList.remove('is-hovering'));
    });
  }

  attachHoverListeners();

  // 2. 3D Perspective Tilt for Project Cards & Bento Cards
  const tiltCards = document.querySelectorAll('.project-card, .bento-card, .contact-hub-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Set CSS variables for radial spotlight
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      // Only apply 3D tilt rotation if it's a project card
      if (card.classList.contains('project-card')) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6; // max 6 deg
        const rotateY = ((x - centerX) / centerX) * 6;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      if (card.classList.contains('project-card')) {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
      }
    });
  });
})();
