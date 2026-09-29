/**
 * Shreya Singh — Professional Portfolio Logic
 * Recruiter-Focused, High-Performance, Accessible
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initActiveSectionObserver();
  initProjectFilters();
  initProjectModals();
  initClipboardActions();
  initContactForm();
  initKeyboardShortcuts();
});

/* --------------------------------------------------------------------------
   1. Theme Management (Dark / Light Mode)
   -------------------------------------------------------------------------- */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('shreya_theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Default to dark theme as primary professional presentation
  const initialTheme = storedTheme || (systemPrefersDark ? 'dark' : 'dark');
  document.documentElement.setAttribute('data-theme', initialTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('shreya_theme', newTheme);
      showToast(`Switched to ${newTheme} mode`);
    });
  }
}

/* --------------------------------------------------------------------------
   2. Mobile Navigation
   -------------------------------------------------------------------------- */
function initNavigation() {
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile nav when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          mobileToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }
}

/* --------------------------------------------------------------------------
   3. Active Section Observer
   -------------------------------------------------------------------------- */
function initActiveSectionObserver() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  });

  sections.forEach(sec => observer.observe(sec));
}

/* --------------------------------------------------------------------------
   4. Project Category Filtering
   -------------------------------------------------------------------------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button state
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   5. Technical Project Deep-Dive Modal Data & Handler
   -------------------------------------------------------------------------- */
const PROJECT_SPECS = {
  'portfolio': {
    title: 'Developer Portfolio Website',
    timeline: 'June 2026',
    category: 'Web & Systems Architecture',
    repoUrl: 'https://github.com/sshreya-001/portfolio',
    techStack: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'Design Tokens', 'Git', 'Vercel CI/CD'],
    overview: 'A high-performance personal developer portfolio built with a custom token-based design system, dynamic theme toggling, recruiter-focused scanning tools, and zero runtime dependencies.',
    engineeringDetails: [
      'Built and deployed a responsive developer portfolio with a custom token-based design system, dark/light theme switching, interactive project filtering, and accessible keyboard navigation using vanilla JavaScript.',
      'Implemented recruiter-focused project previews and optimized SEO, asset loading, cross-browser performance, and automated CI/CD deployment through GitHub and Vercel.',
      'Architected a zero-framework, lightweight vanilla stack delivering instant page loads, smooth micro-interactions, and 100% responsive viewport scaling.'
    ]
  },
  'story-enhancer': {
    title: 'AI Story Enhancer',
    timeline: 'February 2026',
    category: 'AI-Powered Web Application',
    liveUrl: 'https://story-scene.vercel.app/',
    techStack: ['React.js', 'Node.js', 'Express.js', 'JavaScript', 'REST APIs', 'AI API Integration', 'Vercel Deployment'],
    overview: 'An AI-powered web application that enhances user-written stories by refining tone, structure, and creativity based on selected genre and language preferences.',
    engineeringDetails: [
      'Built a clean, responsive frontend with React.js featuring real-time input capture, tone selector menus, and responsive side-by-side editing views.',
      'Developed dedicated backend endpoints using Node.js and Express.js to process and validate user input payloads before executing AI API calls.',
      'Configured structured prompt pipelines to tune AI outputs according to genre-specific vocabularies and creative nuances.',
      'Deployed on Vercel with production environment variable management, CORS policies, and graceful error recovery.'
    ]
  },
  'songify': {
    title: 'Songify — Music Streaming Mobile Application',
    timeline: 'January 2026',
    category: 'Cross-Platform Mobile Application',
    techStack: ['React Native', 'Expo', 'TypeScript', 'Context API', 'AsyncStorage', 'Expo AV', 'Expo Router'],
    overview: 'A full-featured mobile streaming application designed for seamless audio playback, persistent user libraries, and responsive state updates.',
    engineeringDetails: [
      'Built with React Native and Expo, integrating Expo AV for comprehensive audio playback capabilities: play/pause, scrub/seek, shuffle, repeat, and volume control.',
      'Implemented robust offline favorites management via React Context API backed by AsyncStorage, organizing liked tracks into a dedicated Favorites album.',
      'Structured application routing using Expo Router for modular, file-based tab and stack navigation.',
      'Optimized playback state management with custom React Hooks, ensuring steady 60 FPS transitions and fluid UI updates during continuous streaming.'
    ]
  },
  'savrajya': {
    title: 'Savrajya — Digital Publishing Platform',
    timeline: 'November 2024',
    category: 'Full-Stack Web Platform',
    techStack: ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'JavaScript', 'REST APIs'],
    overview: 'A feature-rich digital publishing platform enabling authors to compose, publish, and manage multi-chapter stories and articles while driving reader engagement.',
    engineeringDetails: [
      'Engineered an author CMS with chapter-wise publishing workflows, allowing writers to draft, schedule, and release serialized stories.',
      'Built an interactive reader commenting and review feedback system to stimulate community engagement and feedback submission.',
      'Designed scalable MongoDB schemas for authors, chapters, comments, and ratings, supported by optimized Express.js REST API endpoints.',
      'Implemented front-to-back state management in React.js with responsive pagination and fast content indexing.'
    ]
  },
  'chhanv': {
    title: 'Chhanv Well-Fare',
    timeline: 'November 2022',
    category: 'Donation & Volunteering Portal',
    liveUrl: 'https://channv-help.vercel.app/',
    techStack: ['HTML5', 'CSS3', 'PHP', 'MySQL', 'QR Integration', 'Vercel Deployment'],
    overview: 'A user-friendly web portal designed to promote charitable donations and volunteer coordination for orphans, elderly citizens, and vulnerable communities.',
    engineeringDetails: [
      'Created an accessible, welcoming user interface to lower friction for first-time donors and volunteer applicants.',
      'Integrated QR code payment support for direct and verifiable financial contributions.',
      'Designed a drive management back-office in PHP/MySQL allowing organizers to schedule and track community outreach initiatives.',
      'Deployed on Vercel, significantly boosting donor participation and volunteer sign-ups through streamlined user journeys.'
    ]
  }
};

