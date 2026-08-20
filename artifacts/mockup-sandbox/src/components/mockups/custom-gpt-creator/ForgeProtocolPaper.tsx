import { useState } from "react";

const ink = "#27221f";
const paper = "#f4efe7";
const paperDeep = "#e9e0d4";
const line = "#d7cabb";
const rust = "#a84e32";
const sage = "#48645a";
const muted = "#81766d";

const seedMessages = [
  { role: "forge", text: "Tell me about the practitioner this GPT serves. What gets missed when the work is rushed?", time: "09:14" },
  { role: "user", text: "Employment lawyers who need to redline contracts fast. Dense documents hide risky clauses under pressure.", time: "09:15" },
  { role: "forge", text: "I hear a precision tool: marked clauses, a risk level, and plain-English reasoning. No legalese.", time: "09:15", tag: "DOMAIN → EMPLOYMENT LAW" },
  { role: "user", text: "Exactly. NDAs and non-competes are the highest-risk clauses for our clients.", time: "09:16" },
  { role: "forge", text: "Priority set. I’m shaping the first pass around NDA, non-compete, IP assignment, and termination.", time: "09:17", tag: "SCOPE → 4 PRIORITY CLAUSES" },
];

const initialSections = [
  ["Package name", "Contract Redliner v1", "done", 100],
  ["Practitioner", "Employment lawyers · contract review", "done", 100],
  ["Core instructions", "Scan, classify, explain — without hedging.", "building", 72],
  ["Conversation starters", "2 of 4 generated", "building", 50],
  ["Capabilities", "Code interpreter · No browsing", "done", 100],
  ["Knowledge files", "Awaiting upload or URL", "pending", 0],
] as const;

function Mark({ status }: { status: string }) {
  return (
    <span style={{ color: status === "done" ? sage : status === "building" ? rust : muted, fontSize: 16 }}>
      {status === "done" ? "✓" : status === "building" ? "·" : "○"}
    </span>
  );
}

