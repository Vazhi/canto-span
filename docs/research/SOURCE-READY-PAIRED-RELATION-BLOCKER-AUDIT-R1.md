# Source-ready paired-relation blocker audit R1

## Purpose

This audit reopens PRQ2-010, PRQ2-011, PRQ2-012, and PRQ2-033 to look for substantive blockers that were not made explicit when the units were previously called “source-ready.” It is not an administrative restatement of the old packets.

The review tests four separate questions:

1. Does the checked evidence satisfy the current evidence-grade standard for the exact construction claim?
2. Did the proposed identity silently choose an unresolved profile, arity, polarity, omission, or discourse analysis?
3. Do the historical runtime collisions still exist in v0.5.218?
4. What evidence would actually permit an identity or runtime decision?

## Terminal result

**No new UUID is reserved by this package.** The four UUIDs proposed only on PR #452 are withdrawn before merge and are not present in `main`.

| Unit | Previous proposal | Blocker-audit disposition |
|---|---|---|
| PRQ2-010 | one `除咗 A (之外)，B` exclusion/addition identity | Narrow overt full-frame evidence recovered, but omission of `之外`, continuation licensing, and one-family/two-profile architecture remain unresolved |
| PRQ2-011 | one `唔單止…仲／而且仲` additive-correlative identity | Still lacks a clearly qualifying construction-level source or controlled judgment packet; complete pair versus discourse continuation remains unresolved |
| PRQ2-012 | exactly-two `一係…一係` identity | Direct grammar evidence partially clears the old lexical-category blocker, but binary versus n-ary identity and optional `就` remain unresolved |
| PRQ2-033 | positive exactly-two `又 A 又 B` coexistence identity | Direct negative `又…又` evidence exposes a polarity/profile omission; positive, negative, nominal, arity, and shared-domain architecture must be decided first |

Issue #431 remains open for evidence recovery and later identity adjudication. This audit closes only work claim #451.

## Evidence-grade blocker

The current standard distinguishes source verification from evidential weight. Dictionaries, lessons, manuals, isolated examples, corpus attestations, and runtime observations remain useful, but none independently qualifies a promotion-style core claim. A workbook or textbook is not automatically a reference grammar; its exact function must be read and graded.

All four existing source ledgers remain in the repository’s ungraded provenance baseline. PRQ2-010, PRQ2-011, and PRQ2-033 are also explicitly listed as known weak cores. Historical PR #7 separately warned that PRQ2-012’s Wong 2002 row supports the lexical category of `一係`, not the complete paired syntax.

This does **not** mean every provisional identity requires promotion-ready evidence. It means that the former PR #452 conclusion would have hardened four specific ontologies while the exact profile boundaries were still unresolved and while its “source-ready” premise relied on dispositions that predate the current grading standard.

## Newly recovered source opportunities

These are source-recovery findings, not silently accepted ledger migrations.

### Yip and Matthews 2017

`Intermediate Cantonese: A Grammar and Workbook` directly discusses three relevant areas:

- Unit 19 describes `除咗…之外` as a paired subordinate-clause expression and gives both an additive `仲` example and a restrictive negative example.
- Unit 17 distinguishes statement `一係…一係` from `定／定係` alternative questions and tentative `或者`, describing `一係` as a definitive choice.
- Unit 16 states that Cantonese expresses “neither…nor” through two negative clauses using `又…又`.

The official Routledge description presents the book as a grammar and workbook with analysis of contemporary Hong Kong Cantonese. It is a strong candidate for `REFERENCE_GRAMMAR_CORE`, but the project’s standard requires an explicit source-function adjudication rather than assigning the grade from the title or authors alone.

### Wong et al. 2022

The grammatical-analysis chapter associated with *Understanding Development and Disorder in Cantonese using Language Sample Analysis* lists `又…又` and `一係…一係` as Cantonese coordinating conjunction patterns and supplies Cantonese examples. It is a promising direct scholarly source, but its exact scope must be entered into a graded ledger before supporting a core disposition.

