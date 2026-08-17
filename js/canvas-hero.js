/* ===================================================================
   PANKAJ TECH STUDIO - INTERACTIVE 3D PARTICLE & CYBER MESH CANVAS
   Fluid physics, mouse repulsion/attraction, ambient depth nodes
   =================================================================== */

class HeroCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouse = {
      x: null,
      y: null,
      radius: 180,
      targetX: null,
      targetY: null
    };
    
    this.numParticles = 90;
    this.connectionDistance = 140;
    this.animationFrameId = null;
    this.dpr = window.devicePixelRatio || 1;
    this.hue = 185; // Cyan base

    this.init();
  }

  init() {
    this.resize();
    this.createParticles();
    this.bindEvents();
    this.animate();
  }

  resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    this.canvas.width = width * this.dpr;
    this.canvas.height = height * this.dpr;
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;
    this.ctx.scale(this.dpr, this.dpr);
    
    this.width = width;
    this.height = height;

    // Adjust particle count based on screen width
    if (width < 768) {
      this.numParticles = 45;
      this.connectionDistance = 100;
    } else if (width < 1200) {
      this.numParticles = 70;
      this.connectionDistance = 120;
    } else {
      this.numParticles = 110;
      this.connectionDistance = 150;
    }
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.numParticles; i++) {
      const isSpecial = Math.random() > 0.85;
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.9,
        vy: (Math.random() - 0.5) * 0.9,
        baseRadius: isSpecial ? Math.random() * 2.8 + 2 : Math.random() * 1.8 + 1,
        radius: isSpecial ? Math.random() * 2.8 + 2 : Math.random() * 1.8 + 1,
        color: isSpecial ? '#00f0ff' : (Math.random() > 0.5 ? '#3b82f6' : '#8b5cf6'),
        alpha: Math.random() * 0.6 + 0.2,
        isSpecial: isSpecial,
        pulseSpeed: Math.random() * 0.03 + 0.01,
        pulseAngle: Math.random() * Math.PI * 2
      });
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.createParticles();
    });

    window.addEventListener('mousemove', (e) => {
      this.mouse.targetX = e.clientX;
      this.mouse.targetY = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      this.mouse.targetX = null;
      this.mouse.targetY = null;
    });

    // Touch support for mobile devices
    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        this.mouse.targetX = e.touches[0].clientX;
        this.mouse.targetY = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      this.mouse.targetX = null;
      this.mouse.targetY = null;
    });

    // Pause animation when tab is inactive to conserve battery & GPU
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        if (this.animationFrameId) {
          cancelAnimationFrame(this.animationFrameId);
          this.animationFrameId = null;
        }
      } else {
        if (!this.animationFrameId) {
          this.animate();
        }
      }
    });
  }

  updateMousePhysics() {
    if (this.mouse.targetX !== null && this.mouse.targetY !== null) {
      if (this.mouse.x === null) {
        this.mouse.x = this.mouse.targetX;
        this.mouse.y = this.mouse.targetY;
      } else {
        // Smooth easing for mouse interaction
        this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.15;
        this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.15;
      }
    } else {
      this.mouse.x = null;
      this.mouse.y = null;
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.updateMousePhysics();

    // Subtle ambient background grid lines
    this.drawCyberGrid();

    // Update and draw particles
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // Pulse particle size
      p.pulseAngle += p.pulseSpeed;
      p.radius = p.baseRadius + Math.sin(p.pulseAngle) * 0.6;

      // Move particle
      p.x += p.vx;
      p.y += p.vy;

      // Bounce off screen boundaries
      if (p.x < 0 || p.x > this.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.height) p.vy *= -1;

      // Mouse interactivity (gentle repulsion and glow)
      if (this.mouse.x !== null && this.mouse.y !== null) {
        const dx = this.mouse.x - p.x;
        const dy = this.mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.mouse.radius) {
          const force = (1 - dist / this.mouse.radius) * 1.5;
          const angle = Math.atan2(dy, dx);
          p.x -= Math.cos(angle) * force * 2;
          p.y -= Math.sin(angle) * force * 2;
          p.alpha = Math.min(1, p.alpha + 0.05);
        }
      }

      // Draw particle glow
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = p.alpha;
      this.ctx.shadowColor = p.color;
      this.ctx.shadowBlur = p.isSpecial ? 12 : 4;
      this.ctx.fill();
      this.ctx.restore();

      // Connect particles
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.connectionDistance) {
          const alpha = (1 - dist / this.connectionDistance) * 0.28;
          this.ctx.save();
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          
          const grad = this.ctx.createLinearGradient(p.x, p.y, p2.x, p2.y);
          grad.addColorStop(0, p.color);
          grad.addColorStop(1, p2.color);
          
          this.ctx.strokeStyle = grad;
          this.ctx.globalAlpha = alpha;
          this.ctx.lineWidth = 1;
          this.ctx.stroke();
          this.ctx.restore();
        }
      }
    }

    // Connect mouse to nearby particles with electric ray
    if (this.mouse.x !== null && this.mouse.y !== null) {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const rayColor = isLight ? '#0284c7' : '#00f0ff';
      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];
        const dx = this.mouse.x - p.x;
        const dy = this.mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          this.ctx.save();
          this.ctx.beginPath();
          this.ctx.moveTo(this.mouse.x, this.mouse.y);
          this.ctx.lineTo(p.x, p.y);
          this.ctx.strokeStyle = rayColor;
          this.ctx.globalAlpha = (1 - dist / 130) * 0.4;
          this.ctx.lineWidth = 1.2;
          this.ctx.shadowColor = rayColor;
          this.ctx.shadowBlur = 8;
          this.ctx.stroke();
          this.ctx.restore();
        }
      }
    }

    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }

  drawCyberGrid() {
    this.ctx.save();
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    this.ctx.strokeStyle = isLight ? 'rgba(15, 23, 42, 0.035)' : 'rgba(255, 255, 255, 0.015)';
    this.ctx.lineWidth = 1;
    const gridSize = 60;
    
    for (let x = 0; x < this.width; x += gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.height);
      this.ctx.stroke();
    }

    for (let y = 0; y < this.height; y += gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.width, y);
      this.ctx.stroke();
    }
    this.ctx.restore();
  }

  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.heroCanvasInstance = new HeroCanvas('hero-canvas');
});
