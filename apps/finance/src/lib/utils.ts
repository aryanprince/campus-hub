import type { ClassValue } from "clsx";
import { clsx } from "clsx";
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

/**
 * Utility function to normalize a string from KEBAB_CASE to Title Case
 *
 * @param str  The string to normalize
 * @returns The normalized string
 */
export function normalizeString(str: string | null) {
  if (!str) {
    return "";
  }

  // Split the string into an array of words
  const words = str.split("_");

  // Capitalize the first letter of each word
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
  );

  // Join the words back into a single string
  const normalizedStr = capitalizedWords.join(" ");

  return normalizedStr;
}
