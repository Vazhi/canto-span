"use strict";

const assert = require("node:assert/strict");
const path = require("node:path");
const test = require("node:test");
const {
  FOLLOWUP_METADATA,
  validateNativePanelLifecycle,
  verifyNativePanelLifecycle,
} = require("../../../tools/verify-native-panel-lifecycle");

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

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
    constructions: [],
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
  if (followupState === "generated") {
    metadata.tracked_artifacts[0].artifact_state = "generated";
  }
  if (followupState === "deployed") {
    metadata.tracked_artifacts[0].artifact_state = "deployed";
    metadata.tracked_artifacts[0].deployable = true;
  }

  const pilot = state.instrument_lifecycle.pilot_collections[0];
  pilot.collection_state = pilotState;
  pilot.compatibility_status = pilotStatuses[pilotState];
  state.instrument_lifecycle.item_level_audit.state = auditState;
  const followup = state.instrument_lifecycle.followup_instrument;
  followup.lifecycle_state = followupState;
  followup.compatibility_status = followupStatuses[followupState];
  followup.deployment_allowed = metadata.deployment_allowed;
}

function hasFailure(failures, invariant) {
  return failures.some((failure) => failure.invariant === invariant);
}

test("deployment lock covers all 24 pilot, audit, and follow-up combinations", () => {
  for (const pilotState of ["active", "closed"]) {
    for (const auditState of ["not_started", "in_progress", "accepted"]) {
      for (const followupState of ["draft", "locked", "generated", "deployed"]) {
        const fixture = lifecycleFixtures();
        setLifecycle(fixture, pilotState, auditState, followupState);
        const failures = validateNativePanelLifecycle(fixture.state, fixture.metadata);
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

test("current active, not-started, draft fixture passes", () => {
  const { metadata, state } = lifecycleFixtures();
  assert.deepEqual(validateNativePanelLifecycle(state, metadata), []);
});

test("missing and duplicate lifecycle declarations fail", () => {
  for (const field of ["pilot_collections", "item_level_audit", "followup_instrument"]) {
    const fixture = lifecycleFixtures();
    delete fixture.state.instrument_lifecycle[field];
    assert.notEqual(validateNativePanelLifecycle(fixture.state, fixture.metadata).length, 0, field);
  }

  const duplicate = lifecycleFixtures();
  duplicate.state.instrument_lifecycle.pilot_collections.push(
    clone(duplicate.state.instrument_lifecycle.pilot_collections[0])
  );
  assert.ok(hasFailure(
    validateNativePanelLifecycle(duplicate.state, duplicate.metadata),
    "exactly_one_pilot_declaration"
  ));
});

test("unsupported states and cross-file contradictions fail precisely", () => {
  for (const mutate of [
    (fixture) => { fixture.state.instrument_lifecycle.pilot_collections[0].collection_state = "paused"; },
    (fixture) => { fixture.state.instrument_lifecycle.item_level_audit.state = "complete"; },
    (fixture) => { fixture.state.instrument_lifecycle.followup_instrument.lifecycle_state = "ready"; },
    (fixture) => { fixture.metadata.current_live_instrument.instrument_id = "OLD-PILOT"; },
    (fixture) => { fixture.state.instrument_lifecycle.followup_instrument.compatibility_status = "pilot_ready"; },
  ]) {
    const fixture = lifecycleFixtures();
    mutate(fixture);
    assert.notEqual(validateNativePanelLifecycle(fixture.state, fixture.metadata).length, 0);
  }
});

test("draft lifecycle rejects generated, deployed, or deployable artifacts", () => {
  for (const artifact of [
    { artifact_state: "generated", deployable: false },
    { artifact_state: "deployed", deployable: false },
    { artifact_state: "draft_source", deployable: true },
  ]) {
    const fixture = lifecycleFixtures();
    Object.assign(fixture.metadata.tracked_artifacts[0], artifact);
    const failures = validateNativePanelLifecycle(fixture.state, fixture.metadata);
    assert.ok(
      hasFailure(failures, "artifact_state_not_ahead_of_lifecycle") ||
      hasFailure(failures, "draft_has_no_generated_or_deployable_artifact")
    );
  }
});

test("artifact declarations must be unique, complete, and lifecycle-consistent", () => {
  const duplicate = lifecycleFixtures();
  duplicate.metadata.tracked_artifacts.push(clone(duplicate.metadata.tracked_artifacts[0]));
  assert.ok(hasFailure(
    validateNativePanelLifecycle(duplicate.state, duplicate.metadata),
    "unique_tracked_artifact_declaration"
  ));

  const missing = lifecycleFixtures();
  missing.metadata.tracked_artifacts.pop();
  assert.ok(hasFailure(
    validateNativePanelLifecycle(missing.state, missing.metadata),
    "all_followup_sources_are_tracked"
  ));

  const generatedWithoutArtifact = lifecycleFixtures();
  setLifecycle(generatedWithoutArtifact, "closed", "accepted", "generated");
  generatedWithoutArtifact.metadata.tracked_artifacts[0].artifact_state = "draft_source";
  assert.ok(hasFailure(
    validateNativePanelLifecycle(generatedWithoutArtifact.state, generatedWithoutArtifact.metadata),
    "generated_state_has_generated_artifact"
  ));
});

test("unrelated prose does not become lifecycle authority", () => {
  const fixture = lifecycleFixtures();
  fixture.state.expert_prose = "The pilot might close after a future audit.";
  fixture.metadata.notes = "Generated and deployed are words here, not state declarations.";
  assert.deepEqual(validateNativePanelLifecycle(fixture.state, fixture.metadata), []);
});

test("current repository lifecycle and tracked artifacts pass", () => {
  const root = path.resolve(__dirname, "../../..");
  const result = verifyNativePanelLifecycle(root);
  assert.equal(result.status, "PASS", JSON.stringify(result.failures, null, 2));
  assert.equal(result.pilot_state, "active");
  assert.equal(result.audit_state, "not_started");
  assert.equal(result.followup_state, "draft");
  assert.equal(result.deployment_allowed, false);
});
