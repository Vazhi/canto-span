"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");

const {
  KIND_RESEARCH_MODES,
  KINDS,
  PRIORITIES,
  RESEARCH_MODES,
  TRACKS,
  extractPortfolioRouting,
  intakeRoutingCounts,
  locksOverlap,
  validatePortfolioOwnershipBinding,
  validatePortfolioRouting,
} = require("../../../tools/coordination/portfolio-routing");
const {
  extractExactClaim,
  parsePrAuthority,
  resolveIntakeRouting,
} = require("../../../tools/coordination/check-pr");

function validRouting(overrides = {}) {
  return {
    schema: "canto-span-portfolio-routing-v2",
    track: "T2-identity",
    kind: "identity-batch",
    research_mode: "decision-support",
    priority: "P2",
    priority_reason: "The bounded identity package resolves a current registry gap.",
    decision_question: "What permanent identity disposition is justified?",
    dependencies: [],
    informs: ["T5-evidence"],
    read_scope: ["identity registry", "accepted neighboring decisions"],
    write_locks: ["identity:example"],
    prohibited_parallel_writes: ["runtime:example"],
    readiness_gaps: [],
    cancellation_condition: "A newer accepted adjudication fully resolves this record.",
    acceptable_null_outcome: "The record remains retired with no successor UUID.",
    completion_endpoint: "The permanent identity disposition and evidence home are recorded.",
    ...overrides,
  };
}

function discoveryRouting(overrides = {}) {
  return validRouting({
    track: "T5-evidence",
    kind: "research",
    research_mode: "decision-discovery",
    decision_question: null,
    discovery_scope: "A bounded source and collision inventory.",
    discovery_prompts: ["Which findings require a project decision?"],
    write_locks: ["research-discovery:example"],
    prohibited_parallel_writes: ["runtime:example"],
    ...overrides,
  });
}

function executionRouting(overrides = {}) {
  return validRouting({
    track: "T6-runtime",
    kind: "implementation",
    research_mode: null,
    decision_question: null,
    write_locks: ["runtime:example"],
    prohibited_parallel_writes: ["runtime-bundle:global"],
    ...overrides,
  });
}

function routingForKind(kind) {
  if (kind === "research" || kind === "corpus-review") {
    return discoveryRouting({ kind });
  }
  if (["decision", "identity-batch", "survey-audit"].includes(kind)) {
    return validRouting({ kind });
  }
  return executionRouting({ kind });
}

function fenced(label, value) {
  return `\`\`\`${label}\n${JSON.stringify(value, null, 2)}\n\`\`\``;
}

function validTaskIntake(overrides = {}) {
  return {
    schema: "canto-span-task-intake-v2",
    created_by: "chatgpt",
    pickup_target: "chatgpt",
    pickup_status: "active",
    category: "accepted-specification",
    risk: "medium",
    execution_mode: "implementation",
    dependencies: [],
    protected_state: ["merge_authorization"],
    active_pickup_owner: "chatgpt",
    ownership_revision: 1,
    previous_pickup_target: null,
    ownership_reason: "initial-routing",
    ownership_updated_at: "2026-08-02T20:00:00+08:00",
    pickup_allowed: true,
    handoff_status: "no-handoff",
    active_claim_issue: 469,
    active_branch: "agent/example",
    active_pr: 470,
    work_claim_required: true,
    user_merge_approval_required: true,
    codex_self_screen_required: false,
    ...overrides,
  };
}

function validPrBody(overrides = {}) {
  const fields = {
    hiddenClaim: 469,
    visibleClaim: 469,
    intakeIssue: 379,
    activeWorker: "chatgpt",
    ownershipRevision: 2,
    ...overrides,
  };
  return [
    `<!-- coordination-claim: #${fields.hiddenClaim} -->`,
    `Intake issue: #${fields.intakeIssue}`,
    `Work claim: #${fields.visibleClaim}`,
    `Active worker: ${fields.activeWorker}`,
    `Ownership revision: ${fields.ownershipRevision}`,
    `Closes #${fields.visibleClaim}`,
  ].join("\n");
}

test("extracts exactly one exact-label portfolio-routing block", () => {
  const routing = validRouting();
  assert.deepEqual(extractPortfolioRouting(fenced("portfolio-routing", routing)), routing);
  assert.throws(
    () => extractPortfolioRouting(fenced("portfolio-routing-example", routing)),
    /exactly one/,
  );
  assert.throws(
    () => extractPortfolioRouting(fenced("portfolio-routing json", routing)),
    /exactly one/,
  );
});

