import type { CurrentDate, Habits, TimeStats } from '../models';
import { jsonStringifyLocal } from './dateUtils';

const STORAGE_KEYS = {
  CURRENT_DATE: 'currentDate',
  CURRENT_HABITS: 'currentHabits',
  CURRENT_TIME_STATS: 'currentTimeStats',
} as const;

// ==================== CurrentDate Storage ====================

export function saveCurrentDate(currentDate: CurrentDate): void {
  try {
    if (!currentDate || !currentDate.date) {
      console.warn('Invalid currentDate object provided to saveCurrentDate');
      return;
    }

    // jsonStringifyLocal automatically converts Date objects to local timezone
    localStorage.setItem(STORAGE_KEYS.CURRENT_DATE, jsonStringifyLocal(currentDate));
  } catch (error) {
    console.error('Failed to save current date to localStorage:', error);
  }
}

export function loadCurrentDate(): CurrentDate | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.CURRENT_DATE);
    if (!stored) return null;
    
    const parsed = JSON.parse(stored);
    return {
      ...parsed,
      date: new Date(parsed.date),
    };
  } catch (error) {
    console.error('Failed to load current date from localStorage:', error);
    return null;
  }
}

// ==================== Habits Storage ====================

export function saveCurrentHabits(habits: Habits): void {
  try {
    if (!habits || !habits.date) {
      console.warn('Invalid habits object provided to saveCurrentHabits');
      return;
    }

    // jsonStringifyLocal automatically converts all Date objects to local timezone
    localStorage.setItem(STORAGE_KEYS.CURRENT_HABITS, jsonStringifyLocal(habits));
  } catch (error) {
    console.error('Failed to save habits to localStorage:', error);
  }
}

export function loadCurrentHabits(): Habits | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.CURRENT_HABITS);
    if (!stored) return null;
    
    const parsed = JSON.parse(stored);
    return {
      ...parsed,
      date: new Date(parsed.date),
      brushSessions: parsed.brushSessions.map((session: any) => ({
        ...session,
        timestamp: new Date(session.timestamp),
      })),
      waterIntakes: parsed.waterIntakes.map((intake: any) => ({
        ...intake,
        timestamp: new Date(intake.timestamp),
      })),
      habitCheckins: parsed.habitCheckins.map((checkin: any) => ({
        ...checkin,
        timestamp: new Date(checkin.timestamp),
      })),
    };
  } catch (error) {
    console.error('Failed to load habits from localStorage:', error);
    return null;
  }
}

// ==================== TimeStats Storage ====================

export function saveCurrentTimeStats(timeStats: TimeStats): void {
  try {
    if (!timeStats || !timeStats.date) {
      console.warn('Invalid timeStats object provided to saveCurrentTimeStats');
      return;
    }

    // jsonStringifyLocal automatically converts Date objects to local timezone
    localStorage.setItem(STORAGE_KEYS.CURRENT_TIME_STATS, jsonStringifyLocal(timeStats));
  } catch (error) {
    console.error('Failed to save time stats to localStorage:', error);
  }
}

export function loadCurrentTimeStats(): TimeStats | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.CURRENT_TIME_STATS);
    if (!stored) return null;
    
    const parsed = JSON.parse(stored);
    return {
      ...parsed,
      date: new Date(parsed.date),
    };
  } catch (error) {
    console.error('Failed to load time stats from localStorage:', error);
    return null;
  }
}
