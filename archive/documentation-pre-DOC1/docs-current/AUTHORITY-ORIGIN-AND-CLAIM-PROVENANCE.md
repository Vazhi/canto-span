# Authority-Origin and Claim-Provenance Policy

> **Binding user-directed governance — 2026-07-17 / CP021A:** Cantonese language claims must originate in independent external evidence. Internal parser behavior may create a neutrally worded research question, never the answer or a preferred hypothesis. This policy governs both the legacy audit and every future construction. It changes no parser behavior by itself.

## 1. Governing distinction

Every material statement must have a provenance type.

| Statement type | Required provenance | May establish Cantonese grammar? |
|---|---|---:|
| Cantonese form, meaning, distribution, productivity, restriction, or analysis | independent external linguistic evidence, natural data, or documented native/expert evidence | Yes, within the recorded scope |
| Corpus attestation | recoverable external corpus record with context and provenance | Attestation only |
| Parser representation, code path, diagnostic result, or regression behavior | exact internal file, code, fixture, or diagnostic record | No |
| Research question | internal observation or external lead, clearly marked as a question | No |
| Project policy or engineering decision | explicit governance or decision record | No |

“All claims need sources” therefore means that every statement has a traceable provenance edge. It does **not** mean that internal implementation facts need an external linguistic citation, or that an external author must prescribe Canto Span’s exact node names.

## 2. Internal observation boundary

An internal observation may establish only facts about the project, for example:

```text
Observed: the parser groups X and Y together in these rows.
Question: what form–meaning relations involving X and Y are independently described or attested in Cantonese?
```

It may not become:

```text
Hypothesis: Cantonese has construction X-Y.
Search task: find evidence supporting construction X-Y.
```

The research question must avoid the parser label, preferred hierarchy, expected boundary, productivity assumption, and proposed answer whenever those details are not themselves external.

## 3. Two-track program

### 3.1 Legacy-claim triage

All claims whose external origin cannot be demonstrated are legacy claims, even if later sources appear compatible with them.

- no pattern-specific external edge: downgrade, quarantine, lexicalize, retire, or convert to an internal representation statement;
- compatible post-hoc sources: retain only at the evidence-supported scope and label the provenance `legacy_source_linked_posthoc`;
- contradictory evidence: record it with equal visibility and narrow, replace, or retire the claim;
- source silence: treat as unresolved, not as evidence of absence;
- an internal fixture, parser success, or historical acceptance cannot repair the origin defect.

### 3.2 Future authority-origin grammar

The earlier indefinite freeze and replacement-only rule are retired. They were useful emergency controls but would eventually prevent genuine, independently evidenced Cantonese coverage.

New language behavior may enter research and later implementation only through this order:

```text
neutral question
→ broad source discovery
→ source screening log
→ proposition extraction with locators
→ contradiction and boundary extraction
→ source-derived synthesis
→ claim-source edges
→ immutable evaluation design
→ separate implementation
→ semantic and regression adjudication
→ rendered acceptance when learner output changes
```

No new grammar is authorized merely by this policy. The current runtime candidate and all later candidates remain subject to their own evidence and acceptance gates.

The current runtime Boolean `freeze_new_grammar_acceptance=true` is retained unchanged in CP021A as a conservative automatic-acceptance guard. It no longer means “no new grammar forever” or “replacement only.” A later source-origin candidate may change or replace that implementation field only in its separately validated governance/runtime batch.

## 4. Source discovery without confirmation search

Before substantive searching, freeze a question record containing:

- the phenomenon to investigate in observable terms;
- why the question was opened and whether the lead was internal;
- search concepts, Cantonese and English terminology, orthographic variants, and likely competing terms;
- source classes and databases/sites to search;
- inclusion and exclusion criteria;
- the date range and Cantonese variety/register scope;
- what would count as support, contradiction, restriction, ambiguity, or null recovery;
- stop criteria for the discovery phase.

Search queries must ask what evidence and analyses exist. Queries such as “evidence that Canto Span label X is correct” are prohibited.

Record every serious candidate source screened, not only included sources. Preserve title, author, year, URI/DOI, source type, inclusion decision, reason, access result, and query provenance. Search-engine ranking is not evidence quality.

## 5. Source extraction precedes claim writing

Extract source propositions before drafting the project claim. Each extraction must record:

```text
source_id
canonical_uri_or_doi
exact_locator
source_proposition
surface_example_or_data_basis
variety_register_period
support_direction = supports | contradicts | restricts | competing_analysis | attests_only
directness
independence_scope
limitations
extractor_and_date
```

