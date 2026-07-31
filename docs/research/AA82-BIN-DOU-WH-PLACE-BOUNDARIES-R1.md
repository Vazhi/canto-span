---
title: AA82 — Cantonese 邊度 expression, question-force, and role boundaries R1
status: primary_source_synthesis_complete
construction_uuid: 4593e90d-b923-54af-a9ac-533409c38355
construction_code: AA82
canonical_name: BinDouWhPlaceQuestion
intake_issue: 266
work_claim: 311
reviewed_on: 2026-07-29
primary_source_ledger: docs/research/AA82-WH-PLACE-PRIMARY-SOURCE-LEDGER-R1.tsv
---

# AA82 — Cantonese 邊度 expression, question-force, and role boundaries R1

## Executive finding

The earlier repository-only conclusion was partly correct and partly too restrictive.

Primary sources support a broad Cantonese **wh-place expression family** containing at
least:

```text
邊度  bin1dou6
邊庶  bin1syu3
邊    bin1
```

Within that family, exact `邊度` occurs in several independently distinguishable
structures:

- direct location questions;
- event-location and existential-location questions;
- motion-goal questions;
- motion-source and origin questions;
- possible path or route questions;
- body-part or affected-locus questions;
- embedded interrogatives;
- rhetorical questions;
- negative-wh constructions that are not questions;
- negative-indefinite or free-choice-like structures;
- discourse fragments and echo prompts.

This means that neither of the following is adequate:

```text
邊度 token => location question
邊度 token => one semantic role
```

The role and question status come from the full clause, predicate, overt adposition or
coverb, word order, particles, discourse context, and constructional environment.

The old draft's claim that the **source role was unestablished** is overturned. The CUHK
institutional materials directly attest:

```text
由邊度出發呀？
城大由邊度上去呀？
```

They also attest lexical origin without overt `由`:

```text
你邊度嚟㗎？
```

The old draft's treatment of `喺邊度？` as merely an unresolved fragment is also too
strong. It is directly taught as an ordinary elliptical location question. Its omitted
subject or predicate may be discourse-recoverable, but its overt `喺` licenses a
location relation.

The old decision to retain one exact AA82 UUID **may remain viable only if AA82 is kept
strictly as an interrogative construction whose full span and parent structure establish
question force**. If the runtime node is merely an exact-token node named “Question,”
the identity conflates a lexical wh-place expression with one clause type and requires
later decomposition or renaming.

No identity, status, runtime, fixture, corpus, survey, release, or deployment change is
made in this findings issue.

## Research question

Which exact `邊度` profiles should be independently represented or compositionally
distinguished within or around `AA82 BinDouWhPlaceQuestion`?

The review covers:

- static or identificational location;
- event location and existential location;
- motion goal;
- motion source and origin;
- path or route;
- body-part or affected locus;
- bare and elliptical fragments;
- embedded interrogatives;
- rhetorical and negative-wh structures;
- negative-indefinite or free-choice-like uses; and
- the lexical variants `邊度`, `邊庶/邊處`, and `邊`.

## Primary source base

The proposition ledger is:

`docs/research/AA82-WH-PLACE-PRIMARY-SOURCE-LEDGER-R1.tsv`.

### Wong et al. 2023

The GACS chapter explicitly characterizes Cantonese as a wh-in-situ language and groups
three “where” forms:

```text
邊度  bin1dou6
邊庶  bin1syu3
邊    bin1
```

Its exact example is:

```text
擺喺邊度呢？
baai2 hai2 bin1dou6 le1
```

This establishes:

- overt `邊度` as a wh-place expression;
- overt `喺` as part of one locative structure;
- in-situ placement where the answer or locative phrase would occur; and
- a source-supported lexical variant family broader than exact `邊度`.

It does not show that the variants are identical in region, age, register, frequency, or
all syntactic environments.

### Yip and Matthews

Basic Cantonese lists `邊度` as the ordinary “where” expression and treats Cantonese wh
forms in the position occupied by their answers. Their broader grammar also provides a
critical non-question example:

```text
我今日邊度都冇去。
“I haven’t been anywhere today.”
```

This proves that overt `邊度` is not intrinsically a question node. Interrogative force
must be separately licensed.

### Law 2002

Law's analysis of Cantonese questions states that wh phrases remain in situ and uses a
`去咗邊度` example in its discussion of wh-question force. The same paper explicitly
notes that Cantonese wh elements can receive indefinite-variable readings.

The exact formal CP analysis is not required here. The durable project-level conclusion
is that:

