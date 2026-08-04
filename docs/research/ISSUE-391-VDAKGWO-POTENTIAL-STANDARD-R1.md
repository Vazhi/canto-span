# ISSUE-391 V得過 potential-standard research disposition R1

Parent issue: #391  
Work claim: #526  
Date: 2026-08-04

## Decision

Do not create or promote a productive `V得過` construction from the current evidence.

The reviewed evidence supports `信得過` as a lexicalized Cantonese reliability / trustworthiness predicate that can appear adjectivally or predicatively, including with an object in usage examples. It does not yet support a productive reliability-standard schema for arbitrary verbs.

## Evidence reviewed

### Project trigger

The issue trigger is three Glossika Dialog 015 forms:

- `你話我信唔信得過佢哋？`
- `你信唔信得過我呢個朋友先？`
- `朋友就係要信得過㗎啦！`

The issue also notes repository HKCanCor attestations and current parser reduction to generic A-not-A / ModalVP output.

### Dictionary and lexical evidence

Wiktionary records Cantonese `信得過` with Jyutping `seon3 dak1 gwo3`, literal meaning “worthy of being trusted,” and the adjective senses “trustable,” “trustworthy,” and “reliable.” It gives Cantonese examples where `信得過` modifies a noun and where it takes an object-like complement in a question.

CC-Canto records `信得過` as `seon3 dak1 gwo3` and glosses it as a trustworthiness item. CantoDict records the negative lexical counterpart `信唔過` (`seon3 m4 gwo3`) as “unreliable, cannot be trusted.” These support a lexical polarity family around `信`, not a productive `V得過` construction.

A recent paper on Cantonese `得` notes a broad modern Cantonese functional split, including long potential, short potential, and adverbial uses. This supports keeping `得`-based potential questions distinct from lexicalized predicates until item-level Cantonese evidence proves a broader schema.

## Analysis

`信得過` is not strong evidence for a general `V得過` reliability-standard construction by itself.

Reasons:

1. The strongest evidence identifies `信得過` as a listed lexical adjective/predicate.
2. The negative counterpart is also lexicalized as `信唔過`, not enough to infer the full productive negative or A-not-A paradigm for arbitrary `V得過` verbs.
3. General potential-complement evidence licenses caution, but it does not by itself prove that `過` in this item is the same productive result complement across an open verb class.
4. The project’s parser output is useful as a gap detector but has zero independent linguistic-evidence weight.
5. The available evidence does not decide whether other possible items are lexicalized, semi-productive, or transparent result-potential combinations.

## Terminal disposition

- `信得過`: lexical reliability predicate / adjective, source-supported.
- `信唔過`: lexical negative counterpart, source-supported.
- `信唔信得過 + object`: attested question profile, but currently best treated as a lexical-predicate A-not-A question until broader evidence is collected.
- Productive `V得過`: not supported by this issue.
- New UUID: no.
- Runtime change: no.
- Status promotion: no.
- Lexicon/runtime route: optional future work only if a bounded lexical-entry or parser-alignment package is opened separately.

## Future work opened or retained

No new issue is opened from this packet because the next useful work is not a new construction identity. A future executable package would need a narrow implementation brief such as:

- add or verify a lexical entry for `信得過` / `信唔過`;
- preserve `信唔信得過 + NP` as a lexical-predicate A-not-A profile;
- add negative controls preventing arbitrary `V得過` promotion.

That implementation should start only after confirming current lexicon and runtime behavior on the exact source rows.

## Protected-state disposition

This research packet changes no runtime behavior, parser matcher, construction identity, linguistic status, source record, survey state, release state, or deployment state.

## Source pointers

- Wiktionary: `https://en.wiktionary.org/wiki/信得過`
- CC-Canto search result for `信得過`: `https://cantonese.org/search.php?q=信`
- CantoDict negative counterpart: `https://www.cantonese.sheik.co.uk/dictionary/words/40552/`
- Mezzadri, “A synchronic and diachronic analysis of potential dāk 得 in Cantonese”: `https://air.unimi.it/handle/2434/1242955`
