/**
 * Main Application Logic - Aditya Sharma Portfolio
 * Features:
 * - Scroll reveal orchestrator
 * - Sound Mute/Unmute state toggle with audio engine
 * - Project Architecture & Interactive Simulator Modal
 * - Quick copy email with animated toast notification
 * - Mobile navigation drawer
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. SCROLL REVEAL (IntersectionObserver)
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }

  // --------------------------------------------------------------------------
  // 2. SOUND TOGGLE BUTTON (Web Audio API)
  // --------------------------------------------------------------------------
  const audioToggleBtn = document.getElementById('audio-toggle-btn');
  const audioIcon = document.getElementById('audio-icon');

  if (audioToggleBtn && window.cyberAudio) {
    audioToggleBtn.addEventListener('click', () => {
      const isMuted = window.cyberAudio.toggle();
      audioToggleBtn.classList.toggle('is-muted', isMuted);
      audioToggleBtn.setAttribute('aria-label', isMuted ? 'Unmute Audio' : 'Mute Audio');
      
      if (audioIcon) {
        audioIcon.innerHTML = isMuted 
          ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>`
          : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`;
      }
    });
  }

  // --------------------------------------------------------------------------
  // 3. MOBILE NAVIGATION DRAWER
  // --------------------------------------------------------------------------
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileNavOverlay) {
    const toggleMenu = () => {
      const isActive = mobileNavOverlay.classList.toggle('is-active');
      document.body.style.overflow = isActive ? 'hidden' : '';
      mobileMenuBtn.setAttribute('aria-expanded', isActive);
      if (window.cyberAudio) window.cyberAudio.playClick();
    };

    mobileMenuBtn.addEventListener('click', toggleMenu);

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNavOverlay.classList.remove('is-active');
        document.body.style.overflow = '';
      });
    });
  }

  // --------------------------------------------------------------------------
  // 4. COPY EMAIL TO CLIPBOARD WITH TOAST
  // --------------------------------------------------------------------------
  const copyEmailBtns = document.querySelectorAll('.copy-email-btn');
  const toast = document.getElementById('toast-notification');
  const toastMessage = document.getElementById('toast-message');
  let toastTimeout = null;

  function showToast(message) {
    if (!toast) return;
    if (toastMessage) toastMessage.textContent = message;
    toast.classList.add('is-visible');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 3200);
  }

  copyEmailBtns.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const email = btn.getAttribute('data-email') || 'ash76323@gmail.com';
      if (window.cyberAudio) window.cyberAudio.playClick();

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(email);
        } else {
          const textArea = document.createElement('textarea');
          textArea.value = email;
          textArea.style.position = 'fixed';
          textArea.style.opacity = '0';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
        }
        showToast(`Email copied: ${email}`);
      } catch (err) {
        showToast(`Email: ${email}`);
      }
    });
  });

  // --------------------------------------------------------------------------
  // 5. PROJECT ARCHITECTURE & INTERACTIVE SIMULATOR MODAL
  // --------------------------------------------------------------------------
  const modalOverlay = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalTitle = document.getElementById('modal-title');
  const modalTag = document.getElementById('modal-tag');
  const modalDesc = document.getElementById('modal-desc');
  const modalArch = document.getElementById('modal-arch');
  const modalTech = document.getElementById('modal-tech');
  const modalGithubLink = document.getElementById('modal-github-link');
  const modalSimTabBtn = document.getElementById('modal-tab-sim');
  const modalArchTabBtn = document.getElementById('modal-tab-arch');
  const modalArchContent = document.getElementById('modal-arch-content');
  const modalSimContent = document.getElementById('modal-sim-content');

  const projectData = {
    'study-buddy': {
      tag: '01 // LLM & NATURAL LANGUAGE PROCESSING',
      title: 'AI Study Buddy',
      desc: 'An intelligent educational assistant built with Python that processes lecture notes, textbook chapters, and research papers in PDF format. Using state-of-the-art LLM APIs (OpenAI / Claude), it generates structured markdown summaries, flashcards, and conceptual quizzes with automated scoring.',
      arch: 'The pipeline extracts PDF text via PyPDF/pdfplumber, chunks the document using sliding context windows, and uses prompt-engineered system instructions to extract core principles without hallucination. Generates interactive multi-choice quizzes with real-time feedback loops.',
      tech: ['Python', 'OpenAI API', 'Claude API', 'Prompt Engineering', 'PyPDF', 'JSON Schemas'],
      github: 'https://github.com'
    },
    'movie-recommender': {
      tag: '02 // MACHINE LEARNING & DATA SCIENCE',
      title: 'Movie Recommender System',
      desc: 'A machine learning recommendation engine designed to tackle user cold-start and rating sparsity problems. Built using collaborative filtering with Scikit-learn and Pandas, the system computes cosine similarities across user-item rating matrices to deliver high-precision personalized suggestions.',
      arch: 'Implements both item-based and user-based collaborative filtering models. Evaluated using Root Mean Squared Error (RMSE) and Mean Absolute Error (MAE) benchmarks on the MovieLens dataset, featuring vectorized similarity calculations for fast inference.',
      tech: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Collaborative Filtering', 'Data Wrangling'],
      github: 'https://github.com'
    },
    'expense-tracker': {
      tag: '03 // SYSTEMS & TOOLING',
      title: 'Expense Tracker CLI',
      desc: 'A lightweight, modular command-line interface engineered in Python for tracking daily expenses, categorizing spending, and visualizing monthly financial trends directly in the terminal.',
      arch: 'Designed with a decoupled architecture separating the CLI argument parser, data persistence layer (JSON/CSV with atomic writes), and an ASCII analytics renderer. Fully version-controlled with Git commit workflows and structured branches.',
      tech: ['Python', 'Argparse / Click', 'Git Version Control', 'Data Analytics', 'CLI Design'],
      github: 'https://github.com'
    }
  };

  let activeProjectId = null;

  function openProjectModal(projectId, defaultTab = 'arch') {
    const data = projectData[projectId];
    if (!data || !modalOverlay) return;
    activeProjectId = projectId;

    modalTag.textContent = data.tag;
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.desc;
    modalArch.textContent = data.arch;

    modalTech.innerHTML = '';
    data.tech.forEach(t => {
      const pill = document.createElement('span');
      pill.className = 'tag-pill tag-emerald';
      pill.textContent = t;
      modalTech.appendChild(pill);
    });

    if (modalGithubLink) modalGithubLink.href = data.github;

    // Render interactive simulator
    if (window.renderProjectSimulator && modalSimContent) {
      window.renderProjectSimulator(projectId, modalSimContent);
    }

    switchModalTab(defaultTab);

    modalOverlay.classList.add('is-active');
    document.body.style.overflow = 'hidden';

    if (window.cyberAudio) window.cyberAudio.playClick();
  }

  function closeProjectModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('is-active');
    document.body.style.overflow = '';
    if (window.cyberAudio) window.cyberAudio.playClick();
  }

  function switchModalTab(tabName) {
    if (tabName === 'sim') {
      if (modalSimTabBtn) modalSimTabBtn.classList.add('is-active');
      if (modalArchTabBtn) modalArchTabBtn.classList.remove('is-active');
      if (modalSimContent) modalSimContent.style.display = 'block';
      if (modalArchContent) modalArchContent.style.display = 'none';
    } else {
      if (modalArchTabBtn) modalArchTabBtn.classList.add('is-active');
      if (modalSimTabBtn) modalSimTabBtn.classList.remove('is-active');
      if (modalArchContent) modalArchContent.style.display = 'block';
      if (modalSimContent) modalSimContent.style.display = 'none';
    }
  }

  if (modalArchTabBtn && modalSimTabBtn) {
    modalArchTabBtn.addEventListener('click', () => {
      switchModalTab('arch');
      if (window.cyberAudio) window.cyberAudio.playClick();
    });
    modalSimTabBtn.addEventListener('click', () => {
      switchModalTab('sim');
      if (window.cyberAudio) window.cyberAudio.playClick();
    });
  }

  document.querySelectorAll('[data-project-trigger]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-project-trigger');
      const tab = btn.getAttribute('data-project-tab') || 'arch';
      openProjectModal(id, tab);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeProjectModal();
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('is-active')) {
        closeProjectModal();
      }
    });
  }
});
