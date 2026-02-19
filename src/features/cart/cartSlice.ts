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

// Async thunk actions
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ id, size }: { id: string; size: string }, { rejectWithValue, dispatch }) => {}
);

export const getCartList = createAsyncThunk(
  "cart/getCartList",
  async (_, { rejectWithValue, dispatch }) => {}
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async (id: string, { rejectWithValue, dispatch }) => {}
);

export const updateQty = createAsyncThunk(
  "cart/updateQty",
  async ({ id, value }: { id: string; value: number }, { rejectWithValue }) => {}
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
  extraReducers: (builder) => {},
});

export const { initialCart } = cartSlice.actions;
export default cartSlice.reducer;
