# Full-repository label sweep protocol R1

## Scope

The sweep covers every permanent identity in `data/construction-identities.json`:

- 133 current runtime construction records;
- 48 retired construction labels;
- 181 total permanent identities at bootstrap.

Assigning UUIDs and short codes does not validate any existing name, analysis, implementation, status, or retirement.

## Review objective

For every permanent identity, determine whether the current canonical name accurately describes:

1. the behavior the parser actually recognizes;
2. the construction or internal representation supported by the strongest available evidence;
3. the exact subtype represented by this record rather than its wider family;
4. the appropriate learner-facing grouping.

A behavior–research mismatch is a substantive defect. It may require changing the implementation, narrowing or splitting the record, renaming it, internalizing it, or superseding it.

## Mandatory review fields

Every registry record must eventually resolve:

- `claim_layer`;
- `family_name`;
- `profile_name`;
- `profile_description`;
- `learner_label` or an explicit presentation exemption;
- `source_terms` with source and scope match;
- `label_review.behavior_research_alignment`;
- `label_review.terminology_alignment`;
- `label_review.recommended_action`;
- `label_review.review_notes`.

## Evidence order

For a language-level record:

1. inspect exact runtime constructors, fallbacks, slots, guards, and emitted spans;
2. inspect positive, boundary, and implementation-only tests;
3. identify the strongest scope-matched Cantonese research;
4. record terminology used by each strong source;
5. compare the source-defined construction with runtime behavior;
6. inspect collisions with current, retired, alias, and internal records;
7. choose the narrowest defensible canonical name;
8. assign the learner-facing label last.

For an internal parser representation, replace the external-research step with a stable semantic-contract review. Internal nodes require defined invariants, serialization meaning, and explicit nonlicensing behavior.

## Naming rule

Do not automatically copy the term from one paper. Prefer source terminology when strong sources converge and its scope matches the record. Otherwise use a theory-neutral structural name and retain research terms as source-linked aliases.

The canonical name must not be broader than either the implementation or its evidence. A technically accurate name for a bad matcher does not cure the matcher; the behavior must also receive a disposition.

## Review batches

### Batch A — internal representations

Review current and retired parser-heuristic/internal records first. Determine which are stable semantic nodes, compatibility aliases, diagnostics, transparent wrappers, or accidental language claims.

### Batch B — retired records

Apply the retired-label research sweep and verify that every genuine constructional question has an active research home. Keep old exact fallbacks retired unless separately justified.

### Batch C — current unsupported generalizations

For each current `unsupported_generalization`, compare the exact runtime surface with the strongest research and choose retain-narrow, rename, split, internalize, quarantine, supersede, or retire.

### Batch D — current research-pending records

Check that `research_pending` names do not already overstate the research question. A pending status does not make a misleading ontology harmless.

### Batch E — lexicalized-only records

Confirm that lexicalized records are genuinely bounded expressions and do not conceal productive construction families or generic token triggers.

## Disposition meanings

- `retain` — name, scope, behavior, and evidence align.
- `rename` — identity remains the same; terminology changes.
- `narrow` — identity remains only if the narrower profile is still the same construction record.
- `split` — original identity becomes superseded; new UUIDs represent distinct constructions.
- `merge` — preserve predecessor identities and aliases while selecting one successor record.
- `internalize` — retain as parser representation, not a Cantonese language claim.
- `supersede` — preserve identity historically and point to replacements.
- `quarantine` — keep resolvable but prevent grammar licensing pending repair.
- `keep_retired` — old label and behavior remain retired; research is adequately represented elsewhere.
- `reopen_research` — old runtime behavior remains retired, but a canonical research record is required.

## Split and merge safeguards

A rename never creates a new UUID. A genuine construction split always creates new UUIDs. The predecessor retains its code and becomes `superseded` with successor links.

A merge must not delete predecessor identities. The successor stores predecessor UUIDs, and former names remain searchable aliases.

## Automatic flags

Automatic flags in `data/construction-label-sweep.json` only prioritize review. They must not directly trigger renaming, retirement, or promotion.

Current bootstrap flags include:

- generic heads requiring explicit boundaries;
- possible bundled or cross-layer names;
- possible multi-layer construction bundles;
- semantic-domain names requiring structural review;
- internal-representation naming review;
- unsupported-generalization reconciliation;
- retired-label research-home checks.

## Completion gates

The full sweep is complete only when:

1. all 181 bootstrap records have `review_state: complete`;
2. every language record has an explicit behavior–research alignment result;
3. every internal record has a stable semantic contract or a retirement/supersession decision;
4. source terminology is recorded without making names permanent keys;
5. all renames preserve UUID, code, and former names;
6. all splits and merges preserve predecessor/successor links;
7. learner labels are either assigned or explicitly exempted;
8. no retired genuine construction lacks a canonical research home;
9. the identity generator, lock, sweep, and repository verification pass;
10. implementation changes are handled in bounded follow-up commits with ordinary parser and release verification.
