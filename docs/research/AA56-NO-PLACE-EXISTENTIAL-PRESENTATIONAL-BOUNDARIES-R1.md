---
title: AA56 no-place existential-presentational boundaries R1
status: findings_complete
research_id: AA56-NOPLACE-R1
intake_issue: 347
work_claim: 351
draft_pr: 352
reviewed_on: 2026-07-30
source_ledger: docs/research/AA56-NO-PLACE-PRIMARY-SOURCE-LEDGER-R1.tsv
candidate_inventory: external-evidence/aa56-no-place-hkcancor/hkcancor-aa56-no-place-candidate-inventory.json
review_packet: review-packets/corpus-review/AA56/bounded-review-packet-r1.tsv
decisions: review-packets/corpus-review/AA56/bounded-review-decisions-r1.tsv
selector: external-evidence/aa56-no-place-hkcancor/query-hkcancor-aa56-no-place.py
packet_selector: review-packets/corpus-review/AA56/select-bounded-review-packet-r1.py
decision_writer: review-packets/corpus-review/AA56/write-bounded-review-decisions-r1.py
verifier: review-packets/corpus-review/AA56/verify-bounded-review-decisions-r1.py
implementation_authorized: false
identity_change_authorized: false
status_change_authorized: false
---

# AA56 no-place existential-presentational boundaries R1

## Executive finding

AA56 corresponds to a real source-backed Cantonese profile, but the current identity and
runtime boundary are not accurate enough.

The strongest supported positive profile is:

```text
(discourse setting / condition / location outside the core)
    + 有
    + overt indefinite NP
    + an overt predicate linked to that NP
```

In a minimal form:

```text
有 + indefinite NP + NP-linked predicate
```

Examples include:

```text
有個男仔孭我走喇。
有人幫我整嗰啲嘢。
有個人拖住隻曲架狗周街走。
有三個人報串。
有人幫你倒垃圾。
有兩個話係警察嘅人走埋來。
有八隻眼望住。
有架車泊咗喺度。
有一批人揾唔到工。
有兩個你嘅手下係平過你。
```

The predicate can be verbal, adjectival, copular, modal, evaluative, embedded, or locative.
A visible `喺／喺度` predicate is therefore one possible subtype, not the defining coda of
the construction.

The evidence does **not** support treating ordinary:

```text
冇人 + predicate
```

as the negative member of the same participant-introducing construction. In the reviewed
corpus, forms such as `從來冇人講過`, `冇人同你講嘢`, `冇人知`, and `冇人負擔得起`
behave as negative human quantification or negative existential-subject clauses: the clause
states that no person satisfies the predicate. This is related to existential negation but is
not distributionally or information-structurally parallel to positive participant
introduction.

The current runtime is consequently misaligned in two directions:

1. it is **too narrow under positive polarity**, because it requires an NP followed by a
   visible `喺／喺度` locative coda;
2. it is **too broad across polarity**, because it places positive `有` and negative `冇`
   under one homogeneous AA56 node without direct source support.

No UUID, construction identity, status, parser behavior, fixture, survey, panel, held-out,
release, or deployment state changes in this findings unit.

## Source-backed center

### Yip and Matthews 2000

Unit 6 explicitly gives a general positive presentational/existential pattern in which `有`
introduces an indefinite NP followed by a predicate:

```text
有(一)個人搵你。
有幾個學生好嬲。
有好多客人嚟咗。
```

The examples establish several boundaries at once:

- no overt possessor subject precedes `有`;
- the introduced NP is indefinite;
- the following predicate is not restricted to location;
- verbal and adjectival predicates are both possible;
- singular, plural, classifier, and quantified NPs occur.

The same unit independently gives overt-place existentials such as `香港有好多的士` and
`呢度冇洗手間`. Those clauses begin with a visible place/domain and therefore belong to
the AA77 locative-existential profile rather than a no-place AA56 core.

The reference does not claim that every nominal, predicate, polarity, or discourse pattern is
freely productive. It also does not present `冇人 + predicate` as a simple negative version
of the positive presentational examples.

### Lam, Lau, and Lee 2024

Section 4.5.2 of the segmentation paper distinguishes overt-subject possession from
subjectless existential introduction. It analyzes:

```text
有個男仔孭我走喇。
```

with `有` as an existential marker, `個男仔` as the introduced noun phrase, and that noun
phrase as subject of the following predication.

This directly supports preserving three visible pieces:

```text
有 | 個男仔 | 孭我走
```

