# I04 focused evaluation packet — CP021B-R37

Date: 2026-07-19

## Result

`EP-R37-I04` is populated and held-out locked for the `NominalAndMeasureSpan` family. This is the first CP022 packet to move beyond blueprint status. **Implementation remains unauthorized.**

The packet covers `DefinitionComplement`, `HeadNP`, `MeasureExpression`, and `ModifierPhrase`. Its intended semantic change is `NONE`. `ModifierPhrase` may be retired only as an internal/public-wrapper cleanup while preserving typed nominal children, spans, learner roles, Jyutping, provenance, and root coverage.

## Visible development set

- 4 external exact positives
- 4 visible positive/preservation variants
- 4 negative boundaries
- 8 required render-review cases

External exact examples are used to anchor the overt nominal forms. They do not validate the internal Canto Span wrapper ontology. Accepted regression examples remain behavior-preservation seeds only.

## Held-out separation

Five prospective held-out cases were selected and baseline-recorded before lock. The clean project contains only salted SHA-256 commitments. Surfaces and expected signatures are stored in a separate evaluator-custody archive:

- `CP021B-R37-EVALUATOR-CUSTODY-DO-NOT-OPEN-DURING-IMPLEMENTATION.zip`
- SHA-256: `b0ea009f75039b8866756ae1c76cf815fb9d191d97a6362df71f987e65cee596`

The custody archive must not be opened during implementation.

## Authorization boundary

Packet completion does not authorize code changes. Explicit user authorization remains required. The I04 packet also cannot silently accept LX1; LX1 remains render-pending and unaccepted.
