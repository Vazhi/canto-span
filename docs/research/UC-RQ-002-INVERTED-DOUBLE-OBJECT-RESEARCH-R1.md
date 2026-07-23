---
title: UC-RQ-002 — Inverted double-object construction
research_id: UC-RQ-002
status: active_research_unit
baseline_version: 0.5.208
created: 2026-07-23
implementation_authorized: false
status_change_authorized: false
---

# UC-RQ-002 — Inverted double-object construction

## Research decision

A dedicated research unit is justified, but the current evidence does **not** justify a text-only parser construction or a general `Verb + Theme + Recipient` rule.

The independently described Hong Kong Cantonese inverted double-object construction (IDOC) has the surface order:

```text
Subject + matrix verb + direct object/theme + indirect object/recipient
```

A central checked example is:

```text
我送一本書佢。
ngo5 sung3 jat1 bun2 syu1 keoi5
“I send a book to him.”
```

Tong and Lee distinguish this from both:

```text
我送一本書畀佢。   S V DO P IO   prepositional dative
我送佢一本書。     S V IO DO     double-object order
```

Their source judgments treat the first two as available for caused transfer with `送 sung3`, while the recipient-before-theme order is rejected for that reading. The same three orders do not generalize to every triadic verb: with `教 gaau3` ‘teach’, the source accepts recipient-before-theme and rejects both theme-before-recipient alternatives.

This note therefore converts UC-RQ-002 from a discovery lead into a bounded research programme. It does **not** authorize a new runtime label, lexical expansion, parser fallback, grammar-note status, or promotion.

## Narrow working description

The safest current description is:

1. a triadic predicate introduces an agent, theme/direct object, and goal/recipient;
2. the theme precedes an overt final recipient without an overt dative marker;
3. the pattern is lexically restricted and is not interchangeable with recipient-before-theme order;
4. for matrix verbs other than lexical `畀 bei2` ‘give’, acceptability is reported to depend on prosodic and information-structural factors;
5. the construction is variable and generally dispreferred relative to an overt-marker prepositional dative in the 2024 experiment.

The lexical-`畀` subtype must be kept separate. Tong and Lee explicitly exclude matrix `畀` from their target experiment because they treat omission of a second homophonous `畀` as phonological-identity avoidance rather than the same prosodic-rephrasing process proposed for other verbs.

## Checked source findings

The source-verification ledger is:

`UC-RQ-002-INVERTED-DOUBLE-OBJECT-SOURCE-VERIFICATION-R1.tsv`

### 1. Three distinct triadic patterns

Tong and Lee identify three attested Hong Kong Cantonese triadic patterns:

```text
DOC:  S V IO DO
PDC:  S V DO P IO
IDOC: S V DO IO
```

Their opening minimal contrasts show that construction choice is predicate-sensitive:

| Predicate | DOC `V IO DO` | PDC `V DO 畀 IO` | IDOC `V DO IO` |
|---|---|---|---|
| `教 gaau3` ‘teach’ | accepted | rejected | rejected |
| `送 sung3` ‘send’ | rejected | accepted | accepted |

This directly blocks a parser policy that derives participant roles from order alone or treats all three patterns as freely alternating realizations of one unrestricted template.

### 2. Non-`畀` IDOC is a prosodic research problem

The 2024 experiment targets only IDOC with matrix verbs other than `畀`. The authors test:

- direct-object weight;
- indirect-object weight;
- relative prominence;
- presence or absence of an inserted pause;
- age group.

The experiment used audio, not written sentences alone. The analyzed sample contained 559 Hong Kong Cantonese participants. Each participant heard 32 randomized trials, and the material crossed pronoun, short NP, long NP, and branched NP conditions for both objects. This is strong evidence that an adequate Canto Span research design must preserve prosody, constituent weight, and participant profile rather than reducing the phenomenon to token adjacency.

### 3. Weight and prominence interact

The authors' general interpretation is that a sufficiently light final indirect object is favored because it can be prosodically integrated with the preceding verb-theme unit, while the theme/direct object bears relative prominence. Their discussion reports that a pronoun IO is generally favorable except where a pronoun DO disrupts the intended prominence relation. The results also show substantial DO–IO interaction rather than one independent “short IO” threshold.

