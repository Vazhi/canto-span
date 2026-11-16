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
  return {
    tag, className, textContent: value, hidden: false, children: [], attributes: attrs,
    appendChild(child) { this.children.push(child); },
    setAttribute(key, val) { attrs[key] = val; },
    addEventListener(type, callback) { listeners[type] = callback; },
    activate(type) { listeners[type]?.({}); },
    focus() { this.focused = true; },
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
