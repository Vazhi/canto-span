# Lane 08 reported speech, cognition, and stance source map (CP021B-R15)

Date: 2026-07-18  
Scope: claim-level research mapping only; **no parser behavior, fixtures, manifest, accepted version, or held-out data changed**.

## Family selected

After ranking the 86 remaining unmapped language labels, the broad `ProductiveVO` and `TransitiveVP` abstractions were again rejected as incoherent research units. This checkpoint maps five tightly interacting labels:

- `ReportedSpeech`
- `OpinionStanceFrame`
- `CognitionContentFrame`
- `CognitionStatementClause`
- `NegativeCognitionFragment`

`IntentionFrame`, `VPComplementFrame`, `OpinionQuestion`, general complement syntax, and sentence-final evidentials remain separate families.

## Runtime claim extraction

### Reported speech

`ReportedSpeech` requires optional subject + exact lexical `話` + visible content + optional particle. Its content helper also accepts short predicates such as bare `有` or `冇`. It does not represent complementizer-like `話` after another saying/cognition predicate, and its node label does not distinguish direct report, indirect report, quotation, hearsay, or complementizer analysis.

### Opinion and stance

`OpinionStanceFrame` permits optional subject, broad focus modifiers on either side of a registered stance predicate, and a visible proposition or typed complement ellipsis. The runtime inventory groups heterogeneous predicates and permits context-dependent `有/冇/係/唔係` content under the same node.

### Cognition content and bare statements

`CognitionContentFrame` is primarily a `知`-type frame but can absorb a wide cross-product of generated clause/question families through slot compatibility. `CognitionStatementClause` separately treats bare subject + `知` as a conventional statement despite observing no proposition or antecedent. `NegativeCognitionFragment` covers short `唔知` responses, while related clause-initial and parenthetical uses are not structurally separated.

## Source-derived boundaries

### 1. Lexical `話 + clause` is real, but `話` is polyfunctional

Alderete et al. give ordinary lexical `話` introducing clausal content. Yeung distinguishes lexical “say,” transitive “blame/condemn,” and a proposed complementizer. Yap, Wong, and Chor add lexical and grammaticalized hearsay/complementizer-like uses. A token-based single analysis is therefore untenable.

### 2. Complementizer analysis must remain neutral

Yeung argues for complementizer `話`, while Matthews identifies the synchronic analysis as unresolved and notes evidence against treating the item as forming a CP with the following clause. Canto Span may preserve the overt sequence and boundary, but should not teach one disputed analysis as settled.

### 3. Reported speech is not generic mental content

Lui's reported-thought study treats `心諗` and `話` reported speech as structurally distinct. Shared content-introducing function does not justify one reported-content construction across speech, thought, belief, and cognition predicates.

### 4. Matrix complement predicates and stance markers must split

`覺得 + clause` and `以為 + clause` are independently attested. Yap, Wong, and Chor show that complement-taking predicates can also develop clause-initial, parenthetical, or right-peripheral stance uses. Position, lexeme, and context therefore matter; a generic stance-predicate cross-product is not source-backed.

### 5. `唔知` is polyfunctional

The source distinguishes neutral lexical “not know,” lexical meaning plus doubt, and parenthetical negative-attitude marking. It also attests `唔知` with overt in-situ wh content. A short standalone response, a cognition-content frame, and a stance marker cannot be treated as the same construction merely because they share the surface string.

### 6. Complement omission is context-dependent

The sources support omitted mental content in context, but they do not identify the missing proposition. The exact positive runtime profile `我知` was not directly established by the inspected primary sources. It remains a source gap, despite one-speaker naturalness evidence in the project.

## Parser-label dispositions

| Label | Disposition | Parser-facing result |
|---|---|---|
| `ReportedSpeech` | `SOURCE_LINKED_SPLIT_AND_ANALYSIS_NEUTRAL_REQUIRED` | Split lexical `話`, post-predicate complementizer-like/hearsay `話`, and reported-thought profiles. Preserve overt content and keep direct/indirect and CP analyses neutral. |
| `OpinionStanceFrame` | `SOURCE_LINKED_LEXICAL_COMPLEMENT_AND_STANCE_MARKER_SPLIT_REQUIRED` | Split lexeme-specific matrix complement frames from grammaticalized stance-marker positions. Quarantine generic focus placement and typed complement ellipsis. |
| `CognitionContentFrame` | `SOURCE_LINKED_LEXICAL_SELECTION_AND_COMPLEMENT_TYPE_NARROWING_REQUIRED` | Retain only overt, lexeme-licensed content relations; split lexical cognition from doubt/stance uses and retire the arbitrary generated-content cross-product. |
| `CognitionStatementClause` | `GENERAL_BARE_COGNITION_LINKED_EXACT_POSITIVE_PROFILE_GAP` | General complement omission is context-linked, but exact positive `我知` remains without direct source mapping. Do not mark omitted content as saturated. |
| `NegativeCognitionFragment` | `SOURCE_LINKED_POLYFUNCTIONALITY_AND_CONTEXT_SPLIT_REQUIRED` | Split lexical negative cognition, overt-content sequences, parenthetical stance, and standalone answer fragments; preserve unresolved context. |

## Forbidden inferences

R15 does not authorize:

- treating every `話` as the same speech verb;
- treating complementizer status of `話` as settled;
- merging reported speech, reported thought, belief, and cognition content;
- inserting quotation marks, an addressee, a source, or a hidden complementizer;
- treating every stance predicate as having the same complement, factivity, certainty, or discourse behavior;
- using focus-adverb position as freely interchangeable;
- treating bare `有`, `冇`, `係`, or `唔係` as a fully observed proposition;
- licensing arbitrary cognition-predicate × generated-clause combinations;
- inferring an unspoken subject, proposition, question, answer, or antecedent;
- treating every subjectless `唔知` as a standalone fragment;
- treating every `唔知 + clause` as ordinary lexical complementation;
- promoting the exact positive `我知` node from native naturalness alone;
- changing parser behavior during the research freeze.

## Sources added or extended

- Yeung 2006: official abstract distinguishing lexical and proposed complementizer uses of `話`.
- Matthews 2021: official repository abstract preserving the unresolved complementizer analysis.
- Yap, Wong, and Chor 2014: institutional full slide deck on lexical, complement-taking, stance, and hearsay developments.
- Lui 2025: accepted preprint distinguishing reported thought from reported speech and documenting contextually implicit thought content.
- Alderete et al. 2017 and Yip & Matthews 2000: existing records extended with exact reported-speech, cognition-clause, and `以為` locators.
- Internal R15 runtime screen: records current templates and representation risks; it is not linguistic authority.

## Open evidence gaps

- direct primary-source attestation and discourse conditions for positive bare `我知`;
- modern corpus distribution of lexical versus complementizer-like `話`;
- direct versus indirect reported-speech diagnostics in contemporary Hong Kong and Guangzhou Cantonese;
- lexeme-specific complementation for `知`, `覺得`, `以為`, `相信`, `懷疑`, and related predicates;
- exact licensing of bare `有/冇/係/唔係` as reported or stance content;
- particles and intonation in standalone `唔知` responses;
- speaker, register, and regional variation in stance-marker uses;
- a theory-neutral parser representation for parentheticals and complementizer-like sequences.

## Freeze result

This batch changes research provenance only. No parser node, role, gloss, heuristic, fixture, test expectation, manifest field, or held-out item was changed or opened.
