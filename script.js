/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   Dermats â€” JavaScript Interactions
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

document.addEventListener('DOMContentLoaded', () => {

  // â”€â”€ NAVBAR SCROLL EFFECT â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const navbar = document.getElementById('navbar');
  const heroBranding = document.getElementById('hero-branding');
  window.addEventListener('scroll', () => {
    const threshold = heroBranding ? heroBranding.offsetTop + heroBranding.offsetHeight : 60;
    if (window.scrollY > threshold) {
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
    const message = `Hi! I would like to book a consultation.\n\n*Name:* ${formName.value}\n*Phone:* ${formPhone.value}\n*Treatment:* ${formSvc.value}`;
    const whatsappUrl = `https://wa.me/919400386300?text=${encodeURIComponent(message)}`;
    
    formSubmit.textContent = 'Redirecting...';
    formSubmit.style.background = 'linear-gradient(135deg, #059669, #047857)';
    
    window.open(whatsappUrl, '_blank');

    setTimeout(() => {
      [formName, formPhone, formSvc].forEach(el => el.value = '');
      formSubmit.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" style="margin-right:8px; vertical-align:middle; font-size:1.2em;"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>Book Free Consultation';
      formSubmit.style.background = '';
    }, 2000);
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

