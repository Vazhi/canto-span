"use strict";

module.exports = function createPostverbalZoDetectors(dependencies = {}) {
  const {
    cleanSlots, compositionalNpSubspanFor, construction, flattenSurface,
    nodeCanFillSlot, nodeCanLicenseEvidenceGatedObject, nodeNpLicenseStatus,
    templateConstructionFor, traceInfo, withoutIgnorableSpaceText,
  } = dependencies;

function postverbalZoPerfectiveFromRawNodes(nodes = []) {
  const compact = withoutIgnorableSpaceText(nodes || []);
  if (compact.length < 3) return null;
  const subjectOffset = nodeCanFillSlot(compact[0], "subject") ? 1 : 0;
  if (compact.length - subjectOffset < 3) return null;
  const action = compact[subjectOffset];
  const aspect = compact[subjectOffset + 1];
  if (!nodeCanFillSlot(action, "action_verb") || !nodeCanFillSlot(aspect, "perfective_aspect")) return null;
  const objectNodes = compact.slice(subjectOffset + 2);
  if (objectNodes.length < 2) return null;
  const objectNode = compositionalNpSubspanFor(objectNodes)
    || (objectNodes.length === 1 && nodeCanLicenseEvidenceGatedObject(objectNodes[0]) ? objectNodes[0] : null);
  if (!objectNode || !nodeCanLicenseEvidenceGatedObject(objectNode)) return null;
  const children = [action, aspect, objectNode];
  const perfective = construction("PostverbalZoPerfectiveVP", "PerfectiveVP", children, {
    slots: cleanSlots(["perfective_vp", "vp", "action_vp", "predicate", "action_verb", "perfective_aspect", "object", "np"]),
    note: "Compositional postverbal 咗 perfective with an overt licensed NP object. NP assembly is independent parser infrastructure and does not broaden the construction's linguistic status.",
    trace: traceInfo("generative_template", {
      construction_type: "PostverbalZoPerfectiveVP",
      template_family: "generative_template",
      template: ["action_verb!", "perfective_aspect!", "licensed_np_object!"],
      assigned_slots: ["action_verb", "perfective_aspect", "object"],
      surfaces: children.map((node) => flattenSurface(node)),
      object_np_license_status: nodeNpLicenseStatus(objectNode),
      object_np_construction: objectNode.kind === "construction" ? objectNode.type : "bare_nominal_token",
      hidden_object_inserted: false,
      evidence_scope_unchanged: true,
      reason: "v0.5.184 composes the complete postverbal object as a reusable NP before broad VP subspan wrapping can consume only its first token.",
    }),
  });
  if (!subjectOffset) return [perfective];
  const clause = templateConstructionFor([compact[0], perfective], ["SubjectPredicateClause"]);
  return clause ? [clause] : [compact[0], perfective];
}

function postverbalZoPerfectiveFromWrappedNodes(nodes = []) {
  const compact = withoutIgnorableSpaceText(nodes || []);
  if (compact.length < 2) return null;
  for (let index = 0; index < compact.length - 1; index += 1) {
    const first = compact[index];
    const objectNode = compact[index + 1];
    if (!nodeCanLicenseEvidenceGatedObject(objectNode)) continue;
    let action = null;
    let aspect = null;
    if (first && first.kind === "construction" && first.type === "PerfectiveVP") {
      const children = withoutIgnorableSpaceText(first.children || []);
      if (children.length === 2 && nodeCanFillSlot(children[0], "action_verb") && nodeCanFillSlot(children[1], "perfective_aspect")) {
        [action, aspect] = children;
      }
    } else if (index + 2 < compact.length
        && nodeCanFillSlot(first, "action_verb")
        && nodeCanFillSlot(compact[index + 1], "perfective_aspect")
        && nodeCanLicenseEvidenceGatedObject(compact[index + 2])) {
      action = first;
      aspect = compact[index + 1];
    }
    if (!action || !aspect) continue;
    const actualObject = first && first.kind === "construction" ? objectNode : compact[index + 2];
    const consumed = first && first.kind === "construction" ? 2 : 3;
    if (index + consumed !== compact.length) continue;
    const children = [action, aspect, actualObject];
    const perfective = construction("PostverbalZoPerfectiveVP", "PerfectiveVP", children, {
      slots: cleanSlots(["perfective_vp", "vp", "action_vp", "predicate", "action_verb", "perfective_aspect", "object", "np"]),
      note: "Compositional postverbal 咗 perfective with an overt licensed NP object. NP assembly is independent parser infrastructure and does not broaden the construction's linguistic status.",
      trace: traceInfo("generative_template", {
        construction_type: "PostverbalZoPerfectiveVP",
        template_family: "generative_template",
        template: ["action_verb!", "perfective_aspect!", "licensed_np_object!"],
        assigned_slots: ["action_verb", "perfective_aspect", "object"],
        surfaces: children.map((node) => flattenSurface(node)),
        object_np_license_status: nodeNpLicenseStatus(actualObject),
        object_np_construction: actualObject.kind === "construction" ? actualObject.type : "bare_nominal_token",
        hidden_object_inserted: false,
        evidence_scope_unchanged: true,
        reason: "v0.5.184 recomposes V+咗 with a reusable licensed NP after NP-internal parsing, instead of enumerating complete object strings.",
      }),
    });
    return [...compact.slice(0, index), perfective, ...compact.slice(index + consumed)];
  }
  return null;
}

  return { postverbalZoPerfectiveFromRawNodes, postverbalZoPerfectiveFromWrappedNodes };
};
