import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { showToastMessage } from "../common/uiSlice";
import type { Order, OrderState } from "../../types/index";

const initialState: OrderState = {
  orderList: [],
  orderNum: "",
  selectedOrder: {},
  error: "",
  loading: false,
  totalPageNum: 1,
};

// Async thunks
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (payload: Record<string, unknown>, { dispatch, rejectWithValue }) => {}
);

export const getOrder = createAsyncThunk(
  "order/getOrder",
  async (_, { rejectWithValue, dispatch }) => {}
);

export const getOrderList = createAsyncThunk(
  "order/getOrderList",
  async (query: { page?: number; ordernum?: string }, { rejectWithValue, dispatch }) => {}
);

export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async ({ id, status }: { id: string; status: string }, { dispatch, rejectWithValue }) => {}
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setSelectedOrder(state, action: PayloadAction<Order | Record<string, never>>) {
      state.selectedOrder = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { setSelectedOrder } = orderSlice.actions;
export default orderSlice.reducer;
