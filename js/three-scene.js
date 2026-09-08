/**
 * Three.js Neural Tensor Lattice - Aditya Sharma Portfolio
 * Features:
 * - Real-time GPU particle lattice & neural core
 * - Custom canvas-generated glow sprite (zero external asset latency)
 * - Mouse parallax with spring dampening
 * - Performance auto-scaling: pauses when scrolled out of viewport
 * - High-DPI support with DPR capping
 */

(function initThreeScene() {
  const container = document.getElementById('hero-3d-canvas-container');
  if (!container) return;

  const width = container.clientWidth || window.innerWidth;
  const height = container.clientHeight || window.innerHeight;

  // Scene setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    60,
    width / height,
    0.1,
    1000
  );
  camera.position.z = 32;

  // Renderer setup
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Generate smooth radial circular glow particle texture procedurally
  function createParticleTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.2, 'rgba(0, 245, 160, 0.9)');
    gradient.addColorStop(0.6, 'rgba(0, 245, 160, 0.25)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }

  const particleTexture = createParticleTexture();

  // 1. Primary Neural Torus Lattice
  const isMobile = window.innerWidth < 768;
  const particleCount = isMobile ? 1200 : 2600;

  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const scales = new Float32Array(particleCount);

  // Torus Knot math for generative algorithmic cloud
  const p = 3;
  const q = 4;
  const radius = 11;
  const tube = 4.2;

  const colorEmerald = new THREE.Color('#00f5a0');
  const colorCyan = new THREE.Color('#38bdf8');
  const colorWhite = new THREE.Color('#ffffff');

  for (let i = 0; i < particleCount; i++) {
    const u = (i / particleCount) * Math.PI * 2 * p;
    const cu = Math.cos(u);
    const su = Math.sin(u);
    const quOverP = (q / p) * u;
    const cqu = Math.cos(quOverP);
    const squ = Math.sin(quOverP);

    // Torus knot core position
    const x0 = (radius + tube * cqu) * cu;
    const y0 = (radius + tube * cqu) * su;
    const z0 = tube * squ;

    // Add controlled stochastic volumetric dispersion
    const spread = (Math.random() - 0.5) * 4.5;
    const spreadY = (Math.random() - 0.5) * 4.5;
    const spreadZ = (Math.random() - 0.5) * 4.5;

    positions[i * 3] = x0 + spread;
    positions[i * 3 + 1] = y0 + spreadY;
    positions[i * 3 + 2] = z0 + spreadZ;

    // Gradient between emerald, cyan and white
    const mixRatio = Math.random();
    let particleColor;
    if (mixRatio < 0.65) {
      particleColor = colorEmerald.clone().lerp(colorCyan, Math.random() * 0.5);
    } else if (mixRatio < 0.9) {
      particleColor = colorCyan.clone();
    } else {
      particleColor = colorWhite.clone();
    }

    colors[i * 3] = particleColor.r;
    colors[i * 3 + 1] = particleColor.g;
    colors[i * 3 + 2] = particleColor.b;

    scales[i] = Math.random() * 1.5 + 0.5;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: isMobile ? 0.7 : 0.85,
    map: particleTexture,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const particleSystem = new THREE.Points(geometry, material);
  scene.add(particleSystem);

  // 2. Inner Glowing Geometric Core (GPU Tensor Polyhedron)
  const coreGeometry = new THREE.IcosahedronGeometry(5.5, 1);
  const coreMaterial = new THREE.MeshBasicMaterial({
    color: 0x00f5a0,
    wireframe: true,
    transparent: true,
    opacity: 0.18
  });
  const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
  scene.add(coreMesh);

  // 3. Ambient floating nodes in deep background
  const bgCount = 200;
  const bgGeometry = new THREE.BufferGeometry();
  const bgPositions = new Float32Array(bgCount * 3);

  for (let i = 0; i < bgCount; i++) {
    bgPositions[i * 3] = (Math.random() - 0.5) * 80;
    bgPositions[i * 3 + 1] = (Math.random() - 0.5) * 60;
    bgPositions[i * 3 + 2] = (Math.random() - 0.5) * 40 - 15;
  }

  bgGeometry.setAttribute('position', new THREE.BufferAttribute(bgPositions, 3));
  const bgMaterial = new THREE.PointsMaterial({
    size: 0.5,
    color: 0x00f5a0,
    transparent: true,
    opacity: 0.35,
    blending: THREE.AdditiveBlending
  });
  const bgParticles = new THREE.Points(bgGeometry, bgMaterial);
  scene.add(bgParticles);

  // Mouse interaction state with inertial dampening
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  const windowHalfX = window.innerWidth / 2;
  const windowHalfY = window.innerHeight / 2;

  function onPointerMove(event) {
    targetX = (event.clientX - windowHalfX) * 0.0012;
    targetY = (event.clientY - windowHalfY) * 0.0012;
  }

  window.addEventListener('pointermove', onPointerMove, { passive: true });

  // Responsive resize
  function onWindowResize() {
    if (!container) return;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  window.addEventListener('resize', onWindowResize);

  // Performance optimization: Pause render loop when scrolled past hero
  let isVisible = true;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      isVisible = entry.isIntersecting;
    });
  }, { threshold: 0.05 });

  observer.observe(container);

  // Animation Loop
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    if (!isVisible) return; // Skip compute when outside viewport

    const elapsedTime = clock.getElapsedTime();

    // Lerp mouse coordinates for fluid spring inertia
    mouseX += (targetX - mouseX) * 0.05;
    mouseY += (targetY - mouseY) * 0.05;

    // Rotate main particle system
    particleSystem.rotation.x = elapsedTime * 0.12 + mouseY * 1.2;
    particleSystem.rotation.y = elapsedTime * 0.18 + mouseX * 1.5;

    // Pulse core
    coreMesh.rotation.x = -elapsedTime * 0.15;
    coreMesh.rotation.y = -elapsedTime * 0.22;
    const scale = 1 + Math.sin(elapsedTime * 1.5) * 0.06;
    coreMesh.scale.set(scale, scale, scale);

    // Subtle drift for ambient points
    bgParticles.rotation.y = elapsedTime * 0.02;

    renderer.render(scene, camera);
  }

  animate();
})();
