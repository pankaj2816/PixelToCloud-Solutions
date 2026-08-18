/* ===================================================================
   PIXELTOCLOUD SOLUTIONS - 3D ARCHITECTURAL FOUNDER AVATAR ENGINES
   Pankaj (3D Quantum Silicon Chip) & Tushar (3D Polyhedral Code Prism)
   =================================================================== */

class FounderAvatarsEngine {
  constructor() {
    this.pankajCanvases = document.querySelectorAll('.pankaj-avatar-canvas');
    this.tusharCanvases = document.querySelectorAll('.tushar-avatar-canvas');
    this.animationId = null;
    this.rotPankajX = 0.35;
    this.rotPankajY = 0.45;
    this.rotTusharX = 0.4;
    this.rotTusharY = 0.4;

    this.init();
  }

  init() {
    this.bindHoverInteractions();
    this.startRenderLoop();
  }

  bindHoverInteractions() {
    // Pankaj Card Mouse Tracking
    document.querySelectorAll('.founder-card-wrap, .founder-image-container, .contact-avatar-box').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const nx = (e.clientX - rect.left) / rect.width - 0.5;
        const ny = (e.clientY - rect.top) / rect.height - 0.5;

        if (card.querySelector('.pankaj-avatar-canvas')) {
          this.rotPankajX = 0.35 + ny * 0.5;
          this.rotPankajY = 0.45 + nx * 0.8;
        }
        if (card.querySelector('.tushar-avatar-canvas')) {
          this.rotTusharX = 0.4 + ny * 0.6;
          this.rotTusharY = 0.4 + nx * 0.8;
        }
      });
    });
  }

  startRenderLoop() {
    let tick = 0;

    const render = () => {
      tick++;
      const time = tick * 0.02;

      // Draw all Pankaj Canvases
      this.pankajCanvases.forEach(canvas => {
        this.drawPankajSiliconCore(canvas, time);
      });

      // Draw all Tushar Canvases
      this.tusharCanvases.forEach(canvas => {
        this.drawTusharCodePrism(canvas, time);
      });

      this.animationId = requestAnimationFrame(render);
    };

    render();
  }

  // =================================================================
  // 1. PANKAJ: 3D QUANTUM SILICON CHIP & HARDWARE CIRCUIT CORE
  // =================================================================
  drawPankajSiliconCore(canvas, time) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;

    ctx.clearRect(0, 0, w, h);

    // Dark cyber backdrop with radial pulse
    const bgGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, w * 0.5);
    bgGrad.addColorStop(0, 'rgba(2, 132, 199, 0.25)');
    bgGrad.addColorStop(0.6, 'rgba(8, 11, 17, 0.95)');
    bgGrad.addColorStop(1, '#080b11');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Draw Outer Circuit Motherboard Grid Traces
    ctx.strokeStyle = 'rgba(2, 132, 199, 0.2)';
    ctx.lineWidth = 1;
    for (let i = -80; i <= 80; i += 20) {
      ctx.beginPath();
      ctx.moveTo(cx + i, 20);
      ctx.lineTo(cx + i, h - 20);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(20, cy + i);
      ctx.lineTo(w - 20, cy + i);
      ctx.stroke();
    }

    // 3D Isometric Chip Vertices (3 layers)
    const size = 64;
    const angleY = this.rotPankajY + Math.sin(time * 0.5) * 0.1;
    const angleX = this.rotPankajX;

    const project = (x, y, z) => {
      // Rotate around Y
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const x1 = x * cosY - z * sinY;
      const z1 = z * cosY + x * sinY;

      // Rotate around X
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const y2 = y * cosX - z1 * sinX;
      const z2 = z1 * cosX + y * sinX;

      const scale = 240 / (240 + z2);
      return {
        x: cx + x1 * scale,
        y: cy + y2 * scale
      };
    };

    // Draw Substrate Layer
    const subVerts = [
      project(-size, -8, -size),
      project(size, -8, -size),
      project(size, -8, size),
      project(-size, -8, size),
      project(-size, 8, -size),
      project(size, 8, -size),
      project(size, 8, size),
      project(-size, 8, size)
    ];

    // Chip Base
    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(subVerts[0].x, subVerts[0].y);
    ctx.lineTo(subVerts[1].x, subVerts[1].y);
    ctx.lineTo(subVerts[2].x, subVerts[2].y);
    ctx.lineTo(subVerts[3].x, subVerts[3].y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Golden Pin Connectors
    ctx.fillStyle = '#f59e0b';
    for (let p = -size + 12; p < size; p += 14) {
      const p1 = project(p, -8, -size);
      const p2 = project(p, -8, size);
      ctx.fillRect(p1.x - 2, p1.y - 2, 4, 4);
      ctx.fillRect(p2.x - 2, p2.y - 2, 4, 4);
    }

    // Glowing Silicon Die Top
    const dieSize = 42;
    const dieVerts = [
      project(-dieSize, -18, -dieSize),
      project(dieSize, -18, -dieSize),
      project(dieSize, -18, dieSize),
      project(-dieSize, -18, dieSize)
    ];

    const dieGrad = ctx.createLinearGradient(dieVerts[0].x, dieVerts[0].y, dieVerts[2].x, dieVerts[2].y);
    dieGrad.addColorStop(0, '#0284c7');
    dieGrad.addColorStop(0.5, '#38bdf8');
    dieGrad.addColorStop(1, '#0369a1');

    ctx.fillStyle = dieGrad;
    ctx.strokeStyle = '#38bdf8';
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 15;

    ctx.beginPath();
    ctx.moveTo(dieVerts[0].x, dieVerts[0].y);
    ctx.lineTo(dieVerts[1].x, dieVerts[1].y);
    ctx.lineTo(dieVerts[2].x, dieVerts[2].y);
    ctx.lineTo(dieVerts[3].x, dieVerts[3].y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Engraved Text on Silicon
    ctx.font = 'bold 11px Fira Code, monospace';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    const centerPoint = project(0, -18, 0);
    ctx.fillText('PANKAJ // ARCH', centerPoint.x, centerPoint.y - 2);

    ctx.font = '8px Fira Code, monospace';
    ctx.fillStyle = '#f59e0b';
    ctx.fillText('8-10+ YRS HARDWARE', centerPoint.x, centerPoint.y + 10);
  }

  // =================================================================
  // 2. TUSHAR: 3D POLYHEDRAL CODE PRISM & SOFTWARE MATRIX
  // =================================================================
  drawTusharCodePrism(canvas, time) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;

    ctx.clearRect(0, 0, w, h);

    // Dark cyber backdrop with cyan/purple aura
    const bgGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, w * 0.5);
    bgGrad.addColorStop(0, 'rgba(168, 85, 247, 0.25)');
    bgGrad.addColorStop(0.6, 'rgba(8, 11, 17, 0.95)');
    bgGrad.addColorStop(1, '#080b11');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    const angleY = this.rotTusharY + time * 0.8;
    const angleX = this.rotTusharX + Math.sin(time * 0.6) * 0.2;
    const size = 52;

    const project = (x, y, z) => {
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const x1 = x * cosY - z * sinY;
      const z1 = z * cosY + x * sinY;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const y2 = y * cosX - z1 * sinX;
      const z2 = z1 * cosX + y * sinX;

      const scale = 240 / (240 + z2);
      return {
        x: cx + x1 * scale,
        y: cy + y2 * scale
      };
    };

    // 8 Cube Vertices
    const verts = [
      project(-size, -size, -size),
      project(size, -size, -size),
      project(size, size, -size),
      project(-size, size, -size),
      project(-size, -size, size),
      project(size, -size, size),
      project(size, size, size),
      project(-size, size, size)
    ];

    // Draw Connecting Edges with glowing cyan/purple
    const edges = [
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 5], [5, 6], [6, 7], [7, 4],
      [0, 4], [1, 5], [2, 6], [3, 7]
    ];

    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 2;
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 12;

    edges.forEach(([i, j]) => {
      ctx.beginPath();
      ctx.moveTo(verts[i].x, verts[i].y);
      ctx.lineTo(verts[j].x, verts[j].y);
      ctx.stroke();
    });
    ctx.shadowBlur = 0;

    // Draw Inner Quantum Core Octahedron
    const coreSize = 24;
    const coreVerts = [
      project(0, -coreSize, 0),
      project(coreSize, 0, 0),
      project(0, coreSize, 0),
      project(-coreSize, 0, 0),
      project(0, 0, coreSize),
      project(0, 0, -coreSize)
    ];

    ctx.fillStyle = 'rgba(0, 240, 255, 0.35)';
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 1.5;

    ctx.beginPath();
    ctx.moveTo(coreVerts[0].x, coreVerts[0].y);
    ctx.lineTo(coreVerts[1].x, coreVerts[1].y);
    ctx.lineTo(coreVerts[4].x, coreVerts[4].y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Floating Code Syntax Tokens Orbiting Around Cube
    const tokens = ['{ }', '</>', '=>', 'API', '60 FPS'];
    tokens.forEach((tok, idx) => {
      const tokAngle = time * 1.2 + (idx * Math.PI * 2) / tokens.length;
      const tx = Math.cos(tokAngle) * 78;
      const tz = Math.sin(tokAngle) * 78;
      const ty = Math.sin(time * 2 + idx) * 14;

      const p = project(tx, ty, tz);
      ctx.font = 'bold 10px Fira Code, monospace';
      ctx.fillStyle = '#00f0ff';
      ctx.textAlign = 'center';
      ctx.fillText(tok, p.x, p.y);
    });

    // Badge Label
    ctx.font = 'bold 11px Fira Code, monospace';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText('TUSHAR // DEV', cx, cy + 82);

    ctx.font = '8px Fira Code, monospace';
    ctx.fillStyle = '#a855f7';
    ctx.fillText('5+ YRS FULL-STACK', cx, cy + 94);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.founderAvatarsInstance = new FounderAvatarsEngine();
});
