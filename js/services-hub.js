/* ===================================================================
   PIXELTOCLOUD SOLUTIONS - ADVANCED REAL-TIME SERVICES INTERACTIVE LAB
   7 High-Tech Micro-Applications for Web, 3D, Doctor, CA, DevOps, E-Com, Security
   =================================================================== */

class AdvancedServicesHub {
  constructor() {
    this.tabs = document.querySelectorAll('.service-nav-tab');
    this.panes = document.querySelectorAll('.service-tab-pane');
    this.currentTab = 'web';

    // 3D Canvas State
    this.canvas3D = document.getElementById('service-3d-canvas');
    this.ctx3D = this.canvas3D ? this.canvas3D.getContext('2d') : null;
    this.geomType = 'torus';
    this.wireframeDensity = 14;
    this.isDragging3D = false;
    this.rot3DX = 0.5;
    this.rot3DY = 0;
    this.lastMouseX = 0;
    this.lastMouseY = 0;

    // Doctor ECG State
    this.ecgCanvas = document.getElementById('sandbox-ecg-canvas');
    this.ecgCtx = this.ecgCanvas ? this.ecgCanvas.getContext('2d') : null;
    this.heartRate = 72;
    this.ecgOffset = 0;
    this.isWebRTCActive = false;

    // DevOps State
    this.activeCluster = 'blue';

    // E-Commerce Currency Rates (Base: USD)
    this.currencyRates = {
      USD: { symbol: '$', rate: 1.0, basePrice: 450 },
      INR: { symbol: '₹', rate: 83.5, basePrice: 37500 },
      EUR: { symbol: '€', rate: 0.92, basePrice: 415 },
      GBP: { symbol: '£', rate: 0.79, basePrice: 355 },
      AED: { symbol: 'د.إ', rate: 3.67, basePrice: 1650 }
    };
    this.currentCurrency = 'USD';

    // Neural Network Canvas State (AI Lab)
    this.neuralCanvas = document.getElementById('service-neural-canvas');
    this.neuralCtx = this.neuralCanvas ? this.neuralCanvas.getContext('2d') : null;
    this.neuralTick = 0;

    this.init();
  }

  init() {
    this.bindNavigationTabs();
    this.initServiceNavEnhancements();
    this.initWebLab();
    this.init3DLab();
    this.initDoctorLab();
    this.initFintechLab();
    this.initDevOpsLab();
    this.initEcomLab();
    this.initSecurityLab();
    this.initMobileLab();
    this.initAILab();
    this.initDesktopLab();
    this.startGlobalRenderLoops();
  }

