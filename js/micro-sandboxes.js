/* ===================================================================
   PIXELTOCLOUD SOLUTIONS - LIVE INTERACTIVE MICRO-SANDBOXES
   Real-time Doctor Telehealth ECG & CA FinTech Interactive Tax Engines
   =================================================================== */

class MicroSandboxesEngine {
  constructor() {
    this.initECGCanvas();
    this.initDoctorSandbox();
    this.initCASandbox();
  }

  // ==========================================
  // 1. DOCTOR TELEHEALTH & ECG SIMULATOR
  // ==========================================
  initECGCanvas() {
    const canvas = document.getElementById('sandbox-ecg-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let x = 0;
    let y = canvas.height / 2;
    const h = canvas.height;
    const w = canvas.width;
    let step = 0;

    const drawECG = () => {
      ctx.fillStyle = 'rgba(8, 11, 17, 0.08)';
      ctx.fillRect(0, 0, w, h);

      ctx.lineWidth = 2;
      ctx.strokeStyle = '#10b981';
      ctx.beginPath();
      ctx.moveTo(x, y);

      x += 2;
      step++;

      if (x > w) {
        x = 0;
        ctx.clearRect(0, 0, w, h);
      }

      // ECG wave pattern simulation
      const mod = step % 60;
      if (mod === 20) y = h / 2 - 8;
      else if (mod === 23) y = h / 2 + 10;
      else if (mod === 26) y = h / 2 - 35; // R peak
      else if (mod === 29) y = h / 2 + 20; // S wave
      else if (mod === 34) y = h / 2 - 6;  // T wave
      else y = h / 2;

      ctx.lineTo(x, y);
      ctx.shadowColor = '#10b981';
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.shadowBlur = 0;

      requestAnimationFrame(drawECG);
    };

    drawECG();
  }

  initDoctorSandbox() {
    const rxBtn = document.getElementById('sandbox-rx-download-btn');
    if (rxBtn) {
      rxBtn.addEventListener('click', () => {
        this.generateSamplePrescription();
      });
    }

    const videoBtn = document.getElementById('sandbox-video-toggle-btn');
    const videoPreview = document.getElementById('sandbox-video-preview');
    if (videoBtn && videoPreview) {
      videoBtn.addEventListener('click', () => {
        const isStreaming = videoPreview.classList.toggle('active-stream');
        videoBtn.innerHTML = isStreaming
          ? `<span><i class="fa-solid fa-video-slash" style="margin-right: 6px;"></i>End Encrypted Video Call</span>`
          : `<span><i class="fa-solid fa-video" style="margin-right: 6px;"></i>Start WebRTC Video Room Demo</span>`;
        
        if (window.App) {
          window.App.showToast(isStreaming ? 'WebRTC Encrypted Telehealth Room Connected (60 FPS)' : 'Call Ended');
        }
      });
    }
  }

  generateSamplePrescription() {
    const rxContent = `
=====================================================
   PIXELTOCLOUD TELEHEALTH MEDICAL SUITE
   CLINICAL ELECTRONIC HEALTH RECORD (EHR)
=====================================================
Date: ${new Date().toLocaleDateString()} | Time: ${new Date().toLocaleTimeString()}
Patient ID: PT-98241
Doctor: Dr. A. Sharma (MD, Cardiology)
Clinic: Metro Heart & Telehealth Institute
-----------------------------------------------------
DIAGNOSIS:
- Resting Heart Rate: 72 BPM (Sinus Rhythm)
- Blood Pressure: 120/80 mmHg (Normal)
- Tele-consultation Status: Verified & Encrypted

RX PRESCRIPTION:
1. Tab. CardioProtect 50mg - 1x Daily (Post-Breakfast)
2. Tab. VitalZinc Plus - 1x Daily (30 Days)

DIGITAL SIGNATURE:
Verified via 2048-bit RSA Encryption by PixelToCloud Telehealth Engine.
=====================================================
`;
    const blob = new Blob([rxContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `EHR-Prescription-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    if (window.App) {
      window.App.showToast('Sample Clinical Prescription Generated & Downloaded!');
    }
  }

  // ==========================================
  // 2. CA & FINTECH TAX LEDGER SIMULATOR
  // ==========================================
  initCASandbox() {
    const slider = document.getElementById('ca-sandbox-slider');
    const incomeDisplay = document.getElementById('ca-sandbox-income-val');
    const gstDisplay = document.getElementById('ca-sandbox-gst-val');
    const tdsDisplay = document.getElementById('ca-sandbox-tds-val');
    const savingsDisplay = document.getElementById('ca-sandbox-savings-val');
    const downloadVoucherBtn = document.getElementById('ca-sandbox-download-btn');

    if (!slider) return;

    const updateTax = () => {
      const income = parseInt(slider.value, 10);
      const gst = income * 0.18;
      const tds = income * 0.10;
      const optimizedSavings = income * 0.085; // 8.5% automated deductions savings

      if (incomeDisplay) incomeDisplay.textContent = '₹ ' + income.toLocaleString('en-IN');
      if (gstDisplay) gstDisplay.textContent = '₹ ' + Math.round(gst).toLocaleString('en-IN');
      if (tdsDisplay) tdsDisplay.textContent = '₹ ' + Math.round(tds).toLocaleString('en-IN');
      if (savingsDisplay) savingsDisplay.textContent = '₹ ' + Math.round(optimizedSavings).toLocaleString('en-IN');
    };

    slider.addEventListener('input', updateTax);
    updateTax();

    if (downloadVoucherBtn) {
      downloadVoucherBtn.addEventListener('click', () => {
        const income = parseInt(slider.value, 10);
        const voucher = `
=====================================================
   PIXELTOCLOUD CA & FINANCIAL TAX LEDGER
   AUTOMATED AUDIT & COMPLIANCE SUMMARY
=====================================================
Generated: ${new Date().toLocaleString()}
Financial Year: 2026-2027
-----------------------------------------------------
Gross Annual Turnover: ₹ ${income.toLocaleString('en-IN')}
GST Computed (18%): ₹ ${(income * 0.18).toLocaleString('en-IN')}
TDS Deductible (10%): ₹ ${(income * 0.10).toLocaleString('en-IN')}
Automated Tax Exemption Savings: ₹ ${(income * 0.085).toLocaleString('en-IN')}

Audit Trail: Hash SHA-256 Verified
Software: PixelToCloud CA Portal Hub
=====================================================
`;
        const blob = new Blob([voucher], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `CA-Tax-Ledger-${Date.now()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        if (window.App) {
          window.App.showToast('CA Audit Ledger Voucher Downloaded!');
        }
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.microSandboxesInstance = new MicroSandboxesEngine();
});
