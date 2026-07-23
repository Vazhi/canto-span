---
title: UC-RQ-038 — ceoi4fei1 exception conditional research
research_id: UC-RQ-038
status: active_research_unit
baseline_version: 0.5.214
created: 2026-07-23
implementation_authorized: false
status_change_authorized: false
---

# UC-RQ-038 — `ceoi4fei1` exception conditional research

## Research decision

Promote `除非 ceoi4fei1` to a dedicated necessary-condition/exception
conditional research unit. The checked contemporary Cantonese records support two
surface strategies:

```text
ceoi4fei1 + P, m4hai6/fau2zak1 + negative Q
    -> unless P, otherwise not-Q

ceoi4fei1 + P, subject + sin1 + Q
    -> only if P does Q hold
```

The first states the default consequence outside the exception with overt
negation. The second restricts a positive-surface consequent with `先`. Main-clause
negation is therefore not a safe categorical requirement; the checked profiles
instead converge on a necessary-condition relation.

This unit belongs inside the broad conditional family, but it cannot be merged
losslessly into the current `ConditionalClause`: that construction specifically
recognizes predicate + `嘅話` and does not preserve `除非`'s reversed
default/exception relation or its paired consequence markers.

This note does **not** authorize parser work, productive acceptance, hidden
consequence clauses, modal inference, or status changes.

## Safest checked profiles

Exact checked examples include:

- `除非你陪我啦，唔係我唔去個聖誕舞會喇`;
- `除非你道歉，否則我唔會原諒你`;
- HKCanCor `除非份工好好，我先會考慮`.

The first two pair the exception antecedent with an overt alternative-consequence
linker and negative main outcome. The corpus example pairs it with restrictive
`先` and a positive-surface modal consequent. These examples establish neither
the full set of licensed linkers nor unrestricted alternation among them.

## Checked source findings

The source-verification ledger is:

`UC-RQ-038-CEOI4FEI1-EXCEPTION-CONDITIONAL-SOURCE-VERIFICATION-R1.tsv`

Chor's 2018 Cantonese monograph gives the HKCanCor example with `除非` and
main-clause `先會`, glossing it as an unless relation with a negative inference.
Because that example is cited incidentally in a discussion of verb-particle host
preferences, it verifies the attested surface but not a complete conditional
analysis.

The public Words.hk entry classifies `除非` as a conjunction meaning “unless;
only if.” Its explanation describes the following result as holding outside the
excluded condition, and its two exact Cantonese examples use `唔係` and `否則`
before negative consequents.

Taken together, these records justify the necessary-condition/exception core.
The claim that overt negation is not obligatory is a narrow inference from the
attested `先會` profile, not a general account of polarity or modality.

## Exact collision audit

The collision ledger is:

`UC-RQ-038-CEOI4FEI1-EXCEPTION-CONDITIONAL-COLLISION-AUDIT-R1.tsv`

### `ConditionalClause`

Both constructions relate an antecedent to a consequence. The current unit,
however, is explicitly predicate + `嘅話` and treats a following result as required
unless discourse supplies it. `除非 P` identifies P as the exception or necessary
condition and can pair with overt `唔係/否則` or restrictive `先`. Preserve it as a
typed conditional subtype rather than flattening those contrasts.

### Generic clause relation

A neutral clause-linking wrapper may contain the overt clauses, punctuation, and
markers, but it does not supply necessary-condition semantics. It is a structural
carrier, not a merger target.

### `先` and `唔係`

Both forms have independent uses. Only their checked position in an overt
`除非` relation is supported here; neither token should independently manufacture
an exception conditional.

## Quarantined boundaries

Future research must establish:

- whether an overt consequence clause is obligatory, optional, or
  discourse-recoverable in each profile;
- the inventory and register of `唔係`, `否則`, `先`, `先至`, and zero marking;
- positive and negative polarity licensing in both clauses;
- modal, aspectual, question, imperative, and sentence-particle restrictions;
- clause order, postposed `除非`, subject sharing, scope, and prosody;
- differences among exception, necessary condition, ordinary condition, and
  corrective “unless/except” readings;
- corpus frequency, speaker judgments, regional variation, and written-register
  influence.

## Provisional outcome

| Question | Current answer |
|---|---|
| Is `除非` directly identified as “unless; only if”? | **Yes.** |
| Are overt negative-consequence profiles attested? | **Yes, with `唔係` and `否則`.** |
| Must the main clause itself be overtly negative? | **No safe categorical rule; `先會` with a positive-surface consequent is attested.** |
| Can this merge losslessly into current predicate + `嘅話` handling? | **No.** |
| Is consequence omission or the full marker/modal matrix established? | **No; quarantined.** |
| Is a dedicated research unit justified? | **Yes.** |
| Is parser implementation authorized? | **No.** |

## Exit conditions

UC-RQ-038 may leave active research only after consequence realization, polarity,
modality, marker choice, clause order, scope, and discourse judgments support
typed constructions, a lossless merger, continued quarantine, or evidence-based
retirement.
