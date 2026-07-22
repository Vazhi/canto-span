---
title: UC-RQ-001 — General zoeng1 pretransitive/disposal clause
research_id: UC-RQ-001
status: active_research_unit
baseline_version: 0.5.208
created: 2026-07-22
implementation_authorized: false
status_change_authorized: false
---

# UC-RQ-001 — General `將 zoeng1` pretransitive/disposal clause

## Research decision

A dedicated research unit is justified. Current Canto Span has a lexical entry for
`將 zoeng1` as a disposal coverb and one narrow runtime wrapper for
`會將 Object 變成 Result`, but it has no general construction representing the
independently described pretransitive pattern:

```text
Subject + 將 + affected/theme NP + predicate
```

This note does **not** authorize a new runtime label, parser fallback, grammar-note
status, or promotion. It converts UC-RQ-001 from a discovery lead into a bounded
research program.

## Narrow working description

The safest currently supported core is a clause in which:

1. an overt `將 zoeng1` follows an overt or contextually recoverable subject;
2. an affected/theme NP follows `將` and precedes the main predicate;
3. the following predicate describes handling, placement, caused motion, or another
   event affecting that NP;
4. the sequence is distinguished from ordinary postverbal-object SVO and from an
   unmarked left-dislocated object topic.

Only the **placement/displacement/handling** core has strong direct support in the
sources inspected for this checkpoint. A broad rule over every transitive or
resultative predicate is not established.

## Checked source findings

The source-verification ledger is:

`UC-RQ-001-GENERAL-ZOENG1-DISPOSAL-SOURCE-VERIFICATION-R1.tsv`

### 1. Direct reference-grammar attestation

Matthews and Yip's official CUHK grammar supplement has a section titled “The
JEUNG construction” and gives this attested example:

```text
佢將啲污糟衫周圍擗。
“He throws his dirty clothes all over the place.”
```

This directly supports an overt subject, `將`, a classifier-bearing affected NP,
and a following handling/displacement predicate. It does not by itself establish
the complete NP inventory, every compatible predicate class, or modern regional
uniformity.

### 2. Experimental displacement evidence

Mai, Kwan, and Yip studied the pretransitive `zoeng` construction through elicited
displacement instructions. Their Hong Kong baseline group consisted of 17 native
Cantonese speakers and preferred the `zoeng` construction in those displacement
contexts over canonical and topicalization structures. The heritage and émigré
groups used more canonical and topicalization structures, although their produced
`zoeng` sentences were reported as grammatical and felicitous.

This is strong evidence for a modern Hong Kong **displacement-context** profile and
for treating `zoeng`, canonical SVO, and topicalization as analytically distinct
response types. It is not evidence for unrestricted predicate productivity.

### 3. Competing analysis of the ordinary Cantonese disposal strategy

Yao's cross-dialectal study argues that Cantonese generally favors an SVCO strategy
rather than treating `將` as a direct equivalent of Mandarin `把` across contexts.
The article also reports that `將` appears less in casual conversation than formal
discourse and that more literary verbs are more susceptible than colloquial
counterparts. Its disposal-NP analysis centers definite, specific, or generic
interpretations.

This creates a real empirical restriction, not a reason to discard the construction:

- `將` is directly attested and experimentally preferred in a bounded displacement
  task;
- the broader frequency, register, lexical, and NP-distribution claims remain
  contested;
- ordinary Cantonese may often select an alternative word order even where a
  `將` clause is possible.

Yao also discusses earlier evidence that a definite bare NP can occur as a `將` NP.
Therefore, classifier-bearing NPs are a strong attested profile, not an absolute
classifier requirement at this stage.

### 4. Foundational and historical leads

Cheung's “The Pretransitive in Cantonese” is the foundational dedicated study cited
by later work. Bibliographic existence and topic were verified, but its full
argument and example inventory were not directly inspected here. It remains the
highest-priority source-extraction task.

Kataoka's historical work reports both `𢬿` and `將` in nineteenth-century
Cantonese disposal constructions. This is relevant to diachrony and marker
competition, but it cannot establish the distribution of present-day `將`.

## Collision audit

The detailed table is:

`UC-RQ-001-GENERAL-ZOENG1-DISPOSAL-COLLISION-AUDIT-R1.tsv`

### `DisposalChangeIntoResultFrame`

