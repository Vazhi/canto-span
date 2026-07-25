#!/usr/bin/env node
"use strict";

const fs = require("fs");

const replacements = [];

function replaceExact(file, before, after, label) {
  const current = fs.readFileSync(file, "utf8");
  const count = current.split(before).length - 1;
  if (count !== 1) {
    throw new Error(`${label}: expected exactly one match in ${file}, found ${count}`);
  }
  fs.writeFileSync(file, current.replace(before, after));
  replacements.push({ file, label });
}

function requireAbsent(files, phrases) {
  for (const file of files) {
    const content = fs.readFileSync(file, "utf8");
    for (const phrase of phrases) {
      if (content.includes(phrase)) {
        throw new Error(`stale merge rule remains in ${file}: ${phrase}`);
      }
    }
  }
}

replaceExact(
  "docs/current/00-START-HERE.md",
  `4. read [\`MULTI-AGENT-COORDINATION.md\`](MULTI-AGENT-COORDINATION.md), choose the
   smallest adequate shared or exclusive targets, and declare integration-owned
   or generated consequences;`,
  `4. read [\`MULTI-AGENT-COORDINATION.md\`](MULTI-AGENT-COORDINATION.md) and
   [\`USER-MERGE-REVIEW.md\`](USER-MERGE-REVIEW.md), choose the smallest adequate
   shared or exclusive targets, and declare integration-owned or generated
   consequences;`,
  "Start Here mandatory review reading"
);

replaceExact(
  "docs/current/00-START-HERE.md",
  `13. allow the authorized integrator to rebuild, ready, and merge passing pull
    requests in dependency order;
14. keep status promotion, survey deployment, and release publication inside their
    own explicitly claimed scope and applicable gates.`,
  `13. when the pull request is ready, notify the user with the PR number, exact head,
    scope, validation, risks, and limitations, then stop without merging;
14. merge only after the user explicitly approves that specific pull request and the
    approved head commit remains unchanged;
15. keep status promotion, survey deployment, and release publication inside their
    own explicitly claimed scope and applicable gates.`,
  "Start Here mandatory merge stop"
);

replaceExact(
  "docs/current/00-START-HERE.md",
  `| Coordination path policy | [\`config/coordination-targets.json\`](../../config/coordination-targets.json) | Exclusive and integration-owned paths require the configured mode and role. |`,
  `| Coordination path policy | [\`config/coordination-targets.json\`](../../config/coordination-targets.json) | Exclusive and integration-owned paths require the configured mode and role. |
| Per-pull-request merge authorization | [\`USER-MERGE-REVIEW.md\`](USER-MERGE-REVIEW.md) | Passing checks and integrator role never replace explicit user approval for the specific PR and head. |`,
  "Start Here merge authority owner"
);

replaceExact(
  "docs/current/00-START-HERE.md",
  `- The authorized integrator may merge passing pull requests in dependency order
  without a separate per-PR user request.`,
  `- A passing pull request must be presented to the user for review. The integrator
  stops before merge and proceeds only after explicit approval for that PR and head.`,
  "Start Here Git merge rule"
);

replaceExact(
  "docs/current/00-START-HERE.md",
  `- Automation must not commit directly to \`main\`, expand its own scope, adjudicate
  linguistic evidence, promote status, deploy surveys, or publish releases without
  separately authorized scope and gates.`,
  `- Automation must not commit directly to \`main\`, expand its own scope, adjudicate
  linguistic evidence, promote status, deploy surveys, publish releases, merge, or
  enable auto-merge without the separately required scope, gates, and user approval.`,
  "Start Here automation merge boundary"
);

replaceExact(
  "docs/current/00-START-HERE.md",
  `Read [\`GIT-WORKFLOW.md\`](GIT-WORKFLOW.md), [\`TESTING.md\`](TESTING.md), and
[\`MULTI-AGENT-COORDINATION.md\`](MULTI-AGENT-COORDINATION.md).`,
  `Read [\`GIT-WORKFLOW.md\`](GIT-WORKFLOW.md), [\`TESTING.md\`](TESTING.md),
[\`MULTI-AGENT-COORDINATION.md\`](MULTI-AGENT-COORDINATION.md), and
[\`USER-MERGE-REVIEW.md\`](USER-MERGE-REVIEW.md).`,
  "Start Here current policy pointers"
);

