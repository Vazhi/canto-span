# CP024-P0 L45 valency decomposition freeze R1

Date: 2026-07-20  
Runtime behavior changed: **no**

## Finding

`ProductiveVO`, `TransitiveVP`, and `IntransitiveVP` cannot responsibly be promoted as productive Cantonese constructions in their current form. They combine at least five different claims:

1. lexical or sense-specific ability of a predicate to take an argument;
2. complement type and semantic relation;
3. overt versus omitted argument realization;
4. discourse licensing of omission or ellipsis;
5. parser span grouping.

The runtime inventory contains **113** verb-like entries selected by broad syntax tags. Profile counts are:

- transitive-tagged: **20**
- intransitive-tagged: **2**
- ditransitive-tagged: **2**
- generic action-tagged without a more explicit valency tag: **4**
- verb-like entries with no general valency tag: **85**

These tags are implementation provenance, not independent linguistic evidence. Many verbs are polysemous or alternate across uses, and a token-level tag cannot prove that every adjacent NP is its object.

## Frozen replacement architecture

### Internal layer

A non-licensing `PredicateUseProfile` may record sourced use-specific compatibility:

- predicate surface and sense;
- complement category;
- semantic relation;
- overt/omitted realization;
- construction and register restrictions;
- supporting source locators;
- negative boundaries and conflicts.

The registry cannot itself create a VP or argument relation.

### Language-construction layer

Productivity is established by narrow constructions that state their own selection conditions, such as:

- consumption predicate + edible theme;
- perception predicate + perceptual-content/theme NP;
- placement predicate + theme + location/result relation;
- transfer predicate + theme + recipient relation;
- speech predicate + content or addressee relation;
- objectless activity use when independently documented;
- licensed discourse omission or fragment relation in a separate packet.

### Dispositions

- `ProductiveVO`: retire as a public productive claim; preserve only as a temporary compatibility alias over accepted narrow relations.
- `TransitiveVP`: retire public umbrella after dependent constructions are migrated.
- `IntransitiveVP`: retire public umbrella after objectless uses and omitted-object cases are separated.
- `action_verb`, `transitive_affordance`, and related tags: keep as parser heuristics until replaced by sourced use profiles; they cannot license promotion.

## Migration order

1. inventory current tags and every constructor that consumes them;
2. map each dependent constructor to an exact argument relation or mark it heuristic-only;
3. add non-licensing tests proving the internal registry cannot create grammar;
4. migrate one narrow family per locked packet;
5. retire umbrellas only after all accepted dependents have explicit provenance.

## Standards consequence

This decomposition may initially reduce the number of public grammar labels. That is progress: it prevents three broad heuristics from being mistaken for supported grammar and makes later aspect, result, serial, cognition, speech, and fragment promotions independently testable.
