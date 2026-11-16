"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { learnerInspectorModel, createLearnerInspector } = require("../../../src/render/learner-inspector");

const tokenTitle = (node) => [
  node.surface, "role: " + node.label,
  "syntax: " + (node.syntax || ""), node.jyutping || "",
  ...(node.gloss || []),
].join("\n");
const phraseTitle = (node) => [node.surface, ...(node.gloss || [])].join("\n");

function fakeElement(tag, className = "", value = "") {
  const listeners = {};
  const attrs = {};
  const classes = new Set(className.split(/\s+/).filter(Boolean));
  return {
    tag, className, textContent: value, hidden: false, children: [], attributes: attrs,
    disabled: false,
    classList: {
      add(name) { classes.add(name); },
      remove(name) { classes.delete(name); },
      contains(name) { return classes.has(name); },
    },
    appendChild(child) { this.children.push(child); },
    setAttribute(key, val) { attrs[key] = String(val); },
    getAttribute(key) { return Object.prototype.hasOwnProperty.call(attrs, key) ? attrs[key] : null; },
    removeAttribute(key) { delete attrs[key]; },
    addEventListener(type, callback) { listeners[type] = callback; },
    activate(type) { listeners[type]?.({}); },
    focus() { this.focused = true; },
    closest() { return this.patternAncestor || null; },
  };
}

test("token inspector reuses contextual gloss while excluding diagnostic syntax", () => {
  const node = { kind: "token", surface: "飲", jyutping: "jam2", label: "doing",
    syntax: "verb transitive_verb", gloss: ["drink", "Action of drinking."] };
  assert.deepEqual(learnerInspectorModel(node, tokenTitle, phraseTitle), {
    kind: "token", surface: "飲", jyutping: "jam2", role: "doing",
    explanation: "drink\nAction of drinking.",
  });
});

test("unknown tokens do not receive invented meanings", () => {
  const model = learnerInspectorModel(
    { kind: "token", surface: "𠮶", label: "neutral", gloss: ["Cantonese word."] },
    tokenTitle, phraseTitle
  );
  assert.equal(model.explanation, "No contextual explanation available for this selection.");
  assert.equal(model.jyutping, "");
  assert.equal(model.role, "neutral");
});

test("construction inspection uses existing phrase explanation", () => {
  const node = { kind: "construction", surface: "我飲茶", gloss: ["action with an object"] };
  const model = learnerInspectorModel(node, tokenTitle, phraseTitle);
  assert.equal(model.surface, "我飲茶");
  assert.equal(model.explanation, "action with an object");
  assert.equal(model.role, "");
});

test("one panel switches targets, closes, and restores keyboard focus", () => {
  const ui = createLearnerInspector({
    createEl: fakeElement, titleForToken: tokenTitle, titleForConstruction: phraseTitle,
  });
  const first = fakeElement("span");
  const second = fakeElement("span");
  const a = { kind: "token", surface: "茶", label: "what", jyutping: "caa4", gloss: ["tea"] };
  const b = { kind: "token", surface: "飲", label: "doing", jyutping: "jam2", gloss: ["drink"] };
  assert.equal(ui.panel.hidden, true);
  ui.inspect(a, first);
  assert.equal(ui.panel.hidden, false);
  assert.equal(first.attributes["aria-expanded"], "true");
  assert.equal(ui.panel.children[0].children[0].textContent, "茶");
  ui.inspect(b, second);
  assert.equal(first.attributes["aria-expanded"], "false");
  assert.equal(second.attributes["aria-expanded"], "true");
  assert.match(ui.panel.children[1].textContent, /jam2/);
  ui.panel.children[0].children[1].activate("click");
  assert.equal(ui.panel.hidden, true);
  assert.equal(second.focused, true);
  assert.equal(second.attributes["aria-expanded"], "false");
});

test("selecting the same target again toggles the inspector closed", () => {
  const ui = createLearnerInspector({
    createEl: fakeElement, titleForToken: tokenTitle, titleForConstruction: phraseTitle,
  });
  const trigger = fakeElement("span");
  const word = { kind: "token", surface: "我", label: "who", gloss: ["I"] };
  ui.inspect(word, trigger);
  ui.inspect(word, trigger);
  assert.equal(ui.panel.hidden, true);
  assert.equal(trigger.attributes["aria-expanded"], "false");
});

test("unsupported node kinds leave the inspector closed", () => {
  const ui = createLearnerInspector({
    createEl: fakeElement, titleForToken: tokenTitle, titleForConstruction: phraseTitle,
  });
  ui.inspect({ kind: "text", text: "hello" }, fakeElement("span"));
  assert.equal(ui.panel.hidden, true);
});