replaceExact(
  "docs/current/00-START-HERE.md",
  `8. The integrator verifies exact head, dependencies, mergeability, checks, and scope,
   then may merge the passing PR.`,
  `8. The integrator verifies exact head, dependencies, mergeability, checks, and scope,
   notifies the user that the PR is ready, and stops without merging.
9. After explicit user approval for that PR and unchanged head, the integrator
   re-checks the gates and may merge.`,
  "Start Here pre-merge workflow"
);

replaceExact(
  "docs/current/00-START-HERE.md",
  `- permit automation to write directly to \`main\` or autonomously decide evidence,
  status promotion, survey deployment, or release publication;`,
  `- permit automation to write directly to \`main\` or autonomously decide evidence,
  status promotion, survey deployment, release publication, merge approval, or
  auto-merge;
- merge, enable auto-merge, or schedule a merge before explicit user approval for the
  specific pull request and exact head;`,
  "Start Here forbidden merge behavior"
);

replaceExact(
  "docs/current/00-START-HERE.md",
  `1. Read AGENTS.md, docs/current/00-START-HERE.md, and
   docs/current/MULTI-AGENT-COORDINATION.md in full.`,
  `1. Read AGENTS.md, docs/current/00-START-HERE.md,
   docs/current/MULTI-AGENT-COORDINATION.md, and
   docs/current/USER-MERGE-REVIEW.md in full.`,
  "Start Here reusable prompt bootstrap"
);

replaceExact(
  "docs/current/00-START-HERE.md",
  `- The authorized integrator may rebuild, ready, and merge passing PRs in dependency
  order without a separate per-PR user request.
- Promotion, survey deployment, and release publication require separate authorized
  scope and gates.`,
  `- The integrator may rebuild stale work and mark a passing PR ready, but must notify
  the user and stop before merge.
- Merge only after explicit user approval for the specific PR and unchanged head;
  any new commit requires a new notice and fresh approval.
- Promotion, survey deployment, and release publication require separate authorized
  scope and gates.`,
  "Start Here reusable prompt merge stop"
);

replaceExact(
  "docs/current/00-START-HERE.md",
  `1. [\`PROJECT-STATE.md\`](PROJECT-STATE.md)
2. [\`DOCTRINE.md\`](DOCTRINE.md)
3. [\`GOVERNANCE.md\`](GOVERNANCE.md)
4. [\`MULTI-AGENT-COORDINATION.md\`](MULTI-AGENT-COORDINATION.md)
5. [\`CONSTRUCTION-IDENTITY.md\`](CONSTRUCTION-IDENTITY.md)
6. [\`CONSTRUCTION-ADJUDICATION.md\`](CONSTRUCTION-ADJUDICATION.md)
7. [\`DEFINITION-OF-DONE.md\`](DEFINITION-OF-DONE.md)
8. [\`TESTING.md\`](TESTING.md)
9. [\`GIT-WORKFLOW.md\`](GIT-WORKFLOW.md)
10. [\`../../grammar/README.md\`](../../grammar/README.md)
11. [\`../../GRAMMAR-INDEX.md\`](../../GRAMMAR-INDEX.md)
12. [\`../research/CURRENT-RESEARCH-PROVENANCE.md\`](../research/CURRENT-RESEARCH-PROVENANCE.md)`,
  `1. [\`PROJECT-STATE.md\`](PROJECT-STATE.md)
2. [\`DOCTRINE.md\`](DOCTRINE.md)
3. [\`GOVERNANCE.md\`](GOVERNANCE.md)
4. [\`MULTI-AGENT-COORDINATION.md\`](MULTI-AGENT-COORDINATION.md)
5. [\`USER-MERGE-REVIEW.md\`](USER-MERGE-REVIEW.md)
6. [\`CONSTRUCTION-IDENTITY.md\`](CONSTRUCTION-IDENTITY.md)
7. [\`CONSTRUCTION-ADJUDICATION.md\`](CONSTRUCTION-ADJUDICATION.md)
8. [\`DEFINITION-OF-DONE.md\`](DEFINITION-OF-DONE.md)
9. [\`TESTING.md\`](TESTING.md)
10. [\`GIT-WORKFLOW.md\`](GIT-WORKFLOW.md)
11. [\`../../grammar/README.md\`](../../grammar/README.md)
12. [\`../../GRAMMAR-INDEX.md\`](../../GRAMMAR-INDEX.md)
13. [\`../research/CURRENT-RESEARCH-PROVENANCE.md\`](../research/CURRENT-RESEARCH-PROVENANCE.md)`,
  "Start Here canonical reading order"
);

