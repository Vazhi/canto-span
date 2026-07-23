---
title: UC-RQ-006 — Dislocation focus construction
research_id: UC-RQ-006
status: active_research_unit
baseline_version: 0.5.208
created: 2026-07-23
implementation_authorized: false
status_change_authorized: false
---

# UC-RQ-006 — Dislocation focus construction

## Research decision

A dedicated research unit is justified. Cheung 2009 directly analyzes colloquial
Cantonese Dislocation Focus Constructions (DFC), also called right dislocation, in
which a sentence particle is medial and overt material follows it:

```text
pre-particle focused material + sentence particle + post-particle remnant
```

The paper gives Cantonese alternants such as a canonical `S–Aux–V–O–SP` clause and
DFC orders where an IP, VP, or DP occurs before the particle and the remaining
material follows it. Four diagnostics are used to argue that the pre- and
post-particle strings remain syntactically connected.

Current Canto Span has only generic topic/comment and final-particle heuristics. It
does not represent a medial particle connecting two overt strings or the focus
dependency described in the source. This note does **not** authorize a parser
label, movement derivation, silent copy, grammar status change, or implementation.

## Safest checked core

The narrow direct profile is:

1. a colloquial Cantonese clause has a sentence particle in nonfinal surface
   position;
2. a clause-related remnant occurs after that particle;
3. the pre- and post-particle material is syntactically dependent rather than two
   unrelated discourse fragments;
4. the pre-particle constituent receives a context-sensitive focus reading.

Cheung illustrates pre-particle constituents of several sizes, including IP, VP,
DP, adjectival predicate, and CP. One DP example varies among speakers and improves
with an explicit focus question; the source also reports a heaviness preference.
Those observations block unrestricted constituent movement or adjacency rules.

## Checked source findings

The source-verification ledger is:

`UC-RQ-006-DISLOCATION-FOCUS-SOURCE-VERIFICATION-R1.tsv`

Cheung 2009 provides:

- exact Cantonese canonical/DFC order contrasts;
- sentence-medial particle placement as a defining surface property;
- `zinghai` “only,” `doudai` wh, polarity-item licensing, and Principle C tests
  supporting dependency between the two strings;
- a focus-movement analysis constrained by the proposed Spine Constraint;
- explicit context, heaviness, and speaker-judgment qualifications.

The movement, head-initial CP, and focus-projection analysis is theory-specific.
The directly usable research result is the overt form, dependency evidence, focus
effect, and stated variability—not the source's complete derivation.

## Exact collision audit

The collision ledger is:

`UC-RQ-006-DISLOCATION-FOCUS-COLLISION-AUDIT-R1.tsv`

### `TopicComment`

`TopicComment` is an internal heuristic with no pattern-specific source mapping.
It can preserve a topic and comment but does not require a medial sentence particle,
post-particle remnant, syntactic dependency, or focus interpretation.

### `DiscourseParticleFrame`

The runtime learner description explicitly scopes visible sentence-final particles
over a complete statement. DFC requires the particle to be medial, with related
material following it. A final-particle wrapper cannot stand in for this relation.

### `FocusParticleFrame`

This heuristic represents restrictive `得 … 啫/咋` over a visible quantity or
scalar host. It does not represent clause-level dislocation, sentence particles in
medial position, or the Cheung focus dependency.

### Clause-medial stance particles

Existing source records for Yap, Wong, and Chor 2014 concern lexical/stance
parentheticals and complementizer-like developments. Clause-medial stance marking
must not be merged with DFC solely because a particle or stance expression is not
sentence-final.

## Required boundaries

Future research must distinguish:

- DFC from ordinary canonical clause + final particle order;
- a syntactically dependent remnant from afterthought, repair, restart, or two
  intonationally independent clauses;
- focus dislocation from ordinary topic-comment order;
- medial sentence particles from clause-medial stance markers;
- focus from defocalization accounts in later Cantonese right-dislocation work;
- IP, VP, DP, AP, and CP pre-particle constituents;
- context-supported and heavy constituents from short out-of-context cases;
- stable Hong Kong judgments from speaker-variable examples;
- written punctuation from actual prosodic phrasing.

## Research tasks before any implementation proposal

1. Extract every Cantonese example, judgment qualifier, particle, context, and
   diagnostic from the full Cheung article into a structured ledger.
2. Check later competing analyses, especially Cantonese defocalization and
   biclausal/ellipsis accounts.
3. Collect natural audio-backed Hong Kong examples; written commas alone are not
   sufficient evidence for the intended prosody.
4. Build matched canonical, DFC, afterthought, repair, topic-comment, and
   clause-medial-stance contrasts.
5. Use audio naturalness and focus-interpretation tasks with multiple speakers.
6. Audit parser output only after the prosodic and structural boundary set is frozen.

## Provisional research outcome

| Question | Current answer |
|---|---|
| Is Cantonese medial-particle dislocation independently attested? | **Yes.** |
| Are the pre- and post-particle strings unrelated fragments? | **No under Cheung's diagnostics; competing analyses still require review.** |
| Does current `DiscourseParticleFrame` cover it? | **No; that heuristic is sentence-final.** |
| Does current `FocusParticleFrame` cover it? | **No; it is a restrictive scalar-host frame.** |
| Is unrestricted movement/productivity established? | **No; context, heaviness, category, and speaker variation matter.** |
| Is a dedicated research unit justified? | **Yes.** |
| Is parser implementation authorized? | **No.** |

## Exit conditions

UC-RQ-006 may leave active research only after one of these dispositions is justified:

- **dedicated construction:** stable overt, prosodic, dependency, and focus
  boundaries support a DFC profile;
- **typed discourse family:** DFC, afterthought, repair, and stance-medial subtypes
  receive defensible source-linked distinctions;
- **compositional merge:** existing clause, particle, focus, and discourse relations
  can preserve the dependency without construction-specific loss;
- **quarantine:** audio, context, speaker, or analysis conflicts remain unresolved;
- **retire:** a complete collision audit proves current representation is adequate.

Until then, current grammar statuses and parser behavior remain unchanged.
