import { useMemo, useState } from "react";

type Section = {
  label: string;
  value: string;
  status: "ready" | "working" | "empty";
  note: string;
};

const palette = {
  bg: "#0b111c",
  panel: "#111a28",
  panel2: "#151f2e",
  line: "#26354a",
  text: "#e9edf2",
  muted: "#8b98a9",
  dim: "#526174",
  orange: "#d47835",
  amber: "#e9ad50",
  mint: "#69d0a7",
};

const initialSections: Section[] = [
  { label: "Package name", value: "Contract Redliner v1", status: "ready", note: "A clear working title" },
  { label: "Practitioner", value: "Employment lawyers", status: "ready", note: "Who this GPT serves" },
  { label: "Core task", value: "Redline contracts under time pressure", status: "ready", note: "The job to make easier" },
  { label: "Output format", value: "Marked clauses + plain-English risk memo", status: "working", note: "How the answer should land" },
  { label: "Priority clauses", value: "NDA · Non-compete · IP · Termination", status: "working", note: "The first things to catch" },
  { label: "Knowledge files", value: "", status: "empty", note: "Drop a file or describe a source" },
];

const questions = [
  "What should the output look like?",
  "Which clauses deserve the highest alert?",
  "What should this GPT never do?",
];

function Mark({ size = 24 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size, borderRadius: 6, background: "#1d423b", border: "1px solid #c46a2c88", display: "grid", placeItems: "center", flexShrink: 0 }}>
      <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M4 14.8 7.7 4.5h4.5l3.8 10.3M6.2 11.5h7.5" stroke={palette.amber} strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function Status({ status }: { status: Section["status"] }) {
  const style = status === "ready" ? { color: palette.mint, label: "LOCKED" } : status === "working" ? { color: palette.amber, label: "IN DRAFT" } : { color: palette.dim, label: "OPEN" };
  return <span style={{ color: style.color, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 9, letterSpacing: "0.12em" }}>{style.label}</span>;
}

