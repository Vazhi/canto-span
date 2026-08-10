# Issue 712 — AA49 current test-scope audit R1

Date: 2026-08-10
Construction: AA49 `IndependentMotionPredicateVP`
Legacy runtime label: `DirectionalMotionVP`
Fixture: `tests/constructions/DirectionalMotionVP.json`
Audit basis: exact branch fixture inventory from the temporary read-only workflow plus the source-bounded dispositions in the companion issue-712 research notes.

## Purpose

This memo audits what the current 74-cell `DirectionalMotionVP` fixture family actually demonstrates after the AA49 identity was narrowed to **independently predicative lexical motion/path VP**.

The fixture family is implementation evidence. Its size, age, parser reach, or passing status has **zero independent linguistic evidence weight**. The question here is not whether current tests pass, but which cells are compatible with the source-bounded AA49 identity, which cells only demonstrate outer composition, and which cells belong to neighboring directional structures.

No executable expectation changes are made in this task.

## Mechanical inventory

The standard fixture currently declares:

- 74 executable cases total;
- 72 positive exact-snapshot cases;
- 2 explicit boundary cases;
- 0 implementation probes.

The read-only runtime inventory found:

- 78 live `DirectionalMotionVP` nodes across the 72 positive cases;
- 10 root AA49 nodes;
- 68 AA49 nodes nested under another construction;
- 10 distinct AA49 surfaces.

Observed AA49 surfaces:

| Runtime surface | Live node count | Research disposition |
|---|---:|---|
| `去` | 55 | Potential AA49 core only when it is itself the motion predicate; outer material must be assessed separately |
| `嚟` | 8 | Potential AA49 core only when independently predicative |
| `走` | 4 | Directly compatible with single-verb motion encoding |
| `返嚟` | 3 | Compound directional; outside narrow AA49 identity |
| `落嚟` | 3 | Compound directional; outside narrow AA49 identity |
| `上去` | 1 | Compound directional; outside narrow AA49 identity |
| `返去` | 1 | Compound directional; outside narrow AA49 identity |
| `行入去` | 1 | Manner + directional sequence; outside narrow AA49 identity |
| `行出嚟` | 1 | Manner + directional sequence; outside narrow AA49 identity |
| `行返過嚟` | 1 | Manner + multi-part directional sequence; outside narrow AA49 identity |

This exposes the central test-scope problem: the current family both **overreaches structurally** and **undercovers the directly sourced independent-predicate core**.

## Finding 1 — simple lexical predicate coverage is dominated by `去`

The current live AA49 nodes contain 67 simple surfaces in the set `去/嚟/走`:

- `去`: 55;
- `嚟`: 8;
- `走`: 4.

Most of these may contain a legitimate narrow AA49 subspan, but the containing test sentence often measures a different outer construction at the same time.

The two reviewed sources directly support additional independent predicate behavior, especially `落` and, in Shan & Jin's broader path-verb inventory, other single path verbs. The current fixture has **no clean bare `落` AA49 node**: every observed `落` AA49 surface is `落嚟`, which belongs to compound-directional structure under the re-audit.

Therefore fixture frequency cannot be read as lexical productivity evidence. The suite currently has heavy historical coverage of `去`, modest `嚟/走` coverage, and a gap exactly where the source inventory gives a clean predicate/complement contrast for `落`.

## Finding 2 — at least 12 current positives are outside the narrow AA49 identity

Eleven positive cases produce a multi-part or complex directional surface as `DirectionalMotionVP`:

- `行入去。`
- `行出嚟。`
- `行返過嚟。`
- `佢會返嚟啩。`
- `我上去。`
- `我落嚟。`
- `我落嚟摘芒果食。`
- `我攞本書返嚟畀你睇。`
- `寄返去。`
- `落嚟摘芒果食。`
- `攞返嚟。`

These are not evidence for the narrow independent single-predicate AA49 identity. The companion source review assigns compound directionals, manner + direction, and postverbal directional-complement structures to neighboring analyses.

A twelfth positive, `我帶咗三部機去啊。`, currently emits a root `DirectionalMotionVP` over `去`. In this sentence `去` follows a caused-motion/transitive predicate and is structurally analogous to the postverbal directional-complement uses explicitly distinguished from independent predicates in Yiu 2016. It therefore must not inherit AA49 evidence merely because the runtime surface is the single character `去`.

These cells remain unchanged here because this issue is research-only. They should become explicit migration targets in a later accepted runtime-alignment task.

## Finding 3 — most positive cells are really composition coverage

Only 10 live AA49 nodes are roots. The remaining 68 nodes occur under outer structures.

