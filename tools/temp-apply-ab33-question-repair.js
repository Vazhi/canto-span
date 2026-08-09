#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const detectorPath = path.join(root, "src/parser/detectors/questions/a-not-a.js");

function replaceOnce(text, pattern, replacement, label) {
  const matches = text.match(pattern);
  if (!matches) throw new Error(`Missing replacement target: ${label}`);
  const next = text.replace(pattern, replacement);
  if (next === text) throw new Error(`Replacement made no change: ${label}`);
  return next;
}

let source = fs.readFileSync(detectorPath, "utf8");

source = replaceOnce(
  source,
  /  function preferenceANotAQuestionFallback\(core\) \{[\s\S]*?\n  \}\n\n  function desiderativeANotAQuestionFallback/,
`  function alternativeScalarQuestionTail(nodes) {
    const compact = withoutIgnorableSpaceText(nodes || []);
    if (compact.length < 4) return null;
    const connectorIndex = compact.findIndex((node) => isToken(node, "定係"));
    if (connectorIndex <= 0 || connectorIndex >= compact.length - 2) return null;
    if (surfaceOf(compact[compact.length - 1]) !== "多啲") return null;
    const left = compact.slice(0, connectorIndex);
    const right = compact.slice(connectorIndex + 1, -1);
    if (!left.length || !right.length) return null;
    if ([...left, ...right].some((node) => isParticle(node) || isQuestionPunctuationText(node))) return null;
    return {
      children: compact,
      assignedSlots: compact.map((node, index) => {
        if (index === connectorIndex) return "question_fragment";
        if (index === compact.length - 1) return "degree";
        return "predicate";
      }),
    };
  }

  function preferenceANotAQuestionFallback(core) {
    const { bareCore, particles } = splitFinalQuestionMaterial(core);
    const compact = withoutIgnorableSpaceText(bareCore);
    const offset = compact.length >= 5 && nodeCanFillSlot(compact[0], "subject") ? 1 : 0;
    if (compact.length - offset < 4) return null;
    const firstSyllable = compact[offset];
    const negator = compact[offset + 1];
    const preferencePredicate = compact[offset + 2];
    if (!isToken(firstSyllable, "鍾") || !isToken(negator, "唔") || !isToken(preferencePredicate, "鍾意")) return null;

    const complementCore = compact.slice(offset + 3);
    if (!complementCore.length) return null;
    const wrappedComplement = applyConstructionPatterns(complementCore);
    if (wrappedComplement.length === 1) {
      const complement = wrappedComplement[0];
      const complementSlot = nodeCanFillSlot(complement, "vp")
        ? "vp"
        : (nodeCanFillSlot(complement, "np") || nodeCanFillSlot(complement, "object") ? "object" : "");
      if (!complementSlot) return null;

      const children = [...compact.slice(0, offset), firstSyllable, negator, preferencePredicate, complement, ...particles];
      const assignedSlots = [
        ...compact.slice(0, offset).map(() => "subject"),
        "a_not_a_first_syllable",
        "negator",
        "preference_predicate",
        complementSlot,
        ...particles.map(() => "particle"),
      ];
      return construction("ANotAQuestion", "A-not-A", children, {
        note: "Bounded first-syllable preference A-not-A question: optional subject + 鍾唔鍾意 + overt typed NP/VP complement.",
        slots: cleanSlots(["question_fragment", "predicate", "negator", complementSlot, ...templateDerivedSlots("ANotAQuestion", children)]),
        trace: traceInfo("generative_template", {
          construction_type: "ANotAQuestion",
          template_family: "first_syllable_preference_a_not_a",
          template: ["subject?", "a_not_a_first_syllable!", "negator!", "preference_predicate!", \`\${complementSlot}!\`, "particle?"],
          assigned_slots: assignedSlots,
          surfaces: children.map((node) => flattenSurface(node)),
          copied_surface_profile: "first_syllable_plus_full_preference_predicate",
          reason: "Preserves reviewed 鍾唔鍾意 + overt typed complement questions without reclassifying them as AB33 PreferenceVP.",
        }),
      });
    }

    const alternative = alternativeScalarQuestionTail(complementCore);
    if (!alternative) return null;
    const children = [
      ...compact.slice(0, offset),
      firstSyllable,
      negator,
      preferencePredicate,
      ...alternative.children,
      ...particles,
    ];
    const assignedSlots = [
      ...compact.slice(0, offset).map(() => "subject"),
      "a_not_a_first_syllable",
      "negator",
      "preference_predicate",
      ...alternative.assignedSlots,
      ...particles.map(() => "particle"),
    ];
    return construction("ANotAQuestion", "A-not-A", children, {
      note: "Bounded first-syllable preference A-not-A question with separately preserved alternative/scalar material.",
      slots: cleanSlots(["question_fragment", "predicate", "negator", "degree", ...templateDerivedSlots("ANotAQuestion", children)]),
      trace: traceInfo("construction_function", {
        construction_type: "ANotAQuestion",
        rule: "subject? + 鍾 + 唔 + 鍾意 + alternative material + 定係 + alternative material + 多啲 + particle?",
        assigned_slots: assignedSlots,
        surfaces: children.map((node) => flattenSurface(node)),
        reason: "Preserves the reviewed outer first-syllable A-not-A question while leaving alternative/scalar material transparent and outside AB33 PreferenceVP.",
      }),
    });
  }

  function desiderativeANotAQuestionFallback`,
  "preference A-not-A fallback",
);

