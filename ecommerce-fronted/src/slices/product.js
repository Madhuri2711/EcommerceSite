import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//import { token } from "../lib/constant";
import {
  //getAllProduct,
  //getProductDetail,
  getAllPublicProduct,
  getPublicProductDetail,
  addProductDetails,
  updateProductDetails,
  createBundle,
  getProductCount,
} from "../services/product.service";
import { getSearchValue } from "../services/search.product.service";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

export const fetchProduct = createAsyncThunk(
  "product/fetch",
  async (values) => {
    try {
      const response = await getAllPublicProduct(values);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const addProduct = createAsyncThunk("product/add", async (values) => {
  try {
    const response = await addProductDetails(values);
    return response?.data;
  } catch (error) {
    return error;
  }
});

export const addBundle = createAsyncThunk("product/bundle", async (values) => {
  try {
    const response = await createBundle(values);
    return response?.data;
  } catch (error) {
    return error;
  }
});

export const updateProduct = createAsyncThunk(
  "product/update",
  async (id, values) => {
    try {
      console.log(id);
      console.log(values);
      const response = await updateProductDetails(id, values);
      return response?.data;
    } catch (error) {
      return error;
    }
  }
);

export const productDetails = createAsyncThunk(
  "productDetail/fetch",
  async (id) => {
    const response = await getPublicProductDetail(id);
    return response;
  }
);

export const fetchSearchProducts = createAsyncThunk(
  "product/search",
  async (values) => {
    try {
      const response = await getSearchValue(values);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const fetchProductCount = createAsyncThunk(
  "product/count",
  async (values) => {
    try {
      const response = await getProductCount(values);
      return response?.data;
    } catch (error) {
      return error;
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    productDetail: [],
    searchproductsData: [],
    status: "",
    sellerProduct: {},
    updatesellerProduct: [],
    bundleProduct: [],
    productCount: 0,
  },
  reducers: {
    removeproductDetail: (state) => {
      state.productDetail = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductCount.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchProductCount.fulfilled, (state, action) => {
        state.productCount = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchProductCount.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(addProduct.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.sellerProduct = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(updateProduct.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.updatesellerProduct = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(fetchSearchProducts.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchSearchProducts.fulfilled, (state, action) => {
        state.searchproductsData = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchSearchProducts.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(fetchProduct.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.products = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(productDetails.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(productDetails.fulfilled, (state, action) => {
        state.productDetail = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(productDetails.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(addBundle.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(addBundle.fulfilled, (state, action) => {
        state.bundleProduct = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(addBundle.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const { removeproductDetail } = productSlice.actions;
export default productSlice.reducer;
