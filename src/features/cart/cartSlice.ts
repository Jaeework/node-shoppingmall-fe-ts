import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { showToastMessage } from "../common/uiSlice";
import type { CartItem, CartState } from "../../types/index";
import { ApiError } from "../../utils/ApiError";

const initialState: CartState = {
  loading: false,
  error: "",
  cartList: [],
  selectedItem: {},
  cartItemCount: 0,
  totalPrice: 0,
};

// Async thunk actions
export const addToCart = createAsyncThunk<
  number,
  { id: string, size: string },
  { rejectValue: string }
>(
  "cart/addToCart",
  async ({ id, size }, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.post("/cart", { productId: id, size, qty: 1 });
      if (response.status !== 200) throw new ApiError(response.data.error);
      dispatch(showToastMessage({ message: "카트에 아이템이 추가됐습니다.", status: "success" }));

      return response.data.cartItemQuantity;
    } catch (error) {
      let errorMessage;
      if (error instanceof ApiError && error.isUserError) {
        errorMessage = error.message;
      } else {
        errorMessage = "상품을 카트에 추가하지 못했습니다.";
      }
      dispatch(showToastMessage({ message: errorMessage, status: "error" }));
      return rejectWithValue(errorMessage);
    }
  }
);

export const getCartList = createAsyncThunk<
  CartItem[],
  void,
  { rejectValue: string }
>(
  "cart/getCartList",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.get("/cart");
      if (response.status !== 200) throw new ApiError(response.data.error);
      return response.data.data;
    } catch (error) {
      if (error instanceof ApiError && error.isUserError) {
        return rejectWithValue(error.message);
      } 
      return rejectWithValue("카트 정보를 가지고 오지 못했습니다.");
    }
  }
);

export const deleteCartItem = createAsyncThunk<
  number,
  string,
  { rejectValue: string }
>(
  "cart/deleteCartItem",
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.delete(`/cart/${id}`);
      if (response.status !== 200) throw new ApiError(response.data.error);
      dispatch(getCartList());
      return response.data.cartItemQuantity;
    } catch (error) {
      let errorMessage;
      if (error instanceof ApiError && error.isUserError) {
        errorMessage = error.message;
      } else {
        errorMessage = "상품을 카트에서 제거하지 못했습니다.";
      }
      dispatch(showToastMessage({ message: errorMessage, status: "error" }));
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateQty = createAsyncThunk<
  CartItem[],
  { id: string; value: number; },
  { rejectValue: string }
>(
  "cart/updateQty",
  async ({ id, value }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/cart/${id}`, { qty: value });
      if (response.status !== 200) throw new ApiError(response.data.error);

      return response.data.data;
    } catch (error) {
      if (error instanceof ApiError && error.isUserError) {
        return rejectWithValue(error.message);
      } 
      return rejectWithValue("상품 정보를 수정하지 못했습니다.");
    }
  }
);

export const getCartQty = createAsyncThunk(
  "cart/getCartQty",
  async (_, { rejectWithValue, dispatch }) => {}
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    initialCart(state) {
      state.cartItemCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.cartItemCount = action.payload;
      })
      .addCase(addToCart.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || "카트 상품 추가 에러";
      })
      .addCase(getCartList.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getCartList.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.cartList = action.payload;
        state.totalPrice = action.payload.reduce((total, item) => total + (item.productId.price * item.qty), 0);
      })
      .addCase(getCartList.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || "상품 카드 조회 에러";
      })
      .addCase(updateQty.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateQty.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.cartList = action.payload;
        state.totalPrice = action.payload.reduce((total, item) => total + (item.productId.price * item.qty), 0);
      })
      .addCase(updateQty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "상품 수량 업데이트 에러";
      })
      .addCase(deleteCartItem.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.cartItemCount = action.payload;
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "카트 상품 삭제 에러";
      });
  },
});

export const { initialCart } = cartSlice.actions;
export default cartSlice.reducer;
