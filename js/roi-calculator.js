/* ===================================================================
   PIXELTOCLOUD SOLUTIONS - SMART COST SAVINGS CALCULATOR
   Build Once, Own Forever: See Your Cost Savings vs. Monthly Subscriptions
   =================================================================== */

class ROICalculatorEngine {
  constructor() {
    this.currency = 'INR'; // 'INR' or 'USD'
    this.monthlyPluginInput = document.getElementById('roi-plugin-cost-slider');
    this.pluginValDisplay = document.getElementById('roi-plugin-cost-val');
    this.lifespanInput = document.getElementById('roi-lifespan-slider');
    this.lifespanValDisplay = document.getElementById('roi-lifespan-val');
    this.savingsTotalEl = document.getElementById('roi-total-savings-val');
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

    // Currency Switcher Buttons
    document.querySelectorAll('.roi-currency-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.roi-currency-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currency = btn.getAttribute('data-currency') || 'INR';

        // Adjust slider ranges based on currency
        if (this.currency === 'INR') {
          this.monthlyPluginInput.min = 1000;
          this.monthlyPluginInput.max = 30000;
          this.monthlyPluginInput.step = 500;
          this.monthlyPluginInput.value = 5000;
        } else {
          this.monthlyPluginInput.min = 30;
          this.monthlyPluginInput.max = 800;
          this.monthlyPluginInput.step = 10;
          this.monthlyPluginInput.value = 150;
        }
        this.calculate();
      });
    });

    if (this.waBtn) {
      this.waBtn.addEventListener('click', () => {
        const monthly = this.monthlyPluginInput ? parseFloat(this.monthlyPluginInput.value) : 5000;
        const years = this.lifespanInput ? parseInt(this.lifespanInput.value, 10) : 3;
        const symbol = this.currency === 'INR' ? '₹' : '$';
        const total = (monthly * years * 12).toLocaleString(this.currency === 'INR' ? 'en-IN' : 'en-US');

        const text = `Hello Bhavyansh & Tushar (PixelToCloud Solutions),\n\nI just used your Savings Calculator on your website:\n` +
          `• *Monthly Plugin/App Fees:* ${symbol}${monthly.toLocaleString(this.currency === 'INR' ? 'en-IN' : 'en-US')}/mo\n` +
          `• *Timeframe:* ${years} Years\n` +
          `• *Total Money Saved with Custom Build:* ${symbol}${total}\n\n` +
          `I would like to discuss building a custom, zero-monthly-fee website/app for my business!`;

        window.open(`https://wa.me/918219352124?text=${encodeURIComponent(text)}`, '_blank');
      });
    }
  }

  calculate() {
    const monthlyCost = parseFloat(this.monthlyPluginInput ? this.monthlyPluginInput.value : (this.currency === 'INR' ? 5000 : 150));
    const years = parseInt(this.lifespanInput ? this.lifespanInput.value : 3, 10);
    const symbol = this.currency === 'INR' ? '₹' : '$';
    const locale = this.currency === 'INR' ? 'en-IN' : 'en-US';

    // Update Slider Labels
    if (this.pluginValDisplay) {
      this.pluginValDisplay.textContent = `${symbol}${monthlyCost.toLocaleString(locale)} / month`;
    }
    if (this.lifespanValDisplay) {
      this.lifespanValDisplay.textContent = `${years} Year${years > 1 ? 's' : ''}`;
    }

    // Formulas
    const totalSaved = monthlyCost * years * 12;

    // Render Metrics
    if (this.savingsTotalEl) {
      this.savingsTotalEl.textContent = `${symbol}${totalSaved.toLocaleString(locale)}`;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.roiCalculatorInstance = new ROICalculatorEngine();
});
