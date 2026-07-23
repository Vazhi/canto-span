---
title: UC-RQ-037 — zau6syun3-dou1 scalar concessive research
research_id: UC-RQ-037
status: active_research_unit
baseline_version: 0.5.214
created: 2026-07-23
implementation_authorized: false
status_change_authorized: false
---

# UC-RQ-037 — `zau6syun3 … dou1 …` scalar concessive research

## Research decision

Promote paired `就算 zau6syun3 … 都 dou1 …` to a dedicated hypothetical/scalar
concessive research unit. The checked Cantonese grammar framework explicitly
lists it as “even if … still,” while contemporary exact examples show that the
main-clause claim remains true under the conceded possibility.

This is not an ordinary `如果…就…` conditional: it does not merely select a
case in which the consequent follows, but presents the antecedent as insufficient
to overturn the main claim. It also cannot merge into generic
`FocusParticleFrame`, because constructional `都` relates the main claim to the
conceded case rather than simply focusing a local constituent.

This note does **not** authorize a parser label, scalar ordering inference,
productive acceptance, hidden markers, or status changes.

## Safest checked profile

```text
zau6syun3 + clause1, (subject2) + dou1 + clause2
    -> even if clause1 holds, clause2 still holds
```

Exact checked profiles include:

- `就算你搭的士，你都實趕唔切架飛機㗎啦`;
- `公司就算賺錢，都唔分花紅㗎`;
- the coursebook's weather-framed `就算天落雨…` profile.

These support hypothetical concession with overt polarity and modal/epistemic
material in the consequent. They do not establish every word order or the full
scale over alternatives.

## Checked source findings

The source-verification ledger is:

`UC-RQ-037-ZAU6SYUN3-DOU1-SCALAR-CONCESSIVE-SOURCE-VERIFICATION-R1.tsv`

Wong's full-text GACS framework lists `就算…都…` as the Cantonese “even if …
still” conjunction pair. The Liang–Mai peer-reviewed-study supplement
independently lists `就算` among conditional conjunctions while separating
temporal uses of `就`. The checked coursebook attests `就算天落雨` inside a
larger weather relation.

The public Words.hk entry classifies `就算` as “even if; granted that” and gives
two exact paired-`都` examples. These directly support the paired surface and
the persistence of a negative main claim under a conceded scenario.

## Exact collision audit

The collision ledger is:

`UC-RQ-037-ZAU6SYUN3-DOU1-SCALAR-CONCESSIVE-COLLISION-AUDIT-R1.tsv`

### `ConditionalClause`

The scalar concessive belongs to the broad conditional domain but requires its
own relation subtype. `如果 P，就 Q` presents P as a condition for Q; `就算 P，
都 Q` asserts Q despite P. Preserve the different markers and relation.

### `FocusParticleFrame`

`都` has additive, distributive, exhaustive, focus, and free-choice uses
elsewhere. In the checked pair it occurs in the main clause and signals that its
claim survives the conceded alternative. Token identity alone cannot merge these
uses.

### Concessive `雖然…但係…`

Both relations defeat an expectation, but `雖然` typically concedes a proposition
and `就算` introduces a hypothetical/extreme case. Their markers, modality, and
discourse commitments require separate typed profiles.

## Quarantined boundaries

Future research must establish:

- whether the antecedent is hypothetical, counterfactual, possible, or factual;
- the scalar ordering or extremeness relation over alternatives;
- `都` obligatoriness, omission, replacement, doubling, and exact position;
- clause order, subject sharing, negation, aspect, modality, questions, and
  particles;
- `就算係`, wh/degree antecedents, `幾…都`, `都好`, and universal-concessive
  relatives;
- boundaries from `雖然…但係`, `無論…都`, ordinary conditionals, and focus
  `都`;
- register, prosody, frequency, speaker, and regional variation.

## Provisional outcome

| Question | Current answer |
|---|---|
| Is paired `就算…都…` directly identified as “even if … still”? | **Yes.** |
| Does the main claim survive the conceded case? | **Yes.** |
| Is it identical to ordinary condition-result? | **No.** |
| Is its `都` reducible to generic local focus? | **No.** |
| Is the full modal/scalar and omission matrix established? | **No; quarantined.** |
| Is a dedicated research unit justified? | **Yes.** |
| Is parser implementation authorized? | **No.** |

## Exit conditions

UC-RQ-037 may leave active research only after modality, scalar alternatives,
`都` licensing, clause order, scope, and discourse judgments support typed
constructions, lossless compositional mergers, continued quarantine, or
evidence-based retirement.
