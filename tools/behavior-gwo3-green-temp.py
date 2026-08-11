#!/usr/bin/env python3
from pathlib import Path


def replace_once(path, old, new):
    text = path.read_text()
    count = text.count(old)
    assert count == 1, (str(path), count, old[:180])
    path.write_text(text.replace(old, new, 1))


plugin = Path("src/plugin-entry.js")
wrap = Path("src/parser/orchestration/wrap-core.js")

predicate_anchor = '''const { wrapPredicate } = require("./parser/orchestration/wrap-predicate")({
  categorySubspanFor, construction, isStativeToken, isToken, nodeCanFillSlot, traceInfo,
});
'''
predicate_with_comparison = predicate_anchor + '''
const createPostPredicateGwo3ComparativeDetectors = require("./parser/detectors/comparison/postpredicate-gwo3");
const { postPredicateGwo3ComparativeFallback } = createPostPredicateGwo3ComparativeDetectors({
  cleanSlots, construction, firstToken, flattenSurface, isToken, nodeCanFillSlot,
  parserInactiveTokenClone, traceInfo, withoutIgnorableSpaceText, withoutTrailingParticles,
});
'''
replace_once(plugin, predicate_anchor, predicate_with_comparison)

replace_once(
    plugin,
    '''  postThemeParticipantRelationFallback,\n  postverbalZoPerfectiveFromRawNodes,''',
    '''  postThemeParticipantRelationFallback,\n  postPredicateGwo3ComparativeFallback,\n  postverbalZoPerfectiveFromRawNodes,''',
)

replace_once(
    wrap,
    '''    postThemeParticipantRelationFallback,\n    postverbalZoPerfectiveFromRawNodes,''',
    '''    postThemeParticipantRelationFallback,\n    postPredicateGwo3ComparativeFallback,\n    postverbalZoPerfectiveFromRawNodes,''',
)

boundary_anchor = '''  const earlyCp021bBoundaryReviewSpan = cp021bBoundaryReviewFallback(core);
  if (earlyCp021bBoundaryReviewSpan) return [earlyCp021bBoundaryReviewSpan];

'''
comparison_hook = boundary_anchor + '''  const postPredicateGwo3Comparative = postPredicateGwo3ComparativeFallback(core);
  if (postPredicateGwo3Comparative) return [postPredicateGwo3Comparative];

'''
replace_once(wrap, boundary_anchor, comparison_hook)
