import * as React from "react";

export type VisualizerMode = "synapse" | "tensor" | "vortex";

interface Point3D {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  size: number;
  color: string;
  alpha: number;
}

interface Connection {
  a: number;
  b: number;
  distance: number;
}

interface SignalPulse {
  connectionIdx: number;
  progress: number;
  speed: number;
  color: string;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  force: number;
  alpha: number;
}

export interface NeuralCoreCanvasRef {
  triggerShockwave: () => void;
}

interface NeuralCoreCanvasProps {
  mode: VisualizerMode;
  className?: string;
  onFpsUpdate?: (fps: number) => void;
  interactive?: boolean;
}

export const NeuralCoreCanvas = React.forwardRef<
  NeuralCoreCanvasRef,
  NeuralCoreCanvasProps
>(({ mode, className = "", onFpsUpdate, interactive = true }, ref) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const animationFrameId = React.useRef<number>(0);

  // Interaction & Rotation state
  const isDragging = React.useRef(false);
  const lastMousePos = React.useRef({ x: 0, y: 0 });
  const targetRotation = React.useRef({ x: 0.2, y: 0.4 });
  const currentRotation = React.useRef({ x: 0.2, y: 0.4 });
  const autoRotateSpeed = React.useRef(0.003);
  const mousePos = React.useRef({ x: 0, y: 0 });
  const isHovered = React.useRef(false);

  // Entities
  const points = React.useRef<Point3D[]>([]);
  const connections = React.useRef<Connection[]>([]);
  const pulses = React.useRef<SignalPulse[]>([]);
  const shockwaves = React.useRef<Shockwave[]>([]);

  // FPS tracking
  const frameCount = React.useRef(0);
  const lastFpsCheck = React.useRef(performance.now());

  // Expose trigger shockwave via ref
  const triggerShockwaveAt = React.useCallback((screenX?: number, screenY?: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = screenX !== undefined ? screenX - rect.left : rect.width / 2;
    const y = screenY !== undefined ? screenY - rect.top : rect.height / 2;

    shockwaves.current.push({
      x,
      y,
      radius: 0,
      maxRadius: Math.max(rect.width, rect.height) * 0.75,
      force: 18,
      alpha: 1,
    });
  }, []);

  React.useImperativeHandle(ref, () => ({
    triggerShockwave: () => triggerShockwaveAt(),
  }));

  // Initialize geometries based on active mode
  const initModeGeometry = React.useCallback(
    (currentMode: VisualizerMode, width: number, height: number) => {
      const pts: Point3D[] = [];
      const conns: Connection[] = [];
      const scaleBase = Math.min(width, height) * 0.32;

      if (currentMode === "synapse") {
        // Neural Synapse: Interconnected graph of neural clusters
        const nodeCount = width < 640 ? 75 : 120;
        const clusterCenters = [
          { x: 0, y: 0, z: 0 },
          { x: scaleBase * 0.7, y: scaleBase * 0.3, z: scaleBase * 0.4 },
          { x: -scaleBase * 0.7, y: -scaleBase * 0.2, z: -scaleBase * 0.3 },
          { x: scaleBase * 0.2, y: -scaleBase * 0.7, z: scaleBase * 0.5 },
          { x: -scaleBase * 0.3, y: scaleBase * 0.6, z: -scaleBase * 0.5 },
        ];

        for (let i = 0; i < nodeCount; i++) {
          const cluster = clusterCenters[i % clusterCenters.length];
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(Math.random() * 2 - 1);
          const r = Math.random() * (scaleBase * 0.65);

          const x = cluster.x + r * Math.sin(phi) * Math.cos(theta);
          const y = cluster.y + r * Math.sin(phi) * Math.sin(theta);
          const z = cluster.z + r * Math.cos(phi);

          pts.push({
            x,
            y,
            z,
            vx: 0,
            vy: 0,
            vz: 0,
            baseX: x,
            baseY: y,
            baseZ: z,
            size: Math.random() * 2.5 + 2,
            color: i % 4 === 0 ? "#ffffff" : i % 3 === 0 ? "#38bdf8" : "#a1a1aa",
            alpha: Math.random() * 0.5 + 0.5,
          });
        }

        // Build proximity connections
        const maxDist = scaleBase * 0.55;
        for (let i = 0; i < pts.length; i++) {
          for (let j = i + 1; j < pts.length; j++) {
            const dx = pts[i].x - pts[j].x;
            const dy = pts[i].y - pts[j].y;
            const dz = pts[i].z - pts[j].z;
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
            if (dist < maxDist && Math.random() > 0.35) {
              conns.push({ a: i, b: j, distance: dist });
            }
          }
        }
      } else if (currentMode === "tensor") {
        // CUDA Tensor Core: 3D regular matrix lattice with compute nodes
        const gridSize = width < 640 ? 4 : 5;
        const step = (scaleBase * 1.8) / (gridSize - 1);
        const offset = (scaleBase * 1.8) / 2;

        for (let ix = 0; ix < gridSize; ix++) {
          for (let iy = 0; iy < gridSize; iy++) {
            for (let iz = 0; iz < gridSize; iz++) {
              // Create sparse hollow cube tensor grid for aesthetics
              const isOuter =
                ix === 0 ||
                ix === gridSize - 1 ||
                iy === 0 ||
                iy === gridSize - 1 ||
                iz === 0 ||
                iz === gridSize - 1;

              if (isOuter || Math.random() > 0.6) {
                const x = ix * step - offset;
                const y = iy * step - offset;
                const z = iz * step - offset;

                pts.push({
                  x,
                  y,
                  z,
                  vx: 0,
                  vy: 0,
                  vz: 0,
                  baseX: x,
                  baseY: y,
                  baseZ: z,
                  size: (ix + iy + iz) % 3 === 0 ? 3.5 : 2,
                  color: (ix + iy) % 2 === 0 ? "#ffffff" : "#60a5fa",
                  alpha: 0.8,
                });
              }
            }
          }
        }

        // Connect lattice along adjacent axes
        for (let i = 0; i < pts.length; i++) {
          for (let j = i + 1; j < pts.length; j++) {
            const dx = Math.abs(pts[i].x - pts[j].x);
            const dy = Math.abs(pts[i].y - pts[j].y);
            const dz = Math.abs(pts[i].z - pts[j].z);
            const isNeighbor =
              (Math.abs(dx - step) < 5 && dy < 5 && dz < 5) ||
              (dx < 5 && Math.abs(dy - step) < 5 && dz < 5) ||
              (dx < 5 && dy < 5 && Math.abs(dz - step) < 5);
            if (isNeighbor) {
              conns.push({
                a: i,
                b: j,
                distance: step,
              });
            }
          }
        }
      } else {
        // Quantum Particle Vortex / Torus Swarm
        const count = width < 640 ? 200 : 380;
        const majorR = scaleBase * 0.9;
        const minorR = scaleBase * 0.35;

        for (let i = 0; i < count; i++) {
          const u = Math.random() * Math.PI * 2;
          const v = Math.random() * Math.PI * 2;
          const r = majorR + minorR * Math.cos(v);
          const x = r * Math.cos(u);
          const y = r * Math.sin(u);
          const z = minorR * Math.sin(v);

          pts.push({
            x,
            y,
            z,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            vz: (Math.random() - 0.5) * 0.3,
            baseX: x,
            baseY: y,
            baseZ: z,
            size: Math.random() * 2.8 + 1.2,
            color: Math.random() > 0.5 ? "#ffffff" : "#38bdf8",
            alpha: Math.random() * 0.7 + 0.3,
          });
        }
      }

      points.current = pts;
      connections.current = conns;
      pulses.current = [];

      // Seed signal pulses for connections
      if (conns.length > 0) {
        for (let p = 0; p < Math.min(24, conns.length); p++) {
          pulses.current.push({
            connectionIdx: Math.floor(Math.random() * conns.length),
            progress: Math.random(),
            speed: 0.006 + Math.random() * 0.012,
            color: Math.random() > 0.4 ? "#ffffff" : "#38bdf8",
          });
        }
      }
    },
    []
  );

  // Setup canvas & animation loop
  React.useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = container.clientHeight);

    const handleResize = () => {
      if (!container || !canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      initModeGeometry(mode, width, height);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const fov = 400;

    const render = () => {
      // FPS measurement
      frameCount.current++;
      const now = performance.now();
      if (now - lastFpsCheck.current >= 1000) {
        const fps = Math.round((frameCount.current * 1000) / (now - lastFpsCheck.current));
        onFpsUpdate?.(fps);
        frameCount.current = 0;
        lastFpsCheck.current = now;
      }

      // Smooth auto-rotation and damping
      if (!isDragging.current) {
        targetRotation.current.y += autoRotateSpeed.current;
      }
      currentRotation.current.x +=
        (targetRotation.current.x - currentRotation.current.x) * 0.08;
      currentRotation.current.y +=
        (targetRotation.current.y - currentRotation.current.y) * 0.08;

      const cosX = Math.cos(currentRotation.current.x);
      const sinX = Math.sin(currentRotation.current.x);
      const cosY = Math.cos(currentRotation.current.y);
      const sinY = Math.sin(currentRotation.current.y);

      const cx = width / 2;
      const cy = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Process shockwaves
      for (let s = shockwaves.current.length - 1; s >= 0; s--) {
        const sw = shockwaves.current[s];
        sw.radius += 12;
        sw.alpha = Math.max(0, 1 - sw.radius / sw.maxRadius);

        // Draw visual shockwave wave
        ctx.save();
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${sw.alpha * 0.35})`;
        ctx.lineWidth = 2.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(sw.x, sw.y, Math.max(0, sw.radius - 8), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(56, 189, 248, ${sw.alpha * 0.25})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();

        if (sw.radius >= sw.maxRadius) {
          shockwaves.current.splice(s, 1);
        }
      }

      const pts = points.current;
      const conns = connections.current;
      const projected: Array<{ sx: number; sy: number; scale: number; alpha: number }> =
        new Array(pts.length);

      // 3D transformation & physics update
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];

        // Mode specific internal dynamics
        if (mode === "vortex") {
          // Swirling motion
          const speed = 0.008;
          const x0 = p.baseX * Math.cos(speed) - p.baseY * Math.sin(speed);
          const y0 = p.baseX * Math.sin(speed) + p.baseY * Math.cos(speed);
          p.baseX = x0;
          p.baseY = y0;
        }

        // Spring return towards base position
        p.vx += (p.baseX - p.x) * 0.04;
        p.vy += (p.baseY - p.y) * 0.04;
        p.vz += (p.baseZ - p.z) * 0.04;

        // Friction
        p.vx *= 0.88;
        p.vy *= 0.88;
        p.vz *= 0.88;

        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        // Apply 3D rotation
        // Y-axis rotation
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.z * cosY + p.x * sinY;
        // X-axis rotation
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + p.y * sinX;

        // Perspective Projection
        const scale = fov / (fov + z2 + 180);
        const sx = cx + x1 * scale;
        const sy = cy + y2 * scale;

        // Shockwave displacement in screen coordinates
        for (const sw of shockwaves.current) {
          const dx = sx - sw.x;
          const dy = sy - sw.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 0 && Math.abs(dist - sw.radius) < 35) {
            const push = (1 - Math.abs(dist - sw.radius) / 35) * sw.force * 1.5;
            p.vx += (dx / dist) * push;
            p.vy += (dy / dist) * push;
            p.vz += (Math.random() - 0.5) * push * 2;
          }
        }

        // Mouse hover interactive gravity/repulsion
        if (isHovered.current && interactive) {
          const dx = sx - mousePos.current.x;
          const dy = sy - mousePos.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110 && dist > 0) {
            const force = (1 - dist / 110) * 2.2;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        projected[i] = {
          sx,
          sy,
          scale,
          alpha: Math.max(0.15, Math.min(1, scale * 1.1)),
        };
      }

      // Draw Connections & Synaptic Pulses
      if (conns.length > 0) {
        ctx.save();
        for (let c = 0; c < conns.length; c++) {
          const conn = conns[c];
          const pA = projected[conn.a];
          const pB = projected[conn.b];
          if (!pA || !pB) continue;

          const edgeAlpha = Math.min(pA.alpha, pB.alpha) * 0.18;
          ctx.beginPath();
          ctx.moveTo(pA.sx, pA.sy);
          ctx.lineTo(pB.sx, pB.sy);
          ctx.strokeStyle = `rgba(255, 255, 255, ${edgeAlpha})`;
          ctx.lineWidth = Math.min(pA.scale, pB.scale) * 1.2;
          ctx.stroke();
        }

        // Draw animated synaptic pulses
        for (let i = 0; i < pulses.current.length; i++) {
          const pulse = pulses.current[i];
          pulse.progress += pulse.speed;
          if (pulse.progress > 1) {
            pulse.progress = 0;
            pulse.connectionIdx = Math.floor(Math.random() * conns.length);
          }

          const conn = conns[pulse.connectionIdx];
          if (!conn) continue;
          const pA = projected[conn.a];
          const pB = projected[conn.b];
          if (!pA || !pB) continue;

          const px = pA.sx + (pB.sx - pA.sx) * pulse.progress;
          const py = pA.sy + (pB.sy - pA.sy) * pulse.progress;
          const pScale = pA.scale + (pB.scale - pA.scale) * pulse.progress;

          ctx.beginPath();
          ctx.arc(px, py, 2.2 * pScale, 0, Math.PI * 2);
          ctx.fillStyle = pulse.color;
          ctx.shadowColor = pulse.color;
          ctx.shadowBlur = 8;
          ctx.fill();
        }
        ctx.restore();
      }

      // Draw Nodes / Particles
      for (let i = 0; i < pts.length; i++) {
        const proj = projected[i];
        if (!proj) continue;
        const p = pts[i];
        const r = Math.max(0.8, p.size * proj.scale);

        ctx.save();
        ctx.beginPath();
        ctx.arc(proj.sx, proj.sy, r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = proj.alpha * p.alpha;

        // Subtle glow on brighter nodes
        if (p.size > 2.5) {
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 10 * proj.scale;
        }

        ctx.fill();
        ctx.restore();
      }

      animationFrameId.current = requestAnimationFrame(render);
    };

    animationFrameId.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [mode, initModeGeometry, onFpsUpdate, interactive]);

  // Pointer event handlers for drag rotation & shockwave clicks
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!interactive) return;
    isDragging.current = true;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      mousePos.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      isHovered.current = true;
    }

    if (isDragging.current) {
      const dx = e.clientX - lastMousePos.current.x;
      const dy = e.clientY - lastMousePos.current.y;
      targetRotation.current.y += dx * 0.007;
      targetRotation.current.x = Math.max(
        -Math.PI / 2.5,
        Math.min(Math.PI / 2.5, targetRotation.current.x - dy * 0.007)
      );
      lastMousePos.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isDragging.current) {
      isDragging.current = false;
      try {
        (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
      } catch {
        // Safe catch
      }
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!interactive) return;
    triggerShockwaveAt(e.clientX, e.clientY);
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden select-none ${className}`}
    >
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={() => {
          isHovered.current = false;
          isDragging.current = false;
        }}
        onClick={handleClick}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none block"
      />
    </div>
  );
});

NeuralCoreCanvas.displayName = "NeuralCoreCanvas";
export default NeuralCoreCanvas;