Observed parent counts:

| Parent | AA49 node count |
|---|---:|
| `<root>` | 10 |
| `ClauseSpan` | 18 |
| `MotionGoalVP` | 10 |
| `NegatedDirectionalMotionVP` | 10 |
| `ModalVP` | 10 |
| `ClauseRelationMemberSpan` | 5 |
| `LocativeWhQuestion` | 4 |
| `DesiderativeVP` | 3 |
| `VerbComplementVP` | 3 |
| `SerialVerbPurposeChain` | 2 |
| `PolarQuestionFrame` | 1 |
| `ModalANotAQuestion` | 1 |
| `ReportedSpeech` | 1 |

The source review directly licenses some surrounding endpoint/location and perfective material, but it does not make every modal, negation, particle, question, discourse, cognition, reported-speech, or clause-linking wrapper part of AA49.

The fixture inventory tags show the scale of this composition layer:

- higher clause/discourse material: 26 cases;
- final-particle material: 22;
- modal/modal-question material: 19;
- wh/polar-question material: 18;
- negation: 14;
- perfective/aspectual material: 12;
- overt goal/location candidates: 10.

These categories overlap. Their purpose in a future cleaned suite should be explicit: **prove that a narrow AA49 child composes correctly**, not count the whole sentence as independent evidence for AA49.

## Finding 4 — existing negatives are useful but do not cover the decisive structural boundary

The two current explicit boundaries are:

- `圖書館係乜嘢嚟㗎。`
- `呢個用嚟切嘢。`

Both are useful lexical/function controls: surface `嚟` is present but is not a motion predicate.

They do not test the central source-backed AA49 distinction between an independently predicative directional verb and the same or related directional material used as:

- a postverbal directional complement;
- a compound directional expression;
- a manner + path sequence;
- a caused-motion directional component;
- grammaticalized/aspectual `落去` or `起嚟` material.

The current boundary inventory therefore remains incomplete.

## Finding 5 — current fixtures should be split by evidentiary role before runtime alignment

A later runtime/test alignment should classify existing cells into at least four explicit roles.

### A. AA49 core positives

Cells where a source-bounded single lexical motion/path item is itself the predicate. Clean source-linked additions should include at minimum directly attested independent `落`, while preserving already valid `去`, `嚟`, and `走` profiles.

### B. AA49 child-composition positives

Sentences where a valid narrow AA49 subspan is nested under independently typed goal, aspect, negation, modal, question, particle, clause, or discourse material. The assertion should target the **inner AA49 span**, not treat outer structure as AA49 evidence.

### C. Neighboring-construction boundaries

Current positives whose `DirectionalMotionVP` surface is a compound directional or a postverbal directional complement should cease to be positive evidence for AA49 once the neighboring runtime identities can own them without regression.

Priority examples:

- `行入去。`
- `行出嚟。`
- `行返過嚟。`
- `我上去。`
- `我落嚟。`
- `我帶咗三部機去啊。`
- `我攞本書返嚟畀你睇。`
- `寄返去。`
- `攞返嚟。`

### D. Lexical/function negatives

Retain explicit non-motion `嚟` controls such as the two current boundaries.

## Required future boundary matrix

Before a runtime-alignment issue is accepted, its executable plan should include controlled contrasts for:

1. independent `去/嚟/落/走` predicate vs postverbal directional-complement role;
2. single predicate vs two-part directional (`上去`, `落嚟`, `返嚟`, etc.);
3. single predicate vs manner + directional (`行入去`, `行出嚟`);
4. independent spatial `落/起` vs grammaticalized/aspectual `落去/起嚟` where source support permits a clean contrast;
5. source-linked goal/location and perfective composition while keeping the AA49 node narrow;
6. outer modal/negation/question/particle/clause wrappers that preserve the same narrow child span;
7. non-motion lexical/function uses of `嚟`.

Unknown or weakly sourced lexical members should remain unresolved rather than being retained solely because an old snapshot currently passes.

## Current disposition

- Current executable behavior: unchanged.
- Current 74-cell fixture: retained unchanged as historical implementation evidence in this research task.
- Linguistic status: remains `research_pending`.
- AA49 evidence scope: independent lexical motion/path predicate role only.
- Boundary inventory: incomplete.
- Runtime alignment: required as a separate later task after this research PR merges.
- Fixture/test frequency: evidence weight zero.

The later alignment should reduce semantic ambiguity in what a `DirectionalMotionVP` positive means: a positive should either assert a narrow source-bounded AA49 node or be reclassified to the appropriate neighboring construction, never rely on surface directional vocabulary alone.