The current node requires this exact architecture:

```text
agent/topic + 會 + 將 + object + 變成 + result
```

The independently attested general pattern does not require `會`, `變成`, or a
change-into complement. The narrow wrapper is therefore only one possible lexical
realization inside the wider research domain. It cannot serve as the general
construction definition. Existing project research already identifies the wrapper
as a transparent composition and merge/retirement candidate.

### `CoverbFrame`

The lexicon calls `將` a `disposal_coverb`, but the current general `CoverbFrame`
does not emit on the checked `將` examples. Even if it did, a generic coverb wrapper
would not encode the construction-specific affected-object, predicate, word-order,
and competing-analysis questions. `CoverbFrame` is a possible component analysis,
not a demonstrated substitute for the construction.

### `TopicComment`

The experimental study codes `zoeng`, canonical, and topicalization structures
separately. An unmarked object topic does not contain the overt marker `將`.
Prosody and discourse status may still overlap, but `TopicComment` should not absorb
all `將` clauses merely because the preposed NP can be discourse-prominent.

### Ordinary SVO

Ordinary SVO places the object after the lexical verb. The `將` profile places the
affected/theme NP before the main predicate. Alternation between the two orders is
part of the research question rather than evidence that they are the same parser
construction.

### CP021B lexical-`GIVE` boundary

A separate current code branch checks `將` while protecting lexical `GIVE`
restructuring. It does not emit a general disposal construction and does not resolve
this research item.

## Sandbox runtime observations

The following are implementation observations only; their evidence weight is zero.
They were produced from the v0.5.208 sandbox baseline.

| Surface | Current result relevant to UC-RQ-001 |
|---|---|
| `佢將啲污糟衫周圍擗。` | `將` remains a lexical token; no general disposal construction emits. |
| `我將個蘋果放喺三角形入面。` | The object NP and lexical material parse partly; no general disposal construction emits. |
| `將啲蕃茄放落去煮。` | Directional/verb-complement material parses partly; no general disposal construction emits. |
| `佢將道門閂埋。` | `將` remains lexical; no general disposal construction emits. |
| `佢會將呢間屋變成餐廳。` | The narrow `DisposalChangeIntoResultFrame` emits. |

These observations establish an ontology/runtime gap. They do not establish which
of the source examples should ultimately receive one new label, multiple subtypes,
or only compositional role metadata.

## Decomposed research questions

### UC-RQ-001A — predicate domain

Which predicate classes license the construction in current Hong Kong and
Guangzhou Cantonese?

- caused placement and displacement;
- handling and distribution;
- change of state and result;
- consumption or exhaustive affectedness;
- creation and destruction;
- perception, cognition, possession, and stative predicates as potential boundaries.

The first class is source-supported. The rest require direct evidence.

### UC-RQ-001B — affectedness and event structure

Must the post-`將` NP undergo a result, change of location, change of state, or
measurable affectedness? Can an atelic activity predicate occur without a result,
direction, quantity, or completion expression?

### UC-RQ-001C — NP interpretation

Which NP forms are possible after `將`, and which readings do they force?

- demonstrative + classifier + noun;
- bare classifier + noun;
- plural/collective classifier + noun;
- pronoun or proper name;
- bare noun with definite, specific, or generic interpretation;
- numeral-classifier NP with specific or nonspecific interpretation.

No universal overt-classifier requirement should be encoded before the bare-NP
claims in the foundational literature are directly checked.

### UC-RQ-001D — subject and causer

Is an animate agent required, or can inanimate causes, institutions, natural
forces, and omitted imperative subjects license the frame? Which omissions are
syntactic and which are discourse recovery?

### UC-RQ-001E — register and lexical choice

How strongly do formality, written style, and literary-versus-colloquial verb choice
condition acceptability and production? Are the differences categorical,
probabilistic, age-graded, or task-specific?

### UC-RQ-001F — `將` versus SVO

For matched events and NPs, when do speakers prefer:

```text
S + 將 + O + VP
S + V + O + complement
```

The comparison must control information structure, NP definiteness, event result,
verb choice, and context.

### UC-RQ-001G — `將` versus topicalization

For matched content, what separates:

```text
S + 將 + O + VP
O, S + VP
```