test("keyboard opening focuses the inspector while touch opening does not steal focus", () => {
  const ui = createLearnerInspector({
    createEl: fakeElement, titleForToken: tokenTitle, titleForConstruction: phraseTitle,
  });
  const a = { kind: "token", surface: "茶", label: "what", gloss: ["tea"] };
  const first = fakeElement("span");
  const second = fakeElement("span");
  ui.inspect(a, first, false);
  assert.equal(ui.panel.focused, undefined);
  ui.inspect(a, second, true);
  assert.equal(ui.panel.focused, true);
  assert.equal(ui.panel.attributes.tabindex, "-1");
  ui.dismiss();
  assert.equal(second.focused, true);
});


test("recall conceals pronunciation, gloss and native titles until explicit reveal", () => {
  const ui = createLearnerInspector({ createEl: fakeElement, titleForToken: tokenTitle, titleForConstruction: phraseTitle });
  const trigger = fakeElement("span", "canto-token");
  const pattern = fakeElement("span", "canto-pattern");
  trigger.patternAncestor = pattern;
  trigger.setAttribute("title", "茶\ncaa4\ntea");
  pattern.setAttribute("title", "phrase meaning");
  ui.inspect({ kind: "token", surface: "茶", label: "what", jyutping: "caa4", gloss: ["tea"] }, trigger);
  ui.startRecall();
  assert.equal(ui.isRecalling(), true);
  assert.equal(ui.panel.children[1].hidden, true); // metadata
  assert.equal(ui.panel.children[2].hidden, true); // explanation
  assert.equal(ui.panel.children[3].hidden, false); // prompt
  assert.equal(trigger.getAttribute("title"), null);
  assert.equal(pattern.getAttribute("title"), null);
  assert.equal(trigger.classList.contains("canto-recall-concealed"), true);
  assert.equal(pattern.classList.contains("canto-recall-concealed"), true);
  assert.equal(ui.panel.children[4].children[1].focused, true); // Reveal action
  ui.reveal();
  assert.equal(ui.isRecalling(), false);
  assert.equal(trigger.getAttribute("title"), "茶\ncaa4\ntea");
  assert.equal(pattern.getAttribute("title"), "phrase meaning");
  assert.equal(ui.panel.children[1].hidden, false);
  assert.equal(ui.panel.children[2].hidden, false);
});

test("changing selection or closing during recall clears stale concealment", () => {
  const ui = createLearnerInspector({ createEl: fakeElement, titleForToken: tokenTitle, titleForConstruction: phraseTitle });
  const first = fakeElement("span");
  const second = fakeElement("span");
  first.setAttribute("title", "first meaning");
  second.setAttribute("title", "second meaning");
  ui.inspect({ kind: "token", surface: "我", label: "who", jyutping: "ngo5", gloss: ["I"] }, first);
  ui.startRecall();
  ui.inspect({ kind: "token", surface: "茶", label: "what", jyutping: "caa4", gloss: ["tea"] }, second);
  assert.equal(first.getAttribute("title"), "first meaning");
  assert.equal(second.getAttribute("title"), "second meaning");
  assert.equal(ui.isRecalling(), false);
  ui.startRecall();
  ui.dismiss();
  assert.equal(second.getAttribute("title"), "second meaning");
  assert.equal(second.focused, true);
  assert.equal(ui.panel.hidden, true);
  assert.equal(ui.isRecalling(), false);
});

test("phrase recall works without pronunciation and does not invent it", () => {
  const ui = createLearnerInspector({ createEl: fakeElement, titleForToken: tokenTitle, titleForConstruction: phraseTitle });
  const trigger = fakeElement("span");
  ui.inspect({ kind: "construction", surface: "我飲茶", gloss: ["action with an object"] }, trigger);
  ui.startRecall();
  assert.equal(ui.isRecalling(), true);
  assert.equal(ui.panel.children[3].textContent, "Recall the meaning, then reveal.");
  ui.reveal();
  assert.equal(ui.panel.children[2].textContent, "action with an object");
});

test("unknown selection with neither a reliable gloss nor Jyutping cannot start recall", () => {
  const ui = createLearnerInspector({ createEl: fakeElement, titleForToken: tokenTitle, titleForConstruction: phraseTitle });
  const trigger = fakeElement("span");
  ui.inspect({ kind: "token", surface: "𠮶", label: "neutral", gloss: ["Cantonese word."] }, trigger);
  assert.equal(ui.panel.children[4].children[0].disabled, true);
  ui.startRecall();
  assert.equal(ui.isRecalling(), false);
  assert.equal(ui.panel.children[2].textContent, "No contextual explanation available for this selection.");
});
