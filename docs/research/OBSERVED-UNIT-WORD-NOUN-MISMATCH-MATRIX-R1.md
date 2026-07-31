# Observed Cantonese unit-word and noun-choice mismatch matrix — R1

## Scope and decision boundary

This is a findings-only review of unit-word and noun pairings already exposed by Canto Span sources, frozen corpus data, current runtime records, or executable controls. It does not attempt to build an encyclopedic Cantonese classifier dictionary.

The review separates five dimensions that had been conflated:

1. the written and pronounced unit-word sense;
2. the overt construction profile;
3. pair-specific lexical or corpus evidence;
4. structural NP eligibility;
5. downstream parser policy.

This work changes no permanent UUID, construction identity, linguistic status, runtime behavior, executable fixture, compatibility table, classifier/measure typing, learner label, survey state, release state, deployment state, or merge state.

## Empirical trigger

At the reviewed base, the project contains twelve exact unit-word rules:

`個`, `隻`, `架`, `部`, `杯`, `碗`, `本`, `張`, `支`, `位`, `件`, and `間`.

The authorized Week 19 pedagogical source contains fourteen forms:

`個`, `隻`, `架`, `間`, `本`, `枝`, `碗`, `杯`, `對`, `張`, `件`, `部`, `把`, and `條`.

This creates four exact source surfaces absent from the current rule table:

- `枝 zi1`;
- `對 deoi3`;
- `把 baa2`;
- `條 tiu4`.

It also creates a direct `支／枝` reconciliation question and a pronunciation conflict for `架`: the pedagogical source preserves `gaa2`, while independent lexical evidence separates noun `架 gaa2` “frame/rack” from classifier `架 gaa3` for vehicles and machines.

The current fixture matrix additionally exposes exact mismatch controls:

- `三本水`;
- `三杯書`;
- `三間醫生`;
- `三隻餐廳`;
- `三本電話`;
- `三張水`.

The intake preserved older wording `兩杯書` and `兩間書`; this review uses the current checked-in controls and retains the older wording only as historical provenance.

## Evidence files

- Item-level matrix: `review-packets/corpus-review/UNIT-WORDS/observed-unit-word-noun-matrix-r1.tsv`
- Mechanical verifier: `review-packets/corpus-review/UNIT-WORDS/verify-observed-unit-word-noun-matrix-r1.py`
- Source ledger: `docs/research/UNIT-WORD-NOUN-PRIMARY-SOURCE-LEDGER-R1.tsv`

The source ledger grades structural research, reference grammar, primary corpus evidence, pedagogical attestation, lexical/pronunciation evidence, runtime observation, and fixtures separately. Runtime behavior and fixtures are retained only as project triggers and carry zero independent linguistic-evidence weight.

## Construction-profile result

The matrix must not be implemented as one undifferentiated `UNIT + noun` lookup.

### Sortal classifier profiles

Sortal rows count an entity under a conventional noun classification. Reviewed examples include:

- `兩本書`;
- `兩張紙`;
- `兩支筆`;
- `三件衫`;
- `兩間屋`;
- `兩架車`;
- `三隻狗`.

### General and honorific person profiles

`個` and `位` must remain different evidence profiles:

- `個` is the general classifier and appears with `老師`, `醫生`, `問題`, and many other nouns;
- `位` is a polite or honorific person classifier whose use depends on social and discourse context.

The reviewed corpus contains `個老師` once and `個醫生` twice. Lexical evidence permits both `個` and `位` for `老師`; the corpus therefore establishes occurrence of general-classifier substitution, not universal preference over the honorific form.

### Container-measure profiles

`杯` and `碗` relate a content quantity to a container unit. They are not ordinary sortal classifiers for the content noun.

The matrix therefore distinguishes:

- `三杯茶`, `三杯水`, and `一杯奶茶` as container-content measures;
- `兩碗飯` as a bowl-content measure;
- the physical cup noun itself, which independently takes a classifier such as `隻`.

`三杯書` is blocked under its ordinary literal reading because the content noun does not supply an appropriate cup-measure interpretation. This does not prohibit specially constructed coercive contexts involving shredded, liquid, or otherwise containerized material; those would be different semantic analyses.

### Pair-measure profile

`對` creates a two-member paired unit. It does not classify the noun as an object kind.

- `一對鞋` is directly supported as an ordinary pair;
- `一對筷子` is supported as one available paired analysis, while lexical evidence also permits counting individual sticks with forms such as `枝` or `隻`.

