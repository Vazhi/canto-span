"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");
const {
  AB30_DECISIONS,
  AB30_LEDGER,
  CURRENT_NEXT_ACTION,
  FOLLOWUP_METADATA,
  ab30CorpusFailures,
  containsPartialOnlyReadinessOverclaim,
  lifecycleFailures,
  noteIdentityFailures,
  noteLifecycleFailures,
  permanentIdentityFailures,
  uncommittedResponseFailures,
} = require("../../../tools/verify-active-review-workflow.js");

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function identityFixtures() {
  const entry = {
    construction_uuid: "2169217f-a21d-5165-9513-eb0edee2c220",
    construction_code: "AB30",
    canonical_name: "ZoMarkedPerfectiveObjectVP",
    legacy_runtime_label: "PostverbalZoPerfectiveVP",
    note_path: "grammar/research_pending/PostverbalZoPerfectiveVP.md",
  };
  const identity = {
    construction_uuid: entry.construction_uuid,
    construction_code: entry.construction_code,
    canonical_name: entry.canonical_name,
    legacy_labels: [entry.legacy_runtime_label],
    source_path: entry.note_path,
  };
  const adjudication = {
    construction_uuid: entry.construction_uuid,
    construction_code: entry.construction_code,
    approved_canonical_name: entry.canonical_name,
    legacy_label: entry.legacy_runtime_label,
  };
  return { entry, identity, adjudication };
}

test("permanent identity validation rejects incomplete, mismatched, and legacy-only entries", () => {
  const { entry, identity, adjudication } = identityFixtures();
  assert.deepEqual(permanentIdentityFailures(entry, identity, adjudication), []);
  for (const [field, value] of [
    ["construction_uuid", "00000000-0000-0000-0000-000000000000"],
    ["construction_code", "AB53"],
    ["canonical_name", "PostverbalZoPerfectiveVP"],
    ["legacy_runtime_label", "WrongLegacyLabel"],
  ]) {
    const changed = { ...entry, [field]: value };
    assert.notDeepEqual(
      permanentIdentityFailures(changed, identity, adjudication),
      [],
      `${field} mismatch should fail`,
    );
  }
  const missing = { ...entry };
  delete missing.construction_uuid;
  assert.match(permanentIdentityFailures(missing, identity, adjudication).join("\n"), /missing construction_uuid/);
  const legacyOnly = {
    construction: entry.legacy_runtime_label,
    legacy_runtime_label: entry.legacy_runtime_label,
  };
  assert.match(permanentIdentityFailures(legacyOnly, identity, adjudication).join("\n"), /legacy-only construction field/);
});

test("active note identity retains the runtime alias but must carry the canonical tuple", () => {
  const { entry } = identityFixtures();
  const frontmatter = {
    title: `${entry.construction_code} ${entry.canonical_name}`,
    construction: entry.legacy_runtime_label,
    construction_uuid: entry.construction_uuid,
    construction_code: entry.construction_code,
    canonical_name: entry.canonical_name,
    legacy_runtime_label: entry.legacy_runtime_label,
  };
  assert.deepEqual(noteIdentityFailures(frontmatter, entry), []);
  assert.notDeepEqual(noteIdentityFailures({ ...frontmatter, construction_code: "AB53" }, entry), []);
  assert.notDeepEqual(noteIdentityFailures({ ...frontmatter, construction: entry.canonical_name }, entry), []);
  assert.notDeepEqual(noteIdentityFailures({ ...frontmatter, title: entry.legacy_runtime_label }, entry), []);
});

