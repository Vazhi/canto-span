---
title: UC-RQ-013 — Sentence-final particle cluster ordering
research_id: UC-RQ-013
status: active_research_unit
baseline_version: 0.5.208
created: 2026-07-23
implementation_authorized: false
status_change_authorized: false
---

# UC-RQ-013 — Sentence-final particle cluster ordering

## Research decision

A dedicated research unit is justified. Sybesma and Li 2007 analyze more than forty
common Cantonese sentence-final particles, propose sub-syllabic minimal semantic
units, and map those units onto an ordered hierarchy spanning sentential,
propositional-discourse, speech-act, and epistemic domains. The hierarchy is intended
to reflect possible linear order.

This is direct evidence that particle clusters have structured semantic/syntactic
ordering, not free concatenation. It is not a complete cluster grammar: the paper
explicitly leaves unexplained why many logically possible combinations do not occur
and excludes particles including `tim1`, `sin1`, and `lei4` plus bisyllabic forms from
its core inventory.

Current generic particle wrappers and the runtime rank table can preserve selected
attested surfaces. They do not independently establish the source's semantic units,
complete co-occurrence conditions, or impossible orders. This note does **not**
authorize rank changes, new clusters, particle decomposition, parser behavior, grammar
status changes, or productive acceptance.

## Safest checked core

The checked source supports these provisional claims:

- Cantonese has at least roughly forty formally distinct sentence-final particles;
- many particles can be partially decomposed into recurrent onset, rhyme, coda, and
  tone units with proposed semantic contributions;
- the analysis proposes twelve nondefault minimal semantic units plus a default rhyme
  and tone;
- those units occupy a structural hierarchy, with proposition-internal/current-relevance
  material lower and speaker/hearer epistemic material higher;
- the hierarchy is proposed to determine the corresponding inside-to-outside linear
  order of units and clusters;
- phonological identity, tone, semantics, and structural position all matter, so broad
  character matching is insufficient.

The proposed decomposition and cartographic mapping are theory-bearing analyses. A
safe project representation must preserve visible forms and source-specific profiles
without treating every theoretically ordered combination as grammatical.

## Checked source findings

The source-verification ledger is:

`UC-RQ-013-SENTENCE-FINAL-PARTICLE-CLUSTER-SOURCE-VERIFICATION-R1.tsv`

### Sybesma and Li 2007

Publisher metadata and the author-uploaded full text verify the particle inventory,
minimal-unit analysis, structural hierarchy, example clusters, and intended ordering
interpretation.

The authors explicitly state that not all formal combinations are possible and that
explaining why is outside the paper's reported scope. Several important particles and
bisyllabic forms are excluded. The article therefore cannot validate a complete rank
table or productive cluster generator by itself.

## Exact collision audit

The collision ledger is:

`UC-RQ-013-SENTENCE-FINAL-PARTICLE-CLUSTER-COLLISION-AUDIT-R1.tsv`

### Runtime ordered-cluster table

The runtime assigns broad ranks to eight visible forms and accepts only separately
listed sequences after layer-order checks. This is an implementation heuristic with
some corpus/acceptability evidence, not a direct transcription of Sybesma and Li's
minimal-unit hierarchy. The two systems must not be equated without a particle-by-unit
and sequence-by-source audit.

### Generic particle wrappers

`DiscourseParticleFrame`, `FocusParticleFrame`, and `PolarQuestionFrame` preserve
scope or question structure but are explicitly representation-only. They can carry a
validated cluster analysis; they cannot license subtype meaning, ordering, or semantic
compatibility.

### `FormulaDiscourseUnit`

This label retains selected conventional expressions. Particle clusters are not
generally frozen formulas, though a particular lexicalized response may contain one.
Formula status cannot replace compositional cluster research.

## Required boundaries

Future research must distinguish:

- syllabic particles from proposed onset, rhyme, coda, and tone units;
- inner/lower from outer/higher scope and the resulting written order;
- structural ordering from semantic compatibility and pragmatic felicity;
- independently written particles from fused or bisyllabic forms;
- statement, question, imperative, evidential, focus, change-state, and epistemic hosts;
- attested sequences from merely hierarchy-compatible sequences;
- tone-specific forms hidden by shared characters or informal orthography;
- speaker, generation, Hong Kong/Guangzhou, and other Yue variation.

## Research tasks before any implementation proposal

1. Extract every source particle, proposed minimal unit, structural position, example,
   and rejected combination into a ledger.
2. Map each runtime descriptor to exact source forms without assuming current ranks.
3. Build an attested-sequence matrix separated from theoretical order compatibility.
4. Add excluded `tim1`, `sin1`, `lei4`, and bisyllabic particles only as research rows
   with their own sources.
5. Test reversed, semantically conflicting, and hierarchy-compatible unattested orders
   with multiple speakers and contexts.
6. Collect natural audio for tone, fusion, duration, and scope validation.
7. Propose implementation only after particle identity and pairwise/cluster boundaries
   are frozen.

## Provisional research outcome

| Question | Current answer |
|---|---|
| Is Cantonese particle-cluster order structurally constrained? | **Yes in the checked analysis.** |
| Does the source propose a semantic-unit hierarchy reflecting order? | **Yes.** |
| Does it explain every possible and impossible combination? | **No; explicitly incomplete.** |
| Do current generic wrappers constitute language evidence? | **No.** |
| Is the runtime rank table validated wholesale by this source? | **No.** |
| Is a dedicated research unit justified? | **Yes.** |
| Is parser implementation authorized? | **No.** |

## Exit conditions

UC-RQ-013 may leave active research only after one of these dispositions is justified:

- **typed cluster grammar:** particle identity, semantic units, order, compatibility,
  host, prosodic, and variation boundaries receive source-linked profiles;
- **compositional merge:** independently supported particle meanings and scope layers
  predict attested orders and exclude unattested ones without loss;
- **quarantine:** inventory, order, compatibility, speaker, or audio boundaries remain
  inadequate;
- **retire:** a complete collision audit proves existing representations sufficient.

Until then, current grammar statuses and parser behavior remain unchanged.
