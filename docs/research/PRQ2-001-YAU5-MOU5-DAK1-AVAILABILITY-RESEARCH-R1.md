---
title: PRQ2-001 — yau5/mou5 dak1 availability and opportunity research
research_id: PRQ2-001
status: active_research_unit
baseline_version: 0.5.213
created: 2026-07-23
queue_visibility: completed_task_only
implementation_authorized: false
status_change_authorized: false
master_backlog_change_authorized: false
---

# PRQ2-001 — `有得／冇得 + VP` availability and opportunity

## Research decision

Promote preverbal `有得 jau5dak1` and `冇得 mou5dak1` followed by a verbal predicate to a dedicated **research unit** for availability, opportunity, or externally conditioned possibility.

The strongest checked source treats `有-得` as a unit that indicates possibility of the following event and `冇-得` as its negative counterpart expressing unavailability or impossibility. HKCanCor independently contains both forms as verb-auxiliary tokens (`VU`) before predicates. These facts are not preserved by splitting `有/冇`, `得`, and the following VP into unrelated tokens.

The evidence does **not** yet justify one universal English gloss or one productive parser template. Contexts may involve availability, practical opportunity, permission, qualification, access, or conditions that make an event possible. The exact semantic partition, subject realization, lexical selection, and relation to `可以`, `V到/V唔到`, and postverbal `得` remain research questions.

This note authorizes no parser change, registry entry, construction-status change, master-backlog edit, lexical installation, or automatic acceptance rule.

## Narrow supported profile

The directly supported surface profile is:

```text
(optional topic / experiencer / condition)
    + 有得／冇得
    + overt verbal predicate
    + (object / complement)
    + (particle)
```

At research level:

```text
有得 + VP
    -> circumstances make the VP event available or possible

冇得 + VP
    -> circumstances make the VP event unavailable or impossible
```

This is a semantic paraphrase, not an executable definition. The construction may have an overt subject, an understood experiencer or beneficiary, a locative setting, or a preceding condition. The checked sources do not establish that all predicates, subjects, objects, or discourse contexts are freely interchangeable.

## Direct source findings

The source-verification ledger is:

`PRQ2-001-YAU5-MOU5-DAK1-AVAILABILITY-SOURCE-VERIFICATION-R1.tsv`

### Lam, Lau, and Lee 2024

The LREC-COLING paper on Cantonese word segmentation explicitly analyzes `有` as capable of combining productively with `得`. It says the `有-得` cluster indicates possibility of the event denoted by the following verb. It applies the same analysis to negative `冇-得`, which denotes unavailability or impossibility.

The paper supplies exact examples equivalent to:

```text
先至有得睇𡃉𡃉。
“Only then is it available to watch.”

冇得睇 Sailor Moon 啊。
“The child cannot watch the Sailor Moon cartoon.”
```

This directly supports a preverbal unit and an overt following predicate. Because the paper's principal purpose is word segmentation, it does not settle the complete syntax, modality taxonomy, subject structure, scope, or productivity of the construction.

### HKCanCor through PyCantonese

The official PyCantonese documentation displays the beginning of the HKCanCor corpus and includes:

```text
平機票要淡季先有得平𡃉喎。
冇得去嗱。
```

The corpus annotation assigns both `有得` and `冇得` the `VU` tag, alongside other modal or auxiliary-like verbal items. This independently confirms that the forms occur as units before predicates in natural Hong Kong Cantonese conversation.

The repository's preserved HKCanCor context inventory contains additional naturally occurring examples, including:

```text
冇得揀
冇得享用哩個福利
有得計？
幾時再有得 in
冇得攞？
冇得停
冇得俾你創作
```

Those rows were originally retained as unscreened lexical candidates in a different query. They attest occurrence and structural diversity, but are not a balanced census and do not by themselves establish semantic classes or productivity.

### Specialist description lead

