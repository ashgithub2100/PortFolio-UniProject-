/**
 * Advanced Interactive Three.js Neural Holo-Core - Aditya Sharma Portfolio
 * Features:
 * - Multi-Geometry Switchable 3D Visualizer (Neural Torus, Quantum Polyhedron, Cyber Synapse Sphere)
 * - Click & Drag 3D Orbiting with Smooth Inertia & Damping
 * - Mouse Raycasting & Particle Shockwave Physics on Click
 * - Integrated HUD Telemetry Monitor (FPS, Vertices, Active Core State)
 * - Wireframe & Auto-Rotation Toggles
 * - IntersectionObserver Viewport Pausing
 */

(function initAdvancedThreeScene() {
  if (typeof THREE === 'undefined') return;
  const container = document.getElementById('hero-3d-canvas-container');
  if (!container) return;

  const width = container.clientWidth || window.innerWidth;
  const height = container.clientHeight || window.innerHeight;

  // Scene setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
  camera.position.z = 34;

  // Renderer setup
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  // Colors
  const colorEmerald = new THREE.Color('#00f5a0');
  const colorCyan = new THREE.Color('#38bdf8');
  const colorAmber = new THREE.Color('#ff9e2c');
  const colorWhite = new THREE.Color('#ffffff');

  // Procedural Glowing Circular Particle Texture
  function createParticleTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.25, 'rgba(0, 245, 160, 0.95)');
    gradient.addColorStop(0.6, 'rgba(56, 189, 248, 0.35)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(canvas);
  }

  const particleTexture = createParticleTexture();

  // Root 3D Groups for Different Modes
  const mainGroup = new THREE.Group();
  scene.add(mainGroup);

  const torusGroup = new THREE.Group();
  const quantumGroup = new THREE.Group();
  const synapseGroup = new THREE.Group();

  mainGroup.add(torusGroup);
  mainGroup.add(quantumGroup);
  mainGroup.add(synapseGroup);

  quantumGroup.visible = false;
  synapseGroup.visible = false;

  const isMobile = window.innerWidth < 768;

  // =========================================================================
  // 1. NEURAL TORUS LATTICE (Mode 1)
  // =========================================================================
  const torusParticleCount = isMobile ? 1500 : 3200;
  const torusGeo = new THREE.BufferGeometry();
  const torusPositions = new Float32Array(torusParticleCount * 3);
  const torusOriginalPositions = new Float32Array(torusParticleCount * 3);
  const torusColors = new Float32Array(torusParticleCount * 3);
  const torusVelocities = new Float32Array(torusParticleCount * 3);

  const p = 3, q = 4, radius = 11.5, tube = 4.4;

  for (let i = 0; i < torusParticleCount; i++) {
    const u = (i / torusParticleCount) * Math.PI * 2 * p;
    const cu = Math.cos(u);
    const su = Math.sin(u);
    const quOverP = (q / p) * u;
    const cqu = Math.cos(quOverP);
    const squ = Math.sin(quOverP);

    const x0 = (radius + tube * cqu) * cu;
    const y0 = (radius + tube * cqu) * su;
    const z0 = tube * squ;

    const spread = (Math.random() - 0.5) * 4.8;
    const spreadY = (Math.random() - 0.5) * 4.8;
    const spreadZ = (Math.random() - 0.5) * 4.8;

    const px = x0 + spread;
    const py = y0 + spreadY;
    const pz = z0 + spreadZ;

    torusPositions[i * 3] = px;
    torusPositions[i * 3 + 1] = py;
    torusPositions[i * 3 + 2] = pz;

    torusOriginalPositions[i * 3] = px;
    torusOriginalPositions[i * 3 + 1] = py;
    torusOriginalPositions[i * 3 + 2] = pz;

    torusVelocities[i * 3] = 0;
    torusVelocities[i * 3 + 1] = 0;
    torusVelocities[i * 3 + 2] = 0;

    const mixRatio = Math.random();
    let col;
    if (mixRatio < 0.65) {
      col = colorEmerald.clone().lerp(colorCyan, Math.random() * 0.45);
    } else if (mixRatio < 0.9) {
      col = colorCyan.clone();
    } else {
      col = colorWhite.clone();
    }

    torusColors[i * 3] = col.r;
    torusColors[i * 3 + 1] = col.g;
    torusColors[i * 3 + 2] = col.b;
  }

  torusGeo.setAttribute('position', new THREE.BufferAttribute(torusPositions, 3));
  torusGeo.setAttribute('color', new THREE.BufferAttribute(torusColors, 3));

  const torusMat = new THREE.PointsMaterial({
    size: isMobile ? 0.75 : 0.9,
    map: particleTexture,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const torusParticles = new THREE.Points(torusGeo, torusMat);
  torusGroup.add(torusParticles);

  // Inner Icosahedron Tensor Core
  const coreGeometry = new THREE.IcosahedronGeometry(5.8, 1);
  const coreMaterial = new THREE.MeshBasicMaterial({
    color: 0x00f5a0,
    wireframe: true,
    transparent: true,
    opacity: 0.22
  });
  const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
  torusGroup.add(coreMesh);

  // =========================================================================
  // 2. QUANTUM CORE (Mode 2: Nested Platonic Hologram & Rings)
  // =========================================================================
  const outerPolyGeo = new THREE.DodecahedronGeometry(11, 0);
  const outerPolyMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    wireframe: true,
    transparent: true,
    opacity: 0.28
  });
  const outerPolyMesh = new THREE.Mesh(outerPolyGeo, outerPolyMat);
  quantumGroup.add(outerPolyMesh);

  const innerPolyGeo = new THREE.IcosahedronGeometry(7.2, 1);
  const innerPolyMat = new THREE.MeshBasicMaterial({
    color: 0x00f5a0,
    wireframe: true,
    transparent: true,
    opacity: 0.45
  });
  const innerPolyMesh = new THREE.Mesh(innerPolyGeo, innerPolyMat);
  quantumGroup.add(innerPolyMesh);

  // Quantum Orbit Rings
  function createGimbalRing(radius, color, rotX, rotY) {
    const ringGeo = new THREE.RingGeometry(radius, radius + 0.12, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: color,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = rotX;
    ringMesh.rotation.y = rotY;
    return ringMesh;
  }

  const ring1 = createGimbalRing(13.5, 0x00f5a0, Math.PI / 3, 0);
  const ring2 = createGimbalRing(14.8, 0x38bdf8, -Math.PI / 4, Math.PI / 6);
  const ring3 = createGimbalRing(16.0, 0xff9e2c, Math.PI / 2, Math.PI / 4);
  quantumGroup.add(ring1);
  quantumGroup.add(ring2);
  quantumGroup.add(ring3);

  // Quantum floating node points
  const quantumNodeCount = isMobile ? 800 : 1600;
  const quantumGeo = new THREE.BufferGeometry();
  const quantumPositions = new Float32Array(quantumNodeCount * 3);
  const quantumColors = new Float32Array(quantumNodeCount * 3);

  for (let i = 0; i < quantumNodeCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    const r = 11 + (Math.random() - 0.5) * 6;

    quantumPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    quantumPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    quantumPositions[i * 3 + 2] = r * Math.cos(phi);

    const c = Math.random() > 0.5 ? colorEmerald : colorCyan;
    quantumColors[i * 3] = c.r;
    quantumColors[i * 3 + 1] = c.g;
    quantumColors[i * 3 + 2] = c.b;
  }

  quantumGeo.setAttribute('position', new THREE.BufferAttribute(quantumPositions, 3));
  quantumGeo.setAttribute('color', new THREE.BufferAttribute(quantumColors, 3));

  const quantumParticles = new THREE.Points(quantumGeo, torusMat);
  quantumGroup.add(quantumParticles);

  // =========================================================================
  // 3. CYBER SYNAPSE SPHERE (Mode 3: Neural Constellation Sphere)
  // =========================================================================
  const synapseNodeCount = isMobile ? 140 : 260;
  const synapseRadius = 12.5;
  const synapseNodes = [];
  const synapsePositions = new Float32Array(synapseNodeCount * 3);
  const synapseColors = new Float32Array(synapseNodeCount * 3);

  for (let i = 0; i < synapseNodeCount; i++) {
    const phi = Math.acos(-1 + (2 * i) / synapseNodeCount);
    const theta = Math.sqrt(synapseNodeCount * Math.PI) * phi;

    const x = synapseRadius * Math.cos(theta) * Math.sin(phi);
    const y = synapseRadius * Math.sin(theta) * Math.sin(phi);
    const z = synapseRadius * Math.cos(phi);

    synapseNodes.push(new THREE.Vector3(x, y, z));
    synapsePositions[i * 3] = x;
    synapsePositions[i * 3 + 1] = y;
    synapsePositions[i * 3 + 2] = z;

    const sc = Math.random() > 0.4 ? colorEmerald : colorCyan;
    synapseColors[i * 3] = sc.r;
    synapseColors[i * 3 + 1] = sc.g;
    synapseColors[i * 3 + 2] = sc.b;
  }

  const synapsePointsGeo = new THREE.BufferGeometry();
  synapsePointsGeo.setAttribute('position', new THREE.BufferAttribute(synapsePositions, 3));
  synapsePointsGeo.setAttribute('color', new THREE.BufferAttribute(synapseColors, 3));

  const synapsePointsMat = new THREE.PointsMaterial({
    size: 1.1,
    map: particleTexture,
    vertexColors: true,
    transparent: true,
    opacity: 0.95,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const synapsePoints = new THREE.Points(synapsePointsGeo, synapsePointsMat);
  synapseGroup.add(synapsePoints);

  // Synapse Connecting Lines
  const linePositions = [];
  const lineColors = [];
  const maxLineDist = 4.8;

  for (let i = 0; i < synapseNodeCount; i++) {
    for (let j = i + 1; j < synapseNodeCount; j++) {
      const dist = synapseNodes[i].distanceTo(synapseNodes[j]);
      if (dist < maxLineDist) {
        linePositions.push(
          synapseNodes[i].x, synapseNodes[i].y, synapseNodes[i].z,
          synapseNodes[j].x, synapseNodes[j].y, synapseNodes[j].z
        );
        lineColors.push(0, 0.96, 0.62, 0.22, 0.74, 0.97);
      }
    }
  }

  const synapseLineGeo = new THREE.BufferGeometry();
  synapseLineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
  const synapseLineMat = new THREE.LineBasicMaterial({
    color: 0x00f5a0,
    transparent: true,
    opacity: 0.25,
    blending: THREE.AdditiveBlending
  });
  const synapseLines = new THREE.LineSegments(synapseLineGeo, synapseLineMat);
  synapseGroup.add(synapseLines);

  // =========================================================================
  // AMBIENT BACKGROUND STARS
  // =========================================================================
  const bgCount = 240;
  const bgGeometry = new THREE.BufferGeometry();
  const bgPositions = new Float32Array(bgCount * 3);

  for (let i = 0; i < bgCount; i++) {
    bgPositions[i * 3] = (Math.random() - 0.5) * 90;
    bgPositions[i * 3 + 1] = (Math.random() - 0.5) * 70;
    bgPositions[i * 3 + 2] = (Math.random() - 0.5) * 50 - 15;
  }

  bgGeometry.setAttribute('position', new THREE.BufferAttribute(bgPositions, 3));
  const bgMaterial = new THREE.PointsMaterial({
    size: 0.45,
    color: 0x00f5a0,
    transparent: true,
    opacity: 0.4,
    blending: THREE.AdditiveBlending
  });
  const bgParticles = new THREE.Points(bgGeometry, bgMaterial);
  scene.add(bgParticles);

  // =========================================================================
  // INTERACTIVITY: DRAG TO ROTATE, MOMENTUM & SHOCKWAVE
  // =========================================================================
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };
  let rotationVelocity = { x: 0, y: 0 };
  let autoRotate = true;
  let currentMode = 'neural-torus';
  let wireframeMode = false;

  let shockwaves = [];

  function onPointerDown(e) {
    // Only drag if left click or touch
    if (e.button !== undefined && e.button !== 0) return;
    isDragging = true;
    previousMousePosition = { x: e.clientX, y: e.clientY };
    rotationVelocity = { x: 0, y: 0 };
  }

  function onPointerMove(e) {
    if (!isDragging) return;

    const deltaX = e.clientX - previousMousePosition.x;
    const deltaY = e.clientY - previousMousePosition.y;

    rotationVelocity.y = deltaX * 0.005;
    rotationVelocity.x = deltaY * 0.005;

    mainGroup.rotation.y += rotationVelocity.y;
    mainGroup.rotation.x += rotationVelocity.x;

    previousMousePosition = { x: e.clientX, y: e.clientY };
  }

  function onPointerUp(e) {
    if (!isDragging) return;
    isDragging = false;
  }

  // Shockwave blast on click
  function triggerShockwave(e) {
    // Check if clicked element is an interactive button/link
    if (e.target.closest('a, button, input, .btn, .hud-btn')) return;

    const rect = container.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const clickY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    shockwaves.push({
      time: 0,
      maxRadius: 28,
      speed: 38,
      strength: 1.4,
      origin: new THREE.Vector3(clickX * 12, clickY * 12, 0)
    });

    if (window.cyberAudio) {
      window.cyberAudio.playShockwave();
    }
  }

  window.addEventListener('mousedown', onPointerDown);
  window.addEventListener('mousemove', onPointerMove, { passive: true });
  window.addEventListener('mouseup', onPointerUp);

  window.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) onPointerDown(e.touches[0]);
  }, { passive: true });
  window.addEventListener('touchmove', (e) => {
    if (e.touches.length === 1) onPointerMove(e.touches[0]);
  }, { passive: true });
  window.addEventListener('touchend', onPointerUp, { passive: true });

  container.addEventListener('click', triggerShockwave);

  // Resize handler
  function onWindowResize() {
    if (!container) return;
    const w = container.clientWidth || window.innerWidth;
    const h = container.clientHeight || window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }
  window.addEventListener('resize', onWindowResize, { passive: true });

  // IntersectionObserver performance pause - completely halts rAF when off-screen
  let isVisible = true;
  let animId = null;

  function startAnimation() {
    if (!animId) {
      clock.start();
      animate();
    }
  }

  function stopAnimation() {
    if (animId) {
      cancelAnimationFrame(animId);
      animId = null;
    }
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      isVisible = entry.isIntersecting;
      if (isVisible) {
        startAnimation();
      } else {
        stopAnimation();
      }
    });
  }, { threshold: 0.05 });
  observer.observe(container);

  // =========================================================================
  // HUD CONTROLS INTEGRATION & PUBLIC API
  // =========================================================================
  window.threeHoloAPI = {
    setMode: (mode) => {
      currentMode = mode;
      torusGroup.visible = (mode === 'neural-torus');
      quantumGroup.visible = (mode === 'quantum-core');
      synapseGroup.visible = (mode === 'cyber-sphere');

      if (window.cyberAudio) window.cyberAudio.playModeSwitch();
      
      const modeLabel = document.getElementById('hud-active-mode-label');
      if (modeLabel) {
        modeLabel.textContent = mode.replace('-', ' ').toUpperCase();
      }
    },
    toggleAutoRotate: () => {
      autoRotate = !autoRotate;
      if (window.cyberAudio) window.cyberAudio.playClick();
      return autoRotate;
    },
    toggleWireframe: () => {
      wireframeMode = !wireframeMode;
      coreMaterial.wireframe = true;
      coreMaterial.opacity = wireframeMode ? 0.6 : 0.22;
      outerPolyMat.opacity = wireframeMode ? 0.6 : 0.28;
      innerPolyMat.opacity = wireframeMode ? 0.8 : 0.45;
      if (window.cyberAudio) window.cyberAudio.playClick();
      return wireframeMode;
    },
    triggerShockwaveManual: () => {
      shockwaves.push({
        time: 0,
        maxRadius: 30,
        speed: 40,
        strength: 1.8,
        origin: new THREE.Vector3(0, 0, 0)
      });
      if (window.cyberAudio) window.cyberAudio.playShockwave();
    }
  };

  // Attach HUD Event Listeners once DOM is ready
  function attachHUDListeners() {
    const hudButtons = document.querySelectorAll('[data-holo-mode]');
    hudButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const mode = btn.getAttribute('data-holo-mode');
        window.threeHoloAPI.setMode(mode);

        hudButtons.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
      });
    });

    const spinToggleBtn = document.getElementById('hud-spin-toggle');
    if (spinToggleBtn) {
      spinToggleBtn.addEventListener('click', () => {
        const active = window.threeHoloAPI.toggleAutoRotate();
        spinToggleBtn.classList.toggle('is-active', active);
        spinToggleBtn.setAttribute('title', active ? 'Pause 3D Rotation' : 'Resume 3D Rotation');
      });
    }

    const shockwaveBtn = document.getElementById('hud-pulse-toggle');
    if (shockwaveBtn) {
      shockwaveBtn.addEventListener('click', () => {
        window.threeHoloAPI.triggerShockwaveManual();
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachHUDListeners);
  } else {
    attachHUDListeners();
  }

  // =========================================================================
  // ANIMATION LOOP & PARTICLE PHYSICS
  // =========================================================================
  let clock = new THREE.Clock();
  let frameCount = 0;
  let lastFpsUpdate = 0;
  const fpsDisplay = document.getElementById('hud-telemetry-fps');

  function animate() {
    if (!isVisible) {
      animId = null;
      return;
    }
    animId = requestAnimationFrame(animate);

    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();

    // FPS Telemetry
    frameCount++;
    if (elapsedTime - lastFpsUpdate > 0.5) {
      const currentFps = Math.round(frameCount / (elapsedTime - lastFpsUpdate));
      if (fpsDisplay) fpsDisplay.textContent = `${currentFps} FPS`;
      frameCount = 0;
      lastFpsUpdate = elapsedTime;
    }

    // Inertial Damping
    if (!isDragging) {
      mainGroup.rotation.y += rotationVelocity.y;
      mainGroup.rotation.x += rotationVelocity.x;
      rotationVelocity.x *= 0.94;
      rotationVelocity.y *= 0.94;

      if (autoRotate) {
        mainGroup.rotation.y += 0.003;
      }
    }

    // 1. NEURAL TORUS ANIMATION & SHOCKWAVE PHYSICS
    if (currentMode === 'neural-torus') {
      const pos = torusGeo.attributes.position.array;

      for (let s = shockwaves.length - 1; s >= 0; s--) {
        const sw = shockwaves[s];
        sw.time += delta;
        const currentRadius = sw.time * sw.speed;

        if (currentRadius > sw.maxRadius) {
          shockwaves.splice(s, 1);
          continue;
        }

        const ringThickness = 3.5;
        for (let i = 0; i < torusParticleCount; i++) {
          const px = pos[i * 3];
          const py = pos[i * 3 + 1];
          const pz = pos[i * 3 + 2];

          const dist = Math.sqrt(
            Math.pow(px - sw.origin.x, 2) +
            Math.pow(py - sw.origin.y, 2) +
            Math.pow(pz - sw.origin.z, 2)
          );

          if (Math.abs(dist - currentRadius) < ringThickness) {
            const force = (1 - Math.abs(dist - currentRadius) / ringThickness) * sw.strength;
            const dirX = (px - sw.origin.x) / (dist || 1);
            const dirY = (py - sw.origin.y) / (dist || 1);
            const dirZ = (pz - sw.origin.z) / (dist || 1);

            pos[i * 3] += dirX * force;
            pos[i * 3 + 1] += dirY * force;
            pos[i * 3 + 2] += dirZ * force;
          }
        }
      }

      // Spring back to original position
      for (let i = 0; i < torusParticleCount; i++) {
        const ox = torusOriginalPositions[i * 3];
        const oy = torusOriginalPositions[i * 3 + 1];
        const oz = torusOriginalPositions[i * 3 + 2];

        // Elastic recovery
        pos[i * 3] += (ox - pos[i * 3]) * 0.05;
        pos[i * 3 + 1] += (oy - pos[i * 3 + 1]) * 0.05;
        pos[i * 3 + 2] += (oz - pos[i * 3 + 2]) * 0.05;
      }
      torusGeo.attributes.position.needsUpdate = true;

      // Pulse Core
      coreMesh.rotation.x = -elapsedTime * 0.18;
      coreMesh.rotation.y = -elapsedTime * 0.25;
      const scale = 1 + Math.sin(elapsedTime * 2.0) * 0.08;
      coreMesh.scale.set(scale, scale, scale);
    }

    // 2. QUANTUM CORE ANIMATION
    if (currentMode === 'quantum-core') {
      outerPolyMesh.rotation.x = elapsedTime * 0.15;
      outerPolyMesh.rotation.y = elapsedTime * 0.22;

      innerPolyMesh.rotation.x = -elapsedTime * 0.3;
      innerPolyMesh.rotation.z = elapsedTime * 0.25;

      ring1.rotation.z = elapsedTime * 0.4;
      ring2.rotation.z = -elapsedTime * 0.35;
      ring3.rotation.z = elapsedTime * 0.25;

      quantumParticles.rotation.y = -elapsedTime * 0.08;
    }

    // 3. CYBER SYNAPSE SPHERE ANIMATION
    if (currentMode === 'cyber-sphere') {
      synapseGroup.rotation.y = elapsedTime * 0.12;
      synapseGroup.rotation.x = Math.sin(elapsedTime * 0.2) * 0.1;
    }

    // Background Drift
    bgParticles.rotation.y = elapsedTime * 0.015;

    renderer.render(scene, camera);
  }

  startAnimation();
})();
