import { ReactNode } from 'react';
import { RotateCcw } from 'lucide-react';
import { useProtocolStore } from '@/hooks/use-protocol-store';
import { PROTOCOL_PHASES } from '@/data/protocol';

export function Header() {
  const { completedStages, resetProgress } = useProtocolStore();
  
  const totalStages = PROTOCOL_PHASES.reduce((acc, phase) => acc + phase.stages.length, 0);
  const progressPercent = Math.round((completedStages.length / totalStages) * 100);

  return (
    <div className="relative z-10 w-full">
      {/* Top orange accent bar */}
      <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-okh-orange to-transparent opacity-90" />
      
      <div className="flex flex-col md:flex-row md:items-end justify-between px-6 py-5 border-b border-border gap-4 bg-background/80 backdrop-blur-sm">
        <div>
          <div className="font-mono text-[0.58rem] tracking-[0.22em] text-okh-orange uppercase mb-1.5 brand-nowrap">
            OverKill Hill P³ &middot; Found&middot;Ry
          </div>
          <h1 className="font-serif text-2xl md:text-3xl text-foreground m-0 tracking-wide">
            The Build Protocol
          </h1>
        </div>

        <div className="flex items-center gap-6">
          {/* Progress */}
          <div className="flex flex-col items-end gap-1">
            <div className="font-mono text-xs text-muted-foreground tracking-wider uppercase">
              Protocol Integrity
            </div>
            <div className="flex items-center gap-3">
              <div className="w-32 h-1.5 bg-border/50 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-okh-orange transition-all duration-300 ease-out shadow-[0_0_8px_rgba(196,106,44,0.6)]"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="font-mono text-sm text-okh-amber">{progressPercent}%</span>
            </div>
          </div>

          <button
            type="button"
            onClick={resetProgress}
            className="flex items-center justify-center p-2 rounded text-muted-foreground hover:text-okh-orange hover:bg-okh-orange/10 transition-colors border border-transparent hover:border-okh-orange/20 cursor-pointer"
            title="Reset Protocol Progress"
            aria-label="Reset protocol progress"
            data-testid="button-reset-progress"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