It argues against:

- treating the whole clause as ordinary possession;
- requiring a hidden possessor;
- reducing the relation to token adjacency alone;
- swallowing the following predicate into an unanalyzed nominal;
- requiring the predicate to be locative.

The paper is primarily a word-segmentation study and supplies one direct constructional
example. It corroborates the profile but does not establish all productivity, information
structure, polarity, or parser implementation decisions.

## Reproducible corpus endpoint

The full query inventories every exact HKCanCor token `有` or `冇` whose first following
lexical token has a broad nominal-start POS cue. It includes both utterance-initial and
noninitial positions and does not require a later predicate.

The query performs no analysis of:

- subject or topic status;
- possession;
- existential or presentational membership;
- overt or implicit location;
- negative quantification;
- lexical compounds;
- repair;
- semantic selection;
- productivity.

This high-recall endpoint deliberately retains the principal collisions rather than encoding
the expected answer in the query.

### Full mechanical inventory

| Measure | Count |
|---|---:|
| Candidate tokens | 1,372 |
| Candidate utterances | 1,234 |
| Frozen source files represented | 58 of 58 |
| `有` tokens | 1,003 |
| `冇` tokens | 369 |
| Utterance-initial lexical | 199 |
| Noninitial | 1,173 |
| With a mechanically later predicate cue | 890 |
| Without one | 482 |

These counts are mechanical distribution counts. They are not estimates of construction
frequency, naturalness, or productivity.

## Deterministic bounded review

Reviewing all 1,372 high-recall rows would spend most of the expert effort repeatedly
classifying ordinary possession and unrelated nominal complements. The complete inventory
is retained as provenance, while a deterministic 179-row packet captures every high-value
core row and fixed controls.

The packet contains:

| Selection stratum | Rows retained |
|---|---:|
| Every `有人／冇人 + later predicate` row | 54 |
| Every utterance-initial source-shaped indefinite-NP-plus-predicate row | 63 |
| Inherited AA77 sibling anchors | 6 |
| Explicit-subject or possessor controls | 12 |
| Overt-place/domain controls | 12 |
| Post-NP locative-coda controls | 12 |
| Predicate-less initial controls | 12 |
| Wh/embedded-complement controls | 12 |
| Repair controls | 10 |

Rows can belong to more than one stratum. After stable-ID deduplication, the packet contains
179 rows across 49 frozen files: 132 positive `有` rows and 47 negative `冇` rows.

Controls are selected by a deterministic file-diverse round-robin procedure rather than an
analyst convenience sample. Packet regeneration is byte-stable.

## Complete expert decisions

Every packet row was reviewed with the complete utterance and adjacent turns.

| Expert class | Count |
|---|---:|
| Positive source-compatible NP predication | 44 |
| Layered overt-place plus positive NP predication | 2 |
| Extended positive topic/possessor chain | 1 |
| Partitive/indefinite-subject `有啲(人)`, not independent marker evidence | 16 |
| Bare existential or inventory/listing | 18 |
| Existential interrogative or embedded complement | 4 |
| AA55 possession or overt-subject `have` | 14 |
| AA77 overt-place existential | 14 |
| Negative-human quantificational clause | 20 |
| Negative existential/availability complement | 3 |
| Event negation or minimizer | 3 |
| Negative property or discourse absence | 5 |
| Lexicalized or fixed expression | 7 |
| Temporal or conditional `有` structure | 5 |
| Wh degree or quantity | 3 |
| Repair or unusable | 10 |
| Ambiguous boundary | 8 |
| Lexical-compound false positive | 1 |
| Rhetorical-polarity `邊有人` | 1 |
| **Total** | **179** |

Confidence distribution:

| Confidence | Count |
|---|---:|
| High | 166 |
| Medium | 11 |
| Low | 2 |

## Positive AA56 evidence

### Narrow core

Forty-four rows instantiate the narrow source-compatible profile:

```text
有 + overt indefinite NP + predicate linked to that NP
```

They cover:

- human and nonhuman NPs;
- classifier NPs and bare `人`;
- simple and relative-modified NPs;
- verbal predicates;
- adjectival predicates;
- copular predicates;
- modal predicates;
- locative and result-locative predicates;
- matrix and embedded environments;
- conditional and discourse settings outside the local core.

Representative rows include:

