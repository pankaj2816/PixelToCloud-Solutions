/* ===================================================================
   PIXELTOCLOUD SOLUTIONS - SMART COST SAVINGS CALCULATOR 2.0
   Interactive Platform Presets, Live SVG Projection Chart & PDF Export
   =================================================================== */

class ROICalculatorEngine {
  constructor() {
    this.currency = 'INR'; // 'INR' or 'USD'
    this.currentPresetKey = 'shopify';
    this.monthlyPluginInput = document.getElementById('roi-plugin-cost-slider');
    this.pluginValDisplay = document.getElementById('roi-plugin-cost-val');
    this.lifespanInput = document.getElementById('roi-lifespan-slider');
    this.lifespanValDisplay = document.getElementById('roi-lifespan-val');
    this.savingsTotalEl = document.getElementById('roi-total-savings-val');
    
    // Dynamic Breakdown Elements
    this.breakdownPluginsEl = document.getElementById('roi-bd-plugins');
    this.breakdownHostingEl = document.getElementById('roi-bd-hosting');
    this.breakdownMaintEl = document.getElementById('roi-bd-maint');
    this.chartSvg = document.getElementById('roi-projection-chart');
    this.presetItemsListEl = document.getElementById('roi-preset-items-list');
    this.presetSolutionEl = document.getElementById('roi-preset-solution-desc');

    this.waBtn = document.getElementById('roi-whatsapp-cta');
    this.pdfBtn = document.getElementById('roi-pdf-cta');

    // Preset Configurations [INR, USD] & Real Cost Math
    this.presets = {
      'shopify': {
        inr: 14500,
        usd: 180,
        name: 'Shopify E-Commerce Store',
        items: [
          { name: 'Shopify Basic Plan', inr: '₹2,499 / mo', usd: '$29 / mo' },
          { name: 'Klaviyo Email & SMS Suite', inr: '₹3,500 / mo', usd: '$45 / mo' },
          { name: 'PageFly / Shogun Page Builder', inr: '₹2,900 / mo', usd: '$39 / mo' },
          { name: 'Judge.me / Loox Reviews App', inr: '₹2,400 / mo', usd: '$30 / mo' },
          { name: 'Upsells, Speed & Currency Apps', inr: '₹3,200 / mo', usd: '$37 / mo' }
        ],
        solution: 'PixelToCloud builds reviews, multi-currency, checkout upsells, and responsive pages directly in clean custom code. Zero recurring app fees.'
      },
      'wordpress': {
        inr: 6500,
        usd: 80,
        name: 'WordPress & WooCommerce',
        items: [
          { name: 'Elementor Pro / Theme License', inr: '₹1,800 / mo', usd: '$22 / mo' },
          { name: 'Wordfence / Sucuri Security', inr: '₹1,500 / mo', usd: '$18 / mo' },
          { name: 'WP Rocket Speed Caching', inr: '₹1,200 / mo', usd: '$15 / mo' },
          { name: 'Cloud Backup & Storage', inr: '₹1,000 / mo', usd: '$12 / mo' },
          { name: 'Monthly Plugin Conflict Fixes', inr: '₹1,000 / mo', usd: '$13 / mo' }
        ],
        solution: 'PixelToCloud provides clean handcrafted CSS/JS and hardened Linux edge servers. No vulnerable plugins to update or break.'
      },
      'webapp': {
        inr: 22000,
        usd: 280,
        name: 'Custom SaaS / Web App',
        items: [
          { name: 'Zapier / Make Automation Tasks', inr: '₹6,000 / mo', usd: '$75 / mo' },
          { name: 'Airtable / External DB Subscriptions', inr: '₹5,500 / mo', usd: '$70 / mo' },
          { name: 'Auth0 / Memberstack Pro', inr: '₹4,500 / mo', usd: '$60 / mo' },
          { name: 'Analytics & Live Chat SDKs', inr: '₹6,000 / mo', usd: '$75 / mo' }
        ],
        solution: 'Native Node.js / Python API backend with PostgreSQL database. Zero per-task automation tax or external record limits.'
      },
      'doctor': {
        inr: 9500,
        usd: 120,
        name: 'Clinic & Doctor Booking Portal',
        items: [
          { name: 'Calendly Pro / Practo Listing', inr: '₹3,500 / mo', usd: '$45 / mo' },
          { name: 'SMS & WhatsApp Reminder API', inr: '₹2,500 / mo', usd: '$30 / mo' },
          { name: 'EHR Cloud Storage Vault', inr: '₹2,000 / mo', usd: '$25 / mo' },
          { name: 'Doctor Video Call SDK', inr: '₹1,500 / mo', usd: '$20 / mo' }
        ],
        solution: 'Self-hosted WebRTC video consultations, encrypted AES-256 patient records, and direct WhatsApp webhook routing.'
      }
    };

    if (this.monthlyPluginInput) {
      this.init();
    }
  }

