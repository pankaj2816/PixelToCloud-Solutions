/* ===================================================================
   PIXELTOCLOUD SOLUTIONS - CORE CLIENT APPLICATION ENGINE
   Smooth scroll, magnetic physics, 3D tilt, dark/light theme, serverless form & a11y
   =================================================================== */

class AppEngine {
  constructor() {
    this.themeToggleBtn = document.getElementById('theme-toggle');
    this.themeToggleMobile = document.getElementById('theme-toggle-mobile');
    this.mobileMenuBtn = document.getElementById('mobile-menu-btn');
    this.mobileDrawer = document.getElementById('mobile-drawer');
    this.drawerOverlay = document.getElementById('drawer-overlay');
    this.drawerCloseBtn = document.getElementById('mobile-drawer-close') || document.getElementById('drawer-close-btn');
    this.navbar = document.getElementById('navbar');
    this.cursorGlow = document.querySelector('.cursor-glow');

    this.init();
  }

  init() {
    this.initTheme();
    this.bindNavigation();
    this.bindScrollEffects();
    this.bindScrollReveal();
    this.bindCursorGlow();
    this.bindCard3DTilt();
    this.bindFAQAccordion();
    this.bindContactForm();
    this.bindQuickConnect();
    this.bindLegalModals();
  }

  // ================= THEME TOGGLE (DARK / DAY LIGHT MODE) =================
  initTheme() {
    const savedTheme = localStorage.getItem('pixelToCloud_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    this.updateThemeIcons(savedTheme);

    const toggleHandler = () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('pixelToCloud_theme', next);
      this.updateThemeIcons(next);
      this.showToast(`Switched to ${next === 'light' ? 'Studio Frost Light Mode' : 'Cyber Dark Mode'}`);
    };

    if (this.themeToggleBtn) this.themeToggleBtn.addEventListener('click', toggleHandler);
    if (this.themeToggleMobile) this.themeToggleMobile.addEventListener('click', toggleHandler);
  }

  updateThemeIcons(theme) {
    const iconHtml = theme === 'light' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    const label = theme === 'light' ? 'Light' : 'Dark';
    if (this.themeToggleBtn) {
      this.themeToggleBtn.innerHTML = `<span>${iconHtml}</span>`;
      this.themeToggleBtn.setAttribute('aria-label', `Current theme is ${label}. Click to switch.`);
    }
    if (this.themeToggleMobile) {
      this.themeToggleMobile.innerHTML = `<span>${iconHtml}</span>`;
      this.themeToggleMobile.setAttribute('aria-label', `Current theme is ${label}. Click to switch.`);
    }
  }

