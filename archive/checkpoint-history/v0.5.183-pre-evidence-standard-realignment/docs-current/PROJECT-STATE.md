# Project state

## Accepted baseline and active candidate

- accepted runtime: **v0.5.182**
- active render candidate: **v0.5.183-cp024-p1-demo01-r1**
- active promotion program: **CP024-P0-R1**
- active throughput target: **`OvertHeadDemonstrativeClassifierNP`**
- retained prior research: **CP023-P1-PROG01-R3**
- candidate active registry: **181 labels**
- candidate language or lexicalized-language labels: **160**
- externally mapped candidate language labels: **159**
- explicit source-gap quarantine: **1** (`ScalarRangeFragment`)
- candidate internal representation or heuristic labels: **21**
- unaccounted active labels: **0**
- accepted `supported_productive`: **2**
- candidate productive delta: **0**

The accepted v0.5.182 baseline remains authoritative until v0.5.183 passes render and prospective held-out evaluation. Candidate count changes reflect decomposition into a narrow overt-head language subtype and a separate headless subtype, not an accepted promotion.

## Accepted productive constructions

- `PostverbalZoPerfectiveVP`: narrow simple V-咗-overt-object profile only.
- `ResourceUseLaiFunctionRelation`: narrow overt resource + adjacent 用嚟/用來 + overt non-perfective action-predicate function profile only.

Broad `PerfectiveVP` and `IntendedFunctionRelation` remain unpromoted.

## Active candidate scope

`OvertHeadDemonstrativeClassifierNP` licenses only:

`proximal_or_distal_demonstrative + overt_classifier + overt_complete_nominal_head`

It excludes headless D-CL, overt numerals, `啲`, wh forms, missing classifiers, incomplete heads, hidden material, and unresolved modified/associative attachments.

Candidate implementation results:

- visible required exact: **9/9**;
- forbidden target leakage: **0/8**;
- unresolved promoted: **0/3**;
- full-root coverage: **17/20**;
- inherited aggregate regression: **543/543 PASS**, with exactly two focused headless transitions held outside the inherited snapshot until acceptance;
- source accounting and retention: **PASS**;
- claim provenance: **PASS**;
- grammar legitimacy: **PASS**;
- `supported_productive`: still **2**.

`HeadlessDemonstrativeClassifierNP` is deliberately separate, inserts no noun, and remains `research_pending`. `DemonstrativeClassifierNP` is now only a compatibility alias. The `DemonstrativeHeadNP` runtime template is retired as a misanalysis.

## Custody state

The external evaluator returned `CP024-P1-DEMO01-HELDOUT-EXTERNAL-1.zip`.

- raw SHA-256: `7cda111ca194b6159a37c91b789984fdc0c35d6c35d643260810df0cdd5015c4`
- checksum verification: **PASS**
- archive state: **sealed and unopened**
- reuse status: not yet consumed

The archive must not be listed, opened, extracted, or inspected before passing render review and confirming the candidate hashes. Any behavior change after opening invalidates the result and requires a new independently sealed packet.

## Current external obstacle

Actual Obsidian render review is now the only user-controlled blocker for DEMO01. Install the candidate, render `CANTO-SPAN-v0.5.183-RENDER-REVIEW.md`, and return the acceptance-summary and full-diagnostics JSON. Native-speaker review is not currently triggered because no exact source–speaker conflict is recorded for this narrow target.

## Productive-promotion endpoint

The endpoint remains universal claim resolution, not indiscriminate relabeling. Every surviving productive public-language construction must eventually become a narrowly supported subtype; internal machinery, lexicalized families, duplicate umbrellas, and misanalyses must remain bounded, merge, or retire.

## Next action

1. User completes the 20-row Obsidian render review.
2. Verify returned diagnostics against the frozen v0.5.183 candidate.
3. Freeze final pre-heldout hashes.
4. Open and evaluate the external held-out packet once.
5. On pass, absorb the two focused regression transitions, promote only the overt-head subtype, rerun all acceptance gates, and package the accepted release.
6. On failure, roll back or revise without reusing the consumed packet.

## Canonical records

- candidate implementation: [`../research/CP024-P1-DEMO01-IMPLEMENTATION-CANDIDATE-R1.md`](../research/CP024-P1-DEMO01-IMPLEMENTATION-CANDIDATE-R1.md)
- render review: [`../../CANTO-SPAN-v0.5.183-RENDER-REVIEW.md`](../../CANTO-SPAN-v0.5.183-RENDER-REVIEW.md)
- obstacle register: [`../research/CP024-P0-OBSTACLE-REGISTER-R1.tsv`](../research/CP024-P0-OBSTACLE-REGISTER-R1.tsv)
- accepted baseline: [`../../CANTO-SPAN-v0.5.182-ACCEPTANCE.md`](../../CANTO-SPAN-v0.5.182-ACCEPTANCE.md)
- candidate validation: `../../validation/v0.5.183-cp024-p1-demo01-r1/`
