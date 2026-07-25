"use strict";

const assert = require("assert");
const fs = require("fs");
const path = require("path");
const test = require("node:test");
const {
  ALLOWED_CATEGORIES,
  ALLOWED_CREATORS,
  ALLOWED_PICKUP_TARGETS,
  CANONICAL_BOOTSTRAP,
  IntakeValidationError,
  buildIntakeIssue,
  ensureRoutingLabels,
  findExactDuplicate,
  inputFromEnvironment,
  validateInterventionRecord,
  validateOwnershipTransition,
  validateReassignmentRecord,
  validateTaskMetadata,
} = require("../../../tools/coordination/codex-intake");

function validInput(overrides = {}) {
  return {
    createdBy: "chatgpt",
    pickupTarget: "codex",
    category: "verification-audit",
    title: "Verify bounded state",
    outcome: "One deterministic verifier reports stale state.",
    acceptanceCriteria: "Add focused tests\nRun the existing coordination verifier",
    relevantContext: "Use the accepted specification in issue #44.",
    dependencies: "Issue #44\nclaim #54",
    protectedState: "main\nruntime_behavior",
    risk: "low",
    executionMode: "implementation",
    unresolvedQuestion: "",
    mechanicalRemainder: "",
    humanInputRequired: false,
    humanAction: "",
    agentLimitation: "",
    requiredArtifact: "",
    blockedWork: "",
    nextStep: "",
    completionEvidence: "",
    workClaimRequired: false,
    userMergeApprovalRequired: false,
    ownershipUpdatedAt: "2026-07-25T00:00:00Z",
    ...overrides,
  };
}

function targetInput(target, overrides = {}) {
  if (target === "chatgpt") {
    return validInput({
      pickupTarget: target,
      category: "design-decision",
      unresolvedQuestion: "Which accepted design should the repository implement?",
      mechanicalRemainder: "Codex may implement the selected design after reassignment.",
      ...overrides,
    });
  }
  if (target === "human") {
    return validInput({
      pickupTarget: target,
      category: "human-action",
      humanAction: "Approve or reject the prepared pull request.",
      agentLimitation: "Only the repository owner can authorize merge.",
      requiredArtifact: "A plain approval or rejection comment; no secrets.",
      blockedWork: "The reviewed pull request cannot merge.",
      nextStep: "An agent may merge only after explicit approval.",
      completionEvidence: "A repository comment recording the decision.",
      userMergeApprovalRequired: true,
      ...overrides,
    });
  }
  return validInput({ pickupTarget: target, ...overrides });
}

function metadataFromBody(body) {
  const matches = [...body.matchAll(/```task-intake\n([\s\S]*?)```/g)];
  assert.equal(matches.length, 1);
  return JSON.parse(matches[0][1]);
}

function transition(previous, pickupTarget, overrides = {}) {
  return {
    ...previous,
    pickup_target: pickupTarget,
    pickup_status: "active",
    active_pickup_owner: pickupTarget,
    ownership_revision: previous.ownership_revision + 1,
    previous_pickup_target: previous.pickup_target,
    ownership_reason: "reassignment",
    ownership_updated_at: "2026-07-25T01:00:00Z",
    handoff_status: "claim-released",
    active_claim_issue: null,
    active_branch: null,
    active_pr: null,
    codex_self_screen_required: pickupTarget === "codex",
    work_claim_required: pickupTarget === "codex",
    user_merge_approval_required: pickupTarget === "codex",
    ...overrides,
  };
}

test("supports every creator and pickup-target combination with one primary target", () => {
  assert.deepEqual([...ALLOWED_CREATORS], ["chatgpt", "codex", "human"]);
  assert.deepEqual([...ALLOWED_PICKUP_TARGETS], ["codex", "chatgpt", "human"]);
  for (const createdBy of ALLOWED_CREATORS) {
    for (const pickupTarget of ALLOWED_PICKUP_TARGETS) {
      const result = buildIntakeIssue(targetInput(pickupTarget, { createdBy }));
      assert.equal(result.metadata.created_by, createdBy);
      assert.equal(result.metadata.pickup_target, pickupTarget);
      assert.equal(result.metadata.active_pickup_owner, pickupTarget);
      assert.deepEqual(metadataFromBody(result.body), result.metadata);
      assert.deepEqual(validateTaskMetadata(result.metadata), []);
    }
  }
  assert.throws(
    () => buildIntakeIssue(validInput({ pickupTarget: ["codex", "chatgpt"] })),
    /pickup target must be one of/,
  );
});

