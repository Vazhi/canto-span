---
title: PRQ2-012 — jat1 hai6 exclusive-alternative research
research_id: PRQ2-012
status: active_research_unit
baseline_version: 0.5.213
created: 2026-07-23
implementation_authorized: false
status_change_authorized: false
---

# PRQ2-012 — paired `一係 … 一係 …` alternatives

## Research decision

Promote paired Cantonese `一係 A，一係 B` to a dedicated **research-only
exclusive-alternative family**. The strongest checked schema is:

```text
(SUBJECT / CONTEXT) + 一係 (+ 就) + OPTION-A，
                      一係 (+ 就) + OPTION-B
```

The checked lexicographic source defines the conjunction as introducing options
from which one must be selected. Institutional course material independently
labels the pattern “either…or” and provides both activity and destination
examples. Verified HKCanCor material naturally attests two- and three-option
profiles with optional discourse particles and `就`.

This paired family is distinct from:

- lone suggestion `一係 X` (“how about X / why not X”);
- interrogative `A 定係 B`, researched under UC-RQ-018;
- `或者` alternatives, whose inclusivity, tentativeness, and distribution are
  not established as equivalent here;
- ordinary numeral `一` plus copula `係`;
- a lone or repeated marker without licensed option content.

The evidence supports clause, activity, destination, and reported-option
members. Full NP/VP/clause distribution, subject sharing, exact exclusivity,
more-than-two lists, `就` placement, particles, prosody, and register remain
open.

This note authorizes no parser change, construction-status change, lexical
installation, test promotion, or automatic acceptance rule.

## Sources

See
`PRQ2-012-JAT1HAI6-EXCLUSIVE-ALTERNATIVE-SOURCE-VERIFICATION-R1.tsv`.

- Cantowords distinguishes conjunction `一係/一唔係` from suggestion-adverb
  `一係`, gives pronunciation `jat1 hai6`, and supplies exact examples for both.
- Carnegie Mellon Elementary Cantonese independently teaches
  `一係…一係` as “either…or” with two exact paired examples.
- Wong’s Cantonese grammatical-category study lists `一係` “alternatively” as
  an adverbial item.
- Local HKCanCor extraction naturally attests paired and three-member
  alternatives plus lone suggestion-like profiles.

## Runtime collision result

See
`PRQ2-012-JAT1HAI6-EXCLUSIVE-ALTERNATIVE-COLLISION-AUDIT-R1.tsv`.

Runtime 0.5.213 has no dedicated alternative-selection analysis. Paired
examples may receive generic `ClauseRelationGraph` coverage, sometimes with
useful motion, speech, or clause children, but no row identifies `一係`, option
membership, or exclusive selection. Lone suggestion uses are partial or
unwrapped. `定係` and `或者` controls also lack the target analysis and must not
be silently merged.

## Open boundaries

- exactly-two versus three-or-more alternatives;
- optional `就`, topic particles, and final particles;
- shared versus separately overt subjects;
- NP, VP, destination, property, and full-clause options;
- commands, suggestions, predictions, statements, and questions;
- exhaustive/exclusive force and contextually available additional options;
- paired conjunction versus lone suggestion-adverb use;
- contrast with `定係`, `或者`, `抑或`, and written alternatives.

## Disposition

**Dedicated research unit; implementation and status changes remain
unauthorized.**
