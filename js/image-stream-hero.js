/**
 * ==========================================================================
 * IMAGE STREAM HERO - DYNAMIC 3D PERSPECTIVE CORRIDOR CONTROLLER
 * Faithful implementation of /components/ui/image-stream-hero.tsx
 * ==========================================================================
 */

(function () {
  'use strict';

  // 1. Curated CDN-optimized WebP thumbnails for AI, GPU, and 3D visual showcase (slashes payload by 95%)
  const IMAGES = [
    {
      src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=360&q=65&fm=webp",
      alt: "Abstract 3D curved fluid forms in deep indigo and violet",
    },
    {
      src: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=360&q=65&fm=webp",
      alt: "Prismatic colorful geometric shapes in motion",
    },
    {
      src: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=360&q=65&fm=webp",
      alt: "Luminous neon holographic gradient wave",
    },
    {
      src: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=360&q=65&fm=webp",
      alt: "Deep space digital light lattice and neural nodes",
    },
    {
      src: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=360&q=65&fm=webp",
      alt: "Vibrant chromatic distortion and abstract spectrum",
    },
    {
      src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=360&q=65&fm=webp",
      alt: "Retro cybernetic hardware and circuits",
    },
    {
      src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=360&q=65&fm=webp",
      alt: "Detailed macro view of high-performance silicon processor",
    },
    {
      src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=360&q=65&fm=webp",
      alt: "Futuristic digital matrix stream",
    },
    {
      src: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=360&q=65&fm=webp",
      alt: "Ultra-clean liquid gradient backdrop",
    },
    {
      src: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=360&q=65&fm=webp",
      alt: "Smooth monochromatic liquid topography",
    },
  ];

  // 2. Default Corridor Geometry conforming to CorridorPath in image-stream-hero.tsx
  const DEFAULT_PATH = {
    perspective: 30,
    cardWidth: 18,
    cardHeight: 25,
    cardRadius: 0.4,
    birthHeight: 2.6,
    exitHeight: 46,
    railBirth: -11,
    railExit: 44,
    fan: 3.3,
    turnBirth: 6,
    turnExit: 28,
    stops: 24,
  };

  /**
   * Sample the path once so CSS keyframes trace the real 3D curve
   */
  function generateKeyframes(dir, name, p) {
    const steps = [];
    for (let s = 0; s <= p.stops; s++) {
      const u = s / p.stops;
      const scale = (p.birthHeight / p.cardHeight) * Math.pow(p.exitHeight / p.birthHeight, u);
      const z = p.perspective * (1 - 1 / scale);
      const rail = p.railExit - (p.railExit - p.railBirth) * Math.pow(1 - u, p.fan);
      const turn = p.turnBirth + (p.turnExit - p.turnBirth) * u;
      steps.push(
        `${(u * 100).toFixed(2)}%{transform:translate3d(${(dir * rail).toFixed(
          2
        )}cqw,0,${z.toFixed(2)}cqw) rotateY(${(-dir * turn).toFixed(2)}deg)}`
      );
    }
    return `@keyframes ${name}{${steps.join("")}}`;
  }

  /**
   * Render the 3D Image Stream Corridor into a DOM container
   */
  function renderImageStreamHero(container, options = {}) {
    if (!container) return;

    const cardsCount = options.cards || 9;
    const speed = options.speed || 18;
    const axis = options.axis || 55;
    const images = options.images || IMAGES;
    const p = { ...DEFAULT_PATH, ...(options.path || {}) };

    const uid = 'ish-' + Math.random().toString(36).substring(2, 9);
    const rightKeyframe = `ish-r-${uid}`;
    const leftKeyframe = `ish-l-${uid}`;
    const cardClass = `ish-c-${uid}`;

    // CSS Keyframes and prefers-reduced-motion fallback
    const keyframesCSS =
      generateKeyframes(1, rightKeyframe, p) +
      generateKeyframes(-1, leftKeyframe, p) +
      `@media(prefers-reduced-motion:reduce){.${cardClass}{animation-play-state:paused!important}}`;

    const styleEl = document.createElement('style');
    styleEl.textContent = keyframesCSS;
    container.appendChild(styleEl);

    // Perspective 3D Stage
    const stage = document.createElement('div');
    stage.className = 'ish-stage';
    stage.setAttribute('aria-hidden', 'true');
    stage.style.perspective = `${p.perspective}cqw`;
    stage.style.perspectiveOrigin = `50% ${axis}%`;

    const world = document.createElement('div');
    world.className = 'ish-world';

    // Build right and left rail cards
    [rightKeyframe, leftKeyframe].forEach((railName) => {
      for (let i = 0; i < cardsCount; i++) {
        const img = images[i % Math.max(images.length, 1)];
        const card = document.createElement('div');
        card.className = `ish-card ${cardClass}`;
        card.style.left = '50%';
        card.style.top = `${axis}%`;
        card.style.width = `${p.cardWidth}cqw`;
        card.style.height = `${p.cardHeight}cqw`;
        card.style.marginLeft = `${-p.cardWidth / 2}cqw`;
        card.style.marginTop = `${-p.cardHeight / 2}cqw`;
        card.style.borderRadius = `${p.cardRadius}cqw`;
        card.style.animation = `${railName} ${speed}s linear infinite`;
        card.style.animationDelay = `${-(i * speed) / cardsCount}s`;
        card.style.backfaceVisibility = 'hidden';

        if (img) {
          const imgEl = document.createElement('img');
          imgEl.src = img.src;
          imgEl.alt = img.alt || '';
          imgEl.loading = 'lazy';
          imgEl.decoding = 'async';
          imgEl.draggable = false;
          card.appendChild(imgEl);
        }

        world.appendChild(card);
      }
    });

    stage.appendChild(world);
    container.appendChild(stage);

    // If container does not already have an overlay, generate the Demo UI overlay
    if (!options.noOverlay && !container.querySelector('.ish-overlay')) {
      const overlay = document.createElement('div');
      overlay.className = 'ish-overlay';
      overlay.innerHTML = `
        <!-- Feature Pill Badge with Sparkles Lucide Icon -->
        <div class="ish-pill-badge">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
            <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
            <path d="M20 3v4"></path>
            <path d="M22 5h-4"></path>
            <path d="M4 17v2"></path>
            <path d="M5 18H3"></path>
          </svg>
          <span>3D Corridor Component &bull; shadcn/ui</span>
        </div>

        <!-- Center Headline -->
        <div class="ish-title-group">
          <h3 class="ish-main-title">Continuous 3D Perspective Visualizer</h3>
          <p class="ish-sub-title">Hardware-accelerated card corridor engineered with CSS container query units</p>
        </div>

        <!-- Action Buttons -->
        <div class="ish-cta-group">
          <a href="#projects" class="ish-primary-btn">
            <span>Explore Implementations</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
          <a href="#about" class="ish-secondary-btn">
            <span>View Architecture</span>
          </a>
        </div>
      `;
      container.appendChild(overlay);
    }
  }

  // Initialize on DOM load or idle with IntersectionObserver
  function initImageStream() {
    // 1. Lazy Mount Showcase Corridor when approaching viewport
    const showcaseContainer = document.getElementById('image-stream-hero-container');
    if (showcaseContainer) {
      if ('IntersectionObserver' in window) {
        const obs = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              renderImageStreamHero(showcaseContainer, {
                cards: 9,
                speed: 18,
                axis: 55,
              });
              observer.unobserve(showcaseContainer);
            }
          });
        }, { rootMargin: '250px 0px' });
        obs.observe(showcaseContainer);
      } else {
        renderImageStreamHero(showcaseContainer, {
          cards: 9,
          speed: 18,
          axis: 55,
        });
      }
    }

    // 2. Mount and integrate into Hero 3D HUD Dock on Demand
    const heroHudDock = document.querySelector('.hud-modes-group');
    const heroCanvasContainer = document.getElementById('hero-3d-canvas-container');

    if (heroHudDock && heroCanvasContainer) {
      const heroCorridorLayer = document.createElement('div');
      heroCorridorLayer.id = 'hero-stream-corridor-layer';
      heroCorridorLayer.className = 'hero-corridor-stage';
      heroCorridorLayer.style.display = 'none';
      heroCanvasContainer.parentNode.insertBefore(heroCorridorLayer, heroCanvasContainer.nextSibling);

      let heroCorridorRendered = false;

      // Add "3D Stream" button to Hero HUD
      const streamBtn = document.createElement('button');
      streamBtn.className = 'hud-btn';
      streamBtn.setAttribute('data-holo-mode', 'image-stream');
      streamBtn.textContent = '3D Stream';
      heroHudDock.appendChild(streamBtn);

      // Handle mode switching - only render when requested
      heroHudDock.addEventListener('click', (e) => {
        const targetBtn = e.target.closest('.hud-btn');
        if (!targetBtn) return;

        const mode = targetBtn.getAttribute('data-holo-mode');
        const activeModeLabel = document.getElementById('hud-active-mode-label');

        if (mode === 'image-stream') {
          if (!heroCorridorRendered) {
            renderImageStreamHero(heroCorridorLayer, {
              cards: 9,
              speed: 20,
              axis: 50,
              noOverlay: true,
            });
            heroCorridorRendered = true;
          }
          heroCorridorLayer.style.display = 'block';
          const threeCanvas = document.getElementById('hero-3d-canvas');
          if (threeCanvas) threeCanvas.style.opacity = '0.2';
          if (activeModeLabel) activeModeLabel.textContent = '3D STREAM CORRIDOR';
        } else {
          heroCorridorLayer.style.display = 'none';
          const threeCanvas = document.getElementById('hero-3d-canvas');
          if (threeCanvas) threeCanvas.style.opacity = '1';
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initImageStream);
  } else {
    initImageStream();
  }

  // Export for global access
  window.ImageStreamHero = {
    render: renderImageStreamHero,
    images: IMAGES,
    defaultPath: DEFAULT_PATH,
  };
})();
