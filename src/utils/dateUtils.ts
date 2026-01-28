// Date utilities using Day.js with IST timezone
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// Extend dayjs with plugins
dayjs.extend(utc);
dayjs.extend(timezone);

const IST_TIMEZONE = "Asia/Kolkata";

/**
 * Get today's date in IST as YYYY-MM-DD string
 */
export const getTodayIST = (): string => {
  return dayjs().tz(IST_TIMEZONE).format("YYYY-MM-DD");
};

/**
 * Get current date in IST as Day.js object
 */
export const getCurrentDateIST = () => {
  return dayjs().tz(IST_TIMEZONE);
};

/**
 * Calculate the day number since user signup
 * Day 1 = signup date
 */
export const getDayNumber = (signupDate: Date): number => {
  const start = dayjs(signupDate).tz(IST_TIMEZONE).startOf("day");
  const today = dayjs().tz(IST_TIMEZONE).startOf("day");
  return today.diff(start, "day") + 1;
};

/**
 * Format a date for display
 */
export const formatDate = (date: Date | string): string => {
  return dayjs(date).tz(IST_TIMEZONE).format("MMMM D, YYYY");
};

/**
 * Format a date as short format
 */
export const formatDateShort = (date: Date | string): string => {
  return dayjs(date).tz(IST_TIMEZONE).format("MMM D");
};

/**
 * Get all dates between signup and today
 */
export const getDateRange = (signupDate: Date): string[] => {
  const dates: string[] = [];
  const start = dayjs(signupDate).tz(IST_TIMEZONE).startOf("day");
  const today = dayjs().tz(IST_TIMEZONE).startOf("day");

  let current = start;
  while (current.isBefore(today) || current.isSame(today, "day")) {
    dates.push(current.format("YYYY-MM-DD"));
    current = current.add(1, "day");
  }

  return dates;
};

/**
 * Check if a date string is today
 */
export const isToday = (dateString: string): boolean => {
  return dateString === getTodayIST();
};

/**
 * Get the start of the year for heatmap
 */
export const getYearStart = (): string => {
  return dayjs().tz(IST_TIMEZONE).startOf("year").format("YYYY-MM-DD");
};

/**
 * Parse timestamp from Firestore
 */
export const parseFirestoreTimestamp = (timestamp: any): Date => {
  if (timestamp?.toDate) {
    return timestamp.toDate();
  }
  return new Date(timestamp);
};
