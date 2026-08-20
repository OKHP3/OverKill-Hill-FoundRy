import { useMemo, useState } from "react";

type Step = "intent" | "behavior" | "guardrails" | "test";

const steps: { id: Step; number: string; label: string; kicker: string }[] = [
  { id: "intent", number: "01", label: "North star", kicker: "PURPOSE" },
  { id: "behavior", number: "02", label: "Behavior map", kicker: "VOICE + FLOW" },
  { id: "guardrails", number: "03", label: "Guardrails", kicker: "BOUNDARIES" },
  { id: "test", number: "04", label: "Test flight", kicker: "EVIDENCE" },
];

const cards = [
  { title: "Job to be done", text: "Turn dense employment contracts into a short list of clauses worth a second look.", tone: "terracotta", tag: "CORE INTENT" },
  { title: "Primary user", text: "An employment lawyer moving quickly between intake, redline, and client call.", tone: "ochre", tag: "AUDIENCE" },
  { title: "Proof of value", text: "Every flag includes the clause, a risk tier, and one plain-English reason.", tone: "sage", tag: "OUTPUT" },
];

export function ForgeProtocolOrbit() {
  const [active, setActive] = useState<Step>("intent");
  const [checked, setChecked] = useState<string[]>(["user", "output"]);
  const [query, setQuery] = useState("");
  const [published, setPublished] = useState(false);

  const activeStep = steps.find((step) => step.id === active) ?? steps[0];
  const visibleCards = useMemo(
    () => (query.trim() ? cards.filter((card) => `${card.title} ${card.text}`.toLowerCase().includes(query.toLowerCase())) : cards),
    [query],
  );
  const toggleCheck = (id: string) => setChecked((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);

  return (
    <main className="fpo-shell">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Space+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; } button, input { font: inherit; }
        .fpo-shell { --ink:#24221e; --muted:#82776c; --paper:#f5f0e8; --panel:#eee6da; --line:#d6c8b7; --red:#a94f34; --gold:#c88a42; --green:#4d6759; width:100%; min-height:100vh; color:var(--ink); background:var(--paper); font-family:'DM Sans',sans-serif; overflow:hidden; }
        .fpo-mono { font-family:'Space Mono',monospace; letter-spacing:.13em; font-size:10px; }
        .fpo-top { height:70px; display:flex; align-items:center; justify-content:space-between; padding:0 30px; border-bottom:1px solid var(--line); background:#f9f5ee; }
        .fpo-brand { display:flex; gap:12px; align-items:center; } .fpo-mark { width:31px; height:31px; border-radius:8px 8px 8px 2px; background:var(--red); color:var(--paper); display:grid; place-items:center; font:700 18px Fraunces,serif; transform:rotate(-4deg); }
        .fpo-brand strong { display:block; font:600 18px Fraunces,serif; } .fpo-brand small { display:block; margin-top:4px; color:var(--muted); }
        .fpo-status { display:flex; gap:18px; align-items:center; color:var(--muted); } .fpo-status b { color:var(--green); font-weight:400; }
        .fpo-layout { display:grid; grid-template-columns:235px minmax(360px,1fr) 290px; min-height:calc(100vh - 70px); }
        .fpo-nav { padding:28px 18px; background:var(--panel); border-right:1px solid var(--line); } .fpo-nav h2 { margin:0 10px 26px; font:600 24px Fraunces,serif; line-height:1.05; }
        .fpo-nav p { color:var(--muted); margin:0 10px 28px; font-size:12px; line-height:1.55; }
        .fpo-step { width:100%; display:flex; align-items:center; gap:12px; border:0; border-left:2px solid transparent; padding:13px 10px; background:transparent; color:var(--muted); text-align:left; cursor:pointer; }
        .fpo-step:hover { background:#e5dbcd; } .fpo-step.active { border-left-color:var(--red); color:var(--ink); background:#f7f1e8; } .fpo-step span { font:10px 'Space Mono',monospace; color:var(--red); } .fpo-step em { display:block; font-style:normal; font-weight:600; font-size:12px; } .fpo-step small { display:block; margin-top:3px; font-size:9px; color:var(--muted); }
        .fpo-nav-foot { margin:56px 10px 0; border-top:1px solid var(--line); padding-top:17px; color:var(--muted); line-height:1.55; font-size:11px; }
        .fpo-work { padding:31px 36px 30px; min-width:0; } .fpo-heading { display:flex; justify-content:space-between; align-items:flex-start; gap:20px; } .fpo-heading .fpo-mono { color:var(--red); } h1 { margin:8px 0 0; font:700 clamp(29px,4vw,43px)/.98 Fraunces,serif; letter-spacing:-.045em; } .fpo-heading p { max-width:235px; color:var(--muted); font-size:11px; line-height:1.55; margin:3px 0 0; }
        .fpo-search { margin:27px 0 18px; display:flex; align-items:center; border-bottom:1px solid var(--line); padding:0 0 11px; gap:10px; } .fpo-search span { color:var(--red); font:14px 'Space Mono',monospace; } .fpo-search input { border:0; outline:0; background:transparent; color:var(--ink); width:100%; font-size:12px; }
        .fpo-cards { display:grid; grid-template-columns:1.2fr 1fr; gap:12px; } .fpo-card { min-height:152px; border:1px solid var(--line); border-radius:4px; padding:18px; background:#faf6ef; position:relative; } .fpo-card:first-child { grid-row:span 2; min-height:316px; display:flex; flex-direction:column; justify-content:flex-end; background:#f4e4d8; border-color:#d5a58e; } .fpo-card:nth-child(2) { background:#f3ead4; } .fpo-card:nth-child(3) { background:#e2ebe2; }
        .fpo-card .fpo-mono { color:var(--muted); font-size:9px; } .fpo-card h3 { font:600 22px Fraunces,serif; margin:11px 0 8px; } .fpo-card p { margin:0; font-size:12px; line-height:1.55; max-width:290px; } .fpo-card i { position:absolute; right:15px; top:16px; width:7px; height:7px; border-radius:50%; background:var(--red); } .fpo-card:nth-child(2) i { background:var(--gold); } .fpo-card:nth-child(3) i { background:var(--green); }
        .fpo-add { margin-top:12px; width:100%; padding:13px; border:1px dashed #c2b3a1; color:var(--muted); background:transparent; cursor:pointer; font:10px 'Space Mono',monospace; } .fpo-add:hover { border-color:var(--red); color:var(--red); }
        .fpo-inspector { border-left:1px solid var(--line); background:#f8f3eb; padding:31px 23px; } .fpo-inspector h2 { margin:7px 0 24px; font:600 24px Fraunces,serif; } .fpo-inspector .fpo-mono { color:var(--red); }
        .fpo-field { border-top:1px solid var(--line); padding:17px 0; } .fpo-field label { display:flex; justify-content:space-between; font-size:12px; font-weight:600; } .fpo-field label span { font:9px 'Space Mono',monospace; color:var(--green); } .fpo-field p { color:var(--muted); font-size:11px; line-height:1.5; margin:7px 0 0; }
        .fpo-check { display:flex; gap:9px; align-items:flex-start; border-top:1px solid var(--line); padding:13px 0; cursor:pointer; font-size:11px; line-height:1.45; } .fpo-check input { accent-color:var(--red); margin-top:2px; }
        .fpo-publish { width:100%; border:0; margin-top:19px; padding:13px; background:var(--red); color:var(--paper); cursor:pointer; font:10px 'Space Mono',monospace; } .fpo-publish:hover { background:#8f3d28; } .fpo-publish.done { background:var(--green); }
        @media(max-width:850px) { .fpo-layout { grid-template-columns:170px minmax(0,1fr); } .fpo-inspector { display:none; } .fpo-work { padding:26px 22px; } .fpo-top { padding:0 18px; } .fpo-status span:last-child { display:none; } }
        @media(max-width:600px) { .fpo-layout { display:block; } .fpo-nav { display:none; } .fpo-work { padding:24px 16px 35px; } .fpo-heading { display:block; } .fpo-heading p { margin-top:14px; } .fpo-cards { display:block; } .fpo-card, .fpo-card:first-child { min-height:170px; margin-bottom:10px; } .fpo-brand small, .fpo-status { display:none; } }
      `}</style>
      <header className="fpo-top">
        <div className="fpo-brand"><div className="fpo-mark">F</div><div><strong>Found·Ry</strong><small className="fpo-mono">ORBIT / GPT ASSEMBLY</small></div></div>
        <div className="fpo-status fpo-mono"><b>● AUTOSAVED</b><span>SESSION 026</span><span>{published ? "READY TO SHARE" : "DRAFT / 68%"}</span></div>
      </header>
      <div className="fpo-layout">
        <nav className="fpo-nav">
          <h2>Build the<br /><span style={{ color: "var(--red)" }}>why</span> first.</h2>
          <p>Most GPTs fail in the gap between a clever idea and a useful habit. Close that gap here.</p>
          {steps.map((step) => <button key={step.id} className={`fpo-step ${active === step.id ? "active" : ""}`} onClick={() => setActive(step.id)}><span>{step.number}</span><div><em>{step.label}</em><small>{step.kicker}</small></div></button>)}
          <div className="fpo-nav-foot"><span className="fpo-mono">WORKING THEORY</span><br />A good assistant makes one high-stakes decision feel lighter.</div>
        </nav>
        <section className="fpo-work">
          <div className="fpo-heading"><div><div className="fpo-mono">STEP {activeStep.number} / {activeStep.kicker}</div><h1>{activeStep.label}<br /><span style={{ color: "var(--red)" }}>in plain sight.</span></h1></div><p>Collect decisions, not configuration. Your GPT becomes legible before it becomes live.</p></div>
          <div className="fpo-search"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Filter decisions by phrase..." /></div>
          <div className="fpo-cards">{visibleCards.map((card) => <article className="fpo-card" key={card.title}><i /><div><div className="fpo-mono">{card.tag}</div><h3>{card.title}</h3><p>{card.text}</p></div></article>)}</div>
          <button className="fpo-add" onClick={() => setQuery("")}>+ ADD ANOTHER DECISION</button>
        </section>
        <aside className="fpo-inspector">
          <div className="fpo-mono">CURRENT READOUT</div><h2>Contract<br />Redliner <span style={{ color: "var(--red)" }}>↗</span></h2>
          <div className="fpo-field"><label>Signal <span>STRONG</span></label><p>Specific user, specific pressure, specific artifact.</p></div>
          <div className="fpo-field"><label>Voice <span>TO DEFINE</span></label><p>Direct, calm, and comfortable saying “ask counsel.”</p></div>
          <label className="fpo-check"><input type="checkbox" checked={checked.includes("user")} onChange={() => toggleCheck("user")} /> Name the practitioner before naming the feature.</label>
          <label className="fpo-check"><input type="checkbox" checked={checked.includes("output")} onChange={() => toggleCheck("output")} /> Make every answer point to an actionable next step.</label>
          <label className="fpo-check"><input type="checkbox" checked={checked.includes("risk")} onChange={() => toggleCheck("risk")} /> Separate risk signal from legal advice.</label>
          <button className={`fpo-publish ${published ? "done" : ""}`} onClick={() => setPublished((value) => !value)}>{published ? "✓ PACKAGE READY" : "RUN TEST FLIGHT →"}</button>
        </aside>
      </div>
    </main>
  );
}