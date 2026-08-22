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
  // TAB NAVIGATION
  // =================================================================
  bindNavigationTabs() {
    this.tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-service-tab');
        if (target && target !== this.currentTab) {
          this.switchTab(target);
        }
      });
    });
  }

  switchTab(tabId) {
    this.currentTab = tabId;

    this.tabs.forEach(tab => {
      if (tab.getAttribute('data-service-tab') === tabId) {
        tab.classList.add('active');
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

  // =================================================================
  // 8. MOBILE APP DEVELOPMENT LAB
  // =================================================================
  initMobileLab() {
    // Platform toggle (Android / iOS)
    document.querySelectorAll('.mobile-platform-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.mobile-platform-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const platform = btn.getAttribute('data-platform');
        const frame = document.getElementById('mobile-phone-frame');
        const timeDisplay = document.getElementById('mobile-time-display');
        if (platform === 'ios') {
          if (frame) frame.style.borderColor = 'rgba(255,255,255,0.3)';
          if (frame) frame.style.borderRadius = '36px';
          if (timeDisplay) timeDisplay.textContent = '9:41 AM';
        } else {
          if (frame) frame.style.borderColor = 'rgba(59, 130, 246, 0.4)';
          if (frame) frame.style.borderRadius = '28px';
          if (timeDisplay) timeDisplay.textContent = '09:41';
        }
      });
    });

    // Bottom nav screen switching
    document.querySelectorAll('.mobile-bottom-nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.mobile-bottom-nav-btn').forEach(b => {
          b.classList.remove('active-nav');
          b.style.color = '#64748b';
        });
        btn.classList.add('active-nav');
        btn.style.color = '#3b82f6';
        const screen = btn.getAttribute('data-screen');
        this.showMobileScreen(screen);
      });
    });

    // Mini card taps
    document.querySelectorAll('.mobile-mini-card').forEach(card => {
      card.addEventListener('click', () => {
        const screen = card.getAttribute('data-screen');
        this.showMobileScreen(screen);
      });
    });

    // Push notification button
    const pushBtn = document.getElementById('mobile-push-btn');
    if (pushBtn) {
      pushBtn.addEventListener('click', () => {
        const appScreen = document.getElementById('mobile-app-screen');
        if (!appScreen) return;
        const notification = document.createElement('div');
        notification.style.cssText = 'position:absolute;top:0;left:0;right:0;background:rgba(59,130,246,0.95);color:white;padding:10px 14px;font-size:0.72rem;font-family:var(--font-sans);display:flex;align-items:center;gap:8px;z-index:10;animation:slideDown 0.3s ease;backdrop-filter:blur(10px);border-bottom:1px solid rgba(255,255,255,0.2);';
        notification.innerHTML = '<i class="fa-solid fa-bell" style="font-size:0.9rem;"></i><div><strong>New Order #1248</strong><br><span style="font-size:0.65rem;opacity:0.85;">Sharma Enterprises placed ₹24,500 order</span></div>';
        appScreen.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
      });
    }

    // GPS tracking button
    const gpsBtn = document.getElementById('mobile-gps-btn');
    if (gpsBtn) {
      gpsBtn.addEventListener('click', () => {
        const appScreen = document.getElementById('mobile-app-screen');
        if (!appScreen) return;
        const gpsOverlay = document.createElement('div');
        gpsOverlay.style.cssText = 'position:absolute;top:0;left:0;right:0;bottom:0;background:rgba(16,185,129,0.1);display:flex;align-items:center;justify-content:center;z-index:10;animation:fadeIn 0.3s ease;';
        gpsOverlay.innerHTML = '<div style="text-align:center;"><i class="fa-solid fa-location-crosshairs" style="font-size:2rem;color:#10b981;animation:pulse 1s infinite;"></i><div style="margin-top:8px;font-size:0.75rem;color:#10b981;font-family:var(--font-sans);font-weight:700;">Tracking Live Location</div><div style="font-size:0.65rem;color:#64748b;margin-top:2px;">28.6139°N, 77.2090°E</div></div>';
        appScreen.appendChild(gpsOverlay);
        setTimeout(() => gpsOverlay.remove(), 2500);
      });
    }
  }

  showMobileScreen(screenId) {
    const appScreen = document.getElementById('mobile-app-screen');
    if (!appScreen) return;

    const screens = {
      home: `<div id="mobile-screen-home" class="mobile-screen active-screen">
        <div style="text-align:center;margin-bottom:16px;">
          <div style="width:50px;height:50px;border-radius:14px;background:linear-gradient(135deg,#3b82f6,#8b5cf6);margin:0 auto 8px;display:flex;align-items:center;justify-content:center;font-size:1.3rem;color:white;box-shadow:0 4px 15px rgba(59,130,246,0.4);"><i class="fa-solid fa-store"></i></div>
          <div style="font-size:0.85rem;font-weight:700;color:#f8fafc;font-family:var(--font-sans);">ShopPulse</div>
          <div style="font-size:0.65rem;color:#64748b;margin-top:2px;">v2.4.1 · React Native</div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
          <div class="mobile-mini-card" data-screen="orders" style="background:rgba(59,130,246,0.1);border:1px solid rgba(59,130,246,0.25);border-radius:12px;padding:12px 10px;text-align:center;cursor:pointer;"><i class="fa-solid fa-box" style="color:#3b82f6;font-size:1.1rem;margin-bottom:4px;display:block;"></i><span style="font-size:0.7rem;color:#cbd5e1;">Orders</span><div style="font-size:1rem;font-weight:800;color:#3b82f6;">1,247</div></div>
          <div class="mobile-mini-card" data-screen="analytics" style="background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.25);border-radius:12px;padding:12px 10px;text-align:center;cursor:pointer;"><i class="fa-solid fa-chart-line" style="color:#10b981;font-size:1.1rem;margin-bottom:4px;display:block;"></i><span style="font-size:0.7rem;color:#cbd5e1;">Revenue</span><div style="font-size:1rem;font-weight:800;color:#10b981;">₹4.2L</div></div>
          <div class="mobile-mini-card" data-screen="notifications" style="background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.25);border-radius:12px;padding:12px 10px;text-align:center;cursor:pointer;"><i class="fa-solid fa-bell" style="color:#f59e0b;font-size:1.1rem;margin-bottom:4px;display:block;"></i><span style="font-size:0.7rem;color:#cbd5e1;">Alerts</span><div style="font-size:1rem;font-weight:800;color:#f59e0b;">18</div></div>
          <div class="mobile-mini-card" data-screen="profile" style="background:rgba(139,92,246,0.1);border:1px solid rgba(139,92,246,0.25);border-radius:12px;padding:12px 10px;text-align:center;cursor:pointer;"><i class="fa-solid fa-fingerprint" style="color:#8b5cf6;font-size:1.1rem;margin-bottom:4px;display:block;"></i><span style="font-size:0.7rem;color:#cbd5e1;">Biometric</span><div style="font-size:0.72rem;font-weight:700;color:#8b5cf6;">Enabled</div></div>
        </div>
      </div>`,
      orders: `<div style="animation:fadeIn 0.3s ease;"><div style="font-size:0.9rem;font-weight:700;color:#f8fafc;font-family:var(--font-sans);margin-bottom:12px;"><i class="fa-solid fa-box" style="color:#3b82f6;margin-right:6px;"></i>Live Orders</div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <div style="background:rgba(59,130,246,0.08);border:1px solid rgba(59,130,246,0.2);border-radius:10px;padding:10px;"><div style="display:flex;justify-content:space-between;font-size:0.72rem;"><span style="color:#f8fafc;font-weight:600;">#ORD-1247</span><span style="color:#10b981;font-size:0.65rem;">Delivered ✓</span></div><div style="font-size:0.65rem;color:#64748b;margin-top:2px;">Sharma Enterprises · ₹24,500</div></div>
          <div style="background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.2);border-radius:10px;padding:10px;"><div style="display:flex;justify-content:space-between;font-size:0.72rem;"><span style="color:#f8fafc;font-weight:600;">#ORD-1246</span><span style="color:#f59e0b;font-size:0.65rem;">In Transit 🚚</span></div><div style="font-size:0.65rem;color:#64748b;margin-top:2px;">CloudNova Pvt Ltd · ₹18,200</div></div>
          <div style="background:rgba(139,92,246,0.08);border:1px solid rgba(139,92,246,0.2);border-radius:10px;padding:10px;"><div style="display:flex;justify-content:space-between;font-size:0.72rem;"><span style="color:#f8fafc;font-weight:600;">#ORD-1245</span><span style="color:#8b5cf6;font-size:0.65rem;">Processing ⏳</span></div><div style="font-size:0.65rem;color:#64748b;margin-top:2px;">Patel & Associates · ₹31,800</div></div>
        </div></div>`,
      analytics: `<div style="animation:fadeIn 0.3s ease;"><div style="font-size:0.9rem;font-weight:700;color:#f8fafc;font-family:var(--font-sans);margin-bottom:12px;"><i class="fa-solid fa-chart-line" style="color:#10b981;margin-right:6px;"></i>Revenue Analytics</div>
        <div style="background:rgba(16,185,129,0.06);border:1px solid rgba(16,185,129,0.2);border-radius:10px;padding:14px;margin-bottom:10px;text-align:center;"><div style="font-size:1.6rem;font-weight:800;color:#10b981;font-family:var(--font-sans);">₹4,21,580</div><div style="font-size:0.65rem;color:#64748b;margin-top:2px;">This Month Revenue · <span style="color:#10b981;">↑ 23.4%</span></div></div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
          <div style="background:rgba(59,130,246,0.06);border:1px solid rgba(59,130,246,0.15);border-radius:8px;padding:10px;text-align:center;"><div style="font-size:0.95rem;font-weight:700;color:#3b82f6;">847</div><div style="font-size:0.6rem;color:#64748b;">Total Users</div></div>
          <div style="background:rgba(245,158,11,0.06);border:1px solid rgba(245,158,11,0.15);border-radius:8px;padding:10px;text-align:center;"><div style="font-size:0.95rem;font-weight:700;color:#f59e0b;">4.8★</div><div style="font-size:0.6rem;color:#64748b;">App Rating</div></div>
        </div></div>`,
      notifications: `<div style="animation:fadeIn 0.3s ease;"><div style="font-size:0.9rem;font-weight:700;color:#f8fafc;font-family:var(--font-sans);margin-bottom:12px;"><i class="fa-solid fa-bell" style="color:#f59e0b;margin-right:6px;"></i>Notifications</div>
        <div style="display:flex;flex-direction:column;gap:6px;">
          <div style="background:rgba(245,158,11,0.08);border-left:3px solid #f59e0b;padding:8px 10px;border-radius:0 8px 8px 0;"><div style="font-size:0.72rem;color:#f8fafc;font-weight:600;">New order received</div><div style="font-size:0.6rem;color:#64748b;">2 min ago · Order #1248</div></div>
          <div style="background:rgba(16,185,129,0.08);border-left:3px solid #10b981;padding:8px 10px;border-radius:0 8px 8px 0;"><div style="font-size:0.72rem;color:#f8fafc;font-weight:600;">Payment confirmed</div><div style="font-size:0.6rem;color:#64748b;">15 min ago · ₹24,500</div></div>
          <div style="background:rgba(59,130,246,0.08);border-left:3px solid #3b82f6;padding:8px 10px;border-radius:0 8px 8px 0;"><div style="font-size:0.72rem;color:#f8fafc;font-weight:600;">App update available</div><div style="font-size:0.6rem;color:#64748b;">1 hour ago · v2.4.2</div></div>
          <div style="background:rgba(139,92,246,0.08);border-left:3px solid #8b5cf6;padding:8px 10px;border-radius:0 8px 8px 0;"><div style="font-size:0.72rem;color:#f8fafc;font-weight:600;">Weekly report ready</div><div style="font-size:0.6rem;color:#64748b;">3 hours ago</div></div>
        </div></div>`,
      profile: `<div style="animation:fadeIn 0.3s ease;text-align:center;">
        <div style="width:60px;height:60px;border-radius:50%;background:linear-gradient(135deg,#8b5cf6,#3b82f6);margin:10px auto;display:flex;align-items:center;justify-content:center;font-size:1.5rem;color:white;box-shadow:0 4px 20px rgba(139,92,246,0.4);"><i class="fa-solid fa-user"></i></div>
        <div style="font-size:0.9rem;font-weight:700;color:#f8fafc;font-family:var(--font-sans);">Admin User</div>
        <div style="font-size:0.65rem;color:#64748b;margin-top:2px;">admin@shoppulse.app</div>
        <div style="display:flex;flex-direction:column;gap:8px;margin-top:16px;text-align:left;">
          <div style="display:flex;align-items:center;gap:10px;padding:8px 12px;background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.2);border-radius:10px;"><i class="fa-solid fa-fingerprint" style="color:#10b981;"></i><div><div style="font-size:0.72rem;color:#f8fafc;font-weight:600;">Biometric Auth</div><div style="font-size:0.6rem;color:#10b981;">Face ID + Fingerprint Active</div></div></div>
          <div style="display:flex;align-items:center;gap:10px;padding:8px 12px;background:rgba(59,130,246,0.08);border:1px solid rgba(59,130,246,0.2);border-radius:10px;"><i class="fa-solid fa-cloud-arrow-up" style="color:#3b82f6;"></i><div><div style="font-size:0.72rem;color:#f8fafc;font-weight:600;">Cloud Sync</div><div style="font-size:0.6rem;color:#3b82f6;">Last synced 12s ago</div></div></div>
        </div></div>`
    };

    const html = screens[screenId] || screens.home;
    appScreen.style.opacity = '0';
    setTimeout(() => {
      appScreen.innerHTML = html;
      appScreen.style.opacity = '1';
      appScreen.style.transition = 'opacity 0.25s ease';
      // Re-bind mini card taps
      appScreen.querySelectorAll('.mobile-mini-card').forEach(card => {
        card.addEventListener('click', () => this.showMobileScreen(card.getAttribute('data-screen')));
      });
    }, 150);
  }

  // =================================================================
  // 9. AI & MACHINE LEARNING LAB
  // =================================================================
  initAILab() {
    // Sentiment Analysis
    const analyzeBtn = document.getElementById('ai-analyze-btn');
    const sentimentInput = document.getElementById('ai-sentiment-input');
    const sentimentResult = document.getElementById('ai-sentiment-result');

    const analyzeSentiment = () => {
      if (!sentimentInput || !sentimentResult) return;
      const text = sentimentInput.value.trim();
      if (!text) return;

      const positiveWords = ['good','great','love','amazing','excellent','happy','wonderful','fantastic','awesome','best','beautiful','nice','perfect','thank','brilliant','superb','outstanding'];
      const negativeWords = ['bad','terrible','hate','awful','worst','horrible','ugly','poor','slow','broken','fail','error','crash','annoying','useless','disappointing','waste'];

      const words = text.toLowerCase().split(/\s+/);
      let posCount = 0, negCount = 0;
      words.forEach(w => {
        if (positiveWords.some(p => w.includes(p))) posCount++;
        if (negativeWords.some(n => w.includes(n))) negCount++;
      });

      let sentiment, emoji, color, confidence;
      if (posCount > negCount) {
        sentiment = 'POSITIVE'; emoji = '😊'; color = '#10b981';
        confidence = Math.min(95, 60 + posCount * 12);
      } else if (negCount > posCount) {
        sentiment = 'NEGATIVE'; emoji = '😞'; color = '#ef4444';
        confidence = Math.min(95, 60 + negCount * 12);
      } else {
        sentiment = 'NEUTRAL'; emoji = '😐'; color = '#f59e0b';
        confidence = 55 + Math.floor(Math.random() * 20);
      }

      sentimentResult.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="font-size:1.4rem;">${emoji}</span>
            <div>
              <div style="font-size:0.82rem;font-weight:700;color:${color};">${sentiment}</div>
              <div style="font-size:0.65rem;color:#64748b;">Confidence: ${confidence}%</div>
            </div>
          </div>
          <div style="width:60px;height:60px;border-radius:50%;border:3px solid ${color};display:flex;align-items:center;justify-content:center;">
            <span style="font-size:0.82rem;font-weight:800;color:${color};">${confidence}%</span>
          </div>
        </div>
        <div style="margin-top:8px;height:6px;background:rgba(255,255,255,0.08);border-radius:3px;overflow:hidden;">
          <div style="height:100%;width:${confidence}%;background:${color};border-radius:3px;transition:width 0.5s ease;"></div>
        </div>`;
    };

    if (analyzeBtn) analyzeBtn.addEventListener('click', analyzeSentiment);
    if (sentimentInput) sentimentInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') analyzeSentiment(); });

    // Train Model button
    const trainBtn = document.getElementById('ai-train-btn');
    if (trainBtn) {
      trainBtn.addEventListener('click', () => {
        const statusEl = document.getElementById('ai-model-status');
        if (statusEl) {
          statusEl.textContent = 'TRAINING...';
          statusEl.style.color = '#f59e0b';
          statusEl.style.borderColor = 'rgba(245,158,11,0.3)';
          statusEl.style.background = 'rgba(245,158,11,0.1)';
        }
        let epoch = 0;
        const maxEpochs = 10;
        const interval = setInterval(() => {
          epoch++;
          const loss = (1.0 - epoch / maxEpochs * 0.85).toFixed(4);
          const acc = (epoch / maxEpochs * 94.2 + Math.random() * 4).toFixed(1);
          if (sentimentResult) {
            sentimentResult.innerHTML = `<div style="font-size:0.72rem;color:#f59e0b;">
              <i class="fa-solid fa-dna" style="margin-right:4px;animation:pulse 0.5s infinite;"></i>Epoch ${epoch}/${maxEpochs} · Loss: ${loss} · Accuracy: ${acc}%
              <div style="margin-top:6px;height:6px;background:rgba(255,255,255,0.08);border-radius:3px;overflow:hidden;"><div style="height:100%;width:${epoch/maxEpochs*100}%;background:linear-gradient(90deg,#f59e0b,#10b981);border-radius:3px;transition:width 0.3s;"></div></div>
            </div>`;
          }
          if (epoch >= maxEpochs) {
            clearInterval(interval);
            if (statusEl) {
              statusEl.textContent = 'MODEL READY';
              statusEl.style.color = '#10b981';
              statusEl.style.borderColor = 'rgba(16,185,129,0.3)';
              statusEl.style.background = 'rgba(16,185,129,0.1)';
            }
            if (sentimentResult) {
              sentimentResult.innerHTML = `<div style="color:#10b981;font-size:0.75rem;"><i class="fa-solid fa-check-circle" style="margin-right:4px;"></i>Training complete! Model accuracy: 97.8% · Ready for inference.</div>`;
            }
          }
        }, 400);
      });
    }

    // Predict button
    const predictBtn = document.getElementById('ai-predict-btn');
    if (predictBtn) {
      predictBtn.addEventListener('click', () => {
        const predictions = [
          { label: 'Customer Churn', prob: '12.4%', color: '#ef4444', icon: 'fa-user-minus' },
          { label: 'Revenue Growth', prob: '87.6%', color: '#10b981', icon: 'fa-chart-line' },
          { label: 'Peak Traffic Hour', prob: '2:00 PM', color: '#3b82f6', icon: 'fa-clock' },
          { label: 'Best Product', prob: 'Widget Pro', color: '#8b5cf6', icon: 'fa-star' }
        ];
        if (sentimentResult) {
          sentimentResult.innerHTML = `<div style="font-size:0.7rem;color:#8b5cf6;margin-bottom:6px;font-weight:700;"><i class="fa-solid fa-wand-magic-sparkles" style="margin-right:4px;"></i>PREDICTION RESULTS</div>` +
            predictions.map(p => `<div style="display:flex;justify-content:space-between;align-items:center;padding:4px 0;border-bottom:1px solid rgba(255,255,255,0.04);font-size:0.7rem;"><span style="color:#94a3b8;"><i class="fa-solid ${p.icon}" style="color:${p.color};margin-right:6px;width:14px;"></i>${p.label}</span><span style="color:${p.color};font-weight:700;">${p.prob}</span></div>`).join('');
        }
      });
    }
  }

  // Neural Network Canvas Renderer
  renderNeuralNetwork(time) {
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
          ctx.strokeStyle = `rgba(139, 92, 246, ${strength * 0.35})`;
          ctx.lineWidth = strength * 1.5;
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
        ctx.shadowBlur = node.activation * 12;
        ctx.fill();
        ctx.shadowBlur = 0;
      });
    });

    // Layer labels
    ctx.font = '9px monospace';
    ctx.fillStyle = '#475569';
    ctx.textAlign = 'center';
    const labels = ['Input', 'Hidden 1', 'Hidden 2', 'Output'];
    layerX.forEach((x, i) => ctx.fillText(labels[i], x, h - 5));
  }

  // =================================================================
  // 10. DESKTOP SOFTWARE LAB
  // =================================================================
  initDesktopLab() {
    // OS toggle
    const osLabels = { windows: 'Windows 11', macos: 'macOS Sonoma', linux: 'Ubuntu 24.04 LTS' };
    document.querySelectorAll('.desktop-os-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.desktop-os-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const os = btn.getAttribute('data-os');
        const osLabel = document.getElementById('desktop-os-label');
        if (osLabel) osLabel.textContent = osLabels[os] || 'Windows 11';

        // Adjust window chrome style
        const titleBar = document.getElementById('desktop-title-bar');
        const frame = document.getElementById('desktop-window-frame');
        if (os === 'macos') {
          if (frame) frame.style.borderColor = 'rgba(255,255,255,0.15)';
          if (frame) frame.style.borderRadius = '12px';
        } else if (os === 'linux') {
          if (frame) frame.style.borderColor = 'rgba(16,185,129,0.3)';
          if (frame) frame.style.borderRadius = '8px';
        } else {
          if (frame) frame.style.borderColor = 'rgba(245,158,11,0.3)';
          if (frame) frame.style.borderRadius = '10px';
        }
      });
    });

    // New Invoice button
    const newInvBtn = document.getElementById('desktop-new-invoice-btn');
    if (newInvBtn) {
      newInvBtn.addEventListener('click', () => {
        const invList = document.getElementById('desktop-invoice-list');
        const invMetric = document.getElementById('desktop-metric-invoices');
        if (!invList) return;
        const invNum = 342 + Math.floor(Math.random() * 100);
        const clients = ['TechVista Corp', 'Aurora Digital', 'Nexgen Systems', 'Prism Analytics', 'Quantum Labs'];
        const client = clients[Math.floor(Math.random() * clients.length)];
        const amount = (Math.floor(Math.random() * 50) + 10) * 1000;
        const newRow = document.createElement('div');
        newRow.style.cssText = 'display:flex;justify-content:space-between;color:#cbd5e1;animation:fadeIn 0.3s ease;';
        newRow.innerHTML = `<span>#INV-0${invNum} · ${client}</span><span style="color:#8b5cf6;">₹${amount.toLocaleString('en-IN')} ★</span>`;
        invList.insertBefore(newRow, invList.firstChild);
        if (invMetric) invMetric.textContent = parseInt(invMetric.textContent) + 1;
        // Animate CPU spike
        const cpuMem = document.getElementById('desktop-cpu-mem');
        if (cpuMem) {
          cpuMem.textContent = `CPU: ${(2 + Math.random() * 8).toFixed(1)}% · RAM: ${48 + Math.floor(Math.random() * 20)} MB`;
          setTimeout(() => cpuMem.textContent = `CPU: ${(1 + Math.random() * 3).toFixed(1)}% · RAM: 48 MB`, 2000);
        }
      });
    }

    // Print PDF button
    const exportBtn = document.getElementById('desktop-export-btn');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        const statusBar = document.getElementById('desktop-status-bar');
        if (statusBar) {
          const origHTML = statusBar.innerHTML;
          statusBar.querySelector('span').textContent = '⏳ Generating PDF...';
          statusBar.querySelector('span').style.color = '#f59e0b';
          setTimeout(() => {
            statusBar.querySelector('span').textContent = '✅ Invoice PDF exported successfully!';
            statusBar.querySelector('span').style.color = '#10b981';
            setTimeout(() => {
              statusBar.innerHTML = origHTML;
            }, 2000);
          }, 1500);
        }
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.servicesHubInstance = new AdvancedServicesHub();
});
