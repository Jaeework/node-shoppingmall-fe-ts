import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { showToastMessage } from "../common/uiSlice";
import type { Order, OrderState } from "../../types/index";
import { ApiError } from "../../utils/ApiError";
import { getCartQty } from "../cart/cartSlice";

const initialState: OrderState = {
  orderList: [],
  orderNum: "",
  selectedOrder: {},
  error: "",
  loading: false,
  totalPageNum: 1,
};

// Async thunks
export const createOrder = createAsyncThunk<
  string,
  Record<string, unknown>,
  { rejectValue: string }
>(
  "order/createOrder",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post("/orders", payload);
      
      dispatch(getCartQty());
      return response.data.orderNum;
    } catch (error) {
      const errorMessage = error instanceof ApiError && error.isUserError ? error.message : "주문 정보를 생성하지 못했습니다. 관리자에 문의하세요.";
      dispatch(showToastMessage({ message: errorMessage, status: "error" }));
      return rejectWithValue(errorMessage);
    }
  }
);

export const getOrder = createAsyncThunk<
  { data: Order[]; totalPageNum: number },
  { page?: number },
  { rejectValue: string }
>(
  "order/getOrder",
  async (query, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.get("/orders/me", { params: query });
      return response.data;
    } catch (error) {
      return rejectWithValue("주문 목록을 불러오지 못했습니다. 관리자에 문의하세요.");
    }
  }
);

export const getOrderList = createAsyncThunk<
  { data: Order[]; totalPageNum: number },
  { page?: number; ordernum?: string },
  { rejectValue: string }
>(
  "order/getOrderList",
  async (query, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.get("/orders", { params: query });
      return response.data;
    } catch (error) {
      if (error instanceof ApiError && error.isUserError) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("주문 목록을 불러오지 못했습니다. 관리자에 문의하세요.");
    }
  }
);

export const updateOrder = createAsyncThunk<
  Order,
  { id: string, status: string, page?: number, ordernum?: string },
  { rejectValue: string }
>(
  "order/updateOrder",
  async ({ id, status, page, ordernum }, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.put(`orders/${id}`, { status });
      
      dispatch(getOrderList({page, ordernum}));
      dispatch(showToastMessage({message: "주문 정보를 성공적으로 수정하였습니다.", status: "success"}));
      return response.data.data;
    } catch (error) {
      if (error instanceof ApiError && error.isUserError) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("주문 정보를 수정하지 못했습니다. 관리자에 문의하세요.");
    }
  }
);

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
      .addCase(createOrder.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.orderNum = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "주문 정보 생성 오류";
      })
      .addCase(getOrderList.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getOrderList.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.orderList = action.payload.data;
        state.totalPageNum = action.payload.totalPageNum;
      })
      .addCase(getOrderList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "주문 목록 조회 오류";
      })
      .addCase(updateOrder.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "주문 정보 수정 오류";
      })
      .addCase(getOrder.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.orderList = action.payload.data;
        state.totalPageNum = action.payload.totalPageNum;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "주문 목록 조회 오류";
      });
  },
});

export const { setSelectedOrder } = orderSlice.actions;
export default orderSlice.reducer;
