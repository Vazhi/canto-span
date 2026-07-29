---
title: Cantonese classifier, measure-word, and noun-choice typing audit R1
status: primary_source_and_repository_audit_complete
intake_issue: 309
work_claim: 329
reviewed_on: 2026-07-29
primary_source_ledger: docs/research/CLASSIFIER-MEASURE-PRIMARY-SOURCE-LEDGER-R1.tsv
---

# Cantonese classifier, measure-word, and noun-choice typing audit R1

## Executive finding

The repository already preserves an important engineering distinction:

- a visible classifier-bearing sequence may remain a provisional NP candidate;
- another construction should not consume it as a fully licensed argument merely
  because its surface order looks plausible.

However, the current compatibility layer compresses three different questions:

1. What type of unit word occurs in this construction?
2. What evidence supports the unit-word–noun relation in this context?
3. Should downstream parser constructions consume the resulting NP?

The current path is effectively:

```text
unit-word surface
  -> allowlist of noun semantic classes
  -> verified_compatible / unverified / incompatible
  -> downstream licensing true or false
```

That is useful as a conservative parser gate, but it is not a complete Cantonese
classifier and measure-word ontology.

Primary research establishes that:

- sortal classifiers and measure words can occupy the same superficial
  `Dem/Num–UNIT–N` position;
- their distributions diverge in other Cantonese NP constructions;
- container, group, pair, partitive, and standard measures create or impose units
  rather than simply selecting an inherent noun class;
- general `個`, alternative classifiers, noun number, discourse, register, and speaker
  population make noun choice graded rather than binary;
- one surface form may require different category or relation records in different
  constructions and senses.

The project should separate **unit-word sense**, **construction profile**,
**noun-choice evidence**, **structural NP status**, and **downstream parser policy**
before expanding the current compatibility map.

No lexicon, compatibility data, runtime, fixture, UUID, identity, status, learner label,
survey, release, or deployment change is made in this findings issue.

## Primary source base

The proposition ledger is:

`docs/research/CLASSIFIER-MEASURE-PRIMARY-SOURCE-LEDGER-R1.tsv`.

### Xia 2025

Xia compares classifiers and measure words in Hong Kong Cantonese, Mandarin, and
Northern Wu. The taxonomy treats individual, kind, and individuating forms as
classifiers, and container, group, partitive, and standard-unit forms as measure words.

For Cantonese, classifiers and measure words can both occur in:

```text
Num-UNIT-N
Dem-UNIT-N
postverbal bare UNIT-N
```

Therefore AB15's middle position alone does not determine the internal category.

The reported distributions diverge elsewhere:

- preverbal bare CL-N, Adj-CL-N, and possessor-CL-N are ordinary classifier profiles;
- corresponding measure-word profiles are less acceptable;
- Num-Adj-CL-N is marginal;
- Num-Adj-MW-N is grammatical.

The paper also gives Cantonese CL-N coordination:

```text
我買咗支筆同本雜誌。
```

and reports that inserting `一` into a no-numeral Dem-CL-N is degraded, while insertion
into a bare CL-N changes meaning or acceptability.

These findings support construction-specific category diagnostics. They do not justify
a perfect global binary: the Cantonese questionnaire had seven valid Hong Kong or
Guangzhou responses, several contrasts were gradient, and the proposed branching
analysis remains one theoretical account.

### Sortal and measure semantics

Sybesma summarizes a durable semantic contrast:

- a sortal classifier names an individuating unit associated with the noun's denotation;
- a measure expression creates or imposes the unit used to count or measure.

Her and Hsieh show that simple insertion and adjective diagnostics are not always
reliable. Her's later mathematical account distinguishes classifier value one from a
non-one measure value. These analyses are useful for metadata design, but they do not
classify a Cantonese lexeme without construction-specific evidence.

### Choice variation

Tse, Li, and Leung found 73 classifier types in spontaneous child Cantonese and broad
use of general `個`. Erbaugh found general classifiers dominant in Cantonese discourse
and substantial synonymous sortal variation. Nagy and Lo found strong general and mass
classifier preferences in both Hong Kong and Toronto heritage speech, with noun number
playing a major role.

These studies do not prove unrestricted substitution. They do show that an absent or
nonpreferred pair cannot automatically be called categorically ungrammatical without a
defined construction, interpretation, speaker population, register, and context.

