import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFirstName(fullName: string) {
  return fullName.split(" ")[0];
}

/**
 * Utility function to generate a random student ID
 *
 * @returns A random 8-digit string, starting with "c"
 */
export function generateRandomStudentId() {
  return `c${Math.random().toString().substring(2, 9)}`;
}
