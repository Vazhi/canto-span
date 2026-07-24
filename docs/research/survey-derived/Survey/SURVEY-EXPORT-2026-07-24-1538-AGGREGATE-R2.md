---
title: YUE-JUDGMENT-PILOT-01 aggregate checkpoint R2
status: research_only
created: 2026-07-24
source_export_datetime: 2026-07-24 15:38:47
scope: privacy-safe aggregate survey evidence
implementation_authority: none
runtime_change_authorized: false
merge_safety: new_file_only
---

# YUE-JUDGMENT-PILOT-01 aggregate checkpoint R2

## Scope and evidential boundary

This checkpoint updates the private survey-derived research track from the later SoSci JSON export. It contains aggregate counts and paraphrased themes only. The raw export, API credential, case identifiers, and respondent-level free-text responses are not committed.

Survey evidence identifies contrasts and follow-up questions. It does not establish unrestricted productivity, authorize a parser identity or status change, settle regional scope, or replace independent scholarly and corpus evidence.

## Export and inclusion

- exported interview records: **78**
- records marked eligible with a passing quality-screen status: **56**
- explicitly marked test records excluded: **1**
- eligible non-test respondents with at least one experimental rating: **47**
- eligible non-test respondents who reached the end: **26**
- source SHA-256: `0d768940c73ede98777a7665224e892b42678290c2c1295522d9cbf51873e5db`

Eligible partial interviews are retained only for the items actually answered. Complete-case summaries use respondents who reached the final page. The complete and item-level condition orderings are nearly identical (Spearman rho = **0.993**), so partial responses do not materially change the major descriptive contrasts.

## Sample composition

| Sample | Hong Kong | Guangzhou | Macau | Other/uncertain | Total |
|---|---:|---:|---:|---:|---:|
| Complete | 19 | 5 | 1 | 1 | 26 |
| Item-level eligible | 35 | 9 | 2 | 1 | 47 |

The panel remains Hong Kong-heavy. Regional comparisons are not interpretable because regional subsamples are small and the four survey lists assign different lexical items unevenly.

Complete-case list counts are LIST_A 9, LIST_B 5, LIST_C 6, and LIST_D 6. Therefore individual experimental items have only 5–9 complete judgments; the condition-level totals are more stable than any single lexical item.

## Condition-level results

Natural combines ratings 1–2; uncertain is rating 3; unnatural combines ratings 4–5.

| Condition | Research role | Complete n | Natural | Uncertain | Unnatural | Item-level n | Natural |
|---|---|---:|---:|---:|---:|---:|---:|
| `G01A` | SV-RQ-001 — physical resource/instrument | 26 | 80.8% | 7.7% | 11.5% | 31 | 80.6% |
| `G01B` | SV-RQ-001 — location as resource | 26 | 88.5% | 3.8% | 7.7% | 32 | 87.5% |
| `G01C` | SV-RQ-001 — mixed nonphysical/noncanonical resource | 26 | 69.2% | 7.7% | 23.1% | 30 | 70.0% |
| `G01D` | SV-RQ-001 — human-initial missing-resource string | 26 | 26.9% | 26.9% | 46.2% | 31 | 29.0% |
| `G02A` | control — bare NP 用嚟 VP | 26 | 92.3% | 7.7% | 0.0% | 35 | 88.6% |
| `G02B` | control — NP 可以用嚟 VP | 26 | 100.0% | 0.0% | 0.0% | 28 | 100.0% |
| `G02C` | SV-RQ-003 — NP 係用嚟 VP | 26 | 92.3% | 0.0% | 7.7% | 40 | 92.5% |
| `G02D` | SV-RQ-002 — Resource NP + Agent + 用嚟 VP | 26 | 96.2% | 0.0% | 3.8% | 29 | 96.6% |
| `G03A` | control — generic/intended NP 用嚟 VP | 26 | 84.6% | 3.8% | 11.5% | 32 | 81.2% |
| `G03B` | SV-RQ-004 — actual-use NP 用咗嚟 VP | 26 | 76.9% | 11.5% | 11.5% | 28 | 78.6% |
| `G03C` | SV-RQ-005 — perfective inside complement NP 用嚟 V咗O | 26 | 65.4% | 3.8% | 30.8% | 34 | 67.6% |
| `G03D` | SV-RQ-006 — Agent V咗 NP 嚟 VP | 26 | 88.5% | 0.0% | 11.5% | 28 | 85.7% |
| `G04A` | control — plain use-function statement | 26 | 92.3% | 3.8% | 3.8% | 31 | 90.3% |
| `G04B` | SV-RQ-012 — coordinated purpose VPs | 26 | 96.2% | 3.8% | 0.0% | 29 | 96.6% |
| `G04C` | SV-RQ-007 — context-recovered 用嚟 VP fragment | 26 | 76.9% | 19.2% | 3.8% | 38 | 78.9% |
| `G04D` | SV-RQ-011 — use-function wh-question with 㗎 | 26 | 96.2% | 3.8% | 0.0% | 37 | 94.6% |
| `G05A` | control — ordinary V咗O | 26 | 100.0% | 0.0% | 0.0% | 28 | 100.0% |
| `G05B` | SV-RQ-008 — V完咗O | 26 | 53.8% | 0.0% | 46.2% | 31 | 54.8% |
| `G05C` | SV-RQ-009 — V咗O plus goal/result-location material | 26 | 100.0% | 0.0% | 0.0% | 33 | 97.0% |
| `G05D` | SV-RQ-010 — V咗喇 | 26 | 96.2% | 3.8% | 0.0% | 38 | 94.7% |

