/* ===================================================================
   PIXELTOCLOUD SOLUTIONS - ADVANCED BEFORE/AFTER TRANSFORMATION ENGINE
   Multi-Case Study Switcher, Live Benchmark Dial, Auto-Scan & Drag
   =================================================================== */

class AdvancedBeforeAfterEngine {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.sliderHandle = this.container.querySelector('.ba-handle');
    this.afterImage = this.container.querySelector('.ba-after-layer');
    this.afterInner = this.container.querySelector('.ba-after-inner');
    this.isDragging = false;
    this.splitPercent = 50;
    this.autoScanId = null;
    this.autoScanDirection = 1;
    this.isAutoScanning = false;

    // Case Studies Data
    this.caseStudies = {
      doctor: {
        tagBefore: 'Outdated Doctor Site (2016)',
        titleBefore: 'Clunky, Non-HIPAA & High Patient Drop-Off',
        descBefore: 'Manual phone-only appointments, insecure HTTP patient file uploads, 5.4s slow loading, and 78% mobile bounce rate.',
        metricsBefore: { speed: '32/100', loadTime: '5.4s', weight: '7.8 MB', conversion: 'Failing Core Web Vitals' },
        urlBefore: 'http://legacy-clinic-site.net',

        tagAfter: 'PixelToCloud Healthcare Suite',
        titleAfter: 'Sub-Second EHR, WebRTC & Instant Slots',
        descAfter: 'HIPAA-grade encrypted database, 60 FPS WebRTC telehealth video, automated WhatsApp SMS slot confirmations, and 3.8x patient booking growth.',
        metricsAfter: { speed: '99/100', loadTime: '0.38s', weight: '96 kB Gzip', conversion: '3.8x Booking Growth' },
        urlAfter: 'https://medpulse-telehealth.io (TLS 1.3 Strict)'
      },
      fintech: {
        tagBefore: 'Legacy CA Website (2014)',
        titleBefore: 'Vulnerable Static Portal with No Automation',
        descBefore: 'Non-responsive tables, unencrypted email tax submissions, failing Google mobile guidelines, and 4.9s load latency.',
        metricsBefore: { speed: '38/100', loadTime: '4.9s', weight: '5.4 MB', conversion: 'Zero Client Self-Service' },
        urlBefore: 'http://old-tax-consultancy.in',

        tagAfter: 'PixelToCloud FinTech Portal',
        titleAfter: 'Live GST/ITR Calculator & Encrypted Vault',
        descAfter: 'Real-time automated tax calculation, AES-256 client document locker, instant billing generation, and 100/100 SEO health.',
        metricsAfter: { speed: '100/100', loadTime: '0.32s', weight: '88 kB Gzip', conversion: '100% Automated Compliance' },
        urlAfter: 'https://client-portal.ca-firm.com'
      },
      ecommerce: {
        tagBefore: 'Old E-Commerce Store',
        titleBefore: 'Slow Cart Abandonment & Blurry Images',
        descBefore: 'Bloated third-party plugins, 6.2s checkout loading, broken mobile layout, and 71% cart abandonment rate.',
        metricsBefore: { speed: '28/100', loadTime: '6.2s', weight: '9.2 MB', conversion: '71% Cart Abandonment' },
        urlBefore: 'http://legacy-art-shop.com',

        tagAfter: 'PixelToCloud Boutique Engine',
        titleAfter: '3D WebGL Gallery & 1-Click Apple Pay',
        descAfter: 'Hardware-accelerated 360° product visualizer, multi-currency Stripe/UPI checkout, Brotli compression, and 4.1x conversion rate.',
        metricsAfter: { speed: '99/100', loadTime: '0.29s', weight: '110 kB Gzip', conversion: '4.1x Checkout Conversion' },
        urlAfter: 'https://artisan-boutique.com (HTTP/3)'
      }
    };
    this.currentCase = 'doctor';

