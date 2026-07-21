# Lane 06 nominal modification and relative-clause source map (CP021B-R11)

Date: 2026-07-18  
Scope: claim-level research mapping only; **no parser behavior, fixtures, manifest, accepted version, or held-out data changed**.

## Family selected

After ranking the 109 remaining unmapped language labels, the next coherent high-impact family was Lane 06 nominal modification and relative clauses. Runtime inspection showed that six labels overlap and must be researched together:

- `ModifiedNP`
- `ModifierNP`
- `AssociativeNP`
- `DiMarkedNP`
- `RelativeClauseNP`
- `StativeNominalComplement`

`HeadNP` was excluded because it is representation-only. Classifier-quantity structures already mapped in R5 were retained as inherited evidence. Coordination and temporal noun phrases remain separate construction families.

## Runtime claim extraction

### `ModifiedNP`

The broad registry template permits optional demonstrative, classifier, modifier, verb modifier, nominal linker, another modifier, and a required head noun. Separate active paths also emit `ModifiedNP` for direct wh-determiner + noun and for hard-coded or contextual modifier profiles such as `其他同事`.

This is not one language construction. It overlaps classifier phrases, bare modification, `嘅`-marked modification, relative clauses, verbal modifiers, and wh determiners.

### `ModifierNP`

The node is a two-slot category template: `modifier + head_noun`. Runtime slot compatibility, rather than a sourced modifier inventory, currently determines what may fill the modifier position.

### `AssociativeNP`

The template is `nominal_modifier + 嘅 + head_noun`, illustrated by `音樂嘅嘢`. The label assigns one associative interpretation to a surface schema that research also uses for possessors, relative clauses, aboutness relations, and nominal complements.

### `DiMarkedNP`

The runtime recognizes `啲 + head_noun`, assigns 啲 quantity and determiner slots, and describes it simultaneously as a determiner, partitive, and classifier-like marker. It also exposes generic object/topic slots even though clause role is not inherent to the nominal expression.

### `RelativeClauseNP`

The active function recognizes a modifying span followed by overt `嘅` and an overt nominal or temporal head. For some transitive left spans, it can build a predicate whose object dependency is licensed by the head noun. It does not recognize the independently documented classifier-relative construction.

### `StativeNominalComplement`

Two structurally different paths emit this label:

1. a headless `stative predicate + 嘅` complement, as in `係真嘅`;
2. a headed modifier phrase with a visible noun, illustrated as `好好嘅朋友`.

The label therefore conflates headless nominalization with ordinary headed nominal modification.

## Source-derived boundaries

### 1. Bare and `嘅`-marked modification are related but not interchangeable

Sio documents both modifier-`嘅`-noun and restricted bare modifier-noun forms. The bare and marked variants can differ in distribution and contrastive interpretation. Modifier classes before `嘅` include adjectives, possessors, relative clauses, aboutness relations, and nominal complements.

Parser consequence: no free optional-linker template is justified. Bare, `嘅`-marked, possessive, relative, and complement modification need separate evidence-bearing subtypes.

### 2. `嘅` does not determine one semantic relation

The same overt linker appears after possessors, clauses, and nominal content. The visible structure may be preserved, but possession, association, aboutness, complementation, and relativization cannot be assigned from `嘅` alone.

### 3. `啲` is a plural-classifier nominal expression, not a fixed English determiner

Winterstein et al. describe `di1` as a plural classifier in both classifier-noun and numeral-classifier-noun expressions; `jat1 di1 N` is possible and remains plural. Their corpus analysis also shows that nominal interpretation interacts with information status and clause position.

Parser consequence: retain overt `啲` and plural information, but avoid fixed translations such as “some,” “the,” or “these,” and do not assign object role inside the NP node.

### 4. Cantonese relative clauses have at least two overt construction types

Chan, Matthews, and Yip distinguish classifier relatives from `嘅` relatives. Chan et al. independently compare the two types and report differences in frequency, processing, and syntactic analysis. The `嘅` type has a modifying clause before `嘅` and an overt head noun; classifier relatives lack that linker.

Parser consequence: `RelativeClauseNP` must split by overt relative type. Recognition of a relative construction must also remain separate from any filler-gap or internally headed analysis, because the literature explicitly contains competing analyses.