- surface wh material and question force are distinct;
- sentence-final particles and clause type interact with wh questions; and
- a wh token alone cannot determine the clause's interpretation.

### Cheung 2006

Cheung directly contrasts:

- interrogative wh-place clauses;
- rhetorical wh-place questions;
- embedded wh-place complements; and
- a negative-wh construction that is not a question.

A decisive embedded example is:

```text
佢想知道佢哋可以喺邊度搵到水呀。
“He wanted to know where they could find water.”
```

Cheung also shows that `邊(度)` in a restricted premodal position can express a negative
“no way” interpretation rather than a location question. The paper reports speaker
variation and different selectional possibilities for embedded interrogative,
rhetorical, and negative-wh clauses.

Therefore “embedded” is not a reason to reject `邊度`, and “contains 邊度” is not a
reason to label a clause a direct question.

### CUHK Cantonese Online Tutorial

The institutional lessons provide a broad controlled usage inventory.

#### Direct and elliptical location

```text
喺邊度？
你喺邊呀？
洗手間喺邊度呀？
中文、翻譯及語言學系喺邊呀？
邊度係中文系辦公室呀？
```

#### Event and existential location

```text
你部手提電話喺邊度買㗎？
邊度有影相機賣？
喺邊度有賽馬睇呀？
年初二喺邊度有煙花睇呀？
```

The `邊度有...` pattern is especially important: it supplies a location through the
existential or availability clause without an overt `喺`. Canto Span must not insert a
hidden preposition.

#### Motion goal

```text
你打算去邊度玩呀？
買電器最好去邊度呀？
去邊度可以游水呀？
買手提電話去邊度好呀？
```

#### Motion source and origin

```text
你最近幾時返過大陸，由邊度出發呀？
城大由邊度上去呀？
你邊度嚟㗎？
```

The first two have overt `由`. The third receives an origin/source reading from lexical
`嚟`, construction, and discourse without overt `由`. The correct rule is therefore not
“source requires a visible source marker”; it is “source requires independently licensed
source or origin structure and must not be inferred from motion adjacency alone.”

#### Possible path or route

```text
行邊度最好？
由邊便出去呀？
```

These examples show that a static location/goal/source trichotomy may be incomplete.
`邊度` can participate in route or path questions. The exact path analysis remains a
bounded research question because the translation and context may also support a
location or directional-side reading.

#### Body-part or affected locus

```text
你邊度唔舒服呀？
```

Here `邊度` asks for the locus of discomfort on the body, not a destination or ordinary
geographic location. A role taxonomy should therefore use a broader `locus` or
`place-domain` parent with explicitly typed subroles rather than treating all uses as
spatial location.

#### Embedded interrogative

```text
你知唔知道邊度有影相機賣？
```

This is an institutional embedded-wh example. The full matrix clause is a yes/no or
A-not-A question about knowledge; the embedded content contains a wh-place variable.
The parser must preserve both levels rather than labeling the entire string only as a
direct locative wh question.

#### Non-question uses

```text
有啲人就邊度都唔去。
```

This corroborates the negative-indefinite evidence in Matthews and Yip and reinforces
that lexical `邊度` can occur without interrogative force.

## Role inventory

The primary sources justify this research-level role inventory.

### 1. Static or identificational location

Licensed by overt locative structure or a location/identity predicate:

```text
洗手間喺邊度呀？
邊度係中文系辦公室呀？
擺喺邊度呢？
```

The first two ask where an entity is. The third asks for the placement location of an
object. Their roles are related but not necessarily identical at every compositional
level.

### 2. Event or availability location

Licensed by the event or existential/availability clause:

```text
你部手提電話喺邊度買㗎？
邊度有影相機賣？
喺邊度有賽馬睇呀？
```

`邊度有...` must remain visible as a no-`喺` surface profile. The location role comes
from the clause, not hidden repair.

### 3. Motion goal

Licensed by a goal-selecting motion or purposive parent:

```text
你去咗邊度呀？
你打算去邊度玩呀？
```

Perfective `咗`, when present, belongs to the motion predicate. `邊度` is not thereby an
ordinary patient object.

### 4. Motion source or origin

Licensed by overt `由 + 邊度`, a source-selecting predicate, or an independently
established origin construction:

```text
由邊度出發呀？
城大由邊度上去呀？
你邊度嚟㗎？
```

The source role is now directly established. It must not be inferred solely because any
motion word co-occurs with `邊度`.

### 5. Path or route candidate

Possible examples include:

```text
行邊度最好？
由邊便出去呀？
```

This profile requires further corpus and context review. It should not be silently
collapsed into goal or source merely to preserve a three-role ontology.

### 6. Body-part or affected locus

```text
你邊度唔舒服呀？
```

This is a directly attested wh-locus profile outside ordinary place, path, goal, and
source. It supports a semantic `locus` supertype while requiring lexical and domain
boundaries.

### 7. Unresolved discourse fragment

A bare prompt such as:

```text
邊度呀？
```

can function as a request for clarification, an echo prompt, or a contextually recovered
location, goal, source, or other locus. Without context, the visible fragment does not
supply a unique role.

This differs from:

```text
喺邊度？
```

which is also elliptical but overtly contains a locative predicate/preposition and thus
licenses a location relation.

## Clause-type inventory

### Direct information-seeking wh question

The clause asks for a value of the wh-place variable. This is the clearest current AA82
candidate.

### Rhetorical wh question

The clause has question syntax but is not used to solicit an unknown answer. Cheung and
Law show that question force and discourse use must be distinguished. A rhetorical
question may remain inside a broad wh-question family while carrying different
pragmatic metadata.

### Embedded interrogative

A cognition, speech, or attitude predicate selects a wh-place complement:

```text
想知道...喺邊度...
知唔知道邊度有...？
```

The embedded clause contains the wh-place dependency, while the matrix clause may have
its own question type. It should not be flattened into one direct-question node.

### Negative-wh construction

Cheung's premodal `邊(度)` can express “no way” and fail questionhood diagnostics. This
is not AA82 merely because the same lexical material appears.

### Negative indefinite or polarity-sensitive use

```text
邊度都冇去
冇邊度去
```

These receive “anywhere/nowhere” interpretations and lack direct wh-question force.
They require independent polarity and quantificational analysis.

### Fragment or echo prompt

Bare `邊度呀？` may be licensed by discourse rather than a complete local clause. Its
role and question subtype require context.

## Lexical variants

### `邊度`

The exact form currently tracked by AA82. It has the widest directly reviewed range in
this project, including direct, embedded, negative-indefinite, rhetorical, and negative-wh
uses.

### `邊`

Wong et al. list it as a “where” form, and CUHK directly teaches:

```text
你喺邊呀？
中文、翻譯及語言學系喺邊呀？
```

It is not ungrammatical or merely an unrelated token. It is a source-supported lexical
variant or shorter form. Exact AA82 matching may still exclude it, but the ontology must
record the sibling relationship rather than treating it as a negative boundary of the
Cantonese wh-place family.

### `邊庶` / `邊處`

Wong et al. list `邊庶`, and CUHK materials use `邊處`. These are related place-wh forms
with regional, historical, pedagogical, or orthographic differences that remain to be
measured. They should not inherit exact `邊度` evidence automatically, but they are not
negative controls for “where” questions.

## Identity adjudication

### Option 1: retain AA82 as a direct-question construction

This is defensible only if the node spans and requires independently established
interrogative structure, not merely the `邊度` token. The identity would then cover
question uses with typed roles and exclude embedded, negative-wh, and indefinite uses
at the outer construction level while allowing a shared lexical child.

Required clarification:

- direct versus rhetorical question metadata;
- whether elliptical `喺邊度？` counts as a direct wh question;
- whether bare `邊度呀？` requires a fragment subtype;
- how role metadata is inherited from parent predicates;
- how alternative lexical forms are linked as siblings.

### Option 2: rename or decompose to a lexical wh-place expression

If the runtime node covers only overt `邊度` or is emitted without proving question
force, `BinDouWhPlaceQuestion` overstates the node. The source-aligned lower-level
identity would be closer to:

```text
BinDouWhPlaceExpression
```

with independently typed direct-question, embedded-interrogative, rhetorical,
negative-wh, and polarity constructions above it.

This option avoids calling every lexical occurrence a question but requires collision
and compatibility review before any UUID or runtime change.

### Recommendation

**Do not split permanent UUIDs by location, goal, source, path, or body-locus role.**
Those roles are compositionally licensed by the surrounding structure and share the
same overt wh-place form.

**Do not yet confirm the current question identity unchanged.** First complete a
runtime-span audit:

- if the node spans a full interrogative dependency, retain and narrow the question
  identity with typed role and clause metadata;
- if the node is token-local or fires in embedded/non-question contexts, decompose it
  into a lexical wh-place child and independent clause-level constructions.

No identity mutation is authorized by this findings issue.