  // =================================================================
  // TAB NAVIGATION & SMART SERVICE CAROUSEL / BOTTOM NAV
  // =================================================================
  bindNavigationTabs() {
    this.tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-service-tab');
        if (target && target !== this.currentTab) {
          this.switchTab(target, false);
        }
      });
    });
  }

  initServiceNavEnhancements() {
    this.serviceList = [
      { id: 'web', name: 'Full-Stack Web' },
      { id: '3d', name: '2D/3D WebGL' },
      { id: 'doctor', name: 'Doctor & Telehealth' },
      { id: 'fintech', name: 'CA & FinTech' },
      { id: 'devops', name: 'Linux VPS & DevOps' },
      { id: 'ecommerce', name: 'Art & E-Commerce' },
      { id: 'security', name: 'Security & SLA' },
      { id: 'mobile', name: 'Mobile Apps' },
      { id: 'ai', name: 'AI & Machine Learning' },
      { id: 'desktop', name: 'Desktop Software' }
    ];

    // Dynamically inject smart previous / next navigation at the bottom of each service pane
    this.panes.forEach(pane => {
      if (pane.querySelector('.service-pane-footer-nav')) return;

      const paneId = pane.getAttribute('data-pane-id');
      const idx = this.serviceList.findIndex(s => s.id === paneId);
      if (idx === -1) return;

      const prevIdx = (idx - 1 + this.serviceList.length) % this.serviceList.length;
      const nextIdx = (idx + 1) % this.serviceList.length;
      const prevService = this.serviceList[prevIdx];
      const nextService = this.serviceList[nextIdx];

      const navEl = document.createElement('div');
      navEl.className = 'service-pane-footer-nav';
      navEl.innerHTML = `
        <button class="service-footer-nav-btn btn-prev" data-target="${prevService.id}" aria-label="Previous service: ${prevService.name}">
          <i class="fa-solid fa-arrow-left"></i>
          <div class="footer-nav-label-box">
            <span class="footer-nav-hint">PREV SERVICE</span>
            <span class="footer-nav-title">${prevService.name}</span>
          </div>
        </button>

        <div class="service-footer-counter-pill">
          <span class="service-footer-counter-active">${String(idx + 1).padStart(2, '0')}</span>
          <span style="opacity: 0.35;">/</span>
          <span style="opacity: 0.65;">10</span>
        </div>

        <button class="service-footer-nav-btn btn-next" data-target="${nextService.id}" aria-label="Next service: ${nextService.name}">
          <div class="footer-nav-label-box" style="text-align: right;">
            <span class="footer-nav-hint">NEXT SERVICE</span>
            <span class="footer-nav-title">${nextService.name}</span>
          </div>
          <i class="fa-solid fa-arrow-right"></i>
        </button>
      `;

      pane.appendChild(navEl);
    });

    // Delegate click events on footer navigation buttons
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.service-footer-nav-btn');
      if (btn) {
        const target = btn.getAttribute('data-target');
        if (target) {
          this.switchTab(target, true);
        }
      }
    });

    // Smart Touch Swipe Gestures for Mobile (Swipe Left -> Next, Swipe Right -> Prev)
    const hubWrapper = document.querySelector('.services-hub-wrapper');
    if (hubWrapper) {
      let touchStartX = 0;
      let touchStartY = 0;
      let touchEndX = 0;
      let touchEndY = 0;

      hubWrapper.addEventListener('touchstart', (e) => {
        if (e.touches && e.touches.length > 0) {
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
        }
      }, { passive: true });

      hubWrapper.addEventListener('touchend', (e) => {
        if (e.changedTouches && e.changedTouches.length > 0) {
          touchEndX = e.changedTouches[0].clientX;
          touchEndY = e.changedTouches[0].clientY;

          const diffX = touchEndX - touchStartX;
          const diffY = touchEndY - touchStartY;

          // Check if horizontal swipe was intentional (> 50px) and greater than vertical scroll
          if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY) * 1.3) {
            const currentIdx = this.serviceList.findIndex(s => s.id === this.currentTab);
            if (currentIdx !== -1) {
              if (diffX < 0) {
                // Swipe Left -> Next Service
                const nextIdx = (currentIdx + 1) % this.serviceList.length;
                this.switchTab(this.serviceList[nextIdx].id, true);
              } else {
                // Swipe Right -> Prev Service
                const prevIdx = (currentIdx - 1 + this.serviceList.length) % this.serviceList.length;
                this.switchTab(this.serviceList[prevIdx].id, true);
              }
            }
          }
        }
      }, { passive: true });
    }
  }

  switchTab(tabId, shouldAutoScroll = false) {
    this.currentTab = tabId;

    this.tabs.forEach(tab => {
      if (tab.getAttribute('data-service-tab') === tabId) {
        tab.classList.add('active');
        if (tab.scrollIntoView) {
          tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      } else {
        tab.classList.remove('active');
      }
    });

    this.panes.forEach(pane => {
      if (pane.getAttribute('data-pane-id') === tabId) {
        pane.classList.add('active');
      } else {
        pane.classList.remove('active');
      }
    });

    // Auto-scroll on next/prev click or mobile navigation so the user lands cleanly on the demo
    if (shouldAutoScroll || (window.innerWidth <= 768 && window.scrollY > 400)) {
      const servicesSection = document.getElementById('services');
      if (servicesSection) {
        const topOffset = servicesSection.getBoundingClientRect().top + window.scrollY - 65;
        window.scrollTo({ top: topOffset, behavior: 'smooth' });
      }
    }
  }

  // =================================================================
  // 1. FULL-STACK WEB LAB (Live Viewport & CSS/Theme Token Engine)
  // =================================================================
  initWebLab() {
    const frame = document.getElementById('web-preview-frame');
    const deviceBtns = document.querySelectorAll('.web-device-btn');
    const colorSlider = document.getElementById('web-token-color');
    const blurSlider = document.getElementById('web-token-blur');
    const liveTarget = document.getElementById('web-live-target');

    deviceBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        deviceBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const mode = btn.getAttribute('data-device');
        if (!frame) return;

        if (mode === 'desktop') {
          frame.style.maxWidth = '100%';
          frame.style.height = '210px';
        } else if (mode === 'tablet') {
          frame.style.maxWidth = '280px';
          frame.style.height = '230px';
        } else if (mode === 'mobile') {
          frame.style.maxWidth = '190px';
          frame.style.height = '240px';
        }
      });
    });

    if (colorSlider && liveTarget) {
      colorSlider.addEventListener('input', (e) => {
        const hue = e.target.value;
        liveTarget.style.borderColor = `hsl(${hue}, 100%, 50%)`;
        liveTarget.style.boxShadow = `0 0 20px hsla(${hue}, 100%, 50%, 0.35)`;
        const badge = document.getElementById('web-token-color-val');
        if (badge) badge.textContent = `Hue: ${hue}°`;
      });
    }

    if (blurSlider && liveTarget) {
      blurSlider.addEventListener('input', (e) => {
        const blur = e.target.value;
        liveTarget.style.backdropFilter = `blur(${blur}px)`;
        const valBadge = document.getElementById('web-token-blur-val');
        if (valBadge) valBadge.textContent = `${blur}px`;
      });
    }
  }

  // =================================================================
  // 2. 2D/3D WEBGL SPATIAL LAB (Interactive Orbit & Geometry Shaders)
  // =================================================================
  init3DLab() {
    if (!this.canvas3D) return;

    // Mouse drag orbital control
    this.canvas3D.addEventListener('mousedown', (e) => {
      this.isDragging3D = true;
      this.lastMouseX = e.clientX;
      this.lastMouseY = e.clientY;
    });

    window.addEventListener('mouseup', () => {
      this.isDragging3D = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.isDragging3D) return;
      const dx = e.clientX - this.lastMouseX;
      const dy = e.clientY - this.lastMouseY;
      this.rot3DY += dx * 0.01;
      this.rot3DX += dy * 0.01;
      this.lastMouseX = e.clientX;
      this.lastMouseY = e.clientY;
    });

    // Geometry Switcher Buttons
    const geomBtns = document.querySelectorAll('.lab-3d-geom-btn');
    geomBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        geomBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.geomType = btn.getAttribute('data-geom');
      });
    });

    // Density Slider
    const densitySlider = document.getElementById('lab-3d-density');
    if (densitySlider) {
      densitySlider.addEventListener('input', (e) => {
        this.wireframeDensity = parseInt(e.target.value, 10);
        const badge = document.getElementById('lab-3d-density-val');
        if (badge) badge.textContent = `${this.wireframeDensity * 16} Vertices`;
      });
    }
  }

  // =================================================================
  // 3. DOCTOR & CLINIC TELEMETRY (Dual-Lead ECG & WebRTC Diagnostic)
  // =================================================================
  initDoctorLab() {
    const hrSlider = document.getElementById('doctor-hr-slider');
    const hrBadge = document.getElementById('doctor-hr-val');
    const videoToggleBtn = document.getElementById('sandbox-video-toggle-btn');
    const rxDownloadBtn = document.getElementById('sandbox-rx-download-btn');
    const videoBox = document.getElementById('sandbox-video-preview');

    if (hrSlider) {
      hrSlider.addEventListener('input', (e) => {
        this.heartRate = parseInt(e.target.value, 10);
        if (hrBadge) hrBadge.textContent = `${this.heartRate} BPM`;
      });
    }

    if (videoToggleBtn && videoBox) {
      videoToggleBtn.addEventListener('click', () => {
        this.isWebRTCActive = !this.isWebRTCActive;
        if (this.isWebRTCActive) {
          videoBox.classList.add('active-stream');
          videoToggleBtn.innerHTML = '<span><i class="fa-solid fa-video-slash" style="margin-right: 6px;"></i>Disconnect WebRTC Stream</span>';
          if (window.showToast) window.showToast('✔ HIPAA Encrypted 60 FPS WebRTC Telehealth Session Active', 'success');
        } else {
          videoBox.classList.remove('active-stream');
          videoToggleBtn.innerHTML = '<span><i class="fa-solid fa-video" style="margin-right: 6px;"></i>Connect WebRTC Encrypted Room</span>';
        }
      });
    }

    if (rxDownloadBtn) {
      rxDownloadBtn.addEventListener('click', () => {
        this.generateSampleRxPDF();
      });
    }
  }

  generateSampleRxPDF() {
    const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    const rxContent = `
======================================================================
           PIXELTOCLOUD TELEHEALTH EHR - CLINICAL PRESCRIPTION
======================================================================
Date: ${date}             Rx ID: #EHR-${Math.floor(100000 + Math.random() * 900000)}
Patient Name: Jane Doe                 Age/Gender: 34 / F
Diagnosing Physician: Dr. Sarah Mitchell, MD (Lead Consultant Surgeon)
Security Verification: SHA-256 RSA-2048 Digital Signature Encrypted

----------------------------------------------------------------------
MEDICATION & CLINICAL INSTRUCTIONS:
1. Amoxicillin 500mg
   Dosage: 1 Tablet orally every 8 hours after meals for 5 days.
2. Paracetamol 650mg
   Dosage: 1 Tablet orally SOS (as needed for pain/fever).
3. Chlorhexidine 0.2% Oral Rinse
   Usage: 10ml swish and spit twice daily for 7 days.

----------------------------------------------------------------------
VITAL TELEMETRY SNAPSHOT:
• Resting Heart Rate: ${this.heartRate} BPM (Normal Sinus Rhythm)
• SpO2: 99% Room Air
• Blood Pressure: 120/80 mmHg

Doctor Digital Signature: [SIGNED_ELECTRONICALLY_VIA_PIXELTOCLOUD_ENGINE]
======================================================================
`;

    const blob = new Blob([rxContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `EHR_Clinical_Prescription_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    if (window.showToast) {
      window.showToast('✔ RSA-Signed Clinical EHR Prescription Generated & Downloaded', 'success');
    }
  }

  // =================================================================
  // 4. CA & FINTECH PORTALS LAB (Multi-Year Turnover & Entity Logic)
  // =================================================================
  initFintechLab() {
    const slider = document.getElementById('ca-sandbox-slider');
    const entityBtns = document.querySelectorAll('.ca-entity-btn');
    const downloadBtn = document.getElementById('ca-sandbox-download-btn');

    const updateCalculations = () => {
      const turnover = slider ? parseInt(slider.value, 10) : 2500000;
      const activeEntity = document.querySelector('.ca-entity-btn.active')?.getAttribute('data-entity') || 'pvt';

      const incomeVal = document.getElementById('ca-sandbox-income-val');
      const gstVal = document.getElementById('ca-sandbox-gst-val');
      const taxVal = document.getElementById('ca-sandbox-tax-val');
      const savingsVal = document.getElementById('ca-sandbox-savings-val');

      if (incomeVal) incomeVal.textContent = `₹ ${turnover.toLocaleString('en-IN')}`;

      const gst = Math.round(turnover * 0.18);
      if (gstVal) gstVal.textContent = `₹ ${gst.toLocaleString('en-IN')}`;

      let corporateTaxRate = 0.22;
      if (activeEntity === 'proprietor') corporateTaxRate = 0.20;
      if (activeEntity === 'llp') corporateTaxRate = 0.30;

      const taxableProfit = turnover * 0.35;
      const tax = Math.round(taxableProfit * corporateTaxRate);
      if (taxVal) taxVal.textContent = `₹ ${tax.toLocaleString('en-IN')}`;

      const savings = Math.round(turnover * 0.085);
      if (savingsVal) savingsVal.textContent = `₹ ${savings.toLocaleString('en-IN')}`;
    };

    if (slider) {
      slider.addEventListener('input', updateCalculations);
    }

    entityBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        entityBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        updateCalculations();
      });
    });

    if (downloadBtn) {
      downloadBtn.addEventListener('click', () => {
        this.generateCALedgerFile();
      });
    }

    updateCalculations();
  }

  generateCALedgerFile() {
    const turnover = document.getElementById('ca-sandbox-income-val')?.textContent || '₹ 25,00,000';
    const gst = document.getElementById('ca-sandbox-gst-val')?.textContent || '₹ 4,50,000';
    const savings = document.getElementById('ca-sandbox-savings-val')?.textContent || '₹ 2,12,500';

    const content = `
======================================================================
     PIXELTOCLOUD FINTECH SUITE - ENCRYPTED CA AUDIT LEDGER
======================================================================
Generated: ${new Date().toISOString()}
Voucher Hash: #GST-AUDIT-${Math.floor(100000 + Math.random() * 900000)}

TURNOVER & TAX SUMMARY:
• Declared Annual Turnover : ${turnover}
• Computed GST Output (18%): ${gst}
• Estimated Compliance Savings: ${savings}

COMPLIANCE VERIFICATION:
✔ Form GSTR-1 & GSTR-3B Reconciliation: MATCHED
✔ TDS Section 194C / 194J Deductions: 100% BALANCED
✔ Offsite Encrypted Document Vault Integrity: VERIFIED

Digital Signer: PixelToCloud Automated Compliance Engine
======================================================================
`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CA_Audit_Ledger_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    if (window.showToast) {
      window.showToast('✔ Encrypted CA Audit Ledger Downloaded', 'success');
    }
  }

  // =================================================================
  // 5. LINUX VPS & DEVOPS LAB (Live Blue/Green Docker Switcher)
  // =================================================================
  initDevOpsLab() {
    const switchClusterBtn = document.getElementById('devops-switch-cluster-btn');
    const spikeTrafficBtn = document.getElementById('devops-spike-btn');
    const consoleBox = document.getElementById('devops-live-console');

    const appendConsole = (msg, color = '#10b981') => {
      if (!consoleBox) return;
      const line = document.createElement('div');
      line.style.color = color;
      line.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
      consoleBox.appendChild(line);
      consoleBox.scrollTop = consoleBox.scrollHeight;
    };

    if (switchClusterBtn) {
      switchClusterBtn.addEventListener('click', () => {
        this.activeCluster = this.activeCluster === 'blue' ? 'green' : 'blue';
        const blueBadge = document.getElementById('devops-cluster-blue');
        const greenBadge = document.getElementById('devops-cluster-green');

        if (this.activeCluster === 'green') {
          if (blueBadge) blueBadge.style.opacity = '0.35';
          if (greenBadge) greenBadge.style.opacity = '1.0';
          appendConsole('🔄 Zero-Downtime Traffic Switch: 100% Routed to Cluster-Green (v3.2.1)', '#00f0ff');
        } else {
          if (blueBadge) blueBadge.style.opacity = '1.0';
          if (greenBadge) greenBadge.style.opacity = '0.35';
          appendConsole('🔄 Zero-Downtime Traffic Switch: 100% Routed to Cluster-Blue (v3.2.0)', '#00f0ff');
        }
      });
    }

    if (spikeTrafficBtn) {
      spikeTrafficBtn.addEventListener('click', () => {
        appendConsole('⚡ INJECTING 5,000 CONCURRENT HTTP/2 PACKETS...', '#f59e0b');
        setTimeout(() => {
          appendConsole('✔ Nginx Worker Threads Auto-Scaled (4 Cores -> 8 Cores)', '#10b981');
          appendConsole('✔ 5,000 Requests Handled | HTTP 200 OK | Avg Latency: 28ms', '#10b981');
        }, 600);
      });
    }
  }

  // =================================================================
  // 6. ART & E-COMMERCE LAB (Multi-Currency & 360° Lighting Studio)
  // =================================================================
  initEcomLab() {
    const currencyBtns = document.querySelectorAll('.ecom-curr-btn');
    const priceDisplay = document.getElementById('ecom-item-price');
    const checkoutBtn = document.getElementById('ecom-mock-checkout-btn');
    const lightingBtns = document.querySelectorAll('.ecom-light-btn');
    const artBox = document.getElementById('ecom-art-preview-box');

    currencyBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        currencyBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentCurrency = btn.getAttribute('data-curr') || 'USD';
        const currData = this.currencyRates[this.currentCurrency];
        if (priceDisplay && currData) {
          priceDisplay.textContent = `${currData.symbol} ${currData.basePrice.toLocaleString()}`;
        }
      });
    });

    lightingBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        lightingBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const mode = btn.getAttribute('data-light');
        if (!artBox) return;

        if (mode === 'studio') {
          artBox.style.background = 'radial-gradient(circle at center, #334155 0%, #090e1a 100%)';
          artBox.style.boxShadow = '0 0 30px rgba(56, 189, 248, 0.2)';
        } else if (mode === 'warm') {
          artBox.style.background = 'radial-gradient(circle at center, #78350f 0%, #090e1a 100%)';
          artBox.style.boxShadow = '0 0 30px rgba(245, 158, 11, 0.25)';
        } else if (mode === 'cyber') {
          artBox.style.background = 'radial-gradient(circle at center, #581c87 0%, #090e1a 100%)';
          artBox.style.boxShadow = '0 0 30px rgba(168, 85, 247, 0.35)';
        }
      });
    });

    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        const currData = this.currencyRates[this.currentCurrency];
        if (window.showToast) {
          window.showToast(`✔ Simulated 1-Click Apple Pay / Stripe Order Placed (${currData.symbol} ${currData.basePrice})`, 'success');
        }
      });
    }
  }

  // =================================================================
  // 7. SECURITY & SLA LAB (DDoS Threat Shield & AWS S3 Snapshot)
  // =================================================================
  initSecurityLab() {
    const attackBtn = document.getElementById('sec-simulate-attack-btn');
    const snapshotBtn = document.getElementById('sec-snapshot-btn');
    const shieldStatus = document.getElementById('sec-shield-status');
    const logBox = document.getElementById('sec-live-threat-log');

    const appendSecLog = (msg, color = '#10b981') => {
      if (!logBox) return;
      const line = document.createElement('div');
      line.style.color = color;
      line.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
      logBox.appendChild(line);
      logBox.scrollTop = logBox.scrollHeight;
    };

    if (attackBtn) {
      attackBtn.addEventListener('click', () => {
        appendSecLog('🚨 INCOMING MALICIOUS SQL INJECTION & SYN FLOOD DETECTED...', '#ef4444');
        if (shieldStatus) shieldStatus.textContent = 'DEFLECTING THREAT';
        if (shieldStatus) shieldStatus.style.color = '#f59e0b';

        setTimeout(() => {
          appendSecLog('🛡️ Cloudflare WAF + UFW Firewall: 184 IPs Automatically Banned', '#10b981');
          appendSecLog('✔ Zero Packet Drop | System Integrity 100% Uncompromised', '#10b981');
          if (shieldStatus) shieldStatus.textContent = 'ZERO-TRUST SHIELD ACTIVE';
          if (shieldStatus) shieldStatus.style.color = '#10b981';
        }, 700);
      });
    }

    if (snapshotBtn) {
      snapshotBtn.addEventListener('click', () => {
        appendSecLog('📦 Generating SHA-256 Database Snapshot Archive...', '#38bdf8');
        setTimeout(() => {
          appendSecLog('☁️ Uploaded to AWS S3 Offsite Bucket (us-east-1) [Size: 84.2 MB]', '#10b981');
          if (window.showToast) {
            window.showToast('✔ Automated Offsite AWS S3 Backup Snapshot Created', 'success');
          }
        }, 800);
      });
    }
  }

  // =================================================================
  // GLOBAL 60 FPS RENDER LOOPS (3D Mesh & ECG Canvas)
  // =================================================================
  startGlobalRenderLoops() {
    let tick = 0;

    const loop = () => {
      tick++;
      const time = tick * 0.025;

      // Render 3D Canvas
      if (this.ctx3D && this.canvas3D) {
        this.render3DMesh(time);
      }

      // Render ECG Canvas
      if (this.ecgCtx && this.ecgCanvas) {
        this.renderECGWave();
      }

      // Render Neural Network Canvas (AI Lab)
      if (this.neuralCtx && this.neuralCanvas) {
        this.neuralTick++;
        this.renderNeuralNetwork(this.neuralTick * 0.03);
      }

      requestAnimationFrame(loop);
    };

    loop();
  }

  render3DMesh(time) {
    const ctx = this.ctx3D;
    const w = this.canvas3D.width;
    const h = this.canvas3D.height;
    const cx = w / 2;
    const cy = h / 2;

    ctx.clearRect(0, 0, w, h);

    // Dark backdrop
    const bgGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, w * 0.5);
    bgGrad.addColorStop(0, 'rgba(168, 85, 247, 0.25)');
    bgGrad.addColorStop(1, '#090e1a');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    const points = [];
    const rotY = this.rot3DY + (this.isDragging3D ? 0 : time * 0.6);
    const rotX = this.rot3DX;

    const project = (x, y, z) => {
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const x1 = x * cosY - z * sinY;
      const z1 = z * cosY + x * sinY;

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const y2 = y * cosX - z1 * sinX;
      const z2 = z1 * cosX + y * sinX;

      const scale = 220 / (220 + z2);
      return { x: cx + x1 * scale, y: cy + y2 * scale, z: z2 };
    };

    if (this.geomType === 'torus') {
      const numRings = this.wireframeDensity;
      const pointsPerRing = 14;
      const r1 = 52;
      const r2 = 22;

      for (let i = 0; i < numRings; i++) {
        const u = (i / numRings) * Math.PI * 2;
        for (let j = 0; j < pointsPerRing; j++) {
          const v = (j / pointsPerRing) * Math.PI * 2;
          const x = (r1 + r2 * Math.cos(v)) * Math.cos(u);
          const y = (r1 + r2 * Math.cos(v)) * Math.sin(u);
          const z = r2 * Math.sin(v);
          points.push(project(x, y, z));
        }
      }
    } else if (this.geomType === 'cube') {
      const s = 45;
      const step = 90 / (this.wireframeDensity / 2);
      for (let x = -s; x <= s; x += step) {
        for (let y = -s; y <= s; y += step) {
          points.push(project(x, y, -s));
          points.push(project(x, y, s));
          points.push(project(-s, x, y));
          points.push(project(s, x, y));
        }
      }
    } else if (this.geomType === 'node') {
      const count = this.wireframeDensity * 8;
      for (let i = 0; i < count; i++) {
        const theta = Math.acos(1 - (2 * i) / count);
        const phi = Math.sqrt(count * Math.PI) * theta;
        const rad = 50 + Math.sin(time * 3 + i) * 6;
        const x = rad * Math.sin(theta) * Math.cos(phi);
        const y = rad * Math.sin(theta) * Math.sin(phi);
        const z = rad * Math.cos(theta);
        points.push(project(x, y, z));
      }
    }

    // Draw particle points
    points.forEach(p => {
      const alpha = Math.max(0.15, (p.z + 60) / 120);
      ctx.fillStyle = `rgba(0, 240, 255, ${alpha})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  renderECGWave() {
    const ctx = this.ecgCtx;
    const w = this.ecgCanvas.width;
    const h = this.ecgCanvas.height;
    const cy = h / 2;

    ctx.clearRect(0, 0, w, h);

    // Subtle grid
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.12)';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 15) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 15) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Advance wave offset proportional to Heart Rate
    this.ecgOffset += (this.heartRate / 60) * 2.2;

    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.shadowColor = '#10b981';
    ctx.shadowBlur = 8;
    ctx.beginPath();

    const period = 140;
    for (let x = 0; x < w; x++) {
      const t = (x + this.ecgOffset) % period;
      let y = cy;

      if (t > 40 && t < 55) {
        y = cy - Math.sin(((t - 40) / 15) * Math.PI) * 6; // P Wave
      } else if (t >= 55 && t < 62) {
        y = cy + 4; // Q
      } else if (t >= 62 && t < 72) {
        y = cy - 32; // R Spike
      } else if (t >= 72 && t < 80) {
        y = cy + 8; // S
      } else if (t >= 95 && t < 120) {
        y = cy - Math.sin(((t - 95) / 25) * Math.PI) * 12; // T Wave
      }

      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;
  }

  // Neural Network Canvas Renderer
  renderNeuralNetwork(time) {
    if (!this.neuralCanvas) {
      this.neuralCanvas = document.getElementById('service-neural-canvas');
      this.neuralCtx = this.neuralCanvas ? this.neuralCanvas.getContext('2d') : null;
    }
    if (!this.neuralCtx || !this.neuralCanvas) return;

    const ctx = this.neuralCtx;
    const w = this.neuralCanvas.width;
    const h = this.neuralCanvas.height;
    ctx.clearRect(0, 0, w, h);

    // Layer config: [input, hidden1, hidden2, output]
    const layers = [4, 6, 6, 3];
    const layerX = [];
    const spacing = w / (layers.length + 1);
    layers.forEach((_, i) => layerX.push(spacing * (i + 1)));

    const nodes = [];
    layers.forEach((count, li) => {
      const layerNodes = [];
      const ySpacing = h / (count + 1);
      for (let ni = 0; ni < count; ni++) {
        layerNodes.push({
          x: layerX[li],
          y: ySpacing * (ni + 1),
          activation: (Math.sin(time + li * 1.2 + ni * 0.8) + 1) / 2
        });
      }
      nodes.push(layerNodes);
    });

    // Draw connections
    for (let li = 0; li < nodes.length - 1; li++) {
      for (let a = 0; a < nodes[li].length; a++) {
        for (let b = 0; b < nodes[li + 1].length; b++) {
          const n1 = nodes[li][a];
          const n2 = nodes[li + 1][b];
          const strength = (n1.activation + n2.activation) / 2;
          ctx.strokeStyle = `rgba(139, 92, 246, ${strength * 0.4})`;
          ctx.lineWidth = strength * 1.8;
          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    const colors = ['#3b82f6', '#8b5cf6', '#8b5cf6', '#10b981'];
    nodes.forEach((layer, li) => {
      layer.forEach(node => {
        const radius = 5 + node.activation * 4;
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = colors[li];
        ctx.shadowColor = colors[li];
        ctx.shadowBlur = node.activation * 14;
        ctx.fill();
        ctx.shadowBlur = 0;
      });
    });

    // Layer labels
    ctx.font = '9px monospace';
    ctx.fillStyle = '#64748b';
    ctx.textAlign = 'center';
    const labels = ['Input', 'Dense 1', 'Dense 2', 'Output'];
    layerX.forEach((x, i) => ctx.fillText(labels[i], x, h - 4));
  }

  // =================================================================
  // 8. MOBILE APP DEVELOPMENT LAB (FLAGSHIP SMARTPHONE STUDIO)
  // =================================================================
  initMobileLab() {
    this.mobileCartCount = 2;
    this.mobileWalletBalance = 184520;
    this.mobileCurrentScreen = 'store';
    this.mobilePlatform = 'ios';

    // Platform toggle (iOS 18 Pro / Android 15)
    document.querySelectorAll('.mobile-platform-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.mobile-platform-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.mobilePlatform = btn.getAttribute('data-platform') || 'ios';
        const frame = document.getElementById('mobile-phone-frame');
        const timeDisplay = document.getElementById('mobile-time-display');
        const island = document.getElementById('mobile-dynamic-island');
        if (this.mobilePlatform === 'ios') {
          if (frame) {
            frame.style.borderColor = 'rgba(255, 255, 255, 0.28)';
            frame.style.borderRadius = '36px';
          }
          if (timeDisplay) timeDisplay.textContent = '9:41 AM';
          if (island) island.style.display = 'flex';
        } else {
          if (frame) {
            frame.style.borderColor = 'rgba(59, 130, 246, 0.45)';
            frame.style.borderRadius = '26px';
          }
          if (timeDisplay) timeDisplay.textContent = '09:41';
          if (island) island.style.display = 'flex';
        }
      });
    });

    // Dynamic Island Tap to Expand / Collapse
    const dynamicIsland = document.getElementById('mobile-dynamic-island');
    if (dynamicIsland) {
      dynamicIsland.addEventListener('click', () => {
        dynamicIsland.classList.toggle('expanded');
        if (dynamicIsland.classList.contains('expanded')) {
          dynamicIsland.innerHTML = `
            <div style="display:flex;justify-content:space-between;align-items:center;width:100%;">
              <div style="display:flex;align-items:center;gap:8px;">
                <div style="width:28px;height:28px;border-radius:8px;background:linear-gradient(135deg,#3b82f6,#8b5cf6);display:flex;align-items:center;justify-content:center;color:white;font-size:0.75rem;"><i class="fa-solid fa-truck-fast"></i></div>
                <div>
                  <div style="font-size:0.68rem;font-weight:700;color:#f8fafc;font-family:var(--font-sans);">Order #1248 on Route</div>
                  <div style="font-size:0.58rem;color:#94a3b8;">Arriving in 14 mins · 2.4 km</div>
                </div>
              </div>
              <span style="color:#10b981;font-size:0.65rem;font-weight:700;">Live 🟢</span>
            </div>
          `;
        } else {
          dynamicIsland.innerHTML = `
            <div style="display:flex;align-items:center;gap:6px;">
              <i class="fa-solid fa-bag-shopping" style="color:#10b981;font-size:0.65rem;"></i>
              <span id="island-text" style="font-size:0.62rem;font-family:var(--font-sans);font-weight:600;">ShopPulse</span>
            </div>
            <div style="display:flex;align-items:center;gap:4px;">
              <span class="live-status-dot" style="width:5px;height:5px;background:#10b981;"></span>
              <i class="fa-solid fa-chevron-down" style="font-size:0.55rem;opacity:0.6;"></i>
            </div>
          `;
        }
      });
    }

    // Bottom Navigation Bar Switching
    document.querySelectorAll('.mobile-bottom-nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.mobile-bottom-nav-btn').forEach(b => {
          b.classList.remove('active-nav');
          b.style.color = '#64748b';
        });
        btn.classList.add('active-nav');
        btn.style.color = '#3b82f6';
        const screen = btn.getAttribute('data-screen');
        this.renderMobileScreen(screen);
      });
    });

    // Quick Trigger: Push Notification
    const pushBtn = document.getElementById('mobile-push-btn');
    if (pushBtn) {
      pushBtn.addEventListener('click', () => {
        const appScreen = document.getElementById('mobile-app-screen');
        if (!appScreen) return;
        const banner = document.createElement('div');
        banner.style.cssText = 'position:absolute;top:4px;left:8px;right:8px;background:rgba(15,23,42,0.95);border:1px solid rgba(59,130,246,0.5);border-radius:14px;padding:10px 12px;display:flex;align-items:center;gap:10px;z-index:20;box-shadow:0 10px 25px rgba(0,0,0,0.8);backdrop-filter:blur(12px);animation:slideDown 0.3s cubic-bezier(0.16,1,0.3,1);';
        banner.innerHTML = `
          <div style="width:32px;height:32px;border-radius:8px;background:linear-gradient(135deg,#3b82f6,#8b5cf6);display:flex;align-items:center;justify-content:center;color:white;font-size:0.9rem;flex-shrink:0;"><i class="fa-solid fa-bell"></i></div>
          <div style="flex:1;">
            <div style="display:flex;justify-content:space-between;align-items:center;"><strong style="font-size:0.72rem;color:#f8fafc;font-family:var(--font-sans);">ShopPulse Flash Deal</strong><span style="font-size:0.58rem;color:#64748b;">now</span></div>
            <div style="font-size:0.64rem;color:#cbd5e1;margin-top:2px;">Extra 20% OFF on all React Native suites! Code: <code>SPEED20</code></div>
          </div>
        `;
        appScreen.appendChild(banner);
        setTimeout(() => {
          banner.style.opacity = '0';
          banner.style.transform = 'translateY(-20px)';
          banner.style.transition = 'all 0.3s ease';
          setTimeout(() => banner.remove(), 300);
        }, 3500);
      });
    }

    // Quick Trigger: Apple Pay / GPay Sheet
    const paySheetBtn = document.getElementById('mobile-pay-sheet-btn');
    if (paySheetBtn) {
      paySheetBtn.addEventListener('click', () => {
        this.triggerMobilePayModal();
      });
    }

    // Initial Screen
    this.renderMobileScreen('store');
  }

  renderMobileScreen(screenId) {
    this.mobileCurrentScreen = screenId;
    const container = document.getElementById('mobile-app-screen');
    if (!container) return;

    if (screenId === 'store') {
      container.innerHTML = `
        <div style="animation:fadeIn 0.25s ease;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
            <div>
              <div style="font-size:0.88rem;font-weight:800;color:#f8fafc;font-family:var(--font-sans);">ShopPulse Studio</div>
              <div style="font-size:0.62rem;color:#64748b;">60 FPS Native React Native Store</div>
            </div>
            <div id="mobile-cart-badge" style="background:rgba(59,130,246,0.2);border:1px solid rgba(59,130,246,0.4);border-radius:var(--radius-full);padding:4px 8px;font-size:0.68rem;color:#38bdf8;font-weight:700;display:flex;align-items:center;gap:4px;cursor:pointer;" title="View Cart">
              <i class="fa-solid fa-cart-shopping"></i><span>${this.mobileCartCount} items</span>
            </div>
          </div>

          <!-- Product Grid -->
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
            <div style="background:#111827;border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:8px;text-align:center;">
              <div style="font-size:1.6rem;margin-bottom:4px;">👟</div>
              <div style="font-size:0.7rem;font-weight:700;color:#f8fafc;font-family:var(--font-sans);">Cyber Runner X</div>
              <div style="font-size:0.75rem;font-weight:800;color:#38bdf8;margin:2px 0;">₹3,499</div>
              <button class="mobile-add-cart-btn" data-item="Cyber Runner X" style="width:100%;padding:4px;border-radius:6px;background:rgba(59,130,246,0.2);border:1px solid rgba(59,130,246,0.4);color:#60a5fa;font-size:0.62rem;font-weight:700;cursor:pointer;margin-top:4px;">+ Add to Cart</button>
            </div>

            <div style="background:#111827;border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:8px;text-align:center;">
              <div style="font-size:1.6rem;margin-bottom:4px;">⌚</div>
              <div style="font-size:0.7rem;font-weight:700;color:#f8fafc;font-family:var(--font-sans);">Quantum Watch</div>
              <div style="font-size:0.75rem;font-weight:800;color:#10b981;margin:2px 0;">₹8,999</div>
              <button class="mobile-add-cart-btn" data-item="Quantum Watch" style="width:100%;padding:4px;border-radius:6px;background:rgba(16,185,129,0.2);border:1px solid rgba(16,185,129,0.4);color:#34d399;font-size:0.62rem;font-weight:700;cursor:pointer;margin-top:4px;">+ Add to Cart</button>
            </div>

            <div style="background:#111827;border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:8px;text-align:center;">
              <div style="font-size:1.6rem;margin-bottom:4px;">🎧</div>
              <div style="font-size:0.7rem;font-weight:700;color:#f8fafc;font-family:var(--font-sans);">Sonic Pro ANC</div>
              <div style="font-size:0.75rem;font-weight:800;color:#a855f7;margin:2px 0;">₹4,299</div>
              <button class="mobile-add-cart-btn" data-item="Sonic Pro ANC" style="width:100%;padding:4px;border-radius:6px;background:rgba(168,85,247,0.2);border:1px solid rgba(168,85,247,0.4);color:#c084fc;font-size:0.62rem;font-weight:700;cursor:pointer;margin-top:4px;">+ Add to Cart</button>
            </div>

            <div style="background:#111827;border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:8px;text-align:center;">
              <div style="font-size:1.6rem;margin-bottom:4px;">🛸</div>
              <div style="font-size:0.7rem;font-weight:700;color:#f8fafc;font-family:var(--font-sans);">Aero Drone 4K</div>
              <div style="font-size:0.75rem;font-weight:800;color:#f59e0b;margin:2px 0;">₹14,999</div>
              <button class="mobile-add-cart-btn" data-item="Aero Drone 4K" style="width:100%;padding:4px;border-radius:6px;background:rgba(245,158,11,0.2);border:1px solid rgba(245,158,11,0.4);color:#fbbf24;font-size:0.62rem;font-weight:700;cursor:pointer;margin-top:4px;">+ Add to Cart</button>
            </div>
          </div>
        </div>
      `;

      // Attach Add-to-cart handlers
      container.querySelectorAll('.mobile-add-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          this.mobileCartCount++;
          const badge = document.getElementById('mobile-cart-badge');
          if (badge) {
            badge.innerHTML = `<i class="fa-solid fa-cart-shopping"></i><span>${this.mobileCartCount} items</span>`;
            badge.style.transform = 'scale(1.2)';
            badge.style.transition = 'transform 0.15s ease';
            setTimeout(() => badge.style.transform = 'scale(1)', 150);
          }
          btn.textContent = '✓ Added';
          btn.style.background = '#10b981';
          btn.style.color = '#ffffff';
          setTimeout(() => {
            btn.textContent = '+ Add to Cart';
            btn.style.background = '';
            btn.style.color = '';
          }, 1000);
        });
      });

      const cartBadge = document.getElementById('mobile-cart-badge');
      if (cartBadge) {
        cartBadge.addEventListener('click', () => this.triggerMobilePayModal());
      }
    } else if (screenId === 'wallet') {
      container.innerHTML = `
        <div style="animation:fadeIn 0.25s ease;">
          <div style="background:linear-gradient(135deg,rgba(59,130,246,0.15),rgba(16,185,129,0.15));border:1px solid rgba(59,130,246,0.3);border-radius:14px;padding:12px;text-align:center;margin-bottom:10px;">
            <div style="font-size:0.62rem;color:#94a3b8;text-transform:uppercase;letter-spacing:0.05em;">Total Portfolio Value</div>
            <div id="mobile-wallet-balance" style="font-size:1.5rem;font-weight:800;color:#10b981;font-family:var(--font-sans);margin:4px 0;">₹${this.mobileWalletBalance.toLocaleString('en-IN')}</div>
            <div style="font-size:0.62rem;color:#38bdf8;">+18.4% (₹24,800 this month) 📈</div>
          </div>

          <!-- Mini Candlestick Sparkline -->
          <div style="background:#0f172a;border-radius:10px;padding:8px;border:1px solid rgba(255,255,255,0.06);margin-bottom:10px;">
            <div style="display:flex;justify-content:space-between;font-size:0.65rem;color:#94a3b8;margin-bottom:4px;">
              <span>BTC/INR Live</span><span style="color:#10b981;">₹54,20,000 ▲</span>
            </div>
            <svg viewBox="0 0 200 40" style="width:100%;height:40px;overflow:visible;">
              <path d="M0,30 Q25,35 50,20 T100,15 T150,25 T200,8" fill="none" stroke="#10b981" stroke-width="2.5"/>
              <path d="M0,30 Q25,35 50,20 T100,15 T150,25 T200,8 L200,40 L0,40 Z" fill="rgba(16,185,129,0.15)"/>
            </svg>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">
            <button id="mobile-send-money-btn" style="padding:8px;border-radius:8px;background:linear-gradient(135deg,#3b82f6,#2563eb);border:none;color:white;font-size:0.68rem;font-weight:700;cursor:pointer;"><i class="fa-solid fa-paper-plane" style="margin-right:4px;"></i>Send ₹5,000</button>
            <button id="mobile-receive-money-btn" style="padding:8px;border-radius:8px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);color:#cbd5e1;font-size:0.68rem;font-weight:700;cursor:pointer;"><i class="fa-solid fa-qrcode" style="margin-right:4px;"></i>QR Receive</button>
          </div>
        </div>
      `;

      const sendBtn = document.getElementById('mobile-send-money-btn');
      if (sendBtn) {
        sendBtn.addEventListener('click', () => {
          this.mobileWalletBalance -= 5000;
          const balEl = document.getElementById('mobile-wallet-balance');
          if (balEl) balEl.textContent = `₹${this.mobileWalletBalance.toLocaleString('en-IN')}`;
          sendBtn.textContent = '✓ Sent ₹5,000';
          setTimeout(() => sendBtn.innerHTML = '<i class="fa-solid fa-paper-plane" style="margin-right:4px;"></i>Send ₹5,000', 1200);
        });
      }
    } else if (screenId === 'chat') {
      container.innerHTML = `
        <div style="display:flex;flex-direction:column;height:100%;animation:fadeIn 0.25s ease;">
          <div style="font-size:0.75rem;font-weight:700;color:#f8fafc;margin-bottom:8px;display:flex;align-items:center;gap:6px;">
            <span style="width:8px;height:8px;border-radius:50%;background:#10b981;display:inline-block;"></span>
            <span>Founder Architect Chat (Direct)</span>
          </div>

          <div id="mobile-chat-stream" style="flex:1;overflow-y:auto;display:flex;flex-direction:column;gap:6px;margin-bottom:8px;max-height:220px;">
            <div style="align-self:flex-start;background:#1e293b;border-radius:10px 10px 10px 2px;padding:6px 10px;font-size:0.65rem;color:#cbd5e1;max-width:85%;">
              Hi! Welcome to PixelToCloud. Are you planning an iOS, Android, or Full-Stack solution?
            </div>
            <div style="align-self:flex-end;background:#2563eb;border-radius:10px 10px 2px 10px;padding:6px 10px;font-size:0.65rem;color:#ffffff;max-width:85%;">
              Looking for a cross-platform React Native app with payment gateways.
            </div>
            <div style="align-self:flex-start;background:#1e293b;border-radius:10px 10px 10px 2px;padding:6px 10px;font-size:0.65rem;color:#cbd5e1;max-width:85%;">
              We can engineer that with zero-downtime microservices and OTA cloud updates!
            </div>
          </div>

          <div style="display:flex;gap:4px;">
            <input type="text" id="mobile-chat-input" placeholder="Type a message..." style="flex:1;padding:6px 10px;background:#111827;border:1px solid rgba(255,255,255,0.15);border-radius:6px;color:#f8fafc;font-size:0.68rem;font-family:var(--font-sans);">
            <button id="mobile-chat-send-btn" style="padding:6px 10px;background:#3b82f6;border:none;border-radius:6px;color:white;cursor:pointer;"><i class="fa-solid fa-paper-plane"></i></button>
          </div>
        </div>
      `;

      const sendMsg = () => {
        const input = document.getElementById('mobile-chat-input');
        const stream = document.getElementById('mobile-chat-stream');
        if (!input || !stream || !input.value.trim()) return;
        const userBubble = document.createElement('div');
        userBubble.style.cssText = 'align-self:flex-end;background:#2563eb;border-radius:10px 10px 2px 10px;padding:6px 10px;font-size:0.65rem;color:#ffffff;max-width:85%;animation:fadeIn 0.2s ease;';
        userBubble.textContent = input.value;
        stream.appendChild(userBubble);
        const text = input.value;
        input.value = '';
        stream.scrollTop = stream.scrollHeight;

        setTimeout(() => {
          const botBubble = document.createElement('div');
          botBubble.style.cssText = 'align-self:flex-start;background:#1e293b;border-radius:10px 10px 10px 2px;padding:6px 10px;font-size:0.65rem;color:#cbd5e1;max-width:85%;animation:fadeIn 0.2s ease;';
          botBubble.textContent = `Got it! Let's schedule a 15-min discovery sprint. Message us directly on WhatsApp at +91-8219352124!`;
          stream.appendChild(botBubble);
          stream.scrollTop = stream.scrollHeight;
        }, 600);
      };

      const sendBtn = document.getElementById('mobile-chat-send-btn');
      const input = document.getElementById('mobile-chat-input');
      if (sendBtn) sendBtn.addEventListener('click', sendMsg);
      if (input) input.addEventListener('keydown', (e) => { if (e.key === 'Enter') sendMsg(); });
    } else if (screenId === 'biometrics') {
      container.innerHTML = `
        <div style="text-align:center;padding:10px 0;animation:fadeIn 0.25s ease;">
          <div id="bio-scan-mesh" style="width:70px;height:70px;border-radius:50%;border:2px dashed #3b82f6;margin:10px auto;display:flex;align-items:center;justify-content:center;font-size:1.8rem;color:#3b82f6;transition:all 0.3s ease;">
            <i class="fa-solid fa-fingerprint"></i>
          </div>
          <div id="bio-scan-status" style="font-size:0.85rem;font-weight:700;color:#f8fafc;font-family:var(--font-sans);">Biometric Security</div>
          <div style="font-size:0.65rem;color:#64748b;margin:4px 0 16px;">Face ID & Secure Enclave Active</div>

          <button id="bio-scan-trigger-btn" style="padding:8px 16px;border-radius:var(--radius-full);background:linear-gradient(135deg,#3b82f6,#8b5cf6);border:none;color:white;font-size:0.72rem;font-weight:700;cursor:pointer;">
            <i class="fa-solid fa-expand" style="margin-right:6px;"></i>Simulate Face Scan
          </button>
        </div>
      `;

      const scanBtn = document.getElementById('bio-scan-trigger-btn');
      if (scanBtn) {
        scanBtn.addEventListener('click', () => {
          const mesh = document.getElementById('bio-scan-mesh');
          const status = document.getElementById('bio-scan-status');
          if (mesh && status) {
            mesh.style.borderColor = '#10b981';
            mesh.style.color = '#10b981';
            mesh.style.boxShadow = '0 0 25px rgba(16,185,129,0.5)';
            mesh.innerHTML = '<i class="fa-solid fa-check" style="animation:pulse 0.4s ease;"></i>';
            status.textContent = 'Authentication Verified ✓';
            status.style.color = '#10b981';
            setTimeout(() => {
              mesh.style.borderColor = '#3b82f6';
              mesh.style.color = '#3b82f6';
              mesh.style.boxShadow = '';
              mesh.innerHTML = '<i class="fa-solid fa-fingerprint"></i>';
              status.textContent = 'Biometric Security';
              status.style.color = '#f8fafc';
            }, 2500);
          }
        });
      }
    }
  }

  triggerMobilePayModal() {
    const appScreen = document.getElementById('mobile-app-screen');
    if (!appScreen) return;
    const modal = document.createElement('div');
    modal.style.cssText = 'position:absolute;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.85);z-index:30;display:flex;flex-direction:column;justify-content:flex-end;animation:fadeIn 0.2s ease;';
    modal.innerHTML = `
      <div style="background:#111827;border-top:1px solid rgba(255,255,255,0.15);border-radius:20px 20px 0 0;padding:16px;animation:slideUp 0.25s cubic-bezier(0.16,1,0.3,1);">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
          <span style="font-size:0.85rem;font-weight:800;color:white;display:flex;align-items:center;gap:6px;">
            <i class="fa-brands fa-apple" style="font-size:1.1rem;"></i>Apple Pay Instant Checkout
          </span>
          <button id="pay-modal-close" style="background:none;border:none;color:#94a3b8;font-size:0.9rem;cursor:pointer;">✕</button>
        </div>
        <div style="font-size:0.72rem;color:#cbd5e1;margin-bottom:12px;border-bottom:1px solid rgba(255,255,255,0.06);padding-bottom:8px;">
          <div style="display:flex;justify-content:space-between;"><span>ShopPulse Order Total (${this.mobileCartCount} items)</span><strong style="color:#10b981;">₹12,498</strong></div>
          <div style="display:flex;justify-content:space-between;margin-top:4px;color:#64748b;"><span>Payment Method</span><span>Visa ending in •••• 4242</span></div>
        </div>
        <button id="pay-modal-confirm" style="width:100%;padding:10px;border-radius:10px;background:#ffffff;color:#000000;font-weight:800;font-size:0.8rem;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px;">
          <i class="fa-solid fa-fingerprint"></i> Double-Click Side Button to Pay
        </button>
      </div>
    `;
    appScreen.appendChild(modal);

    modal.querySelector('#pay-modal-close').addEventListener('click', () => modal.remove());
    modal.querySelector('#pay-modal-confirm').addEventListener('click', () => {
      const confirmBtn = modal.querySelector('#pay-modal-confirm');
      confirmBtn.innerHTML = '<i class="fa-solid fa-check" style="color:#10b981;"></i> Payment Complete! ₹12,498';
      confirmBtn.style.background = '#10b981';
      confirmBtn.style.color = '#ffffff';
      setTimeout(() => {
        modal.remove();
        this.mobileCartCount = 0;
        this.renderMobileScreen('store');
      }, 1200);
    });
  }

  // =================================================================
  // 9. AI & MACHINE LEARNING LAB (ADVANCED NEURAL SUITE 2.0)
  // =================================================================
  initAILab() {
    this.currentAIMode = 'art';
    this.aiArtSeed = 73842;
    this.neuralNodes = [];
    this.neuralPulses = [];
    this.neuralTick = 0;

    // AI Mode Switcher Buttons
    document.querySelectorAll('.ai-mode-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.ai-mode-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const mode = btn.getAttribute('data-ai-mode') || 'art';
        this.switchAIMode(mode);
      });
    });

    this.switchAIMode('art');
  }

  switchAIMode(mode) {
    this.currentAIMode = mode;
    const stage = document.getElementById('ai-mode-stage');
    if (!stage) return;

    if (mode === 'art') {
      stage.innerHTML = `
        <div style="animation:fadeIn 0.25s ease;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;flex-wrap:wrap;gap:4px;">
            <span style="color:#c084fc;font-weight:700;"><i class="fa-solid fa-wand-magic-sparkles" style="margin-right:4px;"></i>MULTI-MODAL DIFFUSION SYNTHESIS 2.0</span>
            <div style="display:flex;gap:6px;align-items:center;">
              <span id="ai-art-step-badge" style="color:#10b981;font-size:0.62rem;font-family:var(--font-mono);background:rgba(16,185,129,0.1);padding:2px 6px;border-radius:4px;border:1px solid rgba(16,185,129,0.3);">50 Steps · Euler-A</span>
              <span id="ai-art-seed-badge" style="color:#a855f7;background:rgba(168,85,247,0.1);padding:2px 6px;border-radius:4px;border:1px solid rgba(168,85,247,0.3);font-size:0.62rem;font-family:var(--font-mono);">Seed: #${this.aiArtSeed}</span>
            </div>
          </div>

          <!-- Art Canvas Viewport -->
          <canvas id="ai-art-canvas" width="440" height="155" style="width:100%;height:155px;border-radius:8px;border:1px solid rgba(139,92,246,0.35);background:#050510;margin-bottom:8px;box-shadow:0 0 25px rgba(139,92,246,0.2);"></canvas>

          <!-- Prompt Controls -->
          <div style="display:flex;gap:6px;margin-bottom:8px;">
            <input type="text" id="ai-art-prompt-input" value="Cyberpunk Quantum Tokyo with Neon Shaders" placeholder="Describe any visual scene..." style="flex:1;padding:7px 10px;background:#0f172a;border:1px solid rgba(139,92,246,0.4);border-radius:6px;color:#f8fafc;font-size:0.75rem;font-family:var(--font-mono);">
            <button id="ai-generate-art-btn" style="padding:7px 14px;background:linear-gradient(135deg,#8b5cf6,#6366f1);border:none;border-radius:6px;color:white;font-weight:700;font-size:0.72rem;cursor:pointer;white-space:nowrap;box-shadow:0 0 12px rgba(139,92,246,0.4);">
              <i class="fa-solid fa-bolt" style="margin-right:4px;"></i>Synthesize
            </button>
          </div>

          <!-- Quick Preset Chips -->
          <div style="display:flex;gap:4px;flex-wrap:wrap;">
            <button class="ai-prompt-chip" data-prompt="Cyberpunk Quantum Tokyo with Neon Shaders" style="padding:3px 8px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:4px;color:#cbd5e1;font-size:0.65rem;cursor:pointer;">🏙️ Cyber Tokyo</button>
            <button class="ai-prompt-chip" data-prompt="Sacred Neural Lotus in Biomechanical Geometry" style="padding:3px 8px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:4px;color:#cbd5e1;font-size:0.65rem;cursor:pointer;">🪷 Neural Lotus</button>
            <button class="ai-prompt-chip" data-prompt="Cosmic Black Hole with Gravitational Lensing" style="padding:3px 8px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:4px;color:#cbd5e1;font-size:0.65rem;cursor:pointer;">🌌 Black Hole</button>
            <button class="ai-prompt-chip" data-prompt="Biomechanical Dragon with Amber Silicon Core" style="padding:3px 8px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:4px;color:#cbd5e1;font-size:0.65rem;cursor:pointer;">🐉 Mecha Dragon</button>
            <button class="ai-prompt-chip" data-prompt="Quantum DNA Double Helix with Laser Light Fields" style="padding:3px 8px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:4px;color:#cbd5e1;font-size:0.65rem;cursor:pointer;">🧬 Quantum DNA</button>
          </div>
        </div>
      `;

      this.renderGenerativeArt('Cyberpunk Quantum Tokyo with Neon Shaders');

      const genBtn = document.getElementById('ai-generate-art-btn');
      const promptInput = document.getElementById('ai-art-prompt-input');
      if (genBtn && promptInput) {
        genBtn.addEventListener('click', () => {
          this.aiArtSeed = Math.floor(10000 + Math.random() * 90000);
          const badge = document.getElementById('ai-art-seed-badge');
          if (badge) badge.textContent = `Seed: #${this.aiArtSeed}`;
          this.renderGenerativeArt(promptInput.value);
        });
      }

      stage.querySelectorAll('.ai-prompt-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          const p = chip.getAttribute('data-prompt');
          if (promptInput) promptInput.value = p;
          this.aiArtSeed = Math.floor(10000 + Math.random() * 90000);
          const badge = document.getElementById('ai-art-seed-badge');
          if (badge) badge.textContent = `Seed: #${this.aiArtSeed}`;
          this.renderGenerativeArt(p);
        });
      });
    } else if (mode === 'neural') {
      stage.innerHTML = `
        <div style="animation:fadeIn 0.25s ease;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <span style="color:#38bdf8;font-weight:700;"><i class="fa-solid fa-network-wired" style="margin-right:4px;"></i>60 FPS SYNAPSE TOPOLOGY (TAP NODES TO FIRE PULSES)</span>
            <span style="color:#10b981;font-size:0.65rem;font-weight:700;font-family:var(--font-mono);">Loss: 0.0024 · Acc: 99.4%</span>
          </div>
          <canvas id="service-neural-canvas" width="440" height="155" style="width:100%;height:155px;border-radius:8px;border:1px solid var(--border-subtle);background:#020617;margin-bottom:8px;cursor:crosshair;"></canvas>

          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;">
            <button id="neural-pulse-all-btn" style="padding:6px;border-radius:6px;background:rgba(59,130,246,0.2);border:1px solid rgba(59,130,246,0.4);color:#60a5fa;font-size:0.68rem;font-weight:700;cursor:pointer;">
              <i class="fa-solid fa-bolt" style="margin-right:4px;"></i>Forward Pass
            </button>
            <button id="neural-randomize-weights-btn" style="padding:6px;border-radius:6px;background:rgba(139,92,246,0.2);border:1px solid rgba(139,92,246,0.4);color:#c084fc;font-size:0.68rem;font-weight:700;cursor:pointer;">
              <i class="fa-solid fa-rotate" style="margin-right:4px;"></i>Backpropagate
            </button>
            <button id="neural-classify-btn" style="padding:6px;border-radius:6px;background:rgba(16,185,129,0.2);border:1px solid rgba(16,185,129,0.4);color:#10b981;font-size:0.68rem;font-weight:700;cursor:pointer;">
              <i class="fa-solid fa-check" style="margin-right:4px;"></i>Classify Tensor
            </button>
          </div>
        </div>
      `;

      this.initNeuralTopology();
    } else if (mode === 'predict') {
      stage.innerHTML = `
        <div style="animation:fadeIn 0.25s ease;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <span style="font-size:0.75rem;font-weight:700;color:#10b981;">
              <i class="fa-solid fa-chart-line" style="margin-right:4px;"></i>PREDICTIVE BUSINESS INTELLIGENCE &amp; CHURN RISK MODEL
            </span>
            <span style="font-size:0.65rem;color:#38bdf8;font-family:var(--font-mono);">Confidence: 98.6%</span>
          </div>

          <!-- Dynamic SVG Projection Chart -->
          <div style="background:#0f172a;border-radius:8px;padding:10px;border:1px solid rgba(255,255,255,0.06);margin-bottom:8px;">
            <div style="display:flex;justify-content:space-between;font-size:0.65rem;color:#94a3b8;margin-bottom:4px;font-family:var(--font-mono);">
              <span><span>●</span> Revenue Forecast</span>
              <strong id="predict-rev-total" style="color:#10b981;font-size:0.85rem;">₹48.6 Lakhs / yr</strong>
            </div>
            <svg id="predict-svg-curve" viewBox="0 0 300 75" style="width:100%;height:75px;overflow:visible;">
              <path id="predict-curve-upper" d="M0,55 Q75,35 150,20 T300,5" fill="none" stroke="rgba(0,240,255,0.35)" stroke-width="1.5" stroke-dasharray="3,3"/>
              <path id="predict-curve-path" d="M0,60 Q75,45 150,28 T300,12" fill="none" stroke="#10b981" stroke-width="2.5"/>
              <path id="predict-curve-fill" d="M0,60 Q75,45 150,28 T300,12 L300,75 L0,75 Z" fill="rgba(16,185,129,0.12)"/>
            </svg>
          </div>

          <!-- Interactive Sliders -->
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:0.68rem;margin-bottom:8px;">
            <div>
              <div style="display:flex;justify-content:space-between;color:#cbd5e1;margin-bottom:2px;"><span>Ad Investment ($/mo)</span><strong id="predict-ad-val" style="color:#38bdf8;">$5,000</strong></div>
              <input type="range" id="predict-ad-slider" min="1000" max="30000" value="5000" style="width:100%;height:4px;accent-color:#38bdf8;">
            </div>
            <div>
              <div style="display:flex;justify-content:space-between;color:#cbd5e1;margin-bottom:2px;"><span>Traffic Scale (req/s)</span><strong id="predict-traffic-val" style="color:#a855f7;">60k req/s</strong></div>
              <input type="range" id="predict-traffic-slider" min="5000" max="200000" value="60000" style="width:100%;height:4px;accent-color:#a855f7;">
            </div>
          </div>

          <!-- AI Risk Metrics -->
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;text-align:center;">
            <div style="background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.25);border-radius:4px;padding:4px;">
              <div style="font-size:0.58rem;color:#94a3b8;">Churn Probability</div>
              <div style="font-size:0.8rem;font-weight:700;color:#10b981;" id="predict-churn-val">3.4% (Low)</div>
            </div>
            <div style="background:rgba(56,189,248,0.08);border:1px solid rgba(56,189,248,0.25);border-radius:4px;padding:4px;">
              <div style="font-size:0.58rem;color:#94a3b8;">Customer LTV</div>
              <div style="font-size:0.8rem;font-weight:700;color:#38bdf8;" id="predict-ltv-val">₹54,200</div>
            </div>
            <div style="background:rgba(168,85,247,0.08);border:1px solid rgba(168,85,247,0.25);border-radius:4px;padding:4px;">
              <div style="font-size:0.58rem;color:#94a3b8;">Conversion Lift</div>
              <div style="font-size:0.8rem;font-weight:700;color:#c084fc;" id="predict-conv-val">+34.8%</div>
            </div>
          </div>
        </div>
      `;

      const updatePredict = () => {
        const ad = parseInt(document.getElementById('predict-ad-slider').value);
        const traffic = parseInt(document.getElementById('predict-traffic-slider').value);
        document.getElementById('predict-ad-val').textContent = `$${ad.toLocaleString()}`;
        document.getElementById('predict-traffic-val').textContent = `${(traffic/1000).toFixed(0)}k req/s`;

        const totalRevLakhs = (ad * 0.0055 + traffic * 0.00032 + 14).toFixed(1);
        document.getElementById('predict-rev-total').textContent = `₹${totalRevLakhs} Lakhs / yr`;
        
        const churn = Math.max(1.8, (5.5 - (traffic / 50000) * 0.8)).toFixed(1);
        document.getElementById('predict-churn-val').textContent = `${churn}% (Low)`;
        document.getElementById('predict-ltv-val').textContent = `₹${(45000 + (ad / 1000) * 1800).toLocaleString('en-IN')}`;

        const midY = Math.max(8, 60 - (ad / 30000) * 38);
        const endY = Math.max(4, 40 - (traffic / 200000) * 34);
        document.getElementById('predict-curve-path').setAttribute('d', `M0,60 Q75,${midY} 150,${(midY+endY)/2} T300,${endY}`);
        document.getElementById('predict-curve-fill').setAttribute('d', `M0,60 Q75,${midY} 150,${(midY+endY)/2} T300,${endY} L300,75 L0,75 Z`);
        document.getElementById('predict-curve-upper').setAttribute('d', `M0,${Math.max(2, 55 - (ad/30000)*25)} Q75,${Math.max(2, midY-8)} 150,${Math.max(2, (midY+endY)/2 - 8)} T300,${Math.max(2, endY-6)}`);
      };

      document.getElementById('predict-ad-slider').addEventListener('input', updatePredict);
      document.getElementById('predict-traffic-slider').addEventListener('input', updatePredict);
    } else if (mode === 'llm') {
      stage.innerHTML = `
        <div style="animation:fadeIn 0.25s ease;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <span style="color:#8b5cf6;font-weight:700;"><i class="fa-solid fa-robot" style="margin-right:4px;"></i>STREAMING LLM AGENT INFERENCE</span>
            <span style="color:#10b981;font-size:0.65rem;font-family:var(--font-mono);">175 tok/sec · TTFT: 48ms</span>
          </div>

          <div id="llm-stream-output" style="height:140px;background:#050510;border-radius:6px;padding:10px;font-family:var(--font-mono);font-size:0.72rem;color:#cbd5e1;line-height:1.6;border:1px solid rgba(139,92,246,0.3);overflow-y:auto;margin-bottom:8px;">
            <span style="color:#64748b;">// Awaiting task prompt... Click a button below to trigger real-time AI code generation</span>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">
            <button id="llm-run-fastapi-btn" style="padding:7px;background:linear-gradient(135deg,#8b5cf6,#3b82f6);border:none;border-radius:6px;color:white;font-weight:700;font-size:0.7rem;cursor:pointer;">
              <i class="fa-solid fa-bolt" style="margin-right:4px;"></i>FastAPI Microservice
            </button>
            <button id="llm-run-rag-btn" style="padding:7px;background:rgba(16,185,129,0.15);border:1px solid rgba(16,185,129,0.35);border-radius:6px;color:#10b981;font-weight:700;font-size:0.7rem;cursor:pointer;">
              <i class="fa-solid fa-brain" style="margin-right:4px;"></i>Vector RAG Search
            </button>
            <button id="llm-run-sql-btn" style="padding:7px;background:rgba(245,158,11,0.15);border:1px solid rgba(245,158,11,0.35);border-radius:6px;color:#f59e0b;font-weight:700;font-size:0.7rem;cursor:pointer;">
              <i class="fa-solid fa-database" style="margin-right:4px;"></i>SQL Query Optimizer
            </button>
            <button id="llm-run-audit-btn" style="padding:7px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.15);border-radius:6px;color:#cbd5e1;font-weight:700;font-size:0.7rem;cursor:pointer;">
              <i class="fa-solid fa-shield-virus" style="margin-right:4px;"></i>OWASP Security Audit
            </button>
          </div>
        </div>
      `;

      const streamCode = (text) => {
        const out = document.getElementById('llm-stream-output');
        if (!out) return;
        out.innerHTML = '';
        let i = 0;
        const interval = setInterval(() => {
          out.innerHTML += text.charAt(i);
          out.scrollTop = out.scrollHeight;
          i++;
          if (i >= text.length) clearInterval(interval);
        }, 10);
      };

      document.getElementById('llm-run-fastapi-btn').addEventListener('click', () => {
        streamCode(`// FastAPI Async Inference Engine\nfrom fastapi import FastAPI, BackgroundTasks\nimport torch\n\napp = FastAPI(title="PixelToCloud AI Gateway")\nmodel = torch.jit.load("models/transformer_quantized.pt")\n\n@app.post("/v1/predict")\nasync def infer(payload: dict):\n    tensor = torch.tensor(payload["features"]).cuda()\n    with torch.inference_mode():\n        output = model(tensor)\n    return {"status": "success", "latency_ms": 1.42, "prediction": output.tolist()}`);
      });

      document.getElementById('llm-run-rag-btn').addEventListener('click', () => {
        streamCode(`// Hybrid Vector & Keyword Retrieval (RAG Pipeline)\nfrom qdrant_client import QdrantClient\nfrom sentence_transformers import SentenceTransformer\n\nclient = QdrantClient(url="https://qdrant.pixeltocloud.io:6333")\nembedder = SentenceTransformer("all-MiniLM-L6-v2")\n\nquery_vector = embedder.encode("enterprise tax calculation compliance")\nresults = client.search(collection_name="financial_docs", query_vector=query_vector, limit=3)\n[✓] 3 Top Chunks Retrieved (Cosine Similarity: 0.942)`);
      });

      document.getElementById('llm-run-sql-btn').addEventListener('click', () => {
        streamCode(`-- Optimized B-Tree Composite Index\nEXPLAIN ANALYZE\nSELECT c.id, c.name, SUM(o.total_amount) AS revenue\nFROM clients c\nJOIN orders o ON c.id = o.client_id\nWHERE o.created_at >= NOW() - INTERVAL '30 days'\nGROUP BY c.id, c.name\nORDER BY revenue DESC LIMIT 10;\n-- Execution Time: 0.084ms (Index Scan using idx_orders_client_created)`);
      });

      document.getElementById('llm-run-audit-btn').addEventListener('click', () => {
        streamCode(`// OWASP Vulnerability Analysis Report\n[✓] SQL Injection Guard: Verified Parameterized Queries\n[✓] XSS Protection: Content-Security-Policy Strict Active\n[✓] Rate Limiting: Leaky Bucket Token Mesh (10,000 req/min)\n[✓] TLS Handshake: TLS 1.3 Strict Elliptic-Curve (P-384)\n\nConclusion: Zero Critical Vulnerabilities. 100% Production Ready.`);
      });
    }
  }

  initNeuralTopology() {
    const canvas = document.getElementById('service-neural-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    // Build 4 Layers (4 -> 6 -> 6 -> 3)
    const layerSizes = [4, 6, 6, 3];
    const layers = [];
    const layerX = [40, 150, 290, 400];

    layerSizes.forEach((size, lIdx) => {
      const nodes = [];
      const stepY = (h - 30) / (size + 1);
      for (let n = 0; n < size; n++) {
        nodes.push({
          x: layerX[lIdx],
          y: stepY * (n + 1) + 15,
          val: Math.random() * 0.8 + 0.2,
          radius: lIdx === 0 || lIdx === 3 ? 6 : 5
        });
      }
      layers.push(nodes);
    });

    let pulses = [];

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // Draw Synapse Lines
      for (let l = 0; l < layers.length - 1; l++) {
        const curr = layers[l];
        const next = layers[l + 1];
        curr.forEach(n1 => {
          next.forEach(n2 => {
            ctx.strokeStyle = 'rgba(56, 189, 248, 0.12)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          });
        });
      }

      // Draw & Update Moving Pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.progress += 0.05;
        const curX = p.fromX + (p.toX - p.fromX) * p.progress;
        const curY = p.fromY + (p.toY - p.fromY) * p.progress;

        ctx.fillStyle = p.color || '#00f0ff';
        ctx.shadowColor = p.color || '#00f0ff';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(curX, curY, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        if (p.progress >= 1) {
          pulses.splice(i, 1);
        }
      }

      // Draw Nodes
      layers.forEach((nodes, lIdx) => {
        nodes.forEach(n => {
          const color = lIdx === 0 ? '#38bdf8' : (lIdx === 3 ? '#10b981' : '#c084fc');
          ctx.fillStyle = color;
          ctx.shadowColor = color;
          ctx.shadowBlur = 6;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        });
      });
    };

    const interval = setInterval(draw, 1000 / 60);

    const firePulseWave = () => {
      for (let l = 0; l < layers.length - 1; l++) {
        const curr = layers[l];
        const next = layers[l + 1];
        curr.forEach(n1 => {
          const target = next[Math.floor(Math.random() * next.length)];
          pulses.push({
            fromX: n1.x,
            fromY: n1.y,
            toX: target.x,
            toY: target.y,
            progress: 0,
            color: l === 0 ? '#38bdf8' : (l === 1 ? '#c084fc' : '#10b981')
          });
        });
      }
    };

    const pulseBtn = document.getElementById('neural-pulse-all-btn');
    if (pulseBtn) pulseBtn.onclick = firePulseWave;

    const randBtn = document.getElementById('neural-randomize-weights-btn');
    if (randBtn) {
      randBtn.onclick = () => {
        firePulseWave();
      };
    }

    const classifyBtn = document.getElementById('neural-classify-btn');
    if (classifyBtn) {
      classifyBtn.onclick = () => {
        firePulseWave();
      };
    }

    // Interactive Canvas click to fire from node
    canvas.onclick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = (e.clientX - rect.left) * (w / rect.width);
      const clickY = (e.clientY - rect.top) * (h / rect.height);
      
      layers[0].forEach(n1 => {
        const nextNode = layers[1][Math.floor(Math.random() * layers[1].length)];
        pulses.push({
          fromX: n1.x,
          fromY: n1.y,
          toX: nextNode.x,
          toY: nextNode.y,
          progress: 0,
          color: '#00f0ff'
        });
      });
    };

    firePulseWave();
  }

  renderGenerativeArt(prompt) {
    const canvas = document.getElementById('ai-art-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    // Multi-stage Gradient Diffusion Backdrop
    const grad = ctx.createRadialGradient(w/2, h/2, 10, w/2, h/2, w/2);
    if (prompt.includes('Tokyo') || prompt.includes('City')) {
      grad.addColorStop(0, '#0284c7');
      grad.addColorStop(0.5, '#7c3aed');
      grad.addColorStop(1, '#020617');
    } else if (prompt.includes('Lotus')) {
      grad.addColorStop(0, '#ec4899');
      grad.addColorStop(0.5, '#8b5cf6');
      grad.addColorStop(1, '#050b14');
    } else if (prompt.includes('Dragon') || prompt.includes('Amber')) {
      grad.addColorStop(0, '#f59e0b');
      grad.addColorStop(0.5, '#b45309');
      grad.addColorStop(1, '#020617');
    } else if (prompt.includes('DNA')) {
      grad.addColorStop(0, '#10b981');
      grad.addColorStop(0.5, '#0284c7');
      grad.addColorStop(1, '#020617');
    } else {
      grad.addColorStop(0, '#6366f1');
      grad.addColorStop(0.5, '#0f172a');
      grad.addColorStop(1, '#020617');
    }

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Geometric Sacred Rings & Fractals
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 20; i++) {
      const angle = (i / 20) * Math.PI * 2;
      const rx = w/2 + Math.cos(angle) * (35 + (this.aiArtSeed % 35));
      const ry = h/2 + Math.sin(angle) * (22 + (this.aiArtSeed % 25));

      ctx.strokeStyle = `rgba(255, 255, 255, ${0.12 + (i % 3) * 0.12})`;
      ctx.beginPath();
      ctx.arc(rx, ry, 26 + (i * 2), 0, Math.PI * 2);
      ctx.stroke();
    }

    // Glowing Neon Particle Grid
    for (let p = 0; p < 45; p++) {
      const px = ((p * 47 + this.aiArtSeed) % w);
      const py = ((p * 31 + this.aiArtSeed) % h);
      ctx.fillStyle = (p % 2 === 0) ? '#00f0ff' : '#c084fc';
      ctx.beginPath();
      ctx.arc(px, py, (p % 3) + 1.2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Central Generative Glyph
    ctx.font = 'bold 11px monospace';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 12;
    ctx.fillText(`✨ ${prompt}`, w/2, h/2 + 4);
    ctx.shadowBlur = 0;
  }

  // =================================================================
  // 10. DESKTOP SOFTWARE LAB (ADVANCED OS SUITE & ARCADE 2.0)
  // =================================================================
  initDesktopLab() {
    this.desktopCurrentSubtab = 'invoice';
    this.desktopOS = 'windows';
    this.calcInput = '0';
    this.calcPrev = null;
    this.calcOp = null;
    this.gameScore = 0;
    this.gameHighScore = 240;
    this.gameRunning = false;

    // OS Switcher (Windows 11, macOS Sonoma, Ubuntu 24.04)
    const osLabels = { windows: 'Windows 11 Fluent', macos: 'macOS Sonoma Metal', linux: 'Ubuntu 24.04 GNOME' };
    document.querySelectorAll('.desktop-os-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.desktop-os-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.desktopOS = btn.getAttribute('data-os') || 'windows';
        const label = document.getElementById('desktop-os-label');
        if (label) label.textContent = osLabels[this.desktopOS] || 'Windows 11';

        const frame = document.getElementById('desktop-window-frame');
        if (this.desktopOS === 'macos') {
          if (frame) frame.style.borderColor = 'rgba(255,255,255,0.2)';
        } else if (this.desktopOS === 'linux') {
          if (frame) frame.style.borderColor = 'rgba(234,88,12,0.4)';
        } else {
          if (frame) frame.style.borderColor = 'rgba(245,158,11,0.35)';
        }
      });
    });

    // Window Controls (Red / Yellow / Green Traffic Dots)
    const btnClose = document.getElementById('win-btn-close');
    const btnMin = document.getElementById('win-btn-min');
    const btnMax = document.getElementById('win-btn-max');
    const winFrame = document.getElementById('desktop-window-frame');

    if (btnClose && winFrame) {
      btnClose.addEventListener('click', () => {
        winFrame.style.opacity = '0.3';
        winFrame.style.transform = 'scale(0.95)';
        setTimeout(() => {
          winFrame.style.opacity = '1';
          winFrame.style.transform = 'scale(1)';
        }, 800);
      });
    }

    if (btnMin && winFrame) {
      btnMin.addEventListener('click', () => {
        winFrame.style.transform = 'translateY(15px) scale(0.98)';
        setTimeout(() => winFrame.style.transform = '', 600);
      });
    }

    if (btnMax && winFrame) {
      btnMax.addEventListener('click', () => {
        winFrame.classList.toggle('maximized');
        if (winFrame.classList.contains('maximized')) {
          winFrame.style.boxShadow = '0 0 40px rgba(0,240,255,0.3)';
        } else {
          winFrame.style.boxShadow = '';
        }
      });
    }

    // Dropdown Menu Interactions
    document.querySelectorAll('.desktop-menu-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        const dropdown = item.querySelector('.desktop-dropdown');
        const isShown = dropdown && dropdown.classList.contains('show');
        document.querySelectorAll('.desktop-dropdown').forEach(d => d.classList.remove('show'));
        if (!isShown && dropdown) dropdown.classList.add('show');
      });
    });

    document.addEventListener('click', () => {
      document.querySelectorAll('.desktop-dropdown').forEach(d => d.classList.remove('show'));
    });

    // Dropdown Action Handlers
    document.querySelectorAll('.desktop-dropdown-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        document.querySelectorAll('.desktop-dropdown').forEach(d => d.classList.remove('show'));
        const action = item.getAttribute('data-action');
        const switchTab = item.getAttribute('data-switch-subtab');

        if (switchTab) {
          this.switchDesktopSubtab(switchTab);
          return;
        }

        const statusMsg = document.getElementById('desktop-status-msg');
        if (action === 'new-invoice') {
          this.switchDesktopSubtab('invoice');
          this.addCustomInvoiceRow();
        } else if (action === 'export-pdf') {
          if (statusMsg) {
            statusMsg.innerHTML = '<span style="color:#f59e0b;">⏳ Printing Native PDF Document...</span>';
            setTimeout(() => statusMsg.innerHTML = '<span style="color:#10b981;">✓ Invoice-2026.pdf Exported Successfully!</span>', 1400);
          }
        } else if (action === 'restart-app') {
          this.switchDesktopSubtab(this.desktopCurrentSubtab);
          if (statusMsg) statusMsg.innerHTML = '<span style="color:#38bdf8;">✓ Tauri Desktop Environment Reloaded</span>';
        } else if (action === 'sample-data') {
          this.switchDesktopSubtab('invoice');
          this.addCustomInvoiceRow();
        } else if (action === 'clear-data') {
          const list = document.getElementById('desktop-invoice-list');
          if (list) list.innerHTML = '<div style="color:#64748b;text-align:center;padding:12px;">No active invoices in database. Click "+ Add Invoice"</div>';
        }
      });
    });

    // Subtab Switcher Buttons
    document.querySelectorAll('.desktop-subtab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-subtab');
        this.switchDesktopSubtab(tab);
      });
    });

    // Quick Action Triggers at bottom
    const quickInvBtn = document.getElementById('desktop-quick-invoice-btn');
    if (quickInvBtn) {
      quickInvBtn.addEventListener('click', () => {
        this.switchDesktopSubtab('invoice');
        this.addCustomInvoiceRow();
      });
    }

    const quickCalcBtn = document.getElementById('desktop-quick-calc-btn');
    if (quickCalcBtn) {
      quickCalcBtn.addEventListener('click', () => this.switchDesktopSubtab('calc'));
    }

    const quickGameBtn = document.getElementById('desktop-quick-game-btn');
    if (quickGameBtn) {
      quickGameBtn.addEventListener('click', () => this.switchDesktopSubtab('game'));
    }

    this.switchDesktopSubtab('invoice');
  }

  switchDesktopSubtab(subtabId) {
    this.desktopCurrentSubtab = subtabId;
    document.querySelectorAll('.desktop-subtab-btn').forEach(b => {
      if (b.getAttribute('data-subtab') === subtabId) b.classList.add('active');
      else b.classList.remove('active');
    });

    const body = document.getElementById('desktop-app-body');
    if (!body) return;

    if (subtabId === 'invoice') {
      body.innerHTML = `
        <div style="animation:fadeIn 0.2s ease;">
          <!-- Dashboard KPIs -->
          <div style="display:grid;grid-template-columns:repeat(4, 1fr);gap:6px;margin-bottom:10px;">
            <div style="background:rgba(59,130,246,0.08);border:1px solid rgba(59,130,246,0.25);border-radius:6px;padding:6px;text-align:center;">
              <div id="desktop-metric-invoices" style="font-size:1.1rem;font-weight:800;color:#3b82f6;font-family:var(--font-sans);">342</div>
              <div style="font-size:0.58rem;color:#64748b;">Invoices</div>
            </div>
            <div style="background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.25);border-radius:6px;padding:6px;text-align:center;">
              <div style="font-size:1.1rem;font-weight:800;color:#10b981;font-family:var(--font-sans);">₹18.4L</div>
              <div style="font-size:0.58rem;color:#64748b;">Revenue</div>
            </div>
            <div style="background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.25);border-radius:6px;padding:6px;text-align:center;">
              <div style="font-size:1.1rem;font-weight:800;color:#f59e0b;font-family:var(--font-sans);">89</div>
              <div style="font-size:0.58rem;color:#64748b;">Clients</div>
            </div>
            <div style="background:rgba(168,85,247,0.08);border:1px solid rgba(168,85,247,0.25);border-radius:6px;padding:6px;text-align:center;">
              <div style="font-size:1.1rem;font-weight:800;color:#c084fc;font-family:var(--font-sans);">0.12ms</div>
              <div style="font-size:0.58rem;color:#64748b;">SQLite P99</div>
            </div>
          </div>

          <!-- Invoices Table -->
          <div style="background:#090d16;border-radius:6px;padding:8px;border:1px solid var(--border-subtle);">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
              <span style="font-size:0.65rem;color:#64748b;font-weight:700;">ACTIVE INVOICE LEDGER (CLICK STATUS TO TOGGLE)</span>
              <button id="invoice-add-row-btn" style="padding:2px 8px;background:rgba(59,130,246,0.2);border:1px solid rgba(59,130,246,0.4);border-radius:4px;color:#60a5fa;font-size:0.62rem;cursor:pointer;">+ Add Row</button>
            </div>
            <div id="desktop-invoice-list" style="font-size:0.65rem;line-height:1.8;max-height:120px;overflow-y:auto;">
              <div class="inv-row" style="display:flex;justify-content:space-between;align-items:center;color:#cbd5e1;padding:2px 0;border-bottom:1px solid rgba(255,255,255,0.04);">
                <span>#INV-0341 · Sharma Enterprises</span>
                <span class="inv-status-pill" style="color:#10b981;cursor:pointer;font-weight:700;">₹24,500 [Paid ✓]</span>
              </div>
              <div class="inv-row" style="display:flex;justify-content:space-between;align-items:center;color:#cbd5e1;padding:2px 0;border-bottom:1px solid rgba(255,255,255,0.04);">
                <span>#INV-0340 · CloudNova Solutions</span>
                <span class="inv-status-pill" style="color:#10b981;cursor:pointer;font-weight:700;">₹18,200 [Paid ✓]</span>
              </div>
              <div class="inv-row" style="display:flex;justify-content:space-between;align-items:center;color:#cbd5e1;padding:2px 0;border-bottom:1px solid rgba(255,255,255,0.04);">
                <span>#INV-0339 · Patel &amp; Associates</span>
                <span class="inv-status-pill" style="color:#f59e0b;cursor:pointer;font-weight:700;">₹31,800 [Pending ⏳]</span>
              </div>
            </div>
          </div>
        </div>
      `;

      const addRowBtn = document.getElementById('invoice-add-row-btn');
      if (addRowBtn) addRowBtn.addEventListener('click', () => this.addCustomInvoiceRow());

      this.bindInvoiceRowClick();
    } else if (subtabId === 'calc') {
      body.innerHTML = `
        <div style="max-width:260px;margin:0 auto;animation:fadeIn 0.2s ease;">
          <!-- LCD Display -->
          <div id="calc-lcd" style="background:#020617;border:1px solid rgba(245,158,11,0.4);border-radius:8px;padding:8px 12px;text-align:right;margin-bottom:8px;font-family:var(--font-mono);box-shadow:inset 0 2px 6px rgba(0,0,0,0.8);">
            <div id="calc-sub-display" style="font-size:0.6rem;color:#64748b;min-height:12px;"></div>
            <div id="calc-main-display" style="font-size:1.3rem;font-weight:800;color:#f59e0b;">0</div>
          </div>

          <!-- Calc Button Grid -->
          <div style="display:grid;grid-template-columns:repeat(4, 1fr);gap:5px;">
            <button class="calc-btn calc-btn-op" data-calc="C">C</button>
            <button class="calc-btn calc-btn-op" data-calc="sqrt">√</button>
            <button class="calc-btn calc-btn-op" data-calc="%">%</button>
            <button class="calc-btn calc-btn-op" data-calc="/">÷</button>

            <button class="calc-btn" data-calc="7">7</button>
            <button class="calc-btn" data-calc="8">8</button>
            <button class="calc-btn" data-calc="9">9</button>
            <button class="calc-btn calc-btn-op" data-calc="*">×</button>

            <button class="calc-btn" data-calc="4">4</button>
            <button class="calc-btn" data-calc="5">5</button>
            <button class="calc-btn" data-calc="6">6</button>
            <button class="calc-btn calc-btn-op" data-calc="-">-</button>

            <button class="calc-btn" data-calc="1">1</button>
            <button class="calc-btn" data-calc="2">2</button>
            <button class="calc-btn" data-calc="3">3</button>
            <button class="calc-btn calc-btn-op" data-calc="+">+</button>

            <button class="calc-btn" data-calc="0">0</button>
            <button class="calc-btn" data-calc=".">.</button>
            <button class="calc-btn calc-btn-op" data-calc="gst">GST 18%</button>
            <button class="calc-btn calc-btn-eq" data-calc="=">=</button>
          </div>
        </div>
      `;

      this.bindCalculator();
    } else if (subtabId === 'game') {
      body.innerHTML = `
        <div style="text-align:center;animation:fadeIn 0.2s ease;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;font-size:0.68rem;font-family:var(--font-mono);">
            <span style="color:#10b981;font-weight:700;"><i class="fa-solid fa-gamepad" style="margin-right:4px;"></i>NEON SPACE STRIKER 60 FPS</span>
            <span>Score: <strong id="game-score-val" style="color:#38bdf8;">0</strong> | Best: <strong id="game-best-val" style="color:#f59e0b;">${this.gameHighScore}</strong> | Shields: <span id="game-shields-val" style="color:#10b981;">❤❤❤</span></span>
          </div>

          <canvas id="desktop-game-canvas" width="400" height="150" style="width:100%;height:150px;background:#050510;border-radius:8px;border:1px solid rgba(16,185,129,0.35);box-shadow:0 0 25px rgba(16,185,129,0.18);margin-bottom:6px;cursor:crosshair;"></canvas>

          <div style="display:flex;justify-content:center;gap:6px;flex-wrap:wrap;">
            <button id="game-btn-left" style="padding:6px 12px;background:#1e293b;border:1px solid rgba(255,255,255,0.15);border-radius:6px;color:white;cursor:pointer;font-size:0.75rem;"><i class="fa-solid fa-arrow-left"></i> Left</button>
            <button id="game-btn-fire" style="padding:6px 16px;background:linear-gradient(135deg,#ef4444,#dc2626);border:none;border-radius:6px;color:white;font-weight:800;cursor:pointer;font-size:0.75rem;box-shadow:0 0 12px rgba(239,68,68,0.4);"><i class="fa-solid fa-bolt"></i> FIRE LASER</button>
            <button id="game-btn-right" style="padding:6px 12px;background:#1e293b;border:1px solid rgba(255,255,255,0.15);border-radius:6px;color:white;cursor:pointer;font-size:0.75rem;">Right <i class="fa-solid fa-arrow-right"></i></button>
            <button id="game-btn-start" style="padding:6px 14px;background:linear-gradient(135deg,#10b981,#059669);border:none;border-radius:6px;color:white;font-weight:700;cursor:pointer;font-size:0.75rem;">▶ Start / Reset</button>
          </div>
        </div>
      `;

      this.initMiniGame();
    } else if (subtabId === 'sqlite') {
      body.innerHTML = `
        <div style="animation:fadeIn 0.2s ease;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
            <span style="color:#a855f7;font-weight:700;"><i class="fa-solid fa-database" style="margin-right:4px;"></i>SQLITE DB QUERY RUNNER</span>
            <span style="color:#10b981;font-size:0.62rem;font-family:var(--font-mono);">Latency: 0.08ms</span>
          </div>

          <div style="display:flex;gap:4px;margin-bottom:8px;">
            <input type="text" id="sqlite-query-input" value="SELECT id, name, plan, mrr FROM enterprise_clients LIMIT 3;" style="flex:1;padding:6px 8px;background:#020617;border:1px solid rgba(168,85,247,0.4);border-radius:6px;color:#f8fafc;font-size:0.68rem;font-family:var(--font-mono);">
            <button id="sqlite-exec-btn" style="padding:6px 12px;background:#8b5cf6;border:none;border-radius:6px;color:white;font-weight:700;cursor:pointer;font-size:0.68rem;">Run SQL</button>
          </div>

          <div id="sqlite-output-table" style="background:#090d16;border-radius:6px;padding:6px;border:1px solid var(--border-subtle);font-size:0.62rem;line-height:1.6;">
            <div style="display:grid;grid-template-columns:30px 1.5fr 1fr 1fr;font-weight:700;color:#a855f7;border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:2px;">
              <span>ID</span><span>CLIENT NAME</span><span>TIER</span><span>MRR</span>
            </div>
            <div style="display:grid;grid-template-columns:30px 1.5fr 1fr 1fr;color:#cbd5e1;padding:2px 0;">
              <span>#1</span><span>Apex Digital Group</span><span>Enterprise</span><span style="color:#10b981;">₹1,45,000</span>
            </div>
            <div style="display:grid;grid-template-columns:30px 1.5fr 1fr 1fr;color:#cbd5e1;padding:2px 0;">
              <span>#2</span><span>Zenith Health Cloud</span><span>Healthcare Pro</span><span style="color:#10b981;">₹95,000</span>
            </div>
            <div style="display:grid;grid-template-columns:30px 1.5fr 1fr 1fr;color:#cbd5e1;padding:2px 0;">
              <span>#3</span><span>Vanguard FinTech</span><span>Compliance SLA</span><span style="color:#10b981;">₹2,10,000</span>
            </div>
          </div>
        </div>
      `;

      const execBtn = document.getElementById('sqlite-exec-btn');
      if (execBtn) {
        execBtn.addEventListener('click', () => {
          const out = document.getElementById('sqlite-output-table');
          if (out) {
            out.style.opacity = '0.4';
            setTimeout(() => {
              out.style.opacity = '1';
              const statusMsg = document.getElementById('desktop-status-msg');
              if (statusMsg) statusMsg.innerHTML = '<span style="color:#10b981;">✓ Query executed: 3 rows returned in 0.08ms</span>';
            }, 180);
          }
        });
      }
    } else if (subtabId === 'sysmon') {
      body.innerHTML = `
        <div style="animation:fadeIn 0.2s ease;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
            <span style="color:#38bdf8;font-weight:700;"><i class="fa-solid fa-chart-pie" style="margin-right:4px;"></i>RUNTIME BENCHMARK: TAURI (RUST) VS ELECTRON</span>
            <span style="color:#10b981;font-size:0.62rem;font-family:var(--font-mono);">92% Less RAM</span>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px;">
            <!-- Tauri Rust Card -->
            <div style="background:rgba(16,185,129,0.06);border:1px solid rgba(16,185,129,0.3);border-radius:6px;padding:8px;">
              <div style="display:flex;justify-content:space-between;font-weight:700;color:#10b981;font-size:0.75rem;margin-bottom:4px;">
                <span>🦀 Tauri v2 (Rust)</span>
                <span>38 MB</span>
              </div>
              <div style="background:rgba(255,255,255,0.05);border-radius:3px;height:6px;overflow:hidden;margin-bottom:4px;">
                <div style="width:12%;height:100%;background:#10b981;"></div>
              </div>
              <div style="display:flex;justify-content:space-between;font-size:0.6rem;color:#94a3b8;">
                <span>CPU: 0.4%</span>
                <span>Binary: 4.8 MB</span>
              </div>
            </div>

            <!-- Electron Card -->
            <div style="background:rgba(244,63,94,0.06);border:1px solid rgba(244,63,94,0.25);border-radius:6px;padding:8px;">
              <div style="display:flex;justify-content:space-between;font-weight:700;color:#f43f5e;font-size:0.75rem;margin-bottom:4px;">
                <span>⚛️ Standard Electron</span>
                <span>480 MB</span>
              </div>
              <div style="background:rgba(255,255,255,0.05);border-radius:3px;height:6px;overflow:hidden;margin-bottom:4px;">
                <div style="width:88%;height:100%;background:#f43f5e;"></div>
              </div>
              <div style="display:flex;justify-content:space-between;font-size:0.6rem;color:#94a3b8;">
                <span>CPU: 6.8%</span>
                <span>Binary: 92 MB</span>
              </div>
            </div>
          </div>

          <div style="background:#090d16;border-radius:6px;padding:6px 10px;border:1px solid var(--border-subtle);font-size:0.65rem;color:#cbd5e1;">
            <div><i class="fa-solid fa-circle-check" style="color:#10b981;margin-right:6px;"></i><strong>PixelToCloud Standard:</strong> We engineer native desktop apps in Tauri / Rust for ultra-low latency, instant 0.1s startup time, and zero bloat.</div>
          </div>
        </div>
      `;
    }
  }

  addCustomInvoiceRow() {
    const list = document.getElementById('desktop-invoice-list');
    const metric = document.getElementById('desktop-metric-invoices');
    if (!list) return;
    const invNum = 342 + Math.floor(Math.random() * 200);
    const clients = ['Quantum Systems', 'Aero Dynamics', 'Prism FinTech', 'Vertex Labs', 'Hyperion Cloud'];
    const client = clients[Math.floor(Math.random() * clients.length)];
    const amt = (Math.floor(Math.random() * 45) + 15) * 1000;

    const row = document.createElement('div');
    row.className = 'inv-row';
    row.style.cssText = 'display:flex;justify-content:space-between;align-items:center;color:#cbd5e1;padding:2px 0;border-bottom:1px solid rgba(255,255,255,0.04);animation:fadeIn 0.25s ease;';
    row.innerHTML = `
      <span>#INV-0${invNum} · ${client}</span>
      <span class="inv-status-pill" style="color:#10b981;cursor:pointer;font-weight:700;">₹${amt.toLocaleString('en-IN')} [Paid ✓]</span>
    `;
    list.insertBefore(row, list.firstChild);
    if (metric) metric.textContent = parseInt(metric.textContent) + 1;
    this.bindInvoiceRowClick();
  }

  bindInvoiceRowClick() {
    document.querySelectorAll('.inv-status-pill').forEach(pill => {
      pill.onclick = () => {
        if (pill.textContent.includes('Paid')) {
          pill.textContent = pill.textContent.replace('Paid ✓', 'Pending ⏳');
          pill.style.color = '#f59e0b';
        } else if (pill.textContent.includes('Pending')) {
          pill.textContent = pill.textContent.replace('Pending ⏳', 'Overdue ⚠️');
          pill.style.color = '#ef4444';
        } else {
          pill.textContent = pill.textContent.replace('Overdue ⚠️', 'Paid ✓');
          pill.style.color = '#10b981';
        }
      };
    });
  }

  bindCalculator() {
    const mainDisp = document.getElementById('calc-main-display');
    const subDisp = document.getElementById('calc-sub-display');
    let curVal = '0';
    let prevVal = null;
    let operation = null;
    let resetOnNext = false;

    document.querySelectorAll('.calc-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const val = btn.getAttribute('data-calc');

        if (!isNaN(val) || val === '.') {
          if (resetOnNext || curVal === '0') {
            curVal = (val === '.') ? '0.' : val;
            resetOnNext = false;
          } else {
            if (val === '.' && curVal.includes('.')) return;
            curVal += val;
          }
          if (mainDisp) mainDisp.textContent = curVal;
        } else if (val === 'C') {
          curVal = '0';
          prevVal = null;
          operation = null;
          if (mainDisp) mainDisp.textContent = '0';
          if (subDisp) subDisp.textContent = '';
        } else if (val === 'sqrt') {
          const num = parseFloat(curVal);
          curVal = (num >= 0 ? Math.sqrt(num).toFixed(4) : 'Error').replace(/\.?0+$/, '');
          if (mainDisp) mainDisp.textContent = curVal;
        } else if (val === '%') {
          curVal = (parseFloat(curVal) / 100).toString();
          if (mainDisp) mainDisp.textContent = curVal;
        } else if (val === 'gst') {
          curVal = (parseFloat(curVal) * 1.18).toFixed(2);
          if (subDisp) subDisp.textContent = '+ 18% GST';
          if (mainDisp) mainDisp.textContent = curVal;
        } else if (['+', '-', '*', '/'].includes(val)) {
          prevVal = parseFloat(curVal);
          operation = val;
          resetOnNext = true;
          if (subDisp) subDisp.textContent = `${prevVal} ${val}`;
        } else if (val === '=') {
          if (operation && prevVal !== null) {
            const current = parseFloat(curVal);
            let result = 0;
            if (operation === '+') result = prevVal + current;
            else if (operation === '-') result = prevVal - current;
            else if (operation === '*') result = prevVal * current;
            else if (operation === '/') result = current !== 0 ? (prevVal / current) : 'Error';

            if (subDisp) subDisp.textContent = `${prevVal} ${operation} ${current} =`;
            curVal = (typeof result === 'number') ? parseFloat(result.toFixed(6)).toString() : result;
            if (mainDisp) mainDisp.textContent = curVal;
            operation = null;
            prevVal = null;
            resetOnNext = true;
          }
        }
      });
    });
  }

  initMiniGame() {
    const canvas = document.getElementById('desktop-game-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    let playerX = w / 2;
    let playerY = h - 22;
    let lasers = [];
    let enemies = [];
    let particles = [];
    let score = 0;
    let shields = 3;
    let combo = 0;
    let gameLoop = null;

    const spawnEnemy = () => {
      enemies.push({
        x: Math.random() * (w - 30) + 15,
        y: -10,
        speed: Math.random() * 1.8 + 1.2,
        radius: Math.random() * 6 + 6,
        type: Math.random() > 0.6 ? 'drone' : 'asteroid',
        color: Math.random() > 0.6 ? '#a855f7' : '#f43f5e'
      });
    };

    const fireLaser = () => {
      if (!this.gameRunning) return;
      lasers.push({ x: playerX, y: playerY - 12, speed: 6 });
    };

    const createExplosion = (x, y, color) => {
      for (let p = 0; p < 10; p++) {
        particles.push({
          x: x,
          y: y,
          vx: (Math.random() - 0.5) * 5,
          vy: (Math.random() - 0.5) * 5,
          life: 1,
          color: color
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // Neon Grid Starfield
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      for (let s = 0; s < 25; s++) {
        ctx.fillRect((s * 37) % w, (s * 23 + score * 2) % h, 1.5, 1.5);
      }

      // Update & Draw Particles
      for (let pIdx = particles.length - 1; pIdx >= 0; pIdx--) {
        const pt = particles[pIdx];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.life -= 0.04;
        if (pt.life <= 0) {
          particles.splice(pIdx, 1);
        } else {
          ctx.fillStyle = pt.color;
          ctx.globalAlpha = pt.life;
          ctx.fillRect(pt.x, pt.y, 2.5, 2.5);
          ctx.globalAlpha = 1;
        }
      }

      // Update & Draw Lasers
      ctx.fillStyle = '#00f0ff';
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 8;
      for (let lIdx = lasers.length - 1; lIdx >= 0; lIdx--) {
        const l = lasers[lIdx];
        l.y -= l.speed;
        ctx.fillRect(l.x - 1.5, l.y, 3, 10);

        if (l.y < -10) lasers.splice(lIdx, 1);
      }
      ctx.shadowBlur = 0;

      // Draw Player Spaceship
      ctx.fillStyle = '#00f0ff';
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.moveTo(playerX, playerY - 10);
      ctx.lineTo(playerX - 10, playerY + 8);
      ctx.lineTo(playerX, playerY + 4);
      ctx.lineTo(playerX + 10, playerY + 8);
      ctx.closePath();
      ctx.fill();

      // Spaceship Thruster Flame
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.moveTo(playerX - 4, playerY + 8);
      ctx.lineTo(playerX + 4, playerY + 8);
      ctx.lineTo(playerX, playerY + 14 + Math.random() * 4);
      ctx.closePath();
      ctx.fill();
      ctx.shadowBlur = 0;

      // Update & Draw Enemies
      for (let eIdx = enemies.length - 1; eIdx >= 0; eIdx--) {
        const en = enemies[eIdx];
        en.y += en.speed;

        ctx.fillStyle = en.color;
        ctx.shadowColor = en.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(en.x, en.y, en.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Laser vs Enemy Collision
        for (let lIdx = lasers.length - 1; lIdx >= 0; lIdx--) {
          const l = lasers[lIdx];
          const dist = Math.hypot(l.x - en.x, l.y - en.y);
          if (dist < en.radius + 4) {
            createExplosion(en.x, en.y, en.color);
            enemies.splice(eIdx, 1);
            lasers.splice(lIdx, 1);
            combo++;
            score += 20 * Math.min(5, combo);
            const scoreEl = document.getElementById('game-score-val');
            if (scoreEl) scoreEl.textContent = score;
            if (score > this.gameHighScore) {
              this.gameHighScore = score;
              const bestEl = document.getElementById('game-best-val');
              if (bestEl) bestEl.textContent = this.gameHighScore;
            }
            break;
          }
        }

        // Player vs Enemy Collision
        const pDist = Math.hypot(playerX - en.x, playerY - en.y);
        if (pDist < en.radius + 8) {
          createExplosion(en.x, en.y, '#ef4444');
          enemies.splice(eIdx, 1);
          shields--;
          combo = 0;
          const shieldEl = document.getElementById('game-shields-val');
          if (shieldEl) {
            shieldEl.textContent = shields === 3 ? '❤❤❤' : (shields === 2 ? '❤❤' : (shields === 1 ? '❤' : '💀'));
          }

          if (shields <= 0) {
            this.gameRunning = false;
            clearInterval(gameLoop);
            ctx.fillStyle = '#ef4444';
            ctx.font = 'bold 13px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('💥 SHIELDS DEPLETED! GAME OVER', w/2, h/2);
            return;
          }
        }

        if (en.y > h + 10) {
          enemies.splice(eIdx, 1);
          combo = 0;
        }
      }

      if (Math.random() < 0.07) spawnEnemy();
    };

    const startBtn = document.getElementById('game-btn-start');
    if (startBtn) {
      startBtn.onclick = () => {
        if (gameLoop) clearInterval(gameLoop);
        enemies = [];
        lasers = [];
        particles = [];
        score = 0;
        shields = 3;
        combo = 0;
        playerX = w / 2;
        this.gameRunning = true;
        const shieldEl = document.getElementById('game-shields-val');
        if (shieldEl) shieldEl.textContent = '❤❤❤';
        const scoreEl = document.getElementById('game-score-val');
        if (scoreEl) scoreEl.textContent = '0';
        gameLoop = setInterval(draw, 1000 / 60);
      };
    }

    const fireBtn = document.getElementById('game-btn-fire');
    if (fireBtn) fireBtn.onclick = fireLaser;

    const leftBtn = document.getElementById('game-btn-left');
    const rightBtn = document.getElementById('game-btn-right');
    if (leftBtn) leftBtn.onclick = () => playerX = Math.max(15, playerX - 25);
    if (rightBtn) rightBtn.onclick = () => playerX = Math.min(w - 15, playerX + 25);

    window.onkeydown = (e) => {
      if (this.gameRunning) {
        if (e.key === 'ArrowLeft' || e.key === 'a') playerX = Math.max(15, playerX - 20);
        if (e.key === 'ArrowRight' || e.key === 'd') playerX = Math.min(w - 15, playerX + 20);
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          fireLaser();
        }
      }
    };

    // Initial draw
    draw();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.servicesHubInstance = new AdvancedServicesHub();
});
