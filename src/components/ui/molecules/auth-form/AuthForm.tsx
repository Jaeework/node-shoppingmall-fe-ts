import React, { useState } from "react";
import { Link } from "react-router-dom";
import type { AuthFormProps } from "./AuthForm.types";
import Input from "../../atoms/input/Input";
import Button from "../../atoms/button/Button";

function AuthForm({
  title,
  fields,
  onSubmit,
  submitLabel,
  submitVariant = "purple-gradient",
  link,
  loading = false,
}: AuthFormProps) {
  const [values, setValues] = useState<Record<string, string>>({});

  const handleInputChange = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-8 px-8">
      <h2 className="text-2xl font-bold font-heading text-[var(--foreground)]">
        {title}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        {fields.map((field) => (
          <Input
            key={field.key}
            label={field.label}
            type={field.type}
            size="lg"
            placeholder={field.placeholder}
            required={field.required ?? false}
            onValueChange={(value) => handleInputChange(field.key, value)}
          />
        ))}

        <Button
          type="submit"
          size="lg"
          variant={submitVariant}
          disabled={loading}
        >
          {loading ? (
            "처리중..."
          ) : (
            <span className="font-heading italic text-[var(--background)]">
              {submitLabel}
            </span>
          )}
        </Button>

        {link && (
          <p className="text-center font-monoplex text-xs text-[var(--foreground)]">
            {link.text}{" "}
            <Link
              to={link.href}
              className="text-gray-600 hover:text-gray-500 underline"
            >
              {link.label}
            </Link>
          </p>
        )}
      </form>
    </div>
  );
}

export default AuthForm;
