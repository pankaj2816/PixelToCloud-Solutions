/* ===================================================================
   PIXELTOCLOUD SOLUTIONS - INTERACTIVE BEFORE/AFTER SLIDER ENGINE
   Draggable split comparison with fluid touch/mouse tracking
   =================================================================== */

class BeforeAfterSlider {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.sliderHandle = this.container.querySelector('.ba-handle');
    this.afterImage = this.container.querySelector('.ba-after-layer');
    this.afterInner = this.container.querySelector('.ba-after-inner');
    this.isDragging = false;

    this.init();
  }

  init() {
    this.bindEvents();
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
  }

  setSplit(percentage) {
    if (this.afterImage) {
      this.afterImage.style.width = `${percentage}%`;
    }
    if (this.sliderHandle) {
      this.sliderHandle.style.left = `${percentage}%`;
    }
    this.updateInnerWidth();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.baSliderInstance = new BeforeAfterSlider('before-after-container');
});
