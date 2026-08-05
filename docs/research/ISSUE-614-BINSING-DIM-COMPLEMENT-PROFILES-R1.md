# ISSUE-614 變成 wh-complement profile disposition R1

Parent issue: #614  
Work claim: #615  
Date: 2026-08-05

## Decision

Retain AA11 `BinSingDimWhComplementVP` narrowly as the exact source-linked profile:

```text
變成 + 點
```

The construction asks about the resulting state or outcome after change. It does not own the outer subject, topic, higher modal, condition, embedding, quotation, question frame, or sentence-final particle.

Do not broaden AA11 automatically to all complements of lexical `變成`. This review directly attests `點樣`, `乜嘢`, nominal results, aspect-marked nominal results, and `變…做` transformation surfaces, but those profiles differ in wh dimension, category, order, and composition.

## Profile dispositions

| Profile | Disposition | Reason |
|---|---|---|
| exact `變成 + 點` | `RETAIN_AS_AA11_CORE` | Direct coursebook evidence and corroborating contemporary usage support a lexical change predicate followed by a wh expression asking the resulting state/outcome. |
| `變成 + 點樣` | `ATTESTED_NEIGHBORING_WH_PROFILE` | Direct contemporary Cantonese attestation exists, but identity with `點` is not established. Preserve separately pending controlled contrasts. |
| `變成 + 乜嘢` | `ATTESTED_RESULT_IDENTITY_WH_PROFILE` | Official quoted Cantonese asks what entity/category the referent becomes. The semantic question differs from result-state `點`. |
| `變成 + NP` | `SUPPORTED_LEXICAL_RESULT_COMPLEMENT_OUTSIDE_AA11` | Current lexical evidence directly attests nominal results such as `變成大富翁`. |
| `變成咗 + NP` | `SUPPORTED_ASPECTUAL_LEXICAL_PROFILE_OUTSIDE_AA11` | Independent current examples place perfective `咗` after `變成` and before the nominal result. |
| `變 + 咗／緊 + 做 + NP` | `SUPPORTED_SEPARATE_TRANSFORMATION_STRATEGY` | Overt aspect and `做` distinguish the surface from lexical `變成`; no normalization to AA11 is justified. |
| `成為 + NP` | `SUPPORTED_SEPARATE_LEXICAL_STRATEGY` | Separate lexical verb and aspect behavior; not an alias of AA11. |
| two-verbal-element causative-resultative | `SEPARATE_CRC_FAMILY` | Peer-reviewed research establishes independent cause/result, potential, argument, and word-order properties. |
| resultative or potential complement | `SEPARATE_RESULT_COMPLEMENT_FAMILY` | Shared change/result meaning does not transfer AA11 identity. |
| omitted complement after `變成` | `DISCOURSE_DEPENDENT_UNRESOLVED` | No context-free core is established without overt result material. |
| generic `變成 + result complement` | `REAL_LEXICAL_VALENCY_NOT_ONE_AA11_CONSTRUCTION` | Nominal and multiple wh complements are attested, but their structural and semantic differences require ordinary lexical composition or later family research. |

## Meaning of `點` in AA11

The accepted example is:

```text
成個社會會變成點？
```

The question is not “which nominal entity will society become?” It asks about the resulting condition, state, or outcome. The parser should therefore avoid coercing `點` into an NP simply because ordinary `變成` also takes nominal results.

The available evidence does not force one theory-specific category for `點`. A theory-neutral implementation may record:

- overt lexical head `變成`;
- overt wh result material `點`;
- result-state/outcome question semantics;
- separate question force;
- no hidden result argument.

## Current runtime comparison

Canonical source inspected:

- `src/parser/detectors/complements/result.js`

### Exact source-linked wrapper

`wrapChangeIntoPredicateSubspans` currently emits the legacy `ChangeIntoPredicate` node only for exact adjacent tokens:

```text
變成 + 點
```

This is aligned with the accepted AA11 core and appropriately excludes nominal results, aspectual `變成咗`, and `變咗做` by surface form.

### Generic helper description

`makeChangeIntoPredicate(changeNode, complement)` creates a node with the generic trace template:

```text
change_verb + result_complement
```

The current wrapper calls it only for `變成 + 點`, so the helper does not presently implement broad lexical valency. Its generic name, note, slots, and template nevertheless overstate the supported runtime identity and could be reused unsafely by later code.

A later implementation should either:

1. rename or constrain the helper to the exact AA11 profile; or
2. keep a generic internal lexical-composition helper clearly separate from the public AA11 identity and require profile-specific callers.

It must not expose every nominal or wh complement as AA11 merely because the helper accepts a `complement` argument.

