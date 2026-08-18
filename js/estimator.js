/* ===================================================================
   PIXELTOCLOUD SOLUTIONS - TECHNICAL SOLUTION BUILDER & SCOPE ESTIMATOR
   Dynamic multi-step architecture configurator with custom milestone scoping
   =================================================================== */

class ProjectEstimator {
  constructor() {
    this.scaleMode = 'growth'; // 'starter', 'growth', 'enterprise'

    // Base Project Types & Architecture Scopes
    this.projectTypes = {
      'custom-website': {
        name: 'Modern High-Speed Business Website',
        scopeTier: 'Starter to Growth MVP',
        days: 6,
        badge: '⚡ 60 FPS UI + Semantic SEO',
        desc: 'Responsive, lightweight, ultra-fast portfolio or service showcase with lightning-fast load times.'
      },
      'fullstack-webapp': {
        name: 'Full-Stack Web Application',
        scopeTier: 'Professional Scale',
        days: 12,
        badge: '🔥 Dynamic DB + Auth + Workflows',
        desc: 'Custom relational database, role-based user authentication, API endpoints, and real-time dashboard.'
      },
      '3d-software': {
        name: 'Interactive 2D/3D WebGL Software',
        scopeTier: 'Advanced Graphics & Tools',
        days: 16,
        badge: '🌐 Three.js + GPU Acceleration',
        desc: 'Real-time 3D canvas, orbit visualizer, spatial product configurator, or browser-based CAD tool.'
      },
      'ca-portal': {
        name: 'CA & Financial Tax Calculation Suite',
        scopeTier: 'FinTech Compliance',
        days: 14,
        badge: '📊 GST/TDS Engines + Vault',
        desc: 'Automated tax engines, secure client document lockers, payment receipts, and audit trail records.'
      },
      'doctor-portal': {
        name: 'Doctor & Telehealth Medical Suite',
        scopeTier: 'Healthcare Telemedicine',
        days: 14,
        badge: '🩺 Live Calendar + Video EHR',
        desc: 'Real-time appointment scheduler, patient portal, prescription PDF generator, and video consult rooms.'
      },
      'artisan-ecommerce': {
        name: 'Luxury Art & Craft E-Commerce',
        scopeTier: 'Boutique Global Commerce',
        days: 10,
        badge: '🛍️ 360° Inspector + Payments',
        desc: 'Immersive product showcase, global currency conversion, instant checkout, and order management.'
      },
      'custom-saas': {
        name: 'Enterprise SaaS & Cloud Infrastructure',
        scopeTier: 'High-Concurrency Distributed',
        days: 20,
        badge: '⚡ Multi-Tenant Microservices',
        desc: 'High-scale microservices, Redis caching, queue workers, Docker orchestration, and analytics engine.'
      }
    };

    // Infrastructure & Server Architecture
    this.infraOptions = {
      'free-hosting': {
        name: 'Static Edge Deployment (Vercel / Cloudflare / GitHub Pages)',
        badge: '⚡ Edge CDN Deployment',
        days: 0
      },
      'vps-linux': {
        name: 'Dedicated Linux VPS + Nginx Reverse Proxy',
        badge: '🛡️ Root Server Control',
        days: 1
      },
      'aws-cloud': {
        name: 'Docker Containers & Cloud Cluster (AWS / Hetzner)',
        badge: '🐳 Containerized Scale',
        days: 2
      },
      'domain-dns': {
        name: 'Custom Domain Setup & Cloudflare 1.1.1.1 Routing',
        badge: '🌐 Global DNS & DDoS Shield',
        days: 1
      },
      'business-mail': {
        name: 'Professional Business Email (SPF, DKIM, DMARC)',
        badge: '✉️ 100% Inbox Deliverability',
        days: 1
      },
      'ssl-security': {
        name: 'Automated SSL & Server Security Hardening',
        badge: '🔒 TLS 1.3 / Bank-Grade Encryption',
        days: 0
      }
    };

    // Performance, Security & Growth Add-Ons
    this.addonOptions = {
      'speed-boost': {
        name: 'PageSpeed 99+ & Core Web Vitals Optimization',
        badge: '🚀 Sub-Second First Contentful Paint',
        days: 1
      },
      'payment-gateways': {
        name: 'Payment Gateway Integration (Stripe / Razorpay / PayPal)',
        badge: '💳 Multi-Currency Checkout',
        days: 1
      },
      'admin-cms': {
        name: 'Custom Admin Dashboard & Content Control CMS',
        badge: '⚙️ Real-Time Content Control',
        days: 3
      },
      'maintenance-year': {
        name: 'Priority Technical Support & Automated Cloud Backups',
        badge: '🛡️ 24/7 SLA Server Monitoring',
        days: 0
      },
      'seo-package': {
        name: 'Advanced Technical SEO & Rich JSON-LD Snippets',
        badge: '📈 High Google Search Visibility',
        days: 1
      }
    };

    // Selected state
    this.selectedProject = 'fullstack-webapp';
    this.selectedInfra = ['vps-linux', 'domain-dns', 'ssl-security'];
    this.selectedAddons = ['speed-boost', 'payment-gateways'];

    this.init();
  }

