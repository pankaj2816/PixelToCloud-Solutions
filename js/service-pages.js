/**
 * PixelToCloud - Shared Service Pages Controller
 * Provides sticky sub-nav scroll spy, interactive layered architecture inspector,
 * industry use-case tab switcher, and FAQ accordion across all dedicated service pages.
 */

document.addEventListener('DOMContentLoaded', () => {
  initServiceSubNav();
  initServiceArchLayers();
  initServiceUseCaseTabs();
  initServiceFAQ();
});

// 1. Sticky Sub-Navigation Scroll Spy
function initServiceSubNav() {
  const subNav = document.getElementById('service-sub-nav');
  const subNavLinks = document.querySelectorAll('.sub-nav-link');
  const sections = document.querySelectorAll('section[id]');

  if (!subNav || !subNavLinks.length) return;

  subNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          const subNavHeight = subNav.offsetHeight || 55;
          const targetTop = targetSection.getBoundingClientRect().top + window.pageYOffset - (subNavHeight + 70);
          window.scrollTo({ top: targetTop, behavior: 'smooth' });
        }
      }
    });
  });

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.pageYOffset + 220;

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

// 2. Interactive Layered Architecture Inspector
function initServiceArchLayers() {
  const layerCards = document.querySelectorAll('.arch-layer-card');
  const inspectorTitle = document.getElementById('layer-inspector-title');
  const inspectorDesc = document.getElementById('layer-inspector-desc');
  const inspectorTech = document.getElementById('layer-inspector-tech');
  const inspectorMetrics = document.getElementById('layer-inspector-metrics');

  if (!layerCards.length || !inspectorTitle) return;

  layerCards.forEach(card => {
    card.addEventListener('click', () => {
      layerCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const title = card.getAttribute('data-title');
      const desc = card.getAttribute('data-desc');
      const tech = card.getAttribute('data-tech');
      const metrics = card.getAttribute('data-metrics');

      if (title && inspectorTitle) inspectorTitle.textContent = title;
      if (desc && inspectorDesc) inspectorDesc.textContent = desc;
      if (metrics && inspectorMetrics) inspectorMetrics.textContent = metrics;
      if (tech && inspectorTech) {
        inspectorTech.innerHTML = tech.split(',').map(t => '<span class="bento-tech-chip">' + t.trim() + '</span>').join(' ');
      }
    });
  });
}

// 3. Industry Use-Case Tabs
function initServiceUseCaseTabs() {
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
      if (activePanel) activePanel.classList.add('active');
    });
  });
}

// 4. FAQ Accordion
function initServiceFAQ() {
  const faqItems = document.querySelectorAll('.ai-faq-item, .faq-accordion-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.ai-faq-question, .faq-accordion-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });
}
