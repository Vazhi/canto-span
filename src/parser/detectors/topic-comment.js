"use strict";

module.exports = function createTopicCommentDetectors(dependencies = {}) {
  const { cleanSlots, construction, isTopicCandidate, templateDerivedSlots, traceInfo, wrapPredicate } = dependencies;

  function topicCommentFallback(core) {
    if (!core.length || !isTopicCandidate(core[0]) || core.length < 2) return null;
    const topic = construction("Topic", "topic", [core[0]], {
      primary: "topic",
      note: "Topic with secondary semantic role what.",
    });
    const commentChildren = wrapPredicate(core.slice(1));
    const children = [topic, ...commentChildren];
    return construction("TopicComment", "TopicComment", children, {
      note: "Topic-comment construction with comment represented as predicate-role metadata rather than a redundant child wrapper.",
      slots: cleanSlots(["topic_comment", "topic", "comment", "comment_predicate", "predicate", "clause", ...templateDerivedSlots("TopicComment", children)]),
      trace: traceInfo("generative_or_heuristic_slot_rule", {
        rule: "topic candidate followed by typed comment predicate",
        reason: "Structural heuristic; the comment relation is carried by TopicComment slots rather than a standalone Comment construction.",
      }),
    });
  }

  return { topicCommentFallback };
};