## Repository inventory

### Learner display labels

The token lexicon commonly gives classifier and measure expressions the learner-facing
label:

```text
label: "measure_word"
```

This includes sortal or honorific classifiers such as `個`, `位`, and `句`, as well as
measure-like expressions such as `碗`, `歲`, `呎`, and `尺`.

This display normalization is useful for learners, but it is not an internal linguistic
category. Free-form `syntax` strings sometimes contain finer hints such as
`classifier_person`, `container_classifier`, or `nominal_measure_unit`; those hints are
not the authoritative compatibility ontology.

### Current compatibility allowlist

`src/runtime-resources/grammar/classifier-head-rules.js` currently contains twelve exact
surface rules:

| Surface | Accepted head classes |
|---|---|
| `個` | `general_count` |
| `隻` | `animal` |
| `架` | `vehicle` |
| `部` | `vehicle`, `machine_device` |
| `杯` | `liquid_measure` |
| `碗` | `food_bowl` |
| `本` | `book` |
| `張` | `flat_object` |
| `支` | `long_rigid` |
| `位` | `person` |
| `件` | `clothing` |
| `間` | `building_shop` |

The table mixes:

- general classification;
- sortal shape or kind classification;
- honorific person classification;
- container or quantity measurement.

It is therefore a **bounded parser pair-licensing table**, not one coherent linguistic
category.

The Week 19 pedagogical source lists fourteen forms:

```text
個 隻 架 間 本 枝 碗 杯 對 張 件 部 把 條
```

The current rule file has exact entries for ten of those fourteen. Exact source forms
`枝`, `對`, `把`, and `條` remain absent. The rule file instead contains `支`, the
orthographic/lexical relation of which to source `枝` must be reviewed explicitly rather
than silently equated. It also contains `位`, which is outside that fourteen-item Week
19 list.

This correction preserves the earlier Week 19 finding: exact surface coverage is
**10/14**, not 11/14.

### Sparse and heterogeneous noun classes

Noun entries receive broad `classifier_classes` such as:

- `書` -> `book`;
- `紙` -> `flat_object`;
- `筆` -> `long_rigid`;
- `電話` -> `machine_device`;
- `衫` -> `clothing`;
- `水` and `茶` -> `liquid_measure`;
- `飯` -> `food_bowl`;
- `老師` and `醫生` -> `person`;
- `狗` and `貓` -> `animal`;
- `車` -> `vehicle`;
- `餐廳` -> `building_shop`;
- known `general_count` examples include `問題` and `公司`.

Many ordinary nouns have no class. `蘋果`, for example, is present in the lexicon but
has no current `classifier_classes` value, even though primary sources directly support
`呢個蘋果`. A source-supported AB15 phrase can therefore remain `unverified` solely
because the compatibility inventory is incomplete.

The class names also encode different relation types. `book` and `animal` describe
sortal selection; `liquid_measure` and `food_bowl` describe measure or serving
relations; `general_count` is a broad parser class. Treating them as one axis obscures
the linguistic distinction.

### Runtime compatibility and downstream licensing

`classifierHeadCompatibility` returns:

- `verified_compatible` when one accepted noun class matches;
- `unverified` when the rule or noun class is absent;
- `incompatible` when both sides have classes but no class matches.

`npLicenseMetadata` then makes every non-verified result provisional and sets:

```text
construction_licensing_allowed: false
```

This protects downstream constructions such as AB30 from consuming an unreviewed NP.
But the same result now conflates:

- missing research;
- uncertain unit-word category;
- nonpreferred or alternative classifier choice;
- general-classifier substitution;
- semantic shift;
- measure relation versus sortal relation;
- actual structural ineligibility.

The current `incompatible` reason means only that the pair fails the bounded allowlist.
It is not independent proof of categorical Cantonese ungrammaticality.

### Fixture evidence boundary

The NP fixture includes compatible sortal examples such as `兩隻貓` and `三本書`,
measure/container examples such as `兩杯水` and `兩碗飯`, mismatch controls such as
`三本水`, `兩杯書`, and `兩間書`, and unverified material such as `呢啲魚`.

These are useful regression controls for the current parser policy. They are not
independent linguistic judgements. Future tests should distinguish:

- source-backed degradation;
- structurally wrong unit type;
- semantically anomalous but interpretable coercion;
- unreviewed pair;
- valid alternative or shifted reading;
- conservative downstream blocking policy.

