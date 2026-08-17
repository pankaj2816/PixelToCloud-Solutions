/* ===================================================================
   PIXELTOCLOUD SOLUTIONS - 1-ON-1 DISCOVERY CALL SCHEDULER
   Interactive calendar meeting booking with Google Calendar link, .ics download & WhatsApp sync
   =================================================================== */

class MeetingScheduler {
  constructor() {
    this.modal = document.getElementById('scheduler-modal');
    this.openBtns = document.querySelectorAll('.open-scheduler-btn, .open-scheduler-trigger');
    this.closeBtn = document.getElementById('scheduler-close-btn');
    this.form = document.getElementById('scheduler-form');
    this.datesContainer = document.getElementById('scheduler-dates');
    this.slotsContainer = document.getElementById('scheduler-slots');

    this.selectedDate = null;
    this.selectedSlot = '11:00 AM';
    this.callType = '15-Min Technical Discovery';
    this.lastBooking = null;

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
      const dateVal = `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]}`;
      if (i === 1) this.selectedDate = dateVal;

      html += `
        <div class="scheduler-date-card ${isSelected}" data-date="${dateVal}" tabindex="0" role="button" aria-label="Select ${dateVal}">
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

    // Escape key listener
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal && this.modal.classList.contains('active')) {
        this.closeModal();
      }
    });

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

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          if (window.App) window.App.showToast('⚠️ Please enter a valid email address (e.g. name@company.com).');
          return;
        }

        this.lastBooking = {
          name,
          email,
          topic: topic || 'Project Architecture & Tech Roadmap',
          date: this.selectedDate,
          slot: this.selectedSlot
        };

        this.renderConfirmedState();
      });
    }
  }

  getGoogleCalendarUrl() {
    if (!this.lastBooking) return '#';
    const title = encodeURIComponent(`PixelToCloud Discovery Call: Pankaj & ${this.lastBooking.name}`);
    const details = encodeURIComponent(
      `1-on-1 Technical Architecture Discovery Call with Pankaj (Lead Systems Architect & Founder, PixelToCloud Solutions).\n\n` +
      `👤 Client: ${this.lastBooking.name} (${this.lastBooking.email})\n` +
      `🎯 Topic: ${this.lastBooking.topic}\n` +
      `📅 Scheduled Time: ${this.lastBooking.date} at ${this.lastBooking.slot}\n` +
      `📱 Contact / WhatsApp: +91 8219352124\n` +
      `🌐 Link: Google Meet / Phone Call`
    );
    const location = encodeURIComponent('Google Meet / WhatsApp Call (+91 8219352124)');
    
    // Construct approximate ISO date
    const now = new Date();
    const startIso = now.toISOString().replace(/-|:|\.\d\d\d/g, '').substring(0, 15) + 'Z';
    const endIso = new Date(now.getTime() + 30 * 60000).toISOString().replace(/-|:|\.\d\d\d/g, '').substring(0, 15) + 'Z';

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${startIso}/${endIso}`;
  }

  downloadICS() {
    if (!this.lastBooking) return;
    const icsContent = 
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//PixelToCloud Solutions//Discovery Call Scheduler//EN
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:PixelToCloud Discovery Call with Pankaj & ${this.lastBooking.name}
DESCRIPTION:1-on-1 Technical Discovery Call.\\nClient: ${this.lastBooking.name} (${this.lastBooking.email})\\nTopic: ${this.lastBooking.topic}\\nContact: +91 8219352124
LOCATION:Google Meet / WhatsApp (+91 8219352124)
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `PixelToCloud-Discovery-Call.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  renderConfirmedState() {
    const modalBody = this.modal?.querySelector('.modal-body');
    if (!modalBody || !this.lastBooking) return;

    const gcalUrl = this.getGoogleCalendarUrl();
    const whatsappText = `📅 *1-ON-1 CALL CONFIRMED - PIXELTOCLOUD SOLUTIONS*\n\n` +
      `👤 *Name:* ${this.lastBooking.name}\n` +
      `📧 *Email:* ${this.lastBooking.email}\n` +
      `📆 *Date:* ${this.lastBooking.date}\n` +
      `⏰ *Time:* ${this.lastBooking.slot}\n` +
      `🎯 *Topic:* ${this.lastBooking.topic}\n\n` +
      `Looking forward to speaking with Pankaj!`;
    const whatsappUrl = `https://wa.me/918219352124?text=${encodeURIComponent(whatsappText)}`;

    modalBody.innerHTML = `
      <div style="text-align: center; padding: 20px 10px;">
        <div style="width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; margin: 0 auto 16px; box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);">
          ✓
        </div>
        <h3 style="font-size: 1.4rem; font-weight: 800; color: var(--text-primary); margin-bottom: 8px;">
          Discovery Call Requested & Synced!
        </h3>
        <p style="color: var(--text-secondary); font-size: 0.92rem; margin-bottom: 20px; line-height: 1.6;">
          Your 1-on-1 architecture call request with <strong>Pankaj</strong> is saved for <br>
          <span style="color: var(--accent-cyan); font-weight: 700;">${this.lastBooking.date} at ${this.lastBooking.slot}</span>.<br>
          <span style="font-size: 0.82rem; color: var(--text-muted);">Please add it to your calendar below — Pankaj will confirm the meeting directly via WhatsApp or Email.</span>
        </p>

        <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 24px;">
          <a href="${gcalUrl}" target="_blank" class="btn-magnetic btn-primary" style="width: 100%; padding: 13px; font-weight: 700; text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 8px;">
            <span>📅 Add to Google Calendar</span>
          </a>

          <button id="sched-download-ics-btn" class="btn-magnetic btn-secondary" style="width: 100%; padding: 12px; font-weight: 600;">
            <span>📥 Download .ics Calendar File</span>
          </button>

          <a href="${whatsappUrl}" target="_blank" class="btn-magnetic btn-secondary" style="width: 100%; padding: 12px; font-weight: 600; text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 8px;">
            <span>💬 Confirm & Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    `;

    const icsBtn = document.getElementById('sched-download-ics-btn');
    if (icsBtn) {
      icsBtn.addEventListener('click', () => {
        this.downloadICS();
        if (window.App) window.App.showToast('📥 .ics Calendar file downloaded!');
      });
    }

    if (window.App) {
      window.App.showToast(`🎉 Call scheduled with Pankaj for ${this.lastBooking.date}!`);
    }
  }

  openModal() {
    if (this.modal) {
      const aiModal = document.getElementById('ai-advisor-modal');
      if (aiModal) aiModal.classList.remove('active');

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
