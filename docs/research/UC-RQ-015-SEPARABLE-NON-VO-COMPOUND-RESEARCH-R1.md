---
title: UC-RQ-015 — Separable non-VO compound construction
research_id: UC-RQ-015
status: active_research_unit
baseline_version: 0.5.208
created: 2026-07-23
implementation_authorized: false
status_change_authorized: false
---

# UC-RQ-015 — Separable non-VO compound construction

## Research decision

A dedicated research unit is justified. Chan and Cheung 2020 provide a systematic
Cantonese study of separability in coordinate, subordinative, subject-predicate,
verb-resultative, and structurally unclassified disyllabic verbs. Non-VO separation
is limited, varies by morphological structure and inserted element, and differs from
VO separation—especially in rejecting movement of the final component.

The source argues that the underlying identity of non-VO separable compounds is
lexical because most have no independently available phrasal form. `ProductiveVO`
therefore cannot be generalized to them. Existing result-complement and potential
nodes can analyze independently supported resultative phrases, but they cannot serve
as a residual representation for coordinate, subordinative, subject-predicate, or
lexically idiosyncratic compound separation.

This note does **not** authorize compound splitting, aspect or particle insertion,
resultative reanalysis, new lexical entries, parser behavior, grammar status changes,
or productive acceptance.

## Safest checked core

Study 1 collected 445 non-VO Cantonese items and classified an item as separable only
when a web search and two native judges each accepted at least one separation method.
The aggregate results were:

| Morphological type | Items | Separable under criterion |
|---|---:|---:|
| coordinate | 111 | 18 (16%) |
| subordinative | 90 | 18 (20%) |
| subject-predicate | 26 | 2 (8%) |
| verb-resultative | 175 | 82 (47%) |
| unclassified | 32 | 5 (16%) |
| all reported non-VO categories | 445 | 127 (29%) |

Study 2 selected 30 non-VO items plus three VO baselines and tested nine separation
methods with 45 participants, fifteen per test set. It found:

- separability differed by morphological type and separating element;
- `jyun4` insertion was most acceptable overall in the selected non-VO items;
- movement of the final morpheme/syllable was least acceptable;
- verb-resultative items favored `dak1`, while coordinate, subordinative, and
  unclassified items patterned more favorably with aspect markers;
- duration and frequency phrases were generally disfavored because intervening
  material could not be too large;
- the final component's movement was treated as unavailable for non-VO compounds.

Examples such as `jing2-jyun4-jan3` “finish photocopying,” `tung4-jyun4-geoi1`
“finish cohabiting,” and `dei6-gwo3-zan3` “have experienced an earthquake” show
that separation cannot be restricted to one morphological class or one aspect marker.
The source also supplies inseparable contrasts within the same broad classes.

## Checked source findings

The source-verification ledger is:

`UC-RQ-015-SEPARABLE-NON-VO-COMPOUND-SOURCE-VERIFICATION-R1.tsv`

### Chan and Cheung 2020

The official author-hosted journal PDF verifies the inventory, morphological classes,
web and judgment procedures, aggregate counts, controlled Study 2 design, separation
methods, category interactions, movement boundary, and lexical-identity analysis.

Study 1's two-judge and uncontrolled-string methods provide an inventory screen, not
final item licenses. Study 2 deliberately selected more separable candidates and split
297 judgments across three participant groups. Its class means do not prove that every
member accepts the class-preferred separator.

### HKCanCor item-level checkpoint

`UC-RQ-014-015-SEPARABLE-COMPOUND-HKCANCOR-ATTESTATION-R1.md` checks ten
published exemplars against natural conversational data. It finds contiguous `影印`,
`小息`, `拍拖`, `遲到`, and `比賽` tokens but no checked short-separator sequence
between their components; the other queried exemplars are absent. This is insufficient
negative evidence to contradict the study, but it leaves natural item-by-separator
licenses quarantined. In particular, contiguous `影印` followed by `咗` is not evidence
for separated `影咗印`.

## Exact collision audit

The collision ledger is:

`UC-RQ-015-SEPARABLE-NON-VO-COMPOUND-COLLISION-AUDIT-R1.tsv`

### Current `ProductiveVO`

The target compounds are specifically non-VO in their stored morphological relation.
Some may acquire phrase-like behavior under restricted separation, but the source does
not reduce them generally to verb-object phrases. `ProductiveVO` would misstate both
their internal relation and their low/item-specific separability.

### Current result-complement nodes

`ResultComplement`, `ResultComplementVP`, `PotentialResultVP`, and
`NegativePotentialComplement` cover particular sourced resultative or potential
profiles. A verb-resultative compound separated by potential material may require one
of those phrasal analyses—the source itself notes this boundary—but that does not cover
the lexical compound relation, aspect-separated resultatives, or any non-resultative
class.

### UC-RQ-014 separable VO compounds

VO and non-VO items belong to the broader separable-compound problem but show
different aggregate rates, separator profiles, component roles, and movement behavior.
They should coordinate under a future shared lexicon without merging their current
research boundaries.

## Required boundaries

Future research must distinguish:

- coordinate, subordinative, subject-predicate, verb-resultative, and unclassified
  lexical structures;
- lexical compounds from independently generated phrases after separation;
- perfective, experiential, progressive, `dak1`, `saai3`, `jyun4`, duration, and
  frequency separation;
- insertion from movement/topicalization of the final component;
- true separation retaining lexical meaning from accidental character sequences;
- resultative compounds from potential/resultative phrases;
- free versus bound component morphemes without assuming this predicts separability;
- aggregate class tendencies from item-specific acceptance;
- web attestations, author judgments, controlled ratings, natural audio, and regional
  variation.

## Research tasks before any implementation proposal

1. Recover the complete 445-item ledger with morphological classification and all
   source-specific separator results.
2. Record every Study 2 stimulus, mean, variance, participant group, and intended
   interpretation.
3. Revalidate representative positive, negative, and variable items in controlled
   contexts with multiple modern speakers.
4. Test retention of the unsplit lexical meaning after each accepted separation.
5. Build exact boundaries between lexical VR separation and independently sourced
   result/potential phrases.
6. Coordinate a shared compound lexicon with UC-RQ-014 while keeping VO/non-VO
   operations distinct.
7. Audit parser output only after item-level profiles are frozen.

## Provisional research outcome

| Question | Current answer |
|---|---|
| Are separable non-VO Cantonese compounds independently documented? | **Yes.** |
| Are they generally as separable as VO compounds? | **No; 29% versus 62% under Study 1's criterion.** |
| Does morphological class affect separator compatibility? | **Yes in both studies.** |
| Is final-component movement supported? | **No in the checked study.** |
| Can result-complement nodes cover the whole family? | **No.** |
| Are exact item-by-separator licenses complete? | **No; quarantined.** |
| Did the focused natural-corpus check confirm one checked separation? | **No; only contiguous or absent forms occurred.** |
| Is a dedicated research unit justified? | **Yes.** |
| Is parser implementation authorized? | **No.** |

## Exit conditions

UC-RQ-015 may leave active research only after one of these dispositions is justified:

- **typed non-VO separable-compound lexicon:** morphological class, lexical meaning,
  separator, movement, phrase-boundary, and variation profiles are stable;
- **compositional merge:** lexical identity and independently supported phrasal
  operations preserve every restriction without loss;
- **quarantine:** item, interpretation, judgment, or resultative boundaries remain
  inadequate;
- **retire:** a complete collision audit proves ordinary lexical and phrase structures
  sufficient.

Until then, current grammar statuses and parser behavior remain unchanged.
