import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import AuthForm from "../../../components/ui/molecules/auth-form/AuthForm";
import ErrorMessage from "../../../components/ui/atoms/error-message/ErrorMessage";
import { useAppDispatch, useAppSelector } from "../../../features/hooks";
import {
  loginWithEmail,
  loginWithGoogle,
  clearErrors,
} from "../../../features/user/userSlice";

const signInFields = [
  {
    key: "email",
    label: "IDENTITY",
    type: "email",
    placeholder: "username@email.com",
    required: true,
  },
  {
    key: "password",
    label: "PASSCODE",
    type: "password",
    placeholder: "password",
    required: true,
    inputProps: {autoComplete: "current-password"},
  },
];

function SignInForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, loginError } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (loginError) dispatch(clearErrors());
  }, [navigate]);

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const handleSubmit = (values: Record<string, string>) => {
    dispatch(loginWithEmail({ email: values.email, password: values.password }));
  };

  const handleGoogleLogin = (credentialResponse: { credential?: string }) => {
    if (credentialResponse.credential) {
      dispatch(loginWithGoogle(credentialResponse.credential));
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <div className="w-full max-w-md mx-auto px-8">
        <ErrorMessage message={loginError} variant="y2k" />
      </div>

      <AuthForm
        title="SIGN IN"
        fields={signInFields}
        onSubmit={handleSubmit}
        submitLabel="SIGN IN"
        link={{ href: "/register", text: "아직 계정이 없으신가요?", label: "회원가입" }}
      />

      <div className="w-full max-w-md mx-auto px-8">
        <p className="text-sm text-gray-500 mb-3 text-center font-orbit font-semibold">
          - OR -
        </p>
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
          />
        </div>
      </div>
    </div>
  );
}

export default SignInForm;