```text
有人叫 New Zealand 即係紐……
有人幫我整嗰啲嘢。
有個男仔孭我走喇。
有個人拖住隻曲架狗周街走。
重有人傾電話先？
有個肥仔又係我哋班。
有人讀四科。
有人一心攞 A。
有人有喇嗎？
有架車泊咗喺度。
有架 van 仔去 Hong Kong U 嘅。
有兩個話係警察嘅人走埋來。
有八隻眼望住。
有三個人報串。
有人幫你倒垃圾。
有人幫你換床鋪。
有人幫你拖地。
如果有人行行下街……
有班人出來劈友。
有人捉到你。
有三個 programme 儲咗喺裏邊。
有人幕後操縱。
有好多人買。
有一批人揾唔到工。
有個 CP 即刻殘咗。
有人更唔勁過你。
有人喺度跳艷舞。
有人提出。
有人分擔埋。
有個大單真係冇得頂。
幾難有人認第一。
有一單官司真係叫審死官。
有一班好開心嘅人一齊做嘢。
有好多人會覺得……
有兩個你嘅手下係平過你。
```

### Locative predicates are a subtype

The packet contains clear positive examples where a locally introduced NP receives a
locative or result-locative predicate:

```text
有個 tearing 喺你個 ligament 上邊。
有啲機擺咗喺度。
係有個分別喺度。
有架車泊咗喺度。
有三個 programme 儲咗喺裏邊。
```

These examples show that the current runtime's local intuition is not wholly spurious: a
post-NP locative predicate can occur. The error is treating that subtype as the defining and
required form of AA56.

The correct relation is:

```text
AA56 general positive NP predication
    └── possible locative-predicate subtype
```

not:

```text
AA56 = only 有／冇 + NP + 喺 coda
```

### Overt-place layering

Two rows contain both an overt place/domain and a locally complete positive participant
introduction:

```text
嗰邊都有人未放完暑假。
香港都有人話成日見到。
```

The narrow representation should preserve composition:

```text
AA77 overt place/domain
    + AA56 positive participant introduction and predication
```

The place must not be deleted, hidden, or absorbed into the participant-introduction marker.

### Extended discourse introduction

One row introduces a participant but then predicates directly of a possessed body part:

```text
有個 BB 啊，隻腳俾蚊咬咗好大粒啊。
```

This supports broader discourse presentation, but not automatic widening of the narrow
NP-linked predicate profile. It remains an extended discourse candidate pending independent
analysis.

## Positive surface collisions

### `有啲(人)` is not automatically existential-marker evidence

Sixteen reviewed rows show partitive or indefinite-subject `有啲`:

```text
有啲叫做新西蘭。
有啲真係起碼半價。
有啲好啲嘅可能會有一句。
有啲 B 都夠。
有啲人貪佢夠大條。
有啲人捐血越捐越健康。
有啲人可能覺得……
有啲都未必夠十五歲。
有啲人真係純粹為錢。
有啲人真係可能……
有啲門市都係受到影響。
有啲即係精品來𡃉。
```

In these rows, `有啲` means roughly “some” or “some of them” and forms the subject nominal
itself. Corpus tokenization as `有` + `啲` cannot decide whether `有` is an independent
existential marker.

A parser must distinguish:

```text
existential marker 有 + separate indefinite NP
```

from:

```text
indefinite determiner/pronoun 有啲(人) + predicate
```

No token-only rule can make that decision safely.

### Bare existence and inventory

Eighteen rows assert, question, list, or deny nominal existence without a locally linked
following predicate:

```text
有啲乜嘢？
有啲噉嘅嘢咩？
有蚊啊。
有幾間唔同嘅公司。
有 Account。
有郭富城呀？
有啲魚……
有啲水草，有啲石。
有隻好 common 嘅雪茄形。
有一個呢就係因為……
有個大單啊。
有個好大嘅建築物。
```

Some mechanical predicate cues are internal modifiers or belong to later clauses. These
rows belong to bare existential, inventory, listing, ellipsis, or interrogative profiles—not
the narrow AA56 NP-predication core.

### Temporal, conditional, and measure forms

The packet separately excludes:

```text
每年都有一次書展。
有事我會盡快覆你。
有一段時間飲黑啡。
有一日我上上下堂……
有一次我睇報紙……
有幾肥啊？
有幾多位啊？
```

The nominal is a time, occasion, condition, duration, degree, or quantity expression rather
than an introduced participant that receives the later predicate.

### Possession and overt subjects

Fourteen controls instantiate AA55-like possession or subject-oriented `have`:

```text
佢又有好多預早訂晒。
我都有問題。
我哋有啲乜嘢做呢？
你件褸有狗毛？
佢係有個 rules。
我心目中冇一個特定 style。
其他啲學校都重係有消息。
我都冇乜目標。
佢有一啲字……
我有五個人。
你間學校係有啲辦法嘅。
我有朋友喺美國畢業。
你重有朋友或者親人喺身邊……
```

An overt possessor, institution, experiencer, or affected subject precedes `有／冇`. These
rows directly contrast with the subjectless AA56 source profile.

### Overt-place existence

Fourteen controls instantiate AA77:

```text
裏邊冇乜嘢食。
裏面有啲乜嘢酒店。
佢嗰度有乜嘢平嘅。
旺角嗰度有年份嗰啲。
你去日本重有乜嘢？
周圍冇嗰啲橫額喺度。
最尾嗰度有個 index。
嗰度又冇電話。
喺香港就有七十幾人。
香港有廠，大陸又有廠。
馬會嗰度冇位。
屋企有缸魚。
邊度有醫院。
```

The overt place/domain remains part of the analysis. It is not a hidden or optional detail of
AA56.

### Lexical and fixed expressions

The packet also excludes conventional or lexical forms including:

```text
有可能
有機會 + VP
冇理由
冇乜所謂
冇嘢講
帶有狗嘅味
```

Shared characters do not establish one productive existential-presentational construction.

## Negative `冇人 + predicate`

### Corpus result

The bounded packet retains every mechanically retrieved human-predicate row:

- 31 positive `有人 + predicate` rows;
- 23 negative `冇人 + predicate` rows.

After repairs and rhetorical polarity are separated, 20 clear negative-human clauses remain:

```text
冇人需求。
冇人提過。
從來冇人講過。
全部冇人講過。
冇人嗌。
冇人揀。
冇人知。
冇人同你講嘢。
冇人整。
冇人要。
冇人得閒同佢慶祝。
冇人行。
冇人租。
冇人負擔得起。
冇人信。
冇人做過一啲乜嘢節目。
```

Their compositional interpretation is:

```text
no person satisfies the following predicate
```

rather than:

```text
a participant is introduced and then negatively located/predicated
```

This yields a genuine polarity asymmetry:

```text
positive AA56:
    有 + indefinite NP + predicate
    introduces an indefinite referent for predication

negative human clause:
    冇人 + predicate
    quantifies negatively over possible human subjects
```

The shared existential history and the superficial `有／冇` contrast do not erase this
information-structural and semantic difference.

### Rhetorical positive spelling

`邊有人掛住你吖？` contains positive-looking `有人` but rhetorical `邊` conveys that
nobody satisfies the predicate. It requires a rhetorical negative-polarity profile, not
positive participant introduction.

### Negative availability complements

Rows such as:

```text
冇嘢做。
裏邊冇乜嘢食。
冇嘢做咪養下魚。
```

deny available things, work, food, or similar nominal material and may include an activity
complement. They are related to negative existence and availability but do not provide a
simple negative AA56 participant-introduction profile.

### Repairs

Three of the 23 negative human rows are repairs or repeated starts, such as:

```text
冇-冇人-冇阿餅咁有錢……
冇人-冇人得閒……
你哋冇-咪冇人去囖。
```

They remain in provenance but do not establish productive spans.

## Runtime reconciliation

### Current detector

The current AA56 detector requires:

```text
有／冇 + NP + visible 喺／喺度 locative coda
```

and emits one `ExistentialPresentationalClause` node for both polarities. The learner gloss
states that the clause introduces a participant and then states where that participant is.

The accepted fixtures likewise test only locative-coda forms such as:

```text
有個人喺門口。
有幾個人喺度。
冇人喺度。
```

### Exact mismatch

| Dimension | Source/corpus profile | Current runtime |
|---|---|---|
| Polarity | Positive `有` directly supported | Positive `有` and negative `冇` merged |
| Predicate | General NP-linked predicate | Locative `喺／喺度` required |
| Verbal predicate | Directly attested | Missed |
| Adjectival predicate | Directly attested | Missed |
| Copular predicate | Corpus-attested | Missed |
| Modal predicate | Corpus-attested | Missed |
| Locative predicate | Attested subtype | Recognized as defining form |
| Overt place before marker | Separate AA77 layer | May collide with generic spatial logic |
| Overt possessor subject | Separate AA55 | Must remain excluded |
| `冇人 + predicate` | Separate negative quantification | Treated as same AA56 polarity family when locative coda appears |

