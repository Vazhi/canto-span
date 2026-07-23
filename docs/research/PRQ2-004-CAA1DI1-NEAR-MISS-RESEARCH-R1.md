---
title: PRQ2-004 — caa1di1 / zaang1di1 near-miss approximative research
research_id: PRQ2-004
status: active_research_unit
baseline_version: 0.5.213
created: 2026-07-23
queue_visibility: completed_task_only
implementation_authorized: false
status_change_authorized: false
master_backlog_change_authorized: false
---

# PRQ2-004 — `差啲／爭啲（就） + VP` near-miss approximatives

## Research decision

Promote preverbal Cantonese `差啲 caa1 di1` and its independently attested
variant `爭啲 zaang1 di1` to one dedicated **near-miss approximative research
unit**.

The strongest supported profile is:

```text
(SUBJECT / TOPIC) + 差啲／爭啲 + (就) + EVENT PREDICATE
```

The construction places an event or result near a contextually relevant
threshold. In the clearest positive-prejacent examples, the event did not reach
that threshold in the actual course of events:

```text
頭先爭啲仆親。
“Just now [I] nearly tripped and fell.”

你爭啲就攞到冠軍喇！
“You almost won the championship.”

我差啲瞓着。
“I almost fell asleep.”

我差啲整唔見個銀包。
“I almost lost my wallet.”
```

The optional-looking `就 zau6` in the checked examples must not be treated as
part of an obligatory fixed string. The sources attest both `差啲／爭啲 + VP`
and `差啲／爭啲 + 就 + VP`.

The near-miss unit is structurally and semantically distinct from:

- approximate quantity or similarity with `差唔多`;
- scalar comparison or manner adjustment with post-predicate `啲`;
- adjectival `差啲／爭啲` meaning “worse / less satisfactory”;
- ordinary `差` “bad / inferior / differ” plus nominal `啲`;
- generic conditional or consequence `就`;
- sentence-final approximatives such as `咁滯` or `乜滯`, which have their own
  position and polarity behavior.

The evidence is sufficient for a bounded research unit but not for a productive
parser rule. In particular, negated complements, tense/aspect combinations,
ellipsis, subject omission, regional variants, and lexical restrictions still
require controlled native-speaker evidence.

This note authorizes no parser change, registry change, construction-status
change, lexicon installation, acceptance fixture, or master-backlog edit.

## Narrow supported profiles

### A. Positive event near-miss without `就`

```text
(SUBJECT) + 差啲／爭啲 + VP
```

Attested examples include:

```text
頭先爭啲仆親。
我差啲瞓着。
我差啲整唔見個銀包。
```

In these examples the event is approached but not realized. The event predicate
may include a result or endpoint such as:

- `仆親` “fall and get hurt / trip and fall”;
- `瞓着` “fall asleep”;
- `整唔見個銀包` “cause the wallet to become lost.”

These examples support scope over complex event predicates. They do not show
that every VP, state, or activity can appear without additional context.

### B. Positive event near-miss with `就`

```text
(SUBJECT) + 差啲／爭啲 + 就 + VP
```

The exact checked example is:

```text
你爭啲就攞到冠軍喇！
```

The construction still expresses proximity to the event threshold. `就` may
highlight imminent consequence, threshold crossing, or discourse linkage, but
the checked evidence does not establish one obligatory semantic contribution
or a free alternation rule.

A future implementation must not require `就`, and must not treat every
`差啲 … 就 …` string as an ordinary conditional clause.

### C. Near-miss with a negated or negative-result complement

The grammatical-analysis source gives:

```text
我差啲認唔到佢。
```

with the interpretation that the speaker nearly failed to recognize the person.
This shows that the near-miss operator can scope over material containing
negation or a negative potential/result sequence.

The polarity effect is not safely reducible to a token rule such as:

```text
差啲 + NEG P  =>  P happened
```

General approximative research distinguishes a proximal component from a polar
or prejacent-related component, and reports that these components do not always
contribute to discourse in the same way. Cantonese-specific work on other
approximative forms likewise finds strong polarity sensitivity and scalar
organization. These analyses justify preserving polarity and scope explicitly,
but they do not directly provide a complete semantics for `差啲`.

Until controlled Cantonese interpretation evidence is collected, a parser
should preserve:

- the overt negator or negative-result morphology;
- the full complement span;
- whether the actual outcome is contextually stated;
- whether the speaker treats the avoided or missed event as desirable;
- whether the inference is actual nonoccurrence, actual occurrence, or
  unresolved.

### D. Subject or topic omission

Natural examples often allow a discourse-recoverable participant:

```text
頭先爭啲仆親。
```

