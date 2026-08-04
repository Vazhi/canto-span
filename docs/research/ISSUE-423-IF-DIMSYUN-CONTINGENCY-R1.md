# ISSUE-423 如果…點算 contingency-question disposition R1

Parent issue: #423  
Work claim: #529  
Date: 2026-08-04

## Decision

Treat `如果 + condition + 點算` as a context-free contingency question profile: an overt conditional antecedent plus the Cantonese problem-resolution question predicate `點算`.

Do not create a new construction identity in this packet. The safest current disposition is transparent composition of:

1. a conditional antecedent introduced by `如果` or a conditional-clause equivalent such as `嘅話`; and
2. a main question predicate `點算` meaning “what to do / how to resolve this.”

The profile is complete when the `點算` predicate is overt. It should not be wrapped in `NeedsContext` merely because the first clause is conditional.

## Assumption-level research review

### Assumption A — `點算` is a Cantonese problem-resolution question predicate

Supported.

CantoDict lists `點算` as Cantonese, glossing it as “what to do?; how to resolve this?” and marks the term as used in Cantonese rather than Mandarin/standard written Chinese. Its examples include both isolated problem-resolution use and a conditional case glossed “What shall we do if he does not show up?”

The Yue Wiktionary entry lists Cantonese `點算` with Jyutping `dim2 syun3`, defines it as a phrase meaning roughly “what should be done,” and gives the conditional example:

- `考試肥佬咗嘅話，點算啊？`
- gloss: “What do I do if I fail my exams?”

A UBC Cantonese Language Program event page for Prof. Sze-Wing Tang explicitly notes the two meanings of Cantonese `點算`: counting/calculating and “怎麼辦” / what to do. This supports the problem-resolution reading but is not itself a construction-level grammar source.

### Assumption B — `如果 + condition + 點算` is syntactically complete

Supported for the target profile.

The source pattern contains an overt condition and an overt `點算` question predicate. The Yue Wiktionary example with `嘅話，點算啊？` shows the same contingency-question logic with a conditional antecedent and no extra missing consequent. CantoDict’s conditional example also supports a condition plus overt `點算` as a complete question.

Therefore the target profile should not be analyzed as an incomplete `如果 + clause` fragment requiring an unstated right-hand member.

### Assumption C — the target profile requires a new UUID

Not supported by this issue.

The evidence supports a complete profile, but it does not prove that the relation needs an identity distinct from existing conditional and question structures. The current disposition is composition unless a later runtime/identity audit proves that composition cannot preserve the span, question force, and negative boundary.

### Assumption D — the four routed Glossika examples can be fixed by broadening generic conditional handling

Not authorized.

The issue only supports the bounded profile in which `點算` is overt. It does not authorize treating all `如果 + clause` sequences as complete. Genuinely fragmentary conditionals remain context-dependent unless a separate overt result/question predicate is present.

## Target examples

The issue routes four complete examples:

- `如果落雨點算？`
- `如果落雨點算？` (second source occurrence)
- `如果搵唔到點算？`
- `如果我唔記得落車點算？`

These are positive examples of the same bounded profile.

## Positive profile

Accept as complete when all are present:

1. an overt conditional antecedent, usually `如果 + clause`, or an equivalent overt conditional clause;
2. overt `點算` as the main problem-resolution question predicate;
3. no requirement for an additional right-hand consequent beyond `點算`.

Expected span:

- outer span: full contingency question;
- condition child: `如果 + condition` or equivalent conditional phrase;
- question/predicate child: `點算` plus particles if present.

## Negative boundaries

Do not use this profile for:

- bare `如果 + clause` with no overt result, question, or response predicate;
- ordinary conditional statements with a separate non-question consequent;
- lexical `點算` in the counting/calculating sense;
- `點樣`, `點做`, or other `點 + VP` questions unless separately justified;
- cases where `點算` is only quoted or mentioned as a word.

## Terminal disposition

- Context-free `如果…點算`: supported as a complete contingency-question profile.
- New UUID: no, not from this packet.
- Runtime change: no, not in this packet.
- Status promotion: no.
- Later implementation route: allowed as a separate bounded runtime/spec package if exact parser inspection confirms the `NeedsContext` diagnostic persists.

A later implementation issue may be ready if it is limited to removing `NeedsContext` from the overt `condition + 點算` profile and adds collision tests for incomplete conditionals.

## Protected-state disposition

This packet changes no runtime behavior, parser matcher, construction identity, linguistic status, source record, survey state, release state, or deployment state.

## Source pointers

- CantoDict `點算`: `https://www.cantonese.sheik.co.uk/dictionary/words/1762/`
- Yue Wiktionary `點算`: `https://yue.wiktionary.org/wiki/點算`
- UBC Cantonese Language Program event page for Prof. Sze-Wing Tang: `https://cantonese.arts.ubc.ca/hong-kong-cantonese/`