test("rejects missing, duplicate, and malformed portfolio-routing blocks", () => {
  assert.throws(() => extractPortfolioRouting("no block"), /exactly one/);
  const body = `${fenced("portfolio-routing", validRouting())}\n${fenced("portfolio-routing", validRouting())}`;
  assert.throws(() => extractPortfolioRouting(body), /exactly one/);
  assert.throws(
    () => extractPortfolioRouting("```portfolio-routing\n{not-json}\n```"),
    /invalid portfolio-routing JSON/,
  );
});

test("accepts every supported track, kind, priority, and research mode under the matrix", () => {
  for (const track of TRACKS) {
    assert.deepEqual(validatePortfolioRouting(validRouting({ track })), [], track);
  }
  for (const kind of KINDS) {
    assert.deepEqual(validatePortfolioRouting(routingForKind(kind)), [], kind);
  }
  for (const priority of PRIORITIES) {
    assert.deepEqual(validatePortfolioRouting(validRouting({ priority })), [], priority);
  }
  for (const mode of RESEARCH_MODES) {
    const routing = mode === "decision-support" ? validRouting() : discoveryRouting();
    assert.deepEqual(validatePortfolioRouting(routing), [], mode);
  }
  assert.deepEqual(validatePortfolioRouting(executionRouting()), []);
  assert.deepEqual(Object.keys(KIND_RESEARCH_MODES).sort(), [...KINDS].sort());
});

test("rejects every incompatible kind and research-mode combination", () => {
  for (const kind of KINDS) {
    for (const mode of [null, ...RESEARCH_MODES]) {
      const allowed = KIND_RESEARCH_MODES[kind].has(mode);
      const routing = mode === "decision-discovery"
        ? discoveryRouting({ kind })
        : mode === "decision-support"
          ? validRouting({ kind })
          : executionRouting({ kind });
      const errors = validatePortfolioRouting(routing);
      assert.equal(
        errors.some((error) => error.startsWith(`kind=${kind} requires research_mode`)),
        !allowed,
        `${kind}/${mode}: ${errors}`,
      );
    }
  }
});

test("fails closed for unsupported enums, extra fields, and duplicate arrays", () => {
  const cases = [
    [validRouting({ track: "T99-identity" }), "track must be one of"],
    [validRouting({ kind: "implementation-specification" }), "kind must be one of"],
    [validRouting({ research_mode: "exploration" }), "research_mode must be"],
    [validRouting({ priority: "urgent" }), "priority must be"],
    [validRouting({ unsupported: true }), "unsupported portfolio-routing field"],
    [validRouting({ read_scope: ["registry", "registry"] }), "read_scope must contain unique"],
    [validRouting({ dependencies: [312, 312] }), "dependencies must contain unique"],
  ];
  for (const [routing, expected] of cases) {
    const errors = validatePortfolioRouting(routing);
    assert.ok(errors.some((error) => error.includes(expected)), `${expected}: ${errors}`);
  }
});

test("enforces decision-support fields", () => {
  const missingQuestion = validatePortfolioRouting(validRouting({ decision_question: null }));
  assert.ok(missingQuestion.includes("decision-support requires a non-empty decision_question"));

  const discoveryLeak = validatePortfolioRouting(validRouting({
    discovery_scope: "Not valid for support mode.",
    discovery_prompts: ["Not valid here."],
  }));
  assert.ok(discoveryLeak.includes("decision-support must not declare discovery_scope"));
  assert.ok(discoveryLeak.includes("decision-support must not declare discovery_prompts"));
});

test("enforces decision-discovery scope and prompts", () => {
  const errors = validatePortfolioRouting(discoveryRouting({
    decision_question: "Should not be present?",
    discovery_scope: null,
    discovery_prompts: [],
  }));
  assert.ok(errors.includes("decision-discovery requires decision_question=null"));
  assert.ok(errors.includes("decision-discovery requires a non-empty discovery_scope"));
  assert.ok(errors.includes("discovery_prompts must contain at least one item"));
});

test("enforces null-mode boundaries", () => {
  const errors = validatePortfolioRouting(executionRouting({
    decision_question: "Unexpected question",
    discovery_scope: "Unexpected discovery scope",
    discovery_prompts: ["Unexpected prompt"],
  }));
  assert.ok(errors.includes("research_mode=null requires decision_question=null"));
  assert.ok(errors.includes("research_mode=null must not declare discovery_scope"));
  assert.ok(errors.includes("research_mode=null must not declare discovery_prompts"));
});