## Current test comparison

Canonical test inspected:

- `tests/constructions/ChangeIntoPredicate.json`

Current coverage contains:

- one positive: `成個社會會變成點？`;
- one aspectual transformation boundary: `佢變咗做老師。`;
- one causative-resultative boundary: `佢整冧咗間屋。`.

This verifies the original repair but does not close the actual lexical and wh-complement boundary inventory.

A later implementation test package should add:

### Positive AA11 cells

- exact `變成 + 點` without outer material;
- overt subject + AA11;
- higher modal + AA11 while keeping the modal outside;
- embedded or quoted AA11 while preserving the embedding frame;
- final question particle outside the narrow node;
- tokenization and punctuation variants that retain exact overt material.

### Neighboring wh profiles that must not silently become AA11

- `變成 + 點樣`;
- `變成 + 乜嘢`;
- `變成 + 點樣嘅 NP`;
- other wh words without direct profile evidence;
- incomplete `變成點…` repairs or quotations.

These should parse compositionally or remain unresolved, not be deleted or normalized.

### Lexical-result and aspect boundaries

- `變成 + NP`;
- `變成咗 + NP`;
- `變 + 咗 + 做 + NP`;
- `變 + 緊 + 做 + NP`;
- `成為咗 + NP`;
- bare `變 + property`;
- complement omission requiring discourse.

### Resultative-family boundaries

- two-verb causative-resultatives;
- resultative particles;
- potential result forms;
- directional/result combinations;
- disposal or passive/causative frames containing change/result material.

## Span and composition contract

A future AA11 implementation should:

1. begin at overt `變成` and end at overt `點`;
2. preserve both visible elements without inserting a nominal result;
3. annotate a result-state/outcome wh relation without deciding a disputed formal category;
4. keep subject, topic, modal, condition, embedding, quotation, focus, negation, question frame, and particles outside unless separately licensed;
5. reject or preserve as neighboring composition all nonexact complements;
6. avoid matching through intervening aspect, modifiers, unknown text, repairs, or clause material;
7. keep generic lexical `變成 + complement` composition separate from the permanent AA11 identity.

## Identity consequence

AA11's current UUID and canonical name remain appropriate for the exact `變成 + 點` profile. No split, merge, rename, or new UUID is authorized here.

However, direct evidence now confirms a broader lexical complement family. A later identity adjudication may ask whether:

- `點` and `點樣` are variants within one wh-result family;
- `乜嘢` is a distinct result-identity profile;
- ordinary `變成 + NP` needs only lexical/transitive composition;
- a family-level ontology can group these profiles without transferring evidence or collapsing their nodes.

Until that adjudication, AA11 remains exact and narrow.

## Terminal outcome

- AA11 exact `變成 + 點`: `RETAIN_NARROWLY`.
- Current exact runtime wrapper: `SOURCE_ALIGNED`.
- Generic helper wording: `OVERBROAD_INTERNAL_DESCRIPTION_REQUIRES_CONSTRAINT`.
- `變成 + 點樣`: `ATTESTED_NEIGHBORING_PROFILE_NOT_AA11_BY_DEFAULT`.
- `變成 + 乜嘢`: `ATTESTED_DISTINCT_WH_DIMENSION_NOT_AA11_BY_DEFAULT`.
- `變成 + NP`: `SUPPORTED_LEXICAL_COMPLEMENT_OUTSIDE_AA11`.
- `變成咗 + NP`: `SUPPORTED_ASPECTUAL_PROFILE_OUTSIDE_AA11`.
- `變…做 + NP`: `SUPPORTED_SEPARATE_STRATEGY`.
- two-verb resultatives: `SEPARATE_CRC_FAMILY`.
- New UUID: no.
- Status promotion: no.
- Runtime change in this packet: no.

## Next separately claimed action

After this packet merges, one Codex-eligible accepted-specification task may:

1. retain the exact `變成 + 點` wrapper;
2. constrain or rename the generic helper so it cannot broaden AA11 accidentally;
3. make outer subject/modal/question structure visibly separate;
4. add the controlled boundary matrix above;
5. preserve attested `點樣`, `乜嘢`, nominal, aspectual, and `變…做` profiles without assigning them AA11;
6. regenerate runtime outputs and run relevant checks;
7. make no identity or linguistic-status change.

## Protected-state confirmation

This packet changes no runtime behavior, parser matcher, construction test, fixture, identity, code, linguistic status, corpus classification, survey, panel, held-out, release, package, or deployment state.

## Source inventory

See `docs/research/ISSUE-614-BINSING-DIM-SOURCE-INVENTORY-R1.md`.
