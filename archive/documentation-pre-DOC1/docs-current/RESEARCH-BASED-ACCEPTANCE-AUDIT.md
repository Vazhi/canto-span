# Research-Based Acceptance Audit

> **Current authority — 2026-07-17 / CP020R2-RA1:** `AUTHORITY-ORIGIN-AND-CLAIM-PROVENANCE.md` governs claim creation. Parser v0.5.174 is accepted after complete rendered review; there is no active candidate. Legacy claims remain nonproductive; future claims must emerge from independent evidence before parser design.

## 1. Purpose

The project has two controlled goals: remove or constrain unsupported legacy claims, and permit future coverage only when the language behavior emerges from independent external evidence before parser design.

The audit must prove, narrow, relabel, downgrade, quarantine, lexicalize, retire, or defer existing claims. It must expose where a runtime label is merely an engineering wrapper, where a fixed expression has been overgeneralized, and where accepted behavior lacks independent evidence.

## 2. Runtime and origin boundary

During a research batch:

- accepted parser behavior remains unchanged;
- unaccepted runtime candidates remain unaccepted;
- internal observations may open neutral questions but may not seed a preferred hypothesis;
- external propositions must be extracted before a future language claim is drafted;
- legacy claims without scoped external edges remain downgraded, quarantined, representation-only, lexicalized, or retirement candidates;
- no disposition is synchronized into runtime metadata without a separate implementation and acceptance record;
- parser probes are observational only.

Documentation, evidence ledgers, source-screening manifests, proposition extractions, claim-source edges, held-out sets, manual adjudication, parser-neutral validation, and explicit replacement mappings may proceed. A research/documentation checkpoint does not itself implement or authorize runtime change; the exact next implementation scope must be stated in `NEXT-PROGRAM.md`.

## 3. Question and audit unit

Before auditing or proposing a construction, register the phenomenon as an observable question. If the lead is internal, exclude the parser label, preferred analysis, and expected answer from the question.

Never audit a construction label as one undivided proposition. Create separate records for:

1. **Language claim** — form, meaning, distribution, argument structure, scope, productivity, restrictions, and variation in Cantonese.
2. **Attestation claim** — whether independent natural data instantiate the surface and intended reading.
3. **Representation claim** — whether Canto Span's node, span, hierarchy, roles, and internal label are a defensible representation.
4. **Heuristic claim** — whether the observable cues used by the parser are safe selection cues rather than grammar facts.
5. **Lexical-scope claim** — whether coverage is fixed, closed-class, collocational, or genuinely productive.

Evidence for a broad family never automatically validates polarity wrappers, question wrappers, clause wrappers, trace labels, learner labels, or dormant registry entries.

## 4. Evidence hierarchy

### 4.1 Pattern-specific linguistic research

Record exact source identity, publication type, Cantonese variety, period, register, data basis, cited form, interpretation, analysis, restrictions, and competing analyses.

A general reference to “aspect,” “resultative,” or “directional” is not pattern-specific support for every runtime label.

### 4.2 Independent natural corpus evidence

Use naturally produced data for attestation, distribution, boundaries, and variation. Preserve corpus, document, speaker, genre, turn, surrounding context, query, deduplication, and manual adjudication.

A string hit, dependency parse, or parser match does not validate Canto Span's structure.

### 4.3 Dictionaries and lexical resources

Use for readings, senses, lexical identity, fixed phrases, and lexical restrictions. A dictionary entry normally cannot establish a productive syntactic construction by itself.

### 4.4 Native-speaker evidence

Separate sentence naturalness from structural analysis. Record reviewer background, instructions, item version, context, response, confidence, optional correction, repeat/control status, timestamp, and file hash.

A blank optional correction is a completed response. Naturalness does not validate node boundaries, scope, argument linkage, or productivity.

### 4.5 Expert analysis

Use when choosing among structural alternatives, argument structures, scope relations, particle functions, lexical versus productive readings, or other theory-sensitive distinctions.

### 4.6 Internal project evidence

Fixtures, generated probes, regression snapshots, diagnostics, parser hits, and audit PASS are useful for implementation inspection and behavior preservation. They are not independent linguistic validation.

