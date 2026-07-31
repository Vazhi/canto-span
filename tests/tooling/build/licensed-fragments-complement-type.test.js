"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const createLicensedContextFragments = require("../../../src/parser/context/licensed-fragments");

function createApi() {
  return createLicensedContextFragments({
    cleanSlots: (slots) => slots.filter(Boolean),
    construction: (type, label, children, options = {}) => ({
      kind: "construction",
      type,
      label,
      children,
      ...options,
    }),
    traceInfo: (rule, detail) => ({ rule, ...detail }),
  });
}

function question() {
  return {
    context_turn_id: "question-turn-1",
    question_id: "question-1",
    antecedent_span: "你想唔想去？",
    question_domain_surface: "去",
    question_match_family: "modal_predicate_question",
  };
}

function modalTarget(overrides = {}) {
  return {
    missing_argument_slots: ["modal_complement"],
    selected_alternative: "positive",
    predicate_family: "modal",
    subject_status: "implicit",
    head_surface: "想",
    ...overrides,
  };
}

test("licensedFragmentAnswer declares complement_type once", () => {
  const sourcePath = path.resolve(__dirname, "../../../src/parser/context/licensed-fragments.js");
  const source = fs.readFileSync(sourcePath, "utf8");
  const start = source.indexOf("function licensedFragmentAnswer");
  const end = source.indexOf("function licensedContextFragmentQuestion", start);

  assert.notEqual(start, -1);
  assert.notEqual(end, -1);

  const functionSource = source.slice(start, end);
  assert.equal((functionSource.match(/\bcomplement_type\s*:/g) || []).length, 1);
});

test("target complement_type takes precedence over the modal fallback", () => {
  const { licensedFragmentAnswer } = createApi();
  const result = licensedFragmentAnswer([], modalTarget({ complement_type: "vp" }), question());

  assert.equal(result.trace.complement_type, "vp");
});

test("modal fragments retain the unspecified-complement fallback", () => {
  const { licensedFragmentAnswer } = createApi();
  const result = licensedFragmentAnswer([], modalTarget(), question());

  assert.equal(result.trace.complement_type, "unspecified_np_vp_or_proposition");
});

test("nonmodal fragments retain the empty fallback", () => {
  const { licensedFragmentAnswer } = createApi();
  const result = licensedFragmentAnswer([], modalTarget({ predicate_family: "action" }), question());

  assert.equal(result.trace.complement_type, "");
});

