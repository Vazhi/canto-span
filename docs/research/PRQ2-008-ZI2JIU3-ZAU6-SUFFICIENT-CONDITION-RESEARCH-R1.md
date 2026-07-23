---
title: PRQ2-008 — zi2 jiu3 zau6 sufficient-condition research
research_id: PRQ2-008
status: active_research_unit
baseline_version: 0.5.213
created: 2026-07-23
implementation_authorized: true
status_change_authorized: false
---

# PRQ2-008 — `只要 … (就) …` sufficient condition

## Revised research decision

Retain a bounded, research-only Cantonese sufficient-condition profile:

```text
只要 + CONDITION，
(SUBJECT) + (就) + CONSEQUENCE
```

The strongest external support is Yip and Matthews' explicit treatment of
Cantonese sufficient conditions. Their checked examples establish:

- `只要` introducing a sufficient condition;
- condition-before-consequence order;
- a paired consequence with `就`;
- a consequence without overt `就` in at least one conventional profile;
- different subjects across the two clauses;
- modal and negative consequences.

This supports a bounded construction-level research target. It does **not**
establish unrestricted omission of `就`, every consequence marker, every clause
or speech-act type, fragment completion, discourse-spanning ellipsis, prosody,
frequency, or cross-regional uniformity.

The previously broader core claim is therefore narrowed. Teaching examples, a
drama script, and three incidental HKCanCor contexts remain useful attestations
and research prompts, but they do not carry independent core or productivity
weight.

This evidence repair authorizes no additional parser change,
construction-status change, lexical installation, executable fixture, survey
instrument, or broader automatic acceptance rule.

## Supported bounded core

The reference grammar gives these Cantonese profiles:

```text
只要有手有腳，唔使驚餓死嘅。
只要佢肯講句對唔住，我就會原諒佢。
```

These support the following conservative description:

1. `只要` marks the antecedent as a condition sufficient for the following
   consequence.
2. The condition precedes the consequence in the checked Cantonese pattern.
3. `就` can mark the consequence, after its subject and before the predicate.
4. At least one source-checked consequence occurs without overt `就`; this is an
   attested profile, not a license to delete `就` freely in every environment.
5. The condition and consequence may have different understood or overt
   subjects.
6. Consequences may include modal or negative material.

## Existing implementation status

The pre-existing authorization and runtime slice remain limited to the overt,
comma-delimited `只要 A，就 B` core with adjacent `只`+`要`, overt `就`, internal
`sufficient_condition` metadata, and empty-member guards. That implemented slice
falls inside the bounded source-supported profile.

No-`就`, discourse-spanning, fragmentary, and broader consequence-marker
profiles remain deferred. This repair does not expand the implementation.

## Attested extensions requiring stronger analysis

The existing source package also contains examples of:

- temporal or generic consequences;
- wh-indeterminate material with `都`;
- fragmentary `只要` turns;
- a consequence supplied in a following discourse turn;
- additional no-`就` surfaces.

These profiles are retained as attested research questions only. The available
teaching and corpus material does not determine whether they reflect ordinary
marker optionality, discourse ellipsis, a fragment construction, prosodic
licensing, another consequence marker, or a different relation recoverable from
context.

## Required contrasts

Keep this bounded family separate from:

```text
如果 A，就 B          ordinary/hypothetical conditional
只有 A，先至／先 B    necessary condition
除非 A，否則／如果唔係 B  exception conditional
就算 A，都 B          concessive conditional
只 + constituent       restrictive focus
要 + VP                modal or lexical requirement
```

The surface characters `只要` alone are insufficient for classification.
Lexical or cross-layer `只 + 要` analyses must remain available where a
condition–consequence relation is absent.

## Sources

See
`PRQ2-008-ZI2JIU3-ZAU6-SUFFICIENT-CONDITION-SOURCE-VERIFICATION-R1.tsv`.

Evidence roles after review:

- Yip and Matthews: `REFERENCE_GRAMMAR_CORE` for the bounded sufficient-condition
  profile and the exact contrasts described above.
- Hong Kong Vision and the Education Bureau drama: `ATTESTATION_ONLY`.
- HKCanCor extraction: `PRIMARY_CORPUS_ATTESTATION`, supporting occurrence but
  not productivity or full syntax.
- YellowBridge: `LEXICAL_OR_PRONUNCIATION_ONLY`.
- Runtime probes: `RUNTIME_OBSERVATION_ONLY` with zero linguistic-evidence
  weight.

No direct Cantonese paper dedicated to `只要…就…` was recovered in this pass.
General or Mandarin research on `只要` may guide comparison, but it cannot
establish Cantonese-specific syntax or marker distribution.

## Runtime collision result

See
`PRQ2-008-ZI2JIU3-ZAU6-SUFFICIENT-CONDITION-COLLISION-AUDIT-R1.tsv`.

The companion audit is a frozen pre-implementation observation: runtime
0.5.213 originally lacked a dedicated sufficient-condition analysis and used
generic `ClauseRel` coverage. The current narrow slice records
`sufficient_condition` on overt paired cores while retaining the underlying
`conditional` relation type.

Runtime observations identify implementation state only. They add no linguistic
support.

## Open boundaries

- exact environments permitting no overt `就`;
- alternative consequence markers;
- wh-indeterminate-plus-`都` interaction;
- subject placement, negation, modality, particles, and speech act;
- discourse-spanning and fragmentary profiles;
- clause order, ellipsis, prosody, register, and regional variation;
- whether any apparent bare `只要 A` is a complete discourse act or requires a
  recoverable consequence.

## Disposition

**Bounded sufficient-condition research core supported by an explicit Cantonese
reference-grammar analysis. The existing overt `只要 A，就 B` implementation is
retained within that core. Broader extensions remain attestation-backed and
pending direct analysis; no additional implementation or status change is
authorized.**
