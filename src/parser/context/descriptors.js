"use strict";

module.exports = function createContextDescriptors(dependencies = {}) {
  const {
    firstToken,
    flattenNodes,
    flattenSurface,
    getConstructionAffordances,
    nodeCanFillSlot,
    normalizeSurface,
    PREDICATE_OMISSION_PROFILES,
    predicateOmissionProfileForHead,
    predicateOmissionProfileForQuestionForm,
    predicateProfilesCompatible,
    tokenSemanticDomains,
  } = dependencies;

  function tokenRowsForAnalysis(analysis) {
    return flattenNodes((analysis && analysis.nodes) || []).filter((row) => row.kind === "token");
  }

  function questionDescriptorForContextTurn(turn) {
    const analysis = turn && turn.analysis;
    if (!analysis) return null;
    const tokens = tokenRowsForAnalysis(analysis);
    const surfaces = tokens.map((row) => row.surface);
    const topTypes = flattenNodes(analysis.nodes || [])
      .filter((row) => row.kind === "construction" && row.depth === 0)
      .map((row) => row.type);
    const questionMarked = /[？?]/u.test(turn.source) || topTypes.some((type) => String(type || "").includes("Question"));
    if (!questionMarked) return null;

    for (let index = 0; index < surfaces.length; index += 1) {
      const profile = predicateOmissionProfileForQuestionForm(surfaces[index]);
      if (!profile) continue;
      let spanEnd = surfaces.length;
      while (spanEnd > index + 1 && (tokens[spanEnd - 1].slots || []).includes("particle")) spanEnd -= 1;
      return {
        family: profile.parser_family === "modal" ? "modal_a_not_a" : "a_not_a",
        head_surface: (profile.positive_heads || [surfaces[index]])[0],
        positive_alternative: (profile.positive_heads || [surfaces[index]])[0],
        negative_alternative: `唔${(profile.positive_heads || [surfaces[index]])[0]}`,
        antecedent_span: surfaces.slice(index, spanEnd).join(""),
        question_domain_surface: surfaces.slice(index + 1, spanEnd).join(""),
        context_turn_id: turn.id,
        question_id: turn.id,
        raw_source: turn.source,
        predicate_omission_profile: profile.id,
        question_match_family: profile.question_match_family,
        complement_type: profile.complement_type,
      };
    }

    for (let index = 0; index < surfaces.length - 2; index += 1) {
      const first = surfaces[index];
      const negator = surfaces[index + 1];
      const second = surfaces[index + 2];
      if (negator !== "唔" || !first || !second) continue;
      if (first !== second && !first.startsWith(second) && !second.startsWith(first)) continue;
      const head = first.length >= second.length ? first : second;
      const firstRow = tokens[index];
      const secondRow = tokens[index + 2];
      const modal = (firstRow.slots || []).includes("modal") || (secondRow.slots || []).includes("modal");
      let spanEnd = surfaces.length;
      while (spanEnd > index + 3 && (tokens[spanEnd - 1].slots || []).includes("particle")) spanEnd -= 1;
      const profile = predicateOmissionProfileForHead(head);
      return {
        family: (profile && profile.parser_family === "modal") || modal ? "modal_a_not_a" : "a_not_a",
        head_surface: profile ? profile.positive_heads[0] : head,
        positive_alternative: profile ? profile.positive_heads[0] : head,
        negative_alternative: `唔${profile ? profile.positive_heads[0] : head}`,
        antecedent_span: surfaces.slice(index, spanEnd).join(""),
        question_domain_surface: surfaces.slice(index + 3, spanEnd).join(""),
        context_turn_id: turn.id,
        question_id: turn.id,
        raw_source: turn.source,
        predicate_omission_profile: profile ? profile.id : "",
        question_match_family: profile ? profile.question_match_family : "",
        complement_type: profile ? profile.complement_type : "",
      };
    }

    const finalMeiIndex = surfaces.lastIndexOf("未");
    if (topTypes.includes("CompletionQuestion") || finalMeiIndex > 0) {
      const beforeMei = finalMeiIndex > 0 ? tokens.slice(0, finalMeiIndex) : tokens;
      const predicate = beforeMei.find((row) => (row.slots || []).includes("action_verb") || (row.slots || []).includes("predicate"));
      if (predicate) {
        const startIndex = tokens.indexOf(predicate);
        const questionDomain = tokens
          .slice(startIndex + 1, finalMeiIndex >= 0 ? finalMeiIndex : tokens.length)
          .filter((row) => !["咗", "過", "緊"].includes(row.surface) && !(row.slots || []).includes("particle"))
          .map((row) => row.surface)
          .join("");
        return {
          family: "completion_question",
          head_surface: predicate.surface,
          positive_alternative: `${predicate.surface}咗`,
          negative_alternative: `未${predicate.surface}`,
          antecedent_span: surfaces.slice(startIndex, finalMeiIndex >= 0 ? finalMeiIndex + 1 : surfaces.length).join(""),
          question_domain_surface: questionDomain,
          context_turn_id: turn.id,
          question_id: turn.id,
          raw_source: turn.source,
        };
      }
    }
    return null;
  }

  function targetDescriptorForContext(nodes) {
    const rows = flattenNodes(nodes || []);
    const tokens = rows.filter((row) => row.kind === "token");
    const constructions = rows.filter((row) => row.kind === "construction");
    const top = constructions.find((row) => row.depth === 0);
    const topTrace = top && top.trace ? top.trace : {};
    const subject = tokens.find((row) => (row.slots || []).includes("subject"));
    const particles = tokens.filter((row) => (row.slots || []).includes("particle")).map((row) => row.surface);
    const polarity = tokens.some((row) => row.surface === "未")
      ? "not_yet"
      : tokens.some((row) => row.surface === "唔")
        ? "negative"
        : "positive";
    const candidate = tokens.find((row) => {
      const slots = row.slots || [];
      return slots.includes("preference_predicate")
        || slots.includes("modal")
        || slots.includes("cognition_predicate")
        || slots.includes("stance_predicate")
        || slots.includes("speech_verb")
        || slots.includes("acceptability_predicate")
        || slots.includes("action_verb")
        || slots.includes("stative_predicate");
    });
    if (!candidate) return null;
    const slots = candidate.slots || [];
    const profile = predicateOmissionProfileForHead(candidate.surface);
    const candidateIndex = tokens.indexOf(candidate);
    const complementTokens = tokens.slice(candidateIndex + 1).filter((row) => {
      const rowSlots = row.slots || [];
      return !rowSlots.includes("particle")
        && !["唔", "未", "咗", "過", "緊", "喇", "呀", "啊"].includes(row.surface);
    });
    const hasOvertObject = complementTokens.some((row) => {
      const rowSlots = row.slots || [];
      return rowSlots.some((slot) => ["object", "theme", "head_noun", "np"].includes(slot));
    });
    const hasOvertPredicateComplement = complementTokens.some((row) => {
      const rowSlots = row.slots || [];
      return rowSlots.some((slot) => ["predicate", "vp", "action_verb", "movement_verb", "stative_predicate"].includes(slot));
    });
    let predicateFamily = "predicate";
    let missingSlots = [];
    if (profile) {
      predicateFamily = profile.parser_family;
      if (!hasOvertObject && !hasOvertPredicateComplement && topTrace.omission_status !== "conventional_bare_statement") {
        missingSlots = [profile.missing_slot_type];
      }
    } else if (slots.includes("modal")) {
      predicateFamily = "modal";
      if (!hasOvertObject && !hasOvertPredicateComplement) {
        missingSlots = [candidate.surface === "想" ? "desired_or_cognitive_content" : "modal_or_volitional_complement"];
      }
    } else if (slots.includes("preference_predicate")) {
      predicateFamily = "preference";
      if (!hasOvertObject) missingSlots = ["preference_object_or_domain"];
    } else if (slots.includes("action_verb") && tokenSemanticDomains({ kind: "token", ...candidate }).includes("consumption")) {
      predicateFamily = "consumption";
      if (!hasOvertObject) missingSlots = ["object_or_activity_domain"];
    } else if (slots.includes("action_verb")) {
      predicateFamily = slots.includes("movement_verb") ? "motion" : "action";
      const objectSelecting = getConstructionAffordances(candidate).can_head_productive_vo === true;
      if (objectSelecting && !hasOvertObject) missingSlots = ["object_or_activity_domain"];
      if (!subject && constructions.some((row) => ["PerfectiveVP", "PostverbalZoPerfectiveVP"].includes(row.type))) {
        missingSlots = Array.from(new Set([...missingSlots, "subject"]));
      }
    } else if (slots.includes("stative_predicate")) {
      predicateFamily = "stative";
      if (!subject) missingSlots = ["subject_or_topic"];
    }
    if (Array.isArray(topTrace.missing_argument_slots) && topTrace.missing_argument_slots.length) {
      missingSlots = topTrace.missing_argument_slots.slice();
    }
    if (!subject && missingSlots.length && !missingSlots.includes("subject") && predicateFamily !== "stative") {
      missingSlots.push("subject");
    }
    return {
      head_surface: candidate.surface,
      predicate_family: predicateFamily,
      selected_alternative: polarity,
      subject_status: subject ? "explicit" : "omitted_unlicensed",
      missing_argument_slots: missingSlots,
      particle_contribution: particles,
      aspect: tokens.some((row) => row.surface === "咗") ? "overt_perfective" : "",
      top_type: top ? top.type : "",
      top_trace: topTrace,
      has_overt_object: hasOvertObject,
      has_perfective_structure: constructions.some((row) => ["PerfectiveVP", "PostverbalZoPerfectiveVP"].includes(row.type)),
      predicate_omission_profile: profile ? profile.id : (topTrace.predicate_omission_profile || ""),
      question_match_family: profile ? profile.question_match_family : (topTrace.question_match_family || ""),
      complement_type: profile ? profile.complement_type : (topTrace.complement_type || ""),
      conventionality_status: topTrace.conventionality_status || (profile ? profile.conventional_bare_status : ""),
      speech_event_use: topTrace.speech_event_use || "",
      legacy_context_metadata_active: slots.includes("preference_predicate") || slots.includes("modal") || slots.includes("action_verb") || slots.includes("stative_predicate"),
    };
  }

  function compatibleContextQuestion(target, contextTurns) {
    if (!target) return { descriptor: null, supplied: contextTurns.length > 0 };
    if (!contextTurns.length) return { descriptor: null, supplied: false, sawQuestion: false };
    const latestTurn = contextTurns[contextTurns.length - 1];
    const descriptor = questionDescriptorForContextTurn(latestTurn);
    if (!descriptor) return { descriptor: null, supplied: true, sawQuestion: false, stale_context_blocked: contextTurns.length > 1 };
    const questionProfile = descriptor.predicate_omission_profile
      ? PREDICATE_OMISSION_PROFILES.find((profile) => profile.id === descriptor.predicate_omission_profile)
      : predicateOmissionProfileForHead(descriptor.head_surface);
    const responseProfile = target.predicate_omission_profile
      ? PREDICATE_OMISSION_PROFILES.find((profile) => profile.id === target.predicate_omission_profile)
      : predicateOmissionProfileForHead(target.head_surface);
    if (questionProfile || responseProfile) {
      if (!predicateProfilesCompatible(questionProfile, responseProfile)) return { descriptor: null, supplied: true, sawQuestion: true };
    } else if (descriptor.head_surface !== target.head_surface) {
      return { descriptor: null, supplied: true, sawQuestion: true };
    }
    const completionTarget = target.has_perfective_structure || target.selected_alternative === "not_yet";
    if (descriptor.family === "completion_question" && !completionTarget) return { descriptor: null, supplied: true, sawQuestion: true };
    if (descriptor.family !== "completion_question" && completionTarget) return { descriptor: null, supplied: true, sawQuestion: true };
    if (descriptor.family === "modal_a_not_a" && target.predicate_family !== "modal") return { descriptor: null, supplied: true, sawQuestion: true };
    if (descriptor.family === "a_not_a" && target.predicate_family === "modal") return { descriptor: null, supplied: true, sawQuestion: true };
    return { descriptor, supplied: true, sawQuestion: true };
  }

  function existentialQuestionDescriptorForContextTurn(turn) {
    const analysis = turn && turn.analysis;
    if (!analysis) return null;
    const rows = flattenNodes(analysis.nodes || []);
    const constructions = rows.filter((row) => row.kind === "construction");
    const tokens = rows.filter((row) => row.kind === "token");
    const markerIndex = tokens.findIndex((row) => row.surface === "有冇" || (row.slots || []).includes("existential_question"));
    if (markerIndex < 0) return null;

    const haveOrNotConstruction = constructions.find((row) => {
      const detail = row.trace || {};
      return detail.question_family === "have_or_not"
        || ["ExistentialQuestion", "ExperientialYesNoQuestion", "ANotAQuestion"].includes(row.type);
    });
    const questionMarked = /[？?]/u.test(String(turn.source || ""));
    if (!questionMarked || !haveOrNotConstruction) return null;

    const domainTokens = tokens.slice(markerIndex + 1).filter((row) => !(row.slots || []).includes("particle"));
    const domainSurface = domainTokens.map((row) => row.surface).join("");
    const detail = haveOrNotConstruction.trace || {};
    return {
      family: "existential_question",
      question_subtype: detail.question_subtype || detail.existential_subtype || "have_or_not",
      head_surface: "冇",
      positive_alternative: "有",
      negative_alternative: "冇",
      antecedent_span: tokens.slice(markerIndex).map((row) => row.surface).join(""),
      question_domain_surface: domainSurface,
      question_domain_status: domainSurface ? "overt" : "elliptical_in_question",
      context_turn_id: turn.id,
      question_id: turn.id,
      raw_source: turn.source,
    };
  }

  function positiveResponseDiscourseAntecedentDescriptor(turn) {
    if (!turn || !turn.analysis) return null;
    const source = String(turn.source || "").trim();
    const normalized = normalizeSurface(source);
    if (!normalized) return null;

    const existentialQuestion = existentialQuestionDescriptorForContextTurn(turn);
    if (existentialQuestion) {
      return {
        family: "existential_or_possessive_question",
        antecedent_span: existentialQuestion.antecedent_span || source,
        domain_surface: existentialQuestion.question_domain_surface || "",
        domain_status: existentialQuestion.question_domain_status || "question_domain",
        context_turn_id: turn.id,
        question_id: turn.id,
        question_subtype: existentialQuestion.question_subtype || "",
        antecedent_parse_status: "typed_question_observed",
      };
    }

    const rows = flattenNodes(turn.analysis.nodes || []);
    const tokens = rows.filter((row) => row.kind === "token");
    const meaningful = tokens.filter((row) => !(row.slots || []).includes("particle"));
    const topConstructions = rows.filter((row) => row.kind === "construction" && row.depth === 0);
    const topIsDiscourseFormula = topConstructions.some((row) =>
      ["FormulaDiscourseUnit", "NegatedExistentialFragment"].includes(row.type)
        || (row.slots || []).includes("discourse_response")
    );
    const topIsProposition = topConstructions.some((row) => {
      if (["NeedsContext", "MalformedCandidate", "FragmentQuestion"].includes(row.type)) return false;
      if (/Question$/u.test(String(row.type || ""))) return false;
      const slots = row.slots || [];
      return slots.some((slot) => ["clause", "clause_like", "predicate", "vp", "action_vp"].includes(slot))
        || /(?:Clause|Frame|Sequence)$/u.test(String(row.type || ""));
    });
    const hasSubjectOrTopic = meaningful.some((row) => {
      const slots = row.slots || [];
      return slots.includes("subject") || slots.includes("topic");
    });
    const hasPredicate = meaningful.some((row) => {
      const slots = row.slots || [];
      return slots.some((slot) => [
        "predicate",
        "action_verb",
        "stative_predicate",
        "cognition_predicate",
        "speech_verb",
        "modal",
        "existential",
        "negated_existential",
      ].includes(slot)) || /(?:verb|predicate|stative)/u.test(String(row.syntax || ""));
    });
    const questionMarked = /[？?]/u.test(source)
      || topConstructions.some((row) => /Question$/u.test(String(row.type || "")));
    const standalonePredicateResponse = !questionMarked
      && meaningful.length > 0
      && meaningful.length <= 2
      && hasPredicate;
    const propositionLike = !questionMarked
      && (topIsProposition || (hasSubjectOrTopic && hasPredicate));

    if (!topIsDiscourseFormula && !standalonePredicateResponse && !propositionLike) return null;

    const existentialDomain = existentialDomainDescriptorForContextTurn(turn);
    const family = propositionLike
      ? "asserted_proposition_turn"
      : "discourse_response_turn";
    return {
      family,
      antecedent_span: source,
      domain_surface: existentialDomain ? existentialDomain.domain_surface : normalized,
      domain_status: existentialDomain ? "overt_existential_domain" : "discourse_proposition",
      context_turn_id: turn.id,
      question_id: "",
      question_subtype: "",
      antecedent_parse_status: topIsProposition
        ? "propositional_construction_observed"
        : propositionLike
          ? "subject_predicate_evidence_observed"
          : topIsDiscourseFormula
            ? "discourse_formula_observed"
            : "elliptical_predicate_response_observed",
    };
  }

  function existentialDomainDescriptorForContextTurn(turn) {
    const analysis = turn && turn.analysis;
    if (!analysis) return null;
    const tokens = tokenRowsForAnalysis(analysis);
    const markerIndex = tokens.findIndex((row) => row.surface === "有" || row.surface === "冇"
      || (row.slots || []).includes("existential") || (row.slots || []).includes("negated_existential"));
    if (markerIndex < 0) return null;
    const excluded = new Set(["我", "你", "佢", "我哋", "你哋", "佢哋", "連", "都", "又", "就", "有", "冇"]);
    const domainTokens = tokens.filter((row, index) => {
      if (index === markerIndex) return false;
      if (excluded.has(row.surface)) return false;
      const slots = row.slots || [];
      if (slots.includes("particle") || slots.includes("subject") || slots.includes("focus_adverb")) return false;
      return true;
    });
    const domainSurface = domainTokens.map((row) => row.surface).join("");
    if (!domainSurface) return null;
    return {
      family: "existential_domain_statement",
      domain_surface: domainSurface,
      antecedent_span: turn.source,
      context_turn_id: turn.id,
      raw_source: turn.source,
    };
  }

  function eventDomainDescriptorForContextTurn(turn, expectedHeadSurface = "") {
    const analysis = turn && turn.analysis;
    if (!analysis) return null;
    const tokens = tokenRowsForAnalysis(analysis);
    const headIndex = tokens.findIndex((row) => row.surface === expectedHeadSurface
      && (row.slots || []).includes("action_verb"));
    if (headIndex < 0) return null;
    const tail = tokens.slice(headIndex + 1);
    const totalityIndex = tail.findIndex((row) => row.surface === "晒" && (row.slots || []).includes("completion_marker"));
    if (totalityIndex < 0) return null;
    const between = tail.slice(0, totalityIndex);
    if (between.some((row) => {
      const slots = row.slots || [];
      return !slots.includes("negator")
        && !slots.includes("m4_negator")
        && !slots.includes("focus_adverb")
        && !slots.includes("particle");
    })) return null;
    const eventTokens = [tokens[headIndex], ...tail.slice(0, totalityIndex + 1)];
    return {
      family: "same_event_totality_domain_statement",
      event_head_surface: expectedHeadSurface,
      event_surface: eventTokens.map((row) => row.surface).join(""),
      antecedent_span: turn.source,
      context_turn_id: turn.id,
      raw_source: turn.source,
    };
  }

  function opinionContextSupportsMissingSlot(turn, slot) {
    if (!turn || !turn.analysis) return false;
    const rows = flattenNodes(turn.analysis.nodes || []);
    const tokens = rows.filter((row) => row.kind === "token");
    const constructions = rows.filter((row) => row.kind === "construction");
    if (slot === "existential_domain") {
      return tokens.some((row) => {
        const slots = row.slots || [];
        return ["有", "冇", "有冇"].includes(row.surface)
          || slots.includes("existential")
          || slots.includes("negated_existential")
          || slots.includes("existential_question");
      });
    }
    if (slot === "copular_complement") {
      const overtCopularFamily = tokens.some((row) => ["係", "唔係", "係咪"].includes(row.surface) || /(^|\s)(?:copula|negated_copula)(\s|$)/.test(String(row.syntax || "")))
        || constructions.some((row) => ["CopularRelationFrame", "CopularIdentificationFrame", "CopularANotAQuestion"].includes(row.type));
      if (overtCopularFamily) return true;
      // Bare 係/唔係 may anaphorically select an earlier proposition even when
      // that proposition is not itself copular. Require visible predicate/clause
      // structure so an arbitrary isolated noun does not license the ellipsis.
      return constructions.some((row) => {
        const slots = row.slots || [];
        return slots.includes("clause") || slots.includes("clause_like") || slots.includes("predicate") || slots.includes("vp");
      }) || tokens.some((row) => {
        const slots = row.slots || [];
        return slots.some((name) => ["predicate", "modal", "action_verb", "stative_predicate", "seeming_marker"].includes(name));
      });
    }
    return false;
  }

  function quantifiedClassifierEllipsisDescriptor(node) {
    if (!node || node.kind !== "construction" || node.type !== "QuantifiedClassifierNP") return null;
    const trace = node.trace || {};
    if (trace.fragment_subtype !== "quantified_classifier_head_ellipsis") return null;
    const rows = flattenNodes([node]);
    const classifier = rows.find((row) => row.kind === "token" && (row.slots || []).includes("classifier"));
    const quantity = rows.find((row) => row.kind === "token" && (row.slots || []).includes("quantity"));
    if (!classifier || !quantity) return null;
    return {
      classifier_surface: classifier.surface || flattenSurface(classifier),
      quantity_surface: quantity.surface || flattenSurface(quantity),
    };
  }

  function contextSupportsQuantifiedClassifierFragment(turn, phrase) {
    if (!turn || !turn.analysis) return false;
    const descriptor = quantifiedClassifierEllipsisDescriptor(phrase);
    if (!descriptor || !descriptor.classifier_surface) return false;
    const source = normalizeSurface(turn.source || "");
    if (!source) return false;
    const rows = flattenNodes(turn.analysis.nodes || []);
    const tokens = rows.filter((row) => row.kind === "token");
    const constructions = rows.filter((row) => row.kind === "construction");
    const sameClassifierTokenIndexes = tokens.reduce((indexes, row, index) => {
      const slots = row.slots || [];
      if (row.surface === descriptor.classifier_surface && slots.includes("classifier")) indexes.push(index);
      return indexes;
    }, []);
    const sameClassifierWithFollowingHead = sameClassifierTokenIndexes.some((classifierIndex) =>
      tokens.slice(classifierIndex + 1).some((row) => {
        const slots = row.slots || [];
        return slots.includes("head_noun") || (/noun|_np/.test(String(row.syntax || "")) && ["what", "who", "where"].includes(row.role || row.label));
      })
    );
    const sameClassifierConstructions = constructions.filter((row) => [
      "QuantifiedClassifierNP", "OvertHeadDemonstrativeClassifierNP", "ClassifierObjectNP",
      "OrdinalClassifierNP", "WhClassifierQuestion"
    ].includes(row.type) && String(row.surface || "").includes(descriptor.classifier_surface));
    const incompatibleAntecedent = sameClassifierConstructions.some((row) => {
      const trace = row.trace || {};
      return trace.classifier_head_compatibility_status === "incompatible";
    });
    const compatibleNpConstruction = sameClassifierConstructions.some((row) => {
      const trace = row.trace || {};
      if (trace.classifier_head_compatibility_status === "incompatible") return false;
      if (row.type === "QuantifiedClassifierNP") {
        return (row.children || []).some((child) => child && child.kind === "token" && (child.slots || []).includes("head_noun"));
      }
      return true;
    });
    const sameClassifierQuestionCue = source.includes(`幾${descriptor.classifier_surface}`)
      || source.includes(`邊${descriptor.classifier_surface}`)
      || source.includes(`呢${descriptor.classifier_surface}`)
      || source.includes(`嗰${descriptor.classifier_surface}`);
    if (incompatibleAntecedent && !compatibleNpConstruction) return false;
    return compatibleNpConstruction || sameClassifierQuestionCue || sameClassifierWithFollowingHead;
  }

  function conventionalZiDurationDescriptor(structural) {
    if (!Array.isArray(structural) || !structural.length || structural.length > 2) return null;
    const phrase = structural[0];
    if (!phrase || phrase.kind !== "construction" || phrase.type !== "QuantifiedClassifierNP") return null;
    const children = (phrase.children || []).filter((node) => node && node.kind === "token");
    if (children.length !== 3) return null;
    const quantity = children.find((node) => (node.slots || []).includes("quantity"));
    const classifier = children.find((node) => (node.slots || []).includes("classifier"));
    const head = children.find((node) => (node.slots || []).includes("head_noun"));
    if (!quantity || !classifier || !head) return null;
    if (classifier.surface !== "個" || head.surface !== "字") return null;
    const particle = structural.length === 2
      && structural[1]
      && structural[1].kind === "token"
      && (structural[1].slots || []).includes("particle")
      ? structural[1]
      : null;
    if (structural.length === 2 && !particle) return null;
    return { phrase, quantity, classifier, head, particle };
  }

  function conventionalZiContextDomain(turn) {
    if (!turn) return "";
    const source = normalizeSurface(turn.source || "");
    if (!source) return "";
    const durationCue = /(幾耐|幾多時間|時間|分鐘|鐘頭|點鐘|仲有幾耐|要等|等幾耐|等多|等咗|遲幾耐|早幾耐|車程|路程|先到|先返|先完|先得|過多耐|過幾耐)/.test(source);
    if (durationCue) return "duration";
    const literalCue = /(寫|讀|睇|句|文章|作文|標題|名字|個名|字數|文字|字符|字眼|詞語|單詞|幾多個字|幾個字)/.test(source);
    if (literalCue) return "literal_character_count";
    return "";
  }

  function contextSupportsQuantifiedTimeFragment(turn) {
    if (!turn || !turn.analysis) return false;
    const source = normalizeSurface(turn.source || "");
    if (!source) return false;
    const rows = flattenNodes(turn.analysis.nodes || []);
    const tokens = rows.filter((row) => row.kind === "token");
    const constructions = rows.filter((row) => row.kind === "construction");
    const hasTimeMaterial = tokens.some((row) => {
      const slots = row.slots || [];
      return slots.includes("time") || slots.includes("time_head") || slots.includes("temporal_modifier");
    });
    const hasTimeConstruction = constructions.some((row) => [
      "QuantifiedTimeNP", "TimeNP", "TemporalClause", "ScalarValueQuestion"
    ].includes(row.type));
    const durationOrRateCue = /(幾耐|幾多(?:年|月|日)|時間|年|月|日|禮拜|星期|半年|人工|月薪|年薪|萬|蚊|錢|價|好未)/.test(source);
    return hasTimeMaterial || hasTimeConstruction || durationOrRateCue;
  }

  return {
    tokenRowsForAnalysis,
    questionDescriptorForContextTurn,
    targetDescriptorForContext,
    compatibleContextQuestion,
    existentialQuestionDescriptorForContextTurn,
    positiveResponseDiscourseAntecedentDescriptor,
    existentialDomainDescriptorForContextTurn,
    eventDomainDescriptorForContextTurn,
    opinionContextSupportsMissingSlot,
    quantifiedClassifierEllipsisDescriptor,
    contextSupportsQuantifiedClassifierFragment,
    conventionalZiDurationDescriptor,
    conventionalZiContextDomain,
    contextSupportsQuantifiedTimeFragment,
  };
};
