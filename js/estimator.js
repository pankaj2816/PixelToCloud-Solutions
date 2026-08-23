/* ===================================================================
   PIXELTOCLOUD SOLUTIONS - SMART SCOPE & TIMELINE ESTIMATOR
   Transparent 3-Step Project Builder with Milestone Roadmaps
   =================================================================== */

class ProjectEstimator {
  constructor() {
    this.deliverySpeed = 'standard'; // 'express', 'standard', 'enterprise'

    // Step 1: Human-Friendly Project Types
    this.projectTypes = {
      'custom-website': {
        name: '🌐 Modern Business Website',
        scopeTier: 'Lightning Fast Showcase',
        days: 7,
        badge: '⚡ 60 FPS Speed + Mobile Friendly',
        desc: 'Professional, ultra-fast website for your brand or agency. Optimized for Google SEO and instant loading.'
      },
      'artisan-ecommerce': {
        name: '🛒 E-Commerce & Online Store',
        scopeTier: 'High-Converting Online Store',
        days: 12,
        badge: '🛍️ Products + Instant Checkout',
        desc: 'Custom online shop with product search, cart, multi-currency pricing, and automated order tracking.'
      },
      'mobile-app': {
        name: '📱 Mobile App (iOS & Android)',
        scopeTier: 'Cross-Platform Mobile App',
        days: 16,
        badge: '📲 Play Store & App Store Ready',
        desc: 'Smooth native iOS and Android application with push alerts, offline storage, and biometric login.'
      },
      'fullstack-webapp': {
        name: '💻 Custom Web Application',
        scopeTier: 'Full-Stack Dynamic Software',
        days: 14,
        badge: '🔥 Logins, Dashboards & Database',
        desc: 'Complete web portal with role-based user logins, relational database, analytics dashboards, and workflows.'
      },
      'ai-ml-engine': {
        name: '🤖 Custom AI & Smart Chatbot',
        scopeTier: 'Intelligent Automation',
        days: 14,
        badge: '🧠 Trained on Your Business Data',
        desc: 'Custom AI chatbots, document question-answering, automated workflows, and smart customer support.'
      },
      'desktop-software': {
        name: '🖥️ Desktop Software (Win / Mac)',
        scopeTier: 'Native Offline Desktop Tool',
        days: 14,
        badge: '⚙️ Tauri / Rust + Offline SQLite',
        desc: 'Fast desktop billing software, inventory manager, POS terminal, or internal business tool.'
      },
      'doctor-portal': {
        name: '🩺 Doctor & Booking Portal',
        scopeTier: 'Healthcare & Appointment Suite',
        days: 12,
        badge: '📅 Real-Time Calendar & Video EHR',
        desc: 'Live booking calendar, patient record management, automated reminders, and video consult rooms.'
      }
    };

    // Step 2: Essential Features & Add-ons
    this.addonOptions = {
      'payment-gateways': {
        name: '💳 Online Payment Gateways',
        badge: 'UPI, Cards, Stripe & Razorpay',
        days: 1
      },
      'push-notifications-addon': {
        name: '🔔 WhatsApp & SMS Alerts',
        badge: 'Instant Automated Notifications',
        days: 1
      },
      'admin-cms': {
        name: '⚙️ Easy Admin Dashboard',
        badge: 'Update Text & Products Anytime',
        days: 2
      },
      'seo-package': {
        name: '🔍 Top Google Search SEO',
        badge: 'Structured Schema & Fast Indexing',
        days: 1
      },
      'speed-boost': {
        name: '⚡ Turbo Speed (PageSpeed 99+)',
        badge: 'Sub-Second Page Load Optimization',
        days: 1
      },
      'ssl-security': {
        name: '🔒 Bank-Grade SSL & Security',
        badge: 'Free Lifetime SSL & Firewall',
        days: 0
      },
      'domain-dns': {
        name: '🌐 Domain & Cloudflare Setup',
        badge: 'Global CDN & DDoS Protection',
        days: 1
      },
      'maintenance-year': {
        name: '🛡️ Priority Support & Backups',
        badge: 'Automated Daily Cloud Backups',
        days: 0
      }
    };

    // Step 3: Launch Speeds
    this.speedOptions = {
      'express': {
        name: '⚡ Express Sprint (Fast Delivery)',
        desc: 'Dedicated sprint focus for urgent deadlines.',
        dayModifier: -3
      },
      'standard': {
        name: '🎯 Standard Sprint (Recommended)',
        desc: 'Balanced milestone schedule with thorough testing.',
        dayModifier: 0
      },
      'enterprise': {
        name: '🏢 Comprehensive Enterprise Scale',
        desc: 'Deep architecture, extensive QA, and staging review.',
        dayModifier: 4
      }
    };

    // Initial Defaults
    this.selectedProject = 'custom-website';
    this.selectedAddons = ['payment-gateways', 'seo-package', 'speed-boost', 'ssl-security'];
    this.selectedSpeed = 'standard';

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

    // 2. Feature Addons
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

    // 3. Launch Speed Options
    const speedContainer = document.getElementById('estimator-infra-options');
    if (speedContainer) {
      speedContainer.innerHTML = Object.keys(this.speedOptions).map(key => {
        const item = this.speedOptions[key];
        const isSelected = key === this.selectedSpeed ? 'selected' : '';
        return `
          <div class="estimator-option-card ${isSelected}" data-type="speed" data-key="${key}">
            <div class="estimator-option-title">${item.name}</div>
            <div class="estimator-option-desc">${item.desc}</div>
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
      } else if (type === 'speed') {
        this.selectedSpeed = key;
        container.querySelectorAll('[data-type="speed"]').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
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
    const project = this.projectTypes[this.selectedProject] || this.projectTypes['custom-website'];
    const speed = this.speedOptions[this.selectedSpeed] || this.speedOptions['standard'];
    let totalDays = Math.max(5, project.days + (speed.dayModifier || 0));

    const breakdownContainer = document.getElementById('estimator-breakdown-list');
    let breakdownHTML = `
      <div class="breakdown-row" style="padding-bottom: 8px; border-bottom: 1px solid var(--border-subtle);">
        <div>
          <strong style="color: var(--text-primary); font-size: 0.9rem;">${project.name}</strong>
          <div style="font-size: 0.76rem; color: var(--accent-cyan);">${project.scopeTier}</div>
        </div>
        <span style="color: var(--accent-emerald); font-family: var(--font-mono); font-size: 0.8rem; font-weight: 700;">Base Setup</span>
      </div>
    `;

    // Speed option breakdown
    breakdownHTML += `
      <div class="breakdown-row" style="font-size: 0.82rem; color: var(--text-muted);">
        <span><i class="fa-solid fa-gauge-high" style="margin-right: 6px; color: var(--accent-cyan);"></i>${speed.name}</span>
        <span style="font-family: var(--font-mono); color: var(--accent-cyan);">Selected</span>
      </div>
    `;

    // Addons
    this.selectedAddons.forEach(key => {
      const item = this.addonOptions[key];
      if (item) {
        totalDays += item.days;
        breakdownHTML += `
          <div class="breakdown-row" style="font-size: 0.82rem; color: var(--text-muted);">
            <span><i class="fa-solid fa-check" style="margin-right: 6px; color: var(--accent-emerald);"></i>${item.name}</span>
            <span style="font-family: var(--font-mono); color: var(--accent-emerald);">Included</span>
          </div>
        `;
      }
    });

    // Update Display
    const tierDisplay = document.getElementById('estimator-total-price');
    const timelineDisplay = document.getElementById('estimator-total-timeline');

    if (tierDisplay) {
      tierDisplay.innerHTML = `<span style="font-size: 1.5rem; color: var(--text-primary); font-weight: 800;">${project.scopeTier}</span>`;
    }
    if (timelineDisplay) {
      timelineDisplay.innerHTML = `<i class="fa-solid fa-clock" style="margin-right: 6px; color: #10b981;"></i>Estimated Delivery: <strong>${totalDays} - ${totalDays + 3} Working Days</strong>`;
    }
    if (breakdownContainer) {
      breakdownContainer.innerHTML = breakdownHTML;
    }

    this.lastCalculation = {
      project: project.name,
      tier: project.scopeTier,
      totalDays: `${totalDays} - ${totalDays + 3} Working Days`,
      speed: speed.name,
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

        <div class="section-title">Delivery Speed & Timeline</div>
        <ul>
          <li><strong>Target Speed:</strong> ${calc.speed}</li>
          <li><strong>Estimated Timeline:</strong> ${calc.totalDays}</li>
        </ul>

        <div class="section-title">Included Features & Engineering Modules</div>
        <ul>
          ${calc.addons.length > 0 ? calc.addons.map(a => `<li>${a}</li>`).join('') : '<li>Standard Core Web Vitals & Mobile Optimization</li>'}
        </ul>

        <div class="section-title">Milestone Delivery & Quality Guarantees</div>
        <ul>
          <li><strong>Phase 1:</strong> UI/UX Wireframes, Interactive Prototype & Architecture Approval</li>
          <li><strong>Phase 2:</strong> Full-Stack Engineering, Feature Integration & Milestone Demos</li>
          <li><strong>Phase 3:</strong> Testing, SSL / Domain Configuration & Cloud Launch</li>
          <li><strong>Handover:</strong> 100% Intellectual Property & Complete Git Repository Ownership transferred.</li>
          <li><strong>Warranty:</strong> 30 Days of Complimentary Post-Launch Server Monitoring & Bug-Free SLA.</li>
        </ul>

        <div class="footer">
          <div><strong>Founders:</strong> Bhavyansh Agarwal & Tushar Singhal</div>
          <div><strong>Email:</strong> pixeltocloud@gmail.com (Primary) | <strong>Phone:</strong> +91 99281 96424 | <strong>WhatsApp:</strong> +91 99281 96424</div>
        </div>
      </body>
      </html>
    `;

    printWindow.document.write(blueprintHTML);
    printWindow.document.close();
    if (window.showToast) window.showToast('📄 Project Blueprint opened for printing/PDF export!', 'success');
  }

  exportToWhatsApp() {
    if (!this.lastCalculation) return;

    const phoneNumber = "919928196424";
    const text = `Hello Bhavyansh & Tushar (PixelToCloud Solutions),\n\nI just built a project scope on your website estimator:\n` +
      `• *Project Type:* ${this.lastCalculation.project}\n` +
      `• *Scope Tier:* ${this.lastCalculation.tier}\n` +
      `• *Target Timeline:* ${this.lastCalculation.totalDays}\n` +
      `• *Delivery Speed:* ${this.lastCalculation.speed}\n` +
      `• *Selected Features:* ${this.lastCalculation.addons.join(', ') || 'Standard Core Features'}\n` +
      `• *Payment Terms:* 100% Flexible Milestone Payments\n\n` +
      `Can we schedule a quick call to discuss the exact details, budget, and kick off development?`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${phoneNumber}?text=${encoded}`, '_blank');
  }

  applyToContactForm() {
    if (!this.lastCalculation) return;

    const contactMsg = document.getElementById('contact-message');
    const contactSection = document.getElementById('contact');

    if (contactMsg) {
      contactMsg.value = `Project Type: ${this.lastCalculation.project}\nScope Tier: ${this.lastCalculation.tier}\nTarget Timeline: ${this.lastCalculation.totalDays}\nDelivery Speed: ${this.lastCalculation.speed}\nSelected Features: ${this.lastCalculation.addons.join(', ')}\n\nLooking forward to discussing our project roadmap & budget!`;
    }

    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }

    if (window.showToast) {
      window.showToast('Project specification transferred to Contact Form!', 'info');
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.estimatorInstance = new ProjectEstimator();
});
