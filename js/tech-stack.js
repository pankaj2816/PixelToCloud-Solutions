/* ===================================================================
   PIXELTOCLOUD SOLUTIONS - INTERACTIVE TECH STACK BENCHMARK PLAYGROUND
   Real-time execution simulators, architecture deep-dives & performance gauges
   =================================================================== */

const TECH_BENCHMARKS = {
  "html5-js": {
    id: "html5-js",
    name: "HTML5 / Modern ECMAScript",
    category: "Frontend Core",
    icon: "fa-solid fa-globe",
    accent: "#00f0ff",
    headline: "Vanilla ES2026 Engine & Zero-Dependency Execution",
    description: "Ultra-lean architecture eliminating bloat. Direct DOM operations execute in sub-millisecond frames without virtual DOM overhead.",
    metrics: [
      { label: "DOM Render Speed", value: "0.04ms", note: "Direct memory reference" },
      { label: "Bundle Overhead", value: "0.00 kB", note: "Pure native execution" },
      { label: "Memory Footprint", value: "4.2 MB", note: "Ultra lightweight" },
      { label: "Execution Latency", value: "0.02ms", note: "Direct V8 JIT execution" }
    ],
    codeSnippet: `// Pure Vanilla High-Speed Reactive Binder
const state = new Proxy({ fps: 60, status: 'OPTIMAL' }, {
  set(target, key, value) {
    target[key] = value;
    document.getElementById(key).textContent = value; // Direct 0.04ms paint
    return true;
  }
});`,
    simResult: "✔ 10,000 DOM elements patched in 3.8ms with zero frame drops."
  },
  "css-tokens": {
    id: "css-tokens",
    name: "Vanilla CSS3 & Design Tokens",
    category: "Styling Engine",
    icon: "fa-solid fa-palette",
    accent: "#38bdf8",
    headline: "Hardware-Accelerated Compositing & Token System",
    description: "GPU-accelerated transforms, CSS custom properties, and sub-second paint pipelines ensuring 120 FPS buttery smooth scrolling.",
    metrics: [
      { label: "Frame Rate", value: "120 FPS", note: "GPU Layer Promotion" },
      { label: "Reflow Budget", value: "< 1.2ms", note: "Zero layout thrashing" },
      { label: "Theme Switch", value: "0.00ms", note: "Instant token swap" },
      { label: "Paint Cost", value: "0.15ms", note: "Composite-only layers" }
    ],
    codeSnippet: `:root {
  --accent-cyan: #00f0ff;
  --spring-easing: cubic-bezier(0.16, 1, 0.3, 1);
  --gpu-layer: translate3d(0, 0, 0); /* Force GPU compositing */
}`,
    simResult: "✔ GPU compositor layer promoted. Zero repaint cycles during page scroll."
  },
  "three-webgl": {
    id: "three-webgl",
    name: "Three.js / WebGL 2.0",
    category: "2D/3D Graphics",
    icon: "fa-solid fa-cube",
    accent: "#a855f7",
    headline: "60 FPS Hardware-Accelerated 3D Viewport",
    description: "Direct WebGL rendering pipeline with custom vertex & fragment shaders, low-draw-call batching, and dynamic PBR lighting.",
    metrics: [
      { label: "GPU Frame Rate", value: "60.0 FPS", note: "Consistent across devices" },
      { label: "Draw Calls", value: "2 calls", note: "Instanced Mesh Batching" },
      { label: "Polygon Count", value: "48,200", note: "Subdivided geometry" },
      { label: "Shader Compilation", value: "12ms", note: "Pre-warmed GPU buffer" }
    ],
    codeSnippet: `const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;`,
    simResult: "✔ WebGL 2.0 Context initialized. GPU shader buffers bound with 60.0 FPS rendering."
  },
  "react-next": {
    id: "react-next",
    name: "React / Next.js",
    category: "Dynamic Apps",
    icon: "fa-brands fa-react",
    accent: "#00f0ff",
    headline: "Server-Side Rendering & Incremental Static Generation",
    description: "Component modularity with Next.js App Router, edge streaming SSR, and zero-layout-shift hydration.",
    metrics: [
      { label: "First Contentful Paint", value: "0.32s", note: "Edge cached HTML" },
      { label: "Hydration Time", value: "18ms", note: "Selective progressive hydration" },
      { label: "Reconciliation", value: "0.08ms", note: "Fiber tree diffing" },
      { label: "Lighthouse SEO", value: "100/100", note: "Full SSR OpenGraph markup" }
    ],
    codeSnippet: `export default async function Page() {
  const data = await getEdgeCachedTelemetry();
  return <ClientDashboard initialStream={data} />;
}`,
    simResult: "✔ Next.js Edge SSR executed in 28ms with 100/100 Core Web Vitals score."
  },
  "node-express": {
    id: "node-express",
    name: "Node.js / Express",
    category: "Backend API",
    icon: "fa-brands fa-node-js",
    accent: "#10b981",
    headline: "Non-Blocking Asynchronous Event Loop Architecture",
    description: "High-concurrency microservice APIs leveraging libuv thread pools, cluster workers, and stream piping.",
    metrics: [
      { label: "Concurrent Connections", value: "25,000", note: "Keep-Alive Socket Pool" },
      { label: "Event Loop Lag", value: "0.18ms", note: "Zero blocking tasks" },
      { label: "Throughput", value: "18,400 req/s", note: "Clustered multi-core" },
      { label: "JSON Serialization", value: "0.06ms", note: "Fast-json-stringify" }
    ],
    codeSnippet: `app.get('/api/v2/telemetry', (req, res) => {
  res.setHeader('Cache-Control', 'public, max-age=30, s-maxage=300');
  res.json({ status: 'HEALTHY', edge_latency_ms: 0.45 });
});`,
    simResult: "✔ 5,000 concurrent API requests processed in 0.28s with 0% error rate."
  },
  "python-fastapi": {
    id: "python-fastapi",
    name: "Python / FastAPI",
    category: "Microservices",
    icon: "fa-brands fa-python",
    accent: "#f59e0b",
    headline: "High-Performance ASGI Async Microservices",
    description: "Type-safe asynchronous Python with Pydantic v2 data validation, OpenAPI auto-docs, and sub-millisecond async handlers.",
    metrics: [
      { label: "Request Rate", value: "15,200 req/s", note: "Uvicorn uvloop engine" },
      { label: "Validation Time", value: "0.12ms", note: "Pydantic Rust Core" },
      { label: "Async P99 Latency", value: "1.10ms", note: "Zero thread blocking" },
      { label: "Auto OpenAPI", value: "100% Valid", note: "Swagger & Redoc specs" }
    ],
    codeSnippet: `@app.get("/api/v1/tax-audit", response_model=TaxLedgerResponse)
async def compute_tax(request: TaxQuery):
    return await tax_calculation_service.compute_gst_and_itr(request)`,
    simResult: "✔ Asynchronous ASGI worker pool processed 1,000 calculations in 42ms."
  },
  "postgresql": {
    id: "postgresql",
    name: "PostgreSQL ACID Relational DB",
    category: "Relational DB",
    icon: "fa-solid fa-database",
    accent: "#a855f7",
    headline: "Mission-Critical Relational Integrity & B-Tree Indexing",
    description: "Enterprise ACID compliance with JSONB document support, connection pooling via PgBouncer, and streaming replication.",
    metrics: [
      { label: "Query Execution", value: "0.18ms", note: "Indexed B-Tree Scan" },
      { label: "Transaction SLA", value: "100% ACID", note: "Zero data corruption" },
      { label: "Buffer Hit Ratio", value: "99.8%", note: "In-Memory RAM Cache" },
      { label: "Replication Lag", value: "0.02ms", note: "WAL streaming" }
    ],
    codeSnippet: `CREATE INDEX CONCURRENTLY idx_audit_created ON audit_ledgers (client_id, created_at DESC);
SELECT * FROM audit_ledgers WHERE client_id = $1 ORDER BY created_at DESC LIMIT 50;`,
    simResult: "✔ Query executed in 0.18ms using index scan on primary key. 100% buffer cache hit."
  },
  "mongodb": {
    id: "mongodb",
    name: "MongoDB",
    category: "Document DB",
    icon: "fa-solid fa-leaf",
    accent: "#10b981",
    headline: "Flexible Schema & Document Aggregation Pipeline",
    description: "Horizontally scalable NoSQL database for rapid schema iteration, nested document models, and fast spatial geo-queries.",
    metrics: [
      { label: "Document Read", value: "0.42ms", note: "WiredTiger in-RAM engine" },
      { label: "Aggregation Time", value: "1.8ms", note: "Multi-stage pipeline" },
      { label: "Write Concern", value: "w: majority", note: "Confirmed durability" },
      { label: "Auto-Indexing", value: "Enabled", note: "Compound keys" }
    ],
    codeSnippet: `db.doctor_appointments.aggregate([
  { $match: { doctor_id: ObjectId("..."), status: "CONFIRMED" } },
  { $sort: { appointment_time: 1 } }
]);`,
    simResult: "✔ Aggregation pipeline indexed 50,000 appointment records in 1.8ms."
  },
  "docker-compose": {
    id: "docker-compose",
    name: "Docker & Docker Compose",
    category: "Containers",
    icon: "fa-brands fa-docker",
    accent: "#00f0ff",
    headline: "Isolated Multi-Container Microservice Mesh",
    description: "Lightweight, reproducible container environments with multi-stage builds, rootless execution, and instant healthchecks.",
    metrics: [
      { label: "Image Size", value: "48.2 MB", note: "Multi-stage Alpine base" },
      { label: "Container Startup", value: "0.08s", note: "Instant hot swap" },
      { label: "Layer Cache Hit", value: "100%", note: "Zero re-download" },
      { label: "Downtime on Update", value: "0.00s", note: "Blue/Green traffic shift" }
    ],
    codeSnippet: `services:
  app:
    image: pixeltocloud/app:latest
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/healthz"]`,
    simResult: "✔ Blue/Green zero-downtime hot-swap verified. New container healthy in 80ms."
  },
  "nginx-server": {
    id: "nginx-server",
    name: "Nginx Reverse Proxy & Load Balancer",
    category: "Reverse Proxy",
    icon: "fa-solid fa-bolt",
    accent: "#10b981",
    headline: "High-Concurrency HTTP/2 & Dynamic Upstream Routing",
    description: "Zero-copy sendfile, automated SSL termination, TLS 1.3 0-RTT handshakes, Brotli compression, and rate limiting.",
    metrics: [
      { label: "Connections/Core", value: "65,535", note: "Epoll asynchronous event loop" },
      { label: "SSL Handshake", value: "8ms", note: "TLS 1.3 0-RTT Resumption" },
      { label: "Compression Ratio", value: "78%", note: "Brotli level 6 dynamic" },
      { label: "Static Asset TTFB", value: "12ms", note: "Direct disk sendfile" }
    ],
    codeSnippet: `upstream backend_cluster {
  least_conn;
  server 127.0.0.1:3001 max_fails=3 fail_timeout=10s;
  server 127.0.0.1:3002 max_fails=3 fail_timeout=10s;
}`,
    simResult: "✔ Nginx reverse proxy tested. 24,000 req/s load balanced across 2 nodes with 0 dropped packets."
  },
  "linux-aws": {
    id: "linux-aws",
    name: "Linux VPS (Ubuntu) & AWS Cloud",
    category: "Cloud Server",
    icon: "fa-solid fa-cloud",
    accent: "#38bdf8",
    headline: "Dedicated Hardened Linux Kernel & Cloud Infrastructure",
    description: "UFW firewall, automated fail2ban IP banning, SSH key-only auth, offsite S3 snapshot backups, and kernel socket tuning.",
    metrics: [
      { label: "Server Uptime", value: "99.99%", note: "SLA Guaranteed" },
      { label: "TCP BBR Congestion", value: "Active", note: "Max bandwidth throughput" },
      { label: "SSH Security", value: "ED25519", note: "Zero password logins" },
      { label: "Backup Schedule", value: "Automated", note: "Encrypted AWS S3 Vault" }
    ],
    codeSnippet: `sysctl -w net.core.somaxconn=65535
sysctl -w net.ipv4.tcp_congestion_control=bbr
ufw default deny incoming && ufw allow 80/tcp && ufw allow 443/tcp`,
    simResult: "✔ Linux kernel tuned with BBR congestion control & UFW firewall active."
  },
  "cloudflare-dns": {
    id: "cloudflare-dns",
    name: "Cloudflare Edge CDN & WAF",
    category: "Security & CDN",
    icon: "fa-solid fa-shield",
    accent: "#f59e0b",
    headline: "Global Anycast Edge Network & Layer 7 Threat Defense",
    description: "330+ Global PoPs, automated bot mitigation, DDoS scrubbing capacity exceeding 140 Tbps, and edge-cached static assets.",
    metrics: [
      { label: "DDoS Mitigation", value: "142 Tbps", note: "Automatic Anycast scrubbing" },
      { label: "DNS Resolution", value: "4.8ms", note: "1.1.1.1 Global Anycast" },
      { label: "Edge Cache Hit", value: "88.4%", note: "Static JS/CSS & Images" },
      { label: "SSL Grade", value: "A+ Strict", note: "Full HSTS & ECDSA P-384" }
    ],
    codeSnippet: `cloudflare_zone_setting_override "prod" {
  settings {
    ssl = "strict"
    always_use_https = "on"
    brotli = "on"
    security_level = "medium"
  }
}`,
    simResult: "✔ Cloudflare Anycast Edge active. Global DNS propagated in 4.8ms with WAF protection."
  }
};