replaceExact(
  "docs/current/MULTI-AGENT-COORDINATION.md",
  `8. an authorized integrator responsible for final reconciliation and merge order.`,
  `8. an integrator responsible for final reconciliation and merge order after the
   mandatory user-review stop and explicit approval.`,
  "Coordination system summary"
);

replaceExact(
  "docs/current/MULTI-AGENT-COORDINATION.md",
  `- Current validation workflow: \`.github/workflows/coordination-check.yml\``,
  `- Current validation workflow: \`.github/workflows/coordination-check.yml\`
- Per-PR merge authorization: \`docs/current/USER-MERGE-REVIEW.md\``,
  "Coordination canonical merge owner"
);

replaceExact(
  "docs/current/MULTI-AGENT-COORDINATION.md",
  `9. verifies exact head SHA and mergeability;
10. marks a complete PR ready and merges only a coherent passing state.

The authorized integrator may merge passing pull requests without a separate
per-PR user request. Integrator role does not bypass evidence, identity, status,
survey, release, or parser gates.`,
  `9. verifies exact head SHA and mergeability;
10. marks a complete PR ready, notifies the user with the exact head and validation,
    and stops without merging;
11. after explicit approval for that PR and unchanged head, re-checks every gate and
    merges only a coherent passing state.

Integrator role does not authorize autonomous merge and does not bypass evidence,
identity, status, survey, release, parser, or user-review gates.`,
  "Coordination integrator merge stop"
);

replaceExact(
  "docs/current/MULTI-AGENT-COORDINATION.md",
  `The ready gate replaces post-merge repair. Temporary intent is cleaned on the branch
before merge while the issue, PR, and Git history preserve the decision trail.`,
  `The ready gate replaces post-merge repair. Temporary intent is cleaned on the branch
before review while the issue, PR, and Git history preserve the decision trail. Once
ready, the agent notifies the user and stops; ready state and passing checks do not
authorize merge.`,
  "Coordination ready review gate"
);

replaceExact(
  "docs/current/MULTI-AGENT-COORDINATION.md",
  `7. the workflow cannot autonomously adjudicate evidence, promote linguistic status,
   deploy a survey, publish a release, or write directly to \`main\`.`,
  `7. the workflow cannot autonomously adjudicate evidence, promote linguistic status,
   deploy a survey, publish a release, write directly to \`main\`, merge, enable
   auto-merge, or infer user approval.`,
  "Coordination automation merge boundary"
);

replaceExact(
  "docs/current/MULTI-AGENT-COORDINATION.md",
  `Claim-aware automation may prepare commits, apply validated changesets, update claim
metadata, or assist integration when those conditions are satisfied. A generic
unscoped writer, repair bot, or direct-to-main merge remains prohibited.`,
  `Claim-aware automation may prepare commits, apply validated changesets, update claim
metadata, or assist integration when those conditions are satisfied. It may not
merge or enable auto-merge before explicit user approval for the specific PR and
head. A generic unscoped writer, repair bot, or direct-to-main merge remains
prohibited.`,
  "Coordination automation approval"
);

replaceExact(
  "docs/current/MULTI-AGENT-COORDINATION.md",
  `The integrator normally merges in this order:`,
  `After explicit user approval for each specific PR and unchanged head, the integrator
normally merges in this order:`,
  "Coordination merge order approval"
);

replaceExact(
  "docs/current/MULTI-AGENT-COORDINATION.md",
  `- It does not grant automation unrestricted write access.
- It does not replace evidence, survey, status, release, or deployment gates.`,
  `- It does not grant automation unrestricted write access.
- It does not let checks, labels, elapsed time, or integrator role substitute for user
  approval of a specific PR and head.
- It does not replace evidence, survey, status, release, or deployment gates.`,
  "Coordination limits"
);

