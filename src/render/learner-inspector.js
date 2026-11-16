"use strict";

// A presentation-only inspector. It consumes the already-authored learner hover
// strings and never derives new grammatical or lexical facts.
let nextInspectorId = 0;

function learnerInspectorModel(node, titleForToken, titleForConstruction) {
  if (!node || (node.kind !== "token" && node.kind !== "construction")) {
    return null;
  }
  const isToken = node.kind === "token";
  const hover = isToken
    ? titleForToken(node)
    : titleForConstruction(node);
  const lines = String(hover || "").split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const surface = String(node.display_surface || lines[0] || node.surface || "").trim();
  const jyutping = isToken ? String(node.jyutping || "").trim() : "";
  const role = isToken ? String(node.role || node.label || "").trim() : "";
  const explanation = lines.slice(1).filter((line) =>
    !line.startsWith("role:") &&
    !line.startsWith("syntax:") &&
    line !== jyutping
  );
  const nonExplanations = new Set(["Cantonese word.", "Cantonese text.", "Cantonese phrase."]);
  const usefulExplanation = explanation.filter((line) => !nonExplanations.has(line));
  return {
    kind: node.kind,
    surface,
    jyutping,
    role,
    explanation: usefulExplanation.length
      ? usefulExplanation.join("\n")
      : "No contextual explanation available for this selection.",
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
  panel.appendChild(heading);
  panel.appendChild(metadata);
  panel.appendChild(explanation);

  let trigger = null;

  function dismiss(restoreFocus = true) {
    if (trigger) {
      trigger.setAttribute("aria-expanded", "false");
      const prior = trigger;
      trigger = null;
      if (restoreFocus && typeof prior.focus === "function") prior.focus();
    }
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
    if (trigger) trigger.setAttribute("aria-expanded", "false");
    trigger = nextTrigger;
    trigger.setAttribute("aria-expanded", "true");
    trigger.setAttribute("aria-controls", panel.id);
    surface.textContent = model.surface || (model.kind === "token" ? "Word" : "Phrase");
    const parts = [];
    if (model.jyutping) parts.push("Jyutping: " + model.jyutping);
    if (model.role && model.role !== "neutral") parts.push("Role: " + model.role);
    metadata.textContent = parts.join(" · ");
    metadata.hidden = parts.length === 0;
    explanation.textContent = model.explanation;
    panel.hidden = false;
    // The panel precedes the reading text in DOM order; keyboard activation
    // must move focus to it so the new explanation is reachable immediately.
    if (focusOnOpen && typeof panel.focus === "function") panel.focus();
  }

  closeButton.addEventListener("click", () => dismiss());
  return { panel, inspect, dismiss };
}

module.exports = { learnerInspectorModel, createLearnerInspector };
