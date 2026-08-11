# AA84 marked reduplicated-manner HKCanCor review R1

Date: 2026-08-11  
Construction: `AA84 GamMarkedReduplicatedMannerVP`  
Legacy runtime label: `MannerAdverbialVP`  
Query: `HKCANCOR-AA84-MARKED-REDUP-R1`  
Disposition: `REVIEWED_CORPUS_ATTESTATION_WITH_LEXICAL_SCOPE_LIMIT`

## Question

Does the frozen HKCanCor distribution contain overt marked sequences relevant to the canonical AA84 relation—reduplicated or repeated material followed by written `咁／噉` and a following predicate—and, after full context review, which mechanically retrieved rows actually instantiate a marked manner relation?

This corpus review is evidence gathering only. It does not authorize runtime changes, fixture changes, identity changes, status promotion, survey changes, held-out changes, release, or deployment.

## Prior boundary

The current source-backed AA84 claim is deliberately narrow: an independently supported reduplicated manner expression combines with overt `咁／噉` before a following action VP. Existing research examples include `琴日慢慢噉食飯` and `慢慢噉形成咗一套較為完善嘅公屋制度`. Bare `慢慢 + VP`, bare AABB forms, `AA地 + VP`, arbitrary repeated written material, and unrelated degree/frequency/distributive uses do not inherit AA84 automatically.

The earlier HKCanCor bare-reduplication review is neighboring evidence only. It established eight genuine bare manner modifiers but explicitly did not transfer that evidence to the overt marked AA84 construction.

## Frozen corpus and deterministic query

The query reuses the repository HKCanCor workbench and PyCantonese `5.0.0` distribution.

- corpus files: **58**
- utterances: **16,162**
- words: **153,656**
- source manifest: `external-evidence/cp021b/hkcancor-cp021b-source-manifest.sha256`
- source-manifest SHA-256: `d93b064614b38227889b2db20162eb0c2fee3fb75aa94e90dd9abfc64289c731`
- verified corpus-distribution SHA-256: `d93b064614b38227889b2db20162eb0c2fee3fb75aa94e90dd9abfc64289c731`

The extractor is marker-centered. It retains written `咁` or `噉` when:

1. mechanically repeated material occurs within the previous three **contiguous lexical tokens**; and
2. an ADJ/AUX/VERB cue occurs within the next three **contiguous lexical tokens**.

Mechanical repetition shapes are:

- one token made from two exact identical halves;
- AABB written shape;
- a repeated prefix followed by additional material;
- two adjacent identical lexical tokens.

Punctuation terminates the bounded search. The query records marker glyph, corpus Jyutping, POS, predicate cue, local token context, utterance context, and source hashes. It does **not** infer marker function, reduplication analysis, manner, VP constituency, productivity, or construction membership.

Unit tests cover `慢慢噉 + V`, `慢慢咁 + V`, complex repeated-prefix forms, adjacent-token repetition, bounded interveners, distributive collisions, bare controls, marker-without-repetition controls, missing-predicate controls, punctuation boundaries, and reverse/postverbal order.

The frozen-corpus run and a second `--check` pass produced byte-identical generated files.

## Mechanical result

The fixed query returned **14 candidates in 14 utterances across 10 source files**.

| Mechanical shape | Rows |
|---|---:|
| exact-halves token | 9 |
| AABB token | 2 |
| repeated-prefix token | 2 |
| adjacent identical tokens | 1 |

Marker distribution:

- written `噉`: 8, all annotated `gam2`;
- written `咁`: 6, all annotated `gam3`.

No `慢慢咁／噉` row occurs in this 14-row HKCanCor inventory. That is a corpus/query null result, **not** evidence that the documented `慢慢噉 + VP` construction is unacceptable or absent from Cantonese generally.

## Complete expert review

All 14 candidates were reviewed against the full utterance, previous and next utterances, tokenization, Jyutping, POS tags, and source provenance.

| Classification | Rows |
|---|---:|
| genuine | **3** |
| false positive | **11** |
| ambiguous | 0 |
| unusable | 0 |

The decision ledger is `review-packets/corpus-review/AA84/marked-r1/decisions.tsv`. `verify-marked-r1.py` requires exact one-to-one accounting for all 14 generated candidate IDs.

### Genuine marked manner attestations