function initProjectModals() {
  const modal = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close');
  const modalContent = document.getElementById('modal-content');
  const detailButtons = document.querySelectorAll('.view-details-btn');

  if (!modal || !modalContent) return;

  detailButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-project');
      const data = PROJECT_SPECS[projectId];

      if (!data) return;

      modalContent.innerHTML = `
        <div class="modal-header-section">
          <span class="modal-project-meta">${data.category} · ${data.timeline}</span>
          <h3 class="modal-project-title">${data.title}</h3>
          <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 14px;">
            ${data.liveUrl ? `
              <a href="${data.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="btn-icon-svg">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
                <span>Launch Live Application ↗</span>
              </a>
            ` : ''}
            ${data.repoUrl ? `
              <a href="${data.repoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
                <svg viewBox="0 0 24 24" fill="currentColor" class="btn-icon-svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
                <span>View on GitHub ↗</span>
              </a>
            ` : ''}
          </div>
        </div>

        <div class="modal-block">
          <h4 class="modal-block-title">Project Overview</h4>
          <p>${data.overview}</p>
        </div>

        <div class="modal-block">
          <h4 class="modal-block-title">Engineering Highlights</h4>
          <ul class="resume-bullet-list">
            ${data.engineeringDetails.map(item => `<li>${item}</li>`).join('')}
          </ul>
        </div>

        <div class="modal-block">
          <h4 class="modal-block-title">Technologies Used</h4>
          <div class="modal-tech-list">
            ${data.techStack.map(t => `<span class="tech-tag">${t}</span>`).join('')}
          </div>
        </div>
      `;

      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   6. Clipboard Copy Actions
   -------------------------------------------------------------------------- */
function initClipboardActions() {
  const copyButtons = document.querySelectorAll('[data-email]');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = btn.getAttribute('data-email');
      if (!email) return;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(() => {
          showToast(`Copied ${email} to clipboard!`);
          const label = btn.querySelector('.copy-text');
          if (label) {
            const original = label.textContent;
            label.textContent = 'Copied!';
            setTimeout(() => { label.textContent = original; }, 2000);
          }
        }).catch(() => {
          fallbackCopyText(email);
        });
      } else {
        fallbackCopyText(email);
      }
    });
  });
}

function fallbackCopyText(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
    showToast(`Copied ${text} to clipboard!`);
  } catch (err) {
    showToast(`Please email directly: ${text}`);
  }
  document.body.removeChild(textarea);
}

/* --------------------------------------------------------------------------
   7. Contact Form Handling
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name')?.value || '';
    const email = document.getElementById('contact-sender-email')?.value || '';
    const subject = document.getElementById('contact-subject')?.value || 'Portfolio Inquiry';
    const message = document.getElementById('contact-message')?.value || '';

    const bodyText = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    const mailtoUrl = `mailto:sshreya3095@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;

    showToast('Opening your email client...');
    window.location.href = mailtoUrl;

    form.reset();
  });
}

/* --------------------------------------------------------------------------
   8. Toast Notification Utility
   -------------------------------------------------------------------------- */
let toastTimeout;
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');

  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add('show');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

/* --------------------------------------------------------------------------
   9. Keyboard Shortcuts
   -------------------------------------------------------------------------- */
function initKeyboardShortcuts() {
  window.addEventListener('keydown', (e) => {
    // Avoid triggering when user is typing in inputs or textareas
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      return;
    }

    if (e.key === 't' || e.key === 'T') {
      const toggle = document.getElementById('theme-toggle');
      if (toggle) toggle.click();
    }
  });
}
