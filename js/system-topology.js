/* ===================================================================
   PIXELTOCLOUD SOLUTIONS - ADVANCED CLIENT-TO-CLOUD DISTRIBUTED TOPOLOGY
   Multi-Tier Global Architecture, Live Payload Decoder, Latency Oscilloscope & WAF
   =================================================================== */

class AdvancedSystemTopologyEngine {
  constructor() {
    this.canvas = document.getElementById('topology-canvas');
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.packets = [];
    this.particles = [];
    this.shockwaves = [];
    this.nodes = [];
    this.activeNodeIndex = 2; // Default to Nginx Ingress
    this.currentScenario = 'normal'; // 'normal', 'spike', 'ddos', 'failover', 'backup'
    this.currentProtocol = 'http3'; // 'http3', 'websocket', 'grpc'
    this.oscillatorSpike = 0;
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
    this.canvas.height = Math.max(320, Math.min(380, rect.width * 0.42));
    this.setupNodes();
  }

  setupNodes() {
    const w = this.canvas.width;
    const h = this.canvas.height;

    // Multi-Tier Branching Layout
    const yTop = h * 0.28;
    const yMid = h * 0.50;
    const yBottom = h * 0.74;

    this.nodes = [
      // 0. Multi-Region Global Edge Clients
      {
        id: 'clients',
        name: 'Multi-Region Ingress',
        category: 'Edge Clients',
        region: 'US / EU / IN / SG',
        protocol: 'HTTP/3 QUIC (0-RTT)',
        x: w * 0.08,
        y: yMid,
        icon: '📱',
        color: '#38bdf8',
        metrics: {
          throughput: '8,450 req/s',
          latency: '0.12ms',
          state: 'Optimal (Global Anycast)',
          detail: 'Mobile, Desktop & Telehealth WebRTC Stream Sessions'
        },
        payload: {
          method: 'GET /api/v2/stream HTTP/3',
          handshake: 'TLS 1.3 Strict // 0-RTT Resumption',
          client_ip: '103.21.244.18 (AP-South-1 Mumbai)',
          compression: 'Brotli (br: 11) // 96% Data Savings'
        }
      },
      // 1. Cloudflare Anycast WAF & Edge Cache
      {
        id: 'cloudflare',
        name: 'Cloudflare Edge WAF',
        category: 'DDoS & Static CDN',
        region: '330+ Global PoPs',
        protocol: 'Anycast DNS / SSL Scrubber',
        x: w * 0.24,
        y: yMid,
        icon: '🛡️',
        color: '#f59e0b',
        metrics: {
          throughput: '142 Tbps Capacity',
          latency: '12ms TTFB',
          state: '88.4% Cache Hit',
          detail: 'Automated Bot Blocker & Brotli Static Edge Scrubber'
        },
        payload: {
          waf_status: 'RULE_BLOCK_SQLI: ACTIVE // 0 FP',
          ddos_capacity: '142 Tbps Anycast Mesh',
          edge_cache: 'HIT (max-age=31536000, immutable)',
          ssl_cert: 'ECDSA P-384 // A+ Security Rating'
        }
      },
      // 2. Nginx Ingress Reverse Proxy
      {
        id: 'nginx',
        name: 'Nginx HA Ingress',
        category: 'Load Balancer',
        region: 'Private Cloud VPC',
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
        },
        payload: {
          worker_processes: 'auto (8 Cores // 65,535 conns/core)',
          load_balancing: 'least_conn upstream_pool_prod',
          tcp_nodelay: 'on // zero-copy sendfile enabled',
          upstream_latency: '0.38ms average response'
        }
      },
      // 3. Docker Container Microservices Mesh (Upper Branch)
      {
        id: 'docker',
        name: 'Docker Microservices',
        category: 'Compute Cluster',
        region: 'Docker Engine Swarm',
        protocol: 'Node.js & FastAPI Microservices',
        x: w * 0.62,
        y: yTop,
        icon: '🐳',
        color: '#00f0ff',
        metrics: {
          throughput: '16 Replicas Live',
          latency: '1.80ms',
          state: 'Zero-Downtime Hot Swaps',
          detail: 'Auth JWT, Telehealth WebRTC & Tax Compilation Pods'
        },
        payload: {
          containers: 'auth_v3, ehr_webrtc_v2, tax_engine_v4',
          orchestration: 'Docker Compose v2.24 Auto-Restart',
          memory_footprint: '48.2 MB average per container',
          healthcheck: 'HTTP /healthz 200 OK (every 5s)'
        }
      },
      // 4. Redis In-Memory Cluster (Lower Branch)
      {
        id: 'redis',
        name: 'Redis In-Memory Tier',
        category: 'Cache & Pub/Sub',
        region: 'In-Memory RAM Bus',
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
        },
        payload: {
          used_memory_human: '124.6 MB (Zero memory leak)',
          connected_clients: '482 concurrent persistent sockets',
          instantaneous_ops: '18,400 ops/s throughput',
          cache_hit_rate: '99.42% (0.22ms RAM latency)'
        }
      },
      // 5. PostgreSQL Enterprise Primary (Upper Right)
      {
        id: 'postgres',
        name: 'PostgreSQL ACID DB',
        category: 'Relational Storage',
        region: 'Encrypted NVMe Pool',
        protocol: 'WAL Streaming Replication',
        x: w * 0.88,
        y: yTop,
        icon: '🗄️',
        color: '#a855f7',
        metrics: {
          throughput: '4,200 Trans/s',
          latency: '0.85ms',
          state: 'Primary + Replica',
          detail: 'Row-Level AES-256 Encryption & Strict ACID'
        },
        payload: {
          isolation_level: 'READ COMMITTED // ACID Strict',
          wal_replication_lag: '0.08ms streaming to replica',
          encryption: 'LUKS AES-256-XTS at rest',
          max_connections: '500 pooled (PgBouncer Active)'
        }
      },
      // 6. AWS S3 Encrypted Backup Vault (Lower Right)
      {
        id: 's3',
        name: 'AWS S3 Snapshot Vault',
        category: 'Offsite Cloud Backup',
        region: 'AWS us-east-1 Vault',
        protocol: 'HTTPS REST Object Store',
        x: w * 0.88,
        y: yBottom,
        icon: '☁️',
        color: '#0284c7',
        metrics: {
          throughput: '11 9s Durability',
          latency: '24.0ms',
          state: 'SHA-256 Immutable',
          detail: 'Automated Hourly WAL Backups & Static Asset Storage'
        },
        payload: {
          bucket_arn: 'arn:aws:s3:::pixeltocloud-vault-offsite',
          kms_key_id: 'alias/aws/s3-encrypted-wal',
          versioning: 'ENABLED (Object Lock Immutable 90 Days)',
          durability: '99.999999999% SLA'
        }
      }
    ];

    // Multi-Tier Branching Links
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
        const protoLabel = document.getElementById('topology-payload-protocol');
        if (protoLabel) protoLabel.textContent = `${this.currentProtocol.toUpperCase()} & TLS 1.3 (0-RTT)`;
        this.logSystemEvent(`🌐 Protocol switched to ${this.currentProtocol.toUpperCase()} (TLS 1.3 / Zero-RTT Handshake active)`, '#00f0ff');
        this.triggerShockwave(this.nodes[0]);
      });
    });

    // 3. Node Selector Pill Badges
    const nodePills = document.querySelectorAll('.topology-node-btn');
    nodePills.forEach(pill => {
      pill.addEventListener('click', () => {
        const nodeIdx = parseInt(pill.getAttribute('data-node'), 10);
        if (!isNaN(nodeIdx) && this.nodes[nodeIdx]) {
          this.selectNode(nodeIdx);
        }
      });
    });

    // 4. Canvas Node Click & Hover Inspection
    this.canvas.addEventListener('click', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      this.nodes.forEach((node, idx) => {
        const dist = Math.hypot(node.x - x, node.y - y);
        if (dist < 38) {
          this.selectNode(idx);
        }
      });
    });

    // Initial telemetry display
    if (this.nodes[this.activeNodeIndex]) {
      this.updateTelemetryCard(this.nodes[this.activeNodeIndex]);
    }
  }

  selectNode(idx) {
    this.activeNodeIndex = idx;
    const node = this.nodes[idx];
    if (!node) return;

    // Update pill button active states
    const nodePills = document.querySelectorAll('.topology-node-btn');
    nodePills.forEach(p => {
      if (parseInt(p.getAttribute('data-node'), 10) === idx) {
        p.classList.add('active');
      } else {
        p.classList.remove('active');
      }
    });

    // Shockwave animation & packet burst
    this.triggerShockwave(node);
    for (let i = 0; i < 8; i++) {
      this.spawnPacket({ fromNodeIdx: idx, isBurst: true });
    }
    this.oscillatorSpike = 12;

    this.updateTelemetryCard(node);
    this.logSystemEvent(`🔍 Node Inspected: [${node.name}] - Region: ${node.region} - Status: ${node.metrics.state}`, node.color);
  }

  triggerShockwave(node) {
    this.shockwaves.push({
      x: node.x,
      y: node.y,
      radius: 10,
      maxRadius: 65,
      alpha: 1,
      color: node.color
    });
  }

  updateTelemetryCard(node) {
    const targetName = document.getElementById('topology-target-name');
    const targetMeta = document.getElementById('topology-target-meta');
    const rpsEl = document.getElementById('topology-metric-rps');
    const latencyEl = document.getElementById('topology-metric-latency');
    const statusEl = document.getElementById('topology-metric-status');
    const descEl = document.getElementById('topology-telemetry-desc');

    if (targetName) targetName.innerHTML = `<span style="margin-right: 6px;">${node.icon}</span> ${node.name}`;
    if (targetMeta) targetMeta.textContent = `${node.category} // ${node.region}`;
    if (rpsEl) rpsEl.textContent = node.metrics.throughput;
    if (latencyEl) latencyEl.textContent = node.metrics.latency;
    if (statusEl) {
      statusEl.textContent = node.metrics.state;
      statusEl.style.color = node.color;
    }
    if (descEl && node.payload) {
      const keys = Object.keys(node.payload);
      descEl.innerHTML = keys.map(k => `
        <div style="background: rgba(255,255,255,0.02); padding: 8px 10px; border-radius: 4px; border-left: 2px solid ${node.color};">
          <span style="color: #64748b; text-transform: uppercase; font-size: 0.68rem; display: block;">${k}</span>
          <strong style="color: #e2e8f0; font-size: 0.74rem;">${node.payload[k]}</strong>
        </div>
      `).join('');
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
    this.oscillatorSpike = 20;
    this.logSystemEvent('⚡ [TRAFFIC SURGE]: 10,000 concurrent requests arriving across 4 multi-region PoPs.', '#f59e0b');

    for (let i = 0; i < 45; i++) {
      this.spawnPacket({ isSurge: true });
    }

    setTimeout(() => {
      this.logSystemEvent('✔ [AUTO-SCALED]: Nginx worker connections dynamically expanded (24k capacity reached | 0 packet drop).', '#10b981');
      this.currentScenario = 'normal';
    }, 3500);
  }

  triggerDDoS() {
    this.currentScenario = 'ddos';
    this.oscillatorSpike = 25;
    this.logSystemEvent('🚨 [DDOS ATTACK]: 50 Gbps SYN Flood / Layer 7 Attack detected on Anycast edge IP.', '#ef4444');

    for (let i = 0; i < 35; i++) {
      this.spawnPacket({ isThreat: true });
    }

    setTimeout(() => {
      this.logSystemEvent('🛡️ [WAF MITIGATION]: Cloudflare WAF + iptables scrubbed 100% of malicious packets. Zero backend latency change.', '#10b981');
      this.currentScenario = 'normal';
    }, 3000);
  }

  triggerFailover() {
    this.currentScenario = 'failover';
    this.oscillatorSpike = 16;
    this.logSystemEvent('🔄 [FAILOVER TEST]: PostgreSQL Primary node simulated reboot -> Read Replica promoted in 180ms.', '#a855f7');
    this.logSystemEvent('⚡ Redis cache cluster absorbed 100% of incoming reads during transition with 0.00s downtime.', '#10b981');

    setTimeout(() => {
      this.currentScenario = 'normal';
    }, 3000);
  }

  triggerBackup() {
    this.currentScenario = 'backup';
    this.logSystemEvent('☁️ [AWS S3 BACKUP]: Streaming PostgreSQL WAL snapshot to S3 Immutable Storage Bucket...', '#0284c7');

    for (let i = 0; i < 18; i++) {
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
    const isBurst = opts.isBurst || false;
    const fromNodeIdx = opts.fromNodeIdx !== undefined ? opts.fromNodeIdx : 0;

    let path = [0, 1, 2, Math.random() > 0.5 ? 3 : 4, 5];
    if (isThreat) {
      path = [0, 1]; // Blocked at Cloudflare Edge
    } else if (isBackup) {
      path = [5, 6]; // Database to S3
    } else if (isBurst) {
      if (fromNodeIdx === 0) path = [0, 1];
      else if (fromNodeIdx === 1) path = [1, 2];
      else if (fromNodeIdx === 2) path = [2, Math.random() > 0.5 ? 3 : 4];
      else if (fromNodeIdx === 3 || fromNodeIdx === 4) path = [fromNodeIdx, 5];
      else if (fromNodeIdx === 5) path = [5, 6];
      else path = [6, 5];
    }

    this.packets.push({
      path: path,
      pathStep: 0,
      progress: 0,
      speed: isSurge ? 0.038 : (isThreat ? 0.045 : (isBurst ? 0.032 : 0.018 + Math.random() * 0.008)),
      color: isThreat ? '#ef4444' : (isSurge ? '#fbbf24' : (isBackup ? '#0284c7' : '#00f0ff')),
      size: isThreat ? 4.5 : (isSurge ? 4 : (isBurst ? 4 : 3))
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

      if (this.oscillatorSpike > 0) {
        this.oscillatorSpike *= 0.94;
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

    // 2. Draw & Update Shockwaves
    for (let i = this.shockwaves.length - 1; i >= 0; i--) {
      const sw = this.shockwaves[i];
      sw.radius += 2.5;
      sw.alpha -= 0.035;

      if (sw.alpha <= 0) {
        this.shockwaves.splice(i, 1);
        continue;
      }

      ctx.beginPath();
      ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
      ctx.strokeStyle = sw.color;
      ctx.globalAlpha = Math.max(0, sw.alpha);
      ctx.lineWidth = 2.5;
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    // 3. Update and Draw Moving Packets
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

    // 4. Draw Nodes with Rings & Badges
    this.nodes.forEach((n, idx) => {
      const isSelected = idx === this.activeNodeIndex;
      const radius = isSelected ? 30 : 24;

      // Outer Halo Ring
      ctx.beginPath();
      ctx.arc(n.x, n.y, radius + (isSelected ? 6 + Math.sin(tick * 0.1) * 2 : 0), 0, Math.PI * 2);
      ctx.strokeStyle = isSelected ? n.color : 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = isSelected ? 2.5 : 1;
      ctx.stroke();

      // Node Body Circle
      const nodeGrad = ctx.createRadialGradient(n.x, n.y, 2, n.x, n.y, radius);
      nodeGrad.addColorStop(0, isSelected ? '#1e293b' : '#111827');
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
      ctx.fillStyle = isSelected ? n.color : 'rgba(255, 255, 255, 0.5)';
      ctx.fillText(n.category, n.x, n.y + radius + 25);
    });

    // 5. Draw Oscilloscope Latency Waveform at Bottom Left
    const ox = 20;
    const oy = h - 24;
    const ow = 130;
    const oh = 18;

    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(ox - 4, oy - 14, ow + 8, oh + 16);
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.2)';
    ctx.strokeRect(ox - 4, oy - 14, ow + 8, oh + 16);

    ctx.font = '8px Fira Code, monospace';
    ctx.fillStyle = '#00f0ff';
    ctx.textAlign = 'left';
    ctx.fillText(`RTT OSCILLOSCOPE: ${(0.45 + (this.oscillatorSpike * 0.05)).toFixed(2)}ms`, ox, oy - 4);

    ctx.beginPath();
    ctx.strokeStyle = this.oscillatorSpike > 5 ? '#f59e0b' : '#10b981';
    ctx.lineWidth = 1.5;
    for (let x = 0; x < ow; x += 4) {
      const amp = 5 + this.oscillatorSpike * 0.4;
      const freq = Math.sin(tick * 0.15 + x * 0.2) * amp;
      const py = oy + 8 + freq;
      if (x === 0) ctx.moveTo(ox + x, py);
      else ctx.lineTo(ox + x, py);
    }
    ctx.stroke();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.systemTopologyInstance = new AdvancedSystemTopologyEngine();
});