function lifecycleFixtures() {
  const metadata = {
    instrument_id: "YUE-JUDGMENT-FOLLOWUP-01-DRAFT",
    instrument_status: "draft_followup",
    lifecycle_state: "draft",
    deployment_allowed: false,
    item_file: "items.tsv",
    crosswalk_file: "crosswalk.tsv",
    response_template_file: "responses.tsv",
    tracked_artifacts: [
      { path: "items.tsv", artifact_state: "draft_source", deployable: false },
      { path: "crosswalk.tsv", artifact_state: "draft_source", deployable: false },
      { path: "responses.tsv", artifact_state: "draft_source", deployable: false },
    ],
    current_live_instrument: {
      instrument_id: "YUE-JUDGMENT-PILOT-01",
      status: "collection_in_progress",
      collection_state: "active",
      closure_rule: "Do not deploy this follow-up until the live instrument closes and its item audit is incorporated.",
    },
  };
  const state = {
    constructions: [
      {
        legacy_runtime_label: "PostverbalZoPerfectiveVP",
        next_action: CURRENT_NEXT_ACTION,
      },
    ],
    instrument_lifecycle: {
      metadata_file: FOLLOWUP_METADATA,
      pilot_collections: [{
        instrument_id: metadata.current_live_instrument.instrument_id,
        collection_state: metadata.current_live_instrument.collection_state,
        compatibility_status: metadata.current_live_instrument.status,
        closure_rule: metadata.current_live_instrument.closure_rule,
      }],
      item_level_audit: {
        pilot_instrument_id: metadata.current_live_instrument.instrument_id,
        state: "not_started",
      },
      followup_instrument: {
        instrument_id: metadata.instrument_id,
        lifecycle_state: metadata.lifecycle_state,
        compatibility_status: metadata.instrument_status,
        deployment_allowed: metadata.deployment_allowed,
      },
    },
  };
  return { metadata, state };
}

function setLifecycle(fixture, pilotState, auditState, followupState) {
  const pilotStatuses = { active: "collection_in_progress", closed: "collection_closed" };
  const followupStatuses = {
    draft: "draft_followup",
    locked: "instrument_locked",
    generated: "form_generated",
    deployed: "deployed",
  };
  const { metadata, state } = fixture;
  metadata.current_live_instrument.collection_state = pilotState;
  metadata.current_live_instrument.status = pilotStatuses[pilotState];
  metadata.lifecycle_state = followupState;
  metadata.instrument_status = followupStatuses[followupState];
  metadata.deployment_allowed = followupState === "deployed";
  metadata.tracked_artifacts = metadata.tracked_artifacts.map((artifact) => ({
    ...artifact,
    artifact_state: "draft_source",
    deployable: false,
  }));
  if (["generated", "deployed"].includes(followupState)) {
    metadata.tracked_artifacts[0].artifact_state = followupState;
    metadata.tracked_artifacts[0].deployable = true;
  }
  state.instrument_lifecycle.pilot_collections[0].collection_state = pilotState;
  state.instrument_lifecycle.pilot_collections[0].compatibility_status = pilotStatuses[pilotState];
  state.instrument_lifecycle.item_level_audit.state = auditState;
  state.instrument_lifecycle.followup_instrument.lifecycle_state = followupState;
  state.instrument_lifecycle.followup_instrument.compatibility_status = followupStatuses[followupState];
  state.instrument_lifecycle.followup_instrument.deployment_allowed = metadata.deployment_allowed;
}

test("deployment lock covers every pilot, audit, and follow-up state combination", () => {
  for (const pilotState of ["active", "closed"]) {
    for (const auditState of ["not_started", "in_progress", "accepted"]) {
      for (const followupState of ["draft", "locked", "generated", "deployed"]) {
        const fixture = lifecycleFixtures();
        setLifecycle(fixture, pilotState, auditState, followupState);
        const failures = lifecycleFailures(fixture.state, fixture.metadata);
        const allowed = followupState === "draft" ||
          (pilotState === "closed" && auditState === "accepted");
        assert.equal(
          failures.length === 0,
          allowed,
          `${pilotState}/${auditState}/${followupState}: ${JSON.stringify(failures)}`
        );
      }
    }
  }
});

test("current active-pilot, pending-audit, draft-follow-up state passes", () => {
  const { metadata, state } = lifecycleFixtures();
  assert.deepEqual(lifecycleFailures(state, metadata), []);
});

test("missing, duplicate, and contradictory lifecycle declarations fail precisely", () => {
  for (const field of ["pilot_collections", "item_level_audit", "followup_instrument"]) {
    const { metadata, state } = lifecycleFixtures();
    delete state.instrument_lifecycle[field];
    assert.notDeepEqual(lifecycleFailures(state, metadata), [], `${field} should be required`);
  }
  const duplicate = lifecycleFixtures();
  duplicate.state.instrument_lifecycle.pilot_collections.push(
    clone(duplicate.state.instrument_lifecycle.pilot_collections[0])
  );
  assert.ok(lifecycleFailures(duplicate.state, duplicate.metadata).some(
    (failure) => failure.invariant === "exactly_one_pilot_declaration"
  ));

  const contradictory = lifecycleFixtures();
  contradictory.metadata.tracked_artifacts[0].artifact_state = "generated";
  contradictory.metadata.tracked_artifacts[0].deployable = true;
  assert.ok(lifecycleFailures(contradictory.state, contradictory.metadata).some(
    (failure) => failure.invariant === "draft_has_no_generated_or_deployable_artifact" &&
      failure.pilot_state === "active" &&
      failure.audit_state === "not_started" &&
      failure.followup_state === "draft" &&
      failure.artifact.path === "items.tsv"
  ));
});

