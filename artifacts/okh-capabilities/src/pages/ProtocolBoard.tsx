import { Header } from '@/components/layout/Header';
import { SchematicBar } from '@/components/layout/SchematicBar';
import { PhaseColumn } from '@/components/protocol/PhaseColumn';
import { PROTOCOL_PHASES } from '@/data/protocol';

export default function ProtocolBoard() {
  return (
    <div className="min-h-[100dvh] w-full flex flex-col bg-background font-sans relative overflow-hidden">
      <div className="absolute inset-0 dot-grid pointer-events-none z-0" />
      
      <Header />
      
      <main className="flex-1 relative z-10 w-full max-w-[1600px] mx-auto overflow-y-auto md:overflow-hidden flex flex-col md:flex-row">
        <div className="flex flex-col md:grid md:grid-cols-3 flex-1 w-full h-full">
          {PROTOCOL_PHASES.map((phase, idx) => (
            <PhaseColumn key={phase.id} phase={phase} index={idx} />
          ))}
        </div>
      </main>

      <SchematicBar />
    </div>
  );
}
