---
title: Nominal modification corpus closure R1
status: corpus_packet_complete_findings_only
intake_issue: 268
work_claim: 365
human_artifact_issue: 315
reviewed_on: 2026-07-31
supersedes_checkpoint: docs/research/NOMINAL-MODIFICATION-PROFILE-CLOSURE-R1.md
---

# Nominal modification corpus closure R1

## Outcome

The human compact-export dependency is complete and the bounded corpus review is now
closed at findings level.

The two narrow construction identities remain distinct:

1. `AA07 GeMarkedNominalModifierNP`: overt modifier + `嘅` + overt noun;
2. `AA91 DegreePropertyModifierNounNP`: degree-marked property expression directly
   modifying an overt noun without `嘅`.

Retired `AB10 NominalModificationCompositeWrapper` remains retired. No successor
umbrella and no new UUID are justified.

## Input integrity

| Inventory | Rows | SHA-256 |
|---|---:|---|
| AA07 | 960 | `9452e2079bc9fb9aa593c077bbb40e1cb0c566f5cfc00a81e3aec547e3921023` |
| AA91 | 78 | `4d5d12b616f80c724ed80b65c2f4113088b460590c2c3f6564809389805ddef8` |

Both compact exports contain the required ten columns, unique nonblank candidate IDs,
full utterance text, adjacent-turn context, source file, participant, matched surface,
and POS.

## AA91 full-inventory result

All 78 candidates were reviewed.

| Classification | Count |
|---|---:|
| genuine | 5 |
| false positive | 71 |
| ambiguous | 2 |
| unusable | 0 |

The five positive rows are direct degree-property modification with overt heads:
`好短時間`, `好大問題`, `好大壓力`, `好高人工`, and the repeated-degree
`好好好好態度` example.

The inventory is dominated by headless classifiers, classifier-linked nominals,
quantity expressions, verbal/existential predicates, comparatives, numeral or
superlative material, and extraction-boundary errors. Two code-switch or attachment
rows remain ambiguous rather than being forced positive or negative.

## AA07 selected-packet result

A deterministic 64-row packet was frozen by stable candidate ID, with exactly eight
rows in each required coverage stratum.

| Classification | Count |
|---|---:|
| genuine | 28 |
| false positive | 24 |
| ambiguous | 6 |
| unusable | 6 |

The positive core contains canonical pronoun possession, nominal and proper-name
modification, adjective/property modification, and transparent temporal-nominal
modification.

The boundary set confirms that raw `嘅 + noun-tagged token` adjacency also captures
independently typed relative clauses and temporal clauses, compound-internal matches,
classifier or measure material, repair fragments, and annotation failures. Ambiguous
localizer and attachment cases are retained explicitly.

The remaining **896 AA07 rows are unreviewed**. They remain available in the preserved
compact export and must not be interpreted as negative evidence.

## Final family decision

- **AA07 identity:** retain.
- **AA91 identity:** retain.
- **AB10:** remain retired.
- **New nominal-modification UUID:** not justified.
- **AA07 corpus evidence:** bounded stratified packet complete; broader inventory
  remains unreviewed.
- **AA91 corpus evidence:** complete 78-row inventory reviewed.
- **Runtime, fixtures, statuses, surveys, releases, and deployment:** unchanged.

The corpus packet establishes construction boundaries and extraction failure modes.
It does not by itself satisfy native-panel, held-out, runtime-alignment, or promotion
gates.