test("duplicate artifact declarations and unrelated prose are handled safely", () => {
  const duplicate = lifecycleFixtures();
  duplicate.metadata.tracked_artifacts.push(clone(duplicate.metadata.tracked_artifacts[0]));
  assert.ok(lifecycleFailures(duplicate.state, duplicate.metadata).some(
    (failure) => failure.invariant === "unique_tracked_artifact_declaration"
  ));

  const unrelated = lifecycleFixtures();
  unrelated.state.expert_prose = "Response quality and survey readiness remain human decisions.";
  unrelated.metadata.notes = "This prose is not a lifecycle declaration.";
  assert.deepEqual(lifecycleFailures(unrelated.state, unrelated.metadata), []);
});

test("legacy lifecycle mirrors and stale survey controls cannot contradict canonical state", () => {
  for (const mutate of [
    (value) => { value.metadata.current_live_instrument.instrument_id = "OLD-PILOT"; },
    (value) => { value.state.instrument_lifecycle.followup_instrument.compatibility_status = "pilot_ready"; },
    (value) => { value.state.constructions[0].next_action = "await_user_prompt_then_create"; },
    (value) => { value.state.survey_creation_control = { user_prompt_required: true }; },
  ]) {
    const changed = lifecycleFixtures();
    mutate(changed);
    assert.notDeepEqual(lifecycleFailures(changed.state, changed.metadata), []);
  }
});

test("active notes must mirror the current collection and non-deployable follow-up", () => {
  const { metadata } = lifecycleFixtures();
  const frontmatter = {
    panel_lifecycle_metadata_file: FOLLOWUP_METADATA,
    current_panel_instrument_id: metadata.current_live_instrument.instrument_id,
    current_panel_instrument_status: metadata.current_live_instrument.status,
    followup_instrument_id: metadata.instrument_id,
    followup_instrument_status: metadata.instrument_status,
    followup_deployment_allowed: false,
  };
  assert.deepEqual(noteLifecycleFailures(frontmatter, metadata), []);
  assert.notDeepEqual(noteLifecycleFailures({ ...frontmatter, followup_deployment_allowed: true }, metadata), []);
});

function corpusFixtures() {
  const frontmatter = {
    construction_code: "AB30",
    canonical_name: "ZoMarkedPerfectiveObjectVP",
    legacy_runtime_label: "PostverbalZoPerfectiveVP",
    corpus_decision_ledger_file: AB30_DECISIONS,
    corpus_source_ledger_file: AB30_LEDGER,
    corpus_evidence_used: false,
    corpus_hits_reviewed: false,
    corpus_candidate_hit_count: 0,
    corpus_genuine_hit_count: 0,
    corpus_false_positive_count: 0,
    corpus_ambiguous_hit_count: 0,
    corpus_unusable_hit_count: 0,
    accepted_corpus_packet_reviewed_count: 5,
    accepted_corpus_genuine_count: 2,
    accepted_corpus_false_positive_count: 3,
    accepted_corpus_ambiguous_count: 0,
    accepted_corpus_unusable_count: 0,
    corpus_readiness_effect: "partial_only",
    corpus_diverse_source_gate_satisfied: false,
  };
  const classifications = ["genuine", "genuine", "false_positive", "false_positive", "false_positive"];
  const decisions = {
    construction: {
      permanentCode: frontmatter.construction_code,
      canonicalIdentity: frontmatter.canonical_name,
      legacyRuntimeLabel: frontmatter.legacy_runtime_label,
    },
    source_ledger: AB30_LEDGER,
    source_ledger_tool_version: "ab30-corpus-review/1.0.1",
    source_manifest_hash: "hash",
    packet_status: "current_candidate_packet_complete",
    readiness_effect: "partial_only",
    counts: {
      unreviewed: 0,
      genuine: 2,
      false_positive: 3,
      ambiguous: 0,
      unusable: 0,
    },
    decisions: classifications.map((classification, index) => ({
      candidate_id: `candidate-${index}`,
      classification,
    })),
  };
  const ledger = {
    construction: { ...decisions.construction },
    extractionToolVersion: decisions.source_ledger_tool_version,
    sourceManifestHash: decisions.source_manifest_hash,
    candidates: classifications.map((_, index) => ({ candidateId: `candidate-${index}` })),
  };
  const text = "Current packet: 5 reviewed; 2 genuine; 3 false positives. Its partial_only effect does not satisfy the diverse-corpus gate.";
  return { frontmatter, decisions, ledger, text };
}