## 5. Bounded batch lifecycle

### 5.1 Define the batch before extensive research

Record:

- batch ID and date;
- accepted parser and governance baselines;
- exact bounded question;
- importance and runtime reach;
- neutral research question and origin of the lead;
- prohibited answer-seeding terms inherited only from the parser;
- search concepts, competing terms, and inclusion/exclusion rules;
- evidence already available;
- affected labels and fixtures;
- intended source types;
- expected deliverable;
- unresolved risks;
- recovery output location and first in-progress export.

### 5.2 Write ahead

Append findings to the active ledger after each substantial source, corpus search, counterexample, hypothesis change, or new research branch. Do not keep several sources only in chat and synthesize later.

Each evidence entry records source, canonical locator, extracted proposition, examples, boundaries, register limitations, support/contradiction direction, direct versus inferred support, alternatives, Canto Span implication, confidence, and uncertainty. Extract propositions before drafting the project claim.

### 5.3 Size research coherently but export at evidence-state boundaries

A batch should be large enough to answer one coherent research goal and small enough to leave an independently useful, verifiable checkpoint. Do **not** impose rigid caps on source count, example count, or elapsed time. Artificially tiny batches fragment related evidence, multiply temporary documents, and can prevent a construction family from being adjudicated as a whole.

Continue within the same batch while the evidence addresses the same bounded question and can still be synthesized coherently. Rebuild and expose an interim recovery artifact at each of these boundaries even when the coherent batch continues:

- question and discovery protocol frozen;
- source-screening manifest frozen;
- proposition extraction completed or materially revised;
- synthesis/disposition completed;
- before implementation, major validation, or branch expansion.

Stop the batch when a meaningful terminal milestone is reached, including any of the following:

- the bounded research question has a defensible disposition;
- a material doctrine conclusion or counterexample changes the audit outcome;
- the work is about to expand into a substantially different construction family or research branch;
- implementation or a major validation cycle would begin;
- accumulated evidence or diagnostics create material context-loss risk;
- the user requests a checkpoint or stop;
- downloadable artifacts cannot be created or verified.

Event-based recovery protects work without imposing arbitrary source, example, or time caps.

## 6. Design and immutable held-out evaluation

Before adjudication:

1. identify the design evidence used to formulate the claim;
2. freeze an independently sourced held-out partition where possible;
3. include positive, negative, ambiguous, and boundary items;
4. define what evidence would narrow or falsify the claim;
5. preserve lexical, discourse, register, diachronic, and speaker variation;
6. keep parser fixtures separate from linguistic evaluation;
7. state the strongest competing analysis.

Do not tune the claim to held-out failures and then report the same rows as held out. Record failures and create a future evaluation cycle only after authorization.

Generated starred examples can probe overgeneration but do not establish ungrammaticality without independent support.

## 7. Competing analyses and negative boundaries

Every consequential claim must record the strongest plausible alternative, for example:

- aspect marker versus phase/result complement;
- flat sequence versus hierarchical scope;
- productive construction versus lexicalized collocation;
- clause negation versus construction-internal potential morphology;
- complex predicate versus serial or multi-clause structure;
- omitted argument versus activity reading versus context-dependent fragment;
- dedicated subtype versus general wrapper plus metadata;
- directional complement versus grammaticalized particle.

A positive-only dossier is incomplete. Include minimally contrasting negatives, superficially similar forms with another analysis, ambiguous examples, lexical restrictions, predicate-class restrictions, scope differences, and register/context boundaries.

## 8. Parser probing during the freeze

Parser probes may reveal:

- false positives;
- false negatives;
- false-clean analyses;
- wrong hierarchy or attachment;
- missing coverage;
- lexical gaps;
- heuristic leakage;
- summary/full-diagnostic mismatch.

They do not authorize implementation. Record every correction as a frozen remediation candidate with affected labels, examples, likely cause, risks, and future tests.

## 9. Semantic diagnostic review

An acceptance summary is an inspection index, not an acceptance verdict.

Required:

1. inspect every summary row;
2. open every row marked `full_review.required`;
3. open any row with conservative triggers or suspicious compact output;
4. inspect at least one apparently clean, untriggered full diagnostic;
5. verify summary/full agreement on runtime, export identity, row order, context, top constructions, root coverage, roles, Jyutping, and legitimacy metadata;
6. block acceptance on any material mismatch.

