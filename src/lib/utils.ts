import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getErrorMessage = (error: any) => {
  return {
    message: `Error occured: ${error?.message || "Unknown error"}`,
    cause: error?.cause || null,
    hint: error?.hint || null,
    code: error?.code || null,

  }

}
