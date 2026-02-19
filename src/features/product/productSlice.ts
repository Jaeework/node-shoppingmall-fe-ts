import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { showToastMessage } from "../common/uiSlice";
import type { Product, ProductState } from "../../types/index";
import { ApiError } from "../../utils/ApiError";

// 비동기 액션 생성
export const getProductList = createAsyncThunk(
  "products/getProductList",
  async (query: { name?: string; page?: number } | undefined, { rejectWithValue }) => {}
);

export const getProductDetail = createAsyncThunk(
  "products/getProductDetail",
  async (id: string, { rejectWithValue }) => {}
);

export const createProduct = createAsyncThunk<
  Product,
  Partial<Product>,
  { rejectValue: string }
>(
  "products/createProduct",
  async (formData: Partial<Product>, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post("/products", formData);
      if (response.status !== 200) {
        throw new ApiError(response.data.error);
      }
      dispatch(showToastMessage({ message: "상품 등록이 완료되었습니다.", status: "success"}));
      return response.data.data;
    } catch (error) {
      if (error instanceof ApiError) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("상품 등록 도중 오류가 발생하였습니다. 관리자에 문의하세요.");
    }
  }
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
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.success = true;
      })
      .addCase(createProduct.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload ?? "상품 등록 에러";
        state.success = false;
      });
  },
});

export const { setSelectedProduct, setFilteredList, clearError } = productSlice.actions;
export default productSlice.reducer;
