#!/usr/bin/env node
"use strict";

const assert = require("assert/strict");
const test = require("node:test");
const createTokenFeaturePrimitives = require("../../../src/parser/features/token-features");

const primitives = createTokenFeaturePrimitives({
  normalizeLearnerLabel(label) {
    return label || "neutral";
  },
  cleanSlots(slots = []) {
    return [...new Set(slots)].sort();
  },
});

test("inferTokenFeatures owns mutable semantic working state", () => {
  const semantic = Object.freeze([]);
  const entry = Object.freeze({
    label: "where",
    pos: "np",
    syntax: "place noun",
    semantic,
    verb_class: Object.freeze([]),
  });

  const features = primitives.inferTokenFeatures("香港", entry);

  assert.deepEqual(features.semantic, ["place"]);
  assert.deepEqual(entry.semantic, []);
  assert.notStrictEqual(features.semantic, semantic);
});

test("inferTokenFeatures owns mutable verb-class working state", () => {
  const verbClass = Object.freeze([]);
  const entry = Object.freeze({
    label: "doing",
    pos: "verb",
    syntax: "movement_direction",
    semantic: Object.freeze([]),
    verb_class: verbClass,
  });

  const features = primitives.inferTokenFeatures("去", entry);

  assert.deepEqual(features.verb_class, ["movement"]);
  assert.deepEqual(entry.verb_class, []);
  assert.notStrictEqual(features.verb_class, verbClass);
});
