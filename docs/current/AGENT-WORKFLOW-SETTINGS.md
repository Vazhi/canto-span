---
title: Canto Span — Agent Workflow Settings
status: current
tags: [canto-span/infrastructure, canto-span/agents, canto-span/github]
related: "[[00-START-HERE]] [[CODEX-ISSUE-WORKFLOW]] [[MULTI-AGENT-COORDINATION]]"
---

# Agent workflow settings

`config/agent-workflow-settings.json` is the canonical owner of whether optional
agent-specific workflows are available. It controls availability only. It does not
replace task routing, semantic work claims, evidence standards, or user merge review.

## Current setting

```text
codex.enabled: false
```

Codex workflows are disabled because the user reported that Codex is out of tokens.
The disabled-state fallback pickup target is `chatgpt`.

## Disabled-state rules

While `codex.enabled` is `false`:

1. a new intake issue may use only `pickup_target: chatgpt` or
   `pickup_target: human`;
2. `active_pickup_owner` may not remain `codex`;
3. a reassignment or takeover may not select Codex;
4. an issue may not retain a GitHub assignee whose configured login represents Codex;
5. a Codex-targeted current v2 intake is reassigned monotonically to the configured
   fallback, with the previous target, higher ownership revision, timestamp, and
   released active-work bindings recorded;
6. a linked Codex claim, branch, or pull request does not preserve authority after the
   intake revision changes;
7. legacy open Codex metadata that cannot be safely migrated is unavailable rather
   than silently rewritten;
8. closed historical issues remain unchanged.

The allowed pickup targets are therefore exactly:

```text
chatgpt
human
```

An issue assignment includes both the machine-readable pickup target and an actual
GitHub issue assignee. Removing Codex from only one layer is insufficient.

## Enabled-state rules

When `codex.enabled` is changed to `true`, future intake and reassignment may again use
`codex`, `chatgpt`, or `human`, subject to the normal routing and self-screening gates.
Re-enabling Codex does not automatically take over, reassign, reopen, or resume any
existing issue, claim, branch, or pull request. Every later transfer still requires a
new valid ownership revision and overlap check.

## Enforcement

The setting is enforced through:

- `tools/coordination/agent-workflow-settings.js` for settings validation, pickup
  availability, assignee detection, and deterministic v2 reassignment;
- `.github/workflows/codex-intake-issue.yml` before creating a manual intake;
- `.github/workflows/enforce-agent-workflow-settings.yml` on issue creation, editing,
  reopening, assignment, and manual repository reconciliation;
- mandatory agent checks in `AGENTS.md` before issue creation, assignment, takeover,
  claim creation, branch creation, or resumed work.

The issue-event workflow removes blocked Codex assignees and converts current v2 Codex
pickup metadata to the configured fallback while disabled. The conversion is
idempotent: once the issue is assigned to ChatGPT or a human, another enforcement run
does not increase its ownership revision again.

## Changing the toggle

Changing `codex.enabled` is repository-wide workflow policy. It requires:

1. an exclusive semantic work claim;
2. a branch-scoped edit to `config/agent-workflow-settings.json`;
3. focused settings tests plus coordination and core verification;
4. one reviewed pull request;
5. explicit user approval for that pull request and unchanged head before merge.

Do not emulate the toggle through labels, comments, issue assignment alone, cached
prompts, or a temporary agent statement. Those signals cannot override the checked-in
setting.
