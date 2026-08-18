/* ===================================================================
   PIXELTOCLOUD SOLUTIONS - INTERACTIVE SYSTEM TOPOLOGY & CLOUD TRAFFIC
   Visualizes real-time client-to-cloud packet flows, telemetry & scaling
   =================================================================== */

class SystemTopologyEngine {
  constructor() {
    this.canvas = document.getElementById('topology-canvas');
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.isSpikeActive = false;
    this.packets = [];
    this.nodes = [];
    this.activeNodeIndex = 2; // Default to Nginx
    this.animationFrameId = null;

    if (this.canvas && this.ctx) {
      this.init();
    }
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.setupNodes();
    this.bindEvents();
    this.startAnimation();
  }

  resize() {
    if (!this.canvas) return;
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = 240;
    this.setupNodes();
  }

  setupNodes() {
    const w = this.canvas.width;
    const h = this.canvas.height;
    const cy = h / 2;

    this.nodes = [
      { id: 'client', name: 'Client Devices', subtitle: 'Mobile & Web', x: w * 0.1, y: cy, icon: '📱', metrics: { rps: '1,240 req/s', latency: '0.2ms', status: 'Optimal' }, color: '#38bdf8' },
      { id: 'cloudflare', name: 'Cloudflare CDN', subtitle: 'Edge WAF & DDoS', x: w * 0.3, y: cy, icon: '🛡️', metrics: { rps: '10,000+ cached', latency: '12ms', status: 'Protected' }, color: '#f59e0b' },
      { id: 'nginx', name: 'Nginx Proxy', subtitle: 'SSL & Load Balancer', x: w * 0.5, y: cy, icon: '⚡', metrics: { rps: '4,850 req/s', latency: '0.8ms', status: 'TLS 1.3 Active' }, color: '#10b981' },
      { id: 'docker', name: 'Docker Cluster', subtitle: 'Microservices & API', x: w * 0.7, y: cy, icon: '🐳', metrics: { rps: 'Microservice mesh', latency: '2.4ms', status: 'Zero-Downtime' }, color: '#00f0ff' },
      { id: 'database', name: 'PostgreSQL + Redis', subtitle: 'In-Memory Caching', x: w * 0.9, y: cy, icon: '🗄️', metrics: { rps: '99.8% cache hit', latency: '0.4ms', status: 'ACID Replicated' }, color: '#a855f7' }
    ];
  }

  bindEvents() {
    // Spike Button
    const spikeBtn = document.getElementById('topology-spike-btn');
    if (spikeBtn) {
      spikeBtn.addEventListener('click', () => this.triggerTrafficSpike());
    }

    // Node click/hover via canvas
    this.canvas.addEventListener('click', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      this.nodes.forEach((node, idx) => {
        const dist = Math.hypot(node.x - x, node.y - y);
        if (dist < 36) {
          this.activeNodeIndex = idx;
          this.updateTelemetryPanel(node);
        }
      });
    });