replaceExact(
  "docs/current/GIT-WORKFLOW.md",
  `The mandatory project-wide contract is [\`00-START-HERE.md\`](00-START-HERE.md). The
concurrency protocol is [\`MULTI-AGENT-COORDINATION.md\`](MULTI-AGENT-COORDINATION.md).`,
  `The mandatory project-wide contract is [\`00-START-HERE.md\`](00-START-HERE.md). The
concurrency protocol is [\`MULTI-AGENT-COORDINATION.md\`](MULTI-AGENT-COORDINATION.md).
Per-pull-request merge authorization is governed by
[\`USER-MERGE-REVIEW.md\`](USER-MERGE-REVIEW.md).`,
  "Git workflow merge review pointer"
);

replaceExact(
  "docs/current/GIT-WORKFLOW.md",
  `4. mark a complete PR ready;
5. verify checks, dependencies, mergeability, and exact head SHA;
6. merge passing PRs in dependency order without a separate per-PR user request.`,
  `4. mark a complete PR ready;
5. verify checks, dependencies, mergeability, and exact head SHA;
6. notify the user with the PR, exact head, scope, validation, risks, and limitations,
   then stop without merging;
7. after explicit approval for that PR and unchanged head, re-check the gates and
   merge in dependency order.`,
  "Git workflow handoff merge stop"
);

replaceExact(
  "docs/current/GIT-WORKFLOW.md",
  `- Automation may not write directly to \`main\`, expand its own scope, adjudicate
  linguistic evidence, promote status, deploy surveys, or publish releases without
  separately authorized scope and gates.`,
  `- Automation may not write directly to \`main\`, expand its own scope, adjudicate
  linguistic evidence, promote status, deploy surveys, publish releases, merge, or
  enable auto-merge without the separately required scope, gates, and user approval.`,
  "Git workflow automation boundary"
);

replaceExact(
  "docs/current/GIT-WORKFLOW.md",
  `- manual per-PR merge approval after an authorized integrator has verified a
  coherent passing state.`,
  `- autonomous merge based only on integrator role, passing checks, labels, or elapsed
  time without explicit user approval for the specific PR and head.`,
  "Git workflow retired mechanisms correction"
);

replaceExact(
  "docs/current/GOVERNANCE.md",
  `Semantic claims govern concurrent work. Workers may research and implement ordinary
claimed scope. Integrators reconcile integration-owned files, mark complete PRs
ready, and merge passing work in dependency order. Routine merge management does
not require a separate per-PR user request once delegated to the integrator.`,
  `Semantic claims govern concurrent work. Workers may research and implement ordinary
claimed scope. Integrators reconcile integration-owned files and mark complete PRs
ready. They must then notify the user and stop; merge requires explicit approval for
the specific PR and unchanged head before dependency-order integration continues.`,
  "Governance merge review rule"
);

replaceExact(
  "docs/current/GOVERNANCE.md",
  `- automation cannot write directly to \`main\`, expand its own scope, adjudicate
  linguistic evidence, promote status, deploy surveys, or publish releases without
  separately authorized scope and gates.`,
  `- automation cannot write directly to \`main\`, expand its own scope, adjudicate
  linguistic evidence, promote status, deploy surveys, publish releases, merge,
  enable auto-merge, or infer approval without the separately required scope, gates,
  and explicit user approval.`,
  "Governance automation merge boundary"
);

replaceExact(
  "docs/current/TESTING.md",
  `1. Read \`AGENTS.md\`, \`00-START-HERE.md\`, and the coordination contract.`,
  `1. Read \`AGENTS.md\`, \`00-START-HERE.md\`, the coordination contract, and
   \`USER-MERGE-REVIEW.md\`.`,
  "Testing merge review pointer"
);

replaceExact(
  "docs/current/TESTING.md",
  `7. reconcile integration-owned files as integrator;
8. publish one coherent passing PR.`,
  `7. reconcile integration-owned files as integrator;
8. publish one coherent passing PR;
9. notify the user that the exact validated head is ready and stop without merging;
10. merge only after explicit approval for that PR and unchanged head.`,
  "Testing research workflow merge stop"
);

