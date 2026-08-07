import { useState, useEffect } from "react";

const STORAGE_KEY = "cgpt-step-3";

interface KnowledgeEntry { id: string; filename: string; topic: string; type: string; notes: string; }
interface KnowledgeData { files: KnowledgeEntry[]; manifest: string; retrievalNotes: string; }

const DEFAULT: KnowledgeData = { files: [], manifest: "", retrievalNotes: "" };
const FILE_TYPES = ["Policy", "Reference", "Examples", "Playbook", "Glossary", "Price Sheet", "Template", "Index/Manifest", "Other"];

function load(): KnowledgeData {
  try { return { ...DEFAULT, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") }; }
  catch { return DEFAULT; }
}

interface Props { onNext: () => void; onPrev: () => void; page: number; }

export default function KnowledgeFiles({ onNext, onPrev }: Props) {
  const [data, setData] = useState<KnowledgeData>(load);
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }, [data]);

  const addFile = () => {
    const entry: KnowledgeEntry = { id: Date.now().toString(), filename: "", topic: "", type: "Reference", notes: "" };
    setData(prev => ({ ...prev, files: [...prev.files, entry] }));
  };
  const removeFile = (id: string) => setData(prev => ({ ...prev, files: prev.files.filter(f => f.id !== id) }));
  const updateFile = (id: string, k: keyof KnowledgeEntry, v: string) =>
    setData(prev => ({ ...prev, files: prev.files.map(f => f.id === id ? { ...f, [k]: v } : f) }));

  return (
    <div style={{ maxWidth: 820 }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", color: "var(--color-forge-accent)", margin: 0 }}>
          Step 3 · Knowledge Files
        </h1>
        <p style={{ color: "var(--color-forge-muted-fg)", marginTop: "0.35rem", fontSize: "0.9rem" }}>
          Mid-2026 limits: up to 20 files per GPT, each up to 512 MB. Retrieval is RAG-based (semantic chunking) — not deterministic.
        </p>
      </div>

      {/* Constraints banner */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem", marginBottom: "1.5rem" }}>
        {[
          { label: "Max files", value: "20", note: "per GPT" },
          { label: "Max size", value: "512 MB", note: "per file" },
          { label: "Retrieval", value: "RAG", note: "semantic chunks" },
        ].map(c => (
          <div key={c.label} className="forge-panel" style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", color: "var(--color-forge-accent)" }}>{c.value}</div>
            <div style={{ fontSize: "0.78rem", color: "var(--color-forge-muted-fg)" }}>{c.label} · {c.note}</div>
          </div>
        ))}
      </div>

      {/* Rules callout */}
      <div className="callout" style={{ marginBottom: "1.5rem" }}>
        <strong>Knowledge file rules:</strong>
        <ul style={{ margin: "0.5rem 0 0", paddingLeft: "1.25rem", fontSize: "0.82rem", lineHeight: 1.8 }}>
          <li>Name files descriptively — <code>acme-brand-voice-v3.pdf</code> not <code>Document1.pdf</code></li>
          <li>Use clear section headings (retrieval chunks by structure)</li>
          <li>Prefer multiple focused files over one monolithic dump</li>
          <li>Front-load critical content in the first 20% of each file</li>
          <li>Include a manifest/index file mapping filenames to topics</li>
          <li><strong>Never bury behavioral rules in knowledge files</strong> — those belong in Instructions</li>
          <li>File content can appear in outputs — data leakage risk for proprietary content</li>
        </ul>
      </div>

      {/* File list */}
      <div style={{ marginBottom: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--color-forge-muted-fg)" }}>
            Knowledge manifest — {data.files.length} / 20 files
          </span>
          <button onClick={addFile} style={primaryBtn}>+ Add File</button>
        </div>

        {data.files.length === 0 && (
          <div style={{ padding: "2rem", textAlign: "center", color: "var(--color-forge-muted-fg)", border: "1px dashed var(--color-forge-border)", borderRadius: "var(--radius-md)", fontSize: "0.88rem" }}>
            No knowledge files planned yet. Click "Add File" to start building your manifest.
          </div>
        )}

        {data.files.map((file, idx) => (
          <div key={file.id} style={{ marginBottom: "0.75rem", padding: "1rem", background: "var(--color-forge-panel)", border: "1px solid var(--color-forge-border)", borderRadius: "var(--radius-md)" }}>
            <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--color-forge-muted-fg)", marginTop: "0.35rem", minWidth: "1.5rem" }}>#{idx + 1}</span>
              <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: "0.5rem" }}>
                <input value={file.filename} onChange={e => updateFile(file.id, "filename", e.target.value)}
                  autoComplete="off" placeholder="filename-descriptive-v1.pdf" style={{ fontSize: "0.85rem" }} />
                <input value={file.topic} onChange={e => updateFile(file.id, "topic", e.target.value)}
                  autoComplete="off" placeholder="Topic / when the GPT should consult this" style={{ fontSize: "0.85rem" }} />
                <select value={file.type} onChange={e => updateFile(file.id, "type", e.target.value)}
                  style={{ minWidth: "110px", fontSize: "0.82rem" }}>
                  {FILE_TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <button onClick={() => removeFile(file.id)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-forge-danger)", fontSize: "1rem", padding: "0.2rem", marginTop: "0.15rem" }}>✕</button>
            </div>
            <div style={{ marginTop: "0.5rem", paddingLeft: "2.25rem" }}>
              <input value={file.notes} onChange={e => updateFile(file.id, "notes", e.target.value)}
                autoComplete="off" placeholder="Notes for instruction routing (e.g. 'When user asks about pricing, consult this file first')"
                style={{ fontSize: "0.8rem" }} />
            </div>
          </div>
        ))}
      </div>

      {/* Auto-generate manifest preview */}
      {data.files.length > 0 && (
        <div style={{ marginBottom: "1.5rem" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--color-forge-muted-fg)", marginBottom: "0.4rem" }}>
            Instruction routing snippet (add to Layer 5: Knowledge Policy)
          </div>
          <pre style={{ background: "var(--color-forge-espresso)", border: "1px solid var(--color-forge-border)", borderRadius: "var(--radius-md)", padding: "0.75rem", fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "var(--color-forge-fg)", whiteSpace: "pre-wrap" }}>
{`## Knowledge Policy
Available files:
${data.files.map(f => `- \`${f.filename || "unnamed"}\` — ${f.topic || "(no topic)"}`).join("\n")}

Routing rules:
${data.files.filter(f => f.notes).map(f => `- ${f.notes}`).join("\n") || "- Consult relevant files based on the user's query."}
If the answer is not in the knowledge files, say so explicitly.`}
          </pre>
        </div>
      )}

      <div>
        <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--color-forge-accent)", marginBottom: "0.35rem" }}>
          Retrieval testing notes
        </label>
        <textarea value={data.retrievalNotes} onChange={e => setData(prev => ({ ...prev, retrievalNotes: e.target.value }))} autoComplete="off" rows={3}
          placeholder="After uploading, ask questions that require info from specific files. If the GPT ignores them, add explicit routing instructions. Note any retrieval failures here." />
      </div>

      <NavButtons onNext={onNext} onPrev={onPrev} showPrev nextLabel="Step 4: Capabilities →" />
    </div>
  );
}

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
