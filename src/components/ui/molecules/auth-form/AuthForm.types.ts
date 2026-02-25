import type { ButtonVariant } from "../../atoms/button/Button.types";

export interface AuthFormField {
  key: string;
  label: string;
  type: React.HTMLInputTypeAttribute;
  placeholder: string;
  required?: boolean;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

export interface AuthFormProps {
  title: string;
  fields: AuthFormField[];
  onSubmit: (data: Record<string, string>) => void;
  submitLabel: string;
  submitVariant?: ButtonVariant;
  link?: { href: string; text: string; label: string };
  loading?: boolean;
}
