#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const {
  loadJson,
  validateChangedFiles,
  validateClaim,
} = require("./lib");
const {
  extractTaskIntake,
  validateTaskMetadata,
} = require("./codex-intake");
const {
  extractFencedBlocks,
  intakeRoutingCounts,
} = require("./portfolio-routing");

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

function matchedValues(body, pattern, transform = (value) => value) {
  const values = [];
  for (const match of String(body || "").matchAll(pattern)) {
    values.push(transform(match[1]));
  }
  return values;
}

function exactlyOne(values, label) {
  if (values.length !== 1) {
    throw new Error(`${label} must appear exactly once; found ${values.length}`);
  }
  return values[0];
}

function parsePrAuthority(prBody) {
  const body = String(prBody || "");
  const hiddenClaims = matchedValues(
    body,
    /<!--\s*coordination-claim:\s*#(\d+)\s*-->/gi,
    Number,
  );
  const visibleClaims = matchedValues(
    body,
    /^[ \t]*(?:-\s*)?Work claim:\s*#(\d+)\s*$/gim,
    Number,
  );
  const intakeIssues = matchedValues(
    body,
    /^[ \t]*(?:-\s*)?Intake issue:\s*#(\d+)\s*$/gim,
    Number,
  );
  const activeWorkers = matchedValues(
    body,
    /^[ \t]*(?:-\s*)?Active worker:\s*`?(codex|chatgpt|human)`?\s*$/gim,
    (value) => value.toLowerCase(),
  );
  const revisions = matchedValues(
    body,
    /^[ \t]*(?:-\s*)?Ownership revision:\s*`?(\d+)`?\s*$/gim,
    Number,
  );

  const hiddenClaim = exactlyOne(hiddenClaims, "hidden coordination-claim marker");
  const visibleClaim = exactlyOne(visibleClaims, "visible Work claim marker");
  if (hiddenClaim !== visibleClaim) {
    throw new Error(
      `hidden coordination claim #${hiddenClaim} contradicts visible Work claim #${visibleClaim}`,
    );
  }

  return {
    claimIssue: hiddenClaim,
    intakeIssue: exactlyOne(intakeIssues, "Intake issue marker"),
    activeWorker: exactlyOne(activeWorkers, "Active worker marker"),
    ownershipRevision: exactlyOne(revisions, "Ownership revision marker"),
  };
}

function claimIssueNumber(prBody) {
  return parsePrAuthority(prBody).claimIssue;
}

function intakeIssueNumber(prBody) {
  return parsePrAuthority(prBody).intakeIssue;
}

function prOwnershipFields(prBody) {
  const authority = parsePrAuthority(prBody);
  return {
    activeWorker: authority.activeWorker,
    ownershipRevision: authority.ownershipRevision,
  };
}

function extractExactClaim(body) {
  const matches = extractFencedBlocks(body, "coordination-claim");
  if (matches.length !== 1) {
    throw new Error(`expected exactly one fenced coordination-claim JSON block; found ${matches.length}`);
  }
  try {
    return JSON.parse(matches[0][1]);
  } catch (error) {
    throw new Error(`invalid coordination-claim JSON: ${error.message}`);
  }
}

function closesIssue(prBody, issueNumber) {
  const pattern = new RegExp(`\\b(?:close[sd]?|fix(?:e[sd])?|resolve[sd]?)\\s+#${issueNumber}\\b`, "i");
  return pattern.test(String(prBody || ""));
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

function validateOwnershipBinding(claim, claimIssue, intake, intakeIssue, pr, prOwnership = null) {
  const errors = [];
  const authority = prOwnership || prOwnershipFields(pr.body);
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
  if (authority.activeWorker !== intake.active_pickup_owner) {
    errors.push(`PR worker ${authority.activeWorker} does not match live intake owner ${intake.active_pickup_owner}`);
  }
  if (authority.ownershipRevision !== intake.ownership_revision) {
    errors.push(
      `PR ownership revision ${authority.ownershipRevision} does not match live revision ${intake.ownership_revision}`,
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
  let prAuthority;
  try {
    prAuthority = parsePrAuthority(pr.body);
  } catch (error) {
    fail("PR ownership markers are invalid", error.message);
  }
  const issueNumber = prAuthority.claimIssue;
  if (!closesIssue(pr.body, issueNumber)) fail(`PR body must close work claim #${issueNumber}`);

  const issue = await github(`/repos/${repository}/issues/${issueNumber}`, token);
  if (issue.pull_request) fail(`#${issueNumber} is a pull request, not a work-claim issue`);
  if (issue.state !== "open") fail(`work claim #${issueNumber} is not open`);
  let claim;
  try {
    claim = extractExactClaim(issue.body);
  } catch (error) {
    fail(`work claim #${issueNumber} cannot be parsed`, error.message);
  }
  const claimErrors = validateClaim(claim, { requireUnexpired: true });
  if (claimErrors.length) fail(`work claim #${issueNumber} is invalid`, claimErrors);
  if (claim.branch !== pr.head.ref) fail(`claim branch ${claim.branch} does not match PR head ${pr.head.ref}`);

  const intakeNumber = prAuthority.intakeIssue;
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
    prAuthority,
  );
  if (ownershipErrors.length) {
    fail("live intake ownership does not authorize this pull request", ownershipErrors);
  }

  const files = await changedFiles(repository, pr.number, token);
  const coverage = validateChangedFiles(claim, files, config, { isDraft: Boolean(pr.draft) });
  if (coverage.errors.length) fail("changed-file coordination rules failed", coverage.errors);

  const result = {
    schema: "canto-span-pr-coordination-check-v2",
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
  claimIssueNumber,
  extractExactClaim,
  intakeIssueNumber,
  legacyIntakeRequiresMigration,
  parsePrAuthority,
  prOwnershipFields,
  resolveIntakeRouting,
  validateOwnershipBinding,
};
