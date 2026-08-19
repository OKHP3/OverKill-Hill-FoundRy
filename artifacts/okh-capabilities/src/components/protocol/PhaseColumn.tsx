import { Phase } from '@/data/protocol';
import { StageCard } from './StageCard';
import { cn } from '@/lib/utils';
import { useProtocolStore } from '@/hooks/use-protocol-store';

interface PhaseColumnProps {
  phase: Phase;
  index: number;
}

export function PhaseColumn({ phase, index }: PhaseColumnProps) {
  const { activePhaseId, setActivePhase } = useProtocolStore();
  const isActive = activePhaseId === phase.phaseNumber;

  const glowClass = 
    index === 0 ? "glow-orange" :
    index === 1 ? "glow-amber" :
    "glow-olive";

  const barGradient = 
    index === 0 ? "from-okh-orange to-transparent" :
    index === 1 ? "from-okh-amber to-transparent" :
    "from-okh-olive to-transparent";

  const iconColor = 
    index === 0 ? "text-okh-orange" :
    index === 1 ? "text-okh-amber" :
    "text-okh-olive";

  return (
    <div 
      className={cn(
        "relative flex flex-col p-6 gap-4 border-b md:border-b-0 md:border-r border-border transition-all duration-500 overflow-y-auto overflow-x-hidden group",
        !isActive && "md:opacity-60 md:hover:opacity-100",
        index === 2 && "md:border-r-0"
      )}
      data-testid={`column-phase-${phase.phaseNumber}`}
    >
      {/* Ember glow */}
      <div 
        className={cn(
          "absolute top-[-60px] left-1/2 -translate-x-1/2 w-[240px] h-[200px] rounded-full pointer-events-none transition-opacity duration-500",
          glowClass,
          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-50"
        )}
      />

      <button
        type="button"
        className="flex items-center justify-between z-10 text-left cursor-pointer rounded-sm -m-1 p-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-okh-orange"
        onClick={() => setActivePhase(phase.phaseNumber)}
        aria-pressed={isActive}
        aria-label={`Select phase ${phase.phaseNumber}: ${phase.title}`}
      >
        <div className="font-mono text-[0.58rem] text-okh-orange tracking-[0.18em] uppercase">
          Phase {phase.phaseNumber}
        </div>
        <div className={cn("text-xl opacity-70 leading-none", iconColor)}>
          {phase.icon}
        </div>
      </button>

      <div className={cn("h-[1px] w-full bg-gradient-to-r opacity-60 z-10", barGradient)} />

      <h3 className="font-serif text-xl text-foreground m-0 leading-tight z-10">
        {phase.title}
      </h3>

      <p className="font-sans text-sm text-muted-foreground leading-relaxed flex-none z-10">
        {phase.description}
      </p>

      <div className="flex flex-col gap-2 mt-2 z-10 flex-1">
        {phase.stages.map((stage) => (
          <StageCard key={stage.id} stage={stage} />
        ))}
      </div>
    </div>
  );
}
