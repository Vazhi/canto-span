"use strict";

module.exports = function createDetectors(dependencies = {}) {
  const {
    categorySubspanFor, cleanSlots, construction, flattenSurface, isToken, nodeCanFillSlot, parserInactiveTokenClone, stringIncludesAny, traceInfo, withoutIgnorableSpaceText, withoutTrailingParticles
  } = dependencies;

function nominalPredicateSubjectFromNodes(nodes = []) {
  const compact = withoutIgnorableSpaceText(nodes || []);
  if (!compact.length) return null;
  if (compact.length === 1) {
    const only = compact[0];
    if (nodeCanFillSlot(only, "subject")
        || nodeCanFillSlot(only, "np")
        || nodeCanFillSlot(only, "head_noun")
        || nodeCanFillSlot(only, "location")) return only;
    return null;
  }
  const templated = categorySubspanFor(compact, [
    "OvertHeadDemonstrativeClassifierNP",
    "QuantifiedClassifierNP",
    "QuantifiedPersonNP",
    "DiMarkedNP",
    "OrdinalClassifierNP",
    "ClassifierObjectNP",
    "ModifiedNP",
    "NominalHeadSpan",
    "CoordinatedNP",
  ]);
  if (!templated) return null;
  if (!nodeCanFillSlot(templated, "subject")
      && !nodeCanFillSlot(templated, "np")
      && !nodeCanFillSlot(templated, "head_noun")
      && !nodeCanFillSlot(templated, "location")) return null;
  return templated;
}

function nominalPredicateTokens(node) {
  if (!node) return [];
  if (node.kind === "token") return [node];
  if (node.kind === "construction") return (node.children || []).flatMap(nominalPredicateTokens);
  return [];
}

function nominalPredicateSubjectClass(node) {
  const tokens = nominalPredicateTokens(node || {});
  if (tokens.some((item) => item.label === "who")) return "person";
  if (tokens.some((item) => item.label === "when")) return "time";
  if (nodeCanFillSlot(node, "location") || tokens.some((item) => item.label === "where")) return "location";
  const areaCompatibleSyntax = ["house_noun", "interior_location", "building_shop", "room_noun", "property_noun"];
  if (tokens.some((item) => stringIncludesAny(String(item.syntax || ""), areaCompatibleSyntax))) return "area_measurable_nominal";
  return "nominal";
}

function nominalPredicateQuantityClone(node, constructionType) {
  return parserInactiveTokenClone(node, {
    label: "how",
    pos: "numeral",
    syntax: "quantity count_value nominal_predicate_quantity",
    slots: ["quantity", "count_value"],
    reason: `The visible numeral contributes the measured value inside ${constructionType}, rather than acting as a property predicate.`,
    active_affordance_match: { role: "how", slot: "quantity", source: "construction_override" },
  });
}

function nominalPredicateUnitClone(node, domain) {
  const surface = flattenSurface(node);
  if (domain === "price") {
    return parserInactiveTokenClone(node, {
      label: "what",
      pos: "noun",
      syntax: "currency_unit nominal_measure_unit price_measure_unit",
      slots: ["currency_unit", "nominal_measure_unit", "measure_unit"],
      reason: `${surface} is the overt currency unit in a restricted price nominal predicate.`,
      active_affordance_match: { role: "what", slot: "currency_unit", source: "construction_override" },
    });
  }
  return parserInactiveTokenClone(node, {
    label: "measure_word",
    pos: "measure",
    syntax: domain === "age"
      ? "age_unit nominal_measure_unit"
      : domain === "area"
        ? "measure_unit area_measure_unit nominal_measure_unit"
        : "measure_unit length_measure_unit nominal_measure_unit",
    slots: domain === "age"
      ? ["age_unit", "nominal_measure_unit", "measure_unit"]
      : domain === "area"
        ? ["measure_unit", "area_measure_unit", "nominal_measure_unit"]
        : ["measure_unit", "length_measure_unit", "nominal_measure_unit"],
    reason: `${surface} is the overt ${domain} unit inside a restricted copula-less nominal predicate.`,
    active_affordance_match: {
      role: "measure_word",
      slot: domain === "age" ? "age_unit" : domain === "area" ? "area_measure_unit" : "length_measure_unit",
      source: "construction_override",
    },
  });
}

function nominalPredicateDimensionClone(node) {
  return parserInactiveTokenClone(node, {
    label: "like",
    pos: "stative",
    syntax: "stative_predicate scalar_dimension_predicate length_dimension_predicate",
    slots: ["dimension_predicate", "stative_predicate", "predicate"],
    reason: "The overt dimensional predicate identifies the measured dimension and remains distinct from the numeric value and unit.",
    active_affordance_match: { role: "like", slot: "dimension_predicate", source: "construction_override" },
  });
}

function nominalMeasurePredicateFallback(core) {
  const { core: bareCore, particles } = withoutTrailingParticles(core);
  const compact = withoutIgnorableSpaceText(bareCore);
  if (compact.length < 3) return null;
  if (compact.some((node) => isToken(node, "係") || isToken(node, "喺"))) return null;

  let unitIndex = -1;
  let domain = "";
  for (let index = 1; index < compact.length; index++) {
    const node = compact[index];
    if (nodeCanFillSlot(node, "age_unit")) {
      unitIndex = index;
      domain = "age";
      break;
    }
    if (isToken(node, "蚊")) {
      unitIndex = index;
      domain = "price";
      break;
    }
    if (nodeCanFillSlot(node, "measure_unit")) {
      unitIndex = index;
      domain = nodeCanFillSlot(node, "area_measure_unit") ? "area_or_length" : "length";
      break;
    }
  }
  if (unitIndex < 1) return null;

  let quantityStart = unitIndex;
  while (quantityStart > 0 && nodeCanFillSlot(compact[quantityStart - 1], "quantity")) quantityStart--;
  if (quantityStart === unitIndex || quantityStart === 0) return null;
  const quantityNodes = compact.slice(quantityStart, unitIndex);
  if (!quantityNodes.every((node) => nodeCanFillSlot(node, "quantity"))) return null;

  const subjectNodes = compact.slice(0, quantityStart);
  const subject = nominalPredicateSubjectFromNodes(subjectNodes);
  if (!subject || flattenSurface(subject) !== subjectNodes.map(flattenSurface).join("")) return null;
  const subjectClass = nominalPredicateSubjectClass(subject);

  const afterUnit = compact.slice(unitIndex + 1);
  let dimension = null;
  if (afterUnit.length) {
    if (afterUnit.length !== 1 || !nodeCanFillSlot(afterUnit[0], "dimension_predicate")) return null;
    dimension = afterUnit[0];
  }

  if (domain === "age" && subjectClass !== "person") return null;
  if (domain === "price" && ["person", "time", "location"].includes(subjectClass)) return null;
  if (domain === "area_or_length") {
    if (dimension) domain = "length";
    else if (["location", "area_measurable_nominal"].includes(subjectClass)) domain = "area";
    else return null;
  }
  if (domain === "length" && !dimension) return null;
  if (domain === "area" && dimension) return null;
  if (domain === "price" && dimension) return null;
  if (domain === "age" && dimension) return null;

  const quantityChildren = quantityNodes.map((node) => nominalPredicateQuantityClone(node, "MeasureExpression"));
  const unit = nominalPredicateUnitClone(compact[unitIndex], domain);
  const dimensionChild = dimension ? nominalPredicateDimensionClone(dimension) : null;
  const measureChildren = [...quantityChildren, unit, ...(dimensionChild ? [dimensionChild] : [])];
  const measure = construction("MeasureExpression", "Measure", measureChildren, {
    slots: cleanSlots([
      "measure_expression", "nominal_predicate", "predicate", "quantity", "nominal_measure_unit",
      domain === "age" ? "age_unit" : "",
      domain === "price" ? "currency_unit" : "",
      domain === "area" ? "area_measure_unit" : "",
      domain === "length" ? "length_measure_unit" : "",
      dimensionChild ? "dimension_predicate" : "",
    ]),
    note: `Restricted ${domain} measure expression used as a copula-less nominal predicate.`,
    trace: traceInfo("generative_template", {
      construction_type: "MeasureExpression",
      internal_representation_scope: "overt_measure_child_span",
      independent_grammar_licensing: false,
      licensing_parent: "NominalPredicateClause",
      template_family: "generative_template",
      template: ["quantity+", `${domain}_unit!`, ...(dimensionChild ? ["dimension_predicate!"] : [])],
      assigned_slots: [...quantityChildren.map(() => "quantity"), `${domain}_unit`, ...(dimensionChild ? ["dimension_predicate"] : [])],
      surfaces: measureChildren.map(flattenSurface),
      measure_domain: domain,
      quantity_surface: quantityChildren.map(flattenSurface).join(""),
      unit_surface: flattenSurface(unit),
      dimension_surface: dimensionChild ? flattenSurface(dimensionChild) : "",
      subspan: true,
    }),
  });

  const children = [subject, measure, ...particles];
  return construction("NominalPredicateClause", "NomPred", children, {
    slots: cleanSlots(["nominal_predicate_clause", "subject", "predicate", "nominal_predicate", "measure_expression", "clause"]),
    note: `Restricted copula-less ${domain} nominal-predicate clause with an overt subject and overt measure expression.`,
    trace: traceInfo("generative_template", {
      construction_type: "NominalPredicateClause",
      template_family: "generative_template",
      template: ["subject!", "measure_expression!", "particle?"],
      assigned_slots: ["subject", "measure_expression", ...particles.map(() => "particle")],
      surfaces: children.map(flattenSurface),
      nominal_predicate_type: domain,
      copula_status: "licensed_omission_in_restricted_measure_predication",
      subject_status: "overt",
      subject_surface: flattenSurface(subject),
      predicate_surface: flattenSurface(measure),
      hidden_subject_inserted: false,
      context_requirement_status: "context_not_required",
      missing_argument_slots: [],
      not_claims: [
        "not_general_np_np_copula_omission",
        "not_topic_by_initial_position_alone",
        "not_hidden_copula_token",
        "not_hidden_subject",
      ],
    }),
  });
}

  return {
    nominalPredicateSubjectFromNodes,
    nominalPredicateTokens,
    nominalPredicateSubjectClass,
    nominalPredicateQuantityClone,
    nominalPredicateUnitClone,
    nominalPredicateDimensionClone,
    nominalMeasurePredicateFallback
  };
};
