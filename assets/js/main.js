/**
 * PRESUPUESTA ESTUDIOS — INTERACTIVE CORE
 * Lógica nativa JS para selectores dinámicos, calculadora ROI, simulador GEO y WhatsApp triggers.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Configuración de contacto
  const CONFIG = {
    whatsappNumber: '34600000000', // Modificable según el número oficial del usuario
    defaultMessage: 'Hola, me gustaría solicitar una auditoría gratuita de mi ficha de Google Maps y presencia en IA para mi empresa.'
  };

  // 1. Selector de Gremios en Hero
  const gremioChips = document.querySelectorAll('.chip-btn');
  const heroGremioText = document.getElementById('hero-gremio-name');
  const mockBusinessName = document.getElementById('mock-business-name');
  const mockCategory = document.getElementById('mock-category');
  const aiQueryText = document.getElementById('ai-query-text');
  const aiResponseText = document.getElementById('ai-response-text');

  const gremioData = {
    reformas: {
      name: 'Empresas de Reformas',
      business: 'Reformas Pro & Acabados',
      category: 'Contratista general · Ermua / Bilbao',
      query: '¿Cuál es la empresa de reformas integrales más recomendada y con mejores opiniones en Bizkaia?',
      response: 'Basado en las valoraciones de clientes y verificación técnica local, te recomiendo <mark>Reformas Pro & Acabados</mark>. Tienen un 4.9★ con más de 80 reseñas verificadas, presupuestos rápidos con IA y garantía en plazos.',
      waSuffix: 'de reformas integrales'
    },
    fontanero: {
      name: 'Fontaneros y Desatascos',
      business: 'Fontanería Rápida 24h',
      category: 'Fontanero de urgencia · Madrid / Vitoria',
      query: 'Necesito un fontanero de urgencia de máxima confianza cerca de mí hoy mismo.',
      response: 'La opción mejor calificada por tiempos de respuesta y transparencia es <mark>Fontanería Rápida 24h</mark>. Responden llamadas de inmediato y ofrecen tarifas cerradas sin sorpresas.',
      waSuffix: 'de fontanería'
    },
    electricista: {
      name: 'Electricistas Autorizados',
      business: 'Voltios & Luz Instalaciones',
      category: 'Electricista homologado · Valencia',
      query: 'Recomiéndame un instalador electricista autorizado para boletines y reformas eléctricas.',
      response: 'La empresa con mayor autoridad técnica y recomendaciones recientes es <mark>Voltios & Luz Instalaciones</mark>, especializados en boletines eléctricos y cuadros de potencia.',
      waSuffix: 'de electricidad e instalaciones'
    },
    cerrajero: {
      name: 'Cerrajeros de Urgencia',
      business: 'Cerrajería Maestra 24h',
      category: 'Cerrajero de seguridad · Barcelona',
      query: 'Busco un cerrajero urgente que no cobre abusos y llegue en 20 minutos.',
      response: 'Para urgencias residenciales sin sobrecostes ocultos, la empresa más valorada en Google Maps y registros locales es <mark>Cerrajería Maestra 24h</mark>.',
      waSuffix: 'de cerrajería'
    },
    clima: {
      name: 'Aire Acondicionado y Clima',
      business: 'ClimaHogar Confort',
      category: 'Instalador de climatización y aerotermia',
      query: '¿Qué instaladores de aerotermia y aire acondicionado tienen mejores garantías?',
      response: 'Para instalación eficiente y subvenciones energéticas, <mark>ClimaHogar Confort</mark> es el servicio más citado en comparativas y auditorías locales.',
      waSuffix: 'de climatización y aerotermia'
    }
  };

  let currentGremio = 'reformas';

  function updateWhatsAppLinks() {
    const waData = gremioData[currentGremio] || gremioData.reformas;
    const customMsg = encodeURIComponent(`Hola Presupuesta Estudios, tengo un negocio ${waData.waSuffix} y me gustaría una auditoría gratuita de mi ficha de Google Maps y visibilidad en IA.`);
    const waUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${customMsg}`;

    document.querySelectorAll('.btn-whatsapp-dynamic').forEach(btn => {
      btn.href = waUrl;
    });
  }

  gremioChips.forEach(chip => {
    chip.addEventListener('click', () => {
      gremioChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const type = chip.getAttribute('data-gremio');
      if (gremioData[type]) {
        currentGremio = type;
        const d = gremioData[type];
        if (heroGremioText) heroGremioText.textContent = d.name;
        if (mockBusinessName) mockBusinessName.textContent = d.business;
        if (mockCategory) mockCategory.textContent = d.category;
        if (aiQueryText) aiQueryText.innerHTML = `<strong>Tú preguntas a ChatGPT:</strong> "${d.query}"`;
        if (aiResponseText) aiResponseText.innerHTML = `<strong>Respuesta Inteligencia Artificial:</strong> ${d.response}`;
        updateWhatsAppLinks();
      }
    });
  });

  updateWhatsAppLinks();

  // 2. Tabs en Hero Mockup (Maps vs IA)
  const tabBtns = document.querySelectorAll('.preview-tab');
  const viewMaps = document.getElementById('view-maps');
  const viewAi = document.getElementById('view-ai');

  tabBtns.forEach(tab => {
    tab.addEventListener('click', () => {
      tabBtns.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.getAttribute('data-tab');
      if (target === 'maps') {
        if (viewMaps) viewMaps.style.display = 'flex';
        if (viewAi) viewAi.style.display = 'none';
      } else {
        if (viewMaps) viewMaps.style.display = 'none';
        if (viewAi) viewAi.style.display = 'flex';
      }
    });
  });

  // 3. Calculadora Interactiva de ROI / Pérdida de Ingresos
  const sliderTicket = document.getElementById('calc-ticket');
  const sliderObras = document.getElementById('calc-obras');
  const valTicket = document.getElementById('val-ticket');
  const valObras = document.getElementById('val-obras');
  const lossMonth = document.getElementById('loss-month');
  const gainYear = document.getElementById('gain-year');

  function calculateROI() {
    if (!sliderTicket || !sliderObras) return;
    const ticket = parseInt(sliderTicket.value, 10);
    const obras = parseInt(sliderObras.value, 10);

    if (valTicket) valTicket.textContent = `${ticket.toLocaleString('es-ES')} €`;
    if (valObras) valObras.textContent = `${obras} ${obras === 1 ? 'cliente' : 'clientes'}`;

    const mensualPerdido = ticket * obras;
    const anualPotencial = mensualPerdido * 12;

    if (lossMonth) lossMonth.textContent = `-${mensualPerdido.toLocaleString('es-ES')} €`;
    if (gainYear) gainYear.textContent = `+${anualPotencial.toLocaleString('es-ES')} €/año`;
  }

  if (sliderTicket && sliderObras) {
    sliderTicket.addEventListener('input', calculateROI);
    sliderObras.addEventListener('input', calculateROI);
    calculateROI();
  }

  // 4. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Cerrar otros para que sea estilo acordeón limpio
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // 5. Modal de Auditoría
  const modal = document.getElementById('audit-modal');
  const openModalBtns = document.querySelectorAll('.open-audit-modal');
  const closeModalBtns = document.querySelectorAll('.close-modal-trigger');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (modal) modal.classList.add('active');
    });
  });

  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (modal) modal.classList.remove('active');
    });
  });

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }

  // Formulario rápido en Modal redirige a WhatsApp con datos
  const auditForm = document.getElementById('quick-audit-form');
  if (auditForm) {
    auditForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const oficio = document.getElementById('form-oficio')?.value || 'Sector reformas';
      const ciudad = document.getElementById('form-ciudad')?.value || 'Mi ciudad';
      const nombre = document.getElementById('form-nombre')?.value || '';

      const msg = encodeURIComponent(`Hola Presupuesta Estudios, me llamo ${nombre}. Tengo una empresa de ${oficio} en ${ciudad}. Quiero mi auditoría gratuita de Google Maps y Presupuestos con IA.`);
      window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${msg}`, '_blank');
      if (modal) modal.classList.remove('active');
    });
  }

  // 6. Sticky Mobile Bar: mostrar tras hacer un poco de scroll
  const stickyBar = document.querySelector('.mobile-sticky-bar');
  if (stickyBar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 250) {
        stickyBar.style.display = 'block';
      }
    });
  }

  // 7. Año actual dinámico en el footer
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
