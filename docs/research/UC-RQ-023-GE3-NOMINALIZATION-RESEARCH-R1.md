---
title: UC-RQ-023 — ge3 referential nominalization
research_id: UC-RQ-023
status: active_research_unit
baseline_version: 0.5.214
created: 2026-07-23
implementation_authorized: false
status_change_authorized: false
---

# UC-RQ-023 — `ge3` referential nominalization

## Research decision

A dedicated research unit is justified for the directly documented Cantonese
referential/headless profile:

```text
predicate or clause + ge3
    -> the contextually identifiable one(s) satisfying that predicate
```

Yap and Matthews give `還返我買嘅 waan4 faan1 ngo5 maai5 ge3` “return
the one(s) I bought,” contrasting it with headed `還返我買嘅嘢 … ge3 je5`
“return the stuff I bought.” Sio independently treats pronominal/headless `ge3`
as distinct from adnominal modifier `ge3` and sentence-final mood `ge3`.

The supported core is referential; it does not establish unrestricted event,
proposition, or gerundive nominalization. Tang finds Cantonese `ge3` less
grammaticalized than Mandarin `de` and lacking Mandarin's wide gerundive range.
Those broader claims remain quarantined.

This note does **not** authorize a hidden noun, recovered argument token, parser
behavior, grammar status changes, or productive acceptance.

## Safest checked core

The checked sources support:

- a verbal predicate or clause before `ge3`;
- no overt nominal head after `ge3` in the referential profile;
- occurrence of the resulting expression in an argument position;
- an entity-denoting interpretation such as “the one(s) I bought”;
- contextual recovery of the referent;
- a contrast with headed relative/modifier `clause + ge3 + noun`;
- distinct possessive-pronominal and sentence-final stance uses of the same form.

The sources do not yet establish which subjects or objects may remain implicit,
whether every transitivity class participates, how number is resolved, or whether
all stative, verbal, and clausal inputs share one internal analysis.

## Checked source findings

The source-verification ledger is:

`UC-RQ-023-GE3-NOMINALIZATION-SOURCE-VERIFICATION-R1.tsv`

### Sio 2011

Sio provides a descriptive overview of adnominal and sentence-final `ge3`. The
checked source review distinguishes modifier-plus-`ge3` constituents, headless
modifier `ge3` analyzed with an empty/familiar nominal, and sentence-final mood
uses. The abstract syntactic nominal must not become a fabricated parser token.

### Yap and Matthews 2008

The paper explicitly maps Cantonese `ge3` across genitive, possessive-pronominal,
relative, nominalizer, cleft, and stance pathways. Its matched examples contrast
headed `ngo5 maai5 ge3 je5` with headless `ngo5 maai5 ge3`, directly supporting
the referential nominalization boundary.

### Tang 2011

Tang compares Mandarin and Cantonese gerundive nominalization. The publisher
record and volume introduction report that Cantonese `ge3` has not developed the
wide range of gerundive constructions found with Mandarin `de`; Cantonese
gerundive nominals are reported only in a restricted contrastive-object profile.
This blocks a general “any VP/clause + `ge3` becomes an event nominal” rule.

### Matthews and Yip 2011

The official grammar companion independently presents headed Cantonese relative
clauses and noun-modifying clauses. It confirms that an overt post-`ge3` noun is
part of a nominal-modification structure, not the headless referential profile.

## Exact collision audit

The collision ledger is:

`UC-RQ-023-GE3-NOMINALIZATION-COLLISION-AUDIT-R1.tsv`

### `RelativeClauseNP`

The current constructor requires a visible modifier clause, `ge3`, and overt head
noun. It therefore preserves the headed control but cannot absorb headless
argument-position `clause + ge3`.

### `ModifiedNP`

This broad overt-headed modifier structure covers adjectival, possessive, and
other modifier-plus-noun profiles. It does not preserve the headless referential
unit or its contextually recovered denotation.

### `StativeNominalComplement`

The current runtime has one genuinely related path: `stative predicate + ge3` as
a copular complement, exemplified by `真嘅` in `係真嘅`. Its second path actually
requires an overt nominal head. Neither path covers the documented transitive
`ngo5 maai5 ge3` profile, so merger would lose predicate type, argument structure,
and referential function.

### UC-RQ-016 and sentence-final `ge3`

UC-RQ-016 preserves `hai6 … ge3` cleft focus. Its audit already notes that a
generic particle wrapper cannot distinguish cleft-final, assertive, nominalizing,
possessive, and relative `ge3`. Referential nominalization must therefore be
separated by syntactic distribution and interpretation, not by surface-final
position alone.

## Required boundaries

Future research must distinguish:

- headless referential `predicate/clause + ge3` from headed relatives;
- verbal, stative, possessive-pronominal, and genuinely gerundive inputs;
- implicit subject, implicit object, and contextually recovered nominal referent;
- entity, event, proposition, kind, and property readings;
- singular, plural, mass, and underspecified reference;
- matrix argument position from clause-final stance/assertion;
- nominalization from `hai6 … ge3` cleft focus;
- colloquial Hong Kong Cantonese from formal or Mandarin-influenced profiles.

## Provisional outcome

| Question | Current answer |
|---|---|
| Is headless referential `predicate/clause + ge3` directly documented? | **Yes.** |
| Does it contrast with `clause + ge3 + overt noun`? | **Yes.** |
| Can it mean “the one(s) that …”? | **Yes.** |
| Is unrestricted event/gerundive nominalization established? | **No; quarantined.** |
| Are implicit argument and number boundaries complete? | **No.** |
| Can the three current named collisions preserve the full core? | **No.** |
| Is a dedicated research unit justified? | **Yes.** |
| Is parser implementation authorized? | **No.** |

## Exit conditions

UC-RQ-023 may leave active research only after input-category, argument,
reference, and sentence-final boundaries support a typed construction, lossless
compositional merge, continued quarantine, or evidence-based retirement.
