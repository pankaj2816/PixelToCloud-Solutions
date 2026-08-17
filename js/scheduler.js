/* ===================================================================
   PIXELTOCLOUD SOLUTIONS - 1-ON-1 DISCOVERY CALL SCHEDULER
   Interactive calendar meeting booking with Google Meet simulation & WhatsApp sync
   =================================================================== */

class MeetingScheduler {
  constructor() {
    this.modal = document.getElementById('scheduler-modal');
    this.openBtns = document.querySelectorAll('.open-scheduler-btn');
    this.closeBtn = document.getElementById('scheduler-close-btn');
    this.form = document.getElementById('scheduler-form');
    this.datesContainer = document.getElementById('scheduler-dates');
    this.slotsContainer = document.getElementById('scheduler-slots');

    this.selectedDate = null;
    this.selectedSlot = '11:00 AM';
    this.callType = '15-Min Technical Discovery';

    this.init();
  }

  init() {
    this.renderDates();
    this.bindEvents();
  }

  renderDates() {
    if (!this.datesContainer) return;
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    let html = '';
    const now = new Date();

    for (let i = 1; i <= 5; i++) {
      const d = new Date(now);
      d.setDate(now.getDate() + i);
      const isSelected = i === 1 ? 'selected' : '';
      if (i === 1) this.selectedDate = `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]}`;

      html += `
        <div class="scheduler-date-card ${isSelected}" data-date="${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]}">
          <div style="font-size: 0.72rem; color: var(--text-muted); font-family: monospace;">${days[d.getDay()]}</div>
          <div style="font-size: 1.15rem; font-weight: 800; color: var(--text-primary); margin: 2px 0;">${d.getDate()}</div>
          <div style="font-size: 0.72rem; color: var(--accent-cyan); font-weight: 600;">${months[d.getMonth()]}</div>
        </div>
      `;
    }
    this.datesContainer.innerHTML = html;
  }

  bindEvents() {
    this.openBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openModal();
      });
    });

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.closeModal());
    }

    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) this.closeModal();
      });
    }

    // Date selection
    if (this.datesContainer) {
      this.datesContainer.addEventListener('click', (e) => {
        const card = e.target.closest('.scheduler-date-card');
        if (card) {
          this.datesContainer.querySelectorAll('.scheduler-date-card').forEach(c => c.classList.remove('selected'));
          card.classList.add('selected');
          this.selectedDate = card.getAttribute('data-date');
        }
      });
    }

    // Slot selection
    if (this.slotsContainer) {
      this.slotsContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.scheduler-slot-btn');
        if (btn) {
          this.slotsContainer.querySelectorAll('.scheduler-slot-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.selectedSlot = btn.textContent.trim();
        }
      });
    }

    // Form submission
    if (this.form) {
      this.form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('sched-name')?.value.trim();
        const email = document.getElementById('sched-email')?.value.trim();
        const topic = document.getElementById('sched-topic')?.value.trim();

        if (!name || !email) {
          if (window.App) window.App.showToast('⚠️ Please provide your name and email address.');
          return;
        }

        const text = `📅 *NEW 1-ON-1 DISCOVERY CALL SCHEDULED*\n\n` +
          `👤 *Name:* ${name}\n` +
          `📧 *Email:* ${email}\n` +
          `📆 *Confirmed Date:* ${this.selectedDate}\n` +
          `⏰ *Time Slot:* ${this.selectedSlot}\n` +
          `🎯 *Meeting Focus:* ${topic || 'Project Roadmap & Tech Architecture'}\n\n` +
          `⚡ Scheduled via PixelToCloud Solutions`;

        const encoded = encodeURIComponent(text);
        const whatsappUrl = `https://wa.me/918219352124?text=${encoded}`;

        this.closeModal();
        if (window.App) {
          window.App.showToast(`✅ Meeting Confirmed with Pankaj for ${this.selectedDate} at ${this.selectedSlot}!`);
        }

        setTimeout(() => {
          window.open(whatsappUrl, '_blank');
        }, 800);
      });
    }
  }

  openModal() {
    if (this.modal) {
      this.modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  closeModal() {
    if (this.modal) {
      this.modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.schedulerInstance = new MeetingScheduler();
});
