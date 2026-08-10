# Issue 712 — AA49 IndependentMotionPredicateVP profile dispositions R1

Date: 2026-08-10
Construction: AA49 `IndependentMotionPredicateVP`
Legacy runtime label: `DirectionalMotionVP`

## Decision

Retain AA49 as a narrow **independently predicative lexical motion/path VP**. The decisive boundary is syntactic role, not the mere presence of a directional lexeme.

The reviewed sources independently establish that Cantonese directional/path verbs can head predicates, and Yiu 2016 explicitly contrasts those predicate uses with postverbal directional-complement uses. Shan & Jin 2025 additionally separates single-verb motion encoding from serial/path and resultative encoding.

## Profile A — directly supported AA49 core

### Core shape

`[ lexical motion/path predicate ]`

Directly attested lexical heads include:

- `去`
- `嚟`
- `落`
- `走`

Shan & Jin additionally attest independent `上、入、出、過、返` and other single motion verbs in the broader motion system. That broader inventory is a research observation only; this task does not expand runtime recognition.

### Directly supported surroundings

The sources directly show that an independent motion predicate may coexist with:

- an overt endpoint/location: `去北京`, `去咗辦公室`, `嚟咗辦公室`, `落咗樓下`;
- perfective `咗`: `去咗`, `嚟咗`, `落咗`, `走咗`.

These are compositional surroundings. The permanent AA49 identity remains the independent predicate itself.

## Profile B — valid outer composition, not new AA49 evidence

A source-backed AA49 predicate may be embedded in larger runtime structures. Current fixtures include:

- `MotionGoalVP` around `去`;
- `NegatedDirectionalMotionVP` around `去/嚟`;
- `ModalVP`, `DesiderativeVP`, and modal A-not-A hosts;
- wh/polar question frames and final particles;
- clause and clause-relation wrappers;
- reported/cognition material;
- temporal and discourse material.

For this re-audit, such cases may continue to demonstrate parser composition, but their outer material has **zero independent evidentiary weight for AA49** unless separately source-linked. A valid embedded AA49 node does not make the containing clause an AA49 construction.

## Profile C — neighboring constructions, excluded from AA49 identity

### Compound directional motion

Examples in the current fixture family include:

- `返嚟`
- `上去`
- `落嚟`
- `返去`
- `返過嚟`

These are source-supported motion structures, but the accepted AA49 adjudication explicitly excludes multi-part directional material from the independent single-predicate identity. They belong with compound-directional analysis where independently licensed.

### Manner/caused-motion + direction

Examples include:

- `行入去`
- `行出嚟`
- `行返過嚟`
- `我帶咗三部機去啊`
- `我攞本書返嚟畀你睇`
- `寄返去`
- `攞返嚟`

Yiu 2016 explicitly analyzes comparable `跑…落/去/嚟` and `擰…去/嚟` strings as complement structures rather than independent uses of the directional form. These profiles therefore cannot inherit AA49 evidence.

## Profile D — lexically or structurally unresolved extensions

The source set does not by itself settle every current runtime edge. Examples such as unusual wh goals (`去邊個`) or all modal/discourse combinations should remain implementation-only unless a separate source establishes the relevant outer construction. Their presence in the test suite is not a reason to broaden AA49.

## Negative boundaries

The current two explicit negative cases remain useful because they show that orthographic `嚟` does not imply motion:

- `圖書館係乜嘢嚟㗎。`
- `呢個用嚟切嘢。`

Both are outside AA49 for independent reasons: copular/identificational `嚟` and `用嚟` functional material are not motion predicates.

## Runtime-alignment implication for later work

A later runtime-alignment task should operate on the **AA49 node boundary**, not by deleting every larger test sentence that contains `去/嚟/走`. The desired architecture is:

1. recognize a source-bounded independent motion predicate subspan when present;
2. let goal/aspect/negation/modal/question/clause structures own their own outer spans;
3. route compound directionals and postverbal directional complements to neighboring identities;
4. preserve unresolved cases rather than force them into AA49.

This task does not authorize that runtime migration.

## Status disposition

- Identity: retain AA49 / `IndependentMotionPredicateVP`.
- Linguistic status: retain `research_pending`.
- Evidence scope: narrow to independent lexical predicate role.
- Runtime: unchanged in this task.
- Test expectations: unchanged in this task.
- Promotion: not authorized.
