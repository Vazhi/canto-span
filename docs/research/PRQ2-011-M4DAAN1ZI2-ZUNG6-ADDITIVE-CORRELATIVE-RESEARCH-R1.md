---
title: PRQ2-011 — m4 daan1 zi2 and zung6 additive-correlative research
research_id: PRQ2-011
status: active_research_unit
baseline_version: 0.5.213
created: 2026-07-23
implementation_authorized: false
status_change_authorized: false
---

# PRQ2-011 — `唔單止 … 仲 …` additive correlation

## Research decision

Promote the paired Cantonese pattern `唔單止 X，仲 Y` to a dedicated
**research-only additive-correlative unit**. The checked sources directly
identify `唔單止` as a conjunction meaning “not only,” state that a following
clause commonly uses `仲` or `而且`, and supply exact paired examples.

The strongest supported schema is:

```text
(SHARED SUBJECT) + 唔單止 + PREDICATE/CLAUSE-A，
                 仲 / 而且仲 + PREDICATE/CLAUSE-B (+ 添)
```

The relation presents the first proposition as insufficient and adds a second,
typically stronger or further proposition. `仲` and optional final `添` remain
visible components; they are not interchangeable with `唔單止`.

This unit must remain distinct from:

- ordinary standalone additive `仲`;
- temporal “still” uses of `仲`;
- discourse-continuation `唔單止係噉`;
- a lone `唔單止` whose second member is supplied later or omitted;
- formal written-Chinese `不但/不僅` profiles not independently checked here;
- near-synonyms `唔只` and `唔淨止`, which require their own distributional
  verification.

The evidence authorizes no parser change, construction-status change, lexical
installation, test promotion, or automatic acceptance rule.

## Direct evidence

The source ledger is
`PRQ2-011-M4DAAN1ZI2-ZUNG6-ADDITIVE-CORRELATIVE-SOURCE-VERIFICATION-R1.tsv`.

Words.hk classifies `唔單只/唔單止` as a conjunction, gives pronunciation
`m4 daan1 zi2`, explicitly notes frequent pairing with `而且` or `仲`, and
provides:

```text
我哋唔單只去行街，仲去咗睇戲添。
```

CUHK Cantonese Express independently gives the paired instructional example:

```text
佢唔單止識教《史記》，仲識教《易經》添。
```

The local verified HKCanCor extraction supplies natural adult-corpus occurrences
of `唔單止`, including `我唔單止俾佢知道我係邊個，我喺邊一度` and
discourse-continuation `唔單止係噉啊`. These attest the first marker and show
why a parser cannot require an adjacent overt `仲` for every occurrence. They do
not by themselves establish the paired construction's full syntax.

An institutional Hong Kong speech-language manual supplies the constructed
Cantonese narrative example `欣欣唔單止擦傷膝頭哥，而且仲整爛咗新買嘅牛仔褲`.
It confirms a pedagogically usable `而且仲` variant but has no natural-corpus
weight.

## Runtime collision result

The collision ledger is
`PRQ2-011-M4DAAN1ZI2-ZUNG6-ADDITIVE-CORRELATIVE-COLLISION-AUDIT-R1.tsv`.

Direct observation against runtime 0.5.213 found no dedicated representation.
Some paired examples receive a generic `ClauseRelationGraph`, but the graph does
not identify `唔單止`, the additive pairing, or the relation between members.
The same generic graph also appears when `仲` is present without `唔單止`, so
root coverage is not target evidence. Other examples remain partial or
unwrapped, and one constructed clinical example triggers an unrelated
`VocativeAddressTerm` substring.

## Open boundaries

- subject sharing versus independently overt subjects;
- NP, VP, adjective, and full-clause member inventories;
- ordering and optionality of `而且`, `仲`, `仲要`, `仲會`, and final `添`;
- discourse-separated or context-recovered second members;
- strength, scalarity, and expectation requirements;
- register differences among `唔單止`, `唔只`, `唔淨止`, and written forms;
- prosody and punctuation;
- interaction with negation, aspect, modality, and focus particles.

## Disposition

**Dedicated research unit; implementation and status changes remain
unauthorized.**
