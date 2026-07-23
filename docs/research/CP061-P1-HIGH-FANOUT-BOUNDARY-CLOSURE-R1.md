# CP061-P1 high-fan-out boundary closure

Checkpoint: `v0.5.215-p1-high-fanout-boundary-closure`

## Scope

This slice covers the twelve active construction labels with the largest accepted-tree reach:
`ClauseSpan`, `NeedsContext`, `DirectionalMotionVP`, `ClauseRelationGraph`,
`QuantifiedClassifierNP`, `MotionGoalVP`, `ModifiedNP`,
`OvertHeadDemonstrativeClassifierNP`, `ClauseRelationMemberSpan`,
`TransitiveVP`, `NominalHeadSpan`, and `ClauseRelationEdge`.

The negative cases below are parser-boundary claims, not claims that the surface is
unnatural. Each control has a visible alternative analysis and must remain outside
the named construction.

## Boundary matrix

| Anchor | Construction | Boundary A | Boundary B | Distinction |
|---|---|---|---|---|
| `clause-span` | `ClauseSpan` | `喺屋企。` | `幾錢呀？` | locative phrase and lexical scalar question are not complete subject-predicate clauses |
| `needs-context` | `NeedsContext` | `我食飯。` | `呢個女仔唔靚。` | saturated action and sourced negated-stative clauses do not require contextual completion |
| `directional-motion` | `DirectionalMotionVP` | `圖書館係乜嘢嚟㗎。` | `呢個用嚟切嘢。` | explanatory and instrumental/function `嚟` are not literal directional motion |
| `relation-graph` | `ClauseRelationGraph` | `我食飯。` | `我食飯，就。` | a single clause and a linker-only dangling side do not form a complete relation graph |
| `quantified-classifier` | `QuantifiedClassifierNP` | `本書。` | `呢個。` | classifier-headed and headless demonstrative nominals lack the required quantity profile |
| `motion-goal` | `MotionGoalVP` | `我喺屋企。` | `我食飯。` | static location and non-motion action are not motion-goal predicates |
| `modified-np` | `ModifiedNP` | `書。` | `三本書。` | a bare head and a quantified-classifier NP are not modifier-head NPs |
| `overt-demonstrative-classifier` | `OvertHeadDemonstrativeClassifierNP` | `呢個。` | `三本書。` | headless demonstrative and non-demonstrative quantified NPs are distinct |
| `relation-member` | `ClauseRelationMemberSpan` | `我食飯。` | `幾錢呀？` | standalone clause and scalar question are not members of an overt clause relation |
| `transitive-vp` | `TransitiveVP` | `佢瞓覺。` | `佢好高。` | lexical activity and stative predication do not license a transitive analysis |
| `nominal-head` | `NominalHeadSpan` | `幾錢呀？` | `呢個。` | lexical scalar question and headless demonstrative NP are not generic nominal-head spans |
| `relation-edge` | `ClauseRelationEdge` | `我食飯。` | `我食飯，就。` | a typed edge requires two nonempty relation members |

## Source linkage

The positive profiles remain owned by their existing exact regression fixtures and
construction notes. The boundary distinctions reuse checked evidence already mapped
to `SRC-WONG-2023-LANGUAGE-SAMPLE`, `SRC-YIP-MATTHEWS-2000-BASIC`,
`SRC-ZHENG-ZHANG-GAO-2021-HK-CANTONESE-COURSE`, and the current NP and
clause-relation source maps. These controls narrow parser assignment only; they add
no evidence for productivity, acceptability, or promotion.

## Runtime corrections

- The retired definition wrapper is not revived. `圖書館係乜嘢嚟㗎。` now composes
  as `CopularRelationFrame`, with explanatory `嚟` protected from
  `DirectionalMotionVP`.
- A comma-linked wrapper now rejects a side containing only an overt linker such as
  final `就`; no relation partner is fabricated.
