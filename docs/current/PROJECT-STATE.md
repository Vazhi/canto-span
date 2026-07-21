# Project state

## Current baseline

| Measure | Current value |
|---|---:|
| Runtime | v0.5.186 |
| Runtime labels | 170 |
| Current construction notes | 170 |
| Active working notes | 2 |
| Workflow-archived notes | 168 |
| Retired labels | 11 |
| `supported_productive` | 0 |
| `provisional_reaudit` | 0 |
| `provisional` | 1 |
| `research_pending` | 59 |
| `unsupported_generalization` | 87 |
| `lexicalized_only` | 3 |
| `parser_heuristic` | 20 |

The runtime labels and current construction notes match exactly. Linguistic evidence and status remain outside `main.js`.

## v0.5.186 disposition

### `PostverbalZoPerfectiveVP` — provisional

The defensible claim is structural: an overt action predicate can be followed by perfective `咗` and an overt licensed NP. This node does not by itself settle full completion, current relevance, or predicate–object naturalness. The semantic selection guard remains separate.

Evidence:

- four checked external sources;
- one clean independent speaker who judged the relevant positive and negative contrasts;
- ten additional independent public responses preserved under a one-time legacy-form exception;
- complete executable boundary inventory for the current narrow scope;
- line-by-line code/document reconciliation against commit `d08367d`.

The public panel adds zero clean promotion-eligible speakers because explicit native-language confirmation and anonymous-use consent were not collected. PFV therefore remains below `supported_productive`.

### `ResourceUseLaiFunctionRelation` — research pending

Five checked sources and the 23-response public pilot show that many ordinary `用嚟` surfaces are acceptable. They do not establish that the strings instantiate the parser's narrow direct-resource relation. Overt-user, ellipsis, modal, copular, coordinated, actual-use, and semantic-resource readings remain confounded. The code/document scope is not reconciled, so no defensible provisional claim is currently closed.

### `TopicCommentClause` — retired

The label had zero runtime constructors, zero fixtures, zero direct standardized tests, and no unique purpose beyond `TopicComment`. It was removed from the current registry and preserved in the retirement archive.

## Validation

- regression: **545 cases**
- NP subsystem: **43 cases**
- construction assertions: **1,156**
- construction test files: **170**
- direct coverage: **2 positive+boundary; 100 positive-only; 68 no-direct-case labels**
- promotion gate: current v2 enforcement
- release gate: Git-derived status-change audit

## Next milestone

The next linguistic milestone should be **RUL instrument repair and disposition**, not broad backlog expansion.

Exit criteria:

1. complete the controlled Speaker A review using a revised instrument;
2. add graded judgments, fillers, randomized order, contexts, and interpretation questions;
3. reconcile each RUL runtime branch with a plain-language claim;
4. retain, narrow, split, or retire the label based on that evidence;
5. do not promote from raw public-response count alone.
