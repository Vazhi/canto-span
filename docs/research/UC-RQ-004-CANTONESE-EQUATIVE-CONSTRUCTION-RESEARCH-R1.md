---
title: UC-RQ-004 — Cantonese equative construction family
research_id: UC-RQ-004
status: active_research_unit
baseline_version: 0.5.208
created: 2026-07-23
implementation_authorized: false
status_change_authorized: false
---

# UC-RQ-004 — Cantonese equative construction family

## Research decision

A dedicated research unit is justified. Lai's checked work identifies multiple
Cantonese constructions expressing equality of degree, including a productive
modern Hong Kong profile with an overt comparison standard:

```text
comparee + 同 + standard + 一樣咁 + parameter
```

The current parser has no equative node or standard-of-comparison relation.
`ComparativeStative` was retired because it mislabeled residual property + `啲`
adjustment, while `DegreeStativePredicate` and `ScalarEvaluation` represent
different relations. This note does **not** authorize a new runtime label,
parser fallback, grammar status change, or productive claim.

## Safest checked modern core

For present-day Hong Kong Cantonese, the strongest checked profile is:

```text
comparee + 同 tung4 + standard + 一樣咁 jat1joeng6 gam3 + parameter
```

Lai 2021 gives `你同佢一樣咁靚` and describes this profile as very common in
modern Cantonese. Lai 2023 gives Hong Kong examples with adjectival parameters
and a VP parameter, and reports fewer parameter restrictions than the version
with `一樣` but without `咁`.

The current evidence therefore supports the existence of an equative family and
a bounded Hong Kong core. It does not yet license arbitrary comparees, standards,
parameters, negation, omission, or word-order variants.

## Checked source findings

The source-verification ledger is:

`UC-RQ-004-CANTONESE-EQUATIVE-SOURCE-VERIFICATION-R1.tsv`

### Lai 2021 — Cantonese subtype inventory

The official CUHK full text distinguishes at least these profiles:

1. resemblance: `comparee + 好似/似 + standard + 咁 + parameter`;
2. HAVE: `comparee + 有/冇 + standard + 咁 + parameter`;
3. degree-marker-only: `comparee + standard + 咁 + parameter`;
4. accompaniment/unity: `comparee + 同 + standard + 一樣 + 咁 + parameter`;
5. a low-frequency `學 + standard + 咁 + parameter` profile restricted in the
   paper to irrealis environments.

The paper states that modern Cantonese equatives require degree-demonstrative
`咁` across the discussed types, while also documenting diachronic and lexicalized
exceptions. The five profiles must not be collapsed into one adjacency rule.

### Lai 2023 — regional and parameter boundaries

The author postprint and official repository metadata report a large dialect
comparison using language-resource data, literature, and fieldwork. For Guangfu
Yue, bare `同 + standard + 一樣 + parameter` is not the most characteristic
pattern. The mixed `一樣咁` profile is directly illustrated for Guangzhou,
Hong Kong, and Zhaoqing Cantonese.

For Hong Kong Cantonese, the paper reports that the no-`咁` `一樣` profile freely
accepts only a narrower parameter set such as `高`, `大`, `長`, and `厚`, whereas
the `一樣咁` profile accepts examples with `矮`, `勤力`, `靚`, and the VP
`鍾意食麵`. This blocks treating `咁` as an optional token with no structural or
distributional effect.

The same study also shows regional diversity across Yue and neighboring Sinitic
varieties. Guangzhou, Hong Kong, Zhaoqing, Nanning, and other Yue data must not be
pooled into one unrestricted Cantonese rule.

## Exact collision audit

The collision ledger is:

`UC-RQ-004-CANTONESE-EQUATIVE-COLLISION-AUDIT-R1.tsv`

### Retired `ComparativeStative`

The retired label covered a residual property + `啲` fallback and was removed for
conflating scalar adjustment with generic comparison. It had no overt standard,
standard marker, equality marker, or equative relation. Reusing it would restore
the error that its retirement corrected.

### `DegreeStativePredicate`

This node represents degree-modified property predication. It can potentially
represent the parameter as a component, but it does not relate a comparee to an
overt standard or distinguish equality from ordinary degree modification.

### `ScalarEvaluation`

This node is restricted to negative lexical `算` evaluation such as `唔算貴`.
It supplies neither an equative standard nor an equality-of-degree relation.

### Marker-level runtime gap

The runtime lexicon currently records `咁` as `gam2` with discourse-marker
semantics and has no `一樣` equative entry. No current constructor is named or
documented as an equative construction. This is a research gap, not authority to
add lexical entries or parser behavior.

## Required subtype boundaries

Future work must keep at least these contrasts visible:

- equative versus surpass comparative `X + parameter + 過 + standard`;
- equative `咁 gam3` versus discourse/manner `咁/噉 gam2`;
- `同 + standard + 一樣咁` versus coordinated/unity readings;
- positive `好似` versus negative `唔似` distribution in resemblance profiles;
- `有/冇 + standard + 咁` versus possession, existence, and aspectual negation;
- standard + `咁` generic/exaggerative profiles versus unrestricted literal
  equality;
- adjectival versus VP parameters;
- Hong Kong versus Guangzhou, Zhaoqing, other Yue, and non-Yue patterns;
- modern productive profiles versus historical, literary, idiomatic, or
  low-frequency `學` profiles.

## Research tasks before any implementation proposal

1. Build a source-linked subtype inventory with exact Jyutping and orthographic
   variants for `咁`/`噉`, `一樣`, `同`, `好似/似`, and `有/冇`.
2. Recover independent modern descriptions beyond the Lai research family.
3. Collect natural modern Hong Kong attestations and classify every hit by subtype,
   parameter class, polarity, and discourse interpretation.
4. Construct matched contrasts for `一樣`, `一樣咁`, bare `咁`, ordinary degree
   predication, coordination, similative readings, and `過` comparatives.
5. Use native-speaker interpretation and naturalness tasks; do not infer
   productivity from historical examples or one author's field judgments.
6. Audit parser output only after the linguistic subtype inventory is frozen.

## Provisional research outcome

| Question | Current answer |
|---|---|
| Is a modern Cantonese equative family independently attested? | **Yes.** |
| Is the family represented by the retired `ComparativeStative` label? | **No.** |
| Can broad degree/scalar nodes express the standard relation? | **No.** |
| Safest checked Hong Kong core | `comparee + 同 + standard + 一樣咁 + parameter`. |
| Are bare `同 + standard + 咁` and no-`咁` `一樣` freely equivalent? | **No; the checked sources report interpretation and parameter restrictions.** |
| Is one unrestricted parser label authorized? | **No.** |
| Is a dedicated research unit justified? | **Yes.** |

## Exit conditions

UC-RQ-004 may leave active research only after one of these dispositions is justified:

- **typed construction family:** stable source-linked profiles and contrasts justify
  separate equative subtypes;
- **compositional merge:** comparee, standard, equality/degree markers, and parameter
  can be represented by existing independently supported relations without loss;
- **quarantine:** regional, interpretation, or parameter boundaries remain too
  uncertain for a parser decision;
- **retire:** the candidate is shown to duplicate a current construction after a
  complete collision audit.

Until then, current grammar statuses and parser behavior remain unchanged.
