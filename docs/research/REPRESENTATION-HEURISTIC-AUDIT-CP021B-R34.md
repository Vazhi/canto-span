# Representation and heuristic registry audit (CP021B-R34)

Date: 2026-07-19  
Parent: CP021B-R33  
Scope: internal registry and architecture audit only. **R34 changes no parser behavior, lexicon, Jyutping, fixture, manifest data, accepted behavior, or held-out file.** The inherited LX1 candidate remains render-pending and unaccepted.

## Result

All 182 runtime registry labels now have a disposition record:

- language-layer claim dispositions: **157/157** (completed through R33)
- representation-layer dispositions: **23/23**
- heuristic-layer dispositions: **2/2**
- remaining `UNMAPPED` rows: **0**
- `supported_productive`: **0**

## Disposition totals

| Category | Count | Meaning |
|---|---:|---|
| `KEEP_INTERNAL` | 6 | Useful internal container whose semantic content must come from typed children or mapped subtypes |
| `RENAME_INTERNAL` | 5 | Useful internal wrapper whose current name can be mistaken for a Cantonese construction |
| `MERGE` | 8 | Combined or duplicate wrapper that should be absorbed into canonical composition |
| `RETIRE` | 1 | Dormant duplicate with no independent job |
| `NARROW_HEURISTIC` | 5 | Operational fallback requiring explicit activation and non-linguistic wording |

## Key findings

### Valid internal architecture

`ClauseLinkingSequence`, `ClauseRelation`, and `ClauseRelationMember` form a defensible wrapper/relation/member stack only when typed relations, overt linkers, separators, and wrapper coverage remain visible. The wrapper itself cannot assign causal, conditional, temporal, sequential, concessive, or topic-chain meaning.

`MeasureExpression` and `DefinitionComplement` may remain transparent child spans. They cannot independently license predication, measure subtype, NP status, or definition semantics.

`SubjectPredicateClause` is heavily exercised but is too broad to function as a Cantonese grammar claim. It may remain a transparent clause-span wrapper only while its typed predicate child remains visible.

### Merge or retirement targets

The following labels add no unique overt marker or independently necessary relation and should be consolidated:

- `Comment`
- `CoordinatedSubjectModalPredicateClause`
- `CopularIdentificationFrame`
- `CopularRelationFrame`
- `LocativeModalPredicateClause`
- `ModifierPhrase`
- `SubjectModalPredicateClause`
- `TopicModalPredicateClause`

`TopicCommentClause` is a registry-only duplicate and should retire.

### Language-sensitive wrappers mislabeled as evidence-free

Several rows can remain internal only if their matching conditions inherit mapped language evidence: particle scope, polar force, topic/comment analysis, bare nominal licensing, copular subtype, definition profile, measure subtype, and VP-complement selection. Their internal label does not make those decisions evidence-free.

The most important quarantine cases are:

- `DefinitionExplanatoryFrame`: exact `係…嚟㗎` matching and motion suppression for `嚟` are language-sensitive;
- `TopicComment`: its broad fallback requires a complete typed comment and full-span coverage;
- `VPComplementFrame`: complement selection must be licensed by a lexeme or independently sourced construction;
- `PolarQuestionFrame`, `DiscourseParticleFrame`, and `FocusParticleFrame`: force, scope, order, and host compatibility belong to the language layer even if the outer node is internal.

If any of these survives consolidation as a distinct construction rather than an internal wrapper, its licensing claim must be reclassified to the language layer before implementation.

### Heuristic dispositions

`MalformedCandidate` and `NeedsContext` are not Cantonese constructions. They must use explicit reason codes and neutral wording. A parser conflict, missing argument, absent antecedent, or unresolved analysis is not a speaker judgment that the utterance is ungrammatical.

## Boundary on the milestone

Complete registry disposition means every row now has an accountable status. It does not mean all active paths are legitimate, all wrappers should survive, or any unsupported grammar has become accepted. R35 must consolidate the 182-label registry into a smaller canonical target ontology before remediation begins.
