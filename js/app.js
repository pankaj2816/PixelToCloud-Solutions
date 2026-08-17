/* ===================================================================
   PANKAJ TECH STUDIO - MASTER CONTROLLER (APP.JS)
   Theme switching, navigation, cursor glow, animations, contact form
   =================================================================== */

class AppController {
  constructor() {
    this.theme = localStorage.getItem('pankaj_theme') || 'dark';
    this.navbar = document.querySelector('.navbar');
    this.mobileDrawer = document.getElementById('mobile-drawer');
    this.drawerOverlay = document.getElementById('drawer-overlay');
    this.cursorGlow = document.querySelector('.cursor-glow');
    this.toastContainer = document.getElementById('toast-container');

    this.init();
  }

  init() {
    this.applyTheme(this.theme);
    this.bindThemeToggle();
    this.bindNavigation();
    this.bindScrollEffects();
    this.bindCursorGlow();
    this.bindCard3DTilt();
    this.bindFAQAccordion();
    this.bindContactForm();
    this.bindQuickConnect();
    this.bindScrollReveals();
  }

  // ================= THEME TOGGLE =================
  applyTheme(theme) {
    this.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('pankaj_theme', theme);

    const themeIcons = document.querySelectorAll('.theme-icon');
    themeIcons.forEach(icon => {
      if (theme === 'light') {
        icon.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
      } else {
        icon.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
      }
    });
  }

  bindThemeToggle() {
    const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const newTheme = this.theme === 'dark' ? 'light' : 'dark';
        this.applyTheme(newTheme);
        this.showToast(`Switched to ${newTheme === 'dark' ? 'Obsidian Dark' : 'Titanium Light'} Mode`);
      });
    });
  }

  // ================= NAVIGATION & DRAWER =================
  bindNavigation() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('mobile-drawer-close');
    const drawerLinks = document.querySelectorAll('.mobile-nav-link');

    if (menuBtn) {
      menuBtn.addEventListener('click', () => this.openDrawer());
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeDrawer());
    }

    if (this.drawerOverlay) {
      this.drawerOverlay.addEventListener('click', () => this.closeDrawer());
    }

    drawerLinks.forEach(link => {
      link.addEventListener('click', () => this.closeDrawer());
    });

    // Smooth scroll for all hash links with offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const navHeight = 90;
          const targetPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
          window.scrollTo({
            top: targetPos,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  openDrawer() {
    if (this.mobileDrawer) this.mobileDrawer.classList.add('open');
    if (this.drawerOverlay) this.drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeDrawer() {
    if (this.mobileDrawer) this.mobileDrawer.classList.remove('open');
    if (this.drawerOverlay) this.drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // ================= SCROLL & HEADER EFFECTS =================
  bindScrollEffects() {
    window.addEventListener('scroll', () => {
      const scrollY = window.pageYOffset;
      if (this.navbar) {
        if (scrollY > 50) {
          this.navbar.classList.add('scrolled');
        } else {
          this.navbar.classList.remove('scrolled');
        }
      }

      // Active nav link spy
      const sections = document.querySelectorAll('section[id]');
      const navLinks = document.querySelectorAll('.nav-link');

      sections.forEach(section => {
        const top = section.offsetTop - 120;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollY >= top && scrollY < top + height) {
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, { passive: true });
  }

  // ================= CURSOR GLOW =================
  bindCursorGlow() {
    if (!this.cursorGlow) return;

    window.addEventListener('mousemove', (e) => {
      this.cursorGlow.style.left = `${e.clientX}px`;
      this.cursorGlow.style.top = `${e.clientY}px`;
    });
  }

  // ================= 3D CARD TILT EFFECT =================
  bindCard3DTilt() {
    const cards = document.querySelectorAll('.glass-card, .service-card, .project-card');

    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Set CSS variables for spotlight hover lighting
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        // Subtle 3D tilt calculation
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    });
  }

  // ================= FAQ ACCORDION =================
  bindFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
      const btn = item.querySelector('.faq-question-btn');
      const answerWrap = item.querySelector('.faq-answer-wrap');

      if (btn && answerWrap) {
        btn.addEventListener('click', () => {
          const isActive = item.classList.contains('active');

          // Close all other items
          faqItems.forEach(other => {
            if (other !== item) {
              other.classList.remove('active');
              const otherWrap = other.querySelector('.faq-answer-wrap');
              if (otherWrap) otherWrap.style.maxHeight = null;
            }
          });

          // Toggle current
          if (isActive) {
            item.classList.remove('active');
            answerWrap.style.maxHeight = null;
          } else {
            item.classList.add('active');
            answerWrap.style.maxHeight = answerWrap.scrollHeight + 'px';
          }
        });
      }
    });
  }

  // ================= CONTACT FORM & VALIDATION =================
  bindContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name')?.value.trim();
      const email = document.getElementById('contact-email')?.value.trim();
      const phone = document.getElementById('contact-phone')?.value.trim();
      const budget = document.getElementById('contact-budget')?.value;
      const message = document.getElementById('contact-message')?.value.trim();

      // Collect selected service checkboxes
      const selectedServices = [];
      document.querySelectorAll('input[name="services"]:checked').forEach(cb => {
        selectedServices.push(cb.value);
      });

      if (!name || !email || !message) {
        this.showToast('⚠️ Please fill in all required fields (Name, Email, Project Details).');
        return;
      }

      // Prepare WhatsApp message payload for direct instant conversion
      const whatsappText = `🚀 *NEW CLIENT INQUIRY - PIXELTOCLOUD SOLUTIONS*\n\n` +
        `👤 *Name:* ${name}\n` +
        `📧 *Email:* ${email}\n` +
        `📱 *Phone:* ${phone || 'N/A'}\n` +
        `💼 *Estimated Budget:* ${budget || 'Flexible'}\n` +
        `🛠️ *Services Needed:* ${selectedServices.join(', ') || 'Custom Solution'}\n\n` +
        `📝 *Project Overview:*\n${message}\n\n` +
        `⚡ Sent via PixelToCloud Solutions (Lead Architect: Pankaj)`;

      const encoded = encodeURIComponent(whatsappText);
      const whatsappUrl = `https://wa.me/918219352124?text=${encoded}`;

      // Reset form & Notify user
      form.reset();
      this.showToast('🚀 Inquiry Sent Successfully! Opening direct WhatsApp chat...');

      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, 800);
    });
  }

  // ================= QUICK CONNECT & COPY =================
  bindQuickConnect() {
    const copyEmailBtns = document.querySelectorAll('.copy-email-trigger');
    copyEmailBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const email = 'pppankaj2816@gmail.com';
        navigator.clipboard.writeText(email).then(() => {
          this.showToast(`📋 Copied "${email}" to clipboard!`);
        });
      });
    });

    const copyPhoneBtns = document.querySelectorAll('.copy-phone-trigger');
    copyPhoneBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const phone = '+91 82193 52124';
        navigator.clipboard.writeText(phone).then(() => {
          this.showToast(`📋 Copied "${phone}" to clipboard!`);
        });
      });
    });
  }

  // ================= SCROLL REVEAL (INTERSECTION OBSERVER) =================
  bindScrollReveals() {
    const reveals = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      reveals.forEach(el => el.classList.add('active'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, {
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1
    });

    reveals.forEach(el => observer.observe(el));
  }

  // ================= TOAST NOTIFICATION SYSTEM =================
  showToast(message, duration = 3500) {
    if (!this.toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--accent-cyan); flex-shrink: 0;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
      <span>${message}</span>
    `;

    this.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
  window.App = new AppController();
});
