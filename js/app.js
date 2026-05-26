(function () {
  "use strict";

  const questionStore = new Map();
  let questionId = 0;

  document.addEventListener("DOMContentLoaded", init);

  async function init() {
    try {
      const topics = await fetchJson("data/topics.json");
      const page = document.body.dataset.page;

      if (page === "home") {
        renderHome(topics);
        return;
      }

      if (page === "topic") {
        const topicId = document.body.dataset.topic;
        renderNav(topics, topicId);
        const factFile = await fetchJson(`data/facts/${topicId}.json`);
        renderTopic(factFile, topics);
      }
    } catch (error) {
      renderError(error);
    }
  }

  async function fetchJson(path) {
    const embedded = window.LCAMathsData?.[path];
    if (window.location.protocol === "file:" && embedded) {
      return clone(embedded);
    }

    try {
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error(`Could not load ${path}`);
      }
      return response.json();
    } catch (error) {
      if (embedded) {
        return clone(embedded);
      }
      throw error;
    }
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function renderHome(topics) {
    const homeTopics = document.querySelector("#homeTopics");
    homeTopics.innerHTML = topics.map((topic) => `
      <a class="topic-card" href="${escapeHtml(topic.href)}">
        <div>
          <h3>${escapeHtml(topic.title)}</h3>
          <p>${escapeHtml(topic.summary)}</p>
        </div>
        <footer>${escapeHtml(topic.module)}</footer>
      </a>
    `).join("");
  }

  function renderNav(topics, activeId) {
    const nav = document.querySelector("#topicNav");
    if (!nav) return;
    nav.innerHTML = topics.map((topic) => `
      <a class="${topic.id === activeId ? "is-active" : ""}" href="${escapeHtml(topic.href)}">
        ${escapeHtml(topic.shortTitle || topic.title)}
      </a>
    `).join("");
  }

  function renderTopic(factFile, topics) {
    const topic = topics.find((item) => item.id === factFile.id);
    const main = document.querySelector("#topicApp");
    const examples = factFile.rules.flatMap((rule) =>
      (rule.examples || []).map((example) => ({ ...example, rule: rule.title }))
    );

    main.innerHTML = `
      <header class="topbar">
        <div>
          <p class="page-label">${escapeHtml(topic?.module || "LCA Mathematical Applications")}</p>
          <h1>${escapeHtml(factFile.title)}</h1>
        </div>
        <div class="topbar-actions">
          <button class="button ghost" id="recallBtn" type="button">Rule recall</button>
          <a class="button primary" href="exam.html">Exam practice</a>
        </div>
      </header>

      <section class="topic-hero">
        <div>
          <h1>${escapeHtml(factFile.subtitle)}</h1>
          <p>Start with the basic rule, try a short question, then move towards exam-style practice with fresh numbers.</p>
        </div>
        <div class="module-strip">
          ${factFile.examContexts.map((item) => `
            <div class="module-chip">
              <strong>${escapeHtml(item)}</strong>
              <span>exam context</span>
            </div>
          `).join("")}
        </div>
      </section>

      <section class="study-grid">
        <div class="section-panel">
          <div class="section-heading">
            <div>
              <h2>Rules</h2>
              <p>The basic facts live in this topic's JSON file.</p>
            </div>
          </div>
          <div class="rule-list">
            ${factFile.rules.map(renderRule).join("")}
          </div>
        </div>
        <div class="section-panel">
          <div class="section-heading">
            <div>
              <h2>Worked Example</h2>
              <p>Small steps that match the rule.</p>
            </div>
          </div>
          <div class="example-list">
            ${examples.map(renderExample).join("")}
          </div>
        </div>
      </section>

      <section class="practice-section">
        <div class="section-heading">
          <div>
            <h2>Quick Practice</h2>
            <p>Use these as short starter tasks or individual revision cards.</p>
          </div>
          <div class="practice-controls">
            <label>
              Filter
              <select id="levelFilter">
                <option value="all">All activities</option>
                <option value="warm-up">Warm-up</option>
                <option value="core">Core</option>
                <option value="exam">Exam ramp</option>
              </select>
            </label>
            <button class="button ghost" id="newSetBtn" type="button">New set</button>
          </div>
        </div>
        <div id="practiceGrid" class="practice-grid"></div>
      </section>

      <section class="practice-section">
        <div class="section-heading">
          <div>
            <h2>Exam Ramp</h2>
            <p>Three steps from confidence check to a fuller exam-style question.</p>
          </div>
        </div>
        <div id="rampGrid" class="ramp-grid"></div>
      </section>
    `;

    wireTopic(main, factFile);
    renderPractice(factFile, "all");
    renderRamp(factFile);
  }

  function renderRule(rule) {
    return `
      <article class="rule-item">
        <h3>${escapeHtml(rule.title)}</h3>
        <p>${escapeHtml(rule.explanation)}</p>
        ${rule.formula ? `<span class="formula">${escapeHtml(rule.formula)}</span>` : ""}
        ${rule.steps?.length ? `<ol class="steps">${rule.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol>` : ""}
      </article>
    `;
  }

  function renderExample(example) {
    return `
      <article class="example-item">
        <h3>${escapeHtml(example.rule)}</h3>
        <p><strong>${escapeHtml(example.question)}</strong></p>
        <ol class="steps">
          <li>${escapeHtml(example.working)}</li>
          <li>Answer: ${escapeHtml(example.answer)}</li>
        </ol>
      </article>
    `;
  }

  function wireTopic(main, factFile) {
    main.addEventListener("click", (event) => {
      const checkButton = event.target.closest("[data-action='check']");
      const refreshButton = event.target.closest("[data-action='refresh']");
      const revealButton = event.target.closest("[data-action='reveal-memory']");

      if (checkButton) {
        checkAnswer(checkButton.closest(".activity-card"));
      }

      if (refreshButton) {
        const card = refreshButton.closest(".activity-card");
        hydratePracticeCard(card, card.dataset.generator);
      }

      if (revealButton) {
        const card = revealButton.closest(".activity-card");
        card.querySelector(".feedback").textContent = card.dataset.answer;
        card.querySelector(".feedback").className = "feedback correct";
      }
    });

    main.querySelector("#newSetBtn").addEventListener("click", () => {
      renderPractice(factFile, main.querySelector("#levelFilter").value);
      renderRamp(factFile);
    });

    main.querySelector("#levelFilter").addEventListener("change", (event) => {
      renderPractice(factFile, event.target.value);
    });

    main.querySelector("#recallBtn").addEventListener("click", () => {
      const firstMemoryCard = main.querySelector(".memory-card");
      if (firstMemoryCard) {
        firstMemoryCard.scrollIntoView({ behavior: "smooth", block: "center" });
        firstMemoryCard.querySelector("button").focus();
      }
    });
  }

  function renderPractice(factFile, filter) {
    const grid = document.querySelector("#practiceGrid");
    const activities = factFile.activities.filter((activity) => filter === "all" || activity.level === filter);
    grid.innerHTML = "";

    grid.appendChild(createMemoryCard(factFile.rules));

    if (!activities.length) {
      const empty = document.createElement("div");
      empty.className = "empty-state";
      empty.textContent = "No activities match this filter yet.";
      grid.appendChild(empty);
      return;
    }

    activities.forEach((activity) => {
      const card = document.createElement("article");
      card.className = "activity-card";
      card.dataset.generator = activity.id;
      card.innerHTML = `
        <header>
          <h3>${escapeHtml(activity.title)}</h3>
          <p>${escapeHtml(activity.level)}</p>
        </header>
        <div>
          <p class="question-text"></p>
        </div>
        <div>
          <div class="answer-row">
            <input type="text" inputmode="decimal" aria-label="Your answer">
            <button class="button small" type="button" data-action="check">Check</button>
          </div>
          <div class="feedback" aria-live="polite"></div>
          <div class="card-actions">
            <button class="button small ghost" type="button" data-action="refresh">New question</button>
          </div>
        </div>
      `;
      grid.appendChild(card);
      hydratePracticeCard(card, activity.id);
    });
  }

  function renderRamp(factFile) {
    const grid = document.querySelector("#rampGrid");
    const ramp = [
      { title: "Warm-up", description: "One-step confidence check.", level: "warm-up" },
      { title: "Core", description: "A common classroom question.", level: "core" },
      { title: "Exam style", description: "Closer to the written paper.", level: "exam" }
    ];
    grid.innerHTML = "";

    ramp.forEach((step, index) => {
      const activity = factFile.activities.find((item) => item.level === step.level) || factFile.activities[index % factFile.activities.length];
      const card = document.createElement("article");
      card.className = "activity-card ramp-card";
      card.dataset.generator = activity.id;
      card.innerHTML = `
        <header>
          <h3>${escapeHtml(step.title)}</h3>
          <small>${escapeHtml(step.description)}</small>
        </header>
        <div>
          <p class="question-text"></p>
        </div>
        <div>
          <div class="answer-row">
            <input type="text" inputmode="decimal" aria-label="Your answer">
            <button class="button small" type="button" data-action="check">Check</button>
          </div>
          <div class="feedback" aria-live="polite"></div>
          <div class="card-actions">
            <button class="button small ghost" type="button" data-action="refresh">New question</button>
          </div>
        </div>
      `;
      grid.appendChild(card);
      hydratePracticeCard(card, activity.id);
    });
  }

  function createMemoryCard(rules) {
    const rule = window.LCAMaths.choice(rules);
    const card = document.createElement("article");
    card.className = "activity-card memory-card";
    card.dataset.answer = rule.explanation;
    card.innerHTML = `
      <header>
        <h3>Memory card</h3>
        <p>rule recall</p>
      </header>
      <div>
        <p class="question-text">Explain this rule in your own words: ${escapeHtml(rule.title)}</p>
      </div>
      <div>
        <button class="button small" type="button" data-action="reveal-memory">Show rule</button>
        <div class="feedback" aria-live="polite"></div>
      </div>
    `;
    return card;
  }

  function hydratePracticeCard(card, generatorId) {
    const question = window.LCAMaths.getQuestion(generatorId);
    const key = `q-${++questionId}`;
    questionStore.set(key, question);
    card.dataset.key = key;
    card.querySelector(".question-text").textContent = question.question;
    card.querySelector("input").value = "";
    card.querySelector(".feedback").textContent = "";
    card.querySelector(".feedback").className = "feedback";
  }

  function checkAnswer(card) {
    const question = questionStore.get(card.dataset.key);
    const input = card.querySelector("input");
    const feedback = card.querySelector(".feedback");
    if (!question) return;

    if (window.LCAMaths.isCorrect(input.value, question)) {
      feedback.textContent = `Correct. ${question.explanation}`;
      feedback.className = "feedback correct";
    } else {
      feedback.textContent = `Try again. Expected answer: ${question.answerText}. ${question.explanation}`;
      feedback.className = "feedback wrong";
    }
  }

  function renderError(error) {
    const target = document.querySelector("main") || document.body;
    target.innerHTML = `
      <section class="empty-state">
        <h1>Could not open the practice pages</h1>
        <p>${escapeHtml(error.message)}</p>
        <p>Refresh the page. If it still fails, run the data bundle updater from the folder.</p>
      </section>
    `;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
})();
