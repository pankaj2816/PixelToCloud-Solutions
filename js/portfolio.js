/* ===================================================================
   BHAVYANSH TECH STUDIO - PORTFOLIO & INTERACTIVE SIMULATORS
   Dynamic project showcase, category filtering, and live demo modals
   =================================================================== */

const PROJECTS_DATA = [
  {
    id: "ca-website",
    title: "FinTax Pro - CA & Financial Enterprise Hub",
    category: "fintech",
    categoryLabel: "FinTech & CA Systems",
    badge: "Enterprise FinTech",
    badgeClass: "badge-cyan",
    tagline: "High-security financial portal with automated tax engines & compliance ledger",
    description: "A comprehensive digital ecosystem built for Chartered Accountants and wealth management firms. Features automated GST & Income Tax calculation engines, secure client document lockers with 256-bit AES encryption, real-time audit trail tracking, and instant invoicing.",
    specs: {
      "Architecture": "Cloud-Native SPA + Microservices",
      "Compliance": "GSTN API & Bank Grade Security",
      "Deployment": "AWS ECS + Automated Backups",
      "Performance": "99.8% PageSpeed (0.5s TTI)"
    },
    techStack: ["JavaScript / ES6+", "FinTech Tax API", "Node.js Microservices", "PostgreSQL", "Docker", "Nginx SSL"],
    previewType: "fintech-calc",
    accentColor: "#00f0ff"
  },
  {
    id: "3d-software",
    title: "Nebula3D - Interactive 2D/3D WebGL Engine",
    category: "3d-software",
    categoryLabel: "2D/3D & Graphics Software",
    badge: "WebGL / Three.js",
    badgeClass: "badge-purple",
    tagline: "Real-time 60FPS browser-based 3D model visualizer and CAD configuration tool",
    description: "An advanced browser-based 2D/3D graphics application engineered with custom WebGL shaders and Three.js. Supports live geometry manipulation, realistic PBR materials, dynamic studio lighting, wireframe toggling, and instant 3D model export.",
    specs: {
      "Rendering": "Hardware Accelerated WebGL 2.0",
      "Frame Rate": "Consistent 60 FPS on all devices",
      "Controls": "Full Orbit / Pan / Zoom / Lighting",
      "Asset Support": "GLTF / OBJ / Custom Shaders"
    },
    techStack: ["Three.js", "WebGL 2.0", "GLSL Shaders", "HTML5 Canvas", "Web Workers", "Vite"],
    previewType: "3d-sandbox",
    accentColor: "#8b5cf6"
  },
  {
    id: "doctor-website",
    title: "MedPulse - Doctor & Telehealth Management Portal",
    category: "healthcare",
    categoryLabel: "Doctor & Healthcare",
    badge: "HIPAA Compliant",
    badgeClass: "badge-emerald",
    tagline: "Smart doctor scheduling, video consultation rooms & digital EHR records",
    description: "Full-scale medical and clinic management platform designed for doctors, polyclinics, and hospitals. Includes instant patient appointment booking with calendar synchronization, digital prescription generation, telemedicine video rooms, and patient history records.",
    specs: {
      "Security": "HIPAA & GDPR Standards Compliant",
      "Scheduling": "Real-time Calendar Sync Engine",
      "Integrations": "SMS/WhatsApp Booking Alerts",
      "Hosting": "High-Availability VPS + Daily Backups"
    },
    techStack: ["React / Modern JS", "WebRTC Video", "Express Backend", "MongoDB", "Redis Cache", "Cloudflare DNS"],
    previewType: "doctor-booking",
    accentColor: "#10b981"
  },
  {
    id: "art-craft-website",
    title: "ArtisanVogue - Luxury Art & Craft Boutique",
    category: "ecommerce",
    categoryLabel: "Art & E-Commerce",
    badge: "Creative E-Commerce",
    badgeClass: "badge-amber",
    tagline: "Bespoke handcrafted showcase with 360° zoom & custom commission studio",
    description: "A luxury art, craft, and bespoke sculpture boutique website. Engineered with rich micro-animations, dynamic masonry galleries, 360-degree interactive artwork inspectors, multi-currency global checkout, and custom artisan commission ordering workflows.",
    specs: {
      "Image Engine": "Adaptive WebP / Cloud CDN",
      "Checkout": "Multi-Currency Stripe & Razorpay",
      "Interactivity": "Ultra-Smooth Parallax & Zoom",
      "SEO": "100/100 Structured Rich Snippets"
    },
    techStack: ["Modern CSS3", "Canvas Zoom Engine", "Stripe API", "Node.js", "AWS S3 Bucket", "Fastly CDN"],
    previewType: "artisan-gallery",
    accentColor: "#f59e0b"
  },
  {
    id: "cloud-devops",
    title: "ApexCloud - Server Architecture & DevOps Suite",
    category: "devops",
    categoryLabel: "Cloud & DevOps",
    badge: "Cloud Infrastructure",
    badgeClass: "badge-blue",
    tagline: "Automated Docker CI/CD, Nginx reverse proxy & 99.99% uptime cluster",
    description: "Enterprise cloud orchestration suite showcasing zero-downtime blue/green deployment pipelines, containerized Docker microservices, automated Let's Encrypt SSL renewals, Linux VPS hardening, and real-time server health monitoring dashboards.",
    specs: {
      "Uptime": "99.99% Guaranteed SLA",
      "Pipeline": "Git Push to Live Deployment in 45s",
      "Security": "Fail2ban, UFW, Cloudflare WAF",
      "Monitoring": "Prometheus & Grafana Real-Time"
    },
    techStack: ["Linux Ubuntu VPS", "Docker & Compose", "Nginx Reverse Proxy", "Let's Encrypt SSL", "Bash Automation", "Git CI/CD"],
    previewType: "server-monitor",
    accentColor: "#3b82f6"
  },
  {
    id: "corporate-saas",
    title: "Nexure Enterprise - Corporate SaaS & Custom ERP",
    category: "web-dev",
    categoryLabel: "Web Development",
    badge: "Custom SaaS",
    badgeClass: "badge-cyan",
    tagline: "Scalable enterprise web application with dynamic business intelligence dashboards",
    description: "A high-load enterprise web application delivering comprehensive workflow management, real-time data analytics, role-based user hierarchies, and multi-tenant database partitioning built for rapid scale.",
    specs: {
      "Throughput": "10,000+ Concurrent Requests",
      "Data Sync": "WebSocket Real-time Updates",
      "Auth": "OAuth2 / JWT / MFA Security",
      "Database": "Optimized Indexed PostgreSQL"
    },
    techStack: ["Next.js / Vanilla JS", "Tailored CSS", "REST & GraphQL", "PostgreSQL", "Docker", "AWS Lightsail"],
    previewType: "saas-analytics",
    accentColor: "#00f0ff"
  }
];

