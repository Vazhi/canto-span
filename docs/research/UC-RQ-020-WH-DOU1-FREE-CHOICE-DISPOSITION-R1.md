---
title: UC-RQ-020 — wh + dou1 universal/free-choice disposition
research_id: UC-RQ-020
status: resolved_mixed_disposition
baseline_version: 0.5.213
created: 2026-07-23
implementation_authorized: false
status_change_authorized: false
---

# UC-RQ-020 — `wh + dou1` universal/free-choice disposition

## Research decision

Do **not** promote a standalone “free-choice wh + `dou1`” construction. The
candidate conflates two profiles that the checked Cantonese evidence does not license
as one:

1. **Merge into UC-RQ-008:** preverbal `wh + dou1` directly licenses universal
   readings such as `邊個都…` “everyone” and `乜嘢都…` “everything.” This is a
   documented noninterrogative reading of Cantonese wh forms and belongs in the
   wh-indeterminate research family.
2. **Quarantine/defer:** bare `wh + dou1` as a specifically modal freedom-of-choice
   construction is not established by the checked direct Cantonese sources. The
   attested free-choice examples contain overt `是但/隨便` plus `都得`; those remain
   a separate AcceptabilityClause/free-choice profile.

This disposition does not authorize lexical retyping, hidden modals, parser behavior,
grammar status changes, or productive acceptance.

## Supported core merged into UC-RQ-008

Lee 2014 gives Cantonese examples with universal readings:

```text
邊個 + 都 + predicate       “everyone …”
subject + 乜嘢 + 都 + predicate  “subject … everything”
```

The object wh phrase precedes `dou1` and the predicate. These examples support
universal quantification, not by themselves the freedom-to-choose inference of an
English sentence such as “You may choose anything.”

## Quarantined free-choice extension

The checked course examples use `是但邊個都得`, `是但幾時去都得`, and
`隨便去邊度都得`. Their overt free-choice licensors and `dak1` permission/
acceptability predicate are semantically material. They cannot be deleted from the
analysis to manufacture a bare-wh free-choice rule.

Hsu and Xu 2020 establishes interrogative/indefinite ambiguity and prosodic
disambiguation for `mat1je5`; it explicitly does not provide a general free-choice
syntax. Mandarin wh–`dou` research is useful theory but cannot establish the
Cantonese construction without direct transfer evidence.

## Collision result

See `UC-RQ-020-WH-DOU1-FREE-CHOICE-COLLISION-AUDIT-R1.tsv`.

- `WhClassifierQuestion` and `ExistentialWhQuestion` are interrogative frames and
  cannot absorb universal nonquestion readings.
- `FocusParticleFrame` is an internal wrapper with no language evidence and does not
  distinguish universal, scalar, additive, or free-choice `dou1`.
- UC-RQ-017 scalar `lin4 … dou1` ranks an exceptional alternative; it is not
  universal wh quantification.
- `AcceptabilityClause` retains overt free-choice `… dou1 dak1` profiles.

## Provisional outcome

| Question | Current answer |
|---|---|
| Does Cantonese `wh + dou1` have documented universal readings? | **Yes; merge into UC-RQ-008.** |
| Are `bin1go3` and `mat1je5` directly attested? | **Yes.** |
| Does that prove modal freedom of choice? | **No.** |
| Are bare modal/conditional/negative requirements established? | **No; quarantine.** |
| Do overt `sai6daan6/ceoi4bin6 … dou1 dak1` examples merge here? | **No; keep separate.** |
| Is a new parser construction authorized? | **No.** |

## Reopening conditions

The quarantined free-choice claim may be reopened only with direct Cantonese
minimal contrasts showing the contribution of the wh form, `dou1`, modal or
conditional environment, negation, and any overt `sai6daan6/ceoi4bin6/dak1` material.