source = replaceOnce(
  source,
  /  function copularANotAQuantifiedPreferenceClauseCandidate\(complementCore\) \{[\s\S]*?\n  \}\n\n  function isPreferencePredicateWithTypedActivityComplement\(node\) \{[\s\S]*?\n  \}\n\n  function isQuestionPunctuationText/,
`  function typedPreferencePredicateParts(nodes) {
    const compact = withoutIgnorableSpaceText(nodes || []);
    if (compact.length === 1 && compact[0] && compact[0].kind === "construction" && compact[0].type === "ModifierNP") {
      const modifierChildren = withoutIgnorableSpaceText(compact[0].children || []);
      if (modifierChildren.length !== 2 || !isToken(modifierChildren[0], "鍾意")) return null;
      const complement = modifierChildren[1];
      const complementSlot = nodeCanFillSlot(complement, "vp")
        ? "vp"
        : (nodeCanFillSlot(complement, "np") || nodeCanFillSlot(complement, "object") ? "object" : "");
      if (!complementSlot) return null;
      return {
        children: [modifierChildren[0], complement],
        assignedSlots: ["preference_predicate", complementSlot],
        profile: \`typed_\${complementSlot}\`,
      };
    }

    if (compact.length === 2 && isToken(compact[0], "鍾意")) {
      const complementSlot = nodeCanFillSlot(compact[1], "vp")
        ? "vp"
        : (nodeCanFillSlot(compact[1], "np") || nodeCanFillSlot(compact[1], "object") ? "object" : "");
      if (complementSlot) {
        return {
          children: compact,
          assignedSlots: ["preference_predicate", complementSlot],
          profile: \`typed_\${complementSlot}\`,
        };
      }
    }

    if (compact.length === 3
        && isToken(compact[0], "鍾意")
        && isToken(compact[1], "咗")
        && (nodeCanFillSlot(compact[2], "np") || nodeCanFillSlot(compact[2], "object"))) {
      return {
        children: compact,
        assignedSlots: ["preference_predicate", "perfective_aspect", "object"],
        profile: "perfective_np_object",
      };
    }

    if (compact.length >= 5 && isToken(compact[0], "鍾意")) {
      const alternative = alternativeScalarQuestionTail(compact.slice(1));
      if (alternative) {
        return {
          children: [compact[0], ...alternative.children],
          assignedSlots: ["preference_predicate", ...alternative.assignedSlots],
          profile: "alternative_scalar",
        };
      }
    }
    return null;
  }

  function copularANotAQuantifiedPreferenceClauseCandidate(complementCore) {
    const compact = withoutIgnorableSpaceText(applyConstructionPatterns(complementCore));
    if (compact.length < 4) return null;
    const [quantifier, subject, focus, ...predicateNodes] = compact;
    if (!isToken(quantifier, "每")) return null;
    if (!nodeCanFillSlot(subject, "subject")) return null;
    if (!isToken(focus, "都") || !nodeCanFillSlot(focus, "focus_adverb")) return null;

    const predicateParts = typedPreferencePredicateParts(predicateNodes);
    if (!predicateParts) return null;
    const children = [quantifier, subject, focus, ...predicateParts.children];
    const assignedSlots = ["distributive_quantifier", "subject", "focus_adverb", ...predicateParts.assignedSlots];
    return construction("SubjectPredicateClause", "SubjPred", children, {
      note: "Bounded copular A-not-A complement: 每 + overt subject + 都 + visible preference predicate material.",
      slots: cleanSlots([
        "subject_predicate_clause",
        "clause",
        "subject",
        "focus_adverb",
        "predicate",
        "preference_predicate",
        ...templateDerivedSlots("SubjectPredicateClause", children),
      ]),
      trace: traceInfo("construction_function", {
        construction_type: "SubjectPredicateClause",
        rule: "每 + subject + 都 + visible 鍾意 predicate material",
        assigned_slots: assignedSlots,
        surfaces: children.map((node) => flattenSurface(node)),
        reason: "Reconstructs the reviewed copular-question complement from visible preference material without certifying an accidental ModifierNP or restoring broad AB33 PreferenceVP matching.",
      }),
    });
  }

  function isQuestionPunctuationText`,
  "copular preference reconstruction",
);

