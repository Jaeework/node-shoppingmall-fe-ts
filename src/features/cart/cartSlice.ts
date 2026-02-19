import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { showToastMessage } from "../common/uiSlice";
import type { CartState } from "../../types/index";

const initialState: CartState = {
  loading: false,
  error: "",
  cartList: [],
  selectedItem: {},
  cartItemCount: 0,
  totalPrice: 0,
};

export const addToCart = createAsyncThunk<
  void,
  { id: string; size: string },
  { rejectValue: string }
>("cart/addToCart", async ({ id, size }, { rejectWithValue, dispatch }) => {
  try {
    await api.post("/cart", { productId: id, size, qty: 1 });
    dispatch(showToastMessage({ message: "상품이 카트에 추가되었습니다.", status: "success" }));
  } catch (error) {
    return rejectWithValue("카트에 추가하는 중 오류가 발생했습니다.");
  }
});

export const getCartList = createAsyncThunk<
  { data: CartState["cartList"]; totalPrice: number },
  void,
  { rejectValue: string }
>("cart/getCartList", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/cart");
    return response.data;
  } catch (error) {
    return rejectWithValue("카트 목록을 불러오는 중 오류가 발생했습니다.");
  }
});

export const deleteCartItem = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>("cart/deleteCartItem", async (id, { rejectWithValue, dispatch }) => {
  try {
    await api.delete(`/cart/${id}`);
    dispatch(getCartList());
  } catch (error) {
    return rejectWithValue("카트 아이템 삭제 중 오류가 발생했습니다.");
  }
});

export const updateQty = createAsyncThunk<
  void,
  { id: string; value: number },
  { rejectValue: string }
>("cart/updateQty", async ({ id, value }, { rejectWithValue, dispatch }) => {
  try {
    await api.put(`/cart/${id}`, { qty: value });
    dispatch(getCartList());
  } catch (error) {
    return rejectWithValue("수량 업데이트 중 오류가 발생했습니다.");
  }
});

export const getCartQty = createAsyncThunk<
  number,
  void,
  { rejectValue: string }
>("cart/getCartQty", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/cart/qty");
    return response.data.qty;
  } catch (error) {
    return rejectWithValue("카트 수량을 불러오는 중 오류가 발생했습니다.");
  }
});

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
      .addCase(getCartList.fulfilled, (state, action) => {
        state.cartList = action.payload.data;
        state.totalPrice = action.payload.totalPrice;
      })
      .addCase(getCartQty.fulfilled, (state, action) => {
        state.cartItemCount = action.payload;
      });
  },
});

export const { initialCart } = cartSlice.actions;
export default cartSlice.reducer;
