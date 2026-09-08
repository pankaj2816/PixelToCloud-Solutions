/**
 * PixelToCloud - Sovereign AI Platform Controller
 * Inspired by Coredge Dflare AI architecture & interactive controls.
 * Manages sticky sub-nav, layered architecture inspector, use-case tabs,
 * pipeline simulator, economics calculator, and FAQ accordion.
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickySubNav();
  initArchitectureLayers();
  initUseCaseTabs();
  initPipelineStudio();
  initEconomicsCalculator();
  initAiFAQ();
});

// ==========================================
// 1. STICKY SUB-NAVIGATION & SCROLL SPY
// ==========================================
function initStickySubNav() {
  const subNav = document.getElementById('ai-sub-nav');
  const subNavLinks = document.querySelectorAll('.sub-nav-link');
  const sections = document.querySelectorAll('section[id]');

  if (!subNav || !subNavLinks.length) return;

  // Smooth scroll click
  subNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          const subNavHeight = subNav.offsetHeight || 60;
          const targetTop = targetSection.getBoundingClientRect().top + window.pageYOffset - (subNavHeight + 74);
          window.scrollTo({ top: targetTop, behavior: 'smooth' });
        }
      }
    });
  });

  // Scroll spy to highlight active section
  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.pageYOffset + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    subNavLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentId) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

// ==========================================
// 2. LAYERED SYSTEM ARCHITECTURE INSPECTOR
// ==========================================
function initArchitectureLayers() {
  const layerCards = document.querySelectorAll('.arch-layer-card');
  const inspectorTitle = document.getElementById('layer-inspector-title');
  const inspectorDesc = document.getElementById('layer-inspector-desc');
  const inspectorTech = document.getElementById('layer-inspector-tech');
  const inspectorMetrics = document.getElementById('layer-inspector-metrics');

  if (!layerCards.length || !inspectorTitle) return;

  const layerData = {
    '1': {
      title: 'Layer 01 — GPU & Infrastructure Fabric',
      desc: 'Dedicated bare-metal NVIDIA Tensor Core GPUs (H100/A100/L40S) connected via ultra-low latency InfiniBand networking with zero virtualization hypervisor penalty.',
      tech: ['NVIDIA H100/A100', 'CUDA 12.x', 'InfiniBand / 100GbE', 'Kubernetes (K8s)', 'Linux Kernel 6.x Tuning'],
      metrics: 'Zero Hypervisor Overhead | Direct PCIe Gen 5 Memory Access | 99.99% Hardware Uptime SLA'
    },
    '2': {
      title: 'Layer 02 — Data & Vector Ingestion Pipeline',
      desc: 'Real-time document parser and multi-tenant vector embedding pipeline. Integrates directly with PostgreSQL operational databases using pgvector HNSW indexing and cross-encoder rerankers.',
      tech: ['pgvector (HNSW Indexing)', 'LayoutLM OCR Vision', 'Cohere Rerank-3 / BGE-M3', 'Apache Kafka / Redis', 'S3 Vault Storage'],
      metrics: 'Sub-15ms Vector Scan | Top-K Cosine Precision: 99.2% | Automated PII Redaction at Rest'
    },
    '3': {
      title: 'Layer 03 — Inference & Reasoning Runtimes',
      desc: 'High-throughput private model execution cluster powered by vLLM and TensorRT-LLM. Supports continuous batching, PagedAttention, and custom LoRA adapter hot-swapping.',
      tech: ['vLLM Orchestrator', 'TensorRT-LLM', 'Llama 3.3 70B', 'DeepSeek-R1', '4-bit AWQ Quantization', 'FastAPI Async'],
      metrics: 'Sub-40ms TTFT | 94+ tokens/sec throughput per stream | 100% Isolated Private VPC'
    },
    '4': {
      title: 'Layer 04 — Enterprise Gateways & Multi-Agent Swarms',
      desc: 'Autonomous LangGraph state machines executing deterministic multi-step business logic across databases, WhatsApp, Slack, and corporate ERP systems.',
      tech: ['LangGraph State Machine', 'Dynamic SQL Sandbox', 'REST & gRPC Gateways', 'ERP Integrators', 'Role-Based Access (RBAC)'],
      metrics: 'Zero Hallucination Grounding | Verifiable Citation Trails | Automated Audit Reconciliation'
    }
  };

  layerCards.forEach(card => {
    card.addEventListener('click', () => {
      const layerId = card.getAttribute('data-layer');
      layerCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const data = layerData[layerId];
      if (data) {
        inspectorTitle.textContent = data.title;
        inspectorDesc.textContent = data.desc;
        inspectorMetrics.textContent = data.metrics;

        if (inspectorTech) {
          inspectorTech.innerHTML = data.tech.map(t => '<span class="bento-tech-chip">' + t + '</span>').join(' ');
        }
      }
    });
  });
}

// ==========================================
// 3. INDUSTRY USE CASE TABS
// ==========================================
function initUseCaseTabs() {
  const tabs = document.querySelectorAll('.use-case-tab-btn');
  const panels = document.querySelectorAll('.use-case-panel');

  if (!tabs.length || !panels.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-case');
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const activePanel = document.getElementById('case-panel-' + target);
      if (activePanel) {
        activePanel.classList.add('active');
      }
    });
  });
}

// ==========================================
// 4. ENTERPRISE PIPELINE SIMULATOR
// ==========================================
function initPipelineStudio() {
  const pipelineTabs = document.querySelectorAll('.pipeline-tab-btn');
  const runBtn = document.getElementById('run-pipeline-btn');
  const nodesContainer = document.getElementById('pipeline-nodes-container');
  const consoleOutput = document.getElementById('pipeline-console-output');
  const ttftMetric = document.getElementById('metric-ttft');
  const tokensMetric = document.getElementById('metric-tokens');
  const totalLatencyMetric = document.getElementById('metric-latency');
  const securityBadge = document.getElementById('metric-security');

  if (!pipelineTabs.length || !runBtn || !nodesContainer || !consoleOutput) return;

  const pipelines = {
    rag: {
      name: 'Enterprise Knowledge RAG Engine',
      metrics: { ttft: '38 ms', tokens: '94 tok/s', latency: '142 ms', security: '100% Private VPC' },
      nodes: [
        { id: 1, label: 'Client Query Ingestion', sub: 'Sanitization & Tokenization', icon: 'fa-terminal', status: 'ready' },
        { id: 2, label: 'Hybrid Vector Search', sub: 'pgvector + BM25 (Cosine 0.94)', icon: 'fa-database', status: 'idle' },
        { id: 3, label: 'Cross-Encoder Reranker', sub: 'Cohere Rerank-3 / BGE-M3', icon: 'fa-filter', status: 'idle' },
        { id: 4, label: 'Grounded LLM Reasoning', sub: 'Llama-3 70B (Private vLLM)', icon: 'fa-brain', status: 'idle' },
        { id: 5, label: 'Synthesized Response', sub: 'Citations & Confidence 99.8%', icon: 'fa-circle-check', status: 'idle' }
      ],
      samplePayload: {
        timestamp: new Date().toISOString(),
        platform: "PIXELTOCLOUD_SOVEREIGN_AI_V4",
        pipeline: "ENTERPRISE_RAG_HYBRID",
        query: "What is the warranty and liability protocol for clause 14.2 in vendor agreements?",
        vector_retrieval: {
          index: "pgvector_hnsw_cosine",
          chunks_scanned: 14200,
          top_k_candidates: 12,
          rerank_score: 0.962,
          source_documents: [
            "Legal_Vendor_Master_2025.pdf#page=42",
            "Executive_Risk_Protocol_v4.docx#section=14"
          ]
        },
        guardrail_audit: {
          pii_scrubbed: true,
          hallucination_index: 0.002,
          jailbreak_risk: "ZERO"
        },
        output_synthesis: {
          answer: "Under Clause 14.2, vendor liability is capped at 12 months aggregate fees, excluding gross negligence and breach of Section 8 confidentiality.",
          verifiable_citations: 2,
          latency_breakdown_ms: { embedding: 18, vector_search: 22, reranking: 34, llm_generation: 68 }
        }
      }
    },
    idp: {
      name: 'Intelligent Document Processing (IDP)',
      metrics: { ttft: '52 ms', tokens: '112 tok/s', latency: '285 ms', security: 'Encrypted at Rest' },
      nodes: [
        { id: 1, label: 'PDF / Scanned Ingest', sub: 'Multi-Page High-Res Ingest', icon: 'fa-file-invoice', status: 'ready' },
        { id: 2, label: 'Multi-Modal Vision OCR', sub: 'Bounding Box & Coordinate Map', icon: 'fa-eye', status: 'idle' },
        { id: 3, label: 'Pydantic Schema Parser', sub: 'GSTIN, Line Items & Totals', icon: 'fa-code', status: 'idle' },
        { id: 4, label: 'Cross-Check Audit Engine', sub: 'Tax Rules & Math Verification', icon: 'fa-calculator', status: 'idle' },
        { id: 5, label: 'PostgreSQL ERP Mutation', sub: 'Direct Ledger Entry Created', icon: 'fa-server', status: 'idle' }
      ],
      samplePayload: {
        timestamp: new Date().toISOString(),
        platform: "PIXELTOCLOUD_SOVEREIGN_AI_V4",
        pipeline: "IDP_DOCUMENT_EXTRACTION",
        input_document: "INVOICE_TAX_2025_0981.PDF",
        ocr_confidence: 0.994,
        extracted_entities: {
          vendor_gstin: "07AAAAA0000A1Z5",
          invoice_number: "INV-2025-8841",
          invoice_date: "2025-08-14",
          currency: "INR",
          subtotal: 125000.00,
          cgst_9pct: 11250.00,
          sgst_9pct: 11250.00,
          total_taxable_amount: 147500.00,
          line_items_count: 4
        },
        reconciliation_status: "MATCHED_WITH_PO_4412",
        database_action: "INSERT_INTO_ACCOUNTS_PAYABLE_SUCCESS",
        human_review_required: false
      }
    },
    agent: {
      name: 'Autonomous Agent Swarm',
      metrics: { ttft: '42 ms', tokens: '86 tok/s', latency: '198 ms', security: 'Role-Based Auth' },
      nodes: [
        { id: 1, label: 'Incoming Event Trigger', sub: 'Webhook / Escalation Event', icon: 'fa-bolt', status: 'ready' },
        { id: 2, label: 'Intent & Entity Triage', sub: 'Deterministic State Machine', icon: 'fa-network-wired', status: 'idle' },
        { id: 3, label: 'Dynamic SQL Tool-Call', sub: 'Read Customer History & Orders', icon: 'fa-database', status: 'idle' },
        { id: 4, label: 'Policy Verification Gate', sub: 'Refund & SLA Rule Bounds', icon: 'fa-shield-halved', status: 'idle' },
        { id: 5, label: 'Omni-Channel Execution', sub: 'WhatsApp Sync + Ledger Update', icon: 'fa-paper-plane', status: 'idle' }
      ],
      samplePayload: {
        timestamp: new Date().toISOString(),
        platform: "PIXELTOCLOUD_SOVEREIGN_AI_V4",
        agent_runtime: "LANGGRAPH_STATE_MACHINE",
        trigger: "CUSTOMER_DISPUTE_EVENT_WHATSAPP",
        state_transitions: [
          { step: 1, action: "TRIAGE_INTENT", classification: "DAMAGED_SHIPMENT_REFUND", confidence: 0.97 },
          { step: 2, action: "CALL_TOOL_SQL_LOOKUP", query: "SELECT * FROM orders WHERE id='ORD-9912'", result: "FOUND_DISPATCHED_3_DAYS_AGO" },
          { step: 3, action: "POLICY_AUDIT", check: "ELIGIBLE_UNDER_48H_WINDOW", approved: true },
          { step: 4, action: "TRIGGER_PAYMENT_GATEWAY", tool: "Razorpay_Refund_API", refund_id: "rfnd_99182a", status: "PROCESSED" }
        ],
        final_dispatch: {
          whatsapp_notification_sent: true,
          internal_slack_alert: "DISPUTE_RESOLVED_AUTOMATICALLY_IN_4.2s",
          erp_reconciliation: "CREDIT_NOTE_CREATED_CN_8819"
        }
      }
    }
  };

  let currentKey = 'rag';
  let isExecuting = false;

  function renderNodes(pipeline) {
    nodesContainer.innerHTML = '';
    pipeline.nodes.forEach((node, idx) => {
      const nodeEl = document.createElement('div');
      nodeEl.className = 'pipeline-node node-' + node.status;
      nodeEl.id = 'node-step-' + node.id;
      nodeEl.innerHTML = `
        <div class="node-icon-wrapper">
          <i class="fa-solid ${node.icon}"></i>
          <span class="node-step-index">0${node.id}</span>
        </div>
        <div class="node-content">
          <div class="node-label">${node.label}</div>
          <div class="node-sub">${node.sub}</div>
        </div>
      `;
      nodesContainer.appendChild(nodeEl);

      if (idx < pipeline.nodes.length - 1) {
        const line = document.createElement('div');
        line.className = 'pipeline-connector';
        line.id = 'connector-' + node.id;
        line.innerHTML = '<span class="connector-pulse"></span>';
        nodesContainer.appendChild(line);
      }
    });

    if (ttftMetric) ttftMetric.textContent = pipeline.metrics.ttft;
    if (tokensMetric) tokensMetric.textContent = pipeline.metrics.tokens;
    if (totalLatencyMetric) totalLatencyMetric.textContent = pipeline.metrics.latency;
    if (securityBadge) securityBadge.textContent = pipeline.metrics.security;
  }

  function syntaxHighlightJSON(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
      let cls = 'hl-number';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'hl-key';
        } else {
          cls = 'hl-string';
        }
      } else if (/true|false/.test(match)) {
        cls = 'hl-boolean';
      } else if (/null/.test(match)) {
        cls = 'hl-null';
      }
      return '<span class="' + cls + '">' + match + '</span>';
    });
  }

  function streamPayloadToConsole(payload) {
    consoleOutput.innerHTML = '';
    const fullText = JSON.stringify(payload, null, 2);
    let i = 0;
    const chunkSize = 25;

    function streamStep() {
      if (i < fullText.length) {
        const nextSlice = fullText.substring(0, i + chunkSize);
        consoleOutput.innerHTML = syntaxHighlightJSON(nextSlice) + '<span class="cursor-blink">|</span>';
        consoleOutput.scrollTop = consoleOutput.scrollHeight;
        i += chunkSize;
        requestAnimationFrame(streamStep);
      } else {
        consoleOutput.innerHTML = syntaxHighlightJSON(fullText);
      }
    }
    requestAnimationFrame(streamStep);
  }

  function runSimulation() {
    if (isExecuting) return;
    isExecuting = true;
    runBtn.disabled = true;
    runBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> <span>Processing Pipeline...</span>';

    const pipeline = pipelines[currentKey];
    const totalSteps = pipeline.nodes.length;
    let step = 0;

    document.querySelectorAll('.pipeline-node').forEach(n => {
      n.classList.remove('node-active', 'node-completed');
      n.classList.add('node-idle');
    });
    document.querySelectorAll('.pipeline-connector').forEach(c => {
      c.classList.remove('active');
    });

    consoleOutput.innerHTML = `<span style="color: #64748b;">// Initializing ${pipeline.name}...</span>\n<span style="color: #bedd00;">// Dispatching vectors to private vLLM inference engine...</span>`;

    function advance() {
      if (step < totalSteps) {
        const currentStepIndex = step + 1;
        const currentNode = document.getElementById('node-step-' + currentStepIndex);
        const prevNode = document.getElementById('node-step-' + step);
        const connector = document.getElementById('connector-' + step);

        if (prevNode) {
          prevNode.classList.remove('node-active');
          prevNode.classList.add('node-completed');
        }
        if (connector) {
          connector.classList.add('active');
        }

        if (currentNode) {
          currentNode.classList.remove('node-idle');
          currentNode.classList.add('node-active');
        }

        step++;
        setTimeout(advance, 320);
      } else {
        const lastNode = document.getElementById('node-step-' + totalSteps);
        if (lastNode) {
          lastNode.classList.remove('node-active');
          lastNode.classList.add('node-completed');
        }

        streamPayloadToConsole(pipeline.samplePayload);

        runBtn.disabled = false;
        runBtn.innerHTML = '<i class="fa-solid fa-play"></i> <span>Execute Real Payload</span>';
        isExecuting = false;
      }
    }

    advance();
  }

  pipelineTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      if (isExecuting) return;
      pipelineTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentKey = tab.getAttribute('data-pipeline');
      renderNodes(pipelines[currentKey]);
      consoleOutput.innerHTML = syntaxHighlightJSON(JSON.stringify(pipelines[currentKey].samplePayload, null, 2));
    });
  });

  runBtn.addEventListener('click', runSimulation);

  renderNodes(pipelines.rag);
  consoleOutput.innerHTML = syntaxHighlightJSON(JSON.stringify(pipelines.rag.samplePayload, null, 2));
}

// ==========================================
// 5. SOVEREIGN AI ECONOMICS CALCULATOR
// ==========================================
function initEconomicsCalculator() {
  const slider = document.getElementById('query-volume-slider');
  const volumeDisplay = document.getElementById('query-volume-display');
  const publicApiCostEl = document.getElementById('public-api-cost');
  const privateVpsCostEl = document.getElementById('private-vps-cost');
  const netSavingsEl = document.getElementById('net-savings');

  if (!slider || !volumeDisplay || !publicApiCostEl || !privateVpsCostEl || !netSavingsEl) return;

  function updateEconomics() {
    const queries = parseInt(slider.value, 10);
    if (queries >= 1000000) {
      volumeDisplay.textContent = (queries / 1000000).toFixed(1) + 'M queries / mo';
    } else {
      volumeDisplay.textContent = (queries / 1000).toLocaleString() + 'k queries / mo';
    }

    const publicCost = Math.round(queries * 0.008);
    let privateCost = 320;
    if (queries > 350000) {
      const extraTiers = Math.ceil((queries - 350000) / 400000);
      privateCost += extraTiers * 280;
    }

    const savings = Math.max(0, publicCost - privateCost);
    const savingsPercent = Math.round((savings / publicCost) * 100);

    publicApiCostEl.textContent = '$' + publicCost.toLocaleString() + '/mo';
    privateVpsCostEl.textContent = '$' + privateCost.toLocaleString() + '/mo';
    netSavingsEl.textContent = '$' + savings.toLocaleString() + '/mo (' + savingsPercent + '% saved)';
  }

  slider.addEventListener('input', updateEconomics);
  updateEconomics();
}

// ==========================================
// 6. TECHNICAL FAQ ACCORDION
// ==========================================
function initAiFAQ() {
  const faqItems = document.querySelectorAll('.ai-faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.ai-faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}