Do not force different authors’ terminology into one category before their propositions have been extracted separately.

## 6. Emergent synthesis

A project language claim may be written only after source extraction. It must be the narrowest synthesis licensed by the evidence and must state:

- exact form and reading;
- observed or described distribution;
- restrictions and known variation;
- whether productivity is established, bounded, or unknown;
- competing analyses;
- contradictory and null evidence;
- which parts are direct source statements and which are project inference;
- confidence and unresolved questions.

The external evidence must originate the behavior being modeled. Canto Span may still choose a theory-neutral engineering representation when sources disagree, but that representation must be labeled as an internal decision rather than attributed to the language.

## 7. Claim-source edges

A bibliography, source count, lane-level citation, or dossier mention is not a claim-source link. Every consequential claim needs explicit edges recording:

```text
claim_id
claim_layer
source_id
canonical_uri
relationship
evidence_dimension
exact_locator
extracted_proposition
directness
limitations
verification_state
```

An edge can support only the recorded dimensions. A source that attests a surface does not automatically support productivity, hierarchy, argument structure, learner terminology, or a Canto Span label.

## 8. Authority is evidence, not command

Published work can be incomplete, theory-dependent, historically limited, or wrong. “Authoritative” means independently accountable and inspectable, not immune from criticism.

Use multiple evidence types where material:

- peer-reviewed or academically published pattern-specific analysis;
- reference grammars and research monographs;
- recoverable natural corpora with context;
- dictionaries for lexical scope only;
- controlled native/expert evidence for the task it actually tests.

Record disagreements rather than selecting the source closest to the parser. Independent natural data can originate a construction claim when the data and interpretation are recoverable; a previously invented parser label cannot.

## 9. No-source and conflict dispositions

| Evidence state | Required result |
|---|---|
| No external pattern-specific edge | `unsupported_generalization`, quarantine/retire/representation-only, or an unasserted research question |
| Only lexical evidence | lexicalize; no productive syntax claim |
| Attestation without analysis | retain attestation only; structure unresolved |
| Compatible sources found after an internal claim | legacy post-hoc support; never relabel as externally originated |
| Material source disagreement | provisional or research-pending with competing analyses visible |
| Contrary evidence defeats scope | narrow, replace, or retire |
| Adequate source-derived portfolio | eligible for evaluation, not automatically accepted |

## 10. Anti-bias gates

A consequential claim cannot advance unless:

- the question was registered before answer-seeking;
- discovery queries and screened-source outcomes are preserved;
- excluded sources have reasons;
- negative, boundary, ambiguous, and competing evidence were actively sought;
- contradictions are linked to the same claim as supporting evidence;
- source independence is assessed;
- corpus non-recovery is not treated as ungrammaticality;
- source examples are not recycled as held-out evidence after rule tuning;
- the final wording does not exceed the combined source scope.

## 11. Native-speaker screening correction

The former rule “unchecked means natural” is retired for evidential use. A blank box may mean acceptance, omission, fatigue, uncertainty, or incomplete review.

Future screening must distinguish at least:

```text
natural_in_context
unnatural_in_context
unsure_or_needs_context
not_seen
```

An optional correction remains useful, but a blank correction is not evidence about analysis. Native naturalness never validates node structure or productivity by itself.

## 12. Regression and acceptance correction

Accepted behavior is a change-detection baseline, not a veto over external evidence. When source-derived analysis contradicts an accepted fixture:

1. preserve the old behavior and provenance in history;
2. adjudicate the contradiction explicitly;
3. replace or retire the invalid expectation deliberately;
4. add independently sourced evaluation and negative boundaries;
5. report the regression as an intentional evidence-backed change.

The project must not keep false grammar merely to maintain a green aggregate count.

## 13. Interruption-resilient evidence work

Every evidence batch begins with an in-progress checkpoint skeleton and live ledger. Export a downloadable recovery artifact at these event boundaries:

1. question and search protocol frozen;
2. source-screening manifest frozen;
3. proposition extraction completed or materially changed;
4. synthesis/disposition completed;
5. before implementation, major validation, or a different research branch.

This event-based rule replaces the weaker allowance for one large unexported “coherent batch.” Meaningful findings must be written to files immediately; no synthesis may exist only in chat.

## 14. Current baseline consequence

At v0.5.174 there are 182 runtime labels. The existing legitimacy audit records pattern-specific source **counts** for only four labels and direct source IDs for none. CP021A adds explicit post-hoc edges for those four; it does not establish that any legacy label was externally originated. Every label remains non-productive, and the authority-origin migration must proceed claim by claim.
