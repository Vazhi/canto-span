#!/usr/bin/env node
"use strict";

const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const DEFAULT_ROOT = path.resolve(__dirname, "..");
const ACTIVE_ROOT = "review-packets/native-panel/active-v2";
const PANEL_STATE = `${ACTIVE_ROOT}/panel-review-state.json`;
const FOLLOWUP_METADATA = `${ACTIVE_ROOT}/followup-draft-v1-metadata.json`;
const GENERATED_DIRECTORY = `${ACTIVE_ROOT}/generated`;
const DEPLOYMENT_DIRECTORY = `${ACTIVE_ROOT}/deployment`;
const EXEMPT_PATHS = Object.freeze([
  `${ACTIVE_ROOT}/README.md`,
  `${ACTIVE_ROOT}/panel-policy.json`,
  PANEL_STATE,
  FOLLOWUP_METADATA,
]);
const EXEMPT_DIRECTORIES = Object.freeze([
  `${ACTIVE_ROOT}/interim-exports`,
]);

const PILOT_STATES = new Set(["active", "closed"]);
const AUDIT_STATES = new Set(["not_started", "in_progress", "accepted"]);
const FOLLOWUP_STATES = new Set(["draft", "locked", "generated", "deployed"]);
const RESTRICTED_FOLLOWUP_STATES = new Set(["locked", "generated", "deployed"]);
const ARTIFACT_STATES = new Set(["draft_source", "generated", "deployed"]);
const SOURCE_ROLES = new Set([
  "item_source",
  "crosswalk_source",
  "response_template_source",
]);
const ARTIFACT_ROLES = new Set([
  ...SOURCE_ROLES,
  "generated_instrument",
  "deployment_receipt",
]);
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
const SOURCE_ROLE_PATH_FIELDS = {
  item_source: "item_file",
  crosswalk_source: "crosswalk_file",
  response_template_source: "response_template_file",
};

function readJson(root, relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));
}

function normalizeRepoPath(value) {
  return typeof value === "string" ? value.split(path.sep).join("/") : value;
}

function isWithin(candidate, directory) {
  return candidate === directory || candidate.startsWith(`${directory}/`);
}

function walkFiles(root, relativeDirectory) {
  const absoluteDirectory = path.join(root, relativeDirectory);
  if (!fs.existsSync(absoluteDirectory)) return [];
  const files = [];
  const stack = [absoluteDirectory];
  while (stack.length) {
    const current = stack.pop();
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const absolutePath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(absolutePath);
      } else if (entry.isFile() || entry.isSymbolicLink()) {
        files.push(normalizeRepoPath(path.relative(root, absolutePath)));
      }
    }
  }
  return files.sort();
}

function discoverFollowupArtifacts(root) {
  const exemptPaths = new Set(EXEMPT_PATHS);
  return walkFiles(root, ACTIVE_ROOT).filter((relativePath) =>
    !exemptPaths.has(relativePath)
    && !EXEMPT_DIRECTORIES.some((directory) => isWithin(relativePath, directory))
  );
}

function sha256File(absolutePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(absolutePath)).digest("hex");
}

