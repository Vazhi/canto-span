# Lane 03 fragments, responses, and discourse formulae source map (CP021B-R17)

Date: 2026-07-18  
Scope: claim-level research mapping only; **no parser behavior, fixtures, manifest, accepted version, or held-out data changed**.

## Family selected

After verifying the 78 remaining unmapped language labels and ranking runtime/fixture impact, R17 maps a coherent Lane 03 family:

- `FormulaDiscourseUnit` — 31 accepted fixtures, 23 runtime references;
- `FragmentAnswer` — 8 accepted fixtures, 10 runtime references;
- `FragmentQuestion` — 2 accepted fixtures, 10 runtime references.

The 41 accepted fixtures make the family operationally important, but the runtime profiles are not one linguistic construction merely because their surfaces are short.

## Runtime claim extraction

### FormulaDiscourseUnit

The runtime combines at least four profiles:

1. a protected lexical table including `唔該晒`, `唔好意思`, `對唔住`, `冇問題`, `唔緊要`, `好主意`, greetings, thanks, and leave-taking;
2. `係` plus a selected final particle as an agreement/response unit;
3. two-to-four repetitions of `有`, `係`, `好`, `得`, or `我知`, with punctuation and particle variants;
4. additional transparent responses or reactions such as `可以呀`, `好呀`, `係咩`, `放心啦`, and `到時見啦` that are grouped by discourse use rather than shared syntax.

### FragmentAnswer

The runtime combines:

1. possessor + `嘅`, represented as an answer with a missing nominal head;
2. context-licensed modal or predicate repetition answers such as `可以`, `要`, `得`, and negated counterparts;
3. aspectual predicate repetition;
4. a stance-predicate answer wrapper represented by the accepted surface `我覺得啱`.

### FragmentQuestion

The fallback accepts only bare `呢` or one overt NP/topic plus `呢`, assigns question-particle `ne1`, requires discourse context, and records an unexpressed alternative/topic or contrast domain without inserting tokens.

## Source-derived boundaries

### 1. Lexical formulae require item-level mapping

Yip and Matthews directly attest `唔該`, `唔該晒`, `多謝`, `對唔住`, and `唔好意思` with pragmatic contrasts. This supports individual conventional expressions, not a productive formula table or automatic extension to every protected entry.

### 2. Response-particle `係` is distinct from copular syntax and predicate repetition

Cheng treats `係` as a positive response particle with `唔係` as its negative counterpart and shows that responses can follow questions or assertions. Huang, Her, and Kong give the exact negative-polar pattern `係啊/啱嘅` versus `唔係啊/唔啱`. Response polarity and the proposition confirmed must remain visible.

### 3. Predicate answers are context- and lexeme-specific

Yip and Matthews document verb/adjective repetition, negative `唔` replies, aspect-bearing replies, and lexical asymmetries such as `使唔使` being answered with `要` or `唔使`. Luke and Nancarrow distinguish auxiliary and main-verb uses and note standalone auxiliaries under ellipsis. Lee and Pan independently show that ellipsis licensing is selective: some heads license it while progressive `喺度` and some aspectual uses do not.

### 4. Possessor + `嘅` is not intrinsically an answer fragment

Sio documents referential headless modifier-`嘅` nominals. A possessor+`嘅` surface may be used as an answer in context, but its nominal structure must not be defined by answerhood or require insertion of a lexical noun.

### 5. Thematic topic + `呢` is supported, but the runtime's exact inventory is only partly mapped

Li documents `呢 ne1` in thematic questions and gives `聽日呢？` in a contrast meaning “how about tomorrow?”. The same particle also appears in declaratives, wh-questions, and alternative questions. The exact runtime strings `你呢？` and bare `呢？` were not independently verified in an inspected full scholarly source during R17, so they remain context-required source gaps rather than rejected forms.

### 6. Repetition is not licensed by fixture success

No inspected primary source establishes the runtime's unified 2–4 repetition family across `有`, `係`, `好`, `得`, and `我知`, punctuation variants, and selected particles. Those fallbacks remain lexicalized or review-bearing pending discourse-corpus evidence.

## Parser-label dispositions

| Label | Disposition | Parser-facing result |
|---|---|---|
| `FormulaDiscourseUnit` | `SOURCE_LINKED_LEXICAL_AND_RESPONSE_SUBTYPE_SPLIT_REQUIRED` | Split individually sourced lexical formulae, response-particle `係`, acknowledgement repetition, and transparent clause/VP profiles. Preserve particle identity and keep unsourced cross-products lexicalized or quarantined. |
| `FragmentAnswer` | `SOURCE_LINKED_ELLIPSIS_SUBTYPE_SPLIT_AND_POSSESSIVE_REALIGNMENT_REQUIRED` | Split polarity response, predicate/aspect repetition, lexeme-specific modal replies, and stance answers. Realign possessor+`嘅` with nominal analysis and store discourse licensing without inserting hidden words. |
| `FragmentQuestion` | `SOURCE_LINKED_THEMATIC_NE_NARROWING_WITH_BARE_FORM_GAP` | Retain source-linked thematic topic+`呢` narrowly; keep other `ne1` uses available; exact `你呢？` and bare `呢？` remain direct-source gaps. |

## Forbidden inferences

R17 does not authorize:

- treating every short conversational unit as a formula or fragment;
- expanding the protected formula table from analogy;
- treating parser opacity as proof of linguistic unanalyzability;
- treating `係` as a response in every syntactic occurrence;
- translating proposition-confirming `係啊` mechanically as English *yes* without polarity context;
- treating final particles as freely interchangeable response endings;
- licensing arbitrary repetition or a 2–4 repetition grammar from accepted fixtures;
- treating every bare modal, auxiliary, stative predicate, or negated predicate as a licensed answer without compatible context;
- reconstructing hidden subjects, objects, predicates, VPs, or nouns as overt parser tokens;
- treating possessor+`嘅` solely as a FragmentAnswer;
- treating `呢 ne1` as exclusive to fragment questions;
- deriving exact `你呢？` or bare `呢？` authority from the sourced `聽日呢？` example;
- translating every final `呢` as “what about…?”;
- changing parser behavior during the research freeze.

## Open evidence gaps

- modern conversational-corpus evidence for repeated `有/係/好/得/我知` acknowledgements and punctuation/particle variants;
- item-level authority for the remaining protected formula list;
- direct dialogue evidence for the exact runtime `你呢？` and bare `呢？` forms;
- the exact structural and discourse status of `我覺得啱` as a short answer;
- regional/register variation in predicate and response-particle choices;
- theory-neutral criteria separating lexical response particles, ellipsis, argument omission, and full predicates in very short turns.

## Freeze result

This batch changes research provenance only. No parser node, role, gloss, heuristic, fixture, test expectation, manifest field, or held-out item was changed or opened.
