import React from "react";
import { type InputProps, inputSizes } from "./Input.types";

function Input({
  type = "text",
  size = "md",
  placeholder,
  readOnly = false,
  label,
  onValueChange,
  className = "",
  onChange,
  ...props
}: InputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onValueChange?.(newValue);
    onChange?.(e);
  };

  const combinedClassName = [
    "w-full px-3 py-3 font-monoplex bg-gray-200 rounded-lg border border-gray-200 shadow-inner",
    "focus:border-purple-400 focus:outline-none transition-colors duration-200 placeholder:text-gray-500",
    readOnly ? "cursor-not-allowed" : "hover:border-gray-300",
    inputSizes[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm text-[var(--foreground)] font-heading">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          className={combinedClassName}
          onChange={handleChange}
          readOnly={readOnly}
          {...props}
        />
      </div>
    </div>
  );
}

export default Input;
