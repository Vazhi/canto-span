#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const {
  extractClaim,
  loadJson,
  validateChangedFiles,
  validateClaim,
} = require("./lib");
const {
  extractTaskIntake,
  validateTaskMetadata,
} = require("./codex-intake");
const { intakeRoutingCounts } = require("./portfolio-routing");

const root = path.resolve(__dirname, "../..");
const config = loadJson(path.join(root, "config/coordination-targets.json"));

function fail(message, detail = null) {
  const payload = { status: "FAIL", message, ...(detail ? { detail } : {}) };
  process.stdout.write(`${JSON.stringify(payload, null, 2)}\n`);
  process.exit(1);
}

async function github(pathname, token) {
  const response = await fetch(`https://api.github.com${pathname}`, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "canto-span-coordination-check",
    },
  });
  if (!response.ok) throw new Error(`GitHub API ${response.status}: ${await response.text()}`);
  return response.json();
}

function claimIssueNumber(prBody) {
  const hidden = String(prBody || "").match(/<!--\s*coordination-claim:\s*#(\d+)\s*-->/i);
  if (hidden) return Number(hidden[1]);
  const visible = String(prBody || "").match(/Work claim:\s*#(\d+)/i);
  return visible ? Number(visible[1]) : null;
}

function closesIssue(prBody, issueNumber) {
  const pattern = new RegExp(`\\b(?:close[sd]?|fix(?:e[sd])?|resolve[sd]?)\\s+#${issueNumber}\\b`, "i");
  return pattern.test(String(prBody || ""));
}

function intakeIssueNumber(prBody) {
  const match = String(prBody || "").match(/Intake issue:\s*#(\d+)/i);
  return match ? Number(match[1]) : null;
}

function prOwnershipFields(prBody) {
  const body = String(prBody || "");
  const worker = body.match(/^[ \t]*(?:-\s*)?Active worker:\s*`?(codex|chatgpt|human)`?\s*$/im);
  const revision = body.match(/^[ \t]*(?:-\s*)?Ownership revision:\s*`?(\d+)`?\s*$/im);
  return {
    activeWorker: worker ? worker[1].toLowerCase() : null,
    ownershipRevision: revision ? Number(revision[1]) : null,
  };
}

function legacyIntakeRequiresMigration(intake) {
  return Boolean(
    Number(intake?.ownership_revision) > 1
    || intake?.original_pickup_target
    || intake?.active_work_claim
    || intake?.ownership_reason
    || intake?.pickup_allowed === false
    || /(?:active|takeover|reassign)/i.test(String(intake?.pickup_status || "")),
  );
}

function validateOwnershipBinding(claim, claimIssue, intake, intakeIssue, pr) {
  const errors = [];
  const prOwnership = prOwnershipFields(pr.body);
  if (claim.intake_issue != null && claim.intake_issue !== intakeIssue) {
    errors.push(`claim intake_issue ${claim.intake_issue} does not match PR intake issue ${intakeIssue}`);
  }
  if (claim.schema === "canto-span-work-claim-v1") {
    if (intake?.schema === "canto-span-task-intake-v2" || legacyIntakeRequiresMigration(intake)) {
      errors.push("legacy work claim must migrate to v2 before takeover, reassignment, or active pickup");
    }
    return errors;
  }
  if (claim.schema !== "canto-span-work-claim-v2") {
    errors.push("ownership binding requires a supported work-claim schema");
    return errors;
  }
  const intakeErrors = validateTaskMetadata(intake);
  if (intakeErrors.length) errors.push(...intakeErrors.map((error) => `intake: ${error}`));
  if (intake?.schema !== "canto-span-task-intake-v2") {
    errors.push("v2 work claim requires a v2 intake ownership record");
    return errors;
  }
  if (intake.active_pickup_owner !== claim.active_worker) {
    errors.push(`live intake owner ${intake.active_pickup_owner} does not match claim worker ${claim.active_worker}`);
  }
  if (intake.ownership_revision !== claim.ownership_revision) {
    errors.push(`live ownership revision ${intake.ownership_revision} does not match claim revision ${claim.ownership_revision}`);
  }
  if (intake.pickup_status !== "active") {
    errors.push(`live intake status ${intake.pickup_status} does not authorize an active pull request`);
  }
  if (!intake.pickup_allowed) errors.push("live intake does not permit pickup");
  if (intake.active_claim_issue !== claimIssue) {
    errors.push(`live intake active claim ${intake.active_claim_issue} does not match work claim ${claimIssue}`);
  }
  if (intake.active_branch !== pr.head.ref) {
    errors.push(`live intake branch ${intake.active_branch} does not match PR head ${pr.head.ref}`);
  }
  if (intake.active_pr !== pr.number) {
    errors.push(`live intake PR ${intake.active_pr} does not match PR ${pr.number}`);
  }
  if (prOwnership.activeWorker !== intake.active_pickup_owner) {
    errors.push(`PR worker ${prOwnership.activeWorker} does not match live intake owner ${intake.active_pickup_owner}`);
  }
  if (prOwnership.ownershipRevision !== intake.ownership_revision) {
    errors.push(
      `PR ownership revision ${prOwnership.ownershipRevision} does not match live revision ${intake.ownership_revision}`,
    );
  }
  return errors;
}

function resolveIntakeRouting(issueBody) {
  const counts = intakeRoutingCounts(issueBody);
  if (counts.taskIntake === 1 && counts.portfolioRouting === 0) {
    return { mode: "task-intake", metadata: extractTaskIntake(issueBody), counts };
  }
  if (counts.taskIntake === 0 && counts.portfolioRouting === 1) {
    throw new Error(
      "portfolio-routing is planning metadata only and cannot authorize active ownership; add exactly one valid task-intake-v2 block before new or resumed execution",
    );
  }
  if (counts.taskIntake > 0 && counts.portfolioRouting > 0) {
    throw new Error(
      `mixed ownership metadata is invalid; found task-intake=${counts.taskIntake}, portfolio-routing=${counts.portfolioRouting}`,
    );
  }
  throw new Error(
    `expected exactly one task-intake ownership block; found task-intake=${counts.taskIntake}, portfolio-routing=${counts.portfolioRouting}`,
  );
}

async function changedFiles(repository, prNumber, token) {
  const output = [];
  for (let page = 1; ; page += 1) {
    const batch = await github(`/repos/${repository}/pulls/${prNumber}/files?per_page=100&page=${page}`, token);
    output.push(...batch.map((item) => item.filename));
    if (batch.length < 100) break;
  }
  return output;
}

async function main() {
  const eventPath = process.env.GITHUB_EVENT_PATH;
  if (!eventPath || !fs.existsSync(eventPath)) {
    process.stdout.write(`${JSON.stringify({ status: "SKIP", reason: "no GitHub pull-request event" }, null, 2)}\n`);
    return;
  }
  const event = JSON.parse(fs.readFileSync(eventPath, "utf8"));
  if (!event.pull_request) {
    process.stdout.write(`${JSON.stringify({ status: "SKIP", reason: "event is not a pull request" }, null, 2)}\n`);
    return;
  }
  const token = process.env.GITHUB_TOKEN;
  const repository = process.env.GITHUB_REPOSITORY;
  if (!token || !repository) fail("GITHUB_TOKEN and GITHUB_REPOSITORY are required");

  const pr = event.pull_request;
  const issueNumber = claimIssueNumber(pr.body);
  if (!issueNumber) fail("PR body must contain <!-- coordination-claim: #NUMBER --> and Work claim: #NUMBER");
  if (!closesIssue(pr.body, issueNumber)) fail(`PR body must close work claim #${issueNumber}`);

  const issue = await github(`/repos/${repository}/issues/${issueNumber}`, token);
  if (issue.pull_request) fail(`#${issueNumber} is a pull request, not a work-claim issue`);
  if (issue.state !== "open") fail(`work claim #${issueNumber} is not open`);
  let claim;
  try {
    claim = extractClaim(issue.body);
  } catch (error) {
    fail(`work claim #${issueNumber} cannot be parsed`, error.message);
  }
  const claimErrors = validateClaim(claim, { requireUnexpired: true });
  if (claimErrors.length) fail(`work claim #${issueNumber} is invalid`, claimErrors);
  if (claim.branch !== pr.head.ref) fail(`claim branch ${claim.branch} does not match PR head ${pr.head.ref}`);

  const intakeNumber = intakeIssueNumber(pr.body);
  if (!intakeNumber) fail("PR body must contain Intake issue: #NUMBER");
  const intakeIssue = await github(`/repos/${repository}/issues/${intakeNumber}`, token);
  if (intakeIssue.pull_request) fail(`#${intakeNumber} is a pull request, not an intake issue`);
  if (intakeIssue.state !== "open") fail(`intake issue #${intakeNumber} is not open`);

  let intakeRouting;
  try {
    intakeRouting = resolveIntakeRouting(intakeIssue.body);
  } catch (error) {
    fail(`intake issue #${intakeNumber} cannot be parsed`, error.message);
  }

  const ownershipErrors = validateOwnershipBinding(
    claim,
    issueNumber,
    intakeRouting.metadata,
    intakeNumber,
    pr,
  );
  if (ownershipErrors.length) {
    fail("live intake ownership does not authorize this pull request", ownershipErrors);
  }

  const files = await changedFiles(repository, pr.number, token);
  const coverage = validateChangedFiles(claim, files, config, { isDraft: Boolean(pr.draft) });
  if (coverage.errors.length) fail("changed-file coordination rules failed", coverage.errors);

  const result = {
    schema: "canto-span-pr-coordination-check-v1",
    status: "PASS",
    pull_request: pr.number,
    work_claim_issue: issueNumber,
    intake_issue: intakeNumber,
    intake_mode: "task-intake",
    work_id: claim.work_id,
    active_worker: claim.active_worker || null,
    ownership_revision: claim.ownership_revision || null,
    branch: claim.branch,
    claim_mode: claim.claim_mode,
    integration_role: claim.integration_role || "worker",
    draft: Boolean(pr.draft),
    changed_files: files.length,
    semantic_overlap_check: "start-time responsibility",
    warnings: coverage.warnings,
  };
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
}

if (require.main === module) {
  main().catch((error) => fail("coordination check crashed", error.stack || error.message));
}

module.exports = {
  intakeIssueNumber,
  legacyIntakeRequiresMigration,
  prOwnershipFields,
  resolveIntakeRouting,
  validateOwnershipBinding,
};