## Updated research interpretation

### SV-RQ-001 — resource licensing

The updated complete sample reproduces the original ordering:

- physical resources/instruments: **80.8%** natural;
- locations: **88.5%**;
- mixed nonphysical/noncanonical resources: **69.2%**;
- human-initial strings with no expressed resource: **26.9%**.

This continues to support an allocatable-resource boundary rather than unrestricted nonhuman subjects or unrestricted topics. Single-item differences remain too underpowered to settle opportunity, method, or bounded-time classes.

### SV-RQ-002 and SV-RQ-003 — overt user and copular use-function clauses

`Resource NP + Agent + 用嚟 VP` remains near ceiling at **96.2%** natural. `NP 係用嚟 VP` remains high at **92.3%**. The new records do not distinguish hanging-topic syntax from movement/resumption, and they do not determine when final `嘅` is required.

### SV-RQ-004 — `NP 用咗嚟 VP`

The completed actual-use condition is **76.9%** natural, 11.5% uncertain, and 11.5% unnatural. Comments remain mixed and frequently invoke context or lexical choice. This continues to oppose a categorical ban while leaving resource-class and discourse restrictions unresolved.

### SV-RQ-005 — `NP 用嚟 V咗O`

This remains the central unresolved boundary: **65.4%** natural and **30.8%** unnatural. Repairs often moved perfective marking to `用咗嚟` or rewrote the sentence as an active completed-use clause. Other responses preserved the target with only lexical or contextual changes. The updated data still require a matched context experiment rather than either unrestricted acceptance or rejection.

### SV-RQ-006 — `Agent V咗 NP 嚟 VP`

The purpose-chain condition remains high at **88.5%** natural. Most negative comments concentrate on `空咗時間`, favoring allocation/reservation wording. This strengthens the lexical-selection analysis and does not undermine the broader purposive `嚟` chain.

### SV-RQ-007 — context-recovered `用嚟 VP`

The fragment condition is **76.9%** natural and **19.2%** uncertain. Every selected reason in the complete sample centered overwhelmingly on the need for prior context; free-text additions supplied a resource or sentence-final particle. The remaining issue is derivation and discourse licensing, not basic contextual usability.

### SV-RQ-008 — `V完咗O`

The updated result is still sharply polarized: **53.8%** natural and **46.2%** unnatural, with no uncertain ratings. Most corrections removed either `完` or `咗`, or added a final particle to a non-stacked completion form. This confirms a substantial native-conflict signal. It must be reconciled with direct scholarly attestations and the zero-hit HKCanCor search, not converted into a categorical rejection.

Complete item results remain lexically split:

| Item | n | Natural | Unnatural |
|---|---:|---:|---:|
| `G05B01` 我睇完咗嗰本書。 | 5 | 80.0% | 20.0% |
| `G05B02` 佢食完咗個三文治。 | 9 | 33.3% | 66.7% |
| `G05B03` 阿欣寫完咗份報告。 | 6 | 83.3% | 16.7% |
| `G05B04` 我哋搬完咗三個箱。 | 6 | 33.3% | 66.7% |

The list and region imbalance prevents a valid regional explanation of these lexical differences.

### SV-RQ-009 and SV-RQ-010

Postobject result/goal material remains at **100.0%** natural in the complete sample, consistent with the direct HKCanCor attestations for selected subtypes. `V咗喇` remains at **96.2%**. The remaining work is subtype separation for location/direction and semantic scope for the final particle.

### SV-RQ-011 and SV-RQ-012

The wh-purpose question with `㗎` is **96.2%** natural; comments mainly varied lexical or orthographic presentation. Coordinated purpose VPs are **96.2%** natural. Both remain lower-risk compositional audits rather than dedicated-construction candidates.

## Consequence for research-track priority

The larger export does **not** materially change the research ordering. The next evidence priorities remain:

1. controlled context and interpretation study for `用嚟 V咗O`;
2. context/prosody study for bare `用嚟 VP`;
3. matched structural diagnostics for resource-fronted overt-user clauses;
4. lexical-class matrix for `V咗 NP 嚟 VP`;
5. regional and matched-form replication for `V完咗O`;
6. lower-risk audits for `係用嚟…嘅`, `用嚟做咩㗎`, and coordinated purposes.

## Privacy and implementation boundary

No raw export, API credential, respondent identifier, or respondent-level correction is included here. No parser, identity, status, fixture, workflow, generated output, or release change is authorized.
