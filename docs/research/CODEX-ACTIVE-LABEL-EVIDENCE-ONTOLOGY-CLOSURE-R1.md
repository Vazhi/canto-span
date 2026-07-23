# Codex prompt — active-label evidence and ontology closure

Implement the active-label evidence and ontology closure track from a clean branch based on `main` at or after commit `fee239474e758213d51bad1c77dbca497ef533ef`.

Read `docs/research/ACTIVE-LABEL-EVIDENCE-ONTOLOGY-CLOSURE-R1.md` and every affected grammar note's `Evidence and ontology closure guidance` section before editing.

Process the original 37 `unsupported_generalization` and 15 `parser_heuristic` labels in the handoff's family order. For each, verify runtime behavior and exact source scope, then implement one defensible disposition: retain narrow, rename, decompose/replace, internalize, quarantine, or retire.

Do not retire because research or panel evidence is incomplete. Retirement must satisfy the handoff gate and preserve valid surfaces, boundaries, ambiguity, learner-visible meaning, diagnostics, and A1/schema compatibility. Do not promote retained language profiles without meeting existing governance and role-neutral panel thresholds. Give retained serialized internal nodes stable JSON semantics, invariants, and explicit nonlicensing behavior.

Update existing canonical runtime, grammar notes, tests, research links, retirement archive, release baseline, documentation, compatibility behavior, and release audit together. Correct the stale grammar index and ambiguous retirement-review state. Do not create parallel ledgers or new verification frameworks.

Work autonomously in large coherent families and commit completed slices. Finish only when all original 52 dispositions are recorded and `npm test`, `npm run verify`, `npm run verify:release`, and `git diff --check` pass.
