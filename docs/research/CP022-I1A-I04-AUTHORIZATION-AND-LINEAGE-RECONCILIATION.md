# CP022-I1A-I04 authorization and lineage reconciliation

Date: 2026-07-19  
Implementation parent: `CP021B-R37`  
Authorized packet: `EP-R37-I04` (`I04 NominalAndMeasureSpan`)

## Explicit authorization

The user explicitly authorized the previously proposed plan on 2026-07-19. The authorization is **packet-scoped**, not a global lifting of the grammar freeze.

Authorized:

- parser and registry changes required by `EP-R37-I04` only;
- retirement of `ModifierPhrase` as an active/public construction label;
- internal rename of `HeadNP` to neutral `NominalHeadSpan` with compatibility metadata only;
- bounded internal representation metadata for `MeasureExpression` and `DefinitionComplement`;
- visible packet testing, ordinary regression testing, and focused render preparation.

Not authorized:

- changes to any other canonical family or CP022 work package;
- new productive Cantonese grammar;
- opening the five prospective held-out cases before implementation and render review are frozen;
- accepting LX1 through this checkpoint;
- declaring the candidate accepted before render and hidden evaluation pass.

The global `GRAMMAR_LEGITIMACY_FREEZE` therefore remains `true`.

## Authoritative lineage

The authoritative implementation parent is:

```text
5973065720c219c274d97fc09a1dbaa7937c2f89c46f50d5a63bb8f22916be03  canto-span-clean-project-CP021B-R37-i04-evaluation-packet-locked.zip
```

This parent contains one coherent R37 packet: `EP-R37-I04`. Any earlier draft described as a six-packet R37 state is superseded and is not part of this implementation lineage.

The evaluator-custody archive remains external to the implementation project and was not opened:

```text
b0ea009f75039b8866756ae1c76cf815fb9d191d97a6362df71f987e65cee596  CP021B-R37-EVALUATOR-CUSTODY-DO-NOT-OPEN-DURING-IMPLEMENTATION.zip
```

## Next authorization boundary

No additional authorization is needed to finish the visible tests, render review, and hidden evaluation for this same I04 candidate. A new explicit authorization is required before changing parser behavior for any other family or packet.
