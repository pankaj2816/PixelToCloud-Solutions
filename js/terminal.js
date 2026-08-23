/* ===================================================================
   PIXELTOCLOUD SOLUTIONS - LIVE DEVOPS & TERMINAL DEPLOYMENT PIPELINE
   Real-time DevOps visualization, Bash simulation, interactive CLI & Easter Eggs
   =================================================================== */

class LiveDeploymentTerminal {
  constructor() {
    this.body = document.getElementById('terminal-log-body');
    this.pipelineCards = document.querySelectorAll('.pipeline-step-card');
    this.cliInput = document.getElementById('terminal-cli-input');
    this.playPauseBtn = document.getElementById('terminal-toggle-btn');
    this.restartBtn = document.getElementById('terminal-restart-btn');
    this.audioEnabled = false;
    this.audioCtx = null;

    this.logs = [
      { step: 0, type: 'cmd', text: 'git checkout main && git pull origin main' },
      { step: 0, type: 'info', text: '-> Remote branch up-to-date. Commit hash: #7f3a9e2' },
      { step: 0, type: 'cmd', text: 'npm run test && npm run build --prod' },
      { step: 0, type: 'success', text: '<i class="fa-solid fa-check" style="margin-right: 4px;"></i>Automated Unit & E2E tests: 142/142 passed (0 warnings)' },
      { step: 0, type: 'info', text: '<i class="fa-solid fa-check" style="margin-right: 4px;"></i>Production bundles minified: 84.2 kB gzip (PageSpeed score: 99)' },
      
      { step: 1, type: 'cmd', text: 'docker build -t pixeltocloud/app:v3.2.0 .' },
      { step: 1, type: 'info', text: '[+] Building 4.8s (12/12) FINISHED' },
      { step: 1, type: 'info', text: '=> [internal] load build definition from Dockerfile' },
      { step: 1, type: 'info', text: '=> exporting to image -- alpine-node-nginx runtime' },
      { step: 1, type: 'success', text: '<i class="fa-solid fa-check" style="margin-right: 4px;"></i>Image prod/app:v3.2.0 created & pushed to local registry' },

      { step: 2, type: 'cmd', text: 'docker-compose up -d --no-deps --build app' },
      { step: 2, type: 'info', text: 'Recreating container: app-blue ... done (0 downtime switch)' },
      { step: 2, type: 'cmd', text: 'nginx -t && nginx -s reload' },
      { step: 2, type: 'success', text: '<i class="fa-solid fa-check" style="margin-right: 4px;"></i>Nginx configuration syntax test is successful' },
      { step: 2, type: 'success', text: '<i class="fa-solid fa-check" style="margin-right: 4px;"></i>Nginx reverse proxy reloaded with HTTP/2 & Gzip compression' },

      { step: 3, type: 'cmd', text: 'certbot --nginx -d clientdomain.com --non-interactive' },
      { step: 3, type: 'info', text: 'Verifying DNS challenge with Cloudflare API...' },
      { step: 3, type: 'success', text: '<i class="fa-solid fa-check" style="margin-right: 4px;"></i>SSL Certificate generated & renewed automatically (A+ Rating)' },
      { step: 3, type: 'cmd', text: 'curl -I https://clientdomain.com' },
      { step: 3, type: 'success', text: '<i class="fa-solid fa-check" style="margin-right: 4px;"></i>HTTP/2 200 OK | TTFB: 42ms | Cloudflare Edge Cache: HIT' },
      { step: 3, type: 'info', text: '<i class="fa-solid fa-rocket" style="margin-right: 4px;"></i>SYSTEM LIVE: Deployment completed in 3.84s.' }
    ];

    this.currentIndex = 0;
    this.isRunning = false;
    this.intervalId = null;

    this.init();
  }

  init() {
    if (!this.body) return;
    this.startSimulation();
    this.bindControls();
    this.bindInteractiveCLI();
  }

