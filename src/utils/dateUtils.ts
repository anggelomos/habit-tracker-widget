import type { CurrentDate } from '../models';

/**
 * Get the current date adjusted for UTC-5 timezone
 */
export function getCurrentDateUTC5(): Date {
  const now = new Date();
  // Get UTC time and adjust by -5 hours
  const utcOffset = now.getTimezoneOffset() * 60000; // Convert to milliseconds
  const utcTime = now.getTime() + utcOffset;
  const utc5Time = utcTime - (5 * 60 * 60 * 1000); // Subtract 5 hours
  return new Date(utc5Time);
}

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

