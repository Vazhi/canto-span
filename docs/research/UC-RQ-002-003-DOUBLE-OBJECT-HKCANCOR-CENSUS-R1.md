---
title: UC-RQ-002/003 — HKCanCor double-object lexical census
research_ids:
  - UC-RQ-002
  - UC-RQ-003
date: 2026-07-23
implementation_authorized: false
---

# UC-RQ-002/003 — HKCanCor double-object lexical census

## Scope and method

This checkpoint uses the official CC BY UTF-8 release of HKCanCor at
`fcbond/hkcancor` commit `39aeadf920e0b5ca93d0ad7792c59e740e7bdd65`
(archive SHA-256
`09223963b8756254e15353cad843f8a4b0cbc4b9223dc8a8fa27fb1cf846057e`).

The narrow lexical query returned:

| Tagged matrix lexeme | Raw token hits |
|---|---:|
| `送/v/sung3/` | 18 |
| `寄/v/gei3/` | 26 |
| `教/v/gaau3/` | 51 |

All 95 hits were reconstructed within their transcribed utterance segment and
manually screened for Theme, Recipient/Addressee, spatial Goal, content clause,
ellipsis, fragments, and serial/purpose predicates. This is a lexical census, not a
complete corpus-wide ditransitive count.

## Retained diagnostics

| Corpus locator | Surface | Adjudication | Constructional use |
|---|---|---|---|
| `FC-025_v:2933` | `佢就送埋飛線服務俾你。` | `V Theme 俾 Recipient` | clean overt-marker transfer |
| `FC-044_v2:1265` | `我諗住送個炸彈俾佢啊。` | `V Theme 俾 Recipient` | clean overt-marker transfer |
| `FC-108a_v2:3919` | `你唔使諗住我哋會送嘢俾你啊。` | `V Theme 俾 Recipient` | clean overt-marker transfer |
| `FC-108c_v2:5442` | `噉我寄咗張咭俾佢嗎。` | `V Theme 俾 Recipient` | clean overt-marker transfer |
| `FC-020_v:11448` | `佢會spend好多時間教你嘢囖。` | `V Recipient Theme` | instruction/communication class |
| `FC-020_v:11484` | `只不過佢會教你啲嘢噉樣囖。` | `V Recipient Theme` | instruction/communication class |
| `FC-027_v2:6873` | `教你啲skills啫嗎佢。` | `V Recipient Theme` | instruction/communication class with right-dislocated subject |
| `FC-055_v2:5954` | `教佢英文名吖嗎。` | `V Recipient Theme` | instruction/communication class |
| `FC-044_v2:1272` | `送個炸彈殺佢啊。` | `V Theme + purpose/result clause`, not IDOC | decisive text-only false positive |

The screened `送` and `寄` hits also contain intransitive, theme-only,
directional, and elliptical uses. None is an unambiguous non-`畀`
`V Theme Recipient` transfer token. That zero applies only to this query and corpus:
it does not override the source judgments or the audio experiment establishing an
independently judged IDOC.

## Disposition

| Action | Result |
|---|---|
| **Promote** | Instruction/communication `V Recipient Theme/content` is naturally attested as a predicate-conditioned UC-RQ-003 subtype. |
| **Merge** | The general transfer-order backlog remains merged into the existing lexical-GIVE/post-theme-participant research family; the corpus does not motivate a new free-alternation node. |
| **Quarantine** | Non-`畀` IDOC remains a source-attested, low-rated, prosody/weight-sensitive subtype requiring audio and lexical-class evidence before any runtime treatment. |
| **Retire** | Retire the hypotheses that the three orders freely alternate or that written `V Theme NP` alone identifies a Recipient. |

No parser, lexicon, schema, or grammar-status change follows from this census.
