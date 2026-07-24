# Full-repository label sweep baseline R1

**Bootstrap date:** 2026-07-24  
**Permanent records:** 181  
**Current records:** 133  
**Retired records:** 48  
**Records with automatic screening flags:** 129

This baseline assigns permanent identities and opens a review row for every current and retired label. It does **not** approve any label, linguistic analysis, implementation behavior, or retirement.

## Identity policy

- UUID is the immutable machine key.
- The short code is an immutable human reference.
- Canonical names may change after research.
- Learner labels may be shared by multiple UUIDs.
- Automatic flags identify review priorities only.

## Automatic screening summary

| Flag | Records |
|---|---:|
| `generic_head_requires_boundary_definition` | 72 |
| `internal_representation_name_review` | 20 |
| `possible_bundled_or_cross_layer_name` | 5 |
| `possible_multi_layer_construction_bundle` | 3 |
| `retired_label_research_home_check` | 48 |
| `semantic_domain_name_requires_structural_scope_check` | 18 |
| `unsupported_generalization_requires_source_runtime_reconciliation` | 79 |

## Required manual sweep

For each record, compare the actual runtime behavior with the strongest scope-matched research, then record terminology alignment and one disposition: retain, rename, narrow, split, merge, internalize, supersede, quarantine, keep retired, or reopen research. Source terminology must be stored as aliases rather than silently replacing identity.
