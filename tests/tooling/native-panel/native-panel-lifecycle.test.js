"use strict";

const assert = require("node:assert/strict");
const path = require("node:path");
const test = require("node:test");
const {
  ACTIVE_ROOT,
  FOLLOWUP_METADATA,
  GENERATED_DIRECTORY,
  DEPLOYMENT_DIRECTORY,
  EXEMPT_PATHS,
  EXEMPT_DIRECTORIES,
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
    item_file: `${ACTIVE_ROOT}/followup-draft-v1-items.tsv`,
    crosswalk_file: `${ACTIVE_ROOT}/followup-draft-v1-item-crosswalk.tsv`,
    response_template_file: `${ACTIVE_ROOT}/followup-draft-v1-response-template.tsv`,
    artifact_contract: {
      scope_root: ACTIVE_ROOT,
      generated_directory: GENERATED_DIRECTORY,
      deployment_directory: DEPLOYMENT_DIRECTORY,
      exempt_paths: [...EXEMPT_PATHS],
      exempt_directories: [...EXEMPT_DIRECTORIES],
    },
    tracked_artifacts: [
      { path: `${ACTIVE_ROOT}/followup-draft-v1-items.tsv`, role: "item_source", artifact_state: "draft_source", deployable: false },
      { path: `${ACTIVE_ROOT}/followup-draft-v1-item-crosswalk.tsv`, role: "crosswalk_source", artifact_state: "draft_source", deployable: false },
      { path: `${ACTIVE_ROOT}/followup-draft-v1-response-template.tsv`, role: "response_template_source", artifact_state: "draft_source", deployable: false },
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
  metadata.tracked_artifacts = metadata.tracked_artifacts.filter((artifact) =>
    ["item_source", "crosswalk_source", "response_template_source"].includes(artifact.role)
  );
  if (followupState === "generated") {
    metadata.tracked_artifacts.push({
      path: `${GENERATED_DIRECTORY}/followup-form.json`,
      role: "generated_instrument",
      artifact_state: "generated",
      deployable: false,
    });
  }
  if (followupState === "deployed") {
    metadata.tracked_artifacts.push(
      {
        path: `${GENERATED_DIRECTORY}/followup-form.json`,
        role: "generated_instrument",
        artifact_state: "deployed",
        deployable: true,
      },
      {
        path: `${DEPLOYMENT_DIRECTORY}/followup-deployment-receipt.json`,
        role: "deployment_receipt",
        artifact_state: "deployed",
        deployable: false,
      },
    );
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

function discoveredFor(metadata) {
  return metadata.tracked_artifacts.map((artifact) => artifact.path);
}

test("deployment lock covers all 24 pilot, audit, and follow-up combinations", () => {
  for (const pilotState of ["active", "closed"]) {
    for (const auditState of ["not_started", "in_progress", "accepted"]) {
      for (const followupState of ["draft", "locked", "generated", "deployed"]) {
        const fixture = lifecycleFixtures();
        setLifecycle(fixture, pilotState, auditState, followupState);
        const failures = validateNativePanelLifecycle(fixture.state, fixture.metadata, {
          discovered_artifacts: discoveredFor(fixture.metadata),
        });
        const allowed = followupState === "draft"
          || (pilotState === "closed" && auditState === "accepted");
        assert.equal(
          failures.length === 0,
          allowed,
          `${pilotState}/${auditState}/${followupState}: ${JSON.stringify(failures)}`,
        );
      }
    }
  }
});

test("current active, not-started, draft fixture passes", () => {
  const { metadata, state } = lifecycleFixtures();
  assert.deepEqual(
    validateNativePanelLifecycle(state, metadata, { discovered_artifacts: discoveredFor(metadata) }),
    [],
  );
});

test("missing and duplicate lifecycle declarations fail", () => {
  for (const field of ["pilot_collections", "item_level_audit", "followup_instrument"]) {
    const fixture = lifecycleFixtures();
    delete fixture.state.instrument_lifecycle[field];
    assert.notEqual(validateNativePanelLifecycle(fixture.state, fixture.metadata).length, 0, field);
  }
  const duplicate = lifecycleFixtures();
  duplicate.state.instrument_lifecycle.pilot_collections.push(
    clone(duplicate.state.instrument_lifecycle.pilot_collections[0]),
  );
  assert.ok(hasFailure(
    validateNativePanelLifecycle(duplicate.state, duplicate.metadata),
    "exactly_one_pilot_declaration",
  ));
});

test("unsupported states and cross-file contradictions fail", () => {
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

test("deployed lifecycle cannot coexist with deployment_allowed=false", () => {
  const fixture = lifecycleFixtures();
  setLifecycle(fixture, "closed", "accepted", "deployed");
  fixture.metadata.deployment_allowed = false;
  fixture.state.instrument_lifecycle.followup_instrument.deployment_allowed = false;
  assert.ok(hasFailure(
    validateNativePanelLifecycle(fixture.state, fixture.metadata),
    "deployment_permission_matches_lifecycle",
  ));
});

test("deployment permission cannot be true before deployed lifecycle", () => {
  const fixture = lifecycleFixtures();
  setLifecycle(fixture, "closed", "accepted", "generated");
  fixture.metadata.deployment_allowed = true;
  fixture.state.instrument_lifecycle.followup_instrument.deployment_allowed = true;
  assert.ok(hasFailure(
    validateNativePanelLifecycle(fixture.state, fixture.metadata),
    "deployment_permission_matches_lifecycle",
  ));
});

test("source files cannot satisfy generated or deployed evidence", () => {
  for (const followupState of ["generated", "deployed"]) {
    const fixture = lifecycleFixtures();
    setLifecycle(fixture, "closed", "accepted", followupState);
    fixture.metadata.tracked_artifacts = fixture.metadata.tracked_artifacts.filter((artifact) =>
      !["generated_instrument", "deployment_receipt"].includes(artifact.role)
    );
    fixture.metadata.tracked_artifacts[0].artifact_state = followupState;
    fixture.metadata.tracked_artifacts[0].deployable = followupState === "deployed";
    const failures = validateNativePanelLifecycle(fixture.state, fixture.metadata);
    assert.ok(hasFailure(failures, "source_role_cannot_supply_generated_or_deployed_evidence"));
    assert.ok(hasFailure(
      failures,
      followupState === "generated" ? "generated_lifecycle_evidence" : "deployed_lifecycle_evidence",
    ));
  }
});

test("generated instruments and deployment receipts use separate canonical roles and directories", () => {
  const wrongGenerated = lifecycleFixtures();
  setLifecycle(wrongGenerated, "closed", "accepted", "generated");
  wrongGenerated.metadata.tracked_artifacts.find(
    (artifact) => artifact.role === "generated_instrument",
  ).path = `${ACTIVE_ROOT}/followup-form.json`;
  assert.ok(hasFailure(
    validateNativePanelLifecycle(wrongGenerated.state, wrongGenerated.metadata),
    "generated_instrument_uses_canonical_directory",
  ));

  const wrongReceipt = lifecycleFixtures();
  setLifecycle(wrongReceipt, "closed", "accepted", "deployed");
  wrongReceipt.metadata.tracked_artifacts.find(
    (artifact) => artifact.role === "deployment_receipt",
  ).path = `${GENERATED_DIRECTORY}/followup-deployment-receipt.json`;
  assert.ok(hasFailure(
    validateNativePanelLifecycle(wrongReceipt.state, wrongReceipt.metadata),
    "deployment_receipt_uses_canonical_directory",
  ));
});

test("deployed lifecycle requires both deployed instrument and deployment receipt", () => {
  for (const missingRole of ["generated_instrument", "deployment_receipt"]) {
    const fixture = lifecycleFixtures();
    setLifecycle(fixture, "closed", "accepted", "deployed");
    fixture.metadata.tracked_artifacts = fixture.metadata.tracked_artifacts.filter(
      (artifact) => artifact.role !== missingRole,
    );
    assert.ok(hasFailure(
      validateNativePanelLifecycle(fixture.state, fixture.metadata),
      "deployed_lifecycle_evidence",
    ), missingRole);
  }
});

test("arbitrarily named untracked files fail the closed inventory", () => {
  const fixture = lifecycleFixtures();
  const failures = validateNativePanelLifecycle(fixture.state, fixture.metadata, {
    discovered_artifacts: [
      ...discoveredFor(fixture.metadata),
      `${ACTIVE_ROOT}/google-form-script.js`,
    ],
  });
  assert.ok(hasFailure(failures, "untracked_followup_artifact"));
});

test("tracked artifacts absent from the inventory fail closed", () => {
  const fixture = lifecycleFixtures();
  const failures = validateNativePanelLifecycle(fixture.state, fixture.metadata, {
    discovered_artifacts: discoveredFor(fixture.metadata).slice(0, 2),
  });
  assert.ok(hasFailure(failures, "tracked_artifact_exists"));
});

test("artifact declarations require unique paths, unique source roles, and the canonical contract", () => {
  const duplicatePath = lifecycleFixtures();
  duplicatePath.metadata.tracked_artifacts.push(clone(duplicatePath.metadata.tracked_artifacts[0]));
  assert.ok(hasFailure(
    validateNativePanelLifecycle(duplicatePath.state, duplicatePath.metadata),
    "unique_tracked_artifact_declaration",
  ));

  const duplicateRole = lifecycleFixtures();
  duplicateRole.metadata.tracked_artifacts[1].role = "item_source";
  assert.ok(hasFailure(
    validateNativePanelLifecycle(duplicateRole.state, duplicateRole.metadata),
    "exactly_one_source_artifact_per_role",
  ));

  const badContract = lifecycleFixtures();
  badContract.metadata.artifact_contract.exempt_paths.push(`${ACTIVE_ROOT}/hidden.js`);
  assert.ok(hasFailure(
    validateNativePanelLifecycle(badContract.state, badContract.metadata),
    "canonical_artifact_contract",
  ));
});

test("unrelated prose does not become lifecycle authority", () => {
  const fixture = lifecycleFixtures();
  fixture.state.expert_prose = "The pilot might close after a future audit.";
  fixture.metadata.notes = "Generated and deployed are words here, not state declarations.";
  assert.deepEqual(validateNativePanelLifecycle(fixture.state, fixture.metadata), []);
});

test("current repository lifecycle and closed artifact inventory pass", () => {
  const root = path.resolve(__dirname, "../../..");
  const result = verifyNativePanelLifecycle(root);
  assert.equal(result.status, "PASS", JSON.stringify(result.failures, null, 2));
  assert.equal(result.pilot_state, "active");
  assert.equal(result.audit_state, "not_started");
  assert.equal(result.followup_state, "draft");
  assert.equal(result.deployment_allowed, false);
  assert.equal(result.tracked_artifacts, 3);
  assert.equal(result.discovered_artifacts, 3);
  assert.equal(result.artifact_digests.length, 3);
});