The checked lexical source gives no overt subject in this sentence. This
supports ordinary Cantonese discourse omission, not a special null-subject slot
inside the near-miss construction. PRQ2-004 should compose with the independent
null-argument research rather than inventing a hidden subject.

### E. Lexical variants

The authoritative Cantonese lexical resource groups:

```text
爭啲 zaang1 di1 / caang1 di1
差啲 caa1 di1
```

under the near-miss adverb sense “nearly / almost.” The forms may differ in
speaker preference, region, register, or lexical frequency. The checked sources
do not justify declaring them freely interchangeable in every environment.

`爭少少` is independently listed in the grammatical-analysis source as another
scope adverb meaning “almost,” but its exact syntax and relation to `爭啲` have
not been researched here. It remains a neighboring candidate, not an installed
alias.

## Semantic dimensions that must remain visible

A future research design should keep these dimensions separate:

| Dimension | Values to test |
|---|---|
| surface marker | `差啲`, `爭啲`, `爭少少`, other regional form |
| `就` | absent, present, prosodically separated, discourse-linked |
| complement polarity | positive, `唔`, `冇`, potential/result negative, lexical negative |
| event structure | achievement, accomplishment, activity, state, change of state |
| endpoint | lexical result, `到`, completion marker, inferred threshold |
| actual outcome | explicitly did not occur, explicitly occurred, contextually inferred, unresolved |
| desirability | undesirable event avoided, desirable event missed, neutral event |
| temporal anchoring | explicit past, recent event, future warning, hypothetical, unresolved |
| subject realization | overt subject, overt topic, discourse-recovered participant |
| aspect/particle | bare, `咗`, `過`, final particle, cluster, unresolved |

These distinctions matter because an English gloss “almost” hides several
possible relations among event proximity, actualization, polarity, and speaker
stance.

## Direct source findings

The complete source ledger is:

`PRQ2-004-CAA1DI1-NEAR-MISS-SOURCE-VERIFICATION-R1.tsv`

### Wong, Cheung, Lo, and Wan 2022 grammatical analysis

The author-produced grammatical-analysis supplement classifies `差啲` as a
Cantonese scope adverb and gives the exact example:

```text
我差啲認唔到佢。
ngo5 caa1di1 jing6 m4 dou2 keoi5
```

The source glosses the sentence as approximately “I almost couldn’t recognize
him/her.” It also lists `爭少少` as an “almost” scope adverb.

This directly supports:

- preverbal adverbial status;
- scope over a complex negative-result/potential sequence;
- separation from nominal `啲`;
- existence of a neighboring `爭少少` form.

The supplement is designed for grammatical annotation and clinical language
sample analysis. It does not report a dedicated acceptability experiment,
complete event-class distribution, or formal semantic analysis of `差啲`.

### Words.hk / Hong Kong Lexicography Limited

The lexical entry groups `爭啲` and `差啲` as Cantonese adverbs meaning nearly or
almost and supplies three exact examples:

```text
頭先爭啲仆親。
你爭啲就攞到冠軍喇！
我差啲瞓着。
```

This supports:

- near-miss use with and without `就`;
- subject omission in context;
- both undesirable-event and desirable-event complements;
- result/endpoint predicates;
- `差啲` and `爭啲` as lexical variants within the same broad adverb sense.

The same resource separately records adjectival `爭啲` meaning “unsatisfactory;
not meeting an expected level,” demonstrating a necessary lexical-category and
scope boundary.

### Words.hk entry for written `差點`

The `差點` entry labels it as written-language material and gives the Cantonese
paraphrase:

```text
我差啲整唔見個銀包。
```

This provides an additional exact near-miss example and confirms that spoken
Cantonese `差啲` is the intended vernacular counterpart in that entry. It does
not establish that written `差點` should be accepted as an unrestricted spoken
Cantonese surface form.

### Lee 2023 on Cantonese approximatives

Lee's peer-reviewed study analyzes Cantonese sentence-final approximatives
`乜滯 mat1zai3` and `咁滯 gam3zai3`, not preverbal `差啲`. It argues that
approximatives involve a proximal component and a polarity-sensitive
polar-minimal component organized on a scale.

This is relevant because it independently establishes that Cantonese
approximative meaning can depend on polarity and scalar orientation. It does
not prove that `差啲` has identical syntax, lexical semantics, or inference
patterns. PRQ2-004 uses it only as a family-level caution against a flat English
“almost” feature.

### Amaral 2010 on `almost`

Amaral reports psycholinguistic evidence that the meaning components of English
`almost` and `barely` contribute asymmetrically to textual coherence and context
update. This supports a general warning that the prejacent-related inference of
an approximative should not be encoded as a simple truth-conditional toggle
without language-specific evidence.

