---
title: 有得／冇得／有冇得 opportunity boundaries R1
status: findings_complete
research_id: PRQ2-001-CONTINUATION
intake_issue: 348
work_claim: 349
draft_pr: 350
reviewed_on: 2026-07-30
predecessor_research: docs/research/PRQ2-001-YAU5-MOU5-DAK1-AVAILABILITY-RESEARCH-R1.md
source_ledger: docs/research/JAU-MOU-DAK-PRIMARY-SOURCE-LEDGER-R1.tsv
candidate_inventory: external-evidence/jau-mou-dak-hkcancor/hkcancor-jau-mou-dak-candidate-inventory.json
review_packet: review-packets/corpus-review/JAU-MOU-DAK/full-review-packet-r1.tsv
decisions: review-packets/corpus-review/JAU-MOU-DAK/full-review-decisions-r1.tsv
selector: external-evidence/jau-mou-dak-hkcancor/query-hkcancor-jau-mou-dak.py
verifier: review-packets/corpus-review/JAU-MOU-DAK/verify-full-review-decisions-r1.py
implementation_authorized: false
identity_change_authorized: false
status_change_authorized: false
---

# 有得／冇得／有冇得 opportunity boundaries R1

## Executive finding

This research extends rather than repeats `PRQ2-001`.

The strongest available account is one **availability/opportunity family** with three overt
profiles:

```text
affirmative: 有得 + predicate
negative:    冇得 + predicate
question:    有 + 冇得 + predicate
```

At the research level:

```text
有得 + predicate
    circumstances make the predicate event available, accessible, permitted,
    qualified, or practically possible

冇得 + predicate
    circumstances make the predicate event unavailable, inaccessible, barred,
    unqualified, or practically impossible

有冇得 + predicate
    asks which availability alternative holds: 有得 or 冇得
```

The third profile is best treated provisionally as **suppletive polarity over the established
availability unit**, not as a fourth unrelated existential, possessive, modal, or ordinary
lexical V-唔-V construction.

This conclusion is a project inference from corpus distribution, the established
`有得／冇得` source analysis, the general syntax and semantics of Cantonese `有冇`
interrogatives, and the current identity boundaries. No inspected primary source directly
names or analyzes `有冇得` as an independent construction.

No UUID, identity, status, runtime, fixture, survey, panel, held-out, release, or deployment
state changes in this findings unit.

## Why this continuation was necessary

`PRQ2-001` had already established that:

- `有得` and `冇得` can form preverbal units with an overt event-denoting predicate;
- the broad contrast is possibility/availability versus unavailability/impossibility;
- the profile is not postverbal result potential and is not ordinary existential or
  possessive `有／冇 + NP`;
- the runtime does not represent the dependency;
- `有冇得`, ellipsis, predicate selection, polarity asymmetry, and idiomatic `冇得 X`
  remained quarantined.

The present work therefore did not reopen the basic existence question. It exhaustively
retrieved and reviewed the corpus surfaces needed to answer those quarantined questions.

## Reproducible corpus endpoint

The query inventories every frozen HKCanCor occurrence of:

1. exact single-token `有得`;
2. exact single-token `冇得`;
3. adjacent `有` + single-token `冇得`, represented once as `有冇得`;
4. single-token `有冇得`, if present;
5. single-token `有冇` followed by `得`, if present;
6. adjacent split `有／冇 + 得` as tokenization diagnostics;
7. fused corpus tokens beginning with `有得` or `冇得` as lexical-boundary diagnostics.

Utterance-initial, utterance-final, predicate-less, quoted, embedded, repaired, and
code-switched cases are retained. Punctuation is excluded from the nearest-lexical-token
calculation by Unicode category rather than relying on the inconsistent blank punctuation
tags in HKCanCor.

Stable candidate IDs are generated from the frozen source file, turn, token anchor, query
ID, and profile inputs. The original 58-file source manifest and hashes remain unchanged.

## Mechanical inventory