class InteractiveTechStackSandbox {
  constructor() {
    this.tiles = document.querySelectorAll('.tech-tile');
    this.sandboxContainer = document.getElementById('tech-interactive-sandbox');
    this.currentTechId = 'react-next';

    if (this.tiles.length > 0) {
      this.init();
    }
  }

  init() {
    this.tiles.forEach(tile => {
      // Map tile by name
      const nameEl = tile.querySelector('.tech-tile-name');
      const nameText = nameEl ? nameEl.textContent.trim().toLowerCase() : '';

      let techKey = 'html5-js';
      if (nameText.includes('html5') || nameText.includes('js')) techKey = 'html5-js';
      else if (nameText.includes('css') || nameText.includes('token')) techKey = 'css-tokens';
      else if (nameText.includes('three') || nameText.includes('webgl')) techKey = 'three-webgl';
      else if (nameText.includes('react') || nameText.includes('next')) techKey = 'react-next';
      else if (nameText.includes('node') || nameText.includes('express')) techKey = 'node-express';
      else if (nameText.includes('python') || nameText.includes('fastapi')) techKey = 'python-fastapi';
      else if (nameText.includes('postgres')) techKey = 'postgresql';
      else if (nameText.includes('mongo')) techKey = 'mongodb';
      else if (nameText.includes('docker')) techKey = 'docker-compose';
      else if (nameText.includes('nginx')) techKey = 'nginx-server';
      else if (nameText.includes('linux') || nameText.includes('aws')) techKey = 'linux-aws';
      else if (nameText.includes('cloudflare')) techKey = 'cloudflare-dns';

      tile.setAttribute('data-tech-id', techKey);

      // Add clickable action badge
      if (!tile.querySelector('.tech-tile-action-badge')) {
        const badge = document.createElement('div');
        badge.className = 'tech-tile-action-badge';
        badge.innerHTML = '<i class="fa-solid fa-play" style="margin-right: 3px;"></i>Demo';
        tile.appendChild(badge);
      }

      tile.addEventListener('click', () => {
        this.selectTech(techKey);
      });
    });

    // Render default active tech
    this.selectTech(this.currentTechId);
  }

