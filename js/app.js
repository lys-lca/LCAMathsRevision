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

      ${factFile.diagrams?.length ? `
        <section class="diagram-section">
          <div class="section-heading">
            <div>
              <h2>Diagrams</h2>
              <p>Visual reminders for the key ideas in this topic.</p>
            </div>
          </div>
          <div class="diagram-grid">
            ${factFile.diagrams.map(renderDiagram).join("")}
          </div>
        </section>
      ` : ""}

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

  function renderDiagram(diagram) {
    return `
      <article class="diagram-card">
        <div>
          <h3>${escapeHtml(diagram.title)}</h3>
          <p>${escapeHtml(diagram.description)}</p>
        </div>
        ${renderDiagramVisual(diagram)}
      </article>
    `;
  }

  function renderDiagramVisual(diagram) {
    switch (diagram.type) {
      case "number-line":
        return renderNumberLine(diagram);
      case "percent-grid":
        return renderPercentGrid(diagram);
      case "discount-bar":
        return renderDiscountBar(diagram);
      case "money-flow":
      case "payslip-flow":
        return renderFlow(diagram.steps);
      case "shape-formulas":
        return renderShapeFormulas();
      case "scale-strip":
        return renderScaleStrip(diagram);
      case "bar-chart":
        return renderBarChart(diagram);
      case "median-row":
        return renderMedianRow(diagram);
      case "outlier-chart":
        return renderOutlierChart(diagram);
      case "line-graph":
        return renderLineGraph(diagram);
      case "table-pattern":
        return renderPatternTable(diagram);
      case "timeline":
        return renderTimeline(diagram);
      default:
        return `<div class="diagram-visual empty-state">Diagram type coming soon.</div>`;
    }
  }

  function renderNumberLine(diagram) {
    const percent = ((diagram.point - diagram.min) / (diagram.max - diagram.min)) * 100;
    return `
      <div class="diagram-visual">
        <svg class="diagram-svg" viewBox="0 0 420 150" role="img" aria-label="${escapeHtml(diagram.title)}">
          <line x1="44" y1="78" x2="376" y2="78" class="axis-line"></line>
          <line x1="44" y1="66" x2="44" y2="90" class="axis-tick"></line>
          <line x1="210" y1="60" x2="210" y2="96" class="axis-tick midpoint"></line>
          <line x1="376" y1="66" x2="376" y2="90" class="axis-tick"></line>
          <text x="44" y="120" text-anchor="middle">${escapeHtml(diagram.min)}</text>
          <text x="210" y="120" text-anchor="middle">${escapeHtml(diagram.mid)}</text>
          <text x="376" y="120" text-anchor="middle">${escapeHtml(diagram.max)}</text>
          <circle cx="${44 + (332 * percent / 100)}" cy="78" r="9" class="point-dot"></circle>
          <text x="${Math.min(350, Math.max(70, 44 + (332 * percent / 100)))}" y="42" text-anchor="middle">${escapeHtml(diagram.label)}</text>
        </svg>
      </div>
    `;
  }

  function renderPercentGrid(diagram) {
    const cells = Array.from({ length: 100 }, (_, index) => `
      <span class="${index < diagram.filled ? "is-filled" : ""}"></span>
    `).join("");
    return `
      <div class="diagram-visual percent-visual">
        <div class="percent-grid" aria-label="${escapeHtml(diagram.label)} shaded on a hundred square">${cells}</div>
        <strong>${escapeHtml(diagram.label)}</strong>
      </div>
    `;
  }

  function renderDiscountBar(diagram) {
    const discount = diagram.price * diagram.percent / 100;
    const sale = diagram.price - discount;
    return `
      <div class="diagram-visual">
        <div class="discount-bar" aria-label="Discount bar">
          <div style="width:${diagram.percent}%">${diagram.percent}% off</div>
        </div>
        <div class="diagram-facts">
          <span>Original EUR ${diagram.price}</span>
          <span>Discount EUR ${discount}</span>
          <span>Sale EUR ${sale}</span>
        </div>
      </div>
    `;
  }

  function renderFlow(steps) {
    return `
      <div class="diagram-visual flow-visual">
        ${steps.map((step, index) => `
          <span>${escapeHtml(step)}</span>
          ${index < steps.length - 1 ? `<b aria-hidden="true">-></b>` : ""}
        `).join("")}
      </div>
    `;
  }

  function renderShapeFormulas() {
    return `
      <div class="diagram-visual shape-visual">
        <div>
          <svg viewBox="0 0 120 80" aria-hidden="true"><rect x="18" y="18" width="84" height="44" rx="3"></rect></svg>
          <strong>Rectangle</strong>
          <span>A = l x w</span>
        </div>
        <div>
          <svg viewBox="0 0 120 80" aria-hidden="true"><circle cx="60" cy="40" r="26"></circle><line x1="60" y1="40" x2="86" y2="40"></line></svg>
          <strong>Circle</strong>
          <span>A = pi x r x r</span>
        </div>
        <div>
          <svg viewBox="0 0 120 80" aria-hidden="true"><path d="M28 24h50l15 14v32H43L28 56z"></path><path d="M28 24l15 14h50M43 38v32"></path></svg>
          <strong>Box</strong>
          <span>V = l x w x h</span>
        </div>
        <div>
          <svg viewBox="0 0 120 80" aria-hidden="true"><ellipse cx="60" cy="22" rx="28" ry="10"></ellipse><path d="M32 22v38c0 5 13 10 28 10s28-5 28-10V22"></path><path d="M32 60c0 5 13 10 28 10s28-5 28-10"></path></svg>
          <strong>Cylinder</strong>
          <span>V = pi x r x r x h</span>
        </div>
      </div>
    `;
  }

  function renderScaleStrip(diagram) {
    return `
      <div class="diagram-visual scale-visual">
        <div class="scale-model">Model<br><strong>${escapeHtml(diagram.model)} cm</strong></div>
        <div class="scale-arrow">x ${escapeHtml(diagram.real)}</div>
        <div class="scale-real">Real life<br><strong>${escapeHtml(diagram.real)} cm</strong></div>
      </div>
    `;
  }

  function renderBarChart(diagram) {
    const max = Math.max(...diagram.values);
    return `
      <div class="diagram-visual">
        <svg class="diagram-svg" viewBox="0 0 420 220" role="img" aria-label="${escapeHtml(diagram.title)}">
          <line x1="44" y1="178" x2="386" y2="178" class="axis-line"></line>
          <line x1="44" y1="28" x2="44" y2="178" class="axis-line"></line>
          ${diagram.values.map((value, index) => {
            const height = value / max * 132;
            const x = 72 + index * 62;
            return `
              <rect x="${x}" y="${178 - height}" width="34" height="${height}" class="bar-rect"></rect>
              <text x="${x + 17}" y="200" text-anchor="middle">${escapeHtml(diagram.labels[index])}</text>
              <text x="${x + 17}" y="${170 - height}" text-anchor="middle">${escapeHtml(value)}</text>
            `;
          }).join("")}
          <text x="44" y="18">${escapeHtml(diagram.unit)}</text>
        </svg>
      </div>
    `;
  }

  function renderMedianRow(diagram) {
    return `
      <div class="diagram-visual median-visual">
        ${diagram.values.map((value, index) => `
          <span class="${index === diagram.highlight ? "is-middle" : ""}">${escapeHtml(value)}</span>
        `).join("")}
      </div>
    `;
  }

  function renderOutlierChart(diagram) {
    const min = Math.min(...diagram.values);
    const max = Math.max(...diagram.values);
    return `
      <div class="diagram-visual">
        <svg class="diagram-svg" viewBox="0 0 420 140" role="img" aria-label="${escapeHtml(diagram.title)}">
          <line x1="38" y1="76" x2="382" y2="76" class="axis-line"></line>
          ${diagram.values.map((value, index) => {
            const x = 38 + ((value - min) / (max - min)) * 344;
            const high = value === max ? " outlier-dot" : "";
            return `<circle cx="${x}" cy="${76 + ((index % 2) * 18 - 9)}" r="8" class="point-dot${high}"></circle>`;
          }).join("")}
          <text x="38" y="118" text-anchor="middle">${escapeHtml(min)}</text>
          <text x="382" y="118" text-anchor="middle">${escapeHtml(max)}</text>
        </svg>
      </div>
    `;
  }

  function renderLineGraph(diagram) {
    const maxX = Math.max(...diagram.points.map((point) => point[0]));
    const maxY = Math.max(...diagram.points.map((point) => point[1]));
    const coords = diagram.points.map(([x, y]) => {
      const px = 54 + (x / maxX) * 310;
      const py = 176 - (y / maxY) * 126;
      return `${px},${py}`;
    }).join(" ");
    return `
      <div class="diagram-visual">
        <svg class="diagram-svg" viewBox="0 0 420 220" role="img" aria-label="${escapeHtml(diagram.title)}">
          <line x1="54" y1="176" x2="374" y2="176" class="axis-line"></line>
          <line x1="54" y1="44" x2="54" y2="176" class="axis-line"></line>
          <polyline points="${coords}" class="line-path"></polyline>
          ${diagram.points.map(([x, y]) => {
            const px = 54 + (x / maxX) * 310;
            const py = 176 - (y / maxY) * 126;
            return `<circle cx="${px}" cy="${py}" r="6" class="point-dot"></circle>`;
          }).join("")}
          <text x="210" y="210" text-anchor="middle">${escapeHtml(diagram.xLabel)}</text>
          <text x="18" y="112" transform="rotate(-90 18 112)" text-anchor="middle">${escapeHtml(diagram.yLabel)}</text>
        </svg>
      </div>
    `;
  }

  function renderPatternTable(diagram) {
    return `
      <div class="diagram-visual table-visual">
        <table>
          <thead><tr>${diagram.headers.map((header) => `<th>${escapeHtml(header)}</th>`).join("")}</tr></thead>
          <tbody>${diagram.rows.map((row) => `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`).join("")}</tbody>
        </table>
      </div>
    `;
  }

  function renderTimeline(diagram) {
    return `
      <div class="diagram-visual timeline-visual">
        ${diagram.phases.map((phase) => `
          <div class="${phase.kind === "job" ? "is-job" : "is-training"}">
            <strong>${escapeHtml(phase.label)}</strong>
            <span>${escapeHtml(phase.value)}</span>
          </div>
        `).join("")}
      </div>
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