    this.init();
  }

  init() {
    this.bindEvents();
    this.bindCaseStudyTabs();
    this.bindPresetButtons();
    this.updateInnerWidth();
    this.setSplit(50);

    window.addEventListener('resize', () => this.updateInnerWidth(), { passive: true });
  }

  updateInnerWidth() {
    if (this.afterInner && this.container) {
      this.afterInner.style.width = `${this.container.offsetWidth}px`;
    }
  }

  bindEvents() {
    const onStart = (e) => {
      this.stopAutoScan();
      this.isDragging = true;
      this.container.classList.add('dragging');
    };

    const onEnd = () => {
      this.isDragging = false;
      this.container.classList.remove('dragging');
    };

    const onMove = (e) => {
      if (!this.isDragging) return;
      const rect = this.container.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      let pos = ((clientX - rect.left) / rect.width) * 100;
      pos = Math.max(0, Math.min(100, pos));
      this.setSplit(pos);
    };

    this.container.addEventListener('mousedown', onStart);
    window.addEventListener('mouseup', onEnd);
    window.addEventListener('mousemove', onMove);

    this.container.addEventListener('touchstart', onStart, { passive: true });
    window.addEventListener('touchend', onEnd);
    window.addEventListener('touchmove', onMove, { passive: true });

    // Auto-Scan Sweep Button
    const autoScanBtn = document.getElementById('ba-autoscan-btn');
    if (autoScanBtn) {
      autoScanBtn.addEventListener('click', () => this.toggleAutoScan());
    }
  }

  bindCaseStudyTabs() {
    const tabs = document.querySelectorAll('.ba-case-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const caseKey = tab.getAttribute('data-case');
        if (caseKey && this.caseStudies[caseKey]) {
          this.currentCase = caseKey;
          this.renderCaseStudy();
        }
      });
    });
  }

  bindPresetButtons() {
    const presets = document.querySelectorAll('.ba-preset-btn');
    presets.forEach(btn => {
      btn.addEventListener('click', () => {
        this.stopAutoScan();
        presets.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const splitVal = parseInt(btn.getAttribute('data-split'), 10);
        this.animateSplitTo(splitVal);
      });
    });
  }

  renderCaseStudy() {
    const data = this.caseStudies[this.currentCase];
    if (!data) return;

    // Before Elements
    const tagBefore = document.getElementById('ba-tag-before');
    const titleBefore = document.getElementById('ba-title-before');
    const descBefore = document.getElementById('ba-desc-before');
    const speedBefore = document.getElementById('ba-metric-speed-before');
    const loadBefore = document.getElementById('ba-metric-load-before');
    const convBefore = document.getElementById('ba-metric-conv-before');
    const urlBefore = document.getElementById('ba-url-before');

    if (tagBefore) tagBefore.innerHTML = `<i class="fa-solid fa-triangle-exclamation" style="margin-right: 6px;"></i>${data.tagBefore}`;
    if (titleBefore) titleBefore.textContent = data.titleBefore;
    if (descBefore) descBefore.textContent = data.descBefore;
    if (speedBefore) speedBefore.textContent = data.metricsBefore.speed;
    if (loadBefore) loadBefore.textContent = data.metricsBefore.loadTime;
    if (convBefore) convBefore.textContent = data.metricsBefore.conversion;
    if (urlBefore) urlBefore.textContent = data.urlBefore;

    // After Elements
    const tagAfter = document.getElementById('ba-tag-after');
    const titleAfter = document.getElementById('ba-title-after');
    const descAfter = document.getElementById('ba-desc-after');
    const speedAfter = document.getElementById('ba-metric-speed-after');
    const loadAfter = document.getElementById('ba-metric-load-after');
    const convAfter = document.getElementById('ba-metric-conv-after');
    const urlAfter = document.getElementById('ba-url-after');

    if (tagAfter) tagAfter.innerHTML = `<i class="fa-solid fa-bolt" style="margin-right: 6px;"></i>${data.tagAfter}`;
    if (titleAfter) titleAfter.textContent = data.titleAfter;
    if (descAfter) descAfter.textContent = data.descAfter;
    if (speedAfter) speedAfter.textContent = data.metricsAfter.speed;
    if (loadAfter) loadAfter.textContent = data.metricsAfter.loadTime;
    if (convAfter) convAfter.textContent = data.metricsAfter.conversion;
    if (urlAfter) urlAfter.textContent = data.urlAfter;
  }

  animateSplitTo(targetPercent) {
    let current = this.splitPercent;
    const step = () => {
      const diff = targetPercent - current;
      if (Math.abs(diff) < 0.5) {
        this.setSplit(targetPercent);
      } else {
        current += diff * 0.15;
        this.setSplit(current);
        requestAnimationFrame(step);
      }
    };
    step();
  }

  toggleAutoScan() {
    if (this.isAutoScanning) {
      this.stopAutoScan();
    } else {
      this.startAutoScan();
    }
  }

  startAutoScan() {
    this.isAutoScanning = true;
    const btn = document.getElementById('ba-autoscan-btn');
    if (btn) {
      btn.innerHTML = `<span><i class="fa-solid fa-pause" style="margin-right: 6px;"></i>Pause Auto-Sweep</span>`;
      btn.classList.add('active');
    }

    const scan = () => {
      if (!this.isAutoScanning) return;

      this.splitPercent += this.autoScanDirection * 0.35;
      if (this.splitPercent >= 90) {
        this.autoScanDirection = -1;
      } else if (this.splitPercent <= 10) {
        this.autoScanDirection = 1;
      }

      this.setSplit(this.splitPercent);
      this.autoScanId = requestAnimationFrame(scan);
    };

    this.autoScanId = requestAnimationFrame(scan);
  }

  stopAutoScan() {
    this.isAutoScanning = false;
    if (this.autoScanId) cancelAnimationFrame(this.autoScanId);
    const btn = document.getElementById('ba-autoscan-btn');
    if (btn) {
      btn.innerHTML = `<span><i class="fa-solid fa-play" style="margin-right: 6px;"></i>Auto-Sweep Scan</span>`;
      btn.classList.remove('active');
    }
  }

  setSplit(percentage) {
    this.splitPercent = percentage;
    if (this.afterImage) {
      this.afterImage.style.width = `${percentage}%`;
    }
    if (this.sliderHandle) {
      this.sliderHandle.style.left = `${percentage}%`;
    }
    this.updateInnerWidth();

    // Update Split Percentage Badge
    const badge = document.getElementById('ba-split-val-badge');
    if (badge) {
      badge.textContent = `${Math.round(percentage)}% PixelToCloud`;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.baSliderInstance = new AdvancedBeforeAfterEngine('before-after-container');
});
