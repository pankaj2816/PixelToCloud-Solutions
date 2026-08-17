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
    this.messagesContainer = document.getElementById('ai-advisor-messages');
    this.input = document.getElementById('ai-advisor-input');
    this.sendBtn = document.getElementById('ai-advisor-send');
    this.chipsContainer = document.getElementById('ai-advisor-chips');

    this.knowledgeBase = [
      {
        keywords: ['doctor', 'clinic', 'hospital', 'medical', 'appointment', 'telehealth', 'patient'],
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
        response: "💰 **Pricing & Investment:**\nOur projects range from ₹12,000 ($150) for modern business websites to ₹28,000–₹48,000 ($350–$600+) for custom full-stack web apps, 3D WebGL software, and enterprise cloud portals. You can use our interactive **Cost Estimator** above for an exact breakdown!"
      },
      {
        keywords: ['pankaj', 'experience', 'who', 'founder', 'architect', 'hardware', 'background'],
        response: "👨‍💻 **About Lead Architect Pankaj:**\nPankaj is a Principal Systems Architect with **8–10+ years of dual software and hardware engineering experience**. He specializes in bridging full-stack web architecture, 3D graphics, and deep Linux server infrastructure for 99.99% uptime."
      },
      {
        keywords: ['timeline', 'delivery', 'time', 'how long', 'days'],
        response: "⏱️ **Project Timelines:**\nStandard business websites are delivered in **5–7 days**. Complex full-stack portals, CA suites, doctor telemedicine platforms, and 3D WebGL apps typically take **10–18 working days**."
      },
      {
        keywords: ['contact', 'whatsapp', 'call', 'phone', 'email', 'talk', 'meeting', 'hire', 'connect'],
        response: "📲 **Direct Connect:**\nYou can reach Pankaj directly on WhatsApp at **+91 82193 52124** or via email at **pppankaj2816@gmail.com**. Click the button below to start a direct chat!"
      }
    ];

    this.defaultResponse = "💡 **PixelToCloud AI:** I can help you with Custom Website Development, 2D/3D WebGL Software, CA & Doctor Portals, Art Boutiques, Linux VPS & AWS Server Deployments, and Pricing estimates.\n\nWould you like to connect directly with lead architect **Pankaj** on WhatsApp (+91 82193 52124)?";

    this.init();
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    if (this.openBtn) {
      this.openBtn.addEventListener('click', () => this.toggleModal(true));
    }
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.toggleModal(false));
    }

    if (this.sendBtn && this.input) {
      this.sendBtn.addEventListener('click', () => this.handleSendMessage());
      this.input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') this.handleSendMessage();
      });
    }

    // Quick prompt chips
    if (this.chipsContainer) {
      this.chipsContainer.addEventListener('click', (e) => {
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
      this.chatModal.classList.add('active');
      if (this.input) this.input.focus();
    } else {
      this.chatModal.classList.remove('active');
    }
  }

  handleSendMessage() {
    if (!this.input) return;
    const text = this.input.value.trim();
    if (!text) return;

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

    // Show typing indicator
    const typingEl = document.createElement('div');
    typingEl.className = 'ai-msg ai-msg-bot typing';
    typingEl.innerHTML = `<div class="ai-bubble"><span class="ai-dot"></span><span class="ai-dot"></span><span class="ai-dot"></span></div>`;
    this.messagesContainer.appendChild(typingEl);
    this.scrollToBottom();

    setTimeout(() => {
      typingEl.remove();

      const matched = this.findAnswer(userText);
      const botMsg = document.createElement('div');
      botMsg.className = 'ai-msg ai-msg-bot';
      
      let formattedText = matched.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      formattedText = formattedText.replace(/\n/g, '<br>');

      botMsg.innerHTML = `
        <div class="ai-bubble">
          ${formattedText}
          <div style="margin-top: 10px; display: flex; gap: 8px; flex-wrap: wrap;">
            <a href="https://wa.me/918219352124?text=${encodeURIComponent('Hi Pankaj, I was chatting with PixelToCloud AI about: ' + userText)}" target="_blank" class="btn-outline" style="font-size: 0.76rem; padding: 4px 12px; background: rgba(37,211,102,0.15); border-color: #25d366; color: #25d366;">
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