Required diagnostics include prosody, resumptives or gaps, subject presence,
particle placement, discourse givenness, and whether the preposed NP is interpreted
as the affected object of the following predicate.

### UC-RQ-001H — marker category

Is `將` best represented for Canto Span as a coverb head, a disposal/pretransitive
marker, a serial-verb element, or a construction-specific function whose category
varies diachronically or by analysis? Parser implementation must not settle this
by lexical naming alone.

### UC-RQ-001I — internal subtypes

Does one general construction cover displacement, handling, and change-result
profiles, or should the ontology distinguish at least:

- caused-displacement `將` clause;
- handling/distribution `將` clause;
- result/change-of-state `將` clause;
- formal or lexicalized `將` profiles?

Subtype creation requires evidence that the distinctions affect syntax or
interpretation, not merely verb meaning.

### UC-RQ-001J — regional and heritage scope

How do Hong Kong, Guangzhou, other Yue varieties, heritage speakers, and written
Cantonese differ in production and judgment? Heritage vulnerability must not be
misrepresented as a boundary of the baseline Hong Kong construction.

## Minimal contrast programme

The next evidence phase should use matched lexical sets rather than isolated
sentences.

| Contrast block | Condition A | Condition B | Condition C | Main question |
|---|---|---|---|---|
| Word order | `S 將 O VP` | ordinary `S V O ...` | unmarked `O, S VP` | construction versus SVO/topicalization |
| Predicate class | caused placement | change of state/result | atelic/non-affecting predicate | affectedness and event structure |
| NP form | demonstrative/classifier NP | bare classifier NP | bare or numeral-classifier NP | definiteness/specificity constraints |
| Subject type | animate agent | inanimate cause | omitted imperative subject | external-argument restrictions |
| Register | common colloquial verb | semantically matched literary verb | neutral alternative word order | register and lexical susceptibility |
| Result marking | explicit goal/result | completive/directional complement | no overt endpoint | endpoint/result requirement |

Every generated sentence must receive a semantic-coherence and lexical-naturalness
review before it is treated as a panel item. No semantically anomalous object may be
used as a grammatical boundary.

## Evidence collection plan

1. Obtain and inspect the full Cheung 1992 chapter; extract every explicit positive,
   marked, and negative example with page locators.
2. Inspect the complete Mai, Kwan, and Yip materials for elicitation prompts,
   coding criteria, lexical frames, and exact baseline productions.
3. Reconcile Yao's alternative SVCO analysis with the pretransitive literature,
   preserving genuine disagreement rather than selecting one account in advance.
4. Search modern conversational and formal Cantonese corpora for `將`; classify
   each usable hit by predicate class, NP form, register, region, and competing
   analysis.
5. Build semantically matched SVO, topicalization, and `將` contrast sets.
6. Use a blinded native-speaker task that asks naturalness and preferred
   interpretation/order without exposing any parser mapping.
7. Re-audit the current narrow `DisposalChangeIntoResultFrame` only after the
   general evidence map is stable.

## Provisional research outcome

| Question | Current answer |
|---|---|
| Is a modern Cantonese `將` pretransitive construction independently attested? | **Yes**, especially in handling/displacement contexts. |
| Is it equivalent to a general Mandarin-style `把` construction? | **Not established; challenged by Yao's distributional analysis.** |
| Does the present runtime represent it generally? | **No.** |
| Can the current narrow `會將…變成…` node stand for it? | **No; it covers only one transparent profile.** |
| Is a new parser label authorized now? | **No.** |
| Is a dedicated research unit justified? | **Yes.** |
| Safest evidence-backed core | `S + 將 + affected/classifier-bearing NP + handling or caused-displacement predicate`. |
| Main unresolved boundaries | predicate domain, affectedness, NP interpretation, subject type, register, prosody, region, and competition with SVO/topicalization. |

## Exit conditions

UC-RQ-001 may leave active research only after one of these dispositions is justified:

- **dedicated construction:** a stable general profile with source-linked positive
  and negative boundaries;
- **typed subconstruction family:** independently motivated displacement, handling,
  and result subtypes;
- **compositional merge:** evidence shows that marker, NP, and predicate roles can be
  represented without a construction-specific node;
- **defer:** evidence remains register-, prosody-, or region-dependent and cannot yet
  support a parser decision.

Until then, the current grammar statuses remain unchanged.
