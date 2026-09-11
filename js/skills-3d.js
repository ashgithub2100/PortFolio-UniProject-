/**
 * Interactive 3D Skill Constellation - Aditya Sharma Portfolio
 * Features:
 * - 3D Spherical Node Cluster with Perspective Projection
 * - Click & Drag 3D Rotational Inertia
 * - Dynamic Node Highlighting & Synapse Thread Illumination
 * - Live Holographic Skill Telemetry Inspector
 */

(function init3DSkillConstellation() {
  const container = document.getElementById('skills-3d-container');
  if (!container) return;

  const canvas = document.createElement('canvas');
  canvas.className = 'skills-3d-canvas';
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let width, height, centerX, centerY;

  const skillsData = [
    { name: 'Python', level: '95%', cat: 'Core', desc: 'Primary development language for ML, scripting & APIs', connections: [1, 2, 3, 4, 5] },
    { name: 'CUDA', level: 'Learning', cat: 'GPU', desc: 'GPU parallel computing, kernel optimization & thread hierarchies', connections: [0, 8] },
    { name: 'PyTorch', level: 'Learning', cat: 'Deep Learning', desc: 'Tensor computation, neural network backprop & model building', connections: [0, 1, 3] },
    { name: 'Scikit-learn', level: '88%', cat: 'ML', desc: 'Supervised/unsupervised algorithms, matrix similarity & evaluation', connections: [0, 4] },
    { name: 'LLM APIs', level: '92%', cat: 'AI', desc: 'OpenAI, Anthropic Claude, structured JSON outputs & embeddings', connections: [0, 9] },
    { name: 'Pandas', level: '90%', cat: 'Data', desc: 'Data cleaning, feature engineering & vectorized operations', connections: [0, 3] },
    { name: 'Git & GitHub', level: '90%', cat: 'Workflow', desc: 'Branch workflows, rebasing, code reviews & release tags', connections: [0, 7] },
    { name: 'Linux / Bash', level: '85%', cat: 'Systems', desc: 'POSIX shell navigation, environment variables & process automation', connections: [0, 6, 8] },
    { name: 'C / C++', level: '80%', cat: 'Systems', desc: 'Memory pointers, algorithmic structures & academic foundations', connections: [1, 7] },
    { name: 'Prompt Eng.', level: '95%', cat: 'AI', desc: 'Few-shot patterns, chain-of-thought & system prompt guardrails', connections: [4] }
  ];

  let nodes = [];
  const sphereRadius = 140;

  function initNodes() {
    nodes = [];
    const count = skillsData.length;
    for (let i = 0; i < count; i++) {
      // Golden spiral distribution on sphere
      const phi = Math.acos(-1 + (2 * i + 1) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;

      const x = sphereRadius * Math.cos(theta) * Math.sin(phi);
      const y = sphereRadius * Math.sin(theta) * Math.sin(phi);
      const z = sphereRadius * Math.cos(phi);

      nodes.push({
        ...skillsData[i],
        x, y, z,
        origX: x, origY: y, origZ: z,
        projX: 0, projY: 0, scale: 1,
        hovered: false
      });
    }
  }

  function resize() {
    width = canvas.width = container.clientWidth || 600;
    height = canvas.height = container.clientHeight || 450;
    centerX = width / 2;
    centerY = height / 2;
  }
  resize();
  initNodes();
  window.addEventListener('resize', resize, { passive: true });

  // 3D Matrix Rotation variables
  let rotX = 0.002;
  let rotY = 0.003;
  let currentRotX = 0;
  let currentRotY = 0;
  let isDragging = false;
  let lastMouseX = 0;
  let lastMouseY = 0;
  let hoveredNode = null;

  function rotateX(node, angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const y = node.y * cos - node.z * sin;
    const z = node.z * cos + node.y * sin;
    node.y = y;
    node.z = z;
  }

  function rotateY(node, angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const x = node.x * cos + node.z * sin;
    const z = node.z * cos - node.x * sin;
    node.x = x;
    node.z = z;
  }

  // Pointer interaction
  canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
  });

  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (isDragging) {
      const deltaX = e.clientX - lastMouseX;
      const deltaY = e.clientY - lastMouseY;
      currentRotY = deltaX * 0.008;
      currentRotX = -deltaY * 0.008;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    } else if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
      // Hover detection
      let closest = null;
      let minDist = 24;

      nodes.forEach(node => {
        const dx = node.projX - mouseX;
        const dy = node.projY - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < minDist && node.z > -sphereRadius * 0.5) {
          closest = node;
          minDist = dist;
        }
      });

      if (closest !== hoveredNode) {
        hoveredNode = closest;
        if (hoveredNode && window.cyberAudio) {
          window.cyberAudio.playHover();
        }
        updateTelemetryCard(hoveredNode);
      }
    } else {
      if (hoveredNode) {
        hoveredNode = null;
        updateTelemetryCard(null);
      }
    }
  }, { passive: true });

  window.addEventListener('mouseup', () => { isDragging = false; });

  // Touch Support
  canvas.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      isDragging = true;
      lastMouseX = e.touches[0].clientX;
      lastMouseY = e.touches[0].clientY;
    }
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (isDragging && e.touches.length === 1) {
      const deltaX = e.touches[0].clientX - lastMouseX;
      const deltaY = e.touches[0].clientY - lastMouseY;
      currentRotY = deltaX * 0.008;
      currentRotX = -deltaY * 0.008;
      lastMouseX = e.touches[0].clientX;
      lastMouseY = e.touches[0].clientY;
    }
  }, { passive: true });

  window.addEventListener('touchend', () => { isDragging = false; });

  // Telemetry Card in UI
  function updateTelemetryCard(node) {
    const card = document.getElementById('skill-holo-card');
    if (!card) return;

    if (!node) {
      card.innerHTML = `
        <div class="skill-holo-empty">
          <span class="holo-scan-line"></span>
          <div class="holo-icon-placeholder">// 3D ARSENAL INSPECTOR</div>
          <p>Drag galaxy to rotate in 3D &bull; Hover any node to decode telemetry</p>
        </div>
      `;
      return;
    }

    card.innerHTML = `
      <div class="skill-holo-active">
        <div class="holo-header">
          <span class="tag-pill tag-emerald">${node.cat}</span>
          <span class="holo-stat-val">${node.level}</span>
        </div>
        <h4 class="holo-name">${node.name}</h4>
        <p class="holo-desc">${node.desc}</p>
        <div class="holo-synapse-info">
          <span>Connected Synapses:</span>
          <div class="holo-chips">
            ${node.connections.map(cIdx => `<span class="holo-chip">${skillsData[cIdx].name}</span>`).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // Animation Loop
  const fov = 320;
  let isVisible = true;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { isVisible = e.isIntersecting; });
  }, { threshold: 0.1 });
  observer.observe(container);

  function draw() {
    requestAnimationFrame(draw);
    if (!isVisible) return;

    ctx.clearRect(0, 0, width, height);

    // Apply rotation
    const angleX = isDragging ? currentRotX : rotX;
    const angleY = isDragging ? currentRotY : rotY;

    if (isDragging) {
      currentRotX *= 0.95;
      currentRotY *= 0.95;
    }

    nodes.forEach(node => {
      rotateX(node, angleX);
      rotateY(node, angleY);

      // Perspective projection
      const depth = fov + node.z;
      node.scale = fov / (depth || 1);
      node.projX = centerX + node.x * node.scale;
      node.projY = centerY + node.y * node.scale;
    });

    // Sort by Z for correct painter's order
    nodes.sort((a, b) => a.z - b.z);

    // Draw connection lines
    nodes.forEach(node => {
      node.connections.forEach(targetIdx => {
        const target = skillsData[targetIdx];
        const targetNode = nodes.find(n => n.name === target.name);
        if (!targetNode) return;

        const isHighlighted = (hoveredNode && (hoveredNode.name === node.name || hoveredNode.name === targetNode.name));
        const avgZ = (node.z + targetNode.z) / 2;
        const baseAlpha = (avgZ + sphereRadius) / (sphereRadius * 2);

        ctx.beginPath();
        ctx.moveTo(node.projX, node.projY);
        ctx.lineTo(targetNode.projX, targetNode.projY);

        if (isHighlighted) {
          ctx.strokeStyle = `rgba(0, 245, 160, ${Math.max(0.6, baseAlpha * 0.9)})`;
          ctx.lineWidth = 1.8;
          ctx.shadowBlur = 8;
          ctx.shadowColor = 'rgba(0, 245, 160, 0.7)';
        } else {
          ctx.strokeStyle = `rgba(56, 189, 248, ${Math.max(0.08, baseAlpha * 0.22)})`;
          ctx.lineWidth = 0.8;
          ctx.shadowBlur = 0;
        }
        ctx.stroke();
      });
    });

    // Draw nodes and labels
    nodes.forEach(node => {
      const isHovered = (hoveredNode && hoveredNode.name === node.name);
      const alpha = Math.max(0.2, (node.z + sphereRadius) / (sphereRadius * 2));
      const radius = isHovered ? 8 : (4.5 * node.scale);

      // Node Halo / Glow
      ctx.beginPath();
      ctx.arc(node.projX, node.projY, radius + (isHovered ? 6 : 2), 0, Math.PI * 2);
      ctx.fillStyle = isHovered ? 'rgba(0, 245, 160, 0.35)' : `rgba(0, 245, 160, ${alpha * 0.25})`;
      ctx.fill();

      // Node Core
      ctx.beginPath();
      ctx.arc(node.projX, node.projY, radius, 0, Math.PI * 2);
      ctx.fillStyle = isHovered ? '#ffffff' : (node.cat === 'GPU' ? '#ff9e2c' : '#00f5a0');
      ctx.shadowBlur = isHovered ? 15 : 6;
      ctx.shadowColor = isHovered ? '#00f5a0' : 'rgba(0, 245, 160, 0.5)';
      ctx.fill();
      ctx.shadowBlur = 0;

      // Label
      if (node.z > -sphereRadius * 0.35 || isHovered) {
        ctx.font = `${isHovered ? 'bold 12px' : '500 10.5px'} 'JetBrains Mono', monospace`;
        ctx.fillStyle = isHovered ? '#00f5a0' : `rgba(248, 250, 252, ${alpha * 0.95})`;
        ctx.textAlign = 'center';
        ctx.fillText(node.name, node.projX, node.projY + radius + 13);
      }
    });
  }

  draw();
  updateTelemetryCard(null);
})();
