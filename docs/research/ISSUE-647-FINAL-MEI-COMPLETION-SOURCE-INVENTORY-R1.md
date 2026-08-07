# ISSUE-647 final-未 completion-question source inventory R1

Parent issue: #647  
Work claim: #648  
Date: 2026-08-07

## Scope

This inventory evaluates Week 18 I072 `你食咗飯未？`, current AA24 `AspectMarkedMeiCompletionQuestion`, and the newly evidenced boundary between overt-marker and bare VP-Neg questions.

The source sentence remains immutable attestation. The inventory authorizes no parser, identity, status, corpus, survey, release, or deployment change.

## Evidence ledger

| source_id | evidence_grade | verification | citation_and_locator | what_it_supports | limit | disposition |
|---|---|---|---|---|---|---|
| `SRC-HUANG-HER-KONG-2025-VP-NEG` | `DIRECT_SCHOLARLY_CORE` | `official_journal_metadata_and_fulltext_pdf_inspected` | Huang Yu-hsin, Her One-soon, and Stano Kong. 2025. “Revisiting the Taxonomy of Interrogatives in Cantonese.” *Tsing Hua Journal of Chinese Studies* 55(1):157–195. DOI `10.6503/THJCS.202503_55(1).0005`; section 4.3, printed pp.186–189, examples (37)–(44). | Directly analyzes final-`未` VP-Neg questions; gives bare `你睇書未` and marked `你食咗／過海南雞飯未`; treats `未` as retained negative ‘not yet’; supplies negator, response, optional-particle, intervention, and embedding diagnostics; proposes an implicit-disjunction/A-not-A analysis. | One theoretical analysis of the broader family. It does not decide Canto Span identity allocation, validate every lexical predicate, or authorize a hidden repeated VP in output. | `RETAIN_BROADER_VP_NEG_FAMILY_AND_NEGATIVE_MARKER_BOUNDARY` |
| `SRC-WONG-ETAL-2022-GACS-MEI` | `DIRECT_SCHOLARLY_CORE` | `published_chapter_author_fulltext_index_inspected` | Anita Mei-Yin Wong, Candice Chi-Hang Cheung, Jessica Ming-Wai Lo, and Elaine Ka-Ho Wan. 2022. “Grammatical Analysis of Cantonese Samples.” In *Understanding Development and Disorder in Cantonese using Language Sample Analysis*, Routledge; printed p.54, section D1.4 `未` questions. | Defines `未` questions as adding negative `未` ‘not yet’ to a declarative to ask whether an event has taken place; gives exact close example `你食咗飯未呀`. | Descriptive/clinical coding framework; classifies the type under yes/no questions and does not supply the later VP-Neg diagnostics or settle identity structure. | `RETAIN_EXACT_MARKED_PROFILE_CORROBORATION` |
| `SRC-YIP-MATTHEWS-2000-BASIC` | `REFERENCE_GRAMMAR_CORE` | `repository_verified_full_text` | Virginia Yip and Stephen Matthews. 2000. *Basic Cantonese: A Grammar and Workbook*. Unit 23, printed pp.122–123; PDF pp.134–135. Current repository evidence record in `grammar/research_pending/CompletionQuestion.md`. | Supports questions with visible completion/result particles or aspect markers followed by `未`, including `V完…未` and `V咗…未`. | The inspected unit does not authorize every bare `VP + 未` string; absence there is not proof of ungrammaticality. | `RETAIN_AA24_OVERT_MARKER_CORE` |
| `SRC-GLOSSIKA-W18-I072` | `ATTESTATION_ONLY` | `checked_in_source_inspected` | `data/pedagogical-corpus/glossika/GLOSSIKA-YUEHK-A1-W18-20260719/source.json`, I072 `你食咗飯未？`, Jyutping `nei5 sik6 zo2 faan6 mei6?`, English “Have you eaten?”. | Attests the exact source string, punctuation, Jyutping, gloss, translation, register, and lesson placement. | Pedagogical source; does not independently establish syntax, productivity, question taxonomy, or dialect-wide naturalness. | `RETAIN_AS_EXACT_TRIGGER` |
| `PROJECT-AA24-IDENTITY` | `RUNTIME_OBSERVATION_ONLY` | `current_identity_registry_inspected` | `data/construction-identities.json`, AA24 `AspectMarkedMeiCompletionQuestion`, profile `OvertCompletionOrAspectMarkerFinalMei`. | Shows the accepted current identity explicitly includes `食咗飯未`, `食完飯未`, and `食咗未`, while excluding bare VP+未. | Identity state has zero independent linguistic-evidence weight and cannot reject a directly sourced broader family. | `I072_EXISTING_OWNER_AND_BARE_PROFILE_CONFLICT` |
| `PROJECT-AA24-NOTE` | `RUNTIME_OBSERVATION_ONLY` | `current_note_inspected` | `grammar/research_pending/CompletionQuestion.md`; one verified source, ten construction assertions, no complete corpus or role-neutral panel evidence. | Records the prior evidence boundary and implementation/test state. | Tests and note metadata do not prove linguistic validity or promotion readiness. | `RETAIN_AS_REPOSITORY_STATE` |
| `PROJECT-AA61-RESEARCH` | `RUNTIME_OBSERVATION_ONLY` | `merged_research_disposition_inspected` | Issue #617 / PR #619, AA61 `GwoFinalMeiExperientialQuestion` research. | Shows the project already separates experiential `V過…未` from completion `V咗／V完…未`. | Project research routing does not replace external evidence and does not settle the bare profile. | `PRESERVE_MARKER_SPECIFIC_BOUNDARY` |
| `PROJECT-W18-F05-ROUTE` | `RUNTIME_OBSERVATION_ONLY` | `route_record_inspected` | Issue #481, route W18-F05. | Documents the unresolved Week 18 research dependency for I072. | Routing has zero independent linguistic-evidence weight. | `RETAIN_AS_TRIGGER` |

