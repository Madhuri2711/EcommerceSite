import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { compareProduct } from "../services/compare-product.service";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const name = "compare";

export const compareProductData = createAsyncThunk(
  `${name}/fetch`,
  async (values) => {
    try {
      const response = await compareProduct(values);
      return response?.data;
    } catch (error) {
      return error;
    }
  }
);

const compareProductSlice = createSlice({
  name,
  initialState: {
    status: STATUSES.IDLE,
    compareProduct: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(compareProductData.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(compareProductData.fulfilled, (state, action) => {
        state.compareProduct = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(compareProductData.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

const { reducer } = compareProductSlice;
export default reducer;
