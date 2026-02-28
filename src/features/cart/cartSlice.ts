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
  updatingItemId: null,
  checkedItems: [],
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
      return response.data.data;
    } catch (error) {
      if (error instanceof ApiError && error.isUserError) {
        return rejectWithValue(error.message);
      } 
      return rejectWithValue("카트 정보를 가지고 오지 못했습니다.");
    }
  }
);

export const deleteCartItems = createAsyncThunk<
  number,
  string[],
  { rejectValue: string }
>(
  "cart/deleteCartItems",
  async (ids: string[], { rejectWithValue, dispatch }) => {
    try {
      const response = await api.delete("/cart", { data: { ids } });

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
      return response.data.data;
    } catch (error) {
      if (error instanceof ApiError && error.isUserError) {
        return rejectWithValue(error.message);
      } 
      return rejectWithValue("상품 정보를 수정하지 못했습니다.");
    }
  }
);

export const getCartQty = createAsyncThunk<
  number,
  void,
  { rejectValue: string }
>(
  "cart/getCartQty",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.get("/cart/qty");
      return response.data.cartItemQuantity;
    } catch (error) {
      if (error instanceof ApiError && error.isUserError) {
        return rejectWithValue(error.message);
      } 
      return rejectWithValue("카트 수량 정보를 가져오지 못했습니다.");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    initialCart(state) {
      state.cartItemCount = 0;
    },
    toggleCheckItem(state, action: PayloadAction<CartItem>) {
      const item = action.payload;
      const index = state.checkedItems.findIndex((i) => i._id === item._id);
      if (index >= 0) {
        state.checkedItems.splice(index, 1);
      } else {
        state.checkedItems.push(item);
      }
      state.totalPrice = state.checkedItems.reduce(
        (total, i) => total + i.productId.price * i.qty, 0
      );
    },
    setCheckedItems(state, action: PayloadAction<CartItem[]>) {
      state.checkedItems = action.payload;
      state.totalPrice = state.checkedItems.reduce(
        (total, i) => total + i.productId.price * i.qty, 0
      );
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
      })
      .addCase(getCartList.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || "상품 카드 조회 에러";
      })
      .addCase(updateQty.pending, (state, action) => {
        state.loading = true;
        state.updatingItemId = action.meta.arg.id;
      })
      .addCase(updateQty.fulfilled, (state, action) => {
        state.loading = false;
        state.updatingItemId = null;
        state.error = "";
        state.cartList = action.payload;
      })
      .addCase(updateQty.rejected, (state, action) => {
        state.loading = false;
        state.updatingItemId = null;
        state.error = action.payload || "상품 수량 업데이트 에러";
      })
      .addCase(deleteCartItems.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.cartItemCount = action.payload;
      })
      .addCase(deleteCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "카트 상품 삭제 에러";
      })
      .addCase(getCartQty.fulfilled, (state, action) => {
        state.cartItemCount = action.payload;
      });
  },
});

export const { initialCart, toggleCheckItem, setCheckedItems } = cartSlice.actions;
export default cartSlice.reducer;
