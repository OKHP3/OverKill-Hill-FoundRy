import { useEffect, useMemo, useState } from 'react';

type Message = {
  role: 'forge' | 'user';
  text: string;
  ts: string;
  extracted?: { field: string; value: string };
};

type SpecStatus = 'done' | 'building' | 'pending';
type SpecSection = {
  id: string;
  label: string;
  status: SpecStatus;
  value: string;
  progress: number;
};

const STORAGE_KEY = 'okh-forge-protocol';

const initialMessages: Message[] = [
  {
    role: 'forge',
    text: 'Describe the practitioner this GPT serves. What is their core task — and what breaks down without precision?',
    ts: '09:14',
  },
  {
    role: 'user',
    text: 'Employment lawyers who need to redline contracts fast. They miss risky clauses under pressure when documents are dense.',
    ts: '09:15',
  },
  {
    role: 'forge',
    text: 'Extraction mode. What output format matters most — marked clauses, summary memo, or tracked-changes overlay?',
    ts: '09:15',
    extracted: { field: 'Domain', value: 'Employment law — contract review' },
  },
  {
    role: 'user',
    text: 'Marked clauses. Risk level and a plain-English explanation for each one. No legalese in the output.',
    ts: '09:16',
  },
  {
    role: 'forge',
    text: 'Risk taxonomy confirmed: Critical · Review · Flag. Tone: plain English, no hedging. Package name: Contract Redliner v1.',
    ts: '09:16',
    extracted: { field: 'Output', value: 'Clause-level risk annotation · 3-tier taxonomy' },
  },
  {
    role: 'user',
    text: 'Also needs to handle NDAs and non-competes specifically — those are the highest-risk clauses for our clients.',
    ts: '09:17',
  },
  {
    role: 'forge',
    text: 'Priority clause types locked: NDAs, non-competes, IP assignment, termination. Generating conversation starters…',
    ts: '09:17',
    extracted: { field: 'Priority Clauses', value: 'NDA · Non-compete · IP · Termination' },
  },
];

const initialSpec: SpecSection[] = [
  { id: 'name', label: 'Package Name', status: 'done', value: 'Contract Redliner v1', progress: 100 },
  { id: 'domain', label: 'Domain & Practitioner', status: 'done', value: 'Employment lawyers · contract review under time pressure', progress: 100 },
  { id: 'instructions', label: 'Core Instructions', status: 'building', value: 'Scan for high-risk clauses. Annotate with tier (Critical / Review / Flag)…', progress: 72 },
  { id: 'starters', label: 'Conversation Starters', status: 'building', value: '2 of 4 generated', progress: 50 },
  { id: 'capabilities', label: 'Capabilities', status: 'done', value: 'Code interpreter · No browsing · No image gen', progress: 100 },
  { id: 'knowledge', label: 'Knowledge Files', status: 'pending', value: 'Awaiting upload or URL', progress: 0 },
];

const phases = [
  { label: 'Intent', complete: true },
  { label: 'Scope', complete: true },
  { label: 'Draft', complete: true },
  { label: 'Review', complete: false },
  { label: 'Export', complete: false },
];

const colors = { orange: '#c46a2c', amber: '#e6a03c' };

function nowLabel() {
  return new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date());
}

function isMessage(value: unknown): value is Message {
  if (!value || typeof value !== 'object') return false;
  const message = value as Record<string, unknown>;
  const extracted = message.extracted;
  const validExtraction = extracted === undefined || (
    Boolean(extracted) &&
    typeof extracted === 'object' &&
    typeof (extracted as Record<string, unknown>).field === 'string' &&
    typeof (extracted as Record<string, unknown>).value === 'string'
  );
  return (message.role === 'forge' || message.role === 'user') &&
    typeof message.text === 'string' &&
    typeof message.ts === 'string' &&
    validExtraction;
}

function isSpecSection(value: unknown): value is SpecSection {
  if (!value || typeof value !== 'object') return false;
  const section = value as Record<string, unknown>;
  return typeof section.id === 'string' &&
    typeof section.label === 'string' &&
    typeof section.value === 'string' &&
    (section.status === 'done' || section.status === 'building' || section.status === 'pending') &&
    typeof section.progress === 'number' &&
    Number.isFinite(section.progress) &&
    section.progress >= 0 &&
    section.progress <= 100;
}

function loadProtocol() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const saved: unknown = raw ? JSON.parse(raw) : {};
    const data = saved && typeof saved === 'object' ? saved as Record<string, unknown> : {};
    const savedMessages = Array.isArray(data.messages) ? data.messages.filter(isMessage) : [];
    const savedSpec = Array.isArray(data.spec) && data.spec.length === initialSpec.length && data.spec.every(isSpecSection)
      ? data.spec as SpecSection[]
      : initialSpec;
    return {
      messages: savedMessages.length ? savedMessages : initialMessages,
      spec: savedSpec,
      checked: Array.isArray(data.checked) ? data.checked.filter((value): value is string => value === 'user' || value === 'output' || value === 'risk') : [],
      published: Boolean(data.published),
      activePhase: Number.isInteger(data.activePhase) && (data.activePhase as number) >= 0 && (data.activePhase as number) < phases.length
        ? data.activePhase as number
        : 0,
    };
  } catch {
    return { messages: initialMessages, spec: initialSpec, checked: [], published: false, activePhase: 0 };
  }
}

