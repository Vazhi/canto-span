---
title: UC-RQ-018 — Alternative/disjunctive question
research_id: UC-RQ-018
status: active_research_unit
baseline_version: 0.5.213
created: 2026-07-23
consolidated: 2026-07-23
implementation_authorized: false
status_change_authorized: false
---

# UC-RQ-018 — Alternative/disjunctive question

## Research decision

A dedicated research unit is justified for the overt Cantonese choice-question
frame:

```text
alternative A + 定(係) ding6(hai6) + alternative B (+ question particle)
```

Hara 2015 directly contrasts Cantonese interrogative `ding6` with standard
disjunction `waak6ze2`, reports a rating study, and states that `hai6` in
`ding6hai6` can be omitted in casual speech. Wong et al. 2022 independently define
alternative questions as choice questions joining alternatives with `ding6hai6` or
short `ding6`. Huang, Her, and Kong 2025 classify overt disjunctive questions and
A-not-A under a broader information-seeking family, but that semantic taxonomy does
not erase their distinct surface forms.

Current `ANotAQuestion` and `PolarQuestionFrame` labels do not preserve the overt
alternatives, interrogative disjunction, or choice-answer requirement. This note does
**not** authorize a new node, parser behavior, answer inference, grammar status
change, or productive acceptance.

## Safest checked core

The checked sources support:

- two or more overt alternatives joined by `ding6` or `ding6hai6`;
- a request to select which alternative holds, rather than a yes/no answer to the
  union of the alternatives;
- NP and VP-sized alternatives in checked examples;
- `hai6` omission inside `ding6hai6` in casual speech;
- full and elliptical alternatives where recoverability must be independently
  established;
- embedded alternative questions, as in complements of knowing/asking predicates;
- a contrast with `waak6ze2`, which is available as standard disjunction and can
  support yes/no or open-question readings.

In a surface such as `我哋棵聖誕樹係真定係假㗎?`, the first `係` is the clause's
copula and the second belongs to `定係`. This does not establish a general
clause-initial `hai6` alternative-question operator.

## Checked source findings

The source-verification ledger is:

`UC-RQ-018-ALTERNATIVE-QUESTION-SOURCE-VERIFICATION-R1.tsv`

### Hara 2015

The peer-reviewed Amsterdam Colloquium paper distinguishes `ding6` and
`waak6ze2`. Its summarized distribution treats `ding6` as interrogative
disjunction, rejects it in ordinary declaratives, modals, and conditionals, and
allows it in alternative questions and unconditionals. The paper states that
`hai6` in `ding6hai6` may be omitted in casual speech. It also reports that
`waak6ze2` questions permit yes/no or open-question behavior, so orthographic
disjunction alone cannot determine the answer type.

### Huang, Her, and Kong 2025

The journal article argues for confirmation-seeking versus information-seeking
questions. It places A-not-A within a disjunctive subfamily of information-seeking
questions and discusses distinct particle associations. This supports a semantic
relationship between A-not-A and overt alternatives, not a lossless surface merger.

### Wong et al. 2022

The Cantonese grammatical-analysis framework explicitly defines alternative
questions as choice questions using `ding6hai6` or short `ding6`, with
`你想食橙定蘋果？` as an example. It is strong descriptive corroboration, though
not a dedicated semantic experiment.

### Law 2001

Law analyzes A-not-A as offering affirmative and negative choices but argues that
it does not derive from an overt coordinate structure. The paper also documents
Cantonese-specific reduplication and quantifier/focus restrictions. These are
decisive boundaries against collapsing visible `A ding6 B` into A-not-A.

## Exact collision audit

The collision ledger is:

`UC-RQ-018-ALTERNATIVE-QUESTION-COLLISION-AUDIT-R1.tsv`

### `ANotAQuestion`

A-not-A supplies affirmative and negative values through reduplication plus
negation. An overt alternative question coordinates independently expressible
options with `ding6(hai6)`. They may share information-seeking alternative
semantics, but their form, alternative inventory, quantifier restrictions, and
answer shapes differ.

### `PolarQuestionFrame`

This internal wrapper has no external Cantonese evidence and does not represent a
set of overt alternatives. A `ding6` choice question normally requests an
alternative-denoting answer, not bare confirmation of one proposition.

### Copular `hai6`

`hai6 A ding6(hai6) B` can arise when the predicate itself is copular. The first
`hai6` and the optional `hai6` within the conjunction have different roles and must
not be collapsed into one marker or interpreted as two required copulas.

### `waak6ze2` and question particles

