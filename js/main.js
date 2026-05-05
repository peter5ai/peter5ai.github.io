/* ========================================
   Main JavaScript - Peter Personal Website
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all modules
  initNavbar();
  initSmoothScroll();
  initScrollAnimations();
  initMobileMenu();
  initLeadForm();
  initMusicPlayer();
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
    if (link.getAttribute('href') === '#' + currentSection) {
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
          entry.target.style.animationDelay = (cardIndex * 0.15) + 's';
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

/* ===== Lead Form ===== */
function initLeadForm() {
  const wechatId = 'TD16130';
  const copyLeadMsgBtn = document.getElementById('copyLeadMsg');
  const copyWechatBtn = document.getElementById('copyWechat');
  const emailLead = document.getElementById('emailLead');
  const toast = document.getElementById('leadToast');

  if (!copyLeadMsgBtn || !copyWechatBtn || !emailLead) return;

  function showToast(text) {
    if (!toast) return;
    toast.textContent = text;
    toast.classList.add('show');
    window.setTimeout(() => toast.classList.remove('show'), 1600);
  }

  function safeValue(id) {
    const el = document.getElementById(id);
    return el ? (el.value || '').trim() : '';
  }

  function buildMessage() {
    const company = safeValue('leadCompany');
    const role = safeValue('leadRole');
    const city = safeValue('leadCity');
    const contact = safeValue('leadContact');
    const scenario = safeValue('leadScenario');
    const pain = safeValue('leadPain');

    const lines = [
      '你好彼得，我想预约30分钟AI落地诊断。',
      company ? '公司/工厂：' + company : null,
      role ? '岗位：' + role : null,
      city ? '城市：' + city : null,
      contact ? '联系方式：' + contact : null,
      scenario ? '优先场景：' + scenario : null,
      pain ? '当前痛点：' + pain : null,
      '方便的话请给我一个建议：先做哪个切口、怎么验收、需要我准备哪些资料。'
    ].filter(Boolean);

    return lines.join('\n');
  }

  async function copyText(text) {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (_) {}
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch (_) {
      return false;
    }
  }

  copyLeadMsgBtn.addEventListener('click', async function() {
    const msg = buildMessage();
    const ok = await copyText(msg);
    showToast(ok ? '已复制咨询话术' : '复制失败，请手动复制');
  });

  copyWechatBtn.addEventListener('click', async function() {
    const ok = await copyText(wechatId);
    showToast(ok ? '已复制微信号' : '复制失败，请手动复制');
  });

  emailLead.addEventListener('click', function() {
    const msg = buildMessage();
    const subject = encodeURIComponent('预约30分钟AI落地诊断');
    const body = encodeURIComponent(msg);
    emailLead.href = 'mailto:peter5ai@qq.com?subject=' + subject + '&body=' + body;
  });
}

/* ===== Background Music Player ===== */
function initMusicPlayer() {
  const audio = document.getElementById('bgMusic');
  const musicBtn = document.getElementById('musicBtn');
  const musicBars = document.getElementById('musicBars');
  
  if (!audio || !musicBtn) return;

  let isPlaying = false;

  function updateUI() {
    if (isPlaying) {
      musicBtn.classList.add('playing');
      if (musicBars) {
        musicBars.classList.remove('paused');
      }
      // Update icon to pause
      musicBtn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/></svg>';
    } else {
      musicBtn.classList.remove('playing');
      if (musicBars) {
        musicBars.classList.add('paused');
      }
      // Update icon to play
      musicBtn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
    }
  }

  musicBtn.addEventListener('click', async function() {
    try {
      if (isPlaying) {
        audio.pause();
        isPlaying = false;
      } else {
        // Try to play audio
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            isPlaying = true;
          }).catch((error) => {
            console.log('Audio play failed:', error);
            // Still update UI to show playing state for demo
            isPlaying = true;
          });
        } else {
          isPlaying = true;
        }
      }
      updateUI();
    } catch (e) {
      console.error('Music player error:', e);
      // Toggle UI anyway
      isPlaying = !isPlaying;
      updateUI();
    }
  });

  // Initial UI
  updateUI();
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