Conservative triggers include non-PASS audits, semantic-review traces, context issues, ambiguity selection, normalization, parser-shadow activity, nested scope-bearing wrappers, contextual role changes, parser-active feature bundles, multiple or missing roots, partial coverage, provenance mismatch, and any provisional/pending/heuristic/lexicalized/unsupported legitimacy state.

A target label appearing in a full-root tree may still be false-clean if the sense, hierarchy, attachment, or roles are wrong.

## 10. Adjudication

At the end of the batch, record separate outcomes for the language claim, parser representation, parser heuristic, and lexical scope.

Possible dispositions:

- `retain`
- `narrow`
- `relabel`
- `downgrade`
- `quarantine`
- `lexicalize`
- `retire`
- `defer`

Possible support classes:

- `supported_productive`
- `supported_lexicalized`
- `provisional`
- `research_pending`
- `parser_heuristic`
- `lexicalized_only`
- `unsupported_generalization`

No current claim is productively supported merely because it was historically accepted.

Record `origin_status` separately:

- `external_evidence_originated`
- `legacy_source_linked_posthoc`
- `legacy_origin_not_proven`
- `internal_representation_only`
- `internal_heuristic_only`

Post-hoc compatibility never becomes `external_evidence_originated`.

## 11. End-of-batch synthesis

The human-readable checkpoint must contain:

- question examined;
- evidence collected;
- established facts;
- strongly supported interpretations;
- plausible but unconfirmed hypotheses;
- parser representation choices;
- heuristic findings;
- unresolved issues;
- doctrine impact;
- parser impact;
- disposition;
- frozen remediation candidates;
- files changed;
- validation and warnings;
- remaining queue;
- exact continuation instructions.

Promote only synthesized conclusions to authoritative documentation. Keep raw notes, contradictions, and unresolved evidence in the active ledger.

## 12. Mandatory recovery artifacts

A substantive batch is incomplete until all required artifacts are created, verified, and linked:

- checkpoint Markdown;
- checkpoint JSON;
- batch recovery ZIP;
- rolling `canto-span-current-recovery.zip`;
- installable candidate ZIP whenever runtime, tooling, fixtures, corpus, lexicon, or distributable documentation changed;
- relevant diagnostic/acceptance note when applicable;
- SHA-256 for major archives;
- artifact manifest and verification record.

Use `MANDATORY-DOWNLOAD-AND-RECOVERY-PROTOCOL.md` for exact rules.

## 13. Atomic order

```text
write ledger
→ update authoritative docs where justified
→ update remaining queue
→ create checkpoint Markdown
→ create checkpoint JSON
→ assemble recovery ZIP
→ assemble installable ZIP when required
→ verify artifacts
→ calculate hashes
→ provide download links
→ begin the next batch
```

Do not change the queue or state after packaging without rebuilding the package.

## 14. Failure and stop conditions

Stop and preserve partial work when:

- downloads cannot be created or verified;
- the evidence batch reaches its export limit;
- a material contradiction appears;
- the working hypothesis changes;
- semantic review is incomplete;
- required source, rendered diagnostic, native judgment, or expert analysis is unavailable;
- the user requests a stop.

Do not claim completion beyond what the downloadable artifacts contain.

## 15. Success criterion

Progress is not measured by version numbers, fixture count, parser coverage, or uninterrupted research duration. A batch succeeds when it leaves a preserved neutral question, reproducible source screen, proposition-level evidence, explicit claim-source edges, an honest disposition, reproducible validation, explicit uncertainty, and verified recovery points.


## Current implementation status

Accepted parser behavior is v0.5.174. CP020R2-RA1 reviewed all 60 summary rows and all 60 full diagnostics and issued explicit PASS with 1999/1999 checks. This acceptance does not promote the provisional relation to productive grammar.

Research-only authority-origin work may proceed while rendered review is unavailable. No new grammar implementation may proceed until the source-derived claim, claim–source edges, contradiction record, frozen evaluation, and separate runtime authorization exist.
