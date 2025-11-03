import type { Habits, TimeStats } from './models';

// Base API URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

// ==================== Habits Endpoints ====================

/**
 * GET /api/habits
 * Fetch habits data for a specific date
 */
export async function getHabits(date: Date): Promise<Habits> {
  const dateParam = date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  const response = await fetch(`${API_BASE_URL}/api/habits?date=${dateParam}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch habits: ${response.statusText}`);
  }
  
  const data = await response.json();
  
  // Parse date strings into Date objects
  return {
    ...data,
    date: data.date ? new Date(data.date) : new Date(),
    brushSessions: (data.brushSessions || []).map((session: any) => ({
      ...session,
      timestamp: session.timestamp ? new Date(session.timestamp) : new Date(),
    })),
    waterIntakes: (data.waterIntakes || []).map((intake: any) => ({
      ...intake,
      timestamp: intake.timestamp ? new Date(intake.timestamp) : new Date(),
    })),
    habitCheckins: (data.habitCheckins || []).map((checkin: any) => ({
      ...checkin,
      timestamp: checkin.timestamp ? new Date(checkin.timestamp) : new Date(),
    })),
  };
}

/**
 * POST /api/habits
 * Create or update habits data
 */
export async function saveHabits(habits: Habits): Promise<Habits> {
  const response = await fetch(`${API_BASE_URL}/api/habits`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(habits),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to save habits: ${response.statusText}`);
  }
  
  return response.json();
}

// ==================== Set Tasks Endpoint ====================

/**
 * POST /api/set-tasks/day
 * Set tasks for a specific day
 */
export async function setTasksDay(date: Date): Promise<void> {
  const dateParam = date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  const response = await fetch(`${API_BASE_URL}/api/set-tasks/day`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ "date": dateParam }),
  });

  if (!response.ok) {
    throw new Error(`Failed to set tasks: ${response.statusText}`);
  }
}

// ==================== Time Stats Endpoint ====================

/**
 * GET /api/time-stats
 * Fetch time statistics
 */
export async function getTimeStats(date?: Date): Promise<TimeStats> {
  const url = new URL(`${API_BASE_URL}/api/time-stats`);
  
  if (date) {
    const dateParam = date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    url.searchParams.append('date', dateParam);
  }
  
  const response = await fetch(url.toString());
  
  if (!response.ok) {
    throw new Error(`Failed to fetch time stats: ${response.statusText}`);
  }
  
  const data = await response.json();
  
  // Parse date string into Date object
  return {
    ...data,
    date: data.date ? new Date(data.date) : new Date(),
  };
}

