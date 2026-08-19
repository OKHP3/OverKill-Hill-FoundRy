import { Check, ChevronRight } from 'lucide-react';
import { Stage } from '@/data/protocol';
import { useProtocolStore } from '@/hooks/use-protocol-store';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface StageCardProps {
  stage: Stage;
}

export function StageCard({ stage }: StageCardProps) {
  const { completedStages, toggleStage } = useProtocolStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const isCompleted = completedStages.includes(stage.id);

  const Icon = stage.icon;

  return (
    <div 
      className={cn(
        "group flex flex-col border border-border/50 rounded-sm bg-card/40 transition-all duration-300 overflow-hidden",
        isCompleted && "border-okh-olive/30 bg-okh-olive/5",
        isExpanded && "border-border bg-card/80 shadow-soft"
      )}
      data-testid={`card-stage-${stage.id}`}
    >
      <div className="flex items-center gap-3 p-3">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleStage(stage.id);
          }}
          className={cn(
            "flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-[3px] border transition-colors duration-150",
            isCompleted 
              ? "bg-okh-olive border-okh-olive text-background" 
              : "border-muted-foreground/40 text-transparent hover:border-okh-orange"
          )}
          data-testid={`button-toggle-${stage.id}`}
          aria-label={`${isCompleted ? 'Mark incomplete' : 'Mark complete'}: ${stage.label}`}
        >
          <Check className="w-3.5 h-3.5" strokeWidth={3} />
        </button>
        
        <button
          type="button"
          className="flex items-center gap-2 flex-1 min-w-0 text-left cursor-pointer rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-okh-orange"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          aria-controls={`stage-details-${stage.id}`}
        >
          <Icon className={cn(
            "w-4 h-4 flex-shrink-0 transition-colors",
            isCompleted ? "text-okh-olive" : "text-muted-foreground group-hover:text-foreground"
          )} />
          <span className={cn(
            "font-sans text-sm font-medium truncate transition-colors",
            isCompleted ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
          )}>
            {stage.label}
          </span>
          <ChevronRight className={cn(
            "w-4 h-4 text-muted-foreground/50 transition-transform duration-300 flex-shrink-0 ml-auto",
            isExpanded && "rotate-90 text-foreground"
          )} />
        </button>
      </div>

      <div 
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div id={`stage-details-${stage.id}`} className="overflow-hidden">
          <div className="p-3 pt-0 pl-11">
            <p className="text-xs text-muted-foreground leading-relaxed font-sans pb-2">
              {stage.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
