# ISSUE-425 skill-learning NeedsContext disposition R1

Parent issue: #425  
Work claim: #533  
Date: 2026-08-04

## Decision

The three routed clauses are independently complete at the identity/specification layer. Their adjacency in Glossika Dialog 014 does not supply a required syntactic argument.

Do not create one broad new skill-learning construction identity from this packet. The safest current disposition is three separately bounded compositions:

1. **desiderative learning complement**: `想 + 學 + skill VP`;
2. **topic/evaluative difficulty predicate**: `NP + 好難 + VP`;
3. **skill/ability A-not-A question**: `識唔識 + skill/activity VP`.

This packet reaches a research/specification disposition only. It changes no runtime behavior.

## Target examples

- `我想學彈結他。`
- `結他好難學㗎。`
- `你識唔識彈結他？`

## Assumption-level research review

### Assumption A — `想 + VP` can express desire/intention toward an action

Supported.

CantoWords gives the Cantonese entry `想 soeng2` with the sense “to want to; to have the desire to; to plan to,” and examples including `我想食嘢` and `你想唔想學廣東話啊？`. This supports treating `我想學彈結他` as an overt-subject desiderative clause with a visible verbal complement, not a context fragment.

### Assumption B — `識 + skill/activity VP` and `識唔識 + skill/activity VP` are complete skill/ability structures

Supported.

Open Cantonese describes `識 sik1` as a modal verb meaning “to know how to” and states that a verb for a skill or activity follows `識`. It also states that the X-not-X construction forms yes/no questions with `識`, giving `你識唔識游水㗎？` as “Do you know how to swim?” This directly supports the `你識唔識彈結他？` profile.

### Assumption C — `NP + 好難 + VP` is a complete evaluative difficulty predicate

Supported as a bounded profile, with caution.

CantoDict lists `難` as “difficult; hard,” and examples include `廣東話好難學` glossed “Cantonese is very difficult to learn,” plus similar `好難 + V` examples such as `好難搵` and `好難走`. This supports `結他好難學` as an overt topic/subject plus difficulty predicate with an infinitive-like activity complement.

The packet does not decide whether the best internal analysis is topic-comment, subject-predicate, tough-predicate, or another evaluative predicate structure. It only decides that the clause is complete and should not require previous discourse for syntactic completion.

### Assumption D — all three clauses require one new construction identity

Not supported.

The evidence supports three complete profiles, but each belongs to a different already-recognizable family: desiderative complement, evaluative difficulty predicate, and skill A-not-A. A single broad skill-learning identity would hide useful boundaries and risk overgeneration.

## Profile 1 — `想 + 學 + skill VP`

Positive profile:

- overt subject;
- `想` expressing desire/intention;
- `學` introducing a learnable skill/activity complement;
- skill VP such as `彈結他`.

Covered example:

- `我想學彈結他。`

Negative boundaries:

- do not use this profile for `想` meaning “think/suppose”;
- do not collapse `學 + NP` school/discipline nouns with `學 + skill VP` without item-level evidence;
- do not widen serial-verb matching beyond the visible complement chain.

## Profile 2 — `NP + 好難 + VP`

Positive profile:

- an overt topic/subject names the thing or skill being evaluated;
- `好難` contributes difficulty;
- following VP identifies the activity with respect to which the topic is difficult.

Covered example:

- `結他好難學㗎。`

Negative boundaries:

- do not use this profile for adjective-noun modification such as `好難嘅書`;
- do not treat every `難 + VP` as the same identity without lexical and argument-orientation review;
- do not add hidden objects or topics when no overt evaluand exists.

## Profile 3 — `識唔識 + skill VP`

Positive profile:

- `識` means know-how / skill ability;
- A-not-A form is built on `識`, not on the following activity verb;
- the following VP denotes a skill or activity.

Covered example:

- `你識唔識彈結他？`

Negative boundaries:

- do not identify ordinary lexical `識` “know/recognize a person” with know-how without context;
- do not widen A-not-A handling beyond the selected modal/verb;
- do not treat the following skill VP as the A-not-A host in this profile.

## Terminal disposition

- `我想學彈結他。`: complete desiderative learning-complement profile.
- `結他好難學㗎。`: complete evaluative difficulty profile.
- `你識唔識彈結他？`: complete skill/ability A-not-A question profile.
- New UUID: no, not from this packet.
- Runtime change: no, not in this packet.
- Status promotion: no.
- Later implementation route: allowed as a separate bounded runtime/spec package if exact parser inspection confirms the `NeedsContext` diagnostic persists.

A later implementation issue may be ready if it is limited to preventing `NeedsContext` for these three exact profile families and adds collision tests for unrelated modal, topic-comment, adjective, and A-not-A cases.

## Protected-state disposition

This packet changes no runtime behavior, parser matcher, construction identity, linguistic status, source record, survey state, release state, or deployment state.

## Source pointers

- CantoWords `想`: `https://cantowords.com/dictionary/想`
- Open Cantonese `識`: `https://opencantonese.org/books/cantonese-life-1/unit-1/lesson-4/4-6-the-modal-verb-sik1-to-know-how-to`
- CantoDict `難`: `https://www.cantonese.sheik.co.uk/dictionary/characters/744/`
- Ann Law, “A-not-A questions in Cantonese”: `https://www.researchgate.net/publication/244964449_A-not-A_questions_in_Cantonese`
