/**
 * Kaviniyaa A S - Portfolio JavaScript
 * Zero-dependency, high performance interactive logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileMenu();
  initActiveNav();
  initProjectFilters();
  initCertModals();
  initTerminalTyping();
  initContactForm();
});

/* -------------------------------------------------------------------------- */
/* Theme Toggle (Dark / Light)                                                */
/* -------------------------------------------------------------------------- */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = themeToggleBtn.querySelector('i');
  
  // Check stored preference or system preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const currentTheme = savedTheme || (prefersDark ? 'dark' : 'dark'); // Default to neural dark
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(themeIcon, currentTheme);

  themeToggleBtn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(themeIcon, newTheme);
  });
}

function updateThemeIcon(iconElement, theme) {
  if (theme === 'light') {
    iconElement.className = 'fa-solid fa-moon';
  } else {
    iconElement.className = 'fa-solid fa-sun';
  }
}

/* -------------------------------------------------------------------------- */
/* Mobile Menu Toggle                                                         */
/* -------------------------------------------------------------------------- */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (!menuBtn || !navLinks) return;

  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const isOpen = navLinks.classList.contains('active');
    menuBtn.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
  });

  // Close when clicking any nav link
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });
}

/* -------------------------------------------------------------------------- */
/* Active Navigation Highlighting via IntersectionObserver                     */
/* -------------------------------------------------------------------------- */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(section => observer.observe(section));
}

/* -------------------------------------------------------------------------- */
/* Project Category Filtering                                                 */
/* -------------------------------------------------------------------------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory.includes(filterValue)) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'scale(0.96)';
          setTimeout(() => {
            card.style.transition = 'all 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 30);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* -------------------------------------------------------------------------- */
/* Verified Credentials Modal                                                 */
/* -------------------------------------------------------------------------- */
const CERT_DATA = {
  nptel_star: {
    title: "NPTEL Discipline Star",
    issuer: "IIT Madras / SWAYAM (MoE, Govt. of India)",
    session: "Jan - Apr 2026",
    badge: "Discipline Star ★★★",
    description: "Honored with the prestigious NPTEL Discipline Star award for demonstrating continuous dedication and exceptional performance in Computer Science & Engineering across more than 50 weeks of learning with a final score >= 55.",
    verifyUrl: "https://nptel.ac.in",
    highlight: "Certificate of Appreciation"
  },
  isro_hackathon: {
    title: "Bharatiya Antariksh Hackathon 2026",
    issuer: "ISRO (Indian Space Research Organisation) & Hack2skill",
    session: "2026",
    badge: "National Hackathon",
    description: "Recognized for innovative participation and successful idea submission addressing real-world space domain challenges during this prestigious national innovation initiative.",
    verifyId: "2026H2S06BAH-P25441",
    verifyUrl: "https://hack2skill.com",
    highlight: "Presented by ISRO"
  },
  deep_learning: {
    title: "Foundations of Deep Learning: Concepts and Applications",
    issuer: "IISc Bangalore / NPTEL (Elite Certification)",
    session: "Jan - Apr 2026 (12-week course)",
    badge: "Score: 73% (Elite)",
    description: "Comprehensive 12-week advanced course covering neural networks, deep backpropagation, CNN architectures, RNNs, and modern deep learning models with proctored exam.",
    verifyId: "NPTEL26CS01S959100181",
    verifyUrl: "https://nptel.ac.in/noc",
    highlight: "IIT Madras / IISc Bangalore Proctored"
  },
  python_joy: {
    title: "The Joy of Computing using Python",
    issuer: "IIT Madras / NPTEL (Elite Certification)",
    session: "Jan - Apr 2025 (12-week course)",
    badge: "Score: 79% (Elite)",
    description: "In-depth training on computational thinking, algorithmic programming, data structures, and Python programming paradigms.",
    verifyId: "NPTEL25CS69S1050000530",
    verifyUrl: "https://nptel.ac.in/noc",
    highlight: "Score: 79% (Elite)"
  },
  coursera_ml: {
    title: "Machine Learning for All",
    issuer: "University of London / Coursera",
    session: "Issued Dec 9, 2025",
    badge: "Verified Certificate",
    description: "Foundational mastery in machine learning concepts, supervised & unsupervised learning, model evaluation, and business applications taught by Prof. Marco Gillies.",
    verifyId: "DJNVWDIHPZSS",
    verifyUrl: "https://coursera.org/verify/DJNVWDIHPZSS",
    highlight: "Authorized by University of London"
  },
  infosys_genai: {
    title: "Generative AI for All",
    issuer: "Infosys Springboard",
    session: "Issued Dec 31, 2025",
    badge: "Infosys Certified",
    description: "Hands-on exploration of Generative AI principles, Prompt Engineering, Large Language Models (LLMs), and emerging artificial intelligence workflows.",
    verifyUrl: "https://verify.onwingspan.com",
    highlight: "Infosys Springboard"
  }
};

