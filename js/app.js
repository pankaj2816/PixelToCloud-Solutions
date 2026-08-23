/* ===================================================================
   PIXELTOCLOUD SOLUTIONS - CORE CLIENT APPLICATION ENGINE
   Smooth scroll, magnetic physics, 3D tilt, dark/light theme, serverless form & a11y
   =================================================================== */

class AppEngine {
  constructor() {
    this.themeToggleBtn = document.getElementById('theme-toggle');
    this.themeToggleMobile = document.getElementById('theme-toggle-mobile');
    this.mobileMenuBtn = document.getElementById('mobile-menu-btn');
    this.mobileDrawer = document.getElementById('mobile-drawer') || document.querySelector('.mobile-drawer, .mobile-nav-drawer');
    this.drawerOverlay = document.getElementById('drawer-overlay') || document.getElementById('mobile-drawer-overlay') || document.querySelector('.mobile-drawer-overlay');
    this.drawerCloseBtn = document.getElementById('mobile-drawer-close') || document.getElementById('drawer-close-btn') || document.querySelector('.drawer-close-btn');
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

  // ================= THEME SYSTEM (CYBER DARK / CLEAN LIGHT / EMERALD MATRIX) =================
  initTheme() {
    const savedTheme = localStorage.getItem('pixelToCloud_theme') || 'dark';
    this.setTheme(savedTheme, false);

    // Segmented theme switch buttons
    const themeButtons = document.querySelectorAll('.theme-switch-btn');
    themeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const theme = btn.getAttribute('data-set-theme');
        if (theme) {
          this.setTheme(theme, true);
        }
      });
    });

    const toggleHandler = () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      let next = 'light';
      if (current === 'dark') next = 'light';
      else if (current === 'light') next = 'emerald';
      else next = 'dark';
      this.setTheme(next, true);
    };

    if (this.themeToggleBtn) this.themeToggleBtn.addEventListener('click', toggleHandler);
    if (this.themeToggleMobile) this.themeToggleMobile.addEventListener('click', toggleHandler);

    this.bindContextualWhatsApp();
  }

  setTheme(theme, notify = true) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('pixelToCloud_theme', theme);
    this.updateThemeIcons(theme);

    // Update segmented buttons
    document.querySelectorAll('.theme-switch-btn').forEach(btn => {
      if (btn.getAttribute('data-set-theme') === theme) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    if (notify) {
      const names = { dark: 'Cyber Dark', light: 'Studio Clean Light', emerald: 'Emerald Matrix' };
      this.showToast(`Switched to ${names[theme] || theme} Theme Mode`);
    }
  }

  bindContextualWhatsApp() {
    const waTopics = {
      'doctor': "Hello Bhavyansh & Tushar, I'm interested in building a Doctor & Telehealth Medical Portal with PixelToCloud.",
      'fintech': "Hello Bhavyansh & Tushar, I'd like to discuss a Chartered Accountancy & FinTech Portal with automated tax engines.",
      '3d': "Hello Bhavyansh & Tushar, I'm looking to build interactive 2D/3D WebGL Three.js software for my project.",
      'ecommerce': "Hello Bhavyansh & Tushar, I'd like to discuss a luxury Art & E-Commerce store with global payment checkout.",
      'devops': "Hello Bhavyansh & Tushar, I need dedicated Linux VPS provisioning, Docker clustering, and zero-downtime DevOps.",
      'blueprint': "Hello Bhavyansh & Tushar, I configured an Architecture Scope on your site and would like to review the technical blueprint.",
      'general': "Hello Bhavyansh & Tushar, I would like to schedule a technical discovery call for my website and software project."
    };

    document.querySelectorAll('[data-wa-topic]').forEach(el => {
      el.addEventListener('click', (e) => {
        const topicKey = el.getAttribute('data-wa-topic') || 'general';
        const msg = waTopics[topicKey] || waTopics['general'];
        const url = `https://wa.me/918219352124?text=${encodeURIComponent(msg)}`;
        window.open(url, '_blank');
      });
    });
  }

  updateThemeIcons(theme) {
    let iconHtml = '<i class="fa-solid fa-moon"></i>';
    if (theme === 'light') iconHtml = '<i class="fa-solid fa-sun"></i>';
    else if (theme === 'emerald') iconHtml = '<i class="fa-solid fa-gem" style="color: #10b981;"></i>';

    const label = theme.charAt(0).toUpperCase() + theme.slice(1);
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
    const mobileLinks = document.querySelectorAll('.mobile-nav-link, .drawer-link, .mobile-drawer a, .mobile-nav-drawer a');
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

    // 1. Direct Priority Email Dispatch (Automated Cloud Submission + Mailto Fallback)
    const sendViaEmail = async () => {
      const data = validateForm();
      if (!data) return;

      const targetEmail = 'pixeltocloud@gmail.com';

      if (emailBtn) {
        emailBtn.disabled = true;
        emailBtn.innerHTML = '<span><i class="fa-solid fa-spinner fa-spin" style="margin-right: 6px;"></i>Sending Inquiry to pixeltocloud@gmail.com...</span>';
      }

      const subject = `🚀 New Project Inquiry from ${data.name} - PixelToCloud Solutions`;
      const body = 
        `Dear Bhavyansh Agarwal & Tushar Singhal,\n\n` +
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

      try {
        // Direct Serverless Submission to pixeltocloud@gmail.com
        const response = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            _subject: subject,
            Name: data.name,
            Email: data.email,
            Phone: data.phone || 'N/A',
            BudgetTier: data.budget,
            Services: data.selectedServices.join(', ') || 'Custom Solution',
            Message: data.message,
            _template: 'table',
            _captcha: 'false'
          })
        });

        if (response.ok) {
          this.showToast(`✅ Inquiry sent directly to ${targetEmail}! Founders will respond to ${data.email} within 2-4 hours.`);
          form.reset();
        } else {
          // Fallback to mailto client
          const mailtoUrl = `mailto:${targetEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
          window.location.href = mailtoUrl;
          this.showToast(`✉️ Opening direct email draft to ${targetEmail}...`);
        }
      } catch (err) {
        // Fallback to mailto client
        const mailtoUrl = `mailto:${targetEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoUrl;
        this.showToast(`✉️ Opening direct email draft to ${targetEmail}...`);
      } finally {
        setTimeout(() => {
          if (emailBtn) {
            emailBtn.disabled = false;
            emailBtn.innerHTML = '<span><i class="fa-solid fa-paper-plane" style="margin-right: 6px;"></i>Send Inquiry via Email (Primary)</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>';
          }
        }, 2500);
      }
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
        `⚡ Sent to PixelToCloud Solutions Founders (Bhavyansh Agarwal & Tushar Singhal)`;

      const encoded = encodeURIComponent(whatsappText);
      const whatsappUrl = `https://wa.me/918219352124?text=${encoded}`;

      this.showToast('💬 Opening direct WhatsApp chat with Founders...');
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

      // Floating Mobile Dock Action Triggers
      const dockAiBtn = document.getElementById('dock-ai-advisor-btn');
      const dockSchedBtn = document.getElementById('dock-scheduler-btn');
      if (dockAiBtn) {
        dockAiBtn.addEventListener('click', () => {
          const aiModal = document.getElementById('ai-advisor-modal');
          if (aiModal) {
            aiModal.classList.add('active');
            document.body.style.overflow = 'hidden';
          }
        });
      }
      if (dockSchedBtn) {
        dockSchedBtn.addEventListener('click', () => {
          const schedModal = document.getElementById('scheduler-modal');
          if (schedModal) {
            schedModal.classList.add('active');
            document.body.style.overflow = 'hidden';
          }
        });
      }
    }

  // ================= QUICK CONNECT & COPY (WITH FALLBACK) =================
  bindQuickConnect() {
    const copyEmailBtns = document.querySelectorAll('.copy-email-trigger');
    copyEmailBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const email = 'pixeltocloud@gmail.com';
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