English evidence has zero direct weight for Cantonese word order, lexical
selection, optional `就`, or speaker judgments.

## Boundary against `差唔多`

`差唔多 caa1 m4 do1` has independently documented uses including:

```text
差唔多兩點。
“approximately two o’clock”

佢兩兄弟差唔多高。
“the two brothers are nearly the same height”

差唔多喇，大家收工啦。
“that is about it; let’s finish work”
```

These are quantity, similarity, degree, or completion-proximity readings. They
do not instantiate the preverbal event near-miss schema merely because English
may translate both forms with “almost.”

A future parser must preserve at least:

| Form | Primary research target |
|---|---|
| `差啲／爭啲 + VP` | event near-miss |
| `差唔多 + quantity/time` | approximate measure |
| `NP + 差唔多 + property` | similarity / close degree |
| `差唔多喇` | contextual near-completion / discourse evaluation |
| `A + 啲` | scalar differential or adjustment, UC-RQ-026 |

PRQ2-021 remains the dedicated future study for the polysemy of `差唔多`.

## Boundary against adjectival `差啲／爭啲`

The same surface material can mean “worse” or “less satisfactory”:

```text
呢個差啲。
“This one is a bit worse.”

今次你嘅表現爭啲喎。
“Your performance this time is not quite satisfactory.”
```

This profile differs from the near-miss construction because:

- `差／爭` is the gradable predicate;
- `啲` contributes a small differential or degree adjustment;
- there is no following event proposition under approximative scope;
- the sentence evaluates an entity, performance, or alternative.

A broad surface matcher for `差啲` would therefore conflate PRQ2-004 with the
post-predicate `啲` family already researched under UC-RQ-026.

## Boundary against ordinary `就`

`就` participates in many unrelated Cantonese constructions, including:

- condition-result relations;
- temporal sequence;
- immediacy;
- focus or restriction;
- consequence and discourse linkage;
- the checked `爭啲就攞到冠軍` near-miss example.

The near-miss construction cannot be identified from `就` alone. Conversely,
the absence of `就` cannot block a valid `差啲／爭啲 + VP` profile.

## Runtime collision findings

The direct v0.5.213 audit is recorded in:

`PRQ2-004-CAA1DI1-NEAR-MISS-COLLISION-AUDIT-R1.tsv`

### 1. Core target examples are normally absent

The runtime gives no top construction for:

```text
我差啲跌親。
我差啲就跌親。
頭先爭啲仆親。
你爭啲就攞到冠軍喇！
我差啲瞓着。
我差啲認唔到佢。
差啲就遲到。
佢差啲死咗。
```

The target operator, its scope, and the event threshold are therefore not
represented.

### 2. One exact lexical example receives a serious false full-span analysis

For:

```text
我差啲整唔見個銀包。
```

the runtime reports full root coverage through:

```text
ClauseSpan
  TransitiveVP: 差啲整唔見個銀包
    QuantifiedClassifierNP: 啲整唔見個銀包
```

This treats near-miss `啲` as if it were a nominal quantity/classifier marker and
absorbs the following event predicate into a malformed NP. The valid internal
`整唔見個銀包` and `唔見個銀包` analyses do not rescue the higher structure.

This is a high-priority collision because a root-coverage PASS hides a false
constituent boundary and loses the approximative scope.

### 3. Negated complements remain unrepresented

Both:

```text
我差啲認唔到佢。
我差啲冇趕到火車。
```

receive no top construction. The parser therefore neither captures the
near-miss operator nor risks asserting the actual outcome, but future work must
avoid letting ordinary `NegatedVP` or potential/result analysis consume the
scope relation.

### 4. Neighboring `差唔多` is already misanalyzed

The controls:

```text
差唔多兩點。
佢兩兄弟差唔多高。
```

are wrapped partly as `ActionStativeVP` and `NegatedStativePredicate: 唔多`.
This shows that lexical protection and sense separation are necessary across
the whole `差*` family. PRQ2-004 must not repair `差唔多` by relabeling it as a
near-miss operator.

### 5. Adjectival controls are not represented as the target

`呢個差啲` recognizes only the demonstrative-classifier NP `呢個`, while the
adjectival predicate remains unwrapped. `今次你嘅表現爭啲喎` receives no top
construction. These are useful negative controls: later near-miss work must not
overgenerate merely because the current parser lacks the adjectival analysis.

## Negative boundaries required before implementation

A future implementation must prove that it does not capture:

1. adjectival `差啲／爭啲` meaning worse or unsatisfactory;
2. `差唔多 + number/time/quantity` approximation;
3. `NP + 差唔多 + property` similarity;
4. post-predicate comparative/adjustment `A + 啲`;
5. nominal `啲 + N` or demonstrative `呢啲 + N`;
6. ordinary `差 + NP` lexical predicate or difference expressions;
7. ordinary conditional/consequence `就` without a near-miss marker;
8. written Mandarin-oriented `差點／差點兒` unless separately licensed;
9. lexical or formulaic `爭少少` without direct form-specific research;
10. incomplete fragments such as `差啲就` without a licensed ellipsis context;
11. quoted or metalinguistic mentions of the expression;
12. sentence-final approximative particles `咁滯／乜滯`;
13. malformed NP grouping beginning at `啲`;
14. cases where the following material is not an event or scalar proposition;
15. contexts where actual outcome and polarity remain unresolved.

## Native-speaker evidence required

A future blinded survey should not ask only whether isolated strings sound
natural. It should use short contexts and interpretation choices.

Required contrasts include:

### Marker and linker

```text
差啲 VP
差啲就 VP
爭啲 VP
爭啲就 VP
爭少少 VP
```

### Positive and negative complements

```text
差啲跌親
差啲冇跌親
差啲認唔到佢
差啲冇趕到火車
```

Participants should indicate both naturalness and which event actually occurred.

### Desirability

Use matched contexts for:

- undesirable event narrowly avoided;
- desirable event narrowly missed;
- neutral event near realization.

This tests whether desirability affects form choice, particles, or actualization
inference rather than being part of the lexical construction.

### Event class

Test achievements, accomplishments, activities, states, and change-of-state
predicates. Avoid assuming that English `almost` compatibility predicts
Cantonese compatibility.

### Aspect and particles

Test combinations with:

- bare VP;
- result complement;
- `到／唔到`;
- `咗`;
- final `喇／啦／喎／啊`;
- explicit temporal adverbials.

### Adjectival negative controls

Use matched forms such as:

```text
呢個差啲。
我差啲跌親。
```

The task must force participants to distinguish scalar evaluation from event
near-miss rather than relying on character identity.

## Current disposition

| Dimension | Result |
|---|---|
| Dedicated research family | supported |
| Core marker | `差啲` supported |
| Lexical variant | `爭啲` supported within broad adverb sense |
| Additional variant | `爭少少` attested as neighboring form; distribution unresolved |
| `就` | attested present and absent; contribution unresolved |
| Positive event near-miss | directly supported |
| Negative complement | directly attested; actualization inference not fully resolved |
| Result/endpoint host | directly supported |
| Overt subject | supported |
| Discourse-recovered subject | supported as ordinary Cantonese omission |
| Strict past-tense requirement | not established |
| Free VP productivity | not established |
| Runtime target coverage | absent, with one severe false full-span NP analysis |
| Parser implementation | not authorized |
| Construction-status change | not authorized |

## Next decision gate

PRQ2-004 may proceed to an implementation proposal only after:

1. controlled native interpretation evidence for positive and negative
   complements;
2. exact tests of optional `就` and prosodic placement;
3. marker comparison across `差啲`, `爭啲`, and `爭少少`;
4. event-class and aspect compatibility tests;
5. reviewed natural corpus hits with sufficient context to identify actual
   outcome;
6. explicit boundary tests against adjectival `差啲` and `差唔多`;
7. a segmentation rule preventing `啲 + following VP` from becoming a false NP;
8. scope composition with negated, potential, resultative, and completion VPs;
9. context-sensitive learner glosses that do not assert the wrong outcome;
10. held-out examples from speakers not used to formulate the rule.

Until then, PRQ2-004 remains a research-only unit. Generated runtime probes have
zero linguistic-evidence weight.

## Sources

1. Wong, Anita Mei-Yin, Cheung, C. C.-H., Lo, J. M.-W., and Wan, E. K.-H. 2022. *Grammatical Analysis of Cantonese Samples*, supplement to *Understanding Development and Disorders in Cantonese using Language Sample Analysis*. Scope-adverb section; exact `我差啲認唔到佢` example.
2. Words.hk / Hong Kong Lexicography Limited. Entry `爭啲 / 差啲`; adverb and separate adjectival senses; exact examples `頭先爭啲仆親`, `你爭啲就攞到冠軍喇`, and `我差啲瞓着`.
3. Words.hk / Hong Kong Lexicography Limited. Entry `差點`; written-language label and Cantonese paraphrase `我差啲整唔見個銀包`.
4. Lee, Peppina Po-lun. 2023. “Proximity, polarity and scalarity: A semantic study of approximative sentence-final particles in Cantonese.” *Lingua* 294:103595.
5. Amaral, Patrícia. 2010. “Entailment, assertion, and textual coherence: the case of almost and barely.” *Linguistics* 48(3):525–545.
6. Canto Span runtime 0.5.213 direct research probes, observation only.