### 5. Headless modifier-`嘅` is referential but does not license a fabricated noun

Sio gives headless forms meaning “the red ones” and “the edible ones.” Their reference depends on a familiar discourse set. Sio proposes an empty nominal in the syntax, but that theoretical analysis does not authorize a hidden token or guessed lexical head in learner output.

### 6. Adnominal, predicative, and sentence-final `嘅` must remain distinct

Sio distinguishes adnominal `嘅`, referential headless modifier-`嘅`, predicative `嘅` in copular clauses, and assertive sentence-final `嘅`. Surface-final position alone is insufficient for a nominal-complement label.

## Parser-label dispositions

| Label | Disposition | Parser-facing result |
|---|---|---|
| `ModifiedNP` | `SOURCE_LINKED_UMBRELLA_SPLIT_REQUIRED` | Retain only as an internal umbrella until bare, `嘅`-marked, wh-determiner, demonstrative/classifier, relative, and verbal-modifier branches are separated. |
| `ModifierNP` | `SOURCE_LINKED_NARROWING_REQUIRED` | Narrow to sourced bare-modifier profiles; arbitrary slot-compatible modifiers are not licensed. |
| `AssociativeNP` | `SOURCE_LINKED_SPLIT_REQUIRED` | Preserve overt modifier + `嘅` + noun, but split possessor/associative, relative, aboutness, and complement relations. |
| `DiMarkedNP` | `SOURCE_LINKED_NARROWING_AND_RELABEL_REQUIRED` | Relabel theory-neutrally as an overt `di1`-marked nominal expression; retain plural information without a fixed English determiner gloss. |
| `RelativeClauseNP` | `SOURCE_LINKED_SPLIT_AND_ANALYSIS_NEUTRAL_REQUIRED` | Split classifier and `嘅` relatives; represent overt form separately from disputed gap or internally headed analysis. |
| `StativeNominalComplement` | `SOURCE_LINKED_SPLIT_AND_RELABEL_REQUIRED` | Split headless modifier-`嘅`, headed modified NP, predicative `嘅`, and sentence-final `嘅`; insert no hidden noun. |

## Forbidden inferences

R11 does not authorize:

- one free `modifier + optional 嘅 + noun` grammar rule;
- arbitrary predicates, clauses, or noun phrases as bare modifiers;
- interpreting every `NP + 嘅 + N` sequence as possession or association;
- treating `啲` as English plural morphology or assigning one fixed English determiner gloss;
- assigning subject, topic, or object role from the NP form alone;
- treating classifier and `嘅` relatives as one homogeneous construction;
- requiring `嘅` in every Cantonese relative clause;
- fabricating an object gap, empty noun token, or recovered lexical head;
- treating sentence-final `嘅` as automatically nominalizing;
- changing parser behavior during the research freeze.

## Sources added

- Sio 2011, *The Cantonese ge3*: modifier classes, bare-versus-`嘅` distribution, headless referential modifier-`嘅`, and adnominal/predicative/final-use boundaries.
- Chan, Matthews, and Yip 2011, *The Acquisition of Relative Clauses in Cantonese and Mandarin*: classifier and `嘅` relatives, prenominal order, and competing gap/internal-head/noun-modifying analyses.
- Chan et al. 2018, *Four-year-old Cantonese-speaking children’s online processing of relative clauses*: independent constructional contrast between classifier and `嘅` relatives.
- Winterstein et al. 2023, *An empirical, corpus-based, approach to Cantonese nominal expressions*: corpus-based `di1` analysis and distributional boundaries.

Existing Cheng and Sybesma 1999 and Yu 2006 records were retained. Yu remains corroborative only.

## Open evidence gaps

- a source-grounded lexical and semantic inventory for bare modifiers;
- the exact status of runtime direct wh-determiner noun phrases inside or outside `ModifiedNP`;
- corpus frequencies for possessor, aboutness, nominal-complement, and relative `嘅` subtypes;
- robust diagnostics for gapless, temporal-head, and discourse-dependent relative clauses;
- learner-facing distinctions among nominalizing, predicative, and sentence-final `嘅`;
- whether the dormant/overlapping labels should be merged or retired in a future separately authorized design.

## Freeze result

This batch changes research provenance only. No node, role, gloss, parser heuristic, fixture, test expectation, manifest field, or held-out item was changed or opened.
