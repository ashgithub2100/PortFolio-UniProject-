/**
 * Main Application Logic - Aditya Sharma Portfolio
 * Features:
 * - IntersectionObserver scroll reveal orchestrator
 * - Quick copy email with animated toast notification
 * - Project Architecture & Deep Dive Modal
 * - Mobile navigation drawer
 * - Interactive Simulated Terminal
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
          // Unobserve once revealed for performance
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }

  // --------------------------------------------------------------------------
  // 2. MOBILE NAVIGATION DRAWER
  // --------------------------------------------------------------------------
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileNavOverlay) {
    const toggleMenu = () => {
      const isActive = mobileNavOverlay.classList.toggle('is-active');
      document.body.style.overflow = isActive ? 'hidden' : '';
      mobileMenuBtn.setAttribute('aria-expanded', isActive);
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
  // 3. COPY EMAIL TO CLIPBOARD WITH TOAST NOTIFICATION
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
      const email = btn.getAttribute('data-email') || 'aditya.sharma.dev@example.com';
      
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(email);
        } else {
          // Fallback for non-https local environments
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
  // 4. PROJECT ARCHITECTURE & DEEP DIVE MODAL
  // --------------------------------------------------------------------------
  const modalOverlay = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalTitle = document.getElementById('modal-title');
  const modalTag = document.getElementById('modal-tag');
  const modalDesc = document.getElementById('modal-desc');
  const modalArch = document.getElementById('modal-arch');
  const modalTech = document.getElementById('modal-tech');
  const modalGithubLink = document.getElementById('modal-github-link');

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

  const projectModalTriggers = document.querySelectorAll('[data-project-trigger]');

  function openProjectModal(projectId) {
    const data = projectData[projectId];
    if (!data || !modalOverlay) return;

    modalTag.textContent = data.tag;
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.desc;
    modalArch.textContent = data.arch;

    // Render tech pills
    modalTech.innerHTML = '';
    data.tech.forEach(t => {
      const pill = document.createElement('span');
      pill.className = 'tag-pill tag-emerald';
      pill.textContent = t;
      modalTech.appendChild(pill);
    });

    if (modalGithubLink) {
      modalGithubLink.href = data.github;
    }

    modalOverlay.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  projectModalTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-project-trigger');
      openProjectModal(id);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeProjectModal();
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('is-active')) {
        closeProjectModal();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 5. INTERACTIVE TERMINAL FLUID TYPING / PROMPT
  // --------------------------------------------------------------------------
  const terminalDynamic = document.getElementById('terminal-interactive-line');
  if (terminalDynamic) {
    const commands = [
      'python -m inference --model llama3 --gpu cuda:0',
      'git status -s # All pipelines operational',
      'torch.cuda.is_available() # True [NVIDIA CUDA Core]',
      'build --target startup_venture --mode scale'
    ];
    let cmdIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typeDelay = 80;

    function typeCommand() {
      const current = commands[cmdIdx];

      if (isDeleting) {
        terminalDynamic.textContent = current.substring(0, charIdx - 1);
        charIdx--;
        typeDelay = 40;
      } else {
        terminalDynamic.textContent = current.substring(0, charIdx + 1);
        charIdx++;
        typeDelay = 70;
      }

      if (!isDeleting && charIdx === current.length) {
        typeDelay = 2200; // Pause at end of command
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        cmdIdx = (cmdIdx + 1) % commands.length;
        typeDelay = 500;
      }

      setTimeout(typeCommand, typeDelay);
    }

    setTimeout(typeCommand, 1000);
  }
});
