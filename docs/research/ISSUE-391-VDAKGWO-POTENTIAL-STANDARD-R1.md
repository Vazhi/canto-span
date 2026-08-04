# ISSUE-391 V得過 potential-standard research disposition R1

Parent issue: #391  
Work claim: #526  
Assumption-review repair: 2026-08-04

## Decision

Do not create or promote a productive `V得過` construction from the current evidence.

The reviewed evidence supports `信得過` as a listed Cantonese reliability / trustworthiness expression and supports object-taking trust-predicate uses around `信 … 得/唔 … 過`. It does not yet support a productive reliability-standard schema for arbitrary verbs.

This is a narrowed research disposition, not a claim that the internal structure is fully settled.

## Assumption-level rereview

The initial R1 review was mechanically clean but under-reviewed as research. The repaired review checks the assumptions behind the conclusion.

### Assumption A — `信得過` is attested as a Cantonese item

Supported.

- CC-Canto lists `信得過〔--过〕` with Jyutping `seon3 dak1 gwo3` and glosses it as “trustworthy; reliable.”
- Wiktionary lists Cantonese `信得過`, Jyutping `seon3 dak1 gwo3`, and a literal analysis “worthy of being trusted.”
- General Chinese dictionaries also treat `信得過` as a lexical word meaning “can be trusted,” which is compatible with the Cantonese entry but is not by itself Cantonese-specific evidence.

### Assumption B — the negative profile is simply the lexical counterpart `信唔過`

Only partly supported; the claim must be narrowed.

CantoDict records `信唔過` as “unreliable, cannot be trusted,” so a lexical negative item is attested. However, 粵典 / CantoWords also gives a Cantonese example with the object before the negative potential material:

- `我點會信你唔過啊？`

This means the project must not flatten every negative or interrogative form into a single unanalyzed lexical token. The evidence supports a trust-predicate family around `信`, with at least:

- listed positive expression: `信得過`;
- listed negative expression: `信唔過`;
- split object order: `信 NP 唔過`;
- source-triggered A-not-A order: `信唔信得過 NP`.

### Assumption C — the evidence proves a productive `V得過` construction

Not supported.

The evidence reviewed here is concentrated around `信`. It shows that `信得過` and related negative/interrogative forms are real and semantically material, but it does not establish that arbitrary verbs enter a reliability-standard `V得過` schema.

A general Cantonese `得` potential system is relevant background, but it does not automatically prove that `過` contributes the same productive relation across an open class in this profile.

### Assumption D — runtime gaps can be used as evidence

No.

The current runtime’s reduction of the source examples to generic A-not-A or ModalVP output remains useful as a coverage-gap trigger only. It is not linguistic evidence and does not support promotion, UUID allocation, or construction broadening.

## Evidence reviewed

### Project trigger

The issue trigger is three Glossika Dialog 015 forms:

- `你話我信唔信得過佢哋？`
- `你信唔信得過我呢個朋友先？`
- `朋友就係要信得過㗎啦！`

The issue also notes repository HKCanCor attestations and current parser reduction to generic A-not-A / ModalVP output.

### External lexical evidence

- CC-Canto: `信得過〔--过〕 seon3 dak1 gwo3`, “trustworthy; reliable.”
- Wiktionary: `信得過`, Cantonese Jyutping `seon3 dak1 gwo3`, literal “worthy of being trusted.”
- CantoDict: `信唔過 seon3 m4 gwo3`, “unreliable, cannot be trusted.”
- 粵典 / CantoWords: `信` includes the trust sense and the example `我點會信你唔過啊？` with an overt object between `信` and `唔過`.
- Cantonese `得` potential-background sources remain relevant background only; this packet does not use them to infer a productive `V得過` reliability construction.

## Analysis

The safe analysis is not “`信得過` is just an opaque lexical item” and not “`V得過` is a productive construction.” The current evidence supports a narrower middle position:

1. `信得過` is a listed reliability predicate / adjective.
2. `信唔過` is listed, but negative object-taking examples show that the family can be syntactically split.
3. The source A-not-A examples are real profiles that should not be lost, but they can be handled as lexical-predicate A-not-A evidence unless broader data proves a general construction.
4. The evidence is not diverse enough to decide whether this is lexicalized, semi-productive around evaluative predicates, or a transparent potential-result analysis in all environments.
5. Therefore the issue reaches a terminal research disposition only against productive `V得過` promotion, not against all later lexical/parser work.

## Terminal disposition

- `信得過`: source-supported reliability predicate / adjective.
- `信唔過`: source-supported negative reliability expression.
- `信 NP 唔過`: source-supported split object order requiring preservation in any later analysis.
- `信唔信得過 + NP`: source-triggered A-not-A question profile requiring preservation in any later analysis.
- Productive arbitrary-verb `V得過`: not supported by this issue.
- New UUID: no.
- Runtime change: no.
- Status promotion: no.
- Lexicon/runtime route: allowed only through a later bounded implementation issue if current runtime/lexicon inspection shows a concrete gap.

## Ready future work opened or retained

No new implementation issue is opened by this research packet because the exact runtime/lexicon state for `信得過`, `信唔過`, `信 NP 唔過`, and `信唔信得過 NP` still needs inspection before a ready-to-start implementation scope can be stated.

A later ready issue may be opened if inspection confirms a bounded behavior-preserving lexical/parser-alignment task, with these expected constraints:

- preserve the listed positive and negative expressions;
- preserve split object order;
- preserve A-not-A question profile;
- add negative controls preventing arbitrary `V得過` promotion;
- avoid UUID allocation unless separate evidence supports a non-lexical identity.

## Protected-state disposition

This research packet changes no runtime behavior, parser matcher, construction identity, linguistic status, source record, survey state, release state, or deployment state.

## Source pointers

- Wiktionary: `https://en.wiktionary.org/wiki/信得過`
- CC-Canto search result for `信得過`: `https://cantonese.org/search.php?q=信`
- CantoDict negative counterpart: `https://www.cantonese.sheik.co.uk/dictionary/words/40552/`
- 粵典 / CantoWords `信`: `https://words.hk/zidin/信`
- Mezzadri, “A synchronic and diachronic analysis of potential dāk 得 in Cantonese”: `https://air.unimi.it/handle/2434/1242955`
