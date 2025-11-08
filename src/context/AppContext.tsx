import { createContext, useContext, useState, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import type { CurrentDate, Habits, TimeStats } from '../models';
import { getHabits, getTimeStats, saveHabits } from '../api';
import { createCurrentDate } from '../utils/dateUtils';
import {
  saveCurrentDate,
  loadCurrentDate,
  saveCurrentHabits,
  loadCurrentHabits,
  saveCurrentTimeStats,
  loadCurrentTimeStats,
} from '../utils/storage';

// Configuration: Debounce time for saving habits to API (in milliseconds)
// This prevents race conditions when multiple buttons are clicked rapidly
const HABITS_SAVE_DEBOUNCE_MS = 2000; // 2 seconds

interface AppContextState {
  currentDate: CurrentDate | null;
  currentHabits: Habits | null;
  currentTimeStats: TimeStats | null;
  isLoading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
  updateCurrentHabits: (habits: Habits) => void;
  setCurrentDate: (date: Date) => Promise<void>;
}

const AppContext = createContext<AppContextState | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [currentDate, setCurrentDate] = useState<CurrentDate | null>(null);
  const [currentHabits, setCurrentHabits] = useState<Habits | null>(null);
  const [currentTimeStats, setCurrentTimeStats] = useState<TimeStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Ref to store the debounce timer for saving habits
  const saveHabitsTimerRef = useRef<number | null>(null);
  // Ref to store the latest habits that need to be saved
  const pendingHabitsRef = useRef<Habits | null>(null);

  const fetchData = async (showLoading = false) => {
    const currentDate = new Date();
    const currentDateObj = createCurrentDate(currentDate);

    // Save to localStorage
    saveCurrentDate(currentDateObj);
    setCurrentDate(currentDateObj);

    try {
      if (showLoading) {
        setIsLoading(true);
      }
      setError(null);

      // Fetch habits and time stats in parallel
      const [habitsData, timeStatsData] = await Promise.all([
        getHabits(currentDate),
        getTimeStats(currentDate),
      ]);

      // Save to localStorage
      saveCurrentHabits(habitsData);
      saveCurrentTimeStats(timeStatsData);

      // Update state
      setCurrentHabits(habitsData);
      setCurrentTimeStats(timeStatsData);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch data";
      console.error("Error fetching app data:", err);
      setError(errorMessage);

      // Try to load from localStorage as fallback
      const storedDate = loadCurrentDate();
      let storedHabits = loadCurrentHabits();
      let storedTimeStats = loadCurrentTimeStats();

      // If no habits in storage, create and store empty object
      if (!storedHabits) {
        storedHabits = {
          date: currentDateObj.date,
          brushSessions: [],
          waterIntakes: [],
          habitCheckins: [],
        };
        saveCurrentHabits(storedHabits);
      }

      // If no time stats in storage, create and store empty object
      if (!storedTimeStats) {
        storedTimeStats = {
          date: currentDateObj.date,
          focusedTimeWork: 0,
          focusedTimePersonal: 0,
          focusedTimeRescuetime: 0,
          leisureTime: 0,
        };
        saveCurrentTimeStats(storedTimeStats);
      }

      if (storedDate) setCurrentDate(storedDate);
      if (storedHabits) setCurrentHabits(storedHabits);
      if (storedTimeStats) setCurrentTimeStats(storedTimeStats);
    } finally {
      if (showLoading) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    // Load from localStorage first for instant display
    const storedDate = loadCurrentDate();
    const storedHabits = loadCurrentHabits();
    const storedTimeStats = loadCurrentTimeStats();

    if (storedDate) setCurrentDate(storedDate);
    if (storedHabits) setCurrentHabits(storedHabits);
    if (storedTimeStats) setCurrentTimeStats(storedTimeStats);

    // Then fetch fresh data
    fetchData();
  }, []);

  // Auto-refresh data every 10 minutes
  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log('Auto-refreshing data (10 min interval)...');
      fetchData();
    }, 10 * 60 * 1000); // 10 minutes in milliseconds

    // Cleanup interval on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // Cleanup: Save any pending habits immediately on unmount
  useEffect(() => {
    return () => {
      if (saveHabitsTimerRef.current !== null) {
        clearTimeout(saveHabitsTimerRef.current);
      }
      // Save immediately if there are pending changes
      if (pendingHabitsRef.current) {
        saveHabits(pendingHabitsRef.current).catch((error) => {
          console.error('Failed to save pending habits on unmount:', error);
        });
      }
    };
  }, []);

  const refreshData = async () => {
    await fetchData();
  };

  const updateCurrentHabits = (habits: Habits) => {
    // Update local state immediately (optimistic update)
    setCurrentHabits(habits);
    saveCurrentHabits(habits);
    
    // Store the pending habits
    pendingHabitsRef.current = habits;
    
    // Clear any existing timer
    if (saveHabitsTimerRef.current !== null) {
      clearTimeout(saveHabitsTimerRef.current);
    }
    
    // Set up a new debounced save to API
    saveHabitsTimerRef.current = window.setTimeout(async () => {
      if (pendingHabitsRef.current) {
        try {
          await saveHabits(pendingHabitsRef.current);
          console.log('Habits saved to API (debounced)');
        } catch (error) {
          console.error('Failed to save habits to API:', error);
        } finally {
          pendingHabitsRef.current = null;
          saveHabitsTimerRef.current = null;
        }
      }
    }, HABITS_SAVE_DEBOUNCE_MS);
  };

  const setCurrentDateAndFetch = async (date: Date) => {
    // Create new current date object
    const currentDateObj = createCurrentDate(date);

    // Save to localStorage
    saveCurrentDate(currentDateObj);
    setCurrentDate(currentDateObj);

    try {
      setIsLoading(true);
      setError(null);

      // Fetch habits and time stats for the new date
      const [habitsData, timeStatsData] = await Promise.all([
        getHabits(date),
        getTimeStats(date),
      ]);

      // Save to localStorage
      saveCurrentHabits(habitsData);
      saveCurrentTimeStats(timeStatsData);

      // Update state
      setCurrentHabits(habitsData);
      setCurrentTimeStats(timeStatsData);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch data";
      console.error("Error fetching data for new date:", err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const value: AppContextState = {
    currentDate,
    currentHabits,
    currentTimeStats,
    isLoading,
    error,
    refreshData,
    updateCurrentHabits,
    setCurrentDate: setCurrentDateAndFetch,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

