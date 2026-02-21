import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { showToastMessage } from "../common/uiSlice";
import type { Product, ProductState } from "../../types/index";
import { ApiError } from "../../utils/ApiError";

// 비동기 액션 생성
export const getProductList = createAsyncThunk<
  { data: Product[]; totalPageNum: number },
  { name?: string; page?: number; },
  { rejectValue: string }
>(
  "products/getProductList",
  async (query: { name?: string; page?: number } | undefined, { rejectWithValue }) => {
    try {
      const response = await api.get("/products", { params: query });
      if (response.status !== 200) throw new ApiError(response.data.error);
      return response.data;
    } catch (error) {
      if (error instanceof ApiError && error.isUserError) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("상품 목록을 불러오지 못했습니다.");
    }
  }
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
      dispatch(getProductList({ page: 1 }));
      dispatch(showToastMessage({ message: "상품 등록이 완료되었습니다.", status: "success"}));
      return response.data;
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

export const editProduct = createAsyncThunk<
  Product,
  { id: string } & Partial<Product>,
  { rejectValue: string }
>(
  "products/editProduct",
  async ({ id, ...formData } , { dispatch, rejectWithValue }) => {
    try {
      const response = await api.put(`/products/${id}`, formData);
      if (response.status !== 200) throw new ApiError(response.data.error);
      dispatch(getProductList({ page: 1 }));
      dispatch(showToastMessage({ message: "상품 정보가 수정되었습니다.", status: "success"}));
      return response.data.data;
    } catch (error) {
      if (error instanceof ApiError && error.isUserError) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("상품 정보를 업데이트하지 못했습니다. 관리자에 문의하세요.");
    }
  }
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
        state.success = false;
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
      })
      .addCase(getProductList.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getProductList.fulfilled, (state, action) => {
        state.loading = false;
        state.productList = action.payload.data;
        state.error = "";
        state.totalPageNum = action.payload.totalPageNum;
      })
      .addCase(getProductList.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || "상품 목록 조회 에러";
      })
      .addCase(editProduct.pending, (state, action) => {
        state.success = false;
        state.loading = true;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.success = true;
      })
      .addCase(editProduct.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || "상품 수정 에러";
        state.success = false;
      });
  },
});

export const { setSelectedProduct, setFilteredList, clearError } = productSlice.actions;
export default productSlice.reducer;
