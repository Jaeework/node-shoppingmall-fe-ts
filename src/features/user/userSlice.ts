import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Dispatch } from "redux";
import api from "../../utils/api";
import { ApiError } from "../../utils/ApiError";
import { showToastMessage } from "../common/uiSlice";
import { initialCart } from "../cart/cartSlice";
import type { User, UserState } from "../../types/index";

// ─── Thunks ──────────────────────────────────────────────────────────────────

export const loginWithEmail = createAsyncThunk<
  { user: User; token: string },
  { email: string; password: string },
  { rejectValue: string }
>("user/loginWithEmail", async ({ email, password }, { rejectWithValue }) => {
  try {
    if (!email || !password) {
      return rejectWithValue("모든 필드를 입력해주세요.");
    }
    const response = await api.post("/auth/login", { email, password });
    sessionStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    if (error instanceof ApiError && error.isUserError) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("로그인 도중 오류가 발생하였습니다. 관리자에 문의하세요.");
  }
});

export const loginWithGoogle = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>("user/loginWithGoogle", async (_token, { rejectWithValue }) => {
  try {
    // Google login placeholder
  } catch (error) {
    return rejectWithValue("Google 로그인에 실패했습니다.");
  }
});

export const loginWithToken = createAsyncThunk<
  { user: User },
  void,
  { rejectValue: string }
>("user/loginWithToken", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/users/me");
    return response.data;
  } catch (error) {
    return rejectWithValue("토큰 로그인에 실패했습니다.");
  }
});

export const registerUser = createAsyncThunk<
  User,
  { email: string; name: string; password: string; navigate: (path: string) => void },
  { rejectValue: string }
    >(
    "user/registerUser",
    async ({ email, name, password, navigate }, { dispatch, rejectWithValue }) => {
      try {
        if (!email || !name || !password) {
          return rejectWithValue("모든 필드를 입력해주세요.");
        }
        const response = await api.post("/users", { email, name, password });
        dispatch(
          showToastMessage({
            message: "회원가입에 성공했습니다. 로그인 해주세요.",
            status: "success",
          })
        );
        navigate("/login");
        return response.data.data;
      } catch (error) {
        dispatch(
          showToastMessage({ message: "회원가입에 실패했습니다.", status: "error" })
        );
        if (error instanceof ApiError && error.isUserError) {
          return rejectWithValue(error.message);
        }
        return rejectWithValue(
          "회원가입 도중 오류가 발생하였습니다. 관리자에 문의하세요."
        );
      }
    }
    );

export const logout = () => (dispatch: Dispatch) => {
  sessionStorage.removeItem("token");
  dispatch(clearUserState());
  dispatch(initialCart());
  dispatch(
    showToastMessage({ message: "로그아웃 되었습니다.", status: "success" })
  );
};

// ─── Slice ────────────────────────────────────────────────────────────────────

const initialState: UserState = {
  user: null,
  loading: false,
  loginError: null,
  registrationError: null,
  success: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearErrors(state) {
      state.loginError = null;
      state.registrationError = null;
    },
    clearUserState(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.registrationError = null;
      })
      .addCase(registerUser.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.registrationError = action.payload ?? "회원가입 오류";
      })
      .addCase(loginWithEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginWithEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.loginError = null;
        state.user = action.payload.user;
      })
      .addCase(loginWithEmail.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.loginError = action.payload ?? "로그인 오류";
      })
      .addCase(loginWithToken.fulfilled, (state, action) => {
        state.user = action.payload.user;
      });
  },
});

export const { clearErrors, clearUserState } = userSlice.actions;
export default userSlice.reducer;
