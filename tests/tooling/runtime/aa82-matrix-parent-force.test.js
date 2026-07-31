"use strict";

const assert = require("node:assert/strict");
const path = require("node:path");
const test = require("node:test");
const { root } = require("../../../tools/build-runtime");
const { loadGeneratedRuntimeApi } = require("../../lib/runtime-api");

const api = loadGeneratedRuntimeApi(path.join(root, "main.js"));

function labelsFor(surface) {
  return api.diagnosticFinalRows(api.analyzeLine(surface))
    .filter((row) => row.kind === "construction")
    .map((row) => row.internal_construction || row.construction || row.type || "");
}

const positive = [
  "得呀!喺邊度見呀?",
  "喺邊度等你？",
  "影印機喺邊度？",
  "邊間呀？你講緊邊度？",
  "我哋邊度見？",
  "去邊度呀？",
  "超市喺邊度？",
  "Up-doubling同acting嘅分別喺邊度?",
  "喺邊度搞唧?",
  "邊度有十個percent啊?",
];

const boundaries = [
  "喂，李芳，你知唔知附近邊度有文具舖？",
  "我問佢喺邊度做.",
  "有,佢邊度會跑吖.",
  "我邊度都唔去？",
  "你平時去邊度游水？",
  "你聽日去邊度？",
  "噉你重去過邊度?",
  "嗰陣時我哋去咗邊度食啊?",
  "你哋去邊度食嘢啊?",
  "邊度食得晒唧?",
];

test("AA82 wraps attested matrix locative question families", () => {
  for (const surface of positive) {
    assert(labelsFor(surface).includes("LocativeWhQuestion"), `expected AA82 for ${surface}`);
  }
});

test("AA82 preserves embedded, rhetorical, indefinite, motion, and result boundaries", () => {
  for (const surface of boundaries) {
    assert(!labelsFor(surface).includes("LocativeWhQuestion"), `unexpected AA82 for ${surface}`);
  }
});