| Measure | Count |
|---|---:|
| Candidate spans | 95 |
| Candidate utterances | 89 |
| Source files represented | 38 |
| Exact single-token `有得` | 38 |
| Exact single-token `冇得` | 48 |
| Adjacent `有 + 冇得` | 5 |
| Split-token `有 + 得` diagnostic | 1 |
| Fused `冇得頂` diagnostics | 3 |
| Mechanically predicate-following | 80 |
| Mechanically non-predicate-following | 15 |
| Utterance-initial | 18 |
| Utterance-final | 1 |

No single-token `有冇得`, single-token `有冇 + 得`, split `冇 + 得`, or fused
`有得...` lexical token occurred in the frozen distribution.

These are distribution counts, not prevalence or productivity estimates. HKCanCor is one
small conversational corpus, and repeated turns or lexical clusters are preserved rather
than statistically collapsed.

## Complete expert classification

All 95 rows were reviewed with the complete utterance and adjacent turns.

| Expert class | Count |
|---|---:|
| `compositional_opportunity` | 63 |
| `polar_opportunity_question` | 5 |
| `elliptical_opportunity` | 2 |
| `lexicalized_or_idiomatic` | 15 |
| `ambiguous_boundary` | 7 |
| `repair_or_unusable` | 3 |
| **Total** | **95** |

Confidence distribution:

| Confidence | Count |
|---|---:|
| `high` | 78 |
| `medium` | 16 |
| `low` | 1 |

The positive and negative corpus surfaces are not distributionally identical:

| Surface profile | Compositional | Polar | Elliptical | Lexical/idiomatic | Ambiguous | Repair | Total |
|---|---:|---:|---:|---:|---:|---:|---:|
| `有得` including one split-token diagnostic | 31 | 0 | 1 | 1 | 6 | 0 | 39 |
| `冇得` | 32 | 0 | 1 | 11 | 1 | 3 | 48 |
| `有 + 冇得` | 0 | 5 | 0 | 0 | 0 | 0 | 5 |
| fused `冇得頂` | 0 | 0 | 0 | 3 | 0 | 0 | 0 | 3 |

The table demonstrates a real **lexicalization asymmetry in this corpus packet**: negative
`冇得` participates in many more discourse and semi-lexical expressions than positive
`有得`. It does not establish that the grammatical positive and negative availability
profiles are different constructions. The transparent cores remain closely parallel.

## Affirmative and negative core

### Affirmative `有得 + predicate`

The 31 transparent affirmative cases cover property, motion, perception, participation,
education, work, payment, development, commerce, treatment, and social activity, including:

```text
淡季先有得平
先至有得睇
有得參加
有得計
有得發展
有得讀
幾時先有得出糧
有得走
香港都有得賣
實有得醫
```

The semantics are broader than actor-internal ability. Conditions, institutional access,
qualification, timing, market availability, permission, and opportunity can license the
event.

### Negative `冇得 + predicate`

The 32 transparent negative cases cover corresponding unavailability or practical
impossibility, including:

```text
冇得去
冇得揀
冇得享用哩個福利
冇得剪
冇得放假
冇得攞
飯都冇得食
冇得睇 Sailor Moon
冇得停
冇得控制
```

The corpus therefore strengthens `PRQ2-001` beyond a handful of examples. It does not,
however, license every predicate automatically. Exact lexical, syntactic, and contextual
scope remains evidence-sensitive.

## `有冇得` polarity questions

The exhaustive inventory contains five `有 + 冇得` cases across independent files:

```text
你最近有冇得 interview 啊其實？
嗰科喺嗰間學院有冇得讀？
我五年後都唔知有冇得好似佢噉……
我話：「喂，有冇得平啊？」
內地有冇得即係諗下呢？
```

Four are clear; the last is disfluent but still preserves an availability-polarity question.
The set contains:

- ordinary matrix questions;
- a quoted direct question;
- one embedded interrogative under `唔知`;
- a location-bearing question where the location remains outside the availability core;
- verbal, adjectival, code-switched, and complex predicate material.

### Question-force analysis

Huang, Her, and Kong's general Cantonese taxonomy treats A-not-A questions as
information-seeking alternatives rather than confirmation-seeking particle questions. The
paper independently gives embedded `有冇` in:

```text
我問阿妹佢有冇諗過。
```

The current corpus provides the matching availability example:

