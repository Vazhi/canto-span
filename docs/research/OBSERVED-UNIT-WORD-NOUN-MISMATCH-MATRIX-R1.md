# Observed Cantonese unit-word and noun-choice mismatch matrix — R1

## Scope

This findings-only review covers unit-word and noun pairings already exposed by Canto Span sources, frozen corpus data, runtime records, or executable controls. It does not attempt a language-wide classifier dictionary and changes no UUID, identity, linguistic status, runtime behavior, fixture, compatibility table, classifier/measure typing, learner label, survey, release, deployment, or merge state.

The review keeps five dimensions separate:

1. written and pronounced unit-word sense;
2. overt construction profile;
3. pair-specific lexical or corpus evidence;
4. structural NP eligibility;
5. downstream parser policy.

## Empirical trigger

The project currently has twelve exact rule surfaces:

`個`, `隻`, `架`, `部`, `杯`, `碗`, `本`, `張`, `支`, `位`, `件`, and `間`.

The authorized Week 19 pedagogical source lists fourteen forms:

`個`, `隻`, `架`, `間`, `本`, `枝`, `碗`, `杯`, `對`, `張`, `件`, `部`, `把`, and `條`.

The resulting concrete questions are:

- absent exact source surfaces `枝`, `對`, `把`, and `條`;
- `支／枝` orthography and sense reconciliation;
- source `架 gaa2` versus classifier `架 gaa3`;
- `架／部` overlap;
- `杯／碗` container-measure typing;
- plural, mass, quantity, and partitive `啲`;
- the noun-metadata gap represented by `個 + 蘋果`;
- the active controls `三本水`, `三杯書`, `三間醫生`, `三隻餐廳`, `三本電話`, and `三張水`.

Older intake wording `兩杯書` and `兩間書` is retained only as historical provenance; the matrix uses the current checked-in controls.

## Canonical evidence files

- Matrix: `review-packets/corpus-review/UNIT-WORDS/observed-unit-word-noun-matrix-r1.tsv`
- Verifier: `review-packets/corpus-review/UNIT-WORDS/verify-observed-unit-word-noun-matrix-r1.py`
- Source ledger: `docs/research/UNIT-WORD-NOUN-PRIMARY-SOURCE-LEDGER-R1.tsv`

The ledger grades direct scholarly, reference-grammar, primary-corpus, pedagogical, lexical/pronunciation, runtime, and fixture evidence separately. Runtime behavior and fixtures are project triggers only and have zero independent linguistic-evidence weight.

## Corpus endpoint

A read-only PyCantonese 5.0.0 query inspected all 58 frozen HKCanCor files:

- 16,162 utterances;
- 153,656 words;
- 3,664 high-recall rows in which a reviewed unit-word surface was followed by another lexical token.

The query deliberately retains possession, ellipsis, repair, non-NP, and ambiguous material. Counts establish occurrence and context only.

| Exact pair | Rows |
|---|---:|
| `間公司` | 34 |
| `本書` | 16 |
| `啲魚` | 16 |
| `隻狗` | 12 |
| `架車` | 11 |
| `個問題` | 11 |
| `件衫` | 4 |
| `間屋` | 4 |
| `條街` | 4 |
| `張紙` | 3 |
| `條魚` | 3 |
| `支筆` | 2 |
| `啲書` | 2 |
| `啲水` | 2 |
| `個醫生` | 2 |
| `部車` | 1 |
| `把刀` | 1 |
| `個老師` | 1 |

No bounded corpus hit was found for the six active controls. Zero hits are not negative linguistic evidence.

## Matrix endpoint

The matrix contains 44 unique surfaces and covers all twelve current rule families plus `枝`, `對`, `把`, `條`, and `啲`.

| Pair status | Rows |
|---|---:|
| `source_attested_preferred` | 18 |
| `source_attested_alternative` | 6 |
| `general_classifier_substitution` | 2 |
| `measure_relation_attested` | 4 |
| `speaker_or_register_limited` | 1 |
| `structurally_ineligible_for_profile` | 10 |
| `unreviewed` | 2 |
| `ambiguous` | 1 |
| **Total** | **44** |

Confidence is **38 high and 6 medium**. The packet is an evidence-triggered review set, not a prevalence sample.

## Construction-profile findings

### General and honorific people

`個` is the general classifier and is corpus-attested with `老師` and `醫生`. `位` is a respectful or honorific person classifier. The evidence supports separate statuses for general-classifier substitution and register-conditioned honorific choice; it does not establish one universally preferred form.

### Sortal classifiers

Directly supported or corpus-attested centers include:

- `本書`;
- `張紙`;
- `支筆`;
- `件衫`;
- `間屋／間公司／間餐廳`;
- `架車`;
- `隻狗`.

These pairings do not license geometric or semantic-class algorithms that automatically extend to every noun.

