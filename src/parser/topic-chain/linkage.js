"use strict";

module.exports = function createTopicChainLinkage(dependencies = {}) {
  const {
    clauseSequenceSegments, flattenNodes, flattenSurface, getConstructionAffordances,
    isClauseSequenceSeparator, isRelationalCoverbLinker, isTopicFrameLinker, nodeCanFillSlot,
    tokenSemanticDomains, withoutIgnorableSpaceText,
  } = dependencies;

function topicChainAntecedentDescriptor(segment = []) {
  const rows = flattenNodes(segment || []);
  const constructions = rows.filter((row) => row.kind === "construction");
  const npRows = constructions.filter((row) => {
    const type = String(row.type || "");
    return /NP$/u.test(type) || ["NominalHeadSpan", "ModifiedNP", "AssociativeNP", "PluralMarkedNP"].includes(type);
  });
  if (!npRows.length) return null;
  const onlyMeaningful = withoutIgnorableSpaceText(segment).filter((node) => !isClauseSequenceSeparator(node));
  const standaloneTopic = onlyMeaningful.length === 1
    && onlyMeaningful[0].kind === "construction"
    && npRows.some((row) => row.surface === flattenSurface(onlyMeaningful[0]));
  const topicFrameLinker = onlyMeaningful.length >= 2 && isTopicFrameLinker(onlyMeaningful[0])
    ? onlyMeaningful[0]
    : null;
  const relationalCoverbLinker = onlyMeaningful.length >= 2 && isRelationalCoverbLinker(onlyMeaningful[0])
    ? onlyMeaningful[0]
    : null;
  const candidate = standaloneTopic ? npRows[0] : npRows[npRows.length - 1];
  if (!candidate || !candidate.surface) return null;
  const semanticDomains = Array.from(new Set(
    rows.filter((row) => row.kind === "token").flatMap((row) => tokenSemanticDomains(row))
  ));
  return {
    surface: candidate.surface,
    construction: candidate.type || "",
    source: topicFrameLinker
      ? "overt_topic_frame"
      : (standaloneTopic ? "overt_initial_topic" : "prior_clause_nominal_domain"),
    semantic_domains: semanticDomains,
    topic_frame_linker_surface: topicFrameLinker ? topicFrameLinker.surface || "" : "",
    topic_frame_status: topicFrameLinker ? "overt_topic_frame_linked" : "not_applicable",
    relational_coverb_linker_surface: relationalCoverbLinker ? relationalCoverbLinker.surface || "" : "",
    relational_frame_status: relationalCoverbLinker ? "overt_relational_coverb_accounted" : "not_applicable",
  };
}

function visitConstructionNodes(node, visit, depth = 0) {
  if (!node) return;
  if (node.kind === "construction") {
    visit(node, depth);
    for (const child of node.children || []) visitConstructionNodes(child, visit, depth + 1);
  }
}

function productiveObjectHeadToken(node) {
  const rows = flattenNodes([node]);
  return rows.find((row) => row.kind === "token"
    && (row.slots || []).includes("action_verb")
    && getConstructionAffordances(row).can_head_productive_vo === true) || null;
}

function constructionHasOvertObject(node) {
  const rows = flattenNodes([node]);
  const head = productiveObjectHeadToken(node);
  if (!head) return false;
  const headIndex = rows.findIndex((row) => row.kind === "token" && row.surface === head.surface && row.depth === head.depth);
  return rows.slice(Math.max(0, headIndex + 1)).some((row) => {
    if (row.kind === "text") return false;
    const slots = row.slots || [];
    if (slots.includes("subject")) return false;
    return slots.some((slot) => ["object", "theme", "head_noun", "np"].includes(slot));
  });
}

function constructionContainsConstruction(root, target) {
  if (!root || root.kind !== "construction") return false;
  for (const child of root.children || []) {
    if (child === target) return true;
    if (child && child.kind === "construction" && constructionContainsConstruction(child, target)) return true;
  }
  return false;
}

function segmentHasOvertObjectAfterHead(segment = [], headSurface = "") {
  const rows = flattenNodes(segment || []);
  const headIndex = rows.findIndex((row) => row.kind === "token"
    && row.surface === headSurface
    && (row.slots || []).includes("action_verb"));
  if (headIndex < 0) return false;
  return rows.slice(headIndex + 1).some((row) => {
    if (row.kind === "text") return false;
    const slots = row.slots || [];
    if (slots.includes("subject") || slots.includes("particle")) return false;
    return slots.some((slot) => ["object", "theme", "head_noun", "np"].includes(slot));
  });
}

function topicChainGapCandidates(segment = []) {
  const candidates = [];
  for (const root of segment || []) {
    visitConstructionNodes(root, (node, depth) => {
      if (!nodeCanFillSlot(node, "vp") && !nodeCanFillSlot(node, "predicate")) return;
      const head = productiveObjectHeadToken(node);
      if (!head || constructionHasOvertObject(node) || segmentHasOvertObjectAfterHead(segment, head.surface)) return;
      candidates.push({ node, depth, head_surface: head.surface, surface: flattenSurface(node) });
    });
  }
  return candidates.filter((candidate) => !candidates.some((other) =>
    other !== candidate && constructionContainsConstruction(candidate.node, other.node)
  ));
}

function topicChainAntecedentCompatibility(antecedent, head) {
  const antecedentDomains = new Set((antecedent && antecedent.semantic_domains) || []);
  const syntax = String((head && head.syntax) || "");
  const result = (status, reason) => ({ status, reason, antecedent_domains: [...antecedentDomains] });
  if (syntax.includes("chain_select_perception")) {
    return result("compatible", "broad_perception_predicate_accepts_overt_nominal_topic");
  }
  if (syntax.includes("chain_select_discourse_content")) {
    return result("compatible", "discourse_content_predicate_accepts_overt_topic_domain");
  }
  if (syntax.includes("chain_select_edible")) {
    return antecedentDomains.has("food_item") || antecedentDomains.has("edible_item")
      ? result("compatible", "edible_topic_for_consumption_predicate")
      : (antecedentDomains.size
        ? result("incompatible", "known_antecedent_domain_is_not_edible")
        : result("unverified", "eating_predicate_requires_known_edible_topic"));
  }
  if (syntax.includes("chain_select_drinkable")) {
    return antecedentDomains.has("drinkable_item") || antecedentDomains.has("liquid")
      ? result("compatible", "drinkable_topic_for_consumption_predicate")
      : (antecedentDomains.size
        ? result("incompatible", "known_antecedent_domain_is_not_drinkable")
        : result("unverified", "drinking_predicate_requires_known_drinkable_topic"));
  }
  if (syntax.includes("chain_select_bookable_resource")) {
    return antecedentDomains.has("bookable_resource")
      ? result("compatible", "bookable_resource_topic_for_reservation_predicate")
      : result("unverified", "reservation_predicate_requires_known_bookable_resource_topic");
  }
  return result("unverified", "object_selecting_predicate_lacks_topic_chain_selection_profile");
}

function applyTopicChainNullObjectLinkage(children = []) {
  const segments = clauseSequenceSegments(children);
  if (segments.length < 2) return null;
  const antecedent = topicChainAntecedentDescriptor(segments[0]);
  if (!antecedent) return null;
  const candidates = [];
  for (const segment of segments.slice(1)) {
    for (const candidate of topicChainGapCandidates(segment)) {
      candidate.compatibility = topicChainAntecedentCompatibility(antecedent, productiveObjectHeadToken(candidate.node));
      candidates.push(candidate);
    }
  }
  if (!candidates.length) return null;
  const blocked = candidates.filter((candidate) => candidate.compatibility.status !== "compatible");
  const topicChainId = `topic-chain:${antecedent.surface}`;
  const topicFrameTrace = antecedent.topic_frame_linker_surface ? {
    topic_frame_status: antecedent.topic_frame_status,
    topic_frame_linker_surface: antecedent.topic_frame_linker_surface,
    topic_frame_domain_surface: antecedent.surface,
  } : {};
  const relationalFrameTrace = antecedent.relational_coverb_linker_surface ? {
    relational_frame_status: antecedent.relational_frame_status,
    relational_coverb_linker_surface: antecedent.relational_coverb_linker_surface,
    relational_coverb_domain_surface: antecedent.surface,
  } : {};
  if (blocked.length) {
    for (const candidate of candidates) {
      const trace = candidate.node.trace || {};
      candidate.node.trace = {
        ...trace,
        context_requirement_status: "context_required",
        missing_argument_slots: ["object_or_activity_domain"],
        missing_slot_details: [{ slot: "object_or_activity_domain", license_status: "unresolved" }],
        antecedent_status: candidate.compatibility.status === "incompatible" ? "incompatible" : "unverified",
        antecedent_span: antecedent.surface,
        discourse_license_not_observed: true,
        topic_chain_id: topicChainId,
        topic_chain_role: "unresolved_null_object_candidate",
        topic_antecedent_surface: antecedent.surface,
        topic_antecedent_source: antecedent.source,

        ...topicFrameTrace,
        ...relationalFrameTrace,
        topic_antecedent_semantic_domains: antecedent.semantic_domains || [],
        null_object: "unresolved",
        null_object_link: "not_licensed_antecedent_predicate_compatibility",
        antecedent_predicate_compatibility_status: candidate.compatibility.status,
        antecedent_predicate_compatibility_reason: candidate.compatibility.reason,
        semantic_review_flags: Array.from(new Set([...(trace.semantic_review_flags || []), "topic_chain_antecedent_predicate_compatibility_review", "context_required_unresolved"])),
        reason: "An overt topic is available, but the parser cannot license it as this predicate's omitted object unless their broad semantic domains are compatible. No hidden object is inserted.",
        not_claims: Array.from(new Set([...(trace.not_claims || []), "not_fabricated_object_token", "not_unrestricted_argument_deletion", "not_semantically_incompatible_topic_link"])),
      };
    }
    return {
      topic_chain_id: topicChainId,
      topic_chain_status: "antecedent_predicate_compatibility_review",
      topic_antecedent_surface: antecedent.surface,
      topic_antecedent_construction: antecedent.construction,
      topic_antecedent_source: antecedent.source,

      ...topicFrameTrace,
      ...relationalFrameTrace,
      topic_antecedent_semantic_domains: antecedent.semantic_domains || [],
      linked_null_object_count: 0,
      linked_predicate_surfaces: [],
      unresolved_predicate_surfaces: candidates.map((row) => row.surface),
      unresolved_predicate_heads: candidates.map((row) => row.head_surface),
      null_object_link: "not_licensed_antecedent_predicate_compatibility",
      context_requirement_status: "context_required",
      missing_argument_slots: ["object_or_activity_domain"],
      missing_slot_details: [{ slot: "object_or_activity_domain", license_status: "unresolved" }],
      antecedent_status: blocked.some((row) => row.compatibility.status === "incompatible") ? "incompatible" : "unverified",
      antecedent_span: antecedent.surface,
      discourse_license_not_observed: true,
      semantic_review_flags: ["topic_chain_antecedent_predicate_compatibility_review", "context_required_unresolved"],
      not_claims: ["not_fabricated_object_token", "not_implicit_topic_inference", "not_unrestricted_argument_deletion", "not_semantically_incompatible_topic_link"],
    };
  }
  for (const candidate of candidates) {
    const trace = candidate.node.trace || {};
    candidate.node.trace = {
      ...trace,
      context_requirement_status: "context_licensed",
      missing_argument_slots: ["object_or_activity_domain"],
      missing_slot_details: [{ slot: "object_or_activity_domain", license_status: "licensed", licensed_by: topicChainId }],
      antecedent_status: "linked",
      antecedent_span: antecedent.surface,
      discourse_license_not_observed: false,
      topic_chain_id: topicChainId,
      topic_chain_role: "null_object_target",
      topic_antecedent_surface: antecedent.surface,
      topic_antecedent_source: antecedent.source,

      ...topicFrameTrace,
      ...relationalFrameTrace,
      topic_antecedent_semantic_domains: antecedent.semantic_domains || [],
      null_object: "licensed",
      null_object_link: "licensed_to_overt_topic_chain",
      antecedent_predicate_compatibility_status: "compatible",
      antecedent_predicate_compatibility_reason: candidate.compatibility.reason,
      reason: "An overt nominal topic/domain in the first linked segment licenses this later object-selecting predicate's unspoken object. The visible predicate remains unchanged and no hidden noun token is inserted.",
      not_claims: Array.from(new Set([...(trace.not_claims || []), "not_fabricated_object_token", "not_context_free_object_drop", "not_unrestricted_argument_deletion"])),
    };
  }
  return {
    topic_chain_id: topicChainId,
    topic_chain_status: "licensed_overt_topic_chain",
    topic_antecedent_surface: antecedent.surface,
    topic_antecedent_construction: antecedent.construction,
    topic_antecedent_source: antecedent.source,

    ...topicFrameTrace,
    ...relationalFrameTrace,
    topic_antecedent_semantic_domains: antecedent.semantic_domains || [],
    linked_null_object_count: candidates.length,
    linked_predicate_surfaces: candidates.map((row) => row.surface),
    linked_predicate_heads: candidates.map((row) => row.head_surface),
    null_object_link: "licensed_to_overt_topic_chain",
    context_requirement_status: "context_licensed",
    missing_argument_slots: ["object_or_activity_domain"],
    missing_slot_details: [{ slot: "object_or_activity_domain", license_status: "licensed", licensed_by: topicChainId }],
    antecedent_status: "linked",
    antecedent_span: antecedent.surface,
    discourse_license_not_observed: false,
    not_claims: ["not_fabricated_object_token", "not_implicit_topic_inference", "not_unrestricted_argument_deletion"],
  };
}

  return {
    applyTopicChainNullObjectLinkage,
    productiveObjectHeadToken,
    topicChainAntecedentCompatibility,
  };
};
