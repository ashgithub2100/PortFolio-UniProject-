/**
 * Ambient Cyber Particle Mesh - Aditya Sharma Portfolio
 * Floating background particle network with mouse repulsion & distance-based neural threads.
 * Pure Vanilla Canvas, zero external dependencies, 60 FPS performance throttling.
 */

(function initAmbientParticleMesh() {
  // Check prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const canvas = document.createElement('canvas');
  canvas.id = 'ambient-particle-canvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '0';
  canvas.style.opacity = '0.45';

  const body = document.body;
  body.insertBefore(canvas, body.firstChild);

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const isMobile = window.innerWidth < 768;
  const particleCount = isMobile ? 18 : 34;
  const maxDistance = isMobile ? 85 : 120;
  const maxDistanceSq = maxDistance * maxDistance;
  const mouseRadius = 130;
  const mouseRadiusSq = mouseRadius * mouseRadius;

  let mouse = { x: -1000, y: -1000, isMoving: false };
  let mouseTimer = null;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.isMoving = true;
    clearTimeout(mouseTimer);
    mouseTimer = setTimeout(() => { mouse.isMoving = false; }, 1800);
  }, { passive: true });

  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : -10;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = Math.random() * 0.4 + 0.15;
      this.radius = Math.random() * 1.6 + 0.8;
      this.alpha = Math.random() * 0.5 + 0.2;
      this.color = Math.random() > 0.3 ? '0, 245, 160' : '56, 189, 248'; // Emerald or Cyan
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Mouse repulsion using squared distance to avoid Math.sqrt when far
      if (mouse.x > 0) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < mouseRadiusSq && distSq > 0) {
          const dist = Math.sqrt(distSq);
          const force = (mouseRadius - dist) / mouseRadius;
          const angle = Math.atan2(dy, dx);
          this.x += Math.cos(angle) * force * 2.5;
          this.y += Math.sin(angle) * force * 2.5;
        }
      }

      if (this.y > height + 10 || this.x < -10 || this.x > width + 10) {
        this.reset();
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  let isPageVisible = true;
  let isHeroVisible = true;
  let animId = null;

  function startLoop() {
    if (!animId) {
      animId = requestAnimationFrame(animate);
    }
  }

  function stopLoop() {
    if (animId) {
      cancelAnimationFrame(animId);
      animId = null;
    }
  }

  document.addEventListener('visibilitychange', () => {
    isPageVisible = !document.hidden;
    if (isPageVisible && isHeroVisible) startLoop();
    else stopLoop();
  });

  const heroEl = document.getElementById('hero');
  if (heroEl && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isHeroVisible = entry.isIntersecting;
        if (isPageVisible && isHeroVisible) startLoop();
        else stopLoop();
      });
    }, { rootMargin: '150px 0px' });
    observer.observe(heroEl);
  }

  function animate() {
    if (!isPageVisible || !isHeroVisible) {
      animId = null;
      return;
    }
    animId = requestAnimationFrame(animate);

    ctx.clearRect(0, 0, width, height);

    // Draw connecting neural threads with fast distance-squared pruning
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      // Connect to nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distSq = dx * dx + dy * dy;

        if (distSq < maxDistanceSq) {
          const dist = Math.sqrt(distSq);
          const lineAlpha = (1 - dist / maxDistance) * 0.16;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 245, 160, ${lineAlpha.toFixed(3)})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }

      // Connect to mouse cursor if close
      if (mouse.x > 0) {
        const mdx = particles[i].x - mouse.x;
        const mdy = particles[i].y - mouse.y;
        const mdistSq = mdx * mdx + mdy * mdy;
        if (mdistSq < mouseRadiusSq) {
          const mdist = Math.sqrt(mdistSq);
          const lineAlpha = (1 - mdist / mouseRadius) * 0.35;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(0, 245, 160, ${lineAlpha.toFixed(3)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
  }

  startLoop();
})();
