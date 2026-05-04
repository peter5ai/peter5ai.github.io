/* ========================================
   Main JavaScript - Peter Personal Website
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all modules
  initNavbar();
  initSmoothScroll();
  initScrollAnimations();
  initMobileMenu();
});

/* ===== Navbar Scroll Effect ===== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  let lastScrollY = window.scrollY;

  function updateNavbar() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScrollY = currentScrollY;
  }

  // Throttle scroll event
  let ticking = false;
  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        updateNavbar();
        updateActiveNavLink();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Initial check
  updateNavbar();
}

/* ===== Smooth Scroll ===== */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      if (href === '#') return;

      e.preventDefault();

      const target = document.querySelector(href);
      if (target) {
        const navbarHeight = document.getElementById('navbar').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Close mobile menu if open
        const nav = document.getElementById('navbarNav');
        if (nav.classList.contains('active')) {
          nav.classList.remove('active');
        }
      }
    });
  });
}

/* ===== Active Nav Link on Scroll ===== */
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-nav a');

  let currentSection = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

/* ===== Scroll Animations ===== */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll, .card-animated');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add staggered delay for cards
        if (entry.target.classList.contains('card-animated')) {
          const cards = entry.target.parentElement.querySelectorAll('.card-animated');
          const cardIndex = Array.from(cards).indexOf(entry.target);
          entry.target.style.animationDelay = `${cardIndex * 0.15}s`;
        }

        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

/* ===== Mobile Menu Toggle ===== */
function initMobileMenu() {
  const toggle = document.getElementById('navbarToggle');
  const nav = document.getElementById('navbarNav');

  if (toggle && nav) {
    toggle.addEventListener('click', function() {
      nav.classList.toggle('active');
      this.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove('active');
        toggle.classList.remove('active');
      }
    });
  }
}

/* ===== Utility Functions ===== */

// Debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
