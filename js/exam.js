(function () {
  "use strict";

  const questionStore = new Map();
  const results = new Map();
  let questionId = 0;
  let examBank = null;

  document.addEventListener("DOMContentLoaded", init);

  async function init() {
    try {
      examBank = await fetchJson("data/exam-bank.json");
      wireControls();
      buildPaper();
    } catch (error) {
      document.querySelector("#paper").innerHTML = `
        <div class="empty-state">
          <h2>Could not load the exam bank</h2>
          <p>${escapeHtml(error.message)}</p>
        </div>
      `;
    }
  }

  async function fetchJson(path) {
    const embedded = window.LCAMathsData?.[path];
    if (window.location.protocol === "file:" && embedded) {
      return JSON.parse(JSON.stringify(embedded));
    }

    try {
      const response = await fetch(path);
      if (!response.ok) throw new Error(`Could not load ${path}`);
      return response.json();
    } catch (error) {
      if (embedded) return JSON.parse(JSON.stringify(embedded));
      throw error;
    }
  }

  function wireControls() {
    document.querySelector("#newPaperBtn").addEventListener("click", buildPaper);
    document.querySelector("#paperLevel").addEventListener("change", buildPaper);
    document.querySelector("#paperMix").addEventListener("change", buildPaper);
    document.querySelector("#showAnswers").addEventListener("change", (event) => {
      document.body.classList.toggle("show-answers", event.target.checked);
    });
    document.querySelector("#printBtn").addEventListener("click", () => window.print());

    document.querySelector("#paper").addEventListener("click", (event) => {
      const checkButton = event.target.closest("[data-action='check-exam']");
      if (!checkButton) return;
      checkExamAnswer(checkButton.closest(".paper-question"));
    });
  }

  function buildPaper() {
    const paper = document.querySelector("#paper");
    const level = document.querySelector("#paperLevel").value;
    const mix = document.querySelector("#paperMix").value;
    questionStore.clear();
    results.clear();
    updateScore();

    const selectedTypes = selectTypes(examBank.types, mix);
    paper.innerHTML = selectedTypes.map((type, index) => renderQuestion(type, index + 1, level)).join("");
  }

  function selectTypes(types, mix) {
    if (mix === "balanced") return types;
    const filtered = types.filter((type) => type.mixes.includes(mix));
    return filtered.length ? filtered : types;
  }

  function renderQuestion(type, number, level) {
    const generated = window.LCAMaths.getQuestion(type.generator);
    const key = `exam-${++questionId}`;
    questionStore.set(key, generated);
    const hint = level === "supported"
      ? `<p><strong>Skill:</strong> ${escapeHtml(type.examSkill)}</p>`
      : "";
    const challenge = level === "challenge"
      ? `<p><strong>Challenge:</strong> Write one sentence explaining why your answer is sensible.</p>`
      : "";

    return `
      <article class="paper-question" data-key="${key}">
        <header>
          <h3>Question ${number}: ${escapeHtml(type.title)}</h3>
          <span class="marks">${type.marks} marks</span>
        </header>
        <div class="question-parts">
          <div class="question-part">
            <p>${escapeHtml(generated.question)}</p>
            ${hint}
            ${challenge}
            <div class="answer-row">
              <input type="text" inputmode="decimal" aria-label="Answer for question ${number}">
              <button class="button small" type="button" data-action="check-exam">Check</button>
            </div>
            <div class="feedback" aria-live="polite"></div>
            <div class="working-lines" aria-hidden="true">
              <div class="working-line"></div>
              <div class="working-line"></div>
              <div class="working-line"></div>
              <div class="working-line"></div>
            </div>
            <div class="answer-panel">
              <strong>Answer:</strong> ${escapeHtml(generated.answerText)}<br>
              ${escapeHtml(generated.explanation)}
            </div>
          </div>
        </div>
      </article>
    `;
  }

  function checkExamAnswer(card) {
    const question = questionStore.get(card.dataset.key);
    const input = card.querySelector("input");
    const feedback = card.querySelector(".feedback");
    if (!question) return;

    const correct = window.LCAMaths.isCorrect(input.value, question);
    results.set(card.dataset.key, correct);
    if (correct) {
      feedback.textContent = `Correct. ${question.explanation}`;
      feedback.className = "feedback correct";
    } else {
      feedback.textContent = `Try again. Expected answer: ${question.answerText}. ${question.explanation}`;
      feedback.className = "feedback wrong";
    }
    updateScore();
  }

  function updateScore() {
    const checked = results.size;
    const correct = [...results.values()].filter(Boolean).length;
    document.querySelector("#scoreValue").textContent = `${correct} / ${checked}`;
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
