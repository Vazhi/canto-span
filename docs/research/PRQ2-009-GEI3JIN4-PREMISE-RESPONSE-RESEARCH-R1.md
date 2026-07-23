---
title: PRQ2-009 — gei3 jin4 premise-response research
research_id: PRQ2-009
status: active_research_unit
baseline_version: 0.5.213
created: 2026-07-23
implementation_authorized: true
status_change_authorized: false
---

# PRQ2-009 — `既然` causal premise and advisory response

## Revised research decision

Retain a bounded, research-only Cantonese profile:

```text
既然 + CAUSALLY-RELEVANT PREMISE，
不如 + ADVISORY / PROPOSAL RESPONSE
```

Yip and Matthews explicitly describe `既然 gei3 jin4` as a more formal
Cantonese conjunction meaning causal “since.” Their checked examples pair the
premise with `不如` responses:

```text
既然你考唔到入大學，不如搵嘢做啦？
既然你唔再愛我，不如分手啦。
```

The source also distinguishes this causal use from temporal “since,” for which
it directs readers to `自從` instead.

This supports a narrow construction-level research target in which:

1. `既然` introduces a proposition treated as relevant background for a
   following response;
2. the checked relation is causal or justificatory rather than temporal;
3. the premise precedes the response;
4. `不如` introduces an advice, proposal, or practical recommendation in the
   two source-checked examples; and
5. the register is described as more formal than colloquial `橫掂`.

The source does **not** establish every response marker, every speech act,
mandatory acceptance or factivity under disagreement, free omission of a
response connective, interrogative scope, ellipsis, prosody, frequency, or
cross-regional uniformity.

The previous broad premise-response claim is therefore narrowed. Dictionary
examples and authored dialogue remain useful attestations, but they do not
independently establish a general family covering opinions, questions,
imperatives, decisions, requests, and arbitrary response markers.

This evidence repair authorizes no additional parser change,
construction-status change, lexical installation, executable fixture, survey
instrument, or broader automatic acceptance rule.

## Supported bounded core

The conservative directly supported profile is:

```text
既然 A，不如 B
```

where:

- `A` is presented as a causally relevant premise;
- `B` is an advisory or proposal response;
- the premise precedes the response; and
- the relation is not the temporal meaning “ever since A.”

The checked examples contain different predicate types and negative material,
but two examples do not establish unrestricted productivity across all clause
classes.

## Existing implementation status

A pre-existing runtime slice recognizes clause-initial, comma-delimited
`既然 A，B` with nonempty members and response profiles that may be unmarked or
begin with `就`, `噉／咁`, `不如`, or `等我`.

After regrading, only the causal `既然 A，不如 B` advisory/proposal profile has
qualifying construction-level support. The other implemented response profiles
remain attestation-backed only. Their presence in the runtime is a Step 5
implementation-to-evidence audit item, not evidence that the broader family has
been established.

This repair does not expand or otherwise change the runtime.

## Attested extensions requiring stronger analysis

Existing secondary sources attest or describe additional profiles involving:

- an unmarked response;
- `噉／咁` introducing the response;
- `等我` introducing a volunteered action;
- a bare imperative;
- opinion or inference responses;
- questions following the premise.

These remain attested research questions only. The available lexicographic and
authored-dialogue evidence does not determine whether they instantiate one
productive construction, several discourse strategies, register-specific
patterns, or context-dependent ellipsis.

## Required contrasts

Keep the bounded family separate from:

```text
橫掂 A，不如 B       colloquial “since ... anyway” profile
因為 A，所以 B       explicit causal explanation-result relation
如果 A，就 B         hypothetical conditional
既然 A，自從 B       invalid conflation of causal and temporal “since”
自從 A 以嚟，B       temporal “ever since” profile
反正 A，B            “in any case / anyway” discourse relation
```

The surface word `既然` alone is not enough to infer an advisory response.
Analysis must preserve the actual following clause and its discourse function.

## Sources

See
`PRQ2-009-GEI3JIN4-PREMISE-RESPONSE-SOURCE-VERIFICATION-R1.tsv`.

Evidence roles after review:

- Yip and Matthews, *Intermediate Cantonese*, Unit 19:
  `REFERENCE_GRAMMAR_CORE` for the bounded causal `既然 A，不如 B` profile,
  formal-register note, and causal-versus-temporal boundary.
- Words.hk, Wenlin, and the Education Bureau drama:
  `ATTESTATION_ONLY` for additional response types.
- CantoDict: `LEXICAL_OR_PRONUNCIATION_ONLY`.
- Runtime probes: `RUNTIME_OBSERVATION_ONLY` with zero linguistic-evidence
  weight.

No dedicated Cantonese paper analyzing the full response-marker inventory was
recovered in this pass. General Chinese or Mandarin work cannot establish the
Cantonese-specific distribution without independent Cantonese evidence.

## Runtime collision result

See
`PRQ2-009-GEI3JIN4-PREMISE-RESPONSE-COLLISION-AUDIT-R1.tsv`.

The companion audit is a frozen pre-implementation observation: runtime
0.5.213 originally supplied only generic `ClauseLink` or `ClauseRel` coverage
and did not identify `既然`, the premise, the response, or their relation. The
current runtime subsequently added the broader clause-initial slice described
above.

Both the frozen probes and current runtime behavior are implementation
diagnostics only. They add no linguistic support.

## Open boundaries

- whether `就`, `噉／咁`, `不如`, `等我`, or no marker form one family;
- factual, accepted, accommodated, and challenged premises;
- advice, inference, decision, request, imperative, and question responses;
- subject placement, negation, modality, particles, and interrogative scope;
- ellipsis, discourse recovery, prosody, register, and regional variation;
- exact differences among `既然`, `橫掂`, `因為`, and `反正`.

## Disposition

**Bounded causal-premise plus `不如` advisory-response core supported by an
explicit Cantonese reference-grammar analysis. The existing broader runtime
slice is retained unchanged by this repair but requires implementation-to-
evidence audit for every response profile outside that bounded core. Broader
extensions and status changes remain unauthorized.**
