/**
 * Ruchitha B M - Portfolio Interactive JavaScript
 * Modern MERN Stack Features & UI Enhancements
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const tg = document.getElementById('tg');
  const lk = document.getElementById('lk');

  if (tg && lk) {
    tg.addEventListener('click', () => {
      const isOpen = lk.classList.toggle('open');
      tg.setAttribute('aria-expanded', isOpen);
    });

    lk.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        lk.classList.remove('open');
        tg.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 2. Dynamic Typewriter Effect for Hero
  const typewriterElement = document.getElementById('typewriter');
  const roles = [
    'Computer Science & Engineering Student',
    'Full-Stack Developer (MERN Stack)',
    'Machine Learning Enthusiast',
    'DevOps & Cloud Practitioner'
  ];
  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function typeEffect() {
    if (!typewriterElement) return;

    const currentRole = roles[roleIdx];

    if (isDeleting) {
      typewriterElement.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 45;
    } else {
      typewriterElement.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIdx === currentRole.length) {
      isDeleting = true;
      typingSpeed = 1600; // Pause at full word
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typingSpeed = 400; // Brief pause before typing next
    }

    setTimeout(typeEffect, typingSpeed);
  }
  typeEffect();

  // 3. Interactive MERN Stack Architecture Tabs
  const mernData = {
    mongo: {
      title: '🍃 MongoDB & Mongoose ODM',
      desc: 'NoSQL document database engineered for flexible JSON-like schemas. I use Mongoose for schema modeling, validation, indexing, and complex data aggregations for real-time applications.',
      tags: ['Document Schemas', 'Aggregation Pipelines', 'Indexing', 'Mongoose ODM', 'Atlas Cloud']
    },
    express: {
      title: '⚡ Express.js Framework',
      desc: 'Fast, unopinionated minimalist web framework for Node.js. Used to design structured RESTful API endpoints, robust middleware (CORS, error handling, rate limiting), and JWT authentication guards.',
      tags: ['RESTful Routing', 'Custom Middleware', 'JWT Auth Guard', 'Request Validation', 'CORS']
    },
    react: {
      title: '⚛️ React.js Frontend',
      desc: 'Component-driven user interfaces built with modern functional components, custom hooks, Context API / Redux for centralized state management, responsive designs, and smooth client-side interactions.',
      tags: ['Functional Components', 'Hooks (useEffect, useState)', 'Context API / Redux', 'Responsive UI', 'Virtual DOM']
    },
    node: {
      title: '🟢 Node.js Runtime',
      desc: 'High-concurrency, asynchronous, event-driven JavaScript backend environment powering performant business logic, microservices, file handling, and seamless communication with MongoDB.',
      tags: ['Event Loop & Async/Await', 'NPM Ecosystem', 'Microservices', 'REST Controllers', 'Stream I/O']
    }
  };

  const tabBtns = document.querySelectorAll('.mern-tab-btn');
  const tabContentContainer = document.getElementById('mern-tab-content');

  if (tabBtns.length && tabContentContainer) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const key = btn.dataset.tab;
        const info = mernData[key];

        if (info) {
          tabContentContainer.innerHTML = `
            <h3>${info.title}</h3>
            <p>${info.desc}</p>
            <div class="chips">
              ${info.tags.map(t => `<span class="mern-code-pill">${t}</span>`).join('')}
            </div>
          `;
        }
      });
    });
  }

  // 4. Dynamic Project Category Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length && projectCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        projectCards.forEach(card => {
          const category = card.dataset.category || '';
          if (filter === 'all' || category.includes(filter)) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  // 5. Scroll Progress Bar & Active Nav Spy & Scroll to Top
  const progressBar = document.getElementById('scroll-progress');
  const scrollTopBtn = document.getElementById('scroll-top');
  const secs = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.links a:not(.btn)');

  window.addEventListener('scroll', () => {
    const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / scrollTotal) * 100;

    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }

    if (scrollTopBtn) {
      if (window.scrollY > 350) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }

    // Active link spy
    let current = 'home';
    secs.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 140) {
        current = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('on', link.getAttribute('href') === `#${current}`);
    });
  }, { passive: true });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 6. Resume Download Enhancement with Toast Notification
  const downloadBtn = document.getElementById('resumeDownloadBtn');
  const toast = document.getElementById('toast');

  function showToast(message, duration = 3500) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }

  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      showToast('📄 Opening / Downloading Ruchitha_B_M_Resume.pdf...');
    });
  }

  // 7. Hire Ruchitha Button & Contact Triggers
  const hireButtons = document.querySelectorAll('.hire-trigger');
  const contactContainer = document.getElementById('contactContainer');
  const nameInput = document.getElementById('n');

  hireButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
      if (contactContainer) {
        contactContainer.classList.remove('highlight-pulse');
        void contactContainer.offsetWidth; // Trigger DOM reflow
        contactContainer.classList.add('highlight-pulse');
      }
      if (nameInput) {
        setTimeout(() => nameInput.focus(), 650);
      }
      showToast('✨ Direct contact channels & message form ready below!');
    });
  });

  // 8. Copy Email Address Button
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'ruchithabmohan@gmail.com';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(() => {
          copyEmailBtn.textContent = 'Copied! ✓';
          showToast('📋 Email copied to clipboard!');
          setTimeout(() => {
            copyEmailBtn.textContent = '📋 Copy';
          }, 2500);
        }).catch(() => {
          showToast(`Email: ${email}`);
        });
      } else {
        showToast(`Email: ${email}`);
      }
    });
  }

  // 9. Interactive Contact Form Handler (Transmit Message)
  const contactForm = document.getElementById('cf');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nInput = document.getElementById('n');
      const eInput = document.getElementById('e');
      const sInput = document.getElementById('s');
      const mInput = document.getElementById('m');

      const name = nInput ? nInput.value.trim() : '';
      const email = eInput ? eInput.value.trim() : '';
      const subjectText = sInput && sInput.value.trim() ? sInput.value.trim() : `Opportunity from ${name}`;
      const msg = mInput ? mInput.value.trim() : '';

      if (!name || !email || !msg) {
        showToast('⚠️ Please fill in all fields before transmitting.');
        return;
      }

      showToast('✉️ Transmitting message to email client...');

      const subject = encodeURIComponent(subjectText);
      const body = encodeURIComponent(`${msg}\n\n---\nSender Name: ${name}\nSender Email: ${email}`);

      setTimeout(() => {
        window.location.href = `mailto:ruchithabmohan@gmail.com?subject=${subject}&body=${body}`;
      }, 600);
    });
  }

  // 8. Scroll Reveal Animations (Intersection Observer)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.rv').forEach(el => observer.observe(el));

  // Current year in footer
  const yearSpan = document.getElementById('y');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
