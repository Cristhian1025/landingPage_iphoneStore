/**
 * ==========================================================================
 * JULIMBOO.STORE — BLACK FRIDAY LANDING PAGE (APP.JS)
 * Arquitectura Híbrida:
 * 1. Inercia suave con Lenis (Smooth Scroll)
 * 2. Motor de Scroll-Linked Animations & Dynamic Masking (clip-path)
 * 3. Scrollytelling reactivo en paneles fijados (position: sticky)
 * 4. Hovers modernos (Cursor Radial Spotlight + Botones Magnéticos)
 * 5. Carrusel Swiper.js con filtrado de capacidades (Nuevo iPhone 18)
 * 6. Filtrado interactivo Open Box (9 referencias · Baterías 100%)
 * 7. Inspector en vivo del Grafo de Web Semántica (JSON-LD · 10 @type)
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const rootStyle = document.documentElement.style;

  /* ------------------------------------------------------------------------
     1. INERCIA SUAVE CON LENIS + NAVEGACIÓN POR ANCLAS
     ------------------------------------------------------------------------ */
  let lenis = null;

  if (typeof window.Lenis !== 'undefined' && !prefersReducedMotion) {
    lenis = new window.Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  // Enlaces ancla suaves sincronizados con Lenis
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(targetEl, { offset: -72, duration: 1.2 });
      } else {
        targetEl.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      }
    });
  });

  /* ------------------------------------------------------------------------
     2. MOTOR DE SCROLL-LINKED ANIMATIONS & ENMASCARAMIENTO DINÁMICO (CLIP-PATH)
     ------------------------------------------------------------------------ */
  const nuevosSection = document.getElementById('nuevos-sellados');
  const iphone18Section = document.getElementById('iphone-18');
  const duoSection = document.getElementById('linea-duo');
  const openBoxSection = document.getElementById('open-box');
  const duoFoldSlider = document.getElementById('duoFoldSlider');
  const duoPercentLabel = document.getElementById('duoPercentLabel');
  const navLinks = document.querySelectorAll('.nav-link[data-section]');

  let userAdjustedDuoSlider = false;

  // Función utilitaria para normalizar progreso entre 0 y 1
  const clamp = (val, min = 0, max = 1) => Math.min(max, Math.max(min, val));

  // Calcula qué tan avanzada está la entrada de una sección en el viewport (0 a 1)
  function getSectionEntryProgress(sectionEl) {
    if (!sectionEl) return 1;
    const rect = sectionEl.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    // Empieza cuando el borde superior entra por abajo (vh * 0.95) y completa a (vh * 0.25)
    const raw = (vh * 0.95 - rect.top) / (vh * 0.7);
    return clamp(raw, 0, 1);
  }

  function updateScrollLinkedEffects() {
    const scrollY = window.scrollY || window.pageYOffset;
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const globalProgress = clamp(scrollY / maxScroll, 0, 1);

    // 1. Barra de progreso global
    rootStyle.setProperty('--scroll-progress', globalProgress.toFixed(4));

    if (prefersReducedMotion) return;

    // 2. Paralaje suave en el Hero
    if (scrollY < window.innerHeight * 1.2) {
      const parallaxPx = Math.round(scrollY * 0.08);
      rootStyle.setProperty('--hero-parallax', `${parallaxPx}px`);
    }

    // 3. Acto 2 (Nuevos Sellados): Revelado clip-path inset progresivo
    if (nuevosSection) {
      const pNuevos = clamp(0.25 + getSectionEntryProgress(nuevosSection) * 0.75, 0.25, 1);
      rootStyle.setProperty('--nuevos-reveal', pNuevos.toFixed(3));
    }

    // 4. Acto 3 (Nuevo iPhone 18): Máscara circular clip-path: circle(...)
    if (iphone18Section) {
      const p18 = getSectionEntryProgress(iphone18Section);
      const radiusPercent = Math.round(22 + p18 * 58); // de 22% a 80%
      rootStyle.setProperty('--ip18-radius', `${radiusPercent}%`);
    }

    // 5. Acto 4 (Línea Dúo Plegable): Apertura horizontal simétrica desde el centro
    if (duoSection && !userAdjustedDuoSlider) {
      const pDuo = getSectionEntryProgress(duoSection);
      // Cuando pDuo = 0 -> inset lateral de 42% (plegado); cuando pDuo = 1 -> inset 0% (100% desplegado)
      const insetSide = Math.round((1 - pDuo) * 42);
      const openPercent = Math.round(15 + pDuo * 85);
      rootStyle.setProperty('--duo-inset', `${insetSide}%`);

      if (duoFoldSlider && duoPercentLabel) {
        duoFoldSlider.value = String(openPercent);
        duoPercentLabel.textContent = `${openPercent}%`;
      }
    }

    // 6. Acto 5 (Open Box): Revelado vertical clip-path
    if (openBoxSection) {
      const pOb = clamp(0.2 + getSectionEntryProgress(openBoxSection) * 0.8, 0.2, 1);
      rootStyle.setProperty('--ob-reveal', pOb.toFixed(3));
    }

    // 7. Scroll-Spy para iluminar la sección activa en la barra superior
    const sections = ['nuevos-sellados', 'iphone-18', 'linea-duo', 'open-box', 'beneficios'];
    let currentSectionId = '';
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.45) {
          currentSectionId = id;
        }
      }
    }
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.dataset.section === currentSectionId);
    });
  }

  // Control manual del pliegue de máscara en Acto 4 (iPhone Dúo)
  if (duoFoldSlider && duoPercentLabel) {
    duoFoldSlider.addEventListener('input', (e) => {
      userAdjustedDuoSlider = true;
      const val = Number(e.target.value); // 15 a 100
      const normalized = (val - 15) / 85;
      const insetSide = Math.round((1 - normalized) * 42);
      rootStyle.setProperty('--duo-inset', `${insetSide}%`);
      duoPercentLabel.textContent = `${val}%`;
    });
  }

  if (lenis) {
    lenis.on('scroll', updateScrollLinkedEffects);
  } else {
    window.addEventListener('scroll', updateScrollLinkedEffects, { passive: true });
  }
  updateScrollLinkedEffects();

  /* ------------------------------------------------------------------------
     3. HOVERS MODERNOS: CURSOR RADIAL SPOTLIGHT & BOTONES MAGNÉTICOS
     ------------------------------------------------------------------------ */
  const spotlightCards = document.querySelectorAll('.spotlight-card');

  spotlightCards.forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  if (!prefersReducedMotion) {
    const magneticButtons = document.querySelectorAll('.magnetic-btn');
    magneticButtons.forEach((btn) => {
      btn.addEventListener('pointermove', (e) => {
        const rect = btn.getBoundingClientRect();
        const relX = e.clientX - (rect.left + rect.width / 2);
        const relY = e.clientY - (rect.top + rect.height / 2);
        btn.style.setProperty('--mag-x', `${(relX * 0.18).toFixed(1)}px`);
        btn.style.setProperty('--mag-y', `${(relY * 0.18).toFixed(1)}px`);
      });

      btn.addEventListener('pointerleave', () => {
        btn.style.setProperty('--mag-x', '0px');
        btn.style.setProperty('--mag-y', '0px');
      });
    });
  }

  /* ------------------------------------------------------------------------
     4. SCROLLYTELLING INTERACTIVO EN PANELES STICKY (ACTO 2 & ACTO 5)
     ------------------------------------------------------------------------ */
  // Acto 2: Cambio de imagen y etiqueta en el panel sticky de Nuevos Sellados
  const nuevosSource = document.getElementById('nuevosPreviewSource');
  const nuevosImg = document.getElementById('nuevosPreviewImg');
  const nuevosTag = document.getElementById('nuevosActiveTag');
  const nuevosPrice = document.getElementById('nuevosActivePrice');
  const nuevosCards = document.querySelectorAll('#nuevos-sellados .product-card');

  function activateNuevosCard(card) {
    if (!card) return;
    const webp = card.dataset.previewWebp;
    const jpg = card.dataset.previewJpg;
    const label = card.dataset.previewLabel;
    const price = card.dataset.previewPrice;

    if (nuevosTag && label) nuevosTag.textContent = label;
    if (nuevosPrice && price) nuevosPrice.textContent = price;

    if (nuevosImg && jpg && nuevosImg.getAttribute('src') !== jpg) {
      if (nuevosSource && webp) nuevosSource.setAttribute('srcset', webp);
      nuevosImg.setAttribute('src', jpg);
    }
  }

  nuevosCards.forEach((card) => {
    card.addEventListener('pointerenter', () => activateNuevosCard(card));
    card.addEventListener('focus', () => activateNuevosCard(card));
  });

  // Acto 5: Cambio reactivo en el panel sticky de Open Box (Baterías 100%)
  const obSource = document.getElementById('openboxPreviewSource');
  const obImg = document.getElementById('openboxPreviewImg');
  const obTag = document.getElementById('openboxActiveTag');
  const obPrice = document.getElementById('openboxActivePrice');
  const obCards = document.querySelectorAll('.ob-card');

  function activateOpenBoxCard(card) {
    if (!card) return;
    const series = card.dataset.series;
    const name = card.dataset.obName;
    const price = card.dataset.obPrice;

    if (obTag && name) obTag.textContent = `${name} · Batería 100%`;
    if (obPrice && price) obPrice.textContent = price;

    const targetWebp = series === '17' ? './Source/imgs/iphone_17.webp' : './Source/imgs/iphone_15.webp';
    const targetJpg = series === '17' ? './Source/imgs/iphone_17_.jpg' : './Source/imgs/iphone_15.jpg';

    if (obImg && obImg.getAttribute('src') !== targetJpg) {
      if (obSource) obSource.setAttribute('srcset', targetWebp);
      obImg.setAttribute('src', targetJpg);
    }
  }

  obCards.forEach((card) => {
    card.addEventListener('pointerenter', () => activateOpenBoxCard(card));
    card.addEventListener('focus', () => activateOpenBoxCard(card));
  });

  /* ------------------------------------------------------------------------
     5. CARRUSEL SWIPER.JS + FILTRO DE CAPACIDADES (ACTO 3 · NUEVO iPHONE 18)
     ------------------------------------------------------------------------ */
  let iphone18Swiper = null;

  if (typeof window.Swiper !== 'undefined') {
    iphone18Swiper = new window.Swiper('#iphone18Swiper', {
      slidesPerView: 1,
      spaceBetween: 20,
      speed: 650,
      grabCursor: true,
      keyboard: { enabled: true },
      pagination: {
        el: '#iphone18Pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '#iphone18Next',
        prevEl: '#iphone18Prev',
      },
      breakpoints: {
        720: {
          slidesPerView: 2,
          spaceBetween: 22,
        },
      },
    });
  }

  // Selector de capacidades (Todas / 256GB / 512GB) para Nuevo iPhone 18
  const capacityTabs = document.querySelectorAll('.capacity-tab');
  const allIp18Slides = Array.from(document.querySelectorAll('#iphone18Swiper .swiper-slide'));

  capacityTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const filter = tab.dataset.ip18Filter;

      capacityTabs.forEach((t) => {
        const isCurrent = t === tab;
        t.classList.toggle('active', isCurrent);
        t.setAttribute('aria-selected', String(isCurrent));
      });

      allIp18Slides.forEach((slide) => {
        const match = filter === 'all' || slide.dataset.capacity === filter;
        slide.style.display = match ? '' : 'none';
      });

      if (iphone18Swiper) {
        iphone18Swiper.update();
        iphone18Swiper.slideTo(0, 450);
      }
    });
  });

  /* ------------------------------------------------------------------------
     6. FILTRO POR GENERACIÓN EN OPEN BOX (ACTO 5 · BATERÍAS 100%)
     ------------------------------------------------------------------------ */
  const obFilterBtns = document.querySelectorAll('.ob-filter-btn');

  obFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const seriesFilter = btn.dataset.obFilter;

      obFilterBtns.forEach((b) => b.classList.toggle('active', b === btn));

      obCards.forEach((card) => {
        const matches = seriesFilter === 'all' || card.dataset.series === seriesFilter;
        card.classList.toggle('is-hidden', !matches);
      });
    });
  });

  /* ------------------------------------------------------------------------
     7. INSPECTOR EN VIVO DE WEB SEMÁNTICA (JSON-LD · 10 @TYPE DE SCHEMA.ORG)
     ------------------------------------------------------------------------ */
  const semanticModal = document.getElementById('semanticModal');
  const openModalBtn = document.getElementById('openSemanticModal');
  const openModalFooterBtn = document.getElementById('openSemanticModalFooter');
  const closeModalBtn = document.getElementById('closeSemanticModal');
  const jsonLdScript = document.getElementById('julimboo-jsonld');
  const jsonLdViewer = document.getElementById('jsonLdViewer');
  const copyJsonBtn = document.getElementById('copyJsonLdBtn');

  if (jsonLdScript && jsonLdViewer) {
    try {
      const parsed = JSON.parse(jsonLdScript.textContent);
      jsonLdViewer.textContent = JSON.stringify(parsed, null, 2);
    } catch {
      jsonLdViewer.textContent = jsonLdScript.textContent.trim();
    }
  }

  function openSemanticDialog() {
    if (!semanticModal) return;
    if (typeof semanticModal.showModal === 'function') {
      semanticModal.showModal();
    } else {
      semanticModal.setAttribute('open', '');
    }
  }

  function closeSemanticDialog() {
    if (!semanticModal) return;
    if (typeof semanticModal.close === 'function') {
      semanticModal.close();
    } else {
      semanticModal.removeAttribute('open');
    }
  }

  if (openModalBtn) openModalBtn.addEventListener('click', openSemanticDialog);
  if (openModalFooterBtn) openModalFooterBtn.addEventListener('click', openSemanticDialog);
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeSemanticDialog);

  if (semanticModal) {
    semanticModal.addEventListener('click', (e) => {
      const rect = semanticModal.getBoundingClientRect();
      const clickedOutside =
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom;
      if (clickedOutside) closeSemanticDialog();
    });
  }

  if (copyJsonBtn && jsonLdViewer) {
    copyJsonBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(jsonLdViewer.textContent);
        const originalText = copyJsonBtn.textContent;
        copyJsonBtn.textContent = '✓ ¡JSON-LD Copiado al Portapapeles!';
        setTimeout(() => {
          copyJsonBtn.textContent = originalText;
        }, 2200);
      } catch {
        copyJsonBtn.textContent = 'Selecciona el texto abajo para copiar';
      }
    });
  }
});