fs.writeFileSync(detectorPath, source);

function updateConstructionCases(relativePath, transform) {
  const absolutePath = path.join(root, relativePath);
  const data = JSON.parse(fs.readFileSync(absolutePath, "utf8"));
  transform(data);
  fs.writeFileSync(absolutePath, `${JSON.stringify(data, null, 2)}\n`);
}

updateConstructionCases("tests/constructions/CopularANotAQuestion.json", (data) => {
  const rewrites = new Map([
    ["AB33-ZUNGJI-COPA-N01", { case_id: "AB33-ZUNGJI-COPA-P03", class: "copular_a_not_a_np_preference_outer_question_preserved", assertion: "construction_present", expected_profile: "construction_present" }],
    ["AB33-ZUNGJI-COPA-N02", { case_id: "AB33-ZUNGJI-COPA-P04", class: "copular_a_not_a_aspect_np_preference_outer_question_preserved", assertion: "construction_present", expected_profile: "construction_present" }],
    ["AB33-ZUNGJI-COPA-N03", { case_id: "AB33-ZUNGJI-COPA-P05", class: "copular_a_not_a_alternative_scalar_outer_question_preserved", assertion: "construction_present", expected_profile: "construction_present" }],
  ]);
  for (const row of data.focused_cases || []) {
    const replacement = rewrites.get(row.case_id);
    if (replacement) Object.assign(row, replacement);
  }
  data.coverage.focused_positive_count = 5;
  data.coverage.focused_boundary_count = 1;
  data.coverage.positive_case_count = 5;
  data.coverage.boundary_case_count = 1;
});

updateConstructionCases("tests/constructions/ANotAQuestion.json", (data) => {
  for (const row of data.focused_cases || []) {
    if (row.case_id === "AB33-ZUNGJI-ANOTA-N03") {
      Object.assign(row, {
        case_id: "AB33-ZUNGJI-ANOTA-P03",
        class: "first_syllable_preference_a_not_a_preserves_alternative_scalar_material_outside_ab33",
        assertion: "construction_present",
        expected_profile: "construction_present",
      });
    }
  }
  data.coverage.focused_positive_count = 3;
  data.coverage.focused_boundary_count = 4;
  data.coverage.positive_case_count = 13;
  data.coverage.boundary_case_count = 4;
});

console.log("Applied bounded AB33 outer-question repair source and fixture reclassification.");
