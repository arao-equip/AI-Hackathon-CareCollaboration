import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface SummaryFilters {
  dateRange: {
    start: string;
    end: string;
  };
  dataTypes: string[];
  providers: string[];
}

export interface SummaryVersion {
  id: string;
  timestamp: string;
  user: string;
  reason?: string;
  content: string;
}

export interface Summary {
  id: string;
  patientId: string;
  content: string;
  filters: SummaryFilters;
  createdAt: string;
  createdBy: string;
  versions: SummaryVersion[];
  isPinned: boolean;
  tags: string[];
  riskFlags: string[];
}

interface SummaryContextType {
  currentSummary: Summary | null;
  setCurrentSummary: (summary: Summary | null) => void;
  filters: SummaryFilters;
  setFilters: (filters: SummaryFilters) => void;
  isGenerating: boolean;
  setIsGenerating: (generating: boolean) => void;
  summaryHistory: Summary[];
  addSummaryToHistory: (summary: Summary) => void;
}

const defaultFilters: SummaryFilters = {
  dateRange: {
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  },
  dataTypes: ['session-summaries', 'assessments', 'group-attendance'],
  providers: []
};

const SummaryContext = createContext<SummaryContextType | undefined>(undefined);

export function SummaryProvider({ children }: { children: ReactNode }) {
  const [currentSummary, setCurrentSummary] = useState<Summary | null>(null);
  const [filters, setFilters] = useState<SummaryFilters>(defaultFilters);
  const [isGenerating, setIsGenerating] = useState(false);
  const [summaryHistory, setSummaryHistory] = useState<Summary[]>([]);

  const addSummaryToHistory = (summary: Summary) => {
    setSummaryHistory(prev => [summary, ...prev.slice(0, 9)]); // Keep last 10
  };

  return (
    <SummaryContext.Provider value={{
      currentSummary,
      setCurrentSummary,
      filters,
      setFilters,
      isGenerating,
      setIsGenerating,
      summaryHistory,
      addSummaryToHistory
    }}>
      {children}
    </SummaryContext.Provider>
  );
}

export function useSummary() {
  const context = useContext(SummaryContext);
  if (!context) {
    throw new Error('useSummary must be used within SummaryProvider');
  }
  return context;
}