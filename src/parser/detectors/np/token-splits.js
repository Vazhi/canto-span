"use strict";

module.exports = function createNpTokenSplits(dependencies = {}) {
  const {
    PUNCT_RE,
    cleanSlots,
    construction,
    flattenSurface,
    nodeCanFillSlot,
    phraseMatch,
    selectLexiconTerm,
    token,
    traceInfo,
  } = dependencies;

  const TRANSPARENT_DEMONSTRATIVE_CLASSIFIER_SPLITS = [
    { surface: "呢個", demonstrative: "呢", classifier: "個", classifierSyntax: "general_classifier" },
    { surface: "嗰個", demonstrative: "嗰", classifier: "個", classifierSyntax: "general_classifier" },
    { surface: "呢本", demonstrative: "呢", classifier: "本", classifierSyntax: "classifier_book" },
    { surface: "嗰本", demonstrative: "嗰", classifier: "本", classifierSyntax: "classifier_book" },
    { surface: "呢間", demonstrative: "呢", classifier: "間", classifierSyntax: "classifier_building_shop" },
    { surface: "嗰間", demonstrative: "嗰", classifier: "間", classifierSyntax: "classifier_building_shop" },
    { surface: "呢杯", demonstrative: "呢", classifier: "杯", classifierSyntax: "classifier_container_cup" },
    { surface: "嗰杯", demonstrative: "嗰", classifier: "杯", classifierSyntax: "classifier_container_cup" },
    { surface: "呢套", demonstrative: "呢", classifier: "套", classifierSyntax: "classifier_set_media" },
    { surface: "嗰套", demonstrative: "嗰", classifier: "套", classifierSyntax: "classifier_set_media" },
    { surface: "呢首", demonstrative: "呢", classifier: "首", classifierSyntax: "classifier_song_poem" },
    { surface: "嗰首", demonstrative: "嗰", classifier: "首", classifierSyntax: "classifier_song_poem" },
    { surface: "呢件", demonstrative: "呢", classifier: "件", classifierSyntax: "classifier_clothing_item" },
    { surface: "嗰件", demonstrative: "嗰", classifier: "件", classifierSyntax: "classifier_clothing_item" },
  ];

  function makeTransparentDemonstrativeClassifierEllipsis(spec) {
    const children = [
      token(spec.demonstrative, {
        label: "func",
        syntax: "demonstrative_determiner",
        note: `${spec.demonstrative} is the demonstrative determiner inside an elliptical demonstrative-classifier NP.`,
      }),
      token(spec.classifier, {
        label: "measure_word",
        syntax: spec.classifierSyntax,
        note: `${spec.classifier} is the visible measure word/classifier inside an elliptical demonstrative-classifier NP.`,
      }),
    ];
    return construction("HeadlessDemonstrativeClassifierNP", "NP", children, {
      primary: "object",
      slots: cleanSlots(["headless_demonstrative_classifier_np", "np", "topic", "object", "demonstrative", "classifier"]),
      note: `${spec.surface} is rendered transparently as a headless demonstrative-classifier NP. No nominal head is inserted; discourse licensing remains a separate research question.`,
      trace: traceInfo("construction_template", {
        construction_type: "HeadlessDemonstrativeClassifierNP",
        template_family: "construction_template",
        template: ["demonstrative!", "classifier!"],
        assigned_slots: ["demonstrative", "classifier"],
        surfaces: children.map((node) => flattenSurface(node)),
        np_subtype: "headless_demonstrative_classifier_np",
        omitted_head_status: "overtly_absent_not_reconstructed",
        independent_productivity_status: "research_pending",
        reason: "The NP subsystem separates overt-head D-CL-N from headless D-CL and inserts no missing noun.",
      }),
    });
  }

  function transparentEllipticalDemonstrativeClassifierFromRest(rest) {
    const match = TRANSPARENT_DEMONSTRATIVE_CLASSIFIER_SPLITS.find((spec) => rest.startsWith(spec.surface));
    if (!match) return null;

    const after = rest.slice(match.surface.length);
    const nextTerm = after && !PUNCT_RE.test(after) ? selectLexiconTerm(after) : null;
    if (nextTerm) {
      const nextNode = token(nextTerm.surface);
      if (nodeCanFillSlot(nextNode, "head_noun")) return null;
    }

    return phraseMatch(match.surface.length, makeTransparentDemonstrativeClassifierEllipsis(match));
  }

  const TRANSPARENT_CUP_NOUN_DEMONSTRATIVE_NPS = [
    { surface: "呢個杯", demonstrative: "呢", classifier: "個", classifierSyntax: "general_classifier classifier" },
    { surface: "嗰個杯", demonstrative: "嗰", classifier: "個", classifierSyntax: "general_classifier classifier" },
    { surface: "呢隻杯", demonstrative: "呢", classifier: "隻", classifierSyntax: "classifier_animal_body_part_one_of_pair" },
    { surface: "嗰隻杯", demonstrative: "嗰", classifier: "隻", classifierSyntax: "classifier_animal_body_part_one_of_pair" },
  ];

  function transparentCupNounDemonstrativeNpFromRest(rest) {
    const match = TRANSPARENT_CUP_NOUN_DEMONSTRATIVE_NPS.find((spec) => rest.startsWith(spec.surface));
    if (!match) return null;

    const children = [
      token(match.demonstrative, {
        label: "func",
        syntax: "demonstrative_determiner",
        slots: ["demonstrative"],
        note: `${match.demonstrative} is the demonstrative determiner in a transparent demonstrative-classifier noun phrase.`,
      }),
      token(match.classifier, {
        label: "measure_word",
        syntax: match.classifierSyntax,
        slots: ["classifier"],
        note: `${match.classifier} is the visible classifier before the noun 杯.`,
      }),
      token("杯", {
        label: "what",
        syntax: "head_noun object_np container_noun",
        slots: ["head_noun", "np", "object", "topic"],
        note: "杯 bui1 is the noun ‘cup’ here, not the homophonous cupful classifier. This bounded lexical disambiguation is independently dictionary-attested.",
      }),
    ];

    return phraseMatch(match.surface.length, construction("OvertHeadDemonstrativeClassifierNP", "NP", children, {
      compatibility_alias: "DemonstrativeClassifierNP",
      primary: "object",
      slots: cleanSlots(["overt_head_demonstrative_classifier_np", "np", "topic", "object", "head_noun", "demonstrative", "classifier"]),
      note: `${match.surface} is rendered transparently as the narrow overt-head demonstrative + classifier + noun subtype.`,
      trace: traceInfo("generative_template", {
        construction_type: "OvertHeadDemonstrativeClassifierNP",
        compatibility_construction_type: "DemonstrativeClassifierNP",
        template_family: "generative_template",
        template: ["demonstrative!", "classifier!", "head_noun!"],
        assigned_slots: ["demonstrative", "classifier", "head_noun"],
        surfaces: children.map((node) => flattenSurface(node)),
        np_subtype: "demonstrative_classifier_cup_noun",
        lexical_disambiguation: "杯_noun_not_classifier",
        reason: "The NP subsystem generalizes the rendered 杯 noun repair to the independently observed 個/隻 classifier profiles. The noun sense bui1 ‘cup’ is independently dictionary-attested; this repair changes lexical role only and adds no grammar license.",
      }),
    }));
  }

  function transparentOneCountClassifierSplitFromRest(rest) {
    const quantitySurface = "一";
    const classifierSurface = "個";
    const prefix = quantitySurface + classifierSurface;
    if (!rest.startsWith(prefix)) return null;

    const after = rest.slice(prefix.length);
    if (!after || PUNCT_RE.test(after)) return null;

    const nextTerm = selectLexiconTerm(after);
    if (!nextTerm) return null;

    const nextNode = token(nextTerm.surface);
    if (!nodeCanFillSlot(nextNode, "head_noun")) return null;

    return phraseMatch(prefix.length, [
      token(quantitySurface, {
        label: "how",
        syntax: "quantity count_value numeral_one",
        slots: ["quantity"],
        note: "一 is the visible numeral/quantity before 個; it is not a stative/like predicate in this NP.",
        trace: traceInfo("atomic_lexicon", {
          surface: quantitySurface,
          generated_slots: ["quantity"],
          transparent_token_split: "one_count_quantified_classifier_np",
          following_classifier: classifierSurface,
          following_head_noun: nextTerm.surface,
          reason: "v0.5.97 splits 一個 + head noun before fused lexical lookup so QuantifiedClassifierNP can carry the generated template trace.",
        }),
      }),
      token(classifierSurface, {
        label: "measure_word",
        syntax: "general_classifier classifier",
        slots: ["classifier"],
        note: "個 is the visible classifier/measure word after 一.",
        trace: traceInfo("atomic_lexicon", {
          surface: classifierSurface,
          generated_slots: ["classifier"],
          transparent_token_split: "one_count_quantified_classifier_np",
          following_head_noun: nextTerm.surface,
          reason: "v0.5.97 keeps 個 learner-visible as measure_word instead of letting it disappear inside a fused 一個人 token.",
        }),
      }),
    ]);
  }

  function transparentQuantifiedPersonNpFromRest(rest) {
    if (!rest.startsWith("好多人")) return null;
    const children = [
      token("好多", {
        label: "how",
        syntax: "quantity_degree quantity",
        slots: ["quantity"],
        note: "好多 is the quantity component inside 好多人.",
      }),
      token("人", {
        label: "who",
        syntax: "person_head_noun head_noun",
        slots: ["head_noun", "np", "subject", "topic"],
        note: "人 is the person head noun inside 好多人.",
      }),
    ];
    return phraseMatch("好多人".length, construction("QuantifiedPersonNP", "NP", children, {
      primary: "subject",
      slots: cleanSlots(["np", "subject", "topic", "object", "head_noun", "quantity"]),
      note: "好多人 is rendered transparently as quantity + person head noun while the whole phrase can still fill the subject/who role.",
      trace: traceInfo("generative_template", {
        construction_type: "QuantifiedPersonNP",
        template_family: "generative_template",
        template: ["quantity!", "head_noun!"],
        assigned_slots: ["quantity", "head_noun"],
        surfaces: children.map((node) => flattenSurface(node)),
        reason: "v0.5.82 exposes 好多人 internally instead of flattening it into one who token.",
      }),
    }));
  }

  function transparentDemonstrativeClassifierSplitFromRest(rest) {
    const match = TRANSPARENT_DEMONSTRATIVE_CLASSIFIER_SPLITS.find((spec) => rest.startsWith(spec.surface));
    if (!match) return null;

    const after = rest.slice(match.surface.length);
    if (!after || PUNCT_RE.test(after)) return null;

    const nextTerm = selectLexiconTerm(after);
    if (!nextTerm) return null;

    const nextNode = token(nextTerm.surface);
    if (!nodeCanFillSlot(nextNode, "head_noun")) return null;

    return phraseMatch(match.surface.length, [
      token(match.demonstrative, {
        label: "func",
        syntax: "demonstrative_determiner",
        note: `${match.demonstrative} is a transparent demonstrative determiner before a classifier.`,
        trace: traceInfo("atomic_lexicon", {
          surface: match.demonstrative,
          generated_slots: ["demonstrative"],
          transparent_token_split: "demonstrative_classifier_np",
          parent_surface: match.surface,
          reason: "Transparent split token inside a generated OvertHeadDemonstrativeClassifierNP; the compatibility display label remains DemonstrativeClassifierNP.",
        }),
      }),
      token(match.classifier, {
        label: "measure_word",
        syntax: match.classifierSyntax,
        note: `${match.classifier} is a transparent measure word/classifier after a demonstrative determiner.`,
        trace: traceInfo("atomic_lexicon", {
          surface: match.classifier,
          generated_slots: ["classifier"],
          transparent_token_split: "demonstrative_classifier_np",
          parent_surface: match.surface,
          reason: "Transparent split token inside a generated OvertHeadDemonstrativeClassifierNP; the compatibility display label remains DemonstrativeClassifierNP.",
        }),
      }),
    ]);
  }

  function transparentNominalDiDeterminerFromRest(rest) {
    if (!rest.startsWith("啲")) return null;

    const after = rest.slice("啲".length);
    if (!after || PUNCT_RE.test(after)) return null;

    const nextTerm = selectLexiconTerm(after);
    if (!nextTerm) return null;

    const nextNode = token(nextTerm.surface);
    if (!nodeCanFillSlot(nextNode, "head_noun")) return null;

    return phraseMatch("啲".length, token("啲", {
      label: "func",
      syntax: "di_determiner",
      note: "啲 is a nominal determiner/partitive marker before a visible head noun here, not an adverbial how token.",
      trace: traceInfo("atomic_lexicon", {
        surface: "啲",
        generated_slots: ["di_determiner", "quantity"],
        transparent_token_split: "di_marked_np",
        following_head_noun: nextTerm.surface,
        reason: "Transparent determiner token inside a generated DiMarkedNP; the NP construction carries the generative template trace.",
      }),
    }));
  }

  function transparentDeicticClassifierTopicFromNode(node, contextType) {
    const surface = flattenSurface(node);
    const spec = TRANSPARENT_DEMONSTRATIVE_CLASSIFIER_SPLITS.find((item) => item.surface === surface);
    if (!spec) return null;
    const dem = token(spec.demonstrative, {
      label: "func",
      syntax: "demonstrative_determiner",
      note: `${spec.demonstrative} is a transparent demonstrative determiner inside ${contextType || "a bounded topic"}.`,
      trace: traceInfo("generative_template", {
        construction_type: "Topic",
        template: ["demonstrative!", "classifier!"],
        assigned_slot: "demonstrative",
        parent_surface: surface,
        reason: "v0.5.74 semantic contract cleanup splits fused demonstrative-classifier topics such as 呢個 when they are the visible topic of a definition frame.",
      }),
    });
    const classifier = token(spec.classifier, {
      label: "measure_word",
      syntax: spec.classifierSyntax,
      note: `${spec.classifier} is the transparent classifier inside ${contextType || "a bounded topic"}.`,
      trace: traceInfo("generative_template", {
        construction_type: "Topic",
        template: ["demonstrative!", "classifier!"],
        assigned_slot: "classifier",
        parent_surface: surface,
        reason: "v0.5.74 semantic contract cleanup splits fused demonstrative-classifier topics such as 呢個 when they are the visible topic of a definition frame.",
      }),
    });
    return construction("Topic", "Topic", [dem, classifier], {
      slots: cleanSlots(["topic", "np", "demonstrative", "classifier", "deictic_classifier_topic"]),
      note: `${surface} is preserved as transparent demonstrative + classifier topic material, not an opaque fused topic token.`,
      trace: traceInfo("generative_template", {
        construction_type: "Topic",
        template_family: "generative_template",
        template: ["demonstrative!", "classifier!"],
        assigned_slots: ["demonstrative", "classifier"],
        topic_subtype: "deictic_classifier_ellipsis",
        surfaces: [spec.demonstrative, spec.classifier],
        reason: "v0.5.74 semantic contract cleanup: Definition topics such as 呢個 keep transparent demonstrative/classifier internals.",
        not_claims: ["not_opaque_deictic_classifier_topic"],
      }),
    });
  }

  function quantifiedPersonNPFromFusedNode(node) {
    if (!node || flattenSurface(node) !== "一個人") return null;
    const quantity = token("一", {
      label: "how",
      syntax: "quantity count_value numeral_one",
      slots: ["quantity"],
      note: "一 is the visible numeral/quantity descriptor in 一個人, not a stative/like predicate.",
      trace: traceInfo("generative_template", { construction_type: "QuantifiedClassifierNP", assigned_slot: "quantity", learner_role: "how", parent_surface: "一個人" }),
    });
    const classifier = token("個", {
      label: "measure_word",
      syntax: "general_classifier",
      note: "個 is the visible classifier in 一個人.",
      trace: traceInfo("generative_template", { construction_type: "QuantifiedClassifierNP", assigned_slot: "classifier", parent_surface: "一個人" }),
    });
    const head = token("人", {
      label: "who",
      syntax: "person_head_noun",
      note: "人 is the visible person head noun in 一個人.",
      trace: traceInfo("generative_template", { construction_type: "QuantifiedClassifierNP", assigned_slot: "head_noun", parent_surface: "一個人" }),
    });
    return construction("QuantifiedClassifierNP", "NP", [quantity, classifier, head], {
      slots: cleanSlots(["quantified_classifier_np", "quantity", "classifier", "head_noun", "person_np", "np", "topic", "object", "subject"]),
      note: "Transparent quantified classifier NP: 一 + 個 + 人, used here as the per-person scalar domain.",
      trace: traceInfo("generative_template", {
        construction_type: "QuantifiedClassifierNP",
        template_family: "generative_template",
        template: ["quantity!", "classifier!", "head_noun!"],
        assigned_slots: ["quantity", "classifier", "head_noun"],
        surfaces: ["一", "個", "人"],
        reason: "v0.5.97 cleanup: 一個人 is transparent classifier/person NP material; 一 is quantity/numeral material, not a stative-like predicate.",
        not_claims: ["not_opaque_quantity_person_np"],
      }),
    });
  }

  return {
    quantifiedPersonNPFromFusedNode,
    transparentCupNounDemonstrativeNpFromRest,
    transparentDeicticClassifierTopicFromNode,
    transparentDemonstrativeClassifierSplitFromRest,
    transparentEllipticalDemonstrativeClassifierFromRest,
    transparentNominalDiDeterminerFromRest,
    transparentOneCountClassifierSplitFromRest,
    transparentQuantifiedPersonNpFromRest,
  };
};
