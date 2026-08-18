/* ===================================================================
   PIXELTOCLOUD SOLUTIONS - SMART SERVICES HUB & SPLIT-VIEW SWITCHER
   Eliminates long scrolling, instant tab switching, 60 FPS live sandboxes
   =================================================================== */

class SmartServicesHub {
  constructor() {
    this.tabs = document.querySelectorAll('.service-nav-tab');
    this.panes = document.querySelectorAll('.service-tab-pane');
    this.currentTab = 'web';

    this.init();
  }

  init() {
    if (!this.tabs.length) return;
    this.bindTabs();
    this.render3DPreviewMesh();
  }

  bindTabs() {
    this.tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-service-tab');
        if (target && target !== this.currentTab) {
          this.switchTab(target);
        }
      });
    });
  }

  switchTab(tabId) {
    this.currentTab = tabId;

    // Update active tab buttons
    this.tabs.forEach(tab => {
      if (tab.getAttribute('data-service-tab') === tabId) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    // Cross-fade service panes
    this.panes.forEach(pane => {
      if (pane.getAttribute('data-pane-id') === tabId) {
        pane.classList.add('active');
      } else {
        pane.classList.remove('active');
      }
    });

    // Trigger micro-sandboxes resize/redraw if needed
    if (tabId === 'doctor' && window.microSandboxesInstance) {
      window.microSandboxesInstance.drawECG();
    }
  }

  render3DPreviewMesh() {
    const canvas = document.getElementById('service-3d-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let tick = 0;
    const render = () => {
      tick++;
      const time = tick * 0.025;
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      // Radial background
      const bgGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, w * 0.5);
      bgGrad.addColorStop(0, 'rgba(168, 85, 247, 0.2)');
      bgGrad.addColorStop(1, 'rgba(8, 11, 17, 0.95)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Rotating 3D Torus / Hex Grid
      const points = [];
      const numRings = 12;
      const pointsPerRing = 16;
      const r1 = 55;
      const r2 = 24;

      for (let i = 0; i < numRings; i++) {
        const u = (i / numRings) * Math.PI * 2 + time * 0.5;
        for (let j = 0; j < pointsPerRing; j++) {
          const v = (j / pointsPerRing) * Math.PI * 2;
          const x = (r1 + r2 * Math.cos(v)) * Math.cos(u);
          const y = (r1 + r2 * Math.cos(v)) * Math.sin(u);
          const z = r2 * Math.sin(v);

          // Project
          const rotX = 0.5;
          const rotY = time * 0.8;
          const cosY = Math.cos(rotY);
          const sinY = Math.sin(rotY);
          const x1 = x * cosY - z * sinY;
          const z1 = z * cosY + x * sinY;

          const cosX = Math.cos(rotX);
          const sinX = Math.sin(rotX);
          const y2 = y * cosX - z1 * sinX;
          const z2 = z1 * cosX + y * sinX;

          const scale = 220 / (220 + z2);
          points.push({
            x: cx + x1 * scale,
            y: cy + y2 * scale,
            z: z2
          });
        }
      }

      ctx.fillStyle = '#a855f7';
      points.forEach(p => {
        const alpha = Math.max(0.1, (p.z + 50) / 100);
        ctx.fillStyle = `rgba(0, 240, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(render);
    };

    render();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.servicesHubInstance = new SmartServicesHub();
});