```text
我五年後都唔知有冇得好似佢噉。
```

Together, these support the following **project inference**:

```text
[有 / 冇] + 得 + predicate
```

presents the affirmative and negative availability alternatives. The visible corpus
tokenization is `有` plus single-token `冇得`; the analysis must preserve that overt
sequence and must not fabricate a repeated `得`, hidden `唔`, or ordinary lexical-verb
copying.

### Why no separate polar construction identity is justified yet

The five questions are structurally and semantically predictable once the following are
independently represented:

1. the `有得／冇得 + predicate` availability family;
2. the suppletive `有冇` interrogative strategy;
3. matrix or embedded question force;
4. any overt location, condition, topic, particle, or complement.

No independent source was found that requires `有冇得` to be one unanalyzable lexical
item or an autonomous language construction. A dedicated parser profile may eventually be
useful for span recovery and display, but implementation convenience has no independent
linguistic weight.

The current AA01 `M4MarkedANotAInterrogative` identity explicitly excludes suppletive
`有冇`. Its evidence therefore cannot be donated automatically. A future accepted identity
or implementation specification must either:

- represent suppletive `有冇` compositionally over the availability unit; or
- allocate a source-bounded sibling profile after explicit identity adjudication.

This findings unit recommends the first option unless implementation or held-out evidence
shows that composition cannot preserve the observed span and interpretation.

## Ellipsis and fragments

Two rows support recoverable omission, but not a general rule deleting arbitrary predicates.

### Topic-supported affirmative ellipsis

```text
BBQ 呢又有得。
```

The overt topic and following turn recover an available barbecue activity. This supports a
bounded discourse-ellipsis profile:

```text
overt topic/context + 有得 + Øpredicate
```

only when the omitted event is uniquely recoverable.

### Negative self-reformulation

```text
你冇得，你唔可以……
```

The incomplete `冇得` is immediately paraphrased with `你唔可以`. Its meaning is
recoverable, but it does not establish a freely licensed standalone negative fragment.

The corpus has only one utterance-final target candidate, the affirmative BBQ example.
This is insufficient for a broad predicate-omission construction.

## Lexicalized and idiomatic boundary

### Fused `冇得頂`

Three corpus occurrences are single tokens and evaluative:

```text
好冇得頂
真係冇得頂
有個大單真係冇得頂
```

They mean roughly unsurpassable or excellent. They are negative evidence for a rule that
blindly segments every string beginning with `冇得` into productive unavailability plus a
predicate.

### Semi-lexical `冇得講`

Multiple `冇得講` cases function as discourse conclusions or evaluations:

- no argument remains;
- the premise makes the conclusion inevitable;
- something is beyond dispute or exceptionally good.

These are not straightforward denials of an available speaking event. They require lexical
or discourse classification before any generic opportunity analysis.

### Other conventionalized boundaries

The packet also contains:

- `冇得計`: conventional uncalculability or incomparability in context;
- `冇得搞`: a matter is unworkable;
- `有得諗`: an option is worth considering.

These remain related historically or semantically to possibility, but their interpretation is
not safely predicted by substituting any arbitrary predicate.

## Ambiguous and unusable boundaries

Seven rows remain ambiguous because the overt complement or lexical category is not
secure:

- `有得順序連埋 number`;
- `有得 second interview`;
- disfluent `有得發展得會`;
- `有得掹`, whose lexical meaning is queried in the conversation;
- noncanonical `有得飯食`;
- nominally tagged `冇得特價`;
- code-switched rhetorical `邊有得 surprise`.

Three negative rows are abandoned repairs:

```text
冇得-冇得要求
冇得-唔讀
冇得-你其實冇乜點停
```

No constructional conclusion is drawn from the abandoned first spans.

## Tokenization is not identity

HKCanCor overwhelmingly writes the productive core as single tokens `有得` and `冇得`,
and represents the polarity sequence as `有` + `冇得`. One case is split as `有 + 得`:

```text
千二蚊有得交易啊。
```

Its context supports the same opportunity reading. Conversely, fused `冇得頂` is a single
token but belongs to a lexicalized evaluative boundary. Therefore:

