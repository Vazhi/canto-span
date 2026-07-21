# Nominal coordination, modification, ordinals, possession, and transfer source map (CP021B-R32)

Date: 2026-07-19  
Scope: claim-level research mapping only; **no parser grammar, lexicon, Jyutping, fixtures, manifest data, accepted version, or held-out file changed or opened in R32**. The LX1 lexicon/Jyutping candidate is inherited unchanged.

## Family selected

Ten unmapped language labels remained after R31. `ProductiveVO` and `TransitiveVP` remain implementation umbrellas; the three residual motion/function labels form a separate Lane 09/Lane 01 problem. R32 maps the coherent Lane 06 nominal-relation family:

- `CoordinatedNP`
- `NominalModifierNP`
- `OrdinalClassifierNP`
- `PossessiveNP`
- `PossessiveTransferClause`

All five have zero top-level and zero child occurrences in the inspected non-held-out 545-case accepted regression snapshot. This absence is impact metadata, not evidence of impossibility.

## Runtime extraction

### CoordinatedNP

The active template recognizes exactly `NP + 同 + NP`, retains both conjuncts and the coordinator, and gives the result NP/topic/object affordances. It does not represent `同埋` or unmarked juxtaposition, and token identity alone does not distinguish conjunction `同` from comitative/coverb `同`.

### NominalModifierNP and PossessiveNP

Both are dormant registry labels. No active constructor, fallback, or accepted regression occurrence was found. Their intended domains overlap source-linked `ModifiedNP`, `ModifierNP`, `AssociativeNP`, `PossessiveClassifierNP`, `RelativeClauseNP`, and headless modifier-`嘅` analyses.

### OrdinalClassifierNP

The active template requires `ordinal_modifier + classifier + head_noun`. Its lexical example is `第二`. This excludes sourced classifier-headed noun ellipsis and does not distinguish true ordinal `第二` from lexicalized Hong Kong Cantonese `第二` meaning next, another, or other.

### PossessiveTransferClause

The fallback requires exactly subject + `有` + classifier + object head + `要` + `畀` + recipient. It packages possession, a quantified nominal, modality, transfer, and recipient into one seven-slot clause despite having no accepted fixture family.

## Source-derived boundaries

### 1. Nominal coordination has several overt and unmarked profiles

Wong explicitly states that Cantonese phrases may be joined with `同埋` or `同` and may also be juxtaposed. `蘋果同橙` illustrates overt coordination; `衫褲鞋襪` illustrates unmarked juxtaposition. The coursebook independently describes conjunctive `同`, gives nominal conjunct examples, and notes `同埋`.

This supports nominal coordination, but not the runtime's assumption that exact `NP + 同 + NP` exhausts the system.

### 2. `同` is structurally ambiguous

The same sources separately document comitative/prepositional and conjunctive uses. A parser must preserve the overt token and use surrounding structure rather than assigning coordination from token presence alone.

### 3. Nominal modification is not one uniform construction

Sio distinguishes `嘅`-marked modifiers, restricted bare modifiers, different modifier categories, interpretive contrasts, and headless modifier-`嘅` nominals. Yu corroborates classifier-linked and other nominal-order patterns. The dormant `NominalModifierNP` label adds no sourced relation beyond the existing narrower analyses.

### 4. `第` ordinals allow headed and headless classifier profiles

Lam, Lau, and Lee treat `第` ordinals as determiners and give both `第一` and `第二隻` “second one”. The latter has an overt classifier but no overt noun, with the referent constrained by classifier compatibility. The runtime's required head noun is therefore too narrow.

### 5. `第二` is not always ordinal

The uploaded coursebook explicitly describes `第二` nominal expressions meaning next, another, or other rather than ordinal sequence, including `第二個禮拜`, `問第二個`, `有冇第二啲嘢`, and `第二時`. Token presence cannot settle the ordinal relation.

### 6. Cantonese possession has multiple nominal strategies

