import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { showToastMessage } from "../common/uiSlice";
import type { Product, ProductState } from "../../types/index";

// 비동기 액션 생성
export const getProductList = createAsyncThunk(
  "products/getProductList",
  async (query: { name?: string; page?: number } | undefined, { rejectWithValue }) => {}
);

export const getProductDetail = createAsyncThunk(
  "products/getProductDetail",
  async (id: string, { rejectWithValue }) => {}
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (formData: Partial<Product>, { dispatch, rejectWithValue }) => {}
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id: string, { dispatch, rejectWithValue }) => {}
);

export const editProduct = createAsyncThunk(
  "products/editProduct",
  async ({ id, ...formData }: { id: string } & Partial<Product>, { dispatch, rejectWithValue }) => {}
);

// 슬라이스 생성

const initialState: ProductState = {
  productList: [],
  selectedProduct: null,
  loading: false,
  error: "",
  totalPageNum: 1,
  success: false,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSelectedProduct(state, action: PayloadAction<Product | null>) {
      state.selectedProduct = action.payload;
    },
    setFilteredList(state, action: PayloadAction<Product[]>) {
      state.filteredList = action.payload;
    },
    clearError(state) {
      state.error = "";
      state.success = false;
    },
  },
  extraReducers: (builder) => {},
});

export const { setSelectedProduct, setFilteredList, clearError } = productSlice.actions;
export default productSlice.reducer;
