"use strict";

module.exports = function createLearnerDisplay(dependencies = {}) {
  const { TOKEN_LEXICON, LEARNER_CONTEXTUAL_GLOSSES, LEARNER_SURFACE_GLOSSES, LEARNER_CONSTRUCTION_GLOSSES, diagnosticCompatibilityConstructionType, nodeDisplaySurface } = dependencies;

  // Learner-safe hover/title strings. v0.5.51 keeps concise role/syntax metadata
  // at the top of token hovers, while raw slots, internal counts, and template
  // notes stay in diagnostics only. Default hover is now surface + role/syntax +
  // Jyutping + plain learner gloss/context.
  function cleanLearnerNote(note) {
    let text = String(note || "").trim();
    if (!text) return "";
    text = text.split(/[.;]/)[0].trim();
    if (/\b(parser|diagnostic|template|construction|contextual|affordance|slot|syntax|role|internal|retained|transparent|protected|fallback|registry|tokeni[sz]ation|surface|native-speech|implementation)\b/i.test(text)) return "";
    return text;
  }
  
  function learnerGlossFromLexicon(surface) {
    const entry = TOKEN_LEXICON[String(surface || "")] || {};
    return cleanLearnerNote(entry.note);
  }
  
  function contextualLearnerGlossLinesForToken(node) {
    const surface = node && node.surface ? String(node.surface) : "";
    const syntax = node && node.syntax ? String(node.syntax) : "";
    if (surface === "吓" && /(^|\s)delimitative_aspect(\s|$)/.test(syntax)) {
      return ["try briefly / do a little", "Marks a light action."];
    }
    if (surface === "幾" && /(^|\s)scalar_value_question(\s|$)/.test(syntax)) {
      return ["how much / to what degree", "Asks about a value on this scale."];
    }
    if (surface === "呢" && /(^|\s)discourse_fragment_question(\s|$)/.test(syntax)) {
      return ["what about…? / and…?", "Returns to a topic or asks about a context-supplied alternative."];
    }
    if (surface === "呢" && /(^|\s)sentence_final_question_particle(\s|$)/.test(syntax)) {
      return ["question particle", "Softly asks for an answer or confirmation."];
    }
    if (/(^|\s)have_or_not_experiential_question_marker(\s|$)/.test(syntax)) {
      return ["ever ... or not?", "Asks whether the experience happened."];
    }
    if (/(^|\s)have_or_not_event_question_marker(\s|$)/.test(syntax)) {
      return ["did ... or not?", "Asks whether the event happened."];
    }
    if (surface === "嘅話" && /(^|\s)conditional_marker(\s|$)/.test(syntax)) {
      return ["if / in the case that", "Introduces a condition for a result."];
    }
    if (surface === "用" && /(^|\s)intended_function_use_marker(\s|$)/.test(syntax)) {
      return ["used for", "Part of 用嚟/用來, linking a thing to its stated use or function."];
    }
    if (["嚟", "來"].includes(surface) && /(^|\s)intended_function_lai_linker(\s|$)/.test(syntax)) {
      return ["for / to", "Links the thing to its stated use or function; it is not a movement verb here."];
    }
    return null;
  }
  
  function learnerGlossLinesForToken(node) {
    const parent = node && node.parent ? node.parent : "";
    const surface = node && node.surface ? node.surface : "";
    const traceLearnerGloss = node && node.trace && Array.isArray(node.trace.learner_gloss_lines)
      ? node.trace.learner_gloss_lines.filter(Boolean)
      : [];
    if (traceLearnerGloss.length) return traceLearnerGloss;
    const syntaxContextual = contextualLearnerGlossLinesForToken(node);
    if (syntaxContextual) return syntaxContextual;
    const contextual = LEARNER_CONTEXTUAL_GLOSSES[`${parent}|${surface}`];
    if (contextual) return contextual;
    const surfaceGloss = LEARNER_SURFACE_GLOSSES[surface];
    if (surfaceGloss) return surfaceGloss;
    const lexiconGloss = cleanLearnerNote(node && node.note) || learnerGlossFromLexicon(surface);
    if (lexiconGloss) return [lexiconGloss];
    if (node && node.jyutping) return ["Cantonese word."];
    return ["Cantonese text."];
  }
  
  function learnerGlossLinesForConstruction(node) {
    if (!node || node.kind !== "construction") return ["Cantonese phrase."];
    const surfaceGloss = LEARNER_SURFACE_GLOSSES[node.surface || ""];
    if (surfaceGloss) return surfaceGloss;
    const trace = node.trace || {};
    const traceLearnerGloss = Array.isArray(trace.learner_gloss_lines)
      ? trace.learner_gloss_lines.filter(Boolean)
      : [];
    if (traceLearnerGloss.length) return traceLearnerGloss;
    if (node.type === "ClauseRelationGraph" && trace.topic_chain_status === "licensed_overt_topic_chain") {
      return ["topic chain", "An overt topic supplies the understood object of later actions in the linked sequence."];
    }
    if (node.type === "ClauseRelationGraph" && trace.topic_chain_status === "antecedent_predicate_compatibility_review") {
      return ["possible topic chain — needs context", "A topic is present, but it does not clearly fit the omitted object of the later action."];
    }
    if (trace.particle_cluster_root) {
      if (node.type === "PolarQuestionFrame") {
        return ["biased yes-or-no question", "Asks whether the statement is true while preserving the visible inner particle sequence."];
      }
      return ["ordered particle phrase", "Shows several sentence-final particles in their visible inside-to-outside scope order."];
    }
    if (node.type === "DiscourseParticleFrame") {
      const family = String(trace.discourse_particle_family || "");
      if (family === "epistemic_stance") return ["uncertainty-marked statement", "Marks the statement as probable, possible, or uncertain."];
      if (family === "evidential_noteworthiness") return ["report or notice-marked statement", "Presents the statement as reported, noteworthy, a reminder, or unexpected."];
      if (family === "directive_interpersonal_closure") return ["prompt or closure phrase", "Uses a final particle for a directive, suggestion, invitation, or conversational closure."];
      if (family === "change_state_current_relevance") return ["changed-situation statement", "Marks a new, changed, or currently relevant situation."];
    }
    const constructionGlossType = node.compatibility_alias || diagnosticCompatibilityConstructionType(node.type || "");
    const constructionGloss = LEARNER_CONSTRUCTION_GLOSSES[constructionGlossType]
      || LEARNER_CONSTRUCTION_GLOSSES[node.type || ""];
    if (constructionGloss) return constructionGloss;
    const noteGloss = cleanLearnerNote(node.note || "");
    if (noteGloss) return [noteGloss];
    return ["Cantonese phrase."];
  }
  
  function compactLearnerHoverLines(lines) {
    return [...new Set((lines || [])
      .map((line) => String(line || "").trim())
      .filter(Boolean))];
  }
  
  function learnerVisibleSyntax(syntax = "") {
    return String(syntax || "")
      .split(/\s+/)
      .filter(Boolean)
      .filter((part) => !/^phase\d+_/i.test(part))
      .join(" ");
  }
  
  function learnerUiHoverTitleForToken(node) {
    if (!node || node.kind !== "token") return "";
    const role = node.role || node.label || "";
    const syntax = learnerVisibleSyntax(node.syntax || "");
    const displaySurface = node.display_surface || node.surface || "";
    return compactLearnerHoverLines([
      displaySurface,
      role ? `role: ${role}` : "",
      syntax ? `syntax: ${syntax}` : "",
      node.jyutping || "",
      ...learnerGlossLinesForToken(node),
    ]).join("\n");
  }
  
  function learnerUiHoverTitleForConstruction(node) {
    if (!node || node.kind !== "construction") return "";
    return compactLearnerHoverLines([
      node.display_surface || nodeDisplaySurface(node) || node.surface || "",
      ...learnerGlossLinesForConstruction(node),
    ]).join("\n");
  }
  
  function learnerUiHoverTitleForConstructionLayer(node) {
    if (!node || node.kind !== "construction") return "";
    return learnerUiHoverTitleForConstruction(node);
  }
  

  return {
    cleanLearnerNote,
    learnerGlossFromLexicon,
    contextualLearnerGlossLinesForToken,
    learnerGlossLinesForToken,
    learnerGlossLinesForConstruction,
    compactLearnerHoverLines,
    learnerVisibleSyntax,
    learnerUiHoverTitleForToken,
    learnerUiHoverTitleForConstruction,
    learnerUiHoverTitleForConstructionLayer,
  };
};