  init() {
    this.renderUI();
    this.bindEvents();
    this.calculate();
  }

  renderUI() {
    // Render Project Types Grid
    const projectGrid = document.getElementById('estimator-project-types');
    if (projectGrid) {
      projectGrid.innerHTML = Object.entries(this.projectTypes).map(([key, item]) => `
        <div class="estimator-option-card ${this.selectedProject === key ? 'selected' : ''}" data-type="project" data-id="${key}">
          <div class="estimator-option-title">${item.name}</div>
          <div class="estimator-option-desc">${item.desc}</div>
          <div class="estimator-option-cost" style="color: var(--accent-cyan);"><i class="fa-solid fa-tag" style="margin-right: 4px;"></i>${item.badge}</div>
        </div>
      `).join('');
    }

    // Render Infrastructure Grid
    const infraGrid = document.getElementById('estimator-infra-options');
    if (infraGrid) {
      infraGrid.innerHTML = Object.entries(this.infraOptions).map(([key, item]) => `
        <div class="estimator-option-card ${this.selectedInfra.includes(key) ? 'selected' : ''}" data-type="infra" data-id="${key}">
          <div class="estimator-option-title">${item.name}</div>
          <div class="estimator-option-cost" style="color: var(--accent-cyan);"><i class="fa-solid fa-server" style="margin-right: 4px;"></i>${item.badge}</div>
        </div>
      `).join('');
    }

    // Render Add-ons Grid
    const addonGrid = document.getElementById('estimator-addon-options');
    if (addonGrid) {
      addonGrid.innerHTML = Object.entries(this.addonOptions).map(([key, item]) => `
        <div class="estimator-option-card ${this.selectedAddons.includes(key) ? 'selected' : ''}" data-type="addon" data-id="${key}">
          <div class="estimator-option-title">${item.name}</div>
          <div class="estimator-option-cost" style="color: var(--accent-cyan);"><i class="fa-solid fa-shield-halved" style="margin-right: 4px;"></i>${item.badge}</div>
        </div>
      `).join('');
    }
  }