### Plural, mass, quantity, and partitive `啲`

`啲` is not another member of the numeral-classifier compatibility table.

The corpus directly supplies:

- `啲魚` — 16 exact next-token rows;
- `啲書` — 2;
- `啲水` — 2.

These include plural, quantity, partitive, possessed, and discourse-linked readings. All four reviewed `啲 + noun` rows are therefore structurally outside the `Num-UNIT-N` and `Dem-UNIT-N` sortal-classifier profile. Their exclusion from that compatibility table is a category distinction, not a claim that the phrases are unacceptable.

## Deterministic corpus endpoint

A read-only PyCantonese 5.0.0 query inspected all 58 frozen HKCanCor files:

- 16,162 utterances;
- 153,656 words;
- 3,664 high-recall rows in which one reviewed unit-word surface was followed by another lexical token.

The query used the next lexical token and intentionally retained possession, ellipsis, repair, non-NP, and ambiguous material. It therefore supports exact occurrence and context review only.

High-value exact results include:

| Pair | Rows |
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

Zero bounded hits were found for the six active mismatch controls. Zero hits are not negative linguistic evidence; their disposition comes from the reviewed unit-word sense and ordinary literal noun interpretation, not corpus absence.

## Complete first-phase matrix

The bounded matrix contains 44 unique surface rows and covers all twelve current rule families plus `枝`, `對`, `把`, `條`, and `啲`.

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

Confidence is 39 high and 5 medium.

The packet proportions are not language frequencies. Rows were selected because the project already exposed them as rules, source entries, fixtures, lexical gaps, corpus pairs, or mismatch controls.

## Findings by observed mismatch

### `支／枝`

Independent lexical evidence records both `枝 zi1` and `支 zi1` for long thin objects and gives `一枝鉛筆`. It also records additional senses of `支`, including bottle, song, troop, and fleet units.

Disposition:

- retain `兩支筆` as directly corpus-attested and source-supported;
- retain `一枝鉛筆` as a source-attested alternative and later controlled implementation candidate;
- do not normalize every `枝` to `支` or every `支` to `枝`;
- keep written surface, pronunciation, unit-word sense, and noun pair explicit.

### `架／部`

The corpus contains `架車` eleven times and `部車` once. It also contains `部機` twenty-one times and `架機` twice.

Independent lexical evidence supplies:

- classifier `架 gaa3` for vehicles and machines;
- noun `架 gaa2` for a frame, rack, shelf, or stand;
- `部 bou6` for vehicles, machines, phones, and electronic devices;
- specific machine nouns that may take either `架` or `部`.

Disposition:

- quarantine the Week 19 `架 gaa2` reading as a source discrepancy rather than a classifier tone variant;
- retain `架車` as the stronger reviewed vehicle pair;
- retain `部車` and `架機` as attested alternatives, without claiming equal preference;
- retain `部電話` as directly lexically supported;
- leave `架電話` ambiguous because the broad machine sense does not establish conventional pair preference.

### `杯／碗`

Both are container measures. The matrix does not infer that all liquids or foods freely alternate between them.

Disposition:

- `杯 + beverage` and `碗 + 飯` are supported measure relations;
- `碗水` is structurally interpretable but remains unreviewed for conventionality and context;
- no broad `杯 ↔ 碗` interchange rule is supported;
- physical containers remain separate noun senses.

### `個 + 蘋果`

The lexical source directly lists `蘋果` with `個／隻`. The absence of `蘋果` from current noun metadata is therefore a project evidence gap, not evidence of incompatibility.

Disposition:

- `呢個蘋果` is a source-attested alternative and later controlled implementation candidate;
- the review does not declare `個` or `隻` universally preferred;
- the project should not infer classifier choice from roundness alone.

### Missing Week 19 forms

#### `對`

`一對鞋` is a direct paired-unit profile. `一對筷子` is also supported, but alternative counting units remain possible depending on whether the speaker counts the functional pair or individual sticks.

#### `把`

`一把刀` is independently attested in HKCanCor and lexical evidence. `一把較剪` is directly supplied by the lexical source. The classifier has handled, grasped, bundled, action, and fire senses; no one undifferentiated “handled object” class should be inferred.

#### `條`

`一條魚` and `一條街` are independently attested in the corpus and lexical source. `三條樹枝` is directly supplied by lexical evidence. These are conventional pairings, not outputs of a purely geometric length algorithm.

## Current mismatch controls

The six active controls are structurally complete noun phrases but do not match the reviewed unit-word sense under their ordinary literal interpretations:

