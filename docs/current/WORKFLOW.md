# Workflow

Every status change and release handoff must satisfy [`DEFINITION-OF-DONE.md`](DEFINITION-OF-DONE.md). Process completion cannot substitute for missing evidence.

## A. Construction-level work

1. Select a bounded question.
2. Verify every cited source and manually review every counted corpus example.
3. State the exact claim, competing analyses, boundaries, and executable negative cases.
4. Record Speaker A evidence when available. Preserve the two-speaker requirement; second-speaker work is currently frozen.
5. Compare the documented claim with the actual heuristic.
6. Implement only the narrow evidence-faithful change.
7. Run focused, boundary, preservation, regression, semantic, render, and prospective held-out checks as applicable.
8. Update the construction note's machine-readable evidence fields.
9. Run `node tools/test-promotion-gate.js` and `node tools/enforce-promotion-rules.js`.
10. Report implementation results separately from linguistic status.
11. Accept, revise, quarantine, reject, or retire.

## B. Shared parser-subsystem work

A shared subsystem is its own work unit. It must not be hidden inside a construction-specific patch.

1. Specify the reusable structural rules and exclusions.
2. Define typed outputs, including provisional fallback states that cannot license evidence-gated constructions.
3. Ground the rules at the reference-grammar level.
4. Freeze positive, malformed, ambiguity, unknown-token, and preservation tests.
5. Include unseen lexical items and unseen combinations not copied from motivating examples.
6. Implement the smallest reusable subset.
7. Validate the subsystem independently before connecting it to consuming constructions.
8. Integrate one consumer at a time without changing that consumer's linguistic claim or status automatically.

The current subsystem work unit is [`NOUN-PHRASE-SUBSYSTEM.md`](NOUN-PHRASE-SUBSYSTEM.md).

## Unknown and ambiguous analyses

Unknown or low-confidence nominal recovery may be displayed as `provisional_np_candidate`, but it cannot cause an evidence-gated construction to fire.

When internal attachment is unresolved, preserve multiple parses or an explicit ambiguity record. Do not select one analysis for implementation convenience. A consumer may use the shared outer span only when its claim is independent of the unresolved attachment.

## Code and documentation

Read the actual heuristic against the public description. Correct code or documentation before claiming alignment. The runtime is ground truth for current behavior; current doctrine is ground truth for governance.

## Dormant-label retirement

Every 10–20 semantic versions, audit zero-fixture, zero-runtime-reference labels with no forward research progress. Retire labels that serve no clear planned purpose and preserve their history under `archive/` or the retirement register.

## Held-out testing

Open a sealed held-out set once, only after its applicable linguistic blockers, code-document review, and render review are complete. Revealed cases become ordinary regression cases and cannot be reused as prospective evidence.

Abandoned evaluation packets must not be reused as prospective evidence for a later candidate.

## Second-speaker freeze

Do not recruit, schedule, prepare new Speaker B packets, or request second-speaker work until the user explicitly unfreezes it. The two-speaker requirement remains mandatory for `supported_productive`.

## Commit and export discipline

Commit after changed parser behavior, executable tests, verified evidence that changes a claim, a legitimate status change, a retirement, or a binding design decision that directly enables implementation.

After the commit, export the full repository including `.git/` with `tools/export-git-working-copy.sh` and store it outside the sandbox. Do not create parallel ledgers or recovery packages merely to restate unchanged validation results.