A bibliographic record identifies Peng Xiaochuan's 1996 article `《广州话的“有得（冇得）”句》` in *暨南学报* (social-science edition), issue 4. The full article was not recovered during this task. Its existence strengthens the case that this is a recognized Guangzhou Cantonese sentence type, but no substantive claim from the unavailable article is imported here.

### Pedagogical contrast evidence

A detailed Cantonese teaching source describes `有得/冇得 + V` as possibility determined by surrounding conditions rather than solely by an actor's inherent ability or intention. It contrasts:

```text
我哋去唔到海洋公園。
聽日冇得去海洋公園喇。
```

and gives a location-dependent example equivalent to `喺呢間戲院冇得睇…`. This is useful for designing contrasts with `V到/V唔到`, but it is pedagogical rather than peer-reviewed and cannot establish a categorical universal.

## Structural and semantic contrasts

### 1. Preverbal `有得／冇得` versus postverbal potential `得／唔`

`冇得去` has the marker sequence before the predicate. Result-potential forms such as `行得入去` or `行唔入去` place potential morphology after the lexical verb and retain overt result or directional material. Cheng and Sybesma's postverbal-`得` analysis therefore supplies a decisive contrast, not evidence for the preverbal construction.

Do not derive:

```text
冇得去
```

from a hidden or reordered version of:

```text
去唔到
行唔入去
```

### 2. `有得／冇得 + VP` versus preverbal `可以／唔可以 + VP`

Both families can be translated with English “can/cannot.” The checked evidence suggests that `有得/冇得` foregrounds the existence or absence of enabling circumstances or access. `可以` can also express permission or possibility, but the sources inspected here do not establish a complete replacement matrix.

The parser should not rewrite one form as the other, and future testing must include contexts in which both are possible, only one is natural, or the interpretation changes.

### 3. `有得／冇得 + VP` versus existential or possessive `有／冇 + NP`

In the target construction, `有得/冇得` precedes a verbal predicate and is treated as a unit in the strongest checked source and in HKCanCor annotation. Possessive or existential clauses introduce nominal material instead. A following graph that can be either a noun or a verb therefore requires lexical-category and context checks.

Compare the intended distinction between:

```text
我聽日仲有面試。
“I still have an interview tomorrow.”

我聽日仲有得面試。
“I still have the opportunity/qualification to interview tomorrow.”
```

The exact second sentence appears in public learner discussion, not in the primary research sources, so it remains a contrast probe rather than a gold example.

### 4. Positive/negative polarity and `有冇得` questions

HKCanCor and the word-segmentation paper directly support positive `有得` and negative `冇得`. Natural question forms such as `有冇得 + VP` are also widely attested, but the current research set has not yet established whether all such questions are best analyzed as an A-not-A form over the availability unit, an existential-polarity question, or a separate conventional question profile.

Keep these as related but separately tested surfaces:

```text
有得去。
冇得去。
有冇得去？
```

### 5. Conditional or focus material outside the core

The exact source example `先至有得睇` and HKCanCor `淡季先有得平` show that `先/先至` can precede the availability unit. That material contributes a restricted condition or “only then” dependency. It should not be swallowed into an unconstrained `有得` lexical entry.

### 6. Compositional and lexicalized `冇得 X`

Some `冇得 + V` expressions transparently deny access or opportunity, such as `冇得去`, `冇得揀`, and `冇得享用…`. Other frequent expressions may be lexicalized or idiomatic:

```text
冇得彈
冇得頂
冇得解
冇得比
冇得揮
```

Their meanings cannot be predicted safely from a generic availability template. They require lexical and construction-specific screening before being admitted as productive evidence.

## Exact runtime collision audit

The collision ledger is:

`PRQ2-001-YAU5-MOU5-DAK1-AVAILABILITY-COLLISION-AUDIT-R1.tsv`

Direct v0.5.213 probes show the missing structure clearly.

### `我冇得去啊。`

