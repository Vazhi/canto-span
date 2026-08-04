# ISSUE-391 V得過 potential-standard terminal disposition R3

Parent issue: #391  
Work claim: #563  
Prior packets: R1 and R2  
Date: 2026-08-04

## Decision

Close #391 with a lexical-family terminal outcome, not a productive-construction outcome.

The evidence supports a Cantonese lexical reliability family centered on `信`:

- `信得過` — trustworthy / reliable / can be trusted;
- `信唔過` — not trustworthy / cannot be trusted;
- `信唔信得過 + NP` — A-not-A question over the same lexical-predicate family;
- split object/predicate order such as `信 NP 唔過` is also attested in public examples.

The evidence does **not** support promoting an open productive `V得過` reliability-standard construction for arbitrary verbs.

## Evidence reviewed

### Project trigger

The parent issue records three Glossika Dialog 015 examples:

- `你話我信唔信得過佢哋？`
- `你信唔信得過我呢個朋友先？`
- `朋友就係要信得過㗎啦！`

Those examples establish that the project needs to account for the `信` family, but they do not by themselves prove an open productive `V得過` pattern.

### Lexical dictionaries

Dictionary evidence independently supports `信得過` as a lexical trustworthiness item and `信唔過` as its negative counterpart. This is enough to reject treating the forms as merely parser artifacts.

The dictionary evidence is not enough to infer productive open-class `V得過`; dictionary entries list the item, not a constructional schema.

### Public attestation inventory

A bounded public web inventory found recurring examples of:

- `信得過` as a predicate or prenominal modifier;
- `信唔過` as the negative counterpart;
- `信唔信得過` as an A-not-A question, including forum/news/blog-style examples;
- `信 NP 唔過`-type split negative order in dictionary-derived examples.

The same inventory did not produce comparable Cantonese evidence for an open reliability-standard family across arbitrary verbs. Possible neighboring forms such as `靠得過` are sparse and confounded by Mandarin or general Chinese usage; Cantonese evidence more readily points to separate lexical expressions such as `靠得住` rather than a productive `V得過` class.

## Analysis

`信得過` should be treated as a lexicalized or tightly lexical-family predicate, not as an open construction identity.

Reasons:

1. The positive, negative, and A-not-A forms cluster around the verb `信`.
2. The negative patterns are attested, but they do not generalize the whole frame to other verbs.
3. `得` potential/background research remains relevant, but it does not prove that this particular `過` is an open result complement in a productive reliability-standard construction.
4. The public examples support ordinary lexical-predicate use, including modification and predication, rather than a broad constructional family.
5. Runtime output is useful only as a gap detector and supplies zero linguistic-evidence weight.

## Terminal disposition

- `信得過`: source-supported lexical reliability predicate/adjective.
- `信唔過`: source-supported negative lexical counterpart.
- `信唔信得過 + NP`: source-supported lexical-predicate A-not-A question profile.
- `信 NP 唔過`: attested split-object negative profile requiring care in any later parser alignment.
- Productive `V得過`: not supported.
- New UUID: no.
- Construction-status promotion: no.
- Runtime change from this issue: no.
- Parser matcher change from this issue: no.

## Later implementation route, if desired

A later implementation-only issue may be opened to align runtime/lexicon behavior for the `信` family. That issue should not claim a productive `V得過` construction.

Minimum scope for a later implementation packet:

- verify existing lexicon entries for `信得過` and `信唔過`;
- decide whether `信唔信得過 + NP` is parsed by lexical-predicate A-not-A composition or a special lexical pattern;
- add negative controls blocking arbitrary `V得過` promotion;
- preserve the distinction from experiential `過`, comparative `過`, and ordinary result-potential complements.

## Closure rationale

#391 asked whether `V得過` in reliability and acceptability predicates is productive, lexical, compositional, or a restricted family. The reviewed evidence supports the lexical-family branch and rejects broader productivity. The remaining useful work is implementation alignment for known lexical items, not further identity research under #391.

## Protected-state disposition

This packet changes no runtime behavior, parser matcher, construction identity, linguistic status, source record, survey state, release state, or deployment state.

## Source pointers

- Wiktionary: `信得過`, Cantonese `seon3 dak1 gwo3`, trustable / trustworthy / reliable senses.
- CC-Canto / Jyut Dictionary: `信得過` and related Cantonese dictionary search evidence.
- CantoDict: `信唔過`, unreliable / cannot be trusted.
- Words.hk / Jyut Dictionary examples containing `信唔過`, `信唔信得過`, and split negative forms.
- Public web/news/forum examples containing `信得過`, `信唔過`, and `信唔信得過`.
