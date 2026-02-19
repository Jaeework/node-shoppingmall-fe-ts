import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/ui/atoms/input/Input";
import Button from "../../../components/ui/atoms/button/Button";
import ErrorMessage from "../../../components/ui/atoms/error-message/ErrorMessage";
import { useAppDispatch, useAppSelector } from "../../../features/hooks";
import { registerUser } from "../../../features/user/userSlice";

interface FormValues {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

function SignUpForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { registrationError } = useAppSelector((state) => state.user);

  const [values, setValues] = useState<FormValues>({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [policy, setPolicy] = useState(false);
  const [policyError, setPolicyError] = useState(false);

  const handleChange = (key: keyof FormValues) => (value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (key === "confirmPassword" && passwordError) setPasswordError("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (values.password !== values.confirmPassword) {
      setPasswordError("비밀번호 중복확인이 일치하지 않습니다.");
      return;
    }
    if (!policy) {
      setPolicyError(true);
      return;
    }
    setPasswordError("");
    setPolicyError(false);
    dispatch(
      registerUser({
        name: values.name,
        email: values.email,
        password: values.password,
        navigate,
      })
    );
  };

  return (
    <div className="w-full max-w-md mx-auto px-8">
      <ErrorMessage message={registrationError} variant="y2k" className="mb-4" />

      <h2 className="text-2xl font-bold font-heading text-[var(--foreground)] mb-8">
        SIGN UP
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="EMAIL"
          type="email"
          size="lg"
          placeholder="username@email.com"
          required
          onValueChange={handleChange("email")}
        />
        <Input
          label="NAME"
          type="text"
          size="lg"
          placeholder="name"
          required
          onValueChange={handleChange("name")}
        />
        <Input
          label="PASSWORD"
          type="password"
          size="lg"
          placeholder="password"
          required
          onValueChange={handleChange("password")}
        />

        <div className="flex flex-col gap-1">
          <Input
            label="CONFIRM PASSWORD"
            type="password"
            size="lg"
            placeholder="re-enter password"
            required
            onValueChange={handleChange("confirmPassword")}
          />
          {passwordError && (
            <p className="text-red-500 text-xs">{passwordError}</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="policy"
            checked={policy}
            onChange={(e) => {
              setPolicy(e.target.checked);
              if (policyError) setPolicyError(false);
            }}
            className="h-4 w-4 rounded border-gray-300"
          />
          <label
            htmlFor="policy"
            className="text-sm text-[var(--foreground)]"
          >
            이용약관에 동의합니다
          </label>
          {policyError && (
            <span className="text-red-500 text-xs">동의가 필요합니다</span>
          )}
        </div>

        <Button type="submit" size="lg" variant="purple-gradient" isFullWidth>
          <span className="font-heading italic text-[var(--background)]">
            SIGN UP
          </span>
        </Button>

        <p className="text-center font-monoplex text-xs text-[var(--foreground)]">
          이미 계정이 있으신가요?{" "}
          <a
            href="/login"
            className="text-gray-600 hover:text-gray-500 underline"
          >
            로그인
          </a>
        </p>
      </form>
    </div>
  );
}

export default SignUpForm;
