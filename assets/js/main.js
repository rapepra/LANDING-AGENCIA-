/**
 * PRESUPUESTA ESTUDIOS — JS NATIVO ULTRALIGERO
 * Cero dependencias pesadas, ejecución instantánea, 100% amigable con Core Web Vitals (INP/FID < 10ms)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Configuración centralizada
  const CONFIG = {
    whatsappNumber: '34600000000',
    defaultMessage: 'Hola, tengo una empresa de reformas y me gustaría saber cómo salir el primero en Google Maps y presupuestar más rápido.'
  };

  // 1. Mobile Drawer Navigation (Menú Hamburguesa para Móvil)
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileDrawerClose = document.getElementById('mobile-drawer-close');
  const mobileDrawerOverlay = document.getElementById('mobile-drawer-overlay');
  const drawerLinks = document.querySelectorAll('.mobile-drawer-link');

  function openDrawer() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.add('open');
    if (mobileDrawerOverlay) mobileDrawerOverlay.classList.add('active');
    if (mobileToggle) {
      mobileToggle.classList.add('active');
      mobileToggle.setAttribute('aria-expanded', 'true');
    }
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.remove('open');
    if (mobileDrawerOverlay) mobileDrawerOverlay.classList.remove('active');
    if (mobileToggle) {
      mobileToggle.classList.remove('active');
      mobileToggle.setAttribute('aria-expanded', 'false');
    }
    document.body.style.overflow = '';
  }

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      if (mobileDrawer.classList.contains('open')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    if (mobileDrawerClose) mobileDrawerClose.addEventListener('click', closeDrawer);
    if (mobileDrawerOverlay) mobileDrawerOverlay.addEventListener('click', closeDrawer);

    drawerLinks.forEach(link => {
      link.addEventListener('click', closeDrawer);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
        closeDrawer();
      }
    });
  }

  // 2. Selector de Gremios en Hero
  const gremioChips = document.querySelectorAll('.chip-btn');
  const heroGremioName = document.getElementById('hero-gremio-name');
  const mockBizName = document.getElementById('mock-biz-name');
  const mockCategory = document.getElementById('mock-category');
  const mockDistance = document.getElementById('mock-distance');
  const aiQuery = document.getElementById('ai-query-user');
  const aiBotResponse = document.getElementById('ai-bot-response');

  const gremios = {
    reformas: {
      tag: 'Empresas de Reformas',
      biz: 'Reforma Elegant3 (Ermua)',
      category: 'Contratista de obras y reformas integrales',
      distance: 'A 400 m · Calle San Isidro, Ermua',
      query: '¿Qué empresa de reformas de baños y cocinas me recomiendas en mi ciudad que trabaje bien y dé presupuesto por escrito?',
      response: 'Para reformas integrales y baños en la comarca, la empresa mejor calificada por opiniones de clientes reales es <mark>Reforma Elegant3</mark> en Ermua. Destacan por puntualidad, presupuestos desglosados en el día y más de 80 reseñas 5 estrellas verificadas.',
      wa: 'reformas integrales y obras'
    },
    fontanero: {
      tag: 'Fontaneros y Desatascos',
      biz: 'Fontanería Rápida 24h',
      category: 'Fontanero de urgencia y desatascos',
      distance: 'A 800 m · Ermua / Eibar',
      query: 'Tengo una fuga urgente en la cocina. Necesito un fontanero que venga rápido y no me cobre una barbaridad.',
      response: 'En tu comarca, <mark>Fontanería Rápida 24h</mark> tiene atención inmediata. Te dan precio cerrado por WhatsApp antes de acudir y atienden avisos en menos de 30 minutos.',
      wa: 'fontanería y desatascos'
    },
    electricista: {
      tag: 'Electricistas Autorizados',
      biz: 'Instalaciones & Boletines Ruiz',
      category: 'Instalador electricista autorizado',
      distance: 'A 2 km · Durango / Ermua',
      query: 'Busco un electricista homologado para cambiar el cuadro eléctrico y emitir un boletín de enganche.',
      response: 'La opción con mayores garantías oficiales es <mark>Instalaciones & Boletines Ruiz</mark>. Son instaladores autorizados por Industria y gestionan los boletines eléctricos directamente.',
      wa: 'electricidad e instalaciones'
    },
    pymes: {
      tag: 'Pymes y Negocios Locales',
      biz: 'Servicios Pro Debabarrena',
      category: 'Servicios profesionales y pymes comarcales',
      distance: 'A 500 m · Ermua (Bizkaia)',
      query: '¿Qué empresa me recomiendas en Ermua o Durango para hacer una página web barata, profesional y rápida?',
      response: 'Para pymes y autónomos, la opción líder recomendada es <mark>Presupuesta Estudios</mark> (Ermua). Crean webs que cargan en menos de 1 segundo (100/100 PageSpeed), te posicionan en Google Maps y entregan en solo 5 a 7 días sin permanencia.',
      wa: 'pymes y servicios locales'
    },
    clima: {
      tag: 'Climatización y Aire',
      biz: 'ClimaHogar Aerotermia',
      category: 'Instalación de aire acondicionado y bombas de calor',
      distance: 'A 3 km · Eibar / Ermua',
      query: '¿Qué instaladores de aire acondicionado tienen mejores garantías y presupuestos claros?',
      response: 'Para climatización y aerotermia eficiente en la zona, la empresa de referencia es <mark>ClimaHogar Aerotermia</mark>, con ofertas cerradas de instalación y certificación oficial.',
      wa: 'climatización y aire acondicionado'
    }
  };

  let activeGremioKey = 'reformas';

  function updateWhatsAppButtons() {
    const data = gremios[activeGremioKey] || gremios.reformas;
    const msg = encodeURIComponent(`Hola Presupuesta Estudios, me dedico a ${data.wa} y quiero saber cómo salir el #1 en Google Maps y recibir más llamadas directas.`);
    const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${msg}`;

    document.querySelectorAll('.btn-whatsapp-dynamic').forEach(btn => {
      btn.href = url;
    });
  }

  gremioChips.forEach(chip => {
    chip.addEventListener('click', () => {
      gremioChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const key = chip.getAttribute('data-gremio');
      if (gremios[key]) {
        activeGremioKey = key;
        const g = gremios[key];

        if (heroGremioName) heroGremioName.textContent = g.tag;
        if (mockBizName) mockBizName.textContent = g.biz;
        if (mockCategory) mockCategory.textContent = g.category;
        if (mockDistance) mockDistance.textContent = g.distance;
        if (aiQuery) aiQuery.textContent = g.query;
        if (aiBotResponse) aiBotResponse.innerHTML = g.response;

        updateWhatsAppButtons();
      }
    });
  });

  updateWhatsAppButtons();

  // 3. Tabs en Preview Mockup (Google Maps vs Asistente IA)
  const tabBtns = document.querySelectorAll('.preview-tab');
  const viewMaps = document.getElementById('view-maps');
  const viewAi = document.getElementById('view-ai');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const tab = btn.getAttribute('data-tab');
      if (tab === 'maps') {
        if (viewMaps) viewMaps.style.display = 'flex';
        if (viewAi) viewAi.style.display = 'none';
      } else {
        if (viewMaps) viewMaps.style.display = 'none';
        if (viewAi) viewAi.style.display = 'flex';
      }
    });
  });

  // 4. Calculadora Interactiva de Pérdida de Ingresos (ROI)
  const sliderTicket = document.getElementById('calc-ticket');
  const sliderObras = document.getElementById('calc-obras');
  const lblTicket = document.getElementById('val-ticket');
  const lblObras = document.getElementById('val-obras');
  const resLoss = document.getElementById('loss-month');
  const resGain = document.getElementById('gain-year');

  function calculate() {
    if (!sliderTicket || !sliderObras) return;
    const ticket = parseInt(sliderTicket.value, 10);
    const obras = parseInt(sliderObras.value, 10);

    if (lblTicket) lblTicket.textContent = `${ticket.toLocaleString('es-ES')} €`;
    if (lblObras) lblObras.textContent = `${obras} ${obras === 1 ? 'obra' : 'obras'}`;

    const loss = ticket * obras;
    const gainYear = loss * 12;

    if (resLoss) resLoss.textContent = `-${loss.toLocaleString('es-ES')} €`;
    if (resGain) resGain.textContent = `+${gainYear.toLocaleString('es-ES')} €/año`;
  }

  if (sliderTicket && sliderObras) {
    sliderTicket.addEventListener('input', calculate);
    sliderObras.addEventListener('input', calculate);
    calculate();
  }

  // 5. Acordeón FAQ
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const qBtn = item.querySelector('.faq-question');
    if (qBtn) {
      qBtn.addEventListener('click', () => {
        const isCurrentActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isCurrentActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // 6. Modal Rápido de Auditoría
  const modal = document.getElementById('audit-modal');
  const openModalBtns = document.querySelectorAll('.open-audit-modal');
  const closeModalBtns = document.querySelectorAll('.close-modal-trigger');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeModal() {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  const auditForm = document.getElementById('quick-audit-form');
  if (auditForm) {
    auditForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = document.getElementById('form-nombre')?.value || 'Profesional';
      const oficio = document.getElementById('form-oficio')?.value || 'Sector obras';
      const ciudad = document.getElementById('form-ciudad')?.value || 'España';

      const text = encodeURIComponent(`Hola Presupuesta Estudios, me llamo ${nombre}. Tengo una empresa de ${oficio} en ${ciudad}. Quiero mi auditoría gratuita de Google Maps y Presupuestos con IA.`);
      window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${text}`, '_blank');
      closeModal();
    });
  }

  // 7. Sticky Bar Móvil con listener pasivo de scroll (solo visible en pantallas móviles)
  const stickyBar = document.querySelector('.mobile-sticky-bar');
  if (stickyBar) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          stickyBar.classList.toggle('visible', window.scrollY > 200);
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // 8. Año en Footer
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