function ProgressBar({ pct, color = colors.orange }: { pct: number; color?: string }) {
  return (
    <div className="forge-progress-track">
      <div className="forge-progress-value" style={{ width: `${pct}%`, background: color }} />
    </div>
  );
}

function Mark({ small = false }: { small?: boolean }) {
  return (
    <div className={small ? 'forge-mark forge-mark-small' : 'forge-mark'} aria-hidden="true">
      F
    </div>
  );
}

function MessageBubble({ message, index }: { message: Message; index: number }) {
  const isForge = message.role === 'forge';
  return (
    <div className={`forge-message ${isForge ? 'forge-message-left' : 'forge-message-right'}`} style={{ animationDelay: `${index * 45}ms` }}>
      {isForge && (
        <div className="forge-message-label">
          <Mark small />
          <span>Forge · {message.ts}</span>
        </div>
      )}
      <div className={`forge-bubble ${isForge ? 'forge-bubble-forge' : 'forge-bubble-user'}`}>
        {message.text}
      </div>
      {message.extracted && (
        <div className="forge-extracted">
          <span className="forge-extracted-dot" />
          EXTRACTED → {message.extracted.field}: {message.extracted.value}
        </div>
      )}
      {!isForge && <span className="forge-message-time">{message.ts}</span>}
    </div>
  );
}

function SpecCard({ section }: { section: SpecSection }) {
  const status = section.status === 'done'
    ? { color: '#4ade80', label: '✓' }
    : section.status === 'building'
      ? { color: colors.amber, label: '…' }
      : { color: '#4b5563', label: '○' };

  return (
    <article className={`forge-spec-card forge-spec-${section.status}`}>
      {section.status === 'building' && <span className="forge-card-glint" />}
      <div className="forge-spec-header">
        <span>{section.label}</span>
        <b style={{ color: status.color }}>{status.label}</b>
      </div>
      <p className={section.status === 'pending' ? 'forge-spec-pending' : undefined}>
        {section.value}
        {section.status === 'building' && <span className="forge-cursor" aria-hidden="true" />}
      </p>
      {section.progress > 0 && section.status !== 'done' && <ProgressBar pct={section.progress} color={colors.amber} />}
    </article>
  );
}

