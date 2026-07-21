# WECHAT-GX-TRAVEL-002 adjudication and work queues

> This is a development-corpus adjudication, not grammar acceptance. The conversation supplies native surface attestation and natural-speech test material. It contributes zero productive-promotion weight by itself.

## Result

- Units adjudicated: **52 / 52**
- Runtime observed: **v0.5.181**
- Parser errors: **0**
- Grammar acceptance changes: **0**
- Runtime changes: **0**

### Queue membership

| Queue | Units | Purpose |
|---|---:|---|
| Accepted-behavior regression/remediation | 16 | Durable invariants, boundary fixtures, or already-established behavior gaps |
| Lexicon and Jyutping enrichment | 32 | Ordinary words, multiword expressions, place names, and corpus-local names |
| Context/disfluency research | 40 | Ellipsis, repetition, repairs, resumptive material, abandoned turns, deictic viewpoint |
| Grammar research requiring external evidence | 46 | Corpus-generated research questions that cannot be promoted from this conversation |

Queue memberships overlap. Each unit also has one primary queue.

### Primary disposition

| Primary queue | Units |
|---|---:|
| accepted_behavior_regression | 6 |
| context_disfluency_research | 9 |
| grammar_research_external_evidence | 30 |
| lexicon_jyutping_enrichment | 7 |

### Current parser observation

| Metric | Count |
|---|---:|
| Root coverage: PARTIAL | 29 |
| Root coverage: PASS | 13 |
| Root coverage: NO_TOP_CONSTRUCTION | 10 |
| Semantic status: BLOCKED | 45 |
| Semantic status: MANUAL_REVIEW_ELIGIBLE | 6 |
| Semantic status: REVIEW_REQUIRED | 1 |

A parser `PASS` or complete span is not treated as linguistic validation. Several complete-span parses are analytically suspicious and remain research targets.

## Highest-value research clusters

1. **Object-topic negation:** U020, U021, U025. Contrast `酒冇飲`, `水冇飲一啖`, and `酒就唔飲啫` against canonical subject–verb–object orders.
2. **Hindsight/counterfactual:** U022 `早知你坐佢架車咪仲好`. Establish the dependency and boundaries of `早知…咪…`.
3. **Negative attainment versus opportunity:** U045 `我冇去到` and U048 `我冇得去`, with contrasts against `我冇去` and `我去唔到`.
4. **Duration and perfective boundaries:** U028 `開咗五個鐘頭車左右` and U030 `再開再開三四個鐘頭`; explicitly keep them outside the accepted simple V咗O subtype until duration structure is independently established.
5. **Objectless completion and temporal sequencing:** U033 `食完，聽日就正式旅遊啦`; useful natural evidence for contextual `食完`, never evidence for disputed V完咗O.
6. **Motion, purpose, and deictic viewpoint:** U001–U002, U008–U009, U011–U012, U027, U031–U034, U037.
7. **Conversation structure:** resumed NPs, head ellipsis, repetitions, corrections, and abandoned fragments across U003, U005–U007, U010, U014–U015, U029–U031, U047, U050, and U052.

## Regression-ready or remediation units

