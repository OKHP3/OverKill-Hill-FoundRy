import { useEffect, useMemo, useState } from 'react';

const ink = '#27221f';
const paper = '#f4efe7';
const paperDeep = '#e9e0d4';
const line = '#d7cabb';
const rust = '#a84e32';
const sage = '#48645a';
const muted = '#81766d';
const storageKey = 'okh-foundry-paper-session';

type Message = {
  role: 'forge' | 'user';
  text: string;
  time: string;
  tag?: string;
};

type SpecStatus = 'done' | 'building' | 'pending';
type SpecSection = {
  id: string;
  label: string;
  value: string;
  status: SpecStatus;
  pct: number;
};

type Trace = {
  id: string;
  label: string;
  value: string;
};

const seedMessages: Message[] = [
  { role: 'forge', text: 'Tell me about the practitioner this GPT serves. What gets missed when the work is rushed?', time: '09:14' },
  { role: 'user', text: 'Employment lawyers who need to redline contracts fast. Dense documents hide risky clauses under pressure.', time: '09:15' },
  { role: 'forge', text: 'I hear a precision tool: marked clauses, a risk level, and plain-English reasoning. No legalese.', time: '09:15', tag: 'DOMAIN → EMPLOYMENT LAW' },
  { role: 'user', text: 'Exactly. NDAs and non-competes are the highest-risk clauses for our clients.', time: '09:16' },
  { role: 'forge', text: 'Priority set. I’m shaping the first pass around NDA, non-compete, IP assignment, and termination.', time: '09:17', tag: 'SCOPE → 4 PRIORITY CLAUSES' },
];

const initialSections: SpecSection[] = [
  { id: 'name', label: 'Package name', value: 'Contract Redliner v1', status: 'done', pct: 100 },
  { id: 'practitioner', label: 'Practitioner', value: 'Employment lawyers · contract review', status: 'done', pct: 100 },
  { id: 'instructions', label: 'Core instructions', value: 'Scan, classify, explain — without hedging.', status: 'building', pct: 72 },
  { id: 'starters', label: 'Conversation starters', value: '2 of 4 generated', status: 'building', pct: 50 },
  { id: 'capabilities', label: 'Capabilities', value: 'Code interpreter · No browsing', status: 'done', pct: 100 },
  { id: 'knowledge', label: 'Knowledge files', value: 'Awaiting upload or URL', status: 'pending', pct: 0 },
];

const initialTrace: Trace[] = [
  { id: 'domain', label: 'DOMAIN', value: 'EMPLOYMENT LAW' },
  { id: 'output', label: 'OUTPUT', value: '3-TIER RISK' },
];

const phases = ['Intent', 'Scope', 'Draft', 'Review', 'Export'];

function Mark({ status }: { status: string }) {
  return (
    <span style={{ color: status === 'done' ? sage : status === 'building' ? rust : muted, fontSize: 16 }} aria-label={status}>
      {status === 'done' ? '✓' : status === 'building' ? '·' : '○'}
    </span>
  );
}

function isMessage(value: unknown): value is Message {
  if (!value || typeof value !== 'object') return false;
  const message = value as Record<string, unknown>;
  return (message.role === 'forge' || message.role === 'user') &&
    typeof message.text === 'string' &&
    typeof message.time === 'string' &&
    (message.tag === undefined || typeof message.tag === 'string');
}

function isSpecSection(value: unknown): value is SpecSection {
  if (!value || typeof value !== 'object') return false;
  const section = value as Record<string, unknown>;
  return typeof section.id === 'string' &&
    typeof section.label === 'string' &&
    typeof section.value === 'string' &&
    (section.status === 'done' || section.status === 'building' || section.status === 'pending') &&
    typeof section.pct === 'number' &&
    Number.isFinite(section.pct) &&
    section.pct >= 0 &&
    section.pct <= 100;
}

