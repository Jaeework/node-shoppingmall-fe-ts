import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { showToastMessage } from "../common/uiSlice";
import type { Product, ProductState } from "../../types/index";

// ─── Thunks ──────────────────────────────────────────────────────────────────

export const getProductList = createAsyncThunk<
  { data: Product[]; totalPageNum: number },
  { name?: string; page?: number } | undefined,
  { rejectValue: string }
>("products/getProductList", async (query, { rejectWithValue }) => {
  try {
    const response = await api.get("/products", { params: query });
    return response.data;
  } catch (error) {
    return rejectWithValue("상품 목록을 불러오는 중 오류가 발생했습니다.");
  }
});

export const getProductDetail = createAsyncThunk<
  { data: Product },
  string,
  { rejectValue: string }
>("products/getProductDetail", async (id, { rejectWithValue }) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    return rejectWithValue("상품 정보를 불러오는 중 오류가 발생했습니다.");
  }
});

export const createProduct = createAsyncThunk<
  void,
  Partial<Product>,
  { rejectValue: string }
>("products/createProduct", async (formData, { dispatch, rejectWithValue }) => {
  try {
    await api.post("/products", formData);
    dispatch(showToastMessage({ message: "상품이 추가되었습니다.", status: "success" }));
    dispatch(getProductList());
  } catch (error) {
    return rejectWithValue("상품 추가 중 오류가 발생했습니다.");
  }
});

export const deleteProduct = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>("products/deleteProduct", async (id, { dispatch, rejectWithValue }) => {
  try {
    await api.delete(`/products/${id}`);
    dispatch(showToastMessage({ message: "상품이 삭제되었습니다.", status: "success" }));
    dispatch(getProductList());
  } catch (error) {
    return rejectWithValue("상품 삭제 중 오류가 발생했습니다.");
  }
});

export const editProduct = createAsyncThunk<
  void,
  { id: string } & Partial<Product>,
  { rejectValue: string }
>("products/editProduct", async ({ id, ...formData }, { dispatch, rejectWithValue }) => {
  try {
    await api.put(`/products/${id}`, formData);
    dispatch(showToastMessage({ message: "상품이 수정되었습니다.", status: "success" }));
    dispatch(getProductList());
  } catch (error) {
    return rejectWithValue("상품 수정 중 오류가 발생했습니다.");
  }
});

// ─── Slice ────────────────────────────────────────────────────────────────────

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
      .addCase(getProductList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductList.fulfilled, (state, action) => {
        state.loading = false;
        state.productList = action.payload.data;
        state.totalPageNum = action.payload.totalPageNum;
      })
      .addCase(getProductList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "오류";
      })
      .addCase(getProductDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload.data;
      })
      .addCase(getProductDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "오류";
      })
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = "";
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "오류";
        state.success = false;
      })
      .addCase(editProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(editProduct.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = "";
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "오류";
        state.success = false;
      });
  },
});

export const { setSelectedProduct, setFilteredList, clearError } = productSlice.actions;
export default productSlice.reducer;
