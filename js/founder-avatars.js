/* ===================================================================
   PIXELTOCLOUD SOLUTIONS - HYPER-REALISTIC 3D FOUNDER AVATAR ENGINES
   Pankaj (3D Holographic Quantum Silicon Core) & Tushar (3D Polyhedral Code Matrix)
   =================================================================== */

class FounderAvatarsEngine {
  constructor() {
    this.pankajCanvases = document.querySelectorAll('.pankaj-avatar-canvas');
    this.tusharCanvases = document.querySelectorAll('.tushar-avatar-canvas');
    this.animationId = null;
    this.rotPankajX = 0.35;
    this.rotPankajY = 0.45;
    this.targetRotPankajX = 0.35;
    this.targetRotPankajY = 0.45;

    this.rotTusharX = 0.4;
    this.rotTusharY = 0.4;
    this.targetRotTusharX = 0.4;
    this.targetRotTusharY = 0.4;

    this.init();
  }

  init() {
    this.bindHoverInteractions();
    this.startRenderLoop();
  }

  bindHoverInteractions() {
    // Smooth mouse parallax on card hover
    document.querySelectorAll('.founder-card-wrap, .founder-image-container, .contact-avatar-box').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const nx = (e.clientX - rect.left) / rect.width - 0.5;
        const ny = (e.clientY - rect.top) / rect.height - 0.5;

        if (card.querySelector('.pankaj-avatar-canvas')) {
          this.targetRotPankajX = 0.35 + ny * 0.6;
          this.targetRotPankajY = 0.45 + nx * 0.9;
        }
        if (card.querySelector('.tushar-avatar-canvas')) {
          this.targetRotTusharX = 0.4 + ny * 0.7;
          this.targetRotTusharY = 0.4 + nx * 0.9;
        }
      });

      card.addEventListener('mouseleave', () => {
        this.targetRotPankajX = 0.35;
        this.targetRotPankajY = 0.45;
        this.targetRotTusharX = 0.4;
        this.targetRotTusharY = 0.4;
      });
    });
  }

  startRenderLoop() {
    let tick = 0;

    const render = () => {
      tick++;
      const time = tick * 0.02;

      // Smooth interpolation for mouse movements
      this.rotPankajX += (this.targetRotPankajX - this.rotPankajX) * 0.08;
      this.rotPankajY += (this.targetRotPankajY - this.rotPankajY) * 0.08;
      this.rotTusharX += (this.targetRotTusharX - this.rotTusharX) * 0.08;
      this.rotTusharY += (this.targetRotTusharY - this.rotTusharY) * 0.08;

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
  // 1. PANKAJ: 3D HOLOGRAPHIC QUANTUM SILICON CHIP & ARCHITECT CORE
  // =================================================================
  drawPankajSiliconCore(canvas, time) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;

    ctx.clearRect(0, 0, w, h);

    // Deep Obsidian Backdrop with Electric Cyan / Gold Flare
    const bgGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, w * 0.55);
    bgGrad.addColorStop(0, 'rgba(2, 132, 199, 0.28)');
    bgGrad.addColorStop(0.4, 'rgba(15, 23, 42, 0.9)');
    bgGrad.addColorStop(1, '#05070c');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Motherboard Circuit Traces (Gold & Cyan Pulse)
    ctx.lineWidth = 1;
    for (let i = -70; i <= 70; i += 22) {
      const alpha = 0.15 + Math.sin(time * 2 + i * 0.1) * 0.08;
      ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
      ctx.beginPath();
      ctx.moveTo(cx + i, 20);
      ctx.lineTo(cx + i, h - 20);
      ctx.stroke();

      ctx.strokeStyle = `rgba(245, 158, 11, ${alpha * 0.7})`;
      ctx.beginPath();
      ctx.moveTo(20, cy + i);
      ctx.lineTo(w - 20, cy + i);
      ctx.stroke();
    }

    // 3D Projection Setup
    const angleY = this.rotPankajY + Math.sin(time * 0.4) * 0.12;
    const angleX = this.rotPankajX + Math.cos(time * 0.3) * 0.06;
    const size = Math.min(w, h) * 0.26;

    const project = (x, y, z) => {
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const x1 = x * cosY - z * sinY;
      const z1 = z * cosY + x * sinY;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const y2 = y * cosX - z1 * sinX;
      const z2 = z1 * cosX + y * sinX;

      const scale = 280 / (280 + z2);
      return {
        x: cx + x1 * scale,
        y: cy + y2 * scale,
        scale: scale,
        z: z2
      };
    };

    // 1. Draw Substrate Layer (Base PCB)
    const subH = 10;
    const subVerts = [
      project(-size, -subH, -size),
      project(size, -subH, -size),
      project(size, -subH, size),
      project(-size, -subH, size),
      project(-size, subH, -size),
      project(size, subH, -size),
      project(size, subH, size),
      project(-size, subH, size)
    ];

    // Bottom Base
    ctx.fillStyle = '#090d16';
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 1.5;

    ctx.beginPath();
    ctx.moveTo(subVerts[0].x, subVerts[0].y);
    ctx.lineTo(subVerts[1].x, subVerts[1].y);
    ctx.lineTo(subVerts[2].x, subVerts[2].y);
    ctx.lineTo(subVerts[3].x, subVerts[3].y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Golden Pin Connectors (BGA Gold Grid)
    for (let p = -size + 10; p < size; p += 16) {
      const pTop = project(p, -subH, -size);
      const pBottom = project(p, -subH, size);
      const pLeft = project(-size, -subH, p);
      const pRight = project(size, -subH, p);

      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(pTop.x - 1.5, pTop.y - 1.5, 3, 3);
      ctx.fillRect(pBottom.x - 1.5, pBottom.y - 1.5, 3, 3);
      ctx.fillRect(pLeft.x - 1.5, pLeft.y - 1.5, 3, 3);
      ctx.fillRect(pRight.x - 1.5, pRight.y - 1.5, 3, 3);
    }

    // 2. Central Sapphire Silicon Die (Multi-Layer Heat Spreader)
    const dieSize = size * 0.72;
    const dieY = -24;
    const dieVerts = [
      project(-dieSize, dieY, -dieSize),
      project(dieSize, dieY, -dieSize),
      project(dieSize, dieY, dieSize),
      project(-dieSize, dieY, dieSize)
    ];

    const dieGrad = ctx.createLinearGradient(dieVerts[0].x, dieVerts[0].y, dieVerts[2].x, dieVerts[2].y);
    dieGrad.addColorStop(0, '#0369a1');
    dieGrad.addColorStop(0.35, '#0284c7');
    dieGrad.addColorStop(0.7, '#38bdf8');
    dieGrad.addColorStop(1, '#00f0ff');

    ctx.fillStyle = dieGrad;
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 2;
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 18;

    ctx.beginPath();
    ctx.moveTo(dieVerts[0].x, dieVerts[0].y);
    ctx.lineTo(dieVerts[1].x, dieVerts[1].y);
    ctx.lineTo(dieVerts[2].x, dieVerts[2].y);
    ctx.lineTo(dieVerts[3].x, dieVerts[3].y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Metallic Die Mirror Bevel
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(dieVerts[0].x + 4, dieVerts[0].y + 4);
    ctx.lineTo(dieVerts[1].x - 4, dieVerts[1].y + 4);
    ctx.lineTo(dieVerts[2].x - 4, dieVerts[2].y - 4);
    ctx.lineTo(dieVerts[3].x + 4, dieVerts[3].y - 4);
    ctx.closePath();
    ctx.stroke();

    // 3. Central Quantum Core Emblem & Text
    const centerPoint = project(0, dieY - 2, 0);

    // Glowing Core Orb
    const orbPulse = 10 + Math.sin(time * 3) * 2;
    const orbGrad = ctx.createRadialGradient(centerPoint.x, centerPoint.y, 1, centerPoint.x, centerPoint.y, orbPulse);
    orbGrad.addColorStop(0, '#ffffff');
    orbGrad.addColorStop(0.4, '#00f0ff');
    orbGrad.addColorStop(0.9, '#38bdf8');
    orbGrad.addColorStop(1, 'transparent');

    ctx.fillStyle = orbGrad;
    ctx.beginPath();
    ctx.arc(centerPoint.x, centerPoint.y, orbPulse, 0, Math.PI * 2);
    ctx.fill();

    // Engraved Typography
    ctx.font = 'bold 11px Plus Jakarta Sans, -apple-system, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
    ctx.shadowBlur = 4;
    ctx.fillText('PANKAJ', centerPoint.x, centerPoint.y - 18);

    ctx.font = 'bold 8px Fira Code, monospace';
    ctx.fillStyle = '#fbbf24';
    ctx.fillText('LEAD SYSTEMS ARCHITECT', centerPoint.x, centerPoint.y + 18);

    ctx.font = '7px Fira Code, monospace';
    ctx.fillStyle = '#38bdf8';
    ctx.fillText('8-10+ YRS HARDWARE & CLOUD', centerPoint.x, centerPoint.y + 28);
    ctx.shadowBlur = 0;

    // 4. Orbiting Gyroscopic Competency Rings
    const numRings = 2;
    for (let r = 0; r < numRings; r++) {
      const radius = size * (1.15 + r * 0.22);
      const ringAngle = time * (0.8 + r * 0.4) * (r % 2 === 0 ? 1 : -1);
      const ringTilt = (r === 0 ? 0.3 : -0.3);

      ctx.strokeStyle = r === 0 ? 'rgba(0, 240, 255, 0.25)' : 'rgba(251, 191, 36, 0.25)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);

      ctx.beginPath();
      for (let theta = 0; theta <= Math.PI * 2; theta += 0.15) {
        const rx = Math.cos(theta) * radius;
        const rz = Math.sin(theta) * radius;
        const ry = Math.sin(theta + ringAngle) * (18 * ringTilt);
        const pt = project(rx, ry, rz);
        if (theta === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Orbiting Satellite Node
      const satX = Math.cos(ringAngle) * radius;
      const satZ = Math.sin(ringAngle) * radius;
      const satY = Math.sin(ringAngle) * (18 * ringTilt);
      const satPt = project(satX, satY, satZ);

      ctx.fillStyle = r === 0 ? '#00f0ff' : '#fbbf24';
      ctx.shadowColor = ctx.fillStyle;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(satPt.x, satPt.y, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }
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
    const bgGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, w * 0.55);
    bgGrad.addColorStop(0, 'rgba(139, 92, 246, 0.25)');
    bgGrad.addColorStop(0.5, 'rgba(8, 11, 17, 0.9)');
    bgGrad.addColorStop(1, '#05070c');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // 3D Isometric Rotating Code Cube Vertices
    const size = Math.min(w, h) * 0.24;
    const angleY = this.rotTusharY + time * 0.5;
    const angleX = this.rotTusharX + Math.sin(time * 0.3) * 0.1;

    const project = (x, y, z) => {
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const x1 = x * cosY - z * sinY;
      const z1 = z * cosY + x * sinY;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const y2 = y * cosX - z1 * sinX;
      const z2 = z1 * cosX + y * sinX;

      const scale = 260 / (260 + z2);
      return {
        x: cx + x1 * scale,
        y: cy + y2 * scale,
        z: z2
      };
    };

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

    const edges = [
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 5], [5, 6], [6, 7], [7, 4],
      [0, 4], [1, 5], [2, 6], [3, 7]
    ];

    // Draw Wireframe Code Cube
    ctx.lineWidth = 2;
    ctx.shadowColor = '#8b5cf6';
    ctx.shadowBlur = 12;

    edges.forEach(edge => {
      const v1 = verts[edge[0]];
      const v2 = verts[edge[1]];
      const grad = ctx.createLinearGradient(v1.x, v1.y, v2.x, v2.y);
      grad.addColorStop(0, '#00f0ff');
      grad.addColorStop(1, '#8b5cf6');

      ctx.strokeStyle = grad;
      ctx.beginPath();
      ctx.moveTo(v1.x, v1.y);
      ctx.lineTo(v2.x, v2.y);
      ctx.stroke();
    });
    ctx.shadowBlur = 0;

    // Center Core Token
    ctx.font = 'bold 11px Plus Jakarta Sans, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText('TUSHAR', cx, cy - 14);

    ctx.font = 'bold 8px Fira Code, monospace';
    ctx.fillStyle = '#a855f7';
    ctx.fillText('SR. SOFTWARE DEV', cx, cy + 12);

    ctx.font = '7px Fira Code, monospace';
    ctx.fillStyle = '#00f0ff';
    ctx.fillText('5+ YRS FULL-STACK & 3D', cx, cy + 22);

    // Orbiting Code Tokens
    const tokens = ['{ }', '</>', '=>', 'API', '60 FPS'];
    tokens.forEach((token, idx) => {
      const tokenAngle = time * 0.8 + (idx / tokens.length) * Math.PI * 2;
      const rad = size * 1.5;
      const tx = Math.cos(tokenAngle) * rad;
      const tz = Math.sin(tokenAngle) * rad;
      const ty = Math.sin(time + idx) * 20;

      const p = project(tx, ty, tz);
      ctx.font = 'bold 9px Fira Code, monospace';
      ctx.fillStyle = 'rgba(0, 240, 255, 0.85)';
      ctx.fillText(token, p.x, p.y);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.founderAvatarsInstance = new FounderAvatarsEngine();
});