replaceExact(
  "docs/current/TESTING.md",
  `- the workflow cannot write directly to \`main\`, adjudicate evidence, promote status,
  deploy surveys, or publish releases without separately authorized scope and gates.`,
  `- the workflow cannot write directly to \`main\`, adjudicate evidence, promote status,
  deploy surveys, publish releases, merge, enable auto-merge, or infer approval
  without the separately required scope, gates, and explicit user approval.`,
  "Testing automation merge boundary"
);

replaceExact(
  "README.md",
  `Automated agents must first read [\`AGENTS.md\`](AGENTS.md), which directs them to
read the complete mandatory contract in
[\`docs/current/00-START-HERE.md\`](docs/current/00-START-HERE.md).`,
  `Automated agents must first read [\`AGENTS.md\`](AGENTS.md), which directs them to
the complete mandatory contract in
[\`docs/current/00-START-HERE.md\`](docs/current/00-START-HERE.md), the concurrency
protocol in
[\`docs/current/MULTI-AGENT-COORDINATION.md\`](docs/current/MULTI-AGENT-COORDINATION.md),
and the mandatory per-PR review gate in
[\`docs/current/USER-MERGE-REVIEW.md\`](docs/current/USER-MERGE-REVIEW.md).`,
  "README merge review pointer"
);

replaceExact(
  "HANDOFF.md",
  `1. \`docs/current/PROJECT-STATE.md\`
2. \`docs/current/DOCTRINE.md\`
3. \`docs/current/DEFINITION-OF-DONE.md\`
4. \`docs/current/GOVERNANCE.md\`
5. \`docs/current/TESTING.md\`
6. \`grammar/README.md\`
7. \`GRAMMAR-INDEX.md\`
8. \`docs/research/CURRENT-RESEARCH-PROVENANCE.md\`
9. \`docs/research/README.md\``,
  `1. \`docs/current/PROJECT-STATE.md\`
2. \`docs/current/DOCTRINE.md\`
3. \`docs/current/DEFINITION-OF-DONE.md\`
4. \`docs/current/GOVERNANCE.md\`
5. \`docs/current/MULTI-AGENT-COORDINATION.md\`
6. \`docs/current/USER-MERGE-REVIEW.md\`
7. \`docs/current/TESTING.md\`
8. \`grammar/README.md\`
9. \`GRAMMAR-INDEX.md\`
10. \`docs/research/CURRENT-RESEARCH-PROVENANCE.md\`
11. \`docs/research/README.md\``,
  "Handoff merge review pointer"
);

replaceExact(
  "docs/current/USER-MERGE-REVIEW.md",
  `This file is the canonical owner of per-pull-request merge authorization. It is a
specific current user decision and supersedes any older or more general text that
allows an agent or integrator to merge a passing pull request without first pausing
for user review.`,
  `This file is the canonical detailed owner of per-pull-request merge authorization.
It is a specific current user decision. \`AGENTS.md\`, \`00-START-HERE.md\`, the
coordination contract, Git workflow, governance, testing guidance, and PR template
must agree with it. Contradictory current text is a verification failure rather than
an acceptable lower-priority holdout.`,
  "User merge review no-holdout rule"
);

replaceExact(
  "tools/verify-agent-coordination.js",
  `function requireText(file, text, label) {
  const content = normalize(read(file));
  const expected = normalize(text);
  if (!content.includes(expected)) {
    errors.push({ type: "missing_contract_text", file, label, expected: text });
  }
}`,
  `function requireText(file, text, label) {
  const content = normalize(read(file));
  const expected = normalize(text);
  if (!content.includes(expected)) {
    errors.push({ type: "missing_contract_text", file, label, expected: text });
  }
}

function forbidText(file, text, label) {
  const content = normalize(read(file));
  const forbidden = normalize(text);
  if (content.includes(forbidden)) {
    errors.push({ type: "stale_contract_text", file, label, forbidden: text });
  }
}`,
  "Agent verifier forbid helper"
);