| Surface | Ordinary mismatch |
|---|---|
| `三本水` | bound-volume sortal with literal mass water |
| `三杯書` | cup-content measure with ordinary count books |
| `三間醫生` | place or institution unit with human practitioner noun |
| `三隻餐廳` | animal or extended entity sortal with restaurant establishment |
| `三本電話` | bound-volume sortal with telephone device |
| `三張水` | flat or spread-object sortal with literal mass water |

Their matrix status is `structurally_ineligible_for_profile`, not categorical language-wide ungrammaticality. Explicit metonymy, titles, publication senses, physical transformation, brands, images, or other coercions would create different noun senses or construction profiles and require separate evidence.

## Current-rule-family disposition

| Surface family | Reviewed center | R1 disposition |
|---|---|---|
| `個` | people, general count nouns, abstract nouns | retain current bounded center; add no automatic noun class; `蘋果` becomes a later candidate |
| `隻` | animals and conventional extended single entities | retain bounded animal center; `三隻餐廳` stays blocked; `三隻貓` remains pair-unreviewed in this pass despite current fixture use |
| `架` | vehicles and some machines, classifier reading `gaa3` | retain; preserve `架／部` overlap without free equivalence |
| `部` | vehicles, machines, and devices | retain; `部電話` directly supported |
| `杯` | cup-container content measure | retain measure typing; no sortal broadening |
| `碗` | bowl-container food or content measure | retain measure typing; `碗水` remains context-sensitive and unreviewed |
| `本` | books and bound volumes | retain; no extension to water or telephone devices |
| `張` | sheets and flat or spread objects | retain; no extension to literal water |
| `支` | long-thin objects plus separate lexicalized senses | retain exact reviewed pair; no blind aliasing |
| `位` | respectful person counting | retain with register boundary |
| `件` | clothing in current runtime slice | retain clothing pair; broader matter and event senses remain separate |
| `間` | rooms, shops, buildings, and institutions | retain; no direct use with human practitioner noun |

## Candidate rows for later controlled implementation

The matrix marks nine source-backed rows as `candidate_for_later_controlled_implementation`:

1. `呢個蘋果`;
2. `一枝鉛筆`;
3. `一對鞋`;
4. `一對筷子`;
5. `一把刀`;
6. `一把較剪`;
7. `一條魚`;
8. `一條街`;
9. `三條樹枝`.

This is not implementation authorization. A later accepted-specification task must decide:

- whether each unit-word sense receives a new canonical runtime record;
- whether the noun already has a stable lexical sense and Jyutping;
- whether the structural parser supports pair measures and configuration classifiers without flattening them into sortal classes;
- how `枝` and `支` remain distinct surfaces while sharing selected evidence;
- which positive and negative fixtures are required;
- how held-out controls prevent overgeneralization.

## Unresolved bounded rows

The first-phase review intentionally leaves these questions unresolved:

- `三隻貓`: current runtime and fixture behavior exists, but this pass did not add pair-specific external evidence;
- `三架電話`: broad machine semantics compete with the directly documented `部電話` pairing;
- `兩碗水`: a compositional bowl-content reading is available, but conventionality and context were not independently tested;
- `一位醫生`: honorific use is plausible and lexically supported at the person-class level, but register distribution remains a separate question;
- the relative preference of `個` versus `隻` with `蘋果`;
- the relative preference of `架` versus `部` across specific machine and vehicle subclasses.

These rows do not justify a new language-wide research census. They should be tested only when a concrete parser, learner, corpus, or panel decision requires them.

## Research conclusion

The project’s observed mismatches are not one problem.

They divide into:

- genuine source omissions: `枝`, `對`, `把`, and `條`;
- an orthographic and sense-reconciliation problem: `支／枝`;
- a pronunciation correction: classifier `架 gaa3`, not source `gaa2`;
- conventional overlap with unequal evidence: `架／部`;
- measure rather than sortal relations: `杯／碗`;
- a separate plural, mass, quantity, or partitive profile: `啲`;
- ordinary noun-metadata gaps such as `個 + 蘋果`;
- semantically mismatched but structurally complete controls.

A single hard compatibility map cannot represent these distinctions without recording unit-word sense, construction profile, pair evidence, uncertainty, and downstream policy separately.

The bounded R1 matrix answers the current project questions without authorizing runtime widening. After acceptance, the next dependency is a separately scoped implementation specification for only the nine source-backed candidates, or a project-wide reassessment if another research question has greater value.