/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   Dermats â€” JavaScript Interactions
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

document.addEventListener('DOMContentLoaded', () => {

  // â”€â”€ NAVBAR SCROLL EFFECT â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // â”€â”€ MOBILE MENU â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const hamburger      = document.getElementById('hamburger');
  const mobileMenu     = document.getElementById('mobile-menu');
  const mobileClose    = document.getElementById('mobile-close');
  const mobileLinks    = document.querySelectorAll('.mobile-menu__link');

  function openMenu() {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
    hamburger.setAttribute('aria-expanded', 'true');
  }
  function closeMenu() {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
  }

  hamburger.addEventListener('click', openMenu);
  mobileClose.addEventListener('click', closeMenu);
  mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

  // â”€â”€ SCROLL REVEAL â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const revealEls = document.querySelectorAll([
    '#about-visual', '#about-text',
    '#services-header', '#service-1', '#service-2', '#service-3',
    '#service-4', '#service-5', '#service-6',
    '#gallery-header',
    '#doctors-header', '#doctor-1', '#doctor-2',
    '#process-header', '#step-1', '#step-2', '#step-3', '#step-4',
    '#testi-header',
    '#cta-content',
    '#footer'
  ].join(','));

  revealEls.forEach((el, i) => {
    el.classList.add('reveal');
    // Stagger children within grids
    const parent = el.closest('.services__grid, .process__steps, .doctors__grid');
    if (parent) {
      const siblings = [...parent.children];
      const idx = siblings.indexOf(el);
      if (idx >= 0 && idx < 5) {
        el.classList.add(`reveal-delay-${idx + 1}`);
      }
    }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));

  // â”€â”€ TESTIMONIALS SLIDER â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const track    = document.getElementById('testi-track');
  const prevBtn  = document.getElementById('testi-prev');
  const nextBtn  = document.getElementById('testi-next');
  const dots     = document.querySelectorAll('.testi-dot');
  const cards    = document.querySelectorAll('.testi-card');

  let current   = 0;
  const visible = window.innerWidth <= 768 ? 1 : 2;
  const total   = cards.length;
  const maxIdx  = total - visible;

  function goToSlide(idx) {
    current = Math.max(0, Math.min(idx, maxIdx));
    const cardWidth = cards[0].offsetWidth + 24; // gap 1.5rem = 24px
    track.style.transform = `translateX(-${current * cardWidth}px)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
  }

  prevBtn.addEventListener('click', () => goToSlide(current - 1));
  nextBtn.addEventListener('click', () => goToSlide(current + 1));
  dots.forEach(dot => {
    dot.addEventListener('click', () => goToSlide(+dot.dataset.idx));
  });

  // Auto-advance
  let autoPlay = setInterval(() => goToSlide(current < maxIdx ? current + 1 : 0), 5000);
  [prevBtn, nextBtn, ...dots].forEach(el => {
    el.addEventListener('click', () => {
      clearInterval(autoPlay);
      autoPlay = setInterval(() => goToSlide(current < maxIdx ? current + 1 : 0), 5000);
    });
  });

  // Recalculate on resize
  window.addEventListener('resize', () => {
    goToSlide(0);
  }, { passive: true });

  // â”€â”€ FORM SUBMIT â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const formSubmit = document.getElementById('form-submit');
  const formName   = document.getElementById('form-name');
  const formPhone  = document.getElementById('form-phone');
  const formSvc    = document.getElementById('form-service');

  formSubmit.addEventListener('click', () => {
    if (!formName.value.trim() || !formPhone.value.trim() || !formSvc.value) {
      formSubmit.textContent = 'âš  Please fill all fields';
      formSubmit.style.background = 'linear-gradient(135deg, #b45309, #92400e)';
      setTimeout(() => {
        formSubmit.textContent = 'Book Free Consultation';
        formSubmit.style.background = '';
      }, 2500);
      return;
    }
    formSubmit.textContent = 'âœ“ Request Sent!';
    formSubmit.style.background = 'linear-gradient(135deg, #059669, #047857)';
    [formName, formPhone, formSvc].forEach(el => el.value = '');
    setTimeout(() => {
      formSubmit.textContent = 'Book Free Consultation';
      formSubmit.style.background = '';
    }, 3000);
  });

  // â”€â”€ ACTIVE NAV LINK ON SCROLL â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav__link:not(.nav__link--cta)');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.style.color = link.getAttribute('href') === `#${id}`
            ? 'var(--teal-light)'
            : '';
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => sectionObserver.observe(s));

  // â”€â”€ PARALLAX SUBTLE EFFECT ON HERO â”€â”€â”€â”€â”€â”€â”€â”€
  const heroImg = document.getElementById('hero-img');
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (heroImg && scrolled < window.innerHeight) {
      heroImg.style.transform = `scale(1.05) translateY(${scrolled * 0.25}px)`;
    }
  }, { passive: true });

});

