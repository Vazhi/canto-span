#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");

const DEFAULT_ROOT = path.resolve(__dirname, "..");
const PANEL_STATE = "review-packets/native-panel/active-v2/panel-review-state.json";
const FOLLOWUP_METADATA = "review-packets/native-panel/active-v2/followup-draft-v1-metadata.json";

const PILOT_STATES = new Set(["active", "closed"]);
const AUDIT_STATES = new Set(["not_started", "in_progress", "accepted"]);
const FOLLOWUP_STATES = new Set(["draft", "locked", "generated", "deployed"]);
const RESTRICTED_FOLLOWUP_STATES = new Set(["locked", "generated", "deployed"]);
const ARTIFACT_STATES = new Set(["draft_source", "generated", "deployed"]);
const PILOT_COMPATIBILITY = {
  active: "collection_in_progress",
  closed: "collection_closed",
};
const FOLLOWUP_COMPATIBILITY = {
  draft: "draft_followup",
  locked: "instrument_locked",
  generated: "form_generated",
  deployed: "deployed",
};
const FOLLOWUP_RANK = { draft: 0, locked: 1, generated: 2, deployed: 3 };
const ARTIFACT_RANK = { draft_source: 0, generated: 2, deployed: 3 };

function readJson(root, relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));
}

function validateNativePanelLifecycle(state, metadata) {
  const failures = [];
  const canonicalFiles = {
    pilot_and_audit: PANEL_STATE,
    followup_and_artifacts: FOLLOWUP_METADATA,
  };
  const addFailure = (invariant, detail, values = {}, artifact = null) => {
    failures.push({
      invariant,
      pilot_state: values.pilot_state ?? null,
      audit_state: values.audit_state ?? null,
      followup_state: values.followup_state ?? null,
      ...(artifact ? { artifact } : {}),
      canonical_files: canonicalFiles,
      detail,
    });
  };

  if (!state || typeof state !== "object") {
    addFailure("panel_state_required", "panel review state must be an object");
    return failures;
  }
  if (!metadata || typeof metadata !== "object") {
    addFailure("followup_metadata_required", "follow-up metadata must be an object");
    return failures;
  }

  const lifecycle = state.instrument_lifecycle;
  if (!lifecycle || typeof lifecycle !== "object") {
    addFailure("required_lifecycle_fields", "instrument_lifecycle is missing");
    return failures;
  }
  if (lifecycle.metadata_file !== FOLLOWUP_METADATA) {
    addFailure("canonical_followup_metadata_link", "instrument_lifecycle.metadata_file does not name the canonical follow-up metadata file");
  }

  const pilots = lifecycle.pilot_collections;
  if (!Array.isArray(pilots) || pilots.length !== 1) {
    addFailure(
      "exactly_one_pilot_declaration",
      Array.isArray(pilots)
        ? `found ${pilots.length} pilot declarations`
        : "pilot_collections must be an array containing exactly one declaration"
    );
  }
  const pilot = Array.isArray(pilots) && pilots.length === 1 ? pilots[0] : {};
  const audit = lifecycle.item_level_audit && typeof lifecycle.item_level_audit === "object"
    ? lifecycle.item_level_audit
    : {};
  const followup = lifecycle.followup_instrument && typeof lifecycle.followup_instrument === "object"
    ? lifecycle.followup_instrument
    : {};
  const values = {
    pilot_state: pilot.collection_state,
    audit_state: audit.state,
    followup_state: followup.lifecycle_state,
  };

  if (!PILOT_STATES.has(values.pilot_state)) {
    addFailure("controlled_pilot_collection_state", `unsupported pilot state ${JSON.stringify(values.pilot_state)}`, values);
  }
  if (!AUDIT_STATES.has(values.audit_state)) {
    addFailure("controlled_item_audit_state", `unsupported audit state ${JSON.stringify(values.audit_state)}`, values);
  }
  if (!FOLLOWUP_STATES.has(values.followup_state)) {
    addFailure("controlled_followup_lifecycle_state", `unsupported follow-up state ${JSON.stringify(values.followup_state)}`, values);
  }

  const metadataPilot = metadata.current_live_instrument && typeof metadata.current_live_instrument === "object"
    ? metadata.current_live_instrument
    : {};
  for (const field of ["instrument_id", "collection_state", "closure_rule"]) {
    if (pilot[field] !== metadataPilot[field]) {
      addFailure("single_pilot_declaration_consistency", `pilot ${field} does not match follow-up metadata`, values);
    }
  }
  if (pilot.compatibility_status !== PILOT_COMPATIBILITY[values.pilot_state] ||
      metadataPilot.status !== pilot.compatibility_status) {
    addFailure("pilot_compatibility_status_consistency", "pilot compatibility status does not match collection state", values);
  }
  if (!lifecycle.item_level_audit || audit.pilot_instrument_id !== pilot.instrument_id) {
    addFailure("item_audit_targets_current_pilot", "item-level audit is missing or targets a different pilot", values);
  }

  const expectedFollowup = {
    instrument_id: metadata.instrument_id,
    lifecycle_state: metadata.lifecycle_state,
    compatibility_status: metadata.instrument_status,
    deployment_allowed: metadata.deployment_allowed,
  };
  for (const field of Object.keys(expectedFollowup)) {
    if (followup[field] !== expectedFollowup[field]) {
      addFailure("followup_declaration_consistency", `follow-up ${field} does not match canonical metadata`, values);
    }
  }
  if (followup.compatibility_status !== FOLLOWUP_COMPATIBILITY[values.followup_state]) {
    addFailure("followup_compatibility_status_consistency", "follow-up compatibility status does not match lifecycle state", values);
  }

  const prerequisitesSatisfied = values.pilot_state === "closed" && values.audit_state === "accepted";
  if (RESTRICTED_FOLLOWUP_STATES.has(values.followup_state) && !prerequisitesSatisfied) {
    addFailure(
      "followup_deployment_lock",
      "locked, generated, or deployed follow-up requires pilot=closed and audit=accepted",
      values
    );
  }
  if (values.followup_state === "draft" && followup.deployment_allowed !== false) {
    addFailure("draft_is_non_deployable", "draft follow-up must set deployment_allowed=false", values);
  }
  if (followup.deployment_allowed === true && !prerequisitesSatisfied) {
    addFailure("deployment_permission_prerequisites", "deployment_allowed requires pilot=closed and audit=accepted", values);
  }

  const artifacts = metadata.tracked_artifacts;
  if (!Array.isArray(artifacts)) {
    addFailure("tracked_artifacts_required", "tracked_artifacts must be an array", values);
  } else {
    const byPath = new Map();
    for (const artifact of artifacts) {
      const artifactPath = artifact && artifact.path;
      const prior = byPath.get(artifactPath) || [];
      prior.push(artifact);
      byPath.set(artifactPath, prior);

      if (!artifact || typeof artifact.path !== "string" || artifact.path.length === 0 ||
          !ARTIFACT_STATES.has(artifact.artifact_state) || typeof artifact.deployable !== "boolean") {
        addFailure("valid_tracked_artifact", "artifact requires path, controlled artifact_state, and deployable boolean", values, artifact || {});
        continue;
      }
      if (FOLLOWUP_RANK[values.followup_state] !== undefined &&
          ARTIFACT_RANK[artifact.artifact_state] > FOLLOWUP_RANK[values.followup_state]) {
        addFailure("artifact_state_not_ahead_of_lifecycle", "tracked artifact state is ahead of follow-up lifecycle", values, artifact);
      }
      if (values.followup_state === "draft" && artifact.deployable) {
        addFailure("draft_has_no_generated_or_deployable_artifact", "draft lifecycle cannot contain a deployable artifact", values, artifact);
      }
      if (artifact.deployable && !prerequisitesSatisfied) {
        addFailure("deployable_artifact_prerequisites", "deployable artifact requires pilot=closed and audit=accepted", values, artifact);
      }
    }

    for (const [artifactPath, declarations] of byPath) {
      if (!artifactPath || declarations.length !== 1) {
        addFailure(
          "unique_tracked_artifact_declaration",
          `${artifactPath || "<missing path>"} has ${declarations.length} declarations`,
          values,
          { path: artifactPath || null }
        );
      }
    }
    for (const requiredPath of [metadata.item_file, metadata.crosswalk_file, metadata.response_template_file]) {
      if (typeof requiredPath !== "string" || (byPath.get(requiredPath) || []).length !== 1) {
        addFailure("all_followup_sources_are_tracked", "required follow-up source lacks exactly one tracked-artifact declaration", values, { path: requiredPath || null });
      }
    }
    if (values.followup_state === "generated" &&
        !artifacts.some((artifact) => artifact && ["generated", "deployed"].includes(artifact.artifact_state))) {
      addFailure("generated_state_has_generated_artifact", "generated lifecycle has no generated artifact", values);
    }
    if (values.followup_state === "deployed" &&
        !artifacts.some((artifact) => artifact && artifact.artifact_state === "deployed")) {
      addFailure("deployed_state_has_deployed_artifact", "deployed lifecycle has no deployed artifact", values);
    }
  }

  return failures;
}