test("AB30 corpus validation rejects count drift and partial_only readiness overclaims", () => {
  const { frontmatter, decisions, ledger, text } = corpusFixtures();
  assert.deepEqual(ab30CorpusFailures(frontmatter, text, decisions, ledger), []);

  const wrongNoteCounts = { ...frontmatter, accepted_corpus_false_positive_count: 2 };
  assert.match(ab30CorpusFailures(wrongNoteCounts, text, decisions, ledger).join("\n"), /note false_positive count mismatch/);

  const wrongDecisionCounts = clone(decisions);
  wrongDecisionCounts.counts.genuine = 3;
  assert.match(ab30CorpusFailures(frontmatter, text, wrongDecisionCounts, ledger).join("\n"), /decision-ledger genuine count mismatch/);

  const unreviewedDecision = clone(decisions);
  unreviewedDecision.decisions[0].classification = "unreviewed";
  unreviewedDecision.counts.genuine = 1;
  unreviewedDecision.counts.unreviewed = 1;
  assert.match(ab30CorpusFailures(frontmatter, text, unreviewedDecision, ledger).join("\n"), /contains unreviewed/);

  const readinessOverclaim = { ...frontmatter, corpus_diverse_source_gate_satisfied: true };
  assert.match(ab30CorpusFailures(readinessOverclaim, text, decisions, ledger).join("\n"), /must not satisfy/);
  const leakedIntoReadiness = { ...frontmatter, corpus_evidence_used: true };
  assert.match(ab30CorpusFailures(leakedIntoReadiness, text, decisions, ledger).join("\n"), /outside corpus readiness-gate fields/);
  assert.equal(containsPartialOnlyReadinessOverclaim("partial_only satisfies the diverse-corpus gate."), true);
  assert.notDeepEqual(
    ab30CorpusFailures(frontmatter, "5 reviewed; 2 genuine; 3 false positives. partial_only satisfies the diverse-corpus gate.", decisions, ledger),
    [],
  );
});

test("AB30 corpus validation rejects one duplicated decision ID and one omitted candidate ID", () => {
  const { frontmatter, decisions, ledger, text } = corpusFixtures();
  const duplicatedAndOmitted = clone(decisions);
  duplicatedAndOmitted.decisions[1].candidate_id = duplicatedAndOmitted.decisions[0].candidate_id;

  const failures = ab30CorpusFailures(frontmatter, text, duplicatedAndOmitted, ledger).join("\n");
  assert.match(failures, /candidate_id values are not unique/);
  assert.match(failures, /candidate-ID and decision-ID sets do not exactly match/);
});

test("uncommitted live responses cannot replace the accepted snapshot", () => {
  const entry = {
    panel_response_count_total: 23,
    eligible_panel_response_count: 23,
    uncommitted_live_response_report: {
      reported_count: 50,
      accepted_as_evidence: false,
    },
  };
  const snapshot = {
    response_count: 23,
    screening: { native_cantonese_confirmed: 23 },
  };
  assert.deepEqual(uncommittedResponseFailures(entry, snapshot), []);
  const accepted = clone(entry);
  accepted.uncommitted_live_response_report.accepted_as_evidence = true;
  assert.match(uncommittedResponseFailures(accepted, snapshot).join("\n"), /must not be accepted/);
  const inflated = { ...entry, panel_response_count_total: 50, eligible_panel_response_count: 50 };
  assert.match(uncommittedResponseFailures(inflated, snapshot).join("\n"), /mismatches accepted snapshot/);
  const deprecated = { ...entry, reported_live_response_count_not_yet_snapshotted: 50 };
  assert.match(uncommittedResponseFailures(deprecated, snapshot).join("\n"), /deprecated/);
});