- single-token annotation is evidence about corpus segmentation, not sufficient evidence of
  one grammatical construction;
- split annotation does not by itself exclude a genuine availability relation;
- runtime identity must use overt form, context, category, and span—not whitespace or token
  count alone.

## Scope and placement

The reviewed examples show that the availability unit can be preceded by:

- overt subjects or experiencers;
- locations;
- temporal or conditional material;
- focus and restriction such as `先／先至`;
- modal or epistemic material such as `應該／可能／實`;
- embedding predicates such as `唔知`;
- quotation material.

These elements contextualize or scope over the availability relation. They must not be
silently swallowed into a flat lexical entry.

A following complement may contain:

- a simple verb or adjective;
- an object;
- motion plus purpose or location material;
- an adverb plus predicate;
- a code-switched predicate;
- a larger VP.

The current data do not determine one maximal syntactic category for every complement.
An implementation must preserve overt nested structure rather than consume an arbitrary
rest-of-clause span.

## Runtime implication

The predecessor collision audit already showed that the current runtime leaves the
availability relation absent or fragmented in:

```text
我冇得去啊。
我有得去。
你有冇得去？
呢度有冇得改衫？
先至有得睇。
```

The present corpus adds the following design requirements for a later implementation
specification:

1. represent an affirmative availability unit over an overt predicate;
2. represent a negative availability unit over an overt predicate;
3. represent suppletive `有 + 冇得` question force without treating it as ordinary V-唔-V;
4. permit matrix, embedded, quoted, and location-bearing hosts;
5. retain objects, adverbs, motion material, and final particles outside or inside the exact
   nested spans they overtly belong to;
6. support narrowly recoverable ellipsis without a general zero-predicate rule;
7. quarantine fused and semi-lexical items such as `冇得頂` and discourse `冇得講`;
8. do not depend solely on HKCanCor token boundaries.

A useful internal representation would separate:

```text
AvailabilityRelation(polarity, predicate, contextual_host)
QuestionForce(alternatives = {available, unavailable})
```

The names above are descriptive design notation, not authorized runtime labels.

## Research disposition

| Question | Finding |
|---|---|
| Are affirmative and negative transparent profiles recurrent? | Yes: 31 affirmative and 32 negative compositional rows in the exhaustive packet. |
| Is `有冇得 + predicate` attested? | Yes: five rows across independent files, including matrix, quoted, embedded, and location-bearing uses. |
| Is the polar profile best treated as ordinary V-唔-V? | No. It uses suppletive `有／冇` and must not inherit AA01 evidence automatically. |
| Does current evidence require a standalone `有冇得` construction identity? | No. Composition over the availability family is sufficient at the current evidence level. |
| Are affirmative and negative profiles perfectly symmetric? | Their transparent cores are parallel, but negative `冇得` shows substantially more lexicalized and discourse uses in this corpus. |
| Is arbitrary predicate omission supported? | No. Only one clear topic-supported affirmative ellipsis and one immediate negative reformulation were found. |
| Can all `冇得 X` strings feed the productive rule? | No. Fused and semi-lexical expressions require quarantine or lexical classification. |
| Is parser implementation authorized? | No. |
| Is another linguistic research child required now? | No. The next dependency is accepted identity/implementation specification plus panel and held-out validation, not another mechanically generated research issue. |

## Recursive stop condition

The recursion stops here because the remaining work is no longer an unasked linguistic
question exposed by the corpus.

The evidence now supports a falsifiable family account and explicit negative boundaries.
The next step, if these findings are accepted, is a separately scoped identity and parser
specification that decides how to represent the family without changing the protected state
silently. Panel contrasts and held-out cases should be designed against that accepted
specification.

Do not create another research issue merely to repeat:

- positive versus negative availability;
- the existence of `有冇得`;
- the lexicalization of `冇得頂` or discourse `冇得講`;
- the current runtime absence.

Further research is justified only if a primary source, panel result, implementation
collision, or held-out failure exposes a new contradiction.

## Protected state

Unchanged:

- permanent UUID registry;
- construction identity and status;
- runtime behavior and executable fixtures;
- corpus source files;
- survey, panel, and held-out evidence;
- release and deployment state;
- merge authorization.
