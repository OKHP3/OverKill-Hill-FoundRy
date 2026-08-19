import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

interface ProtocolState {
  completedStages: string[];
  activePhaseId: string | null;
  toggleStage: (stageId: string) => void;
  setActivePhase: (phaseId: string | null) => void;
  resetProgress: () => void;
}

const ProtocolContext = createContext<ProtocolState | undefined>(undefined);

const STORAGE_KEY = 'okh-protocol-storage';

export function ProtocolProvider({ children }: { children: ReactNode }) {
  const [completedStages, setCompletedStages] = useState<string[]>([]);
  const [activePhaseId, setActivePhaseId] = useState<string | null>('01');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.completedStages) setCompletedStages(parsed.completedStages);
        if (parsed.activePhaseId) setActivePhaseId(parsed.activePhaseId);
      }
    } catch (error) {
      console.warn('Failed to load protocol state', error);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ completedStages, activePhaseId }),
      );
    } catch (error) {
      console.warn('Failed to save protocol state', error);
    }
  }, [completedStages, activePhaseId, isLoaded]);

  const toggleStage = (stageId: string) => {
    setCompletedStages((previous) =>
      previous.includes(stageId)
        ? previous.filter((id) => id !== stageId)
        : [...previous, stageId],
    );
  };

  return (
    <ProtocolContext.Provider
      value={{
        completedStages,
        activePhaseId,
        toggleStage,
        setActivePhase: setActivePhaseId,
        resetProgress: () => setCompletedStages([]),
      }}
    >
      {children}
    </ProtocolContext.Provider>
  );
}

export function useProtocolStore() {
  const context = useContext(ProtocolContext);
  if (context === undefined) {
    throw new Error('useProtocolStore must be used within a ProtocolProvider');
  }
  return context;
}