### Container measures

`杯` and `碗` express container-content units rather than sortal classification of the content noun.

- `杯茶`, `杯水`, and `杯奶茶` are cup-content measures;
- `碗飯` is a bowl-content measure;
- `碗水` is compositionally interpretable but remains unreviewed for conventionality and context;
- the physical container noun itself takes a separate classifier.

### Pair measure and handled/configuration units

`對` creates a paired unit: `一對鞋` is directly supported, while `一對筷子` competes with individual-stick analyses.

`把` covers handled, grasped, bundled, and other configuration-based units. `一把刀` is independently attested in HKCanCor and `一把較剪` is directly supplied by lexical evidence. These do not justify one unrestricted “handled object” rule.

### Plural, mass, quantity, and partitive `啲`

`啲` is outside the `Num-UNIT-N` and `Dem-UNIT-N` sortal-classifier compatibility table. Corpus examples `啲魚`, `啲書`, and `啲水` include plural, amount, partitive, possessed, and discourse-linked readings. Excluding them from sortal compatibility is a category distinction, not a rejection of the phrases.

## Specific mismatch dispositions

### `支／枝`

Both `支 zi1` and `枝 zi1` are documented for selected long-thin objects, but `支` has additional lexicalized senses. Therefore:

- retain corpus-attested `兩支筆`;
- retain source-attested `一枝鉛筆` as a later controlled implementation candidate;
- do not implement a blind character alias or universal normalization.

### `架／部`

The corpus contains `架車` eleven times and `部車` once, plus `部機` twenty-one times and `架機` twice. Independent lexical evidence distinguishes classifier `架 gaa3` from noun `架 gaa2`.

Therefore:

- quarantine Week 19 `架 gaa2` as a source reading discrepancy;
- retain `架車` as the stronger reviewed vehicle pair;
- retain `部車` and `架機` as attested alternatives without claiming equal preference;
- retain directly supported `部電話`;
- leave `架電話` ambiguous pending pair-specific evidence.

### `個 + 蘋果`

Lexical evidence lists `蘋果` with `個／隻`. The current metadata gap is therefore not incompatibility. `呢個蘋果` is a source-attested alternative and later controlled implementation candidate, but this review does not declare a universal preference.

### Missing Week 19 forms

- `對`: `一對鞋`, `一對筷子`;
- `把`: `一把刀`, `一把較剪`;
- `條`: `一條魚`, `一條街`, `三條樹枝`;
- `枝`: `一枝鉛筆`.

These are conventional bounded pairings, not outputs of an unrestricted semantic-shape rule.

## Active controls

The six controls are structurally complete NPs but do not match the reviewed unit-word sense under their ordinary literal readings:

| Surface | Ordinary mismatch |
|---|---|
| `三本水` | bound-volume sortal with literal mass water |
| `三杯書` | cup-content measure with ordinary count books |
| `三間醫生` | place or institution unit with human practitioner noun |
| `三隻餐廳` | animal or extended-entity sortal with restaurant establishment |
| `三本電話` | bound-volume sortal with telephone device |
| `三張水` | flat/spread-object sortal with literal mass water |

Their status is `structurally_ineligible_for_profile`, not a categorical language-wide ban. Explicit titles, metonymy, transformed materials, images, brands, or other coerced senses would constitute different analyses.

## Later controlled implementation candidates

The matrix marks nine rows as candidates, not authorizations:

1. `呢個蘋果`;
2. `一枝鉛筆`;
3. `一對鞋`;
4. `一對筷子`;
5. `一把刀`;
6. `一把較剪`;
7. `一條魚`;
8. `一條街`;
9. `三條樹枝`.

A separate accepted specification must decide canonical unit-word senses, lexical entries, parser structures for pair/configuration measures, positive and negative fixtures, and held-out overgeneralization controls.

## Preserved uncertainty

The bounded review intentionally leaves unresolved:

- pair-specific external evidence for current fixture `三隻貓`;
- conventionality of `三架電話`;
- conventionality and discourse purpose of `兩碗水`;
- register distribution of `一位醫生`;
- relative preference of `個／隻` with `蘋果`;
- relative preference of `架／部` across vehicle and machine subclasses.

These do not justify a new language-wide census. They should be tested only when a concrete parser, learner, corpus, or panel decision requires them.

## Conclusion

The project’s observed unit-word mismatches divide into distinct problems:

- missing source surfaces;
- orthographic and sense reconciliation;
- a pronunciation discrepancy;
- overlapping but unequal alternatives;
- measure versus sortal structure;
- a separate `啲` nominal profile;
- noun-metadata gaps;
- and ordinary-sense mismatch controls.

A single hard compatibility table cannot represent these responsibly without preserving unit-word sense, construction profile, pair evidence, uncertainty, and downstream policy separately. This package supports a later bounded specification but authorizes no runtime widening.