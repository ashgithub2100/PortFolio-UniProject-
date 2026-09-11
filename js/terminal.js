/**
 * Interactive Real Developer Terminal - Aditya Sharma Portfolio
 * Features:
 * - Real live command input with history (Up/Down arrow navigation)
 * - Authentic command suite: help, skills, projects, about, matrix, clear, contact, sudo
 * - Matrix Cyber Rain mini-engine inside terminal window
 * - 1-Click interactive quick pills for mobile & quick exploration
 * - Audio keystroke feedback
 */

(function initInteractiveTerminal() {
  const terminalBody = document.getElementById('terminal-interactive-body');
  const terminalInput = document.getElementById('terminal-command-input');
  const terminalForm = document.getElementById('terminal-form');
  const quickPills = document.querySelectorAll('[data-term-cmd]');

  if (!terminalBody || !terminalInput) return;

  let commandHistory = [];
  let historyIndex = -1;

  const COMMANDS = {
    help: () => `
<span class="term-accent">AVAILABLE SYSTEM COMMANDS:</span>
  <span class="term-cyan">skills</span>     - Display technical competency matrix & proficiency
  <span class="term-cyan">projects</span>   - List featured machine learning & AI systems
  <span class="term-cyan">about</span>      - Academic vision, background & entrepreneurial goal
  <span class="term-cyan">matrix</span>     - Initialize real-time cyber neural stream
  <span class="term-cyan">contact</span>    - Show direct email, GitHub & LinkedIn channels
  <span class="term-cyan">clear</span>      - Flush terminal buffer
  <span class="term-cyan">sudo</span>       - Request privileged root access
`,
    about: () => `
<span class="term-accent">// DEVELOPER IDENTITY TELEMETRY</span>
Name:      <span class="term-highlight">Aditya Sharma</span>
Role:      Computer Science Undergraduate (AI & Data Science)
Vision:    Architecting pragmatic AI tools & launching high-impact tech ventures
Focus:     Large Language Models (LLMs), CUDA GPU Acceleration, Scikit-learn
Status:    Available for internships & cutting-edge collaborations
`,
    whoami: () => COMMANDS.about(),
    skills: () => `
<span class="term-accent">// TECHNICAL COMPETENCY ARSENAL</span>
  <span class="term-cyan">Python</span>              [██████████████████░] 95% // Core Architecture
  <span class="term-cyan">LLM Orchestration</span>   [██████████████████░] 92% // OpenAI / Claude
  <span class="term-cyan">Pandas & NumPy</span>      [██████████████████░] 90% // Data Wrangling
  <span class="term-cyan">Git & GitHub</span>        [██████████████████░] 90% // Version Control
  <span class="term-cyan">Scikit-learn</span>        [████████████████░░░] 88% // Matrix Similarity
  <span class="term-cyan">Linux / Bash</span>        [███████████████░░░░] 85% // Shell Navigation
  <span class="term-cyan">C / C++</span>             [██████████████░░░░░] 80% // Systems Foundations
  <span class="term-amber">CUDA Parallel Comp</span>  [██████████░░░░░░░░░] Active Learning
  <span class="term-amber">Deep Learning</span>       [██████████░░░░░░░░░] Active Learning
`,
    projects: () => `
<span class="term-accent">// FEATURED DEPLOYED SYSTEMS</span>
  <span class="term-cyan">01. AI Study Buddy</span>
      LLM & NLP chatbot transforming PDFs into structured study guides & auto-graded quizzes.
  <span class="term-cyan">02. Movie Recommender System</span>
      Collaborative filtering engine calculating cosine similarity matrices on MovieLens.
  <span class="term-cyan">03. Expense Tracker CLI</span>
      Modular Python command-line utility with atomic persistence & spending analytics.

<span class="term-muted">Tip: Click 'Architecture & Details' on project cards below for deep-dive diagrams!</span>
`,
    contact: () => `
<span class="term-accent">// COMM LINK TELEMETRY</span>
  Email:    <a href="mailto:ash76323@gmail.com" class="term-link">ash76323@gmail.com</a>
  GitHub:   <a href="https://github.com" target="_blank" class="term-link">github.com/aditya</a>
  LinkedIn: <a href="https://linkedin.com" target="_blank" class="term-link">linkedin.com/in/aditya</a>
`,
    sudo: () => `
<span class="term-amber">root@aditya-dev-station: Permission denied.</span>
<span class="term-muted">Aditya is not in the sudoers file. This incident has been logged to the CUDA GPU cluster.</span>
`,
    clear: () => {
      terminalBody.innerHTML = '';
      return null;
    },
    matrix: () => {
      runMatrixRain();
      return `<span class="term-accent">Initializing cyber matrix rain stream... [Press ESC or type any command to halt]</span>`;
    }
  };

  function appendLine(cmdText, outputHtml) {
    const line = document.createElement('div');
    line.className = 'terminal-log-entry';

    let html = `
      <div class="terminal-line">
        <span class="terminal-prompt">&gt;</span>
        <span class="term-cmd-text">${escapeHtml(cmdText)}</span>
      </div>
    `;

    if (outputHtml !== null) {
      html += `<div class="terminal-output">${outputHtml}</div>`;
    }

    line.innerHTML = html;
    terminalBody.appendChild(line);

    // Auto-scroll to bottom
    const win = terminalBody.closest('.terminal-window') || terminalBody;
    win.scrollTop = win.scrollHeight;
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function executeCommand(input) {
    const raw = input.trim();
    if (!raw) return;

    commandHistory.push(raw);
    historyIndex = commandHistory.length;

    const parts = raw.split(' ');
    const cmd = parts[0].toLowerCase();

    if (COMMANDS[cmd]) {
      const res = COMMANDS[cmd]();
      if (res !== null) {
        appendLine(raw, res);
      }
    } else {
      appendLine(raw, `<span class="term-amber">zsh: command not found: ${escapeHtml(cmd)}. Type <span class="term-cyan">'help'</span> for list of commands.</span>`);
    }

    if (window.cyberAudio) {
      window.cyberAudio.playClick();
    }
  }

  // Handle Form Submit
  if (terminalForm) {
    terminalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = terminalInput.value;
      terminalInput.value = '';
      executeCommand(val);
    });
  }

  // Handle Keystrokes & Audio
  terminalInput.addEventListener('keydown', (e) => {
    if (window.cyberAudio && e.key.length === 1) {
      window.cyberAudio.playKeystroke();
    }

    // History navigation
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        terminalInput.value = commandHistory[historyIndex] || '';
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        terminalInput.value = commandHistory[historyIndex] || '';
      } else {
        historyIndex = commandHistory.length;
        terminalInput.value = '';
      }
    }
  });

  // Quick Command Pills Click
  quickPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const cmd = pill.getAttribute('data-term-cmd');
      if (!cmd) return;
      terminalInput.value = cmd;
      executeCommand(cmd);
      terminalInput.focus();
    });
  });

  // Focus terminal when clicked anywhere on the terminal window
  const terminalWindow = document.querySelector('.terminal-window');
  if (terminalWindow) {
    terminalWindow.addEventListener('click', (e) => {
      if (!e.target.closest('a, button, input')) {
        terminalInput.focus();
      }
    });
  }

  // Matrix Rain Mini-Effect
  function runMatrixRain() {
    let rainContainer = document.getElementById('terminal-matrix-rain');
    if (!rainContainer) {
      rainContainer = document.createElement('canvas');
      rainContainer.id = 'terminal-matrix-rain';
      rainContainer.style.position = 'absolute';
      rainContainer.style.inset = '0';
      rainContainer.style.width = '100%';
      rainContainer.style.height = '100%';
      rainContainer.style.pointerEvents = 'none';
      rainContainer.style.opacity = '0.4';
      rainContainer.style.zIndex = '5';

      const win = document.querySelector('.terminal-body');
      if (win) {
        win.style.position = 'relative';
        win.appendChild(rainContainer);
      }
    }

    const ctx = rainContainer.getContext('2d');
    const w = rainContainer.width = rainContainer.clientWidth;
    const h = rainContainer.height = rainContainer.clientHeight;

    const chars = '01010101XYZΩλπ∑∆∇0123456789CUDA_TORCH_TENSOR';
    const fontSize = 12;
    const columns = Math.floor(w / fontSize);
    const drops = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -30);
    }

    let rainFrames = 0;
    const maxFrames = 180; // ~3.5 seconds

    function drawMatrix() {
      ctx.fillStyle = 'rgba(7, 10, 15, 0.15)';
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = '#00f5a0';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > h && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      rainFrames++;
      if (rainFrames < maxFrames) {
        requestAnimationFrame(drawMatrix);
      } else {
        ctx.clearRect(0, 0, w, h);
        if (rainContainer.parentNode) {
          rainContainer.parentNode.removeChild(rainContainer);
        }
      }
    }

    drawMatrix();
  }

  // Initial welcome message
  setTimeout(() => {
    appendLine('whoami', COMMANDS.about());
  }, 400);
})();