class PortfolioManager {
  constructor() {
    this.grid = document.getElementById('portfolio-grid');
    this.filterButtons = document.querySelectorAll('.filter-btn');
    this.searchInput = document.getElementById('portfolio-search-input');
    this.modalOverlay = document.getElementById('portfolio-modal-overlay');
    this.modalContainer = document.getElementById('portfolio-modal-content');
    this.activeFilter = 'all';
    this.searchQuery = '';
    this.currentSimInstance = null;

    this.init();
  }

  init() {
    this.renderProjects(this.activeFilter);
    this.bindFilterEvents();
    this.bindSearchEvents();
    this.bindModalCloseEvents();
  }

  bindFilterEvents() {
    this.filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeFilter = btn.getAttribute('data-filter');
        this.renderProjects(this.activeFilter);
      });
    });
  }

  bindSearchEvents() {
    if (!this.searchInput) {
      this.searchInput = document.getElementById('portfolio-search-input');
    }
    if (!this.searchInput) return;
    this.searchInput.addEventListener('input', (e) => {
      this.searchQuery = e.target.value.toLowerCase().trim();
      this.renderProjects(this.activeFilter);
    });
  }

  renderProjects(filter) {
    if (!this.grid) return;

    const isFeatured = this.grid.hasAttribute('data-featured');

    let filtered = PROJECTS_DATA;

    // Apply category filter if set and no search query
    if (filter !== 'all' && !this.searchQuery) {
      filtered = filtered.filter(p => p.category === filter);
    }

    // Apply search query across all fields if present
    if (this.searchQuery) {
      filtered = PROJECTS_DATA.filter(p => 
        p.title.toLowerCase().includes(this.searchQuery) ||
        p.tagline.toLowerCase().includes(this.searchQuery) ||
        p.description.toLowerCase().includes(this.searchQuery) ||
        p.categoryLabel.toLowerCase().includes(this.searchQuery) ||
        p.badge.toLowerCase().includes(this.searchQuery) ||
        p.techStack.some(t => t.toLowerCase().includes(this.searchQuery))
      );
    }

    if (isFeatured) {
      filtered = filtered.slice(0, 4); // Featured limit on homepage
    }

    this.grid.innerHTML = '';

    if (filtered.length === 0) {
      this.grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 50px 20px;" class="glass-card">
          <i class="fa-solid fa-magnifying-glass" style="font-size: 2.5rem; color: var(--text-muted); margin-bottom: 14px; display: block;"></i>
          <h3 style="font-size: 1.3rem; font-weight: 700; color: var(--text-primary); margin-bottom: 8px;">
            No Projects Found matching "${this.searchQuery}"
          </h3>
          <p style="color: var(--text-secondary); font-size: 0.92rem; margin-bottom: 20px;">
            Try searching for "WebGL", "CA Tax", "Doctor", "React", "DevOps", or "E-Commerce".
          </p>
          <button class="btn-magnetic btn-primary" id="reset-search-btn" style="padding: 10px 24px;">
            <span>Clear Search & Show All</span>
          </button>
        </div>
      `;

      const resetBtn = document.getElementById('reset-search-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          if (this.searchInput) this.searchInput.value = '';
          this.searchQuery = '';
          this.activeFilter = 'all';
          this.filterButtons.forEach(b => b.classList.remove('active'));
          if (this.filterButtons[0]) this.filterButtons[0].classList.add('active');
          this.renderProjects('all');
        });
      }
      return;
    }

    filtered.forEach((project, index) => {
      const card = document.createElement('div');
      card.className = `glass-card project-card reveal active reveal-delay-${(index % 4) + 1}`;
      card.setAttribute('data-id', project.id);

      card.innerHTML = `
        <div class="project-thumbnail-wrap">
          ${this.generateThumbnailVisual(project)}
          <div class="project-overlay-badge">
            <span class="badge ${project.badgeClass}">${project.badge}</span>
          </div>
          <div class="project-live-action-badge">
            <span class="live-status-dot"></span> Interactive Live Demo
          </div>
        </div>

        <div class="project-card-body">
          <div style="color: ${project.accentColor}; font-size: 0.8rem; font-family: var(--font-mono); margin-bottom: 6px; font-weight: 600;">
            ${project.categoryLabel}
          </div>
          <h3 class="project-title">${project.title}</h3>
          <p class="project-desc">${project.tagline}</p>

          <div class="project-specs-grid">
            <div class="spec-item">
              <span class="spec-label">Tech</span>
              <span class="spec-val">${project.techStack[0]}</span>
            </div>
            <div class="spec-item">
              <span class="spec-label">Platform</span>
              <span class="spec-val">Web & Cloud</span>
            </div>
          </div>

          <div class="project-card-actions">
            <button class="btn-outline view-demo-btn" data-id="${project.id}" style="width: 100%; justify-content: center; display: flex; align-items: center; gap: 8px;">
              <span>Launch Interactive Preview</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      `;

      // Bind click on button or whole card
      card.querySelector('.view-demo-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        this.openModal(project.id);
      });

      card.addEventListener('click', () => {
        this.openModal(project.id);
      });

      this.grid.appendChild(card);
    });
  }

  generateThumbnailVisual(project) {
    // High-tech responsive SVG vector preview card
    switch (project.previewType) {
      case 'fintech-calc':
        return `
          <svg viewBox="0 0 400 240" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="background:#0a0f1d;">
            <defs>
              <linearGradient id="finGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#00f0ff" stop-opacity="0.8"/>
                <stop offset="100%" stop-color="#3b82f6" stop-opacity="0.3"/>
              </linearGradient>
            </defs>
            <rect x="25" y="25" width="350" height="190" rx="12" fill="#10172a" stroke="rgba(0,240,255,0.3)" stroke-width="1.5"/>
            <rect x="45" y="45" width="120" height="24" rx="4" fill="rgba(0,240,255,0.15)"/>
            <text x="55" y="61" fill="#00f0ff" font-size="11" font-family="monospace" font-weight="bold">TAX_LEDGER // ₹ 12.4L</text>
            <!-- Chart line -->
            <path d="M 45 160 Q 100 130 150 145 T 250 90 T 355 70" fill="none" stroke="url(#finGrad)" stroke-width="3.5"/>
            <circle cx="355" cy="70" r="5" fill="#00f0ff"/>
            <!-- Stat bars -->
            <rect x="45" y="90" width="40" height="70" rx="4" fill="rgba(0,240,255,0.1)"/>
            <rect x="95" y="110" width="40" height="50" rx="4" fill="rgba(0,240,255,0.2)"/>
            <rect x="145" y="80" width="40" height="80" rx="4" fill="rgba(0,240,255,0.3)"/>
            <rect x="195" y="100" width="40" height="60" rx="4" fill="rgba(59,130,246,0.3)"/>
          </svg>
        `;
      case '3d-sandbox':
        return `
          <svg viewBox="0 0 400 240" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="background:#0d081a;">
            <defs>
              <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#c084fc"/>
                <stop offset="100%" stop-color="#8b5cf6"/>
              </linearGradient>
            </defs>
            <circle cx="200" cy="120" r="75" fill="none" stroke="rgba(139,92,246,0.25)" stroke-width="1.5" stroke-dasharray="6,4"/>
            <!-- 3D Cube Isometric Representation -->
            <g transform="translate(200, 115)">
              <!-- Top Face -->
              <polygon points="0,-45 45,-20 0,5 -45,-20" fill="rgba(192,132,252,0.4)" stroke="#c084fc" stroke-width="1.5"/>
              <!-- Left Face -->
              <polygon points="-45,-20 0,5 0,55 -45,30" fill="rgba(139,92,246,0.6)" stroke="#8b5cf6" stroke-width="1.5"/>
              <!-- Right Face -->
              <polygon points="0,5 45,-20 45,30 0,55" fill="rgba(109,40,217,0.8)" stroke="#8b5cf6" stroke-width="1.5"/>
            </g>
            <text x="200" y="205" text-anchor="middle" fill="#c084fc" font-size="11" font-family="monospace">WEBGL 3D SHADER ENGINE</text>
          </svg>
        `;
      case 'doctor-booking':
        return `
          <svg viewBox="0 0 400 240" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="background:#071612;">
            <rect x="30" y="30" width="340" height="180" rx="12" fill="#0b241d" stroke="rgba(16,185,129,0.3)" stroke-width="1.5"/>
            <!-- Heartbeat Pulse Line -->
            <path d="M 45 120 L 120 120 L 135 85 L 155 155 L 175 95 L 190 135 L 205 120 L 355 120" fill="none" stroke="#10b981" stroke-width="3"/>
            <circle cx="175" cy="95" r="5" fill="#34d399"/>
            <!-- Doctor Badge -->
            <rect x="45" y="45" width="130" height="26" rx="6" fill="rgba(16,185,129,0.2)"/>
            <text x="55" y="62" fill="#34d399" font-size="11" font-family="monospace" font-weight="bold">+ CLINIC PORTAL</text>
            <rect x="45" y="160" width="90" height="28" rx="6" fill="#10b981"/>
            <text x="90" y="178" text-anchor="middle" fill="#051c14" font-size="10" font-family="sans-serif" font-weight="bold">Book Slot</text>
          </svg>
        `;
      case 'artisan-gallery':
        return `
          <svg viewBox="0 0 400 240" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="background:#1c1308;">
            <rect x="30" y="30" width="160" height="180" rx="10" fill="#2d1f0f" stroke="rgba(245,158,11,0.3)"/>
            <circle cx="110" cy="100" r="40" fill="none" stroke="#f59e0b" stroke-width="2"/>
            <polygon points="110,65 140,115 80,115" fill="rgba(245,158,11,0.25)" stroke="#f59e0b"/>
            <rect x="205" y="30" width="165" height="85" rx="10" fill="#2d1f0f" stroke="rgba(245,158,11,0.3)"/>
            <rect x="205" y="125" width="165" height="85" rx="10" fill="#2d1f0f" stroke="rgba(245,158,11,0.3)"/>
            <text x="218" y="75" fill="#fcd34d" font-size="11" font-family="monospace">ARTISAN BOUTIQUE</text>
            <text x="218" y="170" fill="#fbbf24" font-size="11" font-family="monospace">360° SHOWCASE</text>
          </svg>
        `;
      case 'server-monitor':
        return `
          <svg viewBox="0 0 400 240" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="background:#08101e;">
            <rect x="30" y="30" width="340" height="180" rx="12" fill="#0d1b33" stroke="rgba(59,130,246,0.35)" stroke-width="1.5"/>
            <rect x="45" y="45" width="140" height="22" rx="4" fill="rgba(59,130,246,0.2)"/>
            <text x="55" y="60" fill="#60a5fa" font-size="11" font-family="monospace">DOCKER // UPTIME 99.99%</text>
            <g transform="translate(45, 85)">
              <rect x="0" y="0" width="85" height="40" rx="6" fill="#162747"/>
              <text x="42" y="24" text-anchor="middle" fill="#93c5fd" font-size="11" font-family="monospace">CPU 14%</text>
              <rect x="100" y="0" width="85" height="40" rx="6" fill="#162747"/>
              <text x="142" y="24" text-anchor="middle" fill="#93c5fd" font-size="11" font-family="monospace">RAM 3.2GB</text>
              <rect x="200" y="0" width="95" height="40" rx="6" fill="#162747"/>
              <text x="247" y="24" text-anchor="middle" fill="#34d399" font-size="11" font-family="monospace">SSL ACTIVE</text>
            </g>
            <line x1="45" y1="150" x2="355" y2="150" stroke="rgba(255,255,255,0.08)"/>
            <text x="45" y="180" fill="#38bdf8" font-size="10" font-family="monospace">NGINX REVERSE PROXY -> 0 DOWNTIME</text>
          </svg>
        `;
      default:
        return `
          <svg viewBox="0 0 400 240" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="background:#090d16;">
            <rect x="30" y="30" width="340" height="180" rx="12" fill="#121a2b" stroke="rgba(0,240,255,0.3)"/>
            <text x="200" y="125" text-anchor="middle" fill="#00f0ff" font-size="14" font-family="sans-serif" font-weight="bold">ENTERPRISE SAAS SUITE</text>
          </svg>
        `;
    }
  }

  openModal(projectId) {
    const project = PROJECTS_DATA.find(p => p.id === projectId);
    if (!project || !this.modalOverlay || !this.modalContainer) return;

    // Build rich modal content with embedded live interactive simulator
    this.modalContainer.innerHTML = `
      <div class="modal-header" style="margin-bottom: 24px;">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
          <span class="badge ${project.badgeClass}">${project.badge}</span>
          <span style="color: var(--text-muted); font-size: 0.85rem; font-family: var(--font-mono);">${project.categoryLabel}</span>
        </div>
        <h2 style="font-family: var(--font-display); font-size: clamp(1.6rem, 3vw, 2.2rem); color: var(--text-primary); font-weight: 800; margin-bottom: 8px;">
          ${project.title}
        </h2>
        <p style="color: var(--text-secondary); font-size: 1.05rem; line-height: 1.6;">
          ${project.description}
        </p>
      </div>

      <!-- Live Interactive Simulator Viewport -->
      <div class="simulator-viewport" id="active-simulator-viewport">
        ${this.getSimulatorHTML(project.previewType)}
      </div>

      <!-- Project Architecture Specs Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 28px;">
        ${Object.entries(project.specs).map(([key, val]) => `
          <div style="padding: 16px; background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-subtle); border-radius: var(--radius-md);">
            <div style="font-family: var(--font-mono); font-size: 0.76rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 4px;">${key}</div>
            <div style="font-size: 0.95rem; font-weight: 600; color: var(--text-primary);">${val}</div>
          </div>
        `).join('')}
      </div>

      <!-- Tech Stack Badges -->
      <div style="margin-bottom: 30px;">
        <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted); margin-bottom: 10px; text-transform: uppercase;">
          Technologies & Engineering Stack:
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
          ${project.techStack.map(t => `<span class="badge badge-cyan">${t}</span>`).join('')}
        </div>
      </div>

      <!-- Direct Consultation Trigger for this Project Type -->
      <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; padding-top: 20px; border-top: 1px solid var(--border-subtle);">
        <div style="font-size: 0.95rem; color: var(--text-secondary);">
          Want a similar high-performance system for your business?
        </div>
        <div style="display: flex; gap: 12px;">
          <button class="btn-magnetic btn-primary" onclick="PortfolioManager.requestQuoteFor('${project.title}')">
            Request Similar Project
          </button>
        </div>
      </div>
    `;

    this.modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Mount interactive simulation logic
    setTimeout(() => {
      this.initSimulatorLogic(project.previewType);
    }, 50);
  }

  getSimulatorHTML(previewType) {
    switch (previewType) {
      case 'fintech-calc':
        return `
          <div style="width: 100%; height: 100%; padding: 24px; display: flex; flex-direction: column; justify-content: space-between; color: #fff;">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(0,240,255,0.2); padding-bottom: 12px;">
              <span style="font-family: var(--font-mono); color: var(--accent-cyan); font-weight: 600;">FINANCIAL TAX & GST SIMULATOR (LIVE WIDGET)</span>
              <span class="live-status-dot"></span>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 16px 0;">
              <div>
                <label style="font-size: 0.85rem; color: #94a3b8; display: block; margin-bottom: 6px;">Annual Turnover / Income: <strong id="sim-income-val" style="color:#00f0ff;">₹ 25,00,000</strong></label>
                <input type="range" id="sim-income-slider" min="500000" max="10000000" step="100000" value="2500000" style="width: 100%; accent-color: var(--accent-cyan);">
                
                <label style="font-size: 0.85rem; color: #94a3b8; display: block; margin-top: 14px; margin-bottom: 6px;">GST Slab / Category:</label>
                <select id="sim-gst-slab" style="width: 100%; padding: 8px 12px; background: #131b2e; border: 1px solid rgba(0,240,255,0.3); border-radius: 6px; color: #fff; font-size: 0.88rem;">
                  <option value="0.18">18% Standard GST (IT, Tech & Consulting)</option>
                  <option value="0.12">12% Reduced (Services & Goods)</option>
                  <option value="0.05">5% Essential / Healthcare</option>
                  <option value="0.28">28% Luxury & High Scale</option>
                </select>
              </div>

              <div style="background: rgba(0,240,255,0.05); border: 1px solid rgba(0,240,255,0.2); border-radius: 10px; padding: 18px; display: flex; flex-direction: column; justify-content: space-around;">
                <div style="display: flex; justify-content: space-between; font-size: 0.9rem;">
                  <span style="color: #94a3b8;">Estimated GST Liability:</span>
                  <strong id="sim-gst-out" style="color: #38bdf8;">₹ 4,50,000</strong>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 0.9rem;">
                  <span style="color: #94a3b8;">Estimated Net Income:</span>
                  <strong id="sim-net-out" style="color: #10b981;">₹ 20,50,000</strong>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 0.9rem; border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 8px;">
                  <span style="color: #f8fafc; font-weight: 600;">CA Document Vault:</span>
                  <span style="color: #00f0ff; font-family: monospace;">AES-256 ENCRYPTED</span>
                </div>
              </div>
            </div>

            <div style="font-size: 0.78rem; color: #64748b; font-family: var(--font-mono); text-align: center;">
              * Fully customizable backend algorithm integrated with government compliance APIs & digital signatures.
            </div>
          </div>
        `;

      case '3d-sandbox':
        return `
          <div style="width: 100%; height: 100%; position: relative; display: flex; flex-direction: column;">
            <canvas id="sim-3d-canvas" style="width: 100%; height: 100%; display: block;"></canvas>
            
            <div style="position: absolute; top: 16px; left: 16px; background: rgba(10, 14, 23, 0.9); backdrop-filter: blur(12px); padding: 12px 18px; border-radius: 10px; border: 1px solid rgba(0,240,255,0.3); font-family: monospace; font-size: 0.82rem; color: #f8fafc; box-shadow: 0 10px 25px rgba(0,0,0,0.6);">
              <div style="color: var(--accent-cyan); font-weight: 700; display: flex; align-items: center; gap: 8px;">
                <span class="live-status-dot"></span> 3D WebGL Studio Viewport
              </div>
              <div style="color: #94a3b8; font-size: 0.74rem; margin-top: 4px;">Drag mouse to Orbit | Switch Materials & Lighting below</div>
            </div>

            <!-- Material & Lighting Preset Controls -->
            <div style="position: absolute; bottom: 16px; left: 16px; right: 16px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; background: rgba(10, 14, 23, 0.85); backdrop-filter: blur(12px); padding: 10px 16px; border-radius: 12px; border: 1px solid var(--border-subtle);">
              <div style="display: flex; gap: 6px; align-items: center;">
                <span style="font-size: 0.75rem; color: var(--text-muted); font-family: monospace;">MATERIAL:</span>
                <button class="sim-3d-mat-btn active" data-mat="cyan" style="padding: 4px 10px; background: rgba(0,240,255,0.2); border: 1px solid #00f0ff; border-radius: 6px; color: #00f0ff; font-size: 0.74rem;">Cyan Chrome</button>
                <button class="sim-3d-mat-btn" data-mat="purple" style="padding: 4px 10px; background: rgba(139,92,246,0.1); border: 1px solid #8b5cf6; border-radius: 6px; color: #c084fc; font-size: 0.74rem;">Neon Violet</button>
                <button class="sim-3d-mat-btn" data-mat="emerald" style="padding: 4px 10px; background: rgba(16,185,129,0.1); border: 1px solid #10b981; border-radius: 6px; color: #34d399; font-size: 0.74rem;">Emerald Glass</button>
                <button class="sim-3d-mat-btn" data-mat="gold" style="padding: 4px 10px; background: rgba(245,158,11,0.1); border: 1px solid #f59e0b; border-radius: 6px; color: #fbbf24; font-size: 0.74rem;">Gold PBR</button>
              </div>

              <div style="display: flex; gap: 8px;">
                <button id="sim-3d-wireframe" style="padding: 5px 12px; background: rgba(255,255,255,0.06); border: 1px solid var(--border-subtle); border-radius: 6px; color: #fff; font-size: 0.76rem;">Wireframe Mode</button>
                <button id="sim-3d-shape" style="padding: 5px 12px; background: rgba(255,255,255,0.06); border: 1px solid var(--border-subtle); border-radius: 6px; color: #fff; font-size: 0.76rem;">Morph Shape</button>
              </div>
            </div>
          </div>
        `;

      case 'doctor-booking':
        return `
          <div style="width: 100%; height: 100%; padding: 24px; display: flex; flex-direction: column; justify-content: space-between; color: #fff;">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(16,185,129,0.2); padding-bottom: 10px;">
              <span style="font-family: var(--font-mono); color: #34d399; font-weight: 600;">LIVE CLINIC & DOCTOR APPOINTMENT SIMULATOR</span>
              <span class="badge badge-emerald">Online Telehealth Ready</span>
            </div>

            <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 20px; margin: 16px 0;">
              <div>
                <div style="font-size: 0.86rem; color: #94a3b8; margin-bottom: 8px;">Select Available Consultation Slot:</div>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;" id="sim-slots-container">
                  <button class="sim-slot-btn active" style="padding: 8px; background: #10b981; color: #042f2e; font-weight: 700; border-radius: 6px; font-size: 0.8rem;">10:00 AM</button>
                  <button class="sim-slot-btn" style="padding: 8px; background: #064e3b; color: #a7f3d0; border: 1px solid #10b981; border-radius: 6px; font-size: 0.8rem;">11:30 AM</button>
                  <button class="sim-slot-btn" style="padding: 8px; background: #064e3b; color: #a7f3d0; border: 1px solid #10b981; border-radius: 6px; font-size: 0.8rem;">02:15 PM</button>
                  <button class="sim-slot-btn" style="padding: 8px; background: #064e3b; color: #a7f3d0; border: 1px solid #10b981; border-radius: 6px; font-size: 0.8rem;">04:00 PM</button>
                  <button class="sim-slot-btn" style="padding: 8px; background: #064e3b; color: #a7f3d0; border: 1px solid #10b981; border-radius: 6px; font-size: 0.8rem;">05:30 PM</button>
                  <button class="sim-slot-btn" style="padding: 8px; background: #064e3b; color: #a7f3d0; border: 1px solid #10b981; border-radius: 6px; font-size: 0.8rem;">07:00 PM</button>
                </div>
              </div>

              <div style="background: rgba(16,185,129,0.06); border: 1px solid rgba(16,185,129,0.25); border-radius: 10px; padding: 16px;">
                <div style="font-size: 0.85rem; font-weight: 700; color: #34d399; margin-bottom: 8px;">Simulated Booking Confirmation:</div>
                <div style="font-size: 0.8rem; color: #cbd5e1; line-height: 1.6;">
                  <div>🩺 <strong>Doctor:</strong> Dr. Rajesh Sharma (MD, Cardiologist)</div>
                  <div>📅 <strong>Date:</strong> Tomorrow (Confirmed)</div>
                  <div>⏰ <strong>Selected Slot:</strong> <span id="sim-selected-slot" style="color: #34d399; font-weight: bold;">10:00 AM</span></div>
                  <div>📲 <strong>Alerts:</strong> Instant WhatsApp & SMS Triggered</div>
                </div>
                <button id="sim-book-now-btn" style="width: 100%; margin-top: 12px; padding: 8px; background: #10b981; color: #022c22; font-weight: 700; border-radius: 6px; font-size: 0.84rem;">
                  Confirm Instant Telehealth Slot
                </button>
              </div>
            </div>

            <div style="font-size: 0.78rem; color: #64748b; font-family: var(--font-mono); text-align: center;">
              * Supports automatic patient triage, digital PDF prescriptions, video rooms, and hospital billing gateways.
            </div>
          </div>
        `;

      case 'artisan-gallery':
        return `
          <div style="width: 100%; height: 100%; padding: 24px; display: flex; flex-direction: column; justify-content: space-between; color: #fff;">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(245,158,11,0.3); padding-bottom: 10px;">
              <span style="font-family: var(--font-mono); color: #fbbf24; font-weight: 600;">ARTISAN CRAFT 360° TEXTURE & PRODUCT INSPECTOR</span>
              <span class="badge badge-amber">Interactive 360 Showcase</span>
            </div>

            <div style="display: flex; align-items: center; justify-content: space-around; margin: 20px 0;">
              <div id="sim-art-preview-box" style="width: 220px; height: 180px; border-radius: 12px; background: linear-gradient(135deg, #78350f, #d97706); display: flex; align-items: center; justify-content: center; box-shadow: 0 0 30px rgba(245,158,11,0.3); transition: transform 0.3s ease; cursor: grab;">
                <div style="text-align: center; color: #fff;">
                  <div style="font-size: 2.2rem;">🏺</div>
                  <div style="font-size: 0.85rem; font-weight: 700; margin-top: 4px;">Terracotta Artisan Vase</div>
                  <div style="font-size: 0.75rem; color: #fde68a;">Handmade & Glazed</div>
                </div>
              </div>

              <div style="max-width: 280px; font-size: 0.85rem; color: #e2e8f0; display: flex; flex-direction: column; gap: 10px;">
                <div>🎨 <strong>Artisan Studio:</strong> Heritage Pottery Works</div>
                <div>✨ <strong>Finish:</strong> Antique Matte Finish</div>
                <div>🌍 <strong>Global Shipping:</strong> 48h Express Available</div>
                <div style="font-family: var(--font-mono); font-size: 1.1rem; color: #fbbf24; font-weight: bold;">₹ 4,850 / $ 58 USD</div>
                <button id="sim-art-rotate-btn" style="padding: 8px 14px; background: #d97706; color: #fff; font-weight: 600; border-radius: 6px; font-size: 0.82rem;">
                  🔄 Rotate 360° Preview
                </button>
              </div>
            </div>

            <div style="font-size: 0.78rem; color: #64748b; font-family: var(--font-mono); text-align: center;">
              * Seamless multi-currency payment integration (Stripe, Razorpay, PayPal) with custom commission builder.
            </div>
          </div>
        `;

      case 'server-monitor':
      default:
        return `
          <div style="width: 100%; height: 100%; padding: 24px; display: flex; flex-direction: column; justify-content: space-between; color: #fff;">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(59,130,246,0.3); padding-bottom: 10px;">
              <span style="font-family: var(--font-mono); color: #60a5fa; font-weight: 600;">LIVE SERVER CLUSTER & DEVOPS HEALTH MONITOR</span>
              <span class="live-status-dot"></span>
            </div>

            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin: 20px 0;">
              <div style="padding: 14px; background: #0f1c36; border: 1px solid rgba(59,130,246,0.3); border-radius: 8px; text-align: center;">
                <div style="font-size: 0.72rem; color: #93c5fd; font-family: monospace;">CPU LOAD</div>
                <div id="sim-cpu-val" style="font-size: 1.3rem; font-weight: 700; color: #38bdf8; margin-top: 4px;">18.4%</div>
              </div>
              <div style="padding: 14px; background: #0f1c36; border: 1px solid rgba(59,130,246,0.3); border-radius: 8px; text-align: center;">
                <div style="font-size: 0.72rem; color: #93c5fd; font-family: monospace;">RAM USAGE</div>
                <div id="sim-ram-val" style="font-size: 1.3rem; font-weight: 700; color: #38bdf8; margin-top: 4px;">2.8 / 16 GB</div>
              </div>
              <div style="padding: 14px; background: #0f1c36; border: 1px solid rgba(59,130,246,0.3); border-radius: 8px; text-align: center;">
                <div style="font-size: 0.72rem; color: #93c5fd; font-family: monospace;">SSL STATUS</div>
                <div style="font-size: 1.3rem; font-weight: 700; color: #34d399; margin-top: 4px;">VALID (A+)</div>
              </div>
              <div style="padding: 14px; background: #0f1c36; border: 1px solid rgba(59,130,246,0.3); border-radius: 8px; text-align: center;">
                <div style="font-size: 0.72rem; color: #93c5fd; font-family: monospace;">NGINX PROXY</div>
                <div style="font-size: 1.3rem; font-weight: 700; color: #34d399; margin-top: 4px;">RUNNING</div>
              </div>
            </div>

            <div style="background: #090e1a; padding: 12px; border-radius: 8px; font-family: monospace; font-size: 0.8rem; color: #a5b4fc; display: flex; justify-content: space-between;">
              <span>Docker Containers: 6 Healthy</span>
              <span>Network I/O: 142 MB/s</span>
              <span>Zero-Downtime Pipeline: Active</span>
            </div>

            <div style="font-size: 0.78rem; color: #64748b; font-family: var(--font-mono); text-align: center;">
              * Automated Linux VPS configuration, Docker Swarm / Kubernetes, Cloudflare DDoS defense & Let's Encrypt SSL.
            </div>
          </div>
        `;
    }
  }

  initSimulatorLogic(previewType) {
    if (previewType === 'fintech-calc') {
      const slider = document.getElementById('sim-income-slider');
      const slab = document.getElementById('sim-gst-slab');
      const incomeVal = document.getElementById('sim-income-val');
      const gstOut = document.getElementById('sim-gst-out');
      const netOut = document.getElementById('sim-net-out');

      const updateFintech = () => {
        if (!slider || !slab) return;
        const income = parseFloat(slider.value);
        const rate = parseFloat(slab.value);
        const gst = income * rate;
        const net = income - gst;

        incomeVal.textContent = '₹ ' + income.toLocaleString('en-IN');
        gstOut.textContent = '₹ ' + Math.round(gst).toLocaleString('en-IN');
        netOut.textContent = '₹ ' + Math.round(net).toLocaleString('en-IN');
      };

      if (slider) slider.addEventListener('input', updateFintech);
      if (slab) slab.addEventListener('change', updateFintech);
    } 
    else if (previewType === '3d-sandbox') {
      this.init3DSandboxCanvas();
    }
    else if (previewType === 'doctor-booking') {
      const slotButtons = document.querySelectorAll('.sim-slot-btn');
      const selectedSlotDisplay = document.getElementById('sim-selected-slot');
      const bookNowBtn = document.getElementById('sim-book-now-btn');

      slotButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          slotButtons.forEach(b => {
            b.classList.remove('active');
            b.style.background = '#064e3b';
            b.style.color = '#a7f3d0';
          });
          btn.classList.add('active');
          btn.style.background = '#10b981';
          btn.style.color = '#042f2e';
          if (selectedSlotDisplay) selectedSlotDisplay.textContent = btn.textContent;
        });
      });

      if (bookNowBtn) {
        bookNowBtn.addEventListener('click', () => {
          if (window.App) {
            window.App.showToast('✅ Appointment Slot Verified & Simulated! Live notification sent.');
          }
        });
      }
    }
    else if (previewType === 'artisan-gallery') {
      const artBox = document.getElementById('sim-art-preview-box');
      const rotBtn = document.getElementById('sim-art-rotate-btn');
      let rotAngle = 0;

      if (rotBtn && artBox) {
        rotBtn.addEventListener('click', () => {
          rotAngle += 90;
          artBox.style.transform = `rotateY(${rotAngle}deg) scale(1.05)`;
          setTimeout(() => {
            artBox.style.transform = `rotateY(${rotAngle}deg) scale(1)`;
          }, 300);
        });
      }
    }
    else if (previewType === 'server-monitor') {
      const cpuVal = document.getElementById('sim-cpu-val');
      const ramVal = document.getElementById('sim-ram-val');

      // Live simulated metric fluctuations
      const interval = setInterval(() => {
        if (!document.getElementById('sim-cpu-val')) {
          clearInterval(interval);
          return;
        }
        const cpu = (15 + Math.random() * 10).toFixed(1);
        const ram = (2.6 + Math.random() * 0.4).toFixed(1);
        if (cpuVal) cpuVal.textContent = cpu + '%';
        if (ramVal) ramVal.textContent = ram + ' / 16 GB';
      }, 1500);
    }
  }

  init3DSandboxCanvas() {
    const canvas = document.getElementById('sim-3d-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let width = canvas.parentElement.clientWidth;
    let height = canvas.parentElement.clientHeight;
    canvas.width = width;
    canvas.height = height;

    let rotX = 0.5;
    let rotY = 0.5;
    let isWireframe = false;
    let shapeMode = 0; // 0 = Cube, 1 = Octahedron
    let isDragging = false;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let animId;

    // Cube vertices
    const cubeVertices = [
      [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
      [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
    ];

    const cubeEdges = [
      [0,1], [1,2], [2,3], [3,0],
      [4,5], [5,6], [6,7], [7,4],
      [0,4], [1,5], [2,6], [3,7]
    ];

    const cubeFaces = [
      [0,1,2,3], [4,5,6,7], [0,1,5,4], [2,3,7,6], [0,3,7,4], [1,2,6,5]
    ];

    let currentMat = 'cyan';
    const materials = {
      cyan: { stroke: '#00f0ff', fill: 'rgba(0, 240, 255, 0.32)', shadow: '#00f0ff', dot: '#ffffff' },
      purple: { stroke: '#c084fc', fill: 'rgba(139, 92, 246, 0.38)', shadow: '#8b5cf6', dot: '#f3e8ff' },
      emerald: { stroke: '#34d399', fill: 'rgba(16, 185, 129, 0.32)', shadow: '#10b981', dot: '#d1fae5' },
      gold: { stroke: '#fbbf24', fill: 'rgba(245, 158, 11, 0.38)', shadow: '#f59e0b', dot: '#fef3c7' }
    };

    // Shape 0: Cube, Shape 1: Octahedron/Diamond
    const octaVertices = [
      [0, 1.4, 0], [0, -1.4, 0], [1, 0, 0], [-1, 0, 0], [0, 0, 1], [0, 0, -1]
    ];
    const octaEdges = [
      [0,2], [0,3], [0,4], [0,5],
      [1,2], [1,3], [1,4], [1,5],
      [2,4], [4,3], [3,5], [5,2]
    ];
    const octaFaces = [
      [0,2,4], [0,4,3], [0,3,5], [0,5,2],
      [1,2,4], [1,4,3], [1,3,5], [1,5,2]
    ];

    const project3D = (x, y, z) => {
      // Rotation matrices
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);

      let x1 = x * cosY + z * sinY;
      let z1 = -x * sinY + z * cosY;

      let y2 = y * cosX - z1 * sinX;
      let z2 = y * sinX + z1 * cosX;

      const scale = 110;
      const fov = 350;
      const distance = 4;
      const factor = fov / (z2 + distance);

      return {
        x: x1 * factor + width / 2,
        y: y2 * factor + height / 2,
        z: z2
      };
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Auto slow rotate if not dragging
      if (!isDragging) {
        rotY += 0.012;
        rotX += 0.006;
      }

      const activeVerts = shapeMode === 0 ? cubeVertices : octaVertices;
      const activeEdges = shapeMode === 0 ? cubeEdges : octaEdges;
      const activeFaces = shapeMode === 0 ? cubeFaces : octaFaces;

      const projected = activeVerts.map(v => project3D(v[0], v[1], v[2]));
      const mat = materials[currentMat] || materials.cyan;

      if (!isWireframe) {
        activeFaces.forEach(face => {
          ctx.beginPath();
          const p0 = projected[face[0]];
          ctx.moveTo(p0.x, p0.y);
          for (let i = 1; i < face.length; i++) {
            const p = projected[face[i]];
            ctx.lineTo(p.x, p.y);
          }
          ctx.closePath();
          ctx.fillStyle = mat.fill;
          ctx.fill();
        });
      }

      // Draw edges with glowing wireframe
      ctx.strokeStyle = mat.stroke;
      ctx.lineWidth = 2.2;
      ctx.shadowColor = mat.shadow;
      ctx.shadowBlur = 12;

      activeEdges.forEach(edge => {
        const p1 = projected[edge[0]];
        const p2 = projected[edge[1]];
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });

      // Draw vertices
      projected.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = mat.dot;
        ctx.shadowBlur = 8;
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    // Mouse & Touch drag rotation
    canvas.addEventListener('mousedown', (e) => {
      isDragging = true;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    window.addEventListener('blur', () => {
      isDragging = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const dx = e.clientX - lastMouseX;
      const dy = e.clientY - lastMouseY;
      rotY += dx * 0.01;
      rotX += dy * 0.01;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    });

    // Touch support for mobile 3D interaction
    canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) {
        isDragging = true;
        lastMouseX = e.touches[0].clientX;
        lastMouseY = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging || e.touches.length === 0) return;
      const dx = e.touches[0].clientX - lastMouseX;
      const dy = e.touches[0].clientY - lastMouseY;
      rotY += dx * 0.015;
      rotX += dy * 0.015;
      lastMouseX = e.touches[0].clientX;
      lastMouseY = e.touches[0].clientY;
    }, { passive: true });

    // Material Switcher Buttons
    document.querySelectorAll('.sim-3d-mat-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        document.querySelectorAll('.sim-3d-mat-btn').forEach(b => {
          b.classList.remove('active');
          b.style.background = 'rgba(255,255,255,0.06)';
          b.style.borderColor = 'transparent';
        });
        btn.classList.add('active');
        btn.style.background = 'rgba(0,240,255,0.2)';
        btn.style.borderColor = '#00f0ff';
        currentMat = btn.getAttribute('data-mat');
      });
    });

    // Wireframe toggle
    const wireBtn = document.getElementById('sim-3d-wireframe');
    if (wireBtn) {
      wireBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        isWireframe = !isWireframe;
        wireBtn.style.background = isWireframe ? 'rgba(0,240,255,0.25)' : 'rgba(255,255,255,0.06)';
      });
    }

    // Shape morphing
    const shapeBtn = document.getElementById('sim-3d-shape');
    if (shapeBtn) {
      shapeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        shapeMode = shapeMode === 0 ? 1 : 0;
        rotX += 0.8;
        rotY += 0.8;
      });
    }
  }

  bindModalCloseEvents() {
    if (!this.modalOverlay) return;

    const closeBtn = document.getElementById('portfolio-modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeModal());
    }

    this.modalOverlay.addEventListener('click', (e) => {
      if (e.target === this.modalOverlay) {
        this.closeModal();
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modalOverlay.classList.contains('active')) {
        this.closeModal();
      }
    });
  }

  closeModal() {
    if (!this.modalOverlay) return;
    this.modalOverlay.classList.remove('active');
    document.body.style.overflow = '';

    // Clean up active 3D animation loop and intervals to conserve memory
    if (this.active3DAnimId) {
      cancelAnimationFrame(this.active3DAnimId);
      this.active3DAnimId = null;
    }
    if (this.activeSimInterval) {
      clearInterval(this.activeSimInterval);
      this.activeSimInterval = null;
    }
  }

  static requestQuoteFor(projectName) {
    if (window.portfolioManagerInstance) {
      window.portfolioManagerInstance.closeModal();
    } else {
      const modalOverlay = document.getElementById('portfolio-modal-overlay');
      if (modalOverlay) modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    // Scroll to contact form and pre-fill details
    const contactSection = document.getElementById('contact');
    const msgBox = document.getElementById('contact-message');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
    if (msgBox) {
      msgBox.value = `Hi Bhavyansh, I am interested in building a project similar to: "${projectName}". Please share details on timeline, architecture, and quote.`;
    }
  }
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
  window.portfolioInstance = new PortfolioManager();
});