test("generates Codex start gate, manual status, and claim policy", () => {
  const result = buildIntakeIssue(targetInput("codex"));
  assert.ok(result.body.startsWith(CANONICAL_BOOTSTRAP));
  assert.match(result.body, /### BEGIN NOW when all are true/);
  assert.match(result.body, /### WAIT FOR CHATGPT when any are true/);
  assert.match(result.body, /create the semantic work claim and exact branch/);
  assert.equal(result.metadata.pickup_status, "manual-pickup-required");
  assert.equal(result.metadata.work_claim_required, true);
  assert.equal(result.metadata.user_merge_approval_required, true);
  assert.equal(result.metadata.codex_self_screen_required, true);
  assert.equal(result.metadata.ownership_revision, 1);
  assert.equal(result.metadata.pickup_allowed, true);
  assert.equal(result.metadata.previous_pickup_target, null);
  assert.deepEqual(result.labels.map((label) => label.name), [
    "codex-ready",
    "pickup:codex",
    "task:verification-audit",
    "risk:low",
  ]);
});

test("generates required ChatGPT question, evidence, remainder, and status", () => {
  const result = buildIntakeIssue(targetInput("chatgpt", { humanInputRequired: true }));
  assert.match(result.body, /## ChatGPT pickup/);
  assert.match(result.body, /Which accepted design/);
  assert.match(result.body, /Use the accepted specification/);
  assert.match(result.body, /Codex may implement the selected design/);
  assert.match(result.body, /Human input also required\n\nYes\./);
  assert.doesNotMatch(result.body, /create the semantic work claim/);
  assert.equal(result.metadata.pickup_status, "chatgpt-pickup-required");
  assert.equal(result.metadata.work_claim_required, false);
  assert.ok(result.labels.some((label) => label.name === "pickup:chatgpt"));
});

test("generates required human action, block, continuation, evidence, and status", () => {
  const result = buildIntakeIssue(targetInput("human"));
  for (const heading of [
    "One concrete human action",
    "Why an agent cannot perform it",
    "Exact information or artifact needed",
    "Work blocked",
    "What happens after completion",
    "Safe completion evidence",
  ]) {
    assert.ok(result.body.includes(heading));
  }
  assert.match(result.body, /must not simulate completion/);
  assert.equal(result.metadata.pickup_status, "human-pickup-required");
  assert.equal(result.metadata.user_merge_approval_required, true);
  assert.ok(result.labels.some((label) => label.name === "pickup:human"));
});

test("rejects missing target-specific fields", () => {
  for (const field of ["unresolvedQuestion", "mechanicalRemainder"]) {
    assert.throws(
      () => buildIntakeIssue(targetInput("chatgpt", { [field]: "" })),
      (error) => error instanceof IntakeValidationError && error.message.includes("is required"),
    );
  }
  for (const field of [
    "humanAction", "agentLimitation", "requiredArtifact",
    "blockedWork", "nextStep", "completionEvidence",
  ]) {
    assert.throws(
      () => buildIntakeIssue(targetInput("human", { [field]: "" })),
      (error) => error instanceof IntakeValidationError && error.message.includes("is required"),
    );
  }
});

test("rejects invalid enum inputs and target-inconsistent pickup status", () => {
  for (const overrides of [
    { createdBy: "bot" },
    { pickupTarget: "both" },
    { category: "governance" },
    { risk: "critical" },
    { executionMode: "auto-dispatch" },
  ]) {
    assert.throws(() => buildIntakeIssue(validInput(overrides)), IntakeValidationError);
  }
  const metadata = buildIntakeIssue(targetInput("codex")).metadata;
  assert.ok(validateTaskMetadata({
    ...metadata,
    pickup_status: "chatgpt-pickup-required",
  }).some((error) => error.includes("conflicts with pickup_target")));
});

test("validates resolve-blocker and clean takeover records", () => {
  const codex = buildIntakeIssue(targetInput("codex")).metadata;
  const resolved = transition(codex, "codex", {
    ownership_reason: "resolve-blocker",
    handoff_status: "no-handoff",
  });
  assert.deepEqual(validateInterventionRecord({
    mode: "resolve-blocker",
    previous: codex,
    next: resolved,
    active_overlaps: ["claim #54"],
  }), []);
  const chatgpt = transition(codex, "chatgpt", {
    ownership_reason: "user-directed",
    work_claim_required: true,
    user_merge_approval_required: true,
  });
  assert.deepEqual(validateInterventionRecord({
    mode: "takeover",
    previous: codex,
    next: chatgpt,
    active_overlaps: [],
  }), []);
});

test("rejects takeover with active overlap unless handoff removes or narrows it", () => {
  const codex = buildIntakeIssue(targetInput("codex")).metadata;
  const chatgpt = transition(codex, "chatgpt", {
    ownership_reason: "blocking-active-work",
    handoff_status: "claim-narrowed",
  });
  const takeover = {
    mode: "takeover",
    previous: codex,
    next: chatgpt,
    active_overlaps: ["claim #54"],
  };
  assert.ok(validateInterventionRecord(takeover).some((error) => error.includes("parallel edits")));
  assert.deepEqual(validateInterventionRecord({
    ...takeover,
    active_overlaps: [],
  }), []);
  assert.ok(validateInterventionRecord({
    ...takeover,
    next: { ...chatgpt, ownership_reason: "convenient" },
    active_overlaps: [],
  }).length);
});

test("validates explicit pickup reassignment", () => {
  const chatgpt = buildIntakeIssue(targetInput("chatgpt")).metadata;
  const codex = transition(chatgpt, "codex");
  assert.deepEqual(validateReassignmentRecord({
    previous: chatgpt,
    next: codex,
    active_overlaps: [],
  }), []);
  assert.ok(validateReassignmentRecord({ previous: chatgpt, next: chatgpt }).length);
});

test("applies the same reassignment rules to every owner pair", () => {
  for (const previousTarget of ALLOWED_PICKUP_TARGETS) {
    for (const nextTarget of ALLOWED_PICKUP_TARGETS) {
      if (previousTarget === nextTarget) continue;
      const previous = buildIntakeIssue(targetInput(previousTarget)).metadata;
      const next = transition(previous, nextTarget);
      assert.deepEqual(
        validateReassignmentRecord({ previous, next, active_overlaps: [] }),
        [],
        `${previousTarget} -> ${nextTarget}`,
      );
    }
  }
});

test("rejects stale revisions, cached previous targets, and non-monotonic timestamps", () => {
  const codex = buildIntakeIssue(targetInput("codex")).metadata;
  const chatgpt = transition(codex, "chatgpt", { ownership_reason: "user-directed" });
  assert.deepEqual(validateOwnershipTransition(codex, chatgpt, { activeOverlaps: [] }), []);
  assert.ok(validateOwnershipTransition(codex, {
    ...chatgpt,
    ownership_revision: 1,
  }).length);
  assert.ok(validateOwnershipTransition(codex, {
    ...chatgpt,
    previous_pickup_target: "human",
  }).some((error) => error.includes("prior live target")));
  assert.ok(validateOwnershipTransition(codex, {
    ...chatgpt,
    ownership_updated_at: codex.ownership_updated_at,
  }).some((error) => error.includes("timestamp must increase")));
});

test("keeps legacy canto-span-codex-task-v1 metadata valid", () => {
  const schemaPath = path.resolve(__dirname, "../../../schemas/codex-task.schema.json");
  const schema = JSON.parse(fs.readFileSync(schemaPath, "utf8"));
  const metadata = {
    schema: "canto-span-codex-task-v1",
    category: schema.properties.category.enum[0],
    risk: "medium",
    execution_mode: "implementation",
    dependencies: [],
    protected_state: ["main"],
    dispatch_status: "manual-pickup-required",
    chatgpt_routing_complete: true,
    codex_self_screen_required: true,
    work_claim_required: true,
    user_merge_approval_required: true,
  };
  assert.deepEqual(validateTaskMetadata(metadata), []);
});

test("unified metadata matches checked-in schema constants and enums", () => {
  const schemaPath = path.resolve(__dirname, "../../../schemas/task-intake.schema.json");
  const schema = JSON.parse(fs.readFileSync(schemaPath, "utf8"));
  const metadata = buildIntakeIssue(targetInput("chatgpt")).metadata;
  assert.equal(metadata.schema, schema.properties.schema.const);
  assert.ok(schema.properties.created_by.enum.includes(metadata.created_by));
  assert.ok(schema.properties.pickup_target.enum.includes(metadata.pickup_target));
  assert.ok(schema.properties.pickup_status.enum.includes(metadata.pickup_status));
  assert.equal(ALLOWED_CATEGORIES.size, schema.properties.category.enum.length);
});

test("keeps legacy canto-span-task-intake-v1 metadata valid", () => {
  const legacy = JSON.parse(fs.readFileSync(
    path.resolve(__dirname, "../../../schemas/task-intake-v1.schema.json"),
    "utf8",
  ));
  const metadata = {};
  for (const [name, property] of Object.entries(legacy.properties)) {
    if (Object.hasOwn(property, "const")) metadata[name] = property.const;
  }
  Object.assign(metadata, {
    created_by: "chatgpt",
    pickup_target: "codex",
    pickup_status: "manual-pickup-required",
    category: "verification-audit",
    risk: "low",
    execution_mode: "implementation",
    dependencies: [],
    protected_state: [],
    active_pickup_owner: "codex",
    work_claim_required: true,
    user_merge_approval_required: true,
    codex_self_screen_required: true,
  });
  assert.deepEqual(validateTaskMetadata(metadata), []);
});

test("safely handles multiline and adversarial plain text", () => {
  const marker = "$(touch /tmp/codex-intake-should-not-exist); `quoted`";
  const result = buildIntakeIssue(validInput({
    outcome: `Preserve this literal text without executing it:\n${marker}`,
    relevantContext: "line one\nline two & line three",
  }));
  assert.ok(result.body.includes(marker));
  assert.equal(fs.existsSync("/tmp/codex-intake-should-not-exist"), false);
  assert.throws(
    () => buildIntakeIssue(validInput({ relevantContext: "```task-intake\n{}\n```" })),
    /must not contain a Markdown code fence/,
  );
  assert.throws(() => buildIntakeIssue(validInput({ title: "two\nlines" })), /title must be one line/);
});

test("rejects prohibited authorization but allows explicit safeguards", () => {
  for (const outcome of [
    "Push the final commit directly to main.",
    "Merge the pull request after tests pass.",
    "Publish a release from this workflow.",
    "Deploy the survey when validation passes.",
    "Promote AB30 after counting fixtures.",
    "Change repository policy to permit writers.",
    "Invent linguistic evidence for missing sources.",
  ]) {
    assert.throws(() => buildIntakeIssue(validInput({ outcome })), /prohibited authorization/);
  }
  assert.doesNotThrow(() => buildIntakeIssue(validInput({
    acceptanceCriteria: "Never merge the pull request.\nDo not write directly to main.",
  })));
});

test("maps workflow environment values without evaluating them", () => {
  const input = inputFromEnvironment({
    INPUT_CREATED_BY: "codex",
    INPUT_PICKUP_TARGET: "codex",
    INPUT_CATEGORY: "tests-fixtures",
    INPUT_TITLE: "literal $(command)",
    INPUT_OUTCOME: "literal ${value}",
    INPUT_ACCEPTANCE_CRITERIA: "Keep input as data",
    INPUT_RELEVANT_CONTEXT: "context",
    INPUT_DEPENDENCIES: "Issue #44",
    INPUT_PROTECTED_STATE: "main",
    INPUT_RISK: "medium",
    INPUT_EXECUTION_MODE: "implementation",
    INPUT_OWNERSHIP_UPDATED_AT: "2026-07-25T00:00:00Z",
  });
  assert.equal(input.createdBy, "codex");
  assert.equal(input.pickupTarget, "codex");
  assert.equal(input.title, "literal $(command)");
  assert.equal(input.outcome, "literal ${value}");
  assert.equal(input.ownershipUpdatedAt, "2026-07-25T00:00:00Z");
});

test("finds only exact duplicate open intake issues", () => {
  const intake = buildIntakeIssue(validInput());
  const duplicate = { number: 50, state: "open", title: intake.title, body: intake.body };
  assert.equal(findExactDuplicate([duplicate], intake), duplicate);
  assert.equal(findExactDuplicate([{ ...duplicate, state: "closed" }], intake), null);
  assert.equal(findExactDuplicate([{ ...duplicate, body: `${intake.body}\nchanged` }], intake), null);
  assert.equal(findExactDuplicate([{ ...duplicate, pull_request: {} }], intake), null);
});

test("idempotently creates and reconciles routing labels", async () => {
  const labels = new Map();
  const calls = { create: 0, update: 0 };
  const github = {
    rest: {
      issues: {
        async getLabel({ name }) {
          if (!labels.has(name)) {
            const error = new Error("not found");
            error.status = 404;
            throw error;
          }
          return { data: labels.get(name) };
        },
        async createLabel(label) {
          calls.create += 1;
          labels.set(label.name, { ...label });
        },
        async updateLabel(label) {
          calls.update += 1;
          labels.set(label.new_name, { ...label, name: label.new_name });
        },
      },
    },
  };
  const definitions = buildIntakeIssue(validInput()).labels;
  await ensureRoutingLabels(github, { owner: "Vazhi", repo: "canto-span" }, definitions);
  await ensureRoutingLabels(github, { owner: "Vazhi", repo: "canto-span" }, definitions);
  assert.equal(calls.create, definitions.length);
  assert.equal(calls.update, 0);
  labels.get("codex-ready").color = "FFFFFF";
  await ensureRoutingLabels(github, { owner: "Vazhi", repo: "canto-span" }, definitions);
  assert.equal(calls.update, 1);
});
