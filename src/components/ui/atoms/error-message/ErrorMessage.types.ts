export interface ErrorMessageProps {
  message?: string | null;
  variant?: ErrorMessageVariant;
  className?: string;
}

export const errorMessageVariants = {
  default: "bg-red-100 border border-red-400 text-red-700",
  y2k: "bg-[var(--y2k-silver)] border border-[var(--y2k-magenta)] text-[var(--y2k-magenta)]",
} as const;

export type ErrorMessageVariant = keyof typeof errorMessageVariants;
