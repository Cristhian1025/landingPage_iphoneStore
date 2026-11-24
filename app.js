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
 * 7. Visor 3D del iPhone Dúo (apertura/cierre + giro 360° por arrastre)
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
  const openBoxSection = document.getElementById('open-box');
  const navLinks = document.querySelectorAll('.nav-link[data-section]');

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

    if (!prefersReducedMotion) {
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
        const radiusPercent = Math.round(32 + p18 * 68); // de 32% a 100%
        rootStyle.setProperty('--ip18-radius', `${radiusPercent}%`);
      }

      // 6. Acto 5 (Open Box): Revelado vertical clip-path
      if (openBoxSection) {
        const pOb = clamp(0.2 + getSectionEntryProgress(openBoxSection) * 0.8, 0.2, 1);
        rootStyle.setProperty('--ob-reveal', pOb.toFixed(3));
      }
    }

    // 7. Scroll-Spy para iluminar la sección activa en la barra superior (siempre activo)
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

  if (lenis) {
    lenis.on('scroll', updateScrollLinkedEffects);
  } else {
    window.addEventListener('scroll', updateScrollLinkedEffects, { passive: true });
  }
  updateScrollLinkedEffects();

  // Revelado dinámico por máscara clip-path en titulares al entrar en pantalla
  const maskedTitles = document.querySelectorAll('.mask-title-reveal, .mask-horizontal-reveal');
  if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
    maskedTitles.forEach((el) => el.classList.add('is-revealed'));
  } else {
    const titleMaskObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    maskedTitles.forEach((el) => titleMaskObserver.observe(el));
  }

  /* ------------------------------------------------------------------------
     3. HOVERS MODERNOS: CURSOR RADIAL SPOTLIGHT & BOTONES MAGNÉTICOS
     ------------------------------------------------------------------------ */
  document.addEventListener('pointermove', (e) => {
    const card = e.target.closest('.spotlight-card');
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
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
  const capacityTabs = document.querySelectorAll('.capacity-tab');
  const ip18SlideTemplates = Array.from(
    document.querySelectorAll('#iphone18Swiper .swiper-slide')
  ).map((slide) => ({
    capacity: slide.dataset.capacity,
    html: slide.outerHTML,
  }));

  if (typeof window.Swiper !== 'undefined') {
    iphone18Swiper = new window.Swiper('#iphone18Swiper', {
      slidesPerView: 1.08,
      spaceBetween: 18,
      speed: 600,
      grabCursor: true,
      observer: true,
      observeParents: true,
      watchOverflow: true,
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
        640: {
          slidesPerView: 1.45,
          spaceBetween: 20,
        },
        1100: {
          slidesPerView: 1.65,
          spaceBetween: 22,
        },
      },
    });
  }

  // Selector de capacidades (Todas / 256GB / 512GB) reconstruyendo slides limpios
  capacityTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const filter = tab.dataset.ip18Filter;

      capacityTabs.forEach((t) => {
        const isCurrent = t === tab;
        t.classList.toggle('active', isCurrent);
        t.setAttribute('aria-selected', String(isCurrent));
      });

      const matchingHtml = ip18SlideTemplates
        .filter((item) => filter === 'all' || item.capacity === filter)
        .map((item) => item.html);

      const swiperEl = document.getElementById('iphone18Swiper');
      if (swiperEl) swiperEl.scrollLeft = 0;

      if (iphone18Swiper) {
        iphone18Swiper.removeAllSlides();
        iphone18Swiper.appendSlide(matchingHtml);
        iphone18Swiper.update();
        iphone18Swiper.slideTo(0, 0);
      } else {
        const wrapper = document.querySelector('#iphone18Swiper .swiper-wrapper');
        if (wrapper) wrapper.innerHTML = matchingHtml.join('');
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
     7. VISOR 3D DEL iPHONE DÚO
        - Animación automática de apertura/cierre (bisagra CSS 3D)
        - Giro 360° arrastrando con mouse o dedo (Pointer Events + inercia)
        - Slider manual de apertura y botón pausar/reproducir
     ------------------------------------------------------------------------ */
  const duoStage = document.getElementById('duoStage');
  const duoPhone = document.getElementById('duoPhone');
  const duoHinge = document.getElementById('duoHinge');
  const duoSlider = document.getElementById('duoFoldSlider');
  const duoLabel = document.getElementById('duoPercentLabel');
  const duoPlayBtn = document.getElementById('duoPlayBtn');

  if (duoStage && duoPhone && duoHinge) {
    const state = {
      rotY: -20,          // giro horizontal (libre, 360°)
      rotX: -8,           // inclinación vertical (limitada)
      velY: 0,
      open: 1,            // 0 = cerrado, 1 = abierto
      autoplay: !prefersReducedMotion,
      inView: false,
      dragging: false,
      lastX: 0,
      lastY: 0,
      lastT: 0,
      autoTime: 0,
    };

    const renderDuo = () => {
      const fold = (1 - state.open) * 178; // 178° para que no se toquen las pantallas internas
      // Recentrar: abierto el centro está en la bisagra; cerrado, en medio de la hoja fija
      const shift = -0.5 * (1 - Math.cos((fold * Math.PI) / 180)) / 2;
      duoPhone.style.transform = `rotateX(${state.rotX}deg) rotateY(${state.rotY}deg) translateX(calc(var(--leaf-w) * ${shift.toFixed(4)}))`;
      duoHinge.style.setProperty('--duo-fold', `${fold}deg`);
      duoStage.style.setProperty('--duo-shade', (1 - state.open) * 0.55);
      const pct = Math.round(state.open * 100);
      if (duoSlider) duoSlider.value = String(pct);
      if (duoLabel) duoLabel.textContent = `${pct}%`;
    };

    const setAutoplay = (on) => {
      state.autoplay = on;
      if (duoPlayBtn) {
        duoPlayBtn.textContent = on ? 'Pausar animación' : 'Reproducir animación';
        duoPlayBtn.setAttribute('aria-pressed', String(on));
      }
    };
    setAutoplay(state.autoplay);

    let prevT = performance.now();
    const loop = (t) => {
      const dt = Math.min(0.05, (t - prevT) / 1000);
      prevT = t;
      if (state.inView && !state.dragging) {
        if (state.autoplay) {
          // Ciclo de 6 s: abierto → cerrado → abierto, con giro lento
          state.autoTime += dt;
          const wave = (Math.cos((state.autoTime / 6) * Math.PI * 2) + 1) / 2;
          state.open = 0.04 + wave * 0.96;
          state.rotY += 14 * dt;
        }
        // Inercia después de soltar el arrastre
        if (Math.abs(state.velY) > 0.5) {
          state.rotY += state.velY * dt;
          state.velY *= Math.pow(0.04, dt);
        } else {
          state.velY = 0;
        }
        renderDuo();
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);

    // Solo animar cuando la sección está en pantalla
    new IntersectionObserver(
      ([entry]) => { state.inView = entry.isIntersecting; },
      { threshold: 0.15 }
    ).observe(duoStage);

    // Arrastre para girar
    duoStage.addEventListener('pointerdown', (e) => {
      state.dragging = true;
      state.lastX = e.clientX;
      state.lastY = e.clientY;
      state.lastT = performance.now();
      state.velY = 0;
      setAutoplay(false);
      duoStage.setPointerCapture(e.pointerId);
      duoStage.classList.add('is-dragging');
    });

    duoStage.addEventListener('pointermove', (e) => {
      if (!state.dragging) return;
      const now = performance.now();
      const dx = e.clientX - state.lastX;
      const dy = e.clientY - state.lastY;
      state.rotY += dx * 0.6;
      if (e.pointerType === 'mouse') {
        state.rotX = Math.max(-45, Math.min(45, state.rotX - dy * 0.4));
      }
      const elapsed = Math.max(1, now - state.lastT);
      state.velY = (dx * 0.6) / (elapsed / 1000);
      state.lastX = e.clientX;
      state.lastY = e.clientY;
      state.lastT = now;
      renderDuo();
    });

    const endDrag = () => {
      if (!state.dragging) return;
      state.dragging = false;
      duoStage.classList.remove('is-dragging');
      if (performance.now() - state.lastT > 80) state.velY = 0;
      state.velY = Math.max(-900, Math.min(900, state.velY));
    };
    duoStage.addEventListener('pointerup', endDrag);
    duoStage.addEventListener('pointercancel', endDrag);

    // Teclado: flechas giran, accesible con tabindex
    duoStage.tabIndex = 0;
    duoStage.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        setAutoplay(false);
        state.rotY += e.key === 'ArrowLeft' ? -15 : 15;
        renderDuo();
      }
    });

    if (duoSlider) {
      duoSlider.addEventListener('input', (e) => {
        setAutoplay(false);
        state.open = Number(e.target.value) / 100;
        renderDuo();
      });
    }

    if (duoPlayBtn) {
      duoPlayBtn.addEventListener('click', () => {
        if (!state.autoplay) {
          // Retoma el ciclo desde el estado de apertura actual
          state.autoTime = (Math.acos(Math.max(-1, Math.min(1, ((state.open - 0.04) / 0.96) * 2 - 1))) / (Math.PI * 2)) * 6;
        }
        setAutoplay(!state.autoplay);
      });
    }

    renderDuo();
  }
});