function isTrace(value: unknown): value is Trace {
  if (!value || typeof value !== 'object') return false;
  const trace = value as Record<string, unknown>;
  return typeof trace.id === 'string' && typeof trace.label === 'string' && typeof trace.value === 'string';
}

function loadSession() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || '{}') as Record<string, unknown>;
    const storedMessages = Array.isArray(saved.messages) ? saved.messages.filter(isMessage) : [];
    const storedSections = Array.isArray(saved.sections) && saved.sections.length === initialSections.length && saved.sections.every(isSpecSection)
      ? saved.sections as SpecSection[]
      : initialSections;
    const storedTrace = Array.isArray(saved.trace) && saved.trace.length && saved.trace.every(isTrace)
      ? saved.trace as Trace[]
      : initialTrace;
    return {
      messages: storedMessages.length ? storedMessages : seedMessages,
      sections: storedSections,
      trace: storedTrace,
      activePhase: Number.isInteger(saved.activePhase) && (saved.activePhase as number) >= 0 && (saved.activePhase as number) < phases.length ? saved.activePhase as number : 0,
      progress: typeof saved.progress === 'number' && saved.progress >= 0 && saved.progress <= 100 ? saved.progress : 71,
      storageAvailable: true,
    };
  } catch {
    return { messages: seedMessages, sections: initialSections, trace: initialTrace, activePhase: 0, progress: 71, storageAvailable: false };
  }
}

