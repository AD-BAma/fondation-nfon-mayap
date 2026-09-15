/**
 * FONDATION NFON MAYAP — MODERN INTERACTION & BILINGUAL ENGINE
 * « Servir, transmettre et construire pour les générations futures »
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Language Management & State
  let currentLang = localStorage.getItem('fnm_lang') || 'fr';

  const applyLanguage = (lang) => {
    if (!translations[lang]) return;
    currentLang = lang;
    localStorage.setItem('fnm_lang', lang);
    document.documentElement.lang = lang;

    // Update Text & HTML Elements
    const i18nElements = document.querySelectorAll('[data-i18n]');
    i18nElements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang][key]) {
        el.innerHTML = translations[lang][key];
      }
    });

    // Update Placeholders
    const i18nPlaceholders = document.querySelectorAll('[data-i18n-ph]');
    i18nPlaceholders.forEach(el => {
      const key = el.getAttribute('data-i18n-ph');
      if (translations[lang][key]) {
        el.setAttribute('placeholder', translations[lang][key]);
      }
    });

    // Update Active Language Buttons
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  };

  // Attach Language Switcher Click Handlers
  const langButtons = document.querySelectorAll('.lang-btn');
  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedLang = btn.getAttribute('data-lang');
      applyLanguage(selectedLang);
      const toastMsg = selectedLang === 'fr' ? 'Site configuré en Français' : 'Website switched to English';
      window.showToast(toastMsg);
    });
  });

  // Initial Language Setup
  applyLanguage(currentLang);

  // 2. Sticky Header Scroll Indicator
  const siteHeader = document.getElementById('siteHeader');
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const handleScroll = () => {
    const scrollPos = window.scrollY;
    
    if (siteHeader) {
      if (scrollPos > 30) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }

    // Update active nav link
    const checkPoint = scrollPos + 180;
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (checkPoint >= sectionTop && checkPoint < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', handleScroll);

  // --- Hero Slider / Carousel Logic ---
  const heroSlider = document.getElementById('heroSlider');
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  const prevBtn = document.getElementById('heroPrevBtn');
  const nextBtn = document.getElementById('heroNextBtn');
  let currentSlide = 0;
  let sliderInterval = null;

  const goToSlide = (index) => {
    if (!slides.length) return;
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    currentSlide = index;
  };

  const nextSlide = () => {
    if (!slides.length) return;
    const nextIndex = (currentSlide + 1) % slides.length;
    goToSlide(nextIndex);
  };

  const prevSlide = () => {
    if (!slides.length) return;
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    goToSlide(prevIndex);
  };

  const startAutoSlide = () => {
    stopAutoSlide();
    sliderInterval = setInterval(nextSlide, 5500);
  };

  const stopAutoSlide = () => {
    if (sliderInterval) clearInterval(sliderInterval);
  };

  if (dots.length) {
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const idx = parseInt(dot.getAttribute('data-index'), 10);
        goToSlide(idx);
        startAutoSlide();
      });
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      startAutoSlide();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      startAutoSlide();
    });
  }

  if (heroSlider) {
    heroSlider.addEventListener('mouseenter', stopAutoSlide);
    heroSlider.addEventListener('mouseleave', startAutoSlide);

    // Touch Swipe Support
    let touchStartX = 0;
    let touchEndX = 0;
    heroSlider.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    heroSlider.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) {
        nextSlide();
        startAutoSlide();
      } else if (touchEndX - touchStartX > 50) {
        prevSlide();
        startAutoSlide();
      }
    }, { passive: true });
  }

  startAutoSlide();

  // 3. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileNavToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.innerHTML = isOpen ? '✕' : '☰';
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.innerHTML = '☰';
      });
    });
  }

  // 4. Mission & Vision Tabs Interaction (Good Soul Style)
  const tabBtnMission = document.getElementById('tabBtnMission');
  const tabBtnVision = document.getElementById('tabBtnVision');
  const tabPaneMission = document.getElementById('tabPaneMission');
  const tabPaneVision = document.getElementById('tabPaneVision');

  if (tabBtnMission && tabBtnVision && tabPaneMission && tabPaneVision) {
    tabBtnMission.addEventListener('click', () => {
      tabBtnMission.classList.add('active');
      tabBtnVision.classList.remove('active');
      tabPaneMission.classList.add('active');
      tabPaneVision.classList.remove('active');
    });

    tabBtnVision.addEventListener('click', () => {
      tabBtnVision.classList.add('active');
      tabBtnMission.classList.remove('active');
      tabPaneVision.classList.add('active');
      tabPaneMission.classList.remove('active');
    });
  }

  // 4b. Feature Section Pill Tabs Interaction
  const pillButtons = document.querySelectorAll('.feature-pill-btn');
  const pillNarratives = {
    transparence: {
      fr: "La <strong>Fondation Nfon Mayap</strong> garantit une traçabilité intégrale de chaque don et action. Nos comptes-rendus et réalisations sont documentés en temps réel avec les autorités et communautés de Njiyap.",
      en: "The <strong>Nfon Mayap Foundation</strong> guarantees full traceability for every single contribution. All field activities and progress reports are shared openly with community stakeholders."
    },
    local: {
      fr: "Toutes nos actions sont pensées et exécutées avec les habitants de <strong>Njiyap</strong> et du département du Noun, pour répondre exactement à leurs priorités de vie et d'épanouissement.",
      en: "All our programs are designed and executed alongside the residents of <strong>Njiyap</strong> and the Noun Division to solve real-world community priorities directly."
    },
    perennite: {
      fr: "Nous investissons dans des solutions pérennes : scolarisation de long terme, forages équipés et pérennes, et transmission des savoirs pour rendre les familles autonomes.",
      en: "We invest in long-term durable solutions: multi-year student support, sustainable water wells, and vocational guidance to empower families autonomously."
    },
    solidarite: {
      fr: "La solidarité est le moteur de notre vocation : fédérer la diaspora et les partenaires pour qu'aucun enfant ni aucune famille vulnérable ne soit laissé de côté.",
      en: "Solidarity is our heartbeat: bringing together the Cameroonian diaspora and global partners so that no vulnerable child or elder is left behind."
    }
  };

  pillButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      pillButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const pillKey = btn.getAttribute('data-pill');
      const paragraph = document.querySelector('.feature-story-paragraph');
      if (paragraph && pillNarratives[pillKey]) {
        paragraph.innerHTML = pillNarratives[pillKey][currentLang] || pillNarratives[pillKey].fr;
      }
    });
  });

  // 5. Toast Notification Utility
  window.showToast = (message, type = 'success') => {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <span class="toast-icon">✓</span>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('show');
    }, 10);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  };

  // 6. Modals Management
  const modalOverlay = document.getElementById('modalOverlay');
  const modalContainer = document.getElementById('modalContainer');

  const openModal = (htmlContent) => {
    if (!modalContainer || !modalOverlay) return;
    modalContainer.innerHTML = htmlContent;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    const closeBtn = modalContainer.querySelector('.modal-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }
  };

  const closeModal = () => {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // 7. Support / Pledge Modal (Multilingual + Supabase connection)
  const supportButtons = document.querySelectorAll('.trigger-support-modal');
  supportButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const t = translations[currentLang];
      openModal(`
        <div class="modal-header">
          <div class="modal-title-wrap">
            <div class="modal-icon-badge">🤝</div>
            <div>
              <h3 class="modal-title">${t.modal_support_title}</h3>
              <p class="modal-subtitle">${t.modal_support_subtitle}</p>
            </div>
          </div>
          <button class="modal-close-btn" aria-label="Fermer">✕</button>
        </div>
        <div class="modal-body">
          <p style="font-size:0.95rem; color:var(--text-body); line-height:1.7; margin-bottom:18px;">
            ${t.modal_support_intro}
          </p>

          <div class="support-type-selector">
            <div class="support-type-btn active" data-type="Éducation & Kits">
              <span class="type-icon">🎒</span>
              <span>${t.modal_support_type_kits}</span>
            </div>
            <div class="support-type-btn" data-type="Campagne Santé">
              <span class="type-icon">🏥</span>
              <span>${t.modal_support_type_health}</span>
            </div>
            <div class="support-type-btn" data-type="Point d'Eau">
              <span class="type-icon">💧</span>
              <span>${t.modal_support_type_water}</span>
            </div>
          </div>

          <form id="supportPledgeForm" onsubmit="handleSupportSubmit(event)" style="display:flex; flex-direction:column; gap:14px;">
            <input type="hidden" id="pledgeSupportType" value="Éducation & Kits">
            <div class="form-group">
              <label style="font-size:0.82rem; font-weight:700; margin-bottom:6px; color:var(--text-main);">${t.modal_support_name}</label>
              <input type="text" id="pledgeName" class="relaxed-input" placeholder="Ex: M. Njoya" required>
            </div>
            <div class="relaxed-form-row">
              <div class="form-group">
                <label style="font-size:0.82rem; font-weight:700; margin-bottom:6px; color:var(--text-main);">${t.modal_support_email}</label>
                <input type="email" id="pledgeEmail" class="relaxed-input" placeholder="email@domaine.com" required>
              </div>
              <div class="form-group">
                <label style="font-size:0.82rem; font-weight:700; margin-bottom:6px; color:var(--text-main);">${t.modal_support_phone}</label>
                <input type="tel" id="pledgePhone" class="relaxed-input" placeholder="+237 6xx xxx xxx">
              </div>
            </div>
            <div class="form-group">
              <label style="font-size:0.82rem; font-weight:700; margin-bottom:6px; color:var(--text-main);">${t.modal_support_engage}</label>
              <textarea id="pledgeMessage" class="relaxed-textarea" placeholder="${t.modal_support_engage_ph}"></textarea>
            </div>
            <button type="submit" class="btn-relaxed-submit" style="width:100%; justify-content:center; margin-top:8px;">
              ${t.modal_support_submit}
            </button>
          </form>
        </div>
      `);

      const typeBtns = modalContainer.querySelectorAll('.support-type-btn');
      const typeInput = modalContainer.querySelector('#pledgeSupportType');
      typeBtns.forEach(tBtn => {
        tBtn.addEventListener('click', () => {
          typeBtns.forEach(b => b.classList.remove('active'));
          tBtn.classList.add('active');
          if (typeInput) typeInput.value = tBtn.getAttribute('data-type');
        });
      });
    });
  });

  window.handleSupportSubmit = async (e) => {
    e.preventDefault();
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const origBtnText = submitBtn ? submitBtn.innerHTML : '';
    
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = currentLang === 'fr' ? '<span>Envoi en cours...</span>' : '<span>Submitting...</span>';
    }

    const name = document.getElementById('pledgeName')?.value || '';
    const email = document.getElementById('pledgeEmail')?.value || '';
    const phone = document.getElementById('pledgePhone')?.value || '';
    const support_type = document.getElementById('pledgeSupportType')?.value || 'Général';
    const message = document.getElementById('pledgeMessage')?.value || '';

    if (window.supabaseClient) {
      await window.supabaseClient.sendSupportPledge({ name, email, phone, support_type, message });
    }

    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = origBtnText;
    }

    closeModal();
    const t = translations[currentLang];
    window.showToast(t.modal_support_toast);
  };

  // 8. Project Modal (Multilingual)
  const projectButtons = document.querySelectorAll('.trigger-project-modal');
  projectButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const t = translations[currentLang];
      openModal(`
        <div class="modal-header">
          <div class="modal-title-wrap">
            <div class="modal-icon-badge">🎒</div>
            <div>
              <h3 class="modal-title">${t.modal_project_title}</h3>
              <p class="modal-subtitle">${t.modal_project_subtitle}</p>
            </div>
          </div>
          <button class="modal-close-btn" aria-label="Fermer">✕</button>
        </div>
        <div class="modal-body">
          <div style="height:230px; border-radius:16px; overflow:hidden; margin-bottom:18px;">
            <img src="assets/images/project_kits.jpg" style="width:100%; height:100%; object-fit:cover;" alt="Projet Éducation">
          </div>
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:16px; padding:20px; margin-bottom:20px;">
            <p style="font-size:0.92rem; color:#334155; line-height:1.7; margin-bottom:12px;">
              ${t.modal_project_obj}
            </p>
            <p style="font-size:0.92rem; color:#334155; line-height:1.7; margin-bottom:12px;">
              ${t.modal_project_ben}
            </p>
            <p style="font-size:0.92rem; color:#334155; line-height:1.7;">
              ${t.modal_project_loc}
            </p>
          </div>
          <div style="display:flex; justify-content:flex-end;">
            <button class="btn-hero-solid trigger-support-modal" onclick="closeModal(); setTimeout(() => document.querySelector('.trigger-support-modal').click(), 200);" style="background:var(--primary); color:#ffffff; font-size:0.92rem; padding:12px 24px;">
              ${t.modal_project_btn}
            </button>
          </div>
        </div>
      `);
    });
  });

  // 9. Contact Form Submission (Supabase + Feedback)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const origBtnText = submitBtn ? submitBtn.innerHTML : '';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = currentLang === 'fr' 
          ? '<span>Envoi en cours...</span>' 
          : '<span>Sending...</span>';
      }

      const name = document.getElementById('contactName')?.value || '';
      const email = document.getElementById('contactEmail')?.value || '';
      const phone = document.getElementById('contactPhone')?.value || '';
      const subject = document.getElementById('contactSubject')?.value || '';
      const message = document.getElementById('contactMessage')?.value || '';
      const t = translations[currentLang];

      if (window.supabaseClient) {
        await window.supabaseClient.sendContactMessage({ name, email, phone, subject, message });
      }

      contactForm.reset();
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = origBtnText;
      }
      window.showToast(t.contact_toast.replace('{name}', name || (currentLang === 'fr' ? 'Cher ami' : 'Dear friend')));
    });
  }

  // 10. Instant Search (Multilingual)
  const searchBtn = document.getElementById('searchToggleBtn');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      const t = translations[currentLang];
      openModal(`
        <div class="modal-header">
          <div class="modal-title-wrap">
            <div class="modal-icon-badge">🔍</div>
            <div>
              <h3 class="modal-title">${t.modal_search_title}</h3>
              <p class="modal-subtitle">${t.modal_search_sub}</p>
            </div>
          </div>
          <button class="modal-close-btn" aria-label="Fermer">✕</button>
        </div>
        <div class="modal-body search-modal-container">
          <div class="search-input-box">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" id="siteSearchInput" class="search-input-field" placeholder="${t.modal_search_ph}" autofocus>
          </div>
          <div class="search-results-list" id="searchResultsList">
            <a href="#actions" class="search-result-item" onclick="closeModal()">
              <strong>${t.search_res1_title}</strong>
              <span>${t.search_res1_sub}</span>
            </a>
            <a href="#actions" class="search-result-item" onclick="closeModal()">
              <strong>${t.search_res2_title}</strong>
              <span>${t.search_res2_sub}</span>
            </a>
            <a href="#actions" class="search-result-item" onclick="closeModal()">
              <strong>${t.search_res3_title}</strong>
              <span>${t.search_res3_sub}</span>
            </a>
            <a href="#partenaires" class="search-result-item" onclick="closeModal()">
              <strong>${t.search_res4_title}</strong>
              <span>${t.search_res4_sub}</span>
            </a>
            <a href="#contact" class="search-result-item" onclick="closeModal()">
              <strong>${t.search_res5_title}</strong>
              <span>${t.search_res5_sub}</span>
            </a>
          </div>
        </div>
      `);

      const searchInput = document.getElementById('siteSearchInput');
      const resultsList = document.getElementById('searchResultsList');
      if (searchInput && resultsList) {
        searchInput.focus();
        searchInput.addEventListener('input', (ev) => {
          const val = ev.target.value.toLowerCase().trim();
          const items = resultsList.querySelectorAll('.search-result-item');
          items.forEach(item => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(val) ? 'flex' : 'none';
          });
        });
      }
    });
  }
});