  // ================= NAVIGATION & MOBILE DRAWER (A11Y ENHANCED) =================
  bindNavigation() {
    if (this.mobileMenuBtn) {
      this.mobileMenuBtn.setAttribute('aria-expanded', 'false');
      this.mobileMenuBtn.setAttribute('aria-controls', 'mobile-drawer');
      this.mobileMenuBtn.addEventListener('click', () => this.openDrawer());
    }
    if (this.drawerCloseBtn) {
      this.drawerCloseBtn.addEventListener('click', () => this.closeDrawer());
    }
    if (this.drawerOverlay) {
      this.drawerOverlay.addEventListener('click', () => this.closeDrawer());
    }

    // Close drawer when clicking mobile links
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => this.closeDrawer());
    });

    // Escape key closes mobile drawer
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.mobileDrawer?.classList.contains('open')) {
        this.closeDrawer();
      }
    });

    // Smooth Anchor Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#' || href.startsWith('#!')) return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  openDrawer() {
    if (this.mobileDrawer) this.mobileDrawer.classList.add('open');
    if (this.drawerOverlay) this.drawerOverlay.classList.add('active');
    if (this.mobileMenuBtn) this.mobileMenuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  closeDrawer() {
    if (this.mobileDrawer) this.mobileDrawer.classList.remove('open');
    if (this.drawerOverlay) this.drawerOverlay.classList.remove('active');
    if (this.mobileMenuBtn) this.mobileMenuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  // ================= SCROLL & HEADER EFFECTS (THROTTLED WITH rAF) =================
  bindScrollEffects() {
    let ticking = false;
    const sections = Array.from(document.querySelectorAll('section[id]'));
    const navLinks = Array.from(document.querySelectorAll('.nav-link'));

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.pageYOffset;
          if (this.navbar) {
            if (scrollY > 50) {
              this.navbar.classList.add('scrolled');
            } else {
              this.navbar.classList.remove('scrolled');
            }
          }

          // Active nav link spy
          sections.forEach(section => {
            const top = section.offsetTop - 140;
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
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // ================= CURSOR GLOW (GPU ACCELERATED WITH rAF) =================
  bindCursorGlow() {
    if (!this.cursorGlow) return;
    let mouseX = 0, mouseY = 0;
    let scheduled = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!scheduled) {
        requestAnimationFrame(() => {
          this.cursorGlow.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
          scheduled = false;
        });
        scheduled = true;
      }
    }, { passive: true });
  }

  // ================= 3D CARD TILT EFFECT (THROTTLED) =================
  bindCard3DTilt() {
    const cards = document.querySelectorAll('.glass-card, .service-card, .project-card');

    cards.forEach(card => {
      let isHovered = false;
      let cardTicking = false;

      card.addEventListener('mouseenter', () => { isHovered = true; });

      card.addEventListener('mousemove', (e) => {
        if (!isHovered || cardTicking) return;
        cardTicking = true;

        requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          const rotateX = ((y - centerY) / centerY) * -4;
          const rotateY = ((x - centerX) / centerX) * 4;

          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
          cardTicking = false;
        });
      }, { passive: true });

      card.addEventListener('mouseleave', () => {
        isHovered = false;
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
      });
    });
  }

  // ================= SCROLL REVEAL OBSERVER =================
  bindScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      reveals.forEach(el => el.classList.add('active'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(el => observer.observe(el));
  }

  // ================= FAQ ACCORDION (A11Y EXPANDED STATE) =================
  bindFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
      const btn = item.querySelector('.faq-question-btn');
      const answerWrap = item.querySelector('.faq-answer-wrap');

      if (btn && answerWrap) {
        btn.setAttribute('aria-expanded', 'false');
        btn.addEventListener('click', () => {
          const isActive = item.classList.contains('active');

          // Close all other items
          faqItems.forEach(other => {
            if (other !== item) {
              other.classList.remove('active');
              const otherBtn = other.querySelector('.faq-question-btn');
              if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
              const otherWrap = other.querySelector('.faq-answer-wrap');
              if (otherWrap) otherWrap.style.maxHeight = null;
            }
          });

          // Toggle current
          if (isActive) {
            item.classList.remove('active');
            btn.setAttribute('aria-expanded', 'false');
            answerWrap.style.maxHeight = null;
          } else {
            item.classList.add('active');
            btn.setAttribute('aria-expanded', 'true');
            answerWrap.style.maxHeight = answerWrap.scrollHeight + 'px';
          }
        });
      }
    });
  }

  // ================= CONTACT FORM DISPATCH (SERVERLESS DIRECT EMAIL & WHATSAPP) =================
  bindContactForm() {
    const form = document.getElementById('contact-form');
    const emailBtn = document.getElementById('contact-submit-email');
    const whatsappBtn = document.getElementById('contact-submit-whatsapp');
    if (!form) return;

    const validateForm = () => {
      const name = document.getElementById('contact-name')?.value.trim();
      const email = document.getElementById('contact-email')?.value.trim();
      const phone = document.getElementById('contact-phone')?.value.trim();
      const budget = document.getElementById('contact-budget')?.value;
      const message = document.getElementById('contact-message')?.value.trim();

      const selectedServices = [];
      document.querySelectorAll('input[name="services"]:checked').forEach(cb => {
        selectedServices.push(cb.value);
      });

      if (!name || !email || !message) {
        this.showToast('⚠️ Please fill in all required fields (Name, Email, Project Details).');
        return null;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        this.showToast('⚠️ Please enter a valid email address (e.g. name@company.com).');
        return null;
      }

      return { name, email, phone, budget, message, selectedServices };
    };

    // 1. Direct Priority Email Dispatch
    const sendViaEmail = async () => {
      const data = validateForm();
      if (!data) return;

      if (emailBtn) {
        emailBtn.disabled = true;
        emailBtn.innerHTML = '<span>✉️ Dispatching Inquiry to Bhavyansh...</span>';
      }

      const subject = `🚀 New Project Inquiry from ${data.name} - PixelToCloud Solutions`;
      const body = 
        `Dear Bhavyansh,\n\n` +
        `I would like to discuss a new software project with PixelToCloud Solutions.\n\n` +
        `--- CLIENT CONTACT DETAILS ---\n` +
        `👤 Name: ${data.name}\n` +
        `📧 Email: ${data.email}\n` +
        `📱 Phone / WhatsApp: ${data.phone || 'N/A'}\n` +
        `💼 Estimated Budget: ${data.budget}\n` +
        `🛠️ Services Needed: ${data.selectedServices.join(', ') || 'Custom Solution'}\n\n` +
        `--- PROJECT OVERVIEW & REQUIREMENTS ---\n` +
        `${data.message}\n\n` +
        `Best regards,\n${data.name}`;

      const mailtoUrl = `mailto:pppankaj2816@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      // Execute mailto client dispatch
      this.showToast('✉️ Opening direct email draft to pppankaj2816@gmail.com...');
      window.location.href = mailtoUrl;

      setTimeout(() => {
        if (emailBtn) {
          emailBtn.disabled = false;
          emailBtn.innerHTML = '<span>✉️ Send Inquiry via Email to Bhavyansh (Priority)</span>';
        }
      }, 2000);
    };

    // 2. Direct WhatsApp Dispatch
    const sendViaWhatsApp = () => {
      const data = validateForm();
      if (!data) return;

      const whatsappText = `🚀 *NEW CLIENT INQUIRY - PIXELTOCLOUD SOLUTIONS*\n\n` +
        `👤 *Name:* ${data.name}\n` +
        `📧 *Email:* ${data.email}\n` +
        `📱 *Phone:* ${data.phone || 'N/A'}\n` +
        `💼 *Estimated Budget:* ${data.budget || 'Flexible'}\n` +
        `🛠️ *Services Needed:* ${data.selectedServices.join(', ') || 'Custom Solution'}\n\n` +
        `📝 *Project Overview:*\n${data.message}\n\n` +
        `⚡ Sent via PixelToCloud Solutions (Lead Architect: Bhavyansh)`;

      const encoded = encodeURIComponent(whatsappText);
      const whatsappUrl = `https://wa.me/918219352124?text=${encoded}`;

      this.showToast('💬 Opening direct WhatsApp chat with Bhavyansh...');
      window.open(whatsappUrl, '_blank');
    };

    if (emailBtn) emailBtn.addEventListener('click', sendViaEmail);
    if (whatsappBtn) whatsappBtn.addEventListener('click', sendViaWhatsApp);

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      sendViaEmail();
    });
  }

  // ================= LEGAL MODALS (PRIVACY & TERMS) =================
  bindLegalModals() {
    const privacyBtn = document.getElementById('open-privacy-modal');
    const termsBtn = document.getElementById('open-terms-modal');
    const privacyModal = document.getElementById('privacy-modal');
    const termsModal = document.getElementById('terms-modal');

    const openModal = (modal) => {
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    };

    const closeModal = (modal) => {
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    };

    if (privacyBtn) privacyBtn.addEventListener('click', (e) => { e.preventDefault(); openModal(privacyModal); });
    if (termsBtn) termsBtn.addEventListener('click', (e) => { e.preventDefault(); openModal(termsModal); });

    document.querySelectorAll('.legal-modal-close').forEach(btn => {
      btn.addEventListener('click', () => {
        closeModal(privacyModal);
        closeModal(termsModal);
      });
    });

    [privacyModal, termsModal].forEach(modal => {
      if (modal) {
        modal.addEventListener('click', (e) => {
          if (e.target === modal) closeModal(modal);
        });
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal(privacyModal);
        closeModal(termsModal);
      }
    });
  }

  // ================= QUICK CONNECT & COPY (WITH FALLBACK) =================
  bindQuickConnect() {
    const copyEmailBtns = document.querySelectorAll('.copy-email-trigger');
    copyEmailBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const email = 'pppankaj2816@gmail.com';
        this.copyToClipboard(email, `📋 Copied "${email}" to clipboard!`);
      });
    });

    const copyPhoneBtns = document.querySelectorAll('.copy-phone-trigger');
    copyPhoneBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const phone = '+918219352124';
        this.copyToClipboard(phone, `📋 Copied "${phone}" to clipboard!`);
      });
    });
  }

  copyToClipboard(text, successMsg) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        this.showToast(successMsg);
      }).catch(() => {
        this.fallbackCopy(text, successMsg);
      });
    } else {
      this.fallbackCopy(text, successMsg);
    }
  }

  fallbackCopy(text, successMsg) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '-9999px';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      this.showToast(successMsg);
    } catch (err) {
      this.showToast(`ℹ️ Copy manually: ${text}`);
    }
    document.body.removeChild(textArea);
  }

  // ================= TOAST NOTIFICATION SYSTEM =================
  showToast(message, duration = 3500) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--accent-cyan); flex-shrink: 0;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(15px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
  window.App = new AppEngine();
});