The evidence separately supports possessor+`嘅`+noun, possessor+classifier+noun, and headless modifier+`嘅` nominals. These profiles differ in overt material and ellipsis conditions. A dormant generic `PossessiveNP` node would erase those distinctions.

### 7. Possession plus modal plus transfer is not one sourced template

Explicit-subject possessive `有`, classifier NPs, heterogeneous `要`, and lexical transfer `畀` are independently documented. No inspected source establishes the exact runtime concatenation as one dedicated Cantonese construction. Component attestation is not combined-template attestation.

## Dispositions

| Label | Disposition | Parser-facing consequence |
|---|---|---|
| `CoordinatedNP` | `SOURCE_LINKED_NOMINAL_COORDINATION_MARKER_SPLIT_WITH_COMITATIVE_AMBIGUITY_AND_ROLE_NEUTRALITY_REQUIRED` | Split `同`, `同埋`, and juxtaposition; distinguish coordinator from comitative/coverb `同`; assign clause role externally. |
| `NominalModifierNP` | `SOURCE_LINKED_NOMINAL_MODIFIER_SUBTYPES_DORMANT_DUPLICATE_MERGE_OR_RETIRE` | Merge or retire the dormant duplicate; preserve existing bare, `嘅`, classifier, relative, and nominal-complement subtypes. |
| `OrdinalClassifierNP` | `SOURCE_LINKED_DAI6_ORDINAL_DETERMINER_WITH_HEADED_HEADLESS_AND_LEXICAL_DAI6JI6_SPLIT_REQUIRED` | Split headed and classifier-headed ellipsis; separate true ordinals from lexicalized `第二` next/other senses. |
| `PossessiveNP` | `SOURCE_LINKED_POSSESSIVE_GE3_CLASSIFIER_AND_HEADLESS_SUBTYPES_DORMANT_DUPLICATE_MERGE_OR_RETIRE` | Merge or retire the dormant umbrella; preserve possessor+`嘅`, possessor+classifier, and headless nominal profiles. |
| `PossessiveTransferClause` | `COMPONENTS_SOURCE_LINKED_POSSESSION_MODAL_TRANSFER_EXACT_COMBINED_TEMPLATE_GAP_AND_CLAUSE_REALIGNMENT_REQUIRED` | Decompose possession, modal, nominal, transfer, and recipient; keep the exact combined wrapper as a source gap. |

## Forbidden inferences

R32 does not authorize:

- treating every `同` as conjunction or every adjacent NP sequence as coordination;
- deleting or normalizing `同埋` to `同`;
- assigning subject, object, or topic role from coordination alone;
- creating a universal nominal-modifier or possessive node over distinct surface strategies;
- inserting a silent noun into headless classifier or modifier-`嘅` expressions;
- treating every `第二` as ordinal “second”;
- requiring an overt noun after every ordinal classifier;
- inferring transfer from possession or from a later `畀` token without structural evidence;
- combining independent component sources into proof of `PossessiveTransferClause`;
- using code, fixtures, or coursebooks alone as proof of productivity;
- changing parser behavior during the research freeze.

## Open evidence gaps

- corpus and prosodic diagnostics for nominal `同`, `同埋`, and juxtaposition;
- operational disambiguation of conjunctive versus comitative `同`;
- modern corpus distributions of headed and headless ordinal-classifier expressions;
- regional and discourse distributions of lexicalized `第二` next/other senses;
- theory-neutral representation of possessive `嘅`, classifier possession, and headless possession;
- direct evidence for the exact `subject + 有 + CL-N + 要 + 畀 + recipient` sequence;
- independent native structural analysis; project native input remains surface-naturalness evidence, not expert analysis.

## Freeze result

R32 changes research provenance and pointer documentation only. The LX1 runtime, lexicon, Jyutping fallback, manifest, fixtures, tests, accepted behavior, and held-out files remain unchanged.