function initCertModals() {
  const modalBackdrop = document.getElementById('certModalBackdrop');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalContent = document.getElementById('modalDetails');
  const certCards = document.querySelectorAll('[data-cert-id]');

  if (!modalBackdrop || !modalCloseBtn) return;

  certCards.forEach(card => {
    card.addEventListener('click', () => {
      const certId = card.getAttribute('data-cert-id');
      const data = CERT_DATA[certId];
      if (!data) return;

      modalContent.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
          <span class="badge badge-cyan">${data.badge}</span>
          <span style="font-size: 0.85rem; color: var(--text-muted);">${data.session}</span>
        </div>
        <h2 style="font-size: 1.5rem; margin-bottom: 0.5rem; color: var(--text-primary);">${data.title}</h2>
        <div style="color: var(--accent-cyan); font-weight: 600; font-size: 0.95rem; margin-bottom: 1.25rem;">
          <i class="fa-solid fa-building-columns"></i> ${data.issuer}
        </div>
        <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem;">
          ${data.description}
        </p>
        ${data.verifyId ? `
          <div style="background: var(--bg-secondary); padding: 0.85rem 1.25rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); margin-bottom: 1.5rem; font-family: var(--font-mono); font-size: 0.85rem;">
            <strong style="color: var(--text-muted);">Verification ID:</strong> <span style="color: var(--accent-purple);">${data.verifyId}</span>
          </div>
        ` : ''}
        <div style="display: flex; gap: 1rem;">
          <a href="${data.verifyUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="flex: 1;">
            <i class="fa-solid fa-arrow-up-right-from-square"></i> Verify Credential
          </a>
        </div>
      `;

      modalBackdrop.classList.add('active');
    });
  });

  modalCloseBtn.addEventListener('click', () => {
    modalBackdrop.classList.remove('active');
  });

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      modalBackdrop.classList.remove('active');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      modalBackdrop.classList.remove('active');
    }
  });
}

/* -------------------------------------------------------------------------- */
/* Terminal Dynamic Typing Simulation                                         */
/* -------------------------------------------------------------------------- */
function initTerminalTyping() {
  const dynamicLine = document.getElementById('terminalDynamicText');
  if (!dynamicLine) return;

  const messages = [
    "python -m crewai.event_orchestrator",
    "streamlit run resume_analyser.py",
    "git status --porcelain",
    "g++ -O3 payslip_engine.cpp -o payslip"
  ];

  let msgIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function type() {
    const currentMsg = messages[msgIndex];

    if (isDeleting) {
      dynamicLine.textContent = currentMsg.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      dynamicLine.textContent = currentMsg.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIndex === currentMsg.length) {
      typingSpeed = 2200; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      msgIndex = (msgIndex + 1) % messages.length;
      typingSpeed = 500;
    }

    setTimeout(type, typingSpeed);
  }

  setTimeout(type, 1000);
}

/* -------------------------------------------------------------------------- */
/* Contact Form Simulation                                                    */
/* -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const alertBox = document.getElementById('formStatusAlert');

  if (!form || !alertBox) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.elements['name'].value;
    const email = form.elements['email'].value;
    const message = form.elements['message'].value;

    if (!name || !email || !message) {
      alertBox.style.display = 'block';
      alertBox.style.background = 'rgba(239, 68, 68, 0.15)';
      alertBox.style.border = '1px solid #ef4444';
      alertBox.style.color = '#ef4444';
      alertBox.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Please fill in all fields.';
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending message...';
    submitBtn.disabled = true;

    // Simulate sending
    setTimeout(() => {
      alertBox.style.display = 'block';
      alertBox.style.background = 'rgba(16, 185, 129, 0.15)';
      alertBox.style.border = '1px solid #10b981';
      alertBox.style.color = '#10b981';
      alertBox.innerHTML = '<i class="fa-solid fa-circle-check"></i> Thank you, ' + name + '! Your message has been received. I will reach back to you shortly.';
      
      form.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;

      setTimeout(() => {
        alertBox.style.display = 'none';
      }, 7000);
    }, 1000);
  });
}
