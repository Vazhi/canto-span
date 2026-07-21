# CP032 — RUL01 source, implementation, and survey-readiness checkpoint

Status: **research prerequisites complete; survey prompt required before instrument creation**

Parser behavior changed: **no**

## Decision

`ResourceUseLaiFunctionRelation` remains `research_pending`. The next useful
native-panel wave cannot be a larger version of the old binary naturalness
form. The research question has now been divided into twelve contrast domains
in `CP032-P1-RUL01-CONTRAST-REQUIREMENTS-R1.tsv`.

No survey instrument, final item wording, or locked manifest is created in this
checkpoint. Per the user's workflow instruction, the next step is for the user
to provide a prompt that guides survey creation.

## Competing linguistic analyses

Three checked sources show why a single naturalness response cannot establish
the intended parser node:

1. Wong 2023, chapter 4, printed p. 50, explicitly places `呢個用嚟切嘢`
   under **Instrumental serial verb constructions**. The discussion states that
   the instrument can be omitted or moved to subject position with `用嚟`,
   followed by the action verb.
2. Cheung 2018, article pp. 20–21, analyzes `V1 + 嚟 + V2` as purposive and
   states that `用來/用嚟` has become a disyllabic expression.
3. Chor 2018, chapter 4, example (18), gives the broader purposive and
   completed-event string `啲錢我用嚟買晒嗰堆嘢`, with a separate overt
   user.

These sources support the surface pattern and broader purposive system. They
do not uniquely establish the current label's intended-function analysis,
resource classes, aspect boundaries, or topic/subject decision.

## Current runtime map

The implementation was re-read at `main.js:7963–8252` in the v0.5.187 base.
The current rule:

- recognizes adjacent `用 + 嚟/來` after overt non-person-like nominal
  material;
- requires a parser-recognized overt action predicate;
- leaves a direct resource neutral between subject and topic;
- routes selected modal, copular, separate-user, and perfective-predicate
  profiles to the broader `IntendedFunctionRelation`;
- excludes a lone person pronoun, direct negation, A-not-A, missing predicates,
  and selected coordination forms;
- does not verify intended-function meaning or predicate–resource
  compatibility;
- can create the narrow node for semantically anomalous strings;
- treats some adverbs and coordination forms inconsistently because attachment
  is driven by current parser spans rather than a settled linguistic claim.

The 30-case implementation map is frozen in
`test-data/rul-survey-readiness-probes-v1.json`. It has **zero linguistic
evidence weight**. Its purpose is to reveal which distinctions the panel must
resolve.

## Survey-blocking questions

A clean wave must distinguish at least:

- instrumental/resource interpretation versus conventional function;
- grammatical form versus semantic plausibility;
- physical, spatial, and abstract resource classes;
- person-as-resource versus omitted-resource readings;
- direct, modal, and copular profiles;
- intended/habitual function versus completed actual use;
- resource-only versus separate overt user;
- coordinated predicates;
- context-licensed predicate ellipsis;
- the narrow `用嚟` pattern versus general purposive `嚟`;
- function questions versus declaratives;
- preverbal adverb attachment.

## Instrument requirements already fixed by governance

The later instrument must use the same eligibility rules for every respondent,
including the user's wife. It must use a graded scale, a genuine uncertainty or
context-needed response, interpretation questions, separate semantic-reason
choices, unrelated fillers, randomized or counterbalanced presentation, and an
adjacent optional correction/context field.

The instrument should mix RUL and PFV as focal constructions rather than
presenting a block of visibly related `用嚟` sentences.

## Stop condition

Research work stops here because final item selection and wording depend on the
user's survey-creation prompt. Once that prompt is supplied, the next package
should create `pilot-v1`, not a locked collection instrument. It should be
released first to a 5–10 usable-judgment-per-item pilot and audited before any
larger collection.
