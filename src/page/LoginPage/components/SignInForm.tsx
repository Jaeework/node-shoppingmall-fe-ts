import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import AuthForm from "../../../components/ui/molecules/auth-form/AuthForm";
import ErrorMessage from "../../../components/ui/atoms/error-message/ErrorMessage";
import { useAppDispatch, useAppSelector } from "../../../features/hooks";
import {
  loginWithEmail,
  loginWithGoogle,
  clearErrors,
} from "../../../features/user/userSlice";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID ?? "";

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
        link={{ href: "/register", text: "회원가입이 필요하신가요?", label: "회원가입" }}
      />

      <div className="w-full max-w-md mx-auto px-8">
        <p className="text-sm text-gray-500 mb-3 text-center">
          -외부 계정으로 로그인하기-
        </p>
        <div className="flex justify-center">
          <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => console.log("Login Failed")}
            />
          </GoogleOAuthProvider>
        </div>
      </div>

      <div className="w-full max-w-md mx-auto px-8 bg-gray-100 p-4 rounded text-center">
        <h3 className="font-bold text-gray-700 mb-2">테스트 계정</h3>
        <p className="text-sm text-gray-600">email: hong@email.com</p>
        <p className="text-sm text-gray-600">password: asdf</p>
      </div>
    </div>
  );
}

export default SignInForm;