| Unit | Surface | Disposition | Expected invariant |
|---|---|---|---|
| U010 | `係啊係啊。` | ready_now | Preserve both repeated agreement tokens and particles in one discourse unit; no deduplication. |
| U012 | `琴日上嚟㗎喇。` | ready_now | Preserve 琴日, 上嚟, and 㗎喇 with full surface coverage; time interpretation remains contextual. |
| U016 | `你飲咗酒，千祈唔好開車啊。` | after_lexicon_and_research | Preserve two linked clauses; 飲咗酒 supplies the condition and 千祈唔好 scopes over 開車. No causal/temporal relation should be invented. |
| U017 | `我話畀你聽吓。` | ready_now_review_bearing | Preserve the complete overt sequence as reported/transfer speech and retain semantic review rather than inventing reported content. |
| U018 | `唔係啊。` | remediation_candidate | Recognize a negative copular response with particle; do not leave 唔係 unwrapped or require a hidden complement. |
| U023 | `唔使自己開咁辛苦。` | remediation_candidate | Wrap 唔使自己開咁辛苦 as one negative-necessity predicate while preserving 咁辛苦 as manner/degree material. |
| U028 | `大概開咗五個鐘頭車左右啦。` | not_ready | Analyze 開咗 as the activity predicate and 五個鐘頭 as duration; 車 must not be mistaken for an ordinary affected object. 左右 scopes over duration. |
| U033 | `食完，聽日就正式旅遊啦。` | not_ready | Keep 食完 as objectless/context-dependent completion and link it temporally to the following clause; never treat it as V完咗O evidence. |
| U038 | `陽朔好靚㗎。` | after_lexicon | Treat 陽朔 as a place NP subject and 好靚 as its stative predicate; retain 㗎. |
| U042 | `一樣㗎咋。` | remediation_candidate | Treat 一樣 as a stative/identity response, not numeral + classifier; preserve 㗎咋 scope. |
| U043 | `啲風景差唔多。` | after_lexicon_and_research | Tokenize 風景 and 差唔多 as whole lexical units, then preserve NP + stative predicate structure. |
| U045 | `我冇去到啊。` | not_ready | Distinguish 冇去到 as failed/nonattained going from simple 冇去; 到 belongs to the result/attainment profile. |
| U046 | `我同阿妹喺屋企啊。` | after_lexicon_and_research | Treat 我同阿妹 as the coordinated subject of the locative predicate; do not read 同 as a coverb relation. |
| U047 | `因為我要上班啊。` | ready_now_review_bearing | Remain a causally marked subordinate/context-dependent clause when isolated; 因為 must not license a hidden main clause. |
| U048 | `我冇得去啊。` | not_ready | Distinguish 冇得去 as unavailable opportunity/permission from 冇去到 and simple negated motion; do not parse 得 as generic acceptability. |
| U052 | `吳蘇陽佢話唔慣啊。` | after_lexicon_and_research | Preserve 吳蘇陽佢 as resumed material and keep 唔慣 content semantically incomplete; do not invent what the person is not used to. |

## Lexicon and name policy

- Ordinary words and multiword expressions may enter a lexicon-enrichment queue after dictionary/Jyutping verification.
- Place names may be added as proper-place entries.
- Personal names and nicknames remain **corpus-local named entities** and must not become productive lexical grammar.
- Adding a missing token must not automatically validate the construction surrounding it.

### Candidate index

| Candidate | Units |
|---|---|
| `一啖` | U021 |
| `一樣` | U042 |
| `上班` | U047 |
| `做嘢` | U044 |
| `兜` | U035, U039, U040 |
| `公里` | U037 |
| `加加埋埋` | U029 |
| `千祈` | U016 |
| `吳蘇陽[proper_name]` | U049, U051, U052 |
| `周圍` | U039, U040 |
| `啱啱` | U011 |
| `單位` | U044 |
| `嘛` | U006 |
| `大伯` | U003 |
| `姨甥` | U044 |
| `尋晚黑` | U027 |
| `差唔多` | U043 |
| `廣州` | U037 |
| `廣西` | U003, U004, U009, U027 |
| `必要` | U041 |
| `慣` | U052 |
| `成班人` | U008 |
| `揸` | U039 |
| `搵房` | U032 |
| `摩托車` | U009 |
| `放暑假` | U050 |
| `方子[proper_name]` | U013, U014, U015 |
| `旅遊` | U003, U004 |
| `早知` | U022 |
| `景點` | U035, U040, U041 |
| `桂林` | U031, U034 |
| `正式旅遊` | U033 |
| `豬伯[proper_name]` | U009 |
| `跟` | U051 |
| `跟住` | U049 |
| `遊覽區` | U031 |
| `酒` | U016, U020, U025 |
| `阿妹` | U046 |
| `阿拉[proper_name]` | U014, U019 |
| `阿豬仔[proper_name]` | U004 |
| `附近` | U034 |
| `陽朔` | U034, U038 |
| `風景` | U043 |

## Machine-readable artifacts

- `WECHAT-GX-TRAVEL-002-ADJUDICATION-MATRIX.tsv`
- `WECHAT-GX-TRAVEL-002-ADJUDICATION-MATRIX.json`
- four queue-specific TSV files
- `WECHAT-GX-TRAVEL-002-PARSER-OBSERVATIONS-v0.5.181.json`
- `WECHAT-GX-TRAVEL-002-ADJUDICATION-AUDIT.json`