## Directly supported propositions

The qualifying sources support:

1. `未 mei6` can follow a VP to form a question about whether an event has occurred.
2. `未` retains the negative meaning ‘not yet’ in the question.
3. `V咗 + object + 未` is directly attested and independently described.
4. `V過 + object + 未` is a related experiential subtype.
5. bare `VP + 未` is also directly attested in current scholarship.
6. the tested `冇 + VP + 未` combination is unacceptable in the cited analysis.
7. responses may restate the predicate rather than use independent truth-based yes/no forms.
8. selected material may follow `未`, including the source-specific particles cited in the papers.
9. a VP-Neg/A-not-A implicit-disjunction analysis is a direct scholarly proposal.

## Source-analysis conflict preserved

Wong et al. place `未` questions within a descriptive yes/no-question inventory. Huang et al. argue that VP-Neg questions are information-seeking questions related to A-not-A/disjunctive structure rather than confirmation-seeking polar questions.

This packet does not erase the disagreement. The shared observable core is:

```text
predicate + final negative 未 + question about event occurrence
```

Canto Span can preserve this core without choosing a universal question taxonomy in the runtime identity.

## AA24 boundary consequence

Current AA24 is well aligned with I072 because it requires overt aspect/completion/result marking. The newer bare example does not refute that subtype. It shows that the broader final-`未` family extends beyond AA24's current formal boundary.

Therefore:

- I072 requires no identity change;
- bare VP+未 now has qualifying evidence;
- bare evidence cannot enter AA24 automatically because the accepted identity explicitly excluded it;
- a later identity/composition audit is required before any runtime broadening.

## Unsupported conclusions

The evidence does not establish:

- one identity covering every final-`未` question;
- unrestricted semantic compatibility of any verb and object;
- an unrestricted following-particle slot;
- hidden repeated VP material that should be rendered to learners;
- that every `冇 + VP + 未` sequence in every context is impossible beyond the tested profile;
- automatic transfer between AA24 and AA61;
- promotion readiness;
- current parser correctness;
- a new UUID or runtime rule.

## Repository consequence

The strongest next action is a bounded identity/composition audit of bare `VP + 未`, with AA24 and AA61 as explicit collision neighbors. A separate implementation audit may verify I072 output, but no runtime change follows from this inventory itself.

No immutable source, parser, runtime, test, identity, status, corpus, survey, release, or deployment state is changed.
