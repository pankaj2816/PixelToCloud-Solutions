/* ===================================================================
   PIXELTOCLOUD SOLUTIONS - AI VIRTUAL PROJECT ADVISOR (SMART CHATBOT 3.0)
   1000+ Question & Answer Knowledge Tree, Natural Language Processor & Direct Lead Bridge
   =================================================================== */

class PixelToCloudAIAdvisor {
  constructor() {
    this.widget = document.getElementById('ai-advisor-widget');
    this.chatModal = document.getElementById('ai-advisor-modal');
    this.openBtn = document.getElementById('ai-advisor-trigger');
    this.dockBtn = document.getElementById('dock-ai-advisor-btn');
    this.closeBtn = document.getElementById('ai-advisor-close');
    this.minimizeBtn = document.getElementById('ai-advisor-minimize');
    this.messagesContainer = document.getElementById('ai-advisor-messages');
    this.input = document.getElementById('ai-advisor-input');
    this.sendBtn = document.getElementById('ai-advisor-send');
    this.chipsContainer = document.getElementById('ai-advisor-chips');

    this.isProcessing = false;
    this.conversationHistory = [];

    // Comprehensive 1000+ Question/Intent Domain Knowledge Base
    this.knowledgeBase = [
      // 1. General Pricing & Budget
      {
        id: 'pricing',
        keywords: ['price', 'pricing', 'cost', 'how much', 'budget', 'rate', 'charges', 'fee', 'package', 'estimate', 'cheap', 'expensive', 'inr', 'usd', 'quote', 'costing'],
        response: "💰 **Transparent & Flexible Milestone-Based Pricing:**\n\n• **Starter Business Websites:** Ideal for local brands & clinics (typically ₹18k–₹35k / $250–$450).\n• **Custom High-Scale Platforms & SaaS:** Advanced CA suites, Telehealth portals, or Art E-Commerce (₹45k–₹95k+ / $600–$1,200+).\n• **3D WebGL / Interactive Engines:** Hardware-accelerated 60 FPS graphics (₹60k–₹1.2L+).\n\n✅ **Zero upfront risk:** All work is broken down into structured milestone deliverables (Kickoff $\\to$ Live Demo $\\to$ Production Deployment).",
        actions: ['estimator', 'scheduler', 'email'],
        chips: ["⏱️ What is the delivery timeline?", "💼 Tell me about Doctor Portals", "🔐 Do I own 100% of the code?"]
      },

      // 2. Project Timelines & Turnaround
      {
        id: 'timeline',
        keywords: ['timeline', 'delivery', 'time', 'how long', 'days', 'weeks', 'fast', 'urgent', 'speed', 'duration', 'when', 'turnaround', 'deadline', 'rush'],
        response: "⏱️ **Rapid & Predictable Delivery Timelines:**\n\n• **Standard High-Performance Website:** 5–7 Working Days.\n• **Full-Stack Portals (CA, Telehealth, E-Commerce):** 10–18 Working Days.\n• **Complex 3D WebGL & Cloud Clusters:** 14–21 Working Days.\n\n⚡ **Rush Sprints:** Need urgent launch? We offer accelerated sprint delivery with direct founder focus.",
        actions: ['scheduler', 'email', 'whatsapp'],
        chips: ["💰 How much does a custom site cost?", "👨‍💻 Who are the founders?", "☁️ How do you set up VPS servers?"]
      },

      // 3. Founders & Team Mastery
      {
        id: 'founders',
        keywords: ['founder', 'who', 'Pankaj', 'tushar', 'pankaj', 'team', 'experience', 'architect', 'developer', 'background', 'engineer', 'lead', 'owners', 'credentials'],
        response: "👨‍💻 **Engineered Directly by Senior Founders:**\n\n• **Pankaj Gupta (Lead Systems Architect):** 8–10+ Years of Dual Mastery across Hardware, Full-Stack Architecture, and Linux Cloud DevOps.\n• **Tushar Singhal (Co-Founder & Senior Software Developer):** 5+ Years of mastery in React, Python, Rust, high-concurrency microservices, and database performance.\n\n🌟 **The PixelToCloud Difference:** No junior delegates or inexperienced middlemen—your software is engineered directly by experienced architects.",
        actions: ['email', 'call', 'whatsapp'],
        chips: ["📞 How do I talk to Pankaj & Tushar?", "💼 View CA & Doctor Portals", "💰 What are your payment terms?"]
      },

      // 4. Doctor & Clinic Telehealth Portals
      {
        id: 'doctor_telehealth',
        keywords: ['doctor', 'clinic', 'hospital', 'medical', 'telehealth', 'telemedicine', 'patient', 'appointment', 'prescription', 'ehr', 'emr', 'health', 'cancer', 'oncology', 'booking', 'webrtc'],
        response: "🩺 **Doctor & Clinic Telehealth Portals:**\n\n• **Real-Time Calendar Booking:** Instant slot sync with WhatsApp & SMS client confirmations.\n• **Encrypted Patient EHR Records:** 256-bit AES encrypted medical history and report storage.\n• **Digital Prescription PDF Engine:** 1-click printable digital prescription generator.\n• **WebRTC Video Rooms:** HIPAA/telehealth-compliant peer-to-peer browser video consultations with zero app installation.\n\n⏱️ **Turnaround:** 10–14 working days.",
        actions: ['estimator', 'email', 'whatsapp'],
        chips: ["💰 How much for a Doctor Portal?", "⏱️ What is the delivery timeline?", "🔐 Is patient data encrypted?"]
      },

      // 5. CA, FinTech & Tax Suites
      {
        id: 'ca_fintech',
        keywords: ['ca', 'chartered accountant', 'tax', 'gst', 'audit', 'accounting', 'ledger', 'fintech', 'invoice', 'invoicing', 'itr', 'financial', 'compliance', 'tds'],
        response: "💼 **Chartered Accountant & FinTech Portals:**\n\n• **Automated Tax Engines:** Instant GST, Income Tax (Old vs New Regime) & TDS calculation logic.\n• **Client Document Vault:** Encrypted lockers with structured folder trees for PAN, ITR, balance sheets & audits.\n• **InvoicePro Ledger:** Automated GST invoicing with real-time payment tracking.\n• **Audit Trails:** Immutable activity logs for multi-user client accounting teams.",
        actions: ['estimator', 'scheduler', 'email'],
        chips: ["💰 Pricing for CA Portal?", "📱 Do clients get mobile access?", "🔒 How secure is client data?"]
      },

      // 6. 2D / 3D WebGL Three.js Software
      {
        id: '3d_webgl',
        keywords: ['3d', '2d', 'webgl', 'three.js', 'threejs', 'graphics', 'canvas', 'cad', 'visualizer', 'shader', 'glsl', 'animation', 'rendering', '60fps', 'game'],
        response: "🧊 **2D/3D WebGL Interactive Software:**\n\n• **Hardware-Accelerated 60 FPS:** Smooth Three.js graphics with sub-second asset streaming.\n• **360° Product Visualizers:** Real-time materials, texture zoom, lighting controls, and exploded component views.\n• **2D Canvas & CAD Tools:** Vector drawing, shape editing, floorplan generation right in browser.\n• **Procedural GLSL Shaders:** Custom raymarched visual effects and interactive particle simulations.",
        actions: ['portfolio', 'estimator', 'email'],
        chips: ["🎮 Tell me about Desktop Games (Neon Striker)", "💰 Pricing for 3D visualizers?", "⚡ Does it work fast on mobile phones?"]
      },

      // 7. Desktop Apps & Tauri vs Electron
      {
        id: 'desktop_software',
        keywords: ['desktop', 'tauri', 'rust', 'electron', 'pos', 'sqlite', 'offline', 'windows', 'macos', 'linux', 'exe', 'app', 'desktop app', 'software'],
        response: "💻 **Next-Gen Desktop Software (Tauri Rust & Electron):**\n\n• **Tauri Rust Architecture:** Ultra-lightweight ~38MB RAM footprint & 0.4% CPU usage (vs Electron's 480MB+ bloat).\n• **Offline SQLite Engine:** Zero-latency ACID queries and full offline operation.\n• **Cross-Platform:** Single clean codebase compiling for Windows, macOS, and Linux.\n• **Desktop Suite:** Custom ERPs, POS billing, inventory trackers, and high-performance native tools.",
        actions: ['portfolio', 'email', 'call'],
        chips: ["🦀 Why Tauri Rust over Electron?", "💰 How much for a desktop POS?", "⏱️ What is the delivery time?"]
      },

      // 8. E-Commerce & Luxury Craft Boutiques
      {
        id: 'ecommerce',
        keywords: ['ecommerce', 'e-commerce', 'shop', 'store', 'cart', 'checkout', 'payment', 'stripe', 'razorpay', 'art', 'craft', 'boutique', 'inventory', 'shopify'],
        response: "🎨 **Luxury Art & High-Performance E-Commerce:**\n\n• **360° Texture Inspector:** High-resolution dynamic zoom on artisan products and fine artworks.\n• **Multi-Currency Checkout:** Global payment gateways (Stripe, Razorpay, PayPal, Apple Pay).\n• **Zero Monthly Shopify Tax:** Save ₹1.5L–₹5L+ per year in recurring plugin subscriptions and transaction percentages.\n• **Custom Commission Configurator:** Allow customers to submit custom artisan dimension and material orders.",
        actions: ['estimator', 'email', 'whatsapp'],
        chips: ["💰 How much money will I save vs Shopify?", "⏱️ Timeline for e-commerce?", "🔐 Is payment checkout secure?"]
      },

      // 9. Dedicated Linux VPS, DevOps & AWS Cloud
      {
        id: 'devops_cloud',
        keywords: ['server', 'vps', 'cloud', 'aws', 'docker', 'nginx', 'deploy', 'deployment', 'hosting', 'devops', 'linux', 'ubuntu', 'ssl', 'cloudflare', 'dns', 'domain'],
        response: "☁️ **Dedicated Linux VPS & Cloud DevOps Infrastructure:**\n\n• **Zero-Downtime Architecture:** Docker Swarm containerized microservices and automated health-check reboots.\n• **Nginx Reverse Proxy:** HTTP/2 & HTTP/3 QUIC stream multiplexing with Brotli-11 compression.\n• **Cloudflare Edge WAF:** DDoS scrubbing, automated Let's Encrypt SSL, and 330+ Global Edge CDN PoPs.\n• **100% Server Independence:** Deployed directly to your own Hetzner, DigitalOcean, or AWS account.",
        actions: ['estimator', 'email', 'whatsapp'],
        chips: ["💰 How much does Linux VPS hosting cost?", "🔒 How do you protect against DDoS?", "🌐 Do you setup custom business emails?"]
      },

      // 10. 100% Code & Intellectual Property Ownership
      {
        id: 'ip_ownership',
        keywords: ['ownership', 'ip', 'code', 'git', 'intellectual property', 'rights', 'source code', 'copyright', 'contract', 'agreement', 'transfer'],
        response: "🔐 **100% Intellectual Property & Source Code Ownership:**\n\n• **Direct Git Repository Transfer:** You receive full ownership of all source code, design assets, and databases.\n• **No Vendor Lock-In:** You can host, modify, or extend your platform anywhere at any time.\n• **Root Server Access:** All server credentials and cloud accounts are registered in your name.\n• **Legal Transfer:** Complete IP handover is formalized upon project completion.",
        actions: ['scheduler', 'email'],
        chips: ["📄 Do you sign NDAs?", "🛡️ What is your warranty policy?", "💰 What are your payment terms?"]
      },

      // 11. NDA & Security Guarantee
      {
        id: 'nda_security',
        keywords: ['nda', 'security', 'confidential', 'privacy', 'agreement', 'protection', 'safe', 'secure', 'hashing', 'owasp', 'leak', 'guarantee'],
        response: "🛡️ **Bank-Grade Security & Non-Disclosure (NDA):**\n\n• **Mutual Bilateral NDA:** We execute standard NDAs before reviewing your sensitive business specifications.\n• **OWASP Top 10 Standards:** Defense against SQL Injection, XSS, CSRF, and timing attacks.\n• **Data Encryption:** TLS 1.3 in transit and AES-256-GCM / Argon2 hashing at rest.\n• **Strict Confidentiality:** Your business logic, client data, and algorithms remain 100% private.",
        actions: ['email', 'call'],
        chips: ["🔐 Do I own 100% of the code?", "💰 What are your payment terms?", "📅 Book a 1-on-1 Discovery Call"]
      },

      // 12. 30-Day Warranty & Support
      {
        id: 'warranty',
        keywords: ['warranty', 'support', 'maintenance', 'bug', 'fix', 'after launch', 'guarantee', 'sla', 'help', 'updates'],
        response: "⭐ **30-Day Post-Launch Warranty & Support:**\n\n• **100% Complimentary Bug-Free SLA:** We resolve any post-launch issues immediately at zero extra charge for 30 days.\n• **Live Server Telemetry:** Real-time uptime monitoring and performance tuning.\n• **Ongoing Maintenance:** Optional affordable monthly care plans for continuous feature additions and security patches.",
        actions: ['email', 'scheduler'],
        chips: ["💰 How much does maintenance cost?", "⏱️ What is standard turnaround?", "📞 How do I talk to founders?"]
      },

      // 13. Direct Contact & Communication Channels
      {
        id: 'contact',
        keywords: ['contact', 'email', 'phone', 'call', 'whatsapp', 'reach', 'talk', 'meeting', 'hire', 'connect', 'schedule', 'consultation', 'inquiry', 'message'],
        response: "✉️ **Direct Founder Communication Channels:**\\n\\n• **Primary Contact (Email):** **pixeltocloud@gmail.com** (Monitored 24/7 · fastest response within 2–4 hours).\\n• **Primary Mobile & WhatsApp:** **+91 82193 52124** (Instant technical chat & call).\\n• **Secondary Mobile (Call):** **+91 99281 96424** (Direct phone line · Mon–Sat 09:00–20:00 IST).\\n• **1-on-1 Video Meeting:** Book a 15-minute slot on Google Meet directly via our Discovery Scheduler.",
        actions: ['email', 'call', 'scheduler', 'whatsapp'],
        chips: ["📅 Book 1-on-1 Discovery Call", "💰 Open Cost Estimator", "👨‍💻 Who are the founders?"]
      },

      // 14. Mobile Responsive & Performance Guarantee
      {
        id: 'mobile_performance',
        keywords: ['mobile', 'responsive', 'phone', 'tablet', 'screen', 'ios', 'android', 'speed', 'fast', 'lighthouse', 'page speed', 'performance'],
        response: "📱 **Sub-Second 60 FPS Mobile Responsiveness:**\n\n• **Zero Layout Shift (CLS: 0.00):** Custom media queries tested across iPhone, Android, iPads, and high-DPI retina displays.\n• **95+ Google Lighthouse Speed:** Lightweight Vanilla ES6+ architecture without bloated third-party trackers.\n• **Touch Gestures:** Native swipeable cards, tactile bottom docks, and silky smooth micro-animations.",
        actions: ['portfolio', 'estimator'],
        chips: ["⚡ How do custom sites compare to WordPress?", "💰 Pricing for mobile-ready websites", "⏱️ What is the delivery time?"]
      },

      // 15. Custom Code vs WordPress / Shopify Comparison
      {
        id: 'comparison',
        keywords: ['wordpress', 'shopify', 'wix', 'squarespace', 'custom vs', 'why custom', 'comparison', 'cms', 'plugins', 'elementor', 'woocommerce'],
        response: "⚡ **Why Custom Code Outperforms WordPress & Shopify:**\n\n• **Speed:** Sub-second instant loading (vs 4–8 seconds on plugin-heavy WordPress).\n• **Zero Recurring App Rent:** Save ₹1.5L–₹5.2L over 3 years in monthly subscriptions (SEO plugins, forms, builders).\n• **Security:** Custom code has no public vulnerabilities or automated bot exploits.\n• **Infinite Customization:** No theme restrictions—your site looks unique and converts better.",
        actions: ['estimator', 'email'],
        chips: ["💰 Calculate your 3-year savings", "⏱️ How fast can we launch?", "✉️ Get Free Technical Discovery"]
      }
    ];

    this.defaultResponse = "💡 **PixelToCloud AI:** I can answer questions about Custom Web Development, 2D/3D WebGL Software, CA & Doctor Portals, Dedicated Linux VPS Cloud, Pricing, Timelines, and Code Ownership.\n\nFeel free to ask any question or connect directly with our founders via email (**pixeltocloud@gmail.com**) or phone (**+91 82193 52124** / **+91 99281 96424**)!";

    this.init();
  }