## Item-level audit

### `個`

Source category: general classifier.

Current runtime relation: only nouns marked `general_count` match.

The source-supported range is broader than the current recorded class inventory.
`呢個蘋果` is a direct positive, but `蘋果` currently lacks a compatible class.

Do not solve this by assigning `general_count` to every count noun without provenance.
Represent general-classifier use as its own evidence state, separate from preferred
specific classifiers.

### `本`, `張`, `支/枝`, `架`, `部`, `位`, `件`, `隻`, `間`

These are candidates for sortal, honorific, or conventional classifier profiles, but
their ranges are not one universal class rule:

- `隻` extends beyond a narrow animal class in colloquial and evaluative uses;
- `件` extends beyond clothing to matters, events, and individuated items;
- `架` and `部` overlap for vehicles and machines but are not freely synonymous;
- `張`, `支/枝`, and `間` have conventional lexical and shape/domain restrictions;
- `位` adds politeness or social semantics, not only person individuation;
- `支` and `枝` require explicit orthographic, lexical, pronunciation, and source
  reconciliation before one runtime rule can stand for both surfaces.

A future matrix should record preferred, alternative, and shifted choices rather than
one unrestricted allowlist.

### `杯` and `碗`

In content-quantity readings, these are container measure words. The current system
correctly licenses `杯 + liquid` and `碗 + food`, but calls the relation the same
`classifier_head_compatibility` used for `本 + book` and `隻 + animal`.

The relations differ:

- `本` selects a conventional sortal unit for books;
- `杯` and `碗` establish a container or serving unit related to their contents.

The same surfaces can also denote physical containers. Sense and construction must be
preserved.

### `對`

Often a pair or group measure. It creates a paired unit rather than merely naming an
inherent noun class. Conventional pairings may exist, but it should not be added as a
simple sortal rule before its senses are separated.

### `班`

A group or collective unit in many uses, with polyfunctionality across people, classes,
shifts, and transport-related expressions. Slot position alone does not determine one
category.

### `啲`

Its plural, quantity, mass, partitive, and determiner-like behavior requires a separate
profile. It should not inherit sortal compatibility merely because it occupies a
classifier slot in `呢啲魚`.

### `歲`, `呎`, `尺`, currency, and standard units

These belong to age, length, area, price, and nominal-measure constructions. They are
not AB15 sortal classifiers merely because the learner interface labels them
`measure_word`.

## Required model separation

### Unit-word sense record

Each surface should have one or more source-linked senses:

```text
unit_word_sense_id
surface
jyutping
unit_word_type
source_terms
verified_sources
semantic_unit_relation
construction_profiles
regional_or_register_limits
```

Useful `unit_word_type` values include:

- `general_classifier`;
- `sortal_classifier`;
- `honorific_classifier`;
- `plural_or_quantity_classifier_unresolved`;
- `container_measure`;
- `group_or_collective_measure`;
- `pair_measure`;
- `partitive_measure`;
- `standard_measure`;
- `age_currency_or_scalar_unit`;
- `physical_container_noun`;
- `polyfunctional_or_unresolved`.

These values are research metadata, not automatic learner labels.

### Construction-profile eligibility

A sense should be evaluated separately in:

- `Dem-UNIT-N`;
- `Num-UNIT-N`;
- postverbal bare `UNIT-N`;
- preverbal bare `UNIT-N`;
- `Possessor-UNIT-N`;
- `Adjective-UNIT-N`;
- `Num-Adjective-UNIT-N`;
- headless classifier or quantity phrases;
- measure predicates and scalar expressions;
- physical-container noun use.

Xia's results show why this dimension matters: `Dem/Num-UNIT-N` alone does not separate
classifiers and measures, while the wider distribution can.

### Noun-choice evidence

Replace one compatibility bit with an evidence record containing:

```text
pair_status
source_ids
corpus_locations
speaker_population
register
construction_profile
interpretation
preferred_alternatives
review_notes
```

Recommended `pair_status` values:

- `source_attested_preferred`;
- `source_attested_alternative`;
- `general_classifier_substitution`;
- `measure_relation_attested`;
- `semantic_shift_attested`;
- `corpus_attested_unadjudicated`;
- `speaker_or_register_limited`;
- `judged_degraded_in_defined_context`;
- `structurally_ineligible_for_profile`;
- `unreviewed`;
- `ambiguous`.

