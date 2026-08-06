import { useState } from "react";
import { PLATFORMS, TAXONOMY, EVOLUTION_TIMELINE } from "../data/knowledge";

type View = "decision" | "compare" | "taxonomy" | "timeline";

export default function PlatformCompare() {
  const [view, setView] = useState<View>("decision");
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const setAnswer = (q: string, a: string) => setAnswers(prev => ({ ...prev, [q]: a }));

  // Decision logic
  const recommendation = (() => {
    if (answers.audience === "chatgpt") return "gpt";
    if (answers.audience === "m365") return "copilot";
    if (answers.audience === "google") return "gem";
    if (answers.portability === "yes") return answers.codeExecution === "yes" ? "skill" : "gpt+skill";
    if (answers.enterprise === "yes") return "copilot";
    if (answers.budget === "free") return "gem";
    return "gpt";
  })();

  const recText: Record<string, { label: string; color: string; why: string }> = {
    gpt: { label: "Custom GPT", color: "var(--color-forge-accent)", why: "Your audience is in ChatGPT, no-code is preferred, and managed RAG over documents is the primary need." },
    gem: { label: "Gemini Gem", color: "#4285f4", why: "Google Workspace native environment, budget-conscious, or large-context tasks needing 1M token window." },
    copilot: { label: "Copilot Declarative Agent", color: "#00a4ef", why: "Enterprise M365 deployment with org-wide knowledge grounding via Microsoft Graph and IT governance requirements." },
    skill: { label: "Agent Skill (SKILL.md)", color: "var(--color-forge-success)", why: "Cross-platform portability needed, version-controlled capability, rigorous evaluation, or coding/agentic environments." },
    "gpt+skill": { label: "Custom GPT + Agent Skill", color: "var(--color-forge-accent-hi)", why: "Author canonical workflow as a Skill (portable, tested), wrap a thin Custom GPT for ChatGPT distribution." },
  };

  return (
    <div style={{ maxWidth: 900 }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", color: "var(--color-forge-accent)", margin: 0 }}>
          ⚖️ Platform Comparison
        </h1>
        <p style={{ color: "var(--color-forge-muted-fg)", marginTop: "0.35rem", fontSize: "0.9rem" }}>
          Custom GPT vs. Gemini Gem vs. Copilot Declarative Agent — mid-2026 reference.
        </p>
      </div>

      {/* Tab nav */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
        {([["decision", "Platform Selector"], ["compare", "Feature Matrix"], ["taxonomy", "AI Taxonomy"], ["timeline", "Evolution Timeline"]] as [View, string][]).map(([v, label]) => (
          <button key={v} onClick={() => setView(v)}
            style={{
              padding: "0.45rem 1rem", borderRadius: "var(--radius-md)", cursor: "pointer",
              background: view === v ? "var(--color-forge-accent)" : "var(--color-forge-panel)",
              color: view === v ? "var(--color-forge-paper)" : "var(--color-forge-fg)",
              border: "1px solid var(--color-forge-border)", fontFamily: "var(--font-body)", fontSize: "0.85rem",
            }}>
            {label}
          </button>
        ))}
      </div>

      {/* Decision tree */}
      {view === "decision" && (
        <div>
          <div className="callout" style={{ marginBottom: "1.5rem" }}>
            Answer these questions to get a platform recommendation.
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "1.5rem" }}>
            {[
              { id: "audience", q: "Where does your primary audience live?", opts: [["chatgpt", "ChatGPT (consumers, prosumers)"], ["m365", "Microsoft 365 (enterprise)"], ["google", "Google Workspace"], ["mixed", "Multiple platforms / no specific preference"]] },
              { id: "portability", q: "Do you need this capability to run across multiple AI tools (Claude, Copilot, Codex, Cursor, etc.)?", opts: [["yes", "Yes — portability is important"], ["no", "No — one platform is fine"]] },
              { id: "codeExecution", q: "Does this capability involve code execution or scripting?", opts: [["yes", "Yes"], ["no", "No"]] },
              { id: "enterprise", q: "Do you have enterprise M365 Copilot licensing and need org-wide knowledge grounding (SharePoint, Teams, Outlook)?", opts: [["yes", "Yes"], ["no", "No"]] },
              { id: "budget", q: "What's the build budget?", opts: [["free", "Free / minimal spend"], ["paid", "ChatGPT Plus ($20/mo) is fine"], ["enterprise", "Enterprise pricing OK"]] },
            ].map(q => (
              <div key={q.id}>
                <div style={{ fontSize: "0.88rem", fontWeight: 600, marginBottom: "0.5rem" }}>{q.q}</div>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {q.opts.map(([value, label]) => (
                    <button key={value} onClick={() => setAnswer(q.id, value)}
                      style={{
                        padding: "0.4rem 0.75rem", borderRadius: "var(--radius-md)", cursor: "pointer",
                        background: answers[q.id] === value ? "rgba(196,106,44,0.2)" : "var(--color-forge-panel)",
                        border: `1px solid ${answers[q.id] === value ? "var(--color-forge-accent)" : "var(--color-forge-border)"}`,
                        color: answers[q.id] === value ? "var(--color-forge-fg)" : "var(--color-forge-muted-fg)",
                        fontFamily: "var(--font-body)", fontSize: "0.82rem",
                      }}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {Object.keys(answers).length >= 2 && (
            <div style={{ padding: "1.25rem", background: "rgba(196,106,44,0.1)", border: "2px solid var(--color-forge-accent)", borderRadius: "var(--radius-md)" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--color-forge-muted-fg)", marginBottom: "0.35rem" }}>Recommendation</div>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: "1.25rem", color: recText[recommendation]?.color, marginBottom: "0.35rem" }}>
                → {recText[recommendation]?.label}
              </div>
              <div style={{ fontSize: "0.85rem", color: "var(--color-forge-muted-fg)" }}>{recText[recommendation]?.why}</div>
            </div>
          )}
        </div>
      )}

      {/* Feature matrix */}
      {view === "compare" && (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem" }}>
            <thead>
              <tr style={{ background: "var(--color-forge-panel)" }}>
                <th style={thStyle}>Dimension</th>
                {PLATFORMS.map(p => (
                  <th key={p.id} style={{ ...thStyle, color: "var(--color-forge-fg)" }}>
                    {p.logo} {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Best for", (p: typeof PLATFORMS[0]) => p.bestFor],
                ["Weakest at", (p: typeof PLATFORMS[0]) => p.weakAt],
                ["Knowledge", (p: typeof PLATFORMS[0]) => p.knowledge],
                ["Tools", (p: typeof PLATFORMS[0]) => p.tools],
                ["Cost", (p: typeof PLATFORMS[0]) => p.cost],
                ["Instruction limit", (p: typeof PLATFORMS[0]) => p.instructionLimit],
                ["Knowledge limit", (p: typeof PLATFORMS[0]) => p.knowledgeLimit],
                ["Actions note", (p: typeof PLATFORMS[0]) => p.actionsNote],
                ["Governance", (p: typeof PLATFORMS[0]) => p.governance],
                ["Portability", (p: typeof PLATFORMS[0]) => p.portability],
                ["Customization", (p: typeof PLATFORMS[0]) => p.customization],
                ["Builder access", (p: typeof PLATFORMS[0]) => p.barrier],
                ["Models (mid-2026)", (p: typeof PLATFORMS[0]) => p.models],
              ].map(([label, accessor], i) => (
                <tr key={label as string} style={{ background: i % 2 === 0 ? "transparent" : "var(--color-forge-surface)" }}>
                  <td style={{ ...tdStyle, fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--color-forge-muted-fg)", whiteSpace: "nowrap" }}>{label as string}</td>
                  {PLATFORMS.map(p => (
                    <td key={p.id} style={tdStyle}>{(accessor as (p: typeof PLATFORMS[0]) => string)(p)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Taxonomy */}
      {view === "taxonomy" && (
        <div>
          <div className="callout" style={{ marginBottom: "1rem" }}>
            How Custom GPTs relate to every adjacent AI construct — the generative AI terminology stack.
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8rem" }}>
              <thead>
                <tr style={{ background: "var(--color-forge-panel)" }}>
                  {["Concept", "Layer", "Persistence", "Visibility", "Notes"].map(h => (
                    <th key={h} style={thStyle}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TAXONOMY.map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? "transparent" : "var(--color-forge-surface)" }}>
                    <td style={{ ...tdStyle, fontWeight: row.concept === "Custom GPT" ? 700 : 400, color: row.concept === "Custom GPT" ? "var(--color-forge-accent)" : "var(--color-forge-fg)" }}>{row.concept}</td>
                    <td style={{ ...tdStyle, fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--color-forge-muted-fg)" }}>{row.layer}</td>
                    <td style={tdStyle}>{row.persistence}</td>
                    <td style={tdStyle}>{row.visibility}</td>
                    <td style={{ ...tdStyle, color: "var(--color-forge-muted-fg)" }}>{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Timeline */}
      {view === "timeline" && (
        <div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {EVOLUTION_TIMELINE.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "1rem", paddingBottom: "0.75rem", position: "relative" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: "8px" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: item.status === "Active" ? "var(--color-forge-accent)" : item.status.includes("Emerging") ? "var(--color-forge-teal-hi)" : "var(--color-forge-muted)", marginTop: "0.3rem", flexShrink: 0 }} />
                  {i < EVOLUTION_TIMELINE.length - 1 && <div style={{ width: 1, flex: 1, background: "var(--color-forge-border)", marginTop: "2px" }} />}
                </div>
                <div style={{ flex: 1, paddingBottom: "0.25rem" }}>
                  <div style={{ display: "flex", gap: "0.75rem", alignItems: "baseline", flexWrap: "wrap" }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--color-forge-accent)", minWidth: "80px" }}>{item.period}</span>
                    <span style={{ fontSize: "0.85rem" }}>{item.event}</span>
                    <span style={{ marginLeft: "auto", fontFamily: "var(--font-mono)", fontSize: "0.65rem",
                      color: item.status === "Active" ? "var(--color-forge-success)" : item.status.includes("Emerging") ? "var(--color-forge-warn)" : "var(--color-forge-muted-fg)" }}>
                      {item.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const thStyle: React.CSSProperties = {
  padding: "0.5rem 0.75rem", textAlign: "left",
  fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--color-forge-muted-fg)",
  border: "1px solid var(--color-forge-border)", whiteSpace: "nowrap",
};
const tdStyle: React.CSSProperties = {
  padding: "0.45rem 0.75rem", border: "1px solid var(--color-forge-border)",
  fontSize: "0.78rem", verticalAlign: "top", lineHeight: 1.5,
};