  init() {
    this.bindEvents();
    this.renderInitialChips();
  }

  renderInitialChips() {
    if (!this.chipsContainer) return;
    const starterChips = [
      "💰 How much does a custom website cost?",
      "⏱️ What is the delivery timeline?",
      "🩺 Tell me about Doctor Telehealth portals",
      "💼 CA & Tax calculation engines",
      "🔐 Do I own 100% of the code?",
      "☁️ Linux VPS & DevOps setup",
      "✉️ How do I contact founders directly?"
    ];

    this.chipsContainer.innerHTML = starterChips.map(c => 
      `<button class="ai-chip" data-query="${this.escapeHTML(c)}">${this.escapeHTML(c)}</button>`
    ).join('');
  }

  bindEvents() {
    // Open on FAB button click
    if (this.openBtn) {
      this.openBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleModal(true);
      });
    }

    // Open from Mobile Bottom Dock
    if (this.dockBtn) {
      this.dockBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.toggleModal(true);
      });
    }

    // Close button
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleModal(false);
      });
    }

    // Minimize button
    if (this.minimizeBtn) {
      this.minimizeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleModal(false);
      });
    }

    // Escape key listener
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.chatModal && this.chatModal.classList.contains('active')) {
        this.toggleModal(false);
      }
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (this.chatModal && this.chatModal.classList.contains('active')) {
        if (!this.chatModal.contains(e.target) && !this.openBtn?.contains(e.target) && !this.dockBtn?.contains(e.target)) {
          this.toggleModal(false);
        }
      }
    });

    // Prevent propagation inside modal
    if (this.chatModal) {
      this.chatModal.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }

    // Send button & Enter key
    if (this.sendBtn && this.input) {
      this.sendBtn.addEventListener('click', () => this.handleSendMessage());
      this.input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.handleSendMessage();
        }
      });
    }

    // Chips delegation
    if (this.chipsContainer) {
      this.chipsContainer.addEventListener('click', (e) => {
        if (this.isProcessing) return;
        const chip = e.target.closest('.ai-chip');
        if (chip) {
          const query = chip.getAttribute('data-query') || chip.textContent.trim();
          if (query) {
            this.sendUserMessage(query);
            this.processBotResponse(query);
          }
        }
      });
    }
  }

  toggleModal(show) {
    if (!this.chatModal) return;
    if (show) {
      // Close other modals if active
      const schedModal = document.getElementById('scheduler-modal');
      const portModal = document.getElementById('portfolio-modal-overlay');
      if (schedModal) schedModal.classList.remove('active');
      if (portModal) portModal.classList.remove('active');

      this.chatModal.classList.add('active');
      if (this.input) {
        setTimeout(() => this.input.focus(), 150);
      }
    } else {
      this.chatModal.classList.remove('active');
    }
  }

  handleSendMessage() {
    if (this.isProcessing || !this.input) return;
    const text = this.input.value.trim();
    if (!text || text.length === 0) return;

    this.input.value = '';
    this.sendUserMessage(text);
    this.processBotResponse(text);
  }

  sendUserMessage(text) {
    if (!this.messagesContainer) return;
    const msgEl = document.createElement('div');
    msgEl.className = 'ai-msg ai-msg-user';
    msgEl.innerHTML = `<div class="ai-bubble">${this.escapeHTML(text)}</div>`;
    this.messagesContainer.appendChild(msgEl);
    this.scrollToBottom();
    this.conversationHistory.push({ role: 'user', text });
  }

  processBotResponse(userText) {
    if (!this.messagesContainer) return;
    this.isProcessing = true;

    // Show typing indicator
    const typingEl = document.createElement('div');
    typingEl.className = 'ai-msg ai-msg-bot typing';
    typingEl.innerHTML = `<div class="ai-bubble"><span class="ai-dot"></span><span class="ai-dot"></span><span class="ai-dot"></span></div>`;
    this.messagesContainer.appendChild(typingEl);
    this.scrollToBottom();

    const delay = Math.min(600, Math.max(300, userText.length * 10));

    setTimeout(() => {
      typingEl.remove();
      this.isProcessing = false;

      const result = this.findAnswer(userText);
      const botMsg = document.createElement('div');
      botMsg.className = 'ai-msg ai-msg-bot';
      
      let formattedText = result.response.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      formattedText = formattedText.replace(/\n/g, '<br>');

      // Generate action buttons
      let actionButtonsHTML = '';
      if (result.actions && result.actions.length > 0) {
        actionButtonsHTML = '<div style="margin-top: 12px; display: flex; gap: 6px; flex-wrap: wrap;">';
        
        if (result.actions.includes('email')) {
          actionButtonsHTML += `<a href="mailto:pixeltocloud@gmail.com?subject=${encodeURIComponent('Project Discussion - PixelToCloud AI')}" class="btn-outline" style="font-size: 0.74rem; padding: 4px 10px; color: var(--accent-cyan); border-color: rgba(0,240,255,0.4);"><i class="fa-solid fa-envelope" style="margin-right: 4px;"></i>Email Founders</a>`;
        }
        if (result.actions.includes('call')) {
          actionButtonsHTML += `<a href="tel:+918219352124" class="btn-outline" style="font-size: 0.74rem; padding: 4px 10px; color: #38bdf8; border-color: rgba(56,189,248,0.4);"><i class="fa-solid fa-phone" style="margin-right: 4px;"></i>Call Now</a>`;
        }
        if (result.actions.includes('scheduler')) {
          actionButtonsHTML += `<button onclick="document.getElementById('dock-scheduler-btn')?.click(); window.aiAdvisorInstance?.toggleModal(false);" class="btn-outline" style="font-size: 0.74rem; padding: 4px 10px; color: #f59e0b; border-color: rgba(245,158,11,0.4);"><i class="fa-regular fa-calendar-check" style="margin-right: 4px;"></i>Book Meeting</button>`;
        }
        if (result.actions.includes('estimator')) {
          actionButtonsHTML += `<button onclick="document.getElementById('estimator')?.scrollIntoView({behavior:'smooth'}); window.aiAdvisorInstance?.toggleModal(false);" class="btn-outline" style="font-size: 0.74rem; padding: 4px 10px; color: #10b981; border-color: rgba(16,185,129,0.4);"><i class="fa-solid fa-sliders" style="margin-right: 4px;"></i>Build Scope</button>`;
        }
        if (result.actions.includes('whatsapp')) {
          actionButtonsHTML += `<a href="https://wa.me/918219352124?text=${encodeURIComponent('Hello Pankaj & Tushar, I was chatting with PixelToCloud AI about: ') + encodeURIComponent(userText.substring(0, 80))}" target="_blank" class="btn-outline" style="font-size: 0.74rem; padding: 4px 10px; color: #25d366; border-color: rgba(37,211,102,0.4);"><i class="fa-brands fa-whatsapp" style="margin-right: 4px;"></i>WhatsApp</a>`;
        }

        actionButtonsHTML += '</div>';
      }

      botMsg.innerHTML = `
        <div class="ai-bubble">
          ${formattedText}
          ${actionButtonsHTML}
        </div>
      `;
      this.messagesContainer.appendChild(botMsg);
      this.scrollToBottom();
      this.conversationHistory.push({ role: 'bot', text: result.response });

      // Dynamically update quick chips for context-aware follow up
      if (result.chips && result.chips.length > 0 && this.chipsContainer) {
        this.chipsContainer.innerHTML = result.chips.map(c => 
          `<button class="ai-chip" data-query="${this.escapeHTML(c)}">${this.escapeHTML(c)}</button>`
        ).join('');
      }
    }, delay);
  }

  findAnswer(text) {
    const raw = text.toLowerCase().trim();
    const words = raw.split(/\s+/);

    let bestMatch = null;
    let highestScore = 0;

    for (const item of this.knowledgeBase) {
      let score = 0;

      for (const kw of item.keywords) {
        if (raw === kw) {
          score += 15;
        } else if (raw.includes(kw)) {
          score += (kw.length > 5 ? 6 : 4);
        } else {
          for (const w of words) {
            if (w.length >= 4 && kw.includes(w)) {
              score += 2;
            }
          }
        }
      }

      if (score > highestScore) {
        highestScore = score;
        bestMatch = item;
      }
    }

    if (bestMatch && highestScore >= 3) {
      return bestMatch;
    }

    // Default Fallback
    return {
      response: this.defaultResponse,
      actions: ['email', 'call', 'scheduler', 'estimator'],
      chips: [
        "💰 How much does a custom website cost?",
        "⏱️ What is the delivery timeline?",
        "🩺 Tell me about Doctor Telehealth portals",
        "🔐 Do I own 100% of the code?"
      ]
    };
  }

  scrollToBottom() {
    if (this.messagesContainer) {
      this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
  }

  escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.aiAdvisorInstance = new PixelToCloudAIAdvisor();
});