replaceExact(
  "tools/verify-agent-coordination.js",
  `requireText(testingPath, "Repository automation follows least privilege", "testing automation policy");`,
  `requireText(testingPath, "Repository automation follows least privilege", "testing automation policy");

const mergeReviewCurrentDocs = [
  agentsPath,
  startPath,
  reviewPath,
  coordinationPath,
  gitWorkflowPath,
  governancePath,
  testingPath,
  readmePath,
  "HANDOFF.md",
];
for (const file of mergeReviewCurrentDocs) {
  requireText(file, "USER-MERGE-REVIEW.md", "current merge-review pointer");
}

const staleMergeRules = [
  "without a separate per-PR user request",
  "does not require a separate per-PR user request",
  "then may merge the passing PR",
  "manual per-PR merge approval after an authorized integrator",
];
for (const file of mergeReviewCurrentDocs) {
  for (const stale of staleMergeRules) forbidText(file, stale, "obsolete autonomous merge rule");
}`,
  "Agent verifier no-holdout scan"
);

replaceExact(
  "tools/verify-coordination-system.js",
  `function requireText(relativePath, expected, label) {
  const normalized = read(relativePath).replace(/\\s+/g, " ");
  const normalizedExpected = expected.replace(/\\s+/g, " ");
  if (!normalized.includes(normalizedExpected)) {
    errors.push({ type: "missing_contract_text", file: relativePath, label, expected });
  }
}`,
  `function requireText(relativePath, expected, label) {
  const normalized = read(relativePath).replace(/\\s+/g, " ");
  const normalizedExpected = expected.replace(/\\s+/g, " ");
  if (!normalized.includes(normalizedExpected)) {
    errors.push({ type: "missing_contract_text", file: relativePath, label, expected });
  }
}

function forbidText(relativePath, forbidden, label) {
  const normalized = read(relativePath).replace(/\\s+/g, " ");
  const normalizedForbidden = forbidden.replace(/\\s+/g, " ");
  if (normalized.includes(normalizedForbidden)) {
    errors.push({ type: "stale_contract_text", file: relativePath, label, forbidden });
  }
}`,
  "Coordination verifier forbid helper"
);

replaceExact(
  "tools/verify-coordination-system.js",
  `requireText("docs/current/MULTI-AGENT-COORDINATION.md", "Automation follows least privilege", "coordination automation policy");`,
  `requireText("docs/current/MULTI-AGENT-COORDINATION.md", "Automation follows least privilege", "coordination automation policy");

const mergeReviewCurrentDocs = [
  "AGENTS.md",
  "docs/current/00-START-HERE.md",
  "docs/current/USER-MERGE-REVIEW.md",
  "docs/current/MULTI-AGENT-COORDINATION.md",
  "docs/current/GIT-WORKFLOW.md",
  "docs/current/GOVERNANCE.md",
  "docs/current/TESTING.md",
  "README.md",
  "HANDOFF.md",
];
for (const file of mergeReviewCurrentDocs) {
  requireText(file, "USER-MERGE-REVIEW.md", "current merge-review pointer");
}
for (const file of mergeReviewCurrentDocs) {
  for (const stale of [
    "without a separate per-PR user request",
    "does not require a separate per-PR user request",
    "then may merge the passing PR",
    "manual per-PR merge approval after an authorized integrator",
  ]) {
    forbidText(file, stale, "obsolete autonomous merge rule");
  }
}`,
  "Coordination verifier no-holdout scan"
);

const auditedFiles = [
  "AGENTS.md",
  "docs/current/00-START-HERE.md",
  "docs/current/USER-MERGE-REVIEW.md",
  "docs/current/MULTI-AGENT-COORDINATION.md",
  "docs/current/GIT-WORKFLOW.md",
  "docs/current/GOVERNANCE.md",
  "docs/current/TESTING.md",
  "README.md",
  "HANDOFF.md",
  ".github/pull_request_template.md",
  "tools/verify-agent-coordination.js",
  "tools/verify-coordination-system.js",
];
requireAbsent(auditedFiles, [
  "without a separate per-PR user request",
  "does not require a separate per-PR user request",
  "then may merge the passing PR",
  "manual per-PR merge approval after an authorized integrator",
]);

fs.unlinkSync("tools/coordination/reconcile-pr36-review-policy.js");
fs.unlinkSync(".github/workflows/pr36-policy-reconcile.yml");

process.stdout.write(`${JSON.stringify({ status: "PASS", replacements }, null, 2)}\n`);
