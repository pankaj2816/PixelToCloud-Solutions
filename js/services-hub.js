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
}

document.addEventListener('DOMContentLoaded', () => {
  window.servicesHubInstance = new AdvancedServicesHub();
});
