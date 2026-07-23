---
title: UC-RQ-009 — Associative plural construction
research_id: UC-RQ-009
status: active_research_unit
baseline_version: 0.5.208
created: 2026-07-23
implementation_authorized: false
status_change_authorized: false
---

# UC-RQ-009 — Associative plural construction

## Research decision

A dedicated research unit is justified. Lui 2026 directly describes a Cantonese
associative plural consisting of a focal referent followed by `佢哋 keoi5dei6`:

```text
focal referent X + 佢哋
    -> X and X's contextually recoverable associate(s)
```

The source's example `小明佢哋 siu2ming4 keoi5dei6` means Ming and his
associate(s), not a plural group named solely by an ordinary third-person pronoun.
Lui also distinguishes the construction semantically and structurally from
conjunctive coordination and inclusory constructions.

Current Canto Span `AssociativeNP` instead describes a modifier or possessor joined
to a noun by visible `嘅`; its name is a collision, not evidence that it covers
associative plurality. `CoordinatedNP` requires overt coordination. This note does
**not** authorize renaming either label, lexical retyping, parser behavior, grammar
status changes, or productive acceptance.

## Safest checked core

The publisher abstract and article outline directly support these properties:

- the construction contains a focal referent followed by associative-plural
  `佢哋`;
- the resulting group includes that focal referent and one or more associates;
- the focal referent can be a complex NP and can itself contain coordination;
- the marker has free `佢哋` and bound `哋` forms, though the bound form is
  described as odd or rare in modern Cantonese;
- discourse uses include introducing a new group, following a topic shift, and
  reintroducing a distant referent;
- associates can remain unexpressed when discourse makes them recoverable.

The study draws on corpora, internet data, and a grammaticality-judgment test with
native Cantonese speakers. Abstract-level verification does not yet establish the
full item inventory, exact judgment results, productivity limits, or all nominal,
semantic, regional, register, and prosodic restrictions.

## Checked source findings

The source-verification ledger is:

`UC-RQ-009-ASSOCIATIVE-PLURAL-SOURCE-VERIFICATION-R1.tsv`

### Lui 2026

The official publisher record verifies the article, DOI, open-access status,
constructional definition, example, empirical methods, marker forms, complex focal
referents, distinction from coordination and inclusory constructions, and stated
discourse uses.

The full article was not extracted in this checkpoint. Claims requiring exact
examples, counts, judgments, statistical results, negative evidence, or a complete
restriction inventory remain quarantined.

## Exact collision audit

The collision ledger is:

`UC-RQ-009-ASSOCIATIVE-PLURAL-COLLISION-AUDIT-R1.tsv`

### Current `AssociativeNP`

The current label covers a modifier or possessor plus visible `嘅` plus a noun.
That nominal-modification relation neither supplies `佢哋` nor builds a focal
referent with covert associates. The labels must not be merged merely because they
share the word *associative*.

### Current `CoordinatedNP`

Coordination overtly joins two nominal expressions with a coordinator. Associative
plurality overtly names the focal referent while leaving associates contextually
recoverable. Lui treats the two as distinct even though a coordinated NP may occur
inside the focal-referent position.

### Ordinary plural `佢哋` and `-dei6`

The same overt pronoun can independently mean ordinary third-person plural “they.”
Form identity alone therefore cannot decide whether `佢哋` is a pronoun or an
associative-plural marker. The bound-marker and general personal-plural questions
remain coordinated with UC-RQ-022, not resolved here.

## Required boundaries

Future research must distinguish:

- simple names and common nouns from complex or coordinated focal referents;
- ordinary plural-pronoun `佢哋` from associative-plural `佢哋`;
- free `佢哋` from bound `哋` and establish the latter's modern acceptability;
- associative plurality from overt coordination and inclusory constructions;
- associative plurality from current `嘅`-linked `AssociativeNP`;
- recoverable associates from merely vague plural reference;
- discourse introduction, topic shift, and reintroduction environments;
- human, animacy, definiteness, honorific, regional, register, and prosodic limits.

## Research tasks before any implementation proposal

1. Extract all examples, judgments, participant details, and negative cases from
   Lui 2026 into a structured ledger.
2. Build a focal-referent matrix for names, pronouns, common nouns, quantified NPs,
   modified NPs, and coordinated NPs.
3. Contrast matched ordinary-pronoun, associative-plural, coordination, and
   inclusory readings in discourse contexts.
4. Verify the free/bound marker analysis and modern distribution of `哋`.
5. Collect natural audio-backed examples and test prosodic boundaries.
6. Coordinate UC-RQ-022 ordinary personal plural without assuming one construction.
7. Audit parser output only after the lexical and constructional boundaries are
   frozen.

## Provisional research outcome

| Question | Current answer |
|---|---|
| Is `X 佢哋` independently documented as associative plural? | **Yes.** |
| Does it mean X together with contextually recoverable associate(s)? | **Yes.** |
| Is it ordinary overt coordination? | **No in the checked source.** |
| Does current `AssociativeNP` already cover it? | **No; that label is `嘅`-linked nominal modification.** |
| Are exact productivity and restriction boundaries complete? | **No; quarantined pending full-text extraction and testing.** |
| Is a dedicated research unit justified? | **Yes.** |
| Is parser implementation authorized? | **No.** |

## Exit conditions

UC-RQ-009 may leave active research only after one of these dispositions is justified:

- **typed associative-plural construction:** focal-referent, marker, associate,
  discourse, and form boundaries receive stable source-linked profiles;
- **compositional merge:** independently supported nominal and discourse relations
  preserve the associative reading without collision or loss;
- **quarantine:** productivity, marker, referent, regional, or audio boundaries
  remain inadequate;
- **retire:** a complete collision audit proves an existing construction sufficient.

Until then, current grammar statuses and parser behavior remain unchanged.
