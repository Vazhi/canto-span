# CP023-P1-PROG01 predicate–progressive compatibility freeze — R3

Date: 2026-07-20  
Status: **evidence matrix frozen; no productive lexical class established**  
Accepted runtime: **v0.5.182**, unchanged

## Result

The evidence supports eight overt-object predicate/sense seeds: `睇`, `食`, `唱`, clothing `着`, `買` in the `買樓` extended-process reading, `整`, `問`, and `做`. Only `睇` and `食` have more than one independently documented object profile in this packet. The matrix therefore supports controlled pair- or sense-level implementation research, not a productive `action_verb × 緊 × NP` rule.

Objectless `嚟緊` and state-like `病緊` show that the current closed `action_verb` inventory is not an adequate linguistic model. They do not support the narrow overt-object subtype. The disputed `有 + V緊` and the cited future/modal contrast remain boundary records rather than positive or universal negative rules.

## Frozen evidence states

- `MULTIPLE_OBJECT_PROFILES_ATTESTED`: more than one source-linked object profile for the same predicate/sense; still not unrestricted.
- `EXACT_PAIR_ATTESTED`, `EXACT_PAIR_SENSE_SPECIFIC`, `EXACT_PAIR_EXTENDED_PROCESS`, `CORPUS_PAIR_ATTESTED`, `NATURAL_PAIR_ATTESTED`: exact combination evidence only.
- `BROAD_PROGRESSIVE_OUTSIDE_NARROW_TARGET`: supports broad progressive syntax but not `PostverbalGanProgressiveVP`.
- `CONTEXT_NEGATIVE_ONLY` and `UNRESOLVED_HAVE_PROGRESSIVE`: packet boundaries only.
- `VISIBLE_ONLY_NOT_EVIDENCE`: project probes that cannot enter a linguistic compatibility allowlist.

## Parser-facing model

A future implementation must store compatibility at the lexical-sense and construction-profile level, not as one boolean `action_verb` property. The minimum fields are:

- predicate surface and normalized lexical sense;
- source evidence state;
- attested argument profile;
- event-profile note or coercion note where explicitly sourced;
- excluded environments;
- source locators and limitations.

The model may use exact seeds for visible development, but unseen predicates or senses must remain broad/review-bearing until independent evidence or a genuinely source-backed productive class is established.

## Forbidden inferences

- No free cross-product of the eight predicates with every object NP.
- No extension from one sense to homographs or polysemous senses.
- No inference that all activities accept `緊`, or that states and achievements generally do.
- No conversion of source examples into natural-attestation counts unless the source identifies an independent occurrence.
- No categorical rejection of objectless, modal, future, or `有 + V緊` environments beyond the exact recorded boundary.
- No `supported_productive` promotion from this matrix.

## Decision

The predicate blocker is narrowed but not eliminated. A future candidate may implement an evidence-labeled seed layer and test exact source-backed combinations. Productive acceptance remains blocked until prospective evaluation demonstrates principled generalization beyond memorized pairs without overgeneration.
