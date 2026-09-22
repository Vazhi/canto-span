# Canto Span agent instructions

Every human or automated agent working in this repository must begin with:

[`docs/current/00-START-HERE.md`](docs/current/00-START-HERE.md)

That file is the mandatory router to the current owner for project state, doctrine,
evidence, runtime, testing, corpus work, task routing, coordination, merge authority,
Git/recovery, and historical-material handling. Do not duplicate those policies here.

## Mandatory bootstrap

Before the first repository edit:

1. confirm the repository is `Vazhi/canto-span`;
2. read `docs/current/00-START-HERE.md` and
   `docs/current/PROJECT-STATE.md`;
3. inspect current `main`, open pull requests, current intake issues, and open work
   claims for overlap/dependencies;
4. follow the task-specific reading route in `00-START-HERE.md`;
5. classify/rout the task through `CODEX-ISSUE-WORKFLOW.md` and apply the checked-in
   agent-availability setting;
6. re-fetch the canonical intake and verify owner, permission,
   `ownership_revision`, claim, branch, and PR bindings;
7. create/update the smallest adequate semantic work claim and the exact
   `agent/<description>` branch it names;
8. declare canonical inputs, generated outputs, protected state, dependencies,
   reserved decisions, and applicable checks;
9. implement one coherent result and keep the issue/claim/PR progress record current;
10. before merge, apply `USER-MERGE-REVIEW.md` to the exact reviewed head and live
    safety state.

A live ownership or availability mismatch requires:

```text
routing result: unavailable
repository changes: none
```

## Execution reliability protocol

For any multi-step task, keep one compact durable progress record in the live
work-claim issue or linked pull-request description. Record the intended outcome,
current head, authorized scope, protected state, completed work, failed/rejected
approaches, commands/results, unresolved blockers, and next concrete action. Do not
create a parallel state file.

- After a substantive repository change, treat review of the previous head as stale.
  Rereview the final head before merge.
- After context compaction, interruption, resume, or apparent memory loss, re-read
  this file, `00-START-HERE.md`, `PROJECT-STATE.md`, the live intake/claim, current
  branch diff, and latest progress record before acting. Do not ask the user to
  restate information already preserved there.
- Treat existing branch changes as evidence to inspect, not disposable drafts. Do not
  rewrite/revert/duplicate them merely because context was lost.
- Never invent an execution-time, context, quota, tool, permission, platform, file,
  directory, or local-path limitation. A blocker must cite the observed error/state,
  the bounded recovery attempted, and why no authorized next action remains.
- Do not stop at planning, repeated status messages, user checkpoints, copy-file
  handoffs, or download-link handoffs while an authorized executable next step
  remains.
- Tool success, a plausible diff, or a passing unrelated check is not proof of
  completion. Verify the requested artifact/state directly.
- Read the narrowest relevant sources, avoid repeated full scans, and run only checks
  applicable to the changed invariant.
- Before declaring completion, compare the final diff and deliverables against the
  user's request, live intake, and claim. Remove unrelated work and state remaining
  limitations plainly.
- If the same context-loss or invented-blocker failure recurs after one recovery,
  stop further writes, preserve exact state, and report the reliability problem
  instead of adding more instructions or retracing the same work.

## Path and source discipline

Never guess where project material lives.

Before giving repository-local commands, creating a directory, or adding a new
artifact family:

1. search the current repository;
2. follow the ownership/task route in `00-START-HERE.md`;
3. inspect the existing checked-in tool/profile/README for that job;
4. reuse the canonical path/format where one exists.

If the user's local checkout path has not been explicitly confirmed, use commands
relative to the repository root or resolve it with Git rather than inventing a
`~/...` path.

Likewise, do not treat old prompts, closed issues, historical reports, cached agent
instructions, or branch names as current project authority. Their status is defined by
the current owners linked from `00-START-HERE.md`.

## Policy ownership

Do not restate detailed project policy here. Use the current owner:

- project facts/work order → `PROJECT-STATE.md`;
- linguistic/parser principles → `DOCTRINE.md`;
- evidence/status/survey/release governance → `GOVERNANCE.md`;
- completion thresholds → `DEFINITION-OF-DONE.md`;
- task routing → `CODEX-ISSUE-WORKFLOW.md`;
- concurrent scope → `MULTI-AGENT-COORDINATION.md`;
- merge permission → `USER-MERGE-REVIEW.md`;
- tests/regression/verification → `TESTING.md`;
- runtime source/generated bundle → `RUNTIME-MODULARIZATION.md`;
- Git/recovery → `GIT-WORKFLOW.md`;
- corpus extraction/review → `tools/corpus-review/README.md`.

If current documents conflict, use the responsibility-specific owner identified in
`00-START-HERE.md`, then reconcile the stale prose rather than preserving both.
