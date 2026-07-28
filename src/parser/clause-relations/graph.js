"use strict";

module.exports = function createClauseRelationGraph(dependencies = {}) {
  const {
    CLAUSE_LINKER_SURFACES, CLAUSE_RELATION_SUBTYPE_REGISTRY, applyConstructionPatterns, applyTopicChainNullObjectLinkage,
    clauseLinkerInventory, clauseLinkingWrapperCoverage, wrapperCoverageForConstructionNode,
    cleanSlots, cognitionContentFrameFallback, construction, firstToken, flattenNodes, flattenSurface,
    hasConstruction, isClauseSequenceSeparator, isClauseSequenceTerminal, learnerDisplaySlots,
    nodeCanFillSlot, nodeSlots, opinionStanceFrameFallback, parserInactiveTokenClone,
    reportedSpeechFrameFallback, surfaceOf, token, traceInfo, withoutIgnorableSpaceText,
  } = dependencies;

function isClauseSequenceMeaningfulNode(node) {
  if (!node || node.kind !== "construction") return false;
  if (node.type === "ClauseSequence" || node.type === "ClauseRelationGraph") return false;
  return true;
}

function meaningfulClauseConstructionCount(nodes = []) {
  return nodes.filter(isClauseSequenceMeaningfulNode).length;
}

function parsedClauseNodes(segment = []) {
  const compact = withoutIgnorableSpaceText(segment || []);
  if (!compact.length) return [];
  const parsed = applyConstructionPatterns(compact);
  if (parsed.length === 1 && parsed[0] && parsed[0].kind === "construction" && parsed[0].type === "NominalHeadSpan") {
    const productiveChild = (parsed[0].children || []).find((child) => child && child.kind === "construction" && child.type === "ProductiveVO" && nodeCanFillSlot(child, "vp"));
    if (productiveChild && flattenSurface(productiveChild) === flattenSurface(parsed[0])) return [productiveChild];
  }
  return parsed;
}

function buildGovernedClauseRelationGraph(children = [], detail = {}) {
  const compact = withoutIgnorableSpaceText(children || []);
  if (meaningfulClauseConstructionCount(compact) < 2) return null;
  const wrapperCoverage = clauseLinkingWrapperCoverage(compact);
  if (wrapperCoverage.unaccounted_wrapper_token_count > 0) return null;
  return construction("ClauseRelationGraph", "ClauseLink", compact, {
    note: detail.note || "Linked clauses. This governed discourse/coordination wrapper preserves all child constructions and explicitly accounts for linker/separator material; it does not replace or flatten the child clauses.",
    trace: traceInfo("governed_discourse_wrapper", {
      rule: detail.rule || "connector-governed clause-linking sequence",
      reason: detail.reason || "Connector-governed clause linking groups independently parsed clause-like children while keeping linkers and separators visible and accounted for.",
      graph_container_semantic_status: "neutral_container_only",
      independent_grammar_licensing: false,
      relation_semantics_source: "preexisting_child_constructions_and_linker_rules_only",
      child_constructions: compact
        .filter((node) => node && node.kind === "construction")
        .map((node) => node.type),
      linkers: clauseLinkerInventory(compact),
      separators: compact
        .filter(isClauseSequenceSeparator)
        .map((node) => node.text),
      wrapper_coverage: wrapperCoverage,
      ...(detail.trace_detail || {}),
    })
  });
}

function connectorLeadingClauseSegment(segment = []) {
  const compact = withoutIgnorableSpaceText(segment || []);
  if (compact.length < 2) return null;
  const first = compact[0];
  if (!first || first.kind !== "token" || !CLAUSE_LINKER_SURFACES.has(first.surface || "")) return null;
  if (!["但係", "不過", "所以", "然後", "跟住", "跟住就", "就", "咁", "噉"].includes(first.surface || "")) return null;
  const parsedRest = parsedClauseNodes(compact.slice(1));
  if (!parsedRest.length || meaningfulClauseConstructionCount(parsedRest) < 1) return null;
  return [first, ...parsedRest];
}

function connectorPairClauseLinkingSegment(segment = []) {
  const compact = withoutIgnorableSpaceText(segment || []);
  if (compact.length < 4) return null;
  const surfaceAt = (index) => compact[index] && compact[index].kind === "token" ? compact[index].surface || "" : "";
  const firstSurface = surfaceAt(0);

  const pairedPatterns = [
    {
      opener: "如果",
      pivot: "就",
      rule: "如果...就 condition-result clause-linking sequence",
      reason: "如果 introduces the condition and 就 introduces the result; both sides are parsed independently under a broad ClauseRelationGraph wrapper.",
      subtype: "condition_result",
    },
    {
      opener: "因為",
      pivot: "所以",
      rule: "因為...所以 reason-result clause-linking sequence",
      reason: "因為 introduces the reason and 所以 introduces the result; both sides are parsed independently under a broad ClauseRelationGraph wrapper.",
      subtype: "reason_result",
    },
  ];
  for (const pattern of pairedPatterns) {
    if (firstSurface !== pattern.opener) continue;
    const pivotIndex = compact.findIndex((node, index) => index > 1 && node && node.kind === "token" && (node.surface || "") === pattern.pivot);
    if (pivotIndex < 0) continue;
    const left = parsedClauseNodes(compact.slice(1, pivotIndex));
    const right = parsedClauseNodes(compact.slice(pivotIndex + 1));
    const wrapper = buildGovernedClauseRelationGraph([compact[0], ...left, compact[pivotIndex], ...right], {
      rule: pattern.rule,
      reason: pattern.reason,
      trace_detail: { clause_linking_subtype: pattern.subtype },
    });
    if (wrapper) return wrapper;
  }

  const temporalIndex = compact.findIndex((node, index) => index > 0 && node && node.kind === "token" && ["之後", "之前"].includes(node.surface || ""));
  if (temporalIndex > 0 && temporalIndex < compact.length - 1) {
    const left = parsedClauseNodes(compact.slice(0, temporalIndex));
    const right = parsedClauseNodes(compact.slice(temporalIndex + 1));
    const linker = compact[temporalIndex];
    const wrapper = buildGovernedClauseRelationGraph([...left, linker, ...right], {
      rule: `${linker.surface} temporal clause-linking sequence`,
      reason: `${linker.surface} links a preceding event/clause-like unit to a following event/clause-like unit; the wrapper keeps both children visible.`,
      trace_detail: { clause_linking_subtype: "temporal_sequence" },
    });
    if (wrapper) return wrapper;
  }

  const contrastIndex = compact.findIndex((node, index) => index > 0 && node && node.kind === "token" && ["但係", "不過"].includes(node.surface || ""));
  if (contrastIndex > 0 && contrastIndex < compact.length - 1) {
    const left = parsedClauseNodes(compact.slice(0, contrastIndex));
    const right = parsedClauseNodes(compact.slice(contrastIndex + 1));
    const linker = compact[contrastIndex];
    const wrapper = buildGovernedClauseRelationGraph([...left, linker, ...right], {
      rule: `${linker.surface} contrast clause-linking sequence`,
      reason: `${linker.surface} links two contrasting clause-like units; the wrapper keeps both child parses and the contrast marker visible.`,
      trace_detail: { clause_linking_subtype: "contrast" },
    });
    if (wrapper) return wrapper;
  }

  return null;
}

function connectorAwareClauseLinkingForTerminal(segment = []) {
  const pairWrapper = connectorPairClauseLinkingSegment(segment);
  if (pairWrapper) return [pairWrapper];
  const leading = connectorLeadingClauseSegment(segment);
  if (leading) return leading;
  return null;
}

function clauseRelationLeafNodes(node) {
  if (!node) return [];
  if (node.kind === "token" || node.kind === "text") return [node];
  if (node.kind === "construction") return (node.children || []).flatMap(clauseRelationLeafNodes);
  return [];
}

function clauseRelationSegmentNodes(segment = []) {
  const compact = withoutIgnorableSpaceText(segment || []);
  if (
    compact.length === 1 &&
    compact[0] &&
    compact[0].kind === "construction" &&
    ["RelativeClauseNP"].includes(compact[0].type)
  ) return compact.slice();
  return compact.flatMap(clauseRelationLeafNodes).filter((node) => !(node.kind === "text" && !String(node.text || "").trim()));
}

function clauseRelationSurfaceList(nodes = []) {
  return (nodes || []).map((node) => flattenSurface(node));
}

function clauseRelationSurfaceIndex(nodes = [], surfaces = [], start = 0) {
  const wanted = new Set(surfaces || []);
  for (let index = Math.max(0, start); index < nodes.length; index += 1) {
    if (wanted.has(flattenSurface(nodes[index]))) return index;
  }
  return -1;
}

function clauseRelationContainsSurface(nodes = [], surface = "") {
  return clauseRelationSurfaceIndex(nodes, [surface]) >= 0;
}

function clauseRelationActionVPFor(nodes = [], options = {}) {
  const compact = withoutIgnorableSpaceText(nodes || []);
  if (!compact.length) return null;
  const first = compact[0];
  const firstTok = firstToken(first);
  if (!firstTok || !nodeCanFillSlot(first, "action_verb")) return null;

  if (compact.length === 1) {
    return construction("IntransitiveVP", "VP", compact, {
      note: "Broad intransitive/action VP used as a visible clause-relation member.",
      trace: traceInfo("generative_template", {
        construction_type: "IntransitiveVP",
        template_family: "generative_template",
        template: ["action_verb!"],
        assigned_slots: ["action_verb"],
        relation_member_scope: true,
        reason: "A visible action predicate without an overt object is preserved as a VP member; no subject or object token is inserted.",
        not_claims: ["not_fabricated_subject", "not_fabricated_object"],
      }),
    });
  }

  const objectNodes = compact.slice(1);
  const objectParsed = applyConstructionPatterns(objectNodes);
  const objectLike = objectParsed.length === 1
    ? objectParsed[0]
    : (objectNodes.length === 1 ? objectNodes[0] : null);
  if (
    objectLike &&
    (nodeCanFillSlot(objectLike, "object") || nodeCanFillSlot(objectLike, "np") || nodeCanFillSlot(objectLike, "head_noun") || nodeCanFillSlot(objectLike, "subject"))
  ) {
    const children = [first, objectLike];
    return construction("TransitiveVP", "V+O", children, {
      note: "Transparent transitive VP used inside a clause relation.",
      trace: traceInfo("generative_template", {
        construction_type: "TransitiveVP",
        template_family: "generative_template",
        template: ["action_verb!", "object!"],
        assigned_slots: ["action_verb", "object"],
        relation_member_scope: true,
        reason: "The relation-member parser preserves an overt action verb and overt nominal object as one transparent VP.",
      }),
    });
  }
  return null;
}

function clauseRelationParsedChunk(nodes = [], options = {}) {
  const compact = withoutIgnorableSpaceText(nodes || []);
  if (!compact.length) return [];
  if (compact.length === 1 && compact[0] && compact[0].kind === "construction") return compact.slice();

  if (options.immediate_temporal_trigger && compact.some((node) => flattenSurface(node) === "見到")) {
    const immediatePredicate = clauseRelationActionVPFor(compact, options);
    if (immediatePredicate) return [immediatePredicate];
  }

  const parsed = applyConstructionPatterns(compact);
  if (parsed.some((node) => node && node.kind === "construction")) return parsed;

  if (nodeCanFillSlot(compact[0], "subject") && compact.length >= 2) {
    const subject = compact[0];
    const predicateNodes = compact.slice(1);
    let predicateChildren = applyConstructionPatterns(predicateNodes);
    if (!predicateChildren.some((node) => node && node.kind === "construction")) {
      const vp = clauseRelationActionVPFor(predicateNodes, options);
      if (vp) predicateChildren = [vp];
    }
    if (predicateChildren.some((node) => node && (node.kind === "construction" || nodeCanFillSlot(node, "predicate") || nodeCanFillSlot(node, "vp")))) {
      const children = [subject, ...predicateChildren];
      return [construction("SubjectPredicateClause", "Clause", children, {
        note: "Subject plus visible predicate material inside a typed clause relation.",
        trace: traceInfo("generative_template", {
          construction_type: "SubjectPredicateClause",
          template_family: "generative_template",
          template: ["subject!", "predicate!"],
          assigned_slots: ["subject", "predicate"],
          relation_member_scope: true,
          subject_status: "overt",
          reason: "The relation architecture groups an overt subject with its visible predicate while preserving every token and without inserting omitted material.",
        }),
      })];
    }
  }

  const vp = clauseRelationActionVPFor(compact, options);
  if (vp) return [vp];
  return parsed;
}

function clauseRelationLinkerClone(node, relationSubtype, side, semanticRole, relationId) {
  if (!node || node.kind !== "token") return node;
  const surface = flattenSurface(node);
  const label = surface === "一" ? "func" : (node.label || "func");
  return parserInactiveTokenClone(node, {
    label,
    pos: "function",
    syntax: `${node.syntax || "clause_relation_linker"} clause_relation_linker ${relationSubtype}_relation_linker`,
    slots: cleanSlots([...(node.slots || []), "clause_relation_linker", side === "left" ? "linker_left" : "linker_right"]),
    reason: `The overt linker ${surface} is owned by the local ${relationSubtype} clause relation on the ${side} side; no absent partner is inserted.`,
    trace_detail: {
      clause_relation_id: relationId,
      relation_subtype: relationSubtype,
      linker_side: side,
      linker_semantic_role: semanticRole,
      linker_ownership_status: "owned_by_local_clause_relation",
    },
  });
}

function clauseRelationMember(nodes = [], options = {}) {
  const raw = clauseRelationSegmentNodes(nodes);
  if (!raw.length) return null;
  const linkerSpecs = Array.isArray(options.linkers) ? options.linkers.slice().sort((a, b) => a.index - b.index) : [];
  const linkerByIndex = new Map(linkerSpecs.map((item) => [item.index, item]));
  const children = [];
  let chunk = [];
  const flushChunk = () => {
    if (!chunk.length) return;
    children.push(...clauseRelationParsedChunk(chunk, options));
    chunk = [];
  };

  raw.forEach((node, index) => {
    const spec = linkerByIndex.get(index);
    if (!spec) {
      if (node && node.kind === "token" && flattenSurface(node) === "仲" && !node.jyutping) {
        chunk.push(token("仲", {
          label: "how",
          jyutping: "zung6",
          syntax: "focus_adverb continuative_adverb",
          note: "still / furthermore; resolved locally inside a typed clause relation",
        }));
      } else {
        chunk.push(node);
      }
      return;
    }
    flushChunk();
    children.push(clauseRelationLinkerClone(node, options.relation_subtype, spec.side, spec.semantic_role, options.relation_id));
  });
  flushChunk();

  if (!children.length) return null;
  const firstClauseChild = children.find((child) => {
    if (!child) return false;
    if (child.kind === "token") return !(child.slots || []).includes("clause_relation_linker");
    return child.kind === "construction";
  }) || null;
  let overtSubject = null;
  if (firstClauseChild && firstClauseChild.kind === "token" && (firstClauseChild.slots || []).includes("subject")) {
    overtSubject = firstClauseChild;
  } else if (firstClauseChild && firstClauseChild.kind === "construction") {
    const subjectBearing = [
      "ClauseSpan",
      "NominalHeadSpan",
      "RelativeClauseNP",
      "OpinionStanceFrame",
      "CognitionContentFrame",
      "ReportedSpeech",
    ].includes(firstClauseChild.type);
    if (subjectBearing) {
      overtSubject = flattenNodes([firstClauseChild]).find((row) => row.kind === "token" && (row.slots || []).includes("subject")) || null;
    }
  }
  const childConstructions = children.filter((node) => node && node.kind === "construction").map((node) => node.type);
  return construction("ClauseRelationMemberSpan", options.role === "left" ? "Relation-L" : "Relation-R", children, {
    note: "Transparent source-order member of a typed clause relation. Linkers remain visible and carry explicit local ownership.",
    trace: traceInfo("generative_template", {
      construction_type: "ClauseRelationMemberSpan",
      template_family: "generative_template",
      template: ["clause_material!", "relation_linker?"],
      assigned_slots: [options.role === "left" ? "left_relation_member" : "right_relation_member"],
      relation_member_role: options.role,
      relation_subtype: options.relation_subtype,
      relation_subtype_provenance: "inherited_from_parent_clause_relation_edge",
      clause_relation_id: options.relation_id,
      independent_grammar_licensing: false,
      context_resolution_capability: false,
      overt_subject_surface: overtSubject ? overtSubject.surface : "",
      subject_status: overtSubject ? "overt" : "not_overt",
      child_constructions: childConstructions,
      source_surface: raw.map((node) => flattenSurface(node)).join(""),
      reason: "A relation member is grouped as one clause-like span while retaining source order, overt linkers, parsed predicate children, and visible subjects.",
      not_claims: ["not_fabricated_subject", "not_fabricated_clause", "not_hidden_linker"],
    }),
  });
}

function clauseRelationSubjectSurface(member) {
  if (!member || member.kind !== "construction") return "";
  const memberTrace = member.trace || {};
  return String(memberTrace.overt_subject_surface || "");
}

function clauseRelationSubjectLinkage(leftMember, rightMember, relationSubtype) {
  const left = clauseRelationSubjectSurface(leftMember);
  const right = clauseRelationSubjectSurface(rightMember);
  if (left && right) return { status: "overt_subject_on_both_members", inherited_surface: "" };
  if (left && !right && ["concessive", "committed_preference", "ordered_preference", "premise_response", "sequential", "asyndetic_sequence"].includes(relationSubtype)) {
    return { status: "shared_overt_subject_inherited_by_right_member", inherited_surface: left };
  }
  if (left && !right) return { status: "left_subject_overt_right_subject_unresolved", inherited_surface: "" };
  if (!left && right) return { status: "right_subject_overt_left_subject_unresolved", inherited_surface: "" };
  if (!left && !right) return { status: "no_overt_subject_unresolved", inherited_surface: "" };
  return { status: "overt_subject_on_both_members", inherited_surface: "" };
}

function clauseRelationPairStatus(leftLinkers = [], rightLinkers = [], licensedAsyndetic = false) {
  if (leftLinkers.length && rightLinkers.length) return "both_overt";
  if (leftLinkers.length) return "left_overt_right_absent";
  if (rightLinkers.length) return "left_absent_right_overt";
  return licensedAsyndetic ? "both_absent_licensed_asyndetic" : "not_applicable";
}

function clauseRelationSemanticTrace(subtype, sourceOrder, leftMember, rightMember) {
  const leftSurface = flattenSurface(leftMember);
  const rightSurface = flattenSurface(rightMember);
  if (subtype === "conditional") return {
    antecedent_clause: leftSurface,
    consequent_clause: rightSurface,
  };
  if (subtype === "causal") {
    const reasonOnLeft = sourceOrder !== "result_then_reason";
    return {
      reason_clause: reasonOnLeft ? leftSurface : rightSurface,
      result_clause: reasonOnLeft ? rightSurface : leftSurface,
      causal_source_order: sourceOrder,
    };
  }
  if (subtype === "concessive") return {
    concession_clause: leftSurface,
    counterexpectation_clause: rightSurface,
  };
  if (subtype === "committed_preference") return {
    chosen_option: leftSurface,
    rejected_option: rightSurface,
  };
  if (subtype === "ordered_preference") return {
    disfavored_option: leftSurface,
    preferred_option: rightSurface,
  };
  if (subtype === "premise_response") return {
    established_premise: leftSurface,
    response_clause: rightSurface,
  };
  if (["sequential", "asyndetic_sequence"].includes(subtype)) return {
    earlier_event: leftSurface,
    later_event: rightSurface,
  };
  if (subtype === "temporal_subordinate") return {
    temporal_subordinate: leftSurface,
    matrix_clause: rightSurface,
  };
  return {};
}

function buildClauseRelationEdge(spec = {}) {
  if (!CLAUSE_RELATION_SUBTYPE_REGISTRY.has(spec.relation_subtype)) return null;
  const relationId = `clause-relation:${spec.relation_subtype}:${clauseRelationSurfaceList(spec.left_nodes).join("")}:${clauseRelationSurfaceList(spec.right_nodes).join("")}`;
  const leftMember = clauseRelationMember(spec.left_nodes, {
    role: "left",
    relation_subtype: spec.relation_subtype,
    relation_id: relationId,
    linkers: spec.left_linkers || [],
    immediate_temporal_trigger: Boolean(spec.immediate_temporal_trigger),
  });
  const rightMember = clauseRelationMember(spec.right_nodes, {
    role: "right",
    relation_subtype: spec.relation_subtype,
    relation_id: relationId,
    linkers: spec.right_linkers || [],
  });
  if (!leftMember || !rightMember) return null;

  const subjectLinkage = clauseRelationSubjectLinkage(leftMember, rightMember, spec.relation_subtype);
  const pairStatus = clauseRelationPairStatus(spec.left_linkers || [], spec.right_linkers || [], Boolean(spec.licensed_asyndetic));
  const children = [leftMember, spec.separator, rightMember].filter(Boolean);
  const leftLinkerSurfaces = (spec.left_linkers || []).map((item) => flattenSurface(clauseRelationSegmentNodes(spec.left_nodes)[item.index]));
  const rightLinkerSurfaces = (spec.right_linkers || []).map((item) => flattenSurface(clauseRelationSegmentNodes(spec.right_nodes)[item.index]));

  return construction("ClauseRelationEdge", "ClauseRel", children, {
    note: "Typed local relation between two transparent clause-like members. The relation owns overt linkers and records optional-pair and shared-subject provenance without hidden tokens.",
    trace: traceInfo("generative_template", {
      construction_type: "ClauseRelationEdge",
      template_family: "generative_template",
      template: ["left_relation_member!", "separator?", "right_relation_member!"],
      assigned_slots: ["left_relation_member", ...(spec.separator ? ["separator"] : []), "right_relation_member"],
      clause_relation_id: relationId,
      relation_subtype: spec.relation_subtype,
      relation_subtype_provenance: spec.relation_subtype_provenance || "inherited_mapped_clause_relation_rule",
      relation_subtype_registry_status: "validated_against_clause_relation_subtype_registry",
      independent_grammar_licensing: false,
      relation_context_status: "context_not_required",
      source_order: spec.source_order || "left_then_right",
      linker_left: leftLinkerSurfaces,
      linker_right: rightLinkerSurfaces,
      linker_pair_status: pairStatus,
      linker_ownership_status: "all_overt_linkers_owned_once",
      subject_linkage_status: subjectLinkage.status,
      inherited_subject_surface: subjectLinkage.inherited_surface,
      ...clauseRelationSemanticTrace(spec.relation_subtype, spec.source_order || "left_then_right", leftMember, rightMember),
      immediate_temporal_trigger: Boolean(spec.immediate_temporal_trigger),
      asyndetic_license: spec.licensed_asyndetic ? spec.asyndetic_license || "licensed_by_event_order_and_visible_separator" : "not_applicable",
      surfaces: children.map((node) => flattenSurface(node)),
      reason: spec.reason || "Overt linker evidence or a constrained asyndetic event-order pattern licenses one local typed clause relation instead of a flat discourse wrapper.",
      not_claims: [
        "not_fabricated_linker",
        "not_fabricated_subject",
        "not_fabricated_clause",
        "not_punctuation_only_relation",
      ],
    }),
  });
}

function completionThenClauseRelation(nodes = []) {
  const compact = withoutIgnorableSpaceText(nodes || []);
  const markerIndex = compact.findIndex((node) =>
    node &&
    node.kind === "token" &&
    flattenSurface(node) === "就"
  );
  if (markerIndex <= 0 || markerIndex >= compact.length - 1) return null;

  let leftNodes = compact.slice(0, markerIndex);
  let rightNodes = compact.slice(markerIndex);
  let rightLinkerIndex = 0;
  const preMarkerSubject = compact[markerIndex - 1];
  const completionBeforePreMarkerSubject = hasConstruction(
    compact.slice(0, markerIndex - 1),
    "CompletionVP"
  );
  if (
    preMarkerSubject &&
    nodeCanFillSlot(preMarkerSubject, "subject") &&
    completionBeforePreMarkerSubject
  ) {
    leftNodes = compact.slice(0, markerIndex - 1);
    rightNodes = [preMarkerSubject, ...compact.slice(markerIndex)];
    rightLinkerIndex = clauseRelationSegmentNodes([preMarkerSubject]).length;
  }
  if (!hasConstruction(leftNodes, "CompletionVP")) return null;
  if (!rightNodes.slice(1).some((node) => flattenSurface(node))) return null;

  return buildClauseRelationEdge({
    relation_subtype: "sequential",
    left_nodes: leftNodes,
    right_nodes: rightNodes,
    right_linkers: [{
      index: rightLinkerIndex,
      side: "right",
      semantic_role: "later_event_linker",
    }],
    source_order: "earlier_completion_then_later_event",
    relation_subtype_provenance: "source_linked_completion_sequence_rule",
    reason: "An overt CompletionVP before 就 and a nonempty later member license a sequential relation; each member retains its own visible subject and predicate structure.",
  });
}

function clauseRelationTimeHead(node) {
  const rows = flattenNodes([node]);
  return rows.some((row) => row.kind === "token" && ["時候", "時間"].includes(row.surface || ""));
}

function clauseRelationMarkerSpec(nodes, surface, side, semanticRole, start = 0) {
  const index = clauseRelationSurfaceIndex(nodes, [surface], start);
  return index >= 0 ? { index, side, semantic_role: semanticRole } : null;
}

function clauseRelationPrefixEmbedding(prefixNodes = [], relation = null) {
  const prefix = withoutIgnorableSpaceText(prefixNodes || []);
  if (!prefix.length || !relation) return null;
  return opinionStanceFrameFallback([...prefix, relation])
    || cognitionContentFrameFallback([...prefix, relation])
    || reportedSpeechFrameFallback([...prefix, relation]);
}

function hierarchicalClauseRelationEdgeFromChildren(children = []) {
  const segments = clauseSequenceSegments(children);
  if (segments.length !== 2) return null;
  const separator = children.find(isClauseSequenceSeparator) || null;
  const leftRaw = clauseRelationSegmentNodes(segments[0]);
  const rightRaw = clauseRelationSegmentNodes(segments[1]);
  if (!leftRaw.length || !rightRaw.length) return null;

  let prefix = [];
  let leftNodes = leftRaw.slice();
  let relationSubtype = "";
  let sourceOrder = "left_then_right";
  let licensedAsyndetic = false;
  let asyndeticLicense = "";
  let immediateTemporalTrigger = false;
  const leftLinkers = [];
  const rightLinkers = [];

  const leftIf = clauseRelationSurfaceIndex(leftNodes, ["如果"]);
  const leftZi = clauseRelationSurfaceIndex(leftNodes, ["只"]);
  const leftJiu = clauseRelationSurfaceIndex(leftNodes, ["要"]);
  const leftHave = clauseRelationSurfaceIndex(leftNodes, ["有"]);
  const leftNing = clauseRelationSurfaceIndex(leftNodes, ["寧"]);
  const leftJyun = clauseRelationSurfaceIndex(leftNodes, ["願"]);
  const leftGei = clauseRelationSurfaceIndex(leftNodes, ["既"]);
  const leftJin = clauseRelationSurfaceIndex(leftNodes, ["然"]);
  const leftBecause = clauseRelationSurfaceIndex(leftNodes, ["因為"]);
  const leftAlthough = clauseRelationSurfaceIndex(leftNodes, ["雖然"]);
  const rightBecause = clauseRelationSurfaceIndex(rightRaw, ["因為"]);
  const rightSo = clauseRelationSurfaceIndex(rightRaw, ["所以"]);
  const rightBut = clauseRelationSurfaceIndex(rightRaw, ["但係", "不過"]);
  const rightThen = clauseRelationSurfaceIndex(rightRaw, ["然後", "再"]);
  const leftFirst = clauseRelationSurfaceIndex(leftNodes, ["先"]);
  const rightConditional = clauseRelationSurfaceIndex(rightRaw, ["就"]);
  const rightNecessary = clauseRelationSurfaceIndex(rightRaw, ["先至", "先"]);
  const rightDou = clauseRelationSurfaceIndex(rightRaw, ["都"]);
  const rightM4 = clauseRelationSurfaceIndex(rightRaw, ["唔"]);
  const rightM4Hou2 = clauseRelationSurfaceIndex(rightRaw, ["唔好"]);
  const rightSoeng2 = clauseRelationSurfaceIndex(rightRaw, ["想"]);
  const rightHang2 = clauseRelationSurfaceIndex(rightRaw, ["肯"]);
  const rightGam2 = clauseRelationSurfaceIndex(rightRaw, ["噉", "咁"]);
  const rightBat1Jyu4 = clauseRelationSurfaceIndex(rightRaw, ["不如"]);
  const rightDang2 = clauseRelationSurfaceIndex(rightRaw, ["等"]);
  const rightNgo5AfterDang2 = rightDang2 >= 0
    ? clauseRelationSurfaceIndex(rightRaw, ["我"], rightDang2 + 1)
    : -1;
  const rejectionMarkerIndexes = rightM4Hou2 === rightDou + 1
    ? [rightDou, rightM4Hou2]
    : (
      rightM4 === rightDou + 1 && (rightSoeng2 === rightM4 + 1 || rightHang2 === rightM4 + 1)
        ? [rightDou, rightM4, rightSoeng2 === rightM4 + 1 ? rightSoeng2 : rightHang2]
        : []
    );
  const committedPreferenceProfile =
    leftNing >= 0 &&
    leftJyun === leftNing + 1 &&
    rejectionMarkerIndexes.length > 0 &&
    leftNodes.some((node, index) => index !== leftNing && index !== leftJyun && flattenSurface(node)) &&
    rightRaw.some((node, index) => !rejectionMarkerIndexes.includes(index) && flattenSurface(node));
  let premiseResponseMarkerIndexes = [];
  let premiseResponseMarkerProfile = "unmarked";
  if (rightConditional === 0) {
    premiseResponseMarkerIndexes = [rightConditional];
    premiseResponseMarkerProfile = "zau6";
  } else if (rightGam2 === 0) {
    premiseResponseMarkerIndexes = [rightGam2];
    premiseResponseMarkerProfile = "gam2";
  } else if (rightBat1Jyu4 === 0) {
    premiseResponseMarkerIndexes = [rightBat1Jyu4];
    premiseResponseMarkerProfile = "bat1jyu4";
  } else if (rightDang2 === 0 && rightNgo5AfterDang2 === 1) {
    premiseResponseMarkerIndexes = [rightDang2, rightNgo5AfterDang2];
    premiseResponseMarkerProfile = "dang2ngo5";
  }
  const premiseResponseProfile =
    leftGei === 0 &&
    leftJin === 1 &&
    leftNodes.some((node, index) => index !== leftGei && index !== leftJin && flattenSurface(node)) &&
    rightRaw.some((node, index) => !premiseResponseMarkerIndexes.includes(index) && flattenSurface(node));
  const necessaryConditionLeftContent = leftNodes
    .slice(leftHave + 1)
    .flatMap((node) => clauseRelationLeafNodes(node));
  const necessaryConditionHasPredicateOrFrame = necessaryConditionLeftContent.some((node) => {
    if (!node || node.kind !== "token") return false;
    const slots = nodeSlots(node);
    return slots.some((slot) => [
      "action_verb",
      "comment_predicate",
      "copula",
      "coverb_marker",
      "existential",
      "locative_marker",
      "main_verb",
      "modal",
      "negated_existential",
      "predicate",
      "stative_predicate",
    ].includes(slot));
  });
  const sufficientConditionProfile =
    leftZi === 0 &&
    leftJiu === leftZi + 1 &&
    rightConditional >= 0 &&
    leftNodes.some((node, index) => index !== leftZi && index !== leftJiu && flattenSurface(node)) &&
    rightRaw.some((node, index) => index !== rightConditional && flattenSurface(node));
  const necessaryResultPrefix = rightNecessary > 0
    ? parsedClauseNodes(rightRaw.slice(0, rightNecessary))
    : [];
  const necessaryResultPrefixNode = necessaryResultPrefix.length === 1
    ? necessaryResultPrefix[0]
    : null;
  const necessaryResultMarkerPositionLicensed =
    rightNecessary === 0 ||
    (
      necessaryResultPrefixNode &&
      (
        nodeCanFillSlot(necessaryResultPrefixNode, "subject") ||
        nodeCanFillSlot(necessaryResultPrefixNode, "np") ||
        nodeCanFillSlot(necessaryResultPrefixNode, "head_noun") ||
        nodeCanFillSlot(necessaryResultPrefixNode, "topic")
      )
    );
  const necessaryConditionProfile =
    leftZi >= 0 &&
    leftHave === leftZi + 1 &&
    rightNecessary >= 0 &&
    necessaryResultMarkerPositionLicensed &&
    necessaryConditionHasPredicateOrFrame &&
    leftNodes.some((node, index) => index !== leftZi && index !== leftHave && flattenSurface(node)) &&
    rightRaw.some((node, index) => index !== rightNecessary && flattenSurface(node));
  let relationProfile = "";
  let relationResearchId = "";
  let relationProfileScope = "";
  const leftImmediateOne = clauseRelationSurfaceIndex(leftNodes, ["一"]);
  const leftSurfaces = clauseRelationSurfaceList(leftNodes);
  const rightSurfaces = clauseRelationSurfaceList(rightRaw);
  const leftHasImmediatePredicate = leftSurfaces.includes("見到") || (leftSurfaces.includes("見") && leftSurfaces.includes("到"));
  const leftTemporalNominal = leftNodes.length === 1 && leftNodes[0].kind === "construction" && leftNodes[0].type === "RelativeClauseNP" && clauseRelationTimeHead(leftNodes[0]);

  if (premiseResponseProfile) {
    relationSubtype = "premise_response";
    relationProfile = "established_premise_response";
    relationResearchId = "PRQ2-009";
    relationProfileScope = "left_initial_gei3jin4_with_overt_premise_and_response";
    leftLinkers.push(
      { index: leftGei, side: "left", semantic_role: "established_premise_marker_component" },
      { index: leftJin, side: "left", semantic_role: "established_premise_marker_component" }
    );
    for (const index of premiseResponseMarkerIndexes) {
      rightLinkers.push({ index, side: "right", semantic_role: "response_marker_component" });
    }
  } else if (committedPreferenceProfile) {
    relationSubtype = "committed_preference";
    relationProfile = "rejection";
    relationResearchId = "PRQ2-015";
    relationProfileScope = "overt_ning4jyun6_and_negative_dou1_continuation_only";
    leftLinkers.push(
      { index: leftNing, side: "left", semantic_role: "chosen_option_marker_component" },
      { index: leftJyun, side: "left", semantic_role: "chosen_option_marker_component" }
    );
    for (const index of rejectionMarkerIndexes) {
      rightLinkers.push({ index, side: "right", semantic_role: "rejected_option_marker_component" });
    }
  } else if (leftTemporalNominal) {
    relationSubtype = "temporal_subordinate";
  } else if (leftBecause >= 0 || rightBecause >= 0 || rightSo >= 0) {
    relationSubtype = "causal";
    if (leftBecause >= 0) leftLinkers.push({ index: leftBecause, side: "left", semantic_role: "reason_introducer" });
    if (rightSo >= 0) rightLinkers.push({ index: rightSo, side: "right", semantic_role: "result_linker" });
    if (rightBecause >= 0) {
      rightLinkers.push({ index: rightBecause, side: "right", semantic_role: "reason_introducer" });
      sourceOrder = "result_then_reason";
    }
  } else if (leftAlthough >= 0 || rightBut >= 0) {
    relationSubtype = "concessive";
    if (leftAlthough >= 0) leftLinkers.push({ index: leftAlthough, side: "left", semantic_role: "concession_introducer" });
    if (rightBut >= 0) rightLinkers.push({ index: rightBut, side: "right", semantic_role: "counterexpectation_linker" });
  } else if (necessaryConditionProfile) {
    relationSubtype = "conditional";
    relationProfile = "necessary_condition";
    relationResearchId = "PRQ2-014";
    relationProfileScope = "overt_left_marker_with_predicate_or_frame_and_overt_right_linker_only";
    leftLinkers.push(
      { index: leftZi, side: "left", semantic_role: "necessary_condition_marker_component" },
      { index: leftHave, side: "left", semantic_role: "necessary_condition_marker_component" }
    );
    rightLinkers.push({ index: rightNecessary, side: "right", semantic_role: "necessary_result_linker" });
  } else if (sufficientConditionProfile) {
    relationSubtype = "conditional";
    relationProfile = "sufficient_condition";
    relationResearchId = "PRQ2-008";
    relationProfileScope = "left_initial_overt_marker_and_overt_right_linker_only";
    leftLinkers.push(
      { index: leftZi, side: "left", semantic_role: "sufficient_condition_marker_component" },
      { index: leftJiu, side: "left", semantic_role: "sufficient_condition_marker_component" }
    );
    rightLinkers.push({ index: rightConditional, side: "right", semantic_role: "consequent_linker" });
  } else if (leftImmediateOne >= 0 && leftHasImmediatePredicate) {
    relationSubtype = "temporal_subordinate";
    immediateTemporalTrigger = true;
    leftLinkers.push({ index: leftImmediateOne, side: "left", semantic_role: "immediate_temporal_trigger" });
    if (rightConditional >= 0) rightLinkers.push({ index: rightConditional, side: "right", semantic_role: "result_linker" });
  } else if (leftHasImmediatePredicate && rightConditional >= 0) {
    relationSubtype = "temporal_subordinate";
    immediateTemporalTrigger = true;
    rightLinkers.push({ index: rightConditional, side: "right", semantic_role: "result_linker" });
  } else if (leftIf >= 0 || rightConditional >= 0) {
    relationSubtype = "conditional";
    if (leftIf >= 0) {
      if (leftIf > 0) {
        prefix = leftNodes.slice(0, leftIf);
        leftNodes = leftNodes.slice(leftIf);
      }
      leftLinkers.push({ index: 0, side: "left", semantic_role: "condition_introducer" });
    }
    const adjustedRightConditional = clauseRelationSurfaceIndex(rightRaw, ["就"]);
    if (adjustedRightConditional >= 0) rightLinkers.push({ index: adjustedRightConditional, side: "right", semantic_role: "consequent_linker" });
  } else if (leftFirst >= 0 || rightThen >= 0 || leftSurfaces.includes("完")) {
    relationSubtype = leftFirst < 0 && rightThen < 0 ? "asyndetic_sequence" : "sequential";
    if (leftFirst >= 0) leftLinkers.push({ index: leftFirst, side: "left", semantic_role: "earlier_event_marker" });
    if (rightThen >= 0) rightLinkers.push({ index: rightThen, side: "right", semantic_role: "later_event_marker" });
    if (relationSubtype === "asyndetic_sequence") {
      licensedAsyndetic = true;
      asyndeticLicense = "left_completion_event_plus_following_event";
    } else if (leftFirst >= 0 && rightThen < 0) {
      licensedAsyndetic = true;
      asyndeticLicense = "overt_left_sequence_marker_with_omitted_right_marker";
    }
  }

  if (!relationSubtype) return null;
  if (immediateTemporalTrigger) {
    leftNodes = leftNodes.map((node) => node && node.kind === "token" ? token(flattenSurface(node)) : node);
  }
  const relation = buildClauseRelationEdge({
    relation_subtype: relationSubtype,
    left_nodes: leftNodes,
    right_nodes: rightRaw,
    left_linkers: leftLinkers,
    right_linkers: rightLinkers,
    separator,
    source_order: sourceOrder,
    licensed_asyndetic: licensedAsyndetic,
    asyndetic_license: asyndeticLicense,
    immediate_temporal_trigger: immediateTemporalTrigger,
    relation_subtype_provenance: "inherited_mapped_hierarchical_clause_relation_rule",
  });
  if (!relation) return null;
  if (relationProfile) {
    relation.trace = {
      ...(relation.trace || {}),
      relation_profile: relationProfile,
      research_id: relationResearchId,
      relation_profile_scope: relationProfileScope,
      ...(relationSubtype === "premise_response" ? {
        response_marker_profile: premiseResponseMarkerProfile,
      } : {}),
    };
  }

  if (prefix.length) {
    const embedded = clauseRelationPrefixEmbedding(prefix, relation);
    if (embedded) return { node: embedded, relation, embedded: true };
    return null;
  }

  const wrapperCoverage = {
    status: "PASS",
    policy: "A hierarchical ClauseRelationGraph accounts for its complete local ClauseRelationEdge child; the separator and overt linkers remain visible inside that typed relation.",
    accounted_children: [{ surface: flattenSurface(relation), construction: "ClauseRelationEdge", role: "local_typed_relation" }],
    accounted_linkers: [],
    accounted_separators: separator ? [{ surface: flattenSurface(separator), role: "nested_visible_separator" }] : [],
    unaccounted_tokens: [],
    unaccounted_wrapper_token_count: 0,
  };
  const wrapper = construction("ClauseRelationGraph", "ClauseLink", [relation], {
    note: "Outer discourse wrapper containing one local typed clause relation. It preserves the established wrapper boundary without flattening relation semantics.",
    trace: traceInfo("governed_discourse_wrapper", {
      rule: "hierarchical typed clause relation under discourse wrapper",
      reason: "The outer wrapper remains for discourse/root accounting, while ClauseRelationEdge represents the typed local relation.",
      child_constructions: ["ClauseRelationEdge"],
      local_relation_construction: "ClauseRelationEdge",
      graph_container_semantic_status: "neutral_container_only",
      independent_grammar_licensing: false,
      relation_semantics_source: "typed_child_edge_with_inherited_subtype_provenance",
      clause_linking_subtype: ["committed_preference", "premise_response"].includes(relationSubtype)
        ? relationSubtype
        : (relationProfile || relationSubtype),
      relation_subtype: relationSubtype,
      ...(relationProfile ? {
        relation_profile: relationProfile,
        research_id: relationResearchId,
        relation_profile_scope: relationProfileScope,
        ...(relationSubtype === "premise_response" ? {
          response_marker_profile: premiseResponseMarkerProfile,
        } : {}),
      } : {}),
      linkers: [...(relation.trace && relation.trace.linker_left || []), ...(relation.trace && relation.trace.linker_right || [])],
      separators: separator ? [flattenSurface(separator)] : [],
      wrapper_coverage: wrapperCoverage,
    }),
  });
  return { node: wrapper, relation, embedded: false };
}

function standaloneClauseRelationEdgeFragmentForTerminal(segment = [], terminalText = "") {
  if (!/[。！？.!?]/u.test(String(terminalText || ""))) return null;
  const compact = withoutIgnorableSpaceText(segment || []);
  if (compact.length < 2 || compact[0].kind !== "token") return null;
  const surface = flattenSurface(compact[0]);
  const subtypeBySurface = {
    "然後": "sequential",
    "再": "sequential",
    "但係": "concessive",
    "不過": "concessive",
    "所以": "causal",
    "因為": "causal",
    "如果": "conditional",
    "雖然": "concessive",
    "就": "conditional",
  };
  const relationSubtype = subtypeBySurface[surface];
  if (!relationSubtype) return null;
  const relationId = `clause-relation-fragment:${relationSubtype}:${compact.map((node) => flattenSurface(node)).join("")}`;
  const missingSide = ["因為", "如果", "雖然"].includes(surface) ? "right_relation_member" : "left_relation_member";
  const semanticRole = surface === "因為" ? "reason_introducer"
    : surface === "如果" ? "condition_introducer"
      : surface === "雖然" ? "concession_introducer"
        : surface === "所以" ? "result_linker"
          : ["但係", "不過"].includes(surface) ? "counterexpectation_linker"
            : ["然後", "再"].includes(surface) ? "later_event_marker"
              : "consequent_linker";
  const member = clauseRelationMember(compact, {
    role: missingSide === "left_relation_member" ? "right" : "left",
    relation_subtype: relationSubtype,
    relation_id: relationId,
    linkers: [{ index: 0, side: missingSide === "left_relation_member" ? "right" : "left", semantic_role: semanticRole }],
  });
  if (!member) return null;
  return construction("NeedsContext", "needs context", [member], {
    note: "Standalone relation fragment with an overt linker but no visible relation partner.",
    trace: traceInfo("special_ambiguity_rule", {
      fragment_subtype: "standalone_clause_relation_fragment",
      relation_subtype: relationSubtype,
      clause_relation_id: relationId,
      relation_context_status: "context_required",
      context_requirement_status: "context_required",
      antecedent_status: "not_observed",
      missing_argument_slots: [missingSide],
      missing_slot_details: [{ slot: missingSide, license_status: "unresolved" }],
      overt_linker_surface: surface,
      linker_ownership_status: "owned_by_incomplete_local_relation",
      discourse_license_not_observed: true,
      semantic_review_flags: ["standalone_relation_partner_missing", "context_required_unresolved"],
      reason: "The overt linker requires a prior or following relation partner that is absent from the visible sentence. The following clause/VP remains transparent and no partner is fabricated.",
      not_claims: ["not_ignored_linker", "not_fabricated_relation_partner", "not_clean_context_free_clause"],
    }),
  });
}

function clauseSequenceSegments(nodes = []) {
  const segments = [];
  let current = [];
  for (const node of nodes || []) {
    if (isClauseSequenceSeparator(node)) {
      if (withoutIgnorableSpaceText(current).length) segments.push(withoutIgnorableSpaceText(current));
      current = [];
    } else {
      current.push(node);
    }
  }
  if (withoutIgnorableSpaceText(current).length) segments.push(withoutIgnorableSpaceText(current));
  return segments;
}

function wrapClauseSequenceByPunctuation(nodes) {
  const hasSeparator = nodes.some(isClauseSequenceSeparator);
  if (!hasSeparator) return nodes;

  const finalOnly = nodes.length > 0 && isClauseSequenceTerminal(nodes[nodes.length - 1]) ? nodes[nodes.length - 1] : null;
  const children = finalOnly ? nodes.slice(0, -1) : nodes.slice();

  const separatorIndex = children.findIndex(isClauseSequenceSeparator);
  if (separatorIndex >= 0) {
    const linkerOnlySide = (side) => {
      const meaningfulSide = side.filter((node) => node && node.kind !== "text");
      return meaningfulSide.length === 1
        && CLAUSE_LINKER_SURFACES.has(flattenSurface(meaningfulSide[0]));
    };
    if (linkerOnlySide(children.slice(0, separatorIndex)) || linkerOnlySide(children.slice(separatorIndex + 1))) {
      return nodes;
    }
  }
  const orderedPreferenceOpenerIndex = children.findIndex((node, index) =>
    index < separatorIndex &&
    node &&
    node.kind === "token" &&
    (node.surface || "") === "與其"
  );
  const rightLeaves = separatorIndex >= 0
    ? clauseRelationSegmentNodes(children.slice(separatorIndex + 1))
    : [];
  if (orderedPreferenceOpenerIndex >= 0 && separatorIndex > orderedPreferenceOpenerIndex && rightLeaves.length > 1) {
    if (surfaceOf(rightLeaves[0]) === "不如") {
      const preferredMember = parsedClauseNodes(rightLeaves.slice(1));
      const disfavoredMember = children.slice(orderedPreferenceOpenerIndex + 1, separatorIndex);
      const prefix = children.slice(0, orderedPreferenceOpenerIndex);
      if (
        meaningfulClauseConstructionCount(disfavoredMember) >= 1 &&
        meaningfulClauseConstructionCount(preferredMember) >= 1
      ) {
        const leftNodes = [
          ...prefix,
          children[orderedPreferenceOpenerIndex],
          ...disfavoredMember,
        ];
        const rightNodes = [
          rightLeaves[0],
          ...preferredMember,
        ];
        const leftLinkerIndex = clauseRelationSegmentNodes(prefix).length;
        const relation = buildClauseRelationEdge({
          relation_subtype: "ordered_preference",
          left_nodes: leftNodes,
          right_nodes: rightNodes,
          left_linkers: [{
            index: leftLinkerIndex,
            side: "left",
            semantic_role: "disfavored_option_introducer",
          }],
          right_linkers: [{
            index: 0,
            side: "right",
            semantic_role: "preferred_option_introducer",
          }],
          separator: children[separatorIndex],
          source_order: "disfavored_then_preferred",
          relation_subtype_provenance: "inherited_mapped_hierarchical_clause_relation_rule",
          reason: "The overt 與其 and 不如 pair orders two nonempty alternatives; the typed edge retains both members, owns both markers, and records which option is disfavored and which is preferred.",
        });
        if (relation) {
          const wrapperCoverage = {
            status: "PASS",
            policy: "A hierarchical ClauseRelationGraph accounts for its complete local ClauseRelationEdge child; the separator and overt linkers remain visible inside that typed relation.",
            accounted_children: [{ surface: flattenSurface(relation), construction: "ClauseRelationEdge", role: "local_typed_relation" }],
            accounted_linkers: [],
            accounted_separators: [{ surface: flattenSurface(children[separatorIndex]), role: "nested_visible_separator" }],
            unaccounted_tokens: [],
            unaccounted_wrapper_token_count: 0,
          };
          const wrapper = construction("ClauseRelationGraph", "ClauseLink", [relation], {
            note: "Outer discourse wrapper containing the overt paired ordered-preference relation.",
            trace: traceInfo("governed_discourse_wrapper", {
              rule: "與其...不如 ordered-preference clause-linking sequence",
              reason: "The outer wrapper preserves discourse/root accounting while the typed child edge owns the paired markers and alternative-order semantics.",
              child_constructions: ["ClauseRelationEdge"],
              local_relation_construction: "ClauseRelationEdge",
              graph_container_semantic_status: "neutral_container_only",
              independent_grammar_licensing: false,
              relation_semantics_source: "typed_child_edge_with_inherited_subtype_provenance",
              relation_subtype: "ordered_preference",
              linkers: [...(relation.trace && relation.trace.linker_left || []), ...(relation.trace && relation.trace.linker_right || [])],
              separators: [flattenSurface(children[separatorIndex])],
              wrapper_coverage: wrapperCoverage,
              clause_linking_subtype: "ordered_preference",
              marker_profile: "jyu5kei4_bat1jyu4",
              research_id: "PRQ2-013",
            }),
          });
          return [wrapper, ...(finalOnly ? [finalOnly] : [])];
        }
      }
    }
  }

  const hierarchicalRelation = hierarchicalClauseRelationEdgeFromChildren(children);
  if (hierarchicalRelation && hierarchicalRelation.node) {
    return [hierarchicalRelation.node, ...(finalOnly ? [finalOnly] : [])];
  }

  const meaningful = children.filter(isClauseSequenceMeaningfulNode);
  if (meaningful.length < 2) return nodes;

  const conditionalChildIndex = children.findIndex((node) => node && node.kind === "construction" && node.type === "ConditionalClause");
  if (conditionalChildIndex >= 0) {
    const separatorAfterCondition = children.findIndex((node, index) => index > conditionalChildIndex && isClauseSequenceSeparator(node));
    const resultChild = children.find((node, index) => index > separatorAfterCondition && node && node.kind === "construction");
    if (separatorAfterCondition >= 0 && resultChild) {
      const conditional = children[conditionalChildIndex];
      conditional.trace = {
        ...(conditional.trace || {}),
        context_requirement_status: "context_licensed",
        missing_argument_slots: [],
        missing_slot_details: [{ slot: "result_clause", license_status: "licensed", licensed_by: "following_result_clause" }],
        result_clause_status: "overt_following_clause",
        result_construction: resultChild.type,
        not_claims: Array.from(new Set([...(conditional.trace && conditional.trace.not_claims || []), "not_standalone_incomplete_condition"])),
      };
    }
  }
  const wrapperCoverage = clauseLinkingWrapperCoverage(children);
  const topicChainTrace = applyTopicChainNullObjectLinkage(children);
  return [
    construction("ClauseRelationGraph", topicChainTrace && topicChainTrace.topic_chain_status === "licensed_overt_topic_chain" ? "TopicChain" : "ClauseLink", children, {
      note: topicChainTrace && topicChainTrace.topic_chain_status === "licensed_overt_topic_chain"
        ? "Topic chain: one overt recoverable topic supplies the understood object/domain of later linked predicates without hidden tokens."
        : "Linked clauses. This governed discourse/coordination wrapper preserves all child constructions and explicitly accounts for linker/separator material; it does not replace or flatten the child clauses.",
      trace: traceInfo("governed_discourse_wrapper", {
        rule: "comma-separated clause-linking sequence",
        reason: "Native speech often links short clauses or discourse units with comma-like punctuation. Add a parent wrapper only when at least two meaningful clause-like constructions are separated by visible punctuation; do not model this as a phrase-internal generative template, and do not hide unaccounted wrapper holes.",
        graph_container_semantic_status: "neutral_container_only",
        independent_grammar_licensing: false,
        relation_semantics_source: "none_or_preexisting_discourse_linkage_only",
        child_constructions: children
          .filter((node) => node && node.kind === "construction")
          .map((node) => node.type),
        linkers: clauseLinkerInventory(children),
        separators: children
          .filter(isClauseSequenceSeparator)
          .map((node) => node.text),
        ...(conditionalChildIndex >= 0 ? { clause_linking_subtype: "condition_result", condition_construction: "ConditionalClause" } : {}),
        ...(topicChainTrace ? { clause_linking_subtype: topicChainTrace.topic_chain_status === "licensed_overt_topic_chain" ? "topic_chain_null_object" : "topic_chain_compatibility_review", ...topicChainTrace } : {}),
        wrapper_coverage: wrapperCoverage,
      })
    }),
    ...(finalOnly ? [finalOnly] : []),
  ];
}

function clauseSequenceHasVisiblePunctuation(node) {
  if (!node || node.kind !== "construction" || (node.type !== "ClauseSequence" && node.type !== "ClauseRelationGraph")) return false;
  const traceSeparators = node.trace && Array.isArray(node.trace.separators) ? node.trace.separators : [];
  if (traceSeparators.length) return true;
  return (node.children || []).some(isClauseSequenceSeparator);
}

function shouldCollapseClauseSequenceForDisplay(node, options = {}) {
  // Kept for compatibility with older ClauseSequence diagnostics. v0.5.59 does not
  // collapse ClauseRelationGraph by default, because the parent wrapper is part
  // of the visual accounting for linker/separator material.
  if (!node || node.kind !== "construction" || node.type !== "ClauseSequence") return false;
  if (options && options.showDiagnostics) return false;
  return clauseSequenceHasVisiblePunctuation(node);
}

function shouldCollapseGreedyWrapperForDisplay(node, options = {}) {
  if (!node || node.kind !== "construction") return false;
  if (options && options.showDiagnostics) return false;
  return node.type === "ModalANotAQuestion";
}

  return {
    connectorAwareClauseLinkingForTerminal,
    completionThenClauseRelation, standaloneClauseRelationEdgeFragmentForTerminal,
    clauseRelationSurfaceIndex, clauseRelationParsedChunk, clauseSequenceSegments,
    wrapClauseSequenceByPunctuation, shouldCollapseClauseSequenceForDisplay,
    shouldCollapseGreedyWrapperForDisplay,
  };
};
