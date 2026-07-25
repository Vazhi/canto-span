"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");
const {
  compareProjectState,
  verifyProjectState,
} = require("../../../tools/verify-project-state");

function fixtureDerived() {
  return {
    runtime_version: "v1.2.3",
    runtime_labels: 3,
    current_construction_notes: 3,
    available_construction_notes: 2,
    parked_construction_notes: 1,
    retired_labels: 1,
    permanent_uuid_records: 4,
    expert_adjudicated_uuids: 1,
    pending_uuid_adjudications: 3,
    linguistic_status: {
      supported_productive: 0,
      provisional_reaudit: 0,
      provisional: 0,
      research_pending: 1,
      unsupported_generalization: 1,
      lexicalized_only: 0,
      parser_heuristic: 1,
    },
    discovery_state: {
      boundary_ready: 1,
      source_supported: 1,
      narrowing_candidate: 0,
      excluded_nonlanguage: 0,
      lexicalized_review: 0,
      retired_evidence_rehome_candidate: 1,
      retired_research_gap: 1,
    },
    promotion_ready: 0,
    regression_cases: 10,
    np_subsystem_cases: 2,
    construction_assertions: 30,
    construction_test_files: 3,
    positive_and_boundary_files: 2,
    compatibility_alias_only_files: 1,
    canonical_metadata: {
      identity_record_count: 4,
      identity_current_record_count: 3,
      identity_retired_record_count: 1,
      readiness_record_count: 4,
      test_index_active_construction_count: 3,
    },
  };
}

function fixtureMarkdown() {
  return `# Project state

## Baseline

| Measure | Current value |
|---|---:|
| Runtime | v1.2.3 |
| Runtime labels | 3 |
| Current construction notes | 3 |
| Available construction notes | 2 |
| Parked construction notes | 1 |
| Retired labels | 1 |
| Permanent UUID records | 4 |
| Expert-adjudicated UUIDs | 1 |
| Pending UUID adjudications | 3 |

## Linguistic-status inventory

| Status | Records |
|---|---:|
| \`supported_productive\` | 0 |
| \`provisional_reaudit\` | 0 |
| \`provisional\` | 0 |
| \`research_pending\` | 1 |
| \`unsupported_generalization\` | 1 |
| \`lexicalized_only\` | 0 |
| \`parser_heuristic\` | 1 |

## Expert interpretation

This prose says that 999 records might someday be useful. It is not a marked
machine-derived field and must remain outside verifier scope.

## Discovery and corpus state

| Candidate state | Records |
|---|---:|
| \`boundary_ready\` | 1 |
| \`source_supported\` | 1 |
| \`narrowing_candidate\` | 0 |
| \`excluded_nonlanguage\` | 0 |
| \`lexicalized_review\` | 0 |
| \`retired_evidence_rehome_candidate\` | 1 |
| \`retired_research_gap\` | 1 |

Promotion-ready remains **0**.

## Verification baseline

- aggregate regression cases: **10**;
- NP-subsystem cases: **2**;
- per-construction assertions: **30** across **3** files;
- current test coverage: 2 positive-and-boundary and 1
  compatibility-alias-only construction file;
`;
}

test("consistent fixture passes while unrelated expert prose is ignored", () => {
  const result = compareProjectState(fixtureMarkdown(), fixtureDerived());
  assert.equal(result.status, "PASS");
  assert.deepEqual(result.failures, []);
});

for (const mismatch of [
  {
    name: "runtime version",
    markdown: (text) => text.replace("| Runtime | v1.2.3 |", "| Runtime | v1.2.2 |"),
    field: "runtime_version",
  },
  {
    name: "baseline",
    markdown: (text) => text.replace("| Runtime labels | 3 |", "| Runtime labels | 2 |"),
    field: "runtime_labels",
  },
  {
    name: "linguistic status",
    markdown: (text) => text.replace("| `research_pending` | 1 |", "| `research_pending` | 0 |"),
    field: "linguistic_status.research_pending",
  },
  {
    name: "discovery state",
    markdown: (text) => text.replace("| `boundary_ready` | 1 |", "| `boundary_ready` | 0 |"),
    field: "discovery_state.boundary_ready",
  },
  {
    name: "verification count",
    markdown: (text) => text.replace("aggregate regression cases: **10**", "aggregate regression cases: **9**"),
    field: "regression_cases",
  },
]) {
  test(`${mismatch.name} mismatch reports declared, derived, source, and command`, () => {
    const result = compareProjectState(mismatch.markdown(fixtureMarkdown()), fixtureDerived());
    const failure = result.failures.find((entry) => entry.field === mismatch.field);
    assert.equal(failure.type, "stale_declared_field");
    assert.notEqual(failure.declared, failure.derived);
    assert.ok(failure.source);
    assert.ok(failure.command);
  });
}

test("arithmetic invariant failure is precise", () => {
  const derived = fixtureDerived();
  derived.pending_uuid_adjudications = 2;
  const result = compareProjectState(
    fixtureMarkdown().replace("| Pending UUID adjudications | 3 |", "| Pending UUID adjudications | 2 |"),
    derived
  );
  assert.ok(result.failures.some((entry) =>
    entry.type === "arithmetic_invariant" &&
    entry.field === "adjudicated_plus_pending_equals_permanent"
  ));
});

test("missing required row is reported", () => {
  const markdown = fixtureMarkdown().replace("| Parked construction notes | 1 |\n", "");
  const result = compareProjectState(markdown, fixtureDerived());
  assert.ok(result.failures.some((entry) =>
    entry.type === "missing_declared_field" &&
    entry.field === "parked_construction_notes"
  ));
});

test("duplicate required row is reported", () => {
  const markdown = fixtureMarkdown().replace(
    "| Runtime labels | 3 |",
    "| Runtime labels | 3 |\n| Runtime labels | 3 |"
  );
  const result = compareProjectState(markdown, fixtureDerived());
  assert.ok(result.failures.some((entry) =>
    entry.type === "duplicate_declared_field" &&
    entry.field === "runtime_labels"
  ));
});

test("unrelated prose changes do not affect verification", () => {
  const markdown = fixtureMarkdown().replace(
    "This prose says that 999 records might someday be useful.",
    "This prose was freely rewritten without changing any explicit metric marker."
  );
  assert.equal(compareProjectState(markdown, fixtureDerived()).status, "PASS");
});

test("expert prose is not interpreted as machine authority", () => {
  const markdown = fixtureMarkdown().replace(
    "machine-derived field and must remain outside verifier scope.",
    "machine-derived field; it asserts Runtime labels | 999 and promotion-ready 999."
  );
  assert.equal(compareProjectState(markdown, fixtureDerived()).status, "PASS");
});

test("current repository project state passes", () => {
  const root = require("node:path").resolve(__dirname, "../../..");
  const result = verifyProjectState(root);
  assert.equal(result.status, "PASS", JSON.stringify(result.failures, null, 2));
});
