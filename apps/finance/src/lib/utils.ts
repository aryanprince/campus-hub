import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Utility function to generate a random reference string, used for invoice references
 *
 * @returns A random 10-character uppercase string
 */
export function generateRandomReferenceString() {
  return Math.random().toString(36).substring(2, 12).toUpperCase();
}

/**
 * Utility function to generate a random student ID
 *
 * @returns A random 8-digit string, starting with "c"
 */
export function generateRandomStudentId() {
  return `c${Math.random().toString().substring(2, 10)}`;
}

/**
 * Utility function to sleep for a given number of seconds
 *
 * @param seconds  The number of seconds to sleep for
 * @returns A promise that resolves after the given number of seconds
 */
export function sleep(seconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
}