| Candidate | Source | Attested span | Review | Evidentiary limit |
|---|---|---|---|---|
| `aa84gm-aa621193685b4148d549` | `FC-025_v.cha` | `符符碌碌噉俾` | `符符碌碌` supplies a luck/fluke manner reading to the following event. | Direct marked-relation attestation; does not establish open-class AABB productivity. |
| `aa84gm-22cd8114636903a47087` | `FC-035_v2.cha` | `嗱嗱臨噉呢攞` | `嗱嗱臨` is a lexical hurried-manner adverb; `噉` is followed by discourse particle `呢` before `攞`. | Marked-relation attestation with an intervener; does not validate a strict marker-immediately-before-VP surface requirement. |
| `aa84gm-2f55a84815b33942a9d4` | `FC-038a_v2.cha` | `死死氣噉返` | `死死氣` contributes a reluctant/dejected manner reading to `返屋企`. | Direct marked-relation attestation; does not establish open-class repeated-prefix productivity. |

The three genuine rows come from **three distinct HKCanCor source files**.

### Lexical corroboration only

Independent dictionaries provide lexical corroboration for the interpretations above, but these dictionary records have **lexical evidence weight only** and are not used as construction-level productivity evidence:

- Yue Wiktionary and CantoDict describe `嗱嗱臨` as a Cantonese adverb associated with hurried/quick action.
- CC-Canto records `死死氣` as unwilling/forced or dejected action.
- CantoDict, Wiktionary-derived dictionary data, and 粵典-derived dictionary data record `符碌` as luck/fluke and `符符碌碌` as a derived/reduplicated form.

These lexical sources corroborate why the three corpus rows receive the interpretations above; the **HKCanCor utterances themselves** are the corpus attestations.

## False-positive boundaries

The 11 rejected rows are informative because they demonstrate why written repetition plus `咁／噉` cannot be treated as a construction rule.

| Boundary type | Representative rows | Reason for exclusion |
|---|---|---|
| distributive repeated quantifier | `個個都係噉講`, `個個都咁勁`, `間間會噉做` | `個個／間間` quantify participants/entities; the marker belongs to a separate degree or “like that” relation. |
| temporal/frequency repetition | `日日都咁早`, `年年都係噉打電話` | `日日／年年` quantify event time/frequency rather than manner. |
| degree/extent | `c.c.咁大`, `少少咁多`, `好少少噉就可以定啲` | the marker participates in degree/extent/comparative structure, not a reduplicated manner modifier. |
| reduplicated property predication | `大大隻隻噉喇就覺得佢` | the descriptive property predication closes before the later cognition predicate. |
| speech repetition/repair | `咁咁競爭咁大` | adjacent identical `咁` is disfluency/repetition inside a degree environment, not lexical reduplicative manner. |

## Evidence decision

This review **does satisfy AA84's reviewed-corpus-attestation gate** in the narrow sense that three independently reviewed HKCanCor rows genuinely instantiate an overt marked manner relation in three different source files.

It does **not** establish any of the following:

- unrestricted or open-class AA/AABB/repeated-prefix productivity;
- that every written repeated property form is a manner modifier;
- that `咁` and `噉` are functionally interchangeable merely because both appear in the high-recall query;
- that glyph alone determines marker pronunciation or grammatical function;
- that the modifier, marker, and following predicate must always be strictly adjacent;
- that bare reduplicated manner belongs to AA84;
- that the current runtime should broaden to `符符碌碌`, `嗱嗱臨`, or `死死氣` without a separate source-first implementation decision;
- that AA84 is ready for linguistic promotion.

The corpus result therefore changes the evidence bookkeeping from no reviewed corpus evidence to **14 reviewed candidates: 3 genuine, 11 false positive, 0 ambiguous, 0 unusable**. Linguistic status remains `research_pending`.

## Files

- query: `external-evidence/aa84-marked-hkcancor/query-hkcancor-aa84-marked.py`
- JSON inventory: `external-evidence/aa84-marked-hkcancor/hkcancor-aa84-marked-candidate-inventory.json`
- TSV inventory: `external-evidence/aa84-marked-hkcancor/hkcancor-aa84-marked-candidate-inventory.tsv`
- query summary: `external-evidence/aa84-marked-hkcancor/hkcancor-aa84-marked-query-summary.json`
- expert decisions: `review-packets/corpus-review/AA84/marked-r1/decisions.tsv`
- decision verifier: `review-packets/corpus-review/AA84/marked-r1/verify-marked-r1.py`
- profile tests: `tests/tooling/corpus-review/test_aa84_marked_hkcancor_profile.py`

## Protected state

No change in this checkpoint to:

- permanent UUID or canonical identity;
- linguistic status;
- parser runtime behavior or executable construction fixtures;
- frozen corpus source files;
- survey or native-panel evidence;
- held-out evidence;
- release or deployment state.
