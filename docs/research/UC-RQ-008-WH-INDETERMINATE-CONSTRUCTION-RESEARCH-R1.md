---
title: UC-RQ-008 — Wh-indeterminate construction
research_id: UC-RQ-008
status: active_research_unit
baseline_version: 0.5.208
created: 2026-07-23
implementation_authorized: false
status_change_authorized: false
---

# UC-RQ-008 — Wh-indeterminate construction

## Research decision

A dedicated research unit is justified. Hsu and Xu 2020 experimentally study Hong
Kong Cantonese wh-indeterminates: wh forms whose overt shape can receive an
interrogative or indefinite interpretation. Their central contrast uses `乜嘢
mat1je5` in otherwise closely matched strings interpreted as “what” or
“something/anything.”

Current Canto Span lexically assigns `邊個`, `乜嘢`, and `邊度` fixed wh-person,
wh-thing, and wh-place roles and routes them through question-specific labels. It
has no general representation for an indefinite reading of the same overt form or
for prosodic/particle disambiguation. This note does **not** authorize lexical
retyping, parser behavior, hidden quantifiers, grammar status changes, or productive
acceptance.

UC-RQ-020 adds a directly supported universal subprofile: Lee 2014 documents
`邊個都` “everyone” and preverbal `乜嘢都` “everything.” That profile is merged
here as another licensed noninterrogative wh reading. It does not establish the
stronger claim that bare `wh + dou1` expresses modal freedom of choice.

## Safest checked core

The strongest direct finding is limited to `乜嘢` and its reduced indefinite forms:

```text
same wh-form region + sentence-type/SFP context + prosodic realization
    -> interrogative or indefinite interpretation
```

Hsu and Xu compare wh-questions, yes/no questions containing an indefinite
wh-form, and statements. They report that:

- Chinese languages do not morphologically differentiate the two readings;
- Cantonese speakers often reduce `mat1je5` to `mat/me` or `je` for an indefinite
  reading to avoid ambiguity;
- wh-phrase regions distinguish interrogative and indefinite readings prosodically;
- sentence-final-particle prosody distinguishes question types from statements;
- wh regions and particles form a duration pattern interacting with
  syntax-semantics.

This establishes a form-interpretation alternation and prosodic research target. It
does not establish that every Cantonese wh expression has all indefinite,
negative-polarity, and free-choice readings.

## Checked source findings

The source-verification ledger is:

`UC-RQ-008-WH-INDETERMINATE-SOURCE-VERIFICATION-R1.tsv`

### Hsu and Xu 2020

The official ISCA full paper and PolyU record directly support the interrogative /
indefinite ambiguity of `mat1je5`, matched sentence types, reduced indefinite forms,
and acoustic results involving F0/duration and sentence-final particles.

The experiment is a speech-production study. It does not supply a complete syntax
of indefinites, a full wh-form inventory, negative-polarity licensing conditions,
or general free-choice semantics.

### Wu 1989

HKU metadata verifies that Wu's MPhil thesis is a study of Cantonese interrogation,
but no exact wh-indeterminate proposition was recovered in this checkpoint. It is a
priority full-text source for question classifications, not current evidence for
indefinite, NPI, or free-choice claims.

### Lee 2014 — universal `wh + dou1`

The official York dissertation directly gives Cantonese subject `bin1go3 dou1` and
preverbal object `mat1je5 dou1` with “everyone/everything” readings. This verifies a
universal licenser profile for two wh forms. It does not supply matched modal,
conditional, or permission contrasts needed to call the bare pattern free choice.

## Exact collision audit

The collision ledger is:

`UC-RQ-008-WH-INDETERMINATE-COLLISION-AUDIT-R1.tsv`

### Current wh-question labels

`IdentityWhQuestion`, `LocativeWhQuestion`, `WhClassifierQuestion`, and
`ExistentialWhQuestion` represent specific interrogative roles or surface frames.
They can remain possible interrogative analyses but cannot stand for indefinite
readings of the same lexical material.

### Fixed lexical wh roles

Runtime entries type `邊個` as `wh_person`, `邊度` as `wh_place`, and `乜嘢` as
`wh_thing`. Those entries preserve question readings but do not encode contextual
indefiniteness. Graph identity alone cannot determine the interpretation.

### `AcceptabilityClause` and free-choice `都得`

Existing research directly attests explicit free-choice forms such as `是但邊個都得`
and `隨便去邊度都得`, but treats the wrapper as needing a split between simple
acceptability and free choice. Those constructions contain overt free-choice
licensors and do not prove that bare wh forms receive unrestricted free-choice
readings.

## Required boundaries

Future research must distinguish:

- interrogative `乜嘢` from indefinite full and reduced forms;
- wh-question, yes/no-question, and statement sentence types;
- lexical reduction from purely prosodic disambiguation;
- `邊個`, `乜嘢`, `邊度`, temporal, manner, amount, and classifier wh forms;
- existential, negative-polarity, conditional, modal, and free-choice licensors;
- bare wh indeterminates from overt `是但/隨便 … 都得` free-choice structures;
- sentence-final particle identity, tone, and question force;
- production cues from perception/interpretation cues;
- Hong Kong Cantonese from Guangzhou and other Yue varieties.

## Research tasks before any implementation proposal

1. Extract every stimulus, participant count, acoustic result, particle, and reduced
   form from Hsu and Xu into a structured ledger.
2. Reopen Wu 1989 and other direct Cantonese syntax/semantics sources.
3. Build a wh-form-by-reading matrix with exact licensors and impossible readings.
4. Collect natural audio-backed examples and classify full versus reduced forms.
5. Design perception and interpretation tasks, not production-only judgments.
6. Keep UC-RQ-020's modal free-choice extension quarantined and coordinate
   UC-RQ-021 minimizer research without assuming either is the universal profile.
7. Audit parser output only after lexical, particle, polarity, and prosodic boundaries
   are frozen.

## Provisional research outcome

| Question | Current answer |
|---|---|
| Can one Cantonese wh form have interrogative and indefinite readings? | **Yes; directly shown for `mat1je5`.** |
| Does morphology alone distinguish the readings? | **No in the checked source.** |
| Do prosody and sentence-final particles contribute? | **Yes in the production experiment.** |
| Do current question labels cover indefinite readings? | **No.** |
| Are universal `bin1go3/mat1je5 + dou1` readings established? | **Yes; merged from UC-RQ-020.** |
| Are NPI and free-choice readings established for all listed wh forms? | **No; quarantined pending direct evidence.** |
| Is a dedicated research unit justified? | **Yes.** |
| Is parser implementation authorized? | **No.** |

## Exit conditions

UC-RQ-008 may leave active research only after one of these dispositions is justified:

- **typed indeterminate family:** wh forms and their interrogative, indefinite, NPI,
  and free-choice licensors receive stable source-linked profiles;
- **compositional merge:** independently supported lexical, polarity, particle,
  quantification, and prosodic relations preserve every reading without loss;
- **quarantine:** reading, licensor, regional, or audio boundaries remain inadequate;
- **retire:** a complete collision audit proves existing constructions sufficient.

Until then, current grammar statuses and parser behavior remain unchanged.
