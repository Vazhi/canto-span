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
- split object/predicate order such as `信 NP 唔過`, including `信你唔過`, is attested in lexical-example material and remains an implementation-alignment caution.

The evidence reviewed for this issue does **not** support promoting an open productive `V得過` reliability-standard construction for arbitrary verbs.

## Evidence reviewed

### Project trigger

The parent issue records three Glossika Dialog 015 examples:

- `你話我信唔信得過佢哋？`
- `你信唔信得過我呢個朋友先？`
- `朋友就係要信得過㗎啦！`

Those examples establish that the project needs to account for the `信` family, but they do not by themselves prove an open productive `V得過` pattern.

### Lexical dictionaries

Dictionary evidence independently supports `信得過` as a listed trustworthiness/reliability item and `信唔過` as a listed Cantonese negative counterpart. This is enough to reject treating the forms as merely parser artifacts.

The dictionary evidence is not enough to infer productive open-class `V得過`; dictionary entries list the item, not a constructional schema.

### Public attestation inventory

A bounded public web inventory found recurring examples of:

- `信得過` as a predicate or modifier;
- `信唔過` as the negative counterpart;
- `信唔信得過` as an A-not-A question in dictionary-example, forum, news, and blog-style material;
- `信 NP 唔過`-type split negative order, including `信你唔過`, in lexical-example material.

The same bounded inventory did not produce comparable Cantonese evidence for an open reliability-standard family across arbitrary verbs. Possible neighboring forms such as `靠得過` are sparse in the reviewed material and are confounded by Mandarin/general-Chinese usage; Cantonese evidence more readily points to separate lexical expressions such as `靠得住` rather than a productive `V得過` class.

This is a bounded negative/productivity check, not a claim that no speaker can ever coin or accept another `V得過` form.

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
- Productive `V得過`: not supported by this issue's evidence.
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

Lexical and example sources reviewed for this bounded packet:

- Wiktionary, `信得過`, Cantonese `seon3 dak1 gwo3`, glossed with trustable/trustworthy/reliable senses: https://en.wiktionary.org/wiki/%E4%BF%A1%E5%BE%97%E9%81%8E
- CC-Canto search for `信`, listing `信得過 seon3 dak1 gwo3`: https://cantonese.org/search.php?q=%E4%BF%A1
- CantoDict, `信唔過`, marked Cantonese and glossed as unreliable / cannot be trusted: https://www.cantonese.sheik.co.uk/dictionary/words/40552/
- Words.hk `聞所未聞` example containing `唔知信唔信得過`: https://words.hk/zidin/%E8%81%9E%E6%89%80%E6%9C%AA%E8%81%9E
- Cantowords `信` example containing `我點會信你唔過啊？`: https://cantowords.com/dictionary/%E4%BF%A1
- Jyut Dictionary `信` example containing `我點會信你唔過啊？`: https://jyutdictionary.com/dictionary/entry/%E4%BF%A1
- Public search examples for `信唔信得過` and `信得過`, including forum/news/blog-style attestations, used as attestation only and not as productivity proof.
