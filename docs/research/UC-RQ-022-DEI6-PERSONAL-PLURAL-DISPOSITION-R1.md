---
title: UC-RQ-022 — dei6 personal-plural disposition
research_id: UC-RQ-022
status: resolved_mixed_disposition
baseline_version: 0.5.214
created: 2026-07-23
implementation_authorized: false
status_change_authorized: false
---

# UC-RQ-022 — `dei6` personal-plural disposition

## Research decision

Do **not** promote one productive personal/human-noun plural construction. The
candidate divides into independently bounded profiles:

1. **Merge into the pronominal inventory:** `我哋 ngo5dei6`, `你哋
   nei5dei6`, and `佢哋 keoi5dei6` form the ordinary first-, second-, and
   third-person plural paradigm. The current lexicon already records these forms.
2. **Retire/reject general human-noun pluralization:** direct Cantonese evidence
   does not license `human noun + dei6` as a productive counterpart of Mandarin
   `noun + men`. Chan rejects a common-noun example and describes `dei6` as not a
   full general plural marker.
3. **Keep `人哋 jan4dei6` lexicalized:** checked lexicographic sources give
   “other people,” not a rule that pluralizes arbitrary human nouns.
4. **Merge the associative profile into UC-RQ-009:** name/focal-referent plus
   bound `dei6` can denote that referent and associates, but Chan reports strong
   naturalness limits and Lui finds the bound form rarer and less natural than
   free `佢哋` in modern Cantonese.

This disposition does not authorize lexical changes, a plural-NP parser rule,
grammar status changes, or productive acceptance.

## Supported ordinary paradigm

Matthews and Yip's official grammar companion gives:

```text
ngo5      -> ngo5dei6       I/me   -> we/us
nei5      -> nei5dei6       you    -> you (plural)
keoi5     -> keoi5dei6      s/he   -> they/them
```

These are ordinary personal pronouns, not evidence that the suffix can attach to
every human noun. The same source treats them in its pronoun chapter rather than
as plural noun phrases.

## Human-noun boundary

Chan's direct contrast is decisive:

- `keoi5 dei6` is accepted as “they/them”;
- `Siu2-ming4 dei6` receives the intended associative reading only for some
  speakers and is reported as unnatural for most;
- `lou5baan2 dei6` is rejected on the intended “the boss and associates” reading;
- the preferred associative form is `Siu2-ming4 keoi5 dei6`.

The evidence therefore rejects a productive “selected human noun + `dei6` =
ordinary plural humans” rule. Proper-name associative plurality is a different
group-reference construction, not ordinary cardinal plural marking.

## `jan4dei6` boundary

The Words.hk/CantoWords entry restricts plural `dei6` to personal pronouns and
the word `jan4`, listing `jan4dei6` as “other people.” Its lexical meaning is not
the transparent plural “persons” required to motivate a general human-noun rule.
The existing lexical entry likewise records plural or indefinite-pronoun
readings, so no new construction is justified.

## Associative-plural boundary

Lui 2026 directly analyzes `X + keoi5dei6` as associative plural “X and X's
associate(s).” The bound `X-dei6` alternative is less natural and rarely attested
in modern Cantonese. This evidence belongs to UC-RQ-009's focal-referent and
associate relation. It cannot be used to turn `dei6` into ordinary noun-number
morphology.

## Exact collision audit

The collision ledger is:

`UC-RQ-022-DEI6-PERSONAL-PLURAL-COLLISION-AUDIT-R1.tsv`

- Current lexical entries already preserve the three plural pronouns and
  lexicalized `jan4dei6`.
- UC-RQ-009 preserves associative group reference and the free/bound marker
  boundary.
- `QuantifiedPersonNP` concerns overt person nouns under quantity expressions,
  not pronominal number.
- `DiMarkedNP` uses `di1` before a noun for plural/indefinite nominal reference;
  phonological and semantic similarity does not merge `di1` with `dei6`.
- Current `AssociativeNP` is a `ge3`-linked modifier/possessor construction and
  is only a naming collision.

## Provisional outcome

| Question | Current answer |
|---|---|
| Are `ngo5dei6`, `nei5dei6`, and `keoi5dei6` ordinary plural pronouns? | **Yes; merge into the pronominal inventory.** |
| Is `dei6` a productive suffix for common human nouns? | **No in the checked contrast; retire that claim.** |
| Does `jan4dei6` prove productive human-noun plurality? | **No; keep lexicalized.** |
| Can name/focal-referent + `dei6` have an associative reading? | **For some speakers, with strong limits; merge into UC-RQ-009.** |
| Is bound `dei6` the preferred modern associative marker? | **No; quarantined as rarer/less natural than free `keoi5dei6`.** |
| Is a standalone personal-plural construction justified? | **No.** |
| Is parser implementation authorized? | **No.** |

## Reopening conditions

The retired human-noun rule may be reopened only with direct modern Cantonese
evidence separating ordinary plural, vocative, associative, code-switched,
Mandarin-influenced, and lexicalized readings across common nouns. The bound
associative profile remains governed by UC-RQ-009's research conditions.
