"use strict";

const assert = require("assert");
const fs = require("fs");
const path = require("path");
const test = require("node:test");
const {
  ALLOWED_CATEGORIES,
  CANONICAL_BOOTSTRAP,
  IntakeValidationError,
  buildIntakeIssue,
  ensureRoutingLabels,
  findExactDuplicate,
  inputFromEnvironment,
  validateTaskMetadata,
} = require("../../../tools/coordination/codex-intake");

function validInput(overrides = {}) {
  return {
    category: "verification-audit",
    title: "Codex: verify bounded state",
    outcome: "One deterministic verifier reports stale state.",
    acceptanceCriteria: "Add focused tests\nRun the existing coordination verifier",
    relevantContext: "Use the accepted specification in issue #40.",
    protectedState: "main\nruntime_behavior",
    risk: "low",
    executionMode: "implementation",
    ...overrides,
  };
}

function metadataFromBody(body) {
  const matches = [...body.matchAll(/```codex-task\n([\s\S]*?)```/g)];
  assert.equal(matches.length, 1);
  return JSON.parse(matches[0][1]);
}

test("builds one canonical validated Codex intake issue", () => {
  const result = buildIntakeIssue(validInput());
  assert.equal(result.title, "Codex: verify bounded state");
  assert.ok(result.body.startsWith(CANONICAL_BOOTSTRAP));
  assert.match(result.body, /## Outcome/);
  assert.match(result.body, /- Add focused tests/);
  assert.deepEqual(metadataFromBody(result.body), result.metadata);
  assert.deepEqual(validateTaskMetadata(result.metadata), []);
  assert.deepEqual(result.metadata.protected_state, ["main", "runtime_behavior"]);
  assert.deepEqual(result.labels.map((label) => label.name), [
    "codex-ready",
    "codex:verification-audit",
    "risk:low",
  ]);
});

test("accepts every canonical Codex-ready category", () => {
  assert.equal(ALLOWED_CATEGORIES.size, 10);
  for (const category of ALLOWED_CATEGORIES) {
    const result = buildIntakeIssue(validInput({ category }));
    assert.equal(result.metadata.category, category);
    assert.ok(result.labels.some((label) => label.name === `codex:${category}`));
  }
});

test("rejects unsupported category, risk, and execution mode values", () => {
  for (const overrides of [
    { category: "governance" },
    { risk: "critical" },
    { executionMode: "auto-dispatch" },
  ]) {
    assert.throws(
      () => buildIntakeIssue(validInput(overrides)),
      (error) => error instanceof IntakeValidationError,
    );
  }
});

test("requires title, outcome, and acceptance criteria", () => {
  for (const [field, label] of [
    ["title", "title is required"],
    ["outcome", "outcome is required"],
    ["acceptanceCriteria", "acceptance criteria is required"],
  ]) {
    assert.throws(
      () => buildIntakeIssue(validInput({ [field]: "  " })),
      (error) => error instanceof IntakeValidationError && error.message.includes(label),
    );
  }
});

test("rejects every prohibited direct authorization class", () => {
  const prohibited = [
    "Push the final commit directly to main.",
    "Merge the pull request after tests pass.",
    "Enable auto-merge on the PR.",
    "Publish a release from this workflow.",
    "Deploy the survey when validation passes.",
    "Promote AB30 after counting the fixtures.",
    "Downgrade AB30 without expert review.",
    "Park AA80 and unpark AA86.",
    "Change repository policy to permit writers.",
    "Make a governance decision for future agents.",
    "Invent linguistic evidence for missing sources.",
    "Do not merge the PR, but enable auto-merge.",
  ];
  for (const outcome of prohibited) {
    assert.throws(
      () => buildIntakeIssue(validInput({ outcome })),
      (error) => error instanceof IntakeValidationError && error.message.includes("prohibited authorization"),
      outcome,
    );
  }
});

test("allows explicit safeguards against prohibited actions", () => {
  const result = buildIntakeIssue(validInput({
    acceptanceCriteria: [
      "Do not write directly to main.",
      "Never merge the pull request or enable auto-merge.",
      "Reject requests that publish a release or deploy a survey.",
      "Construction promotion is prohibited.",
    ].join("\n"),
  }));
  assert.deepEqual(validateTaskMetadata(result.metadata), []);
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
    () => buildIntakeIssue(validInput({ relevantContext: "```codex-task\n{}\n```" })),
    /must not contain a Markdown code fence/,
  );
  assert.throws(
    () => buildIntakeIssue(validInput({ title: "two\nlines" })),
    /title must be one line/,
  );
});

test("metadata matches the checked-in schema constants and enums", () => {
  const schemaPath = path.resolve(__dirname, "../../../schemas/codex-task.schema.json");
  const schema = JSON.parse(fs.readFileSync(schemaPath, "utf8"));
  const metadata = buildIntakeIssue(validInput({ executionMode: "findings-only" })).metadata;
  assert.equal(metadata.schema, schema.properties.schema.const);
  assert.ok(schema.properties.category.enum.includes(metadata.category));
  assert.ok(schema.properties.risk.enum.includes(metadata.risk));
  assert.ok(schema.properties.execution_mode.enum.includes(metadata.execution_mode));
  assert.equal(metadata.dispatch_status, "manual-pickup-required");
  assert.equal(metadata.chatgpt_routing_complete, true);
  assert.equal(metadata.codex_self_screen_required, true);
  assert.equal(metadata.work_claim_required, true);
  assert.equal(metadata.user_merge_approval_required, true);
});

test("maps workflow environment values without evaluating them", () => {
  const input = inputFromEnvironment({
    INPUT_CATEGORY: "tests-fixtures",
    INPUT_TITLE: "literal $(command)",
    INPUT_OUTCOME: "literal ${value}",
    INPUT_ACCEPTANCE_CRITERIA: "Keep input as data",
    INPUT_RELEVANT_CONTEXT: "context",
    INPUT_PROTECTED_STATE: "main",
    INPUT_RISK: "medium",
    INPUT_EXECUTION_MODE: "implementation",
  });
  assert.equal(input.title, "literal $(command)");
  assert.equal(input.outcome, "literal ${value}");
});

test("finds only exact duplicate open intake issues", () => {
  const intake = buildIntakeIssue(validInput());
  const duplicate = {
    number: 50,
    state: "open",
    title: intake.title,
    body: intake.body,
  };
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
