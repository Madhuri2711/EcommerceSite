import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllSubCategory } from "../services/sub.category.service";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const name = "subcategory";

export const fetchSubCategory = createAsyncThunk(`${name}/fetch`, async () => {
  const response = await getAllSubCategory();
  return response;
});

const subCategorySlice = createSlice({
  name,
  initialState: {
    status: STATUSES.IDLE,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubCategory.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchSubCategory.fulfilled, (state, action) => {
        state.subcategory = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchSubCategory.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

const { reducer } = subCategorySlice;
export default reducer;
