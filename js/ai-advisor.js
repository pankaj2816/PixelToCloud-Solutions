/* ===================================================================
   PIXELTOCLOUD SOLUTIONS - AI VIRTUAL PROJECT ADVISOR
   Interactive intelligent consultation bot with NLP intent parsing & WhatsApp lead bridge
   =================================================================== */

class PixelToCloudAIAdvisor {
  constructor() {
    this.widget = document.getElementById('ai-advisor-widget');
    this.chatModal = document.getElementById('ai-advisor-modal');
    this.openBtn = document.getElementById('ai-advisor-trigger');
    this.closeBtn = document.getElementById('ai-advisor-close');
    this.minimizeBtn = document.getElementById('ai-advisor-minimize');
    this.messagesContainer = document.getElementById('ai-advisor-messages');
    this.input = document.getElementById('ai-advisor-input');
    this.sendBtn = document.getElementById('ai-advisor-send');
    this.chipsContainer = document.getElementById('ai-advisor-chips');

    this.isProcessing = false;

    this.knowledgeBase = [
      {
        keywords: ['doctor', 'clinic', 'hospital', 'medical', 'appointment', 'telehealth', 'patient', 'health', 'cancer', 'oncology'],
        response: "🩺 **Doctor & Clinic Telehealth Portals:**\nWe build full medical suites featuring real-time appointment booking with calendar sync, encrypted patient EHR records, digital PDF prescription generators, video consultation rooms (WebRTC), and instant WhatsApp/SMS booking notifications. Typical turnaround: 10–14 days."
      },
      {
        keywords: ['ca', 'chartered accountant', 'tax', 'gst', 'audit', 'accounting', 'ledger', 'finance', 'fintech'],
        response: "💼 **CA & FinTech Hubs:**\nWe engineer specialized portals for Chartered Accountants with automated GST & Income Tax calculation engines, 256-bit AES encrypted client document lockers, automated billing, and secure client audit trails."
      },
      {
        keywords: ['3d', '2d', 'webgl', 'three.js', 'threejs', 'graphics', 'canvas', 'cad', 'visualizer'],
        response: "🧊 **2D/3D WebGL Software:**\nWe build hardware-accelerated 60 FPS 3D applications, interactive product visualizers with orbit/lighting controls, customizable shaders (GLSL), and 2D Canvas CAD editing tools right in the web browser."
      },
      {
        keywords: ['art', 'craft', 'ecommerce', 'e-commerce', 'shop', 'store', 'cart', 'payment'],
        response: "🎨 **Luxury Art & Craft E-Commerce:**\nWe build high-converting aesthetic boutiques featuring 360-degree interactive artwork texture inspectors, multi-currency checkout (Stripe, Razorpay), custom artisan commission builders, and automated inventory sync."
      },
      {
        keywords: ['server', 'vps', 'cloud', 'aws', 'docker', 'nginx', 'deploy', 'deployment', 'hosting', 'devops', 'linux', 'ubuntu'],
        response: "☁️ **Server, Cloud & DevOps:**\nWe configure dedicated Linux VPS (Ubuntu/Debian), AWS cloud clusters, containerized Docker microservices, Nginx reverse proxy with HTTP/2 acceleration, Let's Encrypt SSL, and zero-downtime CI/CD pipelines."
      },
      {
        keywords: ['domain', 'dns', 'email', 'mail', 'cloudflare', 'ssl'],
        response: "🌐 **Domain, DNS & Business Mail:**\nWe manage the entire setup: custom domain registration, Cloudflare edge CDN & DDoS protection, automated SSL certificates, and 10/10 deliverability business email setup (SPF, DKIM, DMARC)."
      },
      {
        keywords: ['price', 'cost', 'budget', 'rate', 'how much', 'quote', 'pricing', 'charges', 'fees'],
        response: "💰 **Flexible Milestone-Based Investment:**\nWe tailor our architecture and milestone roadmap to your exact business stage—from budget-friendly local MVPs to high-scale enterprise cloud systems. All work is structured into transparent, pay-per-milestone deliverables with zero upfront risk. Use our interactive **Solution Builder & Scope Estimator** above to configure your roadmap!"
      },
      {
        keywords: ['bhavyansh', 'pankaj', 'experience', 'who', 'founder', 'architect', 'hardware', 'background'],
        response: "👨‍💻 **About Lead Architect Bhavyansh Agarwal:**\nBhavyansh Agarwal is a Principal Systems Architect with **8–10+ years of dual software and hardware engineering experience**. He specializes in bridging full-stack web architecture, 3D graphics, and deep Linux server infrastructure for 99.99% uptime."
      },
      {
        keywords: ['timeline', 'delivery', 'time', 'how long', 'days'],
        response: "⏱️ **Project Timelines:**\nStandard business websites are delivered in **5–7 days**. Complex full-stack portals, CA suites, doctor telemedicine platforms, and 3D WebGL apps typically take **10–18 working days**."
      },
      {
        keywords: ['contact', 'whatsapp', 'call', 'phone', 'email', 'talk', 'meeting', 'hire', 'connect'],
        response: "✉️ **Direct Founder Connect:**\n• **Primary Contact (Email):** **pixeltocloud@gmail.com** (Fastest response within 2-4 hours)\n• **Phone Call:** **+91 82193 52124**\n• **WhatsApp Chat:** **+91 82193 52124**\n\nFeel free to send an email inquiry or call directly!"
      }
    ];

    this.defaultResponse = "💡 **PixelToCloud AI:** I can help you with Custom Website Development, 2D/3D WebGL Software, CA & Doctor Portals, Art Boutiques, Linux VPS & AWS Server Deployments, and Pricing estimates.\n\nYou can reach our founders directly via email at **pixeltocloud@gmail.com** or phone/WhatsApp at **+91 82193 52124**.";

    this.init();
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    // Toggle on FAB button click
    if (this.openBtn) {
      this.openBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = this.chatModal && this.chatModal.classList.contains('active');
        this.toggleModal(!isOpen);
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

    // Close when pressing Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.chatModal && this.chatModal.classList.contains('active')) {
        this.toggleModal(false);
      }
    });

    // Close when clicking outside of modal
    document.addEventListener('click', (e) => {
      if (this.chatModal && this.chatModal.classList.contains('active')) {
        if (!this.chatModal.contains(e.target) && !this.openBtn?.contains(e.target)) {
          this.toggleModal(false);
        }
      }
    });

    // Prevent clicks inside modal from propagating to document
    if (this.chatModal) {
      this.chatModal.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }

    // Send button & enter key
    if (this.sendBtn && this.input) {
      this.sendBtn.addEventListener('click', () => this.handleSendMessage());
      this.input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.handleSendMessage();
        }
      });
    }

    // Quick prompt chips
    if (this.chipsContainer) {
      this.chipsContainer.addEventListener('click', (e) => {
        if (this.isProcessing) return;
        const chip = e.target.closest('.ai-chip');
        if (chip) {
          const query = chip.getAttribute('data-query');
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
      // Close other modals if active to prevent overlapping z-indexes
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

    setTimeout(() => {
      typingEl.remove();
      this.isProcessing = false;

      const matched = this.findAnswer(userText);
      const botMsg = document.createElement('div');
      botMsg.className = 'ai-msg ai-msg-bot';
      
      let formattedText = matched.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      formattedText = formattedText.replace(/\n/g, '<br>');

      const encodedUserQuery = encodeURIComponent(userText.substring(0, 100));

      botMsg.innerHTML = `
        <div class="ai-bubble">
          ${formattedText}
          <div style="margin-top: 10px; display: flex; gap: 8px; flex-wrap: wrap;">
            <a href="https://wa.me/918219352124?text=${encodeURIComponent('Hi Bhavyansh Agarwal, I was chatting with PixelToCloud AI about: ') + encodedUserQuery}" target="_blank" class="btn-outline" style="font-size: 0.76rem; padding: 4px 12px; background: rgba(37,211,102,0.15); border-color: #25d366; color: #25d366;">
              📲 Chat on WhatsApp
            </a>
            <button onclick="document.getElementById('estimator')?.scrollIntoView({behavior:'smooth'}); window.aiAdvisorInstance?.toggleModal(false);" class="btn-outline" style="font-size: 0.76rem; padding: 4px 12px;">
              💰 Calculate Cost
            </button>
          </div>
        </div>
      `;
      this.messagesContainer.appendChild(botMsg);
      this.scrollToBottom();
    }, 600);
  }

  findAnswer(text) {
    const clean = text.toLowerCase();

    for (const item of this.knowledgeBase) {
      for (const kw of item.keywords) {
        if (clean.includes(kw)) {
          return item.response;
        }
      }
    }
    return this.defaultResponse;
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
