# Evaluation packet locking protocol — CP021B-R37

1. Populate visible development positives, variants, negatives, expected structures, forbidden analyses, render targets, and automated gates.
2. Record the current runtime baseline before code changes.
3. Select prospective held-out cases and record their baseline signatures in evaluator custody.
4. Commit each held-out payload with a random 256-bit salt and SHA-256.
5. Store only opaque case IDs and commitments in the clean implementation project.
6. Store surfaces, salts, and expected signatures in a separate custody archive.
7. Verify that no held-out surface or expected signature appears in the clean project.
8. Keep `implementation_authorized=false` until explicit authorization.
9. Freeze implementation code before opening the custody archive for final evaluation.
10. A held-out failure rejects or reopens the candidate; it is not patched against after exposure without creating a new held-out partition.
