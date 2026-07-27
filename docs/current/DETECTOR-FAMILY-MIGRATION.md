# Detector-family migration recipe

Use this process only for behavior-preserving extraction of an existing detector family. Linguistic changes require a separate issue and review path.

1. **Select before claiming.** Name one coherent family, its exact construction labels, current source boundary, canonical destination, existing tests, dependencies, exclusions, and protected state on the intake issue.
2. **Claim exact paths.** Reserve the source block, destination modules, generated `main.js`, documentation, and temporary parity files. Do not claim unrelated detector families.
3. **Keep dependency direction.** Import runtime resources and parser primitives. Inject cross-family helpers from their canonical owners instead of copying them or introducing a circular import.
4. **Preserve call order.** Replace the original declarations at their existing position with one module binding. Do not reorder detector calls or fallback chains.
5. **Prove old/new parity.** Preserve the pre-extraction bundle and compare full analyses and diagnostics for every regression fixture plus focused positive, negative, punctuation, ambiguity, and interaction cases for the selected family.
6. **Run normal gates.** Use the deterministic runtime build and the unchanged full test suite. Do not rewrite expectations to make an extraction pass.
7. **Remove migration scaffolding.** Delete temporary workflows, transformation scripts, parity harnesses, artifacts, caches, and source maps. Keep only useful canonical modules and durable tests or documentation.
8. **Prepare exact-head review.** Collapse mechanical commits when practical, verify the final file list and generated bundle, retain automatic `Closes` links for the intake and claim, and require explicit user approval before merge.

A later family issue should be split if it cannot satisfy these steps without moving unrelated policy or creating a large cross-family dependency object.
