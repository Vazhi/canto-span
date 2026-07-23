---
title: UC-RQ-018 — Alternative/disjunctive questions with 定／定係
research_id: UC-RQ-018
status: active_research_unit
live_branch_version_observed: 0.5.213
sandbox_audit_baseline: 0.5.208
created: 2026-07-23
implementation_authorized: false
status_change_authorized: false
---

# UC-RQ-018 — Alternative/disjunctive questions with `定／定係`

## Research decision

Cantonese has an independently supported **overt alternative-question construction** in which two or more alternatives are linked by `定 ding6` or `定係 ding6hai6`:

```text
你要粥定係飯？
nei5 jiu3 zuk1 ding6hai6 faan6
“Do you want congee or rice?”
```

The construction should not be reduced to an ordinary polar question and should not be merged mechanically with the surface A-not-A parser rule. Its answer selects an offered alternative rather than simply confirming or denying one proposition.

The checked evidence supports a family with at least these surface profiles:

```text
A. NP alternative:      你要粥定係飯？
B. VP alternative:      你飲茶定係飲咖啡？
C. clause alternative:  佢睇書定係去買嘢？
D. embedded alternative: 我問阿妹佢諗過定係睇過。
E. IS-particle tail:    你要粥定係飯話／先？
```

`定` and `定係` are treated together in the inspected sources, with `定` functioning as the shorter form in ordinary examples. `抑或 jik1waak6` is also identified as an overt disjunctive linker, but its register and distribution were not independently mapped in this pass.

No parser or construction-status change is authorized. The current evidence justifies a dedicated research unit and a future bounded node only after exact constituent, lexical, particle, and negative boundaries are verified.

## Correction to the backlog formulation

The master backlog asks what distinguishes:

```text
A ding6 B
hai6 A ding6 B
particle-marked alternatives
```

The inspected evidence does **not** establish `係 A 定係 B` as a single general alternative-question template.

In examples such as:

```text
我哋棵聖誕樹係真定係假㗎？
你係攞景定係贈興呀？
```

initial `係 hai6` may be the matrix copula or another clause-level element, while `定係` remains the linker between the alternatives. A future parser must distinguish:

1. copula + alternative predicates;
2. `定係` as the disjunctive connector;
3. copular A-not-A `係唔係／係咪`;
4. clause-final copular tags.

The source lead `Wu 1989` in the original backlog was not verified. The inspected 2025 article cites **Wu 1996** when summarizing conventional Cantonese interrogative markers. The backlog bibliography should remain unresolved until the exact Wu reference is checked.

## Central source findings

The full source ledger is:

`UC-RQ-018-ALTERNATIVE-DISJUNCTIVE-QUESTION-SOURCE-VERIFICATION-R1.tsv`

### 1. `定（係）` overtly links alternatives

Huang, Her, and Kong (2025) identify explicit disjunctive morphemes or linking words including:

- `定（係） ding6(hai6)`;
- `抑或 jik1waak6`.

Their core example is:

```text
你要粥定（係）飯？
nei5 jiu3 zuk1 ding6(hai6) faan6
```

The source uses both the full and reduced connector forms and treats them as one surface alternative-question type.

The Hong Kong Cantonese coursebook independently teaches `甲定係乙` as a bounded-choice pattern and supplies person, place, time, manner, and activity alternatives:

```text
邊個去，王小姐定係吳小姐？
去邊度，去灣仔定係去北角？
幾點去，三點去定係四點去？
點樣去，行路去定係坐車去？
做乜嘢，打字定係打電話？
```

This pedagogical source supports exact attestation and structural variety, but not unrestricted productivity or one final parser ontology.

### 2. Alternative questions request selection, not truth confirmation

Huang, Her, and Kong classify overt disjunctive questions as information-seeking questions. Their examples contrast a requested content answer with rejected truth-based `係／唔係` or `啱／唔啱` answers.

The safe parser-facing distinction is:

- polar `咩` question: asks for confirmation/disconfirmation of one proposition;
- overt `定（係）` question: offers a set of alternatives and requests selection;
- A-not-A question: has a different surface form but may be grouped semantically with disjunctive questions under the authors’ theory.

The semantic grouping does not justify replacing the existing surface-specific A-not-A analysis with the overt-linker construction.

### 3. `咩 me1` is a negative boundary in the inspected analysis

The 2025 paper explicitly marks:

```text
你要粥定（係）飯（*咩）？
```

as incompatible with the polar interrogative particle `咩 me1`.

This is directly relevant because the v0.5.208 runtime can currently wrap the complete alternative-containing clause in `PolarQuestionFrame` when `咩` is appended. That behavior gives full-span surface coverage but conflicts with the inspected source boundary.

