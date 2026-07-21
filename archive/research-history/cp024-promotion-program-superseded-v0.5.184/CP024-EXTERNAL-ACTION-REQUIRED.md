# CP024 external action required

Current status: **one preimplementation external blocker remains for DEMO01**

## Required now: independent prospective custody

A separate evaluator must create and seal unseen test cases before the implementing process changes the runtime. This cannot be performed by the same research context without weakening prospective blindness.

Use:

- `external-evaluator-handoff/cp024-p1-demo01/DEMO01-EVALUATOR-SPEC.md`
- `external-evaluator-handoff/cp024-p1-demo01/seal-template.json`

Give only those files to a separate ChatGPT conversation/model or a human evaluator. Do not give that evaluator the visible packet, current parser output, implementation blueprint, or candidate code.

The evaluator should return only:

1. a sealed ZIP containing `heldout-cases.json`, `commitments.json`, and `seal-manifest.json`;
2. the ZIP's SHA-256 checksum.

Do not open the ZIP. Attach it to the project. It must remain outside the recovery tree until the candidate runtime and visible evaluation packet are frozen.

## Required later: Obsidian render review

After the candidate is implemented and passes headless gates, install it in the real Obsidian vault, render the locked review note, and return the review form plus diagnostics. This cannot be completed before a candidate exists.

## Not required now

No user authorization is needed for research, decomposition, packet design, or the later smallest bounded implementation once custody is sealed. Native-speaker review is not currently required for DEMO01 because no exact source–speaker conflict is recorded.

## Consequence of no external custody

The project can continue research, source mapping, architecture cleanup, and visible evaluation design. It cannot accept another construction as `supported_productive` under the current prospective-evaluation standard.
