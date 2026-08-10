#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const {
  LINGUISTIC_STATUSES,
  loadConstructionNotes,
} = require("./construction-notes-lib");

const BASELINE_FIELDS = {
  "Runtime": "runtime_version",
  "Runtime labels": "runtime_labels",
  "Current construction notes": "current_construction_notes",
  "Available construction notes": "available_construction_notes",
  "Parked construction notes": "parked_construction_notes",
  "Retired labels": "retired_labels",
  "Permanent UUID records": "permanent_uuid_records",
  "Expert-adjudicated UUIDs": "expert_adjudicated_uuids",
  "Pending UUID adjudications": "pending_uuid_adjudications",
};

const FIELD_SOURCES = {
  runtime_version: ["manifest.json", "manifest.version"],
  runtime_labels: ["grammar/<linguistic-status>/*.md", "loadConstructionNotes"],
  current_construction_notes: ["grammar/<linguistic-status>/*.md", "loadConstructionNotes"],
  available_construction_notes: ["data/parked-constructions.json", "current notes minus parked records"],
  parked_construction_notes: ["data/parked-constructions.json", "records.length"],
  retired_labels: ["data/construction-identities.json", "records where lifecycle_state=retired"],
  permanent_uuid_records: ["data/construction-identities.json", "records.length"],
  expert_adjudicated_uuids: ["data/construction-identities.json", "records where label_review.review_state=complete"],
  pending_uuid_adjudications: ["data/construction-identities.json", "records where label_review.review_state=pending"],
  promotion_ready: ["data/construction-candidate-readiness.json", "node tools/generate-supported-productive-discovery.js"],
  regression_cases: ["tests/fixtures/regression-snapshots.json", "cases.length"],
  np_subsystem_cases: ["tests/fixtures/np-subsystem.json", "cases.length"],
  construction_assertions: ["tests/construction-test-index.json", "sum(files[].executable_case_count)"],
  construction_test_files: ["tests/construction-test-index.json", "files.length"],
  positive_and_boundary_files: ["tests/construction-test-index.json", "files where state=positive_and_boundary"],
  compatibility_alias_only_files: ["tests/construction-test-index.json", "files where state=compatibility_alias_only"],
};

for (const status of LINGUISTIC_STATUSES) {
  FIELD_SOURCES[`linguistic_status.${status}`] = [
    `grammar/${status}/*.md`,
    "loadConstructionNotes",
  ];
}

function readJson(root, relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));
}

function countBy(records, field) {
  return records.reduce((counts, record) => {
    const value = record[field];
    counts[value] = (counts[value] || 0) + 1;
    return counts;
  }, {});
}

function sortedNumericObject(object = {}) {
  return Object.fromEntries(
    Object.entries(object)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, value]) => [key, Number(value || 0)])
  );
}