    // Initial telemetry display
    if (this.nodes[this.activeNodeIndex]) {
      this.updateTelemetryPanel(this.nodes[this.activeNodeIndex]);
    }
  }

  updateTelemetryPanel(node) {
    const titleEl = document.getElementById('topology-telemetry-title');
    const descEl = document.getElementById('topology-telemetry-desc');
    const rpsEl = document.getElementById('topology-metric-rps');
    const latencyEl = document.getElementById('topology-metric-latency');
    const statusEl = document.getElementById('topology-metric-status');

    if (titleEl) titleEl.innerHTML = `${node.icon} ${node.name} <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: normal;">(${node.subtitle})</span>`;
    if (rpsEl) rpsEl.textContent = node.metrics.rps;
    if (latencyEl) latencyEl.textContent = node.metrics.latency;
    if (statusEl) statusEl.textContent = node.metrics.status;
  }

  triggerTrafficSpike() {
    this.isSpikeActive = true;
    const spikeBtn = document.getElementById('topology-spike-btn');
    if (spikeBtn) {
      spikeBtn.innerHTML = `<span><i class="fa-solid fa-bolt" style="color: #fbbf24; margin-right: 6px;"></i>10,000 Concurrent Users Surging!</span>`;
      spikeBtn.style.borderColor = '#fbbf24';
    }

    // Spawn 50 high-velocity packets
    for (let i = 0; i < 50; i++) {
      this.spawnPacket(true);
    }

    const logBox = document.getElementById('topology-live-log');
    if (logBox) {
      logBox.innerHTML += `<div style="color: #fbbf24;">⚡ [SURGE DETECTED]: +10,000 req/s inbound. Cloudflare edge absorbing 88% cache hits.</div>`;
      logBox.innerHTML += `<div style="color: #10b981;">✔ [DOCKER AUTO-SCALE]: Worker replicas expanded dynamically in 140ms.</div>`;
      logBox.scrollTop = logBox.scrollHeight;
    }

    setTimeout(() => {
      this.isSpikeActive = false;
      if (spikeBtn) {
        spikeBtn.innerHTML = `<span><i class="fa-solid fa-chart-line" style="margin-right: 6px;"></i>Simulate 10,000 Traffic Spike</span>`;
        spikeBtn.style.borderColor = '';
      }
    }, 4000);
  }

  spawnPacket(isSurge = false) {
    this.packets.push({
      nodeIdx: 0,
      progress: 0,
      speed: isSurge ? 0.04 + Math.random() * 0.03 : 0.015 + Math.random() * 0.01,
      color: isSurge ? '#fbbf24' : '#00f0ff',
      size: isSurge ? 4.5 : 3
    });
  }

  startAnimation() {
    let tick = 0;

    const animate = () => {
      tick++;
      if (tick % (this.isSpikeActive ? 3 : 15) === 0) {
        this.spawnPacket(this.isSpikeActive);
      }

      this.draw();
      this.animationFrameId = requestAnimationFrame(animate);
    };

    animate();
  }

  draw() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    ctx.clearRect(0, 0, w, h);

    // Draw connecting lines with glowing gradient
    ctx.lineWidth = 2;
    for (let i = 0; i < this.nodes.length - 1; i++) {
      const n1 = this.nodes[i];
      const n2 = this.nodes[i + 1];

      const grad = ctx.createLinearGradient(n1.x, n1.y, n2.x, n2.y);
      grad.addColorStop(0, n1.color);
      grad.addColorStop(1, n2.color);

      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.moveTo(n1.x, n1.y);
      ctx.lineTo(n2.x, n2.y);
      ctx.stroke();

      // Glowing active trace
      ctx.beginPath();
      ctx.strokeStyle = grad;
      ctx.setLineDash([4, 8]);
      ctx.lineDashOffset = -performance.now() / 25;
      ctx.moveTo(n1.x, n1.y);
      ctx.lineTo(n2.x, n2.y);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Update and draw packets
    for (let i = this.packets.length - 1; i >= 0; i--) {
      const p = this.packets[i];
      p.progress += p.speed;

      if (p.progress >= 1) {
        p.progress = 0;
        p.nodeIdx++;
      }

      if (p.nodeIdx >= this.nodes.length - 1) {
        this.packets.splice(i, 1);
        continue;
      }

      const fromNode = this.nodes[p.nodeIdx];
      const toNode = this.nodes[p.nodeIdx + 1];

      const px = fromNode.x + (toNode.x - fromNode.x) * p.progress;
      const py = fromNode.y + (toNode.y - fromNode.y) * p.progress;

      ctx.beginPath();
      ctx.arc(px, py, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // Draw Nodes
    this.nodes.forEach((n, idx) => {
      const isSelected = idx === this.activeNodeIndex;

      // Outer glow ring
      ctx.beginPath();
      ctx.arc(n.x, n.y, isSelected ? 32 : 26, 0, Math.PI * 2);
      ctx.fillStyle = isSelected ? 'rgba(0, 240, 255, 0.15)' : 'rgba(255, 255, 255, 0.04)';
      ctx.strokeStyle = isSelected ? n.color : 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = isSelected ? 2.5 : 1.5;
      ctx.fill();
      ctx.stroke();

      // Node label
      ctx.font = 'bold 12px Plus Jakarta Sans, sans-serif';
      ctx.fillStyle = isSelected ? '#ffffff' : '#94a3b8';
      ctx.textAlign = 'center';
      ctx.fillText(n.name, n.x, n.y + 44);

      ctx.font = '10px Fira Code, monospace';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.fillText(n.subtitle, n.x, n.y + 58);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.systemTopologyInstance = new SystemTopologyEngine();
});
