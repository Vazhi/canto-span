# CP025-P1-PFV01-R1 source and implementation re-audit

Status: **`provisional_reaudit`; not eligible for `supported_productive`**  
Runtime: frozen v0.5.183, unchanged  
Construction: `PostverbalZoPerfectiveVP` (public compatibility label `PerfectiveVP`)

## Current defensible claim

Published descriptions of Hong Kong Cantonese contain clauses in which postverbal `咗` immediately follows a verb and precedes an overt object. The cited literature analyzes `咗` as perfective or viewpoint aspect. The sources do not support treating the project’s entire `action_verb × object` inventory as one unrestricted productive class.

Canto Span currently uses `PostverbalZoPerfectiveVP` for the visible parser profile `action_verb + 咗 + overt object`. In this subtype the parser does not add an omitted subject or object, a separate completion/result node, an experiential reading, or a past-time expression. That is a description of parser output. It is **not** a claim that Cantonese `咗` lacks completion, current-relevance, boundedness, or temporal implications; published analyses differ on those questions.

## Source re-verification

Four cited publications were re-opened and checked against the exact claim:

- Yip & Matthews directly support the simple form, perfective analysis, aspect-versus-tense distinction, and final-`未` questions. They also describe completion and current relevance, so they contradict the old categorical semantic exclusion.
- Sio & Bond directly support outer perfective `咗` and exact `我食咗麵`.
- Fan & Chan support Hong Kong Cantonese placement and perfective analysis and discuss completion, boundedness, relative-past, and current-relevance accounts. This is positive distributional evidence and semantic counterevidence to the old wording.
- Sybesma supplies a distinct `V完咗O` boundary, not positive evidence for unrestricted simple-profile productivity.

The exact source-by-source record is in `CP025-P1-PFV01-SOURCE-VERIFICATION-R1.tsv`.

## Manual example review

The old record claimed six clean corpus/natural examples and six compatible judgments. That count is not defensible under the current Definition of Done.

- The six claimed corpus hits have no recoverable row-level inventory. They are now recorded as a legacy untraceable aggregate and receive zero evidence weight.
- Of the six prior one-speaker sentences mapped to this subtype, only `我食咗飯。` is an exact overt `V + 咗 + object` instance.
- The other five are objectless, discourse-linked, motion-perfective, resultative, or final-`未` profiles.
- The existing speaker record did not present one controlled set of relevant positive and negative contrasts. It therefore does not satisfy the current provisional or productive speaker checklist.

The per-example classification is in `CP025-P1-PFV01-EXAMPLE-ADJUDICATION-R1.tsv`.

## Code–documentation comparison

The runtime correctly requires the visible three-slot sequence and separates several important boundaries. Two substantive mismatches remain:

1. the runtime template accepts the broad parser-defined `action_verb` class, while the sources do not establish that entire cross-product as productive;
2. selectional compatibility is only a partial later review guard. It catches known high-confidence mismatches but does not exhaustively restrict subtype creation.

The former statement that the construction itself does not assert completion/result/current relevance has been withdrawn. Only the narrower parser-output statement is retained.

The complete comparison is in `CP025-P1-PFV01-CODE-DOCUMENT-COMPARISON-R1.tsv`.

## Current implementation probe

A new 14-case probe used the same six positive surfaces and eight boundary surfaces prepared for speaker review. This is a frozen-runtime diagnostic, not linguistic evidence.

- The narrow subtype appears for **2 of 6** positive surfaces: `我食咗飯。` and `我食咗麵。`.
- It is absent for four source-linked positives:
  - `佢睇咗三個醫生。` and `我答咗你嘅問題。` fail because complete quantified and associative nominal objects are not integrated into the narrow subtype;
  - `佢寫咗一篇文。` and `你買咗呢隻牌子未呀？` additionally expose missing lexical/Jyutping coverage and question-wrapper integration gaps.
- Seven structural boundary profiles remain outside the subtype.
- The anomalous `我食咗香港。` still creates the subtype before the later semantic review blocks the analysis, confirming that subtype creation itself does not enforce exhaustive predicate–object compatibility.

The row-level results are in `CP025-P1-PFV01-IMPLEMENTATION-PROBE-R1.tsv`. These findings further block promotion and show that earlier implementation breadth was overstated.

## Speaker requirement

Both project speakers must review the same new controlled packet independently:

- Speaker A: prior project speaker; the older scattered screening does not satisfy the new checklist.
- Speaker B: an independent native Cantonese speaker who does not consult Speaker A.

The packet contains source-linked positives and executable-boundary surfaces. Speakers judge naturalness and may provide corrections; they are not asked to validate parser labels or linguistic theory.

## Current disposition

`PostverbalZoPerfectiveVP` remains `provisional_reaudit`.

It cannot return to `supported_productive` until:

- both independent speaker forms are returned;
- every relevant positive and boundary item is reviewed;
- runtime wording and metadata are corrected in a new candidate;
- the broad `action_verb` scope is either independently justified or narrowed;
- source-linked quantified, associative, lexical, and final-question object profiles are either implemented under an evidence-bounded object policy or explicitly excluded from a narrower claim;
- code and documentation then match line by line;
- the existing executable boundaries and implementation tests still pass.

The old render, held-out, and regression results remain valid evidence of implementation consistency only. They do not supply linguistic confidence.