function validateNativePanelLifecycle(state, metadata, options = {}) {
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

  if (!state || typeof state !== "object" || Array.isArray(state)) {
    addFailure("panel_state_required", "panel review state must be an object");
    return failures;
  }
  if (!metadata || typeof metadata !== "object" || Array.isArray(metadata)) {
    addFailure("followup_metadata_required", "follow-up metadata must be an object");
    return failures;
  }

  const lifecycle = state.instrument_lifecycle;
  if (!lifecycle || typeof lifecycle !== "object" || Array.isArray(lifecycle)) {
    addFailure("required_lifecycle_fields", "instrument_lifecycle is missing");
    return failures;
  }
  if (lifecycle.metadata_file !== FOLLOWUP_METADATA) {
    addFailure(
      "canonical_followup_metadata_link",
      "instrument_lifecycle.metadata_file does not name the canonical follow-up metadata file",
    );
  }

  const pilots = lifecycle.pilot_collections;
  if (!Array.isArray(pilots) || pilots.length !== 1) {
    addFailure(
      "exactly_one_pilot_declaration",
      Array.isArray(pilots)
        ? `found ${pilots.length} pilot declarations`
        : "pilot_collections must contain exactly one declaration",
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
    addFailure("controlled_pilot_collection_state", "unsupported pilot state", values);
  }
  if (!AUDIT_STATES.has(values.audit_state)) {
    addFailure("controlled_item_audit_state", "unsupported audit state", values);
  }
  if (!FOLLOWUP_STATES.has(values.followup_state)) {
    addFailure("controlled_followup_lifecycle_state", "unsupported follow-up state", values);
  }

  const metadataPilot = metadata.current_live_instrument && typeof metadata.current_live_instrument === "object"
    ? metadata.current_live_instrument
    : {};
  for (const field of ["instrument_id", "collection_state", "closure_rule"]) {
    if (pilot[field] !== metadataPilot[field]) {
      addFailure(
        "single_pilot_declaration_consistency",
        `pilot ${field} does not match follow-up metadata`,
        values,
      );
    }
  }
  if (
    pilot.compatibility_status !== PILOT_COMPATIBILITY[values.pilot_state]
    || metadataPilot.status !== pilot.compatibility_status
  ) {
    addFailure(
      "pilot_compatibility_status_consistency",
      "pilot compatibility status does not match collection state",
      values,
    );
  }
  if (!lifecycle.item_level_audit || audit.pilot_instrument_id !== pilot.instrument_id) {
    addFailure(
      "item_audit_targets_current_pilot",
      "item-level audit is missing or targets a different pilot",
      values,
    );
  }

  const expectedFollowup = {
    instrument_id: metadata.instrument_id,
    lifecycle_state: metadata.lifecycle_state,
    compatibility_status: metadata.instrument_status,
    deployment_allowed: metadata.deployment_allowed,
  };
  for (const [field, expected] of Object.entries(expectedFollowup)) {
    if (followup[field] !== expected) {
      addFailure(
        "followup_declaration_consistency",
        `follow-up ${field} does not match canonical metadata`,
        values,
      );
    }
  }
  if (followup.compatibility_status !== FOLLOWUP_COMPATIBILITY[values.followup_state]) {
    addFailure(
      "followup_compatibility_status_consistency",
      "follow-up compatibility status does not match lifecycle state",
      values,
    );
  }

  const prerequisitesSatisfied = values.pilot_state === "closed" && values.audit_state === "accepted";
  if (RESTRICTED_FOLLOWUP_STATES.has(values.followup_state) && !prerequisitesSatisfied) {
    addFailure(
      "followup_deployment_lock",
      "locked, generated, or deployed follow-up requires pilot=closed and audit=accepted",
      values,
    );
  }

  const deploymentExpected = values.followup_state === "deployed";
  if (followup.deployment_allowed !== deploymentExpected || metadata.deployment_allowed !== deploymentExpected) {
    addFailure(
      "deployment_permission_matches_lifecycle",
      "deployment_allowed must be true exactly when lifecycle_state=deployed",
      values,
    );
  }

  const expectedContract = {
    scope_root: ACTIVE_ROOT,
    generated_directory: GENERATED_DIRECTORY,
    deployment_directory: DEPLOYMENT_DIRECTORY,
    exempt_paths: [...EXEMPT_PATHS],
    exempt_directories: [...EXEMPT_DIRECTORIES],
  };
  const contract = metadata.artifact_contract;
  if (!contract || typeof contract !== "object" || Array.isArray(contract)) {
    addFailure("artifact_contract_required", "artifact_contract is missing", values);
  } else if (JSON.stringify(contract) !== JSON.stringify(expectedContract)) {
    addFailure(
      "canonical_artifact_contract",
      "artifact_contract must exactly match the closed active-v2 inventory contract",
      values,
    );
  }

  const artifacts = metadata.tracked_artifacts;
  const byPath = new Map();
  const byRole = new Map();
  if (!Array.isArray(artifacts)) {
    addFailure("tracked_artifacts_required", "tracked_artifacts must be an array", values);
  } else {
    for (const artifact of artifacts) {
      const artifactPath = artifact && normalizeRepoPath(artifact.path);
      const role = artifact && artifact.role;
      const pathDeclarations = byPath.get(artifactPath) || [];
      pathDeclarations.push(artifact);
      byPath.set(artifactPath, pathDeclarations);
      const roleDeclarations = byRole.get(role) || [];
      roleDeclarations.push(artifact);
      byRole.set(role, roleDeclarations);

      if (
        !artifact
        || typeof artifactPath !== "string"
        || artifactPath.length === 0
        || !ARTIFACT_ROLES.has(role)
        || !ARTIFACT_STATES.has(artifact.artifact_state)
        || typeof artifact.deployable !== "boolean"
      ) {
        addFailure(
          "valid_tracked_artifact",
          "artifact requires path, controlled role/state, and deployable boolean",
          values,
          artifact || {},
        );
        continue;
      }
      if (!isWithin(artifactPath, ACTIVE_ROOT)) {
        addFailure(
          "tracked_artifact_inside_scope",
          `tracked artifact must be under ${ACTIVE_ROOT}`,
          values,
          artifact,
        );
      }

      if (SOURCE_ROLES.has(role)) {
        const expectedPath = metadata[SOURCE_ROLE_PATH_FIELDS[role]];
        if (artifactPath !== expectedPath) {
          addFailure(
            "source_role_binds_canonical_path",
            `${role} must bind ${expectedPath}`,
            values,
            artifact,
          );
        }
        if (artifact.artifact_state !== "draft_source" || artifact.deployable !== false) {
          addFailure(
            "source_role_cannot_supply_generated_or_deployed_evidence",
            `${role} must remain non-deployable draft_source evidence`,
            values,
            artifact,
          );
        }
      } else if (role === "generated_instrument") {
        if (!isWithin(artifactPath, GENERATED_DIRECTORY)) {
          addFailure(
            "generated_instrument_uses_canonical_directory",
            `generated instrument must be under ${GENERATED_DIRECTORY}`,
            values,
            artifact,
          );
        }
        const expectedState = deploymentExpected ? "deployed" : "generated";
        if (artifact.artifact_state !== expectedState) {
          addFailure(
            "generated_instrument_has_lifecycle_state",
            `generated instrument must have ${expectedState} state`,
            values,
            artifact,
          );
        }
        if (artifact.deployable !== deploymentExpected) {
          addFailure(
            "generated_instrument_deployability_matches_lifecycle",
            "generated instrument is deployable exactly in deployed lifecycle",
            values,
            artifact,
          );
        }
      } else if (role === "deployment_receipt") {
        if (!isWithin(artifactPath, DEPLOYMENT_DIRECTORY)) {
          addFailure(
            "deployment_receipt_uses_canonical_directory",
            `deployment receipt must be under ${DEPLOYMENT_DIRECTORY}`,
            values,
            artifact,
          );
        }
        if (artifact.artifact_state !== "deployed" || artifact.deployable !== false) {
          addFailure(
            "deployment_receipt_has_deployed_evidence_state",
            "deployment receipt must be non-deployable deployed evidence",
            values,
            artifact,
          );
        }
      }
    }

    for (const [artifactPath, declarations] of byPath) {
      if (!artifactPath || declarations.length !== 1) {
        addFailure(
          "unique_tracked_artifact_declaration",
          `${artifactPath || "<missing path>"} has ${declarations.length} declarations`,
          values,
          { path: artifactPath || null },
        );
      }
    }
    for (const role of SOURCE_ROLES) {
      if ((byRole.get(role) || []).length !== 1) {
        addFailure(
          "exactly_one_source_artifact_per_role",
          `${role} requires exactly one tracked artifact`,
          values,
          { role },
        );
      }
    }

    const generatedArtifacts = byRole.get("generated_instrument") || [];
    const deploymentReceipts = byRole.get("deployment_receipt") || [];
    if (["draft", "locked"].includes(values.followup_state)) {
      if (generatedArtifacts.length || deploymentReceipts.length) {
        addFailure(
          "pre_generation_lifecycle_has_no_generated_or_deployment_artifacts",
          "draft and locked lifecycle states cannot contain generated instruments or deployment receipts",
          values,
        );
      }
    } else if (values.followup_state === "generated") {
      if (generatedArtifacts.length < 1 || deploymentReceipts.length !== 0) {
        addFailure(
          "generated_lifecycle_evidence",
          "generated lifecycle requires a generated instrument and no deployment receipt",
          values,
        );
      }
    } else if (values.followup_state === "deployed") {
      if (generatedArtifacts.length < 1 || deploymentReceipts.length < 1) {
        addFailure(
          "deployed_lifecycle_evidence",
          "deployed lifecycle requires both a deployed generated instrument and a deployment receipt",
          values,
        );
      }
    }
  }

  if (Array.isArray(options.discovered_artifacts) && Array.isArray(artifacts)) {
    const trackedPaths = new Set(
      artifacts
        .filter((artifact) => artifact && typeof artifact.path === "string")
        .map((artifact) => normalizeRepoPath(artifact.path)),
    );
    const discovered = new Set(options.discovered_artifacts.map(normalizeRepoPath));
    for (const artifactPath of discovered) {
      if (!trackedPaths.has(artifactPath)) {
        addFailure(
          "untracked_followup_artifact",
          `active-v2 contains an untracked non-exempt file: ${artifactPath}`,
          values,
          { path: artifactPath },
        );
      }
    }
    for (const artifactPath of trackedPaths) {
      if (!discovered.has(artifactPath)) {
        addFailure(
          "tracked_artifact_exists",
          `tracked artifact does not exist in the closed inventory: ${artifactPath}`,
          values,
          { path: artifactPath },
        );
      }
    }
  }

  return failures;
}

function verifyNativePanelLifecycle(root = DEFAULT_ROOT) {
  const state = readJson(root, PANEL_STATE);
  const metadata = readJson(root, FOLLOWUP_METADATA);
  const discoveredArtifacts = discoverFollowupArtifacts(root);
  const failures = validateNativePanelLifecycle(state, metadata, {
    discovered_artifacts: discoveredArtifacts,
  });
  const lifecycle = state.instrument_lifecycle || {};
  const pilot = Array.isArray(lifecycle.pilot_collections) && lifecycle.pilot_collections.length === 1
    ? lifecycle.pilot_collections[0]
    : {};
  const audit = lifecycle.item_level_audit || {};
  const followup = lifecycle.followup_instrument || {};

  const artifactDigests = [];
  for (const artifact of metadata.tracked_artifacts || []) {
    if (!artifact || typeof artifact.path !== "string") continue;
    const absolutePath = path.join(root, artifact.path);
    if (!fs.existsSync(absolutePath)) continue;
    const stat = fs.lstatSync(absolutePath);
    if (!stat.isFile() || stat.isSymbolicLink()) {
      failures.push({
        invariant: "tracked_artifact_is_regular_file",
        pilot_state: pilot.collection_state ?? null,
        audit_state: audit.state ?? null,
        followup_state: followup.lifecycle_state ?? null,
        artifact,
        canonical_files: {
          pilot_and_audit: PANEL_STATE,
          followup_and_artifacts: FOLLOWUP_METADATA,
        },
        detail: `tracked artifact must be a regular non-symlink file: ${artifact.path}`,
      });
      continue;
    }
    artifactDigests.push({
      path: artifact.path,
      role: artifact.role,
      sha256: sha256File(absolutePath),
    });
  }

  return {
    schema: "canto-span-native-panel-lifecycle-verification-v2",
    pilot_state: pilot.collection_state ?? null,
    audit_state: audit.state ?? null,
    followup_state: followup.lifecycle_state ?? null,
    deployment_allowed: followup.deployment_allowed ?? null,
    tracked_artifacts: Array.isArray(metadata.tracked_artifacts) ? metadata.tracked_artifacts.length : null,
    discovered_artifacts: discoveredArtifacts.length,
    artifact_digests: artifactDigests,
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
  ACTIVE_ROOT,
  PANEL_STATE,
  FOLLOWUP_METADATA,
  GENERATED_DIRECTORY,
  DEPLOYMENT_DIRECTORY,
  EXEMPT_PATHS,
  EXEMPT_DIRECTORIES,
  discoverFollowupArtifacts,
  validateNativePanelLifecycle,
  verifyNativePanelLifecycle,
};
