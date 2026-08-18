/* ===================================================================
   PIXELTOCLOUD SOLUTIONS - ADVANCED CLIENT-TO-CLOUD DISTRIBUTED TOPOLOGY
   Enterprise Multi-Tier Architecture, Live Telemetry, Failover & WAF Defense
   =================================================================== */

class AdvancedSystemTopologyEngine {
  constructor() {
    this.canvas = document.getElementById('topology-canvas');
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.packets = [];
    this.nodes = [];
    this.activeNodeIndex = 2; // Default to Nginx Ingress
    this.currentScenario = 'normal'; // 'normal', 'spike', 'ddos', 'failover', 'backup'
    this.currentProtocol = 'http3'; // 'http3', 'websocket', 'grpc'
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
    this.canvas.height = Math.max(300, Math.min(360, rect.width * 0.4));
    this.setupNodes();
  }

  setupNodes() {
    const w = this.canvas.width;
    const h = this.canvas.height;

    // Multi-Tier Branching Layout
    const yTop = h * 0.32;
    const yMid = h * 0.52;
    const yBottom = h * 0.72;

    this.nodes = [
      // 0. Client Layer
      {
        id: 'clients',
        name: 'Multi-Region Clients',
        category: 'Edge Ingress',
        protocol: 'HTTP/3 QUIC & TLS 1.3',
        x: w * 0.08,
        y: yMid,
        icon: '📱',
        color: '#38bdf8',
        metrics: {
          throughput: '8,450 req/s',
          latency: '0.12ms',
          state: 'Optimal (Global Anycast)',
          detail: 'Mobile, Desktop & Telehealth WebRTC Streams'
        }
      },
      // 1. Cloudflare Anycast WAF
      {
        id: 'cloudflare',
        name: 'Cloudflare Edge WAF',
        category: 'DDoS & Static CDN',
        protocol: 'Anycast DNS / SSL Offload',
        x: w * 0.24,
        y: yMid,
        icon: '🛡️',
        color: '#f59e0b',
        metrics: {
          throughput: '142 Tbps Capacity',
          latency: '12ms TTFB',
          state: '88.4% Cache Hit Ratio',
          detail: 'Automated Bot Blocker & Brotli Static Scrubber'
        }
      },
      // 2. Nginx Ingress Reverse Proxy
      {
        id: 'nginx',
        name: 'Nginx HA Ingress',
        category: 'Load Balancer',
        protocol: 'HTTP/2 Keep-Alive Stream',
        x: w * 0.42,
        y: yMid,
        icon: '⚡',
        color: '#10b981',
        metrics: {
          throughput: '24,000 req/s',
          latency: '0.45ms',
          state: 'TLS 1.3 Terminated',
          detail: 'Least-Conn Dynamic Upstream Round-Robin Pool'
        }
      },
      // 3. Docker Container Microservices Mesh (Upper Branch)
      {
        id: 'docker',
        name: 'Docker Microservices',
        category: 'Compute Cluster',
        protocol: 'Node.js / Python FastAPIs',
        x: w * 0.62,
        y: yTop,
        icon: '🐳',
        color: '#00f0ff',
        metrics: {
          throughput: '16 Replicas Live',
          latency: '1.8ms',
          state: 'Zero-Downtime Hot Swaps',
          detail: 'Auth JWT, Telehealth WebRTC & Tax Engines'
        }
      },
      // 4. Redis In-Memory Cluster (Middle Branch)
      {
        id: 'redis',
        name: 'Redis In-Memory Tier',
        category: 'Cache & Pub/Sub',
        protocol: 'TCP In-Memory Key/Value',
        x: w * 0.62,
        y: yBottom,
        icon: '⚡',
        color: '#ec4899',
        metrics: {
          throughput: '99.4% Hit Rate',
          latency: '0.22ms',
          state: 'Multi-AZ Replicated',
          detail: 'Session Store, Rate-Limiting & Pub/Sub Pipeline'
        }
      },
      // 5. PostgreSQL Enterprise Primary (Upper Right)
      {
        id: 'postgres',
        name: 'PostgreSQL Database',
        category: 'ACID Relational Storage',
        protocol: 'WAL Streaming Replication',
        x: w * 0.88,
        y: yTop,
        icon: '🗄️',
        color: '#a855f7',
        metrics: {
          throughput: '4,200 Trans/s',
          latency: '0.85ms',
          state: 'Primary + Read Replicas',
          detail: 'Row-Level AES-256 Encryption & Strict ACID'
        }
      },
      // 6. AWS S3 Encrypted Backup Vault (Lower Right)
      {
        id: 's3',
        name: 'AWS S3 Snapshot Vault',
        category: 'Offsite Cloud Backup',
        protocol: 'HTTPS REST (us-east-1)',
        x: w * 0.88,
        y: yBottom,
        icon: '☁️',
        color: '#0284c7',
        metrics: {
          throughput: '11 9s Durability',
          latency: '24ms',
          state: 'SHA-256 Immutable',
          detail: 'Automated Hourly WAL Backups & Asset Storage'
        }
      }
    ];

    // Branching Links
    this.links = [
      { from: 0, to: 1 }, // Client -> Cloudflare
      { from: 1, to: 2 }, // Cloudflare -> Nginx
      { from: 2, to: 3 }, // Nginx -> Docker
      { from: 2, to: 4 }, // Nginx -> Redis
      { from: 3, to: 5 }, // Docker -> Postgres
      { from: 4, to: 5 }, // Redis -> Postgres
      { from: 5, to: 6 }  // Postgres -> S3 Backup
    ];
  }

