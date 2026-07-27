"use strict";

module.exports = function createLegacyRecipientDetectors(dependencies = {}) {
  const {
    bridgeFramePartClone,
    bridgeNPFromNodes,
    categorySubspanFor,
    cleanSlots,
    construction,
    firstToken,
    flattenSurface,
    isToken,
    nodeCanFillSlot,
    nodeSlots,
    rawNodeHasSlot,
    templateDerivedSlots,
    traceInfo,
    withoutIgnorableSpaceText,
    withoutTrailingParticles,
  } = dependencies;

function transferPredicateFromNodes(nodes) {
  const compact = withoutIgnorableSpaceText(nodes || []);
  if (compact.length < 2) return null;
  const give = compact[0];
  const recipient = compact.length === 2 ? compact[1] : bridgeNPFromNodes(compact.slice(1));
  if (!recipient) return null;
  if (!isToken(give, "畀")) return null;
  if (!nodeCanFillSlot(recipient, "recipient") && !nodeCanFillSlot(recipient, "subject") && !nodeCanFillSlot(recipient, "np") && !nodeCanFillSlot(recipient, "object")) return null;
  const marker = bridgeFramePartClone(give, {
    label: "doing",
    pos: "verb",
    syntax: "transfer_predicate benefactive_transfer_verb",
    slots: ["transfer_predicate", "benefactive_marker", "action_verb", "main_verb", "predicate"],
    reason: "畀 is the transfer/give predicate inside a bounded giving frame.",
  });
  const recipientChild = bridgeFramePartClone(recipient, {
    label: (firstToken(recipient) || recipient).label || "who",
    pos: "np",
    syntax: `${recipient.syntax || "recipient_np"} transfer_recipient`,
    slots: ["recipient", "beneficiary", "np", "subject"],
    reason: "Recipient is visible inside the bounded giving/benefactive frame.",
  });
  return construction("RecipientFrame", "Recipient", [marker, recipientChild], {
    note: "Recipient frame inside a bounded giving/benefactive clause; benefactive/transfer meaning stays in slots and trace metadata.",
    slots: templateDerivedSlots("RecipientFrame", [marker, recipientChild]),
    trace: traceInfo("generative_template", {
      construction_type: "RecipientFrame",
      retired_label_alias: "BenefactiveRecipientFrame",
      template_family: "generative_template",
      template: ["benefactive_marker!", "recipient!"],
      assigned_slots: ["benefactive_marker", "recipient"],
      recipient_relation_subtype: "transfer_or_benefactive",
      surfaces: [flattenSurface(marker), flattenSurface(recipientChild)],
      subspan: true,
    }),
  });
}


function recipientFrameFallback(core) {
  const { core: bareCore, particles } = withoutTrailingParticles(core);
  if (particles.length) return null;
  const compact = withoutIgnorableSpaceText(bareCore);
  return transferPredicateFromNodes(compact);
}

function actionVPFromNodesForRecipient(nodes) {
  const compact = withoutIgnorableSpaceText(nodes || []);
  if (!compact.length) return null;
  if (compact.length === 1 && compact[0] && compact[0].kind === "construction" && (rawNodeHasSlot(compact[0], "vp") || rawNodeHasSlot(compact[0], "predicate"))) return compact[0];
  return categorySubspanFor(compact, ["TransitiveVP", "ProductiveVO", "CompletionVP", "VerbComplementVP"]);
}

function benefactiveRecipientVPFallback(core) {
  const { core: bareCore, particles } = withoutTrailingParticles(core);
  const compact = withoutIgnorableSpaceText(bareCore);
  const giveIndex = compact.findIndex((node, index) => index > 0 && isToken(node, "畀"));
  if (giveIndex <= 0 || giveIndex >= compact.length - 1) return null;
  const actionVp = actionVPFromNodesForRecipient(compact.slice(0, giveIndex));
  if (!actionVp) return null;
  const recipientFrame = transferPredicateFromNodes(compact.slice(giveIndex));
  if (!recipientFrame) return null;
  const children = [actionVp, recipientFrame, ...particles];
  return construction("RecipientFrame", "Recipient", children, {
    note: "Postverbal recipient/benefactive frame: action VP + 畀 + recipient. This is separate from true transfer ditransitives and from passive/affectedness 畀 frames.",
    slots: cleanSlots(["recipient_frame", "benefactive_recipient_frame", "vp", "action_vp", "predicate", "recipient", "beneficiary", ...templateDerivedSlots("RecipientFrame", children)]),
    trace: traceInfo("generative_template", {
      construction_type: "RecipientFrame",
      template_family: "generative_template",
      template: ["action_vp!", "benefactive_marker!", "recipient!", "particle?"],
      assigned_slots: ["action_vp", "recipient_frame", ...particles.map(() => "particle")],
      recipient_relation_subtype: "postverbal_benefactive_recipient",
      boundary_guardrail: "not_comitative_action_motion_vp",
      surfaces: children.map((node) => flattenSurface(node)),
      reason: "畀 + recipient after an action VP marks a recipient/benefactive relation, not a comitative action/motion participant. Keeps the action VP and recipient frame transparent.",
    }),
  });
}

function transferDitransitiveVPFallback(core) {
  const { core: bareCore, particles } = withoutTrailingParticles(core);
  const compact = withoutIgnorableSpaceText(bareCore);
  if (compact.length < 3 || compact.length > 5) return null;

  let subject = null;
  let giveIndex = -1;
  if (isToken(compact[0], "畀")) {
    giveIndex = 0;
  } else if (compact.length >= 4 && nodeCanFillSlot(compact[0], "subject") && isToken(compact[1], "畀")) {
    subject = compact[0];
    giveIndex = 1;
  } else {
    return null;
  }

  const give = compact[giveIndex];
  const argumentsAfterGive = compact.slice(giveIndex + 1);
  if (argumentsAfterGive.length < 2) return null;

  const looksExplicitlyPersonLike = (node) => {
    const tok = firstToken(node) || node;
    const slots = nodeSlots(node);
    return (tok && tok.label === "who")
      || slots.includes("recipient")
      || slots.includes("co_participant")
      || slots.includes("stance_holder")
      || slots.includes("person_np");
  };
  const looksThemeLike = (node) => {
    const tok = firstToken(node) || node;
    const slots = nodeSlots(node);
    return (tok && tok.label === "what")
      || slots.includes("object")
      || slots.includes("head_noun")
      || slots.includes("np");
  };
  const cloneTransferArgument = (node, roleKind) => {
    const roleSlots = roleKind === "recipient"
      ? ["recipient", "goal", "np"]
      : ["theme", "object", "np"];
    const roleSyntax = roleKind === "recipient"
      ? "transfer_recipient goal_recipient"
      : "transfer_theme transferred_object";
    const reason = roleKind === "recipient"
      ? "This NP is the recipient/goal in the selected Cantonese transfer order."
      : "This NP is the transferred theme/object in the selected Cantonese transfer order.";
    if (node.kind === "construction") {
      return {
        ...node,
        slots: cleanSlots([...nodeSlots(node), ...roleSlots]),
        parent_role_assignment: {
          construction_type: "TransferDitransitiveVP",
          assigned_role: roleKind,
          reason,
        },
      };
    }
    const base = firstToken(node) || node;
    return bridgeFramePartClone(base, {
      label: base.label || (roleKind === "recipient" ? "who" : "what"),
      pos: roleKind === "recipient" ? "np" : (base.features && base.features.pos ? base.features.pos : "noun"),
      syntax: `${base.syntax || (roleKind === "recipient" ? "recipient_np" : "object_np")} ${roleSyntax}`,
      slots: roleSlots,
      reason,
    });
  };

  const firstArgument = argumentsAfterGive[0];
  const lastArgument = argumentsAfterGive[argumentsAfterGive.length - 1];
  const recipientFirstTheme = bridgeNPFromNodes(argumentsAfterGive.slice(1));
  const themeFirstTheme = bridgeNPFromNodes(argumentsAfterGive.slice(0, -1));

  const recipientFirst = looksExplicitlyPersonLike(firstArgument)
    && recipientFirstTheme
    && looksThemeLike(recipientFirstTheme)
    && !looksExplicitlyPersonLike(recipientFirstTheme);

  let theme = null;
  let recipient = null;
  let order = "";
  if (recipientFirst) {
    recipient = firstArgument;
    theme = recipientFirstTheme;
    order = "recipient_theme";
  } else {
    theme = themeFirstTheme;
    recipient = lastArgument;
    order = "theme_recipient";
  }

  if (!theme || !recipient) return null;
  if (!looksThemeLike(theme)) return null;
  if (!looksExplicitlyPersonLike(recipient)
      && !nodeCanFillSlot(recipient, "recipient")
      && !nodeCanFillSlot(recipient, "subject")
      && !nodeCanFillSlot(recipient, "np")) return null;

  const transferVerb = bridgeFramePartClone(give, {
    label: "doing",
    pos: "verb",
    syntax: "transfer_predicate ditransitive_transfer_verb",
    slots: ["transfer_predicate", "action_verb", "main_verb", "predicate"],
    reason: "畀 is the transfer/give predicate in a true transfer ditransitive frame, not a postverbal benefactive-purpose marker.",
  });
  const themeChild = cloneTransferArgument(theme, "theme");
  const recipientChild = cloneTransferArgument(recipient, "recipient");

  const orderedArguments = order === "recipient_theme"
    ? [recipientChild, themeChild]
    : [themeChild, recipientChild];
  const orderedSlots = order === "recipient_theme"
    ? ["recipient", "theme"]
    : ["theme", "recipient"];
  const children = [
    ...(subject ? [subject] : []),
    transferVerb,
    ...orderedArguments,
    ...particles,
  ];
  const assignedSlots = [
    ...(subject ? ["subject"] : []),
    "transfer_predicate",
    ...orderedSlots,
    ...particles.map(() => "particle"),
  ];
  const template = [
    ...(subject ? ["subject?"] : []),
    "transfer_predicate!",
    ...(order === "recipient_theme"
      ? ["recipient!", "theme!"]
      : ["theme!", "recipient!"]),
    "particle?",
  ];

  return construction("TransferDitransitiveVP", "TransferVP", children, {
    note: "True Cantonese transfer ditransitive with evidence-controlled Theme/Recipient assignment. Both Verb + Theme + Recipient and Verb + Recipient + Theme orders remain available when the visible NP roles support them.",
    slots: templateDerivedSlots("TransferDitransitiveVP", children),
    trace: traceInfo("generative_template", {
      construction_type: "TransferDitransitiveVP",
      template_family: "generative_template",
      template,
      assigned_slots: assignedSlots,
      ditransitive_subtype: order === "recipient_theme"
        ? "true_transfer_recipient_theme"
        : "true_transfer_theme_recipient",
      argument_order: order,
      boundary_guardrail: "not_serial_verb_purpose_chain",
      surfaces: children.map((node) => flattenSurface(node)),
      reason: order === "recipient_theme"
        ? "The first postverbal NP is explicitly person/recipient-like and the following NP is theme-like, so this row uses Verb + Recipient + Theme order."
        : "The pre-final postverbal material forms the transferred theme and the final person/recipient-like NP is the goal, so this row uses Verb + Theme + Recipient order.",
    }),
  });
}

  return {
    benefactiveRecipientVPFallback,
    recipientFrameFallback,
    transferDitransitiveVPFallback,
    transferPredicateFromNodes,
  };
};