The runtime recognizes only `去` as `DirectionalMotionVP`. `我`, `冇`, and `得` remain unwrapped, and root coverage is partial. The output therefore loses both the subject and the availability/opportunity relation.

### `我有得去。`

The same failure occurs under positive polarity: only `去` is wrapped and `我有得` remains outside the construction.

### `你有冇得去？`

The runtime leaves `你`, `有冇`, and `得` unwrapped and recognizes only the motion predicate. It does not represent the polarity question over availability.

### `呢度有冇得改衫？`

Only `改衫` receives a `TransitiveVP` analysis. The locative setting and availability question remain unattached.

### `先至有得睇。`

No top construction is produced. `先至`, `有`, `得`, and `睇` remain separate tokens.

### `平機票要淡季先有得平㗎喎。`

A broad heuristic `ModalVP` spans `要淡季先有得平`, but the surrounding nominal material is malformed and root coverage remains partial. This is not evidence that `ModalVP` already represents the construction; it demonstrates that a broad modal wrapper can hide the internal dependency.

### Object-bearing and lexical-boundary probes

`冇得享用呢個福利` is fragmented and partially miswrapped around `用呢個`; `冇得揀`, `有得計`, and `冇得攞` receive no top construction. Idiomatic `冇得彈` and `冇得解` likewise lack an analysis, but must not be used as direct evidence for the productive VP family without lexical screening.

## Quarantined questions

Future work must establish:

- whether `有得` and `冇得` are one polarity paradigm or partly asymmetric constructions;
- the full semantic split among availability, opportunity, access, permission, qualification, practical possibility, and circumstantial ability;
- whether an overt subject is licensed, preferred, disfavored, or interpreted differently in each subtype;
- which experiencer, beneficiary, agent, location, or condition is implicit in subjectless clauses;
- the status of `有冇得 + VP`, short answers, ellipsis, and fragment uses;
- compatibility with transitive, intransitive, stative, motion, cognition, speech, and result predicates;
- object position, complement size, serial verbs, aspect, negation, focus, temporal adverbs, and final particles;
- exact differences from `可以`, `能夠`, `V到/V唔到`, postverbal `V得R/V唔R`, `有冇 + VP`, and existential/possessive `有/冇`;
- whether `先/先至`, conditional clauses, locations, and causal clauses license or merely contextualize the construction;
- which `冇得 X` strings are compositional, semi-lexicalized, or fully idiomatic;
- Hong Kong/Guangzhou, age, register, written-Cantonese, and prosodic variation;
- the detailed claims of Peng 1996 once a verifiable full text is obtained.

## Provisional outcome

| Question | Current answer |
|---|---|
| Are preverbal `有得/冇得 + VP` directly attested in Cantonese? | **Yes.** |
| Does a primary source treat `有-得/冇-得` as units before a following verb? | **Yes.** |
| Is possibility versus unavailability/impossibility directly described? | **Yes, at a broad research level.** |
| Are natural positive and negative HKCanCor examples available? | **Yes.** |
| Is the construction identical to postverbal potential `V得R/V唔R`? | **No.** |
| Is it identical to existential or possessive `有/冇`? | **No.** |
| Is it freely interchangeable with `可以` or `V到/V唔到`? | **Not established.** |
| Are `有冇得` questions and idiomatic `冇得 X` fully analyzed? | **No; quarantined.** |
| Does the current runtime represent the dependency? | **No; direct probes are partial, absent, or misleadingly broad.** |
| Is a dedicated research unit justified? | **Yes.** |
| Is parser implementation authorized? | **No.** |

## Exit conditions

PRQ2-001 may leave active research only after source recovery and controlled evidence establish the polarity paradigm, subject and implicit-role structure, predicate and object selection, question and ellipsis profiles, contrasts with other possibility constructions, and the lexicalized boundary. Any implementation would require a separately authorized parser change and held-out validation event.
