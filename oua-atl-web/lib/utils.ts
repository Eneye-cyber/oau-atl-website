import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculatePercentage(current: number, target: number) {
  if (target === 0) return 0; // Avoid division by zero
  return (current / target) * 100;
}

export const debounce = <T extends (...args: any[]) => void>(func: T, delay: number): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

export function calculateTimeDifference(dateString: string): string {
  const inputDate = new Date(dateString);
  const currentDate = new Date();

  if (isNaN(inputDate.getTime())) {
    throw new Error("Invalid date string");
  }

  // Calculate the difference in milliseconds
  const diffInMilliseconds = currentDate.getTime() - inputDate.getTime();

  if (diffInMilliseconds < 0) {
    return "The date is in the future.";
  }

  // Calculate the difference in days
  const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

  // Calculate the difference in months
  const diffInMonths =
    currentDate.getFullYear() * 12 +
    currentDate.getMonth() -
    (inputDate.getFullYear() * 12 + inputDate.getMonth());

  // If the difference is less than a month, return the difference in days
  if (diffInMonths < 1) {
    return `${diffInDays} days ago`;
  }

  // Otherwise, return the difference in months
  return `${diffInMonths} months ago`;
}

// Example usage
// const dateStr = "2025-11-27T17:56:22.092Z";
// console.log(calculateTimeDifference(dateStr));


export function formatDateForInput(dateString: string) {
  if (!dateString) return '';
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function formatDate (d: string | Date): string {
  const date = new Date(d);
  
  // If the date is invalid, return the original string
  if (isNaN(date.getTime())) {
    return String(d);  // Ensure it's a string even if d isn't a valid date
  }

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'short', // 'short' | 'long' | 'narrow'
    year: 'numeric',
    month: 'short', // '2-digit' | 'long' | 'short' | 'narrow'
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(date);
  
  return formattedDate;
}

export function formatEventDates(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };

  // If the start and end dates are the same
  if (
    start.getFullYear() === end.getFullYear() &&
    start.getMonth() === end.getMonth() &&
    start.getDate() === end.getDate()
  ) {
    return start.toLocaleDateString('en-US', {
      ...options,
      year: 'numeric',
    });
  }

  if (start.getFullYear() !== end.getFullYear()) {
    // If the years are different, show full range
    return `${start.toLocaleDateString('en-US', {
      ...options,
      year: 'numeric',
    })} - ${end.toLocaleDateString('en-US', {
      ...options,
      year: 'numeric',
    })}`;
  }

  if (start.getMonth() !== end.getMonth()) {
    // If the months are different but in the same year
    return `${start.toLocaleDateString('en-US', options)} - ${end.toLocaleDateString('en-US', {
      ...options,
      year: 'numeric',
    })}`;
  }

  // Same month and year
  return `${start.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
  })} - ${end.getDate()}, ${end.getFullYear()}`;
}

// // Example usage
// console.log(formatEventDates('2024-08-05T15:28:00+00:00', '2024-08-05T15:28:00+00:00')); // "August 5, 2024"
// console.log(formatEventDates('2024-04-05T21:12:00+00:00', '2024-08-05T15:28:00+00:00')); // "April 5 - August 5, 2024"


export function formatEventTimes(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const options: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: '2-digit', hour12: true };

  // Check if the dates are on the same day, month, and year
  if (
    start.getFullYear() === end.getFullYear() &&
    start.getMonth() === end.getMonth() &&
    start.getDate() === end.getDate()
  ) {
    // Return the time range if start and end times are different
    if (start.getTime() !== end.getTime()) {
      return `${start.toLocaleTimeString('en-US', options)} - ${end.toLocaleTimeString('en-US', options)}`;
    }
    // Return just the start time if times are the same
    return start.toLocaleTimeString('en-US', options);
  }

  // If not on the same day, just return the start date's time
  return start.toLocaleTimeString('en-US', options);
}

// Example usage
// console.log(formatEventTimes('2024-08-05T09:00:00+00:00', '2024-08-05T17:00:00+00:00')); // "9:00 AM - 5:00 PM"
// console.log(formatEventTimes('2024-08-05T09:00:00+00:00', '2024-08-05T09:00:00+00:00')); // "9:00 AM"
// console.log(formatEventTimes('2024-04-05T21:12:00+00:00', '2024-08-05T15:28:00+00:00')); // "9:12 PM"