  playKeySound() {
    if (!this.audioEnabled) return;
    try {
      if (!this.audioCtx) {
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600 + Math.random() * 200, this.audioCtx.currentTime);
      gain.gain.setValueAtTime(0.04, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.04);
    } catch (e) {
      // Audio not supported or blocked by browser policy
    }
  }

  startSimulation() {
    clearInterval(this.intervalId);

    // If at end, loop back
    if (this.currentIndex >= this.logs.length) {
      this.currentIndex = 0;
      if (this.body) this.body.innerHTML = '';
      this.updatePipelineStep(-1);
    }

    this.isRunning = true;
    if (this.playPauseBtn) {
      this.playPauseBtn.innerHTML = '<i class="fa-solid fa-pause" style="margin-right: 4px;"></i>Pause Logs';
    }

    this.intervalId = setInterval(() => {
      if (this.currentIndex < this.logs.length) {
        this.appendLog(this.logs[this.currentIndex]);
        this.updatePipelineStep(this.logs[this.currentIndex].step);
        this.currentIndex++;
      } else {
        clearInterval(this.intervalId);
        this.isRunning = false;
        if (this.playPauseBtn) {
          this.playPauseBtn.innerHTML = '<i class="fa-solid fa-rotate-right" style="margin-right: 4px;"></i>Replay Logs';
        }
        this.appendLine('info', 'Type "help" in the CLI input below to explore commands & Easter eggs (matrix, benchmark, founders, coffee, audio).');
      }
    }, 900);
  }

  pauseSimulation() {
    this.isRunning = false;
    clearInterval(this.intervalId);
    if (this.playPauseBtn) {
      this.playPauseBtn.innerHTML = '<i class="fa-solid fa-play" style="margin-right: 4px;"></i>Resume Logs';
    }
  }

  restartSimulation() {
    clearInterval(this.intervalId);
    this.currentIndex = 0;
    if (this.body) this.body.innerHTML = '';
    this.updatePipelineStep(-1);
    this.startSimulation();
    if (window.showToast) {
      window.showToast('🔄 CI/CD Zero-Downtime Deployment Simulation Re-Started', 'info');
    }
  }

  appendLog(log) {
    this.playKeySound();
    let lineHTML = '';
    if (log.type === 'cmd') {
      lineHTML = `
        <div class="terminal-line">
          <span class="terminal-prompt">deployer@pixeltocloud-engine:~$</span>
          <span style="color: #f8fafc; font-weight: 500;">${log.text}</span>
        </div>
      `;
    } else if (log.type === 'success') {
      lineHTML = `
        <div class="terminal-line">
          <span class="terminal-success">${log.text}</span>
        </div>
      `;
    } else {
      lineHTML = `
        <div class="terminal-line">
          <span class="terminal-info">${log.text}</span>
        </div>
      `;
    }

    this.body.insertAdjacentHTML('beforeend', lineHTML);
    this.body.scrollTop = this.body.scrollHeight;
  }

  appendLine(type, text) {
    this.playKeySound();
    const line = document.createElement('div');
    line.className = 'terminal-line';
    if (type === 'cmd') {
      line.innerHTML = `<span class="terminal-prompt">user@guest:~$</span> <span>${text}</span>`;
    } else if (type === 'success') {
      line.innerHTML = `<span class="terminal-success">${text}</span>`;
    } else if (type === 'error') {
      line.innerHTML = `<span style="color: #ef4444;">${text}</span>`;
    } else {
      line.innerHTML = `<span class="terminal-info">${text}</span>`;
    }
    this.body.appendChild(line);
    this.body.scrollTop = this.body.scrollHeight;
  }

