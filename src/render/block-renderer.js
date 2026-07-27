"use strict";

module.exports = function createBlockRenderer(dependencies = {}) {
  const {
    Notice,
    diagnosticSummary,
    jyutpingAuditSummary,
    formatDiagnosticMarkdown,
    foldedLexicalRepairDisplayRows,
    normalizationReviewSuggestionDisplayRows,
    learnerUiHoverAuditSummary,
    learnerUiHoverAuditRows,
    diagnosticTokenRows,
    diagnosticFinalRows,
    diagnosticLegend,
    normalizeSurface,
    safeClass,
    nodeDisplaySurface,
    learnerUiHoverTitleForToken,
    learnerUiHoverTitleForConstruction,
    learnerUiHoverTitleForConstructionLayer,
    shouldCollapseClauseSequenceForDisplay,
    shouldCollapseGreedyWrapperForDisplay,
    parserShadowRepairDisplayRows,
    parserShadowRepairKindLabel,
    splitJyutping,
  } = dependencies;

  function createEl(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined && text !== null) element.textContent = String(text);
    return element;
  }
  
  function renderParserShadowRepairs(analysis, container) {
    const rows = parserShadowRepairDisplayRows(analysis);
    if (!rows.length) return;
    const box = createEl("div", "canto-normalization-shadow-repairs canto-normalization-shadow-repairs-compact");
    const label = rows.length > 1 ? `Shadow ×${rows.length}:` : "Shadow:";
    box.appendChild(createEl("span", "canto-normalization-shadow-label", label));
    box.setAttribute("title", rows.map((row) => {
      const kindLabel = parserShadowRepairKindLabel(row);
      const note = row.note || "Parser-shadow repair applied to parser shadow only.";
      return `${row.display} — ${kindLabel}. ${note} Raw learner-visible text is not replaced.`;
    }).join("\n"));
    rows.forEach((row) => {
      const item = createEl("span", "canto-normalization-shadow-repair");
      const kindLabel = parserShadowRepairKindLabel(row);
      const titleParts = [
        `${row.display} — ${kindLabel}.`,
        row.note || "Parser-shadow repair applied to parser shadow only.",
        "Raw learner-visible text is not replaced."
      ];
      item.setAttribute("title", titleParts.join(" "));
      item.appendChild(createEl("span", "canto-normalization-shadow-raw", row.raw));
      item.appendChild(createEl("span", "canto-normalization-shadow-arrow", "→"));
      item.appendChild(createEl("span", "canto-normalization-shadow-normalized", row.normalized));
      box.appendChild(item);
    });
    container.appendChild(box);
  }
  
  async function copyTextToClipboard(text) {
    if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }
  
  function renderCopyButton(parent, textFactory, label, successMessage) {
    const button = createEl("button", "canto-diagnostic-copy canto-diagnostic-ui-only", label);
    button.type = "button";
    button.addEventListener("click", async (event) => {
      event.preventDefault();
      event.stopPropagation();
      try {
        const text = await Promise.resolve(textFactory());
        if (!String(text || "").trim()) {
          new Notice("No Canto Span diagnostics found to copy.");
          return;
        }
        await copyTextToClipboard(text);
        new Notice(successMessage || "Copied Canto Span diagnostic.");
      } catch (error) {
        console.error("Canto Span diagnostic copy failed", error);
        new Notice("Could not copy diagnostic text.");
      }
    });
    parent.appendChild(button);
    return button;
  }
  
  function renderActionButton(parent, action, label) {
    const button = createEl("button", "canto-diagnostic-copy canto-diagnostic-ui-only", label);
    button.type = "button";
    button.addEventListener("click", async (event) => {
      event.preventDefault();
      event.stopPropagation();
      try {
        await action();
      } catch (error) {
        console.error("Canto Span diagnostic action failed", error);
        new Notice("Could not run Canto Span diagnostic action.");
      }
    });
    parent.appendChild(button);
    return button;
  }
  
  function renderPre(parent, className, value) {
    const pre = createEl("pre", className);
    pre.textContent = typeof value === "string" ? value : JSON.stringify(value, null, 2);
    parent.appendChild(pre);
  }
  
  function renderDiagnosticDetails(analysis, container, expanded = false) {
    const details = createEl("details", "canto-diagnostic");
    details.open = Boolean(expanded);
    const summary = diagnosticSummary(analysis);
    const jyutping = jyutpingAuditSummary(analysis);
    const reviewNote = summary.review_count
      ? ` — ${summary.review_count} review trace(s)`
      : " — no review traces";
    const jyutpingNote = jyutping.status === "WARN"
      ? ` — Jyutping WARN (${jyutping.items_needing_review.length})`
      : " — Jyutping PASS";
    details.appendChild(createEl("summary", "canto-diagnostic-summary", `Parse diagnostic${reviewNote}${jyutpingNote}`));
  
    const body = createEl("div", "canto-diagnostic-body");
    const toolbar = createEl("div", "canto-diagnostic-toolbar");
    renderCopyButton(toolbar, () => formatDiagnosticMarkdown(analysis), "Copy diagnostic", "Copied this Canto Span diagnostic.");
    body.appendChild(toolbar);
  
    body.appendChild(createEl("div", "canto-diagnostic-caption", "Summary"));
    renderPre(body, "canto-diagnostic-json", summary);
  
    const foldedRepairRows = foldedLexicalRepairDisplayRows(analysis);
    if (foldedRepairRows.length) {
      body.appendChild(createEl("div", "canto-diagnostic-caption", "Folded pinyin-fallout lexical repairs"));
      renderPre(body, "canto-diagnostic-json", {
        status: "PASS",
        policy: "Repairs are applied to parser shadow only. Raw learner-visible text is preserved.",
        repairs: foldedRepairRows,
      });
    }
    const reviewSuggestionRows = normalizationReviewSuggestionDisplayRows(analysis);
    if (reviewSuggestionRows.length) {
      body.appendChild(createEl("div", "canto-diagnostic-caption", "Review-only normalization suggestions"));
      renderPre(body, "canto-diagnostic-json", {
        status: "PASS",
        policy: "Compatibility lane only. Current v0.5.107 pinyin-fallout repairs should not depend on review-only suggestions.",
        suggestions: reviewSuggestionRows,
      });
    }
  
    body.appendChild(createEl("div", "canto-diagnostic-caption", "Jyutping audit"));
    renderPre(body, "canto-diagnostic-json", jyutpingAuditSummary(analysis));
  
    body.appendChild(createEl("div", "canto-diagnostic-caption", "Learner UI hover audit"));
    renderPre(body, "canto-diagnostic-json", learnerUiHoverAuditSummary(analysis));
  
    body.appendChild(createEl("div", "canto-diagnostic-caption", "Learner UI hover rows"));
    renderPre(body, "canto-diagnostic-json", learnerUiHoverAuditRows(analysis));
  
    body.appendChild(createEl("div", "canto-diagnostic-caption", "Tokenization before construction wrapping"));
    renderPre(body, "canto-diagnostic-json", diagnosticTokenRows(analysis));
  
    body.appendChild(createEl("div", "canto-diagnostic-caption", "Final construction tree"));
    renderPre(body, "canto-diagnostic-json", diagnosticFinalRows(analysis));
  
    body.appendChild(createEl("div", "canto-diagnostic-caption", "Legend"));
    renderPre(body, "canto-diagnostic-json", diagnosticLegend());
  
    details.appendChild(body);
    container.appendChild(details);
  }
  
  function parseContextDirectiveLine(line, sourceLineIndex) {
    const raw = String(line || "");
    // Strip only leading Unicode layout markers for directive recognition. The raw
    // line and the Cantonese context value remain unchanged for display/export.
    const trimmed = raw.trim().replace(/^[\uFEFF\u200B-\u200D\u2060]+/u, "");
    const prefix = trimmed.slice(0, 8);
    if (prefix.normalize("NFKC").toLowerCase() !== "@context") return null;
  
    let remainder = trimmed.slice(8).replace(/^[\s\u00A0\u3000]+/u, "");
    const separator = remainder.charAt(0);
    if (separator !== ":" && separator !== "：") return null;
    remainder = remainder.slice(1);
  
    const contextSource = remainder.trim();
    return {
      id: `block-context-${sourceLineIndex}`,
      directive_kind: "explicit_context_next_source",
      directive_line_index: sourceLineIndex,
      raw_directive: raw,
      separator_code_point: separator.codePointAt(0).toString(16).toUpperCase().padStart(4, "0"),
      source: contextSource,
    };
  }
  
  function parseBlockOptions(source) {
    const lines = String(source || "").split(/\r?\n/);
    const options = {
      lines: [],
      entries: [],
      context_directives: [],
      directive_warnings: [],
    };
    let pendingContext = null;
    for (let sourceLineIndex = 0; sourceLineIndex < lines.length; sourceLineIndex += 1) {
      const line = lines[sourceLineIndex];
      const oneBasedLineIndex = sourceLineIndex + 1;
      const trimmed = line.trim();
      // Diagnostics are controlled by plugin settings. Strip legacy directives so
      // they never become learner input and never consume an explicit context turn.
      if (trimmed === "@diagnostic" || trimmed === "@debug" || trimmed === "@trace") continue;
  
      const contextDirective = parseContextDirectiveLine(line, oneBasedLineIndex);
      if (contextDirective) {
        if (!normalizeSurface(contextDirective.source)) {
          options.directive_warnings.push({
            kind: "empty_context_directive",
            directive_line_index: oneBasedLineIndex,
            raw_directive: line,
          });
          pendingContext = null;
          continue;
        }
        if (pendingContext) {
          options.directive_warnings.push({
            kind: "unconsumed_context_directive_replaced",
            directive_line_index: pendingContext.directive_line_index,
            replacement_directive_line_index: oneBasedLineIndex,
            raw_directive: pendingContext.raw_directive,
          });
        }
        pendingContext = contextDirective;
        options.context_directives.push({ ...contextDirective });
        continue;
      }
  
      options.lines.push(line);
      const isSourceRow = Boolean(normalizeSurface(line));
      const appliedContext = pendingContext && isSourceRow
        ? {
          ...pendingContext,
          target_source_line_index: oneBasedLineIndex,
        }
        : null;
      const entry = {
        line,
        source_line_index: oneBasedLineIndex,
        context_directive: appliedContext,
        context: appliedContext ? { turns: [{ ...appliedContext }] } : null,
      };
      options.entries.push(entry);
      if (isSourceRow) pendingContext = null;
    }
    if (pendingContext) {
      options.directive_warnings.push({
        kind: "dangling_context_directive",
        directive_line_index: pendingContext.directive_line_index,
        raw_directive: pendingContext.raw_directive,
        source: pendingContext.source,
      });
    }
    return options;
  }
  
  function renderJyutping(container, jyutping) {
    const wrapper = createEl("span", "canto-jyutping");
    for (const syllable of splitJyutping(jyutping)) {
      const match = syllable.match(/^(.*?)([1-6])$/);
      const syl = createEl("span", `vjp-syl ${match ? `vjp-tone-${match[2]}` : "vjp-no-tone"}`);
      if (match) {
        syl.appendChild(createEl("span", "vjp-base", match[1]));
        syl.appendChild(createEl("span", "vjp-num", match[2]));
      } else {
        syl.appendChild(createEl("span", "vjp-base", syllable));
      }
      wrapper.appendChild(syl);
    }
    container.appendChild(wrapper);
  }
  
  function renderToken(node, container) {
    const cls = [`canto-token`, `cs-${safeClass(node.label)}`];
    if (node.label === "neutral") cls.push("canto-token-neutral", "canto-lexical-unknown");
    const displaySurface = node.display_surface || node.surface;
    const span = createEl("span", cls.join(" "));
    span.setAttribute("tabindex", "0");
    span.setAttribute("data-canto-kind", "token");
    span.setAttribute("data-canto-surface", displaySurface);
    span.setAttribute("data-canto-parser-surface", node.surface);
    span.setAttribute("data-canto-role", node.label);
    span.setAttribute("data-canto-syntax", node.syntax);
    span.setAttribute("data-canto-review", node.review);
    span.setAttribute("title", learnerUiHoverTitleForToken(node));
  
    if (node.jyutping) renderJyutping(span, node.jyutping);
    span.appendChild(createEl("span", "canto-hanzi", displaySurface));
    container.appendChild(span);
  }
  
  function collectConstructionLayout(node) {
    const leaves = [];
    const spans = [];
  
    function walk(current, depth) {
      if (!current) return { start: leaves.length, end: leaves.length };
      if (current.kind !== "construction") {
        const start = leaves.length;
        leaves.push(current);
        return { start, end: leaves.length };
      }
  
      const start = leaves.length;
      for (const child of current.children || []) walk(child, depth + 1);
      const end = leaves.length;
      spans.push({ node: current, start, end, depth, width: end - start });
      return { start, end };
    }
  
    walk(node, 0);
    return { leaves, spans };
  }
  
  function renderConstructionLeaf(node, container) {
    if (!node) return;
    if (node.kind === "text") {
      container.appendChild(document.createTextNode(node.display_text || node.text));
      return;
    }
    if (node.kind === "token") {
      renderToken(node, container);
    }
  }
  
  function renderConstruction(node, container) {
    const { leaves, spans } = collectConstructionLayout(node);
    const cls = ["canto-pattern", "canto-pattern-layered", `canto-construction-${safeClass(node.type)}`];
    if (node.primary) cls.push("canto-primary-phrase", `canto-primary-${safeClass(node.primary)}`);
    const outer = createEl("span", cls.join(" "));
    outer.setAttribute("data-canto-kind", "construction");
    outer.setAttribute("data-canto-construction", node.type);
    outer.setAttribute("title", learnerUiHoverTitleForConstruction(node));
    outer.style.gridTemplateColumns = leaves.length ? `repeat(${leaves.length}, max-content)` : "max-content";
  
    leaves.forEach((leaf, index) => {
      const cell = createEl("span", "canto-pattern-leaf");
      cell.style.gridColumn = `${index + 1} / ${index + 2}`;
      cell.style.gridRow = "1";
      renderConstructionLeaf(leaf, cell);
      outer.appendChild(cell);
    });
  
    spans
      .filter((span) => span.width > 0)
      .sort((a, b) => {
        if (b.width !== a.width) return b.width - a.width;
        if (a.start !== b.start) return a.start - b.start;
        return a.depth - b.depth;
      })
      .forEach((span, layerIndex) => {
        const layer = createEl("span", `canto-construction-layer canto-construction-depth-${Math.min(layerIndex, 7)}`);
        layer.style.gridColumn = `${span.start + 1} / ${span.end + 1}`;
        layer.style.gridRow = `${layerIndex + 2}`;
        layer.setAttribute("data-canto-construction", span.node.type);
        layer.setAttribute("title", learnerUiHoverTitleForConstructionLayer(span.node));
        layer.appendChild(createEl("span", "canto-construction-line"));
        layer.appendChild(createEl("span", "canto-pattern-label", span.node.label));
        outer.appendChild(layer);
      });
  
    container.appendChild(outer);
  }
  
  function renderNode(node, container, options = {}) {
    if (!node) return;
    if (node.kind === "text") {
      container.appendChild(document.createTextNode(node.text));
      return;
    }
    if (node.kind === "token") {
      renderToken(node, container);
      return;
    }
    if (node.kind === "construction") {
      if (shouldCollapseClauseSequenceForDisplay(node, options) || shouldCollapseGreedyWrapperForDisplay(node, options)) {
        for (const child of node.children || []) renderNode(child, container, options);
        return;
      }
      renderConstruction(node, container);
    }
  }
  

  return {
    createEl,
    copyTextToClipboard,
    renderCopyButton,
    renderActionButton,
    renderPre,
    renderDiagnosticDetails,
    parseContextDirectiveLine,
    parseBlockOptions,
    splitJyutping,
    renderJyutping,
    renderToken,
    collectConstructionLayout,
    renderConstructionLeaf,
    renderConstruction,
    renderNode,
    renderParserShadowRepairs,
  };
};
