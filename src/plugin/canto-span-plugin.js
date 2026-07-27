"use strict";

const { Plugin, PluginSettingTab, Setting, Notice } = require("obsidian");
const createBlockRenderer = require("../render/block-renderer");
const {
  BLOCK_CLASS,
  GLOBAL_COLOR_ACCESSIBILITY_CLASS,
  GLOBAL_DIAGNOSTICS_CLASS,
  GLOBAL_DIAGNOSTICS_EXPANDED_CLASS,
  ROLE_COLOR_SETTINGS,
  DEFAULT_ROLE_COLORS,
  DEFAULT_SETTINGS,
  normalizeHexColor,
  getMergedRoleColors,
} = require("./settings");

module.exports = function createCantoSpanPlugin(dependencies = {}) {
  const {
    CANTO_SPAN_RUNTIME_VERSION,
    analyzeLine,
    normalizeSurface,
    formatDiagnosticMarkdownForNote,
    diagnosticExportPayloadsForNote,
    formatNoteMarkdownWithDiagnostics,
    formatDiagnosticMarkdown,
    diagnosticSummary,
    jyutpingAuditSummary,
    foldedLexicalRepairDisplayRows,
    normalizationReviewSuggestionDisplayRows,
    learnerUiHoverAuditSummary,
    learnerUiHoverAuditRows,
    diagnosticTokenRows,
    diagnosticFinalRows,
    diagnosticLegend,
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

  const {
    createEl,
    renderCopyButton,
    renderActionButton,
    renderDiagnosticDetails,
    parseBlockOptions,
    renderNode,
    renderParserShadowRepairs,
  } = createBlockRenderer({
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
  });

  class CantoSpanPlugin extends Plugin {
    async onload() {
      await this.loadSettings();
      this.renderedCantoBlocks = new Map();
      this.syncGlobalSettingClasses();
      this.startDiagnosticDetailsObserver();
  
      this.registerMarkdownCodeBlockProcessor("canto-span", (source, element) => {
        this.renderedCantoBlocks.set(element, source);
        this.renderBlock(source, element);
      });
  
      this.addSettingTab(new CantoSpanSettingTab(this.app, this));
    }
  
    onunload() {
      if (this.diagnosticDetailsObserver) {
        this.diagnosticDetailsObserver.disconnect();
        this.diagnosticDetailsObserver = null;
      }
      if (typeof document !== "undefined" && document.body) {
        document.body.classList.remove(GLOBAL_COLOR_ACCESSIBILITY_CLASS);
        document.body.classList.remove(GLOBAL_DIAGNOSTICS_CLASS);
        document.body.classList.remove(GLOBAL_DIAGNOSTICS_EXPANDED_CLASS);
        this.clearRoleColorVariables();
      }
    }
  
    async loadSettings() {
      const loaded = await this.loadData();
      this.settings = Object.assign({}, DEFAULT_SETTINGS, loaded || {});
      this.settings.roleColors = getMergedRoleColors(this.settings);
    }
  
    async saveSettings() {
      await this.saveData(this.settings);
      this.syncGlobalSettingClasses();
    }
  
    syncGlobalSettingClasses() {
      if (typeof document === "undefined" || !document.body) return;
      this.pruneRenderedCantoBlocks();
      document.body.classList.toggle(
        GLOBAL_COLOR_ACCESSIBILITY_CLASS,
        Boolean(this.settings && this.settings.showColorAccessibilityMarkers)
      );
      document.body.classList.toggle(
        GLOBAL_DIAGNOSTICS_CLASS,
        Boolean(this.settings && this.settings.showDiagnostics)
      );
      document.body.classList.toggle(
        GLOBAL_DIAGNOSTICS_EXPANDED_CLASS,
        Boolean(this.settings && this.settings.expandDiagnostics)
      );
      this.syncRoleColorVariables();
      this.scheduleRenderedDiagnosticDetailsSync();
    }
  
    syncRoleColorVariables() {
      if (typeof document === "undefined" || !document.body) return;
      const colors = getMergedRoleColors(this.settings);
      this.settings.roleColors = colors;
      for (const role of ROLE_COLOR_SETTINGS) {
        const color = colors[role.key];
        for (const cssVar of role.cssVars) {
          document.body.style.setProperty(`--canto-user-color-${cssVar}`, color);
        }
      }
    }
  
    clearRoleColorVariables() {
      if (typeof document === "undefined" || !document.body) return;
      for (const role of ROLE_COLOR_SETTINGS) {
        for (const cssVar of role.cssVars) {
          document.body.style.removeProperty(`--canto-user-color-${cssVar}`);
        }
      }
    }
  
    pruneRenderedCantoBlocks() {
      if (!this.renderedCantoBlocks) return 0;
      let pruned = 0;
      for (const [element] of Array.from(this.renderedCantoBlocks.entries())) {
        if (!element || !element.isConnected) {
          this.renderedCantoBlocks.delete(element);
          pruned += 1;
        }
      }
      return pruned;
    }
  
    getRenderedDiagnosticDetails() {
      this.pruneRenderedCantoBlocks();
      const detailsSet = new Set();
      if (this.renderedCantoBlocks) {
        for (const element of this.renderedCantoBlocks.keys()) {
          if (!element || !element.isConnected || typeof element.querySelectorAll !== "function") continue;
          for (const details of Array.from(element.querySelectorAll(".canto-study-block details.canto-diagnostic"))) {
            detailsSet.add(details);
          }
        }
      }
      if (typeof document !== "undefined" && typeof document.querySelectorAll === "function") {
        for (const details of Array.from(document.querySelectorAll(".canto-study-block details.canto-diagnostic"))) {
          detailsSet.add(details);
        }
      }
      return Array.from(detailsSet);
    }
  
    syncRenderedDiagnosticDetails() {
      const shouldOpen = Boolean(this.settings && this.settings.expandDiagnostics);
      for (const details of this.getRenderedDiagnosticDetails()) {
        if (shouldOpen) {
          details.open = true;
          details.setAttribute("open", "");
          details.setAttribute("data-canto-expanded-by-setting", "true");
        } else {
          details.open = false;
          details.removeAttribute("open");
          details.setAttribute("data-canto-expanded-by-setting", "false");
        }
      }
    }
  
    scheduleRenderedDiagnosticDetailsSync() {
      this.syncRenderedDiagnosticDetails();
      if (typeof requestAnimationFrame === "function") {
        requestAnimationFrame(() => this.syncRenderedDiagnosticDetails());
      }
      if (typeof window !== "undefined" && typeof window.setTimeout === "function") {
        window.setTimeout(() => this.syncRenderedDiagnosticDetails(), 0);
      }
    }
  
    queueDiagnosticDetailsSync() {
      if (this.diagnosticDetailsSyncQueued) return;
      this.diagnosticDetailsSyncQueued = true;
      const run = () => {
        this.diagnosticDetailsSyncQueued = false;
        this.syncRenderedDiagnosticDetails();
      };
      if (typeof requestAnimationFrame === "function") {
        requestAnimationFrame(run);
      } else if (typeof window !== "undefined" && typeof window.setTimeout === "function") {
        window.setTimeout(run, 0);
      } else {
        run();
      }
    }
  
    startDiagnosticDetailsObserver() {
      if (typeof MutationObserver === "undefined" || typeof document === "undefined" || !document.body) return;
      this.diagnosticDetailsObserver = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          for (const node of Array.from(mutation.addedNodes || [])) {
            if (!node || node.nodeType !== 1) continue;
            const element = node;
            if (element.matches && element.matches("details.canto-diagnostic")) {
              this.queueDiagnosticDetailsSync();
              return;
            }
            if (element.querySelector && element.querySelector("details.canto-diagnostic")) {
              this.queueDiagnosticDetailsSync();
              return;
            }
          }
        }
      });
      this.diagnosticDetailsObserver.observe(document.body, { childList: true, subtree: true });
    }
  
    refreshRenderedBlocks() {
      if (!this.renderedCantoBlocks) return;
      this.pruneRenderedCantoBlocks();
      for (const [element, source] of Array.from(this.renderedCantoBlocks.entries())) {
        if (!element || !element.isConnected) continue;
        this.renderBlock(source, element);
      }
    }
  
    async readActiveNoteMarkdown() {
      const file = this.app.workspace && this.app.workspace.getActiveFile
        ? this.app.workspace.getActiveFile()
        : null;
      if (!file) return { file: null, markdown: "" };
      const markdown = await this.app.vault.read(file);
      return { file, markdown };
    }
  
    async formatActiveNoteDiagnostics() {
      const { markdown } = await this.readActiveNoteMarkdown();
      return formatDiagnosticMarkdownForNote(markdown);
    }
  
    async saveActiveNoteDiagnosticsJson() {
      const { file, markdown } = await this.readActiveNoteMarkdown();
      if (!file || !file.path) {
        new Notice("No active note found for Canto Span diagnostics JSON.");
        return { summaryPath: "", fullPath: "" };
      }
      const bundle = diagnosticExportPayloadsForNote(markdown, file.path);
      const { summaryPath, fullPath } = bundle.paths;
      if (!summaryPath || !fullPath) {
        new Notice("Could not determine Canto Span diagnostics JSON paths.");
        return { summaryPath: "", fullPath: "" };
      }
      for (const outputPath of [summaryPath, fullPath]) {
        const existing = this.app.vault.getAbstractFileByPath(outputPath);
        if (existing && existing.children) {
          new Notice(`Cannot write Canto Span diagnostics JSON: ${outputPath} is a folder.`);
          return { summaryPath: "", fullPath: "" };
        }
      }
      const writeJson = async (outputPath, payload) => {
        const json = JSON.stringify(payload, null, 2);
        const existing = this.app.vault.getAbstractFileByPath(outputPath);
        if (existing) await this.app.vault.modify(existing, json);
        else await this.app.vault.create(outputPath, json);
      };
      // Write the full artifact first so the summary never points to a missing
      // companion after a successful two-file save.
      await writeJson(fullPath, bundle.full);
      await writeJson(summaryPath, bundle.summary);
      new Notice(`Saved Canto Span acceptance summary and full diagnostics JSON beside the note.`);
      return { summaryPath, fullPath };
    }
  
    async formatActiveNoteWithDiagnostics() {
      const { file, markdown } = await this.readActiveNoteMarkdown();
      return formatNoteMarkdownWithDiagnostics(markdown, file && file.path ? file.path : "");
    }
  
    renderBlock(source, element) {
      element.empty();
      const options = parseBlockOptions(source);
      const expandDiagnostics = Boolean(this.settings && this.settings.expandDiagnostics);
      const block = createEl("div", BLOCK_CLASS);
      block.setAttribute("data-canto-runtime-version", CANTO_SPAN_RUNTIME_VERSION);
      const titleRow = createEl("div", "canto-title-row");
      const title = createEl("div", "canto-title");
      title.appendChild(createEl("span", "canto-title-normal", "Canto Span"));
      title.appendChild(createEl("span", "canto-title-diagnostic", `Canto Span — Diagnostic v${CANTO_SPAN_RUNTIME_VERSION}`));
      titleRow.appendChild(title);
  
      const analyzedLines = options.entries.map((entry) => ({
        line: entry.line,
        source_line_index: entry.source_line_index,
        context_directive: entry.context_directive || null,
        analysis: analyzeLine(entry.line, entry.context),
      }));
      const diagnosticLines = analyzedLines.filter((entry) => normalizeSurface(entry.line));
      if (diagnosticLines.length) {
        renderCopyButton(
          titleRow,
          () => this.formatActiveNoteWithDiagnostics(),
          "Copy note + diagnostics",
          "Copied the active note with Canto Span diagnostics at the top."
        );
        renderCopyButton(
          titleRow,
          () => this.formatActiveNoteDiagnostics(),
          "Copy diagnostics only",
          "Copied all Canto Span diagnostics in this note."
        );
        renderActionButton(
          titleRow,
          () => this.saveActiveNoteDiagnosticsJson(),
          "Save diagnostics JSON"
        );
        renderCopyButton(
          titleRow,
          () => diagnosticLines.map((entry) => formatDiagnosticMarkdown(entry.analysis)).join("\n\n---\n\n"),
          diagnosticLines.length === 1 ? "Copy block diagnostic" : "Copy block diagnostics",
          diagnosticLines.length === 1 ? "Copied this Canto Span block diagnostic." : "Copied this Canto Span block's diagnostics."
        );
      }
  
      const legend = createEl("div", "canto-context-review-boundaries");
      legend.appendChild(createEl("span", "canto-legend-normal", "Parent construction spans wrap child learner-role tokens. Hover/tap tokens for Jyutping."));
      legend.appendChild(createEl("span", "canto-legend-diagnostic", "Diagnostic mode is enabled in plugin settings: tokenization, Jyutping audit, generated slots, construction match source, and review traces are shown. Use Copy note + diagnostics to copy the whole active note with generated diagnostics at the top, Copy diagnostics only for the generated batch, Save diagnostics JSON to write both a compact acceptance summary and a companion full-diagnostics file beside the active note, or Copy block diagnostic for one block."));
      const rendered = createEl("div", "canto-rendered");
  
      for (const { line, analysis, context_directive: contextDirective } of analyzedLines) {
        if (contextDirective) {
          const contextMeta = createEl("div", "canto-context-directive-diagnostic canto-diagnostic-ui-only");
          contextMeta.setAttribute("data-canto-context-turn-id", contextDirective.id);
          contextMeta.setAttribute("data-canto-context-directive-line", String(contextDirective.directive_line_index));
          contextMeta.setAttribute("data-canto-context-target-line", String(contextDirective.target_source_line_index));
          contextMeta.textContent = `Explicit context → ${contextDirective.source}`;
          rendered.appendChild(contextMeta);
        }
        for (const warning of analysis.warnings) {
          const warningEl = createEl("div", "canto-context-review-warning", warning);
          rendered.appendChild(warningEl);
        }
        renderParserShadowRepairs(analysis, rendered);
  
        const lineNormal = createEl("div", "canto-line canto-line-normal");
        for (const node of analysis.nodes) renderNode(node, lineNormal, { showDiagnostics: false });
        rendered.appendChild(lineNormal);
  
        const lineDiagnostic = createEl("div", "canto-line canto-line-diagnostic");
        for (const node of analysis.nodes) renderNode(node, lineDiagnostic, { showDiagnostics: true });
        rendered.appendChild(lineDiagnostic);
  
        if (normalizeSurface(line)) renderDiagnosticDetails(analysis, rendered, expandDiagnostics);
      }
  
      block.appendChild(titleRow);
      block.appendChild(legend);
      block.appendChild(rendered);
      element.appendChild(block);
      this.scheduleRenderedDiagnosticDetailsSync();
    }
  };
  
  class CantoSpanSettingTab extends PluginSettingTab {
    constructor(app, plugin) {
      super(app, plugin);
      this.plugin = plugin;
    }
  
    display() {
      const { containerEl } = this;
      containerEl.empty();
  
      containerEl.createEl("h2", { text: "Canto Span" });
  
      new Setting(containerEl)
        .setName("Show parse diagnostics")
        .setDesc("Show tokenization, Jyutping audit, generated slot candidates, final construction tree, and trace source below each rendered line.")
        .addToggle((toggle) => toggle
          .setValue(Boolean(this.plugin.settings.showDiagnostics))
          .onChange(async (value) => {
            this.plugin.settings.showDiagnostics = value;
            await this.plugin.saveSettings();
            this.display();
          }));
  
      new Setting(containerEl)
        .setName("Expand diagnostics by default")
        .setDesc("Open diagnostic details automatically when parse diagnostics are shown. This can be set before enabling parse diagnostics.")
        .addToggle((toggle) => toggle
          .setValue(Boolean(this.plugin.settings.expandDiagnostics))
          .onChange(async (value) => {
            this.plugin.settings.expandDiagnostics = value;
            await this.plugin.saveSettings();
            this.display();
          }));
  
      new Setting(containerEl)
        .setName("Show color accessibility markers")
        .setDesc("Adds non-color learner-role markers for protanopia, deuteranopia, tritanopia, and grayscale support. When off, learner-role styling uses color only.")
        .addToggle((toggle) => toggle
          .setValue(Boolean(this.plugin.settings.showColorAccessibilityMarkers))
          .onChange(async (value) => {
            this.plugin.settings.showColorAccessibilityMarkers = value;
            await this.plugin.saveSettings();
            this.display();
          }));
  
      containerEl.createEl("h3", { text: "Role colors" });
      const colorDesc = containerEl.createEl("p", { cls: "setting-item-description" });
      colorDesc.textContent = "Choose learner-role colors. Changes apply to already-rendered canto-span blocks immediately. Reset restores the neon default for that role.";
  
      this.plugin.settings.roleColors = getMergedRoleColors(this.plugin.settings);
      for (const role of ROLE_COLOR_SETTINGS) {
        new Setting(containerEl)
          .setName(role.label)
          .setDesc(`CSS variable${role.cssVars.length > 1 ? "s" : ""}: ${role.cssVars.map((cssVar) => `--canto-color-${cssVar}`).join(", ")}`)
          .addColorPicker((picker) => picker
            .setValue(this.plugin.settings.roleColors[role.key] || role.defaultColor)
            .onChange(async (value) => {
              const normalized = normalizeHexColor(value) || role.defaultColor;
              this.plugin.settings.roleColors[role.key] = normalized;
              await this.plugin.saveSettings();
            }))
          .addButton((button) => button
            .setButtonText("Reset")
            .setTooltip(`Reset ${role.label} to ${role.defaultColor}`)
            .onClick(async () => {
              this.plugin.settings.roleColors[role.key] = role.defaultColor;
              await this.plugin.saveSettings();
              this.display();
            }));
      }
  
      new Setting(containerEl)
        .setName("Reset all role colors")
        .setDesc("Restore every learner-role color to the v0.5.4 neon defaults.")
        .addButton((button) => button
          .setButtonText("Reset all")
          .setWarning()
          .onClick(async () => {
            this.plugin.settings.roleColors = { ...DEFAULT_ROLE_COLORS };
            await this.plugin.saveSettings();
            this.display();
          }));
  
      const note = containerEl.createEl("p", { cls: "setting-item-description" });
      note.textContent = "Review signal: prefer generative_template and slot-based traces. Treat legacy_surface_rule and surface_specific_phrase_rule as places to simplify later.";
    }
  }
  

  return CantoSpanPlugin;
};
