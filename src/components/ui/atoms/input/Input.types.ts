export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  type?: React.HTMLInputTypeAttribute;
  size?: InputSize;
  label?: string;
  placeholder?: string;
  onValueChange?: (value: string) => void;
}

export const inputSizes = {
  xs: "h-5 px-2 text-xs",
  sm: "h-6 px-3 text-xs",
  md: "h-8 px-4 text-sm",
  lg: "h-10 px-4 text-base",
  xl: "h-12 px-4 text-lg",
} as const;

export type InputSize = keyof typeof inputSizes;
