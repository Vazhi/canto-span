"use strict";

module.exports = function createAcceptabilityDetectors(dependencies = {}) {
  const {
    cleanSlots, construction, firstToken, flattenSurface, isParticle, isToken, nodeSlots, parserInactiveTokenClone, templateDerivedSlots, token, traceInfo
  } = dependencies;

function isSubjectLike(node) {
  return nodeSlots(node).includes("subject");
}

function isAcceptabilityActionCandidate(node) {
  if (!node || node.kind === "text") return false;
  const slots = nodeSlots(node);
  return slots.includes("directional_motion_vp") || slots.includes("negated_directional_motion_vp") || slots.includes("vp") || slots.includes("action_vp") || slots.includes("predicate");
}

function isDakFormulaNode(node) {
  return node && node.kind === "construction" && flattenSurface(node) === "得喇";
}

function acceptabilityPartClone(node, role = "func", overrides = {}) {
  const surface = overrides.surface || flattenSurface(node);
  return parserInactiveTokenClone(token(surface), {
    label: overrides.label || role,
    pos: overrides.pos || (role === "how" ? "adverbial" : role === "particle" ? "particle" : "function"),
    syntax: overrides.syntax || "acceptability_part",
    slots: overrides.slots || ["acceptability_part"],
    reason: overrides.reason || "Token is parser-inactive inside an acceptability clause wrapper; the parent exposes the acceptability affordance.",
  });
}

function acceptabilityFocusClone(node) {
  return parserInactiveTokenClone(firstToken(node) || token(flattenSurface(node)), {
    label: "how",
    pos: "adverbial",
    syntax: "focus_adverb",
    slots: ["focus_adverb", "how"],
    reason: "都 scopes the acceptability predicate inside 都得, so it stays parser-inactive inside the parent wrapper.",
  });
}

function acceptabilityDakClone(node) {
  return acceptabilityPartClone(node, "func", {
    surface: "得",
    label: "func",
    pos: "function",
    syntax: "acceptability_predicate",
    slots: ["acceptability_predicate"],
    reason: "得 is interpreted here as the acceptability predicate in 都得, so it stays parser-inactive while the parent exposes acceptability.",
  });
}

function acceptabilityParticleClone(node) {
  return acceptabilityPartClone(node, "particle", {
    surface: flattenSurface(node),
    label: "particle",
    pos: "particle",
    syntax: "sentence_final_particle",
    slots: ["particle"],
    reason: "Final particle stays parser-inactive inside an acceptability clause wrapper.",
  });
}

function matchAcceptabilityTail(nodes, index) {
  if (!isToken(nodes[index], "都")) return null;
  const dak = nodes[index + 1];
  if (isToken(dak, "得")) {
    const particle = isParticle(nodes[index + 2]) && ["喇", "啦", "呀", "啊"].includes(flattenSurface(nodes[index + 2])) ? nodes[index + 2] : null;
    return { length: 2 + (particle ? 1 : 0), focus: nodes[index], dak, particle };
  }
  if (isDakFormulaNode(dak)) {
    return { length: 2, focus: nodes[index], dak, particle: token("喇", { label: "particle", syntax: "sentence_final_particle", note: "Final particle split from protected 得喇 formula inside 都得 acceptability." }) };
  }
  return null;
}

function acceptabilityClausePatternAt(nodes, index) {
  let subject = null;
  let action = null;
  let tailIndex = index;

  if (isAcceptabilityActionCandidate(nodes[index])) {
    action = nodes[index];
    tailIndex = index + 1;
    const tail = matchAcceptabilityTail(nodes, tailIndex);
    if (tail) return { ...tail, length: 1 + tail.length, subject, action };
  }

  if (isSubjectLike(nodes[index]) && isAcceptabilityActionCandidate(nodes[index + 1])) {
    subject = nodes[index];
    action = nodes[index + 1];
    tailIndex = index + 2;
    const tail = matchAcceptabilityTail(nodes, tailIndex);
    if (tail) return { ...tail, length: 2 + tail.length, subject, action };
  }

  return null;
}

function acceptabilitySubjectPredicateChild(subject, action) {
  if (!subject || !action) return null;
  const slots = nodeSlots(action);
  if (slots.includes("negated_directional_motion_vp")) {
    const children = [subject, action];
    return construction("SubjectPredicateClause", "SubjPred", children, {
      slots: cleanSlots(["subject_predicate_clause", "subject", "predicate", "clause", "negative_clause", "negated_predicate", "negator"]),
      note: "Transparent subject + negated predicate child preserved inside a larger acceptability clause.",
      trace: traceInfo("generative_template", {
        construction_type: "SubjectPredicateClause",
        retired_label_alias: "SubjectNegatedPredicateClause",
    template_family: "generative_template",
        polarity: "negative",
        template: ["subject!", "predicate!"],
        constraints: { predicate_must_have_any_slots: ["negated_directional_motion_vp"] },
        assigned_slots: ["subject", "predicate"],
        reason: "Expose the broad subject/predicate relation inside AcceptabilityClause without changing the top-level acceptability meaning.",
        surfaces: children.map((node) => flattenSurface(node)),
      }),
    });
  }
  if (slots.includes("productive_vo") || slots.includes("directional_motion_vp")) {
    const children = [subject, action];
    return construction("SubjectPredicateClause", "SubjPred", children, {
      slots: templateDerivedSlots("SubjectPredicateClause", children),
      note: "Transparent subject + predicate child preserved inside a larger acceptability clause.",
      trace: traceInfo("generative_template", {
        construction_type: "SubjectPredicateClause",
        template: ["subject!", "predicate!"],
        constraints: {
          predicate_must_have_any_slots: ["productive_vo", "directional_motion_vp", "motion_purpose_chain", "serial_verb_purpose_chain"],
          disallow_child_slots: ["negated_directional_motion_vp"],
        },
        assigned_slots: ["subject", "predicate"],
        reason: "Expose the subject/predicate relation inside AcceptabilityClause without changing the top-level acceptability meaning.",
        surfaces: children.map((node) => flattenSurface(node)),
      }),
    });
  }
  return null;
}

function makeAcceptabilityClause(match) {
  const children = [];
  const subjectPredicateChild = acceptabilitySubjectPredicateChild(match.subject, match.action);
  if (subjectPredicateChild) {
    children.push(subjectPredicateChild);
  } else {
    if (match.subject) children.push(match.subject);
    if (match.action) children.push(match.action);
  }
  children.push(acceptabilityFocusClone(match.focus));
  children.push(acceptabilityDakClone(match.dak));
  if (match.particle) children.push(acceptabilityParticleClone(match.particle));
  const traceTemplate = subjectPredicateChild
    ? ["predicate!", "focus_adverb!", "acceptability_predicate!", "particle?"]
    : ["subject?", "predicate!", "focus_adverb!", "acceptability_predicate!", "particle?"];
  const assignedSlots = subjectPredicateChild
    ? ["predicate", "focus_adverb", "acceptability_predicate", ...(match.particle ? ["particle"] : [])]
    : [...(match.subject ? ["subject"] : []), "predicate", "focus_adverb", "acceptability_predicate", ...(match.particle ? ["particle"] : [])];
  return construction("AcceptabilityClause", "Acceptability", children, {
    slots: ["acceptability_clause", "acceptability", "focus_adverb", "acceptability_predicate", "predicate", "clause"],
    note: "Bounded action-feasibility clause: an overt action predicate followed by 都得 and an optional final particle. Wh/free-choice 都得 remains outside this node. When a subject + transparent predicate is present, preserve it as a child clause for learner visibility.",
    trace: traceInfo("generative_template", {
      construction_type: "AcceptabilityClause",
      template_family: "generative_template",
      retired_label_alias: "PermissionAcceptabilityClause",
      acceptability_subtype: "action_feasibility",
      template: traceTemplate,
      assigned_slots: assignedSlots,
      rule: "subject? + overt action predicate + focus adverb 都 + acceptability predicate 得 + optional final particle",
      pattern: match.particle ? "subject? + predicate + 都 + 得 + final_particle" : "subject? + predicate + 都 + 得",
      reason: "Checked source evidence directly supports action material followed by 都得 as feasible. The matcher requires that overt host and leaves wh/free-choice 都得 for separate analysis.",
      child_subject_predicate_construction: subjectPredicateChild ? subjectPredicateChild.type : "",
      surfaces: children.map((node) => flattenSurface(node)),
    }),
  });
}

function wrapPermissionAcceptabilitySubspans(nodes) {
  const result = [];
  let i = 0;
  while (i < nodes.length) {
    const match = acceptabilityClausePatternAt(nodes, i);
    if (match) {
      result.push(makeAcceptabilityClause(match));
      i += match.length;
      continue;
    }
    result.push(nodes[i]);
    i += 1;
  }
  return result;
}

  return {
    isSubjectLike,
    isAcceptabilityActionCandidate,
    isDakFormulaNode,
    acceptabilityPartClone,
    acceptabilityFocusClone,
    acceptabilityDakClone,
    acceptabilityParticleClone,
    matchAcceptabilityTail,
    acceptabilityClausePatternAt,
    acceptabilitySubjectPredicateChild,
    makeAcceptabilityClause,
    wrapPermissionAcceptabilitySubspans
  };
};
