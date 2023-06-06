import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllCategory } from "../services/category.service";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const name = "category";

export const fetchCategory = createAsyncThunk(`${name}/fetch`, async () => {
  const response = await getAllCategory();
  return response;
});

const categorySlice = createSlice({
  name,
  initialState: {
    status: STATUSES.IDLE,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.category = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

const { reducer } = categorySlice;
export default reducer;
