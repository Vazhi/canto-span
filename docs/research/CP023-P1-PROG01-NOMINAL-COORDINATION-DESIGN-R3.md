# CP023-P1-PROG01 coordinated nominal design — R3

Date: 2026-07-20  
Status: **design frozen for overt `同埋`; implementation and promotion not authorized**  
Accepted runtime: **v0.5.182**, unchanged

## Existing runtime and research state

The runtime already contains `CoordinatedNP` for exactly `NP + 同 + NP`. CP021B-R32 correctly found that this is only one part of the coordination system and that `同` is also comitative/coverb material. R2 demonstrated that `NP + 同埋 + NP` receives no coordinated nominal top construction and that `問緊報告同埋文件` closes the progressive object after the first conjunct.

The grammar synopsis gives the general pattern `XP → XP 同埋 XP` and explicitly illustrates NP coordination. The official water-inquiry transcript independently attests `問緊錫條同埋錫線`.

## Frozen extension

Extend the existing internal `CoordinatedNP`; do not create a second public label for `同埋`.

Required shape:

`CoordinatedNP(left_np, coordinator=同埋, right_np)`

The coordinator remains overt and atomic in the learner-visible tree. It must not be normalized to `同`, even though the grammar synopsis notes related use.

## Structural guards

- Both conjuncts must independently be complete nominal expressions or explicitly quarantined lexical/domain-term candidates.
- `同埋` alone, initial `同埋 NP`, or final `NP 同埋` cannot license coordination.
- Clause and VP coordination remain separate; the nominal rule cannot coordinate arbitrary predicates or clauses.
- Bare `同` retains its existing conjunction/comitative ambiguity and is not resolved by token identity alone.
- Clause role is external: `CoordinatedNP` is internally role-neutral; subject, topic, or object status comes from the containing construction.
- Unmarked juxtaposition remains outside this implementation package.

## Progressive integration

Nominal coordination must assemble before a future progressive whole-object wrapper:

`PostverbalGanProgressiveVP(問, 緊, CoordinatedNP(報告, 同埋, 文件))`

A progressive span ending after the first conjunct is invalid for the narrow subtype. Structural development should use pronunciation-safe nouns such as `報告同埋文件`; `錫條同埋錫線` remains a natural-attestation record but `錫條` is quarantined from hard-coded Jyutping until exact compound pronunciation is verified.

## Preservation cases

- existing `NP 同 NP` coordination;
- standalone `我同你` coordinated-NP fragment analysis;
- comitative/coverb readings where `同` precedes an NP inside a larger predicate;
- additive discourse/clause uses of `同埋` that are not nominal coordination;
- inherited aggregate regression.

## Legitimacy disposition

This source-backed design justifies an isolated implementation candidate for overt `同埋` nominal coordination. It does not by itself promote broad `CoordinatedNP` to `supported_productive`, establish unmarked juxtaposition, or settle all `同` ambiguity.
