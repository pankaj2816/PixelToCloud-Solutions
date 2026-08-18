/* ===================================================================
   PIXELTOCLOUD SOLUTIONS - 3D MAGNETIC TILT & SPECULAR LIGHTING ENGINE
   Hardware-accelerated 60 FPS 3D perspective transforms with cursor glare
   =================================================================== */

class MagneticCardsEngine {
  constructor() {
    this.cards = [];
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    
    if (!this.isReducedMotion && !this.isTouch) {
      this.init();
    }
  }

  init() {
    const targets = document.querySelectorAll('.founder-card-wrap, .portfolio-card, .service-card, .estimator-summary-panel, .terminal-window, .topology-node-card, .sandbox-interactive-card');
    
    targets.forEach(el => {
      this.attachMagneticEffect(el);
    });
  }

  attachMagneticEffect(card) {
    // Add specular glare overlay element if not present
    let glare = card.querySelector('.card-specular-glare');
    if (!glare) {
      glare = document.createElement('div');
      glare.className = 'card-specular-glare';
      card.appendChild(glare);
    }

    card.style.transformStyle = 'preserve-3d';
    card.style.transition = 'transform 0.15s cubic-bezier(0.2, 0, 0.2, 1), box-shadow 0.25s ease';

    let bounds = null;

    const onMouseEnter = () => {
      bounds = card.getBoundingClientRect();
      card.style.transition = 'transform 0.08s ease-out, box-shadow 0.25s ease';
      if (glare) glare.style.opacity = '1';
    };

    const onMouseMove = (e) => {
      if (!bounds) bounds = card.getBoundingClientRect();
      
      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;
      
      const centerX = bounds.width / 2;
      const centerY = bounds.height / 2;
      
      const deltaX = (mouseX - centerX) / centerX; // -1 to 1
      const deltaY = (mouseY - centerY) / centerY; // -1 to 1

      // Subtle max rotation: 7 degrees
      const rotateX = (-deltaY * 7).toFixed(2);
      const rotateY = (deltaX * 7).toFixed(2);

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`;

      // Specular light radial glare positioning
      if (glare) {
        const glareX = (mouseX / bounds.width) * 100;
        const glareY = (mouseY / bounds.height) * 100;
        glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 65%)`;
      }
    };

    const onMouseLeave = () => {
      card.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.5s ease';
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      if (glare) {
        glare.style.opacity = '0';
      }
      bounds = null;
    };

    card.addEventListener('mouseenter', onMouseEnter);
    card.addEventListener('mousemove', onMouseMove);
    card.addEventListener('mouseleave', onMouseLeave);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.magneticCardsInstance = new MagneticCardsEngine();
});
