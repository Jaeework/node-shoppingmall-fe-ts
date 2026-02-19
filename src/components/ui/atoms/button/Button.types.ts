export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: ButtonSize;
  variant?: ButtonVariant;
  radius?: ButtonRadius;
  isFullWidth?: boolean;
}

export const buttonSizes = {
  xs: "h-5 px-2 text-xs",
  sm: "h-6 px-3 text-xs",
  md: "h-8 px-4 text-sm",
  lg: "h-10 px-4 text-base",
  xl: "h-12 px-4 text-lg",
} as const;
export type ButtonSize = keyof typeof buttonSizes;

export const buttonVariants = {
  purple: "bg-[var(--y2k-purple)] cursor-pointer",
  "purple-deep": "bg-[var(--y2k-purple-deep)] cursor-pointer",
  "purple-vivid": "bg-[var(--y2k-purple-vivid)] cursor-pointer",
  magenta: "bg-[var(--y2k-magenta)] cursor-pointer",
  "magenta-vivid": "bg-[var(--y2k-magenta-vivid)] cursor-pointer",
  chrome: "bg-[var(--y2k-chrome)] cursor-pointer",
  silver: "bg-[var(--y2k-silver)] cursor-pointer",
  black: "bg-[var(--y2k-black)] cursor-pointer",
  grey: "bg-[var(--y2k-grey)] cursor-pointer",
  ghost: "bg-transparent border-0 cursor-pointer",
  disable: "bg-gray-300 cursor-not-allowed",
  outline: "border border-[var(--foreground)] text-[var(--background)] cursor-pointer",
  "purple-gradient":
    "bg-gradient-to-r from-[var(--y2k-purple)] to-[var(--y2k-purple-vivid)] cursor-pointer",
  "magenta-gradient":
    "bg-gradient-to-r from-[var(--y2k-magenta)] to-[var(--y2k-magenta-vivid)] cursor-pointer",
  "rainbow-gradient":
    "bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 cursor-pointer",
} as const;
export type ButtonVariant = keyof typeof buttonVariants;

export const buttonRadius = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  pill: "rounded-full",
} as const;
export type ButtonRadius = keyof typeof buttonRadius;