function deriveProjectState(root) {
  const manifest = readJson(root, "manifest.json");
  const identities = readJson(root, "data/construction-identities.json");
  const parked = readJson(root, "data/parked-constructions.json");
  const readiness = readJson(root, "data/construction-candidate-readiness.json");
  const regression = readJson(root, "tests/fixtures/regression-snapshots.json");
  const npSubsystem = readJson(root, "tests/fixtures/np-subsystem.json");
  const testIndex = readJson(root, "tests/construction-test-index.json");
  const notes = loadConstructionNotes(root);

  const identityLifecycle = countBy(identities.records, "lifecycle_state");
  const identityReviews = countBy(
    identities.records.map((record) => record.label_review || {}),
    "review_state"
  );
  const statusCounts = Object.fromEntries(
    LINGUISTIC_STATUSES.map((status) => [
      status,
      notes.filter((note) => note.frontmatter.status === status).length,
    ])
  );
  const testStates = countBy(testIndex.files, "state");
  const parkedCount = parked.records.length;

  return {
    runtime_version: `v${manifest.version}`,
    runtime_labels: notes.length,
    current_construction_notes: notes.length,
    available_construction_notes: notes.length - parkedCount,
    parked_construction_notes: parkedCount,
    retired_labels: identityLifecycle.retired || 0,
    permanent_uuid_records: identities.records.length,
    expert_adjudicated_uuids: identityReviews.complete || 0,
    pending_uuid_adjudications: identityReviews.pending || 0,
    linguistic_status: statusCounts,
    discovery_state: sortedNumericObject(readiness.state_counts),
    promotion_ready: readiness.promotion_eligible_now_count,
    regression_cases: regression.cases.length,
    np_subsystem_cases: npSubsystem.cases.length,
    construction_assertions: testIndex.files.reduce(
      (sum, entry) => sum + Number(entry.executable_case_count || 0),
      0
    ),
    construction_test_files: testIndex.files.length,
    positive_and_boundary_files: testStates.positive_and_boundary || 0,
    compatibility_alias_only_files: testStates.compatibility_alias_only || 0,
    canonical_metadata: {
      identity_record_count: identities.record_count,
      identity_current_record_count: identities.current_record_count,
      identity_retired_record_count: identities.retired_record_count,
      readiness_record_count: readiness.record_count,
      readiness_state_counts: readiness.state_counts,
      test_index_active_construction_count: testIndex.active_construction_count,
    },
  };
}

function cleanCell(value) {
  return value
    .trim()
    .replace(/^`|`$/g, "")
    .replace(/^\*\*|\*\*$/g, "")
    .trim();
}

function parseNumber(value) {
  const cleaned = cleanCell(value).replace(/,/g, "");
  return /^\d+$/.test(cleaned) ? Number(cleaned) : null;
}

function tableRows(markdown) {
  const rows = new Map();
  for (const line of markdown.split(/\r?\n/)) {
    const match = line.match(/^\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|$/);
    if (!match) continue;
    const label = cleanCell(match[1]);
    if (label === "Measure" || label === "Status" || label === "Candidate state") continue;
    const values = rows.get(label) || [];
    values.push(cleanCell(match[2]));
    rows.set(label, values);
  }
  return rows;
}

function candidateStateRows(markdown) {
  const marker = "| Candidate state | Records |";
  const start = markdown.indexOf(marker);
  if (start < 0) return new Map();
  const block = markdown.slice(start).split(/\r?\n\s*\r?\n/, 1)[0];
  const rows = new Map();
  for (const line of block.split(/\r?\n/)) {
    const match = line.match(/^\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|$/);
    if (!match) continue;
    const label = cleanCell(match[1]);
    if (label === "Candidate state" || /^-+$/.test(label)) continue;
    const value = cleanCell(match[2]);
    if (/^-+$/.test(value)) continue;
    const values = rows.get(label) || [];
    values.push(value);
    rows.set(label, values);
  }
  return rows;
}

function markerMatches(markdown, pattern, mapMatch) {
  return [...markdown.matchAll(pattern)].map(mapMatch);
}

function parseProjectState(markdown, discoveryStates = []) {
  const rows = tableRows(markdown);
  const discoveryRows = candidateStateRows(markdown);
  const fields = {};

  for (const [label, field] of Object.entries(BASELINE_FIELDS)) {
    fields[field] = rows.get(label) || [];
  }
  for (const status of LINGUISTIC_STATUSES) {
    fields[`linguistic_status.${status}`] = rows.get(status) || [];
  }
  for (const state of discoveryStates) {
    fields[`discovery_state.${state}`] = discoveryRows.get(state) || [];
  }

  fields.promotion_ready = markerMatches(
    markdown,
    /^Promotion-ready remains \*\*(\d[\d,]*)\*\*\.$/gim,
    (match) => match[1]
  );
  fields.regression_cases = markerMatches(
    markdown,
    /^- aggregate regression cases: \*\*(\d[\d,]*)\*\*;$/gim,
    (match) => match[1]
  );
  fields.np_subsystem_cases = markerMatches(
    markdown,
    /^- NP-subsystem cases: \*\*(\d[\d,]*)\*\*;$/gim,
    (match) => match[1]
  );
  const assertionMatches = markerMatches(
    markdown,
    /^- per-construction assertions: \*\*(\d[\d,]*)\*\* across \*\*(\d[\d,]*)\*\* files;$/gim,
    (match) => [match[1], match[2]]
  );
  fields.construction_assertions = assertionMatches.map(([assertions]) => assertions);
  fields.construction_test_files = assertionMatches.map(([, files]) => files);
  const coverageMatches = markerMatches(
    markdown,
    /^- current test coverage: (\d[\d,]*) positive-and-boundary and (\d[\d,]*)\s+compatibility-alias-only construction files?;$/gim,
    (match) => [match[1], match[2]]
  );
  fields.positive_and_boundary_files = coverageMatches.map(([positive]) => positive);
  fields.compatibility_alias_only_files = coverageMatches.map(([, aliases]) => aliases);

  return fields;
}