export default function ForgeProtocolPaper() {
  const saved = useMemo(loadSession, []);
  const [messages, setMessages] = useState<Message[]>(saved.messages);
  const [sections, setSections] = useState<SpecSection[]>(saved.sections);
  const [trace, setTrace] = useState<Trace[]>(saved.trace);
  const [draft, setDraft] = useState('');
  const [preview, setPreview] = useState(false);
  const [activePhase, setActivePhase] = useState(saved.activePhase);
  const [exported, setExported] = useState(false);
  const [progress, setProgress] = useState(saved.progress);
  const [storageNotice, setStorageNotice] = useState(saved.storageAvailable ? '' : 'SESSION ONLY');

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify({ messages, sections, trace, activePhase, progress }));
      setStorageNotice('');
    } catch {
      setStorageNotice('SESSION ONLY');
    }
  }, [messages, sections, trace, activePhase, progress]);

  function send() {
    const text = draft.trim();
    if (!text) return;
    const time = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date());
    const clipped = text.length > 92 ? `${text.slice(0, 89)}…` : text;
    const decisionCount = messages.filter((message) => message.role === 'user').length + 1;
    const referencesKnowledge = /\b(upload|file|document|manual|policy|knowledge)\b/i.test(text);
    setMessages((current) => [
      ...current,
      { role: 'user', text, time },
      { role: 'forge', text: 'Captured. I’m folding that decision into the emerging specification.', time, tag: 'DECISION → WORKING BRIEF' },
    ]);
    setSections((current) => current.map((section) => {
      if (section.id === 'instructions') {
        return { ...section, value: `Scan, classify, explain. Latest decision: ${clipped}`, status: 'building', pct: Math.min(96, section.pct + 6) };
      }
      if (section.id === 'starters') {
        const generated = Math.min(4, 2 + Math.floor(decisionCount / 2));
        return { ...section, value: `${generated} of 4 generated from captured decisions`, status: generated === 4 ? 'done' : 'building', pct: generated * 25 };
      }
      if (section.id === 'knowledge' && referencesKnowledge) {
        return { ...section, value: `Reference material noted — ${clipped}`, status: 'building', pct: 30 };
      }
      return section;
    }));
    setTrace((current) => [...current, { id: `${time}-${text}`, label: 'DECISION', value: clipped }].slice(-3));
    setProgress((current) => Math.min(94, current + 4));
    setDraft('');
  }

  function exportPackage() {
    const blob = new Blob([JSON.stringify({ name: 'Contract Redliner v1', phase: phases[activePhase], messages, sections, trace, progress }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'contract-redliner-paper-session.json';
    anchor.click();
    URL.revokeObjectURL(url);
    setExported(true);
  }

  return (
    <main className="fpp-shell">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Fraunces:opsz,wght@9..144,600&family=Space+Mono:wght@400;700&display=swap');
        .fpp-shell { box-sizing: border-box; width: 100%; height: 100dvh; min-height: 640px; overflow: hidden; color: ${ink}; background: ${paper}; font-family: 'DM Sans', 'Trebuchet MS', sans-serif; }
        .fpp-shell *, .fpp-shell *::before, .fpp-shell *::after { box-sizing: border-box; }
        .fpp-shell button, .fpp-shell input { font: inherit; }
        .fpp-scroll::-webkit-scrollbar { width: 5px; }
        .fpp-scroll::-webkit-scrollbar-thumb { background: #cbbbaa; border-radius: 10px; }
        .fpp-message { animation: fpp-in .4s ease both; }
        .fpp-action:hover { background: #ded2c4 !important; }
        .fpp-phase:hover { background: #ded2c4 !important; }
        .fpp-shell button:focus-visible, .fpp-input:focus-visible { outline: 2px solid ${rust}; outline-offset: 3px; }
        @keyframes fpp-in { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 760px) {
          .fpp-header-meta { display: none !important; }
          .fpp-body { display: block !important; height: calc(100dvh - 65px) !important; overflow-y: auto !important; }
          .fpp-dialogue { width: 100% !important; min-width: 0 !important; height: 57dvh !important; border-right: 0 !important; border-bottom: 1px solid ${line}; }
          .fpp-spec { min-height: 650px; }
          .fpp-phases { width: 100% !important; height: auto !important; min-height: 72px; flex-direction: row !important; justify-content: space-around !important; border-left: 0 !important; border-top: 1px solid ${line}; padding: 12px 5px !important; gap: 4px !important; }
          .fpp-phase-label { display: none !important; }
          .fpp-phase { margin: 0 !important; }
          .fpp-spec-title { flex-direction: column !important; gap: 12px !important; }
          .fpp-spec-actions { width: 100%; }
          .fpp-spec-actions button { flex: 1; }
        }
      `}</style>
      <header style={{ height: 62, borderBottom: `1px solid ${line}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 26px', background: '#f8f4ed' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
          <div style={{ width: 29, height: 29, background: rust, color: paper, display: 'grid', placeItems: 'center', borderRadius: '50%', fontFamily: "'Fraunces', serif", fontSize: 18 }}>F</div>
          <div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 17, lineHeight: 1 }}>Found·Ry</div>
            <div style={{ marginTop: 5, color: muted, fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: '.14em' }}>CUSTOM GPT STUDIO</div>
          </div>
          <span style={{ color: line, fontSize: 22, marginLeft: 5 }}>/</span>
          <span style={{ color: muted, fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: '.12em' }}>FORGE SESSION 026</span>
        </div>
        <div className="fpp-header-meta" style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <span style={{ color: storageNotice ? rust : sage, fontFamily: "'Space Mono', monospace", fontSize: 10 }}>● {storageNotice || 'SAVED'}</span>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: muted }}>{exported ? 'PACKAGE READY' : `${progress}% ASSEMBLED`}</span>
        </div>
      </header>
      <div style={{ height: 3, background: `linear-gradient(90deg, ${rust} 0 ${progress}%, ${line} ${progress}%)` }} />

      <div className="fpp-body" style={{ display: 'flex', height: 'calc(100% - 65px)' }}>
        <section className="fpp-dialogue" style={{ width: '39%', minWidth: 370, borderRight: `1px solid ${line}`, display: 'flex', flexDirection: 'column', background: '#f1ebe2' }}>
          <div style={{ padding: '21px 25px 17px', borderBottom: `1px solid ${line}` }}>
            <div style={{ color: rust, fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: '.17em' }}>01 — THE DIALOGUE</div>
            <div style={{ marginTop: 7, color: muted, fontSize: 12 }}>Start with the work. The shape of the GPT follows.</div>
          </div>
          <div className="fpp-scroll" style={{ flex: 1, overflowY: 'auto', padding: '22px 25px', display: 'flex', flexDirection: 'column', gap: 19 }}>
            {messages.map((message, index) => (
              <div className="fpp-message" key={`${message.time}-${index}`} style={{ alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '89%', animationDelay: `${index * 60}ms` }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6, justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start' }}>
                  <span style={{ color: message.role === 'user' ? sage : rust, fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: '.12em' }}>{message.role === 'user' ? 'YOU' : 'FORGE'}</span>
                  <span style={{ color: muted, fontFamily: "'Space Mono', monospace", fontSize: 9 }}>{message.time}</span>
                </div>
                <div style={{ border: `1px solid ${message.role === 'user' ? '#b9c7bb' : line}`, background: message.role === 'user' ? '#e1ebe1' : '#f8f4ed', padding: '11px 13px', borderRadius: message.role === 'user' ? '12px 3px 12px 12px' : '3px 12px 12px 12px', fontSize: 13, lineHeight: 1.55 }}>{message.text}</div>
                {message.tag && <div style={{ color: rust, marginTop: 7, fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: '.08em' }}>↳ {message.tag}</div>}
              </div>
            ))}
          </div>
          <form onSubmit={(event) => { event.preventDefault(); send(); }} style={{ padding: '15px 20px 19px', borderTop: `1px solid ${line}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, border: '1px solid #c9b9a8', background: '#faf6ef', padding: '5px 6px 5px 13px', borderRadius: 5 }}>
              <input className="fpp-input" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="What else should this GPT know?" aria-label="Continue the Forge dialogue" style={{ minWidth: 0, flex: 1, border: 0, background: 'transparent', color: ink, fontSize: 12 }} />
              <button type="submit" aria-label="Send message" style={{ border: 0, cursor: 'pointer', background: rust, color: paper, width: 31, height: 31, borderRadius: 4, fontSize: 17 }}>↗</button>
            </div>
            <div style={{ textAlign: 'center', color: muted, fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: '.1em', marginTop: 9 }}>PRESS ENTER TO CONTINUE THE FORGE</div>
          </form>
        </section>

        <section className="fpp-spec" style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', background: paper }}>
          <div className="fpp-spec-title" style={{ padding: '21px 29px 17px', borderBottom: `1px solid ${line}`, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div><div style={{ color: rust, fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: '.17em' }}>02 — THE EMERGING SPEC</div><h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 28, fontWeight: 600, margin: '8px 0 0', letterSpacing: '-.03em' }}>Contract Redliner <sup style={{ color: rust, fontFamily: "'Space Mono', monospace", fontSize: 10 }}>v1</sup></h1></div>
            <div className="fpp-spec-actions" style={{ display: 'flex', gap: 8 }}>
              <button type="button" className="fpp-action" onClick={() => setPreview((value) => !value)} style={{ border: `1px solid ${line}`, background: 'transparent', color: ink, padding: '8px 11px', borderRadius: 4, cursor: 'pointer', fontFamily: "'Space Mono', monospace", fontSize: 9 }}>{preview ? 'CLOSE PREVIEW' : 'PREVIEW'}</button>
              <button type="button" onClick={exportPackage} style={{ border: 0, background: rust, color: paper, padding: '8px 11px', borderRadius: 4, cursor: 'pointer', fontFamily: "'Space Mono', monospace", fontSize: 9 }}>EXPORT PACKAGE</button>
            </div>
          </div>
          <div style={{ padding: '13px 29px', borderBottom: `1px solid ${line}`, display: 'flex', alignItems: 'center', gap: 13 }}><div style={{ height: 5, flex: 1, background: paperDeep, borderRadius: 5 }}><div style={{ height: '100%', width: `${progress}%`, background: rust, borderRadius: 5 }} /></div><span style={{ color: rust, fontFamily: "'Space Mono', monospace", fontSize: 10 }}>{progress}%</span></div>
          {preview ? <div style={{ margin: 29, border: `1px solid ${line}`, background: '#faf6ef', padding: 25, fontFamily: "'Space Mono', monospace", fontSize: 11, lineHeight: 1.8 }}><div style={{ color: rust, marginBottom: 12 }}>PREVIEW / CONTRACT REDLINER</div><div style={{ fontFamily: "'Fraunces', serif", fontSize: 24 }}>Plain English. Sharp eyes.</div><p style={{ color: muted, fontFamily: "'DM Sans', sans-serif", fontSize: 13 }}>Upload an employment contract to identify high-risk clauses and understand what deserves a second look.</p></div> :
            <div className="fpp-scroll" style={{ flex: 1, overflowY: 'auto', padding: '21px 29px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {sections.map(({ id, label, value, status, pct }) => <div key={id} style={{ position: 'relative', border: `1px solid ${status === 'building' ? '#d9bda5' : line}`, background: '#f8f4ed', padding: '15px 17px 13px', borderRadius: 5, overflow: 'hidden' }}>
                {status === 'building' && <div style={{ position: 'absolute', top: 0, left: 0, height: 2, width: `${pct}%`, background: rust }} />}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ color: muted, fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: '.12em', textTransform: 'uppercase' }}>{label}</span><Mark status={status} /></div>
                <div style={{ marginTop: 8, color: status === 'pending' ? '#a89c91' : ink, fontSize: 13, fontStyle: status === 'pending' ? 'italic' : 'normal' }}>{value}</div>
                {status === 'building' && <div style={{ height: 3, marginTop: 11, background: paperDeep }}><div style={{ height: '100%', width: `${pct}%`, background: rust }} /></div>}
              </div>)}
            </div>}
          <div style={{ borderTop: `1px solid ${line}`, padding: '15px 29px 17px', background: '#eee6dc' }}><div style={{ color: muted, fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: '.16em', marginBottom: 9 }}>EXTRACTION TRACE</div><div style={{ display: 'flex', gap: 22, flexWrap: 'wrap', color: ink, fontFamily: "'Space Mono', monospace", fontSize: 9 }}>{trace.map((item, index) => <span key={item.id}><b style={{ color: rust }}>T{index + 2}</b> {item.label} · {item.value}</span>)}</div></div>
        </section>

        <aside className="fpp-phases" style={{ width: 74, borderLeft: `1px solid ${line}`, background: '#eee6dc', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '22px 0', gap: 19 }}>
          <div className="fpp-phase-label" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', color: muted, fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: '.15em', marginBottom: 'auto' }}>PHASES</div>
          {phases.map((phase, index) => <button type="button" className="fpp-phase" key={phase} onClick={() => setActivePhase(index)} aria-label={`Select ${phase} phase`} aria-pressed={activePhase === index} style={{ textAlign: 'center', border: 0, background: 'transparent', cursor: 'pointer', padding: 0, color: index <= activePhase ? ink : muted }}>
            <div style={{ width: 27, height: 27, borderRadius: '50%', border: `1px solid ${index <= activePhase ? rust : line}`, background: index <= activePhase ? '#f8f4ed' : 'transparent', color: index <= activePhase ? rust : muted, display: 'grid', placeItems: 'center', fontFamily: "'Space Mono', monospace", fontSize: 10 }}>{index <= activePhase ? '✓' : index + 1}</div>
            <div style={{ marginTop: 6, fontFamily: "'Space Mono', monospace", fontSize: 8 }}>{phase}</div>
          </button>)}
          <div style={{ marginTop: 'auto', color: rust, fontFamily: "'Fraunces', serif", fontSize: 18 }}>↘</div>
        </aside>
      </div>
    </main>
  );
}