test("lock overlap supports hierarchy, wildcards, and namespace-global locks", () => {
  assert.equal(locksOverlap("runtime:AA82", "runtime:AA82"), true);
  assert.equal(locksOverlap("runtime:AA82", "runtime:AA82:children"), true);
  assert.equal(locksOverlap("runtime:AA82", "runtime:AA56"), false);
  assert.equal(locksOverlap("runtime:AA82", "runtime-bundle:global"), false);
  assert.equal(locksOverlap("runtime:*", "runtime:AA82"), true);
  assert.equal(locksOverlap("runtime:global", "runtime:AA82"), true);
  assert.equal(locksOverlap("runtime-bundle:global", "runtime-bundle:artifact"), true);
  assert.equal(locksOverlap("*:global", "runtime:AA82"), true);
  assert.equal(locksOverlap("identity:example", "*:global"), true);
});

test("wildcard and global prohibited locks fail closed", () => {
  for (const prohibited of [
    "identity:example",
    "identity:example:child",
    "identity:*",
    "identity:global",
    "*:global",
  ]) {
    const errors = validatePortfolioRouting(validRouting({
      prohibited_parallel_writes: [prohibited],
    }));
    assert.ok(
      errors.some((error) => error.includes("overlaps prohibited parallel write")),
      `${prohibited}: ${errors}`,
    );
  }
});

test("portfolio routing is planning metadata and never authorizes ownership", () => {
  assert.deepEqual(validatePortfolioOwnershipBinding(), [
    "portfolio-routing is planning metadata only and cannot authorize ownership; active execution requires exactly one valid task-intake-v2 ownership block",
  ]);
});

test("active intake routing accepts exactly one exact task-intake block", () => {
  const taskBody = fenced("task-intake", validTaskIntake());
  const resolved = resolveIntakeRouting(taskBody);
  assert.equal(resolved.mode, "task-intake");
  assert.equal(resolved.metadata.schema, "canto-span-task-intake-v2");
  assert.deepEqual(intakeRoutingCounts(taskBody), { taskIntake: 1, portfolioRouting: 0 });

  for (const misleading of ["task-intake-example", "task-intake json", "my-task-intake"]) {
    const body = fenced(misleading, validTaskIntake());
    assert.deepEqual(intakeRoutingCounts(body), { taskIntake: 0, portfolioRouting: 0 });
    assert.throws(() => resolveIntakeRouting(body), /expected exactly one task-intake ownership block/);
  }
});

test("portfolio-only and mixed ownership modes fail explicitly", () => {
  const portfolioBody = fenced("portfolio-routing", validRouting());
  assert.throws(
    () => resolveIntakeRouting(portfolioBody),
    /planning metadata only and cannot authorize active ownership/,
  );

  const taskBody = fenced("task-intake", validTaskIntake());
  assert.throws(
    () => resolveIntakeRouting(`${portfolioBody}\n${taskBody}`),
    /mixed ownership metadata is invalid/,
  );

  assert.throws(
    () => resolveIntakeRouting("no ownership block"),
    /expected exactly one task-intake ownership block/,
  );
});

test("PR authority requires one coherent marker set", () => {
  assert.deepEqual(parsePrAuthority(validPrBody()), {
    claimIssue: 469,
    intakeIssue: 379,
    activeWorker: "chatgpt",
    ownershipRevision: 2,
  });
  assert.throws(
    () => parsePrAuthority(validPrBody({ visibleClaim: 470 })),
    /contradicts visible Work claim/,
  );
});

test("duplicate PR authority markers fail even when values are identical", () => {
  const base = validPrBody();
  for (const duplicate of [
    "<!-- coordination-claim: #469 -->",
    "Work claim: #469",
    "Intake issue: #379",
    "Active worker: chatgpt",
    "Ownership revision: 2",
  ]) {
    assert.throws(() => parsePrAuthority(`${base}\n${duplicate}`), /must appear exactly once/);
  }
});

test("coordination claim parsing requires the exact fence label", () => {
  const claim = { schema: "canto-span-work-claim-v2" };
  assert.deepEqual(extractExactClaim(fenced("coordination-claim", claim)), claim);
  for (const label of ["coordination-claim-example", "coordination-claim json"]) {
    assert.throws(() => extractExactClaim(fenced(label, claim)), /expected exactly one/);
  }
});
