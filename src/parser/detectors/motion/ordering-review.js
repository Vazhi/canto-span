"use strict";

module.exports = function createMotionOrderingReviewDetectors(dependencies = {}) {
  const { cleanSlots, construction, flattenSurface, traceInfo } = dependencies;

function motionOrderingReviewCandidate(children, subtype, problem, expectedRepairs = [], options = {}) {
  const family = options.family || "motion_event_ordering_or_attachment";
  const reviewFlag = options.review_flag || "motion_event_order_or_attachment_review";
  const missingSlot = options.missing_slot || "licensed_motion_event_order_or_attachment";
  const note = options.note || "Review-bearing motion-event ordering or attachment candidate. Visible learner text is preserved and no repair is inserted.";
  const notClaims = options.not_claims || ["not_hard_asterisk_judgment", "not_silent_reordering", "not_hidden_motion_component"];
  return construction("MalformedCandidate", "Malformed", children, {
    slots: cleanSlots(["malformed_candidate", "needs_review", "predicate", "problem_span"]),
    note,
    trace: traceInfo("special_ambiguity_rule", {
      construction_type: "MalformedCandidate",
      malformed_family: family,
      malformed_subtype: subtype,
      surfaces: children.map(flattenSurface),
      problem,
      expected_repairs: expectedRepairs,
      semantic_review_flags: ["malformed_candidate_parse", reviewFlag],
      context_requirement_status: "context_required",
      missing_argument_slots: [missingSlot],
      not_claims: notClaims,
    }),
  });
}



  return { motionOrderingReviewCandidate };
};
