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

export const createOrder = createAsyncThunk<
  { orderNum: string },
  Record<string, unknown>,
  { rejectValue: string }
>("order/createOrder", async (payload, { rejectWithValue }) => {
  try {
    const response = await api.post("/order", payload);
    return response.data;
  } catch (error) {
    return rejectWithValue("주문 생성 중 오류가 발생했습니다.");
  }
});

export const getOrder = createAsyncThunk<
  { data: Order[] },
  void,
  { rejectValue: string }
>("order/getOrder", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/order");
    return response.data;
  } catch (error) {
    return rejectWithValue("주문 목록을 불러오는 중 오류가 발생했습니다.");
  }
});

export const getOrderList = createAsyncThunk<
  { data: Order[]; totalPageNum: number },
  { page?: number; ordernum?: string },
  { rejectValue: string }
>("order/getOrderList", async (query, { rejectWithValue }) => {
  try {
    const response = await api.get("/order/all", { params: query });
    return response.data;
  } catch (error) {
    return rejectWithValue("주문 목록을 불러오는 중 오류가 발생했습니다.");
  }
});

export const updateOrder = createAsyncThunk<
  void,
  { id: string; status: string },
  { rejectValue: string }
>("order/updateOrder", async ({ id, status }, { dispatch, rejectWithValue }) => {
  try {
    await api.put(`/order/${id}`, { status });
    dispatch(showToastMessage({ message: "주문 상태가 업데이트되었습니다.", status: "success" }));
    dispatch(getOrderList({}));
  } catch (error) {
    return rejectWithValue("주문 업데이트 중 오류가 발생했습니다.");
  }
});

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setSelectedOrder(state, action: PayloadAction<Order | Record<string, never>>) {
      state.selectedOrder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderNum = action.payload.orderNum;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.orderList = action.payload.data;
      })
      .addCase(getOrderList.fulfilled, (state, action) => {
        state.orderList = action.payload.data;
        state.totalPageNum = action.payload.totalPageNum;
      });
  },
});

export const { setSelectedOrder } = orderSlice.actions;
export default orderSlice.reducer;
