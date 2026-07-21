# CP020R2 Rendered Acceptance Review

## Decision

**PASS**

Candidate `v0.5.174-lane01-rendered-spatial-kinship-role-correction-r2` is accepted as the parser baseline after review of all 60 acceptance-summary rows and all 60 companion full diagnostics.

This decision accepts the rendered parser behavior and the five learner-role corrections. It does **not** promote `PassivePermissiveRelation` to supported-productive grammar, claim independent human-expert validation, or create native structural-analysis evidence.

## Evidence reviewed

- Acceptance-summary rows: **60/60**
- Full diagnostics: **60/60**
- Rows requiring full review: **60/60**
- Summary/full alignment checks: **PASS**
- Automated acceptance checks: **1999/1999 PASS**
- Target relation rows: **31**
- Automatic semantic acceptances: **0**

Authoritative export pair:

- Summary SHA-256: `1b871be72e8c444ab267e7c0861ab8c66b1d00405265a67ff12d5cd23743171c`
- Full SHA-256: `9808dbaa1404fd9e1ca80ec1bfdb7512d566381738534da8af1798bf6ddb5760`
- Export time: `2026-07-17T13:50:38.453Z`

An earlier repeat export had summary SHA-256 `dba9145d7b280e4dbe6eb2c678c064b650126567b2a6aa72454db01932267fbf` and full SHA-256 `5c4a1468baf7ad190f5857e3e3d63a83138e54a8ae1b841a7171833b6231d8ae`. Canonical JSON comparison found only `generated_at` and `export_id` differences. All diagnostic content was identical.

## Linguistic adjudication

The decision uses primary research to distinguish a rendered-role correction from a new grammar claim.

### Passive and permissive readings

Chin documents several distinct functions of Cantonese `畀`, gives `我畀佢打籃球` the permissive reading “let,” and states that the choice between causative/permissive and passive roles in `NP1 畀 NP2 VP` depends on context and pragmatics. This supports preserving ambiguity instead of forcing every shared surface into one reading.

Source: Andy C. Chin, *Grammaticalization of the Cantonese Double Object Verb [pei35] 畀 in Typological and Areal Perspectives* (2011), [university-hosted author PDF](https://www.lib.eduhk.hk/pure-data/pub/201710799.pdf).

Chow distinguishes canonical Cantonese passives from a small indirect-passive subtype in which the initial participant is a malefactive topic and a patient remains object-in-situ. This supports retaining the explicit object and review-bearing alternative analysis in the nine retained-object rows, while keeping the favorable retained-object boundary outside the relation.

Source: Pui Lun Chow, *The Malefactive Topic Role in Cantonese Indirect Passives* (2018), [CSLI proceedings PDF](https://web.stanford.edu/group/cslipublications/cslipublications/LFG/LFG-2018/lfg2018-chow.pdf).

These sources support the conservative relation inventory but do not validate Canto Span's wrapper, subtype names, learner labels, or productive coverage. The runtime claim therefore remains provisional and nonproductive.

### Spatial `上牆`

Yiu identifies Cantonese `soeng` `上` as a directional verb meaning “move up” and analyzes spatial motion in source-path-goal terms, while separately documenting non-spatial extensions. In `貼咗上牆`, the rendered spatial analysis is therefore preferable to the inherited temporal role: `上` links/directionalizes the spatial goal and `牆` denotes that goal.

Source: Carine Yuk Man Yiu, *Spatial Extension: Directional Verbs in Cantonese* (2005), [HKUST doctoral-thesis record](https://researchportal.hkust.edu.hk/en/studentTheses/spatial-extension-directional-verbs-in-cantonese/).

The project-facing roles are consequently:

- `上`: `func`, syntax `spatial_goal_linker movement_direction_up path_component`, not temporal `when`;
- `牆`: `where`, syntax `spatial_goal location_np wall_location`, not generic `what`.

This is a learner-display classification. It does not assert that `func` and `where` are universal syntactic categories.

### Familiar `阿媽`

Alderete, Chan, and Tanaka explicitly analyze Cantonese `阿 aː-` as a familiar prefix used with surnames and kinship terms. That supports treating `阿` as the functional prefix and `媽` as the person-denoting head in `阿媽`.

Source: John Alderete, Queenie Chan, and Shin-ichi Tanaka, *The Morphology of Cantonese “Changed Tone”: Extensions and Limitations* (2022), [journal PDF](https://ls-japan.org/wp-content/uploads/2024/02/161_alderete.pdf).

The project-facing roles are consequently:

- `阿`: `func`, familiar kinship/name prefix, not independently `who`;
- `媽`: `who`, the person-denoting head.

## Frozen behavior comparison

The v0.5.174 export preserves the v0.5.173 frozen result:

| Inventory | Count | Result |
|---|---:|---|
| Canonical passive candidate | 8 | preserved |
| Permissive candidate | 5 | preserved |
| Passive/permissive ambiguity | 9 | preserved |
| Retained-object ambiguity | 9 | preserved |
| Relation rows | 31 | preserved |
| Controls outside the relation | 29 | preserved |

Semantic status remains:

| Status | Count |
|---|---:|
| `BLOCKED` | 53 |
| `REVIEW_REQUIRED` | 4 |
| `MANUAL_REVIEW_ELIGIBLE` | 3 |

Root coverage remains 39 `PASS`, 16 `PARTIAL`, and 5 `NO_TOP_CONSTRUCTION`. Blocker totals, blocker codes, review-reason totals, review codes, top constructions, relation subtypes, labels, Jyutping, and source order all match the frozen review contract.

## Intended corrections confirmed

- D01 `張相畀老師貼咗上牆。`: `上` = `func`; `牆` = `where`.
- H18 `佢畀老師貼咗張畫上牆。`: `上` = `func`; `牆` = `where`.
- D05 `我畀阿媽鬧。`: `阿` = `func`; `媽` = `who`.
- Active construction overrides and inactive competing lexical affordances are visible in full diagnostics.
- Target hovers explain the spatial goal and familiar-prefix analyses in plain language.

## Non-blocking inherited warnings

The learner-hover aggregate is `WARN` because of ten generic-gloss targets in four non-target rows:

- D02: two ASCII `B` tokens in `BB`;
- H19: `PreferenceVP` and `ModifierNP` construction/title layers;
- H23 and H24: `ClassifierObjectNP` construction/title layers.

All warnings are `generic_learner_gloss`; there are no raw-slot leaks and no missing plain learner glosses. None occurs on a corrected target. These are inherited presentation debt outside CP020R2 ownership.

The grammar-legitimacy aggregate remains `WARN` by design because the relation is provisional, `supported_productive` is zero, and the automatic-acceptance freeze remains active. That warning prevents overclaiming; it does not invalidate the rendered-role correction.

## Known safe limitations

The following larger spontaneous rows remain conservatively underparsed and blocked exactly as in v0.5.173:

- D02 `有個BB啊隻腳俾蚊咬咗好大粒啊。`
- D14 `我都唔明點解我已經盯得咁實，都會俾人攞咗張大紙囖。`
- D16 `你俾人呃啊你，係唔係啊？`

Acceptance does not claim that these three rows now have complete passive analyses.

## Acceptance boundary

Accepted parser baseline:

`v0.5.174-lane01-rendered-spatial-kinship-role-correction-r2`

Still zero:

- supported-productive runtime claims;
- native structural-analysis validations;
- independent human-expert validations for CP020R2;
- automatic semantic acceptances.

The next authorized event is a separate CP021B parser-design freeze from the already adjudicated design evidence. The CP021B held-out partition remains closed until implementation is frozen, and work stops at this checkpoint pending user confirmation.
