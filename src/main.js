// ==========================================================================
// DARK STAR ART — GALLERY LIGHTBOX & INTERACTIVE CLIENT ENGINE
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initLightboxModal();
  initFormSuccessCheck();
});

// 1. MOBILE NAVIGATION TOGGLE
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.art-nav');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isActive = navMenu.classList.toggle('is-active');
    toggleBtn.setAttribute('aria-expanded', isActive);
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!toggleBtn.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove('is-active');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

// 2. INTERACTIVE ARTWORK LIGHTBOX MODAL
function initLightboxModal() {
  const lightbox = document.getElementById('lightbox-modal');
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const lightboxTitle = lightbox.querySelector('.lightbox-title');
  const lightboxSub = lightbox.querySelector('.lightbox-sub');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-nav.prev');
  const nextBtn = lightbox.querySelector('.lightbox-nav.next');

  let currentArtworks = [];
  let currentIndex = 0;

  function collectArtworks() {
    const cards = document.querySelectorAll('.art-card, .hero-art-display');
    currentArtworks = Array.from(cards).map(card => {
      const img = card.querySelector('img');
      const titleEl = card.querySelector('.art-card-title, .hero-art-title');
      const mediumEl = card.querySelector('.art-card-medium, .hero-art-sub');
      const albumEl = card.querySelector('.art-card-album');

      return {
        src: img ? img.dataset.highres || img.src : '',
        alt: img ? img.alt : '',
        title: titleEl ? titleEl.textContent.trim() : 'UrbanHippieArt Selected Work',
        medium: mediumEl ? mediumEl.textContent.trim() : '',
        album: albumEl ? albumEl.textContent.trim() : ''
      };
    }).filter(art => art.src !== '');
  }

  collectArtworks();

  function openLightbox(index) {
    if (currentArtworks.length === 0) collectArtworks();
    if (index < 0 || index >= currentArtworks.length) return;

    currentIndex = index;
    const art = currentArtworks[currentIndex];

    lightboxImg.src = art.src;
    lightboxImg.alt = art.alt || art.title;
    lightboxTitle.textContent = art.title;
    lightboxSub.textContent = [art.medium, art.album].filter(Boolean).join(' • ');

    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function showNext() {
    const nextIdx = (currentIndex + 1) % currentArtworks.length;
    openLightbox(nextIdx);
  }

  function showPrev() {
    const prevIdx = (currentIndex - 1 + currentArtworks.length) % currentArtworks.length;
    openLightbox(prevIdx);
  }

  // Attach click listeners to cards
  document.querySelectorAll('.art-card, .hero-art-display').forEach((card, idx) => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      openLightbox(idx);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(idx);
      }
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (nextBtn) nextBtn.addEventListener('click', showNext);
  if (prevBtn) prevBtn.addEventListener('click', showPrev);

  // Keyboard navigation & Escape key handling
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;

    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      showNext();
    } else if (e.key === 'ArrowLeft') {
      showPrev();
    }
  });

  // Close when clicking overlay backdrop
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
}

// 3. NETLIFY FORM SUCCESS STATE CHECK
function initFormSuccessCheck() {
  const params = new URLSearchParams(window.location.search);
  if (params.get('submitted') === 'true') {
    const form = document.querySelector('form[name="representation-inquiry"]');
    if (form) {
      const banner = document.createElement('div');
      banner.className = 'success-banner';
      banner.innerHTML = `
        <svg style="width:24px; height:24px; fill:currentColor;" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
        <div>
          <strong>Inquiry Submitted Successfully</strong>
          <p style="font-size:0.85rem; margin-top:0.2rem;">Thank you for contacting Dark Star Art. We will review your submission promptly.</p>
        </div>
      `;
      form.parentNode.insertBefore(banner, form);
      form.reset();
    }
  }
}
