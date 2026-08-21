import { useState, useEffect, useCallback } from "react";
import { ACTION_AUTH_OPTIONS, ACTION_FAILURES, ACTIONS_LIMITS, OPENAPI_TEMPLATE } from "../data/knowledge";

const STORAGE_KEY = "cgpt-step-5";

interface ActionsData {
  choice: "none" | "actions" | "apps";
  authType: string;
  privacyPolicyUrl: string;
  openApiSchema: string;
  appsNotes: string;
  errorHandling: string;
}

const DEFAULT: ActionsData = {
  choice: "none", authType: "none", privacyPolicyUrl: "",
  openApiSchema: "", appsNotes: "", errorHandling: "",
};

function load(): ActionsData {
  try { return { ...DEFAULT, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") }; }
  catch { return DEFAULT; }
}

interface Props { onNext: () => void; onPrev: () => void; page: number; onComplete: (complete: boolean) => void; }

export default function ActionsApps({ onNext, onPrev, onComplete }: Props) {
  const [data, setData] = useState<ActionsData>(load);
  const [copied, setCopied] = useState(false);
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }, [data]);

  // Step is complete once the user deliberately picks a choice (not the default "none").
  const isComplete = data.choice !== "none" || data.openApiSchema.trim().length > 0 || data.appsNotes.trim().length > 0;
  useEffect(() => { onComplete(isComplete); }, [isComplete, onComplete]);
  const set = (k: keyof ActionsData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setData(prev => ({ ...prev, [k]: e.target.value }));

  const loadTemplate = () => setData(prev => ({ ...prev, openApiSchema: OPENAPI_TEMPLATE }));
  const copySchema = useCallback(async () => {
    await navigator.clipboard.writeText(data.openApiSchema);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  }, [data.openApiSchema]);

  return (
    <div style={{ maxWidth: 820, margin: "0 auto" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", color: "var(--color-forge-accent)", margin: 0 }}>
          Step 5 · Actions / Apps
        </h1>
        <p style={{ color: "var(--color-forge-muted-fg)", marginTop: "0.35rem", fontSize: "0.9rem" }}>
          Critical constraint: a single Custom GPT can use either Actions OR Apps — not both simultaneously.
        </p>
      </div>

      {/* Mutual exclusion warning */}
      <div style={{ marginBottom: "1.5rem", padding: "1rem 1.25rem", background: "rgba(196,106,44,0.1)", border: "1px solid var(--color-forge-accent)", borderRadius: "var(--radius-md)", fontSize: "0.85rem" }}>
        <strong>⚠️ Actions vs Apps — mutually exclusive:</strong>
        <ul style={{ margin: "0.5rem 0 0", paddingLeft: "1.25rem", lineHeight: 1.8 }}>
          <li><strong>Actions</strong> = OpenAPI 3.0/3.1 schema API calls you define. You control the endpoints, auth, and schema. Not available in Pro mode. Max: 300 chars/endpoint description, 700 chars/param description.</li>
          <li><strong>Apps</strong> = MCP-based connectors (renamed from "Connectors" Dec 2025). Pre-built integrations. Write actions require Business/Enterprise/Edu license.</li>
          <li>Pick one. Do not design both into the same GPT.</li>
        </ul>
      </div>

      {/* Choice selector */}
      <div className="forge-cols-3" style={{ gap: "0.75rem", marginBottom: "1.5rem" }}>
        {[
          { value: "none", label: "No Integration", icon: "🚫", desc: "Instructions and knowledge only" },
          { value: "actions", label: "Actions (OpenAPI)", icon: "⚡", desc: "Your own API via OpenAPI schema" },
          { value: "apps", label: "Apps (MCP)", icon: "🔌", desc: "Pre-built platform integrations" },
        ].map(opt => (
          <button key={opt.value} onClick={() => setData(prev => ({ ...prev, choice: opt.value as ActionsData["choice"] }))}
            style={{
              padding: "1rem", borderRadius: "var(--radius-md)", cursor: "pointer", textAlign: "left",
              background: data.choice === opt.value ? "rgba(196,106,44,0.15)" : "var(--color-forge-panel)",
              border: `2px solid ${data.choice === opt.value ? "var(--color-forge-accent)" : "var(--color-forge-border)"}`,
              color: "var(--color-forge-fg)", fontFamily: "var(--font-body)",
              transition: "all 150ms",
            }}>
            <div style={{ fontSize: "1.5rem", marginBottom: "0.35rem" }}>{opt.icon}</div>
            <div style={{ fontWeight: 600, fontSize: "0.88rem", marginBottom: "0.25rem" }}>{opt.label}</div>
            <div style={{ fontSize: "0.78rem", color: "var(--color-forge-muted-fg)" }}>{opt.desc}</div>
          </button>
        ))}
      </div>

      {/* Actions config */}
      {data.choice === "actions" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div className="callout">
            <strong>Actions production constraints:</strong> TLS 1.2+ · Port 443 only · 45-second timeout (design for ≤30s) · Payloads &lt;100,000 chars · Add <code>x-openai-isConsequential: true</code> to all mutating endpoints.
          </div>

          <div>
            <label style={labelStyle}>Authentication Type</label>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {ACTION_AUTH_OPTIONS.map(auth => (
                <label key={auth.value} style={{ display: "flex", gap: "0.75rem", padding: "0.75rem", background: data.authType === auth.value ? "rgba(196,106,44,0.1)" : "var(--color-forge-panel)", border: `1px solid ${data.authType === auth.value ? "var(--color-forge-accent)" : "var(--color-forge-border)"}`, borderRadius: "var(--radius-md)", cursor: "pointer" }}>
                  <input type="radio" name="authType" value={auth.value} checked={data.authType === auth.value}
                    onChange={() => setData(prev => ({ ...prev, authType: auth.value }))}
                    style={{ marginTop: "0.15rem", accentColor: "var(--color-forge-accent)", width: "auto" }} />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "0.88rem", color: data.authType === auth.value ? "var(--color-forge-fg)" : "var(--color-forge-muted-fg)" }}>{auth.label}</div>
                    <div style={{ fontSize: "0.78rem", color: "var(--color-forge-muted-fg)", marginTop: "0.15rem" }}>{auth.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label style={labelStyle}>Privacy Policy URL <span style={{ color: "var(--color-forge-danger)" }}>*</span></label>
            <div style={{ fontSize: "0.78rem", color: "var(--color-forge-muted-fg)", marginBottom: "0.35rem" }}>
              Required for any published GPT that uses Actions. Missing this blocks GPT Store submission.
            </div>
            <input value={data.privacyPolicyUrl} onChange={set("privacyPolicyUrl")}
              autoComplete="url" placeholder="https://yoursite.com/privacy-policy" />
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem" }}>
              <label style={labelStyle}>OpenAPI Schema (YAML or JSON)</label>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button onClick={loadTemplate} style={{ ...secondaryBtn, fontSize: "0.78rem", padding: "0.25rem 0.6rem" }}>Load Template</button>
                {data.openApiSchema && <button onClick={copySchema} style={{ ...secondaryBtn, fontSize: "0.78rem", padding: "0.25rem 0.6rem" }}>{copied ? "✓ Copied" : "Copy"}</button>}
              </div>
            </div>
            <div style={{ fontSize: "0.78rem", color: "var(--color-forge-muted-fg)", marginBottom: "0.4rem" }}>
              Write descriptions for the model, not humans. Max: {ACTIONS_LIMITS.endpointDescriptionMaxChars} chars/endpoint, {ACTIONS_LIMITS.parameterDescriptionMaxChars} chars/param.
            </div>
            <textarea value={data.openApiSchema} onChange={set("openApiSchema")} rows={14}
              autoComplete="off"
              style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", resize: "vertical" }}
              placeholder="Paste or type your OpenAPI 3.0/3.1 schema here, or click 'Load Template' for a working example." />
          </div>

          <div>
            <label style={labelStyle}>Error handling instructions (for Layer 4: Tool Policy)</label>
            <textarea value={data.errorHandling} onChange={set("errorHandling")} autoComplete="off" rows={3}
              placeholder="If the API returns an error or times out, tell the user the service is temporarily unavailable. Do not fabricate data. Suggest they try again in a few minutes." />
          </div>

          {/* Failure table */}
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--color-forge-muted-fg)", marginBottom: "0.5rem" }}>Common Action failures and fixes</div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.78rem" }}>
                <thead>
                  <tr style={{ background: "var(--color-forge-panel)" }}>
                    {["Failure", "Likely Cause", "Fix"].map(h => (
                      <th key={h} style={{ padding: "0.5rem 0.75rem", textAlign: "left", fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--color-forge-muted-fg)", border: "1px solid var(--color-forge-border)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ACTION_FAILURES.map((row, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? "transparent" : "var(--color-forge-surface)" }}>
                      <td style={{ padding: "0.4rem 0.75rem", border: "1px solid var(--color-forge-border)", color: "var(--color-forge-danger)", fontSize: "0.78rem" }}>{row.failure}</td>
                      <td style={{ padding: "0.4rem 0.75rem", border: "1px solid var(--color-forge-border)", color: "var(--color-forge-muted-fg)" }}>{row.cause}</td>
                      <td style={{ padding: "0.4rem 0.75rem", border: "1px solid var(--color-forge-border)" }}>{row.fix}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Apps config */}
      {data.choice === "apps" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div className="callout">
            Apps (formerly Connectors, renamed Dec 17 2025) are MCP-based integrations. Users connect their own accounts — you don't manage credentials. Write actions require Business/Enterprise/Edu for full capability. Workspace admins can restrict app availability.
          </div>
          <div>
            <label style={labelStyle}>Notes on apps/connectors needed</label>
            <textarea value={data.appsNotes} onChange={set("appsNotes")} autoComplete="off" rows={5}
              placeholder={"Which pre-built integrations are needed?\ne.g.\n- Salesforce (for live account data)\n- Jira (for ticket lookup)\n- Google Workspace (for Docs and Drive)\n\nNote any governance requirements from your org's workspace admin."} />
          </div>
        </div>
      )}

      <NavButtons onNext={onNext} onPrev={onPrev} showPrev nextLabel="Step 6: Conversation Starters →" />
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block", fontFamily: "var(--font-mono)", fontSize: "0.8rem",
  color: "var(--color-forge-accent)", marginBottom: "0.25rem",
};

function NavButtons({ onNext, onPrev, nextLabel = "Next →", showPrev = false }:
  { onNext: () => void; onPrev?: () => void; nextLabel?: string; showPrev?: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "2rem", paddingTop: "1rem", borderTop: "1px solid var(--color-forge-border)" }}>
      {showPrev && onPrev && <button onClick={onPrev} style={secondaryBtn}>← Back</button>}
      <button onClick={onNext} style={primaryBtn}>{nextLabel}</button>
    </div>
  );
}

const primaryBtn: React.CSSProperties = {
  background: "var(--color-forge-accent)", color: "var(--color-forge-paper)",
  border: "none", borderRadius: "var(--radius-md)", padding: "0.6rem 1.25rem",
  fontFamily: "var(--font-body)", fontSize: "0.9rem", cursor: "pointer", fontWeight: 600,
};
const secondaryBtn: React.CSSProperties = {
  background: "var(--color-forge-panel)", color: "var(--color-forge-fg)",
  border: "1px solid var(--color-forge-border)", borderRadius: "var(--radius-md)", padding: "0.6rem 1.25rem",
  fontFamily: "var(--font-body)", fontSize: "0.9rem", cursor: "pointer",
};
