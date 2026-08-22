/* ===================================================================
   BHAVYANSH TECH STUDIO - TECHNICAL SOLUTION BUILDER & SCOPE ESTIMATOR
   Dynamic multi-step architecture configurator with custom milestone scoping
   and PDF Architecture Blueprint Generator
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
      },
      'mobile-app': {
        name: 'Cross-Platform Mobile App (Android + iOS)',
        scopeTier: 'Mobile Native Performance',
        days: 16,
        badge: '📱 React Native / Flutter + Store Deploy',
        desc: 'Native iOS & Android mobile application with biometric auth, push notifications, offline SQLite, and app store deployment.'
      },
      'ai-ml-engine': {
        name: 'AI & Intelligent Machine Learning Engine',
        scopeTier: 'Intelligent Automation',
        days: 18,
        badge: '🤖 LLM Chatbots + Predictive Models',
        desc: 'Custom GPT/LLM integration, real-time sentiment analysis, computer vision, recommendation systems, and model inference pipelines.'
      },
      'desktop-software': {
        name: 'Cross-Platform Desktop Software (Win / Mac / Linux)',
        scopeTier: 'Native Desktop Application',
        days: 14,
        badge: '🖥️ Electron / Tauri + Offline SQLite',
        desc: 'Enterprise desktop tools, billing/POS systems, local hardware access, auto-updates, and native OS window integration.'
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
        badge: '🔍 Structured Search Schema',
        days: 1
      },
      'ai-chatbot-addon': {
        name: 'Intelligent AI Chatbot & Knowledge Base Assistant',
        badge: '🤖 GPT / Claude RAG Integration',
        days: 2
      },
      'push-notifications-addon': {
        name: 'Multi-Platform Push Notifications & SMS Alerts',
        badge: '🔔 Firebase Cloud Messaging',
        days: 1
      }
    };

    // Initial Defaults
    this.selectedProject = 'fullstack-webapp';
    this.selectedInfra = ['vps-linux', 'domain-dns', 'ssl-security'];
    this.selectedAddons = ['speed-boost', 'seo-package'];

    this.lastCalculation = null;

    this.init();
  }

  init() {
    this.renderOptions();
    this.bindEvents();
    this.calculate();
  }

  renderOptions() {
    // 1. Project Types
    const projContainer = document.getElementById('estimator-project-types');
    if (projContainer) {
      projContainer.innerHTML = Object.keys(this.projectTypes).map(key => {
        const item = this.projectTypes[key];
        const isSelected = key === this.selectedProject ? 'selected' : '';
        return `
          <div class="estimator-option-card ${isSelected}" data-type="project" data-key="${key}">
            <div class="estimator-option-title">${item.name}</div>
            <div class="estimator-option-desc">${item.desc}</div>
            <div class="estimator-option-cost">${item.badge}</div>
          </div>
        `;
      }).join('');
    }

    // 2. Infrastructure Options
    const infraContainer = document.getElementById('estimator-infra-options');
    if (infraContainer) {
      infraContainer.innerHTML = Object.keys(this.infraOptions).map(key => {
        const item = this.infraOptions[key];
        const isSelected = this.selectedInfra.includes(key) ? 'selected' : '';
        return `
          <div class="estimator-option-card ${isSelected}" data-type="infra" data-key="${key}">
            <div class="estimator-option-title">${item.name}</div>
            <div class="estimator-option-cost">${item.badge}</div>
          </div>
        `;
      }).join('');
    }

    // 3. Addon Options
    const addonContainer = document.getElementById('estimator-addon-options');
    if (addonContainer) {
      addonContainer.innerHTML = Object.keys(this.addonOptions).map(key => {
        const item = this.addonOptions[key];
        const isSelected = this.selectedAddons.includes(key) ? 'selected' : '';
        return `
          <div class="estimator-option-card ${isSelected}" data-type="addon" data-key="${key}">
            <div class="estimator-option-title">${item.name}</div>
            <div class="estimator-option-cost">${item.badge}</div>
          </div>
        `;
      }).join('');
    }
  }

  bindEvents() {
    const container = document.getElementById('estimator-interactive-container');
    if (!container) return;

    container.addEventListener('click', (e) => {
      const card = e.target.closest('.estimator-option-card');
      if (!card) return;

      const type = card.getAttribute('data-type');
      const key = card.getAttribute('data-key');

      if (type === 'project') {
        this.selectedProject = key;
        container.querySelectorAll('[data-type="project"]').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
      } else if (type === 'infra') {
        if (this.selectedInfra.includes(key)) {
          this.selectedInfra = this.selectedInfra.filter(k => k !== key);
          card.classList.remove('selected');
        } else {
          this.selectedInfra.push(key);
          card.classList.add('selected');
        }
      } else if (type === 'addon') {
        if (this.selectedAddons.includes(key)) {
          this.selectedAddons = this.selectedAddons.filter(k => k !== key);
          card.classList.remove('selected');
        } else {
          this.selectedAddons.push(key);
          card.classList.add('selected');
        }
      }

      this.calculate();
    });

    // Buttons
    const emailBtn = document.getElementById('estimator-export-email');
    const waBtn = document.getElementById('estimator-export-whatsapp');
    const contactBtn = document.getElementById('estimator-apply-contact');
    const pdfBtn = document.getElementById('estimator-export-pdf');

    if (emailBtn) emailBtn.addEventListener('click', () => this.applyToContactForm());
    if (waBtn) waBtn.addEventListener('click', () => this.exportToWhatsApp());
    if (contactBtn) contactBtn.addEventListener('click', () => this.applyToContactForm());
    if (pdfBtn) pdfBtn.addEventListener('click', () => this.downloadBlueprintPDF());
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

  downloadBlueprintPDF() {
    if (!this.lastCalculation) return;

    const calc = this.lastCalculation;
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      if (window.showToast) window.showToast('Please allow popups to export the Architecture Blueprint', 'warning');
      return;
    }

    const blueprintHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>PixelToCloud Solutions - Technical Architecture Blueprint</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #0f172a; padding: 40px; margin: 0; background: #fff; line-height: 1.6; }
          .header { border-bottom: 2px solid #0284c7; padding-bottom: 20px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: flex-start; }
          .brand { font-size: 24px; font-weight: 800; color: #0f172a; }
          .brand span { color: #0284c7; }
          .tagline { font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 1px; margin-top: 4px; }
          .meta-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px; margin-bottom: 24px; }
          .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
          .meta-item { font-size: 13px; }
          .meta-label { color: #64748b; font-weight: 600; text-transform: uppercase; font-size: 11px; }
          .meta-val { color: #0f172a; font-weight: 700; font-size: 15px; margin-top: 2px; }
          .section-title { font-size: 16px; font-weight: 700; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin: 24px 0 12px 0; }
          ul { margin: 0; padding-left: 20px; font-size: 14px; color: #334155; }
          li { margin-bottom: 6px; }
          .footer { margin-top: 40px; border-top: 1px solid #e2e8f0; padding-top: 20px; font-size: 12px; color: #64748b; display: flex; justify-content: space-between; }
          .btn-print { background: #0284c7; color: #fff; padding: 10px 20px; border: none; border-radius: 6px; font-weight: 700; cursor: pointer; margin-bottom: 20px; }
          @media print { .btn-print { display: none; } }
        </style>
      </head>
      <body>
        <button class="btn-print" onclick="window.print()">🖨️ Print / Save as PDF</button>
        <div class="header">
          <div>
            <div class="brand">PixelTo<span>Cloud</span> Solutions</div>
            <div class="tagline">Enterprise Web Architecture & Cloud Systems</div>
          </div>
          <div style="text-align: right; font-size: 12px; color: #64748b;">
            <div><strong>Date:</strong> ${new Date().toLocaleDateString()}</div>
            <div><strong>Reference:</strong> #P2C-${Math.floor(100000 + Math.random() * 900000)}</div>
          </div>
        </div>

        <div class="meta-box">
          <div class="meta-grid">
            <div class="meta-item">
              <div class="meta-label">Selected System Architecture</div>
              <div class="meta-val">${calc.project}</div>
            </div>
            <div class="meta-item">
              <div class="meta-label">Scope Complexity Tier</div>
              <div class="meta-val">${calc.tier}</div>
            </div>
            <div class="meta-item">
              <div class="meta-label">Estimated Delivery Timeline</div>
              <div class="meta-val">${calc.totalDays}</div>
            </div>
            <div class="meta-item">
              <div class="meta-label">Guaranteed Engineering SLA</div>
              <div class="meta-val">99+ Google PageSpeed & 100% IP Handover</div>
            </div>
          </div>
        </div>

        <div class="section-title">Selected Cloud Infrastructure & Server Stack</div>
        <ul>
          ${calc.infra.length > 0 ? calc.infra.map(i => `<li>${i}</li>`).join('') : '<li>Standard High-Speed Edge Deployment</li>'}
        </ul>

        <div class="section-title">Included Engineering Modules & Security Add-Ons</div>
        <ul>
          ${calc.addons.length > 0 ? calc.addons.map(a => `<li>${a}</li>`).join('') : '<li>Standard Core Web Vitals Optimization</li>'}
        </ul>

        <div class="section-title">Milestone Delivery & Quality Guarantees</div>
        <ul>
          <li><strong>Phase 1:</strong> Architecture Blueprint, Wireframe & Schema Design (Approved before coding)</li>
          <li><strong>Phase 2:</strong> Agile Full-Stack Engineering & Continuous Milestone Demos</li>
          <li><strong>Phase 3:</strong> Hardened Linux VPS / Cloud Deployment & SSL / DNS Propagation</li>
          <li><strong>Handover:</strong> 100% Intellectual Property & Complete Git Repository Ownership transferred.</li>
          <li><strong>Warranty:</strong> 30 Days of Complimentary Post-Launch Server Monitoring & Bug-Free SLA.</li>
        </ul>

        <div class="footer">
          <div><strong>Founders:</strong> Bhavyansh Agarwal & Tushar Singhal</div>
          <div><strong>WhatsApp:</strong> +91 82193 52124 | <strong>Email:</strong> pppankaj2816@gmail.com</div>
        </div>
      </body>
      </html>
    `;

    printWindow.document.write(blueprintHTML);
    printWindow.document.close();
    if (window.showToast) window.showToast('📄 Technical Architecture Blueprint opened for printing/PDF export!', 'success');
  }

  exportToWhatsApp() {
    if (!this.lastCalculation) return;

    const phoneNumber = "918219352124";
    const text = `Hello Bhavyansh & Tushar (PixelToCloud Solutions),\n\nI just configured an architecture scope on your website:\n` +
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

    if (window.showToast) {
      window.showToast('Technical specification transferred to Contact Form!', 'info');
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.estimatorInstance = new ProjectEstimator();
});