No categorical syllable-count rule follows. The study itself notes that Cantonese DP weight had not previously been independently established, and its pronoun/short/long/branched categories are experimental operationalizations rather than a complete grammar.

### 4. Pause direction is internally inconsistent in the published report

The source contains a material reporting conflict that must remain unresolved until the data or authors' coding is checked:

- the raw-mean prose and Figure 1 report higher values for the **pause** condition than the no-pause condition;
- the model interpretation, discussion, and conclusion state that a pause lowers acceptability and that no pause supports prosodic integration.

The paper's abstract safely establishes only that pause presence matters. Canto Span must not encode “pause required” or “pause forbidden” from this paper without resolving the apparent coding/reporting inconsistency.

### 5. Age is not a monotonic boundary

The study finds age-graded variation, but not a simple elder-greater-than-younger hierarchy. The 48–53 group had the lowest mean, the over-65 group the highest mean, and young participants rated the construction significantly higher than middle-aged participants. The authors characterize the pattern as U-shaped and acknowledge that all target-sentence ratings were generally low.

Age, education, written-language influence, and register therefore belong in sampling and interpretation metadata. They are not parser inputs and do not license a universal grammatical boundary.

### 6. Earlier full-text project evidence already anticipated the main restrictions

The existing CP021B source extraction independently records that Xu and Peyraube distinguish V-theme-recipient, V-recipient-theme, and V-theme-`畀`-recipient patterns, with lexical class, Goal versus Source role, object weight, and competing category analyses affecting distribution. The existing Tang 1998 screening record likewise documents direct comparisons, prosodic conditions, speaker variation, and discourse-completeness judgments.

UC-RQ-002 therefore does not replace CP021B. It isolates the **non-lexical-GIVE, markerless, prosodically conditioned IDOC** as a dedicated research object that the broader `畀` synthesis did not evaluate with the 2024 large-sample audio evidence.

## Collision audit

The detailed table is:

`UC-RQ-002-INVERTED-DOUBLE-OBJECT-COLLISION-AUDIT-R1.tsv`

### `LexicalGiveRelation`

The current runtime label requires lexical `畀/俾` as the matrix predicate followed by two overt nominal spans. It correctly belongs to the lexical-GIVE domain, not to non-`畀` IDOC.

The sandbox emits `LexicalGiveRelation` for:

```text
我畀一本書佢。
```

That is precisely the matrix-`畀` subtype excluded from the 2024 target experiment. It cannot stand for:

```text
我送一本書佢。
```

or other markerless IDOC predicates.

### `PostThemeParticipantRelation`

This current node requires an overt post-theme `畀/俾` marker after a bounded predicate class. It can represent a theory-neutral surface such as:

```text
我交本書畀佢。
```

It cannot represent markerless:

```text
我交本書佢。
```

The PDC and IDOC are empirical competitors in the source literature, not aliases.

### `PossessiveTransferClause`

This node is an exact possession-plus-`要畀` wrapper such as `我有本書要畀你`. It neither has the IDOC word order nor addresses its prosody, lexical class, or participant-role restrictions.

### retired `TransferDitransitiveVP`

The former label was retired because it forced Theme/Recipient roles and permitted broad argument-order alternation beyond the frozen evidence. UC-RQ-002 must not revive it. The new research strengthens the reason for retirement: verb class, marker realization, object weight, prosody, information structure, and speaker profile all condition the surface order.

### generic wrappers and false full coverage

On the generated probe `我交本書佢`, v0.5.208 obtains full root coverage by wrapping `交本書佢` as a generic `ModifiedNP` inside `ClauseSpan`. This is not an IDOC analysis and demonstrates that full-span coverage alone cannot establish correct constituent structure.

The exact source verb `送` is currently unknown to the lexicon, and `我送一本書佢` is only partially covered, with `一本書佢` miswrapped as `QuantityNP`. Lexical expansion may eventually be necessary for testing, but adding `送` would not itself authorize an IDOC construction.

## Sandbox runtime observations

These are implementation observations only; their linguistic evidence weight is zero.

