import {
  type ButtonProps,
  buttonRadius,
  buttonSizes,
  buttonVariants,
} from "./Button.types";

function Button({
  children,
  size = "md",
  variant = "purple-gradient",
  radius = "pill",
  isFullWidth = false,
  className = "",
  onClick,
  ...props
}: ButtonProps) {
  const combinedClassName = [
    "inline-flex items-center justify-center transition-all duration-200",
    "hover:scale-[1.02] focus:scale-[0.95]",
    buttonVariants[variant] ?? "",
    buttonSizes[size] ?? "",
    buttonRadius[radius] ?? "",
    isFullWidth ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={combinedClassName} onClick={onClick} {...props}>
      {children}
    </button>
  );
}

export default Button;
