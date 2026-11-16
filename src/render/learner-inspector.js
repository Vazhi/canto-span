"use strict";

// Presentation only: consume existing learner-safe hover strings and never
// create new lexical or grammatical knowledge from a learner's interaction.
let nextInspectorId = 0;
const NO_EXPLANATION = "No contextual explanation available for this selection.";

function learnerInspectorModel(node, titleForToken, titleForConstruction) {
  if (!node || (node.kind !== "token" && node.kind !== "construction")) return null;
  const isToken = node.kind === "token";
  const hover = isToken ? titleForToken(node) : titleForConstruction(node);
  const lines = String(hover || "").split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const surface = String(node.display_surface || lines[0] || node.surface || "").trim();
  const jyutping = isToken ? String(node.jyutping || "").trim() : "";
  const role = isToken ? String(node.role || node.label || "").trim() : "";
  const explanation = lines.slice(1).filter((line) =>
    !line.startsWith("role:") && !line.startsWith("syntax:") && line !== jyutping
  );
  const generic = new Set(["Cantonese word.", "Cantonese text.", "Cantonese phrase."]);
  const useful = explanation.filter((line) => !generic.has(line));
  return {
    kind: node.kind,
    surface,
    jyutping,
    role,
    explanation: useful.length ? useful.join("\n") : NO_EXPLANATION,
  };
}

function createLearnerInspector({ createEl, titleForToken, titleForConstruction }) {
  const panel = createEl("section", "canto-learner-inspector");
  panel.hidden = true;
  panel.id = "canto-learner-inspector-" + (++nextInspectorId);
  panel.setAttribute("role", "region");
  panel.setAttribute("tabindex", "-1");
  panel.setAttribute("aria-label", "Canto Span learner inspector");

  const heading = createEl("div", "canto-inspector-header");
  const surface = createEl("strong", "canto-inspector-surface");
  const closeButton = createEl("button", "canto-inspector-close", "Close");
  closeButton.type = "button";
  closeButton.setAttribute("aria-label", "Close learner inspector");
  heading.appendChild(surface);
  heading.appendChild(closeButton);

  const metadata = createEl("div", "canto-inspector-meta");
  const explanation = createEl("div", "canto-inspector-explanation");
  explanation.setAttribute("aria-live", "polite");
  const actions = createEl("div", "canto-inspector-actions");
  const practiceButton = createEl("button", "canto-inspector-practice", "Try recall");
  practiceButton.type = "button";
  const revealButton = createEl("button", "canto-inspector-reveal", "Reveal answer");
  revealButton.type = "button";
  revealButton.hidden = true;
  const recallPrompt = createEl("div", "canto-inspector-recall-prompt");
  recallPrompt.hidden = true;
  recallPrompt.setAttribute("aria-live", "polite");
  actions.appendChild(practiceButton);
  actions.appendChild(revealButton);
  panel.appendChild(heading);
  panel.appendChild(metadata);
  panel.appendChild(explanation);
  panel.appendChild(recallPrompt);
  panel.appendChild(actions);

  let trigger = null;
  let currentModel = null;
  let recalling = false;
  let previousMetadataHidden = false;
  const concealedTitles = new Map();
  const concealedElements = new Set();

  function maskElement(element) {
    if (!element || concealedElements.has(element)) return;
    concealedElements.add(element);
    if (typeof element.getAttribute === "function" && typeof element.removeAttribute === "function") {
      concealedTitles.set(element, element.getAttribute("title"));
      element.removeAttribute("title");
    }
    if (element.classList && typeof element.classList.add === "function") {
      element.classList.add("canto-recall-concealed");
    }
  }

  function resetRecall() {
    if (!recalling) return;
    for (const element of concealedElements) {
      if (concealedTitles.has(element)) {
        const saved = concealedTitles.get(element);
        if (saved === null) element.removeAttribute("title");
        else element.setAttribute("title", saved);
      }
      if (element.classList && typeof element.classList.remove === "function") {
        element.classList.remove("canto-recall-concealed");
      }
    }
    concealedElements.clear();
    concealedTitles.clear();
    recalling = false;
    metadata.hidden = previousMetadataHidden;
    explanation.hidden = false;
    recallPrompt.hidden = true;
    practiceButton.hidden = false;
    revealButton.hidden = true;
  }

  function startRecall() {
    if (!trigger || !currentModel || panel.hidden || recalling || practiceButton.disabled) return;
    recalling = true;
    previousMetadataHidden = metadata.hidden;
    maskElement(trigger);
    if (typeof trigger.closest === "function") {
      const phrase = trigger.closest(".canto-pattern");
      maskElement(phrase);
      // Child construction labels and neighboring tokens may have their own
      // native titles. Suppress them during this one deliberate recall attempt.
      if (phrase && typeof phrase.querySelectorAll === "function") {
        for (const child of phrase.querySelectorAll("[title]")) maskElement(child);
      }
    }
    metadata.hidden = true;
    explanation.hidden = true;
    const parts = [];
    if (currentModel.jyutping) parts.push("pronunciation");
    if (currentModel.explanation !== NO_EXPLANATION) parts.push("meaning");
    recallPrompt.textContent = "Recall the " + parts.join(" and ") + ", then reveal.";
    recallPrompt.hidden = false;
    practiceButton.hidden = true;
    revealButton.hidden = false;
    if (typeof revealButton.focus === "function") revealButton.focus();
  }

  function reveal() {
    if (!recalling) return;
    resetRecall();
    if (typeof practiceButton.focus === "function") practiceButton.focus();
  }

  function dismiss(restoreFocus = true) {
    resetRecall();
    if (trigger) {
      trigger.setAttribute("aria-expanded", "false");
      const previous = trigger;
      trigger = null;
      if (restoreFocus && typeof previous.focus === "function") previous.focus();
    }
    currentModel = null;
    panel.hidden = true;
  }

  function inspect(node, nextTrigger, focusOnOpen = false) {
    if (!nextTrigger) return;
    if (!panel.hidden && trigger === nextTrigger) {
      dismiss(false);
      return;
    }
    const model = learnerInspectorModel(node, titleForToken, titleForConstruction);
    if (!model) return;
    resetRecall();
    if (trigger) trigger.setAttribute("aria-expanded", "false");
    trigger = nextTrigger;
    currentModel = model;
    trigger.setAttribute("aria-expanded", "true");
    trigger.setAttribute("aria-controls", panel.id);
    surface.textContent = model.surface || (model.kind === "token" ? "Word" : "Phrase");
    const parts = [];
    if (model.jyutping) parts.push("Jyutping: " + model.jyutping);
    if (model.role && model.role !== "neutral") parts.push("Role: " + model.role);
    metadata.textContent = parts.join(" · ");
    metadata.hidden = parts.length === 0;
    explanation.textContent = model.explanation;
    practiceButton.disabled = !model.jyutping && model.explanation === NO_EXPLANATION;
    panel.hidden = false;
    if (focusOnOpen && typeof panel.focus === "function") panel.focus();
  }

  closeButton.addEventListener("click", () => dismiss());
  practiceButton.addEventListener("click", startRecall);
  revealButton.addEventListener("click", reveal);
  return { panel, inspect, dismiss, startRecall, reveal, isRecalling: () => recalling };
}

module.exports = { learnerInspectorModel, createLearnerInspector };
