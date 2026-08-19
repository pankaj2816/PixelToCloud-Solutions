/* ===================================================================
   PIXELTOCLOUD SOLUTIONS - SUBSCRIPTION COST SAVINGS & ROI CALCULATOR
   Custom High-Speed Architecture vs. Bloated SaaS / CMS Plugin Subscriptions
   =================================================================== */

class ROICalculatorEngine {
  constructor() {
    this.monthlyPluginInput = document.getElementById('roi-plugin-cost-slider');
    this.pluginValDisplay = document.getElementById('roi-plugin-cost-val');

    this.lifespanInput = document.getElementById('roi-lifespan-slider');
    this.lifespanValDisplay = document.getElementById('roi-lifespan-val');

    this.trafficInput = document.getElementById('roi-traffic-slider');
    this.trafficValDisplay = document.getElementById('roi-traffic-val');

    this.savingsTotalEl = document.getElementById('roi-total-savings-val');
    this.conversionUpliftEl = document.getElementById('roi-conversion-val');
    this.efficiencyEl = document.getElementById('roi-efficiency-val');
    this.waBtn = document.getElementById('roi-whatsapp-cta');

    if (this.monthlyPluginInput) {
      this.init();
    }
  }

  init() {
    this.bindEvents();
    this.calculate();
  }

  bindEvents() {
    const update = () => this.calculate();

    if (this.monthlyPluginInput) this.monthlyPluginInput.addEventListener('input', update);
    if (this.lifespanInput) this.lifespanInput.addEventListener('input', update);
    if (this.trafficInput) this.trafficInput.addEventListener('input', update);

    if (this.waBtn) {
      this.waBtn.addEventListener('click', () => {
        const monthly = this.monthlyPluginInput ? this.monthlyPluginInput.value : 250;
        const years = this.lifespanInput ? this.lifespanInput.value : 3;
        const total = (monthly * years * 12).toLocaleString();

        const text = `Hello Bhavyansh & Tushar (PixelToCloud Solutions),\n\nI just tested your Subscription Cost Savings & ROI Calculator:\n` +
          `*Current Monthly Plugin/SaaS Overhead:* $${monthly}/mo\n` +
          `*Project Horizon:* ${years} Years\n` +
          `*Calculated Waste Avoided:* $${total}\n\n` +
          `I would like to discuss replacing bloated third-party plugins with your custom, zero-dependency, high-speed architecture.`;

        window.open(`https://wa.me/918219352124?text=${encodeURIComponent(text)}`, '_blank');
      });
    }
  }

  calculate() {
    const monthlyCost = parseFloat(this.monthlyPluginInput ? this.monthlyPluginInput.value : 250);
    const years = parseInt(this.lifespanInput ? this.lifespanInput.value : 3, 10);
    const traffic = parseInt(this.trafficInput ? this.trafficInput.value : 25000, 10);

    // Update Slider Labels
    if (this.pluginValDisplay) this.pluginValDisplay.textContent = `$${monthlyCost} / mo`;
    if (this.lifespanValDisplay) this.lifespanValDisplay.textContent = `${years} Year${years > 1 ? 's' : ''}`;
    if (this.trafficValDisplay) this.trafficValDisplay.textContent = `${traffic.toLocaleString()} visitors / mo`;

    // Formulas
    const totalSaaSSaved = monthlyCost * years * 12;
    const conversionBoost = (24 + (traffic / 25000) * 1.5).toFixed(1);

    // Render Metrics
    if (this.savingsTotalEl) {
      this.savingsTotalEl.textContent = `$${totalSaaSSaved.toLocaleString()}`;
    }
    if (this.conversionUpliftEl) {
      this.conversionUpliftEl.textContent = `+${Math.min(42, Math.max(18, conversionBoost))}%`;
    }
    if (this.efficiencyEl) {
      this.efficiencyEl.textContent = `94.2% Lower CPU`;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.roiCalculatorInstance = new ROICalculatorEngine();
});