Hara's results show that `waak6ze2` is not simply interchangeable with `ding6`:
it also occurs in declaratives and can form yes/no or open questions. Sentence-final
particles can further mark confirmation-seeking or information-seeking force, so
their contribution must be represented compositionally rather than used as a
generic alternative-question trigger.

## Required boundaries

Future research must distinguish:

- `A ding6 B` from `A ding6hai6 B` and the register of `hai6` omission;
- main copular `hai6` from conjunction-internal `hai6`;
- NP, AP, VP, clause, and mixed-category alternatives;
- full alternatives from recoverable predicate or argument ellipsis;
- matrix from embedded alternative questions;
- `ding6` interrogative disjunction from `waak6ze2` standard disjunction;
- choice answers from yes/no and open-question answers;
- overt alternative questions from A-not-A and particle polar questions;
- sentence-final particles, intonation, bias, and rhetorical uses;
- two alternatives from lists of three or more.

## Research tasks before any implementation proposal

1. Extract Hara's complete item set, participant counts, ratings, and answer tests.
2. Build matched `ding6`, `ding6hai6`, and `waak6ze2` matrices across clause types.
3. Test copular and noncopular alternatives without treating initial `hai6` as Q.
4. Test full versus elliptical NP, AP, VP, and clausal alternatives.
5. Record answer type, intonation, final particle, and discourse bias.
6. Compare overt alternatives with matched A-not-A and particle polar questions.
7. Audit parser output only after coordination and ellipsis boundaries are frozen.

## Provisional research outcome

| Question | Current answer |
|---|---|
| Is `A ding6(hai6) B` a directly documented Cantonese choice question? | **Yes.** |
| May conjunction-internal `hai6` be absent? | **Yes, in casual speech according to Hara.** |
| Is preceding `hai6` necessarily a question marker? | **No; it may be the copula.** |
| Does `ding6` have the same distribution as `waak6ze2`? | **No.** |
| Is the construction identical to A-not-A? | **No; related but structurally distinct.** |
| Is it an ordinary yes/no polar question? | **No; its core requests a choice.** |
| Is a dedicated research unit justified? | **Yes.** |
| Is parser implementation authorized? | **No.** |

## Consolidated evidence retained from parallel package

The former parallel `ALTERNATIVE-DISJUNCTIVE-QUESTION` package has been merged
into this canonical unit. Its additional evidence and audit detail establish the
following refinements without changing the research disposition:

- `定 ding6` and `定係 ding6hai6` occur with NP, locative, temporal, manner,
  VP, and clausal alternatives; a noun-only coordination rule would be
  under-inclusive.
- Direct and embedded alternatives must be distinguished. An attested embedded
  profile under `問` shows that punctuation and sentence-final particles cannot
  define the construction.
- The 2025 analysis gives `話 waa6` and `先 sin1` as information-seeking tails
  and rejects neutral alternative questions with polar `咩 me1`. These are
  source judgments requiring independent speaker and discourse replication,
  not executable categorical rules.
- `究竟` versus `唔通` is a proposed information-seeking/confirmation-seeking
  diagnostic. It is retained as a research contrast only.
- `抑或` is independently identified as a disjunctive linker, but its register,
  constituent range, and relation to `定(係)` remain unresolved.
- Li et al. 2013 independently code `ding6`/`ding6 hai6` alternatives in a
  corpus of 492 Cantonese-speaking children. This corroborates descriptive
  status, not adult productivity or parser boundaries.
- Zheng, Zhang, and Gao 2021 provide pedagogical examples spanning person,
  destination, time, manner, and activity alternatives. These examples are
  attestation leads rather than promotion evidence.

The expanded collision audit retains exact surface controls for broad-wrapper
false coverage, lexical/resultative `定`, prospective `定`, direct versus embedded
questions, polar `咩`, final `話/先`, locative ellipsis, A-not-A, and declarative
`或者`. The original backlog citation `Wu 1989` remains unresolved; no claim from
that lead is imported until its exact bibliographic identity and text are verified.

### Consolidated corpus and speaker requirements

A future evidence packet must classify corpus hits for connector sense, direct or
embedded status, constituent type, number of alternatives, shared material or
ellipsis, final particle, register, and prosody. A blinded speaker instrument must
separate naturalness from answer type, exhaustivity, echo/surprise readings, and
context requirements across matched `定`, `定係`, `抑或`, `或者`, A-not-A, and
particle-polar controls.

## Exit conditions

UC-RQ-018 may leave active research only after a typed alternative-question family,
lossless compositional merge, justified quarantine, or evidence-based retirement is
established. Until then, current grammar statuses and parser behavior remain
unchanged.
