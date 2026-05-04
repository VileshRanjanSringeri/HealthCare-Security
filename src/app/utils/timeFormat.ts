/**
 * Time formatting utilities for HealthCare-Security Dashboard
 * Converts all times to 12-hour format with AM/PM
 */

/**
 * Format time in 12-hour format with AM/PM
 * @param date - Date object to format
 * @returns Formatted time string (e.g., "2:30:45 PM")
 */
export function formatTime12Hour(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
}

/**
 * Format time in 12-hour format without seconds
 * @param date - Date object to format
 * @returns Formatted time string (e.g., "2:30 PM")
 */
export function formatTime12HourShort(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

/**
 * Format date in readable format
 * @param date - Date object to format
 * @returns Formatted date string (e.g., "Jan 16, 2026")
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

/**
 * Format date in long format
 * @param date - Date object to format
 * @returns Formatted date string (e.g., "Friday, January 16, 2026")
 */
export function formatDateLong(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Format date in short format with weekday
 * @param date - Date object to format
 * @returns Formatted date string (e.g., "Fri, Jan 16, 2026")
 */
export function formatDateShort(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}
