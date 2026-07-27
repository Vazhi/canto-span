"use strict";

module.exports = function createLexicalSelection(dependencies = {}) {
  const {
    TOKEN_LEXICON,
    PRODUCTIVE_VO,
    COMPOSITIONAL_LEXICAL_PHRASES,
    inferTokenFeatures,
    featureBundleFor,
    getLexicalizationType,
  } = dependencies;

  function lexicalizedStativeRegistryKind(surface) {
    const entry = TOKEN_LEXICON[surface] || {};
    const label = entry.label || "neutral";
    const syntax = entry.syntax || "";
    const features = inferTokenFeatures(surface, { ...entry, label, syntax }, { label, syntax });
    const bundle = featureBundleFor(surface, { ...entry, label, syntax }, features, []);
    const lexicalizationType = getLexicalizationType(bundle);
    if (lexicalizationType === "negative_lexicalized_stative") return "negative_lexicalized_stative_registry";
    if (lexicalizationType === "lexicalized_stative") return "lexicalized_stative_registry";
    return "";
  }
  function transparentClassifierObjectParts(surface) {
    const phrase = String(surface || "");
    const entry = TOKEN_LEXICON[phrase] || {};
    const syntax = String(entry.syntax || "");
    if (!syntax.split(/\s+/u).includes("classifier_object_np")) return null;

    const classifier = Object.keys(TOKEN_LEXICON)
      .filter((candidate) => candidate.length < phrase.length && phrase.startsWith(candidate))
      .filter((candidate) => (TOKEN_LEXICON[candidate] || {}).label === "measure_word")
      .sort((a, b) => b.length - a.length || a.localeCompare(b))[0];
    if (!classifier) return null;

    const head = phrase.slice(classifier.length);
    const headEntry = TOKEN_LEXICON[head] || {};
    if (!head || !["what", "who", "where"].includes(headEntry.label || "")) return null;
    return { classifier, head };
  }
  function shouldForceCompositional(surface) {
    // Registry-backed lexicalized statives win over forced compositional splitting.
    // This prevents accidental future regressions such as adding 好食 to
    // COMPOSITIONAL_LEXICAL_PHRASES and losing the lexicalized predicate.
    if (lexicalizedStativeRegistryKind(surface)) return false;

    // Any lexical reference entry explicitly typed as classifier_object_np must
    // remain transparent when both the classifier and noun head have independent
    // lexical evidence. This generalizes the accepted classifier-role doctrine:
    // 本書 must expose 本:measure_word + 書:what rather than collapse to one what token.
    if (transparentClassifierObjectParts(surface)) return true;
    return COMPOSITIONAL_LEXICAL_PHRASES.has(surface);
  }
  const ALL_LEXICON_TERMS = Object.keys(TOKEN_LEXICON)
    .filter((surface) => !PRODUCTIVE_VO[surface])
    .sort((a, b) => b.length - a.length || a.localeCompare(b));
  const LEXICON_TERMS = ALL_LEXICON_TERMS
    .filter((surface) => !shouldForceCompositional(surface))
    .sort((a, b) => b.length - a.length || a.localeCompare(b));
  const LEXICALIZED_STATIVE_SELECTION_WEIGHT = 10000;
  function lexicalCandidateScore(surface) {
    const registryKind = lexicalizedStativeRegistryKind(surface);
    const registryScore = registryKind ? LEXICALIZED_STATIVE_SELECTION_WEIGHT : 0;
    return registryScore + surface.length;
  }
  function followingLexicalizedStativeAfterChoice(choice, rest) {
    const afterChoice = String(rest || "").slice(String(choice || "").length);
    if (!afterChoice) return null;
    const following = ALL_LEXICON_TERMS
      .filter((surface) => afterChoice.startsWith(surface) && lexicalizedStativeRegistryKind(surface))
      .sort((a, b) => b.length - a.length || a.localeCompare(b))[0];
    if (!following) return null;
    return { surface: following, registry_kind: lexicalizedStativeRegistryKind(following) };
  }
  function lexicalSelectionReason(choice, candidates, excluded, rest = "") {
    const registryKind = lexicalizedStativeRegistryKind(choice);
    const competingRegistry = candidates
      .filter((surface) => surface !== choice && lexicalizedStativeRegistryKind(surface))
      .map((surface) => lexicalizedStativeRegistryKind(surface));
    const hasLongerExcluded = excluded.some((item) => item.length > choice.length);
    const followingRegistry = followingLexicalizedStativeAfterChoice(choice, rest);

    if (registryKind) {
      return `${registryKind} candidate wins over compositional or shorter candidates by lexicalized-stative selection scoring.`;
    }
    if (hasLongerExcluded) {
      return "Chosen after longer forced-compositional phrase was excluded so learner-visible internal structure can remain available.";
    }
    if (followingRegistry && choice === "好") {
      return `Chosen as degree modifier before following ${followingRegistry.registry_kind} candidate ${followingRegistry.surface}; learner-visible composition remains available.`;
    }
    if (competingRegistry.length) {
      return "Chosen by score/length after comparing with registry-backed candidates.";
    }
    return "Chosen by ordinary lexical lookup; no registry-backed lexicalized stative candidate applies at this cursor.";
  }
  function lexicalSelectionDecision(rest, candidates, excluded, choice) {
    return {
      rule: "prefer_lexicalized_stative_over_compositional_when_registry_evidence_exists",
      chosen: choice,
      chosen_registry_kind: lexicalizedStativeRegistryKind(choice),
      chosen_score: lexicalCandidateScore(choice),
      reason: lexicalSelectionReason(choice, candidates, excluded, rest),
      candidates: candidates.map((surface) => ({
        surface,
        registry_kind: lexicalizedStativeRegistryKind(surface),
        score: lexicalCandidateScore(surface),
        forced_compositional: false,
      })),
      excluded_compositional_candidates: excluded.map((surface) => ({
        surface,
        registry_kind: lexicalizedStativeRegistryKind(surface),
        forced_compositional: true,
        reason: transparentClassifierObjectParts(surface)
          ? "Explicit classifier_object_np reference entry split into an independently evidenced classifier plus noun head."
          : "Listed in COMPOSITIONAL_LEXICAL_PHRASES and not protected by lexicalized-stative registry evidence.",
      })),
      rest_preview: rest.slice(0, 12),
    };
  }
  function selectionDecisionForSurface(surface, rest = surface) {
    const candidates = LEXICON_TERMS.filter((candidate) => rest.startsWith(candidate));
    const excluded = ALL_LEXICON_TERMS
      .filter((candidate) => rest.startsWith(candidate) && shouldForceCompositional(candidate));
    const fallbackCandidates = candidates.includes(surface) ? candidates : [surface, ...candidates];
    return lexicalSelectionDecision(rest, fallbackCandidates, excluded, surface);
  }
  function selectLexiconTerm(rest) {
    const candidates = LEXICON_TERMS
      .filter((surface) => rest.startsWith(surface))
      .filter((surface) => {
        if (surface !== "第二個") return true;
        const after = rest.slice(surface.length);
        const overtHead = Object.keys(TOKEN_LEXICON)
          .filter((candidate) => after.startsWith(candidate))
          .filter((candidate) => ["what", "who", "where"].includes((TOKEN_LEXICON[candidate] || {}).label || ""))
          .sort((a, b) => b.length - a.length || a.localeCompare(b))[0];
        return !overtHead;
      });
    if (!candidates.length) return null;

    const excluded = ALL_LEXICON_TERMS
      .filter((surface) => rest.startsWith(surface) && shouldForceCompositional(surface));

    candidates.sort((a, b) => {
      const scoreDiff = lexicalCandidateScore(b) - lexicalCandidateScore(a);
      if (scoreDiff) return scoreDiff;
      const lengthDiff = b.length - a.length;
      if (lengthDiff) return lengthDiff;
      return a.localeCompare(b);
    });

    const surface = candidates[0];
    return {
      surface,
      registry_kind: lexicalizedStativeRegistryKind(surface),
      score: lexicalCandidateScore(surface),
      candidate_count: candidates.length,
      selection_decision: lexicalSelectionDecision(rest, candidates, excluded, surface),
    };
  }

  return {
    lexicalizedStativeRegistryKind,
    transparentClassifierObjectParts,
    shouldForceCompositional,
    ALL_LEXICON_TERMS,
    LEXICON_TERMS,
    LEXICALIZED_STATIVE_SELECTION_WEIGHT,
    lexicalCandidateScore,
    followingLexicalizedStativeAfterChoice,
    lexicalSelectionReason,
    lexicalSelectionDecision,
    selectionDecisionForSurface,
    selectLexiconTerm,
  };
};