export default function ForgeProtocol() {
  const stored = useMemo(loadProtocol, []);
  const [messages, setMessages] = useState<Message[]>(stored.messages);
  const [spec, setSpec] = useState<SpecSection[]>(stored.spec);
  const [checked, setChecked] = useState<string[]>(stored.checked);
  const [published, setPublished] = useState(stored.published);
  const [draft, setDraft] = useState('');
  const [activePhase, setActivePhase] = useState(stored.activePhase);
  const [isPreview, setIsPreview] = useState(false);
  const [persistenceNotice, setPersistenceNotice] = useState('');

  const overallProgress = Math.round(spec.reduce((total, section) => total + section.progress, 0) / spec.length);
  const trace = messages.filter((message) => message.extracted).slice(-3);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ messages, spec, checked, published, activePhase }));
    } catch {
      setPersistenceNotice('Saved only for this session — browser storage is unavailable.');
    }
  }, [messages, spec, checked, published, activePhase]);

  function submitMessage() {
    const text = draft.trim();
    if (!text) return;
    const userDecisionCount = messages.filter((message) => message.role === 'user').length + 1;
    const clipped = text.length > 112 ? `${text.slice(0, 109)}…` : text;
    const includesKnowledgeReference = /\b(knowledge|upload|file|document|policy|playbook|template|manual)\b/i.test(text);
    setMessages((current) => [
      ...current,
      { role: 'user', text, ts: nowLabel() },
      {
        role: 'forge',
        text: 'Captured. I added that decision to the working brief and tightened the emerging specification. What else should this GPT know or do?',
        ts: nowLabel(),
        extracted: { field: 'Working decision', value: clipped },
      },
    ]);
    setSpec((current) => current.map((section) => {
      if (section.id === 'instructions') {
        return {
          ...section,
          status: 'building',
          value: `Scan for high-risk clauses. Latest decision: ${clipped}`,
          progress: Math.min(96, section.progress + 6),
        };
      }
      if (section.id === 'starters') {
        const generated = Math.min(4, 2 + Math.floor(userDecisionCount / 2));
        return { ...section, status: generated === 4 ? 'done' : 'building', value: `${generated} of 4 generated from captured decisions`, progress: generated * 25 };
      }
      if (section.id === 'knowledge' && includesKnowledgeReference) {
        return { ...section, status: 'building', value: `Reference material noted: ${clipped}`, progress: 30 };
      }
      return section;
    }));
    setDraft('');
  }

  function exportPackage() {
    const payload = {
      name: 'Contract Redliner v1',
      phase: phases[activePhase].label,
      conversation: messages,
      specification: spec,
      checked,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'contract-redliner-forge-package.json';
    anchor.click();
    URL.revokeObjectURL(url);
    setPublished(true);
  }

  function toggleCheck(id: string) {
    setChecked((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  return (
    <main className="forge-protocol" data-testid="forge-protocol">
      <style>{`
        @keyframes forgeFadeUp { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes forgePulse { 0%, 100% { opacity: .55; } 50% { opacity: 1; } }
        @keyframes forgeCursor { 0%, 45% { opacity: 1; } 46%, 100% { opacity: 0; } }
      `}</style>
      <header className="forge-topbar">
        <div className="forge-brand">
          <Mark />
          <div>
            <strong>OKH <span>Found·Ry</span></strong>
            <small>ORBIT / GPT ASSEMBLY</small>
          </div>
          <i />
          <span className="forge-version">FORGE PROTOCOL · v2026</span>
        </div>
        <div className="forge-session">
          <span className="forge-session-live"><b /> SESSION ACTIVE</span>
          <span className="forge-assembled">{published ? 'READY TO SHARE' : `${overallProgress}% ASSEMBLED`}</span>
        </div>
      </header>
      <div className="forge-accent-rule" />

      <div className="forge-body">
        <section className="forge-conversation">
          <div className="forge-panel-heading">
            <div>Forge Dialogue</div>
            <p>Describe your practitioner and their task — the spec assembles itself.</p>
          </div>
          <div className="forge-messages" aria-live="polite">
            {messages.map((message, index) => <MessageBubble key={`${message.ts}-${index}`} message={message} index={index} />)}
            <div className="forge-thinking" aria-label="Forge is thinking">
              <Mark small />
              <span><b /><b /><b /></span>
            </div>
          </div>
          <form className="forge-input-bar" onSubmit={(event) => { event.preventDefault(); submitMessage(); }}>
            <input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="What else should this GPT know or do…"
              aria-label="Add a decision to the Forge dialogue"
            />
            <button type="submit" aria-label="Send decision">→</button>
          </form>
        </section>

        <section className="forge-spec">
          <div className="forge-spec-titlebar">
            <div>
              <div className="forge-eyebrow">Emerging Specification</div>
              <h1>Contract Redliner <span>v1</span></h1>
            </div>
            <div className="forge-actions">
              <button type="button" className="forge-preview-button" onClick={() => setIsPreview((value) => !value)}>
                {isPreview ? 'EDIT' : 'PREVIEW'}
              </button>
              <button type="button" className="forge-export-button" onClick={exportPackage}>EXPORT PACKAGE</button>
            </div>
          </div>
          <div className="forge-assembly-bar">
            <ProgressBar pct={overallProgress} />
            <span>{overallProgress}%</span>
          </div>
          {isPreview ? (
            <div className="forge-live-preview">
              <div className="forge-eyebrow">Preview Mode</div>
              <h2>Contract Redliner v1</h2>
              <p>Scan a contract for high-risk clauses, explain the risk in plain English, and point the practitioner to an actionable next step.</p>
              <div className="forge-preview-tags"><span>NDAs</span><span>Non-competes</span><span>IP assignment</span><span>Termination</span></div>
            </div>
          ) : (
            <div className="forge-spec-list">
              {spec.map((section) => <SpecCard key={section.id} section={section} />)}
            </div>
          )}
          <div className="forge-trace">
            <div className="forge-eyebrow">Extraction Trace</div>
            {trace.map((message, index) => (
              <div key={`${message.ts}-${message.extracted?.field}-${index}`}>
                <span>T{Math.max(1, messages.indexOf(message) + 1)}</span>
                <b>{message.extracted?.field}</b>
                <em>{message.extracted?.value}</em>
              </div>
            ))}
          </div>
        </section>

        <aside className="forge-phase-rail">
          <div className="forge-rail-label">Forge Phase</div>
          {phases.map((phase, index) => (
            <button
              type="button"
              key={phase.label}
              className={activePhase === index ? 'forge-phase active' : 'forge-phase'}
              onClick={() => setActivePhase(index)}
              aria-label={`Select ${phase.label} phase`}
              aria-current={activePhase === index ? 'step' : undefined}
            >
              <span>{phase.complete && index <= activePhase ? '✓' : phase.complete ? '✓' : '·'}</span>
              <small>{phase.label}</small>
            </button>
          ))}
        </aside>
      </div>

      <div className="forge-readiness">
        {checked.length}/3 guardrails confirmed · {phases[activePhase].label} phase selected
        {persistenceNotice && <strong>{persistenceNotice}</strong>}
        <label><input type="checkbox" checked={checked.includes('user')} onChange={() => toggleCheck('user')} /> Name the practitioner</label>
        <label><input type="checkbox" checked={checked.includes('output')} onChange={() => toggleCheck('output')} /> Point to an action</label>
        <label><input type="checkbox" checked={checked.includes('risk')} onChange={() => toggleCheck('risk')} /> Separate risk from advice</label>
      </div>
    </main>
  );
}