function flattenDerived(derived) {
  const flat = { ...derived };
  delete flat.linguistic_status;
  delete flat.discovery_state;
  delete flat.canonical_metadata;
  for (const [status, count] of Object.entries(derived.linguistic_status)) {
    flat[`linguistic_status.${status}`] = count;
  }
  for (const [state, count] of Object.entries(derived.discovery_state)) {
    flat[`discovery_state.${state}`] = count;
  }
  return flat;
}

function sourceFor(field) {
  if (field.startsWith("discovery_state.")) {
    return {
      source: "data/construction-candidate-readiness.json",
      command: "node tools/generate-supported-productive-discovery.js",
    };
  }
  const [source, command] = FIELD_SOURCES[field] || ["canonical derived state", "verify-project-state"];
  return { source, command };
}

function fieldFailure(type, field, declared, derived) {
  return {
    type,
    field,
    declared,
    derived,
    ...sourceFor(field),
  };
}

function invariantFailure(field, declared, derived, source, command) {
  return { type: "arithmetic_invariant", field, declared, derived, source, command };
}

function compareProjectState(markdown, derived) {
  const discoveryStates = Object.keys(derived.discovery_state || {});
  const declared = parseProjectState(markdown, discoveryStates);
  const declaredDiscoveryRows = candidateStateRows(markdown);
  const canonical = flattenDerived(derived);
  const failures = [];

  for (const [field, expected] of Object.entries(canonical)) {
    const values = declared[field] || [];
    if (values.length === 0) {
      failures.push(fieldFailure("missing_declared_field", field, null, expected));
      continue;
    }
    if (values.length > 1) {
      failures.push(fieldFailure("duplicate_declared_field", field, values, expected));
      continue;
    }
    const actual = field === "runtime_version" ? cleanCell(values[0]) : parseNumber(values[0]);
    if (actual !== expected) {
      failures.push(fieldFailure("stale_declared_field", field, actual, expected));
    }
  }

  const canonicalDiscoveryStates = new Set(discoveryStates);
  for (const [state, values] of declaredDiscoveryRows.entries()) {
    if (canonicalDiscoveryStates.has(state)) continue;
    failures.push(fieldFailure(
      "unexpected_declared_discovery_state",
      `discovery_state.${state}`,
      values,
      null
    ));
  }

  const statusTotal = Object.values(derived.linguistic_status).reduce((sum, value) => sum + value, 0);
  const discoveryTotal = Object.values(derived.discovery_state).reduce((sum, value) => sum + value, 0);
  const metadata = derived.canonical_metadata || {};
  const invariants = [
    {
      field: "identity_current_plus_retired_equals_permanent",
      declared: `${metadata.identity_current_record_count}+${metadata.identity_retired_record_count}`,
      derived: derived.permanent_uuid_records,
      actual: Number(metadata.identity_current_record_count) + Number(metadata.identity_retired_record_count),
      source: "data/construction-identities.json",
      command: "node tools/verify-construction-identities.js",
    },
    {
      field: "adjudicated_plus_pending_equals_permanent",
      declared: `${derived.expert_adjudicated_uuids}+${derived.pending_uuid_adjudications}`,
      derived: derived.permanent_uuid_records,
      actual: derived.expert_adjudicated_uuids + derived.pending_uuid_adjudications,
      source: "data/construction-identities.json",
      command: "records grouped by label_review.review_state",
    },
    {
      field: "linguistic_statuses_equal_current_notes",
      declared: statusTotal,
      derived: derived.current_construction_notes,
      actual: statusTotal,
      source: "grammar/<linguistic-status>/*.md",
      command: "loadConstructionNotes",
    },
    {
      field: "available_plus_parked_equals_current_notes",
      declared: `${derived.available_construction_notes}+${derived.parked_construction_notes}`,
      derived: derived.current_construction_notes,
      actual: derived.available_construction_notes + derived.parked_construction_notes,
      source: "data/parked-constructions.json",
      command: "node tools/verify-parked-constructions.js",
    },
    {
      field: "discovery_states_equal_permanent_records",
      declared: discoveryTotal,
      derived: derived.permanent_uuid_records,
      actual: discoveryTotal,
      source: "data/construction-candidate-readiness.json",
      command: "node tools/generate-supported-productive-discovery.js",
    },
    {
      field: "test_files_equal_current_notes",
      declared: derived.construction_test_files,
      derived: derived.current_construction_notes,
      actual: derived.construction_test_files,
      source: "tests/construction-test-index.json",
      command: "node tools/sync-construction-test-metadata.js --check",
    },
  ];

  for (const invariant of invariants) {
    if (invariant.actual !== invariant.derived) {
      failures.push(invariantFailure(
        invariant.field,
        invariant.declared,
        invariant.derived,
        invariant.source,
        invariant.command
      ));
    }
  }

  const metadataChecks = [
    ["identity_record_count_matches_records", metadata.identity_record_count, derived.permanent_uuid_records, "data/construction-identities.json"],
    ["identity_current_count_matches_notes", metadata.identity_current_record_count, derived.current_construction_notes, "data/construction-identities.json"],
    ["identity_retired_count_matches_records", metadata.identity_retired_record_count, derived.retired_labels, "data/construction-identities.json"],
    ["readiness_record_count_matches_records", metadata.readiness_record_count, derived.permanent_uuid_records, "data/construction-candidate-readiness.json"],
    ["test_index_active_count_matches_files", metadata.test_index_active_construction_count, derived.construction_test_files, "tests/construction-test-index.json"],
  ];
  for (const [field, actual, expected, source] of metadataChecks) {
    if (actual !== expected) {
      failures.push(invariantFailure(field, actual, expected, source, "canonical metadata consistency"));
    }
  }

  return {
    schema: "canto-span-project-state-verification-v1",
    status: failures.length === 0 ? "PASS" : "FAIL",
    checked_fields: Object.keys(canonical).length,
    canonical_values: canonical,
    failures,
    ignored_scope: "Unmarked expert prose and policy text are intentionally not interpreted.",
  };
}

function verifyProjectState(root) {
  const markdown = fs.readFileSync(path.join(root, "docs/current/PROJECT-STATE.md"), "utf8");
  return compareProjectState(markdown, deriveProjectState(root));
}

if (require.main === module) {
  const root = path.resolve(__dirname, "..");
  try {
    const result = verifyProjectState(root);
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
    process.exitCode = result.status === "PASS" ? 0 : 1;
  } catch (error) {
    process.stderr.write(`${JSON.stringify({
      schema: "canto-span-project-state-verification-v1",
      status: "FAIL",
      failures: [{
        type: "canonical_source_error",
        field: null,
        declared: null,
        derived: null,
        source: "canonical project-state inputs",
        command: "node tools/verify-project-state.js",
        detail: error.message,
      }],
    }, null, 2)}\n`);
    process.exitCode = 1;
  }
}

module.exports = {
  BASELINE_FIELDS,
  candidateStateRows,
  compareProjectState,
  deriveProjectState,
  parseProjectState,
  verifyProjectState,
};
