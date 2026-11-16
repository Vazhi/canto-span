"use strict";

// Per-block presentation controls. No parser results, note text, or settings are mutated.
const SUPPORTS = Object.freeze([
  { key: "jyutping", label: "Jyutping hints" },
  { key: "colors", label: "Grammar colors" },
  { key: "phrases", label: "Phrase structure" },
]);

function createReadingControls({ createEl, block, onChange = () => {} }) {
  const container = createEl("div", "canto-reader-controls");
  container.setAttribute("role", "group");
  container.setAttribute("aria-label", "Reading supports for this Canto Span block");

  const visible = { jyutping: true, colors: true, phrases: true };
  const buttons = {};
  const originalTitles = new WeakMap();

  function syncNativeTitles() {
    if (!block || typeof block.querySelectorAll !== "function") return;
    // Native titles can otherwise reveal deliberately concealed assistance.
    // The on-demand inspector remains an explicit learner-requested reveal.
    const targets = [
      [".canto-line-normal .canto-token", !visible.jyutping || !visible.colors],
      [".canto-line-normal .canto-pattern", !visible.phrases],
    ];
    for (const [selector, concealed] of targets) {
      for (const target of block.querySelectorAll(selector)) {
        if (!originalTitles.has(target)) originalTitles.set(target, target.getAttribute("title"));
        const title = originalTitles.get(target);
        if (concealed || title === null) target.removeAttribute("title");
        else target.setAttribute("title", title);
      }
    }
  }

  function setVisible(key, next) {
    if (!Object.prototype.hasOwnProperty.call(visible, key)) return false;
    const nextValue = Boolean(next);
    if (visible[key] === nextValue) return false;
    visible[key] = nextValue;
    block.classList.toggle("canto-reader-hide-" + key, !nextValue);
    buttons[key].setAttribute("aria-pressed", String(nextValue));
    buttons[key].classList.toggle("canto-reader-support-on", nextValue);
    syncNativeTitles();
    onChange(key, nextValue);
    return true;
  }

  for (const { key, label } of SUPPORTS) {
    const button = createEl("button", "canto-reader-support canto-reader-support-on", label);
    button.type = "button";
    button.setAttribute("aria-pressed", "true");
    button.addEventListener("click", () => setVisible(key, !visible[key]));
    container.appendChild(button);
    buttons[key] = button;
  }

  return {
    container,
    setVisible,
    getState: () => ({ ...visible }),
    syncNativeTitles,
  };
}

module.exports = { SUPPORTS, createReadingControls };
