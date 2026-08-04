# ISSUE-391 V得過 potential-standard assumption rereview R2

Parent issue: #391  
Prior packet: `docs/research/ISSUE-391-VDAKGWO-POTENTIAL-STANDARD-R1.md`  
Date: 2026-08-04

## Rereview result

R1 should not be treated as the terminal closure of #391.

R1 made a useful conservative move: it prevented the project from promoting a productive `V得過` construction from the limited evidence then cited. That conservative no-promotion result remains acceptable.

However, R1 overreached as a closure packet because it did not complete the issue's own evidence requirements. The parent issue requires a source-linked decision separating lexical, constructional, and compositional analyses, positive and negative boundaries, and identity/runtime consequences. It also identifies the need for primary-source research and a bounded corpus inventory before terminal disposition. R1 relied mainly on dictionary and lexical-entry evidence and did not provide the bounded corpus inventory or negative-control analysis.

## Corrected assumption review

### Supported by current evidence

- `信得過` is independently listed and attested as a Cantonese lexical reliability / trustworthiness predicate or adjective.
- `信唔過` is independently listed and attested as a Cantonese negative counterpart.
- `信唔信得過 + NP` is attested in the project trigger and has dictionary/example support as a lexical-predicate question profile.
- Parser output remains only a gap detector and has no linguistic-evidence weight.

### Not supported yet

- A productive open `V得過` reliability-standard construction.
- A new UUID or construction-status promotion.
- A runtime matcher or parser-behavior change.
- A general negative or A-not-A paradigm for arbitrary verbs with `得過`.
- Treating `過` here as definitively the same productive result complement across an open verb class.

### Still unresolved

- Whether `信得過` is best represented as a fixed lexical item, a semi-productive lexical family, or a transparent potential/result composition with lexical restrictions.
- Whether other predicates besides `信` form a comparable reliability/acceptability `V得過` family in Cantonese.
- How to distinguish reliability-standard `過` from experiential `過`, comparative `過`, and ordinary result-potential complements in this environment.
- Which object positions, complement types, polarity patterns, and A-not-A forms are actually licensed.
- Whether a future parser alignment should be lexicon-only, A-not-A composition over a lexical predicate, or a separately typed narrow construction.

## R1 disposition after rereview

R1 is retained as a conservative interim research note, not as final resolution.

The following R1 conclusions are safe:

- no new UUID from the current evidence;
- no productive `V得過` promotion from `信得過` alone;
- no runtime change from #391;
- `信得過` / `信唔過` are lexical evidence worth preserving.

The following R1 conclusions are too strong or incomplete:

- closing #391 as completed;
- implying that the lexical-only analysis is fully settled;
- treating the dictionary evidence as enough to satisfy the required bounded corpus and negative-control review.

## Required next research before closure

#391 should remain open until one of the following terminal outcomes is actually supported:

1. **Lexical-only terminal:** a bounded source/corpus review shows only `信得過` / `信唔過` or a very small closed lexical set, with no productive `V得過` profile worth modeling.
2. **Transparent-composition terminal:** evidence shows that the accepted potential/result structures plus lexical `信` explain the observed forms without a new identity.
3. **Narrow-construction terminal:** evidence shows a bounded, source-supported reliability/acceptability `V得過` profile across a defined predicate class, with positive and negative boundaries.
4. **Implementation-only route:** research remains lexical-only, but a separate implementation issue is opened to align parser output for `信得過` / `信唔過` and `信唔信得過 + NP` without claiming a productive construction.

## Source basis for this rereview

The rereview checked that current external lexical evidence supports `信得過` and `信唔過`, but did not find enough source diversity or corpus classification to close the broader productive-schema question.

External pointers reviewed:

- Wiktionary entry for `信得過` with Cantonese Jyutping and trustworthiness senses.
- CC-Canto/Jyut Dictionary and related Cantonese dictionary search evidence for `信得過`.
- CantoDict entry for `信唔過`.
- Words.hk / Jyut Dictionary examples containing `信唔過` and `信唔信得過`-type strings.
- General Cantonese `得` research remains relevant background but is not item-level proof of this exact `V得過` profile.

## Protected-state disposition

This rereview changes no runtime behavior, parser matcher, construction identity, linguistic status, source record, survey state, release state, or deployment state.

## Queue disposition

Keep #391 open. Do not close it until a later reviewed packet satisfies the issue's evidence endpoint or records a fully supported terminal null outcome.