  bindEvents() {
    // 1. Simulation Buttons
    const spikeBtn = document.getElementById('topology-spike-btn');
    const ddosBtn = document.getElementById('topology-ddos-btn');
    const failoverBtn = document.getElementById('topology-failover-btn');
    const backupBtn = document.getElementById('topology-backup-btn');

    if (spikeBtn) spikeBtn.addEventListener('click', () => this.triggerSpike());
    if (ddosBtn) ddosBtn.addEventListener('click', () => this.triggerDDoS());
    if (failoverBtn) failoverBtn.addEventListener('click', () => this.triggerFailover());
    if (backupBtn) backupBtn.addEventListener('click', () => this.triggerBackup());

    // 2. Protocol Buttons
    const protoBtns = document.querySelectorAll('.topology-proto-btn');
    protoBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        protoBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentProtocol = btn.getAttribute('data-proto') || 'http3';
        this.logSystemEvent(`🌐 Protocol switched to ${this.currentProtocol.toUpperCase()} (TLS 1.3 / Zero-RTT Handshake active)`, '#00f0ff');
      });
    });

    // 3. Canvas Node Click & Hover Inspection
    this.canvas.addEventListener('click', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      this.nodes.forEach((node, idx) => {
        const dist = Math.hypot(node.x - x, node.y - y);
        if (dist < 38) {
          this.activeNodeIndex = idx;
          this.updateTelemetryCard(node);
          this.logSystemEvent(`🔍 Node Inspected: [${node.name}] - State: ${node.metrics.state}`, node.color);
        }
      });
    });

    // Initial telemetry display
    if (this.nodes[this.activeNodeIndex]) {
      this.updateTelemetryCard(this.nodes[this.activeNodeIndex]);
    }
  }

  updateTelemetryCard(node) {
    const titleEl = document.getElementById('topology-telemetry-title');
    const rpsEl = document.getElementById('topology-metric-rps');
    const latencyEl = document.getElementById('topology-metric-latency');
    const statusEl = document.getElementById('topology-metric-status');
    const descEl = document.getElementById('topology-telemetry-desc');

    if (titleEl) {
      titleEl.innerHTML = `<span style="margin-right: 6px;">${node.icon}</span> ${node.name} <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: normal; margin-left: 6px;">[${node.category}]</span>`;
    }
    if (rpsEl) rpsEl.textContent = node.metrics.throughput;
    if (latencyEl) latencyEl.textContent = node.metrics.latency;
    if (statusEl) {
      statusEl.textContent = node.metrics.state;
      statusEl.style.color = node.color;
    }
    if (descEl) {
      descEl.textContent = `${node.protocol} — ${node.metrics.detail}`;
    }
  }

  logSystemEvent(msg, color = '#10b981') {
    const logBox = document.getElementById('topology-live-log');
    if (!logBox) return;
    const line = document.createElement('div');
    line.style.color = color;
    line.innerHTML = `<span style="color: #64748b;">[${new Date().toLocaleTimeString()}]</span> ${msg}`;
    logBox.appendChild(line);
    logBox.scrollTop = logBox.scrollHeight;
  }

  // =================================================================
  // SCENARIO SIMULATIONS
  // =================================================================
  triggerSpike() {
    this.currentScenario = 'spike';
    this.logSystemEvent('⚡ [TRAFFIC SURGE]: 10,000 concurrent requests arriving. Anycast edge absorbing 88.4% cached assets.', '#f59e0b');

    for (let i = 0; i < 40; i++) {
      this.spawnPacket({ isSurge: true });
    }

    setTimeout(() => {
      this.logSystemEvent('✔ [AUTO-SCALED]: Nginx worker connections dynamically expanded (24k capacity reached | 0 packet drop).', '#10b981');
      this.currentScenario = 'normal';
    }, 3500);
  }

  triggerDDoS() {
    this.currentScenario = 'ddos';
    this.logSystemEvent('🚨 [DDOS ATTACK]: 50 Gbps SYN Flood / Layer 7 Attack detected on Anycast edge IP.', '#ef4444');

    for (let i = 0; i < 30; i++) {
      this.spawnPacket({ isThreat: true });
    }

    setTimeout(() => {
      this.logSystemEvent('🛡️ [WAF MITIGATION]: Cloudflare WAF + iptables scrubbed 100% of malicious packets. Zero backend latency change.', '#10b981');
      this.currentScenario = 'normal';
    }, 3000);
  }

  triggerFailover() {
    this.currentScenario = 'failover';
    this.logSystemEvent('🔄 [FAILOVER TEST]: PostgreSQL Primary node simulated reboot -> Read Replica promoted in 180ms.', '#a855f7');
    this.logSystemEvent('⚡ Redis cache cluster absorbed 100% of incoming reads during transition with 0.00s downtime.', '#10b981');

    setTimeout(() => {
      this.currentScenario = 'normal';
    }, 3000);
  }

  triggerBackup() {
    this.currentScenario = 'backup';
    this.logSystemEvent('☁️ [AWS S3 BACKUP]: Streaming PostgreSQL WAL snapshot to S3 Immutable Storage Bucket...', '#0284c7');

    for (let i = 0; i < 15; i++) {
      this.spawnPacket({ isBackup: true });
    }

    setTimeout(() => {
      this.logSystemEvent('✔ [S3 BACKUP VERIFIED]: 84.2 MB archive synced with SHA-256 HMAC encryption.', '#10b981');
      if (window.showToast) window.showToast('✔ Cloud S3 Snapshot Backup Verified', 'success');
      this.currentScenario = 'normal';
    }, 2500);
  }

  // =================================================================
  // PACKET FLOW ENGINE
  // =================================================================
  spawnPacket(opts = {}) {
    const isThreat = opts.isThreat || false;
    const isSurge = opts.isSurge || false;
    const isBackup = opts.isBackup || false;

    // Pick path
    let path = [0, 1, 2, Math.random() > 0.5 ? 3 : 4, 5];
    if (isThreat) {
      path = [0, 1]; // Blocked at Cloudflare Edge
    } else if (isBackup) {
      path = [5, 6]; // Database to S3
    }

    this.packets.push({
      path: path,
      pathStep: 0,
      progress: 0,
      speed: isSurge ? 0.038 : (isThreat ? 0.045 : 0.018 + Math.random() * 0.008),
      color: isThreat ? '#ef4444' : (isSurge ? '#fbbf24' : (isBackup ? '#0284c7' : '#00f0ff')),
      size: isThreat ? 4 : (isSurge ? 4 : 3),
      isResponse: false
    });
  }

  startAnimation() {
    let tick = 0;

    const animate = () => {
      tick++;

      // Spawning regular packets
      const rate = this.currentScenario === 'spike' ? 4 : (this.currentScenario === 'ddos' ? 5 : 16);
      if (tick % rate === 0) {
        this.spawnPacket();
      }

      this.draw(tick);
      this.animationFrameId = requestAnimationFrame(animate);
    };

    animate();
  }

  draw(tick) {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    ctx.clearRect(0, 0, w, h);

    // Subtle Circuit Background Grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }

    // 1. Draw Links with Glowing Particle Traces
    this.links.forEach(link => {
      const from = this.nodes[link.from];
      const to = this.nodes[link.to];

      // Base link
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 2;
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();

      // Glowing dashed active trace
      const grad = ctx.createLinearGradient(from.x, from.y, to.x, to.y);
      grad.addColorStop(0, from.color);
      grad.addColorStop(1, to.color);

      ctx.beginPath();
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 10]);
      ctx.lineDashOffset = -tick * 0.8;
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();
      ctx.setLineDash([]);
    });

    // 2. Update and Draw Moving Packets
    for (let i = this.packets.length - 1; i >= 0; i--) {
      const p = this.packets[i];
      p.progress += p.speed;

      if (p.progress >= 1) {
        p.progress = 0;
        p.pathStep++;
      }

      if (p.pathStep >= p.path.length - 1) {
        this.packets.splice(i, 1);
        continue;
      }

      const fromNode = this.nodes[p.path[p.pathStep]];
      const toNode = this.nodes[p.path[p.pathStep + 1]];

      const px = fromNode.x + (toNode.x - fromNode.x) * p.progress;
      const py = fromNode.y + (toNode.y - fromNode.y) * p.progress;

      ctx.beginPath();
      ctx.arc(px, py, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // 3. Draw Nodes with Rings & Badges
    this.nodes.forEach((n, idx) => {
      const isSelected = idx === this.activeNodeIndex;
      const radius = isSelected ? 30 : 24;

      // Outer Halo Ring
      ctx.beginPath();
      ctx.arc(n.x, n.y, radius + (isSelected ? 6 + Math.sin(tick * 0.1) * 2 : 0), 0, Math.PI * 2);
      ctx.strokeStyle = isSelected ? n.color : 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = isSelected ? 2 : 1;
      ctx.stroke();

      // Node Body Circle
      const nodeGrad = ctx.createRadialGradient(n.x, n.y, 2, n.x, n.y, radius);
      nodeGrad.addColorStop(0, '#1e293b');
      nodeGrad.addColorStop(1, '#090d16');
      ctx.fillStyle = nodeGrad;
      ctx.beginPath();
      ctx.arc(n.x, n.y, radius, 0, Math.PI * 2);
      ctx.fill();

      // Status indicator dot
      ctx.fillStyle = n.color;
      ctx.beginPath();
      ctx.arc(n.x + radius * 0.7, n.y - radius * 0.7, 4, 0, Math.PI * 2);
      ctx.fill();

      // Icon
      ctx.font = isSelected ? '18px sans-serif' : '15px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(n.icon, n.x, n.y);

      // Node Name Label
      ctx.font = isSelected ? 'bold 11px Plus Jakarta Sans, sans-serif' : '10px Plus Jakarta Sans, sans-serif';
      ctx.fillStyle = isSelected ? '#ffffff' : '#cbd5e1';
      ctx.fillText(n.name, n.x, n.y + radius + 14);

      // Category Subtitle
      ctx.font = '8px Fira Code, monospace';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.fillText(n.category, n.x, n.y + radius + 25);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.systemTopologyInstance = new AdvancedSystemTopologyEngine();
});