export function ForgeProtocolPaper() {
  const [messages, setMessages] = useState(seedMessages);
  const [draft, setDraft] = useState("");
  const [preview, setPreview] = useState(false);
  const progress = 71;

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    setMessages((current) => [...current, { role: "user", text, time: "09:18" }]);
    setDraft("");
  };

  return (
    <main
      style={{
        width: "100%", height: "100vh", minHeight: 640, overflow: "hidden", color: ink,
        background: paper, fontFamily: "'DM Sans', 'Trebuchet MS', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Fraunces:opsz,wght@9..144,600&family=Space+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; }
        button { font: inherit; }
        .fpp-scroll::-webkit-scrollbar { width: 5px; }
        .fpp-scroll::-webkit-scrollbar-thumb { background: #cbbbaa; border-radius: 10px; }
        @keyframes fpp-in { from { opacity: 0; transform: translateY(5px) } to { opacity: 1; transform: translateY(0) } }
        .fpp-message { animation: fpp-in .4s ease both; }
        .fpp-action:hover { background: #ded2c4 !important; }
      `}</style>
      <header style={{ height: 62, borderBottom: `1px solid ${line}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 26px", background: "#f8f4ed" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
          <div style={{ width: 29, height: 29, background: rust, color: paper, display: "grid", placeItems: "center", borderRadius: "50%", fontFamily: "'Fraunces', serif", fontSize: 18 }}>F</div>
          <div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 17, lineHeight: 1 }}>Found·Ry</div>
            <div style={{ marginTop: 5, color: muted, fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: ".14em" }}>CUSTOM GPT STUDIO</div>
          </div>
          <span style={{ color: line, fontSize: 22, marginLeft: 5 }}>/</span>
          <span style={{ color: muted, fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: ".12em" }}>FORGE SESSION 026</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <span style={{ color: sage, fontFamily: "'Space Mono', monospace", fontSize: 10 }}>● SAVED</span>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: muted }}>{progress}% ASSEMBLED</span>
        </div>
      </header>
      <div style={{ height: 3, background: `linear-gradient(90deg, ${rust} 0 71%, ${line} 71%)` }} />

      <div style={{ display: "flex", height: "calc(100% - 65px)" }}>
        <section style={{ width: "39%", minWidth: 370, borderRight: `1px solid ${line}`, display: "flex", flexDirection: "column", background: "#f1ebe2" }}>
          <div style={{ padding: "21px 25px 17px", borderBottom: `1px solid ${line}` }}>
            <div style={{ color: rust, fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: ".17em" }}>01 — THE DIALOGUE</div>
            <div style={{ marginTop: 7, color: muted, fontSize: 12 }}>Start with the work. The shape of the GPT follows.</div>
          </div>
          <div className="fpp-scroll" style={{ flex: 1, overflowY: "auto", padding: "22px 25px", display: "flex", flexDirection: "column", gap: 19 }}>
            {messages.map((message, index) => (
              <div className="fpp-message" key={`${message.time}-${index}`} style={{ alignSelf: message.role === "user" ? "flex-end" : "flex-start", maxWidth: "89%", animationDelay: `${index * 60}ms` }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6, justifyContent: message.role === "user" ? "flex-end" : "flex-start" }}>
                  <span style={{ color: message.role === "user" ? sage : rust, fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: ".12em" }}>{message.role === "user" ? "YOU" : "FORGE"}</span>
                  <span style={{ color: muted, fontFamily: "'Space Mono', monospace", fontSize: 9 }}>{message.time}</span>
                </div>
                <div style={{ border: `1px solid ${message.role === "user" ? "#b9c7bb" : line}`, background: message.role === "user" ? "#e1ebe1" : "#f8f4ed", padding: "11px 13px", borderRadius: message.role === "user" ? "12px 3px 12px 12px" : "3px 12px 12px 12px", fontSize: 13, lineHeight: 1.55 }}>{message.text}</div>
                {message.tag && <div style={{ color: rust, marginTop: 7, fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: ".08em" }}>↳ {message.tag}</div>}
              </div>
            ))}
          </div>
          <div style={{ padding: "15px 20px 19px", borderTop: `1px solid ${line}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, border: `1px solid #c9b9a8`, background: "#faf6ef", padding: "5px 6px 5px 13px", borderRadius: 5 }}>
              <input value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => event.key === "Enter" && send()} placeholder="What else should this GPT know?" style={{ minWidth: 0, flex: 1, outline: "none", border: 0, background: "transparent", color: ink, fontSize: 12 }} />
              <button onClick={send} aria-label="Send message" style={{ border: 0, cursor: "pointer", background: rust, color: paper, width: 31, height: 31, borderRadius: 4, fontSize: 17 }}>↗</button>
            </div>
            <div style={{ textAlign: "center", color: muted, fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: ".1em", marginTop: 9 }}>PRESS ENTER TO CONTINUE THE FORGE</div>
          </div>
        </section>

        <section style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", background: paper }}>
          <div style={{ padding: "21px 29px 17px", borderBottom: `1px solid ${line}`, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div><div style={{ color: rust, fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: ".17em" }}>02 — THE EMERGING SPEC</div><h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 28, fontWeight: 600, margin: "8px 0 0", letterSpacing: "-.03em" }}>Contract Redliner <sup style={{ color: rust, fontFamily: "'Space Mono', monospace", fontSize: 10 }}>v1</sup></h1></div>
            <div style={{ display: "flex", gap: 8 }}><button className="fpp-action" onClick={() => setPreview((value) => !value)} style={{ border: `1px solid ${line}`, background: "transparent", color: ink, padding: "8px 11px", borderRadius: 4, cursor: "pointer", fontFamily: "'Space Mono', monospace", fontSize: 9 }}>{preview ? "CLOSE PREVIEW" : "PREVIEW"}</button><button onClick={() => alert("Package queued for export")} style={{ border: 0, background: rust, color: paper, padding: "8px 11px", borderRadius: 4, cursor: "pointer", fontFamily: "'Space Mono', monospace", fontSize: 9 }}>EXPORT PACKAGE</button></div>
          </div>
          <div style={{ padding: "13px 29px", borderBottom: `1px solid ${line}`, display: "flex", alignItems: "center", gap: 13 }}><div style={{ height: 5, flex: 1, background: paperDeep, borderRadius: 5 }}><div style={{ height: "100%", width: `${progress}%`, background: rust, borderRadius: 5 }} /></div><span style={{ color: rust, fontFamily: "'Space Mono', monospace", fontSize: 10 }}>71%</span></div>
          {preview ? <div style={{ margin: 29, border: `1px solid ${line}`, background: "#faf6ef", padding: 25, fontFamily: "'Space Mono', monospace", fontSize: 11, lineHeight: 1.8 }}><div style={{ color: rust, marginBottom: 12 }}>PREVIEW / CONTRACT REDLINER</div><div style={{ fontFamily: "'Fraunces', serif", fontSize: 24 }}>Plain English. Sharp eyes.</div><p style={{ color: muted, fontFamily: "'DM Sans', sans-serif", fontSize: 13 }}>Upload an employment contract to identify high-risk clauses and understand what deserves a second look.</p></div> :
          <div className="fpp-scroll" style={{ flex: 1, overflowY: "auto", padding: "21px 29px", display: "flex", flexDirection: "column", gap: 10 }}>
            {initialSections.map(([label, value, status, pct]) => <div key={label} style={{ position: "relative", border: `1px solid ${status === "building" ? "#d9bda5" : line}`, background: "#f8f4ed", padding: "15px 17px 13px", borderRadius: 5, overflow: "hidden" }}>
              {status === "building" && <div style={{ position: "absolute", top: 0, left: 0, height: 2, width: `${pct}%`, background: rust }} />}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ color: muted, fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: ".12em", textTransform: "uppercase" }}>{label}</span><Mark status={status} /></div>
              <div style={{ marginTop: 8, color: status === "pending" ? "#a89c91" : ink, fontSize: 13, fontStyle: status === "pending" ? "italic" : "normal" }}>{value}</div>
              {status === "building" && <div style={{ height: 3, marginTop: 11, background: paperDeep }}><div style={{ height: "100%", width: `${pct}%`, background: rust }} /></div>}
            </div>)}
          </div>}
          <div style={{ borderTop: `1px solid ${line}`, padding: "15px 29px 17px", background: "#eee6dc" }}><div style={{ color: muted, fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: ".16em", marginBottom: 9 }}>EXTRACTION TRACE</div><div style={{ display: "flex", gap: 22, flexWrap: "wrap", color: ink, fontFamily: "'Space Mono', monospace", fontSize: 9 }}><span><b style={{ color: rust }}>T2</b> DOMAIN · EMPLOYMENT LAW</span><span><b style={{ color: rust }}>T4</b> OUTPUT · 3-TIER RISK</span></div></div>
        </section>
        <aside style={{ width: 74, borderLeft: `1px solid ${line}`, background: "#eee6dc", display: "flex", flexDirection: "column", alignItems: "center", padding: "22px 0", gap: 19 }}>
          <div style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", color: muted, fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: ".15em", marginBottom: "auto" }}>PHASES</div>
          {["Intent", "Scope", "Draft", "Review", "Export"].map((phase, index) => <div key={phase} style={{ textAlign: "center" }}><div style={{ width: 27, height: 27, borderRadius: "50%", border: `1px solid ${index < 3 ? rust : line}`, background: index < 3 ? "#f8f4ed" : "transparent", color: index < 3 ? rust : muted, display: "grid", placeItems: "center", fontFamily: "'Space Mono', monospace", fontSize: 10 }}>{index < 3 ? "✓" : index + 1}</div><div style={{ marginTop: 6, color: index < 3 ? ink : muted, fontFamily: "'Space Mono', monospace", fontSize: 8 }}>{phase}</div></div>)}
          <div style={{ marginTop: "auto", color: rust, fontFamily: "'Fraunces', serif", fontSize: 18 }}>↘</div>
        </aside>
      </div>
    </main>
  );
}