Absence from the table must map to `unreviewed`, not `incompatible`.

### Parser outputs

Keep three separate outputs:

1. `structural_np_status` — whether the visible sequence forms the target NP profile;
2. `lexical_choice_status` — the source/corpus status of the unit-noun relation;
3. `downstream_argument_licensing` — conservative parser policy for whether another
   construction may consume the NP.

This permits a structurally visible but lexically unreviewed phrase to remain displayed
without pretending it is either fully natural or nonexistent.

A conservative parser may still block downstream consumption. The reason should state
that an unreviewed pair is blocked by policy rather than claim linguistic
incompatibility.

## Revised interpretation of current statuses

| Current status | Evidence-faithful interpretation |
|---|---|
| `verified_compatible` | Pair matches one accepted bounded parser rule; exact evidence level remains separate. |
| `unverified` | Rule or noun-class data is missing; no negative linguistic conclusion. |
| `incompatible` | Pair fails the current semantic-class allowlist; source/context adjudication is still required. |
| `provisional_np_candidate` | Visible NP-like structure is preserved but not authorized for downstream consumption. |

Serialized compatibility labels may remain temporarily, but canonical metadata should
expose the more precise states.

## Fixture policy

### Safe structural fixtures

- no hidden classifier after a demonstrative;
- no hidden noun in a headless phrase;
- no deletion of an overt numeral, modifier, or measure unit;
- source-backed classifier/measure distributional contrasts;
- sortal versus physical-container or scalar-unit sense contrasts.

### Pair fixtures requiring direct evidence

- preferred versus general classifier for one noun;
- `架` versus `部` with vehicles and devices;
- `支` versus `枝` surface and source reconciliation;
- broad `隻`, `件`, and `條` extensions;
- `杯` or `碗` content measurement versus physical-container reference;
- `對` as pair measure;
- `班` as a group or collective unit;
- plural or quantity `啲`.

Existing `三本水`, `兩杯書`, and `兩間書` controls may remain current-rule mismatch
fixtures if they are labeled as parser-policy controls. They should not become primary
negative linguistic evidence without controlled context and a source or speaker record.

## Smallest justified follow-up

After this findings PR is merged, create a separate accepted-specification issue to:

1. add a versioned research schema for unit-word senses and noun-choice evidence;
2. migrate the twelve current rules without changing runtime outcomes;
3. add provenance and relation type to every migrated rule;
4. distinguish sortal/general/honorific rules from container-measure rules;
5. represent missing data as unreviewed rather than linguistic incompatibility;
6. preserve serialized compatibility fields where required while adding precise
   canonical metadata;
7. update tests to separate structural NP status, pair evidence, and downstream policy;
8. make no compatibility expansion until item-level evidence is accepted.

A different findings-only issue should build the expanded item-level matrix for the
Week 19 inventory and high-value corpus nouns. Schema migration and linguistic matrix
expansion should not be combined in one PR.

## Final disposition

- Classifier versus measure-word distinction: **primary-source supported and required
  in internal metadata**.
- AB15 middle-slot position alone: **insufficient to determine category**.
- Learner label `measure_word`: **acceptable display normalization, not an internal
  linguistic category**.
- Current twelve-rule map: **useful bounded parser allowlist, not a complete classifier
  ontology**.
- Exact Week 19 runtime-rule coverage: **10/14**; `枝`, `對`, `把`, and `條` remain absent
  as exact surfaces, while `支` requires explicit reconciliation with `枝`.
- Current noun classes: **sparse and heterogeneous across sortal, general, and measure
  relations**.
- Current Boolean compatibility result: **insufficient as canonical linguistic
  evidence**.
- Missing rule or class: **unreviewed, not negative evidence**.
- Current mismatch: **failure of the bounded allowlist, not automatically categorical
  Cantonese ungrammaticality**.
- General and alternative classifier use: **separate from preferred specific pairing**.
- Container, pair, group, partitive, and standard measures: **require measure-specific
  relations and construction profiles**.
- Structural NP preservation and downstream licensing: **should remain separate and
  conservative**.
- UUID, identity, status, runtime, fixtures, compatibility data, learner display,
  survey, release, and deployment: **unchanged in this findings issue**.