### 粵語（香港話）教程（修訂版）

The section on `唔單止` describes it as an additive conjunction normally paired with `仲`, `而且`, or `而且仲`, with complete examples. This materially strengthens the descriptive packet, but under the current standard a pedagogical source is not automatically promotion-qualifying. PRQ2-011 still needs either a qualifying direct analysis or controlled judgment evidence.

## Fresh runtime audit: v0.5.218

The historical collision packets were recorded against v0.5.213. Seventeen target and control surfaces were rerun against v0.5.218.

The implementation gap remains real:

- PRQ2-010 full frames are still generic `ClauseRelationGraph` structures; omitted-`之外` examples remain partial.
- PRQ2-011 complete pairs are still generic graphs, while the `而且仲` example exposes an unrelated `VocativeAddressTerm` substring collision.
- PRQ2-012 binary and three-option examples are still generic graphs with member-internal children but no choice relation.
- PRQ2-033 positive property pairs remain absent, modal/action pairs are swallowed by one broad `ModalVP`, and a negative pair remains untyped.

The fresh audit removes runtime staleness as an unknown. It does not supply linguistic evidence.

## Family findings

### PRQ2-010 — `除咗 A (之外)，B`

A narrower overt `除咗 A 之外，B` hypothesis now has direct grammar support. The previous candidate still overreached in three ways:

1. it treated omitted `之外` as part of the initial core;
2. it treated a broad continuation inventory as already licensed;
3. it assumed additive inclusion and restrictive exclusion are profiles of one identity rather than a frame whose interpretation comes from independently typed continuation semantics.

The next package must grade the recovered grammar source, contrast overt and omitted `之外`, and classify continuations with contextual corpus review and controlled judgments. A later terminal decision may reserve one identity, split profiles, or retain transparent composition.

### PRQ2-011 — `唔單止 A，仲／而且仲 B`

The complete pair is well attested and directly described pedagogically, but no currently adjudicated qualifying source supports the exact construction identity. Natural corpus examples without overt adjacent `仲` also make the pair’s obligatoriness unclear.

Required contrasts include `仲`, `而且`, `而且仲`, `都`, and no overt second marker, plus complete same-sentence pairs versus discourse continuation. Near-synonyms and register variants must remain separate until their distribution is checked.

### PRQ2-012 — `一係 A，一係 B`

The earlier scholarly-source blocker is partially resolved: Yip and Matthews directly analyze the paired statement pattern and distinguish it from alternative questions and tentative `或者`.

The proposed exactly-two UUID is still not terminal. HKCanCor contains a three-option `一係` list, so “exactly two” may be only an implementation convenience. Optional `就`, lone suggestion or ultimatum uses, and contextually omitted alternatives also require separate treatment.

The next decision must choose among a binary identity, an n-ary alternative-list identity, or one family with explicit arity profiles.

### PRQ2-033 — `又 A 又 B`

The withdrawn candidate was positive-only and excluded negative profiles. That boundary is not defensible: Yip and Matthews directly describe negative `又…又` clauses as the Cantonese strategy corresponding to “neither…nor.”

The live question is therefore not simply whether `又 A 又 B` exists. It is how to represent:

- positive properties and activities;
- negative paired clauses;
- nominal-list uses;
- two versus more members;
- shared subject, repeated subject, and subjectless discourse domain;
- first-marker omission and ordinary single-`又` polysemy.

A polarity/profile architecture must be decided before reserving a UUID.

## Required next work

1. Migrate all four source ledgers to the graded schema, reading each source’s exact function.
2. Add the recovered Yip–Matthews, Wong et al., and 粵語（香港話）教程 evidence with explicit limitations.
3. Build family-specific controlled contrasts rather than one shared implementation packet.
4. Review bounded corpus contexts for omission, arity, polarity, and discourse recovery.
5. Reopen identity reservation only after each family receives a terminal ontology decision.

No shared runtime implementation batch is authorized by this audit.
