"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { createReadingControls, SUPPORTS } = require("../../../src/render/reading-controls");

function fakeElement(tag, className = "", text = "") {
  const attrs = new Map();
  const listeners = new Map();
  const classes = new Set(className.split(/\s+/).filter(Boolean));
  return {
    tag, className, textContent: text, children: [],
    attrs, classes,
    type: "",
    classList: {
      toggle(name, enabled) { if (enabled) classes.add(name); else classes.delete(name); },
      contains(name) { return classes.has(name); },
    },
    appendChild(child) { this.children.push(child); },
    setAttribute(name, value) { attrs.set(name, String(value)); },
    getAttribute(name) { return attrs.has(name) ? attrs.get(name) : null; },
    removeAttribute(name) { attrs.delete(name); },
    addEventListener(name, callback) { listeners.set(name, callback); },
    click() { listeners.get("click")?.(); },
    querySelectorAll() { return []; },
  };
}

function newBlock(tokens = [], phrases = []) {
  const block = fakeElement("div", "canto-study-block");
  block.querySelectorAll = (selector) => {
    if (selector === ".canto-line-normal .canto-token") return tokens;
    if (selector === ".canto-line-normal .canto-pattern") return phrases;
    throw new Error("Unexpected selector: " + selector);
  };
  return block;
}

test("controls initialize independently and use native accessible toggle buttons", () => {
  const block = newBlock();
  const controls = createReadingControls({ createEl: fakeElement, block });
  assert.deepEqual(controls.getState(), { jyutping: true, colors: true, phrases: true });
  assert.equal(controls.container.getAttribute("role"), "group");
  assert.equal(controls.container.children.length, SUPPORTS.length);
  for (const button of controls.container.children) {
    assert.equal(button.tag, "button");
    assert.equal(button.type, "button");
    assert.equal(button.getAttribute("aria-pressed"), "true");
  }
});

test("toggles change only their own block and preserve independent states", () => {
  const a = newBlock();
  const b = newBlock();
  const first = createReadingControls({ createEl: fakeElement, block: a });
  const second = createReadingControls({ createEl: fakeElement, block: b });
  first.container.children[1].click();
  first.container.children[2].click();
  assert.equal(a.classList.contains("canto-reader-hide-colors"), true);
  assert.equal(a.classList.contains("canto-reader-hide-phrases"), true);
  assert.equal(first.getState().jyutping, true);
  assert.deepEqual(second.getState(), { jyutping: true, colors: true, phrases: true });
  assert.equal(b.classList.contains("canto-reader-hide-colors"), false);
});

test("hiding Jyutping also removes native tooltip leakage, then restores titles", () => {
  const token = fakeElement("span", "canto-token");
  token.setAttribute("title", "茶\nrole: what\ncaa4\ntea");
  const noTitle = fakeElement("span", "canto-token");
  const phrase = fakeElement("span", "canto-pattern");
  phrase.setAttribute("title", "我飲茶\naction with object");
  const block = newBlock([token, noTitle], [phrase]);
  const controls = createReadingControls({ createEl: fakeElement, block });
  controls.container.children[0].click();
  assert.equal(block.classList.contains("canto-reader-hide-jyutping"), true);
  assert.equal(token.getAttribute("title"), null);
  assert.equal(noTitle.getAttribute("title"), null);
  assert.equal(phrase.getAttribute("title"), "我飲茶\naction with object");
  controls.container.children[0].click();
  assert.equal(token.getAttribute("title"), "茶\nrole: what\ncaa4\ntea");
  assert.equal(noTitle.getAttribute("title"), null);
});

test("repeated toggles remain reversible and only effective changes notify listeners", () => {
  const calls = [];
  const block = newBlock();
  const controls = createReadingControls({ createEl: fakeElement, block, onChange: (key, enabled) => calls.push([key, enabled]) });
  assert.equal(controls.setVisible("phrases", true), false);
  assert.equal(controls.setVisible("not-a-support", false), false);
  assert.equal(controls.setVisible("phrases", false), true);
  assert.equal(controls.setVisible("phrases", true), true);
  assert.equal(block.classList.contains("canto-reader-hide-phrases"), false);
  assert.deepEqual(calls, [["phrases", false], ["phrases", true]]);
});

test("controls mutate presentation attributes only, not the source string", () => {
  const input = "我想飲茶";
  const block = newBlock();
  const controls = createReadingControls({ createEl: fakeElement, block });
  controls.setVisible("jyutping", false);
  controls.setVisible("colors", false);
  controls.setVisible("phrases", false);
  assert.equal(input, "我想飲茶");
  assert.equal(block.textContent, "");
  assert.deepEqual(controls.getState(), { jyutping: false, colors: false, phrases: false });
});


test("hidden grammar colors and phrase structure cannot leak through native titles", () => {
  const word = fakeElement("span", "canto-token");
  const phrase = fakeElement("span", "canto-pattern");
  word.setAttribute("title", "我\nrole: who\nngo5\nI");
  phrase.setAttribute("title", "我飲茶\nverb phrase");
  const block = newBlock([word], [phrase]);
  const controls = createReadingControls({ createEl: fakeElement, block });
  controls.setVisible("colors", false);
  assert.equal(word.getAttribute("title"), null);
  assert.equal(phrase.getAttribute("title"), "我飲茶\nverb phrase");
  controls.setVisible("phrases", false);
  assert.equal(phrase.getAttribute("title"), null);
  controls.setVisible("colors", true);
  assert.equal(word.getAttribute("title"), "我\nrole: who\nngo5\nI");
  assert.equal(phrase.getAttribute("title"), null);
  controls.setVisible("phrases", true);
  assert.equal(phrase.getAttribute("title"), "我飲茶\nverb phrase");
});
