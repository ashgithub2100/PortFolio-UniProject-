/**
 * Interactive Project Live Simulators - Aditya Sharma Portfolio
 * Real-time mini-apps inside modal & project previews:
 * 1. AI Study Buddy: Live token generator & clickable interactive quiz
 * 2. Movie Recommender: Vector similarity calculator with genre weights
 * 3. Expense Tracker CLI: Live spending logger with dynamic ASCII charts
 */

(function initProjectSimulators() {
  // Check modal trigger and bind simulator tab
  const modalDesc = document.getElementById('modal-desc');
  const modalArch = document.getElementById('modal-arch');

  // AI Study Buddy Simulator Data
  const studyBuddyTopics = {
    'attention': {
      title: 'Attention Mechanism in Transformers',
      summary: 'Unlike RNNs that process sequences sequentially, Attention computes soft alignments between all tokens simultaneously using Query (Q), Key (K), and Value (V) matrix dot products scaled by √d_k.',
      quiz: {
        question: 'Why is the dot-product scaled by 1/√d_k in scaled dot-product attention?',
        options: [
          'To minimize memory consumption on GPU VRAM',
          'To prevent dot-products from growing too large and pushing softmax into vanishing gradient regions',
          'To ensure all output vectors have unit norm',
          'To convert floating-point values to integer quantization'
        ],
        correct: 1,
        explanation: 'For large projection dimensions (d_k), dot products grow large in magnitude, pushing softmax into regions with extremely small gradients. Dividing by √d_k counters this effect.'
      }
    },
    'bias-variance': {
      title: 'Bias-Variance Tradeoff in Machine Learning',
      summary: 'High bias causes underfitting by oversimplifying model assumptions, while high variance causes overfitting by memorizing dataset noise. Optimal generalization is found at the minimum of total expected test error.',
      quiz: {
        question: 'Which technique primarily targets high variance without increasing bias?',
        options: [
          'Increasing model polynomial degree',
          'Ensemble bagging (e.g., Random Forests) and L2 regularization',
          'Removing cross-validation splits',
          'Decreasing the size of training data'
        ],
        correct: 1,
        explanation: 'Bagging reduces variance by averaging predictions across bootstrap-aggregated decision trees, stabilizing models without altering individual tree bias.'
      }
    }
  };

  // Movie Recommender Database
  const movieDatabase = [
    { title: 'Interstellar', genres: ['Sci-Fi', 'Drama', 'Physics'], embedding: [0.95, 0.2, 0.8, 0.1] },
    { title: 'The Matrix', genres: ['Sci-Fi', 'Action', 'AI'], embedding: [0.92, 0.85, 0.3, 0.95] },
    { title: 'Inception', genres: ['Sci-Fi', 'Thriller', 'Mind'], embedding: [0.94, 0.7, 0.6, 0.4] },
    { title: 'Ex Machina', genres: ['AI', 'Sci-Fi', 'Drama'], embedding: [0.88, 0.3, 0.95, 0.9] },
    { title: 'Blade Runner 2049', genres: ['Sci-Fi', 'Cyberpunk', 'Mystery'], embedding: [0.96, 0.4, 0.85, 0.88] },
    { title: 'Arrival', genres: ['Sci-Fi', 'Linguistics', 'Drama'], embedding: [0.9, 0.1, 0.9, 0.6] },
    { title: 'Oppenheimer', genres: ['Drama', 'History', 'Physics'], embedding: [0.3, 0.4, 0.95, 0.2] },
    { title: 'The Social Network', genres: ['Drama', 'Tech', 'Algorithms'], embedding: [0.2, 0.5, 0.7, 0.9] }
  ];

  // Expense Tracker State
  let expenses = [
    { cat: 'Compute (AWS/RunPod)', amount: 48, date: '2026-09-08' },
    { cat: 'Books & Papers', amount: 32, date: '2026-09-09' },
    { cat: 'Dev Tools & APIs', amount: 25, date: '2026-09-10' }
  ];

  // Render Simulator in Modal or Container
  window.renderProjectSimulator = function(projectId, container) {
    if (!container) return;

    if (projectId === 'study-buddy') {
      renderStudyBuddy(container);
    } else if (projectId === 'movie-recommender') {
      renderMovieRecommender(container);
    } else if (projectId === 'expense-tracker') {
      renderExpenseTracker(container);
    }
  };

  // 1. Render AI Study Buddy Simulator
  function renderStudyBuddy(container) {
    container.innerHTML = `
      <div class="sim-wrapper">
        <div class="sim-header">
          <span class="sim-tag">// LIVE INFERENCE SIMULATOR</span>
          <span class="sim-badge">LLM Claude / GPT-4 Pipeline</span>
        </div>

        <div class="sim-input-row">
          <label class="sim-label">Select Academic Topic:</label>
          <div class="sim-topic-chips">
            <button class="sim-chip is-active" data-topic="attention">Attention Mechanism</button>
            <button class="sim-chip" data-topic="bias-variance">Bias-Variance Tradeoff</button>
          </div>
        </div>

        <div class="sim-action-row">
          <button class="btn btn-primary btn-sm" id="sim-run-inference-btn">
            <span>Generate Summary &amp; Quiz</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="14" height="14">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </button>
        </div>

        <div class="sim-output-box" id="sim-study-output">
          <div class="sim-token-stream" id="sim-token-stream">
            Click 'Generate Summary &amp; Quiz' to simulate real-time LLM inference...
          </div>
        </div>

        <div class="sim-quiz-container" id="sim-quiz-box" style="display: none;"></div>
      </div>
    `;

    let selectedTopic = 'attention';
    const chips = container.querySelectorAll('.sim-chip');
    chips.forEach(c => {
      c.addEventListener('click', () => {
        chips.forEach(x => x.classList.remove('is-active'));
        c.classList.add('is-active');
        selectedTopic = c.getAttribute('data-topic');
        if (window.cyberAudio) window.cyberAudio.playClick();
      });
    });

    const runBtn = container.querySelector('#sim-run-inference-btn');
    const tokenStream = container.querySelector('#sim-token-stream');
    const quizBox = container.querySelector('#sim-quiz-box');

    runBtn.addEventListener('click', () => {
      if (window.cyberAudio) window.cyberAudio.playClick();
      const topic = studyBuddyTopics[selectedTopic];
      tokenStream.innerHTML = '';
      quizBox.style.display = 'none';

      // Simulate streaming tokens
      const text = topic.summary;
      const words = text.split(' ');
      let idx = 0;

      runBtn.disabled = true;
      const interval = setInterval(() => {
        if (idx < words.length) {
          tokenStream.innerHTML += words[idx] + ' ';
          if (window.cyberAudio && idx % 3 === 0) window.cyberAudio.playKeystroke();
          idx++;
        } else {
          clearInterval(interval);
          runBtn.disabled = false;
          // Show quiz
          renderQuiz(topic.quiz, quizBox);
        }
      }, 45);
    });
  }

  function renderQuiz(quiz, quizBox) {
    quizBox.style.display = 'block';
    quizBox.innerHTML = `
      <div class="sim-quiz-card">
        <div class="sim-quiz-q"><span class="term-accent">Q:</span> ${quiz.question}</div>
        <div class="sim-quiz-options">
          ${quiz.options.map((opt, i) => `
            <button class="sim-quiz-opt" data-opt-idx="${i}">
              <span class="opt-letter">${String.fromCharCode(65 + i)}</span>
              <span>${opt}</span>
            </button>
          `).join('')}
        </div>
        <div class="sim-quiz-feedback" id="quiz-feedback" style="display: none;"></div>
      </div>
    `;

    const optButtons = quizBox.querySelectorAll('.sim-quiz-opt');
    const feedback = quizBox.querySelector('#quiz-feedback');

    optButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const choice = parseInt(btn.getAttribute('data-opt-idx'));
        optButtons.forEach(b => b.disabled = true);

        feedback.style.display = 'block';
        if (choice === quiz.correct) {
          btn.classList.add('correct');
          feedback.className = 'sim-quiz-feedback is-correct';
          feedback.innerHTML = `<strong>Correct!</strong> ${quiz.explanation}`;
          if (window.cyberAudio) window.cyberAudio.playBeep(880, 0.15);
        } else {
          btn.classList.add('wrong');
          optButtons[quiz.correct].classList.add('correct');
          feedback.className = 'sim-quiz-feedback is-wrong';
          feedback.innerHTML = `<strong>Incorrect.</strong> ${quiz.explanation}`;
          if (window.cyberAudio) window.cyberAudio.playBeep(320, 0.2, 'sawtooth');
        }
      });
    });
  }

  // 2. Render Movie Recommender Simulator
  function renderMovieRecommender(container) {
    container.innerHTML = `
      <div class="sim-wrapper">
        <div class="sim-header">
          <span class="sim-tag">// VECTOR SIMILARITY ENGINE</span>
          <span class="sim-badge">Scikit-learn Cosine Distance</span>
        </div>

        <div class="sim-input-row">
          <label class="sim-label">Select Anchor Movie:</label>
          <select id="sim-movie-select" class="sim-select">
            ${movieDatabase.map((m, i) => `<option value="${i}">${m.title} (${m.genres.join(', ')})</option>`).join('')}
          </select>
        </div>

        <div class="sim-action-row" style="margin-top: 1rem;">
          <button class="btn btn-primary btn-sm" id="sim-calc-similarity-btn">
            <span>Calculate Similarities</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="14" height="14">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>

        <div class="sim-recs-grid" id="sim-recs-results" style="margin-top: 1.25rem;"></div>
      </div>
    `;

    const select = container.querySelector('#sim-movie-select');
    const calcBtn = container.querySelector('#sim-calc-similarity-btn');
    const resultsGrid = container.querySelector('#sim-recs-results');

    function compute() {
      if (window.cyberAudio) window.cyberAudio.playClick();
      const targetIdx = parseInt(select.value);
      const targetMovie = movieDatabase[targetIdx];

      // Compute cosine similarity
      function cosineSim(vA, vB) {
        let dot = 0, nA = 0, nB = 0;
        for (let i = 0; i < vA.length; i++) {
          dot += vA[i] * vB[i];
          nA += vA[i] * vA[i];
          nB += vB[i] * vB[i];
        }
        return dot / (Math.sqrt(nA) * Math.sqrt(nB));
      }

      const scored = movieDatabase
        .filter((_, i) => i !== targetIdx)
        .map(m => ({
          ...m,
          score: cosineSim(targetMovie.embedding, m.embedding)
        }))
        .sort((a, b) => b.score - a.score);

      resultsGrid.innerHTML = `
        <div class="sim-results-title">Top Collaborative Recommendations for <em>${targetMovie.title}</em>:</div>
        <div class="sim-cards-row">
          ${scored.slice(0, 3).map((item, r) => `
            <div class="sim-rec-card">
              <div class="sim-rec-rank">#0${r + 1}</div>
              <div class="sim-rec-title">${item.title}</div>
              <div class="sim-rec-score">SIMILARITY: ${(item.score * 100).toFixed(1)}%</div>
              <div class="sim-rec-bar-bg"><div class="sim-rec-bar-fill" style="width: ${item.score * 100}%"></div></div>
              <div class="sim-rec-tags">
                ${item.genres.map(g => `<span class="tag-pill tag-emerald">${g}</span>`).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }

    calcBtn.addEventListener('click', compute);
    select.addEventListener('change', compute);
    compute();
  }

  // 3. Render Expense Tracker Simulator
  function renderExpenseTracker(container) {
    function updateView() {
      const total = expenses.reduce((sum, e) => sum + e.amount, 0);
      const catTotals = {};
      expenses.forEach(e => {
        catTotals[e.cat] = (catTotals[e.cat] || 0) + e.amount;
      });

      container.innerHTML = `
        <div class="sim-wrapper">
          <div class="sim-header">
            <span class="sim-tag">// CLI TRANSACTION RUNNER</span>
            <span class="sim-badge">Monthly Cap: $200.00</span>
          </div>

          <div class="sim-stats-bar">
            <div class="sim-stat-box">
              <span class="sim-stat-lbl">TOTAL LOGGED:</span>
              <span class="sim-stat-val accent">$${total.toFixed(2)}</span>
            </div>
            <div class="sim-stat-box">
              <span class="sim-stat-lbl">ENTRIES:</span>
              <span class="sim-stat-val">${expenses.length} Records</span>
            </div>
          </div>

          <div class="sim-action-row" style="gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem;">
            <button class="sim-chip" data-quick-exp="Compute,45">+ $45 Cloud GPU</button>
            <button class="sim-chip" data-quick-exp="Books,28">+ $28 Deep Learning Book</button>
            <button class="sim-chip" data-quick-exp="Coffee,12">+ $12 Coffee Session</button>
            <button class="sim-chip" id="sim-clear-exp-btn" style="color: #ff9e2c;">Clear Log</button>
          </div>

          <div class="sim-ascii-chart">
            <div class="sim-chart-title">CATEGORY SPENDING BREAKDOWN:</div>
            ${Object.keys(catTotals).map(cat => {
              const amt = catTotals[cat];
              const pct = Math.min(100, Math.round((amt / (total || 1)) * 100));
              const barCount = Math.round(pct / 5);
              const bar = '█'.repeat(barCount) + '░'.repeat(20 - barCount);
              return `
                <div class="sim-chart-row">
                  <span class="sim-chart-cat">${cat.padEnd(18, ' ')}</span>
                  <span class="sim-chart-bar">[${bar}]</span>
                  <span class="sim-chart-amt">$${amt} (${pct}%)</span>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;

      const quickBtns = container.querySelectorAll('[data-quick-exp]');
      quickBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const [cat, amt] = btn.getAttribute('data-quick-exp').split(',');
          expenses.push({ cat, amount: parseFloat(amt), date: new Date().toISOString().split('T')[0] });
          if (window.cyberAudio) window.cyberAudio.playClick();
          updateView();
        });
      });

      const clearBtn = container.querySelector('#sim-clear-exp-btn');
      if (clearBtn) {
        clearBtn.addEventListener('click', () => {
          expenses = [];
          if (window.cyberAudio) window.cyberAudio.playClick();
          updateView();
        });
      }
    }

    updateView();
  }
})();