This source judgment should still be independently checked across speakers, discourse contexts, and possible echo or metalinguistic readings before becoming an executable negative rule.

### 4. `話 waa6` and `先 sin1` are distinct optional tails

The same article attests:

```text
你要粥定（係）飯話／先？
```

and analyzes `話` and `先` as optional sentence-final elements compatible with information-seeking questions. They are not treated as the polar particle `咩`.

The current runtime does not represent these tail functions:

- final `先` remains a generic `sequence_or_focus` token inside a broad modal VP;
- final `話` remains a speech-reporting verb token inside the same broad VP.

A future alternative-question node must preserve the exact tail identity and scope rather than stripping or flattening these tokens.

### 5. `究竟` and `唔通` provide a proposed diagnostic contrast

Huang, Her, and Kong give:

```text
究竟你飲奶茶定係咖啡？
*唔通你飲奶茶定係咖啡？
```

They use this contrast to distinguish information-seeking from confirmation-seeking questions.

This is useful as a research contrast, not yet a parser rule. The lexical status, speaker judgments, prosody, and discourse force of `究竟` and `唔通` require independent confirmation before implementation.

### 6. overt alternatives can coordinate more than nouns

The checked sources attest or discuss alternatives spanning:

- referential NPs;
- locative phrases;
- time phrases;
- manner phrases;
- VPs;
- clauses.

A matcher limited to `NOUN + 定係 + NOUN` would miss central cases. Conversely, a rule matching any material around `定／定係` would overgenerate across:

- lexical verb/complement `定` meaning ‘settle, fix, in advance’;
- declarative disjunction with `或者`;
- truncated or self-repair fragments;
- quoted or metalinguistic material;
- unresolved constituent boundaries.

### 7. embedded alternative questions are independently attested

The 2025 article gives:

```text
我問阿妹佢諗過定（係）睇過。
```

as an indirect question complement. This separates overt alternatives from direct-question punctuation alone.

A future construction therefore cannot require a final question mark or a sentence-final particle. It needs a distinction between:

- direct alternative questions;
- embedded interrogative complements;
- ordinary declarative disjunction.

### 8. A-not-A is related but not surface-identical

Huang, Her, and Kong argue that A-not-A questions are a subtype of disjunctive information-seeking questions because the alternatives are positive and negative propositions. This is a theoretical taxonomy claim.

For Canto Span, the useful conclusion is narrower:

- overt `A 定（係） B` and A-not-A share some proposed semantic diagnostics;
- they have different overt morphology and constituency;
- current `ANotAQuestion` tests do not cover overt lexical alternatives;
- one node should not silently replace the other without an explicit higher-level question-family design.

### 9. child-corpus coding confirms an established alternative form

Li et al. (2013) describe an “alternative form” offering a choice between two alternatives and expressed by linking phrases with `ding6` or `ding6 hai6`. Their study analyzes a corpus from 492 Cantonese-speaking children aged 36, 48, and 60 months.

This supports the construction’s independent descriptive status and early use. It does not establish adult productivity, exact lexical boundaries, particle ordering, or one syntactic theory.

## Runtime collision audit

The detailed audit is:

`UC-RQ-018-ALTERNATIVE-DISJUNCTIVE-QUESTION-COLLISION-AUDIT-R1.tsv`

### Lexical recognition without structural recognition

The v0.5.208 sandbox lexicon contains:

```text
定係  syntax=alternative_question_connector
定    syntax=alternative_connector_or_decide_verb_homograph
```

but there is no dedicated alternative-question construction.

This creates two misleading outcomes:

1. Some strings receive full-span coverage only because a broad `ModalVP` swallows the linker and both alternatives.
2. Other strings remain split into separate VPs or locative phrases with the linker unwrapped.

Neither outcome represents the alternative set, answer type, direct/embedded status, or particle compatibility.

### Exact collision examples

```text
你要粥定係飯？
```

is fully wrapped as `SubjectModalPredicateClause > ModalVP`, but the connector and alternatives remain flat children. Full coverage therefore conceals a missing question construction.

```text
你飲茶定係飲咖啡？
```

leaves the subject and linker outside two separate VP nodes. This shows that identical alternative semantics receive different structural outcomes depending on unrelated host composition.

```text
喺前面定係後面？
```

recognizes only the first locative phrase and leaves the connector and second location outside.

```text
你要粥定係飯咩？
```

is wrapped as `PolarQuestionFrame`, directly colliding with the inspected scholarly negative boundary.

```text
你要粥定係飯話／先？
```

is swallowed by the broad modal host, with the final item treated as an ordinary speech verb or sequence/focus token rather than an IS-question tail.

```text
我問阿妹佢諗過定係睇過。
```

produces two experiential VPs and no embedded interrogative-complement relation.

## Candidate construction decomposition

