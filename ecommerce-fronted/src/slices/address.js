import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addNewAddress, getAllAddress, updateAddress } from "../services/profile.service";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const name = "address";

export const fetchAddresses = createAsyncThunk(`${name}/fetch`, async () => {
  try {
    const response = await getAllAddress();
    return response?.data;
  } catch (error) {
    return error;
  }
});

export const addAddress = createAsyncThunk(`${name}/add`, async (values) => {
  try {
    const response = await addNewAddress(values);
    return response;
  } catch (error) {
    return error;
  }
});

export const editAddress = createAsyncThunk(
  `${name}/update`,
  async (id, values) => {
    try {
      const response = await updateAddress(id, values);
      return response;
    } catch (error) {
      return error;
    }
  }
);

const addressSlice = createSlice({
  name,
  initialState: {
    status: STATUSES.IDLE,
    address: [],
    updateAddress: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddresses.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.address = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(editAddress.fulfilled, (state, action) => {
        state.updateAddress = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(editAddress.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

const { reducer } = addressSlice;
export default reducer;
