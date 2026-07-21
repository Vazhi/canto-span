# Canto Span v0.5.182 runtime acceptance and current linguistic status

## Software status

v0.5.182 remains the accepted software runtime. Its parser behavior, rendered output, regression results, and consumed held-out results remain valid records of what that release implemented and tested.

## Superseded linguistic classification

The v0.5.182 release originally classified two narrow constructions as `supported_productive`:

- `PostverbalZoPerfectiveVP`
- `ResourceUseLaiFunctionRelation`

Those classifications are no longer current. Both are now:

`provisional_reaudit`

No construction currently counts as `supported_productive`. The controlling requirements are in `docs/current/DEFINITION-OF-DONE.md`.

## Reason for reclassification

The current standard applies retroactively and does not grandfather earlier acceptance. The two constructions have not yet completed all of the following:

- independent re-verification that every cited source exists and supports the exact claim;
- manual re-review of corpus or natural examples before counts carry evidence weight;
- review of the same relevant positive and negative contrasts by at least two independent native Cantonese speakers;
- a current code-document comparison under the revised claim;
- confirmation that linguistic confidence is not being inferred from render, regression, or held-out completion.

## What remains valid

The prior render, regression, negative-boundary, and held-out results remain implementation evidence. They do not establish linguistic productivity by themselves.

The narrow scopes and exclusions remain useful provisional hypotheses:

- `PostverbalZoPerfectiveVP`: simple overt action predicate + postverbal 咗 + overt nominal object, excluding broad perfective, result, completion, motion, and hidden-argument claims.
- `ResourceUseLaiFunctionRelation`: overt non-person resource + adjacent 用嚟/用來 + overt non-perfective action predicate, excluding separate-user, modal, copular, actual-use, instrumental, broad purposive, negated, and omission profiles.

## Historical record

The pre-realignment active acceptance file is preserved under:

`archive/checkpoint-history/v0.5.183-pre-evidence-standard-realignment/CANTO-SPAN-v0.5.182-ACCEPTANCE.md`