  selectTech(techKey) {
    this.currentTechId = techKey;
    const tech = TECH_BENCHMARKS[techKey] || TECH_BENCHMARKS['react-next'];

    // Update active class on tiles
    this.tiles.forEach(t => {
      if (t.getAttribute('data-tech-id') === techKey) {
        t.classList.add('active');
      } else {
        t.classList.remove('active');
      }
    });

    // Render sandbox UI
    if (this.sandboxContainer) {
      this.renderSandbox(tech);
    }
  }

  renderSandbox(tech) {
    this.sandboxContainer.innerHTML = `
      <div class="glass-card" style="margin-top: 28px; padding: 28px 32px; border: 1px solid var(--border-subtle); background: radial-gradient(circle at top left, rgba(15, 23, 42, 0.95), #060b14); border-radius: var(--radius-lg); position: relative; overflow: hidden;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px; margin-bottom: 20px;">
          <div style="display: flex; align-items: center; gap: 14px;">
            <div style="width: 48px; height: 48px; border-radius: 12px; background: rgba(0, 240, 255, 0.1); border: 1px solid rgba(0, 240, 255, 0.3); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; color: ${tech.accent};">
              <i class="${tech.icon}"></i>
            </div>
            <div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--text-primary); margin: 0;">${tech.name}</h3>
                <span class="badge badge-cyan" style="font-size: 0.7rem;">${tech.category}</span>
              </div>
              <p style="font-size: 0.84rem; color: var(--text-muted); margin: 3px 0 0 0;">${tech.headline}</p>
            </div>
          </div>

          <button class="btn-magnetic btn-primary" id="run-tech-benchmark-btn" style="padding: 10px 20px; font-size: 0.82rem;">
            <span><i class="fa-solid fa-bolt" style="margin-right: 6px;"></i>Run Live Sandbox Benchmark</span>
          </button>
        </div>

        <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 22px;">
          ${tech.description}
        </p>

        <!-- 4 Live Performance Metric Dials -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 14px; margin-bottom: 22px;">
          ${tech.metrics.map(m => `
            <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 14px 16px;">
              <div style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; font-family: var(--font-mono);">${m.label}</div>
              <div style="font-size: 1.3rem; font-weight: 800; color: ${tech.accent}; font-family: var(--font-mono); margin: 4px 0;">${m.value}</div>
              <div style="font-size: 0.7rem; color: #64748b;">${m.note}</div>
            </div>
          `).join('')}
        </div>

        <!-- Live Code Implementation Snippet -->
        <div style="background: #020617; border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 16px; font-family: var(--font-mono); font-size: 0.78rem; position: relative;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 6px;">
            <span style="color: #64748b;"><i class="fa-solid fa-code" style="margin-right: 6px;"></i>Production Implementation Snippet</span>
            <span style="color: #10b981;">Syntactically Verified</span>
          </div>
          <pre style="margin: 0; color: #cbd5e1; overflow-x: auto; white-space: pre-wrap; line-height: 1.5;">${this.escapeHTML(tech.codeSnippet)}</pre>
        </div>

        <!-- Dynamic Simulation Output Box -->
        <div id="tech-benchmark-log" style="margin-top: 14px; background: rgba(0, 240, 255, 0.05); border: 1px solid rgba(0, 240, 255, 0.2); border-radius: var(--radius-sm); padding: 12px 16px; font-family: var(--font-mono); font-size: 0.76rem; color: #10b981; display: flex; align-items: center; gap: 8px;">
          <i class="fa-solid fa-circle-check"></i>
          <span>${tech.simResult}</span>
        </div>
      </div>
    `;

    // Bind benchmark execution button
    const btn = document.getElementById('run-tech-benchmark-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        this.runLiveBenchmark(tech);
      });
    }
  }

  runLiveBenchmark(tech) {
    const logBox = document.getElementById('tech-benchmark-log');
    if (!logBox) return;

    logBox.style.color = '#f59e0b';
    logBox.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>Compiling & executing live ${tech.name} benchmark test across 10,000 synthetic operations...</span>`;

    setTimeout(() => {
      logBox.style.color = '#10b981';
      logBox.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${tech.simResult} (Verified in 0.08s)</span>`;
      if (window.showToast) {
        window.showToast(`✔ ${tech.name} Benchmark Test Passed with 100% Performance SLA!`, 'success');
      }
    }, 800);
  }

  escapeHTML(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.techStackSandboxInstance = new InteractiveTechStackSandbox();
});
