import {
  type ErrorMessageProps,
  errorMessageVariants,
} from "./ErrorMessage.types";

function ErrorMessage({
  message,
  variant = "default",
  className = "",
}: ErrorMessageProps) {
  if (!message) return null;

  const combinedClassName = [
    "px-4 py-3 rounded text-sm",
    errorMessageVariants[variant] ?? "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={combinedClassName}>{message}</div>;
}

export default ErrorMessage;