| Surface | Source/research role | Current v0.5.208 result relevant to UC-RQ-002 |
|---|---|---|
| `我送一本書佢。` | exact IDOC positive in Tong & Lee ex. 3b | No IDOC relation; `送` is unknown and `一本書佢` is miswrapped as `QuantityNP`; root coverage partial. |
| `我送一本書畀佢。` | exact PDC positive in ex. 2b | No PDC relation because `送` is unknown; only the quantified NP is recognized. |
| `我送佢一本書。` | exact DOC boundary in ex. 1b | No triadic relation; only the quantified NP is recognized. |
| `我教佢中文。` | exact DOC positive in ex. 1a | No dedicated triadic relation. |
| `我教中文佢。` | exact IDOC boundary in ex. 3a | No dedicated triadic relation. |
| `我教中文畀佢。` | exact PDC boundary in ex. 2a | No dedicated triadic relation. |
| `我交本書佢。` | generated runtime collision probe | Full root coverage through `ClauseSpan` plus a spurious broad `ModifiedNP`; no IDOC relation. |
| `我交本書畀佢。` | generated overt-marker comparison | `PostThemeParticipantRelation` emits over the overt-marker PDC profile. |
| `我畀一本書佢。` | lexical-GIVE/haplology comparison | `LexicalGiveRelation` emits; this is not the non-`畀` experimental target. |
| `我畀佢一本書。` | alternative-order collision probe | Current parser selects `PassivePermissiveRelation`, showing unresolved polyfunctionality and the danger of order-only role inference. |

## Decomposed research questions

### UC-RQ-002A — lexical predicate classes

Which modern predicates license markerless V-theme-recipient order?

At minimum distinguish:

- caused-transfer verbs such as `送`;
- lexical `畀` GIVE;
- teaching/communication verbs such as `教`;
- lending/borrowing verbs with Goal versus Source readings;
- creation/benefactive predicates;
- payment, sale, return, and presentation verbs.

A lexical census is required. The two-verb opening contrast is decisive against unrestricted productivity but not exhaustive.

### UC-RQ-002B — matrix-`畀` versus non-`畀` IDOC

Are these synchronically one construction with different phonological motivations, two subtypes, or unrelated surface convergences?

The 2024 experiment treats them separately. Canto Span should preserve that separation until shared diagnostics are independently established.

### UC-RQ-002C — theme and recipient roles

Does markerless V-theme-IO require a Goal/recipient reading? Can Source, beneficiary, addressee, possessor, or location arguments occur? Existing CP021B evidence suggests Goal–Source asymmetries and lexical restrictions, but the 2024 experiment does not provide a complete thematic inventory.

### UC-RQ-002D — direct-object prominence

Which discourse and prosodic conditions make the direct object sufficiently prominent for IDOC? Test new versus given information, contrastive focus, corrective focus, broad focus, and neutral-focus baselines.

### UC-RQ-002E — indirect-object weight

How should “light IO” be measured in Hong Kong Cantonese?

- pronoun versus lexical NP;
- syllable count;
- definiteness and givenness;
- syntactic branching;
- prosodic branching;
- coordination;
- classifier and modifier complexity.

No one binary heaviness feature is currently justified.

### UC-RQ-002F — relative DO–IO weight

The 2024 interaction results indicate that the relation between the two objects matters. Research must test relative prominence and weight, not only independent maximum lengths.

### UC-RQ-002G — phrasing and pause

What naturally produced acoustic cues distinguish IDOC from PDC and ordinary DOC?

Required measurements include boundary duration, final-syllable lengthening, intensity, F0 realization, speech rate, and prosodic grouping. The published artificial-pause direction must be resolved before it is used as a boundary.

### UC-RQ-002H — alternation with overt-marker PDC

For the same verb, theme, recipient, focus, and context, when do speakers select:

```text
V DO IO
V DO 畀 IO
```

The 2024 authors state that PDC is generally preferred. Production data are needed to determine present-day frequency and contexts of actual IDOC use.

### UC-RQ-002I — DOC comparison

For each verb class, test whether `V IO DO` is grammatical, changes meaning, or is contact-induced. The source's `教`/`送` contrast shows that the three orders cannot be collapsed.

### UC-RQ-002J — age, education, register, and region

Replicate across:

- adolescents, middle-aged adults, and older adults;
- education and written-Chinese exposure;
- Hong Kong versus Guangzhou and other Yue varieties;
- casual conversation versus formal/read speech;
- monolingual-dominant and bilingual speakers.

No age or regional result should be converted into a categorical grammar rule.

### UC-RQ-002K — text versus audio evidence

