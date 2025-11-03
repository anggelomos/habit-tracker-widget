import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { CurrentDate, Habits, TimeStats } from '../models';
import { getHabits, getTimeStats } from '../api';
import { getCurrentDateUTC5, createCurrentDate } from '../utils/dateUtils';
import {
  saveCurrentDate,
  loadCurrentDate,
  saveCurrentHabits,
  loadCurrentHabits,
  saveCurrentTimeStats,
  loadCurrentTimeStats,
} from '../utils/storage';

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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    // Get current date with UTC-5
    const dateUTC5 = getCurrentDateUTC5();
    const currentDateObj = createCurrentDate(dateUTC5);

    // Save to localStorage
    saveCurrentDate(currentDateObj);
    setCurrentDate(currentDateObj);

    try {
      setIsLoading(true);
      setError(null);

      // Fetch habits and time stats in parallel
      const [habitsData, timeStatsData] = await Promise.all([
        getHabits(dateUTC5),
        getTimeStats(dateUTC5),
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
      setIsLoading(false);
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

  const refreshData = async () => {
    await fetchData();
  };

  const updateCurrentHabits = (habits: Habits) => {
    setCurrentHabits(habits);
    saveCurrentHabits(habits);
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