export function ForgeProtocolSpecFirst() {
  const [sections, setSections] = useState(initialSections);
  const [selected, setSelected] = useState(3);
  const [draft, setDraft] = useState("");
  const [sent, setSent] = useState(false);
  const [preview, setPreview] = useState(false);
  const assembled = useMemo(() => Math.round((sections.filter((s) => s.status === "ready").length / sections.length) * 100), [sections]);

  const updateSelected = () => {
    if (!draft.trim()) return;
    setSections((current) => current.map((section, index) => index === selected ? { ...section, value: draft.trim(), status: "working" } : section));
    setDraft("");
    setSent(true);
    window.setTimeout(() => setSent(false), 1800);
  };

  return (
    <main style={{ width: "100%", minHeight: "100dvh", background: palette.bg, color: palette.text, fontFamily: "'DM Sans', system-ui, sans-serif", overflow: "hidden" }}>
      <style>{`
        @keyframes fpIn { from { opacity: 0; transform: translateY(5px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes fpPulse { 0%,100% { opacity:.45 } 50% { opacity:1 } }
        * { box-sizing: border-box; }
        .fp-card:hover { border-color: #53657c !important; transform: translateY(-1px); }
        .fp-button:hover { filter: brightness(1.12); }
        .fp-scroll::-webkit-scrollbar { width: 5px; } .fp-scroll::-webkit-scrollbar-thumb { background: #2b3b50; border-radius: 5px; }
        @media (max-width: 920px) { .fp-layout { grid-template-columns: 68px 1fr !important; } .fp-chat { display:none !important; } }
        @media (max-width: 620px) { .fp-layout { grid-template-columns: 1fr !important; } .fp-rail { display:none !important; } .fp-header-copy { display:none !important; } }
      `}</style>

      <header style={{ height: 58, borderBottom: `1px solid ${palette.line}`, background: palette.panel, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 22px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
          <Mark size={27} />
          <div className="fp-header-copy">
            <div style={{ fontFamily: "Georgia, serif", fontWeight: 700, fontSize: 15, letterSpacing: ".01em" }}>OKH <span style={{ color: palette.orange }}>Found</span><sup style={{ color: palette.amber, fontSize: 8 }}>·Ry</sup></div>
            <div style={{ color: palette.dim, fontFamily: "ui-monospace, monospace", fontSize: 9, letterSpacing: ".16em", marginTop: 2 }}>FORGE PROTOCOL / SPEC-FIRST</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, color: palette.mint, fontFamily: "ui-monospace, monospace", fontSize: 9, letterSpacing: ".1em" }}><span style={{ width: 6, height: 6, background: palette.mint, borderRadius: "50%", animation: "fpPulse 2s infinite" }} /> AUTOSAVED</div>
          <div style={{ color: palette.amber, background: "#211f1d", border: `1px solid ${palette.line}`, padding: "7px 10px", borderRadius: 5, fontFamily: "ui-monospace, monospace", fontSize: 10 }}>{assembled}% ASSEMBLED</div>
        </div>
      </header>

      <div className="fp-layout" style={{ display: "grid", gridTemplateColumns: "84px minmax(430px, 1fr) minmax(300px, 390px)", height: "calc(100dvh - 58px)" }}>
        <aside className="fp-rail" style={{ background: palette.panel, borderRight: `1px solid ${palette.line}`, padding: "24px 13px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", color: palette.dim, fontFamily: "ui-monospace, monospace", fontSize: 9, letterSpacing: ".2em", marginBottom: 34 }}>BUILD MAP</div>
          {["Intent", "Scope", "Draft", "Review", "Export"].map((label, index) => {
            const active = index < 3;
            return <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 7, position: "relative", marginBottom: 25 }}>
              {index > 0 && <span style={{ position: "absolute", height: 20, width: 1, background: index < 3 ? palette.orange : palette.line, top: -25 }} />}
              <div style={{ width: 29, height: 29, borderRadius: 7, display: "grid", placeItems: "center", background: active ? "#1b4039" : palette.panel2, border: `1px solid ${active ? "#b7663680" : palette.line}`, color: active ? palette.amber : palette.dim, fontFamily: "ui-monospace, monospace", fontSize: 11 }}>{active ? "✓" : index + 1}</div>
              <span style={{ color: active ? palette.muted : palette.dim, fontFamily: "ui-monospace, monospace", fontSize: 8 }}>{label}</span>
            </div>;
          })}
          <div style={{ marginTop: "auto", color: palette.dim, fontFamily: "ui-monospace, monospace", fontSize: 8, writingMode: "vertical-rl", letterSpacing: ".15em" }}>SESSION 09:17</div>
        </aside>

        <section className="fp-scroll" style={{ overflowY: "auto", padding: "31px clamp(22px, 4vw, 62px) 40px", background: `linear-gradient(115deg, ${palette.bg} 0%, #101b2b 100%)` }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 23, animation: "fpIn .4s ease both" }}>
              <div><div style={{ color: palette.orange, fontFamily: "ui-monospace, monospace", fontSize: 10, letterSpacing: ".18em", marginBottom: 8 }}>01 / EMERGING SPECIFICATION</div><h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(25px, 3vw, 37px)", lineHeight: 1.05, margin: 0, fontWeight: 600 }}>Contract Redliner <span style={{ color: palette.orange, fontFamily: "ui-monospace, monospace", fontSize: ".42em", verticalAlign: "middle" }}>v1</span></h1></div>
              <button className="fp-button" onClick={() => setPreview(!preview)} style={{ color: palette.muted, background: "transparent", border: `1px solid ${palette.line}`, borderRadius: 5, padding: "8px 12px", fontFamily: "ui-monospace, monospace", fontSize: 9, letterSpacing: ".1em", cursor: "pointer" }}>{preview ? "CLOSE PREVIEW" : "PREVIEW"}</button>
            </div>
            {preview && <div style={{ background: "#152a29", border: "1px solid #32665b", color: "#b8f0d8", padding: "12px 14px", borderRadius: 6, fontFamily: "ui-monospace, monospace", fontSize: 10, marginBottom: 14 }}>Preview mode · this GPT will annotate clauses as Critical, Review, or Flag.</div>}
            <div style={{ display: "grid", gap: 9 }}>
              {sections.map((section, index) => <button className="fp-card" onClick={() => setSelected(index)} key={section.label} style={{ textAlign: "left", cursor: "pointer", width: "100%", background: selected === index ? "#172638" : palette.panel, border: `1px solid ${selected === index ? palette.orange : palette.line}`, borderRadius: 7, padding: "16px 18px", color: palette.text, transition: "transform .2s, border-color .2s", animation: `fpIn .4s ease ${index * .06}s both`, position: "relative" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 9 }}><span style={{ color: palette.muted, fontFamily: "ui-monospace, monospace", fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase" }}>{String(index + 1).padStart(2, "0")} &nbsp; {section.label}</span><Status status={section.status} /></div>
                <div style={{ color: section.value ? palette.text : palette.dim, fontSize: 14, lineHeight: 1.45, fontStyle: section.value ? "normal" : "italic" }}>{section.value || "Awaiting upload or URL"}</div>
                <div style={{ color: palette.dim, fontSize: 11, marginTop: 8 }}>{section.note}</div>
                {section.status === "working" && <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 2, background: palette.amber, borderRadius: "7px 0 0 7px" }} />}
              </button>)}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 26, color: palette.dim, fontFamily: "ui-monospace, monospace", fontSize: 9, letterSpacing: ".08em" }}><span>SELECT A SECTION TO REFINE IT</span><span>{sections.filter((s) => s.status === "ready").length} / {sections.length} LOCKED</span></div>
          </div>
        </section>

        <aside className="fp-chat" style={{ borderLeft: `1px solid ${palette.line}`, background: palette.panel, display: "flex", flexDirection: "column", minWidth: 0 }}>
          <div style={{ padding: "27px 23px 20px", borderBottom: `1px solid ${palette.line}` }}><div style={{ color: palette.orange, fontFamily: "ui-monospace, monospace", fontSize: 10, letterSpacing: ".17em", marginBottom: 9 }}>02 / FORGE INPUT</div><h2 style={{ margin: 0, fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 500 }}>Refine the spec</h2><p style={{ margin: "8px 0 0", color: palette.muted, lineHeight: 1.5, fontSize: 12 }}>You are editing <strong style={{ color: palette.text }}>{sections[selected].label}</strong>. Add the missing detail; Forge will keep the rest intact.</p></div>
          <div className="fp-scroll" style={{ flex: 1, overflowY: "auto", padding: "20px 23px" }}>
            <div style={{ color: palette.dim, fontFamily: "ui-monospace, monospace", fontSize: 9, letterSpacing: ".1em", marginBottom: 10 }}>SUGGESTED PROMPTS</div>
            <div style={{ display: "grid", gap: 7, marginBottom: 25 }}>{questions.map((question) => <button key={question} className="fp-button" onClick={() => setDraft(question)} style={{ textAlign: "left", background: palette.panel2, border: `1px solid ${palette.line}`, borderRadius: 5, padding: "10px 11px", color: palette.muted, fontSize: 11, cursor: "pointer" }}>{question}<span style={{ float: "right", color: palette.orange }}>↗</span></button>)}</div>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 19 }}><Mark size={24} /><div style={{ background: palette.panel2, border: `1px solid ${palette.line}`, borderRadius: "4px 10px 10px 10px", color: palette.muted, fontSize: 12, lineHeight: 1.55, padding: "10px 12px" }}>Tell me what good looks like here. I’ll turn the intent into a precise instruction.</div></div>
            {sent && <div style={{ color: palette.mint, fontFamily: "ui-monospace, monospace", fontSize: 9, marginBottom: 10 }}>✓ SPEC SECTION UPDATED</div>}
          </div>
          <div style={{ padding: "15px 18px 19px", borderTop: `1px solid ${palette.line}` }}>
            <div style={{ background: palette.panel2, border: `1px solid ${palette.line}`, borderRadius: 6, padding: 10 }}>
              <textarea value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Describe the detail Forge should capture…" rows={3} style={{ width: "100%", resize: "none", border: 0, outline: 0, background: "transparent", color: palette.text, font: "12px/1.5 'DM Sans', system-ui", padding: 0 }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}><span style={{ color: palette.dim, fontFamily: "ui-monospace, monospace", fontSize: 9 }}>⌘ ↵ to apply</span><button className="fp-button" onClick={updateSelected} style={{ background: palette.orange, color: "#fff5ed", border: 0, borderRadius: 4, padding: "8px 12px", fontFamily: "ui-monospace, monospace", fontSize: 9, letterSpacing: ".08em", cursor: "pointer" }}>APPLY DETAIL →</button></div>
            </div>
            <button className="fp-button" onClick={() => alert("Package export is ready for review.")} style={{ width: "100%", marginTop: 11, background: "#1b302e", color: palette.mint, border: "1px solid #35665c", borderRadius: 5, padding: 10, fontFamily: "ui-monospace, monospace", fontSize: 9, letterSpacing: ".1em", cursor: "pointer" }}>EXPORT PACKAGE</button>
          </div>
        </aside>
      </div>
    </main>
  );
}