A future implementation should begin with a theory-neutral family rather than a single unrestricted node.

### UC-RQ-018A — direct overt alternative question

Provisional descriptive profile:

```text
[QuestionHost … Alternative-1 定／定係 Alternative-2 …]
```

Required retained information:

- connector surface: `定` or `定係`;
- complete alternative spans;
- constituent type of each alternative;
- direct versus embedded status;
- optional tail particle;
- answer-selection semantics as research metadata, not learner truth value.

### UC-RQ-018B — embedded alternative interrogative

Research whether predicates besides `問` license embedded alternatives, including:

- `想知`;
- `唔知`;
- `記得`;
- `決定`;
- `睇下`;
- report and cognition predicates.

Do not assume every declarative `A 或者 B` complement is interrogative.

### UC-RQ-018C — copular-host alternatives

Distinguish:

```text
NP 係 A 定係 B
NP A 定係 B
係 A 定係 B
```

Determine whether omitted subjects, focus `係`, copular predication, and elliptical alternatives require separate analyses.

### UC-RQ-018D — particle and tail inventory

Test exact compatibility with:

- `呀` tone categories;
- `話`;
- `先`;
- `呢`;
- `㗎` series;
- `咩` under neutral, echo, surprise, and metalinguistic contexts.

No generic “any sentence-final particle” slot is justified.

### UC-RQ-018E — disjunction lexeme contrast

Compare:

- `定`;
- `定係`;
- `抑或`;
- `或者`;
- `又或者`;
- `一係…一係…`.

Determine which form marks direct alternatives, declarative possibilities, exhaustive choice, non-exhaustive choice, formal register, or discourse continuation.

## Required corpus and speaker programme

### Corpus searches

Search HKCanCor and additional conversational Cantonese corpora for:

```text
定
定係
抑或
或者
一係 … 一係
```

Every hit must be manually classified for:

- alternative connector versus lexical `定`;
- direct question versus embedded question;
- declarative disjunction;
- constituent type;
- number of alternatives;
- tail particle;
- ellipsis or shared material;
- punctuation and prosody availability;
- speaker region and register.

### Native-speaker instrument requirements

A future blinded instrument should compare semantically matched conditions such as:

```text
A. 你想飲茶定係咖啡？
B. 你想飲茶定咖啡？
C. 你想唔想飲茶或者咖啡？
D. 你想飲茶定係咖啡咩？
```

Naturalness must be separated from interpretation:

- choose tea;
- choose coffee;
- yes/no to wanting a drink;
- surprise or echo reading;
- non-exhaustive alternatives;
- context-required interpretation.

Particle contrasts and embedded questions should be separate tasks rather than mixed into one rating-only survey.

## Negative boundaries required before implementation

A future implementation must prove boundaries against:

1. lexical/resultative `定`:
   - `企定啲`;
   - `睇定啲`;
   - `問定條路`;
   - `約定啲朋友`;
2. declarative `或者` disjunction;
3. polar `咩` questions;
4. A-not-A questions without overt connector;
5. sentence-final copular tags;
6. quoted alternatives and metalinguistic mentions;
7. incomplete self-repairs such as clause-initial `定係…`;
8. coordination where the alternatives are not interrogative;
9. `肯定` and `一定` lexical compounds;
10. strings whose apparent alternatives do not form parallel constituents.

## Current disposition

| Dimension | Result |
|---|---|
| Independent construction family | supported as a research unit |
| Exact overt connector | `定` / `定係` supported |
| Additional linker | `抑或` identified; detailed distribution unresolved |
| Constituent range | NP, place, time, manner, VP, and clause examples attested |
| Direct question | supported |
| Embedded alternative interrogative | supported with `問` example |
| A-not-A relationship | semantic/taxonomic proposal; do not merge surface nodes |
| `咩` compatibility | source gives a negative boundary; independent speaker check still required |
| `話／先` tails | exact source support; functions need separate runtime analysis |
| Current runtime coverage | absent or misleadingly hidden under broad wrappers |
| Parser implementation | not authorized |
| Construction-status change | not authorized |

## Next decision gate

UC-RQ-018 may proceed to an implementation proposal only after all of the following exist:

1. reviewed corpus hits for direct and embedded alternatives;
2. exact separation of connector `定` from lexical `定`;
3. constituent-boundary tests across NP, VP, place, time, manner, and clause alternatives;
4. speaker evidence for `定` versus `定係`;
5. independently checked particle compatibility, especially `咩`;
6. direct versus embedded question tests;
7. negative controls for `或者`, A-not-A, tags, and declarative coordination;
8. an explicit decision on whether a higher-level IS-question family belongs in the ontology.

Until then, UC-RQ-018 remains a research unit with **zero linguistic weight assigned to generated parser probes**.
