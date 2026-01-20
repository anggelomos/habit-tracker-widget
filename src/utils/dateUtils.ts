import type { CurrentDate } from '../models';

// ==================== Date Formatting Utilities ====================

/**
 * Format a Date as YYYY-MM-DD in the local timezone
 * (unlike toISOString() which converts to UTC first)
 */
export function toLocalISODate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Format a Date as ISO 8601 string in the local timezone
 * (unlike toISOString() which converts to UTC first)
 */
export function toLocalISOString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const ms = String(date.getMilliseconds()).padStart(3, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${ms}`;
}

/**
 * JSON.stringify that converts Date objects to local ISO strings
 * instead of UTC (which is the default behavior of Date.toJSON()).
 * 
 * This solves the root cause: JSON.stringify calls Date.toJSON() BEFORE
 * any replacer function sees the value, so replacer-based approaches fail.
 */
export function jsonStringifyLocal(value: unknown): string {
  const originalToJSON = Date.prototype.toJSON;
  
  // Temporarily override Date.prototype.toJSON to use local timezone
  Date.prototype.toJSON = function() {
    return toLocalISOString(this);
  };
  
  try {
    return JSON.stringify(value);
  } finally {
    // Restore the original toJSON
    Date.prototype.toJSON = originalToJSON;
  }
}

// ==================== Date Calculation Utilities ====================

/**
 * Get the day of the year (1-366)
 */
function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

/**
 * Get the week of the year (1-53)
 */
function getWeekOfYear(date: Date): number {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

/**
 * Create a CurrentDate object from a Date
 */
export function createCurrentDate(date: Date): CurrentDate {
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  return {
    date: date,
    weekday: weekdays[date.getDay()],
    formattedDate: `${String(date.getDate()).padStart(2, '0')} ${months[date.getMonth()]}`,
    dayOfYear: getDayOfYear(date),
    weekOfYear: getWeekOfYear(date),
  };
}

