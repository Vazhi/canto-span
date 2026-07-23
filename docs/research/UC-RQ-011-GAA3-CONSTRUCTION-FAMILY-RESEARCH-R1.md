---
title: UC-RQ-011 — Sentence-final gaa3 construction family
research_id: UC-RQ-011
status: active_research_unit
baseline_version: 0.5.208
created: 2026-07-23
implementation_authorized: false
status_change_authorized: false
---

# UC-RQ-011 — Sentence-final `gaa3` construction family

## Research decision

A dedicated research unit is justified. Yu and Hu 2025 identify sentence-final
`gaa3` in five discourse environments—plain statement, simple information-seeking
question, exclamation, warning, and quick-answer-demanding question—and analyze
them as three syntactic profiles.

The current `DiscourseParticleFrame`, `FocusParticleFrame`, and
`PolarQuestionFrame` are internal parser representations. They can preserve visible
particle scope or question structure but do not independently encode the source's
clause-type, discourse-force, response, lengthening, and co-occurrence contrasts.

This note does **not** authorize new runtime subtypes, particle-cluster rules,
prosody inference from text, parser behavior, grammar status changes, or productive
acceptance.

## Safest checked core

Yu and Hu distinguish five contextual uses and group them into three structural
profiles:

| Profile | Contexts | Source-backed contrast |
|---|---|---|
| focus-only `gaa3` | plain statement; simple information-seeking question | Clause type supplies statement versus question; `gaa3` highlights factuality/current discourse relevance. |
| focus + degree `gaa3` | exclamation | Adds complaint/dissatisfaction and strong speaker commitment without soliciting a response. |
| focus + degree + call-on-addressee `gaa3` | warning; quick-answer-demanding question | Requires an addressee reaction or answer and is described with a lengthened vowel. |

The five environments are not five unrelated homophones: the authors give a unified
cartographic analysis in which every occurrence begins in a focus position, while
the latter profiles involve additional movement. Conversely, the profiles cannot be
collapsed into one surface-only particle rule because their clause compatibility,
co-occurrence, response demands, and phonological realization differ.

## Checked distributional findings

The official full text directly reports that:

- plain-statement and simple-question `gaa3` can follow event/temporal particles,
  cannot co-occur with another focus particle, and may precede selected higher
  particles;
- exclamative `gaa3` marks complaint/dissatisfaction and cannot combine with the
  tested focus, modality, interrogative, imperative, or emotion particles;
- warning `gaa3` adds a reminding, alerting, or threatening effect, is usually
  prolonged, and is described as strictly sentence-final;
- quick-answer-demanding `gaa3` marks impatience or dissatisfaction, is naturally
  lengthened, can attach to wh, A-not-A, disjunctive, and VP-negative questions,
  and cannot attach to a particle-formed `maa3` question;
- ordinary simple-question `gaa3` can be followed by another particle, whereas the
  quick-answer-demanding use cannot.

These are source judgments within a formal syntactic analysis. The article does not
report an acoustic experiment, corpus counts, a speaker sample, or dialect-stratified
acceptability results.

## Checked source findings

The source-verification ledger is:

`UC-RQ-011-GAA3-SOURCE-VERIFICATION-R1.tsv`

### Yu and Hu 2025

The official open-access journal full text verifies the five contexts, three-profile
analysis, examples, co-occurrence judgments, clause-type distinctions, response
properties, and stated vowel-length contrasts.

The article's cartographic derivation is an analysis, not a parser mandate. Exact
phonetic thresholds, speaker variation, natural frequencies, character variation
(`㗎/架`), and a complete particle-cluster grammar remain quarantined.

## Exact collision audit

The collision ledger is:

`UC-RQ-011-GAA3-COLLISION-AUDIT-R1.tsv`

### Current `DiscourseParticleFrame`

This wrapper transparently scopes visible sentence-final particles over a host but is
explicitly representation-only. It can carry a future source-backed `gaa3` analysis;
it cannot replace the language-level family or license particle force and order.

### Current `FocusParticleFrame`

Yu and Hu analyze all `gaa3` profiles as originating in a focus position. That
structural commonality does not make the current generic wrapper sufficient: the
exclamative, warning, and quick-answer profiles add higher speech-act properties and
different co-occurrence restrictions.

### Current `PolarQuestionFrame`

Only some `gaa3` environments are questions, and the source distinguishes a simple
information question from an impatient quick-answer demand. It also allows
quick-answer `gaa3` with several independently question-marked clause types while
excluding the tested `maa3` question. A generic polar wrapper therefore cannot select
the reading or cover declarative and exclamative profiles.

## Required boundaries

Future research must distinguish:

- the five discourse environments and the proposed three syntactic profiles;
- declarative, wh, A-not-A, disjunctive, VP-negative, and particle-formed questions;
- plain information seeking from impatient quick-answer demands;
- ordinary assertion from exclamation, reminding, warning, and threat;
- vowel duration, intonational contour, and orthographic representation;
- event, temporal, focus, modality, interrogative, imperative, emotion, and
  confirmation-seeking particle combinations;
- source judgments from corpus frequency and multi-speaker acceptability;
- Hong Kong Cantonese from Guangzhou and other Yue varieties.

## Research tasks before any implementation proposal

1. Extract every positive and negative example into a particle-order ledger with
   clause type, context, intended force, and proposed profile.
2. Recheck the judgments with multiple Hong Kong Cantonese speakers and matched
   contexts.
3. Measure vowel duration and intonation for plain, exclamative, warning, and urgent
   question uses.
4. Collect natural conversational examples and quantify profile and cluster frequency.
5. Compare Yu and Hu's unified analysis with compositional/dissection accounts without
   choosing a parser architecture prematurely.
6. Define how question structure and particle force compose without making `gaa3`
   itself a universal question marker.
7. Audit runtime particle clusters only after subtype boundaries are frozen.

## Provisional research outcome

| Question | Current answer |
|---|---|
| Is sentence-final `gaa3` documented in multiple constructional profiles? | **Yes.** |
| Are five contexts reduced to three profiles in the checked analysis? | **Yes.** |
| Does clause type distinguish simple statement and question uses? | **Yes in the source's analysis.** |
| Do warning and urgent-question uses involve an addressee response? | **Yes.** |
| Can one generic current wrapper preserve every distinction? | **No.** |
| Are acoustic thresholds and population-wide judgments established? | **No; quarantined.** |
| Is a dedicated research unit justified? | **Yes.** |
| Is parser implementation authorized? | **No.** |

## Exit conditions

UC-RQ-011 may leave active research only after one of these dispositions is justified:

- **typed `gaa3` family:** clause, force, prosody, response, and particle-order
  boundaries receive stable source-linked profiles;
- **compositional merge:** independently supported focus, degree, addressee, question,
  and prosodic relations preserve every contrast without loss;
- **quarantine:** speaker, prosodic, cluster, clause-type, or regional boundaries remain
  inadequate;
- **retire:** a complete collision audit proves existing constructions sufficient.

Until then, current grammar statuses and parser behavior remain unchanged.
