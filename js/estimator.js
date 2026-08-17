/* ===================================================================
   PANKAJ TECH STUDIO - INTERACTIVE PROJECT COST & TIMELINE ESTIMATOR
   Dynamic multi-step calculator with instant quote generator & WhatsApp export
   =================================================================== */

class ProjectEstimator {
  constructor() {
    this.currency = 'INR'; // 'INR' or 'USD'
    this.usdRate = 0.012; // 1 INR = ~0.012 USD
    
    // Base Project Types
    this.projectTypes = {
      'custom-website': { name: 'Modern Business Website', costINR: 12000, days: 5, desc: 'Responsive, ultra-fast, SEO-optimized showcase' },
      'fullstack-webapp': { name: 'Full-Stack Web Application', costINR: 28000, days: 12, desc: 'Dynamic database, authentication & user workflows' },
      '3d-software': { name: 'Interactive 2D/3D WebGL Software', costINR: 38000, days: 16, desc: 'Real-time 3D canvas, orbit visualizer, CAD/tools' },
      'ca-portal': { name: 'CA & Financial Tax Portal', costINR: 32000, days: 14, desc: 'Tax calculation engines, document lockers & audit trails' },
      'doctor-portal': { name: 'Doctor & Clinic Telehealth Suite', costINR: 30000, days: 12, desc: 'Live appointment scheduler, video rooms & EHR' },
      'artisan-ecommerce': { name: 'Luxury Art & Craft E-Commerce', costINR: 26000, days: 10, desc: '360° product inspector, global payments & boutique UI' },
      'custom-saas': { name: 'Enterprise SaaS & Cloud System', costINR: 48000, days: 22, desc: 'High-concurrency microservices, multi-tenant DB' }
    };

    // Infrastructure & Server Options
    this.infraOptions = {
      'free-hosting': { name: 'Vercel / Netlify / GitHub Pages Setup', costINR: 0, days: 0 },
      'vps-linux': { name: 'Dedicated Linux VPS + Nginx Server', costINR: 4500, days: 1 },
      'aws-cloud': { name: 'AWS Cloud / Docker Container Cluster', costINR: 8500, days: 2 },
      'domain-dns': { name: 'Custom Domain + Cloudflare DNS Routing', costINR: 2000, days: 1 },
      'business-mail': { name: 'Business Email Setup (SPF, DKIM, DMARC)', costINR: 1500, days: 1 },
      'ssl-security': { name: 'Automated SSL & Security Hardening', costINR: 1200, days: 0 }
    };

    // Add-On Features
    this.addonOptions = {
      'speed-boost': { name: 'PageSpeed 99+ Core Web Vitals Optimization', costINR: 3000, days: 1 },
      'payment-gateways': { name: 'Payment Gateway Integration (Razorpay / Stripe)', costINR: 3500, days: 1 },
      'admin-cms': { name: 'Custom Admin Dashboard & CMS Control Panel', costINR: 8000, days: 3 },
      'maintenance-year': { name: '1 Year Priority Maintenance & Automated Backups', costINR: 9000, days: 0 },
      'seo-package': { name: 'Advanced Technical SEO & Rich Snippet Setup', costINR: 3500, days: 1 }
    };

    // Selected state
    this.selectedProject = 'fullstack-webapp';
    this.selectedInfra = ['domain-dns', 'ssl-security'];
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
          <div class="estimator-option-cost">${this.formatPrice(item.costINR)}</div>
        </div>
      `).join('');
    }

    // Render Infrastructure Grid
    const infraGrid = document.getElementById('estimator-infra-options');
    if (infraGrid) {
      infraGrid.innerHTML = Object.entries(this.infraOptions).map(([key, item]) => `
        <div class="estimator-option-card ${this.selectedInfra.includes(key) ? 'selected' : ''}" data-type="infra" data-id="${key}">
          <div class="estimator-option-title">${item.name}</div>
          <div class="estimator-option-cost">${item.costINR === 0 ? 'FREE Setup' : '+' + this.formatPrice(item.costINR)}</div>
        </div>
      `).join('');
    }

    // Render Add-ons Grid
    const addonGrid = document.getElementById('estimator-addon-options');
    if (addonGrid) {
      addonGrid.innerHTML = Object.entries(this.addonOptions).map(([key, item]) => `
        <div class="estimator-option-card ${this.selectedAddons.includes(key) ? 'selected' : ''}" data-type="addon" data-id="${key}">
          <div class="estimator-option-title">${item.name}</div>
          <div class="estimator-option-cost">+${this.formatPrice(item.costINR)}</div>
        </div>
      `).join('');
    }
  }

  bindEvents() {
    // Project Type Click
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

    // Currency Switcher Buttons
    const currencyButtons = document.querySelectorAll('.currency-toggle-btn');
    currencyButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        currencyButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currency = btn.getAttribute('data-currency');
        this.renderUI();
        this.calculate();
      });
    });

    // Action Buttons
    const exportWhatsAppBtn = document.getElementById('estimator-export-whatsapp');
    if (exportWhatsAppBtn) {
      exportWhatsAppBtn.addEventListener('click', () => this.exportToWhatsApp());
    }

    const applyContactBtn = document.getElementById('estimator-apply-contact');
    if (applyContactBtn) {
      applyContactBtn.addEventListener('click', () => this.applyToContactForm());
    }
  }

  formatPrice(inrAmount) {
    if (this.currency === 'USD') {
      const usd = Math.round(inrAmount * this.usdRate);
      return `$ ${usd.toLocaleString('en-US')}`;
    }
    return `₹ ${inrAmount.toLocaleString('en-IN')}`;
  }

  calculate() {
    const project = this.projectTypes[this.selectedProject] || this.projectTypes['fullstack-webapp'];
    let totalCost = project.costINR;
    let totalDays = project.days;

    const breakdownContainer = document.getElementById('estimator-breakdown-list');
    let breakdownHTML = `
      <div class="breakdown-row">
        <span>${project.name}</span>
        <strong>${this.formatPrice(project.costINR)}</strong>
      </div>
    `;

    // Infrastructure
    this.selectedInfra.forEach(key => {
      const item = this.infraOptions[key];
      if (item) {
        totalCost += item.costINR;
        totalDays += item.days;
        breakdownHTML += `
          <div class="breakdown-row" style="font-size: 0.82rem; color: var(--text-muted);">
            <span>+ ${item.name}</span>
            <span>${item.costINR === 0 ? 'FREE' : this.formatPrice(item.costINR)}</span>
          </div>
        `;
      }
    });

    // Addons
    this.selectedAddons.forEach(key => {
      const item = this.addonOptions[key];
      if (item) {
        totalCost += item.costINR;
        totalDays += item.days;
        breakdownHTML += `
          <div class="breakdown-row" style="font-size: 0.82rem; color: var(--text-muted);">
            <span>+ ${item.name}</span>
            <span>${this.formatPrice(item.costINR)}</span>
          </div>
        `;
      }
    });

    // Update Display
    const priceDisplay = document.getElementById('estimator-total-price');
    const timelineDisplay = document.getElementById('estimator-total-timeline');

    if (priceDisplay) {
      priceDisplay.textContent = this.formatPrice(totalCost);
    }
    if (timelineDisplay) {
      timelineDisplay.textContent = `⚡ Ready in ${totalDays} - ${totalDays + 4} Working Days`;
    }
    if (breakdownContainer) {
      breakdownContainer.innerHTML = breakdownHTML;
    }

    this.lastCalculation = {
      project: project.name,
      totalCost: this.formatPrice(totalCost),
      totalDays: `${totalDays} - ${totalDays + 4} Days`,
      infra: this.selectedInfra.map(k => this.infraOptions[k]?.name).filter(Boolean),
      addons: this.selectedAddons.map(k => this.addonOptions[k]?.name).filter(Boolean)
    };
  }

  exportToWhatsApp() {
    if (!this.lastCalculation) return;

    const phoneNumber = "918219352124"; // Developer WhatsApp Link
    const text = `👋 Hello Pankaj (PixelToCloud Solutions),\n\nI just configured an estimate on your website for my project:\n` +
      `📌 *Scope:* ${this.lastCalculation.project}\n` +
      `💰 *Estimated Budget:* ${this.lastCalculation.totalCost}\n` +
      `⏱️ *Target Delivery:* ${this.lastCalculation.totalDays}\n` +
      `🌐 *Infrastructure:* ${this.lastCalculation.infra.join(', ') || 'Standard'}\n` +
      `✨ *Add-ons:* ${this.lastCalculation.addons.join(', ') || 'None'}\n\n` +
      `Can we schedule a quick call to discuss details and kick off development?`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${phoneNumber}?text=${encoded}`, '_blank');
  }

  applyToContactForm() {
    if (!this.lastCalculation) return;

    const contactMsg = document.getElementById('contact-message');
    const contactSection = document.getElementById('contact');

    if (contactMsg) {
      contactMsg.value = `Project Type: ${this.lastCalculation.project}\nEstimated Budget: ${this.lastCalculation.totalCost}\nTarget Timeline: ${this.lastCalculation.totalDays}\nSelected Infrastructure: ${this.lastCalculation.infra.join(', ')}\nSelected Add-ons: ${this.lastCalculation.addons.join(', ')}\n\nLooking forward to discussing our roadmap!`;
    }

    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }

    if (window.App) {
      window.App.showToast('✅ Estimate configuration transferred to Contact Form!');
    }
  }
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
  window.estimatorInstance = new ProjectEstimator();
});