function verifyNativePanelLifecycle(root = DEFAULT_ROOT) {
  const state = readJson(root, PANEL_STATE);
  const metadata = readJson(root, FOLLOWUP_METADATA);
  const failures = validateNativePanelLifecycle(state, metadata);
  const lifecycle = state.instrument_lifecycle || {};
  const pilot = Array.isArray(lifecycle.pilot_collections) && lifecycle.pilot_collections.length === 1
    ? lifecycle.pilot_collections[0]
    : {};
  const audit = lifecycle.item_level_audit || {};
  const followup = lifecycle.followup_instrument || {};

  for (const artifact of metadata.tracked_artifacts || []) {
    if (!artifact.path || !fs.existsSync(path.join(root, artifact.path))) {
      failures.push({
        invariant: "tracked_artifact_exists",
        pilot_state: pilot.collection_state ?? null,
        audit_state: audit.state ?? null,
        followup_state: followup.lifecycle_state ?? null,
        artifact,
        canonical_files: {
          pilot_and_audit: PANEL_STATE,
          followup_and_artifacts: FOLLOWUP_METADATA,
        },
        detail: `tracked artifact does not exist: ${artifact.path || "<missing path>"}`,
      });
    }
  }

  return {
    schema: "canto-span-native-panel-lifecycle-verification-v1",
    pilot_state: pilot.collection_state ?? null,
    audit_state: audit.state ?? null,
    followup_state: followup.lifecycle_state ?? null,
    deployment_allowed: followup.deployment_allowed ?? null,
    tracked_artifacts: Array.isArray(metadata.tracked_artifacts) ? metadata.tracked_artifacts.length : null,
    failed: failures.length,
    status: failures.length === 0 ? "PASS" : "FAIL",
    failures,
  };
}

if (require.main === module) {
  const result = verifyNativePanelLifecycle();
  console.log(JSON.stringify(result, null, 2));
  if (result.status !== "PASS") process.exit(1);
}

module.exports = {
  PANEL_STATE,
  FOLLOWUP_METADATA,
  validateNativePanelLifecycle,
  verifyNativePanelLifecycle,
};