Can speakers reliably judge the intended IDOC reading from writing alone, or does orthography invite reanalysis as apposition, topic-comment structure, NP modification, or an incomplete clause? A parser over text may need to emit an ambiguity/review state unless prosodic evidence is supplied.

### UC-RQ-002L — representation options

Only after evidence collection should the project compare:

- one dedicated `InvertedDoubleObjectConstruction`;
- a triadic-argument frame with order/prosody features;
- a PDC-with-unrealized-linker analysis;
- lexical verb-specific constructions;
- no written-text construction label, with audio-only or ambiguity metadata instead.

The current research does not select among them.

## Minimal-contrast programme

| Block | Condition A | Condition B | Condition C | Main question |
|---|---|---|---|---|
| Triadic order | `S V IO DO` | `S V DO 畀 IO` | `S V DO IO` | predicate-specific availability of DOC/PDC/IDOC |
| Predicate class | `教`-type | `送`-type | lexical `畀` | lexical class and subtype split |
| IO weight | pronoun | short lexical NP | long/branched NP | final participant weight |
| DO weight | pronoun | short lexical NP | long/branched NP | prominence-bearing theme constraints |
| Relative weight | heavy DO + light IO | light DO + heavy IO | matched weight | relative prominence |
| Prosody | naturally integrated phrase | natural phrase boundary | controlled overt `畀` PDC | IDOC phrasing, not artificial silence alone |
| Information structure | DO focus | IO focus | broad/neutral focus | focus-shift hypothesis |
| Thematic role | Goal/recipient | Source | beneficiary/addressee | role restrictions |
| Social variation | age bands | education bands | region/register bands | variation without categorical grammar inference |

The critical task must use audio. Written forms may be included as a separate interpretation condition, not as a substitute for prosodic evidence.

## Evidence collection plan

1. Obtain Tong and Lee's supplementary materials and condition list; verify every matrix verb and lexical frame.
2. Request or obtain the study data/code to resolve the published pause-direction inconsistency and reproduce the model coding.
3. Extract Tang 1998 and Xu and Peyraube 1997 IDOC examples into a dedicated proposition ledger, preserving speaker-marked and theory-dependent judgments.
4. Obtain Tong 2018 and classify all claimed matrix verbs, weight contrasts, focus contexts, and acoustic observations.
5. Inspect Chin 2022 chapters 5–7 and appendices 5–8 for modern and historical order patterns, production/perception items, and northern-pattern contact effects.
6. Search conversational corpora for non-`畀` V-theme-recipient candidates and manually classify every hit against PDC ellipsis, apposition, fragments, transcription errors, and topic structures.
7. Build a blinded audio experiment with natural productions by multiple speakers; do not splice artificial pauses as the only phrasing manipulation.
8. Run a separate written interpretation task to measure ambiguity and orthographic reanalysis.
9. Add common transfer verbs to a research-only lexical inventory only after their forms, Jyutping, valency, and source attestations are recorded.
10. Re-audit runtime representation only after the audio, lexical-class, and corpus boundaries are stable.

## Provisional research outcome

| Question | Current answer |
|---|---|
| Is markerless `S V DO IO` independently attested in Hong Kong Cantonese? | **Yes**, with clear predicate-specific examples. |
| Is it freely productive across triadic predicates? | **No evidence; directly contradicted by the `送`/`教` contrast.** |
| Is the non-`畀` subtype purely syntactic? | **No; the checked study treats prosody and information structure as central.** |
| Is a light final IO favored? | **Supported as a tendency with strong DO–IO interaction; no categorical threshold is established.** |
| Is no pause definitively required? | **Unresolved because the published report contains conflicting raw-mean and model/discussion statements.** |
| Is the construction uniformly declining with younger speakers? | **No; the reported age pattern is U-shaped, not monotonic.** |
| Does the present runtime represent non-`畀` IDOC? | **No dedicated analysis. Generic wrappers can create misleading full coverage.** |
| Can `LexicalGiveRelation` stand for it? | **No; that node covers matrix lexical `畀`, a separately motivated subtype.** |
| Can `PostThemeParticipantRelation` stand for it? | **No; that node requires overt post-theme `畀/俾`.** |
| Is a new parser label authorized now? | **No.** |
| Is a dedicated research unit justified? | **Yes.** |
| Required next method | **Audio-based lexical-class and prosody study plus manually reviewed production/corpus evidence.** |
