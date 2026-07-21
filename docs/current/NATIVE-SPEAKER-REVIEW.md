# Native-speaker review workflow

This document defines the repeatable native-speaker review process for active construction re-audits. The canonical machine-readable state is [`../../review-packets/native-speaker/active-v1/active-review-state.json`](../../review-packets/native-speaker/active-v1/active-review-state.json).

## Reviewer roles

- **Speaker A** is the user's wife and is contacted privately. Her judgments are recorded as one independent speaker only when the completed form and result record are committed.
- **Speaker B / external panel** responses come from a blinded public form shared through social media. Each retained respondent is tracked separately; a public pool is not collapsed into one fictional speaker. Public submission alone does not make a response countable.

Compared speakers must not consult each other before submission. Parser output, construction names, expected labels, and target/boundary classifications remain hidden from respondents.

## Instrument rules

1. The same relevant stimulus set must be used for the speakers being compared for a construction.
2. Positive candidates, comparison sentences, and semantic or structural boundaries are intermixed in display order.
3. The form asks for sentence naturalness plus optional corrections or context. Any future clean instrument must place the optional correction/context field directly below its sentence, not on a later page.
4. Public forms collect neither real names nor email addresses.
5. A self-chosen reviewer code supports duplicate screening but is not proof of identity.
6. Cantonese background, native-language self-report, current use frequency, independence, and public-use consent are recorded.

The canonical form specifications are [`../../review-packets/native-speaker/active-v1/form-specs.json`](../../review-packets/native-speaker/active-v1/form-specs.json). `Code.gs` is generated from that file and must not be edited directly.

## Public-response screening

A response may proceed to manual adjudication only when:

- the respondent confirms using Cantonese as a principal language from childhood;
- regional or accent background is supplied;
- every judgment item is answered;
- the independence declaration is confirmed;
- public-use consent is confirmed;
- a reviewer code is supplied.

It still does not count as an independent speaker until likely duplicates are screened, comments and corrections are manually reviewed, and a construction-specific result record is committed. The CSV importer therefore always writes `counted_as_independent_speaker: false`.

## Instrument quality tiers

- `clean_controlled`: may contribute to `promotion_eligible_independent_speaker_count` after full screening and adjudication.
- `pilot_limited`: may be preserved and counted as external panel evidence, but does not contribute to the promotion-eligible count unless a construction-specific exception explicitly establishes that its defects do not affect the relevant contrast.

Future clean instruments should use a graded scale with a genuine context/uncertainty response, randomized item-block order, unrelated natural and broken fillers, context for ellipsis-dependent items, interpretation questions for structurally ambiguous strings, and separate treatment of semantic implausibility. Judgment and comment fields must remain adjacent. Google Forms' page-level question shuffle should not be used to separate those paired fields; item blocks should instead be shuffled before creation.

## RUL01 one-time pilot exception

The 23-response `RUL01-SPEAKER-B-PUBLIC-R1` snapshot is retained as counted external panel evidence under the user's explicit 2026-07-21 exception. It is classified as `pilot_binary_fixed_order_context_free_global_comment`. Its `promotion_eligible_independent_speaker_count` is 0. See `docs/research/CP026-P1-RUL01-PUBLIC-PANEL-R1-RESULT.md`.

## Source-checking linkage

Each active construction state record identifies one canonical source-verification TSV and the exact source IDs currently counted by the construction note. The workflow audit requires:

- each counted source ID to occur in the verification file;
- each counted source to have an exact locator, claim/finding, verification state, and explicit limitation;
- the counted source set to equal the construction note's `source_ids`;
- note source and speaker counts to match the active review state.

## Current authorization

Public Speaker B forms are authorized for the two active constructions only. The archived backlog remains frozen. The RUL01 public pilot has one committed 23-response snapshot; later responses require a new dated snapshot and re-audit. Response collection does not change linguistic status or promotion eligibility by itself.
