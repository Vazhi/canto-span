---
title: UC-RQ-014 — Separable verb-object compound construction
research_id: UC-RQ-014
status: active_research_unit
baseline_version: 0.5.208
created: 2026-07-23
implementation_authorized: false
status_change_authorized: false
---

# UC-RQ-014 — Separable verb-object compound construction

## Research decision

A dedicated research unit is justified. Chan and Cheung 2020 directly compare
Cantonese verb-object (VO) compounds with non-VO compounds and show that VO
separability is substantial but lexical-item- and separator-dependent. A separable
compound can retain a lexical or idiomatic meaning while aspect, measure, or
object-modifying material appears between its two parts, and highly separable items
may permit object movement.

Current `ProductiveVO` preserves a transparent verb plus object phrase but does not
record that two separated pieces realize one stored compound meaning. Current
`VerbComplementVP` concerns postverbal complementation, not a lexical compound whose
components are discontinuous. Ordinary VP and aspect nodes may describe material
inside a separated form, but cannot alone preserve its compound identity or restrict
separation item by item.

This note does **not** authorize lexical decomposition, new compound entries,
separator insertion, object movement, parser behavior, grammar status changes, or
productive acceptance.

## Safest checked core

Chan and Cheung's Cantonese study collected 878 two-character VO compounds alongside
445 non-VO compounds. Under their conservative Study 1 criterion, an item counted as
separable only when a web search and two native judges each accepted at least one
separation type. The result was:

| Compound type | Items | Separable under criterion |
|---|---:|---:|
| VO | 878 | 543 (62%) |
| non-VO | 445 | 127 (29%) |

The result directly rejects an unrestricted rule that every VO compound is separable.
The source also tests insertion of perfective `zo2`, experiential `gwo3`, progressive
`gan2`, `dak1`, `saai3`, and resultative/completive `jyun4`. The appendix shows that
acceptance varies sharply by separator and by judgment source.

The paper's reviewed VO diagnostics include:

- aspect or other verbal material after the verbal component;
- measure phrases between the verbal and nominal components;
- modification or expansion of the object component;
- for highly separable items, movement/preposing of the object component;
- retention of a lexicalized or noncompositional compound interpretation despite
  separation;
- a same-clause or “near context” requirement between the two components.

The paper's detailed examples in the background are partly Mandarin literature
examples, while its quantitative comparison and separator tables are Cantonese. Exact
Cantonese VO item profiles still require extraction from the appendix and underlying
materials before any item is licensed.

## Checked source findings

The source-verification ledger is:

`UC-RQ-014-SEPARABLE-VO-COMPOUND-SOURCE-VERIFICATION-R1.tsv`

### Chan and Cheung 2020

The official author-hosted journal PDF verifies the Cantonese dataset, web-search and
native-judgment methods, conservative classification rule, VO/non-VO comparison,
separator-specific results, and lexical-versus-phrasal analysis.

Study 1 uses string searches without controlled linguistic contexts and two judges.
Study 2 tests selected non-VO items with 45 participants, not the complete VO inventory.
The paper itself notes that even VO compounds are less separable than commonly
expected. The aggregate 62% rate must not become an item-level prediction.

## Exact collision audit

The collision ledger is:

`UC-RQ-014-SEPARABLE-VO-COMPOUND-COLLISION-AUDIT-R1.tsv`

### Current `ProductiveVO`

`ProductiveVO` represents a visible activity verb and nominal object with constrained
reviewed surfaces. A separated VO compound can look phrasal, but its two components
may retain a stored noncompositional meaning and accept only selected interveners.
Transparent V+NP composition therefore cannot replace compound identity.

### Current `VerbComplementVP`

This label covers sourced postverbal descriptive, resultative, or motion-complement
questions and is explicitly not a residual category for arbitrary postverbal material.
It neither links a separated nominal component back to a lexical compound nor predicts
which interveners that compound admits.

### Ordinary VP/aspect structure

An aspect, measure, or modifier construction may correctly analyze the inserted
material. That analysis is complementary, not a merge: it does not establish that the
surrounding morphemes form a separable compound or that its idiomatic meaning survives.

## Required boundaries

Future research must distinguish:

- lexicalized VO compounds from freely composed verb-object phrases;
- inseparable, somewhat separable, and highly separable lexical items;
- perfective, experiential, progressive, `dak1`, `saai3`, `jyun4`, measure, and
  object-modifier separation;
- insertion from object preposing, topicalization, and other discontinuity;
- retained compound meaning from newly composed literal readings;
- same-clause separated forms from accidental cross-clause co-occurrence;
- compounds whose second component is bound from those with an independently usable
  noun;
- VO compounds from non-VO and resultative compounds;
- aggregate web/judgment results from item-level modern usage and regional variation.

## Research tasks before any implementation proposal

1. Recover the 878-item VO inventory with separator-by-source results.
2. Build a lexical ledger recording unsplit meaning, literal compositional reading,
   accepted separators, rejected separators, movement, and same-clause constraints.
3. Verify high-, medium-, and low-separability items with contextualized judgments from
   multiple modern Cantonese speakers.
4. Collect natural audio-backed examples for every proposed separation profile.
5. Test whether separated forms preserve idiomatic readings rather than merely allowing
   a literal V+NP parse.
6. Define composition between the stored compound relation and independently sourced
   aspect, quantity, modification, or information-structure constructions.
7. Audit parser output only after item-level profiles are frozen.

## Provisional research outcome

| Question | Current answer |
|---|---|
| Are separable Cantonese VO compounds independently documented? | **Yes.** |
| Are all VO compounds freely separable? | **No; only 62% met the study's conservative aggregate criterion.** |
| Can separated forms retain lexical compound meaning? | **Yes.** |
| Does `ProductiveVO` preserve that lexical identity and item-specific license? | **No.** |
| Are exact modern item-by-separator profiles complete? | **No; quarantined.** |
| Is a dedicated research unit justified? | **Yes.** |
| Is parser implementation authorized? | **No.** |

## Exit conditions

UC-RQ-014 may leave active research only after one of these dispositions is justified:

- **typed separable-compound lexicon:** item, meaning, separator, movement, clause, and
  variation boundaries receive stable source-linked profiles;
- **compositional merge:** lexical identity plus independently supported VP operations
  preserve every meaning and restriction without loss;
- **quarantine:** item-level, semantic, judgment, or regional boundaries remain
  inadequate;
- **retire:** a complete collision audit proves existing lexical and VP structures
  sufficient.

Until then, current grammar statuses and parser behavior remain unchanged.