  init() {
    this.bindEvents();
    this.updateChipLabels();
    this.calculate();
  }

  updateChipLabels() {
    const chipPrices = {
      'shopify': this.currency === 'INR' ? '~₹14.5k/mo' : '~$180/mo',
      'wordpress': this.currency === 'INR' ? '~₹6.5k/mo' : '~$80/mo',
      'webapp': this.currency === 'INR' ? '~₹22k/mo' : '~$280/mo',
      'doctor': this.currency === 'INR' ? '~₹9.5k/mo' : '~$120/mo'
    };
    document.querySelectorAll('.roi-preset-chip').forEach(chip => {
      const key = chip.getAttribute('data-preset');
      const subEl = chip.querySelector('.chip-sub-price');
      if (subEl && chipPrices[key]) {
        subEl.textContent = chipPrices[key];
      }
    });
  }

  bindEvents() {
    const update = () => {
      // Remove active from presets if slider is dragged manually
      document.querySelectorAll('.roi-preset-chip').forEach(c => c.classList.remove('active'));
      this.calculate();
    };

    if (this.monthlyPluginInput) this.monthlyPluginInput.addEventListener('input', update);
    if (this.lifespanInput) this.lifespanInput.addEventListener('input', update);

    // Currency Switcher
    document.querySelectorAll('.roi-currency-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.roi-currency-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currency = btn.getAttribute('data-currency') || 'INR';

        const preset = this.presets[this.currentPresetKey];
        if (this.currency === 'INR') {
          this.monthlyPluginInput.min = 1000;
          this.monthlyPluginInput.max = 40000;
          this.monthlyPluginInput.step = 500;
          this.monthlyPluginInput.value = preset ? preset.inr : 14500;
        } else {
          this.monthlyPluginInput.min = 30;
          this.monthlyPluginInput.max = 1000;
          this.monthlyPluginInput.step = 10;
          this.monthlyPluginInput.value = preset ? preset.usd : 180;
        }
        this.updateChipLabels();
        this.calculate();
      });
    });

    // Preset Platform Chips
    document.querySelectorAll('.roi-preset-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.roi-preset-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const key = chip.getAttribute('data-preset');
        this.currentPresetKey = key;
        const preset = this.presets[key];
        if (preset && this.monthlyPluginInput) {
          this.monthlyPluginInput.value = this.currency === 'INR' ? preset.inr : preset.usd;
          this.calculate();
        }
      });
    });

    // WhatsApp Action
    if (this.waBtn) {
      this.waBtn.addEventListener('click', () => {
        const monthly = this.monthlyPluginInput ? parseFloat(this.monthlyPluginInput.value) : 14500;
        const years = this.lifespanInput ? parseInt(this.lifespanInput.value, 10) : 3;
        const symbol = this.currency === 'INR' ? '₹' : '$';
        const locale = this.currency === 'INR' ? 'en-IN' : 'en-US';
        const total = (monthly * years * 12).toLocaleString(locale);

        const text = `Hello Bhavyansh & Tushar (PixelToCloud Solutions),\n\nI just reviewed the Subscription Savings Breakdown on your website:\n` +
          `• *Platform Category:* ${this.presets[this.currentPresetKey] ? this.presets[this.currentPresetKey].name : 'Custom Setup'}\n` +
          `• *Current Monthly Rental Outflow:* ${symbol}${monthly.toLocaleString(locale)}/mo\n` +
          `• *Timeframe:* ${years} Years\n` +
          `• *Total Money Saved with PixelToCloud Custom Build:* ${symbol}${total}\n\n` +
          `I would like to discuss replacing recurring monthly subscriptions with your 100% custom, zero-monthly-fee architecture!`;

        window.open(`https://wa.me/918219352124?text=${encodeURIComponent(text)}`, '_blank');
      });
    }

    // PDF Export Action
    if (this.pdfBtn) {
      this.pdfBtn.addEventListener('click', () => this.downloadSavingsPDF());
    }
  }

  calculate() {
    const monthlyCost = parseFloat(this.monthlyPluginInput ? this.monthlyPluginInput.value : (this.currency === 'INR' ? 14500 : 180));
    const years = parseInt(this.lifespanInput ? this.lifespanInput.value : 3, 10);
    const symbol = this.currency === 'INR' ? '₹' : '$';
    const locale = this.currency === 'INR' ? 'en-IN' : 'en-US';

    // Update Slider Labels
    if (this.pluginValDisplay) {
      this.pluginValDisplay.textContent = `${symbol}${monthlyCost.toLocaleString(locale)} / mo`;
    }
    if (this.lifespanValDisplay) {
      this.lifespanValDisplay.textContent = `${years} Year${years > 1 ? 's' : ''}`;
    }

    // Formulas
    const totalSaved = monthlyCost * years * 12;
    const pluginWaste = Math.round(totalSaved * 0.55);
    const hostingWaste = Math.round(totalSaved * 0.25);
    const maintWaste = Math.round(totalSaved * 0.20);

    // Render Metrics
    if (this.savingsTotalEl) {
      this.savingsTotalEl.textContent = `${symbol}${totalSaved.toLocaleString(locale)}`;
    }
    if (this.breakdownPluginsEl) {
      this.breakdownPluginsEl.textContent = `${symbol}${pluginWaste.toLocaleString(locale)}`;
    }
    if (this.breakdownHostingEl) {
      this.breakdownHostingEl.textContent = `${symbol}${hostingWaste.toLocaleString(locale)}`;
    }
    if (this.breakdownMaintEl) {
      this.breakdownMaintEl.textContent = `${symbol}${maintWaste.toLocaleString(locale)}`;
    }

    // Render Itemized Cost Math List
    this.renderPresetItems();

    // Render Real-Time SVG Projection Chart
    this.renderChart(monthlyCost, years, symbol, locale);

    this.lastCalculation = {
      presetName: this.presets[this.currentPresetKey] ? this.presets[this.currentPresetKey].name : 'Custom Configuration',
      monthly: `${symbol}${monthlyCost.toLocaleString(locale)}`,
      years: `${years} Year${years > 1 ? 's' : ''}`,
      total: `${symbol}${totalSaved.toLocaleString(locale)}`,
      plugins: `${symbol}${pluginWaste.toLocaleString(locale)}`,
      hosting: `${symbol}${hostingWaste.toLocaleString(locale)}`,
      maint: `${symbol}${maintWaste.toLocaleString(locale)}`
    };
  }

  renderPresetItems() {
    const preset = this.presets[this.currentPresetKey];
    if (!preset) return;

    if (this.presetItemsListEl) {
      this.presetItemsListEl.innerHTML = preset.items.map(item => `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px dashed rgba(255,255,255,0.08); font-size: 0.78rem; gap: 8px; width: 100%; box-sizing: border-box;">
          <span style="color: #cbd5e1; min-width: 0; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"><i class="fa-solid fa-xmark" style="color: #f43f5e; margin-right: 6px; flex-shrink: 0;"></i>${item.name}</span>
          <span style="font-family: var(--font-mono); color: #f43f5e; font-weight: 700; flex-shrink: 0; white-space: nowrap; text-align: right;">${this.currency === 'INR' ? item.inr : item.usd}</span>
        </div>
      `).join('');
    }

    if (this.presetSolutionEl) {
      this.presetSolutionEl.innerHTML = `
        <div style="display: flex; align-items: flex-start; gap: 8px; font-size: 0.82rem; color: #a7f3d0; background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.25); border-radius: var(--radius-sm); padding: 10px 12px; margin-top: 10px;">
          <i class="fa-solid fa-circle-check" style="color: #10b981; margin-top: 2px; flex-shrink: 0;"></i>
          <span><strong>PixelToCloud Advantage:</strong> ${preset.solution}</span>
        </div>
      `;
    }
  }

  renderChart(monthly, years, symbol, locale) {
    if (!this.chartSvg) return;

    // SVG coordinate space: 300 width x 110 height
    const w = 300;
    const h = 110;
    const padding = 20;

    const pointsSaaS = [];
    const pointsCustom = [];

    // Calculate points for years 0 to years
    for (let y = 0; y <= years; y++) {
      const x = padding + (y / years) * (w - 2 * padding);
      // SaaS cost grows from 0 to max
      const saasCost = monthly * y * 12;
      const maxCost = monthly * years * 12 || 1;
      const ySaas = h - padding - (saasCost / maxCost) * (h - 2 * padding);
      pointsSaaS.push(`${x},${ySaas}`);

      // Custom cost is 1 flat line at the bottom
      const yCustom = h - padding - 6;
      pointsCustom.push(`${x},${yCustom}`);
    }

    const saasPath = `M ${pointsSaaS.join(' L ')}`;
    const customPath = `M ${pointsCustom.join(' L ')}`;

    this.chartSvg.innerHTML = `
      <!-- Grid line -->
      <line x1="${padding}" y1="${h - padding}" x2="${w - padding}" y2="${h - padding}" stroke="rgba(255,255,255,0.1)" stroke-width="1" />
      
      <!-- SaaS Waste Curve (Red/Orange) -->
      <path d="${saasPath}" fill="none" stroke="#f43f5e" stroke-width="2.5" stroke-linecap="round" />
      
      <!-- PixelToCloud Flatline (Emerald/Cyan) -->
      <path d="${customPath}" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" />
      
      <!-- SaaS End Node -->
      <circle cx="${w - padding}" cy="${padding}" r="4" fill="#f43f5e" />
      <text x="${w - padding - 6}" y="${padding - 4}" fill="#f43f5e" font-size="9" font-family="monospace" text-anchor="end" font-weight="bold">SaaS Rent: ${symbol}${(monthly * years * 12).toLocaleString(locale)}</text>
      
      <!-- PixelToCloud End Node -->
      <circle cx="${w - padding}" cy="${h - padding - 6}" r="4" fill="#10b981" />
      <text x="${w - padding - 6}" y="${h - padding - 10}" fill="#10b981" font-size="9" font-family="monospace" text-anchor="end" font-weight="bold">PixelToCloud: ₹0 / $0 Rent</text>
      
      <!-- Axis Labels -->
      <text x="${padding}" y="${h - 4}" fill="#64748b" font-size="8" font-family="monospace">Start</text>
      <text x="${w - padding}" y="${h - 4}" fill="#64748b" font-size="8" font-family="monospace" text-anchor="end">${years} Yrs</text>
    `;
  }

  downloadSavingsPDF() {
    if (!this.lastCalculation) return;

    const calc = this.lastCalculation;
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      if (window.showToast) window.showToast('Please allow popups to export the Savings Audit Report', 'warning');
      return;
    }

    const reportHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>PixelToCloud Solutions - Financial Cost Savings & ROI Audit</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #0f172a; padding: 40px; margin: 0; background: #fff; line-height: 1.6; }
          .header { border-bottom: 2px solid #10b981; padding-bottom: 20px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: flex-start; }
          .brand { font-size: 24px; font-weight: 800; color: #0f172a; }
          .brand span { color: #10b981; }
          .tagline { font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 1px; margin-top: 4px; }
          .highlight-box { background: #f0fdf4; border: 2px solid #10b981; border-radius: 8px; padding: 20px; margin-bottom: 24px; text-align: center; }
          .highlight-num { font-size: 36px; font-weight: 800; color: #10b981; font-family: monospace; }
          .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; }
          .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; }
          .card-title { font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; }
          .card-val { font-size: 18px; font-weight: 700; color: #0f172a; margin-top: 4px; }
          .section-title { font-size: 15px; font-weight: 700; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin: 24px 0 12px 0; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 13px; }
          th, td { padding: 10px; text-align: left; border-bottom: 1px solid #e2e8f0; }
          th { background: #f8fafc; color: #64748b; font-weight: 600; }
          .footer { margin-top: 40px; border-top: 1px solid #e2e8f0; padding-top: 16px; font-size: 12px; color: #64748b; display: flex; justify-content: space-between; }
          .btn-print { background: #10b981; color: #fff; padding: 10px 20px; border: none; border-radius: 6px; font-weight: 700; cursor: pointer; margin-bottom: 20px; }
          @media print { .btn-print { display: none; } }
        </style>
      </head>
      <body>
        <button class="btn-print" onclick="window.print()">🖨️ Print / Save as PDF</button>
        <div class="header">
          <div>
            <div class="brand">PixelTo<span>Cloud</span> Solutions</div>
            <div class="tagline">Financial Cost Savings & Architecture Audit</div>
          </div>
          <div style="text-align: right; font-size: 12px; color: #64748b;">
            <div><strong>Date:</strong> ${new Date().toLocaleDateString()}</div>
            <div><strong>Audit Ref:</strong> #ROI-${Math.floor(100000 + Math.random() * 900000)}</div>
          </div>
        </div>

        <div class="highlight-box">
          <div style="font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase;">Total Capital Kept in Your Business:</div>
          <div class="highlight-num">${calc.total}</div>
          <div style="font-size: 13px; color: #166534; margin-top: 4px;">Zero third-party plugin subscription lock-ins. 100% source code ownership.</div>
        </div>

        <div class="grid-2">
          <div class="card">
            <div class="card-title">Monthly Subscription Overhead</div>
            <div class="card-val">${calc.monthly} / month</div>
          </div>
          <div class="card">
            <div class="card-title">Audit Timeframe</div>
            <div class="card-val">${calc.years}</div>
          </div>
        </div>

        <div class="section-title">Itemized Expense Reduction Breakdown</div>
        <table>
          <thead>
            <tr>
              <th>Cost Category</th>
              <th>Status with SaaS CMS</th>
              <th>Status with PixelToCloud</th>
              <th>Estimated Savings</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>3rd-Party Plugin Subscriptions</strong></td>
              <td>Recurring Monthly Fee</td>
              <td>100% Built-in Custom Code</td>
              <td><strong>${calc.plugins}</strong></td>
            </tr>
            <tr>
              <td><strong>Bloated Hosting & CPU Overhead</strong></td>
              <td>High Server Load</td>
              <td>94% Lower CPU / Edge Cache</td>
              <td><strong>${calc.hosting}</strong></td>
            </tr>
            <tr>
              <td><strong>Maintenance & Security Patching</strong></td>
              <td>Frequent Plugin Breakages</td>
              <td>Rock-Solid Hardened Codebase</td>
              <td><strong>${calc.maint}</strong></td>
            </tr>
          </tbody>
        </table>

        <div class="section-title">Business Advantages of Custom Architecture</div>
        <ul>
          <li><strong>100% Code Ownership:</strong> You own the Git repository, database, and all assets without monthly licensing.</li>
          <li><strong>Sub-Second 60 FPS Speed:</strong> Clean ES6+ code without hundreds of bloated WordPress/Shopify script tags.</li>
          <li><strong>Zero Platform Lock-in:</strong> Host on any Linux VPS, Cloudflare, AWS, or your own private cloud server.</li>
        </ul>

        <div class="footer">
          <div><strong>Founders:</strong> Bhavyansh Agarwal & Tushar Singhal</div>
          <div><strong>Email:</strong> pixeltocloud@gmail.com (Primary) | <strong>Primary Phone / WhatsApp:</strong> +91 82193 52124 | <strong>Secondary Call:</strong> +91 99281 96424</div>
        </div>
      </body>
      </html>
    `;

    printWindow.document.write(reportHTML);
    printWindow.document.close();
    if (window.showToast) window.showToast('📄 Savings Audit Report opened for printing/PDF export!', 'success');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.roiCalculatorInstance = new ROICalculatorEngine();
});
