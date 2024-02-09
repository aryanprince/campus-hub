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
