import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

export interface MoodEntry {
  mood: string;
  confidence: number;
  timestamp: string;
}

interface MoodHistoryContextType {
  moodHistory: MoodEntry[];
  addMoodEntry: (entry: MoodEntry) => void;
  clearMoodHistory: () => void;
}

const MoodHistoryContext = createContext<MoodHistoryContextType | undefined>(undefined);

export const useMoodHistory = () => {
  const context = useContext(MoodHistoryContext);
  if (context === undefined) {
    throw new Error('useMoodHistory must be used within a MoodHistoryProvider');
  }
  return context;
};

interface MoodHistoryProviderProps {
  children: ReactNode;
}

export const MoodHistoryProvider: React.FC<MoodHistoryProviderProps> = ({ children }) => {
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>(() => {
    // Load from localStorage on initialization
    const savedHistory = localStorage.getItem('moodHistory');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });
  
  useEffect(() => {
    // Save to localStorage whenever history changes
    localStorage.setItem('moodHistory', JSON.stringify(moodHistory));
  }, [moodHistory]);
  
  const addMoodEntry = (entry: MoodEntry) => {
    setMoodHistory(prev => [...prev, entry]);
  };
  
  const clearMoodHistory = () => {
    setMoodHistory([]);
  };
  
  return (
    <MoodHistoryContext.Provider value={{ moodHistory, addMoodEntry, clearMoodHistory }}>
      {children}
    </MoodHistoryContext.Provider>
  );
};