The detector therefore should not be promoted or used as evidence for the current language
identity.

## Identity disposition

### Recommended language-construction center

Retain AA56 as a language-construction identity, but narrow and relabel it around the overt
source profile.

Recommended neutral canonical name:

```text
JauMarkedIndefiniteNPPredication
```

Recommended family/profile metadata:

```text
family_name:
    ExistentialAndPresentationalClauses

profile_name:
    SubjectlessJauIndefiniteNPPredicate

profile_description:
    Subjectless positive 有 introduces an overt indefinite NP followed by an overt
    predicate linked to that NP. External place, condition, discourse-setting, and
    embedding material remain independently represented. Locative predicates are one
    subtype, not a requirement. Overt-subject possession, overt-place existence,
    partitive 有啲, bare inventory, temporal 有, and negative 冇人 clauses are excluded.
```

A less technical learner label could be:

```text
introducing someone or something, then saying what they do or are like
```

The existing name `ExistentialPresentationalClause` is not wholly wrong, but it is too broad
to expose polarity, marker, and predicate boundaries. Retaining it as a legacy label is
reasonable.

### Claim and status

The profile is source-linked and corpus-supported, but this findings unit does not recommend
immediate `supported_productive` status. Remaining gates include:

- accepted identity migration;
- a separately reviewed parser specification;
- controlled positive/negative and AA55/AA77 contrasts;
- panel evidence for selected boundary cases;
- held-out validation;
- negative fixtures preventing partitive `有啲`, temporal `有一日`, possession, overt-place
  existence, and `冇人 + predicate` leakage.

`research_pending` remains appropriate until those gates are completed.

## AA55 / AA56 / AA77 separation

The evidence supports three non-overlapping centers:

```text
AA55 possession / subject-have
    overt subject or possessor + 有／冇 + associated NP

AA56 positive participant introduction
    有 + overt indefinite NP + predicate linked to that NP

AA77 overt-place existence
    overt place/domain + 有／冇 + NP
```

Layering is permitted when every overt component is preserved:

```text
香港都 [有人話成日見到]
AA77     AA56
```

No hidden possessor, place, expletive, subject, predicate, or polarity marker is required.

## Parser specification implications

A future implementation issue should require at minimum:

1. positive marker `有` only for the initial accepted AA56 implementation;
2. an overt indefinite NP after the marker;
3. an overt predicate demonstrably linked to that NP;
4. support for verbal, adjectival, copular, modal, and locative predicate tests only when
   independently bounded;
5. exclusion of overt-subject AA55 possession;
6. composition rather than conflation with overt-place AA77;
7. exclusion or separate typing of `有啲(人)` partitive subjects;
8. exclusion of bare existence/listing without an NP-linked predicate;
9. exclusion of temporal/conditional `有一日`, `有一次`, `有一段時間`, and `有事`;
10. exclusion of lexical `有可能`, `有機會`, `帶有`, and fixed negative expressions;
11. no automatic negative `冇` branch;
12. repair-aware behavior that does not normalize false starts silently;
13. explicit span tests for external conditions, locations, embedding predicates, and final
    particles;
14. held-out tests not used to design the implementation.

No parser edit is authorized by this report.

## Recursive disposition

This packet resolves the linguistic question that triggered issue #347:

- a positive source-backed AA56 center exists;
- the current locative-only runtime is not the source-equivalent profile;
- negative `冇人 + predicate` must not be inherited automatically;
- AA55 and AA77 boundaries are independently recoverable;
- tokenization creates substantial partitive and lexical false positives.

No additional corpus-generation child is justified for AA56 before identity/parser
specification. The next dependency is not another broad search over `有／冇`; it is an
accepted identity migration and implementation design with controlled panel and held-out
gates.

The negative-human family may warrant its own identity review if the parser needs to
represent it explicitly, but this report already establishes the boundary required to keep it
out of AA56. Opening that review should depend on live parser/ontology need rather than
continuing the present topic mechanically.

## Protected state

Unchanged:

- permanent UUID registry;
- construction identity registry;
- linguistic status;
- parser behavior;
- executable fixtures;
- frozen corpus source files and manifest;
- survey state;
- panel evidence;
- held-out evidence;
- release state;
- deployment state;
- merge authorization.

## Exit statement

AA56 research may leave broad discovery and enter identity/parser specification after this
findings package is accepted. Any implementation or registry change requires its own scoped
claim, exact tests, review, and explicit merge approval.