  updatePipelineStep(stepIndex) {
    if (!this.pipelineCards || this.pipelineCards.length === 0) return;

    this.pipelineCards.forEach((card, idx) => {
      if (stepIndex >= 0 && idx <= stepIndex) {
        card.classList.add('active');
        const status = card.querySelector('.pipeline-step-status');
        if (status) status.innerHTML = '<i class="fa-solid fa-check" style="margin-right: 4px;"></i>Complete';
      } else {
        card.classList.remove('active');
        const status = card.querySelector('.pipeline-step-status');
        if (status) status.textContent = 'Pending';
      }
    });
  }

  bindControls() {
    if (this.playPauseBtn) {
      this.playPauseBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (this.isRunning) {
          this.pauseSimulation();
        } else {
          this.startSimulation();
        }
      });
    }

    if (this.restartBtn) {
      this.restartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.restartSimulation();
      });
    }
  }

  bindInteractiveCLI() {
    if (!this.cliInput) return;

    this.cliInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = this.cliInput.value.trim().toLowerCase();
        this.cliInput.value = '';
        if (!cmd) return;

        this.appendLine('cmd', cmd);
        this.handleCLICommand(cmd);
      }
    });
  }

  handleCLICommand(cmd) {
    switch (cmd) {
      case 'help':
        this.appendLine('info', 'Available commands: [status, services, deploy, clear, contact, uptime, quote, whoami, matrix, benchmark, founders, coffee, audio]');
        break;
      case 'status':
        this.appendLine('success', '✔ All Systems Operational: Docker Cluster (Healthy), Nginx (Active), DNS (Propagated), Latency (24ms).');
        break;
      case 'services':
        this.appendLine('info', 'Services: Website Dev, 2D/3D WebGL Software, CA Tax Hubs, Doctor Portals, Art Ecommerce, VPS/Cloud DevOps, Domain/Mail.');
        break;
      case 'deploy':
        this.appendLine('info', 'Triggering live re-deploy simulation...');
        this.restartSimulation();
        break;
      case 'clear':
        if (this.body) this.body.innerHTML = '';
        break;
      case 'contact':
        this.appendLine('success', 'Primary Email: pixeltocloud@gmail.com | Primary Mobile / WhatsApp: +91 82193 52124 | Secondary Mobile (Call): +91 99281 96424');
        break;
      case 'uptime':
        this.appendLine('success', 'Uptime: 99.99% | SLA: Guaranteed Zero-Downtime');
        break;
      case 'quote':
        this.appendLine('info', 'Redirecting to direct consultation...');
        window.location.hash = '#contact';
        break;
      case 'whoami':
        this.appendLine('info', 'You are connected to PixelToCloud Engine (Co-Founded by Bhavyansh Agarwal & Tushar Singhal).');
        break;
      case 'founders':
        this.appendLine('info', 'Founders: Bhavyansh Agarwal (8–10+ Yrs Hardware/Software Architect) & Tushar Singhal (5+ Yrs Full-Stack Lead).');
        break;
      case 'matrix':
        this.appendLine('success', 'Wake up, Neo... The Matrix has you. 🟢 Follow the white rabbit.');
        for (let i = 0; i < 4; i++) {
          const binary = Array.from({ length: 32 }, () => Math.random() > 0.5 ? '1' : '0').join(' ');
          this.appendLine('success', binary);
        }
        break;
      case 'benchmark':
        const fps = Math.floor(58 + Math.random() * 4);
        this.appendLine('success', `⚡ GPU Canvas Render Test: ${fps} FPS | Memory Heap: 18.2 MB | WebGL2: Hardware-Accelerated.`);
        break;
      case 'coffee':
        this.appendLine('success', '☕ Fresh coffee brewed! Ready to write clean, high-performance code.');
        break;
      case 'audio':
        this.audioEnabled = !this.audioEnabled;
        this.appendLine('success', this.audioEnabled ? '🔊 Terminal mechanical audio feedback ENABLED' : '🔇 Terminal audio MUTED');
        break;
      default:
        this.appendLine('error', `Command not found: "${cmd}". Type "help" for a list of valid commands.`);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.terminalInstance = new LiveDeploymentTerminal();
});
