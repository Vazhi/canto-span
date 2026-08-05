# Generated-output execution handoff

This document defines how Canto Span handles source-first packages that require generated outputs when the active ChatGPT connector cannot itself run repository commands and commit the resulting files coherently.

The immediate example is #597/#598, which requires runtime source changes, construction-identity allocation, generated identity outputs, a regenerated runtime bundle, and verification in one reviewed repository state.

This protocol does not create a permanent automatic writer, change runtime behavior, generate files, allocate identities, promote statuses, publish releases, or transfer decision authority.

## When this protocol applies

Use this protocol only when all of the following are true:

1. A scoped issue and work claim already define a substantive source-first package.
2. The package requires generated outputs that must be produced by repository commands, such as:
   - `npm run build:runtime`;
   - `npm run adjudication:apply`;
   - `npm run identity:generate`;
   - `npm run discovery:generate`;
   - `tools/allocate-construction-identity.js`;
   - other documented write-mode generators.
3. The active assistant or connector can review and edit source files but cannot safely run the generator and commit the resulting files coherently.
4. Publishing a partial branch would create known failing required checks or stale generated outputs.
5. The parent issue already states the protected state and reserved decisions.

Do not use this protocol for ordinary documentation, research notes, corpus findings, survey governance, or other work that does not require generated outputs.

## Ownership rule

A generated-output handoff does not transfer issue ownership or expert decision authority.

The parent issue remains owned by the active worker recorded in the work claim. A human or external execution surface may act only as a command runner and committer for the exact requested generation step.

The command runner must not:

- decide linguistic status;
- allocate a UUID or short code manually;
- edit generated outputs by hand;
- broaden source scope;
- change parser behavior beyond the scoped source patch;
- edit survey, corpus, panel, held-out, release, or deployment state;
- resolve ambiguous evidence;
- merge the branch unless the normal merge policy allows it and the active worker has completed review.

## Required handoff packet

Before any external generated-output run, the active worker must write a handoff packet in the parent issue, claim issue, or pull-request body containing:

- parent issue and work claim;
- branch name and exact base commit;
- exact source changes expected before generation;
- exact commands to run, in order;
- exact generated files expected to change;
- files that must not change;
- protected state;
- reserved decisions;
- required validation commands;
- how to report results back;
- whether the command runner should commit or only return artifacts.

If any item is unknown, stop before running generation.

## Command-runner requirements

A human or external execution surface may run commands only from a clean checkout of the named branch.

Before running commands:

```bash
git status --short
git rev-parse HEAD
git fetch origin
git status --branch --short
```

The runner must confirm that the checkout is on the exact branch and expected head or report the mismatch without changing files.

Run only the commands in the handoff packet. Do not run broad fixers, formatters, dependency updates, package upgrades, or cleanup commands unless explicitly authorized.

## Generated-output rules

Generated files must come from canonical commands.

Allowed:

- committing files changed by the named generator;
- committing generated runtime bundle output from `npm run build:runtime`;
- committing allocator-derived identity files after `tools/allocate-construction-identity.js`;
- committing deterministic discovery, status, lock, index, or package outputs named in the handoff.

Forbidden:

- hand-editing generated JSON, lock files, bundles, discovery output, or package output;
- copying generated content from another branch without rerunning the generator unless the handoff explicitly identifies the immutable source commit and explains why byte identity is required;
- committing verification reports under `validation/current/` unless the parent issue explicitly requests a retained report with continuing value;
- adding temporary workflow write-back or commit-and-push automation as a permanent solution;
- committing unrelated generated drift.

## Commit requirements

If the handoff authorizes the runner to commit, the generated-output commit must include:

- the parent issue number;
- the exact command family run;
- a statement that generated outputs were produced by repository commands;
- no unrelated changes.

Suggested commit message format:

```text
Generate outputs for <issue number> <short purpose>

Commands:
- <command 1>
- <command 2>

Generated outputs only; no hand-edited generated files.
```

If source and generated files are committed together, the PR body must make the source/generated relationship explicit.

## Required return evidence

After the run, the command runner or external execution surface must report:

- final branch head SHA;
- commands run;
- command exit status;
- changed files;
- generated files changed;
- protected files confirmed unchanged;
- validation commands and results;
- whether the working tree was clean after commit;
- any warnings, failures, unexpected drift, or manual interventions.

The active worker must not resume review or merge until this evidence is available.

## Active-worker review after handoff

After generated-output handoff, the active worker must independently check:

1. The branch head matches the reported head.
2. All changed files are within authorized scope.
3. Generated files are explainable from the named canonical commands.
4. No protected state changed silently.
5. Required tests and verifiers passed.
6. The PR body records source files, generated files, commands, and limitations.
7. Any review comments or failures are resolved substantively.

Passing generation does not prove linguistic evidence. It only proves implementation/generation consistency.

## Failure handling

If generation fails:

- do not commit partial generated outputs;
- report the exact command, exit code, and relevant log excerpt;
- leave the parent issue open or blocked;
- close any partial draft PR if it cannot become coherent;
- do not broaden the scope to fix unrelated failures.

If generation exposes an unrelated stale-output or verifier problem, create or update a separate issue unless fixing it is necessary for the selected parent outcome and remains within authorized scope.

## Example: #597/#598

#597/#598 require a generated-output handoff because the final package must include all of the following coherently:

- source-first runtime matcher changes;
- runtime label registry update;
- candidate UUID canonicalization with `tools/allocate-construction-identity.js`;
- generated identity, lock, status, discovery, and test-index outputs;
- `npm run build:runtime` generated `main.js`;
- runtime and full verification.

The implementation is blocked until a runner can execute those commands from the branch and return a clean generated-output commit with the required evidence. The runner must not manually assign the short code, edit generated identity files, promote status, or make a release/deployment decision.
