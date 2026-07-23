---
title: UC-RQ-010 — Coreferential N–CL–N construction
research_id: UC-RQ-010
status: active_research_unit
baseline_version: 0.5.208
created: 2026-07-23
implementation_authorized: false
status_change_authorized: false
---

# UC-RQ-010 — Coreferential N–CL–N construction

## Research decision

A dedicated research unit is justified. Tse and Chin 2015 directly contrast two
interpretations of the same Cantonese `N1–classifier–N2` surface:

```text
你個學生
    -> possessive: your student

你個衰仔
    -> coreferential: you, the bad boy / you are the person denoted by 衰仔
```

Their corpus study treats the coreferential relation as distinct from possession
in lexical-semantic, syntactic, and pragmatic behavior. Coreferential tokens can
serve as clause arguments or as non-argument vocatives, so the construction cannot
merge wholesale into either current `PossessiveClassifierNP` or
`VocativeAddressTerm`.

This note does **not** authorize a new runtime label, reinterpretation of existing
possessives, productive parser acceptance, grammar status changes, or automatic
assignment of derogatory meaning.

## Safest checked core

The checked conference abstract and author-uploaded presentation support this
provisional profile:

- `N1` is a first-, second-, or third-person pronoun in the investigated set;
- the classifier inventory includes `個`, `隻`, `條`, `啲`, and `班`;
- coreferential `N2` is restricted to a human-referring noun or nominalized
  expression, apart from personification;
- `N1` and `N2` denote the same discourse referent rather than possessor and
  possessed;
- the coreferential NP is frequently an argument but can also be a vocative;
- negative or reproachful discourse is strongly associated with the construction,
  especially with derogatory `N2`, but the slides also show classifier- and
  lexical-item-dependent exceptions.

The study used the second edition of the Corpus of Mid-20th-Century Hong Kong
Cantonese: 43 films from 1943–1970, about 40.5 hours, 90,161 utterance units, and
284 speakers. The presentation reports 109 coreferential and 449 possessive tokens
in the initial classification.

These historical film data establish the construction but do not by themselves
settle its productivity, frequency, meanings, or acceptability in present-day
Cantonese.

## Checked source findings

The source-verification ledger is:

`UC-RQ-010-COREFERENTIAL-N-CL-N-SOURCE-VERIFICATION-R1.tsv`

### Tse and Chin 2015

The official Linguistic Society of Hong Kong workshop abstract verifies the
surface contrast, research question, investigated pronoun/classifier/noun frame,
and corpus-based comparison. The author-uploaded full presentation supplies the
corpus counts and the semantic, syntactic, and pragmatic diagnostics summarized
above.

This is a conference presentation rather than a full archival article. Exact
annotation instructions, token-level decisions, modern-speaker judgments, and
generalizations beyond the sampled corpus remain quarantined.

## Exact collision audit

The collision ledger is:

`UC-RQ-010-COREFERENTIAL-N-CL-N-COLLISION-AUDIT-R1.tsv`

### Current `PossessiveClassifierNP`

This is the exact surface sibling: it represents a possessor before a
classifier–noun phrase. In the coreferential construction, however, `N1` and `N2`
denote the same person. Surface shape therefore cannot safely select possession.

### Current `AssociativeNP`

Current `AssociativeNP` describes visible `嘅`-linked modification or possession.
It neither captures the bare classifier link nor distinguishes coreference from
possession, so its broader name does not supply a merge target.

### Current `VocativeAddressTerm`

Some coreferential N–CL–N tokens are vocatives, but Tse and Chin report that more
than 65% of the coreferential tokens serve as arguments. Vocative function is thus
one syntactic profile, not the construction as a whole. Current
`VocativeAddressTerm` also preserves selected lexicalized address forms rather
than this productive-looking classifier frame.

## Required boundaries

Future research must distinguish:

- coreferential from possessive readings of identical N–CL–N strings;
- argumental coreferential NPs from non-argument vocatives;
- human reference from personification and unacceptable nonhuman readings;
- singular classifiers `個`, `隻`, and `條` from plural/collective `啲` and `班`;
- first-, second-, and third-person `N1`, including plural pronouns;
- derogatory lexical meaning from negative meaning contributed by context;
- neutral, affectionate, ironic, reproachful, and hostile discourse uses;
- particles, interjections, repeated pronouns, pauses, and intonational boundaries;
- mid-20th-century film dialogue from present-day Hong Kong and other Yue data.

## Research tasks before any implementation proposal

1. Recover a token-level ledger for the 109 coreferential examples and matched
   possessive controls.
2. Separate semantic, syntactic, pragmatic, lexical, and prosodic diagnostics and
   measure their independent predictive value.
3. Test modern speakers on minimally matched possessive/coreferential pairs in
   argument and vocative positions.
4. Build pronoun-by-classifier-by-human-noun acceptance and interpretation tables.
5. Collect natural present-day audio examples with discourse context.
6. Determine whether vocative tokens compose with `VocativeAddressTerm` or require
   a nested function without collapsing argumental tokens.
7. Audit parser ambiguity only after interpretation boundaries are frozen.

## Provisional research outcome

| Question | Current answer |
|---|---|
| Is a coreferential N–CL–N use directly documented? | **Yes.** |
| Is its surface identical to a possessive classifier NP? | **Yes.** |
| Are `N1` and `N2` coreferential in the target reading? | **Yes.** |
| Is every token a vocative? | **No; argument uses are common.** |
| Is negative/reproachful meaning a strong corpus tendency? | **Yes, but not a categorical implementation rule.** |
| Is present-day productivity established? | **No; quarantined pending modern evidence.** |
| Is a dedicated research unit justified? | **Yes.** |
| Is parser implementation authorized? | **No.** |

## Exit conditions

UC-RQ-010 may leave active research only after one of these dispositions is justified:

- **typed coreferential construction:** form, interpretation, argument/vocative,
  discourse, and diachronic boundaries receive stable source-linked profiles;
- **compositional merge:** independently supported classifier, apposition,
  coreference, and vocative relations preserve every profile without loss;
- **quarantine:** interpretation, productivity, modernity, or prosodic boundaries
  remain inadequate;
- **retire:** a complete collision audit proves existing constructions sufficient.

Until then, current grammar statuses and parser behavior remain unchanged.
