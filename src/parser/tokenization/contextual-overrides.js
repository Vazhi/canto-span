"use strict";

module.exports = function createContextualLexiconOverrides(dependencies = {}) {
  const {
    PROHIBITIVE_OBJECT_STARTERS,
    TOKEN_LEXICON,
    generateTokenSlots,
    inferTokenFeatures,
    isTopicCandidate,
    normalizeSurface,
    selectLexiconTerm,
    selectionDecisionForSurface,
    token,
    traceInfo,
  } = dependencies;

  function startsWithProhibitiveObject(text) {
    const normalized = normalizeSurface(text);
    return PROHIBITIVE_OBJECT_STARTERS.some((surface) => normalized.startsWith(surface));
  }

  function shouldSplitNegatedLexicalizedStative(nodes, text, cursor, spec) {
    const after = text.slice(cursor + spec.surface.length);
    const bare = !nodes.length && normalizeSurface(text.slice(cursor)) === spec.surface;
    if (bare) return spec.surface === "唔好味";
    if (startsWithProhibitiveObject(after)) return false;
    return nodes.length > 0;
  }

  function pushNegatedLexicalizedStativeSplit(nodes, text, cursor, spec) {
    if (shouldSplitNegatedLexicalizedStative(nodes, text, cursor, spec)) {
      const after = text.slice(cursor + spec.surface.length);
      nodes.push(token("唔"));
      nodes.push(token(spec.predicate, { selection_decision: selectionDecisionForSurface(spec.predicate, spec.predicate + after) }));
      return spec.surface.length;
    }

    nodes.push(token("唔好", { label: "func", syntax: "prohibitive_marker" }));
    if (spec.verb !== "味") nodes.push(token(spec.verb, { label: "doing", syntax: "verb" }));
    else nodes.push(token("味", { label: "neutral", syntax: "unknown_cjk_or_text", note: "Bare 唔好味 is treated as negated 好味; prohibitive 唔好 + 味 is not a normal command pattern." }));
    return spec.surface.length;
  }

  function pushSpecialNotGoodEat(nodes, text, cursor) {
    const previous = nodes.length ? nodes[nodes.length - 1] : null;
    const beforeTopic = previous && isTopicCandidate(previous);
    const after = text.slice(cursor + "唔好食".length);
    const followedByObject = ["呢個", "嗰個", "呢啲", "嗰啲", "飯", "嘢", "水"].some((surface) => after.startsWith(surface));
    const bare = !previous && normalizeSurface(text.slice(cursor)) === "唔好食";

    if (bare) {
      const candidateAnalyses = [
        {
          construction: "NegatedStativePredicate",
          split: ["唔", "好食"],
          meaning_hint: "not tasty",
          parser_active: false,
        },
        {
          construction: "ProhibitiveImperative",
          split: ["唔好", "食"],
          meaning_hint: "don't eat",
          parser_active: false,
        },
      ];
      nodes.push(token("唔好食", {
        label: "neutral",
        jyutping: "m4 hou2 sik6",
        syntax: "ambiguous_needs_context",
        note: "Ambiguous: 唔 + 好食 = not tasty; 唔好 + 食 = don't eat.",
        review: "needs_context",
        trace: traceInfo("special_ambiguity_rule", { surface: "唔好食", reason: "Bare ambiguous string requires context.", candidate_analyses: candidateAnalyses }),
      }));
      return "唔好食".length;
    }

    if (beforeTopic || !followedByObject) {
      nodes.push(token("唔"));
      nodes.push(token("好食", { selection_decision: selectionDecisionForSurface("好食", "好食" + after) }));
      return "唔好食".length;
    }

    nodes.push(token("唔好", { label: "func", syntax: "prohibitive_marker" }));
    nodes.push(token("食", { label: "doing", syntax: "verb" }));
    return "唔好食".length;
  }

  function contextualLexiconOverrides(surface, rest) {
    const after = String(rest || "").slice(surface.length);

    // CP021B-LX1: bounded homograph disambiguation for lexical display only.
    // These overrides do not add construction templates.
    if (surface === "住") {
      if (/^喺/u.test(after)) {
        return {
          label: "doing",
          jyutping: "zyu6",
          syntax: "verb residence_verb",
          note: "residence verb 住 before an overt locative phrase",
        };
      }
      if (/^[。！？!?…]*$/u.test(after)) {
        return {
          label: "func",
          jyutping: "zyu6",
          syntax: "durative_or_continuing_state_marker",
          slots: [],
          note: "utterance-final durative/state 住 in the bounded audited context",
        };
      }
      return {};
    }

    if (surface === "定") {
      if (/^(?:咗|緊|過|住)/u.test(after)) {
        return {
          label: "doing",
          jyutping: "ding6",
          syntax: "verb decide_fix_schedule_verb",
          note: "decide / settle / fix before overt aspect",
        };
      }
      return {
        label: "func",
        jyutping: "ding6",
        syntax: "alternative_question_connector",
        slots: [],
        note: "bare alternative connector 定 in the bounded audited context",
      };
    }

    if (surface !== "咪") return {};

    // 咪 is not assigned one pronunciation or one parser affordance globally.
    // Before a lexical predicate it is the prohibitive mai5; before overt
    // focus/copular/aspect material in the audited data it is discourse mai6.
    if (/^(?:又|就|係|過)/u.test(after)) {
      return {
        label: "func",
        jyutping: "mai6",
        syntax: "discourse_focus_marker",
        slots: [],
        note: "discourse/focus 咪 mai6 in this context",
      };
    }

    const nextChoice = selectLexiconTerm(after);
    if (nextChoice) {
      const nextEntry = TOKEN_LEXICON[nextChoice.surface] || {};
      const nextFeatures = inferTokenFeatures(nextChoice.surface, nextEntry, {});
      const nextSlots = generateTokenSlots(nextFeatures);
      if (nextFeatures.label === "doing" || nextFeatures.label === "like" || nextSlots.includes("predicate") || nextSlots.includes("action_verb")) {
        return {
          label: "func",
          jyutping: "mai5",
          syntax: "prohibitive_marker",
          note: "prohibitive 咪 mai5 before a predicate",
        };
      }
    }

    return {
      label: "func",
      jyutping: "mai6",
      syntax: "discourse_marker_review",
      slots: [],
      note: "context-sensitive 咪; defaulted to discourse mai6 because no following predicate was licensed",
      review: "contextual_lexical_disambiguation",
    };
  }


  return {
    contextualLexiconOverrides,
    pushNegatedLexicalizedStativeSplit,
    pushSpecialNotGoodEat,
  };
};
