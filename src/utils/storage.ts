import type { CurrentDate, Habits, TimeStats } from '../models';

const STORAGE_KEYS = {
  CURRENT_DATE: 'currentDate',
  CURRENT_HABITS: 'currentHabits',
  CURRENT_TIME_STATS: 'currentTimeStats',
} as const;

// ==================== CurrentDate Storage ====================

export function saveCurrentDate(currentDate: CurrentDate): void {
  try {
    // Validate currentDate object and date
    if (!currentDate || !currentDate.date) {
      console.warn('Invalid currentDate object provided to saveCurrentDate');
      return;
    }

    // Ensure date is a Date object
    const dateValue = currentDate.date instanceof Date && !isNaN(currentDate.date.getTime())
      ? currentDate.date.toISOString()
      : new Date().toISOString();

    localStorage.setItem(
      STORAGE_KEYS.CURRENT_DATE,
      JSON.stringify({
        ...currentDate,
        date: dateValue,
      })
    );
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
    // Validate habits object and date
    if (!habits || !habits.date) {
      console.warn('Invalid habits object provided to saveCurrentHabits');
      return;
    }

    // Ensure date is a Date object
    const dateValue = habits.date instanceof Date && !isNaN(habits.date.getTime())
      ? habits.date.toISOString()
      : new Date().toISOString();

    localStorage.setItem(
      STORAGE_KEYS.CURRENT_HABITS,
      JSON.stringify({
        ...habits,
        date: dateValue,
        brushSessions: (habits.brushSessions || []).map(session => ({
          ...session,
          timestamp: session?.timestamp instanceof Date && !isNaN(session.timestamp.getTime())
            ? session.timestamp.toISOString()
            : new Date().toISOString(),
        })),
        waterIntakes: (habits.waterIntakes || []).map(intake => ({
          ...intake,
          timestamp: intake?.timestamp instanceof Date && !isNaN(intake.timestamp.getTime())
            ? intake.timestamp.toISOString()
            : new Date().toISOString(),
        })),
        habitCheckins: (habits.habitCheckins || []).map(checkin => ({
          ...checkin,
          timestamp: checkin?.timestamp instanceof Date && !isNaN(checkin.timestamp.getTime())
            ? checkin.timestamp.toISOString()
            : new Date().toISOString(),
        })),
      })
    );
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
    localStorage.setItem(STORAGE_KEYS.CURRENT_TIME_STATS, JSON.stringify(timeStats));
  } catch (error) {
    console.error('Failed to save time stats to localStorage:', error);
  }
}

export function loadCurrentTimeStats(): TimeStats | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.CURRENT_TIME_STATS);
    if (!stored) return null;
    
    return JSON.parse(stored);
  } catch (error) {
    console.error('Failed to load time stats from localStorage:', error);
    return null;
  }
}

