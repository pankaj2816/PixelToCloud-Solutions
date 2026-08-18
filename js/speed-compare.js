/* ===================================================================
   PIXELTOCLOUD SOLUTIONS - PERFORMANCE SPEEDOMETER & BENCHMARK GAUGE
   Interactive PageSpeed 100 vs Slow Agency Architecture Comparison
   =================================================================== */

class SpeedCompareEngine {
  constructor() {
    this.gaugeCircle = document.getElementById('speed-gauge-circle');
    this.gaugeScore = document.getElementById('speed-gauge-score');
    this.raceBtn = document.getElementById('speed-race-btn');
    this.isRacing = false;

    this.init();
  }

  init() {
    if (this.raceBtn) {
      this.raceBtn.addEventListener('click', () => this.runRace());
    }

    // Trigger gauge on scroll intersection
    const container = document.getElementById('speed-comparison-section');
    if (container && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          this.animateGauge(100);
          observer.disconnect();
        }
      }, { threshold: 0.3 });
      observer.observe(container);
    } else {
      this.animateGauge(100);
    }
  }

  animateGauge(targetScore) {
    if (!this.gaugeCircle || !this.gaugeScore) return;

    let current = 0;
    const duration = 1200; // ms
    const startTime = performance.now();
    const radius = 54;
    const circumference = 2 * Math.PI * radius; // ~339.29

    this.gaugeCircle.style.strokeDasharray = circumference;

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      current = Math.round(ease * targetScore);

      this.gaugeScore.textContent = current;

      const offset = circumference - (ease * (targetScore / 100)) * circumference;
      this.gaugeCircle.style.strokeDashoffset = offset;

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }

  runRace() {
    if (this.isRacing) return;
    this.isRacing = true;

    const slowBar = document.getElementById('race-bar-slow');
    const fastBar = document.getElementById('race-bar-fast');
    const slowTime = document.getElementById('race-time-slow');
    const fastTime = document.getElementById('race-time-fast');

    if (this.raceBtn) {
      this.raceBtn.innerHTML = `<span><i class="fa-solid fa-spinner fa-spin" style="margin-right: 6px;"></i>Racing Network Packets...</span>`;
    }

    if (slowBar) slowBar.style.width = '0%';
    if (fastBar) fastBar.style.width = '0%';

    // Fast bar reaches 100% in 380ms
    setTimeout(() => {
      if (fastBar) fastBar.style.width = '100%';
      if (fastTime) fastTime.innerHTML = `<span style="color: #10b981; font-weight: bold;">⚡ 0.38s (Loaded)</span>`;
    }, 50);

    // Slow bar takes 4.2s
    let slowProgress = 0;
    const slowInterval = setInterval(() => {
      slowProgress += 10;
      if (slowBar) slowBar.style.width = `${Math.min(slowProgress, 100)}%`;
      if (slowTime) slowTime.innerHTML = `<span style="color: #f59e0b;">⏳ ${(slowProgress * 0.042).toFixed(1)}s Loading plugins...</span>`;

      if (slowProgress >= 100) {
        clearInterval(slowInterval);
        if (slowTime) slowTime.innerHTML = `<span style="color: #ef4444; font-weight: bold;">❌ 4.2s (Bloated Payload)</span>`;
        this.isRacing = false;
        if (this.raceBtn) {
          this.raceBtn.innerHTML = `<span><i class="fa-solid fa-bolt" style="margin-right: 6px;"></i>Re-Run Live Speed Race</span>`;
        }
      }
    }, 420);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.speedCompareInstance = new SpeedCompareEngine();
});
