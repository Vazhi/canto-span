"use strict";

module.exports = function createWhScalarQuestionDetectors(dependencies = {}) {
  const {
    applyConstructionPatterns, construction, firstToken, flattenSurface, hasSurface,
    isToken, nodeCanFillSlot, surfaceOf, templateDerivedSlots, token, traceInfo,
    withoutIgnorableSpaceText, withoutTrailingParticles,
  } = dependencies;

function whObjectTokenClone(node) {
  const surface = flattenSurface(node);
  if (!['咩', '乜嘢'].includes(surface)) return node;
  return token(surface, {
    label: 'what',
    syntax: 'wh_object',
    slots: ['wh_object', 'object'],
    note: `${surface} functions as the object wh-word here, not as a sentence-final surprise particle.`,
    jyutping: firstToken(node) && firstToken(node).jyutping,
    trace: traceInfo('atomic_lexicon', {
      surface,
      generated_slots: ['wh_object', 'object'],
      contextual_role_override: 'ProgressiveWhObjectQuestion',
      reason: 'v0.5.82 resolves 咩 as wh_object when it is the object of a progressive/transitive predicate.',
    }),
  });
}

function progressiveWhObjectQuestionFallback(core) {
  if (!core || !core.length) return null;
  const { core: bareCore, particles } = withoutTrailingParticles(core);
  const subject = nodeCanFillSlot(bareCore[0], 'subject') ? bareCore[0] : null;
  const predicate = subject ? bareCore[1] : bareCore[0];
  if (!predicate || predicate.kind !== 'construction') return null;

  let progressive = null;
  let wh = null;
  if (predicate.type === 'TransitiveVP' && predicate.children && predicate.children.length === 2) {
    const [first, second] = predicate.children;
    if (nodeCanFillSlot(first, 'progressive_vp') && nodeCanFillSlot(second, 'wh_object')) {
      progressive = first;
      wh = whObjectTokenClone(second);
    }
  } else if (nodeCanFillSlot(predicate, 'progressive_vp')) {
    const candidateWh = subject ? bareCore[2] : bareCore[1];
    if (candidateWh && nodeCanFillSlot(candidateWh, 'wh_object')) {
      progressive = predicate;
      wh = whObjectTokenClone(candidateWh);
    }
  }

  if (!progressive || !wh) return null;
  const children = [...(subject ? [subject] : []), progressive, wh, ...particles];
  return construction('ProgressiveWhObjectQuestion', 'ProgWhQ', children, {
    slots: templateDerivedSlots('ProgressiveWhObjectQuestion', children),
    note: 'Progressive what-object question: subject + progressive VP + wh object.',
    trace: traceInfo('generative_template', {
      construction_type: 'ProgressiveWhObjectQuestion',
      template_family: 'generative_template',
      template: ['subject?', 'progressive_vp!', 'wh_object!', 'particle?'],
      assigned_slots: [...(subject ? ['subject'] : []), 'progressive_vp', 'wh_object', ...particles.map(() => 'particle')],
      surfaces: children.map((node) => flattenSurface(node)),
      reason: 'v0.5.82 promotes progressive + wh-object questions before broad SubjectPredicateClause/TransitiveVP display can leave 咩 with generic wh_or_particle syntax.',
    }),
  });
}

function scalarValueQuestionFallback(core) {
  const { core: bareCore, particles } = withoutTrailingParticles(core);
  const compact = withoutIgnorableSpaceText(bareCore);
  if (compact.length !== 1 || !isToken(compact[0], "幾錢")) return null;
  const children = [compact[0], ...particles];
  return construction("ScalarValueQuestion", "ValueQ", children, {
    slots: ["scalar_value_question", "question_fragment", "price_question"],
    note: "Source-linked lexical price question 幾錢 with an optional final particle.",
    trace: traceInfo("generative_template", {
      construction_type: "ScalarValueQuestion",
      retired_label_alias: "PriceQuestion",
      template_family: "generative_template",
      template: ["scalar_value_question!", "particle?"],
      assigned_slots: ["scalar_value_question", ...particles.map(() => "particle")],
      scalar_domain: "price",
      scalar_question_subtype: "lexical_price_question",
      semantic_domain: "price_property",
      rule: "幾錢 + particle?",
      reason: "Retains the exact attested lexical price-question profile without the former unsourced quantity/person/approximation cross-product.",
      surfaces: children.map((node) => flattenSurface(node)),
    })
  });
}


function locativeWhQuestionFallback(core) {
  if (!isToken(core[0], "喺") || !hasSurface(core, "邊度")) return null;
  return construction("LocativeWhQuestion", "WhereQ", core, {
    note: "Locative wh-question: 喺邊度.",
    trace: traceInfo("legacy_surface_rule", {
      rule: "喺 + 邊度",
      reason: "Surface marker + wh-place fallback.",
    }),
  });
}

function suggestionQuestionFallback(core) {
  if (surfaceOf(core[0]) !== "不如") return null;
  return construction("SuggestionQuestion", "Suggest", core, {
    note: "Suggestion fallback with 不如.",
    trace: traceInfo("construction_function", {
      construction_type: "SuggestionQuestion",
      reason: "Fallback only; generative SuggestionQuestion should normally catch this.",
    }),
  });
}

function existentialWhQuestionFallback(core) {
  if (!hasSurface(core, "有") || !hasSurface(core, "咩")) return null;
  return construction("ExistentialWhQuestion", "有咩", core, {
    note: "Existential wh-question: 有咩 + noun phrase.",
  });
}

function scalarWhDegreeTokenClone(node) {
  if (!node || flattenSurface(node) !== "幾") return node;
  return token("幾", {
    label: "how",
    syntax: "wh_scalar_degree scalar_value_question",
    slots: ["scalar_wh_degree", "scalar_value_question", "how"],
    jyutping: firstToken(node) && firstToken(node).jyutping,
    note: "how much / to what degree",
    trace: traceInfo("atomic_lexicon", {
      surface: "幾",
      generated_slots: ["scalar_wh_degree", "scalar_value_question", "how"],
      contextual_role_override: "ScalarValueQuestion",
      reason: "v0.5.86-r2 resolves question-use 幾 as learner-role how in scalar-dimension questions such as 幾遠 / 幾貴 / 幾高 / 幾耐.",
    }),
  });
}

function scalarDimensionDomainFor(node) {
  const surface = flattenSurface(node);
  const syntax = String((firstToken(node) || node || {}).syntax || "");
  if (syntax.includes("distance") || ["遠", "近"].includes(surface)) return "distance";
  if (syntax.includes("height") || ["高", "矮"].includes(surface)) return "height";
  if (syntax.includes("duration") || ["耐"].includes(surface)) return "duration";
  if (syntax.includes("price") || ["貴", "平"].includes(surface)) return "price";
  return "scalar";
}

function scalarDimensionQuestionFallbackForPunctuation(segment, terminalText = "") {
  if (!/[？?]/u.test(String(terminalText || ""))) return null;
  if (!segment || !segment.length) return null;
  const { core: bareCore, particles } = withoutTrailingParticles(segment);
  if (bareCore.length < 2) return null;
  const whIndex = bareCore.findIndex((node) => flattenSurface(node) === "幾");
  if (whIndex < 0 || whIndex >= bareCore.length - 1) return null;
  const dimension = bareCore[whIndex + 1];
  if (!nodeCanFillSlot(dimension, "scalar_dimension_predicate")) return null;
  if (bareCore.length > whIndex + 2) return null;

  const topicNodes = bareCore.slice(0, whIndex);
  const topicChildren = topicNodes.length ? applyConstructionPatterns(topicNodes) : [];
  if (topicChildren.length > 1) return null;
  const topic = topicChildren[0] || null;
  if (topic && !(nodeCanFillSlot(topic, "topic") || nodeCanFillSlot(topic, "topic_or_object") || nodeCanFillSlot(topic, "location") || nodeCanFillSlot(topic, "time"))) return null;

  const wh = scalarWhDegreeTokenClone(bareCore[whIndex]);
  const children = [...(topic ? [topic] : []), wh, dimension, ...particles];
  const assignedSlots = [...(topic ? ["topic_or_object"] : []), "scalar_wh_degree", "scalar_dimension_predicate", ...particles.map(() => "particle")];
  const scalarDomain = scalarDimensionDomainFor(dimension);
  return construction("ScalarValueQuestion", "ValueQ", children, {
    slots: templateDerivedSlots("ScalarValueQuestion", children),
    note: "Scalar value question: optional topic plus question-use 幾 and a scalar dimension predicate.",
    trace: traceInfo("generative_template", {
      construction_type: "ScalarValueQuestion",
      template_family: "generative_template",
      template: ["topic_or_object?", "scalar_wh_degree!", "scalar_dimension_predicate!", "particle?"],
      assigned_slots: assignedSlots,
      scalar_domain: scalarDomain,
      semantic_domain: `${scalarDomain}_property`,
      role_resolution_note: "Question punctuation activates scalar-question 幾; non-question degree-stative statements keep ordinary degree-stative/topic-comment parsing.",
      surfaces: children.map((node) => flattenSurface(node)),
      reason: "v0.5.86 promotes 幾 + scalar predicate questions such as 幾遠 / 幾貴 / 幾高 / 幾耐 without globally lexicalizing those strings or stealing degree-stative statements.",
    }),
  });
}

  return {
    existentialWhQuestionFallback,
    locativeWhQuestionFallback,
    progressiveWhObjectQuestionFallback,
    scalarDimensionQuestionFallbackForPunctuation,
    scalarValueQuestionFallback,
    suggestionQuestionFallback,
  };
};
