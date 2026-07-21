# Canonical doctrine

## Goal

Build a broad, accurate, maintainable learner-facing parser for Cantonese as independently documented and naturally used. Linguistic accuracy and learner safety outrank parser neatness, label count, release velocity, fixture stability, implementation convenience, and source prestige.

## Claim classes

Every consequential parser statement must be one of:

1. **Cantonese language claim** — form, meaning, distribution, ambiguity, restriction, or productivity.
2. **Lexicalized-language claim** — a bounded conventional expression without a productivity claim.
3. **Shared parser subsystem rule** — reusable structural assembly such as NP composition.
4. **Parser representation** — an internal grouping or node name.
5. **Parser heuristic** — a defeasible operational rule.
6. **Evidence gap, quarantine, or retirement record**.

Language and lexicalized-language claims require external evidence. Shared subsystem rules require rule-level grounding in reference grammar, explicit structural scope, unseen-combination tests, and safeguards against converting fallback analyses into language claims. Internal representations and heuristics are not linguistic evidence.

## Source-origin rule

A new or promoted language claim must begin with independently checkable external propositions, not parser behavior. Record the exact source, locator, supported proposition, limitations, and relationship to the parser claim.

A source citation is not accepted merely because it appeared in an earlier project record. Every provisional and previously accepted construction must undergo retroactive source re-verification.

Code, parser output, fixtures, generated probes, regression success, learner usefulness, and raw corpus searches cannot create a language claim. They may test a source-originated design or identify a research question.

## Evidence-scope rule

- Attestation proves occurrence in the documented context; it does not by itself prove productivity, frequency, dialect-wide naturalness, or the parser's preferred structure.
- A narrow supported subtype does not promote a broad compatibility label.
- Source quantity cannot compensate for dependence, weak locators, copied examples, or mismatched scope.
- Pedagogical sources may support explicit teaching analyses and examples, but should not alone establish unrestricted productivity.
- Project corpora may expose natural usage and parser failures, but cannot independently establish productivity.
- Raw corpus hit counts have no evidence weight. Each counted example must be manually reviewed and classified.

## Structural generalization versus construction claims

General phrase assembly and evidence-gated construction semantics are separate layers.

A reusable NP subsystem may generalize over valid structural patterns without requiring a separate citation for every noun or every sentence. Its rules must be grounded at the pattern level and tested on unseen lexical items and unseen combinations. The lexicon supplies irreducibly lexical facts such as tokenization, Jyutping, broad category, classifier identity, and independently justified lexical restrictions; it must not act as a whitelist of complete object strings.

A construction such as `VERB + 咗 + OBJECT_NP` may consume a licensed NP span without inheriting broader claims about verb productivity, aspectual meaning, completion, experiential readings, motion uses, object omission, or verb–object compatibility. Better NP assembly is parser correctness, not stronger linguistic evidence for the consuming construction.

Unknown or low-confidence nominal recovery may be represented as `provisional_np_candidate`, but it must not license an evidence-gated construction. See [`NOUN-PHRASE-SUBSYSTEM.md`](NOUN-PHRASE-SUBSYSTEM.md).

## Native-speaker requirement

A construction cannot become `supported_productive` until at least two independent native Cantonese speakers have reviewed the same relevant positive and negative contrasts. One speaker's judgment is useful evidence but is insufficient for productive acceptance.

Second-speaker work is currently frozen by the user. Preserve every unmet requirement visibly, but do not recruit, schedule, prepare new Speaker B packets, or request second-speaker work until explicitly unfrozen.

## Native-conflict escalation

When published analysis conflicts with recorded native-speaker naturalness, publication attestation proves only that the form was printed, elicited, or analyzed. The disputed family freezes until the conflict is investigated through independent sources, controlled contrasts, multiple speakers when available, relevant regional or contextual factors, negative boundaries, and competing analyses.

Do not invent dialect, register, or contextual explanations. A speaker judgment evaluates the presented sentence in its elicitation context; it does not by itself prove the parser's internal structure.

## Productive promotion

A `supported_productive` construction must be narrow and satisfy every item in [`DEFINITION-OF-DONE.md`](DEFINITION-OF-DONE.md). Internal render, regression, or held-out success can establish implementation consistency only. They cannot raise linguistic confidence without independent source and speaker evidence.

No prior acceptance is grandfathered. A formerly accepted construction remains `provisional_reaudit` until it passes the current standard again.

## Productive-program endpoint

The target is complete and honest resolution, not promotion of every runtime label. Every surviving productive public-language construction should eventually be either a narrow `supported_productive` claim or an explicitly bounded nonproductive claim. Internal wrappers, heuristics, aliases, duplicates, dead labels, and misanalyses must remain non-licensing, merge, decompose, or retire.

A smaller registry can represent progress when broad or unsupported labels are removed.

## Parser integrity

- Never insert hidden subjects, objects, nouns, resources, propositions, results, activities, or connectives.
- Preserve ambiguity when evidence does not determine a unique analysis.
- Internal wrappers and provisional fallback spans cannot independently license evidence-gated constructions.
- Compatibility aliases cannot broaden an accepted subtype.
- Learner-facing simplification must remain materially true.
- Regression results are change signals, not linguistic authority.
- Vocabulary and Jyutping additions do not count as grammar evidence.
- Negative and boundary cases must remain executable tests.
- Structural subsystems must be tested on unseen lexical items and combinations, not only motivating examples.

## Code and documentation

Runtime heuristics are the ground truth for what the parser currently checks. Documentation must describe those checks accurately. When code and documentation disagree, fix one and revalidate.

Status metadata is separate from parse behavior. From v0.5.185, linguistic status exists only in `grammar/*.md`; `main.js` stores active labels, not a duplicate status registry. Retired labels are absent from the active runtime registry. A label/note mismatch blocks release.

## Work-product discipline

Work is measured by changed parser behavior, executable tests, verified evidence, a defensible status change, an actual retirement, or a binding design decision that directly enables implementation. Avoid parallel ledgers and repetitive validation summaries that merely restate unchanged information.

Record meaningful work as a Git commit and export the full repository including `.git/` outside the sandbox. Plugin ZIPs are installation artifacts, not project-state records.

## Autonomous governance

The assistant may autonomously research, specify, implement, validate, revise, quarantine, retire, commit, and export changes under this doctrine. Separate user approval is not required for each family.

User participation is required when evidence cannot be created internally without compromising independence, especially native-speaker review and user-visible Obsidian rendering. Frozen work must remain visibly deferred rather than silently waived.
