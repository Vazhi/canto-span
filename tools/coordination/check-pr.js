#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const {
  extractClaim,
  findClaimConflicts,
  loadJson,
  validateChangedFiles,
  validateClaim,
} = require("./lib");

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

async function allOpenIssues(repository, token) {
  const output = [];
  for (let page = 1; ; page += 1) {
    const batch = await github(`/repos/${repository}/issues?state=open&per_page=100&page=${page}`, token);
    output.push(...batch);
    if (batch.length < 100) break;
  }
  return output.filter((issue) => !issue.pull_request);
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

  const openIssues = await allOpenIssues(repository, token);
  const conflicts = [];
  for (const otherIssue of openIssues) {
    if (otherIssue.number === issueNumber) continue;
    let otherClaim;
    try {
      otherClaim = extractClaim(otherIssue.body);
    } catch {
      continue;
    }
    const errors = validateClaim(otherClaim, { requireUnexpired: false });
    if (errors.length || otherClaim.status !== "active") continue;
    const expiry = new Date(otherClaim.expires_at);
    if (!Number.isNaN(expiry.getTime()) && expiry <= new Date()) continue;
    const targetConflicts = findClaimConflicts(claim, otherClaim);
    if (targetConflicts.length) {
      conflicts.push({ issue: otherIssue.number, work_id: otherClaim.work_id, conflicts: targetConflicts });
    }
  }
  if (conflicts.length) fail("semantic work claim overlaps another active claim", conflicts);

  const files = await changedFiles(repository, pr.number, token);
  const coverage = validateChangedFiles(claim, files, config, { isDraft: Boolean(pr.draft) });
  if (coverage.errors.length) fail("changed-file coordination rules failed", coverage.errors);

  const result = {
    schema: "canto-span-pr-coordination-check-v1",
    status: "PASS",
    pull_request: pr.number,
    work_claim_issue: issueNumber,
    work_id: claim.work_id,
    branch: claim.branch,
    claim_mode: claim.claim_mode,
    integration_role: claim.integration_role || "worker",
    draft: Boolean(pr.draft),
    changed_files: files.length,
    active_claim_conflicts: 0,
    warnings: coverage.warnings,
  };
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
}

main().catch((error) => fail("coordination check crashed", error.stack || error.message));