## Revised boundary matrix

| Surface/profile | Research disposition |
|---|---|
| `你去咗邊度呀？` | direct goal question |
| `你打算去邊度玩呀？` | goal/purpose question |
| `擺喺邊度呢？` | direct placement-location question |
| `洗手間喺邊度呀？` | direct static-location question |
| `喺邊度？` | elliptical but overtly locative question; role is not unresolved |
| `邊度有影相機賣？` | event/availability-location question with no hidden `喺` |
| `由邊度出發呀？` | direct source question |
| `你邊度嚟㗎？` | source/origin profile without overt `由`; lexically and constructionally licensed |
| `行邊度最好？` | path/route candidate; do not force goal or location |
| `你邊度唔舒服呀？` | body-part or affected-locus question |
| `你知唔知道邊度有影相機賣？` | embedded wh-place content inside a matrix question |
| `想知道...喺邊度...` | embedded interrogative complement |
| `邊度呀？` | discourse-dependent fragment/echo prompt; role unresolved without context |
| `我今日邊度都冇去` | negative indefinite, not a direct question |
| premodal negative `邊(度)` | negative-wh construction, not a question |
| rhetorical `喺邊度...呀？` | rhetorical question; question structure with distinct discourse force |
| `你喺邊呀？` | source-supported lexical variant, not exact AA82 but not a wh-family negative |
| `去邊庶/邊處玩呀？` | source-supported lexical variant, distribution requires review |
| `呢度`, `嗰度` | demonstrative place expressions, not wh-place expressions |
| unrelated lexical `邊` or `度` | false positive unless the combined structure is wh-place |

## Consequences for issue #312

The former implementation specification is no longer accurate as written.

### Superseded assumptions

- Source role is not unestablished; it is directly attested.
- `喺邊度？` is not merely an unresolved fragment; overt `喺` provides a location
  relation.
- The role inventory extends beyond location, goal, and source.
- Embedded and non-question uses show that lexical `邊度` and direct-question status
  must be separated.
- `邊` and `邊庶/邊處` are source-supported siblings, not negative evidence against the
  wh-place family.

### Required next step before implementation

Perform a line-by-line runtime-span and collision audit to determine whether current
`LocativeWhQuestion` nodes:

- span the whole interrogative structure or only lexical `邊度`;
- fire inside embedded interrogatives;
- fire in `邊度都` or negative-wh structures;
- preserve overt `喺`, `由`, motion predicates, and particles;
- can carry role and clause-type metadata without duplicating existing motion,
  locative, existential, cognition, or question nodes.

Only after that audit should a replacement accepted specification be written.

## Consequences for issue #313

The source-existence questions are largely resolved:

- source-marked `由邊度` questions exist;
- embedded wh-place clauses exist;
- variants `邊度`, `邊庶/邊處`, and `邊` are directly recognized;
- `喺邊度？` is directly licensed;
- negative-indefinite and negative-wh uses establish non-question boundaries.

The remaining work should focus on:

- corpus distribution by role and clause type;
- bare `邊度呀？` fragment contexts;
- path/route and body-locus profiles;
- regional, age, register, and speaker distribution of the variants;
- rhetorical versus information-seeking usage;
- runtime collisions and false positives.

## Final disposition

- Cantonese wh-place lexical family: **primary-source supported**.
- Exact `邊度` direct location questions: **supported**.
- Event/availability-location questions without overt `喺`: **supported; no hidden
  preposition**.
- Motion-goal questions: **supported**.
- Motion-source/origin questions: **supported with overt `由` and in lexical origin
  profiles without `由`**.
- Path/route role: **attested candidate requiring further contextual classification**.
- Body-part/affected-locus role: **directly attested**.
- Embedded interrogative use: **directly supported**.
- Rhetorical use: **supported and distinct in discourse force**.
- Negative-wh and negative-indefinite uses: **supported non-question boundaries**.
- `喺邊度？`: **elliptical but role-resolved locative question**.
- bare `邊度呀？`: **context-dependent fragment/echo prompt**.
- `邊` and `邊庶/邊處`: **source-supported sibling forms, not exact AA82 matches and not
  family-level negatives**.
- Permanent role-specific UUID split: **not justified**.
- Current AA82 question identity unchanged: **not yet confirmed; depends on runtime-span
  audit**.
- Hidden `喺`, `由`, goal, source, noun, or other material: **prohibited**.
- UUID, identity, status, runtime, tests, corpus decisions, survey, release, and
  deployment: **unchanged in this findings issue**.