  bindEvents() {
    const container = document.getElementById('estimator-interactive-container');
    if (!container) return;

    container.addEventListener('click', (e) => {
      const card = e.target.closest('.estimator-option-card');
      if (!card) return;

      const type = card.getAttribute('data-type');
      const id = card.getAttribute('data-id');

      if (type === 'project') {
        this.selectedProject = id;
        container.querySelectorAll('[data-type="project"]').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
      } 
      else if (type === 'infra') {
        if (this.selectedInfra.includes(id)) {
          this.selectedInfra = this.selectedInfra.filter(x => x !== id);
          card.classList.remove('selected');
        } else {
          this.selectedInfra.push(id);
          card.classList.add('selected');
        }
      } 
      else if (type === 'addon') {
        if (this.selectedAddons.includes(id)) {
          this.selectedAddons = this.selectedAddons.filter(x => x !== id);
          card.classList.remove('selected');
        } else {
          this.selectedAddons.push(id);
          card.classList.add('selected');
        }
      }

      this.calculate();
    });

    // Scale Mode Switcher Buttons
    const scaleButtons = document.querySelectorAll('.scale-toggle-btn');
    scaleButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        scaleButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.scaleMode = btn.getAttribute('data-scale') || 'growth';
        this.calculate();
      });
    });

    // Action Buttons
    const exportEmailBtn = document.getElementById('estimator-export-email');
    if (exportEmailBtn) {
      exportEmailBtn.addEventListener('click', () => this.exportToEmail());
    }

    const exportWhatsAppBtn = document.getElementById('estimator-export-whatsapp');
    if (exportWhatsAppBtn) {
      exportWhatsAppBtn.addEventListener('click', () => this.exportToWhatsApp());
    }

    const applyContactBtn = document.getElementById('estimator-apply-contact');
    if (applyContactBtn) {
      applyContactBtn.addEventListener('click', () => this.applyToContactForm());
    }
  }

  exportToEmail() {
    if (!this.lastCalculation) return;

    const subject = encodeURIComponent(`Project Architecture Scope Request - ${this.lastCalculation.project}`);
    const body = encodeURIComponent(
      `Dear Pankaj & Tushar,\n\n` +
      `I configured a project architecture scope on PixelToCloud Solutions website:\n\n` +
      `--- TECHNICAL SPECIFICATION ---\n` +
      `📌 Base Architecture: ${this.lastCalculation.project}\n` +
      `🎯 Scope Complexity: ${this.lastCalculation.tier}\n` +
      `⏱️ Estimated Delivery: ${this.lastCalculation.totalDays}\n` +
      `🌐 Server & DevOps: ${this.lastCalculation.infra.join(', ') || 'Standard'}\n` +
      `✨ Selected Capabilities: ${this.lastCalculation.addons.join(', ') || 'Standard'}\n` +
      `🤝 Investment Model: Milestone-Based Payment (Pay per approved milestone)\n\n` +
      `I would like to discuss our requirements, milestone roadmap, and get a tailored proposal.\n\n` +
      `Best regards`
    );

    const mailtoUrl = `mailto:pppankaj2816@gmail.com?subject=${subject}&body=${body}`;
    if (window.App) {
      window.App.showToast('Opening direct email to pppankaj2816@gmail.com...');
    }
    window.location.href = mailtoUrl;
  }

  calculate() {
    const project = this.projectTypes[this.selectedProject] || this.projectTypes['fullstack-webapp'];
    let totalDays = project.days;

    const breakdownContainer = document.getElementById('estimator-breakdown-list');
    let breakdownHTML = `
      <div class="breakdown-row" style="padding-bottom: 8px; border-bottom: 1px solid var(--border-subtle);">
        <div>
          <strong style="color: var(--text-primary); font-size: 0.9rem;">${project.name}</strong>
          <div style="font-size: 0.76rem; color: var(--text-muted);">${project.scopeTier}</div>
        </div>
        <span style="color: var(--accent-cyan); font-family: var(--font-mono); font-size: 0.8rem; font-weight: 600;">Core Base</span>
      </div>
    `;

    // Infrastructure
    this.selectedInfra.forEach(key => {
      const item = this.infraOptions[key];
      if (item) {
        totalDays += item.days;
        breakdownHTML += `
          <div class="breakdown-row" style="font-size: 0.82rem; color: var(--text-muted);">
            <span><i class="fa-solid fa-server" style="margin-right: 6px; color: var(--accent-cyan);"></i>${item.name}</span>
            <span style="font-family: var(--font-mono); color: var(--accent-emerald);">Included</span>
          </div>
        `;
      }
    });

    // Addons
    this.selectedAddons.forEach(key => {
      const item = this.addonOptions[key];
      if (item) {
        totalDays += item.days;
        breakdownHTML += `
          <div class="breakdown-row" style="font-size: 0.82rem; color: var(--text-muted);">
            <span><i class="fa-solid fa-check" style="margin-right: 6px; color: var(--accent-cyan);"></i>${item.name}</span>
            <span style="font-family: var(--font-mono); color: var(--accent-emerald);">Included</span>
          </div>
        `;
      }
    });

    // Update Display
    const tierDisplay = document.getElementById('estimator-total-price');
    const timelineDisplay = document.getElementById('estimator-total-timeline');

    if (tierDisplay) {
      tierDisplay.innerHTML = `<span style="font-size: 1.6rem; color: var(--text-primary);">${project.scopeTier}</span>`;
    }
    if (timelineDisplay) {
      timelineDisplay.innerHTML = `<i class="fa-solid fa-clock" style="margin-right: 6px;"></i>Estimated Sprints: ${totalDays} - ${totalDays + 4} Working Days`;
    }
    if (breakdownContainer) {
      breakdownContainer.innerHTML = breakdownHTML;
    }

    this.lastCalculation = {
      project: project.name,
      tier: project.scopeTier,
      totalDays: `${totalDays} - ${totalDays + 4} Working Days`,
      infra: this.selectedInfra.map(k => this.infraOptions[k]?.name).filter(Boolean),
      addons: this.selectedAddons.map(k => this.addonOptions[k]?.name).filter(Boolean)
    };
  }

  exportToWhatsApp() {
    if (!this.lastCalculation) return;

    const phoneNumber = "918219352124"; // Developer WhatsApp Link
    const text = `Hello Pankaj & Tushar (PixelToCloud Solutions),\n\nI just configured an architecture scope on your website:\n` +
      `*Architecture:* ${this.lastCalculation.project}\n` +
      `*Scope Tier:* ${this.lastCalculation.tier}\n` +
      `*Target Timeline:* ${this.lastCalculation.totalDays}\n` +
      `*Infrastructure:* ${this.lastCalculation.infra.join(', ') || 'Standard'}\n` +
      `*Features:* ${this.lastCalculation.addons.join(', ') || 'Standard'}\n` +
      `*Payment Model:* 100% Milestone-Based\n\n` +
      `Can we schedule a quick call to discuss details, budget, and kick off development?`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${phoneNumber}?text=${encoded}`, '_blank');
  }

  applyToContactForm() {
    if (!this.lastCalculation) return;

    const contactMsg = document.getElementById('contact-message');
    const contactSection = document.getElementById('contact');

    if (contactMsg) {
      contactMsg.value = `Architecture Scope: ${this.lastCalculation.project}\nScope Tier: ${this.lastCalculation.tier}\nTarget Timeline: ${this.lastCalculation.totalDays}\nSelected Infrastructure: ${this.lastCalculation.infra.join(', ')}\nSelected Features: ${this.lastCalculation.addons.join(', ')}\n\nLooking forward to discussing our project roadmap & budget!`;
    }

    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }

    if (window.App) {
      window.App.showToast('Technical specification transferred to Contact Form!');
    }
  }
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
  window.estimatorInstance = new ProjectEstimator();
});
