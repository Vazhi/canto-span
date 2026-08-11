# Behavior-first TDD R1: post-predicate 過 comparative

Date: 2026-08-11
Intake: #777
Work claim: #778
Draft PR: #779

## Decision

Implement one bounded observable Cantonese behavior before deciding whether it deserves a separate public construction identity:

> overt nominal comparison target + gradable property predicate + `過 gwo3` + overt nominal comparison standard

The runtime now represents this function inside the existing structural `SubjectPredicateClause` and exposes explicit behavior bindings for `comparison_target`, `comparison_predicate`, `comparison_marker`, and `comparison_standard`.

This checkpoint does **not** create or promote a new public comparative construction label. Naming and identity remain downstream of demonstrated function.

## Linguistic basis

The target behavior is independently described in Cantonese and Sinitic comparative literature.

1. Lam, Charles. 2014. “A Unified Analysis to Surpass Comparative and Experiential Aspect.” *Proceedings of PACLIC 28*, 368–377. ACL Anthology Y14-1043. Lam directly contrasts Cantonese surpass-comparative `gwo3` with experiential `gwo3`, making the homographic boundary relevant to parser design.
2. Wong, Anita M.-Y., Carol C.-H. Cheung, Jackie M.-W. Lo, and Elaine K.-H. Wan. 2022. “Grammatical Analysis of Cantonese Samples,” in *Understanding Development and Disorder in Cantonese using Language Sample Analysis*. The comparative section gives `細佬矮過我` (`sai3 lou2 ai2 gwo3 ngo5`) as an adjective-comparison example and separately discusses quantity comparison such as `我貼紙多過你`.
3. Chappell, Hilary M., and Alain Peyraube. 2015. “The comparative construction in Sinitic languages: Synchronic and diachronic variation.” In *Diversity in Sinitic Languages*, 134–154. Oxford University Press. DOI 10.1093/acprof:oso/9780198723790.003.0006. Their Sinitic typology identifies the head-marked Surpass pattern `NP A – predicate – comparative marker – NP B` and includes Hong Kong Cantonese `gwo` examples.

These sources justify the behavior target and the comparative-versus-experiential distinction. They do not by themselves authorize an open-class productivity claim for every possible predicate or comparison subtype.

## RED: behavior specified before implementation

The first executable contract was added before runtime implementation.

Positive requirements:

- `我高過佢。` → one relation exposing predicate `高`, marker `過`, standard `佢`;
- `細佬矮過我。` → predicate `矮`, marker `過`, standard `我`;
- `佢快過我。` → predicate `快`, marker `過`, standard `我`.

Negative controls:

- experiential: `我食過飯。`, `佢去過英國。`, `食過飯。`;
- directional/spatial: `我行過去。`, `佢行過條橋。`, `行過嚟。`.

GitHub Actions run `31475635348` preserved the RED result: all pre-existing checked behavior passed, both new negative-control groups passed, and the new positive comparison test failed at `我高過佢。` because zero comparative relations were exposed.

That failure established a genuine missing parser behavior rather than a naming-only problem.

## Lexical coverage discovered during RED/GREEN

The published `細佬矮過我` example was retained rather than replaced with easier vocabulary.

- `細佬` was initially treated as a possible gap, but lexical validation rejected a duplicate insertion. A diagnostic GREEN run then confirmed that the assembled runtime already contains canonical `細佬` with Jyutping `sai3 lou2`, `kinship_person_np` syntax, and nominal/person affordances. No duplicate lexical entry is retained.
- `矮` was genuinely missing. It is now present as `ai2`, a gradable `stative_predicate height_stative scalar_dimension_predicate`, allowing the published example to execute directly.

This follows the repository policy that bounded lexical support discovered during active work should be completed in the same task without weakening a well-supported linguistic example or using lexical cleanup to broaden the grammar claim.

## GREEN: minimum behavior implementation

The first implementation sketch used a dedicated comparison detector. Architecture review showed that this would duplicate an existing composition layer, so it was discarded before the final GREEN state.

The final implementation is in `src/parser/orchestration/wrap-predicate.js`, which already owns reusable predicate-level composition. Before generic stative wrapping it checks exactly four visible nodes:

1. simple overt nominal target;
2. bounded gradable stative predicate;
3. literal `過`;
4. simple overt nominal standard.

A small declarative profile in `src/runtime-resources/grammar/postpredicate-gwo3-comparison.js` bounds the initial scalar-predicate inventory. The marker token is contextually exposed as `comparison_marker` only inside this matched behavior; the ordinary token-lexicon entry for `過` remains experiential outside that context.

The matched clause retains structural type `SubjectPredicateClause` and adds behavior-level slots/bindings:

- `comparison_target`;
- `comparison_predicate`;
- `comparison_marker`;
- `comparison_standard`.

No hidden argument is inserted.

## GREEN verification

The first GREEN diagnostic showed that all three positive surfaces were already structurally recognized as one bounded `SubjectPredicateClause`, but the construction helper had normalized the trace bindings to structural `subject` / `stative_predicate` names. That was a test-contract mismatch, not a recognition failure.

The implementation was then refactored so the matcher’s assigned slots are the behavior-level comparison slots themselves. GitHub Actions run `31478184339` then passed:

- the focused positive/negative behavior contract;
- the existing AA61 experiential-`過` boundary test;
- the complete standard runtime suite;
- diff hygiene;
- deterministic `main.js` generation.

The successful workflow committed the generated runtime bundle and removed its temporary verification workflow.

## Explicit boundaries after cycle 1

This cycle intentionally does **not** claim or implement as part of the same matcher:

- experiential `過`;
- directional/spatial `過`;
- quantity comparisons such as `我貼紙多過你`;
- temporal comparisons;
- `比 bei2` comparatives;
- bare `啲 di1` comparatives;
- equatives;
- superlatives;
- unrestricted open-class comparative productivity.

Those are separate observable behaviors or scope questions and should enter later TDD cycles with their own positive and negative contracts.

## Identity and evidence disposition

The behavior is now runtime-represented, but this implementation result has zero independent linguistic-evidence weight. It does not change any construction UUID, linguistic status, evidence-sufficiency judgment, corpus classification, native-panel state, held-out state, release state, or deployment state.

The important architectural result is that behavior preceded naming: the parser can now expose the relevant comparison relation without first inventing a public label that might later constrain the analysis incorrectly.
